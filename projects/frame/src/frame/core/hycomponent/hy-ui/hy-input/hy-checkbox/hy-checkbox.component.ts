import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModelService } from '../../../../common/domain/service/model.service';
import { DicService } from '../../../../service/dic.service';
import { HyBaseInput } from '../../../../common/domain/base/HyBaseInput';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { FormBuilder } from '@angular/forms';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';

@Component({
  selector: 'hy-checkbox',
  templateUrl: './hy-checkbox.component.html',
  styleUrls: ['./hy-checkbox.component.css'],
  host: {
    '[class.compoent-flex]': '_flex',
  }
})
export class HyCheckboxComponent extends HyBaseInput implements OnInit, OnDestroy, OnChanges {
  formService: HyFormService;

  public _flex: any; //nz-form-item是否Flex布局
  public flexWidth: any;
  /** flex布局，单位px */
  @Input() flex: string;

  /** 栅格布局1~24 */
  @Input() cols: number | string = 24;

  /** 标题 */
  @Input() title: string;

  /** 是否隐藏标题 */
  @Input() noLabel: boolean = false;

  /** 是否隐藏冒号 */
  @Input() noColon: boolean = false;

  /** 标题长度，单位px */
  @Input() labelWidth: string;

  /** 标题超出长度时是否换行 */
  @Input()isLabelWrap:boolean;

  /** modelName */
  @Input('model') modelName: any;

  /** 字典名 */
  @Input('dic') dicName: string;

  /** 是否显示全选 */
  @Input() showCheckAll: boolean = true;

  /** 每行显示多少个,flex布局下，可传auto，表示每个多选框的宽度根据内容的长度决定 */
  @Input() onelineNum: number | 'auto';

  /** 允许编辑的选项 */
  @Input() enableAllow: Array<string>;

  /** true允许编辑，false不允许编辑 */
  @Input() enable: boolean = true;

  /** 超出长度是否显示省略号，默认不显示省略号并换行 */
  @Input() isEllipsis: boolean = false;

  /** 选中事件回调 */
  @Output() public clickOneCheck: EventEmitter<any> = new EventEmitter();

  /** 全选按钮回调 */
  @Output('clickAllCheck') _clickAllCheck: EventEmitter<any> = new EventEmitter();

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

  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, fb: FormBuilder, public dicService: DicService, public validatorFnsService: ValidatorFnsService) {
    super('checkbox', formService, tableService, modelService, el, fb, validatorFnsService);
  }

  ngOnInit() {
    super.init();
    this.dicService.getDic(this.dicName, null, this.modelService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['flex'] && changes['flex'].currentValue !== undefined) {
      this.flexWidth = this.flex.substring(0, this.flex.length - 2);
    }
  }

  setData(_value) {
    this.modelService[this.tableService.modelName][this.modelName] = [];
    for (let i = 0; i < _value.length; i++) {
      this.modelService[this.tableService.modelName][this.modelName].push(_value[i]);
    }
  }

  clickCheck(data) {
    this.clickOneCheck.next(data);
  }

  clickAllCheck(e) {
    this._clickAllCheck.emit(e);
  }

  ngOnDestroy(): void {
    super.destroy();
  }

}
