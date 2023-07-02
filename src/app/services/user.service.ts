import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = `${API_BASE_URL}/User/usuarios`; 

  constructor(private http: HttpClient) { }

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
  }

  editUserRole(userLogin: string): Observable<User> {
    const url = `${this.baseUrl}/${userLogin}/alterar-permissao`
    return this.http.put<User>(url, {})

  }

  excluir(userLogin: string): Observable<User> {
    const url = `${this.baseUrl}/${userLogin}`
    return this.http.delete<User>(url)
  }

}