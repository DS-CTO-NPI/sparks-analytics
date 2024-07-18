import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NAV } from "src/app/_nav";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth/auth.service";

@Component({
	selector: "des-navbar",
	templateUrl: "./navbar.component.html"
})
export class NavbarComponent {
	loginId: string = sessionStorage.getItem(`${environment.name}-authenticatedUser`) || "NA";
	userName: string = sessionStorage.getItem(`${environment.name}-username`) || "NA";
	emailAddress: string = sessionStorage.getItem(`${environment.name}-emailAddress`) || "NA";
	version = environment.version;
	title = environment.description;
	navigation = NAV; // hard-coded navigation
	navData: any = JSON.parse(sessionStorage.getItem(`${environment.name}-navigation`) || "[]"); // navigation data received from server

	constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) {}

	logout = () => {
		this.spinner.show();
		this.authService.logout().subscribe((response) => {
			this.spinner.hide();
			if (response.statusCode == 204) {
				this.authService.clearSessionStorageWithPrefix(`${environment.name}-`);
				this.router.navigate(["/login"]);
			}
		});
	};

	getLandingPage = (): string => (this.navData && this.navData.length > 0 ? this.navData.find((item: any) => item.isLanding === true)?.routerLink || "" : "");
}
