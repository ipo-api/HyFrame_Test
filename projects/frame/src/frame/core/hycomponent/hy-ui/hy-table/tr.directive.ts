import {AfterContentInit, Directive, ElementRef, OnDestroy, Renderer2} from '@angular/core';

declare let $: any;
@Directive({
  selector: 'tr.hyGltTr',
})
export class HyGltTrDirective implements AfterContentInit {
  constructor(public el: ElementRef) {}

  ngAfterContentInit(): void {
    try{
      if($){
        $(this.el.nativeElement).find('td.ant-table-cell-fix-left').first().removeClass('ant-table-cell-fix-left-last');
        $(this.el.nativeElement).find('td.ant-table-cell-fix-left').last().addClass('ant-table-cell-fix-left-last');
        $(this.el.nativeElement).find('td.ant-table-cell-fix-right').first().addClass('ant-table-cell-fix-right-first');
      }
    }catch{

    }
    
  }
}
