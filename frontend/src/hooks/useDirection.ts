import { useTranslation } from 'react-i18next';

export function useDirection() {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return {
    isRtl,
    dir: i18n.dir(),
    slideInX: isRtl ? 30 : -30,
    slideOutX: isRtl ? -30 : 30,
    arrowIcon: isRtl ? 'rotate-180' : '',
  };
}
