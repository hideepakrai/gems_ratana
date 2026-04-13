"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Page, PageBlock } from "@/lib/store/pages/pageType";
import { normalizeHero } from "@/lib/store/pages/pageHelpers";
import { 
  Sparkles, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Gem, 
  Truck, 
  ShieldCheck, 
  Headphones,
  ArrowRight,
  Menu,
  Search,
  ShoppingBag,
  Lock,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function PageContentRenderer({ page }: { page: Page }) {
  useEffect(() => {
    console.log("Frontend Data:", page);
  }, [page]);

  if (!page.sections || page.sections.length === 0) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center opacity-20">
          <Sparkles size={64} className="mx-auto mb-4" />
          <p className="text-sm font-black uppercase tracking-widest">No Content in this page</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {page.sections.filter(s => s.enabled).map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
}

const SectionRenderer = ({ section }: { section: PageBlock }) => {
  const { type, content } = section;

  switch (type) {
    case "navbar":
      return <NavbarSection content={content} />;
    case "hero":
      return <HeroSection content={content} />;
    case "trustbar":
      return <TrustBarSection content={content} />;
    case "collections":
      return <CollectionsSection content={content} />;
    case "cta":
      return <CTASection content={content} />;
    case "testimonials":
      return <TestimonialsSection content={content} />;
    case "faq":
      return <FAQSection content={content} />;
    case "blog":
      return <BlogSection content={content} />;
    case "usp":
      return <USPSection content={content} />;
    default:
      return null;
  }
};

/* --- Section Components --- */

const NavbarSection = ({ content }: { content: any }) => (
  <header className="fixed top-0 inset-x-0 z-[100] transition-all duration-500 bg-black/20 backdrop-blur-md border-b border-white/5">
    <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {content.logoImage ? (
          <img src={content.logoImage} className="h-8 w-auto invert" alt="Logo" />
        ) : (
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
             <span className="text-xl font-black tracking-tighter text-white uppercase italic">{content.logo || 'GEMS_RATNA'}</span>
          </div>
        )}
      </div>

      <nav className="hidden lg:flex items-center gap-10">
        {(content.links || []).map((link: any) => (
          <Link 
            key={link.id} 
            href={link.href} 
            className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-6">
        <button className="text-white/60 hover:text-white transition-colors"><Search size={20} /></button>
        <button className="text-white/60 hover:text-white transition-colors relative">
          <ShoppingBag size={20} />
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-amber-400 rounded-full text-[8px] font-black text-black flex items-center justify-center">0</span>
        </button>
      </div>
    </div>
  </header>
);

const HeroSection = ({ content }: { content: any }) => {
  const [current, setCurrent] = useState(0);
  const hero = normalizeHero(content);
  const slides = hero.images || [];
  const shouldAutoplay = hero.autoPlay !== false && slides.length > 1;

  useEffect(() => {
    if (shouldAutoplay) {
      const timer = setInterval(() => {
        setCurrent(prev => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
    setCurrent(0);
  }, [slides.length, shouldAutoplay]);

  if (slides.length === 0) return null;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <AnimatePresence mode="wait">
        {slides.map((image: any, idx: number) => idx === current && (
          <motion.div 
            key={`${image}-${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {image ? (
              <div className="absolute inset-0">
                <img src={image} className="w-full h-full object-cover scale-110" alt={hero.imageAlt || hero.title} />
                <div 
                  className="absolute inset-0 bg-black" 
                  style={{ opacity: (hero.overlayOpacity || 40) / 100 }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-transparent" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#151005,_#050505)]" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 w-full z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${slides[current] || "hero"}-${current}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-400 mb-8 block ml-1">Unlock The Power Of Gemstones</span>
             <h1 className="text-6xl md:text-9xl font-bold leading-[0.9] tracking-tighter mb-10 text-white italic">
               {hero.title}
             </h1>
             <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed mb-12 italic">
               {hero.subtitle}
             </p>
             <div className="flex flex-wrap items-center gap-10">
                <Link href={hero.buttonLink || "#"} className="group flex items-center gap-4 text-white">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] group-hover:text-amber-400 transition-colors">{hero.buttonText}</span>
                   <div className="h-px w-10 bg-white/20 group-hover:w-20 group-hover:bg-amber-400 transition-all" />
                </Link>
                
                <Link href="/consult" className="group flex items-center gap-4 text-white">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] group-hover:text-amber-400 transition-colors">Astral Reading</span>
                   <div className="h-px w-10 bg-white/20 group-hover:w-20 group-hover:bg-amber-400 transition-all" />
                </Link>
             </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-10 inset-x-0 z-20 mx-auto max-w-7xl px-10 flex justify-between items-end">
           <div className="flex gap-4">
              {slides.map((_: any, i: number) => (
                <button 
                  key={i} 
                  onClick={() => setCurrent(i)}
                  className={`h-0.5 transition-all duration-500 ${i === current ? 'w-10 bg-white' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
           </div>
           <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
              <span className="text-white">0{current + 1}</span> / 0{slides.length}
           </div>
        </div>
      )}
    </section>
  );
};

const TrustBarSection = ({ content }: { content: any }) => {
  const ICON_MAP: any = {
    Star: Star,
    ShieldCheck: ShieldCheck,
    Truck: Truck,
    Lock: Lock
  };

  return (
    <section className="bg-white py-6 border-b border-neutral-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {(content.items || []).map((item: any) => {
            const IconComp = ICON_MAP[item.icon] || Star;
            return (
              <div key={item.id} className="flex items-center justify-center lg:justify-start gap-3">
                <IconComp size={16} className="text-neutral-300" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black italic">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CollectionsSection = ({ content }: { content: any }) => (
  <section className="py-32 bg-[#faf8f5]">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
       <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-4 mb-4">
             <div className="h-px w-10 bg-neutral-200" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">{content.subtitle || 'Curated Rareness'}</span>
             <div className="h-px w-10 bg-neutral-200" />
          </div>
          <h2 className="text-5xl md:text-8xl font-bold text-[#0a0a0a] italic tracking-tighter leading-tight">{content.title}</h2>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {(content.items || [1,2,3,4,5]).map((item: any, i: number) => (
            <div key={item.id || i} className="group cursor-pointer">
               <div className="aspect-[3/4] bg-neutral-200 rounded-[2.5rem] overflow-hidden mb-8 border border-neutral-100 relative shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-700">
                  {item.image ? (
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-10 bg-neutral-300">
                       <Gem size={80} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">View Ritual <ArrowRight size={14} /></span>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white text-xl font-bold tracking-tight">
                    {item.title || `Gemstone ${i+1}`}
                  </div>
               </div>
            </div>
          ))}
       </div>
    </div>
  </section>
);

const CTASection = ({ content }: { content: any }) => {
  const isAccent = content.theme === 'accent';
  return (
    <section className="py-20 px-6 bg-[#faf8f5]">
      <div className={`mx-auto max-w-6xl rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden ${isAccent ? 'bg-[#0a0a0a] text-white shadow-2xl' : 'bg-white border border-neutral-100 text-black shadow-lg'}`}>
        {content.backgroundImage && (
           <div className="absolute inset-0 opacity-10">
             <img src={content.backgroundImage} className="w-full h-full object-cover" alt="" />
           </div>
        )}
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-6 block">Personal Sovereignty</span>
          <h2 className="text-4xl md:text-7xl font-bold mb-10 italic tracking-tight leading-[1.1]">{content.title}</h2>
          <p className={`text-lg md:text-xl mb-14 opacity-60 leading-relaxed italic max-w-2xl mx-auto`}>{content.subtitle}</p>
          <Link href={content.buttonLink || "#"} className={`px-14 py-6 rounded-full font-black uppercase tracking-widest text-xs transition-all shadow-2xl ${isAccent ? 'bg-amber-400 text-black hover:bg-amber-300 hover:scale-105' : 'bg-black text-white hover:bg-neutral-900 group'}`}>
             <div className="flex items-center gap-3">
               {content.buttonText}
               <ArrowRight size={16} className={isAccent ? '' : 'group-hover:translate-x-2 transition-transform'} />
             </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = ({ content }: { content: any }) => (
  <section className="py-32 bg-[#faf8f5]">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
       <div className="text-center mb-24">
         <span className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400 mb-4 block">The Echoes Of Transformation</span>
         <h2 className="text-5xl font-bold italic tracking-tighter text-[#0a0a0a]">{content.title}</h2>
       </div>
       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(content.items || []).map((item: any) => (
            <div key={item.id} className="bg-white border border-neutral-100 p-12 rounded-[3rem] hover:shadow-2xl transition-all duration-700 group">
               <div className="flex gap-1 mb-8 text-amber-500">
                  {[...Array(item.rating || 5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
               </div>
               <p className="text-xl text-neutral-700 leading-relaxed mb-10 italic">"{item.content}"</p>
               <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-neutral-100 flex items-center justify-center font-bold text-neutral-400 group-hover:bg-[#0a0a0a] group-hover:text-white transition-colors duration-500">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0a0a0a]">{item.name}</h4>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mt-1">{item.role}</p>
                  </div>
               </div>
            </div>
          ))}
       </div>
    </div>
  </section>
);

const FAQSection = ({ content }: { content: any }) => (
  <section className="py-32 bg-white">
    <div className="mx-auto max-w-4xl px-6 lg:px-10">
       <div className="text-center mb-20">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 block mb-4">Gnosis & Understanding</span>
          <h2 className="text-5xl font-bold italic tracking-tighter text-[#0a0a0a]">{content.title}</h2>
       </div>

       <div className="space-y-6">
          {(content.items || []).map((item: any) => (
            <div key={item.id} className="border-b border-neutral-100 pb-8 hover:px-4 transition-all duration-500 cursor-pointer group">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-neutral-800 group-hover:text-amber-600 transition-colors uppercase tracking-tight">{item.question}</h3>
                  <div className="h-10 w-10 rounded-full border border-neutral-100 flex items-center justify-center group-hover:bg-[#0a0a0a] group-hover:text-white transition-all"><ArrowRight size={18} className="group-hover:rotate-45" /></div>
               </div>
               <p className="mt-4 text-neutral-500 leading-relaxed text-sm max-w-2xl">{item.answer}</p>
            </div>
          ))}
       </div>
    </div>
  </section>
);

const BlogSection = ({ content }: { content: any }) => (
  <section className="py-32 bg-[#faf8f5]">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
       <div className="flex items-end justify-between mb-20">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400 mb-4 block italic">The Ritual Journal</span>
            <h2 className="text-6xl font-black italic tracking-tighter text-[#0a0a0a]">{content.title}</h2>
          </div>
          <Link href="/blog" className="text-[10px] font-black uppercase tracking-widest text-[#0a0a0a] border-b border-[#0a0a0a] pb-1 hover:text-amber-600 hover:border-amber-600 transition-colors">Enter The Library</Link>
       </div>
       <div className={`grid gap-12 ${content.layout === 'list' ? 'grid-cols-1' : 'md:grid-cols-3'}`}>
          {[1, 2, 3].slice(0, content.maxPosts).map(i => (
            <div key={i} className={`group ${content.layout === 'list' ? 'flex gap-12 items-center' : ''}`}>
               <div className={`rounded-[3rem] overflow-hidden bg-neutral-200 border border-neutral-100 aspect-[4/5] mb-8 group-hover:shadow-2xl transition-all duration-700 ${content.layout === 'list' ? 'w-1/3 mb-0' : 'w-full'}`}>
                 <div className="w-full h-full flex items-center justify-center opacity-10 bg-neutral-300">
                   <Gem size={100} />
                 </div>
               </div>
               <div className={content.layout === 'list' ? 'flex-1' : ''}>
                 <span className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-600 mb-4 block">Alchemical Insights • 12 MIN READ</span>
                 <h3 className="text-3xl font-black mb-6 group-hover:text-amber-600 transition-colors italic tracking-tighter leading-tight text-[#0a0a0a]">The Sacred Symmetry Of Natural Diamonds</h3>
                 <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed mb-10 italic">Explore the celestial patterns and ancient wisdom encoded within the most resilient element on earth...</p>
                 <Link href="#" className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#0a0a0a] group-hover:text-amber-600 transition-colors underline decoration-1 underline-offset-8">Study The Ritual</Link>
               </div>
            </div>
          ))}
       </div>
    </div>
  </section>
);

const USPSection = ({ content }: { content: any }) => {
  const ICON_MAP: any = {
    Gem: Gem,
    Truck: Truck,
    Shield: ShieldCheck,
    Support: Headphones,
    Star: Star,
    Lock: Lock
  };

  return (
    <section className="py-32 bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
         {content.title && <h2 className="text-5xl font-black italic tracking-tighter text-center mb-24">{content.title}</h2>}
         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {(content.items || []).map((item: any) => {
              const IconComp = ICON_MAP[item.icon] || Gem;
              return (
                <div key={item.id} className="text-center group">
                   <div className="w-24 h-24 mx-auto rounded-[2rem] bg-white/5 flex items-center justify-center mb-10 border border-white/5 group-hover:bg-amber-400 group-hover:text-black transition-all duration-700 transform group-hover:-rotate-12">
                      <IconComp size={40} />
                   </div>
                   <h3 className="text-2xl font-bold mb-6 italic tracking-tight uppercase">{item.title}</h3>
                   <p className="text-white/40 leading-relaxed text-sm max-w-xs mx-auto italic">{item.description}</p>
                </div>
              );
            })}
         </div>
      </div>
    </section>
  );
};
