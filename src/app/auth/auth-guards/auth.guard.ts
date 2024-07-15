import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class AuthGuard implements CanActivate {
	private appName!: string;
	constructor(private router: Router, private Toast: ToastrService) {
		this.appName = environment.name;
	}

	canActivate(route: ActivatedRouteSnapshot): boolean {
		const routerName = route.data["name"];
		if (!!sessionStorage.getItem(`${this.appName}-loggedInUser`)) {
			const navigationData: any = JSON.parse(sessionStorage.getItem(`${this.appName}-navigation`) || "[]");
			const hasAccess: boolean = this.hasRoutingPermission(navigationData, routerName);
			if (!hasAccess) {
				this.Toast.error(`User don't have permission to access ${routerName}, please contact your administrator`, "Access Denied");
			}
			return hasAccess;
		} else {
			this.router.navigate(["login"]);
			return false;
		}
	}

	hasRoutingPermission(navigationData: any, routeName: string): boolean {
		let hasPermission: boolean = false;
		navigationData.forEach((item: any) => {
			if (item.name === routeName && item.permissions.type !== "NA") {
				hasPermission = true;
			}
			if (!hasPermission && item.children && item.children.length > 0) {
				hasPermission = this.hasRoutingPermission(item.children, routeName);
			}
		});
		return hasPermission;
	}
}
