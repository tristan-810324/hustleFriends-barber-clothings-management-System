import {
  Bell,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  LogOut,
  Megaphone,
  Menu,
  Plus,
  Scissors,
  Settings,
  User,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import ClientSidebar, { type ClientRoute } from '../components/sidebars/ClientSidebar';

type PageShellProps = { username: string; children: ReactNode };

function NotificationsPageShell({ username, children }: PageShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const memberName = useMemo(() => {
    return username ? username.trim() : 'Member';
  }, [username]);

  const userInitial = useMemo(() => {
    return memberName.charAt(0).toUpperCase();
  }, [memberName]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false);
        setIsNotifMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigate = (route: ClientRoute) => {
    window.location.hash = route;
    setIsSidebarOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
      {/* Desktop Persistent Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <ClientSidebar username={username} active="notifications" onNavigate={navigate} onClose={() => setIsSidebarOpen(false)} />
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
            <ClientSidebar username={username} active="notifications" onNavigate={navigate} onClose={() => setIsSidebarOpen(false)} />
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
              onClick={() => navigate('#client-appointments')}
              className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[10px] font-black tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:bg-[#c7a65e] hover:shadow-md hover:shadow-[#c7a65e]/20 active:scale-95 cursor-pointer"
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
                <div className="absolute right-0 z-50 mt-3 w-72 sm:w-80 rounded-2xl border border-zinc-100 bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
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
                <div className="absolute right-0 z-50 mt-3 w-52 rounded-2xl border border-zinc-100 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
                  <div className="border-b border-zinc-100 px-3 py-2.5">
                    <p className="text-[9px] font-black tracking-wider text-zinc-400 uppercase">Logged in as</p>
                    <p className="truncate text-xs font-black text-zinc-900 uppercase">{memberName}</p>
                  </div>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    <User size={15} />
                    <span>My Profile</span>
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    <Settings size={15} />
                    <span>Settings</span>
                  </button>
                  <div className="my-1 border-t border-zinc-100" />
                  <button
                    type="button"
                    onClick={() => { window.location.hash = '#login'; }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-red-500 transition hover:bg-red-50"
                  >
                    <LogOut size={15} />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Notifications Main Body */}
        <div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
          {children}
        </div>
      </div>
    </main>
  );
}

type Props = { username: string };
type Notification = { id: number; title: string; message: string; time: string; icon: typeof Bell; unread: boolean };

const initialNotifications: Notification[] = [
  { id: 1, title: 'Membership payment completed', message: 'Your Premium Annual Membership payment has been successfully recorded.', time: 'Today, 11:01 PM', icon: CreditCard, unread: true },
  { id: 2, title: 'Appointment reminder', message: 'Your upcoming service appointment is ready for your confirmation.', time: 'Yesterday, 04:20 PM', icon: Scissors, unread: true },
  { id: 3, title: 'Welcome to Hustle Friends', message: 'Your member space is ready. Explore your benefits and booking history.', time: 'Jun 07, 2026', icon: Megaphone, unread: true },
];

export default function ClientNotifications({ username }: Props) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((item) => item.unread).length;
  const markAllRead = () => setNotifications((items) => items.map((item) => ({ ...item, unread: false })));

  return (
    <NotificationsPageShell username={username}>
      {/* PAGE HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200/60 pb-4 sm:pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e7dcc5] bg-[#fdfaf3] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[9px] font-black tracking-[0.22em] text-[#b68a36] uppercase shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e] animate-pulse" />
            <span>Updates</span>
          </div>
          <h1 className="mt-1.5 sm:mt-2.5 text-2xl font-black uppercase leading-tight tracking-tighter sm:text-4xl lg:text-5xl text-zinc-900">
            Your <span className="italic font-serif font-normal text-zinc-400 lowercase">notifications</span>
          </h1>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-zinc-500 sm:text-sm">
            Stay updated with your appointments, membership activity, and important messages from Hustle Friends.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2.5 rounded-2xl border border-zinc-200/80 bg-white px-3.5 py-2 shadow-2xs">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f8f4e9] text-[#b68a36]">
            <Bell size={18} />
          </div>
          <div>
            <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Unread alerts</span>
            <span className="text-xs font-black uppercase text-zinc-900 tracking-tight">{unreadCount} Notifications</span>
          </div>
        </div>
      </section>

      {/* RECENT UPDATES SECTION HEADER */}
      <div className="mt-4 sm:mt-6 flex items-center justify-between">
        <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">
          Recent updates
        </h2>
        <button
          type="button"
          onClick={markAllRead}
          className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.16em] text-[#b68a36] hover:text-[#846018] transition-colors cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      {/* NOTIFICATIONS LIST */}
      <div className="mt-4 sm:mt-6 flex flex-col gap-3">
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.id}
              className={`group relative flex items-start gap-3.5 sm:gap-4 rounded-3xl border p-4 sm:p-5 transition-all duration-300 hover:shadow-md ${
                item.unread
                  ? 'bg-linear-to-br from-[#fdfbf6] via-white to-[#fcf8f0] border-[#ecdcb8] hover:border-[#c7a65e]'
                  : 'bg-white border-zinc-200/80 hover:border-zinc-300'
              }`}
            >
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-[#c7a65e] shadow-xs group-hover:scale-105 transition-transform duration-200">
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-zinc-900 group-hover:text-[#b68a36] transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] font-extrabold text-zinc-400">
                    {item.time}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                  {item.message}
                </p>
              </div>

              {item.unread && (
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#c7a65e] ring-2 ring-[#c7a65e]/20 animate-pulse"
                  aria-label="Unread notification"
                />
              )}
            </article>
          );
        })}
      </div>

      {/* ALL CAUGHT UP STATE */}
      {unreadCount === 0 && (
        <div className="mt-4 sm:mt-6 flex items-center gap-2.5 rounded-2xl border border-emerald-200/80 bg-emerald-50/60 px-4 py-3 text-xs font-bold text-emerald-800 shadow-2xs">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>You're all caught up! No unread notifications remaining.</span>
        </div>
      )}
    </NotificationsPageShell>
  );
}