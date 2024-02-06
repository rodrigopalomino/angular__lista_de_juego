import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { JuegoService } from '../../../../services/juego.service';
import { Juego } from '../../../../interfaces/juego';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.css',
})
export class JuegosComponent implements OnInit, OnChanges {
  @Input() pagina!: number;
  @Input() generos!: string;
  @Input() consolas!: string;
  @Input() nombre!: string;
  juegos!: Juego[];

  constructor(private _juegoServices: JuegoService, private router: Router) {}

  ngOnInit(): void {
    if (this.nombre !== undefined) {
      this.searchJuegos();
    } else {
      this.getJuegos();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pagina'] || changes['generos'] || changes['consolas']) {
      this.getJuegos();
    }
    if (changes['nombre']) {
      this.searchJuegos();
    }
  }

  getJuegos() {
    this._juegoServices
      .getJuegos(
        (this.pagina - 1) * 8,
        this.pagina * 8,
        this.generos,
        this.consolas
      )
      .subscribe((data) => {
        this.juegos = data;
      });
  }

  searchJuegos() {
    this._juegoServices
      .searchJuego(this.nombre, (this.pagina - 1) * 8, this.pagina * 8)
      .subscribe((data) => {
        this.juegos = data;
      });
  }

  siguiente() {
    this.router.navigate(
      [this.nombre === undefined ? '' : `search/${this.nombre}`],
      { queryParams: { p: Number(this.pagina) + 1 } }
    );
  }

  anterior() {
    this.router.navigate(
      [this.nombre === undefined ? '' : `search/${this.nombre}`],
      { queryParams: { p: Number(this.pagina) - 1 } }
    );
  }

  click(nombre: string) {
    this.router.navigate([`${nombre}`]);
  }
}
