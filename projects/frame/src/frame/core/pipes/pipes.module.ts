import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nAppPipe } from './i18nApp.pipe';
import { I18nFramePipe } from './i18nFrame.pipe';
import { DicToOptionsPipe } from './dic-to-options.pipe';
import { toDatePipe } from './toDatePipe';
import { toTimePipe } from './toTimePipe';
import { StringHighlightPipe } from './string-highlight.pipe';
import { HyEscapeHtmlPipe } from './hy-escape-html-pipe';
import { HyDicPipe } from './hy-dic.pipe';

const pipes = [
  I18nAppPipe,
  I18nFramePipe,
  DicToOptionsPipe,
  toDatePipe,
  toTimePipe,
  StringHighlightPipe,
  HyEscapeHtmlPipe,
  HyDicPipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class PipesModule { }
