import { Component, Input, OnInit, Output,EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { HyTagDatas } from './interface';

@Component({
  selector: 'hy-tag',
  templateUrl: './hy-tag.component.html',
  styleUrls: ['./hy-tag.component.css']
})
export class HyTagComponent implements OnChanges {
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  /**
   * 数据集 
   * @required
   */
  @Input() datas:Array<HyTagDatas>;

  /**
   * 是否显示新建tag 
   */
  @Input() showNewTag:boolean = false;

  /**
   * 数据集变动事件 
   */
  @Output() datasChange = new EventEmitter<any>();

  /**
   * 点击删除事件
   */
  @Output() onRemove = new EventEmitter<HyTagDatas>();

  /**
   * 点击标签事件
   */
  @Output() onCheckChange = new EventEmitter<HyTagDatas>();

  inputVisible:boolean = false;

  inputValue:string = null;

  _datas:Array<any>;

  isCanChange:boolean = true;

  constructor() { }

  ngOnChanges(changes) {
    if(changes && changes['datas'] && changes['datas'].currentValue && this.isCanChange){
      const datas = [];
      this.datas.forEach((element,index)=>{
        const data = element;
        data['index'] = index;
        datas.push(data);
      })
      this._datas = datas;
    }
  }

  remove(e) {
    this._datas = this._datas.filter(item=> item.index !== e.index);
    this.setDatas();
    this.onRemove.emit(e);
  }

  setDatas() {
    const datas = [];
    this._datas.forEach(element => {
      const data= {};
      Object.assign(data,element);
      delete data['index'];
      datas.push(data);
    });
    this.datas = datas;
    this.isCanChange = false;
    this.datasChange.emit(this.datas);
    setTimeout(() => {
      this.isCanChange = true;
    }, 1);
  }

  checkedChange(e) {
    this.onCheckChange.emit(e);
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(){
    if (this.inputValue) {
      const data = {
        mode:'close',
        title:this.inputValue,
        index:this._datas.length
      };
      this._datas.push(data);
    }
    this.inputValue = '';
    this.inputVisible = false;
    this.setDatas();
  }

}
