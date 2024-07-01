import { Component } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
	selector: "des-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	title = "sparks-analytics";
	constructor() {
		const application = {
			NAME: environment.name,
			DESCRIPTION: environment.description
		};
		sessionStorage.setItem("application", JSON.stringify(application));
	}
}
