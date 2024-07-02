import { Component, OnInit } from "@angular/core";

@Component({
	selector: "des-app-layout",
	template: `
		<ngx-spinner bdColor="rgba(0,0,0,0.6)" size="medium" color="#217fb1" type="square-jelly-box" [fullScreen]="true"></ngx-spinner>
		<des-header></des-header>
		<main class="animated fadeIn">
			<a routerLink="/user-management">Home</a>
			<router-outlet></router-outlet>
		</main>
	`,
	styles: []
})
export class AppLayoutComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
