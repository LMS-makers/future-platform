import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { storage } from '../utils/storage';
import studentApi from '../api/studentApi';
import type { DashboardGpa } from '../types/student';
import Sidebar from './student/Sidebar';
import StatsCard from './student/StatsCard';
import CourseCard from './student/CourseCard';
import RightPanel from './student/RightPanel';
import { courses, schedule, tasks } from './student/data';

function normalizeGpa(raw: Record<string, unknown>): DashboardGpa {
  console.log('=== normalizeGpa INPUT ===', raw);
  console.log('=== normalizeGpa KEYS ===', Object.keys(raw));

  const src: Record<string, unknown> =
    raw.data && typeof raw.data === 'object' && !Array.isArray(raw.data)
      ? { ...raw, ...(raw.data as Record<string, unknown>) }
      : raw;

  const extract = (field: string): number | undefined => {
    const v = src[field];
    if (v == null) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  const extractStr = (field: string): string | undefined => {
    const v = src[field];
    if (v == null || v === '') return undefined;
    return String(v);
  };

  const currentGpaVal =
    extract('currentGpa') ??
    extract('current_gpa') ??
    extract('gpa') ??
    extract('semester_gpa') ??
    extract('current_semester_gpa') ??
    0;

  const cgpaVal =
    extract('cgpa') ??
    extract('cumulativeGpa') ??
    extract('cumulative_gpa') ??
    extract('cumulative_gpa_snake') ??
    0;

  const gpaChangeVal = extract('gpaChange') ?? extract('gpa_change') ?? 0;

  const academicStandingVal =
    extractStr('academicStanding') ??
    extractStr('academic_standing') ??
    extractStr('standing') ??
    '—';

  const overallProgressVal = extract('overallProgress') ?? extract('overall_progress') ?? 0;

  const result: DashboardGpa = {
    currentGpa: currentGpaVal,
    cgpa: cgpaVal,
    gpaChange: gpaChangeVal,
    academicStanding: academicStandingVal,
    overallProgress: overallProgressVal,
  };

  console.log('=== normalizeGpa RESULT ===', result);
  return result;
}

export default function Home() {
  const { user, logout } = useAuthStore();
  const [gpa, setGpa] = useState<DashboardGpa | null>(null);
  const fetchIdRef = useRef(0);

  console.log('=== USER OBJECT ===', user);
  console.log('=== USER NAME ===', user?.name);
  console.log('=== USER NATIONAL ID ===', user?.nationalId);
  console.log('=== TOKEN ===', storage.getToken() ? storage.getToken()!.substring(0, 30) + '...' : 'NONE');
  console.log('=== AUTH USER (from storage) ===', storage.getUser());

  const fetchGpa = useCallback(async (nationalId: string, fetchId: number) => {
    try {
      const data = await studentApi.getDashboardGpa(nationalId);
      console.log('=== GPA DATA RECEIVED IN HOME ===', data);
      if (fetchIdRef.current !== fetchId) {
        console.log('=== GPA FETCH STALE, DISCARDING ===', { current: fetchIdRef.current, received: fetchId });
        return;
      }
      const normalized = normalizeGpa(data as Record<string, unknown>);
      console.log('=== SETTING GPA STATE ===', normalized);
      setGpa(normalized);
    } catch (err) {
      console.error('=== GPA FETCH ERROR IN HOME ===', err);
      if (fetchIdRef.current !== fetchId) return;
    }
  }, []);

  useEffect(() => {
    const token = storage.getToken();
    const nationalId = user?.nationalId;
    console.log('=== GPA EFFECT FIRED ===', { hasToken: !!token, nationalId });
    if (!token || !nationalId) return;

    const fetchId = ++fetchIdRef.current;
    fetchGpa(nationalId, fetchId);
  }, [user?.nationalId, fetchGpa]);

  const statsCards = [
    { icon: 'person', title: 'Academic Profile', subtitle: 'View and edit your academic information', badge: gpa ? `CGPA: ${gpa.cgpa.toFixed(2)}/4.0` : '—' },
    { icon: 'bar_chart', title: 'Academic Statistics', subtitle: 'View your progress and performance', badge: '85% average' },
    { icon: 'groups', title: 'Learning Groups', subtitle: 'Collaborate with your peers', badge: '3 active groups' },
    { icon: 'menu_book', title: 'Digital Course Library', subtitle: 'Access all course materials', badge: '24 courses' },
  ];

  const handleLogout = () => {
    logout();
  };

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
                Welcome back, {user?.name || 'User'}!
              </h2>
              <p className="text-slate-500">
                You've completed <span className="text-blue-600 font-bold">85%</span> of your weekly goals. Keep up the momentum!
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
              <div className="grid grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          </div>

          <RightPanel schedule={schedule} tasks={tasks} gpa={gpa} />
        </div>
      </main>
    </div>
  );
}
