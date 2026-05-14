import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AxiosError } from "axios";
import type { AuthUser, InitLoginResponse } from "../types/auth.types";
import { storage } from "../utils/storage";
import authApi from "../api/authApi";
import { ROUTES } from "../utils/constants";

/**
 * Extract error message from various error types
 */
function getErrorMessage(error: unknown): string {
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
 * Map raw API response to AuthUser type
 */
function mapResponseToUser(
	response: Record<string, unknown>,
	nationalId: string,
): AuthUser {
	const user = response.user as Record<string, unknown>;

	return {
		id: Number(user.id) || 0,
		name: (user.name ||
			user.full_name ||
			user.student_name ||
			user.username ||
			"") as string,
		nationalId: (user.nationalId || user.national_id || nationalId) as string,
		role: (user.role as "admin" | "user") || "user",
	};
}

interface AuthState {
	user: AuthUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	initLogin: (nationalId: string) => Promise<InitLoginResponse>;
	setPassword: (
		newPassword: string,
		confirmPassword: string,
		accessToken: string,
	) => Promise<{ accessToken: string }>;
	login: (
		nationalId: string,
		password: string,
		accessToken: string,
	) => Promise<AuthUser>;
	logout: () => void;
	clearError: () => void;
	initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			isLoading: false,
			error: null,

			initLogin: async (nationalId: string) => {
				set({ isLoading: true, error: null });
				try {
					const response = await authApi.initLogin(nationalId);
					storage.setTempNationalId(nationalId);
					storage.setTempAccessToken(response.accessToken);
					set({ isLoading: false });
					return response;
				} catch (error: unknown) {
					const message = getErrorMessage(error);
					set({ isLoading: false, error: message });
					throw error;
				}
			},

			setPassword: async (
				newPassword: string,
				confirmPassword: string,
				accessToken: string,
			) => {
				set({ isLoading: true, error: null });
				try {
					const response = await authApi.setPassword(
						newPassword,
						confirmPassword,
						accessToken,
					);
					storage.setTempAccessToken(response.accessToken);
					set({ isLoading: false });
					return response;
				} catch (error: unknown) {
					const message = getErrorMessage(error);
					set({ isLoading: false, error: message });
					throw error;
				}
			},

			login: async (
				nationalId: string,
				password: string,
				accessToken: string,
			) => {
				set({ isLoading: true, error: null });
				try {
					const response = await authApi.login(
						nationalId,
						password,
						accessToken,
					);
					const jwt = response.token || response.accessToken || "";
					const mappedUser = mapResponseToUser(
						response as unknown as Record<string, unknown>,
						nationalId,
					);

					storage.setToken(jwt);
					storage.setUser(JSON.stringify(mappedUser));
					storage.setStudentAccessToken(jwt);
					storage.removeTempNationalId();
					storage.removeTempAccessToken();

					set({ user: mappedUser, isAuthenticated: true, isLoading: false });
					return mappedUser;
				} catch (error: unknown) {
					const message = getErrorMessage(error);
					set({ isLoading: false, error: message });
					throw error;
				}
			},

			logout: () => {
				storage.clearAll();
				set({ user: null, isAuthenticated: false, error: null });
			},

			clearError: () => {
				set({ error: null });
			},

			initializeAuth: () => {
				const token = storage.getToken();
				const userStr = storage.getUser();

				if (token && userStr) {
					try {
						const user = JSON.parse(userStr) as AuthUser;
						set({ user, isAuthenticated: true });
						return;
					} catch {
						storage.clearAuth();
					}
				}

				set({ user: null, isAuthenticated: false });
				storage.clearAll();
				localStorage.removeItem("auth-storage");
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);

/**
 * Get redirect route based on user role
 */
export const getRedirectRoute = (user: AuthUser | null): string => {
	if (!user) return ROUTES.LOGIN;
	return user.role === "admin" ? ROUTES.DASHBOARD : ROUTES.HOME_PAGE;
};
