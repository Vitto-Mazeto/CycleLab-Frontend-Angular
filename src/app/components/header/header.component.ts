import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica se a rota atual é a de login / cadastro
        this.isLoggedIn = (event.url !== '/login' && event.url !== '/register');
      }
    });
  }

  logout(): void {
    // Remover token do localStorage
    localStorage.removeItem('token');
    // Redirecionar para a página de login
    this.router.navigate(['/login']);
  }
}
