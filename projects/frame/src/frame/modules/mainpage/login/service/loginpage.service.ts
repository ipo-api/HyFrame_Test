import {Component, OnInit, OnDestroy, Input, Injectable} from '@angular/core';

declare let $: any;
declare let jQuery: any;
declare let layer: any;

@Injectable({
  providedIn: 'root',
})
export class LoginPageService {
  constructor() {}

  initPage(self) {
    self._nowdate = new Date().getFullYear() + '';
    self.backstretch = $.backstretch(['assets/pages/media/bg/1.jpg', 'assets/pages/media/bg/2.jpg', 'assets/pages/media/bg/3.jpg', 'assets/pages/media/bg/4.jpg'], {
      fade: 1000,
      duration: 8000,
    });
  }

  login(self) {
    self.isChecked = true;
    self.errorMsg = '';

    if (!self.username) {
      $('#username').focus();
      return;
    } else if (!self.password) {
      $('#password').focus();
      return;
    } else if (self.hasValidateCode && !self.validateCode) {
      $('#validateCode').focus();
      return;
    } else {
      let datas = {
        loginUser: {
          username: self.username,
          // password: this.loginService.encodePw_Rsa(this.password)
          password: self.loginService.encodePw(self.password),
          // password: self.password
        },
      };
      let ops = {
        clear:  () => {
          self.username = '';
          self.password = '';
        }
      };
      self.loginService.login(this, datas, 'customLogin', ops);
    }
  }

  refreshValidateCode(self) {
    self = self || this;
    self.validateCodeUrl = self.baseValidateCodeUrl + '?r=' + Math.random();
  }

  destroyPage(self) {
    self.backstretch.destroy();
  }

  onKeyDown(self, $event) {
    if ($event.keyCode == 13) {
      if ($('.layui-layer-shade').length > 0) {
        layer.closeAll('dialog');
      } else {
        self.login();
      }
    }
  }
}
