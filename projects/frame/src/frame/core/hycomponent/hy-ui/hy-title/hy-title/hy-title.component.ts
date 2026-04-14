import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef} from '@angular/core';

@Component({
  selector: 'hy-title',
  templateUrl: './hy-title.component.html',
  styleUrls: ['./hy-title.component.less']
})
export class HyTitleComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnInit(): void {}

  _titleTemp: TemplateRef<void>;
  _titleString:string;
  /** 标题 */
  @Input() title:string | TemplateRef<void>;

  /** 提示 */
  @Input()
  tip: string;

  /** 可选参数"grayTitle",灰色背景标题 */
  @Input()
  class:'grayTitle';

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes) return;
    if(changes['title'] && changes['title'].currentValue !== undefined){
      if (typeof this.title === 'string') {
        this._titleString = this.title;
      }
      this._titleTemp = this.title as any;
    }
  }

}
