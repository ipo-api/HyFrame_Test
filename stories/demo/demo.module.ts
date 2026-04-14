import { NgModule, } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Panel1Component } from "./hy-tabs/panel1.component";
import { Panel2Component } from "./hy-tabs/panel2.component";
import { AppGlobal, BaseModule, HyapiService } from "projects/frame/src/public-api";
import { Panel1Test1Component } from "./hy-tabs/panel1-test1.component";
import { Panel2Test2Component } from "./hy-tabs/panel2-test2.component";
import { Panel1Test2Component } from "./hy-tabs/panel1-test2.componen";

@NgModule({
  imports: [CommonModule,BaseModule],
  declarations: [
    Panel1Component,
    Panel2Component,
    Panel1Test1Component,
    Panel1Test2Component,
    Panel2Test2Component
  ],
  exports: [
    Panel1Component,
    Panel2Component,
    Panel1Test1Component,
    Panel1Test2Component,
    Panel2Test2Component
  ],
})
export class DemoModule {
  constructor(private hyapiService: HyapiService) {
    // AppGlobal.hyapiService = this.hyapiService;
  }
}
