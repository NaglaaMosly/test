import { ResponseEntity } from './../api/model/responseEntity';
import { Constants } from './../shared/constants';
import { ApplicationModel } from './../api/model/applicationModel';
import { tap } from 'rxjs/operators';
import { AuthResourceService } from './../api/service/authResource.service';
import { LoginRequest } from './../api/model/loginRequest';
import { LoginResponse } from './../api/model/loginResponse';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import CookieUtil from '../shared/CookieUtil';
import TokenUtil from '../shared/TokenUtil';
import { ChangePasswordRequest } from '../api/model/changePasswordRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private decodedToken;
	private applications: ApplicationModel[];

	constructor(private authResourceService: AuthResourceService, private router: Router) { }

	login(userIdentifier: string, password: string): Observable<LoginResponse> {
		const loginRequest: LoginRequest = {
			userIdentifier: userIdentifier,
			password: password
		}
		return this.authResourceService.login(loginRequest).pipe(
			tap((response: LoginResponse) => {
			if (!response.mustChangePassword){
				this.saveLoginData(response);
				this.loadAccessibleApplications();
			}
			})
		);
	}

	logout() {
	this.decodedToken = null;
	this.applications = [];
	localStorage.removeItem(Constants.LOGGED_IN_USER);
	CookieUtil.remove(Constants.TOKEN);
	CookieUtil.remove(Constants.REFRESH_TOKEN);
	this.router.navigateByUrl("/");
	}

	changePassword(changePasswordRequest: ChangePasswordRequest): Observable<ResponseEntity> {
		return this.authResourceService.changePassword(changePasswordRequest);
	}

	isUserLoggedIn(): boolean {
		return CookieUtil.exists(Constants.TOKEN);
	}

	saveLoginData(loginResponse: LoginResponse) {
	console.log('saveLoginData', loginResponse, TokenUtil.parse(loginResponse.token));
	this.decodedToken = TokenUtil.parse(loginResponse.token);
	this.shareTokenIntoCookie(Constants.TOKEN, loginResponse.token);
	this.shareTokenIntoCookie(Constants.REFRESH_TOKEN, loginResponse.refreshToken);
	}

	/**
	 * Share token to other apps with the same domain
	 * only the token is being saved because of cookie size limitation
	 */
	private shareTokenIntoCookie(name: string, value: string) {
	CookieUtil.set(name, value);
	}

	changeToken(token: string) {
	this.shareTokenIntoCookie(Constants.TOKEN, token);
	}

	refreshToken() {
	return this.authResourceService.refreshToken(this.getToken());
	}

	getToken() {
	return CookieUtil.get(Constants.TOKEN);
	}

	getDecodedToken() {
	if (this.decodedToken == null) {
		const token = this.getToken();
		if (token) {
		this.decodedToken = TokenUtil.parse(token);
		}
	}
	return this.decodedToken;
	}

	getLoggedInUserName() {
	let a = this.getDecodedToken()?.sub;
	return this.getDecodedToken()?.sub || null;
	}

	loadAccessibleApplications() {
	if (this.decodedToken && this.decodedToken.aud) {
		const audience = new Array(this.decodedToken.aud);
		this.authResourceService.findApplicationsByCodes(audience)
		.subscribe(apps => this.applications = apps);
	}
	
	}

	getAccessibleApplication() {
	if (this.applications == null) {
		this.loadAccessibleApplications();
		return [];
	}
	return this.applications;
	}
}
