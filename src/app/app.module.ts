import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService, HttpConfigInterceptor } from "@shell/auth/index";
import { SharedModule } from "@shell/shared/shared.module";
import { ROUTES } from "./_nav";
import { AppComponent } from "./app.component";

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
