import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateNamePipe } from './pipes/translateName.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TranslateNamePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  providers: [
    TranslateNamePipe
  ],
  exports: [
    TranslateNamePipe,
    TranslateModule,
    FormsModule,
    CommonModule,
  ]
})
export class SharedModule { }
