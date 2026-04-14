import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../base/base.module';
import { HyAlertComponent } from './hy-alert.component';
import { unit } from '../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { $hyapi } from '../../../_index';
import { previewTemplate } from 'storybook-addon-preview';

const argTypes = unit.createArgTypes('HyAlertComponent');
export default {
  title: '基础组件/hy-alert（提示）',
  component: HyAlertComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule],
    }),
  ],
  argTypes
} as Meta;

// 基础用法
const BasicTemplate: Story<HyAlertComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>不同类型的提示</h3>
      <p>提供成功、信息、警告、错误四种类型的提示样式</p>
      
      <div style="margin-bottom: 16px;">
        <h4>成功提示</h4>
        <hy-alert 
          alertType="success"
          message="成功提示的文案"
          description="成功提示的辅助性文字介绍">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 16px;">
        <h4>信息提示</h4>
        <hy-alert 
          alertType="info"
          message="信息提示的文案"
          description="信息提示的辅助性文字介绍">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 16px;">
        <h4>警告提示</h4>
        <hy-alert 
          alertType="warning"
          message="警告提示的文案"
          description="警告提示的辅助性文字介绍">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 16px;">
        <h4>错误提示</h4>
        <hy-alert 
          alertType="error"
          message="错误提示的文案"
          description="错误提示的辅助性文字介绍">
        </hy-alert>
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

提供四种不同类型的提示框，用于向用户传达不同性质的信息。

### 提示类型
- **success**: 成功提示，用于操作成功后的反馈
- **info**: 信息提示，用于中性信息的展示（默认）
- **warning**: 警告提示，用于需要用户关注的提醒
- **error**: 错误提示，用于错误信息的反馈

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| alertType | 指定警告提示的样式 | 'success' \\| 'info' \\| 'warning' \\| 'error' | 'info' |
| message | 警告提示内容 | string \\| TemplateRef<void> | - |
| description | 警告提示的辅助性文字介绍 | string \\| TemplateRef<void> | - |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 成功提示 -->
<hy-alert 
  alertType="success"
  message="操作成功"
  description="您的操作已成功完成">
</hy-alert>

<!-- 信息提示 -->
<hy-alert 
  alertType="info"
  message="提示信息"
  description="这是一条普通的提示信息">
</hy-alert>

<!-- 警告提示 -->
<hy-alert 
  alertType="warning"
  message="注意"
  description="请注意相关事项">
</hy-alert>

<!-- 错误提示 -->
<hy-alert 
  alertType="error"
  message="操作失败"
  description="操作执行失败，请重试">
</hy-alert>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-alert-demo',
  templateUrl: './alert-demo.component.html'
})
export class AlertDemoComponent {
  // 动态设置提示类型和内容
  alertType: 'success' | 'info' | 'warning' | 'error' = 'info';
  message = '动态提示信息';
  description = '这是动态设置的辅助文字';

  // 切换提示类型
  changeAlertType(type: 'success' | 'info' | 'warning' | 'error') {
    this.alertType = type;
    this.message = \`这是\${type}类型的提示\`;
    this.description = \`\${type}状态的详细描述信息\`;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 显示图标
const IconTemplate: Story<HyAlertComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>显示图标</h3>
      <p>可以显示对应类型的图标，使提示更加醒目和易于识别</p>
      
      <div style="margin-bottom: 16px;">
        <h4>带图标的成功提示</h4>
        <hy-alert 
          alertType="success"
          message="成功提示"
          description="显示成功图标的提示信息"
          [showIcon]="true">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 16px;">
        <h4>带图标的信息提示</h4>
        <hy-alert 
          alertType="info"
          message="信息提示"
          description="显示信息图标的提示信息"
          [showIcon]="true">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 16px;">
        <h4>带图标的警告提示</h4>
        <hy-alert 
          alertType="warning"
          message="警告提示"
          description="显示警告图标的提示信息"
          [showIcon]="true">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 16px;">
        <h4>带图标的错误提示</h4>
        <hy-alert 
          alertType="error"
          message="错误提示"
          description="显示错误图标的提示信息"
          [showIcon]="true">
        </hy-alert>
      </div>
    </div>
  `
});

export const withIcon = IconTemplate.bind({});
withIcon.args = {};
withIcon.storyName = '显示图标';
withIcon.parameters = {
  docs: {
    description: {
      story: `
## 显示图标

通过设置 \`showIcon\` 属性，可以在提示框中显示对应类型的图标，增强视觉识别效果。

### 图标类型
- **success**: 显示绿色的勾选图标 ✅
- **info**: 显示蓝色的信息图标 ℹ️
- **warning**: 显示橙色的警告图标 ⚠️
- **error**: 显示红色的错误图标 ❌

### 使用场景
- 重要提示需要醒目展示时
- 表单验证结果反馈
- 操作状态确认
- 系统通知消息

### 配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| showIcon | 是否显示辅助图标 | boolean | false |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 带图标的提示 -->
<hy-alert 
  alertType="success"
  message="操作成功"
  description="您的数据已保存成功"
  [showIcon]="true">
</hy-alert>

<hy-alert 
  alertType="warning"
  message="注意事项"
  description="请确保数据格式正确"
  [showIcon]="true">
</hy-alert>

<hy-alert 
  alertType="error"
  message="验证失败"
  description="用户名或密码错误"
  [showIcon]="true">
</hy-alert>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-alert-demo',
  templateUrl: './icon-alert-demo.component.html'
})
export class IconAlertDemoComponent {
  // 控制是否显示图标
  showIcon = true;

  // 切换图标显示
  toggleIcon() {
    this.showIcon = !this.showIcon;
  }

  // 显示不同类型的图标提示
  showSuccessAlert() {
    // 可以结合实际业务场景使用
    this.alertType = 'success';
    this.message = '保存成功';
    this.description = '您的设置已成功保存';
    this.showIcon = true;
  }

  showErrorAlert() {
    this.alertType = 'error';
    this.message = '操作失败';
    this.description = '网络连接异常，请稍后重试';
    this.showIcon = true;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 可关闭提示
const CloseableTemplate: Story<HyAlertComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>可关闭的提示</h3>
      <p>提供关闭功能，用户可以主动关闭提示信息</p>
      
      <div style="margin-bottom: 16px;">
        <h4>默认关闭按钮</h4>
        <hy-alert 
          alertType="info"
          message="可关闭的提示"
          description="点击右侧 × 按钮关闭此提示"
          [showIcon]="true"
          [closeable]="true"
          (onClickClose)="onClose1($event)">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 16px;">
        <h4>自定义关闭按钮文字</h4>
        <hy-alert 
          alertType="warning"
          message="自定义关闭按钮"
          description="使用自定义文字作为关闭按钮"
          [showIcon]="true"
          closeText="知道了"
          (onClickClose)="onClose2($event)">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 16px;">
        <h4>带确认的关闭</h4>
        <hy-alert 
          alertType="error"
          message="重要提示"
          description="这是一条重要提示，关闭前请确认已阅读"
          [showIcon]="true"
          [closeable]="true"
          (onClickClose)="onCloseWithConfirm($event)">
        </hy-alert>
      </div>
    </div>
  `
});

export const closeable = CloseableTemplate.bind({});
closeable.args = {
  onClose1: (event) => {
    console.log('默认关闭按钮被点击:', event);
    $hyapi.msg.createTips('info', '提示已关闭');
  },
  onClose2: (event) => {
    console.log('自定义关闭按钮被点击:', event);
    $hyapi.msg.createTips('success', '已确认阅读');
  },
  onCloseWithConfirm: (event) => {
    $hyapi.msg.confirm('确定要关闭这条重要提示吗？', {
      callback: () => {
        console.log('用户确认关闭:', event);
        $hyapi.msg.createTips('success', '提示已关闭');
        // 这里可以添加关闭后的业务逻辑  
      },
      cancel: () => {
        console.log('用户取消关闭');
        // 阻止关闭，保持提示显示
        event.preventDefault && event.preventDefault();
      }
    });
  }
};
closeable.storyName = '可关闭提示';
closeable.parameters = {
  docs: {
    description: {
      story: `
## 可关闭提示

用户可以主动关闭的提示框，适用于临时性通知或可选性信息展示。

### 关闭方式

#### 默认关闭按钮
- 设置 \`closeable="true"\` 显示标准的 × 关闭按钮
- 用户点击后触发 \`onClickClose\` 事件

#### 自定义关闭文字
- 设置 \`closeText\` 属性自定义关闭按钮文字
- 可以是字符串或模板引用
- 会覆盖 \`closeable\` 的默认样式

### 关闭事件处理
- 监听 \`(onClickClose)\` 事件处理关闭逻辑
- 可以在关闭前执行确认、保存等操作
- 支持阻止关闭（通过 preventDefault）

### 使用场景
- 系统公告和通知
- 表单验证提示
- 临时性操作指引
- 可忽略的警告信息

### 配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| closeable | 默认不显示关闭按钮 | boolean | false |
| closeText | 自定义关闭按钮文字 | string \\| TemplateRef<void> | - |
| onClickClose | 关闭时触发的回调函数 | EventEmitter | - |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 默认关闭按钮 -->
<hy-alert 
  alertType="info"
  message="可关闭的提示"
  description="点击右侧关闭按钮可以关闭此提示"
  [closeable]="true"
  (onClickClose)="handleClose($event)">
</hy-alert>

<!-- 自定义关闭按钮文字 -->
<hy-alert 
  alertType="warning"
  message="重要通知"
  description="请仔细阅读以下内容"
  closeText="我已阅读"
  (onClickClose)="handleRead($event)">
</hy-alert>

<!-- 带确认的关闭 -->
<hy-alert 
  alertType="error"
  message="系统维护通知"
  description="系统将于今晚进行维护，请提前保存数据"
  [closeable]="true"
  (onClickClose)="handleCloseWithConfirm($event)">
</hy-alert>
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
  selector: 'app-closeable-alert-demo',
  templateUrl: './closeable-alert-demo.component.html'
})
export class CloseableAlertDemoComponent {
  // 控制提示显示状态
  showAlert1 = true;
  showAlert2 = true;
  showAlert3 = true;

  // 处理普通关闭
  handleClose(event: any) {
    console.log('提示被关闭:', event);
    this.showAlert1 = false;
    $hyapi.msg.createTips('info', '提示已关闭');
  }

  // 处理已读确认
  handleRead(event: any) {
    console.log('用户已确认阅读:', event);
    this.showAlert2 = false;
    $hyapi.msg.createTips('success', '感谢您的阅读');
    
    // 可以记录用户已读状态
    this.recordUserReadStatus();
  }

  // 带确认的关闭处理
  handleCloseWithConfirm(event: any) {
    $hyapi.modal.confirm('确定要关闭这条重要通知吗？', {
      content: '关闭后可能会错过重要信息',
      onOk: () => {
        this.showAlert3 = false;
        $hyapi.msg.createTips('success', '通知已关闭');
        console.log('用户确认关闭通知');
      },
      onCancel: () => {
        console.log('用户取消关闭');
        // 不执行关闭操作
      }
    });
  }

  // 重新显示所有提示
  resetAlerts() {
    this.showAlert1 = true;
    this.showAlert2 = true;
    this.showAlert3 = true;
  }

  // 记录用户已读状态
  private recordUserReadStatus() {
    // 实际项目中可以调用API记录用户行为
    console.log('记录用户已读状态到后端');
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 横幅模式
const BannerTemplate: Story<HyAlertComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>横幅模式</h3>
      <p>横幅模式的提示框，通常用作页面顶部的重要通知</p>
      
      <div style="margin-bottom: 24px;">
        <h4>信息横幅</h4>
        <hy-alert 
          alertType="info"
          message="系统升级通知"
          description="我们将在本周末对系统进行升级维护，届时可能会影响部分功能的使用"
          [isBanner]="true"
          [showIcon]="true"
          [closeable]="true">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h4>警告横幅</h4>
        <hy-alert 
          alertType="warning"
          message="重要提醒"
          description="您的账户余额不足，请及时充值以免影响正常使用"
          [isBanner]="true"
          [showIcon]="true"
          closeText="立即充值">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h4>成功横幅</h4>
        <hy-alert 
          alertType="success"
          message="操作成功"
          description="您的数据已成功同步到云端，可以在任意设备上访问"
          [isBanner]="true"
          [showIcon]="true"
          [closeable]="true">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h4>错误横幅</h4>
        <hy-alert 
          alertType="error"
          message="服务异常"
          description="当前服务出现异常，我们正在紧急修复中，请稍后再试"
          [isBanner]="true"
          [showIcon]="true"
          closeText="刷新页面">
        </hy-alert>
      </div>
    </div>
  `
});

export const banner = BannerTemplate.bind({});
banner.args = {};
banner.storyName = '横幅模式';
banner.parameters = {
  docs: {
    description: {
      story: `
## 横幅模式

横幅模式的提示框具有更宽的视觉区域和更突出的展示效果，通常用于页面级别的重要通知。

### 特点
- **全宽布局**: 横向占满容器宽度
- **突出显示**: 视觉效果更加明显
- **顶部定位**: 通常放置在页面或区域顶部
- **重要通知**: 适合系统级别的消息提醒

### 与普通模式的区别

| 特性 | 普通模式 | 横幅模式 |
|------|----------|----------|
| **布局** | 紧凑型布局 | 全宽横幅布局 |
| **视觉权重** | 中等 | 较高 |
| **使用场景** | 局部提示 | 全局通知 |
| **默认样式** | 圆角边框 | 直角边框 |

### 使用场景
- 🌟 **系统公告**: 重要的系统通知和公告
- ⚠️ **安全警告**: 账户安全、权限变更等重要提醒
- 🎉 **活动通知**: 促销活动、新功能发布等
- 🔧 **维护通知**: 系统维护、服务升级等
- 📊 **状态提醒**: 账户状态、服务状态等

### 配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| isBanner | 是否用作顶部公告 | boolean | false |

### 最佳实践
- 横幅提示应该放在页面或容器的顶部
- 内容应该简洁明了，突出重点信息
- 建议配合图标使用，增强识别度
- 重要通知建议设置为可关闭，避免影响用户操作
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 页面顶部的系统通知横幅 -->
<hy-alert 
  alertType="warning"
  message="系统维护通知"
  description="系统将于今晚22:00-06:00进行维护升级，期间部分功能可能无法使用"
  [isBanner]="true"
  [showIcon]="true"
  [closeable]="true">
</hy-alert>

<!-- 成功状态的横幅 -->
<hy-alert 
  alertType="success"
  message="账户升级成功"
  description="恭喜您成功升级为VIP用户，现在可以享受更多专属权益"
  [isBanner]="true"
  [showIcon]="true"
  closeText="查看权益">
</hy-alert>

<!-- 错误状态的横幅 -->
<hy-alert 
  alertType="error"
  message="网络连接异常"
  description="检测到您的网络连接不稳定，可能影响数据同步"
  [isBanner]="true"
  [showIcon]="true"
  closeText="重新连接">
</hy-alert>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';
import { $hyapi } from '@hy/frame';

@Component({
  selector: 'app-banner-alert-demo',
  templateUrl: './banner-alert-demo.component.html'
})
export class BannerAlertDemoComponent implements OnInit {
  // 控制不同横幅的显示状态
  showSystemNotice = true;
  showAccountUpgrade = true;
  showNetworkError = false;

  ngOnInit() {
    // 模拟检测网络状态
    this.checkNetworkStatus();
  }

  // 处理系统通知关闭
  handleSystemNoticeClose() {
    this.showSystemNotice = false;
    $hyapi.msg.createTips('info', '通知已关闭');
    
    // 记录用户已读状态
    this.recordNoticeRead('system_maintenance');
  }

  // 处理账户升级横幅
  handleAccountUpgradeClose() {
    this.showAccountUpgrade = false;
    // 跳转到权益页面
    this.navigateToPrivileges();
  }

  // 处理网络错误横幅
  handleNetworkErrorClose() {
    this.showNetworkError = false;
    // 尝试重新连接
    this.reconnectNetwork();
  }

  // 检测网络状态
  private checkNetworkStatus() {
    // 模拟网络检测
    setTimeout(() => {
      if (!navigator.onLine) {
        this.showNetworkError = true;
      }
    }, 2000);
  }

  // 记录通知已读
  private recordNoticeRead(noticeId: string) {
    console.log(\`记录通知已读: \${noticeId}\`);
    // 实际项目中调用API记录
  }

  // 跳转到权益页面
  private navigateToPrivileges() {
    console.log('跳转到VIP权益页面');
    $hyapi.msg.createTips('success', '正在跳转...');
  }

  // 重新连接网络
  private reconnectNetwork() {
    $hyapi.msg.createTips('info', '正在重新连接...');
    // 执行重连逻辑
    setTimeout(() => {
      $hyapi.msg.createTips('success', '网络连接已恢复');
    }, 2000);
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 仅显示文字（无描述）
const SimpleTemplate: Story<HyAlertComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>简洁模式</h3>
      <p>只显示主要信息，不显示描述文字，适用于简单场景</p>
      
      <div style="margin-bottom: 16px;">
        <h4>简洁的成功提示</h4>
        <hy-alert 
          alertType="success"
          message="保存成功"
          [showIcon]="true">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 16px;">
        <h4>简洁的错误提示</h4>
        <hy-alert 
          alertType="error"
          message="用户名或密码错误"
          [showIcon]="true">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 16px;">
        <h4>简洁的警告提示</h4>
        <hy-alert 
          alertType="warning"
          message="网络连接超时"
          [showIcon]="true"
          [closeable]="true">
        </hy-alert>
      </div>
      
      <div style="margin-bottom: 16px;">
        <h4>简洁的信息提示</h4>
        <hy-alert 
          alertType="info"
          message="数据加载中..."
          [showIcon]="true">
        </hy-alert>
      </div>
    </div>
  `
});

export const simple = SimpleTemplate.bind({});
simple.args = {};
simple.storyName = '简洁模式';
simple.parameters = {
  docs: {
    description: {
      story: `
## 简洁模式

只显示核心提示信息，不显示详细描述，适用于空间有限或信息简单的场景。

### 特点
- **信息精炼**: 只显示最重要的提示内容
- **节省空间**: 占用更少的垂直空间
- **快速阅读**: 用户可以快速获取关键信息
- **简洁美观**: 界面更加清爽简洁

### 使用场景
- 🎯 **表单验证**: 简单的验证错误提示
- ⚡ **操作反馈**: 快速的操作结果反馈
- 📱 **移动端**: 屏幕空间有限的移动设备
- 🎨 **列表项目**: 列表中的状态提示
- 🔔 **状态栏**: 类似状态栏的简短通知

### 与完整模式对比

| 特性 | 简洁模式 | 完整模式 |
|------|----------|----------|
| **信息量** | 单一消息 | 消息+描述 |
| **空间占用** | 较小 | 较大 |
| **适用场景** | 简单提示 | 详细说明 |
| **视觉重量** | 轻量 | 重量 |

### 配置说明
- 只设置 \`message\` 属性，不设置 \`description\`
- 建议配合 \`showIcon\` 使用，增强识别度
- 可以配合 \`closeable\` 提供关闭功能
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 简洁的成功提示 -->
<hy-alert 
  alertType="success"
  message="保存成功"
  [showIcon]="true">
</hy-alert>

<!-- 简洁的错误提示 -->
<hy-alert 
  alertType="error"
  message="网络请求失败"
  [showIcon]="true"
  [closeable]="true">
</hy-alert>

<!-- 简洁的警告提示 -->
<hy-alert 
  alertType="warning"
  message="数据格式不正确"
  [showIcon]="true">
</hy-alert>

<!-- 简洁的信息提示 -->
<hy-alert 
  alertType="info"
  message="正在加载数据..."
  [showIcon]="true">
</hy-alert>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "应用场景",
      template: previewTemplate`
<!-- 表单验证场景 -->
<nz-form>
  <nz-form-item>
    <nz-form-label>用户名</nz-form-label>
    <nz-form-control>
      <input nz-input [(ngModel)]="username" />
      <hy-alert 
        *ngIf="usernameError"
        alertType="error"
        [message]="usernameError"
        [showIcon]="true">
      </hy-alert>
    </nz-form-control>
  </nz-form-item>
</nz-form>

<!-- 列表状态提示 -->
<nz-list [nzDataSource]="dataList">
  <nz-list-item *ngFor="let item of dataList">
    <div>{{item.name}}</div>
    <hy-alert 
      [alertType]="getStatusType(item.status)"
      [message]="getStatusMessage(item.status)"
      [showIcon]="true">
    </hy-alert>
  </nz-list-item>
</nz-list>

<!-- 操作按钮反馈 -->
<button nz-button nzType="primary" (click)="saveData()">
  保存
</button>
<hy-alert 
  *ngIf="saveResult"
  [alertType]="saveResult.type"
  [message]="saveResult.message"
  [showIcon]="true"
  [closeable]="true">
</hy-alert>
      `,
      language: "html",
      copy: true
    }
  ]
};

// 高级用法（自定义模板）
const AdvancedTemplate: Story<HyAlertComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>高级用法</h3>
      <p>支持使用模板自定义消息和描述内容，实现更丰富的展示效果</p>
      
      <div style="margin-bottom: 24px;">
        <h4>自定义消息模板</h4>
        <hy-alert 
          alertType="info"
          [message]="messageTemplate"
          description="这是一个使用自定义模板的消息提示"
          [showIcon]="true"
          [closeable]="true">
        </hy-alert>
        
        <ng-template #messageTemplate>
          <span style="font-weight: bold; color: #1890ff;">
            📢 重要通知：
          </span>
          <span>系统将进行版本更新</span>
        </ng-template>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h4>自定义描述模板</h4>
        <hy-alert 
          alertType="warning"
          message="账户安全提醒"
          [description]="descriptionTemplate"
          [showIcon]="true"
          [closeable]="true">
        </hy-alert>
        
        <ng-template #descriptionTemplate>
          <div>
            <p style="margin: 4px 0;">检测到您的账户存在以下风险:</p>
            <ul style="margin: 8px 0; padding-left: 20px;">
              <li>异地登录记录</li>
              <li>密码强度较低</li>
              <li>未绑定手机号</li>
            </ul>
            <a href="#" style="color: #faad14; text-decoration: underline;">
              立即前往安全中心 →
            </a>
          </div>
        </ng-template>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h4>自定义关闭按钮模板</h4>
        <hy-alert 
          alertType="success"
          message="任务完成通知"
          description="您的数据导出任务已完成，共处理 1,234 条记录"
          [showIcon]="true"
          [closeText]="closeButtonTemplate">
        </hy-alert>
        
        <ng-template #closeButtonTemplate>
          <span style="color: #52c41a; font-weight: bold;">
            📥 下载文件
          </span>
        </ng-template>
      </div>
    </div>
  `
});

export const advanced = AdvancedTemplate.bind({});
advanced.args = {};
advanced.storyName = '高级用法';
advanced.parameters = {
  docs: {
    description: {
      story: `
## 高级用法

通过使用 Angular 的 \`TemplateRef\`，可以自定义消息、描述和关闭按钮的显示内容，实现更加丰富和个性化的提示效果。

### 支持模板的属性

#### message 消息模板
- 自定义主要提示信息的显示方式
- 可以添加图标、链接、格式化文本等
- 适用于需要突出显示的重要信息

#### description 描述模板  
- 自定义详细描述信息的显示方式
- 支持复杂的HTML结构，如列表、链接、按钮等
- 适用于需要展示结构化信息的场景

#### closeText 关闭按钮模板
- 自定义关闭按钮的显示内容
- 可以将关闭按钮改为操作按钮
- 适用于需要引导用户执行特定操作的场景

### 使用场景
- 🎨 **富文本展示**: 需要显示格式化内容时
- 🔗 **交互式提示**: 包含链接、按钮等交互元素
- 📋 **结构化信息**: 显示列表、表格等结构化数据
- 🎯 **个性化定制**: 需要特殊样式和布局的场景
- 📱 **响应式设计**: 根据不同设备调整显示效果

### 模板使用方法
1. 定义 \`ng-template\` 模板
2. 通过模板引用变量传递给组件属性
3. 在模板中编写自定义的HTML结构和样式

### 最佳实践
- 保持模板内容简洁明了，避免过于复杂
- 注意样式的一致性，与整体设计风格保持统一
- 合理使用交互元素，提升用户体验
- 考虑可访问性，确保内容对所有用户友好
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 自定义消息模板 -->
<hy-alert 
  alertType="info"
  [message]="messageTemplate"
  description="使用自定义模板的消息内容"
  [showIcon]="true">
</hy-alert>

<ng-template #messageTemplate>
  <span style="font-weight: bold; color: #1890ff;">
    📢 系统通知：
  </span>
  <span>新版本 v2.0 已发布</span>
  <a href="#" style="margin-left: 8px; color: #1890ff;">
    查看更新日志
  </a>
</ng-template>

<!-- 自定义描述模板 -->
<hy-alert 
  alertType="warning"
  message="安全检查"
  [description]="descriptionTemplate"
  [showIcon]="true">
</hy-alert>

<ng-template #descriptionTemplate>
  <div>
    <p style="margin: 4px 0;">发现以下安全问题：</p>
    <ul style="margin: 8px 0; padding-left: 20px;">
      <li>密码过于简单</li>
      <li>未启用二次验证</li>
    </ul>
    <button nz-button nzType="link" nzSize="small">
      立即修复
    </button>
  </div>
</ng-template>

<!-- 自定义关闭按钮模板 -->
<hy-alert 
  alertType="success"
  message="下载完成"
  description="文件已准备就绪，可以开始下载"
  [closeText]="closeButtonTemplate">
</hy-alert>

<ng-template #closeButtonTemplate>
  <button nz-button nzType="primary" nzSize="small">
    📥 立即下载
  </button>
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
  selector: 'app-advanced-alert-demo',
  templateUrl: './advanced-alert-demo.component.html'
})
export class AdvancedAlertDemoComponent {
  @ViewChild('messageTemplate') messageTemplate!: TemplateRef<any>;
  @ViewChild('descriptionTemplate') descriptionTemplate!: TemplateRef<any>;
  @ViewChild('closeButtonTemplate') closeButtonTemplate!: TemplateRef<any>;

  // 处理消息模板中的链接点击
  handleVersionLink() {
    console.log('查看版本更新日志');
    // 跳转到更新日志页面
  }

  // 处理安全修复按钮点击
  handleSecurityFix() {
    console.log('开始安全修复流程');
    // 跳转到安全设置页面
  }

  // 处理下载按钮点击
  handleDownload() {
    console.log('开始下载文件');
    // 执行下载逻辑
    this.startDownload();
  }

  private startDownload() {
    // 模拟下载过程
    const link = document.createElement('a');
    link.href = '/api/download/file.zip';
    link.download = 'export-data.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "模板技巧",
      template: previewTemplate`
<!-- 技巧1: 动态模板内容 -->
<hy-alert 
  [alertType]="alertData.type"
  [message]="getMessageTemplate(alertData.type)"
  [description]="getDescriptionTemplate(alertData)">
</hy-alert>

<!-- 技巧2: 条件显示模板元素 -->
<ng-template #conditionalTemplate>
  <div>
    <span>{{baseMessage}}</span>
    <strong *ngIf="showImportant" style="color: red;">
      (重要)
    </strong>
    <a *ngIf="showLink" href="{{linkUrl}}" target="_blank">
      了解更多
    </a>
  </div>
</ng-template>

<!-- 技巧3: 响应式模板 -->
<ng-template #responsiveTemplate>
  <div [ngClass]="{
    'mobile-layout': isMobile,
    'desktop-layout': !isMobile
  }">
    <div class="alert-content">
      <span class="alert-title">{{title}}</span>
      <div class="alert-actions" *ngIf="!isMobile">
        <button nz-button nzSize="small">操作1</button>
        <button nz-button nzSize="small">操作2</button>
      </div>
    </div>
    <div class="mobile-actions" *ngIf="isMobile">
      <button nz-button nzBlock>执行操作</button>
    </div>
  </div>
</ng-template>

<!-- 技巧4: 数据绑定模板 -->
<ng-template #dataTemplate let-data="data">
  <div>
    <h4>{{data.title}}</h4>
    <ul>
      <li *ngFor="let item of data.items">
        {{item.name}}: {{item.value}}
      </li>
    </ul>
    <div class="template-footer">
      更新时间: {{data.updateTime | date:'yyyy-MM-dd HH:mm'}}
    </div>
  </div>
</ng-template>

<!-- 技巧5: 嵌套组件模板 -->
<ng-template #componentTemplate>
  <div class="custom-alert-content">
    <nz-statistic 
      [nzValue]="statisticValue" 
      [nzTitle]="statisticTitle">
    </nz-statistic>
    <nz-progress 
      [nzPercent]="progressValue" 
      nzSize="small">
    </nz-progress>
    <div class="action-buttons">
      <button nz-button nzType="primary" nzSize="small">
        查看详情
      </button>
    </div>
  </div>
</ng-template>
      `,
      language: "html",
      copy: true
    }
  ]
};

