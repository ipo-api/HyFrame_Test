import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {$hyapi} from '../../../../api/$hyapi';
import {AppGlobal} from '../../../../../config/AppGlobal';
import {ReuseStrategyService} from '../../../../service/reuseStrategy.service';
import { I18nService } from '../../../../service/i18n.service';
@Component({
  selector: 'hy-breadcrumb',
  templateUrl: './hy-breadcrumb.component.html',
  styleUrls: ['./hy-breadcrumb.component.css']
})

export class HyBreadcrumbComponent implements OnInit  {

  @Input()
  mutiTitle: Array<any>; //元数据，数组对象格式

  @Input()
  nzSeparatorIcon:string='>';   // 分隔符号

  @Input()
  showReturnButton: boolean=false;

  @Input()
  useRouterCache:boolean = false; //是否与路由复用绑定

  @Output() clickBtnReturn = new EventEmitter<any>();

  constructor(public i18nService:I18nService) {

  }

  returnBack(){
    if(this.useRouterCache == false){
      this.clickBtnReturn.emit();
    }else {
      $hyapi.routeReuse.goBackPrevRouterLevel();
    }
  }


  routerLinkClick(route){
    if(this.useRouterCache == true){

      let length = this.mutiTitle.length;
      let index = this.mutiTitle.findIndex((element)=>(element.route == route));
      let level = length-1-index;
      if(level>0){
        $hyapi.routeReuse.goBackPrevRouterLevel(level);
      }
    }else {
      AppGlobal.router.navigate([route]);
    }
  }

  ngOnInit() {
    if (this.useRouterCache == true) {
      this.mutiTitle = [];
      let self = this;
      let routeCacheUrl:any;
      if(ReuseStrategyService.routeCacheList.length >0){
        let index = ReuseStrategyService.routeCacheList.length - 1;
        routeCacheUrl = ReuseStrategyService.routeCacheList[index].route;
      }

      ReuseStrategyService.routeCacheList.forEach((item)=>{
        self.mutiTitle.push({route:'/'+item.route,title:item.title});
      });

      //当前路由存在缓存list，面包屑数据可直接使用routeCacheList
      if(ReuseStrategyService.currBreadcrumbObject.route !== routeCacheUrl){
        let route = '/'+ReuseStrategyService.currBreadcrumbObject.route;
        let title = ReuseStrategyService.currBreadcrumbObject.title;
        self.mutiTitle.push({route,title})
      }

      if(self.mutiTitle.length > 1){
        self.showReturnButton = true;
      }
    }
  }

 
}
