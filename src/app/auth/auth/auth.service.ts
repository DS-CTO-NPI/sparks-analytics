import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { delay, tap } from "rxjs";
import { API } from "src/app/enums";
import { environment, getEndpointUrl } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	constructor(private http: HttpClient, private router: Router, private spinner: NgxSpinnerService, private toast: ToastrService) {}
	public logout() {
		const authUser: string | undefined = sessionStorage.getItem(`${environment.name}-authenticatedUser`) || undefined;
		if (authUser) {
			const logoutUrl = `${getEndpointUrl(API.logout)}${authUser}`;
			this.spinner.show();
			this.http
				.get<any>(logoutUrl)
				.pipe(
					delay(500), // Simulate delay if needed
					tap((response) => {
						if (response.statusCode === 204) {
							this.clearSessionStorageWithPrefix(`${environment.name}-`);
							this.router.navigate(["/login"]);
						}
					})
				)
				.subscribe({
					complete: () => this.spinner.hide(),
					error: () => {
						this.toast.error("Unable to log out at this time. Please try again later !!", "Error");
						this.spinner.hide();
					}
				});
		} else {
			this.toast.error("Unable to log out at this time. Please try again later !!", "Error");
		}
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
