export interface getContentResponse {
	items: Item[];
	version: Version;
	showPriorityApplicationButton: boolean;
}

export interface Item {
	id: string;
	ordering: number;
	type: string;
	updatedAt: Date;
	children: Child[];
	content?: ItemContent;
}

export interface Child {
	id: string;
	ordering: number;
	type: ChildType;
	content: ChildContent;
	updatedAt: Date;
	icon?: Title;
}

export interface ChildContent {
	body: Title;
	ctaLink?: Title;
	type: ContentType;
	title?: Title;
}

export interface Title {
	en: string;
	"zh-Hans": string;
	"zh-Hant": string;
}

export enum ContentType {
	Image = "Image",
	Link = "Link",
}

export enum ChildType {
	Carousel = "Carousel",
	Content = "Content",
	Image = "Image",
}

export interface ItemContent {
	type: string;
	title: Title;
}

export interface Version {
	number: string;
	ios: Android;
	android: Android;
}

export interface Android {
	buildNumber: number;
	url: string;
}
