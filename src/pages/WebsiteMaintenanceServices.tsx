import { ServicePage, type ServicePageData } from "@/components/site/ServicePage";
import {
  ShieldCheck, Gauge, RefreshCw, Bug, Database, LifeBuoy,
  Lock, Activity, Zap, Layers, Clock, Award, HeartPulse, Wrench,
} from "lucide-react";

const data: ServicePageData = {
  meta: {
    title: "Website Maintenance Services Company | Clickmasters Digital Marketing",
    description:
      "Proactive website maintenance services — security patching, uptime monitoring, performance, backups and content updates. Stop firefighting and protect your revenue.",
  },
  hero: {
    eyebrow: "[ Service · 03 ] — Website Maintenance Services",
    title: (
      <>
        Your Website Is a Living Asset. <br />
        <span className="text-[#FF2E86]">Treat It Like One.</span>
      </>
    ),
    subtitle:
      "Most websites quietly decay — outdated plugins, broken forms, slow pages, accumulating security debt. Our maintenance retainers keep your site fast, secure, and revenue-ready every single day.",
    primaryCta: "Protect my site",
    secondaryCta: "See what we cover",
    stats: [
      { k: "99.98%", v: "Uptime delivered" },
      { k: "<2 hr", v: "Critical response" },
      { k: "0", v: "Hacked sites in 5 yrs" },
      { k: "180+", v: "Sites under retainer" },
    ],
  },
  intro: {
    lead: (
      <>
        A website left unmaintained is not stable — it is{" "}
        <em className="text-[#FF2E86] not-italic">slowly failing</em> in ways
        you only notice when it costs you a customer, a ranking, or a breach.
      </>
    ),
    paragraphs: [
      "Plugins drift out of date. Core platforms ship security patches you never apply. Image libraries balloon. Forms quietly stop sending. Page speed degrades. Search rankings slip. And when an attacker finally finds the unpatched plugin, the cleanup costs ten times what proactive maintenance would have.",
      "At Clickmasters Digital Marketing, our maintenance team treats your website as the operational asset it is — with weekly patching cycles, real-time monitoring, daily backups, performance tuning, and the human bandwidth to ship the small content and design updates your team needs without burning a day waiting in a queue.",
    ],
  },
  services: {
    heading: (
      <>
        Our website maintenance<br />
        <span className="text-[#FF2E86]">services.</span>
      </>
    ),
    items: [
      {
        n: "01",
        icon: ShieldCheck,
        tag: "Security",
        title: "Security Patching & Hardening",
        intro:
          "Outdated software is the #1 cause of website compromise. We close that gap before attackers find it.",
        blocks: [
          { h: "Weekly patch cycles", p: "WordPress core, themes, plugins, Node modules — patched on a tested staging environment, then promoted to production with rollback ready." },
          { h: "Hardening as standard", p: "WAF rules, login throttling, file permission audits, disabled XML-RPC, 2FA enforcement and CSP headers — applied across every site under our care." },
          { h: "Malware scanning & removal", p: "Daily integrity scans, immediate remediation if anything is detected, and a forensic report explaining exactly how it got in and how it was sealed off." },
        ],
      },
      {
        n: "02",
        icon: Activity,
        tag: "Monitoring",
        title: "Uptime, Performance & Error Monitoring",
        intro:
          "We watch your site so you don't have to — and we know about problems before your customers do.",
        blocks: [
          { h: "60-second uptime checks", p: "Multi-region pinging from 6 global locations. SMS and email alerts the moment a check fails, with on-call escalation for critical clients." },
          { h: "Core Web Vitals tracking", p: "Continuous LCP, INP and CLS monitoring against Google's thresholds — with alerts when a deployment or third-party script regresses real-user performance." },
          { h: "JavaScript error capture", p: "Sentry-class client-side error tracking so the broken checkout step or quiet form failure surfaces in our queue, not just in your bounce rate." },
        ],
      },
      {
        n: "03",
        icon: Database,
        tag: "Backups",
        title: "Backups, Restore & Disaster Recovery",
        intro:
          "Backups are useless if they aren't recent, complete, and tested. Ours are all three.",
        blocks: [
          { h: "Daily off-site backups", p: "Full file + database backups encrypted and stored in geographically separate cloud storage — never on the same server as the live site." },
          { h: "30-day retention", p: "Point-in-time restore for the last 30 days as standard, longer retention available — so you can recover from a bad deployment or content edit, not just a catastrophic failure." },
          { h: "Quarterly restore drills", p: "We actually test restores on staging every quarter. A backup you have never restored is a backup you do not have." },
        ],
      },
      {
        n: "04",
        icon: Gauge,
        tag: "Performance",
        title: "Performance Tuning & Speed Optimisation",
        intro:
          "Speed is a ranking factor, a conversion factor, and a brand-perception factor. We protect all three.",
        blocks: [
          { h: "Image & asset optimisation", p: "Automatic WebP/AVIF conversion, responsive image generation, lazy loading and font-display tuning baked into every site we maintain." },
          { h: "Caching & CDN management", p: "Page caching, object caching, edge caching via Cloudflare or BunnyCDN — configured for your traffic profile, not generic defaults." },
          { h: "Database optimisation", p: "Periodic table optimisation, transient cleanup, autoload bloat removal, and query review for the slow pages our monitoring flags." },
        ],
      },
      {
        n: "05",
        icon: Wrench,
        tag: "Content & dev",
        title: "Content Updates & Small Dev Requests",
        intro:
          "The small changes that pile up — copy edits, new pages, blog posts, design tweaks — handled by the same team that knows your site.",
        blocks: [
          { h: "Included monthly hours", p: "Every retainer includes a pool of dev/content hours. Use them for new landing pages, copy updates, blog publishing, image swaps, banner promotions, or whatever your marketing calendar demands." },
          { h: "Same-day turnaround", p: "Most small requests are completed the same business day. No tickets gathering dust. No 'we'll get to it next sprint.'" },
          { h: "Ongoing UX improvements", p: "We don't just react — we proactively suggest small UX, SEO and conversion improvements based on the analytics we already monitor for you." },
        ],
      },
      {
        n: "06",
        icon: LifeBuoy,
        tag: "Support",
        title: "Priority Support & Emergency Response",
        intro:
          "When something is on fire, you need a human who knows your stack — answering immediately, not opening a ticket.",
        blocks: [
          { h: "Direct Slack / WhatsApp channel", p: "A shared channel with your assigned engineers — no ticket portal, no support queue, no script. Just the people who built and maintain your site." },
          { h: "Critical response SLA", p: "Site down or revenue-impacting issues: response within 2 hours, 24/7. Standard requests: same business day. Documented and contractual, not aspirational." },
          { h: "Post-incident reports", p: "Every critical incident closes with a written report: what happened, why it happened, what we did, and what we changed so it cannot happen again." },
        ],
      },
    ],
  },
  advantage: {
    bigWord: "PROTECT",
    heading: (
      <>
        Why proactive beats<br />
        <span className="text-[#FF2E86]">reactive every time.</span>
      </>
    ),
    items: [
      { icon: Lock, title: "Security debt compounds silently", body: "Every unpatched month adds known vulnerabilities to your attack surface. By the time you notice, attackers have a menu of options — and recovery from a real breach (data loss, SEO blacklisting, legal exposure) typically costs 10–20× a year of preventive maintenance." },
      { icon: Zap, title: "Performance erodes invisibly", body: "Page speed degrades fraction-of-a-second by fraction-of-a-second as content grows, plugins update, and third-party scripts pile on. By the time it's slow enough to feel, you've already lost ranking, conversion rate, and ad-quality scores you'll spend months rebuilding." },
      { icon: Clock, title: "Reactive work always costs more", body: "An emergency at 11pm on a Friday costs more than a planned change on a Tuesday morning. A panicked rebuild after a breach costs more than monthly hardening. Maintenance is the cheapest form of website work — every other path is more expensive." },
    ],
  },
  cases: {
    heading: (
      <>
        Maintenance results<br />
        <span className="text-[#FF2E86]">in the real world.</span>
      </>
    ),
    items: [
      {
        tag: "UK E-commerce · WooCommerce",
        metric: "+38%",
        sub: "Conversion lift in 90 days",
        title: "Performance retainer turns a slow Woo store into the highest-converting channel.",
        body: "A UK home goods brand was running a 6-second mobile load time on a plugin-heavy WooCommerce store. Within 90 days of moving onto our retainer — image pipeline, plugin audit (removed 14, replaced 3), object caching and theme refactor — mobile LCP dropped to 1.4s and conversion rate climbed 38%. No new traffic, no new ad spend.",
      },
      {
        tag: "US SaaS · WordPress + Webflow",
        metric: "0 incidents",
        sub: "Across 2.4M sessions / 18 mo",
        title: "Zero downtime, zero security incidents across 18 months and 2.4M sessions.",
        body: "A US SaaS marketing site moved off a hosting-provided 'maintenance' plan after their second compromise in a year. Under our retainer, weekly patching, hardened headers, WAF tuning and a real backup regime delivered 18 months and 2.4M sessions with zero security incidents and 99.98% uptime — measured by their own third-party monitor.",
      },
      {
        tag: "Dubai Hospitality · Custom CMS",
        metric: "22 hrs/mo",
        sub: "Marketing time freed up",
        title: "Marketing team stops touching code. Output triples.",
        body: "A Dubai hotel group's marketing team was spending ~22 hours a month wrestling with a custom CMS to publish offers and seasonal pages. Under our retainer, a content-changes-included scope means they email the brief and we ship the page same-day. Output of campaign landing pages tripled in the first quarter; marketing reclaimed two days a month.",
      },
    ],
  },
  why: {
    heading: (
      <>
        Why teams choose us<br />
        <span className="text-[#FF2E86]">to maintain their site.</span>
      </>
    ),
    items: [
      { icon: HeartPulse, h: "Real engineers, not scripts", p: "Your retainer is staffed by named senior developers who know your stack — not an offshore queue running automated update scripts that break things at 2am and leave you to find out." },
      { icon: Layers, h: "Stack-agnostic", p: "WordPress, WooCommerce, Shopify, Webflow, custom React/Next.js, headless CMS — we maintain them all to the same standard, with the same monitoring, patching and backup discipline." },
      { icon: Award, h: "Measured, reported, transparent", p: "Monthly reports cover uptime, performance, patches applied, hours used, threats blocked and improvements shipped. You always know what you're paying for." },
      { icon: RefreshCw, h: "We inherit messy sites", p: "Most sites that come to us are inherited problems — overgrown plugins, undocumented custom code, broken backups. We do the audit, the cleanup and the documentation as standard onboarding work." },
    ],
  },
  faqs: {
    heading: (
      <>
        Website maintenance <span className="text-[#FF2E86]">FAQs.</span>
      </>
    ),
    items: [
      { q: "What does a maintenance retainer cost?", a: "Retainers start around $250/month for a brochure WordPress site (security, backups, monitoring, minor content updates), $600–$1,500/month for typical business sites with ongoing content and dev needs, and $2,000–$5,000+/month for high-traffic e-commerce, multisite installs and SaaS marketing sites with stricter SLAs and larger development pools." },
      { q: "What CMS and stacks do you maintain?", a: "WordPress and WooCommerce, Shopify and Shopify Plus, Webflow, Drupal, headless CMS setups (Sanity, Contentful, Strapi), and custom React/Next.js applications. If your stack isn't listed, ask — we have likely worked on it." },
      { q: "How fast do you respond to issues?", a: "Critical issues (site down, checkout broken, security incident): response within 2 hours, 24/7. High priority (a key page or feature broken): same business day. Standard requests (content updates, small dev): same or next business day. SLAs are written into every retainer." },
      { q: "Do you handle hosting too?", a: "We can. We partner with Kinsta, WP Engine, Cloudways, and AWS depending on your needs — managing the relationship, billing and tuning. Or we'll happily maintain your site on the host you already use." },
      { q: "What happens if my site gets hacked?", a: "If you're under our retainer and a compromise occurs, cleanup, restoration and root-cause analysis are included — no surprise invoice. We restore from a clean backup, identify the entry point, close it, and ship a written incident report. We have not lost a site under retainer to a permanent compromise in over five years." },
    ],
  },
  cta: {
    bigWord: "CARE",
    heading: (
      <>
        Stop firefighting.<br />
        Start <em className="text-[#FF2E86] not-italic">protecting</em> your site.
      </>
    ),
    body: "Your website earns money, generates leads, and represents your brand. It deserves the same operational discipline you give the rest of your business. Book a free maintenance audit and we'll show you exactly what your site needs.",
    primary: { label: "Get a free audit", href: "https://clickmastersdigitalmarketing.com/contact-us/" },
    secondary: [
      { label: "Website Development", href: "https://clickmastersdigitalmarketing.com/website-development-services/" },
      { label: "Web App Development", href: "/web-application-development" },
    ],
  },
};

const WebsiteMaintenanceServices = () => <ServicePage data={data} />;
export default WebsiteMaintenanceServices;
