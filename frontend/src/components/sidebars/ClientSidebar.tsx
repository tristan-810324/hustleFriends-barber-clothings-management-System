import {
  Bell,
  CalendarCheck2,
  HelpCircle,
  LayoutDashboard,
  ReceiptText,
  Scissors,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';

export type ClientRoute =
  | '#client'
  | '#client-appointments'
  | '#client-history'
  | '#client-membership'
  | '#client-transactions'
  | '#client-notifications'
  | '#client-lookbook'
  | '#client-support';

type Props = {
  username: string;
  active: 'overview' | 'appointments' | 'history' | 'membership' | 'transactions' | 'notifications' | 'lookbook' | 'support';
  onNavigate: (route: ClientRoute) => void;
  onClose: () => void;
  onNotice?: (message: string) => void;
  membershipLabel?: string;
};

const MenuItem = ({
  active,
  Icon,
  label,
  onClick,
}: {
  active: boolean;
  Icon: typeof LayoutDashboard;
  label: string;
  onClick?: () => void;
}) => (
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
      <span>{label}</span>
    </button>
  </div>
);

const SectionLabel = ({ text }: { text: string }) => (
  <p className="px-7 pb-2 pt-5 text-[9px] font-extrabold tracking-[0.25em] text-zinc-400/80 uppercase">
    {text}
  </p>
);

export default function ClientSidebar({
  username,
  active,
  onNavigate,
  onClose,
  membershipLabel = 'Standard Member',
}: Props) {
  const name = username.trim() || 'Member';
  const initial = name.charAt(0).toUpperCase() || 'M';
  const navigateTo = (route: ClientRoute) => {
    onNavigate(route);
    if (window.location.hash !== route) {
      window.location.hash = route;
    }
    onClose();
  };

  return (
    <aside className="flex h-full w-72 flex-col border-r border-zinc-200/70 bg-white/95 backdrop-blur-xl shadow-[6px_0_30px_rgba(0,0,0,0.02)]">
      <div className="flex h-20 items-center justify-between border-b border-zinc-100/60 px-7">
        <button
          type="button"
          onClick={() => {
            onNavigate('#client');
            onClose();
          }}
          className="group rounded-xl p-1 transition-all duration-300 hover:bg-zinc-50 active:scale-95"
          aria-label="Hustle Friends home"
        >
          <img
            src="/img/HustleLogoBlack.png"
            alt="Hustle Friends"
            className="h-14 w-auto max-w-47.5 object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-16 sm:max-w-55 lg:h-14 lg:max-w-47.5"
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

      <nav className="flex-1 overflow-y-auto py-3">
        <SectionLabel text="Menu features" />
        <MenuItem
          active={active === 'overview'}
          Icon={LayoutDashboard}
          label="Overview"
          onClick={() => navigateTo('#client')}
        />
        <MenuItem
          active={active === 'appointments'}
          Icon={Scissors}
          label="Appointments"
          onClick={() => navigateTo('#client-appointments')}
        />
        
        <MenuItem
          active={active === 'membership'}
          Icon={ShoppingBag}
          label="Membership plan"
          onClick={() => navigateTo('#client-membership')}
        />
          <MenuItem
            active={active === 'lookbook'}
          Icon={Sparkles}
          label="Lookbook"
            onClick={() => navigateTo('#client-lookbook')}
        />
          <MenuItem
            active={active === 'notifications'}
            Icon={Bell}
            label="Notifications"
            onClick={() => navigateTo('#client-notifications')}
          />


        <SectionLabel text="Finance & lifestyle" />
        <MenuItem
          active={active === 'transactions'}
          Icon={ReceiptText}
          label="Transactions"
          onClick={() => navigateTo('#client-transactions')}
        />
         <MenuItem
          active={active === 'history'}
          Icon={CalendarCheck2}
          label="Booking history"
          onClick={() => navigateTo('#client-history')}
        />

        <SectionLabel text="Support" />
        <MenuItem
          active={active === 'support'}
          Icon={HelpCircle}
          label="Help & Support"
          onClick={() => navigateTo('#client-support')}
        />
      </nav>

      <div className="border-t border-zinc-100 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/60 bg-zinc-50/80 p-3 transition-colors hover:bg-zinc-100/60">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-xs font-black text-[#c7a65e] shadow-sm">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-black uppercase tracking-tight text-zinc-900">
              {name}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#b08b3a]">
              {membershipLabel}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}