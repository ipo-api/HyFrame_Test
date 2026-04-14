import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { HyBaseInput } from '../../../../common/domain/base/HyBaseInput';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { ModelService } from '../../../../common/domain/service/model.service';
import { FormBuilder } from '@angular/forms';
import { HyTipType } from '../../interface';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';


@Component({
  selector: 'hy-textarea',
  templateUrl: './hy-textarea.component.html',
  styleUrls: ['./hy-textarea.component.css'],
  host: {
    '[class.compoent-flex]': 'flex',
  }
})
export class HyTextareaComponent extends HyBaseInput implements OnInit, OnDestroy {
  gtEnableChangeFn: any;

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
  noColon: boolean = false; //冒号显示

  /** 自适应内容高度，可设置为 boolean 或对象：{ minRows: 2, maxRows: 6 } */
  @Input() autosize: object | boolean = { minRows: 4, maxRows: 4 };

  /** 占位文字 */
  @Input()
  placeholder: string = '';

  /** 标题长度，单位px */
  @Input()
  labelWidth: string;

  /** 标题超出长度时是否换行 */
  @Input()isLabelWrap:boolean;

  /** 提示 */
  @Input() tip: string | TemplateRef<void>;

  /** tip提示的类型，可选参数 "default"、"bottomTip" */
  @Input()
  tipType: HyTipType = 'default';

  /** flex布局，单位px */
  @Input()
  flex: any;

  /** true允许输入，false不允许输入 */
  @Input() enable: boolean = true;

  private _firstChange: boolean = true; //解决第一次unidentified 是触发

  /** 值变动事件 */
  @Output('onChange_model')
  onChange_model = new EventEmitter();
  onModelChange(event: any) {
    if (!this._firstChange || (event && this._firstChange)) {
      super.onModelChange(event);
      this.onChange_model.emit(event);
    }
    this._firstChange = false;
  }

  /** 获取焦点事件 */
  @Output()
  onBlur = new EventEmitter<any>();
  onBlurFn($event: any) {
    this.onBlur.emit();
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

  _ckMaxLength: number = 0;
  /** 最大长度 */
  @Input()
  public set ckMaxLength(value: any) {
    value = value ? parseInt(value, 10) : 0;
    if (value !== this._ckMaxLength) {
      if (value > 0) {
        this._ckMaxLength = value;
        this.addCheck('ckMaxLength', value);
      } else {
        this._ckMaxLength = value;
        this.removeCheck('ckMaxLength');
      }
    }

  }
  public get ckMaxLength(): any {
    return this._ckMaxLength;
  }

  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, fb: FormBuilder, public validatorFnsService: ValidatorFnsService) {
    super('textarea', formService, tableService, modelService, el, fb, validatorFnsService);
    // console.log("InputBasicComponent..................");

  }

  ngOnInit() {
    super.init();
  }


  ngOnDestroy(): void {
    super.destroy();
  }
}
