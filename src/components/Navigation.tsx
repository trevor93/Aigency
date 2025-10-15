import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation({ darkMode, toggleDarkMode }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href === '#home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-900/95 backdrop-blur-lg border-b border-aqua-500/20 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-2 group" onClick={(e) => handleNavClick(e, '#home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-aqua-500 to-aqua-300 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-navy-900 font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-bold">
              <span className="text-white">Naim</span>
              <span className="text-gradient">Tech</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-300 hover:text-aqua-500 transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-navy-700/50 hover:bg-navy-700 border border-aqua-500/20 hover:border-aqua-500/40 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-aqua-500" />
              ) : (
                <Moon className="w-5 h-5 text-aqua-500" />
              )}
            </button>

            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/login');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="bg-aqua-500 hover:bg-aqua-400 text-navy-900 px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-aqua-500/50"
            >
              Login
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-navy-700/50 border border-aqua-500/20"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-aqua-500" />
            ) : (
              <Menu className="w-6 h-6 text-aqua-500" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-lg border-t border-aqua-500/20">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-gray-300 hover:text-aqua-500 transition-colors duration-300 font-medium py-2"
              >
                {link.label}
              </a>
            ))}

            <div className="flex items-center gap-3 pt-3 border-t border-aqua-500/20">
              <button
                onClick={toggleDarkMode}
                className="flex-1 p-3 rounded-lg bg-navy-700/50 hover:bg-navy-700 border border-aqua-500/20 hover:border-aqua-500/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-5 h-5 text-aqua-500" />
                    <span className="text-sm">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 text-aqua-500" />
                    <span className="text-sm">Dark Mode</span>
                  </>
                )}
              </button>

              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  window.history.pushState({}, '', '/login');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="flex-1 bg-aqua-500 hover:bg-aqua-400 text-navy-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-center"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
