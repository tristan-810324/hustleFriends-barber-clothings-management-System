
export const Footer = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-black text-xl text-white uppercase tracking-wider mb-2">Hustle Friends</h3>
          <p className="text-xs text-neutral-500">Streetwear, Barber & Artisanal Coffee Hub.</p>
        </div>
        
        <div>
          <h4 className="text-white text-sm font-bold uppercase mb-3">Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#shop" className="hover:text-amber-500 transition">Shop Apparel</a></li>
            <li><a href="#barber" className="hover:text-amber-500 transition">Barbershop Booking</a></li>
            <li><a href="#coffee" className="hover:text-amber-500 transition">Coffee Menu</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-bold uppercase mb-3">Hours</h4>
          <p className="text-xs">Mon - Sun: 9:00 AM - 10:00 PM</p>
        </div>

        <div>
          <h4 className="text-white text-sm font-bold uppercase mb-3">Socials</h4>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Facebook</a>
            <a href="#" className="hover:text-white transition">TikTok</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-neutral-900 pt-6 text-center text-xs text-neutral-600">
        &copy; {new Date().getFullYear()} Hustle Friends. All rights reserved.
      </div>
    </footer>
  );
};
