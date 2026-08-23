import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';

const GoogleIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0" role="img">
		<path
			fill="#EA4335"
			d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.7C16.9 3.2 14.6 2.2 12 2.2A9.8 9.8 0 0 0 2.2 12 9.8 9.8 0 0 0 12 21.8c5.6 0 9.3-3.9 9.3-9.4 0-.6-.1-1.1-.2-1.6H12Z"
		/>
		<path
			fill="#34A853"
			d="M2.2 12c0 1.6.4 3.2 1.2 4.5l3.6-2.8a6 6 0 0 1 0-3.4l-3.6-2.8A9.8 9.8 0 0 0 2.2 12Z"
		/>
		<path
			fill="#4A90E2"
			d="M12 21.8c2.7 0 5-.9 6.6-2.5l-3.2-2.6c-.9.6-2 1-3.4 1-2.6 0-4.9-1.8-5.7-4.2l-3.7 2.9a9.8 9.8 0 0 0 9.4 5.4Z"
		/>
		<path
			fill="#FBBC05"
			d="M6.3 13.5A6 6 0 0 1 6 12c0-.5.1-1.1.3-1.5l-3.7-2.9A9.8 9.8 0 0 0 2.2 12c0 1.6.4 3.2 1.2 4.5l3-2.3-.1-.7Z"
		/>
	</svg>
);

export const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle register submission logic here
	};

	return (
		<section className="relative min-h-screen w-full overflow-x-hidden bg-neutral-950 text-white selection:bg-[#C6A664] selection:text-neutral-950">
			<div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
				{/* Left Side: Desktop Branding Hero Panel */}
				<aside className="relative hidden flex-col justify-between p-8 sm:p-10 lg:flex lg:p-12 xl:p-14">
					<div
						className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
						style={{ backgroundImage: "url('/img/background.png')" }}
					/>
					<div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/70" />

					{/* Desktop Header Logo */}
					<div className="relative z-10">
						<a href="/" className="inline-block transition hover:opacity-80">
							<img
								src="/img/HustleLogoWhite.png"
								alt="Hustle Friends Logo"
								className="h-16 w-auto object-contain sm:h-20 xl:h-24"
							/>
						</a>
					</div>

					<div className="relative z-10">
						<h1 className="text-4xl font-black leading-none tracking-tight uppercase sm:text-5xl xl:text-6xl">
							Join The Tribe.<br />
							<span className="text-[#C6A664]">Build Your Hustle.</span>
						</h1>
						<p className="mt-4 text-xs font-semibold tracking-[0.3em] text-neutral-400 uppercase">
							WEAR • CUT • BREW
						</p>
					</div>
				</aside>

				{/* Right Side: Form Panel */}
				<div className="relative flex min-h-screen flex-col justify-between px-4 py-4 sm:px-6 md:px-10 lg:px-10 lg:py-6 xl:px-12 xl:py-8">
					<div className="pointer-events-none absolute inset-0">
						<div className="absolute top-[12%] right-[8%] h-52 w-52 rounded-full bg-[#C6A664]/18 blur-3xl" />
						<div className="absolute bottom-[15%] left-[10%] h-60 w-60 rounded-full bg-white/8 blur-3xl" />
					</div>

					{/* Top Navigation Bar */}
					<div className="relative z-10 flex items-center justify-between gap-4">
						<a
							href="/"
							className="group inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-2 text-xs font-semibold text-neutral-300 backdrop-blur-md transition hover:border-[#C6A664]/50 hover:bg-neutral-800 hover:text-white"
						>
							<ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
							<span>Back to Home</span>
						</a>

						{/* Prominent Header Logo for Mobile and Tablet View */}
						<a href="/" className="block">
							<img
								src="/img/HustleLogoWhite.png"
								alt="Hustle Friends Logo"
								className="h-10 w-auto object-contain sm:h-12 lg:hidden"
							/>
						</a>
					</div>

					{/* Main Form Box */}
					<div className="relative z-10 mx-auto my-auto w-full max-w-md py-2">
						<div className="p-1">
							<div className="mb-3">
								<p className="text-xs font-black tracking-[0.25em] text-[#C6A664] uppercase">Create Account</p>
								<h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Register your profile</h2>
								<p className="mt-1 text-xs text-neutral-400 sm:text-sm">
									Start booking, collecting rewards, and accessing exclusive drops.
								</p>
							</div>

							<button
								type="button"
								className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-700/80 bg-neutral-950/70 px-4 py-2.5 text-xs font-semibold text-white transition active:scale-[0.98] hover:border-[#C6A664]/60 hover:bg-neutral-900 sm:text-sm"
							>
								<GoogleIcon />
								<span>Register with Gmail</span>
							</button>

							<div className="my-3 flex items-center gap-3 text-neutral-500">
								<div className="h-px flex-1 bg-neutral-800" />
								<span className="text-[10px] tracking-[0.2em] uppercase">or</span>
								<div className="h-px flex-1 bg-neutral-800" />
							</div>

							<form onSubmit={handleSubmit} className="space-y-2.5">
								<label className="block">
									<span className="mb-1 block text-xs font-bold tracking-[0.12em] text-neutral-300 uppercase">Full Name</span>
									<div className="relative">
										<User size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-neutral-500" />
										<input
											type="text"
											required
											placeholder="Juan Dela Cruz"
											className="w-full rounded-xl border border-neutral-800 bg-neutral-950/90 py-2.5 pr-3 pl-10 text-sm outline-none transition placeholder:text-neutral-600 focus:border-[#C6A664] focus:ring-1 focus:ring-[#C6A664]"
										/>
									</div>
								</label>

								<label className="block">
									<span className="mb-1 block text-xs font-bold tracking-[0.12em] text-neutral-300 uppercase">Email</span>
									<div className="relative">
										<Mail size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-neutral-500" />
										<input
											type="email"
											required
											placeholder="you@example.com"
											className="w-full rounded-xl border border-neutral-800 bg-neutral-950/90 py-2.5 pr-3 pl-10 text-sm outline-none transition placeholder:text-neutral-600 focus:border-[#C6A664] focus:ring-1 focus:ring-[#C6A664]"
										/>
									</div>
								</label>

								<label className="block">
									<span className="mb-1 block text-xs font-bold tracking-[0.12em] text-neutral-300 uppercase">Password</span>
									<div className="relative">
										<Lock size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-neutral-500" />
										<input
											type={showPassword ? 'text' : 'password'}
											required
											placeholder="Create password"
											className="w-full rounded-xl border border-neutral-800 bg-neutral-950/90 py-2.5 pr-11 pl-10 text-sm outline-none transition placeholder:text-neutral-600 focus:border-[#C6A664] focus:ring-1 focus:ring-[#C6A664]"
										/>
										<button
											type="button"
											onClick={() => setShowPassword((prev) => !prev)}
											className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-neutral-400 transition hover:text-white"
											aria-label={showPassword ? 'Hide password' : 'Show password'}
										>
											{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
										</button>
									</div>
								</label>

								<label className="block">
									<span className="mb-1 block text-xs font-bold tracking-[0.12em] text-neutral-300 uppercase">Confirm Password</span>
									<div className="relative">
										<Lock size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-neutral-500" />
										<input
											type={showConfirmPassword ? 'text' : 'password'}
											required
											placeholder="Confirm password"
											className="w-full rounded-xl border border-neutral-800 bg-neutral-950/90 py-2.5 pr-11 pl-10 text-sm outline-none transition placeholder:text-neutral-600 focus:border-[#C6A664] focus:ring-1 focus:ring-[#C6A664]"
										/>
										<button
											type="button"
											onClick={() => setShowConfirmPassword((prev) => !prev)}
											className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-neutral-400 transition hover:text-white"
											aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
										>
											{showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
										</button>
									</div>
								</label>

								<button
									type="submit"
									className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C6A664] px-4 py-3 text-xs font-black tracking-[0.12em] text-neutral-950 uppercase transition active:scale-[0.98] hover:bg-white sm:text-sm"
								>
									<span>Create Account</span>
									<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
								</button>
							</form>

							<p className="mt-3 text-center text-xs text-neutral-400 sm:text-sm">
								Already have an account?{' '}
								<a href="#login" className="font-semibold text-[#C6A664] transition hover:text-white hover:underline">
									Sign in here
								</a>
							</p>
						</div>
					</div>

					<div className="relative z-10 py-2 text-center text-[10px] tracking-widest text-neutral-600 uppercase">
						© {new Date().getFullYear()} Hustle Friends Co. All rights reserved.
					</div>
				</div>
			</div>
		</section>
	);
};

export default Register;