import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/footer';

import { Hero } from './landing/hero';
import { Barber } from './landing/Barber';
import { Products } from './landing/Products';
import { Coffee } from './landing/Coffee';
import { Contact } from './landing/Contact';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import ResetOtp from './auth/ResetOtp';
import ResetPassword from './auth/ResetPassword';
import ClientDashboard from './client/ClientDashboard';

const getCurrentView = () => {
  if (window.location.hash === '#login') return 'login';
  if (window.location.hash === '#register') return 'register';
  if (window.location.hash === '#forgot-password') return 'forgot-password';
  if (window.location.hash === '#reset-otp') return 'reset-otp';
  if (window.location.hash === '#reset-password') return 'reset-password';
  if (window.location.hash === '#client') return 'client';
  return 'home';
};

function App() {
  const [currentView, setCurrentView] = useState(getCurrentView);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(getCurrentView());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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