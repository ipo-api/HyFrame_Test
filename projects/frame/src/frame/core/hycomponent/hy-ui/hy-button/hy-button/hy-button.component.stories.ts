import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyButtonComponent } from './hy-button.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

const argTypes = unit.createArgTypes('HyButtonComponent');

class MockPricingService implements Partial<ModelService> {
  constructor(){
  }
}

export default {
  title: '基础组件/hy-button（按钮）',
  component: HyButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, { provide: ModelService, useClass: MockPricingService }]
    }),
  ],
  argTypes,
} as Meta;

// 基础用法示例
const BasicTemplate: Story<HyButtonComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础按钮用法</h3>
      <p>最常用的按钮类型，支持点击事件和基础配置</p>
      
    <hy-form>
      <hy-button title="默认按钮" (onClick)="handleClick('默认按钮')"></hy-button>
      <hy-button title="主要按钮" type="primary" (onClick)="handleClick('主要按钮')"></hy-button>
      <hy-button title="虚线按钮" type="dashed" (onClick)="handleClick('虚线按钮')"></hy-button>
      <hy-button title="链接按钮" type="link" (onClick)="handleClick('链接按钮')"></hy-button>
    </hy-form>
    </div>
  `
});

export const basic = BasicTemplate.bind({});
basic.args = {
  handleClick: (buttonText: string) => {
    console.log(`点击了：${buttonText}`);
    alert(`点击了：${buttonText}`);
  }
};
basic.storyName = '基础用法';

// 内容投射示例
const ContentProjectionTemplate: Story<HyButtonComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>内容投射用法</h3>
      <p>通过内容投射实现更灵活的按钮内容，支持图标、文字和复杂HTML结构</p>
      
    <hy-form>
      <hy-gt model="contentBtn">
        <!-- 纯文字内容投射 -->
        <hy-button type="primary" (onClick)="handleClick('文字投射')">
          自定义文字内容
        </hy-button>
        
        <!-- 图标+文字内容投射 -->
        <hy-button type="default" (onClick)="handleClick('图标投射')">
          <i nz-icon nzType="save" style="margin-right: 4px;"></i>
          保存文档
        </hy-button>
        
        <!-- 复杂HTML内容投射 -->
        <hy-button type="dashed" (onClick)="handleClick('复杂投射')">
          <span>
            <i nz-icon nzType="plus"></i>
            <strong>添加项目</strong>
          </span>
        </hy-button>
        
        <!-- 链接按钮内容投射 -->
        <hy-button type="link" (onClick)="handleClick('链接投射')">
          <i nz-icon nzType="link" style="margin-right: 4px;"></i>
          跳转链接
        </hy-button>
      </hy-gt>
    </hy-form>
    </div>
  `
});

export const contentProjection = ContentProjectionTemplate.bind({});
contentProjection.args = {
  handleClick: (buttonText: string) => {
    console.log(`点击了：${buttonText}`);
    alert(`点击了：${buttonText}`);
  }
};
contentProjection.storyName = '内容投射';
contentProjection.parameters = {
  docs: {
    description: {
      story: `
## 内容投射

内容投射是 Angular 的核心特性之一，允许在组件标签内部传递自定义内容。hy-button 组件完全支持内容投射，让您可以创建更加灵活和丰富的按钮内容。

### 🎯 使用场景

#### 纯文字内容
最简单的内容投射方式，直接在按钮标签内放置文字：
\\\`\\\`\\\`html
<hy-button type="primary">
  自定义文字内容
</hy-button>
\\\`\\\`\\\`

#### 图标+文字组合
结合图标和文字，创建更直观的按钮：
\\\`\\\`\\\`html
<hy-button type="default">
  <i nz-icon nzType="save" style="margin-right: 4px;"></i>
  保存文档
</hy-button>
\\\`\\\`\\\`

#### 复杂HTML结构
支持任意复杂的HTML结构，包括样式和嵌套元素：
\\\`\\\`\\\`html
<hy-button type="dashed">
  <span>
    <i nz-icon nzType="plus"></i>
    <strong>添加项目</strong>
  </span>
</hy-button>
\\\`\\\`\\\`

### 💡 最佳实践

1. **保持简洁**: 虽然支持复杂内容，但建议保持按钮内容简洁明了
2. **语义化**: 使用有意义的图标和文字组合，提升用户体验
3. **一致性**: 在同一应用中保持按钮样式的一致性
4. **可访问性**: 确保按钮内容对屏幕阅读器友好

### ⚡ 性能提示

- 内容投射不会影响组件性能
- 复杂的HTML结构会增加渲染时间，请适度使用
- 图标建议使用 Ant Design 的 nz-icon 组件

### 🔄 与 title 属性的区别

| 方式 | 适用场景 | 灵活性 | 性能 |
|------|----------|--------|------|
| title 属性 | 简单文字按钮 | 低 | 高 |
| 内容投射 | 复杂内容按钮 | 高 | 中等 |

当只需要显示纯文字时，推荐使用 \\\`title\\\` 属性；当需要图标、样式或复杂布局时，使用内容投射。
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="contentBtn">
    <!-- 纯文字内容投射 -->
    <hy-button type="primary" (onClick)="handleClick('文字')">
      自定义文字内容
    </hy-button>
    
    <!-- 图标+文字内容投射 -->
    <hy-button type="default" (onClick)="handleClick('图标')">
      <i nz-icon nzType="save" style="margin-right: 4px;"></i>
      保存文档
    </hy-button>
    
    <!-- 复杂HTML内容投射 -->
    <hy-button type="dashed" (onClick)="handleClick('复杂')">
      <span>
        <i nz-icon nzType="plus"></i>
        <strong>添加项目</strong>
      </span>
    </hy-button>
    
    <!-- 链接按钮内容投射 -->
    <hy-button type="link" (onClick)="handleClick('链接')">
      <i nz-icon nzType="link" style="margin-right: 4px;"></i>
      跳转链接
    </hy-button>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-content-projection-demo',
  templateUrl: './content-projection-demo.component.html'
})
export class ContentProjectionDemoComponent {
  handleClick(type: string) {
    console.log(\`点击了\${type}按钮\`);
    // 处理按钮点击逻辑
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

按钮是用户界面中最基础的交互元素，用于触发操作或跳转页面。

### 按钮类型
- **default**: 默认按钮，用于次要操作
- **primary**: 主要按钮，用于主要操作（如提交、确认）
- **dashed**: 虚线按钮，用于添加操作
- **link**: 链接按钮，用于跳转或轻量级操作

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| title | 按钮文字 | string | - |
| type | 按钮类型 | string | 'default' |
| (onClick) | 点击事件 | EventEmitter | - |

### 内容投射
除了使用 \`title\` 属性设置按钮文字，还可以通过内容投射实现更灵活的按钮内容：

\`\`\`html
<!-- 普通按钮内容投射 -->
<hy-button type="primary">
  自定义内容
</hy-button>

<!-- 链接按钮内容投射 -->
<hy-button type="link">
  自定义链接
</hy-button>
\`\`\`
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="basicBtn">
    <hy-button title="默认按钮" (onClick)="handleClick('默认')"></hy-button>
    <hy-button title="主要按钮" type="primary" (onClick)="handleClick('主要')"></hy-button>
    <hy-button title="虚线按钮" type="dashed" (onClick)="handleClick('虚线')"></hy-button>
    <hy-button title="链接按钮" type="link" (onClick)="handleClick('链接')"></hy-button>
    
    <!-- 内容投射示例 -->
    <hy-button type="primary" (onClick)="handleClick('投射按钮')">
      <i nz-icon nzType="save" style="margin-right: 4px;"></i>
      内容投射按钮
    </hy-button>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-button-demo',
  templateUrl: './button-demo.component.html'
})
export class ButtonDemoComponent {
  handleClick(buttonType: string) {
    console.log(\`点击了：\${buttonType}按钮\`);
    alert(\`点击了：\${buttonType}按钮\`);
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 按钮状态示例
const StateTemplate: Story<HyButtonComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>加载状态</h4>
        <p>按钮在执行异步操作时显示加载状态</p>
    <hy-form>
          <hy-gt model="loadingBtn">
            <hy-button title="普通状态" (onClick)="handleClick('普通')"></hy-button>
            <hy-button title="加载中..." [loading]="true" (onClick)="handleClick('加载')"></hy-button>
            <hy-button title="点击后加载" [loading]="isLoading" (onClick)="handleLoadingClick()"></hy-button>
      </hy-gt>
    </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>禁用状态</h4>
        <p>按钮在特定条件下禁用交互</p>
        <hy-form>
          <hy-gt model="disabledBtn">
            <hy-button title="可用按钮" (onClick)="handleClick('可用')"></hy-button>
            <hy-button title="禁用按钮" [disabled]="true" (onClick)="handleClick('禁用')"></hy-button>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>倒计时按钮</h4>
        <p>按钮点击后进入倒计时状态，常用于验证码发送</p>
        <hy-form>
          <hy-gt model="countdownBtn">
            <hy-button [disableTime]="5000" title="5秒倒计时" (onClick)="handleClick('倒计时')"></hy-button>
            <hy-button [disableTime]="10000" title="10秒倒计时" (onClick)="handleClick('倒计时')"></hy-button>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const states = StateTemplate.bind({});
states.args = {
  isLoading: false,
  handleClick: (buttonText: string) => {
    console.log(`点击了：${buttonText}`);
  },
  handleLoadingClick: function() {
    this.isLoading = true;
    console.log('开始加载...');
    // 模拟异步操作
    setTimeout(() => {
      this.isLoading = false;
      console.log('加载完成');
    }, 3000);
  }
};
states.storyName = '按钮状态';
states.parameters = {
  docs: {
    description: {
      story: `
## 按钮状态

按钮支持多种状态来反映当前的交互情况，提升用户体验。

### 🔄 加载状态
- 用于异步操作进行时
- 防止用户重复点击
- 提供视觉反馈

### 🚫 禁用状态  
- 用于条件不满足时
- 防止无效操作
- 引导用户完成前置条件

### ⏱️ 倒计时状态
- 用于限制操作频率
- 常见于验证码发送
- 自动恢复可用状态

### 状态配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| loading | 加载状态 | boolean | false |
| disabled | 禁用状态 | boolean | false |
| disableTime | 倒计时时间(ms) | number | - |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="stateBtn">
    <!-- 加载状态 -->
    <hy-button title="加载中..." [loading]="true"></hy-button>
    <hy-button title="点击加载" [loading]="isLoading" (onClick)="startLoading()"></hy-button>
    
    <!-- 禁用状态 -->
    <hy-button title="禁用按钮" [disabled]="true"></hy-button>
    
    <!-- 倒计时状态 -->
    <hy-button [disableTime]="60000" title="发送验证码" (onClick)="sendCode()"></hy-button>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-button-state-demo',
  templateUrl: './button-state-demo.component.html'
})
export class ButtonStateDemoComponent {
  isLoading = false;

  // 开始加载
  startLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      console.log('操作完成');
    }, 3000);
  }

  // 发送验证码
  sendCode() {
    console.log('发送验证码...');
    // 倒计时会自动处理
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 按钮样式示例
const StyleTemplate: Story<HyButtonComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>按钮类型</h4>
        <p>不同类型的按钮适用于不同的场景</p>
    <hy-form>
          <hy-gt model="typeBtn">
            <hy-button title="默认" type="default" (onClick)="handleClick('默认')"></hy-button>
            <hy-button title="主要" type="primary" (onClick)="handleClick('主要')"></hy-button>
            <hy-button title="虚线" type="dashed" (onClick)="handleClick('虚线')"></hy-button>
            <hy-button title="链接" type="link" (onClick)="handleClick('链接')"></hy-button>
            <hy-button title="危险" type="danger" (onClick)="handleClick('危险')"></hy-button>
      </hy-gt>
    </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>按钮形状</h4>
        <p>不同形状的按钮提供不同的视觉效果</p>
        <hy-form>
          <hy-gt model="shapeBtn">
            <hy-button title="默认形状" shape="null" (onClick)="handleClick('默认形状')"></hy-button>
            <hy-button title="圆角按钮" shape="round" (onClick)="handleClick('圆角')"></hy-button>
            <hy-button title="圆形" shape="circle" nzIconName="plus" (onClick)="handleClick('圆形')"></hy-button>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>预设样式按钮</h4>
        <p>根据按钮标题自动匹配样式和图标</p>
        <hy-form>
          <hy-gt model="presetBtn">
            <hy-button title="保存" (onClick)="handleClick('保存')"></hy-button>
            <hy-button title="删除" (onClick)="handleClick('删除')"></hy-button>
            <hy-button title="返回" (onClick)="handleClick('返回')"></hy-button>
            <hy-button title="取消" (onClick)="handleClick('取消')"></hy-button>
            <hy-button title="编辑" (onClick)="handleClick('编辑')"></hy-button>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const styles = StyleTemplate.bind({});
styles.args = {
  handleClick: (buttonText: string) => {
    console.log(`点击了：${buttonText}`);
  }
};
styles.storyName = '按钮样式';
styles.parameters = {
  docs: {
    description: {
      story: `
## 按钮样式

按钮提供多种样式选项，满足不同设计需求和使用场景。

### 🎨 按钮类型样式

#### Primary（主要）
- 用于主要操作（提交、确认、保存）
- 具有最高的视觉权重
- 一个页面建议只有一个主要按钮

#### Default（默认）
- 用于次要操作
- 平衡的视觉权重
- 最常用的按钮类型

#### Dashed（虚线）
- 用于添加操作
- 轻量的视觉表现
- 常用于"添加"、"新建"场景

#### Link（链接）
- 用于跳转或轻量级操作
- 最轻的视觉权重
- 适合辅助功能

#### Danger（危险）
- 用于删除、取消等危险操作
- 警示性的红色主题
- 需要用户谨慎操作

### 🔷 按钮形状

#### 默认形状
- 标准的矩形按钮
- 适合大多数场景

#### Round（圆角）
- 圆角矩形按钮
- 更现代的视觉效果

#### Circle（圆形）
- 圆形按钮，通常配合图标使用
- 适合工具栏或浮动操作

### 🎯 预设样式

框架内置了常用操作的预设样式：
- **保存**: 自动应用保存图标和主要样式
- **删除**: 自动应用删除图标和危险样式
- **返回**: 自动应用返回图标和默认样式
- **取消**: 自动应用取消图标和默认样式
- **编辑**: 自动应用编辑图标和默认样式

### 样式配置
| 属性 | 说明 | 类型 | 可选值 |
|------|------|------|---------|
| type | 按钮类型 | string | default/primary/dashed/link/danger |
| shape | 按钮形状 | string | null/round/circle |
| size | 按钮尺寸 | string | small/default/large |
`
    }
  }
};

