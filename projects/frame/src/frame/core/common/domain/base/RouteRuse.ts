import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppGlobal } from '../../../../config/AppGlobal';
import { ReuseStrategyService } from '../../../service/reuseStrategy.service';

export abstract class RouteRuse {
  constructor(public router: Router) {
    //取消订阅
    if (AppGlobal.routerSubscribe) {
      AppGlobal.routerSubscribe.unsubscribe();
      AppGlobal.routerSubscribe = null;
    }
    AppGlobal.routerSubscribe = this.router.events
      .pipe(filter((event) => {
        return event instanceof NavigationEnd
      }))
      .subscribe((event) => {
        let url = event['url'].replace('/', '');
        if (url === 'login') {
          ReuseStrategyService.clearAllCache().then(()=>{
            AppGlobal.routerSubscribe.unsubscribe();
            AppGlobal.routerSubscribe = null;
          });
          return;
        }
        if (ReuseStrategyService.routeCache && ReuseStrategyService.routeCache.get(url)) {
          let component: any = ReuseStrategyService.routeCache.get(url);
          if (component && component.handle && component.handle.componentRef) {
            const instance = component.handle.componentRef.instance;
            if (instance.routeRuseInit) {
              instance.routeRuseInit();
            }
          }
        }
      });
  }
}

