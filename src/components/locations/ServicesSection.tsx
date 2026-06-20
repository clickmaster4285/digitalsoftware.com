// components/sections/ServicesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';

interface ServicesSectionProps {
  servicesList: { title: string; body: string }[];
}

export const ServicesSection = ({ servicesList }: ServicesSectionProps) => {
  if (!servicesList.length) return null;

  return (
    <section id="services" className="relative bg-[#0a0a0a] text-white py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-10 select-none text-center font-display text-[18vw] leading-none text-white/[0.04]">
        SERVICES
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel number="04" text="Our Services" dark />
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            What We <span className="text-[#FF2E86]">Offer</span>
          </h2>
        </Reveal>
        <div className="mt-14 space-y-6">
          {servicesList.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ x: 8 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 transition-all hover:border-[#FF2E86]/40"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FF2E86]/20 text-[#FF2E86] grid place-items-center text-xl font-bold shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="font-display text-2xl text-[#FF2E86] mb-3">{service.title}</h3>
                  <p className="text-white/70 leading-relaxed">{service.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};