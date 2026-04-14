import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'panel2',
  template: `<div>这是面板2</div>
  <hy-form>
      <hy-gt model="2222">
        <hy-select model="2222" title="2222" [items]="[{'id':'1','text':'1'}]"></hy-select> 
      </hy-gt>
    </hy-form>`,
})
export class Panel2Component implements OnInit {
  ngOnInit(): void {
    console.log('初始化panel2')
  }
  
}
