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
class MockDialogService implements Partial<ModelService> {
    private $dicCache: any = {};

  public tableServiceMap: any = {};

  constructor() {
    _this = this;
    setTimeout(() => {
      console.log('模板弹窗服务已初始化', this);
    }, 100);
  }
}

export default {
  title: 'HyApi工具类文档/$hyapi.dialog (模板弹窗)',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockDialogService }, TableService]
    }),
  ],
} as Meta;

// 1. 基础模板弹窗
const BasicDialogTemplate: Story = (args: any) => {
  args.showBasicDialog = () => {
    // 创建模板内容
    const templateContent = document.createElement('div');
    templateContent.innerHTML = `
      <div style="padding: 20px;">
        <h3>用户详情</h3>
        <div style="margin: 15px 0;">
          <p><strong>姓名:</strong> 张三</p>
          <p><strong>邮箱:</strong> zhangsan@example.com</p>
          <p><strong>部门:</strong> 技术部</p>
          <p><strong>职位:</strong> 前端开发工程师</p>
        </div>
        <div style="text-align: right; margin-top: 20px;">
          <button class="ant-btn ant-btn-default" onclick="closeDialog()">关闭</button>
        </div>
      </div>
    `;

    // 模拟TemplateRef
    const mockTemplateRef = {
      elementRef: { nativeElement: templateContent },
      createEmbeddedView: () => ({ rootNodes: [templateContent] })
    } as any;

    const dialogRef = $hyapi.dialog.show(mockTemplateRef, {
      title: '查看用户信息',
      width: '500px',
      closable: true,
      callback: () => {
        console.log('弹窗关闭回调');
      }
    });

    // 为关闭按钮添加事件处理
    (window as any).closeDialog = () => {
      $hyapi.dialog.close(dialogRef);
    };
  };

  args.showCustomDialog = () => {
    const templateContent = document.createElement('div');
    templateContent.innerHTML = `
      <div style="padding: 20px;">
        <h3>编辑用户信息</h3>
        <form style="margin: 20px 0;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">姓名:</label>
            <input type="text" value="张三" style="width: 100%; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">邮箱:</label>
            <input type="email" value="zhangsan@example.com" style="width: 100%; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">部门:</label>
            <select style="width: 100%; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px;">
              <option value="tech">技术部</option>
              <option value="sales">销售部</option>
              <option value="hr">人事部</option>
            </select>
          </div>
        </form>
        <div style="text-align: right; border-top: 1px solid #f0f0f0; padding-top: 15px; margin-top: 20px;">
          <button class="ant-btn ant-btn-default" onclick="cancelEdit()" style="margin-right: 10px;">取消</button>
          <button class="ant-btn ant-btn-primary" onclick="saveEdit()">保存</button>
        </div>
      </div>
    `;

    const mockTemplateRef = {
      elementRef: { nativeElement: templateContent },
      createEmbeddedView: () => ({ rootNodes: [templateContent] })
    } as any;

    const dialogRef = $hyapi.dialog.show(mockTemplateRef, {
      title: '编辑用户',
      width: '600px',
      closable: false,  // 不允许点击遮罩关闭
      callback: () => {
        console.log('编辑弹窗关闭');
      }
    });

    // 按钮事件处理
    (window as any).cancelEdit = () => {
      $hyapi.msg.confirm('确定要取消编辑吗？未保存的修改将丢失。', {
        callback: () => {
          $hyapi.dialog.close(dialogRef);
        }
      });
    };

    (window as any).saveEdit = () => {
      $hyapi.msg.createTips('success', '用户信息保存成功');
      $hyapi.dialog.close(dialogRef);
    };
  };

  args.basicDialogCode = `
// ================ 基础模板弹窗 ================

// 1. 基础用法
const dialogRef = $hyapi.dialog.show(templateRef, {
  title: '查看用户信息',
  width: '500px',
  closable: true,
  callback: () => {
    console.log('弹窗关闭回调');
  }
});

// 2. 手动关闭弹窗
$hyapi.dialog.close(dialogRef);

// 3. 关闭所有弹窗
$hyapi.dialog.closeAll();

// ================ 配置选项详解 ================
{
  title: string | TemplateRef<any>,    // 弹窗标题
  width: string | number,              // 弹窗宽度，如 '500px' 或 500
  closable: boolean,                   // 是否显示关闭按钮，默认 true
  callback: () => void,                // 弹窗关闭后的回调函数
  cancel: () => void                   // 取消操作的回调函数
}

// ================ 模板内容创建方式 ================

// 方式1：在组件中使用 ViewChild 获取模板引用
@Component({
  template: \`
    <ng-template #userDetailTemplate>
      <div class="dialog-content">
        <h3>用户详情</h3>
        <div class="user-info">
          <p><strong>姓名:</strong> {{user.name}}</p>
          <p><strong>邮箱:</strong> {{user.email}}</p>
          <p><strong>部门:</strong> {{user.department}}</p>
        </div>
        <div class="dialog-footer">
          <button nz-button (click)="closeDialog()">关闭</button>
        </div>
      </div>
    </ng-template>
  \`
})
export class UserComponent {
  @ViewChild('userDetailTemplate') userDetailTemplate: TemplateRef<any>;
  
  user = {
    name: '张三',
    email: 'zhangsan@example.com',
    department: '技术部'
  };
  
  private dialogRef: any;
  
  showUserDetail() {
    this.dialogRef = $hyapi.dialog.show(this.userDetailTemplate, {
      title: '用户详情',
      width: '500px',
      callback: () => {
        console.log('用户详情弹窗已关闭');
      }
    });
  }
  
  closeDialog() {
    $hyapi.dialog.close(this.dialogRef);
  }
}

// 方式2：动态创建模板内容
createDynamicDialog(userData: any) {
  // 创建动态内容
  const content = this.createUserContent(userData);
  
  const dialogRef = $hyapi.dialog.show(content, {
    title: \`用户: \${userData.name}\`,
    width: '600px',
    closable: true
  });
  
  return dialogRef;
}

private createUserContent(user: any): TemplateRef<any> {
  // 这里可以动态创建模板内容
  // 实际项目中可能需要使用 ComponentFactoryResolver 创建动态组件
}

// ================ 实际使用场景 ================

class DialogUsageExamples {
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  // 场景1：查看详情弹窗
  @ViewChild('detailTemplate') detailTemplate: TemplateRef<any>;
  
  selectedItem: any = null;
  
  showItemDetail(item: any) {
    this.selectedItem = item;
    this.cdr.detectChanges(); // 确保数据更新
    
    const dialogRef = $hyapi.dialog.show(this.detailTemplate, {
      title: \`\${item.name} - 详细信息\`,
      width: '700px',
      closable: true,
      callback: () => {
        this.selectedItem = null; // 清理数据
      }
    });
  }
  
  // 场景2：编辑表单弹窗
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
  
  editFormData: any = {};
  
  showEditDialog(item: any) {
    // 复制数据以防止直接修改原数据
    this.editFormData = { ...item };
    this.cdr.detectChanges();
    
    const dialogRef = $hyapi.dialog.show(this.editTemplate, {
      title: '编辑信息',
      width: '600px',
      closable: false, // 防止意外关闭
      callback: () => {
        this.editFormData = {}; // 清理表单数据
      }
    });
    
    // 保存dialogRef以便后续关闭
    this.currentDialogRef = dialogRef;
  }
  
  private currentDialogRef: any;
  
  saveEdit() {
    // 验证表单
    if (this.validateForm(this.editFormData)) {
      // 保存数据
      this.saveData(this.editFormData).then(() => {
        $hyapi.msg.createTips('success', '保存成功');
        $hyapi.dialog.close(this.currentDialogRef);
      }).catch(error => {
        $hyapi.msg.show('error', '保存失败', {
          content: error.message
        });
      });
    }
  }
  
  cancelEdit() {
    $hyapi.msg.confirm('确定要取消编辑吗？未保存的修改将丢失。', {
      callback: () => {
        $hyapi.dialog.close(this.currentDialogRef);
      }
    });
  }
  
  // 场景3：确认操作弹窗
  @ViewChild('confirmTemplate') confirmTemplate: TemplateRef<any>;
  
  showCustomConfirm(action: string, details: any) {
    this.confirmAction = action;
    this.confirmDetails = details;
    this.cdr.detectChanges();
    
    const dialogRef = $hyapi.dialog.show(this.confirmTemplate, {
      title: '确认操作',
      width: '500px',
      closable: true
    });
    
    this.confirmDialogRef = dialogRef;
  }
  
  confirmAction: string = '';
  confirmDetails: any = {};
  confirmDialogRef: any;
  
  executeConfirmedAction() {
    // 执行确认的操作
    this.performAction(this.confirmAction, this.confirmDetails);
    $hyapi.dialog.close(this.confirmDialogRef);
  }
  
  // 场景4：多步骤向导弹窗
  @ViewChild('wizardTemplate') wizardTemplate: TemplateRef<any>;
  
  wizardStep: number = 1;
  wizardData: any = {};
  
  showWizard() {
    this.wizardStep = 1;
    this.wizardData = {};
    
    const dialogRef = $hyapi.dialog.show(this.wizardTemplate, {
      title: '设置向导',
      width: '800px',
      closable: false,
      callback: () => {
        this.resetWizard();
      }
    });
    
    this.wizardDialogRef = dialogRef;
  }
  
  wizardDialogRef: any;
  
  nextWizardStep() {
    if (this.validateWizardStep(this.wizardStep)) {
      this.wizardStep++;
      this.cdr.detectChanges();
    }
  }
  
  prevWizardStep() {
    if (this.wizardStep > 1) {
      this.wizardStep--;
      this.cdr.detectChanges();
    }
  }
  
  completeWizard() {
    if (this.validateWizardStep(this.wizardStep)) {
      // 提交向导数据
      this.submitWizardData(this.wizardData).then(() => {
        $hyapi.msg.createTips('success', '设置完成');
        $hyapi.dialog.close(this.wizardDialogRef);
      });
    }
  }
}

// ================ 高级特性：动态更新弹窗 ================

class AdvancedDialogFeatures {
  
  // 动态更新弹窗配置
  updateDialog(dialogRef: any, newConfig: any) {
    $hyapi.dialog.updateConfig(dialogRef, {
      width: newConfig.width,
      title: newConfig.title,
      closable: newConfig.closable,
      content: newConfig.content
    });
  }
  
  // 响应式弹窗宽度
  getResponsiveWidth(): string {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      return '95%';  // 移动端
    } else if (screenWidth < 1200) {
      return '70%';  // 平板
    } else {
      return '50%';  // 桌面端
    }
  }
  
  // 弹窗栈管理
  private dialogStack: any[] = [];
  
  showStackedDialog(template: TemplateRef<any>, config: any) {
    const dialogRef = $hyapi.dialog.show(template, config);
    this.dialogStack.push(dialogRef);
    return dialogRef;
  }
  
  closeTopDialog() {
    if (this.dialogStack.length > 0) {
      const topDialog = this.dialogStack.pop();
      $hyapi.dialog.close(topDialog);
    }
  }
  
  closeAllStackedDialogs() {
    while (this.dialogStack.length > 0) {
      const dialog = this.dialogStack.pop();
      $hyapi.dialog.close(dialog);
    }
  }
  
  // 弹窗数据传递
  showDialogWithData<T>(
    template: TemplateRef<any>, 
    data: T,
    config: any
  ): Promise<T | null> {
    return new Promise((resolve) => {
      // 将数据暴露给模板
      this.dialogData = data;
      this.cdr.detectChanges();
      
      const dialogRef = $hyapi.dialog.show(template, {
        ...config,
        callback: () => {
          resolve(this.dialogResult);
          this.dialogData = null;
          this.dialogResult = null;
        },
        cancel: () => {
          resolve(null);
          this.dialogData = null;
          this.dialogResult = null;
        }
      });
      
      this.currentDialogRef = dialogRef;
    });
  }
  
  dialogData: any = null;
  dialogResult: any = null;
  currentDialogRef: any = null;
  
  // 使用示例
  async openUserEditor(user: any) {
    const result = await this.showDialogWithData(
      this.userEditorTemplate,
      { ...user },
      { title: '编辑用户', width: '600px' }
    );
    
    if (result) {
      // 用户确认了修改
      await this.saveUser(result);
      $hyapi.msg.createTips('success', '用户信息已更新');
    }
  }
  
  confirmDialogData() {
    this.dialogResult = this.dialogData;
    $hyapi.dialog.close(this.currentDialogRef);
  }
}`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #13c2c2;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>🎭 基础模板弹窗功能</h2>
        <p><strong>核心功能:</strong> 自定义内容弹窗、模板渲染、灵活配置、事件处理</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="showBasicDialog()" style="margin-right:10px">
            👁️ 查看详情弹窗
          </button>
          <button nz-button nzType="default" (click)="showCustomDialog()">
            ✏️ 编辑表单弹窗
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 模板弹窗详细使用指南:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #13c2c2"><code>{{basicDialogCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#e6fffb;border-radius:4px;border:1px solid #87e8de">
            <h5 style="color:#13c2c2;margin:0 0 10px 0">🎯 核心特性</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>自定义模板内容</li>
              <li>灵活的配置选项</li>
              <li>完整的生命周期管理</li>
              <li>响应式设计支持</li>
            </ul>
          </div>
          <div style="padding:15px;background:#e6fffb;border-radius:4px;border:1px solid #87e8de">
            <h5 style="color:#13c2c2;margin:0 0 10px 0">💼 使用场景</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>详情查看弹窗</li>
              <li>表单编辑弹窗</li>
              <li>多步骤向导</li>
              <li>自定义确认框</li>
            </ul>
          </div>
          <div style="padding:15px;background:#e6fffb;border-radius:4px;border:1px solid #87e8de">
            <h5 style="color:#13c2c2;margin:0 0 10px 0">⚙️ 高级功能</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>动态配置更新</li>
              <li>弹窗栈管理</li>
              <li>数据传递机制</li>
              <li>响应式宽度</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
};
export const basicDialog: Story = BasicDialogTemplate.bind({});
basicDialog.storyName = '1️⃣ 基础模板弹窗';

// 2. 动态配置更新
const DynamicConfigTemplate: Story = (args: any) => {
  args.showConfigurableDialog = () => {
    const templateContent = document.createElement('div');
    templateContent.innerHTML = `
      <div style="padding: 20px;">
        <h3>动态配置演示</h3>
        <div style="margin: 20px 0;">
          <p>这个弹窗的配置可以动态修改</p>
          <div style="margin: 15px 0;">
            <button class="ant-btn ant-btn-default" onclick="changeWidth()" style="margin-right: 10px;">改变宽度</button>
            <button class="ant-btn ant-btn-default" onclick="changeTitle()" style="margin-right: 10px;">改变标题</button>
            <button class="ant-btn ant-btn-default" onclick="toggleClosable()">切换关闭按钮</button>
          </div>
        </div>
        <div style="text-align: right; border-top: 1px solid #f0f0f0; padding-top: 15px; margin-top: 20px;">
          <button class="ant-btn ant-btn-primary" onclick="closeConfigDialog()">关闭</button>
        </div>
      </div>
    `;

    const mockTemplateRef = {
      elementRef: { nativeElement: templateContent },
      createEmbeddedView: () => ({ rootNodes: [templateContent] })
    } as any;

    const dialogRef = $hyapi.dialog.show(mockTemplateRef, {
      title: '可配置弹窗',
      width: '500px',
      closable: true
    });

    let currentWidth = '500px';
    let currentTitle = '可配置弹窗';
    let isClosable = true;

    // 动态配置方法
    (window as any).changeWidth = () => {
      currentWidth = currentWidth === '500px' ? '800px' : '500px';
      $hyapi.dialog.updateConfig(dialogRef, {
        width: currentWidth
      });
      $hyapi.msg.createTips('info', `宽度已改为 ${currentWidth}`);
    };

    (window as any).changeTitle = () => {
      currentTitle = currentTitle === '可配置弹窗' ? '已修改标题' : '可配置弹窗';
      $hyapi.dialog.updateConfig(dialogRef, {
      });
      $hyapi.msg.createTips('info', '标题已更新');
    };

    (window as any).toggleClosable = () => {
      isClosable = !isClosable;
      $hyapi.dialog.updateConfig(dialogRef, {
        closable: isClosable
      });
      $hyapi.msg.createTips('info', `关闭按钮已${isClosable ? '显示' : '隐藏'}`);
    };

    (window as any).closeConfigDialog = () => {
      $hyapi.dialog.close(dialogRef);
    };
  };

  args.dynamicConfigCode = `
// ================ 动态配置更新 ================

// 显示弹窗
const dialogRef = $hyapi.dialog.show(templateRef, {
  title: '初始标题',
  width: '500px',
  closable: true
});

// 动态更新配置
$hyapi.dialog.updateConfig(dialogRef, {
  width: '800px',                    // 更新宽度
  title: '新的标题',                  // 更新标题
  closable: false,                   // 禁用关闭按钮
  content: '新的内容'                 // 更新内容
});

// ================ updateConfig 配置选项 ================
{
  closable?: boolean,               // 是否可关闭
  width?: string | number,          // 弹窗宽度
  content?: string | TemplateRef,   // 弹窗内容
  title?: string | TemplateRef      // 弹窗标题
}

// ================ 实际应用场景 ================

class DynamicDialogManager {
  
  private currentDialog: any = null;
  private dialogConfig = {
    width: '500px',
    title: '默认标题',
    closable: true
  };
  
  // 响应式宽度调整
  adjustDialogWidth() {
    if (!this.currentDialog) return;
    
    const screenWidth = window.innerWidth;
    let newWidth: string;
    
    if (screenWidth < 768) {
      newWidth = '95%';  // 移动端
    } else if (screenWidth < 1200) {
      newWidth = '70%';  // 平板
    } else {
      newWidth = '50%';  // 桌面端
    }
    
    $hyapi.dialog.updateConfig(this.currentDialog, {
      width: newWidth
    });
    
    this.dialogConfig.width = newWidth;
  }
  
  // 根据内容动态调整
  adjustDialogByContent(contentType: string) {
    if (!this.currentDialog) return;
    
    let config: any = {};
    
    switch (contentType) {
      case 'form':
        config = {
          width: '600px',
          title: '表单编辑',
          closable: false  // 防止误关闭
        };
        break;
      case 'detail':
        config = {
          width: '800px',
          title: '详细信息',
          closable: true
        };
        break;
      case 'confirm':
        config = {
          width: '400px',
          title: '确认操作',
          closable: false
        };
        break;
    }
    
    $hyapi.dialog.updateConfig(this.currentDialog, config);
    Object.assign(this.dialogConfig, config);
  }
  
  // 步骤式配置更新
  updateDialogStep(step: number, totalSteps: number) {
    if (!this.currentDialog) return;
    
    const title = \`步骤 \${step}/\${totalSteps}\`;
    const closable = step === totalSteps; // 只有最后一步可以关闭
    
    $hyapi.dialog.updateConfig(this.currentDialog, {
      title,
      closable
    });
  }
  
  // 权限控制配置
  updateDialogByPermission(userRole: string) {
    if (!this.currentDialog) return;
    
    const isAdmin = userRole === 'admin';
    
    $hyapi.dialog.updateConfig(this.currentDialog, {
      closable: isAdmin,  // 只有管理员可以随意关闭
      title: isAdmin ? '管理员模式' : '普通用户模式'
    });
  }
}

// ================ 实时配置监听 ================

class ResponsiveDialogManager {
  
  private currentDialog: any = null;
  private resizeObserver: ResizeObserver;
  
  constructor() {
    this.initResizeObserver();
  }
  
  showResponsiveDialog(template: TemplateRef<any>) {
    this.currentDialog = $hyapi.dialog.show(template, {
      title: '响应式弹窗',
      width: this.getOptimalWidth(),
      closable: true,
      callback: () => {
        this.cleanup();
      }
    });
    
    // 开始监听窗口变化
    this.startResponsiveTracking();
  }
  
  private initResizeObserver() {
    this.resizeObserver = new ResizeObserver((entries) => {
      if (this.currentDialog) {
        this.adjustDialogResponsive();
      }
    });
  }
  
  private startResponsiveTracking() {
    // 监听窗口大小变化
    this.resizeObserver.observe(document.body);
  }
  
  private adjustDialogResponsive() {
    const newWidth = this.getOptimalWidth();
    
    $hyapi.dialog.updateConfig(this.currentDialog, {
      width: newWidth
    });
  }
  
  private getOptimalWidth(): string {
    const screenWidth = window.innerWidth;
    
    if (screenWidth < 576) {
      return '100%';
    } else if (screenWidth < 768) {
      return '90%';
    } else if (screenWidth < 992) {
      return '75%';
    } else if (screenWidth < 1200) {
      return '60%';
    } else {
      return '50%';
    }
  }
  
  private cleanup() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.currentDialog = null;
  }
}

// ================ 主题和样式动态切换 ================

class ThemeDialogManager {
  
  private currentDialog: any = null;
  private currentTheme = 'light';
  
  showThemeableDialog(template: TemplateRef<any>) {
    this.currentDialog = $hyapi.dialog.show(template, {
      title: '主题弹窗',
      width: '600px',
      closable: true
    });
    
    this.applyTheme(this.currentTheme);
  }
  
  switchTheme(theme: 'light' | 'dark') {
    this.currentTheme = theme;
    this.applyTheme(theme);
  }
  
  private applyTheme(theme: string) {
    if (!this.currentDialog) return;
    
    // 这里可以动态更新弹窗的样式类
    // 实际实现中可能需要通过CSS类或者内联样式来实现主题切换
    
    const themeConfig = {
      light: {
        title: '☀️ 明亮主题弹窗'
      },
      dark: {
        title: '🌙 暗黑主题弹窗'
      }
    };
    
    $hyapi.dialog.updateConfig(this.currentDialog, themeConfig[theme]);
  }
}

// ================ 状态驱动的配置更新 ================

class StateDialogManager {
  
  private dialogState = {
    loading: false,
    editing: false,
    saving: false,
    error: null
  };
  
  private currentDialog: any = null;
  
  updateDialogByState() {
    if (!this.currentDialog) return;
    
    let title = '数据管理';
    let closable = true;
    
    if (this.dialogState.loading) {
      title = '⏳ 加载中...';
      closable = false;
    } else if (this.dialogState.saving) {
      title = '💾 保存中...';
      closable = false;
    } else if (this.dialogState.editing) {
      title = '✏️ 编辑模式';
      closable = false;
    } else if (this.dialogState.error) {
      title = '❌ 操作失败';
      closable = true;
    }
    
    $hyapi.dialog.updateConfig(this.currentDialog, {
      title,
      closable
    });
  }
  
  setState(newState: Partial<typeof this.dialogState>) {
    Object.assign(this.dialogState, newState);
    this.updateDialogByState();
  }
  
  // 使用示例
  async saveData() {
    this.setState({ saving: true });
    
    try {
      await this.performSave();
      this.setState({ saving: false, editing: false });
      $hyapi.msg.createTips('success', '保存成功');
    } catch (error) {
      this.setState({ 
        saving: false, 
        error: error.message 
      });
    }
  }
}`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #eb2f96;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>🛠️ 动态配置更新功能</h2>
        <p><strong>核心能力:</strong> 实时配置修改、响应式调整、状态驱动更新、主题切换</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="showConfigurableDialog()">
            🎛️ 可配置弹窗演示
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 动态配置完整解决方案:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #eb2f96"><code>{{dynamicConfigCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#fff0f6;border-radius:4px;border:1px solid #ffadd2">
            <h5 style="color:#eb2f96;margin:0 0 10px 0">🎯 更新类型</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>宽度尺寸调整</li>
              <li>标题内容更新</li>
              <li>关闭权限控制</li>
              <li>内容动态替换</li>
            </ul>
          </div>
          <div style="padding:15px;background:#fff0f6;border-radius:4px;border:1px solid #ffadd2">
            <h5 style="color:#eb2f96;margin:0 0 10px 0">📱 响应式特性</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>屏幕尺寸适配</li>
              <li>设备类型检测</li>
              <li>实时监听调整</li>
              <li>布局优化</li>
            </ul>
          </div>
          <div style="padding:15px;background:#fff0f6;border-radius:4px;border:1px solid #ffadd2">
            <h5 style="color:#eb2f96;margin:0 0 10px 0">🎨 高级应用</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>状态驱动更新</li>
              <li>权限控制配置</li>
              <li>主题样式切换</li>
              <li>步骤流程管理</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
};
export const dynamicConfig: Story = DynamicConfigTemplate.bind({});
dynamicConfig.storyName = '2️⃣ 动态配置更新';

// 3. 弹窗管理和批量操作
const DialogManagementTemplate: Story = (args: any) => {
  args.showMultipleDialogs = () => {
    // 第一个弹窗
    const template1 = document.createElement('div');
    template1.innerHTML = `
      <div style="padding: 20px;">
        <h3>第一个弹窗</h3>
        <p>这是第一个弹窗的内容</p>
        <button class="ant-btn ant-btn-default" onclick="showSecond()" style="margin-right: 10px;">打开第二个</button>
        <button class="ant-btn ant-btn-primary" onclick="closeFirst()">关闭</button>
      </div>
    `;

    const mockTemplate1 = {
      elementRef: { nativeElement: template1 },
      createEmbeddedView: () => ({ rootNodes: [template1] })
    } as any;

    const dialog1 = $hyapi.dialog.show(mockTemplate1, {
      title: '弹窗 1',
      width: '400px',
      closable: true
    });

    (window as any).showSecond = () => {
      // 第二个弹窗
      const template2 = document.createElement('div');
      template2.innerHTML = `
        <div style="padding: 20px;">
          <h3>第二个弹窗</h3>
          <p>这是第二个弹窗的内容，在第一个弹窗之上</p>
          <button class="ant-btn ant-btn-default" onclick="showThird()" style="margin-right: 10px;">打开第三个</button>
          <button class="ant-btn ant-btn-primary" onclick="closeSecond()">关闭</button>
        </div>
      `;

      const mockTemplate2 = {
        elementRef: { nativeElement: template2 },
        createEmbeddedView: () => ({ rootNodes: [template2] })
      } as any;

      const dialog2 = $hyapi.dialog.show(mockTemplate2, {
        title: '弹窗 2',
        width: '450px',
        closable: true
      });

      (window as any).showThird = () => {
        // 第三个弹窗
        const template3 = document.createElement('div');
        template3.innerHTML = `
          <div style="padding: 20px;">
            <h3>第三个弹窗</h3>
            <p>这是第三个弹窗，现在有三个弹窗叠加</p>
            <button class="ant-btn ant-btn-danger" onclick="closeAllDialogs()" style="margin-right: 10px;">关闭所有</button>
            <button class="ant-btn ant-btn-primary" onclick="closeThird()">关闭当前</button>
          </div>
        `;

        const mockTemplate3 = {
          elementRef: { nativeElement: template3 },
          createEmbeddedView: () => ({ rootNodes: [template3] })
        } as any;

        const dialog3 = $hyapi.dialog.show(mockTemplate3, {
          title: '弹窗 3',
          width: '500px',
          closable: true
        });

        (window as any).closeThird = () => {
          $hyapi.dialog.close(dialog3);
        };
      };

      (window as any).closeSecond = () => {
        $hyapi.dialog.close(dialog2);
      };
    };

    (window as any).closeFirst = () => {
      $hyapi.dialog.close(dialog1);
    };

    (window as any).closeAllDialogs = () => {
      $hyapi.dialog.closeAll();
    };
  };

  args.managementCode = `
// ================ 弹窗管理和批量操作 ================

// 1. 显示多个弹窗
const dialog1 = $hyapi.dialog.show(template1, { title: '弹窗1', width: '400px' });
const dialog2 = $hyapi.dialog.show(template2, { title: '弹窗2', width: '450px' });
const dialog3 = $hyapi.dialog.show(template3, { title: '弹窗3', width: '500px' });

// 2. 关闭指定弹窗
$hyapi.dialog.close(dialog1);  // 关闭第一个弹窗
$hyapi.dialog.close(dialog2);  // 关闭第二个弹窗

// 3. 关闭所有弹窗
$hyapi.dialog.closeAll();

// ================ 弹窗栈管理 ================

class DialogStackManager {
  private dialogStack: any[] = [];
  
  // 添加弹窗到栈中
  pushDialog(template: TemplateRef<any>, config: any): any {
    const dialogRef = $hyapi.dialog.show(template, {
      ...config,
      callback: () => {
        // 弹窗关闭时从栈中移除
        this.removeFromStack(dialogRef);
        if (config.callback) {
          config.callback();
        }
      }
    });
    
    this.dialogStack.push(dialogRef);
    console.log(\`弹窗栈深度: \${this.dialogStack.length}\`);
    
    return dialogRef;
  }
  
  // 关闭栈顶弹窗
  closeTopDialog(): boolean {
    if (this.dialogStack.length > 0) {
      const topDialog = this.dialogStack.pop();
      $hyapi.dialog.close(topDialog);
      return true;
    }
    return false;
  }
  
  // 关闭指定数量的顶部弹窗
  closeTopDialogs(count: number): number {
    let closed = 0;
    while (closed < count && this.dialogStack.length > 0) {
      const dialog = this.dialogStack.pop();
      $hyapi.dialog.close(dialog);
      closed++;
    }
    return closed;
  }
  
  // 关闭栈中所有弹窗
  closeAllStackDialogs(): number {
    const count = this.dialogStack.length;
    while (this.dialogStack.length > 0) {
      const dialog = this.dialogStack.pop();
      $hyapi.dialog.close(dialog);
    }
    return count;
  }
  
  // 获取栈信息
  getStackInfo() {
    return {
      depth: this.dialogStack.length,
      dialogs: this.dialogStack.map((dialog, index) => ({
        index,
        id: dialog.id || \`dialog-\${index}\`
      }))
    };
  }
  
  // 从栈中移除指定弹窗
  private removeFromStack(dialogRef: any) {
    const index = this.dialogStack.indexOf(dialogRef);
    if (index > -1) {
      this.dialogStack.splice(index, 1);
    }
  }
  
  // 检查是否有弹窗打开
  hasOpenDialogs(): boolean {
    return this.dialogStack.length > 0;
  }
  
  // 查找特定弹窗
  findDialog(predicate: (dialog: any) => boolean): any {
    return this.dialogStack.find(predicate);
  }
}

// ================ 弹窗队列管理 ================

class DialogQueueManager {
  private dialogQueue: Array<{
    template: TemplateRef<any>,
    config: any,
    resolve: (result: any) => void
  }> = [];
  
  private isProcessing = false;
  private maxConcurrent = 3; // 最大同时显示的弹窗数量
  private activeDialogs = new Set<any>();
  
  // 添加弹窗到队列
  enqueueDialog(
    template: TemplateRef<any>, 
    config: any
  ): Promise<any> {
    return new Promise((resolve) => {
      this.dialogQueue.push({ template, config, resolve });
      this.processQueue();
    });
  }
  
  // 处理队列
  private async processQueue() {
    if (this.isProcessing || this.activeDialogs.size >= this.maxConcurrent) {
      return;
    }
    
    this.isProcessing = true;
    
    while (
      this.dialogQueue.length > 0 && 
      this.activeDialogs.size < this.maxConcurrent
    ) {
      const { template, config, resolve } = this.dialogQueue.shift()!;
      
      const dialogRef = $hyapi.dialog.show(template, {
        ...config,
        callback: () => {
          this.activeDialogs.delete(dialogRef);
          resolve(true);
          if (config.callback) {
            config.callback();
          }
          // 处理下一个队列项
          setTimeout(() => this.processQueue(), 100);
        },
        cancel: () => {
          this.activeDialogs.delete(dialogRef);
          resolve(false);
          if (config.cancel) {
            config.cancel();
          }
          setTimeout(() => this.processQueue(), 100);
        }
      });
      
      this.activeDialogs.add(dialogRef);
    }
    
    this.isProcessing = false;
  }
  
  // 清空队列
  clearQueue(): number {
    const count = this.dialogQueue.length;
    this.dialogQueue.forEach(({ resolve }) => resolve(false));
    this.dialogQueue = [];
    return count;
  }
  
  // 获取队列状态
  getQueueStatus() {
    return {
      pending: this.dialogQueue.length,
      active: this.activeDialogs.size,
      maxConcurrent: this.maxConcurrent
    };
  }
}

// ================ 弹窗分组管理 ================

class DialogGroupManager {
  private dialogGroups = new Map<string, Set<any>>();
  
  // 创建分组
  createGroup(groupName: string) {
    if (!this.dialogGroups.has(groupName)) {
      this.dialogGroups.set(groupName, new Set());
    }
  }
  
  // 添加弹窗到分组
  addToGroup(
    groupName: string, 
    template: TemplateRef<any>, 
    config: any
  ): any {
    this.createGroup(groupName);
    
    const dialogRef = $hyapi.dialog.show(template, {
      ...config,
      callback: () => {
        this.removeFromGroup(groupName, dialogRef);
        if (config.callback) {
          config.callback();
        }
      }
    });
    
    this.dialogGroups.get(groupName)!.add(dialogRef);
    return dialogRef;
  }
  
  // 关闭分组中的所有弹窗
  closeGroup(groupName: string): number {
    const group = this.dialogGroups.get(groupName);
    if (!group) return 0;
    
    const count = group.size;
    group.forEach(dialog => {
      $hyapi.dialog.close(dialog);
    });
    
    group.clear();
    return count;
  }
  
  // 从分组中移除弹窗
  private removeFromGroup(groupName: string, dialogRef: any) {
    const group = this.dialogGroups.get(groupName);
    if (group) {
      group.delete(dialogRef);
    }
  }
  
  // 获取分组信息
  getGroupInfo(groupName: string) {
    const group = this.dialogGroups.get(groupName);
    return {
      name: groupName,
      count: group ? group.size : 0,
      exists: this.dialogGroups.has(groupName)
    };
  }
  
  // 获取所有分组信息
  getAllGroupsInfo() {
    const groups = {};
    this.dialogGroups.forEach((group, name) => {
      groups[name] = group.size;
    });
    return groups;
  }
  
  // 关闭所有分组
  closeAllGroups(): number {
    let totalClosed = 0;
    this.dialogGroups.forEach((group, name) => {
      totalClosed += this.closeGroup(name);
    });
    return totalClosed;
  }
}

// ================ 实际应用示例 ================

class DialogManagementService {
  
  private stackManager = new DialogStackManager();
  private queueManager = new DialogQueueManager();
  private groupManager = new DialogGroupManager();
  
  // 场景1：工作流弹窗管理
  async showWorkflowDialogs(steps: any[]) {
    // 将工作流步骤加入队列，按顺序显示
    for (const step of steps) {
      await this.queueManager.enqueueDialog(
        step.template,
        {
          title: \`步骤 \${step.index}: \${step.title}\`,
          width: '600px',
          closable: step.skippable
        }
      );
    }
  }
  
  // 场景2：通知弹窗管理
  showNotificationDialog(notification: any) {
    // 将通知弹窗加入通知分组
    return this.groupManager.addToGroup('notifications', 
      notification.template, 
      {
        title: notification.title,
        width: '400px',
        closable: true
      }
    );
  }
  
  // 场景3：编辑器弹窗栈
  openEditor(editorType: string, data: any) {
    // 编辑器弹窗加入栈管理
    return this.stackManager.pushDialog(
      this.getEditorTemplate(editorType),
      {
        title: \`编辑器: \${editorType}\`,
        width: '800px',
        closable: false  // 编辑器不允许随意关闭
      }
    );
  }
  
  // 场景4：帮助弹窗层次管理
  showHelpDialog(helpTopic: string) {
    // 帮助弹窗使用分组管理
    return this.groupManager.addToGroup('help',
      this.getHelpTemplate(helpTopic),
      {
        title: \`帮助: \${helpTopic}\`,
        width: '700px',
        closable: true
      }
    );
  }
  
  // 全局清理方法
  cleanup() {
    // 清理所有弹窗
    const stackClosed = this.stackManager.closeAllStackDialogs();
    const queueCleared = this.queueManager.clearQueue();
    const groupsClosed = this.groupManager.closeAllGroups();
    
    console.log(\`清理完成: 栈弹窗\${stackClosed}个，队列\${queueCleared}个，分组\${groupsClosed}个\`);
  }
  
  // 获取全局状态
  getGlobalStatus() {
    return {
      stack: this.stackManager.getStackInfo(),
      queue: this.queueManager.getQueueStatus(),
      groups: this.groupManager.getAllGroupsInfo()
    };
  }
}

// ================ 组件生命周期集成 ================

@Component({
  selector: 'app-dialog-example',
  template: '...'
})
export class DialogExampleComponent implements OnDestroy {
  
  private dialogManager = new DialogManagementService();
  
  ngOnDestroy() {
    // 组件销毁时清理所有弹窗
    this.dialogManager.cleanup();
  }
  
  @HostListener('window:beforeunload', ['$event'])
  beforeUnload(event: BeforeUnloadEvent) {
    // 页面卸载前检查是否有未保存的弹窗
    const status = this.dialogManager.getGlobalStatus();
    const hasUnsavedDialogs = status.stack.depth > 0 || 
                              status.queue.active > 0;
    
    if (hasUnsavedDialogs) {
      event.preventDefault();
      event.returnValue = '您有未完成的操作，确定要离开吗？';
    }
  }
}`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #722ed1;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>📚 弹窗管理和批量操作</h2>
        <p><strong>高级功能:</strong> 弹窗栈管理、队列控制、分组操作、生命周期管理</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="showMultipleDialogs()">
            📚 多层弹窗演示
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 弹窗管理完整解决方案:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #722ed1"><code>{{managementCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#f9f0ff;border-radius:4px;border:1px solid #d3adf7">
            <h5 style="color:#722ed1;margin:0 0 10px 0">📚 栈管理</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>弹窗层次控制</li>
              <li>LIFO关闭策略</li>
              <li>深度监控</li>
              <li>批量关闭</li>
            </ul>
          <div style="padding:15px;background:#f9f0ff;border-radius:4px;border:1px solid var(--primary-color)">
            <h5 style="color:var(--primary-color);margin:0 0 10px 0">📚 栈管理</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>弹窗层次控制</li>
              <li>LIFO关闭策略</li>
              <li>深度监控</li>
              <li>批量关闭</li>
            </ul>
          </div>
          <div style="padding:15px;background:#f9f0ff;border-radius:4px;border:1px solid var(--primary-color)">
            <h5 style="color:var(--primary-color);margin:0 0 10px 0">🔄 队列管理</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>并发控制</li>
              <li>顺序处理</li>
              <
              <li>优先级支持</li>
            </ul>
          </div>
          <div style="padding:15px;background:#f9f0ff;border-radius:4px;border:1px solid #d3adf7">
            <h5 style="color:#722ed1;margin:0 0 10px 0">👥 分组管理</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>逻辑分组</li>
              <li>批量操作</li>
              <li>分组统计</li>
              <li>生命周期绑定</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
};
export const dialogManagement: Story = DialogManagementTemplate.bind({});
dialogManagement.storyName = '3️⃣ 弹窗管理和批量操作';

// 4. 完整功能手册
const CompleteDialogTemplate: Story = (args: any) => {
  args.allDialogFeatures = () => {
    $hyapi.msg.createTips('info', '这是dialog模块的完整功能演示，请查看代码了解所有特性');
  };

  args.completeDialogCode = `
// ==================== $hyapi.dialog 完整功能概览 ====================

// ================ 1. 基础显示 show ================
const dialogRef = $hyapi.dialog.show(templateRef, options);

// 参数详解：
// templateRef: TemplateRef<{}> - Angular模板引用
// options: {
//   closable?: boolean,           // 是否可关闭，默认true
//   width?: string | number,      // 弹窗宽度
//   title?: string | TemplateRef, // 标题
//   cancel?: () => void,          // 取消回调
//   callback?: () => void         // 关闭回调
// }

// ================ 2. 配置更新 updateConfig ================
$hyapi.dialog.updateConfig(dialogRef, options);

// 参数详解：
// dialogRef: NzModalRef - show方法返回的弹窗引用
// options: {
//   closable?: boolean,           // 更新关闭权限
//   width?: string | number,      // 更新宽度
//   content?: string | TemplateRef // 更新内容
// }

// ================ 3. 关闭操作 ================
$hyapi.dialog.close(dialogRef);  // 关闭指定弹窗
$hyapi.dialog.closeAll();        // 关闭所有弹窗

// ================ 完整使用示例 ================

@Component({
  selector: 'app-dialog-demo',
  template: \`
    <!-- 用户详情模板 -->
    <ng-template #userDetailTemplate>
      <div class="dialog-content">
        <div class="user-avatar">
          <img [src]="selectedUser?.avatar" alt="用户头像">
        </div>
        <div class="user-info">
          <h3>{{selectedUser?.name}}</h3>
          <p><strong>邮箱:</strong> {{selectedUser?.email}}</p>
          <p><strong>部门:</strong> {{selectedUser?.department}}</p>
          <p><strong>职位:</strong> {{selectedUser?.position}}</p>
          <p><strong>入职时间:</strong> {{selectedUser?.joinDate | date:'yyyy-MM-dd'}}</p>
        </div>
        <div class="dialog-actions">
          <button nz-button nzType="default" (click)="closeUserDetail()">关闭</button>
          <button nz-button nzType="primary" (click)="editUser()">编辑</button>
        </div>
      </div>
    </ng-template>

    <!-- 用户编辑模板 -->
    <ng-template #userEditTemplate>
      <div class="dialog-content">
        <form nz-form [formGroup]="userForm">
          <nz-form-item>
            <nz-form-label [nzSpan]="6">姓名</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <input nz-input formControlName="name" placeholder="请输入姓名">
            </nz-form-control>
          </nz-form-item>
          
          <nz-form-item>
            <nz-form-label [nzSpan]="6">邮箱</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <input nz-input formControlName="email" placeholder="请输入邮箱">
            </nz-form-control>
          </nz-form-item>
          
          <nz-form-item>
            <nz-form-label [nzSpan]="6">部门</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <nz-select formControlName="department" placeholder="请选择部门">
                <nz-option nzValue="tech" nzLabel="技术部"></nz-option>
                <nz-option nzValue="sales" nzLabel="销售部"></nz-option>
                <nz-option nzValue="hr" nzLabel="人事部"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>
        </form>
        
        <div class="dialog-actions">
          <button nz-button nzType="default" (click)="cancelEdit()">取消</button>
          <button nz-button nzType="primary" (click)="saveUser()" [nzLoading]="saving">保存</button>
        </div>
      </div>
    </ng-template>

    <!-- 确认删除模板 -->
    <ng-template #deleteConfirmTemplate>
      <div class="dialog-content">
        <div class="confirm-icon">
          <i nz-icon nzType="exclamation-circle" style="color: #faad14; font-size: 24px;"></i>
        </div>
        <div class="confirm-content">
          <h4>确认删除</h4>
          <p>确定要删除用户 "{{selectedUser?.name}}" 吗？</p>
          <p class="warning-text">删除后数据将无法恢复，请谨慎操作。</p>
        </div>
        <div class="dialog-actions">
          <button nz-button nzType="default" (click)="cancelDelete()">取消</button>
          <button nz-button nzType="primary" nzDanger (click)="confirmDelete()" [nzLoading]="deleting">确认删除</button>
        </div>
      </div>
    </ng-template>
  \`
})
export class DialogDemoComponent implements OnInit, OnDestroy {
  
  @ViewChild('userDetailTemplate') userDetailTemplate: TemplateRef<any>;
  @ViewChild('userEditTemplate') userEditTemplate: TemplateRef<any>;
  @ViewChild('deleteConfirmTemplate') deleteConfirmTemplate: TemplateRef<any>;
  
  selectedUser: any = null;
  userForm: FormGroup;
  saving = false;
  deleting = false;
  
  // 弹窗引用
  private detailDialogRef: any = null;
  private editDialogRef: any = null;
  private deleteDialogRef: any = null;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.initForm();
  }
  
  ngOnInit() {
    // 初始化逻辑
  }
  
  ngOnDestroy() {
    // 组件销毁时关闭所有弹窗
    this.closeAllDialogs();
  }
  
  private initForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]]
    });
  }
  
  // 显示用户详情
  showUserDetail(user: any) {
    this.selectedUser = user;
    this.cdr.detectChanges(); // 确保模板数据更新
    
    this.detailDialogRef = $hyapi.dialog.show(this.userDetailTemplate, {
      title: \`用户详情 - \${user.name}\`,
      width: '600px',
      closable: true,
      callback: () => {
        this.selectedUser = null;
        this.detailDialogRef = null;
      }
    });
  }
  
  // 关闭用户详情
  closeUserDetail() {
    if (this.detailDialogRef) {
      $hyapi.dialog.close(this.detailDialogRef);
    }
  }
  
  // 编辑用户
  editUser() {
    // 先关闭详情弹窗
    this.closeUserDetail();
    
    // 填充表单数据
    this.userForm.patchValue({
      name: this.selectedUser.name,
      email: this.selectedUser.email,
      department: this.selectedUser.department
    });
    
    this.cdr.detectChanges();
    
    // 显示编辑弹窗
    this.editDialogRef = $hyapi.dialog.show(this.userEditTemplate, {
      title: \`编辑用户 - \${this.selectedUser.name}\`,
      width: '500px',
      closable: false, // 防止误关闭
      callback: () => {
        this.userForm.reset();
        this.editDialogRef = null;
      }
    });
  }
  
  // 保存用户
  async saveUser() {
    if (this.userForm.valid) {
      this.saving = true;
      
      try {
        const formData = this.userForm.value;
        await this.userService.updateUser(this.selectedUser.id, formData);
        
        $hyapi.msg.createTips('success', '用户信息更新成功');
        
        // 更新选中用户数据
        Object.assign(this.selectedUser, formData);
        
        // 关闭编辑弹窗
        $hyapi.dialog.close(this.editDialogRef);
        
      } catch (error) {
        $hyapi.msg.show('error', '保存失败', {
          content: error.message || '请稍后重试'
        });
      } finally {
        this.saving = false;
      }
    } else {
      $hyapi.msg.createTips('warning', '请填写完整的用户信息');
    }
  }
  
  // 取消编辑
  cancelEdit() {
    if (this.userForm.dirty) {
      $hyapi.msg.confirm('确定要取消编辑吗？未保存的修改将丢失。', {
        callback: () => {
          $hyapi.dialog.close(this.editDialogRef);
        }
      });
    } else {
      $hyapi.dialog.close(this.editDialogRef);
    }
  }
  
  // 显示删除确认
  showDeleteConfirm(user: any) {
    this.selectedUser = user;
    this.cdr.detectChanges();
    
    this.deleteDialogRef = $hyapi.dialog.show(this.deleteConfirmTemplate, {
      title: '确认操作',
      width: '400px',
      closable: true,
      callback: () => {
        this.deleteDialogRef = null;
      }
    });
  }
  
  // 确认删除
  async confirmDelete() {
    this.deleting = true;
    
    try {
      await this.userService.deleteUser(this.selectedUser.id);
      
      $hyapi.msg.createTips('success', '用户删除成功');
      
      // 从列表中移除用户
      this.removeUserFromList(this.selectedUser.id);
      
      // 关闭确认弹窗
      $hyapi.dialog.close(this.deleteDialogRef);
      
    } catch (error) {
      $hyapi.msg.show('error', '删除失败', {
        content: error.message || '请稍后重试'
      });
    } finally {
      this.deleting = false;
    }
  }
  
  // 取消删除
  cancelDelete() {
    $hyapi.dialog.close(this.deleteDialogRef);
  }
  
  // 关闭所有弹窗
  private closeAllDialogs() {
    if (this.detailDialogRef) {
      $hyapi.dialog.close(this.detailDialogRef);
    }
    if (this.editDialogRef) {
      $hyapi.dialog.close(this.editDialogRef);
    }
    if (this.deleteDialogRef) {
      $hyapi.dialog.close(this.deleteDialogRef);
    }
  }
  
  // 辅助方法
  private removeUserFromList(userId: number) {
    // 实现从用户列表中移除用户的逻辑
  }
}

// ================ 样式定义 ================
/* 在组件的CSS文件中添加 */
.dialog-content {
  padding: 20px;
}

.user-avatar {
  text-align: center;
  margin-bottom: 20px;
}

.user-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  margin-bottom: 20px;
}

.user-info h3 {
  margin-bottom: 15px;
}

.user-info p {
  margin-bottom: 8px;
  font-size: 14px;
}

.dialog-actions {
  text-align: right;
  border-top: 1px solid #f0f0f0;
  padding-top: 15px;
  margin-top: 20px;
}

.dialog-actions button {
  margin-left: 8px;
}

.confirm-icon {
  text-align: center;
  margin-bottom: 16px;
}

.confirm-content h4 {
  text-align: center;
  margin-bottom: 12px;
  color: #262626;
}

.confirm-content p {
  text-align: center;
  margin-bottom: 8px;
}

.warning-text {
  color: #fa8c16;
  font-size: 12px;
}

// ================ 高级特性示例 ================

class AdvancedDialogService {
  
  // 响应式弹窗
  showResponsiveDialog(template: TemplateRef<any>, title: string) {
    const width = this.getResponsiveWidth();
    
    const dialogRef = $hyapi.dialog.show(template, {
      title,
      width,
      closable: true
    });
    
    // 监听窗口变化
    const resizeHandler = () => {
      const newWidth = this.getResponsiveWidth();
      $hyapi.dialog.updateConfig(dialogRef, { width: newWidth });
    };
    
    window.addEventListener('resize', resizeHandler);
    
    // 清理监听器
    const originalCallback = dialogRef.afterClose;
    dialogRef.afterClose = () => {
      window.removeEventListener('resize', resizeHandler);
      if (originalCallback) {
        originalCallback();
      }
    };
    
    return dialogRef;
  }
  
  private getResponsiveWidth(): string {
    const width = window.innerWidth;
    if (width < 576) return '100%';
    if (width < 768) return '90%';
    if (width < 992) return '75%';
    if (width < 1200) return '60%';
    return '50%';
  }
  
  // 模态对话框
  showModalDialog(
    template: TemplateRef<any>, 
    config: any
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = $hyapi.dialog.show(template, {
        ...config,
        closable: false,
        callback: () => resolve(true),
        cancel: () => resolve(false)
      });
    });
  }
  
  // 数据编辑器
  showDataEditor<T>(
    template: TemplateRef<any>, 
    initialData: T
  ): Promise<T | null> {
    return new Promise((resolve) => {
      let currentData = { ...initialData };
      
      const dialogRef = $hyapi.dialog.show(template, {
        title: '数据编辑器',
        width: '600px',
        closable: false,
        callback: () => resolve(currentData),
        cancel: () => resolve(null)
      });
      
      // 将数据和方法暴露给模板
      (window as any).editorData = currentData;
      (window as any).updateEditorData = (newData: Partial<T>) => {
        Object.assign(currentData, newData);
      };
      (window as any).confirmEdit = () => {
        $hyapi.dialog.close(dialogRef);
      };
      (window as any).cancelEdit = () => {
        resolve(null);
        $hyapi.dialog.close(dialogRef);
      };
    });
  }
}

// ================ 最佳实践总结 ================

// 1. 内存管理
class DialogMemoryManager {
  private activeDialogs = new Set<any>();
  
  show(template: TemplateRef<any>, config: any) {
    const dialogRef = $hyapi.dialog.show(template, {
      ...config,
      callback: () => {
        this.activeDialogs.delete(dialogRef);
        if (config.callback) {
          config.callback();
        }
      }
    });
    
    this.activeDialogs.add(dialogRef);
    return dialogRef;
  }
  
  cleanup() {
    this.activeDialogs.forEach(dialog => {
      $hyapi.dialog.close(dialog);
    });
    this.activeDialogs.clear();
  }
}

// 2. 错误处理
const showDialogWithErrorHandling = (template, config) => {
  try {
    return $hyapi.dialog.show(template, {
      ...config,
      callback: () => {
        try {
          if (config.callback) {
            config.callback();
          }
        } catch (error) {
          console.error('Dialog callback error:', error);
          $hyapi.msg.show('error', '操作失败', {
            content: '请稍后重试'
          });
        }
      }
    });
  } catch (error) {
    console.error('Dialog show error:', error);
    $hyapi.msg.show('error', '弹窗显示失败', {
      content: '系统异常，请刷新页面重试'
    });
    return null;
  }
};

// 3. 性能优化
class DialogPerformanceOptimizer {
  private dialogPool = new Map<string, any>();
  
  // 弹窗复用
  getPooledDialog(key: string, template: TemplateRef<any>, config: any) {
    if (this.dialogPool.has(key)) {
      const pooledDialog = this.dialogPool.get(key);
      $hyapi.dialog.updateConfig(pooledDialog, config);
      return pooledDialog;
    }
    
    const dialog = $hyapi.dialog.show(template, {
      ...config,
      callback: () => {
        // 不立即销毁，放入池中复用
        this.dialogPool.set(key, dialog);
        if (config.callback) {
          config.callback();
        }
      }
    });
    
    return dialog;
  }
  
  // 清理池
  clearPool() {
    this.dialogPool.forEach(dialog => {
      $hyapi.dialog.close(dialog);
    });
    this.dialogPool.clear();
  }
}`;

  return {
    props: args,
    template: `
      <div style="border:2px solid var(--primary-color);padding:15px;margin-bottom:15px;border-radius:8px;background:linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)">
        <h2 style="color:var(--primary-color);">📚 hyapi.dialog 完整功能手册</h2>
        <p><strong>终极指南:</strong> 模板弹窗的所有功能、配置选项、最佳实践、性能优化</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" size="large" (click)="allDialogFeatures()">
            📋 查看完整功能手册
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 完整API参考和最佳实践:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:10px;line-height:1.3;overflow-x:auto;border-left:4px solid var(--primary-color);max-height:600px;overflow-y:auto"><code>{{completeDialogCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:10px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h5 style="color:var(--primary-color);margin:0 0 5px 0">🎭 show</h5>
            <p style="margin:0;font-size:11px">显示模板弹窗</p>
          </div>
          <div style="padding:10px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h5 style="color:var(--primary-color);margin:0 0 5px 0">🛠️ updateConfig</h5>
            <p style="margin:0;font-size:11px">动态配置更新</p>
          </div>
          <div style="padding:10px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h5 style="color:var(--primary-color);margin:0 0 5px 0">❌ close</h5>
            <p style="margin:0;font-size:11px">关闭指定弹窗</p>
          </div>
          <div style="padding:10px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h5 style="color:var(--primary-color);margin:0 0 5px 0">🗑️ closeAll</h5>
            <p style="margin:0;font-size:11px">关闭所有弹窗</p>
          </div>
        </div>
        
        <div style="margin-top:20px;padding:20px;background:#ffffff;border:2px solid var(--primary-color);border-radius:8px">
          <h4 style="margin:0 0 15px 0;color:var(--primary-color);">🎓 模板弹窗最佳实践总结</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <div>
              <h5 style="color:var(--primary-color);margin:0 0 10px 0">✅ 推荐做法</h5>
              <ul style="margin:0;padding-left:20px;color:#666;font-size:13px">
                <li>使用ViewChild获取模板引用，确保类型安全</li>
                <li>在组件销毁时清理所有弹窗，防止内存泄漏</li>
                <li>复杂表单使用FormGroup管理数据和验证</li>
                <li>提供明确的用户操作反馈和确认机制</li>
                <li>响应式设计，适配不同屏幕尺寸</li>
                <li>合理使用弹窗栈、队列和分组管理</li>
              </ul>
            </div>
            <div>
              <h5 style="color:var(--error-color);margin:0 0 10px 0">❌ 避免做法</h5>
              <ul style="margin:0;padding-left:20px;color:#666;font-size:13px">
                <li>不要在弹窗中执行长时间的同步操作</li>
                <li>避免过深的弹窗嵌套，影响用户体验</li>
                <li>不要忽略弹窗的关闭清理工作</li>
                <li>避免在循环中创建大量弹窗引用</li>
                <li>不要在弹窗模板中使用复杂的计算逻辑</li>
                <li>避免弹窗内容过于复杂，影响性能</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="margin-top:15px;padding:15px;background:#fff9e6;border-radius:8px;border-left:5px solid var(--primary-color)">
          <h4 style="margin:0 0 10px 0;color:var(--primary-color);">💡 开发提示</h4>
          <p style="margin:0;color:#666;font-size:13px">
            $hyapi.dialog 提供了强大的模板弹窗能力，支持完全自定义的内容和交互。
            从简单的信息展示到复杂的表单编辑，从单个弹窗到弹窗管理系统，都能够灵活应对。
            <br><br>
            <strong>记住：</strong>好的弹窗设计应该目标明确、操作简单、反馈及时！合理使用弹窗管理功能，让复杂的用户交互变得井然有序。
          </p>
        </div>
      </div>
    `
  };
};
export const completeDialog: Story = CompleteDialogTemplate.bind({});
completeDialog.storyName = '4️⃣ 完整功能手册'; 