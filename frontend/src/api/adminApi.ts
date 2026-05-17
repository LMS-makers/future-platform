import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';
import type { AdminUser } from '../types/auth.types';

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    if (typeof data === 'string') return data;
    if (data && typeof data === 'object') {
      return (data as Record<string, unknown>).message as string
        || (data as Record<string, unknown>).error as string
        || error.message;
    }
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
}

const FIELD_MAP: Record<string, string> = {
  fullName: 'full_name',
  nationalId: 'national_id',
  dateOfBirth: 'date_of_birth',
  universityId: 'university_id',
};

function mapUser(raw: Record<string, unknown>): AdminUser {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    result[FIELD_MAP[key] || key] = value;
  }
  return result as unknown as AdminUser;
}

export interface AddUserPayload {
  full_name: string;
  email: string;
  role: string;
  password: string;
  national_id: string;
  date_of_birth: string;
  phone: string;
  address: string;
  gender: 'male' | 'female';
}

export interface UpdateUserPayload extends Partial<AddUserPayload> {}

export interface CreateStudentPayload {
  full_name: string;
  email: string;
  role: string;
  password: string;
  national_id: string;
  date_of_birth: string;
  phone: string;
  address: string;
  gender: 'male' | 'female';
  student_code: string;
  department: 'cs' | 'is' | 'it' | 'general';
  level: number;
  semester: number;
  completed_credit_hours: number;
  gpa: number;
  cgpa: number;
  high_school_type: 'science_section' | 'mathematics_section' | 'general_section';
  high_school_score: number;
  high_school_degree: number;
  high_school_year: number;
}

export const adminApi = {
  getAllUsers: async (): Promise<AdminUser[]> => {
    try {
      const response = await axiosInstance.get<Record<string, unknown> | Record<string, unknown>[]>('/api/users/all');
      const raw = Array.isArray(response.data)
        ? response.data
        : (response.data as Record<string, unknown>).users as Record<string, unknown>[]
          || (response.data as Record<string, unknown>).data as Record<string, unknown>[]
          || [];
      return raw.map(mapUser);
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  addUser: async (data: AddUserPayload): Promise<AdminUser> => {
    const endpoint = data.role === 'doctor' ? '/api/instructors' : '/api/users/add';
    try {
      const response = await axiosInstance.post<Record<string, unknown>>(endpoint, data);
      return mapUser(response.data);
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  createStudent: async (data: CreateStudentPayload): Promise<AdminUser> => {
    const payload = {
      user: {
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        national_id: data.national_id,
        date_of_birth: data.date_of_birth,
        phone: data.phone,
        address: data.address,
        gender: data.gender,
      },
      student_code: data.student_code,
      department: data.department,
      level: data.level,
      semester: data.semester,
      completed_credit_hours: data.completed_credit_hours,
      gpa: data.gpa,
      cgpa: data.cgpa,
      high_school_type: data.high_school_type,
      high_school_score: data.high_school_score,
      high_school_degree: data.high_school_degree,
      high_school_year: data.high_school_year,
    };
    try {
      const response = await axiosInstance.post<Record<string, unknown>>('/api/students/create', payload);
      return mapUser(response.data);
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  updateUser: async (id: string, data: UpdateUserPayload): Promise<AdminUser> => {
    try {
      const response = await axiosInstance.patch<Record<string, unknown>>(`/api/users/update/${id}`, data);
      return mapUser(response.data);
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/users/delete/${id}`);
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getUsersCount: async (): Promise<number> => {
    const response = await axiosInstance.get<{ count?: number; total?: number } | number>('/api/users/count');
    if (typeof response.data === 'number') return response.data;
    return response.data?.count ?? response.data?.total ?? 0;
  },

  getStudentsCount: async (): Promise<number> => {
    const response = await axiosInstance.get<{ count?: number; total?: number } | number>('/api/students/count');
    if (typeof response.data === 'number') return response.data;
    return response.data?.count ?? response.data?.total ?? 0;
  },
};
