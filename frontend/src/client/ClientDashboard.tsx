import { useState } from 'react';
import { CalendarCheck, LogOut, Scissors } from 'lucide-react';
import { authApi } from '../auth/api';

type ClientDashboardProps = {
  email: string;
};

export default function ClientDashboard({ email }: ClientDashboardProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setError('');
    setIsLoggingOut(true);
    try {
      await authApi.logout();
      window.location.hash = '#login';
    } catch (logoutError) {
      setError(logoutError instanceof Error ? logoutError.message : 'Unable to log out');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <p className="text-xs font-black tracking-[0.25em] text-[#C6A664] uppercase">Client Dashboard</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Welcome to Hustle Friends</h1>
            <p className="mt-2 text-sm text-neutral-400">You are signed in as {email}.</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:border-[#C6A664] hover:text-white disabled:opacity-50"
          >
            <LogOut size={16} />
            {isLoggingOut ? 'Logging out...' : 'Log out'}
          </button>
        </header>

        {error && <p className="mt-5 rounded-lg border border-red-900/60 bg-red-950/30 px-4 py-3 text-sm text-red-300" role="alert">{error}</p>}

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
            <CalendarCheck className="text-[#C6A664]" size={28} />
            <h2 className="mt-5 text-xl font-bold">Your account is ready</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-400">Registration, email OTP verification, and login completed successfully.</p>
            <span className="mt-5 inline-flex rounded-full border border-emerald-800 bg-emerald-950/40 px-3 py-1 text-xs font-bold tracking-wide text-emerald-300">AUTHENTICATED</span>
          </article>
          <article className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
            <Scissors className="text-[#C6A664]" size={28} />
            <h2 className="mt-5 text-xl font-bold">Book your next cut</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-400">This is the client landing area. Booking availability will be connected here next.</p>
            <button type="button" className="mt-5 rounded-xl bg-[#C6A664] px-4 py-2 text-sm font-black text-neutral-950">Start booking</button>
          </article>
        </section>
      </div>
    </main>
  );
}
