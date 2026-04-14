import { Component, Input, OnInit, Output } from '@angular/core';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { HyDropdownButtonObj, HyDropdownButtonTrigger, HyDropdownButtonType, HyDropdownMenuPlacement, HyDropdownSize } from './interface';

@Component({
  selector: 'hy-dropdown-button',
  templateUrl: './hy-dropdown-button.component.html',
  styleUrls: ['./hy-dropdown-button.component.css'],
})
export class HyDropdownButtonComponent implements OnInit {
  formService: HyFormService;
  constructor(formService: HyFormService) {
    this.formService = formService;
  }

  ngOnInit() { }

  @Input() item:any;

  @Input() index:number;

  /** 标题 */
  @Input()
  title: string;

  /** 下拉选项 */
  @Input()
  dropdownButtonArray: HyDropdownButtonObj[];

  /** 按钮类型primary(蓝底) | dashed（边框为虚线） | danger (危险按钮)| default(白底) */
  @Input()
  type: HyDropdownButtonType = 'default';

  /** 按钮大小 */
  @Input()
  size: HyDropdownSize = 'default';

  /** 是否可点击 */
  @Input()
  enable: boolean = true;

  /** 下拉菜单按钮触发方式 */
  @Input()
  dropdownButtonTrigger: HyDropdownButtonTrigger = 'hover';

  /** 菜单弹出位置 */
  @Input()
  dropdownMenuPlacement: HyDropdownMenuPlacement = 'bottomLeft';

  _check: any = true;
  /** 是否参与表单验证 */
  @Input()
  public set check(value: boolean) {
    this._check = value === null || value === undefined ? true : value;
  }
  public get check(): boolean {
    return this._check;
  }

  click(data) {
    if (data.enable === true || data.enable === undefined) {
      if(this.item || this.index){
        data.click({item:this.item,index:this.index});
      }else{
        data.click();
      }
    }
  }
}
