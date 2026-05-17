import { LogOut, X } from 'lucide-react';

const navLinks = [
  { icon: 'grid_view', label: 'Dashboard', active: true },
  { icon: 'book', label: 'My Courses' },
  { icon: 'calendar_month', label: 'Schedule' },
  { icon: 'assignment', label: 'Assignments' },
  { icon: 'chat', label: 'Messages' },
  { icon: 'folder', label: 'Resource Library' },
];

const bottomLinks = [
  { icon: 'settings', label: 'Settings' },
  { icon: 'help', label: 'Support' },
];

interface SidebarProps {
  onLogout: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ onLogout, isMobileOpen, onMobileClose }: SidebarProps) {
  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 lg:p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-white">school</span>
        </div>
        <div>
          <h1 className="font-bold text-xl leading-tight">HICIT</h1>
          <p className="text-[10px] opacity-70 uppercase tracking-widest font-semibold">Future Academy</p>
        </div>
      </div>

      <nav className="mt-2 lg:mt-4 flex-1 px-3 lg:px-4 space-y-1 lg:space-y-2 overflow-y-auto">
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
            <span className="text-sm font-medium">{link.label}</span>
          </a>
        ))}

        <div className="pt-6 lg:pt-8 space-y-1 lg:space-y-2">
          {bottomLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              className="flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 opacity-70 hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">{link.icon}</span>
              <span className="text-sm font-medium">{link.label}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-3 lg:mx-4 mb-2 lg:mb-4 p-4 lg:p-5 bg-blue-900/40 rounded-2xl relative overflow-hidden hidden lg:block">
        <div className="relative z-10">
          <p className="text-sm font-semibold mb-1">
            Keep learning,<br />keep growing!
          </p>
          <p className="text-[11px] opacity-70 mb-4">You're doing great!</p>
          <div className="flex justify-center mt-2">
            <img
              alt="Education illustration"
              className="w-24 h-auto drop-shadow-lg"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnFdncGcSkBHU4E5QQMj5V4EFVH7Nlrn3G49YLuXwsLE3AdEcLowieVLutf2YI_wvn0HgyPXvlcmiWPNBXhoSHkxg1hP0ElyyOzJyxIFLxq4SBbiDY1wAQZtZzalihAIK8dtrYO2bt1zJbIRvJB_GpzEv4AeYpniSow4ebDJIf8OiNgG_sbCkkl2lS2rYmL1uSc4zaWucleJUq85yP4C2xDXv38FitEdyYn5F-zlmhZDOoYHixeXTqrlSB4jZmFcGDLe8Yjv4rGw"
            />
          </div>
        </div>
      </div>

      <div className="p-3 lg:p-4 border-t border-blue-800/50">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 lg:px-4 py-2 w-full text-sm text-white/70 hover:text-white hover:bg-blue-800/30 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex w-64 bg-[#0a1d4a] text-white flex-col fixed inset-y-0 left-0 z-50">
        {sidebarContent}
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onMobileClose} />
          <aside className="relative w-72 bg-[#0a1d4a] text-white flex flex-col h-full max-w-[85vw]">
            <div className="absolute top-4 right-4 z-10">
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
