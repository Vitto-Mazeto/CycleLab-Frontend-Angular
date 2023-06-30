import { Amostra } from './../../models/amostra';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AmostraService } from 'src/app/services/amostra.service';

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

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private service: AmostraService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      numeroDeRegistro: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.formulario.valid) {
      this.amostra.nome = this.formulario.get('nome')?.value;
      this.amostra.numeroDeRegistro = this.formulario.get('numeroDeRegistro')?.value;
      this.service.addAmostra(this.amostra).subscribe({
        next: (response) => {
          // Lógica a ser executada quando a amostra for adicionada com sucesso
          console.log('Amostra adicionada com sucesso!');
          this.router.navigate(['/amostras']); // Redireciona para a página de amostras
        },
        error: (error) => {
          // Lógica a ser executada em caso de erro
          console.error('Erro ao adicionar amostra:', error);
        }
      });
    } else {
      console.log('Formulário inválido');
      this.formulario.markAllAsTouched(); // Marca todos os campos como tocados para exibir os erros de validação
    }
  }
}
