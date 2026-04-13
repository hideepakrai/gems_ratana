"use client";

import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Gem,
  HeartHandshake,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import GetAllPages from "../../lib/GetAllDetails/GetAllPages";
import { AnnotatorPlugin } from "../annotationPlugin/AnnotatorPlugin";

const stats = [
  { value: "12+", label: "Years of Trusted Guidance" },
  { value: "8k+", label: "Seekers Assisted" },
  { value: "150+", label: "Certified Gem Selections" },
  { value: "24/7", label: "Consultation Support" },
];

const values = [
  {
    icon: Gem,
    title: "Natural Authenticity",
    desc: "We focus on carefully selected gemstones chosen for clarity, origin, and energetic significance.",
  },
  {
    icon: BadgeCheck,
    title: "Certified Confidence",
    desc: "Each recommendation is backed by quality checks and a commitment to genuine, trustworthy stones.",
  },
  {
    icon: HeartHandshake,
    title: "Guidance With Care",
    desc: "We help each customer choose gemstones with patience, clarity, and respect for personal belief.",
  },
  {
    icon: Sparkles,
    title: "Purposeful Selection",
    desc: "From astrology-led choices to personal intentions, every stone is matched with meaning and purpose.",
  },
];

const process = [
  {
    step: "01",
    title: "Understand Your Need",
    desc: "We begin with your goal, zodiac guidance, preference, and the kind of support you are seeking.",
  },
  {
    step: "02",
    title: "Select the Right Gem",
    desc: "Our team narrows down suitable gemstones based on authenticity, quality, budget, and intended use.",
  },
  {
    step: "03",
    title: "Verify & Prepare",
    desc: "We review stone quality, provide clear details, and prepare recommendations with care and transparency.",
  },
  {
    step: "04",
    title: "Deliver & Support",
    desc: "From secure delivery to follow-up support, we stay available after the purchase as well.",
  },
];

const assurances = [
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Secure doorstep shipping with careful packaging for gemstones and spiritual products.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    desc: "Protected payments and trusted systems to keep every order smooth and safe.",
  },
  {
    icon: RefreshCcw,
    title: "Honest Support",
    desc: "Questions after purchase? We stay available to help with usage, care, and confidence.",
  },
  {
    icon: Gem,
    title: "Meaningful Recommendations",
    desc: "Every suggestion is made to match your needs, not just to push a product.",
  },
];

export default function AboutGemPage() {
  const { gemsratnaUser } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {gemsratnaUser?.role === "admin" && <AnnotatorPlugin />}
      <GetAllPages />

      <div
        data-annotate-id="about-page-root"
        className="bg-background text-foreground"
      >
        <section
          data-annotate-id="about-hero-section"
          className="relative overflow-hidden border-b border-border bg-[#0f1f17] text-white"
        >
          <div className="absolute inset-0">
            <img
              src="/assets/images/diamond_hero.png"
              alt="GemsRatna gemstone hero"
              className="h-full w-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30" />
          </div>

          <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-[5%] py-24 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 text-[12px] font-black uppercase tracking-[4px] text-secondary"
              >
                About GemsRatna
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="max-w-[780px] font-heading text-[30px] font-bold leading-[0.95] tracking-tight sm:text-[40px] lg:text-[50px]"
              >
                Gemstones that bring
                <br />
                clarity, purpose, and
                <br />
                confidence to your journey.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="mt-6 max-w-[620px] text-[16px] font-semibold leading-8 text-white/80 sm:text-[18px]"
              >
                Since 2012, GemsRatna has been helping customers discover
                authentic gemstones with trusted guidance, clear recommendations,
                and a deep respect for spiritual and astrological intent.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <a
                  href="/shop"
                  className="inline-flex h-12 items-center rounded-full bg-secondary px-6 text-[13px] font-black uppercase tracking-[2px] text-black transition hover:opacity-90"
                >
                  Explore Gemstones
                </a>
                <a
                  href="/contact"
                  className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-[13px] font-black uppercase tracking-[2px] text-white transition hover:bg-white/10"
                >
                  Contact Us
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.18 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <div className="overflow-hidden rounded-[26px] border border-white/10 bg-white/10 backdrop-blur-md">
                <img
                  src="/assets/images/emerald_panna.png"
                  alt="Emerald gemstone"
                  className="h-[240px] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[26px] border border-white/10 bg-white/10 backdrop-blur-md sm:translate-y-10">
                <img
                  src="/assets/images/ruby_manik.png"
                  alt="Ruby gemstone"
                  className="h-[240px] w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section
          data-annotate-id="about-stats-section"
          className="border-b border-border bg-surface px-[5%] py-8"
        >
          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-2xl border border-border bg-background px-6 py-6 text-center"
              >
                <div className="text-[34px] font-bold tracking-tight text-foreground">
                  {item.value}
                </div>
                <div className="mt-2 text-[13px] font-black uppercase tracking-[2px] text-muted">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          data-annotate-id="about-story-section"
          className="mx-auto max-w-7xl px-[5%] py-24"
        >
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-[28px] border border-border shadow-xl"
            >
              <img
                src="/assets/images/gem_recommendation.png"
                alt="Gem consultation"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-3 text-[12px] font-black uppercase tracking-[3px] text-secondary">
                Our Story
              </p>
              <h2 className="max-w-[700px] text-[34px] font-bold leading-tight tracking-tight sm:text-[42px]">
                Built around trust, guidance, and authentic gemstones.
              </h2>

              <p className="mt-6 text-[16px] font-semibold leading-8 text-muted">
                GemsRatna started with a simple belief: gemstone buying should
                feel honest, informed, and deeply personal. Too often, people
                are left confused by unclear claims and overwhelming choices. We
                wanted to make that journey clearer.
              </p>

              <p className="mt-5 text-[16px] font-semibold leading-8 text-muted">
                Today, we guide customers through gemstones for wealth,
                protection, healing, confidence, relationships, and spiritual
                balance while staying focused on authenticity, transparency, and
                long-term trust.
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  "Natural and carefully selected gemstones",
                  "Transparent guidance before purchase",
                  "Recommendations aligned with real intent",
                  "Reliable post-purchase support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 font-bold text-foreground/90"
                  >
                    <CheckCircle2 className="text-secondary" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section
          data-annotate-id="about-values-section"
          className="border-y border-border bg-surface/50 px-[5%] py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <p className="mb-3 text-[12px] font-black uppercase tracking-[3px] text-secondary">
                What Defines Us
              </p>
              <h2 className="text-[34px] font-bold tracking-tight sm:text-[42px]">
                The GemsRatna difference
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-[16px] font-semibold leading-8 text-muted">
                We guide with intention, select with care, and support every
                order with the same seriousness we bring to gemstone quality.
              </p>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
              {values.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-[22px] border border-border bg-background p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
                    <item.icon className="text-secondary" size={26} />
                  </div>
                  <h3 className="text-[18px] font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] font-semibold leading-7 text-muted">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          data-annotate-id="about-process-section"
          className="mx-auto max-w-7xl px-[5%] py-24"
        >
          <div className="mb-14 max-w-3xl">
            <p className="mb-3 text-[12px] font-black uppercase tracking-[3px] text-secondary">
              Our Process
            </p>
            <h2 className="text-[34px] font-bold tracking-tight sm:text-[42px]">
              How we turn your need into the right recommendation
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {process.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="rounded-[22px] border border-border bg-surface p-7"
              >
                <div className="text-[12px] font-black uppercase tracking-[3px] text-secondary">
                  Step {item.step}
                </div>
                <h3 className="mt-4 text-[22px] font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] font-semibold leading-7 text-muted">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          data-annotate-id="about-materials-section"
          className="border-y border-border bg-[#f7f4ef] px-[5%] py-24"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-5 sm:grid-cols-2"
            >
              <div className="overflow-hidden rounded-[24px] border border-[#e4ddd3] shadow-lg sm:translate-y-8">
                <img
                  src="/assets/images/pearl_moti.png"
                  alt="Pearl gemstone"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[24px] border border-[#e4ddd3] shadow-lg">
                <img
                  src="/assets/images/sapphire_neelam.png"
                  alt="Blue sapphire gemstone"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-3 text-[12px] font-black uppercase tracking-[3px] text-secondary">
                Design Philosophy
              </p>
              <h2 className="text-[34px] font-bold tracking-tight sm:text-[42px]">
                Clarity, authenticity, and intention balanced with purpose.
              </h2>
              <p className="mt-6 text-[16px] font-semibold leading-8 text-[#665f58]">
                From gemstone quality and origin to energetic relevance and
                daily wearability, every recommendation is made to feel both
                meaningful and trustworthy.
              </p>
              <p className="mt-5 text-[16px] font-semibold leading-8 text-[#665f58]">
                We do not chase trends or confusion. We focus on genuine stones,
                practical guidance, and a calm buying experience that helps you
                choose with confidence.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Natural gemstone quality",
                  "Guided consultation",
                  "Authenticity-first sourcing",
                  "Purpose-led recommendations",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex rounded-full border border-[#ddd5ca] bg-white px-4 py-2 text-[13px] font-bold text-[#4c443d]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section
          data-annotate-id="about-assurances-section"
          className="mx-auto max-w-7xl px-[5%] py-24"
        >
          <div className="mb-14 text-center">
            <p className="mb-3 text-[12px] font-black uppercase tracking-[3px] text-secondary">
              Why Choose Us
            </p>
            <h2 className="text-[34px] font-bold tracking-tight sm:text-[42px]">
              Confidence in every order
            </h2>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
            {assurances.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-[22px] border border-border bg-surface p-7 text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
                  <item.icon className="text-secondary" size={26} />
                </div>
                <h3 className="text-[18px] font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] font-semibold leading-7 text-muted">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section data-annotate-id="about-cta-section" className="px-[5%] pb-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-primary px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="mb-3 text-[12px] font-black uppercase tracking-[3px] text-secondary">
                  Visit GemsRatna
                </p>
                <h2 className="max-w-3xl text-[34px] font-bold leading-tight tracking-tight sm:text-[44px]">
                  Discover gemstones chosen to support your path with confidence.
                </h2>
                <p className="mt-5 max-w-2xl text-[16px] font-semibold leading-8 text-white/80">
                  Explore our gemstone collection, ask for guidance, and find a
                  recommendation that truly fits your needs and intention.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/shop"
                  className="inline-flex h-12 items-center rounded-full bg-secondary px-6 text-[13px] font-black uppercase tracking-[2px] text-black transition hover:opacity-90"
                >
                  Shop Now
                </a>
                <a
                  href="/contact"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-[13px] font-black uppercase tracking-[2px] text-white transition hover:bg-white/10"
                >
                  Speak to Us <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
