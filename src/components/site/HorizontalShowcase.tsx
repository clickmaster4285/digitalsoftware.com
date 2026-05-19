"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRef } from "react";

const PANELS = [
  {
    n: "01",
    tag: "SaaS",
    title: "Dashboards that don't suck.",
    body: "Real-time analytics, role-based access, and a UI your team will actually open every morning.",
    color: "#FF2E86",
  },
  {
    n: "02",
    tag: "AI",
    title: "AI features, shipped.",
    body: "Streaming chat, vector search, agents, RAG pipelines — production-grade from day one.",
    color: "#7c5cff",
  },
  {
    n: "03",
    tag: "Web",
    title: "Marketing sites that convert.",
    body: "Editorial typography, micro-interactions, instant load times. Designed to win attention.",
    color: "#3ad6a3",
  },
  {
    n: "04",
    tag: "Mobile",
    title: "Apps users keep open.",
    body: "Native-feel React Native and iOS builds. Smooth, offline-ready, and obsessively polished.",
    color: "#f5a524",
  },
];

export const HorizontalShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // translate horizontally: show all 4 panels (so move ~75% to the left)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const labelY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={ref}
      className="relative bg-[#f5f3ee] text-[#0a0a0a]"
      style={{ height: "380vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* header */}
        <div className="container pt-10 md:pt-14 pb-6 flex items-end justify-between">
          <motion.div style={{ y: labelY }}>
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-3">
              [ What we build ] · [ 04 ]
            </p>
            <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95]">
              Four crafts.<span className="text-[#FF2E86]"> One studio.</span>
            </h2>
          </motion.div>
          <p className="hidden md:block text-[10px] uppercase tracking-[0.4em] opacity-60">
            scroll → drag horizontal
          </p>
        </div>

        {/* horizontal stage */}
        <div className="flex-1 relative overflow-hidden">
          <motion.div
            style={{ x }}
            className="absolute top-0 left-0 h-full flex gap-6 md:gap-8 px-6 md:px-12 will-change-transform"
          >
            {PANELS.map((p, i) => (
              <motion.article
                key={p.n}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative w-[88vw] md:w-[72vw] h-full max-h-[64vh] my-auto rounded-3xl overflow-hidden border border-black/10 bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] flex"
              >
                {/* left visual block */}
                <div
                  className="hidden md:block w-[42%] relative overflow-hidden"
                  style={{ background: p.color }}
                >
                  {/* large index */}
                  <span className="absolute -top-6 -left-2 font-display text-[18rem] leading-none text-white/15 select-none">
                    {p.n}
                  </span>
                  {/* drifting blobs */}
                  <motion.div
                    className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white/20 blur-2xl"
                    animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
                    transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-[10px] uppercase tracking-[0.4em] opacity-80">[ {p.tag} ]</p>
                    <p className="font-display text-2xl mt-2">Lumos · {p.n}</p>
                  </div>
                </div>

                {/* right content */}
                <div className="flex-1 p-8 md:p-14 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] opacity-60">
                    <span>[ {p.tag} ]</span>
                    <span>{p.n} / 04</span>
                  </div>

                  <div>
                    <h3 className="font-display text-3xl md:text-6xl font-bold leading-[1.02] mb-6">
                      {p.title}
                    </h3>
                    <p className="text-base md:text-lg max-w-md opacity-70 leading-relaxed">
                      {p.body}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="group inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase">
                      <span>See work</span>
                      <span
                        className="grid place-items-center w-9 h-9 rounded-full text-white transition-transform group-hover:translate-x-1"
                        style={{ background: p.color }}
                      >
                        ↗
                      </span>
                    </button>
                    <span className="text-[10px] uppercase tracking-[0.4em] opacity-50">
                      Lumos · 2026
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* bottom progress bar */}
        <div className="container pb-8 md:pb-10">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] opacity-60 mb-3">
            <span>01 — 04</span>
            <span>scroll progress</span>
          </div>
          <div className="h-[2px] w-full bg-black/10 overflow-hidden">
            <motion.div className="h-full bg-[#FF2E86]" style={{ width: progressW }} />
          </div>
        </div>
      </div>


       <motion.div
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 1.2, duration: 0.7 }}
        className="mt-10 flex items-center justify-center gap-6 flex-wrap"  // ← Added justify-center
      >
        <a href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-6 pr-3 py-3 text-sm font-medium hover:opacity-90 transition">
          Contact us
          <span className="grid place-items-center w-9 h-9 rounded-full bg-background text-foreground transition-transform group-hover:rotate-45">
            <ExternalLink className="w-4 h-4" />
          </span>
        </a>
        {/* You can add more buttons/items here if needed */}
      </motion.div>
    </section>
  );
};
