import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyDateComponent } from './hy-date.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { format } from 'date-fns';

class MockPricingService implements Partial<ModelService> {
  constructor(){
  }
}

const argTypes = unit.createArgTypes('HyDateComponent');
argTypes['ranges'].control.type='object';
argTypes['placeholders'].control.type='object';
argTypes['enableDate'].control.type='object';
argTypes['unEnableDate'].control.type='object';
export default {
  title: '表单组件/hy-date（日期选择器）',
  component: HyDateComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, { provide: ModelService, useClass: MockPricingService }]
    }),
    componentWrapperDecorator((story) => 
    `<hy-form>
      <hy-gt model="date">
        ${story}
      </hy-gt>
    </hy-form>`)
  ],
  argTypes
} as Meta;

// 日期
const Template: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date title="标题" model="date" cols="24" (onChange_model)="onChange_model($event)"></hy-date>
  <hy-date title="标题" model="date" cols="24" (onChange_model)="onChange_model($event)" explainText="这是说明"></hy-date>
  `
});
export const panel = Template.bind({});
panel.storyName = '日期';

// 日期-时间格式
const Template10: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date labelWidth="160px" model="start" title="yyyy" cols="24" format="yyyy" (onChange_model)="onChange_model($event)"></hy-date>
  <hy-date labelWidth="160px" model="start" title="yyyy-MM" cols="24" format="yyyy-MM" (onChange_model)="onChange_model($event)"></hy-date>
  <hy-date labelWidth="160px" model="start" title="yyyy-MM-dd" cols="24" format="yyyy-MM-dd" (onChange_model)="onChange_model($event)"></hy-date>
  <hy-date labelWidth="160px" model="start" title="yyyy-MM-dd HH:mm" cols="24" format="yyyy-MM-dd HH:mm" (onChange_model)="onChange_model($event)"></hy-date>
  <hy-date labelWidth="160px" model="start" title="yyyy-MM-dd HH:mm:ss" cols="24" format="yyyy-MM-dd HH:mm:ss" (onChange_model)="onChange_model($event)"></hy-date>
  `
});
export const panel10 = Template10.bind({});
panel10.storyName = '日期-时间格式';

// 日期-tip提示
const Template11: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date title="标题" model="date" cols="24" (onChange_model)="onChange_model($event)" tip="这是提示"></hy-date>
  <hy-date title="标题" model="date" cols="24" (onChange_model)="onChange_model($event)" [tip]="tip"></hy-date>
  <hy-date title="标题" model="date" cols="24" (onChange_model)="onChange_model($event)" [tip]="tip" tipType="bottomTip"></hy-date>
  <hy-date title="标题" flex="180px" model="date" cols="24" (onChange_model)="onChange_model($event)" [tip]="tip" tipType="bottomTip" [noOwnWidth]="true"></hy-date>
  <ng-template #tip>
    <div style="width:500px;border:1px solid">这是提示模板1</div>
    <div>这是提示模板2</div>
    <div>这是提示模板3</div>
  </ng-template>
  `
});
export const panel11 = Template11.bind({});
panel11.storyName = '日期-tip提示';

// 日期-不限制自身宽度
const Template1: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date title="标题" model="date" cols="24" (onChange_model)="onChange_model($event)" [noOwnWidth]="true"></hy-date>
  <hy-text title="标题" model="text" cols="24" ></hy-text>
  `
});
export const panel1 = Template1.bind({});
panel1.storyName = '日期-不限制自身宽度';

// 日期-今天及之后的可选日期
const Template2: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date model="data" cols="24" title="标题" [enableStartTotay]="true"></hy-date>
  `
});
export const panel2 = Template2.bind({});
panel2.storyName = '日期-今天及之后的可选日期';

// 日期-今天及之前的可选日期
const Template3: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date model="data" cols="24" title="标题" [enableEndTotay]="true"></hy-date>
  `
});
export const panel3 = Template3.bind({});
panel3.storyName = '日期-今天及之前的可选日期';

// 日期-自定义可选日期
const Template4: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date model="data" title="标题" cols="24" [enableDate]="enableDate"></hy-date>
  `
});
export const panel4 = Template4.bind({});
panel4.args = {
  enableDate:[format(new Date(),'yyyy-MM-dd'),format(new Date(),'yyyy-MM-dd')]
};
panel4.storyName = '日期-自定义可选日期';

// 日期-自定义不可选日期
const Template41: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date model="data" title="标题" cols="24" [unEnableDate]="unEnableDate"></hy-date>
  `
});
export const panel41 = Template41.bind({});
panel41.args = {
  unEnableDate:[format(new Date(),'yyyy-MM-dd'),format(new Date(),'yyyy-MM-dd')]
};
panel41.storyName = '日期-自定义不可选日期';

// 日期-页脚模板
const Template42: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date model="data" [format]="format" [renderExtraFooter]="renderExtraFooterTemplate" title="标题" cols="24"></hy-date>
  <ng-template #renderExtraFooterTemplate>
    <a nz-button nzType="link">周一</a>
    <a nz-button nzType="link">周二</a>
  </ng-template>
  `
});
export const panel42 = Template42.bind({});
panel42.args = {
  format:'yyyy-MM-dd HH:mm',
};
panel42.storyName = '日期-页脚模板';

// 日期时间
const Template5: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date model="data" title="标题" cols="24" (onChange_model)="onChange_model($event)" format="yyyy-MM-dd HH:mm:ss"></hy-date>
  <hy-date model="data" title="标题" cols="24" (onChange_model)="onChange_model($event)" format="yyyy-MM-dd HH:mm"></hy-date>
  `
});
export const panel5 = Template5.bind({});
panel5.storyName = '日期时间';

// 日期时间-初始化时分秒
const Template6: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date model="data" title="标题" cols="24" (onChange_model)="onChange_model($event)" [isInitTime]="true" format="yyyy-MM-dd HH:mm:ss"></hy-date>
  <hy-date model="data" title="标题" cols="24" (onChange_model)="onChange_model($event)" [isInitTime]="true" format="yyyy-MM-dd HH:mm"></hy-date>
  `
});
export const panel6 = Template6.bind({});
panel6.storyName = '日期时间-初始化时分秒';

// 起始结束日期
const Template7: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date model="start" modelTwo="end" title="标题" cols="24" (onChange_model)="onChange_model($event)" (onChange_modelTwo)="onChange_modelTwo($event)"></hy-date>
  `
});
export const panel7 = Template7.bind({});
panel7.storyName = '起始结束日期';

// 起始结束日期-自定义可选日期
const Template71: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date model="start" modelTwo="end" title="标题" cols="24" [enableDate]="enableDate" (onChange_model)="onChange_model($event)" (onChange_modelTwo)="onChange_modelTwo($event)"></hy-date>
  `
});
export const panel71 = Template71.bind({});
panel71.args = {
  enableDate:[format(new Date(),'yyyy-MM-dd'),format(new Date(),'yyyy-MM-dd')]
}
panel71.storyName = '起始结束日期-自定义可选日期';

// 起始结束日期-自定义不可选日期
const Template72: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date model="start" modelTwo="end" title="标题" cols="24" [unEnableDate]="unEnableDate" (onChange_model)="onChange_model($event)" (onChange_modelTwo)="onChange_modelTwo($event)"></hy-date>
  `
});
export const panel72 = Template72.bind({});
panel72.args = {
  unEnableDate:[format(new Date(),'yyyy-MM-dd'),format(new Date(),'yyyy-MM-dd')]
}
panel72.storyName = '起始结束日期-自定义不可选日期';

// 起始结束日期-时间格式
const Template8: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date labelWidth="160px" model="start" modelTwo="end" title="yyyy" cols="24" format="yyyy" (onChange_model)="onChange_model($event)" (onChange_modelTwo)="onChange_modelTwo($event)"></hy-date>
  <hy-date labelWidth="160px" model="start" modelTwo="end" title="yyyy-MM" cols="24" format="yyyy-MM" (onChange_model)="onChange_model($event)" (onChange_modelTwo)="onChange_modelTwo($event)"></hy-date>
  <hy-date labelWidth="160px" model="start" modelTwo="end" title="yyyy-MM-dd" cols="24" format="yyyy-MM-dd" (onChange_model)="onChange_model($event)" (onChange_modelTwo)="onChange_modelTwo($event)"></hy-date>
  <hy-date labelWidth="160px" model="start" modelTwo="end" title="yyyy-MM-dd HH:mm" cols="24" format="yyyy-MM-dd HH:mm" (onChange_model)="onChange_model($event)" (onChange_modelTwo)="onChange_modelTwo($event)"></hy-date>
  <hy-date labelWidth="160px" model="start" modelTwo="end" title="yyyy-MM-dd HH:mm:ss" cols="24" format="yyyy-MM-dd HH:mm:ss" (onChange_model)="onChange_model($event)" (onChange_modelTwo)="onChange_modelTwo($event)"></hy-date>
  `
});
export const panel8 = Template8.bind({});
panel8.storyName = '起始结束日期-时间格式';

// 起始结束日期-初始化时分秒
const Template9: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date model="start" modelTwo="end" title="标题" cols="24" format="yyyy-MM-dd HH:mm" [isInitTime]="true" (onChange_model)="onChange_model($event)" (onChange_modelTwo)="onChange_modelTwo($event)"></hy-date>
  <hy-date model="start" modelTwo="end" title="标题" cols="24" format="yyyy-MM-dd HH:mm:ss" [isInitTime]="true" (onChange_model)="onChange_model($event)" (onChange_modelTwo)="onChange_modelTwo($event)"></hy-date>
  `
});
export const panel9 = Template9.bind({});
panel9.storyName = '起始结束日期-初始化时分秒';

// 起始结束日期-自定义快捷选项
const Template91: Story<HyDateComponent> = (args: HyDateComponent) => ({
  props: args,
  template: `
  <hy-date model="start" modelTwo="end" title="标题" cols="24" format="yyyy-MM-dd" [ranges]="ranges" (onChange_model)="onChange_model($event)" (onChange_modelTwo)="onChange_modelTwo($event)"></hy-date>
  <hy-date model="start" modelTwo="end" title="标题" cols="24" format="yyyy-MM-dd HH:mm" [ranges]="ranges" (onChange_model)="onChange_model($event)" (onChange_modelTwo)="onChange_modelTwo($event)"></hy-date>
  <hy-date model="start" modelTwo="end" title="标题" cols="24" format="yyyy-MM-dd HH:mm:ss" [ranges]="ranges" (onChange_model)="onChange_model($event)" (onChange_modelTwo)="onChange_modelTwo($event)"></hy-date>
  `
});
export const panel91 = Template91.bind({});
panel91.args = {
  ranges:{
    '2月':['2022-02-01 00:00:01','2022-02-28 23:59:59'],
    '3月':['2022-03-01 00:00:01','2022-03-31 23:59:59']
  },
}
panel91.storyName = '起始结束日期-自定义快捷选项';