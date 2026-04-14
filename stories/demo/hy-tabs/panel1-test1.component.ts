import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'panel1-test1',
  template: `<div>panel1-test1</div>`,
})
export class Panel1Test1Component implements OnInit {
  ngOnInit(): void {
    console.log('初始化panel2')
  }
  
}
