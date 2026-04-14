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
class MockDicService implements Partial<ModelService> {
    private $dicCache: any = {};

    public tableServiceMap: any = {};


    constructor() {
        _this = this;
        setTimeout(() => {
            console.log('字典服务已初始化', this);
            // 模拟一些字典数据
            this.mockDictionaryData();
        }, 100);
    }

    private mockDictionaryData() {
        // 模拟字典数据存储
        (window as any).mockDicCache = {
            'userStatus': [
                { text: '正常', id: '1' },
                { text: '禁用', id: '0' },
                { text: '锁定', id: '2' }
            ],
            'departments': [
                { text: '技术部', id: 'tech' },
                { text: '销售部', id: 'sales' },
                { text: '人事部', id: 'hr' },
                { text: '财务部', id: 'finance' }
            ],
            'priorities': [
                { text: '高', id: 'high' },
                { text: '中', id: 'medium' },
                { text: '低', id: 'low' }
            ]
        };
    }
}

export default {
    title: 'HyApi工具类文档/$hyapi.dic (字典数据)',
    decorators: [
        moduleMetadata({
            imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
            providers: [{ provide: ModelService, useClass: MockDicService }, TableService]
        }),
    ],
} as Meta;

// 1. 基础字典操作
const BasicDicTemplate: Story = (args: any) => {
    args.getDictionary = () => {
        // 模拟获取字典数据
        const mockCallback = (data: any) => {
            console.log('字典数据获取成功:', data);
            $hyapi.msg.createTips('success', `获取到${data.length}条字典数据`);
        };

        $hyapi.dic.get('userStatus', _this, { callback: mockCallback });
    };

    args.getFromCache = () => {
        // 从缓存获取字典
        const cachedData = $hyapi.dic.getFromCache('departments', _this);
        if (cachedData) {
            console.log('从缓存获取字典:', cachedData);
            $hyapi.msg.createTips('info', `从缓存获取到${cachedData.length}条数据`);
        } else {
            $hyapi.msg.createTips('warning', '缓存中没有找到该字典数据');
        }
    };

    args.getFromServer = () => {
        // 从服务器获取字典
        const serverCallback = (data: any) => {
            console.log('从服务器获取字典数据:', data);
            $hyapi.msg.createTips('success', '从服务器获取字典数据成功');
        };

        $hyapi.dic.getFromServer('priorities', _this, { dic: 'priorities' }, serverCallback);
    };

    args.basicDicCode = `
// ================ 基础字典操作 ================

// 1. 获取字典数据（推荐方式）
$hyapi.dic.get('userStatus', mds, {
  callback: (data) => {
    console.log('字典数据:', data);
    // data 格式: [{ text: '显示文本', id: '值' }, ...]
  }
});

// 2. 从缓存获取字典数据
const cachedData = $hyapi.dic.getFromCache('departments', mds);
if (cachedData) {
  console.log('缓存数据:', cachedData);
} else {
  console.log('缓存中无数据，需要从服务器获取');
}

// 3. 从服务器获取字典数据
$hyapi.dic.getFromServer('priorities', mds, { dic: 'priorities' }, (data) => {
  console.log('服务器数据:', data);
});

// 4. 缓存字典数据
const dicData = {
  name: 'customDic',
  value: [
    { text: '选项1', id: '1' },
    { text: '选项2', id: '2' }
  ]
};
$hyapi.dic.cache(dicData, mds);

// ================ 字典数据结构 ================

// HyDicValue 接口
interface HyDicValue {
  text: string;    // 显示文本
  id: string;      // 值/标识
}

// HyDicData 接口
interface HyDicData {
  name: string;           // 字典名称
  value: HyDicValue[];    // 字典值数组
}

// ================ 实际使用场景 ================

class DictionaryManager {
  
  constructor(private mds: ModelService) {}
  
  // 场景1：初始化页面字典
  async initPageDictionaries() {
    const dictionaries = ['userStatus', 'departments', 'priorities'];
    
    // 并行加载多个字典
    const promises = dictionaries.map(dicName => 
      new Promise((resolve) => {
        $hyapi.dic.get(dicName, this.mds, {
          callback: (data) => {
            console.log(\`字典 \${dicName} 加载完成:, data);
            resolve(data);
          }
        });
      })
    );
    
    try {
      await Promise.all(promises);
      console.log('所有字典加载完成');
    } catch (error) {
      console.error('字典加载失败:', error);
    }
  }
  
  // 场景2：动态获取字典
  getDynamicDictionary(dicName: string): Promise<HyDicValue[]> {
    return new Promise((resolve, reject) => {
      // 先尝试从缓存获取
      const cached = $hyapi.dic.getFromCache(dicName, this.mds);
      if (cached) {
        resolve(cached);
        return;
      }
      
      // 缓存中没有，从服务器获取
      $hyapi.dic.getFromServer(dicName, this.mds, { dic: dicName }, (data) => {
        if (data) {
          resolve(data);
        } else {
          reject(new Error(\`字典 \${dicName} 获取失败\`));
        }
      });
    });
  }
  
  // 场景3：表单联动字典
  async handleDepartmentChange(departmentId: string) {
    // 根据部门获取对应的职位字典
    try {
      const positions = await this.getDynamicDictionary(\`positions_\${departmentId}\`);
      
      // 更新职位下拉选项
      this.updatePositionOptions(positions);
      
    } catch (error) {
      console.error('获取职位字典失败:', error);
      $hyapi.msg.createTips('error', '获取职位信息失败');
    }
  }
  
  private updatePositionOptions(positions: HyDicValue[]) {
    // 更新表单中的职位选项
    console.log('更新职位选项:', positions);
  }
  
  // 场景4：字典数据验证
  validateDictionaryValue(dicName: string, value: string): boolean {
    const dicData = $hyapi.dic.getFromCache(dicName, this.mds);
    
    if (!dicData) {
      console.warn(\`字典 \${dicName} 不存在\`);
      return false;
    }
    
    return dicData.some(item => item.id === value);
  }
  
  // 场景5：字典数据转换
  getDictionaryText(dicName: string, value: string): string {
    const dicData = $hyapi.dic.getFromCache(dicName, this.mds);
    
    if (!dicData) {
      return value; // 找不到字典时返回原值
    }
    
    const item = dicData.find(item => item.id === value);
    return item ? item.text : value;
  }
  
  // 场景6：批量获取字典文本
  batchGetDictionaryText(dicName: string, values: string[]): string[] {
    return values.map(value => this.getDictionaryText(dicName, value));
  }
}

// ================ 字典缓存管理 ================

class DictionaryCacheManager {
  
  private cacheTimestamps = new Map<string, number>();
  private readonly CACHE_TIMEOUT = 5 * 60 * 1000; // 5分钟缓存过期
  
  constructor(private mds: ModelService) {}
  
  // 智能缓存获取
  async getWithSmartCache(dicName: string): Promise<HyDicValue[]> {
    const now = Date.now();
    const cacheTime = this.cacheTimestamps.get(dicName);
    
    // 检查缓存是否过期
    if (cacheTime && (now - cacheTime) < this.CACHE_TIMEOUT) {
      const cached = $hyapi.dic.getFromCache(dicName, this.mds);
      if (cached) {
        console.log(\`使用缓存数据: \${dicName}\`);
        return cached;
      }
    }
    
    // 缓存过期或不存在，从服务器获取
    return new Promise((resolve, reject) => {
      $hyapi.dic.getFromServer(dicName, this.mds, { dic: dicName }, (data) => {
        if (data) {
          // 更新缓存时间戳
          this.cacheTimestamps.set(dicName, now);
          resolve(data);
        } else {
          reject(new Error(\`获取字典 \${dicName} 失败\`));
        }
      });
    });
  }
  
  // 预加载字典
  async preloadDictionaries(dicNames: string[]) {
    const loadPromises = dicNames.map(async (dicName) => {
      try {
        await this.getWithSmartCache(dicName);
        console.log(\`字典 \${dicName} 预加载完成\`);
      } catch (error) {
        console.error(\`字典 \${dicName} 预加载失败:\`, error);
      }
    });
    
    await Promise.allSettled(loadPromises);
  }
  
  // 清除过期缓存
  clearExpiredCache() {
    const now = Date.now();
    const expiredKeys = [];
    
    this.cacheTimestamps.forEach((timestamp, key) => {
      if ((now - timestamp) > this.CACHE_TIMEOUT) {
        expiredKeys.push(key);
      }
    });
    
    expiredKeys.forEach(key => {
      this.cacheTimestamps.delete(key);
      // 这里可以添加清除实际缓存数据的逻辑
      console.log(\`清除过期字典缓存: \${key}\`);
    });
    
    return expiredKeys.length;
  }
  
  // 获取缓存统计
  getCacheStats() {
    const now = Date.now();
    let validCount = 0;
    let expiredCount = 0;
    
    this.cacheTimestamps.forEach((timestamp) => {
      if ((now - timestamp) < this.CACHE_TIMEOUT) {
        validCount++;
      } else {
        expiredCount++;
      }
    });
    
    return {
      total: this.cacheTimestamps.size,
      valid: validCount,
      expired: expiredCount
    };
  }
}`;

    return {
        props: args,
        template: `
      <div style="border:2px solid #13c2c2;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>📚 基础字典操作功能</h2>
        <p><strong>核心功能:</strong> 字典数据获取、缓存管理、服务器同步、数据转换</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="getDictionary()" style="margin-right:10px">
            📖 获取字典数据
          </button>
          <button nz-button nzType="default" (click)="getFromCache()" style="margin-right:10px">
            💾 从缓存获取
          </button>
          <button nz-button nzType="dashed" (click)="getFromServer()">
            🌐 从服务器获取
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 基础字典操作详解:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #13c2c2"><code>{{basicDicCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#e6fffb;border-radius:4px;border:1px solid #87e8de">
            <h5 style="color:#13c2c2;margin:0 0 10px 0">📖 字典获取</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>get(): 智能获取</li>
              <li>getFromCache(): 缓存获取</li>
              <li>getFromServer(): 服务器获取</li>
              <li>getDicData(): 异步获取</li>
            </ul>
          </div>
          <div style="padding:15px;background:#e6fffb;border-radius:4px;border:1px solid #87e8de">
            <h5 style="color:#13c2c2;margin:0 0 10px 0">💾 缓存管理</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>cache(): 缓存数据</li>
              <li>智能缓存策略</li>
              <li>过期时间管理</li>
              <li>缓存统计监控</li>
            </ul>
          </div>
          <div style="padding:15px;background:#e6fffb;border-radius:4px;border:1px solid #87e8de">
            <h5 style="color:#13c2c2;margin:0 0 10px 0">🔧 工具方法</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>isDicTmp(): 类型判断</li>
              <li>getDicTextFromCache(): 文本获取</li>
              <li>数据验证转换</li>
              <li>批量操作处理</li>
            </ul>
          </div>
        </div>
      </div>
    `
    };
};
export const basicDic: Story = BasicDicTemplate.bind({});
basicDic.storyName = '1️⃣ 基础字典操作';

// 2. 字典文本转换
const DicTextTemplate: Story = (args: any) => {
    args.getDicText = () => {
        // 模拟获取字典文本
        const text = $hyapi.dic.getDicTextFromCache('userStatus', '1', _this);
        console.log('字典文本转换结果:', text);
        $hyapi.msg.createTips('info', `用户状态 1 对应的文本是: ${text || '未找到'}`);
    };

    args.getBatchDicText = () => {
        // 批量获取字典文本
        const values = ['1', '0', '2'];
        const texts = values.map(value => {
            return $hyapi.dic.getDicTextFromCache('userStatus', value, _this) || value;
        });

        console.log('批量字典文本转换:', texts);
        $hyapi.msg.createTips('success', `批量转换结果: ${texts.join(', ')}`);
    };

    args.getMultiSelectText = () => {
        // 多选字典文本（用分隔符）
        const multiValue = '1,0,2';
        const text = $hyapi.dic.getDicTextFromCache('userStatus', multiValue, _this, ' | ');
        console.log('多选字典文本:', text);
        $hyapi.msg.createTips('info', `多选状态显示: ${text || '未找到'}`);
    };

    args.dicTextCode = `
// ================ 字典文本转换 ================

// 1. 单个值转换为文本
const statusText = $hyapi.dic.getDicTextFromCache('userStatus', '1', mds);
console.log(statusText); // 输出: "正常"

// 2. 多选值转换（使用分隔符）
const multiValues = '1,0,2'; // 多个值用逗号分隔
const multiText = $hyapi.dic.getDicTextFromCache('userStatus', multiValues, mds, ' | ');
console.log(multiText); // 输出: "正常 | 禁用 | 锁定"

// 3. 自定义分隔符
const customSeparator = $hyapi.dic.getDicTextFromCache('departments', 'tech,sales', mds, ' - ');
console.log(customSeparator); // 输出: "技术部 - 销售部"

// ================ 参数详解 ================
$hyapi.dic.getDicTextFromCache(dicName, dicValue, mds, separator);

// dicName: string - 字典名称
// dicValue: any - 字典值（可以是单个值或逗号分隔的多个值）
// mds: ModelService - ModelService实例
// separator: string - 多个值的分隔符，默认为逗号

// ================ 实际应用场景 ================

class DictionaryTextService {
  
  constructor(private mds: ModelService) {}
  
  // 场景1：表格数据显示转换
  formatTableData(tableData: any[]) {
    return tableData.map(row => ({
      ...row,
      statusText: this.getDicText('userStatus', row.status),
      departmentText: this.getDicText('departments', row.department),
      priorityText: this.getDicText('priorities', row.priority)
    }));
  }
  
  // 场景2：表单数据显示
  formatFormData(formData: any) {
    return {
      ...formData,
      statusDisplay: this.getDicText('userStatus', formData.status),
      departmentDisplay: this.getDicText('departments', formData.department),
      // 多选字段处理
      tagsDisplay: this.getDicText('tags', formData.tags, ' / ')
    };
  }
  
  // 场景3：详情页面展示
  getDetailDisplayData(detailData: any): any {
    const displayData = { ...detailData };
    
    // 定义需要转换的字段和对应的字典
    const dicFields = {
      status: 'userStatus',
      department: 'departments',
      priority: 'priorities',
      category: 'categories'
    };
    
    // 批量转换
    Object.entries(dicFields).forEach(([field, dicName]) => {
      if (displayData[field] !== undefined) {
        displayData[\`\${field}Text\`] = this.getDicText(dicName, displayData[field]);
      }
    });
    
    return displayData;
  }
  
  // 场景4：导出数据格式化
  formatExportData(exportData: any[]) {
    return exportData.map(item => ({
      用户名: item.username,
      状态: this.getDicText('userStatus', item.status) || item.status,
      部门: this.getDicText('departments', item.department) || item.department,
      优先级: this.getDicText('priorities', item.priority) || item.priority,
      创建时间: item.createTime
    }));
  }
  
  // 场景5：搜索条件显示
  formatSearchConditions(searchParams: any) {
    const conditions = [];
    
    if (searchParams.status) {
      const statusText = this.getDicText('userStatus', searchParams.status);
      conditions.push(\`状态: \${statusText}\`);
    }
    
    if (searchParams.department) {
      const deptText = this.getDicText('departments', searchParams.department);
      conditions.push(\`部门: \${deptText}\`);
    }
    
    if (searchParams.dateRange) {
      conditions.push(\`时间: \${searchParams.dateRange[0]} 至 \${searchParams.dateRange[1]}\`);
    }
    
    return conditions.join(', ');
  }
  
  // 辅助方法：安全获取字典文本
  private getDicText(dicName: string, value: any, separator: string = ','): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    
    const text = $hyapi.dic.getDicTextFromCache(dicName, value, this.mds, separator);
    return text || String(value); // 找不到字典时返回原值
  }
  
  // 场景6：动态字典文本获取
  async getDynamicDicText(dicName: string, value: any): Promise<string> {
    // 先尝试从缓存获取
    let text = $hyapi.dic.getDicTextFromCache(dicName, value, this.mds);
    
    if (!text) {
      // 缓存中没有，尝试加载字典
      try {
        await new Promise<void>((resolve, reject) => {
          $hyapi.dic.get(dicName, this.mds, {
            callback: (data) => {
              if (data) {
                resolve();
              } else {
                reject(new Error('字典加载失败'));
              }
            }
          });
        });
        
        // 重新获取文本
        text = $hyapi.dic.getDicTextFromCache(dicName, value, this.mds);
      } catch (error) {
        console.error(\`动态获取字典 \${dicName} 失败:\`, error);
      }
    }
    
    return text || String(value);
  }
}

// ================ 字典文本工具类 ================

class DictionaryTextUtils {
  
  // 创建字典文本映射
  static createTextMap(dicData: HyDicValue[]): Map<string, string> {
    const map = new Map<string, string>();
    dicData.forEach(item => {
      map.set(item.id, item.text);
    });
    return map;
  }
  
  // 批量文本转换
  static batchTextConvert(
    dicName: string, 
    values: string[], 
    mds: ModelService, 
    separator: string = ','
  ): string[] {
    return values.map(value => {
      const text = $hyapi.dic.getDicTextFromCache(dicName, value, mds, separator);
      return text || value;
    });
  }
  
  // 对象属性文本转换
  static convertObjectProperties(
    obj: any, 
    fieldMappings: Record<string, string>, 
    mds: ModelService
  ): any {
    const result = { ...obj };
    
    Object.entries(fieldMappings).forEach(([field, dicName]) => {
      if (result[field] !== undefined) {
        const textField = \`\${field}Text\`;
        result[textField] = $hyapi.dic.getDicTextFromCache(dicName, result[field], mds) || result[field];
      }
    });
    
    return result;
  }
  
  // 数组对象批量转换
  static convertArrayObjects(
    array: any[], 
    fieldMappings: Record<string, string>, 
    mds: ModelService
  ): any[] {
    return array.map(obj => this.convertObjectProperties(obj, fieldMappings, mds));
  }
  
  // 字典值验证
  static validateDicValue(dicName: string, value: string, mds: ModelService): boolean {
    const dicData = $hyapi.dic.getFromCache(dicName, mds);
    if (!dicData) return false;
    
    return dicData.some(item => item.id === value);
  }
  
  // 获取字典选项列表
  static getDicOptions(dicName: string, mds: ModelService): Array<{label: string, value: string}> {
    const dicData = $hyapi.dic.getFromCache(dicName, mds);
    if (!dicData) return [];
    
    return dicData.map(item => ({
      label: item.text,
      value: item.id
    }));
  }
}

// ================ 组件中的使用示例 ================

@Component({
  selector: 'app-user-list',
  template: \`
    <nz-table [nzData]="displayData">
      <thead>
        <tr>
          <th>用户名</th>
          <th>状态</th>
          <th>部门</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of displayData">
          <td>{{user.username}}</td>
          <td>{{user.statusText}}</td>
          <td>{{user.departmentText}}</td>
          <td>
            <button nz-button (click)="viewUser(user)">查看</button>
          </td>
        </tr>
      </tbody>
    </nz-table>
  \`
})
export class UserListComponent implements OnInit {
  
  userData: any[] = [];
  displayData: any[] = [];
  
  private textService = new DictionaryTextService(this.mds);
  
  constructor(private mds: ModelService) {}
  
  ngOnInit() {
    this.loadData();
  }
  
  async loadData() {
    // 加载用户数据
    this.userData = await this.userService.getUsers();
    
    // 转换显示数据
    this.displayData = this.textService.formatTableData(this.userData);
  }
  
  viewUser(user: any) {
    // 获取详细显示数据
    const detailData = this.textService.getDetailDisplayData(user);
    console.log('用户详情:', detailData);
  }
}`;

    return {
        props: args,
        template: `
      <div style="border:2px solid #eb2f96;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>🔤 字典文本转换功能</h2>
        <p><strong>核心能力:</strong> 字典值转文本、批量转换、多选处理、数据格式化</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="getDicText()" style="margin-right:10px">
            🔤 单值文本转换
          </button>
          <button nz-button nzType="default" (click)="getBatchDicText()" style="margin-right:10px">
            📝 批量文本转换
          </button>
          <button nz-button nzType="dashed" (click)="getMultiSelectText()">
            🔗 多选文本转换
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 字典文本转换完整解决方案:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #eb2f96"><code>{{dicTextCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#fff0f6;border-radius:4px;border:1px solid #ffadd2">
            <h5 style="color:#eb2f96;margin:0 0 10px 0">🔤 文本转换</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>单值转换</li>
              <li>多值分隔符处理</li>
              <li>批量转换</li>
              <li>安全转换（错误处理）</li>
            </ul>
          </div>
          <div style="padding:15px;background:#fff0f6;border-radius:4px;border:1px solid #ffadd2">
            <h5 style="color:#eb2f96;margin:0 0 10px 0">💼 应用场景</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>表格数据显示</li>
              <li>表单数据格式化</li>
              <li>详情页面展示</li>
              <li>导出数据处理</li>
            </ul>
          </div>
          <div style="padding:15px;background:#fff0f6;border-radius:4px;border:1px solid #ffadd2">
            <h5 style="color:#eb2f96;margin:0 0 10px 0">🔧 工具功能</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>字典映射创建</li>
              <li>对象属性转换</li>
              <li>数值验证</li>
              <li>选项列表生成</li>
            </ul>
          </div>
        </div>
      </div>
    `
    };
};
export const dicText: Story = DicTextTemplate.bind({});
dicText.storyName = '2️⃣ 字典文本转换';

// 3. 动态字典和临时字典
const DynamicDicTemplate: Story = (args: any) => {
    args.checkTmpDic = () => {
        // 检查是否为临时字典
        const isTemp1 = $hyapi.dic.isDicTmp('dd_dynamicDic');
        const isTemp2 = $hyapi.dic.isDicTmp('t_tempDic');
        const isTemp3 = $hyapi.dic.isDicTmp('normalDic');

        console.log('字典类型检查:', {
            'dd_dynamicDic': isTemp1,
            't_tempDic': isTemp2,
            'normalDic': isTemp3
        });

        $hyapi.msg.createTips('info', `动态字典: ${isTemp1}, 临时字典: ${isTemp2}, 普通字典: ${isTemp3}`);
    };

    args.getDicDataAsync = () => {
        // 异步获取字典数据
        $hyapi.dic.getDicData('userStatus', _this).then((data) => {
            console.log('异步获取字典数据成功:', data);
            $hyapi.msg.createTips('success', '异步获取字典数据成功');
        }).catch((error) => {
            console.error('异步获取字典数据失败:', error);
            $hyapi.msg.createTips('error', '异步获取字典数据失败');
        });
    };

    args.dynamicDicCode = `
// ================ 动态字典和临时字典 ================

// 1. 检查字典类型
const isDynamic = $hyapi.dic.isDicTmp('dd_dynamicDic');  // true - 动态字典
const isTemp = $hyapi.dic.isDicTmp('t_tempDic');         // true - 临时字典
const isNormal = $hyapi.dic.isDicTmp('normalDic');       // false - 普通字典

// 字典命名规则：
// - dd_开头：动态字典，通常根据参数动态生成
// - t_开头：临时字典，临时性数据
// - 其他：普通字典，静态配置数据

// 2. 异步获取字典数据
$hyapi.dic.getDicData('userStatus', mds).then((data) => {
  console.log('异步获取成功:', data);
}).catch((error) => {
  console.error('获取失败:', error);
});

// 3. async/await 用法
async function loadDictionary() {
  try {
    const data = await $hyapi.dic.getDicData('departments', mds);
    console.log('字典数据:', data);
    return data;
  } catch (error) {
    console.error('字典加载失败:', error);
    return [];
  }
}

// ================ 动态字典应用场景 ================

class DynamicDictionaryManager {
  
  constructor(private mds: ModelService) {}
  
  // 场景1：级联字典处理
  async handleCascadeDictionary(parentValue: string) {
    const childDicName = \`dd_child_\${parentValue}\`;
    
    try {
      // 检查是否为动态字典
      if ($hyapi.dic.isDicTmp(childDicName)) {
        console.log('正在加载动态字典:', childDicName);
      }
      
      const childData = await $hyapi.dic.getDicData(childDicName, this.mds);
      
      // 更新子级选项
      this.updateChildOptions(childData);
      
    } catch (error) {
      console.error('级联字典加载失败:', error);
      // 设置空选项
      this.updateChildOptions([]);
    }
  }
  
  // 场景2：基于权限的动态字典
  async loadPermissionBasedDictionary(module: string) {
    const userRole = this.getCurrentUserRole();
    const dicName = \`dd_\${module}_\${userRole}\`;
    
    try {
      const data = await $hyapi.dic.getDicData(dicName, this.mds);
      
      // 根据用户权限显示不同的选项
      return data.filter(item => this.hasPermission(item.id));
      
    } catch (error) {
      console.error('权限字典加载失败:', error);
      return [];
    }
  }
  
  // 场景3：临时字典生成和使用
  createTemporaryDictionary(name: string, data: HyDicValue[]) {
    const tempDicName = \`t_\${name}\`;
    
    // 缓存临时字典
    const dicData: HyDicData = {
      name: tempDicName,
      value: data
    };
    
    $hyapi.dic.cache(dicData, this.mds);
    
    // 设置过期时间（模拟）
    setTimeout(() => {
      this.clearTemporaryDictionary(tempDicName);
    }, 30 * 60 * 1000); // 30分钟后清除
    
    return tempDicName;
  }
  
  // 场景4：搜索结果临时字典
  async createSearchResultDictionary(searchKeyword: string): Promise<string> {
    const tempDicName = \`t_search_\${Date.now()}\`;
    
    try {
      // 调用搜索API
      const searchResults = await this.searchService.search(searchKeyword);
      
      // 转换为字典格式
      const dicData = searchResults.map(item => ({
        text: item.title,
        id: item.id
      }));
      
      // 创建临时字典
      return this.createTemporaryDictionary(\`search_\${Date.now()}\`, dicData);
      
    } catch (error) {
      console.error('搜索字典创建失败:', error);
      return '';
    }
  }
  
  // 场景5：动态字典缓存管理
  private dynamicDicCache = new Map<string, {data: HyDicValue[], timestamp: number}>();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10分钟
  
  async getDynamicDictionary(dicName: string, params: any = {}): Promise<HyDicValue[]> {
    const cacheKey = \`\${dicName}_\${JSON.stringify(params)}\`;
    const cached = this.dynamicDicCache.get(cacheKey);
    
    // 检查缓存
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_DURATION) {
      return cached.data;
    }
    
    try {
      // 动态生成字典名
      const dynamicDicName = \`dd_\${dicName}_\${this.hashParams(params)}\`;
      
      const data = await $hyapi.dic.getDicData(dynamicDicName, this.mds);
      
      // 更新缓存
      this.dynamicDicCache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
      
    } catch (error) {
      console.error('动态字典获取失败:', error);
      return [];
    }
  }
  
  // 场景6：字典依赖管理
  private dicDependencies = new Map<string, string[]>();
  
  addDictionaryDependency(childDic: string, parentDics: string[]) {
    this.dicDependencies.set(childDic, parentDics);
  }
  
  async refreshDictionaryChain(rootDic: string) {
    const toRefresh = new Set<string>([rootDic]);
    
    // 找出所有依赖的字典
    this.dicDependencies.forEach((dependencies, dicName) => {
      if (dependencies.includes(rootDic)) {
        toRefresh.add(dicName);
      }
    });
    
    // 按依赖顺序刷新
    for (const dicName of toRefresh) {
      try {
        await $hyapi.dic.getDicData(dicName, this.mds);
        console.log(\`字典 \${dicName} 刷新成功\`);
      } catch (error) {
        console.error(\`字典 \${dicName} 刷新失败:\`, error);
      }
    }
  }
  
  // 辅助方法
  private updateChildOptions(data: HyDicValue[]) {
    // 更新UI中的子级选项
    console.log('更新子级选项:', data);
  }
  
  private getCurrentUserRole(): string {
    return 'admin'; // 模拟获取用户角色
  }
  
  private hasPermission(actionId: string): boolean {
    return true; // 模拟权限检查
  }
  
  private clearTemporaryDictionary(dicName: string) {
    // 清除临时字典的逻辑
    console.log('清除临时字典:', dicName);
  }
  
  private hashParams(params: any): string {
    return btoa(JSON.stringify(params)).substring(0, 8);
  }
}

// ================ 字典生命周期管理 ================

class DictionaryLifecycleManager {
  
  private lifecycleMap = new Map<string, {
    type: 'static' | 'dynamic' | 'temporary',
    createdAt: number,
    lastUsed: number,
    useCount: number,
    ttl?: number
  }>();
  
  // 注册字典生命周期
  registerDictionary(dicName: string, type: 'static' | 'dynamic' | 'temporary', ttl?: number) {
    this.lifecycleMap.set(dicName, {
      type,
      createdAt: Date.now(),
      lastUsed: Date.now(),
      useCount: 0,
      ttl
    });
  }
  
  // 记录字典使用
  recordDictionaryUsage(dicName: string) {
    const lifecycle = this.lifecycleMap.get(dicName);
    if (lifecycle) {
      lifecycle.lastUsed = Date.now();
      lifecycle.useCount++;
    }
  }
  
  // 清理过期字典
  cleanupExpiredDictionaries() {
    const now = Date.now();
    const toRemove: string[] = [];
    
    this.lifecycleMap.forEach((lifecycle, dicName) => {
      if (lifecycle.ttl && (now - lifecycle.createdAt) > lifecycle.ttl) {
        toRemove.push(dicName);
      }
    });
    
    toRemove.forEach(dicName => {
      this.lifecycleMap.delete(dicName);
      console.log(\`清理过期字典: \${dicName}\`);
    });
    
    return toRemove.length;
  }
  
  // 获取字典统计
  getDictionaryStats() {
    const stats = {
      total: this.lifecycleMap.size,
      static: 0,
      dynamic: 0,
      temporary: 0,
      mostUsed: { name: '', count: 0 }
    };
    
    this.lifecycleMap.forEach((lifecycle, dicName) => {
      stats[lifecycle.type]++;
      
      if (lifecycle.useCount > stats.mostUsed.count) {
        stats.mostUsed = { name: dicName, count: lifecycle.useCount };
      }
    });
    
    return stats;
  }
}`;

    return {
        props: args,
        template: `
      <div style="border:2px solid #722ed1;padding:15px;margin-bottom:15px;border-radius:8px">
        <h2>🔄 动态字典和临时字典</h2>
        <p><strong>高级特性:</strong> 字典类型判断、异步获取、动态生成、生命周期管理</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" (click)="checkTmpDic()" style="margin-right:10px">
            🔍 字典类型判断
          </button>
          <button nz-button nzType="default" (click)="getDicDataAsync()">
            ⏳ 异步获取字典
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 动态字典完整管理方案:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:11px;line-height:1.3;overflow-x:auto;border-left:4px solid #722ed1"><code>{{dynamicDicCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin-top:15px">
          <div style="padding:15px;background:#f9f0ff;border-radius:4px;border:1px solid #d3adf7">
            <h5 style="color:#722ed1;margin:0 0 10px 0">🔄 动态字典</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>dd_前缀标识</li>
              <li>参数驱动生成</li>
              <li>级联字典支持</li>
              <li>权限字典过滤</li>
            </ul>
          </div>
          <div style="padding:15px;background:#f9f0ff;border-radius:4px;border:1px solid #d3adf7">
            <h5 style="color:#722ed1;margin:0 0 10px 0">⏱️ 临时字典</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>t_前缀标识</li>
              <li>搜索结果字典</li>
              <li>自动过期清理</li>
              <li>临时数据缓存</li>
            </ul>
          </div>
          <div style="padding:15px;background:#f9f0ff;border-radius:4px;border:1px solid #d3adf7">
            <h5 style="color:#722ed1;margin:0 0 10px 0">🔧 管理功能</h5>
            <ul style="margin:0;padding-left:20px;font-size:12px">
              <li>生命周期管理</li>
              <li>依赖关系处理</li>
              <li>缓存策略优化</li>
              <li>统计监控</li>
            </ul>
          </div>
        </div>
      </div>
    `
    };
};
export const dynamicDic: Story = DynamicDicTemplate.bind({});
dynamicDic.storyName = '3️⃣ 动态字典和临时字典';

// 4. 完整功能手册
const CompleteDicTemplate: Story = (args: any) => {
    args.allDicFeatures = () => {
        $hyapi.msg.createTips('info', '这是dic模块的完整功能演示，请查看代码了解所有特性');
    };

    args.completeDicCode = `
// ==================== $hyapi.dic 完整功能概览 ====================

// ================ 1. 基础获取方法 ================

// 智能获取（推荐）
$hyapi.dic.get(dicName, mds, options);
// 参数：
// - dicName: string - 字典名称
// - mds: ModelService - ModelService实例
// - options: { callback?: (data) => void } - 配置选项

// 从缓存获取
const data = $hyapi.dic.getFromCache(dicName, mds);

// 从服务器获取
$hyapi.dic.getFromServer(dicName, mds, options, callback);

// 异步获取（Promise）
const data = await $hyapi.dic.getDicData(dicName, mds);

// ================ 2. 缓存管理 ================

// 缓存字典数据
const dicData = { name: 'test', value: [{ text: '选项', id: '1' }] };
$hyapi.dic.cache(dicData, mds);

// ================ 3. 文本转换 ================

// 单值转换
const text = $hyapi.dic.getDicTextFromCache(dicName, value, mds);

// 多选转换
const multiText = $hyapi.dic.getDicTextFromCache(dicName, values, mds, separator);

// ================ 4. 类型判断 ================

// 判断是否为动态/临时字典
const isTemp = $hyapi.dic.isDicTmp(dicName);

// ================ 完整使用示例 ================

@Injectable({
  providedIn: 'root'  
})
export class DictionaryService {
  
  private loadingPromises = new Map<string, Promise<HyDicValue[]>>();
  private cacheTimestamps = new Map<string, number>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5分钟
  
  constructor(private mds: ModelService) {}
  
  // ================ 核心方法 ================
  
  // 智能获取字典（带缓存、去重、错误处理）
  async getDictionary(dicName: string): Promise<HyDicValue[]> {
    // 防止重复请求
    if (this.loadingPromises.has(dicName)) {
      return this.loadingPromises.get(dicName)!;
    }
    
    // 检查缓存
    const cached = this.getCachedDictionary(dicName);
    if (cached) {
      return cached;
    }
    
    // 创建加载Promise
    const loadingPromise = this.loadDictionaryFromServer(dicName);
    this.loadingPromises.set(dicName, loadingPromise);
    
    try {
      const data = await loadingPromise;
      this.cacheTimestamps.set(dicName, Date.now());
      return data;
    } finally {
      this.loadingPromises.delete(dicName);
    }
  }
  
  // 批量获取字典
  async getDictionaries(dicNames: string[]): Promise<Record<string, HyDicValue[]>> {
    const results: Record<string, HyDicValue[]> = {};
    
    const promises = dicNames.map(async (dicName) => {
      try {
        const data = await this.getDictionary(dicName);
        results[dicName] = data;
      } catch (error) {
        console.error(\`获取字典 \${dicName} 失败:\`, error);
        results[dicName] = [];
      }
    });
    
    await Promise.all(promises);
    return results;
  }
  
  // 预加载字典
  async preloadDictionaries(dicNames: string[]) {
    console.log('开始预加载字典:', dicNames);
    const startTime = Date.now();
    
    try {
      await this.getDictionaries(dicNames);
      const duration = Date.now() - startTime;
      console.log(\`字典预加载完成，耗时: \${duration}ms\`);
    } catch (error) {
      console.error('字典预加载失败:', error);
    }
  }
  
  // ================ 文本转换服务 ================
  
  // 格式化显示数据
  formatDisplayData<T extends Record<string, any>>(
    data: T,
    fieldMappings: Record<keyof T, string>
  ): T & Record<string, string> {
    const result = { ...data } as T & Record<string, string>;
    
    Object.entries(fieldMappings).forEach(([field, dicName]) => {
      const value = data[field];
      if (value !== undefined && value !== null) {
        const textField = \`\${field}Text\`;
        result[textField] = this.getDictionaryText(dicName as string, value);
      }
    });
    
    return result;
  }
  
  // 格式化表格数据
  formatTableData<T extends Record<string, any>>(
    tableData: T[],
    fieldMappings: Record<keyof T, string>
  ): Array<T & Record<string, string>> {
    return tableData.map(row => this.formatDisplayData(row, fieldMappings));
  }
  
  // 获取字典文本
  getDictionaryText(dicName: string, value: any, separator: string = ', '): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    
    const text = $hyapi.dic.getDicTextFromCache(dicName, value, this.mds, separator);
    return text || String(value);
  }
  
  // ================ 动态字典管理 ================
  
  // 级联字典处理
  async handleCascadeDictionary(parentDic: string, parentValue: string, childDic: string) {
    try {
      // 构建动态字典名
      const dynamicDicName = \`dd_\${childDic}_\${parentValue}\`;
      
      const childData = await this.getDictionary(dynamicDicName);
      
      // 触发级联更新事件
      this.onDictionaryCascade.emit({
        parent: { dic: parentDic, value: parentValue },
        child: { dic: childDic, data: childData }
      });
      
      return childData;
      
    } catch (error) {
      console.error('级联字典处理失败:', error);
      return [];
    }
  }
  
  onDictionaryCascade = new EventEmitter<{
    parent: { dic: string, value: string },
    child: { dic: string, data: HyDicValue[] }
  }>();
  
  // 创建临时字典
  createTemporaryDictionary(name: string, data: HyDicValue[], ttl: number = 30 * 60 * 1000) {
    const tempDicName = \`t_\${name}_\${Date.now()}\`;
    
    // 缓存数据
    const dicData: HyDicData = { name: tempDicName, value: data };
    $hyapi.dic.cache(dicData, this.mds);
    
    // 设置过期清理
    setTimeout(() => {
      this.clearTemporaryDictionary(tempDicName);
    }, ttl);
    
    return tempDicName;
  }
  
  // ================ 缓存管理 ================
  
  // 检查缓存是否有效
  private getCachedDictionary(dicName: string): HyDicValue[] | null {
    const timestamp = this.cacheTimestamps.get(dicName);
    
    if (!timestamp || (Date.now() - timestamp) > this.CACHE_TTL) {
      return null;
    }
    
    return $hyapi.dic.getFromCache(dicName, this.mds);
  }
  
  // 清理过期缓存
  cleanupExpiredCache(): number {
    const now = Date.now();
    let cleanedCount = 0;
    
    this.cacheTimestamps.forEach((timestamp, dicName) => {
      if ((now - timestamp) > this.CACHE_TTL) {
        this.cacheTimestamps.delete(dicName);
        // 这里可以清理实际的缓存数据
        cleanedCount++;
      }
    });
    
    return cleanedCount;
  }
  
  // 获取缓存统计
  getCacheStats() {
    const now = Date.now();
    let validCount = 0;
    let expiredCount = 0;
    
    this.cacheTimestamps.forEach((timestamp) => {
      if ((now - timestamp) <= this.CACHE_TTL) {
        validCount++;
      } else {
        expiredCount++;
      }
    });
    
    return {
      total: this.cacheTimestamps.size,
      valid: validCount,
      expired: expiredCount,
      loadingCount: this.loadingPromises.size
    };
  }
  
  // ================ 工具方法 ================
  
  // 验证字典值
  validateDictionaryValue(dicName: string, value: string): boolean {
    const dicData = $hyapi.dic.getFromCache(dicName, this.mds);
    return dicData ? dicData.some(item => item.id === value) : false;
  }
  
  // 获取字典选项（适用于下拉框）
  getDictionaryOptions(dicName: string): Array<{label: string, value: string}> {
    const dicData = $hyapi.dic.getFromCache(dicName, this.mds);
    return dicData?.map(item => ({ label: item.text, value: item.id })) || [];
  }
  
  // 查找字典项
  findDictionaryItem(dicName: string, value: string): HyDicValue | null {
    const dicData = $hyapi.dic.getFromCache(dicName, this.mds);
    return dicData?.find(item => item.id === value) || null;
  }
  
  // 过滤字典数据
  filterDictionary(dicName: string, predicate: (item: HyDicValue) => boolean): HyDicValue[] {
    const dicData = $hyapi.dic.getFromCache(dicName, this.mds);
    return dicData?.filter(predicate) || [];
  }
  
  // ================ 私有方法 ================
  
  private async loadDictionaryFromServer(dicName: string): Promise<HyDicValue[]> {
    return new Promise((resolve, reject) => {
      $hyapi.dic.get(dicName, this.mds, {
        callback: (data) => {
          if (data && Array.isArray(data)) {
            resolve(data);
          } else {
            reject(new Error(\`字典 \${dicName} 数据格式错误\`));
          }
        }
      });
    });
  }
  
  private clearTemporaryDictionary(dicName: string) {
    this.cacheTimestamps.delete(dicName);
    console.log(\`清理临时字典: \${dicName}\`);
  }
}

// ================ 组件使用示例 ================

@Component({
  selector: 'app-dictionary-example',
  template: \`
    <div class="dictionary-demo">
      <!-- 字典下拉选择 -->
      <nz-select [(ngModel)]="selectedStatus" placeholder="选择状态">
        <nz-option 
          *ngFor="let option of statusOptions" 
          [nzValue]="option.value" 
          [nzLabel]="option.label">
        </nz-option>
      </nz-select>
      
      <!-- 级联选择 -->
      <nz-select [(ngModel)]="selectedDepartment" (ngModelChange)="onDepartmentChange($event)">
        <nz-option 
          *ngFor="let dept of departmentOptions" 
          [nzValue]="dept.value" 
          [nzLabel]="dept.label">
        </nz-option>
      </nz-select>
      
      <nz-select [(ngModel)]="selectedPosition" placeholder="选择职位">
        <nz-option 
          *ngFor="let pos of positionOptions" 
          [nzValue]="pos.value" 
          [nzLabel]="pos.label">
        </nz-option>
      </nz-select>
      
      <!-- 数据表格 -->
      <nz-table [nzData]="displayTableData">
        <thead>
          <tr>
            <th>姓名</th>
            <th>状态</th>
            <th>部门</th>
            <th>职位</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of displayTableData">
            <td>{{item.name}}</td>
            <td>{{item.statusText}}</td>
            <td>{{item.departmentText}}</td>
            <td>{{item.positionText}}</td>
          </tr>
        </tbody>
      </nz-table>
    </div>
  \`
})
export class DictionaryExampleComponent implements OnInit, OnDestroy {
  
  selectedStatus: string = '';
  selectedDepartment: string = '';
  selectedPosition: string = '';
  
  statusOptions: Array<{label: string, value: string}> = [];
  departmentOptions: Array<{label: string, value: string}> = [];
  positionOptions: Array<{label: string, value: string}> = [];
  
  tableData: any[] = [];
  displayTableData: any[] = [];
  
  constructor(
    private dicService: DictionaryService,
    private mds: ModelService
  ) {}
  
  async ngOnInit() {
    // 预加载基础字典
    await this.dicService.preloadDictionaries([
      'userStatus', 
      'departments'
    ]);
    
    // 初始化选项
    this.initializeOptions();
    
    // 加载表格数据
    this.loadTableData();
  }
  
  ngOnDestroy() {
    // 清理过期缓存
    this.dicService.cleanupExpiredCache();
  }
  
  private initializeOptions() {
    this.statusOptions = this.dicService.getDictionaryOptions('userStatus');
    this.departmentOptions = this.dicService.getDictionaryOptions('departments');
  }
  
  async onDepartmentChange(departmentId: string) {
    this.selectedPosition = '';
    this.positionOptions = [];
    
    if (departmentId) {
      try {
        const positions = await this.dicService.handleCascadeDictionary(
          'departments', 
          departmentId, 
          'positions'
        );
        
        this.positionOptions = positions.map(pos => ({
          label: pos.text,
          value: pos.id
        }));
        
      } catch (error) {
        console.error('获取职位失败:', error);
      }
    }
  }
  
  private loadTableData() {
    // 模拟表格数据
    this.tableData = [
      { name: '张三', status: '1', department: 'tech', position: 'dev' },
      { name: '李四', status: '0', department: 'sales', position: 'sales_mgr' }
    ];
    
    // 格式化显示数据
    this.displayTableData = this.dicService.formatTableData(this.tableData, {
      status: 'userStatus',
      department: 'departments',
      position: 'positions'
    });
  }
}

// ================ 最佳实践总结 ================

// 1. 字典获取策略
// - 优先使用 get() 方法，它会智能选择缓存或服务器
// - 频繁使用的字典提前预加载
// - 动态字典按需加载，避免无效请求

// 2. 缓存管理
// - 设置合理的缓存过期时间
// - 定期清理过期缓存
// - 监控缓存命中率

// 3. 错误处理
// - 所有字典操作都要有错误处理
// - 字典不存在时提供默认值
// - 记录字典加载失败的日志

// 4. 性能优化
// - 批量加载减少请求数量
// - 防止重复请求同一字典
// - 使用合适的数据结构存储字典

// 5. 类型安全
// - 定义字典相关的类型接口
// - 使用泛型增强类型检查
// - 验证字典数据格式

// ================ 调试和监控 ================

class DictionaryDebugger {
  
  // 字典使用统计
  static getUsageStats(dicService: DictionaryService) {
    return {
      cache: dicService.getCacheStats(),
      performance: this.getPerformanceStats(),
      errors: this.getErrorStats()
    };
  }
  
  // 性能统计
  private static getPerformanceStats() {
    return {
      avgLoadTime: 0, // 平均加载时间
      cacheHitRate: 0, // 缓存命中率
      totalRequests: 0 // 总请求数
    };
  }
  
  // 错误统计
  private static getErrorStats() {
    return {
      loadFailures: 0, // 加载失败次数
      timeouts: 0,     // 超时次数
      networkErrors: 0 // 网络错误次数
    };
  }
  
  // 字典依赖分析
  static analyzeDependencies(dicNames: string[]) {
    const dependencies = new Map<string, string[]>();
    
    dicNames.forEach(dicName => {
      if ($hyapi.dic.isDicTmp(dicName)) {
        // 分析动态字典的依赖关系
        const match = dicName.match(/dd_(.+)_(.+)/);
        if (match) {
          const [, childType, parentValue] = match;
          dependencies.set(dicName, [parentValue]);
        }
      }
    });
    
    return dependencies;
  }
}`;

    return {
        props: args,
        template: `
      <div style="border:2px solid #1890ff;padding:15px;margin-bottom:15px;border-radius:8px;background:linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)">
        <h2 style="color:#1890ff">📚 $hyapi.dic 完整功能手册</h2>
        <p><strong>终极指南:</strong> 字典数据的所有功能、管理策略、最佳实践、性能优化</p>
        
        <div style="margin:15px 0">
          <button nz-button nzType="primary" size="large" (click)="allDicFeatures()">
            📋 查看完整功能手册
          </button>
        </div>
        
        <div style="margin-top:15px">
          <h4>📋 完整API参考和最佳实践:</h4>
          <pre style="background:#f6f8fa;padding:15px;border-radius:6px;font-size:10px;line-height:1.3;overflow-x:auto;border-left:4px solid #1890ff;max-height:600px;overflow-y:auto"><code>{{completeDicCode}}</code></pre>
        </div>
        
        <div style="display:grid;grid-template-columns:repeat(7, 1fr);gap:10px;margin-top:15px">
          <div style="padding:8px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h6 style="color:#13c2c2;margin:0 0 3px 0;font-size:11px">📖 get</h6>
            <p style="margin:0;font-size:9px">智能获取</p>
          </div>
          <div style="padding:8px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h6 style="color:#13c2c2;margin:0 0 3px 0;font-size:11px">💾 getFromCache</h6>
            <p style="margin:0;font-size:9px">缓存获取</p>
          </div>
          <div style="padding:8px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h6 style="color:#13c2c2;margin:0 0 3px 0;font-size:11px">🌐 getFromServer</h6>
            <p style="margin:0;font-size:9px">服务器获取</p>
          </div>
          <div style="padding:8px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h6 style="color:#13c2c2;margin:0 0 3px 0;font-size:11px">⏳ getDicData</h6>
            <p style="margin:0;font-size:9px">异步获取</p>
          </div>
          <div style="padding:8px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h6 style="color:#eb2f96;margin:0 0 3px 0;font-size:11px">🔤 getDicTextFromCache</h6>
            <p style="margin:0;font-size:9px">文本转换</p>
          </div>
          <div style="padding:8px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h6 style="color:#722ed1;margin:0 0 3px 0;font-size:11px">🔍 isDicTmp</h6>
            <p style="margin:0;font-size:9px">类型判断</p>
          </div>
          <div style="padding:8px;background:#ffffff;border:1px solid #d9d9d9;border-radius:4px;text-align:center">
            <h6 style="color:#fa8c16;margin:0 0 3px 0;font-size:11px">💾 cache</h6>
            <p style="margin:0;font-size:9px">缓存数据</p>
          </div>
        </div>
        
        <div style="margin-top:20px;padding:20px;background:#ffffff;border:2px solid #52c41a;border-radius:8px">
          <h4 style="margin:0 0 15px 0;color:#52c41a">🎓 字典管理最佳实践总结</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <div>
              <h5 style="color:#1890ff;margin:0 0 10px 0">✅ 推荐做法</h5>
              <ul style="margin:0;padding-left:20px;color:#666;font-size:13px">
                <li>使用DictionaryService统一管理字典操作</li>
                <li>设置合理的缓存过期时间和清理策略</li>
                <li>预加载常用字典，动态字典按需加载</li>
                <li>完善的错误处理和降级方案</li>
                <li>字典值变更时提供文本显示转换</li>
                <li>监控字典加载性能和缓存命中率</li>
              </ul>
            </div>
            <div>
              <h5 style="color:#f5222d;margin:0 0 10px 0">❌ 避免做法</h5>
              <ul style="margin:0;padding-left:20px;color:#666;font-size:13px">
                <li>不要忽略字典加载失败的错误处理</li>
                <li>避免重复请求相同字典造成资源浪费</li>
                <li>不要在循环中同步获取字典数据</li>
                <li>避免缓存无限增长不清理过期数据</li>
                <li>不要直接使用字典值显示，要转换为文本</li>
                <li>避免在组件销毁时忘记清理字典资源</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style="margin-top:15px;padding:15px;background:#fff9e6;border-radius:8px;border-left:5px solid #faad14">
          <h4 style="margin:0 0 10px 0;color:#faad14">💡 开发提示</h4>
          <p style="margin:0;color:#666;font-size:13px">
            $hyapi.dic 是HyFrame框架的字典数据管理核心，提供了完整的字典生命周期管理能力。
            从基础的数据获取到高级的动态字典、缓存优化，从文本转换到依赖管理，涵盖了企业应用中所有的字典使用场景。
            <br><br>
            <strong>记住：</strong>优秀的字典管理是用户体验的基础！合理使用缓存策略，提供友好的文本显示，让数据更有意义、界面更加友好。
          </p>
        </div>
      </div>
    `
    };
};
export const completeDic: Story = CompleteDicTemplate.bind({});
completeDic.storyName = '4️⃣ 完整功能手册'; 