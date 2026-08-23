import { useEffect, useState } from 'react';
import { User, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to change navbar theme dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active navigation hash on click & scroll
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setActiveSection(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Disable page scrolling when full-screen mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'PRODUCTS', href: '#products' },
    { name: 'BARBER', href: '#barber' },
    { name: 'COFFEE', href: '#coffee' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 transition-all duration-500">
        {/* Dynamic Glassmorphic Container (Dark on top, Light on scroll) */}
        <nav
          className={`max-w-7xl mx-auto rounded-2xl px-6 py-3.5 flex items-center justify-between shadow-2xl transition-all duration-500 border ${
            isScrolled
              ? 'bg-white/80 backdrop-blur-xl border-neutral-200/80 text-neutral-900 shadow-neutral-900/10'
              : 'bg-neutral-950/80 backdrop-blur-xl border-neutral-800/80 text-white shadow-black/40'
          }`}
        >
          {/* Brand Logo with dynamic contrast filter */}
          <a href="#home" className="flex items-center group shrink-0 relative z-50">
            <img 
              src="/img/HustleLogoWhite.png" 
              alt="Hustle Friends Logo" 
              className={`h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                isScrolled ? 'brightness-0' : 'brightness-100'
              }`}
            />
          </a>

          {/* Desktop Navigation Links */}
          <ul
            className={`hidden lg:flex items-center gap-1 rounded-full px-2.5 py-1.5 transition-all duration-500 border ${
              isScrolled
                ? 'bg-neutral-100/90 border-neutral-200/80 shadow-inner'
                : 'bg-neutral-900/80 border-neutral-800/80'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setActiveSection(link.href)}
                    className={`px-5 py-2 rounded-full text-xs font-black tracking-widest transition-all duration-300 block ${
                      isActive
                        ? 'bg-[#C6A664] text-neutral-950 shadow-md shadow-[#C6A664]/30 scale-105'
                        : isScrolled
                        ? 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/60'
                        : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Header Actions */}
          <div className="flex items-center gap-3 relative z-50">
            
            {/* Desktop Premium Gold Gradient Login / Register Button */}
            <a
              href="#login"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C6A664] to-[#B38F48] text-neutral-950 text-xs font-black tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#C6A664]/30 hover:scale-[1.02] active:scale-95 border border-white/30"
            >
              <User size={15} className="text-neutral-950" />
              <span>LOGIN / REGISTER</span>
            </a>

            {/* Mobile / Tablet Menu Button Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 active:scale-95 ${
                isScrolled
                  ? 'text-neutral-800 hover:text-neutral-950 hover:bg-neutral-100'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile & Tablet Overlay Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden flex flex-col justify-between px-8 pt-28 pb-12 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white/95 text-neutral-900 backdrop-blur-2xl' 
            : 'bg-neutral-950/95 text-white backdrop-blur-2xl'
        } ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto translate-y-0' 
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Ambient Gold Glow Background Accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#C6A664]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Main Navigation Links */}
        <ul className="flex flex-col gap-3 max-w-lg mx-auto w-full relative z-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`group flex items-center justify-between w-full px-6 py-4 rounded-2xl text-base font-black tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'bg-[#C6A664] text-neutral-950 shadow-lg shadow-[#C6A664]/25 scale-[1.02]'
                      : isScrolled
                      ? 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 border border-neutral-200/60'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800/60'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className={`text-xs font-semibold ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                    →
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Login / Register Link Section for Mobile */}
        <div className={`max-w-lg mx-auto w-full pt-6 border-t relative z-10 ${
          isScrolled ? 'border-neutral-200/80' : 'border-neutral-800/80'
        }`}>
          <a
            href="#login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-black tracking-widest text-neutral-950 bg-gradient-to-r from-[#D4AF37] via-[#C6A664] to-[#B38F48] hover:opacity-95 transition-all duration-300 shadow-xl border border-white/40"
          >
            <div className="flex items-center gap-3">
              <User size={20} />
              <span>LOGIN / REGISTER</span>
            </div>
            <span className="text-xs font-black opacity-80">ACCOUNT</span>
          </a>
        </div>
      </div>
    </>
  );
};