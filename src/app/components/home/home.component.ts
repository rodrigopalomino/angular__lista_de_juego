import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FiltrosComponent } from './pages/filtros/filtros.component';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FiltrosComponent, JuegosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  pagina: number = 1;
  generos: string = '';
  consolas: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.pagina = params['p'] || 1;
      this.generos = params['generos'] || '';
      this.consolas = params['consolas'] || '';
    });
  }
}
