import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../base/base.module';
import { HyListComponent } from './hy-list.component';
import { unit } from '../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

const argTypes = unit.createArgTypes('HyListComponent');

export default {
  title: '数据展示/hy-list（列表）',
  component: HyListComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [ModelService, TableService]
    }),
  ],
  argTypes,
} as Meta;

// 基础用法
const BasicTemplate: Story<HyListComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础列表用法</h3>
      <p>用于展示一系列数据项，支持选择、操作等交互功能</p>
      
      <div class="demo-section">
        <h4>基础列表</h4>
        <p>最简单的列表展示</p>
        <hy-list [data]="basicListData" width="100%"></hy-list>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>带选择状态的列表</h4>
        <p>支持单选和多选的列表</p>
        <hy-list [data]="selectableListData" width="100%" (onSelect)="handleSelect($event)">
        </hy-list>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>带操作按钮的列表</h4>
        <p>每个列表项可以包含操作按钮</p>
        <hy-list [data]="operationListData" width="100%" (onSelect)="handleSelect($event)">
          <ng-template #operationBox let-index="index" let-item="item">
            <hy-list-btn title="编辑" (onClick)="handleEdit(item)" [item]="item"></hy-list-btn>
            <hy-list-btn title="删除" (onClick)="handleDelete(item)" [item]="item" 
                         [enable]="!item.delDisabled"></hy-list-btn>
          </ng-template>
        </hy-list>
      </div>
    </div>
  `
});

export const basic = BasicTemplate.bind({});
basic.args = {
  // 基础列表数据
  basicListData: [
    { title: '列表项目 1', id: '1' },
    { title: '列表项目 2', id: '2' },
    { title: '列表项目 3', id: '3' },
    { title: '列表项目 4', id: '4' }
  ],
  
  // 可选择列表数据
  selectableListData: [
    { title: '可选择项目 1', id: '1', isSelected: false },
    { title: '可选择项目 2', id: '2', isSelected: true },
    { title: '可选择项目 3', id: '3', isSelected: false },
    { title: '可选择项目 4', id: '4', isSelected: false }
  ],
  
  // 带操作的列表数据
  operationListData: [
    { title: '操作项目 1', id: '1', isSelected: false, delDisabled: false },
    { title: '操作项目 2', id: '2', isSelected: true, delDisabled: true },
    { title: '操作项目 3', id: '3', isSelected: false, delDisabled: false }
  ],
  
  // 事件处理
  handleSelect: (item: any) => {
    console.log('选择项目：', item);
    item.isSelected = !item.isSelected;
  },
  
  handleEdit: (item: any) => {
    console.log('编辑项目：', item);
    alert(`编辑项目：${item.title}`);
  },
  
  handleDelete: (item: any) => {
    console.log('删除项目：', item);
    if (confirm(`确定要删除"${item.title}"吗？`)) {
      alert('删除成功！');
    }
  }
};
basic.storyName = '基础用法';
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

列表组件用于展示一系列相关的数据项，提供清晰的信息层次和交互功能。

### 📋 主要特性

#### 数据展示
- 支持任意数据结构的列表展示
- 灵活的宽度配置
- 清晰的视觉分割和层次

#### 交互功能
- **选择状态**: 支持单选和多选模式
- **操作按钮**: 每个列表项可以包含自定义操作
- **事件处理**: 完整的点击、选择事件支持

#### 自定义配置
- **自定义模板**: 支持操作按钮的自定义模板
- **状态控制**: 按钮的启用/禁用状态控制
- **样式定制**: 宽度、间距等样式配置

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| data | 列表数据源 | Array<ListItem> | [] |
| width | 列表宽度 | string | '100%' |
| onSelect | 选择事件 | EventEmitter | - |

### 数据结构
\`\`\`typescript
interface ListItem {
  title: string;        // 显示文字（必填）
  id: string;          // 唯一标识
  isSelected?: boolean; // 是否选中
  isShowDel?: boolean; // 是否显示删除按钮
  delEnable?: boolean; // 删除按钮是否启用
  [key: string]: any;  // 其他自定义属性
}
\`\`\`

### 💡 使用场景

#### 数据展示
- **文件列表**: 文件管理系统的文件展示
- **用户列表**: 用户管理界面的用户展示
- **菜单列表**: 导航菜单的展示和管理

#### 选择交互
- **多选操作**: 批量选择进行操作
- **状态标记**: 标记重要或特殊的项目
- **筛选结果**: 搜索和筛选结果的展示
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 基础列表 -->
<hy-list [data]="basicListData" width="100%"></hy-list>

<!-- 带选择状态的列表 -->
<hy-list [data]="selectableListData" 
         width="100%" 
         (onSelect)="handleSelect($event)">
</hy-list>

<!-- 带操作按钮的列表 -->
<hy-list [data]="operationListData" 
         width="100%" 
         (onSelect)="handleSelect($event)">
  <ng-template #operationBox let-index="index" let-item="item">
    <hy-list-btn title="编辑" 
                 (onClick)="handleEdit(item)" 
                 [item]="item"></hy-list-btn>
    <hy-list-btn title="删除" 
                 (onClick)="handleDelete(item)" 
                 [item]="item" 
                 [enable]="!item.delDisabled"></hy-list-btn>
  </ng-template>
</hy-list>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

interface ListItem {
  title: string;
  id: string;
  isSelected?: boolean;
  delDisabled?: boolean;
  [key: string]: any;
}

@Component({
  selector: 'app-list-demo',
  templateUrl: './list-demo.component.html'
})
export class ListDemoComponent {
  // 基础列表数据
  basicListData: ListItem[] = [
    { title: '列表项目 1', id: '1' },
    { title: '列表项目 2', id: '2' },
    { title: '列表项目 3', id: '3' },
    { title: '列表项目 4', id: '4' }
  ];

  // 可选择列表数据
  selectableListData: ListItem[] = [
    { title: '可选择项目 1', id: '1', isSelected: false },
    { title: '可选择项目 2', id: '2', isSelected: true },
    { title: '可选择项目 3', id: '3', isSelected: false }
  ];

  // 选择处理
  handleSelect(item: ListItem) {
    item.isSelected = !item.isSelected;
    console.log('选择状态变更：', item);
    
    // 获取所有选中的项目
    const selectedItems = this.selectableListData.filter(item => item.isSelected);
    console.log('当前选中项目：', selectedItems);
  }

  // 编辑处理
  handleEdit(item: ListItem) {
    console.log('编辑项目：', item);
    // 这里可以打开编辑对话框或跳转到编辑页面
    this.openEditDialog(item);
  }

  // 删除处理
  handleDelete(item: ListItem) {
    if (confirm(\`确定要删除"\${item.title}"吗？\`)) {
      const index = this.selectableListData.indexOf(item);
      if (index > -1) {
        this.selectableListData.splice(index, 1);
        console.log('删除成功：', item);
      }
    }
  }

  // 批量操作
  getBatchSelectedItems(): ListItem[] {
    return this.selectableListData.filter(item => item.isSelected);
  }

  // 全选/取消全选
  toggleSelectAll() {
    const allSelected = this.selectableListData.every(item => item.isSelected);
    this.selectableListData.forEach(item => {
      item.isSelected = !allSelected;
    });
  }

  // 批量删除
  batchDelete() {
    const selectedItems = this.getBatchSelectedItems();
    if (selectedItems.length === 0) {
      alert('请选择要删除的项目');
      return;
    }

    if (confirm(\`确定要删除\${selectedItems.length}个项目吗？\`)) {
      selectedItems.forEach(selectedItem => {
        const index = this.selectableListData.indexOf(selectedItem);
        if (index > -1) {
          this.selectableListData.splice(index, 1);
        }
      });
      console.log('批量删除成功');
    }
  }

  // 打开编辑对话框
  private openEditDialog(item: ListItem) {
    // 实现编辑对话框逻辑
    const newTitle = prompt('请输入新的标题：', item.title);
    if (newTitle && newTitle.trim()) {
      item.title = newTitle.trim();
      console.log('更新成功：', item);
    }
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 高级功能
const AdvancedTemplate: Story<HyListComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>长标题处理</h4>
        <p>处理超长标题的显示</p>
        <hy-list [data]="longTitleData" width="50%"></hy-list>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>复杂操作按钮</h4>
        <p>多个操作按钮和权限控制</p>
        <hy-list [data]="complexOperationData" width="80%">
          <ng-template #operationBox let-index="index" let-item="item">
            <hy-list-btn title="查看详情" (onClick)="handleView(item)" [item]="item"></hy-list-btn>
            <hy-list-btn title="编辑" (onClick)="handleEdit(item)" [item]="item" 
                         [enable]="item.canEdit"></hy-list-btn>
            <hy-list-btn title="分配权限" (onClick)="handleAssignPermission(item)" [item]="item"
                         [enable]="item.canAssign"></hy-list-btn>
            <hy-list-btn title="禁用" (onClick)="handleDisable(item)" [item]="item"
                         [enable]="item.canDisable"></hy-list-btn>
            <hy-list-btn title="删除" (onClick)="handleDelete(item)" [item]="item" 
                         [enable]="item.canDelete"></hy-list-btn>
          </ng-template>
        </hy-list>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>动态数据更新</h4>
        <p>动态添加、删除和更新列表项</p>
        <div style="margin-bottom: 16px;">
          <hy-form>
            <hy-button title="添加项目" (onClick)="addItem()"></hy-button>
            <hy-button title="批量删除选中" (onClick)="batchDelete()"></hy-button>
            <hy-button title="全选/取消" (onClick)="toggleSelectAll()"></hy-button>
            <hy-button title="刷新数据" (onClick)="refreshData()"></hy-button>
          </hy-form>
        </div>
        <hy-list [data]="dynamicData" width="70%" (onSelect)="handleDynamicSelect($event)">
          <ng-template #operationBox let-index="index" let-item="item">
            <hy-list-btn title="上移" (onClick)="moveUp(index)" [item]="item" 
                         [enable]="index > 0"></hy-list-btn>
            <hy-list-btn title="下移" (onClick)="moveDown(index)" [item]="item" 
                         [enable]="index < dynamicData.length - 1"></hy-list-btn>
            <hy-list-btn title="删除" (onClick)="removeItem(index)" [item]="item"></hy-list-btn>
          </ng-template>
        </hy-list>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>状态指示</h4>
        <p>不同状态的列表项显示</p>
        <hy-list [data]="statusListData" width="60%">
          <ng-template #operationBox let-index="index" let-item="item">
            <span class="status-badge" [class]="'status-' + item.status">{{item.statusText}}</span>
            <hy-list-btn title="变更状态" (onClick)="changeStatus(item)" [item]="item"></hy-list-btn>
          </ng-template>
        </hy-list>
      </div>
    </div>
    
    <style>
      .status-badge {
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 12px;
        margin-right: 8px;
      }
      .status-active { background: #f6ffed; color: #52c41a; border: 1px solid #b7eb8f; }
      .status-inactive { background: #fff1f0; color: #ff4d4f; border: 1px solid #ffb3b3; }
      .status-pending { background: #fff7e6; color: #fa8c16; border: 1px solid #ffd591; }
    </style>
  `
});

export const advanced = AdvancedTemplate.bind({});
advanced.args = {
  // 长标题数据
  longTitleData: [
    { 
      title: '这是一个非常长的标题，用来测试列表组件对超长文本的处理能力，看看是否会自动换行或截断显示', 
      id: '1' 
    },
    { 
      title: '中等长度的标题文本', 
      id: '2' 
    },
    { 
      title: '短标题', 
      id: '3' 
    }
  ],
  
  // 复杂操作数据
  complexOperationData: [
    { 
      title: '管理员用户', 
      id: '1', 
      canEdit: true, 
      canAssign: true, 
      canDisable: false, 
      canDelete: false 
    },
    { 
      title: '普通用户', 
      id: '2', 
      canEdit: true, 
      canAssign: false, 
      canDisable: true, 
      canDelete: true 
    },
    { 
      title: '访客用户', 
      id: '3', 
      canEdit: false, 
      canAssign: false, 
      canDisable: true, 
      canDelete: true 
    }
  ],
  
  // 动态数据
  dynamicData: [
    { title: '动态项目 1', id: '1', isSelected: false },
    { title: '动态项目 2', id: '2', isSelected: false },
    { title: '动态项目 3', id: '3', isSelected: true }
  ],
  
  // 状态数据
  statusListData: [
    { title: '活跃项目', id: '1', status: 'active', statusText: '活跃' },
    { title: '禁用项目', id: '2', status: 'inactive', statusText: '禁用' },
    { title: '待审核项目', id: '3', status: 'pending', statusText: '待审核' }
  ],
  
  // 事件处理方法
  handleView: (item: any) => {
    console.log('查看详情：', item);
    alert(`查看"${item.title}"的详情`);
  },
  
  handleEdit: (item: any) => {
    console.log('编辑：', item);
    alert(`编辑"${item.title}"`);
  },
  
  handleAssignPermission: (item: any) => {
    console.log('分配权限：', item);
    alert(`为"${item.title}"分配权限`);
  },
  
  handleDisable: (item: any) => {
    console.log('禁用：', item);
    alert(`禁用"${item.title}"`);
  },
  
  handleDelete: (item: any) => {
    console.log('删除：', item);
    if (confirm(`确定要删除"${item.title}"吗？`)) {
      alert('删除成功！');
    }
  },
  
  addItem: function() {
    const newItem = {
      title: `新项目 ${this.dynamicData.length + 1}`,
      id: Date.now().toString(),
      isSelected: false
    };
    this.dynamicData.push(newItem);
    console.log('添加项目：', newItem);
  },
  
  batchDelete: function() {
    const selectedItems = this.dynamicData.filter(item => item.isSelected);
    if (selectedItems.length === 0) {
      alert('请选择要删除的项目');
      return;
    }
    
    if (confirm(`确定要删除${selectedItems.length}个项目吗？`)) {
      this.dynamicData = this.dynamicData.filter(item => !item.isSelected);
      console.log('批量删除完成');
    }
  },
  
  toggleSelectAll: function() {
    const allSelected = this.dynamicData.every(item => item.isSelected);
    this.dynamicData.forEach(item => {
      item.isSelected = !allSelected;
    });
  },
  
  refreshData: function() {
    console.log('刷新数据');
    alert('数据已刷新！');
  },
  
  handleDynamicSelect: function(item: any) {
    item.isSelected = !item.isSelected;
    console.log('选择状态变更：', item);
  },
  
  moveUp: function(index: number) {
    if (index > 0) {
      const temp = this.dynamicData[index];
      this.dynamicData[index] = this.dynamicData[index - 1];
      this.dynamicData[index - 1] = temp;
      // 触发变更检测
      this.dynamicData = [...this.dynamicData];
    }
  },
  
  moveDown: function(index: number) {
    if (index < this.dynamicData.length - 1) {
      const temp = this.dynamicData[index];
      this.dynamicData[index] = this.dynamicData[index + 1];
      this.dynamicData[index + 1] = temp;
      // 触发变更检测
      this.dynamicData = [...this.dynamicData];
    }
  },
  
  removeItem: function(index: number) {
    const item = this.dynamicData[index];
    if (confirm(`确定要删除"${item.title}"吗？`)) {
      this.dynamicData.splice(index, 1);
      // 触发变更检测
      this.dynamicData = [...this.dynamicData];
    }
  },
  
  changeStatus: function(item: any) {
    const statuses = [
      { key: 'active', text: '活跃' },
      { key: 'inactive', text: '禁用' },
      { key: 'pending', text: '待审核' }
    ];
    
    const currentIndex = statuses.findIndex(s => s.key === item.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const nextStatus = statuses[nextIndex];
    
    item.status = nextStatus.key;
    item.statusText = nextStatus.text;
    
    console.log('状态变更：', item);
  }
};
advanced.storyName = '高级功能';
advanced.parameters = {
  docs: {
    description: {
      story: `
## 高级功能

列表组件的高级功能包括长文本处理、复杂操作、动态数据管理和状态指示。

### 📝 长标题处理

#### 文本溢出
- **自动换行**: 超长文本自动换行显示
- **宽度限制**: 通过width属性控制列表宽度
- **用户体验**: 确保内容的完整性和可读性

### 🔧 复杂操作按钮

#### 权限控制
- **按钮启用状态**: 根据权限动态控制按钮可用性
- **操作分类**: 查看、编辑、管理等不同级别的操作
- **安全考虑**: 敏感操作的权限验证

#### 操作类型
- **查看详情**: 只读的信息查看
- **编辑修改**: 数据的编辑和更新
- **权限管理**: 分配和调整权限
- **状态控制**: 启用、禁用等状态变更
- **删除操作**: 数据的删除确认

### 🔄 动态数据管理

#### 数据操作
- **添加项目**: 动态添加新的列表项
- **批量删除**: 选择多个项目进行批量删除
- **全选控制**: 全选和取消全选功能
- **数据刷新**: 重新加载最新数据

#### 排序功能
- **上移下移**: 调整列表项的顺序
- **拖拽排序**: 支持拖拽方式重新排序
- **位置限制**: 首尾项目的移动限制

### 🎨 状态指示

#### 视觉状态
- **状态徽章**: 使用颜色和文字表示不同状态
- **状态变更**: 支持状态的动态切换
- **状态说明**: 清晰的状态含义说明

#### 状态类型
- **活跃状态**: 绿色表示正常活跃
- **禁用状态**: 红色表示禁用不可用
- **待审核状态**: 橙色表示等待处理

### 高级配置
| 功能 | 说明 | 实现方式 |
|------|------|----------|
| 权限控制 | 按钮的启用/禁用 | enable属性 |
| 批量操作 | 多选批量处理 | isSelected状态 |
| 动态更新 | 数据的增删改 | 数组操作 |
| 状态管理 | 状态的显示和切换 | 状态属性 |

### 💡 最佳实践

1. **权限设计**: 合理设计操作权限，避免误操作
2. **状态管理**: 清晰的状态定义和转换规则
3. **用户反馈**: 操作后及时给出反馈提示
4. **性能优化**: 大数据量时考虑虚拟滚动
5. **交互体验**: 提供便捷的批量操作功能
`
    }
  }
};

// 综合应用示例
const CompleteTemplate: Story<HyListComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>📁 文件管理系统</h3>
      <p>完整的文件管理示例，展示列表组件在实际业务中的综合应用</p>
      
      <div class="demo-case" style="border: 1px solid #f0f0f0; border-radius: 8px; padding: 20px; background: white;">
        <!-- 工具栏 -->
        <div class="toolbar" style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #f0f0f0;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <hy-form>
              <hy-button title="新建文件夹" type="primary" (onClick)="createFolder()"></hy-button>
              <hy-button title="上传文件" (onClick)="uploadFile()"></hy-button>
              <hy-button title="批量删除" (onClick)="batchDeleteFiles()" 
                         [disabled]="getSelectedFiles().length === 0"></hy-button>
              <hy-button title="下载选中" (onClick)="downloadSelected()"
                         [disabled]="getSelectedFiles().length === 0"></hy-button>
            </hy-form>
            <div>
              <span style="color: #666; font-size: 14px;">
                共 {{fileList.length}} 个项目，已选择 {{getSelectedFiles().length}} 个
              </span>
            </div>
          </div>
        </div>
        
        <!-- 文件列表 -->
        <hy-list [data]="fileList" width="100%" (onSelect)="handleFileSelect($event)">
          <ng-template #operationBox let-index="index" let-item="item">
            <!-- 文件信息显示 -->
            <div class="file-info" style="display: flex; align-items: center; flex: 1;">
              <div class="file-icon" style="margin-right: 12px;">
                <hy-icon [nzIconName]="getFileIcon(item)" 
                         [iconClass]="getFileIconColor(item)" 
                         style="font-size: 18px;"></hy-icon>
              </div>
              <div class="file-details" style="flex: 1;">
                <div class="file-name" style="font-weight: 500;">{{item.title}}</div>
                <div class="file-meta" style="font-size: 12px; color: #999; margin-top: 2px;">
                  {{item.size}} | {{item.modifiedTime}} | {{item.type}}
                </div>
              </div>
              <div class="file-status" style="margin-right: 12px;">
                <span class="status-tag" [class]="'status-' + item.status">{{item.statusText}}</span>
              </div>
            </div>
            
            <!-- 操作按钮 -->
            <div class="file-operations">
              <hy-list-btn title="预览" (onClick)="previewFile(item)" [item]="item"
                           [enable]="item.canPreview"></hy-list-btn>
              <hy-list-btn title="下载" (onClick)="downloadFile(item)" [item]="item"
                           [enable]="item.canDownload"></hy-list-btn>
              <hy-list-btn title="分享" (onClick)="shareFile(item)" [item]="item"
                           [enable]="item.canShare"></hy-list-btn>
              <hy-list-btn title="重命名" (onClick)="renameFile(item)" [item]="item"
                           [enable]="item.canEdit"></hy-list-btn>
              <hy-list-btn title="移动" (onClick)="moveFile(item)" [item]="item"
                           [enable]="item.canMove"></hy-list-btn>
              <hy-list-btn title="删除" (onClick)="deleteFile(item)" [item]="item"
                           [enable]="item.canDelete"></hy-list-btn>
            </div>
          </ng-template>
        </hy-list>
        
        <!-- 统计信息 -->
        <div class="statistics" style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #f0f0f0;">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
            <div class="stat-item" style="text-align: center; padding: 12px; background: #f6ffed; border-radius: 6px;">
              <div style="font-size: 20px; font-weight: bold; color: #52c41a;">{{getFileStats().folders}}</div>
              <div style="font-size: 12px; color: #666;">文件夹</div>
            </div>
            <div class="stat-item" style="text-align: center; padding: 12px; background: #e6f7ff; border-radius: 6px;">
              <div style="font-size: 20px; font-weight: bold; color: #1890ff;">{{getFileStats().files}}</div>
              <div style="font-size: 12px; color: #666;">文件</div>
            </div>
            <div class="stat-item" style="text-align: center; padding: 12px; background: #fff7e6; border-radius: 6px;">
              <div style="font-size: 20px; font-weight: bold; color: #fa8c16;">{{getFileStats().totalSize}}</div>
              <div style="font-size: 12px; color: #666;">总大小</div>
            </div>
            <div class="stat-item" style="text-align: center; padding: 12px; background: #f6f6f6; border-radius: 6px;">
              <div style="font-size: 20px; font-weight: bold; color: #666;">{{getFileStats().selectedCount}}</div>
              <div style="font-size: 12px; color: #666;">已选择</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      .status-tag {
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 11px;
        font-weight: 500;
      }
      .status-normal { background: #f6ffed; color: #52c41a; }
      .status-locked { background: #fff1f0; color: #ff4d4f; }
      .status-shared { background: #e6f7ff; color: #1890ff; }
      .status-syncing { background: #fff7e6; color: #fa8c16; }
    </style>
  `
});

export const complete = CompleteTemplate.bind({});
complete.args = {
  // 文件列表数据
  fileList: [
    {
      title: '项目文档',
      id: '1',
      type: 'folder',
      size: '-',
      modifiedTime: '2024-01-15 14:30',
      status: 'normal',
      statusText: '正常',
      isSelected: false,
      canPreview: false,
      canDownload: true,
      canShare: true,
      canEdit: true,
      canMove: true,
      canDelete: true
    },
    {
      title: '需求文档.docx',
      id: '2',
      type: 'document',
      size: '2.5MB',
      modifiedTime: '2024-01-14 16:45',
      status: 'shared',
      statusText: '已分享',
      isSelected: false,
      canPreview: true,
      canDownload: true,
      canShare: true,
      canEdit: true,
      canMove: true,
      canDelete: false
    },
    {
      title: '设计图.png',
      id: '3',
      type: 'image',
      size: '5.2MB',
      modifiedTime: '2024-01-13 09:20',
      status: 'normal',
      statusText: '正常',
      isSelected: true,
      canPreview: true,
      canDownload: true,
      canShare: true,
      canEdit: false,
      canMove: true,
      canDelete: true
    },
    {
      title: '演示视频.mp4',
      id: '4',
      type: 'video',
      size: '45.8MB',
      modifiedTime: '2024-01-12 11:15',
      status: 'syncing',
      statusText: '同步中',
      isSelected: false,
      canPreview: true,
      canDownload: false,
      canShare: false,
      canEdit: false,
      canMove: false,
      canDelete: false
    },
    {
      title: '机密文件.pdf',
      id: '5',
      type: 'pdf',
      size: '1.8MB',
      modifiedTime: '2024-01-11 17:30',
      status: 'locked',
      statusText: '已锁定',
      isSelected: false,
      canPreview: false,
      canDownload: false,
      canShare: false,
      canEdit: false,
      canMove: false,
      canDelete: false
    }
  ],
  
  // 获取文件图标
  getFileIcon: (item: any) => {
    const iconMap = {
      'folder': 'folder',
      'document': 'file-text',
      'image': 'picture',
      'video': 'video-camera',
      'pdf': 'file-pdf',
      'excel': 'file-excel',
      'audio': 'sound'
    };
    return iconMap[item.type] || 'file';
  },
  
  // 获取文件图标颜色
  getFileIconColor: (item: any) => {
    const colorMap = {
      'folder': 'orange',
      'document': 'blue',
      'image': 'green',
      'video': 'red',
      'pdf': 'red',
      'excel': 'green',
      'audio': 'purple'
    };
    return colorMap[item.type] || 'gray';
  },
  
  // 获取选中的文件
  getSelectedFiles: function() {
    return this.fileList.filter(file => file.isSelected);
  },
  
  // 获取文件统计信息
  getFileStats: function() {
    const folders = this.fileList.filter(item => item.type === 'folder').length;
    const files = this.fileList.filter(item => item.type !== 'folder').length;
    const selectedCount = this.getSelectedFiles().length;
    
    // 计算总大小（简化处理）
    let totalSizeBytes = 0;
    this.fileList.forEach(item => {
      if (item.size && item.size !== '-') {
        const sizeStr = item.size.replace(/[^\d.]/g, '');
        const sizeNum = parseFloat(sizeStr);
        if (item.size.includes('MB')) {
          totalSizeBytes += sizeNum * 1024 * 1024;
        } else if (item.size.includes('KB')) {
          totalSizeBytes += sizeNum * 1024;
        }
      }
    });
    
    const totalSize = totalSizeBytes > 1024 * 1024 
      ? `${(totalSizeBytes / (1024 * 1024)).toFixed(1)}MB`
      : `${(totalSizeBytes / 1024).toFixed(1)}KB`;
    
    return { folders, files, totalSize, selectedCount };
  },
  
  // 文件选择处理
  handleFileSelect: function(item: any) {
    item.isSelected = !item.isSelected;
    console.log('文件选择状态变更：', item);
  },
  
  // 工具栏操作
  createFolder: () => {
    const folderName = prompt('请输入文件夹名称：');
    if (folderName && folderName.trim()) {
      console.log('创建文件夹：', folderName.trim());
      alert(`文件夹"${folderName.trim()}"创建成功！`);
    }
  },
  
  uploadFile: () => {
    console.log('上传文件');
    alert('文件上传功能');
  },
  
  batchDeleteFiles: function() {
    const selectedFiles = this.getSelectedFiles();
    if (selectedFiles.length === 0) {
      alert('请选择要删除的文件');
      return;
    }
    
    if (confirm(`确定要删除${selectedFiles.length}个文件吗？`)) {
      console.log('批量删除：', selectedFiles);
      alert('批量删除成功！');
    }
  },
  
  downloadSelected: function() {
    const selectedFiles = this.getSelectedFiles();
    console.log('下载选中文件：', selectedFiles);
    alert(`开始下载${selectedFiles.length}个文件`);
  },
  
  // 文件操作
  previewFile: (item: any) => {
    console.log('预览文件：', item);
    alert(`预览文件："${item.title}"`);
  },
  
  downloadFile: (item: any) => {
    console.log('下载文件：', item);
    alert(`下载文件："${item.title}"`);
  },
  
  shareFile: (item: any) => {
    console.log('分享文件：', item);
    alert(`分享文件："${item.title}"`);
  },
  
  renameFile: (item: any) => {
    const newName = prompt('请输入新名称：', item.title);
    if (newName && newName.trim() && newName.trim() !== item.title) {
      console.log('重命名文件：', { old: item.title, new: newName.trim() });
      item.title = newName.trim();
      alert('重命名成功！');
    }
  },
  
  moveFile: (item: any) => {
    console.log('移动文件：', item);
    alert(`移动文件："${item.title}"`);
  },
  
  deleteFile: (item: any) => {
    if (confirm(`确定要删除"${item.title}"吗？`)) {
      console.log('删除文件：', item);
      alert('删除成功！');
    }
  }
};
complete.storyName = '综合应用示例';
complete.parameters = {
  docs: {
    description: {
      story: `
## 综合应用示例

这是一个完整的文件管理系统示例，展示了列表组件在复杂业务场景中的综合应用。

### 📁 文件管理系统特性

#### 文件展示
- **多种文件类型**: 支持文件夹、文档、图片、视频等不同类型
- **文件信息**: 显示文件大小、修改时间、文件类型等详细信息
- **图标识别**: 不同文件类型使用相应的图标和颜色
- **状态标识**: 文件的状态标签（正常、锁定、分享、同步中）

#### 批量操作
- **多选功能**: 支持选择多个文件进行批量操作
- **批量删除**: 一键删除多个选中的文件
- **批量下载**: 同时下载多个文件
- **选择统计**: 实时显示选中文件的数量

#### 文件操作
- **预览功能**: 支持图片、文档、视频等文件的预览
- **下载管理**: 单个文件和批量文件的下载
- **分享功能**: 文件的分享和权限管理
- **重命名**: 文件和文件夹的重命名
- **移动操作**: 文件的移动和整理
- **删除确认**: 安全的删除确认机制

### 🎯 技术实现要点

#### 数据结构设计
\`\`\`typescript
interface FileItem {
  title: string;           // 文件名
  id: string;             // 唯一标识
  type: string;           // 文件类型
  size: string;           // 文件大小
  modifiedTime: string;   // 修改时间
  status: string;         // 文件状态
  statusText: string;     // 状态显示文字
  isSelected: boolean;    // 是否选中
  canPreview: boolean;    // 是否可预览
  canDownload: boolean;   // 是否可下载
  canShare: boolean;      // 是否可分享
  canEdit: boolean;       // 是否可编辑
  canMove: boolean;       // 是否可移动
  canDelete: boolean;     // 是否可删除
}
\`\`\`

#### 权限控制系统
\`\`\`typescript
// 根据文件状态和用户权限控制操作按钮
getFilePermissions(file: FileItem, userRole: string) {
  const permissions = {
    canPreview: file.status !== 'locked',
    canDownload: file.status !== 'syncing' && userRole !== 'visitor',
    canShare: file.status === 'normal' && userRole === 'admin',
    canEdit: file.status === 'normal' && userRole !== 'visitor',
    canMove: file.status !== 'locked' && userRole !== 'visitor',
    canDelete: file.status !== 'locked' && userRole === 'admin'
  };
  return permissions;
}
\`\`\`

#### 文件图标系统
\`\`\`typescript
// 根据文件类型返回对应图标
getFileIcon(fileType: string): string {
  const iconMap = {
    'folder': 'folder',
    'document': 'file-text',
    'image': 'picture',
    'video': 'video-camera',
    'pdf': 'file-pdf'
  };
  return iconMap[fileType] || 'file';
}
\`\`\`

### 🎨 界面设计特色

#### 工具栏设计
- **功能分组**: 创建、上传、批量操作等功能分组
- **状态响应**: 根据选择状态动态启用/禁用按钮
- **统计信息**: 实时显示文件数量和选择状态

#### 文件项布局
- **图标区域**: 文件类型图标和颜色标识
- **信息区域**: 文件名、大小、时间等详细信息
- **状态区域**: 文件状态标签
- **操作区域**: 操作按钮组

#### 统计面板
- **数据概览**: 文件夹数量、文件数量、总大小等
- **可视化展示**: 使用不同颜色区分不同类型的统计
- **实时更新**: 随着操作实时更新统计数据

### 🔧 业务逻辑处理

#### 文件操作流程
\`\`\`typescript
// 文件删除流程
async deleteFile(file: FileItem) {
  // 1. 权限检查
  if (!file.canDelete) {
    throw new Error('无删除权限');
  }
  
  // 2. 用户确认
  const confirmed = await this.confirmDelete(file.title);
  if (!confirmed) return;
  
  // 3. 后端删除
  await this.fileService.deleteFile(file.id);
  
  // 4. 更新UI
  this.removeFileFromList(file.id);
  this.showSuccessMessage('删除成功');
}
\`\`\`

#### 批量操作处理
\`\`\`typescript
// 批量删除处理
async batchDelete() {
  const selectedFiles = this.getSelectedFiles();
  const deleteableFiles = selectedFiles.filter(f => f.canDelete);
  
  if (deleteableFiles.length !== selectedFiles.length) {
    this.showWarning('部分文件无删除权限，将跳过');
  }
  
  const confirmed = await this.confirmBatchDelete(deleteableFiles.length);
  if (!confirmed) return;
  
  const results = await Promise.allSettled(
    deleteableFiles.map(file => this.fileService.deleteFile(file.id))
  );
  
  this.handleBatchResults(results);
}
\`\`\`

### 💡 扩展应用场景

1. **企业文档管理**: 公司内部文档的管理和协作
2. **云存储系统**: 个人云盘的文件管理界面
3. **项目文件管理**: 项目相关文件的组织和管理
4. **媒体资源库**: 图片、视频等媒体资源的管理
5. **版本控制系统**: 文件版本的管理和比较

### 🎯 用户体验优化

#### 操作便利性
- **快速选择**: 支持Ctrl+A全选等快捷键
- **拖拽操作**: 拖拽文件进行移动和上传
- **右键菜单**: 右键显示快捷操作菜单
- **批量处理**: 高效的批量操作功能

#### 信息展示
- **详细信息**: 完整的文件元数据展示
- **状态指示**: 清晰的文件状态和权限指示
- **进度反馈**: 上传、下载等操作的进度显示
- **错误处理**: 友好的错误提示和处理

这个示例展示了如何构建专业的文件管理系统，既满足了复杂的业务需求，又提供了优秀的用户体验。
`
    }
  }
};

