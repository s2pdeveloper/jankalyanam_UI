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
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toast: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !request.url.includes('/assets/i18n/en.json') &&
      !request.url.includes('assets/streams.json') &&
      !request.url.includes('/apk')
    ) {
      request = request.clone({
        url: environment.apiEndpoint + request.url,
      });
    }

    return next.handle(request).pipe(
      catchError((errorResponse) => {
        if (errorResponse instanceof HttpErrorResponse) {
          if (errorResponse.status == 401) {
            this.router.navigate(['/login']);
            this.toast.error('Unauthorized request');
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
