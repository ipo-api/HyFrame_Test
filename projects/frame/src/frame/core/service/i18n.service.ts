import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { en_US, NzI18nService, zh_CN, zh_TW, zh_HK } from 'ng-zorro-antd/i18n';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { HyLanguageData } from './i18nInterface';
import { ReuseStrategyService } from './reuseStrategy.service';
import { AppGlobal } from '../../config/AppGlobal';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

/**
 * 统一初始化提供者
 * @param options 初始化配置
 */
export function provideHyI18nInit(FrameConfig: any, ApiConfig: any): Provider[] {
  // 初始化 Provider 数组
  const providers: Provider[] = [];

  console.log(FrameConfig.i18nLanguage);

  providers.push({
    provide: APP_INITIALIZER,
    useFactory: (initService: I18nService) => () => initService.init(FrameConfig, ApiConfig),
    deps: [I18nService],
    multi: true
  });

  return providers;
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private ApiConfig: any;

  private FrameConfig: any;

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
   * @param {boolean} isSubscribe - 是否自动订阅，默认为 true（自动订阅）
   * @returns {Observable<any> | void} 当 isSubscribe=false 时返回 Observable，否则自动订阅返回 void
   */
  public setLanguage(language: HyLanguageData, isSubscribe: false): Observable<any>;
  public setLanguage(language: HyLanguageData, isSubscribe?: true): void;
  public setLanguage(language: HyLanguageData, isSubscribe?: boolean): Observable<any> | void {
    const obs$ = this.setLanguageData$(language);
    
    if (isSubscribe === false) {
      return obs$;
    }
    
    obs$.subscribe();
  }

  /** 
   * 初始化国际化语言
   * @param FrameConfig - 框架配置
   * @param ApiConfig - API配置
   * @returns {Observable<any>} 返回 Observable，用于异步处理
   */
  public init(FrameConfig: any, ApiConfig: any) {
    this.ApiConfig = ApiConfig;
    this.FrameConfig = FrameConfig;
    return this.getLanguageList().pipe(
      concatMap(data => this.getUserLanguage(data)),
      concatMap(data => this.setLanguageData$(data)),
      map(() => of(true))
    );
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
      for (let i = 0; i < arr.length; i++) {
        const index = newValueArr.indexOf('$' + i);
        if (index !== -1) {
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

  /** 
   * 设置语言数据
   * @param language 语言数据
   */
  private setLanguageData$(language: HyLanguageData) {
    const appI18n$ = this.http.get('assets/i18n/app/' + language.id + '.json?' + new Date().getTime());
    const frameI18n$ = this.http.get('assets/i18n/frame/' + language.id + '.json?' + new Date().getTime());
    return forkJoin([appI18n$, frameI18n$]).pipe(
      tap(([appI18n, frameI18n]) => {
        this.language = language;
        this.i18nData = appI18n || {};
        this.i18nFrameData = frameI18n || {};
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
    )
  }

  /** 
   * 获取用户语言
   * @param languageList 支持的语言列表
   * @returns Observable<HypLanguageData> 用户选择语言
   */
  public getUserLanguage(languageList: HyLanguageData[]): Observable<HyLanguageData> {
    return this.http.post<any>('Action/ConsLanguage/get', {}).pipe(
      map(res => {
        if (res?.datas?.i18n) {
          const language = languageList.find(item => item.id === res.datas.i18n);
          if (language) {
            return language;
          }
          return languageList[0];
        }
        return languageList[0];
      }),
      catchError(() => of(languageList[0]))
    )
  }

  /** 
   * 获取国际化语言列表
   */
  private getLanguageList(): Observable<HyLanguageData[]> {
    return this.http.post<any>(this.ApiConfig.system.getLanguageList || 'Service/ConsLanguage/getModules_ShowMenu', {}, {}).pipe(
      map(res => res.datas.i18nLanguages || this.FrameConfig.i18nLanguages),
      catchError(() => of(this.FrameConfig.i18nLanguages))
    )
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
