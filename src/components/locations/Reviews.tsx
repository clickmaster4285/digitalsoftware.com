// src/components/locations/LocationReviews.tsx
"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface ReviewItem {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

interface LocationReviewsProps {
  title: string;
  items: ReviewItem[];
}

export default function LocationReviews({
  title,
  items,
}: LocationReviewsProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Client Reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true }}
              className="relative p-6 rounded-2xl border border-border bg-background hover:shadow-lg transition-all"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />

              {/* Rating stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < item.rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="text-sm leading-relaxed text-muted-foreground mb-4">
                "{item.quote}"
              </blockquote>

              <div>
                <p className="font-semibold text-sm text-foreground">{item.author}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}