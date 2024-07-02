import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject, Subscription, takeUntil } from "rxjs";
import { AlarmViewerService } from "src/app/services/alarm-viewer/alarm-viewer.service";

@Component({
	selector: "des-alarm-widget",
	template: `
		<section id="des-alert-widget">
			<ng-container *ngFor="let alarm of alarmCount | keyvalue">
				<a class="px-1" [routerLink]="['alarm-viewer']">
					<span class="badge rounded-badge text-white" [ngClass]="alarm.key === 'Minor' ? 'text-dark' : 'text-white'" [class]="colors[alarm.key]">
						{{ alarm.value }}
					</span>
				</a>
			</ng-container>
		</section>
	`,
	styleUrls: ["./alarm-widget.component.scss"]
})
export class AlarmWidgetComponent implements OnInit {
	private readonly unsubscribe$: Subject<void> = new Subject();
	colors: any = {
		Critical: "bg-critical",
		Major: "bg-major",
		Minor: "bg-minor",
		Warning: "bg-warnings",
		All: "bg-all"
	};
	public alarmCounter = new Counter();
	public alarmSubscription = new Subscription();
	public alarmCount = {
		Critical: 0,
		Major: 0,
		Minor: 0,
		Warning: 0,
		All: 0
	};
	controllerName;
	toasterData = [];
	alarmToasterTimeout: any;
	alarmToasterCount: any;

	constructor(private alarmViewerService: AlarmViewerService, private toaster: ToastrService, private route: ActivatedRoute, private router: Router) {
		this.controllerName = this.route.snapshot.data["controllerName"];
	}

	ngOnInit() {
		this.getAlarmCount();
		this.getDisplayed();
		this.getAlarmToaster();
	}

	public getAlarmCount() {
		this.alarmCounter.reset();
		let alarmCount: any = {
			Critical: 0,
			Major: 0,
			Minor: 0,
			Warning: 0,
			All: 0
		};
		if (sessionStorage.getItem("hems-authToken")?.length) {
			this.alarmSubscription = this.alarmViewerService
				.getAlarmCount()
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe({
					next: (response) => {
						alarmCount.All = 0;
						response.data.forEach((alarm: any) => {
							alarmCount.All = alarmCount.All + (alarm.totalCount - alarm.clearedCount);
							alarmCount[alarm.severity] = alarm.totalCount - alarm.clearedCount;
						});
						this.alarmCount = Object.assign(this.alarmCount, alarmCount);
					},
					error: (_error) => {
						this.alarmCount = Object.assign(this.alarmCount, alarmCount);
					}
				});
		}
	}

	getDisplayed() {
		this.alarmViewerService
			.getDisplayed(this.controllerName)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((res) => {
				let length = res.data.length;
				if (length > 0) {
					if (length > this.alarmToasterCount) {
						this.toaster.warning(" new alarms are generated", length).onTap.subscribe(() => this.router.navigate(["alarm-viewer"]));
					} else {
						for (let i = 0; i < this.alarmToasterCount; i++) {
							if (res.data[i]) {
								this.toaster.warning(res.data[i].alarmMessage + "!", res.data[i].severity).onTap.subscribe(() => this.router.navigate(["alarm-viewer"]));
							}
						}
					}
				}
			});
	}

	getAlarmToaster() {
		this.alarmViewerService
			.getDropdownCodes("AlarmBlink")
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe({
				next: (response) => {
					this.toasterData = response.data;
					this.toasterData.forEach((element: any) => {
						if (element.codeDisplayTxt == "AlarmToasterDelayInSeconds") {
							this.alarmToasterTimeout = element.codeValue;
						} else if (element.codeDisplayTxt == "AlarmToasterCount") {
							this.alarmToasterCount = element.codeValue;
						}
					});
				}
			});
	}
	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}

class Counter {
	private count = 0;
	increment() {
		return ++this.count;
	}

	reset() {
		this.count = 0;
	}

	value() {
		return this.count;
	}
}
