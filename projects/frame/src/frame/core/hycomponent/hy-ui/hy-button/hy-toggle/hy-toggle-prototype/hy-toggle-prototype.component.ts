import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModelService } from '../../../../../common/domain/service/model.service';
import { DicService } from '../../../../../service/dic.service';
import { $hyapi } from '../../../../../api/$hyapi';
import { FormControl } from '@angular/forms';
import { NzSizeDSType } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'hy-toggle-prototype',
  templateUrl: './hy-toggle-prototype.component.html',
  styleUrls: ['./hy-toggle-prototype.component.css']
})
export class HyTogglePrototypeComponent implements OnInit, OnChanges {
  togglePrototypeformControl = new FormControl();

  _title: string = '';

  /** 为true的按钮名称 */
  checkedChildren: any;

  /** 为false的按钮名称 */
  unCheckedChildren: any;

  /** 与组件绑定的值 */
  _ngModel: boolean;

  /** 样式大小 */
  @Input() size: NzSizeDSType = 'default';

  /** 是否显示开关按钮文字 */
  @Input() showToggleText: boolean = false;

  /** 是否完全由用户修改状态 */
  @Input() control: boolean = false;

  /** 字典 */
  @Input('dic') dicName: string;

  /** 是否可点击，true可点击，false不可点击 */
  @Input() enable: boolean = true;

  /** 传入的值 */
  @Input() model: string | number;

  /** 值变动事件 */
  @Output() modelChange = new EventEmitter();

  /** 自定义数据 */
  @Input() items: Array<{ id: string; text: string | number }>;

  /** 点击回调事件 */
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  @Output() data: EventEmitter<any> = new EventEmitter();

  @Input() formControlValue: any;

  constructor(public modelService: ModelService, public dicService: DicService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['model'] && changes['model'].currentValue !== undefined) {
      this.initModel();
    }
    if (changes['items'] && changes['items'].currentValue !== undefined) {
      this.initModel();
    }
    if (changes['dicName'] && changes['dicName'].currentValue !== undefined) {
      this.initDic();
    }
  }

  /** 点击事件 */
  clickData() {
    if (this.enable === true) {
      if (this.items && this.items.length > 1) {
        if (!this.control) {
          if (this._ngModel) {
            this.unCheckedChildren = this.items[0].text; //不选中时的内容
            this.data.emit(this.items[0]['id']);
            this.onClick.emit(this.items[0]['id']);
            this.model = this.items[0]['id'];
            this.modelChange.emit(this.model);
          } else {
            this.checkedChildren = this.items[1].text; //选中时的内容
            this.data.emit(this.items[1]['id']);
            this.onClick.emit(this.items[1]['id']);
            this.model = this.items[1]['id'];
            this.modelChange.emit(this.model);
          }
        } else {
          this.onClick.emit();
        }
      }
      this.mouseTitle(this.showToggleText);
    }
  }

  //方法中参数showToggleText：是否显示开关按钮文字
  mouseTitle(showToggleText: boolean) {
    if (showToggleText == true) {
      this._title = '';
    } else {
      if (this.items && this.items.length > 0) {
        if (this._ngModel == true) {
          this._title = this.checkedChildren
        } else if (this._ngModel == false) {
          this._title = this.unCheckedChildren;
        }
      } else {
        this._title = '';
      }
    }
  }

  /** 初始化字典 */
  initDic() {
    this.dicService.getDic(this.dicName, (returnObj) => {
      this.items = returnObj;
      this.initModel();
    }, this.modelService)
  }

  /** 初始化model值 */
  initModel() {
    if (this.items && this.items.length > 1) {
      if (this.model) {
        if (this.model == this.items[0]['id']) {
          this._ngModel = false;
          this.unCheckedChildren = this.items[0].text; //不选中时的内容
        } else if (this.model == this.items[1]['id']) {
          this._ngModel = true;
          this.checkedChildren = this.items[1].text; //选中时的内容
        }
      } else {
        this._ngModel = false;
        this.unCheckedChildren = this.items[0].text; //不选中时的内容
        this.data.emit(this.items[0]['id']);
      }
    }
    this.mouseTitle(this.showToggleText);
  }
}
