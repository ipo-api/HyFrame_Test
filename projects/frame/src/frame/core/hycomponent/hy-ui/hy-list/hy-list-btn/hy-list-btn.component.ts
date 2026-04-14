import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'hy-list-btn',
  templateUrl: './hy-list-btn.component.html',
  styleUrls: ['./hy-list-btn.component.css']
})

export class HyListBtnComponent implements OnInit {
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  @Input() enable:boolean = true;

  @Input() title:string = '';

  @Input() item:any;

  constructor() { 

  }

  ngOnInit(): void {
    if(this.enable === undefined) this.enable = true;
  }

  click() {
    if(!this.enable || !this.item) return;
    this.item.visible = false;
    this.onClick.emit();
  }

}
