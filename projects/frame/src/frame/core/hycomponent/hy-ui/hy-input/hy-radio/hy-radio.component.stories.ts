import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyRadioComponent } from './hy-radio.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';
import { Component, OnInit } from '@angular/core';



const argTypes = unit.createArgTypes('HyRadioComponent');
argTypes['items'].control.type = 'object';
const labelString = unit.createLabel('hy-radio', argTypes);


@Component({
  selector: 'app-demo',
  template: `
  <div>
    <hy-form>
      <hy-gt model="test" [noBorder]="true" cols="24">
        <hy-radio type="radio" title="单选框" [ckRequired]="true" model="radio" dic="testValue"></hy-radio>
        <!-- <hy-select model="radio" dic="testValue" title="单选框1" ></hy-select> -->
        <hy-button title="提交"></hy-button>
        {{mds['gt_test']['radio']}}
        {{mds['gt_test']['radio']=='1'}}
        <div style="padding-left: 24px;" *ngIf="mds['gt_test']['radio']=='1'">
          <!-- <hy-select model="1" dic="testWeek" title="单选框1" ></hy-select> -->
          <hy-radio model="1" dic="testWeek" title="单选框1" ></hy-radio>
        </div>
        <div style="padding-left: 24px;" *ngIf="mds['gt_test']['radio']!='1' ">
          <!-- <hy-select model="2" dic="testWeek" title="单选框2" ></hy-select> -->
          <hy-radio model="2" dic="testWeek" title="单选框2" ></hy-radio>
        </div>
      </hy-gt>
    </hy-form>
  </div>
  `,
})
class DemoComponent implements OnInit {
  constructor(public mds: ModelService) {}

  ngOnInit() {
    this.mds['gt_test']={
      'radio':'1'
    }
  }
}


export default {
  title: '表单组件/hy-radio（单选框）',
  component: DemoComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, ModelService]
    }),
  ],
  argTypes,
  parameters: {
    docs: {
      description: {
        component: `
## hy-radio 单选框组件

单选框组件用于在一组选项中选择一个选项。组件支持两种样式类型：按钮类型和文字类型，并提供多种配置选项。

### 特性
- 支持按钮类型和文字类型两种样式
- 支持必填校验
- 支持自定义数据源
- 支持设置每行显示数量（文字类型）
- 支持部分选项禁用功能
- 支持文本超长省略显示
- 支持与表单集成
- 支持事件回调
`
      }
    }
  }
} as Meta;

const Template: Story = (args) => ({
  props: args,
  component: DemoComponent
});

export const HttpServiceDemo = Template.bind({});
HttpServiceDemo.storyName = 'HTTP服务演示';

// 基础用法
export const Basic: Story<HyRadioComponent> = (args: HyRadioComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test" [noBorder]="true" cols="24">
      <hy-radio title="单选框" [ckRequired]="true" model="number" dic="testValue"></hy-radio>
      <hy-button title="提交"></hy-button>
      {{mds}}
    </hy-gt>
  </hy-form>
  `
});
Basic.storyName = '基础用法';
Basic.parameters = {
  docs: {
    description: {
      story: '展示单选框的基础用法，使用字典数据源。单选框组件需要在表单中使用，通过 `dic` 属性指定字典数据源。'
    }
  },
  preview: [
    {
      tab: "HTML代码",
      template: previewTemplate`
<hy-form>
  <hy-gt model="test" [noBorder]="true" cols="24">
    <hy-radio title="单选框" [ckRequired]="true" model="number" dic="testValue"></hy-radio>
    <hy-button title="提交"></hy-button>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "TS代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
      `,
      language: "ts",
      copy: true,
      format: "ts"
    }
  ]
};

// 样式类型
export const StyleTypes: Story<HyRadioComponent> = (args: HyRadioComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test" [noBorder]="true" cols="24" labelWidth="140px">
      <hy-radio title="单选框-按钮类型" [ckRequired]="true" model="radio" dic="testValue"></hy-radio>
      <hy-radio title="单选框-文字类型" [ckRequired]="true" model="radio" dic="testValue" type="radio"></hy-radio>
    </hy-gt>
  </hy-form>
  `
});
StyleTypes.storyName = '样式类型';
StyleTypes.parameters = {
  docs: {
    description: {
      story: '单选框支持两种样式类型：按钮类型（默认，type="radioButton"）和文字类型（type="radio"）。通过 `type` 属性设置样式类型。'
    }
  },
  preview: [
    {
      tab: "HTML代码",
      template: previewTemplate`
<hy-form>
  <hy-gt model="test" [noBorder]="true" cols="24" labelWidth="140px">
    <hy-radio title="单选框-按钮类型" [ckRequired]="true" model="radio" dic="testValue"></hy-radio>
    <hy-radio title="单选框-文字类型" [ckRequired]="true" model="radio" dic="testValue" type="radio"></hy-radio>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "TS代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
      `,
      language: "ts",
      copy: true,
      format: "ts"
    }
  ]
};

// 每行数量
export const OnelineNum: Story<HyRadioComponent> = (args: HyRadioComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test" [noBorder]="true" cols="24" labelWidth="140px" title="每行数量(仅类型为radio的单选生效)">
      <hy-radio title="单选框-按钮类型" [onelineNum]="3" [ckRequired]="true" model="radio" dic="testValue"></hy-radio>
      <hy-radio title="单选框-文字类型" [onelineNum]="3" [ckRequired]="true" model="radio" dic="testValue" type="radio"></hy-radio>
    </hy-gt>
  </hy-form>
  `
});
OnelineNum.storyName = '每行数量';
OnelineNum.parameters = {
  docs: {
    description: {
      story: '通过 `onelineNum` 属性可以设置每行显示的选项数量，仅对文字类型（type="radio"）的单选框生效。按钮类型（type="radioButton"）不受此属性影响。'
    }
  },
  preview: [
    {
      tab: "HTML代码",
      template: previewTemplate`
<hy-form>
  <hy-gt model="test" [noBorder]="true" cols="24" labelWidth="140px">
    <hy-radio 
      title="单选框-文字类型" 
      [onelineNum]="3" 
      [ckRequired]="true" 
      model="radio" 
      dic="testValue" 
      type="radio">
    </hy-radio>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "TS代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
      `,
      language: "ts",
      copy: true,
      format: "ts"
    }
  ]
};

// 部分选项禁用
export const PartialDisabled: Story<HyRadioComponent> = (args: HyRadioComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test" [noBorder]="true" cols="24" labelWidth="140px">
      <hy-radio title="单选框-按钮类型" [enableAllow]="['1','2','3']" [enable]="false" [ckRequired]="true" model="radio" dic="testValue"></hy-radio>
      <hy-radio title="单选框-文字类型" [enableAllow]="['1','2','3']" [enable]="false" [ckRequired]="true" model="radio" dic="testValue" type="radio"></hy-radio>
    </hy-gt>
  </hy-form>
  `
});
PartialDisabled.storyName = '部分选项禁用';
PartialDisabled.parameters = {
  docs: {
    description: {
      story: '通过 `enable` 和 `enableAllow` 属性可以实现部分选项禁用的功能。设置 `enable=false` 禁用所有选项，然后通过 `enableAllow` 数组指定允许选择的选项ID。'
    }
  },
  preview: [
    {
      tab: "HTML代码",
      template: previewTemplate`
<hy-form>
  <hy-gt model="test" [noBorder]="true" cols="24" labelWidth="140px">
    <hy-radio 
      title="单选框" 
      [enableAllow]="['1','2','3']" 
      [enable]="false" 
      [ckRequired]="true" 
      model="radio" 
      dic="testValue">
    </hy-radio>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "TS代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {
  // 允许选择的选项ID数组
  enableAllowIds: string[] = ['1', '2', '3'];

  constructor() {}

  ngOnInit() {}
}
      `,
      language: "ts",
      copy: true,
      format: "ts"
    }
  ]
};

// 自定义数据源
export const CustomItems: Story<HyRadioComponent> = (args: HyRadioComponent) => ({
  props: {
    ...args,
    items: [
      { id: '1', text: '苹果' },
      { id: '2', text: '桔子' },
      { id: '3', text: '西瓜' },
      { id: '4', text: '香蕉' },
      { id: '5', text: '桃子' },
      { id: '6', text: '雪梨' }
    ]
  },
  template: `
  <hy-form>
    <hy-gt model="test" [noBorder]="true" cols="24" labelWidth="140px">
      <hy-radio title="单选框-按钮类型" [ckRequired]="true" [onelineNum]="3" model="radio" [items]="items"></hy-radio>
      <hy-radio title="单选框-文字类型" [ckRequired]="true" [onelineNum]="3" model="radio" [items]="items" type="radio"></hy-radio>
    </hy-gt>
  </hy-form>
  `
});
CustomItems.storyName = '自定义数据源';
CustomItems.parameters = {
  docs: {
    description: {
      story: '通过 `items` 属性可以设置自定义数据源，数据项需要包含 `id` 和 `text` 字段。这种方式适用于不需要从字典服务获取数据的场景。'
    }
  },
  preview: [
    {
      tab: "HTML代码",
      template: previewTemplate`
<hy-form>
  <hy-gt model="test" [noBorder]="true" cols="24" labelWidth="140px">
    <hy-radio 
      title="单选框" 
      [ckRequired]="true" 
      model="radio" 
      [items]="items">
    </hy-radio>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "TS代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';
import { HyDicValue } from 'hyFrame';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {
  // 自定义数据源
  items: HyDicValue[] = [
    { id: '1', text: '苹果' },
    { id: '2', text: '桔子' },
    { id: '3', text: '西瓜' },
    { id: '4', text: '香蕉' },
    { id: '5', text: '桃子' },
    { id: '6', text: '雪梨' }
  ];

  constructor() {}

  ngOnInit() {}
}
      `,
      language: "ts",
      copy: true,
      format: "ts"
    }
  ]
};

// 文本超长省略
export const TextEllipsis: Story<HyRadioComponent> = (args: HyRadioComponent) => ({
  props: {
    ...args,
    items: [
      { id: '1', text: '这是苹果，此文本测试字符超长用' },
      { id: '2', text: '这是桔子，此文本测试字符超长用' },
      { id: '3', text: '这是西瓜，此文本测试字符超长用' },
      { id: '4', text: '这是香蕉，此文本测试字符超长用' },
      { id: '5', text: '这是桃子，此文本测试字符超长用' },
      { id: '6', text: '雪梨' }
    ]
  },
  template: `
  <hy-form>
    <hy-gt model="test" [noBorder]="true" labelWidth="140px" title="按钮类型默认不换行；文字类型可通过isEllipsis控制是否显示省略号">
      <hy-radio title="单选框-按钮类型" cols="24" [isEllipsis]="true" [onelineNum]="3" model="radio" [items]="items"></hy-radio>
      <hy-radio title="单选框-文字类型" cols="12" [isEllipsis]="true" [onelineNum]="3" model="radio" [items]="items" type="radio"></hy-radio>
    </hy-gt>
  </hy-form>
  `
});
TextEllipsis.storyName = '文本超长省略';
TextEllipsis.parameters = {
  docs: {
    description: {
      story: '通过 `isEllipsis` 属性可以控制文本超长时是否显示省略号。按钮类型默认不换行；文字类型可通过 `isEllipsis` 控制是否显示省略号。当文本超长时，设置 `isEllipsis=true` 会显示省略号并在鼠标悬停时显示完整文本。'
    }
  },
  preview: [
    {
      tab: "HTML代码",
      template: previewTemplate`
<hy-form>
  <hy-gt model="test" [noBorder]="true" labelWidth="140px">
    <hy-radio 
      title="单选框-文字类型" 
      [isEllipsis]="true" 
      [onelineNum]="3" 
      model="radio" 
      [items]="items" 
      type="radio">
    </hy-radio>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "TS代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';
import { HyDicValue } from 'hyFrame';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {
  // 长文本数据源
  items: HyDicValue[] = [
    { id: '1', text: '这是苹果，此文本测试字符超长用' },
    { id: '2', text: '这是桔子，此文本测试字符超长用' },
    { id: '3', text: '这是西瓜，此文本测试字符超长用' },
    { id: '4', text: '这是香蕉，此文本测试字符超长用' },
    { id: '5', text: '这是桃子，此文本测试字符超长用' },
    { id: '6', text: '雪梨' }
  ];

  constructor() {}

  ngOnInit() {}
}
      `,
      language: "ts",
      copy: true,
      format: "ts"
    }
  ]
};

// 按钮样式
export const ButtonStyle: Story<HyRadioComponent> = (args: HyRadioComponent) => ({
  props: {
    ...args,
    items: [
      { id: '1', text: '选项一' },
      { id: '2', text: '选项二' },
      { id: '3', text: '选项三' }
    ]
  },
  template: `
  <hy-form>
    <hy-gt model="test" [noBorder]="true" cols="24" labelWidth="140px">
      <hy-radio title="描边样式(默认)" [ckRequired]="true" model="radio1" [items]="items" buttonStyle="outline"></hy-radio>
      <hy-radio title="填色样式" [ckRequired]="true" model="radio2" [items]="items" buttonStyle="solid"></hy-radio>
      <hy-radio title="大尺寸" [ckRequired]="true" model="radio3" [items]="items" size="large"></hy-radio>
      <hy-radio title="小尺寸" [ckRequired]="true" model="radio4" [items]="items" size="small"></hy-radio>
    </hy-gt>
  </hy-form>
  `
});
ButtonStyle.storyName = '按钮样式与尺寸';
ButtonStyle.parameters = {
  docs: {
    description: {
      story: '按钮类型的单选框支持两种样式：描边（outline，默认）和填色（solid）。通过 `buttonStyle` 属性设置按钮样式。同时，按钮支持三种尺寸：大（large）、默认（default）和小（small）。通过 `size` 属性设置按钮尺寸。'
    }
  },
  preview: [
    {
      tab: "HTML代码",
      template: previewTemplate`
<hy-form>
  <hy-gt model="test" [noBorder]="true" cols="24" labelWidth="140px">
    <hy-radio title="描边样式(默认)" model="radio1" [items]="items" buttonStyle="outline"></hy-radio>
    <hy-radio title="填色样式" model="radio2" [items]="items" buttonStyle="solid"></hy-radio>
    <hy-radio title="大尺寸" model="radio3" [items]="items" size="large"></hy-radio>
    <hy-radio title="小尺寸" model="radio4" [items]="items" size="small"></hy-radio>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "TS代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';
import { HyDicValue } from 'hyFrame';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {
  items: HyDicValue[] = [
    { id: '1', text: '选项一' },
    { id: '2', text: '选项二' },
    { id: '3', text: '选项三' }
  ];

  constructor() {}

  ngOnInit() {}
}
      `,
      language: "ts",
      copy: true,
      format: "ts"
    }
  ]
};

// 事件回调
export const Events: Story<HyRadioComponent> = (args: HyRadioComponent) => ({
  props: {
    ...args,
    items: [
      { id: '1', text: '选项一' },
      { id: '2', text: '选项二' },
      { id: '3', text: '选项三' }
    ],
    onModelChange: (event: any) => console.log('选中值变化:', event),
    onChange: (event: any) => console.log('交互变动:', event)
  },
  template: `
  <hy-form>
    <hy-gt model="test" [noBorder]="true" cols="24" labelWidth="140px">
      <hy-radio 
        title="事件回调示例" 
        [ckRequired]="true" 
        model="radio" 
        [items]="items"
        (onChange_model)="onModelChange($event)"
        (onChange)="onChange($event)">
      </hy-radio>
    </hy-gt>
  </hy-form>
  `
});
Events.storyName = '事件回调';
Events.parameters = {
  docs: {
    description: {
      story: '单选框组件提供了两种事件回调：`onChange_model` 在选中值变化时触发，`onChange` 在交互变动时触发。可以通过这些事件实现自定义逻辑。'
    }
  },
  preview: [
    {
      tab: "HTML代码",
      template: previewTemplate`
<hy-form>
  <hy-gt model="test" [noBorder]="true" cols="24" labelWidth="140px">
    <hy-radio 
      title="事件回调示例" 
      [ckRequired]="true" 
      model="radio" 
      [items]="items"
      (onChange_model)="onModelChange($event)"
      (onChange)="onChange($event)">
    </hy-radio>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "TS代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';
import { HyDicValue } from 'hyFrame';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {
  items: HyDicValue[] = [
    { id: '1', text: '选项一' },
    { id: '2', text: '选项二' },
    { id: '3', text: '选项三' }
  ];

  constructor() {}

  ngOnInit() {}

  // 选中值变化事件
  onModelChange(event: any) {
    console.log('选中值变化:', event);
    // 可以在这里添加自定义逻辑
  }

  // 交互变动事件
  onChange(event: any) {
    console.log('交互变动:', event);
    // 可以在这里添加自定义逻辑
  }
}
      `,
      language: "ts",
      copy: true,
      format: "ts"
    }
  ]
};

// API文档
const TemplateApi: Story<HyRadioComponent> = (args: HyRadioComponent) => ({
  props: args,
  template: `
  <div style="padding: 20px;">
    <h3>组件属性</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <thead>
        <tr style="background-color: #f5f5f5;">
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">属性</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">说明</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">类型</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">title</td>
          <td style="padding: 10px; border: 1px solid #ddd;">标题</td>
          <td style="padding: 10px; border: 1px solid #ddd;">string</td>
          <td style="padding: 10px; border: 1px solid #ddd;">-</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">model</td>
          <td style="padding: 10px; border: 1px solid #ddd;">绑定的模型名称</td>
          <td style="padding: 10px; border: 1px solid #ddd;">string</td>
          <td style="padding: 10px; border: 1px solid #ddd;">-</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">dic</td>
          <td style="padding: 10px; border: 1px solid #ddd;">字典数据源</td>
          <td style="padding: 10px; border: 1px solid #ddd;">string</td>
          <td style="padding: 10px; border: 1px solid #ddd;">-</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">items</td>
          <td style="padding: 10px; border: 1px solid #ddd;">自定义数据源</td>
          <td style="padding: 10px; border: 1px solid #ddd;">any[]</td>
          <td style="padding: 10px; border: 1px solid #ddd;">[]</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">type</td>
          <td style="padding: 10px; border: 1px solid #ddd;">样式类型</td>
          <td style="padding: 10px; border: 1px solid #ddd;">'radio' | 'radioButton'</td>
          <td style="padding: 10px; border: 1px solid #ddd;">'radioButton'</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">onelineNum</td>
          <td style="padding: 10px; border: 1px solid #ddd;">每行显示数量</td>
          <td style="padding: 10px; border: 1px solid #ddd;">number</td>
          <td style="padding: 10px; border: 1px solid #ddd;">-</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">ckRequired</td>
          <td style="padding: 10px; border: 1px solid #ddd;">必填校验</td>
          <td style="padding: 10px; border: 1px solid #ddd;">boolean</td>
          <td style="padding: 10px; border: 1px solid #ddd;">false</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">enable</td>
          <td style="padding: 10px; border: 1px solid #ddd;">是否启用</td>
          <td style="padding: 10px; border: 1px solid #ddd;">boolean</td>
          <td style="padding: 10px; border: 1px solid #ddd;">true</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">enableAllow</td>
          <td style="padding: 10px; border: 1px solid #ddd;">允许选择的选项ID数组</td>
          <td style="padding: 10px; border: 1px solid #ddd;">string[]</td>
          <td style="padding: 10px; border: 1px solid #ddd;">[]</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">cols</td>
          <td style="padding: 10px; border: 1px solid #ddd;">栅格布局1~24</td>
          <td style="padding: 10px; border: 1px solid #ddd;">number | string</td>
          <td style="padding: 10px; border: 1px solid #ddd;">-</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">labelWidth</td>
          <td style="padding: 10px; border: 1px solid #ddd;">标题长度，单位px</td>
          <td style="padding: 10px; border: 1px solid #ddd;">string</td>
          <td style="padding: 10px; border: 1px solid #ddd;">-</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">isLabelWrap</td>
          <td style="padding: 10px; border: 1px solid #ddd;">标题超出长度时是否换行</td>
          <td style="padding: 10px; border: 1px solid #ddd;">boolean</td>
          <td style="padding: 10px; border: 1px solid #ddd;">-</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">noLabel</td>
          <td style="padding: 10px; border: 1px solid #ddd;">是否隐藏标题</td>
          <td style="padding: 10px; border: 1px solid #ddd;">boolean</td>
          <td style="padding: 10px; border: 1px solid #ddd;">false</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">noColon</td>
          <td style="padding: 10px; border: 1px solid #ddd;">是否隐藏冒号</td>
          <td style="padding: 10px; border: 1px solid #ddd;">boolean</td>
          <td style="padding: 10px; border: 1px solid #ddd;">false</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">tip</td>
          <td style="padding: 10px; border: 1px solid #ddd;">提示信息</td>
          <td style="padding: 10px; border: 1px solid #ddd;">string | TemplateRef&lt;void&gt;</td>
          <td style="padding: 10px; border: 1px solid #ddd;">-</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">tipType</td>
          <td style="padding: 10px; border: 1px solid #ddd;">提示类型</td>
          <td style="padding: 10px; border: 1px solid #ddd;">HyTipType</td>
          <td style="padding: 10px; border: 1px solid #ddd;">default</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">explainText</td>
          <td style="padding: 10px; border: 1px solid #ddd;">说明文字</td>
          <td style="padding: 10px; border: 1px solid #ddd;">string | TemplateRef&lt;void&gt;</td>
          <td style="padding: 10px; border: 1px solid #ddd;">-</td>
        </tr>
      </tbody>
    </table>

    <h3>事件</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <thead>
        <tr style="background-color: #f5f5f5;">
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">事件名</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">说明</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">类型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">onChange_model</td>
          <td style="padding: 10px; border: 1px solid #ddd;">选中值变更事件</td>
          <td style="padding: 10px; border: 1px solid #ddd;">EventEmitter&lt;any&gt;</td>
        </tr>
      </tbody>
    </table>

    <h3>HyTipType 类型</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <thead>
        <tr style="background-color: #f5f5f5;">
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">类型</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">default</td>
          <td style="padding: 10px; border: 1px solid #ddd;">默认提示，显示在组件右侧</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">bottomTip</td>
          <td style="padding: 10px; border: 1px solid #ddd;">底部提示，显示在组件下方</td>
        </tr>
      </tbody>
    </table>
  </div>
  `
});

export const Api = TemplateApi.bind({});
Api.storyName = 'API';
Api.parameters = {
  docs: {
    description: {
      story: 'hy-radio组件的API文档，包含所有可配置的属性、事件和类型说明。组件属性分为基础配置、数据源配置、样式配置和功能配置四类，可满足不同场景下的单选需求。'
    }
  }
};