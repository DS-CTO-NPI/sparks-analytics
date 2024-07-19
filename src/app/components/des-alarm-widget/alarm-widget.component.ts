import { Component } from "@angular/core";
import { Observable, of } from "rxjs";
import { AlarmsCountResponse, AlarmViewerService } from "./alarm-viewer.service";

@Component({
	selector: "des-alarm-widget",
	template: `
		<section class="des-alert-widget" [routerLink]="['alarm-viewer']">
			<ng-container *ngIf="alarmCount$ | async as alarms; else noAlarms">
				<ng-container *ngIf="alarms.length > 0; else noAlarms">
					<span class="px-1 text-white" *ngFor="let alarm of alarms">
						{{ alarm.value }}
						<span class="des-alert-color" [ngClass]="alarm.severity | lowercase"></span>
					</span>
				</ng-container>
			</ng-container>
			<ng-template #noAlarms>
				<small class="text-white">
					<i class="fa fa-exclamation-circle text-danger mr-2" aria-hidden="true"></i>
					Alarm service error
				</small>
			</ng-template>
		</section>
	`,
	styles: [
		`
			.des-alert {
				&-widget {
					border-radius: 10px;
					border: 1px solid #003f98;
					background: #052165;
					box-shadow: 0 4px 6px #00000040;
					display: flex;
					padding: 10px;
					margin: 0 10px;
					text-align: center;
					cursor: pointer;
				}
				&-color {
					display: flex;
					min-width: 35px;
					height: 5px;
					border-radius: 60px;
				}
			}
		`
	]
})
export class AlarmWidgetComponent {
	public alarmCount$: Observable<AlarmsCountResponse[] | []> = this.alarmViewerService.getAlarmCount() || of([]);
	constructor(private alarmViewerService: AlarmViewerService) {}
}
