import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { HyBaseInput } from '../../../../common/domain/base/HyBaseInput';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { ModelService } from '../../../../common/domain/service/model.service';
import { DicService } from '../../../../service/dic.service';
import { FormBuilder } from '@angular/forms';
import { HyTipType } from '../../interface';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';

@Component({
  selector: 'hy-slider',
  templateUrl: './hy-slider.component.html',
  styleUrls: ['./hy-slider.component.less'],
  host: {
    '[class.compoent-flex]': 'flex',
  }
})
export class HySliderComponent extends HyBaseInput implements OnInit, OnChanges, OnDestroy {
  gtEnableChangeFn: any;

  /** 标题长度，单位px */
  @Input()
  labelWidth: string;

  /** 标题超出长度时是否换行 */
  @Input()isLabelWrap:boolean;

  /** flex布局，单位px */
  @Input()
  flex: any;

  /** 栅格布局1~24 */
  @Input()
  cols: number | string = 24;

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

  /** 是否只能拖拽到刻度上 */
  @Input()
  dots: boolean = false;

  /** marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列 */
  @Input()
  included: boolean = true;

  /** 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式 */
  @Input()
  marks: { [name: number]: string } = null;

  /** 最大值 */
  @Input()
  max: number = 100;

  /** 最小值 */
  @Input()
  min: number = 0;

  /** 双滑块模式 */
  @Input()
  range: boolean = false;

  /** 步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分。 */
  @Input()
  step: number = 1;

  /** 值为 true 时，Slider 为垂直方向 */
  @Input()
  vertical: boolean = false;

  /** 反向坐标轴 */
  @Input()
  reverse: boolean = false;

  /** 值为 always 时总是显示，值为 never 时在任何情况下都不显示 */
  @Input()
  tooltipVisible: 'always' | 'never' | 'default' = 'default';

  /** 设置 Tooltip 的默认位置。 */
  @Input()
  tooltipPlacement: string;

  /** 是否显示输入框 */
  @Input()
  showInput: boolean = false;

  /** 提示 */
  @Input()
  tip: any;

  /** tip提示的类型 */
  @Input() tipType: HyTipType = 'default';

  @Input() enable: boolean = true;

  oldEnable: boolean = this.enable;

  _enableAllow: any;
  public SPIT = '|';

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

  /** 值变动的回调事件 */
  @Output('onChange_model')
  onChange_model = new EventEmitter();
  onModelChange(event: any) {
    if (!this._firstChange || (event && this._firstChange)) {
      this.onChange_model.emit(event);
    }
    this._firstChange = false;
  }

  /** 拖动滑动条后松开的回调事件 */
  @Output('onAfter_change')
  onAfter_change = new EventEmitter();
  onAfterChange(event: any) {
    this.onAfter_change.emit(event);
  }

  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, public dicService: DicService, fb: FormBuilder, public validatorFnsService: ValidatorFnsService) {
    super('slider', formService, tableService, modelService, el, fb, validatorFnsService);
  }

  ngOnInit() {
    super.init();
  }

  ngOnChanges(changes) {
    if (!changes) return;
  }

  ngOnDestroy(): void {
    super.destroy();
  }
}
