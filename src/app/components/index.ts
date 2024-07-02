import { AlarmWidgetComponent } from "./des-alarm-widget/alarm-widget.component";
import { BreadcrumbComponent } from "./des-breadcrumb/breadcrumb.component";
import { ControllerWidgetComponent } from "./des-controller-widget/controller-widget.component";
import { DesHeaderComponent } from "./des-header/des-header.component";
import { NavbarComponent } from "./des-navbar/navbar.component";
import { PageNotFoundComponent } from "./des-page-not-found/page-not-found.component";

export * from "./des-alarm-widget/alarm-widget.component";
export * from "./des-breadcrumb/breadcrumb.component";
export * from "./des-controller-widget/controller-widget.component";
export * from "./des-header/des-header.component";
export * from "./des-navbar/navbar.component";
export * from "./des-page-not-found/page-not-found.component";

export const COMPONENTS: any = [
	AlarmWidgetComponent,
	NavbarComponent,
	BreadcrumbComponent,
	DesHeaderComponent,
	ControllerWidgetComponent,
	PageNotFoundComponent
];
