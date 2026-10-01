import StaffSidebar from '../components/sidebars/StaffSidebar';
import {
  Bell,
  ChevronDown,
  HelpCircle,
  LogOut,
  Menu,
  MessageSquare,
  PhoneCall,
  Plus,
  Search,
  Settings,
  User,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { authApi } from '../auth/api';

const faqList = [
  {
    q: 'Paano i-process ang Walk-in POS payment?',
    a: 'Pumunta lamang sa Walk-in Payment menu sa sidebar, piliin ang mga serbisyo o produkto, at i-click ang checkout para makapagtala ng transaksyon.',
  },
  {
    q: 'Ano ang gagawin kapag nag-loko ang inventory count?',
    a: 'Maaari mong i-refresh ang Inventory page o kaya ay i-report agad sa system administrator o owner portal kung patuloy ang discrepancy.',
  },
  {
    q: 'Paano i-update ang aking profile details bilang staff?',
    a: 'I-click lamang ang iyong pangalan o avatar sa kanang itaas ng header at piliin ang My Profile kapag na-enable na ito.',
  },
];

export default function StaffSupport() {
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredFaqs = faqList.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Staff Support Main Content */}
        <div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
          {error && <p className="mb-4 sm:mb-6 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-red-700" role="alert">{error}</p>}
          {notice && <p className="mb-4 sm:mb-6 rounded-xl border border-[#dfcfaa] bg-[#fdf9ef] px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-[#735719]" role="status">{notice}</p>}

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e7dcc5] bg-[#f9f5ea] px-2.5 py-1 text-[8px] sm:text-[9px] font-black tracking-[0.24em] text-[#bb9143] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e]" />
                Help Center
              </div>
              <h1 className="mt-2 text-3xl font-black leading-tight tracking-[-0.06em] uppercase sm:mt-3 sm:text-4xl lg:text-5xl">
                Staff <span className="text-zinc-400 italic">Support</span>
              </h1>
            </div>
          </div>

          {/* Support Cards Grid */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e7dcc5] bg-[#f9f5ea] text-[#bb9143] mb-4">
                  <PhoneCall size={22} />
                </div>
                <h2 className="text-base font-black uppercase text-zinc-900 tracking-tight">Direct Administrator Hotline</h2>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  May kailangang i-escalate na problema sa terminal o transaksyon? Tawagan agad ang management o shop owner.
                </p>
              </div>
              <button
                type="button"
                onClick={() => showNotice('Calling administrator hotline...')}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3 text-xs font-black tracking-wider text-white uppercase shadow-sm transition hover:bg-[#c7a65e] active:scale-95"
              >
                <PhoneCall size={14} />
                <span>Call Owner / Admin</span>
              </button>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e7dcc5] bg-[#f9f5ea] text-[#bb9143] mb-4">
                  <MessageSquare size={22} />
                </div>
                <h2 className="text-base font-black uppercase text-zinc-900 tracking-tight">Technical Assistance Ticket</h2>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  Mag-submit ng technical support ticket para sa mga bug, error sa sistema, o iba pang concern sa terminal.
                </p>
              </div>
              <button
                type="button"
                onClick={() => showNotice('Support ticket submitted successfully.')}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-3 text-xs font-black tracking-wider text-zinc-800 uppercase shadow-xs transition hover:border-[#c7a65e] hover:bg-zinc-50 active:scale-95"
              >
                <HelpCircle size={14} className="text-[#c7a65e]" />
                <span>Open Support Ticket</span>
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black tracking-[-0.065em] uppercase sm:text-xl">Frequently Asked Questions</h2>
                <p className="mt-1 text-xs text-zinc-500">Mga karaniwang gabay para sa mga staff ng Hustle Friends</p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Maghanap ng tanong..."
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-2 pl-10 pr-4 text-xs font-bold text-zinc-800 placeholder:text-zinc-400 focus:border-[#c7a65e] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="divide-y divide-zinc-100 p-6">
              {filteredFaqs.length === 0 ? (
                <p className="text-xs text-zinc-500 text-center py-8 uppercase">Walang nakitang katanungan na tumutugma sa iyong hinahanap.</p>
              ) : (
                filteredFaqs.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0">
                    <h3 className="text-sm font-black text-zinc-900 uppercase tracking-tight flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e]" />
                      {faq.q}
                    </h3>
                    <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed pl-3.5">{faq.a}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}