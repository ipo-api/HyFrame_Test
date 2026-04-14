import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyTimeComponent } from './hy-time.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { previewTemplate } from 'storybook-addon-preview';

const argTypes = unit.createArgTypes('HyTimeComponent');
const labelString = unit.createLabel('hy-time', argTypes);

export default {
  title: '表单组件/hy-time（时间选择器）',
  component: HyTimeComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [ModelService, TableService]
    }),
  ],
  argTypes
} as Meta;

// 基础用法
const BasicTemplate: Story<HyTimeComponent> = (args: HyTimeComponent) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>基础时间选择器</h3>
      <p>用于选择或输入时间，支持时、分、秒的精确选择</p>
      
      <hy-form>
        <hy-gt model="test">
          ${labelString}</hy-time>
        </hy-gt>
      </hy-form>
    </div>
  `
});

export const basic = BasicTemplate.bind({});
basic.args = {
  title: '选择时间',
  ckRequired: true,
  tip: '请选择时间',
  cols: 24,
  format: 'HH:mm:ss',
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  model: 'time'
};
basic.storyName = '基础用法';
basic.parameters = {
  docs: {
    description: {
      story: `
## 基础用法

HyTime 时间选择器用于选择或输入时间值，支持多种时间格式和精度控制。

### 特点
- **精确选择**: 支持时、分、秒的精确选择
- **格式自定义**: 支持多种时间显示格式
- **步长控制**: 可设置时、分、秒的递增步长
- **验证支持**: 内置必填验证和格式验证
- **友好交互**: 提供清晰的视觉反馈和操作体验

### 使用场景
- ⏰ **时间记录**: 工作时间、会议时间等时间点记录
- 📅 **日程安排**: 活动开始时间、结束时间设置
- ⏱️ **倒计时设置**: 定时器、提醒时间设置
- 🕐 **营业时间**: 商店营业时间、服务时间配置
- 📊 **数据统计**: 按时间段统计的起止时间选择

### 基本配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| model | 数据模型字段名 | string | - |
| title | 字段标题 | string | - |
| format | 时间格式 | string | 'HH:mm:ss' |
| ckRequired | 是否必填 | boolean | false |
| tip | 提示信息 | string \\| TemplateRef | - |
| cols | 栅格列数 | number | 24 |

### 时间格式说明
- **HH:mm:ss** - 24小时制，包含秒（如：14:30:25）
- **HH:mm** - 24小时制，不含秒（如：14:30）
- **hh:mm:ss A** - 12小时制，包含秒（如：02:30:25 PM）
- **hh:mm A** - 12小时制，不含秒（如：02:30 PM）
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 基础时间选择器 -->
<hy-form>
  <hy-gt model="timeModel">
    <hy-time 
      title="会议时间"
      model="meetingTime"
      format="HH:mm:ss"
      [ckRequired]="true"
      cols="24">
    </hy-time>
  </hy-gt>
</hy-form>

<!-- 不同格式的时间选择器 -->
<hy-form>
  <hy-gt model="scheduleModel">
    <hy-time 
      title="开始时间"
      model="startTime"
      format="HH:mm"
      [ckRequired]="true"
      cols="12">
    </hy-time>
    
    <hy-time 
      title="结束时间"
      model="endTime"
      format="HH:mm"
      [ckRequired]="true"
      cols="12">
    </hy-time>
  </hy-gt>
</hy-form>

<!-- 12小时制时间选择器 -->
<hy-form>
  <hy-gt model="eventModel">
    <hy-time 
      title="活动时间"
      model="eventTime"
      format="hh:mm A"
      cols="24">
    </hy-time>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';
import { ModelService, $hyapi } from '@hy/frame';

@Component({
  selector: 'app-time-basic-demo',
  templateUrl: './time-basic-demo.component.html'
})
export class TimeBasicDemoComponent implements OnInit {

  constructor(private modelService: ModelService) {}

  ngOnInit() {
    this.initTimeModels();
  }

  private initTimeModels() {
    // 会议时间模型
    this.modelService['timeModel'] = {
      meetingTime: '14:30:00' // 默认时间
    };

    // 日程安排模型
    this.modelService['scheduleModel'] = {
      startTime: '09:00',
      endTime: '17:30'
    };

    // 活动时间模型
    this.modelService['eventModel'] = {
      eventTime: '02:30 PM'
    };
  }

  // 时间变更处理
  onTimeChange(field: string, newTime: string) {
    console.log(\`时间已更改: \${field} = \${newTime}\`);
    
    // 可以添加业务逻辑，如时间范围验证
    if (field === 'startTime' || field === 'endTime') {
      this.validateTimeRange();
    }
  }

  // 验证时间范围
  private validateTimeRange() {
    const startTime = this.modelService['scheduleModel'].startTime;
    const endTime = this.modelService['scheduleModel'].endTime;

    if (startTime && endTime) {
      const start = new Date(\`2000-01-01 \${startTime}:00\`);
      const end = new Date(\`2000-01-01 \${endTime}:00\`);

      if (start >= end) {
        $hyapi.msg.createTips('warning', '结束时间应晚于开始时间');
        return false;
      }
    }
    return true;
  }

  // 获取时间差（分钟）
  getTimeDifference(): number {
    const startTime = this.modelService['scheduleModel'].startTime;
    const endTime = this.modelService['scheduleModel'].endTime;

    if (startTime && endTime) {
      const start = new Date(\`2000-01-01 \${startTime}:00\`);
      const end = new Date(\`2000-01-01 \${endTime}:00\`);
      return Math.abs(end.getTime() - start.getTime()) / (1000 * 60);
    }
    return 0;
  }

  // 格式化时间显示
  formatTimeDisplay(time: string, format: string): string {
    if (!time) return '';
    
    // 根据不同格式处理时间显示
    switch (format) {
      case 'HH:mm:ss':
        return time;
      case 'HH:mm':
        return time.substring(0, 5);
      case 'hh:mm A':
        return this.convertTo12Hour(time);
      default:
        return time;
    }
  }

  // 转换为12小时制
  private convertTo12Hour(time24: string): string {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return \`\${hour12.toString().padStart(2, '0')}:\${minutes} \${ampm}\`;
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 步长配置
const StepTemplate: Story<HyTimeComponent> = (args: HyTimeComponent) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>步长配置</h3>
      <p>设置时、分、秒的递增步长，提供更精确的时间选择控制</p>
      
      <hy-form>
        <hy-gt model="stepTest">
          <div style="margin-bottom: 16px;">
            <h4>默认步长（1分钟）</h4>
            <hy-time 
              title="会议时间"
              model="time1"
              format="HH:mm:ss"
              [hourStep]="1"
              [minuteStep]="1"
              [secondStep]="1"
              cols="24">
            </hy-time>
          </div>
          
          <div style="margin-bottom: 16px;">
            <h4>15分钟步长</h4>
            <hy-time 
              title="预约时间"
              model="time2"
              format="HH:mm"
              [hourStep]="1"
              [minuteStep]="15"
              cols="24">
            </hy-time>
          </div>
          
          <div style="margin-bottom: 16px;">
            <h4>30分钟步长</h4>
            <hy-time 
              title="课程时间"
              model="time3"
              format="HH:mm"
              [hourStep]="1"
              [minuteStep]="30"
              cols="24">
            </hy-time>
          </div>
        </hy-gt>
      </hy-form>
    </div>
  `
});

export const stepConfig = StepTemplate.bind({});
stepConfig.args = {};
stepConfig.storyName = '步长配置';
stepConfig.parameters = {
  docs: {
    description: {
      story: `
## 步长配置

通过设置 hourStep、minuteStep、secondStep 属性，可以控制时间选择器中时、分、秒的递增步长。

### 特点
- **灵活步长**: 支持自定义时、分、秒的递增间隔
- **业务适配**: 根据不同业务场景设置合适的精度
- **用户友好**: 减少无效选项，提升选择效率
- **精确控制**: 避免用户选择不合规的时间点

### 常用步长配置

#### 分钟步长设置
- **1分钟**: 默认精度，适用于精确时间记录
- **5分钟**: 适用于日程安排、会议预约
- **15分钟**: 适用于课程时间、服务预约
- **30分钟**: 适用于大块时间安排

#### 小时步长设置
- **1小时**: 默认设置，按小时递增
- **2小时**: 适用于轮班安排
- **4小时**: 适用于长时间段设置

### 使用场景
- 📅 **会议预约**: 15分钟或30分钟步长，符合会议室预约习惯
- 🏥 **医院挂号**: 5分钟或10分钟步长，提高就诊效率
- 🎓 **课程安排**: 30分钟或45分钟步长，符合课程时长
- 🚌 **交通班次**: 固定间隔的发车时间设置
- ⏰ **工作时间**: 按业务需求设置打卡时间精度

### 配置属性
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| hourStep | 小时递增步长 | number | 1 |
| minuteStep | 分钟递增步长 | number | 1 |
| secondStep | 秒递增步长 | number | 1 |

### 最佳实践
- 根据业务场景选择合适的步长，避免过于精细或粗糙
- 考虑用户习惯，常用的步长有5、10、15、30分钟
- 对于公共服务，建议使用较大的步长以提高效率
- 步长设置应与后端业务逻辑保持一致
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 不同步长的时间选择器 -->
<hy-form>
  <hy-gt model="appointmentModel">
    <!-- 5分钟步长，适合医院预约 -->
    <hy-time 
      title="就诊时间"
      model="appointmentTime"
      format="HH:mm"
      [minuteStep]="5"
      cols="12">
    </hy-time>
    
    <!-- 15分钟步长，适合会议预约 -->
    <hy-time 
      title="会议时间"
      model="meetingTime"
      format="HH:mm"
      [minuteStep]="15"
      cols="12">
    </hy-time>
  </hy-gt>
</hy-form>

<!-- 课程时间安排（30分钟步长） -->
<hy-form>
  <hy-gt model="courseModel">
    <hy-time 
      title="课程开始时间"
      model="startTime"
      format="HH:mm"
      [minuteStep]="30"
      [ckRequired]="true"
      cols="12">
    </hy-time>
    
    <hy-time 
      title="课程结束时间"
      model="endTime"
      format="HH:mm"
      [minuteStep]="30"
      [ckRequired]="true"
      cols="12">
    </hy-time>
  </hy-gt>
</hy-form>

<!-- 轮班时间（2小时步长） -->
<hy-form>
  <hy-gt model="shiftModel">
    <hy-time 
      title="轮班时间"
      model="shiftTime"
      format="HH:mm"
      [hourStep]="2"
      [minuteStep]="0"
      cols="24">
    </hy-time>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';
import { ModelService } from '@hy/frame';

@Component({
  selector: 'app-time-step-demo',
  templateUrl: './time-step-demo.component.html'
})
export class TimeStepDemoComponent implements OnInit {

  constructor(private modelService: ModelService) {}

  ngOnInit() {
    this.initStepModels();
  }

  private initStepModels() {
    // 预约模型
    this.modelService['appointmentModel'] = {
      appointmentTime: '09:00',
      meetingTime: '10:00'
    };

    // 课程模型
    this.modelService['courseModel'] = {
      startTime: '09:00',
      endTime: '10:30'
    };

    // 轮班模型
    this.modelService['shiftModel'] = {
      shiftTime: '08:00'
    };
  }

  // 验证预约时间（5分钟步长）
  validateAppointmentTime(time: string): boolean {
    if (!time) return false;
    
    const [hours, minutes] = time.split(':').map(Number);
    return minutes % 5 === 0; // 必须是5的倍数
  }

  // 验证会议时间（15分钟步长）
  validateMeetingTime(time: string): boolean {
    if (!time) return false;
    
    const [hours, minutes] = time.split(':').map(Number);
    return minutes % 15 === 0; // 必须是15的倍数
  }

  // 验证课程时间（30分钟步长）
  validateCourseTime(time: string): boolean {
    if (!time) return false;
    
    const [hours, minutes] = time.split(':').map(Number);
    return minutes % 30 === 0; // 必须是30的倍数
  }

  // 生成可用时间选项（用于下拉选择）
  generateTimeOptions(startHour: number, endHour: number, minuteStep: number): string[] {
    const options: string[] = [];
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += minuteStep) {
        const timeStr = \`\${hour.toString().padStart(2, '0')}:\${minute.toString().padStart(2, '0')}\`;
        options.push(timeStr);
      }
    }
    
    return options;
  }

  // 获取预约时间选项（9:00-17:00，5分钟步长）
  getAppointmentOptions(): string[] {
    return this.generateTimeOptions(9, 17, 5);
  }

  // 获取会议时间选项（9:00-18:00，15分钟步长）
  getMeetingOptions(): string[] {
    return this.generateTimeOptions(9, 18, 15);
  }

  // 获取课程时间选项（8:00-20:00，30分钟步长）
  getCourseOptions(): string[] {
    return this.generateTimeOptions(8, 20, 30);
  }

  // 计算时间间隔
  calculateDuration(startTime: string, endTime: string): string {
    if (!startTime || !endTime) return '';
    
    const start = new Date(\`2000-01-01 \${startTime}:00\`);
    const end = new Date(\`2000-01-01 \${endTime}:00\`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return \`\${diffHours}小时\${diffMinutes}分钟\`;
  }

  // 检查时间冲突
  checkTimeConflict(newStartTime: string, newEndTime: string, existingTimeSlots: Array<{start: string, end: string}>): boolean {
    const newStart = new Date(\`2000-01-01 \${newStartTime}:00\`);
    const newEnd = new Date(\`2000-01-01 \${newEndTime}:00\`);
    
    return existingTimeSlots.some(slot => {
      const existingStart = new Date(\`2000-01-01 \${slot.start}:00\`);
      const existingEnd = new Date(\`2000-01-01 \${slot.end}:00\`);
      
      return (newStart < existingEnd && newEnd > existingStart);
    });
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 时间范围限制
const RangeTemplate: Story<HyTimeComponent> = (args: HyTimeComponent) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>时间范围限制</h3>
      <p>通过配置可选时间范围，限制用户只能选择特定的时间点</p>
      
      <hy-form>
        <hy-gt model="rangeTest">
          <div style="margin-bottom: 16px;">
            <h4>限制工作时间（9-18点）</h4>
            <hy-time 
              title="上班时间"
              model="workTime"
              format="HH:mm:ss"
              [enableHours]="workHours"
              cols="24">
            </hy-time>
          </div>
          
          <div style="margin-bottom: 16px;">
            <h4>限制特定分钟数</h4>
            <hy-time 
              title="预约时间"
              model="appointmentTime"
              format="HH:mm:ss"
              [enableMinutes]="appointmentMinutes"
              cols="24">
            </hy-time>
          </div>
          
          <div style="margin-bottom: 16px;">
            <h4>组合限制</h4>
            <hy-time 
              title="会议时间"
              model="meetingTime"
              format="HH:mm:ss"
              [enableHours]="meetingHours"
              [enableMinutes]="meetingMinutes"
              [enableSeconds]="meetingSeconds"
              cols="24">
            </hy-time>
          </div>
        </hy-gt>
      </hy-form>
    </div>
  `
});

export const rangeLimit = RangeTemplate.bind({});
rangeLimit.args = {
  workHours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  appointmentMinutes: [0, 15, 30, 45],
  meetingHours: [9, 10, 11, 14, 15, 16, 17],
  meetingMinutes: [0, 30],
  meetingSeconds: [0]
};
rangeLimit.storyName = '时间范围限制';
rangeLimit.parameters = {
  docs: {
    description: {
      story: `
## 时间范围限制

通过 enableHours、enableMinutes、enableSeconds 属性可以限制用户只能选择特定的时间范围。

### 特点
- **精确控制**: 可分别限制小时、分钟、秒的可选范围
- **业务适配**: 根据业务规则限制可选时间
- **用户引导**: 防止用户选择无效或不可用的时间
- **灵活配置**: 支持数组形式的多个时间点限制

### 限制类型

#### 小时限制 (enableHours)
- **工作时间**: 限制在工作时间内选择
- **营业时间**: 限制在商店营业时间内
- **服务时间**: 限制在提供服务的时间段

#### 分钟限制 (enableMinutes)  
- **整点时间**: 只允许选择整点（0分钟）
- **固定间隔**: 如每15分钟、30分钟的固定时间点
- **特殊时间**: 根据业务需求的特定分钟数

#### 秒限制 (enableSeconds)
- **整分时间**: 只允许选择整分（0秒）
- **特定精度**: 根据系统精度要求限制秒数

### 使用场景
- 🏢 **办公系统**: 限制工作时间内的操作
- 🏥 **医疗预约**: 限制医生出诊时间段
- 🍽️ **餐厅预约**: 限制营业时间和就餐时段
- 🎓 **教育系统**: 限制上课时间和考试时间
- 🚌 **交通系统**: 限制班次发车时间

### 配置属性
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| enableHours | 可选择的小时数组 | number[] | [] |
| enableMinutes | 可选择的分钟数组 | number[] | [] |
| enableSeconds | 可选择的秒数组 | number[] | [] |

### 配置示例
\`\`\`typescript
// 工作时间（9:00-18:00）
enableHours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

// 每15分钟间隔
enableMinutes: [0, 15, 30, 45]

// 只允许整分钟
enableSeconds: [0]

// 午休时间排除（12:00-14:00）
enableHours: [9, 10, 11, 14, 15, 16, 17, 18]
\`\`\`

### 最佳实践
- 根据实际业务场景设置合理的时间限制
- 提供清晰的提示说明时间限制规则
- 考虑时区和夏令时的影响
- 为特殊情况预留灵活的配置选项
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 工作时间限制 -->
<hy-form>
  <hy-gt model="workModel">
    <hy-time 
      title="上班打卡时间"
      model="clockInTime"
      format="HH:mm"
      [enableHours]="[8, 9, 10]"
      [enableMinutes]="[0, 30]"
      tip="只能在8:00-10:30之间打卡"
      cols="12">
    </hy-time>
    
    <hy-time 
      title="下班打卡时间"
      model="clockOutTime"
      format="HH:mm"
      [enableHours]="[17, 18, 19, 20]"
      [enableMinutes]="[0, 30]"
      tip="最早17:00可以打卡"
      cols="12">
    </hy-time>
  </hy-gt>
</hy-form>

<!-- 医院预约时间限制 -->
<hy-form>
  <hy-gt model="hospitalModel">
    <hy-time 
      title="预约时间"
      model="appointmentTime"
      format="HH:mm"
      [enableHours]="[9, 10, 11, 14, 15, 16, 17]"
      [enableMinutes]="[0, 20, 40]"
      tip="医生出诊时间：9:00-12:00, 14:00-18:00"
      cols="24">
    </hy-time>
  </hy-gt>
</hy-form>

<!-- 餐厅预约时间限制 -->
<hy-form>
  <hy-gt model="restaurantModel">
    <hy-time 
      title="用餐时间"
      model="diningTime"
      format="HH:mm"
      [enableHours]="[11, 12, 13, 17, 18, 19, 20, 21]"
      [enableMinutes]="[0, 30]"
      tip="营业时间：11:00-14:00, 17:00-22:00"
      cols="24">
    </hy-time>
  </hy-gt>
</hy-form>

<!-- 课程时间限制 -->
<hy-form>
  <hy-gt model="courseModel">
    <hy-time 
      title="上课时间"
      model="classTime"
      format="HH:mm"
      [enableHours]="[8, 9, 10, 11, 14, 15, 16, 17]"
      [enableMinutes]="[0, 50]"
      tip="课程安排：上午8:00-11:50, 下午14:00-17:50"
      cols="24">
    </hy-time>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, OnInit } from '@angular/core';
import { ModelService, $hyapi } from '@hy/frame';

@Component({
  selector: 'app-time-range-demo',
  templateUrl: './time-range-demo.component.html'
})
export class TimeRangeDemoComponent implements OnInit {
  
  // 工作时间配置
  workHours = [8, 9, 10, 17, 18, 19, 20];
  workMinutes = [0, 30];
  
  // 医院预约时间配置
  hospitalHours = [9, 10, 11, 14, 15, 16, 17]; // 排除午休时间
  hospitalMinutes = [0, 20, 40]; // 每20分钟一个预约时段
  
  // 餐厅营业时间配置
  restaurantHours = [11, 12, 13, 17, 18, 19, 20, 21];
  restaurantMinutes = [0, 30];
  
  // 课程时间配置
  courseHours = [8, 9, 10, 11, 14, 15, 16, 17];
  courseMinutes = [0, 50]; // 每节课50分钟

  constructor(private modelService: ModelService) {}

  ngOnInit() {
    this.initRangeModels();
  }

  private initRangeModels() {
    // 工作模型
    this.modelService['workModel'] = {
      clockInTime: '09:00',
      clockOutTime: '18:00'
    };

    // 医院模型
    this.modelService['hospitalModel'] = {
      appointmentTime: '09:00'
    };

    // 餐厅模型
    this.modelService['restaurantModel'] = {
      diningTime: '18:00'
    };

    // 课程模型
    this.modelService['courseModel'] = {
      classTime: '08:00'
    };
  }

  // 验证时间是否在允许范围内
  isTimeAllowed(time: string, allowedHours: number[], allowedMinutes: number[]): boolean {
    if (!time) return false;
    
    const [hours, minutes] = time.split(':').map(Number);
    return allowedHours.includes(hours) && allowedMinutes.includes(minutes);
  }

  // 获取下一个可用时间
  getNextAvailableTime(currentTime: string, allowedHours: number[], allowedMinutes: number[]): string {
    const [currentHour, currentMinute] = currentTime.split(':').map(Number);
    
    // 寻找下一个可用时间
    for (const hour of allowedHours) {
      for (const minute of allowedMinutes) {
        if (hour > currentHour || (hour === currentHour && minute > currentMinute)) {
          return \`\${hour.toString().padStart(2, '0')}:\${minute.toString().padStart(2, '0')}\`;
        }
      }
    }
    
    // 如果没有找到，返回第一个可用时间
    return \`\${allowedHours[0].toString().padStart(2, '0')}:\${allowedMinutes[0].toString().padStart(2, '0')}\`;
  }

  // 工作时间验证
  validateWorkTime(time: string, type: 'clockIn' | 'clockOut'): boolean {
    if (!time) return false;
    
    const [hours, minutes] = time.split(':').map(Number);
    
    if (type === 'clockIn') {
      // 上班打卡：8:00-10:30
      return hours >= 8 && hours <= 10 && (hours < 10 || minutes <= 30);
    } else {
      // 下班打卡：17:00以后
      return hours >= 17;
    }
  }

  // 医院预约时间验证
  validateHospitalTime(time: string): boolean {
    if (!time) return false;
    
    const [hours, minutes] = time.split(':').map(Number);
    
    // 上午9:00-12:00，下午14:00-18:00
    const morningSlot = hours >= 9 && hours < 12;
    const afternoonSlot = hours >= 14 && hours < 18;
    const validMinutes = [0, 20, 40].includes(minutes);
    
    return (morningSlot || afternoonSlot) && validMinutes;
  }

  // 餐厅预约时间验证
  validateRestaurantTime(time: string): boolean {
    if (!time) return false;
    
    const [hours, minutes] = time.split(':').map(Number);
    
    // 午餐时间11:00-14:00，晚餐时间17:00-22:00
    const lunchTime = hours >= 11 && hours < 14;
    const dinnerTime = hours >= 17 && hours < 22;
    const validMinutes = [0, 30].includes(minutes);
    
    return (lunchTime || dinnerTime) && validMinutes;
  }

  // 生成时间选项提示
  generateTimeHint(allowedHours: number[], allowedMinutes: number[]): string {
    const hourRanges = this.getConsecutiveRanges(allowedHours);
    const minuteList = allowedMinutes.join(', ');
    
    return \`可选时间段: \${hourRanges.join(', ')}, 分钟: \${minuteList}\`;
  }

  // 获取连续的小时范围
  private getConsecutiveRanges(hours: number[]): string[] {
    const ranges: string[] = [];
    let start = hours[0];
    let end = hours[0];
    
    for (let i = 1; i < hours.length; i++) {
      if (hours[i] === end + 1) {
        end = hours[i];
      } else {
        ranges.push(start === end ? \`\${start}:00\` : \`\${start}:00-\${end}:00\`);
        start = end = hours[i];
      }
    }
    
    ranges.push(start === end ? \`\${start}:00\` : \`\${start}:00-\${end}:00\`);
    return ranges;
  }

  // 处理时间变更
  onTimeChange(field: string, newTime: string) {
    console.log(\`时间变更: \${field} = \${newTime}\`);
    
    // 根据不同字段进行相应的验证
    switch (field) {
      case 'clockInTime':
      case 'clockOutTime':
        if (!this.validateWorkTime(newTime, field as 'clockIn' | 'clockOut')) {
          $hyapi.msg.createTips('warning', '请选择有效的工作时间');
        }
        break;
      case 'appointmentTime':
        if (!this.validateHospitalTime(newTime)) {
          $hyapi.msg.createTips('warning', '请选择有效的预约时间');
        }
        break;
      case 'diningTime':
        if (!this.validateRestaurantTime(newTime)) {
          $hyapi.msg.createTips('warning', '请选择有效的用餐时间');
        }
        break;
    }
  }
}
      `,
      language: "typescript",
      copy: true
    }
  ]
};

// 提示信息
const TipTemplate: Story<HyTimeComponent> = (args: HyTimeComponent) => ({
  props: args,
  template: `
    <div class="demo-container">
      <h3>提示信息</h3>
      <p>支持文字提示和模板提示，可设置不同的提示位置和样式</p>
      
      <hy-form>
        <hy-gt model="tipTest">
          <div style="margin-bottom: 16px;">
            <h4>文字提示</h4>
            <hy-time 
              cols="12" 
              title="右侧提示" 
              model="time1" 
              [tip]="'请选择合适的时间'">
            </hy-time>
            
            <hy-time 
              cols="12" 
              title="底部提示" 
              model="time2" 
              tipType="bottomTip" 
              [tip]="'这是底部提示信息'">
            </hy-time>
          </div>
          
          <div style="margin-bottom: 16px;">
            <h4>模板提示</h4>
            <hy-time 
              cols="12" 
              title="右侧模板提示" 
              model="time3" 
              [tip]="tipTemplate">
            </hy-time>
            
            <hy-time 
              cols="12" 
              title="底部模板提示" 
              model="time4" 
              tipType="bottomTip" 
              [tip]="tipTemplate">
            </hy-time>
          </div>
        </hy-gt>
      </hy-form>

      <ng-template #tipTemplate>
        <div style="color: #1890ff;">
          <div><i>📅</i> 工作日：9:00-18:00</div>
          <div><i>🕒</i> 周末：10:00-17:00</div>
          <div><i>⚠️</i> 节假日不可预约</div>
        </div>
      </ng-template>
    </div>
  `
});

export const tipInfo = TipTemplate.bind({});
tipInfo.args = {};
tipInfo.storyName = '提示信息';
tipInfo.parameters = {
  docs: {
    description: {
      story: `
## 提示信息

HyTime 组件支持丰富的提示信息配置，帮助用户理解时间选择的规则和限制。

### 特点
- **文字提示**: 支持简单的文字提示信息
- **模板提示**: 支持复杂的HTML模板提示
- **位置控制**: 可设置提示信息的显示位置
- **样式自定义**: 支持自定义提示样式和布局
- **动态内容**: 支持动态更新提示内容

### 提示类型

#### 文字提示
- **简单描述**: 用于简单的使用说明
- **格式要求**: 说明时间格式要求
- **限制说明**: 解释时间选择的限制条件

#### 模板提示
- **复杂布局**: 支持多行、多列的复杂布局
- **富文本内容**: 可包含图标、链接、样式等
- **交互元素**: 可包含按钮、链接等交互组件

### 提示位置

#### 右侧提示 (默认)
- **紧邻组件**: 显示在时间选择器右侧
- **节省空间**: 不额外占用垂直空间
- **适合简短提示**: 适用于简短的说明文字

#### 底部提示 (tipType="bottomTip")
- **完整展示**: 可显示较长的提示内容
- **独立区域**: 有独立的提示区域
- **适合详细说明**: 适用于详细的使用指南

### 使用场景
- 📝 **使用指南**: 说明时间选择的使用方法
- ⚠️ **限制说明**: 解释时间选择的限制和规则
- 💡 **最佳实践**: 提供时间选择的建议
- 🎯 **业务规则**: 说明特定的业务时间要求
- 🔍 **格式提示**: 说明时间格式和精度要求

### 配置属性
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|---------|
| tip | 提示内容 | string \\| TemplateRef | - |
| tipType | 提示位置类型 | 'default' \\| 'bottomTip' | 'default' |

### 最佳实践
- 提示内容应简洁明了，避免冗长的描述
- 重要的限制条件应该突出显示
- 模板提示可以使用图标增强视觉效果
- 考虑多语言环境下的提示内容适配
- 提示内容应与实际的验证规则保持一致
`
    }
  },
  preview: [
    {
      tab: "HTML模板",
      template: previewTemplate`
<!-- 基础文字提示 -->
<hy-form>
  <hy-gt model="basicTipModel">
    <hy-time 
      title="会议时间"
      model="meetingTime"
      format="HH:mm"
      tip="请选择9:00-18:00之间的时间"
      cols="24">
    </hy-time>
  </hy-gt>
</hy-form>

<!-- 底部详细提示 -->
<hy-form>
  <hy-gt model="detailTipModel">
    <hy-time 
      title="预约时间"
      model="appointmentTime"
      format="HH:mm"
      tipType="bottomTip"
      tip="工作日9:00-17:00，周末10:00-16:00，节假日不接受预约"
      cols="24">
    </hy-time>
  </hy-gt>
</hy-form>

<!-- 模板提示 -->
<hy-form>
  <hy-gt model="templateTipModel">
    <hy-time 
      title="服务时间"
      model="serviceTime"
      format="HH:mm"
      [tip]="serviceTimeTemplate"
      cols="24">
    </hy-time>
  </hy-gt>
</hy-form>

<ng-template #serviceTimeTemplate>
  <div class="time-tip">
    <div class="tip-title">
      <strong>⏰ 服务时间安排</strong>
    </div>
    <div class="tip-content">
      <div class="tip-item">
        <span class="tip-label">工作日:</span>
        <span class="tip-value">09:00 - 18:00</span>
      </div>
      <div class="tip-item">
        <span class="tip-label">周末:</span>
        <span class="tip-value">10:00 - 17:00</span>
      </div>
      <div class="tip-item warning">
        <span class="tip-label">注意:</span>
        <span class="tip-value">节假日暂停服务</span>
      </div>
    </div>
  </div>
</ng-template>

<!-- 动态提示 -->
<hy-form>
  <hy-gt model="dynamicTipModel">
    <hy-time 
      title="动态提示"
      model="dynamicTime"
      format="HH:mm"
      [tip]="getDynamicTip()"
      cols="24">
    </hy-time>
  </hy-gt>
</hy-form>
      `,
      language: "html",
      copy: true
    },
    {
      tab: "组件代码",
      template: previewTemplate`
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModelService } from '@hy/frame';

@Component({
  selector: 'app-time-tip-demo',
  templateUrl: './time-tip-demo.component.html',
  styleUrls: ['./time-tip-demo.component.less']
})
export class TimeTipDemoComponent implements OnInit {
  @ViewChild('serviceTimeTemplate', { static: true }) serviceTimeTemplate!: TemplateRef<any>;

  constructor(private modelService: ModelService) {}

  ngOnInit() {
    this.initTipModels();
  }

  private initTipModels() {
    // 基础提示模型
    this.modelService['basicTipModel'] = {
      meetingTime: '14:00'
    };

    // 详细提示模型
    this.modelService['detailTipModel'] = {
      appointmentTime: '10:00'
    };

    // 模板提示模型
    this.modelService['templateTipModel'] = {
      serviceTime: '09:30'
    };

    // 动态提示模型
    this.modelService['dynamicTipModel'] = {
      dynamicTime: '15:00'
    };
  }

  // 获取动态提示内容
  getDynamicTip(): string {
    const now = new Date();
    const currentHour = now.getHours();
    
    if (currentHour < 9) {
      return '服务时间未开始，请选择9:00以后的时间';
    } else if (currentHour >= 18) {
      return '服务时间已结束，请选择明天的时间';
    } else if (currentHour >= 12 && currentHour < 14) {
      return '午休时间，建议选择14:00以后的时间';
    } else {
      return '当前可正常选择服务时间';
    }
  }

  // 根据时间获取特定提示
  getTimeSpecificTip(time: string): string {
    if (!time) return '请选择时间';
    
    const [hours] = time.split(':').map(Number);
    
    if (hours < 9) {
      return '⚠️ 选择的时间过早，建议选择9点以后';
    } else if (hours >= 18) {
      return '⚠️ 选择的时间过晚，建议选择18点以前';
    } else if (hours >= 12 && hours < 14) {
      return '💡 午休时间段，建议避开';
    } else {
      return '✅ 时间选择合适';
    }
  }

  // 获取工作日提示
  getWorkdayTip(): string {
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return '今天是周末，服务时间为10:00-17:00';
    } else {
      return '今天是工作日，服务时间为9:00-18:00';
    }
  }

  // 验证时间并提供提示
  validateTimeWithTip(time: string): { isValid: boolean; tip: string } {
    if (!time) {
      return { isValid: false, tip: '请选择时间' };
    }

    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const dayOfWeek = now.getDay();
    
    // 判断是否为工作日
    const isWorkday = dayOfWeek >= 1 && dayOfWeek <= 5;
    
    if (isWorkday) {
      // 工作日：9:00-18:00
      if (hours < 9 || hours >= 18) {
        return { 
          isValid: false, 
          tip: '工作日服务时间为9:00-18:00，请重新选择' 
        };
      }
    } else {
      // 周末：10:00-17:00
      if (hours < 10 || hours >= 17) {
        return { 
          isValid: false, 
          tip: '周末服务时间为10:00-17:00，请重新选择' 
        };
      }
    }
    
    // 午休时间提醒
    if (hours >= 12 && hours < 14) {
      return { 
        isValid: true, 
        tip: '💡 此时间段为午休时间，响应可能较慢' 
      };
    }
    
    return { isValid: true, tip: '✅ 时间选择合适' };
  }

  // 生成提示模板数据
  getTipTemplateData() {
    return {
      workdays: { start: '09:00', end: '18:00' },
      weekends: { start: '10:00', end: '17:00' },
      holidays: { available: false, message: '节假日暂停服务' },
      lunchBreak: { start: '12:00', end: '14:00', message: '午休时间，响应较慢' }
    };
  }

  // 处理时间变更事件
  onTimeChange(field: string, newTime: string) {
    console.log(\`时间变更: \${field} = \${newTime}\`);
    
    // 验证时间并更新提示
    const validation = this.validateTimeWithTip(newTime);
    
    if (!validation.isValid) {
      // 可以在这里显示错误提示或警告
      console.warn(validation.tip);
    } else {
      console.log(validation.tip);
    }
  }
}
      `,
      language: "typescript",
      copy: true
    },
    {
      tab: "样式配置",
      template: previewTemplate`
/* 提示信息样式 */
.time-tip {
  padding: 8px 12px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 4px;
  font-size: 12px;
  
  .tip-title {
    margin-bottom: 8px;
    color: #389e0d;
    font-weight: 600;
  }
  
  .tip-content {
    .tip-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .tip-label {
        color: #595959;
        font-weight: 500;
      }
      
      .tip-value {
        color: #262626;
      }
      
      &.warning {
        .tip-label,
        .tip-value {
          color: #fa541c;
        }
      }
    }
  }
}

/* 底部提示样式 */
.hy-time {
  .bottom-tip {
    margin-top: 4px;
    padding: 6px 8px;
    background: #fafafa;
    border-left: 3px solid #1890ff;
    font-size: 12px;
    color: #595959;
    line-height: 1.4;
  }
}

/* 动态提示样式 */
.dynamic-tip {
  &.success {
    color: #52c41a;
    background: #f6ffed;
    border-color: #b7eb8f;
  }
  
  &.warning {
    color: #fa8c16;
    background: #fff7e6;
    border-color: #ffd591;
  }
  
  &.error {
    color: #f5222d;
    background: #fff2f0;
    border-color: #ffccc7;
  }
}

/* 响应式提示 */
@media (max-width: 768px) {
  .time-tip {
    padding: 6px 8px;
    font-size: 11px;
    
    .tip-content .tip-item {
      flex-direction: column;
      align-items: flex-start;
      
      .tip-value {
        margin-top: 2px;
        font-size: 10px;
      }
    }
  }
}

/* 提示图标 */
.tip-icon {
  margin-right: 4px;
  
  &.success { color: #52c41a; }
  &.warning { color: #fa8c16; }
  &.error { color: #f5222d; }
  &.info { color: #1890ff; }
}
      `,
      language: "css",
      copy: true
    }
  ]
};

