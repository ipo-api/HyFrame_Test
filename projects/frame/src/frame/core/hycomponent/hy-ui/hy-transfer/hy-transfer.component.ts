import { Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ModelService } from '../../../common/domain/service/model.service';
import { HyBaseInput } from '../../../common/domain/base/HyBaseInput';
import { HyFormService } from '../../../common/domain/service/hyform.service';
import { TableService } from '../../../common/domain/service/hytable.service';
import { FormBuilder } from '@angular/forms';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { HyTransferData, HyTransferTemp } from './interface';
import { ValidatorFnsService } from '../../../func/check/validator-fns.service';
import { I18nService } from '../../../_index';

@Component({
  selector: 'hy-transfer',
  templateUrl: './hy-transfer.component.html',
  styleUrls: ['./hy-transfer.component.css'],
})
export class HyTransferComponent extends HyBaseInput implements OnInit, OnChanges {
  /** modelName */
  @Input('model') modelName: any;

  /** 标题集合，顺序从左至右 */
  @Input() titles: string[];

  /** 是否隐藏标题 */
  @Input() noLabel: boolean = false;

  /** 标题 */
  @Input() title: string;

  /** 标题宽度 */
  @Input() labelWidth: string;

  /** 是否隐藏冒号 */
  @Input() noColon: boolean = false;

  /** 是否显示搜索框 */
  @Input() showSearch: boolean = true;

  /** 支持修改文本框的搜索字段 */
  @Input() searchName: string = 'title';

  /** 搜索框的默认值 */
  @Input() placeholder: string;

  /** 标题超出长度时是否换行 */
  @Input() isLabelWrap: boolean;

  /** 操作文案集合，顺序从下至上(左右箭头上面可以增加文字) */
  @Input() operations: string[] = ['', ''];

  /** 单位,默认值" 项" */
  @Input() itemsUnit: string;

  @Input() tempConfigs: Array<HyTransferTemp>;

  /** 两个穿梭框的自定义样式，等同 ngStyle */
  @Input() listStyle: any;

  /** 不可编辑 */
  @Input() disabled: boolean;

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

  /** 选中项发生改变时的回调函数 */
  @Output('select_change') select_change = new EventEmitter();

  /** 自定义搜索框过滤，大小写不敏感 */
  filterOption = (inputValue: string, item: TransferItem) => {
    let data: string = item[this.searchName] + '';
    if (data) {
      return data.toUpperCase().indexOf(inputValue.toUpperCase()) > -1;
    } else {
      return ''.indexOf(inputValue.toUpperCase()) > -1;
    }
  }

  /** 元数据，数组对象格式 */
  @Input() data: HyTransferData[] = [];

  /** 选项在两栏之间转移时的回调函数 */
  @Output('onChange_transferData') onTransferValue = new EventEmitter();

  /** 已选数据 */
  dataSet: Set<String> = new Set();

  /** 搜索框内容时改变时的回调函数 */
  @Output('search_Change') Search_Change = new EventEmitter();

  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, fb: FormBuilder, public validatorFnsService: ValidatorFnsService, public i18nService: I18nService) {
    super('HyTransferComponent', formService, tableService, modelService, el, fb, validatorFnsService);
  }

  ngOnInit() {
    super.init();
    if (this.tempConfigs) {
      if (this.tempConfigs.length == 1) {
        this.tempConfigs.push(this.tempConfigs[0]);
      }
    } else {
      //没有传数据结构
      this.listStyle = { height: '300px' };
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['data'] && changes['data'].currentValue !== undefined) {
      this.filterData(true);
      this.dataSet.clear();
      if (!Array.isArray(changes['data'].currentValue)) {
        console.error('data必须为数组结构！');
        return;
      }
      this.data.forEach(element => {
        if (element.direction === 'right') {
          this.dataSet.add(element.id);
        } else {
          element.direction = 'left';
        }
      })
    }
  }

  @Input()
  set dataFilter(value: any) {
    this._dataFilter = value;
    this.filterData(true);
  }

  private _dataFilter: any;
  private stat: any;

  /** 搜索框变动事件 */
  searchChange(dataSource: {}) {
    this.filterData(false);
    this.Search_Change.emit(dataSource);
  }

  /** 穿越事件 */
  change(dataSource: any) {
    if (dataSource.from == 'left') {
      for (let data of dataSource.list) {
        this.dataSet.add(data.id);
      }
    } else {
      for (let data of dataSource.list) {
        this.dataSet.delete(data.id);
      }
      this.filterData(false);
    }
    this.modelService[this.tableService.modelName][this.modelName] = Array.from(this.dataSet);
    this.formControl.setValue(this.modelService[this.tableService.modelName][this.modelName]);
    super.onModelChange(this.modelService[this.tableService.modelName][this.modelName]);
    this.formControl.markAsDirty();
    this.onTransferValue.emit(this.dataSet);
  }

  /** 用于业务条件过滤 */
  private filterData(clearAll: boolean) {
    if (this._dataFilter) {
      let showNum = 0;
      this.data.forEach(data => {
        if (data['direction'] != 'right') {
          if (clearAll) {
            data.hide = !(data[this._dataFilter['name']] == this._dataFilter['value']);
          } else if (!data.hide) {
            data.hide = !(data[this._dataFilter['name']] == this._dataFilter['value']);
          }
        }

        if (data['direction'] != 'right' && !data.hide) {
          showNum++;
        }
      });
      //修改显示的总数
      if (this.stat) {
        this.stat['shownCount'] = showNum;
      }
    } else if (clearAll) {//针对数据完全清除条件的时候
      let showNum = 0;
      this.data.forEach(data => {
        if (data['direction'] != 'right') {
          data.hide = false;
          showNum++;
        }
      });
      //修改显示的总数
      if (this.stat) {
        this.stat['shownCount'] = showNum;
      }
    }
  }

  convertItems(items: TransferItem[], direction: string, tempConfigs: HyTransferTemp, stat: any): TransferItem[] {
    if ('left' == direction) {
      this.stat = stat;
    }
    return items.filter(data => !data.hide);
  }

  /** mds值变动事件 */
  setData() {
    const values = this.modelService[this.tableService.modelName][this.modelName];
    const newData = [];
    if (!Array.isArray(this.data)) {
      console.error('data必须为数组结构！');
      return;
    }
    this.data.forEach(element => {
      const index = values.findIndex(item => item === element.id);
      if (index > -1) {
        element.direction = 'right';
        this.dataSet.add(element.id);
      }
      newData.push(element);
    })
    setTimeout(() => {
      this.data = newData;
      this.formControl.setValue(this.modelService[this.tableService.modelName][this.modelName]);
      this.formControl.markAsDirty();
    }, 1);
  }

  ngOnDestroy(): void {
    super.destroy();
  }

}
