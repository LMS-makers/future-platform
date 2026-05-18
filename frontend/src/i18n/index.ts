import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enAuth from '../locales/en/auth.json';
import enNavbar from '../locales/en/navbar.json';
import enLanding from '../locales/en/landing.json';
import enDashboard from '../locales/en/dashboard.json';
import enSidebar from '../locales/en/sidebar.json';
import enCommon from '../locales/en/common.json';
import enForms from '../locales/en/forms.json';

import arAuth from '../locales/ar/auth.json';
import arNavbar from '../locales/ar/navbar.json';
import arLanding from '../locales/ar/landing.json';
import arDashboard from '../locales/ar/dashboard.json';
import arSidebar from '../locales/ar/sidebar.json';
import arCommon from '../locales/ar/common.json';
import arForms from '../locales/ar/forms.json';

const resources = {
  en: {
    auth: enAuth,
    navbar: enNavbar,
    landing: enLanding,
    dashboard: enDashboard,
    sidebar: enSidebar,
    common: enCommon,
    forms: enForms,
  },
  ar: {
    auth: arAuth,
    navbar: arNavbar,
    landing: arLanding,
    dashboard: arDashboard,
    sidebar: arSidebar,
    common: arCommon,
    forms: arForms,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['auth', 'navbar', 'landing', 'dashboard', 'sidebar', 'common', 'forms'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    returnObjects: true,
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
});

export default i18n;
