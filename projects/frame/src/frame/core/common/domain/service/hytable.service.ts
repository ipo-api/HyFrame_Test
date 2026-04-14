import {Injectable, Input} from '@angular/core';
import {HyFormService} from './hyform.service';

@Injectable()
export class TableService {
  type: string;
  cols: number | string = 6;
  enable: boolean = true;
  labelWidth: string = '120px';
  flex: any; //nz-form-item是否Flex布局

  // model:any = null;
  heads: any[] = [];
  heads1: any[] = [];
  modelName: string;
  modelName_property: string;
  showTip: boolean = false;
  isEllipsis: boolean = false;
  /** 标题是否换行 */
  isLabelWrap:boolean = false;
  formService: HyFormService;
  constructor() {
    // console.log("TableService..................");
  }
}
