import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Observable, Subject, takeUntil } from "rxjs";
import { ControllerTypeData } from "./model/Controller";
import { ControllerService } from "./service/controller-widget.service";

@Component({
	selector: "des-controller-widget",
	templateUrl: "./controller-widget.component.html",
	styleUrls: ["./controller-widget.component.scss"]
})
export class ControllerWidgetComponent implements OnInit, OnDestroy {
	destroy$: Subject<boolean> = new Subject<boolean>();
	@ViewChild("essEmergencyModal") essEmergencyModal!: ModalDirective;
	@ViewChild("setpointModal") setpointModal!: ModalDirective;

	public essunhealthy: string[] = [];
	ppcunhealthy: any;
	public ppcStyle: any;
	public essStyle: any;
	public essStatus = "2/7";
	public ppcStatus = "1/1";
	public refreshFrequency = 6;
	public millisecTosec = 1000;
	public statustimeout: any;
	public bmsAvailability: any;

	public pcsData = {
		unhealthypcs: [
			{ controller: "ess1", dname: "pcs1" },
			{ controller: "ess2", dname: "pcs2" }
		],
		status: "2/7",
		pcsStyle: false
	};
	public modeOfOperation = "Auto";
	public bmsStatus = "2/7";
	public pcsStatus = "Good";
	public controllerState = "Test";
	public bmsData = {
		unhealthybms: [
			{ controller: "ess1", dname: "bms1" },
			{ controller: "ess2", dname: "bms2" }
		],
		status: "2/7",
		bmsStyle: false
	};
	isEmergencyToggle: any;
	estopStatus = "1";
	eStopImg = "./assets/images/controller/Stop.png";
	Status = "STOP";
	public hmiStatusTimout: any;

	isEmergencyCheck: any;
	isEmergencyName: any;
	isEmergencytoaster: any;

	public showSetpointModel = false;
	public controllerList$!: Observable<ControllerTypeData>;

	constructor(private router: Router, public controllerService: ControllerService, private toaster: ToastrService) {}

	ngOnInit(): void {
		// this.getControllerStatus();
		this.ppcEssStatus();
		this.getHMIStatus();
	}

	getHMIStatus() {
		this.controllerService
			.getHMIStatus()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (res: any) => {
					let arr = res;
					this.modeOfOperation = arr.OperationMode == 3 ? "Auto" : arr.OperationMode == 2 ? "Manual" : arr.OperationMode == 1 ? "Maintenance" : "N/A";
					this.bmsData = this.getBmsStatus(res.BMSStatusArray);
					this.pcsData = this.getPcsStatus(res.PCSStatusArray);
					this.bmsStatus = this.bmsData.status;
					this.bmsAvailability = res.BMSHealth;
					let commQuality = this.getpcsComm(res.PCSStatusArray);
					this.pcsStatus = commQuality == 0 ? "Good" : commQuality == 1 ? "Bad" : "N/A";
					this.controllerState;
					this.isEmergencyToggle = res.Emergency_Stop == "1" ? true : false;
					this.estopStatus = res.Emergency_Stop;
					this.eStopImg = res.Emergency_Stop == "0" ? "./assets/images/Start.png" : "./assets/images/Stop.png";
					this.Status = res.Emergency_Stop == "0" ? "START" : "STOP";
					clearTimeout(this.hmiStatusTimout);
					this.hmiStatusTimout = setTimeout(() => {
						this.getHMIStatus();
					}, this.refreshFrequency * this.millisecTosec);
				},
				error: (_error: any) => {
					clearTimeout(this.hmiStatusTimout);
					this.hmiStatusTimout = setTimeout(() => {
						this.getHMIStatus();
					}, this.refreshFrequency * this.millisecTosec);
				}
			});
	}

	getBmsStatus(BMSStatusArray: any) {
		let array = Object.keys(BMSStatusArray);
		let healthyBms = [];
		let unhealthybms = [];
		let unhealthybms1: any = [];
		for (let i = 0; i < array.length; i++) {
			if (BMSStatusArray[array[i]].toString() == "0") {
				healthyBms.push(array[i]);
			}
			if (BMSStatusArray[array[i]].toString() == "1" || BMSStatusArray[array[i]].toString() == "-1") {
				unhealthybms.push(array[i]);
			}
		}
		unhealthybms.forEach((a) => {
			let obj: any = {};
			let t = a.replace("ess", "bms");
			obj["controller"] = a;
			obj["dname"] = t;
			unhealthybms1.push(obj);
		});

		return {
			unhealthybms: unhealthybms1,
			status: healthyBms.length + "/" + array.length,
			bmsStyle: healthyBms.length == array.length ? true : false
		};
	}

	ppcEssStatus() {
		this.essunhealthy = [];
		this.ppcunhealthy = [];
		this.controllerService
			.getControllerValue()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (response: any) => {
					let ppccontroller = [];
					let esscontroller = [];
					let ppcActiveController = [];
					let essActiveController = [];
					response.data.forEach((a: any) => {
						if (a.ControllerType.toLowerCase() == "ppc") {
							ppccontroller.push(a);
							if (a.Enable) {
								ppcActiveController.push(a);
							} else {
								this.ppcunhealthy.push(a.ControllerName);
							}
						}
						if (a.ControllerType.toLowerCase() == "ess") {
							esscontroller.push(a);
							if (a.Enable) {
								essActiveController.push(a);
							} else {
								this.essunhealthy.push(a.ControllerName);
							}
						}

						this.ppcStatus = ppcActiveController.length + "/" + ppccontroller.length;
						this.essStatus = essActiveController.length + "/" + esscontroller.length;
						this.ppcStyle = ppcActiveController.length == ppccontroller.length ? true : false;
						this.essStyle = essActiveController.length == esscontroller.length ? true : false;
						clearTimeout(this.statustimeout);
						this.statustimeout = setTimeout(() => {
							this.ppcEssStatus();
						}, this.refreshFrequency * this.millisecTosec);
					});
				},
				error: (_error: any) => {
					clearTimeout(this.statustimeout);
					this.statustimeout = setTimeout(() => {
						this.ppcEssStatus();
					}, this.refreshFrequency * this.millisecTosec);
				}
			});
	}

	getPcsStatus(PCSStatusArray: any) {
		let array = Object.keys(PCSStatusArray);
		let healthyPcs = [];
		let unhealthypcs = [];
		let unhealthypcs1: any = [];
		for (let i = 0; i < array.length; i++) {
			if (PCSStatusArray[array[i]].toString() == "0") {
				healthyPcs.push(array[i]);
			}
			if (PCSStatusArray[array[i]].toString() == "1" || PCSStatusArray[array[i]].toString() == "-1") {
				unhealthypcs.push(array[i]);
			}
		}
		unhealthypcs.forEach((a: any) => {
			let obj: any = {};
			let t = a.replace("ess", "pcs");
			obj["controller"] = a;
			obj["dname"] = t;
			unhealthypcs1.push(obj);
		});

		return {
			unhealthypcs: unhealthypcs1,
			status: healthyPcs.length + "/" + array.length,
			pcsStyle: healthyPcs.length == array.length ? true : false
		};
	}

	getpcsComm(PCSStatusArray: any) {
		let array = Object.keys(PCSStatusArray);
		for (let i = 0; i < array.length; i++) {
			if (PCSStatusArray[array[i]] == "-1" || PCSStatusArray[array[i]] == "1") {
				return 1;
			}
		}
		return 0;
	}

	toggleEmergency(e?: any) {
		this.isEmergencyCheck = this.estopStatus == "1" ? "0" : "1";
		this.isEmergencyName = this.estopStatus == "1" ? "proceed for" : "release";
		this.isEmergencytoaster = this.estopStatus == "1" ? "proceeded" : "released";
		this.isEmergencyToggle = e;
		this.essEmergencyModal.show();
	}

	getEmergencyStatus() {
		this.controllerService
			.getEmergencyStatus(this.isEmergencyCheck)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (res: any) => {
					this.eStopImg = this.isEmergencyCheck == "0" ? "./assets/images/controller/Start.png" : "./assets/images/controller/Stop.png";
					this.Status = this.isEmergencyCheck == "0" ? "START" : "STOP";

					if (res.data == "success") {
						this.toaster.success("Emergency Stop " + this.isEmergencytoaster + " successfully.");
					} else {
						this.toaster.error("App Error");
					}
					this.essEmergencyModal.hide();
				},
				error: (_error: any) => {
					// console.log(_error);
					this.toaster.error("App Error");
					this.essEmergencyModal.hide();
				}
			});
	}

	setpointUpdate(_event: any) {
		this.closeSetpointModel();
	}

	openSetpointModel() {
		this.showSetpointModel = true;
		setTimeout(() => {
			this.setpointModal.show();
		}, 200);
	}

	closeSetpointModel() {
		localStorage.removeItem("hems-poiSetpointDBSelected");
		this.setpointModal.hide();
		this.showSetpointModel = false;
	}

	navigatetoESS(e: any) {
		this.controllerService.isDBChanged.next(true);
		sessionStorage.setItem("hems-dbName", e);
		this.router.navigate(["plant-dashboard"]);
	}

	// getControllerStatus() {
	// 	this.controllerList$ = this.messageService.getControllerStatusInterval();
	// }

	ngOnDestroy(): void {
		this.controllerService.isDBChanged.next(false);
		clearTimeout(this.statustimeout);
		clearTimeout(this.hmiStatusTimout);
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
