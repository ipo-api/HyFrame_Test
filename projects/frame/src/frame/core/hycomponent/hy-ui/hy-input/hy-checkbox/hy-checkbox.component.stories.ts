import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyCheckboxComponent } from './hy-checkbox.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { $hyapi, ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

class MockPricingService implements Partial<ModelService> {
  constructor(){
  }
}

const argTypes = unit.createArgTypes('HyCheckboxComponent');
export default {
  title: '表单组件/hy-checkbox（多选框）',
  component: HyCheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, { provide: ModelService, useClass: MockPricingService }]
    }),
  ],
  argTypes
} as Meta;

// 基础用法
const BasicTemplate: Story<HyCheckboxComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础多选框</h3>
      <p>最基本的多选框使用方式，支持从字典数据源动态生成选项</p>
      
      <div style="margin-bottom: 24px;">
        <h4>基础示例</h4>
        <hy-form>
          <hy-gt model="test" [noBorder]="true" [cols]="24">
            <hy-checkbox title="兴趣爱好" dic="testValue" [onelineNum]="3"></hy-checkbox>
            <hy-button title="提交" (onclick)="handleSubmit($event)"></hy-button>
          </hy-gt>
        </hy-form>
      </div>

      <div style="margin-bottom: 24px;">
        <h4>紧凑布局</h4>
        <hy-form>
          <hy-gt model="test2" [noBorder]="true" [cols]="24">
            <hy-checkbox title="技能标签" dic="testValue" [onelineNum]="4"></hy-checkbox>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const basic = BasicTemplate.bind({});
basic.args = {
  handleSubmit: (event) => {
    console.log('表单提交:', event);
    $hyapi.msg.createTips('success', '提交成功');
  }
};
basic.storyName = '基础用法';
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

多选框组件用于在一组选项中选择多个值，通过字典数据源动态生成选项列表。

### 基本特性
- **字典数据源**: 通过 \`dic\` 属性指定数据源
- **灵活布局**: 通过 \`onelineNum\` 控制每行显示的选项数量
- **双向绑定**: 支持 Angular 的表单数据绑定
- **响应式**: 支持响应式表单验证

### 核心配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| title | 多选框组标题 | string | - |
| dic | 字典数据源标识 | string | - |
| onelineNum | 每行显示的选项数量 | number | 1 |
| ckRequired | 是否必选 | boolean | false |

### 使用场景
- 用户兴趣爱好选择
- 技能标签多选
- 权限配置选择
- 产品特性筛选
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 基础多选框 -->
<hy-form>
  <hy-gt model="userInfo" [noBorder]="true" [cols]="24">
    <hy-checkbox 
      title="兴趣爱好" 
      dic="hobbies" 
      [onelineNum]="3">
    </hy-checkbox>
    <hy-button title="保存"></hy-button>
  </hy-gt>
</hy-form>

<!-- 紧凑布局 -->
<hy-form>
  <hy-gt model="skillData" [noBorder]="true" [cols]="24">
    <hy-checkbox 
      title="技能标签" 
      dic="skills" 
      [onelineNum]="4">
    </hy-checkbox>
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
  selector: 'app-checkbox-demo',
  templateUrl: './checkbox-demo.component.html'
})
export class CheckboxDemoComponent {
  // 表单数据模型
  userInfo = {
    hobbies: []
  };

  skillData = {
    skills: []
  };

  // 处理表单提交
  handleSubmit(formData: any) {
    console.log('提交的数据:', formData);
    
    if (formData.hobbies && formData.hobbies.length > 0) {
      $hyapi.msg.createTips('success', \`已选择 \${formData.hobbies.length} 个兴趣爱好\`);
    } else {
      $hyapi.msg.createTips('warning', '请至少选择一个兴趣爱好');
    }
  }

  // 获取选中的值
  getSelectedValues() {
    const selected = this.userInfo.hobbies;
    console.log('当前选中:', selected);
    return selected;
  }

  // 重置选择
  resetSelection() {
    this.userInfo.hobbies = [];
    this.skillData.skills = [];
    $hyapi.msg.createTips('info', '已重置选择');
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 必填验证
const RequiredTemplate: Story<HyCheckboxComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>必填验证</h3>
      <p>设置多选框为必填项，用户必须至少选择一个选项才能提交表单</p>
      
      <div style="margin-bottom: 24px;">
        <h4>必填示例</h4>
        <hy-form>
          <hy-gt model="requiredTest" [noBorder]="true" [cols]="24">
            <hy-checkbox 
              title="服务协议（必选）" 
              dic="testValue" 
              [onelineNum]="2" 
              [ckRequired]="true">
            </hy-checkbox>
            <hy-button title="提交" (onclick)="handleRequiredSubmit($event)"></hy-button>
          </hy-gt>
        </hy-form>
      </div>

      <div style="margin-bottom: 24px;">
        <h4>可选项目</h4>
        <hy-form>
          <hy-gt model="optionalTest" [noBorder]="true" [cols]="24">
            <hy-checkbox 
              title="可选功能" 
              dic="testValue" 
              [onelineNum]="3" 
              [ckRequired]="false">
            </hy-checkbox>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const required = RequiredTemplate.bind({});
required.args = {
  handleRequiredSubmit: (event) => {
    const formData = event;
    if (!formData || !formData.length) {
      $hyapi.msg.createTips('error', '请至少选择一项服务协议');
      return;
    }
    $hyapi.msg.createTips('success', '验证通过，提交成功');
  }
};
required.storyName = '必填验证';
required.parameters = {
  docs: {
    description: {
      story: `
## 必填验证

通过设置 \`ckRequired\` 属性，可以将多选框设置为必填项，提供表单验证功能。

### 验证规则
- **必填检查**: 至少选择一个选项
- **实时验证**: 支持实时验证反馈
- **错误提示**: 提供友好的错误提示信息
- **阻止提交**: 验证失败时阻止表单提交

### 验证时机
- 表单提交时验证
- 失焦时验证（可配置）
- 值改变时验证（可配置）

### 使用场景
- 用户协议确认
- 必选的配置项
- 关键信息采集
- 法律条款确认

### 配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| ckRequired | 是否必填 | boolean | false |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 必填多选框 -->
<hy-form>
  <hy-gt model="agreementForm" [noBorder]="true" [cols]="24">
    <hy-checkbox 
      title="用户协议（必选）" 
      dic="agreements" 
      [onelineNum]="2" 
      [ckRequired]="true">
    </hy-checkbox>
    <hy-button title="同意并继续"></hy-button>
  </hy-gt>
</hy-form>

<!-- 可选多选框 -->
<hy-form>
  <hy-gt model="preferencesForm" [noBorder]="true" [cols]="24">
    <hy-checkbox 
      title="可选偏好设置" 
      dic="preferences" 
      [onelineNum]="3" 
      [ckRequired]="false">
    </hy-checkbox>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "验证处理",
      template: previewTemplate`
import { Component } from '@angular/core';
import { $hyapi } from '@hy/frame';

@Component({
  selector: 'app-required-checkbox-demo',
  templateUrl: './required-checkbox-demo.component.html'
})
export class RequiredCheckboxDemoComponent {
  agreementForm = {
    agreements: []
  };

  preferencesForm = {
    preferences: []
  };

  // 处理必填表单提交
  handleAgreementSubmit(formData: any) {
    // 验证必填项
    if (!this.validateRequired(formData.agreements)) {
      $hyapi.msg.createTips('error', '请先阅读并同意用户协议');
      return false;
    }

    $hyapi.msg.createTips('success', '协议确认成功');
    this.proceedToNextStep();
    return true;
  }

  // 验证必填项
  private validateRequired(values: any[]): boolean {
    return values && values.length > 0;
  }

  // 表单验证失败处理
  handleValidationError(field: string, error: any) {
    console.log(\`字段 \${field} 验证失败:\`, error);
    
    const errorMessages = {
      'required': '此项为必填项，请至少选择一个选项',
      'minLength': '请至少选择指定数量的选项',
      'custom': '请检查您的选择是否符合要求'
    };

    const message = errorMessages[error.type] || '验证失败';
    $hyapi.msg.createTips('error', message);
  }

  // 继续下一步
  private proceedToNextStep() {
    console.log('用户已确认协议，继续业务流程');
    // 实际业务逻辑
  }

  // 重置表单
  resetForm() {
    this.agreementForm.agreements = [];
    this.preferencesForm.preferences = [];
    $hyapi.msg.createTips('info', '表单已重置');
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 禁用选项
const DisabledTemplate: Story<HyCheckboxComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>禁用选项</h3>
      <p>通过 enableAllow 属性控制哪些选项可以被选择，实现选项的禁用功能</p>
      
      <div style="margin-bottom: 24px;">
        <h4>部分选项禁用</h4>
        <hy-form>
          <hy-gt model="disabledTest" [noBorder]="true" [cols]="24">
            <hy-checkbox 
              title="权限选择" 
              dic="testValue" 
              [onelineNum]="3" 
              [enableAllow]="['1','2']">
            </hy-checkbox>
          </hy-gt>
        </hy-form>
        <p style="color: #666; font-size: 12px; margin-top: 8px;">
          注：只有前两个选项可以选择，其他选项被禁用
        </p>
      </div>

      <div style="margin-bottom: 24px;">
        <h4>动态禁用控制</h4>
        <div style="margin-bottom: 16px;">
          <button 
            type="button" 
            class="ant-btn ant-btn-primary ant-btn-small"
            (click)="togglePermissions()"
            style="margin-right: 8px;">
            切换权限模式
          </button>
          <span style="color: #666;">
            当前模式：{{currentMode}}
          </span>
        </div>
        <hy-form>
          <hy-gt model="dynamicTest" [noBorder]="true" [cols]="24">
            <hy-checkbox 
              title="功能权限" 
              dic="testValue" 
              [onelineNum]="3" 
              [enableAllow]="allowedOptions">
            </hy-checkbox>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const disabled = DisabledTemplate.bind({});
disabled.args = {
  currentMode: '管理员模式',
  allowedOptions: ['1', '2', '3'],
  togglePermissions: function() {
    if (this.currentMode === '管理员模式') {
      this.currentMode = '普通用户模式';
      this.allowedOptions = ['1'];
    } else {
      this.currentMode = '管理员模式';
      this.allowedOptions = ['1', '2', '3'];
    }
  }
};
disabled.storyName = '禁用选项';
disabled.parameters = {
  docs: {
    description: {
      story: `
## 禁用选项

通过 \`enableAllow\` 属性可以精确控制哪些选项可以被用户选择，其他选项将显示为禁用状态。

### 禁用控制
- **精确控制**: 通过选项值数组指定可选项
- **视觉反馈**: 禁用选项显示灰色和不可点击状态
- **动态控制**: 支持运行时动态修改可选项
- **权限管理**: 根据用户权限控制可选范围

### 使用场景
- **权限管理**: 根据用户角色限制可选权限
- **分步骤选择**: 根据前面的选择限制后续选项
- **条件限制**: 基于业务规则的选项限制
- **产品配置**: 根据产品版本限制功能选项

### 工作原理
1. \`enableAllow\` 接收一个字符串数组
2. 数组中的值对应字典数据中的选项值
3. 不在数组中的选项将被禁用
4. 禁用选项无法被选择或取消选择

### 配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| enableAllow | 允许选择的选项值数组 | string[] | 全部允许 |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 固定禁用某些选项 -->
<hy-form>
  <hy-gt model="permissionForm" [noBorder]="true" [cols]="24">
    <hy-checkbox 
      title="系统权限" 
      dic="permissions" 
      [onelineNum]="3" 
      [enableAllow]="['read', 'write']">
    </hy-checkbox>
  </hy-gt>
</hy-form>

<!-- 动态控制可选项 -->
<div>
  <button (click)="switchUserRole('admin')">管理员权限</button>
  <button (click)="switchUserRole('user')">普通用户权限</button>
</div>

<hy-form>
  <hy-gt model="dynamicForm" [noBorder]="true" [cols]="24">
    <hy-checkbox 
      title="功能权限" 
      dic="features" 
      [onelineNum]="4" 
      [enableAllow]="currentAllowedFeatures">
    </hy-checkbox>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "权限控制",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-disabled-checkbox-demo',
  templateUrl: './disabled-checkbox-demo.component.html'
})
export class DisabledCheckboxDemoComponent {
  permissionForm = {
    permissions: []
  };

  dynamicForm = {
    features: []
  };

  // 当前用户角色
  currentUserRole = 'user';
  
  // 根据角色定义的可选功能
  rolePermissions = {
    admin: ['read', 'write', 'delete', 'manage', 'audit'],
    editor: ['read', 'write', 'delete'],
    user: ['read'],
    guest: []
  };

  // 当前允许的功能列表
  get currentAllowedFeatures(): string[] {
    return this.rolePermissions[this.currentUserRole] || [];
  }

  // 切换用户角色
  switchUserRole(role: string) {
    this.currentUserRole = role;
    
    // 清空当前选择的不被允许的选项
    this.cleanupInvalidSelections();
    
    console.log(\`切换到 \${role} 权限，可选功能:\`, this.currentAllowedFeatures);
  }

  // 清理无效选择
  private cleanupInvalidSelections() {
    const allowedFeatures = this.currentAllowedFeatures;
    
    // 过滤掉不被允许的选项
    this.dynamicForm.features = this.dynamicForm.features.filter(
      feature => allowedFeatures.includes(feature)
    );
  }

  // 根据业务条件动态设置可选项
  updatePermissionsByCondition(condition: any) {
    let allowedOptions = [];

    switch (condition.type) {
      case 'department':
        allowedOptions = this.getDepartmentPermissions(condition.value);
        break;
      case 'level':
        allowedOptions = this.getLevelPermissions(condition.value);
        break;
      case 'custom':
        allowedOptions = condition.permissions;
        break;
      default:
        allowedOptions = ['read'];
    }

    this.rolePermissions['custom'] = allowedOptions;
    this.currentUserRole = 'custom';
  }

  // 获取部门权限
  private getDepartmentPermissions(department: string): string[] {
    const departmentMap = {
      'IT': ['read', 'write', 'delete', 'manage'],
      'HR': ['read', 'write'],
      'Finance': ['read', 'audit'],
      'Sales': ['read']
    };
    
    return departmentMap[department] || ['read'];
  }

  // 获取级别权限
  private getLevelPermissions(level: number): string[] {
    if (level >= 5) return ['read', 'write', 'delete', 'manage', 'audit'];
    if (level >= 3) return ['read', 'write', 'delete'];
    if (level >= 1) return ['read', 'write'];
    return ['read'];
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 文本省略
const EllipsisTemplate: Story<HyCheckboxComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>文本省略</h3>
      <p>当选项文本过长时，通过 isEllipsis 属性控制文本的显示方式</p>
      
      <div style="margin-bottom: 24px;">
        <h4>启用文本省略</h4>
        <div style="width: 300px; border: 1px dashed #d9d9d9; padding: 16px;">
          <hy-form>
            <hy-gt model="ellipsisTest" [noBorder]="true" flex="300px">
              <hy-checkbox 
                title="长文本选项" 
                dic="testValue" 
                [onelineNum]="2" 
                [isEllipsis]="true">
              </hy-checkbox>
            </hy-gt>
          </hy-form>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 8px;">
          注：容器宽度限制为300px，长文本将显示省略号
        </p>
      </div>

      <div style="margin-bottom: 24px;">
        <h4>不启用省略（默认）</h4>
        <div style="width: 300px; border: 1px dashed #d9d9d9; padding: 16px;">
          <hy-form>
            <hy-gt model="noEllipsisTest" [noBorder]="true" flex="300px">
              <hy-checkbox 
                title="长文本选项" 
                dic="testValue" 
                [onelineNum]="2" 
                [isEllipsis]="false">
              </hy-checkbox>
            </hy-gt>
          </hy-form>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 8px;">
          注：文本将换行显示，不会被截断
        </p>
      </div>

      <div style="margin-bottom: 24px;">
        <h4>响应式布局</h4>
        <div style="resize: horizontal; overflow: auto; width: 400px; min-width: 200px; max-width: 600px; border: 1px dashed #1890ff; padding: 16px;">
          <hy-form>
            <hy-gt model="responsiveTest" [noBorder]="true">
              <hy-checkbox 
                title="响应式文本" 
                dic="testValue" 
                [onelineNum]="3" 
                [isEllipsis]="true">
              </hy-checkbox>
            </hy-gt>
          </hy-form>
        </div>
        <p style="color: #1890ff; font-size: 12px; margin-top: 8px;">
          💡 可以拖拽右下角调整容器大小查看效果
        </p>
      </div>
    </div>
  `
});

export const ellipsis = EllipsisTemplate.bind({});
ellipsis.args = {};
ellipsis.storyName = '文本省略';
ellipsis.parameters = {
  docs: {
    description: {
      story: `
## 文本省略

当多选框选项文本过长时，可以通过 \`isEllipsis\` 属性控制文本溢出的处理方式。

### 省略模式
- **启用省略**: 文本超出容器时显示省略号（...）
- **禁用省略**: 文本自动换行显示完整内容
- **响应式**: 根据容器大小自动调整显示方式
- **悬停提示**: 启用省略时，悬停可查看完整文本

### 使用场景
- **固定宽度布局**: 容器宽度受限的场景
- **移动端适配**: 屏幕宽度较小的移动设备
- **表格单元格**: 表格中的多选框组件
- **卡片布局**: 卡片内容区域有限的情况

### 视觉效果对比

| 模式 | 长文本处理 | 容器高度 | 适用场景 |
|------|------------|----------|----------|
| **省略模式** | 显示省略号 | 固定 | 空间受限 |
| **换行模式** | 自动换行 | 动态 | 空间充足 |

### 配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| isEllipsis | 是否启用文本省略 | boolean | false |

### 最佳实践
- 在固定宽度容器中建议启用省略
- 重要信息建议不启用省略，确保完整显示
- 配合 tooltip 提供完整文本的查看方式
- 考虑多语言环境下的文本长度差异
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 启用文本省略 -->
<div style="width: 300px;">
  <hy-form>
    <hy-gt model="productOptions" [noBorder]="true" flex="300px">
      <hy-checkbox 
        title="产品特性" 
        dic="longTextOptions" 
        [onelineNum]="2" 
        [isEllipsis]="true">
      </hy-checkbox>
    </hy-gt>
  </hy-form>
</div>

<!-- 不启用省略，自动换行 -->
<div style="width: 300px;">
  <hy-form>
    <hy-gt model="productFull" [noBorder]="true" flex="300px">
      <hy-checkbox 
        title="产品特性（完整显示）" 
        dic="longTextOptions" 
        [onelineNum]="2" 
        [isEllipsis]="false">
      </hy-checkbox>
    </hy-gt>
  </hy-form>
</div>

<!-- 在表格中使用 -->
<nz-table [nzData]="tableData">
  <thead>
    <tr>
      <th>用户</th>
      <th style="width: 200px;">权限设置</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let user of tableData">
      <td>{{user.name}}</td>
      <td>
        <hy-form>
          <hy-gt [model]="user.permissions" [noBorder]="true">
            <hy-checkbox 
              dic="userPermissions" 
              [onelineNum]="1" 
              [isEllipsis]="true">
            </hy-checkbox>
          </hy-gt>
        </hy-form>
      </td>
    </tr>
  </tbody>
</nz-table>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "响应式处理",
      template: previewTemplate`
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-ellipsis-checkbox-demo',
  templateUrl: './ellipsis-checkbox-demo.component.html'
})
export class EllipsisCheckboxDemoComponent {
  // 表单数据
  productOptions = {
    features: []
  };

  productFull = {
    features: []
  };

  // 表格数据
  tableData = [
    { name: '张三', permissions: { roles: [] } },
    { name: '李四', permissions: { roles: [] } },
    { name: '王五', permissions: { roles: [] } }
  ];

  // 屏幕宽度
  screenWidth: number = window.innerWidth;

  // 监听窗口大小变化
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }

  // 根据屏幕宽度判断是否启用省略
  get shouldUseEllipsis(): boolean {
    return this.screenWidth < 768; // 移动端启用省略
  }

  // 根据屏幕宽度计算每行显示数量
  get onelineNumByScreen(): number {
    if (this.screenWidth < 576) return 1; // 超小屏
    if (this.screenWidth < 768) return 2; // 小屏
    if (this.screenWidth < 992) return 3; // 中屏
    return 4; // 大屏
  }

  // 获取完整文本（用于tooltip）
  getFullText(option: any): string {
    return option.label || option.text || '';
  }

  // 检查文本是否被截断
  isTextTruncated(element: HTMLElement): boolean {
    return element.scrollWidth > element.clientWidth;
  }

  // 处理选项点击事件
  handleOptionClick(option: any, event: Event) {
    const target = event.target as HTMLElement;
    
    // 如果文本被截断，显示完整文本
    if (this.isTextTruncated(target)) {
      this.showFullTextTooltip(option, event);
    }
  }

  // 显示完整文本提示
  private showFullTextTooltip(option: any, event: Event) {
    // 实现tooltip显示逻辑
    console.log('显示完整文本:', this.getFullText(option));
    // 可以使用第三方tooltip库或自定义实现
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "样式定制",
      template: previewTemplate`
/* 自定义省略样式 */
.hy-checkbox-ellipsis {
  .checkbox-option-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
  }

  /* 悬停时显示完整文本 */
  .checkbox-option-text:hover {
    overflow: visible;
    white-space: normal;
    position: relative;
    z-index: 1000;
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    padding: 4px 8px;
    border-radius: 4px;
  }
}

/* 响应式文本大小 */
@media (max-width: 768px) {
  .hy-checkbox-ellipsis {
    .checkbox-option-text {
      font-size: 14px;
      max-width: 120px;
    }
  }
}

@media (max-width: 576px) {
  .hy-checkbox-ellipsis {
    .checkbox-option-text {
      font-size: 12px;
      max-width: 100px;
    }
  }
}

/* 表格中的省略样式 */
.table-checkbox-cell {
  .hy-checkbox-ellipsis {
    .checkbox-option-text {
      max-width: 80px;
    }
  }
}

/* 卡片中的省略样式 */
.card-checkbox-container {
  .hy-checkbox-ellipsis {
    .checkbox-option-text {
      max-width: 150px;
    }
  }
}
      `,
      language: "css",
      copy: true
    }
  ]
};

// 综合示例
const ComprehensiveTemplate: Story<HyCheckboxComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>综合示例</h3>
      <p>结合多个特性的综合使用示例，展示实际项目中的应用场景</p>
      
      <div style="margin-bottom: 32px;">
        <h4>用户权限配置</h4>
        <div style="background: #fafafa; padding: 20px; border-radius: 6px;">
          <div style="margin-bottom: 16px;">
            <span style="margin-right: 16px;">用户角色:</span>
            <button 
              type="button" 
              class="ant-btn ant-btn-small"
              [class.ant-btn-primary]="selectedRole === 'admin'"
              (click)="selectRole('admin')"
              style="margin-right: 8px;">
              管理员
            </button>
            <button 
              type="button" 
              class="ant-btn ant-btn-small"
              [class.ant-btn-primary]="selectedRole === 'editor'"
              (click)="selectRole('editor')"
              style="margin-right: 8px;">
              编辑者
            </button>
            <button 
              type="button" 
              class="ant-btn ant-btn-small"
              [class.ant-btn-primary]="selectedRole === 'viewer'"
              (click)="selectRole('viewer')">
              查看者
            </button>
          </div>
          
          <hy-form>
            <hy-gt model="userPermissions" [noBorder]="true" [cols]="24">
              <hy-checkbox 
                title="系统权限（必选）" 
                dic="testValue" 
                [onelineNum]="3" 
                [enableAllow]="allowedPermissions"
                [ckRequired]="true"
                [isEllipsis]="true">
              </hy-checkbox>
              <div style="margin-top: 16px;">
                <button 
                  type="button" 
                  class="ant-btn ant-btn-primary"
                  (click)="savePermissions()"
                  style="margin-right: 8px;">
                  保存设置
                </button>
                <button 
                  type="button" 
                  class="ant-btn"
                  (click)="resetPermissions()">
                  重置
                </button>
              </div>
            </hy-gt>
          </hy-form>
        </div>
      </div>

      <div style="margin-bottom: 32px;">
        <h4>产品特性选择</h4>
        <div style="background: #f6ffed; border: 1px solid #b7eb8f; padding: 20px; border-radius: 6px;">
          <hy-form>
            <hy-gt model="productFeatures" [noBorder]="true" [cols]="24">
              <hy-checkbox 
                title="可选功能模块" 
                dic="testValue" 
                [onelineNum]="4" 
                [isEllipsis]="false">
              </hy-checkbox>
              <div style="margin-top: 12px; color: #52c41a; font-size: 12px;">
                ✓ 已选择 {{getSelectedCount()}} 个功能模块
              </div>
            </hy-gt>
          </hy-form>
        </div>
      </div>

      <div style="margin-bottom: 32px;">
        <h4>移动端适配示例</h4>
        <div style="max-width: 375px; border: 2px solid #1890ff; border-radius: 8px; padding: 16px; background: white;">
          <div style="text-align: center; color: #1890ff; font-weight: bold; margin-bottom: 16px;">
            📱 移动端视图
          </div>
          <hy-form>
            <hy-gt model="mobileSettings" [noBorder]="true" [cols]="24">
              <hy-checkbox 
                title="通知设置" 
                dic="testValue" 
                [onelineNum]="1" 
                [isEllipsis]="true"
                [ckRequired]="false">
              </hy-checkbox>
            </hy-gt>
          </hy-form>
        </div>
      </div>
    </div>
  `
});

export const comprehensive = ComprehensiveTemplate.bind({});
comprehensive.args = {
  selectedRole: 'viewer',
  allowedPermissions: ['1'],
  userPermissions: { permissions: [] },
  productFeatures: { features: [] },
  mobileSettings: { notifications: [] },
  
  selectRole: function(role: string) {
    this.selectedRole = role;
    
    // 根据角色设置允许的权限
    const rolePermissionMap = {
      'admin': ['1', '2', '3'],
      'editor': ['1', '2'],
      'viewer': ['1']
    };
    
    this.allowedPermissions = rolePermissionMap[role] || ['1'];
    
    // 清理当前不被允许的选择
    if (this.userPermissions && this.userPermissions.permissions) {
      this.userPermissions.permissions = this.userPermissions.permissions.filter(
        p => this.allowedPermissions.includes(p)
      );
    }
    
    $hyapi.msg.createTips('info', `已切换到${role}角色权限`);
  },
  
  savePermissions: function() {
    if (!this.userPermissions.permissions || this.userPermissions.permissions.length === 0) {
      $hyapi.msg.createTips('error', '请至少选择一个系统权限');
      return;
    }
    
    console.log('保存权限配置:', {
      role: this.selectedRole,
      permissions: this.userPermissions.permissions
    });
    
    $hyapi.msg.createTips('success', '权限配置保存成功');
  },
  
  resetPermissions: function() {
    this.userPermissions.permissions = [];
    this.productFeatures.features = [];
    this.mobileSettings.notifications = [];
    $hyapi.msg.createTips('info', '已重置所有选择');
  },
  
  getSelectedCount: function() {
    return this.productFeatures.features ? this.productFeatures.features.length : 0;
  }
};
comprehensive.storyName = '综合示例';
comprehensive.parameters = {
  docs: {
    description: {
      story: `
## 综合示例

展示多选框组件在实际项目中的综合应用，包含权限管理、产品配置、移动端适配等典型场景。

### 实际应用场景

#### 1. 权限管理系统
- **角色控制**: 根据用户角色动态控制可选权限
- **必填验证**: 确保用户至少选择基本权限
- **实时更新**: 角色切换时自动更新可选项

#### 2. 产品配置
- **功能模块**: 用户可选择需要的功能模块
- **计数显示**: 实时显示已选择的模块数量
- **视觉反馈**: 通过颜色和图标提供状态反馈

#### 3. 移动端适配
- **响应式布局**: 适配不同屏幕尺寸
- **文本省略**: 在有限空间中优化显示
- **触控友好**: 适合移动设备的交互体验

### 技术特性组合
- \`enableAllow\` + \`ckRequired\`: 权限控制 + 必填验证
- \`isEllipsis\` + \`onelineNum\`: 文本优化 + 布局控制
- 动态数据绑定 + 事件处理: 交互逻辑

### 最佳实践
1. **渐进式增强**: 从基础功能开始，逐步添加高级特性
2. **用户体验**: 提供清晰的视觉反馈和操作指引
3. **数据验证**: 在前端和后端都进行适当的验证
4. **响应式设计**: 确保在各种设备上都有良好体验
5. **可访问性**: 考虑键盘导航和屏幕阅读器支持

### 扩展建议
- 添加搜索功能（大量选项时）
- 支持全选/反选操作
- 提供批量操作功能
- 集成表单验证框架
- 添加国际化支持
`
    }
  },
  preview: [
    {
      tab: "完整示例",
      template: previewTemplate`
<!-- 权限管理界面 -->
<div class="permission-management">
  <div class="role-selector">
    <h4>选择用户角色</h4>
    <nz-radio-group [(ngModel)]="selectedRole" (ngModelChange)="onRoleChange($event)">
      <label nz-radio nzValue="admin">超级管理员</label>
      <label nz-radio nzValue="manager">部门经理</label>
      <label nz-radio nzValue="editor">内容编辑</label>
      <label nz-radio nzValue="viewer">访客用户</label>
    </nz-radio-group>
  </div>

  <div class="permission-config">
    <hy-form>
      <hy-gt model="permissionData" [noBorder]="true" [cols]="24">
        <hy-checkbox 
          title="系统权限配置" 
          dic="systemPermissions" 
          [onelineNum]="getPermissionColumns()"
          [enableAllow]="getAllowedPermissions()"
          [ckRequired]="true"
          [isEllipsis]="isMobileView()">
        </hy-checkbox>
        
        <hy-checkbox 
          title="功能模块权限" 
          dic="modulePermissions" 
          [onelineNum]="getModuleColumns()"
          [enableAllow]="getAllowedModules()"
          [isEllipsis]="isMobileView()">
        </hy-checkbox>
      </hy-gt>
    </hy-form>
  </div>

  <div class="action-buttons">
    <nz-button-group>
      <button nz-button nzType="primary" (click)="saveConfiguration()">
        <i nz-icon nzType="save"></i>
        保存配置
      </button>
      <button nz-button (click)="previewConfiguration()">
        <i nz-icon nzType="eye"></i>
        预览权限
      </button>
      <button nz-button nzDanger (click)="resetConfiguration()">
        <i nz-icon nzType="reload"></i>
        重置配置
      </button>
    </nz-button-group>
  </div>
</div>

<!-- 产品配置界面 -->
<div class="product-configuration">
  <nz-card nzTitle="产品功能配置" [nzExtra]="extraTemplate">
    <hy-form>
      <hy-gt model="productConfig" [noBorder]="true" [cols]="24">
        <hy-checkbox 
          title="基础功能（必选）" 
          dic="basicFeatures" 
          [onelineNum]="3"
          [ckRequired]="true"
          [enableAllow]="getBasicFeatures()">
        </hy-checkbox>
        
        <hy-checkbox 
          title="高级功能" 
          dic="advancedFeatures" 
          [onelineNum]="4"
          [enableAllow]="getAdvancedFeatures()">
        </hy-checkbox>
        
        <hy-checkbox 
          title="插件扩展" 
          dic="pluginFeatures" 
          [onelineNum]="5"
          [isEllipsis]="true">
        </hy-checkbox>
      </hy-gt>
    </hy-form>
    
    <ng-template #extraTemplate>
      <nz-tag [nzColor]="getConfigStatusColor()">
        {{getConfigStatusText()}}
      </nz-tag>
    </ng-template>
  </nz-card>
</div>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "业务逻辑",
      template: previewTemplate`
import { Component, OnInit, HostListener } from '@angular/core';
import { $hyapi } from '@hy/frame';

@Component({
  selector: 'app-comprehensive-checkbox-demo',
  templateUrl: './comprehensive-checkbox-demo.component.html',
  styleUrls: ['./comprehensive-checkbox-demo.component.less']
})
export class ComprehensiveCheckboxDemoComponent implements OnInit {
  // 表单数据模型
  permissionData = {
    systemPermissions: [],
    modulePermissions: []
  };

  productConfig = {
    basicFeatures: [],
    advancedFeatures: [],
    pluginFeatures: []
  };

  // 当前选中的角色
  selectedRole = 'viewer';

  // 屏幕宽度（用于响应式判断）
  private screenWidth = window.innerWidth;

  // 权限配置映射
  private readonly ROLE_PERMISSIONS = {
    admin: {
      system: ['user_manage', 'system_config', 'data_export', 'audit_log'],
      modules: ['all_modules']
    },
    manager: {
      system: ['user_manage', 'data_export'],
      modules: ['department_modules']
    },
    editor: {
      system: ['data_export'],
      modules: ['content_modules']
    },
    viewer: {
      system: ['basic_view'],
      modules: ['view_modules']
    }
  };

  ngOnInit() {
    this.initializeDefaultValues();
  }

  // 监听窗口大小变化
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }

  // 初始化默认值
  private initializeDefaultValues() {
    this.onRoleChange(this.selectedRole);
  }

  // 角色变更处理
  onRoleChange(role: string) {
    this.selectedRole = role;
    this.cleanupInvalidSelections();
    
    $hyapi.msg.createTips('info', \`已切换到 \${this.getRoleDisplayName(role)} 权限\`);
  }

  // 获取角色显示名称
  private getRoleDisplayName(role: string): string {
    const roleNames = {
      admin: '超级管理员',
      manager: '部门经理', 
      editor: '内容编辑',
      viewer: '访客用户'
    };
    return roleNames[role] || role;
  }

  // 获取允许的系统权限
  getAllowedPermissions(): string[] {
    return this.ROLE_PERMISSIONS[this.selectedRole]?.system || [];
  }

  // 获取允许的模块权限
  getAllowedModules(): string[] {
    return this.ROLE_PERMISSIONS[this.selectedRole]?.modules || [];
  }

  // 获取基础功能列表
  getBasicFeatures(): string[] {
    // 基础功能对所有用户开放
    return ['login', 'profile', 'notification'];
  }

  // 获取高级功能列表
  getAdvancedFeatures(): string[] {
    if (this.selectedRole === 'admin') {
      return ['analytics', 'reporting', 'integration', 'automation'];
    }
    if (this.selectedRole === 'manager') {
      return ['analytics', 'reporting'];
    }
    return [];
  }

  // 清理无效选择
  private cleanupInvalidSelections() {
    const allowedSys = this.getAllowedPermissions();
    const allowedMod = this.getAllowedModules();

    this.permissionData.systemPermissions = 
      this.permissionData.systemPermissions.filter(p => allowedSys.includes(p));
    
    this.permissionData.modulePermissions = 
      this.permissionData.modulePermissions.filter(p => allowedMod.includes(p));
  }

  // 获取权限列数（响应式）
  getPermissionColumns(): number {
    if (this.isMobileView()) return 1;
    if (this.screenWidth < 992) return 2;
    return 3;
  }

  // 获取模块列数
  getModuleColumns(): number {
    if (this.isMobileView()) return 1;
    if (this.screenWidth < 1200) return 3;
    return 4;
  }

  // 判断是否为移动端视图
  isMobileView(): boolean {
    return this.screenWidth < 768;
  }

  // 保存配置
  saveConfiguration() {
    // 验证必填项
    if (this.permissionData.systemPermissions.length === 0) {
      $hyapi.msg.createTips('error', '请至少选择一个系统权限');
      return;
    }

    const config = {
      role: this.selectedRole,
      permissions: this.permissionData,
      features: this.productConfig,
      timestamp: new Date().toISOString()
    };

    console.log('保存配置:', config);
    
    // 模拟API调用
    $hyapi.msg.createTips('loading', '正在保存配置...', 1000);
    
    setTimeout(() => {
      $hyapi.msg.createTips('success', '配置保存成功');
      this.logConfigurationChange(config);
    }, 1000);
  }

  // 预览配置
  previewConfiguration() {
    const preview = this.generateConfigPreview();
    
    $hyapi.modal.info({
      title: '权限配置预览',
      content: \`
        <div>
          <h4>角色: \${this.getRoleDisplayName(this.selectedRole)}</h4>
          <h5>系统权限:</h5>
          <ul>\${preview.systemPermissions.map(p => \`<li>\${p}</li>\`).join('')}</ul>
          <h5>功能模块:</h5>
          <ul>\${preview.features.map(f => \`<li>\${f}</li>\`).join('')}</ul>
        </div>
      \`,
      width: 600
    });
  }

  // 重置配置
  resetConfiguration() {
    $hyapi.modal.confirm('确定要重置所有配置吗？', {
      content: '重置后将清空所有选择项',
      onOk: () => {
        this.permissionData = {
          systemPermissions: [],
          modulePermissions: []
        };
        
        this.productConfig = {
          basicFeatures: [],
          advancedFeatures: [],
          pluginFeatures: []
        };
        
        $hyapi.msg.createTips('success', '配置已重置');
      }
    });
  }

  // 生成配置预览
  private generateConfigPreview() {
    return {
      role: this.selectedRole,
      systemPermissions: this.permissionData.systemPermissions,
      modulePermissions: this.permissionData.modulePermissions,
      features: [
        ...this.productConfig.basicFeatures,
        ...this.productConfig.advancedFeatures,
        ...this.productConfig.pluginFeatures
      ]
    };
  }

  // 记录配置变更日志
  private logConfigurationChange(config: any) {
    console.log('配置变更记录:', {
      userId: 'current_user_id',
      action: 'update_permissions',
      config: config,
      timestamp: new Date()
    });
  }

  // 获取配置状态颜色
  getConfigStatusColor(): string {
    const totalSelected = this.getTotalSelectedCount();
    if (totalSelected === 0) return 'default';
    if (totalSelected < 3) return 'orange';
    return 'green';
  }

  // 获取配置状态文本
  getConfigStatusText(): string {
    const totalSelected = this.getTotalSelectedCount();
    if (totalSelected === 0) return '未配置';
    if (totalSelected < 3) return '部分配置';
    return '已完成配置';
  }

  // 获取总选择数量
  private getTotalSelectedCount(): number {
    return (
      this.permissionData.systemPermissions.length +
      this.permissionData.modulePermissions.length +
      this.productConfig.basicFeatures.length +
      this.productConfig.advancedFeatures.length +
      this.productConfig.pluginFeatures.length
    );
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};
