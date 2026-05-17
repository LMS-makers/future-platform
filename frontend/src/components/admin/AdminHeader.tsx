import { Bell, Settings, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
}

export default function AdminHeader({ title, subtitle, onMenuToggle }: AdminHeaderProps) {
  const { user } = useAuthStore();
  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'A';

  return (
    <header className="h-16 lg:h-20 bg-white flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenuToggle} className="md:hidden text-slate-500 hover:text-slate-700 shrink-0">
          <Menu className="w-6 h-6" />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg lg:text-2xl font-bold text-slate-900 truncate">{title}</h1>
          {subtitle && <p className="text-xs lg:text-sm text-slate-500 mt-0.5 lg:mt-1 truncate">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3 lg:gap-6 shrink-0">
        <button className="text-slate-400 hover:text-slate-600 relative">
          <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        <button className="text-slate-400 hover:text-slate-600">
          <Settings className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          {user?.name ? (
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs lg:text-sm font-bold border-2 border-white shadow-sm">
              {initials}
            </div>
          ) : (
            <img
              alt="Admin Avatar"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-white shadow-sm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXeb_r9uP9OvzjqIr89Bhz6V64an4obO0LmrwLdVUKlqxUJnuvdxImibMj8FKj475mFIyCalXBXWOAxG1zg3jDDjqlqVTt4-CHsrguzAmbuo0qEcQX8rarNQjwdx3CgWgPuMpSp6FNAG5I538Y48dykugN0hXrG1Msvg8sdIlwo5qgdNBXgjhJ_7Ty8gVASh2Ct58O139v_eqnqcU3I-HW_SS2G2jh7hGvNvjlj3635OtaT0bzGRAKpa3WSOnZjF8jfoUbEY0cRQ"
            />
          )}
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </header>
  );
}
