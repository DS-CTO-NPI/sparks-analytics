// URL constants
export enum API {
	// auth
	logout = "/common/user-service/user-login/logout/",
	// alarm service
	getAlarmCount = "/common/alarm-service/alarm-notifications/count",
	getDisplayed = "/common/alarm-service/alarm-notifications/not-displayed",
	// controller service
	codeType = "/common/user-service/codes/code-type",
	hmiStatus = "/hemsService/poi/getHMIStatus",
	emergencyStop = "/hemsService/poi/essEmergencystop/",
	getControllerValue = "/hemsService/fileData/getcontrollerconfig"
}
