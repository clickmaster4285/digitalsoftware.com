"use client";

import { ServicePage, type ServicePageData } from "@/components/site/ServicePage";
import {
  Search, Layers, Code2, Server, Plug, ShieldCheck,
  Cpu, Briefcase, Rocket, Boxes, Database, Workflow,
} from "lucide-react";

const data: ServicePageData = {
  meta: {
    title: "Custom Software Development Company | Clickmasters Digital Marketing",
    description:
      "Custom software development that solves what off-the-shelf systems can't discovery, architecture, build, integration and long-term ownership. USA · UK · UAE · Pakistan.",
  },
  hero: {
    eyebrow: "[ Service · 04 ] Custom Software Development",
    title: (
      <>
        Software Built Around <br />
        Your Business <br />
        <span className="text-[#FF2E86]">Not the Other Way Around.</span>
      </>
    ),
    subtitle:
      "Generic SaaS forces your operation into someone else's process. Custom software encodes your actual workflow, your actual data, and your actual competitive advantage into an asset you own.",
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
      "At Clickmasters Digital Marketing, we build custom software the way it should be built with rigorous discovery, clean architecture, modern stacks (Node.js, Python, .NET, React, PostgreSQL, AWS/Azure/GCP), and the long-term partnership that turns a one-off project into an evolving operational asset.",
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
        title: "Discovery & Requirements Engineering",
        intro:
          "Most software fails before a line of code is written because the problem was never properly understood.",
        blocks: [
          { h: "Stakeholder interviews & process mapping", p: "We interview everyone who touches the process from executives to end users and map the actual workflow, not the documented one. The gaps are where the value lives." },
          { h: "Technical feasibility & architecture", p: "Before committing to build, we validate that what you need is technically achievable, within budget, and we design the architecture that scales with you rather than against you." },
          { h: "ROI modelling & go/no-go recommendation", p: "Not every custom project makes sense. We model the ROI against SaaS alternatives and give you an honest recommendation including when the answer is 'don't build this'." },
        ],
      },
      {
        n: "02",
        icon: Layers,
        tag: "Architecture",
        title: "System Architecture & Design",
        intro:
          "Good architecture is invisible. Bad architecture is a tax on every feature you ever add.",
        blocks: [
          { h: "Microservices vs monolith decision", p: "We don't default to microservices because it's trendy. We choose the architecture that fits your scale, team size, and operational complexity and we document why." },
          { h: "Database design & data modelling", p: "Your data model is your business logic frozen in structure. We design for query performance, data integrity, and the flexibility to evolve without breaking everything." },
          { h: "API design & integration strategy", p: "Third-party integrations are not an afterthought. We design clean APIs from day one, with proper authentication, rate limiting, and error handling so your system plays well with others." },
        ],
      },
      {
        n: "03",
        icon: Code2,
        tag: "Development",
        title: "Full-Stack Development",
        intro:
          "Modern stacks, clean code, and the discipline to ship maintainable software.",
        blocks: [
          { h: "Frontend: React, Next.js, Vue", p: "We build responsive, accessible frontends that work across devices and browsers with state management, routing, and the performance characteristics your users expect." },
          { h: "Backend: Node.js, Python, .NET", p: "APIs, business logic, background workers, scheduled jobs whatever your backend needs, we build it with the right tool for the job, not the framework we're most comfortable with." },
          { h: "Database: PostgreSQL, MongoDB, Redis", p: "Relational for structured data, document for flexible schemas, in-memory for caching and queues. We use each where it makes sense and avoid the one-size-fits-all trap." },
        ],
      },
      {
        n: "04",
        icon: Server,
        tag: "Infrastructure",
        title: "Cloud Infrastructure & DevOps",
        intro:
          "Your software needs a home that scales, secures, and doesn't wake you up at 3am.",
        blocks: [
          { h: "AWS, Azure, GCP deployment", p: "We deploy to the cloud platform that fits your compliance, geographic, and cost requirements with Terraform/IaC so infrastructure is version-controlled and reproducible." },
          { h: "CI/CD pipelines & automated testing", p: "Every commit runs tests. Every PR requires approval. Deployments are automated and rollback-capable. We ship fast because we have confidence in our process." },
          { h: "Monitoring, logging & alerting", p: "We know when something breaks before you do with structured logging, metrics dashboards, and alerting that escalates appropriately based on severity." },
        ],
      },
      {
        n: "05",
        icon: Plug,
        tag: "Integration",
        title: "Third-Party Integrations",
        intro:
          "Your software doesn't live in isolation. It needs to talk to the systems you already use.",
        blocks: [
          { h: "CRM & sales tools", p: "Salesforce, HubSpot, Pipedrive, Zoho we sync contacts, deals, and activity so your sales team has a single source of truth." },
          { h: "Payment & billing", p: "Stripe, PayPal, Braintree, Adyen we implement subscriptions, invoicing, and the complex edge cases that payment processing always brings." },
          { h: "Communication & automation", p: "Slack, email, SMS, webhooks we build the notifications and automations that keep your users informed and your operations flowing." },
        ],
      },
      {
        n: "06",
        icon: ShieldCheck,
        tag: "Security",
        title: "Security & Compliance",
        intro:
          "Security is not a feature. It's the foundation on which everything else rests.",
        blocks: [
          { h: "Authentication & authorization", p: "OAuth 2.0, JWT, SAML, role-based access control we implement the right auth pattern for your use case, not the one we copied from a tutorial." },
          { h: "Data encryption & compliance", p: "Encryption at rest and in transit. GDPR, HIPAA, SOC 2 considerations baked in from design, not patched on before audit." },
          { h: "Security audits & penetration testing", p: "We don't guess at security. We run automated scans, conduct manual reviews, and engage third-party pen-testers for high-risk systems." },
        ],
      },
    ],
  },
  advantage: {
    bigWord: "OWN",
    heading: (
      <>
        Why custom beats<br />
        <span className="text-[#FF2E86]">off-the-shelf.</span>
      </>
    ),
    items: [
      { icon: Cpu, title: "Your workflow, not theirs", body: "Generic tools force your process into their data model. Custom software encodes your actual process the competitive advantage you've built through years of iteration." },
      { icon: Briefcase, title: "No subscription creep", body: "Three SaaS tools at $500/month each is $18,000/year. Forever. Custom software has an upfront cost, but you own the asset and the ongoing cost is maintenance, not rent." },
      { icon: Rocket, title: "Competitive moat", body: "Your competitors can subscribe to the same SaaS you use. They cannot copy the custom software that encodes your unique operational advantage." },
    ],
  },
  cases: {
    heading: (
      <>
        Custom software results<br />
        <span className="text-[#FF2E86]">in the real world.</span>
      </>
    ),
    items: [
      {
        tag: "Manufacturing · Custom ERP",
        metric: "60%",
        sub: "Ops time saved",
        title: "Custom ERP replaces 3 SaaS tools and 15 hours of weekly manual work.",
        body: "A mid-sized manufacturer was running operations on spreadsheets, email, and three disconnected SaaS tools. We built a custom ERP that unified inventory, production scheduling, and order management collapsing 15 hours of weekly coordination work into 6 hours of automated reporting. The system paid for itself in 14 months.",
      },
      {
        tag: "Healthcare · Patient Portal",
        metric: "40%",
        sub: "Admin reduction",
        title: "Patient portal eliminates phone tag and automates appointment scheduling.",
        body: "A specialty clinic was drowning in phone calls for appointment scheduling and prescription refills. We built a HIPAA-compliant patient portal with online booking, secure messaging, and automated refill requests reducing admin overhead by 40% and improving patient satisfaction scores by 35%.",
      },
      {
        tag: "Logistics · Route Optimisation",
        metric: "22%",
        sub: "Fuel cost reduction",
        title: "Custom route optimisation engine cuts delivery costs by 22%.",
        body: "A regional logistics company was using a generic routing tool that didn't account for their specific constraints (delivery windows, vehicle types, driver preferences). We built a custom optimisation engine that incorporated their real-world constraints cutting fuel costs by 22% and improving on-time delivery rates from 87% to 96%.",
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
      { icon: Boxes, h: "Discovery-first approach", p: "We don't start coding until we understand the problem. Our discovery phase is thorough, documented, and often includes a working prototype before we commit to full build." },
      { icon: Database, h: "Architecture that scales", p: "We design systems that grow with you not systems that hit a wall the moment you add a user or a feature. Technical debt is managed, not ignored." },
      { icon: Workflow, h: "Long-term partnership", p: "Custom software is not a one-and-done project. We offer ongoing support, feature development, and the partnership to evolve your system as your business evolves." },
    ],
  },
  faqs: {
    heading: (
      <>
        Custom software development <span className="text-[#FF2E86]">FAQs.</span>
      </>
    ),
    items: [
      { q: "How much does custom software cost?", a: "Small internal tools: $15,000–$50,000. Mid-sized business applications: $50,000–$200,000. Enterprise systems: $200,000–$1,000,000+. The range is wide because complexity varies wildly. We provide detailed scoping and fixed-price quotes before any commitment." },
      { q: "How long does it take?", a: "Simple tools: 2–4 months. Mid-sized applications: 4–9 months. Enterprise systems: 9–18 months. Timelines assume timely stakeholder feedback and clear requirements. Discovery typically adds 4–8 weeks to the front end but saves months of rework." },
      { q: "What happens after launch?", a: "We offer ongoing support retainers that include bug fixes, security updates, monitoring, and a pool of hours for feature development. You're not abandoned after launch we're your long-term technology partner." },
      { q: "Do we own the code?", a: "Yes. You own 100% of the code, IP, and assets we build for you. We provide source code access, documentation, and handover materials. You're never locked into working with us." },
      { q: "What if we need to add features later?", a: "That's the point. Custom software is designed to evolve. We build with clean architecture and documented code so that adding features whether by us or another team is straightforward, not a rewrite." },
    ],
  },
  cta: {
    bigWord: "BUILD",
    heading: (
      <>
        Stop compromising.<br />
        Start building <em className="text-[#FF2E86] not-italic">your advantage.</em>
      </>
    ),
    body: "Your business has workflows, data, and competitive advantages that no off-the-shelf tool can capture. Let's discuss what custom software could do for you with a free discovery consultation.",
    primary: { label: "Book discovery call", href: "https://clickmastersdigitalmarketing.com/contact-us/" },
    secondary: [
      { label: "Web Development", href: "/website-development-services" },
      { label: "Web App Development", href: "/web-application-development" },
    ],
  },
};

export default function CustomSoftwareDevelopmentPage() {
  return <ServicePage data={data} />;
}
