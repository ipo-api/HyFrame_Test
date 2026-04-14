import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[hyFlex]'
})
export class HyFlexDirective implements AfterViewInit {
  @Input() hyFlex: number | string = '1';


  constructor(private el: ElementRef) {
  }
  
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.el.nativeElement.style.flex = this.hyFlex + '';
    this.el.nativeElement.style.overflow = 'auto';
  }
  

}
