import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
// const API_BASE_URL = 'https://riza-bakery.my.id/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${API_BASE_URL}/${endpoint}`, { headers: this.getHeaders() });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${API_BASE_URL}/${endpoint}`, body, { headers: this.getHeaders() });
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${API_BASE_URL}/${endpoint}`, body, { headers: this.getHeaders() });
  }

}
