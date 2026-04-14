import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyToggleComponent } from './hy-toggle.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { $hyapi, ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

let _this;
class MockPricingService implements Partial<ModelService> {
  constructor() {
    _this = this;
  }
}

const argTypes = unit.createArgTypes('HyToggleComponent');
export default {
  title: '基础组件/hy-toggle（开关按钮）',
  component: HyToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, { provide: ModelService, useClass: MockPricingService }]
    }),
  ],
  argTypes
} as Meta;

// 基础用法
const BasicTemplate: Story<HyToggleComponent> = (args: any) => {
  setTimeout(() => {
    _this['gt_basic']['toggle1'] = '1';
    _this['gt_basic']['toggle2'] = '0';
  }, 100);
  
  return {
    props: args,
    template: `
      <div class="demo-container">
        <h3>基础开关功能</h3>
        <p>最基本的开关按钮，支持开启和关闭两种状态</p>
        
        <hy-form>
          <hy-gt model="basic">
            <div style="margin-bottom: 16px;">
              <h4>默认开启状态</h4>
              <hy-toggle 
                title="功能开关" 
                model="toggle1"
                [items]="basicItems">
              </hy-toggle>
            </div>
            
            <div style="margin-bottom: 16px;">
              <h4>默认关闭状态</h4>
              <hy-toggle 
                title="通知推送" 
                model="toggle2"
                [items]="basicItems">
              </hy-toggle>
            </div>
            
            <div style="margin-bottom: 16px;">
              <h4>禁用状态</h4>
              <hy-toggle 
                title="维护模式" 
                model="toggle3"
                [items]="basicItems"
                [enable]="false">
              </hy-toggle>
            </div>
          </hy-gt>
        </hy-form>
      </div>
    `
  };
};

export const basic = BasicTemplate.bind({});
basic.args = {
  basicItems: [
    { id: '0', text: '关闭' },
    { id: '1', text: '开启' }
  ]
};
basic.storyName = '基础用法';
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

最基础的开关按钮组件，用于控制功能的开启和关闭状态。

### 特性
- **双状态**: 支持开启（true）和关闭（false）两种状态
- **自定义文字**: 通过 items 配置开关状态对应的文字
- **默认值**: 可以设置组件的初始状态
- **禁用状态**: 支持禁用交互

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| model | 绑定的模型字段名 | string | - |
| title | 开关标题 | string | - |
| items | 自定义开关状态数据 | HyToggleItems[] | - |
| enable | 是否允许交互 | boolean | true |

### HyToggleItems 接口
| 属性 | 说明 | 类型 |
|------|------|------|
| id | 状态值 | string \\| number |
| text | 显示文字 | string |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="example">
    <!-- 基础开关 -->
    <hy-toggle 
      title="功能开关" 
      model="toggle1"
      [items]="toggleItems">
    </hy-toggle>
    
    <!-- 禁用状态 -->
    <hy-toggle 
      title="维护模式" 
      model="toggle2"
      [items]="toggleItems"
      [enable]="false">
    </hy-toggle>
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
  selector: 'app-toggle-demo',
  templateUrl: './toggle-demo.component.html'
})
export class ToggleDemoComponent {
  // 开关状态数据
  toggleItems = [
    { id: '0', text: '关闭' },
    { id: '1', text: '开启' }
  ];

  constructor() {
    // 可以在这里设置初始值
    // this.modelService.gt_example.toggle1 = '1'; // 默认开启
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 字典数据
const DictionaryTemplate: Story<HyToggleComponent> = (args: any) => {
  setTimeout(() => {
    _this['gt_dictionary']['dicToggle'] = '1';
  }, 100);
  
  return {
    props: args,
    template: `
      <div class="demo-container">
        <h3>字典数据模式</h3>
        <p>通过字典配置开关状态，便于统一管理和多语言支持</p>
        
        <hy-form>
          <hy-gt model="dictionary">
            <div style="margin-bottom: 16px;">
              <h4>使用系统字典</h4>
              <hy-toggle 
                title="系统状态" 
                model="dicToggle"
                dic="testSwitch">
              </hy-toggle>
            </div>
            
            <div style="margin-bottom: 16px;">
              <h4>显示开关内文字（字典模式）</h4>
              <hy-toggle 
                title="服务状态" 
                model="dicToggle2"
                dic="testSwitch"
                [showToggleText]="true">
              </hy-toggle>
            </div>
          </hy-gt>
        </hy-form>
        
        <div style="margin-top: 20px; padding: 15px; background: #f6f8fa; border-radius: 4px;">
          <h5>💡 字典数据优势：</h5>
          <ul style="margin: 10px 0; padding-left: 20px; font-size: 14px;">
            <li>统一数据管理，便于维护</li>
            <li>支持多语言切换</li>
            <li>可以动态更新字典内容</li>
            <li>与后端数据字典保持一致</li>
          </ul>
        </div>
      </div>
    `
  };
};

export const dictionary = DictionaryTemplate.bind({});
dictionary.args = {};
dictionary.storyName = '字典数据';
dictionary.parameters = {
  docs: {
    description: {
      story: `
## 字典数据

通过字典（dic）属性配置开关状态，实现数据的统一管理和维护。

### 字典模式优势
- **统一管理**: 所有开关状态文字在字典中统一配置
- **多语言支持**: 字典支持国际化，可根据语言自动切换
- **动态更新**: 字典数据可以动态加载和更新
- **数据一致性**: 与后端数据字典保持一致

### 使用方式
1. 在系统中配置字典数据
2. 设置 \`dic\` 属性指向对应的字典名称
3. 字典数据会自动加载并应用到组件

### 配置参数
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| dic | 字典名称 | string | - |
| showToggleText | 是否在开关内显示文字 | boolean | false |

### 字典数据结构
字典数据应包含两个选项，分别对应关闭和开启状态：
\`\`\`json
[
  { "id": "0", "text": "关闭" },
  { "id": "1", "text": "开启" }
]
\`\`\`
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="example">
    <!-- 使用字典数据 -->
    <hy-toggle 
      title="系统状态" 
      model="systemStatus"
      dic="systemStatusDict">
    </hy-toggle>
    
    <!-- 显示开关内文字 -->
    <hy-toggle 
      title="服务状态" 
      model="serviceStatus"
      dic="serviceStatusDict"
      [showToggleText]="true">
    </hy-toggle>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "字典配置",
      template: previewTemplate`
// 字典数据示例
const systemStatusDict = [
  { id: '0', text: '维护中' },
  { id: '1', text: '运行中' }
];

const serviceStatusDict = [
  { id: '0', text: '停止' },
  { id: '1', text: '启动' }
];

// 在组件中使用
@Component({
  selector: 'app-dict-toggle-demo',
  templateUrl: './dict-toggle-demo.component.html'
})
export class DictToggleDemoComponent {
  constructor() {
    // 字典会自动加载，无需手动配置
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 完全控制模式
const ControlTemplate: Story<HyToggleComponent> = (args: any) => {
  setTimeout(() => {
    _this['gt_control']['controlToggle'] = '0';
  }, 100);
  
  return {
    props: args,
    template: `
      <div class="demo-container">
        <h3>完全控制模式</h3>
        <p>通过 control 属性完全由业务逻辑控制开关状态，适用于需要确认或复杂验证的场景</p>
        
        <hy-form>
          <hy-gt model="control">
            <div style="margin-bottom: 16px;">
              <h4>需要确认的开关</h4>
              <hy-toggle 
                title="危险操作" 
                model="controlToggle"
                [items]="controlItems"
                [control]="true"
                (onClick)="handleControlClick($event)">
              </hy-toggle>
            </div>
            
            <div style="margin-bottom: 16px;">
              <h4>权限验证开关</h4>
              <hy-toggle 
                title="管理员模式" 
                model="adminToggle"
                [items]="controlItems"
                [control]="true"
                (onClick)="handleAdminToggle($event)">
              </hy-toggle>
            </div>
          </hy-gt>
        </hy-form>
        
        <div style="margin-top: 20px; padding: 15px; background: #fff7e6; border: 1px solid #ffd591; border-radius: 4px;">
          <h5>⚠️ 控制模式说明：</h5>
          <ul style="margin: 10px 0; padding-left: 20px; font-size: 14px;">
            <li><strong>control="true"</strong>：开关状态完全由业务逻辑控制</li>
            <li><strong>点击事件</strong>：通过 onClick 事件处理用户点击</li>
            <li><strong>状态更新</strong>：需要手动更新模型值来改变开关状态</li>
            <li><strong>适用场景</strong>：需要确认、验证或异步处理的操作</li>
          </ul>
        </div>
      </div>
    `
  };
};

export const controlMode = ControlTemplate.bind({});
controlMode.args = {
  controlItems: [
    { id: '0', text: '关闭' },
    { id: '1', text: '开启' }
  ],
  handleControlClick: (currentValue) => {
    if (currentValue === '0') {
      // 从关闭切换到开启，需要确认
      $hyapi.msg.confirm('确定要开启危险操作吗？', {
        content: '开启后系统将允许执行高风险操作，请谨慎操作',
        callback: () => {
          _this['gt_control']['controlToggle'] = '1';
          $hyapi.msg.createTips('success', '危险操作已开启');
        },
        cancel: () => {
          $hyapi.msg.createTips('info', '操作已取消');
        }
      });
    } else {
      // 从开启切换到关闭，直接执行
      _this['gt_control']['controlToggle'] = '0';
      $hyapi.msg.createTips('success', '危险操作已关闭');
    }
  },
  handleAdminToggle: (currentValue) => {
    // 模拟权限验证
    const hasAdminPermission = Math.random() > 0.5; // 随机模拟权限检查
    
    if (currentValue === '0' && hasAdminPermission) {
      _this['gt_control']['adminToggle'] = '1';
      $hyapi.msg.createTips('success', '管理员模式已开启');
    } else if (currentValue === '0' && !hasAdminPermission) {
      $hyapi.msg.createTips('error', '权限不足，无法开启管理员模式');
    } else {
      _this['gt_control']['adminToggle'] = '0';
      $hyapi.msg.createTips('info', '管理员模式已关闭');
    }
  }
};
controlMode.storyName = '完全控制模式';
controlMode.parameters = {
  docs: {
    description: {
      story: `
## 完全控制模式

通过设置 \`control="true"\`，开关的状态变更完全由业务逻辑控制，适用于需要确认、验证或异步处理的场景。

### 🎯 适用场景

#### 需要用户确认的操作
- 删除重要数据
- 开启危险功能
- 不可逆的系统设置

#### 需要权限验证的操作
- 管理员功能切换
- 敏感功能访问
- 安全级别调整

#### 需要异步处理的操作
- 远程服务开关
- 网络连接切换
- 外部系统集成

### 🔧 实现原理

1. **阻止默认行为**: \`control="true"\` 阻止开关自动切换状态
2. **事件处理**: 通过 \`(onClick)\` 事件获取用户点击
3. **业务逻辑**: 在事件处理函数中执行确认、验证等逻辑
4. **手动更新**: 通过修改模型值来控制开关状态

### 配置参数
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| control | 是否完全由业务控制状态 | boolean | false |
| onClick | 点击事件回调 | EventEmitter | - |

### 💡 最佳实践
- 提供清晰的操作反馈
- 重要操作需要二次确认
- 异步操作显示加载状态
- 权限不足时给出明确提示
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="example">
    <!-- 需要确认的开关 -->
    <hy-toggle 
      title="危险操作" 
      model="dangerToggle"
      [items]="toggleItems"
      [control]="true"
      (onClick)="handleDangerToggle($event)">
    </hy-toggle>
    
    <!-- 权限验证开关 -->
    <hy-toggle 
      title="管理员模式" 
      model="adminToggle"
      [items]="toggleItems"
      [control]="true"
      (onClick)="handleAdminToggle($event)">
    </hy-toggle>
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
import { $hyapi, ModelService } from '@hy/frame';

@Component({
  selector: 'app-control-toggle-demo',
  templateUrl: './control-toggle-demo.component.html'
})
export class ControlToggleDemoComponent {
  toggleItems = [
    { id: '0', text: '关闭' },
    { id: '1', text: '开启' }
  ];

  constructor(private modelService: ModelService) {}

  // 处理危险操作开关
  handleDangerToggle(currentValue: string) {
    if (currentValue === '0') {
      // 开启危险操作需要确认
      $hyapi.msg.confirm('确定要开启危险操作吗？', {
        content: '此操作可能导致数据丢失，请谨慎操作',
        callback: () => {
          this.modelService.gt_example.dangerToggle = '1';
          $hyapi.msg.createTips('success', '危险操作已开启');
        },
        cancel: () => {
          $hyapi.msg.createTips('info', '操作已取消');
        }
      });
    } else {
      // 关闭危险操作直接执行
      this.modelService.gt_example.dangerToggle = '0';
      $hyapi.msg.createTips('success', '危险操作已关闭');
    }
  }

  // 处理管理员模式开关
  async handleAdminToggle(currentValue: string) {
    if (currentValue === '0') {
      // 检查管理员权限
      try {
        const hasPermission = await this.checkAdminPermission();
        if (hasPermission) {
          this.modelService.gt_example.adminToggle = '1';
          $hyapi.msg.createTips('success', '管理员模式已开启');
        } else {
          $hyapi.msg.createTips('error', '权限不足，无法开启管理员模式');
        }
      } catch (error) {
        $hyapi.msg.createTips('error', '权限验证失败');
      }
    } else {
      this.modelService.gt_example.adminToggle = '0';
      $hyapi.msg.createTips('info', '管理员模式已关闭');
    }
  }

  // 模拟权限检查
  private async checkAdminPermission(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟API调用
        resolve(Math.random() > 0.3);
      }, 1000);
    });
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 尺寸和样式
const SizeStyleTemplate: Story<HyToggleComponent> = (args: any) => {
  return {
    props: args,
    template: `
      <div class="demo-container">
        <h3>尺寸和样式配置</h3>
        <p>支持不同尺寸的开关和文字对齐方式</p>
        
        <hy-form>
          <hy-gt model="sizeStyle">
            <div style="margin-bottom: 24px;">
              <h4>不同尺寸</h4>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="小尺寸开关" 
                  model="smallToggle"
                  [items]="sizeItems"
                  size="small"
                  [showToggleText]="true">
                </hy-toggle>
              </div>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="默认尺寸开关" 
                  model="defaultToggle"
                  [items]="sizeItems"
                  size="default"
                  [showToggleText]="true">
                </hy-toggle>
              </div>
            </div>
            
            <div style="margin-bottom: 24px;">
              <h4>文字对齐方式</h4>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="左对齐" 
                  model="leftAlign"
                  [items]="sizeItems"
                  textAlign="left">
                </hy-toggle>
              </div>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="居中对齐" 
                  model="centerAlign"
                  [items]="sizeItems"
                  textAlign="center">
                </hy-toggle>
              </div>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="右对齐" 
                  model="rightAlign"
                  [items]="sizeItems"
                  textAlign="right">
                </hy-toggle>
              </div>
            </div>
            
            <div style="margin-bottom: 24px;">
              <h4>显示开关内文字</h4>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="开关内显示文字" 
                  model="withText"
                  [items]="sizeItems"
                  [showToggleText]="true">
                </hy-toggle>
              </div>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="开关内不显示文字" 
                  model="withoutText"
                  [items]="sizeItems"
                  [showToggleText]="false">
                </hy-toggle>
              </div>
            </div>
          </hy-gt>
        </hy-form>
      </div>
    `
  };
};

export const sizeStyle = SizeStyleTemplate.bind({});
sizeStyle.args = {
  sizeItems: [
    { id: '0', text: '禁用' },
    { id: '1', text: '启用' }
  ]
};
sizeStyle.storyName = '尺寸和样式';
sizeStyle.parameters = {
  docs: {
    description: {
      story: `
## 尺寸和样式

提供不同的尺寸选项和样式配置，满足各种界面设计需求。

### 🎨 尺寸选项

#### small（小尺寸）
- 适用于紧凑的界面布局
- 表格行内开关
- 工具栏中的功能开关

#### default（默认尺寸）
- 标准的开关大小
- 表单中的常规开关
- 设置页面的功能开关

### 🎯 样式配置

#### 文字对齐
- **left**: 左对齐（默认）
- **center**: 居中对齐
- **right**: 右对齐

#### 开关内文字
- **showToggleText**: 控制是否在开关内显示状态文字
- 文字内容来自 items 配置的 text 字段
- 适合状态含义明确的场景

### 配置参数
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| size | 开关大小 | 'small' \\| 'default' | 'default' |
| textAlign | 文字对齐方式 | 'left' \\| 'center' \\| 'right' | 'left' |
| showToggleText | 是否显示开关内文字 | boolean | false |

### 使用建议
- 在表格中使用小尺寸开关节省空间
- 设置页面使用默认尺寸保证可操作性
- 状态含义明确时可显示开关内文字
- 根据布局需要选择合适的对齐方式
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="example">
    <!-- 小尺寸开关 -->
    <hy-toggle 
      title="小尺寸" 
      model="smallToggle"
      [items]="toggleItems"
      size="small"
      [showToggleText]="true">
    </hy-toggle>
    
    <!-- 默认尺寸开关 -->
    <hy-toggle 
      title="默认尺寸" 
      model="defaultToggle"
      [items]="toggleItems"
      size="default"
      [showToggleText]="true">
    </hy-toggle>
    
    <!-- 居中对齐 -->
    <hy-toggle 
      title="居中对齐" 
      model="centerToggle"
      [items]="toggleItems"
      textAlign="center">
    </hy-toggle>
    
    <!-- 右对齐 -->
    <hy-toggle 
      title="右对齐" 
      model="rightToggle"
      [items]="toggleItems"
      textAlign="right">
    </hy-toggle>
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
  selector: 'app-size-style-demo',
  templateUrl: './size-style-demo.component.html'
})
export class SizeStyleDemoComponent {
  toggleItems = [
    { id: '0', text: '关闭' },
    { id: '1', text: '开启' }
  ];

  // 根据使用场景选择合适的配置
  getToggleConfig(scene: string) {
    switch (scene) {
      case 'table':
        return {
          size: 'small',
          showToggleText: false,
          textAlign: 'center'
        };
      case 'form':
        return {
          size: 'default',
          showToggleText: true,
          textAlign: 'left'
        };
      case 'toolbar':
        return {
          size: 'small',
          showToggleText: true,
          textAlign: 'left'
        };
      default:
        return {
          size: 'default',
          showToggleText: false,
          textAlign: 'left'
        };
    }
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 提示功能
const TipTemplate: Story<HyToggleComponent> = (args: any) => {
  return {
    props: args,
    template: `
      <div class="demo-container">
        <h3>提示功能</h3>
        <p>为开关添加提示信息，帮助用户理解功能作用</p>
        
        <hy-form>
          <hy-gt model="tipDemo">
            <div style="margin-bottom: 24px;">
              <h4>默认提示（右侧显示）</h4>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="自动备份" 
                  model="autoBackup"
                  [items]="tipItems"
                  tip="开启后系统将每天自动备份数据"
                  tipType="default">
                </hy-toggle>
              </div>
              
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="数据同步" 
                  model="dataSync"
                  [items]="tipItems"
                  tip="启用后将实时同步到云端"
                  tipType="default">
                </hy-toggle>
              </div>
            </div>
            
            <div style="margin-bottom: 24px;">
              <h4>底部提示</h4>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="邮件通知" 
                  model="emailNotify"
                  [items]="tipItems"
                  tip="开启后将通过邮件发送重要通知"
                  tipType="bottomTip">
                </hy-toggle>
              </div>
              
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="短信通知" 
                  model="smsNotify"
                  [items]="tipItems"
                  tip="开启后将通过短信发送紧急通知，可能产生费用"
                  tipType="bottomTip">
                </hy-toggle>
              </div>
            </div>
            
            <div style="margin-bottom: 24px;">
              <h4>模板提示</h4>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="高级设置" 
                  model="advancedSettings"
                  [items]="tipItems"
                  [tip]="advancedTemplate"
                  tipType="default">
                </hy-toggle>
              </div>
            </div>
          </hy-gt>
        </hy-form>
        
        <ng-template #advancedTemplate>
          <div style="width: 300px;">
            <h5 style="margin: 0 0 8px 0; color: var(--primary-color);">高级设置说明</h5>
            <ul style="margin: 0; padding-left: 16px; font-size: 12px;">
              <li>启用高级性能优化</li>
              <li>开启调试模式</li>
              <li>允许实验性功能</li>
            </ul>
            <div style="margin-top: 8px; font-size: 12px; color: var(--warning-color);">
              ⚠️ 仅供专业用户使用
            </div>
          </div>
        </ng-template>
      </div>
    `
  };
};

export const tipFeature = TipTemplate.bind({});
tipFeature.args = {
  tipItems: [
    { id: '0', text: '关闭' },
    { id: '1', text: '开启' }
  ]
};
tipFeature.storyName = '提示功能';
tipFeature.parameters = {
  docs: {
    description: {
      story: `
## 提示功能

为开关按钮添加提示信息，帮助用户更好地理解功能的作用和影响。

### 💡 提示类型

#### default（默认提示）
- 显示在开关右侧
- 适合简短的功能说明
- 不占用额外的垂直空间

#### bottomTip（底部提示）
- 显示在开关下方
- 适合较长的详细说明
- 提供更多的展示空间

### 📝 提示内容

#### 字符串提示
- 直接设置 \`tip\` 属性为字符串
- 适合简单的文字说明
- 支持基本的HTML标签

#### 模板提示
- 设置 \`tip\` 属性为 \`TemplateRef\`
- 支持复杂的HTML结构
- 可以包含样式、图标、链接等

### 使用场景
- 🔧 **功能说明**: 解释开关控制的具体功能
- ⚠️ **风险提醒**: 提示操作可能产生的影响
- 💰 **费用说明**: 提醒可能产生的费用
- 🎯 **使用条件**: 说明功能的使用前提

### 配置参数
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| tip | 提示内容 | string \\| TemplateRef<void> | - |
| tipType | 提示显示类型 | 'default' \\| 'bottomTip' | 'default' |

### 💡 最佳实践
- 提示内容要简洁明了
- 重要提示使用底部显示
- 复杂内容使用模板形式
- 注意提示的可访问性
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="example">
    <!-- 默认提示 -->
    <hy-toggle 
      title="自动保存" 
      model="autoSave"
      [items]="toggleItems"
      tip="开启后将自动保存编辑内容"
      tipType="default">
    </hy-toggle>
    
    <!-- 底部提示 -->
    <hy-toggle 
      title="数据同步" 
      model="dataSync"
      [items]="toggleItems"
      tip="启用后数据将实时同步到云端，可能消耗更多流量"
      tipType="bottomTip">
    </hy-toggle>
    
    <!-- 模板提示 -->
    <hy-toggle 
      title="高级功能" 
      model="advanced"
      [items]="toggleItems"
      [tip]="advancedTip"
      tipType="default">
    </hy-toggle>
  </hy-gt>
</hy-form>

<ng-template #advancedTip>
  <div style="width: 250px;">
    <h5>高级功能包括：</h5>
    <ul>
      <li>性能优化</li>
      <li>批量操作</li>
      <li>数据分析</li>
    </ul>
    <small style="color: #999;">
      需要高级权限
    </small>
  </div>
</ng-template>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tip-toggle-demo',
  templateUrl: './tip-toggle-demo.component.html'
})
export class TipToggleDemoComponent {
  @ViewChild('advancedTip') advancedTip!: TemplateRef<any>;
  
  toggleItems = [
    { id: '0', text: '关闭' },
    { id: '1', text: '开启' }
  ];

  // 根据不同场景提供相应的提示
  getTipContent(type: string): string {
    const tips = {
      'backup': '开启后系统将定期自动备份重要数据',
      'sync': '启用数据同步功能，确保多设备数据一致性',
      'notification': '开启通知功能，及时接收重要消息',
      'security': '启用高级安全模式，增强账户保护',
      'performance': '开启性能优化，可能会增加系统资源消耗'
    };
    
    return tips[type] || '请查看文档了解详细信息';
  }

  // 创建动态模板提示
  createDynamicTip(title: string, features: string[], warning?: string) {
    // 在实际项目中，可以动态创建模板内容
    return {
      title,
      features,
      warning
    };
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 布局配置
const LayoutTemplate: Story<HyToggleComponent> = (args: any) => {
  return {
    props: args,
    template: `
      <div class="demo-container">
        <h3>布局配置</h3>
        <p>支持 Flex 布局和栅格布局，适应不同的界面需求</p>
        
        <hy-form>
          <hy-gt model="layoutDemo">
            <div style="margin-bottom: 24px;">
              <h4>Flex 布局</h4>
              <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
                <hy-toggle 
                  title="开关1" 
                  model="flex1"
                  [items]="layoutItems"
                  flex="120px">
                </hy-toggle>
                <hy-toggle 
                  title="开关2" 
                  model="flex2"
                  [items]="layoutItems"
                  flex="150px">
                </hy-toggle>
                <hy-toggle 
                  title="开关3" 
                  model="flex3"
                  [items]="layoutItems"
                  flex="100px">
                </hy-toggle>
              </div>
            </div>
            
            <div style="margin-bottom: 24px;">
              <h4>栅格布局（24栅格系统）</h4>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="全宽开关" 
                  model="cols24"
                  [items]="layoutItems"
                  cols="24">
                </hy-toggle>
              </div>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="半宽开关" 
                  model="cols12"
                  [items]="layoutItems"
                  cols="12">
                </hy-toggle>
                <hy-toggle 
                  title="半宽开关" 
                  model="cols12_2"
                  [items]="layoutItems"
                  cols="12">
                </hy-toggle>
              </div>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="三分之一宽" 
                  model="cols8_1"
                  [items]="layoutItems"
                  cols="8">
                </hy-toggle>
                <hy-toggle 
                  title="三分之一宽" 
                  model="cols8_2"
                  [items]="layoutItems"
                  cols="8">
                </hy-toggle>
                <hy-toggle 
                  title="三分之一宽" 
                  model="cols8_3"
                  [items]="layoutItems"
                  cols="8">
                </hy-toggle>
              </div>
            </div>
            
            <div style="margin-bottom: 24px;">
              <h4>标签配置</h4>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="自定义标签宽度" 
                  model="labelWidth"
                  [items]="layoutItems"
                  labelWidth="150px">
                </hy-toggle>
              </div>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="标签换行显示" 
                  model="labelWrap"
                  [items]="layoutItems"
                  [isLabelWrap]="true"
                  labelWidth="100px">
                </hy-toggle>
              </div>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="隐藏冒号" 
                  model="noColon"
                  [items]="layoutItems"
                  [noColon]="true">
                </hy-toggle>
              </div>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  model="noLabel"
                  [items]="layoutItems"
                  [noLabel]="true">
                </hy-toggle>
                <span style="margin-left: 8px; color: #666;">（隐藏标签的开关）</span>
              </div>
            </div>
          </hy-gt>
        </hy-form>
      </div>
    `
  };
};

export const layout = LayoutTemplate.bind({});
layout.args = {
  layoutItems: [
    { id: '0', text: '否' },
    { id: '1', text: '是' }
  ]
};
layout.storyName = '布局配置';
layout.parameters = {
  docs: {
    description: {
      story: `
## 布局配置

提供灵活的布局选项，包括 Flex 布局和栅格布局，以及标签的各种配置。

### 🎛️ 布局方式

#### Flex 布局
- 通过 \`flex\` 属性设置组件宽度
- 适用于需要精确控制宽度的场景
- 支持像素值和百分比

#### 栅格布局
- 基于 24 栅格系统
- 通过 \`cols\` 属性设置占用的栅格数
- 适用于响应式布局

### 🏷️ 标签配置

#### 标签宽度
- \`labelWidth\`: 设置标签的宽度
- 支持固定像素值
- 适用于对齐要求较高的表单

#### 标签显示
- \`noLabel\`: 隐藏标签，只显示开关
- \`noColon\`: 隐藏标签后的冒号
- \`isLabelWrap\`: 标签文字过长时是否换行

### 配置参数
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| flex | Flex布局宽度 | string | - |
| cols | 栅格布局列数(1-24) | number \\| string | - |
| labelWidth | 标签宽度 | string | - |
| noLabel | 是否隐藏标签 | boolean | false |
| noColon | 是否隐藏冒号 | boolean | false |
| isLabelWrap | 标签是否换行 | boolean | - |

### 💡 使用建议
- 表单中使用栅格布局确保对齐
- 工具栏中使用 Flex 布局节省空间
- 设置合适的标签宽度保持视觉统一
- 紧凑布局可以隐藏标签和冒号
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="example">
    <!-- Flex 布局 -->
    <div style="display: flex; gap: 16px;">
      <hy-toggle 
        title="设置1" 
        model="setting1"
        [items]="toggleItems"
        flex="120px">
      </hy-toggle>
      <hy-toggle 
        title="设置2" 
        model="setting2"
        [items]="toggleItems"
        flex="150px">
      </hy-toggle>
    </div>
    
    <!-- 栅格布局 -->
    <hy-toggle 
      title="全宽" 
      model="fullWidth"
      [items]="toggleItems"
      cols="24">
    </hy-toggle>
    
    <hy-toggle 
      title="半宽1" 
      model="halfWidth1"
      [items]="toggleItems"
      cols="12">
    </hy-toggle>
    <hy-toggle 
      title="半宽2" 
      model="halfWidth2"
      [items]="toggleItems"
      cols="12">
    </hy-toggle>
    
    <!-- 标签配置 -->
    <hy-toggle 
      title="自定义标签宽度" 
      model="customLabel"
      [items]="toggleItems"
      labelWidth="180px">
    </hy-toggle>
    
    <hy-toggle 
      title="隐藏冒号" 
      model="hideColon"
      [items]="toggleItems"
      [noColon]="true">
    </hy-toggle>
    
    <hy-toggle 
      model="hideLabel"
      [items]="toggleItems"
      [noLabel]="true">
    </hy-toggle>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "响应式示例",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-toggle-demo',
  templateUrl: './layout-toggle-demo.component.html',
  styleUrls: ['./layout-toggle-demo.component.css']
})
export class LayoutToggleDemoComponent {
  toggleItems = [
    { id: '0', text: '关闭' },
    { id: '1', text: '开启' }
  ];

  // 响应式布局配置
  getResponsiveConfig() {
    const isSmallScreen = window.innerWidth < 768;
    
    return {
      cols: isSmallScreen ? 24 : 12,
      labelWidth: isSmallScreen ? '100px' : '150px',
      isLabelWrap: isSmallScreen
    };
  }

  // 不同场景的布局配置
  getLayoutConfig(scene: 'form' | 'toolbar' | 'card') {
    switch (scene) {
      case 'form':
        return {
          cols: 24,
          labelWidth: '120px',
          noColon: false
        };
      case 'toolbar':
        return {
          flex: '80px',
          noLabel: true,
          noColon: true
        };
      case 'card':
        return {
          cols: 12,
          labelWidth: '80px',
          isLabelWrap: true
        };
      default:
        return {};
    }
  }
}

/* CSS 样式 */
.layout-toggle-demo .hy-gt {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

@media (max-width: 768px) {
  .layout-toggle-demo .hy-toggle {
    width: 100% !important;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 事件处理
const EventTemplate: Story<HyToggleComponent> = (args: any) => {
  return {
    props: args,
    template: `
      <div class="demo-container">
        <h3>事件处理</h3>
        <p>监听开关的点击和值变化事件，实现复杂的业务逻辑</p>
        
        <hy-form>
          <hy-gt model="eventDemo">
            <div style="margin-bottom: 24px;">
              <h4>基础事件监听</h4>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="点击事件监听" 
                  model="clickEvent"
                  [items]="eventItems"
                  (onClick)="handleClick('点击事件', $event)">
                </hy-toggle>
              </div>
              
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="值变化事件监听" 
                  model="changeEvent"
                  [items]="eventItems"
                  (onChange_model)="handleChange('值变化事件', $event)">
                </hy-toggle>
              </div>
            </div>
            
            <div style="margin-bottom: 24px;">
              <h4>业务场景示例</h4>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="主题切换" 
                  model="themeToggle"
                  [items]="themeItems"
                  (onChange_model)="handleThemeChange($event)">
                </hy-toggle>
              </div>
              
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="功能模块" 
                  model="moduleToggle"
                  [items]="moduleItems"
                  (onClick)="handleModuleToggle($event)"
                  (onChange_model)="handleModuleChange($event)">
                </hy-toggle>
              </div>
              
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="数据统计" 
                  model="statsToggle"
                  [items]="statsItems"
                  (onChange_model)="handleStatsToggle($event)">
                </hy-toggle>
              </div>
            </div>
          </hy-gt>
        </hy-form>
        
        <div style="margin-top: 20px; padding: 15px; background: #f6f8fa; border-radius: 4px;">
          <h5>📝 事件日志：</h5>
          <div id="eventLog" style="max-height: 200px; overflow-y: auto; font-family: monospace; font-size: 12px;">
            <!-- 事件日志将在这里显示 -->
          </div>
        </div>
      </div>
    `
  };
};

export const eventHandling = EventTemplate.bind({});
eventHandling.args = {
  eventItems: [
    { id: '0', text: '关闭' },
    { id: '1', text: '开启' }
  ],
  themeItems: [
    { id: 'light', text: '浅色' },
    { id: 'dark', text: '深色' }
  ],
  moduleItems: [
    { id: 'disabled', text: '禁用' },
    { id: 'enabled', text: '启用' }
  ],
  statsItems: [
    { id: 'off', text: '关闭统计' },
    { id: 'on', text: '开启统计' }
  ],
  handleClick: (source, value) => {
    const log = `[${new Date().toLocaleTimeString()}] ${source}: 点击事件触发，当前值=${value}`;
    console.log(log);
    $hyapi.msg.createTips('info', `${source}被点击`);
    
    // 添加到事件日志
    const logElement = document.getElementById('eventLog');
    if (logElement) {
      logElement.innerHTML += `<div>${log}</div>`;
      logElement.scrollTop = logElement.scrollHeight;
    }
  },
  handleChange: (source, value) => {
    const log = `[${new Date().toLocaleTimeString()}] ${source}: 值变化事件触发，新值=${value}`;
    console.log(log);
    $hyapi.msg.createTips('success', `${source}值已更新`);
    
    // 添加到事件日志
    const logElement = document.getElementById('eventLog');
    if (logElement) {
      logElement.innerHTML += `<div style="color: #52c41a;">${log}</div>`;
      logElement.scrollTop = logElement.scrollHeight;
    }
  },
  handleThemeChange: (theme) => {
    console.log('主题切换:', theme);
    
    // 模拟主题切换逻辑
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      $hyapi.msg.createTips('success', '已切换到深色主题');
    } else {
      document.body.classList.remove('dark-theme');
      $hyapi.msg.createTips('success', '已切换到浅色主题');
    }
    
    const log = `[${new Date().toLocaleTimeString()}] 主题切换: ${theme === 'dark' ? '深色模式' : '浅色模式'}`;
    const logElement = document.getElementById('eventLog');
    if (logElement) {
      logElement.innerHTML += `<div style="color: var(--primary-color);">${log}</div>`;
      logElement.scrollTop = logElement.scrollHeight;
    }
  },
  handleModuleToggle: (value) => {
    console.log('功能模块点击:', value);
    
    const log = `[${new Date().toLocaleTimeString()}] 模块点击: 准备${value === 'disabled' ? '启用' : '禁用'}功能模块`;
    const logElement = document.getElementById('eventLog');
    if (logElement) {
      logElement.innerHTML += `<div style="color: #fa8c16;">${log}</div>`;
      logElement.scrollTop = logElement.scrollHeight;
    }
  },
  handleModuleChange: (value) => {
    console.log('功能模块状态变化:', value);
    
    // 模拟模块状态变化处理
    if (value === 'enabled') {
      // 启用模块
      $hyapi.msg.createTips('success', '功能模块已启用');
    } else {
      // 禁用模块
      $hyapi.msg.createTips('warning', '功能模块已禁用');
    }
    
    const log = `[${new Date().toLocaleTimeString()}] 模块状态: ${value === 'enabled' ? '已启用' : '已禁用'}`;
    const logElement = document.getElementById('eventLog');
    if (logElement) {
      logElement.innerHTML += `<div style="color: var(--success-color);">${log}</div>`;
      logElement.scrollTop = logElement.scrollHeight;
    }
  },
  handleStatsToggle: (value) => {
    console.log('数据统计开关:', value);
    
    // 模拟统计功能切换
    if (value === 'on') {
      // 开始数据统计
      $hyapi.msg.createTips('info', '数据统计已开启，开始收集数据...');
    } else {
      // 停止数据统计
      $hyapi.msg.createTips('info', '数据统计已关闭');
    }
    const log = `[${new Date().toLocaleTimeString()}] 统计功能: ${value === 'on' ? '开启数据收集' : '停止数据收集'}`;
    const logElement = document.getElementById('eventLog');
    if (logElement) {
      logElement.innerHTML += `<div style="color: var(--primary-color);">${log}</div>`;
      logElement.scrollTop = logElement.scrollHeight;
    }
  }
};
eventHandling.storyName = '事件处理';
eventHandling.parameters = {
  docs: {
    description: {
      story: `
## 事件处理

开关组件提供丰富的事件监听机制，支持点击事件和值变化事件，满足各种业务场景需求。

### 🎯 事件类型

#### onClick 点击事件
- 用户每次点击开关时触发
- 参数：当前开关的值
- 适用于需要监听用户操作的场景

#### onChange_model 值变化事件
- 开关状态实际改变时触发
- 参数：新的开关值
- 适用于需要响应状态变化的场景

### 📋 事件参数
两个事件都会传递当前开关的值作为参数：
- 值来自 \`items\` 配置中的 \`id\` 字段
- 可以是字符串或数字类型

### 🎪 业务场景示例

#### 主题切换
- 监听值变化事件
- 根据开关状态切换应用主题
- 保存用户偏好设置

#### 功能模块控制
- 同时监听点击和变化事件
- 点击时进行权限检查
- 变化时更新模块状态

#### 数据统计开关
- 监听值变化事件
- 控制数据收集的开启/关闭
- 更新统计配置

### 配置参数
| 事件 | 说明 | 参数类型 |
|------|------|----------|
| (onClick) | 用户点击时触发 | string \\| number |
| (onChange_model) | 值变化时触发 | string \\| number |

### 💡 最佳实践
- 根据业务需求选择合适的事件类型
- 在事件处理函数中提供用户反馈
- 处理异步操作时显示加载状态
- 记录重要操作的日志信息
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="example">
    <!-- 点击事件监听 -->
    <hy-toggle 
      title="点击监听" 
      model="clickToggle"
      [items]="toggleItems"
      (onClick)="handleClick($event)">
    </hy-toggle>
    
    <!-- 值变化事件监听 -->
    <hy-toggle 
      title="变化监听" 
      model="changeToggle"
      [items]="toggleItems"
      (onChange_model)="handleChange($event)">
    </hy-toggle>
    
    <!-- 同时监听两个事件 -->
    <hy-toggle 
      title="双事件监听" 
      model="bothToggle"
      [items]="toggleItems"
      (onClick)="handleClick($event)"
      (onChange_model)="handleChange($event)">
    </hy-toggle>
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
import { $hyapi } from '@hy/frame';

@Component({
  selector: 'app-event-toggle-demo',
  templateUrl: './event-toggle-demo.component.html'
})
export class EventToggleDemoComponent {
  toggleItems = [
    { id: '0', text: '关闭' },
    { id: '1', text: '开启' }
  ];

  // 处理点击事件
  handleClick(value: string | number) {
    console.log('开关被点击，当前值:', value);
    
    // 可以在这里执行点击相关的逻辑
    // 比如权限检查、确认对话框等
    
    $hyapi.msg.createTips('info', \`开关被点击，当前值: \${value}\`);
  }

  // 处理值变化事件
  handleChange(newValue: string | number) {
    console.log('开关值发生变化:', newValue);
    
    // 在这里处理状态变化后的业务逻辑
    // 比如保存配置、更新界面、发送通知等
    
    if (newValue === '1') {
      $hyapi.msg.createTips('success', '功能已开启');
      this.onFeatureEnabled();
    } else {
      $hyapi.msg.createTips('warning', '功能已关闭');
      this.onFeatureDisabled();
    }
  }

  // 功能开启时的处理
  private onFeatureEnabled() {
    // 启用相关功能
    console.log('启用功能相关操作');
  }

  // 功能关闭时的处理
  private onFeatureDisabled() {
    // 禁用相关功能
    console.log('禁用功能相关操作');
  }

  // 主题切换示例
  handleThemeChange(theme: string) {
    if (theme === 'dark') {
      // 切换到深色主题
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      $hyapi.msg.createTips('success', '已切换到深色主题');
    } else {
      // 切换到浅色主题
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
      $hyapi.msg.createTips('success', '已切换到浅色主题');
    }
  }

  // 异步处理示例
  async handleAsyncToggle(value: string | number) {
    try {
      // 显示加载状态
      const loading = $hyapi.msg.loading({ msg: '正在处理...' });
      
      // 模拟异步操作
      await this.performAsyncOperation(value);
      
      // 关闭加载
      $hyapi.msg.closeLoading(loading);
      
      $hyapi.msg.createTips('success', '操作完成');
    } catch (error) {
      $hyapi.msg.createTips('error', '操作失败');
      console.error('异步操作失败:', error);
    }
  }

  private performAsyncOperation(value: string | number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 模拟成功/失败
        if (Math.random() > 0.2) {
          resolve();
        } else {
          reject(new Error('模拟异步操作失败'));
        }
      }, 2000);
    });
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 说明文字
const ExplainTemplate: Story<HyToggleComponent> = (args: any) => {
  return {
    props: args,
    template: `
      <div class="demo-container">
        <h3>说明文字</h3>
        <p>为开关添加说明文字，提供更详细的功能描述</p>
        
        <hy-form>
          <hy-gt model="explainDemo">
            <div style="margin-bottom: 24px;">
              <h4>字符串说明</h4>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="自动更新" 
                  model="autoUpdate"
                  [items]="explainItems"
                  explainText="开启后系统将自动检查并安装更新">
                </hy-toggle>
              </div>
              
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="数据收集" 
                  model="dataCollection"
                  [items]="explainItems"
                  explainText="用于改善产品体验，不会收集个人隐私信息">
                </hy-toggle>
              </div>
            </div>
            
            <div style="margin-bottom: 24px;">
              <h4>模板说明</h4>
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="高级安全" 
                  model="advancedSecurity"
                  [items]="explainItems"
                  [explainText]="securityExplainTemplate">
                </hy-toggle>
              </div>
              
              <div style="margin-bottom: 16px;">
                <hy-toggle 
                  title="性能优化" 
                  model="performance"
                  [items]="explainItems"
                  [explainText]="performanceExplainTemplate">
                </hy-toggle>
              </div>
            </div>
          </hy-gt>
        </hy-form>
        
        <ng-template #securityExplainTemplate>
          <div style="font-size: 13px; color: #666; margin-top: 4px;">
            包含以下安全功能：
            <ul style="margin: 4px 0; padding-left: 16px;">
              <li>🔒 双因子认证</li>
              <li>🛡️ 异常登录检测</li>
              <li>📱 设备绑定验证</li>
            </ul>
            <span style="color: #52c41a;">推荐开启</span>
          </div>
        </ng-template>
        
        <ng-template #performanceExplainTemplate>
          <div style="font-size: 13px; color: #666; margin-top: 4px;">
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <span style="color: var(--primary-color);">⚡</span>
              <span style="margin-left: 4px;">启用后可提升系统响应速度</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="color: var(--warning-color);">⚠️</span>
              <span style="margin-left: 4px;">可能会增加内存使用量</span>
            </div>
          </div>
        </ng-template>
      </div>
    `
  };
};

export const explainText = ExplainTemplate.bind({});
explainText.args = {
  explainItems: [
    { id: '0', text: '关闭' },
    { id: '1', text: '开启' }
  ]
};
explainText.storyName = '说明文字';
explainText.parameters = {
  docs: {
    description: {
      story: `
## 说明文字

通过 \`explainText\` 属性为开关添加说明文字，帮助用户更好地理解功能的用途和影响。

### 📝 说明类型

#### 字符串说明
- 直接设置 \`explainText\` 为字符串
- 适合简单的功能描述
- 显示在开关下方

#### 模板说明
- 设置 \`explainText\` 为 \`TemplateRef\`
- 支持复杂的HTML结构和样式
- 可以包含图标、链接、列表等元素

### 🎨 显示样式
- 说明文字显示在开关右侧
- 字体较小，颜色较淡
- 不影响开关的主要交互区域

### 使用场景
- 📖 **功能说明**: 解释开关控制的具体功能
- ⚠️ **注意事项**: 提醒用户操作的注意点
- 💡 **使用建议**: 推荐的使用方式
- 🔧 **技术细节**: 功能的技术说明

### 配置参数
| 属性 | 说明 | 类型 |
|------|------|------|
| explainText | 说明文字内容 | string \\| TemplateRef<void> |

### 与提示(tip)的区别
| 特性 | explainText | tip |
|------|-------------|-----|
| **显示位置** | 开关右侧 | 开关右侧或下方 |
| **触发方式** | 始终显示 | 悬停或点击 |
| **内容长度** | 适合较长说明 | 适合简短提示 |
| **用户体验** | 信息展示 | 交互反馈 |

### 💡 最佳实践
- 说明文字要简洁明了
- 重要信息可以使用模板添加样式
- 避免文字过长影响布局
- 与提示功能配合使用效果更佳
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="example">
    <!-- 字符串说明 -->
    <hy-toggle 
      title="自动备份" 
      model="backup"
      [items]="toggleItems"
      explainText="每天凌晨2点自动备份重要数据">
    </hy-toggle>
    
    <!-- 模板说明 -->
    <hy-toggle 
      title="实验性功能" 
      model="experimental"
      [items]="toggleItems"
      [explainText]="experimentalTemplate">
    </hy-toggle>
  </hy-gt>
</hy-form>

<ng-template #experimentalTemplate>
  <div style="font-size: 13px; color: #666;">
    <div style="margin-bottom: 4px;">
      <span style="color: #faad14;">⚠️</span>
      实验性功能，可能不稳定
    </div>
    <div>
      <a href="#" style="color: var(--primary-color);">查看详细说明</a>
    </div>
  </div>
</ng-template>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-explain-toggle-demo',
  templateUrl: './explain-toggle-demo.component.html'
})
export class ExplainToggleDemoComponent {
  @ViewChild('experimentalTemplate') experimentalTemplate!: TemplateRef<any>;
  
  toggleItems = [
    { id: '0', text: '关闭' },
    { id: '1', text: '开启' }
  ];

  // 根据不同功能提供相应的说明
  getExplainText(feature: string): string {
    const explains = {
      'backup': '定期备份重要数据，防止意外丢失',
      'sync': '实时同步到云端，确保数据安全',
      'notification': '及时接收重要通知和更新',
      'analytics': '收集使用统计，帮助改善产品体验',
      'debug': '开启调试模式，仅供开发人员使用'
    };
    
    return explains[feature] || '请查看帮助文档了解详细信息';
  }

  // 创建富文本说明
  createRichExplain(title: string, items: string[], warning?: string) {
    // 在实际项目中，可以动态生成模板内容
    return {
      title,
      items,
      warning
    };
  }

  // 处理说明中的链接点击
  handleExplainLinkClick(action: string) {
    switch (action) {
      case 'help':
        // 打开帮助页面
        window.open('/help', '_blank');
        break;
      case 'feedback':
        // 打开反馈页面
        window.open('/feedback', '_blank');
        break;
      default:
        console.log('处理说明链接点击:', action);
    }
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};



