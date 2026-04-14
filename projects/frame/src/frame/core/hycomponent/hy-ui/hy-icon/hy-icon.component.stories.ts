import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../base/base.module';
import { HyIconComponent } from './hy-icon.component';
import { unit } from '../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

const argTypes = unit.createArgTypes('HyIconComponent');

class MockPricingService implements Partial<ModelService> {
  constructor(){
  }
}

export default {
  title: '基础组件/hy-icon（图标）',
  component: HyIconComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, { provide: ModelService, useClass: MockPricingService }]
    }),
  ],
  argTypes,
} as Meta;

// 基础用法
const BasicTemplate: Story<HyIconComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础图标用法</h3>
      <p>图标用于增强界面的视觉表达和用户体验</p>
      
      <div class="demo-section">
        <h4>Ant Design 图标</h4>
        <p>使用 Ant Design 图标库中的图标</p>
        <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center; margin: 20px 0;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <hy-icon nzIconName="home"></hy-icon>
            <span>home</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <hy-icon nzIconName="user"></hy-icon>
            <span>user</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <hy-icon nzIconName="setting"></hy-icon>
            <span>setting</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <hy-icon nzIconName="star"></hy-icon>
            <span>star</span>
          </div>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>自定义图标</h4>
        <p>使用自定义的图标资源</p>
        <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center; margin: 20px 0;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <hy-icon hyIconName="colors"></hy-icon>
            <span>colors</span>
          </div>
        </div>
      </div>
    </div>
  `
});

export const basic = BasicTemplate.bind({});
basic.args = {};
basic.storyName = '基础用法';
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

图标是界面设计中重要的视觉元素，用于传达信息、引导操作、装饰界面。

### 🎯 图标类型

#### Ant Design 图标
- 使用 \`nzIconName\` 属性
- 基于 Ant Design 图标库
- 包含线性、实心、双色图标
- 语义化的图标名称

#### 自定义图标
- 使用 \`hyIconName\` 属性  
- 支持自定义图标资源
- 可以是 SVG 或其他格式
- 适用于品牌特色图标

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| nzIconName | Ant Design图标名称 | string | - |
| hyIconName | 自定义图标名称 | string | - |
| iconClass | 图标样式类名 | string | - |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- Ant Design 图标 -->
<hy-icon nzIconName="home"></hy-icon>
<hy-icon nzIconName="user"></hy-icon>
<hy-icon nzIconName="setting"></hy-icon>

<!-- 自定义图标 -->
<hy-icon hyIconName="colors"></hy-icon>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-demo',
  templateUrl: './icon-demo.component.html'
})
export class IconDemoComponent {
  // 图标可以通过数据绑定动态设置
  currentIcon = 'home';
  
  changeIcon(iconName: string) {
    this.currentIcon = iconName;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 图标样式
const StyleTemplate: Story<HyIconComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>图标颜色</h4>
        <p>通过 iconClass 设置图标颜色</p>
        <div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: center; margin: 20px 0;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="heart"></hy-icon>
            <span style="font-size: 12px;">默认</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="heart" iconClass="red"></hy-icon>
            <span style="font-size: 12px;">红色</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="heart" iconClass="blue"></hy-icon>
            <span style="font-size: 12px;">蓝色</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="heart" iconClass="green"></hy-icon>
            <span style="font-size: 12px;">绿色</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="heart" iconClass="gray"></hy-icon>
            <span style="font-size: 12px;">灰色</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="heart" iconClass="orange"></hy-icon>
            <span style="font-size: 12px;">橙色</span>
          </div>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>图标大小</h4>
        <p>通过 CSS 样式控制图标大小</p>
        <div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: center; margin: 20px 0;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="star" style="font-size: 12px;"></hy-icon>
            <span style="font-size: 12px;">12px</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="star" style="font-size: 16px;"></hy-icon>
            <span style="font-size: 12px;">16px</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="star" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">20px</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="star" style="font-size: 24px;"></hy-icon>
            <span style="font-size: 12px;">24px</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="star" style="font-size: 32px;"></hy-icon>
            <span style="font-size: 12px;">32px</span>
          </div>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>状态图标</h4>
        <p>不同状态下的图标颜色应用</p>
        <div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: center; margin: 20px 0;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="check-circle" iconClass="green"></hy-icon>
            <span style="font-size: 12px;">成功</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="exclamation-circle" iconClass="orange"></hy-icon>
            <span style="font-size: 12px;">警告</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="close-circle" iconClass="red"></hy-icon>
            <span style="font-size: 12px;">错误</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <hy-icon nzIconName="info-circle" iconClass="blue"></hy-icon>
            <span style="font-size: 12px;">信息</span>
          </div>
        </div>
      </div>
    </div>
  `
});

export const styles = StyleTemplate.bind({});
styles.args = {};
styles.storyName = '图标样式';
styles.parameters = {
  docs: {
    description: {
      story: `
## 图标样式

图标支持多种样式定制，满足不同的设计需求和使用场景。

### 🎨 颜色系统

组件内置了多种颜色类名，可以快速应用：

#### 基础颜色
- \`red\`: 红色 - 用于错误、删除、危险操作
- \`blue\`: 蓝色 - 用于信息、链接、主要操作  
- \`green\`: 绿色 - 用于成功、确认、完成状态
- \`orange\`: 橙色 - 用于警告、提醒、待处理
- \`gray\`: 灰色 - 用于禁用、次要信息

#### 状态颜色
不同状态下推荐使用的图标颜色：
- **成功状态**: 绿色，如 ✅ 操作完成
- **警告状态**: 橙色，如 ⚠️ 需要注意  
- **错误状态**: 红色，如 ❌ 操作失败
- **信息状态**: 蓝色，如 ℹ️ 提示信息

### 📏 尺寸控制

#### CSS 控制
图标大小通过 CSS 的 \`font-size\` 属性控制：
\`\`\`css
.small-icon { font-size: 12px; }
.medium-icon { font-size: 16px; }
.large-icon { font-size: 24px; }
\`\`\`

#### 常用尺寸
- **12px**: 表格行内图标、状态指示
- **16px**: 按钮图标、菜单图标
- **20px**: 标题图标、重要操作
- **24px**: 页面主图标、导航图标
- **32px+**: 装饰性图标、品牌图标

### 样式配置
| 属性 | 说明 | 类型 | 可选值 |
|------|------|------|---------|
| iconClass | 图标颜色类名 | string | 'red'\\|'blue'\\|'green'\\|'orange'\\|'gray' |
| style | 内联样式 | object | { fontSize: '16px' } |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 颜色样式 -->
<hy-icon nzIconName="heart" iconClass="red"></hy-icon>
<hy-icon nzIconName="star" iconClass="blue"></hy-icon>
<hy-icon nzIconName="check-circle" iconClass="green"></hy-icon>
<hy-icon nzIconName="exclamation-circle" iconClass="orange"></hy-icon>
<hy-icon nzIconName="info-circle" iconClass="gray"></hy-icon>

<!-- 大小控制 -->
<hy-icon nzIconName="home" style="font-size: 12px;"></hy-icon>
<hy-icon nzIconName="home" style="font-size: 16px;"></hy-icon>
<hy-icon nzIconName="home" style="font-size: 24px;"></hy-icon>
<hy-icon nzIconName="home" style="font-size: 32px;"></hy-icon>

<!-- 状态图标 -->
<hy-icon nzIconName="check-circle" iconClass="green"></hy-icon>
<hy-icon nzIconName="exclamation-circle" iconClass="orange"></hy-icon>
<hy-icon nzIconName="close-circle" iconClass="red"></hy-icon>
<hy-icon nzIconName="info-circle" iconClass="blue"></hy-icon>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-style-demo',
  templateUrl: './icon-style-demo.component.html',
  styleUrls: ['./icon-style-demo.component.less']
})
export class IconStyleDemoComponent {
  // 动态设置图标样式
  iconStyles = {
    small: { fontSize: '12px' },
    medium: { fontSize: '16px' },
    large: { fontSize: '24px' },
    extraLarge: { fontSize: '32px' }
  };

  // 状态图标配置
  statusIcons = [
    { name: 'check-circle', class: 'green', label: '成功' },
    { name: 'exclamation-circle', class: 'orange', label: '警告' },
    { name: 'close-circle', class: 'red', label: '错误' },
    { name: 'info-circle', class: 'blue', label: '信息' }
  ];

  // 根据状态获取图标配置
  getStatusIcon(status: 'success' | 'warning' | 'error' | 'info') {
    const iconMap = {
      success: { name: 'check-circle', class: 'green' },
      warning: { name: 'exclamation-circle', class: 'orange' },
      error: { name: 'close-circle', class: 'red' },
      info: { name: 'info-circle', class: 'blue' }
    };
    return iconMap[status];
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "样式文件",
      template: previewTemplate`
/* icon-style-demo.component.less */

// 自定义图标大小类
.icon-size {
  &-small {
    font-size: 12px;
  }
  
  &-medium {
    font-size: 16px;
  }
  
  &-large {
    font-size: 24px;
  }
  
  &-extra-large {
    font-size: 32px;
  }
}

// 自定义颜色（如果需要更多颜色）
.icon-color {
  &-primary {
    color: #1890ff;
  }
  
  &-success {
    color: #52c41a;
  }
  
  &-warning {
    color: #faad14;
  }
  
  &-danger {
    color: #ff4d4f;
  }
  
  &-disabled {
    color: #d9d9d9;
  }
}

// 图标动画效果
.icon-animation {
  &-spin {
    animation: iconSpin 1s linear infinite;
  }
  
  &-pulse {
    animation: iconPulse 1s ease-in-out infinite;
  }
}

@keyframes iconSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes iconPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
      `,
      language: "less",
      copy: true
    }
  ]
};

// 常用图标库
const IconLibraryTemplate: Story<HyIconComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>📂 通用图标</h4>
        <p>常用的通用功能图标</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px; margin: 20px 0;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="home" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">home</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="user" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">user</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="setting" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">setting</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="search" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">search</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="menu" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">menu</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="mail" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">mail</span>
          </div>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>⚡ 操作图标</h4>
        <p>用于按钮和操作的图标</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px; margin: 20px 0;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="plus" iconClass="blue" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">plus</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="edit" iconClass="blue" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">edit</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="delete" iconClass="red" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">delete</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="save" iconClass="green" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">save</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="copy" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">copy</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="download" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">download</span>
          </div>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>📊 状态图标</h4>
        <p>用于表示状态和反馈的图标</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px; margin: 20px 0;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="check-circle" iconClass="green" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">check-circle</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="close-circle" iconClass="red" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">close-circle</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="exclamation-circle" iconClass="orange" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">exclamation-circle</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="info-circle" iconClass="blue" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">info-circle</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="loading" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">loading</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="question-circle" iconClass="blue" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">question-circle</span>
          </div>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>🧭 导航图标</h4>
        <p>用于导航和方向的图标</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px; margin: 20px 0;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="arrow-left" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">arrow-left</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="arrow-right" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">arrow-right</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="arrow-up" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">arrow-up</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="arrow-down" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">arrow-down</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="double-left" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">double-left</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px;">
            <hy-icon nzIconName="double-right" style="font-size: 20px;"></hy-icon>
            <span style="font-size: 12px;">double-right</span>
          </div>
        </div>
      </div>
    </div>
  `
});

export const iconLibrary = IconLibraryTemplate.bind({});
iconLibrary.args = {};
iconLibrary.storyName = '图标库';
iconLibrary.parameters = {
  docs: {
    description: {
      story: `
## 图标库

展示常用的图标及其适用场景，帮助开发者快速选择合适的图标。

### 🎯 图标分类

#### 通用图标
这些图标在各种应用中都很常见：
- **home**: 首页、主页导航
- **user**: 用户相关功能
- **setting**: 设置、配置页面
- **search**: 搜索功能
- **menu**: 菜单、导航
- **mail**: 邮件、消息

#### 操作图标
用于表示具体的操作行为：
- **plus**: 添加、新增操作
- **edit**: 编辑、修改操作
- **delete**: 删除操作（建议使用红色）
- **save**: 保存操作（建议使用绿色）
- **copy**: 复制操作
- **download**: 下载操作

#### 状态图标
用于反馈操作结果或当前状态：
- **check-circle**: 成功状态（绿色）
- **close-circle**: 失败状态（红色）
- **exclamation-circle**: 警告状态（橙色）
- **info-circle**: 信息提示（蓝色）
- **loading**: 加载状态
- **question-circle**: 帮助提示（蓝色）

#### 导航图标
用于页面导航和方向指示：
- **arrow-left/right/up/down**: 单箭头方向
- **double-left/right**: 双箭头，用于分页等

### 🎨 颜色使用建议

#### 语义化颜色
- **成功操作**: 绿色（check-circle, save）
- **警告提醒**: 橙色（exclamation-circle）
- **错误危险**: 红色（close-circle, delete）
- **信息提示**: 蓝色（info-circle, question-circle）
- **普通操作**: 默认色或灰色

#### 功能区分
- **主要操作**: 蓝色系
- **次要操作**: 灰色系
- **危险操作**: 红色系
- **成功反馈**: 绿色系

### 📏 尺寸建议

- **12px**: 表格内状态图标
- **16px**: 按钮配套图标、菜单图标
- **20px**: 独立功能图标
- **24px**: 页面主要图标
- **32px+**: 装饰性大图标

### 💡 使用原则

1. **语义明确**: 选择意义明确的图标
2. **保持一致**: 同类功能使用相同图标  
3. **适度使用**: 避免图标过多影响界面
4. **颜色合理**: 遵循颜色语义约定
5. **尺寸适配**: 根据使用场景选择合适尺寸
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 通用图标 -->
<hy-icon nzIconName="home"></hy-icon>
<hy-icon nzIconName="user"></hy-icon>
<hy-icon nzIconName="setting"></hy-icon>
<hy-icon nzIconName="search"></hy-icon>
<hy-icon nzIconName="menu"></hy-icon>
<hy-icon nzIconName="mail"></hy-icon>

<!-- 操作图标 -->
<hy-icon nzIconName="plus" iconClass="blue"></hy-icon>
<hy-icon nzIconName="edit" iconClass="blue"></hy-icon>
<hy-icon nzIconName="delete" iconClass="red"></hy-icon>
<hy-icon nzIconName="save" iconClass="green"></hy-icon>
<hy-icon nzIconName="copy"></hy-icon>
<hy-icon nzIconName="download"></hy-icon>

<!-- 状态图标 -->
<hy-icon nzIconName="check-circle" iconClass="green"></hy-icon>
<hy-icon nzIconName="close-circle" iconClass="red"></hy-icon>
<hy-icon nzIconName="exclamation-circle" iconClass="orange"></hy-icon>
<hy-icon nzIconName="info-circle" iconClass="blue"></hy-icon>
<hy-icon nzIconName="loading"></hy-icon>
<hy-icon nzIconName="question-circle" iconClass="blue"></hy-icon>

<!-- 导航图标 -->
<hy-icon nzIconName="arrow-left"></hy-icon>
<hy-icon nzIconName="arrow-right"></hy-icon>
<hy-icon nzIconName="arrow-up"></hy-icon>
<hy-icon nzIconName="arrow-down"></hy-icon>
<hy-icon nzIconName="double-left"></hy-icon>
<hy-icon nzIconName="double-right"></hy-icon>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "图标配置",
      template: previewTemplate`
import { Component } from '@angular/core';

interface IconConfig {
  name: string;
  color?: string;
  size?: string;
  category: string;
  description: string;
}

@Component({
  selector: 'app-icon-library-demo',
  templateUrl: './icon-library-demo.component.html'
})
export class IconLibraryDemoComponent {
  // 图标配置列表
  iconConfigs: IconConfig[] = [
    // 通用图标
    { name: 'home', category: '通用', description: '首页、主页' },
    { name: 'user', category: '通用', description: '用户相关' },
    { name: 'setting', category: '通用', description: '设置配置' },
    { name: 'search', category: '通用', description: '搜索功能' },
    
    // 操作图标
    { name: 'plus', color: 'blue', category: '操作', description: '添加新增' },
    { name: 'edit', color: 'blue', category: '操作', description: '编辑修改' },
    { name: 'delete', color: 'red', category: '操作', description: '删除操作' },
    { name: 'save', color: 'green', category: '操作', description: '保存操作' },
    
    // 状态图标
    { name: 'check-circle', color: 'green', category: '状态', description: '成功状态' },
    { name: 'close-circle', color: 'red', category: '状态', description: '失败状态' },
    { name: 'exclamation-circle', color: 'orange', category: '状态', description: '警告状态' },
    { name: 'info-circle', color: 'blue', category: '状态', description: '信息提示' },
  ];

  // 按分类获取图标
  getIconsByCategory(category: string): IconConfig[] {
    return this.iconConfigs.filter(icon => icon.category === category);
  }

  // 获取图标的完整配置
  getIconConfig(iconName: string): IconConfig | undefined {
    return this.iconConfigs.find(icon => icon.name === iconName);
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 应用场景
const UseCasesTemplate: Story<HyIconComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>🎯 按钮图标</h4>
        <p>图标与按钮结合，增强操作的语义表达</p>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; margin: 20px 0;">
          <button style="display: flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer;">
            <hy-icon nzIconName="plus" style="font-size: 14px;"></hy-icon>
            <span>新增</span>
          </button>
          <button style="display: flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1px solid #1890ff; border-radius: 4px; background: #1890ff; color: white; cursor: pointer;">
            <hy-icon nzIconName="save" style="font-size: 14px;"></hy-icon>
            <span>保存</span>
          </button>
          <button style="display: flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1px solid #ff4d4f; border-radius: 4px; background: #ff4d4f; color: white; cursor: pointer;">
            <hy-icon nzIconName="delete" style="font-size: 14px;"></hy-icon>
            <span>删除</span>
          </button>
          <button style="display: flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer;">
            <hy-icon nzIconName="download" style="font-size: 14px;"></hy-icon>
            <span>下载</span>
          </button>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>📋 表单标签</h4>
        <p>在表单字段前添加图标，提升视觉识别度</p>
        <div style="max-width: 300px; margin: 20px 0;">
          <div style="margin-bottom: 16px;">
            <label style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; font-weight: 500;">
              <hy-icon nzIconName="user" iconClass="blue" style="font-size: 14px;"></hy-icon>
              <span>用户名</span>
            </label>
            <input type="text" placeholder="请输入用户名" style="width: 100%; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px;">
          </div>
          <div style="margin-bottom: 16px;">
            <label style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; font-weight: 500;">
              <hy-icon nzIconName="mail" iconClass="blue" style="font-size: 14px;"></hy-icon>
              <span>邮箱</span>
            </label>
            <input type="email" placeholder="请输入邮箱" style="width: 100%; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px;">
          </div>
          <div style="margin-bottom: 16px;">
            <label style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; font-weight: 500;">
              <hy-icon nzIconName="lock" iconClass="blue" style="font-size: 14px;"></hy-icon>
              <span>密码</span>
            </label>
            <input type="password" placeholder="请输入密码" style="width: 100%; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px;">
          </div>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>📊 状态指示</h4>
        <p>使用图标表示不同的状态和结果</p>
        <div style="margin: 20px 0;">
          <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: #f6ffed; border-left: 4px solid #52c41a; margin-bottom: 12px;">
            <hy-icon nzIconName="check-circle" iconClass="green" style="font-size: 16px;"></hy-icon>
            <span>操作成功！数据已保存</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: #fff7e6; border-left: 4px solid #faad14; margin-bottom: 12px;">
            <hy-icon nzIconName="exclamation-circle" iconClass="orange" style="font-size: 16px;"></hy-icon>
            <span>警告：请检查输入的数据格式</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: #fff2f0; border-left: 4px solid #ff4d4f; margin-bottom: 12px;">
            <hy-icon nzIconName="close-circle" iconClass="red" style="font-size: 16px;"></hy-icon>
            <span>错误：网络连接失败，请重试</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: #e6f7ff; border-left: 4px solid #1890ff;">
            <hy-icon nzIconName="info-circle" iconClass="blue" style="font-size: 16px;"></hy-icon>
            <span>提示：此操作需要管理员权限</span>
          </div>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>🧭 导航菜单</h4>
        <p>导航菜单中的图标使用</p>
        <div style="max-width: 240px; border: 1px solid #f0f0f0; border-radius: 6px; overflow: hidden; margin: 20px 0;">
          <div style="padding: 16px; background: #fafafa; border-bottom: 1px solid #f0f0f0; font-weight: 500;">
            系统菜单
          </div>
          <nav style="padding: 8px 0;">
            <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; text-decoration: none; color: #333; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f5f5f5'" onmouseout="this.style.backgroundColor='transparent'">
              <hy-icon nzIconName="home" style="font-size: 16px;"></hy-icon>
              <span>首页</span>
            </a>
            <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; text-decoration: none; color: #333; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f5f5f5'" onmouseout="this.style.backgroundColor='transparent'">
              <hy-icon nzIconName="user" style="font-size: 16px;"></hy-icon>
              <span>用户管理</span>
            </a>
            <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; text-decoration: none; color: #333; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f5f5f5'" onmouseout="this.style.backgroundColor='transparent'">
              <hy-icon nzIconName="setting" style="font-size: 16px;"></hy-icon>
              <span>系统设置</span>
            </a>
            <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; text-decoration: none; color: #333; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f5f5f5'" onmouseout="this.style.backgroundColor='transparent'">
              <hy-icon nzIconName="file-text" style="font-size: 16px;"></hy-icon>
              <span>文档管理</span>
            </a>
            <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; text-decoration: none; color: #333; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f5f5f5'" onmouseout="this.style.backgroundColor='transparent'">
              <hy-icon nzIconName="bar-chart" style="font-size: 16px;"></hy-icon>
              <span>数据统计</span>
            </a>
          </nav>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>📱 工具栏</h4>
        <p>工具栏中的纯图标按钮</p>
        <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: #fafafa; border-radius: 6px; margin: 20px 0;">
          <button style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: none; background: transparent; border-radius: 4px; cursor: pointer; transition: background-color 0.2s;" 
                  onmouseover="this.style.backgroundColor='#f0f0f0'" onmouseout="this.style.backgroundColor='transparent'"
                  title="新增">
            <hy-icon nzIconName="plus" iconClass="blue" style="font-size: 16px;"></hy-icon>
          </button>
          <button style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: none; background: transparent; border-radius: 4px; cursor: pointer; transition: background-color 0.2s;" 
                  onmouseover="this.style.backgroundColor='#f0f0f0'" onmouseout="this.style.backgroundColor='transparent'"
                  title="编辑">
            <hy-icon nzIconName="edit" iconClass="blue" style="font-size: 16px;"></hy-icon>
          </button>
          <button style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: none; background: transparent; border-radius: 4px; cursor: pointer; transition: background-color 0.2s;" 
                  onmouseover="this.style.backgroundColor='#f0f0f0'" onmouseout="this.style.backgroundColor='transparent'"
                  title="删除">
            <hy-icon nzIconName="delete" iconClass="red" style="font-size: 16px;"></hy-icon>
          </button>
          <div style="width: 1px; height: 20px; background: #d9d9d9; margin: 0 4px;"></div>
          <button style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: none; background: transparent; border-radius: 4px; cursor: pointer; transition: background-color 0.2s;" 
                  onmouseover="this.style.backgroundColor='#f0f0f0'" onmouseout="this.style.backgroundColor='transparent'"
                  title="复制">
            <hy-icon nzIconName="copy" style="font-size: 16px;"></hy-icon>
          </button>
          <button style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: none; background: transparent; border-radius: 4px; cursor: pointer; transition: background-color 0.2s;" 
                  onmouseover="this.style.backgroundColor='#f0f0f0'" onmouseout="this.style.backgroundColor='transparent'"
                  title="下载">
            <hy-icon nzIconName="download" style="font-size: 16px;"></hy-icon>
          </button>
          <button style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: none; background: transparent; border-radius: 4px; cursor: pointer; transition: background-color 0.2s;" 
                  onmouseover="this.style.backgroundColor='#f0f0f0'" onmouseout="this.style.backgroundColor='transparent'"
                  title="设置">
            <hy-icon nzIconName="setting" iconClass="gray" style="font-size: 16px;"></hy-icon>
          </button>
        </div>
      </div>
    </div>
  `
});

export const useCases = UseCasesTemplate.bind({});
useCases.args = {};
useCases.storyName = '应用场景';
useCases.parameters = {
  docs: {
    description: {
      story: `
## 应用场景

图标在不同的界面场景中发挥着重要作用，本章节展示常见的应用场景和最佳实践。

### 🎯 按钮图标

#### 增强语义
图标与文字结合，让按钮的功能更加直观：
- **新增按钮**: plus图标 + "新增"文字
- **保存按钮**: save图标 + "保存"文字  
- **删除按钮**: delete图标 + "删除"文字

#### 视觉层次
- **主要操作**: 使用有色背景 + 白色图标
- **次要操作**: 使用边框 + 有色图标
- **危险操作**: 使用红色主题

### 📋 表单标签

#### 字段识别
在表单字段前添加图标，提升用户识别速度：
- **用户信息**: user图标
- **邮箱字段**: mail图标
- **密码字段**: lock图标
- **电话号码**: phone图标

#### 设计原则
- 图标颜色统一使用蓝色
- 图标大小控制在14-16px
- 与文字保持适当间距

### 📊 状态指示

#### 反馈信息
使用图标配合颜色和文字，提供清晰的状态反馈：

| 状态 | 图标 | 颜色 | 使用场景 |
|------|------|------|----------|
| 成功 | check-circle | 绿色 | 操作成功、验证通过 |
| 警告 | exclamation-circle | 橙色 | 注意事项、非关键错误 |
| 错误 | close-circle | 红色 | 操作失败、验证失败 |
| 信息 | info-circle | 蓝色 | 提示信息、使用说明 |

#### 实现方式
\`\`\`html
<!-- 成功提示 -->
<div class="alert alert-success">
  <hy-icon nzIconName="check-circle" iconClass="green"></hy-icon>
  <span>操作成功！</span>
</div>
\`\`\`

### 🧭 导航菜单

#### 菜单项识别
为导航菜单项添加图标，提升用户体验：
- **首页**: home图标
- **用户管理**: user图标
- **系统设置**: setting图标
- **文档管理**: file-text图标

#### 设计要求
- 图标大小统一（通常16px）
- 颜色与文字保持一致
- 悬停态有适当的视觉反馈

### 📱 工具栏

#### 空间效率
在有限空间内，使用纯图标按钮：
- 只显示图标，不显示文字
- 通过tooltip提供功能说明
- 图标要足够直观易懂

#### 分组原则
- 相关功能放在一起
- 使用分隔线区分不同组
- 危险操作（如删除）使用红色图标

### 💡 最佳实践

#### 选择原则
1. **语义明确**: 图标含义要直观易懂
2. **保持一致**: 同类功能使用相同图标
3. **适度使用**: 不要过度依赖图标
4. **考虑文化**: 注意图标的文化差异

#### 实现建议
1. **提供替代文本**: 确保可访问性
2. **响应式设计**: 在小屏幕上合理调整
3. **加载优化**: 使用图标字体或SVG
4. **测试验证**: 与用户测试图标理解度

#### 常见误区
- ❌ 图标含义不明确
- ❌ 同功能使用不同图标
- ❌ 图标过小难以点击
- ❌ 只有图标没有文字说明
- ❌ 颜色对比度不够
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 按钮图标 -->
<button class="btn btn-primary">
  <hy-icon nzIconName="plus"></hy-icon>
  <span>新增</span>
</button>

<!-- 表单标签 -->
<label>
  <hy-icon nzIconName="user" iconClass="blue"></hy-icon>
  <span>用户名</span>
</label>
<input type="text" placeholder="请输入用户名">

<!-- 状态指示 -->
<div class="alert alert-success">
  <hy-icon nzIconName="check-circle" iconClass="green"></hy-icon>
  <span>操作成功！</span>
</div>

<!-- 导航菜单 -->
<nav>
  <a href="#">
    <hy-icon nzIconName="home"></hy-icon>
    <span>首页</span>
  </a>
  <a href="#">
    <hy-icon nzIconName="user"></hy-icon>
    <span>用户管理</span>
  </a>
</nav>

<!-- 工具栏 -->
<div class="toolbar">
  <button title="新增"><hy-icon nzIconName="plus" iconClass="blue"></hy-icon></button>
  <button title="编辑"><hy-icon nzIconName="edit" iconClass="blue"></hy-icon></button>
  <button title="删除"><hy-icon nzIconName="delete" iconClass="red"></hy-icon></button>
</div>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "样式代码",
      template: previewTemplate`
/* 按钮图标样式 */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  
  &.btn-primary {
    background: #1890ff;
    color: white;
  }
  
  &.btn-danger {
    background: #ff4d4f;
    color: white;
  }
}

/* 表单标签样式 */
label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  font-weight: 500;
}

/* 状态提示样式 */
.alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 4px;
  border-left: 4px solid;
  
  &.alert-success {
    background: #f6ffed;
    border-color: #52c41a;
  }
  
  &.alert-warning {
    background: #fff7e6;
    border-color: #faad14;
  }
  
  &.alert-error {
    background: #fff2f0;
    border-color: #ff4d4f;
  }
  
  &.alert-info {
    background: #e6f7ff;
    border-color: #1890ff;
  }
}

/* 导航菜单样式 */
nav a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
}

/* 工具栏样式 */
.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #fafafa;
  border-radius: 6px;
  
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #f0f0f0;
    }
  }
}
      `,
      language: "less",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

interface ToolbarAction {
  icon: string;
  color?: string;
  tooltip: string;
  action: () => void;
}

@Component({
  selector: 'app-icon-use-cases-demo',
  templateUrl: './icon-use-cases-demo.component.html',
  styleUrls: ['./icon-use-cases-demo.component.less']
})
export class IconUseCasesDemoComponent {
  // 导航菜单配置
  menuItems: MenuItem[] = [
    { icon: 'home', label: '首页', route: '/home' },
    { icon: 'user', label: '用户管理', route: '/users' },
    { icon: 'setting', label: '系统设置', route: '/settings' },
    { icon: 'file-text', label: '文档管理', route: '/documents' },
    { icon: 'bar-chart', label: '数据统计', route: '/statistics' }
  ];

  // 工具栏操作配置
  toolbarActions: ToolbarAction[] = [
    { 
      icon: 'plus', 
      color: 'blue', 
      tooltip: '新增', 
      action: () => this.handleAdd() 
    },
    { 
      icon: 'edit', 
      color: 'blue', 
      tooltip: '编辑', 
      action: () => this.handleEdit() 
    },
    { 
      icon: 'delete', 
      color: 'red', 
      tooltip: '删除', 
      action: () => this.handleDelete() 
    },
    { 
      icon: 'copy', 
      tooltip: '复制', 
      action: () => this.handleCopy() 
    },
    { 
      icon: 'download', 
      tooltip: '下载', 
      action: () => this.handleDownload() 
    }
  ];

  // 状态消息
  showMessage(type: 'success' | 'warning' | 'error' | 'info', message: string) {
    const config = {
      success: { icon: 'check-circle', color: 'green' },
      warning: { icon: 'exclamation-circle', color: 'orange' },
      error: { icon: 'close-circle', color: 'red' },
      info: { icon: 'info-circle', color: 'blue' }
    };
    
    // 显示消息的逻辑
    console.log(\`[\${type.toUpperCase()}] \${message}\`);
  }

  // 工具栏操作处理
  handleAdd() {
    this.showMessage('info', '执行新增操作');
  }

  handleEdit() {
    this.showMessage('info', '执行编辑操作');
  }

  handleDelete() {
    if (confirm('确定要删除吗？')) {
      this.showMessage('success', '删除成功');
    }
  }

  handleCopy() {
    this.showMessage('success', '复制成功');
  }

  handleDownload() {
    this.showMessage('info', '开始下载');
  }

  // 导航处理
  navigate(menuItem: MenuItem) {
    console.log(\`导航到: \${menuItem.route}\`);
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 综合示例
const CompleteTemplate: Story<HyIconComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>🎯 图标组件综合应用示例</h3>
      <p>展示图标组件在实际业务场景中的综合运用</p>
      
      <div class="demo-case">
        <h4>📊 用户管理界面</h4>
        <div style="border: 1px solid #f0f0f0; border-radius: 8px; overflow: hidden; background: white;">
          <!-- 页面头部 -->
          <div style="display: flex; justify-content: between; align-items: center; padding: 16px 20px; background: #fafafa; border-bottom: 1px solid #f0f0f0;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <hy-icon nzIconName="user" iconClass="blue" style="font-size: 20px;"></hy-icon>
              <h3 style="margin: 0; font-size: 18px;">用户管理</h3>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <button style="display: flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1px solid #1890ff; border-radius: 4px; background: #1890ff; color: white; cursor: pointer;">
                <hy-icon nzIconName="plus" style="font-size: 14px;"></hy-icon>
                <span>新增用户</span>
              </button>
              <button style="display: flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer;">
                <hy-icon nzIconName="download" style="font-size: 14px;"></hy-icon>
                <span>导出数据</span>
              </button>
            </div>
          </div>
          
          <!-- 搜索栏 -->
          <div style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                <hy-icon nzIconName="search" iconClass="gray" style="font-size: 16px;"></hy-icon>
                <input type="text" placeholder="搜索用户名、邮箱..." style="flex: 1; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px;">
              </div>
              <button style="display: flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1px solid #1890ff; border-radius: 4px; background: #1890ff; color: white; cursor: pointer;">
                <hy-icon nzIconName="search" style="font-size: 14px;"></hy-icon>
                <span>搜索</span>
              </button>
            </div>
          </div>
          
          <!-- 表格内容 -->
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #fafafa;">
                  <th style="padding: 12px; text-align: left; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <hy-icon nzIconName="user" style="font-size: 14px;"></hy-icon>
                      <span>用户名</span>
                    </div>
                  </th>
                  <th style="padding: 12px; text-align: left; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <hy-icon nzIconName="mail" style="font-size: 14px;"></hy-icon>
                      <span>邮箱</span>
                    </div>
                  </th>
                  <th style="padding: 12px; text-align: left; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <hy-icon nzIconName="check-circle" style="font-size: 14px;"></hy-icon>
                      <span>状态</span>
                    </div>
                  </th>
                  <th style="padding: 12px; text-align: left; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <hy-icon nzIconName="setting" style="font-size: 14px;"></hy-icon>
                      <span>操作</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">张三</td>
                  <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">zhangsan@example.com</td>
                  <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <hy-icon nzIconName="check-circle" iconClass="green" style="font-size: 14px;"></hy-icon>
                      <span style="color: #52c41a;">正常</span>
                    </div>
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <button style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: none; background: transparent; border-radius: 4px; cursor: pointer;" title="编辑">
                        <hy-icon nzIconName="edit" iconClass="blue" style="font-size: 14px;"></hy-icon>
                      </button>
                      <button style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: none; background: transparent; border-radius: 4px; cursor: pointer;" title="删除">
                        <hy-icon nzIconName="delete" iconClass="red" style="font-size: 14px;"></hy-icon>
                      </button>
                      <button style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: none; background: transparent; border-radius: 4px; cursor: pointer;" title="查看详情">
                        <hy-icon nzIconName="eye" iconClass="blue" style="font-size: 14px;"></hy-icon>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">李四</td>
                  <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">lisi@example.com</td>
                  <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <hy-icon nzIconName="close-circle" iconClass="red" style="font-size: 14px;"></hy-icon>
                      <span style="color: #ff4d4f;">禁用</span>
                    </div>
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <button style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: none; background: transparent; border-radius: 4px; cursor: pointer;" title="编辑">
                        <hy-icon nzIconName="edit" iconClass="blue" style="font-size: 14px;"></hy-icon>
                      </button>
                      <button style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: none; background: transparent; border-radius: 4px; cursor: pointer;" title="删除">
                        <hy-icon nzIconName="delete" iconClass="red" style="font-size: 14px;"></hy-icon>
                      </button>
                      <button style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: none; background: transparent; border-radius: 4px; cursor: pointer;" title="查看详情">
                        <hy-icon nzIconName="eye" iconClass="blue" style="font-size: 14px;"></hy-icon>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">王五</td>
                  <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">wangwu@example.com</td>
                  <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <hy-icon nzIconName="exclamation-circle" iconClass="orange" style="font-size: 14px;"></hy-icon>
                      <span style="color: #faad14;">待审核</span>
                    </div>
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <button style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: none; background: transparent; border-radius: 4px; cursor: pointer;" title="编辑">
                        <hy-icon nzIconName="edit" iconClass="blue" style="font-size: 14px;"></hy-icon>
                      </button>
                      <button style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: none; background: transparent; border-radius: 4px; cursor: pointer;" title="删除">
                        <hy-icon nzIconName="delete" iconClass="red" style="font-size: 14px;"></hy-icon>
                      </button>
                      <button style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: none; background: transparent; border-radius: 4px; cursor: pointer;" title="查看详情">
                        <hy-icon nzIconName="eye" iconClass="blue" style="font-size: 14px;"></hy-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 分页 -->
          <div style="display: flex; justify-content: between; align-items: center; padding: 16px 20px; background: #fafafa; border-top: 1px solid #f0f0f0;">
            <div style="display: flex; align-items: center; gap: 6px; color: #666;">
              <hy-icon nzIconName="info-circle" style="font-size: 14px;"></hy-icon>
              <span>共 3 条记录</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 1px solid #d9d9d9; background: white; border-radius: 4px; cursor: pointer;" title="上一页" disabled>
                <hy-icon nzIconName="left" iconClass="gray" style="font-size: 14px;"></hy-icon>
              </button>
              <button style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 1px solid #1890ff; background: #1890ff; color: white; border-radius: 4px;">
                1
              </button>
              <button style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 1px solid #d9d9d9; background: white; border-radius: 4px; cursor: pointer;" title="下一页" disabled>
                <hy-icon nzIconName="right" iconClass="gray" style="font-size: 14px;"></hy-icon>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 状态消息 -->
        <div style="margin-top: 20px;">
          <h5>📢 系统消息</h5>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: #f6ffed; border-left: 4px solid #52c41a; border-radius: 4px;">
              <hy-icon nzIconName="check-circle" iconClass="green" style="font-size: 16px;"></hy-icon>
              <span>用户"张三"状态更新成功</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: #fff7e6; border-left: 4px solid #faad14; border-radius: 4px;">
              <hy-icon nzIconName="exclamation-circle" iconClass="orange" style="font-size: 16px;"></hy-icon>
              <span>用户"王五"等待管理员审核</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: #e6f7ff; border-left: 4px solid #1890ff; border-radius: 4px;">
              <hy-icon nzIconName="info-circle" iconClass="blue" style="font-size: 16px;"></hy-icon>
              <span>系统将在今晚22:00进行维护更新</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

export const complete = CompleteTemplate.bind({});
complete.args = {};
complete.storyName = '综合应用示例';
complete.parameters = {
  docs: {
    description: {
      story: `
## 综合应用示例

这是一个完整的用户管理界面示例，展示了图标组件在实际业务场景中的综合运用。

### 🎯 图标应用场景分析

#### 页面头部
- **模块图标**: user图标表示用户管理模块
- **操作按钮**: plus图标表示新增，download图标表示导出

#### 搜索区域
- **功能图标**: search图标配合搜索输入框，增强功能识别

#### 表格头部
- **字段图标**: 每个列头配上相应图标，提升字段语义
  - user: 用户名列
  - mail: 邮箱列  
  - check-circle: 状态列
  - setting: 操作列

#### 数据行内容
- **状态指示**: 使用不同颜色的图标表示用户状态
  - ✅ 绿色check-circle: 正常状态
  - ❌ 红色close-circle: 禁用状态
  - ⚠️ 橙色exclamation-circle: 待审核状态

#### 操作按钮
- **行内操作**: 使用纯图标按钮节省空间
  - edit: 编辑操作（蓝色）
  - delete: 删除操作（红色）
  - eye: 查看详情（蓝色）

#### 分页控制
- **导航图标**: left/right箭头用于分页导航
- **信息提示**: info-circle配合文字显示记录统计

### 🎨 设计原则体现

#### 颜色语义化
- **蓝色**: 信息、操作类图标（user, edit, eye, info）
- **绿色**: 成功、正常状态（check-circle）  
- **红色**: 危险、删除、错误（close-circle, delete）
- **橙色**: 警告、待处理（exclamation-circle）
- **灰色**: 次要、禁用状态

#### 尺寸层次化
- **20px**: 页面主图标（页面标题）
- **16px**: 搜索功能图标
- **14px**: 表格图标、按钮图标
- **12px**: 辅助信息图标

#### 功能分组化
- **主要操作**: 新增、搜索（突出显示）
- **次要操作**: 导出、编辑、查看
- **危险操作**: 删除（红色警示）

### 💡 实现要点

#### 状态映射
\`\`\`typescript
const statusConfig = {
  active: { icon: 'check-circle', color: 'green', text: '正常' },
  disabled: { icon: 'close-circle', color: 'red', text: '禁用' },
  pending: { icon: 'exclamation-circle', color: 'orange', text: '待审核' }
};
\`\`\`

#### 操作配置
\`\`\`typescript
const actions = [
  { icon: 'edit', color: 'blue', tooltip: '编辑', handler: 'edit' },
  { icon: 'delete', color: 'red', tooltip: '删除', handler: 'delete' },
  { icon: 'eye', color: 'blue', tooltip: '查看', handler: 'view' }
];
\`\`\`

#### 响应式处理
- 小屏幕下隐藏次要图标
- 保留核心功能图标
- 适当调整图标大小

### ⚡ 用户体验提升

1. **视觉引导**: 图标帮助用户快速识别功能
2. **状态反馈**: 颜色图标提供直观的状态信息
3. **操作便捷**: 工具图标减少操作步骤
4. **信息层次**: 不同尺寸图标建立信息层次
5. **品牌一致**: 统一的图标风格提升品牌感知

这个示例展示了如何在实际项目中系统性地运用图标，既保证了功能性，又提升了用户体验。
`
    }
  }
};

