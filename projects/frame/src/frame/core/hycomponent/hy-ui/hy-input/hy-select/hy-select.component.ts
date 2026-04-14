import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { HyBaseInput } from '../../../../common/domain/base/HyBaseInput';
import { $hyapi } from '../../../../api/$hyapi';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { ModelService } from '../../../../common/domain/service/model.service';
import { DicService } from '../../../../service/dic.service';
import { FormBuilder } from '@angular/forms';
import { HySelectItem, HySelectMode } from './interface';
import { HySize, HyTipType } from '../../interface';
import { NzSelectModeType } from 'ng-zorro-antd/select';
import { I18nService } from '../../../../service/i18n.service';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';

@Component({
  selector: 'hy-select',
  templateUrl: './hy-select.component.html',
  styleUrls: ['./hy-select.component.less'],
  host: {
    '[class.compoent-flex]': 'flex',
  }
})
export class HySelectComponent extends HyBaseInput implements OnInit, OnDestroy, OnChanges {
  public formValid:boolean = false;

  selectSearchValue: string;

  selectSearchTempData: HySelectItem[] = [];

  bigDataItems: Array<HySelectItem>;

  bigDataIndex: number = null;

  @ViewChild('select') select: TemplateRef<any>;

  @ViewChild('selectDiv') selectDiv: any;

  @ViewChild('selectBox') selectBox: TemplateRef<any>;

  @ViewChild('searchValueSpan') searchValueSpan: TemplateRef<any>;

  @ViewChildren('option') option: TemplateRef<any>;

  @ViewChild('maxTagPlaceholder') maxTagPlaceholder: TemplateRef<any>;

  open: boolean;

  gtEnableChangeFn: any;

  tagList: Array<any>;

  isHySelectNowrapMultipleFlex: boolean = false;

  /** 不换行嵌套模式下，文本内容的数量值 */
  maxSelectSearchValueLength: number;

  /** 栅格布局1~24 */
  @Input()
  cols: number | string;

  /** 标题 */
  @Input()
  title: string;

  /** 字典名 */
  @Input('dic')
  dicName: string;

  /** modelName（model值清空时不能赋值空字符串，用delete） */
  @Input('model')
  modelName: any;

  /** 是否隐藏标题 */
  @Input()
  noLabel: boolean = false;

  /** 是否隐藏冒号 */
  @Input()
  noColon: boolean = false;

  /** 提示 */
  @Input() tip: string | TemplateRef<void>;

  /** tip提示的类型 */
  @Input()
  tipType: HyTipType = 'default';

  /** 支持清除 */
  @Input()
  allowClear: boolean = true;

  /** 占位文字 */
  @Input()
  placeholder: string;

  /** 选择框大小 */
  @Input()
  size: HySize = 'default'; //选择框大小	

  /** 可搜索 */
  @Input()
  showFilter: boolean = true;

  /** 最多显示多少个标签（最多显示999个标签） */
  @Input()
  maxTagCount: number;

  /** 标题宽度，单位px */
  @Input()
  labelWidth: string;

  /** 标题超出长度时是否换行 */
  @Input()isLabelWrap:boolean;

  /** flex布局，单位px */
  @Input()
  flex: any; //nz-form-item是否

  _mode: NzSelectModeType = 'default';
  /** 设置 nz-select 的模式,多选时模式为multiple*/
  @Input()
  mode: HySelectMode = 'default';

  _explainTemplate: TemplateRef<void>;
  _explainString: string;
  /** 说明文字，支持string或者模板类型 */
  @Input()
  set explainText(value: string | TemplateRef<void>) {
    if (typeof value == 'string') {
      this._explainString = value
    }
    this._explainTemplate = value as TemplateRef<void>;
  }
  get explainText(): string | TemplateRef<void> {
    return this._explainTemplate;
  }

  /** true允许输入，false不允许输入 */
  @Input() enable: boolean = true;

  _ckRequired: boolean = false;
  /** 必录校验 */
  @Input()
  public set ckRequired(value: boolean) {
    if (value !== this._ckRequired) {
      if (value === true) {
        this.addCheck('ckRequired', value);
      } else {
        this.removeCheck('ckRequired');
      }
    }
    this._ckRequired = value;
  }
  public get ckRequired(): boolean {
    return this._ckRequired;
  }

  private _firstChange: boolean = true; //解决第一次unidentified 是触发

  set datas(value) {
    this.modelService[this.tableService.modelName][this.modelName] = value;
  }

  get datas() {
    let _data = this.modelService[this.tableService.modelName][this.modelName];
    if (_data != null && (typeof _data == 'string' || typeof _data == 'number')) {
      return _data + '';
    } else {
      return _data;
    }
  }

  /** 值变动事件 */
  @Output('onChange_model')
  onChange_model = new EventEmitter();

  /** 值变动事件（仅在交互上触发） */
  @Output('onChange')
  onChange = new EventEmitter();

  /** 下拉菜单打开状态变化回调 */
  @Output('onChange_open')
  onChange_open = new EventEmitter();

  isBigData: boolean = false;

  /** 自定义数据 */
  @Input() items: HySelectItem[] = [];

  /** 是否允许新增数据 */
  @Input() isAddItem: boolean = false;

  /** 允许新增数据模式下，按钮名称 */
  @Input() addItemButtonTitle: string;

  /** 允许新增数据模式下，按钮图标名称 */
  @Input() addItemButtonNzIconName: string = 'plus';

  /** 允许新增数据模式下，按钮图标名称 */
  @Input() addItemButtonHyIconName: string;

  /** 允许新增数据模式下，输入框必填 */
  @Input() addItemTextCkRequired: boolean = true;

  /** 允许新增数据模式下，输入框必须为整数数字 */
  @Input() addItemTextCkInteger: boolean = false;

  /** 允许新增数据模式下，输入框必须为数字 */
  @Input() addItemTextCkNumber: boolean = false;

  /** 允许新增数据模式下，输入框内容最大长度 */
  @Input() addItemTextCkMaxLength: number | string;

  /** 允许新增数据模式下，输入框内容最小长度 */
  @Input() addItemTextCkMinLength: number | string;

  /** 允许新增数据模式下，输入框数字类型模式下，输入数字的最大值 */
  @Input() addItemTextCkMax: number | string;

  /** 允许新增数据模式下，输入框数字类型模式下，输入数字的最小值 */
  @Input() addItemTextCkMin: number | string;

  /** 允许新增数据模式下，输入框占位文字内容*/
  @Input() addItemTextPlaceholder: string = '';

  /** 允许新增数据模式下，并且使用了dic，新增的数据是否允许添加进dic缓存 */
  @Input() isAddDic: boolean = true;

  /** 允许新增数据模式下，点击新增按钮触发的回调事件 */
  @Output() onClickAddItem = new EventEmitter();

  /** 自定义新增的数据列表 */
  addItemList: HySelectItem[] = [];

  uuid: string;

  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, private dicService: DicService, fb: FormBuilder, public i18nService: I18nService, public validatorFnsService: ValidatorFnsService) {
    super('select', formService, tableService, modelService, el, fb, validatorFnsService);
  }

  getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  ngOnInit() {
    super.init();
    this.uuid = this.getUuid();
    /** 订阅动态字典请求 */
    this.dicService.createSubject(this.uuid).subscribe(e => {
      if (e && e.name === this.dicName) {
        const items = $hyapi.dic.getFromCache(this.dicName, this.modelService) as Array<any>;
        if (items) {
          if (items.length >= 100) {
            this.initBigData();
          } else {
            this.isBigData = false;
            this.bigDataItems = [];
            this.items = items;
          }
          if (this.mode === 'nowrapMultiple') {
            if (this.datas) {
              this.tagList = this.items.filter(item => this.datas.indexOf(item.id) > -1);
              this.setMaxTagPlaceholderIPanelStyle();
            }
          }
        }
        if (this.mode === 'nowrapMultiple') {
          if (this.datas) {
            // this.onModelChange(this.datas);
            this.tagList = this.items.filter(item => this.datas.indexOf(item.id) > -1);
            this.setMaxTagPlaceholderIPanelStyle();
          }
        }
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['dicName'] && changes['dicName'].currentValue !== undefined) {
      this.dicService.getDic(this.dicName, (returnObj) => {
        const items = $hyapi.dic.getFromCache(this.dicName, this.modelService) as Array<any>;
        if (items && items.length >= 100) {
          this.initBigData();
        } else {
          this.items = items;
        }
      }, this.modelService);
    }
    if (changes['mode'] && changes['mode'].currentValue !== undefined) {
      if (this.mode === 'multiple' || this.mode === 'nowrapMultiple') {
        this._mode = 'multiple';
        if (this.mode === 'nowrapMultiple') {
          this.maxTagCount = 0;
        }
      }
    }
  }

  /** 值变动事件 */
  onModelChange(event: any) {
    if (this.mode === 'nowrapMultiple') {
      if (event) {
        const tempTagList = [];
        const fn = (items) => {
          event.forEach(element => {
            const item = items.find(item => item.id == element);
            if (item) {
              tempTagList.push(item);
            }
          })
          this.tagList = tempTagList;
        };
        fn(this.isBigData ? this.bigDataItems : this.items);
      }
    }
    if (!this._firstChange || (event && this._firstChange)) {
      if (this.open) {
        this.onChange.emit(event);
      }
      this.onChange_model.emit(event);
      super.onModelChange(undefined);
    }
    this._firstChange = false;
    this.addClearAndRemoveClick();
    this.setMaxTagPlaceholderIPanelStyle();
    if (this.isBigData && this.datas && !this.open) {
      // 单选模式下
      if (this.mode === 'default') {
        this.bigDataIndex = this.bigDataItems.findIndex(item => item.id === this.datas);
        if (this.bigDataIndex > -1) {
          this.items = [this.bigDataItems[this.bigDataIndex]];
        }
      } else {
        const items = [];
        this.datas.forEach(element => {
          const obj = this.bigDataItems.find(item => item.id === element);
          items.push(obj);
        })
        if (items.length > 0) {
          this.items = items;
        }
      }
    }
  }

  /** 添加清除事件 */
  addClearAndRemoveClick() {
    setTimeout(() => {
      if (this.selectDiv) {
        const nativeElement = this.selectDiv.nativeElement;
        const selectClears = nativeElement.getElementsByTagName('nz-select-clear');
        const selectRemove = nativeElement.getElementsByTagName('nz-select-item');
        if (selectClears && selectClears.length > 0) {
          (selectClears[0] as any).onclick = () => {
            this.setMaxTagPlaceholderIPanelStyle();
            this.onChange.emit(this.modelService[this.tableService.modelName][this.modelName]);
          };
        }
        if ((this.mode === 'multiple' || this.mode === 'nowrapMultiple') && selectRemove && selectRemove.length > 0) {
          for (let i = 0; i < selectRemove.length; i++) {
            if ((selectRemove as any)[i].getElementsByClassName('ant-select-selection-item-remove')[0]) {
              (selectRemove as any)[i].getElementsByClassName('ant-select-selection-item-remove')[0].onclick = () => {
                this.onChange.emit(this.modelService[this.tableService.modelName][this.modelName]);
              };
            }
          }
        }
      }
    }, 10);
  }

  overflowNumber: number = 0;
  /** nowrapMultiple模式下，修改样式 */
  setMaxTagPlaceholderIPanelStyle() {
    setTimeout(() => {
      if (this.mode === 'nowrapMultiple' && this.maxTagPlaceholder) {
        const iPanel = this.maxTagPlaceholder['nativeElement'].getElementsByTagName('i');
        this.overflowNumber = 0;
        let width = 0;
        const nzSelectControl = this.selectDiv['nativeElement'].getElementsByTagName('nz-select-top-control')[0];
        this.maxTagPlaceholder['nativeElement'].style.width = nzSelectControl.offsetWidth + 'px';
        setTimeout(() => {
          for (let index = 0; index < iPanel.length; index++) {
            const element = iPanel[index];
            if (element.offsetTop >= 22) {
              this.overflowNumber = iPanel.length - index;
              break;
            } else {
              width += element.offsetWidth + 5;
            }
          }
          setTimeout(() => {
            this.maxTagPlaceholder['nativeElement'].style.width = width + 2 + 'px';
            this.maxTagPlaceholder['nativeElement'].style.minWidth = width + 2 + 'px';
            const searchRight = this.selectDiv['nativeElement'].offsetWidth - (width + (this.overflowNumber ? 60 : 10));
            this.selectDiv['nativeElement'].getElementsByTagName('nz-select-search')[0].style.right = searchRight < 0 ? 0 : searchRight + 'px';
          }, 1);
        }, 1);
      } else {
        if (this.selectDiv) {
          this.selectDiv['nativeElement'].getElementsByTagName('nz-select-search')[0].style.right = 'auto';
          this.selectDiv['nativeElement'].getElementsByTagName('nz-select-search')[0].style.width = 'calc(100% - 40px)';
        }
      }
    }, 1);
  }

  /** 下拉打开事件 */
  selectOpen(value: any) {
    // 关闭窗口后，清空搜索缓存
    if (this.isBigData) {
      if (value === false) {
        this.selectSearchTempData = [];
      } else {
        if (this.datas) {
          this.items = this.bigDataItems.slice(0, 100);
        }
      }
    }
    super.setCdkOverlayContainer(value);
    setTimeout(() => {
      /** 当前下拉框宽度 */
      const triggerWidth = this.select['triggerWidth'];
      if (this.option) {
        this.option['_results'].forEach((element, index) => {
          /** 字符撑大后的div宽度 */
          const offsetWidth = element.nativeElement.offsetWidth + 24;
          if (offsetWidth > triggerWidth) {
            this.items[index]['showTip'] = true;
          } else {
            this.items[index]['showTip'] = false;
          }
        });
      }
    }, 100);
    if (this.isAddItem && this.modelService['gt_addItem'] && this.modelService['gt_addItem']['text']) {
      this.modelService['gt_addItem'].text = '';
    }
    this.onChange_open.emit(value);
  }

  /** 搜索 */
  nzOnSearch(e) {
    this.selectSearchValue = e;
    if (this.isBigData) {
      if (e) {
        const data = this.bigDataItems.filter(item => item.text.toUpperCase().indexOf(e.toUpperCase()) > -1);
        if (data.length >= 100) {
          this.selectSearchTempData = data;
          this.items = this.selectSearchTempData.slice(0, 100);
        } else {
          this.selectSearchTempData = [];
          this.items = data;
        }
      } else {
        this.selectSearchTempData = [];
        this.items = this.bigDataItems.slice(0, 100);
      }
    }
    // 修复ng-zorro-antd@13出现的样式bug（升级至14之后这段代码需要重新验证）
    this.setMultipleStyle();
  }

  /** 修复ng-zorro-antd@13出现的样式bug（升级至14之后这段代码需要重新验证） */
  setMultipleStyle() {
    if (this.mode === 'multiple' || this.mode === 'nowrapMultiple') {
      setTimeout(() => {
        const width = this.searchValueSpan['nativeElement'].offsetWidth;
        const nzSelectSearch = this.selectDiv['nativeElement'].getElementsByTagName('nz-select-search')[0];
        if (this.mode === 'nowrapMultiple') {
          const nzSelectItem = this.selectDiv['nativeElement'].getElementsByTagName('nz-select-item')[0];
          if (this.selectSearchValue && this.selectSearchValue.length > 0 && nzSelectItem) {
            nzSelectItem.style.width = '0px';
            nzSelectSearch.style.right = 'auto';
            nzSelectSearch.style.left = '4px';
          } else {
            if (nzSelectItem) {
              nzSelectItem.style.width = 'auto';
            }
          }
          this.setNzSelectSearchWidth(width < 4 ? 0 : width);
          if (!this.selectSearchValue && nzSelectItem) {
            const itemWidth = nzSelectItem.offsetWidth;
            const searchRight = this.selectDiv['nativeElement'].offsetWidth - (itemWidth);
            nzSelectSearch.style.removeProperty('left');
            nzSelectSearch.style.right = searchRight < 0 ? 0 : searchRight + 'px';
          }
        } else {
          const nzSelectControl = this.selectDiv['nativeElement'].getElementsByTagName('nz-select-top-control')[0];
          if (width + 16 < nzSelectControl.offsetWidth) {
            nzSelectSearch.style.setProperty('width', this.selectSearchValue ? (width + 10) + 'px' : width + 'px', 'important');
            nzSelectSearch.style.setProperty('min-width', this.selectSearchValue ? (width + 10) + 'px' : width + 'px', 'important');
          }
        }
      }, 1);
    }
  }

  setNzSelectSearchWidth(width) {
    const nzSelectSearch = this.selectDiv['nativeElement'].getElementsByTagName('nz-select-search')[0];
    nzSelectSearch.style.setProperty('width', width + 'px', 'important');
    nzSelectSearch.style.setProperty('min-width', width + 'px', 'important');
    nzSelectSearch.style.setProperty('max-width', width + 'px', 'important');
  }

  /** 滚动到底部 */
  nzScrollToBottom() {
    if (this.isBigData) {
      let items = [];
      if (this.selectSearchTempData.length > 0) {
        items = this.selectSearchTempData;
      } else if (!this.selectSearchValue) {
        items = this.bigDataItems;
      }
      const tempItems = items.slice(this.items.length, this.items.length + 100);
      this.items = [...this.items, ...tempItems];
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setMaxTagPlaceholderIPanelStyle();
  }

  /** 初始化大数据模式 */
  initBigData() {
    this.bigDataItems = $hyapi.dic.getFromCache(this.dicName, this.modelService);
    this.isBigData = true;
    if (this.datas && this.datas.length > 0 && (this.mode === 'multiple' || this.mode === 'nowrapMultiple')) {
      const items = [];
      this.datas.forEach(element => {
        const obj = this.bigDataItems.find(item => item.id === element);
        if(obj){
          items.push(obj);
        }
      })
      if (items.length > 0) {
        this.items = items;
      }
    } else {
      this.items = this.bigDataItems.slice(0, 100);
    }
  }

  /** 点击新增数据按钮 */
  addItem() {
    const addItemText = this.modelService['gt_addItem'].text;
    const fn = (items) => {
      const index = items.findIndex(item => item.text === addItemText);
      if (index === -1) {
        const item = {
          id: addItemText,
          text: addItemText,
          showTip: false
        };
        this.addItemList.push(item);
        if (this.isBigData) {
          items = [...[item], ...items];
        }
        this.items = [...[item], ...this.items];
        // 使用新增自定义数据时，是否添加至缓存
        if (this.isAddDic && this.dicName) {
          if (this.isBigData) {
            const items = [...[item], ...this.bigDataItems];
            this.dicService.cache({ name: this.dicName, value: items }, this.modelService);
          } else {
            this.dicService.cache({ name: this.dicName, value: this.items }, this.modelService);
          }
        }
        this.onClickAddItem.emit(item);
      } else {
        $hyapi.msg.createTips('warning', this.i18nService.getFrameI18n('hy-select.字典已存在'));
        this.modelService['gt_addItem'] = { text: null };
      }
      setTimeout(() => {
        $hyapi.model.markAsPristine(this.modelService, 'gt_addItem');
        this.modelService['gt_addItem'] = { text: null };
      }, 10);
    }
    fn(this.isBigData ? this.bigDataItems : this.items);
  }

  /** 销毁组件 */
  ngOnDestroy(): void {
    super.destroy();
    this.dicService.clearSubject(this.uuid);
  }
}
