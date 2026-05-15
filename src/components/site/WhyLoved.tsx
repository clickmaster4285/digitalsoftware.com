import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cards = [
  { t: "We are playing the long game", d: "Our clients keep coming back — most relationships last years, not weeks.", c: "#FF2E86", rot: -14, x: -180, y: 40, delay: 0 },
  { t: "We are always near", d: "Async-friendly, but never absent. Slack, calls, demos — we're in your loop.", c: "#9CF7E8", rot: 9, x: 60, y: -30, delay: 0.1 },
  { t: "We are for a comprehensive approach", d: "We pick the optimal mix of services to deliver maximum results in the shortest time.", c: "#0A0A0A", rot: -4, x: 220, y: 80, delay: 0.2, dark: true },
  { t: "Strategy first, always", d: "Before pixels and code, we map the why. Every move ladders up to the goal.", c: "#FFE27A", rot: 12, x: -60, y: 160, delay: 0.3 },
];

const marqueeText = "Do you like this approach? • Do you like this approach? • Do you like this approach? • ";

export const WhyLoved = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const titleX1 = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const titleX2 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
      {/* moody radial glow */}
      <div className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(180,40,120,0.45), transparent 60%)" }} />

      {/* huge background headline */}
      <div className="relative">
        <motion.h2
          style={{ x: titleX1 }}
          className="font-display text-[18vw] md:text-[14vw] leading-[0.85] font-bold whitespace-nowrap select-none"
        >
          why we
        </motion.h2>
        <motion.h2
          style={{ x: titleX2 }}
          className="font-display text-[18vw] md:text-[14vw] leading-[0.85] font-bold whitespace-nowrap select-none text-white/10"
        >
          are loved
        </motion.h2>
      </div>

      {/* floating 3D cards stack */}
      <div className="relative mx-auto max-w-5xl h-[420px] -mt-[28vw] md:-mt-[20vw]" style={{ perspective: "1200px" }}>
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: c.y + 100, rotateY: 30, rotateZ: c.rot - 10 }}
            whileInView={{
              opacity: 1,
              y: [c.y, c.y - 14, c.y],
              rotateY: 0,
              rotateZ: [c.rot, c.rot + 2, c.rot],
            }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              opacity: { duration: 0.7, delay: c.delay },
              rotateY: { duration: 0.9, delay: c.delay, type: "spring", stiffness: 60 },
              y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: c.delay + 0.8 },
              rotateZ: { duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: c.delay + 0.8 },
            }}
            whileHover={{ scale: 1.06, zIndex: 50, transition: { duration: 0.3 } }}
            style={{
              left: `calc(50% + ${c.x}px)`,
              backgroundColor: c.c,
              transformStyle: "preserve-3d",
            }}
            className={`absolute top-0 -translate-x-1/2 w-[260px] md:w-[300px] p-7 rounded-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ${c.dark ? "text-white" : "text-black"}`}
          >
            <div className="font-display text-2xl md:text-3xl leading-tight font-bold mb-4">{c.t}</div>
            <p className="text-xs md:text-sm opacity-80 leading-relaxed">{c.d}</p>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/30 rotate-[-3deg]" />
          </motion.div>
        ))}
      </div>

      {/* pink marquee strip */}
      <div className="relative mt-16 bg-[#FF2E86] py-5 overflow-hidden border-y border-white/10">
        <div className="marquee whitespace-nowrap font-display text-3xl md:text-4xl text-white">
          <span className="px-6">{marqueeText.repeat(6)}</span>
          <span className="px-6">{marqueeText.repeat(6)}</span>
        </div>
      </div>
    </section>
  );
};
