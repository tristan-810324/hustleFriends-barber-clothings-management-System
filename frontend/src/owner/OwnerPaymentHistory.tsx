import { useState, useRef, useEffect } from 'react';
import {
  Bell,
  ChevronDown,
  Filter,
  FileSpreadsheet,
  FileText,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  User,
  Eye,
  Calendar,
} from 'lucide-react';
import OwnerSidebar from '../components/sidebars/OwnerSidebar';
import { authApi } from '../auth/api';

interface HustleLogRecord {
  id: string;
  date: string;
  time: string;
  clientName: string;
  source: 'Walk-in (POS)' | 'eCommerce (Online)' | 'VIP Memberships';
  year: string;
  month: string;
}

const mockLogs: HustleLogRecord[] = [
  { id: '1', date: 'Aug 21, 2026', time: '06:07 AM', clientName: 'angieee tigasin', source: 'Walk-in (POS)', year: '2026', month: 'August' },
  { id: '2', date: 'Aug 21, 2026', time: '06:03 AM', clientName: 'angieee tigasin', source: 'Walk-in (POS)', year: '2026', month: 'August' },
  { id: '3', date: 'Aug 21, 2026', time: '06:00 AM', clientName: 'Justine Soliman', source: 'eCommerce (Online)', year: '2026', month: 'August' },
  { id: '4', date: 'Jun 14, 2026', time: '05:43 AM', clientName: 'Tristan Bautista', source: 'VIP Memberships', year: '2026', month: 'June' },
  { id: '5', date: 'Jun 12, 2026', time: '04:01 PM', clientName: 'lesley jeng', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '6', date: 'Jun 12, 2026', time: '04:00 PM', clientName: 'nana', source: 'eCommerce (Online)', year: '2026', month: 'June' },
  { id: '7', date: 'Jun 12, 2026', time: '03:05 PM', clientName: 'jhllian bautista', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '8', date: 'Jun 12, 2026', time: '04:23 AM', clientName: 'Tristan Bautista', source: 'VIP Memberships', year: '2026', month: 'June' },
  { id: '9', date: 'Jun 12, 2026', time: '01:04 AM', clientName: 'bato relarosa', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '10', date: 'Jun 12, 2026', time: '12:54 AM', clientName: 'bato relarosa', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '11', date: 'Jun 10, 2026', time: '11:01 PM', clientName: 'tristan0324fedsvs', source: 'eCommerce (Online)', year: '2026', month: 'June' },
  { id: '12', date: 'Jun 10, 2026', time: '10:46 PM', clientName: 'bato relarosa', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '13', date: 'Jun 10, 2026', time: '10:16 PM', clientName: 'bato relarosa', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '14', date: 'Jun 10, 2026', time: '02:35 AM', clientName: 'bato relarosa', source: 'eCommerce (Online)', year: '2026', month: 'June' },
  { id: '15', date: 'Jun 09, 2026', time: '08:07 PM', clientName: 'bato relarosa', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '16', date: 'Jun 08, 2026', time: '03:17 PM', clientName: 'jonnyhaah', source: 'eCommerce (Online)', year: '2026', month: 'June' },
  { id: '17', date: 'Jun 08, 2026', time: '03:12 PM', clientName: 'brunson pumaldo', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '18', date: 'Jun 08, 2026', time: '02:23 PM', clientName: 'haha jeng', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '19', date: 'Jun 08, 2026', time: '03:44 AM', clientName: 'bato relarosa', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '20', date: 'Jun 08, 2026', time: '03:09 AM', clientName: 'bato relarosa', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '21', date: 'Jun 08, 2026', time: '02:49 AM', clientName: 'bato relarosa', source: 'eCommerce (Online)', year: '2026', month: 'June' },
  { id: '22', date: 'Jun 07, 2026', time: '10:53 PM', clientName: 'tristan0324fedsvs', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '23', date: 'Jun 07, 2026', time: '09:45 PM', clientName: 'bato relarosa', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '24', date: 'Jun 07, 2026', time: '09:43 PM', clientName: 'tristan0324fedsvs', source: 'VIP Memberships', year: '2026', month: 'June' },
  { id: '25', date: 'Jun 07, 2026', time: '09:42 PM', clientName: 'bato relarosa', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '26', date: 'Jun 07, 2026', time: '09:41 PM', clientName: 'tristan0324fedsvs', source: 'eCommerce (Online)', year: '2026', month: 'June' },
  { id: '27', date: 'Jun 06, 2026', time: '02:15 PM', clientName: 'angieee tigasin', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '28', date: 'Jun 05, 2026', time: '12:36 PM', clientName: 'angieee tigasin', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '29', date: 'Jun 04, 2026', time: '06:23 PM', clientName: 'mr.3k', source: 'eCommerce (Online)', year: '2026', month: 'June' },
  { id: '30', date: 'Jun 04, 2026', time: '06:17 PM', clientName: 'claudio', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '31', date: 'Jun 04, 2026', time: '06:03 PM', clientName: 'angieee tigasin', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '32', date: 'Jun 03, 2026', time: '04:18 PM', clientName: 'asbfjebfefe', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '33', date: 'Jun 03, 2026', time: '01:20 PM', clientName: 'tristan ivan bautista', source: 'eCommerce (Online)', year: '2026', month: 'June' },
  { id: '34', date: 'Jun 03, 2026', time: '11:39 AM', clientName: 'dsdvdsvdsvdsv', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '35', date: 'Jun 02, 2026', time: '05:05 PM', clientName: 'charles soriano', source: 'Walk-in (POS)', year: '2026', month: 'June' },
  { id: '36', date: 'Jun 02, 2026', time: '04:52 PM', clientName: 'angieee tigasin', source: 'VIP Memberships', year: '2026', month: 'June' },
  { id: '37', date: 'May 30, 2026', time: '06:30 PM', clientName: 'fdfdsdsfdsg', source: 'Walk-in (POS)', year: '2026', month: 'May' },
  { id: '38', date: 'May 30, 2026', time: '06:26 PM', clientName: 'wgrwgrgr', source: 'Walk-in (POS)', year: '2026', month: 'May' },
  { id: '39', date: 'May 29, 2026', time: '09:32 PM', clientName: 'angel tigasin', source: 'eCommerce (Online)', year: '2026', month: 'May' },
  { id: '40', date: 'May 29, 2026', time: '07:18 PM', clientName: 'angel tigasin', source: 'Walk-in (POS)', year: '2026', month: 'May' },
  { id: '41', date: 'May 29, 2026', time: '07:11 PM', clientName: 'norman tigas', source: 'Walk-in (POS)', year: '2026', month: 'May' },
  { id: '42', date: 'May 29, 2026', time: '07:07 PM', clientName: 'lexi lore', source: 'VIP Memberships', year: '2026', month: 'May' },
  { id: '43', date: 'May 29, 2026', time: '07:03 PM', clientName: 'kurimaw chuche', source: 'Walk-in (POS)', year: '2026', month: 'May' },
  { id: '44', date: 'May 29, 2026', time: '04:56 PM', clientName: 'wally', source: 'Walk-in (POS)', year: '2026', month: 'May' },
  { id: '45', date: 'May 29, 2026', time: '04:55 PM', clientName: 'sharinami haha', source: 'Walk-in (POS)', year: '2026', month: 'May' },
];

const sourcesList = ['All Sources', 'Walk-in (POS)', 'eCommerce (Online)', 'VIP Memberships'];
const yearsList = ['2026', '2025', '2024', '2023', '2022', '2021'];
const monthsList = [
  'Full Year',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function OwnerPaymentHistory() {
  const [logs] = useState<HustleLogRecord[]>(mockLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('All Sources');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('Full Year');

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

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = selectedSource === 'All Sources' || log.source === selectedSource;
    const matchesYear = log.year === selectedYear;
    const matchesMonth = selectedMonth === 'Full Year' || log.month === selectedMonth;

    return matchesSearch && matchesSource && matchesYear && matchesMonth;
  });

  return (
    <main className="min-h-screen bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
      {/* Sidebar Overlay for Mobile and Fixed Sidebar for Desktop */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <OwnerSidebar onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} />
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Owner navigation">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px]"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation overlay"
          />
          <div className="relative h-full w-72">
            <OwnerSidebar onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} />
          </div>
        </div>
      )}

      <div className="min-h-screen lg:ml-72">
        {/* Header Bar */}
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
              onClick={() => showNotice('Quick action feature coming soon.')}
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
                    <button type="button" onClick={() => setIsNotifMenuOpen(false)} className="text-[9px] font-bold text-[#c7a65e] uppercase transition hover:text-[#a37d2d]">
                      Mark as read
                    </button>
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

            {/* Profile Dropdown */}
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

        {/* Main Body */}
        <div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
          {error && (
            <p className="mb-4 sm:mb-6 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-red-700" role="alert">
              {error}
            </p>
          )}

          {/* Title Banner */}
          <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[8px] sm:text-[9px] font-black tracking-[0.35em] text-[#c7a65e] uppercase">
                Authenticated: Founder Access
              </p>
              <h1 className="mt-2 text-3xl font-black italic leading-[0.85] tracking-[-0.08em] sm:mt-3 sm:text-6xl lg:text-7xl">
                PAYMENT
              </h1>
              <p className="text-2xl font-black italic leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_#aeb3b8] sm:text-5xl lg:text-6xl">
                HUSTLE LOGS.
              </p>
            </div>

            {/* Export Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => showNotice('Downloading Excel log report...')}
                className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-black uppercase text-emerald-700 transition hover:bg-emerald-100 active:scale-95 shadow-2xs"
              >
                <FileSpreadsheet size={15} />
                <span>Download Excel</span>
              </button>
              <button
                type="button"
                onClick={() => showNotice('Downloading Word log report...')}
                className="flex items-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-black uppercase text-blue-700 transition hover:bg-blue-100 active:scale-95 shadow-2xs"
              >
                <FileText size={15} />
                <span>Download Word</span>
              </button>
            </div>
          </header>

          {notice && (
            <p className="mb-5 rounded-xl border border-[#ead9b8] bg-white px-4 py-3 text-sm text-[#8d6c2c]" role="status">
              {notice}
            </p>
          )}

          {/* Filter Bar Controls */}
          <div className="mb-6 rounded-3xl bg-white p-4 sm:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)] border border-zinc-100">
            <div className="flex items-center gap-2 mb-4 text-xs font-extrabold uppercase text-[#b08b3a] tracking-wider">
              <Filter size={14} />
              <span>Filter Controls</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* Search Client */}
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search Client Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200/80 bg-zinc-50/50 py-2.5 pl-10 pr-4 text-xs font-medium text-zinc-900 shadow-2xs outline-none transition placeholder:text-zinc-400 focus:border-[#c7a65e] focus:bg-white focus:ring-1 focus:ring-[#c7a65e]"
                />
              </div>

              {/* Source Dropdown */}
              <div className="relative">
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-zinc-200/80 bg-zinc-50/50 py-2.5 pl-4 pr-10 text-xs font-bold text-zinc-800 outline-none transition focus:border-[#c7a65e] focus:bg-white focus:ring-1 focus:ring-[#c7a65e]"
                >
                  {sourcesList.map((src) => (
                    <option key={src} value={src}>
                      {src}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              </div>

              {/* Year Dropdown */}
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-zinc-200/80 bg-zinc-50/50 py-2.5 pl-4 pr-10 text-xs font-bold text-zinc-800 outline-none transition focus:border-[#c7a65e] focus:bg-white focus:ring-1 focus:ring-[#c7a65e]"
                >
                  {yearsList.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
                <Calendar size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              </div>

              {/* Month Dropdown */}
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-zinc-200/80 bg-zinc-50/50 py-2.5 pl-4 pr-10 text-xs font-bold text-zinc-800 outline-none transition focus:border-[#c7a65e] focus:bg-white focus:ring-1 focus:ring-[#c7a65e]"
                >
                  {monthsList.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_12px_30px_rgba(0,0,0,0.04)] border border-zinc-100">
            <div className="border-b border-zinc-100 bg-zinc-50/60 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-800">
                Recent Transactions ({filteredLogs.length})
              </h2>
              <span className="text-[10px] font-bold text-zinc-400 uppercase">
                Showing logs for {selectedYear} - {selectedMonth}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-150 text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50/30 text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                    <th className="py-4 px-6">Date / Time</th>
                    <th className="py-4 px-6">Client Name</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-xs">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="transition-colors hover:bg-zinc-50/80">
                        <td className="py-4 px-6">
                          <p className="font-bold text-zinc-900">{log.date}</p>
                          <p className="text-[10px] font-medium text-zinc-400">{log.time}</p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-black text-zinc-950 uppercase tracking-tight text-sm">
                            {log.clientName}
                          </p>
                          <span className="inline-block mt-0.5 rounded-md bg-zinc-100 px-2 py-0.5 text-[9px] font-extrabold text-zinc-500 uppercase tracking-wider">
                            {log.source}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            type="button"
                            onClick={() => showNotice(`Previewing details for ${log.clientName}...`)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-zinc-50 px-3.5 py-2 text-[10px] font-black uppercase tracking-wider text-zinc-800 transition hover:border-[#c7a65e] hover:bg-white hover:text-[#b08b3a] active:scale-95"
                          >
                            <Eye size={13} />
                            <span>PREVIEW</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-12 text-center text-zinc-400 font-medium">
                        No transactions found for the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Branding Text */}
          <footer className="mt-10 border-t border-zinc-200/60 pt-6 text-center text-xs font-bold text-zinc-400">
            <p className="tracking-widest uppercase">Hustle Friends Co. ® 2026</p>
            <p className="mt-1 text-[10px] font-black tracking-[0.2em] text-[#c7a65e] uppercase">
              Work Hard • Stay Sharp
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}