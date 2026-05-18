import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const plans = [
  {
    t: "Sprint", p: "$8k", d: "1 week",
    bg: "#FFF8DC", emoji: "⚡",
    f: ["Brand audit", "Landing page", "Async collab", "Figma handoff"],
  },
  {
    t: "Build", p: "$25k", d: "4 weeks",
    bg: "#FFE0E6", emoji: "✦", featured: true,
    f: ["Full identity or product", "Design system", "Weekly demos", "2 founders"],
  },
  {
    t: "Partner", p: "Custom", d: "Ongoing",
    bg: "#DFF7F0", emoji: "♾",
    f: ["Embedded team", "Strategy + execution", "Slack daily", "Quarterly roadmap"],
  },
];

export const Pricing = () => (
  <section className="py-32 container">
    <p className="text-xs uppercase tracking-[0.25em] mb-4">— Engagements</p>
    <h2 className="font-display text-5xl md:text-7xl leading-[1.05] mb-20 max-w-3xl">
      Pick a pace. We <em>flex</em> to fit.
    </h2>
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((p, i) => (
        <motion.div
          key={p.t}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: p.featured ? -16 : 0 }}
          whileHover={{ y: p.featured ? -28 : -10, rotate: i === 1 ? 0 : i === 0 ? -1 : 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.1 }}
          style={{ backgroundColor: p.bg }}
          className="relative rounded-[2rem] p-8 text-zinc-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          <div className="absolute -top-6 -right-6 text-[8rem] leading-none opacity-20 select-none">
            {p.emoji}
          </div>
          {p.featured && (
            <div className="inline-block mb-4 rounded-full bg-zinc-900 text-white px-3 py-1 text-[10px] uppercase tracking-widest">
              Most loved
            </div>
          )}
          <div className="flex justify-between items-start mb-8 relative">
            <div className="font-display text-3xl">{p.t}</div>
            <span className="text-xs uppercase tracking-widest opacity-70">{p.d}</span>
          </div>
          <div className="font-display text-7xl mb-8 relative">{p.p}</div>
          <ul className="space-y-3 text-sm mb-8 relative">
            {p.f.map(f => (
              <li key={f} className="flex gap-2 items-start">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-zinc-900" />{f}
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="relative block text-center rounded-full py-3.5 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition"
          >
            Get started ↗
          </a>
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
