import { Injectable, OnDestroy } from '@angular/core';
import { I18nService } from '../../../service/i18n.service'

@Injectable()
export class ModelService implements OnDestroy {

  private $dicCache: any = {};

  public tableServiceMap: any = {};

  public urlCache: any = {};

  private uuid = this.i18nService.getUuid();

  constructor(private i18nService: I18nService) {
    this.i18nService.createSubject(this.uuid).subscribe(e=>{
      this.$dicCache = {};
    })
  }

  pushDic(dic: any) {
    if (dic && dic.name) {
      this.$dicCache[dic.name] = dic.value;
    }
  }

  getDic(dicName: string) {
    return this.$dicCache[dicName];
  }

  ngOnDestroy(): void {
    this.i18nService.clearSubject(this.uuid);
  }
}
