import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyCellComponent } from './hy-cell.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { $hyapi, ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';

let mds;

class MockPricingService implements Partial<ModelService> {
  constructor() {
    mds = this;
    setTimeout(() => {
      let tableUserData = [];
      for (let i = 0; i < 21; i++) {
        tableUserData.push({
          name: 'name' + i,
          id: i + 1 + '',
          age: 18 + Math.round(Math.random() * 10),
          postId: Math.round(Math.random() * 4) + '',
          birthday: '1996-01-01',
          role: ['1', '2', '3'],
          isAdmin: '0',
        });
      }
      mds['glt_localDatas'] = tableUserData;
    }, 100);
  }
}

const argTypes = unit.createArgTypes('HyCellComponent');
argTypes['type'].control.type = 'radio';
argTypes['type'].control.options = ['text', 'select', 'link', 'progress', 'template', 'button'];
export default {
  title: '数据展示/表格/hy-cell（表格单元格）',
  component: HyCellComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockPricingService }, TableService]
    }),
  ],
  argTypes
} as Meta;

// 本地数据
const Template1: Story<HyCellComponent> = (args: HyCellComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-glt [frontPagination]="true" title="用户列表" tip="提示" model="localDatas">
      <ng-template let-item="item" let-index="index">
        <td>
          <hy-cell type="text" title="文本" model="name" [item]="item" [index]="index"></hy-cell>
        </td>
        <td>
          <hy-cell type="link" title="link类型" model="name" [item]="item" [index]="index"></hy-cell>
        </td>
        <td>
          <hy-cell type="select" title="选择类型" model="postId" dic="testWeek" [item]="item" [index]="index"></hy-cell>
        </td>
        <td>
          <hy-cell type="template" title="传入模板-传入进度条" [item]="item" [index]="index">
            <ng-template let-item="item" let-index="index">
              <hy-progress [percent]="10"></hy-progress>
            </ng-template>
          </hy-cell>
        </td>
        <td>
          <hy-cell type="template" title="传入模板-传入按钮" [item]="item" [index]="index">
            <ng-template let-item="item" let-index="index">
              <hy-cell-btn title="删除"></hy-cell-btn>
            </ng-template>
          </hy-cell>
        </td>
      </ng-template>
    </hy-glt>
  </hy-form>  
  `
});

export const panel1 = Template1.bind({});
panel1.storyName = '显示类型';
