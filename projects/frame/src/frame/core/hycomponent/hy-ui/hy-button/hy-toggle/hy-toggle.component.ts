import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { HyBaseInput } from '../../../../common/domain/base/HyBaseInput';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { ModelService } from '../../../../common/domain/service/model.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { DicService } from '../../../../service/dic.service';
import { DataUnit } from '../../../../util/common/DataUnit';
import { HyToggleItems, HyToggleSize, HyToggleTextAlign, HyToggleTipType } from './interface';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';

@Component({
  selector: 'hy-toggle',
  templateUrl: './hy-toggle.component.html',
  styleUrls: ['./hy-toggle.component.css'],
  host: {
    '[class.compoent-flex]': 'flex',
  }
})
export class HyToggleComponent extends HyBaseInput implements OnInit, OnChanges, OnDestroy {
  gtEnableChangeFn: any;

  togglePrototypeformControl = new FormControl();

  /** model值 */
  _value: boolean = false;

  /** hover提示 */
  _title: string;

  /** 为true候显示的开关说明 */
  _checkedChildren: string;

  /** 为false时显示的开关说明 */
  _unCheckedChildren: string;

  /** 外部是否触发model值变动 */
  isChange: boolean = false;

  /** 是否Flex布局 */
  @Input()
  flex: any;

  /** 标题 */
  @Input() title: string;

  /** modelName */
  @Input('model') modelName: string;

  /** 栅格布局1~24 */
  @Input() cols: number | string;

  /** 是否隐藏冒号 */
  @Input() noColon: boolean = false;

  /** 是否隐藏标题 */
  @Input() noLabel: boolean = false;

  /** 提示 */
  @Input() tip: string | TemplateRef<void>;

  /** tip提示的类型 */
  @Input() tipType: HyToggleTipType = 'default';

  /** 开关大小 */
  @Input() size: HyToggleSize = 'default';

  /** 字典 */
  @Input('dic') dicName: string;

  /** 标题长度，单位px */
  @Input() labelWidth: string;

  /** 标题超出长度时是否换行 */
  @Input()isLabelWrap:boolean;

  /** 是否完全由用户控制状态 */
  @Input() control: boolean = false;

  /** ture允许点击，false不允许点击 */
  @Input() enable: boolean = true;

  /** 字体位置 */
  @Input() textAlign: HyToggleTextAlign = 'left';

  /** 是否显示开关按钮文字,默认不显示 */
  @Input() showToggleText: boolean = false;

  _explainTemplate: TemplateRef<void>;
  _explainString: string;
  @Input()
  /** 说明文字，支持string或者模板类型 */
  set explainText(value: string | TemplateRef<void>) {
    if (typeof value == 'string') {
      this._explainString = value
    }
    this._explainTemplate = value as TemplateRef<void>;
  }
  get explainText(): string | TemplateRef<void> {
    return this._explainTemplate;
  }

  /** 点击事件 */
  @Output('onClick') onClick = new EventEmitter();

  /** 值变动事件 */
  @Output('onChange_model') onChange = new EventEmitter();

  /** 自定义数据 */
  @Input() items: HyToggleItems[];

  constructor(public formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, fb: FormBuilder, public dicService: DicService, public validatorFnsService: ValidatorFnsService) {
    super('switch', formService, tableService, modelService, el, fb, validatorFnsService);
  }

  ngOnInit() {
    super.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['dicName'] && changes['dicName'].currentValue !== undefined) {
      this.dicService.getDic(this.dicName, (returnObj) => {
        this.items = returnObj;
        this.setShowToggleText();
        this.setData();
      },
        this.modelService
      );
    }
    if (changes['showToggleText'] && changes['showToggleText'].currentValue !== undefined) {
      this.setShowToggleText();
    }
    if (changes['items'] && changes['items'].currentValue !== undefined) {
      if (this.items.length > 0) {
        this.setData();
      }
    }
  }

  /** 设置开关内文字展示 */
  setShowToggleText() {
    if (this.showToggleText && this.items && this.items.length >= 1) {
      this._checkedChildren = this.items[1].text;
      this._unCheckedChildren = this.items[0].text;
    }
    if (!this.showToggleText) {
      this._checkedChildren = '';
      this._unCheckedChildren = '';
    }
  }

  /** 值变动事件 */
  modelChange(e) {
    if (!this.items || this.items.length === 0) return;
    if (this.isChange || this.control) {
      this.onChange.emit(this.modelService[this.tableService.modelName][this.modelName]);
      return;
    }
    this._value = e;
    super.onModelChange(this.items[e ? 1 : 0].id);
    this.setTitle(e ? 1 : 0);
    this.onChange.emit(this.modelService[this.tableService.modelName][this.modelName]);
  }

  /** 点击开关事件 */
  clickSwitch() {
    if (this.enable === false) return;
    if (!this.items || this.items.length === 0) return;

    if (this.control) {
      const index = this.items.findIndex(item => item.id === this.modelService[this.tableService.modelName][this.modelName]);
      if (index === 0) {
        this._value = false;
      }
      if (index === 1) {
        this._value = true;
      }
      this.setTitle(index);
      this.onClick.emit(this.modelService[this.tableService.modelName][this.modelName]);
    } else {
      this.modelChange(!this._value);
      this.onClick.emit(this.modelService[this.tableService.modelName][this.modelName]);
    }
  }

  /** 设置hover提示信息 */
  setTitle(index) {
    if (this.items && this.items.length > 0) {
      this._title = DataUnit.copy(this.items[index === -1 ? 0 : index].text);
    }
  }

  /** model值变动事件 */
  setData() {
    if (!this.modelService[this.tableService.modelName][this.modelName]) {
      if (this.items && this.items.length > 0) {
        this.modelService[this.tableService.modelName][this.modelName] = this.items[0].id;
        this._value = false;
      }
      return;
    };
    setTimeout(() => {
      if (this.items && this.items.length > 0) {
        this.isChange = true;
        const index = this.items.findIndex(item => item.id === this.modelService[this.tableService.modelName][this.modelName]);
        if (index === 0) {
          this._value = false;
        }
        if (index === 1) {
          this._value = true;
        }
        this.setTitle(index);
      }
      setTimeout(() => {
        this.isChange = false;
      }, 10);
    }, 1);
  }

  ngOnDestroy(): void {
    super.destroy();
  }
}
