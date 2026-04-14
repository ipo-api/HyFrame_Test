import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { HyBaseInput } from '../../../../common/domain/base/HyBaseInput';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { ModelService } from '../../../../common/domain/service/model.service';
import { DicService } from '../../../../service/dic.service';
import { FormBuilder } from '@angular/forms';
import { HyTipType } from '../../interface';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';

@Component({
  selector: 'hy-number',
  templateUrl: './hy-number.component.html',
  host: {
    '[class.compoent-flex]': 'flex',
  }
})
export class HyNumberComponent extends HyBaseInput implements OnInit, OnDestroy {
  gtEnableChangeFn: any;
  flex: any; //nz-form-item是否Flex布局

  /** 栅格布局1~24 */
  @Input()
  cols: number | string;

  /** 标题 */
  @Input()
  title: string;

  /** modelName */
  @Input('model')
  modelName: string; //

  /** 是否隐藏标题 */
  @Input()
  noLabel: boolean = false;

  /** 标题长度，单位px */
  @Input()
  labelWidth: string;

  /** 标题超出长度时是否换行 */
  @Input() isLabelWrap: boolean;

  /** 是否隐藏冒号 */
  @Input()
  noColon: boolean = false;

  /** 占位文字 */
  @Input()
  placeholder: string = '';

  /** 最小值 */
  @Input()
  min: number;

  /** 最大值 */
  @Input()
  max: number;

  /** 每次改变步数，可以为小数number｜string，默认1 */
  @Input()
  step: number = 1;

  /** 输入框大小 */
  @Input()
  size: 'large' | 'small' | 'default' = 'default';

  /** 不使用自身宽度，hy-date组件有自身的最大宽度，设置为true后，不会被自身最大宽度限制 */
  @Input() noOwnWidth: boolean = false;

  _formatter = (value: any) => `${value == undefined ? '' : value}`;
  /** 指定输入框展示值的格式 */
  @Input()
  formatter: (value: any) => any = (value: any) => `${value == undefined ? '' : value}`;

  _parser = (value: string) => `${value == undefined ? '' : value}`;
  /** 指定从 nzFormatter 里转换回数字的方式，和 nzFormatter 搭配使用,文本输入时才生效 */
  @Input()
  parser: (value: string) => any = (value: string) => `${value == undefined ? '' : value}`;

  /** 数值精度 */
  @Input()
  precision: number = 1;

  /** 置于输入框前面的模板 */
  @Input()
  numberAfterTemplate: TemplateRef<void>;

  /** 置于输入框后面的模板 */
  @Input()
  numberBeforeTemplate: TemplateRef<void>;

  /** 提示 */
  @Input() tip: string | TemplateRef<void>;

  /** tip提示的类型，可选参数 */
  @Input()
  tipType: HyTipType = 'default';

  _disabled: boolean = false;
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

  /** 数值变动回调 */
  @Output('onChange_model')
  onChange_model = new EventEmitter();


  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, public dicService: DicService, fb: FormBuilder, public validatorFnsService: ValidatorFnsService) {
    super('number', formService, tableService, modelService, el, fb, validatorFnsService);
  }

  ngOnInit() {
    super.init();
  }

  ngOnDestroy(): void {
    super.destroy();
  }


  onModelChange(modelValue: any) {
    super.onModelChange(modelValue);
    this.onChange_model.emit(modelValue);
  }
}
