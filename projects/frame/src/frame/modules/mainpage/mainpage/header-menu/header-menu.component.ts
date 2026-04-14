import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from '../../login/service/login.service';
import { I18nService } from '../../../../core/service/i18n.service';

@Component({
  selector: 'header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css'],
})
export class HeaderMenuComponent implements OnInit {
  //右上角下拉框信息
  @Input()
  userPanelData: Array<any>;

  //业务是否有自己的退出登录方法
  @Input()
  isHasLogoutFn: boolean = false;

  @Output('onClick_title')
  onClick_title = new EventEmitter();

  @Output('onClick_logout')
  onClick_logout = new EventEmitter();
  click(name: any) {
    this.onClick_title.emit(name);
  }

  ngOnInit() {
    // this.loginUser = AppGlobal.loginUser;
  }

  constructor(public loginService: LoginService,public i18nService:I18nService) { }

  logout() {
    if(this.isHasLogoutFn){
      this.onClick_logout.emit();
      return;
    }
    this.loginService.logout();
  }
}
