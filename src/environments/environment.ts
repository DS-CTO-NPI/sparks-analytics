const getEnvironmentUrl = (): string => {
	const API_GATEWAY_PORT = "9191";
	const { hostname } = window.location;
	return `https://${hostname}:${API_GATEWAY_PORT}`;
};

export const environment = {
	appId: require("../../package.json").appId,
	name: require("../../package.json").application,
	description: require("../../package.json").description,
	version: require("../../package.json").version,
	baseUrl: getEnvironmentUrl(),
	production: false
};

export const getEndpointUrl = (url: string): string => `${environment.baseUrl}${url}`;
