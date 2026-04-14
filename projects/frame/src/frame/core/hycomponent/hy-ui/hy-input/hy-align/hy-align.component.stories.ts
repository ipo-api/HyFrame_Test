import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyAlignComponent } from './hy-align.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { $hyapi, ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';

let _this;

class MockPricingService implements Partial<ModelService> {
  constructor() {
    _this = this;
    setTimeout(() => {
      // this['gt_test'].readonly = '1';
      // $hyapi.io.post(_this, 'http://10.40.92.15:3001/mock/table/user', {}, {
      //   showMsg: false,
      //   glt: ['glt_userList'],
      //   successFn: (resBody) => {
      //     console.log(resBody)
      //   }
      // });

      $hyapi.io.post(_this, 'http://10.40.92.15:3001/mock/table/user', {}, {
        showMsg: false,
        glt: ['glt_userList'],
        successFn: (resBody) => {
          console.log(resBody)
        }
      });
    }, 100);
  }
}


const argTypes = unit.createArgTypes('HyAlignComponent');
const labelString = unit.createLabel('hy-align', argTypes);
export default {
  title: '布局组件/hy-align（布局）',
  component: HyAlignComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, { provide: ModelService, useClass: MockPricingService }]
    }),
  ],
  argTypes
} as Meta;

const Template: Story<HyAlignComponent> = (args: HyAlignComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test">
      ${labelString}
        <ng-template #leftTemplate>
          <hy-text flex="300px" [noLabel]="true" model="text" placeholder="星期几"></hy-text>
        </ng-template>
        <ng-template #rightTemplate>
          <hy-button title="新增" type="primary" (onClick)="add()"></hy-button>
        </ng-template>
      </hy-align>
    </hy-gt>
  </hy-form>
  `
});
const data = {
};
export const panel = Template.bind({});
panel.args = data;
panel.storyName = '默认模板';

const Template2: Story<HyAlignComponent> = (args: HyAlignComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test" [noBorder]="true" [noPadding]="true">
      <hy-align type="layout" [showLeftBtn]="true" [isShowMainBorder]="true" [leftTemplate]="leftTemplate" [rightTemplate]="rightTemplate">
        <ng-template #leftTemplate>
          <hy-button title="新增" type="primary" (onClick)="add()"></hy-button>
        </ng-template>
        <ng-template #rightTemplate>
         <div>
          <hy-select dic="testWeek" flex="100px" model="week1" placeholder="星期几" [noLabel]="true" [noColon]="true"></hy-select>
          <hy-select dic="testWeek" flex="200px" model="week2" placeholder="星期几" [noLabel]="true" [noColon]="true"></hy-select>
          <hy-select dic="testWeek" flex="300px" model="week3" placeholder="星期几" [noLabel]="true" [noColon]="true"></hy-select>
         </div>
        </ng-template>
      </hy-align>
    </hy-gt>
  </hy-form>
  `
});
const data2 = {
  type: 'layout',
  showLeftBtn: true,
  isShowMainBorder: true
};
export const panel2 = Template2.bind({});
panel2.storyName = '收放模板';
panel2.args = data2;

// 收放模板2
const Template3: Story<HyAlignComponent> = (args: HyAlignComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test" [noBorder]="true" [noPadding]="true">
      <hy-align [noGtAndGltBorder]="true" [isShowAlignBorder]="false"  background="#fff" type="layout" [showLeftBtn]="true" leftWidth="270px" mainBorderWidth="16px" [leftTemplate]="leftTemplate" [rightTemplate]="rightTemplate">
        <ng-template #leftTemplate>
        <hy-tree [datas]="datas" [showLine]="showLine" [fullHeight]="fullHeight" [isAutoSetLeaf]="false" [expandAll]="expandAll" [(activeNode)]="activeNode" [expandLevel]="expandLevel"></hy-tree>
        </ng-template>
        <ng-template #rightTemplate>
          <hy-form>
            <hy-gt model="gt">
              <hy-text title="111122" model="text" cols="12"></hy-text>
              <hy-text title="1111" model="text" cols="12"></hy-text>
            </hy-gt>
            <hy-glt
              model="userList"
              [showCheckAll]="true"
              [noTotalPage]="noTotalPage"
              OrderNumName="序号"
              [pageSizeOptions]="pageSizeOptions"
              [showOrderNum]="true"
            >
                <ng-template let-item="item" let-index="index">
                  <td>
                    <hy-cell
                      type="text"
                      title="用户名"
                      model="name"
                      [item]="item"
                      [index]="index"
                    ></hy-cell>
                  </td>
                  <td>
                    <hy-cell
                      type="text"
                      title="用户编号"
                      model="id"
                      [item]="item"
                      [index]="index"
                    ></hy-cell>
                  </td>
                  <td>
                    <hy-cell
                      type="select"
                      title="职位"
                      model="postId"
                      dic="testPost"
                      [item]="item"
                      [index]="index"
                    ></hy-cell>
                  </td>
                  <td>
                    <hy-cell
                      type="text"
                      title="年龄"
                      model="age"
                      [item]="item"
                      [index]="index"
                    ></hy-cell>
                  </td>
                  <td>
                    <hy-cell
                      type="text"
                      title="生日"
                      model="birthday"
                      [item]="item"
                      [index]="index"
                    ></hy-cell>
                  </td>
                  <td>
                    <hy-cell
                      width="200px"
                      type="button"
                      title="操作"
                      [item]="item"
                      [index]="index"
                    >
                      <ng-template let-item="item" let-index="index">
                        <hy-button
                          title="修改"
                          (onClick)="onClick_EditUser(item)"
                          btnClass="btn-circle btn-xs"
                        ></hy-button>
                        <hy-button
                          title="删除"
                          (onClick)="onClick_DelUser(item)"
                          btnClass="btn-circle btn-xs"
                        ></hy-button>
                      </ng-template>
                    </hy-cell>
                  </td>
                </ng-template>
              </hy-glt>
          </hy-form>
     
        </ng-template>
      </hy-align>
    </hy-gt>
  </hy-form>
  `
});
const data3 = {
  type: 'layout',
  showLeftBtn: true,
  mainBorderWidth: '16px',
  fullHeight: false,
  showLine: true,
  expandAll: false,
  expandLevel: 1,
  activeNode: '1',
  noGtBorder: true,
  noGltBorder: true,
  datas: [
    {
      title: '公司',
      key: '1',
      level: 0,
      children: [
        {
          title: '研发组',
          key: '1-1',
          level: 1,
          children: [
            { title: '研发组1', key: '1-1-1', level: 2 },
            { title: '研发组2', key: '1-1-2', level: 2 },
          ],
        },
        {
          title: '产品组',
          key: '1-1-3',
          level: 1,
          children: [
            { title: '产品组1', key: '1-1-2-1', level: 2 },
            { title: '产品组2', key: '1-1-2-2', level: 2, children: [{ title: '产品组2-1', key: '1-1-2-2-1', level: 3 }] },
          ],
        },
        {
          title: '销售组',
          key: '2-1',
          level: 1,
          children: [{ title: '销售组1', key: '1-2-1', level: 2 }],
        },
      ],
    },
  ]
};
export const panel3 = Template3.bind({});
panel3.storyName = '收放模板2';
panel3.args = data3;

// 收放模板-占满高度
const Template4: Story<HyAlignComponent> = (args: HyAlignComponent) => {
  args['search'] = () => {
    const data = {};
    if (_this['gt_userList'].id) {
      data['id'] = _this['gt_userList'].id;
    }
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/mock/table/user', _this['gt_userList'], {
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
      <div class="hy-layout-content" style="height: 100%;border:1px solid;background: #f0f2f5;">
        <div hyFlexBox hyFlexBoxDirection="column">
          <div>
            <hy-form>
              <hy-align [leftTemplate]="leftTitle" [rightTemplate]="rightButton">
                <ng-template #leftTitle>
                  <hy-title [title]="'FavoriteQuery.hy-title.title.收藏管理' | i18n"></hy-title>
                </ng-template>
                <ng-template #rightButton>
                  <hy-button nzIconName="desktop" size="default" type="primary" [check]="false" title="按钮"></hy-button>
                </ng-template>
              </hy-align>
            </hy-form>
          </div>
          <div hyFlex="1">
            <hy-align [fullHeight]="true" [noGtAndGltBorder]="true" [isShowAlignBorder]="true" [isShowMainBorder]="true" background="#fff" type="layout" [showLeftBtn]="true" leftWidth="270px" mainBorderWidth="17px" [leftTemplate]="leftTemp" [rightTemplate]="rightTemp">
              <ng-template #leftTemp>
                xxxxxxxxxxxxxx
                <hy-form>
                  <hy-gt model="userList">
                    <hy-select dic="testWeek" flex="100px" model="week1" placeholder="星期几" [noLabel]="true" [noColon]="true"></hy-select>
                    <hy-select dic="testWeek" flex="200px" model="week2" placeholder="星期几" [noLabel]="true" [noColon]="true"></hy-select>
                    <hy-select dic="testWeek" flex="300px" model="week3" placeholder="星期几" [noLabel]="true" [noColon]="true"></hy-select>
                  </hy-gt>
                </hy-form>
              </ng-template>
              <ng-template #rightTemp>
                <hy-form>
                  <div hyFlexBox hyFlexBoxDirection="column">
                    <div>
                      <hy-gt model="userList">
                        <hy-text title="ID" model="id" cols="12"></hy-text>
                        <hy-button title="查询" model="text" cols="12" (onClick)="search()"></hy-button>
                      </hy-gt>
                    </div>
                    <div hyFlex="1">
                      <hy-glt model="userList" [noTotalPage]="true" [fullHeight]="true" [showRefresh]="true" class="gltStyle1">
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
                    </div>
                  </div>
                </hy-form>
              </ng-template>
            </hy-align>
          </div>
      </div>
    </div>
    `
  }
};
const data4 = {
  datas: [
    {
      title: '公司',
      key: '1',
      level: 0,
      children: [
        {
          title: '研发组',
          key: '1-1',
          level: 1,
          children: [
            {
              title: '前端开发组', key: '1-1-1', level: 2, children: [
                { title: 'React团队', key: '1-1-1-1', level: 3 },
                { title: 'Vue团队', key: '1-1-1-2', level: 3 },
                { title: 'Angular团队', key: '1-1-1-3', level: 3 }
              ]
            },
            {
              title: '后端开发组', key: '1-1-2', level: 2, children: [
                { title: 'Java团队', key: '1-1-2-1', level: 3 },
                { title: 'Python团队', key: '1-1-2-2', level: 3 },
                { title: 'Node.js团队', key: '1-1-2-3', level: 3 }
              ]
            },
            {
              title: '移动开发组', key: '1-1-3', level: 2, children: [
                { title: 'iOS团队', key: '1-1-3-1', level: 3 },
                { title: 'Android团队', key: '1-1-3-2', level: 3 },
                { title: 'Flutter团队', key: '1-1-3-3', level: 3 }
              ]
            },
            {
              title: '测试开发组', key: '1-1-4', level: 2, children: [
                { title: '自动化测试', key: '1-1-4-1', level: 3 },
                { title: '性能测试', key: '1-1-4-2', level: 3 },
                { title: '安全测试', key: '1-1-4-3', level: 3 }
              ]
            },
            {
              title: '数据开发组', key: '1-1-5', level: 2, children: [
                { title: '数据仓库', key: '1-1-5-1', level: 3 },
                { title: '大数据分析', key: '1-1-5-2', level: 3 },
                { title: '机器学习', key: '1-1-5-3', level: 3 }
              ]
            },
          ],
        },
        {
          title: '产品组',
          key: '1-2',
          level: 1,
          children: [
            {
              title: '产品策划', key: '1-2-1', level: 2, children: [
                { title: '用户体验设计', key: '1-2-1-1', level: 3 },
                { title: '交互设计', key: '1-2-1-2', level: 3 },
                { title: '视觉设计', key: '1-2-1-3', level: 3 }
              ]
            },
            {
              title: '产品运营', key: '1-2-2', level: 2, children: [
                { title: '内容运营', key: '1-2-2-1', level: 3 },
                { title: '用户运营', key: '1-2-2-2', level: 3 },
                { title: '活动运营', key: '1-2-2-3', level: 3 }
              ]
            },
            {
              title: '数据分析', key: '1-2-3', level: 2, children: [
                { title: '业务分析', key: '1-2-3-1', level: 3 },
                { title: '数据挖掘', key: '1-2-3-2', level: 3 }
              ]
            },
          ],
        },
        {
          title: '销售组',
          key: '1-3',
          level: 1,
          children: [
            {
              title: '企业销售', key: '1-3-1', level: 2, children: [
                { title: '大客户销售', key: '1-3-1-1', level: 3 },
                { title: '渠道销售', key: '1-3-1-2', level: 3 },
                { title: '电话销售', key: '1-3-1-3', level: 3 }
              ]
            },
            {
              title: '个人销售', key: '1-3-2', level: 2, children: [
                { title: '线上销售', key: '1-3-2-1', level: 3 },
                { title: '线下销售', key: '1-3-2-2', level: 3 }
              ]
            },
            {
              title: '销售支持', key: '1-3-3', level: 2, children: [
                { title: '售前支持', key: '1-3-3-1', level: 3 },
                { title: '售后支持', key: '1-3-3-2', level: 3 }
              ]
            },
          ],
        },
        {
          title: '市场组',
          key: '1-4',
          level: 1,
          children: [
            {
              title: '品牌营销', key: '1-4-1', level: 2, children: [
                { title: '品牌策略', key: '1-4-1-1', level: 3 },
                { title: '品牌推广', key: '1-4-1-2', level: 3 },
                { title: '公关传播', key: '1-4-1-3', level: 3 }
              ]
            },
            {
              title: '数字营销', key: '1-4-2', level: 2, children: [
                { title: '搜索引擎营销', key: '1-4-2-1', level: 3 },
                { title: '社交媒体营销', key: '1-4-2-2', level: 3 },
                { title: '内容营销', key: '1-4-2-3', level: 3 }
              ]
            },
            {
              title: '市场分析', key: '1-4-3', level: 2, children: [
                { title: '竞品分析', key: '1-4-3-1', level: 3 },
                { title: '用户调研', key: '1-4-3-2', level: 3 }
              ]
            },
          ],
        },
        {
          title: '人力资源',
          key: '1-5',
          level: 1,
          children: [
            {
              title: '招聘管理', key: '1-5-1', level: 2, children: [
                { title: '社会招聘', key: '1-5-1-1', level: 3 },
                { title: '校园招聘', key: '1-5-1-2', level: 3 },
                { title: '内推招聘', key: '1-5-1-3', level: 3 }
              ]
            },
            {
              title: '薪酬福利', key: '1-5-2', level: 2, children: [
                { title: '薪酬设计', key: '1-5-2-1', level: 3 },
                { title: '绩效管理', key: '1-5-2-2', level: 3 },
                { title: '福利管理', key: '1-5-2-3', level: 3 }
              ]
            },
            {
              title: '培训发展', key: '1-5-3', level: 2, children: [
                { title: '新员工培训', key: '1-5-3-1', level: 3 },
                { title: '技能培训', key: '1-5-3-2', level: 3 },
                { title: '管理培训', key: '1-5-3-3', level: 3 }
              ]
            },
          ],
        },
        {
          title: '财务组',
          key: '1-6',
          level: 1,
          children: [
            {
              title: '会计核算', key: '1-6-1', level: 2, children: [
                { title: '总账管理', key: '1-6-1-1', level: 3 },
                { title: '应收应付', key: '1-6-1-2', level: 3 },
                { title: '成本核算', key: '1-6-1-3', level: 3 }
              ]
            },
            {
              title: '财务分析', key: '1-6-2', level: 2, children: [
                { title: '预算管理', key: '1-6-2-1', level: 3 },
                { title: '财务报表', key: '1-6-2-2', level: 3 },
                { title: '经营分析', key: '1-6-2-3', level: 3 }
              ]
            },
            {
              title: '资金管理', key: '1-6-3', level: 2, children: [
                { title: '现金管理', key: '1-6-3-1', level: 3 },
                { title: '投资管理', key: '1-6-3-2', level: 3 }
              ]
            },
          ],
        },
        {
          title: '运维组',
          key: '1-7',
          level: 1,
          children: [
            {
              title: '系统运维', key: '1-7-1', level: 2, children: [
                { title: '服务器运维', key: '1-7-1-1', level: 3 },
                { title: '网络运维', key: '1-7-1-2', level: 3 },
                { title: '数据库运维', key: '1-7-1-3', level: 3 }
              ]
            },
            {
              title: '安全运维', key: '1-7-2', level: 2, children: [
                { title: '信息安全', key: '1-7-2-1', level: 3 },
                { title: '网络安全', key: '1-7-2-2', level: 3 },
                { title: '数据安全', key: '1-7-2-3', level: 3 }
              ]
            },
            {
              title: '监控运维', key: '1-7-3', level: 2, children: [
                { title: '系统监控', key: '1-7-3-1', level: 3 },
                { title: '应用监控', key: '1-7-3-2', level: 3 }
              ]
            },
          ],
        },

      ],
    },
  ]
};
export const panel4 = Template4.bind({});
panel4.storyName = '收放模板-占满高度';
panel4.args = data4;
