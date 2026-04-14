import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'hy-comm-label',
  templateUrl: './hy-comm-label.component.html',
  styleUrls: ['./hy-comm-label.component.less']
})
export class HyCommLabelComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('textSpan', { read: ElementRef }) textSpan: any;

  /** 定时器变量 */
  _time;

  /** 标题宽度 */
  @Input()labelWidth: string;

  /** 是否隐藏冒号 */
  @Input()noColon: boolean = false;

  /** 是否隐藏标题 */
  @Input()noLabel: boolean = false;

  /** 是否必填 */
  @Input()ckRequired: boolean = false;

  /** 标题 */
  @Input() title: string;

  /** 标题是否换行 */
  @Input() isWrap:boolean = false;

  /** 是否触发气泡提示 */
  isShowLabelTooltip: boolean = false;

  /** 记录最大长度 */
  maxWidth: string = null;

  private timeout1: any;

  private timeout2: any;

  uuid: string;

  public style: any = {};

  constructor() {
    this.uuid = this.getUuid();
  }


  ngOnInit(): void {
    if(this.noLabel){
      if(this.ckRequired){
        this.style = {
          'width': '8px',
          'height': '32px'
        }
      }else{
        this.style = {
          'width': '0px',
          'margin-right':'0px',
        }
      }
    }else{
      this.style = {
        'width': this.labelWidth || '120px'
      }
    }
  }

  ngAfterViewInit(): void {
    if(this.isWrap) return;
    this.setLabelView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['title'] && changes['title'].currentValue !== undefined) {
      this.setLabelView();
    }
    if (changes['ckRequired'] && changes['ckRequired'].currentValue !== undefined) {
      this.setLabelView();
    }
  }

  getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  setLabelView() {
    if (!this.noLabel) {
      let num = 0;
      const fn = () => {
        const hyLabelSpan = document.getElementById('label'+this.uuid);
        if (hyLabelSpan) {
          let labelWidth = Math.ceil(parseInt(this.labelWidth.substring(0, this.labelWidth.indexOf('px'))) - 14);
          // 减去必录的误差
          if (this.ckRequired) {
            labelWidth = labelWidth - 6.85;
          }
          if (hyLabelSpan.offsetWidth === 0) {
            this.timeout2 = setTimeout(() => {
              if (num > 10) {
                // console.error('label初始化失败');
              } else {
                num++;
                fn();
              }
            }, 1000);
          } else {
            if (hyLabelSpan.offsetWidth > labelWidth) {
              this.isShowLabelTooltip = true;
            } else {
              this.isShowLabelTooltip = false;
            }
          }
        }
      }
      clearTimeout(this.timeout1);
      this.timeout1 = setTimeout(() => {
        fn();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
  }
}
