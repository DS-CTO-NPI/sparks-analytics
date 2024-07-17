import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ModalModule } from "ngx-bootstrap/modal";
import { ProgressAnimationType, ToastrModule } from "ngx-toastr";
import { ComponentsModule } from "src/app/components/components.module";
import { CONTAINERS } from "src/app/containers";

@NgModule({
	declarations: [...CONTAINERS],
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		MatDatepickerModule,
		ReactiveFormsModule,
		ModalModule.forRoot(),
		ComponentsModule,
		TranslateModule.forRoot({
			defaultLanguage: "en",
			loader: {
				provide: TranslateLoader,
				useFactory: (http: HttpClient) => new TranslateHttpLoader(http, "./assets/i18n/", ".json"),
				deps: [HttpClient]
			}
		}),
		ToastrModule.forRoot({
			maxOpened: 1,
			timeOut: 5000,
			preventDuplicates: true,
			progressBar: true,
			progressAnimation: "increasing" as ProgressAnimationType
		}),
		RouterModule
	],
	exports: [...CONTAINERS]
})
export class SharedModule {}
