import {NgModule} from '@angular/core';
import {BaseModule} from '../../base/base.module';
import {MainpageComponent} from './mainpage/mainpage/mainpage.component';
import {MainPageHeaderComponent} from './mainpage/header/header.component';
import {HeaderMenuComponent} from './mainpage/header-menu/header-menu.component';
import {OffClickDirective} from './mainpage/header/off-click';
// import {YwMainpageComponent} from "../../../app/modules/ywmainpage/mainpage/mainpage.component";
import {ScrollingModule} from '@angular/cdk/scrolling';
// import {YwMainpageComponent} from './mainpage/ywmainpage/mainpage.component';

@NgModule({
  imports: [BaseModule,ScrollingModule],
  declarations: [MainPageHeaderComponent, MainpageComponent, HeaderMenuComponent, OffClickDirective],
  exports: [MainPageHeaderComponent, MainpageComponent, HeaderMenuComponent, OffClickDirective],
})
export class MainpageModule {}
