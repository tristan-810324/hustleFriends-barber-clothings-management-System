import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { authApi } from './api';

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

export const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [otp, setOtp] = useState('');
	const [otpMode, setOtpMode] = useState(false);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isResending, setIsResending] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setMessage('');
		setIsSubmitting(true);
		try {
			if (otpMode) {
				await authApi.verifyOtp({ email, otp });
				setMessage('Email verified. You can now sign in.');
				setOtpMode(false);
				return;
			}
			const { user } = await authApi.login({ email, password });
			window.location.hash = user.role === 'OWNER' ? '#owner' : user.role === 'STAFF' ? '#staff' : '#client';
		} catch (submissionError) {
			const submissionMessage = submissionError instanceof Error ? submissionError.message : 'Unable to sign in';
			if (!otpMode && submissionMessage.includes('verification code')) {
				setOtpMode(true);
				setMessage(submissionMessage);
			} else {
				setError(submissionMessage);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleResend = async () => {
		setError('');
		setIsResending(true);
		try {
			setMessage('Please use the verification code from your email.');
		} catch (submissionError) {
			setError(submissionError instanceof Error ? submissionError.message : 'Unable to resend code');
		} finally {
			setIsResending(false);
		}
	};

	return (
		<section className="relative h-dvh min-h-dvh w-full overflow-hidden bg-neutral-950 text-white selection:bg-[#C6A664] selection:text-neutral-950">
			<div className="grid h-full min-h-dvh grid-cols-1 lg:grid-cols-2">
				{/* ================= LEFT SIDE: Hero Section (Desktop & Tablet Banner) ================= */}
				<aside className="relative hidden flex-col justify-between p-8 sm:p-10 lg:flex lg:p-12 xl:p-14">
					{/* Background Image & Overlay */}
					<div
						className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
						style={{ backgroundImage: "url('/img/background.png')" }}
					/>
					<div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/70" />

					{/* Top Branding */}
					<div className="relative z-10">
						<a href="/" className="inline-block transition hover:opacity-80">
							<img
								src="/img/HustleLogoWhite.png"
								alt="Hustle Friends Logo"
								className="h-11 w-auto object-contain sm:h-13"
							/>
						</a>
					</div>

					{/* Bottom Tagline */}
					<div className="relative z-10">
						<h1 className="text-4xl font-black leading-none tracking-tight uppercase sm:text-5xl xl:text-6xl">
							Work Hard.<br />
							<span className="text-[#C6A664]">Stay Sharp.</span>
						</h1>
						<p className="mt-4 text-xs font-semibold tracking-[0.3em] text-neutral-400 uppercase">
							WEAR • CUT • BREW
						</p>
					</div>
				</aside>

				{/* ================= RIGHT SIDE: Login Form Area ================= */}
				<div className="relative flex h-dvh flex-col justify-between overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 md:px-10 lg:overflow-hidden lg:px-10 lg:py-6 xl:px-12 xl:py-8">
					<div className="pointer-events-none absolute inset-0">
						<div className="absolute top-[12%] right-[8%] h-52 w-52 rounded-full bg-[#C6A664]/18 blur-3xl" />
						<div className="absolute bottom-[15%] left-[10%] h-60 w-60 rounded-full bg-white/8 blur-3xl" />
					</div>

					{/* Header / Navigation Bar for Form */}
					<div className="relative z-10 flex items-center justify-between">
						{/* Back to Home Button */}
						<a
							href="/"
							className="group inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-2 text-xs font-semibold text-neutral-300 backdrop-blur-md transition hover:border-[#C6A664]/50 hover:bg-neutral-800 hover:text-white"
						>
							<ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
							<span>Back to Home</span>
						</a>

						{/* Small Brand Logo for Mobile view (< 1024px) */}
						<a href="/" className="block">
							<img
								src="/img/HustleLogoWhite.png"
								alt="Hustle Friends Logo"
								className="h-10 w-auto object-contain sm:h-12 lg:hidden"
							/>
						</a>
					</div>

					{/* Login Form Container */}
					<div className="relative z-10 mx-auto my-auto w-full max-w-md py-3 sm:py-4">
						<div className="p-1 sm:p-2">
							<div className="mb-4 flex justify-center">
								<img
									src="/img/HustleLogoWhite.png"
									alt="Hustle Friends Logo"
									className="h-20 w-auto object-contain sm:h-12"
								/>
							</div>
							<div className="mb-4">
								<p className="text-xs font-black tracking-[0.25em] text-[#C6A664] uppercase">
									{otpMode ? 'Verify Email' : 'Welcome Back'}
								</p>
								<h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
									{otpMode ? 'Enter your verification code' : 'Sign in to your account'}
								</h2>
								<p className="mt-1.5 text-xs text-neutral-400 sm:text-sm">
									{otpMode ? `We sent a 6-digit code to ${email}.` : 'Continue your bookings, coffee rewards, and style drops.'}
								</p>
							</div>

							{/* Google Sign In */}
							<button
								type="button"
								className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-700/80 bg-neutral-950/70 px-4 py-3 text-xs font-semibold text-white transition active:scale-[0.98] hover:border-[#C6A664]/60 hover:bg-neutral-900 sm:text-sm"
							>
								<GoogleIcon />
								<span>Login with Gmail</span>
							</button>

							{/* Divider */}
							<div className="my-4 flex items-center gap-3 text-neutral-500">
								<div className="h-px flex-1 bg-neutral-800" />
								<span className="text-[10px] tracking-[0.2em] uppercase">or</span>
								<div className="h-px flex-1 bg-neutral-800" />
							</div>

							{/* Email & Password Form */}
							<form onSubmit={handleSubmit} className="space-y-3.5">
								{otpMode && <label className="block">
									<span className="mb-1.5 block text-xs font-bold tracking-[0.12em] text-neutral-300 uppercase">6-Digit Code</span>
									<input type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required value={otp} onChange={(event) => setOtp(event.target.value)} placeholder="123456" className="w-full rounded-xl border border-neutral-800 bg-neutral-950/90 px-4 py-3 text-center text-lg tracking-[0.5em] outline-none focus:border-[#C6A664]" />
								</label>}
								<label className="block">
									<span className="mb-1.5 block text-xs font-bold tracking-[0.12em] text-neutral-300 uppercase">
										Email / Username
									</span>
									<div className="relative">
										<Mail size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-neutral-500" />
										<input
											type="email"
											value={email}
											onChange={(event) => setEmail(event.target.value)}
											required
											placeholder="username@gmail.com"
											className="w-full rounded-xl border border-neutral-800 bg-neutral-950/90 py-3 pr-3 pl-10 text-sm outline-none transition placeholder:text-neutral-600 focus:border-[#C6A664] focus:ring-1 focus:ring-[#C6A664]"
										/>
									</div>
								</label>

								<label className="block">
									<span className="mb-1.5 block text-xs font-bold tracking-[0.12em] text-neutral-300 uppercase">
										Password
									</span>
									<div className="relative">
										<Lock size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-neutral-500" />
										<input
											type={showPassword ? 'text' : 'password'}
											value={password}
											onChange={(event) => setPassword(event.target.value)}
											required
											placeholder="Enter password"
											className="w-full rounded-xl border border-neutral-800 bg-neutral-950/90 py-3 pr-11 pl-10 text-sm outline-none transition placeholder:text-neutral-600 focus:border-[#C6A664] focus:ring-1 focus:ring-[#C6A664]"
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

								{error && <p className="rounded-lg border border-red-900/60 bg-red-950/30 px-3 py-2 text-xs text-red-300" role="alert">{error}</p>}
								{message && <p className="rounded-lg border border-emerald-900/60 bg-emerald-950/30 px-3 py-2 text-xs text-emerald-300" role="status">{message}</p>}
								{otpMode && <button type="button" onClick={handleResend} disabled={isResending} className="w-full text-xs font-semibold text-[#C6A664] hover:text-white disabled:opacity-50">{isResending ? 'Sending...' : 'Resend verification code'}</button>}

								<div className="flex items-center justify-between text-xs">
									<label className="flex cursor-pointer items-center gap-2 text-neutral-300">
										<input type="checkbox" className="h-4 w-4 rounded border-neutral-700 bg-neutral-900 accent-[#C6A664]" />
										Remember me
									</label>
									<a href="#forgot-password" className="font-semibold text-[#C6A664] transition hover:text-white hover:underline">
										Forgot password?
									</a>
								</div>

								<button
									type="submit"
									className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C6A664] px-4 py-3 text-xs font-black tracking-[0.12em] text-neutral-950 uppercase transition active:scale-[0.98] hover:bg-white sm:text-sm"
								>
									<span>{isSubmitting ? 'Please wait...' : otpMode ? 'Verify and sign in' : 'Authorize Access'}</span>
									<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
								</button>
							</form>

							<p className="mt-4 text-center text-xs text-neutral-400 sm:text-sm">
								Not a member yet?{' '}
								<a href="#register" className="font-semibold text-[#C6A664] transition hover:text-white hover:underline">
									Join the Culture
								</a>
							</p>
						</div>
					</div>

					{/* Footer Copyright Notice */}
					<div className="relative z-10 text-center text-[10px] tracking-widest text-neutral-600 uppercase">
						© {new Date().getFullYear()} Hustle Friends Co. All rights reserved.
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;