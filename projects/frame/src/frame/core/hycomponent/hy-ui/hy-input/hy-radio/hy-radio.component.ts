import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { HyBaseInput } from '../../../../common/domain/base/HyBaseInput';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { ModelService } from '../../../../common/domain/service/model.service';
import { DicService } from '../../../../service/dic.service';
import { FormBuilder } from '@angular/forms';
import { $hyapi } from '../../../../api/$hyapi';
import { NzRadioButtonStyle } from 'ng-zorro-antd/radio';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';
import { HyDicValue } from '../../../../service/dicInterface';

@Component({
  selector: 'hy-radio',
  templateUrl: './hy-radio.component.html',
  styleUrls: ['./hy-radio.component.less'],
  host: {
    '[class.compoent-flex]': 'flex',
  }
})
export class HyRadioComponent extends HyBaseInput implements OnInit, OnDestroy, AfterViewInit {
  /** flex布局，单位px */
  @Input() flex: any;

  /** 栅格布局1~24 */
  @Input() cols: number | string;

  /** 标题 */
  @Input() title: string;

  /** modelName */
  @Input('model') modelName: string;

  /** 是否隐藏标题 */
  @Input() noLabel: boolean = false;

  /** 是否隐藏冒号 */
  @Input() noColon: boolean = false;

  /** 字典名 */
  @Input('dic') dicName: string;

  /** RadioButton 的风格样式，目前有描边和填色两种风格 */
  @Input() buttonStyle: NzRadioButtonStyle;

  /** 单选按钮类型选择,默认按钮,radioButton */
  @Input() type: 'radio' | 'radioButton' = 'radioButton';

  /** 是否垂直显示,仅在type为radio时生效 */
  @Input() isVertical: boolean = false;

  /** 只对实色填底按钮有效 */
  @Input() size: 'large' | 'small' | 'default' = 'default';

  /** 标题长度，单位px */
  @Input() labelWidth: string;

  /** 标题是否换行，默认不换行 */
  @Input() isLabelWrap: boolean;

  /** 根据数据显示行数，默认显示一行 */
  @Input() onelineNum: number;

  /** 可显示 */
  @Input() enable: boolean = true;

  /** 超出长度是否显示省略号，默认不显示省略号并换行(仅默认类型生效，按钮类型无法换行，isEllipsis一直保持为true，无法被修改) */
  @Input() isEllipsis: boolean = false;

  _enableAllow: any;

  public SPIT = '|';

  /** 允许可编辑的单选框对应的字典数据项id，默认都可编辑，与enable = false配合使用 */
  @Input()
  set enableAllow(value: Array<string>) {
    if (value && value.length > 0) {
      this._enableAllow = '';
      for (let v of value) {
        this._enableAllow = this._enableAllow + this.SPIT + v;
      }
      this._enableAllow = this._enableAllow + this.SPIT;
    }
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

  private _firstChange: boolean = true; //解决第一次unidentified 是触发

  /** 选中事件回调 */
  @Output('onChange_model')
  onChange_model = new EventEmitter();
  onModelChange(event: any) {
    if (!this._firstChange || (event && this._firstChange)) {
      this.onChange_model.emit(event);
    }
    this._firstChange = false;
  }

  /** 自定义数据 */
  @Input() items: HyDicValue[] = [];

  /** 交互变动事件 */
  @Output() onChange = new EventEmitter();

  /** 字典用uuid */
  private uuid: string;

  constructor(
    formService: HyFormService, 
    tableService: TableService, 
    modelService: ModelService, 
    el: ElementRef, 
    public dicService: DicService, 
    fb: FormBuilder, 
    public validatorFnsService: ValidatorFnsService,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    super('radio', formService, tableService, modelService, el, fb, validatorFnsService);
  }

  ngOnInit() {
    super.init();
    this.uuid = this.getUuid();
  }

  getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  ngAfterViewInit(): void {
    if (this.dicName) {
      this.dicService.getDic(this.dicName, (returnObj) => {
        this.items = returnObj;
        this.changeDetectorRef.detectChanges();
      }, this.modelService);

      this.dicService.createSubject(this.uuid).subscribe(e => {
        this.items = $hyapi.dic.getFromCache(this.dicName, this.modelService);
        this.changeDetectorRef.detectChanges();
      })
    }
  }

  ngOnDestroy(): void {
    super.destroy();
    this.dicService.clearSubject(this.uuid);
  }

  set datas(value) {
    this.modelService[this.tableService.modelName][this.modelName] = value;
  }
  get datas() {
    if (this.modelService[this.tableService.modelName][this.modelName] != null) {
      return this.modelService[this.tableService.modelName][this.modelName] + '';
    } else {
      return this.modelService[this.tableService.modelName][this.modelName];
    }
  }
}
