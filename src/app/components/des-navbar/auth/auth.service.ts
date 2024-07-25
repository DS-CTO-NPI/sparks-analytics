import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay } from "rxjs";
import { environment, getEndpointUrl } from "src/environments/environment";
import { API } from "../../../enums";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	constructor(private http: HttpClient) {}
	public logout(): Observable<any> {
		const authUser: string | undefined = sessionStorage.getItem(`${environment.name}-authenticatedUser`) || undefined;
		return this.http.get(`${getEndpointUrl(API.logout)}${authUser}`).pipe(delay(500));
	}

	clearSessionStorageWithPrefix(prefix: string): void {
		// Get all keys from sessionStorage
		const keysToRemove: string[] | [] = Object.keys(sessionStorage).filter((key) => key.includes(prefix));
		// Remove keys from sessionStorage
		keysToRemove.forEach((key) => sessionStorage.removeItem(key));
	}

	initializeApp(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			try {
				const application = {
					NAME: environment.name,
					DESCRIPTION: environment.description,
					VERSION: environment.version,
					APP_ID: environment.appId
				};
				sessionStorage.setItem("application", JSON.stringify(application));
				resolve();
			} catch (error) {
				console.error("Failed to initialize application:", error);
				reject(error);
			}
		});
	}
}
