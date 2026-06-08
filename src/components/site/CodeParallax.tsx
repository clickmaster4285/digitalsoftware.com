"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRef } from "react";

const CODE_LINES = [
  { c: "#FF2E86", t: "// lumos.studio build log" },
  { c: "#7c7c7c", t: "import { ship } from '@lumos/core';" },
  { c: "#7c7c7c", t: "import { design, engineer } from '@lumos/team';" },
  { c: "#ffffff", t: "" },
  { c: "#ffffff", t: "export async function craft(idea) {" },
  { c: "#ffffff", t: "  const brief    = await design.discover(idea);" },
  { c: "#ffffff", t: "  const product  = await engineer.build(brief);" },
  { c: "#ffffff", t: "  return ship(product, { care: true });" },
  { c: "#ffffff", t: "}" },
  { c: "#7c7c7c", t: "" },
  { c: "#FF2E86", t: "→ deployed in 14 days · zero regressions" },
];

const FLOATERS = [
  { label: "TypeScript", x: "8%",  y: "18%", delay: 0 },
  { label: "React 19",   x: "78%", y: "12%", delay: 0.1 },
  { label: "Edge Fns",   x: "12%", y: "72%", delay: 0.2 },
  { label: "Postgres",   x: "82%", y: "68%", delay: 0.3 },
  { label: "AI Gateway", x: "46%", y: "8%",  delay: 0.15 },
  { label: "Stripe",     x: "52%", y: "82%", delay: 0.25 },
];

export const CodeParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // layered parallax speeds
  const yBack   = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yMid    = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yFront  = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const rotate  = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const scale   = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]), {
    stiffness: 60, damping: 22,
  });
  const headlineX = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const subX      = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const glowX     = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      ref={ref}
      className="relative bg-[#0a0a0a] text-white overflow-hidden py-28 md:py-40"
    >
      {/* parallax grid */}
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          y: yBack,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* drifting glow */}
      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full blur-[160px] opacity-30 pointer-events-none"
        style={{ x: glowX, background: "radial-gradient(circle, #FF2E86, transparent 70%)" }}
      />

      {/* Giant background word */}
      <motion.div
        aria-hidden
        className="absolute inset-0 grid place-items-center pointer-events-none"
        style={{ y: yBack }}
      >
        <span className="font-display text-[22vw] leading-none opacity-[0.04] tracking-tighter select-none">
          BUILD
        </span>
      </motion.div>

      <div className="container relative">
        {/* Section label */}
        <div className="flex items-center justify-between mb-10 md:mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60">
            [ How we build ] · [ 03 ]
          </p>
          <p className="hidden md:block text-[10px] uppercase tracking-[0.4em] opacity-60">
            scroll to inspect ↓
          </p>
        </div>

        {/* Headline split */}
        <div className="mb-16 md:mb-24">
          <motion.h2
            style={{ x: headlineX }}
            className="font-display text-5xl md:text-8xl font-bold leading-[0.95]"
          >
            Code that ships.
          </motion.h2>
          <motion.h2
            style={{ x: subX }}
            className="font-display text-5xl md:text-8xl font-bold leading-[0.95] text-[#FF2E86] mt-2"
          >
            Design that lasts.
          </motion.h2>
        </div>

        {/* Stage with parallax layers */}
        <div className="relative h-[520px] md:h-[600px]">
          {/* floating tech chips (back/mid layer) */}
          {FLOATERS.map((f, i) => (
            <motion.div
              key={f.label}
              className="absolute"
              style={{
                left: f.x,
                top: f.y,
                y: i % 2 === 0 ? yMid : yFront,
              }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
                className="px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm text-[11px] tracking-[0.2em] uppercase opacity-80"
              >
                {f.label}
              </motion.div>
            </motion.div>
          ))}

          {/* Center code card */}
          <motion.div
            style={{ scale, rotate }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] md:w-[640px] rounded-2xl border border-white/15 bg-[#0f0f0f]/90 backdrop-blur-md shadow-[0_40px_120px_-20px_rgba(255,46,134,0.35)] overflow-hidden"
          >
            {/* terminal head */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF2E86]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">~ / lumos / craft.ts</span>
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">live</span>
            </div>

            {/* code */}
            <div className="p-6 md:p-8 font-mono text-[13px] md:text-[14px] leading-relaxed">
              {CODE_LINES.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  style={{ color: l.c }}
                >
                  <span className="opacity-30 mr-4 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.t || "\u00A0"}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* footer stats */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8">
          {[
            { k: "98%", v: "On-time delivery" },
            { k: "12d", v: "Avg. time to MVP" },
            { k: "0", v: "Production regressions" },
            { k: "24/7", v: "Engineering on-call" },
          ].map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="font-display text-3xl md:text-5xl">{s.k}</p>
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mt-2">{s.v}</p>
            </motion.div>
          ))}
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
