import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class AuthGuard implements CanActivate {
	private appName!: string;
	constructor(private router: Router) {
		this.appName = environment.name;
	}

	canActivate(route: ActivatedRouteSnapshot): boolean {
		if (sessionStorage.getItem(`${this.appName}-loggedInUser`)) {
			return this.hasAccess(route);
		} else {
			this.router.navigate(["login"]);
			return false;
		}
	}

	hasAccess(route: ActivatedRouteSnapshot): boolean {
		const objPermission: string | null = sessionStorage.getItem(`${this.appName}-access`);
		if (objPermission) {
			const objPermissions: any = JSON.parse(objPermission);
			const permissionObj: any = objPermissions.find((obj: any) => {
				return obj.applicationObjects.object.name == route.data["name"];
			});

			if (permissionObj != null) {
				let permission: any = permissionObj.permission.permissionType;
				if (permission != "NA") {
					return true;
				} else return false;
			} else return false;
		} else return false;
	}
}
