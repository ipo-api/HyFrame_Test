import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ValidatorFnsService } from '../../../func/check/validator-fns.service';
import { FormBuilder } from '@angular/forms';
import { ModelService } from '../../../common/domain/service/model.service';
import { TableService } from '../../../common/domain/service/hytable.service';
import { HyFormService } from '../../../common/domain/service/hyform.service';
import { HyBaseInput } from '../../../common/domain/base/HyBaseInput';
import { HyTextComponent } from '../hy-input/hy-text/hy-text.component';
import { debounceTime } from 'rxjs/operators';
import { HyTextareaComponent } from '../hy-input/hy-textarea/hy-textarea.component';
import { HySelectComponent } from '../hy-input/hy-select/hy-select.component';
import { HyDateComponent } from '../hy-input/hy-date/hy-date.component';
import { HyNumberComponent } from '../hy-input/hy-number/hy-number.component';
import { HyTimeComponent } from '../hy-input/hy-time/hy-time.component';
import { HyTreeSelectComponent } from '../hy-input/hy-treeSelect/hy-tree-select.component';

@Component({
  selector: 'hy-group',
  templateUrl: './hy-group.component.html',
  styleUrls: ['./hy-group.component.less']
})
export class HyGroupComponent extends HyBaseInput implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('main') main: ElementRef;

  @ViewChild('mainHeader') mainHeader: ElementRef;

  /** 映射内容 */
  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

  /** 获取hy-text */
  @ContentChildren(HyTextComponent, { descendants: true }) public hyTextComponent!: QueryList<HyTextComponent>;

  /** 获取hy-text */
  @ContentChildren(HyTextareaComponent, { descendants: true }) public hyTextareaComponent!: QueryList<HyTextareaComponent>;

  /** 获取hy-select */
  @ContentChildren(HySelectComponent, { descendants: true }) public hySelectComponent!: QueryList<HySelectComponent>;

  /** 获取hy-date */
  @ContentChildren(HyDateComponent, { descendants: true }) public hyDateComponent!: QueryList<HyDateComponent>;

  /** 获取hy-number */
  @ContentChildren(HyNumberComponent, { descendants: true }) public hyNumberComponent!: QueryList<HyNumberComponent>;

  /** 获取hy-time */
  @ContentChildren(HyTimeComponent, { descendants: true }) public hyTimeComponent!: QueryList<HyTimeComponent>;

  /** 获取hy-treeSelect */
  @ContentChildren(HyTreeSelectComponent, { descendants: true }) public hyTreeSelectComponent!: QueryList<HyTreeSelectComponent>;

  @Input() flex: string;

  /** 栅格布局1~24 */
  @Input() cols: number | string;

  /** 标题 */
  @Input() title: string;

  /** modelName */
  @Input('model') modelName: string; //

  /** 是否隐藏标题 */
  @Input() noLabel: boolean = false;

  /** 标题长度，单位px */
  @Input() labelWidth: string = undefined;

  /** 标题超出长度时是否换行 */
  @Input() isLabelWrap: boolean;

  /** 是否隐藏冒号 */
  @Input() noColon: boolean = false;

  /** 必录校验 */
  @Input() ckRequired: boolean = false;

  /** 行标题，会自动在标题后面新增序号 */
  @Input() rowTitle: string;

  /** 最大行数 */
  @Input() maxRow: number = 100;

  /** 是否隐藏操作按钮 */
  @Input() noOperation: boolean = false;

  /** 数值变动回调 */
  @Output() onChange_model = new EventEmitter();

  /** 交互后的变动事件 */
  @Output() onChange = new EventEmitter();

  /** 列表 */
  public list: { index: number, model: string }[] = [];

  /** 数据 */
  private data = [];

  /** 记录模板是否初首次初始化，初始化完毕之后，才允许触发数据变动监听，默认为false */
  private isAfterTemplateInit: boolean = false;

  /** 锁定mds数据变动 */
  private isLockMdsDataChange: boolean = false;

  /** 头部 */
  public heads: any[] = [];

  constructor(public formService: HyFormService, public tableService: TableService, public el: ElementRef, public modelService: ModelService, public fb: FormBuilder, public validatorFnsService: ValidatorFnsService) {
    super('group', formService, tableService, modelService, el, fb, validatorFnsService);
  }


  /** 获取头部(如果子标签存在hyGroupTh属性，则获取头部) */
  private getHeads() {
    if(!this.list || this.list.length === 0) return;
    setTimeout(() => {
      this.heads = Array.from(this.main.nativeElement.children).map((item: any) => {
      return {
        th: item.getAttribute('_hyGroupTh'),
        cols: item.getAttribute('cols'),
        required: item.getAttribute('ng-reflect-ck-required') === 'true' && item.getAttribute('ng-reflect-is-show-no-label-required') === 'true'
      }
    })
    }, 100);
  }

  /** 模板初始化完毕后，获取头部 */
  public afterTemplateInit() {
    this.getHeads();
  }

  ngAfterViewInit(): void {
    this.initGroup();
    this.formService.formGroup.valueChanges.pipe(debounceTime(100)).subscribe(e => {
      if (this.isAfterTemplateInit) {
        this.setData(true);
      }
      this.isAfterTemplateInit = true;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) {
      if (changes['ckRequired']?.currentValue !== undefined) {
        if (this.ckRequired) {
          this.addCheck('ckRequired', true);
        } else {
          this.removeCheck('ckRequired');
        }
      }
    }
  }

  ngOnInit(): void {
    super.init();
  }

  /** 初始化定时器 */
  private lockMdsDataChangeTimer;

  private getModelName() {
    return '_' + this.modelName + '_group_';
  }

  /** 初始化 */
  public initGroup(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isLockMdsDataChange) {
        const data = this.modelService[this.tableService.modelName][this.modelName];
        if (!data || data.length === 0) {
          this.list = [{ index: 0, model: this.getModelName() + 0 }];
          reject();
        } else {
          this.isLockMdsDataChange = true;
          if (!data || data.length === 0) return;
          const list = [];
          data.forEach((element, index) => {
            const model = this.getModelName() + index;
            list.push({
              index,
              model
            })
            for (let key in element) {
              this.modelService[this.tableService.modelName][key + model] = element[key];
            }
          })
          this.list = list;
          clearTimeout(this.lockMdsDataChangeTimer);
          this.lockMdsDataChangeTimer = setTimeout(() => {
            this.isLockMdsDataChange = false;
            resolve(true);
          }, 200);
        }
      } else {
        reject();
      }
    });
  }

  /** mds值变动事件 */
  public mdsDataChange() {

  }

  /** 获取所有组件的model名字 */
  private getComponentModelName() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const hyTextList = this.hyTextComponent.toArray();
        const hySelectList = this.hySelectComponent.toArray();
        const hyDateList = this.hyDateComponent.toArray();
        const hyNumberList = this.hyNumberComponent.toArray();
        const hyTimeList = this.hyTimeComponent.toArray();
        const hyTreeSelectList = this.hyTreeSelectComponent.toArray();
        const hyTextareaList = this.hyTextareaComponent.toArray();
        const allComponentList = [...hyTextList, ...hySelectList, ...hyDateList, ...hyNumberList, ...hyTimeList, ...hyTreeSelectList, ...hyTextareaList];
        const componentModelName = [];
        allComponentList.forEach(element => {
          componentModelName.push(element.modelName);
        })
        resolve(componentModelName);
      }, 100);
    })
  }

  /** 添加行 */
  public addRow() {
    if (this.list.length >= this.maxRow) {
      return;
    }
    this.isLockMdsDataChange = true;
    const newIndex = Math.max(...this.list.map(obj => obj.index)) + 1;
    this.list.push({ index: newIndex, model: this.getModelName() + newIndex });
  }

  /** 删除行 */
  public removeRow(item) {
    this.isLockMdsDataChange = true;
    this.getComponentModelName().then((componentModelName: string[]) => {
      setTimeout(() => {
        componentModelName.forEach(element => {
          const start = element.indexOf(this.getModelName());
          const end = element.length;
          const index = parseInt(element.substring(start + this.getModelName().length, end));
          if (index === item.index) {
            delete this.modelService[this.tableService.modelName][element];
          }
        })
      }, 1);
      this.list = this.list.filter(litem => litem.index !== item.index);
      this.setData();
    })
  }

  private clearMdsData() {
    for (let key in this.modelService[this.tableService.modelName]) {
      if (key.includes(this.getModelName())) {
        delete this.modelService[this.tableService.modelName][key];
      }
    }
    this.modelService[this.tableService.modelName][this.modelName] = null;
  }

  /** 设置数据 */
  private setData(isCanOnChangeModel?: boolean) {
    this.getComponentModelName().then((componentModelName: string[]) => {
      let data = [];
      componentModelName.forEach((element) => {
        const start = element.indexOf(this.getModelName());
        const end = element.length;
        const modelName = element.substring(0, start);
        const index = parseInt(element.substring(start + this.getModelName().length, end));
        if (!data[index]) {
          data[index] = {
            [modelName]: this.modelService[this.tableService.modelName][element]
          }
        } else {
          data[index][modelName] = this.modelService[this.tableService.modelName][element];
        }
      })
      data = data.filter(item => !!item);
      // 数据没变化不触发onChange_model
      if (JSON.stringify(data) !== JSON.stringify(this.data)) {
        this._onModelChange(data, isCanOnChangeModel);
      }
    });
  }

  /** model变动事件 */
  private _onModelChange(data, isCanOnChangeModel?: boolean) {
    this.data = data;
    this.isLockMdsDataChange = true;
    super.onModelChange(data);
    if (isCanOnChangeModel ?? true) {
      this.onChange_model.emit(data);
    }
    setTimeout(() => {
      this.isLockMdsDataChange = false;
    }, 100);
  }

  ngOnDestroy() {
    this.clearMdsData();
  }
}
