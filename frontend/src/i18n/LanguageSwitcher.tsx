import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const toggleLanguage = () => {
    i18n.changeLanguage(isRtl ? 'en' : 'ar');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 shrink-0"
      title={isRtl ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <Languages className="w-3.5 h-3.5" />
      <span>{isRtl ? 'EN' : 'AR'}</span>
    </button>
  );
}
