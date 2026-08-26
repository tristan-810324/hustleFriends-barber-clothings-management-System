import { useState } from 'react';
import { Phone, MapPin, Share2, ExternalLink, Navigation } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Message sent:', formData);
  };

  return (
    <section id="contact" className="relative bg-white text-neutral-900 py-12 md:py-20 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      
      {/* Centered Section Header */}
      <div className="max-w-4xl mx-auto text-center space-y-2 sm:space-y-3 mb-8 md:mb-12 relative z-10">
        <span className="text-xs font-black tracking-[0.25em] text-[#C6A664] uppercase block">
          CONNECT WITH US
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-neutral-950">
          START THE <span className="text-neutral-800">CONVERSATION.</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 lg:items-stretch">
        
        {/* Left Column: Interactive Contact Form */}
        <div className="order-2 lg:order-1 lg:col-span-7 bg-neutral-50/80 backdrop-blur-xl border border-neutral-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg w-full flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 h-full flex flex-col justify-between">
            
            <div className="space-y-4 sm:space-y-5">
              {/* Name & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    placeholder="Juan Dela Cruz"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#C6A664] transition-colors shadow-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    placeholder="0917 XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#C6A664] transition-colors shadow-xs"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#C6A664] transition-colors shadow-xs"
                  required
                />
              </div>

              {/* Subject Dropdown */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block">
                  WHAT IS THIS ABOUT? (SUBJECT)
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs text-neutral-700 focus:outline-none focus:border-[#C6A664] transition-colors appearance-none cursor-pointer shadow-xs"
                  required
                >
                  <option value="" disabled>Choose a Subject</option>
                  <option value="appointment">Appointment Inquiry</option>
                  <option value="concept_store">Concept Store Apparel</option>
                  <option value="coffee_bar">Coffee Bar & Brews</option>
                  <option value="general">General Feedback</option>
                </select>
              </div>

              {/* Message Textarea */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block">
                  YOUR MESSAGE
                </label>
                <textarea
                  rows={3}
                  placeholder="Ano'ng atin, ka-hustleFriends?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-xl p-3.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#C6A664] transition-colors resize-none shadow-xs"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 py-3.5 rounded-xl bg-neutral-950 text-white font-black text-xs tracking-widest uppercase hover:bg-[#C6A664] hover:text-neutral-950 transition-all duration-300 shadow-xl active:scale-95"
            >
              SEND MESSAGE TO HUSTLE FRIENDS
            </button>

          </form>
        </div>

        {/* Right Column: Contact Cards & Google Maps Container */}
        <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-between gap-3 sm:gap-3.5 w-full h-full">
          
          {/* Card 1: Mobile Number */}
          <div className="bg-linear-to-br from-neutral-50 via-white to-neutral-100/60 backdrop-blur-xl border border-neutral-200/90 hover:border-[#C6A664]/60 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3.5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-[#C6A664] shrink-0 mt-0.5 shadow-md group-hover:bg-[#C6A664] group-hover:text-neutral-950 transition-colors duration-300">
              <Phone size={16} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-black tracking-widest text-[#C6A664] uppercase block">
                MOBILE NUMBER
              </span>
              <p className="text-base sm:text-lg font-black text-neutral-950 tracking-wide">0917-123-4567</p>
              <p className="text-[10px] sm:text-[11px] font-medium text-neutral-500 leading-tight pt-0.5">
                Available 10AM - 8PM for priority bookings.
              </p>
            </div>
          </div>

          {/* Card 2: Shop Address */}
          <div className="bg-linear-to-br from-neutral-50 via-white to-neutral-100/60 backdrop-blur-xl border border-neutral-200/90 hover:border-[#C6A664]/60 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3.5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-[#C6A664] shrink-0 mt-0.5 shadow-md group-hover:bg-[#C6A664] group-hover:text-neutral-950 transition-colors duration-300">
              <MapPin size={16} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-black tracking-widest text-[#C6A664] uppercase block">
                SHOP ADDRESS
              </span>
              <p className="text-xs sm:text-sm font-bold text-neutral-900 leading-relaxed pt-0.5">
                KM. 38 National Road, Pulong Buhangin, Santa Maria, 3022 Bulacan
              </p>
            </div>
          </div>

          {/* Card 3: Social Media Links */}
          <div className="bg-linear-to-br from-neutral-50 via-white to-neutral-100/60 backdrop-blur-xl border border-neutral-200/90 hover:border-[#C6A664]/60 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3.5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-[#C6A664] shrink-0 mt-0.5 shadow-md group-hover:bg-[#C6A664] group-hover:text-neutral-950 transition-colors duration-300">
              <Share2 size={16} />
            </div>
            <div className="w-full">
              <span className="text-[10px] font-black tracking-widest text-[#C6A664] uppercase block mb-2">
                FOLLOW THE CULTURE
              </span>
              <div className="grid grid-cols-2 gap-2">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-950 text-neutral-900 hover:text-[#C6A664] text-xs font-black uppercase tracking-wider transition-all duration-300 border border-neutral-200 hover:border-neutral-800"
                >
                  <span aria-hidden="true" className="text-sm font-black">f</span>
                  <span>FACEBOOK</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-950 text-neutral-900 hover:text-[#C6A664] text-xs font-black uppercase tracking-wider transition-all duration-300 border border-neutral-200 hover:border-neutral-800"
                >
                  <span aria-hidden="true" className="text-sm font-black">◎</span>
                  <span>INSTAGRAM</span>
                </a>
              </div>
            </div>
          </div>

          {/* Perfectly Aligned Google Maps Container */}
          <div className="relative rounded-2xl overflow-hidden border border-neutral-300/80 h-40 sm:h-44 lg:h-auto lg:flex-1 lg:min-h-0 shadow-xl group">
            <iframe
              title="Hustle Friends Concept Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.320295847901!2d120.9922!3d14.8631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDUxJzQ3LjIiTiAxMjDCsDU5JzMxLjkiRQ!5e0!3m2!1sen!2sph!4v1620000000000!5m2!1sen!2sph"
              className="w-full h-full grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out"
              loading="lazy"
            />
            
            {/* Dark Vignette Overlay on Idle */}
            <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent pointer-events-none transition-colors duration-300" />

            {/* Map Action Badges */}
            <div className="absolute top-2.5 left-2.5 z-10">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-950/90 text-[#C6A664] border border-neutral-800 text-[9px] sm:text-[10px] font-black tracking-widest uppercase backdrop-blur-md hover:bg-[#C6A664] hover:text-neutral-950 transition-all duration-300 shadow-lg"
              >
                <span>Open in Maps</span>
                <ExternalLink size={11} />
              </a>
            </div>

            <div className="absolute top-2.5 right-2.5 z-10">
              <a
                href="https://waze.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-950/90 text-white border border-neutral-800 text-[9px] sm:text-[10px] font-black tracking-widest uppercase backdrop-blur-md hover:bg-[#C6A664] hover:text-neutral-950 transition-all duration-300 shadow-lg"
              >
                <span>OPEN IN WAZE</span>
                <Navigation size={11} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};