import { NavigationEnd, Router } from '@angular/router';
import { OnDestroy } from '@angular/core';
import { ReuseStrategyService } from '../../../service/reuseStrategy.service';

let _self;

export abstract class RouteRuse {
  static routerSubscribes = new Map();
  // static routerSubscribe: any;
  static url: any;
  _this;
  routerSubscribe;

  constructor(public router: Router) {
    _self = this;
    this._this = this;
    let testurl = router.url;


    //表示当导航成功结束时触发的事件,每次路由跳转都会激活
    this.routerSubscribe = this.router.events.subscribe((event: NavigationEnd) => {

      // 这里需要判断一下当前路由，如果不加的话，每次路由结束的时候都会执行这里的方法
      if (event instanceof NavigationEnd) { //导航结束时触发
        console.log('...ing')
        
        // console.log('testurl',testurl)
        // console.log('event.url',event.url)
        // console.log('ReuseStrategyService.routeCacheList',ReuseStrategyService.routeCacheList)
        const index = ReuseStrategyService.routeCacheList.findIndex(item => item.route === testurl.replace('/', ''));
      
        if (testurl === event.url) {
          console.log(index)
          RouteRuse.url = event.url;
          RouteRuse.routerSubscribes.set(event.url, this.routerSubscribe);
          if(index > -1){
            console.log(this)
            this.routeRuseInit();
          }
        }else if(index === -1){
          this.routerSubscribe.unsubscribe();
        }
      }
    })
  }

  public abstract routeRuseInit();


}