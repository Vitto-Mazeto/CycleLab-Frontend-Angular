import { Component, OnInit } from '@angular/core';
import { AmostraService } from '../../services/amostra.service';
import { Amostra } from '../../models/amostra';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amostras',
  templateUrl: './amostras.component.html',
  styleUrls: ['./amostras.component.css']
})
export class AmostrasComponent implements OnInit {
  listaAmostras: Amostra[] = [];

  constructor(private service: AmostraService, private router: Router) { }

  ngOnInit(): void {
    this.service.list().subscribe((listaAmostras) => {
      this.listaAmostras = listaAmostras;
    });
  }

  // editAmostra(amostra: Amostra): void {
  //   
  //   });
  // }

  deleteAmostra(amostra: Amostra): void {
    this.service.deleteAmostra(amostra.id!).subscribe((response) => {
      console.log(response);
      window.location.reload();
    });
  }

  // adicionarAmostra(): void {
  //   // Lógica para adicionar uma nova amostra
  // }
}
