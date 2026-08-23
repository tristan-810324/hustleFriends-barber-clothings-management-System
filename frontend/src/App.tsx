import { Navbar } from './components/Navbar';
import { Footer } from './components/footer';

import { Hero } from './landing/hero';
import { Barber } from './landing/Barber';
import { Products } from './landing/Products';
import { Coffee } from './landing/Coffee';
import { Contact } from './landing/Contact';

function App() {
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