import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const stats = [
  { n: "120+", l: "Projects shipped" },
  { n: "40+", l: "Global clients" },
  { n: "6", l: "Years building" },
  { n: "11", l: "Awwwards" },
];

export const About = () => (
  <section id="about" className="py-32 container">
    <div className="grid md:grid-cols-12 gap-16 items-start">
      <div className="md:col-span-7">
        <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-4">— Our approach</p>
        <h2 className="font-display text-5xl md:text-7xl leading-[1.02] text-balance">
          We work like a <em>partner</em>, not a vendor — embedded, opinionated, and quietly relentless.
        </h2>
      </div>
      <div className="md:col-span-5 space-y-6 text-lg text-muted-foreground md:pt-6">
        <p>Founded in 2019 by a tiny team of designers and engineers who got tired of pretty mockups that didn't ship.</p>
        <p>Today we partner with founders, CMOs, and product leaders to turn ambitious ideas into work that earns attention and compounds value.</p>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-border">
      {stats.map((s, i) => (
        <motion.div
          key={s.l}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <div className="font-display text-5xl md:text-6xl opacity-60">{s.n}</div>
          <div className="text-sm text-muted-foreground mt-2">{s.l}</div>
        </motion.div>
      ))}
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
