export interface AuthUser {
  id: number;
  name: string;
  nationalId: string;
  role: 'admin' | 'user';
}

export interface InitLoginResponse {
  requiresPasswordSetup: boolean;
  accessToken: string;
}

export interface LoginResponse {
  token: string;
  accessToken?: string;
  user: AuthUser;
}

export interface RegisterRequest {
  name: string;
  nationalId: string;
  role: 'admin' | 'user';
}

export interface RegisterResponse {
  user: AuthUser;
  message?: string;
}

export interface SetPasswordRequest {
  nationalId: string;
  password: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}