import {Component, OnInit, Input} from '@angular/core';
import {TableService} from '../../../../common/domain/service/hytable.service';

@Component({
  selector: 'hy-blank',
  templateUrl: './hy-blank.component.html',
  styleUrls: ['./hy-blank.component.css'],
})
export class HyBlankComponent implements OnInit {
  @Input()
  cols: number | string;

  constructor(public tableService: TableService) {
    // console.log("HyBlankComponent..................");
  }

  ngOnInit() {
    if (!this.cols) {
      this.cols = this.tableService.cols;
    }
  }
}
