import { Component, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IdleDetectionService } from "src/app/auth/session/idle-detection.service";
import { environment } from "src/environments/environment";

@Component({
	selector: "des-app-layout",
	template: `
		<des-header></des-header>
		<main>
			<div class="app-container">
				<router-outlet></router-outlet>
			</div>
		</main>
	`
})
export class AppLayoutComponent implements OnDestroy {
	private readonly destroy$ = new Subject<void>();

	constructor(private translate: TranslateService, private idleDetectionService: IdleDetectionService) {
		const loggedInUserLanguage: string = sessionStorage.getItem(`${environment.name}-loggedInUserLanguage`) || "en";
		this.translate.use(loggedInUserLanguage);
		// Start idle detection service
		this.idleDetectionService.start();
		// Logout user if idle
		this.idleDetectionService.idle$.pipe(takeUntil(this.destroy$)).subscribe(() => this.idleDetectionService.ngOnDestroy());
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
