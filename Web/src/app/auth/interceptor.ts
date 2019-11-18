import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators/tap';
import { AuthService } from './services/auth.service';
import { Config } from '../config';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  headers: HttpHeaders;
  constructor(private authService: AuthService) {
    if (this.authService && this.headers) {
      this.authService.onLogout.subscribe(() => {
        this.headers.delete('Authorization');
      });
    }
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newReq = this.setHeaders(req);

    return next.handle(newReq).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            return this.handleRequest(err);
          }
        }
      )
    );
  }
  setHeaders(request: HttpRequest<any>) {
    const newReq = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': Config.siteUrl,
        Authorization:
          this.authService && this.authService.isLoggedIn()
            ? `Bearer ${this.authService.getToken()}`
            : ''
      }
    });

    return newReq;
  }

  setHeader(request: HttpRequest<any>, key: string, value: string) {
    request.headers.set(key, value);
  }

  handleRequest(error: HttpErrorResponse) {
    if (error.status === 401 || error.status === 403 || error.status === 500) {
      // this._auth.logout();
      this.authService.navigateToUrl(`/unauthorized/${error.status}`);
      // this._auth.login();
    }

    return error;
  }
}
