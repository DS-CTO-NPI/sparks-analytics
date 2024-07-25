import { loadRemoteModule } from "@angular-architects/module-federation";
import { Routes } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthGuard } from "./auth";
import { AppLayoutComponent, AuthLayoutComponent } from "./containers";

// hard-coded navigation items
export const NAV: any[] = [
	{
		name: "Dashboard",
		routerLink: "/plant-dashboard",
		isLanding: true,
		children: []
	},
	{
		name: "Administration",
		routerLink: "/administration",
		isLanding: false,
		children: [
			{
				name: "User Management",
				routerLink: "administration/user-management"
			},
			{
				name: "Asset Types,Vendors & Groups",
				routerLink: "asset-type-vendors-and-groups"
			},
			{
				name: "Asset configuration",
				routerLink: "asset-configuration"
			}
		]
	},
	{
		name: "Alarm Viewer",
		routerLink: "alarm-viewer",
		isLanding: false,
		children: []
	},
	{
		name: "Notification Viewer",
		routerLink: "notification-viewer",
		isLanding: false,
		children: []
	},
	{
		name: "Historian",
		routerLink: "/historian",
		isLanding: false,
		children: [
			{
				name: "Historian Configuration",
				routerLink: "historian"
			},
			{
				name: "Trend Analysis",
				routerLink: "trends"
			}
		]
	},
	{
		name: "Custom Dashboard",
		routerLink: "custom-dashboard",
		isLanding: false,
		children: []
	}
];

type RouteData = {
	name: string;
	controllerName?: string;
	application: {
		id: number;
		name: string;
	};
};

//Returns a RouteData object containing the name, controller name, and application ID and name.
export const getRouteData = (name: string, appId: number, appName: string, controllerName?: string): RouteData => {
	return {
		name: name,
		controllerName: controllerName,
		application: {
			id: appId,
			name: appName
		}
	};
};

// Function to load remote module with error handling and fallback page-not-found module
export const loadRemoteModuleWithFallback = (remote: string, exposedModule: string, module: string) => {
	return () => {
		return loadRemoteModule({ type: "manifest", remoteName: remote, exposedModule: exposedModule })
			.then((m: any) => m[module])
			.catch((e: any) => {
				console.error(`Failed to load \x1b[4m${remote}\x1b[0m Micro-frontend! Please check if the \x1b[4m${remote}\x1b[0m micro-frontend is running.`);
				return import("./components/des-page-not-found/page-not-found.module")
					.then((mod) => mod.PageNotFoundModule)
					.catch((err) => {
						console.error("Failed to load PageNotFoundModule:");
						throw err; //re-throw the error to handle it higher up
					});
			});
	};
};

export const ROUTES: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: "/login"
	},
	{
		path: "login",
		component: AuthLayoutComponent,
		children: [
			{
				path: "",
				title: `${environment.description} | Login`,
				loadChildren: loadRemoteModuleWithFallback("user-management-mfe", "./LoginModule", "LoginModule")
			}
		]
	},
	{
		path: "plant-dashboard",
		component: AppLayoutComponent,
		children: [
			{
				path: "",
				title: `${environment.description} | Dashboard`,
				loadChildren: loadRemoteModuleWithFallback("mfe-analytics-dashboard", "./AnalyticsDashboardModule", "AnalyticsDashboardModule"),
				data: getRouteData("Plant Dashboard", 6, "hems")
			},
			{
				path: "administration/user-management",
				title: `${environment.description} | User Management`,
				loadChildren: loadRemoteModuleWithFallback("user-management-mfe", "./UserManagementModule", "UserManagementModule"),
				data: getRouteData("User Management", 6, "hems"),
				canActivate: [AuthGuard]
			},
			{
				path: "alarm-viewer",
				title: `${environment.description} | Alarm Viewer`,
				loadChildren: loadRemoteModuleWithFallback("mfe-alarm", "./RemoteAlarmsViewerModule", "RemoteAlarmsViewerModule"),
				data: getRouteData("Alarm Viewer", 6, "hems"),
				canActivate: [AuthGuard]
			},
			{
				path: "historian",
				title: `${environment.description} | Historian`,
				loadChildren: loadRemoteModuleWithFallback("mfe-historian", "./RemoteHistorianViewerModule", "RemoteHistorianViewerModule"),
				data: getRouteData("Historian", 6, "hems")
				// canActivate: [AuthGuard],
			},
			{
				path: "trends",
				title: `${environment.description} | Trend Analysis`,
				loadChildren: loadRemoteModuleWithFallback("mfe-trends", "./RemoteTrendsViewerModule", "RemoteTrendsViewerModule"),
				data: getRouteData("Trend Analysis", 6, "hems")
				// canActivate: [AuthGuard],
			},
			{
				path: "notification-viewer",
				title: `${environment.description} | Notification Viewer`,
				loadChildren: loadRemoteModuleWithFallback("mfe-notification", "./NotificationViewerModule", "NotificationViewerModule"),
				data: getRouteData("Notification Viewer", 6, "hems", "hems"),
				canActivate: [AuthGuard]
			},
			{
				path: "custom-dashboard",
				title: `${environment.description} | Custom Dashboard`,
				loadChildren: loadRemoteModuleWithFallback("mfe-custom-dashboard", "./CustomdashboardModule", "CustomdashboardModule"),
				data: getRouteData("Custom Dashboard", 6, "hems")
				// canActivate: [AuthGuard],
			},
			{
				path: "asset-type-vendors-and-groups",
				title: `${environment.description} | Asset Types,Vendors & Groups`,
				loadChildren: loadRemoteModuleWithFallback("mfe-asset-management", "./RemoteAssetVendorsModule", "RemoteAssetVendorsModule"),
				data: getRouteData("Asset Types,Vendors & Groups", 6, "hems", "hems")
				// canActivate: [AuthGuard],
			},
			{
				path: "asset-configuration",
				title: `${environment.description} | Asset Configuration`,
				loadChildren: loadRemoteModuleWithFallback("mfe-asset-management", "./RemoteDevicemanagementModule", "RemoteDevicemanagementModule"),
				data: getRouteData("Asset Configuration", 6, "hems", "hems")
				// canActivate: [AuthGuard],
			}
		]
	}
];
