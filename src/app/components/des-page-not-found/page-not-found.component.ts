import { Component } from "@angular/core";

@Component({
	selector: "des-page-not-found",
	template: `
		<div class="jumbotron bg-transparent jumbotron-fluid text-center">
			<div class="container">
				<h1>
					<i class="fa fa-exclamation-triangle text-danger" aria-hidden="true"></i>
					Page Not Found !
				</h1>
				<p class="mt-3">Something went wrong. Please try again later</p>
			</div>
		</div>
	`,
	styles: []
})
export class PageNotFoundComponent {}
