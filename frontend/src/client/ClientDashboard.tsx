import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bell,
  CalendarCheck2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  ReceiptText,
  Scissors,
  Settings,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';
import { authApi } from '../auth/api';

type ClientDashboardProps = {
  username: string;
};

type MenuItemProps = {
  icon: typeof LayoutDashboard;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

function MenuItem({ icon: Icon, label, active = false, onClick }: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 border-l-2 px-7 py-3.5 text-left text-[10px] font-bold tracking-[0.19em] uppercase transition sm:px-9 ${
        active
          ? 'border-[#c7a65e] bg-[#faf8f4] text-[#b78c34]'
          : 'border-transparent text-zinc-500 hover:border-[#e9dfca] hover:bg-[#fcfbf9] hover:text-zinc-900'
      }`}
    >
      <Icon size={17} strokeWidth={active ? 2.3 : 1.75} />
      <span>{label}</span>
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="px-9 pt-8 pb-2 text-[9px] font-black tracking-[0.29em] text-zinc-400 uppercase">{children}</p>;
}

export default function ClientDashboard({ username }: ClientDashboardProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const memberName = useMemo(() => {
    return username ? username.trim() : 'Member';
  }, [username]);

  const memberSince = useMemo(() => new Date().getFullYear(), []);

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
  };

  const sidebar = (
    <aside className="flex h-full w-[292px] flex-col border-r border-zinc-200 bg-white shadow-[14px_0_42px_rgba(24,24,27,0.03)]">
      <div className="flex h-[83px] items-center justify-between px-9">
        <a href="#" className="leading-[0.75] text-zinc-950" aria-label="Hustle Friends home">
          <span className="block text-[11px] font-black italic tracking-[-0.09em]">HUSTLE</span>
          <span className="block text-[11px] font-black italic tracking-[-0.09em]">FRIENDS.</span>
        </a>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 lg:hidden"
          aria-label="Close navigation"
        >
          <X size={19} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto pb-5">
        <SectionLabel>Main menu</SectionLabel>
        <MenuItem icon={LayoutDashboard} label="Overview" active onClick={() => showNotice('You are already viewing your overview.')} />
        <MenuItem icon={Scissors} label="Appointments" onClick={() => showNotice('Appointments will be available here soon.')} />
        <MenuItem icon={CalendarCheck2} label="Booking history" onClick={() => showNotice('No booking history yet.')} />
        <MenuItem icon={ShoppingBag} label="Membership plan" onClick={() => showNotice('Your Standard membership is active.')} />
        <MenuItem icon={Bell} label="Notifications" onClick={() => showNotice('You have no new notifications.')} />

        <SectionLabel>Finance &amp; lifestyle</SectionLabel>
        <MenuItem icon={ReceiptText} label="Transactions" onClick={() => showNotice('No transactions to display.')} />
        <MenuItem icon={Sparkles} label="Lookbook" onClick={() => showNotice('The lookbook is coming soon.')} />

        <SectionLabel>Profile settings</SectionLabel>
        <MenuItem icon={Settings} label="Settings" onClick={() => showNotice('Profile settings will be available here soon.')} />
      </nav>

      <div className="border-t border-zinc-100 px-2 py-4">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 px-7 py-3 text-left text-[10px] font-black tracking-[0.19em] text-red-500 uppercase transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
        >
          <LogOut size={17} />
          {isLoggingOut ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    </aside>
  );

  return (
    <main className="min-h-screen bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button type="button" className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[1px]" onClick={() => setIsSidebarOpen(false)} aria-label="Close navigation overlay" />
          <div className="relative h-full">{sidebar}</div>
        </div>
      )}

      <div className="min-h-screen lg:ml-[292px]">
        <header className="flex h-[83px] items-center justify-between border-b border-zinc-200 bg-white px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-[9px] font-black tracking-[0.31em] text-[#c7a65e] uppercase">Portal</p>
              <p className="mt-0.5 text-lg font-black leading-none tracking-[-0.06em] uppercase">Member <span className="font-medium text-zinc-400">space</span></p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => showNotice('You have no new notifications.')}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition hover:border-[#c7a65e] hover:text-[#a37d2d]"
            aria-label="View notifications"
          >
            <Bell size={17} strokeWidth={1.65} />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-[#c7a65e] ring-2 ring-white" />
          </button>
        </header>

        <div className="mx-auto max-w-[1570px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
          {error && <p className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">{error}</p>}
          {notice && <p className="mb-6 rounded-xl border border-[#dfcfaa] bg-[#fdf9ef] px-4 py-3 text-sm font-medium text-[#735719]" role="status">{notice}</p>}

          <section aria-labelledby="welcome-heading">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e7dcc5] bg-[#f9f5ea] px-3 py-1.5 text-[9px] font-black tracking-[0.24em] text-[#bb9143] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e]" />
              Session active
            </div>
            <h1 id="welcome-heading" className="mt-4 max-w-lg text-4xl font-black leading-[0.89] tracking-[-0.085em] uppercase sm:text-5xl lg:text-6xl">
              Welcome,<span className="block italic text-zinc-600">{memberName}.</span>
            </h1>
          </section>

          {/* Adjusted Grid Layout Here */}
          <section className="mt-8 sm:mt-10 lg:mt-12 grid gap-6 lg:grid-cols-[1.8fr_1fr] xl:grid-cols-[2.2fr_1fr]">
            <article className="relative min-h-[280px] sm:min-h-[320px] overflow-hidden rounded-[2.35rem] bg-[linear-gradient(125deg,#0b0b0c_0%,#171611_100%)] p-6 text-white shadow-[0_24px_35px_rgba(18,18,18,0.15)] sm:p-8">
              <div className="absolute -right-14 -top-24 h-64 w-64 rounded-full bg-[#c7a65e]/[0.055] blur-2xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-[9px] font-black tracking-[0.3em] text-zinc-500 uppercase"><span className="text-[#c7a65e]">♛</span> Member status</p>
                  <h2 className="mt-3 text-3xl font-black italic leading-none tracking-[-0.08em] text-zinc-300 uppercase sm:text-4xl">Standard</h2>
                </div>
                <div className="grid h-12 w-16 grid-cols-2 gap-1 rounded-lg border border-[#6f561b] bg-[#3b2d0a] p-2 opacity-90">
                  <span className="border border-[#ab8330]" /><span className="border border-[#ab8330]" />
                  <span className="col-span-2 border border-[#ab8330]" />
                </div>
              </div>
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between sm:inset-x-8 sm:bottom-8">
                <div>
                  <p className="text-[8px] font-black tracking-[0.27em] text-zinc-500 uppercase">Cardholder</p>
                  <p className="mt-1.5 text-base font-black tracking-[0.1em] uppercase text-zinc-200">{memberName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-black tracking-[0.27em] text-zinc-500 uppercase">Since</p>
                  <p className="mt-1.5 text-base font-black tracking-[0.1em] text-zinc-200">{memberSince}</p>
                </div>
              </div>
            </article>

            {/* Right side cards stack vertically on desktop, side-by-side on tablet */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <article className="flex min-h-[140px] items-center justify-between rounded-[2rem] border border-zinc-200 bg-[#eeeeef] px-6 py-5 shadow-sm sm:px-7">
                <div>
                  <p className="flex items-center gap-2 text-[9px] font-black tracking-[0.3em] text-zinc-500 uppercase"><CalendarDays size={14} /> Total bookings</p>
                  <div className="mt-3 flex items-end gap-2">
                    <p className="text-4xl font-black leading-none tracking-[-0.1em]">00</p>
                    <p className="mb-1 text-[11px] font-black tracking-[0.08em] text-zinc-500 uppercase">Appointments</p>
                  </div>
                </div>
                <button type="button" onClick={() => showNotice('Booking flow will be available here soon.')} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white shadow-lg transition hover:scale-105 hover:bg-[#c7a65e]" aria-label="Create a booking">
                  <Plus size={22} strokeWidth={2.5} />
                </button>
              </article>

              <article className="relative min-h-[140px] overflow-hidden rounded-[2rem] bg-[#c9a65c] px-6 py-5 text-[#262112] shadow-[0_20px_30px_rgba(160,119,39,0.14)] sm:px-7">
                <div className="absolute -right-7 -top-16 h-40 w-40 rounded-full border-[22px] border-[#f3dfa4]/45" />
                <div className="relative flex items-start justify-between gap-3">
                  <p className="text-[9px] font-black tracking-[0.3em] uppercase">Sessions</p>
                  <span className="rounded bg-black/10 px-2 py-1 text-[8px] font-black tracking-wide uppercase">Inactive</span>
                </div>
                <div className="relative mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black leading-none tracking-[-0.09em]">00</span>
                  <span className="text-sm font-black text-black/60">/00</span>
                </div>
                <div className="relative mt-5 h-1.5 rounded-full bg-black/15"><div className="h-full w-0 rounded-full bg-zinc-950" /></div>
                <p className="relative mt-3 flex items-center gap-1.5 text-[9px] font-black tracking-[0.16em] uppercase"><CheckCircle2 size={12} /> Exp. N/A</p>
              </article>
            </div>
          </section>

          <section className="mt-8 sm:mt-10 lg:mt-12 overflow-hidden rounded-[2.35rem] border border-zinc-200 bg-white shadow-[0_12px_35px_rgba(28,28,28,0.035)]" aria-labelledby="recent-hustles-heading">
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-6 sm:px-8">
              <h2 id="recent-hustles-heading" className="flex items-center gap-3 text-xl sm:text-2xl font-black tracking-[-0.065em] uppercase"><span className="h-8 w-2 rounded-full bg-[#c7a65e]" />Recent <span className="text-zinc-400">hustles</span></h2>
              <button type="button" onClick={() => showNotice('No bookings to view yet.')} className="inline-flex items-center gap-1 text-[10px] font-black tracking-[0.19em] text-zinc-500 uppercase transition hover:text-[#a37d2d]">View all <ArrowRight size={15} /></button>
            </div>
            <div className="hidden grid-cols-[1.7fr_1fr_0.9fr_0.8fr] gap-4 border-b border-zinc-100 px-8 py-5 text-[8px] font-black tracking-[0.28em] text-zinc-400 uppercase md:grid">
              <span>Service details</span><span>Date &amp; time</span><span>Status</span><span className="text-right">Payment</span>
            </div>
            <div className="flex min-h-40 flex-col items-center justify-center px-6 py-9 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8f4e9] text-[#b68a36]"><Scissors size={20} /></div>
              <p className="mt-3 text-sm font-bold text-zinc-700">No recent hustles yet</p>
              <p className="mt-1 max-w-sm text-sm leading-6 text-zinc-500">Your completed appointments will appear here after your first booking.</p>
              <button type="button" onClick={() => showNotice('Booking flow will be available here soon.')} className="mt-4 inline-flex items-center gap-1 text-[10px] font-black tracking-[0.16em] text-[#a37d2d] uppercase hover:text-zinc-950">Book a service <ChevronRight size={15} /></button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}