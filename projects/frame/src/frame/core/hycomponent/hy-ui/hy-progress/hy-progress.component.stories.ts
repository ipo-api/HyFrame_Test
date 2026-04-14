import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../base/base.module';
import { HyProgressComponent } from './hy-progress.component';
import { unit } from '../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

const argTypes = unit.createArgTypes('HyProgressComponent');

export default {
  title: '数据展示/hy-progress（进度条）',
  component: HyProgressComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [ModelService, TableService]
    }),
  ],
  argTypes,
} as Meta;

// 基础用法
const BasicTemplate: Story<HyProgressComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础进度条用法</h3>
      <p>用于展示操作进度，让用户了解当前任务的完成情况</p>
      
      <div class="demo-section">
        <h4>标准进度条</h4>
        <p>最常用的线性进度条</p>
        <div style="margin: 16px 0;">
          <div style="margin-bottom: 8px;">进度：30%</div>
          <hy-progress [percent]="30"></hy-progress>
        </div>
        <div style="margin: 16px 0;">
          <div style="margin-bottom: 8px;">进度：65%</div>
          <hy-progress [percent]="65"></hy-progress>
        </div>
        <div style="margin: 16px 0;">
          <div style="margin-bottom: 8px;">进度：100%</div>
          <hy-progress [percent]="100"></hy-progress>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>动态进度条</h4>
        <p>可以动态调整的进度条</p>
        <div style="margin: 16px 0;">
          <div style="margin-bottom: 12px;">
            <hy-form>
              <hy-button title="开始" (onClick)="startProgress()"></hy-button>
              <hy-button title="暂停" (onClick)="pauseProgress()"></hy-button>
              <hy-button title="重置" (onClick)="resetProgress()"></hy-button>
            </hy-form>
            <span style="margin-left: 16px; color: #666;">当前进度：{{dynamicPercent}}%</span>
          </div>
          <hy-progress [percent]="dynamicPercent"></hy-progress>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>小数进度</h4>
        <p>支持小数点的精确进度显示</p>
        <div style="margin: 16px 0;">
          <hy-progress [percent]="75.5"></hy-progress>
        </div>
        <div style="margin: 16px 0;">
          <hy-progress [percent]="88.88"></hy-progress>
        </div>
      </div>
    </div>
  `
});

export const basic = BasicTemplate.bind({});
basic.args = {
  dynamicPercent: 0,
  progressInterval: null,
  
  startProgress: function() {
    if (this.progressInterval) return;
    
    this.progressInterval = setInterval(() => {
      if (this.dynamicPercent >= 100) {
        this.pauseProgress();
        return;
      }
      this.dynamicPercent += 1;
    }, 100);
  },
  
  pauseProgress: function() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  },
  
  resetProgress: function() {
    this.pauseProgress();
    this.dynamicPercent = 0;
  }
};
basic.storyName = '基础用法';
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

进度条用于展示操作的当前进度，为用户提供直观的完成度反馈。

### 📊 主要特性

#### 进度展示
- 清晰的百分比显示
- 平滑的动画过渡效果
- 支持小数点精度的进度

#### 动态更新
- **实时更新**: 支持进度的实时动态更新
- **平滑过渡**: 进度变化时的平滑动画效果
- **状态控制**: 开始、暂停、重置等状态控制

#### 精确显示
- **小数支持**: 支持小数点的精确进度
- **百分比显示**: 自动计算和显示百分比
- **状态反馈**: 不同进度阶段的视觉反馈

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| percent | 百分比进度 | number | 0 |
| strokeType | 进度条类型 | 'line'\\|'circle'\\|'dashboard' | 'line' |
| strokeColor | 进度条颜色 | string | '#1890ff' |
| format | 自定义文本模板 | TemplateRef | - |

### 💡 使用场景

#### 任务进度
- **文件上传**: 显示文件上传的进度
- **数据处理**: 数据导入导出的进度
- **安装过程**: 软件安装的进度展示

#### 状态指示
- **完成度**: 项目或任务的完成程度
- **加载状态**: 页面或内容的加载进度
- **操作反馈**: 长时间操作的进度反馈
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 基础进度条 -->
<hy-progress [percent]="30"></hy-progress>

<!-- 动态进度条 -->
<div>
  <button (click)="startProgress()">开始</button>
  <button (click)="pauseProgress()">暂停</button>
  <button (click)="resetProgress()">重置</button>
</div>
<hy-progress [percent]="dynamicPercent"></hy-progress>

<!-- 小数进度 -->
<hy-progress [percent]="75.5"></hy-progress>
<hy-progress [percent]="88.88"></hy-progress>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-progress-demo',
  templateUrl: './progress-demo.component.html'
})
export class ProgressDemoComponent implements OnDestroy {
  // 动态进度值
  dynamicPercent = 0;
  progressInterval: any = null;

  // 开始进度
  startProgress() {
    if (this.progressInterval) return;
    
    this.progressInterval = setInterval(() => {
      if (this.dynamicPercent >= 100) {
        this.pauseProgress();
        return;
      }
      this.dynamicPercent += 1;
    }, 100);
  }

  // 暂停进度
  pauseProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  // 重置进度
  resetProgress() {
    this.pauseProgress();
    this.dynamicPercent = 0;
  }

  // 设置指定进度
  setProgress(percent: number) {
    this.pauseProgress();
    this.dynamicPercent = Math.max(0, Math.min(100, percent));
  }

  // 增加进度
  increaseProgress(step: number = 10) {
    this.dynamicPercent = Math.min(100, this.dynamicPercent + step);
  }

  // 减少进度
  decreaseProgress(step: number = 10) {
    this.dynamicPercent = Math.max(0, this.dynamicPercent - step);
  }

  // 获取进度状态
  getProgressStatus(): string {
    if (this.dynamicPercent === 0) return 'not-started';
    if (this.dynamicPercent === 100) return 'completed';
    if (this.progressInterval) return 'in-progress';
    return 'paused';
  }

  // 组件销毁时清理定时器
  ngOnDestroy() {
    this.pauseProgress();
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 进度条样式
const StylesTemplate: Story<HyProgressComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>进度条类型</h4>
        <p>不同类型的进度条样式</p>
        
        <div style="margin: 24px 0;">
          <h5>线性进度条 (line)</h5>
          <hy-progress [percent]="progressValue" strokeType="line"></hy-progress>
        </div>
        
        <div style="margin: 24px 0;">
          <h5>圆形进度条 (circle)</h5>
          <div style="display: inline-block; margin-right: 32px;">
            <hy-progress [percent]="progressValue" strokeType="circle"></hy-progress>
          </div>
          <div style="display: inline-block;">
            <hy-progress [percent]="75" strokeType="circle"></hy-progress>
          </div>
        </div>
        
        <div style="margin: 24px 0;">
          <h5>仪表盘进度条 (dashboard)</h5>
          <div style="display: inline-block; margin-right: 32px;">
            <hy-progress [percent]="progressValue" strokeType="dashboard"></hy-progress>
          </div>
          <div style="display: inline-block;">
            <hy-progress [percent]="85" strokeType="dashboard"></hy-progress>
          </div>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>进度条颜色</h4>
        <p>自定义进度条的颜色</p>
        
        <div style="margin: 16px 0;">
          <div style="margin-bottom: 8px;">默认蓝色</div>
          <hy-progress [percent]="60"></hy-progress>
        </div>
        
        <div style="margin: 16px 0;">
          <div style="margin-bottom: 8px;">成功绿色</div>
          <hy-progress [percent]="60" strokeColor="#52c41a"></hy-progress>
        </div>
        
        <div style="margin: 16px 0;">
          <div style="margin-bottom: 8px;">警告橙色</div>
          <hy-progress [percent]="60" strokeColor="#faad14"></hy-progress>
        </div>
        
        <div style="margin: 16px 0;">
          <div style="margin-bottom: 8px;">错误红色</div>
          <hy-progress [percent]="60" strokeColor="#ff4d4f"></hy-progress>
        </div>
        
        <div style="margin: 16px 0;">
          <div style="margin-bottom: 8px;">自定义紫色</div>
          <hy-progress [percent]="60" strokeColor="#722ed1"></hy-progress>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>不同尺寸的圆形进度条</h4>
        <p>圆形进度条的尺寸变化</p>
        
        <div style="display: flex; align-items: center; gap: 24px;">
          <div style="text-align: center;">
            <div style="margin-bottom: 8px;">小尺寸</div>
            <hy-progress [percent]="75" strokeType="circle" [width]="80"></hy-progress>
          </div>
          <div style="text-align: center;">
            <div style="margin-bottom: 8px;">中尺寸</div>
            <hy-progress [percent]="75" strokeType="circle" [width]="120"></hy-progress>
          </div>
          <div style="text-align: center;">
            <div style="margin-bottom: 8px;">大尺寸</div>
            <hy-progress [percent]="75" strokeType="circle" [width]="160"></hy-progress>
          </div>
        </div>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>进度条控制</h4>
        <p>动态调整当前演示的进度值</p>
        <div style="margin: 16px 0;">
          <hy-form>
            <hy-button title="设为25%" (onClick)="setProgress(25)"></hy-button>
            <hy-button title="设为50%" (onClick)="setProgress(50)"></hy-button>
            <hy-button title="设为75%" (onClick)="setProgress(75)"></hy-button>
            <hy-button title="设为100%" (onClick)="setProgress(100)"></hy-button>
            <hy-button title="随机进度" (onClick)="setRandomProgress()"></hy-button>
          </hy-form>
        </div>
        <div style="margin: 8px 0; color: #666;">当前进度：{{progressValue}}%</div>
      </div>
    </div>
  `
});

export const styles = StylesTemplate.bind({});
styles.args = {
  progressValue: 65,
  
  setProgress: function(value: number) {
    this.progressValue = value;
  },
  
  setRandomProgress: function() {
    this.progressValue = Math.floor(Math.random() * 100);
  }
};
styles.storyName = '进度条样式';
styles.parameters = {
  docs: {
    description: {
      story: `
## 进度条样式

进度条支持多种样式类型和颜色自定义，适应不同的使用场景。

### 🎨 进度条类型

#### 线性进度条 (line)
- **适用场景**: 文件上传、数据处理等线性进度
- **特点**: 水平展示，节省垂直空间
- **优势**: 直观清晰，适合大多数场景

#### 圆形进度条 (circle)
- **适用场景**: 仪表盘、统计数据展示
- **特点**: 圆形展示，视觉聚焦强
- **优势**: 美观精致，适合重点突出

#### 仪表盘进度条 (dashboard)
- **适用场景**: 系统监控、性能指标
- **特点**: 半圆弧形展示
- **优势**: 类似仪表盘，专业感强

### 🌈 颜色系统

#### 语义化颜色
- **蓝色 (#1890ff)**: 默认进度，中性状态
- **绿色 (#52c41a)**: 成功状态，正常进度
- **橙色 (#faad14)**: 警告状态，需要关注
- **红色 (#ff4d4f)**: 错误状态，异常情况
- **紫色 (#722ed1)**: 自定义颜色，特殊用途

#### 动态颜色
根据进度值动态改变颜色：
\`\`\`typescript
getProgressColor(percent: number): string {
  if (percent < 30) return '#ff4d4f';      // 红色：进度较低
  if (percent < 70) return '#faad14';      // 橙色：进度中等
  return '#52c41a';                        // 绿色：进度良好
}
\`\`\`

### 📏 尺寸配置

#### 圆形进度条尺寸
- **小尺寸 (80px)**: 适合卡片、列表项
- **中尺寸 (120px)**: 适合一般展示区域
- **大尺寸 (160px)**: 适合重点突出显示

#### 线性进度条高度
- **细线条**: 适合紧凑布局
- **标准高度**: 平衡美观和功能
- **粗线条**: 适合突出显示

### 样式配置
| 属性 | 说明 | 类型 | 可选值 |
|------|------|------|---------|
| strokeType | 进度条类型 | string | 'line'\\|'circle'\\|'dashboard' |
| strokeColor | 进度条颜色 | string | 任意颜色值 |
| width | 圆形进度条尺寸 | number | 数字像素值 |
| strokeWidth | 进度条粗细 | number | 数字像素值 |

### 💡 设计建议

#### 颜色选择
1. **保持一致性**: 同一系统中使用统一的颜色规范
2. **语义化使用**: 颜色要有明确的含义
3. **对比度考虑**: 确保颜色对比度足够

#### 类型选择
1. **空间考虑**: 根据可用空间选择合适的类型
2. **用户习惯**: 考虑用户的使用习惯和认知
3. **信息层级**: 重要进度使用圆形，次要进度使用线性

#### 动画效果
1. **平滑过渡**: 进度变化时使用平滑动画
2. **合适速度**: 动画速度要符合用户预期
3. **性能考虑**: 避免过于复杂的动画影响性能
`
    }
  }
};

// 自定义文本
const CustomTextTemplate: Story<HyProgressComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>自定义文本显示</h4>
        <p>使用模板自定义进度条显示的文本内容</p>
        
        <div style="margin: 24px 0;">
          <h5>文件上传进度</h5>
          <hy-progress [percent]="uploadPercent" [format]="uploadTemplate"></hy-progress>
          <ng-template #uploadTemplate>
            <div style="display: flex; align-items: center;">
              <hy-icon nzIconName="cloud-upload" style="margin-right: 4px;"></hy-icon>
              上传中... {{uploadPercent}}%
            </div>
          </ng-template>
        </div>
        
        <div style="margin: 24px 0;">
          <h5>数据处理进度</h5>
          <hy-progress [percent]="processPercent" [format]="processTemplate"></hy-progress>
          <ng-template #processTemplate>
            <div style="font-weight: 500;">
              已处理 {{getProcessedCount()}} / {{getTotalCount()}} 条数据
            </div>
          </ng-template>
        </div>
        
        <div style="margin: 24px 0;">
          <h5>时间显示进度</h5>
          <hy-progress [percent]="timePercent" [format]="timeTemplate"></hy-progress>
          <ng-template #timeTemplate>
            <div style="display: flex; flex-direction: column; align-items: center; font-size: 12px;">
              <div style="font-weight: 500;">{{getElapsedTime()}}</div>
              <div style="color: #999;">剩余 {{getRemainingTime()}}</div>
            </div>
          </ng-template>
        </div>
        
        <div style="margin: 24px 0;">
          <h5>圆形进度条自定义文本</h5>
          <div style="display: flex; gap: 32px;">
            <div>
              <hy-progress [percent]="circlePercent1" strokeType="circle" [format]="circleTemplate1"></hy-progress>
              <ng-template #circleTemplate1>
                <div style="text-align: center;">
                  <div style="font-size: 24px; font-weight: bold; color: #1890ff;">{{circlePercent1}}</div>
                  <div style="font-size: 12px; color: #999;">完成度</div>
                </div>
              </ng-template>
            </div>
            
            <div>
              <hy-progress [percent]="circlePercent2" strokeType="circle" [format]="circleTemplate2" strokeColor="#52c41a"></hy-progress>
              <ng-template #circleTemplate2>
                <div style="text-align: center;">
                  <hy-icon nzIconName="check-circle" style="font-size: 32px; color: #52c41a;" *ngIf="circlePercent2 === 100"></hy-icon>
                  <hy-icon nzIconName="loading" style="font-size: 32px; color: #1890ff;" *ngIf="circlePercent2 < 100"></hy-icon>
                  <div style="font-size: 12px; color: #666; margin-top: 4px;">
                    {{circlePercent2 === 100 ? '已完成' : '进行中'}}
                  </div>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
        
        <div style="margin: 24px 0;">
          <h5>动态控制</h5>
          <div style="margin-bottom: 12px;">
            <hy-form>
              <hy-button title="模拟上传" (onClick)="simulateUpload()"></hy-button>
              <hy-button title="模拟处理" (onClick)="simulateProcess()"></hy-button>
              <hy-button title="重置所有" (onClick)="resetAll()"></hy-button>
            </hy-form>
          </div>
        </div>
      </div>
    </div>
  `
});

export const customText = CustomTextTemplate.bind({});
customText.args = {
  uploadPercent: 45,
  processPercent: 32,
  timePercent: 68,
  circlePercent1: 85,
  circlePercent2: 60,
  
  totalCount: 1000,
  startTime: Date.now() - 2 * 60 * 1000, // 2分钟前开始
  
  getProcessedCount: function() {
    return Math.floor((this.totalCount * this.processPercent) / 100);
  },
  
  getTotalCount: function() {
    return this.totalCount;
  },
  
  getElapsedTime: function() {
    const elapsed = Date.now() - this.startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  },
  
  getRemainingTime: function() {
    if (this.timePercent === 0) return '--:--';
    
    const elapsed = Date.now() - this.startTime;
    const estimated = (elapsed / this.timePercent) * 100;
    const remaining = estimated - elapsed;
    
    if (remaining <= 0) return '00:00';
    
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  },
  
  simulateUpload: function() {
    if (this.uploadPercent >= 100) {
      this.uploadPercent = 0;
    }
    
    const interval = setInterval(() => {
      this.uploadPercent += Math.floor(Math.random() * 5) + 1;
      if (this.uploadPercent >= 100) {
        this.uploadPercent = 100;
        clearInterval(interval);
      }
    }, 200);
  },
  
  simulateProcess: function() {
    if (this.processPercent >= 100) {
      this.processPercent = 0;
    }
    
    const interval = setInterval(() => {
      this.processPercent += Math.floor(Math.random() * 3) + 1;
      if (this.processPercent >= 100) {
        this.processPercent = 100;
        clearInterval(interval);
      }
    }, 300);
  },
  
  resetAll: function() {
    this.uploadPercent = 0;
    this.processPercent = 0;
    this.timePercent = 0;
    this.circlePercent1 = 0;
    this.circlePercent2 = 0;
    this.startTime = Date.now();
  }
};
customText.storyName = '自定义文本';
customText.parameters = {
  docs: {
    description: {
      story: `
## 自定义文本

通过模板自定义可以创建丰富的进度条文本显示，满足各种业务需求。

### 📝 文本模板

#### 模板语法
使用Angular模板语法创建自定义文本：
\`\`\`html
<ng-template #customTemplate>
  <div>自定义内容 {{percent}}%</div>
</ng-template>
<hy-progress [percent]="50" [format]="customTemplate"></hy-progress>
\`\`\`

#### 动态内容
模板中可以使用组件的属性和方法：
\`\`\`typescript
// 组件中定义方法
getProcessedCount(): number {
  return Math.floor((this.totalCount * this.percent) / 100);
}
\`\`\`

### 🎯 应用场景

#### 文件上传
- **上传状态**: 显示"上传中..."状态
- **文件信息**: 显示文件名和大小
- **速度显示**: 显示上传速度和剩余时间

#### 数据处理
- **处理数量**: 显示"已处理 X / Y 条数据"
- **处理类型**: 显示当前处理的数据类型
- **错误统计**: 显示处理过程中的错误数量

#### 时间进度
- **耗时显示**: 显示已用时间和剩余时间
- **速度计算**: 根据当前进度计算完成速度
- **时间格式**: 友好的时间格式显示

### 🎨 圆形进度条文本

#### 中心文本
圆形进度条的中心区域可以显示：
- **百分比**: 大字号的百分比显示
- **状态图标**: 根据状态显示不同图标
- **多行信息**: 分层显示不同类型的信息

#### 状态指示
\`\`\`html
<ng-template #statusTemplate>
  <div style="text-align: center;">
    <hy-icon nzIconName="check-circle" *ngIf="percent === 100"></hy-icon>
    <hy-icon nzIconName="loading" *ngIf="percent < 100"></hy-icon>
    <div>{{percent === 100 ? '已完成' : '进行中'}}</div>
  </div>
</ng-template>
\`\`\`

### 💡 设计技巧

#### 信息层次
1. **主要信息**: 使用大字号或醒目颜色
2. **次要信息**: 使用小字号或灰色
3. **状态信息**: 使用图标或颜色区分

#### 动态更新
1. **实时计算**: 根据进度实时计算相关数据
2. **格式化**: 友好的数据格式化显示
3. **状态变化**: 根据进度显示不同的状态

#### 用户体验
1. **信息充分**: 提供用户关心的所有信息
2. **简洁明了**: 避免信息过载
3. **状态清晰**: 明确的状态和预期

### 🔧 高级用法

#### 复杂计算
\`\`\`typescript
// 计算剩余时间
getRemainingTime(): string {
  const elapsed = Date.now() - this.startTime;
  const estimated = (elapsed / this.percent) * 100;
  const remaining = estimated - elapsed;
  
  return this.formatTime(remaining);
}

// 格式化时间显示
formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return \`\${minutes}:\${seconds.toString().padStart(2, '0')}\`;
}
\`\`\`

#### 多状态显示
\`\`\`typescript
// 根据进度显示不同状态
getProgressStatus(): string {
  if (this.percent === 0) return 'waiting';
  if (this.percent === 100) return 'completed';
  if (this.hasError) return 'error';
  return 'processing';
}
\`\`\`

这个功能让进度条不仅仅是一个简单的百分比显示，而是一个丰富的信息展示组件。
`
    }
  }
};

// 综合应用示例
const CompleteTemplate: Story<HyProgressComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>📊 项目管理仪表盘</h3>
      <p>完整的项目进度管理示例，展示进度条在实际业务中的综合应用</p>
      
      <div class="demo-case" style="border: 1px solid #f0f0f0; border-radius: 8px; padding: 24px; background: white;">
        <!-- 项目总览 -->
        <div class="project-overview" style="margin-bottom: 32px;">
          <h4 style="margin: 0 0 16px 0; color: #262626;">📈 项目总体进度</h4>
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; align-items: center;">
            <div>
              <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span style="font-weight: 500;">新一代电商平台</span>
                  <span style="color: #666;">{{projectProgress}}% 完成</span>
                </div>
                <hy-progress [percent]="projectProgress" [format]="projectTemplate" strokeColor="{{getProjectColor()}}"></hy-progress>
                <ng-template #projectTemplate>
                  <div style="display: flex; align-items: center; font-size: 12px;">
                    <hy-icon nzIconName="{{getProjectIcon()}}" style="margin-right: 4px;"></hy-icon>
                    {{getProjectStatus()}} - 预计 {{getProjectDeadline()}} 完成
                  </div>
                </ng-template>
              </div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 13px;">
                <div style="color: #666;">开始时间：{{projectStartDate}}</div>
                <div style="color: #666;">预期结束：{{projectEndDate}}</div>
                <div style="color: #666;">团队成员：{{teamMembers}}人</div>
              </div>
            </div>
            <div style="text-align: center;">
              <hy-progress [percent]="projectProgress" strokeType="circle" [width]="120" 
                           strokeColor="{{getProjectColor()}}" [format]="circleTemplate"></hy-progress>
              <ng-template #circleTemplate>
                <div style="text-align: center;">
                  <div style="font-size: 18px; font-weight: bold; color: {{getProjectColor()}};">{{projectProgress}}%</div>
                  <div style="font-size: 11px; color: #999; margin-top: 2px;">总进度</div>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
        
        <!-- 阶段进度 -->
        <div class="phase-progress" style="margin-bottom: 32px;">
          <h4 style="margin: 0 0 16px 0; color: #262626;">🎯 阶段进度详情</h4>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <!-- 需求分析阶段 -->
            <div class="phase-item" style="padding: 16px; border: 1px solid #f0f0f0; border-radius: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h5 style="margin: 0; color: #595959;">📋 需求分析</h5>
                <span class="phase-status" style="padding: 2px 6px; border-radius: 3px; font-size: 11px; background: #f6ffed; color: #52c41a;">已完成</span>
              </div>
              <hy-progress [percent]="100" strokeColor="#52c41a" [format]="requirementTemplate"></hy-progress>
              <ng-template #requirementTemplate>
                <div style="font-size: 12px; color: #52c41a; font-weight: 500;">
                  ✓ 需求文档已确认，用户故事已完成
                </div>
              </ng-template>
            </div>
            
            <!-- 设计阶段 -->
            <div class="phase-item" style="padding: 16px; border: 1px solid #f0f0f0; border-radius: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h5 style="margin: 0; color: #595959;">🎨 UI/UX设计</h5>
                <span class="phase-status" style="padding: 2px 6px; border-radius: 3px; font-size: 11px; background: #fff7e6; color: #faad14;">进行中</span>
              </div>
              <hy-progress [percent]="designProgress" strokeColor="#faad14" [format]="designTemplate"></hy-progress>
              <ng-template #designTemplate>
                <div style="font-size: 12px; color: #666;">
                  设计稿完成 {{Math.floor(designProgress * 0.8)}} / 25 个页面
                </div>
              </ng-template>
            </div>
            
            <!-- 前端开发 -->
            <div class="phase-item" style="padding: 16px; border: 1px solid #f0f0f0; border-radius: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h5 style="margin: 0; color: #595959;">💻 前端开发</h5>
                <span class="phase-status" style="padding: 2px 6px; border-radius: 3px; font-size: 11px; background: #e6f7ff; color: #1890ff;">开发中</span>
              </div>
              <hy-progress [percent]="frontendProgress" strokeColor="#1890ff" [format]="frontendTemplate"></hy-progress>
              <ng-template #frontendTemplate>
                <div style="font-size: 12px; color: #666;">
                  组件开发 {{Math.floor(frontendProgress * 0.6)}} / 45 个，页面 {{Math.floor(frontendProgress * 0.4)}} / 25 个
                </div>
              </ng-template>
            </div>
            
            <!-- 后端开发 -->
            <div class="phase-item" style="padding: 16px; border: 1px solid #f0f0f0; border-radius: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h5 style="margin: 0; color: #595959;">🔧 后端开发</h5>
                <span class="phase-status" style="padding: 2px 6px; border-radius: 3px; font-size: 11px; background: #e6f7ff; color: #1890ff;">开发中</span>
              </div>
              <hy-progress [percent]="backendProgress" strokeColor="#1890ff" [format]="backendTemplate"></hy-progress>
              <ng-template #backendTemplate>
                <div style="font-size: 12px; color: #666;">
                  API开发 {{Math.floor(backendProgress * 0.7)}} / 32 个，数据库设计 {{backendProgress > 50 ? '已完成' : '设计中'}}
                </div>
              </ng-template>
            </div>
          </div>
        </div>
        
        <!-- 团队效率 -->
        <div class="team-efficiency" style="margin-bottom: 32px;">
          <h4 style="margin: 0 0 16px 0; color: #262626;">👥 团队效率监控</h4>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
            <div style="text-align: center;">
              <hy-progress [percent]="developmentEfficiency" strokeType="circle" [width]="80" 
                           strokeColor="#{{developmentEfficiency >= 80 ? '52c41a' : developmentEfficiency >= 60 ? 'faad14' : 'ff4d4f'}}" 
                           [format]="devEfficiencyTemplate"></hy-progress>
              <ng-template #devEfficiencyTemplate>
                <div style="text-align: center;">
                  <div style="font-size: 14px; font-weight: bold;">{{developmentEfficiency}}%</div>
                </div>
              </ng-template>
              <div style="margin-top: 8px; font-size: 12px; color: #666;">开发效率</div>
            </div>
            
            <div style="text-align: center;">
              <hy-progress [percent]="codeQuality" strokeType="circle" [width]="80" 
                           strokeColor="#{{codeQuality >= 90 ? '52c41a' : codeQuality >= 70 ? 'faad14' : 'ff4d4f'}}" 
                           [format]="qualityTemplate"></hy-progress>
              <ng-template #qualityTemplate>
                <div style="text-align: center;">
                  <div style="font-size: 14px; font-weight: bold;">{{codeQuality}}%</div>
                </div>
              </ng-template>
              <div style="margin-top: 8px; font-size: 12px; color: #666;">代码质量</div>
            </div>
            
            <div style="text-align: center;">
              <hy-progress [percent]="testCoverage" strokeType="circle" [width]="80" 
                           strokeColor="#{{testCoverage >= 80 ? '52c41a' : testCoverage >= 60 ? 'faad14' : 'ff4d4f'}}" 
                           [format]="testTemplate"></hy-progress>
              <ng-template #testTemplate>
                <div style="text-align: center;">
                  <div style="font-size: 14px; font-weight: bold;">{{testCoverage}}%</div>
                </div>
              </ng-template>
              <div style="margin-top: 8px; font-size: 12px; color: #666;">测试覆盖</div>
            </div>
            
            <div style="text-align: center;">
              <hy-progress [percent]="teamSatisfaction" strokeType="circle" [width]="80" 
                           strokeColor="#{{teamSatisfaction >= 80 ? '52c41a' : teamSatisfaction >= 60 ? 'faad14' : 'ff4d4f'}}" 
                           [format]="satisfactionTemplate"></hy-progress>
              <ng-template #satisfactionTemplate>
                <div style="text-align: center;">
                  <div style="font-size: 14px; font-weight: bold;">{{teamSatisfaction}}%</div>
                </div>
              </ng-template>
              <div style="margin-top: 8px; font-size: 12px; color: #666;">团队满意度</div>
            </div>
          </div>
        </div>
        
        <!-- 实时任务 -->
        <div class="realtime-tasks" style="margin-bottom: 24px;">
          <h4 style="margin: 0 0 16px 0; color: #262626;">⚡ 实时任务进度</h4>
          <div style="display: grid; gap: 12px;">
            <div style="padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px; background: #fafafa;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 13px; font-weight: 500;">🚀 部署到测试环境</span>
                <span style="font-size: 12px; color: #666;">{{deployProgress}}% | ETA 5分钟</span>
              </div>
              <hy-progress [percent]="deployProgress" strokeColor="#722ed1" [format]="deployTemplate"></hy-progress>
              <ng-template #deployTemplate>
                <div style="font-size: 11px; color: #666;">
                  {{getDeployStatus()}} - Docker镜像构建和容器部署
                </div>
              </ng-template>
            </div>
            
            <div style="padding: 12px; border: 1px solid #f0f0f0; border-radius: 6px; background: #fafafa;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 13px; font-weight: 500;">🧪 自动化测试执行</span>
                <span style="font-size: 12px; color: #666;">{{testProgress}}% | 执行中</span>
              </div>
              <hy-progress [percent]="testProgress" strokeColor="#13c2c2" [format]="testExecutionTemplate"></hy-progress>
              <ng-template #testExecutionTemplate>
                <div style="font-size: 11px; color: #666;">
                  单元测试 {{Math.floor(testProgress * 0.6)}} / 156 个，集成测试 {{Math.floor(testProgress * 0.4)}} / 23 个
                </div>
              </ng-template>
            </div>
          </div>
        </div>
        
        <!-- 控制面板 -->
        <div class="control-panel" style="padding-top: 16px; border-top: 1px solid #f0f0f0;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <hy-form>
              <hy-button title="刷新数据" (onClick)="refreshData()"></hy-button>
              <hy-button title="生成报告" (onClick)="generateReport()"></hy-button>
              <hy-button title="设置提醒" (onClick)="setReminder()"></hy-button>
            </hy-form>
            <div style="font-size: 12px; color: #999;">
              最后更新：{{lastUpdateTime}} | 下次刷新：{{nextRefreshTime}}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

export const complete = CompleteTemplate.bind({});
complete.args = {
  // 项目总体数据
  projectProgress: 68,
  projectStartDate: '2024-01-15',
  projectEndDate: '2024-04-30',
  teamMembers: 12,
  
  // 阶段进度
  designProgress: 85,
  frontendProgress: 72,
  backendProgress: 58,
  
  // 团队效率指标
  developmentEfficiency: 78,
  codeQuality: 92,
  testCoverage: 65,
  teamSatisfaction: 86,
  
  // 实时任务
  deployProgress: 45,
  testProgress: 73,
  
  // 时间信息
  lastUpdateTime: '14:32:15',
  nextRefreshTime: '14:33:15',
  
  // 获取项目颜色
  getProjectColor: function() {
    if (this.projectProgress >= 80) return '#52c41a';
    if (this.projectProgress >= 60) return '#1890ff';
    if (this.projectProgress >= 40) return '#faad14';
    return '#ff4d4f';
  },
  
  // 获取项目图标
  getProjectIcon: function() {
    if (this.projectProgress >= 80) return 'check-circle';
    if (this.projectProgress >= 60) return 'clock-circle';
    return 'exclamation-circle';
  },
  
  // 获取项目状态
  getProjectStatus: function() {
    if (this.projectProgress >= 80) return '即将完成';
    if (this.projectProgress >= 60) return '进展顺利';
    if (this.projectProgress >= 40) return '正常推进';
    return '需要关注';
  },
  
  // 获取项目截止日期
  getProjectDeadline: function() {
    const deadline = new Date(this.projectEndDate);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 30) return '1个月后';
    if (diffDays > 7) return `${Math.ceil(diffDays / 7)}周后`;
    if (diffDays > 0) return `${diffDays}天后`;
    return '已截止';
  },
  
  // 获取部署状态
  getDeployStatus: function() {
    if (this.deployProgress < 20) return '准备环境';
    if (this.deployProgress < 50) return '构建镜像';
    if (this.deployProgress < 80) return '部署容器';
    return '验证服务';
  },
  
  // 数学函数包装
  Math: Math,
  
  // 控制面板操作
  refreshData: () => {
    console.log('刷新项目数据');
    alert('数据已刷新！');
  },
  
  generateReport: () => {
    console.log('生成项目报告');
    alert('项目报告生成中，请稍候...');
  },
  
  setReminder: () => {
    console.log('设置项目提醒');
    alert('项目提醒已设置');
  }
};
complete.storyName = '综合应用示例';
complete.parameters = {
  docs: {
    description: {
      story: `
## 综合应用示例

这是一个完整的项目管理仪表盘示例，展示了进度条在复杂业务场景中的综合应用。

### 📊 项目管理仪表盘特性

#### 多层级进度展示
- **项目总体进度**: 使用大型进度条和圆形进度条展示整体情况
- **阶段进度**: 分阶段展示需求、设计、开发、测试等各个环节
- **任务进度**: 实时展示具体任务的执行进度
- **团队效率**: 用圆形进度条展示各项效率指标

#### 智能状态显示
- **动态颜色**: 根据进度自动调整颜色（红色警告、橙色注意、绿色良好）
- **状态图标**: 不同进度阶段显示相应的状态图标
- **智能文本**: 根据进度自动生成状态描述文字
- **时间计算**: 自动计算剩余时间和预期完成时间

### 🎯 业务场景应用

#### 项目管理
- **进度跟踪**: 实时跟踪项目各个阶段的完成情况
- **风险预警**: 通过颜色和状态及时发现风险项目
- **资源分配**: 根据进度情况合理分配团队资源
- **里程碑管理**: 重要节点的进度标记和提醒

#### 团队协作
- **透明化管理**: 所有成员都能看到项目整体进展
- **责任明确**: 每个阶段的负责人和完成情况清晰可见
- **效率监控**: 实时监控团队的工作效率和质量
- **目标对齐**: 确保团队朝着共同目标努力

### 🎨 界面设计特色

#### 信息层次
- **总体概览**: 最上方显示项目整体情况
- **阶段详情**: 中间部分展示各阶段具体进度
- **实时监控**: 底部显示正在执行的任务
- **控制操作**: 提供数据刷新和报告生成功能

#### 视觉设计
- **卡片布局**: 使用卡片对不同类型的信息进行分组
- **栅格系统**: 响应式的栅格布局适应不同屏幕
- **颜色语言**: 统一的颜色语言表示不同的状态和优先级
- **图标系统**: 语义化的图标提升信息的可读性

### 🔧 技术实现要点

#### 数据计算
\`\`\`typescript
// 根据进度计算颜色
getProgressColor(progress: number): string {
  if (progress >= 80) return '#52c41a';  // 绿色：良好
  if (progress >= 60) return '#1890ff';  // 蓝色：正常
  if (progress >= 40) return '#faad14';  // 橙色：注意
  return '#ff4d4f';                      // 红色：警告
}

// 计算预期完成时间
getEstimatedCompletion(progress: number, startDate: Date): Date {
  const elapsed = Date.now() - startDate.getTime();
  const totalEstimated = (elapsed / progress) * 100;
  return new Date(startDate.getTime() + totalEstimated);
}
\`\`\`

#### 状态管理
\`\`\`typescript
// 项目状态枚举
enum ProjectStatus {
  NOT_STARTED = 'not-started',
  IN_PROGRESS = 'in-progress',
  AT_RISK = 'at-risk',
  DELAYED = 'delayed',
  COMPLETED = 'completed'
}

// 获取项目状态
getProjectStatus(progress: number, deadline: Date): ProjectStatus {
  if (progress === 100) return ProjectStatus.COMPLETED;
  
  const remainingDays = this.getDaysUntilDeadline(deadline);
  const expectedDays = (100 - progress) * 2; // 假设每1%需要2天
  
  if (remainingDays < expectedDays) return ProjectStatus.AT_RISK;
  if (remainingDays < 0) return ProjectStatus.DELAYED;
  
  return ProjectStatus.IN_PROGRESS;
}
\`\`\`

#### 实时更新
\`\`\`typescript
// 实时数据更新
startRealTimeUpdates() {
  setInterval(() => {
    this.updateProjectProgress();
    this.updateTeamEfficiency();
    this.updateRealTimeTasks();
  }, 30000); // 每30秒更新一次
}
\`\`\`

### 📈 数据分析

#### KPI指标
- **进度完成率**: 各阶段按时完成的比例
- **团队效率**: 实际进度与计划进度的比较
- **质量指标**: 代码质量、测试覆盖率等
- **满意度**: 团队成员和客户的满意度

#### 趋势分析
- **进度趋势**: 项目进度的变化趋势
- **效率趋势**: 团队效率的变化情况
- **风险识别**: 可能影响项目成功的风险因素
- **预测分析**: 基于当前进度预测完成时间

### 💡 扩展应用场景

1. **软件开发项目**: 敏捷开发的冲刺和迭代管理
2. **建筑工程管理**: 工程进度和质量监控
3. **生产制造管理**: 生产线效率和产品质量监控
4. **营销活动管理**: 营销活动的执行进度和效果监控
5. **教育培训管理**: 培训课程的进度和学员表现监控

### 🎯 用户体验优化

#### 直观性
- **一目了然**: 关键信息在首屏就能看到
- **颜色编码**: 使用颜色快速识别状态和优先级
- **进度对比**: 不同维度的进度可以直接比较

#### 交互性
- **实时更新**: 数据自动更新，无需手动刷新
- **深入探索**: 点击进度条可以查看详细信息
- **快捷操作**: 提供常用操作的快捷入口

这个示例展示了如何构建专业的项目管理仪表盘，将复杂的项目信息通过进度条的形式清晰直观地展示出来。
`
    }
  }
};
