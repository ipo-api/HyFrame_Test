import { Pipe, PipeTransform } from '@angular/core';
import { $hyapi } from '../api/$hyapi';

@Pipe({
  name: 'dicToOptions'
})
export class DicToOptionsPipe implements PipeTransform {

  async transform(value: string, mds): Promise<any> {
    const data = [];
    const dicData = await $hyapi.dic.getDicData(value,mds);
    if(dicData && dicData.length>0){
      dicData.forEach(element => {
        data.push({
          label:element.text,
          value:element.id
        })
      });
    }
    return data;
  }

}
