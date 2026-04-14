import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'hy-monitor',
  templateUrl: './hy-monitor.component.html',
  styleUrls: ['./hy-monitor.component.css']
})
export class HyMonitorComponent implements OnChanges {

  @Input() data:any;
  
  @Output() dataChange= new EventEmitter<any>();

  @Output()
  getData = new EventEmitter<any>();

  constructor() { }

  ngOnChanges(changes) {
    if(changes && changes['data'] && changes['data'].currentValue!== undefined){
      this.getData.emit();
      this.dataChange.emit(this.data);
    }
  }
}
