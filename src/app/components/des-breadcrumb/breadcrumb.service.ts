// breadcrumb.service.ts
import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class BreadcrumbService {
	private breadcrumbs: Breadcrumb[] = [];

	constructor(private router: Router, private activatedRoute: ActivatedRoute) {
		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
			this.breadcrumbs = [{ label: "Home", url: "/plant-dashboard" }, ...this.createBreadcrumbs(this.activatedRoute.root)];
		});
	}

	getBreadcrumbs(): Observable<Breadcrumb[] | any> {
		// return this.breadcrumbs?.length > 0 && this.breadcrumbs[1]?.url == "/plant-dashboard" ? of([this.breadcrumbs.shift()]) : of([...this.breadcrumbs]);
		return of(this.breadcrumbs);
	}

	private createBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
		const children: ActivatedRoute[] = route.children;

		if (children.length === 0) {
			return breadcrumbs;
		}

		for (const child of children) {
			if (child?.snapshot?.url?.length > 0) {
				const routeURL: string = child.snapshot.url.map((segment) => segment.path).join("/");
				if (routeURL !== "") {
					url += `/${routeURL}`;
				}
				breadcrumbs.push({ label: child.snapshot.data["name"], url: url });
			}
			return this.createBreadcrumbs(child, url, breadcrumbs);
		}

		return breadcrumbs;
	}
}

export interface Breadcrumb {
	label: string;
	url: string;
}