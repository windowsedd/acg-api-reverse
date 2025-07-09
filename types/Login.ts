export interface LoginResponse {
	result: "success" | "error";
	token?: string;
	message?: string;
	error?: string;
}
