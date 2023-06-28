import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$')
      ])],
      password_confirmation: ['', Validators.required]
    }, { validator: this.confirmaSenhaValidator });
  }

  confirmaSenhaValidator(group: FormGroup): any {
    const senha = group.get('password')?.value;
    const confirmaSenha = group.get('password_confirmation')?.value;

    if (senha === confirmaSenha) {
      group.get('password_confirmation')?.setErrors(null);
    } else {
      group.get('password_confirmation')?.setErrors({ passwordMismatch: true });
    }

    return null;
  }

  submitForm(): void {
    if (this.formulario.valid) {
      console.log('Formulário válido');
    }
  }
}
