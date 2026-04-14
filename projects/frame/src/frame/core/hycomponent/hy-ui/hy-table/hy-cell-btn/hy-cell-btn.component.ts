import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/index';
import { AppGlobal } from '../../../../../config/AppGlobal';
import { throttleTime } from 'rxjs/internal/operators';
import { $hyapi } from '../../../../api/$hyapi';
import { I18nService } from '../../../../service/i18n.service';

@Component({
  selector: 'hy-cell-btn',
  templateUrl: './hy-cell-btn.component.html',
  styleUrls: ['./hy-cell-btn.component.css']
})
export class HyCellBtnComponent implements OnInit, OnDestroy {
  /** 按钮颜色 */
  public _iconClass: 'red' | 'blue' | 'orange' | 'green' | 'pointer' | 'enable' | '' | null = 'blue';

  /** 全局变量，作用于是否可点击时，图标按钮颜色切换 */
  public enableIconClass: 'red' | 'blue' | 'orange' | 'green' | 'pointer' | 'enable' | '' | null = 'blue';

  /** 是否允许点击 */
  public _enable: boolean = true;

  /** 标题 */
  @Input() title: string;

  /** 框架封装的常用按钮类型 */
  @Input() btnType?: '删除' | '编辑' | '查看' | null;

  /** 海颐png图标 */
  @Input() btnImg: string;

  /** 海颐图标 */
  @Input() hyIconName: string;

  /** 阿里官网提供的图标 */
  @Input() nzIconName: string;

  /** 文字按钮 */
  @Input() btnLink: boolean;

  /** 危险按钮标识,用于title="删除"并且为文字按钮时 */
  @Input() isDangerBtn: boolean;

  /** 修改阿里官网图标样式 */
  @Input() iconStyle: any = { 'font-size': '16px' };

  /** 鼠标效果title提示 */
  public tooltipVisible: boolean = false;


  /**
   * 图标颜色，可选参数red、blue
   * @typedef {'blue' | 'red' | 'enable'}
   */
  @Input()
  set iconClass(value: 'red' | 'blue' | 'orange' | 'green' | 'pointer' | '' | null) {
    this._iconClass = value;
    this.enableIconClass = value;
  }

  /** 当btnLink="true",文字按钮时，是否显示中间那条分隔线 */
  @Input() showDivider: boolean = false;


  /** 是否可编辑 */
  @Input()
  set enable(value: boolean) {
    if (value == false) {
      this._iconClass = 'enable';
    } else if (value == true) {
      this._iconClass = this.enableIconClass;
    }
    this._enable = value;
  }
  get enable(): boolean {
    return this._enable;
  }

  /** 确认框提示框内容，与showConfirm配合使用 */
  @Input() confirm: string;

  /** 气泡确认框的内容 */
  @Input() popconfirmTitle: string | TemplateRef<void>;

  /** 取消按钮文字*/
  @Input() cancelText: string;

  /** 确认按钮文字*/
  @Input() confirmText: string;

  /** 气泡确认框的图标 */
  @Input() popconfirmIcon: string | TemplateRef<void>;

  /** 点击取消的回调 */
  @Output('onClickCancel')
  onClick_Cancel = new EventEmitter();
  onClickCancel() {
    this.onClick_Cancel.emit();
  }

  /** 点击确认的回调 */
  @Output('onClickConfirm')
  OnClick_Confirm = new EventEmitter();
  onClickConfirm() {
    this.OnClick_Confirm.emit();
  }

  _showConfirm: any = true;
  /** 是否弹出确认提示框 */
  @Input()
  public set showConfirm(value: any) {
    value = value == null ? 'true' : value + '';
    this._showConfirm = (value).toLowerCase() === 'true';
  }
  public get showConfirm(): any {
    return this._showConfirm;
  }

  /** 按钮点击方法 */
  @Output() onClick = new EventEmitter<any>();

  clickObserver: any;

  constructor(public i18nService: I18nService) { }

  ngOnInit() {
    this.setBtnType();

    Observable.create(observer => {
      this.clickObserver = observer;
    }).pipe(throttleTime(AppGlobal.ui_btn_throttleTime))
      .subscribe(() => {
        if (this._showConfirm && this.confirm) {
          $hyapi.msg.confirm(this.confirm, {
            callback: () => {
              this.onClick.emit();
            }
          });

        } else {
          this.onClick.emit();
        }
      }
    );
  }

  /** 设置根据title和btnType（btnType优先级更高）按钮类型 */
  private setBtnType() {
    if (this.title?.toLowerCase() == this.i18nService.getFrameI18n('hy-cell-btn.删除')?.toLowerCase() || this.btnType == '删除') {
      if (!this.btnImg && !this.nzIconName && !this.btnLink) {
        this.hyIconName = 'delete';
        if (this._enable == false) {
          this._iconClass = 'enable';
        } else {
          this._iconClass = 'red';
          this.enableIconClass = 'red';
        }
      } else if (this.btnLink == true) {
        this.isDangerBtn = true;
      }
      this.confirm = this.confirm || this.i18nService.getFrameI18n('hy-cell-btn.是否确认删除？');
    } else if ((this.title?.toLowerCase() == this.i18nService.getFrameI18n('hy-cell-btn.编辑')?.toLowerCase() || this.btnType == '编辑') && !this.btnImg && !this.nzIconName && !this.btnLink) {
      this.hyIconName = 'edit';
    } else if ((this.title?.toLowerCase() == this.i18nService.getFrameI18n('hy-cell-btn.编辑')?.toLowerCase() || this.btnType == '查看') && !this.btnImg && !this.nzIconName && !this.btnLink) {
      this.hyIconName = 'viewDetails';
    } else if (!this.btnImg && !this.nzIconName && !this.hyIconName && !this.btnLink) {
      this.btnLink = true;
    }
  }

  /** 点击事件 */
  click() {
    this.tooltipVisible = false;
    setTimeout(() => {
      if (this._enable) {
        this.clickObserver.next();
      }
    });
  }

  /** 鼠标移开 */
  mouseleave() {
    this.tooltipVisible = false;
  }

  /** 鼠标移入 */
  mouseenter() {
    this.tooltipVisible = true;
  }

  ngOnDestroy(): void {
    if (this.clickObserver) {
      this.clickObserver.unsubscribe();
    }
  }
}
