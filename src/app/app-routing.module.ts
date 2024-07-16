import { loadRemoteModule } from "@angular-architects/module-federation";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth-guards/auth.guard";
import { AppLayoutComponent } from "./containers";

export const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: "/login"
	},
	{
		path: "login",
		loadChildren: () =>
			loadRemoteModule({ type: "manifest", remoteName: "user-management-mfe", exposedModule: "./LoginModule" })
				.then((m) => m.LoginModule)
				.catch((e) => {
					console.info("Failed to load User Management Micro-frontend:", e);
					return import("./components/des-page-not-found/page-not-found.module").then((mod) => mod.PageNotFoundModule);
				})
	},
	{
		path: "plant-dashboard",
		component: AppLayoutComponent,
		children: [
			{
				path: "",
				loadChildren: () =>
					loadRemoteModule({ type: "manifest", remoteName: "mfe-analytics-dashboard", exposedModule: "./AnalyticsDashboardModule" })
						.then((m) => m.AnalyticsDashboardModule)
						.catch((e) => {
							console.info("Failed to load Analytics Dashboard Micro-frontend:", e);
							return import("./components/des-page-not-found/page-not-found.module").then((mod) => mod.PageNotFoundModule);
						}),
				canActivate: [AuthGuard],
				data: {
					name: "Plant Dashboard",
					application: {
						id: 6, // hems
						name: "hems"
					}
				}
			},
			{
				path: "user-management",
				loadChildren: () =>
					loadRemoteModule({ type: "manifest", remoteName: "user-management-mfe", exposedModule: "./UserManagementModule" })
						.then((m) => m.UserManagementModule)
						.catch((e) => {
							console.info("Failed to load User Management Micro-frontend:", e);
							return import("./components/des-page-not-found/page-not-found.module").then((mod) => mod.PageNotFoundModule);
						}),
				canActivate: [AuthGuard],
				data: {
					name: "User Management",
					application: {
						id: 6, // hems
						name: "hems"
					}
				}
			},
			{
				path: "alarm-viewer",
				loadChildren: () =>
					loadRemoteModule({ type: "manifest", remoteName: "mfealarm", exposedModule: "./RemoteAlarmsViewerModule" })
						.then((m) => m.RemoteAlarmsViewerModule)
						.catch((e) => {
							console.info("Failed to load Alarm Micro-frontend:", e);
							return import("./components/des-page-not-found/page-not-found.module").then((mod) => mod.PageNotFoundModule);
						}),
				canActivate: [AuthGuard],
				data: {
					controllerName: "hems",
					name: "Alarm Viewer"
				}
			},
			{
				path: "historian",
				loadChildren: () =>
					loadRemoteModule({ type: "manifest", remoteName: "historian-viewer", exposedModule: "./RemoteHistorianViewerModule" })
						.then((m) => m.RemoteHistorianViewerModule)
						.catch((e) => {
							console.info("Failed to load Historian Micro-frontend:", e);
							return import("./components/des-page-not-found/page-not-found.module").then((mod) => mod.PageNotFoundModule);
						}),
				// canActivate: [AuthGuard],
				data: {
					name: "Historian",
					application: {
						id: 6, // hems
						name: "hems"
					}
				}
			},
			{
				path: "trends",
				loadChildren: () =>
					loadRemoteModule({ type: "manifest", remoteName: "trends-viewer", exposedModule: "./RemoteTrendsViewerModule" })
						.then((m) => m.RemoteTrendsViewerModule)
						.catch((e) => {
							console.log("Failed to load Trends Micro-frontend:", e);
							return import("./components/des-page-not-found/page-not-found.module").then((mod) => mod.PageNotFoundModule);
						}),
				// canActivate: [AuthGuard],
				data: {
					name: "Trend Analysis",
					application: {
						id: 6, // hems
						name: "hems"
					}
				}
			},
			{
				path: "notification-viewer",
				loadChildren: () =>
					loadRemoteModule({
						type: "manifest",
						remoteName: "mfe-notification",
						exposedModule: "./NotificationViewerModule"
					})
						.then((m) => m.NotificationViewerModule)
						.catch((e) => {
							console.log("Failed to load Notification Micro-frontend:", e);
							return import("./components/des-page-not-found/page-not-found.module").then((mod) => mod.PageNotFoundModule);
						}),
				canActivate: [AuthGuard],
				data: {
					controllerName: "hems",
					name: "Notification Viewer"
				}
			},
			{
				path: "custom-dashboard",
				loadChildren: () =>
					loadRemoteModule({ type: "manifest", remoteName: "custom-dashboard", exposedModule: "./CustomdashboardModule" })
						.then((m) => m.CustomdashboardModule)
						.catch((e) => {
							console.log("Failed to load Custom Dashboard Micro-frontend:", e);
							return import("./components/des-page-not-found/page-not-found.module").then((mod) => mod.PageNotFoundModule);
						}),
				// canActivate: [AuthGuard],
				data: {
					name: "Custom Dashboard",
					application: {
						id: 6, // hems
						name: "hems"
					}
				}
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
