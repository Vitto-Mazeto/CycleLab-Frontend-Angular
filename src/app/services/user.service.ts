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

  editUserRole(user: User): Observable<User> { //Fazer lógica de mudar o role do usuário
    const url = `${this.API}/${user.id}`
    return this.http.put<User>(url, user )

  }

  excluir(id: number): Observable<User> { // Fazer lógica de excluir o usuário
    const url = `${this.API}/${id}`
    return this.http.delete<User>(url)
  }

}