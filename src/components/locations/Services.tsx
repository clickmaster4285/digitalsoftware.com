// src/components/locations/LocationServices.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as Icons from "lucide-react";
import { useRef } from "react";

interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
  link?: string;
}

interface LocationServicesProps {
  title: string;
  description: string;
  items: ServiceItem[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.65, 0, 0.35, 1] as const,
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LocationServices({
  title,
  description,
  items,
}: LocationServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-16 md:py-24 bg-background relative overflow-hidden"
    >
      {/* Colorful Background Effects */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#FF3D77]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#6C5CE7]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/2 rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating blobs */}
      <div className="absolute top-[15%] right-[10%] w-32 h-32 bg-[#FFB020]/5 rounded-full blur-2xl pointer-events-none float-a" />
      <div className="absolute bottom-[25%] left-[8%] w-40 h-40 bg-[#FF3D77]/5 rounded-full blur-2xl pointer-events-none float-b" />
      
      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none opacity-20" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-border bg-background/80 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D77] animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              What We Offer
            </span>
          </motion.div>

          {/* Title with decorative line */}
          <motion.div variants={fadeUp} custom={1} className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-foreground">
              {title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7] rounded-full mx-auto mb-6" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Services Grid with Stagger Animation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, index) => {
            const IconComponent = getIcon(item.icon);
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={index}
                className="group relative"
              >
                {/* Card with hover glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D77]/20 to-[#6C5CE7]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div
                  className={`relative p-6 rounded-2xl border border-border bg-background/80 backdrop-blur-sm transition-all duration-300 group-hover:border-[#FF3D77]/30 group-hover:shadow-xl group-hover:-translate-y-1 ${
                    item.link ? "cursor-pointer" : ""
                  }`}
                >
                  {item.link ? (
                    <Link href={item.link} className="block">
                      <div className="flex items-start gap-4">
                        {/* Icon with animated gradient background */}
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF3D77]/20 to-[#6C5CE7]/20 blur-md group-hover:blur-xl transition-all duration-300" />
                          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF3D77]/10 to-[#6C5CE7]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <div className="text-foreground group-hover:text-[#FF3D77] transition-colors duration-300">
                              {IconComponent}
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-display font-semibold mb-2 text-foreground group-hover:text-[#FF3D77] transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.description}
                          </p>
                          
                          {/* Learn more link with arrow */}
                          <div className="mt-3 flex items-center gap-1 text-sm font-medium text-[#FF3D77] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
                            Learn More
                            <Icons.ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF3D77]/20 to-[#6C5CE7]/20 blur-md group-hover:blur-xl transition-all duration-300" />
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF3D77]/10 to-[#6C5CE7]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <div className="text-foreground group-hover:text-[#FF3D77] transition-colors duration-300">
                            {IconComponent}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-display font-semibold mb-2 text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Decorative corner accent */}
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#FF3D77] to-[#6C5CE7] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
            <span className="text-sm text-muted-foreground">Need a custom solution?</span>
            <Link
              href="/contact"
              className="text-sm font-medium text-[#FF3D77] hover:underline transition-colors"
            >
              Let's talk
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}