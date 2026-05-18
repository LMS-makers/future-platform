import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import studentApi from '../api/studentApi';
import type { StudentDashboardData } from '../types/student';
import Sidebar from './student/Sidebar';
import StatsCard from './student/StatsCard';
import CourseCard from './student/CourseCard';
import RightPanel from './student/RightPanel';
import { schedule, tasks } from './student/data';
import LanguageSwitcher from '../i18n/LanguageSwitcher';

function deriveAcademicStanding(cgpa: number, t: (key: string) => string): string {
  if (cgpa >= 3.5) return t('excellent');
  if (cgpa >= 3.0) return t('veryGood');
  if (cgpa >= 2.0) return t('good');
  return t('atRisk');
}

function Skeleton() {
  return (
    <div className="min-h-screen flex bg-surface text-text-primary">
      <div className="hidden md:block w-64 bg-[#0a1d4a]" />
      <main className="flex-1 md:ml-64 p-4 lg:p-8 animate-pulse">
        <div className="flex items-center justify-between mb-8">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-48" />
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl w-64 lg:w-80" />
        </div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-72 mb-2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-96 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="h-36 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          <div className="h-36 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation('sidebar');
  const { user, logout } = useAuthStore();
  const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      const message = err instanceof Error ? err.message : t('failedToLoadDashboard');
      setError(message);
    } finally {
      if (fetchIdRef.current === fetchId) {
        setLoading(false);
      }
    }
  }, [t]);

  useEffect(() => {
    const fetchId = ++fetchIdRef.current;
    fetchDashboard(fetchId);
    return () => {
      fetchIdRef.current = -1;
    };
  }, [fetchDashboard]);

  const academicStanding = useMemo(() => {
    if (!dashboardData) return '—';
    return deriveAcademicStanding(dashboardData.student.cgpa, t);
  }, [dashboardData, t]);

  const handleLogout = () => {
    logout();
  };

  if (loading) return <Skeleton />;

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen flex bg-surface text-text-primary">
        <Sidebar onLogout={handleLogout} isMobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />
        <main className="flex-1 md:ml-64 p-4 lg:p-8 flex items-center justify-center">
          <div className="text-center space-y-4">
            <span className="material-symbols-outlined text-5xl text-red-400">error_outline</span>
            <p className="text-text-tertiary">{error || t('failedToLoadDashboard')}</p>
            <button
              onClick={() => {
                setError(null);
                const fetchId = ++fetchIdRef.current;
                fetchDashboard(fetchId);
              }}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
            >
              {t('retry', { ns: 'common' })}
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
      title: t('academicProfile'),
      subtitle: t('academicProfileDesc'),
      badge: `${t('cgpaLabel')}: ${student.cgpa.toFixed(2)}/4.0`,
    },
    {
      icon: 'bar_chart',
      title: t('academicStats'),
      subtitle: t('academicStatsDesc'),
      badge: academicStanding,
    },
  ];

  return (
    <div className="min-h-screen flex bg-surface text-text-primary">
      <Sidebar onLogout={handleLogout} isMobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

      <main className="flex-1 md:ml-64 min-w-0">
        <header className="flex items-center justify-between px-4 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center gap-2 lg:gap-3 min-w-0">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-text-tertiary hover:text-text-secondary shrink-0">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 text-sm text-text-tertiary min-w-0">
              <span className="truncate">{t('sidebar:dashboard')}</span>
              <span className="material-symbols-outlined text-sm shrink-0">chevron_right</span>
              <span className="text-text-primary font-medium truncate">{t('home')}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6 shrink-0">
            <div className="relative group hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                search
              </span>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="pl-10 pr-4 py-2 bg-surface-card border-none rounded-xl text-sm w-48 lg:w-80 shadow-card focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>
            <div className="flex items-center gap-3 lg:gap-4">
              <LanguageSwitcher />
              <button className="relative">
                <span className="material-symbols-outlined text-text-muted">notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-surface dark:border-surface" />
              </button>
              <button>
                <span className="material-symbols-outlined text-text-muted">settings</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="material-symbols-outlined text-text-muted text-sm hidden sm:inline">expand_more</span>
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <div className="flex-1 space-y-6 lg:space-y-8 min-w-0">
              <section>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-1 lg:mb-2 break-words">
                  {t('welcomeBack', { name: student.name })}
                </h2>
                <p className="text-sm lg:text-base text-text-tertiary">
                  {t('academicStandingLabel')} <span className="text-blue-600 font-bold">{academicStanding}</span>
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {statsCards.map((card) => (
                  <StatsCard key={card.title} {...card} />
                ))}
              </div>

              <section>
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h3 className="text-base lg:text-lg font-bold text-text-primary">{t('inProgressCourses')}</h3>
                  <a href="#" className="text-blue-600 dark:text-blue-400 text-sm font-semibold shrink-0">{t('viewAll')}</a>
                </div>
                {coursesStats.progressCourses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {coursesStats.progressCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-surface-card rounded-2xl p-6 lg:p-8 text-center border border-blue-600">
                    <span className="material-symbols-outlined text-3xl text-text-muted mb-2">menu_book</span>
                    <p className="text-sm text-text-muted">{t('noCourses')}</p>
                  </div>
                )}
              </section>
            </div>

            <div className="mt-6 lg:mt-0 shrink-0">
              <RightPanel
                schedule={schedule}
                tasks={tasks}
                gpa={student.gpa}
                cgpa={student.cgpa}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
