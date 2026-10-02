import { useState, useRef, useEffect } from 'react';
import { Activity, Bell, CalendarDays, CircleDollarSign, Menu, Package, TrendingUp, User, Settings, LogOut, ChevronDown, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import OwnerSidebar from '../components/sidebars/OwnerSidebar';
import { authApi } from '../auth/api';

const monthlyBreakdown = [
  { month: 'May', revenue: 27800, expenses: 12000, bookings: 42 },
  { month: 'Jun', revenue: 14200, expenses: 9500, bookings: 28 },
  { month: 'Jul', revenue: 0, expenses: 4000, bookings: 0 },
  { month: 'Aug', revenue: 2200, expenses: 3100, bookings: 5 },
  { month: 'Sep', revenue: 0, expenses: 2500, bookings: 0 },
  { month: 'Oct', revenue: 0, expenses: 2800, bookings: 0 },
];

const Metric = ({ label, value, accent, icon: Icon, change, positive }: { label: string; value: string; accent?: boolean; icon: typeof CircleDollarSign; change?: string; positive?: boolean }) => (
  <article className={`rounded-3xl border bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.04)] ${accent ? 'border-[#ead9b8]' : 'border-zinc-100'}`}>
    <div className="flex items-center justify-between">
      <p className={`text-[9px] font-black tracking-[0.25em] uppercase ${accent ? 'text-[#b08b3a]' : 'text-zinc-400'}`}>{label}</p>
      <Icon size={16} className={accent ? 'text-[#c7a65e]' : 'text-zinc-300'} />
    </div>
    <div className="mt-4 flex items-baseline justify-between">
      <p className={`text-3xl font-black tracking-tight ${accent ? 'text-[#b08b3a]' : 'text-zinc-950'}`}>{value}</p>
      {change && (
        <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-black ${positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </span>
      )}
    </div>
  </article>
);

export default function OwnerStats() {
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
                  Owner <span className="font-light text-zinc-400">statistics</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3.5">
            <button
              type="button"
              onClick={() => showNotice('Export reports feature will be available soon.')}
              className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[10px] font-black tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:bg-[#c7a65e] hover:shadow-md hover:shadow-[#c7a65e]/20 active:scale-95"
            >
              <BarChart3 size={14} strokeWidth={2.5} />
              <span>Export Data</span>
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
          
          <header className="mb-8">
            <p className="text-[8px] sm:text-[9px] font-black tracking-[0.35em] text-[#c7a65e] uppercase">Performance & Analytics</p>
            <h1 className="mt-2 text-3xl font-black italic leading-[0.85] tracking-[-0.08em] sm:mt-3 sm:text-6xl lg:text-7xl">BUSINESS</h1>
            <p className="text-2xl font-black italic leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_#aeb3b8] sm:text-5xl lg:text-6xl">STATISTICS.</p>
          </header>

          {notice && <p className="mb-5 rounded-xl border border-[#ead9b8] bg-white px-4 py-3 text-sm text-[#8d6c2c]" role="status">{notice}</p>}

          <section className="grid gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            <Metric label="Total Revenue" value="₱44,200.00" accent icon={CircleDollarSign} change="+12.4%" positive />
            <Metric label="Total Bookings" value="75" icon={CalendarDays} change="+8.1%" positive />
            <Metric label="Active Products" value="24" icon={Package} change="0.0%" />
            <Metric label="Growth Rate" value="94.2%" accent icon={Activity} change="+4.3%" positive />
          </section>

          <section className="mt-5 sm:mt-10 lg:mt-12 grid gap-6 xl:grid-cols-1">
            <article className="rounded-3xl bg-white p-5 sm:p-8 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-black italic uppercase">Comprehensive <span className="text-[#c7a65e]">performance table</span></h2>
                  <p className="mt-1 text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-zinc-400 uppercase">Monthly breakdown of revenues, expenses, and client bookings</p>
                </div>
                <TrendingUp className="text-[#c7a65e]" size={20} />
              </div>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-125 text-left text-xs">
                  <thead className="text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase border-b border-zinc-100">
                    <tr>
                      <th className="pb-4">Month</th>
                      <th className="pb-4">Revenue</th>
                      <th className="pb-4">Expenses</th>
                      <th className="pb-4">Bookings</th>
                      <th className="pb-4 text-right">Net Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {monthlyBreakdown.map((row) => {
                      const net = row.revenue - row.expenses;
                      return (
                        <tr key={row.month} className="transition-colors hover:bg-zinc-50/50">
                          <td className="py-4 font-black uppercase text-zinc-900">{row.month} 2026</td>
                          <td className="py-4 font-bold text-zinc-700">₱{row.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                          <td className="py-4 font-bold text-zinc-500">₱{row.expenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                          <td className="py-4 text-zinc-600">{row.bookings}</td>
                          <td className={`py-4 text-right font-black ${net >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            ₱{net.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </article>
          </section>

          <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-zinc-400">
            <span className="inline-flex items-center gap-2"><BarChart3 size={14} /> Analytics real-time sync active</span>
            <span className="inline-flex items-center gap-2"><Bell size={14} /> 3 unread notifications</span>
          </div>
        </div>
      </div>
    </main>
  );
}