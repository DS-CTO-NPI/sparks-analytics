import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";

import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
	constructor(private router: Router) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const appName: string = environment.name;
		const databaseName: string = "" || appName;
		const authToken = sessionStorage.getItem(`${appName}-auth-token`);

		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${authToken}`,
				"Cache-Control": "no-cache, no-store, must-revalidate",
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "DENY",
				"Access-Control-Allow-Origin": "*",
				defaultDb: "hems",
				database: databaseName,
				hostDB: appName,
				applicationId: environment.appId
			}
		});

		return next.handle(request).pipe(
			map((event) => {
				return event;
			}),
			catchError((err) => {
				if (err.status === 401) {
					sessionStorage.clear();
					this.router.navigate(["/"]);
				}

				const error = err?.error?.message || err?.statusText;
				return throwError(() => error);
			}),
			finalize(() => {})
		);
	}
}
