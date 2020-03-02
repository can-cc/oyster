import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { User } from '../../typing/auth';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;

  constructor(
    fb: FormBuilder,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = fb.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {}

  handleLogin(): void {
    this.httpClient
      .post('/api/login', this.form.value, { observe: 'response' })
      .pipe()
      .subscribe(
        response => {
          this.router.navigate(['/tag'], { replaceUrl: false });
          this.authService.handleLoginSuccess(
            response.body as User,
            response.headers.get('Authorization')
          );
        },
        () => {
          this.snackBar.open('Username or password incorrectly Please retry', null, {
            duration: 2000,
            verticalPosition: 'top'
          });
        }
      );
  }
}
