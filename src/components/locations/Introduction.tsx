// src/components/locations/LocationIntroduction.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface LocationIntroductionProps {
  title: string;
  content: string[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.65, 0, 0.35, 1] as const,
    },
  }),
};

export default function LocationIntroduction({
  title,
  content,
}: LocationIntroductionProps) {
  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Colorful Background Effects */}
      
      {/* Large gradient orbs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FF3D77]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#6C5CE7]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating colorful blobs */}
      <div className="absolute top-[10%] right-[15%] w-32 h-32 bg-[#FFB020]/5 rounded-full blur-2xl pointer-events-none float-a" />
      <div className="absolute bottom-[20%] left-[10%] w-48 h-48 bg-[#FF3D77]/5 rounded-full blur-2xl pointer-events-none float-b" />
      <div className="absolute top-[60%] right-[5%] w-40 h-40 bg-[#6C5CE7]/5 rounded-full blur-2xl pointer-events-none float-c" />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#FF3D77]/2 to-[#6C5CE7]/2 pointer-events-none" />
      
      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none opacity-20" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-border bg-background/80 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D77] animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              About Our Services
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-foreground text-left"
          >
            {title}
            <span className="block text-lg font-sans font-normal text-muted-foreground mt-2">
              What makes us different
            </span>
          </motion.h2>

          {/* Content */}
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            {content.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={fadeUp}
                custom={2 + index}
                className="text-left"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Bottom accent line */}
          <motion.div
            variants={fadeUp}
            custom={2 + content.length}
            className="mt-8 flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-[#FF3D77] via-[#FFB020] to-transparent" />
            <Sparkles className="w-4 h-4 text-[#FF3D77]" />
            <div className="h-px flex-1 bg-gradient-to-l from-[#6C5CE7] via-[#FFB020] to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}