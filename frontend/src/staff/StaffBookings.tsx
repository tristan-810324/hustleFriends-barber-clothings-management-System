import { Bell, CalendarDays, ChevronLeft, ChevronRight, Clock3, Menu, Search, SlidersHorizontal, UserRound } from 'lucide-react';
import { useState } from 'react';
import StaffSidebar from '../components/sidebars/StaffSidebar';

type Booking = { time: string; client: string; service: string; barber: string; status: 'CONFIRMED' | 'PENDING' | 'COMPLETED' };
const bookings: Booking[] = [
  { time: '09:00 AM', client: 'Marco Santos', service: 'Signature Cut', barber: 'AJ Rivera', status: 'CONFIRMED' },
  { time: '10:30 AM', client: 'Nico Dela Cruz', service: 'Fade + Beard', barber: 'Ken Flores', status: 'CONFIRMED' },
  { time: '12:00 PM', client: 'Ethan Lim', service: 'Classic Haircut', barber: 'AJ Rivera', status: 'PENDING' },
  { time: '02:30 PM', client: 'Luis Mendoza', service: 'Beard Sculpt', barber: 'Migs Cruz', status: 'COMPLETED' },
];
const statusStyle: Record<Booking['status'], string> = {
  CONFIRMED: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  PENDING: 'border-[#dfcfaa] bg-[#fdf9ef] text-[#8d6b24]',
  COMPLETED: 'border-zinc-200 bg-zinc-50 text-zinc-500',
};

export default function StaffBookings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');
  const showNotice = (message: string) => { setNotice(message); setSidebarOpen(false); window.setTimeout(() => setNotice(''), 3000); };
  const visibleBookings = bookings.filter((booking) => `${booking.client} ${booking.service} ${booking.barber}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="min-h-screen w-full bg-[#f7f7f7] font-sans text-zinc-950">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block"><StaffSidebar onClose={() => setSidebarOpen(false)} onNotice={showNotice} /></div>
      {sidebarOpen && <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true"><button type="button" className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px]" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" /><div className="relative h-full w-72"><StaffSidebar onClose={() => setSidebarOpen(false)} onNotice={showNotice} /></div></div>}
      <div className="min-h-screen lg:ml-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200/70 bg-white/85 px-3.5 backdrop-blur-lg sm:h-20 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3"><button type="button" onClick={() => setSidebarOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200/80 bg-zinc-50 text-zinc-800 lg:hidden" aria-label="Open navigation"><Menu size={18} /></button><div className="border-l-2 border-[#c7a65e]/60 pl-3"><p className="text-[9px] font-black tracking-[0.28em] text-[#bb9143] uppercase">Portal</p><p className="text-sm font-black uppercase sm:text-base">Staff <span className="font-light text-zinc-400">bookings</span></p></div></div>
          <div className="flex items-center gap-3"><button type="button" onClick={() => showNotice('You are all caught up.')} className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-2.5 text-zinc-700" aria-label="Notifications"><Bell size={16} /></button><div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-xs font-black text-[#c7a65e]"><UserRound size={15} /></div></div>
        </header>
        <div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
          {notice && <p className="mb-5 rounded-xl border border-[#dfcfaa] bg-[#fdf9ef] px-4 py-3 text-xs font-medium text-[#735719]" role="status">{notice}</p>}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e7dcc5] bg-[#f9f5ea] px-2.5 py-1 text-[9px] font-black tracking-[0.24em] text-[#bb9143] uppercase"><span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e]" />Internal access only</div>
          <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><h1 className="text-4xl font-black tracking-[-0.07em] uppercase sm:text-6xl">Manage <span className="text-zinc-500 italic">bookings.</span></h1><p className="mt-3 text-sm text-zinc-500">Keep the chair moving and the schedule in sync.</p></div><button type="button" onClick={() => showNotice('Booking creation will be available when the booking API is enabled.')} className="rounded-xl bg-zinc-950 px-4 py-3 text-[10px] font-black tracking-[0.18em] text-white uppercase hover:bg-[#c7a65e] hover:text-zinc-950">+ New booking</button></div>
          <section className="mt-8 grid gap-3 sm:grid-cols-3">{[['Total appointments', '12'], ['Confirmed', '09'], ['Open chairs', '03']].map(([label, value]) => <article key={label} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><p className="text-[9px] font-black tracking-[0.2em] text-zinc-500 uppercase">{label}</p><p className="mt-3 text-3xl font-black">{value}</p></article>)}</section>
          <section className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"><div className="flex flex-col gap-4 border-b border-zinc-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"><div className="flex items-center gap-2"><button type="button" className="rounded-lg border border-zinc-200 p-2 text-zinc-500" aria-label="Previous day"><ChevronLeft size={16} /></button><p className="flex items-center gap-2 px-2 text-sm font-bold"><CalendarDays size={16} className="text-[#c7a65e]" /> Thursday, 01 October 2026</p><button type="button" className="rounded-lg border border-zinc-200 p-2 text-zinc-500" aria-label="Next day"><ChevronRight size={16} /></button></div><div className="flex gap-2"><label className="flex flex-1 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-500"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-xs outline-none" placeholder="Search client" aria-label="Search client" /></label><button type="button" className="rounded-lg border border-zinc-200 p-2 text-zinc-500" aria-label="Filter bookings"><SlidersHorizontal size={16} /></button></div></div><div className="divide-y divide-zinc-100">{visibleBookings.map((booking) => <div key={`${booking.time}-${booking.client}`} className="grid gap-3 px-5 py-5 transition hover:bg-zinc-50 sm:grid-cols-[120px_1.4fr_1fr_1fr_110px] sm:items-center sm:px-7"><div className="flex items-center gap-2 text-xs font-bold text-[#a37d2d]"><Clock3 size={14} />{booking.time}</div><div><p className="text-sm font-bold">{booking.client}</p><p className="mt-1 text-[11px] text-zinc-500">{booking.service}</p></div><p className="text-xs text-zinc-500">{booking.barber}</p><p className="text-[10px] font-black tracking-[0.15em] text-zinc-400 uppercase">Chair ready</p><span className={`w-fit rounded-full border px-2.5 py-1 text-[9px] font-black tracking-wider ${statusStyle[booking.status]}`}>{booking.status}</span></div>)}</div></section>
        </div>
      </div>
    </main>
  );
}
