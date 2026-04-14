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
class MockRouteService implements Partial<ModelService> {
  constructor() {
    _this = this;
    setTimeout(() => {
      console.log('路由复用服务已初始化', this);
    }, 100);
  }
}

export default {
  title: 'HyApi工具类文档/$hyapi.routeReuse (路由复用)',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockRouteService }, TableService]
    }),
  ],
} as Meta;

// 1. 路由返回操作
const RouteBackTemplate: Story = (args: any) => {
  args.goBackDefault = () => {
    // 模拟路由返回操作
    console.log('执行路由返回到上一级');
    $hyapi.routeReuse.goBackPrevRouterLevel();
    $hyapi.msg.createTips('info', '已返回到上一级路由');
  };

  args.goBackToLevel = () => {
    // 返回到指定级别
    console.log('执行路由返回到第2级');
    $hyapi.routeReuse.goBackPrevRouterLevel(2);
    $hyapi.msg.createTips('info', '已返回到第2级路由');
  };

  return {
    props: args,
    template: `
      <div style="border:2px solid #52c41a;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>⬅️ 路由返回操作</h2>
        <p><strong>返回导航:</strong> 在路由复用场景下返回到指定级别</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="goBackDefault()" style="margin-right:10px">
            ⬅️ 返回上一级
          </button>
          <button nz-button nzType="default" (click)="goBackToLevel()">
            ⬅️ 返回到第2级
          </button>
        </div>
        
        <div style="background:#f6ffed;padding:10px;border-radius:4px;margin-top:15px">
          <h5>🎯 使用场景：</h5>
          <ul style="margin:5px 0;padding-left:20px;font-size:12px">
            <li>详情页返回列表页</li>
            <li>表单页返回搜索页</li>
            <li>多级导航的返回操作</li>
            <li>面包屑导航跳转</li>
          </ul>
        </div>
      </div>
    `
  };
};

// 2. 路由前进操作
const RouteForwardTemplate: Story = (args: any) => {
  args.goToNext = () => {
    // 进入下一级路由
    const nextUrl = '/user/detail/123';
    console.log('进入下一级路由:', nextUrl);
    $hyapi.routeReuse.goNextRouter(nextUrl);
    $hyapi.msg.createTips('success', '已进入下一级路由');
  };

  args.clearAndGo = () => {
    // 清除缓存并跳转
    const targetUrl = '/admin/settings';
    console.log('清除缓存并跳转到:', targetUrl);
    $hyapi.routeReuse.clearAndGoNextRouter(targetUrl);
    $hyapi.msg.createTips('info', '已清除缓存并跳转到新路由');
  };

  return {
    props: args,
    template: `
      <div style="border:2px solid #1890ff;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>➡️ 路由前进操作</h2>
        <p><strong>前进导航:</strong> 进入下一级路由并管理缓存状态</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="goToNext()" style="margin-right:10px">
            ➡️ 进入下一级
          </button>
          <button nz-button nzType="default" (click)="clearAndGo()">
            🗑️ 清除缓存并跳转
          </button>
        </div>
        
        <div style="background:#f0f9ff;padding:10px;border-radius:4px;margin-top:15px">
          <h5>🎯 使用场景：</h5>
          <ul style="margin:5px 0;padding-left:20px;font-size:12px">
            <li>列表页进入详情页</li>
            <li>搜索页进入结果页</li>
            <li>跨模块的页面跳转</li>
            <li>需要清除缓存的跳转</li>
          </ul>
        </div>
      </div>
    `
  };
};

// 3. 完整使用指南
const CompleteRouteTemplate: Story = (args: any) => {
  args.showCompleteGuide = () => {
    $hyapi.msg.createTips('info', '查看控制台的完整路由复用指南');
    
    console.log(`
// ================ $hyapi.routeReuse 完整使用指南 ================

// 1. 返回上一级路由（默认）
$hyapi.routeReuse.goBackPrevRouterLevel();

// 2. 返回到指定级别路由
$hyapi.routeReuse.goBackPrevRouterLevel(2); // 返回到第2级
$hyapi.routeReuse.goBackPrevRouterLevel(3); // 返回到第3级

// 3. 进入下一级路由
$hyapi.routeReuse.goNextRouter('/user/detail/123');

// 4. 清除缓存并跳转（跨模块场景）
$hyapi.routeReuse.clearAndGoNextRouter('/admin/dashboard');

// ================ 路由复用原理 ================

/*
路由复用机制允许在路由跳转时保持页面状态：

1. 路由栈管理：
   - 每次goNextRouter时，当前页面状态被保存
   - goBackPrevRouterLevel时，恢复之前的页面状态
   - 形成类似移动端的页面栈效果

2. 缓存策略：
   - 页面组件实例保持活跃状态
   - 表单数据、滚动位置等状态被保留
   - 避免重复的网络请求和初始化

3. 内存管理：
   - clearAndGoNextRouter用于清理不需要的缓存
   - 防止内存泄漏和状态污染
*/

// ================ 实际项目应用 ================

class RouteReuseService {
  
  // 场景1：列表到详情的导航
  navigateToDetail(itemId: string) {
    // 保存当前列表状态，进入详情页
    const detailUrl = \`/user/detail/\${itemId}\`;
    $hyapi.routeReuse.goNextRouter(detailUrl);
  }
  
  // 场景2：详情页返回列表
  backToList() {
    // 返回列表页，恢复之前的状态（搜索条件、滚动位置等）
    $hyapi.routeReuse.goBackPrevRouterLevel();
  }
  
  // 场景3：编辑页面的导航
  navigateToEdit(itemId: string) {
    const editUrl = \`/user/edit/\${itemId}\`;
    $hyapi.routeReuse.goNextRouter(editUrl);
  }
  
  // 场景4：跨模块跳转（清除缓存）
  switchToAdminModule() {
    // 从用户模块跳转到管理模块，清除用户模块缓存
    $hyapi.routeReuse.clearAndGoNextRouter('/admin/dashboard');
  }
  
  // 场景5：多级返回
  backToRoot() {
    // 从深层页面直接返回到根页面
    $hyapi.routeReuse.goBackPrevRouterLevel(99); // 使用大数字确保返回到根
  }
}

// ================ 组件中的使用 ================

@Component({
  selector: 'app-user-list',
  template: \`
    <div class="user-list">
      <nz-table [nzData]="users">
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{user.name}}</td>
            <td>
              <button nz-button (click)="viewDetail(user.id)">查看详情</button>
              <button nz-button (click)="editUser(user.id)">编辑</button>
            </td>
          </tr>
        </tbody>
      </nz-table>
    </div>
  \`
})
export class UserListComponent {
  users: any[] = [];
  
  // 查看用户详情
  viewDetail(userId: string) {
    // 使用路由复用，保存当前列表状态
    $hyapi.routeReuse.goNextRouter(\`/user/detail/\${userId}\`);
  }
  
  // 编辑用户
  editUser(userId: string) {
    $hyapi.routeReuse.goNextRouter(\`/user/edit/\${userId}\`);
  }
}

@Component({
  selector: 'app-user-detail',
  template: \`
    <div class="user-detail">
      <button nz-button (click)="goBack()">返回列表</button>
      <button nz-button (click)="editUser()">编辑用户</button>
      
      <div class="user-info">
        <!-- 用户详情内容 -->
      </div>
    </div>
  \`
})
export class UserDetailComponent {
  userId: string;
  
  // 返回列表页
  goBack() {
    // 返回到列表页，恢复之前的状态
    $hyapi.routeReuse.goBackPrevRouterLevel();
  }
  
  // 进入编辑页
  editUser() {
    $hyapi.routeReuse.goNextRouter(\`/user/edit/\${this.userId}\`);
  }
}

@Component({
  selector: 'app-user-edit',
  template: \`
    <div class="user-edit">
      <button nz-button (click)="cancel()">取消</button>
      <button nz-button nzType="primary" (click)="save()">保存</button>
      
      <form>
        <!-- 编辑表单 -->
      </form>
    </div>
  \`
})
export class UserEditComponent {
  
  // 取消编辑
  cancel() {
    // 返回到详情页
    $hyapi.routeReuse.goBackPrevRouterLevel();
  }
  
  // 保存用户
  save() {
    // 保存成功后返回详情页
    this.userService.save(this.userForm.value).then(() => {
      $hyapi.msg.createTips('success', '保存成功');
      $hyapi.routeReuse.goBackPrevRouterLevel();
    });
  }
}

// ================ 路由配置 ================

// 在app-routing.module.ts中配置路由复用策略
const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: 'list', component: UserListComponent },
      { path: 'detail/:id', component: UserDetailComponent },
      { path: 'edit/:id', component: UserEditComponent }
    ]
  }
];

// ================ 最佳实践 ================

class RouteReuseBestPractices {
  
  // 1. 合理使用路由复用
  static shouldUseRouteReuse(fromRoute: string, toRoute: string): boolean {
    // 同模块内的页面适合使用路由复用
    const fromModule = fromRoute.split('/')[1];
    const toModule = toRoute.split('/')[1];
    
    return fromModule === toModule;
  }
  
  // 2. 内存管理
  static cleanupWhenNecessary() {
    // 在适当时机清理路由缓存
    // 例如：用户登出、切换角色、长时间未操作等
    $hyapi.routeReuse.clearAndGoNextRouter('/login');
  }
  
  // 3. 状态同步
  static syncDataAfterBack() {
    // 从详情页返回列表时，可能需要同步数据
    // 例如：详情页有更新操作，返回时刷新列表
  }
}

// ================ 注意事项 ================

/*
1. 内存使用：
   - 路由复用会保持组件实例在内存中
   - 深层导航栈可能消耗较多内存
   - 适时使用clearAndGoNextRouter清理

2. 数据同步：
   - 缓存的页面数据可能过期
   - 需要合适的数据更新策略
   - 考虑使用事件或状态管理同步数据

3. 用户体验：
   - 提供明确的导航指示
   - 保持一致的交互行为
   - 避免过深的导航层级

4. 测试注意：
   - 路由复用可能影响单元测试
   - 需要考虑组件生命周期的变化
   - 模拟路由栈状态进行测试
*/
    `);
  };

  return {
    props: args,
    template: `
      <div style="border:2px solid #fa8c16;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>📚 路由复用完整指南</h2>
        <p><strong>全面掌握:</strong> 路由复用的原理、使用方法和最佳实践</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" size="large" (click)="showCompleteGuide()">
            📖 查看完整使用指南
          </button>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#fff7e6;border-radius:4px">
            <h5 style="color:#fa8c16">⬅️ 返回导航</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>goBackPrevRouterLevel()</li>
              <li>返回指定级别</li>
              <li>恢复页面状态</li>
            </ul>
          </div>
          <div style="padding:15px;background:#fff7e6;border-radius:4px">
            <h5 style="color:#fa8c16">➡️ 前进导航</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>goNextRouter()</li>
              <li>保存当前状态</li>
              <li>进入下级页面</li>
            </ul>
          </div>
          <div style="padding:15px;background:#fff7e6;border-radius:4px">
            <h5 style="color:#fa8c16">🗑️ 缓存管理</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>clearAndGoNextRouter()</li>
              <li>清理路由缓存</li>
              <li>跨模块跳转</li>
            </ul>
          </div>
        </div>
        
        <div style="margin-top:15px;padding:15px;background:#fff9e6;border-radius:8px">
          <h4 style="margin:0 0 10px 0;color:#faad14">💡 最佳实践</h4>
          <ul style="margin:0;padding-left:20px;color:#666;font-size:13px">
            <li>同模块内页面使用路由复用，跨模块时清除缓存</li>
            <li>合理管理路由栈深度，避免内存过度消耗</li>
            <li>返回时考虑数据同步，确保信息准确性</li>
            <li>提供清晰的导航指示，提升用户体验</li>
          </ul>
        </div>
      </div>
    `
  };
};

export const routeBack: Story = RouteBackTemplate.bind({});
routeBack.storyName = '1️⃣ 路由返回操作';

export const routeForward: Story = RouteForwardTemplate.bind({});
routeForward.storyName = '2️⃣ 路由前进操作';

export const completeRoute: Story = CompleteRouteTemplate.bind({});
completeRoute.storyName = '3️⃣ 完整使用指南'; 