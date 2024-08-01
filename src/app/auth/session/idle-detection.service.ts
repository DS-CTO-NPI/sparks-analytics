import { Injectable, OnDestroy } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { BehaviorSubject, fromEvent, interval, merge, Observable, Subject, Subscription, timer } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth/auth.service";
import { SESSION_TIME, SESSION_WARNING_TIME, TIME } from "src/app/enums";
import { SessionTimeoutComponent } from "./session-timeout.component";

@Injectable({
	providedIn: "root"
})
export class IdleDetectionService implements OnDestroy {
	private readonly idleTimeout = SESSION_TIME;
	private readonly warningTime = SESSION_WARNING_TIME;
	private readonly debounceTime = TIME.HALF_SECOND; // Debounce time for user activity events
	private idleSubject = new Subject<void>();
	private timerSubscription: Subscription | undefined;
	private countdownSubscription: Subscription | undefined;
	private activitySubscriptions: Subscription[] = [];
	private remainingTime: number = this.idleTimeout; // Initialize with full timeout
	private bsModalRef?: BsModalRef;
	public sessionExpiryTime$: BehaviorSubject<string> = new BehaviorSubject<string>("");
	hasModalShown: boolean = false;
	constructor(private modalService: BsModalService, private authService: AuthService) {}

	start() {
		this.resetIdleTimer();
		this.monitorUserActivity();
	}

	get idle$() {
		return this.idleSubject.asObservable();
	}

	private monitorUserActivity(): void {
		// Create observable streams for user activity events
		const mouseMove$: Observable<Event> = fromEvent(document, "mousemove").pipe(debounceTime(this.debounceTime));
		const mouseClick$: Observable<Event> = fromEvent(document, "click").pipe(debounceTime(this.debounceTime));
		const keyPress$: Observable<Event> = fromEvent(document, "keypress").pipe(debounceTime(this.debounceTime));
		const scroll$: Observable<Event> = fromEvent(document, "scroll").pipe(debounceTime(this.debounceTime));
		// Combine all activity observables
		const activity$: Observable<Event> = merge(mouseMove$, mouseClick$, keyPress$, scroll$);
		// Reset the idle timer on any user activity
		this.activitySubscriptions.push(activity$.subscribe(() => this.resetIdleTimer()));
		this.startIdleTimer();
	}

	private startIdleTimer(): void {
		this.stopIdleTimer(); // Ensure any previous timer is cleared
		this.timerSubscription = timer(this.idleTimeout).subscribe(() => this.onIdle());
		// Start countdown to display remaining time
		this.countdownSubscription = interval(TIME.ONE_SECOND)
			.pipe(
				switchMap(() => {
					this.remainingTime -= TIME.ONE_SECOND; // Decrement remaining time by 1 second
					if (this.remainingTime <= 0) {
						this.remainingTime = 0; // Ensure no negative time
						this.stopCountdown();
					}
					return [this.remainingTime];
				})
			)
			.subscribe((time) => {
				this.getRemainingTime(time);
				if (this.remainingTime <= this.warningTime && !this.hasModalShown) {
					this.handleIdleLogout();
				}
			});
	}

	private getRemainingTime(remainingTime: number): void {
		const minutes: number = Math.floor(remainingTime / TIME.ONE_MINUTE);
		const seconds: number = Math.floor((remainingTime % TIME.ONE_MINUTE) / TIME.ONE_SECOND);
		const time = `${minutes} Minutes ${seconds} Seconds`;
		this.sessionExpiryTime$.next(time);
		console.log(`Remaining time: ${time}`);
	}

	private resetIdleTimer(): void {
		if (this.timerSubscription) {
			this.timerSubscription.unsubscribe();
		}
		this.remainingTime = this.idleTimeout; // Reset remaining time
		this.startIdleTimer(); // Restart the timer
		if (this.hasModalShown) {
			this.hasModalShown = false;
			this.bsModalRef?.hide();
		}
	}

	private onIdle(): void {
		this.idleSubject.next();
		this.authService.logout();
	}

	private handleIdleLogout(): void {
		this.hasModalShown = true;
		this.bsModalRef = this.modalService.show(SessionTimeoutComponent, {
			initialState: {
				sessionExpiryTime$: this.sessionExpiryTime$
			}
		});
	}

	public stopIdleTimer(): void {
		if (this.timerSubscription) {
			this.timerSubscription.unsubscribe();
		}
		this.stopCountdown(); // Stop countdown when timer is stopped
	}

	private stopCountdown(): void {
		if (this.countdownSubscription) {
			this.countdownSubscription.unsubscribe();
		}
	}

	ngOnDestroy(): void {
		console.log("Idle Detection Service Destroyed");
		this.stopIdleTimer();
		this.activitySubscriptions.forEach((sub) => sub.unsubscribe());
		this.bsModalRef?.hide();
	}
}
