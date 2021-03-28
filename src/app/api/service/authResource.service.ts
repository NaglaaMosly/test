import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../apiClient';
import { CustomHttpUrlEncodingCodec } from '../encoder';
import { ApplicationModel } from '../model/applicationModel';
import { ChangePasswordRequest } from '../model/changePasswordRequest';
import { LoginRequest } from '../model/loginRequest';
import { LoginResponse } from '../model/loginResponse';
import { ResetPasswordRequest } from '../model/resetPasswordRequest';
import { ResponseEntity } from '../model/responseEntity';
import { VerifyForgetPasswordRequest } from '../model/VerifyForgetPasswordRequest';
import { environment } from '../../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class AuthResourceService {

    constructor(private apiClient: ApiClient) {}

    public changePassword(changePasswordRequest: ChangePasswordRequest): Observable<ResponseEntity> {
      return this.apiClient.putRequest<ResponseEntity>(`${environment.userApiBaseUrl}/auth/password/change`, changePasswordRequest);
    }

    public forgetPassword(mobileNumber: string): Observable<ResponseEntity> {
      return this.apiClient.postRequest<ResponseEntity>(`${environment.userApiBaseUrl}/auth/password/forget`, mobileNumber);
    }

    public login(loginRequest: LoginRequest): Observable<LoginResponse> {
      return this.apiClient.postRequest<LoginResponse>(`${environment.userApiBaseUrl}/auth/login`, loginRequest);
    }

    public refreshToken(token: string): Observable<object> {
      const params = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()})
         .set('token', token);

      return this.apiClient.postRequest(`${environment.userApiBaseUrl}/auth/token/refresh`, null, params);
    }

    public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<ResponseEntity> {
      return this.apiClient.postRequest<ResponseEntity>(`${environment.userApiBaseUrl}/auth/password/reset`, resetPasswordRequest);
    }

    public verifyResetPassword(verifyForgetPasswordRequest: VerifyForgetPasswordRequest): Observable<ResponseEntity> {
      return this.apiClient.postRequest<ResponseEntity>(`${environment.userApiBaseUrl}/auth/password/reset/verify`,
        verifyForgetPasswordRequest);
    }

    public findAccessibleApplications(): Observable<ApplicationModel[]> {
      return this.apiClient.getRequest<ApplicationModel[]>(`${environment.userApiBaseUrl}/auth/applications`);
    }

}
