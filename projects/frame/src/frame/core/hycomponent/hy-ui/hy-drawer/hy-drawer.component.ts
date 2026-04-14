import { Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { HyDrawerOptions } from './interface';

@Component({
  selector: 'hy-drawer',
  templateUrl: './hy-drawer.component.html',
  styleUrls: ['./hy-drawer.component.css'],
  providers: [NzDrawerService]
})
export class HyDrawerComponent implements OnDestroy {
  constructor(public drawerService: NzDrawerService) { }

  @ContentChild(TemplateRef)
  contentTemplate: TemplateRef<any>;

  /** 抽屉底部模板 */
  @Input()
  footerTemplate: TemplateRef<void>; //

  /** 标题 */
  @Input()
  title: any;

  /** 宽度 */
  @Input()
  width: string | number = '800px';

  /** 是否显示右上角的关闭按钮 */
  @Input()
  closable: boolean = false;

  /** 点击蒙层是否允许关闭 */
  @Input()
  maskClosable: boolean = true;

  /** 是否展示遮罩,默认展示遮罩 */
  @Input()
  mask: boolean = true;

  /** 点击蒙层、右上角x、调用close方法，以上三种方式关闭抽屉之后的回调，此方法在抽屉完全关闭后触发，不会瞬间触发，推荐使用此方法 */
  @Output()
  afterCloseCallback: EventEmitter<any> = new EventEmitter();

  /** 点击蒙层、右上角X，关闭抽屉的方法 */
  @Output()
  onClickClose: EventEmitter<any> = new EventEmitter();

  drawerRef: any;
  @ViewChild('draweTemp') draweTemp: TemplateRef<any>;


  drawerOptions: any = {};

  //显示抽屉
  public open(drawerOptions?: HyDrawerOptions) {
    // 用于修复阿里bug，将传入的百分比宽度转换为像素宽度
    if (drawerOptions && drawerOptions.width) {
      if (typeof drawerOptions.width === 'number') {
        drawerOptions.width = drawerOptions.width + 'px';
      }
      if (drawerOptions.width.indexOf('%') > -1) {
        const index = drawerOptions.width.indexOf('%');
        drawerOptions.width = parseInt(drawerOptions.width.substring(0, index)) / 100 * document.body.offsetWidth + 'px';
      }
    }

    drawerOptions = drawerOptions || {};
    this.drawerOptions = drawerOptions;

    let closable: boolean = typeof (drawerOptions.closable) == 'undefined' ? this.closable : drawerOptions.closable;
    let mask: boolean = typeof (drawerOptions.mask) == 'undefined' ? this.mask : drawerOptions.mask;
    let maskClosable: boolean = typeof (drawerOptions.maskClosable) == 'undefined' ? this.maskClosable : drawerOptions.maskClosable;

    this.drawerRef = this.drawerService.create({
      nzTitle: this.filterSpecialCharacters(drawerOptions.title || this.title),
      nzContent: this.draweTemp,
      nzWidth: drawerOptions.width || this.width,
      nzClosable: closable, //	是否显示右上角的关闭按钮.默认显示
      nzMask: mask,
      nzMaskClosable: maskClosable, //点击蒙层是否允许关闭，
      nzBodyStyle: { 'padding': '0px', 'overflow': 'hidden', 'height': '100%' },
    });

    this.drawerRef.afterClose.subscribe(() => {
      if (drawerOptions.afterCloseCallback) {
        drawerOptions.afterCloseCallback();
      } else {
        this.afterCloseCallback.next();
      }
    });

    this.drawerRef.nzOnClose.subscribe(() => {
      if (drawerOptions.onClickClose) {
        drawerOptions.onClickClose();
      } else {
        this.onClickClose.next();
      }
    });
  }

  //关闭抽屉
  public close() {
    if (this.drawerRef) {
      this.drawerRef.close();
    }
  }

  /** 过滤特殊字符 */
  private filterSpecialCharacters(value: string | TemplateRef<any>): any {
    let newValue;
    if(typeof value === 'string'){
      newValue = value.replace(/</g, '&lt;');
      newValue = newValue.replace(/>/g, '&gt;');
    }else{
      newValue = value;
    }
    return newValue;
  }

  ngOnDestroy() {
    if (this.drawerRef) {
      this.drawerRef.close();
    }
  }

}


