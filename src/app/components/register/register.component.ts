import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      senha: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$')
      ])],
      isAdmin: new FormControl(false), // Adiciona a propriedade isAdmin com o valor inicial como falso
      senhaConfirmacao: ['', Validators.required]
    }, { validator: this.confirmaSenhaValidator });
  }

  confirmaSenhaValidator(group: FormGroup): any {
    const senha = group.get('senha')?.value;
    const confirmaSenha = group.get('senhaConfirmacao')?.value;

    if (senha === confirmaSenha) {
      group.get('senhaConfirmacao')?.setErrors(null);
    } else {
      group.get('senhaConfirmacao')?.setErrors({ senhaMismatch: true });
    }

    return null;
  }

  submitForm(): void {
    if (this.formulario.valid) {
      this.userRegister.email = this.formulario.get('email')?.value;
      this.userRegister.senha = this.formulario.get('senha')?.value;
      this.userRegister.senhaConfirmacao = this.formulario.get('senhaConfirmacao')?.value;
      this.userRegister.isAdmin = this.formulario.get('isAdmin')?.value;
  
      this.authService.register(this.userRegister).subscribe((response) => { 
        if (response.sucesso) {
          let userLogin = new UserLoginViewModel();
          userLogin.email = this.userRegister.email;
          userLogin.senha = this.userRegister.senha;
          this.authService.login(userLogin).subscribe((response) => {
            if (response.sucesso && response.token) {
              const token = response.token;
  
              localStorage.setItem('token', token);
  
              this.router.navigate(['/homepage']);
            }
          });
        }
      });
    } else {
      this.formulario.get('email')?.markAsTouched();
      this.formulario.get('senha')?.markAsTouched();
      this.formulario.get('senhaConfirmacao')?.markAsTouched();
    }
  }
}
