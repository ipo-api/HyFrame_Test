import { Input } from '@angular/core';
import { ModelService } from '../service/model.service';
import { TableService } from '../service/hytable.service';

export class BaseCell {
  tableService: TableService;
  modelService: ModelService;
  // @Input()
  title: string;
  // @Input("model")
  modelName: string;
  // @Input()
  item: Object;
  // @Input()
  index: number;
  type: string;

  showSort: boolean; //是否排序

  width: string;

  filterType: 'inputFilter' | 'dicFilter'; //th过滤类型，inputFilter（搜索框过滤），dicFilter（选择字典项过滤）

  filterMultiple: boolean; //th字典项过滤时，是否为多选过滤器

  filterDicName: string; //th字典项过滤，字典名

  placeholder: string; //th搜索框的placeholder属性

  onSortChange: any;

  hyLeft: string;

  hyRight: string;

  sortFn: (sort?: string, modelName?: string) => void;

  constructor(tableService: TableService, modelService: ModelService) {
    this.tableService = tableService;
    this.modelService = modelService;
  }

  public init() {
    //必要处理
    this.type = this.type || 'text';
    this.modelName = this.modelName || this.title;

    if (this.tableService.type === 'glt') {
      const index = this.tableService.heads.findIndex(item => item.content === this.title);
      if(index > -1){
        let obj = {...this.createNewObj(), ...this.tableService.heads[index]};
        this.tableService.heads[index] = obj;
      }else{
        this.tableService.heads.push(this.createNewObj());
      }
    }
  }

  /** 创建新的对象 */
  private createNewObj() {
    let obj = { content: this.title, type: this.type, modelName: this.modelName, hyCell: this };

    obj['width'] = this.width;

    // **表格虚拟滚动左、右侧距离**
    obj['nzLeft'] = this.hyLeft || false;
    obj['nzRight'] = this.hyRight || false;

    //th过滤
    obj['filterMultiple'] = this.filterMultiple;
    obj['filterType'] = this.filterType;
    obj['filterDicName'] = this.filterDicName;
    obj['placeholder'] = this.placeholder;
    obj['filterDicValue'] = [];
    // th排序
    obj['showSort'] = this.showSort;
    // 排序方法
    obj['onSortChange'] = this.onSortChange;

    obj['sortFn'] = this.sortFn;
    return obj;
  }
}
