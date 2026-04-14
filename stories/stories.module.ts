import { NgModule, } from "@angular/core";
import { APP_BASE_HREF, CommonModule, registerLocaleData } from '@angular/common';
import { DemoModule } from './demo/demo.module';
import { $hyapi, AppGlobal, DicService, HyapiService, InitFrameService, IOService, I18nService } from "../projects/frame/src/public-api";
import { Router, RouterModule } from "@angular/router";
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { InitTestMenu } from './initTestMenu';
import { NZ_I18N, zh_CN } from "ng-zorro-antd/i18n";
import zh from '@angular/common/locales/zh';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ModelService } from '../projects/frame/src/frame/core/common/domain/service/model.service';
import { ValidatorFnsService } from "projects/frame/src/frame/core/func/check/validator-fns.service";
import { StorybookWrapperComponent } from "../.storybook/storybook-wrapper";

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


@NgModule({
  imports: [DemoModule, RouterModule, NzIconModule.forRoot(icons), HttpClientModule, MarkdownModule.forRoot({ loader: HttpClient })],
  declarations: [StorybookWrapperComponent],
  providers: [HyapiService, ValidatorFnsService, MarkdownService],
  exports: [MarkdownModule,StorybookWrapperComponent]
})
export class StoriesModule {
  constructor(public i18nService: I18nService, public hyapiService: HyapiService, public dicService: DicService, private ioService: IOService, private modelService: ModelService, private initFrameService: InitFrameService) {
    // AppGlobal.onoff_loginedToken = true;
    this.i18nService.setLanguage({ id: 'zh_HK', text: "简体中文" })
    initFrameService.init();
    AppGlobal.ioService = this.ioService;
    AppGlobal.hyapiService = this.hyapiService;
    AppGlobal.uploadFileMaxSizeStr = '500MB';
    AppGlobal.dicService = dicService;
    AppGlobal.puk = 'MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBpIfXcsPL6UWacA41RA258A9GaKQ+RIWYfoMHr8jQX9gXQEfs7R0BT5m47xj1QAnGN0bq984ZxBOrbKz+5ST4p4vGkuuwR0b+09aUS7BG3ked00//xo/XRckOw3yjkaUKuXDR8YBAtUE9U0dTVjOiPNn2+L6x41yFKCGHqIfbY2qn+p/GNwyD43DL8Uyl4G6PaTrp7FPgjm9tEEx0b8fNFMrrEH40GbkN0YUNwEWkkZQMoky8+7OrjxkSOtwH1jT+xLl59u5+4OXoE4fecS5mqwbG8WfZSIPhy+SbhYXKocPpdPzwgTlisNgfjEPB+zzz8Fk13H4PJn85owJ1lm08zAgMBAAE=';
    InitTestMenu.init();
    registerLocaleData(zh);
    $hyapi.io.post(this.modelService, 'http://10.40.92.15:3001/deleteAllFile', {}, {
      showMsg: false,
      showFailMsg: false,
      showErrorMsg: false,
      successFn: (res) => {

      }
    })
  }
}
