import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyEditTableComponent } from './hy-edit-table.component';
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

const argTypes = unit.createArgTypes('HyEditTableComponent');
const labelString = unit.createLabel('hy-glt', argTypes);
argTypes['pageSizeOptions'].control.type = 'object';
argTypes['scroll'].control.type = 'object';
argTypes['class'].control.type = 'check';
argTypes['class'].control.options = ['noBorder', 'grayTitle', 'gltStyle1', 'childrenGltStyle'];
export default {
  title: '数据展示/表格/hy-edit-table（可编辑表格）',
  component: HyEditTableComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockPricingService }, TableService]
    }),
  ],
  argTypes
} as Meta;

const Template: Story<HyEditTableComponent> = (args: any) => {
  args['search'] = () => {
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user', {}, {
      showMsg: true,
      glt: ['glt_userList'],
      gltNewSearch: true,
      successFn: (resBody) => {
        console.log(resBody)
      }
    });
  }

  args.onClick_DelUser = (data) => {
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/delete', { id: data.id }, {
      successFn: (resBody) => {
        console.log(resBody);
        mds['glt_userList'] = mds['glt_userList'].filter(item => item.id !== data.id);
      }
    })
  }

  args['startEdit'] = (item, hyEditTableComponent) => {
    hyEditTableComponent.editRow({
      item: item, initData() {
        $hyapi.model.setGtData(mds, 'gt_userList_edit', item);
        return true;
      }
    })
  }

  args['saveEdit'] = (item) => {
    const data = mds['glt_userList'] as Array<any>;
    const index = data.findIndex(thisItem => thisItem.id === item.id);
    mds['glt_userList'][index] = mds['gt_userList_edit'];
  }

  args['cancelEditTest'] = (hyEditTableComponent,item) => {
    console.log(hyEditTableComponent)
    if(hyEditTableComponent){
      hyEditTableComponent.cancelEdit(item);
    }
  }

  args['addUser'] = (hyEditTableComponent) => {
    hyEditTableComponent.addRow({
      initData() {
        mds['userList_edit'] = {};
        mds['isEdit'] = true;
        return true;
      }
    })
  }

  return {
    props: args,
    template: `
    <hy-form [(formValid)]="formValid">
      <hy-button (onClick)="addUser(hyEditTable)" type="primary" title="新增"></hy-button>
      <hy-button (onClick)="search()" type="primary" title="搜索"></hy-button>
      <hy-edit-table
        #hyEditTable
        title="可编辑表格" 
        [showCheckAll]="true" [showCheckbox]="true"
        model="userList" 
        [scroll]="{ x: '700px',y:'600px' }"
        [afterTemplate]="afterTemplate">
        <ng-template let-item="item" let-index="index">
          <td>
            <hy-cell nzLeft="true" width="100px" type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="年龄" model="age" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="生日" model="birthday" [item]="item" [index]="index"></hy-cell>
          </td>
  
          <td *ngFor="let listItem of list;let i = index;">
            <hy-cell *ngIf="i !== (list.length - 1)" type="text" [title]="listItem.title" [model]="listItem.model" [item]="item" [index]="index"></hy-cell>
            <hy-cell nzRight="true" type="button" title="操作" [item]="item" [index]="index" width="100px" *ngIf="i === list.length - 1">
              <ng-template let-item="item" let-index="index">
                <hy-cell-btn title="编辑" [btnLink]="true" (onClick)="startEdit(item,hyEditTable)"></hy-cell-btn>
              </ng-template>
            </hy-cell>
          </td>
        </ng-template>
      </hy-edit-table>

      <hy-gt title="编辑单记录表" model="userList_edit" [cols]="24" [class]="class" [showTitle]="false">
        <ng-template let-item="item" let-index="index" #afterTemplate>
          <td>
            <hy-readonly [noLabel]="true" [noColon]="true" model="id"></hy-readonly>
          </td>
          <td *ngFor="let listItem of list;let i = index;">
            <div *ngIf="false">
              <hy-number [noColon]="true" model="age" [ckRequired]="true" [labelWidth]="'15px'"></hy-number>
            </div>
            <div *ngIf="false">
              <hy-number [noColon]="true" model="age" [ckRequired]="true" [labelWidth]="'15px'"></hy-number>
            </div>
          </td>
          <td>
            <hy-date [noColon]="true" model="birthday" [ckRequired]="true" [labelWidth]="'15px'"></hy-date>
          </td>
          <td>
            <hy-cell type="button" nzRight="true" title="操作" [item]="item" [index]="index" width="160px">
              <ng-template let-item="item" let-index="index">
                <hy-button title="保存" type="link" (onClick)="saveEdit(item)"></hy-button>
                <hy-button title="取消" type="link" (onClick)="cancelEditTest(hyEditTable,item)" [check]="false"></hy-button>
              </ng-template>
            </hy-cell>
          </td>
        </ng-template>
      </hy-gt>
    </hy-form>
  `
  }
};

export const panel = Template.bind({});
panel.args = {
  formValid: false,
  list:[
    {
      model:'name',
      title:'用户名'
    },
    {
      model:'postId',
      title:'职位'
    },
    {
      model:'age',
      title:'年龄'
    },
  ]
}
panel.storyName = '默认模版';

const Template2: Story<HyEditTableComponent> = (args: any) => {
  args.onClick_DelUser = (data) => {
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/delete', { id: data.id }, {
      successFn: (resBody) => {
        console.log(resBody);
        mds['glt_userList'] = mds['glt_userList'].filter(item => item.id !== data.id);
      }
    })
  }

  args['startEdit'] = (item, hyEditTableComponent) => {
    hyEditTableComponent.editRow({
      item: item, initData() {
        $hyapi.model.setGtData(mds, 'gt_userList_edit', item);
        return true;
      }
    })
  }

  args['saveEdit'] = (item) => {
    const data = mds['glt_userList'] as Array<any>;
    const index = data.findIndex(thisItem => thisItem.id === item.id);
    mds['glt_userList'][index] = mds['gt_userList_edit'];
  }
  args['cancelEdit'] = (item, hyEditTableComponent) => {
    console.log(hyEditTableComponent)
    hyEditTableComponent.cancelEdit(item);
  }

  return {
    props: args,
    template: `
    <hy-form>
      <hy-edit-table
        #hyEditTable
        [showOrderNum]="true"
        orderNumName="行号"
        title="可编辑表格" 
        model="userList" 
        [afterTemplate]="afterTemplate">
        <ng-template let-item="item" let-index="index">
          <td nzLeft>
            <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
          </td>
          <td >
            <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="select" title="职位" model="postId" dic="testPost" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="年龄" model="age" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="生日" model="birthday" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="button" title="操作" [item]="item" [index]="index" width="160px">
              <ng-template let-item="item" let-index="index">
                <hy-cell-btn title="编辑" [btnLink]="true" (onClick)="startEdit(item,hyEditTable)"></hy-cell-btn>
              </ng-template>
            </hy-cell>
          </td>
        </ng-template>
      </hy-edit-table>

      <hy-gt title="编辑单记录表" model="userList_edit" [cols]="24" [class]="class" [showTitle]="false">
        <ng-template let-item="item" let-index="index" #afterTemplate>
          <td>
            <hy-readonly [noLabel]="true" [noColon]="true" model="id"></hy-readonly>
          </td>
          <td>
            <hy-text [noLabel]="true" [noColon]="true" model="name"></hy-text>
          </td>
          <td>
            <hy-select [noLabel]="true" [noColon]="true" model="postId" [cols]="24" dic="testPost"></hy-select>
          </td>
          <td>
            <hy-number [noColon]="true" model="age" [ckRequired]="true" [labelWidth]="'15px'"></hy-number>
          </td>
          <td>
            <hy-date [noColon]="true" model="birthday" [ckRequired]="true" [labelWidth]="'15px'"></hy-date>
          </td>
          <td>
            <hy-cell type="button" title="操作" [item]="item" [index]="index" width="160px">
              <ng-template let-item="item" let-index="index">
                <hy-button title="保存" type="link" (onClick)="saveEdit(item)"></hy-button>
                <hy-button title="取消" type="link" (onClick)="cancelEdit(item,hyEditTable)" [check]="false"></hy-button>
              </ng-template>
            </hy-cell>
          </td>
        </ng-template>
      </hy-gt>
    </hy-form>
  `
  }
};

export const panel2 = Template2.bind({});
panel2.storyName = '默认模板-显示行号';
