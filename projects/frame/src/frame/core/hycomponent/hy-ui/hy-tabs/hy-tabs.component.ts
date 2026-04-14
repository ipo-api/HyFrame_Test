import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NzTabPosition, NzTabsCanDeactivateFn } from 'ng-zorro-antd/tabs';
import { filter } from 'rxjs/operators';
import { HyTabs } from './interface';
import { I18nService } from '../../../service/i18n.service';
import { $hyapi } from '../../../api/$hyapi';
import { HySize } from '../interface';

@Component({
  selector: 'hy-tabs',
  templateUrl: './hy-tabs.component.html',
  styleUrls: ['./hy-tabs.component.css'],
})
export class HyTabsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('hyTabsSpan') hyTabsSpan: QueryList<ElementRef<any>>;

  @ContentChild(TemplateRef, { static: true }) itemTemplate: TemplateRef<any>;

  /** 路由监听 */
  private navEnd: any;

  /**
   * 元数据，数组对象格式（双向绑定）
   * @required 
   */
  @Input() tabs: HyTabs[];

  /** 当前激活 tab 面板的序列号(双向绑定) */
  @Input() curActiveIndex: number = 0;

  /** 大小，提供 large|default| small 三种大小 */
  @Input() size: HySize = 'default';

  /** 页签的基本样式，可选 line、card 类型 */
  @Input() type: 'line' | 'card' | 'editable-card' = 'card';

  /** tabs 之间的间隙,number */
  @Input() tabBarGutter: number;

  /** 是否显示边框，默认不显示 */
  @Input() showLineBorder: boolean = false;

  /** 页签位置，可选值有top,right,bottom,left;left为纵向的tab页 */
  nzTabPosition: NzTabPosition = 'top';
  private _isVertical: boolean = false;

  /** 是否纵向显示 */
  @Input()
  set isVertical(value: boolean) {
    if (!value) {
      this.nzTabPosition = 'top';
    } else {
      this.nzTabPosition = 'left';
    }
    this._isVertical = value;
  }
  get isVertical(): boolean {
    return this._isVertical;
  }

  _itemUrl: any;

  /** 点击tab页回调事件（点击tab页不一定会跳转，但是一定会触发此事件。需要页签变动事件的，请使用：curActiveIndexChange()） */
  @Output('clickTab') clickTab = new EventEmitter();

  /** 点击tab上关闭按钮的回调事件（此方法仅触发事件，【并不会使tab页关闭】，如果需要关闭标签页的回调事件，请使用:tabsChange()。此方法仅适用于业务手动操纵tabs数据去关闭tab页 */
  @Output('closeTab') closeTab = new EventEmitter();

  /** 点击新增tab页，type类型需为‘editable-card’ */
  @Output('addTab') addTab = new EventEmitter();

  /** 下标变动回调事件 */
  @Output() curActiveIndexChange = new EventEmitter();

  /** 限制跳转的方法 */
  @Input() canDeactivate: NzTabsCanDeactivateFn;

  /** 缓存限制跳转的方法 */
  lastCanDeactivate;

  /** 操作面板模版 */
  @Input() operationTemplate: TemplateRef<void>;

  /** 是否显示关闭按钮 */
  @Input() isShowClose: boolean = false;

  /** 关闭页签提示,默认值：是否确认关闭当前页签？ */
  @Input() closeTip: string;

  /** 隐藏关闭页签提示 */
  @Input() noCloseTip: boolean = false;

  /** tabs数据变动事件（如：关闭页签，tabs数据减少一条便会触发） */
  @Output() tabsChange = new EventEmitter();

  /** 标签标题上是否有数字 */
  public isHavNadge:boolean = false;


  constructor(private router: Router, public i18nService: I18nService) { }

  ngOnInit() {
    if (this.itemTemplate) {
      if (this.curActiveIndex === undefined) {
        this.curActiveIndex = 0;
        this.curActiveIndexChange.emit(this.curActiveIndex);
      }
    } else {
      const url = this.router.url;
      let index = this.tabs.findIndex(item => url.indexOf(item.url) > -1);
      if (index > -1) {
        this.curActiveIndex = index;
      } else {
        index = 0;
      }
      this.selectedIndexChange(this.curActiveIndex);
    }
    this.isHavNadge = this.tabs.some(item => item.count);

    this.navEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      let url = (<NavigationEnd>event).url;
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].url && this.tabs[i].url.indexOf(url) !== -1) {
          this.curActiveIndex = i;
          this.curActiveIndexChange.emit(this.curActiveIndex);
          break;
        }
      }
    });
  }

  ngAfterViewInit() {
    // 当存在右键操作模板传入的时候，关闭当前标签页的右键属性功能
    if (this.hyTabsSpan && this.operationTemplate) {
      const hyTabsSpan = this.hyTabsSpan.toArray();
      hyTabsSpan.forEach(element => {
        element.nativeElement.oncontextmenu = () => { return false; };
      })
    }
  }


  /** 点击页签事件 */
  tabClick(item, index) {
    this.clickTab.emit({ index: index, item: item });
  }

  ngOnDestroy(): void {
    if (this.navEnd) {
      this.navEnd.unsubscribe();
    }
  }

  /** 右键点击事件 */
  contextmenu(item) {
    item['showPop'] = true;
    item['trigger'] = 'click';
  }

  /** 操作面板弹出变动事件 */
  visibleChange(e, item) {
    if (!e) {
      item['showPop'] = false;
      item['trigger'] = null;
    }
  }

  /** 点击操作面板 */
  clickOperation() {
    this.tabs.forEach(element => {
      element['showPop'] = false;
      element['trigger'] = null;
    });
  }

  /** 页签变动事件 */
  selectedIndexChange(index) {
    const item = this.tabs[index];
    this.curActiveIndex = index;
    this.curActiveIndexChange.emit(this.curActiveIndex);
    if (item?.url && item?.url.length > 0) {
      this._itemUrl = item.url;
      $hyapi.routeReuse.clearAndGoNextRouter(item.url);
    }
  }

  /** 关闭页签 */
  tabClose(item, index) {
    /** 判断外部是否有调用closeTab事件，有的话以外部调用事件为主 */
    if (this.closeTab.observers.length > 0) {
      this.closeTab.emit({ item, index });
      return;
    }
    /** 是否有限制跳转，有的话先把方法缓冲起来 */
    if (this.canDeactivate) {
      this.lastCanDeactivate = JSON.stringify(this.canDeactivate);
    }
    /** 点击关闭按钮的时候先把限制跳转设置为false */
    this.canDeactivate = () => {
      return false;
    }
    /** 点击关闭是否不提示信息 */
    if (!this.noCloseTip) {
      $hyapi.msg.confirm(this.closeTip || this.i18nService.getFrameI18n('hy-tabs.是否确认关闭当前页签？'), {
        callback: () => {
          this.tabs.splice(index, 1);
          this.tabsChange.emit(this.tabs);
          /** 重置是否允许跳转方法 */
          this.resetCanDeactivate();
        },
        cancel: () => {
          /** 重置是否允许跳转方法 */
          this.resetCanDeactivate();
        }
      })
    } else {
      this.tabs.splice(index, 1);
      this.tabsChange.emit(this.tabs);
      this.resetCanDeactivate();
    }
  }

  /** 重置是否允许跳转方法 */
  resetCanDeactivate() {
    if (this.lastCanDeactivate) {
      this.canDeactivate = JSON.parse(this.lastCanDeactivate);
    } else {
      this.canDeactivate = () => {
        return true;
      }
    }
  }

  addTabs() {
    this.addTab.emit();
  }
}
