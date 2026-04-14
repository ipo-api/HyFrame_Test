import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { HyBaseInput } from '../../../../common/domain/base/HyBaseInput';
import { $hyapi } from '../../../../api/$hyapi';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { DicService } from '../../../../service/dic.service';
import { ModelService } from '../../../../common/domain/service/model.service';
import { FormBuilder } from '@angular/forms';
import { Emitter } from '../../../../func/event/Emitter';
import { ED } from '../../../../../config/EventDefined';
import { HySize } from '../../interface';
import { HySelectItem, HySelectMode } from '../hy-select/interface';
import { NzSelectModeType } from 'ng-zorro-antd/select';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';
import { I18nService } from '../../../../_index';

@Component({
  selector: 'hyb-select',
  templateUrl: './hyb-select.component.html',
  styleUrls: ['./hyb-select.component.less'],
})
export class HybSelectComponent extends HyBaseInput implements OnInit, OnDestroy, OnChanges {
  @ViewChild('searchValueSpan') searchValueSpan: TemplateRef<any>;

  @ViewChild('selectBox') selectBox: TemplateRef<any>;

  @ViewChild('maxTagPlaceholder') maxTagPlaceholder: TemplateRef<any>;

  selectSearchValue: string;

  selectSearchTempData: HySelectItem[] = [];

  gtEnableChangeFn: any;

  bigDataItems: Array<HySelectItem>;

  _mode: NzSelectModeType = 'default';

  disabled: boolean = false;

  bigData: boolean = false;

  uuid: string;

  tagList: Array<any>;

  isHySelectNowrapMultipleFlex: boolean = false;

  /** 不换行嵌套模式下，文本内容的数量值 */
  maxSelectSearchValueLength: number;

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

  @Input('dic') dicName: string;

  @Input('model') modelName: string;

  /** 单选模式下，是否可搜索 */
  @Input() showFilter: boolean = false;

  /** 选择器样式 */
  @Input() selectStyle: any = { width: '120px' };

  /** 选择框大小 */
  @Input() size: HySize;

  /** 是否显示清除按钮 */
  @Input() allowClear: boolean = true;

  /** 占位文本 */
  @Input() placeholder;

  /** 设置 nz-select 的模式,多选时模式为multiple，多选不换行为nowrapMultiple*/
  @Input() mode: HySelectMode = 'default';

  /** true允许输入，false不允许输入 */
  @Input() enable: boolean = true;

  /** 最多显示多少个标签（最多显示999个标签） */
  @Input() maxTagCount: number;

  /** 值变动事件 */
  @Output('onChange_model') onChange_model = new EventEmitter();

  /** 下拉菜单打开状态变化回调 */
  @Output('onChange_open') onChange_open = new EventEmitter();

  hyOpenChange(value: any) {
    this.onChange_open.emit(value);
    super.setCdkOverlayContainer(value);
  }

  /** 自定义数据 */
  @Input() items: HySelectItem[] = [];

  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, public dicService: DicService, fb: FormBuilder, public validatorFnsService: ValidatorFnsService, public i18nService:I18nService) {
    super('select', formService, tableService, modelService, el, fb, validatorFnsService);
  }

  ngOnInit() {
    super.init();
    this.gtEnableChangeFn = (eventName, datas) => {
      if (!this.disabled) {
        this.disabled = !datas;
      }
    };
    Emitter.on(this.tableService.modelName + '_' + ED.UI_Gt_Enable_Change, this.gtEnableChangeFn);
    this.uuid = this.getUuid();
    /** 订阅动态字典请求 */
    this.dicService.createSubject(this.uuid).subscribe(e => {
      if (e && e.name === this.dicName) {
        const items = $hyapi.dic.getFromCache(this.dicName, this.modelService) as Array<any>;
        if (items && items.length >= 100) {
          this.initBigData();
        } else {
          this.items = items;
        }
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['mode'] && changes['mode'].currentValue !== undefined) {
      if (this.mode === 'multiple' || this.mode === 'nowrapMultiple') {
        this._mode = 'multiple';
        if (this.mode === 'nowrapMultiple') {
          this.maxTagCount = 0;
        }
      }
    }
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
  }

  onModelChange(modelValue: any) {
    if (this.mode === 'nowrapMultiple') {
      if (modelValue) {
        const tempTagList = [];
        const fn = (items) => {
          modelValue.forEach(element => {
            const item = items.find(item => item.id == element);
            if (item) {
              tempTagList.push(item);
            }
          })
          this.tagList = tempTagList;
        };
        fn(this.bigData ? this.bigDataItems : this.items);
      }
      this.isHySelectNowrapMultipleFlex = false;
      this.setMaxTagPlaceholderIPanelStyle();
    }
    this.onChange_model.emit(modelValue);
  }

  getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /** 初始化大数据模式 */
  initBigData() {
    this.bigDataItems = $hyapi.dic.getFromCache(this.dicName, this.modelService);
    this.bigData = true;
    if (this.datas && this.datas.length > 0 && (this.mode === 'multiple' || this.mode === 'nowrapMultiple')) {
      const items = [];
      this.datas.forEach(element => {
        const obj = this.bigDataItems.find(item => item.id === element);
        items.push(obj);
      })
      if (items.length > 0) {
        this.items = items;
      }
    } else {
      this.items = this.bigDataItems.slice(0, 100);
    }
  }

  nzOnSearch(e) {
    this.selectSearchValue = e;
    if (this.bigData) {
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
    this.setMultipleStyle();
  }

  /** 修复ng-zorro-antd@13出现的样式bug（升级至14之后这段代码需要重新验证） */
  setMultipleStyle() {
    if (this.mode === 'multiple' || this.mode === 'nowrapMultiple') {
      setTimeout(() => {
        const width = this.searchValueSpan['nativeElement'].offsetWidth;
        const nzSelectSearch = this.selectBox['nativeElement'].getElementsByTagName('nz-select-search')[0];
        if (this.mode === 'nowrapMultiple') {
          const nzSelectItem = this.selectBox['nativeElement'].getElementsByTagName('nz-select-item')[0];
          if (this.selectSearchValue && this.selectSearchValue.length > 0 && nzSelectItem) {
            nzSelectItem.style.width = '0px';
            nzSelectSearch.style.right = 'auto';
            nzSelectSearch.style.left = '4px';
          } else {
            if (nzSelectItem) {
              nzSelectItem.style.width = 'auto';
            }
          }
          this.setNzSelectSearchWidth(width < 4 ? 4 : width);
          if (!this.selectSearchValue && nzSelectItem) {
            const itemWidth = nzSelectItem.offsetWidth;
            const searchRight = this.selectBox['nativeElement'].offsetWidth - (itemWidth);
            nzSelectSearch.style.removeProperty('left');
            nzSelectSearch.style.right = searchRight < 0 ? 0 : searchRight + 'px';
          }
        } else {
          const nzSelectControl = this.selectBox['nativeElement'].getElementsByTagName('nz-select-top-control')[0];
          if (width + 16 < nzSelectControl.offsetWidth) {
            nzSelectSearch.style.setProperty('width', this.selectSearchValue ? (width + 10) + 'px' : width + 'px', 'important');
            nzSelectSearch.style.setProperty('min-width', this.selectSearchValue ? (width + 10) + 'px' : width + 'px', 'important');
          }
        }
      }, 1);
    }
  }

  setNzSelectSearchWidth(width) {
    const nzSelectSearch = this.selectBox['nativeElement'].getElementsByTagName('nz-select-search')[0];
    nzSelectSearch.style.setProperty('width', width + 'px', 'important');
    nzSelectSearch.style.setProperty('min-width', width + 'px', 'important');
    nzSelectSearch.style.setProperty('max-width', width + 'px', 'important');
  }

  /** 滚动到底部 */
  nzScrollToBottom() {
    if (this.bigData) {
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

  ngOnDestroy(): void {
    super.destroy();
    Emitter.off(this.tableService.modelName + '_' + ED.UI_Gt_Enable_Change, this.gtEnableChangeFn);
    this.dicService.clearSubject(this.uuid);
  }

  overflowNumber:number = 0;
  /** nowrapMultiple模式下，修改样式 */
  setMaxTagPlaceholderIPanelStyle() {
    setTimeout(() => {
      if (this.mode === 'nowrapMultiple' && this.maxTagPlaceholder) {
        const iPanel = this.maxTagPlaceholder['nativeElement'].getElementsByTagName('i');
        this.overflowNumber = 0;
        let width = 0;
        const nzSelectControl = this.selectBox['nativeElement'].getElementsByTagName('nz-select-top-control')[0];
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
            const searchRight = this.selectBox['nativeElement'].offsetWidth - (width + (this.overflowNumber ? 60 : 10));
            this.selectBox['nativeElement'].getElementsByTagName('nz-select-search')[0].style.right = searchRight < 0 ? 0 : searchRight + 'px';
          }, 1);
        }, 1);
      } else {
        this.selectBox['nativeElement'].getElementsByTagName('nz-select-search')[0].style.right = 'auto';
      }
    }, 1);
  }
}
