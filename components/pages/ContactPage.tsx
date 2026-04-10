"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle2,
  ArrowRight,
  Globe,
  Clock,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Award,
} from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { AnnotatorPlugin } from "../annotationPlugin/AnnotatorPlugin";
import GetAllPages from "../../lib/GetAllDetails/GetAllPages";

// --- FAQ DATA ---
const faqs = [
  {
    question: "What gemstone is right for me?",
    answer: "The ideal gemstone depends on your birth chart (Kundli) and current life intentions. Our Vedic experts analyze planetary positions to recommend stones that align with your energetic frequency."
  },
  {
    question: "How do I energize my gemstone?",
    answer: "Every gem from Gems_Ratna undergo a primordial 'Pran-Pratishtha' ritual. We also provide a guide on cleaning and recharging your stone using lunar cycles and sacred mantras."
  },
  {
    question: "Are your gems certified?",
    answer: "Absolutely. Each gemstone is accompanied by a laboratory certificate of authenticity from internationally recognized gemological institutes, ensuring its natural origin and quality."
  },
  {
    question: "How long does delivery take?",
    answer: "Standard shipping takes 5-7 business days. For bespoke energized pieces, please allow 10-12 days as the stones require specific planetary alignments for the ritual."
  }
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preference: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { gemsratnaUser } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", preference: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {gemsratnaUser?.role === "admin" && <AnnotatorPlugin />}
      <GetAllPages />

      <main className="bg-[#F8F5F0] min-h-screen text-black selection:bg-[#d4af37]/30">
        
        {/* --- HERO SECTION --- */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 z-0">
             <Image 
                src="/assets/images/emerald_panna.png" 
                alt="Gemstone Background" 
                fill 
                className="object-cover opacity-40 blur-lg scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#F8F5F0]" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(248,245,240,1)_100%)]" />
          </div>

          <div className="relative z-10 text-center px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-12 h-px bg-[#d4af37]/50" />
                    <p className="text-[#d4af37] uppercase tracking-[0.6em] text-[11px] font-black italic">We Are Here To Help</p>
                    <div className="w-12 h-px bg-[#d4af37]/50" />
                </div>
                <h1 className="text-6xl md:text-9xl font-heading font-bold text-white mb-8 tracking-tighter drop-shadow-2xl">
                    Contact <span className="text-[#d4af37] italic">Gems_Ratna</span>
                </h1>
                <p className="text-white/60 text-xl font-light italic max-w-2xl mx-auto tracking-wide">
                    Get expert guidance to choose the perfect gemstone and align your life with celestial energy.
                </p>
            </motion.div>
          </div>
        </section>

        {/* --- MAIN SECTION --- */}
        <section className="max-w-[1400px] mx-auto px-8 md:px-16 -mt-24 relative z-20 pb-40">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* LEFT SIDE: FAQ + INFO */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
              <div className="bg-white p-12 md:p-20 rounded-[60px] shadow-2xl border border-black/5">
                <div className="flex items-center gap-4 mb-12">
                   <ShieldCheck className="text-[#d4af37]" size={28} />
                   <h2 className="text-4xl font-heading font-bold tracking-tight italic">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-6">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-black/5 pb-6">
                      <button 
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between text-left group"
                      >
                        <span className={`text-xl font-medium tracking-tight transition-colors ${openFaq === idx ? 'text-[#d4af37]' : 'text-black/70 group-hover:text-black'}`}>
                            {faq.question}
                        </span>
                        <ChevronDown size={24} className={`transition-transform duration-500 ${openFaq === idx ? 'rotate-180 text-[#d4af37]' : 'text-black/20'}`} />
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="pt-6 text-black/50 leading-relaxed italic text-lg">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="mt-20 p-12 rounded-[40px] bg-[#d4af37]/5 border border-[#d4af37]/10">
                   <h3 className="text-2xl font-heading font-medium mb-4 italic">Still have questions?</h3>
                   <p className="text-black/50 mb-8 italic">Our dedicated Vedic experts are available for private consultations.</p>
                   <div className="flex items-center gap-4 text-xl font-bold tracking-tighter">
                      <Mail size={24} className="text-[#d4af37]" />
                      <a href="mailto:support@gemsratna.com" className="hover:text-[#d4af37] transition-all underline underline-offset-8 decoration-[#d4af37]/20">support@gemsratna.com</a>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE: CONTACT FORM */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
               <div className="bg-white p-12 md:p-20 rounded-[60px] shadow-2xl border border-black/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                     <Sparkles size={150} className="text-[#d4af37]" />
                  </div>
                  
                  <div className="mb-14">
                     <h2 className="text-4xl font-heading font-bold mb-4 italic tracking-tight">Ask Our Experts</h2>
                     <p className="text-black/40 italic font-medium">Bespoke spiritual orientation starting within 24 hours.</p>
                  </div>

                  {isSubmitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center">
                        <div className="w-24 h-24 bg-[#d4af37]/10 text-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                           <CheckCircle2 size={48} />
                        </div>
                        <h3 className="text-3xl font-heading font-bold mb-4 italic">Request Received</h3>
                        <p className="text-black/50 italic mb-10 text-lg">Our curatorial circle will contact you shortly to align your frequency.</p>
                        <button onClick={() => setIsSubmitted(false)} className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-xs border-b-2 border-[#d4af37]/20 pb-2 hover:border-[#d4af37] transition-all">Send Another Inquiry</button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-12">
                      <div className="grid md:grid-cols-2 gap-10">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 ml-2">Your Name</label>
                            <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="The Noble Patron" className="w-full bg-black/5 border-none rounded-2xl py-5 px-8 outline-none focus:ring-2 focus:ring-[#d4af37]/20 transition-all font-medium text-lg italic placeholder:text-black/10" />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 ml-2">Your Email</label>
                            <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="patron@estate.com" className="w-full bg-black/5 border-none rounded-2xl py-5 px-8 outline-none focus:ring-2 focus:ring-[#d4af37]/20 transition-all font-medium text-lg italic placeholder:text-black/10" />
                         </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-10">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 ml-2">Phone Number</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 000 000 0000" className="w-full bg-black/5 border-none rounded-2xl py-5 px-8 outline-none focus:ring-2 focus:ring-[#d4af37]/20 transition-all font-medium text-lg italic placeholder:text-black/10" />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 ml-2">Gem Preference</label>
                            <select name="preference" value={formData.preference} onChange={handleChange} className="w-full bg-black/5 border-none rounded-2xl py-5 px-8 outline-none focus:ring-2 focus:ring-[#d4af37]/20 transition-all font-medium text-lg italic appearance-none cursor-pointer">
                               <option value="">Select Your Crystal</option>
                               <option value="panna">Panna (Emerald)</option>
                               <option value="moti">Moti (Pearl)</option>
                               <option value="neelam">Neelam (Sapphire)</option>
                               <option value="manik">Manik (Ruby)</option>
                               <option value="pukhraj">Pukhraj (Yellow Sapphire)</option>
                            </select>
                         </div>
                      </div>

                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 ml-2">Your Message</label>
                         <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Describe the energy you wish to cultivate..." className="w-full bg-black/5 border-none rounded-[32px] py-6 px-8 outline-none focus:ring-2 focus:ring-[#d4af37]/20 transition-all font-medium text-lg italic resize-none placeholder:text-black/10" />
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full relative group h-20 bg-black text-white rounded-full overflow-hidden transition-all shadow-2xl hover:shadow-[#d4af37]/20"
                      >
                         <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                         <span className="relative z-10 flex items-center justify-center gap-6 font-black uppercase tracking-[0.5em] text-xs">
                            {isSubmitting ? "Consulting celestial bodies..." : "Get Consultation"}
                            {!isSubmitting && <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform duration-500" />}
                         </span>
                         {/* Shine Effect */}
                         <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[100%] transition-all duration-1000" />
                      </button>
                    </form>
                  )}
               </div>
            </motion.div>
          </div>

          {/* --- QUICK CONTACT BAR --- */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
             {[
               { icon: MessageSquare, title: "WhatsApp Support", value: "+91 98101 59604", color: "hover:bg-green-500/5 hover:text-green-600" },
               { icon: Mail, title: "Official Email", value: "info@gemsratna.com", color: "hover:bg-blue-500/5 hover:text-blue-600" },
               { icon: Phone, title: "Priority Hot-line", value: "+91 141 2345 678", color: "hover:bg-[#d4af37]/5 hover:text-[#d4af37]" }
             ].map((contact, i) => (
                <div key={i} className={`p-10 rounded-[40px] border border-black/5 bg-white transition-all duration-500 group ${contact.color}`}>
                   <div className="mb-6 flex justify-center">
                      <contact.icon size={32} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                   </div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-black/40 mb-2">{contact.title}</h4>
                   <p className="text-2xl font-bold tracking-tighter">{contact.value}</p>
                </div>
             ))}
          </motion.div>
        </section>

        {/* --- LOCATION SECTION --- */}
        <section className="pb-40 px-8">
           <div className="max-w-[1400px] mx-auto relative rounded-[80px] overflow-hidden h-[700px] shadow-[0_60px_120px_rgba(0,0,0,0.1)] group">
              <Image 
                src="https://images.unsplash.com/photo-1590059132205-09d5c41460a1?auto=format&fit=crop&q=80&w=2000" 
                alt="Jaipur Jaipur" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-20 left-12 md:left-24 right-20 flex flex-col md:flex-row justify-between items-end gap-12">
                  <div className="max-w-md bg-white/10 backdrop-blur-3xl p-12 rounded-[50px] border border-white/20 shadow-2xl">
                     <div className="flex items-center gap-4 mb-8">
                        <MapPin className="text-[#d4af37]" size={32} />
                        <h4 className="text-3xl font-heading font-bold text-white tracking-tight italic">Our Sacred Studio</h4>
                     </div>
                     <p className="text-white/60 mb-8 text-xl font-light italic leading-loose">
                        8A, Excellency Trade Square, Govind Marg, <br />
                        Raja Park, Jaipur, Rajasthan, <br />
                        India—302004
                     </p>
                     <div className="flex items-center gap-4 text-gold/80 font-black uppercase tracking-[0.4em] text-[10px]">
                        <Clock size={16} /> Mon - Sat: 10:30 AM - 9:00 PM
                     </div>
                  </div>

                  <a 
                    href="https://share.google/UcBYZ8kXdPXVpuhBt" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-700 hover:scale-110 hover:rotate-12"
                  >
                     <div className="text-center">
                        <MapPin className="text-black mx-auto mb-2" size={36} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-black">Navigate</span>
                     </div>
                  </a>
              </div>
           </div>
        </section>
      </main>
    </>
  );
};

export default ContactPage;
