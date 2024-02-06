import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Juego } from '../interfaces/juego';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  myApi = 'http://localhost:3001/';
  myApp = 'juego';

  constructor(private http: HttpClient) {}

  getJuego(nombre: string): Observable<Juego> {
    return this.http.get<Juego>(`${this.myApi}${this.myApp}/${nombre}`);
  }

  getJuegos(
    inicio: number,
    cantidad: number,
    generos: string,
    consolas: string
  ): Observable<Juego[]> {
    return this.http.get<Juego[]>(
      `${this.myApi}${this.myApp}?cantidad=${cantidad}&inicio=${inicio}&generos=${generos}&consolas=${consolas}`
    );
  }

  //http://localhost:3001/juego?cantidad=2&inicio=2

  createJuego(juego: Juego, generos: number[], consolas: number[]) {
    return this.http.post(`${this.myApi}${this.myApp}/create`, {
      juego,
      generos,
      consolas,
    });
  }

  //http://localhost:3001/juego/search/g?inicio=0&cantidad=9

  searchJuego(
    nombre: string,
    inicio: number,
    cantidad: number
  ): Observable<Juego[]> {
    return this.http.get<Juego[]>(
      `${this.myApi}${this.myApp}/search/${nombre}?inicio=${inicio}&cantidad=${cantidad}`
    );
  }
}
