import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyTreeSelectComponent } from './hy-tree-select.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

const argTypes = unit.createArgTypes('HyTreeSelectComponent');

export default {
  title: '表单组件/hy-treeSelect（树形选择器）',
  component: HyTreeSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [ModelService, TableService]
    }),
  ],
  argTypes,
} as Meta;

// 基础用法
const BasicTemplate: Story<HyTreeSelectComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础树形选择器用法</h3>
      <p>用于展示层级结构数据并支持选择的下拉控件</p>
      
      <hy-form>
        <hy-gt model="basicTree">
          <hy-treeSelect title="单选树形选择器" model="singleSelect" 
                         [datas]="basicTreeData" 
                         placeholder="请选择组织架构"
                         [tip]="'选择一个组织节点'"></hy-treeSelect>
                         
          <hy-treeSelect title="默认展开" model="expandedSelect" 
                         [datas]="basicTreeData" 
                         [defaultExpandAll]="true"
                         placeholder="默认展开所有节点"></hy-treeSelect>
                         
          <hy-treeSelect title="指定展开层级" model="levelSelect" 
                         [datas]="basicTreeData" 
                         [expandLevel]="1"
                         placeholder="展开到第1层"></hy-treeSelect>
                         
          <hy-treeSelect title="只选择叶子节点" model="leafSelect" 
                         [datas]="basicTreeData" 
                         [isAutoSetLeaf]="true"
                         placeholder="只能选择叶子节点"
                         [tip]="'自动设置为叶子节点可选'"></hy-treeSelect>
        </hy-gt>
      </hy-form>
    </div>
  `
});

export const basic = BasicTemplate.bind({});
basic.args = {
  basicTreeData: [
    {
      title: '总公司',
      key: '1',
      level: 0,
      children: [
        {
          title: '技术部',
          key: '1-1',
          level: 1,
          children: [
            { title: '前端组', key: '1-1-1', level: 2 },
            { title: '后端组', key: '1-1-2', level: 2 },
            { title: '测试组', key: '1-1-3', level: 2 }
          ]
        },
        {
          title: '产品部',
          key: '1-2',
          level: 1,
          children: [
            { title: '产品设计组', key: '1-2-1', level: 2 },
            { title: '用户研究组', key: '1-2-2', level: 2 }
          ]
        },
        {
          title: '市场部',
          key: '1-3',
          level: 1,
          children: [
            { title: '市场推广组', key: '1-3-1', level: 2 },
            { title: '商务拓展组', key: '1-3-2', level: 2 }
          ]
        }
      ]
    }
  ]
};
basic.storyName = '基础用法';
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

树形选择器用于展示具有层级关系的数据结构，支持单选和多选模式。

### 🌳 主要特性

#### 层级数据展示
- 支持多层级的树形结构
- 可折叠/展开的节点交互
- 清晰的层级视觉指示

#### 选择模式
- **单选模式**: 只能选择一个节点
- **多选模式**: 支持多个节点的选择
- **叶子节点限制**: 只允许选择最终的叶子节点

#### 展开控制
- **默认展开**: 控制初始的展开状态
- **指定层级**: 展开到特定的层级深度
- **动态展开**: 根据用户交互动态展开

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| datas | 树形数据源 | TreeNode[] | [] |
| title | 控件标题 | string | - |
| placeholder | 占位符文字 | string | - |
| defaultExpandAll | 默认展开所有 | boolean | false |
| expandLevel | 展开层级 | number | 0 |
| isAutoSetLeaf | 自动设为叶子节点 | boolean | false |
| checkable | 多选模式 | boolean | false |

### 数据结构
\`\`\`typescript
interface TreeNode {
  title: string;      // 节点显示文字
  key: string;        // 节点唯一标识
  level: number;      // 节点层级
  children?: TreeNode[]; // 子节点数组
  isLeaf?: boolean;   // 是否为叶子节点
  disabled?: boolean; // 是否禁用
}
\`\`\`
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="basicTree">
    <!-- 基础单选树形选择器 -->
    <hy-treeSelect title="单选树形选择器" model="singleSelect" 
                   [datas]="basicTreeData" 
                   placeholder="请选择组织架构">
    </hy-treeSelect>
    
    <!-- 默认展开所有节点 -->
    <hy-treeSelect title="默认展开" model="expandedSelect" 
                   [datas]="basicTreeData" 
                   [defaultExpandAll]="true"
                   placeholder="默认展开所有节点">
    </hy-treeSelect>
    
    <!-- 指定展开层级 -->
    <hy-treeSelect title="指定展开层级" model="levelSelect" 
                   [datas]="basicTreeData" 
                   [expandLevel]="1"
                   placeholder="展开到第1层">
    </hy-treeSelect>
    
    <!-- 只选择叶子节点 -->
    <hy-treeSelect title="只选择叶子节点" model="leafSelect" 
                   [datas]="basicTreeData" 
                   [isAutoSetLeaf]="true"
                   placeholder="只能选择叶子节点">
    </hy-treeSelect>
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
  selector: 'app-tree-select-demo',
  templateUrl: './tree-select-demo.component.html'
})
export class TreeSelectDemoComponent {
  // 表单数据
  formData = {
    singleSelect: null,
    expandedSelect: null,
    levelSelect: null,
    leafSelect: null
  };

  // 树形数据
  basicTreeData = [
    {
      title: '总公司',
      key: '1',
      level: 0,
      children: [
        {
          title: '技术部',
          key: '1-1',
          level: 1,
          children: [
            { title: '前端组', key: '1-1-1', level: 2 },
            { title: '后端组', key: '1-1-2', level: 2 },
            { title: '测试组', key: '1-1-3', level: 2 }
          ]
        },
        {
          title: '产品部',
          key: '1-2',
          level: 1,
          children: [
            { title: '产品设计组', key: '1-2-1', level: 2 },
            { title: '用户研究组', key: '1-2-2', level: 2 }
          ]
        }
      ]
    }
  ];

  // 选择变化处理
  onTreeSelectChange(value: any, field: string) {
    this.formData[field] = value;
    console.log(\`\${field} 选择变更：\`, value);
    
    // 获取选中节点的信息
    if (value) {
      const selectedNode = this.findNodeByKey(value, this.basicTreeData);
      console.log('选中节点信息：', selectedNode);
    }
  }

  // 根据key查找节点
  findNodeByKey(key: string, nodes: any[]): any {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        const found = this.findNodeByKey(key, node.children);
        if (found) return found;
      }
    }
    return null;
  }

  // 获取所有叶子节点
  getLeafNodes(nodes: any[]): any[] {
    const leaves = [];
    
    function traverse(nodeList) {
      for (const node of nodeList) {
        if (!node.children || node.children.length === 0) {
          leaves.push(node);
        } else {
          traverse(node.children);
        }
      }
    }
    
    traverse(nodes);
    return leaves;
  }

  // 获取节点路径
  getNodePath(key: string, nodes: any[]): string[] {
    function findPath(nodeList, targetKey, path = []) {
      for (const node of nodeList) {
        const currentPath = [...path, node.title];
        
        if (node.key === targetKey) {
          return currentPath;
        }
        
        if (node.children) {
          const found = findPath(node.children, targetKey, currentPath);
          if (found) return found;
        }
      }
      return null;
    }
    
    return findPath(nodes, key) || [];
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 多选模式
const MultiSelectTemplate: Story<HyTreeSelectComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>多选模式</h4>
        <p>支持选择多个树节点，包括父子关联和独立选择模式</p>
        <hy-form>
          <hy-gt model="multiSelectTree">
            <hy-treeSelect title="多选-父子关联" model="checkable" 
                           [datas]="multiSelectData" 
                           [checkable]="true"
                           placeholder="选择多个节点（父子关联）"
                           [tip]="'选择父节点会自动选中所有子节点'"></hy-treeSelect>
                           
            <hy-treeSelect title="多选-父子不关联" model="checkStrictly" 
                           [datas]="multiSelectData" 
                           [checkable]="true"
                           [checkStrictly]="true"
                           placeholder="选择多个节点（父子独立）"
                           [tip]="'父子节点选择状态相互独立'"></hy-treeSelect>
                           
            <hy-treeSelect title="多选-限制数量" model="limitSelect" 
                           [datas]="multiSelectData" 
                           [checkable]="true"
                           [maxSelectCount]="3"
                           placeholder="最多选择3个节点"
                           [tip]="'限制最大选择数量'"></hy-treeSelect>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>多选禁用状态</h4>
        <p>部分节点禁用选择</p>
        <hy-form>
          <hy-gt model="disabledTree">
            <hy-treeSelect title="部分节点禁用" model="disabledNodes" 
                           [datas]="disabledTreeData" 
                           [checkable]="true"
                           placeholder="部分节点不可选择"></hy-treeSelect>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const multiSelect = MultiSelectTemplate.bind({});
multiSelect.args = {
  multiSelectData: [
    {
      title: '权限管理',
      key: 'permission',
      level: 0,
      children: [
        {
          title: '用户管理',
          key: 'user-manage',
          level: 1,
          children: [
            { title: '用户查看', key: 'user-view', level: 2 },
            { title: '用户编辑', key: 'user-edit', level: 2 },
            { title: '用户删除', key: 'user-delete', level: 2 }
          ]
        },
        {
          title: '角色管理',
          key: 'role-manage',
          level: 1,
          children: [
            { title: '角色查看', key: 'role-view', level: 2 },
            { title: '角色编辑', key: 'role-edit', level: 2 },
            { title: '角色分配', key: 'role-assign', level: 2 }
          ]
        },
        {
          title: '系统设置',
          key: 'system-config',
          level: 1,
          children: [
            { title: '基础配置', key: 'basic-config', level: 2 },
            { title: '高级配置', key: 'advanced-config', level: 2 }
          ]
        }
      ]
    }
  ],
  
  disabledTreeData: [
    {
      title: '文档管理',
      key: 'document',
      level: 0,
      children: [
        {
          title: '公共文档',
          key: 'public-doc',
          level: 1,
          children: [
            { title: '产品文档', key: 'product-doc', level: 2 },
            { title: '技术文档', key: 'tech-doc', level: 2, disabled: true },
            { title: '用户手册', key: 'user-manual', level: 2 }
          ]
        },
        {
          title: '私有文档',
          key: 'private-doc',
          level: 1,
          disabled: true,
          children: [
            { title: '内部资料', key: 'internal-doc', level: 2 },
            { title: '机密文档', key: 'confidential-doc', level: 2 }
          ]
        }
      ]
    }
  ]
};
multiSelect.storyName = '多选模式';
multiSelect.parameters = {
  docs: {
    description: {
      story: `
## 多选模式

树形选择器的多选模式允许用户选择多个节点，支持不同的选择策略。

### ☑️ 多选特性

#### 父子关联模式（默认）
- **checkable**: 启用多选模式
- **父子联动**: 选择父节点自动选中所有子节点
- **状态继承**: 子节点状态影响父节点的半选状态

#### 父子独立模式
- **checkStrictly**: 父子节点选择状态相互独立
- **独立选择**: 每个节点的选择状态互不影响
- **灵活配置**: 适合需要精确控制选择范围的场景

#### 选择限制
- **maxSelectCount**: 限制最大选择数量
- **禁用节点**: 通过disabled属性禁用特定节点
- **条件选择**: 根据业务规则动态控制可选状态

### 多选配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| checkable | 启用多选 | boolean | false |
| checkStrictly | 父子不关联 | boolean | false |
| maxSelectCount | 最大选择数 | number | - |
| disabled | 节点禁用 | boolean | false |

### 💡 使用场景

#### 权限分配
- **角色权限**: 为用户角色分配功能权限
- **菜单权限**: 配置用户可访问的菜单
- **操作权限**: 设置具体的操作权限范围

#### 分类选择
- **商品分类**: 选择商品所属的多个分类
- **标签系统**: 为内容添加多个标签
- **地域选择**: 选择多个服务区域

#### 组织架构
- **部门选择**: 选择多个相关部门
- **人员分组**: 将人员分配到多个组织
- **项目范围**: 定义项目涉及的组织范围

### 🔧 高级功能

#### 选择状态管理
\`\`\`typescript
// 获取选中的节点
getSelectedNodes(): TreeNode[] {
  return this.selectedKeys.map(key => 
    this.findNodeByKey(key, this.treeData)
  );
}

// 设置选中状态
setSelectedNodes(keys: string[]) {
  this.selectedKeys = keys;
  this.updateCheckState();
}
\`\`\`

#### 禁用状态控制
\`\`\`typescript
// 动态设置节点禁用
setNodeDisabled(key: string, disabled: boolean) {
  const node = this.findNodeByKey(key, this.treeData);
  if (node) {
    node.disabled = disabled;
  }
}
\`\`\`
`
    }
  }
};

// 自定义图标和虚拟滚动
const AdvancedTemplate: Story<HyTreeSelectComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>自定义图标</h4>
        <p>为不同类型的节点设置自定义图标</p>
        <hy-form>
          <hy-gt model="iconTree">
            <hy-treeSelect title="自定义节点图标" model="customIcon" 
                           [datas]="iconTreeData" 
                           [nodeIconTemplate]="nodeIconTemplate"
                           placeholder="带自定义图标的树"
                           [expandLevel]="1"></hy-treeSelect>
          </hy-gt>
        </hy-form>
        
        <ng-template #nodeIconTemplate let-item="item">
          <hy-icon nzIconName="folder" *ngIf="!item?.isLeaf" iconClass="orange"></hy-icon>
          <hy-icon nzIconName="file-text" *ngIf="item?.isLeaf && item?.type === 'document'" iconClass="blue"></hy-icon>
          <hy-icon nzIconName="picture" *ngIf="item?.isLeaf && item?.type === 'image'" iconClass="green"></hy-icon>
          <hy-icon nzIconName="video-camera" *ngIf="item?.isLeaf && item?.type === 'video'" iconClass="red"></hy-icon>
          <hy-icon nzIconName="file" *ngIf="item?.isLeaf && !item?.type" iconClass="gray"></hy-icon>
        </ng-template>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>虚拟滚动</h4>
        <p>处理大量树节点时使用虚拟滚动提升性能</p>
        <hy-form>
          <hy-gt model="virtualTree">
            <hy-treeSelect title="虚拟滚动树选择器" model="virtualScroll" 
                           [datas]="largeTreeData" 
                           [checkable]="true"
                           virtualHeight="300px"
                           placeholder="支持虚拟滚动的大数据量树"
                           [tip]="'处理大量数据时自动启用虚拟滚动'"></hy-treeSelect>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>搜索过滤</h4>
        <p>支持按节点名称搜索和过滤</p>
        <hy-form>
          <hy-gt model="searchTree">
            <hy-treeSelect title="支持搜索的树选择器" model="searchable" 
                           [datas]="searchTreeData" 
                           [searchable]="true"
                           placeholder="输入关键词搜索节点"
                           [tip]="'支持节点名称的模糊搜索'"></hy-treeSelect>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const advanced = AdvancedTemplate.bind({});
advanced.args = {
  iconTreeData: [
    {
      title: '项目文件',
      key: 'project',
      level: 0,
      type: 'folder',
      children: [
        {
          title: '文档',
          key: 'docs',
          level: 1,
          type: 'folder',
          children: [
            { title: '需求文档.docx', key: 'requirement', level: 2, type: 'document', isLeaf: true },
            { title: '设计文档.pdf', key: 'design', level: 2, type: 'document', isLeaf: true },
            { title: '接口文档.md', key: 'api', level: 2, type: 'document', isLeaf: true }
          ]
        },
        {
          title: '资源',
          key: 'assets',
          level: 1,
          type: 'folder',
          children: [
            { title: 'logo.png', key: 'logo', level: 2, type: 'image', isLeaf: true },
            { title: 'banner.jpg', key: 'banner', level: 2, type: 'image', isLeaf: true },
            { title: '演示视频.mp4', key: 'demo-video', level: 2, type: 'video', isLeaf: true }
          ]
        },
        {
          title: '源代码',
          key: 'src',
          level: 1,
          type: 'folder',
          children: [
            { title: 'main.js', key: 'main-js', level: 2, type: 'code', isLeaf: true },
            { title: 'style.css', key: 'style-css', level: 2, type: 'code', isLeaf: true }
          ]
        }
      ]
    }
  ],
  
  // 生成大量数据用于虚拟滚动演示
  largeTreeData: (() => {
    const generateNode = (path = '0', level = 0) => {
      const list = [];
      const nodeCount = level === 0 ? 10 : 5; // 根节点10个，其他层级5个
      
      for (let i = 0; i < nodeCount; i++) {
        const key = `${path}-${i}`;
        const node = {
          title: `节点 ${key}`,
          key,
          level,
          children: [],
          isLeaf: false
        };
        
        if (level < 3) { // 限制层级深度
          node.children = generateNode(key, level + 1);
        } else {
          node.isLeaf = true;
        }
        
        list.push(node);
      }
      return list;
    };
    
    return generateNode();
  })(),
  
  searchTreeData: [
    {
      title: '中国',
      key: 'china',
      level: 0,
      children: [
        {
          title: '北京市',
          key: 'beijing',
          level: 1,
          children: [
            { title: '朝阳区', key: 'chaoyang', level: 2 },
            { title: '海淀区', key: 'haidian', level: 2 },
            { title: '西城区', key: 'xicheng', level: 2 }
          ]
        },
        {
          title: '上海市',
          key: 'shanghai',
          level: 1,
          children: [
            { title: '浦东新区', key: 'pudong', level: 2 },
            { title: '黄浦区', key: 'huangpu', level: 2 },
            { title: '静安区', key: 'jingan', level: 2 }
          ]
        },
        {
          title: '广东省',
          key: 'guangdong',
          level: 1,
          children: [
            { title: '广州市', key: 'guangzhou', level: 2 },
            { title: '深圳市', key: 'shenzhen', level: 2 },
            { title: '珠海市', key: 'zhuhai', level: 2 }
          ]
        }
      ]
    }
  ]
};
advanced.storyName = '自定义图标和虚拟滚动';
advanced.parameters = {
  docs: {
    description: {
      story: `
## 自定义图标和虚拟滚动

树形选择器支持自定义节点图标和大数据量的虚拟滚动处理。

### 🎨 自定义图标

#### 图标模板
- **nodeIconTemplate**: 自定义节点图标的模板
- **动态图标**: 根据节点类型显示不同图标
- **图标样式**: 支持颜色、大小等样式定制

#### 图标应用场景
- **文件系统**: 文件夹、文档、图片、视频等不同类型
- **组织架构**: 公司、部门、小组、个人等层级
- **功能模块**: 不同功能使用相应的功能图标

#### 自定义图标示例
\`\`\`html
<ng-template #nodeIconTemplate let-item="item">
  <hy-icon nzIconName="folder" *ngIf="!item?.isLeaf" iconClass="orange"></hy-icon>
  <hy-icon nzIconName="file-text" *ngIf="item?.isLeaf && item?.type === 'document'" iconClass="blue"></hy-icon>
  <hy-icon nzIconName="picture" *ngIf="item?.isLeaf && item?.type === 'image'" iconClass="green"></hy-icon>
</ng-template>
\`\`\`

### 📊 虚拟滚动

#### 性能优化
- **virtualHeight**: 设置虚拟滚动容器高度
- **大数据处理**: 支持数千个节点的流畅滚动
- **内存优化**: 只渲染可见区域的节点

#### 虚拟滚动配置
\`\`\`html
<hy-treeSelect virtualHeight="300px" 
               [datas]="largeTreeData"
               [checkable]="true">
</hy-treeSelect>
\`\`\`

### 🔍 搜索过滤

#### 搜索功能
- **searchable**: 启用搜索功能
- **模糊匹配**: 支持节点名称的模糊搜索
- **高亮显示**: 搜索结果高亮显示匹配内容

#### 搜索特性
- **实时搜索**: 输入时实时过滤结果
- **层级保持**: 搜索时保持树形层级结构
- **快速定位**: 快速找到目标节点

### 高级配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| nodeIconTemplate | 自定义图标模板 | TemplateRef | - |
| virtualHeight | 虚拟滚动高度 | string | - |
| searchable | 启用搜索 | boolean | false |
| searchPlaceholder | 搜索占位符 | string | '搜索' |

### 💡 最佳实践

#### 图标设计
1. **语义化**: 图标应该能清晰表达节点类型
2. **一致性**: 同类型节点使用统一的图标
3. **可识别**: 确保图标在不同尺寸下都清晰可见

#### 性能优化
1. **虚拟滚动**: 大数据量时启用虚拟滚动
2. **懒加载**: 考虑节点的懒加载机制
3. **搜索防抖**: 搜索功能使用防抖处理

#### 用户体验
1. **搜索提示**: 提供搜索功能的使用提示
2. **加载状态**: 大数据加载时显示加载状态
3. **空状态**: 搜索无结果时的友好提示
`
    }
  }
};

// 综合应用示例
const CompleteTemplate: Story<HyTreeSelectComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>🏢 企业组织管理系统</h3>
      <p>完整的组织架构管理示例，展示树形选择器在企业管理中的综合应用</p>
      
      <div class="demo-case" style="border: 1px solid #f0f0f0; border-radius: 8px; padding: 20px; background: white;">
        <hy-form>
          <hy-gt model="organizationManagement">
            <!-- 组织架构选择 -->
            <div style="margin-bottom: 24px;">
              <h4 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">🏢 组织架构管理</h4>
              
              <hy-treeSelect title="所属部门" model="department" 
                             [datas]="organizationData" 
                             [ckRequired]="true"
                             [nodeIconTemplate]="orgIconTemplate"
                             placeholder="请选择所属部门"
                             [expandLevel]="1"
                             [tip]="'选择员工所属的组织部门'"></hy-treeSelect>
                             
              <hy-treeSelect title="汇报对象" model="reportTo" 
                             [datas]="managerData" 
                             [isAutoSetLeaf]="true"
                             [nodeIconTemplate]="managerIconTemplate"
                             placeholder="请选择直接汇报对象"
                             [tip]="'选择直接汇报的上级管理者'"></hy-treeSelect>
            </div>
            
            <!-- 权限配置 -->
            <div style="margin-bottom: 24px;">
              <h4 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">🔐 权限配置</h4>
              
              <hy-treeSelect title="功能权限" model="functionPermissions" 
                             [datas]="permissionData" 
                             [checkable]="true"
                             [nodeIconTemplate]="permissionIconTemplate"
                             placeholder="请选择功能权限"
                             [expandLevel]="1"
                             [tip]="'选择用户可以访问的功能模块'"></hy-treeSelect>
                             
              <hy-treeSelect title="数据权限" model="dataPermissions" 
                             [datas]="dataPermissionData" 
                             [checkable]="true"
                             [checkStrictly]="true"
                             [nodeIconTemplate]="dataIconTemplate"
                             placeholder="请选择数据权限范围"
                             [tip]="'选择用户可以访问的数据范围'"></hy-treeSelect>
            </div>
            
            <!-- 项目分配 -->
            <div style="margin-bottom: 24px;">
              <h4 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">📋 项目分配</h4>
              
              <hy-treeSelect title="参与项目" model="projects" 
                             [datas]="projectData" 
                             [checkable]="true"
                             [maxSelectCount]="5"
                             [nodeIconTemplate]="projectIconTemplate"
                             placeholder="请选择参与的项目"
                             [searchable]="true"
                             [tip]="'最多可选择5个项目参与'"></hy-treeSelect>
                             
              <hy-treeSelect title="负责项目" model="responsibleProjects" 
                             [datas]="projectData" 
                             [nodeIconTemplate]="projectIconTemplate"
                             placeholder="请选择负责的主要项目"
                             [isAutoSetLeaf]="true"
                             [tip]="'选择主要负责的项目'"></hy-treeSelect>
            </div>
            
            <!-- 资源访问 -->
            <div style="margin-bottom: 24px;">
              <h4 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">📁 资源访问</h4>
              
              <hy-treeSelect title="文档访问权限" model="documentAccess" 
                             [datas]="documentData" 
                             [checkable]="true"
                             virtualHeight="200px"
                             [nodeIconTemplate]="documentIconTemplate"
                             placeholder="请选择可访问的文档"
                             [searchable]="true"
                             [tip]="'选择用户可以访问的文档资源'"></hy-treeSelect>
                             
              <hy-treeSelect title="系统模块" model="systemModules" 
                             [datas]="systemModuleData" 
                             [checkable]="true"
                             [nodeIconTemplate]="moduleIconTemplate"
                             placeholder="请选择可使用的系统模块"
                             [tip]="'选择用户可以使用的系统功能模块'"></hy-treeSelect>
            </div>
            
            <!-- 操作按钮 -->
            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #f0f0f0;">
              <hy-button title="保存配置" type="primary" [check]="true" (onClick)="saveConfiguration()"></hy-button>
              <hy-button title="预览权限" [check]="false" (onClick)="previewPermissions()"></hy-button>
              <hy-button title="重置配置" [check]="false" (onClick)="resetConfiguration()"></hy-button>
              <hy-button title="导出配置" [check]="false" (onClick)="exportConfiguration()"></hy-button>
            </div>
          </hy-gt>
        </hy-form>
        
        <!-- 权限预览面板 -->
        <div style="margin-top: 20px;" *ngIf="showPreview">
          <h5>👁️ 权限配置预览</h5>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
            <div style="padding: 12px; background: #f6ffed; border-left: 4px solid #52c41a; border-radius: 4px;">
              <div style="font-size: 12px; color: #666;">组织信息</div>
              <div style="font-size: 14px; font-weight: bold; color: #52c41a;">{{previewData.department}}</div>
              <div style="font-size: 12px; color: #999;">汇报对象：{{previewData.reportTo}}</div>
            </div>
            <div style="padding: 12px; background: #e6f7ff; border-left: 4px solid #1890ff; border-radius: 4px;">
              <div style="font-size: 12px; color: #666;">功能权限</div>
              <div style="font-size: 14px; font-weight: bold; color: #1890ff;">{{previewData.functionCount}}个模块</div>
              <div style="font-size: 12px; color: #999;">数据权限：{{previewData.dataScope}}</div>
            </div>
            <div style="padding: 12px; background: #fff7e6; border-left: 4px solid #faad14; border-radius: 4px;">
              <div style="font-size: 12px; color: #666;">项目分配</div>
              <div style="font-size: 14px; font-weight: bold; color: #faad14;">参与{{previewData.projectCount}}个项目</div>
              <div style="font-size: 12px; color: #999;">负责：{{previewData.responsibleProject}}</div>
            </div>
            <div style="padding: 12px; background: #f6f6f6; border-left: 4px solid #666; border-radius: 4px;">
              <div style="font-size: 12px; color: #666;">资源访问</div>
              <div style="font-size: 14px; font-weight: bold; color: #666;">{{previewData.resourceCount}}项资源</div>
              <div style="font-size: 12px; color: #999;">模块：{{previewData.moduleCount}}个</div>
            </div>
          </div>
        </div>
        
        <!-- 组织架构图标模板 -->
        <ng-template #orgIconTemplate let-item="item">
          <hy-icon nzIconName="bank" *ngIf="item.level === 0" iconClass="blue"></hy-icon>
          <hy-icon nzIconName="apartment" *ngIf="item.level === 1" iconClass="green"></hy-icon>
          <hy-icon nzIconName="team" *ngIf="item.level === 2" iconClass="orange"></hy-icon>
          <hy-icon nzIconName="user" *ngIf="item.level >= 3" iconClass="gray"></hy-icon>
        </ng-template>
        
        <!-- 管理者图标模板 -->
        <ng-template #managerIconTemplate let-item="item">
          <hy-icon nzIconName="crown" *ngIf="item.level <= 1" iconClass="gold"></hy-icon>
          <hy-icon nzIconName="user" *ngIf="item.level > 1" iconClass="blue"></hy-icon>
        </ng-template>
        
        <!-- 权限图标模板 -->
        <ng-template #permissionIconTemplate let-item="item">
          <hy-icon nzIconName="setting" *ngIf="!item.isLeaf" iconClass="blue"></hy-icon>
          <hy-icon nzIconName="key" *ngIf="item.isLeaf" iconClass="orange"></hy-icon>
        </ng-template>
        
        <!-- 数据权限图标模板 -->
        <ng-template #dataIconTemplate let-item="item">
          <hy-icon nzIconName="database" *ngIf="!item.isLeaf" iconClass="purple"></hy-icon>
          <hy-icon nzIconName="table" *ngIf="item.isLeaf" iconClass="green"></hy-icon>
        </ng-template>
        
        <!-- 项目图标模板 -->
        <ng-template #projectIconTemplate let-item="item">
          <hy-icon nzIconName="project" *ngIf="!item.isLeaf" iconClass="blue"></hy-icon>
          <hy-icon nzIconName="file-done" *ngIf="item.isLeaf && item.status === 'completed'" iconClass="green"></hy-icon>
          <hy-icon nzIconName="loading" *ngIf="item.isLeaf && item.status === 'progress'" iconClass="orange"></hy-icon>
          <hy-icon nzIconName="file" *ngIf="item.isLeaf && item.status === 'planning'" iconClass="gray"></hy-icon>
        </ng-template>
        
        <!-- 文档图标模板 -->
        <ng-template #documentIconTemplate let-item="item">
          <hy-icon nzIconName="folder" *ngIf="!item.isLeaf" iconClass="orange"></hy-icon>
          <hy-icon nzIconName="file-text" *ngIf="item.isLeaf" iconClass="blue"></hy-icon>
        </ng-template>
        
        <!-- 模块图标模板 -->
        <ng-template #moduleIconTemplate let-item="item">
          <hy-icon nzIconName="appstore" *ngIf="!item.isLeaf" iconClass="purple"></hy-icon>
          <hy-icon nzIconName="tool" *ngIf="item.isLeaf" iconClass="blue"></hy-icon>
        </ng-template>
      </div>
    </div>
  `
});

export const complete = CompleteTemplate.bind({});
complete.args = {
  // 组织架构数据
  organizationData: [
    {
      title: '集团总部',
      key: 'headquarters',
      level: 0,
      children: [
        {
          title: '技术中心',
          key: 'tech-center',
          level: 1,
          children: [
            { title: '研发部', key: 'rd-dept', level: 2 },
            { title: '测试部', key: 'qa-dept', level: 2 },
            { title: '运维部', key: 'ops-dept', level: 2 }
          ]
        },
        {
          title: '产品中心',
          key: 'product-center',
          level: 1,
          children: [
            { title: '产品部', key: 'product-dept', level: 2 },
            { title: '设计部', key: 'design-dept', level: 2 },
            { title: '用研部', key: 'ux-dept', level: 2 }
          ]
        },
        {
          title: '业务中心',
          key: 'business-center',
          level: 1,
          children: [
            { title: '销售部', key: 'sales-dept', level: 2 },
            { title: '市场部', key: 'marketing-dept', level: 2 },
            { title: '客服部', key: 'service-dept', level: 2 }
          ]
        }
      ]
    }
  ],
  
  // 管理者数据
  managerData: [
    {
      title: '高级管理层',
      key: 'senior-mgmt',
      level: 0,
      children: [
        { title: 'CEO - 张总', key: 'ceo', level: 1, isLeaf: true },
        { title: 'CTO - 李总', key: 'cto', level: 1, isLeaf: true },
        { title: 'CPO - 王总', key: 'cpo', level: 1, isLeaf: true }
      ]
    },
    {
      title: '中级管理层',
      key: 'middle-mgmt',
      level: 0,
      children: [
        { title: '技术总监 - 赵经理', key: 'tech-director', level: 1, isLeaf: true },
        { title: '产品总监 - 钱经理', key: 'product-director', level: 1, isLeaf: true },
        { title: '运营总监 - 孙经理', key: 'ops-director', level: 1, isLeaf: true }
      ]
    }
  ],
  
  // 权限数据
  permissionData: [
    {
      title: '系统管理',
      key: 'system-mgmt',
      level: 0,
      children: [
        { title: '用户管理', key: 'user-mgmt', level: 1, isLeaf: true },
        { title: '角色管理', key: 'role-mgmt', level: 1, isLeaf: true },
        { title: '权限管理', key: 'permission-mgmt', level: 1, isLeaf: true }
      ]
    },
    {
      title: '业务功能',
      key: 'business-func',
      level: 0,
      children: [
        { title: '订单管理', key: 'order-mgmt', level: 1, isLeaf: true },
        { title: '客户管理', key: 'customer-mgmt', level: 1, isLeaf: true },
        { title: '产品管理', key: 'product-mgmt', level: 1, isLeaf: true }
      ]
    }
  ],
  
  // 项目数据
  projectData: [
    {
      title: '2024年项目',
      key: 'projects-2024',
      level: 0,
      children: [
        { title: '电商平台升级', key: 'ecommerce-upgrade', level: 1, status: 'progress', isLeaf: true },
        { title: '移动端重构', key: 'mobile-refactor', level: 1, status: 'planning', isLeaf: true },
        { title: '数据中台建设', key: 'data-platform', level: 1, status: 'completed', isLeaf: true }
      ]
    }
  ],
  
  // 预览数据
  previewData: {
    department: '技术中心-研发部',
    reportTo: 'CTO - 李总',
    functionCount: 8,
    dataScope: '部门级',
    projectCount: 3,
    responsibleProject: '电商平台升级',
    resourceCount: 15,
    moduleCount: 6
  },
  
  showPreview: false,
  
  // 事件处理
  saveConfiguration: function() {
    console.log('保存组织配置');
    alert('组织配置保存成功！');
  },
  
  previewPermissions: function() {
    this.showPreview = !this.showPreview;
    console.log('预览权限配置');
  },
  
  resetConfiguration: function() {
    console.log('重置配置');
    if (confirm('确定要重置所有配置吗？')) {
      alert('配置已重置！');
    }
  },
  
  exportConfiguration: function() {
    console.log('导出配置');
    alert('配置导出成功！');
  }
};
complete.storyName = '综合应用示例';
complete.parameters = {
  docs: {
    description: {
      story: `
## 综合应用示例

这是一个完整的企业组织管理系统示例，展示了树形选择器在复杂业务场景中的综合应用。

### 🏢 业务场景分析

#### 组织管理系统
- **组织架构**: 多层级的公司组织结构管理
- **权限配置**: 基于角色和功能的权限分配
- **项目分配**: 员工项目参与和负责关系
- **资源访问**: 文档和系统模块的访问控制

#### 系统特点
- **层次清晰**: 通过树形结构展示复杂的组织关系
- **权限细分**: 支持功能权限和数据权限的精细控制
- **灵活配置**: 支持单选、多选、限制选择等多种模式
- **可视化管理**: 通过图标和预览面板提升管理效率

### 🎯 技术实现要点

#### 多种选择模式
\`\`\`html
<!-- 单选模式：部门选择 -->
<hy-treeSelect [datas]="organizationData" 
               placeholder="请选择所属部门">
</hy-treeSelect>

<!-- 多选关联模式：功能权限 -->
<hy-treeSelect [datas]="permissionData" 
               [checkable]="true"
               placeholder="请选择功能权限">
</hy-treeSelect>

<!-- 多选独立模式：数据权限 -->
<hy-treeSelect [datas]="dataPermissionData" 
               [checkable]="true"
               [checkStrictly]="true"
               placeholder="请选择数据权限范围">
</hy-treeSelect>
\`\`\`

#### 自定义图标系统
\`\`\`html
<ng-template #orgIconTemplate let-item="item">
  <hy-icon nzIconName="bank" *ngIf="item.level === 0" iconClass="blue"></hy-icon>
  <hy-icon nzIconName="apartment" *ngIf="item.level === 1" iconClass="green"></hy-icon>
  <hy-icon nzIconName="team" *ngIf="item.level === 2" iconClass="orange"></hy-icon>
</ng-template>
\`\`\`

#### 数据结构设计
\`\`\`typescript
interface OrganizationNode {
  title: string;      // 节点名称
  key: string;        // 唯一标识
  level: number;      // 层级深度
  type?: string;      // 节点类型
  status?: string;    // 状态信息
  disabled?: boolean; // 是否禁用
  children?: OrganizationNode[];
}
\`\`\`

### 🎨 界面设计特色

#### 分组布局
- **功能分组**: 按业务功能将相关配置分组展示
- **视觉分割**: 使用标题和分割线区分不同配置区域
- **层次结构**: 通过缩进和图标展示清晰的层级关系

#### 图标语义化
- **组织图标**: 公司、部门、团队、个人使用不同图标
- **权限图标**: 功能权限、数据权限使用相应的语义图标
- **状态图标**: 项目状态通过不同颜色和图标表示
- **资源图标**: 文档、模块等资源类型的可视化标识

#### 预览面板
- **实时预览**: 配置变更时实时更新预览信息
- **统计信息**: 显示权限数量、项目数量等统计数据
- **关键信息**: 突出显示重要的配置信息
- **状态指示**: 通过颜色区分不同类型的配置

### 🔧 业务逻辑处理

#### 权限计算
\`\`\`typescript
// 计算用户最终权限
calculateUserPermissions(user: User): Permission[] {
  const departmentPermissions = this.getDepartmentPermissions(user.department);
  const rolePermissions = this.getRolePermissions(user.role);
  const personalPermissions = this.getPersonalPermissions(user.id);
  
  return this.mergePermissions([
    departmentPermissions,
    rolePermissions, 
    personalPermissions
  ]);
}
\`\`\`

#### 组织结构验证
\`\`\`typescript
// 验证组织架构的合理性
validateOrganizationStructure(orgData: OrganizationNode[]): ValidationResult {
  // 检查循环引用
  // 验证层级深度
  // 确认必要的管理关系
  return {
    isValid: boolean,
    errors: string[],
    warnings: string[]
  };
}
\`\`\`

#### 配置持久化
\`\`\`typescript
// 保存配置到后端
saveConfiguration(config: OrganizationConfig) {
  return this.http.post('/api/organization/config', config).pipe(
    tap(() => this.showSuccess('配置保存成功')),
    catchError(error => {
      this.showError('配置保存失败：' + error.message);
      return throwError(error);
    })
  );
}
\`\`\`

### 💡 扩展应用场景

1. **企业ERP系统**: 组织架构、权限管理、流程配置
2. **项目管理系统**: 项目分组、成员分配、资源授权
3. **内容管理系统**: 分类管理、权限控制、内容分发
4. **电商后台系统**: 商品分类、店铺管理、供应商管理
5. **教育管理系统**: 学校组织、班级管理、权限分配

### 🎯 用户体验优化

#### 操作便利性
- **搜索功能**: 在大量数据中快速找到目标节点
- **批量操作**: 支持批量选择和批量配置
- **快捷操作**: 提供常用配置的快捷入口
- **操作记录**: 记录配置变更历史便于追溯

#### 信息展示
- **层级指示**: 清晰的视觉层级指示
- **状态反馈**: 及时的操作反馈和状态提示  
- **数据统计**: 提供配置的统计和汇总信息
- **预览确认**: 配置前的预览和确认机制

这个示例展示了如何构建企业级的组织管理系统，既满足了复杂的业务需求，又提供了优秀的用户体验。
`
    }
  }
};

