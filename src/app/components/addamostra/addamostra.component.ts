import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AmostraService } from 'src/app/services/amostra.service';
import { Amostra } from './../../models/amostra';

@Component({
  selector: 'app-addamostra',
  templateUrl: './addamostra.component.html',
  styleUrls: ['./addamostra.component.css']
})
export class AddamostraComponent implements OnInit {
  amostra: Amostra = {
    nome: '',
    numeroDeRegistro: 0,
    exames: []
  };
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private amostraService: AmostraService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      numeroDeRegistro: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  submitForm(): void {
    if (this.formulario.valid) {
      this.setAmostraValues();
      this.amostraService.addAmostra(this.amostra).subscribe({
        next: () => {
          this.handleSuccess();
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    } else {
      this.handleInvalidForm();
    }
  }

  setAmostraValues(): void {
    this.amostra.nome = this.formulario.get('nome')?.value;
    this.amostra.numeroDeRegistro = this.formulario.get('numeroDeRegistro')?.value;
  }

  handleSuccess(): void {
    console.log('Amostra adicionada com sucesso!');
    this.router.navigate(['/amostras']);
  }

  handleError(error: any): void {
    console.error('Erro ao adicionar amostra:', error);
  }

  handleInvalidForm(): void {
    console.log('Formulário inválido');
    this.formulario.markAllAsTouched();
  }
}
