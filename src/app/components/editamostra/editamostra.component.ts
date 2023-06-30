import { Amostra } from './../../models/amostra';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AmostraService } from 'src/app/services/amostra.service';

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

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: AmostraService) { }

    ngOnInit(): void {
      const amostraId = this.activatedRoute.snapshot.paramMap.get('id');
      if (amostraId) {
        const amostraIdNumber = parseInt(amostraId, 10); // Converter para número inteiro
        this.service.getAmostra(amostraIdNumber).subscribe((amostra) => {
          this.amostra = amostra;
          console.log(this.amostra);
          console.log(this.amostra.nome);
          this.formulario = this.formBuilder.group({
            nome: [this.amostra.nome, Validators.required],
            numeroDeRegistro: [this.amostra.numeroDeRegistro, Validators.required]
          });
        });
      } else {
        this.formulario = this.formBuilder.group({
          nome: ['', Validators.required],
          numeroDeRegistro: ['', Validators.required]
        });
      }
    }
    

  submitForm(): void {
    if (this.formulario.valid) {
      this.amostra.nome = this.formulario.get('nome')?.value;
      this.amostra.numeroDeRegistro = this.formulario.get('numeroDeRegistro')?.value;
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
