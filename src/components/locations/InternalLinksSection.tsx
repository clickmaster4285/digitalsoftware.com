// components/sections/InternalLinksSection.tsx
'use client';

import { motion } from 'framer-motion';
import { resolveInternalLink } from '@/lib/urlMappings';

interface InternalLinksSectionProps {
  internalLinks: string[];
  serviceName: string;
  cityName: string;
}

export const InternalLinksSection = ({
  internalLinks,
  serviceName,
  cityName,
}: InternalLinksSectionProps) => {
  if (!internalLinks?.length) return null;

  return (
    <footer className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-4 text-sm uppercase tracking-widest text-gray-500">
        [ Related ]
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {internalLinks.map((href: string) => {
          const resolvedHref = resolveInternalLink(href);

          // Get only the last part of the URL
          const slug = resolvedHref.substring(
            resolvedHref.lastIndexOf('/') + 1
          ) || resolvedHref
            .replace(/\/$/, '')
            .substring(
              resolvedHref.replace(/\/$/, '').lastIndexOf('/') + 1
            );

          const displayText = slug
            .replace(/\//g, '')
            .split('-')
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');

          return (
            <motion.a
              key={href}
              href={resolvedHref}
              whileHover={{ x: 8 }}
              className="group flex items-center justify-between rounded-2xl border border-gray-200 p-6 transition-all hover:border-[#FF2E86]/40 hover:shadow-lg hover:shadow-[#FF2E86]/5"
            >
              <span className="font-medium text-gray-700 group-hover:text-gray-900">
                {displayText}
              </span>

              <span className="text-[#FF2E86] transition-transform group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          );
        })}
      </div>

      {/*
      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
        Clickmasters  {serviceName} in {cityName}. All rights reserved.
      </div>
      */}
    </footer>
  );
};