import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Navbar } from "@/components/site/Navbar";
import {
  Search, Eye, Code2, ShieldCheck, FileCheck, GraduationCap,
  ArrowUpRight, Check, Cpu, Layers, Briefcase, Rocket, Scale,
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
            [ Service · 11 ] — ADA Compliance & Web Accessibility
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            An Inaccessible Site <br />
            Is a Legal Risk Today — <br />
            <span className="text-[#FF2E86]">A Lost Customer Every Day.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-2xl text-lg md:text-xl opacity-70 leading-relaxed">
            One in four US adults lives with a disability. ADA Title III
            lawsuits against websites have crossed 4,000 a year. WCAG 2.2 AA is
            now the global benchmark — and the European Accessibility Act made
            it mandatory across the EU in 2025. We make your digital experience
            accessible, legally defensible and genuinely usable for everyone.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4">
            <a href="#contact"
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors">
              Request an audit
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#services"
              className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-white/60 transition-colors">
              See what we fix
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            {[
              { k: "WCAG 2.2", v: "Level AA conformance" },
              { k: "1 in 4", v: "US adults with a disability" },
              { k: "4,000+", v: "ADA web lawsuits per year" },
              { k: "100%", v: "Audit-backed deliverables" },
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
      <SectionLabel n="02" t="Features → Advantages → Benefits" />
      <Reveal>
        <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">
          Accessibility isn't a checkbox.
          <em className="text-[#FF2E86] not-italic"> It's a feature</em> — semantic
          markup, keyboard navigation, captions, contrast, focus states. The
          <em className="text-[#FF2E86] not-italic"> advantage</em> is a site
          that works for every user, every device, every assistive technology.
          The <em className="text-[#FF2E86] not-italic">benefit</em> is reach,
          revenue and protection from the lawsuit that's already hit thousands
          of US businesses this year.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-10 text-lg opacity-70 max-w-3xl leading-relaxed">
          We deliver WCAG 2.2 AA conformance, ADA Title III defensibility,
          Section 508 compliance for federal contractors, AODA for Ontario, and
          EN 301 549 / European Accessibility Act for the EU — through real
          audits, real remediation and real ongoing monitoring. No overlay
          widgets. No fake compliance theatre.
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <p className="mt-6 text-lg opacity-70 max-w-3xl leading-relaxed">
          At <strong>Clickmasters Digital Marketing</strong>, our IAAP-trained
          accessibility specialists work alongside your design and engineering
          teams to ship products that are demonstrably accessible — and to keep
          them that way as the codebase changes.
        </p>
      </Reveal>
    </div>
  </section>
);

const SERVICES = [
  {
    n: "01", icon: Search, tag: "Audit",
    title: "WCAG 2.2 AA Accessibility Audit",
    intro: "A real audit combines automated scanning with manual expert review and assistive-technology testing — because the failures that get sites sued are the ones automation misses.",
    blocks: [
      { h: "Automated baseline", p: "axe-core, WAVE and Lighthouse across every template and key journey — surfacing the structural issues that affect every page." },
      { h: "Manual expert review", p: "An IAAP-certified specialist evaluates every WCAG 2.2 AA success criterion, including the cognitive and operable criteria automation cannot reliably test." },
      { h: "Assistive-tech testing", p: "Hands-on testing with NVDA, JAWS, VoiceOver, TalkBack, Dragon NaturallySpeaking and keyboard-only navigation — the lived experience of your real users." },
    ],
  },
  {
    n: "02", icon: Code2, tag: "Remediation",
    title: "Accessibility Remediation & Engineering",
    intro: "We don't just file tickets — we ship the fixes. Our engineers remediate semantic HTML, ARIA, focus management, colour contrast, forms and complex widgets directly in your codebase.",
    blocks: [
      { h: "Code-level fixes", p: "Headings hierarchy, landmarks, alt text, form labels, error handling, skip links, focus order and keyboard traps — fixed at the component level so they stay fixed." },
      { h: "Complex components", p: "Accessible modals, menus, tabs, carousels, date pickers, data tables and SPAs — built to the WAI-ARIA Authoring Practices, not improvised." },
      { h: "Design system integration", p: "Accessible component libraries (React, Vue, Angular) with built-in contrast tokens, focus rings and ARIA patterns so future work ships accessible by default." },
    ],
  },
  {
    n: "03", icon: Eye, tag: "Design",
    title: "Inclusive Design & UX Review",
    intro: "Most accessibility debt is created at design time. We embed inclusive design into your UX and brand work so you stop building problems you have to remediate later.",
    blocks: [
      { h: "Design-system contrast & states", p: "Colour palettes, typography, hover/focus/disabled states and motion preferences validated against WCAG and prefers-reduced-motion." },
      { h: "Cognitive & low-vision", p: "Plain-language review, content hierarchy, reading order and zoom-to-400% testing for users with cognitive and low-vision needs." },
      { h: "Mobile & touch targets", p: "Touch-target sizing, gesture alternatives, orientation lock and the WCAG 2.2 mobile-specific criteria most teams miss." },
    ],
  },
  {
    n: "04", icon: ShieldCheck, tag: "Legal",
    title: "Legal Compliance & VPAT/ACR Documentation",
    intro: "Compliance is what your auditor, procurement counterpart or plaintiff's attorney sees on paper. We produce the documentation that satisfies them — and stands up in court.",
    blocks: [
      { h: "ADA, Section 508, AODA, EAA", p: "Conformance against the specific standard your business is governed by — US ADA Title III, federal Section 508, Ontario AODA, UK PSBAR, EU EAA / EN 301 549." },
      { h: "VPAT 2.5 / ACR", p: "Voluntary Product Accessibility Templates and Accessibility Conformance Reports prepared for procurement, RFPs and enterprise sales gates." },
      { h: "Accessibility statements", p: "Public-facing statements that meet legal disclosure requirements and provide accessible feedback channels for users." },
    ],
  },
  {
    n: "05", icon: FileCheck, tag: "Monitoring",
    title: "Continuous Monitoring & Regression Prevention",
    intro: "A site is accessible only at the moment it's tested. Without monitoring and CI integration, accessibility debt accumulates the moment your team ships the next feature.",
    blocks: [
      { h: "CI/CD integration", p: "axe-core and Pa11y in your pull-request pipeline — failing the build before inaccessible code reaches production." },
      { h: "Production scanning", p: "Scheduled scans across every template with diff alerts when accessibility regressions appear, plus monthly trend reports for leadership." },
      { h: "Quarterly manual re-audits", p: "Expert manual re-audit each quarter to catch the failures automation will never detect — and to update your VPAT." },
    ],
  },
  {
    n: "06", icon: GraduationCap, tag: "Enablement",
    title: "Training & Accessibility Programme Build",
    intro: "Sustainable accessibility comes from a team that owns it. We train your designers, developers, content authors and QA — and help you stand up the policies that keep it durable.",
    blocks: [
      { h: "Role-based training", p: "Tailored programmes for product, design, frontend, content, QA and procurement — recorded, exam-backed and certifiable." },
      { h: "Policy & governance", p: "Accessibility policy, content guidelines, procurement language and an internal escalation path with named owners." },
      { h: "Embedded specialist support", p: "Fractional accessibility lead embedded in your sprints — design reviews, code reviews, AT testing — until the practice becomes muscle memory." },
    ],
  },
];

const ServicesGrid = () => (
  <section id="services" className="relative bg-background text-foreground py-32">
    <div className="container">
      <SectionLabel n="03" t="What we deliver" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
          Our ADA & WCAG<br />
          <span className="text-[#FF2E86]">accessibility services.</span>
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
    { icon: Scale, title: "Legal defensibility", body: "ADA Title III demand letters and lawsuits target sites that fail WCAG 2.1/2.2 AA. A documented audit, remediation and monitoring programme is the single best defence — and is repeatedly cited as a mitigating factor by US courts." },
    { icon: Eye, title: "Larger addressable market", body: "Disability is the world's largest minority — 1.3 billion people globally, $13 trillion in disposable income with friends and family. An accessible site converts a market your competitors are quietly excluding." },
    { icon: Rocket, title: "Better SEO and Core Web Vitals", body: "Semantic HTML, descriptive alt text, proper heading structure, captions and keyboard-friendly markup are exactly what Google rewards. Accessibility wins are SEO wins — measurable in rankings within weeks." },
  ];

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
      <motion.div aria-hidden style={{ y }} className="absolute inset-0 grid place-items-center pointer-events-none">
        <span className="font-display text-[24vw] leading-none opacity-[0.04] tracking-tighter select-none">FOR ALL</span>
      </motion.div>

      <div className="container relative">
        <SectionLabel n="04" t="The benefits" />
        <motion.h2 style={{ x: headlineX }} className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20">
          Why accessibility<br />
          <span className="text-[#FF2E86]">is good business.</span>
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
    tag: "US Retail · ADA risk remediation",
    metric: "0 lawsuits",
    sub: "After 12 months of monitoring",
    title: "Mid-market retailer remediates 380+ WCAG failures and exits demand-letter risk.",
    body: "A US retailer received an ADA Title III demand letter citing 380+ accessibility failures across the storefront. We delivered a full WCAG 2.2 AA audit, remediated every blocker in 9 weeks, published a public accessibility statement and stood up monthly monitoring. Zero further legal actions in the 12 months since.",
  },
  {
    tag: "EU SaaS · Procurement gate",
    metric: "VPAT shipped",
    sub: "Unblocked $1.4M enterprise deal",
    title: "VPAT 2.5 and EAA conformance unlock enterprise procurement.",
    body: "An EU B2B SaaS was blocked from a $1.4M enterprise deal pending an Accessibility Conformance Report. We audited the product against EN 301 549 / EAA, remediated the blocking criteria, produced the VPAT 2.5 and ran a workshop with the buyer's accessibility team. Deal closed within 6 weeks.",
  },
  {
    tag: "UK Public Sector · PSBAR",
    metric: "AA conformant",
    sub: "Across 240 templates",
    title: "Public-sector portal achieves WCAG 2.2 AA across 240 templates.",
    body: "A UK public-sector body needed PSBAR-mandated WCAG 2.2 AA conformance across a sprawling content portal. We built an accessible design-system component library, retrained 40 content authors, integrated axe-core into CI, and re-audited quarterly. The portal now ships accessibility-first by default.",
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
            Accessibility<br /><span className="text-[#FF2E86]">in practice.</span>
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
  { icon: Layers, h: "IAAP-certified specialists", p: "Our auditors hold IAAP CPACC and WAS certifications and test against WCAG 2.2 AA, ADA, Section 508, AODA, EAA and EN 301 549. Audits are signed by a named accessibility specialist." },
  { icon: Briefcase, h: "We don't sell overlays", p: "Accessibility overlay widgets demonstrably do not produce compliance and have themselves become the basis of lawsuits. We deliver real remediation in your codebase — not a JavaScript band-aid." },
  { icon: Rocket, h: "Engineering-led remediation", p: "We don't just hand you a 200-page audit and walk away. Our engineers ship the fixes in your repo and prove conformance with a re-audit at the end." },
  { icon: Cpu, h: "Built to stay accessible", p: "CI integration, design-system patterns and team training mean the work survives the next sprint. Accessibility becomes how you build, not a project you finished." },
];

const Why = () => (
  <section className="relative bg-background text-foreground py-32">
    <div className="container">
      <SectionLabel n="06" t="Why Clickmasters" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
          Why teams choose us<br />
          <span className="text-[#FF2E86]">for accessibility.</span>
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
  { q: "Is my US business legally required to have an accessible website?", a: "If you operate a place of public accommodation, sell to the public, or are a federal/state contractor, the prevailing legal interpretation under ADA Title III is yes. The DOJ has repeatedly stated WCAG 2.1 AA is the de facto standard, and 2024 DOJ rulemaking made WCAG 2.1 AA explicitly required for state and local government websites. Thousands of private-sector ADA Title III website lawsuits are filed each year." },
  { q: "What is WCAG 2.2 AA and why does it matter?", a: "WCAG 2.2 (Web Content Accessibility Guidelines) is the W3C standard for web accessibility, organised into three conformance levels: A, AA and AAA. AA is the level cited by virtually every law and procurement standard worldwide — ADA, Section 508, AODA, EAA, UK PSBAR. WCAG 2.2 added 9 success criteria to 2.1, mostly affecting mobile, cognitive accessibility and authentication." },
  { q: "Do accessibility overlay widgets make my site compliant?", a: "No. Overlay widgets (accessiBe, UserWay, AudioEye widget, EqualWeb, etc.) have been the subject of lawsuits themselves and are publicly opposed by the disability community and accessibility experts. They cannot fix underlying code issues, often interfere with assistive technology, and are repeatedly cited in plaintiff complaints as evidence the site was not actually remediated. Real compliance requires real code fixes." },
  { q: "How long does an accessibility remediation project take?", a: "A focused audit typically takes 2-4 weeks. Remediation depends on the size of the site and severity of issues — a small marketing site with moderate issues is typically 4-8 weeks; a complex SaaS or ecommerce platform 12-24 weeks; an enterprise application or content portal 24-52+ weeks. We prioritise blocking issues first so legal exposure is reduced as quickly as possible." },
  { q: "Do you provide a VPAT or accessibility statement?", a: "Yes. We produce VPAT 2.5 / Accessibility Conformance Reports for procurement and enterprise sales, draft public-facing accessibility statements that meet legal disclosure requirements (including ADA, EAA Article 14 and AODA), and provide all underlying audit evidence your buyers, regulators or counsel may request." },
];

const Faqs = () => (
  <section className="relative bg-[#0a0a0a] text-white py-32">
    <div className="container max-w-4xl">
      <SectionLabel n="07" t="FAQs" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-16 tracking-tight">
          Accessibility <span className="text-[#FF2E86]">FAQs.</span>
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
        <span className="font-display text-[22vw] leading-none opacity-[0.04] tracking-tighter select-none">ACCESS</span>
      </motion.div>

      <motion.div style={{ scale }} className="container relative max-w-5xl text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8">[ 08 ] — Ready when you are</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            Ready to make your product<br />
            <em className="text-[#FF2E86] not-italic">accessible to everyone?</em>
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
            Whether you've received a demand letter, are preparing for an
            enterprise procurement gate, or want to do the right thing — we'll
            audit your product, remediate the failures, and put a programme in
            place so it stays accessible.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <a href="https://clickmastersdigitalmarketing.com/contact-us/"
              className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors">
              Request an audit
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="/website-development-services"
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors">
              Web Development
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

const AdaComplianceWebAccessibility = () => {
  useSmoothScroll();

  useEffect(() => {
    document.title = "ADA Compliance & Web Accessibility Services | WCAG 2.2 AA";
    const desc =
      "WCAG 2.2 AA audit, ADA Title III remediation, Section 508, AODA and EAA compliance — IAAP-certified specialists, real engineering, no overlay widgets.";
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

export default AdaComplianceWebAccessibility;
