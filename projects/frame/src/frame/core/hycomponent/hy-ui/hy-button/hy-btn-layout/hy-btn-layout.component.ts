import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import {TableService} from '../../../../common/domain/service/hytable.service';
import {ModelService} from '../../../../common/domain/service/model.service';

@Component({
  selector: 'hy-btn-layout',
  templateUrl: './hy-btn-layout.component.html',
  styleUrls: ['./hy-btn-layout.component.css'],
  providers: [TableService],
})
export class HyBtnlayoutComponent implements OnInit,AfterViewInit {
  flexSubstrPx:number; //width截取px
  offsetSubstrPx:number; //offset截取px
  contentWidth:number;

  @Input()
  cols: number | string;

  @Input()
  align: string = 'right'; //对齐方式，可选参数值left（左对齐） ,right(右对齐),默认right

  @Input()
  model: string; //需要做布局的按钮对应的gt的modelName

  @Input()
  set flex(value: any) {  //flex宽度
    if(typeof value == 'string' && value && value.length>0) {
      this.flexSubstrPx = parseInt(value.substring(0, value.length - 2));
    }
  }

  @Input()
  set offset(value: string) {  //偏移量,可理解为lableWidth的宽度
    if(value && value.length>0){
      this.offsetSubstrPx = parseInt(value.substr(0,value.length-2));
    }
  }

  constructor( public tableService: TableService, public modelService: ModelService) {}

  showTip:boolean;

  ngOnInit(): void {}

  ngAfterViewInit(){
    let _gtFlexSubstrPx:number;
    let _gtOffsetSubstrPx:number;

    //业务传值offset和flex时
    if(this.flexSubstrPx && this.offsetSubstrPx){
      this.contentWidth = this.flexSubstrPx + this.offsetSubstrPx+12;
      return;
    }

    if(this.model){
      let tableObject = this.modelService.tableServiceMap['gt_'+this.model];

      // tip提示
      if(typeof(tableObject?.showTip) != 'undefined'){
        this.showTip = tableObject.showTip;
      }

      // 栅格布局
      if(typeof this.cols == 'undefined'){
        if(tableObject?.cols){
          this.cols = tableObject.cols;
          return;
        }
      }

      // flex值
      if(tableObject?.flex && tableObject.flex.length>0){
        let _flex = tableObject.flex;
        if(_flex && _flex.length>0){
          _gtFlexSubstrPx = parseInt(_flex.substr(0,_flex.length-2));
        }
      }
      //offset值
      if(tableObject?.labelWidth && tableObject.labelWidth.length>0){
        let _lableWidth = tableObject.labelWidth;
        if(_lableWidth && _lableWidth.length>0){
          _gtOffsetSubstrPx = parseInt(_lableWidth.substr(0,_lableWidth.length-2));
        }
      }

      // 业务传值offset时
      if(this.offsetSubstrPx){
        this.contentWidth = this.offsetSubstrPx + _gtFlexSubstrPx+ 12;
        return;
      }

      // 业务传值flex时
      if(this.flexSubstrPx){
        this.contentWidth = _gtOffsetSubstrPx + this.flexSubstrPx + 12;
        return;
      }

      //业务不传offset、flex
      if( typeof this.flexSubstrPx == 'undefined' && typeof this.offsetSubstrPx == 'undefined'){
        this.contentWidth = _gtOffsetSubstrPx + _gtFlexSubstrPx + 12;
      }
    }
  }
}

