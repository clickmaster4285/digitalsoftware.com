import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Navbar } from "@/components/site/Navbar";
import {
  Search, Database, Workflow, ShieldCheck, BarChart3, Users,
  ArrowUpRight, Check, Cpu, Layers, Briefcase, Rocket, Plug,
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
            [ Service · 10 ] — CRM Integration Services
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            Your CRM Should <br />
            Run the Business — Not <br />
            <span className="text-[#FF2E86]">Just Store Contacts.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-2xl text-lg md:text-xl opacity-70 leading-relaxed">
            A CRM that's disconnected from marketing, ecommerce, support and
            finance is just an expensive address book. We integrate Salesforce,
            HubSpot, Zoho, Pipedrive and Microsoft Dynamics into the centre of
            your operation — so every team works from a single source of truth.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4">
            <a href="#contact"
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors">
              Plan my CRM integration
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
              { k: "47%", v: "Avg. lead-to-close lift" },
              { k: "12 hrs", v: "Reps reclaim per week" },
              { k: "180+", v: "CRM rollouts shipped" },
              { k: "94%", v: "Adoption after launch" },
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
          When marketing can't see what sales closed, when support can't see
          what marketing promised, when finance is rebuilding pipeline reports
          <em className="text-[#FF2E86] not-italic"> in spreadsheets every Monday</em> —
          your CRM has become the bottleneck instead of the backbone.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-10 text-lg opacity-70 max-w-3xl leading-relaxed">
          A CRM is only as valuable as the systems it's connected to and the
          processes it actually runs. We integrate your CRM with the tools your
          revenue team uses every day — and configure the workflows, automations
          and reports that turn it into the operational nerve centre of the
          business.
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <p className="mt-6 text-lg opacity-70 max-w-3xl leading-relaxed">
          At <strong>Clickmasters Digital Marketing</strong>, our certified
          consultants design, integrate and support CRM implementations across
          Salesforce, HubSpot, Zoho, Pipedrive and Microsoft Dynamics 365 —
          built for the way your team actually sells, supports and reports.
        </p>
      </Reveal>
    </div>
  </section>
);

const SERVICES = [
  {
    n: "01", icon: Search, tag: "Discovery",
    title: "CRM Strategy, Audit & Selection",
    intro: "Before a single integration is built, we map your revenue process and choose the platform — or fix the one — that fits your sales motion, data model and growth horizon.",
    blocks: [
      { h: "Process & data audit", p: "Pipeline stages, lead routing rules, account hierarchies, custom fields and data quality. The audit usually surfaces the real problem behind 'CRM adoption'." },
      { h: "Platform selection", p: "Salesforce vs HubSpot vs Pipedrive vs Zoho vs Dynamics — recommended against your scale, budget, integration surface and reporting requirements." },
      { h: "Migration planning", p: "Field-level mapping, deduplication, historical data preservation and a cutover plan that doesn't lose a single open opportunity." },
    ],
  },
  {
    n: "02", icon: Plug, tag: "Integration",
    title: "Native & Custom CRM Integrations",
    intro: "Your CRM connected to marketing automation, ecommerce, ERP, billing, support, telephony and analytics — using native connectors where they work and custom middleware where they don't.",
    blocks: [
      { h: "Marketing & ads", p: "Mailchimp, Marketo, Pardot, ActiveCampaign, Google Ads, LinkedIn Ads, Meta — closed-loop attribution from ad click to closed deal." },
      { h: "Ecommerce & billing", p: "Shopify, WooCommerce, Magento, Stripe, QuickBooks, Xero — orders, invoices and customer LTV land in the CRM automatically." },
      { h: "Support & telephony", p: "Zendesk, Intercom, Freshdesk, Twilio, Aircall, RingCentral — full customer history including tickets and call recordings against every account." },
    ],
  },
  {
    n: "03", icon: Workflow, tag: "Automation",
    title: "Workflow Automation & Sales Process Design",
    intro: "We model your real sales process inside the CRM — lead routing, qualification scoring, approval flows, sequenced outreach and renewal triggers — so reps stop doing admin and start selling.",
    blocks: [
      { h: "Lead routing & SLAs", p: "Round-robin, territory and account-based routing with SLA timers and automatic escalation when a lead isn't actioned." },
      { h: "Sales playbooks", p: "Stage-gate checklists, automated tasks, email sequences and quote generation embedded in the deal record itself." },
      { h: "Quote-to-cash automation", p: "CPQ, e-signature (DocuSign, PandaDoc), automated invoicing and revenue recognition triggered by deal-stage transitions." },
    ],
  },
  {
    n: "04", icon: Database, tag: "Data",
    title: "Data Migration, Cleansing & Governance",
    intro: "Garbage in, garbage out is the single biggest reason CRM rollouts fail. We migrate, deduplicate and govern your data so the platform is trustworthy from day one.",
    blocks: [
      { h: "Migration", p: "Full data lift from legacy CRMs, spreadsheets or databases with field mapping, transformation and rollback safety nets." },
      { h: "Deduplication & enrichment", p: "Fuzzy-matching duplicates, third-party enrichment (Clearbit, ZoomInfo, Apollo) and standardisation rules that keep data clean over time." },
      { h: "Governance & permissions", p: "Role hierarchies, sharing rules, field-level security and audit logs — the controls finance, legal and security need before they sign off." },
    ],
  },
  {
    n: "05", icon: BarChart3, tag: "Analytics",
    title: "Dashboards, Reporting & Revenue Intelligence",
    intro: "Real-time dashboards for reps, managers and the C-suite — plus the underlying data model and BI integration that make the numbers actually trustworthy.",
    blocks: [
      { h: "Native CRM reporting", p: "Salesforce Reports & Dashboards, HubSpot Custom Reports, Zoho Analytics — configured around the metrics your business actually runs on." },
      { h: "BI integration", p: "Connecting CRM data into Power BI, Tableau, Looker or a data warehouse for blended reporting across CRM, finance and product." },
      { h: "Forecasting & pipeline analytics", p: "Weighted pipeline, conversion benchmarks, sales velocity and AI-assisted forecasting (Einstein, HubSpot AI) tied to your real definitions of stage." },
    ],
  },
  {
    n: "06", icon: Users, tag: "Adoption",
    title: "Training, Adoption & Ongoing Support",
    intro: "A CRM that nobody uses is the most expensive shelfware in the business. We invest as much in adoption as in build — because the rollout only counts if it sticks.",
    blocks: [
      { h: "Role-based training", p: "Tailored training for reps, managers, marketing, support and admins — recorded, documented and re-runnable for new hires." },
      { h: "Change management", p: "Stakeholder mapping, executive sponsorship, internal champions and the comms plan that turns 'mandated tool' into 'how we work'." },
      { h: "Managed support retainer", p: "Ongoing admin, enhancement requests, release management and quarterly reviews so the CRM evolves with the business — not against it." },
    ],
  },
];

const ServicesGrid = () => (
  <section id="services" className="relative bg-background text-foreground py-32">
    <div className="container">
      <SectionLabel n="03" t="What we deliver" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
          Our CRM integration<br />
          <span className="text-[#FF2E86]">services.</span>
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
    { icon: Database, title: "Single source of truth", body: "One customer record, fed by every system — marketing, ecommerce, support and finance — so every team is making decisions from the same numbers." },
    { icon: ShieldCheck, title: "Pipeline you can trust", body: "When deal stages, close dates and amounts are validated by automation, the forecast is real. No more Friday-afternoon spreadsheet revisions." },
    { icon: Workflow, title: "Sellers selling more, admin less", body: "Auto-logging, auto-routing, auto-quoting. The average rep we onboard recovers 8-12 hours per week — and puts them into actual selling." },
  ];

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden">
      <motion.div aria-hidden style={{ y }} className="absolute inset-0 grid place-items-center pointer-events-none">
        <span className="font-display text-[24vw] leading-none opacity-[0.04] tracking-tighter select-none">SCALE</span>
      </motion.div>

      <div className="container relative">
        <SectionLabel n="04" t="The advantage" />
        <motion.h2 style={{ x: headlineX }} className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20">
          Why integrated CRMs<br />
          <span className="text-[#FF2E86]">close more deals.</span>
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
    tag: "US SaaS · HubSpot ↔ Stripe",
    metric: "+47%",
    sub: "Lead-to-close conversion",
    title: "HubSpot rebuild and Stripe integration lifts conversion 47%.",
    body: "A US B2B SaaS was running HubSpot as a glorified inbox — no scoring, no routing, no closed-loop reporting. We rebuilt the data model, integrated Stripe and the product, automated lead scoring and routing, and gave leadership a real-time pipeline dashboard. Lead-to-close moved from 11% to 16.2% in two quarters.",
  },
  {
    tag: "UK Professional Services · Salesforce",
    metric: "12 hrs/wk",
    sub: "Recovered per consultant",
    title: "Salesforce + Xero integration eliminates weekly billing scramble.",
    body: "A UK consultancy was rebuilding utilisation and billing reports manually every week. Our Salesforce build (custom objects for engagements, native Xero integration, Conga Composer for SOWs) automated time-to-invoice end to end — and recovered roughly 12 hours per consultant per week of admin.",
  },
  {
    tag: "Dubai Real Estate · Zoho",
    metric: "94%",
    sub: "Sales team adoption at 90 days",
    title: "Zoho CRM rollout hits 94% adoption across 64-person sales floor.",
    body: "A Dubai property developer had failed two prior CRM rollouts. We co-designed the workflows with sales leadership, integrated PropertyFinder, Bayut, WhatsApp Business and the in-house buyer portal, and ran a structured adoption programme. Adoption hit 94% at 90 days; lead response time dropped from 4 hours to 11 minutes.",
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
            CRM integration<br /><span className="text-[#FF2E86]">in practice.</span>
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
  { icon: Layers, h: "Multi-platform expertise", p: "Salesforce, HubSpot, Zoho, Pipedrive and Microsoft Dynamics 365 — certified across all five. We pick the platform that fits your business, not the one we want to upsell." },
  { icon: Briefcase, h: "Revenue-team operators", p: "Our consultants come from sales, RevOps and marketing leadership backgrounds. We design workflows that real sellers will actually use, not theoretical processes that look good in a slide." },
  { icon: Rocket, h: "Adoption-first delivery", p: "Every rollout includes a structured adoption programme — training, champions, change management and 90-day usage analytics — so the platform survives launch." },
  { icon: Cpu, h: "Long-term partnership", p: "CRM is never 'done'. We offer admin retainers, enhancement sprints and quarterly business reviews so your platform evolves with your go-to-market." },
];

const Why = () => (
  <section className="relative bg-background text-foreground py-32">
    <div className="container">
      <SectionLabel n="06" t="Why Clickmasters" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
          Why teams choose us<br />
          <span className="text-[#FF2E86]">for CRM work.</span>
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
  { q: "Which CRM should we choose — Salesforce, HubSpot, Zoho, Pipedrive or Dynamics?", a: "It depends on the size of your revenue team, complexity of your sales motion, integration requirements and budget. HubSpot fits inbound-led B2B SMBs and mid-market with strong marketing alignment. Salesforce fits complex enterprise sales, regulated industries and businesses with deep customisation needs. Pipedrive fits sales-led SMBs that want simplicity. Zoho fits cost-sensitive teams needing a connected suite. Dynamics 365 fits Microsoft-heavy enterprises. We make the recommendation after a short discovery." },
  { q: "How long does a CRM integration take?", a: "A focused implementation (single CRM, 2-3 integrations, standard workflows, ≤30 users) typically takes 6-10 weeks. A mid-market rollout (custom data model, 6-10 integrations, workflow automation, training programme) takes 12-20 weeks. Enterprise Salesforce or Dynamics implementations with multi-cloud, CPQ, complex governance and 100+ users take 20-40+ weeks." },
  { q: "How much does CRM integration cost?", a: "Typical engagements: $8,000-$25,000 for SMB HubSpot or Pipedrive setup with key integrations; $25,000-$80,000 for mid-market Salesforce or HubSpot Enterprise rollouts; $80,000-$300,000+ for enterprise Salesforce, Dynamics or multi-cloud implementations. Licence costs are separate and depend on platform and seats." },
  { q: "Can you migrate data from our existing CRM or spreadsheets?", a: "Yes — migration is a standard part of every engagement. We map every field, transform data formats, deduplicate records, preserve historical activity (emails, calls, notes, deals) and run a parallel-cutover phase so nothing is lost. We provide rollback safety nets and post-migration data quality reports." },
  { q: "Do you provide ongoing support after launch?", a: "Yes. We offer admin and enhancement retainers covering daily admin, user management, new automation, integration maintenance, release adoption and quarterly business reviews. Most clients move from project to retainer at launch — CRM is never 'finished' and the platform vendors push major updates 3-4 times per year." },
];

const Faqs = () => (
  <section className="relative bg-[#0a0a0a] text-white py-32">
    <div className="container max-w-4xl">
      <SectionLabel n="07" t="FAQs" />
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-16 tracking-tight">
          CRM integration <span className="text-[#FF2E86]">FAQs.</span>
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
        <span className="font-display text-[22vw] leading-none opacity-[0.04] tracking-tighter select-none">CLOSE</span>
      </motion.div>

      <motion.div style={{ scale }} className="container relative max-w-5xl text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-8">[ 08 ] — Ready when you are</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            Ready to make your CRM<br />
            <em className="text-[#FF2E86] not-italic">earn its seat?</em>
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
            Tell us where your CRM is leaking deals, hours or trust. We'll come
            back with the integration, automation and adoption plan that turns
            it into the operational nerve centre of the business.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <a href="https://clickmastersdigitalmarketing.com/contact-us/"
              className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#FF2E86] hover:text-white transition-colors">
              Plan my CRM integration
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="/api-development-integration-services"
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors">
              API Development & Integration
            </a>
            <a href="/custom-software-development"
              className="inline-flex items-center gap-3 border border-foreground/20 px-7 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium hover:border-foreground/60 transition-colors">
              Custom Software Development
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

const CrmIntegrationServices = () => {
  useSmoothScroll();

  useEffect(() => {
    document.title = "CRM Integration Services | Salesforce · HubSpot · Zoho · Dynamics";
    const desc =
      "CRM integration and implementation across Salesforce, HubSpot, Zoho, Pipedrive and Microsoft Dynamics 365 — connected to your marketing, ecommerce, ERP and support stack.";
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

export default CrmIntegrationServices;
