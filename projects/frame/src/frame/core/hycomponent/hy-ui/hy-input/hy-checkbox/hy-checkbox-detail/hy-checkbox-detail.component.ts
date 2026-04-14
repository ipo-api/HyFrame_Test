import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DicService } from '../../../../../service/dic.service';
import { HyFormService } from '../../../../../common/domain/service/hyform.service';
import { I18nService } from '../../../../../service/i18n.service';

@Component({
  selector: 'hy-checkbox-detail',
  templateUrl: './hy-checkbox-detail.component.html',
  styleUrls: ['./hy-checkbox-detail.component.less'],
})
export class HyCheckboxDetailComponent {
  formService: HyFormService;

  public SPIT = '|';

  checkedAll: boolean = false;

  indeterminate: boolean = false;

  @Output()
  public data: EventEmitter<any> = new EventEmitter();

  @Output() clickAllCheck: EventEmitter<any> = new EventEmitter();

  @Output()
  public clickOneCheck: EventEmitter<any> = new EventEmitter();

  @Input()
  showCheckAll: boolean = true; //是否显示全选

  @Input()
  flex: any; //nz-form-item是否Flex布局


  public _onelineWidth: any; //每个多选的宽度
  public _flexOnelineWidth: any = 'auto';
  @Input()
  set onelineNum(value: any) {
    if (typeof value == 'undefined') {
      this._onelineWidth = 25;
    } else {
      this._onelineWidth = 100 / value;
      this._flexOnelineWidth = value;
    }
  }

  @Input()
  tip: string;

  @Input()
  enable: boolean; //可显示

  private _checkboxObject: any = {};
  private prex = 'data_';
  _checkboxArray: Array<boolean>;

  _items: any;
  _realData: any = [];

  _enableAllow: any;
  @Input()
  set enableAllow(value: any) {
    if (value && value.length > 0) {
      this._enableAllow = '';
      for (let v of value) {
        this._enableAllow = this._enableAllow + this.SPIT + v;
      }
      this._enableAllow = this._enableAllow + this.SPIT;
    }
  }


  @Input()
  set items(value: any) {
    if (typeof value != 'undefined') {
      this._items = value;
      this._checkboxArray = [];

      this._checkboxObject = {};
      let i = 0;
      for (let o of value) {
        this._checkboxObject[this.prex + o.id] = i;
        this._checkboxArray[i] = false; //初始化不选中
        i++;
      }

      if (this._vaule) {
        this._realData = [];

        for (let str of this._vaule) {
          if (typeof this._checkboxObject[this.prex + str] != 'undefined') {
            this._checkboxArray[this._checkboxObject[this.prex + str]] = true;
            this._realData.push(this._items[this._checkboxObject[this.prex + str]]['id']);
          }
        }

        if (this._checkboxArray.every((item) => item === false)) {
          this.checkedAll = false;
          this.indeterminate = false;
        } else if (this._checkboxArray.every((item) => item === true)) {
          this.checkedAll = true;
          this.indeterminate = false;
        } else {
          this.indeterminate = true;
        }
      }
    }
  }

  private _vaule: any;

  @Input()
  public set model(value: any) {
    this._vaule = value;
    this._checkboxArray = [];
    this._realData = [];
    for (let i in this._items) {
      this._checkboxArray[i] = false;
    }

    if (value) {
      for (let str of value) {
        if (typeof this._checkboxObject[this.prex + str] != 'undefined') {
          this._checkboxArray[this._checkboxObject[this.prex + str]] = true;
          this._realData.push(this._items[this._checkboxObject[this.prex + str]]['id']);
        }
      }
    }

    if (this._checkboxArray.every((item) => item === false)) {
      this.checkedAll = false;
      this.indeterminate = false;
    } else if (this._checkboxArray.every((item) => item === true)) {
      this.checkedAll = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }

  }

  public get model(): any {
    return this._realData;
  }

  clickCheck(index) {
    this._checkboxArray[index] = !this._checkboxArray[index];

    if (this._checkboxArray[index]) {
      this._realData.push(this._items[index]['id']);
    } else {
      for (let i = 0; i < this._realData.length; i++) {
        if (this._realData[i] == this._items[index]['id']) {
          this._realData.splice(i, 1);
          break;
        }
      }
    }

    if (this._checkboxArray.every((item) => item === false)) {
      this.checkedAll = false;
      this.indeterminate = false;
    } else if (this._checkboxArray.every((item) => item === true)) {
      this.checkedAll = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }

    // 解决点击文字checkbox被选中，但是无法触发状态改变问题
    this.inPutFormControl.markAsDirty();

    this.data.next(this._realData);
    this.clickOneCheck.next({ dicIndex: index, check: this._checkboxArray[index], value: this._items[index]['id'] });
  }

  updateAllChecked(e) {
    // this.indeterminate = !this.indeterminate;
    // this.checkedAll =   !this.checkedAll;
    this.indeterminate = false;

    if (this.enable && !this._enableAllow) {
      return;
    }

    this._realData = [];
    for (let i in this._checkboxArray) {
      if (this._enableAllow) {
        // this._checkboxArray[i] = this.indeterminate;
        if (this._enableAllow.indexOf(this.SPIT + this._items[i]['id'] + this.SPIT) != -1) {
          this._checkboxArray[i] = this.checkedAll;
        }
        if (this._checkboxArray[i]) {
          this._realData.push(this._items[i]['id']);
        }
      } else {
        this._checkboxArray[i] = this.checkedAll;
        if (this._checkboxArray[i]) {
          this._realData.push(this._items[i]['id']);
        }
      }
    }

    // 解决点击文字checkbox被选中，但是无法触发状态改变问题
    this.inPutFormControl.markAsDirty();

    this.data.next(this._realData);
    this.clickAllCheck.emit(e);
  }

  /** 字符超出长度是否换行（false：不换行，true：换行，并出省略号 */
  @Input() isEllipsis:boolean = false;

  constructor(public dicService: DicService,public i18nService:I18nService) { }


  @Input()
  inPutFormControl: FormControl;
}
