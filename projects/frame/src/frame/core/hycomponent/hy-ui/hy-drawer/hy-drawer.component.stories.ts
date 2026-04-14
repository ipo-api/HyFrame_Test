import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../base/base.module';
import { HyDrawerComponent } from './hy-drawer.component';
import { unit } from '../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HyDrawerOptions, ModelService, TableService, $hyapi } from '../../../_index';
import { FormsModule } from '@angular/forms';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

const argTypes = unit.createArgTypes('HyDrawerComponent');
export default {
  title: '基础组件/hy-drawer（抽屉）',
  component: HyDrawerComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, ModelService, NzDrawerService]
    }),
  ],
  argTypes
} as Meta;

// 基础用法
const BasicTemplate: Story<HyDrawerComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础抽屉功能</h3>
      <p>最简单的抽屉使用方式，从右侧滑出显示内容</p>
      
      <hy-form>
        <hy-gt model="basicDemo">
          <hy-button 
            title="打开基础抽屉" 
            nzType="primary"
            (onClick)="openBasicDrawer(basicDrawer)">
          </hy-button>
        </hy-gt>
      </hy-form>

      <hy-drawer #basicDrawer title="基础抽屉" width="50%">
        <ng-template>
          <div style="padding: 20px;">
            <h4>抽屉内容区域</h4>
            <p>这是一个基础的抽屉示例，展示了抽屉的基本功能。</p>
            <ul>
              <li>支持从右侧滑出显示</li>
              <li>可自定义宽度和标题</li>
              <li>支持遮罩和点击遮罩关闭</li>
              <li>提供关闭按钮</li>
            </ul>
          </div>
        </ng-template>
      </hy-drawer>
    </div>
  `
});

export const basic = BasicTemplate.bind({});
basic.args = {
  openBasicDrawer: (drawer: HyDrawerComponent) => {
    drawer.open();
  }
};
basic.storyName = '基础用法';
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

最简单的抽屉组件使用方式，提供从屏幕右侧滑出的面板功能。

### 特性
- 从右侧滑出的面板，不会打断用户的工作流程
- 支持自定义标题和宽度
- 内置动画效果，提供流畅的用户体验
- 支持遮罩层，点击遮罩可关闭抽屉
- 可以通过关闭按钮或ESC键关闭

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| title | 抽屉标题 | string \\| TemplateRef<any> | - |
| width | 抽屉宽度 | string \\| number | '800px' |
| closable | 是否显示关闭按钮 | boolean | false |
| mask | 是否显示遮罩 | boolean | true |
| maskClosable | 点击遮罩是否关闭 | boolean | true |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="demo">
    <hy-button 
      title="打开抽屉" 
      nzType="primary"
      (onClick)="openDrawer(drawer)">
    </hy-button>
  </hy-gt>
</hy-form>

<hy-drawer #drawer title="基础抽屉" width="50%">
  <ng-template>
    <div style="padding: 20px;">
      <h4>抽屉内容</h4>
      <p>这里是抽屉的内容区域</p>
    </div>
  </ng-template>
</hy-drawer>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';
import { HyDrawerComponent } from '@hy/frame';

@Component({
  selector: 'app-drawer-demo',
  templateUrl: './drawer-demo.component.html'
})
export class DrawerDemoComponent {
  // 基础打开方法
  openDrawer(drawer: HyDrawerComponent) {
    drawer.open();
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "应用场景",
      template: previewTemplate`
// 1. 用户信息查看
openUserInfo(drawer: HyDrawerComponent, userId: string) {
  // 可以在打开前加载数据
  this.loadUserInfo(userId).then(() => {
    drawer.open();
  });
}

// 2. 快速操作面板
openQuickActions(drawer: HyDrawerComponent) {
  drawer.open();
}

// 3. 帮助文档显示
openHelpDoc(drawer: HyDrawerComponent) {
  drawer.open();
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 配置选项
const ConfigurationTemplate: Story<HyDrawerComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>自定义配置抽屉</h4>
        <p>通过 HyDrawerOptions 配置各种属性</p>
        <hy-form>
          <hy-gt model="configDemo" labelWidth="140px">
            <hy-button 
              title="自定义标题和宽度" 
              nzType="primary"
              (onClick)="openCustomDrawer(customDrawer)">
            </hy-button>
            <hy-button 
              title="无遮罩抽屉" 
              nzType="primary"
              (onClick)="openNoMaskDrawer(noMaskDrawer)">
            </hy-button>
            <hy-button 
              title="固定宽度抽屉" 
              nzType="primary"
              (onClick)="openFixedDrawer(fixedDrawer)">
            </hy-button>
          </hy-gt>
        </hy-form>

        <hy-drawer #customDrawer>
          <ng-template>
            <div style="padding: 20px;">
              <h4>自定义配置抽屉</h4>
              <p>这个抽屉通过传入配置选项进行自定义设置。</p>
              <ul>
                <li>标题：通过选项动态设置</li>
                <li>宽度：60% 宽度</li>
                <li>显示关闭按钮</li>
                <li>允许点击遮罩关闭</li>
              </ul>
            </div>
          </ng-template>
        </hy-drawer>

        <hy-drawer #noMaskDrawer>
          <ng-template>
            <div style="padding: 20px;">
              <h4>无遮罩抽屉</h4>
              <p>这个抽屉没有背景遮罩，用户可以继续操作页面其他内容。</p>
              <p>适用于工具面板或属性面板等不需要用户专注的辅助信息。</p>
            </div>
          </ng-template>
        </hy-drawer>

        <hy-drawer #fixedDrawer>
          <ng-template>
            <div style="padding: 20px;">
              <h4>固定宽度抽屉</h4>
              <p>使用固定的像素宽度（600px），内容宽度固定。</p>
              <p>适合内容宽度确定的场景。</p>
            </div>
          </ng-template>
        </hy-drawer>
      </div>
    </div>
  `
});

export const configuration = ConfigurationTemplate.bind({});
configuration.args = {
  openCustomDrawer: (drawer: HyDrawerComponent) => {
    const options: HyDrawerOptions = {
      title: '自定义标题',
      width: '60%',
      closable: true,
      maskClosable: true
    };
    drawer.open(options);
  },
  openNoMaskDrawer: (drawer: HyDrawerComponent) => {
    const options: HyDrawerOptions = {
      title: '无遮罩抽屉',
      width: '400px',
      mask: false,
      closable: true
    };
    drawer.open(options);
  },
  openFixedDrawer: (drawer: HyDrawerComponent) => {
    const options: HyDrawerOptions = {
      title: '固定宽度抽屉',
      width: 600,
      closable: true,
      maskClosable: false
    };
    drawer.open(options);
  }
};
configuration.storyName = '配置选项';
configuration.parameters = {
  docs: {
    description: {
      story: `
## 配置选项

通过 \`HyDrawerOptions\` 接口配置抽屉的各种属性，满足不同使用场景的需求。

### 🎛️ 支持的配置选项

#### 基础配置
- **title**: 设置抽屉标题，支持字符串和模板
- **width**: 设置抽屉宽度，支持像素值、百分比
- **closable**: 控制是否显示右上角关闭按钮

#### 交互配置
- **mask**: 控制是否显示背景遮罩
- **maskClosable**: 控制点击遮罩是否关闭抽屉

#### 回调配置
- **afterCloseCallback**: 抽屉完全关闭后的回调
- **onClickClose**: 用户点击关闭时的回调

### 🔧 宽度配置说明

| 类型 | 示例 | 说明 |
|------|------|------|
| 百分比 | '50%', '60%' | 相对于视窗宽度 |
| 像素值 | 600, '800px' | 固定像素宽度 |
| 字符串 | '400px' | 带单位的字符串 |

### 📋 HyDrawerOptions 接口
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 抽屉标题 | any | - |
| width | 抽屉宽度 | any | 继承组件设置 |
| closable | 显示关闭按钮 | any | 继承组件设置 |
| maskClosable | 点击遮罩关闭 | any | 继承组件设置 |
| mask | 显示遮罩 | any | 继承组件设置 |
| afterCloseCallback | 关闭后回调 | () => any | - |
| onClickClose | 点击关闭回调 | () => any | - |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-drawer #drawer>
  <ng-template>
    <div style="padding: 20px;">
      抽屉内容
    </div>
  </ng-template>
</hy-drawer>

<hy-button 
  title="打开配置抽屉" 
  (onClick)="openConfigDrawer(drawer)">
</hy-button>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';
import { HyDrawerComponent, HyDrawerOptions } from '@hy/frame';

@Component({
  selector: 'app-config-drawer-demo',
  templateUrl: './config-drawer-demo.component.html'
})
export class ConfigDrawerDemoComponent {
  // 带配置选项的打开方法
  openConfigDrawer(drawer: HyDrawerComponent) {
    const options: HyDrawerOptions = {
      title: '自定义标题',
      width: '60%',
      closable: true,
      maskClosable: true,
      mask: true
    };
    drawer.open(options);
  }

  // 无遮罩抽屉
  openNoMaskDrawer(drawer: HyDrawerComponent) {
    const options: HyDrawerOptions = {
      title: '无遮罩抽屉',
      width: '400px',
      mask: false,
      closable: true
    };
    drawer.open(options);
  }

  // 固定宽度抽屉
  openFixedDrawer(drawer: HyDrawerComponent) {
    const options: HyDrawerOptions = {
      title: '固定宽度',
      width: 600,  // 数字会自动转换为像素
      closable: true,
      maskClosable: false
    };
    drawer.open(options);
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "应用场景",
      template: previewTemplate`
// 1. 用户详情面板 - 宽度适中，可关闭
openUserDetail(drawer: HyDrawerComponent, user: any) {
  const options: HyDrawerOptions = {
    title: \`用户详情 - \${user.name}\`,
    width: '600px',
    closable: true,
    maskClosable: true
  };
  drawer.open(options);
}

// 2. 工具面板 - 无遮罩，不干扰主页面操作
openToolPanel(drawer: HyDrawerComponent) {
  const options: HyDrawerOptions = {
    title: '工具面板',
    width: '300px',
    mask: false,
    closable: true,
    maskClosable: false
  };
  drawer.open(options);
}

// 3. 全屏编辑器 - 大宽度，避免意外关闭
openEditor(drawer: HyDrawerComponent) {
  const options: HyDrawerOptions = {
    title: '代码编辑器',
    width: '90%',
    closable: true,
    maskClosable: false  // 避免误点关闭
  };
  drawer.open(options);
}

// 4. 响应式宽度 - 根据屏幕大小调整
openResponsiveDrawer(drawer: HyDrawerComponent) {
  const screenWidth = window.innerWidth;
  const width = screenWidth < 768 ? '90%' : '60%';
  
  const options: HyDrawerOptions = {
    title: '响应式抽屉',
    width: width,
    closable: true
  };
  drawer.open(options);
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 底部模板
const FooterTemplate: Story<HyDrawerComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>底部操作区域</h4>
        <p>通过 footerTemplate 添加底部操作按钮</p>
        
        <hy-form>
          <hy-gt model="footerDemo" labelWidth="120px">
            <hy-button 
              title="表单操作抽屉" 
              nzType="primary"
              (onClick)="openFormDrawer(formDrawer)">
            </hy-button>
            <hy-button 
              title="确认操作抽屉" 
              nzType="primary"
              (onClick)="openConfirmDrawer(confirmDrawer)">
            </hy-button>
          </hy-gt>
        </hy-form>

        <!-- 表单抽屉 -->
        <hy-drawer #formDrawer [footerTemplate]="formFooter">
          <ng-template>
            <div style="padding: 20px;">
              <h4>用户信息编辑</h4>
              <hy-form>
                <hy-gt model="userForm">
                  <hy-text title="用户名" model="username"></hy-text>
                  <hy-text title="邮箱" model="email"></hy-text>
                  <hy-text title="手机号" model="phone"></hy-text>
                  <hy-textarea title="备注" model="remark"></hy-textarea>
                </hy-gt>
              </hy-form>
            </div>
          </ng-template>
        </hy-drawer>

        <!-- 表单底部模板 -->
        <ng-template #formFooter>
          <div style="text-align: right; padding: 10px 20px; border-top: 1px solid #f0f0f0;">
            <hy-button 
              title="取消" 
              style="margin-right: 8px;"
              (onClick)="handleCancel()">
            </hy-button>
            <hy-button 
              title="保存" 
              nzType="primary"
              (onClick)="handleSave()">
            </hy-button>
          </div>
        </ng-template>

        <!-- 确认操作抽屉 -->
        <hy-drawer #confirmDrawer [footerTemplate]="confirmFooter">
          <ng-template>
            <div style="padding: 20px;">
              <h4>删除确认</h4>
              <p style="color: #faad14;">⚠️ 确定要删除这些数据吗？删除后无法恢复。</p>
              <ul>
                <li>用户数据 (123 条记录)</li>
                <li>关联文件 (45 个文件)</li>
                <li>历史记录 (89 条记录)</li>
              </ul>
            </div>
          </ng-template>
        </hy-drawer>

        <!-- 确认底部模板 -->
        <ng-template #confirmFooter>
          <div style="text-align: right; padding: 10px 20px; border-top: 1px solid #f0f0f0;">
            <hy-button 
              title="取消" 
              style="margin-right: 8px;"
              (onClick)="handleCancel()">
            </hy-button>
            <hy-button 
              title="确认删除" 
              nzType="primary" 
              nzDanger="true"
              (onClick)="handleConfirm()">
            </hy-button>
          </div>
        </ng-template>
      </div>
    </div>
  `
});

export const footerTemplate = FooterTemplate.bind({});
footerTemplate.args = {
  openFormDrawer: (drawer: HyDrawerComponent) => {
    const options: HyDrawerOptions = {
      title: '表单编辑',
      width: '600px',
      closable: true,
      maskClosable: false
    };
    drawer.open(options);
  },
  openConfirmDrawer: (drawer: HyDrawerComponent) => {
    const options: HyDrawerOptions = {
      title: '确认操作',
      width: '500px',
      closable: true
    };
    drawer.open(options);
  },
  handleSave: () => {
    $hyapi.msg.createTips('success', '保存成功');
  },
  handleCancel: () => {
    $hyapi.msg.createTips('info', '已取消操作');
  },
  handleConfirm: () => {
    $hyapi.msg.confirm('确定要执行此操作吗？', {
      callback: () => {
        $hyapi.msg.createTips('success', '操作已确认');
      },
      cancel: () => {
        $hyapi.msg.createTips('info', '操作已取消');
      }
    });
  }
};
footerTemplate.storyName = '底部模板';
footerTemplate.parameters = {
  docs: {
    description: {
      story: `
## 底部模板

通过 \`footerTemplate\` 属性为抽屉添加底部操作区域，通常用于放置操作按钮。

### 🎯 适用场景

#### 表单操作
- 编辑表单的保存、取消操作
- 数据录入的提交、重置操作
- 表单验证后的确认操作

#### 流程控制
- 审批流程的同意、拒绝操作
- 向导步骤的上一步、下一步操作
- 确认对话框的确定、取消操作

#### 批量操作
- 批量处理的执行、取消操作
- 数据导入的确认、重新选择操作

### 🎨 设计规范

#### 按钮布局
- 采用右对齐布局，符合用户习惯
- 主要操作按钮在右侧，次要操作在左侧
- 按钮间距保持8px，确保点击区域

#### 样式规范
- 添加顶部边框分隔内容区域
- 背景色与内容区域区分
- 内边距保持一致性

### 📋 模板配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| footerTemplate | 底部模板引用 | TemplateRef<void> | - |

### 💡 最佳实践
- 主要操作使用 \`nzType="primary"\`
- 危险操作使用 \`nzDanger="true"\`
- 按钮文字要简洁明确
- 提供明确的操作反馈
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-drawer #drawer [footerTemplate]="footerTemplate">
  <ng-template>
    <div style="padding: 20px;">
      <!-- 抽屉内容 -->
      <h4>表单内容</h4>
      <hy-form>
        <hy-gt model="formData">
          <hy-text title="用户名" model="username"></hy-text>
          <hy-text title="邮箱" model="email"></hy-text>
        </hy-gt>
      </hy-form>
    </div>
  </ng-template>
</hy-drawer>

<!-- 底部模板定义 -->
<ng-template #footerTemplate>
  <div style="text-align: right; padding: 10px 20px; border-top: 1px solid #f0f0f0;">
    <hy-button 
      title="取消" 
      style="margin-right: 8px;"
      (onClick)="handleCancel()">
    </hy-button>
    <hy-button 
      title="保存" 
      nzType="primary"
      (onClick)="handleSave()">
    </hy-button>
  </div>
</ng-template>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';
import { HyDrawerComponent, HyDrawerOptions, $hyapi } from '@hy/frame';

@Component({
  selector: 'app-footer-drawer-demo',
  templateUrl: './footer-drawer-demo.component.html'
})
export class FooterDrawerDemoComponent {
  // 打开抽屉
  openDrawer(drawer: HyDrawerComponent) {
    const options: HyDrawerOptions = {
      title: '编辑表单',
      width: '600px',
      closable: true,
      maskClosable: false
    };
    drawer.open(options);
  }

  // 保存操作
  handleSave() {
    // 执行保存逻辑
    this.saveFormData().then(() => {
      $hyapi.msg.createTips('success', '保存成功');
      // 可以选择关闭抽屉
      // drawer.close();
    }).catch(() => {
      $hyapi.msg.createTips('error', '保存失败');
    });
  }

  // 取消操作
  handleCancel() {
    $hyapi.msg.confirm('确定要取消吗？未保存的更改将丢失。', {
      callback: () => {
        // 用户确认取消，关闭抽屉
        // drawer.close();
      }
    });
  }

  // 确认删除操作
  handleConfirmDelete() {
    $hyapi.msg.confirm('此操作不可恢复，确定要删除吗？', {
      callback: () => {
        this.deleteData().then(() => {
          $hyapi.msg.createTips('success', '删除成功');
        });
      },
      cancel: () => {
        $hyapi.msg.createTips('info', '已取消删除');
      }
    });
  }

  private saveFormData(): Promise<any> {
    // 模拟保存接口
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  private deleteData(): Promise<any> {
    // 模拟删除接口
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "模板技巧",
      template: previewTemplate`
// 1. 动态按钮状态
<ng-template #dynamicFooter>
  <div style="text-align: right; padding: 10px 20px; border-top: 1px solid #f0f0f0;">
    <hy-button 
      title="取消" 
      [disabled]="saving"
      style="margin-right: 8px;"
      (onClick)="handleCancel()">
    </hy-button>
    <hy-button 
      title="保存" 
      nzType="primary"
      [nzLoading]="saving"
      (onClick)="handleSave()">
    </hy-button>
  </div>
</ng-template>

// 2. 条件显示按钮
<ng-template #conditionalFooter>
  <div style="text-align: right; padding: 10px 20px; border-top: 1px solid #f0f0f0;">
    <hy-button 
      *ngIf="!readonly"
      title="取消" 
      style="margin-right: 8px;"
      (onClick)="handleCancel()">
    </hy-button>
    <hy-button 
      *ngIf="!readonly"
      title="保存" 
      nzType="primary"
      (onClick)="handleSave()">
    </hy-button>
    <hy-button 
      *ngIf="readonly"
      title="关闭" 
      nzType="primary"
      (onClick)="handleClose()">
    </hy-button>
  </div>
</ng-template>

// 3. 多按钮组合
<ng-template #multiButtonFooter>
  <div style="display: flex; justify-content: space-between; padding: 10px 20px; border-top: 1px solid #f0f0f0;">
    <!-- 左侧辅助按钮 -->
    <div>
      <hy-button 
        title="重置" 
        (onClick)="handleReset()">
      </hy-button>
    </div>
    
    <!-- 右侧主要按钮 -->
    <div>
      <hy-button 
        title="暂存" 
        style="margin-right: 8px;"
        (onClick)="handleDraft()">
      </hy-button>
      <hy-button 
        title="取消" 
        style="margin-right: 8px;"
        (onClick)="handleCancel()">
      </hy-button>
      <hy-button 
        title="提交" 
        nzType="primary"
        (onClick)="handleSubmit()">
      </hy-button>
    </div>
  </div>
</ng-template>

// 4. 带进度的底部
<ng-template #progressFooter>
  <div style="padding: 10px 20px; border-top: 1px solid #f0f0f0;">
    <!-- 进度显示 -->
    <div *ngIf="processing" style="margin-bottom: 10px;">
      <nz-progress [nzPercent]="progress"></nz-progress>
      <span style="font-size: 12px; color: #666;">{{progressText}}</span>
    </div>
    
    <!-- 按钮区域 -->
    <div style="text-align: right;">
      <hy-button 
        title="取消" 
        [disabled]="processing"
        style="margin-right: 8px;"
        (onClick)="handleCancel()">
      </hy-button>
      <hy-button 
        title="开始处理" 
        nzType="primary"
        [nzLoading]="processing"
        (onClick)="handleProcess()">
      </hy-button>
    </div>
  </div>
</ng-template>
      `,
      language: "html",
      copy: true
    }
  ]
};

// 事件处理
const EventsTemplate: Story<HyDrawerComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>事件监听和处理</h4>
        <p>演示抽屉组件的各种事件监听机制</p>
        
        <hy-form>
          <hy-gt model="eventDemo" labelWidth="140px">
            <hy-button 
              title="打开事件监听抽屉" 
              nzType="primary"
              (onClick)="openEventDrawer(eventDrawer)">
            </hy-button>
            <hy-button 
              title="手动关闭抽屉" 
              nzType="default"
              (onClick)="manualCloseDrawer(eventDrawer)">
            </hy-button>
          </hy-gt>
        </hy-form>

        <!-- 事件日志显示 -->
        <div style="margin-top: 20px; padding: 15px; background: #f6f8fa; border-radius: 4px;">
          <h5>📝 事件日志：</h5>
          <div style="max-height: 150px; overflow-y: auto;">
            <div *ngFor="let log of eventLog" 
                 [style.color]="log.type === 'success' ? '#52c41a' : log.type === 'warning' ? '#faad14' : '#666'"
                 style="font-size: 12px; font-family: monospace; margin: 2px 0;">
              [{{log.timestamp}}] {{log.message}}
            </div>
            <div *ngIf="eventLog.length === 0" style="color: #999; font-size: 14px; text-align: center; padding: 20px;">
              暂无事件日志
            </div>
          </div>
        </div>

        <!-- 事件监听抽屉 -->
        <hy-drawer #eventDrawer 
                   (afterCloseCallback)="addLog('组件属性监听：抽屉关闭完成', 'success')"
                   (onClickClose)="addLog('组件属性监听：用户点击关闭', 'warning')">
          <ng-template>
            <div style="padding: 20px;">
              <h4>事件监听演示</h4>
              <p>这个抽屉演示了各种事件的监听方式。</p>
              <ul>
                <li><strong>afterCloseCallback</strong>：抽屉完全关闭后触发</li>
                <li><strong>onClickClose</strong>：用户点击关闭按钮时触发</li>
              </ul>
              <p>可以通过组件属性或配置选项两种方式监听事件。</p>
              
              <div style="background: #e6f7ff; padding: 15px; border-radius: 4px; margin-top: 15px;">
                <h5>💡 事件监听方式：</h5>
                <ul>
                  <li><strong>组件属性</strong>：在模板中直接绑定事件</li>
                  <li><strong>配置选项</strong>：在 open() 方法中传入回调函数</li>
                </ul>
              </div>
            </div>
          </ng-template>
        </hy-drawer>
      </div>
    </div>
  `
});

export const events = EventsTemplate.bind({});
events.args = {
  eventLog: [],
  addLog: function(message: string, type: string = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift({ timestamp, message, type });
    if (this.eventLog.length > 8) {
      this.eventLog.pop();
    }
  },
  openEventDrawer: function(drawer: HyDrawerComponent) {
    const options: HyDrawerOptions = {
      title: '事件监听抽屉',
      width: '500px',
      closable: true,
      afterCloseCallback: () => {
        this.addLog('抽屉已完全关闭 (afterCloseCallback)', 'success');
      },
      onClickClose: () => {
        this.addLog('用户点击关闭按钮 (onClickClose)', 'warning');
      }
    };
    
    this.addLog('抽屉即将打开', 'info');
    drawer.open(options);
    this.addLog('抽屉打开方法已调用', 'info');
  },
  manualCloseDrawer: function(drawer: HyDrawerComponent) {
    this.addLog('程序调用关闭方法', 'info');
    drawer.close();
  }
};
events.storyName = '事件处理';
events.parameters = {
  docs: {
    description: {
      story: `
## 事件处理

抽屉组件提供完善的事件监听机制，支持关闭前确认、关闭后清理等复杂业务逻辑。

### 🎯 事件类型

#### afterCloseCallback
- **触发时机**：抽屉完全关闭后（动画结束）
- **用途**：数据清理、状态重置、页面刷新等
- **特点**：确保抽屉完全关闭，适合执行后续操作

#### onClickClose  
- **触发时机**：用户点击关闭按钮或遮罩时
- **用途**：关闭前确认、数据保存提醒等
- **特点**：可以阻止关闭，进行用户交互

### 🔧 监听方式

#### 1. 组件属性绑定
直接在模板中绑定事件，适合简单的事件处理：
\`\`\`html
<hy-drawer 
  (afterCloseCallback)="handleAfterClose()"
  (onClickClose)="handleClickClose()">
</hy-drawer>
\`\`\`

#### 2. 配置选项传入
在 \`open()\` 方法中传入回调，适合动态事件处理：
\`\`\`typescript
const options: HyDrawerOptions = {
  afterCloseCallback: () => this.cleanup(),
  onClickClose: () => this.confirmClose()
};
drawer.open(options);
\`\`\`

### 📋 事件对比
| 特性 | afterCloseCallback | onClickClose |
|------|-------------------|--------------|
| 触发时机 | 关闭完成后 | 关闭开始时 |
| 可阻止关闭 | ❌ | ❌ |
| 适用场景 | 后续处理 | 关闭确认 |
| 执行频率 | 每次关闭一次 | 每次点击一次 |

### 💡 最佳实践
- 使用 \`afterCloseCallback\` 进行数据清理
- 使用 \`onClickClose\` 进行关闭确认
- 避免在事件中执行耗时操作
- 合理处理异步操作的异常情况
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-drawer #drawer 
           (afterCloseCallback)="handleAfterClose()"
           (onClickClose)="handleClickClose()">
  <ng-template>
    <div style="padding: 20px;">
      抽屉内容
    </div>
  </ng-template>
</hy-drawer>

<hy-button 
  title="打开抽屉" 
  (onClick)="openDrawer(drawer)">
</hy-button>

<!-- 事件日志显示 -->
<div style="margin-top: 20px;">
  <h5>事件日志：</h5>
  <div *ngFor="let log of eventLog">
    [{{log.timestamp}}] {{log.message}}
  </div>
</div>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';
import { HyDrawerComponent, HyDrawerOptions } from '@hy/frame';

@Component({
  selector: 'app-events-drawer-demo',
  templateUrl: './events-drawer-demo.component.html'
})
export class EventsDrawerDemoComponent {
  eventLog: any[] = [];

  // 添加日志
  addLog(message: string, type: string = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift({ timestamp, message, type });
    if (this.eventLog.length > 10) {
      this.eventLog.pop();
    }
  }

  // 打开抽屉（通过配置选项监听事件）
  openDrawer(drawer: HyDrawerComponent) {
    const options: HyDrawerOptions = {
      title: '事件监听抽屉',
      width: '500px',
      closable: true,
      
      // 关闭后回调
      afterCloseCallback: () => {
        this.addLog('抽屉已完全关闭（配置选项）', 'success');
        this.performCleanup();
      },
      
      // 点击关闭回调
      onClickClose: () => {
        this.addLog('用户点击关闭（配置选项）', 'warning');
        return this.confirmClose();
      }
    };
    
    this.addLog('抽屉即将打开');
    drawer.open(options);
    this.addLog('抽屉打开方法已调用');
  }

  // 通过组件属性监听事件
  handleAfterClose() {
    this.addLog('组件属性监听：抽屉已关闭', 'success');
  }

  handleClickClose() {
    this.addLog('组件属性监听：用户点击关闭', 'warning');
  }

  // 手动关闭抽屉
  manualCloseDrawer(drawer: HyDrawerComponent) {
    this.addLog('程序调用关闭方法');
    drawer.close();
  }

  // 关闭确认
  private confirmClose(): boolean {
    // 可以在这里添加确认逻辑
    // 返回 false 可以阻止关闭（但当前版本可能不支持）
    return true;
  }

  // 清理操作
  private performCleanup() {
    // 清理数据、重置状态等
    console.log('执行清理操作');
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "应用场景",
      template: previewTemplate`
// 1. 表单编辑 - 关闭前确认未保存更改
openFormDrawer(drawer: HyDrawerComponent) {
  const options: HyDrawerOptions = {
    title: '编辑用户信息',
    width: '600px',
    closable: true,
    
    onClickClose: () => {
      if (this.formChanged && !this.formSaved) {
        $hyapi.msg.confirm('有未保存的更改，确定要关闭吗？', {
          callback: () => {
            drawer.close(); // 用户确认后手动关闭
          }
        });
        return false; // 阻止自动关闭
      }
      return true; // 允许关闭
    },
    
    afterCloseCallback: () => {
      // 重置表单状态
      this.resetForm();
      this.formChanged = false;
      this.formSaved = false;
    }
  };
  
  drawer.open(options);
}

// 2. 数据加载 - 关闭后清理数据
openDataDrawer(drawer: HyDrawerComponent, dataId: string) {
  // 开始加载数据
  this.loadData(dataId);
  
  const options: HyDrawerOptions = {
    title: '数据详情',
    width: '800px',
    closable: true,
    
    afterCloseCallback: () => {
      // 清理已加载的数据
      this.clearLoadedData();
      this.cancelPendingRequests();
      this.resetViewState();
    }
  };
  
  drawer.open(options);
}

// 3. 文件上传 - 关闭前检查上传状态
openUploadDrawer(drawer: HyDrawerComponent) {
  const options: HyDrawerOptions = {
    title: '文件上传',
    width: '600px',
    closable: true,
    
    onClickClose: () => {
      if (this.uploading) {
        $hyapi.msg.confirm('文件正在上传中，确定要关闭吗？', {
          callback: () => {
            this.cancelUpload();
            drawer.close();
          }
        });
        return false;
      }
      return true;
    },
    
    afterCloseCallback: () => {
      // 清理上传相关状态
      this.clearUploadState();
    }
  };
  
  drawer.open(options);
}

// 4. 实时数据 - 关闭后停止数据订阅
openRealtimeDrawer(drawer: HyDrawerComponent) {
  const options: HyDrawerOptions = {
    title: '实时监控',
    width: '900px',
    closable: true,
    
    afterCloseCallback: () => {
      // 停止实时数据订阅
      this.stopRealtimeSubscription();
      this.clearRealtimeData();
    }
  };
  
  // 开始实时数据订阅
  this.startRealtimeSubscription();
  drawer.open(options);
}

// 5. 多步骤流程 - 关闭前保存进度
openWizardDrawer(drawer: HyDrawerComponent) {
  const options: HyDrawerOptions = {
    title: '配置向导',
    width: '700px',
    closable: true,
    
    onClickClose: () => {
      if (this.wizardStep > 1) {
        $hyapi.msg.confirm('当前进度将被保存，确定要退出吗？', {
          callback: () => {
            this.saveWizardProgress();
            drawer.close();
          }
        });
        return false;
      }
      return true;
    },
    
    afterCloseCallback: () => {
      // 清理向导状态（如果没有保存）
      if (!this.progressSaved) {
        this.resetWizardState();
      }
    }
  };
  
  drawer.open(options);
}

// 6. 错误处理 - 异常情况下的事件处理
openWithErrorHandling(drawer: HyDrawerComponent) {
  const options: HyDrawerOptions = {
    title: '错误处理示例',
    width: '600px',
    closable: true,
    
    afterCloseCallback: () => {
      try {
        // 可能出错的清理操作
        this.performCleanup();
      } catch (error) {
        console.error('清理操作失败:', error);
        // 不影响用户体验，静默处理错误
      }
    },
    
    onClickClose: () => {
      try {
        // 可能出错的关闭前检查
        return this.performPreCloseCheck();
      } catch (error) {
        console.error('关闭前检查失败:', error);
        // 出错时允许关闭
        return true;
      }
    }
  };
  
  drawer.open(options);
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 高级用法
const AdvancedTemplate: Story<HyDrawerComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>高级使用场景</h4>
        <p>演示抽屉在复杂业务场景中的高级用法</p>
        
        <hy-form>
          <hy-gt model="advancedDemo" labelWidth="120px">
            <hy-button 
              title="嵌套抽屉" 
              nzType="primary"
              (onClick)="openNestedDrawer(nestedDrawer)">
            </hy-button>
            <hy-button 
              title="全屏抽屉" 
              nzType="primary"
              (onClick)="openFullScreenDrawer(fullScreenDrawer)">
            </hy-button>
            <hy-button 
              title="响应式抽屉" 
              nzType="primary"
              (onClick)="openResponsiveDrawer(responsiveDrawer)">
            </hy-button>
          </hy-gt>
        </hy-form>

        <!-- 嵌套抽屉 -->
        <hy-drawer #nestedDrawer>
          <ng-template>
            <div style="padding: 20px;">
              <h4>外层抽屉</h4>
              <p>这是外层抽屉的内容，可以在这里打开内层抽屉。</p>
              
              <hy-button 
                title="打开内层抽屉" 
                nzType="primary"
                (onClick)="openInnerDrawer(innerDrawer)">
              </hy-button>
              
              <div style="background: #e6f7ff; padding: 15px; border-radius: 4px; margin-top: 15px;">
                <h5>📋 嵌套抽屉说明：</h5>
                <ul>
                  <li>内层抽屉会覆盖在外层抽屉之上</li>
                  <li>关闭内层抽屉后回到外层抽屉</li>
                  <li>适用于多级详情查看场景</li>
                  <li>建议嵌套层级不超过2层</li>
                </ul>
              </div>
            </div>
          </ng-template>
        </hy-drawer>

        <!-- 内层抽屉 -->
        <hy-drawer #innerDrawer>
          <ng-template>
            <div style="padding: 20px;">
              <h4>内层抽屉</h4>
              <p>这是嵌套在外层抽屉内的抽屉。</p>
              <p>内层抽屉的宽度建议小于外层，避免过度嵌套影响用户体验。</p>
            </div>
          </ng-template>
        </hy-drawer>

        <!-- 全屏抽屉 -->
        <hy-drawer #fullScreenDrawer>
          <ng-template>
            <div style="padding: 20px; height: 100vh; overflow-y: auto;">
              <h4>全屏抽屉</h4>
              <p>占满整个屏幕的抽屉，适合复杂的页面内容。</p>
              
              <div style="display: grid; grid-template-columns: 200px 1fr; gap: 20px; margin-top: 20px;">
                <div style="background: #f6f8fa; padding: 15px; border-radius: 4px;">
                  <h5>导航菜单</h5>
                  <ul style="list-style: none; padding: 0;">
                    <li style="padding: 5px 0;"><a href="#">菜单项 1</a></li>
                    <li style="padding: 5px 0;"><a href="#">菜单项 2</a></li>
                    <li style="padding: 5px 0;"><a href="#">菜单项 3</a></li>
                  </ul>
                </div>
                
                <div>
                  <h5>主要内容区域</h5>
                  <p>全屏抽屉提供充足的空间显示复杂内容，适合：</p>
                  <ul>
                    <li>复杂表单页面</li>
                    <li>数据可视化界面</li>
                    <li>文档编辑器</li>
                    <li>图片/视频预览</li>
                  </ul>
                </div>
              </div>
            </div>
          </ng-template>
        </hy-drawer>

        <!-- 响应式抽屉 -->
        <hy-drawer #responsiveDrawer>
          <ng-template>
            <div style="padding: 20px;">
              <h4>响应式抽屉</h4>
              <p>根据当前屏幕尺寸自动调整宽度。</p>
              
              <div style="background: #f0f5ff; padding: 15px; border-radius: 4px; margin: 15px 0;">
                <h5>📱 响应式规则：</h5>
                <ul>
                  <li><strong>移动端 (&lt; 768px)</strong>: 95% 宽度</li>
                  <li><strong>平板端 (768px - 1200px)</strong>: 70% 宽度</li>
                  <li><strong>桌面端 (&gt; 1200px)</strong>: 50% 宽度</li>
                </ul>
              </div>
              
              <p>当前屏幕宽度: <strong>{{screenWidth}}px</strong></p>
              <p>抽屉宽度: <strong>{{drawerWidth}}</strong></p>
            </div>
          </ng-template>
        </hy-drawer>
      </div>
    </div>
  `
});

export const advanced = AdvancedTemplate.bind({});
advanced.args = {
  screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
  drawerWidth: '50%',
  openNestedDrawer: (drawer: HyDrawerComponent) => {
    const options: HyDrawerOptions = {
      title: '嵌套抽屉演示',
      width: '70%',
      closable: true
    };
    drawer.open(options);
  },
  openInnerDrawer: (drawer: HyDrawerComponent) => {
    const options: HyDrawerOptions = {
      title: '内层抽屉',
      width: '50%',
      closable: true
    };
    drawer.open(options);
  },
  openFullScreenDrawer: (drawer: HyDrawerComponent) => {
    const options: HyDrawerOptions = {
      title: '全屏抽屉',
      width: '100%',
      closable: true,
      mask: false
    };
    drawer.open(options);
  },
  openResponsiveDrawer: function(drawer: HyDrawerComponent) {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    let width: string;
    
    if (screenWidth < 768) {
      width = '95%';
    } else if (screenWidth < 1200) {
      width = '70%';
    } else {
      width = '50%';
    }

    this.screenWidth = screenWidth;
    this.drawerWidth = width;

    const options: HyDrawerOptions = {
      title: '响应式抽屉',
      width: width,
      closable: true
    };
    drawer.open(options);
  }
};
advanced.storyName = '高级用法';
advanced.parameters = {
  docs: {
    description: {
      story: `
## 高级用法

展示抽屉组件在复杂业务场景中的高级使用技巧和最佳实践。

### 🏗️ 嵌套抽屉

#### 使用场景
- **主从详情**: 从列表抽屉打开单项详情抽屉
- **分级操作**: 从操作面板打开子操作面板
- **向导流程**: 多步骤流程中的分支操作

#### 设计原则
- 内层抽屉宽度应小于外层抽屉
- 嵌套层级建议不超过2层
- 提供明确的层级视觉反馈
- 确保用户能够理解当前所在层级

### 🖥️ 全屏抽屉

#### 适用场景
- **复杂表单**: 字段众多的编辑页面
- **数据可视化**: 图表、报表的详细展示
- **媒体预览**: 图片、视频的全屏查看
- **文档编辑**: 富文本、代码编辑器

#### 技术要点
- 设置 \`width="100%"\` 实现全屏
- 建议设置 \`mask="false"\` 减少遮罩干扰
- 内容区域需要处理滚动和高度
- 考虑添加内部导航结构

### 📱 响应式抽屉

#### 响应式策略
| 屏幕尺寸 | 宽度设置 | 使用场景 |
|---------|----------|----------|
| < 768px | 90-95% | 移动端，几乎全屏 |
| 768-1200px | 60-70% | 平板端，留出操作空间 |
| > 1200px | 40-50% | 桌面端，保持页面平衡 |

#### 实现方式
\`\`\`typescript
const getResponsiveWidth = () => {
  const width = window.innerWidth;
  if (width < 768) return '95%';
  if (width < 1200) return '70%';
  return '50%';
};
\`\`\`

### 🎯 性能优化

#### 内容懒加载
- 抽屉打开时才加载内容数据
- 使用 \`ng-template\` 延迟渲染
- 大量数据使用虚拟滚动

#### 动画优化
- 避免在动画过程中执行重计算
- 使用 CSS transform 而非改变布局
- 合理设置动画时长

### 💡 最佳实践

#### 用户体验
- 提供清晰的关闭路径
- 重要操作需要确认机制
- 保持抽屉内容的一致性
- 合理使用加载状态

#### 技术实现
- 合理管理组件生命周期
- 及时清理订阅和定时器
- 处理路由变化时的抽屉状态
- 考虑浏览器前进后退行为
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 嵌套抽屉实现 -->
<hy-drawer #outerDrawer>
  <ng-template>
    <div style="padding: 20px;">
      <h4>外层抽屉</h4>
      <hy-button 
        title="打开内层抽屉"
        (onClick)="openInnerDrawer(innerDrawer)">
      </hy-button>
    </div>
  </ng-template>
</hy-drawer>

<hy-drawer #innerDrawer>
  <ng-template>
    <div style="padding: 20px;">
      <h4>内层抽屉</h4>
      <p>嵌套在外层抽屉内的内容</p>
    </div>
  </ng-template>
</hy-drawer>

<!-- 全屏抽屉 -->
<hy-drawer #fullScreenDrawer>
  <ng-template>
    <div style="padding: 20px; height: 100vh; overflow-y: auto;">
      <h4>全屏内容</h4>
      <!-- 复杂的全屏内容 -->
    </div>
  </ng-template>
</hy-drawer>

<!-- 响应式抽屉 -->
<hy-drawer #responsiveDrawer>
  <ng-template>
    <div style="padding: 20px;">
      <h4>响应式内容</h4>
      <p>根据屏幕大小调整布局</p>
    </div>
  </ng-template>
</hy-drawer>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, HostListener } from '@angular/core';
import { HyDrawerComponent, HyDrawerOptions } from '@hy/frame';

@Component({
  selector: 'app-advanced-drawer-demo',
  templateUrl: './advanced-drawer-demo.component.html'
})
export class AdvancedDrawerDemoComponent {
  screenWidth = window.innerWidth;

  // 监听窗口大小变化
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }

  // 嵌套抽屉
  openOuterDrawer(drawer: HyDrawerComponent) {
    const options: HyDrawerOptions = {
      title: '外层抽屉',
      width: '70%',
      closable: true
    };
    drawer.open(options);
  }

  openInnerDrawer(drawer: HyDrawerComponent) {
    const options: HyDrawerOptions = {
      title: '内层抽屉',
      width: '50%', // 比外层小
      closable: true
    };
    drawer.open(options);
  }

  // 全屏抽屉
  openFullScreenDrawer(drawer: HyDrawerComponent) {
    const options: HyDrawerOptions = {
      title: '全屏抽屉',
      width: '100%',
      closable: true,
      mask: false
    };
    drawer.open(options);
  }

  // 响应式抽屉
  openResponsiveDrawer(drawer: HyDrawerComponent) {
    const width = this.getResponsiveWidth();
    
    const options: HyDrawerOptions = {
      title: '响应式抽屉',
      width: width,
      closable: true
    };
    drawer.open(options);
  }

  private getResponsiveWidth(): string {
    if (this.screenWidth < 768) {
      return '95%';
    } else if (this.screenWidth < 1200) {
      return '70%';
    } else {
      return '50%';
    }
  }

  // 动态内容抽屉
  openDynamicDrawer(drawer: HyDrawerComponent, contentType: string) {
    let title: string;
    let width: string;
    
    switch (contentType) {
      case 'form':
        title = '表单编辑';
        width = '600px';
        break;
      case 'chart':
        title = '数据图表';
        width = '80%';
        break;
      case 'media':
        title = '媒体预览';
        width = '100%';
        break;
      default:
        title = '默认抽屉';
        width = '50%';
    }

    const options: HyDrawerOptions = {
      title: title,
      width: width,
      closable: true
    };
    
    drawer.open(options);
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "应用场景",
      template: previewTemplate`
// 1. 电商系统 - 商品管理的嵌套抽屉
openProductList(drawer: HyDrawerComponent) {
  // 外层：商品列表抽屉
  const options: HyDrawerOptions = {
    title: '商品管理',
    width: '80%',
    closable: true
  };
  drawer.open(options);
}

openProductDetail(drawer: HyDrawerComponent, productId: string) {
  // 内层：商品详情抽屉
  const options: HyDrawerOptions = {
    title: '商品详情',
    width: '60%',
    closable: true,
    afterCloseCallback: () => {
      // 关闭后刷新列表
      this.refreshProductList();
    }
  };
  drawer.open(options);
}

// 2. 文档系统 - 全屏编辑器
openDocumentEditor(drawer: HyDrawerComponent, docId: string) {
  const options: HyDrawerOptions = {
    title: '文档编辑器',
    width: '100%',
    closable: true,
    mask: false,
    onClickClose: () => {
      // 关闭前检查是否有未保存更改
      if (this.hasUnsavedChanges) {
        this.showSaveConfirmDialog();
        return false; // 阻止关闭
      }
      return true;
    },
    afterCloseCallback: () => {
      // 停止自动保存
      this.stopAutoSave();
    }
  };
  
  // 开始自动保存
  this.startAutoSave(docId);
  drawer.open(options);
}

// 3. 移动端适配 - 响应式用户中心
openUserCenter(drawer: HyDrawerComponent) {
  const isMobile = this.screenWidth < 768;
  
  const options: HyDrawerOptions = {
    title: '用户中心',
    width: isMobile ? '100%' : '600px',
    closable: true,
    mask: !isMobile, // 移动端无遮罩
    afterCloseCallback: () => {
      // 清理用户数据缓存
      this.clearUserCache();
    }
  };
  
  drawer.open(options);
}

// 4. 数据分析 - 动态图表抽屉
openAnalyticsDrawer(drawer: HyDrawerComponent, chartType: string) {
  let width: string;
  let title: string;
  
  switch (chartType) {
    case 'overview':
      width = '90%';
      title = '数据概览';
      break;
    case 'detail':
      width = '100%';
      title = '详细分析';
      break;
    case 'comparison':
      width = '80%';
      title = '对比分析';
      break;
    default:
      width = '70%';
      title = '数据分析';
  }

  const options: HyDrawerOptions = {
    title: title,
    width: width,
    closable: true,
    afterCloseCallback: () => {
      // 停止数据订阅
      this.stopDataSubscription();
    }
  };
  
  // 开始数据订阅
  this.startDataSubscription(chartType);
  drawer.open(options);
}

// 5. 工作流系统 - 多级审批抽屉
openApprovalFlow(drawer: HyDrawerComponent, workflowId: string) {
  const options: HyDrawerOptions = {
    title: '审批流程',
    width: '75%',
    closable: true,
    maskClosable: false // 防止误操作
  };
  drawer.open(options);
}

openApprovalDetail(drawer: HyDrawerComponent, approvalId: string) {
  const options: HyDrawerOptions = {
    title: '审批详情',
    width: '600px',
    closable: true,
    afterCloseCallback: () => {
      // 刷新上级流程状态
      this.refreshApprovalFlow();
    }
  };
  drawer.open(options);
}

// 6. 图片预览 - 全屏媒体抽屉
openImagePreview(drawer: HyDrawerComponent, images: string[], index: number) {
  const options: HyDrawerOptions = {
    title: \`图片预览 (\${index + 1}/\${images.length})\`,
    width: '100%',
    closable: true,
    mask: true,
    afterCloseCallback: () => {
      // 清理预览状态
      this.clearPreviewState();
    }
  };
  
  // 设置当前预览图片
  this.currentImages = images;
  this.currentImageIndex = index;
  
  drawer.open(options);
}

// 辅助方法
private startAutoSave(docId: string) {
  this.autoSaveTimer = setInterval(() => {
    this.saveDocument(docId);
  }, 10000); // 每10秒自动保存
}

private stopAutoSave() {
  if (this.autoSaveTimer) {
    clearInterval(this.autoSaveTimer);
    this.autoSaveTimer = null;
  }
}

private startDataSubscription(chartType: string) {
  // 启动实时数据订阅
  this.dataSubscription = this.dataService
    .getRealtimeData(chartType)
    .subscribe(data => {
      this.updateChartData(data);
    });
}

private stopDataSubscription() {
  if (this.dataSubscription) {
    this.dataSubscription.unsubscribe();
    this.dataSubscription = null;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

