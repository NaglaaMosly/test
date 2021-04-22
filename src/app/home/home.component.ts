import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';
import { ArabicStyleLoaderService } from '../shared/arabic-style-loader.service';
import { Constants } from '../shared/constants';
import {ApplicationModel} from '../api/model/applicationModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  applications;

  constructor(public translate: TranslateService,
              private authService: AuthService,
              private arabicStyleLoader: ArabicStyleLoaderService) {
  }

	ngOnInit() {
		if (!this.authService.isUserLoggedIn()) {
			this.logout();
		}
	}

	changeLocal(): void {
		this.translate.currentLang === Constants.ENGLISH_LOCAL_ID ? this.arabicStyleLoader.load() : this.arabicStyleLoader.unload();
	}

  logout(): void {
    this.authService.logout();
  }

  get loggedInUserName(): string {
    return this.authService?.getLoggedInUserName();
  }

  get accessibleApplications(): ApplicationModel[] {
    return this.authService.getAccessibleApplication();
  }

  isLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }
}
