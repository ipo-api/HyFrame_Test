import { NgModule } from '@angular/core';
import { BaseNgModule } from './baseng.module';
import { YiCoreModule } from '../core/hycomponent/hy-core.module';
import { PipesModule } from '../core/pipes/pipes.module';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { ValidatorFnsService } from '../core/func/check/validator-fns.service';

@NgModule({
  imports: [BaseNgModule, YiCoreModule, NgZorroAntdModule, PipesModule],
  exports: [BaseNgModule, YiCoreModule, NgZorroAntdModule, PipesModule],
  providers: [ValidatorFnsService]
})
export class BaseModule { }
