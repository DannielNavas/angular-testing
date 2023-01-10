import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MyValidators } from './../../../utils/validators';

import { Router } from '@angular/router';
import { CreateUserDTO } from 'src/app/models/user.model';
import { UsersService } from './../../../service/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass'],
})

// TODO: se agrega primero el valor segundo en un array los validadores sincronos y tercero los asincronos en array
export class RegisterFormComponent {
  form = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email],
        [MyValidators.validateEmailAsync(this.usersService)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          MyValidators.validPassword,
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      checkTerms: [false, [Validators.requiredTrue]],
    },
    {
      validators: MyValidators.matchPasswords,
    }
  );

  status: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {}

  register(event: Event) {
    // TODO: buena practica para evitar que el formulario se envie
    event.preventDefault();
    if (this.form.valid) {
      this.status = 'loading';
      const value: Partial<CreateUserDTO> = {
        email: this.form.controls.email.value
          ? this.form.controls.email.value
          : '',
        password: this.form.controls.password.value
          ? this.form.controls.password.value
          : '',
        name: this.form.controls.name.value
          ? this.form.controls.name.value
          : '',
      };
      this.usersService.create(value).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigateByUrl('/auth/login');
        },
        error: () => {
          this.status = 'error';
        },
      });
    } else {
      // TODO: marcar todos los campos como tocados para que se muestren los errores
      this.form.markAllAsTouched();
    }
  }

  get nameField() {
    return this.form.get('name');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  get checkTermsField() {
    return this.form.get('checkTerms');
  }
}
