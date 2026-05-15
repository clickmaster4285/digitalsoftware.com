import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Navbar } from "@/components/site/Navbar";
import {
  Search, Palette, Code2, Server, Package, ShieldCheck,
  ArrowUpRight, Check, Cpu, Layers, Plug, Gauge, Briefcase, Rocket,
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

/* ---------- HERO ---------- */

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
            [ Service · 02 ] — Web Application Development
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            Custom Web Apps <br />
            That Solve the Problem <br />
            <span className="text-[#FF2E86]">No Off-the-Shelf Software Can.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-2xl text-lg md:text-xl opacity-70 leading-relaxed">
            Every growing business hits the software ceiling — when spreadsheets,
            legacy systems, and SaaS tools create more friction than they remove.
            A custom web application is the answer: purpose-built for your
            operational, commercial, or product requirement.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Plan my web app
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-white/60 transition-colors"
            >
              See what we build
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            {[
              { k: "22 hrs", v: "Saved per week (case)" },
              { k: "$1.8M", v: "ARR built (SaaS case)" },
              { k: "34%", v: "Sales overhead cut" },
              { k: "12-18mo", v: "Typical ROI window" },
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

/* ---------- Intro ---------- */

const Intro = () => (
  <section className="relative bg-background text-foreground py-28">
    <div className="container max-w-5xl">
      <SectionLabel n="02" t="The promise" />
      <Reveal>
        <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">
          When manual data transfer is consuming
          <em className="text-[#FF2E86] not-italic"> 15+ hours of staff time per week</em>,
          when reporting can't produce the intelligence leadership needs, when the
          process that differentiates you can't be delivered at scale — you have
          outgrown generic software.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-10 text-lg opacity-70 max-w-3xl leading-relaxed">
          A web application is accessible from any browser on any device without
          installation, built to integrate with the specific systems your business
          already uses, and designed from the ground up around the specific
          workflow it is meant to support — not around the generic workflow that
          a platform serving 100,000 businesses had to accommodate.
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <p className="mt-6 text-lg opacity-70 max-w-3xl leading-relaxed">
          At <strong>Clickmasters Digital Marketing</strong>, we design and build
          custom web applications for businesses across every sector — from
          internal operational tools that transform team productivity to
          customer-facing product applications that deliver the differentiated
          service your clients pay for.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------- Services ---------- */

const SERVICES = [
  {
    n: "01",
    icon: Search,
    tag: "Discovery",
    title: "Discovery & Requirements Engineering",
    intro:
      "The most common cause of failed web app projects is building the wrong thing. Our discovery process produces the requirements foundation that prevents these failures.",
    blocks: [
      { h: "User research", p: "Understanding the specific people who will use the application, what they're trying to accomplish, and the current friction in their workflow." },
      { h: "Process mapping", p: "Documenting the specific workflow the application will support — including the edge cases and exceptions that generic process descriptions miss." },
      { h: "Technical requirements & UX prototyping", p: "Integrations, data models, performance and security constraints — plus low-fidelity wireframes that validate structure before development investment begins." },
    ],
  },
  {
    n: "02",
    icon: Palette,
    tag: "UX Design",
    title: "UX Design and Interface Design",
    intro:
      "Usability is the primary determinant of whether a web application achieves its operational objective. A confusing or slow app is abandoned for the spreadsheet workaround it was meant to replace.",
    blocks: [
      { h: "User-centred design for business apps", p: "We design around the operational context, frequency of use, technical literacy, and cognitive load constraints of the workflow the application supports." },
      { h: "End-to-end deliverables", p: "User journey maps, wireframes at low and high fidelity, interactive prototypes for user testing, and the final design system (colour, typography, component library)." },
    ],
  },
  {
    n: "03",
    icon: Code2,
    tag: "Front-End",
    title: "Front-End Development",
    intro:
      "We build front ends with React and Next.js — the JavaScript ecosystem that produces the performant, maintainable, scalable user interfaces modern web applications require.",
    blocks: [
      { h: "SPA, SSR & PWA architectures", p: "Single-page apps for interactive workflows, server-side rendering for SEO-required pages, progressive web apps where offline and mobile-app-like behaviour is valuable." },
      { h: "Real-time features", p: "WebSockets and Server-Sent Events for applications requiring live data updates, presence, or collaborative editing." },
      { h: "Accessibility (WCAG 2.1)", p: "The accessibility implementation that enterprise clients and regulated industries require — built in, not bolted on." },
    ],
  },
  {
    n: "04",
    icon: Server,
    tag: "Back-End & APIs",
    title: "Back-End Development and API Architecture",
    intro:
      "Node.js for JavaScript-native API-first architectures, Python for data-intensive and ML-adjacent applications, and PostgreSQL, MySQL, or MongoDB selected per data model.",
    blocks: [
      { h: "REST & GraphQL API design", p: "The interface layer between the front end and the data/business logic — designed for the specific query patterns your application requires." },
      { h: "Auth, RBAC & business logic", p: "Secure user authentication, role-based access control, session management, and the specific rules, calculations and workflows that make the application do what it is supposed to do." },
      { h: "Integrations", p: "CRM (Salesforce, HubSpot, Pipedrive), ERP (NetSuite, SAP, Sage), payments (Stripe, PayPal, Adyen), comms (Twilio, SendGrid) and the third-party APIs relevant to each domain." },
    ],
  },
  {
    n: "05",
    icon: Package,
    tag: "SaaS",
    title: "SaaS Product Development",
    intro:
      "For businesses whose web application is a commercial software product, we build the multi-tenant architecture, billing, onboarding, and admin infrastructure a SaaS requires.",
    blocks: [
      { h: "Multi-tenancy & billing", p: "Technical design that allows multiple client organisations to use the application with isolated data, plus Stripe integration for recurring, usage-based, and plan-managed billing." },
      { h: "Onboarding & admin", p: "The flow that takes a new customer from signup to first meaningful interaction with minimal friction — and the dashboards, user management, and reporting that let the SaaS business operate at scale." },
      { h: "Vertical SaaS experience", p: "Project management tools, industry-specific workflow automation, client portals, and sector-specific data management apps across B2B verticals." },
    ],
  },
  {
    n: "06",
    icon: ShieldCheck,
    tag: "QA & Security",
    title: "Quality Assurance, Security & DevOps",
    intro:
      "Production web applications serving real users with real data require the testing discipline that prevents the errors and security vulnerabilities that damage user trust.",
    blocks: [
      { h: "Testing programme", p: "Unit testing, integration testing, end-to-end (Playwright/Cypress) automated tests that simulate real user journeys, and security testing — OWASP Top 10 assessment plus penetration testing for sensitive applications." },
      { h: "Cloud deployment & DevOps", p: "Deployed to AWS, Google Cloud, or Microsoft Azure with the CI/CD pipelines that enable reliable, rapid deployment of new features and fixes." },
      { h: "Monitoring & alerting", p: "The infrastructure observability that makes web applications operationally reliable and commercially sustainable to maintain." },
    ],
  },
];

const ServicesGrid = () => (
  <section id="services" className="relative bg-background text-foreground py-32">
    <div className="container">
      <SectionLabel n="03" t="What we build" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
          Our web application<br />
          <span className="text-[#FF2E86]">development services.</span>
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

/* ---------- Advantage (parallax dark) ---------- */

const Advantage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const headlineX = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const items = [
    {
      icon: Gauge,
      title: "The build-vs-buy calculation",
      body: "Generic SaaS cost + workaround inefficiencies vs. one-time custom development + maintenance. For businesses where generic limitations cost 15+ hours/week, custom typically produces positive ROI within 12-18 months — and an operational advantage that compounds indefinitely.",
    },
    {
      icon: ShieldCheck,
      title: "Ownership and control",
      body: "Custom web applications are owned assets — no vendor lock-in, no arbitrary price increases, no platform decisions made by a third party that force operational changes on your business. Every SaaS dependency is a commercial relationship that can change.",
    },
    {
      icon: Plug,
      title: "Integration depth",
      body: "Generic SaaS tools integrate via the APIs the vendor chose to expose. Custom applications integrate precisely with every system the business uses, in the specific data model and workflow sequence that makes the integration commercially useful — not just technically functional.",
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
          OWN
        </span>
      </motion.div>

      <div className="container relative">
        <SectionLabel n="04" t="The advantage" />
        <motion.h2
          style={{ x: headlineX }}
          className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20"
        >
          Why custom outperforms<br />
          <span className="text-[#FF2E86]">generic software.</span>
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

/* ---------- Case studies ---------- */

const CASES = [
  {
    tag: "UK Professional Services · Client portal",
    metric: "22 → 4 hrs/wk",
    sub: "£2,340/wk billable recovered",
    title: "Custom client portal replaces email workflow and saves 22 hours per week.",
    body: "A UK consulting firm was managing project comms, document sharing, milestones and invoicing entirely through email. Our build (React + Node.js + PostgreSQL) delivered project dashboard, version-controlled document management, contextual messaging and Xero-integrated invoicing. CSAT improved 7.2 → 8.8 — the MD called it 'the operational infrastructure investment that made every engagement more profitable.'",
  },
  {
    tag: "US Healthcare · Clinical SaaS",
    metric: "$1.8M ARR",
    sub: "340 users · 28 practices · 18 mo",
    title: "HIPAA-compliant clinical reporting platform generates $1.8M ARR.",
    body: "A US healthtech startup needed a tool that generic EHR reporting modules couldn't produce. Our SaaS build (React + Python/FastAPI + PostgreSQL, multi-tenant) delivered specialty-specific outcome tracking, cohort analysis, national-registry benchmarking and exportable reports for accreditation. Launched with 12 founding users — grew to 340 across 28 practices at 72% gross margin in 18 months.",
  },
  {
    tag: "Dubai Real Estate · Buyer portal",
    metric: "−34% sales overhead",
    sub: "Extended to all projects in 8 mo",
    title: "Buyer portal reduces sales team overhead by 34%.",
    body: "A Dubai property developer was managing international buyer relationships through email, PDFs and Salesforce. Our React + Node.js + Salesforce-integrated buyer portal delivered personalised dashboards (reservation, payment schedule, construction photography, document centre), automated payment reminders and a sales-team admin interface. Buyer satisfaction climbed sharply on transparency.",
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
            Web app development<br /><span className="text-[#FF2E86]">in practice.</span>
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
    icon: Layers,
    h: "Full-stack technical team",
    p: "UX, React/Next.js, Node.js, Python, database architecture, API integration, cloud and DevOps. Most projects fail not from lack of front- or back-end capability in isolation, but at the interface — API design, data model, integrations — without full-stack ownership.",
  },
  {
    icon: Briefcase,
    h: "Commercial orientation",
    p: "We build for commercial outcomes — operational efficiency, product revenue, or customer experience improvement that justified the investment. Every requirement decision: does this serve the investment case? Right-sized for the problem.",
  },
  {
    icon: Rocket,
    h: "Ongoing support & evolution",
    p: "Web apps are operational assets that need ongoing maintenance, security updates, and feature development. We provide support retainers and product evolution partnerships so the investment continues to serve the business as it changes.",
  },
  {
    icon: Cpu,
    h: "Architecture decisions made right the first time",
    p: "The technical choices made in early SaaS and web app development determine scalability and operational cost structure at scale. We make these decisions with the long view, not the shortest path to launch.",
  },
];

const Why = () => (
  <section className="relative bg-background text-foreground py-32">
    <div className="container">
      <SectionLabel n="06" t="Why Clickmasters" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
          Why teams choose us<br />
          <span className="text-[#FF2E86]">for web applications.</span>
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
    q: "How long does web application development take?",
    a: "Timeline depends on complexity. A focused internal tool (single workflow, 3-5 user roles, standard integrations) typically takes 12-20 weeks from requirements sign-off to launch. A customer-facing web app or SaaS product (multiple user types, complex business logic, multiple integrations, full auth and billing) typically takes 20-40 weeks. Enterprise applications with complex data models, regulatory compliance and multiple system integrations typically take 40-60+ weeks.",
  },
  {
    q: "What does web application development cost?",
    a: "Web application development costs range from approximately $30,000-$80,000 for a focused internal tool with standard integrations, to $80,000-$200,000 for a customer-facing web app or SaaS product, to $200,000-$500,000+ for complex enterprise applications with extensive integrations and custom business logic. We provide detailed fixed-price proposals following the discovery and requirements phase.",
  },
  {
    q: "Should I build a web app or a native mobile app?",
    a: "Web applications are accessible from any browser on any device without installation — the right choice when the primary use context is desktop or tablet, when the audience includes a mix of iOS and Android users where maintaining two native codebases isn't justified, or when the app needs to be accessible to external users without app installation. Native mobile apps are right when the application requires deep device integration (camera, biometrics, background location, push notifications), when offline-first capability is essential, or when the primary UX is mobile-intensive and native performance is commercially meaningful.",
  },
  {
    q: "How do you handle security for applications handling sensitive business data?",
    a: "Security is designed into web apps from the architecture phase — not added as a post-development consideration. Our implementation covers OWASP Top 10 prevention (SQL injection, XSS, CSRF, insecure direct object references), role-based access control, encrypted data transmission (HTTPS everywhere), encrypted storage for sensitive fields, regular security audits, and penetration testing for healthcare, financial and legal applications. HIPAA-compliant implementations include the additional technical safeguards HIPAA requires.",
  },
  {
    q: "Do you provide ongoing maintenance after launch?",
    a: "Yes — we offer ongoing maintenance retainers covering: security patching and dependency updates (preventing security vulnerabilities from accumulating in production), performance monitoring and alerting, bug fix priority response, and development capacity for ongoing feature development and evolution. We recommend maintenance retainers for all production web applications; unmanaged web apps accumulate security debt rapidly.",
  },
];

const Faqs = () => (
  <section className="relative bg-[#0a0a0a] text-white py-32">
    <div className="container max-w-4xl">
      <SectionLabel n="07" t="FAQs" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-16 tracking-tight">
          Web application <span className="text-[#FF2E86]">FAQs.</span>
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
          BUILD
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
            Ready to build the web app<br />
            your business <em className="text-[#FF2E86] not-italic">needs?</em>
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
            The operational problem you've been working around has a solution.
            The product idea you've been developing deserves the technical
            execution quality that makes it commercially viable.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <a
              href="https://clickmastersdigitalmarketing.com/contact-us/"
              className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors"
            >
              Plan my web app
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://clickmastersdigitalmarketing.com/custom-software-development/"
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors"
            >
              Custom Software Development
            </a>
            <a
              href="https://clickmastersdigitalmarketing.com/saas-development/"
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors"
            >
              SaaS Development
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-16 text-xs uppercase tracking-[0.3em] opacity-50">
            Clickmasters Digital Marketing · Serving USA · UK · UAE · Pakistan · Canada · Australia
          </p>
          <p className="mt-3 text-xs opacity-50">
            Amjad Khan — CEO, Clickmasters Digital Marketing · 2026
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
};

/* ---------- Page ---------- */

const WebApplicationDevelopment = () => {
  useSmoothScroll();

  useEffect(() => {
    document.title = "Web Application Development Company | Clickmasters Digital Marketing";
    const desc =
      "Custom web application development — React, Next.js, Node.js, Python and SaaS products. Built for the operational, commercial or product requirement generic software cannot serve.";
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

export default WebApplicationDevelopment;
