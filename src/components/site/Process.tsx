import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const steps = [
  { n: "01", t: "Discover", d: "Workshops, audits, and research to map the real problem before solving it." },
  { n: "02", t: "Define", d: "Strategy, scope, and a sharp narrative everyone on the team can rally around." },
  { n: "03", t: "Design", d: "High-fidelity systems, prototypes, and motion built to ship — not just to win awards." },
  { n: "04", t: "Deliver", d: "Engineering, QA, launch, and an ongoing partnership that compounds over time." },
];

export const Process = () => (
  <section id="process" className="py-32 container">
    <div className="grid md:grid-cols-12 gap-12 mb-20">
      <div className="md:col-span-4">
        <p className="text-xs uppercase tracking-[0.25em] mb-4">— Process</p>
      </div>
      <h2 className="md:col-span-8 font-display text-5xl md:text-7xl leading-[1.05] text-balance">
        A clear path from <em>fuzzy idea</em> to launched product.
      </h2>
    </div>
    <div className="space-y-px bg-border">
      {steps.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
          className="grid md:grid-cols-12 gap-6 bg-background py-10 group"
        >
          <div className="md:col-span-2 font-display text-3xl opacity-50 group-hover:opacity-100 transition">{s.n}</div>
          <div className="md:col-span-4 font-display text-4xl">{s.t}</div>
          <div className="md:col-span-5 text-muted-foreground">{s.d}</div>
          <div className="md:col-span-1 text-right text-2xl opacity-0 group-hover:opacity-100 transition">↗</div>
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
