import { Component, OnInit } from "@angular/core";
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
export class AppLayoutComponent implements OnInit {
	constructor(private translate: TranslateService) {
		this.translate.use(`${environment.name}-loggedInUserLanguage` || "en");
	}

	ngOnInit(): void {}
}
