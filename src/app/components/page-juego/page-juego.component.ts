import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { ActivatedRoute } from '@angular/router';
import { Juego } from '../../interfaces/juego';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-page-juego',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './page-juego.component.html',
  styleUrl: './page-juego.component.css',
})
export class PageJuegoComponent implements OnInit {
  juego!: Juego;

  constructor(
    private _juegoServices: JuegoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getJuego();
  }

  getJuego() {
    this.route.params.subscribe((params) => {
      this._juegoServices.getJuego(params['nombre']).subscribe((data) => {
        this.juego = data;
      });
    });
  }
}
