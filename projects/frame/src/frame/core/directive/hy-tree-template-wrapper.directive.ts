import { ViewContainerRef, TemplateRef, OnInit, Input, Directive, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[hyTreeTemplateWrapper]',
})
export class HyTreeTemplateWrapper implements OnInit {
  timeOut;
  @Input() item: any;
  @Input() index: number;
  @Input('hyTreeTemplateWrapper') templateRef: TemplateRef<any>;

  constructor(public viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
    this.viewContainer?.createEmbeddedView(this.templateRef, {
      item: this.item,
      index: this.index,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['item'] && changes['item'].currentValue !== undefined) {
      this.viewContainer.clear();
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.viewContainer.clear();
        this.viewContainer?.createEmbeddedView(this.templateRef, {
          item: this.item,
          index: this.index,
        });
        clearTimeout(this.timeOut);
        this.timeOut = null;
      }, 10);
    }
  }
}
