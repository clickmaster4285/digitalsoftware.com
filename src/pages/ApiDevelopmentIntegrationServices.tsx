import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Navbar } from "@/components/site/Navbar";
import {
  Search, Plug, Code2, ShieldCheck, Activity, Workflow,
  ArrowUpRight, Check, Cpu, Layers, Gauge, Briefcase, Rocket, Network,
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
            [ Service · 09 ] — API Development & Integration
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            APIs That Connect <br />
            Every System You Run — <br />
            <span className="text-[#FF2E86]">Reliably, Securely, At Scale.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-2xl text-lg md:text-xl opacity-70 leading-relaxed">
            The hidden cost of disconnected systems is the manual data entry,
            duplicated records, and broken reports that your team works around
            every day. We design, build, and integrate REST and GraphQL APIs
            that make your stack behave like one product.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4">
            <a href="#contact"
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors">
              Plan my integration
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#services"
              className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-white/60 transition-colors">
              See what we connect
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            {[
              { k: "99.95%", v: "API uptime delivered" },
              { k: "18 hrs", v: "Saved per week (case)" },
              { k: "240+", v: "Integrations shipped" },
              { k: "<200ms", v: "Median response time" },
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
      <SectionLabel n="02" t="The problem" />
      <Reveal>
        <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">
          When your CRM, ERP, payment processor and marketing tools
          <em className="text-[#FF2E86] not-italic"> can't talk to each other</em>,
          your team becomes the integration — copying data between systems and
          paying the cost in errors, lag and missed revenue.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-10 text-lg opacity-70 max-w-3xl leading-relaxed">
          A well-designed API is the contract that makes two systems behave like
          one. We build new APIs from the ground up, integrate third-party APIs
          into your existing stack, and replatform legacy SOAP and file-based
          integrations onto modern REST and GraphQL.
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <p className="mt-6 text-lg opacity-70 max-w-3xl leading-relaxed">
          At <strong>Clickmasters Digital Marketing</strong>, our integration
          engineers ship production APIs for SaaS products, internal platforms
          and enterprise system landscapes — designed for the throughput,
          security and observability requirements your business actually has.
        </p>
      </Reveal>
    </div>
  </section>
);

const SERVICES = [
  {
    n: "01", icon: Search, tag: "Strategy",
    title: "API Strategy & Architecture",
    intro: "Before a single endpoint is written, we map the systems, data flows and consumers your API has to serve — and design the contract that will hold up at scale.",
    blocks: [
      { h: "System & data flow audit", p: "Inventory every system, every data owner, every duplicated field. The map exposes the real integration problem hiding behind the symptoms." },
      { h: "REST vs GraphQL vs events", p: "We pick the right paradigm per use case — REST for resource CRUD, GraphQL for client-flexible reads, event streams for asynchronous workflows." },
      { h: "Versioning & contract design", p: "OpenAPI/Swagger specifications, semantic versioning policies and deprecation paths so the API can evolve without breaking consumers." },
    ],
  },
  {
    n: "02", icon: Code2, tag: "Custom APIs",
    title: "Custom REST & GraphQL API Development",
    intro: "Production APIs built on Node.js, Python (FastAPI/Django), or .NET — with the auth, validation, error handling and documentation that distinguish a real API from a prototype.",
    blocks: [
      { h: "Auth & RBAC", p: "OAuth 2.0, OIDC, JWT, API keys and role-based access control — implemented per the threat model your data actually has." },
      { h: "Rate limiting & quotas", p: "Per-tenant throttling, burst handling and quota enforcement so a single noisy consumer can't take the platform down." },
      { h: "Developer experience", p: "Auto-generated OpenAPI docs, Postman collections, sandbox environments and SDKs in the languages your consumers actually use." },
    ],
  },
  {
    n: "03", icon: Plug, tag: "3rd-Party",
    title: "Third-Party API Integration",
    intro: "Salesforce, HubSpot, NetSuite, SAP, Stripe, Shopify, QuickBooks, Twilio, SendGrid, Slack, Zoom, Google Workspace, Microsoft 365 — and the long tail of niche industry APIs.",
    blocks: [
      { h: "Bi-directional sync", p: "Conflict resolution, idempotency keys and retry logic so records stay consistent even when one side is down or slow." },
      { h: "Webhooks & event handling", p: "Signed webhook receivers with replay protection and dead-letter queues — the parts most teams forget until something silently breaks." },
      { h: "OAuth flows & token lifecycle", p: "Refresh handling, secret rotation, and the multi-tenant token storage that keeps long-lived integrations from expiring at 3am." },
    ],
  },
  {
    n: "04", icon: Workflow, tag: "Middleware",
    title: "Middleware, iPaaS & Integration Platforms",
    intro: "When the integration logic itself becomes a product, we build middleware layers — orchestration services, message buses and iPaaS configurations on Mulesoft, Boomi, Workato or custom infrastructure.",
    blocks: [
      { h: "Orchestration & ETL", p: "Step functions, workflow engines (Temporal, Airflow), and ETL pipelines for the data flows your downstream analytics and AI depend on." },
      { h: "Message queues & event buses", p: "RabbitMQ, Kafka, AWS SQS/SNS, Google Pub/Sub — durable asynchronous communication for high-throughput, decoupled architectures." },
      { h: "Legacy modernisation", p: "SOAP, EDI, SFTP and flat-file integrations wrapped in modern REST facades so legacy systems stop blocking new product work." },
    ],
  },
  {
    n: "05", icon: ShieldCheck, tag: "Security",
    title: "API Security & Compliance",
    intro: "APIs are the most exposed surface of any modern application. We design security in — not bolted on after a penetration test fails.",
    blocks: [
      { h: "OWASP API Top 10 hardening", p: "Broken object-level authorisation, mass assignment, excessive data exposure — the failure modes that account for the majority of real-world API breaches." },
      { h: "Encryption & secrets management", p: "TLS 1.3 in transit, field-level encryption at rest, and managed secret stores (AWS Secrets Manager, HashiCorp Vault) for credentials." },
      { h: "Compliance-ready", p: "PCI-DSS for payments, HIPAA for health data, GDPR for EU consumers and SOC 2 controls for enterprise sales — built into the platform, evidenced for audit." },
    ],
  },
  {
    n: "06", icon: Activity, tag: "Operations",
    title: "Monitoring, Observability & Lifecycle Management",
    intro: "An API isn't shipped when it's deployed — it's shipped when you can see exactly what it's doing in production and roll changes forward without breaking consumers.",
    blocks: [
      { h: "Logs, metrics & tracing", p: "Structured logging, Prometheus/Datadog metrics and OpenTelemetry distributed tracing across every service hop." },
      { h: "API gateway & catalog", p: "Kong, AWS API Gateway, Apigee — central enforcement of auth, rate limits and analytics, plus a developer portal for internal and external consumers." },
      { h: "SLAs & incident response", p: "Defined SLOs, alerting policies and on-call playbooks so production issues get resolved in minutes, not hours." },
    ],
  },
];

const ServicesGrid = () => (
  <section id="services" className="relative bg-background text-foreground py-32">
    <div className="container">
      <SectionLabel n="03" t="What we build" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
          Our API development<br />
          <span className="text-[#FF2E86]">& integration services.</span>
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
    { icon: Gauge, title: "From days to seconds", body: "An order placed in Shopify lands as a deal in HubSpot, an invoice in QuickBooks and a fulfilment ticket in NetSuite — automatically, atomically, with zero manual entry." },
    { icon: ShieldCheck, title: "Engineered for failure", body: "Every integration we ship has retries, circuit breakers, idempotency, and dead-letter queues. The third-party API will go down — your business shouldn't." },
    { icon: Network, title: "One contract, many consumers", body: "Well-versioned APIs let your web app, mobile app, partners and AI agents consume the same data without bespoke pipelines for each — that's where compounding leverage comes from." },
  ];

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
      <motion.div aria-hidden style={{ y }} className="absolute inset-0 grid place-items-center pointer-events-none">
        <span className="font-display text-[24vw] leading-none opacity-[0.04] tracking-tighter select-none">SYNC</span>
      </motion.div>

      <div className="container relative">
        <SectionLabel n="04" t="The advantage" />
        <motion.h2 style={{ x: headlineX }} className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20">
          Why integrated stacks<br />
          <span className="text-[#FF2E86]">outperform manual ones.</span>
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
    tag: "UK SaaS · Multi-system sync",
    metric: "18 hrs/wk",
    sub: "Recovered across ops team",
    title: "HubSpot ↔ Stripe ↔ NetSuite integration eliminates billing reconciliation.",
    body: "A UK B2B SaaS was reconciling subscriptions across HubSpot, Stripe and NetSuite manually every week. Our event-driven middleware (Node.js + AWS SQS + idempotent webhooks) made the three systems eventually consistent in under 30 seconds, with a reconciliation dashboard surfacing any drift for the finance team.",
  },
  {
    tag: "US Healthcare · HL7/FHIR API",
    metric: "12 EHRs",
    sub: "HIPAA-compliant FHIR layer",
    title: "FHIR API layer connects clinical platform to 12 EHR systems.",
    body: "A US healthtech needed to ingest patient records from a fragmented EHR landscape. Our FHIR-compliant API gateway (Python/FastAPI + AWS PrivateLink) normalised data from Epic, Cerner, Athenahealth and 9 others — unblocking the platform's national rollout and SOC 2 certification.",
  },
  {
    tag: "Dubai Retail · Omnichannel",
    metric: "0 → real-time",
    sub: "POS, ecommerce, ERP unified",
    title: "Custom integration platform unifies POS, Magento and SAP for retail group.",
    body: "A Dubai retail group ran nightly batch jobs that left store inventory 18 hours behind ecommerce. Our middleware (Kafka + .NET workers) pushed inventory and order events in real time across 240 SKUs and 14 stores — eliminating overselling and unlocking same-day click-and-collect.",
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
            API integration<br /><span className="text-[#FF2E86]">in practice.</span>
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
  { icon: Layers, h: "End-to-end integration team", p: "Architects, backend engineers, DevOps and security specialists in one pod. The hardest integration problems sit at the seams between disciplines — we own all of them." },
  { icon: Briefcase, h: "Commercial outcome focus", p: "Every integration we ship is justified by recovered hours, prevented errors or new revenue. We won't build what doesn't pay for itself." },
  { icon: Rocket, h: "Production-grade by default", p: "Observability, retries, idempotency, secrets rotation and runbooks come standard. We don't ship integrations that work on a happy path and fall over in production." },
  { icon: Cpu, h: "Vendor-neutral expertise", p: "AWS, GCP, Azure, Mulesoft, Boomi, Workato, Zapier, custom code — we recommend the right tool, not the one we have a partnership with." },
];

const Why = () => (
  <section className="relative bg-background text-foreground py-32">
    <div className="container">
      <SectionLabel n="06" t="Why Clickmasters" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
          Why teams choose us<br />
          <span className="text-[#FF2E86]">for API work.</span>
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
  { q: "What's the difference between API development and API integration?", a: "API development is building a new API — the endpoints, contracts, auth and data model that expose your system's capabilities to other systems. API integration is connecting existing APIs (yours or third-party) so two or more systems exchange data reliably. Most projects need both: a custom API plus integrations into the SaaS tools your business already runs on." },
  { q: "How long does an API integration project take?", a: "A focused two-system integration (e.g. Shopify → HubSpot with bi-directional contact sync) typically takes 3-6 weeks. A custom REST API for an internal product takes 8-16 weeks depending on the data model and auth complexity. An enterprise iPaaS rollout connecting 6+ systems with orchestration logic, governance and a developer portal typically takes 16-32 weeks." },
  { q: "How much does API development cost?", a: "Typical engagements: $8,000-$25,000 for a single third-party integration; $30,000-$100,000 for a custom REST/GraphQL API with auth, docs and SDKs; $100,000-$300,000+ for a full enterprise integration platform with middleware, governance and developer portal. We provide fixed-price proposals after a short discovery." },
  { q: "Can you work with our existing developers?", a: "Yes. We frequently embed alongside in-house teams — owning the integration layer, code review, architecture decisions, or specific work packages. We also hand off complete documentation, runbooks and tests so your team can take ownership at any point." },
  { q: "How do you handle security and compliance?", a: "All APIs are built against the OWASP API Security Top 10. We implement OAuth 2.0/OIDC, mTLS where required, field-level encryption, rate limiting and audit logging by default. For regulated workloads we deliver PCI-DSS, HIPAA, GDPR and SOC 2-aligned implementations with the evidence your auditors need." },
];

const Faqs = () => (
  <section className="relative bg-[#0a0a0a] text-white py-32">
    <div className="container max-w-4xl">
      <SectionLabel n="07" t="FAQs" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-16 tracking-tight">
          API development <span className="text-[#FF2E86]">FAQs.</span>
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
        <span className="font-display text-[22vw] leading-none opacity-[0.04] tracking-tighter select-none">CONNECT</span>
      </motion.div>

      <motion.div style={{ scale }} className="container relative max-w-5xl text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8">[ 08 ] — Ready when you are</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            Ready to make your stack<br />
            <em className="text-[#FF2E86] not-italic">behave like one product?</em>
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
            Tell us the systems that aren't talking to each other. We'll come
            back with the integration architecture, timeline and price that
            ends the manual workaround for good.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <a href="https://clickmastersdigitalmarketing.com/contact-us/"
              className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors">
              Plan my integration
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="/crm-integration-services"
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors">
              CRM Integration
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

const ApiDevelopmentIntegrationServices = () => {
  useSmoothScroll();

  useEffect(() => {
    document.title = "API Development & Integration Services | Clickmasters Digital Marketing";
    const desc =
      "Custom REST and GraphQL API development plus third-party integrations — Salesforce, HubSpot, Stripe, NetSuite, SAP and more. Production-grade, secure, observable.";
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

export default ApiDevelopmentIntegrationServices;
