// src/components/locations/LocationTools.tsx
"use client";

import { motion } from "framer-motion";

interface LocationToolsProps {
  title: string;
  tools: string[];
}

export default function LocationTools({ title, tools }: LocationToolsProps) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-muted/50 text-muted-foreground text-sm font-medium mb-4">
            Tools We Use
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
            {title}
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {tools.map((tool, index) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true }}
              className="px-4 py-2 rounded-full border border-border bg-background text-sm text-foreground hover:border-primary/30 hover:shadow-md transition-all"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}