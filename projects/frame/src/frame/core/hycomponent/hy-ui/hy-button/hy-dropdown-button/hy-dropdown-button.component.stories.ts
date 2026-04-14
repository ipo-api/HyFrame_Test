import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyDropdownButtonComponent } from './hy-dropdown-button.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';


const argTypes = unit.createArgTypes('HyDropdownButtonComponent');
class MockPricingService implements Partial<ModelService> {
  constructor(){
    setTimeout(() => {
      this['gt_btn'].text = '6666'
    }, 1000);
  }
}

export default {
  title: '基础组件/hy-dropdown-button（下拉按钮）',
  component: HyDropdownButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, { provide: ModelService, useClass: MockPricingService }]
    }),
  ],
  argTypes,
} as Meta;


const data = {
  title: '批量操作',
  ckRequired: true,
  ckNumber: true,
  ckPristine: true,
  dropdownButtonArray:[
    {title:'删除',click:()=>{console.log('点击删除')}},
    {title:'确认',click:()=>{console.log('点击确认')}},
  ]
};
const Template: Story<HyDropdownButtonComponent> = (args: HyDropdownButtonComponent) => ({
  props: args,
  template: `
    <hy-form>
      <hy-gt model="btn">
        <hy-dropdown-button [title]="title" [dropdownButtonArray]="dropdownButtonArray"></hy-dropdown-button>
      </hy-gt>
    </hy-form>
  `,
});
export const panel:Story = Template.bind({});
panel.args = data;
panel.storyName = '表单验证';


const Template2: Story<HyDropdownButtonComponent> = (args: HyDropdownButtonComponent) => ({
  props: args,
  template: `
    <hy-form>
      <hy-gt model="btn">
        <hy-dropdown-button title="默认" [dropdownButtonArray]="[{title:'btn1'},{title:'btn2',color:'red'}]"></hy-dropdown-button>
        <hy-dropdown-button title="link" type="link" [dropdownButtonArray]="[{title:'btn1'},{title:'btn2'}]"></hy-dropdown-button>
      </hy-gt>
    </hy-form>
  `,
});
export const pane2:Story = Template2.bind({});
panel.storyName = '按钮类型';

