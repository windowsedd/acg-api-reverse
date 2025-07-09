export interface getTicketTypeResponse {
	current_page: number;
	items: Item[];
	items_per_page: number;
	page_count: number;
	total_item_count: number;
	coming_soon: any[];
}

export interface Item {
	id: string;
	title: Description;
	tags: Tags;
	type: string;
	status: string;
	startAt: Date;
	expiredAt: Date;
	maxPurchaseQuantity: number;
	price: number;
	ordering: number;
	themeColor: string;
	terms: Description;
	halls: number[];
	description?: Description;
	image?: string;
	imageByLang?: Description;
	dates?: Date[];
}

export interface Description {
	"zh-Hans": string;
	en: string;
	"zh-Hant": string;
}

export interface Tags {
	"zh-Hans": string[];
	en: string[];
	"zh-Hant": string[];
}
