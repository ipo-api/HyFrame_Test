import { NgModule, } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ChangeLogComponent } from "./change-log.component";
import { MarkdownModule, MarkdownService } from "ngx-markdown";
import { HttpClient, HttpHandler } from "@angular/common/http";


@NgModule({
  imports: [CommonModule,MarkdownModule.forRoot({ loader: HttpClient })],
  declarations: [
    ChangeLogComponent
  ],
  exports: [
    ChangeLogComponent
  ],
  providers: [
    MarkdownService
  ],
})
export class ChangeLogModule {
}
