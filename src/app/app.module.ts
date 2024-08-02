import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ROUTES } from "./_nav";
import { AppComponent } from "./app.component";
import { HttpConfigInterceptor } from "./auth";
import { AuthService } from "./components/des-navbar/auth/auth.service";
import { SharedModule } from "./shared/shared.module";

@NgModule({
	declarations: [AppComponent],
	imports: [SharedModule, RouterModule.forRoot(ROUTES)],
	providers: [
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpConfigInterceptor,
			multi: true
		},
		{
			provide: APP_INITIALIZER,
			useFactory: initializeApp,
			deps: [AuthService],
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

export function initializeApp(appInitService: AuthService) {
	return () => appInitService.initializeApp();
}
