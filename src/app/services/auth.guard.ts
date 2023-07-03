import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authService.getUserRole();

    // Verifique se o usuário tem permissão para acessar a rota
    if (this.hasPermissionForRoute(route, userRole)) {
      return true;
    }

    alert('Apenas Administradores');
    return false; // Bloqueia o acesso à rota
  }

  private hasPermissionForRoute(route: ActivatedRouteSnapshot, userRole: string): boolean {
    const requiredRole = route.data['requiredRole'];
    if (requiredRole && requiredRole !== userRole) {
      return false; // O usuário não tem permissão para acessar a rota
    }

    return true; // O usuário tem permissão para acessar a rota
  }
}
