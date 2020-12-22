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
    private authService: AuthService) {
    
  }


  ngOnInit(): void {
    this.setDefaultLang();
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

  private setDefaultLang() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
