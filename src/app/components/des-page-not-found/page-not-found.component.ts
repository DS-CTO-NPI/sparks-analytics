import { Component, OnInit } from "@angular/core";

@Component({
	selector: "des-page-not-found",
	template: `
		<h3>
			<i class="fa fa-exclamation-triangle text-danger" aria-hidden="true"></i>
			page-not-found works!
		</h3>
	`,
	styles: []
})
export class PageNotFoundComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
