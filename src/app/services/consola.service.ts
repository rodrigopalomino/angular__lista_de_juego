import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consola } from '../interfaces/consola';

@Injectable({
  providedIn: 'root',
})
export class ConsolaService {
  myApi = 'http://localhost:3001/';
  myApp = 'consola';
  constructor(private http: HttpClient) {}

  getConsolas(): Observable<Consola[]> {
    return this.http.get<Consola[]>(`${this.myApi}${this.myApp}`);
  }
}
