import { Calendar, CreditCard, ReceiptText, Search } from 'lucide-react';
import { Bell, ChevronDown, LogOut, Menu, Plus, Settings, User } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import ClientSidebar, { type ClientRoute } from '../components/sidebars/ClientSidebar';

type PageShellProps = { username: string; children: ReactNode };

function TransactionsPageShell({ username, children }: PageShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const memberName = username.trim() || 'Member';
  const initial = memberName.charAt(0).toUpperCase() || 'M';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false);
        setIsNotifMenuOpen(false);
      }
    };
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
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block"><ClientSidebar username={username} active="transactions" onNavigate={navigate} onClose={() => setIsSidebarOpen(false)} /></div>
      {isSidebarOpen && <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu"><button type="button" className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px]" onClick={() => setIsSidebarOpen(false)} aria-label="Close navigation overlay" /><div className="relative h-full w-72"><ClientSidebar username={username} active="transactions" onNavigate={navigate} onClose={() => setIsSidebarOpen(false)} /></div></div>}
      <div className="min-h-screen lg:ml-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200/70 bg-white/85 px-3.5 backdrop-blur-lg sm:h-20 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2.5 sm:gap-3"><button type="button" onClick={() => setIsSidebarOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200/80 bg-zinc-50/80 text-zinc-800 transition hover:bg-zinc-100 active:scale-95 lg:hidden" aria-label="Open navigation"><Menu size={18} strokeWidth={2.2} /></button><div className="flex items-center gap-2 sm:gap-3"><div className="hidden h-6 w-0.5 rounded-full bg-[#c7a65e]/40 sm:block" /><div><p className="text-[8px] font-black tracking-[0.28em] text-[#c7a65e] uppercase sm:text-[9px]">Portal</p><p className="text-xs font-black leading-none tracking-tighter text-zinc-900 uppercase sm:text-base">Member <span className="font-light text-zinc-400">space</span></p></div></div></div>
          <div className="flex items-center gap-2 sm:gap-3.5"><button type="button" onClick={() => navigate('#client-appointments')} className="hidden items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[10px] font-black tracking-[0.16em] text-white uppercase transition hover:bg-[#c7a65e] sm:flex"><Plus size={14} strokeWidth={2.5} /><span>Book Service</span></button><div className="relative" ref={notifRef}><button type="button" onClick={() => { setIsNotifMenuOpen(!isNotifMenuOpen); setIsProfileMenuOpen(false); }} className="relative flex h-10 items-center gap-2 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 px-3 text-zinc-700 transition hover:border-[#c7a65e]/60" aria-label="View notifications"><Bell size={16} /><span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-lg border border-zinc-200/60 bg-white px-1.5 text-[9px] font-black">3</span></button>{isNotifMenuOpen && <div className="absolute right-0 z-50 mt-3 w-72 rounded-2xl border border-zinc-100 bg-white shadow-xl ring-1 ring-black/5 sm:w-80"><div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3"><p className="text-[10px] font-black tracking-[0.15em] uppercase">Notifications</p><button type="button" onClick={() => setIsNotifMenuOpen(false)} className="text-[9px] font-bold text-[#c7a65e] uppercase">Mark as read</button></div><div className="px-6 py-8 text-center"><Bell size={20} className="mx-auto mb-3 text-zinc-300" /><p className="text-xs font-black uppercase">You're all caught up!</p><p className="mt-1.5 text-xs text-zinc-500">No new notifications or alerts at the moment.</p></div></div>}</div><div className="relative" ref={profileRef}><button type="button" onClick={() => { setIsProfileMenuOpen(!isProfileMenuOpen); setIsNotifMenuOpen(false); }} className="flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white p-1 shadow-2xs sm:pr-3" aria-label="User menu"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-[11px] font-black text-[#c7a65e]">{initial}</div><span className="hidden max-w-36 truncate text-xs font-bold uppercase sm:inline-block">{memberName}</span><ChevronDown size={14} className="hidden text-zinc-400 sm:block" /></button>{isProfileMenuOpen && <div className="absolute right-0 z-50 mt-3 w-52 rounded-2xl border border-zinc-100 bg-white p-2 shadow-xl"><p className="border-b border-zinc-100 px-3 py-2.5 text-xs font-black uppercase">{memberName}</p><button type="button" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 hover:bg-zinc-50"><User size={15} />My Profile</button><button type="button" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 hover:bg-zinc-50"><Settings size={15} />Settings</button><div className="my-1 border-t border-zinc-100" /><button type="button" onClick={() => { window.location.hash = '#login'; }} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-red-500 hover:bg-red-50"><LogOut size={15} />Sign out</button></div>}</div></div>
        </header>
        <div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">{children}</div>
      </div>
    </main>
  );
}

type Props = { username: string };
type Transaction = { name: string; type: string; reference: string; date: string; time: string; amount: string; status: 'Completed' | 'Pending' };

const transactions: Transaction[] = [
  { name: 'Premium Annual Membership', type: 'Membership', reference: 'TXN-VIP-00013', date: 'Jun 10, 2026', time: '11:01 PM', status: 'Completed', amount: '₱3,200.00' },
  { name: 'Hustle Starter Membership', type: 'Membership', reference: 'TXN-VIP-00005', date: 'Jun 07, 2026', time: '10:53 PM', status: 'Completed', amount: '₱1,500.00' },
  { name: 'Elite VIP Membership', type: 'Membership', reference: 'TXN-VIP-00003', date: 'Jun 07, 2026', time: '09:43 PM', status: 'Completed', amount: '₱6,000.00' },
  { name: 'Premium Annual Membership', type: 'Membership', reference: 'TXN-VIP-00001', date: 'Jun 07, 2026', time: '09:41 PM', status: 'Completed', amount: '₱3,200.00' },
];

export default function ClientTransactions({ username }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredTransactions = useMemo(() => transactions.filter((item) => `${item.name} ${item.reference} ${item.type}`.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery]);

  return (
    <TransactionsPageShell username={username}>
      <section className="flex flex-col justify-between gap-3 border-b border-zinc-200/60 pb-4 sm:flex-row sm:items-end sm:pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e7dcc5] bg-[#fdfaf3] px-2.5 py-1 text-[8px] font-black tracking-[0.22em] text-[#b68a36] uppercase"><span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e]" /> Finance</div>
          <h1 className="mt-2.5 text-2xl font-black leading-tight tracking-tighter text-zinc-900 uppercase sm:text-4xl lg:text-5xl">Your <span className="font-serif font-normal lowercase italic text-zinc-400">transactions</span></h1>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-zinc-500 sm:text-sm">Review your complete billing history including VIP membership subscriptions, product purchases, and service records securely tracked in our system.</p>
        </div>
        <div className="hidden items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 py-2.5 shadow-2xs sm:flex"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f8f4e9] text-[#b68a36]"><CreditCard size={18} /></div><div><span className="block text-[8px] font-black tracking-[0.2em] text-zinc-400 uppercase">Total records</span><span className="text-xs font-black tracking-tight text-zinc-900 uppercase">{transactions.length} Transactions</span></div></div>
      </section>

      <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between"><h2 className="text-sm font-black tracking-tight text-zinc-900 uppercase sm:text-base">Recent purchases</h2><div className="relative w-full sm:w-80"><Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search transaction, ref..." className="w-full rounded-2xl border border-zinc-200/90 bg-white py-2 pl-10 pr-4 text-xs font-bold text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#c7a65e] focus:ring-2 focus:ring-[#c7a65e]/10" /></div></div>

      <div className="mt-4 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-2xs sm:mt-6">
        <div className="hidden grid-cols-[1.5fr_1fr_1.2fr_1.2fr_.8fr] gap-4 border-b border-zinc-100 bg-zinc-50/70 px-5 py-3 text-[9px] font-black tracking-[0.15em] text-zinc-400 uppercase lg:grid"><span>Transaction details</span><span>Reference ID</span><span>Date &amp; time</span><span>Status</span><span className="text-right">Amount</span></div>
        {filteredTransactions.length === 0 ? <div className="p-10 text-center text-xs font-bold text-zinc-400">No transactions found.</div> : filteredTransactions.map((item) => <article key={item.reference} className="grid gap-3 border-b border-zinc-100 p-4 last:border-b-0 sm:p-5 lg:grid-cols-[1.5fr_1fr_1.2fr_1.2fr_.8fr] lg:items-center lg:gap-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8f4e9] text-[#b68a36]"><ReceiptText size={18} /></div><div><h3 className="text-xs font-black text-zinc-900 uppercase sm:text-sm">{item.name}</h3><p className="mt-1 text-[10px] font-bold text-zinc-400 uppercase">{item.type}</p></div></div><div><span className="text-[8px] font-black tracking-wider text-zinc-400 uppercase lg:hidden">Reference ID</span><p className="font-mono text-[10px] font-bold text-zinc-700">{item.reference}</p></div><div className="flex items-center gap-2"><Calendar size={14} className="text-[#c7a65e]" /><div><span className="block text-[8px] font-black tracking-wider text-zinc-400 uppercase">Date &amp; time</span><p className="text-xs font-bold text-zinc-800">{item.date}</p><p className="text-[10px] text-zinc-500">{item.time}</p></div></div><div><span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[8px] font-black tracking-widest text-emerald-700 uppercase"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{item.status}</span></div><div className="border-t border-zinc-100 pt-2 lg:border-0 lg:pt-0 lg:text-right"><span className="text-[8px] font-black tracking-wider text-zinc-400 uppercase lg:hidden">Amount</span><p className="text-sm font-black text-zinc-900">{item.amount}</p></div></article>)}
      </div>
    </TransactionsPageShell>
  );
}