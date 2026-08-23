import { Coffee as CoffeeIcon, Sparkles, Store } from 'lucide-react';

export const Coffee = () => {
  return (
    <section id="coffee" className="relative bg-white text-neutral-900 py-12 md:py-20 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      
      {/* Background Subtle Watermark Text */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 text-[120px] sm:text-[180px] lg:text-[240px] font-black text-neutral-100 select-none pointer-events-none tracking-tighter leading-none z-0">
        BREW
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Copywriting & Content Wrapper */}
        <div className="order-1 lg:col-span-6 flex flex-col justify-between h-full space-y-6">
          
          {/* Section 1: Title & Narrative (Mobile: Order 1) */}
          <div className="order-1 space-y-2 sm:space-y-3">
            <span className="text-xs font-black tracking-[0.25em] text-[#C6A664] uppercase block">
              ARTISANAL BREWS
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-neutral-950">
              WAIT IN <span className="italic font-serif font-normal text-neutral-800">STYLE.</span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base max-w-lg leading-relaxed pt-1">
              While waiting for your session, enjoy a cup of our <strong className="text-neutral-950 border-b-2 border-[#C6A664]">signature roast</strong>. Our cafe is a premium sanctuary for the modern hustler.
            </p>
          </div>

          {/* Section 2: Feature Cards & CTA (Mobile: Order 3, malilipat sa ilalim ng Image Grid) */}
          <div className="order-3 lg:order-2 space-y-6 pt-2 lg:pt-0">
            
            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
              
              {/* Card 1 */}
              <div className="bg-neutral-50/80 backdrop-blur-xl border border-neutral-200 p-3.5 sm:p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
                <div className="p-2.5 bg-white border border-neutral-200 rounded-xl text-[#C6A664] shrink-0 shadow-xs">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900">PREMIUM BEANS</h3>
                  <p className="text-[10px] sm:text-[11px] text-neutral-600 font-medium mt-0.5">
                    Sourced for a bold finish.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-neutral-50/80 backdrop-blur-xl border border-neutral-200 p-3.5 sm:p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
                <div className="p-2.5 bg-white border border-neutral-200 rounded-xl text-[#C6A664] shrink-0 shadow-xs">
                  <Store size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900">LIFESTYLE HUB</h3>
                  <p className="text-[10px] sm:text-[11px] text-neutral-600 font-medium mt-0.5">
                    Browse latest drops inside.
                  </p>
                </div>
              </div>

            </div>

            {/* Action Button */}
            <div className="pt-1">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-neutral-950 text-white font-black text-xs tracking-widest uppercase hover:bg-[#C6A664] hover:text-neutral-950 transition-all duration-300 shadow-xl active:scale-95"
              >
                <span>VIEW BREW MENU</span>
                <CoffeeIcon size={16} />
              </a>
            </div>

          </div>

        </div>

        {/* Right Column: Image Collage Grid (Mobile: Order 2) */}
        <div className="order-2 lg:order-2 lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4 my-2 lg:my-0">
          
          {/* Left Sub-column */}
          <div className="space-y-3 sm:space-y-4 flex flex-col justify-between">
            <div className="h-36 sm:h-52 md:h-64 lg:h-56 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 shadow-lg">
              <img
                src="/img/americano.png"
                alt="Matcha Latte Brew"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-36 sm:h-52 md:h-64 lg:h-60 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 shadow-lg">
              <img
                src="/img/drinks.png"
                alt="Iced Coffee Cup"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Sub-column */}
          <div className="space-y-3 sm:space-y-4 flex flex-col justify-between">
            <div className="h-28 sm:h-44 md:h-52 lg:h-48 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 shadow-lg">
              <img
                src="/img/drinks2.png"
                alt="Signature Coffee Lineup"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-44 sm:h-60 md:h-76 lg:h-68 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 shadow-lg">
              <img
                src="/img/matcha.png"
                alt="Cold Brew Glass"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};