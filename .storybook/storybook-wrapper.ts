import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { HypI18nService } from 'hy-frame-pro';
import { HypThemeService } from 'hy-frame-pro';
import { HypLanguageData } from 'hy-frame-pro';
// import { FrameConfig } from 'hy-frame-pro';

@Component({
  selector: 'sb-storybook-wrapper',
  template: `
   <ng-content></ng-content>
  `
})
export class StorybookWrapperComponent implements OnInit, OnDestroy {
  private currentLocale: string = 'en';
  private currentTheme: 'purple' | 'light' | 'dark' = 'purple';
  public renderKey: number = 0;

  constructor(
    private hypI18nService: HypI18nService,
    private hypThemeService: HypThemeService,
    private cdr: ChangeDetectorRef
  ) {
    this.currentLocale = (window as any).__STORYBOOK_CURRENT_LOCALE__ || 'en';
    this.currentTheme = (window as any).__STORYBOOK_CURRENT_THEME__ || 'purple';
    console.log('当前语言:', this.currentLocale);
    console.log('当前主题:', this.currentTheme);
  }

  private triggerStorybookRefresh(): void {
    const channel = (window as any).__STORYBOOK_ADDONS__?.channel;
    channel?.emit('forceReRender');
    
    try {
      if (window.parent !== window) {
        const parentWindow = window.parent;
        const refreshButton: any = parentWindow.document.querySelector('[title="Remount component"]') ||
          parentWindow.document.querySelector('[aria-label*="refresh"]') ||
          parentWindow.document.querySelector('[aria-label*="Refresh"]') ||
          parentWindow.document.querySelector('.refresh-button') ||
          parentWindow.document.querySelector('button[data-action="refresh"]');

        if (refreshButton) {
          console.log('找到刷新按钮，触发点击');
          refreshButton.click();
        } else {
          console.log('未找到刷新按钮');
          channel.emit('forceReRender');
        }
      }
    } catch (error) {
      console.log('模拟点击失败:', error);
      channel.emit('forceReRender');
    }
  }

  ngOnInit(): void {
    // this.updateLanguage(this.currentLocale, false);
    this.updateTheme(this.currentTheme, false);
  }

  // @HostListener('window:storybook-locale-change', ['$event'])
  // onLocaleChange(event: any): void {
  //   if (event.detail && event.detail.locale) {
  //     const newLocale = event.detail.locale;
  //     if (newLocale !== this.currentLocale) {
  //       this.currentLocale = newLocale;
  //       this.updateLanguage(newLocale, true);
  //     }
  //   }
  // }

  @HostListener('window:storybook-theme-change', ['$event'])
  onThemeChange(event: any): void {
    if (event.detail && event.detail.theme) {
      const newTheme = event.detail.theme;
      if (newTheme !== this.currentTheme) {
        this.currentTheme = newTheme;
        this.updateTheme(newTheme, true);
      }
    }
  }

  // private updateLanguage(locale: string, shouldTriggerRefresh: boolean): void {
  //   const languageMap: Record<string, HypLanguageData> = {
  //     'en': { id: 'en_US', text: 'English' },
  //     'zh': { id: 'zh_CN', text: '中文' },
  //     'hk': { id: 'zh_HK', text: '繁体中文(香港)' },
  //   };

  //   const language = languageMap[locale];
  //   if (language) {
  //     FrameConfig.i18nLanguage = language;

  //     this.hypI18nService.setLanguageData(language).subscribe(() => {
  //       this.renderKey++;
  //       this.cdr.markForCheck();

  //       if (shouldTriggerRefresh) {
  //         this.triggerStorybookRefresh();
  //       }
  //     });
  //   }
  // }

  private updateTheme(theme: 'purple' | 'light' | 'dark', shouldTriggerRefresh: boolean): void {
    this.hypThemeService.setTheme(theme).subscribe();
  }

  ngOnDestroy(): void { }
}
