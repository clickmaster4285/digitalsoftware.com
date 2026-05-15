import { motion } from "framer-motion";

const services = [
  { n: "01", t: "Brand Identity", d: "Logos, systems, voice — built to outlast trends and scale with you." },
  { n: "02", t: "Digital Product", d: "End-to-end UX/UI for SaaS, fintech, and consumer apps that convert." },
  { n: "03", t: "Web Experience", d: "High-craft marketing sites with motion, story, and performance." },
  { n: "04", t: "Creative Direction", d: "Campaigns, art direction, and content systems that move people." },
];

export const Services = () => (
  <section id="services" className="py-32 container">
    <div className="grid md:grid-cols-12 gap-12 mb-20">
      <div className="md:col-span-4">
        <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-4">— Services</p>
      </div>
      <h2 className="md:col-span-8 font-display text-5xl md:text-7xl leading-[1.05] text-balance">
        A studio of <em>generalists</em> obsessed with the details that make work feel inevitable.
      </h2>
    </div>
    <div className="grid md:grid-cols-2 gap-px bg-border">
      {services.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: i * 0.1 }}
          className="group bg-background p-10 hover:bg-secondary transition-colors duration-500 relative overflow-hidden"
        >
          <div className="flex items-start justify-between mb-12">
            <span className="text-sm text-muted-foreground">{s.n}</span>
            <span className="text-2xl opacity-60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-500">↗</span>
          </div>
          <h3 className="font-display text-3xl md:text-4xl mb-4">{s.t}</h3>
          <p className="text-muted-foreground max-w-md">{s.d}</p>
        </motion.div>
      ))}
    </div>
  </section>
);
