import {NgModule,} from "@angular/core";
import { CommonModule, registerLocaleData } from '@angular/common';
import { DemoModule } from './demo/demo.module';
import { AppGlobal,DicService,HyapiService, I18nService, InitFrameService, IOService, ModelService } from "../projects/frame/src/public-api";
import { Router, RouterModule } from "@angular/router";
import { InitTestMenu } from "./initTestMenu";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [DemoModule,RouterModule,HttpClientModule],
  declarations:[],
  providers:[HyapiService,InitFrameService,RouterModule,ModelService,I18nService]
})
export class StoriesTabsModule {
  constructor(public hyapiService: HyapiService,private router: Router,public dicService: DicService,private ioService: IOService, private i18nService:I18nService,private initFrameService: InitFrameService) {
    // AppGlobal.onoff_loginedToken = true;
    this.i18nService.setLanguage({id:'en_US',text:"英文"})
    initFrameService.init();
    AppGlobal.router = this.router;
    AppGlobal.ioService = this.ioService;
    AppGlobal.hyapiService = this.hyapiService;
    AppGlobal.uploadFileMaxSizeStr = '7MB';
    AppGlobal.dicService = dicService;
    AppGlobal.puk = 'MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBpIfXcsPL6UWacA41RA258A9GaKQ+RIWYfoMHr8jQX9gXQEfs7R0BT5m47xj1QAnGN0bq984ZxBOrbKz+5ST4p4vGkuuwR0b+09aUS7BG3ked00//xo/XRckOw3yjkaUKuXDR8YBAtUE9U0dTVjOiPNn2+L6x41yFKCGHqIfbY2qn+p/GNwyD43DL8Uyl4G6PaTrp7FPgjm9tEEx0b8fNFMrrEH40GbkN0YUNwEWkkZQMoky8+7OrjxkSOtwH1jT+xLl59u5+4OXoE4fecS5mqwbG8WfZSIPhy+SbhYXKocPpdPzwgTlisNgfjEPB+zzz8Fk13H4PJn85owJ1lm08zAgMBAAE=';
    InitTestMenu.init();
  }
}
