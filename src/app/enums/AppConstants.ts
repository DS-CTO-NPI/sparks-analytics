// APP constants for multiple applications
export const APP: { [key: string]: APP_DETAILS } = {
	HEMS: {
		ID: 6,
		NAME: "hems"
	},
	PPC: {
		ID: 3,
		NAME: "ppc"
	}
};

type APP_DETAILS = {
	ID: number;
	NAME: string;
};

export enum TIME {
	ZERO_SECOND = 0, // 0 second in milliseconds
	HALF_SECOND = 500, // 0.5 second in milliseconds
	ONE_SECOND = 1000, // 1 second in milliseconds
	THIRTY_SECONDS = 30 * 1000, // 30 seconds in milliseconds
	ONE_MINUTE = 60 * 1000, // 1 minute in milliseconds
	TWO_MINUTE = 2 * 60 * 1000, // 2 minute in milliseconds
	FIVE_MINUTES = 5 * 60 * 1000, // 5 minutes in milliseconds
	FIFTEEN_MINUTES = 15 * 60 * 1000, // 15 minutes in milliseconds
	THIRTY_MINUTES = 30 * 60 * 1000 // 30 minutes in milliseconds
}

export const SESSION_TIME = TIME.FIFTEEN_MINUTES;
export const SESSION_WARNING_TIME = TIME.TWO_MINUTE;
