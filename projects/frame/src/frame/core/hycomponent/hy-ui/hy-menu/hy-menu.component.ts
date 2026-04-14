import { Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { $hyapi } from '../../../api/$hyapi';
declare let $: any;
@Component({
  selector: 'hy-menu',
  templateUrl: './hy-menu.component.html',
  styleUrls: ['./hy-menu.component.css'],
})
export class HyMenuComponent implements OnInit {
  mode = false;
  dark = false;
  hover: boolean = false;

  @Input()
  menuDatas: Array<Object>;

  @Input()
  inlineCollapsed: boolean;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.autoOpenMenuByRouter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    if (changes['menuDatas'] && changes['menuDatas'].currentValue !== undefined) {
      this.autoOpenMenuByRouter();
    }
  }

  /** 根据路由自动打开左侧菜单 */
  autoOpenMenuByRouter() {
    const nowUrl = window.location.hash.replace('#', '');
    let parent;
    const fn = (menu) => {
      menu.forEach(element => {
        if (element.url) {
          if (nowUrl.indexOf(element.url) > -1) {
            const tempUrl = nowUrl.replace(element.url, '');
            if (!parent) return;
            if (tempUrl) {
              if (tempUrl.substring(0, 1) === '/' || tempUrl.substring(0, 1) === '?') {
                parent['open'] = true;
              } else {
                parent['open'] = false;
              }
            } else {
              parent['open'] = true;
            }
          }
        }
        if (element.children && element.children.length > 0) {
          parent = element;
          fn(element.children);
        }else{
          parent = null;
        }
      })
    }
    if (this.menuDatas) {
      fn(this.menuDatas);
    }
  }

  menuMouseenter() {
    this.hover = true;
  }

  menuMouseleave() {
    this.hover = false;
  }

  clickMenu(url) {
    $hyapi.routeReuse.clearAndGoNextRouter(url);
    $hyapi.globalEvents.menuClick();
  }

  openMenu(menu) {
    this.menuDatas.forEach(element => {
      element['open'] = false;
    })
  }
}
