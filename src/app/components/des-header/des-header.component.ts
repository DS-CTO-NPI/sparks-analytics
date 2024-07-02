import { Component, OnInit } from "@angular/core";

@Component({
	selector: "des-header",
	template: `
		<header>
			<des-navbar></des-navbar>
			<section class="secondary-nav">
				<des-breadcrumb></des-breadcrumb>
				<des-controller-widget></des-controller-widget>
			</section>
		</header>
	`,
	styles: []
})
export class DesHeaderComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
