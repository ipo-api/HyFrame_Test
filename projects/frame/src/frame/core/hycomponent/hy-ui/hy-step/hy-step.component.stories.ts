import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../base/base.module';
import { HyStepComponent } from './hy-step.component';
import { unit } from '../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

const argTypes = unit.createArgTypes('HyStepComponent');

export default {
  title: '表单组件/hy-step（步骤条）',
  component: HyStepComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [ModelService, TableService]
    }),
  ],
  argTypes,
} as Meta;

// 基础用法
const BasicTemplate: Story<HyStepComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础步骤条用法</h3>
      <p>用于展示操作流程的各个步骤，引导用户按流程完成任务</p>
      
      <hy-form>
        <hy-step [current]="current" [stepTitle]="stepTitle" (getCurrentNum)="handleStepChange($event)" (onClickOk)="handleOk()">
          <div *ngIf="current == 0" class="step-content">
            <div class="step-panel">
              <h4>👤 选择成员</h4>
              <p>请选择需要添加的团队成员</p>
              <div class="content-area">
                <hy-gt model="step1">
                  <hy-text title="成员姓名" model="memberName" [ckRequired]="true" placeholder="请输入成员姓名"></hy-text>
                  <hy-select title="部门" model="department" [ckRequired]="true" 
                             [options]="departmentOptions" placeholder="请选择部门"></hy-select>
                  <hy-select title="职位" model="position" [ckRequired]="true"
                             [options]="positionOptions" placeholder="请选择职位"></hy-select>
                </hy-gt>
              </div>
            </div>
          </div>
          
          <div *ngIf="current == 1" class="step-content">
            <div class="step-panel">
              <h4>🔐 分配权限</h4>
              <p>为选择的成员分配相应的系统权限</p>
              <div class="content-area">
                <hy-gt model="step2">
                  <hy-checkbox title="基础权限" model="basicPermission" [options]="basicPermissions"></hy-checkbox>
                  <hy-checkbox title="管理权限" model="adminPermission" [options]="adminPermissions"></hy-checkbox>
                  <hy-textarea title="备注" model="remark" placeholder="请输入权限分配备注"></hy-textarea>
                </hy-gt>
              </div>
            </div>
          </div>
          
          <div *ngIf="current == 2" class="step-content">
            <div class="step-panel">
              <h4>✅ 完成设置</h4>
              <p>确认信息并完成成员添加</p>
              <div class="content-area">
                <div class="summary-info">
                  <div class="info-item">
                    <span class="label">成员姓名：</span>
                    <span class="value">{{memberInfo.name}}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">所属部门：</span>
                    <span class="value">{{memberInfo.department}}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">职位：</span>
                    <span class="value">{{memberInfo.position}}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">分配权限：</span>
                    <span class="value">{{memberInfo.permissions}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </hy-step>
      </hy-form>
    </div>
  `
});

export const basic = BasicTemplate.bind({});
basic.args = {
  current: 0,
  stepTitle: [
    { title: '选择成员' },
    { title: '分配权限' },
    { title: '完成设置' }
  ],
  departmentOptions: [
    { label: '技术部', value: 'tech' },
    { label: '产品部', value: 'product' },
    { label: '设计部', value: 'design' },
    { label: '运营部', value: 'operation' }
  ],
  positionOptions: [
    { label: '高级工程师', value: 'senior' },
    { label: '工程师', value: 'engineer' },
    { label: '初级工程师', value: 'junior' }
  ],
  basicPermissions: [
    { label: '查看权限', value: 'view' },
    { label: '编辑权限', value: 'edit' },
    { label: '下载权限', value: 'download' }
  ],
  adminPermissions: [
    { label: '用户管理', value: 'user_manage' },
    { label: '系统设置', value: 'system_config' },
    { label: '数据统计', value: 'data_stats' }
  ],
  memberInfo: {
    name: '张三',
    department: '技术部',
    position: '高级工程师',
    permissions: '查看、编辑、用户管理'
  },
  handleStepChange: (step: number) => {
    console.log('步骤变更为：', step);
  },
  handleOk: () => {
    console.log('点击确定按钮');
    alert('成员添加完成！');
  }
};
basic.storyName = '基础用法';
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

步骤条用于展示操作流程的各个步骤，引导用户按流程完成复杂任务。

### 🎯 主要特性

#### 流程引导
- 清晰显示当前步骤和进度
- 支持步骤间的前进和后退
- 每个步骤可包含独立的表单内容

#### 状态管理
- **current**: 当前激活的步骤索引
- **stepTitle**: 步骤标题配置数组
- **getCurrentNum**: 步骤变更事件回调
- **onClickOk**: 确定按钮点击事件

#### 内容区域
- 每个步骤可包含任意的HTML内容
- 支持表单控件和复杂交互组件
- 通过*ngIf控制不同步骤的内容显示

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| current | 当前步骤索引 | number | 0 |
| stepTitle | 步骤标题数组 | Array<{title: string}> | [] |
| getCurrentNum | 步骤变更回调 | EventEmitter<number> | - |
| onClickOk | 确定按钮回调 | EventEmitter<void> | - |

### 💡 使用场景

#### 表单向导
- **用户注册**: 基本信息 → 详细信息 → 验证完成
- **订单提交**: 商品选择 → 地址确认 → 支付完成
- **系统配置**: 基础设置 → 高级配置 → 应用生效

#### 业务流程
- **项目创建**: 项目信息 → 团队配置 → 权限分配
- **审批流程**: 申请提交 → 主管审批 → 完成处理
- **数据导入**: 文件上传 → 格式验证 → 导入完成
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-step [current]="current" 
           [stepTitle]="stepTitle" 
           (getCurrentNum)="handleStepChange($event)" 
           (onClickOk)="handleOk()">
    
    <!-- 第一步：选择成员 -->
    <div *ngIf="current == 0" class="step-content">
      <h4>👤 选择成员</h4>
      <hy-gt model="step1">
        <hy-text title="成员姓名" model="memberName" 
                 [ckRequired]="true" 
                 placeholder="请输入成员姓名"></hy-text>
        <hy-select title="部门" model="department" 
                   [ckRequired]="true" 
                   [options]="departmentOptions"></hy-select>
      </hy-gt>
    </div>
    
    <!-- 第二步：分配权限 -->
    <div *ngIf="current == 1" class="step-content">
      <h4>🔐 分配权限</h4>
      <hy-gt model="step2">
        <hy-checkbox title="基础权限" model="basicPermission" 
                     [options]="basicPermissions"></hy-checkbox>
        <hy-checkbox title="管理权限" model="adminPermission" 
                     [options]="adminPermissions"></hy-checkbox>
      </hy-gt>
    </div>
    
    <!-- 第三步：完成设置 -->
    <div *ngIf="current == 2" class="step-content">
      <h4>✅ 完成设置</h4>
      <div class="summary-info">
        <div>成员姓名：{{memberInfo.name}}</div>
        <div>所属部门：{{memberInfo.department}}</div>
        <div>分配权限：{{memberInfo.permissions}}</div>
      </div>
    </div>
  </hy-step>
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
  selector: 'app-step-demo',
  templateUrl: './step-demo.component.html'
})
export class StepDemoComponent {
  // 当前步骤
  current = 0;
  
  // 步骤配置
  stepTitle = [
    { title: '选择成员' },
    { title: '分配权限' },
    { title: '完成设置' }
  ];
  
  // 表单数据
  formData = {
    step1: {
      memberName: '',
      department: '',
      position: ''
    },
    step2: {
      basicPermission: [],
      adminPermission: [],
      remark: ''
    }
  };
  
  // 选项数据
  departmentOptions = [
    { label: '技术部', value: 'tech' },
    { label: '产品部', value: 'product' },
    { label: '设计部', value: 'design' }
  ];
  
  basicPermissions = [
    { label: '查看权限', value: 'view' },
    { label: '编辑权限', value: 'edit' },
    { label: '下载权限', value: 'download' }
  ];
  
  // 步骤变更处理
  handleStepChange(step: number) {
    this.current = step;
    console.log('当前步骤：', step);
    
    // 步骤验证
    if (step > this.current) {
      if (!this.validateCurrentStep()) {
        return; // 阻止步骤前进
      }
    }
  }
  
  // 确定按钮处理
  handleOk() {
    if (this.current < this.stepTitle.length - 1) {
      // 下一步
      if (this.validateCurrentStep()) {
        this.current++;
      }
    } else {
      // 完成流程
      this.submitForm();
    }
  }
  
  // 验证当前步骤
  validateCurrentStep(): boolean {
    switch(this.current) {
      case 0:
        return this.validateStep1();
      case 1:
        return this.validateStep2();
      default:
        return true;
    }
  }
  
  // 验证第一步
  validateStep1(): boolean {
    const data = this.formData.step1;
    if (!data.memberName || !data.department) {
      alert('请完善成员基本信息');
      return false;
    }
    return true;
  }
  
  // 验证第二步
  validateStep2(): boolean {
    const data = this.formData.step2;
    if (data.basicPermission.length === 0) {
      alert('请至少选择一项基础权限');
      return false;
    }
    return true;
  }
  
  // 提交表单
  submitForm() {
    const result = {
      member: this.formData.step1,
      permissions: this.formData.step2
    };
    
    console.log('提交数据：', result);
    alert('成员添加完成！');
    
    // 重置流程
    this.resetSteps();
  }
  
  // 重置步骤
  resetSteps() {
    this.current = 0;
    this.formData = {
      step1: { memberName: '', department: '', position: '' },
      step2: { basicPermission: [], adminPermission: [], remark: '' }
    };
  }
  
  // 跳转到指定步骤
  goToStep(step: number) {
    if (step >= 0 && step < this.stepTitle.length) {
      this.current = step;
    }
  }
  
  // 获取步骤状态
  getStepStatus(index: number): 'process' | 'finish' | 'wait' | 'error' {
    if (index < this.current) return 'finish';
    if (index === this.current) return 'process';
    return 'wait';
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 步骤状态控制
const StatusTemplate: Story<HyStepComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>步骤状态控制</h4>
        <p>通过编程方式控制步骤的状态和进度</p>
        
        <div style="margin-bottom: 20px;">
          <hy-button title="上一步" [disabled]="current <= 0" (onClick)="previousStep()"></hy-button>
          <hy-button title="下一步" [disabled]="current >= stepTitle.length - 1" (onClick)="nextStep()"></hy-button>
          <hy-button title="重置" (onClick)="resetSteps()"></hy-button>
          <hy-button title="跳转到步骤2" (onClick)="goToStep(1)"></hy-button>
        </div>
        
        <hy-form>
          <hy-step [current]="current" [stepTitle]="stepTitle" (getCurrentNum)="handleStepChange($event)">
            <div *ngIf="current == 0" class="step-content">
              <div class="step-info">
                <h4>📝 项目基本信息</h4>
                <p>当前状态：{{getStepStatus(0)}}</p>
                <hy-gt model="projectInfo">
                  <hy-text title="项目名称" model="name" placeholder="请输入项目名称"></hy-text>
                  <hy-textarea title="项目描述" model="description" placeholder="请输入项目描述"></hy-textarea>
                </hy-gt>
              </div>
            </div>
            
            <div *ngIf="current == 1" class="step-content">
              <div class="step-info">
                <h4>👥 团队配置</h4>
                <p>当前状态：{{getStepStatus(1)}}</p>
                <hy-gt model="teamConfig">
                  <hy-select title="项目经理" model="manager" [options]="managerOptions"></hy-select>
                  <hy-checkbox title="团队成员" model="members" [options]="memberOptions"></hy-checkbox>
                </hy-gt>
              </div>
            </div>
            
            <div *ngIf="current == 2" class="step-content">
              <div class="step-info">
                <h4>⚙️ 项目设置</h4>
                <p>当前状态：{{getStepStatus(2)}}</p>
                <hy-gt model="projectSettings">
                  <hy-date title="开始日期" model="startDate"></hy-date>
                  <hy-date title="预计结束" model="endDate"></hy-date>
                  <hy-select title="优先级" model="priority" [options]="priorityOptions"></hy-select>
                </hy-gt>
              </div>
            </div>
            
            <div *ngIf="current == 3" class="step-content">
              <div class="step-info">
                <h4>✅ 确认信息</h4>
                <p>当前状态：{{getStepStatus(3)}}</p>
                <div class="confirm-info">
                  <div><strong>项目信息确认完成</strong></div>
                  <div>您可以点击"完成"按钮创建项目，或返回修改信息。</div>
                </div>
              </div>
            </div>
          </hy-step>
        </hy-form>
      </div>
    </div>
  `
});

export const status = StatusTemplate.bind({});
status.args = {
  current: 0,
  stepTitle: [
    { title: '项目信息' },
    { title: '团队配置' },
    { title: '项目设置' },
    { title: '确认完成' }
  ],
  managerOptions: [
    { label: '张经理', value: 'zhang' },
    { label: '李经理', value: 'li' },
    { label: '王经理', value: 'wang' }
  ],
  memberOptions: [
    { label: '开发A', value: 'dev_a' },
    { label: '开发B', value: 'dev_b' },
    { label: '测试A', value: 'test_a' },
    { label: '设计师', value: 'designer' }
  ],
  priorityOptions: [
    { label: '高优先级', value: 'high' },
    { label: '中优先级', value: 'medium' },
    { label: '低优先级', value: 'low' }
  ],
  handleStepChange: (step: number) => {
    console.log('步骤变更：', step);
  },
  previousStep: function() {
    if (this.current > 0) {
      this.current--;
    }
  },
  nextStep: function() {
    if (this.current < this.stepTitle.length - 1) {
      this.current++;
    }
  },
  resetSteps: function() {
    this.current = 0;
  },
  goToStep: function(step: number) {
    this.current = step;
  },
  getStepStatus: function(index: number) {
    if (index < this.current) return '已完成';
    if (index === this.current) return '进行中';
    return '等待中';
  }
};
status.storyName = '步骤状态控制';
status.parameters = {
  docs: {
    description: {
      story: `
## 步骤状态控制

通过编程方式灵活控制步骤的状态、进度和跳转行为。

### 🎮 控制方式

#### 步骤导航
- **上一步**: 返回到前一个步骤
- **下一步**: 前进到下一个步骤  
- **跳转**: 直接跳转到指定步骤
- **重置**: 返回到第一步并清空数据

#### 状态管理
- **process**: 当前正在进行的步骤
- **finish**: 已完成的步骤
- **wait**: 等待执行的步骤
- **error**: 验证失败的步骤

### 🔧 编程接口

#### 步骤控制方法
\`\`\`typescript
// 前进到下一步
nextStep() {
  if (this.current < this.stepTitle.length - 1) {
    this.current++;
  }
}

// 返回上一步
previousStep() {
  if (this.current > 0) {
    this.current--;
  }
}

// 跳转到指定步骤
goToStep(step: number) {
  if (step >= 0 && step < this.stepTitle.length) {
    this.current = step;
  }
}
\`\`\`

#### 状态判断
\`\`\`typescript
getStepStatus(index: number): string {
  if (index < this.current) return 'finish';
  if (index === this.current) return 'process';  
  return 'wait';
}
\`\`\`

### 💡 最佳实践

1. **步骤验证**: 前进前验证当前步骤的必填项
2. **状态同步**: 保持UI状态与数据状态一致
3. **用户反馈**: 提供清晰的步骤状态提示
4. **错误处理**: 验证失败时阻止步骤前进并给出提示
`
    }
  }
};

// 综合应用示例
const CompleteTemplate: Story<HyStepComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>🏗️ 项目创建向导</h3>
      <p>完整的项目创建流程示例，展示步骤条在复杂业务场景中的应用</p>
      
      <div class="demo-case" style="border: 1px solid #f0f0f0; border-radius: 8px; padding: 20px; background: white;">
        <hy-form>
          <hy-step [current]="current" [stepTitle]="stepTitle" (getCurrentNum)="handleStepChange($event)" (onClickOk)="handleNext()">
            <!-- 步骤1: 项目基础信息 -->
            <div *ngIf="current == 0" class="step-content">
              <div class="step-header">
                <h4>📋 项目基础信息</h4>
                <div class="step-description">
                  <p>请填写项目的基本信息，这些信息将用于项目的标识和管理。</p>
                  <ul>
                    <li>项目名称应具有唯一性和描述性</li>
                    <li>选择合适的项目类型有助于后续配置</li>
                    <li>项目描述将帮助团队成员理解项目目标</li>
                  </ul>
                </div>
              </div>
              
              <hy-gt model="projectInfo">
                <hy-text title="项目名称" model="name" [ckRequired]="true" 
                         placeholder="请输入项目名称" 
                         [tip]="'项目名称应简洁明了，建议包含业务特征'"></hy-text>
                         
                <hy-select title="项目类型" model="type" [ckRequired]="true"
                           [options]="projectTypeOptions"
                           placeholder="请选择项目类型"
                           [tip]="'不同类型的项目将应用不同的默认配置'"></hy-select>
                           
                <hy-select title="所属部门" model="department" [ckRequired]="true"
                           [options]="departmentOptions" 
                           placeholder="请选择所属部门"></hy-select>
                           
                <hy-textarea title="项目描述" model="description" [ckRequired]="true"
                             placeholder="请详细描述项目的目标、范围和预期成果"
                             [rows]="4"></hy-textarea>
                             
                <hy-text title="项目代码" model="code" 
                         placeholder="系统将自动生成，也可手动输入"
                         [tip]="'项目代码用于系统内部标识，建议使用英文和数字'"></hy-text>
              </hy-gt>
            </div>
            
            <!-- 步骤2: 团队配置 -->
            <div *ngIf="current == 1" class="step-content">
              <div class="step-header">
                <h4>👥 团队配置</h4>
                <div class="step-description">
                  <p>配置项目团队成员和角色分工。</p>
                  <ul>
                    <li>项目经理负责项目整体推进和协调</li>
                    <li>技术负责人负责技术方案和实施</li>
                    <li>团队成员根据项目需要灵活配置</li>
                  </ul>
                </div>
              </div>
              
              <hy-gt model="teamConfig">
                <hy-select title="项目经理" model="manager" [ckRequired]="true"
                           [options]="managerOptions" 
                           placeholder="请选择项目经理"
                           [tip]="'项目经理将获得项目管理权限'"></hy-select>
                           
                <hy-select title="技术负责人" model="techLead" [ckRequired]="true"
                           [options]="techLeadOptions"
                           placeholder="请选择技术负责人"></hy-select>
                           
                <hy-checkbox title="开发团队" model="developers" [ckRequired]="true"
                             [options]="developerOptions"
                             [tip]="'请选择参与开发的团队成员'"></hy-checkbox>
                             
                <hy-checkbox title="测试团队" model="testers" 
                             [options]="testerOptions"
                             [tip]="'可选择专门的测试人员'"></hy-checkbox>
                             
                <hy-checkbox title="设计团队" model="designers"
                             [options]="designerOptions"></hy-checkbox>
              </hy-gt>
            </div>
            
            <!-- 步骤3: 项目配置 -->
            <div *ngIf="current == 2" class="step-content">
              <div class="step-header">
                <h4>⚙️ 项目配置</h4>
                <div class="step-description">
                  <p>设置项目的时间计划、优先级和其他配置选项。</p>
                </div>
              </div>
              
              <hy-gt model="projectConfig">
                <hy-date title="计划开始日期" model="startDate" [ckRequired]="true"
                         [tip]="'项目正式开始的日期'"></hy-date>
                         
                <hy-date title="计划结束日期" model="endDate" [ckRequired]="true"
                         [tip]="'项目预计完成的日期'"></hy-date>
                         
                <hy-select title="项目优先级" model="priority" [ckRequired]="true"
                           [options]="priorityOptions"
                           [defaultValue]="'medium'"
                           [tip]="'优先级影响资源分配和排期'"></hy-select>
                           
                <hy-select title="项目状态" model="status" [ckRequired]="true"
                           [options]="statusOptions"
                           [defaultValue]="'planning'"
                           [tip]="'当前项目所处的阶段'"></hy-select>
                           
                <hy-number title="预算金额" model="budget" 
                           [min]="0" [max]="10000000" [step]="1000"
                           [formatter]="budgetFormatter"
                           [tip]="'项目预算，单位：元'"></hy-number>
                           
                <hy-slider title="风险等级" model="riskLevel"
                           [min]="1" [max]="5" [step]="1"
                           [marks]="riskMarks"
                           [defaultValue]="3"
                           [tip]="'评估项目的整体风险等级'"></hy-slider>
              </hy-gt>
            </div>
            
            <!-- 步骤4: 权限配置 -->
            <div *ngIf="current == 3" class="step-content">
              <div class="step-header">
                <h4>🔐 权限配置</h4>
                <div class="step-description">
                  <p>配置项目的访问权限和操作权限。</p>
                </div>
              </div>
              
              <hy-gt model="permissionConfig">
                <hy-radio title="项目可见性" model="visibility" [ckRequired]="true"
                          [options]="visibilityOptions"
                          [defaultValue]="'internal'"></hy-radio>
                          
                <hy-checkbox title="基础权限" model="basicPermissions" [ckRequired]="true"
                             [options]="basicPermissionOptions"></hy-checkbox>
                             
                <hy-checkbox title="管理权限" model="adminPermissions"
                             [options]="adminPermissionOptions"></hy-checkbox>
                             
                <hy-checkbox title="高级权限" model="advancedPermissions"
                             [options]="advancedPermissionOptions"></hy-checkbox>
                             
                <hy-textarea title="权限说明" model="permissionNote"
                             placeholder="请描述特殊权限配置或限制"></hy-textarea>
              </hy-gt>
            </div>
            
            <!-- 步骤5: 确认创建 -->
            <div *ngIf="current == 4" class="step-content">
              <div class="step-header">
                <h4>✅ 确认创建</h4>
                <div class="step-description">
                  <p>请仔细检查以下信息，确认无误后点击"创建项目"完成创建。</p>
                </div>
              </div>
              
              <div class="confirmation-panel">
                <div class="info-section">
                  <h5>📋 项目信息</h5>
                  <div class="info-grid">
                    <div class="info-item">
                      <span class="label">项目名称：</span>
                      <span class="value">{{summaryData.projectName}}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">项目类型：</span>
                      <span class="value">{{summaryData.projectType}}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">所属部门：</span>
                      <span class="value">{{summaryData.department}}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">项目经理：</span>
                      <span class="value">{{summaryData.manager}}</span>
                    </div>
                  </div>
                </div>
                
                <div class="info-section">
                  <h5>👥 团队配置</h5>
                  <div class="info-grid">
                    <div class="info-item">
                      <span class="label">技术负责人：</span>
                      <span class="value">{{summaryData.techLead}}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">团队规模：</span>
                      <span class="value">{{summaryData.teamSize}}人</span>
                    </div>
                    <div class="info-item">
                      <span class="label">开发人员：</span>
                      <span class="value">{{summaryData.developers}}</span>
                    </div>
                  </div>
                </div>
                
                <div class="info-section">
                  <h5>⚙️ 项目配置</h5>
                  <div class="info-grid">
                    <div class="info-item">
                      <span class="label">开始日期：</span>
                      <span class="value">{{summaryData.startDate}}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">结束日期：</span>
                      <span class="value">{{summaryData.endDate}}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">项目优先级：</span>
                      <span class="value">{{summaryData.priority}}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">预算金额：</span>
                      <span class="value">{{summaryData.budget}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </hy-step>
        </hy-form>
      </div>
    </div>
  `
});

export const complete = CompleteTemplate.bind({});
complete.args = {
  current: 0,
  stepTitle: [
    { title: '项目信息' },
    { title: '团队配置' },
    { title: '项目配置' },
    { title: '权限配置' },
    { title: '确认创建' }
  ],
  
  // 选项数据
  projectTypeOptions: [
    { label: 'Web应用', value: 'web' },
    { label: '移动应用', value: 'mobile' },
    { label: '桌面应用', value: 'desktop' },
    { label: '数据分析', value: 'analytics' },
    { label: '系统集成', value: 'integration' }
  ],
  
  departmentOptions: [
    { label: '技术部', value: 'tech' },
    { label: '产品部', value: 'product' },
    { label: '设计部', value: 'design' },
    { label: '运营部', value: 'operation' }
  ],
  
  managerOptions: [
    { label: '张项目经理', value: 'zhang_pm' },
    { label: '李项目经理', value: 'li_pm' },
    { label: '王项目经理', value: 'wang_pm' }
  ],
  
  techLeadOptions: [
    { label: '高级架构师A', value: 'architect_a' },
    { label: '高级架构师B', value: 'architect_b' },
    { label: '技术专家C', value: 'expert_c' }
  ],
  
  developerOptions: [
    { label: '前端开发 - 小张', value: 'frontend_zhang' },
    { label: '后端开发 - 小李', value: 'backend_li' },
    { label: '全栈开发 - 小王', value: 'fullstack_wang' },
    { label: '移动开发 - 小陈', value: 'mobile_chen' }
  ],
  
  priorityOptions: [
    { label: '高优先级', value: 'high' },
    { label: '中优先级', value: 'medium' },
    { label: '低优先级', value: 'low' }
  ],
  
  statusOptions: [
    { label: '规划中', value: 'planning' },
    { label: '进行中', value: 'in_progress' },
    { label: '已暂停', value: 'paused' }
  ],
  
  visibilityOptions: [
    { label: '公开项目', value: 'public' },
    { label: '内部项目', value: 'internal' },
    { label: '私有项目', value: 'private' }
  ],
  
  basicPermissionOptions: [
    { label: '查看项目', value: 'view' },
    { label: '下载文档', value: 'download' },
    { label: '提交反馈', value: 'feedback' }
  ],
  
  riskMarks: {
    1: '很低',
    2: '低',
    3: '中等',
    4: '高',
    5: '很高'
  },
  
  // 格式化函数
  budgetFormatter: (value: number) => value ? `¥${value.toLocaleString()}` : '¥0',
  
  // 汇总数据
  summaryData: {
    projectName: '新一代电商平台',
    projectType: 'Web应用',
    department: '技术部',
    manager: '张项目经理',
    techLead: '高级架构师A',
    teamSize: 8,
    developers: '小张、小李、小王',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    priority: '高优先级',
    budget: '¥500,000'
  },
  
  // 事件处理
  handleStepChange: (step: number) => {
    console.log('步骤变更到：', step);
  },
  
  handleNext: function() {
    if (this.current < this.stepTitle.length - 1) {
      // 验证当前步骤
      if (this.validateCurrentStep()) {
        this.current++;
      }
    } else {
      // 创建项目
      this.createProject();
    }
  },
  
  validateCurrentStep: function() {
    // 这里可以添加具体的验证逻辑
    return true;
  },
  
  createProject: function() {
    console.log('创建项目');
    alert('项目创建成功！');
    // 可以在这里重置步骤或跳转到项目页面
  }
};
complete.storyName = '综合应用示例';
complete.parameters = {
  docs: {
    description: {
      story: `
## 综合应用示例

这是一个完整的项目创建向导示例，展示了步骤条在复杂业务流程中的综合应用。

### 🏗️ 业务场景分析

#### 项目创建流程
- **项目信息**: 收集项目基本信息和元数据
- **团队配置**: 分配项目角色和团队成员
- **项目配置**: 设置时间计划、优先级和预算
- **权限配置**: 配置访问权限和操作权限
- **确认创建**: 汇总信息并完成项目创建

#### 流程特点
- **逐步收集**: 分步骤收集复杂信息，降低用户负担
- **验证控制**: 每个步骤都有相应的验证规则
- **信息汇总**: 最后步骤展示所有配置的汇总
- **灵活导航**: 支持前进、后退和跳转操作

### 🎯 技术实现要点

#### 步骤内容管理
\`\`\`html
<!-- 条件渲染不同步骤的内容 -->
<div *ngIf="current == 0" class="step-content">
  <h4>📋 项目基础信息</h4>
  <hy-gt model="projectInfo">
    <!-- 表单控件 -->
  </hy-gt>
</div>
\`\`\`

#### 数据验证策略
\`\`\`typescript
validateCurrentStep(): boolean {
  switch(this.current) {
    case 0:
      return this.validateProjectInfo();
    case 1: 
      return this.validateTeamConfig();
    // ... 其他步骤验证
  }
}
\`\`\`

#### 步骤间数据传递
\`\`\`typescript
// 统一的表单数据管理
formData = {
  projectInfo: { name: '', type: '', description: '' },
  teamConfig: { manager: '', developers: [] },
  projectConfig: { startDate: '', endDate: '', priority: '' }
};
\`\`\`

### 🎨 界面设计特色

#### 步骤内容结构
- **步骤标题**: 使用图标和文字组合
- **描述信息**: 提供步骤说明和操作指导
- **表单区域**: 使用统一的表单布局
- **信息汇总**: 最后步骤的信息确认面板

#### 用户体验优化
- **进度指示**: 清晰显示当前进度和剩余步骤
- **操作指导**: 每个步骤都有详细的说明文字
- **验证反馈**: 实时验证并提供错误提示
- **信息确认**: 最后步骤汇总所有配置信息

### 🔧 业务逻辑处理

#### 步骤验证
\`\`\`typescript
// 项目信息验证
validateProjectInfo(): boolean {
  const info = this.formData.projectInfo;
  if (!info.name || !info.type || !info.description) {
    this.showError('请完善项目基本信息');
    return false;
  }
  return true;
}
\`\`\`

#### 数据汇总
\`\`\`typescript
// 生成确认页面的汇总数据
generateSummaryData() {
  return {
    projectName: this.formData.projectInfo.name,
    projectType: this.getTypeLabel(this.formData.projectInfo.type),
    manager: this.getManagerName(this.formData.teamConfig.manager),
    // ... 其他汇总信息
  };
}
\`\`\`

#### 项目创建
\`\`\`typescript
// 最终的项目创建处理
createProject() {
  const projectData = this.collectAllFormData();
  
  this.projectService.create(projectData).subscribe({
    next: (result) => {
      this.showSuccess('项目创建成功！');
      this.router.navigate(['/projects', result.id]);
    },
    error: (error) => {
      this.showError('项目创建失败：' + error.message);
    }
  });
}
\`\`\`

### 💡 扩展应用场景

1. **用户注册向导**: 基本信息 → 详细资料 → 验证激活
2. **订单提交流程**: 商品选择 → 地址确认 → 支付完成
3. **系统初始化**: 基础配置 → 高级设置 → 完成部署
4. **审批流程**: 申请提交 → 层级审批 → 结果确认
5. **数据迁移**: 源配置 → 映射设置 → 执行迁移

### 🎯 用户体验设计

#### 信息架构
- **分层展示**: 将复杂表单分解为逻辑步骤
- **渐进披露**: 按需显示相关信息和选项
- **上下文相关**: 根据前面步骤的选择调整后续内容

#### 交互设计
- **明确导航**: 提供清晰的前进、后退操作
- **状态保持**: 步骤间切换时保持数据状态
- **错误预防**: 通过验证防止无效数据提交

这个示例展示了如何构建企业级的业务流程向导，既保证了功能的完整性，又提供了优秀的用户体验。
`
    }
  }
};

