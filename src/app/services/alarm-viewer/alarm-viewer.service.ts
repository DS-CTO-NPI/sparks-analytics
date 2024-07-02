import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventSourcePolyfill } from "ng-event-source";
import { Observable } from "rxjs";
import { API } from "src/app/enums/AppConfig";
import { getEndpointUrl } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class AlarmViewerService {
	public controllerName: string = "na";
	public displayedAlarmEventSource!: EventSourcePolyfill;
	public alarmCountEventSource!: EventSourcePolyfill;
	public displayedObserverSubscriber: any;
	public alarmCountObserverSubscriber: any;

	constructor(private http: HttpClient) {}

	public getOptions(controllerName: string) {
		const dbName: string = sessionStorage.getItem("dbName") || controllerName;
		return {
			headers: {
				Authorization: "Bearer" + " " + sessionStorage.getItem("hems-authToken"),
				"Cache-Control": "no-cache, no-store, must-revalidate",
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "DENY",
				"Access-Control-Allow-Origin": "*",
				defaultDb: "hems",
				database: dbName,
				hostDB: "hems",
				applicationId: "6"
			}
		};
	}

	public getAlarmCount(): Observable<any> {
		return new Observable<any>((observer) => {
			const options: any = this.getOptions("hems");
			if (this.alarmCountEventSource) {
				this.alarmCountEventSource.close();
			}
			if (this.alarmCountObserverSubscriber) {
				this.alarmCountObserverSubscriber.complete();
				this.alarmCountObserverSubscriber.unsubscribe();
			}
			this.alarmCountObserverSubscriber = observer;
			this.alarmCountEventSource = new EventSourcePolyfill(getEndpointUrl(API.getAlarmCount), options);

			this.alarmCountEventSource.onmessage = (event) => {
				let json: any = JSON.parse(event.data);
				observer.next(json);
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

	public getDisplayed(controllerName: string): Observable<any> {
		return new Observable<any>((observer) => {
			const options: any = this.getOptions(controllerName);
			if (this.displayedAlarmEventSource) {
				this.displayedAlarmEventSource.close();
			}
			if (this.displayedObserverSubscriber) {
				this.displayedObserverSubscriber.complete();
				this.displayedObserverSubscriber.unsubscribe();
			}
			this.displayedObserverSubscriber = observer;
			this.displayedAlarmEventSource = new EventSourcePolyfill(getEndpointUrl(API.getDisplayed), options);

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

	public getDropdownCodes(term: string, options?: any): Observable<any> {
		return this.http.get<any>(getEndpointUrl(API.codeType) + "?codeType=" + term, { params: options });
	}
}
