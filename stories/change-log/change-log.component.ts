import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-log',
  styleUrls: ['./change-log.component.scss'],
  template: `<div class="sbdocs-wrapper" style="overflow:auto;height:100%;">
    <markdown [data]="changelog"></markdown>
  </div>`,
})
export class ChangeLogComponent implements OnInit {
  @Input() changelog: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
