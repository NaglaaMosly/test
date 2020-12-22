import { ArabicStyleLoaderService } from './shared/arabic-style-loader.service';
import { Constants } from './shared/constants';
import { AuthService } from './auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private arabicStyleLoader: ArabicStyleLoaderService) {
    
  }


  ngOnInit(): void {
    this.initTranslateAndDocDir();
    this.subscribeToRouteParams();
  }

  private subscribeToRouteParams() {
    this.route.queryParams
      .subscribe(params => this.doNextAction(params));
  }

  private doNextAction(params) {
    if (params['action'] === 'login') {
      this.router.navigate(['/auth', 'login'], { queryParams: params });
    } else if (params['action'] === 'logout') {
      this.authService.logout();
    }
  }

  initTranslateAndDocDir() {
    const local = localStorage.getItem('local') || Constants.ENGLISH_LOCAL_ID;
    this.translate.setDefaultLang(Constants.ENGLISH_LOCAL_ID);
    this.translate.use(local);
    document.dir = local === Constants.ARABIC_LOCAL_ID ? 'rtl' : 'ltr';
    document.dir === 'rtl' && this.arabicStyleLoader.appendArabicStyleToHead();
  }
}
