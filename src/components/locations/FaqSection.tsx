// components/sections/FaqSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';

interface FaqSectionProps {
  faqs: { question: string; answer: string }[];
  title: string;
}

export const FaqSection = ({ faqs, title }: FaqSectionProps) => {
  if (!faqs.length) return null;

  return (
    <section id="faq" className="relative bg-white text-gray-900 py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display text-[18vw] leading-none text-gray-900/[0.04]">
        QUESTIONS
      </div>
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionLabel number="07" text="FAQs" />
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            {title}
          </h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-gray-200 bg-white shadow-sm open:border-[#FF2E86] open:shadow-lg open:shadow-[#FF2E86]/5 transition-all"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-6 p-6 md:p-7">
                <span className="font-display text-lg md:text-xl pr-4">{faq.question}</span>
                <span className="shrink-0 w-8 h-8 rounded-full border-2 border-gray-300 grid place-items-center text-xl group-open:rotate-45 group-open:border-[#FF2E86] group-open:text-[#FF2E86] transition-all">
                  +
                </span>
              </summary>
              <div className="px-6 md:px-7 pb-7 -mt-1 text-gray-600 leading-relaxed max-w-3xl">
                {faq.answer}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
};