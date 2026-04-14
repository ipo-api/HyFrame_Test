import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { $hyapi } from '../api/$hyapi';
import { AppGlobal } from '../../config/AppGlobal';
import { ReuseStrategyService } from './reuseStrategy.service';
import { AclService } from '../service/acl.service';
import { I18nService } from './i18n.service';
let clearReuseTypeTime;
let clearAllCacheTime;

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private i18nService: I18nService,private aclService: AclService) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot) {
    if(!this.aclService.isAdmin){
      if (route.component && JSON.stringify(route.data) !== '{}' && route.data.FnId) {
        route.component['prototype']['FnId'] = route.data.FnId + '-';
        if(!this.aclService.getAcl(route.data.FnId)){
          $hyapi.msg.createTips('info', this.i18nService.getFrameI18n('hyAcl.没有页面权限'));
          return false;
        }
      }
    }

    // 如果去到非路由复用页面则全部清空
    clearTimeout(clearAllCacheTime);
    clearAllCacheTime = setTimeout(() => {
      if(!route.data.reuse){
        ReuseStrategyService.clearAllCache().then(()=>{
          if(AppGlobal.routerSubscribe){
            AppGlobal.routerSubscribe.unsubscribe();
          }
          clearTimeout(clearAllCacheTime);
          clearAllCacheTime = null;
        });
      }
    });

    if (route.data.reuse && AppGlobal.isGoReuse) {
      this.clearReuseType();
      return true;
    }else if(route.data.reuse){
      // if(route['_routerState'].url === AppConfig.routeReuseInitUrl){
      //   return true;
      // }
      // $hyapi.msg.createTips("info", "页面失效");
      setTimeout(() => {
        $hyapi.routeReuse.clearAndGoNextRouter(route.data.routeReuseInitUrl || AppGlobal.routeReuseInitUrl);
        this.clearReuseType();
      },300);
      return false;
    }else{
      this.clearReuseType();
      return true;
    }
  }

  clearReuseType() {
    clearTimeout(clearReuseTypeTime);
    clearReuseTypeTime = setTimeout(() => {
      AppGlobal.isGoReuse = false;
      clearTimeout(clearReuseTypeTime);
      clearReuseTypeTime = null;
    },100);
  }

}
