// components/sections/CtaSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Phone } from 'lucide-react';
import { Reveal } from './Reveal';

interface CtaSectionProps {
  cta: string;
  ctaBody: string;
}

export const CtaSection = ({ cta, ctaBody }: CtaSectionProps) => {
  return (
    <section id="cta" className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display text-[20vw] leading-none text-white/[0.05]">
        READY
      </div>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20 bg-[#FF2E86]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <div className="mb-4 text-sm uppercase tracking-widest text-white/60">[ Ready When You Are ]</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl leading-tight md:text-6xl font-bold tracking-tight">
            {cta}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-white/70 text-lg">
            {ctaBody ? ctaBody.split('\n').slice(0, 3).join(' ') : 'Free audit — 48 hours. Get your comprehensive website analysis today.'}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-gray-900 shadow-xl shadow-white/20 hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Get Started <ArrowUpRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="tel:+18885552542"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white hover:border-white/60 hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" /> +1-888-555-CLICK
            </motion.a>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-12 flex justify-center gap-8 text-sm text-white/40">
            <span className="flex items-center gap-2"><Check className="w-4 h-4" /> No obligation</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4" /> 48hr turnaround</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Expert analysis</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};