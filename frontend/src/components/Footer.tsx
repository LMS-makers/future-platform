import { Globe, Share2, User, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const socialIcons = [Globe, Share2, User, Mail];
const socialLabels = ['Website', 'Share', 'Profile', 'Email'];

export default function Footer() {
  const { t } = useTranslation('landing');

  const footerLinks = {
    navigation: [
      { label: t('home', { ns: 'navbar' }), href: '#home' },
      { label: t('about', { ns: 'navbar' }), href: '#about' },
      { label: t('news', { ns: 'navbar' }), href: '#news' },
      { label: t('departments', { ns: 'navbar' }), href: '#departments' },
      { label: t('contact', { ns: 'navbar' }), href: '#contact' },
    ],
    programs: [
      { label: t('computerScience'), href: '#' },
      { label: t('informationTechnology'), href: '#' },
      { label: t('informationSystems'), href: '#' },
      { label: t('cybersecurity'), href: '#' },
    ],
    resources: [
      { label: t('lmsPortal'), href: '#' },
      { label: t('library'), href: '#' },
      { label: t('careerServices'), href: '#' },
      { label: t('studentSupport'), href: '#' },
    ],
  };

  return (
    <footer id="contact" className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary-400 rounded-lg flex items-center justify-center">
                <span className="text-primary-900 font-bold text-lg">H</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">HICIT</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6 max-w-sm">
              {t('hicitInstitute')}. {t('footerDescription')}
            </p>
            <div className="flex gap-3">
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={socialLabels[i]}
                  className="w-10 h-10 bg-neutral-800 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-4">{t('navigation')}</h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-neutral-500 hover:text-white text-sm transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">{t('programs')}</h4>
              <ul className="space-y-3">
                {footerLinks.programs.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-neutral-500 hover:text-white text-sm transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2">
              <h4 className="font-semibold text-white mb-4">{t('resources')}</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-neutral-500 hover:text-white text-sm transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{t('location')}</h4>
            <div className="rounded-xl overflow-hidden border border-neutral-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1!2d31.3588492!3d31.0656226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79de36e7013c9%3A0xec4d6a6470a22df3!2sFuture+Higher+Institute+of+Engineering+and+Technology!5e0!3m2!1sen!2seg!4v1"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Future Higher Institute of Engineering and Technology"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            {t('copyright')}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors duration-200">
              {t('privacyPolicy')}
            </a>
            <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors duration-200">
              {t('termsOfService')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
