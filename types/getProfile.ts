export interface getProfileResponse {
	email: string;
	memberNumber: string;
	status: string;
	lastLoggedInAt: Date;
	lastName: string;
	firstName: string;
	gender: string;
	yearOfBirth: string;
	monthOfBirth: string;
	countryCode: string;
	phone: string;
	country: string;
	systemNotification: SystemNotification;
	marketingNotification: MarketingNotification;
}

export interface MarketingNotification {
	sms: boolean;
	phone: boolean;
	email: boolean;
}

export interface SystemNotification {
	phone: boolean;
	email: boolean;
}
