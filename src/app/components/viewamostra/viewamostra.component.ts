import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Exame } from 'src/app/models/exame';
import { ActivatedRoute } from '@angular/router';
import { ExameService } from 'src/app/services/exame.service';

@Component({
  selector: 'app-viewamostra',
  templateUrl: './viewamostra.component.html',
  styleUrls: ['./viewamostra.component.css']
})
export class ViewamostraComponent implements OnInit {
  exame: Exame = {
    nome: '',
    resultado: '',
    amostraId: 0
  };
  formulario!: FormGroup;

  listaExames: Exame[] = [];

  constructor(private service: ExameService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const amostraId: number = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.exame.amostraId = amostraId;
    this.service.list(amostraId).subscribe((listaExames) => {
      this.listaExames = listaExames
    })

    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      resultadoDoExame: ['', Validators.required]
    });
  }
  
  deleteExame(exame: Exame): void {
    this.service.deleteExame(exame.id!).subscribe((exame) => {
      window.location.reload();
    });
  }

  submitForm(): void {
    if (this.formulario.valid) {
      this.exame.nome = this.formulario.get('nome')?.value;
      this.exame.resultado = this.formulario.get('resultadoDoExame')?.value;
      this.service.addExame(this.exame).subscribe({
        next: (response) => {
          // Lógica a ser executada quando a exame for adicionada com sucesso
          console.log('exame adicionada com sucesso!');
        },
        error: (error) => {
          // Lógica a ser executada em caso de erro
          console.error('Erro ao adicionar exame:', error);
        }
      });
    } else {
      console.log('Formulário inválido');
      this.formulario.markAllAsTouched(); // Marca todos os campos como tocados para exibir os erros de validação
    }
  }

}
