import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

declare  var $: any;
@Injectable({
  providedIn: 'root'
})
export class ApiClient {
  @BlockUI() static blockUI: NgBlockUI;

  constructor(private httpClient: HttpClient) {}

  postRequest<T>(url: string, data?: any, params?: HttpParams): Observable<T> {
    ApiClient.blockUI.start();
    return this.httpClient.post<T>(url, data, {
      params: params,
      withCredentials: false
    }).pipe(
      tap(() =>  ApiClient.blockUI.stop()),
      catchError((error) => {
        ApiClient.blockUI.stop();
        return throwError(error.error);
      })
    );
  }

  putRequest<T>(url: string, data?: any, params?: HttpParams): Observable<T> {
    ApiClient.blockUI.start();
    return this.httpClient.put<T>(url, data, {
      params: params
    }).pipe(
      tap(() =>  ApiClient.blockUI.stop()),
      catchError((error) => {
        ApiClient.blockUI.stop();
        return throwError(error.error);
      })
    );
  }

  getRequest<T>(url: string, params?: HttpParams) {
    ApiClient.blockUI.start();
    return this.httpClient.get<T>(url, {
      params: params
    }).pipe(
      tap(() =>  ApiClient.blockUI.stop()),
      catchError((error) => {
        ApiClient.blockUI.stop();
        return throwError(error.error);
      })
    );
  }
}

