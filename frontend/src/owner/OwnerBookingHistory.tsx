import { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Calendar,
  ChevronDown,
  Filter,
  LogOut,
  Menu,
  Package,
  Phone,
  Search,
  Settings,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Scissors,
} from 'lucide-react';
import OwnerSidebar from '../components/sidebars/OwnerSidebar';
import { authApi } from '../auth/api';

interface BookingLog {
  id: string;
  clientName: string;
  phone: string;
  service: string;
  bookingType: 'reservation' | 'walk-in';
  price: number;
  barber: string;
  dateTime: string;
  status: 'APPROVED' | 'PENDING' | 'CANCELLED';
}

const mockBookings: BookingLog[] = [
  {
    id: '1',
    clientName: 'John Wick',
    phone: '0912-345-6789',
    service: 'Executive Cut',
    bookingType: 'reservation',
    price: 500.0,
    barber: 'Barber Macky',
    dateTime: 'Apr 26, 2026 | 10:00 AM',
    status: 'APPROVED',
  },
  {
    id: '2',
    clientName: 'Arthur Morgan',
    phone: '0999-888-7766',
    service: 'Classic Shave',
    bookingType: 'walk-in',
    price: 300.0,
    barber: 'Barber Ryan',
    dateTime: 'Apr 26, 2026 | 11:30 AM',
    status: 'PENDING',
  },
  {
    id: '3',
    clientName: 'Tony Stark',
    phone: '0917-000-1122',
    service: 'Full Grooming',
    bookingType: 'reservation',
    price: 1200.0,
    barber: 'Barber Macky',
    dateTime: 'Apr 25, 2026 | 02:00 PM',
    status: 'CANCELLED',
  },
];

export default function OwnerBookingHistory() {
  const [bookings] = useState<BookingLog[]>(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'APPROVED' | 'PENDING' | 'CANCELLED'>('ALL');
  
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

  const filteredBookings = bookings.filter((item) => {
    const matchesSearch =
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery);

    const matchesStatus =
      selectedStatus === 'ALL' || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
      {/* Sidebar for Desktop & Mobile Overlay */}
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
        {/* Header Bar - Identical to OwnerDashboard */}
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

        {/* Main Content Body */}
        <div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
          {error && (
            <p className="mb-4 sm:mb-6 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-red-700" role="alert">
              {error}
            </p>
          )}

          {/* Title Banner */}
          <header className="mb-8">
            <p className="text-[8px] sm:text-[9px] font-black tracking-[0.35em] text-[#c7a65e] uppercase">
              Audit Trail
            </p>
            <h1 className="mt-2 text-3xl font-black italic leading-[0.85] tracking-[-0.08em] sm:mt-3 sm:text-6xl lg:text-7xl">
              BOOKING
            </h1>
            <p className="text-2xl font-black italic leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_#aeb3b8] sm:text-5xl lg:text-6xl">
              HISTORY.
            </p>
            <p className="mt-3 text-xs sm:text-sm font-bold text-zinc-400">
              Manage client information and booking status
            </p>
          </header>

          {notice && (
            <p className="mb-5 rounded-xl border border-[#ead9b8] bg-white px-4 py-3 text-sm text-[#8d6c2c]" role="status">
              {notice}
            </p>
          )}

          {/* Search & Filter Tabs */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search client, service, or barber..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-zinc-200/80 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-zinc-900 shadow-2xs outline-none transition placeholder:text-zinc-400 focus:border-[#c7a65e] focus:ring-1 focus:ring-[#c7a65e]"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-zinc-200/80 bg-white p-1 shadow-2xs">
              <span className="px-2 text-[10px] font-extrabold uppercase text-zinc-400 flex items-center gap-1">
                <Filter size={12} />
              </span>
              {[
                { label: 'All Logs', value: 'ALL' },
                { label: 'Approved', value: 'APPROVED' },
                { label: 'Pending', value: 'PENDING' },
                { label: 'Cancelled', value: 'CANCELLED' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setSelectedStatus(tab.value as any)}
                  className={`rounded-xl px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                    selectedStatus === tab.value
                      ? 'bg-zinc-950 text-[#c7a65e] shadow-xs'
                      : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_12px_30px_rgba(0,0,0,0.04)] border border-zinc-100">
            <div className="overflow-x-auto">
              <table className="w-full min-w-200 text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50/60 text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                    <th className="py-4 px-6">Client Informations</th>
                    <th className="py-4 px-6">Payment Intel</th>
                    <th className="py-4 px-6">Performance</th>
                    <th className="py-4 px-6 text-right">Activity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-xs">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((item) => (
                      <tr key={item.id} className="transition-colors hover:bg-zinc-50/60">
                        {/* Client Informations */}
                        <td className="py-5 px-6">
                          <p className="font-black text-zinc-950 uppercase tracking-tight text-sm">
                            {item.clientName}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-[11px] font-bold text-zinc-400">
                            <Phone size={11} className="text-[#c7a65e]" />
                            <span>{item.phone}</span>
                          </p>
                        </td>

                        {/* Payment Intel */}
                        <td className="py-5 px-6">
                          <p className="font-extrabold text-zinc-900 text-xs uppercase">
                            {item.service}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="inline-block rounded-md bg-zinc-100 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-zinc-500">
                              {item.bookingType}
                            </span>
                            <span className="font-black text-[#b08b3a] text-sm">
                              ₱{item.price.toFixed(2)}
                            </span>
                          </div>
                        </td>

                        {/* Performance */}
                        <td className="py-5 px-6">
                          <p className="font-extrabold text-zinc-900 flex items-center gap-1.5">
                            <Scissors size={12} className="text-[#c7a65e]" />
                            <span>Handle: {item.barber}</span>
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-zinc-400">
                            <Calendar size={11} />
                            <span>{item.dateTime}</span>
                          </p>
                        </td>

                        {/* Activity Status */}
                        <td className="py-5 px-6 text-right">
                          {item.status === 'APPROVED' && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-[10px] font-extrabold text-emerald-600 tracking-wider">
                              <CheckCircle2 size={13} />
                              <span>APPROVED</span>
                            </span>
                          )}
                          {item.status === 'PENDING' && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1.5 text-[10px] font-extrabold text-amber-600 tracking-wider">
                              <AlertCircle size={13} />
                              <span>PENDING</span>
                            </span>
                          )}
                          {item.status === 'CANCELLED' && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1.5 text-[10px] font-extrabold text-red-500 tracking-wider">
                              <XCircle size={13} />
                              <span>CANCELLED</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-zinc-400 font-medium">
                        No booking history logs found.
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