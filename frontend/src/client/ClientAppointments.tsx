import { Sparkles } from 'lucide-react';
import ClientSidebar from '../components/sidebars/ClientSidebar';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	ArrowRight,
	Bell,
	Calendar,
	Check,
	ChevronRight,
	Clock,
	Clock3,
	ExternalLink,
	LogOut,
	Menu,
	MessageSquare,
	Plus,
	Scissors,
	Settings,
	User,
	UserCheck,
} from 'lucide-react';

type ClientAppointmentsProps = {
	username: string;
};

type Booking = {
	reference: string;
	service: string;
	date: string;
	time: string;
	barber: string;
	status: 'Approved' | 'Completed';
};

const bookings: Booking[] = [
	{ reference: '#HF-7801', service: 'Trending Fade', date: 'June 08, 2026', time: '06:11 PM', barber: 'Any Available', status: 'Completed' },
	{ reference: '#HF-7364', service: 'Classic Gentlemen', date: 'June 13, 2026', time: '05:12 PM', barber: 'Any Available', status: 'Completed' },
	{ reference: '#HF-4385', service: 'Korean Two-Block', date: 'June 24, 2026', time: '02:09 PM', barber: 'boss alphon', status: 'Approved' },
	{ reference: '#HF-4257', service: 'Korean Two-Block', date: 'June 08, 2026', time: '04:10 PM', barber: 'boss alphon', status: 'Completed' },
	{ reference: '#HF-1702', service: 'Korean Two-Block', date: 'June 18, 2026', time: '04:47 PM', barber: 'boss alphon', status: 'Approved' },
];

export default function ClientAppointments({ username }: ClientAppointmentsProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [service, setService] = useState('');
	const [barber, setBarber] = useState('Any Available Barber');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [styleRequest, setStyleRequest] = useState('');
	const [notes, setNotes] = useState('');

	// Mobile view active tab: 'form' | 'bookings'
	const [activeMobileTab, setActiveMobileTab] = useState<'form' | 'bookings'>('form');

	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);

	const notifRef = useRef<HTMLDivElement>(null);
	const profileRef = useRef<HTMLDivElement>(null);

	const initial = useMemo(() => username.trim().charAt(0).toUpperCase() || 'M', [username]);

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

	const submitBooking = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSubmitted(true);
	};

	const handleLogout = () => {
		window.location.hash = '#login';
	};

	return (
		<main className="min-h-screen bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
			<div className="fixed inset-y-0 left-0 z-40 hidden lg:block"><ClientSidebar username={username} active="appointments" onNavigate={(route) => { window.location.hash = route; }} onClose={() => setIsSidebarOpen(false)} /></div>

			{isSidebarOpen && (
				<div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
					<button
						type="button"
						className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px] animate-in fade-in duration-300"
						onClick={() => setIsSidebarOpen(false)}
						aria-label="Close navigation overlay"
					/>
					<div className="relative h-full w-72"><ClientSidebar username={username} active="appointments" onNavigate={(route) => { window.location.hash = route; }} onClose={() => setIsSidebarOpen(false)} /></div>
				</div>
			)}

			<div className="min-h-screen lg:ml-72">
				<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200/70 bg-white/85 px-3.5 backdrop-blur-lg transition-all sm:h-20 sm:px-8 lg:px-12">
					<div className="flex items-center gap-2.5 sm:gap-3">
						<button
							type="button"
							onClick={() => setIsSidebarOpen(true)}
							className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200/80 bg-zinc-50/80 text-zinc-800 shadow-xs transition-all duration-200 hover:bg-zinc-100 active:scale-95 lg:hidden"
							aria-label="Open navigation"
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
							className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[10px] font-black tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:bg-[#c7a65e] hover:shadow-md hover:shadow-[#c7a65e]/20 active:scale-95 cursor-pointer"
						>
							<Plus size={14} strokeWidth={2.5} />
							<span>Book Service</span>
						</button>

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
								<div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-2xl border border-zinc-100 bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 z-50">
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
									{initial}
								</div>
								<span className="hidden sm:inline-block max-w-28 lg:max-w-36 truncate text-xs font-bold tracking-tight text-zinc-800 uppercase">
									{username || 'Member'}
								</span>
								<ChevronRight size={14} className={`hidden sm:block text-zinc-400 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-90 text-[#c7a65e]' : ''}`} />
							</button>

							{isProfileMenuOpen && (
								<div className="absolute right-0 mt-3 w-52 rounded-2xl border border-zinc-100 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 z-50">
									<div className="border-b border-zinc-100 px-3 py-2.5">
										<p className="text-[9px] font-black tracking-wider text-zinc-400 uppercase">Logged in as</p>
										<p className="truncate text-xs font-black text-zinc-900 uppercase">{username || 'Member'}</p>
									</div>
									<button type="button" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950">
										<User size={15} /> <span>My Profile</span>
									</button>
									<button type="button" className="flex w-full items-center gap-[#000] rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950">
										<Settings size={15} /> <span>Settings</span>
									</button>
									<div className="my-1 border-t border-zinc-100" />
									<button type="button" onClick={handleLogout} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-red-500 transition hover:bg-red-50">
										<LogOut size={15} /> <span>Sign out</span>
									</button>
								</div>
							)}
						</div>
					</div>
				</header>

				<div className="mx-auto max-w-[1570px] px-3 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
					{submitted && (
						<div role="status" className="mb-4 sm:mb-6 flex items-center gap-3 rounded-2xl border border-[#dfcfaa] bg-[#fdf9ef] px-4 py-3 text-xs sm:text-sm font-bold text-[#735719] shadow-2xs">
							<Check size={16} className="text-[#c7a65e]" />
							<span>Request received. Your booking is awaiting staff approval.</span>
						</div>
					)}

					{/* PAGE TITLE */}
					<section className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200/60 pb-4 sm:pb-6">
						<div>
							<div className="inline-flex items-center gap-2 rounded-full border border-[#e7dcc5] bg-[#fdfaf3] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[9px] font-black tracking-[0.22em] text-[#b68a36] uppercase shadow-2xs">
								<span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e] animate-pulse" />
								<span>Appointment Concierge</span>
							</div>
							<h1 className="mt-1.5 sm:mt-2.5 text-2xl font-black uppercase leading-tight tracking-tighter sm:text-4xl lg:text-5xl text-zinc-900">
								Book <span className="italic font-serif font-normal text-zinc-400 lowercase">your</span> session
							</h1>
						</div>

						<div className="hidden sm:flex items-center gap-2.5 rounded-2xl border border-zinc-200/80 bg-white px-3.5 py-2 shadow-2xs">
							<div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#f8f4e9] text-[#b68a36]">
								<Clock3 size={15} />
							</div>
							<div>
								<span className="block text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Confirmation speed</span>
								<span className="text-[11px] font-black uppercase text-zinc-800 tracking-tight">Instant Approval System</span>
							</div>
						</div>
					</section>

					{/* MOBILE TAB SWITCHER */}
					<div className="mt-4 flex rounded-2xl bg-zinc-200/60 p-1 lg:hidden">
						<button
							type="button"
							onClick={() => setActiveMobileTab('form')}
							className={`flex-1 rounded-xl py-2.5 text-center text-[10px] font-black uppercase tracking-wider transition-all ${
								activeMobileTab === 'form'
									? 'bg-zinc-950 text-white shadow-sm'
									: 'text-zinc-600 hover:text-zinc-900'
							}`}
						>
							Book Session
						</button>
						<button
							type="button"
							onClick={() => setActiveMobileTab('bookings')}
							className={`flex-1 rounded-xl py-2.5 text-center text-[10px] font-black uppercase tracking-wider transition-all ${
								activeMobileTab === 'bookings'
									? 'bg-zinc-950 text-white shadow-sm'
									: 'text-zinc-600 hover:text-zinc-900'
							}`}
						>
							My Bookings ({bookings.length})
						</button>
					</div>

					{/* CONTENT GRID - EQUAL HEIGHT ON DESKTOP */}
					<div className="mt-4 sm:mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(350px,0.75fr)] items-stretch">
						
						{/* BOOKING FORM */}
						<form 
							onSubmit={submitBooking} 
							className={`flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white p-4 sm:p-7 shadow-xs ${
								activeMobileTab === 'form' ? 'block' : 'hidden lg:flex'
							}`}
						>
							<div>
								<div className="mb-4 sm:mb-5 flex items-center justify-between border-b border-zinc-100 pb-3 sm:pb-4">
									<div>
										<p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#b68a36]">Appointment details</p>
										<h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-zinc-900">
											Reserve <span className="font-light text-zinc-400">your slot</span>
										</h2>
									</div>
									<div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-[#f8f4e9] text-[#b68a36]">
										<Scissors size={18} className="sm:hidden" />
										<Scissors size={20} className="hidden sm:block" />
									</div>
								</div>

								<div className="grid gap-3.5 sm:gap-4">
									<div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
										<div>
											<label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500 mb-1">
												<Calendar size={13} className="text-[#c7a65e]" /> Date
											</label>
											<input
												required
												type="date"
												value={date}
												onChange={(event) => setDate(event.target.value)}
												className="w-full rounded-2xl border border-zinc-200/90 bg-zinc-50/50 px-3.5 py-2 sm:py-2.5 text-xs font-bold text-zinc-800 outline-none transition focus:border-[#c7a65e] focus:bg-white focus:ring-2 focus:ring-[#c7a65e]/10"
											/>
										</div>
										<div>
											<label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500 mb-1">
												<Clock size={13} className="text-[#c7a65e]" /> Exact time
											</label>
											<input
												required
												type="time"
												value={time}
												onChange={(event) => setTime(event.target.value)}
												className="w-full rounded-2xl border border-zinc-200/90 bg-zinc-50/50 px-3.5 py-2 sm:py-2.5 text-xs font-bold text-zinc-800 outline-none transition focus:border-[#c7a65e] focus:ring-2 focus:ring-[#c7a65e]/10"
											/>
										</div>
									</div>

									<div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
										<div>
											<label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500 mb-1">
												<Scissors size={13} className="text-[#c7a65e]" /> Select service
											</label>
											<div className="relative">
												<select
													required
													value={service}
													onChange={(event) => setService(event.target.value)}
													className="w-full appearance-none rounded-2xl border border-zinc-200/90 bg-zinc-50/50 px-3.5 py-2 sm:py-2.5 text-xs font-bold text-zinc-800 outline-none transition focus:border-[#c7a65e] focus:bg-white cursor-pointer"
												>
													<option value="">Choose a base service</option>
													<option>Trending Fade</option>
													<option>Korean Two-Block</option>
													<option>Classic Gentlemen</option>
													<option>Buzz &amp; French Crop</option>
													<option>Beard Trim &amp; Lineup</option>
													<option>Other / Custom Haircut</option>
												</select>
												<ChevronRight size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-zinc-400" />
											</div>
										</div>

										<div>
											<label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500 mb-1">
												<UserCheck size={13} className="text-[#c7a65e]" /> Preferred barber
											</label>
											<div className="relative">
												<select
													value={barber}
													onChange={(event) => setBarber(event.target.value)}
													className="w-full appearance-none rounded-2xl border border-zinc-200/90 bg-zinc-50/50 px-3.5 py-2 sm:py-2.5 text-xs font-bold text-zinc-800 outline-none transition focus:border-[#c7a65e] focus:bg-white cursor-pointer"
												>
													<option>Any Available Barber</option>
													<option>boss alphon</option>
													<option>master bebe</option>
												</select>
												<ChevronRight size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-zinc-400" />
											</div>
										</div>
									</div>

									<div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
										<div>
											<label className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500 mb-1">
												<span>Style / request</span>
												<span className="font-normal lowercase text-zinc-400">(optional)</span>
											</label>
											<input
												value={styleRequest}
												onChange={(event) => setStyleRequest(event.target.value)}
												placeholder="Tell us what you have in mind"
												className="w-full rounded-2xl border border-zinc-200/90 bg-zinc-50/50 px-3.5 py-2 sm:py-2.5 text-xs font-bold text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-[#c7a65e] focus:bg-white"
											/>
										</div>

										<div>
											<label className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500 mb-1">
												<span className="flex items-center gap-1.5">
													<MessageSquare size={13} className="text-[#c7a65e]" /> Special notes
												</span>
												<span className="font-normal lowercase text-zinc-400">(optional)</span>
											</label>
											<input
												value={notes}
												onChange={(event) => setNotes(event.target.value)}
												placeholder="Anything your barber should know?"
												className="w-full rounded-2xl border border-zinc-200/90 bg-zinc-50/50 px-3.5 py-2 sm:py-2.5 text-xs font-bold text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-[#c7a65e] focus:bg-white"
											/>
										</div>
									</div>
								</div>

								<div className="mt-4 sm:mt-5 flex items-center justify-between gap-3 rounded-2xl border border-[#eadfc8] bg-[#fdf9ef]/90 p-3 sm:p-4">
									<div className="flex items-center gap-2.5">
										<div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[#c7a65e]/20 text-[#735719]">
											<Sparkles size={16} />
										</div>
										<div>
											<p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.16em] text-[#735719]">VIP member perk</p>
											<p className="text-[11px] sm:text-xs font-bold text-[#8a7444]">1 session will be used for this booking.</p>
										</div>
									</div>
									<div className="text-right">
										<span className="text-lg sm:text-xl font-black text-[#735719]">12</span>
										<span className="ml-1 text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-[#9c8552]">left</span>
									</div>
								</div>
							</div>

							<button
								type="submit"
								className="mt-4 sm:mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 py-3 sm:py-3.5 text-xs font-black uppercase tracking-[0.18em] text-white shadow-sm hover:bg-[#c7a65e] transition-all cursor-pointer active:scale-[0.99]"
							>
								<span>Request appointment</span>
								<ArrowRight size={15} />
							</button>
						</form>

						{/* MY BOOKINGS CARD - EQUAL HEIGHT WITH CUSTOM MODERN SCROLLBAR */}
						<section 
							className={`rounded-3xl border border-zinc-200/80 bg-white shadow-xs overflow-hidden flex flex-col h-full ${
								activeMobileTab === 'bookings' ? 'flex' : 'hidden lg:flex'
							}`} 
							aria-labelledby="bookings-heading"
						>
							{/* Header */}
							<div className="flex items-center justify-between border-b border-zinc-100 bg-linear-to-r from-zinc-50/80 via-white to-zinc-50/80 px-4 py-3.5 sm:px-5 sm:py-4 shrink-0">
								<div>
									<div className="flex items-center gap-1.5">
										<span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e]" />
										<p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#b68a36]">Your schedule</p>
									</div>
									<h2 id="bookings-heading" className="text-lg sm:text-xl font-black uppercase tracking-tight text-zinc-900 mt-0.5">
										My <span className="font-light text-zinc-400">Bookings</span>
									</h2>
								</div>
								<button 
									type="button" 
									onClick={() => { window.location.hash = '#client-appointments'; }}
									className="group flex items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-white px-2.5 py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.14em] text-zinc-700 shadow-2xs hover:border-[#c7a65e] hover:text-[#b68a36] transition-all"
								>
									<span>View all</span>
									<ExternalLink size={12} className="text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#b68a36]" />
								</button>
							</div>

							{/* Bookings List with Modern Custom Scrollbar */}
							<div className="divide-y divide-zinc-100 overflow-y-auto flex-1 p-3 sm:p-3.5 space-y-2.5 sm:space-y-3 max-h-125 lg:max-h-[calc(100vh-280px)] xl:max-h-130 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-zinc-50 [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#c7a65e]/60">
								{bookings.map((booking) => {
									const isApproved = booking.status === 'Approved';
									return (
										<article 
											key={booking.reference} 
											className={`group relative rounded-2xl border p-3 sm:p-4 transition-all duration-300 hover:shadow-md ${
												isApproved 
													? 'bg-linear-to-br from-[#fdfbf6] via-white to-[#fcf8f0] border-[#ecdcb8] hover:border-[#c7a65e]' 
													: 'bg-white border-zinc-200/70 hover:border-zinc-300'
											}`}
										>
											{/* Top Row: Ref & Status */}
											<div className="flex items-center justify-between border-b border-zinc-100/80 pb-2">
												<div className="flex items-center gap-2">
													<span className="rounded-lg bg-zinc-100 px-2 py-0.5 font-mono text-[9px] sm:text-[9.5px] font-black tracking-wider text-zinc-500 group-hover:bg-zinc-950 group-hover:text-[#c7a65e] transition-colors">
														{booking.reference}
													</span>
													<span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">Haircut</span>
												</div>

												<span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[8.5px] sm:text-[9px] font-black tracking-widest uppercase shadow-2xs ${
													isApproved 
														? 'bg-[#f7edd8] text-[#846018] border border-[#e8d2a3]' 
														: 'bg-zinc-100 text-zinc-600 border border-zinc-200/80'
												}`}>
													<span className={`h-1.5 w-1.5 rounded-full ${isApproved ? 'bg-[#c7a65e] animate-pulse' : 'bg-zinc-400'}`} />
													{booking.status}
												</span>
											</div>

											{/* Service Name */}
											<h3 className="mt-2 text-xs sm:text-sm font-black uppercase tracking-tight text-zinc-900 group-hover:text-[#b68a36] transition-colors">
												{booking.service}
											</h3>

											{/* Details Grid */}
											<div className="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-zinc-50/70 p-2 sm:p-2.5 border border-zinc-100 text-[10.5px] sm:text-[11px]">
												<div className="flex items-start gap-1.5 sm:gap-2">
													<div className="mt-0.5 flex h-5.5 w-5.5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-lg bg-white border border-zinc-200/60 text-[#c7a65e]">
														<Calendar size={11} />
													</div>
													<div className="min-w-0">
														<span className="block text-[8px] font-black tracking-wider text-zinc-400 uppercase">Schedule</span>
														<p className="font-bold leading-tight text-zinc-800 truncate">{booking.date}</p>
														<p className="text-[9.5px] font-semibold text-zinc-500">{booking.time}</p>
													</div>
												</div>

												<div className="flex items-start gap-1.5 sm:gap-2 border-l border-zinc-200/60 pl-2 sm:pl-2.5">
													<div className="mt-0.5 flex h-5.5 w-5.5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-lg bg-white border border-zinc-200/60 text-[#c7a65e]">
														<UserCheck size={11} />
													</div>
													<div className="min-w-0">
														<span className="block text-[8px] font-black tracking-wider text-zinc-400 uppercase">Stylist</span>
														<p className="font-bold capitalize leading-tight text-zinc-800 truncate">{booking.barber}</p>
														<p className="text-[9.5px] font-semibold text-zinc-400 uppercase">Barber</p>
													</div>
												</div>
											</div>
										</article>
									);
								})}
							</div>
						</section>

					</div>
				</div>
			</div>
		</main>
	);
}