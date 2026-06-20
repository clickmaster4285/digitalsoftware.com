// components/sections/PricingSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';

interface PricingSectionProps {
  pricingList: { title: string; description: string }[];
  pricingText: string;
}

export const PricingSection = ({ pricingList, pricingText }: PricingSectionProps) => {
  if (!pricingList.length) return null;

  // Separate the first 3 items from the rest
  const topPlans = pricingList.slice(0, 3);
  const bottomPlans = pricingList.slice(3);

  return (
    <section id="pricing" className="relative bg-white text-gray-900 py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-10 select-none text-center font-display text-[18vw] leading-none text-gray-900/[0.05]">
        PRICING
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel number="05" text="Investment Guide" />
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Pricing <span className="text-[#FF2E86]">Plans</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {pricingText.split('\n').find((line: string) => line.includes('All:')) || 'Flexible pricing to match your business needs.'}
          </p>
        </Reveal>
        
        {/* Top 3 plans - 3 column grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {topPlans.map((plan, i) => {
            const isEnterprise = plan.title.toLowerCase().includes('enterprise');
            const isMulti = plan.title.toLowerCase().includes('multi');
            const isPopular = i === 1;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative rounded-2xl p-8 transition-all ${
                  isPopular 
                    ? 'bg-gradient-to-br from-[#FF2E86] to-[#e11d48] text-white shadow-2xl shadow-[#FF2E86]/30 border-0' 
                    : 'bg-white border-2 border-gray-200 hover:border-[#FF2E86]/50 shadow-lg'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-4">
                  <span className={`text-xs uppercase tracking-widest ${isPopular ? 'text-white/80' : 'text-gray-500'}`}>
                    {isEnterprise ? 'Enterprise' : isMulti ? 'Multi-Channel' : 'Starter'}
                  </span>
                  <h3 className={`font-display text-2xl mt-2 ${isPopular ? 'text-white' : ''}`}>{plan.title}</h3>
                </div>
                
                <p className={`leading-relaxed ${isPopular ? 'text-white/90' : 'text-gray-700'}`}>
                  {plan.description}
                </p>
                
                {(isEnterprise || isMulti) && (
                  <div className={`mt-6 pt-6 border-t ${isPopular ? 'border-white/20' : 'border-gray-200'}`}>
                    <div className="space-y-2">
                      {isEnterprise ? (
                        <>
                          <div className="flex items-center gap-2 text-sm">
                            <Check className={`w-4 h-4 ${isPopular ? 'text-white' : 'text-[#FF2E86]'}`} />
                            <span className={isPopular ? 'text-white/80' : 'text-gray-600'}>Dedicated account manager</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Check className={`w-4 h-4 ${isPopular ? 'text-white' : 'text-[#FF2E86]'}`} />
                            <span className={isPopular ? 'text-white/80' : 'text-gray-600'}>Custom strategy development</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Check className={`w-4 h-4 ${isPopular ? 'text-white' : 'text-[#FF2E86]'}`} />
                            <span className={isPopular ? 'text-white/80' : 'text-gray-600'}>Priority support & reporting</span>
                          </div>
                        </>
                      ) : isMulti ? (
                        <>
                          <div className="flex items-center gap-2 text-sm">
                            <Check className={`w-4 h-4 ${isPopular ? 'text-white' : 'text-[#FF2E86]'}`} />
                            <span className={isPopular ? 'text-white/80' : 'text-gray-600'}>Multi-channel campaign management</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Check className={`w-4 h-4 ${isPopular ? 'text-white' : 'text-[#FF2E86]'}`} />
                            <span className={isPopular ? 'text-white/80' : 'text-gray-600'}>Cross-platform analytics</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Check className={`w-4 h-4 ${isPopular ? 'text-white' : 'text-[#FF2E86]'}`} />
                            <span className={isPopular ? 'text-white/80' : 'text-gray-600'}>Unified reporting dashboard</span>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}
                
                <motion.a
                  href="#cta"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                    isPopular 
                      ? 'bg-white text-[#FF2E86] hover:bg-gray-100' 
                      : 'bg-gray-900 text-white hover:bg-[#FF2E86]'
                  }`}
                >
                  Get Started <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom plans - full width or half width */}
        {bottomPlans.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {bottomPlans.map((plan, i) => {
              const isEnterprise = plan.title.toLowerCase().includes('enterprise');
              const isMulti = plan.title.toLowerCase().includes('multi');
              const isPopular = false; // No popular badge for bottom items
              const totalBottom = bottomPlans.length;
              // If there's only one bottom plan, make it full width
              const colSpan = totalBottom === 1 ? 'md:col-span-2' : '';
              
              return (
                <motion.div
                  key={i + 3} // Offset key to avoid conflicts
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`${colSpan} relative rounded-2xl p-8 transition-all bg-white border-2 border-gray-200 hover:border-[#FF2E86]/50 shadow-lg`}
                >
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-widest text-gray-500">
                      {isEnterprise ? 'Enterprise' : isMulti ? 'Multi-Channel' : 'Plan'}
                    </span>
                    <h3 className="font-display text-2xl mt-2">{plan.title}</h3>
                  </div>
                  
                  <p className="leading-relaxed text-gray-700">
                    {plan.description}
                  </p>
                  
                  <motion.a
                    href="#cta"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-[#FF2E86]"
                  >
                    Get Started <ArrowUpRight className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};