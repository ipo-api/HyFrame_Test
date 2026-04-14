import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { HyBaseInput } from '../../../../common/domain/base/HyBaseInput';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { ModelService } from '../../../../common/domain/service/model.service';
import { DicService } from '../../../../service/dic.service';
import { FormBuilder } from '@angular/forms';
import { $hyapi } from '../../../../api/$hyapi';
import { HyReadonlyTextClass } from './interface';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';
import { I18nService } from '../../../../service/i18n.service';

@Component({
  selector: 'hy-readonly',
  templateUrl: './hy-readonly.component.html',
  styleUrls: ['./hy-readonly.component.less'],
  host: {
    '[class.compoent-flex]': 'flex',
  }

})
export class HyReadonlyComponent extends HyBaseInput implements OnInit, OnDestroy, AfterContentInit, OnChanges {
  @ContentChildren('anyContent') contentChildren!: QueryList<any>;
  hasContent = false;
  _time;
  @ViewChild('textSpan', { read: ElementRef }) textSpan: any;
  @ViewChild('textDiv', { read: ElementRef }) textDiv: any;
  @ViewChild('moreIcon', { read: ElementRef }) moreIcon: any;
  dicValue: string;
  gtEnableChangeFn: any;
  width: number;
  isShowLabelTooltip: boolean = false;
  maxWidth;
  $hyapi = $hyapi;

  /** 模板数据（使用模板时如果传入此参数，则能在ng-template中获取对应参数） */
  @Input() item: any;

  /** 模板下标（使用模板时如果传入此参数，则能在ng-template中获取对应下标） */
  @Input() index: number;

  /** 栅格布局1~24 */
  @Input() cols: number | string;

  /** 标题宽度，单位px */
  @Input() labelWidth: string;

  /** 标题超出长度时是否换行 */
  @Input() isLabelWrap: boolean;

  /** flex布局，单位px */
  @Input() flex: any;

  /** 标题 */
  @Input() title: string;

  /** 字典名 */
  @Input('dic') dicName: string;

  /** modelName（model值清空时不能赋值空字符串，用delete） */
  @Input('model') modelName: any; //model值清空时不能赋值空字符串，用delete

  /** 是否隐藏标题 */
  @Input() noLabel: boolean = false;

  /** 是否隐藏冒号 */
  @Input() noColon: boolean = false;

  /** text样式，默认不加粗 */
  @Input() textStyle: object;

  /** 内容颜色class，可选参数值(字体加粗) */
  @Input() textClass: HyReadonlyTextClass;

  /** 高度，单位px */
  @Input() height: string;

  /** 是否显示更多按钮 */
  @Input() isShowMore: boolean = false;

  /** 是否自动换行 */
  @Input() isWrap: boolean = false;

  /** 更多按钮显示状态（双向绑定） */
  @Input() isMoreOpen: boolean = false;

  /** 是否显示复制按钮 */
  @Input() isShowCopy: boolean = true;

  /** 展示多选字典数据时的分隔符，可任意输入如‘|’，‘-’等字符去做间隔 */
  @Input() separator: string = '；';

  /** 文字后面的模板 */
  @Input() textAfterTemplate: TemplateRef<any>;

  /** 点击更多按钮的事件 */
  @Output() onMoreClick = new EventEmitter<any>();

  @Output() isMoreOpenChange = new EventEmitter<any>();

  public valueString: string;

  public valueTemplate: TemplateRef<any>;

  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, private dicService: DicService, fb: FormBuilder, public validatorFnsService: ValidatorFnsService, private i18nService: I18nService) {
    super('readonly', formService, tableService, modelService, el, fb, validatorFnsService);
  }

  ngOnInit() {
    super.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['value'] && changes['value'].currentValue !== undefined) {
      if (typeof changes['value'].currentValue === 'string') {
        this.valueString = changes['value'].currentValue;
      } else {
        this.valueTemplate = changes['value'].currentValue;
      }
    }
  }

  ngAfterContentInit() {
    this.hasContent = this.contentChildren.length > 0;
    // 如果需要响应式检测内容变化
    this.contentChildren.changes.subscribe(() => {
      this.hasContent = this.contentChildren.length > 0;
    });
  }

  clickMore() {
    this.isMoreOpen = !this.isMoreOpen;
    this.isMoreOpenChange.emit(this.isMoreOpen);
    this.onMoreClick.emit(this.isMoreOpen);
  }

  /** 复制操作 */
  copy() {
    if (this.isShowCopy) {
      if (navigator.clipboard && window.isSecureContext) {
        const text = this.textSpan.nativeElement.innerText;
        navigator.clipboard.writeText(text).then(() => {
          $hyapi.msg.createTips('success', this.i18nService.getFrameI18n('hy-readonly.复制成功'));
        }, () => {
          $hyapi.msg.createTips('warning', this.i18nService.getFrameI18n('hy-readonly.复制失败'));
        });
      }
    }
  }

  ngOnDestroy(): void {
    super.destroy();
  }

}

