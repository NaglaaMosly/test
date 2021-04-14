import { ApiModule } from './../api.module';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { ApiClient } from "../apiClient";
import { CustomHttpUrlEncodingCodec } from '../encoder';
import { ApplicationModel } from '../model/applicationModel';
import { ChangePasswordRequest } from '../model/changePasswordRequest';
import { LoginRequest } from '../model/loginRequest';
import { LoginResponse } from '../model/loginResponse';
import { ResetPasswordRequest } from '../model/resetPasswordRequest';
import { ResponseEntity } from '../model/responseEntity';
import { VerifyForgetPasswordRequest } from "../model/VerifyForgetPasswordRequest";
import { environment } from './../../../environments/environment';




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

    public refreshToken(refreshToken: string): Observable<LoginResponse> {
      return this.apiClient.postRequest(`${environment.userApiBaseUrl}/auth/token/refresh`, refreshToken, null);
    }

    public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<ResponseEntity> {
      return this.apiClient.postRequest<ResponseEntity>(`${environment.userApiBaseUrl}/auth/password/reset`, resetPasswordRequest);
    }

    public verifyResetPassword(verifyForgetPasswordRequest: VerifyForgetPasswordRequest): Observable<ResponseEntity> {
      return this.apiClient.postRequest<ResponseEntity>(`${environment.userApiBaseUrl}/auth/password/reset/verify`, verifyForgetPasswordRequest);
    }

    public findApplicationsByCodes(codes: string[]): Observable<ApplicationModel[]> {
      let params = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
      codes.forEach(code => {
        params = params.append('code', code);
      })
      return this.apiClient.getRequest<ApplicationModel[]>(`${environment.userApiBaseUrl}/applications`, params);
    }

}