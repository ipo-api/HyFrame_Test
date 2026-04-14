import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'hy-comm-tip',
  templateUrl: './hy-comm-tip.component.html',
  styleUrls: ['./hy-comm-tip.component.less']
})
export class HyCommTipComponent implements OnInit, OnChanges , AfterViewInit{
  @ViewChild('tipeTemp',{static:true}) tipeTemp;

  isTemp:boolean = false;

  @Input() tip:any
 
  @Input() tipType:'default' | 'bottom' = 'default';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes) return;
    if(changes['tip'] && changes['tip'].currentValue !== undefined){
      if(typeof this.tip === 'string'){
        this.isTemp = false;
      }else{
        this.isTemp = true;
      }
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }
  

  
}
