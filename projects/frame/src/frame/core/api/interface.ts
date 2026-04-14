import { NzUploadFile } from "ng-zorro-antd/upload";

/**
 * HTTP API 加密选项接口
 */
export interface HyApiSecretOpt {
  /** 需要进行加密的密钥数组 */
  encryptKeys?: string[];
  /** 是否需要传递 zen-sec-aes 密钥 */
  secret: boolean;
  /** 自定义加密的uuid */
  uuid?: string;
}

export interface HyApiPostOpt {
  /** test */
  check_cors_lt?: any;
  glt?: any;
  gt?: any;
  /** 是否为跨域 */
  is_cors?: any;
  /** glt是否查询刷新 */
  gltNewSearch?: any;
  /** 是否显示接口成功回调信息 */
  showMsg?: boolean;
  /** 是否显示接口错误回调信息 */
  showFailMsg?: boolean;
  /** 默认值false; true：请求未结束，允许重复请求同一个url；false：请求未结束束，不允许重复请求同一个url */
  allowSameUrl?: boolean;
  is_get_server_time?: boolean;
  /** 是否显示服务器报错信息 */
  showErrorMsg?: boolean;
  /** 是否显示登录超时提示信息 */
  showTimeoutMsg?: boolean;
  myLoginedToken_CORS?: any;
  is_logined_token_refresh?: boolean;
  /** 数据请求到后端的类型 */
  contentType?: string;
  /** 请求头 */
  headers?: object;
  /** 是否文件类型 */
  isFile?: boolean;
  /** 是否显示加载 */
  showLoading?: boolean | { time?: number, msg?: string };
  /** 加载提示信息 */
  loadingMsg?: string;
  /** 是否为接口模式，接口模式下将不会用回调数据为gt和glt赋值，赋值需要手动进行 */
  isApiMode?: boolean;
  /** 
   * 文件列表
   * 如果fileList是数组，则表示多个文件列表，数组中每个元素是一个对象
   * 如果fileList是数组对象，则表示一个文件列表，对象的key是上传时Form表单的名称
   */
  fileList?: NzUploadFile[] | { [key: string]: NzUploadFile[] };
  /** 是否加密文件 */
  isFileEncrypt?: boolean;
  /** http请求失败 */
  httpFailFn?: (body?: any, error?: any) => void;
  /** 失败回调函数 */
  failFn?: (any?) => void;
  /** 成功回调函数 */
  successFn?: (any?) => void;
  successFn_LT?: (any?) => void;
  failFn_LT?: (any?) => void;
}

export interface HyApiDownloadOpt {
  /** 是否显示加载 */
  showLoading?: boolean | { time: number };
  /** 是否显示错误信息 */
  showErrorMsg?: boolean;
  /** 失败回调函数 */
  failFn?: (any?) => void;
  /** 成功回调函数 */
  successFn?: (any?) => void;
}