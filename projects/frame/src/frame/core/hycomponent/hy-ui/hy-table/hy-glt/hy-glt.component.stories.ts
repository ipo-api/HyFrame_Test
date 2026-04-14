import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyGltComponent } from './hy-glt.component';
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
        showMsg: false,
        glt: ['glt_userList'],
        successFn: (resBody) => {
          console.log(resBody)
        }
      });

      setTimeout(() => {
        // 无总数分页
        $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user', {noTotalPage:true}, {
          showMsg: false,
          glt: ['glt_userListNoTotalPage'],
          successFn: (resBody) => {
            console.log(resBody)
          }
        });
      }, 1000);
      
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

const argTypes = unit.createArgTypes('HyGltComponent');
argTypes['pageSizeOptions'].control.type = 'object';
argTypes['spreadCheckedData'].control.type = 'object';
argTypes['spreadCheckKeyNameList'].control.type = 'object';
argTypes['scroll'].control.type = 'object';
argTypes['class'].control.type = 'check';
argTypes['class'].control.options = ['noBorder', 'grayTitle', 'gltStyle1', 'childrenGltStyle'];
export default {
  title: '数据展示/表格/hy-glt（表格）',
  component: HyGltComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockPricingService }, TableService]
    }),
  ],
  argTypes
} as Meta;

const Template: Story<HyGltComponent> = (args: any) => {
  args.onClick_DelUser = (data) => {
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/delete', { id: data.id }, {
      successFn: (resBody) => {
        console.log(resBody);
        mds['glt_userList'] = mds['glt_userList'].filter(item => item.id !== data.id);
      }
    })
  }
  // args['sortFn'] = (sort, modelName) => {

  //   console.log('sort', sort)
  //   console.log('modelName', modelName)
  // }
  args['search'] = () => {
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
      <div hyFlexBox hyFlexBoxDirection="column">
        <div>
          <hy-gt model="userList" title="用户列表">
            <hy-text cols="12" title="用户编号222" model="id" (onKeyup.enter)="search()"></hy-text>
            <hy-button title="查询" (onClick)="search()"></hy-button>
          </hy-gt>
        </div>
        <div hyFlex="1" [scroll]="{ x: '700px',y:'600px' }">
          <hy-glt model="userList" class="gltStyle1" [showCheckAll]="true"  [pageSizeOptions]="pageSizeOptions" >
            <ng-template let-item="item" let-index="index">
              <td>
                <hy-cell [showSort]="true" type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
              </td>
              <td>
                <hy-cell [showSort]="true" type="text" title="年龄" model="age" [item]="item" [index]="index"></hy-cell>
              </td>
              <td>
                <hy-cell width="200px" type="button" title="操作" [item]="item" [index]="index">
                  <ng-template let-item="item" let-index="index">
                    <hy-button title="修改" (onClick)="onClick_EditUser(item)" btnClass="btn-circle btn-xs"></hy-button>
                    <hy-button title="删除" (onClick)="onClick_DelUser(item)" btnClass="btn-circle btn-xs"></hy-button>
                  </ng-template>
                </hy-cell>
              </td>
              <td>
                <hy-cell width="200px" type="button" title="操作1" [item]="item" [index]="index">
                  <ng-template let-item="item" let-index="index">
                    <hy-button title="修改" (onClick)="onClick_EditUser(item)" btnClass="btn-circle btn-xs"></hy-button>
                    <hy-button title="删除" (onClick)="onClick_DelUser(item)" btnClass="btn-circle btn-xs"></hy-button>
                  </ng-template>
                </hy-cell>
              </td>
            </ng-template>
          </hy-glt>
        </div>
      </div>
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
  pageSizeOptions: [10, 20],
  titleList:[
    {
      title:'用户名', 
      model:'name',
      width:'150px'
    },
    {
      title:'用户编号',
      model:'id',
      width:'100px',
    },
    {
      title:'年龄',
      model:'age', 
    },
  ]
};
panel.storyName = '默认模板';

// 有滚动条的模板
const Template2: Story<HyGltComponent> = (args: HyGltComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-glt title="用户列表" model="userList" [scroll]="{ x: '700px',y:'600px' }" [showCheckbox]="true">
      <ng-template let-item="item" let-index="index">
        <td> 
          <hy-cell width="200px" type="text" title="生日" nzLeft="true" model="birthday" [item]="item" [index]="index"></hy-cell>
        </td>
        <td *ngFor="let item2 of titleList;let last = last">
          <hy-cell *ngIf="!last" [width]="item2.width" [nzLeft]="item2.nzLeft" [nzRight]="item2.nzRight" type="text" [title]="item2.title" [model]="item2.model" [item]="item" [index]="index"></hy-cell>
          <hy-cell *ngIf="last" width="200px" [nzRight]="true" type="button" title="操作" [item]="item" [index]="index">
            <ng-template let-item="item" let-index="index">
              <hy-button title="修改" (onClick)="onClick_EditUser(item)" btnClass="btn-circle btn-xs"></hy-button>
              <hy-button title="删除" (onClick)="onClick_DelUser(item)" btnClass="btn-circle btn-xs"></hy-button>
            </ng-template>
          </hy-cell>
        </td>

        
      </ng-template>
    </hy-glt>
    <hy-button title="显示生日" (onClick)="isShow = !isShow"></hy-button>
  </hy-form>  
  `
});

export const panel2 = Template2.bind({});
panel2.args = {
  title: '用户列表',
  isShow: false,
  tip: '提示',
  model: 'userList',
  scroll: { x: '700px' },
  // showRadio: true,
  showOrderNum: true,
  OrderNumName: '序号',
  // showCheckAll:true,
  showCheckbox: true,
  titleList:[
    {
      title:'用户名', 
      model:'name',
      width:'150px'
    },
    {
      title:'用户编号',
      model:'id',
      width:'100px',

    },
    {
      title:'年龄',
      model:'age',
      width:'100px',
      nzRight:true
    },
    {
      title:'操作',
    }
  ],
  search: () => {
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
};
panel2.storyName = '固定列模板';
panel2.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <hy-form>
        <hy-glt title="用户列表" model="userList" [scroll]="{ x: '700px',y:'600px' }" [showExpand]="true">
          <ng-template let-item="item" let-index="index">
            <td *ngFor="let item2 of titleList">
              <hy-cell [width]="item2.width" [nzLeft]="item2.nzLeft" [nzRight]="item2.nzRight" type="text" [title]="item2.title" [model]="item2.model" [item]="item" [index]="index"></hy-cell>
            </td>
            <td>
              <hy-cell width="200px" type="text" title="生日" model="birthday" [item]="item" [index]="index"></hy-cell>
            </td>
            <td>
              <hy-cell width="200px" nzRight="true" type="button" title="操作" [item]="item" [index]="index">
                <ng-template let-item="item" let-index="index">
                  <hy-button title="修改" (onClick)="onClick_EditUser(item)" btnClass="btn-circle btn-xs"></hy-button>
                  <hy-button title="删除" (onClick)="onClick_DelUser(item)" btnClass="btn-circle btn-xs"></hy-button>
                </ng-template>
              </hy-cell>
            </td>
          </ng-template>
        </hy-glt>
      </hy-form>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      传入参数scroll，根据需求设置宽高（{ x: '700px',y:'600px' }）
      如果要使用固定列，需在hy-cell中设置nzLeft或者nzRight属性，nzLeft和nzRight不需要输入具体数值，只需要传入true即可，可以字符串类型true
      设置nzLeft时，需确保当前设置的是第一列或前一列存在nzLeft
      设置nzRight时，需确保当前设置的是最后一列或后一列存在nzRight
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

// 多选模式
const Template3: Story<HyGltComponent> = (args: HyGltComponent) => {
  args['search'] = () => {
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
      <hy-gt model="userList">
        <hy-text cols="12" title="用户编号" model="id" (onKeyup.enter)="search()"></hy-text>
        <button (click)="search()">123</button>
        <hy-button title="查询" (onClick)="search()"></hy-button>
      </hy-gt>
      <hy-glt [showCheckbox]="showCheckbox" [showCheckAll]="true" title="用户列表" model="userList">
        <ng-template let-item="item" let-index="index">
          <td>
            <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
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
          <td [nzRight]="'0'">
            <hy-cell width="200px" [nzRight]="'0'" type="button" title="操作" [item]="item" [index]="index">
              <ng-template let-item="item" let-index="index">
                <hy-button title="修改" (onClick)="onClick_EditUser(item)" btnClass="btn-circle btn-xs"></hy-button>
                <hy-button title="删除" (onClick)="onClick_DelUser(item)" btnClass="btn-circle btn-xs"></hy-button>
              </ng-template>
            </hy-cell>
          </td>
        </ng-template>
      </hy-glt>
    </hy-form>  
    `
  }
};

export const panel3 = Template3.bind({});
panel3.args = {
  isEllipsis: true,
  title: '用户列表',
  tip: '提示',
  model: 'userList',
  scroll: { y: '800px', x: '1000px' },
  showCheckbox: true,
  isAllDisplayDataChecked: false,
  pageSizeOptions: [10, 20],
  showOrderNum: true
};
panel3.storyName = '多选模式';

const Template31: Story<HyGltComponent> = (args: any) => {
  args['search'] = (spreadCheckedData) => {
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
      <hy-gt model="userList">
        <hy-text cols="12" title="用户编号" model="id" (onKeyup.enter)="search()"></hy-text>
        <hy-button title="查询" (onClick)="search(spreadCheckedData)"></hy-button>
      </hy-gt>

      <hy-glt 
        model="userList" 
        [scroll]="{ x: '700px',y:'600px' }"
        [showCheckAll]="true">
        <ng-template let-item="item" let-index="index">
          <td>
            <hy-cell nzLeft="true" type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="select" title="职位" model="postId" dic="testPost" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="年龄" model="age" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell nzRight="true" type="text" title="生日" model="birthday" [item]="item" [index]="index"></hy-cell>
          </td>
        </ng-template>
      </hy-glt>
    </hy-form>  
    `
  }
};

export const panel31 = Template31.bind({});
panel31.args = {
  spreadCheckedData:[]
}
panel31.storyName = '多选模式-跨页全选';


// glt跨页多选
const Template32: Story<HyGltComponent> = (args: any) => {
  args['search'] = (gltNewSearch:boolean) => {
    const data = {};
    if (mds['gt_userList'].id) {
      data['id'] = mds['gt_userList'].id;
    }
    
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user', mds['gt_userList'], {
      showMsg: false,
      glt: ['glt_userList'],
      gltNewSearch: gltNewSearch ?? true,
      successFn: (resBody) => {
        console.log(resBody)
      }
    });
  }
  args['delete'] = (spreadCheckedData)=>{
    console.log(spreadCheckedData)
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/deleteList',{deleteList:spreadCheckedData}, {
      showMsg: true,
      successFn: (resBody) => {
        console.log(resBody)
        args['search'](false);
      }
    });
  }

  return {
    props: args,
    template: `
    <hy-form>
      <hy-gt model="userList">
        <hy-text cols="12" title="用户编号" model="id" (onKeyup.enter)="search()"></hy-text>
        <hy-button title="查询" (onClick)="search(spreadCheckedData)"></hy-button>
        <hy-button title="删除" (onClick)="delete(spreadCheckedData)"></hy-button>
      </hy-gt>

      <hy-glt 
        model="userList" 
        [showCheckbox]="true" 
        [isSpreadCheckbox]="true"
        spreadCheckKeyName="id"
        [spreadCheckKeyNameList]="spreadCheckKeyNameList"
        [(spreadCheckedData)]="spreadCheckedData"
        (spreadCheckedDataChange)="spreadCheckedDataChange($event)"
        (onCheckOneChange)="onCheckOneChange($event)">
        <ng-template let-item="item" let-index="index">
          <td>
            <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
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
        </ng-template>
      </hy-glt>
    </hy-form>  
    `
  }
};
const spreadCheckedData1 = [];
for (let i = 0; i < 20; i++) {
  spreadCheckedData1.push({
    id:i + ''
  })
}
export const panel32 = Template32.bind({});
panel32.args = {
  spreadCheckedData: [],
  spreadCheckKeyName:'id',
  spreadCheckKeyNameList:['name','age']
}
panel32.storyName = '多选模式-跨页多选';

// glt跨页多选
const Template321: Story<HyGltComponent> = (args: any) => {
  args['search'] = (spreadCheckedData) => {
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
      <hy-gt model="userList">
        <hy-text cols="12" title="用户编号" model="id" (onKeyup.enter)="search()"></hy-text>
        <hy-button title="查询" (onClick)="search(spreadCheckedData)"></hy-button>
      </hy-gt>

      <hy-glt 
        title="跨页多选" 
        model="userList" 
        [showCheckbox]="true" 
        [isSpreadCheckbox]="true"
        spreadCheckKeyName="id"
        [(spreadCheckedData)]="spreadCheckedData"
        (spreadCheckedDataChange)="spreadCheckedDataChange($event)"
        (onCheckOneChange)="onCheckOneChange($event)">
        <ng-template let-item="item" let-index="index">
          <td>
            <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
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
        </ng-template>
      </hy-glt>
    </hy-form>  
    `
  }
};
export const panel321 = Template321.bind({});
panel321.args = {
  spreadCheckedData: spreadCheckedData1,
  spreadCheckKeyName:'id',
}
panel321.storyName = '多选模式-跨页多选，双向绑定数据';

// glt跨页多选
const Template322: Story<HyGltComponent> = (args: any) => {
  return {
    props: args,
    template: `
    <hy-form>
      <hy-glt 
        title="跨页多选" 
        model="userList" 
        [showCheckbox]="true" 
        [isSpreadCheckbox]="true"
        spreadCheckKeyName="id"
        [spreadCheckKeyNameList]="spreadCheckKeyNameList"
        [(spreadCheckedData)]="spreadCheckedData"
        (spreadCheckedDataChange)="spreadCheckedDataChange($event)"
        (onCheckOneChange)="onCheckOneChange($event)">
        <ng-template let-item="item" let-index="index">
          <td>
            <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
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
        </ng-template>
      </hy-glt>
    </hy-form>  
    `
  }
};
export const panel322 = Template322.bind({});
const spreadCheckedData2 = [];
for (let i = 0; i < 20; i++) {
  spreadCheckedData2.push({
    id:i + '',
    name:'name' + i,
    age:18
  })
}
panel322.args = {
  spreadCheckedData: spreadCheckedData2,
  spreadCheckKeyName:'id',
  spreadCheckKeyNameList:['name','age']
}
panel322.storyName = '多选模式-跨页多选，自定义返回字段';

// 提供单选
const Template4: Story<HyGltComponent> = (args: HyGltComponent) => ({
  props: args,
  template: `
  <hy-form *ngIf="true">
    <hy-glt [showRadio]="showRadio" title="用户列表" model="userList">
      <ng-template let-item="item" let-index="index">
        <td>
          <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
        </td>
        <td>
          <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
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
        <td [nzRight]="'0'">
          <hy-cell width="200px" [nzRight]="'0'" type="button" title="操作" [item]="item" [index]="index">
            <ng-template let-item="item" let-index="index">
              <hy-button title="修改" (onClick)="onClick_EditUser(item)" btnClass="btn-circle btn-xs"></hy-button>
              <hy-button title="删除" (onClick)="onClick_DelUser(item)" btnClass="btn-circle btn-xs"></hy-button>
            </ng-template>
          </hy-cell>
        </td>
      </ng-template>
    </hy-glt>
  </hy-form>  
  `
});

export const panel4 = Template4.bind({});
panel4.args = {
  isEllipsis: true,
  title: '用户列表',
  tip: '提示',
  model: 'userList',
  scroll: { y: '800px', x: '1000px' },
  showRadio: true,
  showOrderNum: true,
  search: () => {
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
};
panel4.storyName = '单选模式';


// 两层嵌套
const Template5: Story<HyGltComponent> = (args: HyGltComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-glt [showOrderNum]="true" [showCheckbox]="true" [isEllipsis]="true" title="用户列表" tip="提示" [noTotalPage]="noTotalPage" model="userList" [showExpand]="true" [childrenTemplate]="childrenTemplateTest">
      <ng-template let-item="item" let-index="index">
        <td>
          <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
        </td>
        <td>
          <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
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
          <hy-cell type="button" title="操作" [item]="item" [index]="index">
            <ng-template let-item="item" let-index="index">
              <hy-cell-btn title="删除"></hy-cell-btn>
            </ng-template>
          </hy-cell>
        </td>
      </ng-template>

      <ng-template let-item="item" let-index="index" #childrenTemplateTest>
        <hy-glt title="子列表" model="userWages" [noTotalPage]="noTotalPage" [showTitle]="false" class="childrenGltStyle">
          <ng-template let-item="item" let-index="index">
            <td>
              <hy-cell type="text" title="编号" model="id" [item]="item" [index]="index"></hy-cell>
            </td>
            <td>
              <hy-cell type="text" title="日期" model="date" [item]="item" [index]="index"></hy-cell>
            </td>
            <td>
              <hy-cell type="text" title="工资" model="money" [item]="item" [index]="index"></hy-cell>
            </td>
          </ng-template>
        </hy-glt>
      </ng-template>
    </hy-glt>
  </hy-form>  
  `
});

export const panel5 = Template5.bind({});
panel5.args = {
  noTotalPage: true,
  tdList: [
    { title: '编号', model: 'id' },
    { title: '日期', model: 'date' },
    { title: '工资', model: 'money' },
  ],
  tabs: [
    {
      id: '1',
      title: 'test1'
    },
    {
      id: '2',
      title: 'test2'
    },
  ],
  search: (item) => {
    console.log('open')
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/wages', {}, {
      showMsg: false,
      glt: ['glt_userWages'],
      successFn: (resBody) => {
        mds['glt_userList'].forEach(element => {
          if (element.id !== item.item.id) {
            element['expand'] = false;
          }

        });
      }
    });
  }
};
panel5.storyName = '嵌套模式';

// 本地数据
const Template6: Story<HyGltComponent> = (args: HyGltComponent) => ({
  props: {
    ...args,
    sortFn: (sort,modelName)=>{
      let gltData: Array<any> = mds['glt_localDatas'];
      gltData.sort((a, b) => {
        if (sort == 'ascend') {
          return a[modelName].localeCompare(b[modelName]);
        } else if (sort == 'descend') {
          return b[modelName].localeCompare(a[modelName]);
        }
      });
      console.log(gltData);
      
    }
  },
  template: `
  <hy-form>
    <hy-glt 
      [frontPagination]="true" 
      (spreadCheckedDataChange)="spreadCheckedDataChange($event)" 
      title="用户列表" 
      tip="提示"
      model="localDatas"   
      spreadCheckKeyName="id" 
      [(spreadCheckedData)]="spreadCheckedData" 
      [isSpreadCheckbox]="true" 
      [showCheckbox]="true" 
      [showCheckAll]="true" [noTotalPage]="noTotalPage">
      <ng-template let-item="item" let-index="index">
        <td>
          <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
        </td>
        <td>
          <hy-cell [showSort]="true" [sortFn]="sortFn" type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
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
          <hy-cell type="button" title="操作" [item]="item" [index]="index">
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

export const panel6 = Template6.bind({});
panel6.args = {
  spreadCheckedData:spreadCheckedData1,
}
panel6.storyName = '本地数据';

const Template8: Story<HyGltComponent> = (args: any) => {
  args.onClick_DelUser = (data) => {
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/delete', { id: data.id }, {
      successFn: (resBody) => {
        $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user', mds['gt_userList'], {
          showMsg: false,
          glt: ['glt_userList'],
          gltNewSearch: false,
          successFn: (resBody) => {
            console.log(resBody)
          }
        });
      }
    })
  }
  args['search'] = () => {
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
      <hy-gt model="userList">
        <hy-text cols="12" title="用户编号" model="id" (onKeyup.enter)="search()"></hy-text>
        <hy-button title="查询" (onClick)="search()"></hy-button>
      </hy-gt>
      <hy-glt model="userList" [noTotalPage]="true">
        <ng-template let-item="item" let-index="index">
          <td>
            <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
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
            <hy-cell width="200px" type="button" title="操作" [item]="item" [index]="index">
              <ng-template let-item="item" let-index="index">
                <hy-button title="修改" (onClick)="onClick_EditUser(item)" btnClass="btn-circle btn-xs"></hy-button>
                <hy-button title="删除" (onClick)="onClick_DelUser(item)" btnClass="btn-circle btn-xs"></hy-button>
              </ng-template>
            </hy-cell>
          </td>
        </ng-template>
      </hy-glt>
    </hy-form>  
    `
  }
};

export const panel8 = Template8.bind({});
panel8.args = {
  isEllipsis: false,
  title: '用户列表',
  tip: '提示',
  model: 'userList',
  class: null,
  showCheckAll: true,
  noTotalPage: true,
  pageSizeOptions: [10, 20],
  search: () => {
    const data = {};
    if (mds['gt_userList'].id) {
      data['id'] = mds['gt_userList'].id;
    }
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user', mds['gt_userList'], {
      showMsg: false,
      glt: ['glt_userList'],
      showLoading: true,
      gltNewSearch: true,
      successFn: (resBody) => {
        console.log(resBody)
      }
    });
  }
};
panel8.storyName = '无总数分页';

const Template80: Story<HyGltComponent> = (args: any) => {
  args.onClick_DelUser = (data) => {
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/delete', { id: data.id }, {
      successFn: (resBody) => {
        args['search'](false);
      }
    })
  }
  args['search'] = (gltNewSearch) => {
    const data = {};
    if (mds['gt_userList'].id) {
      data['id'] = mds['gt_userList'].id;
    }
    data['noTotalPage'] = true;
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user', data, {
      showMsg: false,
      glt: ['glt_userListNoTotalPage'],
      gltNewSearch: gltNewSearch ?? true,
      successFn: (resBody) => {
        console.log(resBody)
      }
    });
  }
  args['delete'] = (spreadCheckedData)=>{
    console.log(spreadCheckedData)
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/deleteList',{deleteList:spreadCheckedData}, {
      showMsg: true,
      successFn: (resBody) => {
        console.log(resBody)
        args['search'](false);
      }
    });
  }
  return {
    props: args,
    template: `
    <hy-form>
      <hy-gt model="userList">
        <hy-text cols="12" title="用户编号" model="id" (onKeyup.enter)="search()"></hy-text>
        <hy-button title="查询" (onClick)="search()"></hy-button>
        <hy-button title="删除" (onClick)="delete(spreadCheckedData)"></hy-button>
      </hy-gt>
      <hy-glt
        model="userListNoTotalPage" 
        [noTotalPage]="true" 
        [showCheckbox]="true" 
        [isSpreadCheckbox]="true" 
        (spreadCheckedDataChange)="spreadCheckedDataChange($event)" 
        [(spreadCheckedData)]="spreadCheckedData" 
        spreadCheckKeyName="id">
        <ng-template let-item="item" let-index="index">
          <td>
            <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
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
            <hy-cell width="200px" type="button" title="操作" [item]="item" [index]="index">
              <ng-template let-item="item" let-index="index">
                <hy-button title="修改" (onClick)="onClick_EditUser(item)" btnClass="btn-circle btn-xs"></hy-button>
                <hy-button title="删除" (onClick)="onClick_DelUser(item)" btnClass="btn-circle btn-xs"></hy-button>
              </ng-template>
            </hy-cell>
          </td>
        </ng-template>
      </hy-glt>
    </hy-form>  
    `
  }
};

export const panel80 = Template80.bind({});
panel80.args = {
  isEllipsis: false,
  title: '用户列表',
  tip: '提示',
  model: 'userList',
  class: null,
  showCheckAll: true,
  noTotalPage: true,
  pageSizeOptions: [10, 20],
  spreadCheckedData:[],
};
panel80.storyName = '无总数分页-跨页多选';

// 无总数分页-总数查询
const Template81: Story<HyGltComponent> = (args: any) => {
  args.onClick_DelUser = (data) => {
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/delete', { id: data.id }, {
      successFn: (resBody) => {
        $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user', mds['gt_userList'], {
          showMsg: false,
          glt: ['glt_userList'],
          gltNewSearch: false,
          successFn: (resBody) => {
            console.log(resBody)
          }
        });
      }
    })
  }
  args['search'] = () => {
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
      <hy-gt model="userList">
        <hy-text cols="12" title="用户编号" model="id" (onKeyup.enter)="search()"></hy-text>
        <hy-button title="查询" (onClick)="search()"></hy-button>
      </hy-gt>
      <hy-glt model="userList" [noTotalPage]="true" [showRefresh]="true" [countUrl]="countUrl">
        <ng-template let-item="item" let-index="index">
          <td>
            <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
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
            <hy-cell width="200px" type="button" title="操作" [item]="item" [index]="index">
              <ng-template let-item="item" let-index="index">
                <hy-button title="修改" (onClick)="onClick_EditUser(item)" btnClass="btn-circle btn-xs"></hy-button>
                <hy-button title="删除" (onClick)="onClick_DelUser(item)" btnClass="btn-circle btn-xs"></hy-button>
              </ng-template>
            </hy-cell>
          </td>
        </ng-template>
      </hy-glt>
    </hy-form>  
    `
  }
};

export const panel81 = Template81.bind({});
panel81.args = {
  isEllipsis: false,
  title: '用户列表',
  tip: '提示',
  model: 'userList',
  countUrl: 'http://10.40.92.15:3001/mock/table/user',
  class: null,
  showCheckAll: true,
  noTotalPage: true,
  pageSizeOptions: [10, 20],
  search: () => {
    const data = {};
    if (mds['gt_userList'].id) {
      data['id'] = mds['gt_userList'].id;
    }
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user', mds['gt_userList'], {
      showMsg: false,
      glt: ['glt_userList'],
      showLoading: true,
      gltNewSearch: true,
      successFn: (resBody) => {
        console.log(resBody)
      }
    });
  }
};
panel81.storyName = '无总数分页-总数查询';

const Template82: Story<HyGltComponent> = (args: any) => {
  args.onClick_DelUser = (data) => {
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/delete', { id: data.id }, {
      successFn: (resBody) => {
        args['search'](false);
      }
    })
  }
  args['search'] = (gltNewSearch) => {
    const data = {};
    if (mds['gt_userList'].id) {
      data['id'] = mds['gt_userList'].id;
    }
    data['noTotalPage'] = true;
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user', data, {
      showMsg: false,
      glt: ['glt_userListNoTotalPage'],
      gltNewSearch: gltNewSearch ?? true,
      successFn: (resBody) => {
        console.log(resBody)
      }
    });
  }
  args['deleteAll'] = ()=>{
    console.log()
    console.log(mds)
    console.log(mds['glt_userListNoTotalPage_$Property']);
    if(mds['glt_userListNoTotalPage_$Property'].checkAllPageData){
      $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/deleteAll',{}, {
        showMsg: true,
        successFn: (resBody) => {
          console.log(resBody)
          args['search'](false);
        }
      });
    }
  }
  args['delete'] = (spreadCheckedData)=>{
    console.log(spreadCheckedData)
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/deleteList',{deleteList:spreadCheckedData}, {
      showMsg: true,
      successFn: (resBody) => {
        console.log(resBody)
        args['search'](false);
      }
    });
  }
  return {
    props: args,
    template: `
    <hy-form>
      <hy-gt model="userList">
        <hy-text cols="12" title="用户编号" model="id" (onKeyup.enter)="search()"></hy-text>
        <hy-button title="查询" (onClick)="search()"></hy-button>
        <hy-button title="删除" (onClick)="delete(spreadCheckedData)"></hy-button>
        <hy-button title="删除全部" (onClick)="deleteAll()"></hy-button>
      </hy-gt>
      <hy-glt
        model="userListNoTotalPage" 
        [showOrderNum]="true" 
        [showRefresh]="true" 
        [showCheckbox]="true" 
        [showCheckAll]="true" 
        [isSpreadCheckbox]="true"  
        spreadCheckKeyName="id" 
        [(spreadCheckedData)]="spreadCheckedData" 
        [pageSizeOptions]="[10, 20, 30, 40, 50]" 
        [noTotalPage]="true">
        <ng-template let-item="item" let-index="index">
          <td>
            <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
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
            <hy-cell width="200px" type="button" title="操作" [item]="item" [index]="index">
              <ng-template let-item="item" let-index="index">
                <hy-button title="修改" (onClick)="onClick_EditUser(item)" btnClass="btn-circle btn-xs"></hy-button>
                <hy-button title="删除" (onClick)="onClick_DelUser(item)" btnClass="btn-circle btn-xs"></hy-button>
              </ng-template>
            </hy-cell>
          </td>
        </ng-template>
      </hy-glt>
    </hy-form>  
    `
  }
};

export const panel82 = Template82.bind({});
panel82.args = {
  pageSizeOptions: [10, 20],
  spreadCheckedData:[],
};
panel82.storyName = '无总数分页-跨页全选';

const Template9: Story<HyGltComponent> = (args: any) => {
  args.onClick_DelUser = (data) => {
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user/delete', { id: data.id }, {
      successFn: (resBody) => {
        console.log(resBody);
        mds['glt_userList'] = mds['glt_userList'].filter(item => item.id !== data.id);
      }
    })
  }
  args['search'] = () => {
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
      <hy-gt model="userList">
        <hy-text cols="12" title="用户编号" model="id" (onKeyup.enter)="search()"></hy-text>
        <hy-button title="查询" (onClick)="search()"></hy-button>
      </hy-gt>
      <hy-glt model="userList" [showRefresh]="true" [noTotalPage]="true">
        <ng-template let-item="item" let-index="index">
          <td>
            <hy-cell type="text" title="用户名" model="name" [item]="item" [index]="index"></hy-cell>
          </td>
          <td>
            <hy-cell type="text" title="用户编号" model="id" [item]="item" [index]="index"></hy-cell>
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
            <hy-cell width="200px" type="button" title="操作" [item]="item" [index]="index">
              <ng-template let-item="item" let-index="index">
                <hy-button title="修改" (onClick)="onClick_EditUser(item)" btnClass="btn-circle btn-xs"></hy-button>
                <hy-button title="删除" (onClick)="onClick_DelUser(item)" btnClass="btn-circle btn-xs"></hy-button>
              </ng-template>
            </hy-cell>
          </td>
        </ng-template>
      </hy-glt>
    </hy-form>  
    `
  }
};

export const panel9 = Template9.bind({});
panel9.args = {
  search: () => {
    const data = {};
    if (mds['gt_userList'].id) {
      data['id'] = mds['gt_userList'].id;
    }
    $hyapi.io.post(mds, 'http://10.40.92.15:3001/mock/table/user', mds['gt_userList'], {
      showMsg: false,
      glt: ['glt_userList'],
      showLoading: true,
      gltNewSearch: true,
      successFn: (resBody) => {
        console.log(resBody)
      }
    });
  }
};
panel9.storyName = '无总数分页-数据刷新';