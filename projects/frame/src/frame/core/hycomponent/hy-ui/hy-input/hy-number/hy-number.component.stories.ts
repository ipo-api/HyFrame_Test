import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyNumberComponent } from './hy-number.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

const argTypes = unit.createArgTypes('HyNumberComponent');

class MockPricingService implements Partial<ModelService> {
  constructor(){
  }
}

export default {
  title: '表单组件/hy-number（数值输入框）',
  component: HyNumberComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, { provide: ModelService, useClass: MockPricingService }]
    }),
  ],
  argTypes,
} as Meta;

// 基础用法
const BasicTemplate: Story<HyNumberComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础数值输入用法</h3>
      <p>用于输入数值的表单控件，支持键盘操作和鼠标操作</p>
      
      <hy-form>
        <hy-gt model="basicNumber">
          <hy-number title="基础数值" model="basic" placeholder="请输入数值"></hy-number>
          <hy-number title="带默认值" model="defaultValue" [defaultValue]="100"></hy-number>
          <hy-number title="只读模式" model="readonly" [defaultValue]="200" [readonly]="true"></hy-number>
          <hy-number title="禁用状态" model="disabled" [defaultValue]="300" [disabled]="true"></hy-number>
        </hy-gt>
      </hy-form>
    </div>
  `
});

export const basic = BasicTemplate.bind({});
basic.args = {};
basic.storyName = '基础用法';
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

数值输入框是专门用于输入数值的表单控件，提供了数值验证和操作功能。

### 🎯 主要特性

#### 数值输入
- 只允许输入数值类型
- 自动过滤非数字字符
- 支持正负数和小数

#### 操作方式
- **键盘输入**: 直接输入数值
- **步进操作**: 点击上下箭头调整数值
- **滚轮操作**: 鼠标滚轮快速调整

#### 状态控制
- **默认值**: 设置初始数值
- **只读模式**: 显示数值但不可编辑
- **禁用状态**: 完全禁用交互

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| model | 绑定的模型字段 | string | - |
| title | 标签文字 | string | - |
| placeholder | 占位符文字 | string | - |
| defaultValue | 默认值 | number | - |
| readonly | 只读模式 | boolean | false |
| disabled | 禁用状态 | boolean | false |
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="basicNumber">
    <!-- 基础数值输入 -->
    <hy-number title="基础数值" model="basic" placeholder="请输入数值"></hy-number>
    
    <!-- 带默认值 -->
    <hy-number title="带默认值" model="defaultValue" [defaultValue]="100"></hy-number>
    
    <!-- 只读模式 -->
    <hy-number title="只读模式" model="readonly" [defaultValue]="200" [readonly]="true"></hy-number>
    
    <!-- 禁用状态 -->
    <hy-number title="禁用状态" model="disabled" [defaultValue]="300" [disabled]="true"></hy-number>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-number-demo',
  templateUrl: './number-demo.component.html'
})
export class NumberDemoComponent {
  // 表单数据
  formData = {
    basic: null,
    defaultValue: 100,
    readonly: 200,
    disabled: 300
  };

  onValueChange(value: number, field: string) {
    console.log(\`\${field} 值变更为：\`, value);
    this.formData[field] = value;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 数值范围和精度
const RangeTemplate: Story<HyNumberComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>数值范围控制</h4>
        <p>通过设置最小值和最大值限制数值输入范围</p>
        <hy-form>
          <hy-gt model="rangeNumber">
            <hy-number title="0-100范围" model="range1" [min]="0" [max]="100" [defaultValue]="50"></hy-number>
            <hy-number title="负数范围" model="range2" [min]="-100" [max]="0" [defaultValue]="-50"></hy-number>
            <hy-number title="无限制" model="range3" placeholder="无范围限制"></hy-number>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>小数精度控制</h4>
        <p>控制小数位数和步进值</p>
        <hy-form>
          <hy-gt model="precisionNumber">
            <hy-number title="整数" model="integer" [precision]="0" [step]="1" [defaultValue]="10"></hy-number>
            <hy-number title="一位小数" model="decimal1" [precision]="1" [step]="0.1" [defaultValue]="10.5"></hy-number>
            <hy-number title="两位小数" model="decimal2" [precision]="2" [step]="0.01" [defaultValue]="10.55"></hy-number>
            <hy-number title="百分比" model="percentage" [precision]="2" [step]="0.01" [min]="0" [max]="100" [defaultValue]="85.50"></hy-number>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>步进控制</h4>
        <p>自定义步进值和步进操作</p>
        <hy-form>
          <hy-gt model="stepNumber">
            <hy-number title="步进1" model="step1" [step]="1" [defaultValue]="0"></hy-number>
            <hy-number title="步进5" model="step5" [step]="5" [defaultValue]="0"></hy-number>
            <hy-number title="步进0.5" model="stepHalf" [step]="0.5" [defaultValue]="0"></hy-number>
            <hy-number title="步进100" model="step100" [step]="100" [defaultValue]="0"></hy-number>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const range = RangeTemplate.bind({});
range.args = {};
range.storyName = '数值范围和精度';
range.parameters = {
  docs: {
    description: {
      story: `
## 数值范围和精度

通过设置相关属性控制数值的输入范围、精度和步进行为。

### 📊 范围控制

#### 最小值和最大值
- **min**: 设置允许的最小值
- **max**: 设置允许的最大值
- **范围验证**: 自动限制输入在有效范围内

#### 使用场景
- **评分系统**: 0-10分范围
- **百分比**: 0-100%范围
- **温度**: -100°C到100°C
- **年龄**: 0-150岁

### 🎯 精度控制

#### 小数位数
- **precision**: 控制显示和输入的小数位数
- **自动舍入**: 超出精度的数值自动舍入
- **格式化显示**: 按精度格式化显示

#### 精度应用
- **整数**: precision=0，适用于数量、年龄等
- **一位小数**: precision=1，适用于评分、温度等
- **两位小数**: precision=2，适用于价格、百分比等
- **高精度**: precision>2，适用于科学计算等

### ⚡ 步进控制

#### 步进值设置
- **step**: 每次增减的数值
- **键盘操作**: 上下箭头键按步进值调整
- **鼠标操作**: 点击上下按钮按步进值调整

#### 步进策略
- **小步进**: 0.1, 0.01 适合精确调整
- **中步进**: 1, 5 适合常规调整  
- **大步进**: 10, 100 适合快速调整

### 范围和精度配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| min | 最小值 | number | -Infinity |
| max | 最大值 | number | Infinity |
| precision | 小数精度 | number | - |
| step | 步进值 | number | 1 |

### 💡 最佳实践

1. **合理设置范围**: 根据业务需求限制输入范围
2. **精度与用途匹配**: 价格用2位小数，评分用1位小数
3. **步进值人性化**: 设置符合用户操作习惯的步进值
4. **范围提示**: 在placeholder或tip中说明有效范围
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="rangeNumber">
    <!-- 数值范围控制 -->
    <hy-number title="0-100范围" model="range1" 
               [min]="0" [max]="100" 
               [defaultValue]="50"></hy-number>
               
    <hy-number title="负数范围" model="range2" 
               [min]="-100" [max]="0" 
               [defaultValue]="-50"></hy-number>
    
    <!-- 精度控制 -->
    <hy-number title="整数" model="integer" 
               [precision]="0" [step]="1" 
               [defaultValue]="10"></hy-number>
               
    <hy-number title="两位小数" model="decimal2" 
               [precision]="2" [step]="0.01" 
               [defaultValue]="10.55"></hy-number>
               
    <!-- 百分比示例 -->
    <hy-number title="百分比" model="percentage" 
               [precision]="2" [step]="0.01" 
               [min]="0" [max]="100" 
               [defaultValue]="85.50"></hy-number>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-number-range-demo',
  templateUrl: './number-range-demo.component.html'
})
export class NumberRangeDemoComponent {
  // 表单数据
  formData = {
    range1: 50,
    range2: -50,
    integer: 10,
    decimal2: 10.55,
    percentage: 85.50
  };

  // 数值变化处理
  onNumberChange(value: number, field: string) {
    this.formData[field] = value;
    console.log(\`\${field} 变更为：\`, value);
    
    // 根据不同字段处理
    switch(field) {
      case 'percentage':
        this.handlePercentageChange(value);
        break;
      case 'range1':
        this.handleRangeChange(value);
        break;
    }
  }

  // 百分比变化处理
  handlePercentageChange(value: number) {
    if (value > 90) {
      console.log('百分比较高，请注意！');
    }
  }

  // 范围数值变化处理
  handleRangeChange(value: number) {
    console.log(\`范围值：\${value}%\`);
  }

  // 获取格式化后的显示值
  getFormattedValue(value: number, type: 'percentage' | 'currency' | 'decimal'): string {
    switch(type) {
      case 'percentage':
        return \`\${value}%\`;
      case 'currency':
        return \`¥\${value.toFixed(2)}\`;
      case 'decimal':
        return value.toFixed(2);
      default:
        return value.toString();
    }
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 格式化和解析
const FormatterTemplate: Story<HyNumberComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>数值格式化显示</h4>
        <p>通过formatter和parser自定义数值的显示和解析</p>
        <hy-form>
          <hy-gt model="formatterNumber">
            <hy-number title="百分比格式" model="percentage" 
                       [formatter]="percentageFormatter" 
                       [parser]="percentageParser"
                       [defaultValue]="75"></hy-number>
                       
            <hy-number title="货币格式" model="currency" 
                       [formatter]="currencyFormatter" 
                       [parser]="currencyParser"
                       [defaultValue]="1234.56"></hy-number>
                       
            <hy-number title="千分位格式" model="thousand" 
                       [formatter]="thousandFormatter" 
                       [parser]="thousandParser"
                       [defaultValue]="1234567"></hy-number>
                       
            <hy-number title="温度格式" model="temperature" 
                       [formatter]="temperatureFormatter" 
                       [parser]="temperatureParser"
                       [defaultValue]="25"></hy-number>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>单位后缀</h4>
        <p>为数值添加单位后缀</p>
        <hy-form>
          <hy-gt model="suffixNumber">
            <hy-number title="重量(kg)" model="weight" 
                       [formatter]="weightFormatter" 
                       [parser]="weightParser"
                       [defaultValue]="75.5"></hy-number>
                       
            <hy-number title="距离(km)" model="distance" 
                       [formatter]="distanceFormatter" 
                       [parser]="distanceParser"
                       [defaultValue]="100"></hy-number>
                       
            <hy-number title="时间(小时)" model="hours" 
                       [formatter]="hoursFormatter" 
                       [parser]="hoursParser"
                       [defaultValue]="8"></hy-number>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const formatter = FormatterTemplate.bind({});
formatter.args = {
  // 百分比格式化
  percentageFormatter: (value: number) => value !== null && value !== undefined ? `${value}%` : '',
  percentageParser: (value: string) => value.replace('%', ''),
  
  // 货币格式化
  currencyFormatter: (value: number) => value !== null && value !== undefined ? `¥${value.toFixed(2)}` : '',
  currencyParser: (value: string) => value.replace('¥', ''),
  
  // 千分位格式化
  thousandFormatter: (value: number) => {
    if (value === null || value === undefined) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  thousandParser: (value: string) => value.replace(/,/g, ''),
  
  // 温度格式化
  temperatureFormatter: (value: number) => value !== null && value !== undefined ? `${value}°C` : '',
  temperatureParser: (value: string) => value.replace('°C', ''),
  
  // 重量格式化
  weightFormatter: (value: number) => value !== null && value !== undefined ? `${value} kg` : '',
  weightParser: (value: string) => value.replace(' kg', ''),
  
  // 距离格式化
  distanceFormatter: (value: number) => value !== null && value !== undefined ? `${value} km` : '',
  distanceParser: (value: string) => value.replace(' km', ''),
  
  // 时间格式化
  hoursFormatter: (value: number) => value !== null && value !== undefined ? `${value}小时` : '',
  hoursParser: (value: string) => value.replace('小时', '')
};
formatter.storyName = '格式化和解析';
formatter.parameters = {
  docs: {
    description: {
      story: `
## 格式化和解析

通过formatter和parser实现数值的自定义显示格式和输入解析。

### 🎨 格式化显示

#### Formatter函数
- **作用**: 将数值转换为显示格式
- **参数**: 接收数值，返回格式化字符串
- **触发**: 失去焦点时自动格式化

#### 常见格式
- **百分比**: 75 → 75%
- **货币**: 1234.56 → ¥1234.56
- **千分位**: 1234567 → 1,234,567
- **单位**: 25 → 25°C

### 🔍 解析处理

#### Parser函数
- **作用**: 将格式化字符串解析为数值
- **参数**: 接收格式化字符串，返回数值
- **触发**: 获得焦点时自动解析

#### 解析规则
- **移除符号**: 去掉%、¥、°C等符号
- **移除分隔符**: 去掉千分位逗号
- **保留数值**: 提取纯数值部分
- **类型转换**: 转换为number类型

### 💡 实现原理

#### 格式化时机
1. **输入完成**: 失去焦点后格式化显示
2. **初始化**: 组件加载时格式化默认值
3. **程序设置**: 通过代码设置值时格式化

#### 解析时机
1. **开始编辑**: 获得焦点时解析为原始数值
2. **程序读取**: 通过ngModel读取时自动解析

### 格式化配置
| 属性 | 说明 | 类型 | 示例 |
|------|------|------|------|
| formatter | 格式化函数 | (value: number) => string | value => \`\${value}%\` |
| parser | 解析函数 | (value: string) => string | value => value.replace('%', '') |

### 🔧 自定义格式示例

#### 1. 百分比格式
\`\`\`typescript
formatter: (value: number) => \`\${value}%\`
parser: (value: string) => value.replace('%', '')
\`\`\`

#### 2. 货币格式
\`\`\`typescript
formatter: (value: number) => \`¥\${value.toFixed(2)}\`
parser: (value: string) => value.replace('¥', '')
\`\`\`

#### 3. 千分位格式
\`\`\`typescript
formatter: (value: number) => {
  return value.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
}
parser: (value: string) => value.replace(/,/g, '')
\`\`\`

#### 4. 单位后缀
\`\`\`typescript
formatter: (value: number) => \`\${value} kg\`
parser: (value: string) => value.replace(' kg', '')
\`\`\`

### ⚠️ 注意事项

1. **空值处理**: formatter需要处理null/undefined情况
2. **类型转换**: parser返回的字符串会自动转换为数值
3. **精度保持**: 确保格式化不会丢失数值精度
4. **用户体验**: 编辑时显示原始数值，完成后显示格式化结果
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="formatterNumber">
    <!-- 百分比格式 -->
    <hy-number title="百分比格式" model="percentage" 
               [formatter]="percentageFormatter" 
               [parser]="percentageParser"
               [defaultValue]="75"></hy-number>
               
    <!-- 货币格式 -->
    <hy-number title="货币格式" model="currency" 
               [formatter]="currencyFormatter" 
               [parser]="currencyParser"
               [defaultValue]="1234.56"></hy-number>
               
    <!-- 千分位格式 -->
    <hy-number title="千分位格式" model="thousand" 
               [formatter]="thousandFormatter" 
               [parser]="thousandParser"
               [defaultValue]="1234567"></hy-number>
               
    <!-- 单位后缀 -->
    <hy-number title="重量(kg)" model="weight" 
               [formatter]="weightFormatter" 
               [parser]="weightParser"
               [defaultValue]="75.5"></hy-number>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-number-formatter-demo',
  templateUrl: './number-formatter-demo.component.html'
})
export class NumberFormatterDemoComponent {
  // 表单数据
  formData = {
    percentage: 75,
    currency: 1234.56,
    thousand: 1234567,
    weight: 75.5
  };

  // 百分比格式化
  percentageFormatter = (value: number): string => {
    return value !== null && value !== undefined ? \`\${value}%\` : '';
  };
  
  percentageParser = (value: string): string => {
    return value.replace('%', '');
  };

  // 货币格式化
  currencyFormatter = (value: number): string => {
    if (value === null || value === undefined) return '';
    return \`¥\${value.toFixed(2)}\`;
  };
  
  currencyParser = (value: string): string => {
    return value.replace('¥', '');
  };

  // 千分位格式化
  thousandFormatter = (value: number): string => {
    if (value === null || value === undefined) return '';
    return value.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
  };
  
  thousandParser = (value: string): string => {
    return value.replace(/,/g, '');
  };

  // 重量格式化
  weightFormatter = (value: number): string => {
    return value !== null && value !== undefined ? \`\${value} kg\` : '';
  };
  
  weightParser = (value: string): string => {
    return value.replace(' kg', '');
  };

  // 通用格式化工具方法
  createFormatter(suffix: string) {
    return (value: number): string => {
      return value !== null && value !== undefined ? \`\${value}\${suffix}\` : '';
    };
  }

  createParser(suffix: string) {
    return (value: string): string => {
      return value.replace(suffix, '');
    };
  }

  // 复杂格式化示例
  complexFormatter = (value: number): string => {
    if (value === null || value === undefined) return '';
    
    // 根据数值范围使用不同格式
    if (value >= 1000000) {
      return \`\${(value / 1000000).toFixed(1)}M\`;
    } else if (value >= 1000) {
      return \`\${(value / 1000).toFixed(1)}K\`;
    } else {
      return value.toString();
    }
  };

  // 处理格式化值变化
  onFormattedValueChange(value: number, field: string) {
    this.formData[field] = value;
    console.log(\`\${field} 原始值：\`, value);
    console.log(\`\${field} 格式化后：\`, this.getFormattedDisplay(value, field));
  }

  // 获取格式化显示值
  getFormattedDisplay(value: number, field: string): string {
    switch(field) {
      case 'percentage':
        return this.percentageFormatter(value);
      case 'currency':
        return this.currencyFormatter(value);
      case 'thousand':
        return this.thousandFormatter(value);
      case 'weight':
        return this.weightFormatter(value);
      default:
        return value?.toString() || '';
    }
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 表单验证
const ValidationTemplate: Story<HyNumberComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>基础验证</h4>
        <p>数值输入框的表单验证功能</p>
        <hy-form>
          <hy-gt model="validationNumber">
            <hy-number title="必填数值" model="required" 
                       [ckRequired]="true" 
                       placeholder="请输入数值"></hy-number>
                       
            <hy-number title="数值范围" model="range" 
                       [ckRequired]="true" 
                       [ckMin]="10" 
                       [ckMax]="100" 
                       placeholder="请输入10-100的数值"></hy-number>
                       
            <hy-number title="正数验证" model="positive" 
                       [ckRequired]="true" 
                       [ckMin]="0.01" 
                       placeholder="请输入正数"></hy-number>
                       
            <hy-number title="整数验证" model="integer" 
                       [ckRequired]="true" 
                       [ckInteger]="true" 
                       placeholder="请输入整数"></hy-number>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>自定义验证</h4>
        <p>使用自定义验证规则</p>
        <hy-form>
          <hy-gt model="customValidation">
            <hy-number title="偶数验证" model="even" 
                       [ckRequired]="true" 
                       [ckCustom]="evenValidator" 
                       placeholder="请输入偶数"></hy-number>
                       
            <hy-number title="质数验证" model="prime" 
                       [ckRequired]="true" 
                       [ckCustom]="primeValidator" 
                       placeholder="请输入质数"></hy-number>
                       
            <hy-number title="倍数验证" model="multiple" 
                       [ckRequired]="true" 
                       [ckCustom]="multipleValidator" 
                       placeholder="请输入5的倍数"></hy-number>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>业务场景验证</h4>
        <p>实际业务中的验证应用</p>
        <hy-form>
          <hy-gt model="businessValidation">
            <hy-number title="年龄" model="age" 
                       [ckRequired]="true" 
                       [ckMin]="0" 
                       [ckMax]="150" 
                       [precision]="0"
                       placeholder="请输入年龄(0-150)"></hy-number>
                       
            <hy-number title="价格(元)" model="price" 
                       [ckRequired]="true" 
                       [ckMin]="0.01" 
                       [precision]="2"
                       [formatter]="priceFormatter"
                       [parser]="priceParser"
                       placeholder="请输入价格"></hy-number>
                       
            <hy-number title="评分" model="rating" 
                       [ckRequired]="true" 
                       [ckMin]="0" 
                       [ckMax]="10" 
                       [precision]="1"
                       [step]="0.1"
                       placeholder="请输入评分(0-10)"></hy-number>
                       
            <hy-number title="库存数量" model="stock" 
                       [ckRequired]="true" 
                       [ckMin]="0" 
                       [ckInteger]="true"
                       placeholder="请输入库存数量"></hy-number>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>提交验证</h4>
        <hy-form>
          <hy-gt model="submitTest">
            <hy-button title="验证提交" [check]="true" (onClick)="handleSubmit()"></hy-button>
            <hy-button title="重置表单" [check]="false" (onClick)="handleReset()"></hy-button>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const validation = ValidationTemplate.bind({});
validation.args = {
  // 偶数验证器
  evenValidator: (value: any) => {
    if (!value) return null;
    const num = Number(value);
    return num % 2 === 0 ? null : { even: true, message: '请输入偶数' };
  },
  
  // 质数验证器
  primeValidator: (value: any) => {
    if (!value) return null;
    const num = Number(value);
    if (num < 2) return { prime: true, message: '质数必须大于1' };
    
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return { prime: true, message: '请输入质数' };
      }
    }
    return null;
  },
  
  // 倍数验证器
  multipleValidator: (value: any) => {
    if (!value) return null;
    const num = Number(value);
    return num % 5 === 0 ? null : { multiple: true, message: '请输入5的倍数' };
  },
  
  // 价格格式化
  priceFormatter: (value: number) => value !== null && value !== undefined ? `¥${value.toFixed(2)}` : '',
  priceParser: (value: string) => value.replace('¥', ''),
  
  // 提交处理
  handleSubmit: () => {
    console.log('表单验证通过，开始提交');
    alert('表单验证通过！');
  },
  
  // 重置处理
  handleReset: () => {
    console.log('重置表单');
    alert('表单已重置！');
  }
};
validation.storyName = '表单验证';
validation.parameters = {
  docs: {
    description: {
      story: `
## 表单验证

数值输入框与HyFrame表单验证系统深度集成，提供完整的数值验证功能。

### 🔍 内置验证规则

#### 基础验证
- **ckRequired**: 必填验证，确保用户输入数值
- **ckMin**: 最小值验证，限制数值下限
- **ckMax**: 最大值验证，限制数值上限
- **ckInteger**: 整数验证，只允许整数输入

#### 数值范围验证
\`\`\`html
<hy-number [ckMin]="0" [ckMax]="100" title="0-100范围"></hy-number>
\`\`\`

#### 正数验证
\`\`\`html
<hy-number [ckMin]="0.01" title="正数"></hy-number>
\`\`\`

### 🎯 自定义验证

#### 验证器函数
- **参数**: 接收输入值
- **返回**: null表示验证通过，对象表示验证失败
- **错误信息**: 通过message字段提供错误提示

#### 自定义验证示例

##### 偶数验证
\`\`\`typescript
evenValidator = (value: any) => {
  const num = Number(value);
  return num % 2 === 0 ? null : { even: true, message: '请输入偶数' };
};
\`\`\`

##### 质数验证
\`\`\`typescript
primeValidator = (value: any) => {
  const num = Number(value);
  if (num < 2) return { prime: true, message: '质数必须大于1' };
  
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return { prime: true, message: '请输入质数' };
    }
  }
  return null;
};
\`\`\`

### 💼 业务场景验证

#### 年龄验证
- **范围**: 0-150岁
- **类型**: 整数
- **必填**: 是

#### 价格验证
- **最小值**: 0.01元
- **精度**: 2位小数
- **格式**: 货币显示

#### 评分验证
- **范围**: 0-10分
- **精度**: 1位小数
- **步进**: 0.1

#### 库存验证
- **最小值**: 0
- **类型**: 整数
- **业务**: 非负整数

### 📋 验证配置

| 属性 | 说明 | 类型 | 示例 |
|------|------|------|------|
| ckRequired | 必填验证 | boolean | true |
| ckMin | 最小值验证 | number | 0 |
| ckMax | 最大值验证 | number | 100 |
| ckInteger | 整数验证 | boolean | true |
| ckCustom | 自定义验证器 | function | evenValidator |

### ⚡ 验证时机

#### 实时验证
- **输入时**: 键入过程中验证格式
- **失焦时**: 完成输入后验证规则
- **提交时**: 表单提交前综合验证

#### 错误显示
- **内联提示**: 输入框下方显示错误信息
- **颜色标识**: 红色边框标识错误状态
- **图标提示**: 错误图标提供视觉反馈

### 💡 最佳实践

1. **合理组合**: 将内置验证和自定义验证结合使用
2. **友好提示**: 提供清晰的错误信息和输入指导
3. **业务相关**: 验证规则贴合实际业务需求
4. **用户体验**: 避免过于严格的验证影响用户体验
5. **性能优化**: 复杂验证使用防抖处理
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="validationNumber">
    <!-- 基础验证 -->
    <hy-number title="必填数值" model="required" 
               [ckRequired]="true" 
               placeholder="请输入数值"></hy-number>
               
    <hy-number title="数值范围" model="range" 
               [ckRequired]="true" 
               [ckMin]="10" 
               [ckMax]="100" 
               placeholder="请输入10-100的数值"></hy-number>
               
    <!-- 自定义验证 -->
    <hy-number title="偶数验证" model="even" 
               [ckRequired]="true" 
               [ckCustom]="evenValidator" 
               placeholder="请输入偶数"></hy-number>
               
    <!-- 业务验证 -->
    <hy-number title="年龄" model="age" 
               [ckRequired]="true" 
               [ckMin]="0" 
               [ckMax]="150" 
               [precision]="0"
               placeholder="请输入年龄(0-150)"></hy-number>
               
    <hy-number title="价格(元)" model="price" 
               [ckRequired]="true" 
               [ckMin]="0.01" 
               [precision]="2"
               [formatter]="priceFormatter"
               [parser]="priceParser"
               placeholder="请输入价格"></hy-number>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-number-validation-demo',
  templateUrl: './number-validation-demo.component.html'
})
export class NumberValidationDemoComponent {
  // 表单数据
  formData = {
    required: null,
    range: null,
    even: null,
    age: null,
    price: null
  };

  // 偶数验证器
  evenValidator = (value: any) => {
    if (!value) return null;
    const num = Number(value);
    return num % 2 === 0 ? null : { 
      even: true, 
      message: '请输入偶数' 
    };
  };

  // 质数验证器
  primeValidator = (value: any) => {
    if (!value) return null;
    const num = Number(value);
    
    if (num < 2) {
      return { 
        prime: true, 
        message: '质数必须大于1' 
      };
    }
    
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return { 
          prime: true, 
          message: '请输入质数' 
        };
      }
    }
    return null;
  };

  // 倍数验证器
  multipleValidator = (value: any) => {
    if (!value) return null;
    const num = Number(value);
    return num % 5 === 0 ? null : { 
      multiple: true, 
      message: '请输入5的倍数' 
    };
  };

  // 价格格式化
  priceFormatter = (value: number): string => {
    return value !== null && value !== undefined ? \`¥\${value.toFixed(2)}\` : '';
  };
  
  priceParser = (value: string): string => {
    return value.replace('¥', '');
  };

  // 年龄范围验证
  ageRangeValidator = (value: any) => {
    if (!value) return null;
    const age = Number(value);
    
    if (age < 0 || age > 150) {
      return { 
        ageRange: true, 
        message: '年龄必须在0-150之间' 
      };
    }
    
    if (age !== Math.floor(age)) {
      return { 
        ageInteger: true, 
        message: '年龄必须是整数' 
      };
    }
    
    return null;
  };

  // 价格验证
  priceValidator = (value: any) => {
    if (!value) return null;
    const price = Number(value);
    
    if (price <= 0) {
      return { 
        pricePositive: true, 
        message: '价格必须大于0' 
      };
    }
    
    // 验证小数位数
    const decimalPlaces = (price.toString().split('.')[1] || '').length;
    if (decimalPlaces > 2) {
      return { 
        priceDecimal: true, 
        message: '价格最多保留2位小数' 
      };
    }
    
    return null;
  };

  // 表单提交
  handleSubmit() {
    // 验证通过后的处理逻辑
    console.log('表单数据：', this.formData);
    alert('表单验证通过，数据已提交！');
  }

  // 重置表单
  handleReset() {
    this.formData = {
      required: null,
      range: null,
      even: null,
      age: null,
      price: null
    };
    console.log('表单已重置');
  }

  // 数值变化处理
  onNumberChange(value: number, field: string) {
    this.formData[field] = value;
    
    // 根据不同字段进行特殊处理
    switch(field) {
      case 'price':
        this.handlePriceChange(value);
        break;
      case 'age':
        this.handleAgeChange(value);
        break;
    }
  }

  // 价格变化处理
  handlePriceChange(price: number) {
    if (price > 10000) {
      console.log('高价商品，需要审核');
    }
  }

  // 年龄变化处理
  handleAgeChange(age: number) {
    if (age >= 18) {
      console.log('成年人');
    } else if (age > 0) {
      console.log('未成年人');
    }
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 尺寸和样式
const SizeTemplate: Story<HyNumberComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>组件尺寸</h4>
        <p>不同尺寸的数值输入框</p>
        <hy-form>
          <hy-gt model="sizeNumber">
            <hy-number title="大尺寸" model="large" size="large" [defaultValue]="100" placeholder="大尺寸输入框"></hy-number>
            <hy-number title="默认尺寸" model="default" [defaultValue]="200" placeholder="默认尺寸输入框"></hy-number>
            <hy-number title="小尺寸" model="small" size="small" [defaultValue]="300" placeholder="小尺寸输入框"></hy-number>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>栅格布局</h4>
        <p>通过cols属性控制输入框宽度</p>
        <hy-form>
          <hy-gt model="colsNumber">
            <hy-number title="12列宽度" model="col12" [cols]="12" [defaultValue]="100"></hy-number>
            <hy-number title="18列宽度" model="col18" [cols]="18" [defaultValue]="200"></hy-number>
            <hy-number title="24列宽度" model="col24" [cols]="24" [defaultValue]="300"></hy-number>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>标签配置</h4>
        <p>标签宽度和布局设置</p>
        <hy-form>
          <hy-gt model="labelNumber">
            <hy-number title="默认标签" model="defaultLabel" [defaultValue]="100"></hy-number>
            <hy-number title="自定义标签宽度" model="customWidth" [labelWidth]="'120px'" [defaultValue]="200"></hy-number>
            <hy-number title="无冒号标签" model="noColon" [noColon]="true" [defaultValue]="300"></hy-number>
            <hy-number title="无标签模式" model="noLabel" [noLabel]="true" [defaultValue]="400" placeholder="无标签模式"></hy-number>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>提示信息</h4>
        <p>不同类型的提示信息显示</p>
        <hy-form>
          <hy-gt model="tipNumber">
            <hy-number title="右侧提示" model="rightTip" [tip]="'这是右侧提示信息'" [defaultValue]="100"></hy-number>
            <hy-number title="底部提示" model="bottomTip" [tip]="'这是底部提示信息'" tipType="bottomTip" [defaultValue]="200"></hy-number>
            <hy-number title="模板提示" model="templateTip" [tip]="tipTemplate" [defaultValue]="300"></hy-number>
          </hy-gt>
        </hy-form>
        
        <ng-template #tipTemplate>
          <div style="color: #1890ff;">
            <div>💡 提示信息：</div>
            <div>• 支持正负数</div>
            <div>• 支持小数</div>
            <div>• 使用上下箭头调整</div>
          </div>
        </ng-template>
      </div>
    </div>
  `
});

export const sizes = SizeTemplate.bind({});
sizes.args = {};
sizes.storyName = '尺寸和样式';
sizes.parameters = {
  docs: {
    description: {
      story: `
## 尺寸和样式

数值输入框支持多种尺寸和样式配置，适应不同的界面需求。

### 📏 组件尺寸

#### 三种预设尺寸
- **large**: 大尺寸，高度40px，适合重要数据输入
- **default**: 默认尺寸，高度32px，常用尺寸
- **small**: 小尺寸，高度24px，适合紧凑布局

#### 使用场景
- **大尺寸**: 主要数据输入、重要表单字段
- **默认尺寸**: 普通表单、常规数据输入
- **小尺寸**: 表格内联编辑、工具栏输入

### 📐 栅格布局

#### 24栅格系统
- **cols**: 设置输入框占用的栅格列数
- **响应式**: 支持不同屏幕尺寸的布局适配
- **灵活配置**: 1-24列任意设置

#### 常用配置
- **12列**: 占用一半宽度，适合并排布局
- **18列**: 占用3/4宽度，适合重要字段
- **24列**: 占用全宽，适合长内容输入

### 🏷️ 标签配置

#### 标签宽度
- **labelWidth**: 自定义标签区域宽度
- **自适应**: 根据标签内容自动调整
- **统一性**: 保持同一表单标签宽度一致

#### 标签样式
- **noColon**: 隐藏标签后的冒号
- **noLabel**: 完全隐藏标签区域
- **isLabelWrap**: 标签文字换行显示

### 💬 提示信息

#### 提示类型
- **右侧提示**: 在输入框右侧显示
- **底部提示**: 在输入框下方显示
- **模板提示**: 支持复杂HTML模板

#### 提示用途
- **输入指导**: 说明输入格式和要求
- **功能说明**: 解释字段的作用和意义
- **操作提示**: 提供操作方法和快捷键

### 样式配置
| 属性 | 说明 | 类型 | 可选值 |
|------|------|------|---------|
| size | 组件尺寸 | string | 'large'\\|'default'\\|'small' |
| cols | 栅格列数 | number | 1-24 |
| labelWidth | 标签宽度 | string | '100px', '120px' |
| noColon | 隐藏冒号 | boolean | true\\|false |
| noLabel | 隐藏标签 | boolean | true\\|false |
| tip | 提示内容 | string\\|TemplateRef | - |
| tipType | 提示类型 | string | 'rightTip'\\|'bottomTip' |

### 💡 设计建议

#### 一致性原则
1. **同一表单保持统一尺寸**
2. **标签宽度统一对齐**
3. **提示信息风格一致**

#### 可访问性
1. **合理的标签文字**
2. **清晰的提示信息**
3. **适当的组件尺寸**

#### 响应式设计
1. **不同屏幕尺寸适配**
2. **移动端触摸友好**
3. **栅格布局弹性调整**
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="sizeNumber">
    <!-- 组件尺寸 -->
    <hy-number title="大尺寸" model="large" 
               size="large" 
               [defaultValue]="100"></hy-number>
               
    <hy-number title="默认尺寸" model="default" 
               [defaultValue]="200"></hy-number>
               
    <hy-number title="小尺寸" model="small" 
               size="small" 
               [defaultValue]="300"></hy-number>
    
    <!-- 栅格布局 -->
    <hy-number title="12列宽度" model="col12" 
               [cols]="12" 
               [defaultValue]="100"></hy-number>
               
    <hy-number title="24列宽度" model="col24" 
               [cols]="24" 
               [defaultValue]="300"></hy-number>
    
    <!-- 标签配置 -->
    <hy-number title="自定义标签宽度" model="customWidth" 
               [labelWidth]="'120px'" 
               [defaultValue]="200"></hy-number>
               
    <hy-number title="无冒号标签" model="noColon" 
               [noColon]="true" 
               [defaultValue]="300"></hy-number>
               
    <hy-number title="无标签模式" model="noLabel" 
               [noLabel]="true" 
               [defaultValue]="400"></hy-number>
    
    <!-- 提示信息 -->
    <hy-number title="右侧提示" model="rightTip" 
               [tip]="'这是右侧提示信息'" 
               [defaultValue]="100"></hy-number>
               
    <hy-number title="底部提示" model="bottomTip" 
               [tip]="'这是底部提示信息'" 
               tipType="bottomTip" 
               [defaultValue]="200"></hy-number>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component } from '@angular/core';

@Component({
  selector: 'app-number-size-demo',
  templateUrl: './number-size-demo.component.html'
})
export class NumberSizeDemoComponent {
  // 表单数据
  formData = {
    large: 100,
    default: 200,
    small: 300,
    col12: 100,
    col24: 300,
    customWidth: 200,
    noColon: 300,
    noLabel: 400,
    rightTip: 100,
    bottomTip: 200
  };

  // 响应式栅格配置
  responsiveCols = {
    xs: 24,   // <576px
    sm: 12,   // ≥576px
    md: 8,    // ≥768px
    lg: 6,    // ≥992px
    xl: 4     // ≥1200px
  };

  // 动态尺寸配置
  sizeConfig = {
    compact: 'small',
    normal: 'default',
    comfortable: 'large'
  };

  currentSizeMode = 'normal';

  // 获取当前尺寸
  getCurrentSize() {
    return this.sizeConfig[this.currentSizeMode];
  }

  // 切换尺寸模式
  toggleSizeMode() {
    const modes = Object.keys(this.sizeConfig);
    const currentIndex = modes.indexOf(this.currentSizeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    this.currentSizeMode = modes[nextIndex];
  }

  // 标签宽度配置
  labelWidthConfig = {
    short: '80px',
    medium: '100px',
    long: '120px',
    auto: 'auto'
  };

  // 获取适合的标签宽度
  getOptimalLabelWidth(labelText: string): string {
    const length = labelText.length;
    if (length <= 4) return this.labelWidthConfig.short;
    if (length <= 6) return this.labelWidthConfig.medium;
    return this.labelWidthConfig.long;
  }

  // 处理数值变化
  onNumberChange(value: number, field: string) {
    this.formData[field] = value;
    console.log(\`\${field} 变更为：\`, value);
  }

  // 获取组件配置
  getComponentConfig(field: string) {
    return {
      size: this.getCurrentSize(),
      cols: this.getColsByField(field),
      labelWidth: this.getLabelWidthByField(field),
      tip: this.getTipByField(field)
    };
  }

  // 根据字段获取列数
  getColsByField(field: string): number {
    const colsMap = {
      'short': 8,
      'medium': 12,
      'long': 16,
      'full': 24
    };
    
    // 根据字段类型返回合适的列数
    if (field.includes('short')) return colsMap.short;
    if (field.includes('medium')) return colsMap.medium;
    if (field.includes('long')) return colsMap.long;
    return colsMap.full;
  }

  // 根据字段获取标签宽度
  getLabelWidthByField(field: string): string {
    // 可以根据字段名称动态计算标签宽度
    return this.getOptimalLabelWidth(field);
  }

  // 根据字段获取提示信息
  getTipByField(field: string): string {
    const tipMap = {
      'price': '请输入有效的价格，支持2位小数',
      'quantity': '请输入正整数，表示商品数量',
      'rating': '请输入0-10的评分，支持1位小数',
      'percentage': '请输入0-100的百分比值'
    };
    
    return tipMap[field] || '';
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 综合示例
const CompleteTemplate: Story<HyNumberComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>🎯 数值输入框综合应用示例</h3>
      <p>展示数值输入框在实际业务场景中的综合运用</p>
      
      <div class="demo-case">
        <h4>📊 商品管理表单</h4>
        <div style="border: 1px solid #f0f0f0; border-radius: 8px; padding: 20px; background: white;">
          <hy-form>
            <hy-gt model="productForm">
              <!-- 基础信息 -->
              <div style="margin-bottom: 24px;">
                <h5 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">基础信息</h5>
                <hy-text title="商品名称" model="name" [ckRequired]="true" placeholder="请输入商品名称" [cols]="12"></hy-text>
                <hy-text title="商品编码" model="code" [ckRequired]="true" placeholder="请输入商品编码" [cols]="12"></hy-text>
              </div>
              
              <!-- 价格信息 -->
              <div style="margin-bottom: 24px;">
                <h5 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">价格信息</h5>
                <hy-number title="成本价(元)" model="costPrice" 
                           [ckRequired]="true" 
                           [ckMin]="0.01" 
                           [precision]="2"
                           [formatter]="priceFormatter"
                           [parser]="priceParser"
                           [cols]="8"
                           [tip]="'商品的采购成本价格'"
                           placeholder="0.00"></hy-number>
                           
                <hy-number title="售价(元)" model="salePrice" 
                           [ckRequired]="true" 
                           [ckMin]="0.01" 
                           [precision]="2"
                           [formatter]="priceFormatter"
                           [parser]="priceParser"
                           [cols]="8"
                           [tip]="'商品的对外销售价格'"
                           placeholder="0.00"></hy-number>
                           
                <hy-number title="利润率(%)" model="profitRate" 
                           [ckMin]="0" 
                           [ckMax]="1000" 
                           [precision]="2"
                           [formatter]="percentageFormatter"
                           [parser]="percentageParser"
                           [cols]="8"
                           [readonly]="true"
                           [tip]="'自动计算：(售价-成本价)/成本价*100%'"
                           placeholder="0.00%"></hy-number>
              </div>
              
              <!-- 库存信息 -->
              <div style="margin-bottom: 24px;">
                <h5 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">库存信息</h5>
                <hy-number title="当前库存" model="currentStock" 
                           [ckRequired]="true" 
                           [ckMin]="0" 
                           [ckInteger]="true"
                           [cols]="8"
                           [tip]="'当前商品库存数量'"
                           placeholder="0"></hy-number>
                           
                <hy-number title="最低库存" model="minStock" 
                           [ckRequired]="true" 
                           [ckMin]="0" 
                           [ckInteger]="true"
                           [cols]="8"
                           [tip]="'库存预警阈值'"
                           placeholder="0"></hy-number>
                           
                <hy-number title="最高库存" model="maxStock" 
                           [ckMin]="0" 
                           [ckInteger]="true"
                           [cols]="8"
                           [tip]="'最大库存容量限制'"
                           placeholder="0"></hy-number>
              </div>
              
              <!-- 商品属性 -->
              <div style="margin-bottom: 24px;">
                <h5 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">商品属性</h5>
                <hy-number title="重量(kg)" model="weight" 
                           [ckMin]="0.001" 
                           [precision]="3"
                           [formatter]="weightFormatter"
                           [parser]="weightParser"
                           [cols]="8"
                           [tip]="'商品单件重量'"
                           placeholder="0.000"></hy-number>
                           
                <hy-number title="长度(cm)" model="length" 
                           [ckMin]="0.1" 
                           [precision]="1"
                           [formatter]="lengthFormatter"
                           [parser]="lengthParser"
                           [cols]="8"
                           [tip]="'商品长度尺寸'"
                           placeholder="0.0"></hy-number>
                           
                <hy-number title="有效期(天)" model="shelfLife" 
                           [ckMin]="1" 
                           [ckInteger]="true"
                           [cols]="8"
                           [tip]="'商品保质期天数，-1表示无限期'"
                           placeholder="365"></hy-number>
              </div>
              
              <!-- 销售设置 -->
              <div style="margin-bottom: 24px;">
                <h5 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">销售设置</h5>
                <hy-number title="起订量" model="minOrderQty" 
                           [ckRequired]="true" 
                           [ckMin]="1" 
                           [ckInteger]="true"
                           [defaultValue]="1"
                           [cols]="8"
                           [tip]="'单次最小起订数量'"
                           placeholder="1"></hy-number>
                           
                <hy-number title="限购量" model="maxOrderQty" 
                           [ckMin]="1" 
                           [ckInteger]="true"
                           [cols]="8"
                           [tip]="'单次最大购买数量，0表示不限购'"
                           placeholder="0"></hy-number>
                           
                <hy-number title="评分" model="rating" 
                           [ckMin]="0" 
                           [ckMax]="5" 
                           [precision]="1"
                           [step]="0.1"
                           [defaultValue]="5.0"
                           [readonly]="true"
                           [formatter]="ratingFormatter"
                           [parser]="ratingParser"
                           [cols]="8"
                           [tip]="'商品平均评分'"
                           placeholder="5.0"></hy-number>
              </div>
              
              <!-- 操作按钮 -->
              <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #f0f0f0;">
                <hy-button title="保存商品" type="primary" [check]="true" (onClick)="handleSave()"></hy-button>
                <hy-button title="计算利润率" [check]="false" (onClick)="calculateProfitRate()"></hy-button>
                <hy-button title="重置表单" [check]="false" (onClick)="handleReset()"></hy-button>
                <hy-button title="库存预警检查" [check]="false" (onClick)="checkStockWarning()"></hy-button>
              </div>
            </hy-gt>
          </hy-form>
        </div>
        
        <!-- 计算结果显示 -->
        <div style="margin-top: 20px;">
          <h5>📈 实时计算结果</h5>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
            <div style="padding: 12px; background: #f6ffed; border-left: 4px solid #52c41a; border-radius: 4px;">
              <div style="font-size: 12px; color: #666;">利润率</div>
              <div style="font-size: 18px; font-weight: bold; color: #52c41a;">{{calculatedProfitRate}}%</div>
            </div>
            <div style="padding: 12px; background: #e6f7ff; border-left: 4px solid #1890ff; border-radius: 4px;">
              <div style="font-size: 12px; color: #666;">库存状态</div>
              <div style="font-size: 18px; font-weight: bold; color: #1890ff;">{{stockStatus}}</div>
            </div>
            <div style="padding: 12px; background: #fff7e6; border-left: 4px solid #faad14; border-radius: 4px;">
              <div style="font-size: 12px; color: #666;">总重量</div>
              <div style="font-size: 18px; font-weight: bold; color: #faad14;">{{totalWeight}} kg</div>
            </div>
            <div style="padding: 12px; background: #f6f6f6; border-left: 4px solid #666; border-radius: 4px;">
              <div style="font-size: 12px; color: #666;">总价值</div>
              <div style="font-size: 18px; font-weight: bold; color: #666;">¥{{totalValue}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

export const complete = CompleteTemplate.bind({});
complete.args = {
  // 价格格式化
  priceFormatter: (value: number) => value !== null && value !== undefined ? `¥${value.toFixed(2)}` : '',
  priceParser: (value: string) => value.replace('¥', ''),
  
  // 百分比格式化
  percentageFormatter: (value: number) => value !== null && value !== undefined ? `${value.toFixed(2)}%` : '',
  percentageParser: (value: string) => value.replace('%', ''),
  
  // 重量格式化
  weightFormatter: (value: number) => value !== null && value !== undefined ? `${value.toFixed(3)} kg` : '',
  weightParser: (value: string) => value.replace(' kg', ''),
  
  // 长度格式化
  lengthFormatter: (value: number) => value !== null && value !== undefined ? `${value.toFixed(1)} cm` : '',
  lengthParser: (value: string) => value.replace(' cm', ''),
  
  // 评分格式化
  ratingFormatter: (value: number) => value !== null && value !== undefined ? `${value.toFixed(1)}★` : '',
  ratingParser: (value: string) => value.replace('★', ''),
  
  // 计算结果
  calculatedProfitRate: '25.50',
  stockStatus: '正常',
  totalWeight: '150.250',
  totalValue: '12,345.60',
  
  // 事件处理
  handleSave: () => {
    console.log('保存商品信息');
    alert('商品信息保存成功！');
  },
  
  calculateProfitRate: () => {
    console.log('计算利润率');
    alert('利润率已重新计算！');
  },
  
  handleReset: () => {
    console.log('重置表单');
    if (confirm('确定要重置表单吗？')) {
      alert('表单已重置！');
    }
  },
  
  checkStockWarning: () => {
    console.log('检查库存预警');
    alert('库存状态正常，无需预警！');
  }
};
complete.storyName = '综合应用示例';
complete.parameters = {
  docs: {
    description: {
      story: `
## 综合应用示例

这是一个完整的商品管理表单示例，展示了数值输入框在实际业务场景中的综合运用。

### 🎯 业务场景分析

#### 商品基础信息
- **文本字段**: 商品名称、编码等描述性信息
- **数值字段**: 价格、库存、属性等量化信息
- **计算字段**: 利润率等自动计算结果

#### 价格管理
- **成本价**: 采购成本，必填，最小0.01，2位小数，货币格式
- **售价**: 销售价格，必填，最小0.01，2位小数，货币格式  
- **利润率**: 自动计算，只读显示，百分比格式

#### 库存控制
- **当前库存**: 整数，必填，最小0
- **最低库存**: 预警阈值，整数，必填
- **最高库存**: 容量限制，整数，可选

#### 商品属性
- **重量**: 3位小数，单位kg，物流计算用
- **尺寸**: 1位小数，单位cm，包装规格
- **有效期**: 整数天数，质量控制

#### 销售设置
- **起订量**: 最小订购数量，整数，默认1
- **限购量**: 最大购买限制，整数，0表示不限
- **评分**: 用户评价，0-5分，1位小数，只读

### 🔧 技术实现要点

#### 数值验证
\`\`\`typescript
// 价格验证：必填 + 最小值 + 精度
[ckRequired]="true" [ckMin]="0.01" [precision]="2"

// 库存验证：必填 + 非负整数
[ckRequired]="true" [ckMin]="0" [ckInteger]="true"

// 评分验证：范围限制 + 精度
[ckMin]="0" [ckMax]="5" [precision]="1"
\`\`\`

#### 格式化显示
\`\`\`typescript
// 价格格式化
priceFormatter: (value: number) => \`¥\${value.toFixed(2)}\`
priceParser: (value: string) => value.replace('¥', '')

// 百分比格式化
percentageFormatter: (value: number) => \`\${value}%\`
percentageParser: (value: string) => value.replace('%', '')
\`\`\`

#### 业务计算
\`\`\`typescript
// 利润率计算
calculateProfitRate() {
  const costPrice = this.formData.costPrice;
  const salePrice = this.formData.salePrice;
  
  if (costPrice > 0 && salePrice > 0) {
    const profitRate = ((salePrice - costPrice) / costPrice) * 100;
    this.formData.profitRate = Number(profitRate.toFixed(2));
  }
}

// 库存预警检查
checkStockWarning() {
  const current = this.formData.currentStock;
  const min = this.formData.minStock;
  
  if (current <= min) {
    this.showWarning('库存不足，需要补货');
  }
}
\`\`\`

### 💡 最佳实践体现

#### 1. 用户体验优化
- **智能默认值**: 合理的初始值减少用户输入
- **实时计算**: 输入时自动计算相关数值
- **格式化显示**: 友好的数值展示格式
- **验证反馈**: 及时的错误提示和成功反馈

#### 2. 数据完整性保障
- **必填验证**: 关键数据不能为空
- **范围限制**: 业务合理性检查
- **类型验证**: 确保数据类型正确
- **关联验证**: 字段间的逻辑关系检查

#### 3. 界面布局优化
- **分组展示**: 相关字段分组显示
- **栅格布局**: 响应式的列布局
- **提示信息**: 清晰的字段说明
- **操作按钮**: 合理的操作入口

#### 4. 性能优化
- **防抖处理**: 避免频繁的计算操作
- **按需验证**: 只验证变更的字段
- **缓存计算**: 缓存复杂计算结果

### 🔍 扩展应用场景

1. **财务管理**: 收支记录、预算制定、报表统计
2. **项目管理**: 工时记录、成本核算、进度跟踪
3. **电商系统**: 商品管理、订单处理、库存控制
4. **数据分析**: 指标录入、参数设置、结果计算
5. **科学计算**: 实验数据、测量结果、计算参数

这个示例展示了如何在复杂业务场景中系统性地运用数值输入框，既保证了数据的准确性，又提供了良好的用户体验。
`
    }
  }
};