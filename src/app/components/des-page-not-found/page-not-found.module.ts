import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found.component";

export const route: Routes = [
	{
		path: "page-not-found",
		component: PageNotFoundComponent
	}
];

@NgModule({
	declarations: [PageNotFoundComponent],
	imports: [CommonModule, RouterModule.forChild(route)],
	exports: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
