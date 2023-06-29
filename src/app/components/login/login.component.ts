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

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      senha: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.formulario.valid) {
      this.userLogin.email = this.formulario.get('email')?.value;
      this.userLogin.senha = this.formulario.get('senha')?.value;
      this.authService.login(this.userLogin).subscribe((response) => {
        if (response.sucesso && response.token) {
          const token = response.token;

          localStorage.setItem('token', token);
          console.log('authToken:', token);

          // Restante do código após obter o token
          //this.router.navigate(['/homepage']);
      }
    });
    } else {
      console.log('Formulário inválido');
      this.formulario.get('email')?.markAsTouched();
      this.formulario.get('password')?.markAsTouched();
    }
  }

}
