import { Coffee as CoffeeIcon, Sparkles, Store } from 'lucide-react';

export const Coffee = () => {
  return (
    <section id="coffee" className="relative bg-white text-neutral-900 py-24 px-6 md:px-16 overflow-hidden">
      
      {/* Background Subtle Watermark Text */}
      <div className="absolute top-10 left-10 text-[180px] lg:text-[240px] font-black text-neutral-100 select-none pointer-events-none tracking-tighter leading-none z-0">
        BREW
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Copywriting & Info Cards */}
        <div className="lg:col-span-6 space-y-8">
          
          <div className="space-y-4">
            <span className="text-xs font-black tracking-[0.25em] text-[#C6A664] uppercase block">
              ARTISANAL BREWS
            </span>
            <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tight leading-[0.95] text-neutral-950">
              WAIT IN<br />
              <span className="italic font-serif font-normal text-neutral-800">STYLE.</span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base max-w-lg leading-relaxed pt-2">
              While waiting for your session, enjoy a cup of our <strong className="text-neutral-950 border-b-2 border-[#C6A664]">signature roast</strong>. Our cafe is a premium sanctuary for the modern hustler.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4 max-w-md">
            
            {/* Card 1 */}
            <div className="bg-neutral-50 backdrop-blur-xl border border-neutral-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-white border border-neutral-200 rounded-xl text-[#C6A664] shrink-0 shadow-xs">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900">PREMIUM BEANS</h3>
                <p className="text-[11px] text-neutral-600 font-medium mt-0.5">
                  Sourced from the finest growers for a bold finish.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-neutral-50 backdrop-blur-xl border border-neutral-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-white border border-neutral-200 rounded-xl text-[#C6A664] shrink-0 shadow-xs">
                <Store size={18} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900">LIFESTYLE HUB</h3>
                <p className="text-[11px] text-neutral-600 font-medium mt-0.5">
                  Browse latest drops while enjoying your latte.
                </p>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-2">
            <a
              href="#menu"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-950 text-white font-black text-xs tracking-widest uppercase hover:bg-[#C6A664] hover:text-neutral-950 transition-all duration-300 shadow-xl"
            >
              <span>VIEW BREW MENU</span>
              <CoffeeIcon size={16} />
            </a>
          </div>

        </div>

        {/* Right Column: Asymmetric Image Collage Grid */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 h-full">
          
          {/* Left Sub-column */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="h-64 sm:h-72 rounded-3xl overflow-hidden border border-neutral-200 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop"
                alt="Matcha Latte Brew"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-64 sm:h-72 rounded-3xl overflow-hidden border border-neutral-200 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop"
                alt="Iced Coffee Cup"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Sub-column */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="h-52 sm:h-60 rounded-3xl overflow-hidden border border-neutral-200 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
                alt="Signature Coffee Lineup"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-76 sm:h-84 rounded-3xl overflow-hidden border border-neutral-200 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop"
                alt="Cold Brew Glass"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};