"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    name: "Director, Dzherelo",
    quote:
      "I really enjoyed collaborating with ClickMasters. They launched a cool campaign that gave quick results and great sales for our services.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop",
    rot: -6,
    x: -40,
    y: 40,
  },
  {
    name: "Founder, Foldery",
    quote:
      "The team operates like co-founders. Every detail considered, every pixel obsessed over. Truly an extension of our company.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop",
    rot: 4,
    x: 30,
    y: 120,
  },
  {
    name: "Corporate Photographer",
    quote:
      "Thank you very much for everything! We revived the account, ideas and execution are golden. I will recommend ClickMasters to everyone.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop",
    rot: -3,
    x: -10,
    y: 220,
  },
  {
    name: "CEO, Lumen Health",
    quote:
      "Six weeks from sketch to a paying customer base of thousands. The cadence is unlike anything we'd ever seen before.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&auto=format&fit=crop",
    rot: 7,
    x: 60,
    y: 60,
  },
];

export const LumosSay = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Big background word "people" slides in from left, "what" from top
  const xPeople = useTransform(scrollYProgress, [0, 0.5], ["-30%", "0%"]);
  const yWhat = useTransform(scrollYProgress, [0, 0.5], ["-40%", "0%"]);
  // Foreground bold words slide in from right
  const xSay = useTransform(scrollYProgress, [0.05, 0.55], ["40%", "0%"]);
  const xNova = useTransform(scrollYProgress, [0.1, 0.6], ["60%", "0%"]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Headline stack */}
      <div className="container relative">
        <div className="relative leading-[0.85] font-display select-none">
          {/* Row 1: outlined "what" */}
          <motion.div
            style={{ y: yWhat }}
            className="text-[22vw] md:text-[15vw] tracking-tight"
          >
            <span
              className="font-sans font-black uppercase"
              style={{
                WebkitTextStroke: "2px currentColor",
                color: "transparent",
                opacity: 0.35,
              }}
            >
              what
            </span>
          </motion.div>

          {/* Row 2: outlined "people" + solid "say about" */}
          <div className="flex items-baseline gap-[2vw] -mt-[6vw]">
            <motion.span
              style={{ x: xPeople }}
              className="font-sans font-black uppercase text-[18vw] md:text-[13vw]"
            >
              <span
                style={{
                  WebkitTextStroke: "2px currentColor",
                  color: "transparent",
                  opacity: 0.35,
                }}
              >
                people
              </span>
            </motion.span>
            <motion.span
              style={{ x: xSay }}
              className="font-sans font-black uppercase text-[14vw] md:text-[10vw]"
            >
              say about
            </motion.span>
          </div>

          {/* Row 3: solid "ClickMasters" */}
          <motion.div
            style={{ x: xNova }}
            className="font-sans font-black uppercase text-[20vw] md:text-[14vw] -mt-[4vw]"
          >
            ClickMasters
          </motion.div>
        </div>

        {/* Testimonial polaroid cards */}
        <div className="relative mt-20 md:mt-32 min-h-[600px] md:min-h-[520px]">
          {cards.map((c, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 80, rotate: 0 }}
              whileInView={{ opacity: 1, y: c.y, rotate: c.rot, x: c.x }}
              whileHover={{ rotate: 0, scale: 1.04, zIndex: 50 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bg-white text-zinc-900 p-4 pb-6 w-[260px] md:w-[300px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
              style={{
                left: `${(i * 22) + 5}%`,
                top: 0,
              }}
            >
              <div className="aspect-[4/5] overflow-hidden mb-4 bg-zinc-100">
                <img src={c.img} alt={c.name} loading="lazy" className="w-full h-full object-cover grayscale" />
              </div>
              <figcaption className="text-[11px] uppercase tracking-widest opacity-60 mb-3">
                {c.name}
              </figcaption>
              <blockquote className="font-display text-lg leading-snug">
                <span className="text-2xl mr-1 opacity-40">[</span>
                {c.quote}
                <span className="text-2xl ml-1 opacity-40">]</span>
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>

      
    </section>
  );
};
