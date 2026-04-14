import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from './ng-zorro-antd.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpModule, RouterModule, NgZorroAntdModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, HttpModule, RouterModule, NgZorroAntdModule],
})
export class BaseNgModule { }
