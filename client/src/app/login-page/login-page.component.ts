import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;

  constructor(fb: FormBuilder, private httpClient: HttpClient) {
    this.form = fb.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {}

  handleLogin(): void {
    this.httpClient
      .post('/api/login', this.form.value)
      .pipe()
      .subscribe(response => {
        
      });
  }
}
