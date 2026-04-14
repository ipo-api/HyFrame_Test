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
class MockModelService implements Partial<ModelService> {
  tableServiceMap: any = {};
  
  constructor() {
    _this = this;
    this.initMockData();
  }

  private initMockData() {
    // 模拟表单服务
    this.tableServiceMap = {
      'gt_user': {
        formService: {
          formGroup: {
            reset: () => console.log('表单重置'),
            markAsPristine: () => console.log('标记为原始状态')
          }
        }
      }
    };

    // 模拟数据
    (this as any)['gt_user'] = {
      name: '张三',
      email: 'zhangsan@example.com',
      age: 25
    };

    (this as any)['glt_users'] = [
      { id: 1, name: '用户1', status: 'active' },
      { id: 2, name: '用户2', status: 'inactive' }
    ];

    (this as any)['glt_users_$Property'] = {
      curPage: 1,
      pageSize: 10,
      count: 50
    };
  }
}

export default {
  title: 'HyApi工具类文档/$hyapi.model (数据模型操作)',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockModelService }, TableService]
    }),
  ],
} as Meta;

// 1. 单记录表操作
const SingleRecordTemplate: Story = (args: any) => {
  args.initGt = () => {
    $hyapi.model.initGt(_this, 'gt_user', true);
    $hyapi.msg.createTips('success', '单记录表初始化完成');
  };

  args.setGtData = () => {
    const userData = {
      name: '李四',
      email: 'lisi@example.com',
      age: 28,
      department: '技术部'
    };
    
    $hyapi.model.setGtData(_this, 'gt_user', userData);
    console.log('设置后的数据:', (_this as any)['gt_user']);
    $hyapi.msg.createTips('success', '单记录表数据设置完成');
  };

  args.markAsPristine = () => {
    $hyapi.model.markAsPristine(_this, 'gt_user');
    $hyapi.msg.createTips('info', '表单已标记为原始状态');
  };

  return {
    props: args,
    template: `
      <div style="border:2px solid #52c41a;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>📋 单记录表操作</h2>
        <p><strong>GT模型:</strong> 单条记录的增删改查和状态管理</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="initGt()" style="margin-right:10px">
            🆕 初始化GT
          </button>
          <button nz-button nzType="default" (click)="setGtData()" style="margin-right:10px">
            📝 设置GT数据
          </button>
          <button nz-button nzType="dashed" (click)="markAsPristine()">
            ✨ 标记原始状态
          </button>
        </div>
        
        <div style="background:#f6ffed;padding:10px;border-radius:4px;margin-top:15px">
          <h5>🎯 使用场景：</h5>
          <ul style="margin:5px 0;padding-left:20px;font-size:12px">
            <li>用户信息编辑表单</li>
            <li>系统配置页面</li>
            <li>详情查看页面</li>
            <li>单条数据的CRUD操作</li>
          </ul>
        </div>
      </div>
    `
  };
};

// 2. 多记录表操作  
const MultiRecordTemplate: Story = (args: any) => {
  args.initGlt = () => {
    $hyapi.model.initGlt(_this, 'glt_users');
    $hyapi.msg.createTips('success', '多记录表初始化完成');
  };

  args.setGltData = () => {
    const usersData = [
      { id: 1, name: '新用户1', status: 'active', createTime: '2024-01-01' },
      { id: 2, name: '新用户2', status: 'pending', createTime: '2024-01-02' },
      { id: 3, name: '新用户3', status: 'inactive', createTime: '2024-01-03' }
    ];
    
    $hyapi.model.setGltData(_this, 'glt_users', usersData);
    console.log('设置后的数据:', (_this as any)['glt_users']);
    $hyapi.msg.createTips('success', '多记录表数据设置完成');
  };

  args.getPageInfo = () => {
    const pageInfo = $hyapi.model.getGltPageInfo(_this, 'glt_users');
    console.log('分页信息:', pageInfo);
    $hyapi.msg.createTips('info', `当前页：${pageInfo?.curPage || 1}，每页：${pageInfo?.pageSize || 10}条`);
  };

  args.setPageInfo = () => {
    const newPageInfo = {
      curPage: 2,
      pageSize: 20,
      count: 100
    };
    
    $hyapi.model.setGltPageInfo(_this, 'glt_users', newPageInfo);
    $hyapi.msg.createTips('success', '分页信息已更新');
  };

  return {
    props: args,
    template: `
      <div style="border:2px solid var(--primary-color);padding-bottom:15px;border-radius:8px">
        <h2>📊 多记录表操作</h2>
        <p><strong>GLT模型:</strong> 列表数据和分页信息管理</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="initGlt()" style="margin-right:10px">
            🆕 初始化GLT
          </button>
          <button nz-button nzType="default" (click)="setGltData()" style="margin-right:10px">
            📝 设置GLT数据
          </button>
          <button nz-button nzType="dashed" (click)="getPageInfo()" style="margin-right:10px">
            📄 获取分页信息
          </button>
          <button nz-button nzType="ghost" (click)="setPageInfo()">
            ⚙️ 设置分页信息
          </button>
        </div>
        
        <div style="background:#f0f9ff;padding:10px;border-radius:4px;margin-top:15px">
          <h5>🎯 使用场景：</h5>
          <ul style="margin:5px 0;padding-left:20px;font-size:12px">
            <li>数据表格显示</li>
            <li>列表页面管理</li>
            <li>分页数据加载</li>
            <li>批量数据操作</li>
          </ul>
        </div>
      </div>
    `
  };
};

// 3. 完整使用示例
const CompleteExampleTemplate: Story = (args: any) => {
  args.completeExample = () => {
    $hyapi.msg.createTips('info', '查看控制台的完整使用示例');
    
    console.log(`
// ================ $hyapi.model 完整使用示例 ================

// 1. 初始化单记录表
$hyapi.model.initGt(mds, 'gt_user', true);

// 2. 设置单记录数据
$hyapi.model.setGtData(mds, 'gt_user', {
  name: '张三',
  email: 'zhangsan@example.com',
  department: '技术部'
});

// 3. 初始化多记录表
$hyapi.model.initGlt(mds, 'glt_users');

// 4. 设置多记录数据
$hyapi.model.setGltData(mds, 'glt_users', [
  { id: 1, name: '用户1' },
  { id: 2, name: '用户2' }
]);

// 5. 分页信息管理
const pageInfo = $hyapi.model.getGltPageInfo(mds, 'glt_users');
$hyapi.model.setGltPageInfo(mds, 'glt_users', {
  curPage: 2,
  pageSize: 20,
  count: 100
});

// 6. 表单状态管理
$hyapi.model.markAsPristine(mds, 'gt_user');

// ================ 实际项目应用 ================

class UserManagementService {
  constructor(private mds: ModelService) {}
  
  // 初始化用户编辑表单
  initUserForm() {
    $hyapi.model.initGt(this.mds, 'gt_user');
  }
  
  // 加载用户数据到表单
  loadUserToForm(userData: any) {
    $hyapi.model.setGtData(this.mds, 'gt_user', userData);
  }
  
  // 加载用户列表
  loadUserList(users: any[], pageInfo: any) {
    $hyapi.model.initGlt(this.mds, 'glt_users');
    $hyapi.model.setGltData(this.mds, 'glt_users', users);
    $hyapi.model.setGltPageInfo(this.mds, 'glt_users', pageInfo);
  }
  
  // 翻页处理
  handlePageChange(page: number) {
    const currentPageInfo = $hyapi.model.getGltPageInfo(this.mds, 'glt_users');
    $hyapi.model.setGltPageInfo(this.mds, 'glt_users', {
      ...currentPageInfo,
      curPage: page
    });
    
    // 重新加载数据
    this.loadPageData(page);
  }
}
    `);
  };

  return {
    props: args,
    template: `
      <div style="border:2px solid #fa8c16;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>📚 完整使用指南</h2>
        <p><strong>全面掌握:</strong> 数据模型操作的所有方法和最佳实践</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" size="large" (click)="completeExample()">
            📖 查看完整示例代码
          </button>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#fff7e6;border-radius:4px">
            <h5 style="color:#fa8c16">📋 GT单记录表</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>initGt(): 初始化表单</li>
              <li>setGtData(): 设置数据</li>
              <li>markAsPristine(): 状态管理</li>
            </ul>
          </div>
          <div style="padding:15px;background:#fff7e6;border-radius:4px">
            <h5 style="color:#fa8c16">📊 GLT多记录表</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>initGlt(): 初始化列表</li>
              <li>setGltData(): 设置列表数据</li>
              <li>getGltPageInfo(): 获取分页</li>
              <li>setGltPageInfo(): 设置分页</li>
            </ul>
          </div>
        </div>
        
        <div style="margin-top:15px;padding:15px;background:#fff9e6;border-radius:8px">
          <h4 style="margin:0 0 10px 0;color:#faad14">💡 最佳实践</h4>
          <ul style="margin:0;padding-left:20px;color:#666;font-size:13px">
            <li>页面初始化时调用init方法清理数据</li>
            <li>使用setGtData和setGltData统一数据赋值</li>
            <li>分页信息与列表数据保持同步</li>
            <li>表单提交后及时更新数据状态</li>
          </ul>
        </div>
      </div>
    `
  };
};

export const singleRecord: Story = SingleRecordTemplate.bind({});
singleRecord.storyName = '1️⃣ 单记录表操作';

export const multiRecord: Story = MultiRecordTemplate.bind({});
multiRecord.storyName = '2️⃣ 多记录表操作';

export const completeExample: Story = CompleteExampleTemplate.bind({});
completeExample.storyName = '3️⃣ 完整使用指南'; 