import { MapPin, ArrowUpRight, Flame, Sparkles } from 'lucide-react';

export const Products = () => {
  return (
    <section id="products" className="relative bg-white text-neutral-900 py-24 px-6 md:px-16 overflow-hidden">
      
      {/* Background Subtle Watermark Text */}
      <div className="absolute top-10 left-10 text-[180px] lg:text-[240px] font-black text-neutral-100 select-none pointer-events-none tracking-tighter leading-none z-0">
        WEAR
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
          <div className="space-y-3">
            <span className="text-xs font-black tracking-[0.25em] text-[#C6A664] uppercase block">
              CONCEPT STORE
            </span>
            <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tight leading-[0.95] text-neutral-950">
              PHYSICAL<br />
              <span className="italic font-serif font-normal text-neutral-800">EXCLUSIVE DROPS.</span>
            </h2>
          </div>

          <div className="space-y-2 max-w-sm">
            <span className="inline-block px-3 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-[10px] font-black tracking-widest text-neutral-700 uppercase">
              WALK-IN EXCLUSIVE ONLY
            </span>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
              Available strictly for in-store purchases. Visit our concept shop to fit and buy our exclusive streetwear drops and premium grooming kits.
            </p>
          </div>
        </div>

        {/* Collection Showcase Cards with Image Backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Main Streetwear Collection Banner */}
          <div className="relative h-[480px] sm:h-[520px] rounded-3xl overflow-hidden border border-neutral-200 shadow-xl group flex flex-col justify-between p-8 sm:p-10">
            {/* Image & Overlay */}
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f25b?q=80&w=1000&auto=format&fit=crop"
              alt="Hustle Friends Streetwear Apparel"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

            {/* Top Badge */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="p-3 bg-white/90 backdrop-blur-md border border-neutral-200 rounded-2xl text-[#C6A664] shadow-md">
                <Flame size={22} />
              </div>
              <span className="px-4 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[10px] font-black text-white tracking-widest uppercase">
                IN-STORE DROPS
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-4">
              <span className="text-[10px] font-black tracking-widest text-[#C6A664] uppercase block">
                APPAREL & TEES
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-wide text-white leading-tight">
                HEAVYWEIGHT OVERSIZED COLLECTION
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-md">
                Custom streetwear cuts made with premium cotton fabric. Fit and purchase directly at our shop.
              </p>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-neutral-950 font-black text-xs tracking-widest uppercase hover:bg-[#C6A664] transition-all duration-300 shadow-xl"
                >
                  <span>VISIT OUR STORE</span>
                  <MapPin size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Grooming Essentials Banner */}
          <div className="relative h-[480px] sm:h-[520px] rounded-3xl overflow-hidden border border-neutral-200 shadow-xl group flex flex-col justify-between p-8 sm:p-10">
            {/* Image & Overlay */}
            <img
              src="https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=1000&auto=format&fit=crop"
              alt="Barber Grooming Essentials"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

            {/* Top Badge */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="p-3 bg-white/90 backdrop-blur-md border border-neutral-200 rounded-2xl text-[#C6A664] shadow-md">
                <Sparkles size={22} />
              </div>
              <span className="px-4 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[10px] font-black text-white tracking-widest uppercase">
                WALK-IN PURCHASES
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-4">
              <span className="text-[10px] font-black tracking-widest text-[#C6A664] uppercase block">
                GROOMING ESSENTIALS
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-wide text-white leading-tight">
                BARBER-GRADE STYLING KITS
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-md">
                Precision matte pomades and grooming tools available right after your barber session.
              </p>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-neutral-950 font-black text-xs tracking-widest uppercase hover:bg-[#C6A664] transition-all duration-300 shadow-xl"
                >
                  <span>GET LOCATION</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};