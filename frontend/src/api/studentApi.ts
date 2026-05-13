import axios from 'axios';
import axiosInstance from './axiosInstance';

export interface RawGpaResponse {
  currentGpa?: number;
  cgpa?: number;
  gpaChange?: number;
  academicStanding?: string;
  overallProgress?: number;
  semester_gpa?: number;
  cumulative_gpa?: number;
  current_semester_gpa?: number;
  current_gpa?: number;
  cumulative_gpa_snake?: number;
  academic_standing?: string;
  overall_progress?: number;
  gpa?: number;
  data?: Record<string, unknown>;
  [key: string]: unknown;
}

const inFlightRequests = new Map<string, Promise<RawGpaResponse>>();

export const studentApi = {
  getDashboardGpa: async (nationalId: string): Promise<RawGpaResponse> => {
    const cacheKey = nationalId;

    const existing = inFlightRequests.get(cacheKey);
    if (existing) return existing;

    const params: Record<string, string> = { national_id: nationalId };

    const request = (async () => {
      try {
        const response = await axiosInstance.get<RawGpaResponse>('/api/students/dashboard/gpa', { params });
        console.log('=== GPA RAW RESPONSE ===', response.data);
        console.log('=== GPA FULL RESPONSE ===', response);
        console.log('=== GPA RESPONSE KEYS ===', Object.keys(response.data));
        return response.data;
      } catch (err: unknown) {
        console.error('=== GPA REQUEST FAILED ===', err);
        if (axios.isAxiosError(err)) {
          console.error('=== GPA ERROR STATUS ===', err.response?.status);
          console.error('=== GPA ERROR DATA ===', err.response?.data);
        }
        throw err;
      } finally {
        inFlightRequests.delete(cacheKey);
      }
    })();

    inFlightRequests.set(cacheKey, request);
    return request;
  },
};

export default studentApi;
