import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AmostraService } from 'src/app/services/amostra.service';
import { Amostra } from './../../models/amostra';

@Component({
  selector: 'app-editamostra',
  templateUrl: './editamostra.component.html',
  styleUrls: ['./editamostra.component.css']
})
export class EditamostraComponent implements OnInit {
  amostra: Amostra = {
    nome: '',
    numeroDeRegistro: 0,
    exames: []
  };
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: AmostraService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    const amostraId: number = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (amostraId) {
      this.service.getAmostra(amostraId).subscribe(
        (amostra) => {
          this.amostra = amostra;
          this.fillFormWithAmostraData();
        },
        (error) => {
          console.error('Erro ao obter a amostra:', error);
        }
      );
    }
  }

  initializeForm(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      numeroDeRegistro: ['', Validators.required]
    });
  }

  fillFormWithAmostraData(): void {
    this.formulario.patchValue({
      nome: this.amostra.nome,
      numeroDeRegistro: this.amostra.numeroDeRegistro
    });
  }

  submitForm(): void {
    if (this.formulario.valid) {
      const formValues = this.formulario.value;
      this.amostra.nome = formValues.nome;
      this.amostra.numeroDeRegistro = formValues.numeroDeRegistro;
      this.service.editAmostra(this.amostra).subscribe({
        next: (response) => {
          // Lógica a ser executada quando a amostra for adicionada com sucesso
          console.log('Amostra editada com sucesso!');
          this.router.navigate(['/amostras']); // Redireciona para a página de amostras
        },
        error: (error) => {
          // Lógica a ser executada em caso de erro
          console.error('Erro ao editar amostra:', error);
        }
      });
    } else {
      console.log('Formulário inválido');
      this.formulario.markAllAsTouched(); // Marca todos os campos como tocados para exibir os erros de validação
    }
  }
}
