import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {HyTransferTemp} from '../interface';

@Component({
  selector: 'hy-transfer-temp',
  templateUrl: './hy-transfer-temp.component.html',
  styleUrls: ['./hy-transfer-temp.component.css']
})
export class HyTransferTempComponent implements OnInit,AfterViewInit {


  constructor() { }

  @Input('data')
  data: any; //数据

  @Output('onItemSelectAll') //触发全选
  _onItemSelectAll = new EventEmitter();

  @Output('onItemSelect') //触发单选
  _onItemSelect = new EventEmitter();

  @Input()
  disabled:boolean;

  @Input()
  tempConfig:HyTransferTemp;

  ngOnInit(): void {
    if(this.tempConfig){
      if(this.tempConfig.tempType == 'table'){
        if(typeof(this.tempConfig.showHead) == 'undefined'){
          this.tempConfig.showHead = true;
        }
      }
    }
  }

  onItemSelect($event){
    this._onItemSelect.emit($event);
  }

  show:boolean = false;  //临时解决滚动列表，数据会移动的问题

  ngAfterViewInit(){
    if(this.tempConfig.scroll){
      setTimeout(() => {
        this.show = !this.show;
      }, 190);
    }else {
      this.show = true;
    }
  }


}
