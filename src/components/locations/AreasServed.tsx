// src/components/locations/LocationAreasServed.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Check, Building2, Home, Compass } from "lucide-react";

interface LocationAreasServedProps {
  title: string;
  areas: string[];
}

export default function LocationAreasServed({
  title,
  areas,
}: LocationAreasServedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  if (!areas || areas.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-white text-foreground relative overflow-hidden"
    >
      {/* Soft Light Color Background Effects */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FF3D77]/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#6C5CE7]/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFB020]/[0.04] rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating soft blobs */}
      <div className="absolute top-[10%] right-[5%] w-48 h-48 bg-[#FF3D77]/[0.04] rounded-full blur-2xl pointer-events-none float-a" />
      <div className="absolute bottom-[20%] left-[3%] w-56 h-56 bg-[#6C5CE7]/[0.04] rounded-full blur-2xl pointer-events-none float-b" />
      <div className="absolute top-[60%] right-[8%] w-40 h-40 bg-[#FFB020]/[0.04] rounded-full blur-2xl pointer-events-none float-c" />

      {/* Pattern Backgrounds */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        {/* Diagonal lines pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M-10,10 L10,-10 M0,40 L40,0 M30,50 L50,30" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <pattern id="dotPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalPattern)" />
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF3D77]/[0.03] via-transparent to-[#6C5CE7]/[0.03] pointer-events-none" />

      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none opacity-10" />

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-4 max-w-7xl relative z-10"
      >
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          {/* Eyebrow with soft color */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-border/60 bg-gradient-to-r from-[#FF3D77]/[0.04] to-[#6C5CE7]/[0.04] backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7]" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Where We Serve
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-foreground"
          >
            {title}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
            viewport={{ once: true }}
            className="w-12 h-0.5 bg-gradient-to-r from-[#FF3D77]/40 to-[#6C5CE7]/40 mx-auto"
          />
        </motion.div>

        {/* Areas Grid - Modern Minimalist with Soft Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
          {areas.map((area, index) => {
            const hasDescription = area.includes("—") || area.includes(" — ");
            let name = area;
            let description = "";

            if (hasDescription) {
              const parts = area.split(/[—–-]\s*/);
              name = parts[0].trim();
              description = parts.slice(1).join(" — ").trim();
            }

            // Alternate soft colors for each item
            const colorVariants = [
              "hover:border-[#FF3D77]/20",
              "hover:border-[#6C5CE7]/20",
              "hover:border-[#FFB020]/20",
              "hover:border-[#FF3D77]/20",
              "hover:border-[#6C5CE7]/20",
              "hover:border-[#FFB020]/20",
            ];
            const borderColor = colorVariants[index % colorVariants.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                  ease: [0.65, 0, 0.35, 1],
                }}
                viewport={{ once: true, margin: "-30px" }}
                className="group relative"
              >
                <div className={`p-4 border-b border-border/30 hover:${borderColor} transition-colors duration-300`}>
                  <div className="flex items-start gap-4">
                    {/* Icon with soft color background */}
                    <div className="shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-full border border-border/40 bg-gradient-to-br from-[#FF3D77]/[0.06] to-[#6C5CE7]/[0.06] flex items-center justify-center group-hover:border-[#FF3D77]/30 group-hover:bg-gradient-to-br group-hover:from-[#FF3D77]/[0.10] group-hover:to-[#6C5CE7]/[0.10] transition-all duration-500">
                        <MapPin className="w-3.5 h-3.5 text-foreground/40 group-hover:text-[#FF3D77] transition-colors duration-500" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors duration-300">
                          {name}
                        </span>
                        {!description && (
                          <Check className="w-3 h-3 text-foreground/20 group-hover:text-[#FF3D77]/40 transition-colors duration-300" />
                        )}
                      </div>
                      {description && (
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {description}
                        </p>
                      )}
                    </div>

                    {/* Subtle arrow on hover with soft color */}
                    <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Compass className="w-3.5 h-3.5 text-[#FF3D77]/40" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stat / CTA with soft colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 px-6 py-4 border-t border-foreground/5 pt-6">
            <span className="text-sm text-muted-foreground">
              Serving <span className="font-medium text-foreground">{areas.length}+</span> locations
            </span>
            <span className="w-px h-4 bg-foreground/10" />
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-[#FF3D77] transition-colors duration-300"
            >
              Is your area covered?
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:text-[#FF3D77]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}