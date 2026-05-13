import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AxiosError } from 'axios';
import type { AuthUser, InitLoginResponse } from '../types/auth.types';
import { storage } from '../utils/storage';
import authApi from '../api/authApi';
import { ROUTES } from '../utils/constants';

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response?.status === 404) {
      return 'User not found. Please return to admin.';
    }
    if (error.response?.status === 401) {
      return 'Invalid credentials. Please try again.';
    }
    if (error.response?.status === 400) {
      return error.response.data?.message || 'Bad request. Please check your input.';
    }
    return error.response?.data?.message || 'Something went wrong. Please try again.';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initLogin: (nationalId: string) => Promise<InitLoginResponse>;
  setPassword: (newPassword: string, confirmPassword: string, accessToken: string) => Promise<{ accessToken: string }>;
  login: (nationalId: string, password: string, accessToken: string) => Promise<AuthUser>;
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
          console.log('init-login response:', response);
          storage.setTempNationalId(nationalId);
          storage.setTempAccessToken(response.accessToken);
          set({ isLoading: false });
          return response;
        } catch (error: unknown) {
          console.error('init-login error:', error);
          const message = getErrorMessage(error);
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      setPassword: async (newPassword: string, confirmPassword: string, accessToken: string) => {
        set({ isLoading: true, error: null });
        try {
          console.log('setPassword called:', { newPassword, confirmPassword, accessToken });
          const response = await authApi.setPassword(newPassword, confirmPassword, accessToken);
          storage.setTempAccessToken(response.accessToken);
          set({ isLoading: false });
          return response;
        } catch (error: unknown) {
          const message = getErrorMessage(error);
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      login: async (nationalId: string, password: string, accessToken: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(nationalId, password, accessToken);
          const jwt = response.token || response.accessToken || '';
          console.log('=== LOGIN FULL RESPONSE ===', response);
          console.log('=== LOGIN RESPONSE KEYS ===', Object.keys(response));
          console.log('=== LOGIN USER OBJECT ===', response.user);
          console.log('=== LOGIN USER KEYS ===', Object.keys(response.user));
          console.log('=== LOGIN USER.name ===', response.user?.name);

          const rawUser = response.user as unknown as Record<string, unknown>;
          const mappedUser: AuthUser = {
            id: typeof rawUser.id === 'number' ? rawUser.id : Number(rawUser.id) || 0,
            name: (rawUser.name as string) || (rawUser.full_name as string) || (rawUser.student_name as string) || (rawUser.username as string) || '',
            nationalId: (rawUser.nationalId as string) || (rawUser.national_id as string) || (rawUser.nationalId as string) || nationalId,
            role: (rawUser.role as 'admin' | 'user') || 'user',
          };

          console.log('=== MAPPED USER ===', mappedUser);

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
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const getRedirectRoute = (user: AuthUser | null): string => {
  if (!user) return ROUTES.LOGIN;
  return user.role === 'admin' ? ROUTES.DASHBOARD : ROUTES.HOME_PAGE;
};
