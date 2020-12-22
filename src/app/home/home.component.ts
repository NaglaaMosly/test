import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  applications;

  constructor(private authService: AuthService) {}

  changeLocal() {
    // this.translate.currentLang === Constants.ENGLISH_LOCAL_ID ? this.arabicStyleLoader.load() : this.arabicStyleLoader.unload();
  }

  logout() {
    console.log("LOG OUT");
    this.authService.logout();
  }

  get loggedInUserName() {
    return this.authService?.getLoggedInUserName();
  }

  get accessibleApplications() {
    return this.authService.getAccessibleApplication();
  }

  isLoggedIn() {
    return this.authService.isUserLoggedIn();
  }
}
