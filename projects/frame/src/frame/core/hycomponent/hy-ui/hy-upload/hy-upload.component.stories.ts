import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../base/base.module';
import { HyUploadComponent } from './hy-upload.component';
import { unit } from '../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { $hyapi, HyApiPostOpt, ModelService, TableService } from '../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

let _this;
class MockPricingService implements Partial<ModelService> {
  constructor() {
    _this = this;
    setTimeout(() => {
      $hyapi.io.post(_this, 'http://127.0.0.1:3001/deleteAllFile', {}, {
        showMsg: false,
        showErrorMsg: false,
        showFailMsg: false
      });
    }, 100);
  }
}

const argTypes = unit.createArgTypes('HyUploadComponent');
export default {
  title: '基础组件/hy-upload（文件上传）',
  component: HyUploadComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockPricingService }, TableService]
    }),
  ],
  argTypes
} as Meta;

// 基础用法
const BasicTemplate: Story<HyUploadComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础文件上传</h3>
      <p>最简单的文件上传功能，支持选择文件后手动上传</p>
      
      <hy-upload
        uploadButtonTitle="选择文件"
        [url]="url"
        [showFileName]="true"
        (onUploadCompleteItem)="onUploadCompleteItem($event)"
      ></hy-upload>
    </div>
  `
});

export const basic = BasicTemplate.bind({});
basic.args = {
  url: 'http://127.0.0.1:3001/uploadFile',
  onUploadCompleteItem: (event) => {
    if (event.resBody) {
      $hyapi.msg.createTips('success', '上传成功');
    } else {
      $hyapi.msg.createTips('error', '上传失败');
    }
  }
};
basic.storyName = '基础用法';
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

最简单的文件上传组件使用方式，提供文件选择和上传功能。

### 特性
- 支持单文件和多文件选择
- 手动触发上传（选择文件后点击"开始上传"按钮）
- 显示上传进度和结果反馈
- 显示已选择的文件名称

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| url | 上传接口地址 | string | - |
| showFileName | 是否显示文件名 | boolean | false |
| multiple | 是否允许多选 | boolean | false |
| uploadButtonTitle | 选择文件按钮文字 | string | '上传' |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-upload
  uploadButtonTitle="选择文件"
  [url]="uploadUrl"
  [showFileName]="true"
  [multiple]="true"
  (onUploadCompleteItem)="handleUploadComplete($event)">
</hy-upload>
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
  selector: 'app-upload-demo',
  templateUrl: './upload-demo.component.html'
})
export class UploadDemoComponent {
  uploadUrl = 'http://your-api.com/upload';

  handleUploadComplete(event: any) {
    if (event.resBody) {
      $hyapi.msg.createTips('success', '文件上传成功');
      console.log('上传结果:', event.resBody);
    } else {
      $hyapi.msg.createTips('error', '文件上传失败');
    }
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 多选模式
const MultipleTemplate: Story<HyUploadComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>🔄 单选模式 (默认)</h4>
        <p>每次只能选择一个文件，选择新文件会替换之前的文件</p>
        <hy-upload
          uploadButtonTitle="选择单个文件"
          [url]="url"
          [multiple]="false"
          [showFileName]="true"
          (onUploadCompleteItem)="onUploadCompleteItem($event)"
        ></hy-upload>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>📁 多选模式</h4>
        <p>可以同时选择多个文件，支持批量上传</p>
        <hy-upload
          uploadButtonTitle="选择多个文件"
          [url]="url"
          [multiple]="true"
          [showFileName]="true"
          (onUploadCompleteItem)="onUploadCompleteItem($event)"
        ></hy-upload>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>🎯 多选 + 数量限制</h4>
        <p>开启多选模式，但限制最多选择3个文件</p>
        <hy-upload
          uploadButtonTitle="最多选择3个文件"
          [url]="url"
          [multiple]="true"
          [maxUploadCount]="3"
          [showFileName]="true"
          (onUploadCompleteItem)="onUploadCompleteItem($event)"
        ></hy-upload>
      </div>
    </div>
  `
});

export const multiple = MultipleTemplate.bind({});
multiple.args = {
  url: 'http://127.0.0.1:3001/uploadFile',
  onUploadCompleteItem: (event) => {
    if (event.resBody) {
      $hyapi.msg.createTips('success', '上传成功');
    } else {
      $hyapi.msg.createTips('error', '上传失败');
    }
  }
};
multiple.storyName = '多选模式';
multiple.parameters = {
  docs: {
    description: {
      story: `
## 多选模式

通过 \`multiple\` 属性控制文件选择行为，支持单选和多选两种模式。

### 🔄 单选模式 (multiple=false)
- **默认行为**: 每次只能选择一个文件
- **替换逻辑**: 选择新文件会自动替换之前选择的文件
- **适用场景**: 头像上传、单个文档上传等

### 📁 多选模式 (multiple=true)
- **批量选择**: 可以同时选择多个文件
- **累积添加**: 新选择的文件会添加到已选文件列表中
- **适用场景**: 相册上传、批量文档处理等

### 🎯 最佳实践

#### 单选场景
- 用户头像、身份证照片等唯一性文件
- 配置文件、证书文件等替换性上传
- 简单的单文件处理流程

#### 多选场景
- 产品图片批量上传
- 文档资料批量提交
- 多媒体文件集合上传

### 配置参数
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| multiple | 是否允许多选 | boolean | false |
| maxUploadCount | 最大文件数量 | number | - |
| showFileName | 显示文件名列表 | boolean | false |

### 💡 使用建议
- **单选模式**: 适合简单场景，用户体验更直观
- **多选模式**: 提高批量操作效率，但需要合理的数量限制
- **数量限制**: 多选时建议设置 \`maxUploadCount\` 避免性能问题
- **文件显示**: 多选时建议开启 \`showFileName\` 让用户了解已选文件
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 单选模式 -->
<hy-upload
  uploadButtonTitle="选择单个文件"
  [url]="uploadUrl"
  [multiple]="false"
  [showFileName]="true">
</hy-upload>

<!-- 多选模式 -->
<hy-upload
  uploadButtonTitle="选择多个文件"
  [url]="uploadUrl"
  [multiple]="true"
  [showFileName]="true">
</hy-upload>

<!-- 多选 + 数量限制 -->
<hy-upload
  uploadButtonTitle="最多选择3个文件"
  [url]="uploadUrl"
  [multiple]="true"
  [maxUploadCount]="3"
  [showFileName]="true">
</hy-upload>
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
  selector: 'app-multiple-upload-demo',
  templateUrl: './multiple-upload-demo.component.html'
})
export class MultipleUploadDemoComponent {
  uploadUrl = 'http://your-api.com/upload';

  // 单选场景 - 用户头像上传
  uploadAvatar() {
    // 单选模式，每次只能选择一个头像文件
    // 适合替换性上传场景
  }

  // 多选场景 - 产品图片批量上传
  uploadProductImages() {
    // 多选模式，可以同时选择多张产品图片
    // 提高批量操作效率
  }

  handleUploadComplete(event: any) {
    if (event.resBody) {
      const fileCount = event.resBody.files?.length || 1;
      $hyapi.msg.createTips('success', \`成功上传 \${fileCount} 个文件\`);
      console.log('上传结果:', event.resBody);
    } else {
      $hyapi.msg.createTips('error', '文件上传失败');
    }
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 布局模式
const LayoutTemplate: Story<HyUploadComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>内联布局 (默认)</h4>
        <p>按钮和文件名在同一行显示，节省垂直空间</p>
        <hy-upload
          uploadButtonTitle="内联布局"
          layoutType="inline"
          [url]="url"
          [showFileName]="true"
          (onUploadCompleteItem)="onUploadCompleteItem($event)"
        ></hy-upload>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>垂直布局</h4>
        <p>按钮和文件名分行显示，层次更清晰</p>
        <hy-upload
          uploadButtonTitle="垂直布局"
          layoutType="vertical"
          [url]="url"
          [showFileName]="true"
          (onUploadCompleteItem)="onUploadCompleteItem($event)"
        ></hy-upload>
      </div>
    </div>
  `
});

export const layout = LayoutTemplate.bind({});
layout.args = {
  url: 'http://127.0.0.1:3001/uploadFile',
  onUploadCompleteItem: () => {
    $hyapi.msg.createTips('success', '上传成功');
  }
};
layout.storyName = '布局模式';
layout.parameters = {
  docs: {
    description: {
      story: `
## 布局模式

组件提供两种布局模式，适应不同的页面设计需求。

### 内联布局 (inline)
- 选择按钮、上传按钮和文件名在同一行
- 适合表单中的紧凑布局
- 默认模式

### 垂直布局 (vertical)  
- 各元素分行显示
- 视觉层次更清晰
- 适合独立的上传区域

### 配置
| 属性 | 说明 | 类型 | 可选值 |
|------|------|------|---------|
| layoutType | 布局模式 | string | 'inline' \\| 'vertical' |
| fileWidth | 文件名区域宽度 | string | - |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 内联布局 -->
<hy-upload
  layoutType="inline"
  [url]="uploadUrl"
  [showFileName]="true">
</hy-upload>

<!-- 垂直布局 -->
<hy-upload
  layoutType="vertical"
  [url]="uploadUrl"
  [showFileName]="true">
</hy-upload>
      `,
      language: "html",
      copy: true
    }
  ]
};

// 文件限制
const LimitTemplate: Story<HyUploadComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>📊 单选 + 数量限制</h4>
        <p>单选模式下，每次只能选择1个文件（数量限制对单选无实际效果）</p>
        <hy-upload
          uploadButtonTitle="单选模式"
          [url]="url"
          [multiple]="false"
          [maxUploadCount]="2"
          [showFileName]="true"
          (onUploadCompleteItem)="onUploadCompleteItem($event)"
        ></hy-upload>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>📁 多选 + 数量限制</h4>
        <p>多选模式下，最多只能选择 3 个文件</p>
        <hy-upload
          uploadButtonTitle="最多3个文件"
          [url]="url"
          [multiple]="true"
          [maxUploadCount]="3"
          [showFileName]="true"
          (onUploadCompleteItem)="onUploadCompleteItem($event)"
        ></hy-upload>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>🎯 多选 + 大小和类型限制</h4>
        <p>多选模式：单文件最大2MB，总大小不超过10MB，仅支持图片和文档</p>
        <hy-upload
          uploadButtonTitle="选择多个文档或图片"
          [url]="url"
          [multiple]="true"
          [maxUploadCount]="5"
          size="2MB"
          totalSize="10MB"
          fileType=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          uploadErrorMsg="仅支持 JPG、PNG、PDF、DOC、DOCX 格式文件"
          [showFileName]="true"
          (onUploadCompleteItem)="onUploadCompleteItem($event)"
        ></hy-upload>
      </div>
    </div>
  `
});

export const limits = LimitTemplate.bind({});
limits.args = {
  url: 'http://127.0.0.1:3001/uploadFile',
  onUploadCompleteItem: () => {
    $hyapi.msg.createTips('success', '上传成功');
  }
};
limits.storyName = '文件限制';
limits.parameters = {
  docs: {
    description: {
      story: `
## 文件限制

通过配置各种限制参数，控制用户上传行为，保障系统安全。

### 🔄 单选 vs 多选模式下的限制

#### 📊 单选模式 + 限制
- **数量限制**: 对单选模式无实际效果（始终只能选择1个文件）
- **大小限制**: 仍然有效，限制单个文件的大小
- **类型限制**: 仍然有效，限制允许的文件类型

#### 📁 多选模式 + 限制
- **数量限制**: 限制最大可选择的文件数量
- **大小限制**: 每个文件都需要满足单文件大小限制
- **总大小限制**: 所有选择文件的总大小不能超过限制
- **类型限制**: 每个文件都需要满足类型要求

### 支持的限制类型

#### 📊 数量限制
- 限制最大上传文件数量
- 达到限制后选择按钮自动禁用
- 多选模式下特别有用

#### 📏 大小限制
- **单文件大小**: 限制每个文件的最大体积
- **总文件大小**: 限制所有文件的总体积（多选模式）
- 支持 KB、MB 单位

#### 📁 类型限制
- 通过文件扩展名限制允许的文件类型
- 支持多种格式，用逗号分隔
- 自定义错误提示信息

### 配置参数
| 属性 | 说明 | 类型 | 示例 |
|------|------|------|------|
| multiple | 是否允许多选 | boolean | true |
| maxUploadCount | 最大文件数量 | number | 5 |
| size | 单文件大小限制 | string\\|number | '2MB' |
| totalSize | 总文件大小限制 | string\\|number | '10MB' |
| fileType | 允许的文件类型 | string | '.jpg,.png,.pdf' |
| uploadErrorMsg | 自定义错误信息 | string | '仅支持图片文件' |

### 💡 最佳实践
- **多选 + 数量限制**: 避免用户选择过多文件影响性能
- **多选 + 大小限制**: 控制单个文件和总文件大小
- **类型限制**: 根据业务需求限制文件格式
- **错误提示**: 提供清晰的错误信息指导用户
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 单选 + 数量限制 -->
<hy-upload
  uploadButtonTitle="单选模式"
  [url]="uploadUrl"
  [multiple]="false"
  [maxUploadCount]="2"
  [showFileName]="true">
</hy-upload>

<!-- 多选 + 数量限制 -->
<hy-upload
  uploadButtonTitle="最多3个文件"
  [url]="uploadUrl"
  [multiple]="true"
  [maxUploadCount]="3"
  [showFileName]="true">
</hy-upload>

<!-- 多选 + 大小和类型限制 -->
<hy-upload
  uploadButtonTitle="选择多个文档或图片"
  [url]="uploadUrl"
  [multiple]="true"
  [maxUploadCount]="5"
  size="2MB"
  totalSize="10MB" 
  fileType=".jpg,.png,.pdf,.doc"
  uploadErrorMsg="仅支持图片和文档文件"
  [showFileName]="true">
</hy-upload>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { $hyapi } from '@hy/frame';

@Component({
  selector: 'app-upload-limit-demo',
  templateUrl: './upload-limit-demo.component.html'
})
export class UploadLimitDemoComponent {
  uploadUrl = 'http://your-api.com/upload';

  // 上传前自定义验证
  onBeforeUpload = (file: NzUploadFile): boolean => {
    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type!)) {
      $hyapi.msg.createTips('error', '不支持该文件格式');
      return false;
    }
    
    // 验证文件大小 (2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size! > maxSize) {
      $hyapi.msg.createTips('error', '文件大小不能超过2MB');
      return false;
    }
    
    return true;
  };
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 安全加密
const EncryptTemplate: Story<HyUploadComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>🔒 仅数据加密</h4>
        <p>上传数据加密，文件内容不加密</p>
        <hy-upload
          uploadButtonTitle="数据加密上传"
          [url]="url"
          [isEncrypt]="false"
          [isUploadSecret]="true"
          [uploadData]="uploadData"
          [uploadDataEncryptKeys]="['password', 'phone']"
          [showFileName]="true"
        ></hy-upload>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>🔐 文件和数据双重加密</h4>
        <p>文件内容和上传数据都进行加密</p>
        <hy-upload
          uploadButtonTitle="双重加密上传"
          [url]="url"
          [isEncrypt]="true"
          [isUploadSecret]="true"
          [uploadData]="uploadData"
          [uploadDataEncryptKeys]="['password', 'phone']"
          [showFileName]="true"
        ></hy-upload>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>🔓 仅文件加密</h4>
        <p>文件内容加密，上传数据不加密</p>
        <hy-upload
          uploadButtonTitle="文件加密上传"
          [url]="url"
          [isEncrypt]="true"
          [uploadData]="uploadData"
          [showFileName]="true"
        ></hy-upload>
      </div>
    </div>
  `
});

export const encryption = EncryptTemplate.bind({});
encryption.args = {
  url: 'http://127.0.0.1:3001/uploadFile',
  uploadData: {
    userId: '12345',
    password: 'secret123',
    phone: '13800138000',
    remark: '测试上传'
  }
};
encryption.storyName = '安全加密';
encryption.parameters = {
  docs: {
    description: {
      story: `
## 安全加密

组件支持多层次的数据安全保护，满足不同安全级别的需求。

### 🔐 加密类型

#### 数据加密
- 对 \`uploadData\` 中指定字段进行加密
- 通过 \`uploadDataEncryptKeys\` 指定需要加密的字段
- 支持嵌套对象路径，如 \`userInfo.phone\`

#### 文件加密
- 对上传的文件内容进行加密
- 通过 \`isEncrypt\` 控制是否启用

#### 请求头加密
- 在HTTP请求头添加 \`Zen_sec_aes\` 加密密钥
- 通过 \`isUploadSecret\` 控制是否添加

### 🛡️ 安全级别

| 级别 | 数据加密 | 文件加密 | 适用场景 |
|------|----------|----------|----------|
| **基础** | ❌ | ❌ | 内网环境，低敏感度 |
| **标准** | ✅ | ❌ | 一般业务数据 |
| **高级** | ❌ | ✅ | 文件内容敏感 |
| **最高** | ✅ | ✅ | 高度敏感数据 |

### 配置参数
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| isEncrypt | 是否文件加密 | boolean | false |
| isUploadSecret | 是否请求头加密 | boolean | true |
| uploadData | 上传携带数据 | object | - |
| uploadDataEncryptKeys | 需加密的数据字段 | string[] | [] |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 数据加密 -->
<hy-upload
  [url]="uploadUrl"
  [isEncrypt]="false"
  [isUploadSecret]="true"
  [uploadData]="uploadData"
  [uploadDataEncryptKeys]="['password', 'userInfo.phone']">
</hy-upload>

<!-- 双重加密 -->
<hy-upload
  [url]="uploadUrl"  
  [isEncrypt]="true"
  [isUploadSecret]="true"
  [uploadData]="uploadData"
  [uploadDataEncryptKeys]="['password', 'userInfo.phone']">
</hy-upload>

<!-- 仅文件加密 -->
<hy-upload
  uploadButtonTitle="文件加密上传"
  [url]="uploadUrl"
  [isEncrypt]="true"
  [uploadData]="uploadData"
  [showFileName]="true"
></hy-upload>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-encrypt-upload-demo',
  templateUrl: './encrypt-upload-demo.component.html'
})
export class EncryptUploadDemoComponent {
  uploadUrl = 'http://your-api.com/upload';
  
  // 上传时携带的数据
  uploadData = {
    userId: '12345',
    password: 'secret123',      // 会被加密
    userInfo: {
      name: '张三',
      phone: '13800138000'       // 会被加密
    },
    remark: '普通备注'           // 不会被加密
  };

  handleUploadComplete(event: any) {
    console.log('加密上传完成:', event);
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 高级功能
const AdvancedTemplate: Story<HyUploadComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>📤 隐藏上传按钮模式</h4>
        <p>选择文件后自动上传，适合即时上传场景</p>
        <hy-upload
          uploadButtonTitle="选择后自动上传"
          [url]="url"
          [hideUploadButton]="true"
          [showFileName]="true"
          [showSuccessFileName]="true"
          (onUploadCompleteItem)="onUploadCompleteItem($event)"
        ></hy-upload>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>🎛️ 自定义按钮文字</h4>
        <p>自定义各种状态下的按钮文字</p>
        <hy-upload
          uploadButtonTitle="📁 选择附件"
          uploadStartTitle="🚀 开始传输"
          uploadingTitle="⏳ 传输中..."
          [url]="url"
          [showFileName]="true"
          (onUploadCompleteItem)="onUploadCompleteItem($event)"
        ></hy-upload>
      </div>
    </div>
  `
});

export const advanced = AdvancedTemplate.bind({});
advanced.args = {
  url: 'http://127.0.0.1:3001/uploadFile',
  onUploadCompleteItem: () => {
    $hyapi.msg.createTips('success', '上传成功');
  }
};
advanced.storyName = '高级功能';
advanced.parameters = {
  docs: {
    description: {
      story: `
## 高级功能

提供更多定制化选项，满足复杂业务场景需求。

### ⚡ 自动上传模式
- 设置 \`hideUploadButton="true"\` 隐藏上传按钮
- 选择文件后立即自动上传
- 适合即时上传的场景

### 🎨 自定义按钮文字
- \`uploadButtonTitle\`: 选择文件按钮文字
- \`uploadStartTitle\`: 开始上传按钮文字  
- \`uploadingTitle\`: 上传中显示文字

### 📂 文件名显示
- \`showFileName\`: 显示选择的文件名
- \`showSuccessFileName\`: 显示上传成功的文件名
- \`fileWidth\`: 自定义文件名区域宽度

### 高级配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| hideUploadButton | 隐藏上传按钮 | boolean | false |
| showSuccessFileName | 显示成功文件名 | boolean | false |
| cols | 栅格布局列数 | number | 24 |
| flex | Flex布局设置 | any | - |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 自动上传模式 -->
<hy-upload
  uploadButtonTitle="选择后自动上传"
  [url]="uploadUrl"
  [hideUploadButton]="true"
  [showFileName]="true"
  [showSuccessFileName]="true">
</hy-upload>

<!-- 自定义按钮文字 -->
<hy-upload
  uploadButtonTitle="📁 选择附件"
  uploadStartTitle="🚀 开始传输"
  uploadingTitle="⏳ 传输中..."
  [url]="uploadUrl"
  [showFileName]="true">
</hy-upload>
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
  selector: 'app-advanced-upload-demo',
  templateUrl: './advanced-upload-demo.component.html'
})
export class AdvancedUploadDemoComponent {
  uploadUrl = 'http://your-api.com/upload';

  handleUploadComplete(event: any) {
    if (event.resBody) {
      $hyapi.msg.createTips('success', '文件上传成功');
      
      // 处理上传成功后的业务逻辑
      this.processUploadResult(event.resBody);
    }
  }

  private processUploadResult(result: any) {
    // 处理上传结果，如保存文件信息到表单
    console.log('文件上传结果:', result);
  }

  // 上传前准备事件
  onBeforeUploadPrepare(fileList: any[]) {
    console.log('准备上传文件:', fileList);
    // 可以在这里做一些上传前的准备工作
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 手动控制上传（主动调用post请求）
const ManualUploadTemplate: Story<HyUploadComponent> = (args: any) => {
  // 文件选择变化事件
  args.onFileChange = function (event: any) {
    console.log('文件列表变化:', event);
    this.uploadResult = null;
    this.uploadError = null;
  };

  // 手动上传事件
  args.manualUpload = function () {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      $hyapi.msg.createTips('warning', '请先选择文件');
      return;
    }

    this.uploading = true;
    this.uploadResult = null;
    this.uploadError = null;

    // 准备上传数据
    const uploadData = {
      userId: 'user_123',
      category: 'manual_upload',
      description: '手动上传的文件',
      uploadTime: new Date().toISOString()
    };

    const obj = {
      'file2': this.selectedFiles,
    }

    // 使用 hyapi.io.post 的 fileList 参数上传
    $hyapi.io.post(_this, 'http://127.0.0.1:3001/uploadFile', uploadData, {
      fileList: obj,     // 传入文件列表
      showMsg: false,
      showFailMsg: false,
      showLoading: false,
      contentType: 'multipartForm',
      successFn: (resBody) => {
        this.uploading = false;
        this.uploadResult = resBody;
        $hyapi.msg.createTips('success', '文件上传成功');
        console.log('手动上传成功:', resBody);
      },
      failFn: (resBody) => {
        this.uploading = false;
        this.uploadError = resBody;
        $hyapi.msg.createTips('error', '文件上传失败');
        console.error('手动上传失败:', resBody);
      },
      httpFailFn: (error) => {
        this.uploading = false;
        this.uploadError = error;
        $hyapi.msg.createTips('error', '网络请求失败');
        console.error('HTTP请求失败:', error);
      }
    });
  };

  // 加密上传事件
  args.encryptUpload = function () {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      $hyapi.msg.createTips('warning', '请先选择文件');
      return;
    }

    this.encryptUploading = true;
    this.uploadResult = null;
    this.uploadError = null;

    // 准备上传数据（包含敏感信息）
    const uploadData = {
      userId: 'user_123',
      category: 'confidential',
      userInfo: {
        name: '张三',
        phone: '13800138000',
        idCard: '330000199001010000'
      },
      description: '加密上传的敏感文件'
    };

    // 使用 hyapi.io.post 的 fileList 参数进行加密上传
    $hyapi.io.post(_this, 'http://127.0.0.1:3001/uploadFile', uploadData, {
      fileList: this.selectedFiles,       // 传入文件列表
      isFileEncrypt: true,                // 启用文件加密
      showMsg: false,
      showFailMsg: false,
      showLoading: false,
      contentType: 'multipartForm',
      successFn: (resBody) => {
        this.encryptUploading = false;
        this.uploadResult = resBody;
        $hyapi.msg.createTips('success', '加密文件上传成功');
        console.log('加密上传成功:', resBody);
      },
      failFn: (resBody) => {
        this.encryptUploading = false;
        this.uploadError = resBody;
        $hyapi.msg.createTips('error', '加密文件上传失败');
        console.error('加密上传失败:', resBody);
      },
      httpFailFn: (error) => {
        this.encryptUploading = false;
        this.uploadError = error;
        $hyapi.msg.createTips('error', '网络请求失败');
        console.error('HTTP请求失败:', error);
      }
    }, {
      secret: true,                       // 启用数据加密
      encryptKeys: ['userInfo.phone', 'userInfo.idCard']  // 指定需要加密的字段
    });
  };

  // 自定义表单字段名上传事件
  args.customFieldUpload = function () {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      $hyapi.msg.createTips('warning', '请先选择文件');
      return;
    }

    this.customUploading = true;
    this.uploadResult = null;
    this.uploadError = null;

    // 准备上传数据
    const uploadData = {
      userId: 'user_123',
      documentType: 'contract',
      description: '自定义字段名上传示例'
    };

    // 使用自定义表单字段名格式：[{ [key: string]: NzUploadFile[] }]
    // 单个对象包含多个字段名和对应的文件数组
    const customFileList: HyApiPostOpt['fileList'] = {
      'file': this.selectedFiles,  // 前两个文件作为合同文件
      // 'attachments': this.selectedFiles.slice(2)        // 其余文件作为附件
    };

    console.log('自定义fileList格式:', customFileList);

    // 使用 hyapi.io.post 进行自定义字段名上传
    $hyapi.io.post(_this, 'http://127.0.0.1:3001/uploadFile', uploadData, {
      fileList: customFileList,           // 传入自定义格式的文件列表
      showMsg: false,
      showFailMsg: false,
      showLoading: false,
      contentType: 'multipartForm',
      successFn: (resBody) => {
        this.customUploading = false;
        this.uploadResult = resBody;
        $hyapi.msg.createTips('success', '自定义字段名上传成功');
        console.log('自定义字段名上传成功:', resBody);
      },
      failFn: (resBody) => {
        this.customUploading = false;
        this.uploadError = resBody;
        $hyapi.msg.createTips('error', '自定义字段名上传失败');
        console.error('自定义字段名上传失败:', resBody);
      },
      httpFailFn: (error) => {
        this.customUploading = false;
        this.uploadError = error;
        $hyapi.msg.createTips('error', '网络请求失败');
        console.error('HTTP请求失败:', error);
      }
    });
  };

  // 清空文件事件
  args.clearFiles = function () {
    this.selectedFiles = [];
    this.uploadResult = null;
    this.uploadError = null;
  };
  return {
    props: args,
    template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>📋 获取文件列表</h4>
        <p>选择文件后，可以获取文件列表进行手动处理</p>
        <hy-upload
          uploadButtonTitle="选择文件（不自动上传）"
          [hideUploadButton]="true"
          [showFileName]="true"
          [(fileList)]="selectedFiles"
          (fileListChange)="onFileChange($event)"
        ></hy-upload>
        
        <div style="margin-top: 15px;" *ngIf="selectedFiles && selectedFiles.length > 0">
          <h5>✅ 已选择的文件：</h5>
                     <ul style="margin: 10px 0; padding-left: 20px;">
             <li *ngFor="let file of selectedFiles" style="margin: 5px 0;">
               📁 {{file.name}}
             </li>
           </ul>
          
          <div style="margin-top: 15px;">
            <button nz-button nzType="primary" 
                    [nzLoading]="uploading" 
                    (click)="manualUpload()" 
                    style="margin-right: 10px;">
              🚀 手动上传文件
            </button>
            
                         <button nz-button nzType="primary" 
                     [nzLoading]="encryptUploading" 
                     (click)="encryptUpload()" 
                     style="margin-right: 10px;">
               🔐 加密上传文件
             </button>
             
             <button nz-button nzType="primary" 
                     [nzLoading]="customUploading" 
                     (click)="customFieldUpload()" 
                     style="margin-right: 10px;">
               📝 自定义字段名上传
             </button>
             
             <button nz-button (click)="clearFiles()">
               🗑️ 清空文件
             </button>
          </div>
        </div>
        
        <div style="margin-top: 20px;">
          <h5>📝 功能说明：</h5>
          <ul style="margin: 10px 0; padding-left: 20px; font-size: 14px; color: #666;">
            <li><strong>手动上传</strong>：直接传入文件数组，表单字段名为默认的 'file'</li>
            <li><strong>加密上传</strong>：支持文件内容加密和数据字段加密</li>
            <li><strong>自定义字段名</strong>：可指定任意表单字段名，适合多类型文件分组</li>
            <li><strong>完全控制</strong>：上传时机、参数、错误处理完全由开发者控制</li>
          </ul>
          
          <h5>🔧 自定义字段名格式：</h5>
          <div style="background: #f6f8fa; padding: 10px; border-radius: 4px; font-size: 12px; margin: 10px 0;">
            <strong>默认格式：</strong><br/>
            <code>fileList: NzUploadFile[]</code> → 表单字段: <code>file</code><br/><br/>
            
            <strong>自定义格式：</strong><br/>
            <code>fileList: [{{'{'}} 'contractFiles': files1, 'attachments': files2 {{'}'}}]</code><br/>
            → 表单字段: <code>contractFiles</code>, <code>attachments</code>
          </div>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>📊 上传结果</h4>
        <div *ngIf="uploadResult" style="padding: 15px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 6px;">
          <h5 style="color: #52c41a; margin: 0 0 10px 0;">✅ 上传成功</h5>
          <pre style="margin: 0; white-space: pre-wrap; font-size: 12px;">{{uploadResult | json}}</pre>
        </div>
        
        <div *ngIf="uploadError" style="padding: 15px; background: #fff2f0; border: 1px solid #ffccc7; border-radius: 6px;">
          <h5 style="color: #ff4d4f; margin: 0 0 10px 0;">❌ 上传失败</h5>
          <pre style="margin: 0; white-space: pre-wrap; font-size: 12px;">{{uploadError | json}}</pre>
        </div>
      </div>
    </div>
  `
  };
};

export const manualUpload = ManualUploadTemplate.bind({});
manualUpload.args = {
  selectedFiles: [],
  uploading: false,
  encryptUploading: false,
  customUploading: false,
  uploadResult: null,
  uploadError: null
};
manualUpload.storyName = '手动控制上传（主动调用post请求）';
manualUpload.parameters = {
  docs: {
    description: {
      story: `
## 手动控制上传

通过双向绑定 \`[(fileList)]\` 自动获取文件列表，然后使用 \`hyapi.io.post\` 的 \`fileList\` 参数进行手动上传，提供更灵活的上传控制。

### 🎯 适用场景

#### 需要手动控制上传时机
- 文件选择后需要进行额外验证
- 批量操作前确认文件列表
- 与其他表单数据一起提交

#### 需要自定义上传逻辑
- 添加自定义上传参数
- 实施复杂的错误处理
- 上传前后的业务逻辑处理

#### 需要自定义表单字段名
- 后端接口需要特定的字段名
- 不同类型文件需要分组上传
- 与现有表单结构保持一致

### 🔧 实现原理

#### 1. 文件列表获取
- 通过 \`[(fileList)]\` 双向绑定获取选择的文件
- 文件类型为 \`NzUploadFile[]\`
- 支持实时监听文件变化，无需手动赋值

#### 2. 手动上传方式
- 使用 \`hyapi.io.post\` 的 \`fileList\` 参数
- 支持普通上传、加密上传和自定义字段名上传  
- 完全控制上传时机和参数

#### 3. 自定义表单字段名
- 支持 \`NzUploadFile[]\` 和 \`[{ [key: string]: NzUploadFile[] }]\` 两种格式
- 默认格式：文件以 'file' 字段名上传
- 自定义格式：可指定任意字段名，如 'contractFiles'、'attachments' 等

### 📋 核心配置

#### 组件配置
| 属性 | 说明 | 类型 | 示例 |
|------|------|------|------|
| [(fileList)] | 双向绑定文件列表 | NzUploadFile[] | [(fileList)]="selectedFiles" |
| hideUploadButton | 隐藏默认上传按钮 | boolean | true |
| (fileListChange) | 文件变化事件 | EventEmitter | (fileListChange)="onFileChange($event)" |

#### 上传参数
| 参数 | 说明 | 类型 | 示例 |
|------|------|------|------|
| fileList | 文件列表 | NzUploadFile[] | fileList: this.selectedFiles |
| isFileEncrypt | 文件加密 | boolean | isFileEncrypt: true |
| showLoading | 显示加载状态 | boolean | showLoading: false |

### 🔐 加密上传支持

#### 文件加密
- 设置 \`isFileEncrypt: true\` 启用文件内容加密
- 文件在传输过程中被加密处理

#### 数据加密
- 通过 \`secretOpt\` 参数配置数据加密
- 支持嵌套字段路径加密
- 自动添加加密请求头

### ⚡ 性能优势

- **双向绑定**: 自动同步文件列表状态，无需手动管理
- **按需上传**: 只有用户确认后才开始上传
- **批量处理**: 可以一次性上传多个文件
- **内存优化**: 避免自动上传造成的资源浪费
- **错误处理**: 提供详细的上传状态反馈
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 文件选择（不自动上传） -->
<hy-upload
  uploadButtonTitle="选择文件"
  [hideUploadButton]="true"
  [showFileName]="true"
  [(fileList)]="selectedFiles"
  (handleChange)="onFileChange($event)">
</hy-upload>

<!-- 手动上传控制 -->
<div *ngIf="selectedFiles.length > 0">
  <h5>已选择文件：</h5>
     <ul>
     <li *ngFor="let file of selectedFiles">
       {{file.name}}
     </li>
   </ul>
  
  <button nz-button nzType="primary" 
          [nzLoading]="uploading" 
          (click)="manualUpload()">
    手动上传文件
  </button>
  
     <button nz-button nzType="primary" 
           [nzLoading]="encryptUploading" 
           (click)="encryptUpload()">
     加密上传文件
   </button>
   
   <button nz-button nzType="primary" 
           [nzLoading]="customUploading" 
           (click)="customFieldUpload()">
     自定义字段名上传
   </button>
 </div>

<!-- 上传结果显示 -->
<div *ngIf="uploadResult">
  <h5>上传成功</h5>
  <pre>{{uploadResult | json}}</pre>
</div>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { $hyapi } from '@hy/frame';

@Component({
  selector: 'app-manual-upload-demo',
  templateUrl: './manual-upload-demo.component.html'
})
 export class ManualUploadDemoComponent {
   selectedFiles: NzUploadFile[] = [];
   uploading = false;
   encryptUploading = false;
   customUploading = false;
   uploadResult: any = null;
   uploadError: any = null;

     // 文件选择变化事件
   onFileChange(event: any) {
     console.log('文件列表变化:', event);
     // selectedFiles 通过双向绑定自动更新，无需手动赋值
     this.uploadResult = null;
     this.uploadError = null;
   }

  // 手动上传文件
  manualUpload() {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      $hyapi.msg.createTips('warning', '请先选择文件');
      return;
    }

    this.uploading = true;
    this.uploadResult = null;
    this.uploadError = null;

    // 准备上传数据
    const uploadData = {
      userId: 'user_123',
      category: 'manual_upload',
      description: '手动上传的文件',
      uploadTime: new Date().toISOString()
    };

         // 使用 hyapi.io.post 的 fileList 参数上传
     $hyapi.io.post(null, '/api/upload', uploadData, {
       fileList: this.selectedFiles,     // 关键：传入文件列表
       contentType: 'multipartForm',     // 设置为表单数据类型
       showMsg: true,
       successFn: (res) => {
         this.uploading = false;
         this.uploadResult = res;
         $hyapi.msg.createTips('success', '文件上传成功');
       },
       failFn: (res) => {
         this.uploading = false;
         this.uploadError = res;
         $hyapi.msg.createTips('error', '文件上传失败');
       }
     });
  }

  // 加密上传文件
  encryptUpload() {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      $hyapi.msg.createTips('warning', '请先选择文件');
      return;
    }

    this.encryptUploading = true;
    this.uploadResult = null;
    this.uploadError = null;

    // 准备上传数据（包含敏感信息）
    const uploadData = {
      userId: 'user_123',
      category: 'confidential',
      userInfo: {
        name: '张三',
        phone: '13800138000',
        idCard: '330000199001010000'
      }
    };

         // 使用 hyapi.io.post 进行加密上传
     $hyapi.io.post(null, '/api/upload/secure', uploadData, {
       fileList: this.selectedFiles,       // 文件列表
       isFileEncrypt: true,                // 启用文件加密
       contentType: 'multipartForm',       // 设置为表单数据类型
       successFn: (res) => {
         this.encryptUploading = false;
         this.uploadResult = res;
         $hyapi.msg.createTips('success', '加密文件上传成功');
       },
       failFn: (res) => {
         this.encryptUploading = false;
         this.uploadError = res;
         $hyapi.msg.createTips('error', '加密文件上传失败');
       }
        }, {
     secret: true,                       // 启用数据加密
     encryptKeys: ['userInfo.phone', 'userInfo.idCard']  // 加密字段
   });
 }

 // 自定义字段名上传文件
 customFieldUpload() {
   if (!this.selectedFiles || this.selectedFiles.length === 0) {
     $hyapi.msg.createTips('warning', '请先选择文件');
     return;
   }

   this.customUploading = true;
   this.uploadResult = null;
   this.uploadError = null;

   // 准备上传数据
   const uploadData = {
     userId: 'user_123',
     documentType: 'contract',
     description: '自定义字段名上传示例'
   };

   // 使用自定义表单字段名格式：[{ [key: string]: NzUploadFile[] }]
   const customFileList = [{
     'contractFiles': this.selectedFiles.slice(0, 2),  // 前两个文件作为合同文件
     'attachments': this.selectedFiles.slice(2)        // 其余文件作为附件
   }] as [{ [key: string]: any[] }];

   // 使用 hyapi.io.post 进行自定义字段名上传
   $hyapi.io.post(null, '/api/upload/custom', uploadData, {
     fileList: customFileList,           // 传入自定义格式的文件列表
     contentType: 'multipartForm',       // 设置为表单数据类型
     successFn: (res) => {
       this.customUploading = false;
       this.uploadResult = res;
       $hyapi.msg.createTips('success', '自定义字段名上传成功');
     },
     failFn: (res) => {
       this.customUploading = false;
       this.uploadError = res;
       $hyapi.msg.createTips('error', '自定义字段名上传失败');
     }
   });
 }

 // 清空文件列表
 clearFiles() {
   this.selectedFiles = [];
   this.uploadResult = null;
   this.uploadError = null;
 }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "核心用法",
      template: previewTemplate`
// ============= 1. 基础手动上传 =============
// 获取文件列表后手动上传
const selectedFiles: NzUploadFile[] = [...]; // 从hy-upload组件获取

 $hyapi.io.post(null, '/api/upload', uploadData, {
   fileList: selectedFiles,        // 核心：使用fileList参数
   contentType: 'multipartForm',   // 设置为表单数据类型
   showMsg: true,
   successFn: (res) => {
     console.log('上传成功:', res);
   }
 });

 // ============= 2. 加密文件上传 =============
 $hyapi.io.post(null, '/api/upload/secure', uploadData, {
   fileList: selectedFiles,        // 文件列表
   isFileEncrypt: true,           // 启用文件加密
   contentType: 'multipartForm',  // 设置为表单数据类型
   successFn: (res) => {
     console.log('加密上传成功:', res);
   }
 }, {
   secret: true,                  // 启用数据加密
   encryptKeys: ['sensitive.field']  // 加密字段
 });

 // ============= 3. 自定义表单字段名上传 =============
 // 使用默认格式：NzUploadFile[]（表单字段名为 'file'）
 $hyapi.io.post(null, '/api/upload', uploadData, {
   fileList: selectedFiles,        // 默认格式
   contentType: 'multipartForm',
   successFn: (res) => console.log('默认字段名上传成功:', res)
 });

 // 使用自定义格式：[{ [key: string]: NzUploadFile[] }]
 const customFileList = [{
   'contractFiles': selectedFiles.slice(0, 2),  // 合同文件
   'attachments': selectedFiles.slice(2),       // 附件文件  
   'userPhotos': photoFiles                     // 用户照片
 }] as [{ [key: string]: any[] }];

 $hyapi.io.post(null, '/api/upload/custom', uploadData, {
   fileList: customFileList,       // 自定义字段名格式
   contentType: 'multipartForm',
   successFn: (res) => console.log('自定义字段名上传成功:', res)
 });

 // ============= 4. 批量文件处理 =============
const processMultipleFiles = (fileList: NzUploadFile[]) => {
  // 文件分类
  const imageFiles = fileList.filter(f => f.type?.startsWith('image/'));
  const docFiles = fileList.filter(f => f.type?.includes('document'));

  // 分别上传到不同接口
  if (imageFiles.length > 0) {
         $hyapi.io.post(null, '/api/upload/images', { category: 'image' }, {
       fileList: imageFiles,
       contentType: 'multipartForm',
       successFn: (res) => console.log('图片上传完成')
     });
  }

  if (docFiles.length > 0) {
         $hyapi.io.post(null, '/api/upload/documents', { category: 'doc' }, {
       fileList: docFiles,
       contentType: 'multipartForm',
       successFn: (res) => console.log('文档上传完成')
     });
  }
};

 // ============= 5. 上传进度控制 =============
const uploadWithProgress = (fileList: NzUploadFile[]) => {
  const totalFiles = fileList.length;
  let completedFiles = 0;

  fileList.forEach((file, index) => {
    setTimeout(() => {
             $hyapi.io.post(null, '/api/upload/single', { 
         fileIndex: index,
         fileName: file.name 
       }, {
         fileList: [file],     // 单文件上传
         contentType: 'multipartForm',
         showLoading: false,   // 自定义进度显示
        successFn: (res) => {
          completedFiles++;
          const progress = Math.round((completedFiles / totalFiles) * 100);
          console.log(\`上传进度: \${progress}%\`);
          
          if (completedFiles === totalFiles) {
            $hyapi.msg.createTips('success', '所有文件上传完成');
          }
        }
      });
    }, index * 1000); // 每秒上传一个文件
  });
};

  // ============= 6. 文件验证后上传 =============
 const validateAndUpload = (fileList: NzUploadFile[]) => {
   // 文件验证
   const validFiles = fileList.filter(file => {
     // 大小验证
     if (file.size! > 10 * 1024 * 1024) { // 10MB
       $hyapi.msg.createTips('error', \`文件 \${file.name} 超过大小限制\`);
       return false;
     }
     
     // 类型验证
     const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
     if (!allowedTypes.includes(file.type!)) {
       $hyapi.msg.createTips('error', \`文件 \${file.name} 类型不支持\`);
       return false;
     }
     
     return true;
   });

   if (validFiles.length === 0) {
     $hyapi.msg.createTips('warning', '没有有效的文件可以上传');
     return;
   }

   // 上传验证通过的文件
   $hyapi.io.post(null, '/api/upload/validated', {
     validatedCount: validFiles.length,
     totalCount: fileList.length
   }, {
     fileList: validFiles,
     contentType: 'multipartForm',
     successFn: (res) => {
       $hyapi.msg.createTips('success', \`成功上传 \${validFiles.length} 个文件\`);
     }
   });
 };

 // ============= 7. 自定义字段名实际应用场景 =============
 
 // 场景1：合同管理系统 - 不同类型文件分组上传
 const contractUpload = (contractFiles: NzUploadFile[], attachments: NzUploadFile[]) => {
   const customFileList = [{
     'mainContract': contractFiles,      // 主合同文件
     'appendices': attachments          // 附件文件
   }] as [{ [key: string]: any[] }];

   $hyapi.io.post(null, '/api/contract/upload', {
     contractId: 'CT2024001',
     contractType: 'purchase'
   }, {
     fileList: customFileList,
     contentType: 'multipartForm',
     successFn: (res) => console.log('合同文件上传成功')
   });
 };

 // 场景2：用户资料上传 - 多种证件分类
 const userDocumentUpload = (idCards: NzUploadFile[], photos: NzUploadFile[], certificates: NzUploadFile[]) => {
   const customFileList = [{
     'idCardFiles': idCards,            // 身份证文件
     'userPhotos': photos,              // 用户照片  
     'certificateFiles': certificates   // 证书文件
   }] as [{ [key: string]: any[] }];

   $hyapi.io.post(null, '/api/user/documents', {
     userId: 'USER123',
     documentType: 'verification'
   }, {
     fileList: customFileList,
     contentType: 'multipartForm',
     isFileEncrypt: true,               // 身份证等敏感文件需要加密
     successFn: (res) => console.log('用户资料上传成功')
   });
 };

 // 场景3：项目文档管理 - 按阶段分组
 const projectDocumentUpload = (requirements: NzUploadFile[], designs: NzUploadFile[], testReports: NzUploadFile[]) => {
   const customFileList = [{
     'requirementDocs': requirements,   // 需求文档
     'designDocs': designs,            // 设计文档
     'testReports': testReports        // 测试报告
   }] as [{ [key: string]: any[] }];

   $hyapi.io.post(null, '/api/project/documents', {
     projectId: 'PRJ2024001',
     phase: 'development'
   }, {
     fileList: customFileList,
     contentType: 'multipartForm',
     successFn: (res) => {
       console.log('项目文档上传成功');
       // 可以根据不同字段名处理不同的上传结果
       if (res.datas.requirementDocs) {
         console.log('需求文档处理完成');
       }
       if (res.datas.designDocs) {
         console.log('设计文档处理完成');
       }
     }
   });
 };

 // 场景4：电商商品管理 - 主图与详情图分离
 const productImageUpload = (mainImages: NzUploadFile[], detailImages: NzUploadFile[], videoFiles: NzUploadFile[]) => {
   const customFileList = [{
     'productMainImages': mainImages,   // 商品主图
     'productDetailImages': detailImages, // 商品详情图
     'productVideos': videoFiles        // 商品视频
   }] as [{ [key: string]: any[] }];

   $hyapi.io.post(null, '/api/product/media', {
     productId: 'PROD2024001',
     category: 'electronics'
   }, {
     fileList: customFileList,
     contentType: 'multipartForm',
     successFn: (res) => {
       // 后端返回不同类型文件的处理结果
       console.log('主图上传结果:', res.datas.mainImages);
       console.log('详情图上传结果:', res.datas.detailImages);
       console.log('视频上传结果:', res.datas.videos);
     }
   });
 };
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 调用组件内部upload方法上传
const ComponentUploadTemplate: Story<HyUploadComponent> = (args: any) => {
  // 文件选择变化事件
  args.onFileChange = function (event: any) {
    console.log('文件列表变化:', event);
    // selectedFiles 通过双向绑定自动更新，无需手动赋值
    this.uploadResult = null;
    this.uploadError = null;
  };

  // 调用组件upload方法上传
  args.callComponentUpload = function () {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      $hyapi.msg.createTips('warning', '请先选择文件');
      return;
    }

    // 通过ViewChild获取组件引用并调用upload方法
    if (this.uploadComponent) {
      this.uploadResult = null;
      this.uploadError = null;
      this.uploadComponent.upload(false);
    }
  };

  // 上传完成回调
  args.onUploadComplete = function (event: any) {
    if (event.resBody) {
      this.uploadResult = event.resBody;
      $hyapi.msg.createTips('success', '文件上传成功');
      console.log('组件上传成功:', event.resBody);
    } else {
      this.uploadError = event.resBody;
      $hyapi.msg.createTips('error', '文件上传失败');
      console.error('组件上传失败:', event.resBody);
    }
  };

  // 上传前准备事件
  args.onBeforeUploadPrepare = function (fileList: any[]) {
    console.log('准备上传文件:', fileList);
    this.uploading = true;
  };

  return {
    props: args,
    template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>🔧 调用组件内部upload方法</h4>
        <p>选择文件后，调用hy-upload组件内部的upload()方法进行上传</p>
        
        <hy-upload
          #uploadComponent
          uploadButtonTitle="选择文件"
          [url]="url"
          [hideUploadButton]="false"
          [showFileName]="true"
          [(fileList)]="selectedFiles"
          (fileListChange)="onFileChange($event)"
          (onUploadCompleteItem)="onUploadComplete($event)"
          (onBeforeUploadPrepare)="onBeforeUploadPrepare($event)"
        ></hy-upload>
        
        <div style="margin-top: 15px;" *ngIf="selectedFiles && selectedFiles.length > 0">
          <h5>✅ 已选择的文件：</h5>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li *ngFor="let file of selectedFiles" style="margin: 5px 0;">
              📁 {{file.name}}
            </li>
          </ul>
          
          <div style="margin-top: 15px;">
            <button nz-button nzType="primary" 
                    [nzLoading]="uploading" 
                    (click)="callComponentUpload()" 
                    style="margin-right: 10px;">
              🚀 调用组件upload方法
            </button>
          </div>
        </div>
        
        <div style="margin-top: 20px;">
          <h5>📝 说明：</h5>
          <ul style="margin: 10px 0; padding-left: 20px; font-size: 14px; color: #666;">
            <li>通过模板引用变量 <code>#uploadComponent</code> 获取组件实例</li>
            <li>调用组件的 <code>upload()</code> 方法触发上传</li>
            <li>组件内部会处理FormData构建、加密、请求发送等逻辑</li>
            <li>支持所有组件原生的配置选项（加密、大小限制、类型限制等）</li>
          </ul>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>📊 上传结果</h4>
        <div *ngIf="uploadResult" style="padding: 15px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 6px;">
          <h5 style="color: #52c41a; margin: 0 0 10px 0;">✅ 上传成功</h5>
          <pre style="margin: 0; white-space: pre-wrap; font-size: 12px;">{{uploadResult | json}}</pre>
        </div>
        
        <div *ngIf="uploadError" style="padding: 15px; background: #fff2f0; border: 1px solid #ffccc7; border-radius: 6px;">
          <h5 style="color: #ff4d4f; margin: 0 0 10px 0;">❌ 上传失败</h5>
          <pre style="margin: 0; white-space: pre-wrap; font-size: 12px;">{{uploadError | json}}</pre>
        </div>
      </div>
    </div>
    `
  };
};

export const componentUpload = ComponentUploadTemplate.bind({});
componentUpload.args = {
  url: 'http://127.0.0.1:3001/uploadFile',
  selectedFiles: [],
  uploading: false,
  uploadResult: null,
  uploadError: null
};
componentUpload.storyName = '手动控制上传（调用组件upload方法）';
componentUpload.parameters = {
  docs: {
    description: {
      story: `
## 手动控制上传（调用组件upload方法）

通过获取 \`hy-upload\` 组件实例，直接调用其内部的 \`upload()\` 方法进行上传。

### 🎯 适用场景

#### 需要复用组件内部逻辑
- 利用组件已有的加密、验证、错误处理逻辑
- 保持与组件默认行为的一致性
- 减少重复代码，提高维护性

#### 需要精确控制上传时机
- 表单验证通过后再上传
- 批量操作中的单独上传控制
- 复杂业务流程中的上传节点

### 🔧 实现方式

#### 1. 获取组件引用
使用模板引用变量获取组件实例：
\`\`\`html
<hy-upload #uploadComponent></hy-upload>
\`\`\`

#### 2. 调用upload方法
通过组件引用调用内部方法：
\`\`\`typescript
// 基础调用
this.uploadComponent.upload();

// 错误时保留文件（可选参数）
this.uploadComponent.upload(true);
\`\`\`

### 📋 方法参数

#### upload(isErrorSaveFile?: boolean)
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| isErrorSaveFile | 接口报错时是否保留已选文件 | boolean | false |

### 🔄 组件内部处理流程

1. **文件验证**: 检查文件数量、大小、类型等限制
2. **数据准备**: 构建FormData，处理uploadData
3. **加密处理**: 根据配置进行文件和数据加密
4. **请求发送**: 调用$hyapi.io.post发送请求
5. **状态管理**: 更新上传状态和进度显示
6. **结果处理**: 触发成功/失败回调事件

### ⚡ 优势对比

| 特性 | 调用组件方法 | 主动调用post |
|------|-------------|-------------|
| **代码复杂度** | ✅ 简单 | ❌ 复杂 |
| **功能完整性** | ✅ 完整 | ⚠️ 需自行实现 |
| **配置一致性** | ✅ 完全一致 | ⚠️ 可能不一致 |
| **维护成本** | ✅ 低 | ❌ 高 |
| **自定义程度** | ⚠️ 受限于组件 | ✅ 完全自定义 |

### 💡 最佳实践

- **推荐场景**: 需要利用组件完整功能的场景
- **注意事项**: 确保组件已配置好url等必要参数
- **错误处理**: 监听\`onUploadCompleteItem\`事件处理结果
- **状态同步**: 监听\`onBeforeUploadPrepare\`事件更新UI状态
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 通过模板引用获取组件实例 -->
<hy-upload
  #uploadComponent
  uploadButtonTitle="选择文件"
  [url]="uploadUrl"
  [hideUploadButton]="false"
  [showFileName]="true"
  [(fileList)]="selectedFiles"
  (fileListChange)="onFileChange($event)"
  (onUploadCompleteItem)="onUploadComplete($event)"
  (onBeforeUploadPrepare)="onBeforeUploadPrepare($event)">
</hy-upload>

<!-- 手动触发上传 -->
<div *ngIf="selectedFiles.length > 0">
  <h5>已选择文件：</h5>
  <ul>
    <li *ngFor="let file of selectedFiles">
      {{file.name}}
    </li>
  </ul>
  
  <button nz-button nzType="primary" 
          [nzLoading]="uploading" 
          (click)="callComponentUpload()">
    调用组件upload方法
  </button>
</div>

<!-- 上传结果显示 -->
<div *ngIf="uploadResult">
  <h5>上传成功</h5>
  <pre>{{uploadResult | json}}</pre>
</div>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, ViewChild } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HyUploadComponent } from '@hy/frame';
import { $hyapi } from '@hy/frame';

@Component({
  selector: 'app-component-upload-demo',
  templateUrl: './component-upload-demo.component.html'
})
export class ComponentUploadDemoComponent {
  @ViewChild('uploadComponent') uploadComponent!: HyUploadComponent;
  
  uploadUrl = 'http://your-api.com/upload';
  selectedFiles: NzUploadFile[] = [];
  uploading = false;
  uploadResult: any = null;
  uploadError: any = null;

  // 文件选择变化事件
  onFileChange(event: any) {
    console.log('文件列表变化:', event);
    // selectedFiles 通过双向绑定自动更新
    this.uploadResult = null;
    this.uploadError = null;
  }

  // 调用组件内部upload方法
  callComponentUpload() {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      $hyapi.msg.createTips('warning', '请先选择文件');
      return;
    }
    
    // 调用组件的upload方法
    // 参数：isErrorSaveFile - 接口报错时是否保留文件
    this.uploadComponent.upload(false);
  }

  // 上传完成回调
  onUploadComplete(event: any) {
    this.uploading = false;
    
    if (event.resBody) {
      this.uploadResult = event.resBody;
      $hyapi.msg.createTips('success', '文件上传成功');
      console.log('组件上传成功:', event.resBody);
    } else {
      this.uploadError = event.resBody;
      $hyapi.msg.createTips('error', '文件上传失败');
      console.error('组件上传失败:', event.resBody);
    }
  }

  // 上传前准备事件
  onBeforeUploadPrepare(fileList: any[]) {
    console.log('准备上传文件:', fileList);
    this.uploading = true;
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "应用场景",
      template: previewTemplate`
// ============= 1. 表单验证后上传 =============
submitForm() {
  if (this.formValid) {
    // 表单验证通过，开始上传文件
    this.uploadComponent.upload();
  } else {
    $hyapi.msg.createTips('warning', '请先完善表单信息');
  }
}

// ============= 2. 批量文件处理 =============
processBatchFiles() {
  // 逐个处理多个上传组件
  this.uploadComponents.forEach((component, index) => {
    setTimeout(() => {
      component.upload(true); // 错误时保留文件
    }, index * 1000); // 每秒处理一个
  });
}

// ============= 3. 条件触发上传 =============
conditionalUpload() {
  // 根据业务条件决定是否上传
  if (this.userPermission.canUpload) {
    if (this.selectedFiles.length > 0) {
      this.uploadComponent.upload();
    }
  } else {
    $hyapi.msg.createTips('error', '您没有上传权限');
  }
}

// ============= 4. 复杂业务流程中的上传 =============
async businessProcess() {
  try {
    // 步骤1：保存基础信息
    const saveResult = await this.saveBasicInfo();
    
    // 步骤2：上传相关文件
    if (saveResult.success && this.hasFiles()) {
      this.uploadComponent.upload();
    }
    
    // 步骤3：其他业务逻辑...
  } catch (error) {
    console.error('业务流程处理失败:', error);
  }
}

// ============= 5. 带确认的上传 =============
confirmAndUpload() {
  const fileCount = this.selectedFiles.length;
  const confirmMsg = \`确定要上传 \${fileCount} 个文件吗？\`;
  
  $hyapi.modal.confirm(confirmMsg, {
    onOk: () => {
      this.uploadComponent.upload();
    },
    onCancel: () => {
      console.log('用户取消上传');
    }
  });
}

// ============= 6. 错误重试机制 =============
retryUpload() {
  // 上传失败后重试，保留已选文件
  this.uploadComponent.upload(true);
}

// ============= 7. 状态同步处理 =============
onBeforeUploadPrepare(fileList: any[]) {
  // 上传开始前的处理
  this.uploading = true;
  this.progress = 0;
  this.statusMessage = '正在准备上传...';
}

onUploadComplete(event: any) {
  // 上传完成后的处理
  this.uploading = false;
  this.progress = 100;
  
  if (event.resBody) {
    this.statusMessage = '上传成功';
    this.handleUploadSuccess(event.resBody);
  } else {
    this.statusMessage = '上传失败';
    this.handleUploadError(event.resBody);
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

