import { motion } from "framer-motion";

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
  </section>
);
