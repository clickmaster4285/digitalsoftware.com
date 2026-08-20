// src/components/locations/LocationChallenges.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AlertCircle, XCircle, Zap, Target, TrendingUp, Shield, BarChart3, PieChart, LineChart } from "lucide-react";

interface LocationChallengesProps {
  title: string;
  description: string;
  items: string[];
  locationName: string;
}

export default function LocationChallenges({
  title,
  description,
  items,
  locationName,
}: LocationChallengesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  // Filter out solution items - only show challenges
  const challengeItems = items.filter((item) => {
    const isSolution = item.toLowerCase().includes("we ") ||
      item.toLowerCase().includes("improve") ||
      item.toLowerCase().includes("optimize") ||
      item.toLowerCase().includes("fix") ||
      item.toLowerCase().includes("solution") ||
      item.toLowerCase().includes("address") ||
      item.toLowerCase().includes("rebuild") ||
      item.toLowerCase().includes("rework");

    return !isSolution;
  });

  // Different icons for visual variety
  const icons = [AlertCircle, XCircle, Zap, Target, TrendingUp, Shield];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-white text-foreground relative overflow-hidden"
    >
      {/* Pattern Backgrounds */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="challengeDiagonal" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M-10,10 L10,-10 M0,40 L40,0 M30,50 L50,30" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <pattern id="challengeDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1" fill="currentColor" />
            </pattern>
            <pattern id="challengeGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#challengeDiagonal)" />
          <rect width="100%" height="100%" fill="url(#challengeDots)" />
          <rect width="100%" height="100%" fill="url(#challengeGrid)" />
        </svg>
      </div>

      {/* Soft Color Background Effects */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#FF3D77]/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#6C5CE7]/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFB020]/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Floating blobs */}
      <div className="absolute top-[15%] right-[10%] w-48 h-48 bg-[#FF3D77]/[0.03] rounded-full blur-2xl pointer-events-none float-a" />
      <div className="absolute bottom-[25%] left-[5%] w-56 h-56 bg-[#6C5CE7]/[0.03] rounded-full blur-2xl pointer-events-none float-b" />
      <div className="absolute top-[50%] right-[5%] w-32 h-32 bg-[#FFB020]/[0.03] rounded-full blur-2xl pointer-events-none float-c" />

      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none opacity-10" />

      <motion.div style={{ opacity }} className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Animated Graphics */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Header - Left Side */}
              <div>
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-border/60 bg-gradient-to-r from-[#FF3D77]/[0.04] to-[#6C5CE7]/[0.04] backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7]" />
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Common Challenges
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-foreground whitespace-nowrap">
                  {title}
                </h2>

                <div className="w-20 h-0.5 bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7] rounded-full mb-6" />

                <p className="text-muted-foreground text-lg leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Animated Graphics Cards */}
              <div className="space-y-4 mt-8">
                {/* Card 1 - Data Visualization */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border border-border/60 bg-gradient-to-br from-[#FF3D77]/[0.04] to-[#6C5CE7]/[0.04] overflow-hidden relative group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FF3D77]/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-[#FF3D77]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Market Challenges</div>
                      <div className="text-xs text-muted-foreground">Common issues we solve</div>
                    </div>
                  </div>

                  {/* Animated bar chart */}
                  <div className="flex items-end justify-between h-16 gap-1.5">
                    {[65, 80, 45, 90, 55, 70, 85].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.06, ease: [0.65, 0, 0.35, 1] }}
                        className="flex-1 rounded-t-md"
                        style={{
                          height: `${height}%`,
                          background: `linear-gradient(to top, ${
                            i % 2 === 0 ? '#FF3D77' : '#6C5CE7'
                          }, ${i % 2 === 0 ? '#FF6B9D' : '#8B7CE7'})`,
                          opacity: 0.7,
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </motion.div>

                {/* Card 2 - Challenge Stats */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-3"
                >
                  <div className="p-4 rounded-2xl border border-border/60 bg-gradient-to-br from-[#6C5CE7]/[0.04] to-[#FFB020]/[0.04] text-center">
                    <div className="text-2xl font-display font-bold text-[#6C5CE7]">
                      {challengeItems.length}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Challenges</div>
                  </div>
                  <div className="p-4 rounded-2xl border border-border/60 bg-gradient-to-br from-[#FFB020]/[0.04] to-[#FF3D77]/[0.04] text-center">
                    <div className="text-2xl font-display font-bold text-[#FFB020]">100%</div>
                    <div className="text-xs text-muted-foreground mt-1">Solvable</div>
                  </div>
                </motion.div>

                {/* Card 3 - Pie Chart Visualization */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border border-border/60 bg-gradient-to-br from-[#FF3D77]/[0.04] to-[#6C5CE7]/[0.04]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6C5CE7]/10 flex items-center justify-center">
                      <PieChart className="w-5 h-5 text-[#6C5CE7]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Challenge Breakdown</div>
                      <div className="text-xs text-muted-foreground">Common pain points</div>
                    </div>
                  </div>

                  {/* Animated pie segments */}
                  <div className="flex items-center justify-between">
                    <div className="relative w-20 h-20">
                      <svg viewBox="0 0 100 100" className="w-20 h-20 -rotate-90">
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#FF3D77"
                          strokeWidth="20"
                          strokeDasharray="251.2"
                          strokeDashoffset="251.2"
                          animate={{ strokeDashoffset: 75 }}
                          transition={{ duration: 1.5, delay: 0.8, ease: [0.65, 0, 0.35, 1] }}
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#6C5CE7"
                          strokeWidth="20"
                          strokeDasharray="251.2"
                          strokeDashoffset="251.2"
                          animate={{ strokeDashoffset: 150 }}
                          transition={{ duration: 1.5, delay: 1, ease: [0.65, 0, 0.35, 1] }}
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#FFB020"
                          strokeWidth="20"
                          strokeDasharray="251.2"
                          strokeDashoffset="251.2"
                          animate={{ strokeDashoffset: 200 }}
                          transition={{ duration: 1.5, delay: 1.2, ease: [0.65, 0, 0.35, 1] }}
                        />
                      </svg>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF3D77]" />
                        <span className="text-xs text-muted-foreground">Visibility</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#6C5CE7]" />
                        <span className="text-xs text-muted-foreground">Traffic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FFB020]" />
                        <span className="text-xs text-muted-foreground">Conversions</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Challenges Timeline - with DOUBLE padding */}
          <div className="lg:col-span-7 pt-16 md:pt-24 lg:pt-44 xl:pt-56 2xl:pt-64">
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF3D77] via-[#6C5CE7] to-[#FFB020] opacity-20 md:left-[23px]" />

              <div className="space-y-6">
                {challengeItems.map((item, index) => {
                  const Icon = icons[index % icons.length];
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                        ease: [0.65, 0, 0.35, 1],
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="relative pl-14 md:pl-16"
                    >
                      {/* Timeline dot with pulse */}
                      <div className="absolute left-0 top-1">
                        <div className="relative">
                          {/* Pulse ring */}
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-[#FF3D77]"
                            animate={{
                              scale: [1, 1.8, 1],
                              opacity: [0.4, 0, 0.4],
                            }}
                            transition={{
                              duration: 2.5,
                              delay: index * 0.3,
                              repeat: Infinity,
                              ease: "easeOut",
                            }}
                            style={{ width: 30, height: 30 }}
                          />
                          {/* Dot */}
                          <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-[#FF3D77] to-[#6C5CE7] flex items-center justify-center shadow-lg shadow-[#FF3D77]/20">
                            <Icon className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Content Card */}
                      <motion.div
                        className="group relative"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D77]/10 to-[#6C5CE7]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative p-6 rounded-2xl border border-border/60 bg-white hover:border-[#FF3D77]/30 hover:shadow-xl transition-all duration-300">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-[#FF3D77]">
                                  Challenge #{index + 1}
                                </span>
                                <span className="text-xs text-muted-foreground/30">•</span>
                                <span className="text-xs text-muted-foreground/50">
                                  {locationName} businesses
                                </span>
                              </div>
                              <p className="text-sm md:text-base text-foreground leading-relaxed">
                                {item}
                              </p>
                            </div>

                            {/* Arrow indicator on hover */}
                            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF3D77]/10 to-[#6C5CE7]/10 flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-[#FF3D77]"
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
                              </div>
                            </div>
                          </div>

                          {/* Bottom accent line */}
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF3D77] via-[#6C5CE7] to-[#FFB020] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-full" />
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 px-6 py-4 border-t border-foreground/5 pt-6">
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{challengeItems.length}</span> challenges identified
            </span>
            <span className="w-px h-4 bg-foreground/10" />
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-[#FF3D77] transition-colors duration-300"
            >
              Let's solve them together
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
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