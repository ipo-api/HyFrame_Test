import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { BaseModule } from '../../../../base/base.module';
import { HyTreeComponent } from './hy-tree.component';
import { unit } from '../../../../../../../../storybookUnit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { $hyapi, ModelService, TableService } from '../../../_index';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from 'stories/stories.module';
import { HyTreeNode } from './interface';

const argTypes = unit.createArgTypes('HyTreeComponent');
argTypes['checkedKeys'].control.type = 'object';
export default {
  title: '数据展示/hy-tree（树形组件）',
  component: HyTreeComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, BaseModule, FormsModule, StoriesModule],
      providers: [ModelService, TableService]
    }),
  ],
  argTypes
} as Meta;

// 高度100%样式
const Template: Story<HyTreeComponent> = (args: HyTreeComponent) => ({
  props: args,
  template: `
  <div style="height:500px">
    <hy-tree [datas]="datas" [fullHeight]="true" [expandLevel]="expandLevel" (onExpandChange)="onExpandChange($event)" (activeNodeChange)="activeNodeChange($event)" (activeNodesChange)="activeNodesChange($event)" (onNodeClick)="onNodeClick($event)" (onNodeDbClick)="onNodeDbClick($event)"></hy-tree>
  </div>
  `
});
export const panel = Template.bind({});
panel.args = {
  fullHeight:true,
  showLine:true,
  expandAll:false,
  isAutoSetLeaf:true,
  expandLevel:-1,
  activeNode:'1',
  datas:[
    {
      title: '公司',
      key: '1',
      level: 0,
      expanded: true,
      children: [
        {
          title: '研发组',
          key: '1-1',
          level: 1,
          expanded: true,
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
  ]
};
panel.storyName = '高度100%样式';

// 右键操作面板
const Template2: Story<HyTreeComponent> = (_this: any) => {
  // 添加的弹出面板
  _this.addTempDialog;
  // 编辑的弹出面板
  _this.editTempDialog;
  // 父级node数据
  _this.parentNode;
  // 右键点击添加事件
  _this.addBtn = (item, addTemp)=> {
    _this.parentNode = item;
    _this.addTempDialog = $hyapi.dialog.show(addTemp,{title:'新增tree',width:'500px'});
  };
  // 右键点击修改事件
  _this.editBtn = (item, editTemp)=> {
    _this.parentNode = item;
    _this.editTempDialog = $hyapi.dialog.show(editTemp,{title:'修改tree',width:'500px'});
  };
  // 弹窗保存事件 
  _this.addSave = (hytree,hygt)=>{
    if(_this.parentNode){
      const newNode = <HyTreeNode>{
        title:hygt.datas.title,
        key:hygt.datas.key
      };
      hytree.addTreeNode(_this.parentNode.key,newNode);
      _this.addClose();
    }
  };
  // 重命名弹窗保存事件 
  _this.editSave = (hytree,hygt)=>{

    if(_this.parentNode){
      _this.parentNode.title = hygt.datas.title
      _this.editClose();
    }
  };
  // 弹窗关闭事件
  _this.addClose = ()=>{
    if(_this.addTempDialog){
      $hyapi.dialog.close(_this.addTempDialog);
    }
  };
  // 弹窗关闭事件
  _this.editClose = ()=>{
    if(_this.editTempDialog){
      $hyapi.dialog.close(_this.editTempDialog);
    }
  };
  // 删除一条数据
  _this.removeBtn = (item,hytree) =>{
    hytree.removeTreeNode(item.key);
  };
  return ({
    props: _this,
    template: `
    <hy-tree [datas]="datas" (onExpandChange)="onExpandChange($event)" (activeNodeChange)="activeNodeChange($event)" (activeNodesChange)="activeNodesChange($event)" (onNodeClick)="onNodeClick($event)" (onNodeDbClick)="onNodeDbClick($event)">
      <ng-template let-item="item" let-index="index" id="test">
        <ul class="hy-tree-dropDown-menu">
            <li class="hy-tree-menu-li" (click)="addBtn(item, addTemp)">新增</li>
            <li class="hy-tree-menu-li" (click)="editBtn(item, editTemp)">重命名</li>
            <li class="hy-tree-menu-li" (click)="removeBtn(item, hytree)">删除</li>
        </ul>
      </ng-template>
    </hy-tree>

    <ng-template #addTemp>
        <hy-form>
            <hy-gt model="add" flex="300px" class="noBorder" [showTitle]="false" #hygt>
                <hy-text title="标题" model="title" [ckRequired]="true"></hy-text>
                <hy-text title="KeyId" model="key" [ckRequired]="true"></hy-text>
                <div class="hy-buttons hy-element-right" style="width: 432px;">
                    <hy-button title="关闭" (onClick)="addClose()" [ckPristine]="true" ></hy-button>
                    <hy-button title="确认" type="primary" (onClick)="addSave(hytree,hygt)"></hy-button>
                </div>
            </hy-gt>
        </hy-form>
    </ng-template>

    <ng-template #editTemp>
        <hy-form>
            <hy-gt model="edit" flex="300px" class="noBorder" [showTitle]="false" #hygtedit>
                <hy-text title="标题" model="title" [ckRequired]="true"></hy-text>
                <div class="hy-buttons hy-element-right" style="width: 432px;">
                    <hy-button title="关闭" (onClick)="editClose()" [ckPristine]="true" ></hy-button>
                    <hy-button title="确认" type="primary" (onClick)="editSave(hytree,hygtedit)"></hy-button>
                </div>
            </hy-gt>
        </hy-form>
    </ng-template>
    `,
  });
}
export const panel2 = Template2.bind({});
panel2.args = {
  showLine:true,
  isAutoSetLeaf:true,
  expandLevel:1,
  datas:[
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
  ]
};
panel2.storyName = '右键操作面板';

// 自定义节点图标
const Template3: Story<HyTreeComponent> = (args: HyTreeComponent) => ({
  props: args,
  template: `
  <hy-tree [datas]="datas" [nodeIconTemplate]="nodeIconTemplate" [isAutoSetLeaf]="true" (onExpandChange)="onExpandChange($event)" (activeNodeChange)="activeNodeChange($event)" (activeNodesChange)="activeNodesChange($event)" (onNodeClick)="onNodeClick($event)" (onNodeDbClick)="onNodeDbClick($event)"></hy-tree>
  <ng-template #nodeIconTemplate let-item="item">
    <hy-icon nzIconName="mail" *ngIf="item?.isLeaf" iconClass="blue"></hy-icon>
    <hy-icon nzIconName="fund-projection-screen" *ngIf="!item?.isLeaf" iconClass="blue"></hy-icon>
  </ng-template>
  `
});
export const panel3 = Template3.bind({});
panel3.args = {
  isAutoSetLeaf:true,
  datas:<Array<HyTreeNode>>[
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
            {title: '研发组1', key: '1-1-1', level: 2,},
            {title: '研发组2', key: '1-1-2', level: 2},
          ],
        },
        {
          title: '产品组',
          key: '1-1-3',
          level: 1,
          children: [
            {title: '产品组1', key: '1-1-2-1', level: 2},
            {title: '产品组2', key: '1-1-2-2',  level: 2, children: [{title: '产品组2-1', key: '1-1-2-2-1', level: 3}]},
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
  ],
  expandLevel:10
};
panel3.storyName = '自定义节点图标';

// 搜索过滤
const Template4: Story<HyTreeComponent> = (args: HyTreeComponent) => ({
  props: args,
  template: `
  <hy-tree [datas]="datas" [search]="true" (onExpandChange)="onExpandChange($event)" (activeNodeChange)="activeNodeChange($event)" (activeNodesChange)="activeNodesChange($event)" (onNodeClick)="onNodeClick($event)" (onNodeDbClick)="onNodeDbClick($event)"></hy-tree>
  `
});
export const panel4 = Template4.bind({});
panel4.args = {
  showLine:true,
  showPadding:true,
  expandLevel:3,
  search:true,
  fullHeight:true,
  datas:<Array<HyTreeNode>>[
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
            {title: '研发组1', key: '1-1-1', level: 2,},
            {title: '研发组2', key: '1-1-2', level: 2},
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
  ]
};
panel4.storyName = '搜索过滤';

// checkbox模式
const Template5: Story<HyTreeComponent> = (args: HyTreeComponent) => ({
  props: args,
  template: `
  <hy-tree [datas]="datas" [checkable]="true" (onExpandChange)="onExpandChange($event)" (activeNodeChange)="activeNodeChange($event)" (activeNodesChange)="activeNodesChange($event)" (onNodeClick)="onNodeClick($event)" (onNodeDbClick)="onNodeDbClick($event)" (onCheckBoxChange)="onCheckBoxChange($event)"></hy-tree>`
});
export const panel5 = Template5.bind({});
panel5.args = {
  showLine:true,
  showPadding:true,
  checkStrictly:false,
  checkable:true,
  expandLevel:3,
  datas:<Array<HyTreeNode>>[
    {
      title: '公司22',
      key: '1',
      level: 0,
      children: [
        {
          title: '研发组',
          key: '1-1',
          level: 1,
          children: [
            {title: '研发组1', key: '1-1-1', level: 2,},
            {title: '研发组2', key: '1-1-2', level: 2},
          ],
        },
        {
          title: '产品组',
          key: '1-1-3',
          level: 1,
          children: [
            {title: '产品组1', key: '1-1-2-1', level: 2},
            {title: '产品组2', key: '1-1-2-2',  level: 2, children: [{title: '产品组2-1', key: '1-1-2-2-1', level: 3}]},
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
  ]
};
panel5.storyName = 'checkbox模式';

// 右键多选操作面板
const Template6: Story<HyTreeComponent> = (args: HyTreeComponent) => ({
  props: args,
  template: `
  <hy-tree [showLine]="true" [datas]="datas" [(activeNodes)]="activeNodes" (onExpandChange)="onExpandChange($event)" (activeNodeChange)="activeNodeChange($event)" (activeNodesChange)="activeNodesChange($event)" (onNodeClick)="onNodeClick($event)" (onNodeDbClick)="onNodeDbClick($event)" (onCheckBoxChange)="onCheckBoxChange($event)" [multiple]="multiple">
      <ng-template let-item="item" let-index="index" id="test">
        <ul class="hy-tree-dropDown-menu">
            <li class="hy-tree-menu-li" (click)="addBtn(item, addTemp)">新增</li>
            <li class="hy-tree-menu-li" (click)="editBtn(item, editTemp)">重命名</li>
            <li class="hy-tree-menu-li" (click)="removeBtn(item, hytree)">删除</li>
            <li class="hy-tree-menu-li" (click)="selectedBtn(activeNodes, selectedTemp)">选中的节点</li>
        </ul>
      </ng-template>
    </hy-tree>

    <ng-template #addTemp>
        <hy-form>
            <hy-gt model="add" flex="300px" class="noBorder" [showTitle]="false" #hygt>
                <hy-text title="标题" model="title" [ckRequired]="true"></hy-text>
                <hy-text title="KeyId" model="key" [ckRequired]="true"></hy-text>
                <div class="hy-buttons hy-element-right" style="width: 432px;">
                    <hy-button title="关闭" (onClick)="addClose()" [ckPristine]="true" ></hy-button>
                    <hy-button title="确认" type="primary" (onClick)="addSave(hytree,hygt)"></hy-button>
                </div>
            </hy-gt>
        </hy-form>
    </ng-template>

    <ng-template #editTemp>
        <hy-form>
            <hy-gt model="edit" flex="300px" class="noBorder" [showTitle]="false" #hygtedit>
                <hy-text title="标题" model="title" [ckRequired]="true"></hy-text>
                <div class="hy-buttons hy-element-right" style="width: 432px;">
                    <hy-button title="关闭" (onClick)="editClose()" [ckPristine]="true" ></hy-button>
                    <hy-button title="确认" type="primary" (onClick)="editSave(hytree,hygtedit)"></hy-button>
                </div>
            </hy-gt>
        </hy-form>
    </ng-template>

    <ng-template #selectedTemp>
        <div>
          <span *ngFor="let item of activeNodes">{{item}}，</span>
        </div>
    </ng-template>
  `
});
// const Template6: Story<HyTreeComponent> = (_this: any) => {
//   // 添加的弹出面板
//   _this.addTempDialog;
//   // 编辑的弹出面板
//   _this.editTempDialog;
//   // 父级node数据
//   _this.parentNode;
//   // 右键点击添加事件
//   _this.addBtn = (item, addTemp)=> {
//     _this.parentNode = item;
//     _this.addTempDialog = $hyapi.dialog.show(addTemp,{title:'新增tree',width:'500px'});
//   };
//   // 右键点击修改事件
//   _this.editBtn = (item, editTemp)=> {
//     _this.parentNode = item;
//     _this.editTempDialog = $hyapi.dialog.show(editTemp,{title:'修改tree',width:'500px'});
//   };
//   // 弹窗保存事件 
//   _this.addSave = (hytree,hygt)=>{
//     if(_this.parentNode){
//       const newNode = <HyTreeNode>{
//         title:hygt.datas.title,
//         key:hygt.datas.key
//       };
//       hytree.addTreeNode(_this.parentNode.key,newNode);
//       _this.addClose();
//     }
//   };
//   // 重命名弹窗保存事件 
//   _this.editSave = (hytree,hygt)=>{

//     if(_this.parentNode){
//       _this.parentNode.title = hygt.datas.title
//       _this.editClose();
//     }
//   };
//   // 弹窗关闭事件
//   _this.addClose = ()=>{
//     if(_this.addTempDialog){
//       $hyapi.dialog.close(_this.addTempDialog);
//     }
//   };
//   // 弹窗关闭事件
//   _this.editClose = ()=>{
//     if(_this.editTempDialog){
//       $hyapi.dialog.close(_this.editTempDialog);
//     }
//   };
//   // 删除一条数据
//   _this.removeBtn = (item,hytree) =>{
//     hytree.removeTreeNode(item.key);
//   };
//   // 选中的节点
//   _this.selectedBtn = (activeNodes, selectedTemp) =>{
//     // $hyapi.dialog.show(selectedTemp,{title:'选中的节点',width:'500px',closable:true});
//     // $hyapi.msg.show('success','test');
//     // $hyapi.msg.confirm('ssss')
//     $hyapi.msg.createTips('success','dasdad')
//   };
//   return ({
//     props: _this,
//     template: `
//     <hy-tree [showLine]="true" [datas]="datas" [(activeNodes)]="activeNodes" (activeNodeChange)="activeNodeChange($event)" (activeNodesChange)="activeNodesChange($event)" [multiple]="multiple">
//       <ng-template let-item="item" let-index="index" id="test">
//         <ul class="hy-tree-dropDown-menu">
//             <li class="hy-tree-menu-li" (click)="addBtn(item, addTemp)">新增</li>
//             <li class="hy-tree-menu-li" (click)="editBtn(item, editTemp)">重命名</li>
//             <li class="hy-tree-menu-li" (click)="removeBtn(item, hytree)">删除</li>
//             <li class="hy-tree-menu-li" (click)="selectedBtn(activeNodes, selectedTemp)">选中的节点</li>
//         </ul>
//       </ng-template>
//     </hy-tree>

//     <ng-template #addTemp>
//         <hy-form>
//             <hy-gt model="add" flex="300px" class="noBorder" [showTitle]="false" #hygt>
//                 <hy-text title="标题" model="title" [ckRequired]="true"></hy-text>
//                 <hy-text title="KeyId" model="key" [ckRequired]="true"></hy-text>
//                 <div class="hy-buttons hy-element-right" style="width: 432px;">
//                     <hy-button title="关闭" (onClick)="addClose()" [ckPristine]="true" ></hy-button>
//                     <hy-button title="确认" type="primary" (onClick)="addSave(hytree,hygt)"></hy-button>
//                 </div>
//             </hy-gt>
//         </hy-form>
//     </ng-template>

//     <ng-template #editTemp>
//         <hy-form>
//             <hy-gt model="edit" flex="300px" class="noBorder" [showTitle]="false" #hygtedit>
//                 <hy-text title="标题" model="title" [ckRequired]="true"></hy-text>
//                 <div class="hy-buttons hy-element-right" style="width: 432px;">
//                     <hy-button title="关闭" (onClick)="editClose()" [ckPristine]="true" ></hy-button>
//                     <hy-button title="确认" type="primary" (onClick)="editSave(hytree,hygtedit)"></hy-button>
//                 </div>
//             </hy-gt>
//         </hy-form>
//     </ng-template>

//     <ng-template #selectedTemp>
//         <div>
//           <span *ngFor="let item of activeNodes">{{item}}，</span>
//         </div>
//     </ng-template>
//     `,
//   });
// }
export const panel6 = Template6.bind({});
panel6.args = {
  showLine:true,
  isAutoSetLeaf:true,
  multiple:true,
  expandLevel:1,
  activeNodes:['1'],
  datas:[
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
            {title: '研发组2', key: '1-1-2', level: 2},
          ],
        },
        {
          title: '产品组',
          key: '1-1-3',
          level: 1,
          children: [
            {title: '产品组1', key: '1-1-2-1', level: 2},
            {title: '产品组2', key: '1-1-2-2',  level: 2, children: [{title: '产品组2-1', key: '1-1-2-2-1', level: 3}]},
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
  ],
  btn:()=>{
    panel6.args.activeNodes = [];
  }
};
panel6.storyName = 'ctrl多选操作面板';

// 虚拟滚动
const dig = (path = '0', level = 0) => {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    const key = `${path}-${i}`;
    const treeNode = {
      title: key,
      key,
      // expanded: true,
      children: [],
      isLeaf: false,
      level:level
    };

    if (level < 3) {
      treeNode.children = dig(key, level + 1);
    } else {
      treeNode.isLeaf = true;
    }

    list.push(treeNode);
  }
  return list;
};

const Template7: Story<HyTreeComponent> = (args: HyTreeComponent) => ({
  props: args,
  template: `
  <hy-tree (onExpandChange)="onExpandChange($event)" (activeNodeChange)="activeNodeChange($event)" (activeNodesChange)="activeNodesChange($event)" (onNodeClick)="onNodeClick($event)" (onNodeDbClick)="onNodeDbClick($event)" (onCheckBoxChange)="onCheckBoxChange($event)" model="tree" [showLine]="true" [showExpand]="true" [search]="true" [nodeIconTemplate]="nodeIconTemplate"
    [datas]="datas" [expandLevel]="2" [multiple]="true" virtualHeight="300px" >
    <ng-template let-item="item" let-index="index">
      <ul class="hy-tree-dropDown-menu">
        <li class="hy-tree-menu-li" >{{item.title}}</li>
      </ul>
    </ng-template>
  </hy-tree>

  <ng-template #nodeIconTemplate let-item="item">
    <hy-icon nzIconName="link" *ngIf="item?.isLeaf" iconClass="blue"></hy-icon>
    <hy-icon nzIconName="folder" *ngIf="!item?.isLeaf" iconClass="blue"></hy-icon>
  </ng-template>
  `
});
export const panel7 = Template7.bind({});
panel7.args = {
  datas:dig(),
};
panel7.storyName = '虚拟滚动';

// shift多选操作面板
const Template8: Story<HyTreeComponent> = (args: HyTreeComponent) => ({
  props: args,
  template: `
  <hy-tree model="tree" [showLine]="true" [showExpand]="true" [isAutoSetLeaf]="true"
    [datas]="datas" [expandLevel]="2" [multiple]="true" virtualHeight="300px" (onExpandChange)="onExpandChange($event)" (activeNodeChange)="activeNodeChange($event)" (activeNodesChange)="activeNodesChange($event)" (onNodeClick)="onNodeClick($event)" (onNodeDbClick)="onNodeDbClick($event)" (onCheckBoxChange)="onCheckBoxChange($event)">
  </hy-tree>
  `
});
export const panel8 = Template8.bind({});
panel8.args = {
  showLine:true,
  isAutoSetLeaf:true,
  multiple:true,
  expandLevel:1,
  activeNodes:['1'],
  datas:[
    {
      title: '公司-1',
      key: '1',
      level: 0,
      children: [
        {
          title: '研发组1-1',
          key: '1-1',
          level: 1,
          children: [
            {title: '研发组1-1-1', key: '1-1-1', level: 2},
            {title: '研发组1-1-2', key: '1-1-2', level: 2},
            {title: '研发组1-1-3', key: '1-1-3', level: 2},
            {title: '研发组1-1-4', key: '1-1-4', level: 2},
          ],
        },
        {
          title: '产品组1-2',
          key: '1-2',
          level: 1,
          children: [
            {title: '产品组1-2-1', key: '1-2-1', level: 2},
            {title: '产品组1-2-2', key: '1-2-2',  level: 2, 
            children: [
              {title: '产品组1-2-2-1', key: '1-2-2-1', level: 3},
              {title: '产品组1-2-2-2', key: '1-2-2-2', level: 3},
            ]
            },
          ],
        },
        {
          title: '销售组1-3',
          key: '1-3',
          level: 1,
          children: [{title: '销售组1-3-1', key: '1-3-1', level: 2}],
        },
      ],
    },
  ],
  btn:()=>{
    panel8.args.activeNodes = [];
  }
};
panel8.storyName = 'shift多选操作面板';

