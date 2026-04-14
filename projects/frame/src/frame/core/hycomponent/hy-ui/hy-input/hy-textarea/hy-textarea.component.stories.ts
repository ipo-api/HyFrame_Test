import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyTextareaComponent } from './hy-textarea.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService, $hyapi } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

const argTypes = unit.createArgTypes('HyTextareaComponent');
export default {
  title: '表单组件/hy-textarea（文本框）',  
  component: HyTextareaComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [ModelService, TableService]
    }),
  ],
  argTypes
} as Meta;

// 基础用法
const BasicTemplate: Story<HyTextareaComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础文本框功能</h3>
      <p>最简单的多行文本输入框，支持自适应高度和基础验证</p>
      
      <hy-form>
        <hy-gt model="basicDemo">
          <hy-title title="基础文本框sssssssssssssss"></hy-title>

          <hy-textarea 
            title="基础文本框" 
            model="basicText"
            placeholder="请输入文本内容..."
            cols="24">
          </hy-textarea>
            <hy-title title="基础文本框34444444444"></hy-title>
          <hy-textarea 
            title="自适应高度" 
            model="autoText"
            placeholder="输入内容会自动调整高度..."
            [autosize]="true"
            cols="24">
          </hy-textarea>
          
          <hy-textarea 
            title="固定行数" 
            model="fixedText"
            placeholder="固定4行高度..."
            [autosize]="{minRows: 4, maxRows: 4}"
            cols="24">
          </hy-textarea>
        </hy-gt>
      </hy-form>
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

多行文本输入框组件，适用于需要输入较长文本内容的场景。

### 特性
- 支持多行文本输入，适合长文本内容
- 自适应内容高度，可设置最小和最大行数
- 内置表单验证支持，如必填、最大长度等
- 支持占位符文本和各种布局配置
- 继承自 HyBaseInput，具备完整的表单功能

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| title | 文本框标题 | string | - |
| model | 表单字段名 | string | - |
| placeholder | 占位符文本 | string | '' |
| autosize | 自适应高度 | boolean \\| object | {minRows: 4, maxRows: 4} |
| cols | 栅格布局列数 | number \\| string | - |
| enable | 是否可编辑 | boolean | true |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="demo">
    <hy-textarea 
      title="基础文本框" 
      model="content"
      placeholder="请输入文本内容..."
      cols="24">
    </hy-textarea>
    
    <hy-textarea 
      title="自适应高度" 
      model="autoContent"
      [autosize]="true"
      cols="24">
    </hy-textarea>
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
  selector: 'app-textarea-demo',
  templateUrl: './textarea-demo.component.html'
})
export class TextareaDemoComponent {
  // 表单数据
  formData = {
    content: '',
    autoContent: '',
    description: ''
  };

  // 处理文本变化
  onTextChange(value: string, field: string) {
    this.formData[field] = value;
    console.log(\`\${field} 内容变化:\`, value);
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "应用场景",
      template: previewTemplate`
// 1. 文章内容编辑
<hy-textarea 
  title="文章内容" 
  model="articleContent"
  placeholder="请输入文章内容..."
  [autosize]="{minRows: 6, maxRows: 12}"
  cols="24">
</hy-textarea>

// 2. 用户反馈表单
<hy-textarea 
  title="意见反馈" 
  model="feedback"
  placeholder="请描述您遇到的问题或建议..."
  [ckRequired]="true"
  [ckMaxLength]="500"
  cols="24">
</hy-textarea>

// 3. 备注信息
<hy-textarea 
  title="备注" 
  model="remark"
  placeholder="请输入备注信息（可选）..."
  [autosize]="{minRows: 2, maxRows: 4}"
  cols="12">
</hy-textarea>
      `,
      language: "html",
      copy: true
    }
  ]
};

// 高度配置
const AutosizeTemplate: Story<HyTextareaComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>高度自适应配置</h4>
        <p>通过 autosize 属性控制文本框的高度行为</p>
        
        <hy-form>
          <hy-gt model="autosizeDemo" labelWidth="120px">
            <hy-textarea 
              title="自由高度" 
              model="freeHeight"
              placeholder="高度完全自适应内容，无限制..."
              [autosize]="true"
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="最小2行" 
              model="minHeight"
              placeholder="最少显示2行，内容多时自动增高..."
              [autosize]="{minRows: 2}"
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="2-6行范围" 
              model="rangeHeight"
              placeholder="高度在2-6行之间，超出显示滚动条..."
              [autosize]="{minRows: 2, maxRows: 6}"
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="固定4行" 
              model="fixedHeight"
              placeholder="固定4行高度，内容多时显示滚动条..."
              [autosize]="{minRows: 4, maxRows: 4}"
              cols="24">
            </hy-textarea>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const autosize = AutosizeTemplate.bind({});
autosize.args = {};
autosize.storyName = '高度配置';
autosize.parameters = {
  docs: {
    description: {
      story: `
## 高度配置

通过 \`autosize\` 属性灵活控制文本框的高度表现，适应不同的使用场景。

### 🎛️ 高度配置选项

#### 自适应模式
- **true**: 高度完全跟随内容变化，无行数限制
- **false**: 使用默认固定高度，不自适应

#### 对象配置模式
- **minRows**: 设置最小显示行数
- **maxRows**: 设置最大显示行数
- **同时设置**: 在指定范围内自适应

### 📏 配置对比

| 配置 | 效果 | 适用场景 |
|------|------|----------|
| \`autosize={true}\` | 无限制自适应 | 长文本输入，如文章编辑 |
| \`autosize={minRows: 2}\` | 最少2行，可无限增高 | 评论、描述输入 |
| \`autosize={maxRows: 6}\` | 最多6行，超出滚动 | 限制界面高度的场景 |
| \`autosize={minRows: 2, maxRows: 6}\` | 2-6行范围内自适应 | 平衡体验的通用场景 |
| \`autosize={minRows: 4, maxRows: 4}\` | 固定4行高度 | 固定布局需求 |

### 💡 最佳实践
- **短文本场景**: 使用 \`{minRows: 2, maxRows: 4}\`
- **中等文本场景**: 使用 \`{minRows: 3, maxRows: 8}\`
- **长文本场景**: 使用 \`autosize={true}\` 或设置较大的 maxRows
- **固定布局**: 使用相同的 minRows 和 maxRows 值
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 自由高度 -->
<hy-textarea 
  title="自由高度" 
  model="content1"
  [autosize]="true"
  cols="24">
</hy-textarea>

<!-- 限制范围 -->
<hy-textarea 
  title="2-6行范围" 
  model="content2"
  [autosize]="{minRows: 2, maxRows: 6}"
  cols="24">
</hy-textarea>

<!-- 固定高度 -->
<hy-textarea 
  title="固定4行" 
  model="content3"
  [autosize]="{minRows: 4, maxRows: 4}"
  cols="24">
</hy-textarea>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-autosize-demo',
  templateUrl: './autosize-demo.component.html'
})
export class AutosizeDemoComponent {
  // 不同场景的高度配置
  autosizeConfigs = {
    // 评论输入 - 自适应但有上限
    comment: { minRows: 2, maxRows: 8 },
    
    // 文章编辑 - 完全自适应
    article: true,
    
    // 描述输入 - 固定中等高度
    description: { minRows: 3, maxRows: 3 },
    
    // 反馈表单 - 适中范围
    feedback: { minRows: 4, maxRows: 10 }
  };

  // 动态设置高度配置
  getAutosizeConfig(type: string) {
    return this.autosizeConfigs[type] || { minRows: 2, maxRows: 4 };
  }

  // 处理内容变化
  onContentChange(value: string, type: string) {
    console.log(\`\${type} 内容长度:\`, value.length);
    
    // 根据内容长度动态调整提示
    if (value.length > 500) {
      console.log('内容较长，建议检查排版');
    }
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "应用场景",
      template: previewTemplate`
// 1. 博客文章编辑 - 无限制自适应
<hy-textarea 
  title="文章内容" 
  model="article"
  [autosize]="true"
  placeholder="请输入文章内容，支持长文本..."
  cols="24">
</hy-textarea>

// 2. 商品描述 - 适中范围
<hy-textarea 
  title="商品描述" 
  model="description"
  [autosize]="{minRows: 3, maxRows: 8}"
  placeholder="请详细描述商品特点..."
  cols="24">
</hy-textarea>

// 3. 用户评论 - 小到中范围
<hy-textarea 
  title="评论内容" 
  model="comment"
  [autosize]="{minRows: 2, maxRows: 6}"
  placeholder="分享你的想法..."
  cols="24">
</hy-textarea>

// 4. 表单备注 - 固定小高度
<hy-textarea 
  title="备注" 
  model="remark"
  [autosize]="{minRows: 2, maxRows: 2}"
  placeholder="可选的备注信息..."
  cols="12">
</hy-textarea>

// 5. 问题反馈 - 中等范围
<hy-textarea 
  title="问题描述" 
  model="issue"
  [autosize]="{minRows: 4, maxRows: 12}"
  placeholder="请详细描述遇到的问题..."
  [ckRequired]="true"
  cols="24">
</hy-textarea>
      `,
      language: "html",
      copy: true
    }
  ]
};

// 验证配置
const ValidationTemplate: Story<HyTextareaComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>表单验证功能</h4>
        <p>内置多种验证规则，确保数据输入的正确性</p>
        
        <hy-form>
          <hy-gt model="validationDemo" labelWidth="140px">
            <hy-textarea 
              title="必填文本框" 
              model="requiredText"
              placeholder="这是必填字段..."
              [ckRequired]="true"
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="限制长度(100字)" 
              model="limitedText"
              placeholder="最多只能输入100个字符..."
              [ckMaxLength]="100"
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="必填+长度限制" 
              model="bothText"
              placeholder="必填且最多200字符..."
              [ckRequired]="true"
              [ckMaxLength]="200"
              [autosize]="{minRows: 3, maxRows: 6}"
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="禁用状态" 
              model="disabledText"
              placeholder="这个文本框被禁用了..."
              [enable]="false"
              cols="24">
            </hy-textarea>
          </hy-gt>
        </hy-form>
        
        <div style="margin-top: 20px; padding: 15px; background: #f6f8fa; border-radius: 4px;">
          <h5>📝 验证说明：</h5>
          <ul style="margin: 10px 0; padding-left: 20px; font-size: 14px;">
            <li><strong>必填验证</strong>：设置 <code>[ckRequired]="true"</code></li>
            <li><strong>长度限制</strong>：设置 <code>[ckMaxLength]="数字"</code></li>
            <li><strong>禁用控制</strong>：设置 <code>[enable]="false"</code></li>
            <li><strong>组合验证</strong>：可以同时设置多个验证规则</li>
          </ul>
        </div>
      </div>
    </div>
  `
});

export const validation = ValidationTemplate.bind({});
validation.args = {};
validation.storyName = '验证配置';
validation.parameters = {
  docs: {
    description: {
      story: `
## 验证配置

组件内置完善的表单验证功能，支持必填、长度限制等常用验证规则。

### 🛡️ 支持的验证类型

#### 必填验证 (ckRequired)
- 设置 \`[ckRequired]="true"\` 启用必填验证
- 提交表单时会自动检查是否为空
- 配合表单验证框架提供错误提示

#### 长度限制 (ckMaxLength)
- 设置 \`[ckMaxLength]="数字"\` 限制最大字符数
- 超出长度时自动截断或提示错误
- 支持中英文字符混合计算

#### 可用性控制 (enable)
- 设置 \`[enable]="false"\` 禁用输入
- 禁用状态下显示灰色样式
- 可以动态切换启用/禁用状态

### 📋 验证配置对比

| 验证类型 | 配置方式 | 触发时机 | 错误处理 |
|---------|----------|----------|----------|
| 必填验证 | \`[ckRequired]="true"\` | 表单提交/失焦 | 显示错误提示 |
| 长度限制 | \`[ckMaxLength]="100"\` | 输入时实时检查 | 阻止输入/提示 |
| 禁用控制 | \`[enable]="false"\` | 立即生效 | 样式变化 |

### 🎯 验证最佳实践

#### 用户体验优化
- 必填字段要有明确的视觉标识
- 长度限制要提供实时字符计数
- 错误信息要简洁明确
- 验证要在合适的时机触发

#### 业务场景应用
- **用户反馈**: 必填 + 适当长度限制
- **文章编辑**: 长度限制但不必填
- **系统配置**: 严格验证 + 禁用控制
- **评论输入**: 必填 + 防刷屏长度限制

### 💡 技术要点
- 继承自 HyBaseInput，具备完整验证能力
- 支持与 Angular Reactive Forms 集成
- 可自定义验证规则和错误信息
- 支持异步验证和服务端验证集成
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="demo">
    <!-- 必填验证 -->
    <hy-textarea 
      title="必填文本框" 
      model="required"
      [ckRequired]="true"
      placeholder="请输入内容（必填）..."
      cols="24">
    </hy-textarea>
    
    <!-- 长度限制 -->
    <hy-textarea 
      title="限制长度" 
      model="limited"
      [ckMaxLength]="200"
      placeholder="最多200字符..."
      cols="24">
    </hy-textarea>
    
    <!-- 组合验证 -->
    <hy-textarea 
      title="组合验证" 
      model="combined"
      [ckRequired]="true"
      [ckMaxLength]="500"
      placeholder="必填且最多500字符..."
      cols="24">
    </hy-textarea>
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-validation-demo',
  templateUrl: './validation-demo.component.html'
})
export class ValidationDemoComponent {
  // 表单控制
  form: FormGroup;
  
  // 动态验证配置
  validationConfig = {
    feedback: {
      required: true,
      maxLength: 500,
      minLength: 10
    },
    description: {
      required: false,
      maxLength: 200
    }
  };

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      feedback: ['', [
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(10)
      ]],
      description: ['', [
        Validators.maxLength(200)
      ]]
    });
  }

  // 处理验证错误
  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    
    if (field?.errors) {
      if (field.errors['required']) {
        return '此字段为必填项';
      }
      if (field.errors['maxlength']) {
        const max = field.errors['maxlength'].requiredLength;
        return \`最多输入\${max}个字符\`;
      }
      if (field.errors['minlength']) {
        const min = field.errors['minlength'].requiredLength;
        return \`最少输入\${min}个字符\`;
      }
    }
    
    return '';
  }

  // 获取字符计数
  getCharCount(fieldName: string): string {
    const value = this.form.get(fieldName)?.value || '';
    const maxLength = this.validationConfig[fieldName]?.maxLength;
    
    if (maxLength) {
      return \`\${value.length}/\${maxLength}\`;
    }
    
    return \`\${value.length}\`;
  }

  // 表单提交
  onSubmit() {
    if (this.form.valid) {
      console.log('表单数据:', this.form.value);
    } else {
      console.log('表单验证失败');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "验证示例",
      template: previewTemplate`
// 1. 动态验证配置
interface ValidationRule {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
}

// 根据业务场景配置验证
const validationRules: Record<string, ValidationRule> = {
  // 用户反馈 - 严格验证
  userFeedback: {
    required: true,
    minLength: 10,
    maxLength: 500
  },
  
  // 商品描述 - 中等验证
  productDesc: {
    required: true,
    maxLength: 200
  },
  
  // 备注信息 - 宽松验证
  remark: {
    required: false,
    maxLength: 100
  },
  
  // 技术文档 - 长文本
  document: {
    required: true,
    minLength: 50,
    maxLength: 5000
  }
};

// 2. 自定义验证器
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// 禁用词检查
export function forbiddenWordsValidator(words: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toLowerCase() || '';
    const hasForbiddenWord = words.some(word => 
      value.includes(word.toLowerCase())
    );
    
    return hasForbiddenWord ? { forbiddenWords: { words } } : null;
  };
}

// 使用自定义验证器
this.form = this.fb.group({
  content: ['', [
    Validators.required,
    Validators.maxLength(1000),
    forbiddenWordsValidator(['spam', 'ad', 'promotion'])
  ]]
});

// 3. 异步验证示例
export function uniqueContentValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }
    
    // 模拟服务器验证
    return this.http.post('/api/validate-content', { content: control.value })
      .pipe(
        map(result => result.isUnique ? null : { notUnique: true }),
        catchError(() => of(null))
      );
  };
}

// 4. 实时字符统计
@Component({
  template: \`
    <hy-textarea 
      title="内容输入" 
      model="content"
      [ckMaxLength]="maxLength"
      (onChange_model)="onContentChange($event)"
      cols="24">
    </hy-textarea>
    
    <div class="char-counter">
      已输入 {{charCount}}/{{maxLength}} 字符
      <span [class]="getCounterClass()">
        {{getRemainingChars()}}
      </span>
    </div>
  \`
})
export class ContentInputComponent {
  maxLength = 500;
  charCount = 0;
  
  onContentChange(value: string) {
    this.charCount = value.length;
  }
  
  getRemainingChars(): string {
    const remaining = this.maxLength - this.charCount;
    return remaining >= 0 ? \`还可输入\${remaining}字符\` : \`超出\${-remaining}字符\`;
  }
  
  getCounterClass(): string {
    const remaining = this.maxLength - this.charCount;
    if (remaining < 0) return 'text-danger';
    if (remaining < 50) return 'text-warning';
    return 'text-muted';
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 提示功能
const TipTemplate: Story<HyTextareaComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>提示功能展示</h4>
        <p>支持多种提示方式，帮助用户更好地理解输入要求</p>
        
        <hy-form>
          <hy-gt model="tipDemo" labelWidth="140px">
            <hy-textarea 
              title="默认提示" 
              model="defaultTip"
              placeholder="输入文本内容..."
              tip="这是默认的右侧提示信息"
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="底部提示" 
              model="bottomTip"
              placeholder="输入文本内容..."
              tip="这是底部提示信息，会显示在文本框下方"
              tipType="bottomTip"
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="模板提示" 
              model="templateTip"
              placeholder="输入文本内容..."
              [tip]="complexTip"
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="底部模板提示" 
              model="bottomTemplateTip"
              placeholder="输入文本内容..."
              [tip]="richTip"
              tipType="bottomTip"
              cols="24">
            </hy-textarea>
          </hy-gt>
        </hy-form>
        
        <!-- 复杂提示模板 -->
        <ng-template #complexTip>
          <div style="color: #1890ff;">
            <i>💡</i> <strong>提示：</strong>
            <ul style="margin: 5px 0; padding-left: 15px;">
              <li>支持多行文本输入</li>
              <li>建议控制在200字以内</li>
              <li>可以包含标点符号</li>
            </ul>
          </div>
        </ng-template>
        
        <!-- 丰富提示模板 -->
        <ng-template #richTip>
          <div style="padding: 10px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 4px;">
            <div style="color: #52c41a; font-weight: bold; margin-bottom: 5px;">
              📝 输入建议
            </div>
            <div style="font-size: 12px; color: #666;">
              • 详细描述有助于我们更好地理解您的需求<br/>
              • 建议包含具体的场景和期望结果<br/>
              • 如有相关截图或链接，也可一并提供
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `
});

export const tip = TipTemplate.bind({});
tip.args = {};
tip.storyName = '提示功能';
tip.parameters = {
  docs: {
    description: {
      story: `
## 提示功能

通过 \`tip\` 和 \`tipType\` 属性为文本框添加各种形式的提示信息，改善用户体验。

### 🎯 提示类型

#### 文本提示
- 设置 \`tip="提示文字"\` 显示简单文本提示
- 默认显示在标题右侧
- 适合简短的说明文字

#### 模板提示
- 设置 \`[tip]="模板引用"\` 显示复杂内容
- 支持 HTML 标签和样式
- 适合需要格式化的提示内容

### 📍 提示位置

#### 默认位置 (default)
- 显示在标题右侧
- 节省垂直空间
- 适合简短提示

#### 底部位置 (bottomTip)
- 显示在文本框下方
- 适合较长的提示内容
- 不影响表单布局对齐

### 🎨 提示样式

| 提示类型 | 位置 | 适用场景 |
|---------|------|----------|
| 文字 + default | 标题右侧 | 简短说明 |
| 文字 + bottomTip | 文本框下方 | 较长说明 |
| 模板 + default | 标题右侧 | 结构化提示 |
| 模板 + bottomTip | 文本框下方 | 复杂格式提示 |

### 💡 提示内容设计原则
- **简洁明了**: 提示文字要简洁易懂
- **有用性**: 提供真正有帮助的信息
- **时机合适**: 在用户需要时显示
- **视觉和谐**: 样式与整体设计协调
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="demo">
    <!-- 文字提示 -->
    <hy-textarea 
      title="默认提示" 
      model="content1"
      tip="这是右侧提示"
      cols="24">
    </hy-textarea>
    
    <!-- 底部文字提示 -->
    <hy-textarea 
      title="底部提示" 
      model="content2"
      tip="这是底部提示信息"
      tipType="bottomTip"
      cols="24">
    </hy-textarea>
    
    <!-- 模板提示 -->
    <hy-textarea 
      title="模板提示" 
      model="content3"
      [tip]="customTip"
      cols="24">
    </hy-textarea>
  </hy-gt>
</hy-form>

<!-- 自定义提示模板 -->
<ng-template #customTip>
  <div style="color: #1890ff;">
    <strong>💡 输入提示：</strong>
    <ul style="margin: 5px 0; padding-left: 15px;">
      <li>建议控制在200字以内</li>
      <li>支持中英文混合输入</li>
    </ul>
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
  selector: 'app-tip-demo',
  templateUrl: './tip-demo.component.html'
})
export class TipDemoComponent {
  @ViewChild('helpTip', { static: true }) helpTip: TemplateRef<any>;
  @ViewChild('warningTip', { static: true }) warningTip: TemplateRef<any>;
  
  // 动态提示配置
  tipConfigs = {
    username: {
      text: '用户名长度在3-20个字符之间',
      type: 'default'
    },
    feedback: {
      template: this.helpTip,
      type: 'bottomTip'
    },
    sensitive: {
      template: this.warningTip,
      type: 'bottomTip'
    }
  };

  // 根据输入内容动态显示提示
  getDynamicTip(value: string): string {
    if (!value) {
      return '请输入内容';
    }
    
    if (value.length < 10) {
      return '建议输入更详细的内容';
    }
    
    if (value.length > 200) {
      return '内容过长，建议精简';
    }
    
    return '内容长度合适';
  }

  // 根据验证状态显示不同提示
  getValidationTip(fieldName: string, isValid: boolean): string {
    const tips = {
      email: {
        valid: '邮箱格式正确',
        invalid: '请输入正确的邮箱格式'
      },
      phone: {
        valid: '手机号格式正确', 
        invalid: '请输入11位手机号'
      }
    };
    
    return tips[fieldName]?.[isValid ? 'valid' : 'invalid'] || '';
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "模板技巧",
      template: previewTemplate`
<!-- 1. 动态提示颜色 -->
<ng-template #dynamicTip let-status="status">
  <span [ngStyle]="{color: getTipColor(status)}">
    {{getTipMessage(status)}}
  </span>
</ng-template>

<!-- 2. 带图标的提示 -->
<ng-template #iconTip>
  <div style="display: flex; align-items: center;">
    <i nz-icon nzType="info-circle" style="color: #1890ff; margin-right: 4px;"></i>
    <span>详细说明信息</span>
  </div>  
</ng-template>

<!-- 3. 多级提示内容 -->
<ng-template #levelTip>
  <div>
    <div style="font-weight: bold; color: #333;">输入要求：</div>
    <div style="margin: 5px 0; color: #666;">
      • 必填项，不能为空<br/>
      • 长度在10-500字符之间<br/>
      • 不能包含特殊符号
    </div>
    <div style="font-size: 12px; color: #999;">
      提示：详细的描述有助于获得更好的服务
    </div>
  </div>
</ng-template>

<!-- 4. 交互式提示 -->
<ng-template #interactiveTip>
  <div style="background: #f0f5ff; padding: 8px; border-radius: 4px;">
    <div style="margin-bottom: 5px;">输入建议：</div>
    <button nz-button nzSize="small" (click)="insertTemplate('感谢')">插入感谢</button>
    <button nz-button nzSize="small" (click)="insertTemplate('问题')">插入问题模板</button>
  </div>
</ng-template>

<!-- 5. 进度提示 -->
<ng-template #progressTip let-length="length" let-max="max">
  <div style="display: flex; align-items: center;">
    <span style="margin-right: 8px;">{{length}}/{{max}}</span>
    <div style="width: 60px; height: 4px; background: #f0f0f0; border-radius: 2px;">
      <div 
        style="height: 100%; background: #1890ff; border-radius: 2px; transition: width 0.3s;"
        [style.width.%]="(length / max) * 100">
      </div>
    </div>
  </div>
</ng-template>

<!-- 6. 条件显示提示 -->
<hy-textarea 
  title="智能提示" 
  model="smartContent"
  [tip]="getSmartTip()"
  tipType="bottomTip"
  cols="24">
</hy-textarea>

<!-- TypeScript 支持方法 -->
getSmartTip(): TemplateRef<any> | string {
  const content = this.form.get('smartContent')?.value || '';
  
  if (content.length === 0) {
    return '开始输入内容...';
  } else if (content.length < 20) {
    return this.shortTip;  // 模板引用
  } else if (content.length > 200) {
    return this.longTip;   // 模板引用
  } else {
    return '内容长度合适';
  }
}

// 工具方法
getTipColor(status: string): string {
  const colors = {
    success: '#52c41a',
    warning: '#faad14', 
    error: '#ff4d4f',
    info: '#1890ff'
  };
  return colors[status] || '#666';
}

insertTemplate(type: string): void {
  const templates = {
    '感谢': '感谢您的反馈，我们会认真考虑您的建议。',
    '问题': '遇到的问题：\n重现步骤：\n期望结果：\n实际结果：'
  };
  
  const currentValue = this.form.get('content')?.value || '';
  const newValue = currentValue + templates[type];
  this.form.get('content')?.setValue(newValue);
}
      `,
      language: "html",
      copy: true
    }
  ]
};

// 布局配置
const LayoutTemplate: Story<HyTextareaComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>布局和样式配置</h4>
        <p>通过各种布局属性控制文本框在表单中的显示效果</p>
        
        <hy-form>
          <hy-gt model="layoutDemo">
            <hy-textarea 
              title="全宽文本框" 
              model="fullWidth"
              placeholder="占据整行宽度..."
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="半宽文本框" 
              model="halfWidth"
              placeholder="占据半行宽度..."
              cols="12">
            </hy-textarea>
            
            <hy-textarea 
              title="另一半宽度" 
              model="halfWidth2"
              placeholder="另一半宽度..."
              cols="12">
            </hy-textarea>
            
            <hy-textarea 
              title="无标题" 
              model="noTitle"
              placeholder="隐藏了标题标签..."
              [noLabel]="true"
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="无冒号" 
              model="noColon"
              placeholder="标题后没有冒号..."
              [noColon]="true"
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="自定义标题宽度文本框" 
              model="customLabelWidth"
              placeholder="标题宽度被设置为200px..."
              labelWidth="200px"
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="标题换行显示的超长标题文本" 
              model="labelWrap"
              placeholder="标题过长时会换行显示..."
              [isLabelWrap]="true"
              labelWidth="120px"
              cols="24">
            </hy-textarea>
            
            <hy-textarea 
              title="Flex布局" 
              model="flexLayout"
              placeholder="使用flex布局..."
              flex="1"
              cols="24">
            </hy-textarea>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const layout = LayoutTemplate.bind({});
layout.args = {};
layout.storyName = '布局配置';
layout.parameters = {
  docs: {
    description: {
      story: `
## 布局配置

通过多种布局属性灵活控制文本框在表单中的显示效果和排列方式。

### 📐 栅格布局 (cols)

#### 栅格系统说明
- 基于24栅格系统，\`cols\` 值从1-24
- \`cols="24"\` 占据整行宽度
- \`cols="12"\` 占据半行宽度  
- \`cols="8"\` 占据三分之一宽度
- \`cols="6"\` 占据四分之一宽度

### 🏷️ 标题配置

#### 标题显示控制
- **noLabel**: 设置为 \`true\` 隐藏标题标签
- **noColon**: 设置为 \`true\` 隐藏标题后的冒号

#### 标题宽度设置
- **labelWidth**: 设置标题区域的固定宽度
- **isLabelWrap**: 标题过长时是否允许换行

### 🔧 Flex 布局

#### Flex 属性支持
- **flex**: 设置 flex 布局属性
- 支持数字（如 \`flex="1"\`）和字符串值
- 可实现更灵活的响应式布局

### 📋 布局配置对比

| 配置项 | 作用 | 适用场景 |
|--------|------|----------|
| \`cols="24"\` | 全宽显示 | 长文本输入、独占一行 |
| \`cols="12"\` | 半宽显示 | 两列布局、节省空间 |
| \`noLabel="true"\` | 隐藏标题 | 简洁布局、自定义标题 |
| \`labelWidth="150px"\` | 固定标题宽度 | 对齐整齐、统一样式 |
| \`isLabelWrap="true"\` | 标题换行 | 长标题、移动端适配 |
| \`flex="1"\` | 弹性布局 | 响应式、复杂布局 |

### 💡 布局最佳实践

#### 表单对齐
- 同一表单内使用统一的 \`labelWidth\`
- 长短字段合理搭配，避免空白过多
- 重要字段使用全宽，次要字段可并排

#### 响应式设计
- 移动端建议使用 \`cols="24"\`
- 桌面端可根据内容重要性选择合适宽度
- 使用 \`flex\` 属性实现自适应布局

#### 用户体验
- 相关字段放在同一行，提高填写效率
- 标题文字简洁明了，避免过长换行
- 保持视觉层次清晰，重要字段突出显示
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="demo">
    <!-- 全宽布局 -->
    <hy-textarea 
      title="文章内容" 
      model="article"
      cols="24">
    </hy-textarea>
    
    <!-- 双列布局 -->
    <hy-textarea 
      title="简介" 
      model="intro"
      cols="12">
    </hy-textarea>
    <hy-textarea 
      title="备注" 
      model="remark"
      cols="12">
    </hy-textarea>
    
    <!-- 标题配置 -->
    <hy-textarea 
      title="自定义标题宽度" 
      model="custom"
      labelWidth="150px"
      cols="24">
    </hy-textarea>
    
    <!-- 无标题 -->
    <hy-textarea 
      model="noTitle"
      [noLabel]="true"
      placeholder="无标题文本框..."
      cols="24">
    </hy-textarea>
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
  selector: 'app-layout-demo',
  templateUrl: './layout-demo.component.html'
})
export class LayoutDemoComponent {
  // 响应式布局配置
  layoutConfig = {
    mobile: {
      cols: 24,
      labelWidth: '100px'
    },
    tablet: {
      cols: 12,
      labelWidth: '120px'
    },
    desktop: {
      cols: 8,
      labelWidth: '150px'
    }
  };

  // 当前设备类型
  deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';

  constructor() {
    this.detectDeviceType();
  }

  // 检测设备类型
  private detectDeviceType() {
    const width = window.innerWidth;
    
    if (width < 768) {
      this.deviceType = 'mobile';
    } else if (width < 1024) {
      this.deviceType = 'tablet';
    } else {
      this.deviceType = 'desktop';
    }
  }

  // 获取当前布局配置
  getCurrentLayout() {
    return this.layoutConfig[this.deviceType];
  }

  // 动态计算列宽
  getResponsiveCols(importance: 'high' | 'medium' | 'low'): number {
    const { deviceType } = this;
    
    if (deviceType === 'mobile') {
      return 24; // 移动端全宽
    }
    
    if (deviceType === 'tablet') {
      return importance === 'high' ? 24 : 12;
    }
    
    // 桌面端
    switch (importance) {
      case 'high': return 24;
      case 'medium': return 12;
      case 'low': return 8;
      default: return 24;
    }
  }

  // 表单字段配置
  fieldConfigs = [
    {
      name: 'title',
      label: '标题',
      importance: 'high' as const,
      required: true
    },
    {
      name: 'summary',
      label: '摘要',
      importance: 'medium' as const,
      required: true
    },
    {
      name: 'tags',
      label: '标签',
      importance: 'low' as const,
      required: false
    },
    {
      name: 'remark',
      label: '备注',
      importance: 'low' as const,
      required: false
    }
  ];
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "布局技巧",
      template: previewTemplate`
// 1. 响应式栅格配置
@Component({
  template: \`
    <hy-form>
      <hy-gt model="responsive">
        <hy-textarea 
          *ngFor="let field of fields"
          [title]="field.label"
          [model]="field.name"
          [cols]="getResponsiveCols(field)"
          [labelWidth]="getResponsiveLabelWidth()">
        </hy-textarea>
      </hy-gt>
    </hy-form>
  \`
})
export class ResponsiveFormComponent {
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateLayout();
  }

  getResponsiveCols(field: any): number {
    const breakpoint = this.getBreakpoint();
    
    // 根据断点和字段重要性返回列数
    if (breakpoint === 'xs') return 24;
    if (breakpoint === 'sm') return field.important ? 24 : 12;
    if (breakpoint === 'md') return field.important ? 24 : field.secondary ? 8 : 12;
    
    return field.cols || 24;
  }
}

// 2. 动态表单布局
interface FormField {
  name: string;
  label: string;
  type: 'textarea' | 'text' | 'select';
  layout: {
    cols: number;
    labelWidth?: string;
    noLabel?: boolean;
    flex?: any;
  };
}

@Component({
  template: \`
    <hy-form>
      <hy-gt model="dynamic">
        <ng-container *ngFor="let field of formFields">
          <hy-textarea 
            *ngIf="field.type === 'textarea'"
            [title]="field.label"
            [model]="field.name"
            [cols]="field.layout.cols"
            [labelWidth]="field.layout.labelWidth"
            [noLabel]="field.layout.noLabel"
            [flex]="field.layout.flex">
          </hy-textarea>
        </ng-container>
      </hy-gt>
    </hy-form>
  \`
})
export class DynamicFormComponent {
  formFields: FormField[] = [
    {
      name: 'title',
      label: '标题',
      type: 'textarea',
      layout: { cols: 24, labelWidth: '100px' }
    },
    {
      name: 'summary',
      label: '摘要',
      type: 'textarea', 
      layout: { cols: 12, labelWidth: '100px' }
    },
    {
      name: 'content',
      label: '内容',
      type: 'textarea',
      layout: { cols: 24, noLabel: false, flex: 1 }
    }
  ];
}

// 3. 条件布局
@Component({
  template: \`
    <hy-form>
      <hy-gt model="conditional">
        <!-- 根据表单状态调整布局 -->
        <hy-textarea 
          title="标题"
          model="title"
          [cols]="isEditMode ? 12 : 24"
          [labelWidth]="isEditMode ? '80px' : '120px'">
        </hy-textarea>
        
        <hy-textarea 
          *ngIf="isEditMode"
          title="状态"
          model="status"
          cols="12"
          labelWidth="80px">
        </hy-textarea>
        
        <!-- 根据用户权限显示不同布局 -->
        <hy-textarea 
          [title]="hasAdminRights ? '管理员备注' : '用户备注'"
          model="remark"
          [cols]="hasAdminRights ? 24 : 12"
          [noLabel]="!hasAdminRights"
          [enable]="hasEditRights">
        </hy-textarea>
      </hy-gt>
    </hy-form>
  \`
})
export class ConditionalLayoutComponent {
  isEditMode = false;
  hasAdminRights = false;
  hasEditRights = true;
  
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
}

// 4. 网格布局优化
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.form-grid .textarea-item {
  grid-column: span 1;
}

.form-grid .textarea-full {
  grid-column: 1 / -1; /* 占满整行 */
}

.form-grid .textarea-half {
  grid-column: span 1;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-grid .textarea-item {
    grid-column: span 1;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

