import { AppGlobal } from '../../config/AppGlobal';
import { mixin } from '../util/lang/Lang';
import { ModelService } from '../common/domain/service/model.service';
import { TemplateRef } from '@angular/core';
import { UrlUtil } from '../util/url/UrlUtil';
import { HyApiDownloadOpt, HyApiPostOpt, HyApiSecretOpt } from './interface';
import { HyDicData } from '../service/dicInterface';
import { NzModalRef } from 'ng-zorro-antd/modal';

const timeObj = {};
export class $hyapi {

  /**
   * 更新弹出窗口的配置项。
   *
   * @param dialogModal - 要更新的弹出窗口的NzModalRef对象。
   * @param ops - 弹出窗口选项的新配置值，包括可选的关闭、宽度和标题选项。
   * @param ops.closable - 是否可以通过单击外部区域或按ESC键关闭弹出窗。默认为true。
   * @param ops.width - 弹出窗口的宽度。可以使用字符串或数字表示，也可以不指定以允许自适应。默认为'auto'。
   * @param ops.content - 弹出窗口的内容。可以使用字符串或模板引用表示。
   * @param ops.okText - 确认按钮的文本，默认为'确定'。
   * @param ops.cancelText - 取消按钮的文本，默认为'取消'。
   * @param ops.autofocus - 自动聚焦的元素，可以是确认按钮、取消按钮或自动（null）。默认为null。
   */
  private static updateConfig(dialogModal: NzModalRef, ops: { closable?: boolean, width?: string | number, content?: string | TemplateRef<any>, okText?: string, cancelText?: string, autofocus?: 'ok' | 'cancel' | 'auto' }) {
    const lastConfig = dialogModal.getConfig();
    dialogModal.updateConfig({
      nzWidth: ops.width || lastConfig.nzWidth,
      nzClosable: ops.closable ?? lastConfig.nzClosable,
      nzAutofocus: ops.autofocus || lastConfig.nzAutofocus,
      nzContent: ops.content || lastConfig.nzContent,
      nzOkText: ops.okText || lastConfig.nzOkText,
      nzCancelText: ops.cancelText || lastConfig.nzCancelText,
    })
  }

  /** 
   * 弹窗
   * @param show - 会话窗口
   * @param close - 关闭会话窗口
   * @param createTips - 不打断操作的全局提示
   * @param loading 正在加载提示
   * @param closeLoading 关闭正在加载提示
   * @param confirm 对话窗口（确认或取消窗口）
   * @param showErrorMessage 自定义gt表单错误提示
   */
  static msg = {
    /**
     * 显示消息通知
     *
     * @param {('success' | 'info' | 'warning' | 'error' | 'info')} type - 消息类型
     * @param {string | TemplateRef} msg - 消息内容，可以是字符串或Angular模板引用
     * @param {{ width?: string | number, callback?: () => void | any, content?: string | TemplateRef, closable?: boolean }} [ops] - 可选参数对象
     * @param {string | number} [ops.width] - 消息框的宽度
     * @param {() => void | any} [ops.callback] - 回调函数，在消息关闭时执行
     * @param {string | TemplateRef} [ops.content] - 消息框的附加内容，可以是字符串或Angular模板引用
     * @param {boolean} [ops.closable] - 右上角是否有按钮可关闭消息框，默认为false
     * @returns {*}  返回AppGlobal.hyapiService.msg的结果
     */
    show(type: 'success' | 'info' | 'warning' | 'error' | 'info', msg: string | TemplateRef<any>, ops?: { width?: string | number, callback?: () => void | any, content?: string | TemplateRef<any>, closable?: boolean }) {
      ops = ops || {};
      return AppGlobal.hyapiService.msg(type, msg, ops);
    },

    /**
     * 不打断操作的全局提示
     * @param type - 提示类型 'success' | 'info' | 'warning' | 'error' | 'info'
     * @param msg - 提示内容 string
     * @param ops - 配置参数 { duration?: number }
     */
    createTips(type: 'success' | 'info' | 'warning' | 'error' | 'info', msg: string | TemplateRef<any>, ops?: { duration?: number }) {
      return AppGlobal.hyapiService.createTips(type, msg, ops);
    },

    /** 
     * 正在加载提示
     * @param ops - 配置参数 { msg?: string, time?: number }
     */
    loading(ops?: { msg?: string, time?: number }) {
      return AppGlobal.hyapiService.loading(ops);
    },

    /** 
     * 关闭正在加载提示
     * @param id - 正在显示的加载提示
     */
    closeLoading(id) {
      return AppGlobal.hyapiService.closeLoading(id);
    },

    /**
     * 生成一个对话窗口，用于确认或取消操作。
     * @param msg - 显示在对话框中的提示内容，可以是字符串或模板引用。
     * @param ops - 配置参数，包括可选的宽度、确认/取消按钮文本、内容、回调函数、取消函数和是否可关闭等属性。
     * @param ops.width - 对话框的宽度。可以使用字符串或数字表示，也可以不指定以允许自适应。默认为'auto'。
     * @param ops.okText - 确认按钮的文本，默认为'确定'。
     * @param ops.cancelText - 取消按钮的文本，默认为'取消'。
     * @param ops.content - 对话框中显示的内容。可以使用字符串或模板引用表示。
     * @param ops.callback - 用户点击确认按钮时要执行的回调函数。
     * @param ops.cancel - 用户点击取消按钮时要执行的回调函数。
     * @param ops.closable - 是否可以通过单击外部区域或按ESC键关闭对话框。默认为true。
     */
    confirm(msg: string | TemplateRef<any>, ops?: { width?: string | number, okText?: string, cancelText?: string, content?: string | TemplateRef<any>, callback?: () => void, cancel?: () => void, closable?: boolean }) {
      return AppGlobal.hyapiService.confirm(msg, ops);
    },

    /** 
     * 关闭会话窗口
     * @param tplModal - 正在显示的会话窗口
     */
    close(tplModal) {
      return AppGlobal.hyapiService.closeTplModal(tplModal);
    },

    /** 
     * 自定义gt表单错误提示
     * @param value - 提示内容 
     * @param mds - ModelService { gtName<gt名称>: string, errorData: Array<{ modelName<组件的model名称>: string, message<提示的错误信息>: string }> }
     */
    showErrorMessage(value: { gtName: string, errorData: Array<{ modelName: string, message: string }> }, mds: ModelService) {
      const modelName = value.gtName;
      if (!mds.tableServiceMap[modelName]) return;
      const errorData = value.errorData;
      errorData.forEach(element => {
        const formControlName = modelName + '.' + element.modelName;
        const formGroup = mds.tableServiceMap[modelName].formService.formGroup.controls[formControlName];
        // 主动变脏数据
        formGroup.markAsDirty();
        formGroup.setErrors({ data: false, msg: element.message });
        clearTimeout(timeObj[formControlName]);
        timeObj[formControlName] = setTimeout(() => {
          formGroup.setErrors(null);
          delete timeObj[formControlName];
        }, 3000);
      });
    },

    /**
     * 更新弹出窗口的配置项。
     *
     * @param dialogModal - 要更新的弹出窗口的NzModalRef对象。
     * @param ops - 弹出窗口选项的新配置值，包括可选的关闭、宽度和标题选项。
     * @param ops.closable - 是否可以通过单击外部区域或按ESC键关闭弹出窗。默认为true。
     * @param ops.width - 弹出窗口的宽度。可以使用字符串或数字表示，也可以不指定以允许自适应。默认为'auto'。
     * @param ops.content - 弹出窗口的内容。可以使用字符串或模板引用表示。
     * @param ops.okText - 确认按钮的文本，默认为'确定'。
     * @param ops.cancelText - 取消按钮的文本，默认为'取消'。
     * @param ops.autofocus - 自动聚焦的元素，可以是确认按钮、取消按钮或自动（null）。默认为null。
     */
    updateConfig(dialogModal: NzModalRef, ops: { closable?: boolean, width?: string | number, content?: string | TemplateRef<any>, okText?: string, cancelText?: string, autofocus?: 'ok' | 'cancel' | 'auto' }) {
      $hyapi.updateConfig(dialogModal, ops)
    },
  };

  /** 
   * 模版弹窗
   * @param show - 显示模版弹窗
   * @param close - 关闭模版弹窗
   * @param closeAll - 关闭所有模版弹窗
   */
  static dialog = {
    /**
     * 显示带有自定义内容的模态弹出窗口。
     *
     * @param tplContent - 弹出窗口中要显示的自定义内容。
     * @param ops - 弹出窗口选项的配置值，包括可选的关闭、宽度和标题选项，以及取消和回调函数。
     * @param ops.closable - 是否可以通过单击外部区域或按ESC键关闭弹出窗。默认为true。
     * @param ops.width - 弹出窗口的宽度。可以使用字符串或数字表示，也可以不指定以允许自适应。默认为'auto'。
     * @param ops.title - 弹出窗口的标题。可以使用字符串或模板引用表示。
     * @param ops.cancel - 在关闭对话框时要执行的取消操作的回调函数。
     * @param ops.callback - 在关闭对话框时要执行的回调函数。
     */
    show(tplContent: TemplateRef<{}>, ops?: { closable?: boolean, width?: string | number, title?: string | TemplateRef<any>, cancel?: () => void, callback?: () => void }) {
      return AppGlobal.hyapiService.dialog(tplContent, ops);
    },

    /**
     * 更新弹出窗口的配置项。
     *
     * @param dialogModal - 要更新的弹出窗口的NzModalRef对象。
     * @param ops - 弹出窗口选项的新配置值，包括可选的关闭、宽度和标题选项。
     * @param ops.closable - 是否可以通过单击外部区域或按ESC键关闭弹出窗。默认为true。
     * @param ops.width - 弹出窗口的宽度。可以使用字符串或数字表示，也可以不指定以允许自适应。默认为'auto'。
     * @param ops.content - 弹出窗口的内容。可以使用字符串或模板引用表示。
     */
    updateConfig(dialogModal: NzModalRef, ops: { closable?: boolean, width?: string | number, content?: string | TemplateRef<any> }) {
      $hyapi.updateConfig(dialogModal, ops)
    },

    /** 
     * 关闭模版弹窗
     * @param dialogModal - 正在显示的模板弹窗
     */
    close(dialogModal) {
      AppGlobal.hyapiService.closeDialog(dialogModal);
    },

    /** 
     * 关闭所有模版弹窗
     */
    closeAll() {
      return AppGlobal.hyapiService.closeAll();
    }
  };

  /** 
   * 请求
   * @param post - post请求
   */
  static io = {
    /** 
     * post请求
     * @param mds - 存放当前页面数据的服务 ModelService
     * @param url - 向后端发起请求的url地址 string
     * @param datas - 请求到后端的数据项 object
     * @typedef {Object<HyApiPostOpt>} - 接口配置
     * @property { any } check_cors_lt - 检查跨域的token是否过期
     * @property { any } glt - glt名称
     * @property { any } is_cors - 是否跨域请求
     * @property { any } gltNewSearch - *
     * @property { boolean } showMsg -默认值:false; 是否显示操作成功的信息
     * @property { boolean } showFailMsg - 默认值:true; 是否显示异常信息，从后端抛出，响应的数据格式正常，只是后端返回的isSuccess为false
     * @property { boolean } showErrorMsg - 默认值true; 是否显示异常信息，html的异常信息，无响应结果，如‘404 - Not Found’
     * @property { boolean } showTimeoutMsg - 默认值true; 是否显示登录超时对话框’
     * @property { boolean } allowSameUrl - 默认值false; true：请求未结束，允许重复请求同一个url；false：请求未结束束，不允许重复请求同一个url
     * @property { boolean } is_get_server_time - *
     * @property { any } myLoginedToken_CORS - *
     * @property { boolean } is_logined_token_refresh - *
     * @property { 'form' | 'multipartForm' , 'application/json' } contentType - 默认值:application/json; 数据请求到后端的类型
     * @property { object } headers - 请求头
     * @property { boolean } isFile - 默认值:false; 是否文件类型 默认值false
     * @property { boolean | { time?: number,msg?:string }} showLoading - 默认值:false; 是否显示加载
     * @property { (any?) => void } httpFailFn - ops.httpFailFn()	http异常的回调函数
     * @property { (any?) => void } failFn - 失败函数的回调
     * @property { (any?) => void } successFn - 成功函数的回调
     * @property { (any?) => void } successFn_LT - *
     * @property { (any?) => void } failFn_LT - *
     */
    post(mds: ModelService | null, url: string, datas: any, ops: HyApiPostOpt, secretOpt?: HyApiSecretOpt) {
      if (ops.check_cors_lt) {
        if ($hyapiHelper.io.dealCORS_LT(mds, url, datas, ops, secretOpt)) {
          return;
        }
      }
      if (AppGlobal.onoff_loginedToken) {
        ops.successFn_LT = () => {
          $hyapi.io.post(mds, url, datas, ops, secretOpt);
        };

        ops.failFn_LT = () => {
          $hyapi.io.post(mds, url, datas, ops, secretOpt);
        };

        if ($hyapiHelper.io.dealLT(ops)) {
          return;
        }
      }
      if (ops.contentType !== 'multipartForm') {
        const dataString = JSON.stringify(datas || {});
        datas = JSON.parse(dataString);
      }
      ops = ops || {};

      //发送前预处理
      if (ops.glt) {
        for (let key in ops.glt) {
          let modelName = ops.glt[key];
          if (mds[modelName + '_$Property']) {
            datas[modelName + '_$Property'] = datas[modelName + '_$Property'] || {};
            delete mds[modelName + '_$Property']['radioCheckRow'];
            mixin(datas[modelName + '_$Property'], mds[modelName + '_$Property']);
          } else {
            datas[modelName + '_$Property'] = datas[modelName + '_$Property'] || {};
            delete datas[modelName + '_$Property']['radioCheckRow'];
            datas[modelName + '_$Property'].pageSize = 10;
            datas[modelName + '_$Property'].curPage = 1;
          }
          if (ops.gltNewSearch != null && ops.gltNewSearch) {
            datas[modelName + '_$Property'].curPage = 1;
          }
          mds[modelName + '_$io'] = mds[modelName + '_$io'] || {};
          mds[modelName + '_$io']['url'] = url;
          mds[modelName + '_$io']['timestamp'] = Date.now();
          mds[modelName + '_$io']['datas'] = datas;
          mds[modelName + '_$io']['ops'] = ops;
        }
      }

      if (!AppGlobal.ioService.checkUrl(mds, url, datas, ops)) {
        $hyapi.msg.createTips('error', AppGlobal.i18nLanguage ? 'hyApi.请稍后再操作！' : '请稍后再操作！');
        return;
      }

      AppGlobal.ioService.send(mds, url, datas, ops, secretOpt).subscribe((resBody) => {
        if (resBody != null) {
          if (resBody.success) {
            //数据预处理
            if (!ops.isApiMode) {
              for (let key in resBody.datas) {
                if (key.indexOf('gt_') === 0) {
                  mds[key] = {};
                  Object.assign(mds[key], resBody.datas[key]);
                } else if (key.indexOf('glt_') === 0) {
                  if (key.endsWith('_$Property')) {
                    mds[key] = mds[key] || {};
                    mixin(mds[key], resBody.datas[key]);
                  } else {
                    $hyapi.model.setGltData(mds, key, resBody.datas[key], true);
                  }
                }
              }
            }

            if (ops.successFn) {
              ops.successFn(resBody);
            }
          } else {
            if (ops.failFn) {
              ops.failFn(resBody);
            }
          }
        }
      });
    },

    /** 下载 */
    download(url: string, datas?: object, ops?: HyApiDownloadOpt) {
      AppGlobal.ioService.download(url, datas, ops);
    }
  };

  /** 
   * window新建窗口
   * @param open - 新建窗口
   */
  static window = {
    /** 
     * 新建窗口
     * @param url - 新窗口打开的地址 string
     * @param target - 窗口名称 string 
     * @param features - 窗口参数,使用逗号隔开，如（'width=400,height=200'） string
     * @param i18n - 开启后将在url后缀拼上acceptLanguage=xxx的当前语言id（zh_CN/en_US） boolean
     */
    open(url?: string, target?: string, features?: string, i18n?: boolean) {
      AppGlobal.hyapiService.windowOpen(AppGlobal, url, target, features, i18n);
    }
  };

  /** 
   * 字典
   * @param get - 获取字典数据
   * @param getFromCache - 获取字典数据
   * @param getFromServer - 通过向后端发请求获取字典数据
   * @param cache - 向缓存中写入字典数据
   * @param isDicTmp - 根据字典的命名来判断是否是以“dd”_开头的动态字典或以“t_”开头的临时字典，返回值为boolean类型
   * @param getDicTextFromCache - 通过字典项的id获取对应的字典名称
   * @param getDicData - 根据字典名返回数据，Promise类型，请使用.then(e=>{}) 获取内容
   */
  static dic = {
    /** 
     * 获取字典数据
     * @param dicName - 字典名称 string
     * @param mds - mds ModelService 
     * @param ops - 配置参数 {callback?: (any?) => void }
     */
    get(dicName: string, mds?: ModelService, ops?: { callback?: (any?) => void }) {
      let callback = null;
      if (ops && ops.callback) {
        callback = ops.callback;
      }
      return AppGlobal.dicService.getDic(dicName, callback, mds, ops);
    },
    /** 
     * 获取字典数据
     * @param dicName - 字典名称 string
     * @param mds - mds ModelService 
     */
    getFromCache(dicName: string, mds?: ModelService) {
      return AppGlobal.dicService.getFromCache(dicName, mds);
    },
    /** 
     * 通过向后端发请求获取字典数据
     * @param dicName - 字典名称 string
     * @param mds - mds ModelService 
     * @param ops - 参数 { dic?: string, [name: string]: any }
     * @param callback - 回调方法 (any?) => void 
     */
    getFromServer(dicName: string, mds?: ModelService, ops?: { dic?: string, [name: string]: any }, callback?: (any?) => void) {
      return AppGlobal.dicService.getFromServer(dicName, callback, mds, ops);
    },
    /** 
     * 向缓存中写入字典数据
     * @param dic - 字典项 HyDicData
     * @param mds - mds ModelService 
     */
    cache(dic: HyDicData, mds?: ModelService) {
      return AppGlobal.dicService.cache(dic, mds);
    },
    /** 
     * 根据字典的命名来判断是否是以“dd”_开头的动态字典或以“t_”开头的临时字典，返回值为boolean类型。
     * @param dicName - 字典项 HyDicData
     */
    isDicTmp(dicName: string): boolean {
      return AppGlobal.dicService.isDicTmp(dicName);
    },
    /** 
     * 通过字典项的id获取对应的字典名称
     * @param dicName - 字典名 string
     * @param dicValue - 字典项的id string
     * @param mds - mds ModelService
     * @param separator - 展示多选字典数据时的分隔符 string
     */
    getDicTextFromCache(dicName: string, dicValue: any, mds?: ModelService, separator?: string) {
      return AppGlobal.dicService.getDicTextFromCache(dicName, dicValue, mds, separator);
    },
    /** 
     * 根据字典名返回数据，Promise类型，请使用.then(e=>{}) 获取内容
     * @param dicName - 字典名 string
     * @param mds - mds ModelService
     */
    getDicData(dicName: string, mds: ModelService): Promise<any> {
      return AppGlobal.dicService.getDicData(dicName, mds);
    }
  };

  /** 
   * 操作ModelService数据
   *  @param initGt - 初始化单记录表
   *  @param initGlt - 初始化多记录表
   *  @param setGtData - 给单记录表赋值
   *  @param setGltData - 给多记录表赋值
   *  @param getGltPageInfo - 获取多记录表的分页信息
   *  @param setGltPageInfo - 设置多记录表的分页信息
   *  @param markAsPristine - 设置gt回到组件刚创建的状态（不会触发基础校验）
   */
  static model = {
    /** 
    * 初始化单记录表
    * @param mds - 存放当前页面数据的服务 ModelService
    * @param gtName - gt名称，如'gt_test' string
    * @param needReset - 是否需要重置;true:gt的各个字段的值为undified或null; false:gt为空对象 boolean
    */
    initGt(mds: ModelService, gtName: string, needReset?: boolean) {
      mds[gtName] = {};
      if (needReset == null || needReset == true) {
        mds.tableServiceMap[gtName].formService.formGroup.reset();
      }
    },
    /** 
    * 初始化多记录表
    * @param mds - 存放当前页面数据的服务 ModelService
    * @param gltName - glt名称，如'glt_test' string
    */
    initGlt(mds: ModelService, gltName: string) {
      mds[gltName] = []; //初始化多记录表
      mds[gltName + '_$Property'] = mds[gltName + '_$Property'] || {};
      mds[gltName + '_$Property'].curPage = 1;
      mds[gltName + '_$Property']['pageSize'] = mds[gltName + '_$Property'].pageSize || 10;
      mds[gltName + '_$io'] = {};
    },
    /** 
     * 给单记录表赋值
     * @param mds - 存放当前页面数据的服务 ModelService
     * @param gtName - gt名称，如'gt_test' string
     * @param data - 需要赋值的数据 object
     */
    setGtData(mds: ModelService, gtName: string, data: object) {
      mds[gtName] = mds[gtName] || {};
      Object.assign(mds[gtName], data);
    },
    /** 
     * 给多记录表赋值
     * @param mds - 存放当前页面数据的服务 ModelService
     * @param gltName - glt名称，如'glt_test' string
     * @param datas - 需要赋值的数据 Array<object>
     */
    setGltData(mds: ModelService, gltName: string, datas: Array<object>, isApi?: boolean) {
      mds[gltName] = mds[gltName] || [];
      if (!isApi) {
        mds[gltName + '_isSetGltData'] = true;
      }
      mds[gltName] = datas;
    },
    /** 
     * 获取多记录表的分页信息
     * @param mds - 存放当前页面数据的服务 ModelService
     * @param gltName - glt名称，如'glt_test' string
     */
    getGltPageInfo(mds: ModelService, gltName: string) {
      return mds[gltName + '_$Property'];
    },
    /** 
    * 设置多记录表的分页信息
    * @param mds - 存放当前页面数据的服务 ModelService
    * @param gltName - glt名称，如'glt_test' string
    * @param data - 分页数据 { count?: number, curPage?: number, pageSize?: number }
    */
    setGltPageInfo(mds: ModelService, gltName: string, data: { count?: number, curPage?: number, pageSize?: number }) {
      mds[gltName + '_$Property'] = data;
    },
    /**
     * 设置gt回到组件刚创建的状态（不会触发基础校验）
     * @param mds - 存放当前页面数据的服务 ModelService
     * @param gtName - gt名称，如'gt_test' string
     */
    markAsPristine(mds: ModelService, gtName: string) {
      mds.tableServiceMap[gtName].formService.formGroup.markAsPristine();
    }
  };

  /** 
   * 路由跳转方法
   * @param goBackPrevRouterLevel - 路由复用，从当前路由返回到第几级路由，无值时代表返回上一级
   * @param goNextRouter - 路由复用，进入下一级路由
   * @param clearAndGoNextRouter - 路由复用，清除路由缓存的信息，并且进入下一级路由
   */
  static routeReuse = {
    /** 
     * 路由复用，从当前路由返回到第几级路由，无值时代表返回上一级
     * @param level - 返回第几级路由 number
     */
    goBackPrevRouterLevel(level?: number) {
      return AppGlobal.hyapiService.goBackPrevRouter(level);
    },
    /** 
     * 路由复用，进入下一级路由
     * @param url - 需要跳转到某个路由的url地址 string
     */
    goNextRouter(url: string) {
      return AppGlobal.hyapiService.goNextRouter(url);
    },
    /** 
     * 路由复用，清除路由缓存的信息，并且进入下一级路由
     * 使用场景：菜单一种的页面B使用了路由复用，B页面有按钮【跳转】，点击按钮【跳转】需跳转到菜单二中的A页面，此时需使用此方法，作用是：清除B页面缓存信息，并且从B页面跳转到菜单二中的A页面
     * @param url - 需要跳转到某个路由的url地址 string
     */
    clearAndGoNextRouter(url: string) {
      return AppGlobal.hyapiService.clearAndGoNextRouter(url);
    },
  };

  /** 
   * 全局调用事件
   * @param menuClickFn - 菜单事件，业务使用
   * @param menuClick - 触发菜单事件，框架使用
   */
  static globalEvents = {
    /** 菜单事件，业务使用 */
    menuClickFn: <(any?) => void>null,
    /** 触发菜单事件，框架使用 */
    menuClick() {
      if (this.menuClickFn) {
        this.menuClickFn();
      }
    }
  }

}

export class $hyapiHelper {
  static io: any = {
    dealCORS_LT(mds, url, datas, ops, secretOpt?: { encryptKeys?: string[]; secret: boolean }) {
      let urlPre = UrlUtil.getProtocolAndDomain(url);
      let url_getTime = urlPre + '/' + 'Service/AppModule/getTime';
      let url_refreshLT = urlPre + '/' + 'Service/LT/R';
      if (!AppGlobal.loginedToken_CORS_Map[urlPre]) {
        AppGlobal.loginedToken_CORS_Map[urlPre] = {};
        let myGlobal = AppGlobal.loginedToken_CORS_Map[urlPre];
        ops.myLoginedToken_CORS = myGlobal;
        $hyapi.io.post(null, url_getTime, {}, {
          is_cors: true,
          is_get_server_time: true,
          showMsg: false,
          showFailMsg: false,
          showErrorMsg: false,
          successFn: (resBody) => {
            if (resBody.datas['time']) {
              myGlobal.serverTime = resBody.datas['time'];
              myGlobal.localTimeDiff = new Date().getTime() - resBody.datas['time'];
              myGlobal.serverTimeInterval = 10000;
              myGlobal.maxTimeDiffChange = 5000;
              myGlobal.check_loginedToken_reserve_time = 20000;
              setInterval(() => {
                myGlobal.serverTime = myGlobal.serverTime + myGlobal.serverTimeInterval;
                let newDiff: number = new Date().getTime() - myGlobal.serverTime;
                if (Math.abs(newDiff - myGlobal.localTimeDiff) > myGlobal.maxTimeDiffChange) {
                  $hyapi.io.post(null, url_getTime, {}, {
                    is_get_server_time: true,
                    showMsg: false,
                    showFailMsg: false,
                    showErrorMsg: false,
                    successFn: (resBody) => {
                      if (resBody.datas['time']) {
                        myGlobal.serverTime = resBody.datas['time'];
                        myGlobal.localTimeDiff = new Date().getTime() - resBody.datas['time'];
                      }
                    }
                  }, secretOpt);
                }
              }, myGlobal.serverTimeInterval);

              //刷一个新令牌
              $hyapi.io.post(null, url_refreshLT, {}, {
                myLoginedToken_CORS: ops.myLoginedToken_CORS,
                is_cors: true,
                is_logined_token_refresh: true,
                showMsg: false,
                showFailMsg: false,
                showErrorMsg: false,
                successFn: (resBody) => {
                  $hyapi.io.post(mds, url, datas, ops, secretOpt);
                }
              }, secretOpt);
              return true;
            }
          }
        }, secretOpt);
      } else {
        let myGlobal = AppGlobal.loginedToken_CORS_Map[urlPre];
        ops.myLoginedToken_CORS = myGlobal;

        //此处没有 is_cors 的判断，因为这种请求肯定是 cors 的
        if (!ops.is_logined_token_refresh && !ops.is_get_server_time && !ops.is_login && !ops.is_skip_lt_check) {
          if (myGlobal.loginedTokenExpiredTime - myGlobal.serverTime <= myGlobal.check_loginedToken_reserve_time) {
            $hyapi.io.post(null, url_refreshLT, {}, {
              myLoginedToken_CORS: ops.myLoginedToken_CORS,
              is_cors: true,
              is_logined_token_refresh: true,
              showMsg: false,
              showFailMsg: false,
              showErrorMsg: false,
              successFn: (resBody) => {
                $hyapi.io.post(mds, url, datas, ops, secretOpt);
              }
            }, secretOpt);
            return true;
          }
        }
      }

      return false;
    },

    dealLT(ops, secretOpt?: { encryptKeys?: string[]; secret: boolean }): boolean {
      if (AppGlobal.onoff_loginedToken) {
        if (!ops.is_logined_token_refresh && !ops.is_get_server_time && !ops.is_cors && !ops.is_login && !ops.is_skip_lt_check) {
          if (AppGlobal.loginedTokenExpiredTime - AppGlobal.serverTime <= AppGlobal.check_loginedToken_reserve_time) {
            $hyapi.io.post(null, 'Service/LT/R', {}, {
              is_logined_token_refresh: true,
              showMsg: false,
              showFailMsg: false,
              showErrorMsg: false,
              successFn: (resBody) => {
                ops.successFn_LT();
              },
              failFn: (resBody) => {
                ops.is_skip_lt_check = true;
                ops.failFn_LT();
              },
              httpFailFn: (resBody) => {
                ops.is_skip_lt_check = true;
                ops.failFn_LT();
              },
            }, secretOpt);
            return true;
          }
        }
      }
      return false;
    }
  };
}
