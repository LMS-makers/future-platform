import { useTranslation } from 'react-i18next';
import { Languages, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.tsx';

export default function FloatingControls() {
  const { i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const isRtl = i18n.dir() === 'rtl';

  const toggleLanguage = () => {
    i18n.changeLanguage(isRtl ? 'en' : 'ar');
  };

  return (
    <div className="fixed bottom-6 end-6 z-[100] flex flex-col gap-2">
      <button
        onClick={toggleTheme}
        className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 flex items-center justify-center"
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <button
        onClick={toggleLanguage}
        className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 flex items-center justify-center text-xs font-bold"
        title={isRtl ? 'English' : 'العربية'}
      >
        <Languages className="w-4 h-4" />
      </button>
    </div>
  );
}
