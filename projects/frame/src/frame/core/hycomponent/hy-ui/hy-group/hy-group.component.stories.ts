import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../base/base.module';
import { HyGroupComponent } from './hy-group.component';
import { unit } from '../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService } from '../../../common/domain/service/model.service';
import { TableService } from '../../../common/domain/service/hytable.service';
import { StoriesModule } from 'stories/stories.module';
import { FormsModule } from '@angular/forms';
import { previewTemplate } from 'storybook-addon-preview';
import { $hyapi } from '../../../api/$hyapi';

let mds;

class MockPricingService implements Partial<ModelService> {
  private $dicCache: any = {};

  public tableServiceMap: any = {};

  constructor() {
    mds = this;
    setTimeout(() => {
      const data = {
        text: '默认文本内容',
        group: [
          { 'select': '1', 'text': '2', 'textarea': '3' },
          { 'select': '2', 'text': '3', 'textarea': '4' },
          { 'select': '5', 'text': '6', 'textarea': '7' },
        ],
        group2:[
          {
            "id": "2c19a02d900656a40190066fddfe0008",
            "exclusionStrategyId": "2c19a02d900656a40190066a85d30003",
            "name": "result_address",
            "conditions": "41",
            "value": "ddd"
          },
          {
            "id": "2c19a02d900656a40190066fde6a0009",
            "exclusionStrategyId": "2c19a02d900656a40190066a85d30003",
            "name": "uid",
            "conditions": "42",
            "value": "dddd"
          },
          {
            "id": "2c19a02d900656a40190066fdec5000a",
            "exclusionStrategyId": "2c19a02d900656a40190066a85d30003",
            "name": "result_address",
            "conditions": "43",
            "value": "gggg"
          },
          {
            "id": "2c19a02d900656a40190066fdf10000b",
            "exclusionStrategyId": "2c19a02d900656a40190066a85d30003",
            "name": "group",
            "conditions": "44",
            "value": "ddd"
          },
          {
            "id": "2c19a02d900656a40190066fe00b000c",
            "exclusionStrategyId": "2c19a02d900656a40190066a85d30003",
            "name": "uid",
            "conditions": "43",
            "value": "ddd"
          }
        ]
      };
      $hyapi.model.setGtData(mds, 'gt_test1', data);
    }, 200);
  }

  pushDic(dic: any) {
    if (dic && dic.name) {
      this.$dicCache[dic.name] = dic.value;
    }
  }

  getDic(dicName: string) {
    return this.$dicCache[dicName];
  }
}

const argTypes = unit.createArgTypes('HyGroupComponent');
export default {
  title: '表单组件/hy-group（组）',
  component: HyGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, { provide: ModelService, useClass: MockPricingService }]
    }),
  ],
  argTypes,
} as Meta;


const Template: Story<HyGroupComponent> = (args: HyGroupComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test">
      <hy-text cols="24" title="标题" model="text"></hy-text>
      <hy-group cols="24" title="标题" rowTitle="R" model="group" (onChange_model)="onChange_model($event)">
        <ng-template let-item="item" let-index="index">
          <hy-text cols="8" hyGroupTh="标题1" [noLabel]="true" [model]="'text' + item.model" [ckRequired]="true" [isShowNoLabelRequired]="true"></hy-text>
          <hy-select cols="8" hyGroupTh="标题2" [noLabel]="true" dic="dd_testWeek" [ckRequired]="true" [model]="'select' + item.model"  [isShowNoLabelRequired]="true"></hy-select>
          <hy-textarea [autosize]="{'minRow':2,'maxRow':4}" cols="8" hyGroupTh="标题3" [ckRequired]="true" [noLabel]="true" [model]="'textarea' + item.model" [isShowNoLabelRequired]="true"></hy-textarea>
        </ng-template>
      </hy-group>
    </hy-gt>
    <hy-button title="提交"></hy-button>
  </hy-form>
  `
});
export const panel = Template.bind({});
panel.storyName = '默认模板';
panel.parameters = {
  preview: [
    {
      tab: "TS代码",
      template: previewTemplate`
      import { ModelService } from 'hyFrame';

      @Component({
          selector: 'app-test',
          template: './app-test.component.html',
          providers:[ModelService]
      })

      export class TestComponent implements OnInit {

          constructor(public mds: ModelService) {}

          ngOnInit() {

          }

          onChange_model(e) {
            // 返回mode值
            console.log(e);
          }
        }
      `,
      language: "ts",
      copy: true,
      format: "ts",
    },
    {
      tab: "HTML代码",
      template: `
      <hy-form>
        <hy-gt model="test">
          <hy-text cols="24" title="text" model="text"></hy-text>
          <hy-group cols="24" title="group" rowTitle="R" model="group" (onChange_model)="onChange_model($event)">
            <ng-template let-item="item" let-index="index">
              <hy-text cols="8" hyGroupTh="标题1" [noLabel]="true" [model]="'text' + item.model" [ckRequired]="true"></hy-text>
              <hy-select cols="8" hyGroupTh="标题2" [noLabel]="true" dic="dd_testWeek" [ckRequired]="true" [model]="'select' + item.model"></hy-select>
              <hy-textarea [autosize]="{'minRow':2,'maxRow':4}" cols="8" hyGroupTh="标题3" [ckRequired]="true" [noLabel]="true" [model]="'text2' + item.model"></hy-textarea>
            </ng-template>
          </hy-group>
        </hy-gt>
        <hy-button title="提交"></hy-button>
      </hy-form>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      ## 基础使用说明
      - 组件内部以ng-template模板的方式传入
      - 使用时需设置子组件中的[noLabel]="true"
      - 使用时需设置子组件中的[model]="'model名称' + item.model"
      - rowTitle="R"，每行内的标题名称，后面会自动拼上序号
      - model="group" ，当前这个组件的model名称
      
      ## 新增功能
      ### 1. 表头配置功能
      - hyGroupTh: 在子组件标签上添加此属性来定义表头文本
      - 组件会自动检测子组件的hyGroupTh属性并生成对应的表头
      - 支持必填字段标识，会在表头显示红色星号
      
      ### 2. 最大行数限制
      - maxRow: 设置最大行数限制，默认值为100
      - 当设置为1时，将不显示操作按钮
      - 当达到最大行数时，添加按钮会被隐藏
      
      ## 属性列表
      | 属性名 | 类型 | 默认值 | 说明 |
      |-------|------|--------|------|
      | maxRow | number | 100 | 最大行数限制 |
      | rowTitle | string | - | 行标题前缀 |
      | model | string | - | 数据模型名称 |
      | title | string | - | 组件标题 |
      | hyGroupTh | string | - | 表头文本（子组件属性） |
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

const Template1: Story<HyGroupComponent> = (args: HyGroupComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test1">
      <hy-text cols="24" title="标题" model="text"></hy-text>
      <hy-group cols="24" title="标题" rowTitle="R" model="group" (onChange_model)="onChange_model($event)">
        <ng-template let-item="item" let-index="index">
          <hy-text cols="8" hyGroupTh="标题1" [noLabel]="true" [model]="'text' + item.model" [ckRequired]="true"></hy-text>
          <hy-select cols="8" hyGroupTh="标题2" [noLabel]="true" dic="dd_testWeek" [ckRequired]="true" [model]="'select' + item.model"></hy-select>
          <hy-textarea [autosize]="{'minRow':2,'maxRow':4}" cols="8" hyGroupTh="标题3" [ckRequired]="true" [noLabel]="true" [model]="'textarea' + item.model"></hy-textarea>
        </ng-template>
      </hy-group>
    </hy-gt>
    <hy-button title="提交"></hy-button>
  </hy-form>
  `
});
export const panel1 = Template1.bind({});
panel1.storyName = '默认模板-默认值';
panel1.parameters = {
  preview: [
    {
      tab: "TS代码",
      template: previewTemplate`
      import { ModelService, $hyapi } from 'hyFrame';

      @Component({
          selector: 'app-test',
          template: './app-test.component.html',
          providers:[ModelService]
      })

      export class TestComponent implements OnInit {

          constructor(public mds: ModelService) {}

          ngOnInit() {
            this.getData();
          }

          // 模拟获取数据
          getData(e) {
            const data = {
              text: '默认文本内容',
              group: [
                { 'select': '1', 'text': '2', 'textarea': '3' },
                { 'select': '2', 'text': '3', 'textarea': '4' },
                { 'select': '5', 'text': '6', 'textarea': '7' },
              ]
            };
            $hyapi.model.setGtData(mds, 'gt_test', data);
          }

          onChange_model(e) {
            // 返回mode值
            console.log(e);
          }
        }
      `,
      language: "ts",
      copy: true,
      format: "ts",
    },
    {
      tab: "HTML代码",
      template: `
      <hy-form>
        <hy-gt model="test">
          <hy-text cols="24" title="text" model="text"></hy-text>
          <hy-group cols="24" title="group" rowTitle="R" model="group" (onChange_model)="onChange_model($event)">
            <ng-template let-item="item" let-index="index">
              <hy-text cols="8" [noLabel]="true" [model]="'text' + item.model" [ckRequired]="true"></hy-text>
              <hy-select cols="8" [noLabel]="true" dic="dd_testWeek" [ckRequired]="true" [model]="'select' + item.model"></hy-select>
              <hy-textarea [autosize]="{'minRow':2,'maxRow':4}" cols="8" [ckRequired]="true" [noLabel]="true" [model]="'text2' + item.model"></hy-textarea>
            </ng-template>
          </hy-group>
        </hy-gt>
        <hy-button title="提交"></hy-button>
      </hy-form>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      ## 基础使用说明  
      - 组件内部以ng-template模板的方式传入
      - 使用时需设置子组件中的[noLabel]="true"
      - 使用时需设置子组件中的[model]="'model名称' + item.model"
      - rowTitle="R"，每行内的标题名称，后面会自动拼上序号
      - model="group" ，当前这个组件的model名称
      
      ## 数据初始化
      - 通过$hyapi.model.setGtData方法设置初始数据
      - 数据格式为对象数组，每个对象代表一行的数据
      - 支持动态数据加载和回显
      
      ## 事件处理
      - (onChange_model): 数据变更事件，返回当前所有行的数据
      - 支持实时数据监听和处理
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

const Template2: Story<HyGroupComponent> = (args: HyGroupComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test2">
      <hy-text cols="24" title="标题" model="text"></hy-text>
      <hy-group cols="24" title="限制最大行数为3" rowTitle="R" model="group" [maxRow]="3" (onChange_model)="onChange_model($event)">
        <ng-template let-item="item" let-index="index">
          <hy-text cols="8" hyGroupTh="标题1" [noLabel]="true" [model]="'text' + item.model" [ckRequired]="true" [isShowNoLabelRequired]="true"></hy-text>
          <hy-select cols="8" hyGroupTh="标题2" [noLabel]="true" dic="dd_testWeek" [ckRequired]="true" [model]="'select' + item.model"  [isShowNoLabelRequired]="true"></hy-select>
          <hy-textarea [autosize]="{'minRow':2,'maxRow':4}" cols="8" hyGroupTh="标题3" [ckRequired]="true" [noLabel]="true" [model]="'textarea' + item.model" [isShowNoLabelRequired]="true"></hy-textarea>
        </ng-template>
      </hy-group>
    </hy-gt>
    <hy-button title="提交"></hy-button>
  </hy-form>
  `
});
export const maxRowDemo = Template2.bind({});
maxRowDemo.storyName = '限制最大行数';
maxRowDemo.parameters = {
  preview: [
    {
      tab: "TS代码",
      template: previewTemplate`
      import { ModelService } from 'hyFrame';

      @Component({
          selector: 'app-test',
          template: './app-test.component.html',
          providers:[ModelService]
      })

      export class TestComponent implements OnInit {

          constructor(public mds: ModelService) {}

          ngOnInit() {

          }

          onChange_model(e) {
            // 返回mode值
            console.log(e);
          }
        }
      `,
      language: "ts",
      copy: true,
      format: "ts",
    },
    {
      tab: "HTML代码",
      template: `
      <hy-form>
        <hy-gt model="test">
          <hy-text cols="24" title="text" model="text"></hy-text>
          <hy-group cols="24" title="限制最大行数为1" rowTitle="R" model="group" [maxRow]="1" (onChange_model)="onChange_model($event)">
            <ng-template let-item="item" let-index="index">
              <hy-text cols="8" hyGroupTh="标题1" [noLabel]="true" [model]="'text' + item.model" [ckRequired]="true" [isShowNoLabelRequired]="true"></hy-text>
              <hy-select cols="8" hyGroupTh="标题2" [noLabel]="true" dic="dd_testWeek" [ckRequired]="true" [model]="'select' + item.model" [isShowNoLabelRequired]="true"></hy-select>
              <hy-textarea [autosize]="{'minRow':2,'maxRow':4}" cols="8" hyGroupTh="标题3" [ckRequired]="true" [noLabel]="true" [model]="'textarea' + item.model" [isShowNoLabelRequired]="true"></hy-textarea>
            </ng-template>
          </hy-group>
        </hy-gt>
        <hy-button title="提交"></hy-button>
      </hy-form>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      ## maxRow 属性说明
      - maxRow: 最大行数限制，默认值为100
      - 当 maxRow="1" 时，组件将不显示添加行和删除行的操作按钮
      - 适用于只需要单行数据录入的场景
      
      ## 使用场景
      - 单行数据录入表单
      - 限制用户只能输入固定数量的行数据
      - 简化界面，避免过多的操作按钮
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

const Template3: Story<HyGroupComponent> = (args: HyGroupComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test3">
      <hy-text cols="24" title="标题" model="text"></hy-text>
      <hy-group cols="24" title="表头配置演示" rowTitle="R" model="group" (onChange_model)="onChange_model($event)">
        <ng-template let-item="item" let-index="index">
          <hy-text cols="6" hyGroupTh="姓名" [noLabel]="true" [model]="'name' + item.model" [ckRequired]="true" [isShowNoLabelRequired]="true"></hy-text>
          <hy-select cols="4" hyGroupTh="性别" [noLabel]="true" dic="dd_gender" [ckRequired]="true" [model]="'gender' + item.model" [isShowNoLabelRequired]="true"></hy-select>
          <hy-number cols="4" [noOwnWidth]="true" hyGroupTh="年龄" [noLabel]="true" [model]="'age' + item.model" [ckRequired]="true" [isShowNoLabelRequired]="true"></hy-number>
          <hy-text cols="6" hyGroupTh="联系电话" [noLabel]="true" [model]="'phone' + item.model"></hy-text>
          <hy-textarea cols="4" hyGroupTh="备注" [autosize]="{'minRow':1,'maxRow':3}" [noLabel]="true" [model]="'remark' + item.model"></hy-textarea>
        </ng-template>
      </hy-group>
      <hy-button title="提交"></hy-button>
    </hy-gt>
  </hy-form>
  `
});
export const tableHeaderDemo = Template3.bind({});
tableHeaderDemo.storyName = '表头配置演示';
tableHeaderDemo.parameters = {
  preview: [
    {
      tab: "TS代码",
      template: previewTemplate`
      import { ModelService } from 'hyFrame';

      @Component({
          selector: 'app-test',
          template: './app-test.component.html',
          providers:[ModelService]
      })

      export class TestComponent implements OnInit {

          constructor(public mds: ModelService) {}

          ngOnInit() {

          }

          onChange_model(e) {
            // 返回mode值
            console.log(e);
          }
        }
      `,
      language: "ts",
      copy: true,
      format: "ts",
    },
    {
      tab: "HTML代码",
      template: `
      <hy-form>
        <hy-gt model="test">
          <hy-text cols="24" title="text" model="text"></hy-text>
          <hy-group cols="24" title="表头配置演示" rowTitle="R" model="group" (onChange_model)="onChange_model($event)">
            <ng-template let-item="item" let-index="index">
              <hy-text cols="6" hyGroupTh="姓名" [noLabel]="true" [model]="'name' + item.model" [ckRequired]="true" [isShowNoLabelRequired]="true"></hy-text>
              <hy-select cols="4" hyGroupTh="性别" [noLabel]="true" dic="dd_gender" [ckRequired]="true" [model]="'gender' + item.model" [isShowNoLabelRequired]="true"></hy-select>
              <hy-number [noOwnWidth]="true" cols="4" hyGroupTh="年龄" [noLabel]="true" [model]="'age' + item.model" [ckRequired]="true" [isShowNoLabelRequired]="true"></hy-number>
              <hy-text cols="6" hyGroupTh="联系电话" [noLabel]="true" [model]="'phone' + item.model"></hy-text>
              <hy-textarea cols="4" hyGroupTh="备注" [autosize]="{'minRow':1,'maxRow':3}" [noLabel]="true" [model]="'remark' + item.model"></hy-textarea>
            </ng-template>
          </hy-group>
          <hy-button title="提交"></hy-button>
        </hy-gt>
      </hy-form>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      ## 表头配置说明
      - hyGroupTh: 在子组件标签上添加此属性来定义表头文本
      - 组件会自动检测子组件的 hyGroupTh 属性并生成对应的表头
      - 表头会根据子组件的 cols 属性自动调整宽度
      - 支持必填字段标识，会在表头显示红色星号
      
      ## 实现原理
      - 组件通过 getHeads() 方法获取子元素的 hyGroupTh 属性
      - 自动生成 heads 数组，包含表头文本、列宽和必填标识
      - 在模板中渲染为表格样式的头部
      
      ## 使用场景
      - 需要类似表格的结构化数据录入
      - 多字段横向排列的表单
      - 需要清晰表头标识的数据录入界面
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

const Template4: Story<HyGroupComponent> = (args: HyGroupComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test4">
      <hy-text cols="24" title="标题" model="text"></hy-text>
      <hy-group cols="24" title="综合功能演示" rowTitle="条目" model="group" [maxRow]="3" (onChange_model)="onChange_model($event)">
        <ng-template let-item="item" let-index="index">
          <hy-text cols="8" hyGroupTh="项目名称" [noLabel]="true" [model]="'projectName' + item.model" [ckRequired]="true" [isShowNoLabelRequired]="true"></hy-text>
          <hy-select cols="6" hyGroupTh="项目类型" [noLabel]="true" dic="dd_projectType" [ckRequired]="true" [model]="'projectType' + item.model" [isShowNoLabelRequired]="true"></hy-select>
          <hy-number cols="5" hyGroupTh="预算金额" [noOwnWidth]="true" [noLabel]="true" [model]="'budget' + item.model" [ckRequired]="true" [isShowNoLabelRequired]="true"></hy-number>
          <hy-date cols="5" hyGroupTh="截止日期" [noOwnWidth]="true"  [noLabel]="true" [model]="'deadline' + item.model" [ckRequired]="true" [isShowNoLabelRequired]="true"></hy-date>
        </ng-template>
      </hy-group>
      <hy-button title="提交"></hy-button>
    </hy-gt>
  </hy-form>
  `
});
export const comprehensiveDemo = Template4.bind({});
comprehensiveDemo.storyName = '综合功能演示';
comprehensiveDemo.parameters = {
  preview: [
    {
      tab: "TS代码",
      template: previewTemplate`
      import { ModelService } from 'hyFrame';

      @Component({
          selector: 'app-test',
          template: './app-test.component.html',
          providers:[ModelService]
      })

      export class TestComponent implements OnInit {

          constructor(public mds: ModelService) {}

          ngOnInit() {

          }

          onChange_model(e) {
            // 返回mode值
            console.log(e);
          }
        }
      `,
      language: "ts",
      copy: true,
      format: "ts",
    },
    {
      tab: "HTML代码",
      template: `
      <hy-form>
        <hy-gt model="test">
          <hy-text cols="24" title="text" model="text"></hy-text>
          <hy-group cols="24" title="综合功能演示" rowTitle="条目" model="group" [maxRow]="3" (onChange_model)="onChange_model($event)">
            <ng-template let-item="item" let-index="index">
              <hy-text cols="8" hyGroupTh="项目名称" [noLabel]="true" [model]="'projectName' + item.model" [ckRequired]="true" [isShowNoLabelRequired]="true"></hy-text>
              <hy-select cols="6" hyGroupTh="项目类型" [noLabel]="true" dic="dd_projectType" [ckRequired]="true" [model]="'projectType' + item.model" [isShowNoLabelRequired]="true"></hy-select>
              <hy-number cols="5" hyGroupTh="预算金额" [noLabel]="true" [model]="'budget' + item.model" [ckRequired]="true" [isShowNoLabelRequired]="true"></hy-number>
              <hy-date cols="5" hyGroupTh="截止日期" [noLabel]="true" [model]="'deadline' + item.model" [ckRequired]="true" [isShowNoLabelRequired]="true"></hy-date>
            </ng-template>
          </hy-group>
          <hy-button title="提交"></hy-button>
        </hy-gt>
      </hy-form>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      ## 综合功能演示
      
      本示例展示了 hy-group 组件的主要新增功能：
      
      ### 1. maxRow 限制功能
      - 设置 [maxRow]="3" 限制最多只能添加3行数据
      - 当达到最大行数时，添加按钮会被隐藏
      - 适用于有固定数量要求的数据录入场景
      
      ### 2. 表头配置功能
      - 通过 hyGroupTh 属性为每个字段配置表头文本
      - 表头会自动适应字段的 cols 宽度
      - 支持必填字段的视觉标识（红色星号）
      
      ### 3. 灵活的字段类型支持
      - 支持文本输入框 (hy-text)
      - 支持下拉选择框 (hy-select)
      - 支持数字输入框 (hy-number)
      - 支持日期选择器 (hy-date)
      - 还支持其他类型如文本域、时间选择器、树选择器等
      
      ### 4. 行标题定制
      - 通过 rowTitle 属性可以定制每行的标题前缀
      - 本例中设置为"条目"，会显示为"条目1"、"条目2"等
      
      ## 最佳实践
      1. 根据实际业务需求合理设置 maxRow 值
      2. 为每个字段设置有意义的 hyGroupTh 表头文本
      3. 合理分配 cols 比例，确保界面美观
      4. 对重要字段设置必填验证
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};
const TemplateApi: Story<HyGroupComponent> = (args: HyGroupComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="api">
      <hy-group cols="24" title="API 文档示例" rowTitle="行" model="group" (onChange_model)="onChange_model($event)">
        <ng-template let-item="item" let-index="index">
          <hy-text cols="8" [noLabel]="true" [model]="'demo' + item.model"></hy-text>
        </ng-template>
      </hy-group>
    </hy-gt>
  </hy-form>
  `
});
export const apiDoc = TemplateApi.bind({});
apiDoc.storyName = 'API 文档';
apiDoc.parameters = {
  preview: [
    {
      tab: 'API 文档',
      template: `
      # hy-group 组件 API 文档

      ## 属性
      | 属性名 | 类型 | 默认值 | 说明 |
      |-------|------|--------|------|
      | flex | string | - | 行容器 flex 布局控制 |
      | cols | number \\| string | - | 栅格宽度（1~24），控制组件占位 |
      | title | string | - | 组件标题文本 |
      | model | string | - | 数据模型名称（别名：modelName） |
      | noLabel | boolean | false | 是否隐藏标题 |
      | labelWidth | string | - | 标题宽度，单位 px |
      | isLabelWrap | boolean | - | 标题超出长度时是否换行 |
      | noColon | boolean | false | 是否隐藏冒号 |
      | ckRequired | boolean | false | 是否启用必录校验 |
      | rowTitle | string | - | 行标题前缀（自动拼接序号） |
      | maxRow | number | 100 | 最大行数限制（为 1 时隐藏操作按钮） |
      | noOperation | boolean | false | 是否隐藏添加/删除等操作按钮 |
      | hyGroupTh | string | - | 子组件表头文本（在子组件标签上使用） |

      ## 事件
      - onChange_model: EventEmitter<HyGroupRow[]> — 组数据模型变更时触发，返回当前所有行的聚合数据数组。
      - onChange: EventEmitter<any> — 交互后的通用变动事件（继承自基类），通常携带当前组件的值。

      ## 组件方法
      - addRow(): void — 添加一行，更新内部 list 与 model 映射。
      - removeRow(item: HyGroupListItem): void — 删除指定行，并清理对应的 model 数据。
      - initGroup(): Promise<any> — 根据初始数据回填列表及各子字段的 model 值。
      - mdsDataChange(): void — mds 数据变动回调，重新聚合并触发变更。

      ## 类型定义
      \`HyGroupListItem\`:
      \`\`\`
      interface HyGroupListItem {
        index: number;
        model: string; // 如 '_group0'
      }
      \`\`\`

      \`HyGroupRow\` 与 \`HyGroupData\`:
      \`\`\`
      type HyGroupRow = Record<string, unknown>;
      type HyGroupData = HyGroupRow[];
      \`\`\`

      ## 说明
      - 子组件需设置 \`[noLabel]="true"\` 与 \`[model]="'字段' + item.model"\` 以参与组数据聚合。
      - 使用 \`hyGroupTh\` 定义子组件表头文本；必填字段可通过 \`[ckRequired]="true"\` 与 \`[isShowNoLabelRequired]="true"\` 展示红色星号。
      - 建议结合 \`maxRow\` 控制行数与交互复杂度，提升可用性。
      `,
      language: 'markdown',
      format: 'markdown'
    }
  ]
};
