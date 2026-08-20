// src/components/locations/LocationAISearch.tsx
"use client";

import { motion } from "framer-motion";
import { Bot, CheckCircle2, Sparkles } from "lucide-react";

interface LocationAISearchProps {
  title: string;
  description: string;
  points: string[];
}

export default function LocationAISearch({
  title,
  description,
  points,
}: LocationAISearchProps) {
  if (!points || points.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Bot className="w-4 h-4" />
              AI-Powered Visibility
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: [0.65, 0, 0.35, 1] }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 rounded-xl hover:bg-muted/30 transition-colors"
              >
                <div className="shrink-0 w-5 h-5 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm leading-relaxed text-foreground">{point}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center"
          >
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>
                AI search readiness is built into every campaign we manage
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}