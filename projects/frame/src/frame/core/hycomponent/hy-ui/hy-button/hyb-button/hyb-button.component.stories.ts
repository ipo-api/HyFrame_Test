import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HybButtonComponent } from './hyb-button.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';

const argTypes = unit.createArgTypes('HybButtonComponent');
export default {
  title: '基础组件/hyb-button（按钮）',
  component: HybButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService,ModelService]
    }),
  ],
  argTypes,
} as Meta;


const data = {
  title: '按钮',
  dic:'testAllowLogin',
  ckRequired:true,
  ckNumber:true,
};
const Template: Story<HybButtonComponent> = (args: HybButtonComponent) => ({
  props: args,
  template: `
    <hy-form>
      <hy-gt model="btn">
        <hy-text title="输入框" model="text" [ckRequired]="ckRequired" [ckNumber]="ckNumber"></hy-text>
      </hy-gt>
      <hyb-button type="primary" [title]="title" nzIconName="search" [search]="true" (onClick)="onClick($event)"></hyb-button>
    </hy-form>
  `,
});
export const panel:Story = Template.bind({});
panel.args = data;
panel.storyName = '表单验证';

