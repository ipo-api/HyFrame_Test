import {
  AfterViewInit,
  Component, ContentChild, EmbeddedViewRef, EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit,
  Output, SimpleChanges, TemplateRef,
} from '@angular/core';
import { $hyapi } from '../../../../api/$hyapi';
import { ModelService } from '../../../../common/domain/service/model.service';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { HyBaseTable } from '../../../../common/domain/base/HyBaseTable';
import { HyGltScroll } from './interface';
import { HyGltClass } from '../hy-glt/interface';
import { I18nService } from '../../../../service/i18n.service';

@Component({
  selector: 'hy-edit-table',
  templateUrl: './hy-edit-table.component.html',
  styleUrls: ['./hy-edit-table.component.css'],
  providers: [TableService],
})
export class HyEditTableComponent extends HyBaseTable implements OnInit, OnChanges {
  menu: any = null;
  datas_oneRow: any = [{}];
  isAllDisplayDataChecked = false; //全选展示数据
  listOfDisplayData: any[] = []; //展示数据集合

  _titleTemp: TemplateRef<void>;
  _titleString: string;
  tempTitleHeight: boolean = true;

  /** 更新时间戳 */
  private updateTimestamp: number = 0;

  /** 标题 */
  @Input() title: string | TemplateRef<void>;

  /** 是否显示行号 */
  @Input() showOrderNum: boolean = false;

  /** 行号名称 */
  @Input() orderNumName: string;

  /** modelName */
  @Input('model') modelName: string;

  /** false换行不点点点 true不换行点点点 */
  @Input() isEllipsis: boolean;

  /** 提示 */
  @Input() tip: string;

  _class: string; //noBorder：无边框；grayTitle：标题为灰色背景;gltStyle1:无上边框，与单记录表一起使用时使用；
  /**
   * noBorder：无边框；grayTitle：标题为灰色背景;gltStyle1:无上边框，与单记录表一起使用时使用；childrenGltStyle：子列表样式
   * @typedef {'noBorder' | 'grayTitle' | 'gltStyle1' | 'childrenGltStyle' | 'null'}
   */
  @Input() class: HyGltClass | Array<HyGltClass> | null;

  /** 自定义数据 */
  @Input()
  datas: any;

  /** ？？ */
  @Input()
  datas_property: any;

  /** 表格大小 */
  @Input()
  size: 'middle' | 'small' | 'default' = 'middle';

  _showTitle: boolean = true;
  /** 显示标题 */
  @Input()
  set showTitle(showTitle: any) {
    if (showTitle == true || showTitle === 'true') {
      this._showTitle = true;
    } else if (showTitle == false || showTitle === 'false') {
      this._showTitle = false;
    }
  }

  get showTitle() {
    return this._showTitle;
  }

  @ContentChild(TemplateRef, /* TODO: add static flag */ {}) itemTemplate: TemplateRef<any>;

  /** 是否为编辑状态 */
  @Input() isEdit: boolean = false;

  @Output() isEditChange = new EventEmitter();

  /** 是否显示分页器 */
  @Input()
  showPagination: boolean = true;

  /** 是否可以快速跳转至某页 */
  @Input()
  showQuickJumper: boolean = true;

  /** 指定分页显示的位置 'top' | 'bottom' | 'both' */
  @Input()
  paginationPosition: 'top' | 'bottom' | 'both' = 'bottom';

  /** 页数选择器可选值 */
  @Input()
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];

  /** 是否在前端对数据进行分页，如果在服务器分页数据或者需要在前端显示全部数据时传入 false */
  @Input()
  frontPagination: boolean = false;

  /** 延迟显示加载效果的时间（防止闪烁） */
  @Input()
  loadingDelay: number = 0;

  /** 是否提供多选框 */
  @Input()
  showCheckbox: boolean = false;

  /** 是否提供选择全部数据,为true时，可跨页全选 */
  @Input()
  showCheckAll: boolean = false;

  editCache: { [key: string]: any } = {};

  /** 置于表格前面的模板 */
  @Input()
  afterTemplate: TemplateRef<any>;

  /** 滚动条宽度、高度 */
  @Input()
  scroll: HyGltScroll;

  /** 可以指定唯一id */
  @Input()
  uniqueId: string = 'id';


  // @Input()
  // virtualScroll: boolean = false;//是否启用虚拟滚动模式，与 [nzScroll] 配合使用

  // private _scroll: any;//横向或纵向支持滚动，也可用于指定滚动区域的宽高度：{ x: "300px", y: "300px" }
  //
  // @Input()
  // private scroll:any = {x:'1280px'};//滚动条宽度
  //
  // getScroll(){
  //   if(!this._scroll){
  //     this.calcScroll();
  //   }
  //   return this._scroll;
  // }

  /** 全选多选框的方法 */
  @Output('onCheckAllChange')
  onCheckall_Change = new EventEmitter();
  checkAll(value: boolean): void {
    let datas = this.listOfDisplayData;
    if (this.selectAllPage == true) {
      if (value == true) {
        for (let item of datas) {
          delete item['checked'];
        }
        this.checkboxDisable = true;
        this.modelService[this.modelName + '_$Property']['checkAllPageData'] = true;

      } else {
        this.checkboxDisable = false; //checkbox允许点击
        //已经是跨页全选的标志，但是未选中数据
        this.modelService[this.modelName + '_$Property']['checkAllPageData'] = false;
        this.selectAllPage = false;
      }
    } else {
      for (let item of datas) {
        item['checked'] = value;
      }
      this.checkboxDisable = false; //checkbox允许点击
      this.selectCurrentPage = true; //选中本页数据
      delete this.modelService[this.modelName + '_$Property']['checkAllPageData'];
    }
    this.onCheckall_Change.emit(value);
    //保存之后把之前新加的那条数据去掉
    delete this.editCache['undefined'];
    delete this.editCache['null'];
    this.updateEditCache();
  }

  /** 点击单个多选框的方法 */
  @Output('onCheckOneChange')
  refresh_Status = new EventEmitter();

  public clear_checkAll() { //清除全选框的方法
    this.isAllDisplayDataChecked = false;
  }

  refreshStatus(flag: boolean, data: any): void {
    data.checked = flag;
    this.isAllDisplayDataChecked = false; //将全选样式变为false
    //点击单个多选框时，切换为本页数据
    this.selectAllPage = false;
    this.selectCurrentPage = true;
    delete this.modelService[this.modelName + '_$Property']['checkAllPageData'];
    this.refresh_Status.emit(data);
    //保存之后把之前新加的那条数据去掉
    delete this.editCache['undefined'];
    delete this.editCache['null'];
    this.updateEditCache();
  }

  // _virtualTableData:any;
  // toggleTable:boolean = true ;
  //
  //
  // flashData(value){
  //
  //   if(this._virtualTableData != value){
  //     this.toggleTable = !this.toggleTable;
  //     this._virtualTableData = value;
  //     this.calcScroll();
  //   }
  // }

  // calcScroll(){
  //   let _data = this.modelService[this.modelName];
  //
  //   if(!this._scroll){
  //     this._scroll = {y:'0'};
  //     this._scroll.x = this.scroll.x?this.scroll.x:'1280px';
  //   }
  //
  //   if(!_data || _data.length==0){
  //     this._scroll.y = '0';
  //   }else if(_data && _data.length>0) {
  //     if(this.scroll.y){
  //       this._scroll.y = this.scroll.y;
  //     }else{
  //       this._scroll.y = (55*(_data.length-1)+98) +'px';
  //     }
  //   }
  // }




  constructor(modelService: ModelService, formService: HyFormService, public tableService: TableService, public i18nService: I18nService) {
    super('glt', modelService, tableService, formService, {});
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.modelService[this.modelName]) {
        this.modelService[this.modelName] = this.modelService[this.modelName].filter(item => JSON.stringify(item) !== '{}');
      }
      super.init();
      if (this.isEllipsis != undefined) {
        this.tableService.isEllipsis = this.isEllipsis;  ////false换行不点点点 true不换行点点点
      }
    });
  }

  count: number; //总条数
  indexSizeChange: boolean = false;
  pageIndexChange(curPage?: any) {
    let self = this;
    if (this.isEdit == true) {
      this.cancelEdit({});
    }
    let mds = this.modelService;
    let glt_$io = mds[this.modelName + '_$io'];
    let glt_$property = mds[this.modelName + '_$Property'];

    if (glt_$io && glt_$property && glt_$property.pageSize) {
      if (curPage) {
        glt_$property.curPage = curPage;
      }
      glt_$io.ops = glt_$io.ops || {};
      glt_$io.ops.showMsg = false;
      glt_$io.ops.gltNewSearch = false;
      glt_$io.ops.resCompleteFn_Context = self;

      $hyapi.io.post(mds, glt_$io.url, glt_$io.datas, glt_$io.ops);
    }
    this.indexSizeChange = true;
    //前端分页，数据刷新时，若总条数与上一次总条数不相等，会触发pageIndexChange,以下代码解决前端分页数据刷新时，取消选中效果
    if (this.frontPagination == true && curPage == 1 && this.count !== this.modelService[this.modelName].length) {
      this.cancelCheckAll();
    }
    this.count = this.modelService[this.modelName].length;
  }

  pageSizeChange($event: any) {
    if ($event) {
      if (this.isEdit == true) {
        this.cancelEdit({});
      }

      let glt_$property = this.modelService[this.modelName + '_$Property'];
      let glt_$io = this.modelService[this.modelName + '_$io'];
      glt_$property.pageSize = $event;

      //阿里会自动计算当前页是否没数据 没数据会自动调pageIndexChange
      if ((glt_$property.curPage - 1) * glt_$property.pageSize > glt_$property.count) {
        return;
      }

      if (glt_$io && glt_$property && glt_$property.pageSize) {
        glt_$io.ops = glt_$io.ops || {};
        glt_$io.ops.showMsg = false;
        glt_$io.ops.gltNewSearch = false;
        glt_$io.ops.resCompleteFn_Context = self;

        $hyapi.io.post(this.modelService, glt_$io.url, glt_$io.datas, glt_$io.ops);
      }
    }
    this.indexSizeChange = true;
  }

  //当前页面展示数据改变的回调函数
  currentPageDataChange($event: any): void {
    if (this.isAddRowNow || this.isEditRowNow) {
      return;
    }
    let glt_$io = this.modelService[this.modelName + '_$io'];
    if (JSON.stringify($event) === JSON.stringify(this.listOfDisplayData) && !glt_$io?.ops?.gltNewSearch && glt_$io?.timestamp === this.updateTimestamp) {
      this.listOfDisplayData = $event;
      return;
    }
    this.listOfDisplayData = $event;
    this.updateTimestamp = glt_$io?.timestamp || 0;
    setTimeout(() => {
      this.setNzLeftAndRight($event);
      if (this.indexSizeChange == true) {
        if (this.showCheckAll == true && this.selectAllPage == true && this.isAllDisplayDataChecked == true) {
          this.isAllDisplayDataChecked = true; //显示跨页全选时，需选中
        } else {
          //前端分页，翻页需清除当前页的chekbox标记
          if (this.frontPagination == true) {
            for (let item of this.modelService[this.modelName]) {
              delete item['checked'];
            }
          }
          this.isAllDisplayDataChecked = false; //将全选样式变为false
        }
      } else {
        this.cancelCheckAll();
      }
      this.indexSizeChange = false;

      //保存之后把之前新加的那条数据去掉
      delete this.editCache['undefined'];
      delete this.editCache['null'];

      this.updateEditCache();

      //解决类似11条数据，放到第二页，删除第二页数据，数据显示不正常问题
      if ($event.length == 0) {
        let glt_$property = this.modelService[this.modelName + '_$Property'];
        let curPage = glt_$property.curPage - 1;
        if (curPage >= 1) {
          this.pageIndexChange(curPage);
        }
      }
    }, 20);
  }

  cancelCheckAll() {
    //处理数据重新刷新的情况
    this.isAllDisplayDataChecked = false; //将全选样式变为false
    this.checkboxDisable = false; //checkbox允许点击
    //清除当前页、所有页数据选中效果
    this.selectAllPage = false;
    this.selectCurrentPage = false;
    //删除该值
    if (this.modelService[this.modelName + '_$Property']) {
      delete this.modelService[this.modelName + '_$Property']['checkAllPageData'];
    }
  }

  private updateEditCache(): void {
    this.editCache = {};
    this.modelService[this.modelName].forEach(item => {
      this.editCache[item[this.uniqueId]] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  searchValue: string;
  visible = false; //th过滤是否显示弹出框
  // th过滤点击搜索后关闭弹框
  onFilterChangeOk() {
    this.visible = false;
  }

  // th过滤点击重置后清楚数据
  onFilterChangeReset() {
    delete this.searchValue;
  }

  // 排序
  sortOrderf(sort, modelName) {
    let gltData: Array<any> = this.modelService[this.modelName];
    gltData.sort((a, b) => {
      if (sort == 'ascend') {

        if (typeof (a[modelName]) == 'string') {
          return a[modelName].localeCompare(b[modelName]);

        } else if (typeof (a[modelName]) == 'number') {
          return (a[modelName] - b[modelName]);
        }
      } else if (sort == 'descend') {

        if (typeof (a[modelName]) == 'string') {
          return (b[modelName].localeCompare(a[modelName]));

        } else if (typeof (a[modelName]) == 'number') {
          return (b[modelName] - a[modelName]);
        }
      }
    });
  }

  private isEditRowNow: boolean = false;

  // 编辑行
  public editRow(option: { item: any, initData(): any }) {
    this.isEditRowNow = true;
    if (option && option.item) {

      let uniqueIdData = option.item[this.uniqueId];

      if (!uniqueIdData) {
        $hyapi.msg.createTips('error', this.i18nService.getFrameI18n('hy-edit-table.程序异常！'));
        return;
      }

      for (let key in this.editCache) {
        if (typeof (this.editCache[key].edit) != 'undefined' && this.editCache[key].edit === true) {
          $hyapi.msg.createTips('error', this.i18nService.getFrameI18n('hy-edit-table.存在未保存数据，不能编辑！'));
          return;
        }
      }

      let value = option.initData();
      if (value == true || typeof (value) == 'undefined') {
        this.isEdit = true;
        this.isEditChange.emit(this.isEdit);
        this.editCache[uniqueIdData].edit = true;
      }
    }
  }

  /** 初始化afterTemplate */
  public afterTemplateInit(view: EmbeddedViewRef<any>) {
    const tdNodes = view.rootNodes.filter(item => item.tagName === 'TD');
    this.tableService.heads.forEach((head, index) => {
      if (head.hyLeft) {
        tdNodes[index].setAttribute('ng-reflect-nz-left', head.hyLeft);
        tdNodes[index].style.left = head.hyLeft;
        tdNodes[index].classList.add('ant-table-cell-fix-left');
        if (head.isLastLeft) {
          tdNodes[index].classList.add('ant-table-cell-fix-left-last');
        }
      }
      if (head.hyRight) {
        tdNodes[index].setAttribute('ng-reflect-nz-right', head.hyRight);
        tdNodes[index].style.right = head.hyRight;
        tdNodes[index].classList.add('ant-table-cell-fix-right');
        if (head.isFirstRight) {
          tdNodes[index].classList.add('ant-table-cell-fix-right-first');
        }
      }
    });
    setTimeout(() => {
      if (this.isAddRowNow) {
        this.isAddRowNow = false;
      }
      if (this.isEditRowNow) {
        this.isEditRowNow = false;
      }
      this.setHeadStyle();
    }, 100);

  }

  private isAddRowNow: boolean = false;

  //新增行
  public addRow(option: { newLastRow?: boolean, initData(): any }) {
    this.isAddRowNow = true;
    // 新增时存在多选框，清除多选框的状态
    if (this.showCheckbox == true) {
      for (let item of this.listOfDisplayData) {
        item['checked'] = false;
      }
      delete this.modelService[this.modelName + '_$Property']['checkAllPageData'];
    }

    //判断如果存在可编辑的状态，就不新增
    if (option) {
      for (let key in this.editCache) {
        if (typeof (this.editCache[key].edit) != 'undefined' && this.editCache[key].edit === true) {
          $hyapi.msg.createTips('error', this.i18nService.getFrameI18n('hy-edit-table.存在未保存数据，不能编辑！'));
          return;
        }
      }

      let value = option.initData();
      if (value == true || typeof (value) == 'undefined') {
        let r_new_data = {};
        this.isEdit = true;
        this.isEditChange.emit(this.isEdit);
        if (option && option.newLastRow) {
          this.modelService[this.modelName] = [
            ...this.modelService[this.modelName],
            r_new_data
          ];
        } else {
          this.modelService[this.modelName] = [
            r_new_data,
            ...this.modelService[this.modelName]
          ];
        }

        this.editCache[r_new_data[this.uniqueId]] = {
          edit: true,
          data: { ...r_new_data }
        };
      }
    }
  }

  // private addRowFnList: (() => void)[] = [];

  // public addRow(option: { newLastRow?: boolean, initData(): any }) {
  //   if (this.isCurrentPageDataChangeNow) {
  //     this.addRowFnList.push(() => {
  //       this._addRow(option);
  //     });
  //   } else {
  //     this._addRow(option);
  //   }
  // }



  //取消编辑,
  public cancelEdit(datas) {
    let uniqueIdData = datas[this.uniqueId];
    const index = this.modelService[this.modelName].findIndex(item => item[this.uniqueId] === uniqueIdData);
    this.isEdit = false;
    this.isEditChange.emit(this.isEdit);
    if (uniqueIdData) {
      this.editCache[uniqueIdData] = {
        data: { ...this.modelService[this.modelName][index] },
        edit: false
      };
    } else {
      this.modelService[this.modelName] = this.modelService[this.modelName].filter(item => item[this.uniqueId] !== uniqueIdData);
      delete this.editCache[uniqueIdData];
    }
  }


  selectCurrentPage: boolean; //选择当前页
  selectAllPage: boolean; //选择所有页数据
  checkboxDisable: boolean; //checkbox不可编辑

  checkAllPageData() {
    if (this.selectAllPage == false) {
      this.isAllDisplayDataChecked = true;  //th的全选状态
      this.selectCurrentPage = false; //“本页数据”不选中
      this.checkboxDisable = true;
      this.selectAllPage = true;
      let datas = this.listOfDisplayData;
      for (let item of datas) {
        delete item['checked'];
      }
      this.modelService[this.modelName + '_$Property']['checkAllPageData'] = true;
      this.checkAll(this.isAllDisplayDataChecked);
    }
  }


  checkCurrentPage() {
    if (this.selectCurrentPage == false) {
      this.selectAllPage = false; //“所有数据”不选中
      delete this.checkboxDisable;
      if (this.isAllDisplayDataChecked == false) {
        this.isAllDisplayDataChecked = true;
        this.checkAll(true);
      } else {
        this.checkAll(this.isAllDisplayDataChecked);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['title'] && changes['title'].currentValue !== undefined) {
      if (typeof this.title === 'string') {
        this._titleString = this.title;
      }
      this._titleTemp = this.title as any;
    }
    if (changes['class'] && changes['class'].currentValue !== undefined) {
      if (typeof this.class === 'string') {
        this._class = this.class;
        if (this.class == 'grayTitle') {
          // 标题为灰色背景，高度为auto
          this.tempTitleHeight = false;
        }
      } else if (this.class && this.class.length > 0) {
        this._class = '';
        this.class.forEach(element => {
          if (this._class) {
            this._class += ' ' + element;
          } else {
            this._class = element;
          }
          // 标题为灰色背景，高度为auto
          if (element === 'grayTitle') {
            this.tempTitleHeight = false;
          }
        })
      } else {
        this._class = '';
      }
    }
  }

}
