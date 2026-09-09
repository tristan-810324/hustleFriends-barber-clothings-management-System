import { Calendar, CheckCircle2 } from 'lucide-react';
import { Reveal } from '../components/effects/Reveal';

export const Barber = () => {
  return (
    <section id="barber" className="relative bg-white text-neutral-900 py-12 md:py-20 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      
      {/* Background Subtle Watermark Text */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 text-[120px] sm:text-[180px] lg:text-[240px] font-black text-neutral-100 select-none pointer-events-none tracking-tighter leading-none z-0">
        CUT
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center">
        
        {/* Left Side: Image Layer (Desktop: Col 6, Mobile: Order 2) */}
        <Reveal className="order-2 lg:order-1 lg:col-span-6 relative w-full my-2 lg:my-0" direction="left">
          <div className="relative w-full h-80 sm:h-96 md:h-120 lg:h-125 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 shadow-2xl">
            <img
              src="/img/barber3.png"
              alt="Hustle Friends Barber Session"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Floating Glassmorphism Badge */}
          <div className="absolute -bottom-5 right-4 sm:right-8 max-w-65 sm:max-w-xs bg-white/95 backdrop-blur-xl border border-neutral-200 p-4 sm:p-5 rounded-2xl shadow-2xl flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#C6A664] text-xs font-black tracking-widest uppercase">
              <CheckCircle2 size={15} />
              <span>MASTER CLASS</span>
            </div>
            <p className="text-neutral-600 text-xs font-medium leading-relaxed">
              Precision fades and classic grooming tailored for the modern professional.
            </p>
          </div>
        </Reveal>

        {/* Right Side Column Container (Desktop: Col 6, Mobile: Flex Display) */}
        <Reveal className="order-1 lg:order-2 lg:col-span-6 flex flex-col w-full" direction="right" delay={160}>
          
          {/* Section 1: Title & Description (Mobile: Order 1) */}
          <div className="order-1 space-y-2 sm:space-y-3">
            <span className="text-xs font-black tracking-[0.25em] text-[#C6A664] uppercase block">
              PREMIUM GROOMING
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-neutral-950">
              SHARP <span className="italic font-serif font-normal text-neutral-800">CUTS.</span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base max-w-lg leading-relaxed pt-1">
              It's more than just a haircut. At <strong className="text-neutral-950 border-b-2 border-[#C6A664]">Hustle Friends Barber</strong>, every fade is a masterpiece. We blend traditional craftsmanship with modern edge.
            </p>
          </div>

          {/* Section 2: Services & Details (Mobile: Order 3, kaya malilipat sa ilalim ng Image sa mobile lang) */}
          <div className="order-3 lg:order-2 space-y-5 sm:space-y-6 pt-6 lg:pt-8">
            
            {/* Service Info */}
            <div className="grid grid-cols-2 gap-4 py-5 border-t border-b border-neutral-200">
              <div>
                <h3 className="font-black text-sm sm:text-base uppercase tracking-wider text-neutral-900">CLASSIC FADE</h3>
                <p className="text-[11px] font-bold text-[#C6A664] tracking-widest uppercase mt-0.5">45–60 MIN SESSION</p>
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-base uppercase tracking-wider text-neutral-900">BEARD SCULPT</h3>
                <p className="text-[11px] font-bold text-[#C6A664] tracking-widest uppercase mt-0.5">30 MIN SESSION</p>
              </div>
            </div>

            {/* CTA & Schedule */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-1">
              <a
                href="#booking"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-950 text-white font-black text-xs tracking-widest uppercase hover:bg-[#C6A664] hover:text-neutral-950 transition-all duration-300 shadow-xl flex items-center justify-center gap-3 active:scale-95"
              >
                <span>BOOK APPOINTMENT</span>
                <Calendar size={16} />
              </a>

              <div>
                <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase block">HOURS OF SERVICE</span>
                <span className="text-xs font-black text-neutral-800 tracking-wider uppercase">TUE – SUN | 10AM – 8PM</span>
              </div>
            </div>

          </div>

        </Reveal>

      </div>
    </section>
  );
};