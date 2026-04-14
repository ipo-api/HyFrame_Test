import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[hyFlexBox]'
})
export class HyFlexBoxDirective implements OnInit {
  /** 布局模式，column纵向布局，row横向布局 */
  @Input() hyFlexBoxDirection: 'column' | 'row' = 'row';

  /** hyDirection='row'时，子元素【水平】对齐方式、hyDirection='column'时，子元素【垂直】对齐方式 */
  @Input() hyFlexBoxCenter: 'center' | 'space-between' | 'space-evenly' | 'space-around' | 'flex-end' | 'flex-start';

  /** hyDirection='row'时，子元素【垂直】对齐方式、hyDirection='column'时，子元素【水平】对齐方式 */
  @Input() hyFlexBoxAlignItems: 'center' | 'flex-end' | 'flex-start';

  /** 间隙，单位px */
  @Input() hyFlexBoxGap: string;

  private mutationObserver: MutationObserver;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.initFlex();
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        this.initFlex();
      });
    });
    this.mutationObserver.observe(this.el.nativeElement, {
      childList: true,
      subtree: true
    });
  }

  /** 初始化布局 */
  private initFlex() {
    const el = this.el.nativeElement;
    this.setStyle(el, 'display', 'flex');
    this.setStyle(el, 'flex-direction', this.hyFlexBoxDirection);
    if (this.hyFlexBoxDirection === 'column') {
      const hyHeight = this.el.nativeElement.getAttribute('hyHeight') || '100%';
      if(this.hyFlexBoxGap){
        this.setStyle(el, 'height', 'calc(' + hyHeight + ' + ' + this.hyFlexBoxGap + ')');
        this.setStyle(el, 'margin-bottom', '-' + this.hyFlexBoxGap);
        this.setStyle(el, 'overflow', 'auto');
      }else{
        this.setStyle(el, 'height', hyHeight);
      }
    } else {
      const hyWidth = this.el.nativeElement.getAttribute('hyWidth') || '100%';
      if (this.hyFlexBoxGap) {
        this.setStyle(el, 'width', 'calc(' + hyWidth + ' + ' + this.hyFlexBoxGap + ')');
        this.setStyle(el, 'margin-right', '-' + this.hyFlexBoxGap);
        this.setStyle(el, 'overflow', 'auto');
      } else {
        this.setStyle(el, 'width', hyWidth);
      }
    }

    if (this.hyFlexBoxCenter) {
      this.setStyle(el, 'justify-content', this.hyFlexBoxCenter);
    }

    if (this.hyFlexBoxAlignItems) {
      this.setStyle(el, 'align-items', this.hyFlexBoxAlignItems);
    }

    const nodes = this.el.nativeElement.childNodes as Array<Element>;
    nodes.forEach(element => {
      if (element?.getAttribute) {
        const flex = element.getAttribute('hyFlex');
        const width = element.getAttribute('hyWidth');
        const height = element.getAttribute('hyHeight');
        const right = element.getAttribute('hyRight');
        if (flex) {
          this.setStyle(element, 'flex', flex);
          this.setStyle(element, 'overflow', 'auto');
        }
        if (width) {
          this.setStyle(element, 'width', width);
        }
        if (height) {
          this.setStyle(element, 'height', height);
        }
        if (this.hyFlexBoxGap && this.hyFlexBoxDirection === 'row') {
          this.setStyle(element, 'margin-right', this.hyFlexBoxGap);
        }
        if (this.hyFlexBoxGap && this.hyFlexBoxDirection === 'column') {
          this.setStyle(element, 'margin-bottom', this.hyFlexBoxGap);
        }
        if (right !== null) {
          this.setStyle(element, 'flex', '1');
          this.setStyle(element, 'text-align', 'right');
          if (right) {
            this.setStyle(element, 'padding-right', right);
          }
        }
      }
    })
  }


  /** 设置样式 */
  private setStyle(el: Element, key: string, value: string) {
    const style: string = el.getAttribute('style');
    if (!style) {
      el.setAttribute('style', `${key}:${value || ''};`);
    } else {
      let isChangeValue: boolean = false;
      const styleList = style.split(';');
      styleList.forEach(element => {
        const styleName = element.split(':')[0];
        if (styleName === key) {
          element = styleName + ':' + value;
          isChangeValue = true;
        }
      })
      if (isChangeValue) return;
      const newStyle = style + `${key}:${value};`;
      el.setAttribute('style', newStyle);
    }
  }

}
