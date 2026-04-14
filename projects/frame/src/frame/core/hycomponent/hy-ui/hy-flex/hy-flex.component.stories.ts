import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../base/base.module';
import { HyFlexComponent } from './hy-flex.component';
import { unit } from '../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../_index';
import { FormsModule } from '@angular/forms';

const argTypes = unit.createArgTypes('HyFlexComponent');
const labelString = unit.createLabel('hy-flex',argTypes);
export default {
  title: '布局组件/hy-flex（弹性布局）',
  component: HyFlexComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule],
      providers: [TableService,ModelService]
    }),
  ],
  argTypes
} as Meta;

const data = {
  list:[
    {title:'第一个模板'},
    {title:'第二个模板'},
    {title:'第三个模板'},
    {title:'第四个模板'},
    {title:'第五个模板'},
    {title:'第六个模板'},
  ]
};
const Template: Story<HyFlexComponent> = (args: HyFlexComponent) => ({
  props: args,
  template: `
    <div style="width:100%;border:1px dashed #ddd;background:#eee">
    ${labelString}
        <div style="border:1px solid;">第一个模板</div>
        <div style="border:1px solid;">第二个模板</div>
        <div style="border:1px solid;">第三个模板</div>
      </hy-flex>
    </div>
  `,
});
export const panel:Story = Template.bind({});
panel.args = data;
panel.storyName = '默认比例';

// 自定义比例
const Template2: Story<HyFlexComponent> = (args: HyFlexComponent) => ({
  props: args,
  template: `
    <div style="width:100%;height:600px;border:1px dashed #ddd;background:#eee">
    ${labelString}
        <div flex="1" style="border:1px solid;">第一个模板</div>
        <div flex="2" style="border:1px solid;">第二个模板</div>
        <div flex="3" style="border:1px solid;">第三个模板</div>
      </hy-flex>
    </div>
  `,
});
export const panel2:Story = Template2.bind({});
panel2.storyName = '自定义比例';

const testString = '<hy-flex [direction]="direction" [showBg]="showBg">'
// 自定义比例
const Template3: Story<HyFlexComponent> = (args: HyFlexComponent) => ({
  props: args,
  template: `
    <div style="width:100%;height:600px;border:1px dashed #ddd;background:#eee">
      ${labelString}
        <div flex="1" style="border:1px solid;">第一个模板</div>
        <div flex="2" style="border:1px solid;">第二个模板</div>
        <div width="100px" style="border:1px solid;">第三个模板</div>
      </hy-flex>
      <hy-flex>
        <div>2222</div>
      </hy-flex>
      <hy-flex>
        <div>2222</div>
      </hy-flex>
    </div>
  `,
});
export const panel3:Story = Template3.bind({});
panel3.storyName = '固定宽度+比例';

