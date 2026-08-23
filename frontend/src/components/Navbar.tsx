import { useEffect, useState } from 'react';
import { ShoppingBag, User, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Disable page scrolling when full-screen menu is active
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
    { name: 'HOME', href: '#home', active: true },
    { name: 'PRODUCTS', href: '#products' },
    { name: 'BARBER', href: '#barber' },
    { name: 'COFFEE', href: '#coffee' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4">
        <nav className="max-w-7xl mx-auto bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 rounded-2xl px-6 py-3.5 flex items-center justify-between shadow-2xl transition-all duration-300">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center group shrink-0 relative z-50">
            <img 
              src="/img/HustleLogoWhite.png" 
              alt="Hustle Friends Logo" 
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-1 bg-neutral-900/60 border border-neutral-800/60 rounded-full px-3 py-1.5">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`px-5 py-2 rounded-full text-xs font-black tracking-widest transition-all duration-300 block ${
                    link.active
                      ? 'bg-[#C6A664] text-neutral-950 shadow-lg shadow-[#C6A664]/20'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Header Actions */}
          <div className="flex items-center gap-3 text-neutral-300 relative z-50">
            {/* Shopping Bag */}
            <button 
              aria-label="Shopping bag"
              className="p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-all duration-200 relative"
            >
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 bg-[#C6A664] text-neutral-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-neutral-950">
                0
              </span>
            </button>

            {/* Desktop User Profile */}
            <button 
              aria-label="User profile"
              className="hidden lg:flex p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-all duration-200"
            >
              <User size={20} />
            </button>

            {/* Mobile / Tablet Menu Button Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-all duration-200 active:scale-95"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* 2026 UI/UX Full-Screen Mobile & Tablet Overlay Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-2xl lg:hidden flex flex-col justify-between px-8 pt-28 pb-12 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto translate-y-0' 
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Warm Gold Glow Ambient Accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#C6A664]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Main Navigation Links */}
        <ul className="flex flex-col gap-3 max-w-lg mx-auto w-full relative z-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group flex items-center justify-between w-full px-6 py-4 rounded-2xl text-base font-black tracking-widest transition-all duration-300 ${
                  link.active
                    ? 'bg-[#C6A664] text-neutral-950 shadow-xl shadow-[#C6A664]/20 scale-[1.02]'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/80'
                }`}
              >
                <span>{link.name}</span>
                <span className={`text-xs font-semibold ${link.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Profile Link Section (Bottom Area) */}
        <div className="max-w-lg mx-auto w-full pt-6 border-t border-neutral-800/80 relative z-10">
          <a
            href="#profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-black tracking-widest text-neutral-300 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800/60 hover:border-[#C6A664]/40 hover:text-white transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <User size={20} className="text-[#C6A664]" />
              <span>PROFILE</span>
            </div>
            <span className="text-xs text-neutral-500">ACCOUNT</span>
          </a>
        </div>
      </div>
    </>
  );
};









