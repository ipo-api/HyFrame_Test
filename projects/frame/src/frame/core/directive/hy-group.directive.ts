import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[hyGroupTh]'
})
export class HyGroupDirective implements OnInit {

  @Input() hyGroupTh: string;
  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.setAttribute('_hyGroupTh', this.hyGroupTh);
  }
}
