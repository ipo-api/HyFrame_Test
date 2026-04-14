import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { HyStep } from './interface';
import { I18nService } from '../../../service/i18n.service';

@Component({
  selector: 'hy-step',
  templateUrl: './hy-step.component.html',
  styleUrls: ['./hy-step.component.css']
})
export class HyStepComponent {

  @ContentChild(TemplateRef, /* TODO: add static flag */ {}) itemTemplate: TemplateRef<any>;

  /** 步骤条宽度，单位px｜% */
  @Input()
  stepWidth: string;

  /** 元数据，数组对象格式 */
  @Input()
  stepTitle: Array<HyStep>;

  /** 指定大小，目前支持普通（default）和迷你（small）,属性为small的时候，步骤条圆圈会小一点 */
  @Input()
  size: 'default' | 'small' = 'default';

  /** 是否显示默认按钮 */
  @Input()
  showButton: boolean = true;

  /** 指定当前步骤，从0开始记数 */
  @Input()
  current: number = 0;

  /** 当前步骤会调事件 */
  @Output()
  getCurrentNum = new EventEmitter(); //
  get_CurrentNum(current: any) {
    this.getCurrentNum.emit(current);
  }


  /** 确定按钮点击事件 */
  @Output('onClickOk')
  onClickOk = new EventEmitter();
  done() {
    this.onClickOk.emit();
  }

  /** 返回按钮点击事件 */
  @Output('onClickReturn')
  clickReturn = new EventEmitter();
  pre() {
    this.clickReturn.emit();
    this.current -= 1;
    this.get_CurrentNum(this.current);
  }

  /** 下一步按钮点击事件 */
  @Output('onClickNext')
  onClickNext = new EventEmitter();
  next() {
    this.onClickNext.emit();

    this.current += 1;
    this.get_CurrentNum(this.current);
  }

  constructor(public I18nService: I18nService) { }
}
