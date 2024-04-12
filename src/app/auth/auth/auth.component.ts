import { Component, Injectable, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthFacade } from '../facade/auth.facade';
import { UserService } from '../../../shared/services';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  providers: [UserService, AuthFacade],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public hidePassword = true;
  public hidePasswordRegister = true;
  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  public showPassword(): void {
    this.hidePassword
      ? (this.hidePassword = false)
      : (this.hidePassword = true);
  }

  public onLogin() {
    if (this.loginForm.valid) {
      this.authFacade.login(this.loginForm.value);
      this.loginForm.reset();
    }
  }

  public onRegister() {
    if (this.registerForm.valid) {
      this.authFacade.createUser(this.registerForm.value);
      this.loginForm.reset();
    }
  }
}
