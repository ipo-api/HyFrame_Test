import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { $hyapi } from '../api/$hyapi';
import { DicService } from '../service/dic.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'hyDic',
  pure: false
})
export class HyDicPipe implements PipeTransform, OnDestroy {
  private currentValue: string = '';
  private sub: Subscription;
  private lastDicName: string;
  private lastDicValue: string | string[];
  private lastMds: any;
  private lastSeparator: string;

  constructor(private dicService: DicService, private cdr: ChangeDetectorRef) {

  }

  /** 
   * 字典数据展示
   * @param dicName 字典名称
   * @param dicValue 字典值
   * @param mds ModelService
   * @param separator 分隔符
   * @returns 字典数据
   */
  transform(dicName: string, dicValue: string | string[], mds, separator?: string): any {
    if (this.hasInputsChanged(dicName, dicValue, mds, separator)) {
      this.lastDicName = dicName;
      this.lastDicValue = dicValue;
      this.lastMds = mds;
      this.lastSeparator = separator;
      this.dispose();

      this.sub = this.dicService.createSubject(dicName).subscribe(() => {
        this.updateValue(dicName, dicValue, mds, separator);
      });

      this.updateValue(dicName, dicValue, mds, separator);
    }
    return this.currentValue;
  }

  /** 
   * 检查输入参数是否发生变化
   * @param dicName 字典名称
   * @param dicValue 字典值
   * @param mds ModelService
   * @param separator 分隔符
   * @returns 是否发生变化
   */
  private hasInputsChanged(dicName: string, dicValue: string | string[], mds, separator?: string): boolean {
    if (this.lastDicName !== dicName) return true;
    if (this.lastMds !== mds) return true;
    if (this.lastSeparator !== separator) return true;
    if (this.lastDicValue === dicValue) return false;
    
    if (Array.isArray(this.lastDicValue) && Array.isArray(dicValue)) {
      if (this.lastDicValue.length !== dicValue.length) return true;
      for (let i = 0; i < dicValue.length; i++) {
        if (this.lastDicValue[i] !== dicValue[i]) return true;
      }
      return false;
    }
    return true;
  }

  /** 
   * 更新字典数据
   * @param dicName 字典名称
   * @param dicValue 字典值
   * @param mds ModelService
   * @param separator 分隔符
   */
  private async updateValue(dicName: string, dicValue: string | string[], mds, separator?: string) {
    const newVal = await this.getDicText(dicName, dicValue, mds, separator);
    if (this.currentValue !== newVal) {
      this.currentValue = newVal;
      this.cdr.markForCheck();
    }
  }

  /** 
   * 获取字典文本
   * @param dicName 字典名称
   * @param dicValue 字典值
   * @param mds ModelService
   * @param separator 分隔符
   * @returns 字典文本
   */
  private async getDicText(dicName: string, dicValue: string | string[], mds, separator?: string): Promise<string> {
    const dicData = await $hyapi.dic.getDicData(dicName, mds);
    if (dicData && dicData.length > 0) {
      if (Array.isArray(dicValue)) {
        return dicValue.map(value => {
          const dicItem = dicData.find(item => item.id === value);
          return dicItem ? dicItem.text : '';
        }).join(separator || ',');
      } else {
        const dicItem = dicData.find(item => item.id === dicValue);
        return dicItem ? dicItem.text : '';
      }
    }
    return '';
  }

  ngOnDestroy(): void {
    this.dispose();
  }

  /** 
   * 取消订阅
   */
  private dispose() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }
}
