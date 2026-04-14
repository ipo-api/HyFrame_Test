import { Injectable, OnDestroy } from '@angular/core';
import { ModelService } from '../common/domain/service/model.service';
import { $hyapi } from '../api/$hyapi';
import { HyDicData } from './dicInterface';
import { Subject } from 'rxjs';
import { I18nService } from './i18n.service';

@Injectable({
  providedIn: 'root',
})
export class DicService implements OnDestroy {

  private sendIOMap: any = {};

  private dicCache: any = {};

  /** 订阅列表 */
  public subjectObj = {};

  /** 国际化订阅唯一值 */
  private uuid: string = this.i18nService.getUuid();

  constructor(private i18nService: I18nService) {
    this.i18nService.createSubject(this.uuid).subscribe(e => {
      this.dicCache = {};
    });
  }

  ngOnDestroy(): void {
    this.i18nService.clearSubject(this.uuid);
  }

  /** 创建订阅 */
  createSubject(key: string) {
    this.subjectObj[key] = new Subject<any>();
    return this.subjectObj[key];
  }

  /** 销毁订阅 */
  clearSubject(key) {
    if (this.subjectObj[key]) {
      this.subjectObj[key].unsubscribe();
      delete this.subjectObj[key];
    }
  }

  /** 触发订阅 */
  changeSubject(e) {
    for (let key in this.subjectObj) {
      this.subjectObj[key].next(e);
    }
  }

  /**
   * 从服务器获取字典数据。
   * @param dicName - 字典名称，字符串类型，表示要获取的字典的名称。如果该名称不是以't_'开头，则会在请求参数ops中添加dic属性。
   * @param callback - 回调函数，可选参数。当从服务器成功获取到字典数据后，将执行该回调函数，并将获取到的字典数据作为其参数。
   * @param mds - 模型服务对象，可选参数。如果字典名称以'dd_'开头，则需要将获取到的字典数据添加到模型服务对象中。
   * @param ops - 配置选项，可选参数。可以设置一些请求参数，包括dic属性、超时时间等。默认情况下，showMsg为false，allowSameUrl为true。
   * @param ops.dic - 如果字典名称不是以't_'开头，则可以将其指定为ops.dic属性的值。
   * @param ops.[name] - 其他选项。可以传递其他请求参数，例如超时时间等。
   */
  getFromServer(dicName: string, callback?: any, mds?: ModelService, ops?: { dic?: string, [name: string]: any }) {
    if (dicName.indexOf('t_') != 0) {
      ops = ops || {};
      ops = JSON.parse(JSON.stringify(ops));
      ops['dic'] = dicName;
      $hyapi.io.post(null, 'Service/Dic/getDic', ops, {
        showMsg: false,
        allowSameUrl: true,
        successFn: (resBody) => {
          let dic = resBody.datas[dicName] || [];
          if (dicName.indexOf('dd_') != 0) {    //不是动态字典
            this.push({ name: dicName, value: dic });
          } else {
            mds.pushDic({ name: dicName, value: dic });
          }
          this.changeSubject({ name: dicName, value: dic });
          if (callback) {
            callback(dic);
          }
        }
      });
    }
  }

  getDicData(dicName: string, mds: ModelService, ops?: { dic?: string, [name: string]: any }) {
    return new Promise((resolve) => {
      if (dicName && dicName.indexOf('t_') != 0) {
        const data = this.getFromCache(dicName, mds);
        if (data && data.length > 0) {
          resolve(data);
          return;
        }
        $hyapi.io.post(null, 'Service/Dic/getDic', { dic: dicName }, {
          showMsg: false,
          allowSameUrl: true,
          successFn: (resBody) => {
            const dic = resBody.datas[dicName] || [];
            if (dic && dic.length === 0) {
              const data = this.getFromCache(dicName, mds);
              resolve(data)
            } else {
              resolve(dic)
            }
          },
          failFn: () => {
            const data = this.getFromCache(dicName, mds);
            resolve(data);
          }
        })
      } else {
        const data = this.getFromCache(dicName, mds);
        resolve(data);
      }
    })
  }

  getFromCache(dicName: string, mds?: ModelService) {
    if (dicName) {
      if ($hyapi.dic.isDicTmp(dicName)) {
        if (mds && mds.getDic) {
          return mds.getDic(dicName);
        }
      } else {
        return this.dicCache[dicName];
      }
    }
  }

  getDic(dicName: string, callback?: (any?) => void, mds?: ModelService, ops?: { $self?: any, waitRetryCount?: any, callback?: (any?) => void }) {
    // let returnObj = self.dicCache[dicName];
    ops = ops || {};
    // ops.id = ops.id || Math.random();
    // console.log(ops.id + ":" + ops["$waitRetryCount"]);
    let self = ops.$self || this;
    let returnObj = self.getFromCache(dicName, mds);

    if (returnObj) {
      if (callback) {
        callback(returnObj);
      } else {
        return returnObj;
      }
    } else {
      if (ops['$waitRetryCount']) {     //属于被阻塞的获取字典阶段，等待字典回来
        if (ops['$waitRetryCount'] >= 10) {  //等待了10次
          return;
        } else {  //继续等
          ops['$waitRetryCount'] = ops['$waitRetryCount'] + 1;
          setTimeout(self.getDic, 500, dicName, callback, mds, ops);
        }
      } else {
        //时间检查
        if (dicName.indexOf('dd_') != 0) {
          if (self.checkSendIOMap(dicName)) {
            self.sendIOMap[dicName] = new Date();
            self.getFromServer(dicName, callback, mds, ops);
          } else {
            ops['$waitRetryCount'] = 1;
            ops['$self'] = self;
            setTimeout(self.getDic, 500, dicName, callback, mds, ops);
          }
        } else {
          self.getFromServer(dicName, callback, mds, ops);
        }
      }
    }
  }

  /**
   *业务尽量少用push(),因为该方法是框架内部使用的方法
   */
  push(dic: HyDicData) {
    if (dic && dic.name) {
      // let oldValue = this.dicCache[dic.name];
      // if(oldValue){
      //     oldValue.splice(0, oldValue.length);
      //     oldValue.push(...dic.value);
      // }else{
      this.dicCache[dic.name] = dic.value;
      // }
    }
  }

  cache(dic: HyDicData, mds?: ModelService) {
    if (this.isDicTmp(dic.name)) {
      mds.pushDic(dic);
    } else {
      this.push(dic);
    }
    this.changeSubject(dic);
  }

  isDicTmp(dicName: string) {
    if (dicName) {
      return dicName.indexOf('t_') === 0 || dicName.indexOf('dd_') === 0
    } else {
      return null;
    }
  }

  getDicTextFromCache(dicName: string, dicValue: any, mds?: ModelService, separator?: string) {
    let selectCellText = '';
    let dics = this.getFromCache(dicName, mds);
    if (dics && dics.length > 0 && (dicValue || dicValue === 0)) {
      if (dicValue instanceof Array) {
        for (let i = 0; i < dicValue.length; i++) {
          let code = dicValue[i];
          for (let j = 0; j < dics.length; j++) {
            let item = dics[j];
            if (item.id === code + '') {
              if (separator && separator.length > 0) {
                selectCellText = selectCellText + separator + item.text;
              } else {
                selectCellText = selectCellText + ',' + item.text;
              }

              break;
            }
          }
        }
        if (selectCellText) {
          selectCellText = selectCellText.substr(1);
        }
      } else {
        for (let i = 0; i < dics.length; i++) {
          let item = dics[i];
          if (item.id === dicValue + '') {
            selectCellText = item.text;
            break;
          }
        }
      }
    }
    return selectCellText;
  }

  checkSendIOMap(dicName: string): boolean {
    if (this.sendIOMap[dicName]) {
      let curTime: Date = new Date();
      return curTime.getTime() - this.sendIOMap[dicName].getTime() >= 1000;
    } else {
      return true;
    }
  }
}
