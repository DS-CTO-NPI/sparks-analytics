import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";

@Component({
	selector: "des-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
	loginId: string = sessionStorage.getItem(`${environment.name}-authenticatedUser`) || "NA";
	userName: string = sessionStorage.getItem(`${environment.name}-username`) || "NA";
	emailAddress: string = sessionStorage.getItem(`${environment.name}-emailAddress`) || "NA";
	version = environment.version;
	title = environment.description;
	constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) {}

	logout = () => {
		this.spinner.show();
		this.authService.logout().subscribe((response) => {
			this.spinner.hide();
			if (response.statusCode == 204) {
				this.authService.clearSessionStorageWithPrefix(`${environment.name}-`);
				this.router.navigate(["/"]);
			}
		});
	};
}
