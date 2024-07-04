import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { API } from "src/app/enums/AppConfig";
import { getEndpointUrl } from "src/environments/environment";
@Injectable({
	providedIn: "root"
})
export class ControllerService {
	private subject = new Subject<any>();
	private subject1 = new Subject<any>();
	public isDBChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient) {}

	public getDropdownCodes(term: string, options?: any): Observable<any> {
		return this.http.get<any>(getEndpointUrl(API.codeType) + "?codeType=" + term, { params: options });
	}

	public getHMIStatus(): Observable<any> {
		return this.http.get(getEndpointUrl(API.hmiStatus));
	}

	public getEmergencyStatus(status: any): Observable<any> {
		return this.http.get(getEndpointUrl(API.emergencyStop) + status);
	}

	public getControllerValue(): Observable<any> {
		return this.http.get(getEndpointUrl(API.getControllerValue));
	}

	sendMessage(message: string) {
		this.subject.next({ text: message });
	}

	getMessage(): Observable<any> {
		return this.subject.asObservable();
	}

	sendControllerDetails(data: any) {
		this.subject.next({ data: data });
	}

	getControllerDetails(): Observable<any> {
		return this.subject.asObservable();
	}

	sendControllerSetting(data: any) {
		this.subject1.next({ data: data });
	}

	getControllerSetting(): Observable<any> {
		return this.subject1.asObservable();
	}
}
