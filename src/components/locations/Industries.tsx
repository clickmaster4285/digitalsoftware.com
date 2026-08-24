// src/components/locations/LocationIndustries.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  Briefcase,
  Stethoscope,
  Gavel,
  ShoppingBag,
  Home,
  Utensils,
  Users,
  TrendingUp,
  Globe,
  Shield,
  Code,
  ArrowRight,
} from "lucide-react";

interface IndustryItem {
  name: string;
  description: string;
}

interface LocationIndustriesProps {
  title: string;
  description: string;
  items: IndustryItem[];
}

const iconMap = [
  Building2,
  Briefcase,
  Stethoscope,
  Gavel,
  ShoppingBag,
  Home,
  Utensils,
  Users,
  TrendingUp,
  Globe,
  Shield,
  Code,
];

export default function LocationIndustries({
  title,
  description,
  items,
}: LocationIndustriesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-background relative overflow-hidden"
    >
      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none opacity-20" />

      {/* Decorative geometric elements */}
      <div className="absolute top-0 right-0 w-1/3 h-px bg-gradient-to-l from-foreground/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-foreground/5 to-transparent" />

      <motion.div
        style={{ opacity, scale }}
        className="container mx-auto px-4 max-w-7xl relative z-10"
      >
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 border border-border/50 bg-muted/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Industries We Serve
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-foreground tracking-tight"
          >
            {title}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
            viewport={{ once: true }}
            className="w-12 h-0.5 bg-foreground/20 mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Industries - Masonry/Timeline Style Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 relative">
          {/* Vertical center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-foreground/5 -translate-x-1/2" />

          {items.map((item, index) => {
            const Icon = iconMap[index % iconMap.length];
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.65, 0, 0.35, 1],
                }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative ${isLeft ? "md:pr-12" : "md:pl-12 md:col-start-2"} ${
                  index !== items.length - 1 ? "pb-12 md:pb-16" : ""
                } group`}
              >
                {/* Connector dot on the center line */}
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-foreground/10 bg-background group-hover:border-foreground/30 transition-all duration-500 z-10">
                  <div className="absolute inset-0 rounded-full bg-foreground/5 scale-0 group-hover:scale-100 transition-transform duration-500" />
                </div>

                {/* Content */}
                <div className="relative pl-12 md:pl-0">
                  {/* Mobile line connector */}
                  <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-foreground/5">
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 rounded-full border-2 border-foreground/10 bg-background" />
                  </div>

                  {/* Number */}
                  <div className="absolute left-0 md:relative md:left-auto flex items-center gap-4 mb-3 md:mb-4">
                    <span className="text-5xl md:text-6xl font-display font-bold text-foreground/5 group-hover:text-foreground/10 transition-colors duration-700 leading-none">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="md:hidden w-8 h-px bg-foreground/10" />
                  </div>

                  {/* Icon and Title Row */}
                  <div className="flex items-center gap-4 mb-2">
                    <div className="shrink-0 w-10 h-10 rounded-full border border-foreground/10 bg-muted/20 flex items-center justify-center group-hover:border-foreground/30 group-hover:bg-muted/40 transition-all duration-500">
                      <Icon className="w-4 h-4 text-foreground/40 group-hover:text-foreground transition-colors duration-500" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-foreground transition-colors duration-300">
                      {item.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed pl-0 md:pl-0">
                    {item.description}
                  </p>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-0 md:left-auto right-0 h-px w-0 bg-foreground/10 group-hover:w-full transition-all duration-700 ease-[0.65,0,0.35,1] md:hidden" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-6 py-4 border-t border-foreground/5 pt-6">
            <span className="text-sm text-muted-foreground tracking-wide">
              Don't see your industry?
            </span>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              Let's talk
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}