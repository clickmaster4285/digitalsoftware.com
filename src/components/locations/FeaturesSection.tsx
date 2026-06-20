// components/sections/FeaturesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';

interface FeaturesSectionProps {
  features: { title: string; body: string }[];
  cityName: string;
}

export const FeaturesSection = ({ features, cityName }: FeaturesSectionProps) => {
  if (!features.length) return null;

  return (
    <section id="features" className="relative bg-white text-gray-900 py-28 overflow-hidden">
      {/* <div className="pointer-events-none absolute inset-x-0 top-10 select-none text-center font-display text-[18vw] leading-none text-gray-900/[0.05]">
        SERVICES
      </div> */}
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel number="03" text="What We Build" />
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Three architectures
            <span className="block text-[#FF2E86]">— one {cityName} playbook.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-[#FF2E86]/50 hover:shadow-xl hover:shadow-[#FF2E86]/5"
            >
              <div className="mb-5 flex items-start justify-between">
                <span className="font-display text-3xl text-[#FF2E86]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-xs uppercase tracking-widest text-gray-500">Capability</span>
              </div>
              <h3 className="font-display text-2xl leading-snug mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};