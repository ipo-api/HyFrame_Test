import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'hy-flex',
  templateUrl: './hy-flex.component.html',
  styleUrls: ['./hy-flex.component.less']
})
export class HyFlexComponent implements OnInit, AfterViewInit, OnDestroy {
  id: string = null;

  timeOut;

  observer;

  @ViewChild('content') content: TemplateRef<any>;
  
  @ViewChild('main') main: TemplateRef<any>;

  height: string;

  @Input() cols: number | string;

  /** 布局方向 */
  @Input() direction: 'column' | 'row' = 'row';

  // @Input() 暂不提供换行布局
  wrap: boolean = false;

  /** 是否显示背景 */
  @Input() showBg: boolean = false;

  // @Input() 暂不提供内边距
  showPadding: boolean = false;

  /** 是否自动布局 */
  @Input() autoLayout: boolean = true;

  /** 最小宽度 */
  @Input() minWidth: string = null;

  // @Input() 暂不提供内边距
  showTopPadding: boolean = false;

  /** 显示顶部内边距 */
  @Input() showBottomPadding: boolean = false;

  /** 显示左侧内边距 */
  @Input() showLeftPadding: boolean = false;

  /** 显示右侧内边距 */
  @Input() showRightPadding: boolean = false;

  /** 显示底部内边距 */
  @Input() showBottomMargin: boolean = false;

  /** 显示顶部外边距 */
  @Input() showTopMargin: boolean = false;

  constructor() { }

  ngAfterViewInit() {
    this.initFlex();
    const targetNode = this.content['nativeElement'];
    const config = { childList: true };
    const callback = (mutationsList?, observer?) => {
      this.initFlex();
    };
    this.observer = new MutationObserver(callback);
    this.observer.observe(targetNode, config);
  }

  initFlex() {
    const childNodes = this.content['nativeElement']['childNodes'];
    if (childNodes && childNodes.length > 0) {
      childNodes.forEach((element) => {
        if (!element) return;
        try {
          this.setMinWidth(element);
          this.setFlex(element);
          this.setAutoLayout(element);
          this.setHyGlt(element);
        } catch { }
      });
    }
  }

  ngOnInit(): void {
    let stamp = new Date().getTime();
    this.id = 'hy-flex-' + (((1 + Math.random()) * stamp) | 0).toString(16);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  setFlex(element) {
    const flex = element.getAttribute('flex') || 1;
    const width = element.getAttribute('width') || null;
    if (width) {
      element.style.width = width;
    } else {
      element.style.flex = flex;
      element.style.overflow = 'hidden';
    }
  }

  setMinWidth(element) {
    if (this.minWidth) {
      let minWidth = this.minWidth;
      if (this.autoLayout) {
        minWidth = 'calc(' + this.minWidth + ' - 16px)';
      }
      element.style.minWidth = minWidth;
    }
    let minWidth = element.getAttribute('minWidth');
    if (minWidth) {
      if (this.autoLayout) {
        minWidth = 'calc(' + minWidth + ' - 16px)';
      }
      element.style.minWidth = minWidth;
    }
  }

  setAutoLayout(element) {
    if (this.autoLayout) {
      element.style.marginRight = '16px';
      element.style.marginBottom = '16px';
      this.height = ((this.main as any).nativeElement.clientHeight - 16).toString() + 'px';
    }
  }

  setHyGlt(element) {
    // 特殊处理hy-glt
    if (element.tagName === 'HY-GLT') {
      const hyGlt = element.getElementsByClassName('hy-table-class')[0];
      hyGlt.style.marginTop = '0px';
    }
  }

}
