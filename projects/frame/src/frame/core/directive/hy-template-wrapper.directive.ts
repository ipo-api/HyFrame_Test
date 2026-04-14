import {ViewContainerRef, TemplateRef, OnInit, Input, Directive, Output, EventEmitter, AfterViewInit, EmbeddedViewRef} from '@angular/core';
@Directive({
  selector: '[hyTemplateWrapper]',
})
export class HyTemplateWrapper implements OnInit, AfterViewInit {
  @Input() item: any;
  @Input() index: number;

  @Input('hyTemplateWrapper') templateRef: TemplateRef<any>;
  @Output() afterTemplateInit = new EventEmitter<any>();

  private view : EmbeddedViewRef<any>;

  constructor(public viewContainer: ViewContainerRef) {
  }
  
  ngAfterViewInit(): void {
    this.afterTemplateInit.emit(this.view);
  }

  ngOnInit() {
    this.view = this.viewContainer?.createEmbeddedView(this.templateRef, {
      item: this.item,
      index: this.index,
    });
    
  }
}
