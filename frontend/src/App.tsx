import { useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/footer';

// For landing pages components
import { Hero } from './landing/hero';
import { Barber } from './landing/Barber';
import { Products } from './landing/Products';
import { Coffee } from './landing/Coffee';
import { Contact } from './landing/Contact';

// For auth components
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import ResetOtp from './auth/ResetOtp';
import ResetPassword from './auth/ResetPassword';

// For client sections
import ClientDashboard from './client/ClientDashboard';
import ClientAppointments from './client/ClientAppointments';
import ClientBookingHistory from './client/ClientBookingHistory';
import ClientMembershipPlan from './client/ClientMembershipPlan';
import ClientTransactions from './client/ClientTransactions';
import ClientNotifications from './client/ClientNotifications';

// For owner 
import OwnerDashboard from './owner/OwnerDashboard'; 

// For staff  
import StaffDashboard from './staff/StaffDashboard';

// Mapping para sa mga route hash papunta sa view name
const HASH_VIEW_MAP: Record<string, string> = {
  '#login': 'login',
  '#register': 'register',
  '#forgot-password': 'forgot-password',
  '#reset-otp': 'reset-otp',
  '#reset-password': 'reset-password',
  '#client': 'client',
  '#client-appointments': 'client-appointments',
  '#client-history': 'client-history',
  '#client-membership': 'client-membership',
  '#client-transactions': 'client-transactions',
  '#client-notifications': 'client-notifications',
  '#owner': 'owner',
  '#staff': 'staff',
};

const getCurrentView = (): string => {
  return HASH_VIEW_MAP[window.location.hash] || 'home';
};

function App() {
  const [currentView, setCurrentView] = useState<string>(getCurrentView);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [nextView, setNextView] = useState<string>(getCurrentView);
  const navigationTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleHashChange = () => {
      const upcomingView = getCurrentView();

      if (!['owner', 'staff'].includes(upcomingView)) {
        setCurrentView(upcomingView);
        return;
      }

      setNextView(upcomingView);
      setIsNavigating(true);

      if (navigationTimeout.current) {
        window.clearTimeout(navigationTimeout.current);
      }

      navigationTimeout.current = window.setTimeout(() => {
        setCurrentView(upcomingView);
        setIsNavigating(false);
      }, 850);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      if (navigationTimeout.current) {
        window.clearTimeout(navigationTimeout.current);
      }
    };
  }, []);

  if (isNavigating) {
    const destination = nextView === 'owner' ? 'Owner workspace' : nextView === 'staff' ? 'Staff workspace' : 'Client dashboard';

    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-6 text-white selection:bg-[#C6A664] selection:text-neutral-950">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(198,166,100,0.16),transparent_34%),linear-gradient(135deg,#09090b_0%,#171512_52%,#09090b_100%)]" />
        <div className="relative w-full max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#C6A664]/30 bg-[#C6A664]/10 shadow-[0_0_60px_rgba(198,166,100,0.18)]">
            <LoaderCircle className="animate-spin text-[#C6A664]" size={34} strokeWidth={1.5} />
          </div>
          <p className="mt-8 text-[11px] font-black tracking-[0.35em] text-[#C6A664] uppercase">Hustle Friends</p>
          <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Getting your space ready</h1>
          <p className="mt-3 text-sm leading-6 text-neutral-400">Securely connecting you to your {destination.toLowerCase()}.</p>

          <div className="mx-auto mt-8 h-1 max-w-xs overflow-hidden rounded-full bg-neutral-800" aria-label="Loading dashboard">
            <div className="h-full w-2/3 animate-[loading-progress_850ms_ease-in-out_infinite] rounded-full bg-[#C6A664]" />
          </div>
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5 text-emerald-400"><Check size={14} /> Authenticated</span>
            <ArrowRight size={13} />
            <span>Opening dashboard</span>
          </div>
        </div>
      </main>
    );
  }

  // Kinuha ang username mula sa sessionStorage para sa mga client components
  const clientUsername = window.sessionStorage.getItem('clientUsername') ?? 'verified client';

  // Component Mapping para sa malinis na pag-render
  const viewsMap: Record<string, JSX.Element> = {
    'login': <Login />,
    'register': <Register />,
    'forgot-password': <ForgotPassword />,
    'reset-otp': <ResetOtp />,
    'reset-password': <ResetPassword />,
    'client': <ClientDashboard username={clientUsername} />,
    'client-appointments': <ClientAppointments username={clientUsername} />,
    'client-history': <ClientBookingHistory username={clientUsername} />,
    'client-membership': <ClientMembershipPlan username={clientUsername} />,
    'client-transactions': <ClientTransactions username={clientUsername} />,
    'client-notifications': <ClientNotifications username={clientUsername} />,
    'owner': <OwnerDashboard />,
    'staff': <StaffDashboard />,
  };

  // Kung ang currentView ay nasa map, ito ang ire-render. Kung wala (hal. 'home'), ang lalabas ay ang landing page.
  if (viewsMap[currentView]) {
    return viewsMap[currentView];
  }

  return (
    <div className="bg-neutral-950 min-h-screen font-sans text-neutral-100 selection:bg-[#C6A664] selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Barber />
        <Coffee />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;