import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HyCommLabelComponent } from './hy-comm-label/hy-comm-label.component';
import {BaseNgModule} from '../../../base/baseng.module';
import { HyCommTipComponent } from './hy-comm-tip/hy-comm-tip.component';

@NgModule({
  declarations: [HyCommLabelComponent,HyCommTipComponent],
  imports: [
    CommonModule,
    BaseNgModule
  ],
  exports: [HyCommLabelComponent,HyCommTipComponent]
})
export class ComponentModule { }
