import { CalendarCheck2 } from 'lucide-react';
import ClientSidebar from '../components/sidebars/ClientSidebar';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	Bell,
	Calendar,
	ChevronDown,
	LogOut,
	Menu,
	Plus,
	Scissors,
	Search,
	Settings,
	User,
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

export default function ClientBookingHistory({ username }: ClientBookingHistoryProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedFilter, setSelectedFilter] = useState<'All' | 'Completed' | 'Approved' | 'Cancelled'>('All');

	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);

	const notifRef = useRef<HTMLDivElement>(null);
	const profileRef = useRef<HTMLDivElement>(null);

	const memberName = useMemo(() => username ? username.trim() : 'Member', [username]);
	const initial = useMemo(() => memberName.charAt(0).toUpperCase() || 'M', [memberName]);

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

	return (
		<main className="min-h-screen bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
			{/* Desktop Sidebar */}
			<div className="fixed inset-y-0 left-0 z-40 hidden lg:block"><ClientSidebar username={username} active="history" onNavigate={(route) => { window.location.hash = route; }} onClose={() => setIsSidebarOpen(false)} /></div>

			{/* Mobile Drawer */}
			{isSidebarOpen && (
				<div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
					<button
						type="button"
						className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px] animate-in fade-in duration-300"
						onClick={() => setIsSidebarOpen(false)}
						aria-label="Close navigation overlay"
					/>
					<div className="relative h-full w-72"><ClientSidebar username={username} active="history" onNavigate={(route) => { window.location.hash = route; }} onClose={() => setIsSidebarOpen(false)} /></div>
				</div>
			)}

			<div className="min-h-screen lg:ml-72">
				{/* Top Header Navigation */}
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
							onClick={() => { window.location.hash = '#client-appointments'; }}
							className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[10px] font-black tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:bg-[#c7a65e] hover:shadow-md hover:shadow-[#c7a65e]/20 active:scale-95 cursor-pointer"
						>
							<Plus size={14} strokeWidth={2.5} />
							<span>Book Service</span>
						</button>

						{/* Notification Bell Dropdown */}
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

						{/* User Profile Dropdown */}
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
									{memberName}
								</span>
								<ChevronDown size={14} className={`hidden sm:block text-zinc-400 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180 text-[#c7a65e]' : ''}`} />
							</button>

							{isProfileMenuOpen && (
								<div className="absolute right-0 mt-3 w-52 rounded-2xl border border-zinc-100 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 z-50">
									<div className="border-b border-zinc-100 px-3 py-2.5">
										<p className="text-[9px] font-black tracking-wider text-zinc-400 uppercase">Logged in as</p>
										<p className="truncate text-xs font-black text-zinc-900 uppercase">{memberName}</p>
									</div>
									<button type="button" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950">
										<User size={15} /> <span>My Profile</span>
									</button>
									<button type="button" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950">
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

				{/* Page Content Container */}
				<div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
					
					{/* PAGE TITLE BANNER */}
					<section className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200/60 pb-4 sm:pb-6">
						<div>
							<div className="inline-flex items-center gap-2 rounded-full border border-[#e7dcc5] bg-[#fdfaf3] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[9px] font-black tracking-[0.22em] text-[#b68a36] uppercase shadow-2xs">
								<span className="h-1.5 w-1.5 rounded-full bg-[#c7a65e] animate-pulse" />
								<span>Activity Log</span>
							</div>
							<h1 className="mt-1.5 sm:mt-2.5 text-2xl font-black uppercase leading-tight tracking-tighter sm:text-4xl lg:text-5xl text-zinc-900">
								Booking <span className="italic font-serif font-normal text-zinc-400 lowercase">history</span>
							</h1>
						</div>

						{/* Quick Counter Stat Box */}
						<div className="hidden sm:flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 py-2.5 shadow-2xs">
							<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f8f4e9] text-[#b68a36]">
								<CalendarCheck2 size={18} />
							</div>
							<div>
								<span className="block text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Completed cuts</span>
								<span className="text-xs font-black uppercase text-zinc-900 tracking-tight">
									{historyData.filter((i) => i.status === 'Completed').length} Total Sessions
								</span>
							</div>
						</div>
					</section>

					{/* CONTROL BAR: FILTERS & SEARCH */}
					<div className="mt-4 sm:mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
							{(['All', 'Completed', 'Approved', 'Cancelled'] as const).map((filter) => (
								<button
									key={filter}
									type="button"
									onClick={() => setSelectedFilter(filter)}
									className={`rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 text-[10px] sm:text-[10.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
										selectedFilter === filter
											? 'bg-zinc-950 text-white shadow-xs'
											: 'border border-zinc-200/90 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900'
									}`}
								>
									{filter}
								</button>
							))}
						</div>

						<div className="relative w-full sm:w-80">
							<Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search service, barber, ref..."
								className="w-full rounded-2xl border border-zinc-200/90 bg-white pl-10 pr-4 py-2 sm:py-2.5 text-xs font-bold text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#c7a65e] focus:ring-2 focus:ring-[#c7a65e]/10"
							/>
						</div>
					</div>

					{/* CARDS LIST CONTAINER */}
					<div className="mt-4 sm:mt-6 flex flex-col gap-3 sm:gap-4">
						{filteredBookings.length === 0 ? (
							<div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300/80 bg-white p-8 sm:p-12 text-center">
								<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-300 mb-3">
									<Scissors size={24} />
								</div>
								<p className="text-xs font-black uppercase tracking-widest text-zinc-700">No records found</p>
								<p className="mt-1 text-xs text-zinc-400">Try adjusting your filters or search terms.</p>
							</div>
						) : (
							filteredBookings.map((booking) => {
								const isApproved = booking.status === 'Approved';
								const isCancelled = booking.status === 'Cancelled';

								return (
									<article
										key={booking.reference}
										className={`group relative rounded-3xl border p-4 sm:p-5 transition-all duration-300 hover:shadow-md ${
											isApproved
												? 'bg-linear-to-br from-[#fdfbf6] via-white to-[#fcf8f0] border-[#ecdcb8] hover:border-[#c7a65e]'
												: 'bg-white border-zinc-200/80 hover:border-zinc-300'
										}`}
									>
										<div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
											
											{/* Left Info Section */}
											<div className="flex items-start sm:items-center gap-3.5">
												<div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-200/80 bg-zinc-50/80 text-[#c7a65e] group-hover:border-[#c7a65e]/40 transition-colors">
													<Scissors size={20} strokeWidth={2} />
												</div>

												<div className="space-y-1 min-w-0">
													<div className="flex flex-wrap items-center gap-2">
														<span className="rounded-lg bg-zinc-100 px-2 py-0.5 font-mono text-[9px] sm:text-[9.5px] font-black tracking-wider text-zinc-500 group-hover:bg-zinc-950 group-hover:text-[#c7a65e] transition-colors">
															{booking.reference}
														</span>

														{/* Status Badge */}
														<span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[8.5px] sm:text-[9px] font-black tracking-widest uppercase shadow-2xs ${
															isApproved
																? 'bg-[#f7edd8] text-[#846018] border border-[#e8d2a3]'
																: isCancelled
																? 'bg-zinc-100 text-zinc-400 border border-zinc-200/60 line-through'
																: 'bg-zinc-100 text-zinc-700 border border-zinc-200/80'
														}`}>
															<span className={`h-1.5 w-1.5 rounded-full ${isApproved ? 'bg-[#c7a65e] animate-pulse' : 'bg-zinc-400'}`} />
															{booking.status}
														</span>
													</div>

													<h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-zinc-900 group-hover:text-[#b68a36] transition-colors">
														{booking.service}
													</h3>
												</div>
											</div>

											{/* Info Grid Inside Card */}
											<div className="grid grid-cols-2 gap-2.5 sm:gap-3 rounded-2xl bg-zinc-50/70 border border-zinc-100 p-2.5 sm:p-3 sm:grid-cols-3 lg:bg-transparent lg:border-none lg:p-0 lg:flex lg:items-center lg:gap-10">
												<div className="flex items-center gap-2.5">
													<div className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-zinc-200/60 text-[#c7a65e]">
														<Calendar size={15} />
													</div>
													<div>
														<span className="block text-[8px] font-black uppercase tracking-wider text-zinc-400">Date &amp; Time</span>
														<p className="text-xs font-bold text-zinc-800">{booking.date}</p>
														<p className="text-[10px] font-medium text-zinc-500">{booking.time}</p>
													</div>
												</div>

												<div className="flex items-center gap-2.5 border-l border-zinc-200/60 pl-2.5 sm:border-none sm:pl-0">
													<div className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-zinc-200/60 text-[#c7a65e]">
														<User size={15} />
													</div>
													<div>
														<span className="block text-[8px] font-black uppercase tracking-wider text-zinc-400">Barber</span>
														<p className="text-xs font-bold text-zinc-800 capitalize">{booking.barber}</p>
														<p className="text-[10px] font-medium text-zinc-400 uppercase">Stylist</p>
													</div>
												</div>

												<div className="col-span-2 sm:col-span-1 border-t border-zinc-200/60 pt-2 sm:border-t-0 sm:pt-0 lg:text-right">
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