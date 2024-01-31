import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { GeneroService } from '../../services/genero.service';
import { Genero } from '../../interfaces/genero';
import { Consola } from '../../interfaces/consola';
import { ConsolaService } from '../../services/consola.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { JuegoService } from '../../services/juego.service';
import { Juego } from '../../interfaces/juego';

@Component({
  selector: 'app-agregar-juego',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './agregar-juego.component.html',
  styleUrl: './agregar-juego.component.css',
})
export class AgregarJuegoComponent implements OnInit {
  generos!: Genero[];
  consolas!: Consola[];
  form!: FormGroup;
  listaGeneros: number[] = [];
  listaConsolas: number[] = [];
  boolErrorGenero: boolean = false;
  boolErrorConsola: boolean = false;

  constructor(
    private _juegoServices: JuegoService,
    private _generoServices: GeneroService,
    private _consolaServices: ConsolaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getGeneros();
    this.getConsola();
    this.createForm();
  }
  getGeneros() {
    this._generoServices.getGeneros().subscribe((data) => {
      this.generos = data;
    });
  }

  getConsola() {
    this._consolaServices.getConsolas().subscribe((data) => {
      this.consolas = data;
    });
  }

  createForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.min(3)]],
      imagen: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      desarrolladora: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      generos: this.fb.array([], [this.validationsChecBox()]),
      consolas: this.fb.array([], [this.validationsChecBox()]),
    });
  }

  validationsChecBox(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const lista = control.value as number[];

      if (lista.length === 0) {
        return { s: true };
      }

      return null;
    };
  }

  get nombreValid() {
    const nombre = this.form.get('nombre');

    if (nombre?.touched && nombre.value === '') {
      return 'Este campo es necesario.';
    }

    if (nombre?.touched && nombre.value.length < 3) {
      return 'El nombre debe tener mas de 3 caracteres.';
    }

    return '';
  }

  get imagenValid() {
    const imagen = this.form.get('imagen');

    if (imagen?.touched && imagen.value === '') {
      return 'Este campo es necesario';
    }

    return '';
  }

  get precioValid() {
    const precio = this.form.get('precio');

    if (
      precio?.touched &&
      (isNaN(precio.value) || !/^\d+(\.\d{1,2})?$/.test(precio.value))
    ) {
      return 'El precio debe ser un numero con  2 decimales.';
    }

    return '';
  }

  get desarrolladoraValid() {
    const desarrolladora = this.form.get('desarrolladora');

    if (desarrolladora?.touched && desarrolladora.value === '') {
      return 'Este campo es necesario.';
    }

    if (desarrolladora?.touched && desarrolladora.value.length < 3) {
      return 'El nombre debe tener mas de 3 caracteres.';
    }

    return '';
  }

  get descripcionValid() {
    const descripcion = this.form.get('descripcion');

    if (descripcion?.touched && descripcion.value === '') {
      return 'Este campo es necesario.';
    }

    return '';
  }

  get generosValid() {
    const generos = this.form.get('generos');

    if (generos?.value.length >= 1) {
      this.boolErrorGenero = true;
    }

    if (this.boolErrorGenero === true && !generos?.valid) {
      console.log('Error');

      return 'Debe tener minimo un genero';
    }

    return '';
  }

  get consolasValid() {
    const consolas = this.form.get('consolas');

    if (consolas?.value.length >= 1) {
      this.boolErrorConsola = true;
    }

    if (this.boolErrorConsola === true && !consolas?.valid) {
      console.log('Error');

      return 'Debe tener minimo una consola.';
    }

    return '';
  }

  clickCheckBoxGeneros(genero_id: number) {
    const generosArray = this.form.get('generos') as FormArray;

    if (generosArray.value.includes(genero_id)) {
      generosArray.removeAt(generosArray.value.indexOf(genero_id));
    } else {
      generosArray.push(this.fb.control(genero_id));
    }
  }

  clickCheckBoxConsolas(consola_id: number) {
    const consolasArray = this.form.get('consolas') as FormArray;

    if (consolasArray.value.includes(consola_id)) {
      consolasArray.removeAt(consolasArray.value.indexOf(consola_id));
    } else {
      consolasArray.push(this.fb.control(consola_id));
    }
  }

  submit() {
    console.log('--------------------------');

    //formulario valido

    const juego: Juego = {
      nombre: this.form.get('nombre')?.value,
      imagen: this.form.get('imagen')?.value,
      precio: this.form.get('precio')?.value,
      desarrolladora: this.form.get('desarrolladora')?.value,
      descripcion: this.form.get('descripcion')?.value,
    };

    const generos = this.form.get('generos')?.value;
    const consolas = this.form.get('consolas')?.value;

    this._juegoServices.createJuego(juego, generos, consolas).subscribe({
      next: (res: any) => {
        console.log('juego creado');

        console.log(res);
      },
      error: (e: HttpErrorResponse) => {
        console.log('ha habido un error');
        console.log(e);
      },
    });
  }
}
