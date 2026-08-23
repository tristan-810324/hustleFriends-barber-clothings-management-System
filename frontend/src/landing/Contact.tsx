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
    // Connects to Backend POST /api/messages
    console.log('Message sent:', formData);
  };

  return (
    <section id="contact" className="relative bg-white text-neutral-900 py-24 px-6 md:px-16 overflow-hidden">
      
      {/* Centered Section Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-16 relative z-10">
        <span className="text-xs font-black tracking-[0.25em] text-[#C6A664] uppercase block">
          CONNECT WITH US
        </span>
        <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tight leading-[0.95] text-neutral-950">
          START THE<br />
          <span className="text-neutral-800">CONVERSATION.</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-neutral-50 backdrop-blur-xl border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name & Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  placeholder="Juan Dela Cruz"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#C6A664] transition-colors shadow-xs"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  placeholder="0917 XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#C6A664] transition-colors shadow-xs"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#C6A664] transition-colors shadow-xs"
                required
              />
            </div>

            {/* Subject Dropdown */}
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block">
                WHAT IS THIS ABOUT? (SUBJECT)
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-xs text-neutral-700 focus:outline-none focus:border-[#C6A664] transition-colors appearance-none cursor-pointer shadow-xs"
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
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block">
                YOUR MESSAGE
              </label>
              <textarea
                rows={4}
                placeholder="Ano'ng atin, ka-hustle?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-xl p-4 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#C6A664] transition-colors resize-none shadow-xs"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-neutral-950 text-white font-black text-xs tracking-widest uppercase hover:bg-[#C6A664] hover:text-neutral-950 transition-all duration-300 shadow-xl"
            >
              SEND MESSAGE TO HUSTLE FRIENDS
            </button>

          </form>
        </div>

        {/* Right Column: Contact Cards & Google Maps Container */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Card 1: Mobile Number */}
          <div className="bg-neutral-50 backdrop-blur-xl border border-neutral-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
            <div className="p-2.5 bg-white border border-neutral-200 rounded-xl text-[#C6A664] shrink-0 mt-0.5 shadow-xs">
              <Phone size={16} />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block">
                MOBILE NUMBER
              </span>
              <p className="text-lg font-black text-neutral-950 mt-0.5">0917-123-4567</p>
              <span className="text-[10px] font-medium text-neutral-500 block mt-0.5">
                Available 10AM - 8PM for priority bookings.
              </span>
            </div>
          </div>

          {/* Card 2: Shop Address */}
          <div className="bg-neutral-50 backdrop-blur-xl border border-neutral-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
            <div className="p-2.5 bg-white border border-neutral-200 rounded-xl text-[#C6A664] shrink-0 mt-0.5 shadow-xs">
              <MapPin size={16} />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block">
                SHOP ADDRESS
              </span>
              <p className="text-xs font-bold text-neutral-900 leading-relaxed mt-1">
                KM. 38 National Road, Pulong Buhangin, Santa Maria, 3022 Bulacan
              </p>
            </div>
          </div>

          {/* Card 3: Social Media Links */}
          <div className="bg-neutral-50 backdrop-blur-xl border border-neutral-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
            <div className="p-2.5 bg-white border border-neutral-200 rounded-xl text-[#C6A664] shrink-0 mt-0.5 shadow-xs">
              <Share2 size={16} />
            </div>
            <div className="w-full">
              <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block mb-3">
                FOLLOW THE CULTURE
              </span>
              <div className="flex items-center gap-6">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase text-neutral-900 hover:text-[#C6A664] transition-colors"
                >
                  <span aria-hidden="true" className="text-sm font-black">f</span>
                  <span>FACEBOOK</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase text-neutral-900 hover:text-[#C6A664] transition-colors"
                >
                  <span aria-hidden="true" className="text-sm font-black">◎</span>
                  <span>INSTAGRAM</span>
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps Container */}
          <div className="relative rounded-2xl overflow-hidden border border-neutral-200 h-48 shadow-xl group">
            <iframe
              title="Hustle Friends Concept Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.320295847901!2d120.9922!3d14.8631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDUxJzQ3LjIiTiAxMjDCsDU5JzMxLjkiRQ!5e0!3m2!1sen!2sph!4v1620000000000!5m2!1sen!2sph"
              className="w-full h-full opacity-90 contrast-105 group-hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
            />
            
            {/* Map Action Badges */}
            <div className="absolute top-3 left-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-neutral-200 text-[10px] font-black tracking-widest text-neutral-950 uppercase backdrop-blur-md hover:bg-[#C6A664] transition-colors shadow-xs"
              >
                <span>Open in Maps</span>
                <ExternalLink size={11} />
              </a>
            </div>

            <div className="absolute top-3 right-3">
              <a
                href="https://waze.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-neutral-200 text-[10px] font-black tracking-widest text-neutral-950 uppercase backdrop-blur-md hover:bg-[#C6A664] transition-colors shadow-xs"
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