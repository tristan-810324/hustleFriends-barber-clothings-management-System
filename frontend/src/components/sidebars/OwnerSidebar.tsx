import { useEffect, useState } from 'react';
import { Bell, CalendarDays, ClipboardList, DollarSign, Home, Mail, PackagePlus, Settings, Users, WalletCards, X } from 'lucide-react';

type Props = { onClose: () => void; onNotice: (message: string) => void };
type MenuItemProps = { active: boolean; icon: typeof Home; label: string; onClick: () => void };

const MenuItem = ({ active, icon: Icon, label, onClick }: MenuItemProps) => (
  <div className="mb-1 px-3.5">
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex w-full items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-left text-[10.5px] font-bold tracking-[0.16em] uppercase transition-all duration-200 ${
        active
          ? 'border border-[#e8ded0] bg-[#faf8f4] text-zinc-900 shadow-[0_2px_10px_-2px_rgba(199,166,94,0.12)]'
          : 'border border-transparent text-zinc-400 hover:translate-x-0.5 hover:bg-zinc-100/60 hover:text-zinc-800'
      }`}
    >
      {active && (
        <span className="absolute left-1.5 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-[#c7a65e]" />
      )}
      <Icon
        size={16}
        strokeWidth={active ? 2.2 : 1.75}
        className={`transition-colors duration-200 ${
          active ? 'ml-1 text-[#b08b3a]' : 'text-zinc-400 group-hover:text-zinc-700'
        }`}
      />
      <span className="truncate">{label}</span>
    </button>
  </div>
);

const SectionLabel = ({ text }: { text: string }) => (
  <p className="px-7 pb-2 pt-4 text-[9px] font-extrabold tracking-[0.25em] text-zinc-400/80 uppercase">
    {text}
  </p>
);

export default function OwnerSidebar({ onClose, onNotice }: Props) {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#owner');

  useEffect(() => {
    const update = () => setCurrentPath(window.location.hash || '#owner');
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  const goTo = (path: string, available = false) => () => {
    if (available) {
      window.location.hash = path;
    } else {
      onNotice('This owner module is ready for connection to its API.');
    }
    onClose();
  };

  return (
    <aside className="flex h-full w-72 flex-col border-r border-zinc-200/70 bg-white/95 backdrop-blur-xl shadow-[6px_0_30px_rgba(0,0,0,0.02)]">
      <div className="flex h-18 items-center justify-between border-b border-zinc-100/60 px-6">
        <button
          type="button"
          onClick={goTo('#owner', true)}
          className="group rounded-xl p-1 transition-all duration-300 hover:bg-zinc-50 active:scale-95"
          aria-label="Owner home"
        >
          <img
            src="/img/HustleLogoBlack.png"
            alt="Hustle Friends"
            className="h-12 w-auto max-w-45 object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 lg:hidden"
          aria-label="Close navigation"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2.5 scrollbar-none" aria-label="Owner navigation">
        <SectionLabel text="Workspace" />
        <MenuItem active={currentPath === '#owner'} icon={Home} label="Home" onClick={goTo('#owner', true)} />
        <MenuItem active={currentPath === '#owner-sales' || currentPath === '#owner-stats'} icon={DollarSign} label="Overall sales" onClick={goTo('#owner-sales', true)} />
        <MenuItem active={currentPath === '#owner-notifications'} icon={Bell} label="Notifications" onClick={goTo('#owner-notifications', true)} />

        <SectionLabel text="Operations" />
        <MenuItem active={currentPath === '#owner-add-items'} icon={PackagePlus} label="Add items" onClick={goTo('#owner-add-items', true)} />
        <MenuItem active={currentPath === '#owner-inventory'} icon={ClipboardList} label="Inventory / stocks" onClick={goTo('#owner-inventory')} />
        <MenuItem active={currentPath === '#owner-payments'} icon={WalletCards} label="Payment history" onClick={goTo('#owner-payments')} />
        <MenuItem active={currentPath === '#owner-bookings'} icon={CalendarDays} label="Booking history" onClick={goTo('#owner-bookings')} />

        <SectionLabel text="Management" />
        <MenuItem active={currentPath === '#owner-membership'} icon={Settings} label="Edit membership plan" onClick={goTo('#owner-membership')} />
        <MenuItem active={currentPath === '#owner-management'} icon={Users} label="Staff management" onClick={goTo('#owner-management', true)} />
        <MenuItem active={currentPath === '#owner-messages'} icon={Mail} label="Messages" onClick={goTo('#owner-messages')} />
      </nav>

      <div className="border-t border-zinc-100 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/60 bg-zinc-50/80 p-3 transition-colors hover:bg-zinc-100/60">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-xs font-black text-[#c7a65e] shadow-sm">
            O
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-black uppercase tracking-tight text-zinc-900">
              Owner account
            </p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#b08b3a]">
              Founder access
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}