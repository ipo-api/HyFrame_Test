import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyQueryShowComponent } from './hy-query-show.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';


const argTypes = unit.createArgTypes('HyQueryShowComponent');
class MockPricingService implements Partial<ModelService> {
  constructor(){
    setTimeout(() => {
      this['gt_btn'].text = '这是展示文本'
    }, 1000);
  }
}

export default {
  title: '基础组件/hy-query-show（查询展示）',
  component: HyQueryShowComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, { provide: ModelService, useClass: MockPricingService }]
    }),
  ],
  argTypes,
} as Meta;


const data = {
  title: '高级搜索',
  ckRequired: true,
  ckNumber: true,
  ckPristine: true,
  dropdownButtonArray:[
    {title:'删除',click:()=>{console.log('点击删除')}},
    {title:'确认',click:()=>{console.log('点击确认')}},
  ]
};
const Template: Story<HyQueryShowComponent> = (args: HyQueryShowComponent) => ({
  props: args,
  template: `
    <hy-form>
      <hy-gt model="btn">
        <hy-align [rightTemplate]="rightTileTemp"></hy-align>
        <ng-template #rightTileTemp>
          <hy-text flex="270px" placeholder="请输入问题编号、问题标题、版本号查询" model="problem" [noLabel]="true"
            (onKeyup.enter)="query(false)"></hy-text>
          <hy-queryShow (onClick)="queryShow()"></hy-queryShow>
        </ng-template>
        <hy-text [noLabel]="true" flex="100px" title="输入框" model="text" [ckRequired]="ckRequired" [ckNumber]="ckNumber"></hy-text>
        <hy-queryShow (onClick)="showSearch()" ></hy-queryShow>
      </hy-gt>
    </hy-form>
  `,
});
export const panel:Story = Template.bind({});
panel.args = data;
panel.storyName = '表单验证';

