import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { log } from 'console';

@Injectable()
export class AuthService implements CanActivate {

	constructor(private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot): boolean {   
		if(!sessionStorage.getItem("loggedInUser")) {
			this.router.navigate(["login"]);
			return false;
		}
		else {		
			return this.hasAccess(route);
		}
	}

	hasAccess(route: any): boolean {
		let objPermission= null;
		objPermission= sessionStorage.getItem("ppc-access");
		if(objPermission!=null && objPermission!="undefined") {
			let objPermissions= JSON.parse(objPermission);

			let permissionObj= objPermissions.find((obj: { userObject: { objectName: any; }; }) => {
				return obj.userObject.objectName == route.data.objectName;
			});
	
			if(permissionObj!=null) {
				let permission= permissionObj.permission.permissionType;
				if(permission != 'NA') {
					return true;
				}
				else return false;
			}
			else return false;
		}
		else return false;
	}
}