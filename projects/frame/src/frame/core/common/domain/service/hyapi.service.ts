
import { EventEmitter, Injectable, Output, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ReuseStrategyService } from '../../../service/reuseStrategy.service';
import { I18nService } from '../../../service/i18n.service';
import { $hyapiHelper } from '../../../api/$hyapi';

@Injectable()
export class HyapiService {

  constructor(private nzMessageService: NzMessageService, private modalService: NzModalService, private i18nService: I18nService) { }

  /** 过滤特殊字符 */
  private filterSpecialCharacters(value: string | TemplateRef<any>): any {
    let newValue;
    if(typeof value === 'string'){
      newValue = value.replace(/</g, '&lt;');
      newValue = newValue.replace(/>/g, '&gt;');
    }else{
      newValue = value;
    }
    return newValue;
  }

  /** 不打断操作的全局提示 */
  createTips(type: 'success' | 'info' | 'warning' | 'error' | 'info', msg: string | TemplateRef<any>, ops?: { duration?: number }): any {
    ops = ops || {};
    let time: number = typeof (ops.duration) == 'undefined' ? 3000 : ops.duration;
    return this.nzMessageService.create(type, this.filterSpecialCharacters(this.i18nService.getFrameI18n(msg)), { nzDuration: time }); //持续时间
  }

  @Output()
  on_Click = new EventEmitter<any>();

  msg(type: 'success' | 'error' | 'warning' | 'info', msg: string | TemplateRef<any>, ops?: { width?: string | number, callback?: () => void | any, content?: string | TemplateRef<any>, closable?: boolean }) {
    ops = ops || {};
    let width = ops.width || '416px';
    let tplModal = this.modalService[type]({
      nzTitle: this.filterSpecialCharacters(this.i18nService.getFrameI18n(msg)),
      nzContent: ops.content,
      nzWidth: width,
      nzAutofocus: null,
      nzClosable: ops.closable ?? false,
      nzOnOk: () => {
        if (ops.callback) {
          ops.callback();
        } else {
          this.closeTplModal(tplModal)
        }
      }
    });
    return tplModal;
  }

  windowOpen(appGlobal: any, url?: string, target?: string, features?: string, i18n?: boolean) {
    if (i18n) {
      const isParameters = url.indexOf('?') > -1 ? true : false;
      if (isParameters) {
        if (url[url.length - 1] !== '&') {
          url = url + '&';
        }
        url = url + 'acceptLanguage=' + this.i18nService?.language?.id;
      } else {
        url += '?acceptLanguage=' + this.i18nService?.language?.id;
      }
    }
    if (appGlobal.onoff_loginedToken) {
      let ops: any = {};
      ops.successFn_LT = () => {
        window.open(url, target, features);
      };

      ops.failFn_LT = () => {
        window.open(url, target, features);
      };

      if ($hyapiHelper.io.dealLT(ops)) {
        return;
      }
    }

    window.open(url, target, features);
  }

  closeTplModal(tplModal) {
    tplModal.destroy();
  }

  loading(ops: { msg?: string, time?: number }): any {
    ops = ops || {};
    let _content: string = ops.msg || this.i18nService.getFrameI18n('hyApi.数据正在加载中...');
    const id = this.nzMessageService.loading(_content, { nzDuration: 0 }).messageId;

    if (ops.time) {
      setTimeout(() => {
        this.nzMessageService.remove(id);
      }, ops.time);
    }
    return id;
  }

  closeLoading(id): void {
    this.nzMessageService.remove(id);
  }

  /**
   * 打开一个弹出窗口。
   *
   * @param tplContent - 显示在弹出窗中的模板内容
   * @param ops - 弹出窗选项，包括可选的配置项
   * @param ops.closable - 是否可以通过单击外部区域或按ESC键关闭弹出窗。默认为true。
   * @param ops.width - 弹出窗口的宽度。可以使用字符串或数字表示，也可以不指定以允许自适应。默认为'auto'。
   * @param ops.title - 弹出窗口的标题。可以使用字符串或模板引用表示。
   * @param ops.cancel - 在用户取消或关闭弹出窗口时运行的回调函数。
   * @param ops.callback - 在用户提交或确认弹出窗内容时运行的回调函数。
   */
  dialog(tplContent: TemplateRef<{}>, ops: { closable?: boolean, width?: string | number, title?: string | TemplateRef<any>, cancel?: () => void, callback?: () => void }) {
    ops = ops || {};
    let _closable: boolean = typeof (ops.closable) == 'undefined' ? false : ops.closable;
    let width = ops.width || '500px';

    let dialogModal = this.modalService.create({
      nzTitle: this.filterSpecialCharacters(ops.title),
      nzContent: tplContent,
      nzFooter: null,
      nzWidth: width,
      nzMaskClosable: false,
      nzClosable: _closable,
      nzKeyboard: _closable, //是否支持键盘esc关闭,该属性不对外开放，默认为true可用esc关闭；当closable为false，没有右上角X关闭时，不能用esc关闭
      nzOnCancel: () => {
        if (ops.cancel) {
          ops.cancel();
        }
      },
    });
    if (ops.callback) {
      dialogModal.afterClose.subscribe(() => {
        ops.callback();
      });
    }

    return dialogModal;
  }

  closeDialog(dialogModal) {
    dialogModal.destroy();
  }

  closeAll() {
    this.modalService.closeAll();
  }

  confirm(msg: string | TemplateRef<any>, ops: { width?: string | number, okText?: string, cancelText?: string, content?: string | TemplateRef<any>, callback?: () => void, cancel?: () => void, closable?: boolean }) {
    ops = ops || {};
    let width = ops.width || '416px';
    let okText = ops.okText || this.i18nService.getFrameI18n('hyApi.确认');
    let cancelText = ops.cancelText || this.i18nService.getFrameI18n('hyApi.取消');
    this.modalService.confirm({
      nzTitle: this.filterSpecialCharacters(msg),
      nzWidth: width,
      nzAutofocus: null,
      nzContent: ops.content,
      nzOkText: okText,
      nzCancelText: cancelText,
      nzClosable: ops.closable ?? false,
      nzOnOk: () => {
        if (ops.callback) {
          ops.callback();
        }
      },
      nzOnCancel: () => {
        if (ops.cancel) {
          ops.cancel();
        }
      }
    });
  }

  // 返回第几级路由
  goBackPrevRouter(level: number) {
    /** setTimeout的目的：因为是路由复用跳转，上个页面并不会销毁，导致某些动画还没结束就已经到下个页面了，从而页面异常 */
    setTimeout(() => {
      ReuseStrategyService.goBackPrevRouter(level);
    }, 300);
  }

  goNextRouter(url: string) {
    /** setTimeout的目的：因为是路由复用跳转，上个页面并不会销毁，导致某些动画还没结束就已经到下个页面了，从而页面异常 */
    setTimeout(() => {
      ReuseStrategyService.goNextRouter(url);
    }, 300);
  }

  clearAndGoNextRouter(url: string) {
    ReuseStrategyService.clearAndGoNextRouter(url)
  }

}
