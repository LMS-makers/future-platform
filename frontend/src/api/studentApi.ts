import axiosInstance from './axiosInstance';
import type { DashboardResponse } from '../types/student';

export const studentApi = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await axiosInstance.get<DashboardResponse>('/api/students/dashboard');
    return response.data;
  },
};

export default studentApi;
