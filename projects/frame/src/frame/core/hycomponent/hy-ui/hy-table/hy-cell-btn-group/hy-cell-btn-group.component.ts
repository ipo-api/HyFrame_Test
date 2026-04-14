import { Component, Input, OnInit } from '@angular/core';
import { HyCellBtnGroupBtnArray } from './interface';
import { I18nService } from '../../../../service/i18n.service';

@Component({
  selector: 'hy-cell-btn-group',
  templateUrl: './hy-cell-btn-group.component.html',
  styleUrls: ['./hy-cell-btn-group.component.css'],
})
export class HyCellBtnGroupComponent implements OnInit {
  public i18nButtonType = {
    'zh_CN': {
      'save': '保存',
      'delete': '删除',
      'edit': '编辑',
      'cancel': '取消',
      'back': '返回',
      'close': '关闭',
      'check': '查看'
    },
    'zh_HK': {
      'save': '保存',
      'delete': '刪除',
      'edit': '編輯',
      'cancel': '取消',
      'back': '返回',
      'close': '關閉',
      'check': '查看'
    },
    'en_US': {
      'save': 'Save',
      'delete': 'Delete',
      'edit': 'Edit',
      'cancel': 'Cancel',
      'back': 'Back',
      'close': 'Close',
      'check': 'Check'
    },
  };

  isVisible: boolean = false;

  constructor(public i18nService: I18nService) { }

  ngOnInit(): void { }

  /** 按钮名称 */
  @Input() title: string;

  /** 按钮组合使用。当按钮数据较多时，把一些按钮放到更多操作里面 */
  @Input() btnArray: HyCellBtnGroupBtnArray[] = [];

  /** 多记录表中某行的item数据 */
  @Input() itemData: any;

}
