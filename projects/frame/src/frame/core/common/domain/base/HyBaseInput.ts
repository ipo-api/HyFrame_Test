import { HyFormService } from '../service/hyform.service';
import { TableService } from '../service/hytable.service';
import { ModelService } from '../service/model.service';
import { FormBuilder, FormControl, ValidatorFn } from '@angular/forms';
import { Directive, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
// import { ValidatorFns } from '../../../func/check/ValidatorFns';
import { ValidatorFnsService } from '../../../func/check/validator-fns.service';

@Directive()
export abstract class HyBaseInput {
  formService: HyFormService;
  tableService: TableService;
  modelService: ModelService;
  fb: FormBuilder;

  formControl: FormControl;
  validatorMap: any = {};

  el: any;
  notify: any;
  controlName: string;
  // @Input()
  title: string;
  // @Input("model")
  modelName: string;
  type: string;
  cols: number | string;
  flex: string;
  labelWidth: string;
  tip: string | TemplateRef<void>;
  tipType: string;
  isEllipsis: boolean;
  timeOut;
  /** 元素 */
  private parentList = [];

  /** 滚动事件  */
  private scrollableParentEvent: () => void = null;

  /** 滚动元素 */
  private scrollableParent: any = null;

  /** 滚动事件定时器 */
  private scrollableParentTimer: any = null;

  /** 无标题状态下是否显示必录标识 */
  @Input() isShowNoLabelRequired: boolean = false;

  /** hy-group组件的表头 */
  @Input() hyGroupTh: string;

  constructor(type: string, formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, fb: FormBuilder, public validatorFnsService: ValidatorFnsService) {
    // console.log('BaseInput..................');
    this.formService = formService;
    this.tableService = tableService;
    this.modelService = modelService;
    this.el = el.nativeElement;
    this.type = type;
    this.fb = fb;
  }

  init() {
    //必要处理
    this.modelName = this.modelName || this.title;
    this.controlName = this.tableService.modelName + '.' + this.modelName;


    if (this.tableService && this.tableService.cols) {
      if (!this.cols) {
        this.cols = this.tableService.cols;
      }
    } else {
      if (this.type === 'select') {
        if (!this.cols) {
          this.cols = 6;
        }
      }
    }

    // this.formControl = this.formControl || new FormControl("");
    this.formControl = this.formControl || new FormControl(); //007修改select多选报错
    if (this.modelName) {
      this.formService.formGroup.addControl(this.controlName, this.formControl);
    }
    if (!this.labelWidth) {
      this.labelWidth = this.tableService.labelWidth;
    }

    if (!this.flex) {
      this.flex = this.tableService.flex;
    }

    if (this.tip && this.tipType == 'default') {
      this.tableService.showTip = true;
    }
    //
    // if(!this.isEllipsis){
    //   this.isEllipsis = this.tableService.isEllipsis;
    // }

    //在ckxxx参数都注入后，进行一次统一的check初始化
    this.regCheck();

    // 初始化样式
    this.initCdkOverlayContainer();
  }

  destroy() {
    this.validatorMap = [];
    this.formService.formGroup.removeControl(this.controlName);
    if (this.scrollableParent) {
      this.scrollableParent.removeEventListener('scroll', this.scrollableParentEvent);
      this.scrollableParent = null;
      this.scrollableParentEvent = null;
      clearTimeout(this.scrollableParentTimer);
    }
  }

  onModelChange(value: any) {
    if (value != undefined) {
      this.modelService[this.tableService.modelName][this.modelName] = value;
    }
    this.closeErrorMsgTip();
  }

  // 关闭错误信息弹窗
  closeErrorMsgTip(time?) {
    clearTimeout(this.timeOut);
    if (!time) time = 3000;
    this.timeOut = setTimeout(() => {
      if (!this.formControl.valid) {
        const errorData = this.formControl.errors;
        errorData.msg = '';
        this.formControl['errorMsg'] = null;
        this.formControl.setErrors(errorData);
      }
      clearTimeout(this.timeOut);
      this.timeOut = null;
    }, time);
  }

  //处理基础校验
  addCheck(type: string, value: any) {
    let fn = null;
    if (type === 'ckRequired') {
      fn = this.validatorFnsService.required();
    }
    if (type === 'ckMinLength') {
      fn = this.validatorFnsService.minLength(value);
    }
    if (type === 'ckMaxLength') {
      fn = this.validatorFnsService.maxLength(value);
    }
    if (type === 'ckNumber') {
      fn = this.validatorFnsService.number();
    }
    if (type === 'ckMin') {
      fn = this.validatorFnsService.min(value);
    }
    if (type === 'ckMax') {
      fn = this.validatorFnsService.max(value);
    }
    if (type === 'ckInteger') {
      fn = this.validatorFnsService.integer(value);
    }
    if (type === 'ckNoWhitespace') {
      fn = this.validatorFnsService.noWhitespace();
    }

    this.validatorMap[type] = fn;

    this.regCheck();

    // 滚动时关闭错误提示
    clearTimeout(this.scrollableParentTimer);
    this.scrollableParentTimer = setTimeout(() => {
      if(this.scrollableParent) return;
      const scrollableParent = this.findScrollableParentAndSet(this.el);
      if (!scrollableParent) return;
      this.scrollableParent = scrollableParent;
      this.scrollableParentEvent = () => {
        if (!this.formControl.valid) {
          const errorData = this.formControl.errors;
          if (errorData) {
            errorData.msg = '';
            this.formControl['errorMsg'] = null;
            this.formControl.setErrors(errorData);
          }
        }
      }
      this.scrollableParent.addEventListener('scroll', this.scrollableParentEvent);
    }, 500);
  }

  removeCheck(type: string) {
    if (this.validatorMap[type]) {
      delete this.validatorMap[type];
      this.regCheck();
    }
  }

  removeCheckBoxCheck(type: string, modelName: any) {
    if (modelName) {
      this.controlName = this.tableService.modelName + '.' + modelName;
      if (this.validatorMap[type]) {
        delete this.validatorMap[type];
      }
      this.regCheck();
    }
  }

  regCheck() {
    if (this.controlName) {
      let fns: ValidatorFn[] = [];
      for (let key in this.validatorMap) {
        fns.push(this.validatorMap[key]);
      }
      if (fns.length > 0) {
        //激活同步验证器
        this.formControl.setValidators(fns);
        this.formControl.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        this.formService.formGroup.updateValueAndValidity({ onlySelf: true, emitEvent: false });

        // BaseCheck.checkAndShowErrorMsg(this);
      } else {
        //清空同步验证器列表。
        this.formControl.clearValidators();

        // 更新状态
        this.formControl.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        this.formService.formGroup.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      }
    }
  }

  /** 解决组件弹窗时滚动页面出现的样式异常 */
  setCdkOverlayContainer(e) {
    if (e) {
      const innerContentDiv = document.getElementsByClassName('inner-content')[0] as any;
      if (!innerContentDiv) return;
      innerContentDiv.style.height = 'unset';
      this.findScrollableParentAndSet(this.el, e);
    } else {
      const innerContentDiv = document.getElementsByClassName('inner-content')[0] as any;
      if (!innerContentDiv) return;
      innerContentDiv.style.height = '100%';
      this.parentList.forEach(element => {
        element.parent.style.overflowY = element.overflowY;
        element.parent.style.marginRight = element.marginRight;
      })
      this.parentList = [];
    }

  }

  private initCdkOverlayContainer() {
    const scrollableParent = this.findScrollableParentAndSet(this.el);
    if (scrollableParent) {
      scrollableParent.style.overflowY = 'auto';
      scrollableParent.style.marginRight = '0px';
    }
  }

  /** 获取父级滚动的元素 */
  findScrollableParentAndSet(element, flag?: boolean) {
    let parent = element.parentElement;
    this.parentList = [];
    // 向上查找至html元素
    while (parent !== document.documentElement) {
      if (parent) {
        if (parent.scrollHeight !== parent.clientHeight && parent.clientHeight > 0) {
          // 发现滚动条时返回该元素
          if (flag) {
            const scrollbarWidth = parent.offsetWidth - parent.clientWidth;
            this.parentList.push({
              parent,
              overflowY: parent.style.overflowY,
              marginRight: parent.style.marginRight
            });
            parent.style.marginRight = scrollbarWidth + 'px';
            parent.style.overflowY = 'hidden';
          }
        }
        parent = parent.parentElement;
      } else {
        return null;
      }
    }
    // 找不到滚动条时返回null
    return null;
  }
}
