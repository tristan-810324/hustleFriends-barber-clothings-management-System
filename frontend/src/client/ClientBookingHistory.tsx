import { useEffect, useMemo, useRef, useState } from 'react';
import {
	Bell,
	Calendar,
	CalendarCheck2,
	ChevronRight,
	HelpCircle,
	LayoutDashboard,
	LogOut,
	Menu,
	Plus,
	ReceiptText,
	Scissors,
	Search,
	Settings,
	ShoppingBag,
	Sparkles,
	User,
	X,
} from 'lucide-react';

type ClientBookingHistoryProps = {
	username: string;
};

type BookingHistoryItem = {
	reference: string;
	service: string;
	date: string;
	time: string;
	barber: string;
	amount: string;
	status: 'Completed' | 'Cancelled' | 'Approved';
};

const historyData: BookingHistoryItem[] = [
	{ reference: '#HF-7801', service: 'Trending Fade', date: 'June 08, 2026', time: '06:11 PM', barber: 'Any Available', amount: '₱350', status: 'Completed' },
	{ reference: '#HF-7364', service: 'Classic Gentlemen', date: 'June 13, 2026', time: '05:12 PM', barber: 'Any Available', amount: '₱300', status: 'Completed' },
	{ reference: '#HF-4385', service: 'Korean Two-Block', date: 'June 24, 2026', time: '02:09 PM', barber: 'boss alphon', amount: '₱400', status: 'Approved' },
	{ reference: '#HF-4257', service: 'Korean Two-Block', date: 'June 08, 2026', time: '04:10 PM', barber: 'boss alphon', amount: '₱400', status: 'Completed' },
	{ reference: '#HF-3109', service: 'Beard Trim & Lineup', date: 'May 20, 2026', time: '01:30 PM', barber: 'master bebe', amount: '₱250', status: 'Completed' },
	{ reference: '#HF-2890', service: 'Buzz & French Crop', date: 'May 02, 2026', time: '11:00 AM', barber: 'boss alphon', amount: '₱350', status: 'Cancelled' },
	{ reference: '#HF-1702', service: 'Korean Two-Block', date: 'June 18, 2026', time: '04:47 PM', barber: 'boss alphon', amount: '₱400', status: 'Approved' },
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
				className={`group relative flex w-full items-center gap-3.5 rounded-xl px-3.5 py-3 text-left text-[10.5px] font-bold tracking-[0.16em] uppercase transition-all duration-200 ${
					active
						? 'bg-linear-to-r from-[#faf7f2] to-[#f5efe4] text-zinc-900 border border-[#e5d8c3] shadow-xs'
						: 'border border-transparent text-zinc-400 hover:bg-zinc-100/60 hover:text-zinc-800'
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
		<p className="px-7 pt-5 pb-2 text-[9px] font-extrabold tracking-[0.25em] text-zinc-400/80 uppercase">
			{children}
		</p>
	);
}

export default function ClientBookingHistory({ username }: ClientBookingHistoryProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedFilter, setSelectedFilter] = useState<'All' | 'Completed' | 'Approved' | 'Cancelled'>('All');

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

	const handleLogout = () => {
		window.location.hash = '#login';
	};

	const filteredBookings = useMemo(() => {
		return historyData.filter((item) => {
			const matchesFilter = selectedFilter === 'All' || item.status === selectedFilter;
			const matchesSearch =
				item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.barber.toLowerCase().includes(searchQuery.toLowerCase());

			return matchesFilter && matchesSearch;
		});
	}, [searchQuery, selectedFilter]);

	const sidebar = (
		<aside className="flex h-full w-72 flex-col border-r border-zinc-200/70 bg-white/95 backdrop-blur-xl">
			<div className="flex h-20 items-center justify-between px-7 border-b border-zinc-100/60">
				<button
					type="button"
					onClick={() => { window.location.hash = '#client'; setIsSidebarOpen(false); }}
					className="group rounded-xl p-1 transition-all duration-300 hover:bg-zinc-50"
					aria-label="Hustle Friends home"
				>
					<img
						src="/img/HustleLogoBlack.png"
						alt="Hustle Friends"
						className="h-14 w-auto max-w-47.5 object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:h-16 sm:max-w-55 lg:h-14 lg:max-w-47.5"
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

			<nav className="flex-1 py-3">
				<SectionLabel>Main menu</SectionLabel>
				<MenuItem icon={LayoutDashboard} label="Overview" onClick={() => { window.location.hash = '#client'; }} />
				<MenuItem icon={Scissors} label="Appointments" onClick={() => { window.location.hash = '#client-appointments'; }} />
				<MenuItem icon={CalendarCheck2} label="Booking history" active />
				<MenuItem icon={ShoppingBag} label="Membership plan" onClick={() => { window.location.hash = '#client'; }} />

				<SectionLabel>Finance &amp; lifestyle</SectionLabel>
				<MenuItem icon={ReceiptText} label="Transactions" />
				<MenuItem icon={Sparkles} label="Lookbook" />

				<SectionLabel>Support</SectionLabel>
				<MenuItem icon={HelpCircle} label="Help & Support" />
			</nav>

			<div className="border-t border-zinc-100 p-4">
				<div className="flex items-center gap-3 rounded-2xl bg-linear-to-r from-zinc-50 to-zinc-100/60 border border-zinc-200/60 p-3.5">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-xs font-black text-[#c7a65e] shadow-xs">
						{initial}
					</div>
					<div className="flex-1 min-w-0">
						<p className="truncate text-xs font-black uppercase text-zinc-900 tracking-tight">{username || 'Member'}</p>
						<p className="text-[9px] font-bold text-[#b08b3a] tracking-widest uppercase">Standard Member</p>
					</div>
				</div>
			</div>
		</aside>
	);

	return (
		<main className="min-h-screen bg-[#f9f8f6] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
			<div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>

			{isSidebarOpen && (
				<div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
					<button
						type="button"
						className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px]"
						onClick={() => setIsSidebarOpen(false)}
						aria-label="Close navigation overlay"
					/>
					<div className="relative h-full w-72">{sidebar}</div>
				</div>
			)}

			<div className="min-h-screen lg:ml-72">
				<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200/70 bg-white/85 px-4 backdrop-blur-lg sm:h-20 sm:px-8 lg:px-12">
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={() => setIsSidebarOpen(true)}
							className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200/80 bg-zinc-50/80 text-zinc-800 lg:hidden"
							aria-label="Open navigation"
						>
							<Menu size={18} strokeWidth={2.2} />
						</button>
						<div className="flex items-center gap-3">
							<div className="hidden sm:block h-6 w-0.5 rounded-full bg-[#c7a65e]/40" />
							<div>
								<p className="text-[8px] sm:text-[9px] font-black tracking-[0.28em] text-[#c7a65e] uppercase">Portal</p>
								<p className="text-xs sm:text-base font-black leading-none tracking-tighter uppercase text-zinc-900">
									Member <span className="font-light text-zinc-400">space</span>
								</p>
							</div>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={() => { window.location.hash = '#client-appointments'; }}
							className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2.5 text-[10px] font-black tracking-[0.16em] text-white uppercase shadow-sm transition hover:bg-[#c7a65e]"
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
								className={`relative flex h-10 items-center gap-2 rounded-2xl border px-3 transition ${
									isNotifMenuOpen
										? 'border-[#c7a65e] bg-zinc-950 text-[#c7a65e]'
										: 'border-zinc-200/80 bg-zinc-50/50 text-zinc-700 hover:border-[#c7a65e]/60'
								}`}
								aria-label="View notifications"
							>
								<Bell size={16} strokeWidth={2} />
								<span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-lg bg-[#c7a65e] px-1.5 text-[9px] font-black text-zinc-950">3</span>
							</button>

							{isNotifMenuOpen && (
								<div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xl z-50">
									<div className="flex items-center justify-between border-b border-zinc-100 pb-3">
										<p className="text-[10px] font-black tracking-[0.15em] text-zinc-900 uppercase">Notifications</p>
										<button type="button" onClick={() => setIsNotifMenuOpen(false)} className="text-[9px] font-bold text-[#c7a65e] uppercase">Mark as read</button>
									</div>
									<div className="py-6 text-center">
										<p className="text-xs font-black text-zinc-700 uppercase">All caught up!</p>
										<p className="mt-1 text-xs text-zinc-500">No new notifications or alerts.</p>
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
								className={`flex items-center gap-2 rounded-full border bg-white p-1 transition sm:pr-3 ${
									isProfileMenuOpen ? 'border-[#c7a65e]' : 'border-zinc-200/90 hover:border-[#c7a65e]'
								}`}
								aria-label="User menu"
							>
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-[11px] font-black text-[#c7a65e]">
									{initial}
								</div>
								<span className="hidden sm:inline-block max-w-28 truncate text-xs font-bold text-zinc-800 uppercase">
									{username || 'Member'}
								</span>
								<ChevronRight size={14} className={`hidden sm:block text-zinc-400 transition-transform ${isProfileMenuOpen ? 'rotate-90' : ''}`} />
							</button>

							{isProfileMenuOpen && (
								<div className="absolute right-0 mt-3 w-52 rounded-2xl border border-zinc-200/80 bg-white p-2 shadow-xl z-50">
									<div className="border-b border-zinc-100 px-3 py-2">
										<p className="text-[9px] font-black text-zinc-400 uppercase">Logged in as</p>
										<p className="truncate text-xs font-black text-zinc-900 uppercase">{username || 'Member'}</p>
									</div>
									<button type="button" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 hover:bg-zinc-50">
										<User size={15} /> <span>My Profile</span>
									</button>
									<button type="button" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 hover:bg-zinc-50">
										<Settings size={15} /> <span>Settings</span>
									</button>
									<div className="my-1 border-t border-zinc-100" />
									<button type="button" onClick={handleLogout} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-900 hover:bg-zinc-100">
										<LogOut size={15} /> <span>Sign out</span>
									</button>
								</div>
							)}
						</div>
					</div>
				</header>

				<div className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-10">
					{/* Header Banner Container - Light Gradient */}
					<section className="rounded-3xl border border-[#e8ded0] bg-linear-to-br from-white via-[#fcfbfa] to-[#f6f0e6] p-6 sm:p-8 shadow-xs">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
							<div>
								<div className="inline-flex items-center gap-2 rounded-full border border-[#e5d8c3] bg-[#fbf7f0] px-3.5 py-1 text-[9px] font-black tracking-[0.2em] text-[#b68a36] uppercase">
									<span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e]" />
									<span>Activity Log</span>
								</div>
								<h1 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl text-zinc-900">
									Booking <span className="italic font-serif font-normal text-zinc-400 lowercase">history</span>
								</h1>
							</div>

							{/* Stat Box */}
							<div className="flex items-center gap-4 rounded-2xl border border-[#ebd8bc]/80 bg-white/90 p-4 shadow-2xs min-w-50">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-[#f8f4eb] to-[#eedfb8] text-[#b68a36]">
									<CalendarCheck2 size={20} />
								</div>
								<div>
									<span className="block text-[8.5px] font-black uppercase tracking-[0.2em] text-zinc-400">Completed Cuts</span>
									<span className="text-base font-black uppercase text-zinc-900">
										{historyData.filter((i) => i.status === 'Completed').length} Sessions
									</span>
								</div>
							</div>
						</div>
					</section>

					{/* Control Bar: Filters & Search */}
					<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex flex-wrap items-center gap-2">
							{(['All', 'Completed', 'Approved', 'Cancelled'] as const).map((filter) => (
								<button
									key={filter}
									type="button"
									onClick={() => setSelectedFilter(filter)}
									className={`rounded-xl px-4 py-2.5 text-[10.5px] font-black uppercase tracking-wider transition ${
										selectedFilter === filter
											? 'bg-zinc-950 text-white shadow-sm'
											: 'border border-zinc-200/90 bg-white text-zinc-600 hover:border-zinc-300'
									}`}
								>
									{filter}
								</button>
							))}
						</div>

						<div className="relative w-full sm:w-80">
							<Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search service, barber, ref..."
								className="w-full rounded-2xl border border-zinc-200/90 bg-white pl-11 pr-4 py-2.5 text-xs font-bold text-zinc-800 outline-none transition focus:border-[#c7a65e] focus:ring-2 focus:ring-[#c7a65e]/20"
							/>
						</div>
					</div>

					{/* Cards List - Pinatabang Container & Light Gradient */}
					<div className="mt-6 flex flex-col gap-4">
						{filteredBookings.length === 0 ? (
							<div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white p-12 text-center">
								<Scissors size={28} className="text-zinc-300" />
								<p className="mt-3 text-xs font-black uppercase tracking-widest text-zinc-700">No records found</p>
								<p className="mt-1 text-xs text-zinc-400">Try adjusting your filters or search terms.</p>
							</div>
						) : (
							filteredBookings.map((booking) => {
								const isApproved = booking.status === 'Approved';

								return (
									<article
										key={booking.reference}
										className="rounded-3xl border border-[#eadeca]/80 bg-linear-to-br from-white via-[#fdfcfb] to-[#f8f5ef] p-6 shadow-2xs transition-all hover:border-[#c7a65e]/50 hover:shadow-md"
									>
										<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
											{/* Left Info: Icon & Service */}
											<div className="flex items-center gap-4">
												<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#e8ded0] bg-linear-to-b from-[#faf6ee] to-[#f2e7d3] text-[#b68a36]">
													<Scissors size={20} strokeWidth={2} />
												</div>

												<div className="space-y-1">
													<div className="flex items-center gap-2.5">
														<span className="font-mono text-xs font-black tracking-wider text-zinc-400">
															{booking.reference}
														</span>

														{/* Neutral Elegance Status Badge (No Red/Green) */}
														<span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-widest ${
															isApproved
																? 'bg-[#fbf4e6] text-[#846018] border border-[#e8d2a3]'
																: 'bg-zinc-100 text-zinc-700 border border-zinc-200'
														}`}>
															<span className={`h-1.5 w-1.5 rounded-full ${isApproved ? 'bg-[#c7a65e]' : 'bg-zinc-400'}`} />
															{booking.status}
														</span>
													</div>

													<h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-zinc-900">
														{booking.service}
													</h3>
												</div>
											</div>

											{/* Info Grid Inside Card */}
											<div className="grid grid-cols-2 gap-4 rounded-2xl bg-white/70 border border-zinc-200/60 p-4 sm:grid-cols-3 lg:bg-transparent lg:border-none lg:p-0 lg:flex lg:items-center lg:gap-10">
												<div className="flex items-center gap-3">
													<div className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100/80 text-zinc-500">
														<Calendar size={15} />
													</div>
													<div>
														<span className="block text-[8px] font-black uppercase tracking-wider text-zinc-400">Date & Time</span>
														<p className="text-xs font-bold text-zinc-800">{booking.date}</p>
														<p className="text-[10px] font-medium text-zinc-500">{booking.time}</p>
													</div>
												</div>

												<div className="flex items-center gap-3">
													<div className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100/80 text-zinc-500">
														<User size={15} />
													</div>
													<div>
														<span className="block text-[8px] font-black uppercase tracking-wider text-zinc-400">Barber</span>
														<p className="text-xs font-bold text-zinc-800 capitalize">{booking.barber}</p>
														<p className="text-[10px] font-medium text-zinc-500">Stylist</p>
													</div>
												</div>

												<div className="col-span-2 sm:col-span-1 border-t border-zinc-100 pt-3 sm:border-t-0 sm:pt-0 lg:text-right">
													<span className="block text-[8px] font-black uppercase tracking-wider text-zinc-400">Amount</span>
													<p className="text-sm font-black text-zinc-900">{booking.amount}</p>
													<span className="text-[9px] font-bold text-[#b68a36] uppercase tracking-wider">
														Membership Paid
													</span>
												</div>
											</div>
										</div>
									</article>
								);
							})
						)}
					</div>
				</div>
			</div>
		</main>
	);
}