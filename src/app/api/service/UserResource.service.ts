import { ApiModule } from './../api.module';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/index";
import { ApiClient } from "../apiClient";
import { UserModel } from "../model/UserModel";
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserResourceService {

  constructor(private apiClient: ApiClient) {}

  public findUserById(id: number, businessEntityId: number): Observable<UserModel> {
    return this.apiClient.getRequest<UserModel>(`${environment.userApiBaseUrl}/business-entities/${businessEntityId}/users/${id}`);
  }

}