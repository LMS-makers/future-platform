import { AxiosError } from "axios";

/**
 * Extract user-friendly error message from various error types
 */
export function getErrorMessage(error: unknown): string {
	if (error instanceof AxiosError) {
		const statusCode = error.response?.status;
		const errorData = error.response?.data;

		if (statusCode === 404) {
			return "User not found. Please return to admin.";
		}
		if (statusCode === 401) {
			return "Invalid credentials. Please try again.";
		}
		if (statusCode === 400) {
			return errorData?.message || "Bad request. Please check your input.";
		}

		return errorData?.message || "Something went wrong. Please try again.";
	}

	if (error instanceof Error) {
		return error.message;
	}

	return "Something went wrong. Please try again.";
}

/**
 * Validate password field
 */
export function validatePassword(password: string): {
	isValid: boolean;
	message?: string;
} {
	if (!password) {
		return { isValid: false, message: "Please enter a password" };
	}

	if (password.length < 8) {
		return {
			isValid: false,
			message: "Password must be at least 8 characters long",
		};
	}

	return { isValid: true };
}

/**
 * Validate password confirmation
 */
export function validatePasswordMatch(
	password: string,
	confirmPassword: string,
): { isValid: boolean; message?: string } {
	if (password !== confirmPassword) {
		return { isValid: false, message: "Passwords do not match" };
	}

	return { isValid: true };
}
