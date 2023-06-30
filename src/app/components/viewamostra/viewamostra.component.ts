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
    this.loadExames(amostraId);

    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      resultadoDoExame: ['', Validators.required]
    });
  }

  loadExames(amostraId: number): void {
    this.service.list(amostraId).subscribe((listaExames) => {
      this.listaExames = listaExames;
    });
  }
  
  deleteExame(exame: Exame): void {
    this.service.deleteExame(exame.id!).subscribe((exame) => {
      this.loadExames(this.exame.amostraId);
    });
  }

  submitForm(): void {
    if (this.formulario.valid) {
      this.exame.nome = this.formulario.get('nome')?.value;
      this.exame.resultado = this.formulario.get('resultadoDoExame')?.value;
      this.service.addExame(this.exame).subscribe({
        next: (response) => {
          console.log('Exame adicionado com sucesso!');
          this.loadExames(this.exame.amostraId);
        },
        error: (error) => {
          console.error('Erro ao adicionar exame:', error);
        }
      });
    } else {
      console.log('Formulário inválido');
      this.formulario.markAllAsTouched();
    }
  }

}
