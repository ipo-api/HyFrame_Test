import { Injectable } from '@angular/core';
import { StompService } from '../func/websocket/stomp.service';
import { WebRtcService } from '../func/webrtc/webrtc.service';
import { Router } from '@angular/router';
import { AppGlobal } from '../../config/AppGlobal';
import { DebugUtil } from '../util/debug/DebugUtil';
import { IOService } from '../service/io.service';
import { DicService } from '../service/dic.service';
import { DataBusService } from '../service/databus.service';
import { $hyapi } from '../api/$hyapi';
import { NcUtil } from '../util/frame/NcUtil';
import { ServerTimeService } from '../service/server-time';

@Injectable({
  providedIn: 'root',
})
export class InitFrameService {
  constructor(private ioService: IOService, private dicService: DicService, private wsk: StompService, private webRtcService: WebRtcService, private dataBusService: DataBusService, private serverTimeService: ServerTimeService) {
    //全局初始化
    AppGlobal.ioService = ioService;
    AppGlobal.dicService = dicService;
    AppGlobal.wsk = wsk;
    AppGlobal.webRtcService = webRtcService;
    AppGlobal.dataBusService = dataBusService;
    // AppGlobal.router = router;  // storybook中要注释掉这个才能正常使用
    serverTimeService.initServerTime();
  }

  init() {
    DebugUtil.init();
    AppGlobal.system = this.getSystem();
  }

  /** 判断当前操作系统 */
  getSystem() {
    let os = 'other';
    if (navigator.userAgent.indexOf('Mac') > 0) {
      os = 'Mac';
    }
    if (navigator.userAgent.indexOf('Window') > 0) {
      os = 'Window'
    }
    return os;
  }

  getInitInfoFromServer() {
    return new Promise((resolve, reject) => {
      $hyapi.io.post(null, 'Service/AppModule/getModules_ShowMenu', {}, {
        showMsg: false,
        showFailMsg: true,
        showErrorMsg: true,
        showLoading: false,
        successFn: (resBody) => {
          let loginPasswordLevel = resBody.datas['loginPasswordLevel'];
          if (loginPasswordLevel) {
            AppGlobal.loginPasswordLevel = loginPasswordLevel;
          }

          if (resBody.datas['puk']) {
            let tmp = resBody.datas['puk'];
            let tmp1 = NcUtil.xor_encode.xor(resBody.datas['r'], NcUtil.base64_encode.decode(tmp));
            AppGlobal.puk = NcUtil.transform.byteToString(tmp1);
          }

          if (resBody.datas['uploadFileMaxSizeStr']) {
            AppGlobal.uploadFileMaxSizeStr = resBody.datas['uploadFileMaxSizeStr'];
          }

          if (AppGlobal.onoff_loginedToken) {
            if (resBody.datas['time']) {
              AppGlobal.serverTime = resBody.datas['time'];
              AppGlobal.localTimeDiff = new Date().getTime() - resBody.datas['time'];
              setInterval(() => {
                AppGlobal.serverTime = AppGlobal.serverTime + AppGlobal.serverTimeInterval;
                let newDiff: number = new Date().getTime() - AppGlobal.serverTime;
                if (Math.abs(newDiff - AppGlobal.localTimeDiff) > AppGlobal.maxTimeDiffChange) {
                  $hyapi.io.post(null, 'Service/AppModule/getTime', {}, {
                    is_get_server_time: true,
                    showMsg: false,
                    showFailMsg: false,
                    showErrorMsg: false,
                    successFn: (resBody) => {
                      if (AppGlobal.onoff_loginedToken) {
                        if (resBody.datas['time']) {
                          AppGlobal.serverTime = resBody.datas['time'];
                          AppGlobal.localTimeDiff = new Date().getTime() - resBody.datas['time'];
                        }
                      }
                    }
                  });
                }
              }, AppGlobal.serverTimeInterval);
            }
          }
          AppGlobal.isLicenseExpired = resBody.datas['isLicenseExpired'];
          AppGlobal.isLicenseExpired_EarlyWarning = resBody.datas['isLicenseExpired_EarlyWarning'];
          AppGlobal.licenseValidDays = resBody.datas['licenseValidDays'];
          resolve(true);
        },
        failFn:()=>{
          resolve(true);
        }
      });
    })
  }
}
