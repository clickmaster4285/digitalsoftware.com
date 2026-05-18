"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import {
  Code2, Gauge, ShieldCheck, Plug, Search, Server, ShoppingBag, Layers,
  Rocket, ArrowUpRight, Check, Cpu, Database, Globe, Sparkles,
} from "lucide-react";

/* ---------- Reusable bits ---------- */

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

/* ---------- HERO with parallax ---------- */

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white pt-32 pb-20">
      <motion.div
        aria-hidden
        style={{ y: y1, scale }}
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
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-6">
            [ Service · 01 ] — Web Development
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            Web Development <br />
            <span className="text-[#FF2E86]">Services</span> — the technical
            <br className="hidden md:block" /> foundation your business deserves.
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-2xl text-lg md:text-xl opacity-70 leading-relaxed">
            A beautiful design is a promise. Development is whether that promise is
            kept. We build the code that runs on servers, renders in browsers and
            ships within the 2.5 seconds Google &mdash; and your customers &mdash; demand.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Free technical consultation
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#stack"
              className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-white/60 transition-colors"
            >
              See our stack
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            {[
              { k: "1.4s", v: "Avg LCP we ship" },
              { k: "94/100", v: "Mobile PageSpeed" },
              { k: "190%", v: "Conv. lift (case)" },
              { k: "10+ yrs", v: "Engineering depth" },
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

/* ---------- Intro / promise ---------- */

const Intro = () => (
  <section className="relative bg-background text-foreground py-28">
    <div className="container max-w-5xl">
      <SectionLabel n="02" t="The promise" />
      <Reveal>
        <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">
          Most businesses invest in excellent design and watch it
          <em className="text-[#FF2E86] not-italic"> implemented poorly</em> — slow
          mobile loads, forms that fail silently, CMSes that need a developer
          for every edit, integrations that break without notice.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-10 text-lg opacity-70 max-w-3xl leading-relaxed">
          Web development done correctly is <strong>infrastructure</strong>. It is the
          foundation on which SEO rankings, paid landing pages, customer onboarding
          and the entire digital experience depend. Done poorly, it is a liability
          that compounds with every line of technical debt.
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <p className="mt-6 text-lg opacity-70 max-w-3xl leading-relaxed">
          At <strong>Clickmasters Digital Marketing</strong>, our team has built and
          delivered websites, web apps and e-commerce platforms across the
          <strong> USA, UK, UAE and Pakistan</strong> on WordPress, Shopify, Webflow,
          Next.js and custom frameworks — picking the right tech for each project,
          not forcing every project into a default.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------- Problem (parallax dark) ---------- */

const Problem = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const headlineX = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const items = [
    {
      icon: Gauge,
      title: "Performance that kills conversions",
      body: "53% of mobile visits are abandoned past 3 seconds. The average e-commerce site loads in 6.5s. That gap is where your ad spend disappears — image weight, render-blocking JS, server response, CDN config. All development decisions.",
    },
    {
      icon: Layers,
      title: "Technical debt that limits growth",
      body: "Every plugin added without thought. Every shortcut. Every deferred update. Every template that needs a developer. They compound into a codebase that is expensive to maintain and risky to modify.",
    },
    {
      icon: Plug,
      title: "Integrations that break silently",
      body: "Your site connects to CRMs, payment processors, email tools, inventory and analytics. Without proper error handling and monitoring, integrations fail silently — and you discover the broken pipeline months later.",
    },
  ];

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute inset-0 grid place-items-center pointer-events-none"
      >
        <span className="font-display text-[24vw] leading-none opacity-[0.04] tracking-tighter select-none">
          COST
        </span>
      </motion.div>

      <div className="container relative">
        <SectionLabel n="03" t="The problem" />
        <motion.h2
          style={{ x: headlineX }}
          className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20"
        >
          What poor web development<br />
          <span className="text-[#FF2E86]">actually costs you.</span>
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

/* ---------- Services (the 6 big sections) ---------- */

const SERVICES = [
  {
    n: "01",
    icon: Code2,
    tag: "WordPress",
    title: "WordPress Development",
    intro:
      "Powering 43% of the web. Our primary recommendation for content-rich business sites, pro-services firms and marketing platforms that need robust CMS plus serious design.",
    blocks: [
      {
        h: "Custom theme development",
        p: "Built from scratch — not child themes, not page-builder bloat. Only the functionality your site needs, an editing experience tailored to your team, and zero dependence on a vendor changing their license.",
      },
      {
        h: "Plugin development & customisation",
        p: "Custom plugins that add specific admin functionality, extend existing plugins beyond their original design, and build the custom post types and meta architectures sophisticated content needs.",
      },
      {
        h: "Performance optimisation",
        p: "Server-side caching, WebP image pipelines, render-blocking elimination, DB query tuning and CDN config. Properly built WordPress hits PageSpeed 90+ on mobile.",
      },
    ],
  },
  {
    n: "02",
    icon: ShoppingBag,
    tag: "Shopify",
    title: "Shopify Development",
    intro:
      "Our primary recommendation for direct-to-consumer commerce. Best-in-class checkout conversion, managed hosting, deep app ecosystem — extended with custom themes and apps where needed.",
    blocks: [
      {
        h: "Custom Liquid themes",
        p: "Engineered for your catalogue, brand and conversion goals. No template bloat, product pages built around the real purchase decision factors in your category.",
      },
      {
        h: "Shopify Plus & Checkout Extensibility",
        p: "Custom checkout UI components, Shopify Functions for discount logic and cart transformations, B2B wholesale, multi-currency and multi-language storefronts.",
      },
    ],
  },
  {
    n: "03",
    icon: Rocket,
    tag: "Next.js",
    title: "Next.js & Headless Development",
    intro:
      "Maximum performance front-end + flexible headless CMS. Next.js consuming Contentful, Sanity, Strapi or headless WordPress via GraphQL/REST, served from CDN edge.",
    blocks: [
      {
        h: "When headless is appropriate",
        p: "Extreme traffic where SSR can't keep up, content reused across web, app, signage and email from one CMS, or performance budgets so strict the added complexity is justified.",
      },
      {
        h: "Performance characteristics",
        p: "Static generation routinely hits sub-1s LCP on static pages — vs 2–4s on equivalent WordPress without aggressive caching. For high-traffic sites where every 100ms matters, that's commercial.",
      },
    ],
  },
  {
    n: "04",
    icon: Layers,
    tag: "Web Apps",
    title: "Web Application Development",
    intro:
      "Beyond websites — interactive, data-driven software that runs in the browser: portals, dashboards, workflow systems, custom forms and the APIs that hold it together.",
    blocks: [
      {
        h: "Portals & dashboards",
        p: "Client portals (project status, docs, invoices), employee portals (HR, onboarding, knowledge), partner portals (resellers, inventory, orders) and BI dashboards over your operational data.",
      },
      {
        h: "Custom forms & workflows",
        p: "Multi-step apps with conditional logic, approval routing based on form data, and integration layers that send the right data to the right downstream systems in the right format.",
      },
      {
        h: "API development & integration",
        p: "Salesforce, HubSpot, Pipedrive · Stripe, PayPal, Braintree · Klaviyo, ActiveCampaign, Mailchimp · Calendly, Acuity · NetSuite, Sage, Microsoft Dynamics.",
      },
    ],
  },
  {
    n: "05",
    icon: Search,
    tag: "Technical SEO",
    title: "Technical SEO Implementation",
    intro:
      "Your technical foundation directly determines organic performance. We bake technical SEO into every build — not patch it on after launch.",
    blocks: [
      {
        h: "Core Web Vitals from day one",
        p: "LCP < 2.5s, INP < 200ms, CLS < 0.1. These are ranking factors and UX determinants. Hitting them is a code-level decision, not a launch-day fix.",
      },
      {
        h: "Schema & structured data",
        p: "Organisation, LocalBusiness, Service, Product, FAQPage, Article, BreadcrumbList, Person — every relevant Schema.org type to unlock rich results in SERPs.",
      },
      {
        h: "Architecture that scales",
        p: "Logical URL structures, canonical management, hreflang for international sites, pagination handling, XML sitemaps, robots.txt and proper 404 management.",
      },
    ],
  },
  {
    n: "06",
    icon: ShieldCheck,
    tag: "Security & Hosting",
    title: "Security, Maintenance & Hosting",
    intro:
      "Security is the baseline — not an upgrade tier. Plus managed hosting on the cloud platform that fits your performance and reliability needs, and ongoing care that protects your investment.",
    blocks: [
      {
        h: "Security implementation",
        p: "SSL/TLS + enforced HTTPS, CSP / X-Frame-Options / HSTS headers, WordPress hardening, DB security, malware scanning. PCI DSS via gateway. GDPR cookie & data handling.",
      },
      {
        h: "Managed hosting & infra",
        p: "AWS, Google Cloud, WP Engine, Kinsta, Vercel, Netlify — chosen per project. Server config, CDN, caching and monitoring with rapid incident response.",
      },
      {
        h: "Maintenance retainers",
        p: "Staged platform updates, security & uptime monitoring, performance reports, monthly analytics and a designated bucket of hours for content, design and feature work.",
      },
    ],
  },
];

const ServicesGrid = () => (
  <section id="stack" className="relative bg-background text-foreground py-32">
    <div className="container">
      <SectionLabel n="04" t="What we build" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
          Our web development<br />
          <span className="text-[#FF2E86]">services — built to last.</span>
        </h2>
      </Reveal>

      <div className="space-y-24">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          const reverse = i % 2 === 1;
          return (
            <div
              key={s.n}
              className={`grid lg:grid-cols-12 gap-10 items-start ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
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
                  <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">
                    [ {s.tag} · {s.n} ]
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight mb-6">
                  {s.title}
                </h3>
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

/* ---------- Case studies (horizontal-feel cards) ---------- */

const CASES = [
  {
    tag: "Recruitment · WordPress rebuild",
    metric: "8.2s → 1.4s",
    sub: "+190% applications",
    title: "National recruitment agency cuts mobile load time and triples applications.",
    body: "47-plugin legacy WP rebuilt with a custom theme, image pipeline (4.2MB → 340KB), Redis object cache (TTFB 2.1s → 180ms), CDN, and a custom post type system for the job board. Core Web Vitals went from Poor across the board to Good across the board. Same traffic — applications up 190%.",
  },
  {
    tag: "B2B Manufacturer · Web app",
    metric: "3–5 days → 4 hours",
    sub: "+67% quote requests",
    title: "Custom quoting app replaces a manual email-based pipeline.",
    body: "Customers upload specs, select materials and quantities, and receive an automated preliminary estimate followed by a validated quote within 4 business hours. Integrated with ERP for material pricing, CRM for pipeline and email for delivery. Sales engineering headcount needed for quoting reduced from 3 to 1.5.",
  },
  {
    tag: "Online education · Headless Next.js",
    metric: "31 → 94 / 100",
    sub: "+34% mobile enrolments",
    title: "Headless Next.js rebuild eliminates downtime and rewrites mobile performance.",
    body: "WordPress as the headless CMS, Next.js front-end statically generated, dynamic rendering for authenticated dashboards, Cloudflare CDN. LCP 6.8s → 0.9s. Weekly downtime events eliminated. Course catalogue 3.2s → 0.6s on mobile. 34% lift in mobile enrolment conversions in the first 3 months.",
  },
];

const Cases = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 bg-[#FF2E86] pointer-events-none"
      />
      <div className="container relative">
        <SectionLabel n="05" t="Client results" />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
            Web development<br /><span className="text-[#FF2E86]">in practice.</span>
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
                <p className="font-display text-5xl md:text-6xl text-[#FF2E86] leading-none">
                  {c.metric}
                </p>
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

/* ---------- Why Clickmasters ---------- */

const WHY = [
  {
    icon: Cpu,
    h: "Tech selection without bias",
    p: "We don't take kickbacks from any platform or host. Recommendations are based on your team, your performance needs, your integrations and long-term maintainability — not our preferred default.",
  },
  {
    icon: Code2,
    h: "Code quality & documentation",
    p: "Readable, consistently formatted code · inline comments on non-obvious decisions · component-level docs · handover docs any competent developer can pick up without a briefing call.",
  },
  {
    icon: Gauge,
    h: "Performance as first-class",
    p: "We don't ship sites that miss Core Web Vitals. Performance is a brief-level requirement, measured continuously through development — never tested at launch and patched if it fails.",
  },
  {
    icon: ShieldCheck,
    h: "Security by default",
    p: "SSL/TLS, security headers, HTTPS enforcement, access controls, input validation. The baseline isn't an upgrade tier — it's the floor on every project.",
  },
];

const Why = () => (
  <section className="relative bg-background text-foreground py-32">
    <div className="container">
      <SectionLabel n="06" t="Why Clickmasters" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
          Why teams choose us<br />
          <span className="text-[#FF2E86]">for development.</span>
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

/* ---------- FAQs ---------- */

const FAQS = [
  {
    q: "What is the difference between web design and web development?",
    a: "Web design is the visual and structural design — what it looks like, how information is organised, how users interact. Web development is the technical implementation — the code that makes it function in a browser, connects to databases and third-party systems and delivers pages at speed. Most professional projects need both. At Clickmasters, our design and development teams collaborate from the wireframing stage so design choices are technically achievable within the performance and functionality requirements.",
  },
  {
    q: "How long does web development take?",
    a: "A custom WordPress site (20–30 pages, standard functionality, typical integrations) usually takes 5–8 weeks of development after design approval. A custom Shopify theme typically 4–6 weeks. A custom web app or headless build typically 10–20 weeks depending on application logic and integrations. Large enterprise projects can extend to 30+ weeks. Timelines assume timely client feedback and content delivery at each stage.",
  },
  {
    q: "What platform should we build our website on?",
    a: "Depends on your content, traffic, integrations and the team maintaining it. WordPress for most content-rich business sites and pro-services firms. Shopify for e-commerce. Webflow for design-forward marketing sites where the team wants visual editing without complex custom logic. Next.js for high-performance, high-traffic sites where standard platform performance is insufficient. We make a specific recommendation in the initial consultation.",
  },
  {
    q: "What are Core Web Vitals and why do they matter?",
    a: "Google's standardised UX metrics: LCP (load), INP (interactivity), CLS (visual stability). Google uses them as ranking factors — sites with Good ratings rank above otherwise-equivalent sites with Poor ratings. Beyond rankings, they directly measure user experience: poor Core Web Vitals = frustrated users = no conversions.",
  },
  {
    q: "How do you approach website security?",
    a: "Baseline on every project, not an option: SSL/TLS + enforced HTTPS, security headers (CSP, X-Frame-Options, HSTS), WordPress hardening (login protection, file permissions, admin URL customisation, XML-RPC disabling), regular updates via the maintenance retainer, malware scanning and database security. For sensitive data or GDPR jurisdictions, we implement the specific controls required for compliance.",
  },
  {
    q: "Can you take over a site built by another developer?",
    a: "Yes — we regularly do. Before committing we conduct a technical audit: codebase quality and documentation, security posture, Core Web Vitals, plugin and dependency health, and the technical debt that would need addressing to bring the site to a maintainable standard. We share findings transparently — including cases where rebuilding is more economical than maintaining.",
  },
  {
    q: "Do you handle hosting as well as development?",
    a: "Yes. WP Engine or Kinsta for WordPress (managed performance + security). Vercel or Netlify for Next.js and headless. AWS or Google Cloud for custom apps needing more infrastructure control. Includes server config, CDN, SSL management, backups and the monitoring & alerting that ensures rapid response.",
  },
  {
    q: "What's included in a maintenance retainer?",
    a: "Staged-then-deployed platform updates, security monitoring & incident response, uptime monitoring with immediate alerting, performance monitoring with monthly Core Web Vitals reporting, monthly analytics, and a designated bucket of hours for content, minor design changes and small features. Monthly rolling — no long-term lock-in.",
  },
  {
    q: "How do I get started?",
    a: "Book a free technical consultation. We discuss your current or new website, content management requirements, performance expectations, integration needs, timeline and budget. For existing sites we can run a technical audit before scoping — a specific assessment of the performance, security and architectural issues limiting your site. No commitment at the consultation stage.",
  },
];

const Faqs = () => (
  <section className="relative bg-[#0a0a0a] text-white py-32">
    <div className="container max-w-4xl">
      <SectionLabel n="07" t="FAQs" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-16 tracking-tight">
          Web development <span className="text-[#FF2E86]">FAQs.</span>
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
              <span className="shrink-0 w-8 h-8 rounded-full border border-white/20 grid place-items-center text-base group-open:rotate-45 group-open:border-[#FF2E86] group-open:text-[#FF2E86] transition-all">
                +
              </span>
            </summary>
            <div className="px-6 md:px-7 pb-7 -mt-1 text-sm md:text-base opacity-75 leading-relaxed max-w-3xl">
              {f.a}
            </div>
          </motion.details>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Final CTA ---------- */

const CTA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]), {
    stiffness: 60,
    damping: 22,
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-background text-foreground py-32 overflow-hidden"
    >
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute inset-0 grid place-items-center pointer-events-none"
      >
        <span className="font-display text-[22vw] leading-none opacity-[0.04] tracking-tighter select-none">
          SHIP
        </span>
      </motion.div>

      <motion.div style={{ scale }} className="container relative max-w-5xl text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8">
            [ 08 ] — Ready when you are
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            Ready for a website that is built<br />
            as well as it <em className="text-[#FF2E86] not-italic">looks?</em>
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
            The design earns the attention. The development determines whether
            that attention converts — or becomes a 3-second wait that sends the
            visitor to a competitor.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <a
              href="https://clickmastersdigitalmarketing.com/contact-us/"
              className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Free technical consultation
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://wa.me/"
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors"
            >
              Talk to a developer
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-16 text-xs uppercase tracking-[0.3em] opacity-50">
            Clickmasters Digital Marketing · Serving USA · UK · UAE · Pakistan · Canada · Australia
          </p>
          <p className="mt-3 text-xs opacity-50">
            Amjad Khan — CEO, Clickmasters Digital Marketing · Web development specialist · 10+ years
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
};

/* ---------- Page ---------- */

export default function WebDevelopmentServicesPage() {
  useSmoothScroll();

  useEffect(() => {
    document.title = "Web Development Services | Clickmasters Digital Marketing";
    const desc =
      "Web development services that build the technical foundation your business deserves — WordPress, Shopify, Next.js, web apps, technical SEO, security & hosting.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, []);

  return (
    <div className="theme-light bg-background text-foreground">
      <main>
        <Hero />
        <Intro />
        <Problem />
        <ServicesGrid />
        <Cases />
        <Why />
        <Faqs />
        <CTA />
      </main>
    </div>
  );
}
