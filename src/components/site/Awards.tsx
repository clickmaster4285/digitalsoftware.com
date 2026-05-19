"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const awards = [
  {
    bg: "#E5B83B",
    logo: "C",
    title: "4.9★ Top Rated\nOn Clutch",
    org: "Clutch",
    pattern: "stars",
  },
  {
    bg: "#6C3DF4",
    logo: "✦",
    title: "Top B2B Company\n2024",
    org: "GoodFirms",
    pattern: "dots",
  },
  {
    bg: "#3DDFB7",
    logo: "◆",
    title: "Best UX Studio\nAsia 2024",
    org: "Awwwards",
    pattern: "grid",
  },
  {
    bg: "#FF6B6B",
    logo: "★",
    title: "Design Agency\nOf The Year",
    org: "CSS Design",
    pattern: "stars",
  },
  {
    bg: "#FFFFFF",
    logo: "△",
    title: "Top 100 Design\nStudios Worldwide",
    org: "DesignRush",
    pattern: "dots",
    dark: true,
  },
];

const Pattern = ({ type }: { type: string }) => {
  if (type === "stars") {
    return (
      <div className="absolute inset-0 grid grid-cols-4 gap-3 p-6 opacity-25">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center text-3xl">★</div>
        ))}
      </div>
    );
  }
  if (type === "dots") {
    return (
      <div className="absolute inset-0 grid grid-cols-6 gap-3 p-6 opacity-20">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-current" />
        ))}
      </div>
    );
  }
  return (
    <div className="absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
};

export const Awards = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section   id="awards"   ref={ref} className="relative" style={{ height: `${awards.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        <h2 className="font-display text-5xl md:text-8xl text-center leading-[1.05] mb-12 px-6 z-10 pointer-events-none">
          Awards <em className="text-[#FF3B47]">and</em>
          <br />Recognitions
        </h2>

        <div className="relative w-[280px] h-[340px] md:w-[420px] md:h-[500px]">
          {awards.map((a, i) => {
            const start = i / awards.length;
            const end = (i + 1) / awards.length;
            const mid = (start + end) / 2;

            // Each card slides up into the stack, then the next one covers it
            const y = useTransform(
              scrollYProgress,
              [start, mid, end],
              i === 0 ? [0, 0, 0] : [600, 0, 0]
            );
            const rotate = useTransform(
              scrollYProgress,
              [start, mid, end],
              [i % 2 ? 18 : -18, (i - 2) * 4, (i - 2) * 4]
            );
            const scale = useTransform(
              scrollYProgress,
              [start, mid, end],
              [0.85, 1, 1]
            );

            return (
              <motion.div
                key={i}
                style={{
                  y, rotate, scale,
                  backgroundColor: a.bg,
                  color: a.dark ? "#0a0a0a" : "#fff",
                  zIndex: i + 1,
                }}
                className="absolute inset-0 rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden p-7 md:p-9 flex flex-col justify-between"
              >
                <Pattern type={a.pattern} />
                <div className="relative flex items-start justify-between">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 text-zinc-900 flex items-center justify-center font-display text-3xl md:text-4xl">
                    {a.logo}
                  </div>
                  <span className="text-xs uppercase tracking-widest opacity-70">
                    {String(i + 1).padStart(2, "0")} / {String(awards.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-display text-3xl md:text-5xl leading-[1.05] whitespace-pre-line mb-6">
                    {a.title}
                  </h3>
                  <div className="text-xs uppercase tracking-widest opacity-80">{a.org}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
    </section>
  );
};
