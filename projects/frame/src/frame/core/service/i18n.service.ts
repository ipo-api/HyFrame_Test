import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { en_US, NzI18nService, zh_CN, zh_TW, zh_HK } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { HyLanguageData } from './i18nInterface';
import { ReuseStrategyService } from './reuseStrategy.service';
import { AppGlobal } from '../../config/AppGlobal';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  /** 当前语言 */
  private _language: HyLanguageData;
  public set language(value: HyLanguageData | undefined | null) {
    this._language = value;
  }
  public get language() {
    return this._language;
  }

  /** 订阅列表 */
  private subjectObj = {};

  /** 业务翻译数据 */
  public i18nData;

  /** 框架翻译数据 */
  public i18nFrameData;

  /** 默认语言的菜单名称 */
  private defaultMenuName: { menuId: string, name: string }[] = [];

  private cannotClearSubIds: string[] = [];

  constructor(private http: HttpClient, private nzI18nService: NzI18nService) {
  }

  /**
   * 设置语言用于国际化。
   *
   * @param {HyLanguageData} language - 要设置的语言数据。
   * @param {boolean} [isLogout=false] - 可选参数，指示用户是否已登录。默认值为 `false`。
   * @returns {void}
   */
  public setLanguage(language: HyLanguageData) {
    this.setLanguageData(language);
  }

  /** 创建订阅 */
  public createSubject(key): Subject<any> {
    this.subjectObj[key] = new Subject<any>();
    return this.subjectObj[key];
  }

  /** 销毁订阅 */
  public clearSubject(key) {
    if (this.subjectObj[key]) {
      this.subjectObj[key].unsubscribe();
      delete this.subjectObj[key];
    } else {
      this.cannotClearSubIds.push(key);
      this.clearCannotClearSubIds();
    }
  }

  /** 清除无法及时销毁的订阅 */
  private clearCannotClearSubIds() {
    if (this.cannotClearSubIds.length > 0) {
      const key = this.cannotClearSubIds[0];
      if (this.subjectObj[key]) {
        this.subjectObj[key].unsubscribe();
        delete this.subjectObj[key];
        this.cannotClearSubIds.splice(0, 1);
        this.clearCannotClearSubIds();
      } else {
        setTimeout(() => {
          this.clearCannotClearSubIds();
        }, 1000);
      }
    }
  }

  /** 触发订阅 */
  private changeSubject(e) {
    for (let key in this.subjectObj) {
      this.subjectObj[key].next(e);
    }
  }

  /** 手动获取翻译（框架用) */
  public getFrameI18n(text: any, arr?: any[]) {
    if (typeof text === 'string') {
      return this.setNewValue('frame', text, arr);
    }
    return text;
  }

  /** 手动获取翻译（业务用） */
  public get(text: string, arr?: any[]) {
    return this.setNewValue('app', text, arr);
  }

  /** 
   * 获取默认语言菜单名称-此方法只能在hy-main-page环境内使用
   * @param {string} menuId -菜单id
   */
  public getDefaultMenuName(menuId: string) {
    const data = this.defaultMenuName.find(item => item.menuId === menuId);
    if (data) {
      return data.name;
    } else {
      return null;
    }
  }

  /** 初始化默认语言菜单的翻译数据 */
  public initDefaultLanguageMenu(menuData) {
    return new Promise((resolve, reject) => {
      if (menuData && menuData.length > 0) {
        this.http.get('assets/i18n/app/' + AppGlobal.i18nLanguages[0].id + '.json?' + new Date().getTime()).subscribe(data => {
          if (data) {
            this.defaultMenuName = [];
            const fn = (menu) => {
              menu.forEach(element => {
                if (data[element.name]) {
                  this.defaultMenuName.push({
                    menuId: element.menuId,
                    name: data[element.name]
                  })
                }
                if (element.children && element.children.length > 0) {
                  fn(element.children);
                }
              });
            }
            fn(menuData);
          }
          resolve(true);
        }, err => {
          reject(true);
        })
      } else {
        resolve(true);
      }
    })
  }

  /** 设置新的value值 */
  private setNewValue(type: 'frame' | 'app', key: string, arr?: string[]) {
    if (!key) return;
    const i18nData = type === 'app' ? this.i18nData : this.i18nFrameData;
    let newValue = i18nData?.[key] || key;
    if (arr?.length > 0) {
      const newValueArr = this.splitStringWithPlaceholders(newValue);
      for(let i = 0; i < arr.length; i++){
        const index = newValueArr.indexOf('$'+i);
        if(index !== -1){
          newValueArr[index] = arr[i];
        }
      }
      newValue = newValueArr.join('');
    }
    return newValue;
  }

   /**
   * 拆分含有$0、$1等占位符的字符串
   * @param text 要拆分的字符串，如"AcctShowPwd.div.密码：$0，$1"
   * @returns 拆分后的数组，如['AcctShowPwd.div.密码：','$0','，','$1']
   */
   private splitStringWithPlaceholders(text: string): string[] {
    // 正则表达式匹配$后跟数字的模式
    const regex = /(\$\d+)/g;
    
    // 使用正则表达式拆分字符串
    const parts: string[] = [];
    let lastIndex = 0;
    let match;
    
    while ((match = regex.exec(text)) !== null) {

      // 添加占位符前的文本
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // 添加占位符
      parts.push(match[0]);
      
      lastIndex = match.index + match[0].length;
    }
    
    // 添加最后一段文本（如果有）
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts;
  }

  private setLanguageData(language: HyLanguageData) {
    const getList = [];
    getList.push(this.http.get('assets/i18n/app/' + language.id + '.json?' + new Date().getTime()).toPromise());
    getList.push(this.http.get('assets/i18n/frame/' + language.id + '.json?' + new Date().getTime()).toPromise());
    Promise.all(getList).then(res => {
      this.language = language;
      this.i18nData = res[0] || {};
      this.i18nFrameData = res[1] || {};
      if (language.id === 'zh_CN') {
        this.nzI18nService.setLocale(zh_CN);
      }
      if (language.id === 'zh_HK') {
        zh_HK.Empty.description = '暫無數據';
        this.nzI18nService.setLocale(zh_HK);
      }
      if (language.id === 'en_US') {
        this.nzI18nService.setLocale(en_US);
      }

      this.reuseStrategyClear();
      this.changeSubject(language);
    })
  }

  /** 如果有路由复用则清空路由复用缓存，并且回到路由复用的第一页 */
  private reuseStrategyClear() {
    if (ReuseStrategyService.routeCacheList?.length > 0) {
      const route = ReuseStrategyService.routeCacheList[0].route;
      ReuseStrategyService.clearAllCache().then(() => {
        AppGlobal.router.navigate([route]);
      });
    }
  }

  /** 获取唯一值 */
  public getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
