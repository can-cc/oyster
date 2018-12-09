import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import { MatSnackBar } from '@angular/material';
import { AuthService } from './core/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('jwt-token', this.authService.getJwt() || '')
    });

    return next.handle(authReq).pipe(
      catchError((error, caught) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 && error.url.indexOf('/api/login') === -1) {
            this.snackBar.open('auth failure, please set localStorage [jwt-token]', null, {
              duration: 2000
            });
          }
        }
        return observableThrowError(error);
      })
    );
  }
}
