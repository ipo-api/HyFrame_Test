import { NgModule } from '@angular/core';
import { BaseNgModule } from '../../base/baseng.module';
import { HybInputComponent } from './hy-ui/hy-input/hyb-input/hyb-input.component';
import { HyTextComponent } from './hy-ui/hy-input/hy-text/hy-text.component';
import { HyRadioComponent } from './hy-ui/hy-input/hy-radio/hy-radio.component';
import { HyButtonComponent } from './hy-ui/hy-button/hy-button/hy-button.component';
import { HyCheckboxComponent } from './hy-ui/hy-input/hy-checkbox/hy-checkbox.component';
import { HyDateComponent } from './hy-ui/hy-input/hy-date/hy-date.component';
import { HybSelectComponent } from './hy-ui/hy-input/hyb-select/hyb-select.component';
import { HyTextareaComponent } from './hy-ui/hy-input/hy-textarea/hy-textarea.component';
import { HybDateComponent } from './hy-ui/hy-input/hyb-date/hyb-date.component';
import { HyNumberComponent } from './hy-ui/hy-input/hy-number/hy-number.component';
import { HySelectComponent } from './hy-ui/hy-input/hy-select/hy-select.component';
import { HyBreadcrumbComponent } from './hy-ui/hy-title/hy-breadcrumb/hy-breadcrumb.component';
import { HyTransferComponent } from './hy-ui/hy-transfer/hy-transfer.component';
import { HyFormComponent } from './hy-ui/hy-form/hy-form/hy-form.component';
import { HyTabsComponent } from './hy-ui/hy-tabs/hy-tabs.component';
import { HyTimeComponent } from './hy-ui/hy-input/hy-time/hy-time.component';
import { HyBlankComponent } from './hy-ui/hy-input/hy-blank/hy-blank.component';
import { HyEditTableComponent } from './hy-ui/hy-table/hy-edit-table/hy-edit-table.component';
import { HyUploadComponent } from './hy-ui/hy-upload/hy-upload.component';
import { HyTreeSelectComponent } from './hy-ui/hy-input/hy-treeSelect/hy-tree-select.component';
import { HyTreeComponent } from './hy-ui/hy-tree/hy-tree.component';
import { HyMenuComponent } from './hy-ui/hy-menu/hy-menu.component';
import { HybButtonComponent } from './hy-ui/hy-button/hyb-button/hyb-button.component';
import { HyCheckboxDetailComponent } from './hy-ui/hy-input/hy-checkbox/hy-checkbox-detail/hy-checkbox-detail.component';
import { HyGltComponent } from './hy-ui/hy-table/hy-glt/hy-glt.component';
import { HyStepComponent } from './hy-ui/hy-step/hy-step.component';
import { HyTogglePrototypeComponent } from './hy-ui/hy-button/hy-toggle/hy-toggle-prototype/hy-toggle-prototype.component';
import { HyToggleComponent } from './hy-ui/hy-button/hy-toggle/hy-toggle.component';
import { HyCellBtnComponent } from './hy-ui/hy-table/hy-cell-btn/hy-cell-btn.component';
import { HyQueryShowComponent } from './hy-ui/hy-button/hy-query-show/hy-query-show.component';
import { HyMonitorComponent } from './hy-ui/hy-monitor/hy-monitor.component';
import { HyProgressComponent } from './hy-ui/hy-progress/hy-progress.component';
import { HyDropdownButtonComponent } from './hy-ui/hy-button/hy-dropdown-button/hy-dropdown-button.component';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { HyLinebreakComponent } from './hy-ui/hy-input/hy-linebreak/hy-linebreak.component';
import { HyAlignComponent } from './hy-ui/hy-input/hy-align/hy-align.component';
import { HyIconComponent } from './hy-ui/hy-icon/hy-icon.component';
import { HyReadonlyComponent } from './hy-ui/hy-input/hy-readonly/hy-readonly.component';
import { HyCellComponent } from './hy-ui/hy-table/hy-cell/hy-cell.component';
import { HyGtComponent } from './hy-ui/hy-table/hy-gt/hy-gt.component';
import { HyTransferTempComponent } from './hy-ui/hy-transfer/hy-transfer-temp/hy-transfer-temp.component';
import { HyDrawerComponent } from './hy-ui/hy-drawer/hy-drawer.component';
import { HyBtnlayoutComponent } from './hy-ui/hy-button/hy-btn-layout/hy-btn-layout.component';
import { HyTitleComponent } from './hy-ui/hy-title/hy-title/hy-title.component';
import { HyCellBtnGroupComponent } from './hy-ui/hy-table/hy-cell-btn-group/hy-cell-btn-group.component';
import { HyAlertComponent } from './hy-ui/hy-alert/hy-alert.component';
import { ComponentModule } from '../common/component/component.module';
import { PipesModule } from '../pipes/pipes.module';
import { HyFlexComponent } from './hy-ui/hy-flex/hy-flex.component';
import { HyListComponent } from './hy-ui/hy-list/hy-list.component';
import { HySliderComponent } from './hy-ui/hy-input/hy-slider/hy-slider.component';
import { HyTagComponent } from './hy-ui/hy-tag/hy-tag.component';
import { HyListBtnComponent } from './hy-ui/hy-list/hy-list-btn/hy-list-btn.component';
import { HyGroupComponent } from './hy-ui/hy-group/hy-group.component';
import { HyDirectiveModule } from '../directive/hy-directive.modules';

const components = [
  HyGtComponent,
  HyFormComponent,
  HybInputComponent,
  HyTextComponent,
  HyRadioComponent,
  HyButtonComponent,
  HyToggleComponent,
  HyCheckboxComponent,
  HyDateComponent,
  HybSelectComponent,
  HyTextareaComponent,
  HybDateComponent,
  HyNumberComponent,
  HySelectComponent,
  HyBreadcrumbComponent,
  HyTransferComponent,
  HyTabsComponent,
  HyTimeComponent,
  HyGltComponent,
  HyBlankComponent,
  HyEditTableComponent,
  HyUploadComponent,
  HyTreeSelectComponent,
  HyTreeComponent,
  HybButtonComponent,
  HyCheckboxDetailComponent,
  HyCellComponent,
  HyStepComponent,
  HyTogglePrototypeComponent,
  HyCellBtnComponent,
  HyQueryShowComponent,
  HyMonitorComponent,
  HyProgressComponent,
  HyDropdownButtonComponent,
  HyLinebreakComponent,
  HyAlignComponent,
  HyIconComponent,
  HyReadonlyComponent,
  HyTransferTempComponent,
  HyDrawerComponent,
  HyBtnlayoutComponent,
  HyTitleComponent,
  HyCellBtnGroupComponent,
  HyAlertComponent,
  HyFlexComponent,
  HyListComponent,
  HySliderComponent,
  HyTagComponent,
  HyListBtnComponent,
  HyMenuComponent,
  HyGroupComponent
];

@NgModule({
  imports: [BaseNgModule, ComponentModule, PipesModule, HyDirectiveModule],
  declarations: components,
  exports: [...components, PipesModule, BaseNgModule, HyDirectiveModule],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
  ],
})
export class YiCoreModule { }
