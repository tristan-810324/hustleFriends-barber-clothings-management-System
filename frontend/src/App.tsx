import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/footer';

// For landding pages components
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
import ClientDashboard from './client/ClientDashboard';
import OwnerDashboard from './owner/OwnerDashboard';
import StaffDashboard from './staff/StaffDashboard';

const getCurrentView = () => {
  if (window.location.hash === '#login') return 'login';
  if (window.location.hash === '#register') return 'register';
  if (window.location.hash === '#forgot-password') return 'forgot-password';
  if (window.location.hash === '#reset-otp') return 'reset-otp';
  if (window.location.hash === '#reset-password') return 'reset-password';
  if (window.location.hash === '#client') return 'client';
  if (window.location.hash === '#owner') return 'owner';
  if (window.location.hash === '#staff') return 'staff';
  return 'home';
};

function App() {
  const [currentView, setCurrentView] = useState(getCurrentView);
  const [isNavigating, setIsNavigating] = useState(false);
  const [nextView, setNextView] = useState(getCurrentView);
  const navigationTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleHashChange = () => {
      const upcomingView = getCurrentView();

      if (!['client', 'owner', 'staff'].includes(upcomingView)) {
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

  if (currentView === 'login') {
    return <Login />;
  }

  if (currentView === 'register') {
    return <Register />;
  }

  if (currentView === 'forgot-password') {
    return <ForgotPassword />;
  }

  if (currentView === 'reset-otp') {
    return <ResetOtp />;
  }

  if (currentView === 'reset-password') {
    return <ResetPassword />;
  }

  if (currentView === 'client') {
    return <ClientDashboard email={window.sessionStorage.getItem('clientEmail') ?? 'verified client'} />;
  }

  if (currentView === 'owner') {
    return <OwnerDashboard />;
  }

  if (currentView === 'staff') {
    return <StaffDashboard />;
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