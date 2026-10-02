import { useEffect, useState } from 'react';
import { KeyRound, LogOut, Menu, UserPlus, Users } from 'lucide-react';
import { authApi, type StaffMember } from '../auth/api';
import OwnerSidebar from '../components/sidebars/OwnerSidebar';

const emptyForm = { fullName: '', email: '', password: '' };

export default function OwnerManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const showNotice = (notice: string) => {
    setMessage(notice);
    setIsSidebarOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f7] font-sans text-zinc-950 selection:bg-[#c7a65e] selection:text-white">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <OwnerSidebar onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} />
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Owner navigation">
          <button type="button" className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[2px]" onClick={() => setIsSidebarOpen(false)} aria-label="Close navigation overlay" />
          <div className="relative h-full w-72"><OwnerSidebar onClose={() => setIsSidebarOpen(false)} onNotice={showNotice} /></div>
        </div>
      )}

      <div className="min-h-screen lg:ml-72">
        <header className="flex min-h-20 items-center justify-between border-b border-zinc-200/70 bg-white/85 px-4 backdrop-blur-lg sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setIsSidebarOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 lg:hidden" aria-label="Open navigation"><Menu size={18} /></button>
            <div><p className="text-[9px] font-black tracking-[0.28em] text-[#c7a65e] uppercase">Owner portal</p><h1 className="text-xl font-black uppercase tracking-tight">Staff management</h1></div>
          </div>
          <button type="button" onClick={() => void handleLogout()} className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-xs font-bold uppercase tracking-wider text-zinc-700 transition hover:border-[#c7a65e] hover:text-zinc-950"><LogOut size={15} /> <span className="hidden sm:inline">Log out</span></button>
        </header>

        <div className="mx-auto max-w-7xl p-4 sm:p-8 lg:p-12">
          {error && <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}
          {message && <p className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" role="status">{message}</p>}
          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <form onSubmit={handleCreate} className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_15px_45px_rgba(0,0,0,0.04)] sm:p-8">
              <UserPlus className="text-[#b08b3a]" size={28} />
              <h2 className="mt-5 text-2xl font-black tracking-tight">Add staff member</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">Create a secure staff account for the operations team.</p>
              <div className="mt-6 space-y-4">
                <input required minLength={2} maxLength={100} value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} placeholder="Full name" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-[#c7a65e] focus:bg-white" />
                <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email address" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-[#c7a65e] focus:bg-white" />
                <input required minLength={8} maxLength={128} type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Temporary password" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-[#c7a65e] focus:bg-white" />
                <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-zinc-950 px-4 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-[#c7a65e] hover:text-zinc-950 disabled:opacity-50">{isSubmitting ? 'Creating...' : 'Create staff account'}</button>
              </div>
            </form>

            <section className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_15px_45px_rgba(0,0,0,0.04)] sm:p-8">
              <div className="flex items-center justify-between gap-4"><div><Users className="text-[#b08b3a]" size={28} /><h2 className="mt-5 text-2xl font-black tracking-tight">Staff accounts</h2></div><span className="rounded-full bg-[#faf8f4] px-3 py-1 text-xs font-black text-[#a37d2d]">{staff.length} total</span></div>
              {isLoading ? <p className="mt-8 text-sm text-zinc-500">Loading staff accounts...</p> : staff.length === 0 ? <p className="mt-8 text-sm text-zinc-500">No staff accounts yet.</p> : <div className="mt-8 divide-y divide-zinc-100">{staff.map((member) => <div key={member.id} className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0"><div><p className="font-bold text-zinc-900">{member.fullName}</p><p className="mt-1 text-sm text-zinc-500">{member.email}</p></div><button type="button" onClick={() => void handleReset(member)} className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-700 transition hover:border-[#c7a65e] hover:text-zinc-950"><KeyRound size={14} /> Reset password</button></div>)}</div>}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}