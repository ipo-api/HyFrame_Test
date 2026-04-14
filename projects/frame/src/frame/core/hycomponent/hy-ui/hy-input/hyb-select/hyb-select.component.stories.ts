import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HybSelectComponent } from './hyb-select.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { $hyapi, ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';

let _this;

class MockPricingService implements Partial<ModelService> {
  private $dicCache: any = {};

  public tableServiceMap: any = {};

  constructor() {
    _this = this;
  }

  pushDic(dic: any) {
    if (dic && dic.name) {
      this.$dicCache[dic.name] = dic.value;
    }
  }

  getDic(dicName: string) {
    return this.$dicCache[dicName];
  }
}


const argTypes = unit.createArgTypes('HybSelectComponent');
export default {
  title: '基础组件/hyb-select（选择器）',
  component: HybSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockPricingService }, TableService]
    }),
  ],
  argTypes
} as Meta;

// 嵌套模式
const Template1: Story<HybSelectComponent> = (args: HybSelectComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test">
      <hy-text model="text" [addOnBefore]="addOnBefore" title="test" cols="24"></hy-text>
      <ng-template #addOnBefore>
        <hyb-select [selectStyle]="{'width':'180px'}" [enable]="enable" dic="testWeek" model="select" (onChange_model)="onChange_model($event)"></hyb-select>
      </ng-template>
    </hy-gt>
  </hy-form>
  `
});
export const panel1 = Template1.bind({});
panel1.args = {
  enable:true
}
panel1.storyName = '嵌套模式';

// 单选模式
const Template2: Story<HybSelectComponent> = (args: HybSelectComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test">
      <hyb-select dic="testWeek" model="select" (onChange_model)="onChange_model($event)"></hyb-select>
    </hy-gt>
  </hy-form>
  `
});
export const panel2 = Template2.bind({});
panel2.storyName = '单选模式';

// 多选模式
const Template3: Story<HybSelectComponent> = (args: HybSelectComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test">
      <hyb-select mode="multiple" dic="testWeek" model="select" (onChange_model)="onChange_model($event)"></hyb-select>
    </hy-gt>
  </hy-form>
  `
});
export const panel3 = Template3.bind({});
panel3.storyName = '多选模式';

// 大数据模式
const Template5: Story<HybSelectComponent> = (args: HybSelectComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test">
      <hyb-select dic="bigData" model="select" [showFilter]="true" (onChange_model)="onChange_model($event)"></hyb-select>
      <hyb-select [selectStyle]="{width: '200px'}"  dic="bigData" mode="multiple"  model="select" [showFilter]="true" (onChange_model)="onChange_model($event)"></hyb-select>
    </hy-gt>
  </hy-form>
  `
});
export const panel5 = Template5.bind({});
panel5.storyName = '大数据模式';

// 嵌套多选不换行模式
const Template4: Story<HybSelectComponent> = (args: HybSelectComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test">
      <hy-text model="text" [addOnBefore]="addOnBefore" title="test" cols="24"></hy-text>
      <ng-template #addOnBefore>
        <hyb-select [allowClear]="false" mode="nowrapMultiple" dic="testWeek" model="select" (onChange_model)="onChange_model($event)"></hyb-select>
      </ng-template>
      <div class="select-btn-group">
        <hyb-select dic="testWeek" model="select2" [selectStyle]="{minWidth: '100px'}" [allowClear]="false" ></hyb-select>
        <hyb-button title="title" type="primary" (onClick)="click()" ></hyb-button>
      </div>
    </hy-gt>
    
  </hy-form>

  `
});
export const panel4 = Template4.bind({});
panel4.storyName = '嵌套多选不换行模式';

/** 动态字典 */
const Template7: Story<any> = (args: any) => {
  args['change'] = (e) => {
    if (e === '2') {
      $hyapi.dic.getFromServer('dd_testWeek', _this, {}, (e) => {
        $hyapi.dic.cache({ 'name': 'tt_tiem', value: e }, _this);
      })
    }else{
      $hyapi.dic.cache({ 'name': 'tt_tiem', value: [] }, _this);
    }
  }
  args['changeDD'] = e =>{
    $hyapi.dic.getFromServer('dd_testWeek', _this, {'id':'1'})
  }
  return {
    props: args,
    template: `
    <hy-form>
      <hy-gt model="test">
        <hyb-select title="时间类型" dic="testTimeType" model="timeType" (onChange_model)="change($event)"></hyb-select>
        <hyb-select dic="tt_tiem" model="time" title="动态字典"></hyb-select>
        <hyb-select dic="dd_testWeek" model="time2" title="动态字典"></hyb-select>
      </hy-gt>
      <hy-button title="改变动态字典的值" (onClick)="changeDD()"></hy-button>
    </hy-form>
    `
  }
};
const data7 = {

};
export const panel7 = Template7.bind({});
panel7.args = data7;
panel7.storyName = '动态字典';
