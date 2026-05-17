export interface AuthUser {
  id: number | string;
  email: string;
  name?: string;
  role: 'admin' | 'doctor' | 'student';
}

export interface InitLoginResponse {
  requiresPasswordSetup: boolean;
  accessToken: string;
}

export interface LoginResponse {
  accessToken: string;
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

export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
  phone?: string;
  national_id?: string;
  date_of_birth?: string;
  address?: string;
  gender?: string;
  avatar?: string;
}
