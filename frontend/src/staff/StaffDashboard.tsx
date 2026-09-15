import {
  Bell,
  Boxes,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Plus,
  Settings,
  TrendingUp,
  User,
  WalletCards,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { authApi } from '../auth/api';

type StaffMenuItemProps = {
  icon: typeof LayoutDashboard;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

// 🌟 Unified Modern Menu Item
function StaffMenuItem({ icon: Icon, label, active = false, onClick }: StaffMenuItemProps) {
  return (
    <div className="px-3.5 mb-1">
      <button
        type="button"
        onClick={onClick}
        className={`group relative flex w-full items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-left text-[10.5px] font-bold tracking-[0.16em] uppercase transition-all duration-200 ${
          active
            ? 'bg-[#faf8f4] text-zinc-900 border border-[#e8ded0] shadow-[0_2px_10px_-2px_rgba(199,166,94,0.12)]'
            : 'border border-transparent text-zinc-400 hover:bg-zinc-100/60 hover:text-zinc-800 hover:translate-x-0.5'
        }`}
      >
        {active && (
          <span className="absolute left-1.5 top-1/2 -translate-y-1/2 h-4 w-1 rounded-full bg-[#c7a65e]" />
        )}
        <Icon
          size={16}
          strokeWidth={active ? 2.2 : 1.75}
          className={`transition-colors duration-200 ${
            active ? 'text-[#b08b3a] ml-1' : 'text-zinc-400 group-hover:text-zinc-700'
          }`}
        />
        <span>{label}</span>
      </button>
    </div>
  );
}

// 🌟 Ultra-Clean Section Label
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-7 pt-5 pb-2 text-[9px] font-extrabold tracking-[0.25em] text-zinc-400/80 uppercase">
      {children}
    </p>
  );
}

export default function StaffDashboard() {
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const memberName = 'Staff Member';
  const userInitial = 'S';

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
    closeAllDropdowns();
    setError('');
    setIsLoggingOut(true);
    try {
      await authApi.logout();
      window.location.hash = '#login';
    } catch (logoutError) {
      setError(logoutError instanceof Error ? logoutError.message : 'Unable to log out.');
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

  // 🌟 Sidebar Layout & Bottom Card Structure
  const sidebar = (
    <aside className="flex h-full w-72 flex-col border-r border-zinc-200/70 bg-white/95 backdrop-blur-xl shadow-[6px_0_30px_rgba(0,0,0,0.02)]">
      {/* Brand Header */}
      <div className="flex h-20 items-center justify-between px-7 border-b border-zinc-100/60">
        <button
          type="button"
          onClick={() => {
            closeAllDropdowns();
          }}
          className="group rounded-xl p-1 transition-all duration-300 hover:bg-zinc-50 active:scale-95"
          aria-label="Hustle Friends home"
        >
          <img
            src="/img/HustleLogoBlack.png"
            alt="Hustle Friends"
            className="h-14 w-auto max-w-47.5 object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-16 sm:max-w-55 lg:h-14 lg:max-w-47.5"
          />
        </button>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition lg:hidden"
          aria-label="Close navigation"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-3" aria-label="Staff navigation">
        <SectionLabel>Staff menu</SectionLabel>
        <StaffMenuItem icon={LayoutDashboard} label="Staff Home" active onClick={() => showNotice('You are viewing the staff overview.')} />
        <StaffMenuItem icon={CalendarDays} label="Manage Bookings" onClick={() => showNotice('Booking management coming soon.')} />
        <StaffMenuItem icon={WalletCards} label="Walk-in Payment" onClick={() => showNotice('Walk-in payment system coming soon.')} />
        <StaffMenuItem icon={Boxes} label="Inventory" onClick={() => showNotice('Inventory module coming soon.')} />

        <SectionLabel>Sales &amp; reports</SectionLabel>
        <StaffMenuItem icon={FileText} label="Payment History" onClick={() => showNotice('Payment history coming soon.')} />

        <SectionLabel>System</SectionLabel>
        <StaffMenuItem icon={Bell} label="Notifications" onClick={() => showNotice('System notifications coming soon.')} />
        <StaffMenuItem icon={Mail} label="Messages" onClick={() => showNotice('Messaging system coming soon.')} />

        <SectionLabel>Support</SectionLabel>
        <StaffMenuItem icon={HelpCircle} label="Help & Support" onClick={() => showNotice('Support center coming soon.')} />
      </nav>

      {/* Modern Sidebar Bottom Member Card */}
      <div className="border-t border-zinc-100 p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-zinc-50/80 border border-zinc-200/60 p-3 transition-colors hover:bg-zinc-100/60">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-xs font-black text-[#c7a65e] shadow-sm">
            {userInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-black uppercase text-zinc-900 tracking-tight">{memberName}</p>
            <p className="text-[9px] font-bold text-[#b08b3a] tracking-widest uppercase">Staff Access</p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <main className="min-h-screen w-full bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
      {/* Desktop Persistent Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>

      {/* Mobile Drawer Navigation */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Staff navigation menu">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px] animate-in fade-in duration-300"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation overlay"
          />
          <div className="relative h-full w-72">{sidebar}</div>
        </div>
      )}

      <div className="min-h-screen lg:ml-72">
        {/* Top Navigation Bar */}
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
                  Staff <span className="font-light text-zinc-400">terminal</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3.5">
            <button
              type="button"
              onClick={() => showNotice('Action will be available here soon.')}
              className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[10px] font-black tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:bg-[#c7a65e] hover:shadow-md hover:shadow-[#c7a65e]/20 active:scale-95"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>Quick Action</span>
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
                  <Bell
                    size={16}
                    strokeWidth={2}
                    className={`transition-transform duration-300 group-hover:-rotate-12 ${
                      isNotifMenuOpen ? 'text-[#c7a65e]' : 'text-zinc-700 group-hover:text-zinc-950'
                    }`}
                  />
                  <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#c7a65e] ring-2 ring-white animate-pulse" />
                </div>
                <span
                  className={`flex h-4.5 min-w-4.5 items-center justify-center rounded-lg px-1.5 text-[9px] font-black tracking-tight transition-colors ${
                    isNotifMenuOpen
                      ? 'bg-[#c7a65e] text-zinc-950'
                      : 'bg-white border border-zinc-200/60 text-zinc-800 shadow-2xs group-hover:border-[#c7a65e]/30'
                  }`}
                >
                  3
                </span>
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
                <ChevronDown
                  size={14}
                  className={`hidden sm:block text-zinc-400 transition-transform duration-200 ${
                    isProfileMenuOpen ? 'rotate-180 text-[#c7a65e]' : ''
                  }`}
                />
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
                    onClick={() => showNotice('System settings will be available here soon.')}
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

        {/* Staff Dashboard Main Content */}
        <div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
          {error && <p className="mb-4 sm:mb-6 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-red-700" role="alert">{error}</p>}
          {notice && <p className="mb-4 sm:mb-6 rounded-xl border border-[#dfcfaa] bg-[#fdf9ef] px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-[#735719]" role="status">{notice}</p>}

          <section aria-labelledby="staff-dashboard-heading">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e7dcc5] bg-[#f9f5ea] px-2.5 py-1 text-[8px] sm:text-[9px] font-black tracking-[0.24em] text-[#bb9143] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e]" />
              Internal access only
            </div>
            <h1 id="staff-dashboard-heading" className="mt-2 text-3xl font-black leading-tight tracking-[-0.06em] uppercase sm:mt-4 sm:text-5xl sm:leading-[0.89] sm:tracking-[-0.085em] lg:text-6xl">
              Ready to, <span className="inline-block text-zinc-600 italic sm:block">Hustle Staff!?</span>
            </h1>
          </section>

          <section className="mt-5 grid gap-3 sm:mt-10 sm:gap-6 lg:mt-12 lg:grid-cols-[1.8fr_1fr] xl:grid-cols-[2.2fr_1fr]" aria-label="Staff summary">
            <article className="relative min-h-55 overflow-hidden rounded-2xl bg-[linear-gradient(125deg,#0b0b0c_0%,#171611_100%)] p-5 text-white shadow-[0_16px_28px_rgba(18,18,18,0.12)] sm:min-h-80 sm:rounded-[2.35rem] sm:p-8">
              <div className="absolute -right-14 -top-24 h-64 w-64 rounded-full bg-[#c7a65e]/10 blur-2xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[8px] font-black tracking-[0.25em] text-zinc-500 uppercase sm:text-[9px] sm:tracking-[0.3em]">Today's Revenue</p>
                  <p className="mt-3 text-4xl font-black leading-none tracking-[-0.08em] text-zinc-100 sm:mt-5 sm:text-6xl">₱ 0.00</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#6f561b] bg-[#3b2d0a] text-[#c7a65e] sm:h-16 sm:w-16"><TrendingUp size={25} strokeWidth={2} /></div>
              </div>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between border-t border-white/10 pt-4 sm:inset-x-8 sm:bottom-8 sm:pt-6">
                <div>
                  <p className="text-[8px] font-black tracking-[0.22em] text-zinc-500 uppercase">Status</p>
                  <p className="mt-1 text-xs font-black tracking-widest text-zinc-200 uppercase sm:text-sm">Live dashboard</p>
                </div>
                <span className="rounded-full border border-[#6f561b] bg-[#3b2d0a] px-3 py-1.5 text-[8px] font-black tracking-[0.16em] text-[#d9bd78] uppercase">Today</span>
              </div>
            </article>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-1">
              <article className="flex min-h-33 flex-col justify-between rounded-2xl border border-zinc-200 bg-[#eeeeef] p-3.5 shadow-sm sm:min-h-38 sm:px-7 sm:py-5">
                <div>
                  <p className="flex items-center gap-1 text-[7.5px] font-black tracking-[0.14em] text-zinc-500 uppercase sm:gap-2 sm:text-[9px] sm:tracking-[0.3em]"><ClipboardCheck size={12} /> Transactions</p>
                  <p className="mt-2 text-3xl font-black leading-none tracking-[-0.08em] sm:mt-4 sm:text-5xl">00</p>
                </div>
                <p className="text-[8px] font-black tracking-[0.15em] text-zinc-500 uppercase">Today</p>
              </article>

              <article className="relative min-h-33 overflow-hidden rounded-2xl bg-[#c9a65c] p-3.5 text-[#262112] shadow-[0_12px_20px_rgba(160,119,39,0.12)] sm:min-h-38 sm:px-7 sm:py-5">
                <div className="absolute -right-7 -top-16 h-40 w-40 rounded-full border-22 border-[#f3dfa4]/45" />
                <div className="relative flex items-start justify-between gap-2">
                  <p className="text-[7.5px] font-black tracking-[0.18em] uppercase sm:text-[9px] sm:tracking-[0.3em]">Orders to Pack</p>
                  <Bell size={17} strokeWidth={2} />
                </div>
                <p className="relative mt-6 text-4xl font-black leading-none tracking-[-0.09em] sm:mt-8 sm:text-5xl">18</p>
                <p className="relative mt-2 text-[8px] font-black tracking-[0.15em] text-black/60 uppercase">Action required</p>
              </article>
            </div>
          </section>

          <section className="mt-5 grid gap-3 sm:mt-10 sm:gap-6 lg:mt-12 xl:grid-cols-[minmax(0,1.75fr)_minmax(300px,0.85fr)]">
            <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_12px_35px_rgba(28,28,28,0.035)] sm:rounded-[2.35rem]">
              <div className="border-b border-zinc-200 px-5 py-5 sm:px-8 sm:py-6">
                <h2 className="text-lg font-black tracking-[-0.065em] uppercase sm:text-2xl">Hourly Sales <span className="text-zinc-400 italic">Velocity</span></h2>
                <p className="mt-1 text-xs text-zinc-500">Today's collection curve timeline from 8 AM to 8 PM</p>
              </div>
              <div className="px-5 pb-5 pt-4 sm:px-8 sm:pb-7 sm:pt-6">
                <div className="relative h-47.5 border-b border-l border-zinc-100 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_21px,#f1f1f1_22px)] sm:h-62">
                  <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#c7a65e]" />
                  <div className="absolute inset-x-0 top-[calc(50%-3px)] flex justify-between">
                    {Array.from({ length: 13 }, (_, index) => <span key={index} className="h-2 w-2 rounded-full bg-[#c7a65e]" />)}
                  </div>
                </div>
                <div className="mt-3 flex justify-between pl-1 text-[8px] font-medium text-zinc-400 sm:text-[9px]">
                  {['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'].map((time) => <span key={time}>{time}</span>)}
                </div>
              </div>
            </article>

            <article className="flex min-h-85 flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_12px_35px_rgba(28,28,28,0.035)] sm:rounded-[2.35rem] sm:p-7">
              <div>
                <h2 className="text-lg font-black tracking-[-0.065em] uppercase sm:text-2xl">Category <span className="text-zinc-400 italic">Distribution</span></h2>
                <p className="mt-1 text-xs text-zinc-500">Comparison ratio between services and products</p>
              </div>
              <div className="flex flex-1 items-center justify-center py-6">
                <svg viewBox="0 0 42 42" className="h-36 w-36 -rotate-90 sm:h-40 sm:w-40" role="img" aria-label="Category distribution chart">
                  <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#efefef" strokeWidth="6" />
                  <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#c7a65e" strokeDasharray="68 32" strokeDashoffset="25" strokeWidth="6" />
                  <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#171717" strokeDasharray="28 72" strokeDashoffset="-45" strokeWidth="6" />
                </svg>
              </div>
              <div className="flex items-center justify-center gap-5 text-[9px] font-black tracking-[0.14em] uppercase sm:gap-6 sm:text-[10px]">
                <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full bg-[#c7a65e]" />Services</span>
                <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full bg-[#171717]" />Products</span>
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}