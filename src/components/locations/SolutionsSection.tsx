// components/locations/SolutionsSection.tsx
'use client';

import { Layers, MapPin } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';

interface SolutionsSectionProps {
  solutionsText: string;
}

interface SolutionItem {
  title: string;
  body: string;
}

function parseSolutionsContent(text: string): SolutionItem[] {
  if (!text) return [];

  const items: SolutionItem[] = [];
  const sections = text.split(/\n\s*\n/).filter(Boolean);

  for (const section of sections) {
    const lines = section.split('\n').filter(Boolean);
    if (lines.length === 0) continue;

    const firstLine = lines[0] || '';
    if (!firstLine.includes(':')) continue;

    const [title, ...rest] = firstLine.split(':');
    const restContent = rest.join(':').trim();
    const bodyLines = lines.slice(1).join(' ').trim();
    const body = (restContent ? restContent + ' ' : '') + bodyLines;

    items.push({ title: title.trim(), body: body.trim() });
  }

  return items;
}

const ICONS = [Layers, MapPin];

export const SolutionsSection = ({ solutionsText }: SolutionsSectionProps) => {
  const items = parseSolutionsContent(solutionsText);

  if (!items.length) return null;

  return (
    <section className="relative bg-background text-foreground py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display text-[18vw] leading-none text-foreground/[0.03]">
        SOLUTIONS
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <SectionLabel number="03" text="Our Approach" />
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tighter mt-6 mb-16">
            How We <span className="text-[#FF2E86]">Deliver</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-10 h-full flex flex-col hover:bg-foreground/[0.05] transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl">
                      <Icon className="w-7 h-7 text-[#FF2E86]" />
                    </div>
                    <h3 className="font-display text-2xl tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-foreground/80 text-lg leading-relaxed flex-1">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};