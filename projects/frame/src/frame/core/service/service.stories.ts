import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { ModelService } from '../common/domain/service/model.service';
import { TableService } from '../common/domain/service/hytable.service';
import { BaseModule } from '../../base/base.module';
import { ServerTimeService } from './server-time';
import { $hyapi } from '../api/$hyapi';

let _this;
class MockPricingService implements Partial<ModelService> {
  constructor() {
    _this = this;
    setTimeout(() => {
      console.log(this);
    }, 100);
  }
}

export default {
  title: 'service/server-time',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockPricingService }, ServerTimeService, TableService]
    }),
  ],
} as Meta;

// 请求加解密
const Template: Story= (args: any) => {
  args.getTime = (formatString)=>{
    console.log(new ServerTimeService().getServerTime(formatString));
  };
  args['encryptCode'] = `
  // 导入
  import { ServerTimeService } from 'hy-frame';

  // 注册
  constructor(private serverTimeService: ServerTimeService) {}

  // 使用
  getServerTime(formatString?) {
    this.serverTimeService.getServerTime(formatString);
  }
  `
  return {
    props: args,
    template: `
      <div style="border:1px solid #ddd;padding:10px;margin-bottom:10px">
        <h3>获取服务器时间</h3>
        <i>请打开控制台</i>
        <br>
        <button nz-button (click)="getTime()">获取服务器时间</button>
        <br>
        <button nz-button (click)="getTime('yyyy-MM-dd')">获取指定格式的服务器时间</button>
        <h3>代码如下：</h3>
        <pre style="margin:0px"><code>{{encryptCode}}</code></pre>
      </div>
    `,
  }
};
export const panel: Story = Template.bind({});
panel.storyName = 'server-time';

