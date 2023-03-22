import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let defaultHeaders = new HttpHeaders();
    defaultHeaders = defaultHeaders.append(
      'Accept',
     'application/json',
      );
      if (req.headers.has('DNT')) {
        req.headers.delete('DNT');
      }    
    req = req.clone({
      headers: defaultHeaders,
      withCredentials: true,
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/login') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.storageService.isLoggedIn()) {
        return this.authService.refreshToken().pipe(
          switchMap(() => {
            this.isRefreshing = false;
            
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];