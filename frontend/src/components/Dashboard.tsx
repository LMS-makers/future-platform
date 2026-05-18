import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, GraduationCap, BookOpen, Library } from 'lucide-react';
import AdminSidebar from './admin/AdminSidebar';
import AdminHeader from './admin/AdminHeader';
import MetricsCard from './admin/MetricsCard';
import UserTable from './admin/UserTable';
import { adminApi } from '../api/adminApi';

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [studentsCount, setStudentsCount] = useState<number | null>(null);

  useEffect(() => {
    adminApi.getUsersCount().then(setUsersCount).catch(() => {});
    adminApi.getStudentsCount().then(setStudentsCount).catch(() => {});
  }, []);

  const metrics = [
    {
      icon: Users,
      label: t('totalUsers'),
      value: usersCount !== null ? usersCount.toLocaleString() : '—',
      subtext: t('registeredUsers'),
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-500 dark:text-blue-400',
    },
    {
      icon: GraduationCap,
      label: t('totalStudents'),
      value: studentsCount !== null ? studentsCount.toLocaleString() : '—',
      subtext: t('enrolledStudents'),
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-500 dark:text-green-400',
    },
    {
      icon: BookOpen,
      label: t('facultyMembers'),
      value: '—',
      subtext: t('facultyData'),
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-500 dark:text-purple-400',
    },
    {
      icon: Library,
      label: t('activeCourses'),
      value: '—',
      subtext: t('courseData'),
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-500 dark:text-orange-400',
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-text-primary">
      <AdminSidebar isMobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AdminHeader
          title={t('title')}
          subtitle={t('subtitle')}
          onMenuToggle={() => setSidebarOpen(true)}
        />

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 hide-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {metrics.map((m) => (
              <MetricsCard key={m.label} {...m} />
            ))}
          </div>

          <UserTable />
        </div>
      </main>
    </div>
  );
}
