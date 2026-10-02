import { useState, useRef, useEffect } from 'react';
import { Activity, Bell, CalendarDays, CircleDollarSign, Menu, MessageSquare, Package, ShoppingBag, TrendingUp, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import OwnerSidebar from '../components/sidebars/OwnerSidebar';
import { authApi } from '../auth/api';

const sales = [27800, 14200, 0, 2200, 0, 0];
const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

const Metric = ({ label, value, accent, icon: Icon }: { label: string; value: string; accent?: boolean; icon: typeof CircleDollarSign }) => (
  <article className={`rounded-3xl border bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.04)] ${accent ? 'border-[#ead9b8]' : 'border-zinc-100'}`}>
    <div className="flex items-center justify-between"><p className={`text-[9px] font-black tracking-[0.25em] uppercase ${accent ? 'text-[#b08b3a]' : 'text-zinc-400'}`}>{label}</p><Icon size={16} className={accent ? 'text-[#c7a65e]' : 'text-zinc-300'} /></div>
    <p className={`mt-4 text-3xl font-black tracking-tight ${accent ? 'text-[#b08b3a]' : 'text-zinc-950'}`}>{value}</p>
  </article>
);

export default function OwnerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const memberName = 'Owner Account';
  const userInitial = 'O';

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
    setIsSidebarOpen(false);
    closeAllDropdowns();
    window.setTimeout(() => setNotice(''), 3000);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block"><OwnerSidebar onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} /></div>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Owner navigation">
          <button type="button" className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px]" onClick={() => setIsSidebarOpen(false)} aria-label="Close navigation overlay" />
          <div className="relative h-full w-72"><OwnerSidebar onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} /></div>
        </div>
      )}
      <div className="min-h-screen lg:ml-72">
        {/* Top Navigation Bar - Identical to StaffDashboard */}
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
                  Owner <span className="font-light text-zinc-400">terminal</span>
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
              <Package size={14} strokeWidth={2.5} />
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

        <div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
          {error && <p className="mb-4 sm:mb-6 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-red-700" role="alert">{error}</p>}
          <header className="mb-8"><p className="text-[8px] sm:text-[9px] font-black tracking-[0.35em] text-[#c7a65e] uppercase">Authenticated: founder access</p><h1 className="mt-2 text-3xl font-black italic leading-[0.85] tracking-[-0.08em] sm:mt-3 sm:text-6xl lg:text-7xl">CORE</h1><p className="text-2xl font-black italic leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_#aeb3b8] sm:text-5xl lg:text-6xl">OPERATIONS.</p></header>
          {notice && <p className="mb-5 rounded-xl border border-[#ead9b8] bg-white px-4 py-3 text-sm text-[#8d6c2c]" role="status">{notice}</p>}
          <section className="grid gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-5">
            <Metric label="Today's sales" value="₱0.00" accent icon={CircleDollarSign} /><Metric label="Appointments" value="8" icon={CalendarDays} /><Metric label="Low stock" value="0" icon={Package} /><Metric label="Messages" value="3" icon={MessageSquare} /><Metric label="System" value="ONLINE" accent icon={Activity} />
          </section>
          <section className="mt-5 sm:mt-10 lg:mt-12 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)]">
            <article className="rounded-3xl bg-white p-5 sm:p-8 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between"><div><h2 className="text-lg sm:text-xl font-black italic uppercase">Monthly <span className="text-[#c7a65e]">sales trend</span></h2><p className="mt-1 text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-zinc-400 uppercase">Last 6 months performance</p></div><TrendingUp className="text-[#c7a65e]" size={20} /></div>
              <div className="relative mt-8 h-64 border-b border-l border-zinc-200 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[20%_100%,100%_20%]">
                <div className="absolute inset-x-0 bottom-0 top-0"><svg viewBox="0 0 600 240" preserveAspectRatio="none" className="h-full w-full overflow-visible"><polyline points="0,20 120,105 240,240 360,220 480,240 600,240" fill="none" stroke="#c7a65e" strokeWidth="3" vectorEffect="non-scaling-stroke" /><polyline points="0,20 120,105 240,240 360,220 480,240 600,240" fill="none" stroke="#c7a65e" strokeWidth="10" strokeOpacity=".08" vectorEffect="non-scaling-stroke" /></svg>{sales.map((value, index) => <span key={months[index]} className="absolute h-3 w-3 rounded-full bg-[#c7a65e] ring-4 ring-[#c7a65e]/10" style={{ left: `${index * 20}%`, bottom: `${Math.max(value / 278, 0)}%`, transform: 'translate(-50%, 50%)' }} />)}</div>
                <div className="absolute -bottom-6 flex w-full justify-between text-[9px] font-bold text-zinc-500">{months.map((month) => <span key={month}>{month}</span>)}</div>
              </div>
            </article>
            <article className="rounded-3xl bg-white p-5 sm:p-8 shadow-[0_12px_30px_rgba(0,0,0,0.04)]"><div className="flex items-start justify-between"><div><h2 className="text-lg sm:text-xl font-black italic uppercase">Staff <span className="text-[#c7a65e]">activity</span></h2><p className="mt-1 text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-zinc-400 uppercase">Real-time monitoring</p></div><button type="button" onClick={() => showNotice('Full audit trail will be available here soon.')} className="text-[8px] sm:text-[9px] font-black tracking-wider text-zinc-400 uppercase underline decoration-[#c7a65e] underline-offset-8">Full audit trail</button></div><div className="mt-8 overflow-x-auto"><table className="w-full min-w-105 text-left text-[10px]"><thead className="text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase"><tr><th className="pb-4">Time</th><th className="pb-4">Staff</th><th className="pb-4">Event</th><th className="pb-4 text-right">Status</th></tr></thead><tbody className="divide-y divide-zinc-100"><tr><td className="py-4 text-zinc-500">16:20</td><td className="py-4 font-black">Staff_Juan</td><td className="py-4 text-zinc-600">Accepted Booking: Marco Santos</td><td className="py-4 text-right"><span className="rounded-full bg-emerald-50 px-3 py-1 font-bold text-emerald-600">Approved</span></td></tr><tr><td className="py-4 text-zinc-500">15:45</td><td className="py-4 font-black">Staff_Kiko</td><td className="py-4 text-zinc-600">Walk-in Sale: 2x Classic Tee</td><td className="py-4 text-right"><span className="rounded-full bg-emerald-50 px-3 py-1 font-bold text-emerald-600">Paid</span></td></tr></tbody></table></div></article>
          </section>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-zinc-400"><span className="inline-flex items-center gap-2"><ShoppingBag size={14} /> Inventory synced</span><span className="inline-flex items-center gap-2"><Bell size={14} /> 3 unread notifications</span></div>
        </div>
      </div>
    </main>
  );
}