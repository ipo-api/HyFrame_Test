import {
  Component,
  OnInit,
  TemplateRef,
  ContentChild,
  Input,
  Output,
  EventEmitter,
  ElementRef, Renderer2, SimpleChanges, OnChanges, AfterViewInit, ViewChild,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { HyBaseTable } from '../../../../common/domain/base/HyBaseTable';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { ModelService } from '../../../../common/domain/service/model.service';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { $hyapi } from '../../../../api/$hyapi';
import { HyGltClass } from './interface';
import { I18nService } from '../../../../service/i18n.service';
import { NzTableComponent } from 'ng-zorro-antd/table';

@Component({
  selector: 'hy-glt',
  templateUrl: './hy-glt.component.html',
  styleUrls: ['./hy-glt.component.less'],
  providers: [TableService],
})
export class HyGltComponent extends HyBaseTable implements OnInit, OnChanges, AfterViewInit {
  /** 映射内容 */
  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

  @ViewChild('rowSelectionTable', { static: true }) rowSelectionTable: NzTableComponent<any>;

  @ViewChild('thead', { static: true }) thead: ElementRef;

  /** 自动分页，开启后将不会显示剩余多少页，点击下一页按钮会自动搜索第二页内容，如果存在则显示 */
  @Input() noTotalPage: boolean = false;

  /** 全选展示数据（双向绑定） */
  @Input() isAllDisplayDataChecked: boolean = false;

  /** 全选变动回调 */
  @Output() isAllDisplayDataCheckedChange = new EventEmitter();

  /** 标题 */
  @Input() title: string | TemplateRef<void>;

  /** modelName */
  @Input('model') modelName: string;

  /** 字符超出长度是否换行（false：不换行，true：换行，并出省略号） */
  @Input() isEllipsis: boolean = false;

  /** 
   * 高亮配置
   * @description 自定义字段名称，默认字段名称为_heightLight
   */
  @Input() heightLightName: string = '_heightLight';

  /** 
   * 是否占满高度,设置后glt标签高度将为100%
   * @description 与scroll同时使用时，scroll的高度将不会生效
   * @description 如果需要自定义父级元素，请使用parentElement属性
   */
  @Input() fullHeight: boolean = false;

  /** 自定义占满高度的父级元素，用来计算高度，需配合fullHeight使用 */
  @Input() parentElement: ElementRef;

  /** 提示 */
  @Input() tip: string;

  _class: string;
  /**
   * noBorder：无边框；grayTitle：标题为灰色背景;gltStyle1:无上边框，与单记录表一起使用时使用；childrenGltStyle：子列表样式
   * @typedef {'noBorder' | 'grayTitle' | 'gltStyle1' | 'childrenGltStyle' | Array<'noBorder' | 'grayTitle' | 'gltStyle1' | 'childrenGltStyle' | 'null'}
   */
  @Input() class: HyGltClass | Array<HyGltClass> | null;

  /** 自定义数据 */
  @Input() datas: any;

  /** 是否可以改变 nzPageSize */
  @Input() showSizeChanger: boolean = true;

  /** 表格大小 */
  @Input() size: 'middle' | 'small' | 'default' = 'middle';

  /** 显示标题 */
  @Input() showTitle: boolean = true;

  /** 嵌套模板 */
  @Input() childrenTemplate: TemplateRef<any>;

  /** 是否显示分页器 */
  @Input() showPagination: boolean = true;

  /** 是否显示刷新按钮 */
  @Input() showRefresh: boolean = false;

  /** 是否可以快速跳转至某页 */
  @Input() showQuickJumper: boolean = true;

  /** 指定分页显示的位置 'top' | 'bottom' | 'both' */
  @Input() paginationPosition: 'top' | 'bottom' | 'both' = 'bottom';

  /** 页数选择器可选值 */
  @Input() pageSizeOptions: number[] = [10, 20, 30, 40, 50];

  /** 是否在前端对数据进行分页，如果在服务器分页数据或者需要在前端显示全部数据时传入false */
  @Input() frontPagination: boolean = false;

  /** 延迟显示加载效果的时间（防止闪烁） */
  @Input() loadingDelay: number = 0;

  /** 是否提供多选框 */
  // @Input() showCheckbox: boolean = false;

  /** 是否跨页多选 */
  @Input() isSpreadCheckbox: boolean = false;

  /** 跨页多选-选中的数组对象数据 */
  @Input() spreadCheckedData: object[] = [];

  /** 跨页多选-作为唯一值的字段名，如id、key */
  @Input() spreadCheckKeyName: string = '';

  /** 跨页多选-跟随spreadCheckedData一同返回的字段名称，如：传入["name","age"]，则返回[{id:'xxx',name:'name1',age:18}] */
  @Input() spreadCheckKeyNameList: string[] = [];

  /** 是否提供选择全部数据,为true时，可跨页全选 */
  // @Input() showCheckAll: boolean = false;

  /** 是否提供单选 */
  // @Input() showRadio: boolean = false;

  /** 使用嵌套子模板时，是否可展开子模板 */
  // @Input() showExpand: boolean = false;

  /** 是否显示行号 */
  // @Input() showOrderNum: boolean = false;

  /** 行号名称 */
  @Input() OrderNumName: string;

  /** 无总数分页模式下，查询总数的url */
  @Input() countUrl: string;

  /** 点击单个多选框的方法 */
  @Output('onCheckOneChange') refresh_Status = new EventEmitter();

  /** 全选多选框的方法 */
  @Output('onCheckAllChange') onCheckall_Change = new EventEmitter();

  /** 单选选中事件 */
  @Output() onRadioCheckChange = new EventEmitter();

  /** 展开嵌套模板的方法 */
  @Output('expand_change') expand_change = new EventEmitter();

  /** 跨页多选-选中的数组对象数据变动事件 */
  @Output() spreadCheckedDataChange = new EventEmitter();

  /** 自定义分页方法，使用后将中断glt内部的分页事件，需要开发人员主动调用此事件返回的方法 */
  @Output() onPageIndexChange = new EventEmitter<() => void>();

  /** 自定义修改分页数量方法，使用后将中断glt内部的分页事件，需要开发人员主动调用此事件返回的方法 */
  @Output() onPageSizeChange = new EventEmitter<() => void>();

  /** 请求结束事件,仅无总数分页中可用 */
  @Output() onRequestEnd = new EventEmitter<() => void>();

  datas_oneRow: any = [{}];

  /** 表头过滤-文本输入的查询内容 */
  public searchValue: string;

  /** th过滤是否显示弹出框 */
  public visible = false;

  /** 无总数分页-总数 */
  public noTotalPageCount: number = 0;

  /** 无总数分页-页数 */
  public noTotalPageIndex: number = 1;

  /** 无总数分页-页码 */
  public noTotalPageSize: number = 10;

  /** 无总数分页-当最后一页删除最后一条数据时，此变量为true，用于隐藏下一页按钮 */
  private noTotalPageAutoPageChange: boolean = false;

  /** 无总数分页-下一页是否允许点击 */
  public noTotalPageNextDisabled: boolean = false;

  /** 无总数分页-计算总数的方法 */
  private addnoTotalPageCount: () => void;

  /** 多选模式-是否显示提示框 */
  public isShowTip: boolean = false;

  /** 标题高度 */
  public tipTopHeight: string = '46px';

  /** 当前页面是否改变了（用于记录和防止noTotalPage时，因为noTotalPageCount变动导致的pageindexChange触发） */
  private isCurrentPageDataChange = false;

  /** 是否点击了分页 */
  private isPageIndexChange: boolean = false;

  /** 是否点击了分页 */
  private isPageSizeChange: boolean = false;

  /** 跨页全选-下拉菜单 */
  public menu: any = null;

  timestamp: any;

  /** 更新时间戳 */
  private updateTimestamp: number = 0;

  /** 展示数据集合 */
  public listOfDisplayData: any[] = [];

  /** 标题模板 */
  public _titleTemp: TemplateRef<void>;

  /** 标题 */
  public _titleString: string;

  public tempTitleHeight: boolean = true;

  /** 刷新按钮timeout */
  private refreshTimeout;

  /** 全选框是否显示半选中样式 */
  public isIndeterminate: boolean = false;

  /** 选中数量 */
  public checkedNum: number = 0;

  /** 提示宽度 */
  public tipWidth: string = '0px';

  /** 分页数据 */
  public pageData: { pageIndex: number, pageSize: number, count: number } = {
    pageIndex: 1,
    pageSize: this.pageSizeOptions[0],
    count: 0
  };

  /** 总条数 */
  public count: number;

  /** checkbox模式+跨页多选-当前页面所选中的数据的key */
  private nowPageCheckedKeys = new Set();

  /** checkbox模式+跨页多选-选中内容的集合 */
  public _spreadCheckedData = new Set();

  /** 跨页全选-选择当前页 */
  public selectCurrentPage: boolean;

  /** 跨页全选-选择了所有页数据，也用于跨页全选中是否禁用 */
  public selectAllPage: boolean = false;

  /** 跨页全选-所有checkbox不可编辑 */
  public checkboxDisable: boolean;

  /** 当前是否刷新状态中 */
  private isRefreshChange: boolean = false;

  /** 无总数分页-总数是否查询中 */
  public isCountLoading: boolean = false;

  /** 无总数分页-查询出的总数 */
  public noPageCount: number = 0;

  public nzLeft: number = 0;

  public scrollY: string;

  public scrollX: string;

  constructor(modelService: ModelService, formService: HyFormService, public tableService: TableService, private el: ElementRef, public renderer2: Renderer2, public i18nService: I18nService, private cdr: ChangeDetectorRef) {
    super('glt', modelService, tableService, formService, {});
    this.timestamp = new Date().getTime();
  }

  ngOnInit() {
    super.init();
    this.setScroll();
  }

  ngAfterViewInit(): void {
    if (this.showCheckbox) {
      const ro = new ResizeObserver((entries, observer) => {
        for (const entry of entries) {
          this.tipWidth = entry.target.clientWidth + 'px';
        }
      });
      ro.observe(this.rowSelectionTable['elementRef'].nativeElement);
    }
    if (this.fullHeight) {
      setTimeout(() => {
        this.parent = this.getParent(this.el.nativeElement);
        this.listenParentHeight();
      }, 100);
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
    if (changes['pageSizeOptions'] && changes['pageSizeOptions'].currentValue !== undefined) {
      if (typeof this.pageSizeOptions === 'string') {
        this.pageSizeOptions = JSON.parse(this.pageSizeOptions)
      }
    }
    if (changes['scroll'] && changes['scroll'].currentValue !== undefined) {
      this.setScroll();
    }
    if (changes['isEllipsis'] && changes['isEllipsis'].currentValue !== undefined) {
      this.tableService.isEllipsis = this.isEllipsis;
    }
    if (changes['spreadCheckedData'] && changes['spreadCheckedData'].currentValue !== undefined) {
      this.setDateBySpreadChecked();
      this.spreadCheckboxStatusChange();
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
      if (this._class.includes('gltStyle1')) {
        const parent = this.getParentByHyFlex(this.el.nativeElement);
        if (parent) {
          parent.style.marginTop = '-1px';
        }
      }
    }
  }

  /** 设置滚动 */
  private setScroll() {
    if (this.scroll?.y) {
      this.scrollY = this.scroll.y;
    }
    if (this.scroll?.x) {
      this.scrollX = this.scroll.x;
    }
  }

  /** 获取hyFlex的父节点 */
  private getParentByHyFlex(element: Element) {
    const parent = element.parentElement;
    if (parent) {
      if (parent.getAttribute('hyFlex')) {
        return parent;
      }
      return this.getParentByHyFlex(parent);
    }
  }

  /** checkbox模式下的全选事件 */
  public checkAll(flag: boolean): void {
    let datas = this.listOfDisplayData;
    if (this.isSpreadCheckbox && !this.selectAllPage) {
      if (flag) {
        datas.forEach(element => {
          const index = [...this._spreadCheckedData].findIndex(item => item[this.spreadCheckKeyName] === element[this.spreadCheckKeyName]);
          if (index === -1) {
            const data = {
              [this.spreadCheckKeyName]: element[this.spreadCheckKeyName]
            };
            this.spreadCheckKeyNameList.forEach(key => {
              data[key] = element[key];
            })
            this._spreadCheckedData.add(data);
            this.nowPageCheckedKeys.add(element[this.spreadCheckKeyName]);
            element['checked'] = true;
          }
        })
      } else {
        datas.forEach(element => {
          const tempItem = [...this._spreadCheckedData].find(item => item[this.spreadCheckKeyName] === element[this.spreadCheckKeyName]);
          if (tempItem) {
            this._spreadCheckedData.delete(tempItem);
          }
          element['checked'] = false;
        })
        this.nowPageCheckedKeys.clear();
      }
      this.spreadCheckboxStatusChange();
      this.spreadCheckedDataChange.emit([...this._spreadCheckedData]);
    } else {
      // 如果当前是全选状态，包括跨页全选状态
      if (this.selectAllPage) {
        if (flag) {
          for (let item of datas) {
            delete item['checked'];
          }
          this.checkboxDisable = true;
          this.isShowTip = true;
          this.modelService[this.modelName + '_$Property']['checkAllPageData'] = true;
        } else {
          this.checkboxDisable = false; //checkbox允许点击
          this.selectAllPage = false;
          this.isShowTip = false;
          //已经是跨页全选的标志，但是未选中数据
          delete this.modelService[this.modelName + '_$Property']['checkAllPageData'];
          if (this.frontPagination) {
            this.modelService[this.modelName].forEach(element => {
              delete element['checked'];
            })
            this.spreadCheckedData = [];
            this._spreadCheckedData.clear();
            this.spreadCheckboxStatusChange();
            this.spreadCheckedDataChange.emit([...this._spreadCheckedData]);
          }
        }
      } else {
        for (let item of datas) {
          item['checked'] = flag;
        }
        if (flag) {
          this.isShowTip = true;
          this.checkedNum = datas.length;
        } else {
          this.isShowTip = false;
          this.checkedNum = 0;
        }
        this.checkboxDisable = false; //checkbox允许点击
        this.selectCurrentPage = true; //选中本页数据
        this.isIndeterminate = false;
        this.isAllDisplayDataChecked = flag;
        delete this.modelService[this.modelName + '_$Property']['checkAllPageData'];
      }
    }
    this.getTheadHeight();
    this.onCheckall_Change.emit(flag);
    this.isAllDisplayDataCheckedChange.emit(this.isAllDisplayDataChecked);
  }

  /** 改变全选按钮样式 */
  public changeAllCheckedBtn() {
    let num = 0;
    this.modelService[this.modelName].forEach(element => {
      if (element['checked']) {
        num++;
      }
    })
    this.checkedNum = num;
    if (num > 0) {
      if (num < this.modelService[this.modelName].length) {
        this.isIndeterminate = true;
        this.isAllDisplayDataChecked = false;
      }
      if (num === this.modelService[this.modelName].length) {
        this.isIndeterminate = false;
        this.isAllDisplayDataChecked = true;
      }
    } else {
      this.isIndeterminate = false;
      this.isAllDisplayDataChecked = false;
      this.isShowTip = false;
    }

    if (this.isIndeterminate || this.isAllDisplayDataChecked) {
      this.isShowTip = true;
    }
  }

  /** 嵌套模板，展开事件 */
  public expandChange(expand: boolean, index: number, item: any) {
    this.expand_change.emit({ expand: expand, index: index, item: item });
  }

  /** 页数变动事件 */
  public pageIndexChange(curPage?: any, isNaxtPage?: boolean) {
    if ((this.isPageSizeChange || this.isCurrentPageDataChange) && this.noTotalPage) return;
    this.isPageIndexChange = true;
    this.pageData.pageIndex = curPage;
    const fn = () => {
      let glt_$io = this.modelService[this.modelName + '_$io'];
      let glt_$property = this.modelService[this.modelName + '_$Property'];
      if (glt_$io && glt_$property && glt_$property.pageSize) {
        glt_$io.ops = glt_$io.ops || {};
        glt_$io.ops.showMsg = false;
        glt_$io.ops.gltNewSearch = false;
        glt_$io.ops.resCompleteFn_Context = self;
        glt_$property.curPage = curPage;
        this.modelService[this.modelName + '_$Property'].curPage = curPage;
        // 如果使用了自动分页
        if (this.noTotalPage) {
          // 判断是否禁用前后点击按钮
          if (this.noTotalPageIndex !== Math.ceil(this.noTotalPageCount / this.noTotalPageSize)) {
            this.noTotalPageNextDisabled = false;
          }
          if (this.modelService[this.modelName].length === glt_$property.pageSize) {
            delete glt_$io.ops.glt;
            glt_$io.ops.isApiMode = true;
            glt_$io.datas[this.modelName + '_$Property'] = this.modelService[this.modelName + '_$Property'];
            glt_$io.ops['successFn'] = (e) => {
              const data = e.datas[this.modelName];
              if (!data || data.length === 0) {
                glt_$property.curPage = glt_$property.curPage > 1 ? glt_$property.curPage - 1 : 1;
                this.addnoTotalPageCount = null;
                this.noTotalPageNextDisabled = true;
                $hyapi.msg.createTips('warning', this.i18nService.getFrameI18n('hy-glt.没有更多数据了'));
                this.isPageIndexChange = false;
              } else {
                this.modelService[this.modelName] = e.datas[this.modelName];
                glt_$io.datas[this.modelName + '_$Property'] = this.modelService[this.modelName + '_$Property']
              }
              setTimeout(() => {
                if (this.noTotalPageAutoPageChange) {
                  this.noTotalPageNextDisabled = true;
                }
                this.onRequestEnd.emit(e);
              }, 101);
            }
          }
          $hyapi.io.post(this.modelService, glt_$io.url, glt_$io.datas, glt_$io.ops);
        } else {
          $hyapi.io.post(this.modelService, glt_$io.url, glt_$io.datas, glt_$io.ops);
        }
      }
      // this.indexSizeChange = true;
      if (!this.selectAllPage) {
        this.isIndeterminate = false;
        this.isAllDisplayDataChecked = false;
        this.isShowTip = false;
      }
      //前端分页，数据刷新时，若总条数与上一次总条数不相等，会触发pageIndexChange,以下代码解决前端分页数据刷新时，取消选中效果
      if (this.frontPagination == true && curPage == 1 && this.count !== this.modelService[this.modelName].length) {
        this.cancelCheckAll();
      }
      this.count = this.modelService[this.modelName].length;
    };
    if (this.onPageIndexChange.observers.length > 0 && !isNaxtPage && !this.isPageSizeChange) {
      this.onPageIndexChange.emit(fn)
      return;
    }
    fn();
  }

  /** 页码变动事件 */
  public pageSizeChange($event: any) {
    this.isPageSizeChange = true;
    this.noTotalPageNextDisabled = false;
    this.pageData.pageSize = $event;
    const fn = () => {
      if ($event) {
        let glt_$property = this.modelService[this.modelName + '_$Property'];
        let glt_$io = this.modelService[this.modelName + '_$io'];
        glt_$property.pageSize = $event;

        if (this.noTotalPage) {
          this.noTotalPageSize = $event;
          this.addnoTotalPageCount = () => {
            if (this.modelService[this.modelName].length > 0) {
              this.noTotalPageCount = this.noTotalPageIndex * this.noTotalPageSize - (this.noTotalPageSize - this.modelService[this.modelName].length);
            }
          }
          // 改变pageSize后总数设置为0，使数据初始化，回到第一页
          this.noTotalPageCount = 0;
          glt_$property.curPage = 1;
        } else {
          //阿里会自动计算当前页是否没数据 没数据会自动调pageIndexChange
          if ((glt_$property.curPage - 1) * glt_$property.pageSize > glt_$property.count) {
            return;
          }
        }
        if (glt_$io && glt_$property && glt_$property.pageSize) {
          glt_$io.ops = glt_$io.ops || {};
          glt_$io.ops.showMsg = false;
          glt_$io.ops.gltNewSearch = false;
          glt_$io.ops.resCompleteFn_Context = self;

          $hyapi.io.post(this.modelService, glt_$io.url, glt_$io.datas, glt_$io.ops);
        }
        if (!this.selectAllPage) {
          this.isIndeterminate = false;
          this.isAllDisplayDataChecked = false;
          this.isShowTip = false;
        }
      }
      // this.indexSizeChange = true;
    };
    if (this.onPageSizeChange.observers.length > 0) {
      this.onPageSizeChange.emit(fn);
      return;
    }
    fn();
  }

  /** 当前页面展示数据改变的回调函数 */
  public currentPageDataChange($event: any): void {
    let glt_$io = this.modelService[this.modelName + '_$io'];
    if (JSON.stringify($event) === JSON.stringify(this.listOfDisplayData) && !glt_$io?.ops?.gltNewSearch && !this.isRefreshChange && glt_$io?.timestamp === this.updateTimestamp) {
      return;
    }
    this.listOfDisplayData = $event;
    clearTimeout(this.timeOut);
    this.updateTimestamp = glt_$io?.timestamp || 0;
    this.timeOut = setTimeout(() => {
      this.setNzLeftAndRight($event);
      const glt_$io = this.modelService[this.modelName + '_$io'];
      const gltNewSearch = glt_$io?.ops?.gltNewSearch ?? false;
      const property = this.modelService[this.modelName + '_$Property'];
      // 如果是
      if (!this.frontPagination) {
        this.pageData.count = property.count;
        this.pageData.pageIndex = property.curPage;
        this.pageData.pageSize = property.pageSize;
      }

      // 如果当前是跨页多选，并且跨页多选有默认数据
      if (this.isSpreadCheckbox) {
        this.setDateBySpreadChecked();
      }

      if (this.noTotalPage) {
        if (this.countUrl) {
          if (!this.isPageIndexChange && !this.isPageSizeChange && !this.isRefreshChange) {
            this.noPageCount = 0;
            this.isCountLoading = false;
          }
        }
        // 如果外部是查询方式，则默认查询第一页
        if (gltNewSearch) {
          this.modelService[this.modelName + '_$Property'].curPage = 1;
        }
        // 无分页模式下，noTotalPageSize按照外部设置的pageSize设置
        if (this.modelService[this.modelName + '_$Property'] && this.modelService[this.modelName + '_$Property'].pageSize) {
          this.noTotalPageSize = this.modelService[this.modelName + '_$Property'].pageSize;
        }
        // 初始化禁止点击下一页的变量
        this.noTotalPageNextDisabled = false;
        if (this.noTotalPageCount === 0) {
          this.isCurrentPageDataChange = true;
          this.noTotalPageCount += this.modelService[this.modelName].length;
        }
        // 如果查询出数据是0、通过页码变动进入、非手动查询，则重新跳转到最后一页，并且清空addnoTotalPageCount方法
        if ($event.length === 0 && this.isPageIndexChange && !gltNewSearch) {
          setTimeout(() => {
            this.addnoTotalPageCount = null;
            this.noTotalPageNextDisabled = true;
            this.pageIndexChange(Math.ceil(this.noTotalPageCount / this.noTotalPageSize));
          }, 100);
          return;
        } else if ($event.length > 0 && this.addnoTotalPageCount) {
          this.addnoTotalPageCount();
          this.addnoTotalPageCount = null;
        } else if ($event.length > 0 && this.isPageIndexChange === false) {
          this.noTotalPageCount = this.modelService[this.modelName + '_$Property']['curPage'] * this.noTotalPageSize - (this.noTotalPageSize - $event.length);
        }
        // 如果查询出数据是0，并且是通过pageSize改变的
        if ($event.length === 0 && this.isPageSizeChange) {
          setTimeout(() => {
            this.pageIndexChange(Math.ceil(this.noTotalPageCount / this.noTotalPageSize));
          }, 100);
        }
        // 当页数据量不为0，并且小于当前分页数量，下一页按钮不可点击
        if ($event.length > 0 && $event.length < this.noTotalPageSize) {
          this.noTotalPageNextDisabled = true;
        }
      }
      //解决类似11条数据，放到第二页，删除第二页数据，数据显示不正常问题
      if ($event.length == 0 && this.isPageSizeChange === false && !this.modelService[this.modelName + '_isSetGltData']) {
        let glt_$property = this.modelService[this.modelName + '_$Property'];
        // 使用了无总数分页
        if (this.noTotalPage) {
          // 不是点击分页触发、不是切换页码触发、不是查询触发，则请求上一页数据
          setTimeout(() => {
            if (!this.isPageIndexChange && !this.isPageSizeChange && !gltNewSearch && glt_$property.curPage > 1) {
              // 如果使用了跨页多选或跨页全选，则直接回到第一页
              if (this.isSpreadCheckbox || this.showCheckAll) {
                this.noTotalPageCount = 0;
                this.noTotalPageIndex = 1;
                this.pageIndexChange(1);
              } else {
                this.noTotalPageCount = (this.modelService[this.modelName + '_$Property']['curPage'] - 1) * this.noTotalPageSize;
                this.pageIndexChange(Math.ceil(this.noTotalPageCount / this.noTotalPageSize));
              }
            }
          }, 100);
        } else {
          if (glt_$property.count > 0) {
            let curPage = Math.ceil(glt_$property.count / glt_$property.pageSize);
            if (curPage >= 1) {
              setTimeout(() => {
                this.pageIndexChange(curPage);
              }, 100);
            }
          }
        }
      }

      // 清空普通多选分页的数量
      this.checkedNum = 0;

      // 修改checkbox选中提示
      if (!this.isSpreadCheckbox && !this.showCheckAll) {
        this.isShowTip = false;
      }
      // 修改checkbox状态
      this.setCheckboxStatus();

      // 前端分页、非跨页多选，翻页需清除当前页的chekbox标记
      if (this.frontPagination && !this.isSpreadCheckbox) {
        for (let item of this.modelService[this.modelName]) {
          delete item['checked'];
        }
      }

      this.isPageIndexChange = false;
      this.isPageSizeChange = false;
      this.isRefreshChange = false;
      setTimeout(() => {
        this.isCurrentPageDataChange = false;
      }, 100);
    }, 100);
    this.getTheadHeight();
  }

  /** 根据跨页多选数据设置表格数据 */
  private setDateBySpreadChecked() {
    if (this.isSpreadCheckbox && this.listOfDisplayData.length > 0 && this.spreadCheckedData?.length > 0) {
      this.nowPageCheckedKeys.clear();
      this._spreadCheckedData.clear();
      this.spreadCheckedData.forEach(element => {
        this._spreadCheckedData.add(element);
      })
      // 区分跨页多选状态下，是否为本地分页和服务器分页
      const tempData = this.frontPagination ? this.modelService[this.modelName] : this.listOfDisplayData;
      tempData.forEach(element => {
        const index = this.spreadCheckedData.findIndex(item => item[this.spreadCheckKeyName] === element[this.spreadCheckKeyName]);
        if (index > -1) {
          element['checked'] = true;
          this._spreadCheckedData.add(this.spreadCheckedData[index]);
          this.nowPageCheckedKeys.add(element[this.spreadCheckKeyName]);
        } else {
          element['checked'] = false;
        }
      })
    } else {
      this._spreadCheckedData.clear();
      this.nowPageCheckedKeys.clear();
    }
  }

  /** 设置多选框状态 */
  private setCheckboxStatus() {
    // 如果不是‘换页’或者‘换页面’进行的改动，则清除所有checkbox状态
    if (!this.isPageIndexChange && !this.isPageSizeChange) {
      if (this.isSpreadCheckbox) {
        this._spreadCheckedData.clear();
        this.nowPageCheckedKeys.clear();
        this.listOfDisplayData.forEach(item => {
          delete item.checked;
        })
        this.spreadCheckedData = [];
        this.spreadCheckedDataChange.emit(this.spreadCheckedData);
      }
      this.cancelCheckAll();
      this.isShowTip = this.checkedNum > 0 ? true : false;
      if (this.listOfDisplayData.length > 0) {
        this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => item.checked);
      }
      this.isIndeterminate = this.isAllDisplayDataChecked ? false : this.listOfDisplayData.some(item => item.checked);
    } else {
      this.spreadCheckboxStatusChange();
    }
  }

  /** 跨页多选状态变动 */
  private spreadCheckboxStatusChange() {
    if (this.isSpreadCheckbox && !this.selectAllPage) {
      this.isShowTip = true;
      if (this.nowPageCheckedKeys.size === this.listOfDisplayData.length && this.listOfDisplayData.length > 0) {
        this.isAllDisplayDataChecked = true;
        this.isIndeterminate = false;
      } else if (this.nowPageCheckedKeys.size > 0) {
        this.isAllDisplayDataChecked = false;
        this.isIndeterminate = true;
      } else {
        this.isAllDisplayDataChecked = false;
        this.isIndeterminate = false;
      }
    }
  }

  /** 多选模式下，选中事件变动 */
  public checkedChange(flag, item) {
    if (this.isSpreadCheckbox) {
      if (flag) {
        this.nowPageCheckedKeys.add(item);
        const data = {
          [this.spreadCheckKeyName]: item[this.spreadCheckKeyName]
        };
        this.spreadCheckKeyNameList.forEach(element => {
          data[element] = item[element];
        })
        this._spreadCheckedData.add(data);
      } else {
        this.nowPageCheckedKeys.delete(item[this.spreadCheckKeyName]);
        this._spreadCheckedData.forEach(element => {
          if (element[this.spreadCheckKeyName] === item[this.spreadCheckKeyName]) {
            this._spreadCheckedData.delete(element);
          }
        })
      }
      if (this.frontPagination) {
        item['checked'] = flag;
      }
      this.spreadCheckboxStatusChange();
      this.spreadCheckedDataChange.emit([...this._spreadCheckedData]);
    } else {
      // 跨页全选
      if (this.selectAllPage) {
        this.changeAllCheckedBtn();
        this.isAllDisplayDataCheckedChange.emit(this.isAllDisplayDataChecked);
        //点击单个多选框时，切换为本页数据
        this.selectAllPage = false;
        this.selectCurrentPage = true;
        delete this.modelService[this.modelName + '_$Property']['checkAllPageData'];
        this.setCheckboxStatus();
        this.getTheadHeight();
        this.refresh_Status.emit(item);
      } else {
        // 普通多选
        item['checked'] = flag;
        this.checkedNum = this.listOfDisplayData.filter(fItem => fItem.checked === true).length;
        this.setCheckboxStatus();
        this.refresh_Status.emit(item);
      }
    }
  }

  /** th过滤点击搜索后关闭弹框 */
  onFilterChangeOk() {
    this.visible = false;
  }

  /** th过滤点击重置后清楚数据 */
  onFilterChangeReset() {
    delete this.searchValue;
  }

  /** 排序之前的数据顺序 */
  private beforeSortData: Array<any> = [];

  /** 排序 */
  sortOrderChange(sort, modelName, onSortChange, sortFn, index: number) {
    if (onSortChange.observers.length > 0) {
      onSortChange.emit({ sort, modelName });
      return;
    }
    if (sortFn) {
      setTimeout(() => {
        this.tableService.heads[index]['sortOrder'] = sort;
      }, 100);
      return sortFn(sort, modelName);
    }
    let gltData: Array<any> = this.modelService[this.modelName];
    if (sort == 'ascend') {
      this.beforeSortData = JSON.parse(JSON.stringify(gltData));
    }
    if (sort == 'ascend' || sort == 'descend') {
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
    } else {
      this.modelService[this.modelName] = this.beforeSortData;
    }
    setTimeout(() => {
      this.tableService.heads.forEach((item, index) => {
        this.tableService.heads[index]['sortOrder'] = null;
      })
      this.tableService.heads[index]['sortOrder'] = sort;
    }, 100);
  }

  // refreshSort() {
  //   this.tableService.heads.forEach(item => {
  //     // item['sortOrder'] = null;
  //   })
  // }

  /** 跨页全选-选择所有页面数据 */
  public checkAllPageData() {
    if (this.selectAllPage == false && this.listOfDisplayData.length > 0) {
      this.isIndeterminate = false;
      this.checkedNum = 0;
      this.isAllDisplayDataChecked = true;  //th的全选状态
      this.isAllDisplayDataCheckedChange.emit(this.isAllDisplayDataChecked);
      this.selectCurrentPage = false; //“本页数据”不选中
      this.checkboxDisable = true;
      this.selectAllPage = true;
      let datas = this.listOfDisplayData;
      for (let item of datas) {
        delete item['checked'];
      }
      this._spreadCheckedData.clear();
      this.nowPageCheckedKeys.clear();
      this.spreadCheckboxStatusChange();
      this.spreadCheckedDataChange.emit([...this._spreadCheckedData]);
      this.modelService[this.modelName + '_$Property']['checkAllPageData'] = true;
      this.checkAll(this.isAllDisplayDataChecked);
    }
  }

  /** 取消所有选中状态 */
  private cancelCheckAll() {
    //处理数据重新刷新的情况
    this.isAllDisplayDataChecked = false; //将全选样式变为false
    this.isAllDisplayDataCheckedChange.emit(this.isAllDisplayDataChecked);
    this.checkboxDisable = false; //checkbox允许点击
    this.isIndeterminate = false;
    this.isShowTip = false;
    //清除当前页、所有页数据选中效果
    this.selectAllPage = false;
    this.selectCurrentPage = false;
    //删除该值
    delete this.modelService[this.modelName + '_$Property']['checkAllPageData'];
  }


  /** 无总数分页-自动分页下一页事件 */
  public nextPage() {
    const fn = () => {
      if (this.noTotalPageNextDisabled) return;
      const page = Math.ceil(this.noTotalPageCount / this.noTotalPageSize);
      if (page === this.noTotalPageIndex) {
        this.pageIndexChange(this.noTotalPageIndex + 1, true);
        this.addnoTotalPageCount = () => {
          this.noTotalPageCount += this.modelService[this.modelName].length;
          this.noTotalPageIndex += 1;
          if (this.modelService[this.modelName].length !== this.noTotalPageSize) {
            this.noTotalPageNextDisabled = true;
          }
        }
      }
    }
    if (this.onPageIndexChange.observers.length > 0) {
      this.onPageIndexChange.emit(fn);
      return;
    }
    fn();
  }


  /** 刷新按钮 */
  public refresh() {
    this.isRefreshChange = true;
    clearTimeout(this.refreshTimeout);
    this.refreshTimeout = setTimeout(() => {
      let glt_$io = this.modelService[this.modelName + '_$io'];
      $hyapi.io.post(this.modelService, glt_$io.url, glt_$io.datas, glt_$io.ops);
      clearTimeout(this.refreshTimeout);
    }, 300);

  }

  /** 获取标题高度 */
  private getTheadHeight() {
    const targetNode = this.thead.nativeElement;
    this.tipTopHeight = targetNode.clientHeight + 'px';
  }

  /** 无总数分页-点击查询总数事件 */
  public queryNoCountNumber() {
    if (this.countUrl) {
      this.isCountLoading = true;
      let glt_$io = this.modelService[this.modelName + '_$io'];
      $hyapi.io.post(this.modelService, this.countUrl, glt_$io.datas, {
        showMsg: false,
        showLoading: false,
        isApiMode: true,
        successFn: (data) => {
          setTimeout(() => {
            if (!this.isCountLoading) return;
            this.isCountLoading = false;
            this.noPageCount = data.datas[this.modelName + '_$Property'].count;
          }, 500);
        },
        failFn: () => {
          setTimeout(() => {
            this.isCountLoading = false;
          }, 500);
        }
      })
    }
  }

  /** 获取父级元素 */
  private getParent(element: any) {
    const parent = element.parentElement;
    if (!parent) {
      return element;
    }

    // 获取计算后的样式
    const computedStyle = getComputedStyle(parent);

    // 多种方式检测 display: contents
    const isDisplayContents = computedStyle.display === 'contents' || computedStyle.getPropertyValue('display') === 'contents';

    // 检测 all: initial - 由于all属性比较特殊，我们通过多种方式检测
    const allProperty = computedStyle.getPropertyValue('all');
    const isAllInitial = allProperty === 'initial' || allProperty === 'unset';

    if (isDisplayContents) {
      return this.getParent(parent);
    } else {
      return parent;
    }
  }

  /** 父级元素 */
  private parent: any;

  /** 监听父级高度 */
  private listenParentHeight() {
    if (!this.parent) {
      this.parent = this.parentElement ? this.parentElement : this.getParent(this.el.nativeElement);
      return;
    }
    let parentHeight = this.parent.clientHeight;

    // 如果显示分页，则减去分页高度
    if (this.showPagination) {
      parentHeight -= 48;
    }
    // 获取表头高度，如果一开始获取为0，则给默认值45
    parentHeight -= this.thead.nativeElement.clientHeight ? this.thead.nativeElement.clientHeight : 45;
    // 偏移量
    parentHeight -= this._class ? this._class.includes('gltStyle1') ? 16 : 24 : 24;
    if (this.scroll) {
      if (this.scroll.y) {
        this.scrollY = parentHeight + 'px';
      }
      if (this.scroll.x) {
        this.scrollX = this.scroll.x;
      }
    } else {
      this.scrollY = parentHeight + 'px';
      this.scrollX = '100%';
    }

  }

  /** 监听父级高度变化 */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.fullHeight) {
      this.listenParentHeight();
    }
  }
}
