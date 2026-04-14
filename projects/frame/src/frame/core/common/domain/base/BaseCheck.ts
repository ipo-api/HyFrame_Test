import {HyBaseInput} from './HyBaseInput';







// import * as $ from 'jquery';

declare let $: any;
declare let jQuery: any;

export class BaseCheck {


  static checkAndShowErrorMsg(obj:any){

    let errors = obj.formService.formGroup.controls[obj.controlName] == null ? null : obj.formService.formGroup.controls[obj.controlName].errors;
    if (errors) {
      let msg:string = '';
      for (let k in errors) {
        switch (k) {
          case 'required':
            if(!obj.formControl.pristine){
              msg = msg + ';该字段为必填项，不允许为空！';
            }
            break;
          case 'number':
            if(!obj.formControl.pristine){
              msg = msg + ';该字段必须为数字！';
            }
            break;
          case 'minlength':
            if(!obj.formControl.pristine){
              msg = msg + ';长度不能少于' + obj.ckMinLength + '！';
            }
            break;
          case 'maxlength':
            if(!obj.formControl.pristine){
              msg = msg + ';长度不能大于' + obj.ckMaxLength + '！';
            }
            break;
          case 'min':
            if(!obj.formControl.pristine){
              msg = msg + ';数值不能少于' + obj.ckMin + '！';
            }
            break;
          case 'max':
            if(!obj.formControl.pristine){
              msg = msg + ';数值不能大于' + obj.ckMax + '！';
            }
            break;
          case 'range':
            if(!obj.formControl.pristine){
              msg = msg + ';该字段的值范围不满足！';
            }
            break;
          case 'integer':
            if(!obj.formControl.pristine){
              msg = msg + ';该字段必须为整数！';
            }
            break;
          default:
        }
      }
      if (msg) {
        msg = msg.substring(1);

        if(obj.notify){
          // obj.notify.run(msg, {position: "t r"});
          if(Array.isArray(obj.notify)){
            for(let i in obj.notify){
              obj.notify[i].run(msg, {position: 't r'});
            }
          }else {
            obj.notify.run(msg, {position: 't r'});
          }

        }else{
          if(obj.type === 'text' || obj.type === 'password' || obj.type === 'number' ){
            if($(obj.el)['find']('nz-input-group').length>0){
              obj.notify = $(obj.el)['find']('nz-input-group')['notify'](msg, {position: 't r'});
            }else {
              obj.notify = $(obj.el)['find']('input:not(:hidden)')['notify'](msg, {position: 't r'});
            }
          } else if(obj.type === 'date') {
            if ($(obj.el)['find']('nz-range-picker').length > 0) {
              obj.notify = $(obj.el)['find']('nz-range-picker')['notify'](msg, {position: 't r'});
            } else {
              obj.notify = $(obj.el)['find']('nz-date-picker')['notify'](msg, {position: 't r'});
            }
          }else if(obj.type === 'time') {
              obj.notify = $(obj.el)['find']('nz-time-picker')['notify'](msg, {position: 't r'});
          }else if(obj.type === 'select'){
            obj.notify = $(obj.el)['find']('nz-select')['notify'](msg, {position: 't r'});
          }else if(obj.type === 'textarea'){
            obj.notify = $(obj.el)['find']('textarea:not(:hidden)')['notify'](msg, {position: 't r'});
          }else if(obj.type === 'treeSelect'){
            obj.notify = $(obj.el)['find']('nz-tree-select')['notify'](msg, {position: 't r'});
          }
        }
      }
    }else{
      if(obj.notify){
        // obj.notify.show(false);
        if(Array.isArray(obj.notify)){
          for(let i in obj.notify){
            obj.notify[i].show(false);
          }
        }else {
          obj.notify.show(false);
        }
      }
    }
  }



}
