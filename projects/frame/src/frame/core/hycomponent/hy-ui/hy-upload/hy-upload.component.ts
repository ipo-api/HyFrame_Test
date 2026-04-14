import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NzUploadFile, UploadFilter } from 'ng-zorro-antd/upload';
import { $hyapi } from '../../../api/$hyapi';
import { ModelService } from '../../../common/domain/service/model.service';
import { AppGlobal } from '../../../../config/AppGlobal';
import { NcUtil } from '../../../util/frame/NcUtil';
import { I18nService } from '../../../_index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hy-upload',
  templateUrl: './hy-upload.component.html',
  styleUrls: ['./hy-upload.component.css'],
})
export class HyUploadComponent implements OnInit, OnChanges {
  /** 是否上传中（按钮样式上显示） */
  public uploading: boolean = false;

  /** 是否显示文件名称 */
  public _showFileName: boolean = false;

  /** 默认上传文件大小(根据系统配置) */
  private maxSizeStr: number = 0;

  /** 默认上传文件大小 */
  private _size: number = 0;

  /** 默认总上传文件大小 */
  private _totalSize: number = 0;

  /** 文件列表 */
  @Input() fileList: NzUploadFile[] = [];

  /** 文件列表改变事件 */
  @Output() fileListChange = new EventEmitter<NzUploadFile[]>();

  /** 文件列表 */
  public fileNameList: { name: string, uid: string }[] = [];

  /** 栅格布局 */
  @Input() cols: number = 24;

  @Input() flex: any; //nz-form-item是否Flex布局

  /** 
   * 上传的地址
   * @description 当url为空时，将不显示上传按钮
   */
  @Input() url: string;

  /** 是否加密 */
  @Input() isEncrypt: boolean = false;

  /** 是否支持多文件上传(单选时默认只显示最后一个文件) */
  @Input() multiple:boolean = false;

  /** 上传按钮的title */
  @Input() uploadButtonTitle: string;

  /** 上传中的时候按钮显示的名称 */
  @Input() uploadingTitle: string;

  /** 开始上传的时候按钮显示的名称 */
  @Input() uploadStartTitle: string;

  /** 限制文件大小，number类型的默认单位为KB；string类型需要自行输入单位，如5MB或者500KB，单位仅支持kb和mb */
  @Input() size: number | string;

  /** 限制上传文件总大小，number类型的默认单位为KB；string类型需要自行输入单位，如5MB或者500KB，单位仅支持kb和mb */
  @Input() totalSize: number | string;

  /** 隐藏上传按钮 */
  @Input() hideUploadButton: boolean = false;

  /** 业务可自定义文件格式不正确的错误信息 */
  @Input() uploadErrorMsg: string;

  /** 随同文件一起上传的数据 */
  @Input() uploadData: object;

  /** 设置为true后，请求头新增‘zen_sec_aes’,传过去一个16位加密的key */
  @Input() isUploadSecret: boolean = true;

  /** 随同文件一起上传的数据,其中需要加密的key，写法如：['data.pw','data.list..pw','data.list..info.pw'] */
  @Input() uploadDataEncryptKeys: string[] = [];

  /** 限制上传文件类型，如.txt */
  @Input() fileType: string;

  /** 允许上传的最大数量 */
  @Input() maxUploadCount?: number;

  /** 是否显示文件名 */
  @Input() showFileName: boolean = false;

  /** 上传成功后是否显示文件名(重新选择文件上传后将不再显示上传成功的文件) */
  @Input() showSuccessFileName: boolean = false;

  _filter: UploadFilter[] = [];
  /** 自定义过滤器 */
  @Input()
  set filter(value: UploadFilter[]) {
    if (value) {
      this._filter = value;
    }
  }

  /** 上传组件布局类型，inline:按钮和文件名在同一行，vertical:按钮和文件名各自独占行*/
  @Input() layoutType: 'inline' | 'vertical' = 'inline';

  /** 指定放文件名的位置的宽度 */
  @Input() fileWidth: string;

  /** 上传后的接口回调，成功失败都返回 */
  @Output() onUploadCompleteItem = new EventEmitter<any>();

  /** 点击上传按钮 上传前的事件 */
  @Output() onBeforeUploadPrepare = new EventEmitter<any>();

  /** 点击移除文件时的回调，返回值为 false 时不移除。支持返回 Observable 对象；注意：务必使用 => 定义处理方法。 */
  @Output('remove')
  removeF = new EventEmitter();

  customRequest: (item) => Subscription = (item) => {
    return new Subscription();
  }

  /** 选择文件后触发 */
  @Output('handleChange') handleChange = new EventEmitter();

  constructor(public modelService: ModelService, public i18nService: I18nService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return
    if (changes['fileType'] && changes['fileType'] !== undefined && this.fileType) {
      this._filter = [
        {
          name: 'type',
          fn: (fileList: NzUploadFile[]) => {
            let filterFiles = fileList.filter((w) => w.name.endsWith(this.fileType));

            if (filterFiles.length !== fileList.length) {
              let _uploadErrorMsg = typeof this.uploadErrorMsg == 'undefined' ? this.i18nService.getFrameI18n('hy-upload.文件格式不正确，只支持$0格式', [this.fileType]) : this.uploadErrorMsg;
              $hyapi.msg.createTips('error', _uploadErrorMsg);
              return filterFiles;
            }
            return fileList;
          },
        },
      ];
    }
    if (changes['fileList'] && changes['fileList'].currentValue !== undefined) {
      this.fileNameList = this.fileNameList.filter(item => this.fileList.findIndex(file => file.uid === item.uid) === 0);
    }
  }

  ngOnInit(): void {
    this.setSize();
  }

  change(event: any) {
    this.handleChange.emit(event);
  }

  remove(file: { name: string, uid: string }) {
    this.fileList = this.fileList.filter(item => item.uid !== file.uid);
    this.fileListChange.emit(this.fileList);
    this.fileNameList = this.fileNameList.filter(item => item.uid !== file.uid);
    this.removeF.emit(file);
  }

  /** 设置文件可上传的体积 */
  private setSize() {
    if (AppGlobal.uploadFileMaxSizeStr) {
      const size = parseFloat(AppGlobal.uploadFileMaxSizeStr.replace(/[^\d.]/g, ''));
      this.maxSizeStr = this.sizeToB(size, 'MB');
    } else {
      this.maxSizeStr = this.sizeToB(0, 'MB');
    }
    const setPrivateSize = (propertyName: string, size: any) => {
      if (typeof size === 'string') {
        const newSize = parseFloat(size.replace(/[^\d.]/g, ''));
        const danwei = size.substring(size.length - 2, size.length).toUpperCase();
        if (danwei === 'MB') {
          this[propertyName] = this.sizeToB(newSize, 'MB');
        } else if (danwei === 'KB') {
          this[propertyName] = this.sizeToB(newSize, 'KB');
        }
      } else if (typeof size === 'number') {
        this[propertyName] = size * 1024;
      }
    }
    setPrivateSize('_size', this.size);
    setPrivateSize('_totalSize', this.totalSize);
  }

  /** 将kb或mb的单位转换为b */
  private sizeToB(size: number, company: 'KB' | 'MB') {
    // 系统设置的最大值，mb转b、kb转b
    let b;
    if (company === 'MB') {
      b = size * 1024 * 1024;
    }
    if (company === 'KB') {
      b = size * 1024;
    }
    return b;
  }

  /** 
   * 上传事件
   * @param isErrorSaveFile -如果接口报错，是否保留之前选好的附件
   * @description 可以先使用hideUploadButton隐藏上传按钮，然后使用upload方法上传，上传成功后，再显示上传按钮
   */
  public upload(isErrorSaveFile?: boolean) {
    this.onBeforeUploadPrepare.emit(this.fileList);
    return new Promise(async (resolve, reject) => {
      const uuid = new Date().getTime() + '000';
      const pass = NcUtil.rsa.encrypt(uuid);
      this.uploading = true;
      $hyapi.io.post(null, this.url, this.uploadData, {
        showMsg: false,
        showFailMsg: false,
        contentType: 'multipartForm',
        fileList:this.fileList,
        isFileEncrypt:this.isEncrypt,
        headers: this.isEncrypt ? { 'zen-sec-aes': pass } : null,
        successFn: (resBody) => {
          this.uploading = false;
          this.fileList = []; //清空实际文件
          this.fileListChange.emit(this.fileList);
          if (!this.showSuccessFileName) {
            this.fileNameList = [];
          }
          this.onUploadCompleteItem.emit({ resBody: resBody });
          resolve(resBody);
        },
        failFn: (resBody) => {
          if (isErrorSaveFile) {
            this.uploading = false;
          } else {
            this.clearFile();
          }
          this.onUploadCompleteItem.emit({ resBody: resBody });
          reject(resBody);
        },
        httpFailFn: (resBody, error) => {
          this.clearFile();
          reject(resBody);
        },
      }, { secret: this.isUploadSecret, encryptKeys: this.uploadDataEncryptKeys, uuid });
    })
  }

  /** 上传事件（按钮方法） */
  public handleUpload(): void {
    this.upload();
  }

  /** 清空缓存文件 */
  clearFile() {
    this.fileList = [];
    this.uploading = false;
    this._showFileName = false; //是否显示文件名
  }

  _fileListChange(files: NzUploadFile[]) {
    if(!this.multiple){
      files = files.slice(files.length - 1, files.length);
    } 
    this.fileList = files || [];
    this.fileListChange.emit(files);
    const fileNameList = [];
    if (this.fileList && this.fileList.length > 0) {
      this.fileList.forEach((item, index) => {
        fileNameList.push({ name: item.name, uid: item.uid });
      });
      this.fileNameList = fileNameList;
      this._showFileName = this.showFileName; //是否显示文件名
    }
  }

  /** 选择文件后触发的事件 */
  beforeUpload = (file: NzUploadFile): boolean => {
    if (this.maxUploadCount && this.fileList.length >= this.maxUploadCount) {
      $hyapi.msg.createTips('error', this.i18nService.getFrameI18n('hy-upload.上传数量超出限制'));
      return false;
    }
    if (this.fileList.findIndex(item => item.name === file.name) !== -1) {
      $hyapi.msg.createTips('error', this.i18nService.getFrameI18n('hy-upload.文件已存在'));
      return false;
    }
    // 判断文件大小
    if (this._size && file.size > this._size) {
      $hyapi.msg.createTips('error', this.i18nService.getFrameI18n('hy-upload.上传的文件超出限定大小！文件大小不能超过') + this.conver(this._size));
      return false;
    }
    if (file.size > this.maxSizeStr) {
      $hyapi.msg.createTips('error', this.i18nService.getFrameI18n('hy-upload.上传的文件超出限定大小！文件大小不能超过') + this.conver(this.maxSizeStr));
      return false;
    }
    if (this.isEncrypt) {
      if (file.size * 1.8 > this.maxSizeStr) {
        $hyapi.msg.createTips('error', this.i18nService.getFrameI18n('hy-upload.上传的文件超出限定大小！'));
        return false;
      }
    }
    // 判断总文件大小
    if (this._totalSize && this.fileList.reduce((pre, cur) => pre + cur.size, 0) + file.size > this._totalSize) {
      $hyapi.msg.createTips('error', this.i18nService.getFrameI18n('hy-upload.上传的文件超出限定大小！'));
      return false;
    }
    return true;
  };

  /** 转换单位 */
  private conver(limit) {
    let size = '';
    if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B  
      size = limit.toFixed(2) + 'B';
    } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB  
      size = (limit / 1024).toFixed(2) + 'KB';
    } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
      size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
    } else { //其他转化成GB  
      size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    }
    const sizestr = size + '';
    const len = sizestr.indexOf('\.');
    const dec = sizestr.substr(len + 1, 2);
    if (dec == '00') {//当小数点后为00时 去掉小数部分  
      return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
  }
}

