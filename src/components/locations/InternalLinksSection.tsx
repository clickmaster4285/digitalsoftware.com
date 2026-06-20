// components/sections/InternalLinksSection.tsx
'use client';

import { motion } from 'framer-motion';

interface InternalLinksSectionProps {
  internalLinks: string[];
  serviceName: string;
  cityName: string;
}

export const InternalLinksSection = ({ internalLinks, serviceName, cityName }: InternalLinksSectionProps) => {
  if (!internalLinks?.length) return null;

  return (
    <footer className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-4 text-sm uppercase tracking-widest text-gray-500">[ Related ]</div>
      <div className="grid gap-3 md:grid-cols-2">
        {internalLinks.map((href: string) => {
          let displayText = href
            .replace(/^\//, '')
            .replace(/\/$/, '')
            .replace(/-/g, ' ');
          displayText = displayText
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          return (
            <motion.a
              key={href}
              href={href}
              whileHover={{ x: 8 }}
              className="group flex items-center justify-between rounded-2xl border border-gray-200 p-6 transition-all hover:border-[#FF2E86]/40 hover:shadow-lg hover:shadow-[#FF2E86]/5"
            >
              <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                {displayText}
              </span>
              <span className="text-[#FF2E86] group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
          );
        })}
      </div>
      {/* <div className="mt-12 border-t border-gray-200 pt-6 text-xs text-gray-500 text-center">
        Clickmasters — {serviceName} in {cityName}. All rights reserved.
      </div> */}
    </footer>
  );
};