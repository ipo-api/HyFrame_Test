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
    <div>
      <h3>基础图标用法</h3>
      <p>图标用于增强界面的视觉表达和用户体验</p>
      
      <h4>Ant Design 图标</h4>
      <p>使用 Ant Design 图标库中的图标</p>
      <div>
        <hy-icon nzIconName="home"></hy-icon> home
        <hy-icon nzIconName="user"></hy-icon> user
        <hy-icon nzIconName="setting"></hy-icon> setting
        <hy-icon nzIconName="star"></hy-icon> star
      </div>
      
      <h4>自定义图标</h4>
      <p>使用自定义的图标资源</p>
      <div>
        <hy-icon hyIconName="colors"></hy-icon> colors
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

### 图标类型

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
    <div>
      <h3>图标样式</h3>
      
      <h4>图标颜色</h4>
      <p>通过 iconClass 设置图标颜色</p>
      <ul>
        <li><hy-icon nzIconName="heart"></hy-icon> 默认</li>
        <li><hy-icon nzIconName="heart" iconClass="red"></hy-icon> 红色</li>
        <li><hy-icon nzIconName="heart" iconClass="blue"></hy-icon> 蓝色</li>
        <li><hy-icon nzIconName="heart" iconClass="green"></hy-icon> 绿色</li>
        <li><hy-icon nzIconName="heart" iconClass="gray"></hy-icon> 灰色</li>
        <li><hy-icon nzIconName="heart" iconClass="orange"></hy-icon> 橙色</li>
      </ul>
      
      <h4>图标大小</h4>
      <p>通过 iconStyle 属性控制图标大小</p>
      <ul>
        <li><hy-icon nzIconName="star" [iconStyle]="{fontSize: '12px'}"></hy-icon> 12px</li>
        <li><hy-icon nzIconName="star" [iconStyle]="{fontSize: '16px'}"></hy-icon> 16px</li>
        <li><hy-icon nzIconName="star" [iconStyle]="{fontSize: '20px'}"></hy-icon> 20px</li>
        <li><hy-icon nzIconName="star" [iconStyle]="{fontSize: '24px'}"></hy-icon> 24px</li>
        <li><hy-icon nzIconName="star" [iconStyle]="{fontSize: '32px'}"></hy-icon> 32px</li>
      </ul>
      
      <h4>状态图标</h4>
      <p>不同状态下的图标颜色应用</p>
      <ul>
        <li><hy-icon nzIconName="check-circle" iconClass="green"></hy-icon> 成功</li>
        <li><hy-icon nzIconName="exclamation-circle" iconClass="orange"></hy-icon> 警告</li>
        <li><hy-icon nzIconName="close-circle" iconClass="red"></hy-icon> 错误</li>
        <li><hy-icon nzIconName="info-circle" iconClass="blue"></hy-icon> 信息</li>
      </ul>
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

### 颜色系统

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

### 尺寸控制

#### iconStyle 控制
图标大小通过 \`iconStyle\` 属性控制：
\`\`\`html
<hy-icon nzIconName="star" [iconStyle]="{fontSize: '16px'}"></hy-icon>
\`\`\`

#### 常用尺寸
- **12px**: 表格行内图标、状态指示
- **16px**: 按钮图标、菜单图标（默认）
- **20px**: 标题图标、重要操作
- **24px**: 页面主图标、导航图标
- **32px+**: 装饰性图标、品牌图标

### 样式配置
| 属性 | 说明 | 类型 | 可选值 |
|------|------|------|---------|
| iconClass | 图标颜色类名 | string | 'red'\\|'blue'\\|'green'\\|'orange'\\|'gray' |
| iconStyle | 图标样式 | object | { fontSize: '16px', cursor: 'pointer' } |
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
  iconStyles = {
    small: { fontSize: '12px' },
    medium: { fontSize: '16px' },
    large: { fontSize: '24px' },
    extraLarge: { fontSize: '32px' }
  };

  statusIcons = [
    { name: 'check-circle', class: 'green', label: '成功' },
    { name: 'exclamation-circle', class: 'orange', label: '警告' },
    { name: 'close-circle', class: 'red', label: '错误' },
    { name: 'info-circle', class: 'blue', label: '信息' }
  ];

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
    }
  ]
};
