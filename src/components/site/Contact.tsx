import { motion } from "framer-motion";

export const Contact = () => (
  <section id="contact" className="py-32 container text-center relative">
    <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-8">— Let's talk</p>
    <motion.h2
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 1 }}
      className="font-display text-[clamp(3rem,12vw,12rem)] leading-[0.9] text-balance"
    >
      Got a <em>vision?</em>
      <br />Let's build it.
    </motion.h2>
    
    {/* Email */}
    <a
      href="mailto:sales@clickmastersdigitalmarketing.com"
      className="mt-16 inline-flex items-center gap-3 rounded-full bg-background text-foreground px-10 py-5 text-lg font-medium hover:scale-105 transition-transform"
    >
      sales@clickmastersdigitalmarketing.com
      <span aria-hidden>→</span>
    </a>

    {/* Phone Numbers */}
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
      <a
        href="tel:+447988576086"
        className="inline-flex items-center gap-2 rounded-full bg-background/80 text-foreground px-6 py-3 text-sm font-medium hover:scale-105 transition-transform backdrop-blur-sm"
      >
        🇬🇧 UK: +44 7988 576086
      </a>
      <a
        href="tel:+13252024074"
        className="inline-flex items-center gap-2 rounded-full bg-background/80 text-foreground px-6 py-3 text-sm font-medium hover:scale-105 transition-transform backdrop-blur-sm"
      >
        🇺🇸 US: +1 325 202 4074
      </a>
      <a
        href="tel:+923325394285"
        className="inline-flex items-center gap-2 rounded-full bg-background/80 text-foreground px-6 py-3 text-sm font-medium hover:scale-105 transition-transform backdrop-blur-sm"
      >
        🇵🇰 PK: +92 332 5394285
      </a>
    </div>



    <footer className="mt-32 pt-10 border-t border-background/20 flex justify-between text-sm opacity-60 flex-wrap gap-4">
      <span>© 2026 ClickMasters</span>
      <div className="flex gap-6">
        <a href="#">Instagram</a>
        <a href="#">Dribbble</a>
        <a href="#">LinkedIn</a>
      </div>
    </footer>
  </section>
);