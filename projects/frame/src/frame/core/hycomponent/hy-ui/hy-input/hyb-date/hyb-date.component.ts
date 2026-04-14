import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ED} from '../../../../../config/EventDefined';
import {ModelService} from '../../../../common/domain/service/model.service';
import {Emitter} from '../../../../func/event/Emitter';
import {HyBaseInput} from '../../../../common/domain/base/HyBaseInput';
import {format} from 'date-fns';
import {HyFormService} from '../../../../common/domain/service/hyform.service';
import {TableService} from '../../../../common/domain/service/hytable.service';
import {FormBuilder} from '@angular/forms';
import { HySize } from '../../interface';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';
import { I18nService } from '../../../../service/i18n.service';
@Component({
  selector: 'hyb-date',
  templateUrl: './hyb-date.component.html',
  styleUrls: ['./hyb-date.component.css'],
})
export class HybDateComponent extends HyBaseInput implements OnInit, OnDestroy {
  gtEnableChangeFn: any;

  @Input('model')
  modelName: string;

  @Input()
  size: HySize = 'default';

  @Input()
  disabled: boolean;

  //展示的日期格式
  @Input()
  format: string = 'yyyy-MM-dd';

  @Input()
  allowClear: boolean;

  @Input()
  placeholder: string;

  @Input('showToday')
  showToday: boolean = true;

  //时分秒
  @Input()
  showTime: boolean = false;

  //日期和日期时分秒选择
  @Input()
  dateRange: boolean = false;

  @Input()
  width: string;

  _enable: boolean = false;
  @Input()
  public set enable(value: any) {
    if (value != null) {
      this._enable = !value;
    }
  }

  //弹出日历和关闭日历的回调
  @Output('onChange_open')
  onChange_open = new EventEmitter();

  onStatusChange(modelValue: any) {
    this.onChange_open.emit(modelValue);
  }

  //时间发生变化的回调
  private _firstChange: boolean = true; //解决第一次unidentified 是触发

  @Output('onChange_model')
  onChange_model = new EventEmitter();
  onModelChange(modelValue: any) {
    if (!this._firstChange || (modelValue && this._firstChange)) {
      let _modelValue = '';
      if (modelValue) {
        if (this.format === 'yyyy-MM-dd') {
          _modelValue = format(modelValue, 'yyyy-MM-dd');
        } else if (this.format === 'yyyy-MM-dd HH:mm') {
          _modelValue = format(modelValue, 'yyyy-MM-dd HH:mm');
        } else {
          _modelValue = format(modelValue, 'yyyy-MM-dd HH:mm:ss');
        }
      }
      this.modelService[this.tableService.modelName][this.modelName] = _modelValue;
      this.onChange_model.emit(_modelValue);
    }
    this._firstChange = false;
  }

  //点击确定按钮的回调
  @Output('onChange_ok')
  onChange_ok = new EventEmitter();

  onOk(modelValue: any) {
    this.onChange_ok.emit(modelValue);
  }

  @Output('onChange_Range')
  onChange_Range = new EventEmitter();

  onRangeChange(modelValue: Date[]) {
    this.onChange_model.emit(modelValue);
  }

  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, fb: FormBuilder,public validatorFnsService: ValidatorFnsService, public i18nService:I18nService) {
    super('date', formService, tableService, modelService, el, fb, validatorFnsService);
    // console.log("HyDateComponent..................")
  }

  ngOnInit() {
    super.init();
    this.gtEnableChangeFn = (eventName, datas) => {
      if (!this._enable) {
        this._enable = !datas;
      }
    };
    Emitter.on(this.tableService.modelName+'_'+ED.UI_Gt_Enable_Change, this.gtEnableChangeFn);
  }

  ngOnDestroy(): void {
    super.destroy();
    Emitter.off(this.tableService.modelName+'_'+ED.UI_Gt_Enable_Change, this.gtEnableChangeFn);
  }
}

//   date = null; // new Date();
//   dateRange = []; // [ new Date(), addDays(new Date(), 3) ];
//   isEnglish = false;
//
//   constructor(private i18n: NzI18nService) {}
//
//   onChange(result: Date): void {
//     console.log('onChange: ', result);
//   }
//
//   getWeek(result: Date): void {
//     console.log('week: ', getISOWeek(result));
//   }
//
//   changeLanguage(): void {
//     this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
//     this.isEnglish = !this.isEnglish;
//   }
// }
