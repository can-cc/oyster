
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';


import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('jwt-token', window.localStorage.getItem('jwt-token') || '')
    });

    return next.handle(authReq).catch((error, caught) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.snackBar.open('auth failure, please set localStorage [jwt-token]', null, {
            duration: 2000
          });
        }
      }
      return observableThrowError(error);
    });
  }
}
