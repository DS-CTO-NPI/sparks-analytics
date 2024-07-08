import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "src/environments/environment";

@Component({
	selector: "des-app-layout",
	template: `
		<des-header></des-header>
		<main class="animated fadeIn">
			<!-- <a [routerLink]="['user-management']">Home</a>
			<a [routerLink]="['historian']">Historian</a>
			<a [routerLink]="['trends']">Trend Analytics</a> -->

			<router-outlet></router-outlet>
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
