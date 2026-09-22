import ClientSidebar from '../components/sidebars/ClientSidebar';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  Plus,
  Scissors,
  Settings,
  User,
} from 'lucide-react';
import { authApi } from '../auth/api';

type ClientDashboardProps = {
  username: string;
};

export default function ClientDashboard({ username }: ClientDashboardProps) {
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

  const memberSince = useMemo(() => new Date().getFullYear(), []);

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

  // 🌟 Pro-Designer Modern Sidebar Structure

	return (
    <main className="min-h-screen bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
      {/* Desktop Persistent Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block"><ClientSidebar username={username} active="overview" onNavigate={(route) => { window.location.hash = route; }} onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} /></div>

      {/* Mobile Drawer Navigation */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button 
            type="button" 
            className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px] animate-in fade-in duration-300" 
            onClick={() => setIsSidebarOpen(false)} 
            aria-label="Close navigation overlay" 
          />
          <div className="relative h-full w-72"><ClientSidebar username={username} active="overview" onNavigate={(route) => { window.location.hash = route; }} onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} /></div>
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

        {/* Dashboard Content */}
        <div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
          {error && <p className="mb-4 sm:mb-6 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-red-700" role="alert">{error}</p>}
          {notice && <p className="mb-4 sm:mb-6 rounded-xl border border-[#dfcfaa] bg-[#fdf9ef] px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-[#735719]" role="status">{notice}</p>}

          <section aria-labelledby="welcome-heading">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e7dcc5] bg-[#f9f5ea] px-2.5 py-1 text-[8px] sm:text-[9px] font-black tracking-[0.24em] text-[#bb9143] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e]" />
              Session active
            </div>
            <h1 id="welcome-heading" className="mt-2 text-2xl font-black leading-tight tracking-[-0.06em] uppercase sm:mt-4 sm:max-w-lg sm:text-5xl sm:leading-[0.89] sm:tracking-[-0.085em] lg:text-6xl">
              Welcome, <span className="inline-block sm:block italic text-zinc-600">{memberName}.</span>
            </h1>
          </section>

          <section className="mt-4 grid gap-3 sm:mt-10 sm:gap-6 lg:mt-12 lg:grid-cols-[1.8fr_1fr] xl:grid-cols-[2.2fr_1fr]">
            <article className="relative min-h-36.25 overflow-hidden rounded-2xl bg-[linear-gradient(125deg,#0b0b0c_0%,#171611_100%)] p-4 text-white shadow-[0_16px_28px_rgba(18,18,18,0.12)] sm:min-h-80 sm:rounded-[2.35rem] sm:p-8">
              <div className="absolute -right-14 -top-24 h-64 w-64 rounded-full bg-[#c7a65e]/5.5 blur-2xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-1.5 text-[8px] font-black tracking-[0.25em] text-zinc-500 uppercase sm:gap-2 sm:text-[9px] sm:tracking-[0.3em]">
                    <span className="text-[#c7a65e]">♛</span> Member status
                  </p>
                  <h2 className="mt-1.5 text-2xl font-black italic leading-none tracking-[-0.08em] text-zinc-300 uppercase sm:mt-3 sm:text-4xl">
                    Standard
                  </h2>
                </div>
                <div className="grid h-9 w-12 sm:h-12 sm:w-16 grid-cols-2 gap-0.5 sm:gap-1 rounded-md sm:rounded-lg border border-[#6f561b] bg-[#3b2d0a] p-1.5 sm:p-2 opacity-90">
                  <span className="border border-[#ab8330]" /><span className="border border-[#ab8330]" />
                  <span className="col-span-2 border border-[#ab8330]" />
                </div>
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-8 sm:bottom-8">
                <div>
                  <p className="text-[7.5px] font-black tracking-[0.22em] text-zinc-500 uppercase sm:text-[8px] sm:tracking-[0.27em]">Cardholder</p>
                  <p className="mt-0.5 max-w-32 truncate text-xs font-black tracking-widest uppercase text-zinc-200 sm:mt-1.5 sm:max-w-none sm:text-base">{memberName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[7.5px] font-black tracking-[0.22em] text-zinc-500 uppercase sm:text-[8px] sm:tracking-[0.27em]">Since</p>
                  <p className="mt-0.5 text-xs font-black tracking-widest text-zinc-200 sm:mt-1.5 sm:text-base">{memberSince}</p>
                </div>
              </div>
            </article>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-1">
              <article className="flex min-h-27.5 flex-col justify-between sm:flex-row sm:items-center rounded-2xl border border-zinc-200 bg-[#eeeeef] p-3.5 sm:min-h-35 sm:rounded-4xl sm:px-7 sm:py-5 shadow-sm">
                <div>
                  <p className="flex items-center gap-1 text-[7.5px] font-black tracking-[0.14em] text-zinc-500 uppercase sm:gap-2 sm:text-[9px] sm:tracking-[0.3em]">
                    <CalendarDays size={12} className="shrink-0 sm:w-3.25 sm:h-3.25" /> Total bookings
                  </p>
                  <div className="mt-1.5 flex items-baseline gap-1 sm:mt-3 sm:gap-2">
                    <p className="text-2xl font-black leading-none -tracking-widest sm:text-4xl">00</p>
                    <p className="text-[8px] font-black tracking-[0.04em] text-zinc-500 uppercase sm:text-[11px] sm:tracking-[0.08em]">Appts</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showNotice('Booking flow will be available here soon.')}
                  className="mt-2 sm:mt-0 flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-zinc-950 text-white shadow-md transition hover:scale-105 hover:bg-[#c7a65e] self-end sm:self-auto"
                  aria-label="Create a booking"
                >
                  <Plus size={16} strokeWidth={2.5} className="sm:hidden" />
                  <Plus size={22} strokeWidth={2.5} className="hidden sm:block" />
                </button>
              </article>

              <article className="relative min-h-27.5 flex flex-col justify-between overflow-hidden rounded-2xl bg-[#c9a65c] p-3.5 text-[#262112] shadow-[0_12px_20px_rgba(160,119,39,0.12)] sm:min-h-35 sm:rounded-4xl sm:px-7 sm:py-5">
                <div className="absolute -right-7 -top-16 h-40 w-40 rounded-full border-22 border-[#f3dfa4]/45" />
                <div className="relative flex items-start justify-between gap-1">
                  <p className="text-[7.5px] font-black tracking-[0.18em] uppercase sm:text-[9px] sm:tracking-[0.3em]">Sessions</p>
                  <span className="rounded bg-black/10 px-1.5 py-0.5 text-[7px] font-black tracking-wide uppercase sm:px-2 sm:py-1 sm:text-[8px]">Inactive</span>
                </div>
                <div>
                  <div className="relative mt-1 flex items-baseline gap-0.5 sm:mt-3">
                    <span className="text-2xl font-black leading-none tracking-[-0.09em] sm:text-3xl">00</span>
                    <span className="text-xs font-black text-black/60 sm:text-sm">/00</span>
                  </div>
                  <div className="relative mt-2 h-1 rounded-full bg-black/15 sm:mt-5 sm:h-1.5">
                    <div className="h-full w-0 rounded-full bg-zinc-950" />
                  </div>
                  <p className="relative mt-1.5 flex items-center gap-1 text-[7.5px] font-black tracking-widest uppercase sm:mt-3 sm:text-[9px] sm:tracking-[0.16em]">
                    <CheckCircle2 size={10} className="sm:w-3 sm:h-3" /> Exp. N/A
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="mt-5 sm:mt-10 lg:mt-12 overflow-hidden rounded-2xl sm:rounded-[2.35rem] border border-zinc-200 bg-white shadow-[0_12px_35px_rgba(28,28,28,0.035)]" aria-labelledby="recent-hustles-heading">
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4 sm:px-8 sm:py-6">
              <h2 id="recent-hustles-heading" className="flex items-center gap-2 sm:gap-3 text-base sm:text-2xl font-black tracking-[-0.065em] uppercase">
                <span className="h-5 w-1.5 sm:h-8 sm:w-2 rounded-full bg-[#c7a65e]" />Recent <span className="text-zinc-400">hustles</span>
              </h2>
              <button type="button" onClick={() => showNotice('No bookings to view yet.')} className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black tracking-[0.19em] text-zinc-500 uppercase transition hover:text-[#a37d2d]">
                View all <ArrowRight size={13} className="sm:w-3.75 sm:h-3.75" />
              </button>
            </div>
            <div className="hidden grid-cols-[1.7fr_1fr_0.9fr_0.8fr] gap-4 border-b border-zinc-100 px-8 py-5 text-[8px] font-black tracking-[0.28em] text-zinc-400 uppercase md:grid">
              <span>Service details</span><span>Date &amp; time</span><span>Status</span><span className="text-right">Payment</span>
            </div>
            <div className="flex min-h-32 sm:min-h-40 flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-9 text-center">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#f8f4e9] text-[#b68a36]">
                <Scissors size={18} className="sm:w-5 sm:h-5" />
              </div>
              <p className="mt-2.5 text-xs sm:text-sm font-bold text-zinc-700">No recent hustles yet</p>
              <p className="mt-0.5 max-w-sm text-xs sm:text-sm leading-5 sm:leading-6 text-zinc-500">Your completed appointments will appear here after your first booking.</p>
              <button type="button" onClick={() => showNotice('Booking flow will be available here soon.')} className="mt-3 sm:mt-4 inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black tracking-[0.16em] text-[#a37d2d] uppercase hover:text-zinc-950">
                Book a service <ChevronRight size={13} className="sm:w-3.75 sm:h-3.75" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}