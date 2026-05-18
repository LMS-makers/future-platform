import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Users, BookOpen, Library, ClipboardList, BarChart3, Settings, LifeBuoy, LogOut, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({ isMobileOpen, onMobileClose }: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { t } = useTranslation('dashboard');

  const mainLinks = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/admin/dashboard' },
    { icon: Users, label: t('user'), path: '/admin/dashboard/users' },
    { icon: GraduationCap, label: t('academic'), path: '/admin/dashboard/academic' },
    { icon: BookOpen, label: t('courses'), path: '/admin/dashboard/courses' },
    { icon: Library, label: t('materials'), path: '/admin/dashboard/materials' },
    { icon: ClipboardList, label: t('tasks'), path: '/admin/dashboard/tasks' },
    { icon: BarChart3, label: t('analytics'), path: '/admin/dashboard/analytics' },
  ];

  const bottomLinks = [
    { icon: Settings, label: t('settings'), path: '/admin/dashboard/settings' },
    { icon: LifeBuoy, label: t('support'), path: '/admin/dashboard/support' },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onMobileClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="h-16 lg:h-20 flex items-center px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-lg leading-tight tracking-wide">HICIT</div>
            <div className="text-[10px] text-neutral-300 tracking-wider">{t('futureAcademy')}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-2 lg:py-4 flex flex-col gap-1 overflow-y-auto hide-scrollbar">
        {mainLinks.map((link) => {
          const active = isActive(link.path);
          return (
            <button
              key={link.label}
              onClick={() => handleNavigate(link.path)}
              className={`flex items-center px-4 lg:px-6 py-2.5 lg:py-3 text-sm font-medium transition-colors w-full text-left ${
                active
                  ? 'bg-primary-800 border-l-4 border-blue-500 text-white'
                  : 'text-neutral-300 hover:bg-primary-800 hover:text-white'
              }`}
            >
              <link.icon className={`w-5 h-5 mr-3 shrink-0 ${active ? 'text-white' : 'text-neutral-400'}`} />
              {link.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-primary-800 py-2 lg:py-4">
        {bottomLinks.map((link) => {
          const active = isActive(link.path);
          return (
            <button
              key={link.label}
              onClick={() => handleNavigate(link.path)}
              className={`flex items-center px-4 lg:px-6 py-2.5 lg:py-3 text-sm font-medium transition-colors w-full text-left ${
                active
                  ? 'bg-primary-800 border-l-4 border-blue-500 text-white'
                  : 'text-neutral-300 hover:bg-primary-800 hover:text-white'
              }`}
            >
              <link.icon className="w-5 h-5 mr-3 shrink-0 text-neutral-400" />
              {link.label}
            </button>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 lg:px-6 py-2.5 lg:py-3 text-sm font-medium text-neutral-300 hover:bg-primary-800 hover:text-white transition-colors w-full text-left"
        >
          <LogOut className="w-5 h-5 mr-3 shrink-0 text-neutral-400" />
          {t('logout')}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex w-64 bg-primary-900 text-white flex-col h-full shrink-0">
        {sidebarContent}
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onMobileClose} />
          <aside className="relative w-72 bg-primary-900 text-white flex flex-col h-full max-w-[85vw]">
            <div className="absolute top-4 right-4">
              <button onClick={onMobileClose} className="text-neutral-300 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
