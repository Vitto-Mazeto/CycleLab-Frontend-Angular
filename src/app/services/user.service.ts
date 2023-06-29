import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = 'https://localhost:7237/User/usuarios' 

  constructor(private http: HttpClient) { }

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.API)
  }

  editUserRole(userLogin: string): Observable<User> { //Fazer lógica de mudar o role do usuário
    const url = `${this.API}/${userLogin}/alterar-permissao`
    return this.http.put<User>(url, {})

  }

  excluir(userLogin: string): Observable<User> { // Fazer lógica de excluir o usuário
    const url = `${this.API}/${userLogin}`
    return this.http.delete<User>(url)
  }

}