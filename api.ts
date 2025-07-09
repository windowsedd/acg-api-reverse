require("dotenv").config();
import axios, { AxiosError, AxiosResponse } from "axios";
import { getContentResponse, getCouponResponse, getOrderByIdResponse, getOrderResponse, getProfileResponse, getTicketTypeResponse, LoginResponse } from "./types/index";
interface ApiError {
	name: string;
	description: string;
	details?: Record<string, any>;
}

interface ErrorResponse {
	error: ApiError;
}

interface OrderPayload {
	ticketTypeId: string;
	quantity: number;
	couponCode?: string;
	paymentMethod?: string;
	additionalData?: Record<string, any>;
}

interface OrderPostResponse {
	result: string;
	data?: {
		orderId: string;
		status: string;
		paymentUrl?: string;
	};
	message?: string;
}

// Login parameters interface
interface LoginParams {
	email: string;
	password: string;
}

// Order by ID parameters interface
interface OrderByIdParams {
	orderId: string;
}

// Post order parameters interface
interface PostOrderParams {
	token: string;
	payload: OrderPayload;
}

export default class API {
	private readonly baseUrl: string;
	public token: string;

	constructor() {
		this.baseUrl = "https://acg23-api.acghk.cc";
		this.token = "";
	}

	/**
	 * Authenticate user with email and password
	 * @param params - Login parameters containing username and password
	 * @returns Promise<LoginResponse | null> - Login response or null if failed
	 */
	async Login({ email, password }: LoginParams): Promise<LoginResponse | null> {
		try {
			const login_response: AxiosResponse<LoginResponse> = await axios.post(`${this.baseUrl}/v1/auth/login`, {
				email: email,
				password: password,
				expoPushToken: process.env.expoPushToken,
				appCheckToken: process.env.appCheckToken,
			});

			if (login_response.data.result === "success") {
				this.token = login_response.data.token ?? "";
				return login_response.data;
			} else {
				throw new Error("Login failed: " + login_response.data.message);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error("Login failed:", error.response?.data?.message || error.message);
			} else if (error instanceof Error) {
				console.error("Login failed:", error.message);
			} else {
				console.error("Login failed:", String(error));
			}
			return null;
		}
	}

	/**
	 * Retrieve content from the API
	 * @param params - Parameters containing authentication token
	 * @returns Promise<getContentResponse | null> - Content response or null if failed
	 */
	async viewContent(): Promise<getContentResponse | null> {
		try {
			const response: AxiosResponse<getContentResponse> = await axios.get(`${this.baseUrl}/v1/app/content`, {
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			});

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error("Error viewing content:", error.response?.data?.message || error.message);
			} else if (error instanceof Error) {
				console.error("Error viewing content:", error.message);
			} else {
				console.error("Error viewing content:", String(error));
			}
			return null;
		}
	}

	/**
	 * Retrieve all orders for the authenticated user
	 * @param params - Parameters containing authentication token
	 * @returns Promise<getOrderResponse | null> - Orders response or null if failed
	 */
	async getOrders(): Promise<getOrderResponse | null> {
		try {
			const response: AxiosResponse<getOrderResponse> = await axios.get(`${this.baseUrl}/v1/member/orders`, {
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			});

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error("Error retrieving order:", error.response?.data?.message || error.message);
			} else if (error instanceof Error) {
				console.error("Error retrieving order:", error.message);
			} else {
				console.error("Error retrieving order:", String(error));
			}
			return null;
		}
	}

	/**
	 * Retrieve a specific order by ID
	 * @param params - Parameters containing authentication token and order ID
	 * @returns Promise<getOrderByIdResponse | null> - Order response or null if failed
	 */
	async getOrderById({ orderId }: OrderByIdParams): Promise<getOrderByIdResponse | null> {
		try {
			const response: AxiosResponse<getOrderByIdResponse> = await axios.get(`${this.baseUrl}/v1/member/orders/${orderId}`, {
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			});
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error("Error retrieving order by ID:", error.response?.data?.message || error.message);
			} else if (error instanceof Error) {
				console.error("Error retrieving order by ID:", error.message);
			} else {
				console.error("Error retrieving order by ID:", String(error));
			}
			return null;
		}
	}

	/**
	 * Retrieve user profile information
	 * @param params - Parameters containing authentication token
	 * @returns Promise<getProfileResponse | null> - Profile response or null if failed
	 */
	async getProfile(): Promise<getProfileResponse | null> {
		try {
			const response: AxiosResponse<getProfileResponse> = await axios.get(`${this.baseUrl}/v1/member/profile`, {
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			});

			console.log("Profile retrieved successfully:", response.data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error("Error retrieving profile:", error.response?.data?.message || error.message);
			} else if (error instanceof Error) {
				console.error("Error retrieving profile:", error.message);
			} else {
				console.error("Error retrieving profile:", String(error));
			}
			return null;
		}
	}

	/**
	 * Retrieve available ticket types
	 * @param params - Parameters containing authentication token
	 * @returns Promise<getTicketTypeResponse | null> - Ticket types response or null if failed
	 */
	async getTicketType(): Promise<getTicketTypeResponse | null> {
		try {
			const response: AxiosResponse<getTicketTypeResponse> = await axios.get(`${this.baseUrl}/v1/member/ticketTypes`, {
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			});

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error("Error retrieving ticket types:", error.response?.data?.message || error.message);
			} else if (error instanceof Error) {
				console.error("Error retrieving ticket types:", error.message);
			} else {
				console.error("Error retrieving ticket types:", String(error));
			}
			return null;
		}
	}

	/**
	 * Create a new order
	 * @param params - Parameters containing authentication token and order payload
	 * @returns Promise<OrderPostResponse | ErrorResponse | null> - Order response, error response, or null if failed
	 */
	async postMemberOrders({ payload }: PostOrderParams): Promise<OrderPostResponse | ErrorResponse | null> {
		try {
			const response: AxiosResponse<OrderPostResponse> = await axios.post(
				`${this.baseUrl}/v1/member/orders`,
				{
					...payload,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.token}`,
					},
				}
			);

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError && error.response?.data) {
				console.error("Error posting order:", error.response.data);

				const errorData = error.response.data;
				if (errorData.error) {
					return {
						error: {
							name: errorData.error.name,
							description: errorData.error.description,
							details: errorData.error.details,
						},
					};
				}
			}

			if (error instanceof Error) {
				console.error("Error posting order:", error.message);
			} else {
				console.error("Error posting order:", String(error));
			}
			return null;
		}
	}

	/**
	 * Retrieve available coupons for the authenticated user
	 * @param params - Parameters containing authentication token
	 * @returns Promise<getCouponResponse | null> - Coupons response or null if failed
	 */
	async getCoupons(): Promise<getCouponResponse | null> {
		try {
			const response: AxiosResponse<getCouponResponse> = await axios.get(`${this.baseUrl}/v1/member/coupons`, {
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			});

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error("Error retrieving coupons:", error.response?.data?.message || error.message);
			} else if (error instanceof Error) {
				console.error("Error retrieving coupons:", error.message);
			} else {
				console.error("Error retrieving coupons:", String(error));
			}
			return null;
		}
	}
}
