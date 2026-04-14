import {Component, ElementRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Emitter} from '../../../../func/event/Emitter';
import {ED} from '../../../../../config/EventDefined';
import {ModelService} from '../../../../common/domain/service/model.service';
import {HyBaseInput} from '../../../../common/domain/base/HyBaseInput';
import {HyFormService} from '../../../../common/domain/service/hyform.service';
import {TableService} from '../../../../common/domain/service/hytable.service';
import {FormBuilder} from '@angular/forms';
import { HySize } from '../../interface';
import { ValidatorFnsService } from '../../../../func/check/validator-fns.service';

@Component({
  selector: 'hyb-input',
  templateUrl: './hyb-input.component.html',
})
export class HybInputComponent extends HyBaseInput implements OnInit, OnDestroy {
  gtEnableChangeFn: any;

  @Input('model')
  modelName: string;

  @Input()
  placeholder: string = '';

  @Input()
  readOnly: boolean;

  @Input()
  disabled: boolean;

  @Input()
  type: string = 'text';

  @Input()
  size: HySize;

  @Input()
  width: string;

  _enable: boolean = false;
  @Input()
  public set enable(value: any) {
    if (value != null) {
      this._enable = !value;
    }
  }

  constructor(formService: HyFormService, tableService: TableService, modelService: ModelService, el: ElementRef, fb: FormBuilder,public validatorFnsService: ValidatorFnsService) {
    super('hybInput', formService, tableService, modelService, el, fb, validatorFnsService);
    // console.log("HybInputComponent..................");

  }

  ngOnDestroy(): void {
    super.destroy();
    Emitter.off(this.tableService.modelName+'_'+ED.UI_Gt_Enable_Change, this.gtEnableChangeFn);
  }

  ngOnInit() {
    super.init();


    let self = this;
    this.gtEnableChangeFn = (eventName, datas)=> {
      if (!self._enable) {
        self._enable = datas;
      }
    };
    Emitter.on(this.tableService.modelName+'_'+ED.UI_Gt_Enable_Change, this.gtEnableChangeFn);
  }
}
