import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApplicationModel } from 'src/app/api/model/applicationModel';
import { AuthResourceService } from 'src/app/api/service/authResource.service';
import { environment } from './../../../environments/environment';
import { AuthService } from './../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	hide = true;
	userIdentifier: string;
	password: string;
	redirectTo: string;
	@ViewChild('f') loginForm: NgForm;
	isTestingEnvironment: boolean = true;
	private params: Params;

	constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private authResourceService: AuthResourceService) { }

	ngOnInit(): void {
		this.initRedirectUrl();
		this.isTestingEnvironment = this.checkIfTestingEnvironment();
	}

	initRedirectUrl() {
		this.route.queryParams
			.subscribe(params => {
				this.params = params;
				if (params['redirect-to']) {
					this.redirectTo = params['redirect-to'];
					try {
						this.redirectTo = atob(this.redirectTo);
					} catch (error) {
						console.warn('redirection URL is not properly encoded');
					}
					if (this.authService.isUserLoggedIn()) {
						let redirectionAllowed = this.authService.registerRedirectionAndAskForNewOne();
						if (redirectionAllowed) {
							window.location.href = this.redirectTo;
						}
					}
				}
			});
	}

	loginAction() {
		if (this.loginForm.form.valid) {
			this.authService.login(this.userIdentifier, this.password)
				.subscribe(loginResponse => {
					if (loginResponse.mustChangePassword) {
						// temp token is token with minimal calims just to allow user to change password
						sessionStorage.temp_token = loginResponse.token;
						this.router.navigate(['/auth', 'change-password'], { queryParams: this.params });
					} else if (this.redirectTo) {
						window.location.href = this.redirectTo;
					} else {
						this.chooseWhichAppToNavigate();
					}
				}, error => {

				});
		}
	}

	switchEnvironment() {
		if (this.isTestingEnvironment) {
			window.location.href = environment.liveEnvironmentLoginUrl;
		} else {
			window.location.href = environment.testingEnvironmentLoginUrl;
		}
	}

	checkIfTestingEnvironment() {
		return window.location.host !== environment.liveEnvironmentHost;
	}

	chooseWhichAppToNavigate() {
		this.authResourceService.findAccessibleApplications()
			.subscribe(apps => this.navigateTo(apps));
	}

	navigateTo(apps: ApplicationModel[]) {
		if (apps && apps.length > 0) {
			window.location.href = apps[0].url;
		} else {
			this.router.navigateByUrl('/');
		}
	}
}
