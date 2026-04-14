import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../service/i18n.service';

@Pipe({
  name: 'i18n'
})
export class I18nAppPipe implements PipeTransform {
  constructor(private i18nService: I18nService) {

  }

  transform(value: string, arr?: any[]): any {
    return this.i18nService.get(value, arr);
  }

}
