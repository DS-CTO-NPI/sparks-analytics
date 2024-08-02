import app from "../../package.json";

const getEnvironmentUrl = (): string => {
	const API_GATEWAY_PORT = "9191";
	const { hostname } = window.location;
	return `https://${hostname}:${API_GATEWAY_PORT}`;
};

export const environment = {
	appId: app.appId,
	name: app.application,
	description: app.description,
	version: app.version,
	baseUrl: getEnvironmentUrl(),
	production: false,
	env: "dev"
};

export const getEndpointUrl = (url: string): string => `${environment.baseUrl}${url}`;
