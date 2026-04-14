import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../base/base.module';
import { HyTagComponent } from './hy-tag.component';
import { unit } from '../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HyTagDatas } from './interface';
import { previewTemplate } from 'storybook-addon-preview';
import { ModelService } from '../../../common/domain/service/model.service';
import { TableService } from '../../../common/domain/service/hytable.service';
import { StoriesModule } from 'stories/stories.module';

const argTypes = unit.createArgTypes('HyTagComponent');

export default {
  title: '数据展示/hy-tag（标签）',
  component: HyTagComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, StoriesModule],
      providers: [{ provide: ModelService }, TableService]
    }),
  ],
  argTypes,
} as Meta;

// 基础用法
const BasicTemplate: Story<HyTagComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础标签用法</h3>
      <p>用于标记和分类的小标签，支持不同的颜色和交互模式</p>
      
      <div class="demo-section">
        <h4>默认标签</h4>
        <p>最基础的标签展示</p>
        <hy-tag [datas]="basicTags" (datasChange)="handleBasicChange($event)"></hy-tag>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>可关闭标签</h4>
        <p>支持关闭操作的标签</p>
        <hy-tag [datas]="closableTags" (datasChange)="handleClosableChange($event)"></hy-tag>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>可选择标签</h4>
        <p>支持点击选择的标签</p>
        <hy-tag [datas]="checkableTags" (datasChange)="handleCheckableChange($event)"></hy-tag>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>彩色标签</h4>
        <p>不同颜色的标签</p>
        <hy-tag [datas]="colorfulTags" (datasChange)="handleColorfulChange($event)"></hy-tag>
      </div>
    </div>
  `
});

export const basic = BasicTemplate.bind({});
basic.args = {
  // 基础标签
  basicTags: [
    { title: '默认标签', mode: 'default' },
    { title: '普通标签', mode: 'default' },
    { title: '文本标签', mode: 'default' }
  ],
  
  // 可关闭标签
  closableTags: [
    { title: 'JavaScript', mode: 'close' },
    { title: 'TypeScript', mode: 'close' },
    { title: 'Angular', mode: 'close' },
    { title: 'React', mode: 'close' }
  ],
  
  // 可选择标签
  checkableTags: [
    { title: '前端开发', mode: 'check' },
    { title: '后端开发', mode: 'check' },
    { title: '移动开发', mode: 'check' },
    { title: '全栈开发', mode: 'check' }
  ],
  
  // 彩色标签
  colorfulTags: [
    { title: '重要', mode: 'default', color: 'red' },
    { title: '进行中', mode: 'default', color: 'blue' },
    { title: '已完成', mode: 'default', color: 'green' },
    { title: '待处理', mode: 'default', color: 'orange' },
    { title: '已取消', mode: 'default', color: 'gray' }
  ],
  
  // 事件处理
  handleBasicChange: (tags: HyTagDatas[]) => {
    console.log('基础标签变化：', tags);
  },
  
  handleClosableChange: (tags: HyTagDatas[]) => {
    console.log('可关闭标签变化：', tags);
  },
  
  handleCheckableChange: (tags: HyTagDatas[]) => {
    console.log('可选择标签变化：', tags);
  },
  
  handleColorfulChange: (tags: HyTagDatas[]) => {
    console.log('彩色标签变化：', tags);
  }
};
basic.storyName = '基础用法';
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

标签用于标记和分类，是一种小型的信息载体，支持多种交互模式。

### 🏷️ 主要特性

#### 标签模式
- **default**: 默认标签，仅用于展示
- **close**: 可关闭标签，支持删除操作
- **check**: 可选择标签，支持选中/取消选中

#### 颜色系统
- 支持多种预设颜色：red、blue、green、orange、gray等
- 可以自定义颜色值
- 不同颜色表示不同的语义和状态

#### 交互功能
- **关闭操作**: 点击关闭按钮删除标签
- **选择操作**: 点击标签切换选中状态
- **数据同步**: 通过事件回调同步数据变化

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| datas | 标签数据数组 | HyTagDatas[] | [] |
| showNewTag | 是否显示添加按钮 | boolean | false |
| datasChange | 数据变化回调 | EventEmitter | - |

### 数据结构
\`\`\`typescript
interface HyTagDatas {
  title: string;        // 标签文字
  mode?: string;        // 标签模式：'default'|'close'|'check'
  color?: string;       // 标签颜色
  checked?: boolean;    // 是否选中（check模式）
  disabled?: boolean;   // 是否禁用
}
\`\`\`

### 💡 使用场景

#### 内容标记
- **文章标签**: 文章的分类和标记
- **产品标签**: 产品的特性和分类
- **用户标签**: 用户的兴趣和属性

#### 状态指示
- **任务状态**: 进行中、已完成、待处理等
- **优先级**: 高、中、低优先级标记
- **类型分类**: 不同类型的可视化标识

#### 筛选选择
- **多选筛选**: 支持多个条件的筛选
- **标签选择**: 用户兴趣和偏好的选择
- **分类管理**: 内容分类的管理和组织
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 基础标签 -->
<hy-tag [datas]="basicTags" 
        (datasChange)="handleBasicChange($event)">
</hy-tag>

<!-- 可关闭标签 -->
<hy-tag [datas]="closableTags" 
        (datasChange)="handleClosableChange($event)">
</hy-tag>

<!-- 可选择标签 -->
<hy-tag [datas]="checkableTags" 
        (datasChange)="handleCheckableChange($event)">
</hy-tag>

<!-- 彩色标签 -->
<hy-tag [datas]="colorfulTags" 
        (datasChange)="handleColorfulChange($event)">
</hy-tag>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';
import { HyTagDatas } from './interface';

@Component({
  selector: 'app-tag-demo',
  templateUrl: './tag-demo.component.html'
})
export class TagDemoComponent {
  // 基础标签数据
  basicTags: HyTagDatas[] = [
    { title: '默认标签', mode: 'default' },
    { title: '普通标签', mode: 'default' },
    { title: '文本标签', mode: 'default' }
  ];

  // 可关闭标签数据
  closableTags: HyTagDatas[] = [
    { title: 'JavaScript', mode: 'close' },
    { title: 'TypeScript', mode: 'close' },
    { title: 'Angular', mode: 'close' },
    { title: 'React', mode: 'close' }
  ];

  // 可选择标签数据
  checkableTags: HyTagDatas[] = [
    { title: '前端开发', mode: 'check', checked: false },
    { title: '后端开发', mode: 'check', checked: true },
    { title: '移动开发', mode: 'check', checked: false },
    { title: '全栈开发', mode: 'check', checked: false }
  ];

  // 彩色标签数据
  colorfulTags: HyTagDatas[] = [
    { title: '重要', mode: 'default', color: 'red' },
    { title: '进行中', mode: 'default', color: 'blue' },
    { title: '已完成', mode: 'default', color: 'green' },
    { title: '待处理', mode: 'default', color: 'orange' }
  ];

  // 基础标签变化处理
  handleBasicChange(tags: HyTagDatas[]) {
    this.basicTags = tags;
    console.log('基础标签变化：', tags);
  }

  // 可关闭标签变化处理
  handleClosableChange(tags: HyTagDatas[]) {
    this.closableTags = tags;
    console.log('标签被关闭，剩余：', tags);
  }

  // 可选择标签变化处理
  handleCheckableChange(tags: HyTagDatas[]) {
    this.checkableTags = tags;
    const selectedTags = tags.filter(tag => tag.checked);
    console.log('选中的标签：', selectedTags);
  }

  // 获取选中的标签
  getSelectedTags(): HyTagDatas[] {
    return this.checkableTags.filter(tag => tag.checked);
  }

  // 获取选中的标签名称
  getSelectedTagNames(): string[] {
    return this.getSelectedTags().map(tag => tag.title);
  }

  // 全选/取消全选
  toggleSelectAll() {
    const allSelected = this.checkableTags.every(tag => tag.checked);
    this.checkableTags.forEach(tag => {
      tag.checked = !allSelected;
    });
  }

  // 添加新标签
  addTag(title: string, mode: string = 'default', color?: string) {
    const newTag: HyTagDatas = {
      title,
      mode,
      color,
      checked: mode === 'check' ? false : undefined
    };
    
    this.basicTags.push(newTag);
  }

  // 删除指定标签
  removeTag(targetTitle: string) {
    this.basicTags = this.basicTags.filter(tag => tag.title !== targetTitle);
  }

  // 清空所有标签
  clearAllTags() {
    this.basicTags = [];
    this.closableTags = [];
    this.checkableTags = [];
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 动态标签管理
const DynamicTemplate: Story<HyTagComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>动态添加标签</h4>
        <p>支持动态添加新标签</p>
        <hy-tag [datas]="dynamicTags" [showNewTag]="true" (datasChange)="handleDynamicChange($event)"></hy-tag>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>标签输入</h4>
        <p>通过输入框添加标签</p>
        <div style="margin-bottom: 16px;">
          <hy-form>
            <hy-gt model="tagInput">
              <hy-text title="新标签" model="newTagName" placeholder="输入标签名称" [cols]="8"></hy-text>
              <hy-select title="标签模式" model="newTagMode" [options]="modeOptions" [cols]="6"></hy-select>
              <hy-select title="标签颜色" model="newTagColor" [options]="colorOptions" [cols]="6"></hy-select>
            </hy-gt>
            <hy-button title="添加标签" (onClick)="addNewTag()" type="primary"></hy-button>
            <hy-button title="批量添加" (onClick)="batchAddTags()"></hy-button>
            <hy-button title="清空标签" (onClick)="clearTags()"></hy-button>
          </hy-form>
        </div>
        <hy-tag [datas]="inputTags" (datasChange)="handleInputChange($event)"></hy-tag>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>标签统计</h4>
        <p>显示标签的数量和状态统计</p>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 16px 0;">
          <div style="padding: 12px; background: #f6ffed; border-radius: 6px; text-align: center;">
            <div style="font-size: 20px; font-weight: bold; color: #52c41a;">{{getTotalCount()}}</div>
            <div style="font-size: 12px; color: #666;">总数量</div>
          </div>
          <div style="padding: 12px; background: #e6f7ff; border-radius: 6px; text-align: center;">
            <div style="font-size: 20px; font-weight: bold; color: #1890ff;">{{getSelectedCount()}}</div>
            <div style="font-size: 12px; color: #666;">已选择</div>
          </div>
          <div style="padding: 12px; background: #fff7e6; border-radius: 6px; text-align: center;">
            <div style="font-size: 20px; font-weight: bold; color: #faad14;">{{getClosableCount()}}</div>
            <div style="font-size: 12px; color: #666;">可关闭</div>
          </div>
          <div style="padding: 12px; background: #f6f6f6; border-radius: 6px; text-align: center;">
            <div style="font-size: 20px; font-weight: bold; color: #666;">{{getColorfulCount()}}</div>
            <div style="font-size: 12px; color: #666;">有颜色</div>
          </div>
        </div>
        <hy-tag [datas]="statisticTags" (datasChange)="handleStatisticChange($event)"></hy-tag>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>标签操作</h4>
        <p>批量操作标签</p>
        <div style="margin-bottom: 16px;">
          <hy-form>
            <hy-button title="全选" (onClick)="selectAll()"></hy-button>
            <hy-button title="取消全选" (onClick)="deselectAll()"></hy-button>
            <hy-button title="反选" (onClick)="invertSelection()"></hy-button>
            <hy-button title="删除选中" (onClick)="deleteSelected()"></hy-button>
            <hy-button title="随机颜色" (onClick)="randomizeColors()"></hy-button>
          </hy-form>
        </div>
        <hy-tag [datas]="operationTags" (datasChange)="handleOperationChange($event)"></hy-tag>
      </div>
    </div>
  `
});

export const dynamic = DynamicTemplate.bind({});
dynamic.args = {
  // 动态标签
  dynamicTags: [
    { title: '可编辑', mode: 'close', color: 'blue' },
    { title: '可选择', mode: 'check', checked: false, color: 'green' }
  ],
  
  // 输入标签
  inputTags: [],
  
  // 统计标签
  statisticTags: [
    { title: '前端', mode: 'check', checked: true, color: 'blue' },
    { title: '后端', mode: 'check', checked: false, color: 'green' },
    { title: '设计', mode: 'close', color: 'purple' },
    { title: '测试', mode: 'default', color: 'orange' },
    { title: '运维', mode: 'check', checked: true, color: 'red' }
  ],
  
  // 操作标签
  operationTags: [
    { title: 'HTML', mode: 'check', checked: false, color: 'red' },
    { title: 'CSS', mode: 'check', checked: true, color: 'blue' },
    { title: 'JavaScript', mode: 'check', checked: false, color: 'yellow' },
    { title: 'TypeScript', mode: 'check', checked: true, color: 'blue' },
    { title: 'React', mode: 'check', checked: false, color: 'cyan' },
    { title: 'Vue', mode: 'check', checked: false, color: 'green' }
  ],
  
  // 表单数据
  newTagName: '',
  newTagMode: 'default',
  newTagColor: 'blue',
  
  // 选项数据
  modeOptions: [
    { label: '默认', value: 'default' },
    { label: '可关闭', value: 'close' },
    { label: '可选择', value: 'check' }
  ],
  
  colorOptions: [
    { label: '蓝色', value: 'blue' },
    { label: '绿色', value: 'green' },
    { label: '红色', value: 'red' },
    { label: '橙色', value: 'orange' },
    { label: '紫色', value: 'purple' },
    { label: '青色', value: 'cyan' },
    { label: '灰色', value: 'gray' }
  ],
  
  // 事件处理
  handleDynamicChange: function(tags: HyTagDatas[]) {
    this.dynamicTags = tags;
    console.log('动态标签变化：', tags);
  },
  
  handleInputChange: function(tags: HyTagDatas[]) {
    this.inputTags = tags;
    console.log('输入标签变化：', tags);
  },
  
  handleStatisticChange: function(tags: HyTagDatas[]) {
    this.statisticTags = tags;
    console.log('统计标签变化：', tags);
  },
  
  handleOperationChange: function(tags: HyTagDatas[]) {
    this.operationTags = tags;
    console.log('操作标签变化：', tags);
  },
  
  // 添加新标签
  addNewTag: function() {
    if (!this.newTagName || this.newTagName.trim() === '') {
      alert('请输入标签名称');
      return;
    }
    
    const newTag: HyTagDatas = {
      title: this.newTagName.trim(),
      mode: this.newTagMode,
      color: this.newTagColor
    };
    
    this.inputTags.push(newTag);
    this.newTagName = '';
    console.log('添加新标签：', newTag);
  },
  
  // 批量添加标签
  batchAddTags: function() {
    const batchTags = [
      { title: 'Node.js', mode: 'check', color: 'green', checked: false },
      { title: 'Python', mode: 'check', color: 'blue', checked: false },
      { title: 'Java', mode: 'close', color: 'orange' },
      { title: 'C++', mode: 'default', color: 'red' }
    ];
    
    this.inputTags.push(...batchTags);
    console.log('批量添加标签：', batchTags);
  },
  
  // 清空标签
  clearTags: function() {
    if (confirm('确定要清空所有标签吗？')) {
      this.inputTags = [];
      console.log('标签已清空');
    }
  },
  
  // 统计方法
  getTotalCount: function() {
    return this.statisticTags.length;
  },
  
  getSelectedCount: function() {
    return this.statisticTags.filter(tag => tag.checked).length;
  },
  
  getClosableCount: function() {
    return this.statisticTags.filter(tag => tag.mode === 'close').length;
  },
  
  getColorfulCount: function() {
    return this.statisticTags.filter(tag => tag.color).length;
  },
  
  // 批量操作
  selectAll: function() {
    this.operationTags.forEach(tag => {
      if (tag.mode === 'check') {
        tag.checked = true;
      }
    });
  },
  
  deselectAll: function() {
    this.operationTags.forEach(tag => {
      if (tag.mode === 'check') {
        tag.checked = false;
      }
    });
  },
  
  invertSelection: function() {
    this.operationTags.forEach(tag => {
      if (tag.mode === 'check') {
        tag.checked = !tag.checked;
      }
    });
  },
  
  deleteSelected: function() {
    const selectedCount = this.operationTags.filter(tag => tag.checked).length;
    if (selectedCount === 0) {
      alert('请选择要删除的标签');
      return;
    }
    
    if (confirm(`确定要删除${selectedCount}个选中的标签吗？`)) {
      this.operationTags = this.operationTags.filter(tag => !tag.checked);
      console.log('删除选中标签完成');
    }
  },
  
  randomizeColors: function() {
    const colors = ['red', 'blue', 'green', 'orange', 'purple', 'cyan', 'gray'];
    this.operationTags.forEach(tag => {
      tag.color = colors[Math.floor(Math.random() * colors.length)];
    });
    console.log('随机颜色设置完成');
  }
};
dynamic.storyName = '动态标签管理';
dynamic.parameters = {
  docs: {
    description: {
      story: `
## 动态标签管理

提供丰富的标签管理功能，包括动态添加、批量操作、统计分析等。

### 🔄 动态添加功能

#### showNewTag属性
- 设置为true时显示"+"添加按钮
- 点击可以添加新的空白标签
- 支持直接编辑新添加的标签

#### 输入框添加
- 通过表单输入添加新标签
- 可以指定标签的模式和颜色
- 支持批量添加预设标签

### 📊 标签统计

#### 统计指标
- **总数量**: 所有标签的总数
- **已选择**: 处于选中状态的标签数
- **可关闭**: 可以关闭的标签数
- **有颜色**: 设置了颜色的标签数

#### 实时更新
标签的增删改操作会实时更新统计数据，提供准确的数据反馈。

### 🔧 批量操作

#### 选择操作
- **全选**: 选中所有可选择的标签
- **取消全选**: 取消所有标签的选中状态
- **反选**: 反转所有标签的选中状态

#### 管理操作
- **删除选中**: 删除所有选中的标签
- **随机颜色**: 为所有标签随机分配颜色
- **清空标签**: 清空所有标签

### 💡 应用场景

#### 标签管理系统
- **文章标签**: 文章分类和标记的管理
- **用户兴趣**: 用户兴趣标签的选择和管理
- **产品标签**: 产品特性和分类的标记

#### 筛选系统
- **搜索筛选**: 多条件组合筛选
- **分类筛选**: 按分类进行内容筛选
- **状态筛选**: 按状态筛选任务或项目

### 🎯 高级功能

#### 标签验证
\`\`\`typescript
// 验证标签名称
validateTagName(name: string): boolean {
  if (!name || name.trim() === '') return false;
  if (name.length > 20) return false;
  return !this.tags.some(tag => tag.title === name);
}
\`\`\`

#### 标签搜索
\`\`\`typescript
// 搜索标签
searchTags(keyword: string): HyTagDatas[] {
  return this.tags.filter(tag => 
    tag.title.toLowerCase().includes(keyword.toLowerCase())
  );
}
\`\`\`

#### 标签排序
\`\`\`typescript
// 按选中状态排序
sortByChecked(): HyTagDatas[] {
  return [...this.tags].sort((a, b) => {
    if (a.checked && !b.checked) return -1;
    if (!a.checked && b.checked) return 1;
    return 0;
  });
}
\`\`\`

这个功能让标签组件不仅仅是静态展示，而是一个完整的标签管理系统。
`
    }
  }
};

// 综合应用示例
const CompleteTemplate: Story<HyTagComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>🏷️ 内容管理标签系统</h3>
      <p>完整的内容标签管理示例，展示标签组件在实际业务中的综合应用</p>
      
      <div class="demo-case" style="border: 1px solid #f0f0f0; border-radius: 8px; padding: 24px; background: white;">
        <!-- 文章管理 -->
        <div class="article-management" style="margin-bottom: 32px;">
          <h4 style="margin: 0 0 16px 0; color: #262626;">📄 文章标签管理</h4>
          
          <div style="display: grid; grid-template-columns: 1fr 300px; gap: 24px;">
            <div class="article-content">
              <div class="article-item" style="border: 1px solid #f0f0f0; border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <h5 style="margin: 0 0 8px 0;">Angular组件开发最佳实践</h5>
                <p style="margin: 0 0 12px 0; color: #666; font-size: 14px;">本文介绍了Angular组件开发的最佳实践，包括组件设计原则、性能优化技巧等内容...</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <hy-tag [datas]="article1Tags" (datasChange)="handleArticle1Change($event)"></hy-tag>
                  <div style="font-size: 12px; color: #999;">2024-01-15 | 1.2k阅读</div>
                </div>
              </div>
              
              <div class="article-item" style="border: 1px solid #f0f0f0; border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <h5 style="margin: 0 0 8px 0;">React Hooks深度解析</h5>
                <p style="margin: 0 0 12px 0; color: #666; font-size: 14px;">深入探讨React Hooks的原理和使用技巧，帮助开发者更好地理解和应用Hooks...</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <hy-tag [datas]="article2Tags" (datasChange)="handleArticle2Change($event)"></hy-tag>
                  <div style="font-size: 12px; color: #999;">2024-01-12 | 890阅读</div>
                </div>
              </div>
              
              <div class="article-item" style="border: 1px solid #f0f0f0; border-radius: 6px; padding: 16px;">
                <h5 style="margin: 0 0 8px 0;">TypeScript进阶技巧</h5>
                <p style="margin: 0 0 12px 0; color: #666; font-size: 14px;">分享TypeScript的高级特性和实用技巧，提升代码质量和开发效率...</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <hy-tag [datas]="article3Tags" (datasChange)="handleArticle3Change($event)"></hy-tag>
                  <div style="font-size: 12px; color: #999;">2024-01-10 | 1.5k阅读</div>
                </div>
              </div>
            </div>
            
            <div class="tag-management">
              <div style="background: #fafafa; padding: 16px; border-radius: 6px;">
                <h6 style="margin: 0 0 12px 0;">标签库管理</h6>
                <div style="margin-bottom: 16px;">
                  <hy-form>
                    <hy-gt model="tagLibrary">
                      <hy-text model="newTagName" placeholder="新标签名称" style="margin-bottom: 8px;"></hy-text>
                      <hy-select model="newTagCategory" [options]="categoryOptions" placeholder="选择分类" style="margin-bottom: 8px;"></hy-select>
                    </hy-gt>
                    <hy-button title="添加到库" (onClick)="addToLibrary()" size="small" style="width: 100%;"></hy-button>
                  </hy-form>
                </div>
                
                <div class="tag-categories">
                  <div style="margin-bottom: 12px;">
                    <div style="font-size: 12px; color: #666; margin-bottom: 4px;">技术分类</div>
                    <hy-tag [datas]="techTags" [showNewTag]="true" (datasChange)="handleTechTagsChange($event)"></hy-tag>
                  </div>
                  
                  <div style="margin-bottom: 12px;">
                    <div style="font-size: 12px; color: #666; margin-bottom: 4px;">内容类型</div>
                    <hy-tag [datas]="contentTypeTags" [showNewTag]="true" (datasChange)="handleContentTypeChange($event)"></hy-tag>
                  </div>
                  
                  <div style="margin-bottom: 12px;">
                    <div style="font-size: 12px; color: #666; margin-bottom: 4px;">难度等级</div>
                    <hy-tag [datas]="difficultyTags" (datasChange)="handleDifficultyChange($event)"></hy-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 筛选系统 -->
        <div class="filter-system" style="margin-bottom: 32px;">
          <h4 style="margin: 0 0 16px 0; color: #262626;">🔍 智能筛选系统</h4>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
            <div class="filter-group" style="border: 1px solid #f0f0f0; border-radius: 6px; padding: 16px;">
              <h6 style="margin: 0 0 12px 0; display: flex; align-items: center;">
                <hy-icon nzIconName="code" style="margin-right: 6px; color: #1890ff;"></hy-icon>
                技术栈筛选
              </h6>
              <hy-tag [datas]="techFilterTags" (datasChange)="handleTechFilterChange($event)"></hy-tag>
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                已选择：{{getSelectedTechCount()}} 个技术
              </div>
            </div>
            
            <div class="filter-group" style="border: 1px solid #f0f0f0; border-radius: 6px; padding: 16px;">
              <h6 style="margin: 0 0 12px 0; display: flex; align-items: center;">
                <hy-icon nzIconName="tags" style="margin-right: 6px; color: #52c41a;"></hy-icon>
                内容分类
              </h6>
              <hy-tag [datas]="categoryFilterTags" (datasChange)="handleCategoryFilterChange($event)"></hy-tag>
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                已选择：{{getSelectedCategoryCount()}} 个分类
              </div>
            </div>
            
            <div class="filter-group" style="border: 1px solid #f0f0f0; border-radius: 6px; padding: 16px;">
              <h6 style="margin: 0 0 12px 0; display: flex; align-items: center;">
                <hy-icon nzIconName="flag" style="margin-right: 6px; color: #faad14;"></hy-icon>
                状态筛选
              </h6>
              <hy-tag [datas]="statusFilterTags" (datasChange)="handleStatusFilterChange($event)"></hy-tag>
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                已选择：{{getSelectedStatusCount()}} 个状态
              </div>
            </div>
          </div>
          
          <div style="margin-top: 16px; padding: 12px; background: #f6f6f6; border-radius: 6px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="font-size: 14px;">
                筛选结果：找到 <strong>{{getFilteredCount()}}</strong> 篇文章
              </div>
              <hy-form>
                <hy-button title="应用筛选" (onClick)="applyFilters()" type="primary" size="small"></hy-button>
                <hy-button title="清空筛选" (onClick)="clearFilters()" size="small"></hy-button>
                <hy-button title="保存筛选" (onClick)="saveFilters()" size="small"></hy-button>
              </hy-form>
            </div>
          </div>
        </div>
        
        <!-- 用户兴趣管理 -->
        <div class="user-interests" style="margin-bottom: 32px;">
          <h4 style="margin: 0 0 16px 0; color: #262626;">👤 用户兴趣标签</h4>
          
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
            <div class="interests-main">
              <div class="interest-section" style="margin-bottom: 20px;">
                <h6 style="margin: 0 0 8px 0; display: flex; align-items: center;">
                  <span style="width: 12px; height: 12px; background: #1890ff; border-radius: 50%; margin-right: 8px;"></span>
                  我的技术兴趣 ({{getUserTechInterests().length}})
                </h6>
                <hy-tag [datas]="userTechInterests" [showNewTag]="true" (datasChange)="handleUserTechChange($event)"></hy-tag>
              </div>
              
              <div class="interest-section" style="margin-bottom: 20px;">
                <h6 style="margin: 0 0 8px 0; display: flex; align-items: center;">
                  <span style="width: 12px; height: 12px; background: #52c41a; border-radius: 50%; margin-right: 8px;"></span>
                  内容偏好 ({{getUserContentPrefs().length}})
                </h6>
                <hy-tag [datas]="userContentPrefs" [showNewTag]="true" (datasChange)="handleUserContentChange($event)"></hy-tag>
              </div>
              
              <div class="interest-section">
                <h6 style="margin: 0 0 8px 0; display: flex; align-items: center;">
                  <span style="width: 12px; height: 12px; background: #faad14; border-radius: 50%; margin-right: 8px;"></span>
                  学习目标 ({{getUserLearningGoals().length}})
                </h6>
                <hy-tag [datas]="userLearningGoals" [showNewTag]="true" (datasChange)="handleUserLearningChange($event)"></hy-tag>
              </div>
            </div>
            
            <div class="interests-sidebar">
              <div style="background: #f0f9ff; padding: 16px; border-radius: 6px; border-left: 4px solid #1890ff;">
                <h6 style="margin: 0 0 12px 0; color: #1890ff;">个性化推荐</h6>
                <div style="font-size: 13px; color: #666; line-height: 1.5;">
                  根据您的兴趣标签，我们为您推荐：
                  <ul style="margin: 8px 0 0 16px; padding: 0;">
                    <li>Angular进阶教程</li>
                    <li>TypeScript实战项目</li>
                    <li>前端性能优化</li>
                    <li>组件化开发实践</li>
                  </ul>
                </div>
              </div>
              
              <div style="background: #f6ffed; padding: 16px; border-radius: 6px; border-left: 4px solid #52c41a; margin-top: 16px;">
                <h6 style="margin: 0 0 8px 0; color: #52c41a;">标签统计</h6>
                <div style="font-size: 12px; color: #666;">
                  <div>技术兴趣：{{getUserTechInterests().length}} 个</div>
                  <div>内容偏好：{{getUserContentPrefs().length}} 个</div>
                  <div>学习目标：{{getUserLearningGoals().length}} 个</div>
                  <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #d9f7be;">
                    总标签数：{{getTotalUserInterests()}} 个
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 操作面板 -->
        <div class="operations-panel" style="padding-top: 16px; border-top: 1px solid #f0f0f0;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <hy-form>
              <hy-button title="导出标签" (onClick)="exportTags()"></hy-button>
              <hy-button title="导入标签" (onClick)="importTags()"></hy-button>
              <hy-button title="标签分析" (onClick)="analyzeTags()"></hy-button>
              <hy-button title="生成报告" (onClick)="generateReport()"></hy-button>
            </hy-form>
            <div style="font-size: 12px; color: #999;">
              系统共有 {{getTotalSystemTags()}} 个标签 | 最后更新：{{lastUpdateTime}}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

export const complete = CompleteTemplate.bind({});
complete.args = {
  // 文章标签
  article1Tags: [
    { title: 'Angular', mode: 'close', color: 'red' },
    { title: '组件开发', mode: 'close', color: 'blue' },
    { title: '最佳实践', mode: 'default', color: 'green' },
    { title: '前端', mode: 'default', color: 'orange' }
  ],
  
  article2Tags: [
    { title: 'React', mode: 'close', color: 'cyan' },
    { title: 'Hooks', mode: 'close', color: 'blue' },
    { title: '深度解析', mode: 'default', color: 'purple' },
    { title: '前端', mode: 'default', color: 'orange' }
  ],
  
  article3Tags: [
    { title: 'TypeScript', mode: 'close', color: 'blue' },
    { title: '进阶', mode: 'close', color: 'green' },
    { title: '技巧', mode: 'default', color: 'orange' }
  ],
  
  // 标签库
  techTags: [
    { title: 'JavaScript', mode: 'check', checked: false, color: 'yellow' },
    { title: 'Python', mode: 'check', checked: false, color: 'green' },
    { title: 'Java', mode: 'check', checked: false, color: 'orange' },
    { title: 'Go', mode: 'check', checked: false, color: 'cyan' }
  ],
  
  contentTypeTags: [
    { title: '教程', mode: 'check', checked: false, color: 'blue' },
    { title: '实战', mode: 'check', checked: false, color: 'green' },
    { title: '理论', mode: 'check', checked: false, color: 'purple' },
    { title: '工具', mode: 'check', checked: false, color: 'orange' }
  ],
  
  difficultyTags: [
    { title: '入门', mode: 'check', checked: false, color: 'green' },
    { title: '进阶', mode: 'check', checked: false, color: 'blue' },
    { title: '高级', mode: 'check', checked: false, color: 'red' }
  ],
  
  // 筛选标签
  techFilterTags: [
    { title: 'React', mode: 'check', checked: false, color: 'cyan' },
    { title: 'Angular', mode: 'check', checked: true, color: 'red' },
    { title: 'Vue', mode: 'check', checked: false, color: 'green' },
    { title: 'TypeScript', mode: 'check', checked: true, color: 'blue' }
  ],
  
  categoryFilterTags: [
    { title: '前端开发', mode: 'check', checked: true, color: 'blue' },
    { title: '后端开发', mode: 'check', checked: false, color: 'green' },
    { title: '移动开发', mode: 'check', checked: false, color: 'purple' },
    { title: '全栈开发', mode: 'check', checked: false, color: 'orange' }
  ],
  
  statusFilterTags: [
    { title: '已发布', mode: 'check', checked: true, color: 'green' },
    { title: '草稿', mode: 'check', checked: false, color: 'gray' },
    { title: '审核中', mode: 'check', checked: false, color: 'orange' }
  ],
  
  // 用户兴趣
  userTechInterests: [
    { title: 'Angular', mode: 'close', color: 'red' },
    { title: 'TypeScript', mode: 'close', color: 'blue' },
    { title: 'RxJS', mode: 'close', color: 'purple' },
    { title: 'NgRx', mode: 'close', color: 'cyan' }
  ],
  
  userContentPrefs: [
    { title: '实战教程', mode: 'close', color: 'green' },
    { title: '源码分析', mode: 'close', color: 'blue' },
    { title: '性能优化', mode: 'close', color: 'orange' }
  ],
  
  userLearningGoals: [
    { title: '组件库开发', mode: 'close', color: 'purple' },
    { title: '微前端架构', mode: 'close', color: 'cyan' },
    { title: '全栈开发', mode: 'close', color: 'orange' }
  ],
  
  // 表单数据
  newTagName: '',
  newTagCategory: 'tech',
  
  categoryOptions: [
    { label: '技术分类', value: 'tech' },
    { label: '内容类型', value: 'content' },
    { label: '难度等级', value: 'difficulty' }
  ],
  
  lastUpdateTime: '2024-01-15 14:30:22',
  
  // 文章标签变化处理
  handleArticle1Change: function(tags: HyTagDatas[]) {
    this.article1Tags = tags;
    console.log('文章1标签变化：', tags);
  },
  
  handleArticle2Change: function(tags: HyTagDatas[]) {
    this.article2Tags = tags;
    console.log('文章2标签变化：', tags);
  },
  
  handleArticle3Change: function(tags: HyTagDatas[]) {
    this.article3Tags = tags;
    console.log('文章3标签变化：', tags);
  },
  
  // 标签库变化处理
  handleTechTagsChange: function(tags: HyTagDatas[]) {
    this.techTags = tags;
    console.log('技术标签变化：', tags);
  },
  
  handleContentTypeChange: function(tags: HyTagDatas[]) {
    this.contentTypeTags = tags;
    console.log('内容类型标签变化：', tags);
  },
  
  handleDifficultyChange: function(tags: HyTagDatas[]) {
    this.difficultyTags = tags;
    console.log('难度标签变化：', tags);
  },
  
  // 筛选标签变化处理
  handleTechFilterChange: function(tags: HyTagDatas[]) {
    this.techFilterTags = tags;
    console.log('技术筛选变化：', tags);
  },
  
  handleCategoryFilterChange: function(tags: HyTagDatas[]) {
    this.categoryFilterTags = tags;
    console.log('分类筛选变化：', tags);
  },
  
  handleStatusFilterChange: function(tags: HyTagDatas[]) {
    this.statusFilterTags = tags;
    console.log('状态筛选变化：', tags);
  },
  
  // 用户兴趣变化处理
  handleUserTechChange: function(tags: HyTagDatas[]) {
    this.userTechInterests = tags;
    console.log('用户技术兴趣变化：', tags);
  },
  
  handleUserContentChange: function(tags: HyTagDatas[]) {
    this.userContentPrefs = tags;
    console.log('用户内容偏好变化：', tags);
  },
  
  handleUserLearningChange: function(tags: HyTagDatas[]) {
    this.userLearningGoals = tags;
    console.log('用户学习目标变化：', tags);
  },
  
  // 统计方法
  getSelectedTechCount: function() {
    return this.techFilterTags.filter(tag => tag.checked).length;
  },
  
  getSelectedCategoryCount: function() {
    return this.categoryFilterTags.filter(tag => tag.checked).length;
  },
  
  getSelectedStatusCount: function() {
    return this.statusFilterTags.filter(tag => tag.checked).length;
  },
  
  getFilteredCount: function() {
    // 模拟筛选结果计算
    const techCount = this.getSelectedTechCount();
    const categoryCount = this.getSelectedCategoryCount();
    const statusCount = this.getSelectedStatusCount();
    
    // 简单的筛选逻辑模拟
    let baseCount = 150; // 假设总共150篇文章
    if (techCount > 0) baseCount = Math.floor(baseCount * 0.6);
    if (categoryCount > 0) baseCount = Math.floor(baseCount * 0.8);
    if (statusCount > 0) baseCount = Math.floor(baseCount * 0.9);
    
    return Math.max(baseCount, 5); // 至少显示5篇
  },
  
  getUserTechInterests: function() {
    return this.userTechInterests;
  },
  
  getUserContentPrefs: function() {
    return this.userContentPrefs;
  },
  
  getUserLearningGoals: function() {
    return this.userLearningGoals;
  },
  
  getTotalUserInterests: function() {
    return this.userTechInterests.length + this.userContentPrefs.length + this.userLearningGoals.length;
  },
  
  getTotalSystemTags: function() {
    return this.techTags.length + this.contentTypeTags.length + this.difficultyTags.length + 
           this.article1Tags.length + this.article2Tags.length + this.article3Tags.length +
           this.getTotalUserInterests();
  },
  
  // 标签库操作
  addToLibrary: function() {
    if (!this.newTagName || this.newTagName.trim() === '') {
      alert('请输入标签名称');
      return;
    }
    
    const newTag: HyTagDatas = {
      title: this.newTagName.trim(),
      mode: 'check',
      color: 'blue'
    };
    
    if (this.newTagCategory === 'tech') {
      this.techTags.push(newTag);
    } else if (this.newTagCategory === 'content') {
      this.contentTypeTags.push(newTag);
    } else if (this.newTagCategory === 'difficulty') {
      this.difficultyTags.push(newTag);
    }
    
    this.newTagName = '';
    console.log('添加到标签库：', newTag);
  },
  
  // 筛选操作
  applyFilters: function() {
    console.log('应用筛选条件');
    alert(`筛选完成！找到 ${this.getFilteredCount()} 篇相关文章`);
  },
  
  clearFilters: function() {
    this.techFilterTags.forEach(tag => tag.checked = false);
    this.categoryFilterTags.forEach(tag => tag.checked = false);
    this.statusFilterTags.forEach(tag => tag.checked = false);
    console.log('清空筛选条件');
  },
  
  saveFilters: function() {
    const filterData = {
      tech: this.techFilterTags.filter(tag => tag.checked).map(tag => tag.title),
      category: this.categoryFilterTags.filter(tag => tag.checked).map(tag => tag.title),
      status: this.statusFilterTags.filter(tag => tag.checked).map(tag => tag.title)
    };
    console.log('保存筛选条件：', filterData);
    alert('筛选条件已保存！');
  },
  
  // 系统操作
  exportTags: () => {
    console.log('导出标签数据');
    alert('标签数据导出成功！');
  },
  
  importTags: () => {
    console.log('导入标签数据');
    alert('标签数据导入功能');
  },
  
  analyzeTags: () => {
    console.log('标签使用分析');
    alert('标签分析报告生成中...');
  },
  
  generateReport: () => {
    console.log('生成标签报告');
    alert('标签使用报告已生成！');
  }
};
complete.storyName = '综合应用示例';
complete.parameters = {
  docs: {
    description: {
      story: `
## 综合应用示例

这是一个完整的内容管理标签系统示例，展示了标签组件在复杂业务场景中的综合应用。

### 🏷️ 内容管理标签系统特性

#### 文章标签管理
- **内容标记**: 为文章添加相关的技术标签、分类标签
- **动态管理**: 支持添加、删除文章标签
- **可视化展示**: 不同颜色和样式的标签区分不同含义
- **关联推荐**: 根据标签内容推荐相关文章

#### 标签库管理
- **分类管理**: 技术分类、内容类型、难度等级等分类管理
- **动态添加**: 支持向不同分类添加新标签
- **权限控制**: 不同类型标签的不同操作权限
- **统一维护**: 集中管理所有标签，避免重复和冗余

#### 智能筛选系统
- **多维筛选**: 支持技术栈、内容分类、状态等多维度筛选
- **实时反馈**: 实时显示筛选结果统计
- **筛选保存**: 支持保存常用筛选条件
- **组合筛选**: 多个筛选条件的逻辑组合

### 🎯 业务场景应用

#### 内容管理平台
- **博客系统**: 文章的分类、标记和推荐
- **知识库**: 知识点的分类和关联管理
- **文档系统**: 文档的标签化组织和检索
- **媒体库**: 图片、视频等媒体资源的标签管理

#### 电商平台
- **商品标签**: 商品的特性、分类、促销标签
- **用户画像**: 用户兴趣、行为标签
- **营销活动**: 活动标签和目标用户筛选
- **库存管理**: 商品属性和状态标签

#### 项目管理
- **任务标签**: 任务的优先级、状态、类型标签
- **团队管理**: 成员技能、角色标签
- **资源标签**: 项目资源的分类和标记
- **里程碑**: 项目阶段和进度标签

### 🎨 界面设计特色

#### 分区布局
- **内容区域**: 主要内容展示，标签作为辅助信息
- **管理区域**: 标签库和管理工具的集中区域
- **筛选区域**: 筛选条件的分组展示
- **统计区域**: 标签使用情况的数据展示

#### 交互设计
- **拖拽支持**: 支持标签的拖拽添加和移除
- **快捷操作**: 提供快速添加、批量操作功能
- **实时预览**: 操作过程中的实时效果预览
- **状态反馈**: 操作结果的及时反馈

### 🔧 技术实现要点

#### 数据结构设计
\`\`\`typescript
interface TagSystem {
  categories: {
    [key: string]: {
      name: string;
      tags: HyTagDatas[];
      color: string;
      permissions: string[];
    }
  };
  filters: {
    active: string[];
    history: FilterHistory[];
  };
  statistics: {
    totalTags: number;
    usage: TagUsage[];
    popular: string[];
  };
}
\`\`\`

#### 筛选算法
\`\`\`typescript
// 多维度筛选算法
filterContent(content: Content[], filters: FilterCondition[]): Content[] {
  return content.filter(item => {
    return filters.every(filter => {
      if (filter.type === 'tags') {
        return filter.values.some(value => 
          item.tags.includes(value)
        );
      }
      return true;
    });
  });
}
\`\`\`

#### 标签推荐
\`\`\`typescript
// 基于内容的标签推荐
recommendTags(content: string, existingTags: string[]): string[] {
  const keywords = this.extractKeywords(content);
  const candidates = this.findSimilarTags(keywords);
  return candidates.filter(tag => !existingTags.includes(tag));
}
\`\`\`

### 📊 数据分析功能

#### 标签使用统计
- **使用频率**: 各标签的使用频率统计
- **热门标签**: 最受欢迎的标签排行
- **标签趋势**: 标签使用量的时间趋势
- **关联分析**: 经常一起使用的标签组合

#### 用户行为分析
- **兴趣偏好**: 用户选择标签的偏好分析
- **浏览习惯**: 基于标签的内容浏览模式
- **搜索行为**: 标签筛选的使用情况
- **互动模式**: 用户与标签系统的交互模式

### 💡 扩展应用场景

1. **社交媒体平台**: 话题标签、用户兴趣、内容分类
2. **在线教育平台**: 课程标签、技能标签、学习路径
3. **企业知识管理**: 文档分类、专业领域、项目标签
4. **电商平台**: 商品属性、用户画像、营销标签
5. **内容创作平台**: 创作类型、风格标签、受众定位

### 🎯 用户体验优化

#### 操作便利性
- **智能建议**: 基于内容自动推荐相关标签
- **快速输入**: 支持快捷键和自动完成
- **批量操作**: 高效的批量标签管理功能
- **历史记录**: 标签使用历史和快速重用

#### 信息组织
- **层次结构**: 标签的分类和层级组织
- **视觉区分**: 不同类型标签的颜色和样式区分
- **搜索定位**: 快速找到目标标签的搜索功能
- **关联展示**: 相关标签的智能关联展示

这个示例展示了如何构建企业级的标签管理系统，既满足了复杂的业务需求，又提供了优秀的用户体验。标签不仅仅是简单的标记工具，而是整个内容管理和用户体验的重要组成部分。
`
    }
  }
};

