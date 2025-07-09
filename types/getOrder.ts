export interface getOrderResponse {
	current_page: number;
	items: Item[];
	items_per_page: number;
	page_count: number;
	total_item_count: number;
}

export interface Item {
	id: string;
	orderNumber: string;
	status: string;
	createdAt: Date;
	memberId: string;
}
