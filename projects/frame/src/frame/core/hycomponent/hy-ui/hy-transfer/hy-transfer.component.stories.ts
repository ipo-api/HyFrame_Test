import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../base/base.module';
import { HyTransferComponent } from './hy-transfer.component';
import { unit } from '../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../_index';
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
      mds['gt_transfer']['transfer'] = ['1'];
      console.log(mds);
    }, 1000);
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

const argTypes = unit.createArgTypes('HyTransferComponent');
argTypes['operations'].control.type = 'object';
argTypes['titles'].control.type = 'object';
argTypes['data'].control.type = 'object';
export default {
  title: '表单组件/hy-transfer（穿梭框）',
  component: HyTransferComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockPricingService }, TableService]
    }),
  ],
  argTypes
} as Meta;

// 基础用法
const BasicTemplate: Story<HyTransferComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础穿梭框用法</h3>
      <p>穿梭框用于在两个可选项列表之间进行多选操作，常用于权限分配、数据筛选等场景</p>
      
      <div class="demo-section">
        <h4>基础穿梭框</h4>
        <p>最简单的穿梭框，支持基础的左右移动操作</p>
        <hy-form>
          <hy-gt model="basicTransfer">
            <hy-transfer title="基础穿梭框" 
                        model="basicData" 
                        [data]="basicData" 
                        [titles]="['可选择项', '已选择项']">
            </hy-transfer>
          </hy-gt>
          <hy-button title="提交" (onClick)="handleSubmit()" [check]="true"></hy-button>
          <hy-button title="重置" (onClick)="handleReset()" [check]="false"></hy-button>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>必填验证</h4>
        <p>带有必填验证的穿梭框</p>
        <hy-form>
          <hy-gt model="requiredTransfer">
            <hy-transfer title="必填穿梭框" 
                        model="requiredData" 
                        [data]="requiredData" 
                        [titles]="['待选择', '已选择']"
                        [ckRequired]="true">
            </hy-transfer>
          </hy-gt>
          <hy-button title="验证提交" (onClick)="handleRequiredSubmit()" [check]="true"></hy-button>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>自定义操作按钮</h4>
        <p>自定义穿梭操作按钮的文字</p>
        <hy-form>
          <hy-gt model="customTransfer">
            <hy-transfer title="自定义操作" 
                        model="customData" 
                        [data]="customData" 
                        [titles]="['待分配权限', '已分配权限']"
                        [operations]="['分配 >', '< 回收']">
            </hy-transfer>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const basic = BasicTemplate.bind({});
basic.args = {
  // 基础数据
  basicData: [
    { title: '用户管理', id: '1' },
    { title: '角色管理', id: '2' },
    { title: '权限管理', id: '3' },
    { title: '部门管理', id: '4' },
    { title: '数据统计', id: '5' }
  ],
  
  // 必填验证数据
  requiredData: [
    { title: '查看权限', id: '1' },
    { title: '编辑权限', id: '2' },
    { title: '删除权限', id: '3' },
    { title: '导出权限', id: '4' }
  ],
  
  // 自定义操作数据
  customData: [
    { title: '系统管理员', id: '1' },
    { title: '普通用户', id: '2' },
    { title: '访客用户', id: '3' },
    { title: '审核员', id: '4' }
  ],
  
  // 事件处理
  handleSubmit: () => {
    console.log('基础穿梭框提交');
    alert('数据提交成功！');
  },
  
  handleReset: () => {
    console.log('重置穿梭框');
    // 这里可以重置表单数据
  },
  
  handleRequiredSubmit: () => {
    console.log('必填验证提交');
    alert('验证通过，提交成功！');
  }
};
basic.storyName = '基础用法';
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

穿梭框是一种常用的多选组件，允许用户在两个列表之间移动选项，广泛应用于权限分配、数据筛选、批量操作等场景。

### 📋 主要特性

#### 双列表结构
- **左侧列表**: 显示可选择的项目
- **右侧列表**: 显示已选择的项目
- **操作按钮**: 中间的左右移动按钮

#### 交互功能
- **单项移动**: 选择单个项目进行移动
- **批量移动**: 支持多选后批量移动
- **全选操作**: 快速选择所有项目
- **搜索过滤**: 内置搜索功能（如果启用）

#### 验证支持
- **必填验证**: 可设置为必填字段
- **自定义验证**: 支持自定义验证规则
- **实时验证**: 表单提交时自动验证

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| data | 数据源 | Array<TransferItem> | [] |
| titles | 列表标题 | [string, string] | ['', ''] |
| operations | 操作按钮文字 | [string, string] | ['', ''] |
| model | 双向绑定的模型名 | string | - |
| ckRequired | 是否必填 | boolean | false |
| title | 字段标题 | string | - |

### 数据结构
\`\`\`typescript
interface TransferItem {
  id: string | number;     // 唯一标识
  title: string;          // 显示文字
  disabled?: boolean;     // 是否禁用
  nzIconName?: string;    // 图标名称
  [key: string]: any;     // 其他自定义属性
}
\`\`\`

### 💡 使用场景

#### 权限管理
- **角色权限分配**: 为用户角色分配功能权限
- **数据权限控制**: 设置用户可访问的数据范围
- **菜单权限配置**: 配置用户可见的菜单项

#### 数据筛选
- **条件筛选**: 从多个条件中选择筛选条件
- **字段选择**: 选择需要显示或导出的字段
- **分类管理**: 管理数据的分类归属

#### 批量操作
- **用户分组**: 将用户分配到不同的组织
- **标签管理**: 为内容添加或移除标签
- **资源分配**: 分配系统资源给不同用户
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 基础穿梭框 -->
<hy-form>
  <hy-gt model="basicTransfer">
    <hy-transfer title="基础穿梭框" 
                model="basicData" 
                [data]="basicData" 
                [titles]="['可选择项', '已选择项']">
    </hy-transfer>
  </hy-gt>
  <hy-button title="提交" (onClick)="handleSubmit()" [check]="true"></hy-button>
</hy-form>

<!-- 必填验证 -->
<hy-form>
  <hy-gt model="requiredTransfer">
    <hy-transfer title="必填穿梭框" 
                model="requiredData" 
                [data]="requiredData" 
                [titles]="['待选择', '已选择']"
                [ckRequired]="true">
    </hy-transfer>
  </hy-gt>
</hy-form>

<!-- 自定义操作按钮 -->
<hy-form>
  <hy-gt model="customTransfer">
    <hy-transfer title="自定义操作" 
                model="customData" 
                [data]="customData" 
                [titles]="['待分配权限', '已分配权限']"
                [operations]="['分配 >', '< 回收']">
    </hy-transfer>
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

interface TransferItem {
  id: string | number;
  title: string;
  disabled?: boolean;
  nzIconName?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-transfer-demo',
  templateUrl: './transfer-demo.component.html'
})
export class TransferDemoComponent {
  // 基础数据
  basicData: TransferItem[] = [
    { title: '用户管理', id: '1' },
    { title: '角色管理', id: '2' },
    { title: '权限管理', id: '3' },
    { title: '部门管理', id: '4' },
    { title: '数据统计', id: '5' }
  ];

  // 必填验证数据
  requiredData: TransferItem[] = [
    { title: '查看权限', id: '1' },
    { title: '编辑权限', id: '2' },
    { title: '删除权限', id: '3' },
    { title: '导出权限', id: '4' }
  ];

  // 自定义操作数据
  customData: TransferItem[] = [
    { title: '系统管理员', id: '1' },
    { title: '普通用户', id: '2' },
    { title: '访客用户', id: '3' },
    { title: '审核员', id: '4' }
  ];

  // 基础提交
  handleSubmit() {
    console.log('基础穿梭框提交');
    // 获取选中的数据
    const selectedData = this.getTransferValue('basicData');
    console.log('选中的数据：', selectedData);
    
    // 提交数据到后端
    this.submitToServer(selectedData);
  }

  // 重置操作
  handleReset() {
    console.log('重置穿梭框');
    // 重置表单数据
    this.resetTransferData();
  }

  // 必填验证提交
  handleRequiredSubmit() {
    const selectedData = this.getTransferValue('requiredData');
    
    if (!selectedData || selectedData.length === 0) {
      alert('请至少选择一项权限');
      return;
    }
    
    console.log('验证通过，提交数据：', selectedData);
    this.submitToServer(selectedData);
  }

  // 获取穿梭框选中值
  private getTransferValue(modelName: string): string[] {
    // 这里需要根据实际的模型服务获取数据
    // 示例实现
    return []; // 实际实现中返回选中的ID数组
  }

  // 重置穿梭框数据
  private resetTransferData() {
    // 重置逻辑
    console.log('数据已重置');
  }

  // 提交到服务器
  private submitToServer(selectedData: any) {
    // 模拟API调用
    setTimeout(() => {
      alert('数据提交成功！');
      console.log('服务器响应：', { success: true, data: selectedData });
    }, 1000);
  }

  // 权限分配示例
  assignPermissions(userId: string, permissions: string[]) {
    const requestData = {
      userId: userId,
      permissions: permissions,
      timestamp: new Date().toISOString()
    };
    
    console.log('分配权限：', requestData);
    return this.submitToServer(requestData);
  }

  // 批量操作方法
  batchAssignRoles(userIds: string[], roleIds: string[]) {
    const batchData = {
      users: userIds,
      roles: roleIds,
      operation: 'assign'
    };
    
    console.log('批量分配角色：', batchData);
    return this.submitToServer(batchData);
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 高级功能
const AdvancedTemplate: Story<HyTransferComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>带图标的选项</h4>
        <p>选项列表中显示图标，增强视觉识别</p>
        <hy-form>
          <hy-gt model="iconTransfer">
            <hy-transfer title="图标穿梭框" 
                        model="iconData" 
                        [data]="iconData" 
                        [titles]="['功能模块', '已授权模块']">
            </hy-transfer>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>表格模式穿梭框</h4>
        <p>使用表格形式展示复杂数据结构</p>
        <hy-form>
          <hy-gt model="tableTransfer">
            <hy-transfer title="表格穿梭框" 
                        model="tableData" 
                        [data]="tableData" 
                        [titles]="['用户列表', '已选用户']"
                        [tempConfigs]="tempConfigs">
            </hy-transfer>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>禁用状态</h4>
        <p>部分选项处于禁用状态</p>
        <hy-form>
          <hy-gt model="disabledTransfer">
            <hy-transfer title="禁用选项" 
                        model="disabledData" 
                        [data]="disabledData" 
                        [titles]="['系统功能', '用户权限']">
            </hy-transfer>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>动态数据更新</h4>
        <p>动态添加或删除可选项</p>
        <div style="margin-bottom: 16px;">
          <hy-form>
            <hy-button title="添加选项" (onClick)="addDynamicOption()"></hy-button>
            <hy-button title="删除选项" (onClick)="removeDynamicOption()"></hy-button>
            <hy-button title="重新加载" (onClick)="reloadDynamicData()"></hy-button>
          </hy-form>
        </div>
        <hy-form>
          <hy-gt model="dynamicTransfer">
            <hy-transfer title="动态数据" 
                        model="dynamicData" 
                        [data]="dynamicData" 
                        [titles]="['动态选项', '选中项目']">
            </hy-transfer>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const advanced = AdvancedTemplate.bind({});
advanced.args = {
  // 带图标的数据
  iconData: [
    { id: '1', title: '用户管理', nzIconName: 'user' },
    { id: '2', title: '系统设置', nzIconName: 'setting' },
    { id: '3', title: '数据统计', nzIconName: 'bar-chart' },
    { id: '4', title: '日志管理', nzIconName: 'file-text' },
    { id: '5', title: '安全中心', nzIconName: 'safety' }
  ],
  
  // 表格数据
  tableData: [
    { memberName: '张三', sex: '男', age: 28, department: '技术部' },
    { memberName: '李四', sex: '女', age: 25, department: '市场部' },
    { memberName: '王五', sex: '男', age: 30, department: '财务部' },
    { memberName: '赵六', sex: '女', age: 27, department: '人事部' },
    { memberName: '孙七', sex: '男', age: 32, department: '运营部' }
  ],
  
  // 表格配置
  tempConfigs: [
    {
      tempType: 'table',
      pageSize: 5,
      showHead: true,
      cellConfigs: [
        { title: '姓名', name: 'memberName' },
        { title: '性别', name: 'sex' },
        { title: '年龄', name: 'age' },
        { title: '部门', name: 'department' }
      ]
    }
  ],
  
  // 禁用状态数据
  disabledData: [
    { id: '1', title: '超级管理员权限', disabled: true },
    { id: '2', title: '用户管理权限', disabled: false },
    { id: '3', title: '数据查看权限', disabled: false },
    { id: '4', title: '系统配置权限', disabled: true },
    { id: '5', title: '日志查看权限', disabled: false }
  ],
  
  // 动态数据
  dynamicData: [
    { id: '1', title: '动态选项 1' },
    { id: '2', title: '动态选项 2' },
    { id: '3', title: '动态选项 3' }
  ],
  
  // 动态操作方法
  addDynamicOption: function() {
    const newOption = {
      id: Date.now().toString(),
      title: `新选项 ${this.dynamicData.length + 1}`
    };
    this.dynamicData.push(newOption);
    console.log('添加选项：', newOption);
  },
  
  removeDynamicOption: function() {
    if (this.dynamicData.length > 0) {
      const removed = this.dynamicData.pop();
      console.log('删除选项：', removed);
    } else {
      alert('没有可删除的选项');
    }
  },
  
  reloadDynamicData: function() {
    this.dynamicData = [
      { id: '1', title: '重新加载选项 1' },
      { id: '2', title: '重新加载选项 2' },
      { id: '3', title: '重新加载选项 3' },
      { id: '4', title: '重新加载选项 4' }
    ];
    console.log('数据已重新加载');
  }
};
advanced.storyName = '高级功能';
advanced.parameters = {
  docs: {
    description: {
      story: `
## 高级功能

穿梭框的高级功能包括图标显示、表格模式、禁用状态和动态数据管理。

### 🎨 带图标的选项

#### 图标增强
- **视觉识别**: 通过图标快速识别不同类型的选项
- **用户体验**: 提升界面的可读性和美观度
- **图标配置**: 通过 \`nzIconName\` 属性设置图标

#### 图标使用场景
- **功能模块**: 不同系统功能使用相应图标
- **文件类型**: 根据文件类型显示对应图标
- **状态标识**: 用图标表示不同的状态

### 📊 表格模式穿梭框

#### 复杂数据展示
- **多列信息**: 在穿梭框中展示多维度数据
- **表格布局**: 使用表格形式组织复杂信息
- **分页支持**: 大数据量时支持分页显示

#### 表格配置
\`\`\`typescript
tempConfigs = [{
  tempType: 'table',        // 模式类型
  pageSize: 5,             // 每页显示数量
  showHead: true,          // 是否显示表头
  cellConfigs: [           // 列配置
    { title: '姓名', name: 'memberName' },
    { title: '部门', name: 'department' }
  ]
}];
\`\`\`

### 🚫 禁用状态管理

#### 状态控制
- **选择性禁用**: 部分选项设置为不可选择
- **权限控制**: 根据用户权限禁用相关选项
- **业务逻辑**: 根据业务规则动态设置禁用状态

#### 禁用配置
\`\`\`typescript
const disabledData = [
  { id: '1', title: '超级管理员权限', disabled: true },
  { id: '2', title: '普通权限', disabled: false }
];
\`\`\`

### 🔄 动态数据管理

#### 数据操作
- **添加选项**: 动态增加新的可选项
- **删除选项**: 移除不需要的选项
- **数据刷新**: 重新加载最新数据
- **实时更新**: 响应数据变化自动更新

#### 动态操作示例
\`\`\`typescript
// 添加新选项
addOption(newOption: TransferItem) {
  this.transferData.push(newOption);
  this.updateTransferData();
}

// 删除选项
removeOption(optionId: string) {
  this.transferData = this.transferData.filter(
    item => item.id !== optionId
  );
  this.updateTransferData();
}

// 批量更新
batchUpdateOptions(options: TransferItem[]) {
  this.transferData = [...options];
  this.updateTransferData();
}
\`\`\`

### 高级配置
| 功能 | 说明 | 配置方式 |
|------|------|----------|
| 图标显示 | 选项前显示图标 | nzIconName属性 |
| 表格模式 | 表格形式展示 | tempConfigs配置 |
| 禁用状态 | 选项禁用控制 | disabled属性 |
| 动态数据 | 数据动态更新 | 数组操作 |

### 💡 最佳实践

1. **性能优化**: 大数据量时使用分页或虚拟滚动
2. **用户体验**: 提供搜索和过滤功能
3. **状态管理**: 合理使用禁用状态引导用户操作
4. **数据同步**: 确保左右列表数据的一致性
5. **错误处理**: 处理数据加载失败等异常情况
`
    }
  }
};

// 综合应用示例
const CompleteTemplate: Story<HyTransferComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>👥 企业权限管理系统</h3>
      <p>完整的权限管理示例，展示穿梭框在实际业务中的综合应用</p>
      
      <div class="demo-case" style="border: 1px solid #f0f0f0; border-radius: 8px; padding: 20px; background: white;">
        <!-- 用户信息展示 -->
        <div class="user-info" style="margin-bottom: 20px; padding: 16px; background: #f8f9fa; border-radius: 6px;">
          <h4 style="margin: 0 0 12px 0; color: #333;">当前操作用户</h4>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            <div>
              <span style="color: #666; font-size: 14px;">用户名：</span>
              <span style="font-weight: 500;">{{currentUser.name}}</span>
            </div>
            <div>
              <span style="color: #666; font-size: 14px;">部门：</span>
              <span style="font-weight: 500;">{{currentUser.department}}</span>
            </div>
            <div>
              <span style="color: #666; font-size: 14px;">当前角色：</span>
              <span style="font-weight: 500; color: #1890ff;">{{currentUser.currentRole}}</span>
            </div>
          </div>
        </div>
        
        <!-- 权限分配区域 -->
        <div class="permission-assignment">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <!-- 功能权限 -->
            <div class="permission-section">
              <h4 style="margin-bottom: 16px; color: #333; display: flex; align-items: center;">
                <span style="width: 4px; height: 18px; background: #1890ff; margin-right: 8px; border-radius: 2px;"></span>
                功能权限分配
              </h4>
              <hy-form>
                <hy-gt model="functionPermissions">
                  <hy-transfer title="功能权限" 
                              model="functionPermissionData" 
                              [data]="functionPermissionData" 
                              [titles]="['可分配功能', '已授权功能']"
                              [operations]="['授权 >', '< 撤销']"
                              [ckRequired]="true">
                  </hy-transfer>
                </hy-gt>
              </hy-form>
            </div>
            
            <!-- 数据权限 -->
            <div class="permission-section">
              <h4 style="margin-bottom: 16px; color: #333; display: flex; align-items: center;">
                <span style="width: 4px; height: 18px; background: #52c41a; margin-right: 8px; border-radius: 2px;"></span>
                数据权限分配
              </h4>
              <hy-form>
                <hy-gt model="dataPermissions">
                  <hy-transfer title="数据权限" 
                              model="dataPermissionData" 
                              [data]="dataPermissionData" 
                              [titles]="['可访问数据', '已授权数据']"
                              [tempConfigs]="dataPermissionConfigs">
                  </hy-transfer>
                </hy-gt>
              </hy-form>
            </div>
          </div>
        </div>
        
        <!-- 角色管理 -->
        <div class="role-management" style="margin-top: 30px;">
          <h4 style="margin-bottom: 16px; color: #333; display: flex; align-items: center;">
            <span style="width: 4px; height: 18px; background: #fa8c16; margin-right: 8px; border-radius: 2px;"></span>
            角色分配管理
          </h4>
          <hy-form>
            <hy-gt model="roleAssignment">
              <hy-transfer title="用户角色" 
                          model="userRoleData" 
                          [data]="userRoleData" 
                          [titles]="['可分配角色', '用户当前角色']"
                          [operations]="['分配 >', '< 移除']">
              </hy-transfer>
            </hy-gt>
          </hy-form>
        </div>
        
        <!-- 操作按钮区 -->
        <div class="action-buttons" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f0f0f0;">
          <hy-form>
            <hy-button title="保存权限配置" 
                      type="primary" 
                      (onClick)="savePermissionConfig()" 
                      [check]="true" 
                      nzIconName="save"></hy-button>
            <hy-button title="预览权限" 
                      (onClick)="previewPermissions()" 
                      [check]="false" 
                      nzIconName="eye"></hy-button>
            <hy-button title="重置配置" 
                      (onClick)="resetPermissionConfig()" 
                      [check]="false" 
                      nzIconName="reload"></hy-button>
            <hy-button title="导出配置" 
                      (onClick)="exportPermissionConfig()" 
                      [check]="false" 
                      nzIconName="export"></hy-button>
          </hy-form>
        </div>
        
        <!-- 操作日志 -->
        <div class="operation-log" style="margin-top: 20px;">
          <h4 style="margin-bottom: 12px; color: #333;">最近操作记录</h4>
          <div class="log-list" style="max-height: 200px; overflow-y: auto; background: #fafafa; padding: 12px; border-radius: 4px;">
            <div class="log-item" 
                 style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px;"
                 *ngFor="let log of operationLogs">
              <span style="color: #1890ff;">{{log.time}}</span>
              <span style="margin: 0 8px; color: #666;">|</span>
              <span style="color: #333;">{{log.operation}}</span>
              <span style="margin: 0 8px; color: #666;">|</span>
              <span style="color: #999;">{{log.details}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

export const complete = CompleteTemplate.bind({});
complete.args = {
  // 当前用户信息
  currentUser: {
    name: '张三',
    department: '技术部',
    currentRole: '开发工程师'
  },
  
  // 功能权限数据
  functionPermissionData: [
    { id: '1', title: '用户管理', nzIconName: 'user', description: '管理系统用户' },
    { id: '2', title: '角色管理', nzIconName: 'team', description: '管理用户角色' },
    { id: '3', title: '权限管理', nzIconName: 'lock', description: '管理系统权限' },
    { id: '4', title: '部门管理', nzIconName: 'apartment', description: '管理组织部门' },
    { id: '5', title: '系统设置', nzIconName: 'setting', description: '系统参数配置' },
    { id: '6', title: '数据统计', nzIconName: 'bar-chart', description: '查看数据报表' },
    { id: '7', title: '日志管理', nzIconName: 'file-text', description: '查看系统日志' },
    { id: '8', title: '备份恢复', nzIconName: 'cloud-upload', description: '数据备份恢复', disabled: true }
  ],
  
  // 数据权限数据
  dataPermissionData: [
    { dataType: '用户数据', scope: '全部', level: '高', description: '所有用户信息' },
    { dataType: '订单数据', scope: '本部门', level: '中', description: '部门内订单' },
    { dataType: '财务数据', scope: '个人', level: '高', description: '个人相关财务' },
    { dataType: '客户数据', scope: '全部', level: '中', description: '客户基本信息' },
    { dataType: '产品数据', scope: '全部', level: '低', description: '产品目录信息' }
  ],
  
  // 数据权限表格配置
  dataPermissionConfigs: [
    {
      tempType: 'table',
      pageSize: 10,
      showHead: true,
      cellConfigs: [
        { title: '数据类型', name: 'dataType' },
        { title: '访问范围', name: 'scope' },
        { title: '敏感级别', name: 'level' },
        { title: '说明', name: 'description' }
      ]
    }
  ],
  
  // 用户角色数据
  userRoleData: [
    { id: '1', title: '系统管理员', level: '最高', description: '系统最高权限' },
    { id: '2', title: '部门经理', level: '高', description: '部门管理权限' },
    { id: '3', title: '开发工程师', level: '中', description: '开发相关权限' },
    { id: '4', title: '测试工程师', level: '中', description: '测试相关权限' },
    { id: '5', title: '普通用户', level: '低', description: '基础使用权限' },
    { id: '6', title: '访客用户', level: '最低', description: '只读访问权限' }
  ],
  
  // 操作日志
  operationLogs: [
    { time: '2024-01-15 14:30:25', operation: '权限分配', details: '为张三分配了用户管理权限' },
    { time: '2024-01-15 14:28:10', operation: '角色变更', details: '张三的角色从普通用户变更为开发工程师' },
    { time: '2024-01-15 14:25:33', operation: '权限撤销', details: '撤销了张三的系统设置权限' },
    { time: '2024-01-15 14:22:18', operation: '配置保存', details: '保存了权限配置更改' }
  ],
  
  // 保存权限配置
  savePermissionConfig: () => {
    console.log('保存权限配置');
    alert('权限配置已保存！系统将在下次登录时生效。');
  },
  
  // 预览权限
  previewPermissions: () => {
    console.log('预览权限配置');
    alert('权限预览：\n- 功能权限：用户管理、数据统计\n- 数据权限：用户数据(全部)、订单数据(本部门)\n- 角色：开发工程师');
  },
  
  // 重置配置
  resetPermissionConfig: () => {
    if (confirm('确定要重置所有权限配置吗？此操作不可撤销。')) {
      console.log('重置权限配置');
      alert('权限配置已重置为默认状态');
    }
  },
  
  // 导出配置
  exportPermissionConfig: () => {
    console.log('导出权限配置');
    const configData = {
      user: '张三',
      functionPermissions: ['用户管理', '数据统计'],
      dataPermissions: ['用户数据', '订单数据'],
      roles: ['开发工程师'],
      exportTime: new Date().toISOString()
    };
    alert('权限配置导出成功！文件已下载到本地。');
    console.log('导出的配置：', configData);
  }
};
complete.storyName = '综合应用示例';
complete.parameters = {
  docs: {
    description: {
      story: `
## 综合应用示例

这是一个完整的企业权限管理系统示例，展示了穿梭框在复杂权限分配场景中的综合应用。

### 👥 企业权限管理系统特性

#### 多维度权限管理
- **功能权限**: 控制用户可以访问的系统功能模块
- **数据权限**: 控制用户可以访问的数据范围和级别
- **角色权限**: 通过角色批量管理权限集合

#### 权限分配流程
- **用户选择**: 选择需要分配权限的目标用户
- **权限配置**: 使用穿梭框进行精细化权限配置
- **预览确认**: 预览权限配置结果
- **保存生效**: 保存配置并在下次登录时生效

#### 操作审计
- **操作记录**: 记录所有权限变更操作
- **时间追溯**: 可追溯权限变更的时间节点
- **责任追踪**: 明确权限变更的操作人员

### 🎯 技术实现要点

#### 权限数据结构
\`\`\`typescript
// 功能权限
interface FunctionPermission {
  id: string;
  title: string;
  nzIconName?: string;
  description: string;
  disabled?: boolean;
}

// 数据权限
interface DataPermission {
  dataType: string;      // 数据类型
  scope: string;         // 访问范围
  level: string;         // 敏感级别
  description: string;   // 权限说明
}

// 角色权限
interface RolePermission {
  id: string;
  title: string;
  level: string;         // 权限级别
  description: string;
}
\`\`\`

#### 权限验证逻辑
\`\`\`typescript
class PermissionService {
  // 检查功能权限
  checkFunctionPermission(userId: string, functionId: string): boolean {
    const userPermissions = this.getUserPermissions(userId);
    return userPermissions.functions.includes(functionId);
  }

  // 检查数据权限
  checkDataPermission(userId: string, dataType: string, scope: string): boolean {
    const userPermissions = this.getUserPermissions(userId);
    const dataPermission = userPermissions.data.find(p => p.dataType === dataType);
    
    if (!dataPermission) return false;
    
    return this.validateDataScope(dataPermission.scope, scope);
  }

  // 角色权限继承
  inheritRolePermissions(userId: string, roleId: string) {
    const rolePermissions = this.getRolePermissions(roleId);
    const userPermissions = this.getUserPermissions(userId);
    
    // 合并权限
    return {
      functions: [...userPermissions.functions, ...rolePermissions.functions],
      data: this.mergeDataPermissions(userPermissions.data, rolePermissions.data)
    };
  }
}
\`\`\`

#### 批量权限操作
\`\`\`typescript
// 批量分配权限
async batchAssignPermissions(userIds: string[], permissions: any[]) {
  const operations = userIds.map(userId => 
    this.assignPermissionsToUser(userId, permissions)
  );
  
  const results = await Promise.allSettled(operations);
  
  // 处理结果
  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  
  console.log(\`批量操作完成：成功 \${successful}，失败 \${failed}\`);
  
  return { successful, failed, results };
}

// 权限模板应用
applyPermissionTemplate(templateId: string, userIds: string[]) {
  const template = this.getPermissionTemplate(templateId);
  
  if (!template) {
    throw new Error(\`权限模板 \${templateId} 不存在\`);
  }
  
  return this.batchAssignPermissions(userIds, template.permissions);
}
\`\`\`

### 🎨 界面设计特色

#### 信息层次
- **用户信息区**: 显示当前操作的用户基本信息
- **权限配置区**: 分类展示不同类型的权限配置
- **操作控制区**: 提供保存、预览、重置等操作
- **审计日志区**: 显示相关的操作历史记录

#### 视觉引导
- **颜色编码**: 不同权限类型使用不同颜色标识
- **图标辅助**: 功能权限使用相应图标增强识别
- **状态提示**: 清晰的权限状态和操作反馈

#### 交互优化
- **实时预览**: 配置过程中实时预览权限效果
- **批量操作**: 支持批量权限分配和撤销
- **模板应用**: 可应用预设的权限模板
- **智能建议**: 根据角色推荐相应权限

### 🔧 业务逻辑处理

#### 权限冲突处理
\`\`\`typescript
// 检查权限冲突
checkPermissionConflicts(newPermissions: Permission[]): ConflictResult {
  const conflicts: PermissionConflict[] = [];
  
  for (const permission of newPermissions) {
    const existingPermission = this.findExistingPermission(permission.id);
    
    if (existingPermission && this.isConflicting(permission, existingPermission)) {
      conflicts.push({
        newPermission: permission,
        existingPermission: existingPermission,
        conflictType: this.getConflictType(permission, existingPermission)
      });
    }
  }
  
  return { hasConflicts: conflicts.length > 0, conflicts };
}

// 解决权限冲突
resolvePermissionConflicts(conflicts: PermissionConflict[], resolution: ConflictResolution) {
  switch (resolution.strategy) {
    case 'override':
      return this.overrideConflictingPermissions(conflicts);
    case 'merge':
      return this.mergeConflictingPermissions(conflicts);
    case 'skip':
      return this.skipConflictingPermissions(conflicts);
    default:
      throw new Error('未知的冲突解决策略');
  }
}
\`\`\`

#### 权限生效机制
\`\`\`typescript
// 权限生效控制
class PermissionEffectController {
  // 即时生效
  applyImmediately(userId: string, permissions: Permission[]) {
    this.updateUserPermissions(userId, permissions);
    this.invalidateUserSession(userId); // 使当前会话失效
    this.notifyPermissionChange(userId);
  }

  // 延迟生效
  schedulePermissionChange(userId: string, permissions: Permission[], effectiveTime: Date) {
    const task = {
      userId,
      permissions,
      effectiveTime,
      status: 'pending'
    };
    
    this.scheduleTask(task);
  }

  // 权限回滚
  rollbackPermissions(userId: string, version: string) {
    const historicalPermissions = this.getHistoricalPermissions(userId, version);
    this.applyImmediately(userId, historicalPermissions);
    this.logPermissionRollback(userId, version);
  }
}
\`\`\`

### 💡 扩展应用场景

1. **多租户系统**: 不同租户的权限隔离和管理
2. **工作流审批**: 权限变更的审批流程集成
3. **临时权限**: 设置具有时效性的权限分配
4. **权限继承**: 组织架构层级的权限继承关系
5. **API权限控制**: 细粒度的API访问权限管理

### 🎯 最佳实践建议

#### 权限设计原则
- **最小权限原则**: 用户只拥有完成工作所需的最小权限
- **职责分离**: 关键操作需要多个权限配合完成
- **权限审计**: 定期审查和清理不必要的权限
- **默认拒绝**: 未明确授权的操作默认拒绝访问

#### 用户体验优化
- **权限说明**: 为每个权限提供清晰的说明文档
- **操作指导**: 提供权限配置的操作指南
- **错误提示**: 权限不足时给出明确的错误信息
- **快速恢复**: 提供权限配置的快速恢复机制

这个示例展示了如何构建专业的企业级权限管理系统，既满足了复杂的业务需求，又提供了优秀的用户体验和强大的扩展能力。
`
    }
  }
};

