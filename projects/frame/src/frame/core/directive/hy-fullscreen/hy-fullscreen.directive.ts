import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[hyFullscreen]'
})
export class HyFullscreenDirective implements OnChanges {
  /** 全屏状态 */
  @Input() hyFullscreenValid: boolean = false;

  /** 全屏背景颜色 */
  @Input() hyFullscreenBackgroundColor: string = '#f0f2f5';

  /** 全屏状态变化 */
  @Output() hyFullscreenValidChange = new EventEmitter<boolean>();

  private document: HTMLElement;

  /** 元素背景颜色 */
  private elBackgroundColor: string = '';

  /** 头部元素 */
  private hyHeader: HTMLElement;

  /** 全屏监听事件 */
  private fullscreenchange = (ev) => {
    //退出了全屏
    if (document.fullscreenElement == null) {
      this.document.removeEventListener('fullscreenchange', this.fullscreenchange);
      this.el.nativeElement.classList.remove('hy-fullscreen');
      this.el.nativeElement.style.backgroundColor = this.elBackgroundColor;
      this.hyFullscreenValid = false;
      this.hyFullscreenValidChange.emit(this.hyFullscreenValid);
      if (this.hyHeader) {
        this.hyHeader.style.zIndex = '2';
      }
    }
    else {
      this.hyFullscreenValid = true;
      this.hyFullscreenValidChange.emit(this.hyFullscreenValid);
    }
  }

  constructor(private el: ElementRef) {
    this.document = document.body;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['hyFullscreenValid'] && changes['hyFullscreenValid'].currentValue !== undefined && !changes['hyFullscreenValid'].firstChange) {
      this.setFullscreen(this.hyFullscreenValid);
    }
  }

  /** 
   * 设置全屏
   * @param fullscreen 是否全屏
   */
  private setFullscreen(fullscreen: boolean) {
    if (fullscreen) {
      this.el.nativeElement.classList.add('hy-fullscreen');
      this.elBackgroundColor = this.el.nativeElement.style.backgroundColor || 'unset';
      this.el.nativeElement.style.backgroundColor = this.hyFullscreenBackgroundColor;
      // 特殊处理头部层级
      this.hyHeader = this.document.getElementsByTagName('hy-header')[0] as HTMLElement;
      if (this.hyHeader) {
        this.hyHeader.style.zIndex = '1';
      }
      this.document.requestFullscreen();
      this.document.addEventListener('fullscreenchange', this.fullscreenchange);
    }else{
      document.exitFullscreen();
    }
  }
}
