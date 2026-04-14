import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { AppGlobal } from '../../config/AppGlobal';
import { catchError, finalize, map, shareReplay } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { $hyapi } from '../api/$hyapi';
import { Emitter } from '../func/event/Emitter';
import { ED } from '../../config//EventDefined';
import { HyApiDownloadOpt, HyApiPostOpt, HyApiSecretOpt } from '../api/interface';
import { NcUtil } from '../util/frame/NcUtil';
import { HyCryptoService } from './hy-crypto.service';
import { Util } from '../util/util';
import { Observable } from 'rxjs';
import { I18nService } from './i18n.service';
import * as CryptoJS from 'crypto-js';
import { ModelService } from '../common/domain/service/model.service';

@Injectable({
  providedIn: 'root',
})
export class IOService {

  // 存储进行中的请求
  private ongoingRequests = new Map<string, Observable<any>>();

  baseUrl: string;
  static hyCryptoService;

  constructor(private http: Http, public hyCryptoService: HyCryptoService, public i18nService: I18nService) {
    this.baseUrl = (AppGlobal.server ? AppGlobal.server : '') + '/' + (AppGlobal.project ? AppGlobal.project + '/' : '');
    IOService.hyCryptoService = this.hyCryptoService;
  }

  /**
   * 检查指定的 URL 是否可以发送 HTTP 请求，并根据开发人员提供的配置信息决定是否允许请求。
   *
   * @param mds 一个可选的对象，包含当前应用程序的元数据信息。如果提供了该参数，则可以使用其内部缓存来优化检查流程。默认值为 `null`。
   * @param url 要检查的 URL 地址。
   * @param datas 一个可选的对象，包含应发送到服务器的数据。默认值为空对象（`{}`）。
   * @param options 一个可选的对象，用于配置检查过程的高级选项。
   *                其中 `allowSameUrl` 属性可以用于控制是否允许多次发送相同的 URL 请求。
   *
   * @returns 如果 URL 可以请求且满足给定的条件，则返回 `true`，否则返回 `false`。
   */
  public checkUrl(mds: any, url: string, datas: any, options: any): boolean {
    if (mds) {
      mds.urlCache = mds.urlCache || {};
      if (mds.urlCache[url] && !options['allowSameUrl']) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  /**
   * 使用 HTTP POST 请求下载指定 URL 的文件，并将其保存到用户的本地文件系统中。
   *
   * @param url 要下载的文件的 URL 地址。
   * @param data 一个可选的对象，包含应发送到服务器的数据。默认值为空对象（`{}`）。
   * @param options 一个可选的对象，用于配置下载请求的高级选项。
   *                其中 `showLoading` 属性可以用于显示加载动画，`successFn` 和 `failFn`
   *                属性则可分别在下载成功或失败时执行相应的回调函数。
   *
   * @throws 如果下载过程中出现错误，会抛出一个错误对象，其中包含有关错误的信息。
   */
  public download(url: string, data?: object, options?: HyApiDownloadOpt): void {
    let loadingIndex = null;
    if (options && options.showLoading) {
      if (typeof (options.showLoading) == 'object') {
        let time = options.showLoading.time;
        loadingIndex = $hyapi.msg.loading({ 'time': time, msg: this.i18nService.getFrameI18n('hyIo.文件正在下载中') });
      } else {
        loadingIndex = $hyapi.msg.loading({ msg: this.i18nService.getFrameI18n('hyIo.文件正在下载中') });
      }
    }
    this.http.post(url, data || {}, { responseType: ResponseContentType.Blob })
      .pipe(
        map((res: any) => {
          const body = {
            msg: decodeURIComponent(res.headers.get('zen_msg')),
            errorcode: decodeURIComponent(res.headers.get('zen_errorcode')),
            success: decodeURIComponent(res.headers.get('zen_success')) === 'true' ? true : false,
          };
          if (options && options.showLoading && loadingIndex != null) {
            $hyapi.msg.closeLoading(loadingIndex);
          }
          if (res.status !== 200 || body.success !== true) {
            if (options.showErrorMsg ?? true) {
              $hyapi.msg.createTips('error', body.msg || 'Server error');
            }
            if (options.failFn) {
              options.failFn(res);
            }
            throw new Error(res)
          }
          return res;
        })
      )
      .subscribe(response => {
        const blob = response.blob() as Blob; // 使用类型断言将响应类型转换为Blob类型
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        const getFileName = (contentDisposition) => {
          let fileName;
          if (contentDisposition && contentDisposition.indexOf('filename=') > -1) {
            fileName = contentDisposition.substring(contentDisposition.indexOf('filename=') + 'filename='.length).replace(/"/g, '');
            if (!fileName) {
              fileName = new Date().getTime().toString() + '.' + response.headers.get('content-type').split('/')[1];
            }
            return decodeURIComponent(fileName);
          } else {
            fileName = new Date().getTime().toString() + '.' + response.headers.get('content-type').split('/')[1];
          }
        };
        a.href = url;
        a.setAttribute('download', getFileName(response.headers.get('content-disposition')));
        a.click();
        URL.revokeObjectURL(url);
        if (options.successFn) {
          options.successFn(response);
        }
      })
  }

  /**
   * 将文件读取为ArrayBuffer并加密其内容
   * 
   * 此函数使用FileReader将给定的文件读取为ArrayBuffer，然后使用AES加密算法对内容进行加密
   * 加密密钥是根据文件的唯一标识符（uuid）生成的加密过程使用CBC模式和Pkcs7填充
   * 最后，函数将加密的内容转换为Blob对象，并将其作为Promise的解析值返回
   * 
   * @param file 要读取和加密的文件对象
   * @param uuid 文件的唯一标识符，用于生成加密密钥
   * @param isEncrypt 是否加密
   * @returns 返回一个Promise，解析为包含加密文件内容的Blob对象
   */
  public readAsArrayBuffer(file: any, uuid: string, isEncrypt?: boolean, other?: { key?: string, fileName: string }): Promise<Blob | { [key: string]: Blob | string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // 确保传递的是有效的 File 或 Blob 对象
      const validFile = file.originFileObj || file.file || file;

      if (!(validFile instanceof File || validFile instanceof Blob)) {
        reject(new Error('Invalid file object'));
        return;
      }

      reader.readAsArrayBuffer(validFile);
      reader.onload = async (e) => {
        try {
          if (!e.target || !e.target.result) {
            throw new Error('File reading failed');
          }
          const arrayBuffer = e.target.result as ArrayBuffer;

          if (isEncrypt) {
            const key = CryptoJS.enc.Utf8.parse(uuid);
            const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
            let encrypted = CryptoJS.AES.encrypt(wordArray, key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: key });
            const ivCiphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
            const fileBox = new Blob([ivCiphertext], { type: file.type });
            if (other) {
              const data = { ...{ blob: fileBox }, ...other };
              resolve(data);
            } else {
              resolve(fileBox);
            }
          } else {
            if (other) {
              const data = { ...{ blob: new Blob([arrayBuffer], { type: file.type }) }, ...other };
              resolve(data);
            } else {
              resolve(new Blob([arrayBuffer], { type: file.type }));
            }
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  /**
    * 根据当前数据创建FormData对象
    * 该方法用于准备上传数据，包括文件和其他附加数据
    * 如果启用了加密，则会加密文件内容并添加加密密钥到FormData中
    * 
    * @returns {Promise<FormData>} 返回一个Promise，解析为包含所有上传数据的FormData对象
    */
  public createFromData(fileList: HyApiPostOpt['fileList'], uuid: string, isEncrypt?: boolean): Promise<FormData> {
    return new Promise(async (resolve, reject) => {
      let formData = new FormData();
      if (Array.isArray(fileList)) {
        const readAsArrayBufferList = [];
        fileList.forEach(file => {
          readAsArrayBufferList.push(this.readAsArrayBuffer(file, uuid, isEncrypt, { fileName: file.name }))
        });
        Promise.all(readAsArrayBufferList).then((res) => {
          res.forEach((item) => {
            formData.append('file', item.blob, item.fileName);
          });
          resolve(formData);
        }).catch((error) => {
          reject(error);
        });
      } else {
        const readAsArrayBufferList = [];
        for (const key in fileList) {
          fileList[key].forEach((file: any) => {
            readAsArrayBufferList.push(this.readAsArrayBuffer(file, uuid, isEncrypt, { key, fileName: file.name }));
          });
        }
        Promise.all(readAsArrayBufferList).then((res) => {
          res.forEach((item) => {
            if (Util.isObject(item)) {
              formData.append(item.key || 'file', item.blob, item.fileName);
            }
          });
          resolve(formData);
        }).catch((error) => {
          reject(error);
        });
      }
    })
  }

  /**
   * 对输入的数据进行加密或解密操作。
   *
   * @param type 操作类型，'encrypt' 表示加密，'decrypt' 表示解密。
   * @param data 要进行加密或解密的数据。
   * @param key 用于加密或解密的密钥。
   * @param uuid 加密或解密中使用的 UUID。
   * @returns void
   */
  private static encryptOrDecrypt(type: 'encrypt' | 'decrypt', data: any, key: string, uuid: string): void {
    key = key.replace(/\.\./g, '.');
    const keys = key.split('.'); // 将 key 拆分成属性名数组
    let num = 0;
    const fn = (obj, key, isArray) => {
      const value = obj[key];
      if (value) {
        if (Util.isObject(value)) {
          num++;
          fn(obj[key], keys[num], false)
        } else if (Util.isArray(value)) {
          num++;
          value.forEach(element => {
            fn(element, keys[num], true);
          })
        }
        else {
          obj[key] = IOService.hyCryptoService[type === 'encrypt' ? 'encryptByAES' : 'decryptedByAES'](value, uuid);
        }
      }
    }
    fn(data, keys[num], false);
  }

  /**
   * 创建接口请求的唯一标识ID
   * 基于URL、请求数据、内容类型等信息生成唯一ID，用于判断接口是否重复请求
   * 
   * @param url 请求URL
   * @param data 请求数据
   * @param options 请求选项
   * @param secretOpt 加密选项
   * @returns 返回接口请求的唯一标识ID
   */
  private createRequestId(url: string, data: any, options: HyApiPostOpt, secretOpt?: HyApiSecretOpt): string {
    try {
      // 构建用于生成ID的关键信息对象
      const requestInfo = {
        url: url,
        method: 'POST',
        contentType: options.contentType || 'application/json',
        // 如果是文件上传，不包含文件内容本身，只包含文件名和大小等元信息
        data: this.normalizeDataForId(data, options),
        // 包含可能影响请求结果的关键选项
        keyOptions: {
          isFile: options.isFile,
          headers: options.headers,
        },
        // 包含加密相关信息
        encryption: secretOpt ? {
          encryptKeys: secretOpt.encryptKeys,
          secret: secretOpt.secret,
          // 不包含uuid，因为uuid每次都不同
        } : null
      };

      // 将对象序列化为字符串
      const requestString = JSON.stringify(requestInfo, this.getJsonReplacer());

      // 生成简单的哈希ID（使用更简单的哈希算法）
      return this.simpleHash(requestString);
    } catch (error) {
      // 如果生成ID失败，返回基于时间戳的fallback ID
      console.warn('Failed to create request ID:', error);
      return `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  /**
   * 标准化数据用于生成ID（移除不稳定的元素）
   */
  private normalizeDataForId(data: any, options: HyApiPostOpt): any {
    if (!data) return null;

    // 如果是FormData，提取关键信息
    if (data instanceof FormData) {
      const normalizedData: any = {};
      try {
        // 遍历FormData的key-value对
        (data as any).forEach((value: any, key: string) => {
          if (value instanceof File) {
            // 对于文件，只保存文件名、大小、类型等元信息
            normalizedData[key] = {
              name: value.name,
              size: value.size,
              type: value.type,
              lastModified: value.lastModified
            };
          } else {
            normalizedData[key] = value;
          }
        });
      } catch (e) {
        // 如果FormData遍历失败，使用备用方案
        normalizedData._formData = true;
        normalizedData._timestamp = Date.now();
      }
      return normalizedData;
    }

    // 如果是普通对象，深拷贝并移除不稳定的时间戳字段
    if (typeof data === 'object') {
      return this.removeTimestampFields(JSON.parse(JSON.stringify(data)));
    }

    return data;
  }

  /**
   * 移除可能包含时间戳的不稳定字段
   */
  private removeTimestampFields(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.removeTimestampFields(item));
    }

    const result = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 跳过可能是时间戳的字段
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes('timestamp') ||
          lowerKey.includes('time') ||
          lowerKey.includes('date') ||
          lowerKey === 'r' || // 跳过随机参数
          lowerKey.startsWith('_temp')) {
          continue;
        }
        result[key] = this.removeTimestampFields(obj[key]);
      }
    }
    return result;
  }

  /**
   * JSON序列化时的replacer函数，确保对象属性的一致性
   */
  private getJsonReplacer(): (key: string, value: any) => any {
    return (key: string, value: any) => {
      // 如果值是对象，按key排序以确保一致性
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const sortedObj = {};
        Object.keys(value).sort().forEach(k => {
          sortedObj[k] = value[k];
        });
        return sortedObj;
      }
      return value;
    };
  }

  /**
   * 简单哈希算法（类似Java的hashCode）
   */
  private simpleHash(str: string): string {
    let hash = 0;
    if (str.length === 0) return hash.toString();

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为32位整数
    }

    // 返回正数的字符串形式，并添加前缀
    return 'req_' + Math.abs(hash).toString(36);
  }

  /**
   * 准备HTTP请求的数据和配置
   * @param mds 当前模块对象，用于在 URL 缓存中避免重复请求。
   * @param url 目标 URL。
   * @param data 要发送的数据。
   * @param options 附加选项，包含以下属性：
   * - contentType：请求体类型，支持 'form'、'multipartForm' 和默认值 'application/json'。
   * - headers：请求头对象。
   * - isFile：是否需要返回文件。
   * - showLoading：是否显示加载提示。可以设置为 true 或 false，也可以传入一个对象来指定加载时间和加载文本{ time?: number, msg?: string }。
   * - httpFailFn：HTTP 请求失败时的回调函数。
   * @param secretOpt 加密选项。
   * @returns 一个包含以下属性的对象：
   * - url_final：最终的请求 URL。
   * - body：请求体。
   * - ioOptions：请求选项。
   * - loadingIndex：加载提示的索引。
   * - isShowErrorMsg：是否显示错误消息。
   * - uuid：加密的 UUID。
   * - isShowLoading：是否显示加载提示。
   */
  private async beforeSend(mds: ModelService, url: string, data: any, options: HyApiPostOpt, secretOpt?: HyApiSecretOpt): Promise<{ url_final: string, body: any, ioOptions: any, loadingIndex: any, isShowErrorMsg: boolean, uuid: string }> {
    try {
      // 初始化请求选项
      options = options || {};
      const isShowErrorMsg = options['showErrorMsg'] ?? true;
      const uuid = secretOpt?.uuid || new Date().getTime() + '000';

      // 处理数据加密
      const processedData = await this.processDataEncryption(data, options, secretOpt, uuid);

      // 构建请求体
      const { body, contentType } = await this.buildRequestBody(processedData, options, uuid);

      // 配置请求头
      const headers = this.buildRequestHeaders(options, contentType);

      // 添加加密头部
      this.addSecurityHeaders(headers, secretOpt, uuid);

      // 配置请求选项
      const ioOptions = this.buildRequestOptions(headers, options);

      // 缓存URL
      if (mds) {
        mds.urlCache[url] = 1;
      }

      // 显示加载提示
      const loadingIndex = this.showLoadingIfNeeded(options);

      // 构造最终URL
      const url_final = this.buildFinalUrl(url);

      return { url_final, body, ioOptions, loadingIndex, isShowErrorMsg, uuid };
    } catch (error) {
      throw error;
    }
  }

  /**
   * 处理数据加密
   */
  private async processDataEncryption(data: any, options: HyApiPostOpt, secretOpt: HyApiSecretOpt | undefined, uuid: string): Promise<any> {
    if (!secretOpt?.encryptKeys?.length) {
      return data;
    }
    let encryptData;
    // 判断是否为formData类型
    if (data instanceof FormData) {
      encryptData = {};
      const formData = data as any;
      for (const key of formData.keys()) {
        encryptData[key] = formData.get(key);
      }
    } else {
      encryptData = JSON.parse(JSON.stringify(data));
    }
    secretOpt.encryptKeys.forEach(element => {
      IOService.encryptOrDecrypt('encrypt', encryptData, element, uuid);
    });
    return encryptData;
  }

  /**
   * 构建请求体
   */
  private async buildRequestBody(data: any, options: HyApiPostOpt, uuid: string): Promise<{ body: any, contentType: string }> {
    const extendedOptions = options as any; // 临时类型扩展

    switch (options.contentType) {
      case 'form':
        return {
          body: data,
          contentType: 'application/x-www-form-urlencoded'
        };

      case 'multipartForm':
        return await this.buildMultipartFormData(data, extendedOptions, uuid);

      default:
        return {
          body: JSON.stringify(data),
          contentType: 'application/json'
        };
    }
  }

  /**
   * 构建多部分表单数据
   */
  private async buildMultipartFormData(data: any, options: HyApiPostOpt, uuid: string): Promise<{ body: FormData, contentType: string }> {
    let formData = new FormData();

    // 处理文件列表
    if (options.fileList) {
      formData = await this.createFromData(options.fileList, uuid, options.isFileEncrypt);
    }

    // 添加数据到 FormData（包括加密后的数据）
    if (data && typeof data === 'object') {
      // 如果data是FormData类型（原始数据）
      if (data instanceof FormData) {
        // 使用 forEach 方法处理 FormData
        (data as any).forEach((value: any, key: string) => {
          formData.set(key, value);
        });
      } else {
        // 如果data是普通对象（包括加密后的数据）
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            formData.set(key, data[key]);
          }
        }
      }
    }

    return {
      body: formData,
      contentType: 'multipart/form-data'
    };
  }

  /**
   * 构建请求头
   */
  private buildRequestHeaders(options: HyApiPostOpt, contentType: string): Headers {
    let headers: Headers;

    // multipartForm不要设置Content-Type，让浏览器自动生成boundary
    if (options.contentType === 'multipartForm') {
      headers = new Headers();
    } else {
      headers = new Headers({ 'Content-Type': contentType });
    }

    // 添加自定义请求头
    if (options.headers) {
      for (const key in options.headers) {
        if (options.headers.hasOwnProperty(key)) {
          headers.append(key, options.headers[key]);
        }
      }
    }

    // 添加国际化请求头
    if (this.i18nService.language) {
      headers.append('Accept-Language', this.i18nService.language.id.replace('_', '-'));
    }

    return headers;
  }

  /**
   * 添加安全相关的请求头
   */
  private addSecurityHeaders(headers: Headers, secretOpt: HyApiSecretOpt | undefined, uuid: string): void {
    if (!secretOpt?.secret || headers.get('zen-sec-aes')) {
      return;
    }

    const zen_sec_aes = NcUtil.rsa.encrypt(uuid);
    if (!zen_sec_aes) {
      const errorMsg = this.i18nService.getFrameI18n('hyIo.服务环境异常,加密失败');
      $hyapi.msg.createTips("error", errorMsg);
      throw new Error(errorMsg);
    }
    headers.append('zen-sec-aes', zen_sec_aes);
  }

  /**
   * 构建请求选项
   */
  private buildRequestOptions(headers: Headers, options: HyApiPostOpt): RequestOptions {
    const ioOptions = new RequestOptions({ headers });
    ioOptions.withCredentials = true;

    if (options.isFile) {
      ioOptions.responseType = ResponseContentType.ArrayBuffer;
    }

    return ioOptions;
  }

  /**
   * 显示加载提示
   */
  private showLoadingIfNeeded(options: HyApiPostOpt): any {
    if (!options.showLoading) {
      return null;
    }

    if (typeof options.showLoading === 'object') {
      return $hyapi.msg.loading(options.showLoading);
    }

    const defaultMsg = AppGlobal.i18nLanguage ? '' : '数据正在加载中...';
    const msg = (options as any).loadingMsg || defaultMsg;
    return $hyapi.msg.loading({ msg });
  }

  /**
   * 构造最终URL
   */
  private buildFinalUrl(url: string): string {
    const randomParam = '?r=' + Math.random();
    if (url.includes('http://') || url.includes('https://')) {
      return url + randomParam;
    }
    return (this.baseUrl === '/' ? '' : '/') + url + randomParam;
  }

  /**
   * 将指定的数据通过 POST 请求发送到指定 URL。
   *
   * @param mds 当前模块对象，用于在 URL 缓存中避免重复请求。
   * @param url 目标 URL。
   * @param datas 要发送的数据。
   * @param options 附加选项，包含以下属性：
   * - contentType：请求体类型，支持 'form'、'multipartForm' 和默认值 'application/json'。
   * - headers：请求头对象。
   * - isFile：是否需要返回文件。
   * - showLoading：是否显示加载提示。可以设置为 true 或 false，也可以传入一个对象来指定加载时间和加载文本{ time?: number, msg?: string }。
   * - httpFailFn：HTTP 请求失败时的回调函数。
   * @param secretOpt 加密选项。
   * @returns 一个 Observable 对象，用于订阅 HTTP 响应。
   */
  public send(mds: ModelService, url: string, datas: any, options: HyApiPostOpt, secretOpt?: HyApiSecretOpt): Observable<any> {
    // 是否允许重复请求
    const allowDuplicate = options.allowSameUrl ?? false;


    // 本意为合并请求，但是不允许使用，暂时注释
    // const requestKey = this.createRequestId(url, datas, options, secretOpt);
    // 检查是否存在相同的请求正在进行中
    // if (!allowDuplicate && this.ongoingRequests.has(requestKey)) {
    //   return this.ongoingRequests.get(requestKey) as Observable<any>;
    // }

    const request = new Observable((observer) => {
      this.beforeSend(mds, url, datas, options, secretOpt).then(({ url_final, body, ioOptions, loadingIndex, isShowErrorMsg, uuid }) => {
        // 发送 POST 请求事件通知
        Emitter.emit(ED.IO_Post_Send, { 'url': url_final });

        // 发送 HTTP 请求
        this.http.post(url_final, body, ioOptions)
          .pipe(
            map((res: Response) => {
              if (mds && mds.urlCache[url]) {
                delete mds.urlCache[url];
              }
              if (options.showLoading && loadingIndex != null) {
                $hyapi.msg.closeLoading(loadingIndex);
              }
              return IOService.dealResponse(res, options, ioOptions, uuid);
            }),
            catchError((error: any) => {
              if (mds && mds.urlCache[url]) {
                delete mds.urlCache[url];
              }

              if (options.showLoading && loadingIndex != null) {
                $hyapi.msg.closeLoading(loadingIndex);
              }

              // 处理请求失败时的情况。
              let errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';
              let body = null;
              try {
                if (error['_body']) {
                  body = JSON.parse(error['_body']);
                }
              } catch (err) {
              }

              if (isShowErrorMsg) {
                if (body) {
                  if (!body.success) {
                    errMsg = body.msg || this.i18nService.getFrameI18n(AppGlobal.i18nLanguage ? 'hyIo.操作失败' : '操作失败');
                  }
                }
                $hyapi.msg.createTips('error', errMsg);
              }
              if (options.httpFailFn) {
                options.httpFailFn(body, error);
              }
              return throwError(errMsg);
            })
          )
          .subscribe((res) => {
            observer.next(res);
            observer.complete();
          }, (error) => {
            observer.error(error);
            observer.complete();
          });
      })
        .catch((error) => {
          observer.error(error);
          observer.complete();
        });
    }).pipe(
      finalize(() => {
        if (mds && mds.urlCache[url]) {
          delete mds.urlCache[url];
        }
        // 请求完成后，从进行中的请求Map中移除（本意为合并请求，但是不允许使用，暂时注释）
        // if (!options.allowSameUrl) {
        //   this.ongoingRequests.delete(requestKey);
        // }
      }),
      shareReplay(1)
    ) as Observable<any>;

    // if (!allowDuplicate) {
    //   this.ongoingRequests.set(requestKey, request);
    // }
    return request;
  }

  private static getFileName(contentDisposition: string) {
    if (contentDisposition != null) {
      contentDisposition = contentDisposition.toLowerCase();
      if (contentDisposition.indexOf('filename=') > -1) {
        return contentDisposition.substring(contentDisposition.indexOf('filename=') + 'filename='.length);
      }
    }
    return null;
  }

  public static dealResponse_UploadFile(headers: any, resBody: any, options?: any) {
    options = options || {};
    options['showMsg'] = options['showMsg'] == null ? false : options['showMsg'];
    options['showFailMsg'] = options['showFailMsg'] == null ? false : options['showFailMsg'];
    const isShowTimeoutMsg = options['showTimeoutMsg'] ?? true;
    //超时处理
    let zen_nologin = headers.zen_nologin || headers.zen_NoLogin;
    if (IOService.checkTimeOut(zen_nologin, isShowTimeoutMsg)) {
      return;
    }

    IOService.dealBody_Json(resBody, options);
  }

  public static dealResponse(res: Response, options: any, ioOptions: any, aesUuid: string) {
    //接到后端返回数据后的回调方法
    if (options['resCompleteFn']) {
      options['resCompleteFn'](options['resCompleteFn_Context'], res, options, ioOptions);
    }
    const isShowTimeoutMsg = options['showTimeoutMsg'] ?? true;
    //超时处理
    let zen_nologin = res.headers.get('zen_nologin') || res.headers.get('zen_NoLogin');
    if (IOService.checkTimeOut(zen_nologin, isShowTimeoutMsg)) {
      return res.json();
    }

    //获取LoginedToken的超时时间
    if (options.myLoginedToken_CORS || AppGlobal.onoff_loginedToken) {
      let loginedTokenExpiredTime = res.headers.get('zen_LTET');
      if (loginedTokenExpiredTime) {
        if (options.myLoginedToken_CORS) {
          // console.log("cosr loginedTokenExpiredTime: " + loginedTokenExpiredTime);
          options.myLoginedToken_CORS.loginedTokenExpiredTime = loginedTokenExpiredTime;
        } else {
          // console.log("loginedTokenExpiredTime: " + loginedTokenExpiredTime);
          AppGlobal.loginedTokenExpiredTime = parseInt(loginedTokenExpiredTime);
        }
      }
    }

    //Json
    let contentType: string = res.headers.get('content-type');
    if (contentType != null) {
      contentType = contentType.toLowerCase();
      if (options.isFile) {
        let blob = new Blob([res['_body']]);
        let objectUrl = URL.createObjectURL(blob);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        let fileName = decodeURIComponent(IOService.getFileName(res.headers.get('content-disposition')));
        if (fileName === 'null') {
          if (res.headers.get('content-type')) {
            fileName = new Date().getTime().toString() + '.' + res.headers.get('content-type').split('/')[1];
          }
        }
        a.setAttribute('download', fileName);
        a.click();
        URL.revokeObjectURL(objectUrl);
      } else {
        let body = res.json();
        res.headers.get('content-type');
        // 处理msg，处理body格式
        IOService.dealBody_Json(body, options);
        // 获取需要解密的字段
        const zen_sec_fields: string = res.headers.get('zen-sec-fields');
        // 判断是否存在加密字段
        if (zen_sec_fields) {
          const zen_sec_fields: string = res.headers.get('zen-sec-fields');
          const aesKeys = JSON.parse(decodeURIComponent(zen_sec_fields));
          // 解密
          aesKeys.forEach(element => {
            IOService.encryptOrDecrypt('decrypt', body.datas, element, aesUuid);
          });
        }
        return body;
      }
    }
  }

  private static checkTimeOut(zen_nologin: any, isShowTimeoutMsg?: boolean) {
    if (zen_nologin === 'true') {
      AppGlobal.authTimeoutRoute = AppGlobal.router.url;
      if (AppGlobal.ui_msg_show_sessionTimeOut && isShowTimeoutMsg) {
        $hyapi.msg.show('error', AppGlobal.i18nLanguage ? 'hyIo.登录超时,请重新登录' : '登录超时，请重新登录！', {
          callback: () => {
            $hyapi.dialog.closeAll();
            // 获取当前路由
            AppGlobal.router.navigate([AppGlobal.loginRouter]);
          }
        });
      } else {
        AppGlobal.router.navigate([AppGlobal.loginRouter]);
      }
      return true;
    } else {
      return false;
    }
  }

  private static dealBody_Json(body: any, options: any) {
    //Msg处理
    let isShowMsg = options['showMsg'] == null ? true : options['showMsg'];
    let isShowFailMsg = options['showFailMsg'] == null ? true : options['showFailMsg'];

    if (body) {
      if (body.success) {
        let msg = body.msg || (AppGlobal.i18nLanguage ? 'hyIo.操作成功' : '操作成功');
        if (isShowMsg) {
          $hyapi.msg.createTips('success', msg);
        }
      } else {
        if (isShowFailMsg) {
          let msg = body.msg || (AppGlobal.i18nLanguage ? 'hyIo.操作失败' : '操作失败');
          $hyapi.msg.createTips('error', msg);
        }
      }
    }
  }
}
