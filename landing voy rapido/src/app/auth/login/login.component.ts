import { AlertService } from '../../shared/services/alert.service';
import { AuthService } from './../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../shared/scss/auth.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.isLoading = true;
      const { value } = this.formLogin;
      this.authService.login(value).subscribe(this.success, this.error);
    }
  }

  private success = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'success' });
  };
  private error = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'error' });
    this.isLoading = false;
  };

  verificarInput(value: string) {
    return (
      this.formLogin.get(value)?.invalid &&
      (this.formLogin.get(value)?.dirty || this.formLogin.get(value)?.touched)
    );
  }
}
