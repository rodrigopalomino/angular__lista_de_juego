import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AgregarJuegoComponent } from './components/agregar-juego/agregar-juego.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'newJuego',
    component: AgregarJuegoComponent,
  },
];
