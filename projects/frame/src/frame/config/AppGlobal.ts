import { IOService } from '../../frame/core/service/io.service';
import { Router } from '@angular/router';
import { DicService } from '../../frame/core/service/dic.service';
import { StompService } from '../../frame/core/func/websocket/stomp.service';
import { WebRtcService } from '../../frame/core/func/webrtc/webrtc.service';
import { DataBusService } from '../../frame/core/service/databus.service';
import { HyapiService } from '../../frame/core/common/domain/service/hyapi.service';

export class AppGlobal {
  static setValue(config) {
    const promise = new Promise((resolve) => {
      for (let key in config) {
        if (config[key] && AppGlobal.hasOwnProperty(key)) {
          AppGlobal[key] = config[key];
        }
      }
      setTimeout(() => {
        resolve(null);
      }, 100);
    });
    return promise;
  }
  static routerSubscribe: any = null;
  static routeReuseInitUrl: string = null;
  static debug: boolean = false;
  static server: string = '';
  static project: string = '';
  static loginRouter: string = '/login';
  static loginSuccessUrl: string = '/main/welcome';
  static loginServerUrl: string = 'Login/login';
  static loginServerUrl_Form: string = 'Login/form';
  static loginServerUrl_CustomLogin: string = 'Login/customLogin';
  static logoutServerUrl: string = 'Login/logout';
  static logoutServerUrl_Form: string = 'Logout/form';
  static logoutServerUrl_CustomLogin: string = 'Login/customLogout';
  static getLoginUserUrl: string = 'Login/getLoginUser';
  static loginPasswordLevel: string = 'level1';    //该值由后端指定，前端留默认值是为了兼容以前的版本
  static loginUser: any = {
    // auths:['aaa','bbb'],
    auths: []
  };
  static ioService: IOService = null;
  static dicService: DicService = null;
  static router: Router = null;
  static webRtcService: WebRtcService = null;
  static dataBusService: DataBusService = null;
  static hyapiService: HyapiService = null;
  static menu: any = null;
  static wsk: StompService = null;
  static wsk_socket: string = 'zen-websocket';
  static wsk_topicPrefix: string = '/WSK/topic';
  static wsk_userPrefix: string = '/WSK/user';
  static wsk_sendPrefix: string = '/WSK/client';
  static puk: string = null;    //rsa 公钥
  static menu_systems: any = null;
  static ui_btn_throttleTime = 500;   //屏蔽重复点击，单位：毫秒
  static io_post_otherserver_throttleTime = 5000;   //保持与第三方服务器的联系，但需要避免过于频繁被触发。该参数设置多长时间内最多触发一次，单位：毫秒
  static ui_msg_show_sessionTimeOut: boolean = true;   //session超时，是否需要弹出提示
  static onoff_loginedToken: boolean = false;
  static localTimeDiff: number = 0;
  static maxTimeDiffChange: number = 5000;   //最大能允许的时间变化
  static serverTime: number = 0;
  static serverTimeInterval: number = 10000;
  static loginedTokenExpiredTime: number = 0;
  static check_loginedToken_reserve_time: number = 20000;    //提前多久去换新的LoginedToken
  static loginedToken_CORS_Map = {};                        //跨域的LT
  static uploadFileMaxSizeStr: string = null;
  //许可信息
  static isLicenseExpired: boolean = null;// 许可已过期
  static isLicenseExpired_EarlyWarning: boolean = null;// 许可未过期
  static licenseValidDays: number = null; //许可还剩多少天
  static isGoReuse: boolean = false;
  static isTheme: boolean = false;
  /** 操作系统 */
  static system: string = null;
  /** 是否开启国际化 */
  static i18n: boolean = false;
  /** 国际化语言列表 */
  static i18nLanguages: { id: string, text: string }[] = [];
  /** 当前的国际化语言 */
  static i18nLanguage: { id: string, text: string } = null;
  /** 保存用户国际化信息接口 */
  static i18nSaveUserLanguage: string = 'Action/user/language/save';
  /** 获取用户国际化信息接口 */
  static i18nGetUserLanguage: string = 'Action/user/language/get';
  /** 获取国际化语言列表接口 */
  static i18nGetLanguages: string = 'Service/AppModule/getModules_ShowMenu';
  /** 登录超时后记录的当前页 */
  static authTimeoutRoute: string = '';
}

