import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "src/environments/environment";

@Component({
	selector: "des-app-layout",
	template: `
		<des-header></des-header>
		<main>
			<div class="app-container">
				<router-outlet></router-outlet>
			</div>
		</main>
	`,
	styles: []
})
export class AppLayoutComponent {
	constructor(private translate: TranslateService) {
		const loggedInUserLanguage: string = sessionStorage.getItem(`${environment.name}-loggedInUserLanguage`) || "en";
		this.translate.use(loggedInUserLanguage);
	}
}
