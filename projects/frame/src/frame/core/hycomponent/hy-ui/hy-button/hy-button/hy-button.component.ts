import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { repeat, take, throttleTime } from 'rxjs/operators';
import { AppGlobal } from '../../../../../config/AppGlobal';
import { Observable } from 'rxjs/internal/Observable';
import { interval } from 'rxjs/index';
import { StringUtil } from '../../../../util/common/StringUtil';
import { NzButtonType } from 'ng-zorro-antd/button';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { $hyapi } from '../../../../api/$hyapi';
import { HyButtonIconClass, HyButtonPlacement, HyButtonShape, HyButtonSize, HyButtonTrigger, HyButtonType } from './interface';
import { I18nService } from '../../../../service/i18n.service';

@Component({
  selector: 'hy-button',
  templateUrl: './hy-button.component.html',
  styleUrls: ['./hy-button.component.css'],
})
export class HyButtonComponent implements OnInit, OnDestroy, OnChanges {

  formService: HyFormService;

  /** 按钮标题 */
  @Input()
  title: string;

  @Input() class: string;

  /** 框架封装的常用按钮类型 */
  @Input()
  btnType: '删除' | '保存' | '取消' | '返回' | '关闭' | '图标' | null;

  /** 是否为危险按钮 */
  @Input()
  isDangerBtn: boolean = false;

  _type: NzButtonType;
  /** 按钮类型 */
  @Input() type: HyButtonType;

  /** 阿里官网图标 */
  @Input()
  nzIconName: string = '';

  /** 海颐svg图标 */
  @Input()
  hyIconName: string = '';

  /** 图标样式 */
  @Input()
  iconStyle: object = { 'font-size': '14px' };

  /** 图标颜色;pointer鼠标效果 */
  @Input()
  iconClass: HyButtonIconClass;

  /** 设置按钮形状 */
  @Input()
  shape: HyButtonShape;

  /** 按钮大小 */
  @Input()
  size: HyButtonSize = 'default';

  /** 设置按钮载入状态 */
  @Input()
  loading: boolean = false;

  /** 将按钮宽度调整为其父宽度的选项 */
  @Input()
  block: boolean = false;

  /** 幽灵属性，使按钮背景透明 */
  @Input()
  ghost: boolean = false;

  /** 带搜索框的按钮在前后置标签中为true,目的是加载样式 */
  @Input()
  search: boolean = false;

  /** 是否可点击 */
  @Input()
  enable: boolean = true;

  /** 是否使用气泡卡片按钮 */
  @Input()
  popoverButton: boolean = false;

  /** 卡片标题 */
  @Input()
  popoverTitle: string;

  /** 气泡卡片内容，与popoverButton配合使用 */
  @Input()
  content: string | TemplateRef<void>;

  /** 气泡卡片触发方式，与popoverButton配合使用 */
  @Input()
  trigger: HyButtonTrigger = 'click';

  /** 气泡卡片的位置，与popoverButton配合使用 */
  @Input()
  placement: HyButtonPlacement = 'top';

  /** 气泡卡片样式，与popoverButton配合使用 */
  @Input()
  overlayStyle: object;

  /** 弹出框提示内容 */
  @Input()
  confirm: string;

  /** 防抖时间 */
  @Input()
  time: number;

  /** 控制气泡卡片浮层显示，与popoverButton配合使用 */
  @Input() visible: boolean = false;

  _isShow: boolean = true;
  /** 是否显示按钮 */
  @Input() isShow: boolean = true;

  /** 是否弹出确认提示框 */
  @Input() showConfirm: boolean = true;

  _authShow: any = true;
  @Input() auth: any;

  /** 点击事件 */
  @Output()
  onClick = new EventEmitter<any>();

  /** 气泡窗口变动事件 */
  @Output() visibleChange = new EventEmitter<any>();

  /** 用于按钮自动倒数 */
  @Input() disableTime: number;

  _check: any = true;
  /** 是否参与检验 */
  @Input()
  public set check(value: boolean) {
    this._check = value === null || value === undefined ? true : value;
  }
  public get check(): boolean {
    return this._check;
  }

  /** 是否开启校验表单数据是否被编辑过 */
  @Input()
  ckPristine: boolean;

  clickObserver: any;

  timeCountDisabled: boolean = false;

  constructor(formService: HyFormService, public i18nService: I18nService) {
    // console.log("HyButtonComponent..................");
    this.formService = formService;

  }

  checkAuth(value) {
    if (value != null) {
      if (!AppGlobal.loginUser && !AppGlobal.loginUser.auths) {
        return false;
      }
      let auths = value.split(',');
      for (let i = 0; i < auths.length; i++) {
        if (AppGlobal.loginUser.auths.includes(auths[i])) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['auth'] && changes['auth'].currentValue !== undefined) {
      this._authShow = this.checkAuth(this.auth);
    }
    if (changes['isShow'] && changes['isShow'].currentValue !== undefined) {
      this._isShow = this.isShow;
    }
    if (changes['type'] && changes['type'].currentValue !== undefined) {
      if (this.type === 'danger') {
        this._type = 'default';
        this.isDangerBtn = true;
      } else {
        this._type = this.type;
      }
    }

    if (changes['title'] && changes['title'].currentValue !== undefined) {
      this.setBtnType();
    }
    if (changes['btnType'] && changes['btnType'].currentValue !== undefined) {
      this.setBtnType();
    }
  }

  /** 根据title和btnType修改按钮类型 */
  private setBtnType() {
    if (this.title?.toLowerCase() == this.i18nService.getFrameI18n('hy-button.保存').toLowerCase() || this.btnType == '保存') {
      this._type = this._type || 'primary';
      this.size = this.size || 'default';
    } else if (this.title?.toLowerCase() == this.i18nService.getFrameI18n('hy-button.取消').toLowerCase() || this.title?.toLowerCase() === this.i18nService.getFrameI18n('hy-button.返回').toLowerCase() || this.title?.toLowerCase() === this.i18nService.getFrameI18n('hy-button.关闭').toLowerCase() || this.btnType === '取消' || this.btnType == '返回' || this.btnType === '关闭') {
      this._type = this._type || 'default';
      this.size = this.size || 'default';
    } else if (this.title?.toLowerCase() == this.i18nService.getFrameI18n('hy-button.删除').toLowerCase() || this.btnType === '删除') {
      this.isDangerBtn = true;
      this._type = this._type || 'default';
      this.confirm = this.i18nService.getFrameI18n('hy-button.是否确认删除？');
    }
  }

  ngOnInit() {
    Observable.create((observer) => {
      this.clickObserver = observer;
    })
      .pipe(throttleTime(AppGlobal.ui_btn_throttleTime)) // wait 300ms after the last event before emitting last event
      .subscribe(() => {
        if (this.showConfirm && this.confirm) {
          $hyapi.msg.confirm(this.confirm, {
            callback: () => {
              if (this.time) {
                this.timeCount(this.time);
              }
              this.onClick.emit();
            },
          });
        } else {
          if (this.time) {
            this.timeCount(this.time);
          }
          this.onClick.emit();
        }
      });
    if (this.disableTime) {
      this.timeCount(this.disableTime);
    }
  }

  click() {
    if (!((this.formService.formGroup.invalid && this.check) || !this.enable || (this.formService.formGroup.pristine && this.ckPristine))) {
      this.clickObserver.next();
    }
  }

  ngOnDestroy(): void {
    if (this.clickObserver) {
      this.clickObserver.unsubscribe();
    }
  }

  timeCount(time: number, msg?: string) {
    let self = this;
    let tmpTitle = self.title;
    let timeCount = 0;
    msg = msg || tmpTitle + `(#time#${this.i18nService.getFrameI18n('hy-button.秒')})`;

    self.timeCountDisabled = true;
    timeCount = time;
    self.title = StringUtil.replaceAll(msg, '#time#', timeCount);

    interval(1000)
      .pipe(take(time + 1), repeat(1))
      .subscribe((curNum) => {
        timeCount = time - curNum;
        self.title = StringUtil.replaceAll(msg, '#time#', timeCount - 1);
        if (timeCount <= 1) {
          self.timeCountDisabled = false;
          self.title = tmpTitle;
        }
      });
  }



}
