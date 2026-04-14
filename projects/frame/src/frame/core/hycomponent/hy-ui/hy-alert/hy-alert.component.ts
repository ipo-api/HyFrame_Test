import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'hy-alert',
  templateUrl: './hy-alert.component.html',
  styleUrls: ['./hy-alert.component.css']
})
export class HyAlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  /** 指定警告提示的样式，nzBanner 模式下默认值为 warning	 */
  @Input()
  alertType:'success' | 'info' | 'warning' | 'error' = 'info';

  /** 警告提示内容 */
  @Input()
  message:	string | TemplateRef<void>;

  /** 警告提示的辅助性文字介绍 */
  @Input()
  description:	string | TemplateRef<void>;

  /** 是否用作顶部公告 */
  @Input()
  isBanner:boolean = false;

  /** 默认不显示关闭按钮 */
  @Input()
  closeable:boolean = false;

  /** 是否显示辅助图标 */
  @Input()
  showIcon:boolean = false;

  /** 自定义关闭按钮(会覆盖closeable = true的状态) */
  @Input()
  closeText:string | TemplateRef<void>;


  /** 关闭时触发的回调函数 */
  @Output('onClickClose')
  onClickClose = new EventEmitter();
  onClick_Close(value: any) {
    this.onClickClose.emit(value);
  }
}
