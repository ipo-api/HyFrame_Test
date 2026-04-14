import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'toTime' })
export class toTimePipe implements PipeTransform {
  transform(str: string):Date {
    if(str && str.length >0){

      return new Date('2019/01/01 '+str) || null;
    }

  }
}
