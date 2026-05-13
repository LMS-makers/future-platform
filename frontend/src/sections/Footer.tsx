import { Mail, Globe, Phone } from 'lucide-react';
import { footerData } from '../data/landing';

interface Link {
  label: string;
  href: string;
}

export default function Footer() {
  return (
    <footer className="bg-primary-900 pt-20 pb-10">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
        {/* Column 1 */}
        <div className="space-y-6">
          <h2 className="text-white font-bold text-2xl">{footerData.name}</h2>
          <p className="text-white/50 text-sm leading-relaxed">
            {footerData.description}
          </p>
          <div className="flex gap-4">
            <a 
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-accent transition-colors" 
              href="#"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a 
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-accent transition-colors" 
              href="#"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a 
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-accent transition-colors" 
              href="#"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-white font-bold mb-6">Links</h4>
          <ul className="space-y-4 text-white/50 text-sm">
            {footerData.links.map((link: Link, index: number) => (
              <li key={index}>
                <a className="hover:text-white transition-colors" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-white font-bold mb-6">Campus Location</h4>
          <div className="rounded-xl overflow-hidden border border-white/10 h-48 grayscale">
            <img 
              alt="Map Location" 
              className="w-full h-full object-cover"
              src={footerData.mapImage}
            />
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-white font-bold mb-6">Stay Updated</h4>
          <p className="text-white/50 text-sm mb-6">Subscribe for institute news and events.</p>
          <div className="flex items-center">
            <input 
              className="bg-white/10 border border-white/20 text-white text-sm px-4 py-3 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-brand-accent w-full"
              placeholder={footerData.placeholderEmail}
              type="email"
            />
            <button className="bg-brand-blue text-white px-4 py-3 rounded-r-lg hover:bg-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
        <p>{footerData.copyright}</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          {footerData.quickLinks.map((link: Link, index: number) => (
            <a key={index} className="hover:text-white transition-colors" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}