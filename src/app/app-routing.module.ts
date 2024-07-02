import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from "@angular-architects/module-federation";
import { AuthService } from '../app/services/authService/auth.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/historian',
  },
 /*  {
    path: 'login',
    loadChildren: () =>
      import('./views/login/login.module').then((m) => m.LoginModule),
  }, */
  {
    path: "historian",
    loadChildren: () =>
      loadRemoteModule({ type: "manifest", remoteName: "historian-viewer", exposedModule: "./RemoteHistorianViewerModule" })
        .then((m) => m.RemoteHistorianViewerModule)
        .catch((e) => console.log(e)),
    canActivate: [AuthService],
    data: {
      objectName: "Historian",
      controllerName:"ppc"
    }
  },
  {
    path: "trends",
    loadChildren: () =>
      loadRemoteModule({ type: "manifest", remoteName: "trends-viewer", exposedModule: "./RemoteTrendsViewerModule" })
        .then((m) => m.RemoteTrendsViewerModule)
        .catch((e) => console.log(e)),
    canActivate: [AuthService],
    data: {
      objectName: "Trend Analysis",
      controllerName:"ppc"
    }
  }, 
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			onSameUrlNavigation: "reload"
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}

