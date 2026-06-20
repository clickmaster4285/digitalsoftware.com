// components/sections/CaseStudiesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';

interface CaseStudiesSectionProps {
  caseStudies: { title: string; body: string; metric?: string }[];
  cityName: string;
}

export const CaseStudiesSection = ({ caseStudies, cityName }: CaseStudiesSectionProps) => {
  if (!caseStudies.length) return null;

  return (
    <section id="proof" className="relative bg-[#0a0a0a] text-white py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-20 select-none text-center font-display text-[18vw] leading-none text-white/[0.05]">
        PROOF
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel number="06" text="Client Results" dark />
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            {cityName} results
            <span className="block text-[#FF2E86]">in practice.</span>
          </h2>
        </Reveal>
        <div className="mt-14 space-y-4">
          {caseStudies.map((study, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 transition-all hover:border-[#FF2E86]/40 md:grid-cols-[220px_1fr]"
            >
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">[ Case Study ]</div>
                <div className="mt-3 font-display text-5xl text-[#FF2E86]">
                  {study.metric || "100%"}
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/60">
                  {["lead increase", "enquiries", "new patients"][i % 3]}
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl leading-snug mb-3">{study.title}</h3>
                <p className="text-white/70 leading-relaxed">{study.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};