import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Amostra } from '../models/amostra';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AmostraService {
  private readonly baseUrl = `${API_BASE_URL}/Amostra`;

  constructor(private http: HttpClient) { }

  list(): Observable<Amostra[]> {
    return this.http.get<Amostra[]>(this.baseUrl);
  }

  addAmostra(amostra: Amostra): Observable<Amostra> {
    return this.http.post<Amostra>(this.baseUrl, amostra);
  }

  editAmostra(amostra: Amostra): Observable<Amostra> {
    const url = `${this.baseUrl}/${amostra.id}`;
    return this.http.put<Amostra>(url, amostra);
  }

  deleteAmostra(amostraId: number): Observable<Amostra> {
    const url = `${this.baseUrl}/${amostraId}`;
    return this.http.delete<Amostra>(url);
  }

  getAmostra(amostraId: number): Observable<Amostra> {
    const url = `${this.baseUrl}/${amostraId}`;
    return this.http.get<Amostra>(url);
  }

}
