import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.formulario.valid) {
      console.log('Formulário válido');
      this.router.navigate(['/homepage'])
    } else {
      console.log('Formulário inválido');
      this.formulario.get('email')?.markAsTouched();
      this.formulario.get('password')?.markAsTouched();
    }
  }

}
