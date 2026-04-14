import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppGlobal } from '../../config/AppGlobal';
import { ICachedRoute, IRouteConfigData } from './reuseStrategyInterface';

@Injectable()
export class ReuseStrategyService implements RouteReuseStrategy {
  public static routeCache = new Map<string, ICachedRoute>();
  static routeCacheList: any[] = [];
  public static currBreadcrumbObject: any = {}; //当前的路由信息

  /** 进入路由触发，判断是否是同一路由,future:将要进入的路由，curr：是当前准备跳转的路由 */
  public static currUrl: any = null;
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    ReuseStrategyService.currBreadcrumbObject = {};
    ReuseStrategyService.currUrl = future['_routerState'].url
    if(future['_routerState'].url.indexOf('/') === 0){
      ReuseStrategyService.currUrl = future['_routerState'].url.substring(1,future['_routerState'].length);
    }
    if (future.data && future.data.title) {
      ReuseStrategyService.currBreadcrumbObject = { route: future['_routerState'].url, title: future.data.title };
    }
    return future.routeConfig === curr.routeConfig;
  }


  /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断，这里判断是否有data数据判断是否复用 */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    let data = this.getRouteData(route); //{reuse: true}
    if(data && data.reuse == true && ReuseStrategyService.isStore == true) {
      return true;
    } else {
      return false;
    }
  }

  /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    let url = this.getFullRouteUrl(route);
    let data = this.getRouteData(route);
    if (data && data.reuse == true && ReuseStrategyService.isStore == true) {
      ReuseStrategyService.routeCache.set(url, { handle, data });
      //记录当前url,已经存在就不用push
      let hasUrl = ReuseStrategyService.routeCacheList.findIndex((element) => (element.route == url));
      if (hasUrl == -1) {
        ReuseStrategyService.routeCacheList.push({ route: url, title: data.title })
      }
    }
  }

  /** 若 path 在缓存中有的都认为允许还原路由 */
  shouldAttach(route: ActivatedRouteSnapshot): boolean { 
    let url = this.getFullRouteUrl(route);
    return ReuseStrategyService.routeCache.has(url);
  }


  /** 从缓存中获取快照，若无则返回nul */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    let url = this.getFullRouteUrl(route);
    return ReuseStrategyService.routeCache.has(url) ? ReuseStrategyService.routeCache.get(url).handle : null;
  }


  private getFullRouteUrl(route: ActivatedRouteSnapshot): string {
    return this.getFullRouteUrlPaths(route).filter(Boolean).join('/');
  }

  private getFullRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
    let paths = route.url.map(urlSegment => urlSegment.path);
    return route.parent ? [...this.getFullRouteUrlPaths(route.parent), ...paths] : paths;
  }

  public getRouteData(route: ActivatedRouteSnapshot): IRouteConfigData {
    if (route.routeConfig && route.routeConfig.data) {
      return route.routeConfig && route.routeConfig.data as IRouteConfigData
    }
  }

  //清除routeCache、routeCacheList，并且跳转到对应URL
  public static clearAndGoNextRouter(url: string): void {
    AppGlobal.isGoReuse = true;
    ReuseStrategyService.isStore = false;
    ReuseStrategyService.routeCache.forEach((element: any) => {
      element.handle.componentRef.destroy()
    });
    ReuseStrategyService.clearAllCache().then(()=>{
      ReuseStrategyService.routeCacheList = [];
      if (url && url.length > 0) {
        AppGlobal.router.navigate([url]);
      }
    });
  }

  // public static storeCache: boolean;  // 当前路由是否缓存
  //跳转到下一级路由
  public static goNextRouter(url: string) {
    AppGlobal.isGoReuse = true;
    ReuseStrategyService.isStore = true;
    AppGlobal.router.navigate([url]);
  }

  static isStore: boolean = true; //是否将当前路由存缓存里
  // 返回某个路由,upLevel指是否返回上一级路由，
  public static goBackPrevRouter(level?: number) {
    AppGlobal.isGoReuse = true;
    ReuseStrategyService.isStore = false;
    let returnIndex: number;
    let size = ReuseStrategyService.routeCacheList.length;
    //如果当前url在缓存里面需要清除routeCache、routeCacheList
    if (ReuseStrategyService.routeCache.has(ReuseStrategyService.currUrl)) {
      ReuseStrategyService.componentDestroy(ReuseStrategyService.currUrl);
    }

    if (level == undefined) {
      level = 1;
    }

    //判断当前url为routeCacheList的最后一条数据
    if (ReuseStrategyService.routeCacheList[size - 1].route == ReuseStrategyService.currUrl) {
      ReuseStrategyService.routeCacheList.splice(size - 1, 1);
      returnIndex = size - level - 1; //当前url被清除后，获取需要跳转到的url的下标
    } else {
      returnIndex = size - level; //当前url缓存里，获取需要调到到的url的下标
    }

    //删除routeCache当前url后面的缓存的url
    ReuseStrategyService.routeCacheList.forEach((item, index, arr) => {
      if (returnIndex < index) {
        ReuseStrategyService.componentDestroy(item.route);
      }
    });

    let url: string;
    if (ReuseStrategyService.routeCacheList[returnIndex]) {
      url = ReuseStrategyService.routeCacheList[returnIndex].route;
    }
    //删除routeCacheList当前url后面的缓存的url
    ReuseStrategyService.routeCacheList.splice(returnIndex + 1);
    //跳转到对应url
    AppGlobal.router.navigate(['/' + url]);
  }

  // 清除指定缓存，同时销毁指定组件
  static componentDestroy(url) {
    const componentRef = (ReuseStrategyService.routeCache.get(url).handle as any).componentRef;
    componentRef.destroy();
    ReuseStrategyService.routeCache.delete(url);
  }

  // 清除所有缓存，同时销毁所有组件
  static clearAllCache() {
    const fn = new Promise((resolve,reason)=>{
      ReuseStrategyService.routeCache.forEach(element=>{
        (element.handle as any).componentRef.destroy();
      });
      ReuseStrategyService.routeCache.clear();
      ReuseStrategyService.routeCacheList = [];
      resolve(null);
    });
    return fn;
  }


}








