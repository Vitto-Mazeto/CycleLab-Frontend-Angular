import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserRegisterViewModel } from 'src/app/models/userRegisterViewModel';
import { UserLoginViewModel } from 'src/app/models/userLoginViewModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRegister = new UserRegisterViewModel();
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formulario = this.formBuilder.group(
      {
        email: ['', Validators.compose([Validators.required, Validators.email])],
        senha: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$')])],
        isAdmin: [false],
        senhaConfirmacao: ['', Validators.required]
      },
      { validators: this.confirmaSenhaValidator }
    );
  }
  
  confirmaSenhaValidator(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirmaSenha = group.get('senhaConfirmacao')?.value;
  
    if (senha === confirmaSenha) {
      group.get('senhaConfirmacao')?.setErrors(null);
      return null; // retorna null quando a validação é satisfeita
    } else {
      group.get('senhaConfirmacao')?.setErrors({ senhaMismatch: true });
      return { senhaMismatch: true };
    }
  }

  submitForm(): void {
    if (this.isFormValid()) {
      this.setUserRegisterData();
      this.authService.register(this.userRegister).subscribe((response) => {
        this.handleRegisterResponse(response);
      });
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  isFormValid(): boolean {
    return this.formulario.valid;
  }

  setUserRegisterData(): void {
    this.userRegister.email = this.formulario.get('email')?.value;
    this.userRegister.senha = this.formulario.get('senha')?.value;
    this.userRegister.senhaConfirmacao = this.formulario.get('senhaConfirmacao')?.value;
    this.userRegister.isAdmin = this.formulario.get('isAdmin')?.value;
  }

  // Caso de certo o cadastro, o login já é feito automaticamente, guardando o token no local storage
  handleRegisterResponse(response: any): void {
    if (response.sucesso) {
      const userLogin = new UserLoginViewModel();
      userLogin.email = this.userRegister.email;
      userLogin.senha = this.userRegister.senha;

      this.authService.login(userLogin).subscribe((response) => {
        this.handleLoginResponse(response);
      });
    }
  }

  handleLoginResponse(response: any): void {
    if (response.sucesso && response.token) {
      const token = response.token;
      localStorage.setItem('token', token);
      this.router.navigate(['/homepage']);
    }
  }
}
