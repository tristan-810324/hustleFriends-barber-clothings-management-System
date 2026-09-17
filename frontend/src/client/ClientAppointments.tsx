import { useEffect, useMemo, useRef, useState } from 'react';
import {
	ArrowRight,
	Bell,
	CalendarCheck2,
	CalendarDays,
	Check,
	ChevronDown,
	Clock3,
	HelpCircle,
	LayoutDashboard,
	LogOut,
	Menu,
	Plus,
	ReceiptText,
	Scissors,
	Settings,
	ShoppingBag,
	Sparkles,
	User,
	X,
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

type MenuItemProps = {
	icon: any;
	label: string;
	active?: boolean;
	onClick?: () => void;
};

function MenuItem({ icon: Icon, label, active = false, onClick }: MenuItemProps) {
	return (
		<div className="px-3.5 mb-1">
			<button
				type="button"
				onClick={onClick}
				className={`group relative flex w-full items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-left text-[10.5px] font-bold tracking-[0.16em] uppercase transition-all duration-200 ${
					active
						? 'bg-[#faf8f4] text-zinc-900 border border-[#e8ded0] shadow-[0_2px_10px_-2px_rgba(199,166,94,0.12)]'
						: 'border border-transparent text-zinc-400 hover:bg-zinc-100/60 hover:text-zinc-800 hover:translate-x-0.5'
				}`}
			>
				{active && (
					<span className="absolute left-1.5 top-1/2 -translate-y-1/2 h-4 w-1 rounded-full bg-[#c7a65e]" />
				)}
				<Icon
					size={16}
					strokeWidth={active ? 2.2 : 1.75}
					className={`transition-colors duration-200 ${
						active ? 'text-[#b08b3a] ml-1' : 'text-zinc-400 group-hover:text-zinc-700'
					}`}
				/>
				<span>{label}</span>
			</button>
		</div>
	);
}

function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<p className="px-7 pt-5 pb-2 text-[9px] font-bold tracking-[0.25em] text-zinc-400/80 uppercase">
			{children}
		</p>
	);
}

export default function ClientAppointments({ username }: ClientAppointmentsProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [service, setService] = useState('');
	const [barber, setBarber] = useState('Any Available Barber');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [notes, setNotes] = useState('');

	// Dropdown states from Dashboard
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

	const sidebar = (
		<aside className="flex h-full w-72 flex-col border-r border-zinc-200/70 bg-white/95 backdrop-blur-xl shadow-[6px_0_30px_rgba(0,0,0,0.02)]">
			<div className="flex h-20 items-center justify-between px-7 border-b border-zinc-100/60">
				<button
					type="button"
					onClick={() => { window.location.hash = '#client'; setIsSidebarOpen(false); }}
					className="group rounded-xl p-1 transition-all duration-300 hover:bg-zinc-50 active:scale-95"
					aria-label="Hustle Friends home"
				>
					<img
						src="/img/HustleLogoBlack.png"
						alt="Hustle Friends"
						className="h-14 w-auto max-w-47.5 object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-16 sm:max-w-55 lg:h-14 lg:max-w-47.5"
					/>
				</button>
				<button
					type="button"
					onClick={() => setIsSidebarOpen(false)}
					className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition lg:hidden"
					aria-label="Close navigation"
				>
					<X size={18} />
				</button>
			</div>

			<nav className="flex-1 overflow-y-auto py-3">
				<SectionLabel>Main menu</SectionLabel>
				<MenuItem icon={LayoutDashboard} label="Overview" onClick={() => { window.location.hash = '#client'; }} />
				<MenuItem icon={Scissors} label="Appointments" active />
				<MenuItem icon={CalendarCheck2} label="Booking history" onClick={() => { window.location.hash = '#client-appointments'; }} />
				<MenuItem icon={ShoppingBag} label="Membership plan" onClick={() => { window.location.hash = '#client'; }} />

				<SectionLabel>Finance &amp; lifestyle</SectionLabel>
				<MenuItem icon={ReceiptText} label="Transactions" />
				<MenuItem icon={Sparkles} label="Lookbook" />

				<SectionLabel>Support</SectionLabel>
				<MenuItem icon={HelpCircle} label="Help & Support" />
			</nav>

			<div className="border-t border-zinc-100 p-4">
				<div className="flex items-center gap-3 rounded-2xl bg-zinc-50/80 border border-zinc-200/60 p-3 transition-colors hover:bg-zinc-100/60">
					<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-xs font-bold text-[#c7a65e] shadow-sm">
						{initial}
					</div>
					<div className="flex-1 min-w-0">
						<p className="truncate text-xs font-bold uppercase text-zinc-900 tracking-tight">{username || 'Member'}</p>
						<p className="text-[9px] font-semibold text-[#b08b3a] tracking-widest uppercase">Standard Member</p>
					</div>
				</div>
			</div>
		</aside>
	);

	return (
		<main className="min-h-screen bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
			<div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>

			{isSidebarOpen && (
				<div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
					<button
						type="button"
						className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px] animate-in fade-in duration-300"
						onClick={() => setIsSidebarOpen(false)}
						aria-label="Close navigation overlay"
					/>
					<div className="relative h-full w-72">{sidebar}</div>
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
								<p className="text-[8px] sm:text-[9px] font-bold tracking-[0.28em] text-[#c7a65e] uppercase">Portal</p>
								<p className="text-xs sm:text-base font-bold leading-none tracking-tighter uppercase text-zinc-900">
									Member <span className="font-light text-zinc-400">space</span>
								</p>
							</div>
						</div>
					</div>

					<div className="flex items-center gap-2 sm:gap-3.5">
						<button
							type="button"
							className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[10px] font-bold tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:bg-[#c7a65e] hover:shadow-md hover:shadow-[#c7a65e]/20 active:scale-95"
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
								<span className={`flex h-4.5 min-w-4.5 items-center justify-center rounded-lg px-1.5 text-[9px] font-bold tracking-tight transition-colors ${isNotifMenuOpen ? 'bg-[#c7a65e] text-zinc-950' : 'bg-white border border-zinc-200/60 text-zinc-800 shadow-2xs group-hover:border-[#c7a65e]/30'}`}>3</span>
							</button>

							{isNotifMenuOpen && (
								<div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-2xl border border-zinc-100 bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
									<div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
										<p className="text-[10px] font-bold tracking-[0.15em] text-zinc-900 uppercase">Notifications</p>
										<button type="button" onClick={() => setIsNotifMenuOpen(false)} className="text-[9px] font-semibold text-[#c7a65e] uppercase transition hover:text-[#a37d2d]">Mark as read</button>
									</div>
									<div className="flex flex-col items-center justify-center px-6 py-8 text-center">
										<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50 text-zinc-300">
											<Bell size={20} strokeWidth={2} />
										</div>
										<p className="text-xs font-bold tracking-wide text-zinc-700 uppercase">You're all caught up!</p>
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
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-[11px] font-bold text-[#c7a65e] shadow-xs">
									{initial}
								</div>
								<span className="hidden sm:inline-block max-w-28 lg:max-w-36 truncate text-xs font-semibold tracking-tight text-zinc-800 uppercase">
									{username || 'Member'}
								</span>
								<ChevronDown size={14} className={`hidden sm:block text-zinc-400 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180 text-[#c7a65e]' : ''}`} />
							</button>

							{isProfileMenuOpen && (
								<div className="absolute right-0 mt-3 w-52 rounded-2xl border border-zinc-100 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
									<div className="border-b border-zinc-100 px-3 py-2.5">
										<p className="text-[9px] font-bold tracking-wider text-zinc-400 uppercase">Logged in as</p>
										<p className="truncate text-xs font-bold text-zinc-900 uppercase">{username || 'Member'}</p>
									</div>
									<button
										type="button"
										className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950"
									>
										<User size={15} />
										<span>My Profile</span>
									</button>
									<button
										type="button"
										className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950"
									>
										<Settings size={15} />
										<span>Settings</span>
									</button>
									<div className="my-1 border-t border-zinc-100" />
									<button
										type="button"
										onClick={handleLogout}
										className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-red-500 transition hover:bg-red-50"
									>
										<LogOut size={15} />
										<span>Sign out</span>
									</button>
								</div>
							)}
						</div>
					</div>
				</header>

				<div className="mx-auto max-w-[1570px] px-3.5 py-5 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
					{submitted && <div role="status" className="mb-5 flex items-center gap-2 rounded-xl border border-[#dfcfaa] bg-[#fdf9ef] px-4 py-3 text-xs font-semibold text-[#735719]"><Check size={15} /> Request received. Your booking is awaiting staff approval.</div>}
					<section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
						<div>
							<div className="inline-flex items-center gap-1.5 rounded-full border border-[#e7dcc5] bg-[#f9f5ea] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.24em] text-[#bb9143]">
								<span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e]" /> Client portal
							</div>
							<h1 className="mt-3 text-3xl font-extrabold uppercase leading-none tracking-[-0.05em] sm:text-5xl">
								Book <span className="italic font-bold text-zinc-500">your session.</span>
							</h1>
							<p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">Select your preferred date, time, and service below. All bookings are subject to staff approval to avoid conflicts.</p>
						</div>
						<div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
							<Clock3 size={15} className="text-[#c7a65e]" /> Approval required
						</div>
					</section>

					<div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(330px,0.8fr)]">
						<form onSubmit={submitBooking} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_12px_35px_rgba(28,28,28,0.035)] sm:rounded-[2.35rem] sm:p-8">
							<div className="mb-7 flex items-center justify-between border-b border-zinc-100 pb-5">
								<div>
									<p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#b68a36]">Appointment details</p>
									<h2 className="mt-1 text-2xl font-bold uppercase tracking-[-0.04em]">Reserve <span className="font-semibold text-zinc-400">your slot</span></h2>
								</div>
								<div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f4e9] text-[#b68a36]">
									<Scissors size={19} />
								</div>
							</div>

							<div className="grid gap-5 sm:grid-cols-2">
								<label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
									Date
									<input required type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-sm font-medium tracking-normal text-zinc-800 outline-none transition focus:border-[#c7a65e] focus:ring-2 focus:ring-[#c7a65e]/15" />
								</label>
								<label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
									Exact time
									<input required type="time" value={time} onChange={(event) => setTime(event.target.value)} className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-sm font-medium tracking-normal text-zinc-800 outline-none transition focus:border-[#c7a65e] focus:ring-2 focus:ring-[#c7a65e]/15" />
								</label>
							</div>

							<label className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
								Select service
								<select required value={service} onChange={(event) => setService(event.target.value)} className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-sm font-medium tracking-normal text-zinc-800 outline-none focus:border-[#c7a65e]">
									<option value="">Choose a base service</option>
									<option>Trending Fade</option>
									<option>Korean Two-Block</option>
									<option>Classic Gentlemen</option>
									<option>Buzz &amp; French Crop</option>
									<option>Beard Trim &amp; Lineup</option>
									<option>Other / Custom Haircut</option>
								</select>
							</label>

							<label className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
								Style / request <span className="font-normal normal-case tracking-normal text-zinc-400">(optional)</span>
								<input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Tell us what you have in mind" className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-sm font-medium tracking-normal text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-[#c7a65e]" />
							</label>

							<label className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
								Preferred barber
								<select value={barber} onChange={(event) => setBarber(event.target.value)} className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-sm font-medium tracking-normal text-zinc-800 outline-none focus:border-[#c7a65e]">
									<option>Any Available Barber</option>
									<option>boss alphon</option>
									<option>master bebe</option>
								</select>
							</label>

							<label className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
								Special notes <span className="font-normal normal-case tracking-normal text-zinc-400">(optional)</span>
								<textarea rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Anything your barber should know?" className="mt-2 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-sm font-medium tracking-normal text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-[#c7a65e]" />
							</label>

							<div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-[#eadfc8] bg-[#fdf9ef] px-4 py-3 sm:col-span-2">
								<div>
									<p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#735719]">VIP member</p>
									<p className="mt-1 text-xs font-medium text-[#8a7444]">1 session will be used for this booking.</p>
								</div>
								<p className="text-xl font-bold text-[#735719]">12<span className="ml-1 text-[10px] font-semibold uppercase tracking-widest text-[#9c8552]">sessions left</span></p>
							</div>

							<button type="submit" className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-md transition hover:bg-[#c7a65e] sm:col-span-2">
								Request appointment <ArrowRight size={15} />
							</button>
						</form>

						<section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_12px_35px_rgba(28,28,28,0.035)] sm:rounded-[2.35rem]" aria-labelledby="bookings-heading">
							<div className="flex items-center justify-between border-b border-zinc-200 px-5 py-5 sm:px-7">
								<div>
									<p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#b68a36]">Your schedule</p>
									<h2 id="bookings-heading" className="mt-1 text-xl font-bold uppercase tracking-[-0.04em]">My <span className="font-semibold text-zinc-400">bookings</span></h2>
								</div>
								<button type="button" className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#a37d2d]">View all</button>
							</div>
							<div className="divide-y divide-zinc-100">
								{bookings.map((booking) => (
									<article key={booking.reference} className="p-5 transition hover:bg-zinc-50/70 sm:px-7">
										<div className="flex items-start justify-between gap-3">
											<div>
												<p className="text-[9px] font-bold uppercase tracking-[0.17em] text-zinc-400">{booking.reference}</p>
												<h3 className="mt-1 text-sm font-bold uppercase tracking-tight text-zinc-900">{booking.service}</h3>
											</div>
											<span className={`rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider ${booking.status === 'Approved' ? 'bg-[#f9f5ea] text-[#a37d2d]' : 'bg-zinc-100 text-zinc-500'}`}>
												{booking.status}
											</span>
										</div>
										<div className="mt-4 grid grid-cols-2 gap-3 text-[10px] text-zinc-500">
											<p>
												<span className="block text-[8px] font-semibold uppercase tracking-widest text-zinc-400">Date &amp; time</span>
												<span className="mt-1 block font-medium text-zinc-700">{booking.date}<br />{booking.time}</span>
											</p>
											<p>
												<span className="block text-[8px] font-semibold uppercase tracking-widest text-zinc-400">Barber</span>
												<span className="mt-1 block font-medium capitalize text-zinc-700">{booking.barber}</span>
											</p>
										</div>
									</article>
								))}
							</div>
						</section>
					</div>
				</div>
			</div>
		</main>
	);
}