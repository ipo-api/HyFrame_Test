import { ModelService } from '../service/model.service';
import { TableService } from '../service/hytable.service';
import { HyFormService } from '../service/hyform.service';
import { Directive, TemplateRef, ContentChildren, QueryList, Input, ViewChildren, ElementRef } from '@angular/core';
import { HyCellComponent } from '../../../hycomponent/hy-ui/hy-table/hy-cell/hy-cell.component';
import { NzThAddOnComponent } from 'ng-zorro-antd/table';
import { HyEditTableScroll } from '../../../hycomponent/hy-ui/hy-table/hy-glt/interface';


@Directive()
export class HyBaseTable {
  @ViewChildren('head') heads: QueryList<NzThAddOnComponent<any>>;

  @ContentChildren(HyCellComponent, { descendants: true }) public hyCells!: QueryList<HyCellComponent>;

  tableService: TableService;
  modelService: ModelService;
  formService: HyFormService;

  type: string;
  // @Input()
  title: string | TemplateRef<void>;
  // @Input("model")
  modelName: string;
  modelName_property: string;

  datas: any;
  datas_property: any;

  isShow: boolean = true;

  /** 兄弟节点中是否包含gt或glt,如果没有gt或者没有glt，则class为gltStyle1时，不会显示gt和glt中间的分割线 */
  public isBrotherNodeContainGtOrGlt: boolean = false;

  /** 页面回调改变函数添加防抖（首次加载会触发多次，为避免影响代码和重复执行，现增加防抖） */
  public timeOut;

  private firstRow: HyCellComponent[] = [];

  @Input() showCheckbox: boolean = false;

  @Input() showCheckAll: boolean = false;

  @Input() showRadio: boolean = false;

  @Input() showOrderNum: boolean = false;

  @Input() showExpand: boolean = false;

  /** 滚动条宽度 */
  @Input() scroll: HyEditTableScroll;

  constructor(type: string, modelService: ModelService, tableService: TableService, formService: HyFormService, ops?: any) {
    // console.log("BaseGt..................");

    this.type = type;
    this.modelService = modelService;
    this.tableService = tableService;
    this.formService = formService;
    this.tableService.type = this.type;
  }

  init() {
    if (typeof this.title === 'string') {
      this.modelName = this.modelName || this.title;
    }
    //必要处理
    if (!this.datas) {
      this.modelName = this.modelName ? this.type + '_' + this.modelName : this.type + '_' + this.title;
      this.tableService.modelName = this.modelName;

      //datas
      if (this.type === 'gt') {
        this.modelService[this.modelName] = this.modelService[this.modelName] || {};
      } else if (this.type === 'glt') {
        this.modelService[this.modelName] = this.modelService[this.modelName] || [];
      } else if (this.type === 'dgc') {
        this.modelService[this.modelName] = this.modelService[this.modelName] || [];
      }

      this.datas = this.modelService[this.modelName];
    }

    if (!this.datas_property) {
      this.modelName_property = this.modelName + '_$Property';
      this.tableService.modelName_property = this.modelName_property;

      //datas_property
      if (this.type === 'glt') {
        this.modelService[this.modelName_property] = this.modelService[this.modelName_property] || {};
        this.modelService[this.modelName_property].pageSize = this.modelService[this.modelName_property].pageSize || 10;
        this.modelService[this.modelName_property].curPage = this.modelService[this.modelName_property].curPage || 1;
      }

      this.datas_property = this.modelService[this.modelName_property];

      if (!this.modelService.tableServiceMap) {
        this.modelService.tableServiceMap = {};
      }
      this.modelService.tableServiceMap[this.modelName] = this.tableService;
      this.tableService.formService = this.formService;
    }
  }

  /** 兄弟节点中是否包含gt或glt */
  // private isBrotherNodeContainGtOrGlt(node: HTMLElement): boolean {
  //   const parent = this.getBrotherNode(this._el.nativeElement);
  //   if (parent) {
  //     const children = parent.children;
  //   }
  // }

  public getNzLeft(index: number): string {
    if (!this.scroll) return;
    // 0:Checkbox,1:Radio,2:OrderNum,3:Expand
    const nzLeftList = [this.showCheckAll ? 70 : 45, 45, 45, 50];
    let nzLeft = 0;
    nzLeftList.forEach((item, i) => {
      if (i <= index) {
        if (i === 0 && (this.showCheckAll || this.showCheckbox)) {
          nzLeft += item;
        }
        if (i === 1 && this.showRadio) {
          nzLeft += item;
        }
        if (i === 2 && this.showOrderNum) {
          nzLeft += item;
        }
        if (i === 3 && this.showExpand) {
          nzLeft += item;
        }
      }
    });
    nzLeft -= nzLeftList[index]
    return nzLeft + 'px';
  }

  /** 设置nzLeft和nzRight */
  public setNzLeftAndRight(data: any[]) {
    const hyCells = this.hyCells.toArray().slice(this.tableService.heads.length, this.hyCells.toArray().length);
    const newHyCells: HyCellComponent[][] = [];
    for (let i = 0; i < data.length; i++) {
      const startIndex = i * this.tableService.heads.length;
      const endIndex = startIndex + this.tableService.heads.length;
      const cell = hyCells.slice(startIndex, endIndex);
      newHyCells.push(cell);
    }
    // 先取出其中一行的数据。
    const firstRow = newHyCells[0] || [];
    this.firstRow = firstRow;
    const firstRowCellsLeft = [];
    const firstRowCellsRight = [];
    const hyCellsLeftArray = [];
    const hyCellsRightArray = [];

    this.firstRow.forEach((cell, index) => {
      if (cell.nzLeft) {
        cell.headIndex = index;
        firstRowCellsLeft.push(cell);
      }
      if (cell.nzRight) {
        cell.headIndex = index;
        firstRowCellsRight.push(cell);
      }
    })

    firstRowCellsLeft.forEach((cell, index) => {
      const tempCell = firstRowCellsLeft.slice(0, index);
      let hyCellsLeftWidth = tempCell.reduce((acc, cell) => acc + parseInt(cell.width), 0);
      // 计算表头偏移量
      if (this.showCheckbox || this.showCheckAll) {
        hyCellsLeftWidth += this.showCheckAll ? 70 : 45;
      }
      if (this.showRadio) {
        hyCellsLeftWidth += 45;
      }
      if (this.showOrderNum) {
        hyCellsLeftWidth += 45;
      }
      if (this.showExpand) {
        hyCellsLeftWidth += 50;
      }
      hyCellsLeftArray.push(hyCellsLeftWidth);
    })

    firstRowCellsRight.forEach((cell, index) => {
      const tempCell = firstRowCellsRight.slice(index, firstRowCellsRight.length);
      const hyCellsRightWidth = tempCell.reduce((acc, cell) => acc + parseInt(cell.width), 0) - parseInt(cell.width);
      hyCellsRightArray.push(hyCellsRightWidth);
    })

    newHyCells.forEach((row, rowIndex: number) => {
      row.filter(cell => cell.nzLeft).forEach((cell, index) => {
        if (hyCellsLeftArray[index] !== undefined) {
          cell.hyLeft = hyCellsLeftArray[index] + 'px';
          if (index === hyCellsLeftArray.length - 1) {
            cell.isLastLeft = true;
          }
          cell.setNzLeftAndRight();
        }
      })
      row.filter(cell => cell.nzRight).forEach((cell, index) => {
        if (hyCellsRightArray[index] !== undefined) {
          cell.hyRight = hyCellsRightArray[index] + 'px';
          if (index === 0) {
            cell.isFirstRight = true;
          }
          cell.setNzLeftAndRight();
        }
      })
    })
    // 设置表头样式
    this.setHeadStyle();
  }

  /** 
   * 设置表头样式
   */
  public setHeadStyle() {
    // 设置表头样式
    this.clearHeadStyle(this.heads.toArray()[0]['host'].nativeElement);
    this.firstRow.forEach((cell, index) => {
      const head = this.heads.toArray()[index]['host'].nativeElement as HTMLElement;
      if (cell.hyRight) {
        head.classList.add('ant-table-cell-fix-right');
        head.setAttribute('ng-reflect-nz-right', cell.hyRight);
        if (cell.isFirstRight) {
          head.classList.add('ant-table-cell-fix-right-first');
        }
        head.style.right = cell.hyRight;
      }
      if (cell.hyLeft) {
        head.classList.add('ant-table-cell-fix-left');
        head.setAttribute('ng-reflect-nz-left', cell.hyLeft);
        if (cell.isLastLeft) {
          head.classList.add('ant-table-cell-fix-left-last');
        }
        head.style.left = cell.hyLeft;
      }
    })
  }

  /** 清除表头样式,只删除右侧表头样式 */
  private clearHeadStyle(head: HTMLElement) {
    if (!head) {
      return;
    }
    head.classList.remove('ant-table-cell-fix-right-first');
    head.classList.remove('ant-table-cell-fix-right');
    head.classList.remove('ant-table-cell-fix-left-last');
    head.removeAttribute('ng-reflect-nz-right');
    head.style.right = '';
    if (head.previousElementSibling) {
      this.clearHeadStyle(head.previousElementSibling as HTMLElement);
    }
  }

}
