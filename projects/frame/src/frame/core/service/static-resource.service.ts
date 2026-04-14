import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { I18nService } from '../service/i18n.service';

@Injectable({
  providedIn: 'root'
})
export class StaticResourceService implements OnDestroy {
  private _data: object = {};

  /** 框架资源 */
  public set data(value) {
    this._data = value;
  }

  public get data(): any {
    return this._data;
  }

  private uuid = this.i18nService.getUuid();

  constructor(private http: HttpClient, private i18nService: I18nService) {
    this.i18nService.createSubject(this.uuid).subscribe(() => {
      this.data = {};
    })
  }

  ngOnDestroy(): void {
    this.i18nService.clearSubject(this.uuid);
  }

  /**
   * 根据类型获取资源
   * @param type 资源类型
   * @param callBack 获取资源成功后的回调函数，可选参数
   */
  public getResource(type: string | 'app' | 'frame', callBack?: (any?) => void) {
    return this._getResource(type, callBack);
  }

  /**
   * 获取框架资源
   * @param callBack 获取资源成功后的回调函数，可选参数
   */
  public getFrameResource(callBack?: (any?) => void) {
    return this._getResource('frame', callBack);
  }

  /**
   * 私有方法，根据资源类型获取资源
   * @param type 资源类型
   * @param callBack 获取资源成功后的回调函数，可选参数
   */
  private _getResource(type: string | 'app' | 'frame', callBack) {
    if (this.data[type]) {
      if (callBack) {
        callBack(this.data[type]);
      }
    } else {
      const timenum = new Date().toTimeString();
      let headers = new HttpHeaders();
      if (this.i18nService.language) {
        headers = headers.append('Accept-Language', this.i18nService?.language?.id.replace('_', '-'));
      }
      this.http.get(`/Service/comm/getPropertiesMaps/${type}?${timenum}`, { headers: headers }).subscribe((e: any) => {
        if (e.datas && e.datas[type]) {
          this.data[type] = e.datas[type];
          if (type === 'frame') {
            this.setLogo();
          }
          if (callBack) {
            callBack(e.datas[type]);
          }
        }
      })
    }
  }

  setLogo() {
    if (this.data.frame.logo === undefined) {
      this.data.frame.logo = '../assets/images/new_mainpage/logo.png';
    }
    if (this.data.frame.logo_small === undefined) {
      this.data.frame.logo_small = '../assets/images/new_mainpage/logo_small.png';
    }
  }
}
