import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genero } from '../interfaces/genero';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneroService {
  myApi = 'http://localhost:3001/';
  myApp = 'genero';

  constructor(private http: HttpClient) {}

  getGeneros(): Observable<Genero[]> {
    return this.http.get<Genero[]>(`${this.myApi}${this.myApp}`);
  }
}
