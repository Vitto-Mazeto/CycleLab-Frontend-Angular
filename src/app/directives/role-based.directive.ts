import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appRoleBased]'
})
export class RoleBasedDirective implements OnInit {
  // Com esse input consigo colocar o valor no html da role que eu quero
  @Input('appRoleBased') requiredRole!: string;

  constructor(private elementRef: ElementRef, private authService: AuthService) {}

  ngOnInit() {
    const userRole = this.authService.getUserRole();

    if (userRole !== this.requiredRole) {
      this.elementRef.nativeElement.disabled = true;
      this.elementRef.nativeElement.addEventListener('click', this.showAccessDeniedAlert);
    }
  }

  private showAccessDeniedAlert() {
    alert('Acesso negado! Você não tem permissão para executar esta ação.');
  }
}
