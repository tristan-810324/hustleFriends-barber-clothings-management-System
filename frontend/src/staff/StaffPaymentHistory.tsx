import StaffSidebar from '../components/sidebars/StaffSidebar';
import {
  Bell,
  ChevronDown,
  FileSpreadsheet,
  FileText,
  Filter,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  User,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { authApi } from '../auth/api';

const transactionsData = [
  { date: 'Aug 21, 2026', time: '06:07 AM', client: 'angieee tigasin' },
  { date: 'Aug 21, 2026', time: '06:03 AM', client: 'angieee tigasin' },
  { date: 'Aug 21, 2026', time: '06:00 AM', client: 'Justine Soliman' },
  { date: 'Jun 14, 2026', time: '05:43 AM', client: 'Tristan Bautista' },
  { date: 'Jun 12, 2026', time: '04:01 PM', client: 'lesley jeng' },
  { date: 'Jun 12, 2026', time: '04:00 PM', client: 'nana' },
  { date: 'Jun 12, 2026', time: '03:05 PM', client: 'jhllian bautista' },
  { date: 'Jun 12, 2026', time: '04:23 AM', client: 'Tristan Bautista' },
  { date: 'Jun 12, 2026', time: '01:04 AM', client: 'bato relarosa' },
  { date: 'Jun 12, 2026', time: '12:54 AM', client: 'bato relarosa' },
  { date: 'Jun 10, 2026', time: '11:01 PM', client: 'tristan0324fedsvs' },
  { date: 'Jun 10, 2026', time: '10:46 PM', client: 'bato relarosa' },
  { date: 'Jun 10, 2026', time: '10:16 PM', client: 'bato relarosa' },
  { date: 'Jun 10, 2026', time: '02:35 AM', client: 'bato relarosa' },
  { date: 'Jun 09, 2026', time: '08:07 PM', client: 'bato relarosa' },
  { date: 'Jun 08, 2026', time: '03:17 PM', client: 'jonnyhaah' },
  { date: 'Jun 08, 2026', time: '03:12 PM', client: 'brunson pumaldo' },
  { date: 'Jun 08, 2026', time: '02:23 PM', client: 'haha jeng' },
  { date: 'Jun 08, 2026', time: '03:44 AM', client: 'bato relarosa' },
  { date: 'Jun 08, 2026', time: '03:09 AM', client: 'bato relarosa' },
  { date: 'Jun 08, 2026', time: '02:49 AM', client: 'bato relarosa' },
  { date: 'Jun 07, 2026', time: '10:53 PM', client: 'tristan0324fedsvs' },
  { date: 'Jun 07, 2026', time: '09:45 PM', client: 'bato relarosa' },
  { date: 'Jun 07, 2026', time: '09:43 PM', client: 'tristan0324fedsvs' },
  { date: 'Jun 07, 2026', time: '09:42 PM', client: 'bato relarosa' },
  { date: 'Jun 07, 2026', time: '09:41 PM', client: 'tristan0324fedsvs' },
  { date: 'Jun 06, 2026', time: '02:15 PM', client: 'angieee tigasin' },
  { date: 'Jun 05, 2026', time: '12:36 PM', client: 'angieee tigasin' },
  { date: 'Jun 04, 2026', time: '06:23 PM', client: 'mr.3k' },
  { date: 'Jun 04, 2026', time: '06:17 PM', client: 'claudio' },
  { date: 'Jun 04, 2026', time: '06:03 PM', client: 'angieee tigasin' },
  { date: 'Jun 03, 2026', time: '04:18 PM', client: 'asbfjebfefe' },
  { date: 'Jun 03, 2026', time: '01:20 PM', client: 'tristan ivan bautista' },
  { date: 'Jun 03, 2026', time: '11:39 AM', client: 'dsdvdsvdsvdsv' },
  { date: 'Jun 02, 2026', time: '05:05 PM', client: 'charles soriano' },
  { date: 'Jun 02, 2026', time: '04:52 PM', client: 'angieee tigasin' },
  { date: 'May 30, 2026', time: '06:30 PM', client: 'fdfdsdsfdsg' },
  { date: 'May 30, 2026', time: '06:26 PM', client: 'wgrwgrgr' },
  { date: 'May 29, 2026', time: '09:32 PM', client: 'angel tigasin' },
  { date: 'May 29, 2026', time: '07:18 PM', client: 'angel tigasin' },
  { date: 'May 29, 2026', time: '07:11 PM', client: 'norman tigas' },
  { date: 'May 29, 2026', time: '07:07 PM', client: 'lexi lore' },
  { date: 'May 29, 2026', time: '07:03 PM', client: 'kurimaw chuche' },
  { date: 'May 29, 2026', time: '04:56 PM', client: 'wally' },
];

export default function StaffPaymentHistory() {
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');

  // Filter states
  const [selectedSource, setSelectedSource] = useState('All Sources');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('Full Year');

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

  return (
    <main className="min-h-screen w-full bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
      {/* Desktop Persistent Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <StaffSidebar onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} />
      </div>

      {/* Mobile Drawer Navigation */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Staff navigation menu">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px] animate-in fade-in duration-300"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation overlay"
          />
          <div className="relative h-full w-72">
            <StaffSidebar onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} />
          </div>
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

        {/* Staff Payment History Main Content */}
        <div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
          {error && <p className="mb-4 sm:mb-6 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-red-700" role="alert">{error}</p>}
          {notice && <p className="mb-4 sm:mb-6 rounded-xl border border-[#dfcfaa] bg-[#fdf9ef] px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-[#735719]" role="status">{notice}</p>}

          {/* Header section with breadcrumbs and download buttons */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e7dcc5] bg-[#f9f5ea] px-2.5 py-1 text-[8px] sm:text-[9px] font-black tracking-[0.24em] text-[#bb9143] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e]" />
                History & Records
              </div>
              <h1 className="mt-2 text-3xl font-black leading-tight tracking-[-0.06em] uppercase sm:mt-3 sm:text-4xl lg:text-5xl">
                Payment <span className="text-zinc-400 italic">Hustle Logs</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => showNotice('Excel report downloaded successfully.')}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-black tracking-wider text-zinc-800 uppercase shadow-xs transition hover:border-[#c7a65e] hover:bg-zinc-50 active:scale-95"
              >
                <FileSpreadsheet size={16} className="text-emerald-600" />
                <span>Download Excel</span>
              </button>
              <button
                type="button"
                onClick={() => showNotice('Word report downloaded successfully.')}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-black tracking-wider text-zinc-800 uppercase shadow-xs transition hover:border-[#c7a65e] hover:bg-zinc-50 active:scale-95"
              >
                <FileText size={16} className="text-blue-600" />
                <span>Download Word</span>
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {/* Source Filter */}
              <div>
                <label className="block text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase mb-2">Source</label>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs font-bold text-zinc-800 focus:border-[#c7a65e] focus:bg-white focus:outline-none"
                >
                  <option value="All Sources">All Sources</option>
                  <option value="Walk-in (POS)">Walk-in (POS)</option>
                  <option value="eCommerce (Online)">eCommerce (Online)</option>
                  <option value="VIP Memberships">VIP Memberships</option>
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase mb-2">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs font-bold text-zinc-800 focus:border-[#c7a65e] focus:bg-white focus:outline-none"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>

              {/* Month Filter */}
              <div>
                <label className="block text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase mb-2">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs font-bold text-zinc-800 focus:border-[#c7a65e] focus:bg-white focus:outline-none"
                >
                  <option value="Full Year">Full Year</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>

              {/* Filter Submit Button */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => showNotice(`Filters applied: ${selectedSource}, ${selectedYear}, ${selectedMonth}`)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-950 py-2.5 text-xs font-black tracking-wider text-white uppercase shadow-sm transition hover:bg-[#c7a65e] active:scale-95"
                >
                  <Filter size={14} />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Transactions Table Section */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-200 px-5 py-5 sm:px-8 sm:py-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black tracking-[-0.065em] uppercase sm:text-xl">Recent Transactions</h2>
                <p className="mt-1 text-xs text-zinc-500">Showing logs based on current system records</p>
              </div>
              <div className="text-xs font-bold text-zinc-400 uppercase">
                Total: <span className="text-zinc-900 font-black">{transactionsData.length} records</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50/70 text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                    <th className="py-4 px-6">Date / Time</th>
                    <th className="py-4 px-6">Client Name</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-xs font-medium text-zinc-800">
                  {transactionsData.map((tx, idx) => (
                    <tr key={idx} className="transition-colors hover:bg-zinc-50/80">
                      <td className="py-3.5 px-6 whitespace-nowrap">
                        <span className="font-bold text-zinc-900">{tx.date}</span>
                        <span className="ml-2 text-zinc-400 text-[11px]">{tx.time}</span>
                      </td>
                      <td className="py-3.5 px-6 font-bold uppercase text-zinc-800">
                        {tx.client}
                      </td>
                      <td className="py-3.5 px-6 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => showNotice(`Previewing receipt for ${tx.client} (${tx.date} ${tx.time})`)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#e7dcc5] bg-[#f9f5ea] px-3 py-1.5 text-[10px] font-black tracking-wider text-[#bb9143] uppercase transition hover:bg-[#c7a65e] hover:text-white active:scale-95"
                        >
                          <Search size={12} />
                          <span>Preview</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}