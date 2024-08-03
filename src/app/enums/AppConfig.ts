// URL constants
export enum API {
	// auth
	LOGOUT = "/common/user-service/user-login/logout/",
	// alarm service
	GET_ALARM_COUNT = "/common/alarm-service/alarm-notifications/count",
	GET_ALARM_NOTIFICATION = "/common/alarm-service/alarm-notifications/not-displayed",
	// controller service
	GET_CODE_TYPE = "/common/user-service/codes/code-type",
	GET_HMI_STATUS = "/hemsService/poi/getHMIStatus",
	EMERGENCY_STOP = "/hemsService/poi/essEmergencystop/",
	GET_CONTROLLER_VALUE = "/hemsService/fileData/getcontrollerconfig"
}
