"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const awards = [
  {
    bg: "#E5B83B",
    logo: "📊",
    title: "Data-Driven & Custom-Built Strategies",
    org: "We don't guess — we analyze. Every strategy is built on real data, deep market research, and performance insights. And because no two businesses are alike, we never use cookie-cutter templates. Whether you're a local startup or a national brand, every plan is fully customized around your unique goals, industry, and audience.",
    pattern: "stars",
    
  },
  {
    bg: "#6C3DF4",
    logo: "👨‍💻",
    title: "A Team of Real Experts, Delivering Full-Service Marketing",
    org: "Behind every campaign is a dedicated team of SEO specialists, paid ads experts, content creators, designers, and developers — not interns. From SEO and PPC to web development, social media, AI automation, and ecommerce, we handle everything under one roof. One team. Every service. Zero juggling.",
    pattern: "dots",
   
  },
  {
    bg: "#3DDFB7",
    logo: "📈",
    title: "Measurable Results with Full Transparency",
    org: "We are obsessed with results. Every campaign is tracked, measured, and optimized in real time through clear dashboards and honest reporting. And our pricing is just as transparent — no hidden fees, no surprise charges, no confusing contracts. Just real growth you can see and costs you can trust.",
    pattern: "grid",
    dark: true,
  },
  {
    bg: "#FF6B6B",
    logo: "🌍",
    title: "Proven Across Industries, Always Evolving",
    org: "From healthcare and real estate to fashion, fitness, and fintech — we've helped businesses across dozens of industries grow online. We bring proven playbooks to every project, while staying ahead of algorithm updates, platform shifts, and industry trends so your business always leads the competition.",
    pattern: "stars",
    dark: true,
  },
  {
    bg: "#111827",
    logo: "🤝",
    title: "We Treat Your Business Like Our Own",
    org: "We go beyond being a vendor — we become your true growth partner. We listen, we adapt, and we stay committed to your success because your growth is our growth. Every decision we make is driven by what's best for your bottom line.",
    pattern: "dots",

    
  },
  {
    bg: "#FFFFFF",
    logo: "📞",
    title: "Dedicated Support, Every Step of the Way",
    org: "You're never left in the dark at Clickmasters. A dedicated account manager and responsive support team are always available to answer questions, address concerns, and keep you fully informed — so you always feel confident, supported, and in control.",
    pattern: "grid",
      dark: true,
   
  },
];

const Pattern = ({ type }: { type: string }) => {
  if (type === "stars") {
    return (
      <div className="absolute inset-0 grid grid-cols-4 gap-3 p-6 opacity-25">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center text-3xl">★</div>
        ))}
      </div>
    );
  }
  if (type === "dots") {
    return (
      <div className="absolute inset-0 grid grid-cols-6 gap-3 p-6 opacity-20">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-current" />
        ))}
      </div>
    );
  }
  return (
    <div className="absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
};

export const Awards = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section   id="awards"   ref={ref} className="relative" style={{ height: `${awards.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        <h2 className="font-display text-5xl md:text-8xl text-center leading-[1.05] mb-4 px-6 z-10 pointer-events-none">
          Why Choose Us as the <em className="text-[#FF3B47]">Best</em>
          <br />Digital Marketing Company
        </h2>

        
        <p className="text-center max-w-2xl mx-auto text-lg md:text-base text-muted-foreground mb-12 px-6 z-10 pointer-events-none ">
 Clickmasters is the digital marketing company that actually delivers. We don't just run campaigns we build growth engines tailored to your business, your audience, and your goals. Here's why 200+ businesses across the United States trust us to grow their brand online.
        </p>
        

        <div className="relative w-[280px] h-[340px] md:w-[420px] md:h-[500px]">
          {awards.map((a, i) => {
            const start = i / awards.length;
            const end = (i + 1) / awards.length;
            const mid = (start + end) / 2;

            // Each card slides up into the stack, then the next one covers it
            const y = useTransform(
              scrollYProgress,
              [start, mid, end],
              i === 0 ? [0, 0, 0] : [600, 0, 0]
            );
            const rotate = useTransform(
              scrollYProgress,
              [start, mid, end],
              [i % 2 ? 18 : -18, (i - 2) * 4, (i - 2) * 4]
            );
            const scale = useTransform(
              scrollYProgress,
              [start, mid, end],
              [0.85, 1, 1]
            );

            return (
              <motion.div
                key={i}
                style={{
                  y, rotate, scale,
                  backgroundColor: a.bg,
                  color: a.dark ? "#0a0a0a" : "#fff",
                  zIndex: i + 1,
                }}
                className="absolute inset-0 rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden p-7 md:p-9 flex flex-col justify-between"
              >
                <Pattern type={a.pattern} />
                <div className="relative flex items-start justify-between">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 text-zinc-900 flex items-center justify-center font-display text-3xl md:text-4xl">
                    {a.logo}
                  </div>
                  <span className="text-xs uppercase tracking-widest opacity-70">
                    {String(i + 1).padStart(2, "0")} / {String(awards.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-display text-3xl md:text-5xl leading-[1.05] whitespace-pre-line mb-6">
                    {a.title}
                  </h3>
                  <div className="text-xs uppercase tracking-widest opacity-80">{a.org}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      



      
    </section>
  );
};
