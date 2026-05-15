import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useAuthStore } from '../store/authStore';
import studentApi from '../api/studentApi';
import type { StudentDashboardData } from '../types/student';
import Sidebar from './student/Sidebar';
import StatsCard from './student/StatsCard';
import CourseCard from './student/CourseCard';
import RightPanel from './student/RightPanel';
import { schedule, tasks } from './student/data';

function deriveAcademicStanding(cgpa: number): string {
  if (cgpa >= 3.5) return 'Excellent';
  if (cgpa >= 3.0) return 'Very Good';
  if (cgpa >= 2.0) return 'Good';
  return 'At Risk';
}

function Skeleton() {
  return (
    <div className="min-h-screen flex bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <div className="w-64 bg-[#0a1d4a]" />
      <main className="flex-1 ml-64 p-8 animate-pulse">
        <div className="flex items-center justify-between mb-8">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-48" />
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl w-80" />
        </div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-72 mb-2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-96 mb-8" />
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="h-36 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          <div className="h-36 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          <div className="h-36 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          <div className="h-36 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  const { user, logout } = useAuthStore();
  const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchIdRef = useRef(0);

  const fetchDashboard = useCallback(async (fetchId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await studentApi.getDashboard();
      if (fetchIdRef.current !== fetchId) return;
      setDashboardData(response.data);
    } catch (err) {
      if (fetchIdRef.current !== fetchId) return;
      const message = err instanceof Error ? err.message : 'Failed to load dashboard data';
      setError(message);
    } finally {
      if (fetchIdRef.current === fetchId) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const fetchId = ++fetchIdRef.current;
    fetchDashboard(fetchId);
    return () => {
      fetchIdRef.current = -1;
    };
  }, [fetchDashboard]);

  const academicStanding = useMemo(() => {
    if (!dashboardData) return '—';
    return deriveAcademicStanding(dashboardData.student.cgpa);
  }, [dashboardData]);

  const handleLogout = () => {
    logout();
  };

  if (loading) return <Skeleton />;

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen flex bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <Sidebar onLogout={handleLogout} />
        <main className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="text-center space-y-4">
            <span className="material-symbols-outlined text-5xl text-red-400">error_outline</span>
            <p className="text-slate-500">{error || 'Failed to load dashboard data'}</p>
            <button
              onClick={() => {
                setError(null);
                const fetchId = ++fetchIdRef.current;
                fetchDashboard(fetchId);
              }}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  const { student, coursesStats } = dashboardData;

  const statsCards = [
    {
      icon: 'person',
      title: 'Academic Profile',
      subtitle: 'View and edit your academic information',
      badge: `CGPA: ${student.cgpa.toFixed(2)}/4.0`,
    },
    {
      icon: 'bar_chart',
      title: 'Academic Statistics',
      subtitle: 'View your progress and performance',
      badge: academicStanding,
    },
  ];

  return (
    <div className="min-h-screen flex bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <Sidebar onLogout={handleLogout} />

      <main className="flex-1 ml-64 p-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Dashboard</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-slate-900 dark:text-white font-medium">Home</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search courses, tasks..."
                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border-none rounded-xl text-sm w-80 shadow-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative">
                <span className="material-symbols-outlined text-slate-400">notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background-light dark:border-background-dark" />
              </button>
              <button>
                <span className="material-symbols-outlined text-slate-400">settings</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex gap-8">
          <div className="flex-1 space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome back, {student.name}!
              </h2>
              <p className="text-slate-500">
                Academic Standing: <span className="text-blue-600 font-bold">{academicStanding}</span>
              </p>
            </section>

            <div className="grid grid-cols-2 gap-6">
              {statsCards.map((card) => (
                <StatsCard key={card.title} {...card} />
              ))}
            </div>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">In Progress Courses</h3>
                <a href="#" className="text-blue-600 dark:text-blue-400 text-sm font-semibold">View All</a>
              </div>
              {coursesStats.progressCourses.length > 0 ? (
                <div className="grid grid-cols-3 gap-6">
                  {coursesStats.progressCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-100 dark:border-slate-700">
                  <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-600 mb-2">menu_book</span>
                  <p className="text-sm text-slate-400">No courses in progress</p>
                </div>
              )}
            </section>
          </div>

          <RightPanel
            schedule={schedule}
            tasks={tasks}
            gpa={student.gpa}
            cgpa={student.cgpa}
          />
        </div>
      </main>
    </div>
  );
}
