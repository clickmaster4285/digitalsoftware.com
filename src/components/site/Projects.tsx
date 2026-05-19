"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import { ExternalLink } from "lucide-react";

const projects = [
  { img: p1, title: "Lumen Studios", tag: "Branding · Web", year: "2025" },
  { img: p2, title: "Northbank Finance", tag: "Product · Mobile", year: "2025" },
  { img: p3, title: "Olive & Co.", tag: "Identity · Packaging", year: "2024" },
  { img: p4, title: "Phase Labs", tag: "Web · Motion", year: "2024" },
];

const ProjectCard = ({ p, i }: { p: typeof projects[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const offset = i % 2 === 0 ? "md:mt-0" : "md:mt-32";

  return (
    <div ref={ref} className={`${offset}`}>
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="overflow-hidden rounded-2xl group cursor-pointer"
      >
        <motion.div style={{ y }} className="aspect-[4/3] overflow-hidden">
          <Image src={p.img} alt={p.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-\\[1.2s\\] ease-out" />
        </motion.div>
      </motion.div>
      <div className="flex justify-between items-end mt-5">
        <div>
          <h3 className="font-display text-3xl">{p.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{p.tag}</p>
        </div>
        <span className="text-sm text-muted-foreground">{p.year}</span>
      </div>
    </div>
  );
};

export const Projects = () => (
  <section id="work" className="py-32 container">
    <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-4">— Selected work</p>
        <h2 className="font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">
          Projects we're <em>proud</em> of.
        </h2>
      </div>
      <a href="#" className="text-sm underline underline-offset-4 hover:opacity-60">View all (24)</a>
    </div>
    <div className="grid md:grid-cols-2 gap-x-10 gap-y-24">
      {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
    </div>



     <motion.div
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ delay: 1.2, duration: 0.7 }}
  className="mt-10 flex items-center justify-center gap-6 flex-wrap"  // ← Added justify-center
>
  <a href="#contact" className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-6 pr-3 py-3 text-sm font-medium hover:opacity-90 transition">
    Contact us
    <span className="grid place-items-center w-9 h-9 rounded-full bg-background text-foreground transition-transform group-hover:rotate-45">
      <ExternalLink className="w-4 h-4" />
    </span>
  </a>
  {/* You can add more buttons/items here if needed */}
</motion.div>
  </section>
);
