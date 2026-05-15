import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'News', href: '#news' },
  { label: 'Departments', href: '#departments' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary-900/95 backdrop-blur-sm shadow-lg' : 'bg-primary-900/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-400 rounded-lg flex items-center justify-center">
              <span className="text-primary-900 font-bold text-lg">H</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">HICIT</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-neutral-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="/login" className="bg-primary-700 hover:bg-primary-600 text-white px-5 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm hover:shadow-lg hover:shadow-primary-700/30 inline-block">
              Login to LMS
            </a>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-primary-800/95 backdrop-blur-sm border-t border-primary-700/30">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="block text-neutral-300 hover:text-white transition-colors py-2 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="/login" className="w-full bg-primary-700 hover:bg-primary-600 text-white px-5 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm mt-2 inline-block text-center">
              Login to LMS
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
