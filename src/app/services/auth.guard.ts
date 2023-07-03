import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Verifico se a rota tem alguma informação de role para o acesso
  if (route.data) {
    const userRole = authService.getUserRole();
    const requiredRole = route.data['requiredRole']
    if (requiredRole && requiredRole !== userRole) {
      alert('Você não tem permissão para acessar essa página');
      router.navigate(['/homepage']);
      return false;
    }
  }

  return true;
};
