import { Calendar, CheckCircle2 } from 'lucide-react';

export const Barber = () => {
  return (
    <section id="barber" className="relative bg-white text-neutral-900 py-24 px-6 md:px-16 overflow-hidden">
      
      {/* Background Subtle Watermark Text */}
      <div className="absolute top-10 left-10 text-[180px] lg:text-[240px] font-black text-neutral-100 select-none pointer-events-none tracking-tighter leading-none z-0">
        CUT
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Image with Floating Card */}
        <div className="lg:col-span-6 relative">
          <div className="relative w-full h-[500px] sm:h-[600px] rounded-3xl overflow-hidden border border-neutral-200 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000&auto=format&fit=crop"
              alt="Hustle Friends Barber Session"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Floating Glassmorphism Badge */}
          <div className="absolute -bottom-6 right-4 sm:right-8 max-w-xs bg-white/90 backdrop-blur-xl border border-neutral-200 p-5 rounded-2xl shadow-2xl hidden sm:block">
            <div className="flex items-center gap-2 text-[#C6A664] text-xs font-black tracking-widest uppercase mb-1">
              <CheckCircle2 size={14} />
              <span>MASTER CLASS</span>
            </div>
            <p className="text-neutral-600 text-xs font-medium leading-relaxed">
              Precision fades and classic grooming tailored for the modern professional.
            </p>
          </div>
        </div>

        {/* Right Side: Editorial Content */}
        <div className="lg:col-span-6 space-y-8">
          
          <div className="space-y-4">
            <span className="text-xs font-black tracking-[0.25em] text-[#C6A664] uppercase block">
              PREMIUM GROOMING
            </span>
            <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tight leading-[0.95] text-neutral-950">
              SHARP<br />
              <span className="italic font-serif font-normal text-neutral-800">CUTS.</span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base max-w-lg leading-relaxed pt-2">
              It's more than just a haircut. At <strong className="text-neutral-950 border-b-2 border-[#C6A664]">Hustle Friends Barber</strong>, every fade is a masterpiece. We blend traditional craftsmanship with modern edge.
            </p>
          </div>

          {/* Service Info */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-b border-neutral-200 py-6">
            <div>
              <h3 className="font-black text-base uppercase tracking-wider text-neutral-900">CLASSIC FADE</h3>
              <p className="text-[11px] font-bold text-[#C6A664] tracking-widest uppercase mt-1">45–60 MIN SESSION</p>
            </div>
            <div>
              <h3 className="font-black text-base uppercase tracking-wider text-neutral-900">BEARD SCULPT</h3>
              <p className="text-[11px] font-bold text-[#C6A664] tracking-widest uppercase mt-1">30 MIN SESSION</p>
            </div>
          </div>

          {/* CTA & Schedule */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
            <a
              href="#booking"
              className="px-8 py-4 rounded-full bg-neutral-950 text-white font-black text-xs tracking-widest uppercase hover:bg-[#C6A664] hover:text-neutral-950 transition-all duration-300 shadow-xl flex items-center gap-3"
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

      </div>
    </section>
  );
};