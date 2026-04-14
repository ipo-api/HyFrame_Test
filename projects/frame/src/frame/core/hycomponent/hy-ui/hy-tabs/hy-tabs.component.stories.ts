import { moduleMetadata } from '@storybook/angular';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { HyTabsComponent } from './hy-tabs.component';
import { BaseModule } from '../../../../base/base.module';
import { unit } from '../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { StoriesTabsModule } from '../../../../../../../../stories/storiesTabs.module';
import { Panel1Component } from '../../../../../../../../stories/demo/hy-tabs/panel1.component';
import { Panel2Component } from '../../../../../../../../stories/demo/hy-tabs/panel2.component';
import { Panel1Test1Component } from 'stories/demo/hy-tabs/panel1-test1.component';
import { Panel1Test2Component } from 'stories/demo/hy-tabs/panel1-test2.componen';


const routes: Routes = [

  {
    path: 'panel1',
    component: Panel1Component,
    children:[
      {
        path: 'panel1-test1',
        component:Panel1Test1Component
      },
      {
        path: 'panel1-test2',
        component:Panel1Test2Component
      }
    ]
  },
  {
    path: 'panel2',
    component: Panel2Component
  },
]
const argTypes = unit.createArgTypes('HyTabsComponent');
export default {
  title: '基础组件/hy-tabs（标签页）',
  component: HyTabsComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, RouterModule.forRoot(routes), StoriesTabsModule],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
      ]
    })
  ],
  argTypes
} as Meta;

// 本地卡片模式
const panelCardData = {
  tabs: [
    { title: '面板1', id: '1' },
    { title: '面板2', id: '2' },
  ],
  type:'card'
};
const TemplateCard: Story<HyTabsComponent> = (args: HyTabsComponent) => ({
  props: args,
  template: `<hy-tabs [tabs]="tabs" (clickTab)="clickTab($event)" [type]="type" (curActiveIndexChange)="curActiveIndexChange($event)">
    <ng-template let-item="item" let-index="index">
      <div *ngIf="item.id === '1'">面板1</div>
      <div *ngIf="item.id === '2'">面板2</div>
    </ng-template>
  </hy-tabs>`
});

export const panelCard = TemplateCard.bind({});
panelCard.args = panelCardData;
panelCard.storyName = '本地卡片模式';

// 本地卡片模式
const panelCardLeftData = {
  tabs: [
    { title: '面板1', id: '1' },
    { title: '面板2', id: '2' },
  ],
  type:'card',
  isVertical:true
};
const TemplateCardLeft: Story<HyTabsComponent> = (args: HyTabsComponent) => ({
  props: args,
  template: `<hy-tabs [tabs]="tabs" (clickTab)="clickTab($event)" [type]="type" [isVertical]="isVertical" (curActiveIndexChange)="curActiveIndexChange($event)">
    <ng-template let-item="item" let-index="index">
      <div *ngIf="item.id === '1'">面板1</div>
      <div *ngIf="item.id === '2'">面板2</div>
    </ng-template>
  </hy-tabs>`
});

export const panelCardLeft = TemplateCardLeft.bind({});
panelCardLeft.args = panelCardLeftData;
panelCardLeft.storyName = '本地卡片侧边模式';

// 本地线条模式
const panelLineData = {
  tabs: [
    { title: '面板1', id: '1',count:9999 },
    { title: '面板2', id: '2' },
  ],
  type:'line',
  isVertical:false
};
const TemplateLine: Story<HyTabsComponent> = (args: HyTabsComponent) => ({
  props: args,
  template: `<hy-tabs [tabs]="tabs" (clickTab)="clickTab($event)" [type]="type" [isVertical]="isVertical" (curActiveIndexChange)="curActiveIndexChange($event)">
    <ng-template let-item="item" let-index="index">
      <div *ngIf="item.id === '1'">面板1</div>
      <div *ngIf="item.id === '2'">面板2</div>
    </ng-template>
  </hy-tabs>`
});

export const panelLine = TemplateLine.bind({});
panelLine.args = panelLineData;
panelLine.storyName = '本地线条模式';

// 本地线条侧边模式
const panelLineLeftData = {
  tabs: [
    { title: '面板1', id: '1' },
    { title: '面板2', id: '2' },
  ],
  type:'line',
  isVertical:true
};
const TemplateLineLeft: Story<HyTabsComponent> = (args: HyTabsComponent) => ({
  props: args,
  template: `<hy-tabs [tabs]="tabs" (clickTab)="clickTab($event)" [type]="type" [isVertical]="isVertical" (curActiveIndexChange)="curActiveIndexChange($event)">
  <ng-template let-item="item" let-index="index">
    <div *ngIf="item.id === '1'">面板1</div>
    <div *ngIf="item.id === '2'">面板2</div>
  </ng-template>
</hy-tabs>`
});
export const panelLineLeft = TemplateLineLeft.bind({});
panelLineLeft.args = panelLineLeftData;
panelLineLeft.storyName = '本地线条侧边模式';

// 路由模式面板↓
const Template2: Story<HyTabsComponent> = (args: HyTabsComponent) => ({
  props: args,
  template: '<hy-tabs [tabs]="tabs" (clickTab)="clickTab($event)" (curActiveIndexChange)="curActiveIndexChange($event)"></hy-tabs>'
});
export const panel2 = Template2.bind({});
panel2.args = {
  tabs: [
    { title: '面板1', url: '/panel1' },
    { title: '面板2', url: '/panel2' },
  ]
};
panel2.storyName = '路由模式';

// 含关闭按钮的tabs页
const panelData3 = {
  tabs: [
    { title: '面板1', id: '1' },
    { title: '面板2', id: '2' },
  ]
};
const Template3: Story<HyTabsComponent> = (args: HyTabsComponent) => ({
  props: args,
  template: `
  <strong>关闭某个标签后，[tabs]减少一条的数据会实时同步到父级</strong>
  <br>
  <strong>[noCloseTip]属性控制点击关闭页签时是否提示</strong>
  <br>
  <strong>[closeTip]属性自定义关闭页签时提示的信息</strong>
  <hy-tabs [(tabs)]="tabs" (clickTab)="clickTab($event)" [isShowClose]="true" [noCloseTip]="false" (curActiveIndexChange)="curActiveIndexChange($event)">
    <ng-template let-item="item" let-index="index">
      <div *ngIf="item.id === '1'">面板1</div>
      <div *ngIf="item.id === '2'">面板2</div>
    </ng-template>
  </hy-tabs>
  `
});
export const panel3 = Template3.bind({});
panel3.args = panelData3;
panel3.storyName = '含关闭按钮的tabs页';

// tabs页的右键操作模板
const panelData4 = {
  tabs: [
    { title: '面板1', id: '1' },
    { title: '面板2', id: '2' },
  ]
};
const Template4: Story<HyTabsComponent> = (args: HyTabsComponent) => ({
  props: args,
  template: `
  <hy-tabs [(tabs)]="tabs" (clickTab)="clickTab($event)" [isShowClose]="true" [operationTemplate]="operationTemplate" (curActiveIndexChange)="curActiveIndexChange($event)">
    <ng-template let-item="item" let-index="index">
      <div *ngIf="item.id === '1'">面板1</div>
      <div *ngIf="item.id === '2'">面板2</div>
    </ng-template>
  </hy-tabs>

  <!-- tabs的右键弹出模板start -->
    <ng-template #operationTemplate let-index="index" let-item="item">
      <hy-list-btn title="复制当前页签" [item]="item" (onClick)="copy(item)"></hy-list-btn>
      <hy-list-btn title="关闭标签页" [item]="item" (onClick)="del(item)"></hy-list-btn>
      <hy-list-btn title="修改标签名" [item]="item" (onClick)="edit(item)"></hy-list-btn>
      <hy-list-btn title="刷新链接" [item]="item" (onClick)="refresh(item,index)"></hy-list-btn>
    </ng-template>
  <!-- tabs的右键弹出模板end -->
  `
});
export const panel4 = Template4.bind({});
panel4.args = panelData4;
panel4.storyName = 'tabs页的右键操作模板';


// tab页嵌套tab页
const panelLineLeftAndCardData = {
  tabs: [
    { title: '面板1', id: '1' },
    { title: '面板2', id: '2' },
  ],
  tabs2: [
    { title: '子级面板1', id: 'c1' },
    { title: '子级面板2', id: 'c2' },
  ],
  type:'card'
};
const TemplateLineLeftAndCard: Story<HyTabsComponent> = (args: HyTabsComponent) => ({
  props: args,
  template: `
  <hy-tabs [tabs]="tabs" (clickTab)="clickTab($event)" [type]="type" (curActiveIndexChange)="curActiveIndexChange($event)">
    <ng-template let-item="item" let-index="index">
      <div *ngIf="item.id === '1'">面板1
        <hy-tabs [tabs]="tabs2" (clickTab)="clickTab($event)" type="line" [isVertical]="true" (curActiveIndexChange)="curActiveIndexChange($event)">
          <ng-template let-item2="item" let-index2="index">
            <div *ngIf="item2.id === 'c1'">子级面板1</div>
            <div *ngIf="item2.id === 'c2'">子级面板2</div>
          </ng-template>
        </hy-tabs>
      </div>
      <div *ngIf="item.id === '2'">面板2</div>
    </ng-template>
  </hy-tabs>
  `
});
export const panelLineLeftAndCard = TemplateLineLeftAndCard.bind({});
panelLineLeftAndCard.args = panelLineLeftAndCardData;
panelLineLeftAndCard.storyName = 'tab嵌套tab';

// 含关闭按钮的tabs页
const panelData6 = {
  tabs: [
    { title: '面板1', id: '1', isShowClose:false },
    { title: '面板2', id: '2' },
  ]
};
const Template6: Story<HyTabsComponent> = (args: HyTabsComponent) => ({
  props: args,
  template: `
  <strong>关闭某个标签后，[tabs]减少一条的数据会实时同步到父级</strong>
  <br>
  <strong>[noCloseTip]属性控制点击关闭页签时是否提示</strong>
  <br>
  <strong>[closeTip]属性自定义关闭页签时提示的信息</strong>
  <hy-tabs [(tabs)]="tabs" (clickTab)="clickTab($event)" (addTab)="addTab()" type="editable-card" [isShowClose]="true" [noCloseTip]="false" (curActiveIndexChange)="curActiveIndexChange($event)">
    <ng-template let-item="item" let-index="index">
      <div *ngIf="item.id === '1'">面板1</div>
      <div *ngIf="item.id === '2'">面板2</div>
    </ng-template>
  </hy-tabs>
  `
});
export const panel6 = Template6.bind({});
panel6.args = panelData6;
panel6.storyName = '自定义新增、删除tabs页';


