import { UserLoginViewModel } from './../models/userLoginViewModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterViewModel } from '../models/userRegisterViewModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  // Ajustar o any
  public register(user: UserRegisterViewModel): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7237/User/cadastro',
      user);
  }


  public login(user: UserLoginViewModel): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7237/User/login',
      user);
  }
}
