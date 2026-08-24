// src/components/locations/LocationStats.tsx
"use client";

import { motion } from "framer-motion";

interface StatItem {
  label: string;
  value: string;
}

interface LocationStatsProps {
  stats?: StatItem[];
}

export default function LocationStats({ stats }: LocationStatsProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-12 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}