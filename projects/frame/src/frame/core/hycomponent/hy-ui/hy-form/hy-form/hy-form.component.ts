import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { HyFrameLayout } from './interface';

@Component({
  selector: 'hy-form',
  templateUrl: 'hy-form.component.html',
  styleUrls: ['hy-form.component.less'],
  providers: [HyFormService],
})
export class HyFormComponent implements OnInit, AfterViewInit {
  @Input() nzLayout: HyFrameLayout = 'horizontal';

  /** 表单验证状态*只读(请按照双向绑定的方式使用，否则无效，如：[(formValid)]="formValid") */
  @Input() formValid: boolean = false;

  /** 表单验证状态变动（表单内任意值变动也会触发）*/
  @Output() formVaildChange = new EventEmitter();

  /** 是否修改过内容*只读(请按照双向绑定的方式使用，否则无效，如：[(formPristine)]="formPristine") */
  @Input() formPristine: boolean = true;

  @Output() formPristineChange = new EventEmitter();

  constructor(public formService: HyFormService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.getFormStatus();
  }

  /** 获取表单状态 */
  getFormStatus() {
    this.formService.formGroup.statusChanges.subscribe(e => {
      if (e === 'VALID') {
        this.formValid = true;
      }
      if (e === 'INVALID') {
        this.formValid = false;
      }
      if (!this.formService.formGroup.pristine) {
        this.formPristine = false;
      }
      this.formVaildChange.emit(this.formValid);
      this.formPristineChange.emit(this.formPristine);
    })
  }
}
