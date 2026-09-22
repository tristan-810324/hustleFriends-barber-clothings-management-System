import ClientSidebar from '../components/sidebars/ClientSidebar';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	ArrowRight,
	Bell,
	Check,
	ChevronDown,
	Crown,
	LogOut,
	Menu,
	Scissors,
	Settings,
	ShieldCheck,
	User,
	Zap,
} from 'lucide-react';

type ClientMembershipPlanProps = {
	username: string;
};

export default function ClientMembershipPlan({ username }: ClientMembershipPlanProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
	const [notice, setNotice] = useState('');

	const notifRef = useRef<HTMLDivElement>(null);
	const profileRef = useRef<HTMLDivElement>(null);

	const memberName = useMemo(() => (username ? username.trim() : 'Member'), [username]);
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

	const showNotice = (msg: string) => {
		setNotice(msg);
		window.setTimeout(() => setNotice(''), 3500);
	};

	return (
		<main className="min-h-screen bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
			{/* Persistent Sidebar Desktop */}
			<div className="fixed inset-y-0 left-0 z-40 hidden lg:block"><ClientSidebar username={username} active="membership" membershipLabel="Premium VIP Member" onNavigate={(route) => { window.location.hash = route; }} onClose={() => setIsSidebarOpen(false)} /></div>

			{/* Mobile Drawer */}
			{isSidebarOpen && (
				<div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
					<button
						type="button"
						className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px] animate-in fade-in duration-300"
						onClick={() => setIsSidebarOpen(false)}
						aria-label="Close navigation overlay"
					/>
					<div className="relative h-full w-72"><ClientSidebar username={username} active="membership" membershipLabel="Premium VIP Member" onNavigate={(route) => { window.location.hash = route; }} onClose={() => setIsSidebarOpen(false)} /></div>
				</div>
			)}

			<div className="min-h-screen lg:ml-72">
				{/* Modern Navigation Header */}
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
							onClick={() => { window.location.hash = '#client-appointments'; }}
							className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[10px] font-black tracking-[0.16em] text-white uppercase shadow-sm transition-all duration-200 hover:bg-[#c7a65e] hover:shadow-md hover:shadow-[#c7a65e]/20 active:scale-95 cursor-pointer"
						>
							<Scissors size={14} strokeWidth={2.5} />
							<span>Book Service</span>
						</button>

						{/* Notification Menu */}
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

				{/* Page Body Container */}
				<div className="mx-auto max-w-[1570px] px-3.5 py-4 sm:px-6 sm:py-8 lg:px-10 xl:px-12">
					
					{notice && (
						<div role="status" className="mb-4 sm:mb-6 flex items-center gap-3 rounded-2xl border border-[#dfcfaa] bg-[#fdf9ef] px-4 py-3 text-xs sm:text-sm font-bold text-[#735719] shadow-2xs">
							<Check size={16} className="text-[#c7a65e]" />
							<span>{notice}</span>
						</div>
					)}

					{/* PAGE TITLE BANNER */}
					<section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/60 pb-6 sm:pb-8">
						<div>
							<div className="inline-flex items-center gap-2 rounded-full border border-[#e7dcc5] bg-[#fdfaf3] px-3 py-1 text-[8px] sm:text-[9px] font-black tracking-[0.22em] text-[#b68a36] uppercase shadow-2xs">
								<Crown size={12} className="text-[#c7a65e]" />
								<span>Exclusive Grooming Plans</span>
							</div>
							<h1 className="mt-2 text-3xl font-black uppercase leading-none tracking-tighter sm:text-5xl lg:text-6xl text-zinc-900">
								Invest In <span className="italic font-serif font-normal text-zinc-400 lowercase">Yourself</span>
							</h1>
							<p className="mt-2 text-xl font-black uppercase tracking-tight text-[#b68a36]">
								Elevate Your Hustle Status.
							</p>
						</div>

						<p className="max-w-md text-xs sm:text-sm leading-relaxed font-semibold text-zinc-500">
							Purchase sessions in bulk to lock in our best rates. Enjoy priority booking, exclusive perks, and seamless cashless visits every time you sit in our chair.
						</p>
					</section>

					{/* CURRENT ACTIVE PLAN HERO CARD */}
					<section className="mt-6 sm:mt-8">
						<div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(125deg,#0b0b0c_0%,#181712_100%)] p-6 sm:p-8 text-white shadow-[0_16px_32px_rgba(18,18,18,0.12)] border border-zinc-800">
							{/* Background Subtle Glows */}
							<div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#c7a65e]/10 blur-3xl pointer-events-none" />
							<div className="absolute -left-16 -bottom-20 h-64 w-64 rounded-full bg-[#c7a65e]/5 blur-3xl pointer-events-none" />

							<div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
								<div>
									<div className="flex items-center gap-2">
										<span className="flex h-2 w-2 rounded-full bg-[#c7a65e] animate-pulse" />
										<p className="text-[9px] font-black tracking-[0.25em] text-[#c7a65e] uppercase">Current Active Plan</p>
									</div>
									<h2 className="mt-1.5 text-2xl sm:text-4xl font-black italic tracking-tight text-white uppercase">
										Premium Annual
									</h2>
									<p className="mt-1 text-xs font-bold text-zinc-400">
										Expires on <span className="text-zinc-200">Jun 11, 2027</span>
									</p>
								</div>

								{/* Sessions Remaining Counter Box */}
								<div className="flex items-center justify-between md:justify-end gap-6 rounded-2xl bg-white/5 border border-white/10 p-4 sm:px-6 backdrop-blur-md min-w-65">
									<div>
										<p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Sessions Left</p>
										<div className="mt-0.5 flex items-baseline gap-1">
											<span className="text-3xl sm:text-4xl font-black tracking-tight text-[#c7a65e]">12</span>
											<span className="text-sm font-black text-zinc-400">/ 12</span>
										</div>
									</div>
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c7a65e]/20 text-[#c7a65e] border border-[#c7a65e]/30">
										<Zap size={22} />
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* MEMBERSHIP PRICING CARDS GRID */}
					<section className="mt-8 sm:mt-10 grid gap-6 md:grid-cols-3 items-stretch">
						
						{/* 1. HUSTLE STARTER PLAN */}
						<div className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-xs hover:border-[#c7a65e]/60 hover:shadow-xl transition-all duration-300">
							<div>
								<div className="flex items-center justify-between border-b border-zinc-100 pb-4">
									<div>
										<p className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-400">Standard Tier</p>
										<h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 group-hover:text-[#b68a36] transition-colors">
											Hustle Starter
										</h3>
									</div>
									<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 group-hover:bg-[#f8f4e9] group-hover:text-[#b68a36] transition-colors">
										<Scissors size={20} />
									</div>
								</div>

								<p className="mt-4 text-xs font-semibold leading-relaxed text-zinc-500 min-h-9">
									Perfect for maintaining that fresh look. Buy in bulk and save on your regular cuts.
								</p>

								{/* Price Header */}
								<div className="mt-5 rounded-2xl bg-zinc-50 p-4 border border-zinc-100">
									<div className="flex items-baseline gap-1">
										<span className="text-3xl font-black tracking-tight text-zinc-900">₱1,500</span>
										<span className="text-xs font-black uppercase tracking-wider text-zinc-400">/ 5 Sessions</span>
									</div>
									<span className="mt-1 inline-block text-[9px] font-black uppercase tracking-widest text-[#b68a36]">
										Valid for 3 Months
									</span>
								</div>

								{/* Features List */}
								<ul className="mt-6 space-y-3">
									{[
										'5 Haircut Sessions',
										'Basic Styling Included',
										'Standard Booking Priority',
										'Save ₱250 overall',
									].map((feature) => (
										<li key={feature} className="flex items-center gap-2.5 text-xs font-bold text-zinc-700">
											<div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
												<Check size={12} strokeWidth={3} />
											</div>
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</div>

							<button
								type="button"
								onClick={() => showNotice('Hustle Starter package selected.')}
								className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 py-3.5 text-xs font-black uppercase tracking-[0.18em] text-zinc-800 transition-all hover:border-zinc-950 hover:bg-zinc-950 hover:text-white cursor-pointer active:scale-[0.99]"
							>
								<span>Select Package</span>
								<ArrowRight size={15} />
							</button>
						</div>

						{/* 2. PREMIUM ANNUAL PLAN (MOST POPULAR) */}
						<div className="group relative flex flex-col justify-between rounded-3xl border-2 border-[#c7a65e] bg-linear-to-b from-[#fdfcf9] via-white to-[#fcfaf5] p-6 sm:p-7 shadow-lg shadow-[#c7a65e]/10 hover:shadow-2xl hover:shadow-[#c7a65e]/20 transition-all duration-300">
							{/* Top Ribbon Badge */}
							<div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#c7a65e] px-4 py-1 text-[8.5px] font-black uppercase tracking-[0.25em] text-zinc-950 shadow-xs">
								Most Popular
							</div>

							<div>
								<div className="flex items-center justify-between border-b border-[#ebdcb9] pb-4">
									<div>
										<p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#b68a36]">VIP Recommended</p>
										<h3 className="text-xl font-black uppercase tracking-tight text-zinc-900">
											Premium Annual
										</h3>
									</div>
									<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#c7a65e] text-zinc-950 shadow-xs">
										<Crown size={20} />
									</div>
								</div>

								<p className="mt-4 text-xs font-semibold leading-relaxed text-zinc-600 min-h-9">
									Our most sought-after package. A year round supply of sharp looks and VIP treatment.
								</p>

								{/* Price Header */}
								<div className="mt-5 rounded-2xl bg-[#fbf6ea] p-4 border border-[#e8d7b0]">
									<div className="flex items-baseline gap-1">
										<span className="text-3xl font-black tracking-tight text-zinc-900">₱3,500</span>
										<span className="text-xs font-black uppercase tracking-wider text-[#8a6821]">/ 12 Sessions</span>
									</div>
									<span className="mt-1 inline-block text-[9px] font-black uppercase tracking-widest text-[#b68a36]">
										Valid for 1 Year
									</span>
								</div>

								{/* Features List */}
								<ul className="mt-6 space-y-3">
									{[
										'12 Haircut Sessions',
										'Premium Pomade Application',
										'High Booking Priority',
										'Save ₱1,000 overall',
										'1 Free Scalp Massage',
									].map((feature) => (
										<li key={feature} className="flex items-center gap-2.5 text-xs font-bold text-zinc-900">
											<div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c7a65e] text-zinc-950">
												<Check size={12} strokeWidth={3} />
											</div>
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</div>

							<button
								type="button"
								onClick={() => showNotice('Premium Annual plan selected.')}
								className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 py-3.5 text-xs font-black uppercase tracking-[0.18em] text-[#c7a65e] shadow-md hover:bg-[#c7a65e] hover:text-zinc-950 transition-all cursor-pointer active:scale-[0.99]"
							>
								<span>Acquire VIP Plan</span>
								<ArrowRight size={15} />
							</button>
						</div>

						{/* 3. ELITE VIP PLAN */}
						<div className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-xs hover:border-[#c7a65e]/60 hover:shadow-xl transition-all duration-300">
							<div>
								<div className="flex items-center justify-between border-b border-zinc-100 pb-4">
									<div>
										<p className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-400">Ultimate Tier</p>
										<h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 group-hover:text-[#b68a36] transition-colors">
											Elite VIP
										</h3>
									</div>
									<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 group-hover:bg-[#f8f4e9] group-hover:text-[#b68a36] transition-colors">
										<ShieldCheck size={20} />
									</div>
								</div>

								<p className="mt-4 text-xs font-semibold leading-relaxed text-zinc-500 min-h-9">
									The ultimate grooming arsenal. Bi-weekly sessions to ensure you are always at your absolute best.
								</p>

								{/* Price Header */}
								<div className="mt-5 rounded-2xl bg-zinc-50 p-4 border border-zinc-100">
									<div className="flex items-baseline gap-1">
										<span className="text-3xl font-black tracking-tight text-zinc-900">₱6,000</span>
										<span className="text-xs font-black uppercase tracking-wider text-zinc-400">/ 24 Sessions</span>
									</div>
									<span className="mt-1 inline-block text-[9px] font-black uppercase tracking-widest text-[#b68a36]">
										Valid for 2 Years
									</span>
								</div>

								{/* Features List */}
								<ul className="mt-6 space-y-3">
									{[
										'24 Haircut Sessions',
										'Unlimited Hair Washes',
										'Highest Booking Priority',
										'Save ₱2,400 overall',
										'2 Free Grooming Products',
									].map((feature) => (
										<li key={feature} className="flex items-center gap-2.5 text-xs font-bold text-zinc-700">
											<div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
												<Check size={12} strokeWidth={3} />
											</div>
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</div>

							<button
								type="button"
								onClick={() => showNotice('Elite VIP package selected.')}
								className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 py-3.5 text-xs font-black uppercase tracking-[0.18em] text-zinc-800 transition-all hover:border-zinc-950 hover:bg-zinc-950 hover:text-white cursor-pointer active:scale-[0.99]"
							>
								<span>Select Package</span>
								<ArrowRight size={15} />
							</button>
						</div>

					</section>

					{/* BRAND FOOTER */}
					<footer className="mt-12 sm:mt-16 border-t border-zinc-200/80 pt-6 pb-4 text-center">
						<p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-zinc-400">
							Hustle Friends Co. ® 2026
						</p>
					</footer>

				</div>
			</div>
		</main>
	);
}