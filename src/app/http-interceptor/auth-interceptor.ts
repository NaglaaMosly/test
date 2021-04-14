import { NotificationService } from '../shared/notification.service';
import { Constants } from '../shared/constants';
import { AuthService } from '../auth/auth.service';
import {Injectable, Injector} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";


import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private notificationService: NotificationService, private injector: Injector) {

  }

  addAuthToken(req: HttpRequest<any>) {
    const token = this.authService.getToken() || sessionStorage.getItem('temp_token');   
    return req.clone({setHeaders: {Authorization: "Bearer " + token}});
    // temp token is token with minimal calims just to allow user to change password
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(this.addAuthToken(req))
      .pipe(catchError((error) => this.handelError(error, req, next)));
  }

  handelError(error, req, next) {
    const translateService = this.injector.get(TranslateService);
    const currentLang = translateService.currentLang;

    if (error.error && error.error.errorCode === Constants.TOKEN_EXPIRED) {
      return this.refreshToken(req, next);
    }

    if (error.error && error.error.errorCode === Constants.INVALID_REFRESH_TOKEN) {
      this.authService.logout();
    }

    switch (true) {
      case error.error != null && error.error.messageEn != null:
        this.notificationService.notifyError(currentLang === 'en' ? error.error.messageEn : error.error.messageAr);
        break;
      case !navigator.onLine :
        this.notificationService.notifyError(currentLang === 'en' ? 'No internet, check you internet connection' : 'لا يوجد إتصال بالإنترنت, تحقق من الإتصال');
        break;
      case error.status === 0 :
        this.notificationService.notifyError(currentLang === 'en' ? 'server currently unavailable' : 'الخادم غير متوفر حالياً');
        break;
      default :
        this.notificationService
          .notifyError(currentLang === 'en' ?
            "General error, please contact us on myFawry@fawry.com or by calling 16421" :
            "خطأ عام, برجاء التواصل معنا من خلال myFawry@fawry.com أو بالإتصال على 16421");
    }
    return throwError(error);
  }

  refreshToken(req, next) {
    return this.authService.refreshToken()
      .pipe(switchMap((r) => {
          this.authService.changeToken(r.token);
          return next.handle(this.addAuthToken(req))
            .pipe(catchError((error) => this.handelError(error, req, next)));
        })
      );
  }

}
