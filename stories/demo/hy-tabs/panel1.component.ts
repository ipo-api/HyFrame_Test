import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AppGlobal, HyapiService } from 'projects/frame/src/public-api';

@Component({
  selector: 'panel1',
  template: `
  <div>这是面板1</div>
  <div>
    <hy-tabs [tabs]="tabs" [isVertical]="true" type="line"></hy-tabs>
    <hy-form>
      <hy-gt model="2222">
        <hy-select model="1111" title="1111" [items]="[{'id':'1','text':'1'}]"></hy-select> 
      </hy-gt>
    </hy-form>
  </div>
  `,
})
export class Panel1Component implements OnInit {
  datas=[
    {
      "title": "公司",
      "key": "1",
      "level": 0,
      "children": [
        {
          "title": "研发组",
          "key": "1-1",
          "level": 1,
          "children": [
            {
              "title": "研发组1",
              "key": "1-1-1",
              "level": 2
            },
            {
              "title": "研发组2",
              "key": "1-1-2",
              "level": 2
            }
          ]
        },
        {
          "title": "产品组",
          "key": "1-1-3",
          "level": 1,
          "children": [
            {
              "title": "产品组1",
              "key": "1-1-2-1",
              "level": 2
            },
            {
              "title": "产品组2",
              "key": "1-1-2-2",
              "level": 2,
              "children": [
                {
                  "title": "产品组2-1",
                  "key": "1-1-2-2-1",
                  "level": 3
                }
              ]
            },
            {
              "title": "aaaaBBB",
              "key": "1-1-2-3",
              "level": 2
            }
          ]
        },
        {
          "title": "销售组",
          "key": "2-1",
          "level": 1,
          "children": [
            {
              "title": "销售组1",
              "key": "1-2-1",
              "level": 2
            }
          ]
        }
      ]
    }
  ]

  tabs = [
    {title:'panel1-test1',url:'/panel1/panel1-test1'},
    {title:'panel1-test2',url:'/panel1/panel1-test2'},
  ]

  constructor(public hyapiService: HyapiService) {

    AppGlobal.hyapiService = hyapiService;
  }

  ngOnInit(): void {
    console.log('初始化panel1')
  }

}
