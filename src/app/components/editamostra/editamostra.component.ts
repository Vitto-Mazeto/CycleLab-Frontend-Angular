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
    this.loadAmostra();
  }

  initializeForm(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      numeroDeRegistro: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  loadAmostra(): void {
    const amostraId: number = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (amostraId) {
      this.service.getAmostra(amostraId).subscribe({
        next: (amostra) => {
          this.amostra = amostra;
          this.fillFormWithAmostraData();
        },
        error: (error) => {
          console.error('Erro ao obter a amostra:', error);
        }
      });
    }
  }

  fillFormWithAmostraData(): void {
    this.formulario.patchValue({
      nome: this.amostra.nome,
      numeroDeRegistro: this.amostra.numeroDeRegistro
    });
  }

  submitForm(): void {
    if (this.formulario.valid) {
      this.updateAmostraData();
    } else {
      console.log('Formulário inválido');
      this.formulario.markAllAsTouched(); // Marca todos os campos como tocados para exibir os erros de validação
    }
  }

  updateAmostraData(): void {
    const formValues = this.formulario.value;
    this.amostra.nome = formValues.nome;
    this.amostra.numeroDeRegistro = formValues.numeroDeRegistro;
    this.service.editAmostra(this.amostra).subscribe({
      next: (response) => {
        this.handleEditSuccess();
      },
      error: (error) => {
        this.handleEditError(error);
      }
    });
  }

  handleEditSuccess(): void {
    console.log('Amostra editada com sucesso!');
    this.router.navigate(['/amostras']); // Redireciona para a página de amostras
  }

  handleEditError(error: any): void {
    console.log('Erro ao editar amostra:', error);
  }
}
