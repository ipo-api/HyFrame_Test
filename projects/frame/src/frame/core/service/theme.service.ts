import { Injectable } from '@angular/core';
import { AppGlobal } from '../../config/AppGlobal';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  setTheme(theme: string) {
    const themeLink = document.getElementById('theme');
    if (themeLink) {
      const themeFile = `assets/themes/style.${theme}.css`;
      themeLink.setAttribute('href', themeFile);
    } else {
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = 'theme';
      style.href = `assets/themes/style.${theme}.css`;
      document.body.append(style);
    }
    localStorage.setItem('theme', theme);
  }

  initTheme() {
    let theme = localStorage.getItem('theme');
    if(!AppGlobal.isTheme){
      theme = 'light';
    }
    if(theme){
      this.setTheme(theme);
    }else{
      this.setTheme('light');
    }
  }
}
