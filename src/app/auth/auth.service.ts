import {
  Injectable
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  tap
} from 'rxjs/operators';
import {
  ChangePasswordRequest
} from '../api/model/changePasswordRequest';
import CookieUtil from '../shared/CookieUtil';
import TokenUtil from '../shared/TokenUtil';
import {
  ApplicationModel
} from '../api/model/applicationModel';
import {
  LoginRequest
} from '../api/model/loginRequest';
import {
  LoginResponse
} from '../api/model/loginResponse';
import {
  ResponseEntity
} from '../api/model/responseEntity';
import {
  AuthResourceService
} from '../api/service/authResource.service';
import {
  Constants
} from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private decodedToken;
  private applications: ApplicationModel[];
  private applications$: Observable < ApplicationModel[] > ;

  constructor(private authResourceService: AuthResourceService, private router: Router) {}

  login(userIdentifier: string, password: string): Observable < LoginResponse > {
    const loginRequest: LoginRequest = {
      userIdentifier,
      password
    };
    return this.authResourceService.login(loginRequest).pipe(
      tap((response: LoginResponse) => {
        if (!response.mustChangePassword) {
          this.saveLoginData(response);
          this.loadAccessibleApplications();
        }
      })
    );
  }

  logout(): void {
    this.decodedToken = null;
    this.applications = [];
    localStorage.removeItem(Constants.LOGGED_IN_USER);
    CookieUtil.remove(Constants.TOKEN);
    CookieUtil.remove(Constants.REFRESH_TOKEN);
    this.router.navigateByUrl('/auth/login');
  }

  changePassword(changePasswordRequest: ChangePasswordRequest): Observable < ResponseEntity > {
    return this.authResourceService.changePassword(changePasswordRequest);
  }

  isUserLoggedIn(): boolean {
    return CookieUtil.exists(Constants.TOKEN);
  }

  saveLoginData(loginResponse: LoginResponse): void {
    console.log('saveLoginData', loginResponse, TokenUtil.parse(loginResponse.token));
    this.decodedToken = TokenUtil.parse(loginResponse.token);
    localStorage.setItem(Constants.TOKEN, loginResponse.token);
    this.shareTokenIntoCookie(Constants.TOKEN, loginResponse.token);
    this.shareTokenIntoCookie(Constants.REFRESH_TOKEN, loginResponse.refreshToken);
  }

  /**
   * Share token to other apps with the same domain
   * only the token is being saved because of cookie size limitation
   */

  private shareTokenIntoCookie(name: string, value: string): void {
    CookieUtil.set(name, value);
  }

  changeToken(token: string): void {
    this.shareTokenIntoCookie(Constants.TOKEN, token);
    if (token == null) {
      this.logout();
    }
  }

  refreshToken() : Observable<LoginResponse> {
    const refreshToken = CookieUtil.get(Constants.REFRESH_TOKEN);
    return this.authResourceService.refreshToken(refreshToken);
  }

  getToken(): string {
    return CookieUtil.get(Constants.TOKEN);
  }

  getDecodedToken(): string {
    if (this.decodedToken == null) {
      const token = this.getToken();
      if (token) {
        this.decodedToken = TokenUtil.parse(token);
      }
    }
    return this.decodedToken;
  }

  getLoggedInUserName() {
    return this.getDecodedToken() ? .sub || null;
  }

  getAccessibleApplication(): ApplicationModel[] {
    if (this.applications == null && this.applications$ == null) {
      this.loadAccessibleApplications();
    }
    return this.applications || [];
  }

  loadAccessibleApplications(): void {
    this.authResourceService.findAccessibleApplications()
      .subscribe(apps => this.applications = apps);
  }

  public registerRedirectionAndAskForNewOne(): boolean {
    let allowRedirection = true;
    let loginRedirectionsWindow = CookieUtil.get('lrw');
    console.log('loginRedirectionsWindow', loginRedirectionsWindow);
    if (loginRedirectionsWindow) {
      console.log('loginRedirectionsWindow HAS VALUE');
      const redirections = loginRedirectionsWindow.split('-');
      if (redirections.length === 3) {
        const duration = parseInt(redirections[2]) - parseInt(redirections[0]);
        if (duration < 20000) {
          console.log('Possible infinite login redirections detected');
          allowRedirection = false;
        }
        redirections.splice(0, 1);
      }
      redirections.push(Date.now().toString());
      loginRedirectionsWindow = redirections.join('-');
      console.log('redirections', redirections);
    } else {
      loginRedirectionsWindow = Date.now().toString();
    }

    CookieUtil.set('lrw', loginRedirectionsWindow);
    return allowRedirection;
  }

}
