import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FiltrosComponent } from './pages/filtros/filtros.component';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FiltrosComponent,
    JuegosComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  pagina: number = 1;
  generos: string = '';
  consolas: string = '';
  nombre: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.route.queryParams.subscribe((params) => {
      this.pagina = params['p'] || 1;
      this.generos = params['generos'] || '';
      this.consolas = params['consolas'] || '';
    });

    this.route.params.subscribe((params) => {
      this.nombre = params['nombre'];
    });
  }

  createForm() {
    this.form = this.fb.group({
      nombre: [''],
    });
  }

  submit() {
    this.router.navigate(['/search', this.form.get('nombre')?.value], {
      queryParams: { p: 1 },
    });
  }
}
