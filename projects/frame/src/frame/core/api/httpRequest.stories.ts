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
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ServerTimeService } from '../service/server-time';

let _this;
class MockHttpService implements Partial<ModelService> {
  constructor() {
    _this = this;
    setTimeout(() => {
      console.log('HTTP请求服务已初始化', this);
    }, 100);
  }
}

export default {
  title: 'HTTP请求详细文档/$hyapi.io',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockHttpService }, ServerTimeService, TableService]
    }),
  ],
} as Meta;

// 1. 基础POST请求 - 详细版
const BasicPostDetailTemplate: Story = (args: any) => {
  args.basicPost = () => {
    const userData = {
      userId: 1001,
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '13812345678',
      department: '技术部',
      position: '前端开发工程师'
    };
    
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/user/create', userData, {
      showMsg: true,           // 成功时显示 "操作成功" 提示
      showFailMsg: true,       // 失败时显示后端返回的错误信息
      showErrorMsg: true,      // 网络错误时显示错误信息
      showLoading: false,      // 不显示loading状态
      
      successFn: (response) => {
        console.log('✅ 用户创建成功:', response);
        // response 结构示例:
        // {
        //   success: true,
        //   message: "用户创建成功",
        //   datas: {
        //     userId: 1001,
        //     createTime: "2024-01-01 10:30:00"
        //   }
        // }
        
        // 在这里可以进行后续操作
        $hyapi.msg.createTips('success', `用户 ${userData.name} 创建成功！`);
      },
      
      failFn: (response) => {
        console.log('❌ 业务逻辑失败:', response);
        // response 结构示例:
        // {
        //   success: false,
        //   message: "用户名已存在",
        //   errorCode: "USER_EXISTS"
        // }
        
        // 根据不同错误码进行不同处理
        if (response.errorCode === 'USER_EXISTS') {
          $hyapi.msg.createTips('warning', '用户名已存在，请选择其他用户名');
        } else {
          $hyapi.msg.createTips('error', response.message || '创建用户失败');
        }
      }
    });
  };

  args.basicPostCode = `
// 基础POST请求详细示例 - 用户创建场景
const userData = {
  userId: 1001,
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13812345678',
  department: '技术部',
  position: '前端开发工程师'
};

$hyapi.io.post(mds, 'http://api.example.com/user/create', userData, {
  // === 消息显示配置 ===
  showMsg: true,           // 成功时显示 "操作成功" 提示
  showFailMsg: true,       // 失败时显示后端返回的错误信息
  showErrorMsg: true,      // 网络错误时显示错误信息
  showLoading: false,      // 不显示loading状态
  
  // === 成功回调函数 ===
  successFn: (response) => {
    console.log('✅ 用户创建成功:', response);
    
    // 后端成功响应结构示例:
    // {
    //   success: true,
    //   message: "用户创建成功",
    //   datas: {
    //     userId: 1001,
    //     createTime: "2024-01-01 10:30:00"
    //   }
    // }
    
    // 可以在这里进行后续操作
    // 1. 跳转到用户详情页
    // 2. 刷新用户列表
    // 3. 显示自定义成功信息
    $hyapi.msg.createTips('success', \`用户 \${userData.name} 创建成功！\`);
  },
  
  // === 业务失败回调函数 ===
  failFn: (response) => {
    console.log('❌ 业务逻辑失败:', response);
    
    // 后端失败响应结构示例:
    // {
    //   success: false,
    //   message: "用户名已存在",
    //   errorCode: "USER_EXISTS"
    // }
    
    // 根据不同错误码进行不同处理
    switch(response.errorCode) {
      case 'USER_EXISTS':
        $hyapi.msg.createTips('warning', '用户名已存在，请选择其他用户名');
        break;
      case 'EMAIL_EXISTS':
        $hyapi.msg.createTips('warning', '邮箱已被使用');
        break;
      case 'VALIDATION_ERROR':
        $hyapi.msg.createTips('error', '数据校验失败');
        break;
      default:
        $hyapi.msg.createTips('error', response.message || '创建用户失败');
    }
  }
});

// 🌟 关键要点:
// 1. successFn: 当 response.success === true 时触发
// 2. failFn: 当 response.success === false 时触发（HTTP状态码200，但业务逻辑失败）
// 3. httpFailFn: 当HTTP请求本身失败时触发（网络错误、404、500等）`;

  return {
    props: args,
    template: `
      <div>
        <h2>📡 基础POST请求详细示例</h2>
        <p><strong>业务场景:</strong> 用户注册/创建新用户</p>
        <p><strong>学习要点:</strong> 了解基础请求结构、响应处理、错误分类</p>
        
        <button nz-button nzType="primary" size="large" (click)="basicPost()">
          🚀 发送用户创建请求
        </button>
        
        <div style="margin-top:15px">
          <h4>📋 完整代码示例:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:12px;line-height:1.4;overflow-x:auto;border-left:4px solid var(--primary-color);"><code>{{basicPostCode}}</code></pre>
        </div>
        
        <div style="margin-top:10px;padding:10px;background:#e6f7ff;border-radius:4px">
          <h5>💡 实际应用提示:</h5>
          <ul style="margin:5px 0;padding-left:20px">
            <li>在表单提交后调用此请求创建用户</li>
            <li>成功后可跳转到用户列表或详情页</li>
            <li>失败时根据错误码给用户友好提示</li>
            <li>可结合表单验证一起使用</li>
          </ul>
        </div>
      </div>
    `
  };
};
export const basicPostDetail: Story = BasicPostDetailTemplate.bind({});
basicPostDetail.storyName = '1️⃣ 基础POST请求详细版';

// 2. 复杂Loading处理
const ComplexLoadingTemplate: Story = (args: any) => {
  args.simpleLoading = () => {
    const reportData = {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      reportType: 'monthly'
    };
    
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/report/generate', reportData, {
      showLoading: true,  // 简单loading，使用默认配置
      showMsg: true,
      successFn: (res) => {
        console.log('简单loading请求完成:', res);
      }
    });
  };
  
  args.customLoading = () => {
    const importData = { fileId: 'excel_001', sheetName: 'Sheet1' };
    
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/data/import', importData, {
      showLoading: { time: 10000 }, // 自定义loading最大显示时间
      showMsg: false,
      showFailMsg: false,
      successFn: (res) => {
        console.log('数据导入完成:', res);
        $hyapi.msg.createTips('success', '数据导入成功！');
      }
    });
  };
  
  args.manualLoading = () => {
    // 手动控制loading的高级用法
    const loadingId = $hyapi.msg.loading({ msg: '正在处理大量数据，请耐心等待...' });
    
    const processData = { 
      dataSize: 50000,
      operation: 'batch_update' 
    };
    
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/data/process', processData, {
      showLoading: false,  // 关闭自动loading
      showMsg: false,
      successFn: (res) => {
        $hyapi.msg.closeLoading(loadingId);  // 手动关闭loading
        $hyapi.msg.createTips('success', `处理完成！共处理 ${res.processedCount} 条数据`);
      },
      failFn: (res) => {
        $hyapi.msg.closeLoading(loadingId);  // 失败时也要关闭loading
        $hyapi.msg.createTips('error', '数据处理失败');
      },
      httpFailFn: (res) => {
        $hyapi.msg.closeLoading(loadingId);  // 网络错误时也要关闭loading
        $hyapi.msg.createTips('error', '网络连接异常');
      }
    });
  };

  args.loadingCode = `
// 1. ⭐ 简单Loading用法 - 推荐日常使用
$hyapi.io.post(mds, url, data, {
  showLoading: true,        // 使用默认loading配置
  successFn: (res) => {
    // loading会自动关闭
    console.log('请求完成');
  }
});

// 2. ⭐ 自定义Loading时间
$hyapi.io.post(mds, url, data, {
  showLoading: { time: 10000 },  // 最长显示10秒，超时自动关闭
  successFn: (res) => {
    console.log('长时间操作完成');
  }
});

// 3. 🔥 手动控制Loading - 适用于复杂场景
const processLargeData = () => {
  // 手动开启loading
  const loadingId = $hyapi.msg.loading({ 
    msg: '正在处理大量数据，请耐心等待...' 
  });
  
  $hyapi.io.post(mds, url, data, {
    showLoading: false,     // 关闭自动loading
    showMsg: false,
    
    successFn: (res) => {
      $hyapi.msg.closeLoading(loadingId);  // 手动关闭
      $hyapi.msg.createTips('success', 
        \`处理完成！共处理 \${res.count} 条数据\`);
    },
    
    failFn: (res) => {
      $hyapi.msg.closeLoading(loadingId);  // 失败也要关闭
      $hyapi.msg.createTips('error', '处理失败');
    },
    
    httpFailFn: (res) => {
      $hyapi.msg.closeLoading(loadingId);  // 网络错误也要关闭
      $hyapi.msg.createTips('error', '网络异常');
    }
  });
};

// 4. 🎯 批量操作的Loading处理
const batchOperation = async (itemList) => {
  const loadingId = $hyapi.msg.loading({ 
    msg: \`正在处理 \${itemList.length} 项操作...\` 
  });
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < itemList.length; i++) {
    try {
      await new Promise((resolve, reject) => {
        $hyapi.io.post(mds, url, itemList[i], {
          showLoading: false,
          showMsg: false,
          successFn: () => {
            successCount++;
            resolve(true);
          },
          failFn: () => {
            failCount++;
            resolve(false);
          }
        });
      });
    } catch (error) {
      failCount++;
    }
  }
  
  $hyapi.msg.closeLoading(loadingId);
  $hyapi.msg.createTips('info', 
    \`批量操作完成：成功 \${successCount} 项，失败 \${failCount} 项\`);
};`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #52c41a;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>⏳ Loading状态控制详解</h2>
        <p><strong>业务场景:</strong> 数据处理、文件导入、批量操作等耗时操作</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="simpleLoading()" style="margin-right:10px">
            ⚡ 简单Loading
          </button>
          <button nz-button nzType="default" (click)="customLoading()" style="margin-right:10px">
            🛠️ 自定义Loading
          </button>
          <button nz-button nzType="dashed" (click)="manualLoading()">
            🎛️ 手动控制Loading
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 Loading控制详细代码:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:12px;line-height:1.4;overflow-x:auto;border-left:4px solid #52c41a"><code>{{loadingCode}}</code></pre>
        </div>
        
        <div style="margin-top:10px;padding:10px;background:#f6ffed;border-radius:4px">
          <h5>💡 Loading使用建议:</h5>
          <ul style="margin:5px 0;padding-left:20px">
            <li><strong>简单操作:</strong> 使用 showLoading: true</li>
            <li><strong>耗时操作:</strong> 设置较长的 time 值</li>
            <li><strong>复杂流程:</strong> 手动控制loading开关</li>
            <li><strong>批量操作:</strong> 显示进度信息</li>
          </ul>
        </div>
      </div>
    `
  };
};
export const complexLoading: Story = ComplexLoadingTemplate.bind({});
complexLoading.storyName = '2️⃣ Loading状态控制详解';

// 3. 数据类型和内容类型详解
const ContentTypeTemplate: Story = (args: any) => {
  args.jsonRequest = () => {
    const userProfile = {
      username: 'zhangsan',
      profile: {
        nickname: '张三',
        avatar: 'https://example.com/avatar.jpg',
        preferences: {
          language: 'zh-CN',
          theme: 'light',
          notifications: {
            email: true,
            sms: false
          }
        }
      },
      roles: ['user', 'editor']
    };
    
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/user/profile', userProfile, {
      contentType: 'application/json',  // 默认值，可省略
      headers: {
        'Content-Language': 'zh-CN',
        'X-Client-Version': '2.1.0'
      },
      showMsg: true,
      successFn: (res) => {
        console.log('JSON数据提交成功:', res);
      }
    });
  };
  
  args.formDataRequest = () => {
    // 方式一：直接使用FormData（传统方式）
    const formData = new FormData();
    formData.append('username', 'lisi');
    formData.append('email', 'lisi@example.com');
    formData.append('department', '销售部');
    
    // 模拟文件上传
    const blob = new Blob(['这是一个测试文件的内容'], { type: 'text/plain' });
    formData.append('avatar', blob, 'avatar.txt');
    
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/user/upload', formData, {
      contentType: 'multipartForm',
      showMsg: true,
      successFn: (res) => {
        console.log('传统FormData上传成功:', res);
      }
    });
  };
  
  args.hyUploadFileList = () => {
    // 方式二：使用hy-upload组件的fileList（推荐方式）
    // 模拟从hy-upload组件获取的NzUploadFile类型fileList
    const fileList: NzUploadFile[] = [
      {
        uid: '1',
        name: '用户文档.pdf',
        size: 1024 * 100, // 100KB
        type: 'application/pdf',
        status: 'done',
        response: { success: true },
        url: 'http://example.com/files/用户文档.pdf'
      } as NzUploadFile,
      {
        uid: '2', 
        name: '头像.jpg',
        size: 1024 * 50, // 50KB
        type: 'image/jpeg',
        status: 'done', 
        response: { success: true },
        url: 'http://example.com/files/头像.jpg'
      } as NzUploadFile
    ];
    
    // 使用fileList参数上传文件
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/user/files', {
      userId: 'user_123',
      category: 'profile',
      description: '用户资料文件'
    }, {
      fileList: fileList,           // hy-upload组件的NzUploadFile文件列表
      isFileEncrypt: true,          // 是否加密文件
      showLoading: true,
      showMsg: true,
      successFn: (res) => {
        console.log('hy-upload fileList上传成功:', res);
      }
    });
  };
  
  args.urlEncodedRequest = () => {
    // URLSearchParams 创建 URL 编码数据
    const formData = new URLSearchParams();
    formData.append('username', 'wangwu');
    formData.append('password', '123456');
    formData.append('rememberMe', 'true');
    
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/auth/login', formData, {
      contentType: 'form',  // application/x-www-form-urlencoded
      showMsg: true,
      successFn: (res) => {
        console.log('表单登录成功:', res);
      }
    });
  };

  args.contentTypeCode = `
// ============= 1. JSON数据请求 (默认) =============
const userProfile = {
  username: 'zhangsan',
  profile: {
    nickname: '张三',
    avatar: 'https://example.com/avatar.jpg',
    preferences: {
      language: 'zh-CN',
      theme: 'light',
      notifications: { email: true, sms: false }
    }
  },
  roles: ['user', 'editor']
};

$hyapi.io.post(mds, url, userProfile, {
  contentType: 'application/json',  // 默认值，可省略
  headers: {
    'Content-Language': 'zh-CN',
    'X-Client-Version': '2.1.0'
  },
  successFn: (res) => {
    console.log('JSON数据提交成功');
  }
});

// 使用场景：
// ✅ RESTful API调用
// ✅ 复杂对象数据提交
// ✅ 嵌套数据结构
// ✅ 数组数据传输

// ============= 2. FormData文件上传 (传统方式) =============
const formData = new FormData();
formData.append('username', 'lisi');
formData.append('email', 'lisi@example.com');

// 传统方式：直接添加文件到FormData
const fileBlob = new Blob(['文件内容'], { type: 'text/plain' });
formData.append('avatar', fileBlob, 'avatar.txt');

$hyapi.io.post(mds, url, formData, {
  contentType: 'multipartForm',
  successFn: (res) => console.log('传统FormData上传成功')
});

// ============= 3. hy-upload组件fileList上传 (推荐方式) =============
// 从hy-upload组件获取的文件列表
const fileListFromUpload: NzUploadFile[] = [
  {
    uid: '1',
    name: '用户文档.pdf', 
    size: 102400,
    type: 'application/pdf',
    status: 'done'
  } as NzUploadFile,
  {
    uid: '2',
    name: '头像.jpg',
    size: 51200, 
    type: 'image/jpeg',
    status: 'done'
  } as NzUploadFile
];

// 使用fileList参数上传
$hyapi.io.post(mds, url, {
  userId: 'user_123',
  category: 'profile',
  description: '用户资料文件'
}, {
  fileList: fileListFromUpload,    // hy-upload组件的文件列表
  isFileEncrypt: true,             // 是否加密文件
  showLoading: true,
  showMsg: true,
  successFn: (res) => {
    console.log('hy-upload fileList上传成功:', res);
  }
});

// 使用场景：
// ✅ 配合hy-upload组件使用 (推荐)
// ✅ 文件加密上传
// ✅ 多文件批量上传
// ✅ 文件状态管理

// ============= 4. URL编码表单数据 =============
const urlParams = new URLSearchParams();
urlParams.append('username', 'wangwu');
urlParams.append('email', 'wangwu@example.com');
urlParams.append('department', '市场部');
urlParams.append('tags', 'vip,premium');

$hyapi.io.post(mds, url, urlParams, {
  contentType: 'form',  // application/x-www-form-urlencoded
  successFn: (res) => console.log('URL编码数据提交成功')
});

// 使用场景：
// ✅ 简单表单数据提交
// ✅ 传统HTML表单兼容
// ✅ 较小的数据量传输

// =============== 实际开发中的完整示例 ===============

// 示例1：用户资料更新（JSON + 文件上传）
handleProfileUpdate(profileData, selectedFiles: NzUploadFile[]) {
  $hyapi.io.post(this.mds, '/api/user/profile', profileData, {
    fileList: selectedFiles,        // hy-upload组件的文件
    isFileEncrypt: false,          // 头像不需要加密
    showLoading: true,
    showMsg: true,
    successFn: (res) => {
      console.log('资料更新成功');
      this.router.navigate(['/profile']);
    }
  });
}

// 示例2：敏感文档上传（加密）
handleDocumentUpload(docFiles: NzUploadFile[]) {
  $hyapi.io.post(this.mds, '/api/documents/upload', {
    category: 'confidential',
    department: this.currentUser.department
  }, {
    fileList: docFiles,
    isFileEncrypt: true,           // 敏感文档需要加密
    showLoading: { time: 30000 },  // 大文件上传时间较长
    successFn: (res) => {
      this.documentList = res.datas.documents;
    }
  });
}

// =============== 数据类型选择指南 ===============
// 📊 JSON (application/json): 
//    适用于复杂对象、嵌套数据、API调用
// 📁 fileList + isFileEncrypt: 
//    配合hy-upload组件，支持文件加密，推荐方式
// 📄 FormData (multipartForm): 
//    传统文件上传、混合数据类型
// 🔗 URLSearchParams (form): 
//    简单表单、兼容传统表单提交`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #fa8c16;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>📦 数据类型和内容类型详解</h2>
        <p><strong>核心概念:</strong> 了解不同contentType的使用场景和最佳实践</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="jsonRequest()" style="margin-right:10px">
            📄 JSON数据请求
          </button>
          <button nz-button nzType="default" (click)="formDataRequest()" style="margin-right:10px">
            📎 FormData文件上传
          </button>
          <button nz-button nzType="dashed" (click)="urlEncodedRequest()">
            📝 URL编码表单
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 内容类型详细对比:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.4;overflow-x:auto;border-left:4px solid #fa8c16"><code>{{contentTypeCode}}</code></pre>
        </div>
        
        <div style="display:flex;gap:15px;margin-top:15px">
          <div style="flex:1;padding:10px;background:#fff7e6;border-radius:4px">
            <h5>📄 application/json</h5>
            <p style="margin:5px 0"><strong>最佳用于:</strong> 复杂数据、RESTful API</p>
            <p style="margin:5px 0"><strong>优点:</strong> 支持嵌套、类型丰富</p>
          </div>
          <div style="flex:1;padding:10px;background:#fff7e6;border-radius:4px">
            <h5>📎 multipart/form-data</h5>
            <p style="margin:5px 0"><strong>最佳用于:</strong> 文件上传</p>
            <p style="margin:5px 0"><strong>优点:</strong> 支持二进制、多文件</p>
          </div>
          <div style="flex:1;padding:10px;background:#fff7e6;border-radius:4px">
            <h5>📝 x-www-form-urlencoded</h5>
            <p style="margin:5px 0"><strong>最佳用于:</strong> 传统表单</p>
            <p style="margin:5px 0"><strong>优点:</strong> 兼容性好、简单</p>
          </div>
        </div>
      </div>
    `
  };
};
export const contentType: Story = ContentTypeTemplate.bind({});
contentType.storyName = '3️⃣ 数据类型详解';

// 4. 综合错误处理和重试策略
const ErrorHandlingAdvancedTemplate: Story = (args: any) => {
  args.basicErrorHandling = () => {
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/test/error', { testType: 'business_error' }, {
      showMsg: false,      // 关闭默认提示
      showFailMsg: false,  // 关闭默认失败提示
      showErrorMsg: false, // 关闭默认错误提示
      
      successFn: (res) => {
        $hyapi.msg.createTips('success', '操作执行成功！');
      },
      
      failFn: (res) => {
        // 业务逻辑失败（HTTP 200但业务失败）
        console.log('业务失败:', res);
        
        switch(res.errorCode) {
          case 'PERMISSION_DENIED':
            $hyapi.msg.show('warning', '权限不足，请联系管理员', {
              callback: () => {
                // 跳转到权限申请页面
                console.log('跳转到权限申请页');
              }
            });
            break;
          case 'DATA_VALIDATION_ERROR':
            $hyapi.msg.show('error', '数据校验失败：' + res.details);
            break;
          default:
            $hyapi.msg.createTips('error', res.message || '操作失败');
        }
      },
      
      httpFailFn: (error) => {
        // HTTP请求失败（网络错误、404、500等）
        console.log('HTTP失败:', error);
        
        if (error.status === 401) {
          $hyapi.msg.confirm('登录已过期，是否重新登录？', {
            callback: () => {
              // 跳转到登录页
              window.location.href = '/login';
            }
          });
        } else if (error.status === 403) {
          $hyapi.msg.show('warning', '访问被拒绝，权限不足');
        } else if (error.status >= 500) {
          $hyapi.msg.show('error', '服务器内部错误，请稍后重试');
        } else {
          $hyapi.msg.createTips('error', '网络连接异常');
        }
      }
    });
  };
  
  // 智能重试机制
  args.smartRetry = () => {
    const requestData = { operation: 'data_sync', timestamp: Date.now() };
    
    const executeWithRetry = (url: string, data: any, maxRetries: number = 3, currentAttempt: number = 1) => {
      console.log(`开始第 ${currentAttempt} 次尝试...`);
      
      $hyapi.io.post(_this, url, { ...data, attempt: currentAttempt }, {
        showLoading: currentAttempt === 1, // 只在第一次显示loading
        showMsg: false,
        showFailMsg: false,
        
        successFn: (res) => {
          if (currentAttempt > 1) {
            $hyapi.msg.createTips('success', `重试成功！第 ${currentAttempt} 次尝试成功`);
          } else {
            $hyapi.msg.createTips('success', '操作成功完成');
          }
        },
        
        failFn: (res) => {
          // 某些业务错误不需要重试
          const noRetryErrors = ['PERMISSION_DENIED', 'DATA_NOT_FOUND'];
          
          if (noRetryErrors.includes(res.errorCode) || currentAttempt >= maxRetries) {
            $hyapi.msg.show('error', `操作失败：${res.message}`);
            return;
          }
          
          // 指数退避重试
          const retryDelay = Math.pow(2, currentAttempt - 1) * 1000;
          $hyapi.msg.createTips('warning', 
            `第${currentAttempt}次尝试失败，${retryDelay/1000}秒后重试...`);
          
          setTimeout(() => {
            executeWithRetry(url, data, maxRetries, currentAttempt + 1);
          }, retryDelay);
        },
        
        httpFailFn: (error) => {
          // 只对网络错误和服务器错误重试
          const retryableStatuses = [0, 500, 502, 503, 504];
          
          if (retryableStatuses.includes(error.status) && currentAttempt < maxRetries) {
            const retryDelay = Math.pow(2, currentAttempt - 1) * 1000;
            setTimeout(() => {
              executeWithRetry(url, data, maxRetries, currentAttempt + 1);
            }, retryDelay);
          } else {
            $hyapi.msg.show('error', '网络连接失败');
          }
        }
      });
    };
    
    executeWithRetry('http://10.40.92.15:3001/api/test/retry', requestData);
  };
  
  // 批量操作错误处理
  args.batchErrorHandling = () => {
    const batchData = [
      { id: 1, name: '用户1', action: 'update' },
      { id: 2, name: '用户2', action: 'delete' },
      { id: 3, name: '用户3', action: 'create' },
      { id: 4, name: '用户4', action: 'update' },
      { id: 5, name: '用户5', action: 'delete' }
    ];
    
    let successCount = 0;
    let failedItems = [];
    let processedCount = 0;
    
    const loadingId = $hyapi.msg.loading({ msg: `正在批量处理 ${batchData.length} 项操作...` });
    
    batchData.forEach((item, index) => {
      $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/user/batch', item, {
        showLoading: false,
        showMsg: false,
        showFailMsg: false,
        
        successFn: (res) => {
          successCount++;
          processedCount++;
          
          if (processedCount === batchData.length) {
            $hyapi.msg.closeLoading(loadingId);
            showBatchResult();
          }
        },
        
        failFn: (res) => {
          failedItems.push({
            ...item,
            error: res.message || '处理失败'
          });
          processedCount++;
          
          if (processedCount === batchData.length) {
            $hyapi.msg.closeLoading(loadingId);
            showBatchResult();
          }
        },
        
        httpFailFn: (error) => {
          failedItems.push({
            ...item,
            error: '网络错误: ' + (error.status || '连接异常')
          });
          processedCount++;
          
          if (processedCount === batchData.length) {
            $hyapi.msg.closeLoading(loadingId);
            showBatchResult();
          }
        }
      });
    });
    
    const showBatchResult = () => {
      const failCount = failedItems.length;
      
      if (failCount === 0) {
        $hyapi.msg.createTips('success', `批量操作全部成功！共处理 ${successCount} 项`);
      } else if (successCount === 0) {
        $hyapi.msg.show('error', `批量操作全部失败！共 ${failCount} 项失败`, {
          callback: () => {
            console.log('失败项目:', failedItems);
          }
        });
      } else {
        $hyapi.msg.show('warning', 
          `批量操作完成：成功 ${successCount} 项，失败 ${failCount} 项。是否查看失败详情？`, {
          callback: () => {
            console.log('失败项目详情:', failedItems);
            // 这里可以展示失败项目的详细信息
            failedItems.forEach(item => {
              console.log(`❌ ${item.name}: ${item.error}`);
            });
          }
        });
      }
    };
  };

  args.errorHandlingCode = `
// ==================== 1. 基础错误处理 ====================
$hyapi.io.post(mds, url, data, {
  showMsg: false,      // 关闭默认提示，自定义处理
  showFailMsg: false,
  showErrorMsg: false,
  
  successFn: (res) => {
    $hyapi.msg.createTips('success', '操作成功！');
  },
  
  // 业务逻辑失败处理
  failFn: (res) => {
    console.log('业务失败:', res);
    
    switch(res.errorCode) {
      case 'PERMISSION_DENIED':
        $hyapi.msg.show('warning', '权限不足，请联系管理员', {
          callback: () => {
            // 跳转到权限申请页面
            this.router.navigate(['/permission-request']);
          }
        });
        break;
        
      case 'DATA_VALIDATION_ERROR':
        // 显示详细的验证错误
        $hyapi.msg.show('error', '数据校验失败：' + res.details);
        break;
        
      case 'BUSINESS_RULE_VIOLATION':
        $hyapi.msg.confirm('违反业务规则，是否继续强制执行？', {
          callback: () => {
            // 使用强制参数重新请求
            this.forceExecute();
          }
        });
        break;
        
      default:
        $hyapi.msg.createTips('error', res.message || '操作失败');
    }
  },
  
  // HTTP请求失败处理
  httpFailFn: (error) => {
    console.log('HTTP失败:', error);
    
    switch(error.status) {
      case 401:
        $hyapi.msg.confirm('登录已过期，是否重新登录？', {
          callback: () => {
            window.location.href = '/login';
          }
        });
        break;
        
      case 403:
        $hyapi.msg.show('warning', '访问被拒绝，权限不足');
        break;
        
      case 404:
        $hyapi.msg.show('error', '请求的资源不存在');
        break;
        
      case 429:
        $hyapi.msg.show('warning', '请求过于频繁，请稍后再试');
        break;
        
      case 500:
      case 502:
      case 503:
        $hyapi.msg.show('error', '服务器内部错误，请稍后重试');
        break;
        
      case 0:
        $hyapi.msg.show('error', '网络连接超时，请检查网络状态');
        break;
        
      default:
        $hyapi.msg.createTips('error', '网络异常，请重试');
    }
  }
});

// ==================== 2. 智能重试机制 ====================
const executeWithRetry = (url, data, maxRetries = 3, currentAttempt = 1) => {
  $hyapi.io.post(mds, url, { ...data, attempt: currentAttempt }, {
    showLoading: currentAttempt === 1, // 只在首次显示loading
    showMsg: false,
    
    successFn: (res) => {
      if (currentAttempt > 1) {
        $hyapi.msg.createTips('success', \`重试成功！第\${currentAttempt}次尝试\`);
      } else {
        $hyapi.msg.createTips('success', '操作成功');
      }
    },
    
    failFn: (res) => {
      // 某些业务错误不需要重试
      const noRetryErrors = ['PERMISSION_DENIED', 'DATA_NOT_FOUND'];
      
      if (noRetryErrors.includes(res.errorCode) || currentAttempt >= maxRetries) {
        $hyapi.msg.show('error', \`操作失败：\${res.message}\`);
        return;
      }
      
      // 指数退避重试
      const retryDelay = Math.pow(2, currentAttempt - 1) * 1000;
      $hyapi.msg.createTips('warning', 
        \`第\${currentAttempt}次尝试失败，\${retryDelay/1000}秒后重试...\`);
      
      setTimeout(() => {
        executeWithRetry(url, data, maxRetries, currentAttempt + 1);
      }, retryDelay);
    },
    
    httpFailFn: (error) => {
      // 只对网络错误和服务器错误重试
      const retryableStatuses = [0, 500, 502, 503, 504];
      
      if (retryableStatuses.includes(error.status) && currentAttempt < maxRetries) {
        const retryDelay = Math.pow(2, currentAttempt - 1) * 1000;
        setTimeout(() => {
          executeWithRetry(url, data, maxRetries, currentAttempt + 1);
        }, retryDelay);
      } else {
        $hyapi.msg.show('error', '网络连接失败');
      }
    }
  });
};

// ==================== 3. 批量操作错误处理 ====================
const processBatchOperations = async (items) => {
  let successCount = 0;
  let failedItems = [];
  
  const loadingId = $hyapi.msg.loading({ 
    msg: \`正在处理\${items.length}项操作...\` 
  });
  
  // 使用Promise.allSettled处理所有请求
  const promises = items.map((item, index) => {
    return new Promise((resolve) => {
      $hyapi.io.post(mds, url, item, {
        showLoading: false,
        showMsg: false,
        
        successFn: (res) => {
          successCount++;
          resolve({ success: true, item, result: res });
        },
        
        failFn: (res) => {
          failedItems.push({ ...item, error: res.message });
          resolve({ success: false, item, error: res.message });
        },
        
        httpFailFn: (error) => {
          failedItems.push({ ...item, error: '网络错误' });
          resolve({ success: false, item, error: '网络错误' });
        }
      });
    });
  });
  
  // 等待所有请求完成
  await Promise.allSettled(promises);
  
  $hyapi.msg.closeLoading(loadingId);
  
  // 显示批量操作结果
  if (failedItems.length === 0) {
    $hyapi.msg.createTips('success', \`全部成功！共处理\${successCount}项\`);
  } else {
    $hyapi.msg.show('warning', 
      \`完成：成功\${successCount}项，失败\${failedItems.length}项\`, {
      callback: () => {
        // 显示失败详情
        console.table(failedItems);
      }
    });
  }
};`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #f5222d;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>🚨 综合错误处理和重试策略</h2>
        <p><strong>核心理念:</strong> 区分错误类型，提供智能重试，优雅降级</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="basicErrorHandling()" style="margin-right:10px">
            ⚠️ 基础错误处理
          </button>
          <button nz-button nzType="default" (click)="smartRetry()" style="margin-right:10px">
            🔄 智能重试机制
          </button>
          <button nz-button nzType="dashed" (click)="batchErrorHandling()">
            📦 批量操作处理
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 错误处理完整方案:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #f5222d"><code>{{errorHandlingCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:10px;background:#fff1f0;border-radius:4px">
            <h5>🎯 错误分类处理</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li><strong>业务错误:</strong> 权限不足、数据校验失败</li>
              <li><strong>网络错误:</strong> 连接超时、服务器异常</li>
              <li><strong>状态码:</strong> 401认证、403权限、500服务器</li>
            </ul>
          </div>
          <div style="padding:10px;background:#fff1f0;border-radius:4px">
            <h5>🔄 重试策略</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li><strong>指数退避:</strong> 1s, 2s, 4s, 8s...</li>
              <li><strong>选择性重试:</strong> 只重试网络和服务器错误</li>
              <li><strong>最大次数:</strong> 防止无限重试</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
};
export const errorHandlingAdvanced: Story = ErrorHandlingAdvancedTemplate.bind({});
errorHandlingAdvanced.storyName = '4️⃣ 错误处理和重试策略';

// 5. 自定义请求头和认证详解
const HeadersAuthTemplate: Story = (args: any) => {
  args.basicHeaders = () => {
    const userData = { name: '张三', department: '技术部' };
    
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/user/info', userData, {
      headers: {
        'X-Request-ID': Date.now().toString(),
        'X-Client-Version': '2.1.0',
        'X-Platform': 'Web',
        'Content-Language': 'zh-CN'
      },
      showMsg: true,
      successFn: (res) => {
        console.log('带基础请求头的请求成功:', res);
      }
    });
  };
  
  args.authHeaders = () => {
    const sensitiveData = { 
      userId: 1001,
      operation: 'update_profile',
      newEmail: 'newemail@example.com' 
    };
    
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/user/sensitive', sensitiveData, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        'X-API-Key': 'your-api-key-here',
        'X-Signature': 'calculated-request-signature',
        'X-Timestamp': Date.now().toString(),
        'X-Nonce': Math.random().toString(36).substring(2, 15)
      },
      showMsg: true,
      successFn: (res) => {
        console.log('认证请求成功:', res);
      },
      httpFailFn: (error) => {
        if (error.status === 401) {
          $hyapi.msg.show('warning', '认证失败，请重新登录');
        } else if (error.status === 403) {
          $hyapi.msg.show('error', 'API密钥无效或权限不足');
        }
      }
    });
  };

  args.headersCode = `
// ============= 1. 基础自定义请求头 =============
$hyapi.io.post(mds, url, data, {
  headers: {
    'X-Request-ID': Date.now().toString(),    // 请求追踪ID
    'X-Client-Version': '2.1.0',             // 客户端版本
    'X-Platform': 'Web',                     // 平台标识
    'Content-Language': 'zh-CN',             // 内容语言
    'X-User-Agent': 'MyApp/2.1.0'           // 自定义User-Agent
  }
});

// ============= 2. 认证和安全请求头 =============
$hyapi.io.post(mds, url, data, {
  headers: {
    // JWT Token认证
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    // API Key认证
    'X-API-Key': 'your-api-key-here',
    // 请求签名（防篡改）
    'X-Signature': 'calculated-request-signature',
    // 时间戳（防重放攻击）
    'X-Timestamp': Date.now().toString(),
    // 随机数（防重放攻击）
    'X-Nonce': Math.random().toString(36).substring(2, 15)
  },
  httpFailFn: (error) => {
    switch(error.status) {
      case 401: $hyapi.msg.show('warning', '认证失败'); break;
      case 403: $hyapi.msg.show('error', 'API密钥无效'); break;
      case 429: $hyapi.msg.show('warning', '请求频率过高'); break;
    }
  }
});`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #722ed1;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>🔐 自定义请求头和认证详解</h2>
        <p><strong>核心理念:</strong> 通过请求头传递元数据、实现认证、增强安全性</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="basicHeaders()" style="margin-right:10px">
            📋 基础请求头
          </button>
          <button nz-button nzType="default" (click)="authHeaders()">
            🔒 认证请求头
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 请求头详细配置:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:12px;line-height:1.4;overflow-x:auto;border-left:4px solid #722ed1"><code>{{headersCode}}</code></pre>
        </div>
        
        <div style="display:flex;gap:15px;margin-top:15px">
          <div style="flex:1;padding:10px;background:#f9f0ff;border-radius:4px">
            <h5>📋 基础头信息</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li><strong>X-Request-ID:</strong> 请求追踪</li>
              <li><strong>X-Client-Version:</strong> 版本控制</li>
              <li><strong>Content-Language:</strong> 国际化</li>
            </ul>
          </div>
          <div style="flex:1;padding:10px;background:#f9f0ff;border-radius:4px">
            <h5>🔒 安全认证头</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li><strong>Authorization:</strong> JWT令牌</li>
              <li><strong>X-API-Key:</strong> API密钥</li>
              <li><strong>X-Signature:</strong> 请求签名</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
};
export const headersAuth: Story = HeadersAuthTemplate.bind({});
headersAuth.storyName = '5️⃣ 请求头和认证详解';

// 6. 文件下载和导出详解
const DownloadExportTemplate: Story = (args: any) => {
  args.simpleDownload = () => {
    $hyapi.io.download('http://10.40.92.15:3001/api/files/sample.pdf', {
      fileName: 'sample-document.pdf',
      fileType: 'application/pdf'
    });
  };
  
  args.exportReport = () => {
    const exportParams = {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      format: 'excel',
      includeCharts: true,
      departments: ['技术部', '销售部']
    };
    
    $hyapi.io.download('http://10.40.92.15:3001/api/reports/export', exportParams);
  };
  
  args.batchDownload = () => {
    const fileList = [
      { id: 1, name: '用户手册.pdf', url: '/api/files/1' },
      { id: 2, name: '技术文档.docx', url: '/api/files/2' },
      { id: 3, name: '数据报表.xlsx', url: '/api/files/3' }
    ];
    
    const loadingId = $hyapi.msg.loading({ msg: `正在下载 ${fileList.length} 个文件...` });
    
    let successCount = 0;
    
    fileList.forEach((file, index) => {
      setTimeout(() => {
        $hyapi.io.download(`http://10.40.92.15:3001${file.url}`, {
          fileName: file.name
        });
        
        successCount++;
        if (successCount === fileList.length) {
          $hyapi.msg.closeLoading(loadingId);
          $hyapi.msg.createTips('success', `批量下载完成，共 ${successCount} 个文件`);
        }
      }, index * 500); // 每隔0.5秒下载一个文件
    });
  };

  args.downloadCode = `
// ============= 1. 简单文件下载 =============
// 最简单的下载方式
$hyapi.io.download(url);

// 指定文件名和类型
$hyapi.io.download('http://api.example.com/files/document.pdf', {
  fileName: 'my-document.pdf',
  fileType: 'application/pdf'
});

// ============= 2. 带参数的数据导出 =============
const exportParams = {
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  format: 'excel',              // excel, pdf, csv
  includeCharts: true,          // 是否包含图表
  departments: ['技术部', '销售部'], // 部门筛选
  columns: ['name', 'email', 'department'], // 指定导出列
};

$hyapi.io.download('http://api.example.com/reports/export', exportParams);

// ============= 3. 批量文件下载 =============
const batchDownload = (fileList) => {
  const loadingId = $hyapi.msg.loading({ 
    msg: \`正在下载 \${fileList.length} 个文件...\` 
  });
  
  let successCount = 0;
  
  fileList.forEach((file, index) => {
    setTimeout(() => {
      $hyapi.io.download(file.url, {
        fileName: file.name
      });
      
      successCount++;
      if (successCount === fileList.length) {
        $hyapi.msg.closeLoading(loadingId);
        $hyapi.msg.createTips('success', \`批量下载完成\`);
      }
    }, index * 500); // 每隔0.5秒下载一个文件
  });
};

// ============= 4. 权限检查后下载 =============
const secureDownload = (fileId, fileName) => {
  // 先检查下载权限
  $hyapi.io.post(mds, '/api/files/check-permission', { fileId }, {
    showLoading: { msg: '检查下载权限...' },
    successFn: (res) => {
      if (res.datas.canDownload) {
        // 有权限，开始下载
        $hyapi.io.download(\`/api/files/secure/\${fileId}\`, {
          fileName,
          headers: {
            'X-Download-Token': res.datas.downloadToken
          }
        });
      } else {
        $hyapi.msg.show('warning', '您没有下载此文件的权限');
      }
    }
  });
};`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #13c2c2;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>⬇️ 文件下载和导出详解</h2>
        <p><strong>核心功能:</strong> 文件下载、数据导出、批量操作、权限控制</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="simpleDownload()" style="margin-right:10px">
            📄 简单下载
          </button>
          <button nz-button nzType="default" (click)="exportReport()" style="margin-right:10px">
            📊 导出报表
          </button>
          <button nz-button nzType="dashed" (click)="batchDownload()">
            📦 批量下载
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 下载功能完整实现:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:12px;line-height:1.4;overflow-x:auto;border-left:4px solid #13c2c2"><code>{{downloadCode}}</code></pre>
        </div>
        
        <div style="display:flex;gap:15px;margin-top:15px">
          <div style="flex:1;padding:10px;background:#e6fffb;border-radius:4px">
            <h5>📄 简单下载</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>直接文件下载</li>
              <li>指定文件名</li>
              <li>类型识别</li>
            </ul>
          </div>
          <div style="flex:1;padding:10px;background:#e6fffb;border-radius:4px">
            <h5>📊 数据导出</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>Excel/PDF/CSV格式</li>
              <li>参数化查询</li>
              <li>进度监控</li>
            </ul>
          </div>
          <div style="flex:1;padding:10px;background:#e6fffb;border-radius:4px">
            <h5>📦 批量操作</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>并发控制</li>
              <li>错误处理</li>
              <li>权限验证</li>
            </ul>
          </div>
        </div>
      </div>
    `
  };
};
export const downloadExport: Story = DownloadExportTemplate.bind({});
downloadExport.storyName = '6️⃣ 文件下载和导出详解';

// 7. 加密传输和安全选项详解
const EncryptionSecurityTemplate: Story = (args: any) => {
  args.encryptedRequest = () => {
    const sensitiveData = {
      userId: 1001,
      password: '123456',
      personalInfo: {
        idCard: '123456789012345678',
        phone: '13800138000',
        email: 'user@example.com'
      },
      bankInfo: {
        cardNumber: '1234567890123456',
        cvv: '123'
      }
    };
    
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/user/sensitive-update', sensitiveData, {
      showMsg: true,
      successFn: (res) => {
        console.log('加密请求成功:', res);
      }
    }, {
      secret: true,  // 启用加密传输
      encryptKeys: [
        'password',                    // 简单字段
        'personalInfo.idCard',         // 嵌套字段
        'personalInfo.phone',          
        'bankInfo.cardNumber',         
        'bankInfo.cvv'
      ]
    });
  };
  
  args.arrayEncryption = () => {
    const batchUserData = {
      users: [
        { name: '张三', password: '123456', salary: 8000 },
        { name: '李四', password: '654321', salary: 9000 },
        { name: '王五', password: 'abc123', salary: 7500 }
      ],
      department: '技术部',
      operator: 'admin'
    };
    
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/users/batch-create', batchUserData, {
      showMsg: true,
      successFn: (res) => {
        console.log('批量加密请求成功:', res);
      }
    }, {
      secret: true,
      encryptKeys: [
        'users..password',     // 数组中的password字段 (..表示数组)
        'users..salary'        // 数组中的salary字段
      ]
    });
  };
  
  args.complexEncryption = () => {
    const complexData = {
      companyInfo: {
        name: '科技公司',
        employees: [
          {
            name: '张三',
            details: {
              password: '123456',
              personalData: {
                idCard: '123456789012345678',
                bankCard: '6666888899990000'
              }
            }
          },
          {
            name: '李四',
            details: {
              password: '654321',
              personalData: {
                idCard: '987654321098765432',
                bankCard: '5555666677778888'
              }
            }
          }
        ]
      }
    };
    
    $hyapi.io.post(_this, 'http://10.40.92.15:3001/api/company/complex-update', complexData, {
      showMsg: true,
      successFn: (res) => {
        console.log('复杂加密请求成功:', res);
      }
    }, {
      secret: true,
      encryptKeys: [
        'companyInfo.employees..details.password',                    // 深层嵌套数组
        'companyInfo.employees..details.personalData.idCard',        // 更深层嵌套
        'companyInfo.employees..details.personalData.bankCard'       // 银行卡号
      ]
    });
  };

  args.encryptionCode = `
// ============= 1. 基础字段加密 =============
const sensitiveData = {
  userId: 1001,
  password: '123456',
  personalInfo: {
    idCard: '123456789012345678',
    phone: '13800138000',
    email: 'user@example.com'
  }
};

$hyapi.io.post(mds, url, sensitiveData, {
  showMsg: true,
  successFn: (res) => {
    console.log('加密请求成功');
  }
}, {
  secret: true,        // 启用加密传输
  encryptKeys: [       // 需要加密的字段数组
    'password',                  // 简单字段加密
    'personalInfo.idCard',       // 嵌套对象字段加密
    'personalInfo.phone'         // 多个嵌套字段
  ]
});

// ============= 2. 数组字段加密 =============
const batchData = {
  users: [
    { name: '张三', password: '123456', salary: 8000 },
    { name: '李四', password: '654321', salary: 9000 }
  ]
};

$hyapi.io.post(mds, url, batchData, {}, {
  secret: true,
  encryptKeys: [
    'users..password',    // 数组中的password字段 (..表示数组)
    'users..salary'       // 数组中的salary字段
  ]
});

// ============= 3. 复杂嵌套加密 =============
const complexData = {
  company: {
    employees: [
      {
        name: '张三',
        details: {
          password: '123456',
          personalData: {
            idCard: '123456789012345678'
          }
        }
      }
    ]
  }
};

$hyapi.io.post(mds, url, complexData, {}, {
  secret: true,
  encryptKeys: [
    // 深层嵌套数组中的字段加密
    'company.employees..details.password',
    'company.employees..details.personalData.idCard'
  ]
});

// ============= 4. 加密规则说明 =============
// 字段路径格式：
// 1. 普通字段：'fieldName'
// 2. 嵌套字段：'parent.child'
// 3. 数组字段：'array..fieldName' (注意是两个点)
// 4. 深层嵌套：'parent.array..child.grandchild'

// 实际传输数据对比：
// 原始数据：
// {
//   "password": "123456",
//   "users": [
//     { "name": "张三", "password": "123456" }
//   ]
// }

// 加密后数据：
// {
//   "password": "e8231e0252cd988836c594b95f93a9dc",
//   "users": [
//     { "name": "张三", "password": "29227f5db6a949d98079ae2e3c79a384" }
//   ]
// }

// ============= 5. 完整的安全请求示例 =============
const secureRequest = (sensitiveData) => {
  $hyapi.io.post(mds, '/api/secure/update', sensitiveData, {
    // 基础配置
    showLoading: true,
    showMsg: false,
    
    // 自定义请求头
    headers: {
      'X-Client-Version': '2.1.0',
      'X-Request-Signature': generateSignature(sensitiveData),
      'X-Timestamp': Date.now().toString()
    },
    
    successFn: (res) => {
      console.log('安全请求成功');
    },
    
    failFn: (res) => {
      if (res.errorCode === 'ENCRYPTION_ERROR') {
        $hyapi.msg.show('error', '数据加密失败，请重试');
      }
    }
  }, {
    // 安全配置
    secret: true,
    encryptKeys: [
      'password',
      'personalInfo.idCard',
      'bankInfo.cardNumber'
    ]
  });
};

// ============= 6. 加密字段动态生成 =============
const createEncryptKeys = (dataStructure) => {
  const encryptKeys = [];
  
  // 根据数据结构动态生成需要加密的字段
  if (dataStructure.includePersonalInfo) {
    encryptKeys.push('personalInfo.idCard', 'personalInfo.phone');
  }
  
  if (dataStructure.includeBankInfo) {
    encryptKeys.push('bankInfo.cardNumber', 'bankInfo.cvv');
  }
  
  if (dataStructure.isArrayData) {
    encryptKeys.push('users..password', 'users..salary');
  }
  
  return encryptKeys;
};

// 使用动态生成的加密字段
const dynamicEncryptKeys = createEncryptKeys({
  includePersonalInfo: true,
  includeBankInfo: false,
  isArrayData: true
});

$hyapi.io.post(mds, url, data, {}, {
  secret: true,
  encryptKeys: dynamicEncryptKeys
});`;

  return {
    props: args,
    template: `
      <div style="border:2px solid #eb2f96;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>🔐 加密传输和安全选项详解</h2>
        <p><strong>核心安全:</strong> 敏感数据加密、传输安全、字段级加密控制</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="encryptedRequest()" style="margin-right:10px">
            🔒 基础字段加密
          </button>
          <button nz-button nzType="default" (click)="arrayEncryption()" style="margin-right:10px">
            📊 数组字段加密
          </button>
          <button nz-button nzType="dashed" (click)="complexEncryption()">
            🔗 复杂嵌套加密
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 加密配置详细说明:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #eb2f96"><code>{{encryptionCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:10px;background:#fff0f6;border-radius:4px">
            <h5>🔒 基础加密</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>密码字段</li>
              <li>身份证号</li>
              <li>手机号码</li>
            </ul>
          </div>
          <div style="padding:10px;background:#fff0f6;border-radius:4px">
            <h5>📊 数组加密</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>批量用户密码</li>
              <li>数组中敏感字段</li>
              <li>工资薪酬数据</li>
            </ul>
          </div>
          <div style="padding:10px;background:#fff0f6;border-radius:4px">
            <h5>🔗 嵌套加密</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>深层对象字段</li>
              <li>复杂数据结构</li>
              <li>动态字段选择</li>
            </ul>
          </div>
        </div>
        
        <div style="margin-top:15px;padding:15px;background:#fff0f6;border-radius:8px;border-left:5px solid #eb2f96">
          <h4 style="margin:0 0 10px 0;color:#eb2f96">🛡️ 安全提醒</h4>
          <ul style="margin:0;padding-left:20px;color:#666">
            <li><strong>字段路径规则:</strong> 普通字段用 'field'，嵌套用 'parent.child'，数组用 'array..field'</li>
            <li><strong>加密范围:</strong> 只加密指定字段，其他数据保持明文传输</li>
            <li><strong>性能考虑:</strong> 加密会增加请求处理时间，谨慎选择需要加密的字段</li>
            <li><strong>调试提示:</strong> 开发环境可在控制台查看加密前后的数据对比</li>
          </ul>
        </div>
      </div>
    `
  };
};
export const encryptionSecurity: Story = EncryptionSecurityTemplate.bind({});
encryptionSecurity.storyName = '7️⃣ 加密传输和安全选项详解';

// 8. 完整配置选项汇总
const ConfigOptionsTemplate: Story = (args: any) => {
  args.allOptionsExample = () => {
    $hyapi.msg.createTips('info', '这是所有配置选项的完整示例，请查看代码了解详细配置');
  };

  args.configCode = `
// ==================== $hyapi.io.post 完整配置选项详解 ====================

$hyapi.io.post(mds, url, data, {
  // ============= 消息显示控制 =============
  showMsg: true,                    // 是否显示操作成功信息 (默认: false)
  showFailMsg: true,                // 是否显示业务失败信息 (默认: true)  
  showErrorMsg: true,               // 是否显示HTTP错误信息 (默认: true)
  showTimeoutMsg: true,             // 是否显示登录超时对话框 (默认: true)
  
  // ============= 加载状态控制 =============
  showLoading: false,               // 是否显示加载状态 (默认: false)
  // showLoading: true,             // 简单开启loading
  // showLoading: {                 // 详细loading配置
  //   time: 5000                   // 最长显示时间(毫秒)
  // },
  
  // ============= 请求控制 =============
  allowSameUrl: false,              // 是否允许重复请求同一URL (默认: false)
  contentType: 'application/json',  // 请求内容类型 (默认: 'application/json')
  // 可选值: 'application/json' | 'multipartForm' | 'form'
  
  // ============= 自定义请求头 =============
  headers: {
    'X-Custom-Header': 'value',
    'Authorization': 'Bearer token',
    'Content-Language': 'zh-CN',
    'X-Client-Version': '2.1.0'
  },
  
  // ============= 文件相关 =============
  isFile: false,                    // 是否为文件类型 (默认: false)
  
  // ============= 回调函数 =============
  successFn: (response) => {
    // 请求成功回调 (业务成功，response.success === true)
    console.log('Success:', response);
    
    // response 结构:
    // {
    //   success: true,
    //   message: "操作成功",
    //   datas: { ... }  // 业务数据
    // }
  },
  
  failFn: (response) => {
    // 业务失败回调 (HTTP成功，但业务逻辑失败，response.success === false)
    console.log('Business Fail:', response);
    
    // response 结构:
    // {
    //   success: false,
    //   message: "业务错误信息",
    //   errorCode: "ERROR_CODE"
    // }
  },
  
  httpFailFn: (error) => {
    // HTTP失败回调 (网络错误、404、500等)
    console.log('HTTP Fail:', error);
    
    // error 包含:
    // {
    //   status: 404,        // HTTP状态码
    //   statusText: "Not Found",
    //   message: "请求失败"
    // }
  },
  
  // ============= 高级选项 (一般情况下无需使用) =============
  check_cors_lt: false,             // 检查跨域token过期
  glt: {},                          // glt名称配置
  is_cors: false,                   // 是否跨域请求
  gltNewSearch: false,              // 是否新搜索
  is_get_server_time: false,        // 是否获取服务器时间
  myLoginedToken_CORS: null,        // 跨域登录token
  is_logined_token_refresh: false,  // 是否刷新登录token
  isApiMode: false,                 // 是否API模式
  successFn_LT: null,               // 登录token刷新成功回调
  failFn_LT: null                   // 登录token刷新失败回调

}, {
  // ============= 安全选项 (secretOpt) =============
  secret: true,                     // 是否启用加密传输 (默认: false)
  encryptKeys: [                    // 需要加密的字段数组
    'password',                     // 简单字段
    'user.password',                // 嵌套字段
    'list..password',               // 数组中的字段 (..表示数组)
    'company.employees..details.salary'  // 深层嵌套数组字段
  ]
});

// ==================== 常用配置组合模式 ====================

// 1. 🔥 标准业务请求配置
const standardConfig = {
  showMsg: true,           // 显示成功提示
  showFailMsg: true,       // 显示失败提示
  showLoading: true,       // 显示加载状态
  successFn: (res) => {
    // 处理成功结果
    console.log('操作成功', res);
  },
  failFn: (res) => {
    // 处理业务失败
    console.error('业务失败', res);
  }
};

// 2. 🔒 安全敏感数据请求
const secureConfig = {
  showMsg: false,
  showFailMsg: true,
  headers: {
    'Authorization': 'Bearer ' + getAuthToken(),
    'X-Request-ID': generateRequestId()
  },
  successFn: (res) => { /* 处理结果 */ },
  failFn: (res) => { /* 错误处理 */ },
  httpFailFn: (error) => {
    if (error.status === 401) {
      // 处理认证失败
      redirectToLogin();
    }
  }
};
const secureSecretOpt = {
  secret: true,
  encryptKeys: ['password', 'personalInfo.idCard']
};

// 3. 📄 文件上传配置
const fileUploadConfig = {
  contentType: 'multipartForm',
  showLoading: { time: 30000 },  // 文件上传可能较慢
  showMsg: true,
  isFile: true,
  successFn: (res) => {
    console.log('文件上传成功', res.datas.fileUrl);
  }
};

// 4. 📦 批量操作配置
const batchConfig = {
  showLoading: false,      // 手动控制loading
  showMsg: false,          // 不显示默认消息
  allowSameUrl: true,      // 允许重复请求
  successFn: (res) => { /* 批量成功处理 */ },
  failFn: (res) => { /* 批量失败处理 */ }
};

// 5. 🔄 重试请求配置
const retryConfig = {
  showMsg: false,
  showFailMsg: false,
  showErrorMsg: false,
  successFn: (res) => { /* 重试成功 */ },
  failFn: (res) => { /* 业务失败，可能需要重试 */ },
  httpFailFn: (error) => { /* 网络失败，需要重试 */ }
};

// ==================== 使用配置模式的示例 ====================

// 标准请求
$hyapi.io.post(mds, '/api/user/create', userData, standardConfig);

// 安全请求
$hyapi.io.post(mds, '/api/user/sensitive', sensitiveData, secureConfig, secureSecretOpt);

// 文件上传
const formData = new FormData();
formData.append('file', file);
$hyapi.io.post(mds, '/api/upload', formData, fileUploadConfig);

// ==================== 动态配置生成 ====================
class RequestConfigBuilder {
  private config: any = {};
  private secretOpt: any = {};
  
  // 设置消息显示
  setMessage(showSuccess = true, showFail = true) {
    this.config.showMsg = showSuccess;
    this.config.showFailMsg = showFail;
    return this;
  }
  
  // 设置加载状态
  setLoading(show = true, time?: number) {
    if (typeof show === 'boolean') {
      this.config.showLoading = show;
    } else {
      this.config.showLoading = { time: time || 5000 };
    }
    return this;
  }
  
  // 设置请求头
  setHeaders(headers: object) {
    this.config.headers = { ...this.config.headers, ...headers };
    return this;
  }
  
  // 设置回调函数
  setCallbacks(success?: Function, fail?: Function, httpFail?: Function) {
    if (success) this.config.successFn = success;
    if (fail) this.config.failFn = fail;
    if (httpFail) this.config.httpFailFn = httpFail;
    return this;
  }
  
  // 设置加密选项
  setEncryption(encryptKeys: string[]) {
    this.secretOpt.secret = true;
    this.secretOpt.encryptKeys = encryptKeys;
    return this;
  }
  
  // 构建配置
  build() {
    return {
      config: { ...this.config },
      secretOpt: Object.keys(this.secretOpt).length > 0 ? { ...this.secretOpt } : undefined
    };
  }
}

// 使用构建器模式
const { config, secretOpt } = new RequestConfigBuilder()
  .setMessage(true, true)
  .setLoading(true, 10000)
  .setHeaders({ 'X-Custom': 'value' })
  .setCallbacks(
    (res) => console.log('Success'),
    (res) => console.log('Fail')
  )
  .setEncryption(['password', 'email'])
  .build();

$hyapi.io.post(mds, url, data, config, secretOpt);`;

  return {
    props: args,
    template: `
      <div style="border:2px solid var(--primary-color);padding:15px;margin-bottom:15px;border-radius:8px;background:linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)">
        <h2>📚 完整配置选项汇总</h2>
        <p><strong>终极指南:</strong> $hyapi.io.post方法的所有配置选项、常用模式、最佳实践</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" size="large" (click)="allOptionsExample()">
            📋 查看所有配置选项
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 完整配置参考手册:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:10px;line-height:1.3;overflow-x:auto;border-left:4px solid var(--primary-color);maxoverflow-y:auto"><code>{{configCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:10px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px">
            <h5>🎯 标准配置</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>showMsg: true</li>
              <li>showFailMsg: true</li>
              <li>showLoading: true</li>
            </ul>
          </div>
          <div style="padding:10px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px">
            <h5>🔒 安全配置</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>secret: true</li>
              <li>encryptKeys: [...]</li>
              <li>headers: 认证头</li>
            </ul>
          </div>
          <div style="padding:10px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px">
            <h5>📄 文件配置</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>contentType: multipartForm</li>
              <li>isFile: true</li>
              <li>showLoading: 长时间</li>
            </ul>
          </div>
          <div style="padding:10px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px">
            <h5>📦 批量配置</h5>
            <ul style="margin:5px 0;padding-left:20px;font-size:12px">
              <li>allowSameUrl: true</li>
              <li>showLoading: false</li>
              <li>手动控制消息</li>
            </ul>
          </div>
        </div>
        
        <div style="margin-top:20px;padding:20px;background:#ffffff;border:2px solid #52c41a;border-radius:8px">
          <h4 style="margin:0 0 15px 0;color:#52c41a">🎓 最佳实践总结</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <div>
              <h5 style="color:var(--primary-color);margin:0 0 10px 0">✅ 推荐做法</h5>
              <ul style="margin:0;padding-left:20px;color:#666;font-size:13px">
                <li>根据业务场景选择合适的配置模式</li>
                <li>敏感数据务必启用字段级加密</li>
                <li>文件上传设置较长的loading时间</li>
                <li>批量操作手动控制loading和消息</li>
                <li>使用构建器模式管理复杂配置</li>
                <li>为不同错误类型设置专门处理逻辑</li>
              </ul>
            </div>
            <div>
              <h5 style="color:#f5222d;margin:0 0 10px 0">❌ 避免做法</h5>
              <ul style="margin:0;padding-left:20px;color:#666;font-size:13px">
                <li>不要在生产环境泄露敏感数据</li>
                <li>避免过度加密影响性能</li>
                <li>不要忽略HTTP错误处理</li>
                <li>避免无限重试导致系统压力</li>
                <li>不要在每个请求都设置相同配置</li>
                <li>避免混用不同的loading控制方式</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="margin-top:15px;padding:15px;background:#fff9e6;border-radius:8px;border-left:5px solid #faad14">
          <h4 style="margin:0 0 10px 0;color:#faad14">💡 开发提示</h4>
          <p style="margin:0;color:#666;font-size:13px">
            本文档涵盖了 $hyapi.io.post 的所有功能特性，从基础使用到高级配置，从错误处理到安全加密。
            建议开发者根据实际业务需求，选择合适的配置模式，并结合项目规范制定统一的请求配置标准。
            <br><br>
            <strong>记住：</strong>好的HTTP请求封装不仅要功能完备，更要简单易用、安全可靠！
          </p>
        </div>
      </div>
    `
  };
};
export const configOptions: Story = ConfigOptionsTemplate.bind({});
configOptions.storyName = '8️⃣ 完整配置选项汇总'; 