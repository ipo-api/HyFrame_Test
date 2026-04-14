import { Component, OnInit, Input, TemplateRef, ContentChild, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { BaseCell } from '../../../../common/domain/base/BaseCell';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { ModelService } from '../../../../common/domain/service/model.service';
import { $hyapi } from '../../../../api/$hyapi';
import { DicService } from '../../../../service/dic.service';
import { HyCellBackgroundColor, HyCellFilterType, HyCellTextClass, HyCellType } from './interface';

@Component({
  selector: 'hy-cell',
  templateUrl: 'hy-cell.component.html',
  styleUrls: ['hy-cell.component.css'],

})
export class HyCellComponent extends BaseCell implements OnInit {

  @ContentChild(TemplateRef, { static: true }) itemTemplate: TemplateRef<any>;

  time;

  filterDicValue: any = []; //字典过滤值

  /** 
   * 类型
   * 'button'已弃用，请使用'template'替代
   */
  @Input() type: HyCellType;

  /** 字典值 */
  @Input() dic: string;

  /** 列头名称 */
  @Input() title: string;

  /** modelName */
  @Input('model') modelName: string;

  /** 当前这一行的数据 */
  @Input() item: Object;

  /** 当前这一行的下标 */
  @Input() index: number = 0;

  /** 宽度，单位px｜% */
  @Input() width: string;

  selectCellText: string;

  timestamp: any;

  /** type类型为link时的点击事件 */
  @Output() textClick = new EventEmitter<any>();

  /** 自定义样式 */
  @Input() textStyle: object;

  /** 内容颜色class */
  @Input() textClass: HyCellTextClass;

  /** 是否显示排序 */
  @Input() showSort: boolean;

  private _nzLeft: boolean = false;

  private _nzRight: boolean = false;

  /** 左侧距离，用于固定左侧列 */
  @Input()
  set nzLeft(value: string | boolean) {
    this._nzLeft = value !== undefined && value !== false;
  }
  get nzLeft(): string | boolean {
    return this._nzLeft;
  }

  /** 右侧距离，用于固定右侧列 */
  @Input()
  set nzRight(value: string | boolean) {
    this._nzRight = value !== undefined && value !== false;
  }
  get nzRight(): string | boolean {
    return this._nzRight;
  }

  /** th过滤类型，inputFilter（搜索框过滤），dicFilter（选择字典项过滤） */
  @Input() filterType: HyCellFilterType; //

  /** 过滤的字典名称 */
  @Input() filterDicName: string;

  /** th字典项过滤，是否为多选过滤器默认为true */
  @Input() filterMultiple: boolean = true;

  /** th搜索框的placeholder属性 */
  @Input() placeholder: string;

  /** 展示多选字典数据时的分隔符，可任意输入如‘|’，‘-’等字符去做间隔 */
  @Input() separator: string;

  /** 用于替换组件内部的排序方法 */
  @Input() sortFn: (sort?: string, modelName?: string) => void;

  /** 设置背景色 */
  @Input() backgroundColor: HyCellBackgroundColor = null;

  /** 过滤器内容选择的确定按钮回调 */
  @Output() filterChangeOk = new EventEmitter<any>();

  /** 过滤器内容选择的取消按钮回调 */
  @Output() filterChangeReset = new EventEmitter<any>();

  /** 排序变动事件，如果在标签中使用了此事件，则不会执行glt内部的排序事件 */
  @Output() onSortChange = new EventEmitter();

  /** 是否映射完毕 */
  private isAfterContentInit: boolean = false;

  /** 列头下标 */
  public headIndex: number = -1;

  /** 是否为左侧最后一列 */
  public isLastLeft: boolean = false;

  /** 是否为右侧第一列 */
  public isFirstRight: boolean = false;

  constructor(public tableService: TableService, modelService: ModelService, public dicService: DicService, private el: ElementRef) {
    super(tableService, modelService);
    this.timestamp = new Date().getTime();
  }

  ngOnInit() {
    // this.setNzLeftAndRight();
    super.init();
    if (this.type === 'select') {
      let val = this.item[this.modelName];
      Object.defineProperty(this.item, this.modelName, {
        configurable: true,
        enumerable: true,
        get: () => {
          return val;
          //注意这里不能写成return obj.name.toUpperCase();会造成死循环无限执行getter造成泄漏
        },
        set: (newVal) => {
          if (val === newVal) {
            return;
          } else {
            val = newVal;
            this.selectCellText = $hyapi.dic.getDicTextFromCache(this.dic, val, this.modelService, this.separator);
          }
        },
      });

      $hyapi.dic.get(this.dic, this.modelService, {
        callback: (dics: any) => {
          if (this.item) {
            this.selectCellText = $hyapi.dic.getDicTextFromCache(this.dic, this.item[this.modelName], this.modelService, this.separator);
          }
        },
      });
    }

    if (this.filterDicName) {
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        const item = this.tableService.heads.find(item => item.content === this.title);
        if (item?.filterDicValue.length > 0) return;
        $hyapi.dic.get(this.filterDicName, this.modelService, {
          callback: (value) => {
            if (value && value.length > 0) {
              const filterDicValue = [];
              for (let v of value) {
                let obj = Object.assign({ value: v.id }, v);
                filterDicValue.push(obj);
              }
              const item = this.tableService.heads.find(item => item.content === this.title);
              if (item) {
                item.filterDicValue = filterDicValue;
              }
            }
          },
        });
        clearTimeout(this.time);
        this.time = null;
      }, 200)
    }
  }

  ngAfterContentInit() {
    this.isAfterContentInit = true;

  }

  public onFilterChangeOk(value) {
    this.filterChangeOk.emit(value);
  }

  public onFilterChangeReset(value) {
    this.filterChangeReset.emit(value);
  }

  public onFilterChange(value) {
    if (value && value.length > 0) {
      this.filterChangeOk.emit(value)
    } else {
      this.filterChangeReset.emit();
    }
  }

  /** 设置nzLeft和nzRight */
  public setNzLeftAndRight() {
    this.initNzLeft();
    this.initNzRight();
    const index = this.tableService.heads.findIndex(item => item.content === this.title);
    if(index == -1) {
      return;
    }
    this.tableService.heads[index].hyRight = this.hyRight;
    this.tableService.heads[index].hyLeft = this.hyLeft;
    this.tableService.heads[index].isLastLeft = this.isLastLeft;
    this.tableService.heads[index].isFirstRight = this.isFirstRight;
  }

  /** 初始化nzLeft */
  private initNzLeft() {
    if (this.hyLeft) {
      const element = this.el.nativeElement;
      const parentElement = element.parentElement;
      parentElement.setAttribute('ng-reflect-nz-left', this.hyLeft);
      parentElement.style.left = this.hyLeft;
      parentElement.classList.add('ant-table-cell-fix-left');
      if(this.isLastLeft){
        parentElement.classList.add('ant-table-cell-fix-left-last');
      }
    }
  }

  /** 初始化nzRight */
  private async initNzRight() {
    if (this.hyRight) {
      const element = this.el.nativeElement;
      const parentElement = element.parentElement;
      parentElement.setAttribute('ng-reflect-nz-right', this.hyRight);
      parentElement.style.right = this.hyRight;
      parentElement.classList.add('ant-table-cell-fix-right');
      if(this.isFirstRight){
        parentElement.classList.add('ant-table-cell-fix-right-first');
      }
    }
  }

  public textClickFn() {
    this.textClick.emit(this.item);
  }

}
