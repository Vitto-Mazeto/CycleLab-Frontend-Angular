import { Exame } from './../models/exame';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ExameService {
  private readonly baseUrl = `${API_BASE_URL}/Exame`;

  constructor(private http: HttpClient) { }

  list(amostraId: number): Observable<Exame[]> {
    return this.http.get<Exame[]>(`https://localhost:7237/Amostra/${amostraId}/exames`);
  }

  addExame(exame: Exame): Observable<Exame> {
    return this.http.post<Exame>(this.baseUrl, exame); 
  }

  deleteExame(exameId: number): Observable<Exame> {
    const url = `${this.baseUrl}/${exameId}`; 
    return this.http.delete<Exame>(url);
  }
}
