import axiosInstance from './axiosInstance';
import type {
  InitLoginResponse,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../types/auth.types';

export const authApi = {
  initLogin: async (nationalId: string): Promise<InitLoginResponse> => {
    const response = await axiosInstance.post<InitLoginResponse>(
      '/api/users/auth/init-login',
      { national_id: nationalId }
    );
    return response.data;
  },

  setPassword: async (newPassword: string, confirmPassword: string, accessToken: string): Promise<{ accessToken: string }> => {
    const response = await axiosInstance.post('/api/users/auth/set-password', 
      { newPassword, confirmPassword },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  },

  login: async (nationalId: string, password: string, accessToken: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      '/api/users/auth/login',
      { national_id: nationalId, password },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axiosInstance.post<RegisterResponse>(
      '/api/users/auth/register',
      data
    );
    return response.data;
  },
};

export default authApi;
