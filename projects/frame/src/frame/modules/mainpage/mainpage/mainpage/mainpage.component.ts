import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModelService } from '../../../../core/common/domain/service/model.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AppGlobal } from '../../../../config/AppGlobal';
import { $hyapi } from '../../../../core/api/$hyapi';
import { LoginService } from '../../login/service/login.service';
import { ObjectUtil } from '../../../../core/util/common/ObjectUtil';
import { I18nService } from '../../../../core/service/i18n.service';

declare const $: any;

@Component({
  selector: 'hy-mainpage',
  templateUrl: 'mainpage.component.html',
  styleUrls: ['mainpage.component.css'],
  providers: [ModelService],
})
export class MainpageComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  constructor(public modelService: ModelService, public sanitizer: DomSanitizer, public loginService: LoginService,public i18nService:I18nService) { }
  isHasLogoutFn: boolean = false;

  changes: SimpleChanges;

  // 显示/隐藏左侧菜单
  isCollapsed: boolean = false;

  // 显示箭头符号
  showMenuIcon: boolean = true;

  AppGlobal = AppGlobal;

  // 系统标题
  systemName: string;

  // 用户菜单
  @Input() menuDatas: any;

  //右上个人信息菜单栏
  @Input() userPanelData: any[];

  // 系统菜单
  @Input() systemsMenuDatas: any[];

  // 系统标题，默认值
  _systemMenuId;
  @Input()
  set systemMenuId(val) {
    this._systemMenuId = val;
    this.refreshSystemsMenu();
  }
  get systemMenuId() {
    return this._systemMenuId;
  }

  //点击更换许可按钮的方法
  @Output() licenceBtnClick = new EventEmitter<any>();

  //点击退出登录方法
  @Output() onClick_logout = new EventEmitter<any>();
  public licenceBtnClickFn(e) {
    this.licenceBtnClick.emit(e);
  }

  //许可信息,业务自定例子：'许可还剩%天，请更换';天数用%号表示
  @Input() licenceInfo: string;

  //是否显示【更换许可】按钮
  @Input() showlicenceBtn: boolean = false;

  @Output() onInituserPanelData = new EventEmitter<any>();
  ngOnInit() {
    this.loginService.AsyngetLoginUserFromServer(this.modelService, () => {
      if (this.onInituserPanelData.observers.length > 0) {
        this.onInituserPanelData.emit();
        return;
      }
      this.inituserPanelData()
    }, true);
    this.initUserMenu();
    this.initSystemsMenuDatas();
    this.systemName = this.getSystemName(this._systemMenuId);
    if (this.onClick_logout.observers.length > 0) {
      this.isHasLogoutFn = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.changes = changes;
    if (changes['systemsMenuDatas'] && changes['systemsMenuDatas'].currentValue && Array.isArray(changes['systemsMenuDatas'].currentValue) && changes['systemsMenuDatas'].currentValue.length > 0) {
      this.systemName = this.getSystemName(this._systemMenuId);
    }
  }

  // 刷新系统菜单
  refreshSystemsMenu() {
    this.systemName = this.getSystemName(this._systemMenuId);
    // if (this.systemsMenuDatas && this.systemsMenuDatas.length > 0 && this._systemMenuId) {
    //   this.systemsMenuItemFn(this.systemsMenuDatas.find(item => item.id === this._systemMenuId));
    // }
  }

  //初始化系统菜单
  initSystemsMenuDatas() {
    if (!this.systemsMenuDatas || this.systemsMenuDatas.length === 0) {
      if (AppGlobal.menu_systems && AppGlobal.menu_systems.length > 0) {
        this.systemsMenuDatas = AppGlobal.menu_systems;
      } else {
        return;
      }
    }
    // 如果外部提前传入了_systemMenuId就不需要设置默认的
    if (this._systemMenuId) return;
    this._systemMenuId = this.systemsMenuDatas[0]['id'];
  }

  //系统菜单下拉
  @Output() systemsMenuItemF = new EventEmitter<any>();
  systemsMenuItemFn(value) {
    if (this.systemsMenuItemF.observers.length > 0) {
      this.systemsMenuItemF.emit(value);
      return;
    }
    if (value.url && value.url.length > 0) {
      if (value.url.indexOf('http:') >= 0 || value.url.indexOf('https:') >= 0) {
        window.location.href = value.url;
      } else {
        AppGlobal.router.navigate([value.url]);
      }
    }
  }

  // 获取系统菜单名
  getSystemName(id) {
    if (id && this.systemsMenuDatas && this.systemsMenuDatas.length > 0) {
      let vaule = this.systemsMenuDatas.filter(d => d.id == id);
      if (vaule.length === 0) return null;
      return vaule[0].menuname;
    }
  }

  //初始化用户菜单
  initUserMenu() {
    if (this.changes && this.changes.hasOwnProperty('menuDatas')) return;
    $hyapi.io.post(
      this.modelService,
      'Sysmngr/SysUserData/userMenu',
      {},
      {
        showMsg: false,
        successFn: (resBody) => {
          let checkedMenus = resBody.datas['glt_用户菜单'];
          if (checkedMenus && checkedMenus.length > 0) {
            let memuObj = {};
            for (let obj of checkedMenus) {
              memuObj[obj.menuId] = memuObj;
            }
            this.menuDatas = [];
            let allMenuDatas = ObjectUtil.copyByJson(AppGlobal.menu) || [];
            //对没有子节点的菜单进行处理
            for (let _menu of allMenuDatas) {
              if (!_menu.children) {
                if (memuObj[_menu.menuId]) {
                  this.menuDatas.push(_menu);
                }
              } else {
                let _children = [];
                for (let c of _menu.children) {
                  if (memuObj[c.menuId]) {
                    _children.push(c);
                  }
                }
                if (_children.length > 0) {
                  _menu.children = _children;
                  this.menuDatas.push(_menu);
                } else {
                  delete _menu.children;
                }
              }
            }
          } else {
            this.menuDatas = [];
          }
        },
      }
    );
  }

  //初始化右上角用户信息面板
  inituserPanelData() {
    this.userPanelData = [
      {
        usrNameData: [
          {
            name: '用户名',
            value: AppGlobal.loginUser.name,
          },
        ],
      },
      {
        infoMenuData: [
          {
            name: '个人中心',
            nzIconName: 'user',
            click: () => { },
          },
          {
            name: '修改密码',
            hyIconName: 'unlock',
            click: () => { },
          },
        ],
      },
    ];
  }

  ngAfterViewInit() {
    document.body.style.backgroundColor = '#0e2344';
    document.body.style.overflowY = 'hidden';
    document.body.style.minWidth = '1440px';
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = '';
    document.body.style.overflowY = '';
    document.body.style.minWidth = '';
  }

  headerClickF(event) {
    this.showMenuIcon = !this.showMenuIcon;
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.onClick_logout.emit();
  }

}
