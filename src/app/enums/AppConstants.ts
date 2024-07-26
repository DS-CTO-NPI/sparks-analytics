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
