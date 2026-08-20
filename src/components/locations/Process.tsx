// src/components/locations/LocationProcess.tsx
"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface ProcessStep {
  title: string;
  description: string;
}

interface LocationProcessProps {
  title: string;
  steps: ProcessStep[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.65, 0, 0.35, 1] as const,
    },
  }),
};

export default function LocationProcess({
  title,
  steps,
}: LocationProcessProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-white text-foreground relative overflow-hidden"
    >
      {/* Colorful Background Effects */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FF3D77]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#6C5CE7]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFB020]/3 rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating blobs */}
      <div className="absolute top-[10%] right-[8%] w-48 h-48 bg-[#FF3D77]/5 rounded-full blur-2xl pointer-events-none float-a" />
      <div className="absolute bottom-[20%] left-[5%] w-56 h-56 bg-[#6C5CE7]/5 rounded-full blur-2xl pointer-events-none float-b" />
      <div className="absolute top-[55%] right-[15%] w-32 h-32 bg-[#FFB020]/5 rounded-full blur-2xl pointer-events-none float-c" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 pointer-events-none" />
      
      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none opacity-10" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-14">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-border bg-muted/30 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D77] animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                How We Work
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-foreground"
            >
              {title}
            </motion.h2>
            
            {/* Decorative line */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="w-20 h-1 bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7] rounded-full mx-auto"
            />
          </div>

          {/* Process Steps with Unique Layout */}
          <div className="relative">
            {/* Animated vertical line with gradient */}
            <motion.div
              className="absolute left-[19px] top-0 bottom-0 w-0.5 md:left-[23px]"
              style={{
                background: "linear-gradient(to bottom, #FF3D77, #6C5CE7, #FFB020, #FF3D77)",
                backgroundSize: "100% 300%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "0% 100%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="space-y-8">
              {steps.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative pl-14 md:pl-16"
                  >
                    {/* Step number with pulse ring */}
                    <div className="absolute left-0 top-0">
                      {/* Pulse ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[#FF3D77]"
                        animate={{
                          scale: [1, 1.6, 1],
                          opacity: [0.6, 0, 0.6],
                        }}
                        transition={{
                          duration: 2.5,
                          delay: index * 0.3,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                        style={{ width: 40, height: 40 }}
                      />
                      
                      {/* Step number circle with gradient */}
                      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#FF3D77] to-[#6C5CE7] flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-[#FF3D77]/20">
                        {index + 1}
                      </div>
                    </div>

                    {/* Card with hover effects */}
                    <motion.div
                      className="group relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D77]/10 to-[#6C5CE7]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative p-6 rounded-2xl border border-border bg-white hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start gap-4">
                          {/* Icon with gradient background */}
                          <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF3D77]/10 to-[#6C5CE7]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle2 className="w-5 h-5 text-[#FF3D77]" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-lg font-display font-semibold mb-2 text-foreground group-hover:text-[#FF3D77] transition-colors duration-300">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {step.description}
                            </p>
                            
                            {/* Animated progress indicator */}
                            <motion.div
                              className="mt-3 h-0.5 w-full bg-muted/30 rounded-full overflow-hidden"
                              initial={{ width: "0%" }}
                              whileInView={{ width: "100%" }}
                              transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
                              viewport={{ once: true }}
                            >
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${((index + 1) / steps.length) * 100}%`,
                                  background: "linear-gradient(to right, #FF3D77, #6C5CE7)",
                                }}
                              />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeUp}
            custom={steps.length + 1}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl border border-border bg-muted/20 backdrop-blur-sm">
              <span className="text-sm text-muted-foreground">Ready to get started?</span>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF3D77] text-white rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 group"
              >
                Book a Free Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}