import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "des-session-timeout",
	template: `
		<div class="modal-header text-center">
			<h5 class="modal-title">Session Timeout</h5>
		</div>
		<div class="modal-body text-center p-4">
			<p class="lead">We noticed that you've been inactive for a while. Your session is about to expire soon.</p>
			<p>You have:</p>
			<h3 class="blink-gradient-text">
				<strong>{{ sessionExpiryTime$ | async }}</strong>
			</h3>
			<small>To avoid being logged out, Please move your cursor or press any key to keep it active.</small>
		</div>
	`,
	standalone: true,
	imports: [CommonModule]
})
export class SessionTimeoutComponent implements OnDestroy {
	@Input() sessionExpiryTime$!: Observable<string>; // Observable input
	private readonly destroy$ = new Subject<void>();

	ngOnInit() {
		this.sessionExpiryTime$.pipe(takeUntil(this.destroy$)).subscribe();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
