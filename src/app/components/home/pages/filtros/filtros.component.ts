import { Component, OnInit } from '@angular/core';
import { GeneroService } from '../../../../services/genero.service';
import { ConsolaService } from '../../../../services/consola.service';
import { Genero } from '../../../../interfaces/genero';
import { Consola } from '../../../../interfaces/consola';
import { NgClass } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css',
})
export class FiltrosComponent implements OnInit {
  generos!: Genero[];
  consolas!: Consola[];
  boolConsola: boolean = false;
  boolGenero: boolean = false;
  form!: FormGroup;

  constructor(
    private _generoServices: GeneroService,
    private _consolaServices: ConsolaService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      generos: this.fb.array([]),
      consolas: this.fb.array([]),
    });
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

  clickCheckBoxGeneros(genero: string) {
    const generosArray = this.form.get('generos') as FormArray;

    if (generosArray.value.includes(genero)) {
      generosArray.removeAt(generosArray.value.indexOf(genero));
    } else {
      generosArray.push(this.fb.control(genero));
    }
    console.log(generosArray.value);
  }

  clickCheckBoxConsolas(consola: string) {
    const consolaArray = this.form.get('consolas') as FormArray;

    if (consolaArray.value.includes(consola)) {
      consolaArray.removeAt(consolaArray.value.indexOf(consola));
    } else {
      consolaArray.push(this.fb.control(consola));
    }
    console.log(consolaArray.value);
  }

  clickConsola() {
    if (this.boolConsola) {
      this.boolConsola = false;
      this.consolas = [];
      return;
    }

    this.boolConsola = true;
    this.getConsolas();
  }

  clickGenero() {
    if (this.boolGenero) {
      this.boolGenero = false;
      this.generos = [];
      return;
    }

    this.boolGenero = true;
    this.getGeneros();
  }

  submit() {
    this.router.navigate([''], {
      queryParams: {
        consolas: this.form.get('consolas')?.value,
        generos: this.form.get('generos')?.value,
        p: 1,
      },
    });
  }
}
