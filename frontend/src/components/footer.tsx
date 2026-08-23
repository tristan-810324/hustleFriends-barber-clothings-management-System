import { 
  ArrowUpRight, 
  ArrowUp, 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink 
} from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-neutral-950 text-neutral-300 pt-20 pb-10 px-4 sm:px-8 lg:px-12 overflow-hidden border-t border-neutral-900">
      
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C6A664]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C6A664]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP SECTION: Brand Bio & Official Shop Location Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-neutral-800/60">
          
          {/* Brand Bio & Live Status Badge (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Live Status Indicator */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800/80 text-xs font-semibold text-neutral-300 mb-6 shadow-inner">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>HUB IS OPEN • TODAY UNTIL 10 PM</span>
              </div>

              {/* Logo */}
              <a href="#home" className="block mb-4">
                <img 
                  src="/img/HustleLogoWhite.png" 
                  alt="Hustle Friends Logo" 
                  className="h-10 w-auto object-contain"
                />
              </a>

              <p className="text-neutral-400 text-sm leading-relaxed max-w-md font-normal">
                An ecosystem where high-grade streetwear, master barber craft, and artisanal espresso meet under one roof. Designed for creators and hustlers.
              </p>
            </div>

            {/* Quick Contact Info */}
            <div className="flex flex-col sm:flex-row gap-4 text-xs text-neutral-400 font-medium">
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-[#C6A664] shrink-0" />
                <span>Mon - Sun: 9:00 AM - 10:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-[#C6A664] shrink-0" />
                <span>+63 (912) 345-6789</span>
              </div>
            </div>
          </div>

          {/* Glassmorphic Shop Address Bento Card (6 Cols) */}
          <div className="lg:col-span-6 bg-neutral-900/50 backdrop-blur-2xl border border-neutral-800/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            
            {/* Glow Accent inside Card */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#C6A664]/20 rounded-full blur-3xl group-hover:bg-[#C6A664]/30 transition-all duration-500" />

            <div>
              <div className="flex items-center gap-2 text-[#C6A664] text-xs font-black tracking-widest uppercase mb-3">
                <MapPin size={16} />
                <span>SHOP ADDRESS & LOCATION</span>
              </div>
              
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-2 leading-snug">
                KM. 38 National Road, Pulong Buhangin, Santa Maria, 3022 Bulacan
              </h3>
              
              <p className="text-xs text-neutral-400 max-w-md mt-2 leading-relaxed">
                Visit our physical store to check our latest streetwear drops, get a fresh haircut, or grab a freshly brewed specialty coffee.
              </p>
            </div>

            {/* Open in Google Maps Action Button */}
            <div className="pt-6">
              <a
                href="https://maps.google.com/?q=KM.+38+National+Road,+Pulong+Buhangin,+Santa+Maria,+3022+Bulacan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C6A664] to-[#B38F48] hover:opacity-95 text-neutral-950 text-xs font-black tracking-wider transition-all duration-300 shadow-md active:scale-95"
              >
                <span>GET DIRECTIONS</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* MIDDLE SECTION: Navigation Bento Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-neutral-800/60">
          
          {/* Col 1: Shop */}
          <div className="space-y-4">
            <h4 className="text-[#C6A664] text-xs font-black uppercase tracking-widest">
              HUB SERVICES
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a href="#products" className="hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                  <span>Streetwear Collection</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C6A664]" />
                </a>
              </li>
              <li>
                <a href="#barber" className="hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                  <span>Barbershop Appointments</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C6A664]" />
                </a>
              </li>
              <li>
                <a href="#coffee" className="hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                  <span>Artisanal Coffee Bar</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C6A664]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-4">
            <h4 className="text-[#C6A664] text-xs font-black uppercase tracking-widest">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#home" className="hover:text-white transition-colors">Home Base</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#barber" className="hover:text-white transition-colors">Barber Cut</a></li>
              <li><a href="#coffee" className="hover:text-white transition-colors">Coffee & Menu</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="space-y-4">
            <h4 className="text-[#C6A664] text-xs font-black uppercase tracking-widest">
              SUPPORT & POLICIES
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#shipping" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Col 4: Social Community & Back to Top */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-[#C6A664] text-xs font-black uppercase tracking-widest mb-4">
                CONNECT WITH US
              </h4>
              <div className="flex items-center gap-3">
                {/* Facebook Icon */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#C6A664]/60 hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center group"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram Icon */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#C6A664]/60 hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center group"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* TikTok Icon */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#C6A664]/60 hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center group"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.29 1.54-1.22 2.52.02.82.44 1.58 1.11 2.05.8.58 1.87.69 2.78.33.87-.33 1.54-1.07 1.76-1.98.08-.43.09-.88.09-1.32V.02z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Back To Top Button */}
            <div>
              <button
                onClick={scrollToTop}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#C6A664]/60 text-xs font-black tracking-widest text-neutral-300 hover:text-[#C6A664] transition-all duration-300 group shadow-lg active:scale-95"
              >
                <span>TOP OF PAGE</span>
                <ArrowUp size={16} className="text-[#C6A664] transition-transform duration-300 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: Big Watermark Text & Copyright */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-neutral-500 tracking-wider">
          <p>© {new Date().getFullYear()} HUSTLE FRIENDS ®. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-neutral-300 transition-colors">PRIVACY POLICY</a>
            <span>•</span>
            <a href="#terms" className="hover:text-neutral-300 transition-colors">TERMS OF SERVICE</a>
            <span>•</span>
            <span className="text-[#C6A664] font-black">EST. MMXXIV</span>
          </div>
        </div>

        {/* Massive Aesthetic Background Typography Watermark */}
        <div className="mt-8 text-center select-none pointer-events-none opacity-5">
          <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-none text-white whitespace-nowrap">
            HUSTLE FRIENDS
          </h1>
        </div>

      </div>
    </footer>
  );
};