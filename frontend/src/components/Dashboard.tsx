import { useState, useEffect } from 'react';
import { Users, GraduationCap, BookOpen, Library } from 'lucide-react';
import AdminSidebar from './admin/AdminSidebar';
import AdminHeader from './admin/AdminHeader';
import MetricsCard from './admin/MetricsCard';
import UserTable from './admin/UserTable';
import { adminApi } from '../api/adminApi';

export default function Dashboard() {
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
      label: 'Total users',
      value: usersCount !== null ? usersCount.toLocaleString() : '—',
      subtext: 'Registered users',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      icon: GraduationCap,
      label: 'Total Students',
      value: studentsCount !== null ? studentsCount.toLocaleString() : '—',
      subtext: 'Enrolled students',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
    },
    {
      icon: BookOpen,
      label: 'Faculty Members',
      value: '—',
      subtext: 'Faculty data',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
    {
      icon: Library,
      label: 'Active Courses',
      value: '—',
      subtext: 'Course data',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden text-slate-800">
      <AdminSidebar isMobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AdminHeader
          title="Admin Dashboard"
          subtitle="System Management & Administration"
          onMenuToggle={() => setSidebarOpen(true)}
        />

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
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
