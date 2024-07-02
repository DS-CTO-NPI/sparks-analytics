import { Component, OnInit } from "@angular/core";

@Component({
	selector: "des-app-layout",
	template: `
		<des-header></des-header>
		<main class="animated fadeIn">
			<a [routerLink]="['user-management']">Home</a>
			<router-outlet></router-outlet>
		</main>
	`,
	styles: []
})
export class AppLayoutComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
