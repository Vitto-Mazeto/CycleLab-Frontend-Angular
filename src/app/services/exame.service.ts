import { Exame } from './../models/exame';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExameService {
  private readonly API = 'https://localhost:7237/Exame';

  constructor(private http: HttpClient) { }

  list(amostraId: number): Observable<Exame[]> {
    return this.http.get<Exame[]>(`https://localhost:7237/Amostra/${amostraId}/exames`);
  }

  addExame(exame: Exame): Observable<Exame> {
    return this.http.post<Exame>(this.API, exame); // Lógica para adicionar o exame
  }

  deleteExame(exameId: number): Observable<Exame> {
    const url = `${this.API}/${exameId}`; // Lógica para excluir o exame
    return this.http.delete<Exame>(url);
  }
}
