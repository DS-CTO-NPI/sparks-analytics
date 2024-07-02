import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Observable, filter, of } from "rxjs";
import { Breadcrumb, BreadcrumbService } from "./breadcrumb.service";

@Component({
	selector: "des-breadcrumb",
	template: `
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item" *ngFor="let breadcrumb of breadcrumbs$ | async; let first = first; let last = last" [ngClass]="{ active: !first }">
					<ng-container *ngIf="first; else route">
						<a [routerLink]="breadcrumb.url">{{ breadcrumb.label }}</a>
					</ng-container>
					<ng-template #route>{{ breadcrumb.label }}</ng-template>
				</li>
			</ol>
		</nav>
	`,
	styles: [
		`
			.breadcrumb {
				background-color: #030f20;
				color: #ffff;
				margin: 0;
				border-radius: 0;
				padding: 1rem 0px;
			}
			.breadcrumb-item.active {
				color: #c5c5c5;
			}
		`
	],
	changeDetection: ChangeDetectionStrategy.Default
})
export class BreadcrumbComponent {
	breadcrumbs$: Observable<Breadcrumb[] | []> = of([]);
	constructor(private breadcrumbService: BreadcrumbService, private router: Router) {
		// called when the navigation route change
		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
			this.breadcrumbs$ = this.breadcrumbService.getBreadcrumbs();
		});
	}
}
