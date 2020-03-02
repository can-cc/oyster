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
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', this.authService.getJwt() || '')
    });

    return next.handle(authReq).pipe(
      catchError((error, caught) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 && error.url.indexOf('/api/login') === -1) {
            this.snackBar.open('Please login', null, {
              duration: 2000
            });
            this.router.navigate(['/login'], {
              replaceUrl: true
            });
          }
        }
        return observableThrowError(error);
      })
    );
  }
}
