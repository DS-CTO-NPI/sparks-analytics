import { Component } from "@angular/core";
import { NAV } from "src/app/_nav";
import { AuthService } from "src/app/auth/auth/auth.service";
import { IdleDetectionService } from "src/app/auth/session/idle-detection.service";
import { environment } from "src/environments/environment";

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
	photo = sessionStorage.getItem(`${environment.name}-photo`) || "";

	constructor(private authService: AuthService, private idleDetectionService: IdleDetectionService) {}

	logout = () => {
		this.authService.logout();
		this.idleDetectionService.ngOnDestroy();
	};

	getLandingPage = (): string => (this.navData && this.navData.length > 0 ? this.navData.find((item: any) => item.isLanding === true)?.routerLink || "" : "");
}
