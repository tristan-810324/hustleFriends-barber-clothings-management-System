import { MapPin, ArrowUpRight } from 'lucide-react';

export const Products = () => {
  return (
    <section id="products" className="relative bg-white text-neutral-900 py-12 md:py-20 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      
      {/* Background Subtle Watermark Text */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 text-[120px] sm:text-[180px] lg:text-[220px] font-black text-neutral-100 select-none pointer-events-none tracking-tighter leading-none z-0">
        WEAR
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8 md:space-y-10">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 pb-6 border-b border-neutral-200">
          <div className="space-y-2">
            <span className="text-[11px] font-black tracking-[0.25em] text-[#C6A664] uppercase block">
              CONCEPT STORE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] text-neutral-950">
              PHYSICAL <span className="italic font-serif font-normal text-neutral-700">EXCLUSIVE DROPS.</span>
            </h2>
          </div>

          <div className="space-y-1.5 max-w-sm">
            <span className="inline-block px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-[9px] sm:text-[10px] font-black tracking-widest text-neutral-700 uppercase">
              WALK-IN EXCLUSIVE ONLY
            </span>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
              Available strictly for in-store purchases. Visit our concept shop to fit and buy our exclusive streetwear drops and premium grooming kits.
            </p>
          </div>
        </div>

        {/* Collection Showcase Cards - Fixed Tablet Responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Main Streetwear Collection Banner */}
          <div className="relative min-h-105 md:min-h-120 lg:min-h-130 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 shadow-lg hover:shadow-2xl group flex flex-col justify-between p-6 sm:p-8 transition-all duration-500">
            {/* Image & High-Contrast Gradient Overlay */}
            <img
              src="/img/Products.png"
              alt="Hustle Friends Streetwear Apparel"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/20" />

            {/* Top Badge (Icon Removed) */}
            <div className="relative z-10 flex justify-end items-center">
              <span className="px-3.5 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[9px] sm:text-[10px] font-black text-white tracking-widest uppercase shadow-md">
                IN-STORE DROPS
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-2 sm:space-y-3">
              <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#C6A664] uppercase block">
                APPAREL & TEES
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide text-white leading-tight">
                HEAVYWEIGHT OVERSIZED COLLECTION
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-md">
                Custom streetwear cuts made with premium cotton fabric. Fit and purchase directly at our shop.
              </p>

              <div className="pt-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-neutral-950 font-black text-xs tracking-widest uppercase hover:bg-[#C6A664] hover:text-neutral-950 transition-all duration-300 shadow-md active:scale-95"
                >
                  <span>VISIT OUR STORE</span>
                  <MapPin size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Grooming Essentials Banner */}
          <div className="relative min-h-105 md:min-h-120 lg:min-h-130 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 shadow-lg hover:shadow-2xl group flex flex-col justify-between p-6 sm:p-8 transition-all duration-500">
            {/* Image & High-Contrast Gradient Overlay */}
            <img
              src="/img/barber2.png"
              alt="Barber Grooming Essentials"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/20" />

            {/* Top Badge (Icon Removed) */}
            <div className="relative z-10 flex justify-end items-center">
              <span className="px-3.5 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[9px] sm:text-[10px] font-black text-white tracking-widest uppercase shadow-md">
                WALK-IN PURCHASES
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-2 sm:space-y-3">
              <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#C6A664] uppercase block">
                GROOMING ESSENTIALS
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide text-white leading-tight">
                BARBER-GRADE STYLING KITS
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-md">
                Precision matte pomades and grooming tools available right after your barber session.
              </p>

              <div className="pt-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-neutral-950 font-black text-xs tracking-widest uppercase hover:bg-[#C6A664] hover:text-neutral-950 transition-all duration-300 shadow-md active:scale-95"
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