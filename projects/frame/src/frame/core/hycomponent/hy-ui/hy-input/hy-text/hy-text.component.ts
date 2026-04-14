import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ModelService } from '../../../../common/domain/service/model.service';
import { FormBuilder } from '@angular/forms';
import { HyBaseInput } from '../../../../common/domain/base/HyBaseInput';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { HyTipType } from '../../interface';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';
import { HyDicValue } from '../../../../service/dicInterface';


@Component({
  selector: 'hy-text',
  templateUrl: './hy-text.component.html',
  styleUrls: ['./hy-text.component.css'],
  host: {
    '[class.compoent-flex]': 'flex',
  }
})
export class HyTextComponent extends HyBaseInput implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('addOnBeforeTemplate', { static: true }) addOnBeforeTemplate;
  @ViewChild('addOnAftertemplate', { static: true }) addOnAftertemplate;
  @ViewChild('suffixTemplate', { static: true }) suffixTemplate;

  formService: HyFormService;
  passwordVisible: boolean = false;
  gtEnableChangeFn: any;
  _suffix;
  _addOnBefore;
  _addOnAfter;

  /** 模板数据（使用模板时如果传入此参数，则能在ng-template中获取对应参数） */
  @Input() item: any;

  /** 模板下标（使用模板时如果传入此参数，则能在ng-template中获取对应下标） */
  @Input() index: number;

  /** 栅格布局1~24 */
  @Input() cols: number | string;

  /** flex布局，单位px */
  @Input() flex: any;

  /** 标题 */
  @Input() title: string;

  /** modelName */
  @Input('model') modelName: string;

  /** 是否隐藏标题 */
  @Input() noLabel: boolean = false;

  /** 是否隐藏冒号 */
  @Input() noColon: boolean = false;

  /** 标题长度，单位px */
  @Input() labelWidth: string;

  /** 标题超出长度时是否换行 */
  @Input()isLabelWrap:boolean;

  /** 占位文字 */
  @Input() placeholder: string = '';

  /** 文本类型 */
  @Input() type: 'text' | 'password';

  /** 后缀图标模板 */
  @Input() suffix: any;

  /** 前缀图标模板 */
  @Input() prefix: any;

  /** 带标签的 input，设置前置标签 */
  @Input() addOnBefore: any;

  /** 带标签的 input，设置后置标签 */
  @Input() addOnAfter: any;

  /** 密码模式下，是否显示可视图标 */
  @Input() isShowEye: boolean = true;

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

  /** 密码输入框是否允许复制,默认行为为不允许 */
  @Input()
  isCopy: boolean = false;
  copyFunction() {
    return this.isCopy;
  }

  /** 密码输入框是否允许剪切,默认行为为不允许 */
  @Input()
  isCut: boolean = false;
  cutFunction() {
    return this.isCut;
  }

  /** 是否用紧凑模式,改变样式 */
  @Input()
  compact: boolean = false;

  /** 使用addOnAfter设置后置标签为带搜索的按钮时，应为true */
  @Input()
  search: boolean = false;

  /** 提示 */
  @Input() tip: string | TemplateRef<void>;

  /** tip提示的类型 */
  @Input()
  tipType: HyTipType = 'default';

  /** 光标离开事件 */
  @Output() onBlur = new EventEmitter<any>();

  /** 回车事件 */
  @Output('onKeyup.enter') enter = new EventEmitter<any>();

  disabled: boolean;

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

  _ckMinLength: number = 0;
  /** 最小长度 */
  @Input()
  public set ckMinLength(value: any) {
    value = value ? parseInt(value, 10) : 0;
    if (value !== this._ckMinLength) {
      if (value > 0) {
        this._ckMinLength = value;
        this.addCheck('ckMinLength', value);
      } else {
        this._ckMinLength = value;
        this.removeCheck('ckMinLength');
      }
    }
  }
  public get ckMinLength(): any {
    return this._ckMinLength;
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

  _ckNumber: boolean = false;
  /** 是否数字 */
  @Input()
  public set ckNumber(value: boolean) {
    if (value !== this._ckNumber) {
      if (value === true) {
        this.addCheck('ckNumber', value);
      } else {
        this.removeCheck('ckNumber');
      }
    }
    this._ckNumber = value;
  }
  public get ckNumber(): boolean {
    return this._ckNumber;
  }

  _ckMax = null;
  /** 最大值_数字 */
  @Input()
  public set ckMax(value: any) {
    if (typeof value != 'undefined') {
      value = parseInt(value, 10);
    }
    if (value !== this._ckMax) {
      if (value !== undefined) {
        this._ckMax = value;
        this.addCheck('ckMax', value);
      } else {
        this._ckMax = value;
        this.removeCheck('ckMax');
      }
    }
  }
  public get ckMax(): any {
    return this._ckMax;
  }

  _ckMin = null;
  /** 最小值_数字 */
  @Input()
  public set ckMin(value: any) {
    if (typeof value != 'undefined') {
      value = parseInt(value, 10);
    }

    if (value !== this._ckMin) {
      if (value !== undefined) {
        this._ckMin = value;
        this.addCheck('ckMin', value);
      } else {
        this._ckMin = value;
        this.removeCheck('ckMin');
      }
    }
  }
  public get ckMin(): any {
    return this._ckMin;
  }

  _ckInteger: boolean = false;
  /** 是否整数_数字 */
  @Input()
  public set ckInteger(value: boolean) {
    if (value !== this._ckInteger) {
      if (value === true) {
        this.addCheck('ckInteger', value);
      } else {
        this.removeCheck('ckInteger');
      }
    }
    this._ckInteger = value;
  }
  public get ckInteger(): boolean {
    return this._ckInteger;
  }

  private _noWhitespace: boolean = false;
  /** 是否包含空格 */
  @Input()
  public set ckNoWhitespace(value: boolean) {
    if (value !== this._noWhitespace) {
      if (value === true) {
        this.addCheck('ckNoWhitespace', value);
      } else {
        this.removeCheck('ckNoWhitespace');
      }
    }
    this._noWhitespace = value;
  }
  public get ckNoWhitespace(): boolean {
    return this._noWhitespace;
  }

  /** 值变动事件 */
  @Output('onChange_model') onChangeModel = new EventEmitter();

  /** 过滤后的选项 */
  public filteredOptions: any[] = [];

  /** 
   * 提示选项
   * @description 提示选项，用于下拉框，设置参数后将默认使用提示选项，如果设置了promptFilterFn，则将使用promptFilterFn过滤后的选项
   */
  @Input() promptOptions: HyDicValue[] = [];

  /** 
   * 提示过滤函数
   * @description 提示过滤函数，用于下拉框，设置参数后将使用promptFilterFn过滤后的选项
   */
  @Input() promptFilterFn: (value: string) => HyDicValue[];

  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, fb: FormBuilder, public validatorFnsService: ValidatorFnsService) {
    super('text', formService, tableService, modelService, el, fb, validatorFnsService);
  }

  ngOnInit() {
    super.init();
    this.setFilteredOptions(this.modelService[this.tableService.modelName][this.modelName]);
  }

  keyupFuction() {
    this.enter.emit(this.modelService[this.tableService.modelName][this.modelName]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['addOnAfter'] && changes['addOnAfter'].currentValue !== undefined) {
      if (typeof this.addOnAfter === 'string' || typeof this.addOnAfter === 'number') {
        this._addOnAfter = this.addOnAfter;
      } else {
        this._addOnAfter = this.addOnAftertemplate;
      }
    }
    if (changes['addOnBefore'] && changes['addOnBefore'].currentValue !== undefined) {
      if (typeof this.addOnBefore === 'string' || typeof this.addOnBefore === 'number') {
        this._addOnBefore = this.addOnBefore;
      } else {
        this._addOnBefore = this.addOnBeforeTemplate;
      }
    }
    if (changes['suffix'] && changes['suffix'].currentValue !== undefined) {
      if (typeof this.suffix === 'string' || typeof this.suffix === 'number') {
        this._suffix = this.suffix;
      } else {
        this._suffix = this.suffixTemplate;
      }
    }
    if (changes['promptOptions'] && changes['promptOptions'].currentValue !== undefined) {
      this.setFilteredOptions(this.modelService[this.tableService.modelName][this.modelName]);
    }
  }

  compareFun = (o1: any, o2: any): boolean => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    super.destroy();
  }

  onBlurFn($event: any) {
    this.onBlur.emit();
  }

  onModelChange(value) {
    if (value !== undefined) {
      super.onModelChange(value);
      this.setFilteredOptions(value);
      this.onChangeModel.emit(value);
    }
  }

  /** 设置过滤后的选项 */
  private setFilteredOptions(value: string = '') {
    if(this.promptOptions?.length > 0) {
      if(this.promptFilterFn) {
        this.filteredOptions = this.promptFilterFn(value);
      } else {
        this.filteredOptions = this.promptOptions.filter(option => option.text.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
    }
  }
}
