import { Component } from "@angular/core";

@Component({
	selector: "des-header",
	template: `
		<header>
			<des-navbar></des-navbar>
			<section class="secondary-nav">
				<des-breadcrumb></des-breadcrumb>
			</section>
		</header>
	`
})
export class DesHeaderComponent {}
