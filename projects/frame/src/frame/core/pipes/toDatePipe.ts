import { Pipe, PipeTransform } from '@angular/core';



@Pipe({ name: 'toDate' })
export class toDatePipe implements PipeTransform {
  transform(str: any){

    if(str && str.length >0){
      if(Array.isArray(str)){
        let data=[];
        for(let i = 0; i<= str.length-1;i++){
          if(str[i]){
            let _date = str[i].replace(/-/g,'/');
            data.push(new Date(_date));
          }
        }
        return data;
      }else {
        let _date = str.replace(/-/g,'/');
        return new Date(_date);
      }
    }else{
      return null;
    }

  }
}
