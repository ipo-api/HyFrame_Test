import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HySliderComponent } from './hy-slider.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

const argTypes = unit.createArgTypes('HySliderComponent');

class MockPricingService implements Partial<ModelService> {
  constructor(){
  }
}

export default {
  title: '表单组件/hy-slider（滑动条）',
  component: HySliderComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [TableService, { provide: ModelService, useClass: MockPricingService }]
    }),
  ],
  argTypes,
} as Meta;

// 基础用法
const BasicTemplate: Story<HySliderComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础滑动条用法</h3>
      <p>用于选择数值范围的滑动条控件，支持拖拽操作</p>
      
      <hy-form>
        <hy-gt model="basicSlider">
          <hy-slider title="基础滑动条" model="basic" [min]="0" [max]="100" [defaultValue]="30"></hy-slider>
          <hy-slider title="带步长" model="step" [min]="0" [max]="100" [step]="10" [defaultValue]="50"></hy-slider>
          <hy-slider title="只读模式" model="readonly" [min]="0" [max]="100" [defaultValue]="70" [readonly]="true"></hy-slider>
          <hy-slider title="禁用状态" model="disabled" [min]="0" [max]="100" [defaultValue]="80" [disabled]="true"></hy-slider>
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

滑动条是用于选择数值范围的交互控件，通过拖拽滑块来设置数值。

### 🎯 主要特性

#### 数值选择
- 通过拖拽滑块选择数值
- 支持键盘方向键操作
- 点击轨道快速定位

#### 范围控制
- **min/max**: 设置数值范围
- **step**: 设置步长间隔
- **defaultValue**: 设置默认值

#### 状态控制
- **只读模式**: 显示数值但不可操作
- **禁用状态**: 完全禁用交互
- **实时反馈**: 拖拽过程中实时显示数值

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| model | 绑定的模型字段 | string | - |
| title | 标签文字 | string | - |
| min | 最小值 | number | 0 |
| max | 最大值 | number | 100 |
| step | 步长 | number | 1 |
| defaultValue | 默认值 | number | 0 |
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
  <hy-gt model="basicSlider">
    <!-- 基础滑动条 -->
    <hy-slider title="基础滑动条" model="basic" 
               [min]="0" [max]="100" 
               [defaultValue]="30"></hy-slider>
    
    <!-- 带步长的滑动条 -->
    <hy-slider title="带步长" model="step" 
               [min]="0" [max]="100" [step]="10" 
               [defaultValue]="50"></hy-slider>
    
    <!-- 只读模式 -->
    <hy-slider title="只读模式" model="readonly" 
               [min]="0" [max]="100" 
               [defaultValue]="70" 
               [readonly]="true"></hy-slider>
    
    <!-- 禁用状态 -->
    <hy-slider title="禁用状态" model="disabled" 
               [min]="0" [max]="100" 
               [defaultValue]="80" 
               [disabled]="true"></hy-slider>
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
  selector: 'app-slider-demo',
  templateUrl: './slider-demo.component.html'
})
export class SliderDemoComponent {
  // 表单数据
  formData = {
    basic: 30,
    step: 50,
    readonly: 70,
    disabled: 80
  };

  onSliderChange(value: number, field: string) {
    console.log(\`\${field} 值变更为：\`, value);
    this.formData[field] = value;
  }

  // 格式化滑块提示
  formatTooltip(value: number): string {
    return \`\${value}%\`;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 刻度标记和范围配置
const MarksTemplate: Story<HySliderComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>刻度标记</h4>
        <p>在滑动条上显示刻度标记，提供可视化的数值参考</p>
        <hy-form>
          <hy-gt model="marksSlider">
            <hy-slider title="百分比刻度" model="percentage" 
                       [min]="0" [max]="100" 
                       [marks]="percentageMarks" 
                       [defaultValue]="25"></hy-slider>
                       
            <hy-slider title="评分刻度" model="rating" 
                       [min]="0" [max]="5" 
                       [step]="0.5" 
                       [marks]="ratingMarks" 
                       [defaultValue]="3.5"></hy-slider>
                       
            <hy-slider title="温度刻度" model="temperature" 
                       [min]="-10" [max]="40" 
                       [marks]="temperatureMarks" 
                       [defaultValue]="25"></hy-slider>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>数值范围配置</h4>
        <p>不同的数值范围和步长设置</p>
        <hy-form>
          <hy-gt model="rangeSlider">
            <hy-slider title="小范围精确" model="precise" 
                       [min]="0" [max]="10" 
                       [step]="0.1" 
                       [defaultValue]="5.5"></hy-slider>
                       
            <hy-slider title="大范围粗调" model="coarse" 
                       [min]="0" [max]="1000" 
                       [step]="50" 
                       [defaultValue]="500"></hy-slider>
                       
            <hy-slider title="负数范围" model="negative" 
                       [min]="-100" [max]="100" 
                       [step]="10" 
                       [defaultValue]="-20"></hy-slider>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>自定义格式化</h4>
        <p>自定义滑块提示的显示格式</p>
        <hy-form>
          <hy-gt model="formatSlider">
            <hy-slider title="货币格式" model="price" 
                       [min]="0" [max]="10000" 
                       [step]="100" 
                       [defaultValue]="2500"
                       [tipFormatter]="priceFormatter"></hy-slider>
                       
            <hy-slider title="时间格式" model="time" 
                       [min]="0" [max]="24" 
                       [step]="0.5" 
                       [defaultValue]="8.5"
                       [tipFormatter]="timeFormatter"></hy-slider>
                       
            <hy-slider title="文件大小" model="fileSize" 
                       [min]="0" [max]="1024" 
                       [step]="64" 
                       [defaultValue]="512"
                       [tipFormatter]="sizeFormatter"></hy-slider>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const marks = MarksTemplate.bind({});
marks.args = {
  // 百分比刻度
  percentageMarks: {
    0: '0%',
    25: '25%',
    50: '50%',
    75: '75%',
    100: '100%'
  },
  
  // 评分刻度
  ratingMarks: {
    0: '很差',
    1: '差',
    2: '一般',
    3: '好',
    4: '很好',
    5: '优秀'
  },
  
  // 温度刻度
  temperatureMarks: {
    '-10': '-10°C',
    0: '0°C',
    20: '20°C',
    40: '40°C'
  },
  
  // 格式化函数
  priceFormatter: (value: number) => `¥${value}`,
  timeFormatter: (value: number) => `${value}小时`,
  sizeFormatter: (value: number) => `${value}MB`
};
marks.storyName = '刻度标记和范围配置';
marks.parameters = {
  docs: {
    description: {
      story: `
## 刻度标记和范围配置

通过刻度标记和范围配置，可以为滑动条提供更好的可视化和用户体验。

### 📏 刻度标记

#### marks 配置
- **对象格式**: { 数值: '标签' }
- **显示位置**: 在滑动条轨道下方显示
- **交互功能**: 点击刻度快速定位

#### 应用场景
- **百分比**: 0%, 25%, 50%, 75%, 100%
- **评分系统**: 很差, 差, 一般, 好, 优秀
- **温度控制**: -10°C, 0°C, 20°C, 40°C
- **时间设置**: 上午, 中午, 下午, 晚上

### 🎯 数值范围配置

#### 范围类型
- **小范围精确**: 0-10, 步长0.1，适合精确调整
- **大范围粗调**: 0-1000, 步长50，适合粗略设置
- **负数范围**: -100到100，支持负数场景

#### 步长设置原则
- **精确控制**: step=0.1, 0.01 适合精密调整
- **常规控制**: step=1, 5, 10 适合一般使用
- **快速控制**: step=50, 100 适合快速设置

### 🎨 自定义格式化

#### tipFormatter 函数
- **货币格式**: value => \`¥\${value}\`
- **时间格式**: value => \`\${value}小时\`
- **文件大小**: value => \`\${value}MB\`
- **百分比**: value => \`\${value}%\`

### 刻度和范围配置
| 属性 | 说明 | 类型 | 示例 |
|------|------|------|------|
| marks | 刻度标记 | object | { 0: '0%', 50: '50%' } |
| min | 最小值 | number | 0 |
| max | 最大值 | number | 100 |
| step | 步长 | number | 1 |
| tipFormatter | 提示格式化 | function | value => \`\${value}%\` |

### 💡 设计建议

1. **刻度间距**: 保持刻度标签之间有足够间距，避免重叠
2. **语义化标签**: 使用有意义的文字而非纯数字
3. **格式一致**: 同类型数值使用统一的格式化规则
4. **交互反馈**: 提供清晰的视觉和数值反馈
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="marksSlider">
    <!-- 百分比刻度 -->
    <hy-slider title="百分比刻度" model="percentage" 
               [min]="0" [max]="100" 
               [marks]="percentageMarks" 
               [defaultValue]="25"></hy-slider>
    
    <!-- 评分刻度 -->
    <hy-slider title="评分刻度" model="rating" 
               [min]="0" [max]="5" [step]="0.5" 
               [marks]="ratingMarks" 
               [defaultValue]="3.5"></hy-slider>
    
    <!-- 自定义格式化 -->
    <hy-slider title="货币格式" model="price" 
               [min]="0" [max]="10000" [step]="100" 
               [defaultValue]="2500"
               [tipFormatter]="priceFormatter"></hy-slider>
    
    <!-- 负数范围 -->
    <hy-slider title="负数范围" model="negative" 
               [min]="-100" [max]="100" [step]="10" 
               [defaultValue]="-20"></hy-slider>
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
  selector: 'app-slider-marks-demo',
  templateUrl: './slider-marks-demo.component.html'
})
export class SliderMarksDemoComponent {
  // 表单数据
  formData = {
    percentage: 25,
    rating: 3.5,
    temperature: 25,
    price: 2500,
    time: 8.5
  };

  // 刻度标记配置
  percentageMarks = {
    0: '0%',
    25: '25%',
    50: '50%',
    75: '75%',
    100: '100%'
  };

  ratingMarks = {
    0: '很差',
    1: '差', 
    2: '一般',
    3: '好',
    4: '很好',
    5: '优秀'
  };

  temperatureMarks = {
    '-10': '-10°C',
    0: '0°C',
    20: '20°C',
    40: '40°C'
  };

  // 格式化函数
  priceFormatter = (value: number): string => {
    return \`¥\${value.toLocaleString()}\`;
  };

  timeFormatter = (value: number): string => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    return \`\${hours}:\${minutes.toString().padStart(2, '0')}\`;
  };

  sizeFormatter = (value: number): string => {
    if (value >= 1024) {
      return \`\${(value / 1024).toFixed(1)}GB\`;
    }
    return \`\${value}MB\`;
  };

  // 滑块值变化处理
  onSliderChange(value: number, field: string) {
    this.formData[field] = value;
    console.log(\`\${field} 变更为：\`, value);
    
    // 根据不同字段类型处理
    switch(field) {
      case 'rating':
        this.handleRatingChange(value);
        break;
      case 'temperature':
        this.handleTemperatureChange(value);
        break;
      case 'price':
        this.handlePriceChange(value);
        break;
    }
  }

  // 评分变化处理
  handleRatingChange(rating: number) {
    if (rating >= 4) {
      console.log('高评分，表现优秀！');
    } else if (rating <= 2) {
      console.log('评分较低，需要改进');
    }
  }

  // 温度变化处理
  handleTemperatureChange(temp: number) {
    if (temp < 0) {
      console.log('温度过低，注意保暖');
    } else if (temp > 35) {
      console.log('温度过高，注意防暑');
    }
  }

  // 价格变化处理
  handlePriceChange(price: number) {
    console.log(\`当前价格：\${this.priceFormatter(price)}\`);
  }

  // 动态生成刻度
  generateMarks(min: number, max: number, count: number = 5) {
    const marks = {};
    const step = (max - min) / (count - 1);
    
    for (let i = 0; i < count; i++) {
      const value = Math.round(min + step * i);
      marks[value] = \`\${value}\`;
    }
    
    return marks;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 双向滑块
const RangeTemplate: Story<HySliderComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>双向范围选择</h4>
        <p>使用双滑块选择数值范围，适合价格区间、时间段等场景</p>
        <hy-form>
          <hy-gt model="rangeSlider">
            <hy-slider title="价格区间" model="priceRange" 
                       [range]="true" 
                       [min]="0" [max]="10000" 
                       [step]="100" 
                       [defaultValue]="[2000, 6000]"
                       [tipFormatter]="priceRangeFormatter"></hy-slider>
                       
            <hy-slider title="年龄范围" model="ageRange" 
                       [range]="true" 
                       [min]="0" [max]="100" 
                       [step]="1" 
                       [defaultValue]="[25, 65]"
                       [marks]="ageMarks"></hy-slider>
                       
            <hy-slider title="时间段" model="timeRange" 
                       [range]="true" 
                       [min]="0" [max]="24" 
                       [step]="0.5" 
                       [defaultValue]="[9, 18]"
                       [tipFormatter]="timeRangeFormatter"></hy-slider>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>范围限制</h4>
        <p>设置范围选择的最小间距和交互限制</p>
        <hy-form>
          <hy-gt model="constrainedRange">
            <hy-slider title="最小间距10" model="minGap" 
                       [range]="true" 
                       [min]="0" [max]="100" 
                       [minGap]="10" 
                       [defaultValue]="[30, 70]"></hy-slider>
                       
            <hy-slider title="禁用交叉" model="noCross" 
                       [range]="true" 
                       [min]="0" [max]="100" 
                       [allowCross]="false" 
                       [defaultValue]="[20, 80]"></hy-slider>
                       
            <hy-slider title="步长对齐" model="stepRange" 
                       [range]="true" 
                       [min]="0" [max]="100" 
                       [step]="5" 
                       [defaultValue]="[25, 75]"
                       [marks]="stepMarks"></hy-slider>
          </hy-gt>
        </hy-form>
      </div>
    </div>
  `
});

export const range = RangeTemplate.bind({});
range.args = {
  // 年龄刻度
  ageMarks: {
    0: '婴儿',
    18: '成年',
    65: '退休',
    100: '百岁'
  },
  
  // 步长刻度
  stepMarks: {
    0: '0',
    25: '25',
    50: '50',
    75: '75',
    100: '100'
  },
  
  // 格式化函数
  priceRangeFormatter: (value: number) => `¥${value}`,
  timeRangeFormatter: (value: number) => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }
};
range.storyName = '双向滑块';
range.parameters = {
  docs: {
    description: {
      story: `
## 双向滑块

双向滑块允许用户选择一个数值范围，通过两个滑块控制上限和下限。

### 🔄 双向范围选择

#### 基本配置
- **range**: 设置为true启用双向模式
- **defaultValue**: 使用数组[min, max]设置初始范围
- **tipFormatter**: 统一格式化两个滑块的提示

#### 应用场景
- **价格筛选**: 设置商品价格区间
- **年龄范围**: 选择目标用户年龄段
- **时间段**: 设置工作时间或营业时间
- **分数区间**: 设置成绩或评分范围

### ⚙️ 范围约束

#### 最小间距控制
- **minGap**: 设置两个滑块的最小间距
- **用途**: 确保选择的范围有意义
- **示例**: 价格区间至少相差100元

#### 交叉控制
- **allowCross**: 控制滑块是否可以交叉
- **false**: 左滑块不能超过右滑块
- **true**: 滑块可以交叉，自动交换角色

#### 步长对齐
- **step**: 两个滑块都按设定步长移动
- **marks**: 显示对齐的刻度标记
- **好处**: 确保选择值的规整性

### 双向滑块配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| range | 启用双向模式 | boolean | false |
| defaultValue | 初始范围 | [number, number] | [0, 0] |
| minGap | 最小间距 | number | 0 |
| allowCross | 允许交叉 | boolean | true |
| tipFormatter | 提示格式化 | function | - |

### 💡 交互设计

#### 视觉反馈
- **选中区域**: 高亮显示选择的范围
- **滑块样式**: 区分左右滑块的视觉样式
- **提示显示**: 实时显示当前选择的数值

#### 操作体验
- **拖拽顺滑**: 滑块移动流畅，无卡顿
- **精确定位**: 支持点击轨道精确定位
- **键盘支持**: 方向键微调数值

### 🔧 实现技巧

#### 数据绑定
\`\`\`typescript
// 组件中处理范围数据
onRangeChange(range: [number, number]) {
  const [min, max] = range;
  console.log(\`选择范围：\${min} - \${max}\`);
}
\`\`\`

#### 范围验证
\`\`\`typescript
// 验证范围的合理性
validateRange(range: [number, number]): boolean {
  const [min, max] = range;
  return max > min && (max - min) >= this.minGap;
}
\`\`\`

### ⚠️ 注意事项

1. **初始值**: defaultValue必须是长度为2的数组
2. **最小间距**: 合理设置minGap避免无效范围
3. **格式化**: tipFormatter会应用到两个滑块
4. **数据结构**: 组件返回的值始终是数组格式
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="rangeSlider">
    <!-- 价格区间双向滑块 -->
    <hy-slider title="价格区间" model="priceRange" 
               [range]="true" 
               [min]="0" [max]="10000" [step]="100"
               [defaultValue]="[2000, 6000]"
               [tipFormatter]="priceRangeFormatter"></hy-slider>
    
    <!-- 年龄范围带刻度 -->
    <hy-slider title="年龄范围" model="ageRange" 
               [range]="true" 
               [min]="0" [max]="100" [step]="1"
               [defaultValue]="[25, 65]"
               [marks]="ageMarks"></hy-slider>
    
    <!-- 带最小间距限制 -->
    <hy-slider title="最小间距10" model="minGap" 
               [range]="true" 
               [min]="0" [max]="100" 
               [minGap]="10" 
               [defaultValue]="[30, 70]"></hy-slider>
    
    <!-- 禁用交叉 -->
    <hy-slider title="禁用交叉" model="noCross" 
               [range]="true" 
               [min]="0" [max]="100" 
               [allowCross]="false" 
               [defaultValue]="[20, 80]"></hy-slider>
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
  selector: 'app-range-slider-demo',
  templateUrl: './range-slider-demo.component.html'
})
export class RangeSliderDemoComponent {
  // 表单数据
  formData = {
    priceRange: [2000, 6000],
    ageRange: [25, 65],
    timeRange: [9, 18],
    minGap: [30, 70]
  };

  // 刻度配置
  ageMarks = {
    0: '婴儿',
    18: '成年', 
    65: '退休',
    100: '百岁'
  };

  stepMarks = {
    0: '0',
    25: '25',
    50: '50',
    75: '75',
    100: '100'
  };

  // 格式化函数
  priceRangeFormatter = (value: number): string => {
    return \`¥\${value.toLocaleString()}\`;
  };

  timeRangeFormatter = (value: number): string => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    return \`\${hours}:\${minutes.toString().padStart(2, '0')}\`;
  };

  // 范围变化处理
  onRangeChange(range: [number, number], field: string) {
    this.formData[field] = range;
    const [min, max] = range;
    console.log(\`\${field} 范围变更为：\${min} - \${max}\`);
    
    // 根据不同字段处理
    switch(field) {
      case 'priceRange':
        this.handlePriceRangeChange(range);
        break;
      case 'ageRange':
        this.handleAgeRangeChange(range);
        break;
      case 'timeRange':
        this.handleTimeRangeChange(range);
        break;
    }
  }

  // 价格范围变化处理
  handlePriceRangeChange([min, max]: [number, number]) {
    const range = max - min;
    console.log(\`价格范围跨度：¥\${range}\`);
    
    if (range > 5000) {
      console.log('价格范围较大，建议细化筛选条件');
    }
  }

  // 年龄范围变化处理
  handleAgeRangeChange([min, max]: [number, number]) {
    console.log(\`目标年龄段：\${min}-\${max}岁\`);
    
    if (min < 18) {
      console.log('包含未成年用户');
    }
    if (max > 65) {
      console.log('包含老年用户');
    }
  }

  // 时间范围变化处理
  handleTimeRangeChange([start, end]: [number, number]) {
    const duration = end - start;
    console.log(\`工作时长：\${duration}小时\`);
    
    if (duration > 10) {
      console.log('工作时间较长，注意劳逸结合');
    }
  }

  // 验证范围合理性
  validateRange(range: [number, number], minGap: number = 0): boolean {
    const [min, max] = range;
    return max > min && (max - min) >= minGap;
  }

  // 格式化范围显示
  formatRange(range: [number, number], formatter?: (value: number) => string): string {
    const [min, max] = range;
    if (formatter) {
      return \`\${formatter(min)} - \${formatter(max)}\`;
    }
    return \`\${min} - \${max}\`;
  }

  // 计算范围统计
  getRangeStats(range: [number, number]) {
    const [min, max] = range;
    return {
      min,
      max,
      span: max - min,
      center: (min + max) / 2,
      ratio: min / max
    };
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 表单验证
const ValidationTemplate: Story<HySliderComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>基础验证</h4>
        <p>滑动条的表单验证功能</p>
        <hy-form>
          <hy-gt model="validationSlider">
            <hy-slider title="必填滑动条" model="required" 
                       [ckRequired]="true" 
                       [min]="0" [max]="100" 
                       placeholder="请选择数值"></hy-slider>
                       
            <hy-slider title="最小值验证" model="minValue" 
                       [ckRequired]="true" 
                       [ckMin]="20" 
                       [min]="0" [max]="100" 
                       [defaultValue]="10"></hy-slider>
                       
            <hy-slider title="最大值验证" model="maxValue" 
                       [ckRequired]="true" 
                       [ckMax]="80" 
                       [min]="0" [max]="100" 
                       [defaultValue]="90"></hy-slider>
                       
            <hy-slider title="范围验证" model="rangeValue" 
                       [ckRequired]="true" 
                       [ckMin]="30" 
                       [ckMax]="70" 
                       [min]="0" [max]="100" 
                       [defaultValue]="50"></hy-slider>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>自定义验证</h4>
        <p>使用自定义验证规则</p>
        <hy-form>
          <hy-gt model="customValidation">
            <hy-slider title="偶数验证" model="even" 
                       [ckRequired]="true" 
                       [ckCustom]="evenValidator" 
                       [min]="0" [max]="100" 
                       [step]="1" 
                       [defaultValue]="23"></hy-slider>
                       
            <hy-slider title="倍数验证" model="multiple" 
                       [ckRequired]="true" 
                       [ckCustom]="multipleValidator" 
                       [min]="0" [max]="100" 
                       [step]="5" 
                       [defaultValue]="23"></hy-slider>
                       
            <hy-slider title="黄金比例" model="golden" 
                       [ckRequired]="true" 
                       [ckCustom]="goldenRatioValidator" 
                       [min]="0" [max]="100" 
                       [step]="1" 
                       [defaultValue]="62"></hy-slider>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>业务场景验证</h4>
        <p>实际业务中的验证应用</p>
        <hy-form>
          <hy-gt model="businessValidation">
            <hy-slider title="年龄验证" model="age" 
                       [ckRequired]="true" 
                       [ckMin]="18" 
                       [ckMax]="65" 
                       [min]="0" [max]="100"
                       [defaultValue]="25"
                       [marks]="ageValidationMarks"></hy-slider>
                       
            <hy-slider title="评分验证" model="rating" 
                       [ckRequired]="true" 
                       [ckMin]="1" 
                       [ckMax]="5" 
                       [min]="0" [max]="5"
                       [step]="0.5"
                       [defaultValue]="3"
                       [marks]="ratingValidationMarks"></hy-slider>
                       
            <hy-slider title="进度验证" model="progress" 
                       [ckRequired]="true" 
                       [ckMin]="10" 
                       [min]="0" [max]="100"
                       [defaultValue]="5"
                       [tipFormatter]="progressFormatter"></hy-slider>
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
  // 验证器
  evenValidator: (value: any) => {
    if (!value) return null;
    const num = Number(value);
    return num % 2 === 0 ? null : { even: true, message: '请选择偶数' };
  },
  
  multipleValidator: (value: any) => {
    if (!value) return null;
    const num = Number(value);
    return num % 5 === 0 ? null : { multiple: true, message: '请选择5的倍数' };
  },
  
  goldenRatioValidator: (value: any) => {
    if (!value) return null;
    const num = Number(value);
    const golden = Math.abs(num - 61.8);
    return golden <= 2 ? null : { golden: true, message: '请选择接近黄金比例的数值(约62)' };
  },
  
  // 刻度标记
  ageValidationMarks: {
    0: '0岁',
    18: '成年',
    65: '退休',
    100: '100岁'
  },
  
  ratingValidationMarks: {
    0: '最差',
    1: '差',
    2: '一般', 
    3: '好',
    4: '很好',
    5: '优秀'
  },
  
  // 格式化函数
  progressFormatter: (value: number) => `${value}%`,
  
  // 事件处理
  handleSubmit: () => {
    console.log('表单验证通过，开始提交');
    alert('表单验证通过！');
  },
  
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

滑动条与HyFrame表单验证系统集成，提供完整的数值验证功能。

### 🔍 内置验证规则

#### 基础验证
- **ckRequired**: 必填验证，确保用户选择了数值
- **ckMin**: 最小值验证，限制选择的下限
- **ckMax**: 最大值验证，限制选择的上限

#### 验证特点
- **实时验证**: 滑动过程中实时验证
- **视觉反馈**: 错误状态的颜色提示
- **错误信息**: 清晰的验证失败提示

### 🎯 自定义验证

#### 验证器函数
- **参数**: 接收滑动条的当前值
- **返回**: null表示验证通过，对象表示验证失败
- **应用**: 复杂的业务逻辑验证

#### 自定义验证示例

##### 偶数验证
\`\`\`typescript
evenValidator = (value: any) => {
  const num = Number(value);
  return num % 2 === 0 ? null : { 
    even: true, 
    message: '请选择偶数' 
  };
};
\`\`\`

##### 倍数验证
\`\`\`typescript
multipleValidator = (value: any) => {
  const num = Number(value);
  return num % 5 === 0 ? null : { 
    multiple: true, 
    message: '请选择5的倍数' 
  };
};
\`\`\`

##### 黄金比例验证
\`\`\`typescript
goldenRatioValidator = (value: any) => {
  const num = Number(value);
  const golden = Math.abs(num - 61.8);
  return golden <= 2 ? null : { 
    golden: true, 
    message: '请选择接近黄金比例的数值' 
  };
};
\`\`\`

### 💼 业务场景验证

#### 年龄验证
- **目标**: 限制为成年人范围(18-65岁)
- **规则**: 最小值18，最大值65
- **应用**: 招聘、保险等场景

#### 评分验证
- **目标**: 确保评分在有效范围内
- **规则**: 1-5分，支持0.5步长
- **应用**: 用户评价、质量评估

#### 进度验证
- **目标**: 确保项目进度合理
- **规则**: 最小10%（防止0进度）
- **应用**: 项目管理、任务跟踪

### 📋 验证配置

| 属性 | 说明 | 类型 | 示例 |
|------|------|------|------|
| ckRequired | 必填验证 | boolean | true |
| ckMin | 最小值验证 | number | 18 |
| ckMax | 最大值验证 | number | 65 |
| ckCustom | 自定义验证器 | function | evenValidator |

### ⚡ 验证时机

#### 实时验证
- **拖拽时**: 滑动过程中实时检查
- **释放时**: 滑块释放后最终验证
- **提交时**: 表单提交前综合验证

#### 错误处理
- **视觉提示**: 滑动条变为错误颜色
- **文字提示**: 在控件下方显示错误信息
- **阻止提交**: 验证失败时阻止表单提交

### 💡 最佳实践

1. **合理范围**: 设置符合业务逻辑的验证范围
2. **即时反馈**: 提供实时的验证结果反馈
3. **清晰提示**: 错误信息要明确指出问题所在
4. **用户友好**: 避免过于严格的验证影响体验
5. **性能优化**: 复杂验证使用防抖处理

### 🔧 高级技巧

#### 组合验证
\`\`\`typescript
// 组合多个验证条件
combinedValidator = (value: any) => {
  const num = Number(value);
  
  // 范围验证
  if (num < 10 || num > 90) {
    return { range: true, message: '数值必须在10-90之间' };
  }
  
  // 倍数验证
  if (num % 10 !== 0) {
    return { multiple: true, message: '数值必须是10的倍数' };
  }
  
  return null;
};
\`\`\`

#### 动态验证
\`\`\`typescript
// 根据其他字段动态调整验证规则
dynamicValidator = (value: any) => {
  const otherValue = this.formData.otherField;
  const minValue = otherValue * 0.8;
  
  if (Number(value) < minValue) {
    return { 
      dynamic: true, 
      message: \`数值不能小于\${minValue}\` 
    };
  }
  
  return null;
};
\`\`\`
`
    }
  },
  preview: [
    {
      tab: "HTML模板", 
      template: previewTemplate`
<hy-form>
  <hy-gt model="validationSlider">
    <!-- 基础验证 -->
    <hy-slider title="必填滑动条" model="required" 
               [ckRequired]="true" 
               [min]="0" [max]="100"></hy-slider>
               
    <hy-slider title="范围验证" model="rangeValue" 
               [ckRequired]="true" 
               [ckMin]="30" [ckMax]="70" 
               [min]="0" [max]="100" 
               [defaultValue]="50"></hy-slider>
    
    <!-- 自定义验证 -->
    <hy-slider title="偶数验证" model="even" 
               [ckRequired]="true" 
               [ckCustom]="evenValidator" 
               [min]="0" [max]="100" 
               [defaultValue]="23"></hy-slider>
               
    <hy-slider title="倍数验证" model="multiple" 
               [ckRequired]="true" 
               [ckCustom]="multipleValidator" 
               [min]="0" [max]="100" [step]="5"
               [defaultValue]="23"></hy-slider>
    
    <!-- 业务验证 -->
    <hy-slider title="年龄验证" model="age" 
               [ckRequired]="true" 
               [ckMin]="18" [ckMax]="65" 
               [min]="0" [max]="100"
               [defaultValue]="25"
               [marks]="ageValidationMarks"></hy-slider>
               
    <hy-slider title="评分验证" model="rating" 
               [ckRequired]="true" 
               [ckMin]="1" [ckMax]="5" 
               [min]="0" [max]="5" [step]="0.5"
               [defaultValue]="3"
               [marks]="ratingValidationMarks"></hy-slider>
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
  selector: 'app-slider-validation-demo',
  templateUrl: './slider-validation-demo.component.html'
})
export class SliderValidationDemoComponent {
  // 表单数据
  formData = {
    required: null,
    rangeValue: 50,
    even: 23,
    multiple: 23,
    age: 25,
    rating: 3
  };

  // 验证器
  evenValidator = (value: any) => {
    if (!value) return null;
    const num = Number(value);
    return num % 2 === 0 ? null : { 
      even: true, 
      message: '请选择偶数' 
    };
  };

  multipleValidator = (value: any) => {
    if (!value) return null;
    const num = Number(value);
    return num % 5 === 0 ? null : { 
      multiple: true, 
      message: '请选择5的倍数' 
    };
  };

  goldenRatioValidator = (value: any) => {
    if (!value) return null;
    const num = Number(value);
    const golden = Math.abs(num - 61.8);
    return golden <= 2 ? null : { 
      golden: true, 
      message: '请选择接近黄金比例的数值(约62)' 
    };
  };

  // 刻度标记
  ageValidationMarks = {
    0: '0岁',
    18: '成年',
    65: '退休', 
    100: '100岁'
  };

  ratingValidationMarks = {
    0: '最差',
    1: '差',
    2: '一般',
    3: '好', 
    4: '很好',
    5: '优秀'
  };

  // 格式化函数
  progressFormatter = (value: number): string => {
    return \`\${value}%\`;
  };

  // 滑块值变化处理
  onSliderChange(value: number, field: string) {
    this.formData[field] = value;
    console.log(\`\${field} 变更为：\`, value);
    
    // 根据不同字段处理
    switch(field) {
      case 'age':
        this.handleAgeChange(value);
        break;
      case 'rating':
        this.handleRatingChange(value);
        break;
    }
  }

  // 年龄变化处理
  handleAgeChange(age: number) {
    if (age < 18) {
      console.log('年龄不符合要求');
    } else if (age > 65) {
      console.log('年龄超出范围');
    } else {
      console.log('年龄符合要求');
    }
  }

  // 评分变化处理
  handleRatingChange(rating: number) {
    if (rating >= 4) {
      console.log('高评分！');
    } else if (rating <= 2) {
      console.log('评分较低，需要改进');
    }
  }

  // 表单提交
  handleSubmit() {
    console.log('表单数据：', this.formData);
    alert('表单验证通过，数据已提交！');
  }

  // 重置表单
  handleReset() {
    this.formData = {
      required: null,
      rangeValue: 50,
      even: 24,
      multiple: 25,
      age: 25,
      rating: 3
    };
    console.log('表单已重置');
  }

  // 组合验证器
  combinedValidator = (value: any) => {
    const num = Number(value);
    
    // 范围验证
    if (num < 10 || num > 90) {
      return { 
        range: true, 
        message: '数值必须在10-90之间' 
      };
    }
    
    // 倍数验证
    if (num % 10 !== 0) {
      return { 
        multiple: true, 
        message: '数值必须是10的倍数' 
      };
    }
    
    return null;
  };

  // 动态验证器
  dynamicValidator = (value: any) => {
    const otherValue = this.formData.rangeValue || 50;
    const minValue = otherValue * 0.8;
    
    if (Number(value) < minValue) {
      return { 
        dynamic: true, 
        message: \`数值不能小于\${minValue}\` 
      };
    }
    
    return null;
  };
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 尺寸和样式
const SizeTemplate: Story<HySliderComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <h4>组件尺寸</h4>
        <p>不同尺寸的滑动条</p>
        <hy-form>
          <hy-gt model="sizeSlider">
            <hy-slider title="大尺寸" model="large" size="large" 
                       [min]="0" [max]="100" [defaultValue]="30"></hy-slider>
            <hy-slider title="默认尺寸" model="default" 
                       [min]="0" [max]="100" [defaultValue]="50"></hy-slider>
            <hy-slider title="小尺寸" model="small" size="small" 
                       [min]="0" [max]="100" [defaultValue]="70"></hy-slider>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>栅格布局</h4>
        <p>通过cols属性控制滑动条宽度</p>
        <hy-form>
          <hy-gt model="colsSlider">
            <hy-slider title="12列宽度" model="col12" [cols]="12" 
                       [min]="0" [max]="100" [defaultValue]="30"></hy-slider>
            <hy-slider title="18列宽度" model="col18" [cols]="18" 
                       [min]="0" [max]="100" [defaultValue]="50"></hy-slider>
            <hy-slider title="24列宽度" model="col24" [cols]="24" 
                       [min]="0" [max]="100" [defaultValue]="70"></hy-slider>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>标签配置</h4>
        <p>标签宽度和布局设置</p>
        <hy-form>
          <hy-gt model="labelSlider">
            <hy-slider title="默认标签" model="defaultLabel" 
                       [min]="0" [max]="100" [defaultValue]="30"></hy-slider>
            <hy-slider title="自定义标签宽度" model="customWidth" [labelWidth]="'120px'" 
                       [min]="0" [max]="100" [defaultValue]="50"></hy-slider>
            <hy-slider title="无冒号标签" model="noColon" [noColon]="true" 
                       [min]="0" [max]="100" [defaultValue]="70"></hy-slider>
            <hy-slider title="无标签模式" model="noLabel" [noLabel]="true" 
                       [min]="0" [max]="100" [defaultValue]="90" placeholder="无标签滑动条"></hy-slider>
          </hy-gt>
        </hy-form>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>提示信息</h4>
        <p>不同类型的提示信息显示</p>
        <hy-form>
          <hy-gt model="tipSlider">
            <hy-slider title="右侧提示" model="rightTip" [tip]="'拖拽滑块选择数值'" 
                       [min]="0" [max]="100" [defaultValue]="30"></hy-slider>
            <hy-slider title="底部提示" model="bottomTip" [tip]="'支持键盘方向键调节'" tipType="bottomTip" 
                       [min]="0" [max]="100" [defaultValue]="50"></hy-slider>
            <hy-slider title="模板提示" model="templateTip" [tip]="tipTemplate" 
                       [min]="0" [max]="100" [defaultValue]="70"></hy-slider>
          </hy-gt>
        </hy-form>
        
        <ng-template #tipTemplate>
          <div style="color: #1890ff;">
            <div>💡 操作提示：</div>
            <div>• 拖拽滑块调整数值</div>
            <div>• 点击轨道快速定位</div>
            <div>• 方向键精确调节</div>
          </div>
        </ng-template>
      </div>
      
      <div class="demo-section" style="margin-top: 30px;">
        <h4>主题样式</h4>
        <p>不同主题风格的滑动条</p>
        <hy-form>
          <hy-gt model="themeSlider">
            <hy-slider title="默认主题" model="default" 
                       [min]="0" [max]="100" [defaultValue]="25"></hy-slider>
            <hy-slider title="成功主题" model="success" theme="success" 
                       [min]="0" [max]="100" [defaultValue]="50"></hy-slider>
            <hy-slider title="警告主题" model="warning" theme="warning" 
                       [min]="0" [max]="100" [defaultValue]="75"></hy-slider>
            <hy-slider title="危险主题" model="danger" theme="danger" 
                       [min]="0" [max]="100" [defaultValue]="90"></hy-slider>
          </hy-gt>
        </hy-form>
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

滑动条支持多种尺寸和样式配置，适应不同的界面需求。

### 📏 组件尺寸

#### 三种预设尺寸
- **large**: 大尺寸，轨道高度8px，滑块尺寸20px
- **default**: 默认尺寸，轨道高度6px，滑块尺寸16px
- **small**: 小尺寸，轨道高度4px，滑块尺寸12px

#### 使用场景
- **大尺寸**: 重要数值设置、主要控制面板
- **默认尺寸**: 普通表单、常规数值调节
- **小尺寸**: 紧凑布局、次要参数调节

### 📐 栅格布局

#### 24栅格系统
- **cols**: 设置滑动条占用的栅格列数
- **响应式**: 支持不同屏幕尺寸的布局适配
- **灵活配置**: 1-24列任意设置

#### 常用配置
- **12列**: 占用一半宽度，适合并排布局
- **18列**: 占用3/4宽度，适合重要参数
- **24列**: 占用全宽，适合主要控制滑块

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
- **右侧提示**: 在滑动条右侧显示
- **底部提示**: 在滑动条下方显示
- **模板提示**: 支持复杂HTML模板

#### 提示用途
- **操作指导**: 说明滑动条的使用方法
- **数值说明**: 解释数值的含义和单位
- **快捷键**: 提供键盘操作提示

### 🎨 主题样式

#### 预设主题
- **default**: 默认蓝色主题
- **success**: 绿色成功主题
- **warning**: 橙色警告主题
- **danger**: 红色危险主题

#### 主题应用
- **进度显示**: 根据进度状态使用不同主题
- **状态指示**: 用颜色表示数值的健康度
- **分类标识**: 不同类别使用不同主题

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
| theme | 主题样式 | string | 'default'\\|'success'\\|'warning'\\|'danger' |

### 💡 设计建议

#### 一致性原则
1. **同一表单保持统一尺寸**
2. **标签宽度统一对齐**
3. **主题使用要有明确语义**

#### 可访问性
1. **合理的滑块尺寸便于操作**
2. **清晰的提示信息**
3. **足够的颜色对比度**

#### 响应式设计
1. **不同屏幕尺寸适配**
2. **移动端触摸友好**
3. **栅格布局弹性调整**

### 🔧 自定义样式

#### CSS变量定制
\`\`\`css
.custom-slider {
  --slider-track-color: #f0f0f0;
  --slider-track-active-color: #1890ff;
  --slider-handle-color: #ffffff;
  --slider-handle-border-color: #1890ff;
}
\`\`\`

#### 动态主题切换
\`\`\`typescript
// 根据数值动态设置主题
getThemeByValue(value: number): string {
  if (value < 30) return 'danger';
  if (value < 60) return 'warning';
  if (value < 90) return 'success';
  return 'default';
}
\`\`\`
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<hy-form>
  <hy-gt model="sizeSlider">
    <!-- 组件尺寸 -->
    <hy-slider title="大尺寸" model="large" 
               size="large" 
               [min]="0" [max]="100" 
               [defaultValue]="30"></hy-slider>
               
    <hy-slider title="默认尺寸" model="default" 
               [min]="0" [max]="100" 
               [defaultValue]="50"></hy-slider>
               
    <hy-slider title="小尺寸" model="small" 
               size="small" 
               [min]="0" [max]="100" 
               [defaultValue]="70"></hy-slider>
    
    <!-- 栅格布局 -->
    <hy-slider title="12列宽度" model="col12" 
               [cols]="12" 
               [min]="0" [max]="100" 
               [defaultValue]="30"></hy-slider>
               
    <hy-slider title="24列宽度" model="col24" 
               [cols]="24" 
               [min]="0" [max]="100" 
               [defaultValue]="70"></hy-slider>
    
    <!-- 标签配置 -->
    <hy-slider title="自定义标签宽度" model="customWidth" 
               [labelWidth]="'120px'" 
               [min]="0" [max]="100" 
               [defaultValue]="50"></hy-slider>
               
    <hy-slider title="无冒号标签" model="noColon" 
               [noColon]="true" 
               [min]="0" [max]="100" 
               [defaultValue]="70"></hy-slider>
               
    <hy-slider title="无标签模式" model="noLabel" 
               [noLabel]="true" 
               [min]="0" [max]="100" 
               [defaultValue]="90"></hy-slider>
    
    <!-- 提示信息 -->
    <hy-slider title="右侧提示" model="rightTip" 
               [tip]="'拖拽滑块选择数值'" 
               [min]="0" [max]="100" 
               [defaultValue]="30"></hy-slider>
               
    <hy-slider title="底部提示" model="bottomTip" 
               [tip]="'支持键盘方向键调节'" 
               tipType="bottomTip" 
               [min]="0" [max]="100" 
               [defaultValue]="50"></hy-slider>
    
    <!-- 主题样式 -->
    <hy-slider title="成功主题" model="success" 
               theme="success" 
               [min]="0" [max]="100" 
               [defaultValue]="50"></hy-slider>
               
    <hy-slider title="警告主题" model="warning" 
               theme="warning" 
               [min]="0" [max]="100" 
               [defaultValue]="75"></hy-slider>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    }
  ]
};

// 综合应用示例
const CompleteTemplate: Story<HySliderComponent> = (args: any) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>🎛️ 音频设备控制面板</h3>
      <p>完整的音频设备控制示例，展示滑动条在实际应用中的综合运用</p>
      
      <div class="demo-case" style="border: 1px solid #f0f0f0; border-radius: 8px; padding: 20px; background: white;">
        <hy-form>
          <hy-gt model="audioControl">
            <!-- 主音量控制 -->
            <div style="margin-bottom: 24px;">
              <h4 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">🔊 主音量控制</h4>
              <hy-slider title="主音量" model="masterVolume" 
                         [min]="0" [max]="100" 
                         [defaultValue]="75"
                         [marks]="volumeMarks"
                         [tipFormatter]="volumeFormatter"
                         theme="success"
                         [cols]="24"></hy-slider>
                         
              <hy-slider title="低音增强" model="bassBoost" 
                         [min]="-10" [max]="10" 
                         [step]="1"
                         [defaultValue]="0"
                         [marks]="bassMarks"
                         [tipFormatter]="dbFormatter"
                         [cols]="12"></hy-slider>
                         
              <hy-slider title="高音增强" model="trebleBoost" 
                         [min]="-10" [max]="10" 
                         [step]="1"
                         [defaultValue]="0"
                         [marks]="trebleMarks"
                         [tipFormatter]="dbFormatter"
                         [cols]="12"></hy-slider>
            </div>
            
            <!-- 音效设置 -->
            <div style="margin-bottom: 24px;">
              <h4 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">🎵 音效设置</h4>
              <hy-slider title="混响强度" model="reverb" 
                         [min]="0" [max]="100" 
                         [defaultValue]="20"
                         [marks]="effectMarks"
                         [tipFormatter]="percentFormatter"
                         [cols]="8"></hy-slider>
                         
              <hy-slider title="合唱效果" model="chorus" 
                         [min]="0" [max]="100" 
                         [defaultValue]="15"
                         [marks]="effectMarks"
                         [tipFormatter]="percentFormatter"
                         [cols]="8"></hy-slider>
                         
              <hy-slider title="延迟时间" model="delay" 
                         [min]="0" [max]="1000" 
                         [step]="10"
                         [defaultValue]="100"
                         [tipFormatter]="delayFormatter"
                         [cols]="8"></hy-slider>
            </div>
            
            <!-- 立体声设置 -->
            <div style="margin-bottom: 24px;">
              <h4 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">🎧 立体声设置</h4>
              <hy-slider title="左右平衡" model="balance" 
                         [min]="-100" [max]="100" 
                         [step]="5"
                         [defaultValue]="0"
                         [marks]="balanceMarks"
                         [tipFormatter]="balanceFormatter"
                         [cols]="24"></hy-slider>
                         
              <hy-slider title="立体声宽度" model="stereoWidth" 
                         [min]="0" [max]="200" 
                         [step]="5"
                         [defaultValue]="100"
                         [marks]="widthMarks"
                         [tipFormatter]="percentFormatter"
                         [cols]="24"></hy-slider>
            </div>
            
            <!-- 音量分布 -->
            <div style="margin-bottom: 24px;">
              <h4 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">📊 音量分布</h4>
              <hy-slider title="人声音量" model="vocal" 
                         [min]="0" [max]="100" 
                         [defaultValue]="80"
                         [tipFormatter]="volumeFormatter"
                         theme="success"
                         [cols]="8"></hy-slider>
                         
              <hy-slider title="背景音乐" model="bgMusic" 
                         [min]="0" [max]="100" 
                         [defaultValue]="60"
                         [tipFormatter]="volumeFormatter"
                         theme="default"
                         [cols]="8"></hy-slider>
                         
              <hy-slider title="音效音量" model="sfx" 
                         [min]="0" [max]="100" 
                         [defaultValue]="40"
                         [tipFormatter]="volumeFormatter"
                         theme="warning"
                         [cols]="8"></hy-slider>
            </div>
            
            <!-- 频率响应 -->
            <div style="margin-bottom: 24px;">
              <h4 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">📈 频率响应 (EQ)</h4>
              <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px;">
                <div style="text-align: center;">
                  <div style="font-size: 12px; margin-bottom: 8px;">60Hz</div>
                  <hy-slider model="eq60" [noLabel]="true" 
                             [min]="-12" [max]="12" [step]="1"
                             [defaultValue]="-2"
                             [tipFormatter]="dbFormatter"
                             size="small"
                             [cols]="24"></hy-slider>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 12px; margin-bottom: 8px;">170Hz</div>
                  <hy-slider model="eq170" [noLabel]="true" 
                             [min]="-12" [max]="12" [step]="1"
                             [defaultValue]="1"
                             [tipFormatter]="dbFormatter"
                             size="small"
                             [cols]="24"></hy-slider>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 12px; margin-bottom: 8px;">310Hz</div>
                  <hy-slider model="eq310" [noLabel]="true" 
                             [min]="-12" [max]="12" [step]="1"
                             [defaultValue]="0"
                             [tipFormatter]="dbFormatter"
                             size="small"
                             [cols]="24"></hy-slider>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 12px; margin-bottom: 8px;">600Hz</div>
                  <hy-slider model="eq600" [noLabel]="true" 
                             [min]="-12" [max]="12" [step]="1"
                             [defaultValue]="2"
                             [tipFormatter]="dbFormatter"
                             size="small"
                             [cols]="24"></hy-slider>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 12px; margin-bottom: 8px;">1kHz</div>
                  <hy-slider model="eq1k" [noLabel]="true" 
                             [min]="-12" [max]="12" [step]="1"
                             [defaultValue]="3"
                             [tipFormatter]="dbFormatter"
                             size="small"
                             [cols]="24"></hy-slider>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 12px; margin-bottom: 8px;">3kHz</div>  
                  <hy-slider model="eq3k" [noLabel]="true" 
                             [min]="-12" [max]="12" [step]="1"
                             [defaultValue]="1"
                             [tipFormatter]="dbFormatter"
                             size="small"
                             [cols]="24"></hy-slider>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 12px; margin-bottom: 8px;">6kHz</div>
                  <hy-slider model="eq6k" [noLabel]="true" 
                             [min]="-12" [max]="12" [step]="1"
                             [defaultValue]="-1"
                             [tipFormatter]="dbFormatter"
                             size="small"
                             [cols]="24"></hy-slider>
                </div>
              </div>
            </div>
            
            <!-- 控制按钮 -->
            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #f0f0f0;">
              <hy-button title="保存预设" type="primary" [check]="false" (onClick)="savePreset()"></hy-button>
              <hy-button title="加载预设" [check]="false" (onClick)="loadPreset()"></hy-button>
              <hy-button title="重置所有" [check]="false" (onClick)="resetAll()"></hy-button>
              <hy-button title="静音/取消静音" [check]="false" (onClick)="toggleMute()"></hy-button>
            </div>
          </hy-gt>
        </hy-form>
        
        <!-- 实时显示面板 -->
        <div style="margin-top: 20px;">
          <h5>📊 实时状态监控</h5>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
            <div style="padding: 12px; background: #f6ffed; border-left: 4px solid #52c41a; border-radius: 4px;">
              <div style="font-size: 12px; color: #666;">主音量</div>
              <div style="font-size: 18px; font-weight: bold; color: #52c41a;">{{masterVolumeDisplay}}</div>
            </div>
            <div style="padding: 12px; background: #e6f7ff; border-left: 4px solid #1890ff; border-radius: 4px;">
              <div style="font-size: 12px; color: #666;">左右平衡</div>
              <div style="font-size: 18px; font-weight: bold; color: #1890ff;">{{balanceDisplay}}</div>
            </div>
            <div style="padding: 12px; background: #fff7e6; border-left: 4px solid #faad14; border-radius: 4px;">
              <div style="font-size: 12px; color: #666;">音效强度</div>
              <div style="font-size: 18px; font-weight: bold; color: #faad14;">{{effectDisplay}}</div>
            </div>
            <div style="padding: 12px; background: #f6f6f6; border-left: 4px solid #666; border-radius: 4px;">
              <div style="font-size: 12px; color: #666;">当前状态</div>
              <div style="font-size: 18px; font-weight: bold; color: #666;">{{statusDisplay}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

export const complete = CompleteTemplate.bind({});
complete.args = {
  // 音量刻度
  volumeMarks: {
    0: '静音',
    25: '低',
    50: '中',
    75: '高',
    100: '最大'
  },
  
  // 低音高音刻度
  bassMarks: {
    '-10': '-10dB',
    0: '0dB',
    10: '+10dB'
  },
  
  trebleMarks: {
    '-10': '-10dB',
    0: '0dB', 
    10: '+10dB'
  },
  
  // 音效刻度
  effectMarks: {
    0: '关闭',
    50: '中等',
    100: '最强'
  },
  
  // 平衡刻度
  balanceMarks: {
    '-100': '全左',
    '-50': '偏左',
    0: '居中',
    50: '偏右',
    100: '全右'
  },
  
  // 立体声宽度刻度
  widthMarks: {
    0: '单声道',
    100: '标准',
    200: '超宽'
  },
  
  // 格式化函数
  volumeFormatter: (value: number) => `${value}%`,
  dbFormatter: (value: number) => `${value > 0 ? '+' : ''}${value}dB`,
  percentFormatter: (value: number) => `${value}%`,
  delayFormatter: (value: number) => `${value}ms`,
  balanceFormatter: (value: number) => {
    if (value === 0) return '居中';
    if (value < 0) return `左${Math.abs(value)}%`;
    return `右${value}%`;
  },
  
  // 显示数据
  masterVolumeDisplay: '75%',
  balanceDisplay: '居中',
  effectDisplay: '中等',
  statusDisplay: '正常',
  
  // 事件处理
  savePreset: () => {
    console.log('保存音频预设');
    alert('音频预设已保存！');
  },
  
  loadPreset: () => {
    console.log('加载音频预设');
    alert('音频预设已加载！');
  },
  
  resetAll: () => {
    console.log('重置所有设置');
    if (confirm('确定要重置所有音频设置吗？')) {
      alert('所有设置已重置到默认值！');
    }
  },
  
  toggleMute: () => {
    console.log('切换静音状态');
    alert('静音状态已切换！');
  }
};
complete.storyName = '综合应用示例';
complete.parameters = {
  docs: {
    description: {
      story: `
## 综合应用示例

这是一个完整的音频设备控制面板示例，展示了滑动条在复杂应用场景中的综合运用。

### 🎛️ 应用场景分析

#### 音频控制面板
- **主音量控制**: 整体音量调节，使用大范围0-100
- **音效设置**: 混响、合唱、延迟等效果参数调节
- **立体声设置**: 左右平衡、立体声宽度控制
- **频率响应**: 7段EQ均衡器，专业音频调节

#### 控制面板特点
- **分组展示**: 按功能模块分组，结构清晰
- **实时反馈**: 参数调节时实时显示状态
- **预设管理**: 支持保存和加载用户配置
- **专业性**: 使用专业音频术语和单位

### 🎯 技术实现要点

#### 分组布局
\`\`\`html
<!-- 主音量控制组 -->
<div class="control-group">
  <h4>🔊 主音量控制</h4>
  <hy-slider title="主音量" [marks]="volumeMarks" theme="success"></hy-slider>
  <hy-slider title="低音增强" [tipFormatter]="dbFormatter"></hy-slider>
</div>
\`\`\`

#### 专业格式化
\`\`\`typescript
// 分贝格式化
dbFormatter = (value: number): string => {
  return \`\${value > 0 ? '+' : ''}\${value}dB\`;
};

// 平衡格式化
balanceFormatter = (value: number): string => {
  if (value === 0) return '居中';
  if (value < 0) return \`左\${Math.abs(value)}%\`;
  return \`右\${value}%\`;
};
\`\`\`

#### EQ均衡器布局
\`\`\`html
<!-- 7段频率均衡器 -->
<div class="eq-container">
  <div class="eq-band" *ngFor="let freq of frequencies">
    <div class="freq-label">{freq}Hz</div>
    <hy-slider [model]="'eq' + freq" [noLabel]="true" 
               [min]="-12" [max]="12" 
               [tipFormatter]="dbFormatter"></hy-slider>
  </div>
</div>
\`\`\`

### 🎨 界面设计特色

#### 视觉分组
- **卡片布局**: 整体使用卡片包装，层次清晰
- **分组标题**: 使用图标和文字组合的标题
- **分割线**: 用边框分割不同功能区域

#### 主题应用
- **成功主题**: 音量相关控件，表示正常状态
- **默认主题**: 一般音效参数
- **警告主题**: 需要注意的参数如音效音量

#### 栅格配置
- **全宽控件**: 主要参数使用24列全宽
- **对称布局**: 相关参数使用12列对称
- **紧凑布局**: EQ使用小尺寸节省空间

### 🔧 业务逻辑处理

#### 参数联动
\`\`\`typescript
// 主音量影响所有子音量
onMasterVolumeChange(volume: number) {
  const ratio = volume / 100;
  this.adjustSubVolumes(ratio);
}

// 平衡调节影响左右声道
onBalanceChange(balance: number) {
  this.updateStereoBalance(balance);
}
\`\`\`

#### 预设管理
\`\`\`typescript
// 保存当前所有参数为预设
savePreset() {
  const preset = {
    masterVolume: this.formData.masterVolume,
    bassBoost: this.formData.bassBoost,
    // ... 其他参数
  };
  
  this.presetService.save('user-preset', preset);
  this.showMessage('预设已保存');
}

// 加载预设并应用参数
loadPreset() {
  const preset = this.presetService.load('user-preset');
  if (preset) {
    this.applyPreset(preset);
    this.showMessage('预设已加载');
  }
}
\`\`\`

#### 实时状态更新
\`\`\`typescript
// 实时计算显示状态
updateDisplayStatus() {
  this.masterVolumeDisplay = \`\${this.formData.masterVolume}%\`;
  this.balanceDisplay = this.formatBalance(this.formData.balance);
  this.effectDisplay = this.getEffectLevel(this.formData.reverb);
  this.statusDisplay = this.getOverallStatus();
}
\`\`\`

### 💡 扩展应用场景

1. **专业音频工作站**: 录音室、广播电台控制面板
2. **游戏音效设置**: 游戏内音频参数调节界面
3. **视频编辑软件**: 视频音轨的音效处理面板
4. **智能家居控制**: 全屋音响系统控制界面
5. **在线音乐播放器**: 高级音效设置面板

### 🎯 用户体验优化

#### 操作便利性
- **快捷操作**: 双击滑块重置为默认值
- **批量操作**: 提供一键重置、静音等功能
- **键盘支持**: 支持Tab键切换和方向键调节

#### 专业性体现
- **单位标识**: 使用dB、Hz、ms等专业单位
- **刻度标记**: 提供有意义的刻度标识
- **实时反馈**: 参数调节时的即时音频反馈

这个示例展示了如何构建专业级的控制界面，既保证了功能的完整性，又提供了优秀的用户体验。
`
    }
  }
};


