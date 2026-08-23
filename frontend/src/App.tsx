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

const getCurrentView = () => {
  if (window.location.hash === '#login') return 'login';
  if (window.location.hash === '#register') return 'register';
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