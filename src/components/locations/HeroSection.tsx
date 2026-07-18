// components/sections/HeroSection.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface HeroSectionProps {
  location: any;
  serviceName: string;
  cityName: string;
}

export const HeroSection = ({ location, serviceName, cityName }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Get the title text from location or construct it
  const titleText = location.h1 || `${serviceName} ${cityName}`;

  // Function to highlight service name and city name in the title
  const highlightTitle = (text: string) => {
    // Create a regex that matches either the service name or city name (case-insensitive)
    const parts = text.split(new RegExp(`(${serviceName}|${cityName})`, 'gi'));
    
    return parts.map((part, index) => {
      // Check if this part matches the service name or city name (case-insensitive)
      if (part.toLowerCase() === serviceName.toLowerCase() || 
          part.toLowerCase() === cityName.toLowerCase()) {
        return <span key={index} className="text-[#FF2E86]">{part}</span>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <header ref={heroRef} className="relative overflow-hidden bg-[#0a0a0a] text-white pt-32 pb-20">
      <motion.div
        aria-hidden
        style={{ scale: heroScale }}
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y: heroY }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[180px] opacity-30"
      >
        <div className="w-full h-full rounded-full bg-[#FF2E86]" />
      </motion.div>

      <motion.div style={{ opacity: heroOpacity }} className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-10 flex items-center gap-3 text-sm uppercase tracking-widest text-white/60">
            <span className="bg-white/10 px-4 py-1.5 rounded-full text-white/80 font-medium">[ Service ]</span>
            <span className="h-px w-12 bg-white/30" />
            <span>{serviceName} · {cityName}</span>
          </div>
        </Reveal>
        
        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl leading-[1.02] md:text-8xl font-bold tracking-tight">
            <span className="block overflow-hidden">
              <span className="block">
                {highlightTitle(titleText)}
              </span>
            </span>
          </h1>
        </Reveal>
        
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-xl text-white/70 leading-relaxed">
            { location.des|| location.meta}
          </p>
        </Reveal>
        
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap gap-3">
            <motion.a
              href="#cta"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-gray-900 shadow-xl shadow-white/20 hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Free {cityName} Audit <ArrowUpRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white hover:border-white/60 transition-colors"
            >
              See What We Build
            </motion.a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            <div>
              <p className="font-display text-3xl md:text-5xl">12K+</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mt-2">Pages Optimized</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-5xl">45%</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mt-2">CTR Lift</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-5xl">340%</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mt-2">Lead Increase</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-5xl">{location.wordCount || 0}+</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mt-2">Words Per Page</p>
            </div>
          </div>
        </Reveal>
      </motion.div>
    </header>
  );
};