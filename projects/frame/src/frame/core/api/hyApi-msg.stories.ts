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
class MockMsgService implements Partial<ModelService> {
  constructor() {
    _this = this;
    setTimeout(() => {
      console.log('消息服务已初始化', this);
    }, 100);
  }
}

export default {
  title: 'HyApi工具类文档/$hyapi.msg (消息弹窗)',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockMsgService }, TableService]
    }),
  ],
} as Meta;

// 1. 基础消息提示
const BasicMessageTemplate: Story = (args: any) => {
  args.showSuccess = () => {
    $hyapi.msg.show('success', '操作成功！数据已保存', {
      width: '400px',
      callback: () => {
        console.log('成功消息关闭后的回调');
      }
    });
  };

  args.showError = () => {
    $hyapi.msg.show('error', '操作失败！请检查网络连接', {
      width: '450px',
      closable: true,
      callback: () => {
        console.log('错误消息关闭后的回调');
      }
    });
  };

  args.showWarning = () => {
    $hyapi.msg.show('warning', '警告：该操作不可撤销，请谨慎处理！', {
      width: '500px',
      content: '详细说明：删除后数据将无法恢复，建议先进行数据备份。',
      callback: () => {
        console.log('警告消息已确认');
      }
    });
  };

  args.showInfo = () => {
    $hyapi.msg.show('info', '系统将在5分钟后进行维护', {
      width: '400px',
      content: '维护期间系统将暂停服务，请提前保存您的工作内容。',
      closable: true
    });
  };

  args.basicMessageCode = `
// ================ 1. 基础消息显示 ================

// 成功消息
$hyapi.msg.show('success', '操作成功！数据已保存', {
  width: '400px',                    // 消息框宽度
  callback: () => {                  // 关闭后回调
    console.log('成功消息关闭后的操作');
    // 可以在这里执行后续操作，如页面跳转、数据刷新等
  }
});

// 错误消息
$hyapi.msg.show('error', '操作失败！请检查网络连接', {
  width: '450px',
  closable: true,                    // 显示关闭按钮
  callback: () => {
    console.log('错误消息关闭');
    // 错误处理，如重试逻辑、错误上报等
  }
});

// 警告消息
$hyapi.msg.show('warning', '警告：该操作不可撤销，请谨慎处理！', {
  width: '500px',
  content: '详细说明：删除后数据将无法恢复，建议先进行数据备份。',
  callback: () => {
    console.log('警告已确认');
  }
});

// 信息消息
$hyapi.msg.show('info', '系统将在5分钟后进行维护', {
  width: '400px', 
  content: '维护期间系统将暂停服务，请提前保存您的工作内容。',
  closable: true                     // 允许用户主动关闭
});

// ================ 消息类型说明 ================
// success: 成功操作提示，通常用于操作完成确认
// error: 错误信息提示，用于异常情况通知  
// warning: 警告信息，用于风险操作提醒
// info: 一般信息通知，用于系统消息、提示等

// ================ 配置选项详解 ================
{
  width: string | number,          // 消息框宽度，如 '400px' 或 400
  callback: () => void,            // 消息关闭后的回调函数
  content: string | TemplateRef,   // 附加内容，支持字符串或模板
  closable: boolean               // 是否显示关闭按钮，默认 false
}

// ================ 实际使用场景 ================

// 场景1：表单提交成功
handleFormSubmit() {
  this.submitForm().then(() => {
    $hyapi.msg.show('success', '用户信息保存成功', {
      callback: () => {
        this.router.navigate(['/user-list']);  // 跳转到列表页
      }
    });
  });
}

// 场景2：删除确认后的结果提示
handleDelete(id: number) {
  this.deleteUser(id).then(() => {
    $hyapi.msg.show('success', '用户删除成功', {
      callback: () => {
        this.loadUserList();  // 刷新列表
      }
    });
  }).catch((error) => {
    $hyapi.msg.show('error', '删除失败：' + error.message, {
      closable: true,
      callback: () => {
        // 错误处理，如重新加载数据
        this.loadUserList();
      }
    });
  });
}

// 场景3：系统维护通知
showMaintenanceNotice() {
  $hyapi.msg.show('warning', '系统将于今晚22:00-24:00进行维护', {
    width: '500px',
    content: '维护期间将暂停服务，请提前保存数据。如有紧急需求请联系客服。',
    closable: true,
    callback: () => {
      // 用户确认后可以设置提醒
      this.setMaintenanceReminder();
    }
  });
}`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #52c41a;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>💬 基础消息提示功能</h2>
        <p><strong>核心功能:</strong> 显示不同类型的消息提示，支持自定义配置、回调处理</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="showSuccess()" style="margin-right:10px">
            ✅ 成功消息
          </button>
          <button nz-button nzType="danger" (click)="showError()" style="margin-right:10px">
            ❌ 错误消息
          </button>
          <button nz-button style="background:#faad14;border-color:#faad14;color:white" (click)="showWarning()" style="margin-right:10px">
            ⚠️ 警告消息
          </button>
          <button nz-button nzType="default" (click)="showInfo()">
            ℹ️ 信息消息
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 基础消息使用详解:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #52c41a"><code>{{basicMessageCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:10px;background:#f6ffed;border-radius:4px;border:1px solid #b7eb8f">
            <h5 style="color:#52c41a;margin:0 0 5px 0">✅ Success</h5>
            <p style="margin:0;font-size:12px">操作成功确认</p>
          </div>
          <div style="padding:10px;background:#fff2f0;border-radius:4px;border:1px solid #ffb3b3">
            <h5 style="color:#f5222d;margin:0 0 5px 0">❌ Error</h5>
            <p style="margin:0;font-size:12px">错误异常通知</p>
          </div>
          <div style="padding:10px;background:#fffbe6;border-radius:4px;border:1px solid #ffe58f">
            <h5 style="color:#faad14;margin:0 0 5px 0">⚠️ Warning</h5>
            <p style="margin:0;font-size:12px">风险操作警告</p>
          </div>
          <div style="padding:10px;background:#f0f9ff;border-radius:4px;border:1px solid #91d5ff">
            <h5 style="color:#1890ff;margin:0 0 5px 0">ℹ️ Info</h5>
            <p style="margin:0;font-size:12px">一般信息提示</p>
          </div>
        </div>
      </div>
    `
  };
};
export const basicMessage: Story = BasicMessageTemplate.bind({});
basicMessage.storyName = '1️⃣ 基础消息提示';

// 2. 轻量级提示
const CreateTipsTemplate: Story = (args: any) => {
  args.tipsSuccess = () => {
    $hyapi.msg.createTips('success', '保存成功');
  };

  args.tipsError = () => {
    $hyapi.msg.createTips('error', '网络连接失败');
  };

  args.tipsWarning = () => {
    $hyapi.msg.createTips('warning', '文件大小超过限制');
  };

  args.tipsInfo = () => {
    $hyapi.msg.createTips('info', '正在同步数据...');
  };

  args.customDuration = () => {
    $hyapi.msg.createTips('success', '这条消息将显示8秒', { duration: 8000 });
  };

  args.createTipsCode = `
// ================ 轻量级提示 createTips ================

// 基础提示 - 3秒后自动消失
$hyapi.msg.createTips('success', '保存成功');
$hyapi.msg.createTips('error', '网络连接失败');  
$hyapi.msg.createTips('warning', '文件大小超过限制');
$hyapi.msg.createTips('info', '正在同步数据...');

// 自定义持续时间
$hyapi.msg.createTips('success', '这条消息将显示8秒', { 
  duration: 8000    // 毫秒，0表示不自动关闭
});

// ================ createTips vs show 的区别 ================

// createTips特点：
// ✅ 轻量级，不阻断用户操作
// ✅ 自动消失，无需用户手动关闭  
// ✅ 适合频繁的状态提示
// ✅ 性能开销小，响应快速

// show特点：
// ✅ 重要消息，需要用户明确确认
// ✅ 支持详细内容和自定义配置
// ✅ 适合错误处理、重要通知
// ✅ 支持回调函数处理

// ================ 使用场景对比 ================

// 🎯 使用 createTips 的场景：
// 1. 表单字段验证结果
$hyapi.msg.createTips('warning', '请输入正确的邮箱格式');

// 2. 操作状态反馈
$hyapi.msg.createTips('success', '数据已自动保存');

// 3. 系统状态提示
$hyapi.msg.createTips('info', '正在连接服务器...');

// 4. 快速反馈
$hyapi.msg.createTips('error', '上传失败，请重试');

// 🎯 使用 show 的场景：
// 1. 重要操作确认
$hyapi.msg.show('success', '用户创建成功', {
  callback: () => this.router.navigate(['/users'])
});

// 2. 严重错误处理
$hyapi.msg.show('error', '系统异常', {
  content: '请联系技术支持或稍后重试',
  callback: () => this.reportError()
});

// 3. 重要通知
$hyapi.msg.show('warning', '重要提示', {
  content: '您的账户将在3天后到期，请及时续费',
  closable: true
});

// ================ 实际开发中的最佳实践 ================

class UserService {
  
  // 保存用户信息
  saveUser(userData: any) {
    return this.http.post('/api/user', userData).pipe(
      tap(() => {
        // 使用 createTips 快速反馈
        $hyapi.msg.createTips('success', '用户信息已保存');
      }),
      catchError((error) => {
        // 根据错误严重程度选择提示方式
        if (error.status === 500) {
          // 服务器错误用 show，需要用户明确知晓
          $hyapi.msg.show('error', '服务器异常', {
            content: '请稍后重试或联系管理员',
            callback: () => this.reportError(error)
          });
        } else {
          // 一般错误用 createTips
          $hyapi.msg.createTips('error', '保存失败：' + error.message);
        }
        return throwError(error);
      })
    );
  }
  
  // 批量操作的提示策略
  batchDelete(ids: number[]) {
    let successCount = 0;
    let failCount = 0;
    
    // 处理过程中使用 createTips
    ids.forEach(id => {
      this.deleteUser(id).then(() => {
        successCount++;
        if (successCount + failCount === ids.length) {
          this.showBatchResult(successCount, failCount);
        }
      }).catch(() => {
        failCount++;
        if (successCount + failCount === ids.length) {
          this.showBatchResult(successCount, failCount);
        }
      });
    });
  }
  
  private showBatchResult(success: number, fail: number) {
    if (fail === 0) {
      // 全部成功用 createTips
      $hyapi.msg.createTips('success', \`批量删除完成，共删除 \${success} 项\`);
    } else {
      // 有失败用 show，需要用户关注
      $hyapi.msg.show('warning', '批量删除完成', {
        content: \`成功: \${success} 项，失败: \${fail} 项\`,
        callback: () => this.refreshList()
      });
    }
  }
}

// ================ 消息频率控制 ================

class MessageThrottle {
  private lastMessage = '';
  private lastTime = 0;
  
  // 防止重复消息
  showTips(type: string, message: string, options?: any) {
    const now = Date.now();
    
    // 相同消息在3秒内不重复显示
    if (this.lastMessage === message && now - this.lastTime < 3000) {
      return;
    }
    
    this.lastMessage = message;
    this.lastTime = now;
    
    $hyapi.msg.createTips(type as any, message, options);
  }
}

// 使用防重复消息
const messageHelper = new MessageThrottle();
messageHelper.showTips('success', '数据已保存');  // 显示
messageHelper.showTips('success', '数据已保存');  // 3秒内重复，不显示`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #1890ff;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>🔔 轻量级提示功能</h2>
        <p><strong>核心特点:</strong> 不打断操作、自动消失、轻量快速、适合频繁提示</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="tipsSuccess()" style="margin-right:10px">
            ✅ 成功提示
          </button>
          <button nz-button nzType="danger" (click)="tipsError()" style="margin-right:10px">
            ❌ 错误提示
          </button>
          <button nz-button style="background:#faad14;border-color:#faad14;color:white" (click)="tipsWarning()" style="margin-right:10px">
            ⚠️ 警告提示
          </button>
          <button nz-button nzType="default" (click)="tipsInfo()" style="margin-right:10px">
            ℹ️ 信息提示
          </button>
          <button nz-button nzType="dashed" (click)="customDuration()">
            ⏱️ 自定义时长
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 轻量级提示详细说明:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #1890ff"><code>{{createTipsCode}}</code></pre>
        </div>
        
        <div style="display:flex;gap:15px;margin-top:15px">
          <div style="flex:1;padding:15px;background:#f0f9ff;border-radius:4px;border:1px solid #91d5ff">
            <h5 style="color:#1890ff;margin:0 0 10px 0">🔔 createTips 特点</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>轻量级，不阻断操作</li>
              <li>自动消失(默认3秒)</li>
              <li>适合频繁状态提示</li>
              <li>性能开销小</li>
            </ul>
          </div>
          <div style="flex:1;padding:15px;background:#f9f0ff;border-radius:4px;border:1px solid #d3adf7">
            <h5 style="color:#722ed1;margin:0 0 10px 0">💬 show 特点</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>重要消息确认</li>
              <li>支持回调处理</li>
              <li>可自定义配置</li>
              <li>需用户手动关闭</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
};
export const createTips: Story = CreateTipsTemplate.bind({});
createTips.storyName = '2️⃣ 轻量级提示';

// 3. 确认对话框
const ConfirmDialogTemplate: Story = (args: any) => {
  args.basicConfirm = () => {
    $hyapi.msg.confirm('确定要删除这条记录吗？', {
      callback: () => {
        $hyapi.msg.createTips('success', '删除成功');
        console.log('用户确认删除');
      },
      cancel: () => {
        $hyapi.msg.createTips('info', '取消删除');
        console.log('用户取消操作');
      }
    });
  };

  args.customButtons = () => {
    $hyapi.msg.confirm('是否保存当前修改的内容？', {
      okText: '保存',
      cancelText: '不保存',
      width: '450px',
      callback: () => {
        $hyapi.msg.createTips('success', '内容已保存');
      },
      cancel: () => {
        $hyapi.msg.createTips('warning', '修改内容未保存');
      }
    });
  };

  args.detailConfirm = () => {
    $hyapi.msg.confirm('确定要执行批量删除操作吗？', {
      width: '500px',
      content: '此操作将删除所选的15个用户，删除后数据无法恢复。请确认您有足够的权限执行此操作。',
      okText: '确认删除',
      cancelText: '取消',
      callback: () => {
        const loadingId = $hyapi.msg.loading({ msg: '正在删除用户...' });
        setTimeout(() => {
          $hyapi.msg.closeLoading(loadingId);
          $hyapi.msg.show('success', '批量删除完成', {
            content: '已成功删除15个用户账户'
          });
        }, 2000);
      },
      cancel: () => {
        $hyapi.msg.createTips('info', '已取消批量删除操作');
      }
    });
  };

  args.confirmCode = `
// ================ 确认对话框 confirm ================

// 基础确认对话框
$hyapi.msg.confirm('确定要删除这条记录吗？', {
  callback: () => {
    // 用户点击确认按钮
    console.log('用户确认删除');
    this.deleteRecord();
  },
  cancel: () => {
    // 用户点击取消按钮
    console.log('用户取消操作');
  }
});

// 自定义按钮文字和样式
$hyapi.msg.confirm('是否保存当前修改的内容？', {
  okText: '保存',              // 确认按钮文字
  cancelText: '不保存',         // 取消按钮文字
  width: '450px',              // 对话框宽度
  callback: () => {
    this.saveContent();
  },
  cancel: () => {
    this.discardChanges();
  }
});

// 带详细内容的确认对话框
$hyapi.msg.confirm('确定要执行批量删除操作吗？', {
  width: '500px',
  content: '此操作将删除所选的15个用户，删除后数据无法恢复。请确认您有足够的权限执行此操作。',
  okText: '确认删除',
  cancelText: '取消',
  callback: () => {
    this.performBatchDelete();
  },
  cancel: () => {
    console.log('用户取消批量删除');
  }
});

// ================ 配置选项详解 ================
{
  width: string | number,          // 对话框宽度
  okText: string,                  // 确认按钮文字，默认'确定'
  cancelText: string,              // 取消按钮文字，默认'取消'  
  content: string | TemplateRef,   // 详细内容说明
  callback: () => void,            // 确认回调函数
  cancel: () => void,              // 取消回调函数
  closable: boolean               // 是否可通过ESC或点击遮罩关闭
}

// ================ 实际使用场景 ================

class UserManagement {
  
  // 场景1：单个记录删除确认
  deleteUser(userId: number, userName: string) {
    $hyapi.msg.confirm(\`确定要删除用户"\${userName}"吗？\`, {
      content: '删除后该用户的所有数据将无法恢复',
      okText: '确认删除',
      cancelText: '取消',
      callback: () => {
        this.userService.delete(userId).then(() => {
          $hyapi.msg.createTips('success', '用户删除成功');
          this.refreshUserList();
        });
      }
    });
  }
  
  // 场景2：批量操作确认
  batchOperation(selectedUsers: any[]) {
    const count = selectedUsers.length;
    $hyapi.msg.confirm(\`确定要对选中的\${count}个用户执行批量操作吗？\`, {
      width: '480px',
      content: \`操作类型：禁用账户\\n影响范围：\${count}个用户\\n执行后用户将无法登录系统\`,
      okText: '确认执行',
      cancelText: '取消',
      callback: () => {
        this.performBatchDisable(selectedUsers);
      },
      cancel: () => {
        $hyapi.msg.createTips('info', '已取消批量操作');
      }
    });
  }
  
  // 场景3：重要设置修改确认
  changeSystemConfig(configData: any) {
    $hyapi.msg.confirm('确定要修改系统配置吗？', {
      width: '520px',
      content: '修改系统配置可能影响所有用户的使用体验，建议在非业务高峰期执行。',
      okText: '确认修改',
      cancelText: '稍后再说',
      callback: () => {
        // 显示loading
        const loadingId = $hyapi.msg.loading({ msg: '正在更新系统配置...' });
        
        this.configService.update(configData).then(() => {
          $hyapi.msg.closeLoading(loadingId);
          $hyapi.msg.show('success', '系统配置更新成功', {
            content: '新配置将在下次系统重启后生效',
            callback: () => {
              this.router.navigate(['/admin/config']);
            }
          });
        }).catch((error) => {
          $hyapi.msg.closeLoading(loadingId);
          $hyapi.msg.show('error', '配置更新失败', {
            content: error.message
          });
        });
      }
    });
  }
  
  // 场景4：数据导出确认
  exportData(exportParams: any) {
    const { startDate, endDate, dataType } = exportParams;
    
    $hyapi.msg.confirm('确定要导出数据吗？', {
      width: '500px',
      content: \`导出范围：\${startDate} 至 \${endDate}\\n数据类型：\${dataType}\\n预计文件大小：约 15MB\`,
      okText: '开始导出',
      cancelText: '取消',
      callback: () => {
        $hyapi.msg.createTips('info', '导出任务已开始，请稍候...');
        this.dataService.export(exportParams);
      }
    });
  }
}

// ================ 异步操作的确认处理 ================

class AsyncConfirmExample {
  
  // 异步验证后的确认
  async deleteWithValidation(id: number) {
    try {
      // 先验证是否可以删除
      const canDelete = await this.validateDelete(id);
      
      if (!canDelete.allowed) {
        $hyapi.msg.show('warning', '无法删除该记录', {
          content: canDelete.reason
        });
        return;
      }
      
      // 验证通过，显示确认对话框
      $hyapi.msg.confirm('验证通过，确定要删除吗？', {
        content: \`关联数据：\${canDelete.relatedCount} 条\\n删除后将一并清理关联数据\`,
        callback: () => {
          this.performDelete(id);
        }
      });
      
    } catch (error) {
      $hyapi.msg.show('error', '验证失败', {
        content: '无法验证删除权限，请稍后重试'
      });
    }
  }
  
  // 条件确认
  conditionalConfirm(item: any) {
    let message = '确定要删除该项目吗？';
    let content = '';
    
    if (item.hasChildren) {
      message = '该项目包含子项目，确定删除吗？';
      content = \`将同时删除 \${item.childrenCount} 个子项目\`;
    }
    
    if (item.isActive) {
      message = '该项目正在使用中，确定删除吗？';
      content = '删除后可能影响正在进行的任务';
    }
    
    $hyapi.msg.confirm(message, {
      content,
      okText: item.isActive ? '强制删除' : '确认删除',
      callback: () => {
        this.deleteItem(item.id, item.isActive);
      }
    });
  }
}`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #fa8c16;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>❓ 确认对话框功能</h2>
        <p><strong>核心作用:</strong> 重要操作确认、用户决策、防误操作、提供详细说明</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="basicConfirm()" style="margin-right:10px">
            ❓ 基础确认
          </button>
          <button nz-button nzType="default" (click)="customButtons()" style="margin-right:10px">
            🎛️ 自定义按钮
          </button>
          <button nz-button nzType="dashed" (click)="detailConfirm()">
            📝 详细说明确认
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 确认对话框完整指南:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #fa8c16"><code>{{confirmCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#fff7e6;border-radius:4px;border:1px solid #ffd591">
            <h5 style="color:#fa8c16;margin:0 0 10px 0">❓ 基础确认</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>简单确认/取消</li>
              <li>防误操作</li>
              <li>快速决策</li>
            </ul>
          </div>
          <div style="padding:15px;background:#fff7e6;border-radius:4px;border:1px solid #ffd591">
            <h5 style="color:#fa8c16;margin:0 0 10px 0">🎛️ 自定义确认</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>自定义按钮文字</li>
              <li>调整对话框大小</li>
              <li>个性化体验</li>
            </ul>
          </div>
          <div style="padding:15px;background:#fff7e6;border-radius:4px;border:1px solid #ffd591">
            <h5 style="color:#fa8c16;margin:0 0 10px 0">📝 详细确认</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>提供详细说明</li>
              <li>风险提示</li>
              <li>影响范围说明</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
};
export const confirmDialog: Story = ConfirmDialogTemplate.bind({});
confirmDialog.storyName = '3️⃣ 确认对话框';

// 4. Loading加载状态
const LoadingTemplate: Story = (args: any) => {
  args.basicLoading = () => {
    const loadingId = $hyapi.msg.loading();
    setTimeout(() => {
      $hyapi.msg.closeLoading(loadingId);
      $hyapi.msg.createTips('success', '加载完成');
    }, 3000);
  };

  args.customLoading = () => {
    const loadingId = $hyapi.msg.loading({ 
      msg: '正在处理数据，请稍候...', 
      time: 5000 
    });
    setTimeout(() => {
      $hyapi.msg.closeLoading(loadingId);
      $hyapi.msg.createTips('success', '数据处理完成');
    }, 4000);
  };

  args.longTimeLoading = () => {
    const loadingId = $hyapi.msg.loading({ 
      msg: '正在导出大量数据，预计需要30秒...', 
      time: 35000 
    });
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        // 这里可以更新loading文字显示进度
        console.log(`进度: ${progress}%`);
      } else {
        clearInterval(interval);
        $hyapi.msg.closeLoading(loadingId);
        $hyapi.msg.show('success', '数据导出完成', {
          content: '文件已保存到下载目录'
        });
      }
    }, 1000);
  };

  args.loadingCode = `
// ================ Loading加载状态 ================

// 基础loading - 默认配置
const loadingId = $hyapi.msg.loading();

// 3秒后手动关闭
setTimeout(() => {
  $hyapi.msg.closeLoading(loadingId);
  $hyapi.msg.createTips('success', '操作完成');
}, 3000);

// 自定义loading消息和超时时间
const loadingId = $hyapi.msg.loading({ 
  msg: '正在处理数据，请稍候...', 
  time: 5000                    // 5秒后自动关闭
});

// 手动关闭loading
$hyapi.msg.closeLoading(loadingId);

// ================ 配置选项 ================
{
  msg: string,     // loading显示的消息文字
  time: number     // 超时自动关闭时间(毫秒)，0表示不自动关闭
}

// ================ 实际使用场景 ================

class DataService {
  
  // 场景1：简单数据加载
  loadUserData() {
    const loadingId = $hyapi.msg.loading({ msg: '正在加载用户数据...' });
    
    this.http.get('/api/users').subscribe({
      next: (data) => {
        $hyapi.msg.closeLoading(loadingId);
        this.users = data;
        $hyapi.msg.createTips('success', '数据加载完成');
      },
      error: (error) => {
        $hyapi.msg.closeLoading(loadingId);
        $hyapi.msg.show('error', '数据加载失败', {
          content: error.message
        });
      }
    });
  }
  
  // 场景2：文件上传进度
  uploadFile(file: File) {
    const loadingId = $hyapi.msg.loading({ 
      msg: '正在上传文件...', 
      time: 0  // 不自动关闭，手动控制
    });
    
    this.fileService.upload(file).subscribe({
      next: (event) => {
        if (event.type === 'progress') {
          // 可以更新loading消息显示进度
          console.log(\`上传进度: \${event.loaded/event.total*100}%\`);
        } else if (event.type === 'response') {
          $hyapi.msg.closeLoading(loadingId);
          $hyapi.msg.show('success', '文件上传成功', {
            content: \`文件地址: \${event.body.url}\`
          });
        }
      },
      error: (error) => {
        $hyapi.msg.closeLoading(loadingId);
        $hyapi.msg.show('error', '文件上传失败', {
          content: error.message
        });
      }
    });
  }
  
  // 场景3：批量操作进度
  async batchProcess(items: any[]) {
    const total = items.length;
    const loadingId = $hyapi.msg.loading({ 
      msg: \`正在处理 0/\${total} 项...\`,
      time: 0 
    });
    
    let processed = 0;
    let succeeded = 0;
    let failed = 0;
    
    for (const item of items) {
      try {
        await this.processItem(item);
        succeeded++;
      } catch (error) {
        failed++;
        console.error(\`处理项目 \${item.id} 失败:\`, error);
      }
      
      processed++;
      
      // 更新进度提示（这里简化处理，实际可能需要更新loading文字）
      console.log(\`进度: \${processed}/\${total}\`);
    }
    
    $hyapi.msg.closeLoading(loadingId);
    
    // 显示最终结果
    if (failed === 0) {
      $hyapi.msg.createTips('success', \`批量处理完成，成功处理 \${succeeded} 项\`);
    } else {
      $hyapi.msg.show('warning', '批量处理完成', {
        content: \`成功: \${succeeded} 项，失败: \${failed} 项\`
      });
    }
  }
  
  // 场景4：数据导出
  exportData(params: any) {
    const loadingId = $hyapi.msg.loading({ 
      msg: '正在生成导出文件，请耐心等待...', 
      time: 60000  // 设置较长的超时时间
    });
    
    this.exportService.generateFile(params).subscribe({
      next: (result) => {
        $hyapi.msg.closeLoading(loadingId);
        
        if (result.success) {
          $hyapi.msg.show('success', '导出完成', {
            content: \`文件大小: \${result.fileSize}\\n点击确定开始下载\`,
            callback: () => {
              window.open(result.downloadUrl);
            }
          });
        }
      },
      error: (error) => {
        $hyapi.msg.closeLoading(loadingId);
        $hyapi.msg.show('error', '导出失败', {
          content: '请检查数据范围或稍后重试'
        });
      }
    });
  }
}

// ================ Loading的最佳实践 ================

class LoadingBestPractices {
  
  // 1. 防止重复loading
  private loadingMap = new Map<string, any>();
  
  showLoading(key: string, msg: string) {
    // 如果已有相同的loading，先关闭
    if (this.loadingMap.has(key)) {
      $hyapi.msg.closeLoading(this.loadingMap.get(key));
    }
    
    const loadingId = $hyapi.msg.loading({ msg });
    this.loadingMap.set(key, loadingId);
    return loadingId;
  }
  
  closeLoading(key: string) {
    if (this.loadingMap.has(key)) {
      $hyapi.msg.closeLoading(this.loadingMap.get(key));
      this.loadingMap.delete(key);
    }
  }
  
  // 2. 带超时处理的loading
  loadingWithTimeout(msg: string, timeoutMs: number = 30000) {
    const loadingId = $hyapi.msg.loading({ msg, time: 0 });
    
    const timeoutId = setTimeout(() => {
      $hyapi.msg.closeLoading(loadingId);
      $hyapi.msg.show('warning', '操作超时', {
        content: '请检查网络连接或稍后重试'
      });
    }, timeoutMs);
    
    return {
      close: () => {
        clearTimeout(timeoutId);
        $hyapi.msg.closeLoading(loadingId);
      }
    };
  }
  
  // 3. 异步操作封装
  async withLoading<T>(
    asyncOperation: () => Promise<T>, 
    loadingMsg: string = '处理中...'
  ): Promise<T> {
    const loadingId = $hyapi.msg.loading({ msg: loadingMsg });
    
    try {
      const result = await asyncOperation();
      $hyapi.msg.closeLoading(loadingId);
      return result;
    } catch (error) {
      $hyapi.msg.closeLoading(loadingId);
      throw error;
    }
  }
  
  // 使用示例
  async saveData(data: any) {
    try {
      const result = await this.withLoading(
        () => this.dataService.save(data),
        '正在保存数据...'
      );
      
      $hyapi.msg.createTips('success', '保存成功');
      return result;
    } catch (error) {
      $hyapi.msg.show('error', '保存失败', {
        content: error.message
      });
    }
  }
}

// ================ 注意事项 ================

// ❌ 错误用法：
// 1. 忘记关闭loading
const loading1 = $hyapi.msg.loading();
// ... 异步操作
// 忘记调用 $hyapi.msg.closeLoading(loading1);

// 2. 重复显示loading
const loading1 = $hyapi.msg.loading();
const loading2 = $hyapi.msg.loading(); // 错误：会产生多个loading

// ✅ 正确用法：
// 1. 始终在finally中关闭loading
const loadingId = $hyapi.msg.loading();
try {
  await someAsyncOperation();
} finally {
  $hyapi.msg.closeLoading(loadingId);
}

// 2. 使用封装函数避免遗忘
const withLoading = async (operation, msg) => {
  const loadingId = $hyapi.msg.loading({ msg });
  try {
    return await operation();
  } finally {
    $hyapi.msg.closeLoading(loadingId);
  }
};`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #722ed1;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>⏳ Loading加载状态</h2>
        <p><strong>核心功能:</strong> 显示处理进度、阻止用户操作、提供等待反馈、防止重复提交</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="basicLoading()" style="margin-right:10px">
            ⏳ 基础Loading
          </button>
          <button nz-button nzType="default" (click)="customLoading()" style="margin-right:10px">
            🛠️ 自定义Loading
          </button>
          <button nz-button nzType="dashed" (click)="longTimeLoading()">
            ⏰ 长时间Loading
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 Loading状态完整使用指南:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #722ed1"><code>{{loadingCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#f9f0ff;border-radius:4px;border:1px solid #d3adf7">
            <h5 style="color:#722ed1;margin:0 0 10px 0">🎯 使用场景</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>数据加载等待</li>
              <li>文件上传进度</li>
              <li>批量操作处理</li>
              <li>导出生成文件</li>
            </ul>
          </div>
          <div style="padding:15px;background:#f9f0ff;border-radius:4px;border:1px solid #d3adf7">
            <h5 style="color:#722ed1;margin:0 0 10px 0">⚙️ 配置选项</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>自定义提示文字</li>
              <li>设置超时时间</li>
              <li>手动控制关闭</li>
              <li>防重复显示</li>
            </ul>
          </div>
          <div style="padding:15px;background:#f9f0ff;border-radius:4px;border:1px solid #d3adf7">
            <h5 style="color:#722ed1;margin:0 0 10px 0">💡 最佳实践</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>总是在finally中关闭</li>
              <li>设置合理超时时间</li>
              <li>避免重复loading</li>
              <li>提供有意义的提示</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
};
export const loading: Story = LoadingTemplate.bind({});
loading.storyName = '4️⃣ Loading加载状态';

// 5. 表单错误提示
const FormErrorTemplate: Story = (args: any) => {
  args.showFormError = () => {
    // 模拟表单错误数据
    const errorData = {
      gtName: 'userForm',
      errorData: [
        { modelName: 'username', message: '用户名不能为空' },
        { modelName: 'email', message: '邮箱格式不正确' },
        { modelName: 'phone', message: '手机号已被使用' }
      ]
    };
    
    $hyapi.msg.showErrorMessage(errorData, _this);
    $hyapi.msg.createTips('info', '表单错误提示已显示，将在3秒后自动消失');
  };

  args.formErrorCode = `
// ================ 表单错误提示 showErrorMessage ================

// 显示表单验证错误
const errorData = {
  gtName: 'userForm',              // gt表单名称
  errorData: [                     // 错误信息数组
    { 
      modelName: 'username',       // 字段的model名称
      message: '用户名不能为空'      // 错误提示信息
    },
    { 
      modelName: 'email', 
      message: '邮箱格式不正确' 
    },
    { 
      modelName: 'phone', 
      message: '手机号已被使用' 
    }
  ]
};

$hyapi.msg.showErrorMessage(errorData, modelService);

// ================ 参数说明 ================
// gtName: string - gt表单的名称，对应 hy-gt 的 model 属性
// errorData: Array<{modelName: string, message: string}> - 错误信息数组
// modelService: ModelService - 当前页面的 ModelService 实例

// ================ 实际使用场景 ================

class FormValidationExample {
  
  constructor(private modelService: ModelService) {}
  
  // 场景1：服务端验证错误
  submitForm(formData: any) {
    this.userService.createUser(formData).subscribe({
      next: (response) => {
        if (response.success) {
          $hyapi.msg.createTips('success', '用户创建成功');
        } else {
          // 服务端返回字段级错误
          if (response.fieldErrors) {
            const errorData = {
              gtName: 'userForm',
              errorData: response.fieldErrors.map(error => ({
                modelName: error.field,
                message: error.message
              }))
            };
            
            $hyapi.msg.showErrorMessage(errorData, this.modelService);
          }
        }
      },
      error: (error) => {
        $hyapi.msg.show('error', '提交失败', {
          content: error.message
        });
      }
    });
  }
  
  // 场景2：批量验证错误
  validateBatchData(batchData: any[]) {
    const errors = [];
    
    batchData.forEach((item, index) => {
      // 验证每一行数据
      if (!item.name) {
        errors.push({
          modelName: \`item\${index}_name\`,
          message: \`第\${index + 1}行：姓名不能为空\`
        });
      }
      
      if (!this.isValidEmail(item.email)) {
        errors.push({
          modelName: \`item\${index}_email\`,
          message: \`第\${index + 1}行：邮箱格式错误\`
        });
      }
    });
    
    if (errors.length > 0) {
      $hyapi.msg.showErrorMessage({
        gtName: 'batchForm',
        errorData: errors
      }, this.modelService);
      
      return false;
    }
    
    return true;
  }
  
  // 场景3：动态表单验证
  validateDynamicForm(formConfig: any, formData: any) {
    const errors = [];
    
    formConfig.fields.forEach(field => {
      const value = formData[field.name];
      
      // 必填验证
      if (field.required && (!value || value.trim() === '')) {
        errors.push({
          modelName: field.name,
          message: \`\${field.label}不能为空\`
        });
      }
      
      // 长度验证
      if (field.maxLength && value && value.length > field.maxLength) {
        errors.push({
          modelName: field.name,
          message: \`\${field.label}长度不能超过\${field.maxLength}个字符\`
        });
      }
      
      // 格式验证
      if (field.pattern && value && !field.pattern.test(value)) {
        errors.push({
          modelName: field.name,
          message: field.patternMessage || \`\${field.label}格式不正确\`
        });
      }
    });
    
    if (errors.length > 0) {
      $hyapi.msg.showErrorMessage({
        gtName: formConfig.gtName,
        errorData: errors
      }, this.modelService);
    }
    
    return errors.length === 0;
  }
  
  // 场景4：实时验证与错误清除
  setupRealTimeValidation() {
    // 监听表单字段变化
    this.modelService.formChange.subscribe((changes) => {
      // 清除之前的错误
      this.clearFieldError(changes.fieldName);
      
      // 实时验证
      const error = this.validateField(changes.fieldName, changes.value);
      if (error) {
        $hyapi.msg.showErrorMessage({
          gtName: changes.gtName,
          errorData: [{ modelName: changes.fieldName, message: error }]
        }, this.modelService);
      }
    });
  }
  
  private clearFieldError(fieldName: string) {
    // 清除指定字段的错误状态
    const formControl = this.modelService.getFormControl(fieldName);
    if (formControl) {
      formControl.setErrors(null);
    }
  }
  
  private validateField(fieldName: string, value: any): string | null {
    // 字段验证逻辑
    switch (fieldName) {
      case 'email':
        return this.isValidEmail(value) ? null : '邮箱格式不正确';
      case 'phone':
        return this.isValidPhone(value) ? null : '手机号格式不正确';
      case 'username':
        return value && value.length >= 3 ? null : '用户名至少3个字符';
      default:
        return null;
    }
  }
}

// ================ 与后端API集成 ================

class ApiIntegration {
  
  // 处理后端返回的验证错误
  handleApiValidationError(response: any) {
    if (response.validationErrors) {
      const errorData = {
        gtName: response.formName || 'defaultForm',
        errorData: Object.keys(response.validationErrors).map(field => ({
          modelName: field,
          message: response.validationErrors[field][0] // 取第一个错误信息
        }))
      };
      
      $hyapi.msg.showErrorMessage(errorData, this.modelService);
    }
  }
  
  // 统一的表单提交错误处理
  handleFormSubmitError(error: any, gtName: string) {
    if (error.status === 422) {
      // 验证错误
      this.handleApiValidationError(error.error);
    } else if (error.status === 400) {
      // 业务逻辑错误
      $hyapi.msg.show('error', '提交失败', {
        content: error.error.message || '请检查输入信息'
      });
    } else {
      // 其他错误
      $hyapi.msg.show('error', '系统异常', {
        content: '请稍后重试或联系管理员'
      });
    }
  }
}

// ================ 错误提示的样式和行为 ================

// 错误提示特点：
// 1. 自动定位到对应的表单字段
// 2. 3秒后自动消失
// 3. 字段获得焦点时错误状态清除
// 4. 支持多个字段同时显示错误
// 5. 错误样式与表单组件集成

// 错误显示机制：
// 1. 通过 modelService 定位到具体的表单控件
// 2. 设置表单控件的错误状态
// 3. 在表单控件下方显示错误信息
// 4. 自动设置定时器清除错误状态

// 最佳实践：
// 1. 错误信息要简洁明了
// 2. 避免技术术语，使用用户友好的语言
// 3. 提供修正建议，如正确的格式示例
// 4. 批量错误时按重要性排序
// 5. 长列表错误要考虑分页或折叠显示`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #f5222d;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>📝 表单错误提示功能</h2>
        <p><strong>专业特性:</strong> 字段级错误定位、自动消失、集成表单验证、支持批量错误</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="danger" (click)="showFormError()" style="margin-right:10px">
            📝 显示表单错误
          </button>
          <div style="margin-top:10px;padding:10px;background:#fff2f0;border-radius:4px;border-left:4px solid #f5222d">
            <small style="color:#666">
              <strong>提示:</strong> 点击按钮后将在表单字段下方显示错误信息，3秒后自动消失
            </small>
          </div>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 表单错误提示完整解决方案:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #f5222d"><code>{{formErrorCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#fff2f0;border-radius:4px;border:1px solid #ffb3b3">
            <h5 style="color:#f5222d;margin:0 0 10px 0">🎯 核心特性</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>字段级精确定位</li>
              <li>3秒自动消失机制</li>
              <li>与表单组件深度集成</li>
              <li>支持多字段批量错误</li>
              <li>实时验证状态更新</li>
            </ul>
          </div>
          <div style="padding:15px;background:#fff2f0;border-radius:4px;border:1px solid #ffb3b3">
            <h5 style="color:#f5222d;margin:0 0 10px 0">💼 应用场景</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>服务端验证错误回显</li>
              <li>前端实时字段验证</li>
              <li>批量数据验证错误</li>
              <li>动态表单验证提示</li>
              <li>API错误统一处理</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
};
export const formError: Story = FormErrorTemplate.bind({});
formError.storyName = '5️⃣ 表单错误提示';

// 6. 完整配置和最佳实践
const CompleteConfigTemplate: Story = (args: any) => {
  args.allFeaturesDemo = () => {
    $hyapi.msg.createTips('info', '这是所有消息功能的综合演示，请查看代码了解完整用法');
  };

  args.completeCode = `
// ==================== $hyapi.msg 完整功能概览 ====================

// ================ 1. 基础消息显示 show ================
$hyapi.msg.show(type, message, options);

// 参数详解：
// type: 'success' | 'info' | 'warning' | 'error'
// message: string | TemplateRef<any> - 主要消息内容
// options: {
//   width?: string | number,        // 消息框宽度
//   callback?: () => void,          // 关闭后回调函数
//   content?: string | TemplateRef, // 附加内容
//   closable?: boolean             // 是否显示关闭按钮
// }

// ================ 2. 轻量提示 createTips ================
$hyapi.msg.createTips(type, message, options);

// 参数详解：
// type: 'success' | 'info' | 'warning' | 'error'
// message: string | TemplateRef<any> - 提示内容
// options: {
//   duration?: number              // 显示时长(毫秒)，默认3000
// }

// ================ 3. 确认对话框 confirm ================
$hyapi.msg.confirm(message, options);

// 参数详解：
// message: string | TemplateRef<any> - 确认消息
// options: {
//   width?: string | number,        // 对话框宽度
//   okText?: string,               // 确认按钮文字
//   cancelText?: string,           // 取消按钮文字
//   content?: string | TemplateRef, // 详细说明内容
//   callback?: () => void,          // 确认回调
//   cancel?: () => void,           // 取消回调
//   closable?: boolean             // 是否可关闭
// }

// ================ 4. 加载状态 loading ================
const loadingId = $hyapi.msg.loading(options);
$hyapi.msg.closeLoading(loadingId);

// 参数详解：
// options: {
//   msg?: string,                  // 加载提示文字
//   time?: number                  // 超时自动关闭(毫秒)，0为不自动关闭
// }

// ================ 5. 表单错误提示 showErrorMessage ================
$hyapi.msg.showErrorMessage(errorData, modelService);

// 参数详解：
// errorData: {
//   gtName: string,                // gt表单名称
//   errorData: Array<{
//     modelName: string,           // 字段model名称
//     message: string              // 错误信息
//   }>
// }
// modelService: ModelService      // 页面的ModelService实例

// ================ 6. 弹窗配置更新 updateConfig ================
$hyapi.msg.updateConfig(dialogModal, options);

// 参数详解：
// dialogModal: NzModalRef         // 弹窗引用
// options: {
//   closable?: boolean,           // 是否可关闭
//   width?: string | number,      // 宽度
//   content?: string | TemplateRef, // 内容
//   okText?: string,              // 确认按钮文字
//   cancelText?: string,          // 取消按钮文字
//   autofocus?: 'ok' | 'cancel' | 'auto' // 自动聚焦
// }

// ================ 7. 关闭会话窗口 close ================
$hyapi.msg.close(tplModal);

// 参数详解：
// tplModal: any                   // 模板弹窗引用

// ==================== 实际项目中的完整解决方案 ====================

class MessageService {
  
  constructor(private modelService: ModelService) {}
  
  // 成功操作的标准化处理
  handleSuccess(message: string, callback?: () => void) {
    $hyapi.msg.show('success', message, {
      callback: callback || (() => {
        // 默认成功后的操作
        this.refreshData();
      })
    });
  }
  
  // 错误处理的标准化流程
  handleError(error: any, context: string = '') {
    console.error(\`Error in \${context}:\`, error);
    
    if (error.status === 422) {
      // 表单验证错误
      this.handleValidationError(error.error);
    } else if (error.status === 403) {
      // 权限错误
      $hyapi.msg.show('warning', '权限不足', {
        content: '您没有执行此操作的权限，请联系管理员',
        callback: () => this.redirectToHome()
      });
    } else if (error.status === 401) {
      // 认证错误
      $hyapi.msg.confirm('登录已过期，是否重新登录？', {
        callback: () => this.redirectToLogin(),
        cancel: () => this.redirectToHome()
      });
    } else {
      // 一般错误
      $hyapi.msg.show('error', '操作失败', {
        content: error.message || '系统异常，请稍后重试',
        closable: true
      });
    }
  }
  
  // 批量操作的结果处理
  handleBatchResult(results: any[]) {
    const success = results.filter(r => r.success).length;
    const failed = results.length - success;
    
    if (failed === 0) {
      $hyapi.msg.createTips('success', \`批量操作完成，成功处理 \${success} 项\`);
    } else if (success === 0) {
      $hyapi.msg.show('error', '批量操作失败', {
        content: \`全部 \${failed} 项操作失败，请检查数据或权限\`
      });
    } else {
      $hyapi.msg.show('warning', '批量操作部分成功', {
        content: \`成功: \${success} 项，失败: \${failed} 项\\n点击确定查看详细结果\`,
        callback: () => this.showBatchDetails(results)
      });
    }
  }
  
  // 异步操作的标准流程
  async executeWithLoading<T>(
    operation: () => Promise<T>,
    loadingMsg: string = '处理中...',
    successMsg?: string
  ): Promise<T | null> {
    const loadingId = $hyapi.msg.loading({ msg: loadingMsg });
    
    try {
      const result = await operation();
      $hyapi.msg.closeLoading(loadingId);
      
      if (successMsg) {
        $hyapi.msg.createTips('success', successMsg);
      }
      
      return result;
    } catch (error) {
      $hyapi.msg.closeLoading(loadingId);
      this.handleError(error, 'executeWithLoading');
      return null;
    }
  }
  
  // 确认操作的标准流程
  confirmAndExecute(
    message: string,
    operation: () => Promise<any>,
    options: {
      content?: string,
      okText?: string,
      cancelText?: string,
      successMsg?: string,
      loadingMsg?: string
    } = {}
  ) {
    $hyapi.msg.confirm(message, {
      content: options.content,
      okText: options.okText || '确认',
      cancelText: options.cancelText || '取消',
      callback: async () => {
        await this.executeWithLoading(
          operation,
          options.loadingMsg || '处理中...',
          options.successMsg
        );
      }
    });
  }
  
  // 表单验证错误处理
  private handleValidationError(errorResponse: any) {
    if (errorResponse.fieldErrors) {
      const errorData = {
        gtName: errorResponse.formName || 'form',
        errorData: errorResponse.fieldErrors.map(error => ({
          modelName: error.field,
          message: error.message
        }))
      };
      
      $hyapi.msg.showErrorMessage(errorData, this.modelService);
    } else {
      $hyapi.msg.show('error', '数据验证失败', {
        content: errorResponse.message || '请检查输入信息'
      });
    }
  }
}

// ==================== 使用示例 ====================

class UserManagementComponent {
  
  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}
  
  // 创建用户
  async createUser(userData: any) {
    await this.messageService.executeWithLoading(
      () => this.userService.create(userData),
      '正在创建用户...',
      '用户创建成功'
    );
  }
  
  // 删除用户
  deleteUser(userId: number, userName: string) {
    this.messageService.confirmAndExecute(
      \`确定要删除用户"\${userName}"吗？\`,
      () => this.userService.delete(userId),
      {
        content: '删除后用户数据将无法恢复',
        okText: '确认删除',
        successMsg: '用户删除成功',
        loadingMsg: '正在删除用户...'
      }
    );
  }
  
  // 批量删除
  async batchDelete(selectedIds: number[]) {
    this.messageService.confirmAndExecute(
      \`确定要删除选中的 \${selectedIds.length} 个用户吗？\`,
      async () => {
        const results = await Promise.allSettled(
          selectedIds.map(id => this.userService.delete(id))
        );
        
        this.messageService.handleBatchResult(
          results.map(r => ({ success: r.status === 'fulfilled' }))
        );
      },
      {
        content: '批量删除操作无法撤销',
        okText: '确认删除'
      }
    );
  }
}

// ==================== 消息类型使用指南 ====================

// 🎯 什么时候使用 show：
// - 需要用户明确确认的重要信息
// - 需要执行回调操作的成功/失败通知
// - 错误信息需要详细说明
// - 需要用户阅读详细内容

// 🎯 什么时候使用 createTips：
// - 快速状态反馈
// - 不需要用户确认的一般信息
// - 频繁的操作提示
// - 临时状态通知

// 🎯 什么时候使用 confirm：
// - 删除、修改等不可逆操作
// - 重要设置变更
// - 数据提交前的最终确认
// - 需要用户做出选择的场景

// 🎯 什么时候使用 loading：
// - 任何异步操作
// - 文件上传/下载
// - 数据加载
// - 需要阻止用户重复操作的场景

// 🎯 什么时候使用 showErrorMessage：
// - 表单字段验证错误
// - 服务端返回的字段级错误
// - 需要精确定位到具体字段的错误
// - 批量数据验证错误

// ==================== 性能优化建议 ====================

// 1. 防抖处理频繁消息
class MessageDebounce {
  private timeouts = new Map<string, any>();
  
  debounceTips(key: string, type: string, message: string, delay = 300) {
    if (this.timeouts.has(key)) {
      clearTimeout(this.timeouts.get(key));
    }
    
    this.timeouts.set(key, setTimeout(() => {
      $hyapi.msg.createTips(type as any, message);
      this.timeouts.delete(key);
    }, delay));
  }
}

// 2. 消息队列管理
class MessageQueue {
  private queue: Array<() => void> = [];
  private processing = false;
  
  add(messageAction: () => void) {
    this.queue.push(messageAction);
    this.process();
  }
  
  private async process() {
    if (this.processing) return;
    this.processing = true;
    
    while (this.queue.length > 0) {
      const action = this.queue.shift();
      if (action) {
        action();
        await new Promise(resolve => setTimeout(resolve, 100)); // 间隔100ms
      }
    }
    
    this.processing = false;
  }
}

// 3. 内存泄漏防护
class MessageMemoryGuard {
  private loadingIds = new Set<any>();
  
  loading(options?: any) {
    const id = $hyapi.msg.loading(options);
    this.loadingIds.add(id);
    return id;
  }
  
  closeLoading(id: any) {
    $hyapi.msg.closeLoading(id);
    this.loadingIds.delete(id);
  }
  
  // 组件销毁时清理所有loading
  ngOnDestroy() {
    this.loadingIds.forEach(id => {
      $hyapi.msg.closeLoading(id);
    });
    this.loadingIds.clear();
  }
}`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #1890ff;padding:15px;margin-bottom:15px;border-radius:8px;background:linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)">
        <h2 style="color:#1890ff">📚 $hyapi.msg 完整功能手册</h2>
        <p><strong>终极指南:</strong> 所有消息功能、配置选项、最佳实践、性能优化</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" size="large" (click)="allFeaturesDemo()">
            📋 查看完整功能手册
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 完整API参考和最佳实践:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:10px;line-height:1.3;overflow-x:auto;border-left:4px solid #1890ff;max-height:600px;overflow-y:auto"><code>{{completeCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:10px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h5 style="color:#52c41a;margin:0 0 5px 0">💬 show</h5>
            <p style="margin:0;font-size:11px">重要消息确认</p>
          </div>
          <div style="padding:10px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h5 style="color:#1890ff;margin:0 0 5px 0">🔔 createTips</h5>
            <p style="margin:0;font-size:11px">轻量级提示</p>
          </div>
          <div style="padding:10px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h5 style="color:#fa8c16;margin:0 0 5px 0">❓ confirm</h5>
            <p style="margin:0;font-size:11px">确认对话框</p>
          </div>
          <div style="padding:10px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h5 style="color:#722ed1;margin:0 0 5px 0">⏳ loading</h5>
            <p style="margin:0;font-size:11px">加载状态</p>
          </div>
          <div style="padding:10px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h5 style="color:#f5222d;margin:0 0 5px 0">📝 showErrorMessage</h5>
            <p style="margin:0;font-size:11px">表单错误</p>
          </div>
        </div>
        
        <div style="margin-top:20px;padding:20px;background:#ffffff;border:2px solid #52c41a;border-radius:8px">
          <h4 style="margin:0 0 15px 0;color:#52c41a">🎓 消息组件最佳实践总结</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <div>
              <h5 style="color:#1890ff;margin:0 0 10px 0">✅ 推荐做法</h5>
              <ul style="margin:0;padding-left:20px;color:#666;font-size:13px">
                <li>根据消息重要性选择合适的显示方式</li>
                <li>重要操作使用confirm确认，状态反馈使用createTips</li>
                <li>异步操作必须配合loading状态</li>
                <li>表单验证错误使用showErrorMessage精确定位</li>
                <li>封装统一的消息处理服务</li>
                <li>设置合理的超时时间和回调处理</li>
              </ul>
            </div>
            <div>
              <h5 style="color:#f5222d;margin:0 0 10px 0">❌ 避免做法</h5>
              <ul style="margin:0;padding-left:20px;color:#666;font-size:13px">
                <li>不要过度使用show，频繁打断用户操作</li>
                <li>避免遗忘关闭loading造成界面阻塞</li>
                <li>不要在循环中大量调用消息API</li>
                <li>避免消息内容过于技术化</li>
                <li>不要忽略用户取消操作的处理</li>
                <li>避免重复显示相同的错误信息</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="margin-top:15px;padding:15px;background:#fff9e6;border-radius:8px;border-left:5px solid #faad14">
          <h4 style="margin:0 0 10px 0;color:#faad14">💡 开发提示</h4>
          <p style="margin:0;color:#666;font-size:13px">
            $hyapi.msg 是HyFrame框架的核心消息系统，提供了完整的用户交互反馈机制。
            从简单的状态提示到复杂的表单验证，从确认对话框到加载状态管理，涵盖了前端开发中所有常见的消息处理场景。
            <br><br>
            <strong>记住：</strong>好的用户体验来自于恰当的消息反馈！选择合适的消息类型，提供清晰的反馈信息，让用户始终了解系统状态。
          </p>
        </div>
      </div>
    `
  };
};
export const completeConfig: Story = CompleteConfigTemplate.bind({});
completeConfig.storyName = '6️⃣ 完整功能手册'; 