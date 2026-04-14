import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { unit } from 'storybookUnit';
import { BaseModule } from '../../../base/base.module';
import { HyFullscreenDirective } from './hy-fullscreen.directive';
import { HyFlexBoxDirective, ModelService } from '../../_index';

const argTypes = unit.createArgTypes('HyFullscreenDirective','directive');
export default {
  title: '功能指令/hyFullscreen（全屏显示-指令）',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [ModelService]
    }),
  ],
  argTypes
} as Meta;

export const _使用说明 = () => {
  const md = require('./hy-fullscreen.directive.md');
  return {
    template: `
      <div class="markdown">
        <markdown>{{md}}</markdown>
      </div>
    `,
    props: {
      md
    }
  };
};

// 基础全屏功能
const Template1: Story<HyFullscreenDirective> = (args: any) => {
  return {
    props: {
      ...args,
      isFullscreen: false,
      toggleFullscreen: function() {
        this.isFullscreen = !this.isFullscreen;
      },
      onFullscreenChange: function(isFullscreen: boolean) {
        this.isFullscreen = isFullscreen;
        console.log('全屏状态变化:', isFullscreen);
      }
    },
    template: `
    <div style="padding: 20px; border: 2px solid #ddd; border-radius: 8px;">
      <h3>基础全屏功能演示</h3>
      <p>点击按钮可以将下方的内容区域切换到全屏模式</p>
      
      <hy-form>
        <hy-button 
          [title]="isFullscreen ? '退出全屏' : '进入全屏'" 
          (onClick)="toggleFullscreen()">
        </hy-button>
      </hy-form>
      
      <div hyFullscreen 
           [hyFullscreenValid]="isFullscreen"
           (hyFullscreenValidChange)="onFullscreenChange($event)"
           style="margin-top: 20px; padding: 40px; border: 1px solid #ccc; background-color: #f9f9f9; border-radius: 4px;">
        <h2>全屏内容区域</h2>
        <p>这是需要全屏显示的内容区域。</p>
        <p>当前全屏状态: <strong>{{ isFullscreen ? '已全屏' : '未全屏' }}</strong></p>
        <div style="margin-top: 20px;">
          <p>💡 提示：</p>
          <ul>
            <li>点击上方按钮进入全屏模式</li>
            <li>在全屏模式下，可以按 ESC 键退出全屏</li>
            <li>全屏时背景色会自动设置为默认的 #f0f2f5</li>
          </ul>
        </div>
      </div>
    </div>
    `
  }
};
export const panel1 = Template1.bind({});
panel1.storyName = '基础全屏功能';
panel1.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <hy-form>
        <hy-button 
          [title]="isFullscreen ? '退出全屏' : '进入全屏'" 
          (onClick)="toggleFullscreen()">
        </hy-button>
      </hy-form>
      
      <div hyFullscreen 
           [hyFullscreenValid]="isFullscreen"
           (hyFullscreenValidChange)="onFullscreenChange($event)"
           style="padding: 40px; border: 1px solid #ccc; background-color: #f9f9f9;">
        <h2>全屏内容区域</h2>
        <p>这是需要全屏显示的内容区域。</p>
        <p>当前全屏状态: <strong>{{ isFullscreen ? '已全屏' : '未全屏' }}</strong></p>
      </div>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "TypeScript代码",
      template: `
      export class ExampleComponent {
        isFullscreen = false;

        toggleFullscreen() {
          this.isFullscreen = !this.isFullscreen;
        }

        onFullscreenChange(isFullscreen: boolean) {
          this.isFullscreen = isFullscreen;
          console.log('全屏状态变化:', isFullscreen);
        }
      }
      `,
      language: "typescript",
      format: "typescript",
    },
    {
      tab: "使用说明",
      template: `
      hyFullscreen 指令的基础用法：
      
      1. [hyFullscreenValid]="isFullscreen" - 控制全屏状态
      2. (hyFullscreenValidChange)="onFullscreenChange($event)" - 监听全屏状态变化
      3. 用户可通过 ESC 键或浏览器控件退出全屏
      4. 指令会自动处理全屏进入和退出的逻辑
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

// 自定义背景颜色
const Template2: Story<HyFullscreenDirective> = (args: any) => {
  return {
    props: {
      ...args,
      isFullscreen: false,
      backgroundColor: '#1f1f1f',
      backgroundOptions: [
        { label: '默认灰色', value: '#f0f2f5' },
        { label: '深色主题', value: '#1f1f1f' },
        { label: '蓝色主题', value: '#001529' },
        { label: '绿色主题', value: '#f6ffed' },
        { label: '红色主题', value: '#fff2f0' }
      ],
      toggleFullscreen: function() {
        this.isFullscreen = !this.isFullscreen;
      },
      onFullscreenChange: function(isFullscreen: boolean) {
        this.isFullscreen = isFullscreen;
      },
      onBackgroundChange: function(color: string) {
        this.backgroundColor = color;
      }
    },
    template: `
    <div style="padding: 20px; border: 2px solid #ddd; border-radius: 8px;">
      <h3>自定义背景颜色演示</h3>
      <p>可以通过 hyFullscreenBackgroundColor 属性设置全屏时的背景颜色</p>
      
      <hy-form>
        <hy-gt model="fullscreenForm">
          <hy-select 
            title="背景颜色" 
            model="backgroundColor"
            [datas]="backgroundOptions"
            [value]="backgroundColor"
            (onChange)="onBackgroundChange($event)">
          </hy-select>
        </hy-gt>
        
        <hy-button 
          [title]="isFullscreen ? '退出全屏' : '进入全屏'" 
          (onClick)="toggleFullscreen()">
        </hy-button>
      </hy-form>
      
      <div hyFullscreen 
           [hyFullscreenValid]="isFullscreen"
           [hyFullscreenBackgroundColor]="backgroundColor"
           (hyFullscreenValidChange)="onFullscreenChange($event)"
           style="margin-top: 20px; padding: 40px; border: 1px solid #ccc; background-color: #f9f9f9; border-radius: 4px;">
        <h2>全屏内容区域</h2>
        <p>当前选择的背景颜色: <code>{{ backgroundColor }}</code></p>
        <p>全屏状态: <strong>{{ isFullscreen ? '已全屏' : '未全屏' }}</strong></p>
        <div style="margin-top: 20px;">
          <p>🎨 背景颜色说明：</p>
          <ul>
            <li><code>#f0f2f5</code> - 默认浅灰色背景</li>
            <li><code>#1f1f1f</code> - 深色主题背景</li>
            <li><code>#001529</code> - 深蓝色背景</li>
            <li><code>#f6ffed</code> - 浅绿色背景</li>
            <li><code>#fff2f0</code> - 浅红色背景</li>
          </ul>
        </div>
      </div>
    </div>
    `
  }
};
export const panel2 = Template2.bind({});
panel2.storyName = '自定义背景颜色';
panel2.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <hy-form>
        <hy-gt model="fullscreenForm">
          <hy-select 
            title="背景颜色" 
            model="backgroundColor"
            [datas]="backgroundOptions"
            [value]="backgroundColor"
            (onChange)="onBackgroundChange($event)">
          </hy-select>
        </hy-gt>
        
        <hy-button 
          [title]="isFullscreen ? '退出全屏' : '进入全屏'" 
          (onClick)="toggleFullscreen()">
        </hy-button>
      </hy-form>
      
      <div hyFullscreen 
           [hyFullscreenValid]="isFullscreen"
           [hyFullscreenBackgroundColor]="backgroundColor"
           (hyFullscreenValidChange)="onFullscreenChange($event)"
           style="padding: 40px; border: 1px solid #ccc; background-color: #f9f9f9;">
        <h2>全屏内容区域</h2>
        <p>当前选择的背景颜色: <code>{{ backgroundColor }}</code></p>
      </div>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "TypeScript代码",
      template: `
      export class ExampleComponent {
        isFullscreen = false;
        backgroundColor = '#1f1f1f';
        backgroundOptions = [
          { label: '默认灰色', value: '#f0f2f5' },
          { label: '深色主题', value: '#1f1f1f' },
          { label: '蓝色主题', value: '#001529' },
          { label: '绿色主题', value: '#f6ffed' },
          { label: '红色主题', value: '#fff2f0' }
        ];

        toggleFullscreen() {
          this.isFullscreen = !this.isFullscreen;
        }

        onFullscreenChange(isFullscreen: boolean) {
          this.isFullscreen = isFullscreen;
        }

        onBackgroundChange(color: string) {
          this.backgroundColor = color;
        }
      }
      `,
      language: "typescript",
      format: "typescript",
    },
    {
      tab: "使用说明",
      template: `
      自定义背景颜色功能：
      
      1. [hyFullscreenBackgroundColor]="backgroundColor" - 设置全屏时的背景颜色
      2. 支持任何有效的 CSS 颜色值（十六进制、RGB、颜色名称等）
      3. 退出全屏时会自动恢复元素原有的背景颜色
      4. 可以根据不同主题或场景设置不同的背景色
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

// 事件处理演示
const Template3: Story<HyFullscreenDirective> = (args: any) => {
  return {
    props: {
      ...args,
      isFullscreen: false,
      eventLog: [],
      toggleFullscreen: function() {
        this.isFullscreen = !this.isFullscreen;
        this.addLog(`手动${this.isFullscreen ? '进入' : '退出'}全屏`);
      },
      onFullscreenChange: function(isFullscreen: boolean) {
        this.isFullscreen = isFullscreen;
        this.addLog(`全屏状态变化: ${isFullscreen ? '已进入全屏' : '已退出全屏'}`);
      },
      addLog: function(message: string) {
        const timestamp = new Date().toLocaleTimeString();
        this.eventLog.unshift(`[${timestamp}] ${message}`);
        if (this.eventLog.length > 10) {
          this.eventLog.pop();
        }
      },
      clearLog: function() {
        this.eventLog = [];
      }
    },
    template: `
    <div style="padding: 20px; border: 2px solid #ddd; border-radius: 8px;">
      <h3>事件处理演示</h3>
      <p>演示全屏状态变化事件的监听和处理</p>
      
      <div hyFlexBox hyFlexBoxGap="20px" style="margin-bottom: 20px;">
        <div hyFlex="1">
          <hy-form>
            <hy-button 
              [title]="isFullscreen ? '退出全屏' : '进入全屏'" 
              (onClick)="toggleFullscreen()">
            </hy-button>
            <hy-button title="清空日志" (onClick)="clearLog()"></hy-button>
          </hy-form>
          
          <div hyFullscreen 
               [hyFullscreenValid]="isFullscreen"
               [hyFullscreenBackgroundColor]="'#f0f2f5'"
               (hyFullscreenValidChange)="onFullscreenChange($event)"
               style="margin-top: 20px; padding: 30px; border: 1px solid #ccc; background-color: #f9f9f9; border-radius: 4px;">
            <h2>全屏内容区域</h2>
            <p>全屏状态: <strong>{{ isFullscreen ? '已全屏' : '未全屏' }}</strong></p>
            <div style="margin-top: 20px;">
              <p>🔧 测试方法：</p>
              <ul>
                <li>点击"进入全屏"按钮</li>
                <li>在全屏模式下按 ESC 键退出</li>
                <li>观察右侧事件日志的变化</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div hyWidth="300px">
          <h4>事件日志</h4>
          <div style="height: 300px; overflow-y: auto; padding: 10px; border: 1px solid #ddd; background-color: #fafafa; border-radius: 4px; font-family: monospace; font-size: 12px;">
            <div *ngFor="let log of eventLog" style="margin-bottom: 5px; padding: 5px; background-color: #fff; border-radius: 3px;">
              {{ log }}
            </div>
            <div *ngIf="eventLog.length === 0" style="color: #999; text-align: center; margin-top: 50px;">
              暂无事件日志
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  }
};
export const panel3 = Template3.bind({});
panel3.storyName = '事件处理演示';
panel3.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <hy-form>
        <hy-button 
          [title]="isFullscreen ? '退出全屏' : '进入全屏'" 
          (onClick)="toggleFullscreen()">
        </hy-button>
        <hy-button title="清空日志" (onClick)="clearLog()"></hy-button>
      </hy-form>
      
      <div hyFullscreen 
           [hyFullscreenValid]="isFullscreen"
           (hyFullscreenValidChange)="onFullscreenChange($event)"
           style="padding: 30px; border: 1px solid #ccc; background-color: #f9f9f9;">
        <h2>全屏内容区域</h2>
        <p>全屏状态: <strong>{{ isFullscreen ? '已全屏' : '未全屏' }}</strong></p>
      </div>
      
      <!-- 事件日志显示区域 -->
      <div style="margin-top: 20px;">
        <h4>事件日志</h4>
        <div *ngFor="let log of eventLog">{{ log }}</div>
      </div>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "TypeScript代码",
      template: `
      export class ExampleComponent {
        isFullscreen = false;
        eventLog: string[] = [];

        toggleFullscreen() {
          this.isFullscreen = !this.isFullscreen;
          this.addLog(\`手动\${this.isFullscreen ? '进入' : '退出'}全屏\`);
        }

        onFullscreenChange(isFullscreen: boolean) {
          this.isFullscreen = isFullscreen;
          this.addLog(\`全屏状态变化: \${isFullscreen ? '已进入全屏' : '已退出全屏'}\`);
        }

        addLog(message: string) {
          const timestamp = new Date().toLocaleTimeString();
          this.eventLog.unshift(\`[\${timestamp}] \${message}\`);
          if (this.eventLog.length > 10) {
            this.eventLog.pop();
          }
        }

        clearLog() {
          this.eventLog = [];
        }
      }
      `,
      language: "typescript",
      format: "typescript",
    },
    {
      tab: "使用说明",
      template: `
      事件处理功能说明：
      
      1. hyFullscreenValidChange 事件会在全屏状态改变时触发
      2. 事件参数为 boolean 类型，表示当前是否为全屏状态
      3. 无论是通过代码控制还是用户按 ESC 键，都会触发此事件
      4. 可以在事件处理函数中执行相关的业务逻辑
      5. 建议在事件处理函数中同步更新组件的状态变量
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};

// 综合应用示例
const Template4: Story<HyFlexBoxDirective> = (args: any) => {
  return {
    props: {
      ...args,
      isFullscreen: false,
      imageUrl: 'https://via.placeholder.com/800x600/4CAF50/ffffff?text=Sample+Image',
      chartData: [
        { name: '一月', value: 400 },
        { name: '二月', value: 300 },
        { name: '三月', value: 500 },
        { name: '四月', value: 280 },
        { name: '五月', value: 390 },
        { name: '六月', value: 450 }
      ],
      toggleImageFullscreen: function() {
        this.isFullscreen = !this.isFullscreen;
      },
      onFullscreenChange: function(isFullscreen: boolean) {
        this.isFullscreen = isFullscreen;
      }
    },
    template: `
    <div style="padding: 20px; border: 2px solid #ddd; border-radius: 8px;">
      <h3>综合应用示例</h3>
      <p>展示 hyFullscreen 指令在实际业务场景中的应用</p>
      
      <div hyFlexBox hyFlexBoxGap="30px">
        <!-- 图片查看器 -->
        <div hyFlex="1">
          <h4>📷 图片查看器</h4>
          <div style="position: relative; display: inline-block;">
            <img [src]="imageUrl" 
                 style="width: 300px; height: 200px; object-fit: cover; border-radius: 8px; cursor: pointer;"
                 (click)="toggleImageFullscreen()">
            <div style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px;">
              点击全屏查看
            </div>
          </div>
          
          <!-- 全屏图片容器 -->
          <div hyFullscreen 
               [hyFullscreenValid]="isFullscreen"
               [hyFullscreenBackgroundColor]="'#000000'"
               (hyFullscreenValidChange)="onFullscreenChange($event)"
               style="display: none;">
            <div style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; position: relative;">
              <img [src]="imageUrl" 
                   style="max-width: 90%; max-height: 90%; object-fit: contain;">
              <div style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.9); padding: 10px 15px; border-radius: 4px; cursor: pointer;"
                   (click)="toggleImageFullscreen()">
                ✕ 关闭
              </div>
              <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.9); padding: 10px 15px; border-radius: 4px;">
                按 ESC 键退出全屏
              </div>
            </div>
          </div>
        </div>
        
        <!-- 数据图表 -->
        <div hyFlex="1">
          <h4>📊 数据图表</h4>
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #fafafa;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
              <h5 style="margin: 0;">销售数据统计</h5>
              <hy-form>
                <hy-button title="全屏查看" size="small"></hy-button>
              </hy-form>
            </div>
            <div style="height: 150px; display: flex; align-items: end; gap: 10px;">
              <div *ngFor="let item of chartData" 
                   style="flex: 1; background: #1890ff; color: white; text-align: center; border-radius: 4px 4px 0 0; position: relative; display: flex; flex-direction: column; justify-content: end;"
                   [style.height.px]="item.value / 5">
                <div style="padding: 5px; font-size: 12px;">{{item.value}}</div>
              </div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
              <div *ngFor="let item of chartData" style="flex: 1; text-align: center; font-size: 12px;">
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background-color: #f0f8ff; border-radius: 8px;">
        <h4>💡 应用场景说明</h4>
        <ul style="margin: 10px 0;">
          <li><strong>图片/视频查看器</strong>：提供沉浸式的媒体内容查看体验</li>
          <li><strong>数据图表展示</strong>：全屏显示复杂图表，便于数据分析</li>
          <li><strong>文档编辑器</strong>：提供无干扰的编辑环境</li>
          <li><strong>演示文稿</strong>：全屏展示幻灯片或演示内容</li>
          <li><strong>游戏界面</strong>：提供沉浸式的游戏体验</li>
        </ul>
      </div>
    </div>
    `
  }
};
export const panel4 = Template4.bind({});
panel4.storyName = '综合应用示例';
panel4.parameters = {
  preview: [
    {
      tab: "HTML代码",
      template: `
      <!-- 图片查看器示例 -->
      <div style="position: relative; display: inline-block;">
        <img [src]="imageUrl" 
             style="width: 300px; height: 200px; cursor: pointer;"
             (click)="toggleImageFullscreen()">
      </div>
      
      <!-- 全屏图片容器 -->
      <div hyFullscreen 
           [hyFullscreenValid]="isFullscreen"
           [hyFullscreenBackgroundColor]="'#000000'"
           (hyFullscreenValidChange)="onFullscreenChange($event)">
        <div style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center;">
          <img [src]="imageUrl" style="max-width: 90%; max-height: 90%; object-fit: contain;">
          <div style="position: absolute; top: 20px; right: 20px;"
               (click)="toggleImageFullscreen()">
            ✕ 关闭
          </div>
        </div>
      </div>
      `,
      language: "html",
      copy: true,
      format: "html",
    },
    {
      tab: "TypeScript代码",
      template: `
      export class ImageViewerComponent {
        isFullscreen = false;
        imageUrl = 'https://via.placeholder.com/800x600/4CAF50/ffffff?text=Sample+Image';

        toggleImageFullscreen() {
          this.isFullscreen = !this.isFullscreen;
        }

        onFullscreenChange(isFullscreen: boolean) {
          this.isFullscreen = isFullscreen;
        }
      }
      `,
      language: "typescript",
      format: "typescript",
    },
    {
      tab: "使用说明",
      template: `
      综合应用场景：
      
      1. **图片查看器**：
         - 点击图片进入全屏查看模式
         - 黑色背景突出图片内容
         - 提供关闭按钮和ESC键退出
      
      2. **数据图表**：
         - 全屏展示复杂的数据图表
         - 便于用户分析和查看详细数据
         - 适合大屏展示和演示场景
      
      3. **最佳实践**：
         - 合理设置背景颜色以突出内容
         - 提供明确的退出方式
         - 在全屏内容中添加必要的导航元素
         - 考虑不同设备和屏幕尺寸的适配
      `,
      language: "markdown",
      format: "markdown",
    }
  ]
};
