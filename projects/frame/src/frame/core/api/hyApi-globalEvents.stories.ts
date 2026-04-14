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
class MockGlobalEventsService implements Partial<ModelService> {
  constructor() {
    _this = this;
    setTimeout(() => {
      console.log('全局事件服务已初始化', this);
    }, 100);
  }
}

export default {
  title: 'HyApi工具类文档/$hyapi.globalEvents (全局事件)',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockGlobalEventsService }, TableService]
    }),
  ],
} as Meta;

// 1. 菜单事件管理
const MenuEventsTemplate: Story = (args: any) => {
  args.setMenuClickHandler = () => {
    // 设置菜单点击处理函数
    $hyapi.globalEvents.menuClickFn = () => {
      console.log('菜单被点击了！');
      $hyapi.msg.createTips('info', '菜单点击事件已处理');
    };
    
    $hyapi.msg.createTips('success', '菜单点击处理函数已设置');
  };

  args.triggerMenuClick = () => {
    // 触发菜单点击事件
    $hyapi.globalEvents.menuClick();
  };

  args.clearMenuHandler = () => {
    // 清除菜单点击处理函数
    $hyapi.globalEvents.menuClickFn = null;
    $hyapi.msg.createTips('warning', '菜单点击处理函数已清除');
  };

  return {
    props: args,
    template: `
      <div style="border:2px solid #13c2c2;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>🎯 全局菜单事件</h2>
        <p><strong>事件中心:</strong> 全局菜单点击事件的统一管理和分发</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="setMenuClickHandler()" style="margin-right:10px">
            🔧 设置菜单处理函数
          </button>
          <button nz-button nzType="default" (click)="triggerMenuClick()" style="margin-right:10px">
            🎯 触发菜单点击
          </button>
          <button nz-button nzType="dashed" (click)="clearMenuHandler()">
            🗑️ 清除处理函数
          </button>
        </div>
        
        <div style="background:#e6fffb;padding:10px;border-radius:4px;margin-top:15px">
          <h5>🎯 使用场景：</h5>
          <ul style="margin:5px 0;padding-left:20px;font-size:12px">
            <li>菜单权限检查</li>
            <li>菜单访问日志记录</li>
            <li>动态菜单状态更新</li>
            <li>跨组件的菜单事件通信</li>
          </ul>
        </div>
      </div>
    `
  };
};

// 2. 完整使用指南
const CompleteGlobalEventsTemplate: Story = (args: any) => {
  args.showCompleteGuide = () => {
    $hyapi.msg.createTips('info', '查看控制台的完整全局事件使用指南');
    
    console.log(`
// ================ $hyapi.globalEvents 完整使用指南 ================

// 1. 设置菜单点击处理函数（业务使用）
$hyapi.globalEvents.menuClickFn = (menuData?: any) => {
  console.log('菜单被点击:', menuData);
  // 执行菜单相关的业务逻辑
};

// 2. 触发菜单点击事件（框架使用）
$hyapi.globalEvents.menuClick();

// 3. 清除菜单处理函数
$hyapi.globalEvents.menuClickFn = null;

// ================ 实际项目应用 ================

class GlobalEventManager {
  constructor() {
    // 设置菜单点击处理
    $hyapi.globalEvents.menuClickFn = (menuData?: any) => {
      this.handleMenuClick(menuData);
    };
  }
  
  private handleMenuClick(menuData?: any) {
    // 1. 权限检查
    if (!this.checkMenuPermission(menuData)) {
      $hyapi.msg.show('warning', '权限不足');
      return;
    }
    
    // 2. 记录访问日志
    this.logMenuAccess(menuData);
    
    // 3. 执行菜单操作
    this.executeMenuAction(menuData);
  }
}

// ================ 组件中的使用 ================

@Component({
  selector: 'app-menu',
  template: \`
    <ul class="menu-list">
      <li *ngFor="let item of menuItems" 
          (click)="onMenuClick(item)">
        {{item.name}}
      </li>
    </ul>
  \`
})
export class MenuComponent {
  onMenuClick(menuItem: any) {
    // 触发全局菜单事件
    $hyapi.globalEvents.menuClick();
    
    // 传递菜单数据
    if ($hyapi.globalEvents.menuClickFn) {
      $hyapi.globalEvents.menuClickFn(menuItem);
    }
  }
}
    `);
  };

  return {
    props: args,
    template: `
      <div style="border:2px solid #fa8c16;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>📚 全局事件完整指南</h2>
        <p><strong>事件系统:</strong> 全局事件的设计原理和使用方法</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" size="large" (click)="showCompleteGuide()">
            📖 查看完整使用指南
          </button>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#fff7e6;border-radius:4px">
            <h5 style="color:#fa8c16">🎯 核心功能</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>menuClickFn: 菜单处理函数</li>
              <li>menuClick(): 触发菜单事件</li>
              <li>全局事件统一管理</li>
              <li>业务与框架代码解耦</li>
            </ul>
          </div>
          <div style="padding:15px;background:#fff7e6;border-radius:4px">
            <h5 style="color:#fa8c16">💼 应用场景</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>菜单权限验证</li>
              <li>访问日志记录</li>
              <li>菜单状态更新</li>
              <li>跨组件通信</li>
            </ul>
          </div>
        </div>
        
        <div style="margin-top:15px;padding:15px;background:#fff9e6;border-radius:8px">
          <h4 style="margin:0 0 10px 0;color:#faad14">💡 最佳实践</h4>
          <ul style="margin:0;padding-left:20px;color:#666;font-size:13px">
            <li>应用初始化时设置全局事件处理函数</li>
            <li>在事件处理中添加错误处理和日志记录</li>
            <li>避免在事件处理函数中执行重量级操作</li>
            <li>应用销毁时清理事件处理函数防止内存泄漏</li>
          </ul>
        </div>
      </div>
    `
  };
};

export const menuEvents: Story = MenuEventsTemplate.bind({});
menuEvents.storyName = '1️⃣ 菜单事件管理';

export const completeGlobalEvents: Story = CompleteGlobalEventsTemplate.bind({});
completeGlobalEvents.storyName = '2️⃣ 完整使用指南';
