import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { ModelService } from '../../../../common/domain/service/model.service';
import { HyBaseInput } from '../../../../common/domain/base/HyBaseInput';
import { differenceInCalendarDays, format } from 'date-fns';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { FormBuilder } from '@angular/forms';
import { PresetRanges } from 'ng-zorro-antd/date-picker';
import { HyDateFormat, HyDateSize } from './interface';
import { HyTipType } from '../../interface';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';
import { I18nService } from '../../../../service/i18n.service';

@Component({
  selector: 'hy-date',
  templateUrl: './hy-date.component.html',
  styleUrls: ['./hy-date.component.css'],
  host: {
    '[class.compoent-flex]': 'flex',
  }
})
export class HyDateComponent extends HyBaseInput implements OnInit, OnDestroy, OnChanges {
  gtEnableChangeFn: any;
  @Input() flex: any; //nz-form-item是否Flex布局

  showTime: object;

  mode:string;

  /** 预设范围 */
  @Input()
  ranges: PresetRanges;

  /** 页脚模板 */
  @Input()renderExtraFooter: TemplateRef<any> | string | (() => TemplateRef<any> | string);

  /** 栅格布局1~24 */
  @Input()
  cols: number | string;

  /** 标题 */
  @Input()
  title: string;

  /** 是否隐藏标题 */
  @Input()
  noLabel: boolean = false;

  /** modelName */
  @Input('model')
  modelName: string;

  /** 日期范围的第二输入框的modle */
  @Input('modelTwo')
  modelNameTwo: string;

  /** 在日期+时间模式下，选中日期，时间是否为00:00:00 */
  @Input() isInitTime: boolean = false;

  /** 标题长度，单位px */
  @Input()
  labelWidth: string;

  /** 标题超出长度时是否换行 */
  @Input()isLabelWrap:boolean;

  /** 输入框大小 */
  @Input()
  size: HyDateSize;

  /** 是否隐藏冒号 */
  @Input()
  noColon: boolean = false; //冒号显示

  /** 自定义日期范围选择 */
  nzDisabledDate = null;

  _explainTemplate: TemplateRef<void>;
  _explainString: string;
  /** 说明文字 */
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

  /** 提示 */
  @Input() tip: string | TemplateRef<void>;

  /** tip提示的类型，可选参数 "default"、"bottomTip" */
  @Input()
  tipType: HyTipType = 'default';

  public _format: HyDateFormat = 'yyyy-MM-dd';
  /** 展示的日期格式'yyyy-MM-dd' | 'yyyy-MM-dd HH' | 'yyyy-MM-dd HH:mm' | 'yyyy-MM-dd HH:mm:ss' */
  @Input()
  set format(value: HyDateFormat) {
    if (value) {
      let _time = value.trim().split(' ');
      if (_time && _time.length > 1) {
        this.showTime = { nzFormat: _time[1] };
      } else {
        this.showTime = null;
      }
      this._format = value;
      if(value === 'yyyy'){
        this.mode = 'year';
      }
      if(value === 'yyyy-MM'){
        this.mode = 'month';
      }
    } else {
      this.showTime = null;
      this._format = 'yyyy-MM-dd';
    }
  }

  /** 是否显示清除按钮 */
  @Input()
  allowClear: boolean = true;

  /** 占位文字 */
  @Input()
  placeholder: string;

  /** 日期范围输入框占位文字 */
  @Input()
  placeholders: string | [string, string];

  /** 是否展示“今天”按钮 */
  @Input()
  showToday: boolean = true;

  _enable: boolean = false;
  /** true允许输入，false不允许输入 */
  @Input() enable: boolean = true;

  /** 自定义允许点击的日期 */
  @Input() enableDate: Array<string> = [];

  /** 自定义不允许点击的日期 */
  @Input() unEnableDate: Array<string> = [];

  /** 只允许今天以及之前的日期可点击 */
  @Input() enableEndTotay: boolean = false;

  /** 只允许今天以及之后的日期可点击 */
  @Input() enableStartTotay: boolean = false;

  /** 不使用自身宽度，hy-date组件有自身的最大宽度，设置为true后，不会被自身最大宽度限制 */
  @Input() noOwnWidth: boolean = false;

  /** 弹出日历和关闭日历的回调 */
  @Output('onChange_open')
  onChange_open = new EventEmitter();
  onOpenChange(value: any) {
    // 初始化时间格式
    this.initTime(value);
    this.onChange_open.emit(value);
    super.setCdkOverlayContainer(value);
  }

  /** 初始化时间格式 */
  initTime(value) {
    if (value && this.isInitTime && this.showTime && !this.modelService[this.tableService.modelName][this.modelName]) {
      setTimeout(() => {
        const td = document.getElementsByTagName('date-table')[0].getElementsByTagName('td');
        const _this = this;
        for (let index = 0; index < td.length; index++) {
          const element = td[index];
          element.addEventListener('click', function () {
            let title = this.getAttribute('title');
            title = title.replace('年', '-');
            title = title.replace('月', '-');
            title = title.replace('日', '');
            if (_this.modelNameTwo) {
              const pickerActiveBarDiv = document.getElementsByClassName('ant-picker-active-bar')[0];
              let activeDate: 'start' | 'end' = 'start';
              if (pickerActiveBarDiv['style'].left === '0px') {
                activeDate = 'start';
              } else {
                activeDate = 'end';
              }
              if (activeDate === 'start') {
                _this.modelService[_this.tableService.modelName][_this.modelName] = format(new Date(title), _this._format);
              } else {
                _this.modelService[_this.tableService.modelName][_this.modelNameTwo] = format(new Date(title), _this._format);
              }

            } else {
              _this.modelService[_this.tableService.modelName][_this.modelName] = format(new Date(title), _this._format);
            }
          })
        }
      }, 100)
    }
  }

  _modelValue: string;

  /** 时间发生变化的回调 */
  @Output('onChange_model')
  onChange_model = new EventEmitter();

  /** 时间范围第二个model值，变化的回调 */
  @Output('onChange_modelTwo')
  onChange_modelTwo = new EventEmitter();

  private _firstChange: boolean = true; //解决第一次unidentified 是触发

  onModelChange(modelValue: any) {
    this.formControl.markAsDirty();
    if (!this._firstChange || (modelValue && this._firstChange)) {
      let arr = [];
      let _modelValue: string;
      if (this.modelNameTwo == undefined) {
        if (modelValue) {
          _modelValue = format(modelValue, this._format);
        }
        this.modelService[this.tableService.modelName][this.modelName] = _modelValue;
      } else {
        for (let i = 0; i < modelValue.length; i++) {
          arr.push(format(modelValue[i], this._format));
        }
        this.modelService[this.tableService.modelName][this.modelName] = arr[0];
        this.modelService[this.tableService.modelName][this.modelNameTwo] = arr[1];
        this.onChange_modelTwo.emit(this.modelService[this.tableService.modelName][this.modelNameTwo]);
      }
      this.onChange_model.emit(this.modelService[this.tableService.modelName][this.modelName]);
      //由于formControl没有绑定到select上的缘故 需要手动markAsDirty
      this.formControl.markAsDirty();
      super.onModelChange(this.modelService[this.tableService.modelName][this.modelName]);
    } else {
      //日期组件点击清除图标清除数据后，把modelValue赋值给 this.modelService[this.tableService.modelName][this.modelName]
      this.modelService[this.tableService.modelName][this.modelName] = modelValue;
    }
    this._firstChange = false;
  }

  /** 点击确定按钮的回调,只有显示时间的时候才会出现‘确认’按钮 */
  @Output('onClick_ok')
  onChange_ok = new EventEmitter();
  onOk() {
    this.onChange_ok.emit(this._modelValue);
  }

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

  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, fb: FormBuilder, public validatorFnsService: ValidatorFnsService, public i18nService: I18nService) {
    super('date', formService, tableService, modelService, el, fb, validatorFnsService);
    // console.log('HyDateComponent..................');

  }

  ngOnInit() {
    super.init();
    let sysdate = new Date();
    let _modelTimeZone = format(sysdate, 'xxx');
    this.modelService[this.tableService.modelName]['modelTimeZone'] = _modelTimeZone; //时区
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['enableEndTotay'] && changes['enableEndTotay'].currentValue !== undefined) {
      this.initDisabledDate();
    }
    if (changes['enableStartTotay'] && changes['enableStartTotay'].currentValue !== undefined) {
      this.initDisabledDate();
    }
    if (changes['enableDate'] && changes['enableDate'].currentValue !== undefined) {
      this.initDisabledDate();
    }
    if (changes['unEnableDate'] && changes['unEnableDate'].currentValue !== undefined) {
      this.initDisabledDate();
    }
  }

  ngOnDestroy(): void {
    super.destroy();
  }

  /** 初始化可选日期 */
  initDisabledDate() {
    if (this.enableDate.length > 1 || this.unEnableDate.length > 1) {
      this.nzDisabledDate = (current) => {
        let start;
        let end;
        let flag: boolean = false;
        if (this.enableDate.length > 1) {
          flag = false;
          start = new Date(this.enableDate[0]);
          end = new Date(this.enableDate[1]);
        }
        if (this.unEnableDate.length > 1) {
          flag = true;
          start = new Date(this.unEnableDate[0]);
          end = new Date(this.unEnableDate[1]);
        }
        if (differenceInCalendarDays(start, current) > 0 || differenceInCalendarDays(end, current) < 0) {
          flag = !flag;
        }
        return flag;
      };
    }
    if (this.enableEndTotay) {
      this.nzDisabledDate = (current) => {
        return differenceInCalendarDays(current, new Date()) > 0;
      };
    }
    if (this.enableStartTotay) {
      this.nzDisabledDate = (current) => {
        return differenceInCalendarDays(current, new Date()) < 0;
      };
    }
  }
}
