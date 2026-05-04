import { Globe, Share2, User, Mail } from 'lucide-react';

const footerLinks = {
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'News', href: '#news' },
    { label: 'Departments', href: '#departments' },
    { label: 'Contact', href: '#contact' },
  ],
  programs: [
    { label: 'Computer Science', href: '#' },
    { label: 'Information Technology', href: '#' },
    { label: 'Information Systems', href: '#' },
    { label: 'Cybersecurity', href: '#' },
  ],
  resources: [
    { label: 'LMS Portal', href: '#' },
    { label: 'Library', href: '#' },
    { label: 'Career Services', href: '#' },
    { label: 'Student Support', href: '#' },
  ],
};

const socialIcons = [Globe, Share2, User, Mail];
const socialLabels = ['Website', 'Share', 'Profile', 'Email'];

export default function Footer() {
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
              Higher Institute for Computers and Information Technology. 
              Empowering the next generation of tech professionals with 
              industry-relevant education and hands-on experience.
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
              <h4 className="font-semibold text-white mb-4">Navigation</h4>
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
              <h4 className="font-semibold text-white mb-4">Programs</h4>
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
              <h4 className="font-semibold text-white mb-4">Resources</h4>
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
            <h4 className="font-semibold text-white mb-4">Location</h4>
            <div className="rounded-xl overflow-hidden border border-neutral-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzM5LjgiTiAzMcKwMTQnMDguNSJF!5e0!3m2!1sen!2seg!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HICIT Location"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © 2025 HICIT. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
