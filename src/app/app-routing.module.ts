import { loadRemoteModule } from "@angular-architects/module-federation";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth-guards/auth.guard";
import { PageNotFoundComponent } from "./components";
import { AppLayoutComponent } from "./containers/app-layout/app-layout.component";

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
				path: "user-management",
				loadChildren: () =>
					loadRemoteModule({ type: "manifest", remoteName: "plant-dashboard-mfe", exposedModule: "./PlantDashboardModule" })
						.then((m) => m.PlantDashboardModule)
						.catch((e) => console.log(e)),
				canActivate: [AuthGuard],
				data: {
					name: "User Management",
					application: {
						id: 6, // hems
						name: "hems"
					}
				}
			}
		]
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
		path: "page-not-found",
		component: PageNotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
