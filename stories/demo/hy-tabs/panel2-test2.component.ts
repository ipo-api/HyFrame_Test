import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'panel2-test2',
  template: `<div>panel2-test2</div>`,
})
export class Panel2Test2Component implements OnInit {
  ngOnInit(): void {
    console.log('初始化panel2')
  }
  
}
