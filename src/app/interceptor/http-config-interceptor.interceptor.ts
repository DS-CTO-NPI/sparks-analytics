import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  
  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let baseDB = "hems";
    let params = request.params;
    

    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer' + ' ' + sessionStorage.getItem('authToken'),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'database': baseDB,
        'application': 'hems',
        'Access-Control-Allow-Origin': '*',
        'defaultDb':'hems',
        'hostDB': 'hems',
        'applicationId': "6"
      },
      params : params
    });

    return next.handle(request).pipe(map(event => {
      return event;
    }), catchError(err => {

      if (err.status === 403) {
        console.log(err.message)
          sessionStorage.clear();
        this.router.navigate(["/"]);
      }

 
      const error = err.message || err.statusText;
      return throwError(error);
    }),
      finalize(() => {
      })
    )
  }
}


