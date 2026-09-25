import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  User,
} from 'lucide-react';
import ClientSidebar from '../components/sidebars/ClientSidebar';
import { authApi } from '../auth/api';

type Props = { username: string };

const looks = [
  { number: '01', pins: '15k+', title: 'Trending Fades', description: 'From low drops to high-contrast skin fades. Check out the most popular and cleanest fade transitions today.', query: 'men trending fade haircut', image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=85' },
  { number: '02', pins: '12k+', title: 'Korean Two-Block', description: 'K-Pop inspired definitions, soft textured fringes, and modern parted flow layouts perfect for Asian hair texture.', query: 'korean two block haircut men', image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=85' },
  { number: '03', pins: '8k+', title: 'Classic Gentlemen', description: 'Timeless side-parts, structural pompadours, and razor-sharp slick backs for a formal, professional, and classic look.', query: 'classic gentlemen haircut side part', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85' },
  { number: '04', pins: '10k+', title: 'Buzz & French Crop', description: 'Low-maintenance, bold, and fresh. Discover the sharpest crop cuts and engineered skin buzz haircuts.', query: 'buzz cut french crop haircut', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85' },
  { number: '05', pins: '9k+', title: 'Long & Modern Flow', description: 'The renaissance of style. Textured wolf cuts, modern mullets, and mid-length free-flowing hair movements.', query: 'men modern flow wolf cut mullet', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85' },
  { number: '06', pins: '6k+', title: 'Beard & Sharp Linings', description: 'Meticulous beard fading, precise facial hair line-ups, goatee sculpting, and premium beard definitions.', query: 'beard fade sharp line up men', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85' },
];

export default function ClientLookbook({ username }: Props) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const memberName = useMemo(() => {
    return username ? username.trim() : 'Member';
  }, [username]);

  const userInitial = useMemo(() => {
    return memberName.charAt(0).toUpperCase();
  }, [memberName]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsNotifMenuOpen(false);
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeAllDropdowns = () => {
    setIsNotifMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = async () => {
    setError('');
    setIsLoggingOut(true);
    try {
      await authApi.logout();
      window.location.hash = '#login';
    } catch (logoutError) {
      setError(logoutError instanceof Error ? logoutError.message : 'Unable to log out');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3000);
    setIsSidebarOpen(false);
    closeAllDropdowns();
  };

  return (
    <main className="min-h-screen bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
      {/* Desktop Persistent Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <ClientSidebar username={username} active="lookbook" onNavigate={(route) => { window.location.hash = route; }} onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} />
      </div>

      {/* Mobile Drawer Navigation */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button 
            type="button" 
            className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px] animate-in fade-in duration-300" 
            onClick={() => setIsSidebarOpen(false)} 
            aria-label="Close navigation overlay" 
          />
          <div className="relative h-full w-72">
            <ClientSidebar username={username} active="lookbook" onNavigate={(route) => { window.location.hash = route; }} onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} />
          </div>
        </div>
      )}

      <div className="min-h-screen lg:ml-72">
        {/* Modernized Mobile-First Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200/70 bg-white/85 px-3.5 backdrop-blur-lg transition-all sm:h-20 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200/80 bg-zinc-50/80 text-zinc-800 shadow-xs transition-all duration-200 hover:bg-zinc-100 active:scale-95 lg:hidden"
              aria-label="Open navigation"
              aria-expanded={isSidebarOpen}
            >
              <Menu size={18} strokeWidth={2.2} />
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:block h-6 w-0.5 rounded-full bg-[#c7a65e]/40" />
              <div>
                <p className="text-[8px] sm:text-[9px] font-black tracking-[0.28em] text-[#c7a65e] uppercase">Portal</p>
                <p className="text-xs sm:text-base font-black leading-none tracking-tighter uppercase text-zinc-900">
                  Member <span className="font-light text-zinc-400">space</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3.5">
            <button
              type="button"
              onClick={() => showNotice('Booking flow will be available here soon.')}
              className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[10px] font-black tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:bg-[#c7a65e] hover:shadow-md hover:shadow-[#c7a65e]/20 active:scale-95"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>Book Service</span>
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => {
                  setIsNotifMenuOpen(!isNotifMenuOpen);
                  setIsProfileMenuOpen(false);
                }}
                className={`group relative flex h-10 items-center gap-2 rounded-2xl border px-3 transition-all duration-200 active:scale-95 ${
                  isNotifMenuOpen 
                    ? 'border-[#c7a65e] bg-zinc-950 text-[#c7a65e] shadow-md shadow-zinc-950/10' 
                    : 'border-zinc-200/80 bg-zinc-50/50 text-zinc-700 hover:border-[#c7a65e]/60 hover:bg-zinc-100/80'
                }`}
                aria-label="View notifications"
              >
                <div className="relative flex items-center justify-center">
                  <Bell size={16} strokeWidth={2} className={`transition-transform duration-300 group-hover:-rotate-12 ${isNotifMenuOpen ? 'text-[#c7a65e]' : 'text-zinc-700 group-hover:text-zinc-950'}`} />
                  <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#c7a65e] ring-2 ring-white animate-pulse" />
                </div>
                <span className={`flex h-4.5 min-w-4.5 items-center justify-center rounded-lg px-1.5 text-[9px] font-black tracking-tight transition-colors ${isNotifMenuOpen ? 'bg-[#c7a65e] text-zinc-950' : 'bg-white border border-zinc-200/60 text-zinc-800 shadow-2xs group-hover:border-[#c7a65e]/30'}`}>3</span>
              </button>

              {isNotifMenuOpen && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-2xl border border-zinc-100 bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
                    <p className="text-[10px] font-black tracking-[0.15em] text-zinc-900 uppercase">Notifications</p>
                    <button type="button" onClick={() => setIsNotifMenuOpen(false)} className="text-[9px] font-bold text-[#c7a65e] uppercase transition hover:text-[#a37d2d]">Mark as read</button>
                  </div>
                  <div className="flex flex-col items-center justify-center px-6 py-8 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50 text-zinc-300">
                      <Bell size={20} strokeWidth={2} />
                    </div>
                    <p className="text-xs font-black tracking-wide text-zinc-700 uppercase">You're all caught up!</p>
                    <p className="mt-1.5 text-xs text-zinc-500">No new notifications or alerts at the moment.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu Trigger */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                  setIsNotifMenuOpen(false);
                }}
                className={`flex items-center gap-2 rounded-full border bg-white p-1 transition-all duration-200 active:scale-95 sm:pr-3 ${
                  isProfileMenuOpen 
                    ? 'border-[#c7a65e] ring-2 ring-[#c7a65e]/20 shadow-sm' 
                    : 'border-zinc-200/90 shadow-2xs hover:border-[#c7a65e]'
                }`}
                aria-label="User menu"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-[11px] font-black text-[#c7a65e] shadow-xs">
                  {userInitial}
                </div>
                <span className="hidden sm:inline-block max-w-28 lg:max-w-36 truncate text-xs font-bold tracking-tight text-zinc-800 uppercase">
                  {memberName}
                </span>
                <ChevronDown size={14} className={`hidden sm:block text-zinc-400 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180 text-[#c7a65e]' : ''}`} />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-zinc-100 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
                  <div className="border-b border-zinc-100 px-3 py-2.5">
                    <p className="text-[9px] font-black tracking-wider text-zinc-400 uppercase">Logged in as</p>
                    <p className="truncate text-xs font-black text-zinc-900 uppercase">{memberName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showNotice('Profile settings will be available here soon.')}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    <User size={15} />
                    <span>My Profile</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showNotice('Profile settings will be available here soon.')}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    <Settings size={15} />
                    <span>Settings</span>
                  </button>
                  <div className="my-1 border-t border-zinc-100" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-red-500 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
                  >
                    <LogOut size={15} />
                    <span>{isLoggingOut ? 'Signing out...' : 'Sign out'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Lookbook Content Area */}
        <div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
          {error && <p className="mb-4 sm:mb-6 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-red-700" role="alert">{error}</p>}
          {notice && <p className="mb-4 sm:mb-6 rounded-xl border border-[#dfcfaa] bg-[#fdf9ef] px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-[#735719]" role="status">{notice}</p>}
          
          <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e7dcc5] bg-[#f9f5ea] px-2.5 py-1 text-[8px] sm:text-[9px] font-black tracking-[0.24em] text-[#bb9143] uppercase">
                <Sparkles size={12} className="shrink-0" /> Style catalog
              </div>
              <h1 className="mt-2 text-2xl font-black leading-tight tracking-[-0.06em] uppercase sm:mt-4 sm:max-w-3xl sm:text-5xl sm:leading-[0.89] sm:tracking-[-0.085em] lg:text-6xl">
                Unlimited Pinterest <span className="inline-block sm:block italic text-zinc-500">inspiration.</span>
              </h1>
              <p className="mt-3 max-w-2xl text-xs leading-5 text-zinc-500 sm:mt-4 sm:text-base sm:leading-6">
                Digital style catalog. Choose from the refined categories below to unlock an endless stream of haircuts and looks directly from Pinterest.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[.18em] text-zinc-400">
              <Search size={14} className="text-[#c7a65e] sm:w-3.75 sm:h-3.75" /> Curated for you
            </div>
          </div>
          
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {looks.map((look) => (
              <article key={look.number} className="group overflow-hidden rounded-[1.75rem] border border-zinc-200/80 bg-white shadow-[0_12px_30px_rgba(18,18,18,.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c7a65e]/50 hover:shadow-[0_18px_40px_rgba(18,18,18,.1)]">
                <div className="relative h-52 overflow-hidden bg-zinc-200">
                  <img src={look.image} alt={look.title} className="h-full w-full object-cover grayscale-[.15] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950/75 to-transparent" />
                  <span className="absolute left-5 top-5 text-3xl font-black -tracking-widest text-white/70">{look.number}</span>
                  <span className="absolute bottom-4 right-5 rounded-full bg-white/15 px-3 py-1 text-[9px] font-black uppercase tracking-[.15em] text-white backdrop-blur-md">{look.pins} pins</span>
                </div>
                <div className="p-5 sm:p-6">
                  <h2 className="text-xl font-black uppercase tracking-tighter">{look.title}</h2>
                  <p className="mt-2 min-h-18 text-sm leading-6 text-zinc-500">{look.description}</p>
                  <a href={`https://www.pinterest.com/search/pins/?q=${encodeURIComponent(look.query)}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2.5 text-[10px] font-black uppercase tracking-[.16em] text-white transition hover:bg-[#c7a65e] hover:text-zinc-950">
                    Pinterest board <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <footer className="mt-16 border-t border-zinc-200 pt-5 text-[9px] font-black uppercase tracking-[.2em] text-zinc-400">
            Hustle Friends Co. ® 2026 <span className="mx-2 text-[#c7a65e]">•</span> Work Hard • Stay Sharp
          </footer>
        </div>
      </div>
    </main>
  );
}