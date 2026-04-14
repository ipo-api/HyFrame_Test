import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyCellBtnGroupComponent } from './hy-cell-btn-group.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { $hyapi, HyFormService, I18nService, ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

// 接收器
@Component({
  selector: 'api-content',
  template: `
  <hy-form>
    <hy-glt title="用户列表" model="userList">
      <ng-template let-item="item" let-index="index">
        <td>
          <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
        </td>
        <td>
          <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
        </td>
        <td [nzRight]="'0'">
          <hy-cell width="500px" [nzRight]="'0'" type="button" title="操作" [item]="item" [index]="index">
          <ng-template let-item="item" let-index="index">
             <hy-cell-btn-group [btnArray]="btnArray" [title]="title" [itemData]="item"></hy-cell-btn-group>
          </ng-template>
          </hy-cell>
        </td>
      </ng-template>
    </hy-glt>
  </hy-form>  
  `
})
class HyCellBtnGroupStoriseComponent extends HyCellBtnGroupComponent implements OnInit {
  constructor(public modelService: ModelService,public i18nService:I18nService) {
    super(i18nService)
  }
  ngOnInit(): void {
    $hyapi.io.post(this.modelService, 'http://10.40.92.15:3001/mock/table/user', {}, {
      showMsg: false,
      glt: ['glt_userList'],
      successFn: (resBody) => {
        console.log(resBody)
      }
    });
  }
}

const argTypes = unit.createArgTypes('HyCellBtnGroupComponent');
export default {
  title: '数据展示/表格/hy-cell-btn-group（表格按钮组）',
  component: HyCellBtnGroupStoriseComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService }, TableService, HyFormService]
    }),
  ],
  argTypes
} as Meta;
const Template: Story<HyCellBtnGroupStoriseComponent> = (args: HyCellBtnGroupStoriseComponent) => ({
  props: args,
})
export const panel: Story = Template.bind({ HyCellBtnGroupStoriseComponent });
panel.args = {
  title: '更多',
  btnArray: [
    {
      title: '删除',
      color:'red',
      click: () => {
        console.log('点击删除')
      }
    },
    {
      enable: (item) => {
        if (item && item.id == '1') {
          return false
        } else {
          return true
        }
      },
      title: '编辑',
      click: () => {
        console.log('点击编辑')
      }
    },
  ]
}

