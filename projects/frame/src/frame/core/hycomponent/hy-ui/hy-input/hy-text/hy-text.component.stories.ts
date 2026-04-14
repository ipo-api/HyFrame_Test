import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyTextComponent } from './hy-text.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService, $hyapi } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

let mds;

class MockPricingService implements Partial<ModelService> {
  private $dicCache: any = {};
  public tableServiceMap: any = {};

  constructor() {
    mds = this;
    setTimeout(() => {
      mds['gt_test']['text'] = '这是输入文本';
    }, 10);
  }

  pushDic(dic: any) {
    if (dic && dic.name) {
      this.$dicCache[dic.name] = dic.value;
    }
  }

  getDic(dicName: string) {
    return this.$dicCache[dicName];
  }
}

const argTypes = unit.createArgTypes('HyTextComponent');
export default {
  title: '表单组件/hy-text（输入框）',
  component: HyTextComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockPricingService }, TableService]
    }),
  ],
  argTypes
} as Meta;

// 基础用法
const BasicTemplate: Story<HyTextComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础输入框功能</h3>
      <p>最常用的文本输入框，支持多种类型和基础配置</p>
      
      <hy-form>
        <hy-gt model="basicDemo">
          <hy-text 
            title="基础输入框" 
            model="basicText"
            placeholder="请输入文本内容..."
            cols="24">
          </hy-text>
          
          <hy-text 
            title="密码输入框" 
            model="password"
            type="password"
            placeholder="请输入密码..."
            [isShowEye]="true"
            cols="24">
          </hy-text>
          
          <hy-text 
            title="禁用状态" 
            model="disabled"
            placeholder="这个输入框被禁用了..."
            [enable]="false"
            cols="24">
          </hy-text>
          
          <hy-text 
            title="紧凑模式" 
            model="compact"
            placeholder="紧凑模式输入框..."
            [compact]="true"
            cols="12">
          </hy-text>
          
          <hy-text 
            title="普通模式" 
            model="normal"
            placeholder="普通模式输入框..."
            cols="12">
          </hy-text>
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

单行文本输入框组件，支持文本和密码两种类型，提供丰富的配置选项。

### 特性
- 支持文本和密码两种输入类型
- 密码类型支持可视化切换，增强用户体验
- 支持启用/禁用状态控制
- 提供紧凑模式，适应不同的界面密度需求
- 继承自 HyBaseInput，具备完整的表单功能

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| title | 输入框标题 | string | - |
| model | 表单字段名 | string | - |
| type | 输入类型 | 'text' \\| 'password' | 'text' |
| placeholder | 占位符文本 | string | '' |
| enable | 是否可编辑 | boolean | true |
| isShowEye | 密码框是否显示可视图标 | boolean | true |
| compact | 是否使用紧凑模式 | boolean | false |
| cols | 栅格布局列数 | number \\| string | - |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="demo">
    <!-- 基础文本输入 -->
    <hy-text 
      title="用户名" 
      model="username"
      placeholder="请输入用户名..."
      cols="24">
    </hy-text>
    
    <!-- 密码输入 -->
    <hy-text 
      title="密码" 
      model="password"
      type="password"
      placeholder="请输入密码..."
      [isShowEye]="true"
      cols="24">
    </hy-text>
    
    <!-- 禁用状态 -->
    <hy-text 
      title="只读字段" 
      model="readonly"
      [enable]="false"
      cols="24">
    </hy-text>
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
  selector: 'app-text-demo',
  templateUrl: './text-demo.component.html'
})
export class TextDemoComponent {
  // 表单数据
  formData = {
    username: '',
    password: '',
    email: ''
  };

  // 处理输入变化
  onInputChange(value: string, field: string) {
    this.formData[field] = value;
    console.log(\`\${field} 输入变化:\`, value);
  }

  // 处理密码可见性
  passwordVisible = false;
  
  togglePasswordVisible() {
    this.passwordVisible = !this.passwordVisible;
  }

  // 表单提交
  onSubmit() {
    console.log('表单数据:', this.formData);
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "应用场景",
      template: previewTemplate`
// 1. 登录表单
<hy-form>
  <hy-gt model="loginForm">
    <hy-text 
      title="账号" 
      model="account"
      placeholder="请输入账号或邮箱..."
      [ckRequired]="true"
      cols="24">
    </hy-text>
    
    <hy-text 
      title="密码" 
      model="password"
      type="password"
      placeholder="请输入密码..."
      [ckRequired]="true"
      [isShowEye]="true"
      cols="24">
    </hy-text>
  </hy-gt>
</hy-form>

// 2. 用户资料编辑
<hy-text 
  title="真实姓名" 
  model="realName"
  placeholder="请输入真实姓名..."
  [ckRequired]="true"
  cols="12">
</hy-text>

<hy-text 
  title="手机号" 
  model="phone"
  placeholder="请输入11位手机号..."
  [ckRequired]="true"
  cols="12">
</hy-text>

// 3. 搜索框
<hy-text 
  model="searchText"
  placeholder="搜索产品、文章、用户..."
  [search]="true"
  [noLabel]="true"
  cols="24">
</hy-text>
      `,
      language: "html",
      copy: true
    }
  ]
};

// 验证配置
const ValidationTemplate: Story<HyTextComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>表单验证功能</h4>
        <p>内置丰富的验证规则，确保数据输入的正确性和完整性</p>
        
        <hy-form>
          <hy-gt model="validationDemo" labelWidth="140px">
            <hy-text 
              title="必填输入框" 
              model="requiredText"
              placeholder="这是必填字段..."
              [ckRequired]="true"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="长度限制(5-20字符)" 
              model="lengthText"
              placeholder="长度在5-20字符之间..."
              [ckMinLength]="5"
              [ckMaxLength]="20"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="仅数字输入" 
              model="numberText"
              placeholder="只能输入数字..."
              [ckNumber]="true"
              cols="12">
            </hy-text>
            
            <hy-text 
              title="整数(1-100)" 
              model="integerText"
              placeholder="输入1-100的整数..."
              [ckNumber]="true"
              [ckInteger]="true"
              [ckMin]="1"
              [ckMax]="100"
              cols="12">
            </hy-text>
            
            <hy-text 
              title="不能包含空格" 
              model="noSpaceText"
              placeholder="输入不能包含空格..."
              [ckNoWhitespace]="true"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="密码强度验证" 
              model="strongPassword"
              type="password"
              placeholder="至少8位，包含字母和数字..."
              [ckRequired]="true"
              [ckMinLength]="8"
              [ckMaxLength]="20"
              [ckNoWhitespace]="true"
              [isShowEye]="true"
              [isCopy]="false"
              [isCut]="false"
              cols="24">
            </hy-text>
          </hy-gt>
        </hy-form>
        
        <div style="margin-top: 20px; padding: 15px; background: #f6f8fa; border-radius: 4px;">
          <h5>📝 验证规则说明：</h5>
          <ul style="margin: 10px 0; padding-left: 20px; font-size: 14px;">
            <li><strong>必填验证</strong>：设置 <code>[ckRequired]="true"</code></li>
            <li><strong>长度验证</strong>：设置 <code>ckMinLength</code> 和 <code>ckMaxLength</code></li>
            <li><strong>数字验证</strong>：设置 <code>[ckNumber]="true"</code></li>
            <li><strong>整数验证</strong>：设置 <code>[ckInteger]="true"</code></li>
            <li><strong>范围验证</strong>：设置 <code>ckMin</code> 和 <code>ckMax</code></li>
            <li><strong>空格验证</strong>：设置 <code>[ckNoWhitespace]="true"</code></li>
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

组件内置完善的表单验证功能，支持多种验证规则的组合使用。

### 🛡️ 支持的验证类型

#### 基础验证
- **必填验证 (ckRequired)**: 确保字段不为空
- **长度验证 (ckMinLength/ckMaxLength)**: 限制输入长度范围
- **空格验证 (ckNoWhitespace)**: 禁止输入包含空格

#### 数字验证
- **数字验证 (ckNumber)**: 限制只能输入数字
- **整数验证 (ckInteger)**: 限制只能输入整数
- **范围验证 (ckMin/ckMax)**: 限制数字的取值范围

#### 密码安全
- **复制控制 (isCopy)**: 控制密码框是否允许复制
- **剪切控制 (isCut)**: 控制密码框是否允许剪切
- **可见性控制 (isShowEye)**: 控制密码可见性切换按钮

### 📋 验证配置对比

| 验证类型 | 配置方式 | 触发时机 | 错误处理 |
|---------|----------|----------|----------|
| 必填验证 | \`[ckRequired]="true"\` | 表单提交/失焦 | 显示错误提示 |
| 长度验证 | \`[ckMinLength]="5"\` \`[ckMaxLength]="20"\` | 输入时实时检查 | 阻止输入/提示 |
| 数字验证 | \`[ckNumber]="true"\` | 输入时实时检查 | 阻止非数字输入 |
| 整数验证 | \`[ckInteger]="true"\` | 输入时实时检查 | 阻止小数输入 |
| 范围验证 | \`[ckMin]="1"\` \`[ckMax]="100"\` | 失焦时检查 | 显示范围提示 |
| 空格验证 | \`[ckNoWhitespace]="true"\` | 输入时实时检查 | 阻止空格输入 |

### 🎯 验证最佳实践

#### 用户体验优化
- 实时验证要友好，不要过于严格
- 错误信息要明确具体
- 重要验证要在提交时再次检查
- 密码框要提供合理的安全控制

#### 业务场景应用
- **用户注册**: 必填 + 长度 + 格式验证
- **数字输入**: 数字 + 范围验证
- **密码设置**: 长度 + 复杂度 + 安全控制
- **搜索框**: 长度限制但不必填

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
    <hy-text 
      title="用户名" 
      model="username"
      [ckRequired]="true"
      [ckMinLength]="3"
      [ckMaxLength]="20"
      placeholder="3-20个字符（必填）..."
      cols="24">
    </hy-text>
    
    <!-- 数字验证 -->
    <hy-text 
      title="年龄" 
      model="age"
      [ckNumber]="true"
      [ckInteger]="true"
      [ckMin]="1"
      [ckMax]="150"
      placeholder="请输入年龄（1-150）..."
      cols="12">
    </hy-text>
    
    <!-- 组合验证 -->
    <hy-text 
      title="邮政编码" 
      model="zipCode"
      [ckRequired]="true"
      [ckNumber]="true"
      [ckMinLength]="6"
      [ckMaxLength]="6"
      placeholder="6位数字邮政编码..."
      cols="12">
    </hy-text>
    
    <!-- 密码验证 -->
    <hy-text 
      title="密码" 
      model="password"
      type="password"
      [ckRequired]="true"
      [ckMinLength]="8"
      [ckNoWhitespace]="true"
      [isCopy]="false"
      [isCut]="false"
      placeholder="至少8位，不能包含空格..."
      cols="24">
    </hy-text>
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
  form: FormGroup;
  
  // 验证配置
  validationRules = {
    username: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/
    },
    email: {
      required: true,
      email: true
    },
    phone: {
      required: true,
      pattern: /^1[3-9]\d{9}$/
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/
    }
  };

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^1[3-9]\d{9}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/)
      ]]
    });
  }

  // 获取验证错误信息
  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    
    if (field?.errors) {
      if (field.errors['required']) {
        return '此字段为必填项';
      }
      if (field.errors['minlength']) {
        const min = field.errors['minlength'].requiredLength;
        return \`最少输入\${min}个字符\`;
      }
      if (field.errors['maxlength']) {
        const max = field.errors['maxlength'].requiredLength;
        return \`最多输入\${max}个字符\`;
      }
      if (field.errors['pattern']) {
        return this.getPatternErrorMessage(fieldName);
      }
      if (field.errors['email']) {
        return '请输入正确的邮箱格式';
      }
    }
    
    return '';
  }

  private getPatternErrorMessage(fieldName: string): string {
    const messages = {
      username: '只能包含字母、数字和下划线',
      phone: '请输入正确的手机号格式',
      password: '密码必须包含字母和数字'
    };
    
    return messages[fieldName] || '格式不正确';
  }

  // 实时验证状态
  isFieldValid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return field ? field.valid && field.touched : false;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return field ? field.invalid && field.touched : false;
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
// 1. 自定义验证器
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// 用户名唯一性验证
export function uniqueUsernameValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }
    
    return this.userService.checkUsername(control.value).pipe(
      map(result => result.isUnique ? null : { notUnique: true }),
      catchError(() => of(null))
    );
  };
}

// 密码强度验证
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (!value) {
      return null;
    }
    
    const hasNumber = /[0-9]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasSpecial = /[#?!@$%^&*-]/.test(value);
    
    const valid = hasNumber && hasLower && hasUpper && hasSpecial;
    
    if (!valid) {
      return { 
        passwordStrength: {
          hasNumber,
          hasLower,
          hasUpper,
          hasSpecial
        }
      };
    }
    
    return null;
  };
}

// 2. 动态验证配置
@Component({
  template: \`
    <hy-text 
      title="动态验证"
      model="dynamicField"
      [ckRequired]="isDynamic"
      [ckMinLength]="getMinLength()"
      [ckMaxLength]="getMaxLength()"
      [ckNumber]="isNumberField"
      cols="24">
    </hy-text>
  \`
})
export class DynamicValidationComponent {
  fieldType: 'text' | 'number' | 'email' = 'text';
  
  get isDynamic(): boolean {
    return this.fieldType !== 'text';
  }
  
  get isNumberField(): boolean {
    return this.fieldType === 'number';
  }
  
  getMinLength(): number {
    switch (this.fieldType) {
      case 'email': return 5;
      case 'number': return 1;
      default: return 0;
    }
  }
  
  getMaxLength(): number {
    switch (this.fieldType) {
      case 'email': return 50;
      case 'number': return 10;
      default: return 100;
    }
  }
}

// 3. 联合验证
@Component({
  template: \`
    <hy-text 
      title="密码"
      model="password"
      type="password"
      [ckRequired]="true"
      [ckMinLength]="8"
      (onChange_model)="onPasswordChange($event)"
      cols="24">
    </hy-text>
    
    <hy-text 
      title="确认密码"
      model="confirmPassword"
      type="password"
      [ckRequired]="true"
      (onChange_model)="onConfirmPasswordChange($event)"
      cols="24">
    </hy-text>
    
    <div *ngIf="passwordMismatch" class="error-message">
      两次输入的密码不一致
    </div>
  \`
})
export class PasswordValidationComponent {
  password = '';
  confirmPassword = '';
  passwordMismatch = false;
  
  onPasswordChange(value: string) {
    this.password = value;
    this.checkPasswordMatch();
  }
  
  onConfirmPasswordChange(value: string) {
    this.confirmPassword = value;
    this.checkPasswordMatch();
  }
  
  private checkPasswordMatch() {
    this.passwordMismatch = this.password !== this.confirmPassword && 
                           this.confirmPassword.length > 0;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 图标和模板
const IconTemplateTemplate: Story<HyTextComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>图标和模板功能</h4>
        <p>支持前缀图标、后缀图标、前置标签、后置标签等丰富的扩展功能</p>
        
        <hy-form>
          <hy-gt model="iconDemo" labelWidth="120px">
            <hy-text 
              title="前缀图标" 
              model="prefixIcon"
              placeholder="带前缀图标的输入框..."
              [prefix]="prefixTemplate"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="后缀图标" 
              model="suffixIcon"
              placeholder="带后缀图标的输入框..."
              [suffix]="suffixTemplate"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="前置标签" 
              model="beforeLabel"
              placeholder="输入网址..."
              [addOnBefore]="beforeTemplate"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="后置标签" 
              model="afterLabel"
              placeholder="输入数量..."
              addOnAfter="个"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="搜索框" 
              model="searchText"
              placeholder="搜索内容..."
              [search]="true"
              [addOnAfter]="searchTemplate"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="复合输入框" 
              model="complexInput"
              placeholder="复合功能输入框..."
              [prefix]="userIcon"
              [addOnAfter]="actionTemplate"
              cols="24">
            </hy-text>
          </hy-gt>
        </hy-form>
        
        <!-- 图标和模板定义 -->
        <ng-template #prefixTemplate>
          <hy-icon nzIconName="user" style="color: #1890ff;"></hy-icon>
        </ng-template>
        
        <ng-template #suffixTemplate>
          <hy-icon nzIconName="close" style="color: #ff4d4f; cursor: pointer;" (click)="clearInput()"></hy-icon>
        </ng-template>
        
        <ng-template #beforeTemplate>
          <span style="color: #666;">https://</span>
        </ng-template>
        
        <ng-template #searchTemplate>
          <hy-icon nzIconName="search" style="color: #1890ff; cursor: pointer;" (click)="performSearch()"></hy-icon>
        </ng-template>
        
        <ng-template #userIcon>
          <hy-icon nzIconName="user" style="color: #52c41a;"></hy-icon>
        </ng-template>
        
        <ng-template #actionTemplate>
          <button nz-button nzType="primary" nzSize="small" (click)="handleAction()">
            操作
          </button>
        </ng-template>
      </div>
    </div>
  `
});

export const iconTemplate = IconTemplateTemplate.bind({});
iconTemplate.args = {
  clearInput: () => {
    console.log('清空输入');
  },
  performSearch: () => {
    console.log('执行搜索');
  },
  handleAction: () => {
    console.log('执行操作');
  }
};
iconTemplate.storyName = '图标和模板';
iconTemplate.parameters = {
  docs: {
    description: {
      story: `
## 图标和模板

通过前缀图标、后缀图标、前置标签、后置标签等功能，为输入框添加丰富的视觉元素和交互功能。

### 🎨 支持的扩展类型

#### 图标扩展
- **前缀图标 (prefix)**: 在输入框内左侧显示图标
- **后缀图标 (suffix)**: 在输入框内右侧显示图标
- 支持字符串和模板两种方式

#### 标签扩展  
- **前置标签 (addOnBefore)**: 在输入框前添加标签
- **后置标签 (addOnAfter)**: 在输入框后添加标签
- 支持文本、图标、按钮等各种内容

#### 搜索功能
- **搜索模式 (search)**: 专门优化的搜索框样式
- 通常与后置标签组合使用

### 📋 配置方式对比

| 类型 | 配置方式 | 支持内容 | 使用场景 |
|------|----------|----------|----------|
| prefix | \`[prefix]="template"\` | 图标、文字 | 用户名、邮箱等输入提示 |
| suffix | \`[suffix]="template"\` | 图标、操作按钮 | 清空、密码可见性等 |
| addOnBefore | \`[addOnBefore]="template"\` | 文字、选择器 | 协议选择、货币单位等 |
| addOnAfter | \`addOnAfter="文字"\` | 文字、按钮 | 单位、操作按钮等 |

### 🎯 设计原则

#### 视觉一致性
- 图标大小要统一，建议使用系统图标
- 颜色搭配要协调，重要操作使用主色调
- 间距保持一致，避免视觉混乱

#### 交互友好性
- 可点击元素要有明确的视觉反馈
- 图标含义要直观，避免用户困惑
- 操作要有合理的边界和防误触机制

#### 功能实用性
- 不要为了装饰而添加图标
- 确保扩展功能确实有助于用户体验
- 保持输入框的核心功能不受影响

### 💡 最佳实践
- **搜索框**: 使用放大镜图标 + search 模式
- **密码框**: 使用眼睛图标控制可见性
- **数值输入**: 使用单位标签提升清晰度
- **网址输入**: 使用协议前缀减少输入成本
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="demo">
    <!-- 前缀图标 -->
    <hy-text 
      title="用户名" 
      model="username"
      [prefix]="userIcon"
      placeholder="请输入用户名..."
      cols="24">
    </hy-text>
    
    <!-- 后缀图标 -->
    <hy-text 
      title="搜索" 
      model="search"
      [suffix]="searchIcon"
      placeholder="输入搜索关键词..."
      cols="24">
    </hy-text>
    
    <!-- 前置标签 -->
    <hy-text 
      title="网站地址" 
      model="website"
      [addOnBefore]="httpPrefix"
      placeholder="输入域名..."
      cols="24">
    </hy-text>
    
    <!-- 后置标签 -->
    <hy-text 
      title="商品数量" 
      model="quantity"
      addOnAfter="件"
      placeholder="输入数量..."
      cols="24">
    </hy-text>
  </hy-gt>
</hy-form>

<!-- 模板定义 -->
<ng-template #userIcon>
  <hy-icon nzIconName="user"></hy-icon>
</ng-template>

<ng-template #searchIcon>
  <hy-icon nzIconName="search" (click)="onSearch()"></hy-icon>
</ng-template>

<ng-template #httpPrefix>
  <span>https://</span>
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
  selector: 'app-icon-template-demo',
  templateUrl: './icon-template-demo.component.html'
})
export class IconTemplateDemoComponent {
  @ViewChild('userIcon') userIcon: TemplateRef<any>;
  @ViewChild('clearIcon') clearIcon: TemplateRef<any>;
  @ViewChild('searchButton') searchButton: TemplateRef<any>;
  
  formData = {
    username: '',
    email: '',
    website: '',
    quantity: 1
  };

  // 清空输入
  clearInput(field: string) {
    this.formData[field] = '';
    console.log(\`清空字段: \${field}\`);
  }

  // 执行搜索
  onSearch() {
    console.log('执行搜索:', this.formData.search);
  }

  // 处理数量变化
  onQuantityChange(value: string) {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      this.formData.quantity = num;
    }
  }

  // 验证网址格式
  validateWebsite(value: string): boolean {
    const urlPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\\.[a-zA-Z]{2,}$/;
    return urlPattern.test(value);
  }

  // 格式化网址
  formatWebsite(value: string): string {
    if (value && !value.startsWith('http')) {
      return \`https://\${value}\`;
    }
    return value;
  }

  // 动态图标配置
  getIconByType(type: string): string {
    const icons = {
      user: 'user',
      email: 'mail',
      phone: 'phone',
      website: 'global',
      search: 'search',
      clear: 'close'
    };
    
    return icons[type] || 'edit';
  }

  // 动态单位配置
  getUnitByField(field: string): string {
    const units = {
      quantity: '件',
      price: '元',
      weight: 'kg',
      length: 'cm',
      percentage: '%'
    };
    
    return units[field] || '';
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "模板技巧",
      template: previewTemplate`
// 1. 动态图标模板
@Component({
  template: \`
    <hy-text 
      *ngFor="let field of formFields"  
      [title]="field.label"
      [model]="field.name"
      [prefix]="getIconTemplate(field.type)"
      [suffix]="field.clearable ? clearTemplate : null"
      cols="24">
    </hy-text>
    
    <!-- 通用清空图标 -->
    <ng-template #clearTemplate let-field="field">
      <hy-icon 
        nzIconName="close" 
        style="color: #ff4d4f; cursor: pointer;"
        (click)="clearField(field)">
      </hy-icon>
    </ng-template>
  \`
})
export class DynamicIconComponent {
  formFields = [
    { name: 'username', label: '用户名', type: 'user', clearable: true },
    { name: 'email', label: '邮箱', type: 'email', clearable: true },
    { name: 'phone', label: '手机', type: 'phone', clearable: false }
  ];

  getIconTemplate(type: string): TemplateRef<any> {
    // 根据类型返回不同的图标模板
    return this.iconTemplates[type];
  }
}

// 2. 复合功能模板
<ng-template #complexSuffix>
  <div style="display: flex; align-items: center; gap: 4px;">
    <!-- 清空按钮 -->
    <hy-icon 
      *ngIf="hasValue"
      nzIconName="close" 
      style="color: #999; cursor: pointer;"
      (click)="clear()">
    </hy-icon>
    
    <!-- 搜索按钮 -->
    <hy-icon 
      nzIconName="search" 
      style="color: #1890ff; cursor: pointer;"
      (click)="search()">
    </hy-icon>
  </div>
</ng-template>

// 3. 下拉选择前置标签
<ng-template #selectPrefix>
  <nz-select 
    style="width: 80px;" 
    [(ngModel)]="selectedPrefix"
    (ngModelChange)="onPrefixChange($event)">
    <nz-option nzValue="http" nzLabel="HTTP"></nz-option>
    <nz-option nzValue="https" nzLabel="HTTPS"></nz-option>
    <nz-option nzValue="ftp" nzLabel="FTP"></nz-option>
  </nz-select>
</ng-template>

// 4. 操作按钮后置标签
<ng-template #actionSuffix>
  <nz-button-group>
    <button 
      nz-button 
      nzSize="small"
      [nzType]="isEditing ? 'primary' : 'default'"
      (click)="toggleEdit()">
      {{isEditing ? '保存' : '编辑'}}
    </button>
    <button 
      nz-button 
      nzSize="small" 
      nzType="default"
      (click)="cancel()"
      *ngIf="isEditing">
      取消
    </button>
  </nz-button-group>
</ng-template>

// 5. 带验证状态的图标
<ng-template #validationIcon let-isValid="isValid">
  <hy-icon 
    [nzIconName]="isValid ? 'check-circle' : 'close-circle'"
    [style.color]="isValid ? '#52c41a' : '#ff4d4f'">
  </hy-icon>
</ng-template>

// 6. 智能提示后缀
<ng-template #smartSuffix>
  <div style="display: flex; align-items: center;">
    <!-- 加载状态 -->
    <nz-spin 
      *ngIf="isValidating" 
      nzSize="small"
      style="margin-right: 4px;">
    </nz-spin>
    
    <!-- 验证结果 -->
    <hy-icon 
      *ngIf="!isValidating && validationResult"
      [nzIconName]="validationResult.isValid ? 'check' : 'close'"
      [style.color]="validationResult.isValid ? '#52c41a' : '#ff4d4f'">
    </hy-icon>
    
    <!-- 帮助提示 -->
    <hy-icon 
      nzIconName="question-circle"
      style="color: #999; margin-left: 4px;"
      nz-tooltip
      [nzTooltipTitle]="helpText">
    </hy-icon>
  </div>
</ng-template>
      `,
      language: "html",
      copy: true
    }
  ]
};

// 提示功能
const PromptTemplate: Story<HyTextComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>自动完成提示功能</h4>
        <p>支持自动完成提示，提升用户输入效率</p>
        
        <hy-form>
          <hy-gt model="promptDemo" labelWidth="140px">
            <hy-text 
              title="默认过滤" 
              model="defaultFilter"
              placeholder="输入用户名，支持模糊匹配..."
              [promptOptions]="userOptions"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="自定义过滤" 
              model="customFilter"
              placeholder="自定义过滤规则（区分大小写）..."
              [promptOptions]="userOptions"
              [promptFilterFn]="customFilterFn"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="邮箱提示" 
              model="emailPrompt"
              placeholder="输入邮箱地址..."
              [promptOptions]="emailDomains"
              [promptFilterFn]="emailFilterFn"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="城市选择" 
              model="cityPrompt"
              placeholder="输入城市名称..."
              [promptOptions]="cityOptions"
              [promptFilterFn]="cityFilterFn"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="不过滤显示" 
              model="noFilter"
              placeholder="显示所有选项..."
              [promptOptions]="categoryOptions"
              [promptFilterFn]="noFilterFn"
              cols="24">
            </hy-text>
          </hy-gt>
        </hy-form>
        
        <div style="margin-top: 20px; padding: 15px; background: #f6f8fa; border-radius: 4px;">
          <h5>💡 提示功能说明：</h5>
          <ul style="margin: 10px 0; padding-left: 20px; font-size: 14px;">
            <li><strong>默认过滤</strong>：不区分大小写的模糊匹配</li>
            <li><strong>自定义过滤</strong>：通过 <code>promptFilterFn</code> 自定义过滤逻辑</li>
            <li><strong>邮箱提示</strong>：智能匹配邮箱域名</li>
            <li><strong>城市选择</strong>：支持拼音和中文匹配</li>
            <li><strong>无过滤模式</strong>：显示所有可选项</li>
          </ul>
        </div>
      </div>
    </div>
  `
});

export const prompt = PromptTemplate.bind({});
prompt.args = {
  userOptions: [
    { text: 'admin', id: 'admin' },
    { text: 'user001', id: 'user001' },
    { text: 'manager', id: 'manager' },
    { text: 'guest', id: 'guest' },
    { text: 'developer', id: 'developer' }
  ],
  emailDomains: [
    { text: '@gmail.com', id: 'gmail' },
    { text: '@outlook.com', id: 'outlook' },
    { text: '@qq.com', id: 'qq' },
    { text: '@163.com', id: '163' },
    { text: '@sina.com', id: 'sina' }
  ],
  cityOptions: [
    { text: '北京', id: 'beijing' },
    { text: '上海', id: 'shanghai' },
    { text: '广州', id: 'guangzhou' },
    { text: '深圳', id: 'shenzhen' },
    { text: '杭州', id: 'hangzhou' },
    { text: '南京', id: 'nanjing' }
  ],
  categoryOptions: [
    { text: '科技', id: 'tech' },
    { text: '生活', id: 'life' },
    { text: '娱乐', id: 'entertainment' },
    { text: '体育', id: 'sports' },
    { text: '教育', id: 'education' }
  ],
  customFilterFn: function(value: string) {
    return this.userOptions.filter(option => option.text.includes(value));
  },
  emailFilterFn: function(value: string) {
    if (value.includes('@')) {
      const domain = '@' + value.split('@')[1];
      return this.emailDomains.filter(option => option.text.startsWith(domain));
    }
    return this.emailDomains;
  },
  cityFilterFn: function(value: string) {
    return this.cityOptions.filter(option => 
      option.text.toLowerCase().includes(value.toLowerCase()) ||
      this.getPinyin(option.text).includes(value.toLowerCase())
    );
  },
  noFilterFn: function(value: string) {
    return this.categoryOptions;
  },
  getPinyin: (text: string) => {
    // 简化的拼音匹配逻辑
    const pinyinMap = {
      '北京': 'beijing',
      '上海': 'shanghai',
      '广州': 'guangzhou',
      '深圳': 'shenzhen',
      '杭州': 'hangzhou',
      '南京': 'nanjing'
    };
    return pinyinMap[text] || text;
  }
};
prompt.storyName = '自动完成提示';
prompt.parameters = {
  docs: {
    description: {
      story: `
## 自动完成提示

通过 \`promptOptions\` 和 \`promptFilterFn\` 为输入框添加智能提示功能，提升用户输入效率。

### 🎯 提示机制

#### 默认过滤
- 不设置 \`promptFilterFn\` 时使用默认过滤
- 不区分大小写的模糊匹配
- 匹配 \`text\` 字段包含输入内容的选项

#### 自定义过滤
- 通过 \`promptFilterFn\` 函数自定义过滤逻辑
- 函数接收当前输入值，返回过滤后的选项数组
- 支持复杂的匹配规则和业务逻辑

### 📋 配置参数

| 参数 | 说明 | 类型 | 示例 |
|------|------|------|------|
| promptOptions | 提示选项数组 | HyDicValue[] | [{text: '选项', id: '1'}] |
| promptFilterFn | 自定义过滤函数 | (value: string) => HyDicValue[] | - |

### 🔧 HyDicValue 接口
\`\`\`typescript
interface HyDicValue {
  text: string;  // 显示文本
  id: string;    // 选项标识
}
\`\`\`

### 💡 应用场景

#### 用户输入辅助
- **用户名提示**: 历史用户名、常用用户名
- **邮箱补全**: 常用邮箱域名自动补全
- **地址输入**: 城市、地区智能匹配

#### 标签和分类
- **标签输入**: 已有标签快速选择
- **分类选择**: 层级分类智能匹配
- **关键词提示**: 搜索关键词历史记录

#### 数据规范化
- **格式统一**: 引导用户使用标准格式
- **减少错误**: 避免用户输入错误
- **提升效率**: 减少重复输入

### 🎨 交互体验

#### 触发时机
- 用户开始输入时显示提示
- 输入内容变化时实时过滤
- 点击选项时自动填入

#### 视觉反馈
- 匹配内容高亮显示
- 键盘导航支持
- 清晰的选择状态

### ⚡ 性能优化
- 防抖处理，避免频繁过滤
- 限制显示数量，防止列表过长
- 缓存过滤结果，提升响应速度
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="demo">
    <!-- 默认过滤 -->
    <hy-text 
      title="用户名" 
      model="username"
      [promptOptions]="userOptions"
      placeholder="输入用户名..."
      cols="24">
    </hy-text>
    
    <!-- 自定义过滤 -->
    <hy-text 
      title="邮箱" 
      model="email"
      [promptOptions]="emailOptions"
      [promptFilterFn]="emailFilter"
      placeholder="输入邮箱地址..."
      cols="24">
    </hy-text>
    
    <!-- 城市选择 -->
    <hy-text 
      title="城市" 
      model="city"
      [promptOptions]="cityOptions"
      [promptFilterFn]="cityFilter"
      placeholder="输入城市名称..."
      cols="24">
    </hy-text>
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
import { HyDicValue } from '@hy/frame';

@Component({
  selector: 'app-prompt-demo',
  templateUrl: './prompt-demo.component.html'
})
export class PromptDemoComponent {
  // 用户选项
  userOptions: HyDicValue[] = [
    { text: 'admin', id: 'admin' },
    { text: 'manager', id: 'manager' },
    { text: 'user001', id: 'user001' },
    { text: 'guest', id: 'guest' }
  ];

  // 邮箱域名选项
  emailOptions: HyDicValue[] = [
    { text: '@gmail.com', id: 'gmail' },
    { text: '@outlook.com', id: 'outlook' },
    { text: '@qq.com', id: 'qq' },
    { text: '@163.com', id: '163' }
  ];

  // 城市选项
  cityOptions: HyDicValue[] = [
    { text: '北京', id: 'beijing' },
    { text: '上海', id: 'shanghai' },
    { text: '广州', id: 'guangzhou' },
    { text: '深圳', id: 'shenzhen' }
  ];

  // 邮箱自定义过滤
  emailFilter = (value: string): HyDicValue[] => {
    if (value.includes('@')) {
      // 如果已包含@符号，过滤域名
      const domain = '@' + value.split('@')[1];
      return this.emailOptions.filter(option => 
        option.text.startsWith(domain)
      );
    }
    // 否则显示所有域名选项
    return this.emailOptions;
  };

  // 城市拼音过滤
  cityFilter = (value: string): HyDicValue[] => {
    const pinyinMap = {
      '北京': ['beijing', 'bj'],
      '上海': ['shanghai', 'sh'], 
      '广州': ['guangzhou', 'gz'],
      '深圳': ['shenzhen', 'sz']
    };

    return this.cityOptions.filter(option => {
      const text = option.text.toLowerCase();
      const pinyin = pinyinMap[option.text] || [];
      const searchValue = value.toLowerCase();

      return text.includes(searchValue) || 
             pinyin.some(py => py.includes(searchValue));
    });
  };

  // 动态加载选项
  async loadPromptOptions(type: string, query: string): Promise<HyDicValue[]> {
    // 模拟异步加载
    return new Promise(resolve => {
      setTimeout(() => {
        const options = this.getOptionsByType(type, query);
        resolve(options);
      }, 300);
    });
  }

  private getOptionsByType(type: string, query: string): HyDicValue[] {
    switch (type) {
      case 'user':
        return this.userOptions.filter(opt => 
          opt.text.toLowerCase().includes(query.toLowerCase())
        );
      case 'email':
        return this.emailFilter(query);
      case 'city':
        return this.cityFilter(query);
      default:
        return [];
    }
  }

  // 处理选项选择
  onOptionSelect(value: string, type: string) {
    console.log(\`选择了 \${type}: \${value}\`);
    
    // 可以在这里添加选择后的业务逻辑
    if (type === 'email') {
      this.validateEmail(value);
    } else if (type === 'city') {
      this.loadCityDetails(value);
    }
  }

  private validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      console.log('邮箱格式正确');
    }
  }

  private loadCityDetails(city: string) {
    console.log(\`加载城市详情: \${city}\`);
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "高级用法",
      template: previewTemplate`
// 1. 异步数据加载
@Component({
  template: \`
    <hy-text 
      title="搜索用户"
      model="searchUser"
      [promptOptions]="userSuggestions"
      [promptFilterFn]="asyncUserFilter"
      placeholder="输入用户名搜索..."
      cols="24">
    </hy-text>
  \`
})
export class AsyncPromptComponent {
  userSuggestions: HyDicValue[] = [];
  private searchTimer: any;

  asyncUserFilter = (value: string): HyDicValue[] => {
    // 清除之前的定时器
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }

    // 防抖处理
    this.searchTimer = setTimeout(() => {
      this.searchUsers(value);
    }, 300);

    return this.userSuggestions;
  };

  private async searchUsers(query: string) {
    if (query.length < 2) {
      this.userSuggestions = [];
      return;
    }

    try {
      const response = await this.userService.searchUsers(query);
      this.userSuggestions = response.data.map(user => ({
        text: user.username,
        id: user.id
      }));
    } catch (error) {
      console.error('搜索用户失败:', error);
      this.userSuggestions = [];
    }
  }
}

// 2. 多级联动提示
@Component({
  template: \`
    <hy-text 
      title="省份"
      model="province"
      [promptOptions]="provinceOptions"
      (onChange_model)="onProvinceChange($event)"
      cols="12">
    </hy-text>
    
    <hy-text 
      title="城市"
      model="city"
      [promptOptions]="cityOptions"
      [promptFilterFn]="cityFilter"
      cols="12">
    </hy-text>
  \`
})
export class CascadePromptComponent {
  provinceOptions: HyDicValue[] = [
    { text: '广东省', id: 'guangdong' },
    { text: '浙江省', id: 'zhejiang' },
    { text: '江苏省', id: 'jiangsu' }
  ];

  cityOptions: HyDicValue[] = [];
  selectedProvince = '';

  private cityData = {
    guangdong: [
      { text: '广州市', id: 'guangzhou' },
      { text: '深圳市', id: 'shenzhen' },
      { text: '东莞市', id: 'dongguan' }
    ],
    zhejiang: [
      { text: '杭州市', id: 'hangzhou' },
      { text: '宁波市', id: 'ningbo' },
      { text: '温州市', id: 'wenzhou' }
    ]
  };

  onProvinceChange(province: string) {
    this.selectedProvince = province;
    this.cityOptions = this.cityData[province] || [];
  }

  cityFilter = (value: string): HyDicValue[] => {
    if (!this.selectedProvince) {
      return [];
    }

    return this.cityOptions.filter(city =>
      city.text.toLowerCase().includes(value.toLowerCase())
    );
  };
}

// 3. 智能匹配算法
@Component({
  template: \`
    <hy-text 
      title="智能搜索"
      model="smartSearch"
      [promptOptions]="searchOptions"
      [promptFilterFn]="smartFilter"
      placeholder="支持拼音、简写、模糊匹配..."
      cols="24">
    </hy-text>
  \`
})
export class SmartPromptComponent {
  searchOptions: HyDicValue[] = [
    { text: '用户管理', id: 'user-management' },
    { text: '系统设置', id: 'system-settings' },
    { text: '数据统计', id: 'data-statistics' }
  ];

  smartFilter = (value: string): HyDicValue[] => {
    if (!value) return this.searchOptions;

    const query = value.toLowerCase();
    
    return this.searchOptions.filter(option => {
      const text = option.text.toLowerCase();
      
      // 1. 精确匹配
      if (text.includes(query)) {
        return true;
      }
      
      // 2. 拼音匹配
      const pinyin = this.getPinyin(option.text);
      if (pinyin && pinyin.includes(query)) {
        return true;
      }
      
      // 3. 首字母匹配
      const firstLetters = this.getFirstLetters(option.text);
      if (firstLetters.includes(query)) {
        return true;
      }
      
      // 4. 模糊匹配算法
      return this.fuzzyMatch(text, query);
    }).sort((a, b) => {
      // 按匹配度排序
      return this.getMatchScore(b.text, query) - this.getMatchScore(a.text, query);
    });
  };

  private getPinyin(text: string): string {
    // 实现拼音转换逻辑
    const pinyinMap = {
      '用户': 'yonghu',
      '管理': 'guanli',
      '系统': 'xitong',
      '设置': 'shezhi',
      '数据': 'shuju',
      '统计': 'tongji'
    };
    
    return Object.keys(pinyinMap)
      .reduce((result, key) => {
        return result.replace(key, pinyinMap[key]);
      }, text);
  }

  private getFirstLetters(text: string): string {
    // 获取首字母
    return this.getPinyin(text)
      .split(/[^a-z]/i)
      .map(word => word[0])
      .filter(Boolean)
      .join('');
  }

  private fuzzyMatch(text: string, query: string): boolean {
    // 简单的模糊匹配算法
    let textIndex = 0;
    let queryIndex = 0;
    
    while (textIndex < text.length && queryIndex < query.length) {
      if (text[textIndex] === query[queryIndex]) {
        queryIndex++;
      }
      textIndex++;
    }
    
    return queryIndex === query.length;
  }

  private getMatchScore(text: string, query: string): number {
    // 计算匹配分数
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    
    if (textLower === queryLower) return 100;
    if (textLower.startsWith(queryLower)) return 90;
    if (textLower.includes(queryLower)) return 80;
    
    return this.fuzzyMatch(textLower, queryLower) ? 60 : 0;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 布局配置
const LayoutTemplate: Story<HyTextComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>布局和样式配置</h4>
        <p>通过各种布局属性控制输入框在表单中的显示效果</p>
        
        <hy-form>
          <hy-gt model="layoutDemo">
            <hy-text 
              title="全宽输入框" 
              model="fullWidth"
              placeholder="占据整行宽度..."
              cols="24">
            </hy-text>
            
            <hy-text 
              title="半宽输入框" 
              model="halfWidth1"
              placeholder="占据半行宽度..."
              cols="12">
            </hy-text>
            
            <hy-text 
              title="另一半宽度" 
              model="halfWidth2"
              placeholder="另一半宽度..."
              cols="12">
            </hy-text>
            
            <hy-text 
              title="三分之一宽度" 
              model="oneThird1"
              placeholder="1/3宽度..."
              cols="8">
            </hy-text>
            
            <hy-text 
              title="三分之一宽度" 
              model="oneThird2"
              placeholder="1/3宽度..."
              cols="8">
            </hy-text>
            
            <hy-text 
              title="三分之一宽度" 
              model="oneThird3"
              placeholder="1/3宽度..."
              cols="8">
            </hy-text>
            
            <hy-text 
              title="无标题" 
              model="noTitle"
              placeholder="隐藏了标题标签..."
              [noLabel]="true"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="无冒号" 
              model="noColon"
              placeholder="标题后没有冒号..."
              [noColon]="true"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="自定义标题宽度的超长标题文本" 
              model="customLabelWidth"
              placeholder="标题宽度被设置为200px..."
              labelWidth="200px"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="标题换行显示的超长标题文本内容" 
              model="labelWrap"
              placeholder="标题过长时会换行显示..."
              [isLabelWrap]="true"
              labelWidth="120px"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="Flex布局" 
              model="flexLayout"
              placeholder="使用flex布局..."
              flex="200px"
              cols="24">
            </hy-text>
            
            <hy-text 
              title="说明文字" 
              model="explainText"
              placeholder="带有说明文字的输入框..."
              explainText="这是一段说明文字，用于解释该字段的用途"
              cols="24">
            </hy-text>
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

通过多种布局属性灵活控制输入框在表单中的显示效果和排列方式。

### 📐 栅格布局 (cols)

#### 栅格系统说明
- 基于24栅格系统，\`cols\` 值从1-24
- \`cols="24"\` 占据整行宽度（100%）
- \`cols="12"\` 占据半行宽度（50%）
- \`cols="8"\` 占据三分之一宽度（33.33%）
- \`cols="6"\` 占据四分之一宽度（25%）

### 🏷️ 标题配置

#### 标题显示控制
- **noLabel**: 设置为 \`true\` 隐藏标题标签
- **noColon**: 设置为 \`true\` 隐藏标题后的冒号

#### 标题宽度设置
- **labelWidth**: 设置标题区域的固定宽度（如：'120px'）
- **isLabelWrap**: 标题过长时是否允许换行显示

### 🔧 Flex 布局

#### Flex 属性支持
- **flex**: 设置 flex 布局属性
- 支持数字（如 \`flex="200px"\`）和字符串值
- 可实现更灵活的响应式布局

### 📝 说明文字

#### explainText 配置
- 支持字符串和模板两种方式
- 在输入框下方显示说明信息
- 适合提供字段用途或格式说明

### 📋 布局配置对比

| 配置项 | 作用 | 适用场景 |
|--------|------|----------|
| \`cols="24"\` | 全宽显示 | 重要字段、长文本输入 |
| \`cols="12"\` | 半宽显示 | 两列布局、节省空间 |
| \`cols="8"\` | 三分之一宽 | 三列布局、密集表单 |
| \`noLabel="true"\` | 隐藏标题 | 简洁布局、自定义标题 |
| \`labelWidth="150px"\` | 固定标题宽度 | 对齐整齐、统一样式 |
| \`isLabelWrap="true"\` | 标题换行 | 长标题、移动端适配 |
| \`flex="200px"\` | 弹性布局 | 响应式、复杂布局 |

### 💡 布局最佳实践

#### 表单对齐
- 同一表单内使用统一的 \`labelWidth\`
- 重要字段使用全宽，次要字段可并排
- 相关字段分组排列，提高填写效率

#### 响应式设计
- 移动端建议使用 \`cols="24"\`
- 桌面端可根据字段重要性选择合适宽度
- 使用 \`flex\` 属性实现自适应布局

#### 用户体验
- 标题文字简洁明了，避免过长换行
- 合理使用说明文字，提供必要的帮助信息
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
    <hy-text 
      title="项目名称" 
      model="projectName"
      cols="24">
    </hy-text>
    
    <!-- 双列布局 -->
    <hy-text 
      title="创建人" 
      model="creator"
      cols="12">
    </hy-text>
    <hy-text 
      title="负责人" 
      model="owner"
      cols="12">
    </hy-text>
    
    <!-- 三列布局 -->
    <hy-text 
      title="开始日期" 
      model="startDate"
      cols="8">
    </hy-text>
    <hy-text 
      title="结束日期" 
      model="endDate"
      cols="8">
    </hy-text>
    <hy-text 
      title="优先级" 
      model="priority"
      cols="8">
    </hy-text>
    
    <!-- 标题配置 -->
    <hy-text 
      title="项目描述" 
      model="description"
      labelWidth="150px"
      explainText="详细描述项目的目标和需求"
      cols="24">
    </hy-text>
    
    <!-- 无标题 -->
    <hy-text 
      model="searchKeyword"
      [noLabel]="true"
      placeholder="搜索项目..."
      cols="24">
    </hy-text>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, HostListener } from '@angular/core';

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

  // 表单字段配置
  formFields = [
    {
      name: 'title',
      label: '标题',
      importance: 'high',
      required: true,
      explainText: '项目或任务的标题'
    },
    {
      name: 'creator',
      label: '创建人',
      importance: 'medium',
      required: true
    },
    {
      name: 'assignee',
      label: '负责人',
      importance: 'medium',
      required: false
    },
    {
      name: 'tags',
      label: '标签',
      importance: 'low',
      required: false,
      explainText: '用逗号分隔多个标签'
    }
  ];

  constructor() {
    this.detectDeviceType();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
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

  // 获取响应式列数
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

  // 获取响应式标题宽度
  getResponsiveLabelWidth(): string {
    return this.layoutConfig[this.deviceType].labelWidth;
  }

  // 动态计算Flex值
  calculateFlexValue(field: any): string {
    const baseWidth = 200;
    const importance = field.importance;
    
    switch (importance) {
      case 'high': return \`\${baseWidth * 1.5}px\`;
      case 'medium': return \`\${baseWidth}px\`;
      case 'low': return \`\${baseWidth * 0.8}px\`;
      default: return \`\${baseWidth}px\`;
    }
  }

  // 获取字段说明文字
  getExplainText(field: any): string {
    if (field.explainText) {
      return field.explainText;
    }
    
    if (field.required) {
      return '此字段为必填项';
    }
    
    return '';
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "布局技巧",
      template: previewTemplate`
// 1. 动态表单布局
@Component({
  template: \`
    <hy-form>
      <hy-gt model="dynamicForm">
        <ng-container *ngFor="let field of formFields; let i = index">
          <hy-text 
            [title]="field.label"
            [model]="field.name"
            [cols]="getFieldCols(field, i)"
            [labelWidth]="getFieldLabelWidth(field)"
            [noLabel]="field.hideLabel"
            [explainText]="field.help"
            [placeholder]="field.placeholder">
          </hy-text>
        </ng-container>
      </hy-gt>
    </hy-form>
  \`
})
export class DynamicLayoutComponent {
  formFields = [
    { name: 'title', label: '标题', type: 'text', cols: 24, required: true },
    { name: 'creator', label: '创建人', type: 'text', cols: 12, required: true },
    { name: 'assignee', label: '负责人', type: 'text', cols: 12, required: false },
    { name: 'priority', label: '优先级', type: 'select', cols: 8, required: true },
    { name: 'status', label: '状态', type: 'select', cols: 8, required: true },
    { name: 'progress', label: '进度', type: 'number', cols: 8, required: false }
  ];

  getFieldCols(field: any, index: number): number {
    // 根据字段类型和位置动态计算列数
    if (field.cols) return field.cols;
    
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) return 24;
    
    if (field.type === 'text' && field.required) return 24;
    if (field.type === 'select') return 8;
    
    return 12;
  }

  getFieldLabelWidth(field: any): string {
    const maxLabelLength = Math.max(...this.formFields.map(f => f.label.length));
    return \`\${maxLabelLength * 14 + 20}px\`;
  }
}

// 2. 条件布局
@Component({
  template: \`
    <hy-form>
      <hy-gt model="conditionalForm">
        <!-- 主要信息区 -->
        <div class="form-section primary">
          <hy-text 
            *ngFor="let field of primaryFields"
            [title]="field.label"
            [model]="field.name"
            [cols]="field.cols"
            [ckRequired]="field.required">
          </hy-text>
        </div>
        
        <!-- 详细信息区 -->
        <div class="form-section secondary" *ngIf="showDetails">
          <hy-text 
            *ngFor="let field of detailFields"
            [title]="field.label"
            [model]="field.name"
            [cols]="isCompactMode ? 12 : field.cols"
            labelWidth="100px">
          </hy-text>
        </div>
        
        <!-- 操作区 -->
        <div class="form-section actions">
          <hy-text 
            *ngFor="let field of actionFields"
            [title]="field.label"
            [model]="field.name"
            [cols]="24"
            [noLabel]="field.hideLabel">
          </hy-text>
        </div>
      </hy-gt>
    </hy-form>
  \`
})
export class ConditionalLayoutComponent {
  showDetails = false;
  isCompactMode = false;
  
  primaryFields = [
    { name: 'name', label: '名称', cols: 24, required: true },
    { name: 'type', label: '类型', cols: 12, required: true },
    { name: 'status', label: '状态', cols: 12, required: true }
  ];
  
  detailFields = [
    { name: 'description', label: '描述', cols: 24 },
    { name: 'tags', label: '标签', cols: 12 },
    { name: 'category', label: '分类', cols: 12 }
  ];
  
  actionFields = [
    { name: 'notes', label: '备注', hideLabel: false },
    { name: 'keywords', label: '', hideLabel: true, placeholder: '关键词搜索...' }
  ];
  
  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
  
  toggleCompactMode() {
    this.isCompactMode = !this.isCompactMode;
  }
}

// 3. 网格布局
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px;
}

.form-grid-item {
  grid-column: span 1;
}

.form-grid-full {
  grid-column: 1 / -1;
}

.form-grid-half {
  grid-column: span 1;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .form-grid-item {
    grid-column: span 1;
  }
}

// 4. 分组布局
@Component({
  template: \`
    <hy-form>
      <div class="form-group" *ngFor="let group of formGroups">
        <h3 class="group-title">{{group.title}}</h3>
        <hy-gt [model]="group.model">
          <hy-text 
            *ngFor="let field of group.fields"
            [title]="field.label"
            [model]="field.name"
            [cols]="getGroupFieldCols(group, field)"
            [labelWidth]="group.labelWidth">
          </hy-text>
        </hy-gt>
      </div>
    </hy-form>
  \`
})
export class GroupLayoutComponent {
  formGroups = [
    {
      title: '基本信息',
      model: 'basic',
      labelWidth: '120px',
      fields: [
        { name: 'name', label: '姓名', cols: 12 },
        { name: 'age', label: '年龄', cols: 12 },
        { name: 'email', label: '邮箱', cols: 24 }
      ]
    },
    {
      title: '联系方式',
      model: 'contact',
      labelWidth: '120px',
      fields: [
        { name: 'phone', label: '电话', cols: 12 },
        { name: 'address', label: '地址', cols: 12 }
      ]
    }
  ];
  
  getGroupFieldCols(group: any, field: any): number {
    return field.cols || (group.fields.length > 2 ? 12 : 24);
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

