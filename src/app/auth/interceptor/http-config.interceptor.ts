import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
	constructor(private router: Router) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const appName: string = environment.name || "";
		const authToken: string | null = sessionStorage.getItem(`${appName}-authToken`) || null;

		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${authToken}`,
				"Cache-Control": "no-cache, no-store, must-revalidate",
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "DENY",
				"Access-Control-Allow-Origin": "*",
				defaultDb: appName,
				database: appName,
				hostDB: appName,
				applicationId: environment.appId
			}
		});

		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				let errorMessage = "";
				if (error.error instanceof ErrorEvent) {
					// client-side error
					errorMessage = `Error: ${error.error.message}`;
				} else {
					// server-side error
					errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
				}

				// Handle specific errors like 401 Unauthorized
				if (error.status === 401) {
					this.router.navigate(["/"]);
				}

				return throwError(() => {
					"Service Error. Please try again";
				});
			})
		);
	}
}
