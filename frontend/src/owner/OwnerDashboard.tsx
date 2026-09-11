import { useEffect, useState } from 'react';
import { KeyRound, LogOut, UserPlus, Users } from 'lucide-react';
import { authApi, type StaffMember } from '../auth/api';

const emptyForm = { fullName: '', email: '', password: '' };

export default function OwnerDashboard() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadStaff = async () => {
    setError('');
    try {
      const result = await authApi.listStaff();
      setStaff(result.staff);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load staff accounts.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { void loadStaff(); }, []);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);
    try {
      const result = await authApi.createStaff(form);
      setStaff((current) => [result.data, ...current]);
      setForm(emptyForm);
      setMessage('Staff account created successfully.');
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Unable to create staff account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async (member: StaffMember) => {
    const newPassword = window.prompt(`New temporary password for ${member.fullName}:`);
    if (!newPassword) return;
    setError('');
    setMessage('');
    try {
      await authApi.resetStaffPassword(member.id, newPassword);
      setMessage(`Password updated for ${member.fullName}.`);
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : 'Unable to reset staff password.');
    }
  };

  const handleLogout = async () => {
    await authApi.logout();
    window.location.hash = '#login';
  };

  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <p className="text-xs font-black tracking-[0.25em] text-[#C6A664] uppercase">Owner Console</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Staff management</h1>
            <p className="mt-2 text-sm text-neutral-400">Create staff accounts and manage access.</p>
          </div>
          <button type="button" onClick={() => void handleLogout()} className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:border-[#C6A664] hover:text-white">
            <LogOut size={16} /> Log out
          </button>
        </header>

        {error && <p className="mt-5 rounded-lg border border-red-900/60 bg-red-950/30 px-4 py-3 text-sm text-red-300" role="alert">{error}</p>}
        {message && <p className="mt-5 rounded-lg border border-emerald-900/60 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300" role="status">{message}</p>}

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <form onSubmit={handleCreate} className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
            <UserPlus className="text-[#C6A664]" size={28} />
            <h2 className="mt-5 text-xl font-bold">Add staff member</h2>
            <div className="mt-5 space-y-4">
              <input required minLength={2} maxLength={100} value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} placeholder="Full name" className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm outline-none focus:border-[#C6A664]" />
              <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email address" className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm outline-none focus:border-[#C6A664]" />
              <input required minLength={8} maxLength={128} type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Temporary password" className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm outline-none focus:border-[#C6A664]" />
              <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-[#C6A664] px-4 py-3 text-sm font-black text-neutral-950 transition hover:bg-white disabled:opacity-50">{isSubmitting ? 'Creating...' : 'Create staff account'}</button>
            </div>
          </form>

          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
            <div className="flex items-center justify-between gap-4">
              <div><Users className="text-[#C6A664]" size={28} /><h2 className="mt-5 text-xl font-bold">Staff accounts</h2></div>
              <span className="rounded-full border border-neutral-700 px-3 py-1 text-xs font-bold text-neutral-300">{staff.length} total</span>
            </div>
            {isLoading ? <p className="mt-6 text-sm text-neutral-400">Loading staff accounts...</p> : staff.length === 0 ? <p className="mt-6 text-sm text-neutral-400">No staff accounts yet.</p> : <div className="mt-6 divide-y divide-neutral-800">{staff.map((member) => <div key={member.id} className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0"><div><p className="font-semibold">{member.fullName}</p><p className="mt-1 text-sm text-neutral-400">{member.email}</p></div><button type="button" onClick={() => void handleReset(member)} className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-3 py-2 text-xs font-semibold text-neutral-200 transition hover:border-[#C6A664] hover:text-white"><KeyRound size={14} /> Reset password</button></div>)}</div>}
          </section>
        </section>
      </div>
    </main>
  );
}