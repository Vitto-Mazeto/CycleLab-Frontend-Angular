import { UserLoginViewModel } from './../../models/userLoginViewModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin = new UserLoginViewModel();
  formulario!: FormGroup;
  invalidAccount = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      senha: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.isFormValid()) {
      this.setUserLoginData();
      this.authService.login(this.userLogin).subscribe({
        next: (response) => {
          this.handleLoginResponse(response);
        },
        error: (error) => {
          this.handleLoginError(error);
        }
      });
    } else {
      console.log('Formulário inválido');
      this.formulario.markAllAsTouched();
    }
  }

  isFormValid(): boolean {
    return this.formulario.valid;
  }

  setUserLoginData(): void {
    this.userLogin.email = this.formulario.get('email')?.value;
    this.userLogin.senha = this.formulario.get('senha')?.value;
  }

  handleLoginResponse(response: any): void {
    if (response.sucesso && response.token) {
      const token = response.token;
      localStorage.setItem('token', token);
      this.router.navigate(['/homepage']);
    } else {
      console.log('Usuário ou senha inválidos');
      this.setInvalidAccountError();
    }
  }

  handleLoginError(error: any): void {
    if (error.status === 401) {
      this.setInvalidAccountError();
    } else {
      console.error('Ocorreu um erro durante a solicitação de login:', error);
    }
  }

  setInvalidAccountError(): void {
    this.formulario.get('senha')?.setErrors({ invalidAccount: true });
  }
}
