import { useEffect } from 'react';
import { LogOut, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  onLogout: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ onLogout, isMobileOpen, onMobileClose }: SidebarProps) {
  const { t } = useTranslation('sidebar');

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const navLinks = [
    { icon: 'grid_view', label: t('dashboard'), active: true },
    { icon: 'book', label: t('myCourses') },
    { icon: 'calendar_month', label: t('schedule') },
    { icon: 'assignment', label: t('assignments') },
    { icon: 'chat', label: t('messages') },
    { icon: 'folder', label: t('resourceLibrary') },
  ];

  const bottomLinks = [
    { icon: 'settings', label: t('settings') },
    { icon: 'help', label: t('support') },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo / Header */}
      <div className="p-4 lg:p-6 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-white">school</span>
        </div>
        <div className="min-w-0">
          <h1 className="font-bold text-xl leading-tight truncate">{t('hicit')}</h1>
          <p className="text-[10px] opacity-70 uppercase tracking-widest font-semibold truncate">{t('futureAcademy')}</p>
        </div>
      </div>

      {/* Main navigation - scrollable */}
      <nav className="flex-1 px-3 lg:px-4 space-y-1 overflow-y-auto custom-scrollbar hide-scrollbar min-h-0">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href="#"
            onClick={() => onMobileClose()}
            className={`flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-r-lg transition-all ${
              link.active
                ? 'sidebar-item-active'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">{link.icon}</span>
            <span className="text-sm font-medium truncate">{link.label}</span>
          </a>
        ))}
      </nav>

      {/* Bottom section - always visible */}
      <div className="shrink-0">
        {/* Settings / Support */}
        <div className="px-3 lg:px-4 space-y-1 pb-2">
          {bottomLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              className="flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 opacity-70 hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">{link.icon}</span>
              <span className="text-sm font-medium truncate">{link.label}</span>
            </a>
          ))}
        </div>

        {/* Logout */}
        <div className="p-3 lg:p-4 border-t border-blue-800/50">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 lg:px-4 py-2 w-full text-sm text-white/70 hover:text-white hover:bg-blue-800/30 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-[#0a1d4a] text-white fixed inset-y-0 left-0 z-50">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onMobileClose} />
          <aside className="relative w-72 bg-[#0a1d4a] text-white flex flex-col h-full max-w-[85vw]">
            <div className="absolute top-4 end-4 z-10">
              <button onClick={onMobileClose} className="text-white/70 hover:text-white p-1">
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
