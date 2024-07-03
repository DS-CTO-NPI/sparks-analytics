import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from "@enums/index";
import { environment, getEndpointUrl } from "@environments/environment";
import { Observable, delay } from "rxjs";

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
}
