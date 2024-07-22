import { Component } from "@angular/core";
import { environment } from "src/environments/environment";
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: "des-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {

	constructor() {
		const application = {
			NAME: environment.name,
			DESCRIPTION: environment.description,
			VERSION: environment.version,
			APP_ID: environment.appId
		};
		sessionStorage.setItem("application", JSON.stringify(application));
	}
		
}
