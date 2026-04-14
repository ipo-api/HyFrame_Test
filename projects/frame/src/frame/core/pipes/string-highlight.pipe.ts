import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringHighlight'
})
export class StringHighlightPipe implements PipeTransform {

  transform(data: string, value: string): unknown {
    let newData = data;
    newData = this.escapeHtml(newData || '');
    if(value){
      value = this.escapeHtml(value || '');
      const index= newData.toUpperCase().indexOf(value.toUpperCase());
      if (index > -1) {
        let selectData =  newData.substring(index,index + value.length);
        newData = newData.replace(selectData, '<span class="tree-highlight">' + selectData + '</span>');
      }
    }
    return newData;
  }

  /** 转义html */
  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\//g, "&#x2F;");
  }

}
