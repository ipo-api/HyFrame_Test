import { Injectable } from '@angular/core';
import { AppGlobal } from '../../../../config/AppGlobal';
import { ModelService } from '../../../../core/common/domain/service/model.service';
import * as CryptoJS from 'crypto-js';
import { NcUtil } from '../../../../core/util/frame/NcUtil';
import { $hyapi } from '../../../../core/api/$hyapi';
import { Util } from '../../../../core/util/util';
import { AclService } from '../../../../core/service/acl.service';
import { SHA256, MD5 } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private aclService: AclService) { }

  /** 上传文件秘钥登录 */
  fileKeyLogin(datas: any, type?: string, loginOps?: any) {
    let ops = {
      showMsg: false,
      showFailMsg: false,
      successFn: (resBody) => {
        // 设置权限--测试
        this.aclService.setIsAdmin(true);
        // const aclList = ['main-rbac-user','main-rbac-user-add'];
        // this.aclService.setAclList(aclList);

        if (resBody.datas['loginUser']) {
          Object.assign(AppGlobal.loginUser, resBody.datas['loginUser']);
        }
        if (resBody.datas['auths']) {
          let auths = resBody.datas['auths'];
          AppGlobal.loginUser.auths = [];
          for (let i = 0; i < auths.length; i++) {
            AppGlobal.loginUser.auths.push(auths[i].authority);
          }
        }
        if (loginOps.successFn) {
          loginOps.successFn(resBody.datas, resBody);
        } else {
          $hyapi.routeReuse.clearAndGoNextRouter(AppGlobal.loginSuccessUrl); //路由复用后，需清除所有缓存在跳转
          // AppGlobal.router.navigate([AppGlobal.loginSuccessUrl]);
        }
      },
      failFn: (resBody) => {
        if (loginOps.failFn) {
          loginOps.failFn(resBody);
        } else {
          if (resBody['msg']) {
            $hyapi.msg.createTips('error', resBody['msg']);
          } else {
            $hyapi.msg.createTips('error', 'hyIo.操作失败');
          }
        }
      },
      httpFailFn: (resBody, error) => { },
    };
    if (type && (type === 'form' || type === 'customLogin')) {
      let tmp = datas;
      datas = '';
      let url = AppGlobal.loginServerUrl;
      if (loginOps['contentType'] === 'multipartForm') {
        // 加密处理
        if (loginOps['secret']) {
          const uuid = new Date().getTime() + '000';
          for (const item of loginOps['secret'].encryptFileKeys) {
            this.encrypt(tmp, item, uuid);
          }
          const pass = NcUtil.rsa.encrypt(uuid);
          ops['headers'] = { 'zen-sec-aes': pass }
        }
        ops['contentType'] = loginOps['contentType'];
      }
      // this.encrypt方法内是异步，防止出现异步问题，这里使用settimeout
      setTimeout(() => {
        let formData: FormData = new FormData();
        if (tmp.loginUser) {
          for (let p in tmp.loginUser) {
            formData.append(p, tmp.loginUser[p]);
          }
          if (type === 'customLogin' && !tmp.loginUser['loginType']) {
            formData.append('loginType', 'usernamePassword');
          }
        }
        datas = formData;
        if (type === 'customLogin') {
          url = AppGlobal.loginServerUrl_CustomLogin;
        } else if (type === 'form') {
          url = AppGlobal.loginServerUrl_Form;
        }
        if (AppGlobal.onoff_loginedToken) {
          ops['is_login'] = true;
        }
        $hyapi.io.post(null, url, datas, ops);
      }, 100);
    }
  }

  /** 加密 */
  encrypt(data, key, uuid) {
    key = key.replace(/\.\./g, '.');
    const keys = key.split('.'); // 将 key 拆分成属性名数组
    let num = 0;
    const fn = (obj, key) => {
      const value = obj[key];
      if (value) {
        if (Util.isObject(value) && value instanceof File === false) {
          num++;
          fn(obj[key], keys[num]);
        } else if (Util.isArray(value)) {
          num++;
          value.forEach(element => {
            fn(element, keys[num]);
          })
        }
        else {
          const reader = new FileReader();
          reader.readAsArrayBuffer(value);
          reader.onload = e => {
            const arr = value.name.split(".");
            const type = arr[arr.length - 1];
            const encryptKey = CryptoJS.enc.Utf8.parse(uuid);
            const wordArray = CryptoJS.lib.WordArray.create(e.target.result);
            let encrypted = CryptoJS.AES.encrypt(wordArray, encryptKey, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: encryptKey });
            const ivCiphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
            const fileBox = new Blob([ivCiphertext], {
              type: type
            });
            obj[key] = fileBox;
          };
        }
      }
    }
    fn(data, keys[num]);
  }

  login(context: any, datas: any, type?: string, loginOps?: any,) {
    loginOps = loginOps || {};
    let ops = {
      showMsg: false,
      showFailMsg: false,
      successFn: (resBody) => {
        // 设置权限--测试
        this.aclService.setIsAdmin(true);
        // const aclList = ['main-rbac-user','main-rbac-user-add'];
        // this.aclService.setAclList(aclList);

        if (resBody.datas['loginUser']) {
          Object.assign(AppGlobal.loginUser, resBody.datas['loginUser']);
        }
        if (resBody.datas['auths']) {
          let auths = resBody.datas['auths'];
          AppGlobal.loginUser.auths = [];
          for (let i = 0; i < auths.length; i++) {
            AppGlobal.loginUser.auths.push(auths[i].authority);
          }
        }
        if (loginOps.successFn) {
          loginOps.successFn(resBody.datas, resBody);
        } else {
          $hyapi.routeReuse.clearAndGoNextRouter(AppGlobal.loginSuccessUrl); //路由复用后，需清除所有缓存在跳转
          // AppGlobal.router.navigate([AppGlobal.loginSuccessUrl]);
        }
      },
      failFn: (resBody) => {
        if (loginOps.failFn) {
          loginOps.failFn(resBody);
        } else {
          if (resBody['msg']) {
            $hyapi.msg.createTips('error', resBody['msg']);
          } else {
            $hyapi.msg.createTips('error', 'hyIo.操作失败');
          }
        }
      },
      httpFailFn: (resBody, error) => { },
    };

    let url = AppGlobal.loginServerUrl;
    if (type && (type === 'form' || type === 'customLogin')) {
      let tmp = datas;
      datas = '';

      if (!loginOps['contentType']) {
        ops['contentType'] = 'form';

        if (tmp.loginUser) {
          for (let p in tmp.loginUser) {
            datas = datas + p + '=' + tmp.loginUser[p] + '&';
          }
          if (type === 'customLogin' && !tmp.loginUser['loginType']) {
            datas = datas + 'loginType=usernamePassword&';
          }
        }
        if (datas) {
          datas = datas.substr(0, datas.length - 1);
        }

        // datas = "username=" + tmp.loginUser.username + "&password=" + tmp.loginUser.password;
        // if (tmp["imageCode"]) {
        //   datas = datas + "&imageCode=" + tmp.imageCode;
        // }
        // if (tmp["rememberMe"]) {
        //   datas = datas + "&remember-me=" + tmp.rememberMe;
        // }

      } else if (loginOps['contentType'] === 'multipartForm') {


        ops['contentType'] = loginOps['contentType'];

        let formData: FormData = new FormData();
        if (tmp.loginUser) {
          for (let p in tmp.loginUser) {
            formData.append(p, tmp.loginUser[p]);
          }
          if (type === 'customLogin' && !tmp.loginUser['loginType']) {
            formData.append('loginType', 'usernamePassword');
          }
        }
        datas = formData;
      }

      if (type === 'customLogin') {
        url = AppGlobal.loginServerUrl_CustomLogin;
      } else if (type === 'form') {
        url = AppGlobal.loginServerUrl_Form;
      }

    }

    if (AppGlobal.onoff_loginedToken) {
      ops['is_login'] = true;
    }
    $hyapi.io.post(null, url, datas, ops);
  }

  logout(type?: string) {
    let self = this;
    let url = AppGlobal.logoutServerUrl;
    this.aclService.resetAcl();
    let ops = {
      showMsg: false,
      successFn: (resBody) => {
        for (let key in AppGlobal.loginUser) {
          delete AppGlobal.loginUser[key];
        }
        if (resBody.datas && resBody.datas.logoutUrl) {
          window.location.href = resBody.datas.logoutUrl;
        } else {
          AppGlobal.router.navigate([AppGlobal.loginRouter]);
        }
        // 清除sessionStorage中的所有内容
        window.sessionStorage.clear();
      }
    };

    switch (type) {
      case 'customLogin':
        url = AppGlobal.logoutServerUrl_CustomLogin;
        break;
      case 'form':
        url = AppGlobal.logoutServerUrl_Form;
        ops['contentType'] = 'form';
        break;
      default:
        break;
    }

    $hyapi.io.post(
      null,
      url,
      {},
      ops
    );
  }

  private generateRandomAlphaNum(len: number): String {
    let rdmString = '';
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len);
  }

  encodePw_Rsa(pw: String): String {
    let tmp = NcUtil.rsa.encrypt(pw);
    if (tmp) {
      return this.dealPw(tmp);
    } else {
      return '';
    }
  }

  encodePw(pw: string): String {
    this.encodePw_Rsa(pw);
    if (AppGlobal.loginPasswordLevel === 'level1' || AppGlobal.loginPasswordLevel === 'level2') {
      pw = MD5(pw).toString();
    }
    if (AppGlobal.loginPasswordLevel === 'level2') {
      pw = SHA256(pw).toString();
    }
    return this.dealPw(pw);
  }

  dealPw(pw: String): String {
    let randomStr = this.generateRandomAlphaNum(20);
    let str = randomStr.substring(0, 5);
    str = str + pw.substring(2, 5);
    str = str + randomStr.substring(5, 12);
    str = str + pw.substring(5);
    str = str + randomStr.substring(12, 16);
    str = str + pw.substring(0, 2);
    str = str + randomStr.substring(16);
    return str;
  }

  public AsyngetLoginUserFromServer(mds: ModelService, successFnCallbak: any, blnGotoLogin?: boolean) {
    let self = this;
    $hyapi.io.post(
      mds,
      AppGlobal.getLoginUserUrl,
      {},
      {
        showMsg: false,
        allowSameUrl: true,
        successFn: (resBody) => {
          if (resBody.datas['loginUser']) {
            Object.assign(AppGlobal.loginUser, resBody.datas['loginUser']);
            AppGlobal.loginUser.wskUserId = AppGlobal.loginUser.hash + Math.random();

            if (AppGlobal.loginUser) {
              successFnCallbak();
            }
          } else {
            if (blnGotoLogin) {
              AppGlobal.router.navigate([AppGlobal.loginRouter]);
            }
          }
        },
      }
    );
  }
}
