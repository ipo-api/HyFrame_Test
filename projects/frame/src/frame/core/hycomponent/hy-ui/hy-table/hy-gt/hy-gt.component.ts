import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, ElementRef } from '@angular/core';
import { ModelService } from '../../../../common/domain/service/model.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { HyBaseTable } from '../../../../common/domain/base/HyBaseTable';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { $hyapi } from '../../../../api/$hyapi';
import { HyGtClass, HyGtErrorMessage } from './interface';

@Component({
  selector: 'hy-gt',
  templateUrl: 'hy-gt.component.html',
  styleUrls: ['hy-gt.component.less'],
  providers: [TableService],
})
export class HyGtComponent extends HyBaseTable implements OnInit, OnChanges, AfterViewInit {
  _titleTemp: TemplateRef<void>;
  _titleString: string;
  tempTitleHeight: boolean = true;

  /** 标题 */
  @Input() title: string | TemplateRef<void>;

  /** modelName */
  @Input('model')
  modelName: string;

  /** 栅格布局1~24，作用于内部每个标签上 */
  @Input()
  cols: number | string;

  /** 标题宽度，单位px */
  @Input()
  labelWidth: string;

  /** 标题超出长度时是否换行 */
  @Input()isLabelWrap:boolean;

  /** 提示 */
  @Input()
  tip: string;

  /** 统一设置单记录表所包含的各个组件是否显示提示内容 */
  @Input()
  showTip: boolean = false;

  /** 固定尺寸布局，作用于内部每个标签上,当为true时，固定所有尺寸为240px，当输入固定值时，如100px，则所有尺寸为100px */
  @Input()
  flex: string | boolean;

  /** 是否为空状态，默认false */
  @Input()
  isEmpty: boolean = false;

  /** 是否隐藏边框 */
  @Input()
  noBorder: boolean = false;

  /** 是否隐藏内边距 */
  @Input()
  noPadding: boolean = false;

  /** 显示顶部内边距 */
  @Input()
  showTopPadding: boolean = false;

  /** 显示底部内边距 */
  @Input()
  showBottomPadding: boolean = false;

  /** 显示左侧内边距 */
  @Input()
  showLeftPadding: boolean = false;

  /** 显示右侧内边距 */
  @Input()
  showRightPadding: boolean = false;

  _class: string; //noBorder：四周无边框，grayTitle：标题背景为灰色并且无边框，bgTransparent：背景颜色为透明，gtStyle1：只有上边框的单记录表
  /**
   * 样式类型
   * @typedef {'noBorder' | 'grayTitle' | 'bgTransparent' | 'gtStyle1' | 'null'}
   */
  @Input() class: HyGtClass | Array<HyGtClass> | null;

  _showTitle: any = true;
  /** 显示标题 */
  @Input()
  public set showTitle(value: any) {
    value = value == null ? 'true' : value + '';
    this._showTitle = value.toLowerCase() === 'true';
  }
  public get showTitle(): any {
    return this._showTitle;
  }

  /** 是否禁止输入 */
  @Input() enable: boolean = true;

  /** 是否显示单记录表 */
  @Input() isShow: boolean = true;

  _errorMessage: any = true;
  /**
   * 错误提示信息
   * @typedef HyGtErrorMessage
   */
  @Input()
  public set errorMessage(value: HyGtErrorMessage) {
    if (!value) return;
    $hyapi.msg.showErrorMessage(value, this.modelService);
  }
  public get errorMessage(): HyGtErrorMessage {
    return this._errorMessage;
  }

  @Output('onKeyup.enter')
  hyKeyup = new EventEmitter<any>();

  /** 表单验证状态*只读(请按照双向绑定的方式使用，否则无效，如：[(formValid)]="formValid") */
  @Input() formValid: boolean = false;

  /** 表单验证状态变动 */
  @Output() formValidChange = new EventEmitter();

  /** 是否修改过内容*只读(请按照双向绑定的方式使用，否则无效，如：[(formPristine)]="formPristine") */
  @Input() formPristine: boolean = true;

  /** 首次数据数据变动触发 */
  @Output() formPristineChange = new EventEmitter();

  constructor(modelService: ModelService, formService: HyFormService, public tableService: TableService) {
    super('gt', modelService, tableService, formService);
  }

  ngOnInit() {
    super.init();

    if (this.showTip) {
      this.tableService.showTip = this.showTip;
    }

    this.tableService.cols = this.cols;

    if (this.labelWidth) {
      this.tableService.labelWidth = this.labelWidth;
    }

    if (this.flex == true) {
      this.tableService.flex = '240px';
    }

    if (typeof this.flex == 'string') {
      this.tableService.flex = this.flex;
    }

    if (!this.modelService && !this.modelName) return;
    this.tableService['hyKeyup'] = () => {
      this.hyKeyup.emit();
    }

    if(this.isLabelWrap){
      this.tableService.isLabelWrap = true;
    }
  }


  ngAfterViewInit(): void {
    this.getFormStatus();
  }

  /** 获取表单状态 */
  getFormStatus() {
    this.formService.formGroup.statusChanges.subscribe(e => {
      let unValidNum = 0;
      let pristineNum = 0;
      for (const key in this.formService.formGroup.controls) {
        if (key.substring(0, key.indexOf('.')) === this.modelName) {
          if (!this.formService.formGroup.controls[key].valid) {
            unValidNum++;
          }
          if (!this.formService.formGroup.controls[key].pristine) {
            pristineNum++;
          }
        }
      }
      this.formValid = unValidNum > 0 ? false : true;
      this.formValidChange.emit(this.formValid);
      this.formPristine = pristineNum > 0 ? false : true;
      this.formPristineChange.emit(this.formPristine);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['showTip'] && changes['showTip'] !== undefined) {
      this.tableService.showTip = this.showTip;
    }
    if (changes['title'] && changes['title'].currentValue !== undefined) {
      if (typeof this.title === 'string') {
        this._titleString = this.title;
      }
      this._titleTemp = this.title as any;
    }
    if (changes['enable'] && changes['enable'].currentValue !== undefined) {
      this.tableService.enable = this.enable;
    }
    if (changes['isLabelWrap'] && changes['isLabelWrap'].currentValue !== undefined) {
      this.tableService.isLabelWrap = this.isLabelWrap;
    }
    if (changes['class'] && changes['class'].currentValue !== undefined) {
      if (typeof this.class === 'string') {
        this._class = this.class;
        if (this.class == 'grayTitle') {
          // 标题为灰色背景，高度为auto
          this.tempTitleHeight = false;
        }
      } else if (this.class && this.class.length > 0) {
        this._class = '';
        this.class.forEach(element => {
          if (this._class) {
            this._class += ' ' + element;
          } else {
            this._class = element;
          }
          // 标题为灰色背景，高度为auto
          if (element === 'grayTitle') {
            this.tempTitleHeight = false;
          }
        })
      } else {
        this._class = '';
      }
    }
  }
}
