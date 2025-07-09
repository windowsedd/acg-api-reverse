export interface getOrderByIdResponse {
	id: string;
	orderNumber: string;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	memberId: string;
	sentCount: number;
	paymentMethod: PaymentMethod;
	subTotal: number;
	discount: number;
	total: number;
	orderItems: OrderItem[];
	qfpayUrl: string;
	eventName: EventName;
	eventStartDate: Date;
	eventEndDate: Date;
	paymentStatus: string;
}

export interface EventName {
	"zh-Hant": string;
	"zh-Hans": string;
	en: string;
}

export interface OrderItem {
	name: string;
	ticketTypeId: string;
	dates: Date[];
	quantity: number;
	ticketType: TicketType;
}

export interface TicketType {
	id: string;
	title: EventName;
	image: string;
	imageByLang: EventName;
	tags: Tags;
	type: string;
	status: string;
	startAt: Date;
	expiredAt: Date;
	maxPurchaseQuantity: number;
	price: number;
	ordering: number;
	themeColor: string;
	terms: EventName;
	dates: Date[];
	halls: number[];
}

export interface Tags {
	"zh-Hans": string[];
	en: string[];
	"zh-Hant": string[];
}

export interface PaymentMethod {}
