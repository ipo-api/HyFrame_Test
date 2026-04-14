import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { $hyapi } from '../api/$hyapi';

@Injectable({
  providedIn: 'root'
})
export class ServerTimeService {

  /** 初始化服务器时间 */
  public initServerTime() {
    this._getServerTime().then();
  }

  /** 
   * 获取服务器时间
   * @param formatString - 可选参数，日期格式化字符串，默认为 "yyyy-MM-dd HH:mm:ss"。
   * @returns 返回格式化后的指定格式的当前服务器时间字符串。
   */
  public getServerTime(formatString?: 'yyyy-MM-dd HH:mm:ss' | 'yyyy-MM-dd HH:mm' | 'yyyy-MM-dd HH' | 'yyyy-MM-dd'): string {
    if (!formatString) {
      formatString = 'yyyy-MM-dd HH:mm:ss';
    }
    let getServerTimeLocalTime: number = parseInt(window.sessionStorage.getItem('getServerTimeLocalTime'));;
    let serverTime: number = parseInt(window.sessionStorage.getItem('serverTime'));
    const localTime = new Date().getTime();
    const newServerTime = (localTime - getServerTimeLocalTime) + serverTime;
    return format(newServerTime, formatString);
  }

  /**
   * 通过调用 API 获取服务器时间，并将 API 请求时间加上响应时间来计算出最终的服务器时间。
   *
   * @returns 返回一个 Promise 对象，该对象在成功完成 API 调用后会解析为字符串格式的服务器时间值。
   *          同时该函数也会将服务器时间存储在 sessionStorage 中，并使用键“serverTime”进行标识。
   *          如果 API 调用过程中出现错误，则该 Promise 对象会被拒绝并带有相应的错误消息。
   */
  private _getServerTime(): Promise<string> {
    return new Promise((resolve, reject) => {
      let getServerTimeLocalTime: string = window.sessionStorage.getItem('getServerTimeLocalTime');
      let serverTime: string = window.sessionStorage.getItem('serverTime');
      if(!getServerTimeLocalTime || !serverTime) {
        const beforeApiTime = new Date().getTime();
        $hyapi.io.post(null, '/Service/AppModule/getTime', {}, {
          showMsg: false,
          showErrorMsg:false,
          showLoading:false,
          showFailMsg:false,
          successFn: (e => {
            // 获取api请求的时间（用于减少请求慢导致的时间误差）
            const apiLoadTime = new Date().getTime() - beforeApiTime;
            const serverTime = parseInt(e.datas.time) + apiLoadTime;
            const getServerTimeLocalTime = new Date().getTime() + apiLoadTime;
            window.sessionStorage.setItem('serverTime', serverTime.toString());
            window.sessionStorage.setItem('getServerTimeLocalTime', getServerTimeLocalTime.toString());
            resolve(serverTime.toString());
          })
        })
      }
    })
  }
}
