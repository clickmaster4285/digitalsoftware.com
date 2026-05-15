import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  { q: "How fast can we start?", a: "Usually within 1–2 weeks. We keep one slot open each month for urgent founder work." },
  { q: "Do you work with early-stage startups?", a: "Yes — about half our work is pre-Series A. We've designed for teams of 2 and teams of 200." },
  { q: "Can you handle engineering too?", a: "Absolutely. We're designers and engineers under one roof. We ship production-ready React, Next, and native apps." },
  { q: "What does pricing look like?", a: "Sprint engagements start at $8k. Most full builds land between $25k–$120k. We're transparent and unbundled." },
  { q: "Do you offer ongoing retainers?", a: "Yes — our Partner tier is built for teams who want an embedded design + engineering function." },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-32 container">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.25em] mb-4">— FAQ</p>
          <h2 className="font-display text-5xl md:text-6xl leading-[1.05]">
            Questions, <em>answered</em>.
          </h2>
        </div>
        <div className="md:col-span-8 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center py-6 text-left"
              >
                <span className="font-display text-2xl md:text-3xl">{f.q}</span>
                <span className={`text-2xl transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden text-muted-foreground max-w-xl">{f.a}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
