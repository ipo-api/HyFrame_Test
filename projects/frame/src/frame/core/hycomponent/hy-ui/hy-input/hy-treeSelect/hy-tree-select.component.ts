import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { HyBaseInput } from '../../../../common/domain/base/HyBaseInput';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { ModelService } from '../../../../common/domain/service/model.service';
import { DicService } from '../../../../service/dic.service';
import { FormBuilder } from '@angular/forms';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzTreeSelectComponent } from 'ng-zorro-antd/tree-select';
import { HyTreeSelectNode } from './interface';
import { HySize, HyTipType } from '../../interface';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';
import { I18nService } from '../../../../_index';

@Component({
  selector: 'hy-treeSelect',
  templateUrl: './hy-tree-select.component.html',
  styleUrls: ['./hy-tree-select.component.less'],
  host: {
    '[class.compoent-flex]': 'flex',
  }
})
export class HyTreeSelectComponent extends HyBaseInput implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  observer;
  open: boolean = false;
  gtEnableChangeFn: any;
  defaultExpandedKeys: string[];
  allowClear: boolean = true; //是否允许清除
  dropdownStyle: any = { maxHeight: '400px' }; //下拉菜单的样式,最大高度为400px，超过此高度出现滚动条
  searchValue: string;

  @ViewChild('treeSelect', { static: true }) treeSelectComponent: NzTreeSelectComponent;

  @ViewChild('treeSelect') treeSelect: TemplateRef<any>;

  /** 自定义图标模板 */
  @Input()
  nodeIconTemplate: TemplateRef<any>;

  /** 栅格布局1~24 */
  @Input()
  cols: number | string;

  /** 固定尺寸布局，单位px */
  @Input()
  flex: any;

  /** 标题 */
  @Input()
  title: string;

  /** modelName */
  @Input('model')
  modelName: string;

  /** 是否隐藏标题 */
  @Input()
  noLabel: boolean = false;

  /** 提示 */
  @Input() tip: string | TemplateRef<void>;

  /** tip提示的类型 */
  @Input()
  tipType: HyTipType = 'default';

  /** 标题宽度 */
  @Input()
  labelWidth: string;

  /** 标题超出长度时是否换行 */
  @Input()isLabelWrap:boolean;

  /** 是否隐藏冒号 */
  @Input()
  noColon: boolean = false; //冒号显示

  /** 指定展开第几级，默认展开三级 */
  @Input()
  expandLevel: number = 3;

  _datas: Array<HyTreeSelectNode> = [];
  /**
  * 元数据
  * @typedef Array<HyTreeSelectNode>
  */
  @Input() datas: Array<HyTreeSelectNode> = [];

  /** 虚拟滚动高度（要开启虚拟滚动请先设置此高度） */
  @Input() virtualHeight: string = null;

  /** 选择框大小 */
  @Input()
  size: HySize = 'default';

  /** 节点前添加 Checkbox 复选框 */
  @Input()
  checkable: boolean = false;

  /** 节点前添加展开图标 */
  @Input()
  showExpand: boolean = true;

  /** 是否展示连接线 */
  @Input()
  showLine: boolean = true;

  /** 默认展开所有树节点 */
  @Input()
  defaultExpandAll: boolean = false;

  /** 多选（当设置 checkable 时自动变为true） */
  @Input()
  multiple: boolean = false;

  /** 最多显示多少个tag */
  @Input()
  maxTagCount: number;

  /** 占位文字 */
  @Input() placeholder

  /** 是否使用搜索功能,默认可搜索 */
  @Input()
  showSearch: boolean = true;

  /** 是否自动设置叶节点（设置之后将隐藏叶节点前面的展开图标） */
  @Input()
  isAutoSetLeaf: boolean = false;

  /** checkable 状态下节点选择完全受控（父子节点选中状态不再关联） */
  @Input()
  checkStrictly: boolean = false;

  /** true允许输入，false不允许输入 */
  @Input() enable: boolean = true;

  _ckRequired: boolean = false;
  /** 必录校验 */
  @Input()
  public set ckRequired(value: boolean) {
    if (value !== this._ckRequired) {
      if (value === true) {
        this.addCheck('ckRequired', value);
      } else {
        this.removeCheck('ckRequired');
      }
    }
    this._ckRequired = value;
  }
  public get ckRequired(): boolean {
    return this._ckRequired;
  }

  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, public dicService: DicService, fb: FormBuilder, public validatorFnsService: ValidatorFnsService, public i18nService: I18nService) {
    super('treeSelect', formService, tableService, modelService, el, fb, validatorFnsService);
  }

  ngOnInit() {
    super.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['datas'] && changes['datas'].currentValue) {
      if (this.datas && this.datas.length > 0) {
        if (!this.defaultExpandAll) {
          setTimeout(() => {
            this.expandTreeNode();
          }, 10);
        }
        if (this.isAutoSetLeaf) {
          this.autoSetLeaf(this.datas);
        }
      }
    }
    if (changes && changes['expandLevel'] && changes['expandLevel'].currentValue !== null) {
      this.expandTreeNode();
    }
  }

  ngAfterViewInit() {
    const targetNode = this.treeSelect.elementRef.nativeElement;
    const config = { attributes: true };
    const callback = (mutationsList, observer) => {
      if (mutationsList && mutationsList.length > 0) {
        if (mutationsList[0].target.className.indexOf('ant-select-open') !== -1) {
          this.open = true;
        } else {
          this.open = false;
        }
      }
    };
    this.observer = new MutationObserver(callback);
    this.observer.observe(targetNode, config);
  }

  // 添加清除事件
  addClearAndRemoveClick() {
    setTimeout(() => {
      if (this.treeSelect && this.treeSelect.elementRef && this.treeSelect.elementRef.nativeElement) {
        const nativeElement = this.treeSelect.elementRef.nativeElement;
        const selectClears = nativeElement.getElementsByTagName('nz-select-clear');
        const selectRemove = nativeElement.getElementsByTagName('nz-select-item');
        if (selectClears && selectClears.length > 0) {
          (selectClears[0] as any).onclick = () => {
            this.onChange.emit(this.modelService[this.tableService.modelName][this.modelName]);
          };
        }
        if ((this.checkable || this.multiple) && selectRemove && selectRemove.length > 0) {
          for (let i = 0; i < selectRemove.length; i++) {
            (selectRemove as any)[i].getElementsByClassName('ant-select-selection-item-remove')[0].onclick = () => {
              this.onChange.emit(this.modelService[this.tableService.modelName][this.modelName]);
            };
          }
        }
      }
    }, 10);
  }

  ngOnDestroy(): void {
    super.destroy();
    this.observer.disconnect();
  }

  /** 输入框值变动事件 */
  searchValueChange(e) {
    this.searchValue = e.target.value || '';
  }

  private _firstChange: boolean = true; //解决第一次unidentified 是触发

  /** 值变动事件 */
  @Output('onChange_model')
  onChangeTree = new EventEmitter();

  /** 值变动事件（仅交互变动触发） */
  @Output('onChange')
  onChange = new EventEmitter();
  onModelChange(event: any) {
    if (!this._firstChange || (event && this._firstChange)) {
      if (this.open) {
        this.onChange.emit(event);
      }
      this.onChangeTree.emit(event);
      this.modelService[this.tableService.modelName][this.modelName] = event;
      super.onModelChange(event);
    }
    this._firstChange = false;

    this.addClearAndRemoveClick();
  }

  /** 点击展开树节点图标触发 */
  @Output('expandChange')
  expandChange = new EventEmitter();
  nzExpandChange(event: NzFormatEmitEvent) {
    this.expandChange.emit(event);
  }

  //获取组件 NzTreeNode 节点
  public getTreeNodes() {
    return this.treeSelectComponent.getTreeNodes();
  }

  //按 key 获取 NzTreeNode 节点
  public getTreeNodeByKey(key) {
    return this.treeSelectComponent.getTreeNodeByKey(key);
  }

  //获取组件 checkBox 被点击选中的节点
  public getCheckedNodeList() {
    return this.treeSelectComponent.getCheckedNodeList();
  }

  setData(data) {
    const fn = (item) => {
      item.forEach(element => {
        if (element.children) {
          fn(element.children);
        } else {
          element['isLeaf'] = true;
        }
      });
    }
    fn(data);
  }

  expandTreeNode() {
    const datas = this.getTreeNodes();
    if (datas && datas.length > 0) {
      const fn = (items: Array<HyTreeSelectNode>) => {
        for (let i = 0; i < items.length; i++) {
          if (items[i].origin.level <= this.expandLevel) {
            items[i].origin.expanded = true;
            items[i]['_isExpanded'] = true;
            if (items[i]._children && items[i]._children.length > 0) {
              fn(items[i]._children);
            }
          } else {
            items[i].origin.expanded = false;
            items[i]['_isExpanded'] = false;
          }
        }
      }
      fn(datas);
      this._datas = [...datas];
    }
  }

  nzOpenChange(e) {
    if(!e){
      this.expandTreeNode();
    }
    super.setCdkOverlayContainer(e);
  }

  // 自动设置节点图标
  autoSetLeaf(tree) {
    const fn = (items) => {
      items.forEach(element => {
        if (element.children && element.children.length > 0) {
          element.isLeaf = false;
          fn(element.children);
        } else {
          element.isLeaf = true;
        }
      });
    };
    fn(tree);
  }
}
