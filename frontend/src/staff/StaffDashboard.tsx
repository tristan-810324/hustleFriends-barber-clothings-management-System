import { LogOut, Scissors } from 'lucide-react';
import { useState } from 'react';
import { authApi } from '../auth/api';

export default function StaffDashboard() {
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setError('');
    try {
      await authApi.logout();
      window.location.hash = '#login';
    } catch (logoutError) {
      setError(logoutError instanceof Error ? logoutError.message : 'Unable to log out.');
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <p className="text-xs font-black tracking-[0.25em] text-[#C6A664] uppercase">Staff Dashboard</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Welcome to the team</h1>
            <p className="mt-2 text-sm text-neutral-400">Your account has been verified successfully.</p>
          </div>
          <button type="button" onClick={() => void handleLogout()} className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:border-[#C6A664] hover:text-white">
            <LogOut size={16} /> Log out
          </button>
        </header>

        {error && <p className="mt-5 rounded-lg border border-red-900/60 bg-red-950/30 px-4 py-3 text-sm text-red-300" role="alert">{error}</p>}
        <section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
          <Scissors className="text-[#C6A664]" size={32} />
          <h2 className="mt-5 text-2xl font-bold">Your workspace is ready</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-400">OTP verification is complete. Staff schedules, POS tools, and appointments can be connected here.</p>
          <span className="mt-6 inline-flex rounded-full border border-emerald-800 bg-emerald-950/40 px-3 py-1 text-xs font-bold tracking-wide text-emerald-300">VERIFIED STAFF</span>
        </section>
      </div>
    </main>
  );
}