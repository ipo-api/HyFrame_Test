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
import { ServerTimeService } from '../service/server-time';

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
  title: '$hyapi',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockPricingService }, ServerTimeService, TableService]
    }),
  ],
} as Meta;

// 请求加解密
const Template: Story= (args: any) => {
  args.encrypt = ()=>{
    const data = {
    data:{
      name:'test1',
      pw:'123',
      list:[
        {
          name:'test1',
          pw:'123456'
        },
        {
          name:'test2',
          pw:'654321'
        },
        {
          name:'test3',
          pw:'654321',
          info:{
            pw:123456
          }
        }
      ]
    }
  };
    $hyapi.io.post(_this,'http://10.40.92.15:3001/storybook/encrypt',data,{
      showMsg:false,
      showFailMsg:false,
      successFn:(res)=>{
        console.log(res)
      }
    },{
      encryptKeys:['data.pw','data.list..pw','data.list..info.pw'],
      secret:true
    })
  };
  args['encryptCode'] = `   // 数据
  const data = {
    data:{
      name:'test1',
      pw:'123',
      list:[
        {
          name:'test1',
          pw:'123456'
        },
        {
          name:'test2',
          pw:'654321'
        },
        {
          name:'test3',
          pw:'654321',
          info:{
            pw:123456
          }
        }
      ]
    }
  };
  $hyapi.io.post(mds,url,data,{
    showMsg:false,
    showFailMsg:false,
    successFn:(res)=>{
      console.log(res)
    }
  },{
    // 需要加密的key，其中data.list..pw，中list后面跟随两个点‘..’,代表需要加密的key在数组内
    encryptKeys:['data.pw','data.list..pw','data.list..info.pw'],
    // 设置为true后，请求头新增‘zen_sec_aes’,传过去一个16位加密的key
    secret:true
  })

  加密后的传参如下：
  {
    "data": {
        "name": "test1",
        "pw": "e8231e0252cd988836c594b95f93a9dc",
        "list": [
            {
                "name": "test1",
                "pw": "29227f5db6a949d98079ae2e3c79a384"
            },
            {
                "name": "test2",
                "pw": "86b77ded07821d95eddc9e8f5c3e8cdf"
            },
            {
                "name": "test3",
                "pw": "86b77ded07821d95eddc9e8f5c3e8cdf",
                "info": {
                    "pw": "29227f5db6a949d98079ae2e3c79a384"
                }
            }
        ]
    }
  }`
  return {
    props: args,
    template: `
      <div style="border:1px solid #ddd;padding:10px;margin-bottom:10px">
        <h3>请求加密</h3>
        <i>请打开控制台-网络，中查看</i>
        <br>
        <button nz-button (click)="encrypt()">请求加密</button>
        <h3>代码如下：</h3>
        <pre style="margin:0px"><code>{{encryptCode}}</code></pre>
        加密说明：当业务需要加密某个传参字段时，需要在post请求中，设置secret为true，然后传入需要加密的数组‘encryptKeys’（传参格式参考上面的示例）。
      </div>
    `,
  }
};
export const panel: Story = Template.bind({});
panel.storyName = '请求加密';

// 请求解密
const Template2: Story= (args: any) => {
  args.decrypt = ()=>{
    $hyapi.io.post(_this,'http://10.40.92.15:3001/storybook/decrypt',{},{
      showMsg:false,
      showFailMsg:false,
      successFn:(res)=>{
        console.log(res)
      }
    },{secret:true})
  };
  args['decryptCode'] = `
  $hyapi.io.post(mds,url,{},{
    showMsg:false,
    showFailMsg:false,
    successFn:(res)=>{
      console.log(res);
    }
  },{secret:true})` // secret设置为true即可
  return {
    props: args,
    template: `
      <div style="border:1px solid #ddd;padding:10px;margin-bottom:10px">
        <h3>接口解密请求</h3>
        <i>请打开控制台-网络，中查看</i>
        <br>
        <button nz-button (click)="decrypt()">解密请求</button>
        <h3>代码如下：</h3>
        <pre style="margin:0px">
          <code>{{decryptCode}}</code>
        </pre>
        解密说明：前端框架在post请求中设置secret为true后，前端框架会在请求头中传一个加密key给后端，后端框架拿到这个key后对需要的字段进行加密后传给前端，同时，还会在响应头中传给前端框架一组需要解密的字段，前端框架通过这组字段自动完成解密。\n
        这几步都已封装好，业务不需要额外处理。
      </div>
    `,
  }
};
export const panel2: Story = Template2.bind({});
panel2.storyName = '请求解密';


// 弹窗
const Template3: Story= (args: any) => {
  args['dialogPanel'];
  args['openDialog'] = (template) => {
    args['dialogPanel'] = $hyapi.dialog.show(template,{
      width:450,
    });
  };
  args['closeDialog'] = ()=>{
    $hyapi.dialog.close(args['dialogPanel']);
  }
  args['uploadConfig'] = ()=>{
    $hyapi.dialog.updateConfig(args['dialogPanel'],{width:500,closable:true})
  }
  args['restoreConfig'] = ()=>{
    $hyapi.dialog.updateConfig(args['dialogPanel'],{width:450,closable:false})
  }
  args['list'] = [1,2,3,4];
  args['treeData'] = [
    {
      title: '公司',
      key: '1',
      level: 0,
      children: [
        {
          title: '研发组',
          key: '1-1',
          level: 1,
          children: [
            {title: '研发组1', key: '1-1-1', level: 2},
            {title: '研发组2', key: '1-1-2', level: 2,disabled:true},
          ],
        },
        {
          title: '产品组',
          key: '1-1-3',
          level: 1,
          children: [
            {title: '产品组1', key: '1-1-2-1', level: 2},
            {title: '产品组2', key: '1-1-2-2',  level: 2, children: [{title: '产品组2-1', key: '1-1-2-2-1', level: 3}]},
            {title: 'aaaaBBB', key: '1-1-2-3',  level: 2},
          ],
        },
        {
          title: '销售组',
          key: '2-1',
          level: 1,
          children: [{title: '销售组1', key: '1-2-1', level: 2}],
        },
      ],
    },
  ];
  args['dialogCode'] = `html代码
  <ng-template #dialogPanel>
    <hy-form>
      <hy-gt model="hyapi" flex="300px" [noBorder]="true">
        <hy-button title="关闭弹窗" (onClick)="closeDialog()"></hy-button>
        <hy-button title="修改弹窗配置" (onClick)="uploadConfig()"></hy-button>
        <hy-button title="还原弹窗配置" (onClick)="restoreConfig()"></hy-button>
      </hy-gt>
    </hy-form>
  </ng-template>

  ts代码
  // 显示弹窗
  const panel = $hyapi.dialog.show(dialogPanel,{
    width:450
  });

  // 关闭弹窗
  $hyapi.dialog.close(panel);

  // 修改弹窗配置
  $hyapi.dialog.updateConfig(panel,{width:500,closable:true});

  // 还原弹窗配置
  $hyapi.dialog.updateConfig(panel,{width:450,closable:false});
  `
  return {
    props: args,
    template: `
      <div style="border:1px solid #ddd;padding:10px;margin-bottom:10px">
        <h3>弹出窗</h3>
        <button nz-button nzType="default" (click)="openDialog(dialogPanel)">$hyapi.dialog.show</button>
        <h3>代码如下：</h3>
        <pre style="margin:0px"><code>{{dialogCode}}</code></pre>
        <ng-template #dialogPanel>
          <hy-form>
            <hy-button title="关闭弹窗" (onClick)="closeDialog()"></hy-button>
            <hy-button title="修改弹窗配置" (onClick)="uploadConfig()"></hy-button>
            <hy-button title="还原弹窗配置" (onClick)="restoreConfig()"></hy-button>
          </hy-form>
        </ng-template>
      </div>
    `,
  }
};
export const panel3: Story = Template3.bind({});
panel3.storyName = '弹出窗';

// post请求下载文件
const Template4: Story= (args: any) => {
  args['download'] = ()=>{
    $hyapi.io.download('http://10.40.92.15:3001/storybook/downloadFile',{});
  }
  args['downloadCode'] =`$hyapi.io.download(url,{});`;
  return {
    props: args,
    template: `
    <div style="border:1px solid #ddd;padding:10px;margin-bottom:10px">
      <h3>下载文件</h3>
      <button nz-button (click)="download()">请求加密</button>
      <h3>代码如下：</h3>
      <pre style="margin:0px"><code>{{downloadCode}}</code></pre>
      加密说明：当业务需要加密某个传参字段时，需要在post请求中，设置secret为true，然后传入需要加密的数组‘encryptKeys’（传参格式参考上面的示例）。
    </div>`,
  }
};
export const panel4: Story = Template4.bind({});
panel4.storyName = 'post请求下载文件';


// $获取服务器时间
const Template5: Story= (args: any) => {
  args['getTime'] = async ()=>{
    console.log(new ServerTimeService().getServerTime());
  }
  args['getTimeCode'] =`
  // 引入服务器时间服务
  import { ServerTimeService } from 'hy-frame';

  // 注册服务
  constructor(publish serverTimeService:ServerTimeService) { }

  // 使用服务
  ngOnInit(): void {
    const time = this.serverTimeService.getServerTime();
  }
  `;
  return {
    props: args,
    template: 
    `<div style="border:1px solid #ddd;padding:10px;margin-bottom:10px">
      <h3>获取服务器时间</h3>
      <i>请打开控制台</i>
      <br>
      <button nz-button (click)="getTime()">获取服务器时间（美国时间）</button>
      <h3>代码如下：</h3>
      <pre style="margin:0px"><code>{{getTimeCode}}</code></pre>
    </div>`,
  }
};
export const panel5: Story = Template5.bind({});
panel5.storyName = '获取服务器时间';

// 对话窗
const Template6: Story= (args: any) => {
  args['mgsPanel'];
  args['openMsg'] = () => {
    $hyapi.msg.confirm('对话内容',{
      callback() {
        console.log('点击了确认按钮');
      },
      cancel() {
        console.log('点击了取消按钮');
      }
    });
  };
  args['openTemplateMsg'] = (template) => {
    $hyapi.msg.confirm(template,{
      callback() {
        console.log('点击了确认按钮');
      },
      cancel() {
        console.log('点击了取消按钮');
      }
    });
  };

  args['msgCode'] = `ts代码
  // 显示弹窗
  openMsg() {
    $hyapi.msg.confirm('对话内容',{
      callback:()=> {
        console.log('点击了确认按钮');
      },
      cancel:()=> {
        console.log('点击了取消按钮');
      }
    });
  }

  `
  return {
    props: args,
    template: `
      <div style="border:1px solid #ddd;padding:10px;margin-bottom:10px">
        <h3>弹出窗</h3>
        <button nz-button nzType="default" (click)="openMsg()">$hyapi.msg.confirm</button>
        <h3>代码如下：</h3>
        <pre style="margin:0px"><code>{{msgCode}}</code></pre>
      </div>
      <div style="border:1px solid #ddd;padding:10px;margin-bottom:10px">
        <h3>弹出窗</h3>
        <button nz-button nzType="default" (click)="openTemplateMsg(msgTemplate)">$hyapi.msg.confirm</button>
        <ng-template #msgTemplate>
          <div>提示内容</div>
          <div style="color:red">详情内容</div>
        </ng-template>
        <h3>代码如下：</h3>
        <pre style="margin:0px"><code>{{msgCode}}</code></pre>
      </div>
    `,
  }
};
export const panel6: Story = Template6.bind({});
panel6.storyName = '对话窗';

// 信息提示框
const Template7: Story= (args: any) => {
  args['mgsPanel'];
  args['openMsg'] = (type) => {
    $hyapi.msg.show(type,'提示内容');
  };

  args['msgCode'] = `ts代码
  // 成功弹窗
  openMsg() {
    $hyapi.msg.show('success','提示内容');
  }
  // 警告弹窗
  openMsg() {
    $hyapi.msg.show('warning','提示内容');
  }
  // 失败弹窗
  openMsg() {
    $hyapi.msg.show('error','提示内容');
  }
  // 信息弹窗
  openMsg() {
    $hyapi.msg.show('info','提示内容');
  }
  `
  return {
    props: args,
    template: `
      <div style="border:1px solid #ddd;padding:10px;margin-bottom:10px">
        <h3>信息提示框</h3>
        <button nz-button nzType="default" (click)="openMsg('success')">成功弹窗</button>
        <button nz-button nzType="default" (click)="openMsg('warning')">警告弹窗</button>
        <button nz-button nzType="default" (click)="openMsg('error')">失败弹窗</button>
        <button nz-button nzType="default" (click)="openMsg('info')">信息弹窗</button>
        <h3>代码如下：</h3>
        <pre style="margin:0px"><code>{{msgCode}}</code></pre>
      </div>
    `,
  }
};
export const panel7: Story = Template7.bind({});
panel7.storyName = '信息提示框';

// window.open
const Template8: Story= (args: any) => {
  args['mgsPanel'];
  args['openMsg'] = (type) => {
    $hyapi.window.open('https://www.baidu.com?key=asdasdasd&aaaa=2222&')
  };

  args['msgCode'] = `ts代码
  // 成功弹窗
  openMsg() {
    $hyapi.msg.show('success','提示内容');
  }
  // 警告弹窗
  openMsg() {
    $hyapi.msg.show('warning','提示内容');
  }
  // 失败弹窗
  openMsg() {
    $hyapi.msg.show('error','提示内容');
  }
  // 信息弹窗
  openMsg() {
    $hyapi.msg.show('info','提示内容');
  }
  `
  return {
    props: args,
    template: `
      <div style="border:1px solid #ddd;padding:10px;margin-bottom:10px">
        <h3>信息提示框</h3>
        <button nz-button nzType="default" (click)="openMsg('success')">成功弹窗</button>
        <button nz-button nzType="default" (click)="openMsg('warning')">警告弹窗</button>
        <button nz-button nzType="default" (click)="openMsg('error')">失败弹窗</button>
        <button nz-button nzType="default" (click)="openMsg('info')">信息弹窗</button>
        <h3>代码如下：</h3>
        <pre style="margin:0px"><code>{{msgCode}}</code></pre>
      </div>
    `,
  }
};
export const panel8: Story = Template8.bind({});
panel8.storyName = 'window.open';