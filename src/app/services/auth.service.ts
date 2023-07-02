import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config';

import { UserLoginViewModel } from './../models/userLoginViewModel';
import { UserRegisterViewModel } from '../models/userRegisterViewModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${API_BASE_URL}/User`;

  constructor(private http: HttpClient) { }

  public register(user: UserRegisterViewModel): Observable<any> {
    const url = `${this.baseUrl}/cadastro`;
    return this.http.post<any>(url, user);
  }

  public login(user: UserLoginViewModel): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<any>(url, user);
  }
}
