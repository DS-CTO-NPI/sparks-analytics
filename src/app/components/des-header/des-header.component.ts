import { Component, OnInit } from "@angular/core";

@Component({
	selector: "des-header",
	template: `
		<header>
			<des-navbar></des-navbar>
			<section class="secondary-nav">
				<des-breadcrumb></des-breadcrumb>
			</section>
		</header>
	`,
	styles: []
})
export class DesHeaderComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
