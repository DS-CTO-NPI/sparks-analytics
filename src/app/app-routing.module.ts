import { loadRemoteModule } from "@angular-architects/module-federation";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth-guards/auth.guard";
import { PageNotFoundComponent } from "./components";
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
				.catch((e) => console.log(e))
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
						.catch((e) => console.log(e)),
				// canActivate: [AuthGuard],
				data: {
					name: "Analytics Dashboard",
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
						.catch((e) => console.log(e)),
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
						.catch((e) => console.log(e)),
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
						.catch((e) => console.log(e)),
				//canActivate: [AuthGuard],
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
						.catch((e) => console.log(e)),
				canActivate: [AuthGuard],

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
						.catch((e) => console.log(e)),
				canActivate: [AuthGuard],
				data: {
					controllerName: "hems",
					name: "Notification Viewer"
				}
			}
		]
	},
	// {
	// 	path: "user-management",
	// 	loadChildren: () =>
	// 		loadRemoteModule({ type: "manifest", remoteName: "user-management-mfe", exposedModule: "./UserManagementModule" })
	// 			.then((m) => m.UserManagementModule)
	// 			.catch((e) => console.log(e)),
	// 	canActivate: [AuthGuard],
	// 	data: {
	// 		name: "User Management",
	// 		application: {
	// 			id: 6, // hems
	// 			name: "hems"
	// 		}
	// 	}
	// },
	{
		path: "page-not-found",
		component: PageNotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
