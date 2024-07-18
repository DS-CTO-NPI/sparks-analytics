export const NAV: any[] = [
	{
		name: "Dashboard",
		routerLink: "/plant-dashboard",
		isLanding: true,
		children: []
	},
	{
		name: "Administration",
		routerLink: "/administration",
		isLanding: false,
		children: [
			{
				name: "User Management",
				routerLink: "user-management"
			}
		]
	},
	{
		name: "Alarm Viewer",
		routerLink: "alarm-viewer",
		isLanding: false,
		children: []
	},
	{
		name: "Notification Viewer",
		routerLink: "notification-viewer",
		isLanding: false,
		children: []
	},
	{
		name: "Historian",
		routerLink: "/historian",
		isLanding: false,
		children: [
			{
				name: "Historian Configuration",
				routerLink: "historian"
			},
			{
				name: "Trend Analysis",
				routerLink: "trends"
			}
		]
	},
	{
		name: "Custom Dashboard",
		routerLink: "custom-dashboard",
		isLanding: false,
		children: []
	}
];
