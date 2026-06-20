// components/sections/MarketSection.tsx
'use client';

import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';

interface MarketSectionProps {
  geoParagraphs: string[];
  cityName: string;
  primaryKw?: string;
}

export const MarketSection = ({ geoParagraphs, cityName, primaryKw }: MarketSectionProps) => {
  if (!geoParagraphs.length) return null;

  return (
    <section className="relative bg-white text-gray-900 py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -bottom-10 select-none text-center font-display text-[18vw] leading-none text-gray-900/[0.04]">
        MARKET
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header section - top */}
     <Reveal>
  <div className="flex flex-col mb-12">
    <SectionLabel number="01" text="The Market" />

    <div className="font-display text-5xl">
      {cityName}{" "}
      {primaryKw && (
        <span className="text-5xl text-[#FF2E86]">
          - {primaryKw.charAt(0).toUpperCase() + primaryKw.slice(1)}
        </span>
      )}
    </div>
  </div>
</Reveal>
        
        {/* Content section - bottom */}
        <div className="space-y-8">
          {geoParagraphs.map((para: string, i: number) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className={i === 0 ? "font-display text-3xl leading-tight md:text-4xl" : "text-gray-700 text-lg leading-relaxed"}>
                {i === 0 ? (
                  <>
                    {para.split(".")[0]}.
                    <span className="text-[#FF2E86] block mt-2"> Three commercially distinct requirements.</span>
                  </>
                ) : (
                  para
                )}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};