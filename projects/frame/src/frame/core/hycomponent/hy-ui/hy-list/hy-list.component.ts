import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { HyListData } from './interface';

@Component({
  selector: 'hy-list',
  templateUrl: './hy-list.component.html',
  styleUrls: ['./hy-list.component.less']
})

export class HyListComponent implements OnInit {
  nowItem;

  /** 点击事件回调 */
  @Output()
  onClick: EventEmitter<any> = new EventEmitter();

  /** 顶部自定义面板 */
  @Input()
  topTemplate: TemplateRef<void>;

  /** 底部自定义面板 */
  @Input()
  bottomTemplate: TemplateRef<void>;

  /** 宽度，单位px|% */
  @Input()
  width: string;

  /** 数据 */
  @Input()
  data: HyListData[];

  /** 是否隐藏边框 */
  @Input()
  noBorder: boolean = false;

  /** 是否显示左边框 */
  @Input()
  leftBorder: boolean = false;

  /** 是否显示右边框 */
  @Input()
  rightBorder: boolean = false;

  /** 是否显示上边框 */
  @Input()
  topBorder: boolean = false;

  /** 是否显示下边框 */
  @Input()
  bottomBorder: boolean = false;

  /** 操作面板模版 */
  @Input()
  operationTemplate: TemplateRef<void>;

  constructor() {
  }

  ngOnInit(): void {
  }

  // 点击item
  clickItem(item) {
    this.setSelected(item);
    this.onClick.emit(item);
  }

  setSelected(item) {
    this.data.forEach(element => {
      element['isSelected'] = false;
    })
    item['isSelected'] = true;
  }

  visibleChange(item) {
    if (item && item.visible) {
      this.nowItem = item;
    } else {
      this.nowItem = null;
    }
  }
}
