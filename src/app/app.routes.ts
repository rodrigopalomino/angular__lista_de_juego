import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AgregarJuegoComponent } from './components/agregar-juego/agregar-juego.component';
import { PageJuegoComponent } from './components/page-juego/page-juego.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'newJuego',
    component: AgregarJuegoComponent,
  },
  {
    path: 'search/:nombre',
    component: HomeComponent,
  },
  {
    path: ':nombre',
    component: PageJuegoComponent,
  },
];
