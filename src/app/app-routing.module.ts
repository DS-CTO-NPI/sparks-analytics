import { loadRemoteModule } from "@angular-architects/module-federation";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

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
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
