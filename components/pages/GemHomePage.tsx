"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  Star,
  User,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Award,
  Truck,
  Lock,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Phone,
  ArrowUpRight,
  Wind,
  Sun,
  Waves,
  Check
} from "lucide-react";
import { Link } from "@/lib/router";

// --- THEME COLORS ---
const COLORS = {
  black: "#020617",
  emerald: "#065f46",
  gold: "#d4af37",
  ruby: "#7f1d1d",
  ivory: "#F8F5F0",
};

// --- DATA ---
const navLinks = [
  { 
    label: "Shop", 
    href: "#shop",
    megaMenu: [
      {
        title: "Collections",
        items: [
          { name: "Imperial Vault", desc: "One-of-a-kind masterpieces" },
          { name: "Best Sellers", desc: "Most favored alignments" },
          { name: "New Arrivals", desc: "Recently unearthed rarities" }
        ]
      },
      {
        title: "Categories",
        items: [
          { name: "Rings", desc: "Primal stone alignments" },
          { name: "Bracelets", desc: "Handcrafted energy bands" },
          { name: "Necklaces", desc: "Aura enhancing pendants" },
          { name: "Raw Stones", desc: "Uncut Earth energy" }
        ]
      }
    ]
  },
  { 
    label: "Elements & Wishes", 
    href: "#elements",
    megaMenu: [
      {
        title: "Element Shop",
        items: [
          { name: "Fire 🔥 (Manik)" },
          { name: "Water 💧 (Moti)" },
          { name: "Earth 🌱 (Panna)" },
          { name: "Air 🌬 (Diamond)" },
          { name: "Space ✨ (Neelam)" }
        ]
      },
      {
        title: "Intention Manifest",
        items: [
          { name: "Love ❤️" },
          { name: "Wealth 💰" },
          { name: "Protection 🛡" },
          { name: "Health 🌿" },
          { name: "Career 🚀" }
        ]
      }
    ]
  },
  { label: "Zodiac", href: "#zodiac", isZodiac: true },
  { 
    label: "Brand", 
    href: "#brand",
    dropdown: [
      { name: "Our Story", desc: "Legacy of authenticity" },
      { name: "Blog", desc: "Insights and wisdom" },
      { name: "Reviews", desc: "Memoirs of patrons" }
    ]
  },
  { label: "Contact", href: "#contact" },
];

const heroSlides = [
  {
    image: "/assets/images/diamond_hero.png",
    smallText: "Unlock the Power of Gemstones",
    heading: "Wear Your Destiny",
    subtext: "Authentic Ratna for Wealth, Health & Success",
  },
  {
    image: "/assets/images/ruby_manik.png",
    smallText: "Sun Energy & Leadership",
    heading: "Majestic Ruby",
    subtext: "Empower Your Soul with the King of Gemstones",
  },
  {
    image: "/assets/images/emerald_panna.png",
    smallText: "Growth & Wisdom",
    heading: "Sacred Emerald",
    subtext: "Harness the Merchant's Stone for Prosperity",
  },
  {
    image: "/assets/images/sapphire_neelam.png",
    smallText: "Justice & Focus",
    heading: "Royal Sapphire",
    subtext: "Experience the Swift Power of Blue Sapphire",
  },
];

const categories = [
  { name: "Moti (Pearl)", benefit: "Peace & Calm", image: "/assets/images/pearl_moti.png" },
  { name: "Panna (Emerald)", benefit: "Growth & Success", image: "/assets/images/emerald_panna.png" },
  { name: "Neelam (Sapphire)", benefit: "Power & Focus", image: "/assets/images/sapphire_neelam.png" },
  { name: "Manik (Ruby)", benefit: "Energy & Confidence", image: "/assets/images/ruby_manik.png" },
  { name: "Pukhraj (Yellow Sapphire)", benefit: "Wealth", image: "/assets/images/yellow_sapphire.png" },
];

const bestSellers = [
  {
    id: 1,
    name: "Natural Blue Sapphire",
    price: "₹45,000",
    rating: 5,
    tag: "HOT",
    image: "/assets/images/sapphire_neelam.png",
  },
  {
    id: 2,
    name: "Rare Burmese Ruby",
    price: "₹82,000",
    rating: 5,
    tag: "NEW",
    image: "/assets/images/ruby_manik.png",
  },
  {
    id: 3,
    name: "Zambian Emerald Ring",
    price: "₹55,000",
    rating: 5,
    tag: "HOT",
    image: "/assets/images/emerald_panna.png",
  },
  {
    id: 4,
    name: "South Sea Pearl",
    price: "₹12,500",
    rating: 4,
    tag: "NEW",
    image: "/assets/images/pearl_moti.png",
  },
];

const spiritualBenefits = [
  { icon: Zap, title: "Energy Healing", desc: "Balance your chakras with natural stone vibrations." },
  { icon: ShieldCheck, title: "Protection", desc: "Shield yourself from negative planetary influences." },
  { icon: Award, title: "Wealth Attraction", desc: "Align your energy with the frequency of abundance." },
  { icon: Heart, title: "Love & Relationships", desc: "Foster harmony and emotional stability in your life." },
];

const testimonials = [
  {
    name: "Rajesh Sharma",
    review: "The quality of the Pukhraj I received is exceptional. I've felt a significant shift in my clarity and focus.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=rajesh",
  },
  {
    name: "Ananya Iyer",
    review: "Stunning design and the gemstone recommendation was spot on. Highly recommend Gems_Ratna!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=ananya",
  },
  {
    name: "Vikram Malhotra",
    review: "Truly luxury experience. The certificate of authenticity gives me peace of mind.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=vikram",
  },
];

// --- COMPONENTS ---

const Background = () => (
  <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
    {/* Base Gradient */}
    <div className="absolute inset-0 bg-[#020617]" />
    {/* Deep Radial Glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#0f172a_0%,_#020617_100%)]" />
    {/* Soft Emerald Glow */}
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald/10 blur-[120px] opacity-40 animate-pulse" />
    {/* Soft Maroon/Ruby Glow */}
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-ruby/10 blur-[120px] opacity-30" />
    {/* Noise Texture */}
    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
  </div>
);

const GlowDivider = () => (
  <div className="relative h-px w-full overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
    <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[2px] w-48 bg-[#d4af37] blur-[6px] opacity-40" />
  </div>
);

const TrustBar = () => (
    <div className="bg-white/95 backdrop-blur-md py-8 border-y border-black/5 relative z-30">
        <div className="max-w-[1800px] mx-auto px-10 md:px-20 flex flex-wrap justify-between items-center gap-10">
            {[
                { icon: Star, text: "4.8/5 Customer Rating", fill: true },
                { icon: ShieldCheck, text: "Certified Natural Gemstones" },
                { icon: Truck, text: "Free Shipping Across India" },
                { icon: Lock, text: "100% Secure Checkout" }
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                    <item.icon className="text-gold group-hover:scale-110 transition-transform duration-500" size={20} fill={item.fill ? "currentColor" : "none"} />
                    <span className="text-[#111827] text-[10px] font-black uppercase tracking-[0.3em]">{item.text}</span>
                </div>
            ))}
        </div>
    </div>
);

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMega, setActiveMega] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const zodiacSigns = [
        { name: "ARIES", icon: Zap }, { name: "TAURUS", icon: ArrowUpRight }, { name: "GEMINI", icon: Wind }, { name: "CANCER", icon: Sun },
        { name: "LEO", icon: Sparkles }, { name: "VIRGO", icon: ShieldCheck }, { name: "LIBRA", icon: Award }, { name: "SCORPIO", icon: Zap },
        { name: "SAGITTARIUS", icon: ArrowRight }, { name: "CAPRICORN", icon: Globe }, { name: "AQUARIUS", icon: Waves }, { name: "PISCES", icon: Waves }
    ];

    return (
        <nav 
            className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 ${
                isScrolled ? "py-4 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm" : "py-8 bg-transparent"
            }`}
        >
            <div className="max-w-[1800px] mx-auto px-10 md:px-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 relative group flex-shrink-0">
                    <Sparkles className="text-gold group-hover:scale-125 transition-transform duration-700" size={28} />
                    <span className={`text-2xl font-heading font-bold tracking-tight uppercase transition-colors ${
                        isScrolled ? "text-[#111827]" : "text-white"
                    }`}>Gems_Ratna</span>
                </Link>

                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <div 
                            key={link.label} 
                            className="relative group h-full py-2"
                            onMouseEnter={() => setActiveMega(link.label)}
                            onMouseLeave={() => setActiveMega(null)}
                        >
                            <Link 
                                href={link.href} 
                                className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 hover:text-gold flex items-center gap-1 ${
                                    isScrolled ? "text-[#111827]" : "text-white"
                                }`}
                            >
                                {link.label}
                            </Link>
                            <div className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-500 group-hover:w-full" />
                            
                            <AnimatePresence>
                                {activeMega === link.label && (link.megaMenu || link.dropdown || link.isZodiac) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                        className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-screen max-w-4xl bg-white/95 backdrop-blur-3xl border border-black/5 p-12 shadow-[0_40px_100px_rgba(0,0,0,0.1)] overflow-hidden rounded-[40px]"
                                    >
                                        {link.isZodiac ? (
                                            <div className="grid grid-cols-3 gap-6">
                                                {zodiacSigns.map((sign) => (
                                                    <Link 
                                                        key={sign.name} 
                                                        href={`#zodiac-${sign.name.toLowerCase()}`}
                                                        className="group/sign relative flex items-center gap-6 p-6 rounded-full border border-black/5 bg-white/50 hover:bg-gold/5 hover:border-gold/20 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] transition-all duration-500 hover:scale-[1.05]"
                                                    >
                                                        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover/sign:bg-gold group-hover/sign:text-black transition-colors">
                                                            <sign.icon size={18} className="text-gold group-hover/sign:text-black" />
                                                        </div>
                                                        <span className="text-[#111827] text-[11px] font-black tracking-[0.3em]">{sign.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="relative z-10 grid grid-cols-3 gap-16">
                                                {link.megaMenu?.map((section) => (
                                                    <div key={section.title}>
                                                        <h4 className="text-gold text-[10px] font-black uppercase tracking-[0.5em] mb-8 border-b border-gold/20 pb-4">{section.title}</h4>
                                                        <ul className="flex flex-col gap-6">
                                                            {section.items.map((item: any) => (
                                                                <li key={item.name} className="group/item">
                                                                    <Link href="#" className="flex flex-col">
                                                                        <span className="text-[#111827] text-lg font-heading group-hover/item:text-gold transition-colors">{item.name}</span>
                                                                        {item.desc && <span className="text-black/40 text-xs mt-1 transition-colors">{item.desc}</span>}
                                                                </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                                {link.dropdown && (
                                                    <div className="col-span-1">
                                                        <h4 className="text-gold text-[10px] font-black uppercase tracking-[0.5em] mb-8 border-b border-gold/20 pb-4">{link.label}</h4>
                                                        <ul className="flex flex-col gap-6">
                                                            {link.dropdown.map((item: any) => (
                                                                <li key={item.name}>
                                                                    <Link href="#" className="flex flex-col">
                                                                        <span className="text-[#111827] text-lg font-heading hover:text-gold transition-colors">{item.name}</span>
                                                                        <span className="text-black/40 text-xs mt-1">{item.desc}</span>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {!link.dropdown && link.megaMenu && (
                                                   <div className="bg-gold/5 p-10 rounded-[40px] border border-gold/10 flex flex-col justify-end">
                                                      <p className="text-gold text-[9px] font-black uppercase tracking-[0.4em] mb-4">Mined In Sri Lanka</p>
                                                      <h5 className="text-2xl font-heading text-[#111827] mb-8">Authentic Origins</h5>
                                                      <button className="bg-[#111827] text-white py-4 px-8 text-[10px] font-black tracking-[0.3em] hover:bg-gold transition-all">Learn Integrity</button>
                                                   </div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-8">
                    <button className={`hover:text-gold transition-colors hidden md:block ${isScrolled ? "text-[#111827]" : "text-white"}`}><Search size={20} /></button>
                    <button className={`hover:text-gold transition-colors relative ${isScrolled ? "text-[#111827]" : "text-white"}`}>
                        <ShoppingCart size={20} />
                        <span className="absolute -top-2 -right-2 bg-gold text-[#111827] text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center">0</span>
                    </button>
                    <button className={`lg:hidden ${isScrolled ? "text-[#111827]" : "text-white"}`}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroSlides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#020617] selection:bg-gold/30">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image 
                        src={heroSlides[current].image} 
                        alt={heroSlides[current].heading} 
                        fill 
                        priority
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_black_120%)]" />
                </motion.div>
            </AnimatePresence>

            <Particles />
            
            {/* Left Vertical Text */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 z-30 hidden xl:block">
                <p className="rotate-[-90deg] origin-left text-white/20 text-[10px] font-black uppercase tracking-[1em] whitespace-nowrap select-none">
                    JUSTICE • FOCUS • AURA • {heroSlides[current].heading.split(" ").pop()}
                </p>
            </div>

            <div className="relative z-20 h-full max-w-[1800px] mx-auto px-10 md:px-20 lg:pl-[80px] flex flex-col justify-center">
                <div className="max-w-[55%] break-words">
                    <motion.div
                        key={`text-${current}`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center gap-6 mb-10 overflow-hidden">
                            <div className="w-12 h-px bg-gold/50 flex-shrink-0" />
                            <p className="text-gold uppercase tracking-[0.8em] text-[11px] font-black truncate">
                                {heroSlides[current].smallText}
                            </p>
                        </motion.div>
                        <h1 className="text-[clamp(2.5rem,8vw,8rem)] font-heading font-medium text-white mb-10 leading-[0.95] tracking-tighter">
                            {heroSlides[current].heading}
                        </h1>
                        <p className="text-lg md:text-2xl text-white/50 font-light italic mb-16 max-w-2xl leading-relaxed">
                            {heroSlides[current].subtext}
                        </p>
                        
                        <div className="flex flex-wrap gap-8 items-center">
                            <button className="group relative bg-gold text-black px-12 py-6 font-black uppercase tracking-[0.4em] text-[10px] overflow-hidden transition-all hover:pr-20">
                                <span className="relative z-10">Discover Aura</span>
                                <ArrowRight className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all font-bold" size={20} />
                            </button>
                            <button className="group flex items-center gap-6 text-white text-[10px] font-black uppercase tracking-[0.5em] px-8 py-6 hover:text-gold transition-all">
                                Astral Reading <div className="w-12 h-px bg-white/20 group-hover:bg-gold group-hover:w-20 transition-all duration-500" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-16 right-16 z-30 flex items-center gap-12">
                <div className="flex gap-4">
                    {heroSlides.map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => setCurrent(i)}
                            className={`h-[2px] transition-all duration-1000 ${current === i ? "w-20 bg-gold" : "w-6 bg-white/20"}`}
                        />
                    ))}
                </div>
                <div className="text-white/20 font-black text-[10px] tracking-[0.5em] uppercase pointer-events-none">
                    0{current + 1} / 0{heroSlides.length}
                </div>
            </div>
        </section>
    );
};

const Particles = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;
  
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37] rounded-full opacity-30 shadow-[0_0_12px_#D4AF37]"
            initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", scale: Math.random() * 0.5 + 0.3 }}
            animate={{ y: [null, Math.random() * 100 + "%"], opacity: [0, 0.4, 0] }}
            transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>
    );
};

const SectionHeader = ({ eyebrow, title, desc, centered = false, dark = true }: any) => (
  <div className={`mb-24 ${centered ? "text-center mx-auto" : "max-w-2xl"}`}>
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`flex items-center gap-4 mb-6 ${centered ? "justify-center" : "justify-start"}`}>
        <div className={`w-12 h-px ${dark ? "bg-gold/40" : "bg-black/10"}`} />
        <p className={`uppercase tracking-[0.6em] text-[10px] font-black ${dark ? "text-gold" : "text-black/40"}`}>{eyebrow}</p>
        <div className={`w-12 h-px ${dark ? "bg-gold/40" : "bg-black/10"} lg:hidden`} />
    </motion.div>
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className={`text-5xl md:text-8xl font-heading font-medium mb-8 leading-[1] tracking-tighter ${dark ? "text-white" : "text-[#111827]"}`}>
      {title}
    </motion.h2>
    {desc && (
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={`text-xl leading-relaxed italic max-w-2xl font-light ${dark ? "text-white/40" : "text-black/50"}`}>
         {desc}
      </motion.p>
    )}
  </div>
);

const CategoryGrid = () => (
  <section className="py-40 relative px-8 md:px-16 bg-[#F8F6F2] overflow-hidden">
    <div className="max-w-[1800px] mx-auto">
        <SectionHeader eyebrow="Curated Rareness" title="Imperial Earth Elements" dark={false} centered />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {categories.map((cat, i) => (
          <motion.div key={cat.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 1 }} className="group">
            <div className="relative aspect-[4/5.5] rounded-[40px] overflow-hidden bg-white shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-black/5 transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)]">
              <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              <div className="absolute inset-x-8 bottom-10">
                <p className="text-gold text-[10px] font-black uppercase tracking-[0.5em] mb-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-700">{cat.benefit}</p>
                <h3 className="text-white font-heading font-medium text-3xl leading-tight border-t border-white/20 pt-4">{cat.name}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const BestSellers = () => (
    <section id="shop" className="py-48 relative px-8 md:px-16 bg-[#F8F6F2]">
        <div className="max-w-[1800px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-12">
                <SectionHeader eyebrow="The Best Sellers" title="The Imperial Collection" dark={false} />
                <Link href="/shop" className="group flex items-center gap-8 text-[#111827] font-black uppercase tracking-[0.6em] text-[11px] mb-8 border-b border-black/10 pb-4 transition-all hover:pr-4 hover:border-gold">
                    All Treasures <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform duration-500" />
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                {bestSellers.map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 1 }} className="group">
                        <div className="relative aspect-[3.5/4.5] rounded-[48px] overflow-hidden bg-white border border-black/5 transition-all duration-1000 group-hover:border-gold/40 group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] group-hover:-translate-y-4">
                            <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[2.5s]" />
                            <div className="absolute top-8 left-8 flex flex-col gap-3">
                                <span className="px-5 py-2 text-[9px] font-black uppercase tracking-[0.4em] bg-white/90 backdrop-blur-xl border border-black/5 text-[#111827] rounded-full w-fit">{item.tag}</span>
                            </div>
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-12">
                                <button className="w-full bg-[#111827] text-white py-5 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-gold hover:text-black transition-all scale-90 group-hover:scale-100 duration-500 shadow-2xl">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                        <div className="pt-10 px-4">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} size={12} className={idx < Math.floor(item.rating) ? "text-gold fill-gold" : "text-black/10"} />
                                ))}
                                <span className="text-[10px] font-bold text-black/30 ml-2">(124 Reviews)</span>
                            </div>
                            <h3 className="text-2xl font-heading font-medium text-[#111827] mb-3 group-hover:text-gold transition-colors">{item.name}</h3>
                            <p className="text-gold font-bold text-xl tracking-[0.1em]">{item.price}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const WhyChooseUs = () => (
    <section className="py-48 px-10 md:px-20 bg-white border-y border-black/5">
        <div className="max-w-[1700px] mx-auto">
            <SectionHeader eyebrow="The Standard" title="Why Gems_Ratna" centered dark={false} />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 -mt-10">
                {[
                    { title: "Certified Authentic", desc: "Every gemstone is authenticated by world-class laboratories ensuring 100% natural origin.", icon: ShieldCheck },
                    { title: "Expert Veda Guidance", desc: "Personalized gemstone recommendations based on deep Vedic astrology research.", icon: Zap },
                    { title: "Insured Global Shipping", desc: "Secured, insured, and tracked shipping to your doorstep, anywhere in the world.", icon: Truck },
                    { title: "Ancestral Quality", desc: "Sourced directly from mines with focus on color, clarity and positive energy vibrations.", icon: Award }
                ].map((item, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 30 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        transition={{ delay: i * 0.1 }}
                        className="group flex flex-col items-center text-center p-10 rounded-[60px] hover:bg-[#F8F6F2] transition-all duration-700"
                    >
                        <div className="w-20 h-20 rounded-[30px] bg-gold/5 flex items-center justify-center mb-10 group-hover:bg-gold transition-all duration-500 group-hover:rotate-[10deg]">
                            <item.icon size={30} className="text-gold group-hover:text-black" />
                        </div>
                        <h4 className="text-2xl font-heading font-medium text-[#111827] mb-6 tracking-tight">{item.title}</h4>
                        <p className="text-black/40 leading-relaxed text-[15px] font-light italic px-4">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const TheExperience = () => (
    <section className="py-48 px-10 md:px-20 bg-white overflow-hidden">
        <div className="max-w-[1700px] mx-auto grid lg:grid-cols-2 gap-32 items-center">
            <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative aspect-[4/5] rounded-[80px] overflow-hidden group">
                <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="h-full w-full"
                >
                    <Image src="/assets/images/gem_macro.png" alt="Macro Gem" fill className="object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-16 left-16">
                    <p className="text-gold text-[10px] font-black uppercase tracking-[0.6em] mb-4">The Standard</p>
                    <h3 className="text-4xl font-heading text-white font-medium italic">Unfiltered Purity</h3>
                </div>
            </motion.div>

            <div className="flex flex-col gap-12">
                <SectionHeader eyebrow="The Gemstone Experience" title="Crafted by Earth, Perfected for You" dark={false} />
                <p className="text-black/60 text-xl font-light leading-relaxed -mt-16 max-w-xl">
                    Every specimen in our vault is an ancient chronicle of time, pressure, and thermal intensity. We honor the primal energy of natural stones, ensuring only the most potent and visually flawless artifacts are certified for our patrons.
                </p>
                <div className="flex flex-wrap gap-8">
                    <button className="bg-[#111827] text-white px-12 py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-gold hover:text-black transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)]">Explore Collection</button>
                    <button className="flex items-center gap-4 text-[#111827] font-black uppercase tracking-[0.4em] text-[10px] px-8 py-6 border border-black/10 rounded-3xl hover:border-gold/50 hover:text-gold transition-all">Book Consultation <ArrowUpRight size={18} /></button>
                </div>
            </div>
        </div>
    </section>
);

const SignatureCollections = () => (
    <section className="py-48 px-10 md:px-20 bg-[#F8F6F2]">
        <div className="max-w-[1800px] mx-auto">
            <SectionHeader eyebrow="The Sovereign Triptych" title="Signature Collections" centered dark={false} />
            <div className="grid lg:grid-cols-3 gap-12 -mt-12">
                {[
                    { title: "Royal Rubies", image: "/assets/images/ruby_manik.png", tag: "Solar Fire" },
                    { title: "Oceanic Sapphires", image: "/assets/images/sapphire_neelam.png", tag: "Deep Vision" },
                    { title: "Divine Emeralds", image: "/assets/images/emerald_panna.png", tag: "Primal Growth" }
                ].map((col, i) => (
                    <motion.div 
                        key={col.title} 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        whileInView={{ opacity: 1, scale: 1 }} 
                        viewport={{ once: true }} 
                        transition={{ delay: i * 0.1 }}
                        className="relative h-[650px] rounded-[60px] overflow-hidden group cursor-pointer"
                    >
                        <Image src={col.image} alt={col.title} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute inset-0 p-16 flex flex-col justify-end">
                            <span className="text-gold text-[10px] font-black uppercase tracking-[0.5em] mb-4">{col.tag}</span>
                            <h3 className="text-4xl font-heading text-white font-medium mb-8 leading-tight">{col.title}</h3>
                            <button className="w-fit text-white text-[9px] font-black uppercase tracking-[0.3em] border-b border-white/30 pb-2 flex items-center gap-4 group-hover:border-gold group-hover:text-gold transition-all">View Assemblage <ArrowRight size={14} /></button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const FeatureSections = () => (
    <section className="py-40 bg-white px-8 md:px-16 flex flex-col gap-32">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-20">
            <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[800px] rounded-[60px] overflow-hidden group">
                <Image src="/assets/images/gem_recommendation.png" alt="Rec" fill className="object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 p-20 flex flex-col justify-end">
                    <p className="text-gold text-[11px] font-black uppercase tracking-[0.7em] mb-6">Astral Alignment</p>
                    <h3 className="text-6xl font-heading font-medium text-white mb-10 leading-tight">The Personal Oracle</h3>
                    <button className="flex items-center gap-6 text-white font-black uppercase tracking-[0.5em] text-[11px] border border-white/30 px-10 py-5 w-fit hover:bg-white hover:text-black transition-all">Begin Analysis <ArrowRight size={20} /></button>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[800px] rounded-[60px] overflow-hidden group">
                <Image src="/assets/images/energy_stones.png" alt="Energy" fill className="object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 p-20 flex flex-col justify-end items-end text-right">
                    <p className="text-gold text-[11px] font-black uppercase tracking-[0.7em] mb-6">Stone Chronicles</p>
                    <h3 className="text-6xl font-heading font-medium text-white mb-10 leading-tight text-right">Primordial Relics</h3>
                    <button className="flex items-center gap-6 text-white font-black uppercase tracking-[0.5em] text-[11px] border border-white/30 px-10 py-5 w-fit hover:bg-white hover:text-black transition-all">Explore Gems <ArrowRight size={20} /></button>
                </div>
            </motion.div>
        </div>
    </section>
);

const SpiritualBenefits = () => (
    <section className="py-60 relative bg-[#020617] px-8 md:px-16 overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeader eyebrow="Ancient Alchemy" title="The Soul Transmutation" centered dark={true} />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-24">
                {spiritualBenefits.map((item, i) => (
                    <motion.div key={item.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-10 border border-white/10 group-hover:border-gold/50 transition-all duration-700">
                            <item.icon className="text-gold" size={32} />
                        </div>
                        <h4 className="text-2xl font-heading font-medium text-white mb-6 italic">{item.title}</h4>
                        <p className="text-white/40 leading-relaxed font-light">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const Testimonials = () => (
    <section className="py-48 bg-[#F8F6F2] px-8 md:px-16">
        <div className="max-w-[1600px] mx-auto">
            <SectionHeader eyebrow="Noble Appraisals" title="The Memoirs" centered dark={false} />
            <div className="grid lg:grid-cols-3 gap-16">
                {testimonials.map((t, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white border border-black/5 p-16 rounded-[60px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] group transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)]">
                        <p className="text-[#111827]/60 text-xl leading-relaxed italic mb-12">「{t.review}」</p>
                        <div className="flex items-center gap-6">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-black/5">
                                <Image src={t.image} alt={t.name} fill className="object-cover" />
                            </div>
                            <div>
                                <h5 className="text-[#111827] text-xl font-bold">{t.name}</h5>
                                <p className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">Patrón</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const CallToAction = () => (
    <section className="py-60 px-8 md:px-16 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto shadow-[0_80px_160px_rgba(0,0,0,0.4)] rounded-[120px] border border-white/10 bg-[#020617] py-48 text-center relative z-10">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[120px]">
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-gold/10 blur-[100px] rounded-full"
                />
            </div>
            <p className="text-gold uppercase tracking-[1em] text-[11px] font-black mb-12 relative z-10">Sovereign Protocol</p>
            <h2 className="text-6xl md:text-[9rem] font-heading font-medium text-white mb-16 tracking-tighter leading-none relative z-10">Claim Your Destiny</h2>
            <div className="flex flex-col items-center gap-10 relative z-10">
                <div className="relative group p-1 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(212,175,55,0.4)] transition-transform hover:scale-105">
                    <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-tr from-gold via-transparent to-gold opacity-50" />
                    <button className="relative z-10 bg-gold text-black px-24 py-8 font-black uppercase tracking-[0.5em] text-xs hover:bg-white transition-all rounded-2xl">
                        Request Orientation
                    </button>
                </div>
                <button className="text-white/40 text-[10px] uppercase font-black tracking-[0.4em] hover:text-gold transition-colors pb-2 border-b border-white/5 hover:border-gold">Speak to an Expert</button>
                <div className="flex items-center gap-4 text-white/20 text-[9px] font-black tracking-[0.3em] uppercase mt-4">
                    <Check size={14} className="text-gold" /> Trusted by 10,000+ Patrons
                </div>
            </div>
        </div>
    </section>
);

const Newsletter = () => (
    <section className="py-48 px-10 md:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gold/5 blur-[120px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
            <SectionHeader eyebrow="The Elite Circle" title="Enter the Inner Circle of Rare Gem Collectors" centered dark={true} />
            <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.5em] mb-20 -mt-16 max-w-2xl mx-auto border-b border-white/5 pb-8">
                No spam. Only rare gemstone insights and sacred collection previews.
            </p>
            
            <form className="max-w-2xl mx-auto flex flex-col md:flex-row gap-8">
                <div className="relative flex-grow group">
                    <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold group-focus-within:scale-110 transition-all" size={20} />
                    <input 
                        type="email" 
                        placeholder="AUTHENTIC EMAIL ADDRESS" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-10 py-7 text-white text-[11px] font-black tracking-[0.3em] focus:outline-none focus:border-gold focus:bg-gold/5 transition-all"
                    />
                </div>
                <button className="bg-gold text-black px-16 py-7 rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] hover:bg-white transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] flex-shrink-0 active:scale-95">
                    Enlist Now
                </button>
            </form>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-gradient-to-t from-[#020617] to-[#0a1122] pt-48 pb-20 px-10 md:px-20 relative selection:bg-gold/30">
        <div className="max-w-[1700px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-24 mb-32">
                <div className="lg:col-span-5">
                    <Link href="/" className="inline-flex items-center gap-4 mb-12 group">
                        <Sparkles className="text-gold group-hover:scale-125 transition-all duration-700" size={36} />
                        <span className="text-4xl font-heading font-bold text-white tracking-tight">Gems_Ratna</span>
                    </Link>
                    <p className="text-white/40 text-xl font-light leading-relaxed max-w-md italic mb-12">
                        Purveyors of the Earth&apos;s most profound vibrational specimens. Our gems are meticulously sourced and rituals-prepared to align with your cosmic path.
                    </p>
                    <div className="flex gap-8">
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <Link key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500">
                                <Icon size={20} />
                            </Link>
                        ))}
                    </div>
                </div>
                
                <div className="lg:col-span-2">
                    <h4 className="text-white uppercase tracking-[0.6em] text-[11px] font-black mb-10 border-b border-white/5 pb-4">EXPLORE</h4>
                    <ul className="flex flex-col gap-6">
                        {['All Treasures', 'Zodiac Guide', 'The Elements', 'Brand Story'].map(item => (
                            <li key={item}><Link href="#" className="text-white/30 hover:text-gold transition-all text-[14px] font-light hover:pl-2">{item}</Link></li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-2">
                    <h4 className="text-white uppercase tracking-[0.6em] text-[11px] font-black mb-10 border-b border-white/5 pb-4">COLLECTIONS</h4>
                    <ul className="flex flex-col gap-6">
                        {['Imperial Vault', 'Royal Rubies', 'Divine Emeralds', 'Oceanic Sapphires'].map(item => (
                            <li key={item}><Link href="#" className="text-white/30 hover:text-gold transition-all text-[14px] font-light hover:pl-2">{item}</Link></li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-3">
                    <h4 className="text-white uppercase tracking-[0.6em] text-[11px] font-black mb-10 border-b border-white/5 pb-4">CLIENT SERVICES</h4>
                    <ul className="flex flex-col gap-8 mb-12">
                        <li className="flex items-start gap-4">
                            <Phone className="text-gold shrink-0 transition-transform hover:rotate-12" size={18} />
                            <div className="flex flex-col gap-1">
                                <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">Client Concierge</p>
                                <p className="text-white/70 text-lg font-heading">+91 98765 43210</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <Mail className="text-gold shrink-0 transition-transform hover:rotate-[-12deg]" size={18} />
                            <div className="flex flex-col gap-1">
                                <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">Global Inquiries</p>
                                <p className="text-white/70 text-lg font-heading">concierge@gemsratna.com</p>
                            </div>
                        </li>
                    </ul>
                    <div className="relative group">
                       <input 
                            type="email" 
                            placeholder="JOIN THE LIST" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-[9px] font-black tracking-[0.5em] focus:outline-none focus:border-gold/30 transition-all mb-4"
                        />
                       <button className="absolute right-4 top-4 text-gold hover:text-white transition-colors"><ArrowRight size={16}/></button>
                    </div>
                </div>
            </div>
            
            <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.8em]">© 2026 Imperial Dynasty. Certifying the Unseen.</p>
                <div className="flex gap-12">
                   {['Privacy Protocol', 'Authenticity Terms'].map(l => (
                     <Link key={l} href="#" className="text-white/10 text-[10px] uppercase tracking-[0.4em] hover:text-white transition-all">{l}</Link>
                   ))}
                </div>
            </div>
        </div>
    </footer>
);

export default function GemHomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return (
    <div className="h-screen bg-[#020617] flex items-center justify-center">
        <Sparkles className="text-gold animate-spin" size={60} />
    </div>
  );

  return (
    <main className="text-white min-h-screen selection:bg-gold/30 font-sans bg-[#020617]">
      <Navbar />
      <HeroSlider />
      <TrustBar />
      <CategoryGrid />
      <WhyChooseUs />
      <BestSellers />
      <TheExperience />
      <SignatureCollections />
      <SpiritualBenefits />
      <Testimonials />
      <CallToAction />
      <Newsletter />
      <Footer />
    </main>
  );
}
