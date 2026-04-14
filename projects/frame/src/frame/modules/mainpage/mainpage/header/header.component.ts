import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { LoginService } from '../../login/service/login.service';
import {AppGlobal} from '../../../../config/AppGlobal';
import {ThemeService} from '../../../../core/service/theme.service';

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class MainPageHeaderComponent implements OnInit {
  public loginUser: any;
  public isShowTheme: boolean;

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

  constructor(public loginService: LoginService,private themeService: ThemeService) {
    this.clickedOutside = this.clickedOutside.bind(this);
  }

  ngOnInit() {
    this.loginUser = AppGlobal.loginUser;
    this.isShowTheme = AppGlobal.isTheme;
  }

  logout() {
    this.showBackground = false;
    this.onClick_logout.emit();
  }

  showMenu: boolean = false;
  showMenuFunc() {
    this.showMenu = !this.showMenu;
  }

  public clickedOutside(): void {
    this.showMenu = false;
  }

  @Input()
  isCollapsed: boolean; //nz-header

  @Output()
  headerClickF = new EventEmitter<any>(); //展开、收缩面板的方法

  // 下拉面板展开的状态
  showBackground:boolean;
  visibleChange(value){
    this.showBackground = value
  }
  
  setTheme(theme) {
    this.themeService.setTheme(theme);
  }

  _headerClickF() {
    this.headerClickF.emit();
    const e = document.createEvent('Event');
    e.initEvent('resize', true, true);
    window.dispatchEvent(e);
  }
}
