import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyReadonlyComponent } from './hy-readonly.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

class MockPricingService implements Partial<ModelService> {
  private $dicCache: any = {};  
  
  constructor(){
    setTimeout(() => {
      if(this['gt_test1']){
        this['gt_test1'].readonly = '内容';
      }
      if(this['gt_test2']){
        this['gt_test2'].readonly = '内容';
      }
      if(this['gt_test3']){
        this['gt_test3'].readonly = ['1','2','3'];
      }
      if(this['gt_test4']){
        this['gt_test4'].week = '1';
        this['gt_test4'].week2 = ['1','2','3'];
      }
      if(this['gt_wrap']){
        this['gt_wrap'].readonly = '是文本内容，这是文本内容，这是文本内容，'
      }
    }, 100);
  }

  pushDic(dic: any) {
    if (dic && dic.name) {
      this.$dicCache[dic.name] = dic.value;
    }
  }
}

const argTypes = unit.createArgTypes('HyReadonlyComponent');
const labelString = unit.createLabel('hy-readonly',argTypes);

export default {
  title: '基础组件/hy-readonly（只读）',
  component: HyReadonlyComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, { provide: ModelService, useClass: MockPricingService }]
    }),
  ],
  argTypes
} as Meta;

// 字典数据展示
const DictionaryTemplate: Story<HyReadonlyComponent> = (args: HyReadonlyComponent) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>字典数据展示</h3>
      <p>通过字典配置自动转换数据显示，适用于状态、类型等枚举值的展示</p>
      
      <hy-form>
        <hy-gt model="test4">
          <h4>值为string类型时</h4>
          <hy-readonly title="状态" dic="dd_testWeek" model="week" cols="24"></hy-readonly>
          <h4>值为string[]类型时</h4>
          <hy-readonly title="状态" dic="dd_testWeek" model="week2" cols="24"></hy-readonly>
        </hy-gt>
      </hy-form>
    </div>
  `
});

export const dictionary = DictionaryTemplate.bind({});
dictionary.storyName = '字典数据';
dictionary.parameters = {
  docs: {
    description: {
      story: `
## 字典数据展示

hy-readonly 组件支持通过字典配置自动转换和显示数据，将原始值转换为用户友好的显示文本。

### 特点
- **自动转换**: 根据字典配置自动将值转换为显示文本
- **多语言支持**: 支持国际化字典配置
- **灵活配置**: 支持多种字典格式和数据结构
- **缓存机制**: 内置字典缓存，提升性能

### 使用场景
- 📊 **状态显示**: 订单状态、审批状态等枚举值展示
- 🏷️ **分类标签**: 商品分类、用户类型等分类信息
- 🌍 **地区信息**: 省市区、国家地区等地理信息
- 👥 **角色权限**: 用户角色、权限级别等权限信息

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| dic | 字典配置键名 | string | - |
| model | 数据模型字段名 | string | - |
| title | 显示标题 | string | - |
| cols | 栅格列数 | number | 24 |
| labelWidth | 标签宽度 | string | 'auto' |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 基础字典数据展示 -->
<hy-form>
  <hy-gt model="dataModel">
    <hy-readonly 
      title="状态"
      dic="dd_bigData"
      model="status"
      cols="24">
    </hy-readonly>
  </hy-gt>
</hy-form>

<!-- 带标签宽度的字典展示 -->
<hy-form>
  <hy-gt model="orderModel">
    <hy-readonly 
      title="订单状态"
      dic="orderStatusDict"
      model="orderStatus"
      labelWidth="100px"
      cols="12">
    </hy-readonly>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';
import { ModelService } from '@hy/frame';

@Component({
  selector: 'app-readonly-dictionary-demo',
  templateUrl: './readonly-dictionary-demo.component.html'
})
export class ReadonlyDictionaryDemoComponent implements OnInit {
  
  constructor(private modelService: ModelService) {}

  ngOnInit() {
    // 初始化数据模型
    this.modelService['dataModel'] = {
      status: '1', // 原始状态值
      orderStatus: 'pending'
    };

    // 配置字典数据
    this.setupDictionaries();
  }

  private setupDictionaries() {
    // 状态字典配置
    this.modelService.setDictionary('statusDict', [
      { key: '0', value: '禁用' },
      { key: '1', value: '启用' },
      { key: '2', value: '待审核' }
    ]);

    // 订单状态字典配置
    this.modelService.setDictionary('orderStatusDict', [
      { key: 'pending', value: '待处理' },
      { key: 'processing', value: '处理中' },
      { key: 'completed', value: '已完成' },
      { key: 'cancelled', value: '已取消' }
    ]);
  }

  // 动态更新数据
  updateStatus(newStatus: string) {
    this.modelService['dataModel'].status = newStatus;
  }

  updateOrderStatus(newStatus: string) {
    this.modelService['dataModel'].orderStatus = newStatus;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 默认数据展示
const DefaultDataTemplate: Story<HyReadonlyComponent> = (args: HyReadonlyComponent) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>默认数据展示</h3>
      <p>显示原始文本数据，支持长文本的展开/收起功能</p>
      
      <hy-form>
        <hy-gt model="test2" flex="300px">
          ${labelString}</hy-readonly>
        </hy-gt>
      </hy-form>
    </div>
  `
});

export const defaultData = DefaultDataTemplate.bind({});
defaultData.args = {
  title: '详细描述',
  cols: 24,
  labelWidth: '120px',
  isShowMore: true,
  model:'readonly'
};
defaultData.storyName = '默认数据';
defaultData.parameters = {
  docs: {
    description: {
      story: `
## 默认数据展示

直接显示原始文本数据，不经过字典转换，适用于描述性文本、备注信息等场景。

### 特点
- **原始显示**: 直接显示数据原值，不进行转换
- **长文本支持**: 自动处理长文本的显示和截断
- **展开收起**: 可配置长文本的展开/收起功能
- **灵活宽度**: 支持固定宽度和自适应宽度

### 长文本处理
- **自动截断**: 超过指定长度的文本会被截断
- **展开功能**: 提供"查看更多"按钮展开完整内容
- **收起功能**: 展开后可以重新收起
- **自定义阈值**: 可配置截断长度

### 使用场景
- 📝 **描述信息**: 商品描述、用户备注等长文本
- 💬 **评论内容**: 用户评论、反馈信息
- 📄 **详细说明**: 操作说明、使用指南等
- 🏷️ **标题展示**: 文章标题、任务标题等

### 配置属性
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| isShowMore | 是否显示展开/收起功能 | boolean | false |
| model | 数据模型字段名 | string | - |
| title | 显示标题 | string | - |
| flex | 固定宽度设置 | string | - |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 基础文本展示 -->
<hy-form>
  <hy-gt model="articleModel">
    <hy-readonly 
      title="文章标题"
      model="title"
      cols="24">
    </hy-readonly>
  </hy-gt>
</hy-form>

<!-- 长文本带展开功能 -->
<hy-form>
  <hy-gt model="articleModel" flex="400px">
    <hy-readonly 
      title="文章摘要"
      model="summary"
      [isShowMore]="true"
      cols="24">
    </hy-readonly>
  </hy-gt>
</hy-form>

<!-- 固定宽度的描述信息 -->
<hy-form>
  <hy-gt model="productModel" flex="300px">
    <hy-readonly 
      title="商品描述"
      model="description"
      [isShowMore]="true"
      labelWidth="100px"
      cols="24">
    </hy-readonly>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';
import { ModelService } from '@hy/frame';

@Component({
  selector: 'app-readonly-default-demo',
  templateUrl: './readonly-default-demo.component.html'
})
export class ReadonlyDefaultDemoComponent implements OnInit {

  constructor(private modelService: ModelService) {}

  ngOnInit() {
    this.setupTextModels();
  }

  private setupTextModels() {
    // 文章数据模型
    this.modelService['articleModel'] = {
      title: 'Angular开发实践指南',
      summary: '本文详细介绍了Angular框架在实际项目开发中的最佳实践，包括组件设计模式、状态管理、性能优化、测试策略等多个方面的内容。通过具体的代码示例和实战经验，帮助开发者更好地掌握Angular开发技巧。'
    };

    // 商品数据模型
    this.modelService['productModel'] = {
      description: '这是一款高性能的智能手机，配备了最新的处理器和先进的摄像系统。支持5G网络，续航能力强，拍照效果出色。适合商务人士和摄影爱好者使用。产品经过严格的质量检测，提供完善的售后服务保障。'
    };

    // 用户信息数据模型
    this.modelService['userModel'] = {
      bio: '资深前端开发工程师，专注于Web技术发展，熟练掌握Angular、React、Vue等主流框架。'
    };
  }

  // 动态更新文本内容
  updateArticleTitle(newTitle: string) {
    this.modelService['articleModel'].title = newTitle;
  }

  updateSummary(newSummary: string) {
    this.modelService['articleModel'].summary = newSummary;
  }

  // 获取文本长度
  getTextLength(modelName: string, fieldName: string): number {
    return this.modelService[modelName]?.[fieldName]?.length || 0;
  }

  // 检查是否为长文本
  isLongText(modelName: string, fieldName: string, threshold: number = 50): boolean {
    return this.getTextLength(modelName, fieldName) > threshold;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 可复制模式
const CopyableTemplate: Story<HyReadonlyComponent> = (args: HyReadonlyComponent) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>可复制模式</h3>
      <p>提供复制功能，用户可以一键复制显示的内容到剪贴板</p>
      
      <hy-form>
        <hy-gt model="test2">
          <hy-readonly title="API密钥" [isShowCopy]="true" model="readonly"></hy-readonly>
        </hy-gt>
      </hy-form>
    </div>
  `
});

export const copyable = CopyableTemplate.bind({});
copyable.args = {
  title: 'API密钥',
  cols: 24,
  labelWidth: '120px',
  isShowCopy: true,
  model:'readonly'
};
copyable.storyName = '可复制模式';
copyable.parameters = {
  docs: {
    description: {
      story: `
## 可复制模式

为只读组件添加复制功能，用户可以一键将显示内容复制到剪贴板，提升用户体验。

### 特点
- **一键复制**: 点击复制按钮即可复制内容
- **视觉反馈**: 复制成功后提供视觉反馈
- **自动选择**: 自动选择要复制的内容
- **兼容性好**: 支持各种浏览器环境

### 复制行为
- **完整复制**: 复制显示的完整内容
- **格式保留**: 保持原有的文本格式
- **去除样式**: 复制纯文本，去除HTML样式
- **错误处理**: 复制失败时提供友好提示

### 使用场景
- 🔑 **密钥信息**: API密钥、Token等敏感信息
- 📧 **联系方式**: 邮箱地址、电话号码等联系信息
- 🔗 **链接地址**: URL链接、文件路径等地址信息
- 📝 **代码片段**: 配置信息、命令行等代码内容
- 🏷️ **标识符**: 订单号、用户ID等标识信息

### 配置属性
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| isShowCopy | 是否显示复制按钮 | boolean | false |
| model | 要复制的数据字段 | string | - |
| title | 字段标题 | string | - |

### 最佳实践
- 在需要用户复制的信息旁边启用复制功能
- 为复制按钮提供清晰的视觉标识
- 复制成功后给出明确的反馈提示
- 对于敏感信息，考虑添加权限控制
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- API密钥复制 -->
<hy-form>
  <hy-gt model="apiModel">
    <hy-readonly 
      title="API密钥"
      model="apiKey"
      [isShowCopy]="true"
      cols="24">
    </hy-readonly>
  </hy-gt>
</hy-form>

<!-- 联系方式复制 -->
<hy-form>
  <hy-gt model="contactModel">
    <hy-readonly 
      title="邮箱地址"
      model="email"
      [isShowCopy]="true"
      labelWidth="100px"
      cols="12">
    </hy-readonly>
    
    <hy-readonly 
      title="电话号码"
      model="phone"
      [isShowCopy]="true"
      labelWidth="100px"
      cols="12">
    </hy-readonly>
  </hy-gt>
</hy-form>

<!-- 订单信息复制 -->
<hy-form>
  <hy-gt model="orderModel">
    <hy-readonly 
      title="订单编号"
      model="orderNo"
      [isShowCopy]="true"
      cols="24">
    </hy-readonly>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';
import { ModelService, $hyapi } from '@hy/frame';

@Component({
  selector: 'app-readonly-copyable-demo',
  templateUrl: './readonly-copyable-demo.component.html'
})
export class ReadonlyCopyableDemoComponent implements OnInit {

  constructor(private modelService: ModelService) {}

  ngOnInit() {
    this.setupCopyableModels();
  }

  private setupCopyableModels() {
    // API密钥模型
    this.modelService['apiModel'] = {
      apiKey: 'sk-abc123def456ghi789jkl012mno345pqr678'
    };

    // 联系方式模型
    this.modelService['contactModel'] = {
      email: 'user@example.com',
      phone: '+86 138-0000-0000'
    };

    // 订单信息模型
    this.modelService['orderModel'] = {
      orderNo: 'ORD-2024-001234567890'
    };
  }

  // 生成新的API密钥
  generateNewApiKey() {
    const newKey = this.generateRandomKey();
    this.modelService['apiModel'].apiKey = newKey;
    $hyapi.msg.createTips('success', '新API密钥已生成');
  }

  // 更新联系方式
  updateContactInfo(field: string, value: string) {
    this.modelService['contactModel'][field] = value;
    $hyapi.msg.createTips('info', '联系方式已更新');
  }

  // 刷新订单编号
  refreshOrderNo() {
    const timestamp = Date.now();
    this.modelService['orderModel'].orderNo = \`ORD-2024-\${timestamp}\`;
    $hyapi.msg.createTips('success', '订单编号已刷新');
  }

  // 生成随机密钥
  private generateRandomKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'sk-';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // 监听复制事件（如果组件支持自定义复制事件）
  onCopySuccess(field: string) {
    $hyapi.msg.createTips('success', \`\${field}已复制到剪贴板\`);
    console.log(\`\${field} copied successfully\`);
  }

  onCopyError(field: string) {
    $hyapi.msg.createTips('error', \`复制\${field}失败，请手动复制\`);
    console.error(\`Failed to copy \${field}\`);
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "复制功能实现",
      template: previewTemplate`
// 如果需要自定义复制功能的实现
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopyService {

  // 复制文本到剪贴板
  async copyToClipboard(text: string): Promise<boolean> {
    try {
      // 现代浏览器使用 Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // 降级方案：使用传统的 execCommand
        return this.fallbackCopyTextToClipboard(text);
      }
    } catch (error) {
      console.error('复制失败:', error);
      return false;
    }
  }

  // 降级复制方案
  private fallbackCopyTextToClipboard(text: string): boolean {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // 避免在页面中显示
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      return successful;
    } catch (error) {
      console.error('降级复制方案失败:', error);
      return false;
    }
  }

  // 复制带格式的内容
  async copyRichText(html: string, text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        const clipboardItem = new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([text], { type: 'text/plain' })
        });
        await navigator.clipboard.write([clipboardItem]);
        return true;
      } else {
        // 降级到纯文本复制
        return this.fallbackCopyTextToClipboard(text);
      }
    } catch (error) {
      console.error('富文本复制失败:', error);
      return this.fallbackCopyTextToClipboard(text);
    }
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 自定义模板
const CustomTemplateTemplate: Story<HyReadonlyComponent> = (args: HyReadonlyComponent) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>自定义模板</h3>
      <p>支持在文字后方添加自定义模板，可以放置按钮、链接等交互元素</p>
      
      <hy-form>
        <hy-gt model="test2">
          <hy-readonly 
            title="用户状态" 
            cols="24" 
            model="readonly" 
            [textAfterTemplate]="textAfterTemplate" 
            [isShowCopy]="false">
          </hy-readonly>
        </hy-gt>
        
        <ng-template #textAfterTemplate>
          <hy-button title="修改状态" type="link" style="margin-left: 8px;"></hy-button>
          <hy-button title="查看详情" type="link" style="margin-left: 8px;"></hy-button>
        </ng-template>
      </hy-form>
    </div>
  `
});

export const customTemplate = CustomTemplateTemplate.bind({});
customTemplate.args = {
  title: '用户状态',
  cols: 24,
  labelWidth: '120px',
  isShowCopy: false,
  model:'readonly'
};
customTemplate.storyName = '自定义模板';
customTemplate.parameters = {
  docs: {
    description: {
      story: `
## 自定义模板

通过 \`textAfterTemplate\` 属性可以在只读文本后方添加自定义模板内容，实现更丰富的交互功能。

### 特点
- **灵活扩展**: 可以添加任意Angular模板内容
- **位置固定**: 模板内容始终显示在文本后方
- **样式自由**: 完全控制自定义内容的样式和布局
- **交互增强**: 可以添加按钮、链接等交互元素

### 模板内容类型
- **操作按钮**: 编辑、删除、查看等操作按钮
- **状态指示**: 图标、徽章等状态指示器
- **快捷链接**: 相关页面的快捷链接
- **下拉菜单**: 更多操作的下拉菜单
- **工具提示**: 说明信息的工具提示

### 使用场景
- 📝 **数据编辑**: 在只读数据旁边提供编辑入口
- 🔍 **详情查看**: 提供查看详细信息的快捷方式
- ⚙️ **快捷操作**: 常用操作的快捷按钮
- 📊 **状态管理**: 状态切换和管理操作
- 🔗 **关联跳转**: 跳转到相关页面或模块

### 配置属性
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| textAfterTemplate | 文字后方的自定义模板 | TemplateRef<any> | - |

### 最佳实践
- 保持自定义内容简洁，避免过于复杂
- 与整体设计风格保持一致
- 考虑响应式布局，确保在不同屏幕尺寸下正常显示
- 合理使用间距，保持视觉平衡
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 基础自定义模板 -->
<hy-form>
  <hy-gt model="userModel">
    <hy-readonly 
      title="用户名"
      model="username"
      [textAfterTemplate]="usernameTemplate">
    </hy-readonly>
  </hy-gt>
  
  <ng-template #usernameTemplate>
    <hy-button title="编辑" type="link" size="small" style="margin-left: 8px;"></hy-button>
  </ng-template>
</hy-form>

<!-- 多按钮操作模板 -->
<hy-form>
  <hy-gt model="orderModel">
    <hy-readonly 
      title="订单状态"
      model="status"
      dic="orderStatusDict"
      [textAfterTemplate]="orderActionsTemplate">
    </hy-readonly>
  </hy-gt>
  
  <ng-template #orderActionsTemplate>
    <nz-space nzSize="small" style="margin-left: 12px;">
      <button *nzSpaceItem nz-button nzType="link" nzSize="small">
        查看详情
      </button>
      <button *nzSpaceItem nz-button nzType="link" nzSize="small">
        修改状态
      </button>
      <nz-dropdown [nzTrigger]="'click'">
        <button *nzSpaceItem nz-button nzType="link" nzSize="small" nz-dropdown>
          更多操作 <i nz-icon nzType="down"></i>
        </button>
        <ul nz-menu nz-dropdown-menu>
          <li nz-menu-item>导出订单</li>
          <li nz-menu-item>发送邮件</li>
          <li nz-menu-item nzDanger>取消订单</li>
        </ul>
      </nz-dropdown>
    </nz-space>
  </ng-template>
</hy-form>

<!-- 状态指示器模板 -->
<hy-form>
  <hy-gt model="systemModel">
    <hy-readonly 
      title="服务状态"
      model="serviceStatus"
      [textAfterTemplate]="statusIndicatorTemplate">
    </hy-readonly>
  </hy-gt>
  
  <ng-template #statusIndicatorTemplate>
    <nz-badge 
      [nzStatus]="getStatusBadge(systemModel.serviceStatus)" 
      [nzText]="getStatusText(systemModel.serviceStatus)"
      style="margin-left: 12px;">
    </nz-badge>
    <button nz-button nzType="link" nzSize="small" style="margin-left: 8px;">
      刷新状态
    </button>
  </ng-template>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModelService, $hyapi } from '@hy/frame';

@Component({
  selector: 'app-readonly-template-demo',
  templateUrl: './readonly-template-demo.component.html'
})
export class ReadonlyTemplateDemoComponent implements OnInit {
  @ViewChild('usernameTemplate', { static: true }) usernameTemplate!: TemplateRef<any>;
  @ViewChild('orderActionsTemplate', { static: true }) orderActionsTemplate!: TemplateRef<any>;
  @ViewChild('statusIndicatorTemplate', { static: true }) statusIndicatorTemplate!: TemplateRef<any>;

  constructor(private modelService: ModelService) {}

  ngOnInit() {
    this.setupModels();
    this.setupDictionaries();
  }

  private setupModels() {
    // 用户模型
    this.modelService['userModel'] = {
      username: 'admin',
      email: 'admin@example.com'
    };

    // 订单模型
    this.modelService['orderModel'] = {
      orderNo: 'ORD-20240101-001',
      status: 'processing'
    };

    // 系统模型
    this.modelService['systemModel'] = {
      serviceStatus: 'running'
    };
  }

  private setupDictionaries() {
    // 订单状态字典
    this.modelService.setDictionary('orderStatusDict', [
      { key: 'pending', value: '待处理' },
      { key: 'processing', value: '处理中' },
      { key: 'completed', value: '已完成' },
      { key: 'cancelled', value: '已取消' }
    ]);
  }

  // 编辑用户名
  editUsername() {
    $hyapi.modal.prompt('请输入新的用户名', {
      initialValue: this.modelService['userModel'].username,
      callback: (newUsername: string) => {
        if (newUsername && newUsername.trim()) {
          this.modelService['userModel'].username = newUsername.trim();
          $hyapi.msg.createTips('success', '用户名已更新');
        }
      }
    });
  }

  // 查看订单详情
  viewOrderDetail() {
    const orderNo = this.modelService['orderModel'].orderNo;
    console.log(\`查看订单详情: \${orderNo}\`);
    $hyapi.msg.createTips('info', \`正在加载订单 \${orderNo} 的详情...\`);
    // 实际项目中可以跳转到详情页面
  }

  // 修改订单状态
  changeOrderStatus() {
    const currentStatus = this.modelService['orderModel'].status;
    const statusOptions = [
      { key: 'pending', value: '待处理' },
      { key: 'processing', value: '处理中' },
      { key: 'completed', value: '已完成' },
      { key: 'cancelled', value: '已取消' }
    ];

    // 这里可以弹出状态选择对话框
    $hyapi.modal.select('选择新状态', {
      options: statusOptions,
      currentValue: currentStatus,
      callback: (newStatus: string) => {
        this.modelService['orderModel'].status = newStatus;
        $hyapi.msg.createTips('success', '订单状态已更新');
      }
    });
  }

  // 获取状态徽章类型
  getStatusBadge(status: string): string {
    const badgeMap = {
      'running': 'success',
      'stopped': 'error',
      'warning': 'warning',
      'unknown': 'default'
    };
    return badgeMap[status] || 'default';
  }

  // 获取状态文本
  getStatusText(status: string): string {
    const textMap = {
      'running': '运行中',
      'stopped': '已停止',
      'warning': '告警',
      'unknown': '未知'
    };
    return textMap[status] || '未知状态';
  }

  // 刷新服务状态
  refreshServiceStatus() {
    $hyapi.msg.createTips('info', '正在刷新服务状态...');
    
    // 模拟状态检查
    setTimeout(() => {
      const statuses = ['running', 'stopped', 'warning'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      this.modelService['systemModel'].serviceStatus = randomStatus;
      $hyapi.msg.createTips('success', '服务状态已刷新');
    }, 1000);
  }

  // 导出订单
  exportOrder() {
    const orderNo = this.modelService['orderModel'].orderNo;
    console.log(\`导出订单: \${orderNo}\`);
    $hyapi.msg.createTips('success', '订单导出已开始');
  }

  // 发送邮件
  sendEmail() {
    const orderNo = this.modelService['orderModel'].orderNo;
    console.log(\`发送订单邮件: \${orderNo}\`);
    $hyapi.msg.createTips('success', '邮件发送成功');
  }

  // 取消订单
  cancelOrder() {
    $hyapi.modal.confirm('确定要取消这个订单吗？', {
      content: '取消后无法恢复',
      callback: () => {
        this.modelService['orderModel'].status = 'cancelled';
        $hyapi.msg.createTips('success', '订单已取消');
      }
    });
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 换行模式
const WrapModeTemplate: Story<HyReadonlyComponent> = (args: HyReadonlyComponent) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>换行模式</h3>
      <p>控制文本的换行显示方式，适用于不同长度的内容展示</p>
      
      <hy-form>
        <hy-gt model="wrap" cols="24">
          <div style="margin-bottom: 16px;">
            <h4>启用换行模式</h4>
            <hy-readonly 
              [isWrap]="true" 
              model="readonly" 
              title="多选标签" 
              [isShowMore]="true">
            </hy-readonly>
          </div>
          
          <div style="margin-bottom: 16px;">
            <h4>默认模式（不换行）</h4>
            <hy-readonly 
              model="readonly" 
              [isShowMore]="true"
              [isShowCopy]="true"
              title="多选标签" >
            </hy-readonly>
          </div>
        </hy-gt>
      </hy-form>
    </div>
  `
});
export const wrapMode = WrapModeTemplate.bind({});
wrapMode.args = {
  title: '换行展示',
  cols: 24,
  labelWidth: '120px',
  isShowCopy: true,
  model:'readonly'
};
wrapMode.storyName = '换行模式';
wrapMode.parameters = {
  docs: {
    description: {
      story: `
## 换行模式

控制只读组件中文本内容的换行行为，提供更灵活的布局选择。

### 换行模式对比

#### 启用换行 (isWrap="true")
- **自动换行**: 内容超出容器宽度时自动换行
- **完整显示**: 确保所有内容都能完整显示
- **垂直展开**: 占用更多垂直空间
- **适合长文本**: 特别适合描述性文本和多行内容

#### 默认模式 (isWrap="false")
- **单行显示**: 内容在单行内显示
- **超出截断**: 超出部分可能被截断或隐藏
- **节省空间**: 占用固定的垂直空间
- **适合短文本**: 适合标题、标签等简短内容

### 使用场景

#### 适合启用换行的场景
- 📝 **长文本描述**: 商品描述、用户简介等
- 🏷️ **多标签展示**: 大量标签或分类信息
- 📋 **地址信息**: 详细地址、联系方式等
- 💬 **评论内容**: 用户评论、反馈信息

#### 适合默认模式的场景
- 🏷️ **简短标签**: 状态、类型等简短信息
- 📊 **数据展示**: 数字、代码等固定格式数据
- 🔍 **列表项**: 表格或列表中的简短信息
- 📱 **移动端**: 屏幕空间有限的移动设备

### 配置属性
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| isWrap | 是否启用换行模式 | boolean | false |
| isShowMore | 是否显示展开/收起功能 | boolean | false |

### 最佳实践
- 根据内容长度选择合适的换行模式
- 长文本建议配合 \`isShowMore\` 使用
- 考虑响应式设计，不同屏幕尺寸下的表现
- 保持页面布局的一致性和美观性
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 长文本换行模式 -->
<hy-form>
  <hy-gt model="articleModel" cols="24">
    <hy-readonly 
      title="文章摘要"
      model="summary"
      [isWrap]="true"
      [isShowMore]="true">
    </hy-readonly>
  </hy-gt>
</hy-form>

<!-- 多标签换行显示 -->
<hy-form>
  <hy-gt model="tagModel" cols="24">
    <hy-readonly 
      title="标签列表"
      model="tags"
      dic="tagDict"
      separator=", "
      [isWrap]="true">
    </hy-readonly>
  </hy-gt>
</hy-form>

<!-- 地址信息换行 -->
<hy-form>
  <hy-gt model="addressModel" cols="24">
    <hy-readonly 
      title="详细地址"
      model="fullAddress"
      [isWrap]="true"
      labelWidth="100px">
    </hy-readonly>
  </hy-gt>
</hy-form>

<!-- 对比显示：换行 vs 不换行 -->
<div style="display: flex; gap: 20px;">
  <div style="flex: 1;">
    <h4>启用换行</h4>
    <hy-form>
      <hy-gt model="compareModel">
        <hy-readonly 
          title="内容"
          model="longText"
          [isWrap]="true">
        </hy-readonly>
      </hy-gt>
    </hy-form>
  </div>
  
  <div style="flex: 1;">
    <h4>默认模式</h4>
    <hy-form>
      <hy-gt model="compareModel">
        <hy-readonly 
          title="内容"
          model="longText"
          [isWrap]="false">
        </hy-readonly>
      </hy-gt>
    </hy-form>
  </div>
</div>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';
import { ModelService } from '@hy/frame';

@Component({
  selector: 'app-readonly-wrap-demo',
  templateUrl: './readonly-wrap-demo.component.html'
})
export class ReadonlyWrapDemoComponent implements OnInit {

  constructor(private modelService: ModelService) {}

  ngOnInit() {
    this.setupWrapModels();
    this.setupDictionaries();
  }

  private setupWrapModels() {
    // 文章模型
    this.modelService['articleModel'] = {
      title: 'Angular组件开发指南',
      summary: '本文详细介绍了Angular组件的开发流程，包括组件设计原则、生命周期管理、数据绑定技巧、事件处理方式、样式封装策略等核心概念。通过实际案例和最佳实践，帮助开发者掌握高质量Angular组件的开发技能。'
    };

    // 标签模型
    this.modelService['tagModel'] = {
      tags: ['angular', 'typescript', 'frontend', 'component', 'web-development', 'spa', 'framework', 'javascript', 'html', 'css', 'responsive-design', 'user-interface']
    };

    // 地址模型
    this.modelService['addressModel'] = {
      fullAddress: '北京市朝阳区建国门外大街1号国贸大厦A座18层1801室（邮编：100020）'
    };

    // 对比模型
    this.modelService['compareModel'] = {
      longText: '这是一段很长的文本内容，用来演示换行模式和默认模式的区别。在换行模式下，文本会自动换行显示完整内容；在默认模式下，文本会在单行内显示，超出部分可能被截断。'
    };
  }

  private setupDictionaries() {
    // 标签字典
    this.modelService.setDictionary('tagDict', [
      { key: 'angular', value: 'Angular框架' },
      { key: 'typescript', value: 'TypeScript' },
      { key: 'frontend', value: '前端开发' },
      { key: 'component', value: '组件开发' },
      { key: 'web-development', value: 'Web开发' },
      { key: 'spa', value: '单页应用' },
      { key: 'framework', value: '开发框架' },
      { key: 'javascript', value: 'JavaScript' },
      { key: 'html', value: 'HTML' },
      { key: 'css', value: 'CSS' },
      { key: 'responsive-design', value: '响应式设计' },
      { key: 'user-interface', value: '用户界面' }
    ]);
  }

  // 切换换行模式
  toggleWrapMode(modelName: string, isWrap: boolean) {
    // 这里可以动态控制换行模式
    console.log(\`切换 \${modelName} 的换行模式为: \${isWrap}\`);
  }

  // 添加新标签
  addTag(newTag: string) {
    if (newTag && !this.modelService['tagModel'].tags.includes(newTag)) {
      this.modelService['tagModel'].tags.push(newTag);
      this.modelService['tagModel'] = {...this.modelService['tagModel']};
    }
  }

  // 移除标签
  removeTag(tagToRemove: string) {
    const index = this.modelService['tagModel'].tags.indexOf(tagToRemove);
    if (index > -1) {
      this.modelService['tagModel'].tags.splice(index, 1);
      this.modelService['tagModel'] = {...this.modelService['tagModel']};
    }
  }

  // 更新文章摘要
  updateSummary(newSummary: string) {
    this.modelService['articleModel'].summary = newSummary;
  }

  // 更新地址信息
  updateAddress(newAddress: string) {
    this.modelService['addressModel'].fullAddress = newAddress;
  }

  // 检查文本长度
  getTextLength(modelName: string, fieldName: string): number {
    return this.modelService[modelName]?.[fieldName]?.length || 0;
  }

  // 检查是否为长文本
  isLongText(modelName: string, fieldName: string, threshold: number = 100): boolean {
    return this.getTextLength(modelName, fieldName) > threshold;
  }

  // 获取文本预览（用于展示截断效果）
  getTextPreview(modelName: string, fieldName: string, maxLength: number = 50): string {
    const text = this.modelService[modelName]?.[fieldName] || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "样式配置",
      template: previewTemplate`
/* 换行模式相关样式 */
.readonly-wrap-demo {
  .demo-container {
    padding: 16px;
  }

  /* 换行模式容器 */
  .hy-readonly.wrap-mode {
    .readonly-content {
      white-space: normal;
      word-wrap: break-word;
      word-break: break-all;
      line-height: 1.5;
    }
  }

  /* 默认模式容器 */
  .hy-readonly.normal-mode {
    .readonly-content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* 对比展示区域 */
  .comparison-container {
    display: flex;
    gap: 20px;
    margin-top: 16px;
    
    .comparison-item {
      flex: 1;
      padding: 12px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      
      h4 {
        margin: 0 0 8px 0;
        color: #262626;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }

  /* 长文本换行样式 */
  .long-text-wrap {
    max-width: 100%;
    word-wrap: break-word;
    line-height: 1.6;
    color: #595959;
  }

  /* 标签列表换行样式 */
  .tag-list-wrap {
    .tag-item {
      display: inline-block;
      margin: 2px 4px 2px 0;
      padding: 2px 8px;
      background: #f0f0f0;
      border-radius: 4px;
      font-size: 12px;
      color: #666;
    }
  }

  /* 地址信息换行样式 */
  .address-wrap {
    line-height: 1.5;
    color: #595959;
    
    .address-part {
      display: block;
      margin-bottom: 2px;
    }
  }

  /* 响应式换行 */
  @media (max-width: 768px) {
    .hy-readonly {
      .readonly-content {
        font-size: 13px;
        line-height: 1.4;
      }
    }
    
    .comparison-container {
      flex-direction: column;
      gap: 12px;
    }
  }
}

/* 工具类 */
.text-wrap {
  white-space: normal !important;
  word-wrap: break-word !important;
}

.text-nowrap {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.text-break {
  word-break: break-all !important;
}

.text-break-word {
  word-break: break-word !important;
}
      `,
      language: "css",
      copy: true
    }
  ]
};

// 映射模式
const MapModeTemplate: Story<HyReadonlyComponent> = (args: HyReadonlyComponent) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>映射模式</h3>
      <p>映射模式优先级高于model模式，使用映射模式后可以不传入model</p>
      
      <hy-form>
        <hy-gt model="wrap" cols="24">
          <div style="margin-bottom: 16px;">
            <h4>映射模式</h4>
            <hy-readonly 
              dic="testWeek" 
              title="多选标签" 
              [isShowMore]="true">
              这是文本内容，点击<hy-button type="link" title="查看更多"></hy-button>
            </hy-readonly>
          </div>
        </hy-gt>
      </hy-form>
    </div>
  `
});
export const mapMode = MapModeTemplate.bind({});
mapMode.args = {
  title: '换行展示',
  cols: 24,
  labelWidth: '120px',
  isShowCopy: true,
  model:'readonly'
};
mapMode.storyName = '映射模式';
mapMode.parameters = {
  docs: {
    description: {
      story: `
## 换行模式

控制只读组件中文本内容的换行行为，提供更灵活的布局选择。

### 换行模式对比

#### 启用换行 (isWrap="true")
- **自动换行**: 内容超出容器宽度时自动换行
- **完整显示**: 确保所有内容都能完整显示
- **垂直展开**: 占用更多垂直空间
- **适合长文本**: 特别适合描述性文本和多行内容

#### 默认模式 (isWrap="false")
- **单行显示**: 内容在单行内显示
- **超出截断**: 超出部分可能被截断或隐藏
- **节省空间**: 占用固定的垂直空间
- **适合短文本**: 适合标题、标签等简短内容

### 使用场景

#### 适合启用换行的场景
- 📝 **长文本描述**: 商品描述、用户简介等
- 🏷️ **多标签展示**: 大量标签或分类信息
- 📋 **地址信息**: 详细地址、联系方式等
- 💬 **评论内容**: 用户评论、反馈信息

#### 适合默认模式的场景
- 🏷️ **简短标签**: 状态、类型等简短信息
- 📊 **数据展示**: 数字、代码等固定格式数据
- 🔍 **列表项**: 表格或列表中的简短信息
- 📱 **移动端**: 屏幕空间有限的移动设备

### 配置属性
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| isWrap | 是否启用换行模式 | boolean | false |
| isShowMore | 是否显示展开/收起功能 | boolean | false |

### 最佳实践
- 根据内容长度选择合适的换行模式
- 长文本建议配合 \`isShowMore\` 使用
- 考虑响应式设计，不同屏幕尺寸下的表现
- 保持页面布局的一致性和美观性
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 长文本换行模式 -->
<hy-form>
  <hy-gt model="articleModel" cols="24">
    <hy-readonly 
      title="文章摘要"
      model="summary"
      [isWrap]="true"
      [isShowMore]="true">
    </hy-readonly>
  </hy-gt>
</hy-form>

<!-- 多标签换行显示 -->
<hy-form>
  <hy-gt model="tagModel" cols="24">
    <hy-readonly 
      title="标签列表"
      model="tags"
      dic="tagDict"
      separator=", "
      [isWrap]="true">
    </hy-readonly>
  </hy-gt>
</hy-form>

<!-- 地址信息换行 -->
<hy-form>
  <hy-gt model="addressModel" cols="24">
    <hy-readonly 
      title="详细地址"
      model="fullAddress"
      [isWrap]="true"
      labelWidth="100px">
    </hy-readonly>
  </hy-gt>
</hy-form>

<!-- 对比显示：换行 vs 不换行 -->
<div style="display: flex; gap: 20px;">
  <div style="flex: 1;">
    <h4>启用换行</h4>
    <hy-form>
      <hy-gt model="compareModel">
        <hy-readonly 
          title="内容"
          model="longText"
          [isWrap]="true">
        </hy-readonly>
      </hy-gt>
    </hy-form>
  </div>
  
  <div style="flex: 1;">
    <h4>默认模式</h4>
    <hy-form>
      <hy-gt model="compareModel">
        <hy-readonly 
          title="内容"
          model="longText"
          [isWrap]="false">
        </hy-readonly>
      </hy-gt>
    </hy-form>
  </div>
</div>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';
import { ModelService } from '@hy/frame';

@Component({
  selector: 'app-readonly-wrap-demo',
  templateUrl: './readonly-wrap-demo.component.html'
})
export class ReadonlyWrapDemoComponent implements OnInit {

  constructor(private modelService: ModelService) {}

  ngOnInit() {
    this.setupWrapModels();
    this.setupDictionaries();
  }

  private setupWrapModels() {
    // 文章模型
    this.modelService['articleModel'] = {
      title: 'Angular组件开发指南',
      summary: '本文详细介绍了Angular组件的开发流程，包括组件设计原则、生命周期管理、数据绑定技巧、事件处理方式、样式封装策略等核心概念。通过实际案例和最佳实践，帮助开发者掌握高质量Angular组件的开发技能。'
    };

    // 标签模型
    this.modelService['tagModel'] = {
      tags: ['angular', 'typescript', 'frontend', 'component', 'web-development', 'spa', 'framework', 'javascript', 'html', 'css', 'responsive-design', 'user-interface']
    };

    // 地址模型
    this.modelService['addressModel'] = {
      fullAddress: '北京市朝阳区建国门外大街1号国贸大厦A座18层1801室（邮编：100020）'
    };

    // 对比模型
    this.modelService['compareModel'] = {
      longText: '这是一段很长的文本内容，用来演示换行模式和默认模式的区别。在换行模式下，文本会自动换行显示完整内容；在默认模式下，文本会在单行内显示，超出部分可能被截断。'
    };
  }

  private setupDictionaries() {
    // 标签字典
    this.modelService.setDictionary('tagDict', [
      { key: 'angular', value: 'Angular框架' },
      { key: 'typescript', value: 'TypeScript' },
      { key: 'frontend', value: '前端开发' },
      { key: 'component', value: '组件开发' },
      { key: 'web-development', value: 'Web开发' },
      { key: 'spa', value: '单页应用' },
      { key: 'framework', value: '开发框架' },
      { key: 'javascript', value: 'JavaScript' },
      { key: 'html', value: 'HTML' },
      { key: 'css', value: 'CSS' },
      { key: 'responsive-design', value: '响应式设计' },
      { key: 'user-interface', value: '用户界面' }
    ]);
  }

  // 切换换行模式
  toggleWrapMode(modelName: string, isWrap: boolean) {
    // 这里可以动态控制换行模式
    console.log(\`切换 \${modelName} 的换行模式为: \${isWrap}\`);
  }

  // 添加新标签
  addTag(newTag: string) {
    if (newTag && !this.modelService['tagModel'].tags.includes(newTag)) {
      this.modelService['tagModel'].tags.push(newTag);
      this.modelService['tagModel'] = {...this.modelService['tagModel']};
    }
  }

  // 移除标签
  removeTag(tagToRemove: string) {
    const index = this.modelService['tagModel'].tags.indexOf(tagToRemove);
    if (index > -1) {
      this.modelService['tagModel'].tags.splice(index, 1);
      this.modelService['tagModel'] = {...this.modelService['tagModel']};
    }
  }

  // 更新文章摘要
  updateSummary(newSummary: string) {
    this.modelService['articleModel'].summary = newSummary;
  }

  // 更新地址信息
  updateAddress(newAddress: string) {
    this.modelService['addressModel'].fullAddress = newAddress;
  }

  // 检查文本长度
  getTextLength(modelName: string, fieldName: string): number {
    return this.modelService[modelName]?.[fieldName]?.length || 0;
  }

  // 检查是否为长文本
  isLongText(modelName: string, fieldName: string, threshold: number = 100): boolean {
    return this.getTextLength(modelName, fieldName) > threshold;
  }

  // 获取文本预览（用于展示截断效果）
  getTextPreview(modelName: string, fieldName: string, maxLength: number = 50): string {
    const text = this.modelService[modelName]?.[fieldName] || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "样式配置",
      template: previewTemplate`
/* 换行模式相关样式 */
.readonly-wrap-demo {
  .demo-container {
    padding: 16px;
  }

  /* 换行模式容器 */
  .hy-readonly.wrap-mode {
    .readonly-content {
      white-space: normal;
      word-wrap: break-word;
      word-break: break-all;
      line-height: 1.5;
    }
  }

  /* 默认模式容器 */
  .hy-readonly.normal-mode {
    .readonly-content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* 对比展示区域 */
  .comparison-container {
    display: flex;
    gap: 20px;
    margin-top: 16px;
    
    .comparison-item {
      flex: 1;
      padding: 12px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      
      h4 {
        margin: 0 0 8px 0;
        color: #262626;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }

  /* 长文本换行样式 */
  .long-text-wrap {
    max-width: 100%;
    word-wrap: break-word;
    line-height: 1.6;
    color: #595959;
  }

  /* 标签列表换行样式 */
  .tag-list-wrap {
    .tag-item {
      display: inline-block;
      margin: 2px 4px 2px 0;
      padding: 2px 8px;
      background: #f0f0f0;
      border-radius: 4px;
      font-size: 12px;
      color: #666;
    }
  }

  /* 地址信息换行样式 */
  .address-wrap {
    line-height: 1.5;
    color: #595959;
    
    .address-part {
      display: block;
      margin-bottom: 2px;
    }
  }

  /* 响应式换行 */
  @media (max-width: 768px) {
    .hy-readonly {
      .readonly-content {
        font-size: 13px;
        line-height: 1.4;
      }
    }
    
    .comparison-container {
      flex-direction: column;
      gap: 12px;
    }
  }
}

/* 工具类 */
.text-wrap {
  white-space: normal !important;
  word-wrap: break-word !important;
}

.text-nowrap {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.text-break {
  word-break: break-all !important;
}

.text-break-word {
  word-break: break-word !important;
}
      `,
      language: "css",
      copy: true
    }
  ]
};