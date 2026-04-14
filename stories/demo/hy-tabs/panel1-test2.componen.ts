import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'panel1-test2',
  template: `<div>panel1-test2</div>`,
})
export class Panel1Test2Component implements OnInit {
  ngOnInit(): void {
    console.log('初始化panel2')
  }
  
}
