import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { HyBaseInput } from '../../../../common/domain/base/HyBaseInput';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { ModelService } from '../../../../common/domain/service/model.service';
import { FormBuilder } from '@angular/forms';
import { format } from 'date-fns';
import { HySize, HyTipType } from '../../interface';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';
import { I18nService } from '../../../../_index';
let input;

@Component({
  selector: 'hy-time',
  templateUrl: './hy-time.component.html',
  styleUrls: ['./hy-time.component.css'],
  host: {
    '[class.compoent-flex]': 'flex',
  }
})
export class HyTimeComponent extends HyBaseInput implements OnInit, OnDestroy {
  timeValue: any;

  inputId: string = null;

  gtEnableChangeFn: any;
  flex: any;

  /** 栅格布局1~24 */
  @Input()
  cols: number | string;

  /** 标题 */
  @Input()
  title: string;

  /** modelName */
  @Input('model')
  modelName: string;

  /** 是否隐藏标题 */
  @Input()
  noLabel: boolean = false;

  /** 是否隐藏冒号 */
  @Input()
  noColon: boolean = false;

  /** 标题长度，单位px */
  @Input()
  labelWidth: string;

  /** 标题超出长度时是否换行 */
  @Input() isLabelWrap: boolean;

  /** 尺寸 */
  @Input()
  size: HySize = 'default';

  /** 控制展示的时间格式 */
  @Input()
  format: any = 'HH:mm';

  /** 设置面板打开时默认选中的值 */
  @Input()
  defaultOpenValue: Date;

  /** 提示 */
  @Input() tip: string | TemplateRef<void>;

  /** tip提示的类型，可选参数 */
  @Input()
  tipType: HyTipType = 'default';

  /** 小时选项间隔 */
  @Input()
  hourStep: number;

  /** 分钟选项间隔 */
  @Input()
  minuteStep: number;

  /** 秒数选项间隔 */
  @Input()
  secondStep: number;

  /** 占位文字 */
  @Input()
  placeholder: string;

  /** 是否使用12小时制，为true时format默认为h:mm:ss*/
  @Input()
  use12Hours: boolean = false;

  /** 清除按钮的提示文案 */
  @Input()
  clearText: string = '清除';

  /** 是否显示清除按钮 */
  @Input()
  allowClear: boolean = true;

  /** 不使用自身宽度，hy-date组件有自身的最大宽度，设置为true后，不会被自身最大宽度限制 */
  @Input() noOwnWidth: boolean = false;

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

  private _firstChange: boolean = true; //解决第一次unidentified 是触发

  /** 值变动事件 */
  @Output('onChange_model')
  onChange_model = new EventEmitter();
  onModelChange(value: any) {
    this.formControl.markAsDirty();
    let _value = null;
    if (value) {
      _value = format(value, this.format);
    }
    if (this.modelService[this.tableService.modelName][this.modelName] === _value) return;
    this.modelService[this.tableService.modelName][this.modelName] = _value;
    this.onChange_model.emit(_value);
    super.onModelChange(_value);
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

  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, fb: FormBuilder, public validatorFnsService: ValidatorFnsService, public i18nService: I18nService) {
    super('time', formService, tableService, modelService, el, fb, validatorFnsService);
    // console.log('HyTimeComponent..................');
  }

  ngOnInit() {
    super.init();
    this.inputId = this.tableService.modelName + '-' + this.modelName;
    // 修复自带bug，强制性添加keyup事件
    setTimeout(() => {
      input = document.getElementById(this.inputId).getElementsByTagName('input')[0];
      input.setAttribute('readOnly', true);
      input.onkeyup = () => {
        const value = document.getElementById(this.inputId).getElementsByTagName('input')[0].value;
        if (!value) {
          this.onModelChange(value);
        }
      }
    }, 10);
  }

  ckTime(value) {
    if (this.format == 'HH:mm') {
      const str = /([01][0-9]|2[0-3]):[0-5][0-9]/;
      if (!str.test(value) || value.length !== 5) {
        this.formControl.setErrors({ format: true, msg: this.i18nService.getFrameI18n('hy-time.格式错误') })
        return false;
      }
      this.formControl.setErrors(null);
      return true;
    }

    if (this.format == 'HH:mm:ss') {
      const str = /([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/;
      if (!str.test(value) || value.length !== 8) {
        this.formControl.setErrors({ format: true, msg: this.i18nService.getFrameI18n('hy-time.格式错误') })
        return false;
      }
      this.formControl.setErrors(null);
      return true;
    }
  }

  ngOnDestroy(): void {
    super.destroy();
  }

  nzOpenChange(e) {
    super.setCdkOverlayContainer(e);
  }

}
