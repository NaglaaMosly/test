import { AuthService } from './../auth.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  identifierPattern = "^([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$)|((010|011|012|015)[0-9]{8})$";
  private params: Params;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

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
			window.location.href = this.redirectTo;
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
          	this.router.navigate(['/auth', 'change-password'], {queryParams: this.params});
        } else if (this.redirectTo) {
            window.location.href = this.redirectTo;
        } else {
            this.router.navigateByUrl('/');
            console.log('LOGGED IN - TODO');
        }
      }, error => {

      });
    }
  }

  switchEnvironment() {
    if(this.isTestingEnvironment) {
      window.location.href = environment.liveEnvironmentLoginUrl;
    } else {
      window.location.href = environment.testingEnvironmentLoginUrl;
    }
  }

  checkIfTestingEnvironment() {
    return window.location.host !== environment.liveEnvironmentHost;
  }
}
