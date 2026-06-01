"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SeoServicesUsaContent } from "@/content/SeoServicesUsa";

const Reveal = ({ children, delay = 0, y = 30 }: any) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const SectionLabel = ({ n, t }: { n: string; t: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">[ {n} ]</span>
    <span className="h-px w-10 bg-foreground/30" />
    <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">{t}</span>
  </div>
);

const Hero = ({ content }: { content: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heroContent = content.hero;

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white pt-32 pb-20">
      <motion.div
        aria-hidden
        style={{ y: y1 }}
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y: y2 }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[180px] opacity-30"
      >
        <div className="w-full h-full rounded-full bg-[#FF2E86]" />
      </motion.div>

      <motion.div style={{ opacity }} className="container relative">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-6">{heroContent.tag}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            {heroContent.title} <br />
            <span className="text-[#FF2E86]">{heroContent.titleHighlight}</span>
            <br className="hidden md:block" /> {heroContent.subtitle}
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-2xl text-lg md:text-xl opacity-70 leading-relaxed">{heroContent.description}</p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Free consultation
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            {heroContent.stats.map((s: any) => (
              <div key={s.v}>
                <p className="font-display text-3xl md:text-5xl">{s.k}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mt-2">{s.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
};

const Intro = ({ content }: { content: any }) => {
  const introContent = content.intro;

  const renderProblemText = (text: any) => {
    if (!text) return null;
    if (Array.isArray(text)) {
      return text.map((part: any, idx: number) => (
        <span key={idx} className={part.type === "highlight" ? "text-[#FF2E86]" : ""}>
          {part.text}
        </span>
      ));
    }
    return text;
  };

  const renderBoldText = (text: any) => {
    if (!text) return null;
    if (Array.isArray(text)) {
      return text.map((part: any, idx: number) => (
        <span key={idx} className={part.type === "highlight" ? "font-bold" : ""}>
          {part.text}
        </span>
      ));
    }
    return text;
  };

  return (
    <section className="relative bg-background text-foreground py-10">
      <div className="container max-w-5xl">
        <SectionLabel n="02" t="The gap" />
        <Reveal>
          <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">{renderProblemText(introContent.problem)}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-10 text-lg opacity-70 max-w-3xl leading-relaxed">{renderBoldText(introContent.solution)}</p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 text-lg opacity-70 max-w-3xl leading-relaxed">{renderBoldText(introContent.promise)}</p>
        </Reveal>
      </div>
    </section>
  );
};

const CTA = ({ content }: { content: any }) => {
  const ctaContent = content.cta;
  const footer = content.footer;

  return (
    <section id="contact" className="relative bg-background text-foreground py-10 overflow-hidden">
      <div className="container relative max-w-5xl text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8">[ 08 ] — Ready when you are</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">{ctaContent.title}</h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">{ctaContent.description}</p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <a href={ctaContent.contactLink} className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors">
              Get started
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-16 text-xs uppercase tracking-[0.3em] opacity-50">{footer.company} · Serving {footer.regions}</p>
          <p className="mt-3 text-xs opacity-50">{footer.author}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default function SearchEngineOptimizationPage() {
  const content = SeoServicesUsaContent;

  return (
    <div className="theme-light w-full overflow-x-clip bg-background text-foreground">
      <main>
        <Hero content={content} />
        <Intro content={content} />
        <CTA content={content} />
      </main>
    </div>
  );
}
