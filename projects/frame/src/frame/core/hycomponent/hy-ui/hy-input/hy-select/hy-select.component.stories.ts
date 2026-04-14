import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HySelectComponent } from './hy-select.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { ModelService } from '../../../../common/domain/service/model.service';
import { TableService } from '../../../../common/domain/service/hytable.service';
import { $hyapi, DicService } from '../../../../_index';

let _this;

class MockPricingService implements Partial<ModelService> {
  private $dicCache: any = {};

  public tableServiceMap: any = {};

  constructor() {
    _this = this;
    setTimeout(() => {
      // _this['gt_test']['select2'] = ['0'];
      _this['gt_test']['time2'] = ['1','2','3','4','5','6'];

      _this['gt_test']['bigDataMultipleSelect'] = ['5','998'];
      $hyapi.dic.getFromServer('dd_bigData', _this, {}, (e) => {
        $hyapi.dic.cache({name:'tt_bigData',value:e})
      })
      // $hyapi.dic.getFromCache('dd_bigData',)
    
    }, 10);
  }

  pushDic(dic: any) {
    if (dic && dic.name) {
      this.$dicCache[dic.name] = dic.value;
    }
  }

  getDic(dicName: string) {
    return this.$dicCache[dicName];
  }
}


const argTypes = unit.createArgTypes('HySelectComponent');
const labelString = unit.createLabel('hy-select', argTypes);
export default {
  title: '表单组件/hy-select（选择器）',
  component: HySelectComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService, useClass: MockPricingService }, TableService]
    }),
  ],
  argTypes
} as Meta;

const Template: Story<HySelectComponent> = (args: HySelectComponent) => ({
  props: args,
  template: `
  <hy-form >
    <div style="height:500px;overflow:auto">
      <div style="height:600px;">
        <hy-gt model="test">
          ${labelString}</hy-select>
        </hy-gt>
      </div>
    </div>
  </hy-form>
  `
});
const data = {
  title: '选择器',
  cols: 24,
  ckRequired: true,
  dic: 'testWeek',
  enable: true,
  labelWidth: '120px',
  size: 'default',
  model: 'select',
};
export const panel = Template.bind({});
panel.args = data;
panel.storyName = '字典数据';

// 自定义数据
const Template2: Story<HySelectComponent> = (args: HySelectComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test" cols="12">
      ${labelString}</hy-select>
    </hy-gt>
  </hy-form>
  `
});
const data2 = {
  title: '选择器',
  ckRequired: true,
  multiple: true,
  cols: 24,
  items: [
    { id: '1', text: '第一条数据' },
    { id: '2', text: '第二条数据' },
  ],
  enable: true,
  labelWidth: '120px',
  size: 'default',
  model: 'select'
};
export const panel2 = Template2.bind({});
panel2.args = data2;
panel2.storyName = '自定义数据';

// 传入模板
const Template3: Story<HySelectComponent> = (args: HySelectComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test">
    ${labelString}</hy-select>
      <ng-template #explainText>
        <hy-button title="新增" type="link"></hy-button>
      </ng-template>
    </hy-gt>
  </hy-form>
  `
});
const data3 = {
  title: '选择器',
  ckRequired: false,
  cols: 24,
  items: [
    { id: '1', text: '第一条数据' },
    { id: '2', text: '第二条数据' },
  ],
  enable: true,
  labelWidth: '120px',
  size: 'default',
};
export const panel3 = Template3.bind({});
panel3.args = data3;
panel3.storyName = '传入模板';

/** 多选 */
const Template4: Story<HySelectComponent> = (args: HySelectComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test">
     ${labelString}</hy-select>
     <hy-button title="按钮" (onClick)="onClick()"></hy-button>
    </hy-gt>

  </hy-form>
  `
});
export const panel4 = Template4.bind({});
panel4.args = {
  title: '选择器',
  ckRequired: true,
  cols: 10,
  dic: 'testWeek',
  enable: true,
  labelWidth: '120px',
  mode: 'multiple',
  size: 'default',
  maxTagCount: 3
};
panel4.storyName = '多选模式';

/** 大数据模式 */
const Template5: Story<HySelectComponent> = (args: HySelectComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test">
      ${labelString}</hy-select>
    </hy-gt>
  </hy-form>
  `
});
const data5 = {
  model: 'bigDataSelect',
  title: '选择器',
  ckRequired: true,
  cols: 24,
  dic: 'bigData',
  enable: true,
  labelWidth: '120px',
  size: 'default',
  maxTagCount: 3
};
export const panel5 = Template5.bind({});
panel5.args = data5;
panel5.storyName = '大数据模式';

/** 大数据多选模式 */
const Template6: Story<HySelectComponent> = (args: HySelectComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test">
      <hy-select [ckRequired]="true" model="bigDataMultipleSelect" [maxTagCount]="3" mode="multiple" title="title" dic="bigData"></hy-select>
      <hy-select model="bigDataMultipleSelect1" mode="nowrapMultiple" title="title" dic="testWeek" cols="24"></hy-select>
      <hy-select model="bigDataMultipleSelect1" mode="nowrapMultiple" title="title" dic="bigData" cols="24"></hy-select>
    </hy-gt>
  </hy-form>
  `
});
const data6 = {

};
export const panel6 = Template6.bind({});
panel6.args = data6;
panel6.storyName = '大数据多选模式';


/** 动态字典 */
const Template7: Story<any> = (args: any) => {
  args['change'] = (e) => {
    if (e === '2') {
      $hyapi.dic.getFromServer('dd_bigData', _this, {}, (e) => {
        $hyapi.dic.cache({ 'name': 'tt_item', value: e }, _this);
      })
    }else{
      $hyapi.dic.cache({ 'name': 'tt_item', value: [] }, _this);
    }
  }
  args['changeDD'] = e =>{
    const data = {'id':'1'};
    $hyapi.dic.getFromServer('dd_testWeek', _this, data)
    setTimeout(() => {
      console.log(data);
    }, 1000);
  }
  args['changeBigData'] = e =>{
    $hyapi.dic.getFromServer('dd_bigData', _this, {}, (e) => {
      // $hyapi.dic.cache({name:'tt_bigData',value:e})
    })
  }
  args['changeBigData2'] = e =>{
    $hyapi.dic.getFromServer('dd_bigData', _this,{id:'5'}, (e) => {
      // console.log(e);
      // $hyapi.dic.cache({name:'tt_bigData',value:e})
    })
  }
  return {
    props: args,
    template: `
    <hy-form>
      <hy-gt model="test">
        <hy-select cols="24" title="时间类型" dic="testTimeType" model="timeType" (onChange)="change($event)"></hy-select>
        <hy-select cols="24" title="大数据" dic="dd_bigData" (onChange)="change($event)"></hy-select>
        <hy-select cols="24" title="大数据2" dic="tt_bigData"  (onChange)="change($event)"></hy-select>
        <hy-select cols="24" dic="tt_item" model="time" title="动态字典"></hy-select>
      </hy-gt>
      <hy-button title="改变动态字典的值" (onClick)="changeDD()"></hy-button>
      <hy-button title="改变大数据动态字典的值" (onClick)="changeBigData()"></hy-button>
      <hy-button title="改变大数据动态字典的值2" (onClick)="changeBigData2()"></hy-button>
    </hy-form>
    `
  }
};
const data7 = {

};
export const panel7 = Template7.bind({});
panel7.args = data7;
panel7.storyName = '动态字典';

// 多选不换行模式
const Template8: Story<HySelectComponent> = (args: HySelectComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="test">
      <hy-select [enable]="true" title="多选不换行模式" cols="24" [allowClear]="true" mode="nowrapMultiple" dic="testLogin" model="select" (onChange_model)="onChange_model($event)"></hy-select>
      <hy-select [enable]="true" title="多选不换行模式" cols="24" [allowClear]="false" mode="nowrapMultiple" dic="testWeek" model="select2" (onChange_model)="onChange_model($event)"></hy-select>
    </hy-gt>
  </hy-form>
  `
});
export const panel8 = Template8.bind({});
panel8.storyName = '多选不换行模式';

// tip模板
const Template9: Story<HySelectComponent> = (args: HySelectComponent) => ({
  props: args,
  template:`
  <hy-form>
    <hy-gt model="test">
      <hy-select cols="12" title="传入提示" model="text" [tip]="'这是提示'"></hy-select>
      <hy-select cols="24" title="传入提示" model="text2" tipType="bottomTip" [tip]="'Multiple selection without line wrapping mode'"></hy-select>
      <hy-select cols="12" title="传入提示模板" model="text" [tip]="tip"></hy-select>
      <hy-select cols="24" title="传入提示模板" model="text2" tipType="bottomTip" [tip]="tip"></hy-select>
    </hy-gt>
  </hy-form>

  <ng-template #tip>
    <div style="width:500px;border:1px solid">这是提示模板1</div>
    <div>这是提示模板2</div>
    <div>这是提示模板3</div>
  </ng-template>
  `
});
export const panel9 = Template9.bind({});
panel9.storyName = 'tip模板';

// 是否允许新增数据
const Template10: Story<HySelectComponent> = (args: HySelectComponent) => ({
  props: args,
  template:`
  <hy-form>
    <hy-gt model="test">
      <hy-select 
        [isAddItem]="true"
        cols="24" 
        title="默认模式" 
        model="select1" 
        dic="testWeek" 
        addItemButtonNzIconName="plus"
        addItemTextCkMaxLength="10"
        addItemTextCkMinLength="3"
        (onClickAddItem)="onClickAddItem($event)"
      ></hy-select>
      <hy-select 
        [isAddItem]="true"
        cols="24" 
        title="大数据模式" 
        model="select2" 
        dic="bigData" 
        addItemButtonNzIconName="plus"
        addItemTextCkMaxLength="10"
        addItemTextCkMinLength="3"
        (onClickAddItem)="onClickAddItem($event)"
      ></hy-select>
      <hy-select 
        [isAddItem]="true"
        cols="24" 
        title="大数据模式2" 
        model="select10" 
        dic="bigData" 
        addItemButtonNzIconName="plus"
        addItemTextCkMaxLength="10"
        addItemTextCkMinLength="3"
        (onClickAddItem)="onClickAddItem($event)"
      ></hy-select>
      <hy-select 
        [isAddItem]="true"
        cols="24" 
        title="多选模式"
        mode="multiple"
        model="select3" 
        dic="testWeek" 
        addItemButtonNzIconName="plus"
        addItemTextCkMaxLength="10"
        addItemTextCkMinLength="3"
        (onClickAddItem)="onClickAddItem($event)"
      ></hy-select>
      <hy-select 
        [isAddItem]="true"
        cols="24" 
        title="多选不换行模式"
        mode="nowrapMultiple"
        model="select4" 
        dic="testWeek" 
        addItemButtonNzIconName="plus"
        (onClickAddItem)="onClickAddItem($event)"
      ></hy-select>
      <hy-select 
        [isAddItem]="true"
        cols="24" 
        title="不校验新增数据"
        model="select5" 
        dic="testWeek" 
        [addItemTextCkRequired]="false"
        (onClickAddItem)="onClickAddItem($event)"
      ></hy-select>
    </hy-gt>
  </hy-form>
  `
});
export const panel10 = Template10.bind({});
panel10.storyName = '是否允许新增数据模板';
