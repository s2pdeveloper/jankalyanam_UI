import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService, ToastService } from '../services';
import { Router } from '@angular/router';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(
    private localStorage: StorageService,
    private router: Router,
    private toast: ToastService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let user = this.localStorage.get('user');
    if (user) {
      request = request.clone({
        url: environment.apiEndpoint + request.url,
        setHeaders: {
          authorization: `Bearer ${user.token}`,
          'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Methods': "POST, GET, PATCH, DELETE, PUT",
          // "Access-Control-Allow-Headers" : '*'
        },
      });
    } else {
      request = request.clone({
        url: environment.apiEndpoint + request.url,
      });
    }
    return next.handle(request).pipe(
      catchError((errorResponse) => {
        console.log("errorResponse----",errorResponse);
        
        if (errorResponse instanceof HttpErrorResponse) {
          if (errorResponse.status == 401) {
            this.router.navigate(['/auth/login']);
            this.toast.errorToast('Unauthorized request');
            this.localStorage.remove;
          }
        }
        return throwError(() => errorResponse.error);
      })
    );
  }
}
export const ApiPrefixInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiPrefixInterceptor,
  multi: true,
};
