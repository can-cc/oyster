import { Injectable } from '@angular/core';
import { User } from '../../typing/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwt: string;
  private user: User;

  constructor() {
    this.setJwt(window.localStorage.getItem('Authorization'));
  }

  public setJwt(jwt: string) {
    this.jwt = jwt;
  }

  private saveJwt(jwt: string): void {
    window.localStorage.setItem('Authorization', jwt);
  }

  public handleLoginSuccess(user: User, jwt: string): void {
    this.setJwt(jwt);
    this.saveJwt(jwt);
    this.user = user;
  }

  public getJwt(): string {
    return this.jwt;
  }
}
