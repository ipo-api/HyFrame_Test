import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../../base/base.module';
import { HyGtComponent } from './hy-gt.component';
import { unit } from '../../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService, TableService } from '../../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';


const argTypes = unit.createArgTypes('HyGtComponent');
let labelString = unit.createLabel('hy-gt', argTypes);
argTypes['errorMessage'].control.type = 'object';
argTypes['class'].control.type = 'check';
argTypes['class'].control.options = ['noBorder', 'grayTitle', 'bgTransparent', 'gtStyle1'];

export default {
  title: '表单组件/hy-gt（表单组）',
  component: HyGtComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [{ provide: ModelService }, TableService]
    }),
  ],
  argTypes
} as Meta;

labelString = labelString.replace('[formValid]="formValid"', '[(formValid)]="formValid"');
labelString = labelString.replace('[formPristine]="formPristine"', '[(formPristine)]="formPristine"');
const Template: Story<HyGtComponent> = (args: HyGtComponent) => ({
  props: args,
  template: `
  valid:{{valid}}
  pristine:{{pristine}}

  <div style="border:1px solid">
  <p>这三个gt同属于一个form内部，所以第一个gt内部的hy-button是受到当前这个form表单影响的</p>
  <hy-form [(formValid)]="valid" [(formPristine)]="pristine">
      <hy-button title="按钮" [enable]="true" [check]="false" (onClick)="isShow = !isShow"></hy-button>
      <hy-gt *ngIf="isShow" model="hygt1" title="gt1" [cols]="24" [(formValid)]="formValid" [(formPristine)]="formPristine">
        <hy-text title="test" model="test" tip="提示" cols="12" [ckRequired]="true"></hy-text>
        <hy-text title="test2-1" model="test2"></hy-text>
      </hy-gt>
      <hy-gt *ngIf="!isShow" model="hygt1" title="gt1" [cols]="24" [(formValid)]="formValid" [(formPristine)]="formPristine">
        <hy-text title="test" model="test" tip="提示" cols="12" [ckRequired]="true"></hy-text>
        <hy-text title="test2-2" model="test2"></hy-text>
      </hy-gt>
      {{formValid2}}
      <hy-gt model="hygt2" title="gt2" [cols]="24" [(formValid)]="formValid2" [(formPristine)]="formPristine2">
        <hy-text title="test" model="test" tip="提示" ></hy-text>
        <hy-text title="test2" model="test2"></hy-text>
      </hy-gt>
      {{formValid3}}
      <hy-gt model="hygt3" [cols]="24" title="gt3" [(formValid)]="formValid3">
        <hy-text title="test" model="test" tip="提示" [ckRequired]="true"></hy-text>
        <hy-text title="test2" model="test2"></hy-text>
      </hy-gt>
      <hy-button title="按钮1" (onClick)="onClick()"></hy-button>
      按钮验证统一跟随整个表单的验证，不跟随gt内验证
    </hy-form>
  </div>
  <hy-form [(formValid)]="valid2" [(formPristine)]="pristine2">
    <hy-gt model="hygt4" title="gt4" [cols]="24" >
      <hy-text title="test" model="test" tip="提示" [ckRequired]="true"></hy-text>
      <hy-text title="test2" model="test2"></hy-text>
    </hy-gt>
    <hy-button title="按钮2" (onClick)="onClick()" ></hy-button>
  </hy-form>
  `
});

export const panel = Template.bind({});
panel.args = {
  isShow: true,
  showTip: true,
  title: 'gt1',
  tip: '提示',
  model: 'hygt',
  cols: '24',
  formValid3: false,
  formValid2: false,
  formValid: false,
  formPristine: true,
  formPristine2: true,
  valid: false,
  pristine: true,
  valid2: false,
  pristine2: true
};
panel.storyName = 'gt模版';

const Template2: Story<HyGtComponent> = (args: any) => {
  args['onClick'] = () => {
    console.log(args)
  }
  return {
    props: args,
    template: `
    <hy-form>
      ${labelString}
        <hy-text title="test" model="test" tip="提示"></hy-text>
        <hy-select title="1111" model="test2"></hy-select>
        <hy-button title="按钮" (onClick)="onClick()"></hy-button>
      </hy-gt>
    </hy-form>
    `
  }
};

export const panel2 = Template2.bind({});
panel2.args = {
  errorMessage: {
    gtName: 'gt_hygt',
    errorData: [
      {
        modelName: 'test2',
        message: '错误信息'
      },
      {
        modelName: 'test',
        message: '错误信息'
      },
    ]
  },
  title: 'gt错误提示模版',
  tip: '提示',
  model: 'hygt'
};
panel2.storyName = 'gt错误提示模版';

const Template3: Story<HyGtComponent> = (args: HyGtComponent) => ({
  props: args,
  template: `
  <hy-form>
    ${labelString}
      <hy-text title="test" model="test" tip="提示"></hy-text>
      <hy-text title="test2" model="test2"></hy-text>
      <hy-button title="按钮" (onClick)="onClick()"></hy-button>
    </hy-gt>
  </hy-form>
  `
});
export const panel3 = Template3.bind({});
panel3.args = {
  flex: '200px',
  model: 'hygt',
  title: 'gt模版',
  tip: '提示'
};
panel3.storyName = 'gt模版（flex布局）';

const Template6: Story<HyGtComponent> = (args: HyGtComponent) => ({
  props: args,
  template: `
  <hy-form>
    ${labelString}
      <hy-text flex="200px" title="test" model="test" tip="提示"></hy-text>
      <hy-text flex="250px" title="test2" model="test2"></hy-text>
      <hy-button title="按钮" (onClick)="onClick()"></hy-button>
    </hy-gt>
  </hy-form>
  `
});
export const panel6 = Template6.bind({});
panel6.args = {
  title: 'gt模版',
  model: 'hygt'
};
panel6.storyName = 'gt模版（flex每个标签不同长度布局）';

const Template4: Story<HyGtComponent> = (args: HyGtComponent) => ({
  props: args,
  template: `
  <hy-form>
    ${labelString}
      <hy-text cols="12" title="test" model="test" tip="提示"></hy-text>
      <hy-text cols="12" title="test2"  model="test2"></hy-text>
      <hy-button title="按钮" (onClick)="onClick()"></hy-button>
    </hy-gt>
  </hy-form>
  `
});
export const panel4 = Template4.bind({});
panel4.args = {
  model: 'hygt',
  title: 'gt模版'
}
panel4.storyName = 'gt模版（cols单行对半布局）';

const Template5: Story<HyGtComponent> = (args: HyGtComponent) => ({
  props: args,
  template: `
  <hy-form>
    ${labelString}
      <hy-text cols="24" title="test" model="test" tip="提示"></hy-text>
      <hy-text cols="24" title="test2"  model="test2"></hy-text>
      <hy-button title="按钮" (onClick)="onClick()"></hy-button>
    </hy-gt>
  </hy-form>
  `
});
export const panel5 = Template5.bind({});
panel5.args = {
  model: 'hygt',
  title: 'gt模版'
}
panel5.storyName = 'gt模版（cols换行布局）';

const Template7: Story<HyGtComponent> = (args: HyGtComponent) => ({
  props: args,
  template: `
  <hy-form>
    <hy-gt model="gtData" title="gt模板" cols="24">
      <hy-text title="text" model="text" [ckRequired]="true" [ckMaxLength]="10"></hy-text>
      <hy-select title="select" dic="testWeek" model="select" [ckRequired]="true"></hy-select>
      <hy-time title="time" model="time" [ckRequired]="true"></hy-time>
      <hy-date title="date" model="date" [ckRequired]="true"></hy-date>
      <hy-number title="number" model="number" [ckRequired]="true"></hy-number>
      <hy-radio title="radio" model="radio" [items]="[{id:'1',text:'test1'},{id:'2',text:'test2'}]" [ckRequired]="true"></hy-radio>
      <hy-date title="date" model="date" [ckRequired]="true"></hy-date>
      <hy-slider title="slider" model="slider" [ckRequired]="true"></hy-slider>
      <hy-treeSelect title="treeSelect" model="treeSelect" [datas]="tree" [ckRequired]="true"></hy-treeSelect>
      <hy-checkbox title="checkbox" dic="testWeek" model="checkbox" [ckRequired]="true"></hy-checkbox>
      <hy-toggle title="开关" model="toggle"></hy-toggle>
      <hy-transfer [ckRequired]="true" title="穿梭框" model="transferOne" [data]="transferData"></hy-transfer>
    </hy-gt>
    <hy-button title="校验按钮"></hy-button>
  </hy-form>
  `
});
export const panel7 = Template7.bind({});
panel7.args = {
  model: 'hygt',
  title: 'gt模版',
  transferData:[
    {id:1,title:1,nzIconName:'check'},
    {id:2,title:2,nzIconName:'check'}
  ],
  tree: [
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
            { title: '研发组1aaBB', key: '1-1-1', level: 2 },
            { title: '研发组2', key: '1-1-2', level: 2 },
          ],
        },
        {
          title: '产品组',
          key: '1-1-3',
          level: 1,
          children: [
            { title: '产品组1', key: '1-1-2-1', level: 2 },
            { title: '产品组2', key: '1-1-2-2', level: 2, children: [{ title: '产品组2-1', key: '1-1-2-2-1', level: 3 }] },
          ],
        },
        {
          title: '销售组',
          key: '2-1',
          level: 1,
          children: [{ title: '销售组1', key: '1-2-1', level: 2 }],
        },
      ],
    },
  ]
}
panel7.storyName = 'gt模版（所有表单组件）';

// gt模板（动态表单）
const Template8: Story<HyGtComponent> = (args: any) => {
  args['onClick'] = () => {
    console.log(args.list)
    const newList = [{
      textModel: '3'
    }
    ]
    args.list = [...args.list, ...newList];
    console.log(args.list)
  }
  args['isShow'] = false;
  args['onChange_model'] = (value,isShow) => {
    console.log(value)
    if(value){
      isShow = true;
    }else{
      isShow = false;
    }
  }
  return {
    props: args,
    template: `
    <hy-form>
      <hy-gt model="hygt" cols="24">
        <div *ngFor="let item of list">
          <hy-text title="test" [model]="item.textModel" tip="提示" [ckRequired]="true"></hy-text>
        </div>
        <hy-button title="按钮" (onClick)="onClick()"></hy-button>
        <hy-button title="按钮2" (onClick)="onClick()" [check]="false"></hy-button>
      </hy-gt>
    </hy-form>
    <hy-form>
      <hy-gt model="hygt3" cols="24">
        <hy-text title="test" model="text1" tip="提示" [ckRequired]="true" [ckMaxLength]="4"></hy-text>
        <hy-text title="test" model="text2" tip="提示" [ckRequired]="true" (onChange_model)="isShow = $event"></hy-text>
        <hy-text title="test" model="text3" tip="提示" [ckRequired]="true" (onChange_model)="$event" *ngIf="isShow"></hy-text>
        {{isShow}}
      </hy-gt>
      <hy-button title="按钮" (onClick)="onClick()"></hy-button>
      <hy-button title="按钮2" (onClick)="onClick()" [check]="false"></hy-button>
    </hy-form>
    `
  }
};

export const panel8 = Template8.bind({});
panel8.args = {
  list: [
    {
      textModel: '1'
    },
    {
      textModel: '2'
    },
  ],
  title: 'gt错误提示模版',
  tip: '提示',
  model: 'hygt'
};
panel8.storyName = 'gt模板（动态表单）';

// gt模板（标题超出换行）
const Template9: Story<HyGtComponent> = (args: any) => {
  return {
    props: args,
    template: `
    <hy-form>
      <hy-gt model="gtData" title="Multiple selection without line wrapping mode" [cols]="24" [isLabelWrap]="true" labelWidth="140px">
        <hy-readonly title="Multiple selection without line wrapping mode" model="readonly"></hy-readonly>
        <hy-text title="node" model="text" [ckMaxLength]="10"></hy-text>
        <hy-select title="select-这是超出的文本后缀" dic="testWeek" model="select" [ckRequired]="true"></hy-select>
        <hy-time title="time-这是超出的文本后缀" model="time" [ckRequired]="true"></hy-time>
        <hy-date title="date-这是超出的文本后缀" model="date" [ckRequired]="true"></hy-date>
        <hy-number title="number-这是超出的文本后缀" model="number" [ckRequired]="true"></hy-number>
        <hy-radio title="radio-这是超出的文本后缀" model="radio" [items]="[{id:'1',text:'test1'},{id:'2',text:'test2'}]" [ckRequired]="true"></hy-radio>
        <hy-date title="date-这是超出的文本后缀" model="date" [ckRequired]="true"></hy-date>
        <hy-slider title="slider-这是超出的文本后缀" model="slider" [ckRequired]="true"></hy-slider>
        <hy-treeSelect title="treeSelect-这是超出的文本后缀" model="treeSelect" [datas]="tree" [ckRequired]="true"></hy-treeSelect>
        <hy-checkbox title="checkbox-这是超出的文本后缀" dic="testWeek" model="checkbox" [ckRequired]="true"></hy-checkbox>
        <hy-toggle title="开关-这是超出的文本后缀" model="toggle"></hy-toggle>
      </hy-gt>
    </hy-form>
    `
  }
};
export const panel9 = Template9.bind({});
panel9.storyName = 'gt模板（标题超出换行）';

// gt模板（标题超出换行）
const Template91: Story<HyGtComponent> = (args: any) => {
  return {
    props: args,
    template: `
    <hy-form>
      <hy-gt model="gtData" title="gt模板（标题超出换行）" cols="24" [isLabelWrap]="true" labelWidth="140px">
        <hy-readonly [noLabel]="true"  title="readonly-这是超出的文本后缀" model="readonly"></hy-readonly>
        <hy-text [noLabel]="true" title="node" model="text" [ckMaxLength]="10"></hy-text>
        <hy-textarea [noLabel]="true" title="textarea-这是超出的文本后缀" model="textarea" [ckRequired]="true"></hy-textarea>
        <hy-select [noLabel]="true" title="select-这是超出的文本后缀" dic="testWeek" model="select" [ckRequired]="true"></hy-select>
        <hy-time [noLabel]="true" title="time-这是超出的文本后缀" model="time" [ckRequired]="true"></hy-time>
        <hy-date [noLabel]="true" title="date-这是超出的文本后缀" model="date" [ckRequired]="true"></hy-date>
        <hy-number [noLabel]="true" title="number-这是超出的文本后缀" model="number" [ckRequired]="true"></hy-number>
        <hy-radio [noLabel]="true" title="radio-这是超出的文本后缀" model="radio" [items]="[{id:'1',text:'test1'},{id:'2',text:'test2'}]" [ckRequired]="true"></hy-radio>
        <hy-date [noLabel]="true" title="date-这是超出的文本后缀" model="date" [ckRequired]="true"></hy-date>
        <hy-slider [noLabel]="true" title="slider-这是超出的文本后缀" model="slider" [ckRequired]="true"></hy-slider>
        <hy-treeSelect [noLabel]="true" title="treeSelect-这是超出的文本后缀" model="treeSelect" [datas]="tree" [ckRequired]="true"></hy-treeSelect>
        <hy-checkbox [noLabel]="true" title="checkbox-这是超出的文本后缀" dic="testWeek" model="checkbox" [ckRequired]="true"></hy-checkbox>
        <hy-toggle [noLabel]="true" title="开关-这是超出的文本后缀" model="toggle"></hy-toggle>
        <hy-date [noLabel]="true" [isInitTime]="true" format="yyyy-MM-dd HH:mm" [enableStartTotay]="true" model="planTimeStr"></hy-date>
        <hy-radio model="modifyPlanType" [items]="[{id:'1',text:'test1'},{id:'2',text:'test2'}]" [noLabel]="true"></hy-radio>
        <hy-date [noLabel]="true" [isInitTime]="true" format="yyyy-MM-dd HH:mm" [enableStartTotay]="true" model="planTimeStr"></hy-date>
      </hy-gt>
    </hy-form>
    `
  }
};

export const panel91 = Template91.bind({});
panel91.storyName = 'gt模板（无标题）';

// gt模板（不同class的样式）
const Template92: Story<HyGtComponent> = (args: any) => {
  return {
    props: args,
    template: `
    <hy-form>
      <hy-gt model="gtData" title="class=gtStyle1" class="gtStyle1">
        <hy-text [noLabel]="true" title="node" model="text" [ckMaxLength]="10"></hy-text>
      </hy-gt>

      <hy-gt model="gtData" title="class=noBorder" class="noBorder">
        <hy-text [noLabel]="true" title="node" model="text" [ckMaxLength]="10"></hy-text>
      </hy-gt>

      <hy-gt model="gtData" title="class=grayTitle" class="grayTitle">
        <hy-text [noLabel]="true" title="node" model="text" [ckMaxLength]="10"></hy-text>
      </hy-gt>

      <hy-gt model="gtData" title="class=bgTransparent" class="bgTransparent">
        <hy-text [noLabel]="true" title="node" model="text" [ckMaxLength]="10"></hy-text>
      </hy-gt>
    </hy-form>
    `
  }
};

export const panel92 = Template92.bind({});
panel92.storyName = 'gt模板（不同class的样式）';

// gt模板（不同class的样式+glt）
const Template93: Story<HyGtComponent> = (args: any) => {
  return {
    props: args,
    template: `
    <hy-form>
      <div style="border: 1px solid #e4e4e4;">
        <hy-gt model="gtData" title="class=gtStyle1" class="gtStyle1">
          <hy-text [noLabel]="true" title="node" model="text" [ckMaxLength]="10"></hy-text>
        </hy-gt>
        <hy-glt model="gtData" title="class=gtStyle1" class="gtStyle1">
          <hy-text [noLabel]="true" title="node" model="text" [ckMaxLength]="10"></hy-text>
        </hy-glt>
      </div>

      <div style="border: 1px solid #e4e4e4;">
        <hy-gt model="gtData" title="class=noBorder" class="noBorder">
          <hy-text [noLabel]="true" title="node" model="text" [ckMaxLength]="10"></hy-text>
        </hy-gt>
        <hy-glt model="gtData" title="class=noBorder" class="noBorder">
          <hy-text [noLabel]="true" title="node" model="text" [ckMaxLength]="10"></hy-text>
        </hy-glt>
      </div>

      <div style="border: 1px solid #e4e4e4;">
        <hy-gt model="gtData" title="class=grayTitle" class="grayTitle">
          <hy-text [noLabel]="true" title="node" model="text" [ckMaxLength]="10"></hy-text>
        </hy-gt>
        <hy-glt model="gtData" title="class=grayTitle" class="grayTitle">
          <hy-text [noLabel]="true" title="node" model="text" [ckMaxLength]="10"></hy-text>
        </hy-glt>
      </div>

      <div style="border: 1px solid #e4e4e4;">
        <hy-gt model="gtData" title="class=bgTransparent" class="bgTransparent">
          <hy-text [noLabel]="true" title="node" model="text" [ckMaxLength]="10"></hy-text>
        </hy-gt>
        <hy-glt model="gtData" title="class=bgTransparent" class="bgTransparent">
          <hy-text [noLabel]="true" title="node" model="text" [ckMaxLength]="10"></hy-text>
        </hy-glt>
      </div>
    </hy-form>
    `
  }
};

export const panel93 = Template93.bind({});
panel93.storyName = 'gt模板（不同class的样式+glt）';

