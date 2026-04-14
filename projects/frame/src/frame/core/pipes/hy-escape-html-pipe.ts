import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'escapeHtml' })
export class HyEscapeHtmlPipe implements PipeTransform {
  transform(str: string):string {
    if(!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\//g, "&#x2F;");
  }
}
