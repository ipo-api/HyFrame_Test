import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyCellBtnComponent } from './hy-cell-btn.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { $hyapi, HyFormService, I18nService, ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

let mds;

class MockPricingService implements Partial<ModelService> {
  constructor() {
    mds = this;
    setTimeout(() => {
      $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user', {}, {
        showMsg: true,
        glt: ['glt_userList'],
        successFn: (resBody) => {
          console.log(resBody)
        }
      });
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

const argTypes = unit.createArgTypes('HyCellBtnComponent');
export default {
  title: '数据展示/表格/hy-cell-btn（表格按钮）',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockPricingService }, TableService]
    }),
  ],
  argTypes
} as Meta;
const Template: Story<any> = (args: any) => {
  args.onClick_DelUser = (data) => {
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/delete', { id: data.id }, {
      successFn: (resBody) => {
        console.log(resBody);
        mds['glt_userList'] = mds['glt_userList'].filter(item => item.id !== data.id);
      }
    })
  }
  args['search'] = ()=>{
    const data = {};
    if (mds['gt_userList'].id) {
      data['id'] = mds['gt_userList'].id;
    }
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user', mds['gt_userList'], {
      showMsg: false,
      glt: ['glt_userList'],
      gltNewSearch: true,
      successFn: (resBody) => {
        console.log(resBody)
      }
    });
  }
  return {
    props: args,
    template: `
    <hy-form>
      <hy-glt title="用户列表" model="userList">
        <ng-template let-item="item" let-index="index">
          <td>
            <hy-cell [nzRight]="'0'" type="button" title="操作" [item]="item" [index]="index">
              <ng-template let-item="item" let-index="index">
                <hy-cell-btn nzIconName="delete" title="删除" [showConfirm]="false" (onClick)="onClick(item)"></hy-cell-btn>
              </ng-template>
            </hy-cell>
          </td>
        </ng-template>
      </hy-glt>
    </hy-form>  
    `
  }
};

export const panel = Template.bind({});
panel.args = {
  isEllipsis: false,
  title: '用户列表',
  tip: '提示',
  model: 'userList',
  class: null,
  showCheckAll: true,
  noTotalPage: true,
  pageSizeOptions: [10, 20]
};
panel.storyName = 'glt模版';

// export const panel: Story = Template.bind({ HyCellBtnStoriseComponent });
// panel.args = {
//   title: '编辑',
//   btnImg:'',
//   btnLink:true,
//   btnType:'编辑',
//   enable:true,
//   nzIconName:'edit',
//   showConfirm:'true',
//   confirm:'弹出框内容',
//   confirmText:'确认',
//   cancelText:'取消',
// }

