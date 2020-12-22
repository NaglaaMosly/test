import { Constants } from './constants';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArabicStyleLoaderService {

  constructor(private translate: TranslateService, private router: Router) {}

  load(): void {
    this.translate.use(Constants.ARABIC_LOCAL_ID);
    this.addArabicStyle();
    location.reload();
  }

  unload(): void {
    this.translate.use(Constants.ENGLISH_LOCAL_ID);
    this.removeArabicStyle();
    location.reload();
  }

  private addArabicStyle(): void {
    this.appendArabicStyleToHead();
    localStorage.setItem('local', Constants.ARABIC_LOCAL_ID);
  }

  private removeArabicStyle(): void {
    document.getElementById('style_ar').remove();
    localStorage.setItem('local', Constants.ENGLISH_LOCAL_ID);
  }

  appendArabicStyleToHead(): void {
    const arabicStyle = document.createElement('link');
    arabicStyle.rel = 'stylesheet';
    arabicStyle.id = 'style_ar';
    arabicStyle.href = 'assets/css/styles_ar.css';
    arabicStyle.type = 'text/css';
    document.head.appendChild(arabicStyle);
  }
}
