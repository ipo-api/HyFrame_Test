import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { HyIconClass } from './interface';

@Component({
  selector: 'hy-icon',
  templateUrl: './hy-icon.component.html',
  styleUrls: ['./hy-icon.component.css']
})
export class HyIconComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  public _nzIconName: string = '';

  /** 阿里官网图标 */
  @Input()
  set nzIconName(value: string) {
    this._nzIconName = value;

    if(value == 'search'){
      this.iconStyle = {fontSize:'14px',cursor: 'pointer'};
    }
  }

  get nzIconName(): string {
    return this._nzIconName;
  }


  public _hyIconName: string;

  /** 海颐图标 */
  @Input()
  set hyIconName(value: string) {
    if(value&&value.length>0){
      if(value.indexOf('app')!= -1){
        this._hyIconName = 'svg/'+value;
      }else {
        this._hyIconName = 'svg/frame:'+value;
      }
    }

    if(value=='search'){
      this.iconStyle = {fontSize:'14px',cursor: 'pointer'};
    }
  }

  get hyIconName(): string {
    return this._hyIconName;
  }

  /** 图标样式 */
  @Input()
  iconStyle: object;

  /** 图标颜色，可选参数(鼠标效果) */
  @Input()
  iconClass: HyIconClass;

  /** 点击图标事件 */
  @Output()
  onClick = new EventEmitter<any>();
  click(){
    this.onClick.emit();
  }
}
