export interface getCouponResponse {
	active: Active[];
	past: any[];
	expired: any[];
}

export interface Active {
	id: string;
	subject: Body;
	image: string;
	imageByLang: Body;
	validText: Body;
	redeemMethod: RedeemMethod;
	validFrom: Date;
	validTo: Date;
	body: Body;
	year: number;
	ordering: number;
}

export interface Body {
	"zh-Hans": string;
	en: string;
	"zh-Hant": string;
}

export enum RedeemMethod {
	Code = "code",
}
