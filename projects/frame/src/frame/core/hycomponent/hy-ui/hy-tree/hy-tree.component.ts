import { Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd/tree';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzTreeNodeKey } from 'ng-zorro-antd/core/tree';
import { HyTreeNode } from './interface';
import { AppGlobal } from '../../../../config/AppGlobal';
import { I18nService } from '../../../_index';

@Component({
  selector: 'hy-tree',
  templateUrl: './hy-tree.component.html',
  styleUrls: ['./hy-tree.component.css']
})
export class HyTreeComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('hyTreeBox', { read: ElementRef }) hyTreeBox: any;

  @ViewChild('treeSearch', { read: ElementRef }) treeSearch: any;

  @ViewChild('nzTreeComponent', { static: true }) nzTreeComponent: NzTreeComponent;

  @ContentChild(TemplateRef, { static: true }) itemTemplate: TemplateRef<any>;

  /** 原来的父级样式 */
  private parentStyle: string;

  /** 指当前选中的节点的信息 */
  private nodeValue: any;

  /** 搜索输入框内容 */
  public searchValue: string = '';

  /** 展开的节点 */
  public _nzExpandedKeys: NzTreeNodeKey[];

  /** 树组件高度 */
  public _boxHeight: string;

  /** 树组件内容高度 */
  public _treeBoxHeight: string;

  /** setActiveNodes的防抖 */
  private setActiveNodesTimeout;

  /** 所见数据数组，树类型转数组类型 */
  public panelDataList = [];

  /** 是否按下了shift */
  public isDownShift: boolean = false;

  /** shift多选模式下，shift的起点 */
  public shiftStartActiveNode: { panelIndex: number, key: string } = { panelIndex: -1, key: null };

  /** 自定义过滤条件 */
  public searchFunc = (node) => {
    if (this.searchValue) {
      if (node.title.toUpperCase().indexOf(this.searchValue.toUpperCase()) > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  /** 是否自动设置叶节点（设置之后将隐藏叶节点前面的展开图标） */
  @Input() isAutoSetLeaf: boolean = false;

  /** 自定义图标模板 */
  @Input() nodeIconTemplate: TemplateRef<any>;

  /** 指定展开第几级，默认展开三级，如果设置为-1，展开方式会根据传入数据的expanded字段决定 */
  @Input() expandLevel: number = 3;

  /** 数据 */
  public _datas: Array<HyTreeNode>;;

  /** 数据 */
  @Input() datas: HyTreeNode[];

  /** 节点前添加 Checkbox 复选框 */
  @Input() checkable: boolean = false;

  /** 节点前添加展开图标 */
  @Input() showExpand: boolean = true;

  /** 是否展示连接线 */
  @Input() showLine: boolean = true;

  /** 是否支持多选 */
  public _multiple: boolean = false;

  /** 支持点选多个节点（节点本身）,为true时，按住ctrl键选中节点，即可多选（mac需按住comm键） */
  @Input() multiple: boolean = false;

  /** 默认展开所有树节点 */
  @Input() expandAll: boolean = false;

  /** 指定选中复选框的树节点 */
  @Input() checkedKeys: NzTreeNodeKey[] = [];

  /** 是否显示搜索框 */
  @Input() search: boolean = false;

  /** 显示内边距 */
  @Input() showPadding: boolean = false;

  /** 是否占满高度 */
  @Input() fullHeight: boolean = false;

  /** 选中的节点 */
  public _activeNode: Array<any> = [];

  /** 指定选中某个节点，传id(可双向绑定) */
  @Input() activeNode: string;

  /** 选中指定某个节点，双向绑定 */
  @Output() public activeNodeChange = new EventEmitter();

  /** 指定选中多个节点，可传入[id,id2,...]双向绑定 */
  @Input() activeNodes: Array<string> = [];

  @Output() public activeNodesChange = new EventEmitter();

  /** 搜索框占位字符 */
  @Input() treeSearchPlaceholder: string;

  /** checkable 状态下节点选择完全受控（父子节点选中状态不再关联） */
  @Input() checkStrictly: boolean = false;

  /** 虚拟滚动高度（要开启虚拟滚动请先设置此高度） */
  @Input() virtualHeight: string = null;

  /** 点击树节点触发的回调事件 */
  @Output('onNodeClick') public hy_Click = new EventEmitter();

  /** 鼠标按下事件 */
  private keydown = (e) => {
    this.setMultiple(e.key, 'down');
  }

  /** 鼠标抬起事件 */
  private keyup = (e) => {
    this.setMultiple(e.key, 'up');
  }

  /** 监听页面是否被切走 */
  private visibilitychange = () => {
    this._multiple = false;
  }

  /** 虚拟滚动模式下，右键弹出菜单在滚动后消失 */
  private scrollFn = () => {
    if (this.nodeValue) {
      this.nodeValue.visible = false
    }
  }


  /** 父元素列表 */
  private parentList: any[] = [];

  constructor(private nzContextMenuService: NzContextMenuService, public i18nService: I18nService, private el: ElementRef) {
    this.el = el.nativeElement;
  }

  setMultiple(keyboardKey: string, type: 'up' | 'down') {
    const ControlKey = AppGlobal.system === 'Mac' ? 'Meta' : 'Control';
    if (ControlKey === keyboardKey || 'Shift' === keyboardKey) {
      if (type === 'up') {
        this._multiple = false;
        if ('Shift' === keyboardKey) {
          this.isDownShift = false
        }
      }
      if (type === 'down') {
        this._multiple = true;
        if ('Shift' === keyboardKey) {
          this.isDownShift = true
        }
      }
    }
  }

  hyTreeNodeClick(event: NzFormatEmitEvent) {
    if (event.node.isDisabled) return;
    this.hy_Click.emit(event);
    if (!this._multiple) {   // 单选模式下
      let isCanChangeActiveNode: boolean = true;
      if (this._activeNode.length === 1 && this._activeNode[0] === event.node.key) {
        isCanChangeActiveNode = false;
      }
      this._activeNode = [event.node.key];
      this.activeNodes = this._activeNode;
      this.shiftStartActiveNode.panelIndex = this.panelDataList.findIndex(item => item === event.node.key);
      this.shiftStartActiveNode.key = this.panelDataList[this.shiftStartActiveNode.panelIndex];
      if (isCanChangeActiveNode) {
        this.activeNodeChange.emit(event.node.key);
        this.activeNodesChange.emit(this.activeNodes);
      }
    } else { // 多选模式下
      const lastActiveNodes = JSON.stringify(this.activeNodes);
      if (this.isDownShift) { // shift多选模式
        const index = this.activeNodes.indexOf(event.node.key);
        if (index > -1 && this.shiftStartActiveNode.key === event.node.key) {
          this.activeNodes = [event.node.key];
          this._activeNode = this.activeNodes;
          return;
        } else {
          this.activeNodes.push(event.node.key);
        }
        if (this.shiftStartActiveNode['panelIndex'] === -1) {
          this.shiftStartActiveNode.key = this.activeNodes[0];
          this.shiftStartActiveNode.panelIndex = this.panelDataList.findIndex(item => item === this.activeNodes[0]);
        }
        const thisIndex = this.panelDataList.indexOf(event.node.key);
        if (this.activeNodes.length > 1) {
          const endIndex = this.shiftStartActiveNode.panelIndex;
          if (thisIndex - endIndex > 0) { // 向下选
            this._activeNode = this.panelDataList.slice(endIndex, thisIndex + 1);
          } else if (thisIndex - endIndex < 0) { // 向上选
            this._activeNode = this.panelDataList.slice(thisIndex, endIndex + 1);
          }
        }
        if (this._activeNode.length > 0) {
          this.activeNodes = this._activeNode;
        }
      } else { // ctrl多选模式
        if (this._activeNode.length > 0) {
          this.activeNodes = this._activeNode;
        }
        const index = this.activeNodes.indexOf(event.node.key);
        if (index > -1) {
          this.activeNodes.splice(index, 1);
        } else {
          this.activeNodes.push(event.node.key);
        }
        this.shiftStartActiveNode.key = this.activeNodes[this.activeNodes.length - 1];
        this.shiftStartActiveNode.panelIndex = this.panelDataList.findIndex(item => item === this.shiftStartActiveNode.key);
      }
      if (lastActiveNodes !== JSON.stringify(this.activeNodes)) {
        this.activeNodesChange.emit(this.activeNodes);
      }
    }
  }

  /** 双击树节点回调事件 */
  @Output('onNodeDbClick') public hy_DbClick = new EventEmitter()
  public hyTreeNodeDbClick(event: NzFormatEmitEvent) {
    this.hy_DbClick.emit(event);
  }

  /** 点击展开树节点图标回调事件 */
  @Output('onExpandChange')
  public expandChange = new EventEmitter();
  nzExpandChange(event: NzFormatEmitEvent) {
    setTimeout(() => {
      this.setPanelDataList();
    }, 100);
    this.expandChange.emit(event);
  }

  /** 修改所看到的数据数组 */
  setPanelDataList() {
    this.panelDataList = [];
    const datas = this.getzTree();
    if (datas && datas.length > 0) {
      const pushFn = (node) => {
        const index = this.panelDataList.findIndex(item => item.key === node.key);
        if (index === -1) {
          this.panelDataList.push(node.key);
        };
      };
      const fn = (items: Array<HyTreeNode>) => {
        for (let i = 0; i < items.length; i++) {
          pushFn(items[i]);
          if (items[i].isExpanded && items[i]._children.length > 0) {
            fn(items[i]._children);
          }
        }
      }
      fn(datas);
    }
    this.panelDataList = [...new Set(this.panelDataList)];
  }

  /** 点击树节点 Checkbox 回调事件 */
  @Output('onCheckBoxChange')
  public checkBoxChange = new EventEmitter();
  nzCheckBoxChange(event: NzFormatEmitEvent) {
    this.checkBoxChange.emit(event);
  }

  /** 鼠标右键弹窗事件 */
  public contextMenu($event: MouseEvent, nodeValue, menu: NzDropdownMenuComponent): void {
    if (nodeValue.isDisabled) return;
    if (this.activeNodes.length > 1) {
      const index = this.activeNodes.findIndex(item => item === nodeValue.key);
      if (index === -1) {
        this._activeNode = [nodeValue.key];
        this.activeNodes = [nodeValue.key];
        this.activeNodeChange.emit(nodeValue.key);
        this.activeNodesChange.emit(this.activeNodes);
      }
    } else {
      let isCanChangeActiveNode: boolean = true;
      if (this._activeNode.length === 1 && this._activeNode[0] === nodeValue.key) {
        isCanChangeActiveNode = false;
      }
      this._activeNode = [nodeValue.key]; //右击也高亮
      this.activeNodes = [nodeValue.key];
      if (isCanChangeActiveNode) {
        this.activeNodeChange.emit(nodeValue.key);
        this.activeNodesChange.emit(this.activeNodes);
      }
    }
    this.nodeValue = nodeValue;
    if (menu && this.itemTemplate) {
      nodeValue['visible'] = true;
      nodeValue['trigger'] = 'click';
      this.setCdkOverlayContainer(true);
      this.setTreeScroll(true);
    }
  }

  /** 下拉菜单变化 */
  public dropdownChange(node) {
    node['trigger'] = null;
    this.setCdkOverlayContainer(false);
  }

  /** 外部调用，获取当前tree数据 */
  public getzTree(): any {
    return this.nzTreeComponent.getTreeNodes();
  }

  /** 外部调用，按 key 获取 NzTreeNode 节点 */
  public getTreeNodeByKey(key: any) {
    return this.nzTreeComponent.getTreeNodeByKey(key);
  }

  /** 外部调用，获取组件 checkBox 被点击选中的节点 */
  public getCheckedNodeList(): NzTreeNode[] {
    return this.nzTreeComponent.getCheckedNodeList();
  }

  /** 外部调用，获取组件被选中的节点 */
  public getSelectedNodeList(): NzTreeNode[] {
    return this.nzTreeComponent.getSelectedNodeList();
  }

  /** 外部调用，获取组件展开状态节点 */
  public getExpandedNodeList(): NzTreeNode[] {
    return this.nzTreeComponent.getExpandedNodeList();
  }

  /** 外部调用，关闭操作面板 */
  public closeDropDown() {
    return this.nzContextMenuService.close();
  }

  /** 新增node */
  public addTreeNode(key: string, node: HyTreeNode, index?: number) {
    const treeNode = this.getTreeNodeByKey(key);
    // treeNode.addChildren() 会影响到传进来的node数据，所以在此先string，保证后面拿到的是正确的数据
    const nodeString = JSON.stringify(node);
    treeNode.setExpanded(true);
    treeNode.isLeaf = false;
    node['expanded'] = false;
    node['isLeaf'] = true;
    treeNode.addChildren([node], index);
    const newNode = JSON.parse(nodeString);
    treeNode.children[index !== undefined ? index : treeNode.children.length - 1].origin['level'] = newNode['level'] ?? null;
  }

  /** 删除node */
  public removeTreeNode(key: string) {
    const treeNode = this.getTreeNodeByKey(key);
    treeNode.remove();
  }

  /** 展开层数 */
  private expandNode() {
    this.panelDataList = [];
    const datas = this.datas;
    if (datas && datas.length > 0) {
      const pushFn = (node) => {
        const index = this.panelDataList.findIndex(item => item.key === node.key);
        if (index === -1) {
          this.panelDataList.push(node.key);
        };
      };
      const fn = (items: Array<HyTreeNode>) => {
        for (let i = 0; i < items.length; i++) {
          if (items[i].level <= this.expandLevel - 1) {
            items[i].expanded = true;
            pushFn(items[i]);
            if (items[i].children && items[i].children.length > 0) {
              fn(items[i].children);
            }
          } else {
            items[i].expanded = false;
          }
          pushFn(items[i]);
        }
      }
      if (this.expandLevel > -1) {
        fn(datas);
      }
      this._datas = [...datas];
    }
    this.panelDataList = [...new Set(this.panelDataList)];
  }

  /** 自动设置节点图标 */
  private autoSetLeaf(tree) {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['datas'] && changes['datas'].currentValue) {
      if (this.datas && this.datas.length > 0) {
        if (!this.expandAll) {
          setTimeout(() => {
            this.expandNode();
          }, 10);
        }
        if (this.isAutoSetLeaf) {
          this.autoSetLeaf(this.datas);
        }
        this.setActiveNodes();
      }
      this.setActiveNodes();
    }
    if (changes && changes['activeNode']) {
      this.setActiveNodes();
    }
    if (changes && changes['expandLevel'] && changes['expandLevel'].currentValue !== null) {
      this.expandNode();
    }
    if (changes && changes['activeNodes'] && changes['activeNodes'].currentValue !== undefined) {
      this._activeNode = this.activeNodes;
    }
    if (changes && changes['multiple'] && changes['multiple'].currentValue !== undefined) {
      if (this.multiple === true) {
        window.removeEventListener('keydown', this.keydown);
        window.removeEventListener('keyup', this.keyup);
        window.removeEventListener('visibilitychange', this.visibilitychange);
        window.addEventListener('visibilitychange', this.visibilitychange);
        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);
      } else {
        window.removeEventListener('keydown', this.keydown);
        window.removeEventListener('keyup', this.keyup);
        window.removeEventListener('visibilitychange', this.visibilitychange);
      }
    }
  }

  /** 设置默认选中项 */
  public setActiveNodes() {
    clearTimeout(this.setActiveNodesTimeout);
    this.setActiveNodesTimeout = setTimeout(() => {
      if (this.multiple) {
        this._activeNode = this.activeNodes && this.activeNodes.length > 0 ? [...this.activeNodes] : [];
      } else {
        this._activeNode = this.activeNode ? [this.activeNode] : [];
      }
      this.shiftStartActiveNode = { panelIndex: -1, key: null };
      // 初始化this.shiftStartActiveNode
      if (this._activeNode.length > 0) {
        this.shiftStartActiveNode.key = this._activeNode[0];
        this.shiftStartActiveNode.panelIndex = this.panelDataList.indexOf(this.shiftStartActiveNode.key);
      }
      clearTimeout(this.setActiveNodesTimeout);
    }, 10);
  }

  ngOnInit(): void {
    if (this.multiple) {
      window.addEventListener('keydown', this.keydown);
      window.addEventListener('keyup', this.keyup);
      window.addEventListener('visibilitychange', this.visibilitychange);
    }
    if (!this.fullHeight) return;
    setTimeout(() => {
      this.getBoxHeight();
    }, 100);
  }

  /** 获取当前高度，只有fullHeight为true时进入 */
  private getBoxHeight() {
    const bodyHeight = document.body.clientHeight;
    const boxTop = this.hyTreeBox.nativeElement.getBoundingClientRect().top;
    const boxHeight = bodyHeight - boxTop - 16;
    this._boxHeight = boxHeight.toString() + 'px';
    let _treeBoxHeight = boxHeight;
    if (this.treeSearch) {
      _treeBoxHeight -= this.treeSearch.nativeElement.offsetHeight;
    }
    if (this.showPadding) {
      _treeBoxHeight -= 16;
    }
    this._treeBoxHeight = _treeBoxHeight.toString() + 'px';
  }

  /** 设置cdkOverlayContainer */
  public setCdkOverlayContainer(e) {
    if (e) {
      const innerContentDiv = document.getElementsByClassName('inner-content')[0] as any;
      if (!innerContentDiv) return;
      innerContentDiv.style.height = 'unset';
      this.findScrollableParentAndSet(this.el, e);
    } else {
      const innerContentDiv = document.getElementsByClassName('inner-content')[0] as any;
      if (!innerContentDiv) return;
      innerContentDiv.style.height = '100%';
      this.parentList.forEach(element => {
        element.parent.style.overflowY = element.overflowY;
        element.parent.style.marginRight = element.marginRight;
      })
      this.parentList = [];
    }
  }

  /** 获取父级滚动的元素 */
  private findScrollableParentAndSet(element, flag?: boolean) {
    let parent = element.parentElement;
    this.parentList = [];
    // 向上查找至html元素
    while (parent !== document.documentElement) {
      if (parent) {
        if (parent.scrollHeight !== parent.clientHeight && parent.clientHeight > 0) {
          // 发现滚动条时返回该元素
          if (flag) {
            const scrollbarWidth = parent.offsetWidth - parent.clientWidth;
            this.parentList.push({
              parent,
              overflowY: parent.style.overflowY,
              marginRight: parent.style.marginRight
            });
            parent.style.marginRight = scrollbarWidth + 'px';
            parent.style.overflowY = 'hidden';
          }
        }
        parent = parent.parentElement;
      } else {
        return null;
      }
    }
    // 找不到滚动条时返回null
    return null;
  }

  /** 设置虚拟滚动的滚筒条 */
  public setTreeScroll(e) {
    const panel = document.getElementsByTagName('cdk-virtual-scroll-viewport')[0] as any;
    if (panel) {
      if (e) {
        panel.style.overflowY = 'hidden';
      } else {
        panel.style.overflowY = 'auto';
      }
    }
  }

  /** 点击菜单 */
  public clickMenu(node) {
    node['visible'] = false;
    node['trigger'] = null;
    this.setCdkOverlayContainer(false);
    this.setTreeScroll(false);
  }

  ngOnDestroy(): void {
    if (this.multiple) {
      window.removeEventListener('keydown', this.keydown);
      window.removeEventListener('keyup', this.keyup);
      window.addEventListener('visibilitychange', this.visibilitychange);
    }
  }

}
