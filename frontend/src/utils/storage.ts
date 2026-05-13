const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';
const TEMP_NATIONAL_ID_KEY = 'temp_national_id';
const TEMP_ACCESS_TOKEN_KEY = 'temp_access_token';
const STUDENT_ACCESS_KEY = 'student_access_token';

export const storage = {
  setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  removeToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  setUser(user: string): void {
    localStorage.setItem(AUTH_USER_KEY, user);
  },

  getUser(): string | null {
    return localStorage.getItem(AUTH_USER_KEY);
  },

  removeUser(): void {
    localStorage.removeItem(AUTH_USER_KEY);
  },

  setTempNationalId(nationalId: string): void {
    sessionStorage.setItem(TEMP_NATIONAL_ID_KEY, nationalId);
  },

  getTempNationalId(): string | null {
    return sessionStorage.getItem(TEMP_NATIONAL_ID_KEY);
  },

  removeTempNationalId(): void {
    sessionStorage.removeItem(TEMP_NATIONAL_ID_KEY);
  },

  setTempAccessToken(token: string): void {
    sessionStorage.setItem(TEMP_ACCESS_TOKEN_KEY, token);
  },

  getTempAccessToken(): string | null {
    return sessionStorage.getItem(TEMP_ACCESS_TOKEN_KEY);
  },

  removeTempAccessToken(): void {
    sessionStorage.removeItem(TEMP_ACCESS_TOKEN_KEY);
  },

  clearAuth(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  },

  clearTemp(): void {
    sessionStorage.removeItem(TEMP_NATIONAL_ID_KEY);
    sessionStorage.removeItem(TEMP_ACCESS_TOKEN_KEY);
  },

  setStudentAccessToken(token: string): void {
    localStorage.setItem(STUDENT_ACCESS_KEY, token);
  },

  getStudentAccessToken(): string | null {
    return localStorage.getItem(STUDENT_ACCESS_KEY);
  },

  removeStudentAccessToken(): void {
    localStorage.removeItem(STUDENT_ACCESS_KEY);
  },

  clearAll(): void {
    this.clearAuth();
    this.clearTemp();
    this.removeStudentAccessToken();
  },
};