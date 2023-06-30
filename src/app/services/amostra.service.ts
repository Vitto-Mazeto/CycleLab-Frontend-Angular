import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Amostra } from '../models/amostra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmostraService {
  private readonly API = 'https://localhost:7237/Amostra';

  constructor(private http: HttpClient) { }

  list(): Observable<Amostra[]> {
    return this.http.get<Amostra[]>(this.API);
  }

  addAmostra(amostra: Amostra): Observable<Amostra> {
    return this.http.post<Amostra>(this.API, amostra); // Fazer lógica para adicionar a amostra
  }

  editAmostra(amostra: Amostra): Observable<Amostra> {
    const url = `${this.API}/${amostra.id}`; // Fazer lógica para editar a amostra
    return this.http.put<Amostra>(url, amostra);
  }

  deleteAmostra(amostraId: number): Observable<Amostra> {
    const url = `${this.API}/${amostraId}`; // Fazer lógica para excluir a amostra
    return this.http.delete<Amostra>(url);
  }

  getAmostra(amostraId: number): Observable<Amostra> {
    const url = `${this.API}/${amostraId}`;
    return this.http.get<Amostra>(url);
  }

}
