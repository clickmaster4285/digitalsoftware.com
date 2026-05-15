import { ServicePage, type ServicePageData } from "@/components/site/ServicePage";
import {
  Search, Layers, Code2, Server, Plug, ShieldCheck,
  Cpu, Briefcase, Rocket, Boxes, Database, Workflow,
} from "lucide-react";

const data: ServicePageData = {
  meta: {
    title: "Custom Software Development Company | Clickmasters Digital Marketing",
    description:
      "Custom software development that solves what off-the-shelf systems can't — discovery, architecture, build, integration and long-term ownership. USA · UK · UAE · Pakistan.",
  },
  hero: {
    eyebrow: "[ Service · 04 ] — Custom Software Development",
    title: (
      <>
        Software Built Around <br />
        Your Business — <br />
        <span className="text-[#FF2E86]">Not the Other Way Around.</span>
      </>
    ),
    subtitle:
      "Generic SaaS forces your operation into someone else's process. Custom software encodes your actual workflow, your actual data, and your actual competitive advantage — into an asset you own.",
    primaryCta: "Scope my software",
    secondaryCta: "See what we build",
    stats: [
      { k: "$48.60", v: "Avg CPC of demand" },
      { k: "12-18 mo", v: "Typical ROI" },
      { k: "60%", v: "Avg ops time saved" },
      { k: "100%", v: "Code & IP owned" },
    ],
  },
  intro: {
    lead: (
      <>
        When the SaaS subscription bill keeps climbing, when the workarounds
        consume your best people's time, when the integration gaps leak revenue —
        you have outgrown <em className="text-[#FF2E86] not-italic">renting other people's software</em>.
      </>
    ),
    paragraphs: [
      "Custom software is not a luxury for enterprises. It is the most cost-effective option the moment generic tools start dictating how your business operates rather than supporting how it already does. The right custom build collapses three SaaS subscriptions into one system, turns 15-hour weekly reporting into one click, and gives leadership the operational visibility no off-the-shelf dashboard could.",
      "At Clickmasters Digital Marketing, we build custom software the way it should be built — with rigorous discovery, clean architecture, modern stacks (Node.js, Python, .NET, React, PostgreSQL, AWS/Azure/GCP), and the long-term partnership that turns a one-off project into an evolving operational asset.",
    ],
  },
  services: {
    heading: (
      <>
        Our custom software<br />
        <span className="text-[#FF2E86]">development services.</span>
      </>
    ),
    items: [
      {
        n: "01",
        icon: Search,
        tag: "Discovery",
        title: "Problem Framing & Solution Design",
        intro:
          "Most custom software fails because the wrong thing was built. Our discovery process is what makes everything downstream work.",
        blocks: [
          { h: "Stakeholder & user interviews", p: "We talk to everyone who touches the workflow — leadership, operators, customers — surfacing the gap between how work is supposed to happen and how it actually happens." },
          { h: "Process & data mapping", p: "Documented as-is and to-be workflows, an entity/data model that captures the real shape of your business, and the integration map for every system the new software has to talk to." },
          { h: "ROI & build-vs-buy analysis", p: "An honest assessment of whether custom is the right answer — and a quantified ROI model showing payback period before any code is written." },
        ],
      },
      {
        n: "02",
        icon: Layers,
        tag: "Architecture",
        title: "Architecture & Technical Design",
        intro:
          "The decisions made in the first two weeks determine the cost-to-change for the next ten years. We make them deliberately.",
        blocks: [
          { h: "Stack selection on merit", p: "Node.js, Python (Django/FastAPI), .NET, Go, React/Next.js — chosen for fit with the problem, your team's future maintainability, and the ecosystem's maturity. Never for fashion." },
          { h: "Data model that scales", p: "PostgreSQL, MySQL, MongoDB, time-series stores — the data architecture that supports today's queries and tomorrow's analytics without a painful migration." },
          { h: "Cloud infrastructure design", p: "AWS, Azure or GCP infrastructure as code, designed for the cost profile, redundancy and compliance requirements your business actually has — not generic enterprise overkill." },
        ],
      },
      {
        n: "03",
        icon: Code2,
        tag: "Build",
        title: "Full-Stack Engineering",
        intro:
          "Senior engineers writing testable, documented, owner-friendly code — not contractors leaving you with a black box.",
        blocks: [
          { h: "Modern front-end", p: "React, Next.js or Vue front ends with proper state management, accessibility, and the design-system discipline that keeps the product coherent as it grows." },
          { h: "Robust APIs & services", p: "REST and GraphQL APIs, event-driven services, background workers and scheduled jobs — engineered for the load profile and reliability your business needs." },
          { h: "Testing as standard", p: "Unit tests, integration tests, end-to-end Playwright/Cypress flows for the user journeys that matter. Every release passes the suite before deployment." },
        ],
      },
      {
        n: "04",
        icon: Plug,
        tag: "Integration",
        title: "Systems Integration",
        intro:
          "The integrations are usually where custom software actually pays for itself — by killing the manual data shuffling between disconnected tools.",
        blocks: [
          { h: "ERP & accounting", p: "NetSuite, SAP, Sage, QuickBooks, Xero — bidirectional sync of invoices, customers, inventory and orders so your finance team works in one place, not three." },
          { h: "CRM & marketing stack", p: "Salesforce, HubSpot, Pipedrive, Mailchimp, Klaviyo — clean data flowing both ways, with the field mapping and sync logic that doesn't break when someone adds a custom field." },
          { h: "Payments, comms & logistics", p: "Stripe, Adyen, Twilio, SendGrid, Shippo, carrier APIs — production-grade integration with retry logic, webhook handling, and the observability to debug when a third party hiccups." },
        ],
      },
      {
        n: "05",
        icon: Workflow,
        tag: "Internal tools",
        title: "Internal Tools & Workflow Automation",
        intro:
          "The single highest-ROI category of custom software: tools that replace spreadsheets, email chains and manual handoffs with a system that just works.",
        blocks: [
          { h: "Operations dashboards", p: "Real-time visibility into the metrics your team actually steers by — pulled live from your source systems, not refreshed weekly from a stale CSV." },
          { h: "Workflow & approval engines", p: "Configurable approval chains, SLAs, escalations and audit trails for the processes that today live in someone's head and a Slack thread." },
          { h: "Admin & back-office tooling", p: "The unsexy CRUD interfaces that customer support, finance and operations need — built to be fast and pleasant, because a slow internal tool is an expensive one." },
        ],
      },
      {
        n: "06",
        icon: ShieldCheck,
        tag: "Security & DevOps",
        title: "Security, DevOps & Long-term Support",
        intro:
          "Custom software is an asset that needs to be operated, not just built. We handle the operations too.",
        blocks: [
          { h: "Security by design", p: "OWASP Top 10 prevention baked in, role-based access control, encrypted secrets, audit logging — plus penetration testing for sensitive applications." },
          { h: "CI/CD & cloud ops", p: "Automated pipelines, infrastructure as code, blue/green deployments, monitoring and alerting — the operational maturity that keeps the system reliable at 3am." },
          { h: "Evolution partnership", p: "After launch, we stay on as a product partner — shipping new features, refactoring debt, and growing the system as your business does. Not handing you a zip file and disappearing." },
        ],
      },
    ],
  },
  advantage: {
    bigWord: "OWN",
    heading: (
      <>
        Why custom outperforms<br />
        <span className="text-[#FF2E86]">SaaS at scale.</span>
      </>
    ),
    items: [
      { icon: Briefcase, title: "True cost crosses over fast", body: "Three SaaS subscriptions at $400/seat across 80 users is $1.1M/year. A purpose-built system that does all three, fits your workflow, and removes the manual integration work between them, often pays back in 12–18 months — and costs only its maintenance line after that." },
      { icon: ShieldCheck, title: "You own the data and the IP", body: "Every SaaS dependency is a commercial relationship that can change — pricing, terms, ownership, even existence. Custom software is an owned asset on your balance sheet, with code, data and operational logic that no vendor can take away." },
      { icon: Cpu, title: "Differentiated process at scale", body: "If the way you operate is part of your competitive advantage, generic software flattens it into the same workflow your competitors run. Custom software lets you scale the process that actually makes you better — without forcing it into someone else's UI." },
    ],
  },
  cases: {
    heading: (
      <>
        Custom software<br />
        <span className="text-[#FF2E86]">in production.</span>
      </>
    ),
    items: [
      {
        tag: "USA Logistics · Operations platform",
        metric: "60%",
        sub: "Operations time eliminated",
        title: "Replaced 4 SaaS tools and a wall of spreadsheets with one operations platform.",
        body: "A US logistics broker was juggling a TMS, a separate quoting tool, QuickBooks, and a tangle of spreadsheets to run daily operations. Our custom platform (Next.js + Python + PostgreSQL on AWS) unified quoting, dispatch, carrier scoring, invoicing and finance sync. Operations team time per shipment fell 60%; gross margin per load improved 4.2 points within 6 months of rollout.",
      },
      {
        tag: "UK Healthcare · Clinical workflow SaaS",
        metric: "$2.1M ARR",
        sub: "Built from MVP in 14 mo",
        title: "From specialist's spreadsheet to a $2.1M ARR clinical SaaS in 14 months.",
        body: "A UK clinical specialist had a workflow other practices were paying her to run manually. We built her a multi-tenant SaaS — Stripe billing, role-based access, audit logging, NHS-compatible data handling — and helped scope the go-to-market. 14 months later: 41 paying practices, $2.1M ARR, and a product roadmap funded by customers, not investors.",
      },
      {
        tag: "UAE Real Estate · Investor portal",
        metric: "−45%",
        sub: "Sales overhead per investor",
        title: "Investor portal collapses 6 emails, 3 PDFs and a spreadsheet into one experience.",
        body: "A Dubai property developer was supporting 1,200+ international investors through email, attachments and Salesforce notes. Our custom portal (React + Node.js + Salesforce sync) gave each investor a personalised dashboard — payment schedules, construction updates, document vault, automated reminders. Sales team overhead per investor dropped 45%; customer satisfaction climbed sharply on transparency alone.",
      },
    ],
  },
  why: {
    heading: (
      <>
        Why teams choose us<br />
        <span className="text-[#FF2E86]">for custom software.</span>
      </>
    ),
    items: [
      { icon: Boxes, h: "Discovery that prevents the wrong build", p: "We turn down projects when discovery shows custom isn't the right answer. The discomfort of an honest conversation up front is much cheaper than a built-but-wrong system later." },
      { icon: Database, h: "Data architecture done right the first time", p: "Most legacy custom software fails at the data layer. Our designs anticipate the queries, integrations and analytics you'll need 3 years from now — not just the features you asked for in week one." },
      { icon: Rocket, h: "Engineered for owners, not contractors", p: "Documented code, standard frameworks, infrastructure as code, runbooks. Any competent engineer can pick up what we built and continue — because that's what ownership actually means." },
      { icon: Briefcase, h: "Commercial mindset", p: "We treat your custom software as an investment with an ROI, not a project with a deliverable. Every feature decision is a return-on-investment decision, and we'll push back when one doesn't pencil out." },
    ],
  },
  faqs: {
    heading: (
      <>
        Custom software <span className="text-[#FF2E86]">FAQs.</span>
      </>
    ),
    items: [
      { q: "How long does custom software development take?", a: "Discovery typically runs 2–4 weeks. A focused internal tool (single workflow, 3–5 user roles, standard integrations) typically launches in 12–20 weeks. A multi-tenant SaaS or customer-facing product with billing, complex roles and several integrations typically takes 20–40 weeks. Enterprise systems with regulatory compliance and deep integrations run 40–60+ weeks. We always work in deployable milestones rather than one big-bang launch." },
      { q: "What does custom software cost?", a: "Discovery engagements are typically $5,000–$15,000 and produce a fixed-price proposal for the build. Internal tools and workflow systems usually fall in the $30,000–$100,000 range. Customer-facing SaaS products typically run $80,000–$300,000 to first revenue-ready version. Enterprise platforms with complex integrations can exceed $500,000. We provide written fixed-price quotes after discovery so there are no surprises." },
      { q: "Do we own the code and IP?", a: "Yes — completely. All source code, infrastructure definitions, designs, documentation and data are yours from day one, delivered into your own Git repository and cloud accounts. We sign IP assignment as standard. There is no vendor lock-in to us." },
      { q: "What about ongoing maintenance after launch?", a: "We offer evolution retainers covering security patching, dependency updates, monitoring, bug fixes and a budget of development hours each month for new features. Most clients stay on a retainer because their custom software keeps growing as their business does. You can also take the code in-house at any time — we'll do the handover properly." },
      { q: "Can you work with our existing team / take over an existing system?", a: "Yes. We frequently augment in-house teams (working in your repo, your sprints, your standups) and we take over inherited custom systems regularly. The first step on a takeover is always a written technical audit so you know exactly what you have before any new work begins." },
    ],
  },
  cta: {
    bigWord: "BUILD",
    heading: (
      <>
        Ready to stop renting<br />
        and start <em className="text-[#FF2E86] not-italic">owning?</em>
      </>
    ),
    body: "The SaaS limitations you've been living with, the integration gap that costs you a person every quarter, the product idea your customers keep asking for — they all deserve a real conversation. Let's have it.",
    primary: { label: "Book a discovery call", href: "https://clickmastersdigitalmarketing.com/contact-us/" },
    secondary: [
      { label: "Web App Development", href: "/web-application-development" },
      { label: "SaaS Development", href: "https://clickmastersdigitalmarketing.com/saas-development/" },
    ],
  },
};

const CustomSoftwareDevelopment = () => <ServicePage data={data} />;
export default CustomSoftwareDevelopment;
