"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { n: 80, s: "+", l: "Team" },
  { n: 230, s: "+", l: "Projects" },
  { n: 9, s: "+", l: "Years", pad: true },
  { n: 25, s: "+", l: "Industries" },
  { n: 10, s: "+", l: "Awards" },
];

const Counter = ({ to, pad }: { to: number; pad?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => {
    const n = Math.floor(v);
    return pad && n < 10 ? `0${n}` : `${n}`;
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, to, mv]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export const Stats = () => (
  <section className="py-32 container">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="font-display text-5xl md:text-7xl mb-20"
    >
      <em className="text-[#FF3B47]">Our</em> story, by numbers
    </motion.h2>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-y-14 gap-x-6 border-y border-border py-16">
      {stats.map((s, i) => (
        <motion.div
          key={s.l}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="relative md:border-r border-border last:border-r-0 md:px-4"
        >
          <div className="font-display text-6xl md:text-7xl flex items-start leading-none">
            <Counter to={s.n} pad={s.pad} />
            <span className="text-[#FF3B47] text-3xl md:text-4xl ml-1 mt-2">{s.s}</span>
          </div>
          <div className="text-sm text-muted-foreground mt-4">{s.l}</div>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="mt-20 flex items-center justify-center gap-8 flex-wrap"
    >
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-7xl md:text-8xl"
      >
        ☕
      </motion.div>
      <div className="font-display text-5xl md:text-7xl flex items-start leading-none">
        <Counter to={32628} />
        <span className="text-[#FF3B47] text-3xl md:text-4xl ml-2 mt-2">+</span>
      </div>
      <div className="text-sm text-muted-foreground">Coffees<br />Consumed</div>
    </motion.div>
  </section>
);
