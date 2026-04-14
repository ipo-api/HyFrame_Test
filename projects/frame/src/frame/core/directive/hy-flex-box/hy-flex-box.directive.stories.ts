import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { unit } from 'storybookUnit';
import { BaseModule } from '../../../base/base.module';
import { HyFlexBoxDirective } from './hy-flex-box.directive';
import { ModelService } from '../../_index';

const argTypes = unit.createArgTypes('HyFlexBoxDirective','directive');
export default {
  title: '布局组件/hyFlexBox（弹性布局-指令）',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers:[ModelService]

    }),
  ],
  argTypes
} as Meta;

export const _使用说明 = () => {
  const md = require('./hy-flex-box.directive.md');
  return {
    template: `
      <div class="markdown">
        <markdown>{{md}}</markdown>
      </div>
    `,
    props: {
      md
    }
  };
};

// 横向布局
const Template1: Story<HyFlexBoxDirective> = (args: any) => {
  return {
    props: args,
    template:
    `
    <div style="border:3px solid #ddd;height:100px;width:100%">
      <div hyFlexBox style="border:1px solid;height:100%">
        <div hyWidth="100px" style="border:1px solid red;height:100%" *ngIf="isShow" hyFlexBox hyFlexBoxAlignItems="center">1</div>
        <div hyFlex="1" style="border:1px solid yellow;height:100%"></div>
        <div hyFlex="2" style="border:1px solid blue;height:100%"></div>
      </div>
 
    </div>
    布局说明：在父级div中使用了hyFlexBox指令，子级的三个div分别使用了hyWidth=100px、hyFlex=1、hyFlex=2。  <br/>
    hyFlexBox：使当前这个div内部处于一个flex环境，并且为横向布局模式（默认为横向布局）<br/>
    hyWidth：设置当前div的宽度<br/>
    hyFlex：除去固定的宽度以外，按值分配父级剩余的宽度<br/>
         <button (click)="isShow = !isShow">切换</button>

    `
  }
};
export const panel1 = Template1.bind({});
panel1.args = {
  isShow: true
};
panel1.storyName = '横向布局';
panel1.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <div style="border:3px solid #ddd;height:100px;width:100%">
        <div hyFlexBox style="border:1px solid;height:100%">
          <div hyWidth="100px" style="border:1px solid red;height:100%"></div>
          <div hyFlex="1" style="border:1px solid yellow;height:100%"></div>
          <div hyFlex="2" style="border:1px solid blue;height:100%"></div>
        </div>
      </div>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      hyFlexBox，在父级激活flex布局，并且宽度为100%;
      [hyWidth]="100px"，宽度为100px;
      [hyFlex]="1"、[hyFlex]="2"，剩下的尺寸按照1:2的比例分配剩余的尺寸;
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

// 横向布局-居中类型
const Template11: Story<HyFlexBoxDirective> = (args: any) => {
  return {
    props: args,
    template:
    `
    <strong>hyFlexBoxCenter:center</strong>
    <div style="border:3px solid #ddd;height:100px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxCenter="center" style="height:100%">
        <div hyWidth="50px" style="border:1px solid;"></div>
        <div hyWidth="50px" style="border:1px solid;"></div>
        <div hyWidth="50px" style="border:1px solid;"></div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxCenter:space-between</strong>
    <div style="border:3px solid #ddd;height:100px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxCenter="space-between" style="height:100%">
        <div hyWidth="50px" style="border:1px solid;"></div>
        <div hyWidth="50px" style="border:1px solid;"></div>
        <div hyWidth="50px" style="border:1px solid;"></div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxCenter:space-evenly</strong>
    <div style="border:3px solid #ddd;height:100px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxCenter="space-evenly" style="height:100%">
        <div hyWidth="50px" style="border:1px solid;"></div>
        <div hyWidth="50px" style="border:1px solid;"></div>
        <div hyWidth="50px" style="border:1px solid;"></div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxCenter:space-around</strong>
    <div style="border:3px solid #ddd;height:100px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxCenter="space-around" style="height:100%">
        <div hyWidth="50px" style="border:1px solid;"></div>
        <div hyWidth="50px" style="border:1px solid;"></div>
        <div hyWidth="50px" style="border:1px solid;"></div>
      </div>
    </div>
    `
  }
};
export const panel11 = Template11.bind({});
panel11.storyName = '横向布局-居中方式';
panel11.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <div style="border:3px solid #ddd;height:100px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxCenter="center" style="height:100%">
          <div hyWidth="50px" style="border:1px solid;"></div>
          <div hyWidth="50px" style="border:1px solid;"></div>
          <div hyWidth="50px" style="border:1px solid;"></div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxCenter:space-between</strong>
      <div style="border:3px solid #ddd;height:100px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxCenter="space-between" style="height:100%">
          <div hyWidth="50px" style="border:1px solid;"></div>
          <div hyWidth="50px" style="border:1px solid;"></div>
          <div hyWidth="50px" style="border:1px solid;"></div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxCenter:space-evenly</strong>
      <div style="border:3px solid #ddd;height:100px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxCenter="space-evenly" style="height:100%">
          <div hyWidth="50px" style="border:1px solid;"></div>
          <div hyWidth="50px" style="border:1px solid;"></div>
          <div hyWidth="50px" style="border:1px solid;"></div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxCenter:space-around</strong>
      <div style="border:3px solid #ddd;height:100px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxCenter="space-around" style="height:100%">
          <div hyWidth="50px" style="border:1px solid;"></div>
          <div hyWidth="50px" style="border:1px solid;"></div>
          <div hyWidth="50px" style="border:1px solid;"></div>
        </div>
      </div>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      hyFlexBox，在父级激活flex布局;
      [hyWidth]="50px"，宽度为50px;
      hyFlexBoxDirection="row"，横向布局
      hyFlexBoxCenter="center"，布局模式，如左侧展示图
      hyFlexBoxCenter="space-between"，布局模式，如左侧展示
      hyFlexBoxCenter="space-evenly"，布局模式，如左侧展示
      hyFlexBoxCenter="space-around"，布局模式，如左侧展示
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

// 横向布局-对齐方式
const Template13: Story<HyFlexBoxDirective> = (args: any) => {
  return {
    props: args,
    template:
    `
    <strong>hyFlexBoxAlignItems:flex-start（默认）</strong>
    <div style="border:3px solid #ddd;height:100px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxAlignItems="flex-start" style="height:100%">
        <div hyWidth="50px" style="border:1px solid;height:30px;"></div>
        <div hyWidth="50px" style="border:1px solid;height:50px;"></div>
        <div hyWidth="50px" style="border:1px solid;height:70px;"></div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxAlignItems:center</strong>
    <div style="border:3px solid #ddd;height:100px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxAlignItems="center" style="height:100%">
        <div hyWidth="50px" style="border:1px solid;height:30px;"></div>
        <div hyWidth="50px" style="border:1px solid;height:50px;"></div>
        <div hyWidth="50px" style="border:1px solid;height:70px;"></div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxAlignItems:flex-end</strong>
    <div style="border:3px solid #ddd;height:100px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxAlignItems="flex-end" style="height:100%">
        <div hyWidth="50px" style="border:1px solid;height:30px;"></div>
        <div hyWidth="50px" style="border:1px solid;height:50px;"></div>
        <div hyWidth="50px" style="border:1px solid;height:70px;"></div>
      </div>
    </div>
    `
  }
};
export const panel13 = Template13.bind({});
panel13.storyName = '横向布局-垂直对齐方式';
panel13.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <strong>hyFlexBoxAlignItems:flex-start（默认）</strong>
      <div style="border:3px solid #ddd;height:100px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxAlignItems="flex-start" style="height:100%">
          <div hyWidth="50px" style="border:1px solid;height:30px;"></div>
          <div hyWidth="50px" style="border:1px solid;height:50px;"></div>
          <div hyWidth="50px" style="border:1px solid;height:70px;"></div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxAlignItems:center</strong>
      <div style="border:3px solid #ddd;height:100px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxAlignItems="center" style="height:100%">
          <div hyWidth="50px" style="border:1px solid;height:30px;"></div>
          <div hyWidth="50px" style="border:1px solid;height:50px;"></div>
          <div hyWidth="50px" style="border:1px solid;height:70px;"></div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxAlignItems:flex-end</strong>
      <div style="border:3px solid #ddd;height:100px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="row" hyFlexBoxAlignItems="flex-end" style="height:100%">
          <div hyWidth="50px" style="border:1px solid;height:30px;"></div>
          <div hyWidth="50px" style="border:1px solid;height:50px;"></div>
          <div hyWidth="50px" style="border:1px solid;height:70px;"></div>
        </div>
      </div>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      hyFlexBox，在父级激活flex布局;
      [hyWidth]="50px"，宽度为50px;
      hyFlexBoxDirection="row"，横向布局
      hyFlexBoxAlignItems="flex-start"，垂直顶部对齐
      hyFlexBoxAlignItems="center"，垂直居中对齐
      hyFlexBoxAlignItems="flex-end"，垂直底部对齐
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

// 横向布局-间隙设置
const Template14: Story<HyFlexBoxDirective> = (args: any) => {
  return {
    props: args,
    template:
    `
    <strong>无间隙（默认）</strong>
    <div style="border:3px solid #ddd;height:100px;width:100%">
      <div hyFlexBox style="height:100%">
        <div hyFlex="1" style="border:1px solid red;height:100%">内容1</div>
        <div hyFlex="1" style="border:1px solid yellow;height:100%">内容2</div>
        <div hyFlex="1" style="border:1px solid blue;height:100%">内容3</div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxGap:10px</strong>
    <div style="border:3px solid #ddd;height:100px;width:100%">
      <div hyFlexBox hyFlexBoxGap="10px" style="height:100%">
        <div hyFlex="1" style="border:1px solid red;height:100%">内容1</div>
        <div hyFlex="1" style="border:1px solid yellow;height:100%">内容2</div>
        <div hyFlex="1" style="border:1px solid blue;height:100%">内容3</div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxGap:20px</strong>
    <div style="border:3px solid #ddd;height:100px;width:100%">
      <div hyFlexBox hyFlexBoxGap="20px" style="height:100%">
        <div hyFlex="1" style="border:1px solid red;height:100%">内容1</div>
        <div hyFlex="1" style="border:1px solid yellow;height:100%">内容2</div>
        <div hyFlex="1" style="border:1px solid blue;height:100%">内容3</div>
      </div>
    </div>
    `
  }
};
export const panel14 = Template14.bind({});
panel14.storyName = '横向布局-间隙设置';
panel14.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <strong>无间隙（默认）</strong>
      <div style="border:3px solid #ddd;height:100px;width:100%">
        <div hyFlexBox style="height:100%">
          <div hyFlex="1" style="border:1px solid red;height:100%">内容1</div>
          <div hyFlex="1" style="border:1px solid yellow;height:100%">内容2</div>
          <div hyFlex="1" style="border:1px solid blue;height:100%">内容3</div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxGap:10px</strong>
      <div style="border:3px solid #ddd;height:100px;width:100%">
        <div hyFlexBox hyFlexBoxGap="10px" style="height:100%">
          <div hyFlex="1" style="border:1px solid red;height:100%">内容1</div>
          <div hyFlex="1" style="border:1px solid yellow;height:100%">内容2</div>
          <div hyFlex="1" style="border:1px solid blue;height:100%">内容3</div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxGap:20px</strong>
      <div style="border:3px solid #ddd;height:100px;width:100%">
        <div hyFlexBox hyFlexBoxGap="20px" style="height:100%">
          <div hyFlex="1" style="border:1px solid red;height:100%">内容1</div>
          <div hyFlex="1" style="border:1px solid yellow;height:100%">内容2</div>
          <div hyFlex="1" style="border:1px solid blue;height:100%">内容3</div>
        </div>
      </div>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      hyFlexBox，在父级激活flex布局;
      hyFlexBoxGap="10px"，设置子元素间隙为10px;
      hyFlexBoxGap="20px"，设置子元素间隙为20px;
      指令会自动处理容器和子元素的尺寸，确保布局正确;
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

// 横向布局-左右布局
const Template12: Story<HyFlexBoxDirective> = (args: any) => {
  return {
    props: args,
    template:
    `
    布局说明：在父级div中使用了hyFlexBox指令，子级中的div使用了hyRight<br/>
    hyFlexBox：使当前这个div内部处于一个flex环境，并且为横向布局模式（默认为横向布局）<br/>
    hyRight：当前元素靠右<br/>
    <strong>hyRight</strong>
    <hy-form>
      <div hyFlexBox style="border:1px solid">
        <hy-button title="按钮1"></hy-button>
        <hy-button title="按钮2"></hy-button>
        <div hyRight>
          <hy-button title="按钮3"></hy-button>
          <hy-button title="按钮4"></hy-button>
        </div>
      </div>
      <div hyFlexBox style="border:1px solid">
        <hy-button hyRight title="按钮4"></hy-button>
      </div>
    </hy-form>
    <strong>hyRight:50px</strong>
    <hy-form>
      <div hyFlexBox style="border:1px solid">
        <hy-button title="按钮1"></hy-button>
        <hy-button title="按钮2"></hy-button>
        <div hyRight="20px">
          <hy-button title="按钮3"></hy-button>
          <hy-button title="按钮4"></hy-button>
        </div>
      </div>
    </hy-form>
    `
  }
};
export const panel12 = Template12.bind({});
panel12.storyName = '横向布局-左右布局';
panel12.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <hy-form>
        <div hyFlexBox style="border:1px solid">
          <hy-button title="按钮1"></hy-button>
          <hy-button title="按钮2"></hy-button>
          <div hyRight>
            <hy-button title="按钮3"></hy-button>
            <hy-button title="按钮4"></hy-button>
          </div>
        </div>
        <div hyFlexBox style="border:1px solid">
          <hy-button hyRight title="按钮4"></hy-button>
        </div>
      </hy-form>
      <strong>hyRight:20px</strong>
      <hy-form>
        <div hyFlexBox style="border:1px solid">
          <hy-button title="按钮1"></hy-button>
          <hy-button title="按钮2"></hy-button>
          <div hyRight="20px">
            <hy-button title="按钮3"></hy-button>
            <hy-button title="按钮4"></hy-button>
          </div>
        </div>
      </hy-form>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      hyFlexBox，在父级激活flex布局;
      hyRight，整体靠右;
      hyRight="20px"，整体靠右20px;
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

// 纵向布局
const Template2: Story<HyFlexBoxDirective> = (args: any) => {
  return {
    props: args,
    template:
    `
    <div style="border:3px solid #ddd;height:500px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="column" style="border:1px solid;height:100%">
        <div hyHeight="50px" style="border:1px solid red;"></div>
        <div hyFlex="1" style="border:1px solid yellow;"></div>
        <div hyFlex="2" style="border:1px solid blue;"></div>
      </div>
    </div>
    布局说明：在父级div中使用了hyFlexBox指令，子级的三个div分别使用了hyHeight=50px、hyFlex=1、hyFlex=2。  <br/>
    hyFlexBox：使当前这个div内部处于一个flex环境，并且为纵向布局模式<br/>
    hyHeight：设置当前div的高度<br/>
    hyFlex：除去固定的高度以外，按值分配父级剩余的高度<br/>

    `
  }
};
export const panel2 = Template2.bind({});
panel2.storyName = '纵向布局';
panel2.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <div style="border:3px solid #ddd;height:500px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="column" style="border:1px solid;height:100%">
          <div hyHeight="50px" style="border:1px solid red;"></div>
          <div hyFlex="1" style="border:1px solid yellow;"></div>
          <div hyFlex="2" style="border:1px solid blue;"></div>
        </div>
      </div>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      hyFlexBox，在父级激活flex布局，并且高度为100%;
      hyFlexBoxDirection="column"，flex布局模式改为纵向布局
      hyHeight="50px"，高度为50px;
      [hyFlex]="1"、[hyFlex]="2"，剩下的尺寸按照1:2的比例分配剩余的尺寸;
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};


// 纵向布局-居中类型
const Template21: Story<HyFlexBoxDirective> = (args: any) => {
  return {
    props: args,
    template:
    `
    布局说明：在父级div中使用了hyFlexBox指令，子级的三个div分别使用了hyHeight=50px。<br/>
    hyFlexBox：使当前这个div内部处于一个flex环境，并且为纵向布局模式<br/>
    hyHeight：设置当前div的高度<br/>
    hyFlexBoxCenter：当前居中模式<br><br>
    <strong>hyFlexBoxCenter:center</strong>
    <div style="border:3px solid #ddd;height:300px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxCenter="center" style="height:100%">
        <div hyHeight="50px" style="border:1px solid;"></div>
        <div hyHeight="50px" style="border:1px solid;"></div>
        <div hyHeight="50px" style="border:1px solid;"></div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxCenter:space-between</strong>
    <div style="border:3px solid #ddd;height:300px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxCenter="space-between" style="height:100%">
        <div hyHeight="50px" style="border:1px solid;"></div>
        <div hyHeight="50px" style="border:1px solid;"></div>
        <div hyHeight="50px" style="border:1px solid;"></div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxCenter:space-evenly</strong>
    <div style="border:3px solid #ddd;height:300px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxCenter="space-evenly" style="height:100%">
        <div hyHeight="50px" style="border:1px solid;"></div>
        <div hyHeight="50px" style="border:1px solid;"></div>
        <div hyHeight="50px" style="border:1px solid;"></div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxCenter:space-around</strong>
    <div style="border:3px solid #ddd;height:300px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxCenter="space-around" style="height:100%">
        <div hyHeight="50px" style="border:1px solid;"></div>
        <div hyHeight="50px" style="border:1px solid;"></div>
        <div hyHeight="50px" style="border:1px solid;"></div>
      </div>
    </div>
    `
  }
};
export const panel21 = Template21.bind({});
panel21.storyName = '纵向布局-居中方式';
panel21.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <strong>hyFlexBoxCenter:center</strong>
      <div style="border:3px solid #ddd;height:300px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxCenter="center" style="height:100%">
          <div hyHeight="50px" style="border:1px solid;"></div>
          <div hyHeight="50px" style="border:1px solid;"></div>
          <div hyHeight="50px" style="border:1px solid;"></div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxCenter:space-between</strong>
      <div style="border:3px solid #ddd;height:300px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxCenter="space-between" style="height:100%">
          <div hyHeight="50px" style="border:1px solid;"></div>
          <div hyHeight="50px" style="border:1px solid;"></div>
          <div hyHeight="50px" style="border:1px solid;"></div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxCenter:space-evenly</strong>
      <div style="border:3px solid #ddd;height:300px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxCenter="space-evenly" style="height:100%">
          <div hyHeight="50px" style="border:1px solid;"></div>
          <div hyHeight="50px" style="border:1px solid;"></div>
          <div hyHeight="50px" style="border:1px solid;"></div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxCenter:space-around</strong>
      <div style="border:3px solid #ddd;height:300px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxCenter="space-around" style="height:100%">
          <div hyHeight="50px" style="border:1px solid;"></div>
          <div hyHeight="50px" style="border:1px solid;"></div>
          <div hyHeight="50px" style="border:1px solid;"></div>
        </div>
      </div>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      hyFlexBox，在父级激活flex布局;
      [hyHeight]="50px"，高度为50px;
      hyFlexBoxDirection="column"，纵向布局
      hyFlexBoxCenter="center"，布局模式，如左侧展示图
      hyFlexBoxCenter="space-between"，布局模式，如左侧展示
      hyFlexBoxCenter="space-evenly"，布局模式，如左侧展示
      hyFlexBoxCenter="space-around"，布局模式，如左侧展示
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

// 纵向布局-对齐方式
const Template22: Story<HyFlexBoxDirective> = (args: any) => {
  return {
    props: args,
    template:
    `
    <strong>hyFlexBoxAlignItems:flex-start（默认）</strong>
    <div style="border:3px solid #ddd;height:300px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxAlignItems="flex-start" style="height:100%">
        <div hyHeight="50px" style="border:1px solid;width:50px;"></div>
        <div hyHeight="50px" style="border:1px solid;width:100px;"></div>
        <div hyHeight="50px" style="border:1px solid;width:150px;"></div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxAlignItems:center</strong>
    <div style="border:3px solid #ddd;height:300px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxAlignItems="center" style="height:100%">
        <div hyHeight="50px" style="border:1px solid;width:50px;"></div>
        <div hyHeight="50px" style="border:1px solid;width:100px;"></div>
        <div hyHeight="50px" style="border:1px solid;width:150px;"></div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxAlignItems:flex-end</strong>
    <div style="border:3px solid #ddd;height:300px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxAlignItems="flex-end" style="height:100%">
        <div hyHeight="50px" style="border:1px solid;width:50px;"></div>
        <div hyHeight="50px" style="border:1px solid;width:100px;"></div>
        <div hyHeight="50px" style="border:1px solid;width:150px;"></div>
      </div>
    </div>
    `
  }
};
export const panel22 = Template22.bind({});
panel22.storyName = '纵向布局-水平对齐方式';
panel22.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <strong>hyFlexBoxAlignItems:flex-start（默认）</strong>
      <div style="border:3px solid #ddd;height:300px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxAlignItems="flex-start" style="height:100%">
          <div hyHeight="50px" style="border:1px solid;width:50px;"></div>
          <div hyHeight="50px" style="border:1px solid;width:100px;"></div>
          <div hyHeight="50px" style="border:1px solid;width:150px;"></div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxAlignItems:center</strong>
      <div style="border:3px solid #ddd;height:300px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxAlignItems="center" style="height:100%">
          <div hyHeight="50px" style="border:1px solid;width:50px;"></div>
          <div hyHeight="50px" style="border:1px solid;width:100px;"></div>
          <div hyHeight="50px" style="border:1px solid;width:150px;"></div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxAlignItems:flex-end</strong>
      <div style="border:3px solid #ddd;height:300px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxAlignItems="flex-end" style="height:100%">
          <div hyHeight="50px" style="border:1px solid;width:50px;"></div>
          <div hyHeight="50px" style="border:1px solid;width:100px;"></div>
          <div hyHeight="50px" style="border:1px solid;width:150px;"></div>
        </div>
      </div>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      hyFlexBox，在父级激活flex布局;
      [hyHeight]="50px"，高度为50px;
      hyFlexBoxDirection="column"，纵向布局
      hyFlexBoxAlignItems="flex-start"，水平左对齐
      hyFlexBoxAlignItems="center"，水平居中对齐
      hyFlexBoxAlignItems="flex-end"，水平右对齐
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

// 纵向布局-间隙设置
const Template23: Story<HyFlexBoxDirective> = (args: any) => {
  return {
    props: args,
    template:
    `
    <strong>无间隙（默认）</strong>
    <div style="border:3px solid #ddd;height:300px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="column" style="height:100%">
        <div hyFlex="1" style="border:1px solid red;">内容1</div>
        <div hyFlex="1" style="border:1px solid yellow;">内容2</div>
        <div hyFlex="1" style="border:1px solid blue;">内容3</div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxGap:10px</strong>
    <div style="border:3px solid #ddd;height:300px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxGap="10px" style="height:100%">
        <div hyFlex="1" style="border:1px solid red;">内容1</div>
        <div hyFlex="1" style="border:1px solid yellow;">内容2</div>
        <div hyFlex="1" style="border:1px solid blue;">内容3</div>
      </div>
    </div>
    <br>
    <strong>hyFlexBoxGap:20px</strong>
    <div style="border:3px solid #ddd;height:300px;width:100%">
      <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxGap="20px" style="height:100%">
        <div hyFlex="1" style="border:1px solid red;">内容1</div>
        <div hyFlex="1" style="border:1px solid yellow;">内容2</div>
        <div hyFlex="1" style="border:1px solid blue;">内容3</div>
      </div>
    </div>
    `
  }
};
export const panel23 = Template23.bind({});
panel23.storyName = '纵向布局-间隙设置';
panel23.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <strong>无间隙（默认）</strong>
      <div style="border:3px solid #ddd;height:300px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="column" style="height:100%">
          <div hyFlex="1" style="border:1px solid red;">内容1</div>
          <div hyFlex="1" style="border:1px solid yellow;">内容2</div>
          <div hyFlex="1" style="border:1px solid blue;">内容3</div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxGap:10px</strong>
      <div style="border:3px solid #ddd;height:300px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxGap="10px" style="height:100%">
          <div hyFlex="1" style="border:1px solid red;">内容1</div>
          <div hyFlex="1" style="border:1px solid yellow;">内容2</div>
          <div hyFlex="1" style="border:1px solid blue;">内容3</div>
        </div>
      </div>
      <br>
      <strong>hyFlexBoxGap:20px</strong>
      <div style="border:3px solid #ddd;height:300px;width:100%">
        <div hyFlexBox hyFlexBoxDirection="column" hyFlexBoxGap="20px" style="height:100%">
          <div hyFlex="1" style="border:1px solid red;">内容1</div>
          <div hyFlex="1" style="border:1px solid yellow;">内容2</div>
          <div hyFlex="1" style="border:1px solid blue;">内容3</div>
        </div>
      </div>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      hyFlexBox，在父级激活flex布局;
      hyFlexBoxDirection="column"，纵向布局
      hyFlexBoxGap="10px"，设置子元素间隙为10px;
      hyFlexBoxGap="20px"，设置子元素间隙为20px;
      指令会自动处理容器和子元素的尺寸，确保布局正确;
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

// 综合示例
const Template3: Story<HyFlexBoxDirective> = (args: any) => {
  return {
    props: args,
    template:
    `
    <strong>导航栏布局示例</strong>
    <div style="border:3px solid #ddd;height:60px;width:100%;">
      <div hyFlexBox 
           hyFlexBoxDirection="row" 
           hyFlexBoxCenter="space-between" 
           hyFlexBoxAlignItems="center"
           hyFlexBoxGap="10px"
           style="height:100%;padding:0 20px;">
        <div hyWidth="150px" style="border:1px solid;text-align:center;padding:10px;">Logo区域</div>
        <div hyFlex="1" style="border:1px solid;text-align:center;padding:10px;">导航菜单</div>
        <div hyRight="20px" style="border:1px solid;text-align:center;padding:10px;">用户信息</div>
      </div>
    </div>
    <br>
    <strong>侧边栏布局示例</strong>
    <div style="border:3px solid #ddd;height:400px;width:200px;">
      <div hyFlexBox 
           hyFlexBoxDirection="column" 
           hyFlexBoxGap="10px"
           style="height:100%;padding:10px;">
        <div hyHeight="50px" style="border:1px solid;text-align:center;line-height:50px;">头部</div>
        <div hyFlex="1" style="border:1px solid;text-align:center;display:flex;align-items:center;justify-content:center;">内容区域</div>
        <div hyHeight="40px" style="border:1px solid;text-align:center;line-height:40px;">底部</div>
      </div>
    </div>
    `
  }
};
export const panel3 = Template3.bind({});
panel3.storyName = '综合布局示例';
panel3.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <!-- 导航栏布局示例 -->
      <div style="border:3px solid #ddd;height:60px;width:100%;">
        <div hyFlexBox 
             hyFlexBoxDirection="row" 
             hyFlexBoxCenter="space-between" 
             hyFlexBoxAlignItems="center"
             hyFlexBoxGap="10px"
             style="height:100%;padding:0 20px;">
          <div hyWidth="150px" style="border:1px solid;text-align:center;padding:10px;">Logo区域</div>
          <div hyFlex="1" style="border:1px solid;text-align:center;padding:10px;">导航菜单</div>
          <div hyRight="20px" style="border:1px solid;text-align:center;padding:10px;">用户信息</div>
        </div>
      </div>
      
      <!-- 侧边栏布局示例 -->
      <div style="border:3px solid #ddd;height:400px;width:200px;">
        <div hyFlexBox 
             hyFlexBoxDirection="column" 
             hyFlexBoxGap="10px"
             style="height:100%;padding:10px;">
          <div hyHeight="50px" style="border:1px solid;text-align:center;line-height:50px;">头部</div>
          <div hyFlex="1" style="border:1px solid;text-align:center;display:flex;align-items:center;justify-content:center;">内容区域</div>
          <div hyHeight="40px" style="border:1px solid;text-align:center;line-height:40px;">底部</div>
        </div>
      </div>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "使用说明",
      template: `
      综合展示hyFlexBox指令的实际应用场景：
      
      导航栏布局：
      - hyFlexBoxDirection="row" 横向布局
      - hyFlexBoxCenter="space-between" 两端对齐
      - hyFlexBoxAlignItems="center" 垂直居中
      - hyFlexBoxGap="10px" 设置间隙
      - hyWidth="150px" 固定Logo宽度
      - hyFlex="1" 导航菜单占剩余空间
      - hyRight="20px" 用户信息右对齐
      
      侧边栏布局：
      - hyFlexBoxDirection="column" 纵向布局
      - hyFlexBoxGap="10px" 设置间隙
      - hyHeight="50px"/"40px" 固定头部底部高度
      - hyFlex="1" 内容区域占剩余空间
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};
