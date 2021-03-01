import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../auth/auth.service';
import { ArabicStyleLoaderService } from './../shared/arabic-style-loader.service';
import { Constants } from './../shared/constants';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {

	applications;

	constructor(public translate: TranslateService,
		private authService: AuthService,
		private arabicStyleLoader: ArabicStyleLoaderService) { }

	changeLocal() {
		this.translate.currentLang === Constants.ENGLISH_LOCAL_ID ? this.arabicStyleLoader.load() : this.arabicStyleLoader.unload();
	}

	logout() {
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
