import {Component, Input, OnInit} from '@angular/core';
import { HyProgressStatusType } from './interface';

@Component({
  selector: 'hy-progress',
  templateUrl: './hy-progress.component.html',
  styleUrls: ['./hy-progress.component.less']
})
export class HyProgressComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  /** 元数据，百分比，默认为0 */
  @Input()
  percent: number = 0;

  /** 是否显示进度数值或状态图标 */
  @Input()
  showInfo: boolean = true;

  /** 状态 */
  @Input()
  progressStatus: HyProgressStatusType;

  /** (strokeType=line)	进度条线的宽度，单位 px，默认8;(strokeType=circle)圆形进度条线的宽度，单位是进度条画布宽度的百分比,默认6 */
  @Input()
  strokeWidth: number;

  /** ’line‘(一条直线)｜’circle‘（圆圈）｜‘dashboard’（仪表盘） */
  @Input()
  strokeType: 'line' | 'circle' | 'dashboard' = 'line';

  /** (strokeType = circle);圆形进度条画布宽度，单位 px,默认值	132 */
  @Input()
  circleWidth: number = 132;

  /** 进度条端点形状‘round’(圆形)｜‘square’（长方形） */
  @Input()
  strokeLinecap: 'square' | 'round' = 'round';

  /** 进度条颜色,如#333、red之类的 */
  @Input()
  strokeColor: string;

  /** 内容的模板函数 */
  @Input()
  format: any;
}
