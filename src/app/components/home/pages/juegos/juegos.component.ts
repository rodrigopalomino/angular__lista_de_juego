import { Component, Input, OnInit } from '@angular/core';
import { JuegoService } from '../../../../services/juego.service';
import { Juego } from '../../../../interfaces/juego';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.css',
})
export class JuegosComponent implements OnInit {
  @Input() pagina!: number;
  @Input() generos!: string;
  @Input() consolas!: string;
  juegos!: Juego[];
  inicio: number = 0;
  cantidad: number = 10;

  constructor(private _juegoServices: JuegoService) {}

  ngOnInit(): void {
    this.getJuegos();
    console.log('pagina => ', this.pagina);
    console.log('generos => ', this.generos);
    console.log('consolas => ', this.consolas);
  }

  getJuegos() {
    this._juegoServices
      .getJuegos(this.pagina, this.pagina * 8, this.generos, this.consolas)
      .subscribe((data) => {
        this.juegos = data;
      });
  }
}
