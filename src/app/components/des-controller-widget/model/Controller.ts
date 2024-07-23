export interface Controller {
	Id: number;
	ControllerName: string;
	DllName: string;
	DllLocation: string;
	AppConfigfile: string | null;
	ControllerType: string;
	Description: string;
	Enable: boolean;
}

export interface ApiResponse {
	message: string;
	data: Controller[];
	messageList: null | any[];
}

export interface ControllersTypeObjectData {
	[key: string]: Controller[];
}

export interface ControllerTypeData {
	id: number;
	ControllerType: string;
	data: Controller[];
	isOpen?: boolean;
	controllerStatus?: ControllerStatus;
}

export interface ControllerStatus {
	unHealthy: string[] | [];
	healthy: string[] | [];
	status: string;
	isHealthy: boolean;
}
