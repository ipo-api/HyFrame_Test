import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { interval } from 'rxjs/index';
import { repeat, take, throttleTime } from 'rxjs/operators';
import { AppGlobal } from '../../../../../config/AppGlobal';
import { $hyapi } from '../../../../api/$hyapi';
import { Observable } from 'rxjs/internal/Observable';
import { StringUtil } from '../../../../util/common/StringUtil';
import { NzButtonType } from 'ng-zorro-antd/button';
import { HyButtonPlacement, HyButtonShape, HyButtonSize, HyButtonTrigger } from '../hy-button/interface';
import { I18nService } from '../../../../service/i18n.service';

@Component({
  selector: 'hyb-button',
  templateUrl: './hyb-button.component.html',
  styleUrls: ['./hyb-button.component.css'],
})
export class HybButtonComponent implements OnInit, OnDestroy {
  public i18nButtonType = {
    'zh_CN':{
      'save':'保存',
      'delete':'删除',
      'edit':'编辑',
      'cancel':'取消',
      'back':'返回',
      'close':'关闭',
      'icon':'图标',
    },
    'zh_HK':{
      'save':'保存',
      'delete':'刪除',
      'edit':'編輯',
      'cancel':'取消',
      'back':'返回',
      'close':'關閉',
      'check':'查看',
      'icon':'圖標',
    },
    'en_US':{
      'save':'Save',
      'delete':'Delete',
      'edit':'Edit',
      'cancel':'Cancel',
      'back':'Back',
      'close':'Close',
      'icon':'Icon',
    },
  };

  formService: HyFormService;

  /** 按钮标题 */
  @Input()
  title: string;

  /** 框架封装的常用按钮类型 */
  @Input()
  btnType: string

  /** 按钮类型 */
  @Input()
  type: NzButtonType = 'default';

  /** 设置按钮形状 */
  @Input()
  shape: HyButtonShape

  /** 按钮大小 */
  @Input()
  size: HyButtonSize = 'default';

  /** 设置按钮载入状态 */
  @Input()
  loading: boolean = false;

  /** 阿里官网图标 */
  @Input()
  nzIconName: string = '';

  /** 海颐图标 */
  @Input()
  hyIconName: string;

  /** 图标样式 */
  @Input()
  iconStyle: object = { 'font-size': '14px' };

  /** 是否可点击 */
  @Input()
  enable: boolean = true;

  /** 确认框的描述内容 */
  @Input()
  confirmTitle: string;

  /** 幽灵属性，使按钮背景透明 */
  @Input()
  ghost: boolean = false;

  /** 将按钮宽度调整为其父宽度的选项 */
  @Input()
  block: boolean = false;

  /** 带搜索框的按钮在前后置标签中为true,目的是加载样式 */
  @Input()
  search: boolean = false;

  /** 卡片标题 */
  @Input()
  popoverTitle: string;

  /** 用于定义气泡确认框卡片Content内容string｜TemplateRef<void> */
  @Input()
  contentTemplate: TemplateRef<any>;

  /** 气泡卡片内容，与popoverButton配合使用 */
  @Input()
  content: any;

  /** 气泡卡片触发方式，与popoverButton配合使用 */
  @Input()
  trigger: HyButtonTrigger = 'click';

  /** 气泡卡片的位置，与popoverButton配合使用 */
  @Input()
  placement: HyButtonPlacement = 'top';

  /** 气泡卡片样式，与popoverButton配合使用 */
  @Input()
  overlayStyle: object; //卡片样式,类型object

  /** 弹出框提示内容 */
  @Input()
  confirm: string;

  /** 按钮的样式 */
  @Input()
  buttonStyle: object;

  _isShow: any = true;
  /** 是否显示按钮 */
  @Input()
  public set isShow(value: any) {
    value = value == null ? 'true' : value + '';
    this._isShow = value.toLowerCase() === 'true';
  }
  public get isShow(): any {
    return this._isShow;
  }

  _showConfirm: any = true;
  /** 是否弹出确认提示框 */
  @Input()
  public set showConfirm(value: any) {
    value = value == null ? 'true' : value + '';
    this._showConfirm = value.toLowerCase() === 'true';
  }
  public get showConfirm(): any {
    return this._showConfirm;
  }

  _authShow: any = true;
  @Input()
  public set auth(value: any) {
    this._authShow = this.checkAuth(value);
  }

  /** 点击事件 */
  @Output()
  onClick = new EventEmitter<any>();

  clickObserver: any;

  timeCountDisabled: boolean = false;

  constructor(formService: HyFormService,public i18nService: I18nService) {
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

  ngOnInit() {
    Observable.create((observer) => {
      this.clickObserver = observer;
    })
      .pipe(throttleTime(AppGlobal.ui_btn_throttleTime)) // wait 300ms after the last event before emitting last event
      .subscribe(() => {
        if (this._showConfirm && this.confirm) {
          $hyapi.msg.confirm(this.confirm, {
            callback: () =>{
              this.onClick.emit();
            },
          });
        } else {
          this.onClick.emit();
        }
      });
  }

  click() {
    if (!((this.formService.formGroup.invalid && this.check) || !this.enable)) {
      this.clickObserver.next();
    }
  }

  ngOnDestroy(): void {
    this.clickObserver.unsubscribe();
  }

  timeCount(time: number, msg?: string) {
    let tmpTitle = this.title;
    let timeCount = 0;

    msg = msg || tmpTitle + `(#time#${this.i18nService.getFrameI18n('hyb-button.秒')})`;

    this.timeCountDisabled = true;
    timeCount = time;
    this.title = StringUtil.replaceAll(msg, '#time#', timeCount);

    interval(1000)
      .pipe(take(time + 1), repeat(1))
      .subscribe( (curNum)=> {
        timeCount = time - curNum;
        this.title = StringUtil.replaceAll(msg, '#time#', timeCount - 1);
        if (timeCount <= 1) {
          this.timeCountDisabled = false;
          this.title = tmpTitle;
        }
      });
  }

  _check: any = true;
  /** 是否参与检验 */
  @Input()
  public set check(value: any) {
    value = value == null ? 'true' : value + '';
    this._check = value.toLowerCase() === 'true';
  }
  public get check(): any {
    return this._check;
  }
}
