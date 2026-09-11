import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { authApi } from './api';
import { getAuthErrorMessage } from './authMessages';
import { AuthLoadingScreen } from './AuthLoadingScreen';

export const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isMovingToOtp, setIsMovingToOtp] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setMessage('');
		setIsSubmitting(true);

		try {
			await authApi.forgotPassword({ email });
			sessionStorage.setItem('resetEmail', email);
			setIsMovingToOtp(true);
			window.setTimeout(() => {
				setMessage('If an account exists for that email, reset instructions have been sent.');
				window.history.replaceState({ resetEmail: email }, '', window.location.href);
				window.location.hash = '#reset-otp';
			}, 850);
		} catch (submissionError) {
			sessionStorage.removeItem('resetEmail');
			setError(getAuthErrorMessage(submissionError, 'We could not start the password reset. Please try again.'));
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isSubmitting || isMovingToOtp) {
		return (
			<AuthLoadingScreen
				eyebrow="Account recovery"
				title={isMovingToOtp ? 'Code is on the way' : 'Starting secure recovery'}
				description={isMovingToOtp ? 'We sent a one-time code. Taking you to the secure verification step now.' : 'Checking your request and preparing a secure reset session.'}
			/>
		);
	}

	return (
		<section className="auth-page relative min-h-screen w-full overflow-x-hidden bg-neutral-950 text-white selection:bg-[#C6A664] selection:text-neutral-950">
			<div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
				<aside className="relative hidden flex-col justify-between p-8 sm:p-10 lg:flex lg:p-12 xl:p-14">
					<div
						className="auth-hero absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
						style={{ backgroundImage: "url('/img/background.png')" }}
					/>
					<div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/70" />

					<div className="auth-branding relative z-10">
						<a href="/" className="inline-block transition hover:opacity-80">
							<img
								src="/img/HustleLogoWhite.png"
								alt="Hustle Friends Logo"
								className="h-16 w-auto object-contain sm:h-20 xl:h-24"
							/>
						</a>
					</div>

					<div className="auth-branding relative z-10">
						<h1 className="text-4xl font-black leading-none tracking-tight uppercase sm:text-5xl xl:text-6xl">
							Recover Access.<br />
							<span className="text-[#C6A664]">Keep It Secure.</span>
						</h1>
						<p className="mt-4 text-xs font-semibold tracking-[0.3em] text-neutral-400 uppercase">
							WEAR • CUT • BREW
						</p>
					</div>
				</aside>

				<div className="relative flex min-h-screen flex-col justify-between px-4 py-4 sm:px-6 md:px-10 lg:px-10 lg:py-6 xl:px-12 xl:py-8">
					<div className="pointer-events-none absolute inset-0">
						<div className="absolute top-[12%] right-[8%] h-52 w-52 rounded-full bg-[#C6A664]/18 blur-3xl" />
						<div className="absolute bottom-[15%] left-[10%] h-60 w-60 rounded-full bg-white/8 blur-3xl" />
					</div>

					<div className="auth-navigation relative z-10 flex items-center justify-between gap-4">
						<a
							href="#login"
							className="group inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-2 text-xs font-semibold text-neutral-300 backdrop-blur-md transition hover:border-[#C6A664]/50 hover:bg-neutral-800 hover:text-white"
						>
							<ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
							<span>Back to Login</span>
						</a>

						<a href="/" className="block">
							<img
								src="/img/HustleLogoWhite.png"
								alt="Hustle Friends Logo"
								className="h-10 w-auto object-contain sm:h-12 lg:hidden"
							/>
						</a>
					</div>

					<div className="auth-form relative z-10 mx-auto my-auto w-full max-w-md py-2">
						<div className="p-1">
							<div className="mb-3">
								<p className="text-xs font-black tracking-[0.25em] text-[#C6A664] uppercase">Forgot Password</p>
								<h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Reset your account password</h2>
								<p className="mt-1 text-xs text-neutral-400 sm:text-sm">
									Enter your email and we will send a one-time code.
								</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-2.5">
								<label className="block">
									<span className="mb-1 block text-xs font-bold tracking-[0.12em] text-neutral-300 uppercase">Email</span>
									<div className="relative">
										<Mail size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-neutral-500" />
										<input
											type="email"
											value={email}
											onChange={(event) => setEmail(event.target.value)}
											required
											placeholder="you@example.com"
											className="w-full rounded-xl border border-neutral-800 bg-neutral-950/90 py-2.5 pr-3 pl-10 text-sm outline-none transition placeholder:text-neutral-600 focus:border-[#C6A664] focus:ring-1 focus:ring-[#C6A664]"
										/>
									</div>
								</label>

								{error && <p className="rounded-lg border border-red-900/60 bg-red-950/30 px-3 py-2 text-xs text-red-300" role="alert">{error}</p>}
								{message && <p className="rounded-lg border border-emerald-900/60 bg-emerald-950/30 px-3 py-2 text-xs text-emerald-300" role="status">{message}</p>}

								<button
									type="submit"
									className="auth-action group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C6A664] px-4 py-3 text-xs font-black tracking-[0.12em] text-neutral-950 uppercase transition active:scale-[0.98] hover:bg-white sm:text-sm"
								>
									<span>{isSubmitting ? 'Please wait...' : 'Send Reset OTP'}</span>
									<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
								</button>
							</form>

							<p className="mt-3 text-center text-xs text-neutral-400 sm:text-sm">
								Remembered your password?{' '}
								<a href="#login" className="font-semibold text-[#C6A664] transition hover:text-white hover:underline">
									Sign in here
								</a>
							</p>
						</div>
					</div>

					<div className="auth-footer relative z-10 py-2 text-center text-[10px] tracking-widest text-neutral-600 uppercase">
						© {new Date().getFullYear()} Hustle Friends Co. All rights reserved.
					</div>
				</div>
			</div>
		</section>
	);
};

export default ForgotPassword;
