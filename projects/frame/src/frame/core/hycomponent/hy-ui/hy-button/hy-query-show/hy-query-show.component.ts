import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'hy-queryShow',
  templateUrl: './hy-query-show.component.html',
  styleUrls: ['./hy-query-show.component.css'],
})
export class HyQueryShowComponent  implements OnInit {
  public isShow: boolean = false;

  @Output() onClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  click() {
    this.isShow = !this.isShow;
    this.onClick.emit(this.isShow);
  }
}
