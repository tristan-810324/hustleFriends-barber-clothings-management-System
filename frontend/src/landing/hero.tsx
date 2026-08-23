import { ArrowUpRight, Coffee, Scissors, ShoppingBag } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full bg-neutral-950 text-white flex flex-col justify-between pt-32 pb-10 px-4 sm:px-8 md:px-16 overflow-hidden">
      
      {/* Background Image Layer with Vignette Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('/img/background.png')` }}
      >
        {/* Dark Radial Overlay for High Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_90%)]" />
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto relative z-10">
        
        {/* Left Side: Main Typography & Brand Narrative */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          
         

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-[0.9] uppercase text-white">
            WEAR.<br />
            <span className="text-[#C6A664] drop-shadow-[0_0_35px_rgba(198,166,100,0.25)]">
              CUT.
            </span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-400 to-neutral-600">
              BREW.
            </span>
          </h1>

          {/* Description */}
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed">
            More than a brand. A modern lifestyle hub where premium streetwear, precision grooming, and artisanal coffee converge under one roof.
          </p>

          {/* Call-to-action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="#shop" 
              className="px-8 py-4 rounded-xl bg-[#C6A664] text-neutral-950 font-black text-xs tracking-widest uppercase hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-[#C6A664]/20"
            >
              Shop Collection
            </a>
            <a 
              href="#barber" 
              className="px-8 py-4 rounded-xl bg-neutral-900/80 backdrop-blur-md border border-neutral-800/80 text-white font-black text-xs tracking-widest uppercase hover:border-[#C6A664]/50 hover:bg-neutral-800 transition-all duration-300"
            >
              Book Appointment
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Feature Cards (Glassmorphism Layout) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-5">
          
          {/* Main Featured Card */}
          <a 
            href="#shop"
            className="block bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/90 hover:border-[#C6A664]/60 p-6 sm:p-7 rounded-3xl relative group transition-all duration-300 shadow-2xl hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-2xl text-[#C6A664] group-hover:bg-[#C6A664] group-hover:text-neutral-950 transition-colors duration-300">
                <ShoppingBag size={22} />
              </div>
              <div className="w-10 h-10 rounded-full border border-neutral-800/80 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-white transition-all duration-300">
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
            <span className="text-[11px] text-[#C6A664] font-black tracking-widest uppercase">Collection 01</span>
            <h3 className="text-2xl font-black uppercase tracking-wide mt-1 text-white">Explore Items</h3>
          </a>

          {/* Sub Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Barber Card */}
            <a 
              href="#barber"
              className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/90 hover:border-[#C6A664]/60 p-5 rounded-3xl group transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div className="p-3 bg-neutral-950/80 border border-neutral-800 w-fit rounded-2xl text-[#C6A664] mb-6 group-hover:bg-[#C6A664] group-hover:text-neutral-950 transition-colors duration-300">
                <Scissors size={18} />
              </div>
              <h4 className="font-black text-sm tracking-widest uppercase text-white">Barber</h4>
              <p className="text-[10px] text-neutral-400 font-bold tracking-widest uppercase mt-1 group-hover:text-[#C6A664] transition-colors">
                BOOK SLOT →
              </p>
            </a>

            {/* Coffee Card */}
            <a 
              href="#coffee"
              className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/90 hover:border-[#C6A664]/60 p-5 rounded-3xl group transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div className="p-3 bg-neutral-950/80 border border-neutral-800 w-fit rounded-2xl text-[#C6A664] mb-6 group-hover:bg-[#C6A664] group-hover:text-neutral-950 transition-colors duration-300">
                <Coffee size={18} />
              </div>
              <h4 className="font-black text-sm tracking-widest uppercase text-white">Cafe</h4>
              <p className="text-[10px] text-neutral-400 font-bold tracking-widest uppercase mt-1 group-hover:text-[#C6A664] transition-colors">
                VIEW MENU →
              </p>
            </a>

          </div>
        </div>
      </div>

      {/* Footer / Scroll Prompt Indicator */}
      <div className="relative z-10 text-center pt-8">
        <span className="text-[10px] text-neutral-500 font-bold tracking-[0.3em] uppercase animate-pulse">
          Scroll Down
        </span>
      </div>
    </section>
  );
};