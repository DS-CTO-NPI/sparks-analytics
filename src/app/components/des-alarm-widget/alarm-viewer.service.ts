import { Injectable } from "@angular/core";
import { EventSourcePolyfill } from "ng-event-source";
import { Observable } from "rxjs";
import { API } from "src/app/enums";
import { environment, getEndpointUrl } from "src/environments/environment";

export enum AlarmType {
	CRITICAL = "Critical",
	MAJOR = "Major",
	MINOR = "Minor",
	WARNING = "Warning",
	ALL = "All"
}

export type Alarms = {
	[key in AlarmType]: number;
};
export type AlarmsCountResponse = {
	severity: string;
	value: number;
};

@Injectable({
	providedIn: "root"
})
export class AlarmViewerService {
	public displayedAlarmEventSource!: EventSourcePolyfill;
	public alarmCountEventSource!: EventSourcePolyfill;
	public displayedObserverSubscriber: any;
	public alarmCountObserverSubscriber: any;

	private getOptions() {
		const appName: string = environment.name;
		const authToken: string | null = sessionStorage.getItem(`${appName}-authToken`) || null;
		return {
			headers: {
				Authorization: `Bearer ${authToken}`,
				"Cache-Control": "no-cache, no-store, must-revalidate",
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "DENY",
				"Access-Control-Allow-Origin": "*",
				defaultDb: appName,
				database: appName,
				hostDB: appName,
				applicationId: environment.appId
			}
		};
	}

	public getAlarmCount(): Observable<any> {
		return new Observable<any>((observer) => {
			if (this.alarmCountEventSource) {
				this.alarmCountEventSource.close();
			}
			if (this.alarmCountObserverSubscriber) {
				this.alarmCountObserverSubscriber.complete();
				this.alarmCountObserverSubscriber.unsubscribe();
			}
			this.alarmCountObserverSubscriber = observer;
			this.alarmCountEventSource = new EventSourcePolyfill(getEndpointUrl(API.GET_ALARM_COUNT), this.getOptions());

			this.alarmCountEventSource.onmessage = (event) => {
				const response: any = JSON.parse(event.data);
				const alarmTableData: any = response?.data?.length ? response.data : [];
				const alarms = Object.fromEntries(Object.values(AlarmType).map((key) => [key, 0])) as Alarms;
				alarmTableData.forEach((alarm: any) => {
					const { severity } = alarm;
					if (Object.values(AlarmType).includes(severity as AlarmType)) {
						alarms[severity as AlarmType] = alarm.totalCount - alarm.clearedCount;
					}
				});
				alarms[AlarmType.ALL] = Object.values(alarms).reduce((acc, curr) => acc + curr, 0);
				const AlarmsCountResponse: AlarmsCountResponse[] = Object.entries(alarms).map(([severity, value]) => ({ severity, value }));
				observer.next(AlarmsCountResponse);
			};
			this.alarmCountEventSource.onerror = (error: any) => {
				if (this.alarmCountEventSource.readyState === 0) {
					this.alarmCountEventSource.close();
					observer.complete();
				} else {
					observer.error("EventSource error: " + error);
				}
			};
			return () => {
				console.log("Closing event source for display alarms...");
				this.alarmCountEventSource.close();
				observer.complete();
				observer.unsubscribe();
			};
		});
	}

	public getDisplayed(): Observable<any> {
		return new Observable<any>((observer) => {
			const options: any = this.getOptions();
			if (this.displayedAlarmEventSource) {
				this.displayedAlarmEventSource.close();
			}
			if (this.displayedObserverSubscriber) {
				this.displayedObserverSubscriber.complete();
				this.displayedObserverSubscriber.unsubscribe();
			}
			this.displayedObserverSubscriber = observer;
			this.displayedAlarmEventSource = new EventSourcePolyfill(getEndpointUrl(API.GET_ALARM_NOTIFICATION), options);

			this.displayedAlarmEventSource.onmessage = (event) => {
				let json: any = JSON.parse(event.data);
				observer.next(json);
			};
			this.displayedAlarmEventSource.onerror = (error: any) => {
				if (this.displayedAlarmEventSource.readyState === 0) {
					this.displayedAlarmEventSource.close();
					observer.complete();
				} else {
					observer.error("EventSource error: " + error);
				}
			};
			return () => {
				console.log("Closing event source for display alarms...");
				this.displayedAlarmEventSource.close();
				observer.complete();
				observer.unsubscribe();
			};
		});
	}
}
