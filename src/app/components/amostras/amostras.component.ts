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
    this.loadAmostras();
  }

  loadAmostras(): void {
    this.service.list().subscribe((listaAmostras: Amostra[]) => {
      this.listaAmostras = listaAmostras;
    });
  }

  deleteAmostra(amostra: Amostra): void {
    if (amostra.id) {
      this.service.deleteAmostra(amostra.id).subscribe((response) => {
        console.log(response);
        this.loadAmostras();
      });
    } else {
      console.log('Não foi possível excluir a amostra');
    }
  }

  redirectToPage(id: number): void {
    this.router.navigate(['/viewamostra', id]);
  }
  
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
