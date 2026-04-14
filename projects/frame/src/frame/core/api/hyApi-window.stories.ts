import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { $hyapi } from './$hyapi';
import { StoriesModule } from 'stories/stories.module';
import { ModelService } from '../common/domain/service/model.service';
import { TableService } from '../common/domain/service/hytable.service';
import { BaseModule } from '../../base/base.module';

let _this;
class MockWindowService implements Partial<ModelService> {
  constructor() {
    _this = this;
    setTimeout(() => {
      console.log('窗口服务已初始化', this);
    }, 100);
  }
}

export default {
  title: 'HyApi工具类文档/$hyapi.window (窗口操作)',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockWindowService }, TableService]
    }),
  ],
} as Meta;

// 1. 基础窗口打开
const BasicWindowTemplate: Story = (args: any) => {
  args.openBasicWindow = () => {
    $hyapi.window.open('https://www.baidu.com');
    $hyapi.msg.createTips('info', '已在新窗口打开百度首页');
  };

  args.openWithTarget = () => {
    $hyapi.window.open('https://www.google.com', '_blank');
    $hyapi.msg.createTips('info', '已在新标签页打开Google');
  };

  args.openNamedWindow = () => {
    $hyapi.window.open('https://github.com', 'githubWindow');
    $hyapi.msg.createTips('info', '已在名为"githubWindow"的窗口打开GitHub');
  };

  args.basicWindowCode = `
// ================ 基础窗口操作 ================

// 1. 最简单的窗口打开
$hyapi.window.open('https://www.example.com');

// 2. 指定目标窗口
$hyapi.window.open('https://www.example.com', '_blank');  // 新标签页
$hyapi.window.open('https://www.example.com', '_self');   // 当前窗口
$hyapi.window.open('https://www.example.com', '_parent'); // 父窗口
$hyapi.window.open('https://www.example.com', '_top');    // 顶层窗口

// 3. 命名窗口（可复用）
$hyapi.window.open('https://www.example.com', 'myWindow');

// 如果再次调用相同名称，会在同一个窗口中打开
$hyapi.window.open('https://www.another.com', 'myWindow');

// ================ 参数详解 ================
$hyapi.window.open(url, target, features, i18n);

// url: string - 要打开的网址
// target: string - 目标窗口名称
//   - '_blank': 新窗口或标签页（默认）
//   - '_self': 当前窗口
//   - '_parent': 父窗口
//   - '_top': 顶层窗口
//   - 自定义名称: 具名窗口，可复用
// features: string - 窗口特性（大小、位置、工具栏等）
// i18n: boolean - 是否添加国际化语言参数

// ================ 实际使用场景 ================

class WindowManager {
  
  // 场景1：打开帮助文档
  openHelpDocument(topic: string) {
    const helpUrl = \`https://help.example.com/\${topic}\`;
    $hyapi.window.open(helpUrl, 'helpWindow');
    
    // 记录用户查看帮助的行为
    this.analytics.track('help_viewed', { topic });
  }
  
  // 场景2：外部链接安全跳转
  openExternalLink(url: string) {
    // 验证URL安全性
    if (this.isUrlSafe(url)) {
      $hyapi.window.open(url, '_blank');
    } else {
      $hyapi.msg.show('warning', '链接可能不安全', {
        content: '请确认要访问此链接吗？',
        callback: () => {
          $hyapi.window.open(url, '_blank');
        }
      });
    }
  }
  
  // 场景3：用户资料预览
  previewUserProfile(userId: number) {
    const profileUrl = \`/user/profile/\${userId}\`;
    $hyapi.window.open(profileUrl, \`profile_\${userId}\`);
  }
  
  // 场景4：系统管理页面
  openAdminPanel() {
    // 检查权限
    if (this.hasAdminPermission()) {
      $hyapi.window.open('/admin', 'adminPanel');
    } else {
      $hyapi.msg.show('error', '权限不足', {
        content: '您没有访问管理面板的权限'
      });
    }
  }
  
  private isUrlSafe(url: string): boolean {
    // 简单的URL安全检查
    const allowedDomains = ['localhost', 'example.com', 'trusted-site.com'];
    try {
      const urlObj = new URL(url);
      return allowedDomains.some(domain => 
        urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
      );
    } catch {
      return false;
    }
  }
  
  private hasAdminPermission(): boolean {
    // 权限检查逻辑
    return this.currentUser?.role === 'admin';
  }
}

// ================ 窗口状态管理 ================

class WindowStateManager {
  private openWindows = new Map<string, Window>();
  
  // 打开并跟踪窗口
  openTrackedWindow(url: string, name: string): Window | null {
    const newWindow = $hyapi.window.open(url, name);
    
    if (newWindow) {
      this.openWindows.set(name, newWindow);
      
      // 监听窗口关闭
      const checkClosed = () => {
        if (newWindow.closed) {
          this.openWindows.delete(name);
          console.log(\`窗口 \${name} 已关闭\`);
        } else {
          setTimeout(checkClosed, 1000);
        }
      };
      checkClosed();
    }
    
    return newWindow;
  }
  
  // 检查窗口是否打开
  isWindowOpen(name: string): boolean {
    const window = this.openWindows.get(name);
    return window ? !window.closed : false;
  }
  
  // 聚焦到已开窗口
  focusWindow(name: string): boolean {
    const window = this.openWindows.get(name);
    if (window && !window.closed) {
      window.focus();
      return true;
    }
    return false;
  }
  
  // 关闭所有窗口
  closeAllWindows() {
    this.openWindows.forEach((window, name) => {
      if (!window.closed) {
        window.close();
        console.log(\`关闭窗口: \${name}\`);
      }
    });
    this.openWindows.clear();
  }
  
  // 获取窗口统计
  getWindowStats() {
    let openCount = 0;
    let closedCount = 0;
    
    this.openWindows.forEach((window) => {
      if (window.closed) {
        closedCount++;
      } else {
        openCount++;
      }
    });
    
    return { openCount, closedCount, total: this.openWindows.size };
  }
}`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #52c41a;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>🪟 基础窗口打开功能</h2>
        <p><strong>核心功能:</strong> 新窗口打开、目标控制、窗口命名、状态管理</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="openBasicWindow()" style="margin-right:10px">
            🌐 基础窗口打开
          </button>
          <button nz-button nzType="default" (click)="openWithTarget()" style="margin-right:10px">
            🎯 指定目标窗口
          </button>
          <button nz-button nzType="dashed" (click)="openNamedWindow()">
            📛 命名窗口
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 基础窗口操作详解:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #52c41a"><code>{{basicWindowCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#f6ffed;border-radius:4px;border:1px solid #b7eb8f">
            <h5 style="color:#52c41a;margin:0 0 10px 0">🎯 目标类型</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>_blank: 新窗口</li>
              <li>_self: 当前窗口</li>
              <li>_parent: 父窗口</li>
              <li>自定义: 命名窗口</li>
            </ul>
          </div>
          <div style="padding:15px;background:#f6ffed;border-radius:4px;border:1px solid #b7eb8f">
            <h5 style="color:#52c41a;margin:0 0 10px 0">💼 使用场景</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>帮助文档查看</li>
              <li>外部链接跳转</li>
              <li>用户资料预览</li>
              <li>管理面板访问</li>
            </ul>
          </div>
          <div style="padding:15px;background:#f6ffed;border-radius:4px;border:1px solid #b7eb8f">
            <h5 style="color:#52c41a;margin:0 0 10px 0">🔧 高级特性</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>窗口状态跟踪</li>
              <li>安全URL验证</li>
              <li>权限控制</li>
              <li>批量窗口管理</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
};
export const basicWindow: Story = BasicWindowTemplate.bind({});
basicWindow.storyName = '1️⃣ 基础窗口打开';

// 2. 窗口特性配置
const WindowFeaturesTemplate: Story = (args: any) => {
  args.openCustomSizeWindow = () => {
    $hyapi.window.open('https://www.example.com', '_blank', 'width=800,height=600');
    $hyapi.msg.createTips('info', '已打开800x600的自定义窗口');
  };

  args.openCenteredWindow = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const width = 600;
    const height = 400;
    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;
    
    const features = `width=${width},height=${height},left=${left},top=${top}`;
    $hyapi.window.open('https://www.example.com', '_blank', features);
    $hyapi.msg.createTips('info', '已打开居中的600x400窗口');
  };

  args.openModalWindow = () => {
    const features = 'width=500,height=300,modal=yes,resizable=no,scrollbars=no,menubar=no,toolbar=no,location=no,status=no';
    $hyapi.window.open('https://www.example.com', '_blank', features);
    $hyapi.msg.createTips('info', '已打开模态窗口（部分浏览器支持）');
  };

  args.windowFeaturesCode = `
// ================ 窗口特性配置 ================

// 1. 自定义窗口尺寸
$hyapi.window.open(url, '_blank', 'width=800,height=600');

// 2. 窗口位置控制
const features = 'width=600,height=400,left=200,top=100';
$hyapi.window.open(url, '_blank', features);

// 3. 禁用浏览器功能
const restrictedFeatures = 'width=500,height=300,resizable=no,scrollbars=no,menubar=no,toolbar=no';
$hyapi.window.open(url, '_blank', restrictedFeatures);

// ================ 窗口特性选项详解 ================

// 尺寸控制
// width=数值          窗口宽度（像素）
// height=数值         窗口高度（像素）
// innerWidth=数值     内容区域宽度
// innerHeight=数值    内容区域高度

// 位置控制
// left=数值           窗口左边距（像素）
// top=数值            窗口上边距（像素）
// screenX=数值        相对于屏幕的X坐标
// screenY=数值        相对于屏幕的Y坐标

// 窗口行为
// resizable=yes/no    是否可调整大小
// scrollbars=yes/no   是否显示滚动条
// modal=yes/no        是否模态窗口（部分浏览器）

// 浏览器界面
// menubar=yes/no      是否显示菜单栏
// toolbar=yes/no      是否显示工具栏
// location=yes/no     是否显示地址栏
// status=yes/no       是否显示状态栏
// titlebar=yes/no     是否显示标题栏

// ================ 窗口配置工具类 ================

class WindowConfigBuilder {
  private features: string[] = [];
  
  // 设置尺寸
  size(width: number, height: number): this {
    this.features.push(\`width=\${width}\`, \`height=\${height}\`);
    return this;
  }
  
  // 设置位置
  position(left: number, top: number): this {
    this.features.push(\`left=\${left}\`, \`top=\${top}\`);
    return this;
  }
  
  // 居中显示
  center(width: number, height: number): this {
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    return this.size(width, height).position(left, top);
  }
  
  // 禁用调整大小
  noResize(): this {
    this.features.push('resizable=no');
    return this;
  }
  
  // 禁用滚动条
  noScrollbars(): this {
    this.features.push('scrollbars=no');
    return this;
  }
  
  // 隐藏浏览器界面
  minimal(): this {
    this.features.push(
      'menubar=no',
      'toolbar=no',
      'location=no',
      'status=no'
    );
    return this;
  }
  
  // 全屏显示
  fullscreen(): this {
    this.features.push('fullscreen=yes');
    return this;
  }
  
  // 构建特性字符串
  build(): string {
    return this.features.join(',');
  }
  
  // 重置配置
  reset(): this {
    this.features = [];
    return this;
  }
}

// 使用构建器
const builder = new WindowConfigBuilder();

// 标准对话框窗口
const dialogFeatures = builder
  .center(400, 300)
  .noResize()
  .noScrollbars()
  .minimal()
  .build();

$hyapi.window.open('/dialog', 'dialog', dialogFeatures);

// 大尺寸编辑器窗口
const editorFeatures = builder
  .reset()
  .size(1200, 800)
  .position(100, 50)
  .build();

$hyapi.window.open('/editor', 'editor', editorFeatures);

// ================ 响应式窗口配置 ================

class ResponsiveWindowManager {
  
  // 根据屏幕尺寸调整窗口
  openResponsiveWindow(url: string, name: string) {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    
    let width: number;
    let height: number;
    
    if (screenWidth < 1024) {
      // 小屏幕：占用大部分空间
      width = Math.floor(screenWidth * 0.9);
      height = Math.floor(screenHeight * 0.8);
    } else if (screenWidth < 1440) {
      // 中屏幕：适中尺寸
      width = 800;
      height = 600;
    } else {
      // 大屏幕：较大窗口
      width = 1000;
      height = 700;
    }
    
    const features = new WindowConfigBuilder()
      .center(width, height)
      .build();
    
    return $hyapi.window.open(url, name, features);
  }
  
  // 预设窗口配置
  getPresetConfig(preset: string): string {
    const configs = {
      // 小对话框
      dialog: new WindowConfigBuilder()
        .center(400, 300)
        .noResize()
        .minimal()
        .build(),
      
      // 表单窗口
      form: new WindowConfigBuilder()
        .center(600, 500)
        .noScrollbars()
        .build(),
      
      // 查看器窗口
      viewer: new WindowConfigBuilder()
        .size(900, 700)
        .position(200, 100)
        .build(),
      
      // 编辑器窗口
      editor: new WindowConfigBuilder()
        .size(1200, 800)
        .position(100, 50)
        .build(),
      
      // 全屏预览
      preview: new WindowConfigBuilder()
        .size(window.screen.width - 100, window.screen.height - 100)
        .position(50, 25)
        .build()
    };
    
    return configs[preset] || configs.dialog;
  }
  
  // 打开预设窗口
  openPresetWindow(url: string, preset: string, name?: string) {
    const features = this.getPresetConfig(preset);
    const windowName = name || preset + '_' + Date.now();
    
    return $hyapi.window.open(url, windowName, features);
  }
}

// ================ 窗口适配器 ================

class WindowAdapter {
  
  // 移动端适配
  static openMobileWindow(url: string, name: string) {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // 移动端：全屏打开
      return $hyapi.window.open(url, name);
    } else {
      // 桌面端：适中窗口
      const features = new WindowConfigBuilder()
        .center(800, 600)
        .build();
      
      return $hyapi.window.open(url, name, features);
    }
  }
  
  // 浏览器兼容性处理
  static openCompatibleWindow(url: string, name: string, features: string) {
    try {
      return $hyapi.window.open(url, name, features);
    } catch (error) {
      console.warn('窗口特性不支持，使用默认配置:', error);
      return $hyapi.window.open(url, name);
    }
  }
  
  // 权限检查
  static openWithPermissionCheck(url: string, name: string, features: string) {
    // 检查弹窗是否被阻止
    const newWindow = $hyapi.window.open(url, name, features);
    
    if (!newWindow || newWindow.closed) {
      $hyapi.msg.show('warning', '弹窗被阻止', {
        content: '请允许此网站显示弹窗，然后重试',
        callback: () => {
          // 用户确认后重试
          $hyapi.window.open(url, name, features);
        }
      });
      return null;
    }
    
    return newWindow;
  }
}

// ================ 使用示例 ================

class WindowUsageExamples {
  
  private responsiveManager = new ResponsiveWindowManager();
  
  // 打开帮助窗口
  openHelp(topic: string) {
    const helpUrl = \`/help/\${topic}\`;
    
    this.responsiveManager.openPresetWindow(helpUrl, 'dialog', 'help');
  }
  
  // 打开编辑器
  openEditor(documentId: string) {
    const editorUrl = \`/editor/\${documentId}\`;
    
    this.responsiveManager.openPresetWindow(editorUrl, 'editor', \`editor_\${documentId}\`);
  }
  
  // 打开图片预览
  previewImage(imageUrl: string) {
    // 根据图片尺寸调整窗口
    const img = new Image();
    img.onload = () => {
      const maxWidth = window.screen.width - 200;
      const maxHeight = window.screen.height - 200;
      
      let width = img.width;
      let height = img.height;
      
      // 按比例缩放
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      const features = new WindowConfigBuilder()
        .center(width + 50, height + 100) // 加上窗口边框
        .noResize()
        .minimal()
        .build();
      
      $hyapi.window.open(imageUrl, 'imagePreview', features);
    };
    
    img.src = imageUrl;
  }
}`;

  return {
    props: args,
    template: `
      <div style="border:2px solid var(--primary-color);padding:15px;border-radius:8px">
        <h2>⚙️ 窗口特性配置功能</h2>
        <p><strong>高级配置:</strong> 窗口尺寸、位置控制、界面定制、响应式适配</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="openCustomSizeWindow()" style="margin-right:10px">
            📏 自定义尺寸
          </button>
          <button nz-button nzType="default" (click)="openCenteredWindow()" style="margin-right:10px">
            🎯 居中窗口
          </button>
          <button nz-button nzType="dashed" (click)="openModalWindow()">
            🎭 模态窗口
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 窗口特性完整配置指南:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid var(--primary-color)"><code>{{windowFeaturesCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#f0f9ff;border-radius:4px;border:1px solid var(--primary-color)">
            <h5 style="color:var(--primary-color);margin:0 0 10px 0">📏 尺寸位置</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>width/height: 窗口尺寸</li>
              <li>left/top: 窗口位置</li>
              <li>自动居中计算</li>
              <li>响应式适配</li>
            </ul>
          </div>
          <div style="padding:15px;background:#f0f9ff;border-radius:4px;border:1px solid var(--primary-color)">
            <h5 style="color:var(--primary-color);margin🎛️ 界面控制</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>menubar: 菜单栏</li>
              <li>toolbar: 工具栏</li>
              <li>scrollbars: 滚动条</li>
              <li>resizable: 可调整</li>
            </ul>
          </div>
          <div style="padding:15px;background:#f0f9ff;border-radius:4px;border:1px solid var(--primary-color)">
            <h5 style="color:var(--primary-color);margin:0 0 10px 0">🔧 高级功能</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>配置构建器</li>
              <li>预设模板</li>
              <li>兼容性处理</li>
              <li>权限检查</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
};
export const windowFeatures: Story = WindowFeaturesTemplate.bind({});
windowFeatures.storyName = '2️⃣ 窗口特性配置';

// 3. 国际化语言支持
const I18nSupportTemplate: Story = (args: any) => {
  args.openWithChinese = () => {
    $hyapi.window.open('https://www.example.com/page1', '_blank', 'width=600,height=400', true);
    $hyapi.msg.createTips('info', '已打开带中文语言参数的窗口（如果启用了国际化）');
  };

  args.openWithoutI18n = () => {
    $hyapi.window.open('https://www.example.com/page2', '_blank', 'width=600,height=400', false);
    $hyapi.msg.createTips('info', '已打开不带语言参数的窗口');
  };

  args.i18nCode = `
// ================ 国际化语言支持 ================

// 1. 启用国际化参数（第四个参数为true）
$hyapi.window.open(url, target, features, true);

// 这将在URL后面自动添加语言参数，如：
// https://example.com/page?acceptLanguage=zh_CN

// 2. 禁用国际化参数
$hyapi.window.open(url, target, features, false);

// URL保持原样，不添加语言参数

// ================ 语言参数说明 ================

// 框架会自动检测当前用户的语言设置，并添加相应的参数：
// - zh_CN: 简体中文
// - zh_HK: 繁体中文（香港）
// - en_US: 英语（美国）
// - 其他支持的语言代码

// ================ 实际应用场景 ================

class I18nWindowManager {
  
  // 场景1：多语言帮助文档
  openHelpDocument(docId: string, forceLanguage?: string) {
    const baseUrl = \`https://help.example.com/doc/\${docId}\`;
    
    if (forceLanguage) {
      // 强制指定语言
      const url = \`\${baseUrl}?lang=\${forceLanguage}\`;
      $hyapi.window.open(url, 'help');
    } else {
      // 使用框架自动语言检测
      $hyapi.window.open(baseUrl, 'help', 'width=800,height=600', true);
    }
  }
  
  // 场景2：多语言报表系统
  openReport(reportId: string, useI18n: boolean = true) {
    const reportUrl = \`/reports/\${reportId}\`;
    
    const features = 'width=1000,height=700,scrollbars=yes';
    $hyapi.window.open(reportUrl, \`report_\${reportId}\`, features, useI18n);
    
    // 记录用户访问的语言偏好
    if (useI18n) {
      this.analytics.track('report_viewed_with_i18n', {
        reportId,
        language: this.getCurrentLanguage()
      });
    }
  }
  
  // 场景3：外部系统集成
  openExternalSystem(systemUrl: string, needsLanguage: boolean) {
    if (needsLanguage) {
      // 某些外部系统需要语言参数
      $hyapi.window.open(systemUrl, 'external', 'width=1200,height=800', true);
    } else {
      // 有些系统不需要或不支持语言参数
      $hyapi.window.open(systemUrl, 'external', 'width=1200,height=800', false);
    }
  }
  
  // 场景4：用户设置页面
  openUserSettings() {
    // 用户设置页面通常需要国际化
    const settingsUrl = '/user/settings';
    const features = 'width=800,height=600';
    
    $hyapi.window.open(settingsUrl, 'userSettings', features, true);
  }
  
  // 获取当前语言
  private getCurrentLanguage(): string {
    // 从框架或本地存储获取当前语言设置
    return localStorage.getItem('currentLanguage') || 'zh_CN';
  }
}

// ================ 语言切换管理 ================

class LanguageManager {
  
  private currentLanguage: string = 'zh_CN';
  
  // 设置语言
  setLanguage(language: string) {
    this.currentLanguage = language;
    localStorage.setItem('currentLanguage', language);
    
    // 通知所有已打开的窗口更新语言
    this.notifyWindowLanguageChange(language);
  }
  
  // 打开多语言页面
  openMultiLanguagePage(pageUrl: string, targetLanguage?: string) {
    const language = targetLanguage || this.currentLanguage;
    
    // 构建带语言参数的URL
    const separator = pageUrl.includes('?') ? '&' : '?';
    const urlWithLang = \`\${pageUrl}\${separator}acceptLanguage=\${language}\`;
    
    return $hyapi.window.open(urlWithLang, \`page_\${language}\`);
  }
  
  // 语言切换窗口
  openLanguageSwitcher() {
    const switcherUrl = '/language-switcher';
    const features = 'width=400,height=300,resizable=no';
    
    const switcherWindow = $hyapi.window.open(switcherUrl, 'langSwitcher', features, true);
    
    // 监听语言切换消息
    window.addEventListener('message', (event) => {
      if (event.data.type === 'languageChanged') {
        this.setLanguage(event.data.language);
        
        // 关闭语言切换窗口
        if (switcherWindow && !switcherWindow.closed) {
          switcherWindow.close();
        }
      }
    });
    
    return switcherWindow;
  }
  
  // 通知窗口语言变更
  private notifyWindowLanguageChange(language: string) {
    // 这里可以实现向所有打开的窗口发送语言变更消息
    const message = {
      type: 'languageChanged',
      language: language
    };
    
    // 如果有跟踪的窗口，可以向它们发送消息
    // trackedWindows.forEach(window => {
    //   if (!window.closed) {
    //     window.postMessage(message, '*');
    //   }
    // });
  }
}

// ================ URL参数管理 ================

class UrlParameterManager {
  
  // 构建带参数的URL
  static buildUrlWithParams(baseUrl: string, params: Record<string, string>): string {
    const url = new URL(baseUrl, window.location.origin);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    
    return url.toString();
  }
  
  // 添加语言参数
  static addLanguageParam(url: string, language: string): string {
    return this.buildUrlWithParams(url, { acceptLanguage: language });
  }
  
  // 添加用户上下文参数
  static addUserContext(url: string, userInfo: any): string {
    const params = {
      userId: userInfo.id,
      userRole: userInfo.role,
      acceptLanguage: userInfo.language || 'zh_CN'
    };
    
    return this.buildUrlWithParams(url, params);
  }
  
  // 添加应用上下文
  static addAppContext(url: string): string {
    const params = {
      appVersion: '2.1.0',
      timestamp: Date.now().toString(),
      source: 'hyframe_window'
    };
    
    return this.buildUrlWithParams(url, params);
  }
}

// ================ 综合使用示例 ================

class ComprehensiveWindowService {
  
  private i18nManager = new I18nWindowManager();
  private languageManager = new LanguageManager();
  
  // 智能打开窗口（自动判断是否需要国际化）
  smartOpen(url: string, windowName: string, features?: string) {
    // 检查URL是否为内部页面
    const isInternalPage = this.isInternalUrl(url);
    
    // 内部页面默认启用国际化，外部页面默认不启用
    const enableI18n = isInternalPage;
    
    if (enableI18n) {
      // 添加额外的应用上下文
      const urlWithContext = UrlParameterManager.addAppContext(url);
      return $hyapi.window.open(urlWithContext, windowName, features, true);
    } else {
      return $hyapi.window.open(url, windowName, features, false);
    }
  }
  
  // 多语言页面快速打开
  openInLanguage(url: string, language: string, windowName?: string) {
    const urlWithLang = UrlParameterManager.addLanguageParam(url, language);
    const name = windowName || \`page_\${language}\`;
    
    return $hyapi.window.open(urlWithLang, name);
  }
  
  // 判断是否为内部URL
  private isInternalUrl(url: string): boolean {
    try {
      const urlObj = new URL(url, window.location.origin);
      return urlObj.origin === window.location.origin;
    } catch {
      return false;
    }
  }
}`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #fa8c16;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>🌍 国际化语言支持</h2>
        <p><strong>多语言特性:</strong> 自动语言检测、参数添加、多语言切换、URL管理</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="openWithChinese()" style="margin-right:10px">
            🇨🇳 启用国际化
          </button>
          <button nz-button nzType="default" (click)="openWithoutI18n()">
            🌐 禁用国际化
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 国际化支持完整方案:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #fa8c16"><code>{{i18nCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#fff7e6;border-radius:4px;border:1px solid #ffd591">
            <h5 style="color:#fa8c16;margin:0 0 10px 0">🌍 语言支持</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>zh_CN: 简体中文</li>
              <li>zh_HK: 繁体中文</li>
              <li>en_US: 英语</li>
              <li>自动检测用户语言</li>
            </ul>
          </div>
          <div style="padding:15px;background:#fff7e6;border-radius:4px;border:1px solid #ffd591">
            <h5 style="color:#fa8c16;margin:0 0 10px 0">⚙️ 参数管理</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>自动添加语言参数</li>
              <li>URL参数构建</li>
              <li>用户上下文传递</li>
              <li>应用信息附加</li>
            </ul>
          </div>
          <div style="padding:15px;background:#fff7e6;border-radius:4px;border:1px solid #ffd591">
            <h5 style="color:#fa8c16;margin:0 0 10px 0">🔧 高级功能</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>语言切换管理</li>
              <li>智能判断内外部链接</li>
              <li>多语言页面快速打开</li>
              <li>跨窗口语言同步</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
};
export const i18nSupport: Story = I18nSupportTemplate.bind({});
i18nSupport.storyName = '3️⃣ 国际化语言支持';

// 4. 完整功能手册
const CompleteWindowTemplate: Story = (args: any) => {
  args.allWindowFeatures = () => {
    $hyapi.msg.createTips('info', '这是window模块的完整功能演示，请查看代码了解所有特性');
  };

  args.completeWindowCode = `
// ==================== $hyapi.window 完整功能概览 ====================

// ================ 基础方法 ================
$hyapi.window.open(url, target, features, i18n);

// 参数详解：
// url: string - 要打开的网址（必填）
// target: string - 目标窗口名称（可选）
//   - '_blank': 新窗口或标签页（默认）
//   - '_self': 当前窗口
//   - '_parent': 父窗口
//   - '_top': 顶层窗口
//   - 自定义名称: 具名窗口，可复用
// features: string - 窗口特性配置（可选）
//   - 尺寸：width=800,height=600
//   - 位置：left=100,top=50
//   - 行为：resizable=no,scrollbars=yes
//   - 界面：menubar=no,toolbar=no
// i18n: boolean - 是否启用国际化语言参数（可选）
//   - true: 自动添加acceptLanguage参数
//   - false: 不添加语言参数

// ================ 完整使用示例 ================

@Component({
  selector: 'app-window-manager',
  template: \`
    <div class="window-controls">
      <button (click)="openHelp()">帮助文档</button>
      <button (click)="openEditor()">文档编辑器</button>
      <button (click)="openPreview()">预览窗口</button>
      <button (click)="openSettings()">系统设置</button>
    </div>
  \`
})
export class WindowManagerComponent implements OnDestroy {
  
  private windowTracker = new WindowTracker();
  private windowBuilder = new WindowConfigBuilder();
  
  // 帮助文档（带国际化）
  openHelp() {
    const helpUrl = '/help/user-guide';
    const features = this.windowBuilder
      .center(800, 600)
      .build();
    
    const helpWindow = $hyapi.window.open(helpUrl, 'help', features, true);
    this.windowTracker.track('help', helpWindow);
  }
  
  // 文档编辑器（大窗口）
  openEditor(documentId?: string) {
    const editorUrl = documentId ? 
      \`/editor/\${documentId}\` : 
      '/editor/new';
    
    const features = this.windowBuilder
      .reset()
      .size(1200, 800)
      .position(100, 50)
      .build();
    
    const editorWindow = $hyapi.window.open(editorUrl, 'editor', features, true);
    this.windowTracker.track('editor', editorWindow);
  }
  
  // 预览窗口（只读）
  openPreview(contentUrl: string) {
    const features = this.windowBuilder
      .reset()
      .center(900, 700)
      .noScrollbars()
      .minimal()
      .build();
    
    const previewWindow = $hyapi.window.open(contentUrl, 'preview', features, false);
    this.windowTracker.track('preview', previewWindow);
  }
  
  // 系统设置（对话框样式）
  openSettings() {
    const settingsUrl = '/admin/settings';
    const features = this.windowBuilder
      .reset()
      .center(600, 500)
      .noResize()
      .build();
    
    // 检查权限
    if (this.hasAdminPermission()) {
      const settingsWindow = $hyapi.window.open(settingsUrl, 'settings', features, true);
      this.windowTracker.track('settings', settingsWindow);
    } else {
      $hyapi.msg.show('error', '权限不足', {
        content: '您没有访问系统设置的权限'
      });
    }
  }
  
  ngOnDestroy() {
    // 组件销毁时关闭所有窗口
    this.windowTracker.closeAll();
  }
  
  private hasAdminPermission(): boolean {
    // 权限检查逻辑
    return this.userService.hasRole('admin');
  }
}

// ================ 窗口跟踪器 ================

class WindowTracker {
  private windows = new Map<string, Window>();
  
  // 跟踪窗口
  track(name: string, window: Window | null) {
    if (window) {
      this.windows.set(name, window);
      
      // 监听窗口关闭
      this.monitorWindow(name, window);
    }
  }
  
  // 监听窗口状态
  private monitorWindow(name: string, window: Window) {
    const checkInterval = setInterval(() => {
      if (window.closed) {
        this.windows.delete(name);
        clearInterval(checkInterval);
        console.log(\`窗口 \${name} 已关闭\`);
      }
    }, 1000);
  }
  
  // 获取窗口
  getWindow(name: string): Window | null {
    const window = this.windows.get(name);
    return window && !window.closed ? window : null;
  }
  
  // 聚焦窗口
  focusWindow(name: string): boolean {
    const window = this.getWindow(name);
    if (window) {
      window.focus();
      return true;
    }
    return false;
  }
  
  // 关闭窗口
  closeWindow(name: string): boolean {
    const window = this.getWindow(name);
    if (window) {
      window.close();
      this.windows.delete(name);
      return true;
    }
    return false;
  }
  
  // 关闭所有窗口
  closeAll(): number {
    let closedCount = 0;
    this.windows.forEach((window, name) => {
      if (!window.closed) {
        window.close();
        closedCount++;
      }
    });
    this.windows.clear();
    return closedCount;
  }
  
  // 获取统计信息
  getStats() {
    let openCount = 0;
    let closedCount = 0;
    
    this.windows.forEach((window) => {
      if (window.closed) {
        closedCount++;
      } else {
        openCount++;
      }
    });
    
    return { openCount, closedCount, total: this.windows.size };
  }
}

// ================ 窗口配置构建器 ================

class WindowConfigBuilder {
  private features: string[] = [];
  
  // 设置尺寸
  size(width: number, height: number): this {
    this.features.push(\`width=\${width}\`, \`height=\${height}\`);
    return this;
  }
  
  // 设置位置
  position(left: number, top: number): this {
    this.features.push(\`left=\${left}\`, \`top=\${top}\`);
    return this;
  }
  
  // 居中显示
  center(width: number, height: number): this {
    const left = Math.max(0, (window.screen.width - width) / 2);
    const top = Math.max(0, (window.screen.height - height) / 2);
    return this.size(width, height).position(left, top);
  }
  
  // 禁用调整大小
  noResize(): this {
    this.features.push('resizable=no');
    return this;
  }
  
  // 禁用滚动条
  noScrollbars(): this {
    this.features.push('scrollbars=no');
    return this;
  }
  
  // 隐藏浏览器界面
  minimal(): this {
    this.features.push(
      'menubar=no',
      'toolbar=no',
      'location=no',
      'status=no'
    );
    return this;
  }
  
  // 全屏显示
  fullscreen(): this {
    const width = window.screen.width;
    const height = window.screen.height;
    return this.size(width, height).position(0, 0);
  }
  
  // 构建特性字符串
  build(): string {
    return this.features.join(',');
  }
  
  // 重置配置
  reset(): this {
    this.features = [];
    return this;
  }
}

// ================ 窗口管理服务 ================

@Injectable({
  providedIn: 'root'
})
export class WindowManagementService {
  
  private tracker = new WindowTracker();
  private builder = new WindowConfigBuilder();
  
  // 标准化窗口打开
  openWindow(config: WindowConfig): Window | null {
    const features = this.buildFeatures(config);
    const window = $hyapi.window.open(
      config.url,
      config.name,
      features,
      config.i18n
    );
    
    if (window) {
      this.tracker.track(config.name, window);
      
      // 记录窗口打开事件
      this.analytics.track('window_opened', {
        name: config.name,
        url: config.url,
        features: features
      });
    }
    
    return window;
  }
  
  // 构建窗口特性
  private buildFeatures(config: WindowConfig): string {
    this.builder.reset();
    
    if (config.width && config.height) {
      if (config.center) {
        this.builder.center(config.width, config.height);
      } else {
        this.builder.size(config.width, config.height);
        if (config.left !== undefined && config.top !== undefined) {
          this.builder.position(config.left, config.top);
        }
      }
    }
    
    if (config.resizable === false) {
      this.builder.noResize();
    }
    
    if (config.scrollbars === false) {
      this.builder.noScrollbars();
    }
    
    if (config.minimal) {
      this.builder.minimal();
    }
    
    return this.builder.build();
  }
  
  // 预设配置
  openPreset(type: WindowPreset, url: string, name?: string): Window | null {
    const configs = {
      dialog: {
        width: 400,
        height: 300,
        center: true,
        resizable: false,
        minimal: true
      },
      form: {
        width: 600,
        height: 500,
        center: true,
        resizable: true
      },
      editor: {
        width: 1200,
        height: 800,
        left: 100,
        top: 50,
        resizable: true
      },
      preview: {
        width: 900,
        height: 700,
        center: true,
        scrollbars: false,
        minimal: true
      }
    };
    
    const config: WindowConfig = {
      url,
      name: name || type,
      i18n: true,
      ...configs[type]
    };
    
    return this.openWindow(config);
  }
  
  // 批量关闭
  closeAll(): number {
    return this.tracker.closeAll();
  }
  
  // 获取窗口统计
  getStats() {
    return this.tracker.getStats();
  }
}

// ================ 类型定义 ================

interface WindowConfig {
  url: string;
  name: string;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  center?: boolean;
  resizable?: boolean;
  scrollbars?: boolean;
  minimal?: boolean;
  i18n?: boolean;
}

type WindowPreset = 'dialog' | 'form' | 'editor' | 'preview';

// ================ 使用示例 ================

@Component({
  selector: 'app-example',
  template: '...'
})
export class ExampleComponent {
  
  constructor(private windowService: WindowManagementService) {}
  
  // 打开帮助对话框
  openHelp() {
    this.windowService.openPreset('dialog', '/help/overview', 'help');
  }
  
  // 打开编辑器
  openEditor(docId: string) {
    this.windowService.openPreset('editor', \`/editor/\${docId}\`, \`editor_\${docId}\`);
  }
  
  // 自定义窗口
  openCustomWindow() {
    const config: WindowConfig = {
      url: '/custom-page',
      name: 'custom',
      width: 800,
      height: 600,
      center: true,
      i18n: true,
      minimal: true
    };
    
    this.windowService.openWindow(config);
  }
}

// ================ 最佳实践总结 ================

// 1. 窗口命名规范
// - 使用有意义的名称：'help', 'editor', 'settings'
// - 动态内容加ID：'editor_123', 'preview_doc456'
// - 避免特殊字符和空格

// 2. 尺寸和位置
// - 根据内容选择合适尺寸
// - 重要窗口居中显示
// - 考虑多显示器环境

// 3. 国际化支持
// - 内部页面启用i18n
// - 外部链接通常不需要
// - 根据用户设置选择语言

// 4. 权限和安全
// - 敏感页面检查权限
// - 外部链接安全验证
// - 弹窗拦截处理

// 5. 内存管理
// - 组件销毁时清理窗口
// - 避免重复打开相同窗口
// - 监控窗口状态变化

// 6. 用户体验
// - 提供明确的操作反馈
// - 适配移动端设备
// - 处理弹窗被阻止的情况

// ================ 错误处理和兼容性 ================

class WindowErrorHandler {
  
  static safeOpen(url: string, name: string, features?: string, i18n?: boolean): Window | null {
    try {
      const window = $hyapi.window.open(url, name, features, i18n);
      
      if (!window || window.closed) {
        $hyapi.msg.show('warning', '弹窗被阻止', {
          content: '请允许此网站显示弹窗，然后重试',
          callback: () => {
            // 重试打开
            $hyapi.window.open(url, name, features, i18n);
          }
        });
        return null;
      }
      
      return window;
    } catch (error) {
      console.error('窗口打开失败:', error);
      $hyapi.msg.show('error', '窗口打开失败', {
        content: '请检查浏览器设置或稍后重试'
      });
      return null;
    }
  }
  
  // 移动端适配
  static adaptiveOpen(url: string, name: string, config?: WindowConfig): Window | null {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // 移动端简化处理
      return $hyapi.window.open(url, name, '', config?.i18n);
    } else {
      // 桌面端使用完整配置
      const features = config ? new WindowConfigBuilder()
        .size(config.width || 800, config.height || 600)
        .center(config.width || 800, config.height || 600)
        .build() : '';
      
      return this.safeOpen(url, name, features, config?.i18n);
    }
  }
}`;

  return {
    props: args,
    template: `
      <div style="border:2px solid var(--primary-color);padding:15px;margin-bottom:15px;border-radius:8px;background:linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)">
        <h2 style="color:var(--primary-color)">📚 $hyapi.window 完整功能手册</h2>
        <p><strong>终极指南:</strong> 窗口操作的所有功能、配置选项、最佳实践、错误处理</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" size="large" (click)="allWindowFeatures()">
            📋 查看完整功能手册
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 完整API参考和最佳实践:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:10px;line-height:1.3;overflow-x:auto;border-left:4px solid var(--primary-color);max-height:600px;overflow-y:auto"><code>{{completeWindowCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:10px;background:#ffffff;border:1px solid var(--success-color);border-radius:4px;text-align:center">
            <h5 style="color:var(--success-color);margin:0 0 5px 0">🪟 open</h5>
            <p style="margin:0;font-size:11px">打开新窗口</p>
          </div>
          <div style="padding:10px;background:#ffffff;border:1px solid var(--primary-color);border-radius:4px;text-align:center">
            <h5 style="color:var(--primary-color);margin:0 0 5px 0">⚙️ features</h5>
            <p style="margin:0;font-size:11px">窗口特性配置</p>
          </div>
          <div style="padding:10px;background:#ffffff;border:1px solid var(--warning-color);border-radius:4px;text-align:center">
            <h5 style="color:var(--warning-color);margin:0 0 5px 0">🌍 i18n</h5>
            <p style="margin:0;font-size:11px">国际化支持</p>
          </div>
          <div style="padding:10px;background:#ffffff;border:1px solid var(--primary-color);border-radius:4px;text-align:center">
            <h5 style="color:var(--primary-color);margin:0 0 5px 0">🎯 target</h5>
            <p style="margin:0;font-size:11px">目标窗口控制</p>
          </div>
        </div>
        
        <div style="margin-top:20px;padding:20px;background:#ffffff;border:2px solid var(--primary-color);border-radius:8px">
          <h4 style="margin:0 0 15px 0;color:var(--primary-color)">🎓 窗口操作最佳实践总结</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <div>
              <h5 style="color:var(--primary-color);margin:0 0 10px 0">✅ 推荐做法</h5>
              <ul style="margin:0;padding-left:20px;color:var(--primary-color);font-size:13px">
                <li>使用有意义的窗口命名，便于管理和复用</li>
                <li>根据内容类型选择合适的窗口尺寸和位置</li>
                <li>内部页面启用国际化，外部链接谨慎使用</li>
                <li>实现窗口状态跟踪，避免重复打开</li>
                <li>组件销毁时清理所有打开的窗口</li>
                <li>处理弹窗被阻止的情况，提供友好提示</li>
              </ul>
            </div>
            <div>
              <h5 style="color:var(--error-color);margin:0 0 10px 0">❌ 避免做法</h5>
              <ul style="margin:0;padding-left:20px;color:var(--error-color);font-size:13px">
                <li>不要忽略弹窗权限检查和错误处理</li>
                <li>避免打开过多窗口影响用户体验</li>
                <li>不要在移动端使用复杂的窗口特性</li>
                <li>避免使用含特殊字符的窗口名称</li>
                <li>不要遗忘窗口生命周期管理</li>
                <li>避免外部不可信链接的安全风险</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="margin-top:15px;padding:15px;background:#fff9e6;border-radius:8px;border-left:5px solid var(--warning-color)">
          <h4 style="margin:0 0 10px 0;color:var(--warning-color)">💡 开发提示</h4>
          <p style="margin:0;color:var(--warning-color);font-size:13px">
            $hyapi.window 提供了灵活强大的窗口管理能力，支持窗口尺寸定制、位置控制、国际化集成等高级特性。
            从简单的链接跳转到复杂的多窗口应用，都能够轻松应对。
            <br><br>
            <strong>记住：</strong>好的窗口管理不仅要功能完备，更要考虑用户体验、安全性和兼容性！合理使用窗口功能，让用户操作更加便捷高效。
          </p>
        </div>
      </div>
    `
  };
};
export const completeWindow: Story = CompleteWindowTemplate.bind({});
completeWindow.storyName = '4️⃣ 完整功能手册'; 