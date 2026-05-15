import { motion } from "framer-motion";

const items = [
  {
    q: "ClickMasters didn't just ship our product — they reframed our entire thesis. The team operates like co-founders.",
    a: "Amelia Chen", r: "CEO, Lumen Health",
    bg: "#BBD3FF", rot: -2,
  },
  {
    q: "Six weeks from sketch to a paying customer base of 4,000. The cadence is unlike anything we'd seen.",
    a: "Marcus Devlin", r: "Founder, Orbit Finance",
    bg: "#A8EFE0", rot: 1.5,
  },
  {
    q: "An obsessively-crafted brand, app and growth loop. Every detail considered, nothing left to chance.",
    a: "Priya Raman", r: "Head of Product, Foldery",
    bg: "#D9C2FF", rot: -1,
  },
];

export const Testimonials = () => (
  <section className="py-32 container">
    <div className="mb-20 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-6">— Voices</p>
      <h2 className="font-display text-5xl md:text-7xl leading-[1.05] text-balance">
        Words from the <em>people we built with</em>
      </h2>
    </div>
    <div className="grid md:grid-cols-3 gap-8 md:gap-6">
      {items.map((t, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 40, rotate: 0 }}
          whileInView={{ opacity: 1, y: i % 2 ? 24 : 0, rotate: t.rot }}
          whileHover={{ rotate: 0, y: -4, scale: 1.02 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.12 }}
          style={{ backgroundColor: t.bg }}
          className="rounded-3xl p-8 md:p-10 text-zinc-900 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]"
        >
          <div className="text-2xl mb-8 opacity-60">❝</div>
          <blockquote className="font-display text-2xl leading-snug mb-10">
            {t.q}
          </blockquote>
          <hr className="border-zinc-900/15 mb-5" />
          <figcaption className="flex items-center gap-3 text-sm">
            <span className="w-9 h-9 rounded-full bg-zinc-900/10" />
            <span>
              <div className="font-medium">{t.a}</div>
              <div className="opacity-60">{t.r}</div>
            </span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  </section>
);
