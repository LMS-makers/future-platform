export interface ProgressCourse {
  id: string;
  course_code: string;
  course_name: string;
  course_description: string;
  credit_hours: number;
  level: number;
  semester: number;
  department: string;
  min_credit_hours?: number;
  min_gpa?: number;
}

export interface CoursesStats {
  totalCourses: number;
  progressCourses: ProgressCourse[];
}

export interface StudentInfo {
  name: string;
  code: string;
  level: number;
  semester: number;
  department: string;
  cgpa: number;
  gpa: number;
}

export interface StudentDashboardData {
  student: StudentInfo;
  coursesStats: CoursesStats;
}

export interface DashboardResponse {
  message: string;
  data: StudentDashboardData;
}
