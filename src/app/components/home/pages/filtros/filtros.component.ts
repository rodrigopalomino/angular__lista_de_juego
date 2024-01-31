import { Component, OnInit } from '@angular/core';
import { GeneroService } from '../../../../services/genero.service';
import { ConsolaService } from '../../../../services/consola.service';
import { Genero } from '../../../../interfaces/genero';
import { Consola } from '../../../../interfaces/consola';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css',
})
export class FiltrosComponent implements OnInit {
  generos!: Genero[];
  consolas!: Consola[];

  constructor(
    private _generoServices: GeneroService,
    private _consolaServices: ConsolaService
  ) {}

  ngOnInit(): void {
    this.getConsolas();
    this.getGeneros;
  }

  getConsolas() {
    this._consolaServices.getConsolas().subscribe((data) => {
      this.consolas = data;
    });
  }

  getGeneros() {
    this._generoServices.getGeneros().subscribe((data) => {
      this.generos = data;
    });
  }
}
