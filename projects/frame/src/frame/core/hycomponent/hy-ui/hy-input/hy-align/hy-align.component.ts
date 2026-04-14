import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'hy-align',
  templateUrl: './hy-align.component.html',
  styleUrls: ['./hy-align.component.less'],
  host: {
    '[class.layout-class]': "type",
    '[style.display]' : "_display",
    '[style.height]' : "_height",
    '[style.overflow]' : "_overflow",
  },
})
export class HyAlignComponent implements OnInit, AfterViewInit, OnChanges {
  _time: any;
  _panelTime: any;
  _display:string;
  _height:string;
  _overflow:string;

  @ViewChild('leftDiv', { read: ElementRef }) leftDiv: any;
  leftDivWidth: string;

  @ViewChild('rightDiv', { read: ElementRef }) rightDiv: any;
  rightDivWidth: string;

  @ViewChild('layoutBox', { read: ElementRef }) layoutBox: any;

  /** 标题 */
  @Input() title: string;

  _boxHeight: string;

  _showBtnTop: string;

  _showLeft: boolean = true;

  observer: any;

  /** 显示左侧 */
  @Input() showLeft:boolean = true;

  /** 左侧面板隐藏或显示时触发 */
  @Output() showLeftChange = new EventEmitter();

  _showRight: boolean = true;
  /** 显示左侧 */
  @Input()
  public set showRight(value: boolean) {
    this.setWidth('right', value);
  }

  /** 右侧面板隐藏或显示时触发 */
  @Output() showRightChange = new EventEmitter();

  /** 类型 */
  @Input() type: 'layout' | null = null;

  _showLeftBtn: boolean = false;

  /** 显示左侧收起按钮 */
  @Input() showLeftBtn: boolean = false;

  _showRightBtn: boolean = false;

  /** 显示右侧收起按钮 */
  @Input() showRightBtn: boolean = false;

  /** 显示中间线条 */
  @Input() isShowMainBorder: boolean = false;

  /** 左侧宽度，单位% */
  @Input() leftWidth: string = '30%';

  /** layout模式下的自定义背景色 */
  @Input() background: string = '#fff';

  rightWidth: string = '70%';

  /** 左侧模板 */
  @Input() leftTemplate: TemplateRef<void>;

  /** 右侧模板 */
  @Input() rightTemplate: TemplateRef<void>;

  /** 是否占满高度,设置后hy-align标签高度将为100% */
  @Input() fullHeight: boolean = false;

  /** 是否显示组件外边框 */
  @Input() isShowAlignBorder: boolean = false;

  /** 间隔线宽度，默认0px */
  @Input() mainBorderWidth:string = '0px';

  /** 是否隐藏组件内部gl和glt的边框，一般配合isShowAlignBorder使用 */
  @Input() noGtAndGltBorder:boolean = false;

  _leftWidth = this.leftWidth;

  _rightWidth = this.rightWidth;

  constructor() { }

  ngOnInit(): void {
    if (this.leftWidth) {
      this.setWidth('left', this.showLeft);
    }
    if(this.type === 'layout' && this.fullHeight){
      this._display = 'block';
      this._height = '100%';
      this._overflow = 'hidden';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes) return;
    if(changes['showLeft'] && changes['showLeft'].currentValue !== undefined){
      this.setWidth('left', this.showLeft);
    }
    if(changes['showRight'] && changes['showRight'].currentValue !== undefined){
      this.setWidth('right', this.showRight);
    }
  }

  initAlign() {
    if (this.type === 'layout') {
      const clientHeight = this.layoutBox.nativeElement.clientHeight;
      if (clientHeight) {
        if (this.showLeftBtn) {
          this._showLeftBtn = true;
        }
        if (this.showRightBtn) {
          this._showRightBtn = true;
        }
      }
    }
  }

  ngAfterViewInit() {
    if (this.type === 'layout') {
      const targetNode = this.layoutBox.nativeElement;
      const config = { attributes: true, childList: true, subtree: true };
      const callback = (mutationsList, observer) => {
        clearTimeout(this._panelTime);
        this._panelTime = setTimeout(() => {
          this.initAlign();
          clearTimeout(this._panelTime);
        }, 100);
      };
      this.observer = new MutationObserver(callback);
      this.observer.observe(targetNode, config);
    }
  }


  setWidth(type, value) {
    if (value) {
      if (type === 'left') {
        this._showLeft = value;
      } else {
        this._showRight = value;
      }
      if (this.leftWidth.indexOf('px')) {
        this._rightWidth = 'calc(100% - ' + this.leftWidth + ' - '+this.mainBorderWidth+')';
      } else {
        this._rightWidth = (100 - parseInt(this.leftWidth.replace('%', ''))).toString() + '%';
      }
      this._leftWidth = this.leftWidth;
      setTimeout(() => {
        if (type === 'left') {
          this.showLeftChange.emit(this._showLeft);
        } else {
          this.showRightChange.emit(this._showRight);
        }
      }, 300);
    } else {
      this._leftWidth = type === 'left' ? '0%' : '100%';
      this._rightWidth = type === 'left' ? '100%' : '0%';
      clearTimeout(this._time);
      this._time = setTimeout(() => {
        if (type === 'left') {
          this._showLeft = value;
          this.showLeftChange.emit(this._showLeft);
        } else {
          this._showRight = value;
          this.showRightChange.emit(this._showRight);
        }
        clearTimeout(this._time);
        this._time = null;
      }, 300);
    }
    const e = document.createEvent('Event');
    e.initEvent('resize', true, true);
    window.dispatchEvent(e);
  }

  clickLeftBtn(value) {
    this.setWidth('left', value);
  }

  clickRightBtn(value) {
    this.setWidth('right', value);
  }

}
