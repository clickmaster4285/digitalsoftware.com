import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Navbar } from "@/components/site/Navbar";
import {
  Search, Eye, Code2, Box, Headphones, GraduationCap,
  ArrowUpRight, Check, Cpu, Layers, Briefcase, Rocket, Glasses,
} from "lucide-react";

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

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white pt-32 pb-20">
      <motion.div aria-hidden style={{ y: y1, scale }} className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
      </motion.div>
      <motion.div aria-hidden style={{ y: y2 }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[180px] opacity-30">
        <div className="w-full h-full rounded-full bg-[#FF2E86]" />
      </motion.div>

      <motion.div style={{ opacity }} className="container relative">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-6">
            [ Service · 12 ] — AR / VR Development
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            Attention Is the New Currency. <br />
            AR & VR Buy You <br />
            <span className="text-[#FF2E86]">Hours of It.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-2xl text-lg md:text-xl opacity-70 leading-relaxed">
            Customers are exhausted by flat content. Immersive experiences hold
            attention 4× longer, lift conversion up to 94% in commerce and cut
            training time in half in industrial settings. We build AR and VR
            applications that don't just look impressive — they move the metric.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4">
            <a href="#contact"
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors">
              Plan my AR/VR build
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#services"
              className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-white/60 transition-colors">
              See what we build
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            {[
              { k: "+94%", v: "Commerce conversion lift" },
              { k: "−40%", v: "Industrial training time" },
              { k: "4×", v: "Time-on-experience uplift" },
              { k: "Quest 3 / Vision Pro", v: "Headset-ready builds" },
            ].map((s) => (
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

const Intro = () => (
  <section className="relative bg-background text-foreground py-28">
    <div className="container max-w-5xl">
      <SectionLabel n="02" t="AIDA — Attention" />
      <Reveal>
        <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">
          Customers swipe past a banner ad in
          <em className="text-[#FF2E86] not-italic"> 1.7 seconds</em>. They spend
          an average of 8 minutes inside a well-built AR product visualiser and
          22 minutes inside a VR training scenario. Immersive isn't a novelty
          anymore — it's the medium that finally earns the attention you're
          paying to acquire.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-10 text-lg opacity-70 max-w-3xl leading-relaxed">
          We build AR and VR applications across commerce, real estate,
          industrial training, healthcare, marketing and enterprise
          collaboration — on Apple Vision Pro, Meta Quest 3, HoloLens, mobile
          AR (ARKit / ARCore) and WebXR. Built in Unity, Unreal Engine and
          Three.js / React Three Fiber depending on what your audience and
          distribution require.
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <p className="mt-6 text-lg opacity-70 max-w-3xl leading-relaxed">
          At <strong>Clickmasters Digital Marketing</strong>, our XR team pairs
          3D artists, Unity/Unreal engineers and UX designers who specialise in
          spatial interaction — to ship experiences that perform commercially,
          not just visually.
        </p>
      </Reveal>
    </div>
  </section>
);

const SERVICES = [
  {
    n: "01", icon: Search, tag: "Strategy",
    title: "AR/VR Strategy & Concept Design",
    intro: "The biggest reason XR projects fail is shipping the wrong experience to the wrong device. We start with the business outcome and work backwards to platform, interaction model and content scope.",
    blocks: [
      { h: "Use-case definition", p: "Where AR or VR demonstrably outperforms 2D — product visualisation, spatial training, scenario rehearsal, immersive marketing, virtual showroom — and where it doesn't." },
      { h: "Platform & device selection", p: "Vision Pro vs Quest 3 vs HoloLens vs mobile AR vs WebXR — chosen against your audience, distribution channel, content fidelity and budget." },
      { h: "Storyboard & 3D concept art", p: "Scene blockouts, interaction storyboards and concept art that align stakeholders before expensive 3D production starts." },
    ],
  },
  {
    n: "02", icon: Box, tag: "AR Apps",
    title: "Augmented Reality Applications",
    intro: "Mobile AR (ARKit, ARCore) and WebAR (8thWall, Niantic Studio) for product visualisation, try-on, place-in-room, marketing campaigns and field-service overlays.",
    blocks: [
      { h: "AR commerce & try-on", p: "Place-in-room furniture, footwear and eyewear try-on, jewellery visualisation — the experiences proven to lift conversion by up to 94% and cut returns." },
      { h: "WebAR campaigns", p: "Browser-based AR launched by QR or link — no app install, perfect for marketing campaigns, packaging activations and event experiences." },
      { h: "AR field service & overlays", p: "Equipment overlays, step-by-step instructions and remote expert assistance for technicians, field engineers and frontline teams." },
    ],
  },
  {
    n: "03", icon: Glasses, tag: "VR Apps",
    title: "Virtual Reality Applications",
    intro: "Fully immersive VR built in Unity or Unreal for Quest 3, Vision Pro and PCVR — for training, simulation, virtual showrooms, design review and immersive entertainment.",
    blocks: [
      { h: "Industrial & safety training", p: "High-risk procedures rehearsed in VR with measurable performance data — used by manufacturing, oil & gas, aviation and emergency services to cut training time and risk." },
      { h: "Virtual showrooms & sales", p: "Immersive product configurators and showrooms for automotive, real estate and high-ticket B2B — letting global buyers experience the product without travel." },
      { h: "Design review & collaboration", p: "Multi-user VR rooms for architectural review, vehicle design and product engineering — replacing physical mockups and accelerating decision cycles." },
    ],
  },
  {
    n: "04", icon: Eye, tag: "Mixed Reality",
    title: "Mixed Reality & Spatial Computing",
    intro: "Vision Pro and HoloLens experiences that blend digital content with the real environment — for enterprise productivity, surgical planning, design and complex assembly.",
    blocks: [
      { h: "Apple Vision Pro apps", p: "Native visionOS apps using SwiftUI and RealityKit — built for the spatial-computing paradigm, not ports of iPad apps." },
      { h: "HoloLens enterprise", p: "Manufacturing, logistics, healthcare and field-service applications using Microsoft Mesh and Dynamics 365 Remote Assist." },
      { h: "Spatial UI & interaction", p: "Hand tracking, eye tracking, voice and pinch interaction patterns designed around the actual ergonomics of headset use." },
    ],
  },
  {
    n: "05", icon: Code2, tag: "WebXR",
    title: "WebXR & Real-time 3D for the Web",
    intro: "Three.js, Babylon.js, React Three Fiber and 8thWall for high-quality 3D and AR experiences that run directly in the browser — no app store, no install friction.",
    blocks: [
      { h: "3D product configurators", p: "Real-time 3D product configurators for cars, watches, furniture, fashion and B2B equipment — embedded directly into ecommerce and brand sites." },
      { h: "WebAR experiences", p: "Marker, image-target and surface-tracked AR launched from the browser — perfect for campaigns, retail and packaging." },
      { h: "Performance engineering", p: "Asset pipelines (glTF, Draco, KTX2), LOD systems and shader optimisation that make 3D and AR work on mid-tier mobile devices, not just flagships." },
    ],
  },
  {
    n: "06", icon: GraduationCap, tag: "Content",
    title: "3D Content, Modelling & Asset Pipeline",
    intro: "The visual quality of an AR/VR experience is decided by the asset pipeline. We model, optimise and animate the 3D content that makes immersive experiences actually feel immersive.",
    blocks: [
      { h: "3D modelling & PBR texturing", p: "Photorealistic and stylised 3D modelling, UV unwrapping and PBR texturing for product, environment, character and architectural assets." },
      { h: "Photogrammetry & 3D scanning", p: "Real-world objects captured into game-ready 3D assets — for retail, museums, real estate and industrial digital twins." },
      { h: "Optimisation pipeline", p: "Mesh decimation, LODs, atlas baking and runtime streaming so high-fidelity assets run smoothly on the actual target device." },
    ],
  },
];

const ServicesGrid = () => (
  <section id="services" className="relative bg-background text-foreground py-32">
    <div className="container">
      <SectionLabel n="03" t="What we build" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
          Our AR / VR<br />
          <span className="text-[#FF2E86]">development services.</span>
        </h2>
      </Reveal>

      <div className="space-y-24">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          const reverse = i % 2 === 1;
          return (
            <div key={s.n} className={`grid lg:grid-cols-12 gap-10 items-start ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <motion.div
                initial={{ opacity: 0, x: reverse ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5 lg:sticky lg:top-32"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl border border-foreground/15 grid place-items-center bg-foreground/[0.03]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">[ {s.tag} · {s.n} ]</span>
                </div>
                <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight mb-6">{s.title}</h3>
                <p className="text-base md:text-lg opacity-70 leading-relaxed">{s.intro}</p>
              </motion.div>

              <div className="lg:col-span-7 space-y-4">
                {s.blocks.map((b, j) => (
                  <motion.div
                    key={b.h}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: j * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -4 }}
                    className="group relative rounded-2xl border border-foreground/10 p-7 md:p-9 bg-foreground/[0.02] hover:border-[#FF2E86]/40 hover:bg-foreground/[0.04] transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <Check className="w-5 h-5 mt-1 text-[#FF2E86] shrink-0" />
                      <div>
                        <h4 className="font-display text-xl md:text-2xl mb-3">{b.h}</h4>
                        <p className="text-sm md:text-base opacity-70 leading-relaxed">{b.p}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const Advantage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const headlineX = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const items = [
    { icon: Headphones, title: "Memory you can measure", body: "Spatial memory is dramatically stronger than 2D recall — VR-trained operators retain procedure accuracy 75-90% at 30 days vs 20-30% for video. The training cost-per-retained-skill collapses." },
    { icon: Box, title: "Conversion you can prove", body: "Shopify and IKEA both publish 94%+ conversion uplifts for AR-enabled product pages. We instrument every experience so the lift shows up in your analytics, not just in marketing decks." },
    { icon: Cpu, title: "Distribution that fits the moment", body: "WebAR for top-of-funnel reach, native iOS/Android for engagement, Quest and Vision Pro for premium training and design — we recommend the channel that matches your audience and budget, not the trendiest one." },
  ];

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
      <motion.div aria-hidden style={{ y }} className="absolute inset-0 grid place-items-center pointer-events-none">
        <span className="font-display text-[24vw] leading-none opacity-[0.04] tracking-tighter select-none">XR</span>
      </motion.div>

      <div className="container relative">
        <SectionLabel n="04" t="The advantage" />
        <motion.h2 style={{ x: headlineX }} className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20">
          Why immersive<br />
          <span className="text-[#FF2E86]">outperforms flat.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 hover:border-[#FF2E86]/40 transition-colors"
              >
                <Icon className="w-8 h-8 text-[#FF2E86] mb-6" />
                <h3 className="font-display text-2xl mb-4 leading-tight">{it.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{it.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CASES = [
  {
    tag: "US Furniture · WebAR commerce",
    metric: "+78%",
    sub: "AR-enabled PDP conversion",
    title: "WebAR place-in-room visualiser lifts furniture conversion 78%.",
    body: "A US furniture retailer launched WebAR place-in-room across 1,200 SKUs. Built on 8thWall with a glTF/Draco asset pipeline, it loaded under 4s on mid-tier Android. AR-engaged product detail pages converted 78% better than non-AR sessions, and returns dropped 22%.",
  },
  {
    tag: "Dubai Real Estate · VR showroom",
    metric: "−63%",
    sub: "Sales-cycle shortening",
    title: "VR showroom lets international buyers tour off-plan towers from anywhere.",
    body: "A Dubai developer needed a way to qualify and close international buyers before construction. Our Unreal-built VR showroom (Quest 3 native + WebXR fallback) let buyers walk units, swap finishes and view skyline panoramas in real time. Sales-cycle length dropped 63% on participating projects.",
  },
  {
    tag: "UK Industrial · VR safety training",
    metric: "−42%",
    sub: "Time-to-competence",
    title: "Unity VR training cuts safety-procedure time-to-competence by 42%.",
    body: "A UK industrial manufacturer replaced classroom-and-shadowing safety training with a Unity-built VR scenario library on Quest 3 fleet. Performance is captured per trainee and surfaced in a Power BI dashboard. Time-to-competence dropped 42% with measurably higher procedure-accuracy retention at 30 and 90 days.",
  },
];

const Cases = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
      <motion.div aria-hidden style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 bg-[#FF2E86] pointer-events-none" />
      <div className="container relative">
        <SectionLabel n="05" t="Client results" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
            AR / VR<br /><span className="text-[#FF2E86]">in practice.</span>
          </h2>
        </Reveal>

        <div className="space-y-8">
          {CASES.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="grid md:grid-cols-12 gap-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 md:p-12 hover:border-[#FF2E86]/40 transition-colors"
            >
              <div className="md:col-span-4">
                <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-4">[ {c.tag} ]</p>
                <p className="font-display text-5xl md:text-6xl text-[#FF2E86] leading-none">{c.metric}</p>
                <p className="mt-3 text-sm opacity-70">{c.sub}</p>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-display text-2xl md:text-4xl leading-[1.1] mb-5">{c.title}</h3>
                <p className="text-sm md:text-base opacity-70 leading-relaxed">{c.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const WHY = [
  { icon: Layers, h: "Full XR stack in one team", p: "Concept design, 3D art, Unity and Unreal engineering, WebXR, native visionOS — under one roof. The handoffs that kill XR project quality don't happen on our team." },
  { icon: Briefcase, h: "Outcome-instrumented", p: "Every AR/VR build we ship is tied to a measurable business metric — conversion, training time, deal-cycle length, NPS — and instrumented so you can see the impact in production." },
  { icon: Rocket, h: "Performance-first asset pipeline", p: "We don't ship beautiful experiences that only run on flagship phones or wired PCs. Our pipeline targets the device your real audience actually owns." },
  { icon: Cpu, h: "Future-ready architecture", p: "Vision Pro, Quest 3, HoloLens, Android XR — the headset landscape is moving fast. We architect for cross-platform reuse so your investment stays valuable across hardware generations." },
];

const Why = () => (
  <section className="relative bg-background text-foreground py-32">
    <div className="container">
      <SectionLabel n="06" t="Why Clickmasters" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
          Why teams choose us<br />
          <span className="text-[#FF2E86]">for AR / VR.</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-6">
        {WHY.map((w, i) => {
          const Icon = w.icon;
          return (
            <motion.div
              key={w.h}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-foreground/10 p-8 bg-foreground/[0.02] hover:border-[#FF2E86]/40 transition-colors"
            >
              <Icon className="w-8 h-8 mb-5 text-[#FF2E86]" />
              <h3 className="font-display text-2xl mb-3">{w.h}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{w.p}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const FAQS = [
  { q: "Should I build for Apple Vision Pro, Meta Quest 3, mobile AR or WebAR?", a: "Audience and distribution decide. WebAR (browser-launched) is right for top-of-funnel marketing and ecommerce — zero install friction, billions of compatible devices. Mobile AR (ARKit/ARCore native apps) is right when you need higher fidelity, persistent users and deeper device integration. Quest 3 is the right VR target for training, design and B2B applications. Apple Vision Pro is right for premium spatial-computing experiences targeting early-adopter, high-value audiences. Most clients ship to two complementary platforms." },
  { q: "How long does an AR or VR project take?", a: "A focused WebAR campaign or product configurator typically takes 6-12 weeks. A native mobile AR app with custom 3D content takes 12-24 weeks. A VR training module on Quest 3 typically takes 16-32 weeks depending on scenario complexity. An enterprise multi-scenario VR programme or complex Vision Pro app typically takes 24-52+ weeks. 3D content production runs in parallel with engineering once the storyboards are approved." },
  { q: "How much does AR/VR development cost?", a: "Typical engagements: $20,000-$60,000 for WebAR campaigns and product configurators; $60,000-$180,000 for native mobile AR apps; $80,000-$250,000 for VR training scenarios on Quest; $200,000-$600,000+ for enterprise XR programmes, Vision Pro applications and large 3D content pipelines. We provide fixed-price proposals after concept approval." },
  { q: "We don't have 3D models — can you create them?", a: "Yes. We model from photographs, technical drawings, CAD files or physical samples (using photogrammetry). We also handle PBR texturing, animation, rigging and the full optimisation pipeline so the final assets perform on the target device. For product catalogues, we set up a repeatable production pipeline so adding new SKUs over time is fast and cost-predictable." },
  { q: "How do we measure ROI on an AR/VR investment?", a: "We instrument every build for the metric the business case was approved on — typically conversion rate uplift, time-on-experience, training time-to-competence, error/retention rates, return rate, sales-cycle length, or qualified-lead lift. Data flows into your analytics stack (GA4, Amplitude, Mixpanel, Power BI) so the impact is visible alongside every other channel." },
];

const Faqs = () => (
  <section className="relative bg-[#0a0a0a] text-white py-32">
    <div className="container max-w-4xl">
      <SectionLabel n="07" t="FAQs" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-16 tracking-tight">
          AR / VR <span className="text-[#FF2E86]">FAQs.</span>
        </h2>
      </Reveal>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <motion.details
            key={f.q}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.5 }}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] open:border-[#FF2E86]/40 transition-colors"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between gap-6 p-6 md:p-7">
              <span className="font-display text-lg md:text-xl pr-4">{f.q}</span>
              <span className="shrink-0 w-8 h-8 rounded-full border border-white/20 grid place-items-center text-base group-open:rotate-45 group-open:border-[#FF2E86] group-open:text-[#FF2E86] transition-all">+</span>
            </summary>
            <div className="px-6 md:px-7 pb-7 -mt-1 text-sm md:text-base opacity-75 leading-relaxed max-w-3xl">{f.a}</div>
          </motion.details>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]), { stiffness: 60, damping: 22 });

  return (
    <section id="contact" ref={ref} className="relative bg-background text-foreground py-32 overflow-hidden">
      <motion.div aria-hidden style={{ y }} className="absolute inset-0 grid place-items-center pointer-events-none">
        <span className="font-display text-[22vw] leading-none opacity-[0.04] tracking-tighter select-none">IMMERSE</span>
      </motion.div>

      <motion.div style={{ scale }} className="container relative max-w-5xl text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8">[ 08 ] — AIDA · Action</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            Ready to build the experience<br />
            <em className="text-[#FF2E86] not-italic">they'll actually remember?</em>
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
            Tell us the outcome you need to move — conversion, training time,
            deal cycle, or attention. We'll come back with the AR or VR
            concept, platform recommendation and price that gets you there.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <a href="https://clickmastersdigitalmarketing.com/contact-us/"
              className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors">
              Plan my AR/VR build
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="/mobile-app-development"
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors">
              Mobile App Development
            </a>
            <a href="/web-application-development"
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors">
              Web App Development
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-16 text-xs uppercase tracking-[0.3em] opacity-50">
            Clickmasters Digital Marketing · Serving USA · UK · UAE · Pakistan · Canada · Australia
          </p>
          <p className="mt-3 text-xs opacity-50">Amjad Khan — CEO, Clickmasters Digital Marketing · 2026</p>
        </Reveal>
      </motion.div>
    </section>
  );
};

const ArVrDevelopmentServices = () => {
  useSmoothScroll();

  useEffect(() => {
    document.title = "AR / VR Development Services | Apple Vision Pro · Meta Quest · WebXR";
    const desc =
      "AR and VR development for commerce, training, real estate and enterprise — Apple Vision Pro, Meta Quest 3, HoloLens, mobile AR and WebXR. Built in Unity, Unreal and Three.js.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, []);

  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <ServicesGrid />
        <Advantage />
        <Cases />
        <Why />
        <Faqs />
        <CTA />
      </main>
    </div>
  );
};

export default ArVrDevelopmentServices;
