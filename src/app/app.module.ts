import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpConfigInterceptor } from "./auth/interceptor/http-config.interceptor";
import { SharedModule } from "./shared/shared.module";
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
	declarations: [AppComponent],
	imports: [SharedModule, AppRoutingModule,MatDatepickerModule],
	providers: [
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpConfigInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
