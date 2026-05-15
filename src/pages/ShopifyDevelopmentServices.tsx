import { ServicePage, type ServicePageData } from "@/components/site/ServicePage";
import {
  Store, Palette, ShoppingBag, Plug, Zap, ShieldCheck,
  Globe, Layers, Gauge, Sparkles, Rocket, Code2,
} from "lucide-react";

const data: ServicePageData = {
  meta: {
    title: "Shopify Development Services Company | Clickmasters Digital Marketing",
    description:
      "Shopify and Shopify Plus development — custom themes, headless storefronts, custom apps, Shopify Plus migrations and conversion-focused builds.",
  },
  hero: {
    eyebrow: "[ Service · 06 ] — Shopify Development Services",
    title: (
      <>
        Shopify Stores That <br />
        Don't Look (or Convert) Like <br />
        <span className="text-[#FF2E86]">Every Other Shopify Store.</span>
      </>
    ),
    subtitle:
      "Shopify is the world's best managed e-commerce platform. We're the team that makes it look custom, perform like a headless build, and convert like a paid landing page — without the maintenance burden of a custom platform.",
    primaryCta: "Plan my Shopify build",
    secondaryCta: "See what we ship",
    stats: [
      { k: "+62%", v: "Avg conv lift on rebuilds" },
      { k: "95+", v: "PageSpeed standard" },
      { k: "Plus", v: "Certified partners" },
      { k: "150+", v: "Stores shipped" },
    ],
  },
  intro: {
    lead: (
      <>
        Most Shopify stores are 80% the same theme everyone else uses, lightly recoloured.
        Shopify deserves better — and so does <em className="text-[#FF2E86] not-italic">your conversion rate</em>.
      </>
    ),
    paragraphs: [
      "Shopify gives you the world's best managed e-commerce infrastructure: hosted, secure, fast checkout, payments handled, scaling solved. What it does not give you — out of the box — is a brand that feels like yours, a product page engineered for your buyer's actual decision, or the integration depth your operation runs on. That part is the build.",
      "At Clickmasters Digital Marketing, we are Shopify and Shopify Plus partners building custom themes, headless storefronts, custom apps, B2B and wholesale builds, and migration projects from WooCommerce, Magento and BigCommerce. We design, develop and optimise — and we do not ship a store that doesn't beat the version it replaced.",
    ],
  },
  services: {
    heading: (
      <>
        Our Shopify<br />
        <span className="text-[#FF2E86]">development services.</span>
      </>
    ),
    items: [
      {
        n: "01",
        icon: Palette,
        tag: "Custom themes",
        title: "Custom Shopify Theme Development",
        intro:
          "A genuinely custom theme — designed for your brand, your product and your buyer — built natively on Shopify's modern architecture.",
        blocks: [
          { h: "Built on Online Store 2.0", p: "Native sections-everywhere architecture, JSON templates, app blocks and theme settings designed so your marketing team can ship campaigns and seasonal pages without a developer in the loop." },
          { h: "Conversion-first product pages", p: "Product page layouts designed around the actual purchase decision your buyer is making — variants, social proof, badges, urgency, sizing tools, bundling — not a generic 'image-left, info-right' template." },
          { h: "Performance baked in", p: "Lazy loading, responsive image generation, deferred third-party scripts, font subsetting and the section-by-section performance discipline that keeps Lighthouse scores in the 90s where most themes sit in the 40s." },
        ],
      },
      {
        n: "02",
        icon: Layers,
        tag: "Headless",
        title: "Headless Shopify (Hydrogen / Next.js)",
        intro:
          "When the storefront experience demands more than Liquid can express — interactive product configurators, content-heavy editorial commerce, native-app feel — we go headless.",
        blocks: [
          { h: "Hydrogen & Oxygen builds", p: "Shopify's React-based Hydrogen framework deployed on Oxygen — the official path to headless that keeps you fully inside the Shopify ecosystem (admin, checkout, apps) without giving any of it up." },
          { h: "Next.js + Storefront API", p: "When the project needs the broader Next.js ecosystem (multi-region deployments, deep CMS integration, marketplace experiences), we build on Next.js consuming Shopify's Storefront and Admin GraphQL APIs." },
          { h: "Editorial commerce", p: "Headless lets us blend content and commerce — magazine-style storytelling around products, expert content embedded in PDPs, and the conversion path engineered through both." },
        ],
      },
      {
        n: "03",
        icon: Code2,
        tag: "Custom apps",
        title: "Custom Shopify Apps & Functions",
        intro:
          "When the App Store doesn't have what you need — or has it but with the wrong tradeoffs — we build it. Properly.",
        blocks: [
          { h: "Public & private apps", p: "Built on Shopify's modern app framework (Remix + App Bridge), embedded into the merchant admin with proper OAuth, webhooks, billing API and the security posture Shopify requires." },
          { h: "Shopify Functions", p: "Custom discount logic, custom checkout validations, custom payment customisations and custom delivery rules — written in Rust/JS and shipped via Shopify Functions for the discount and checkout extensibility that used to require Plus scripts." },
          { h: "Checkout UI extensions", p: "Adding fields, upsells, content blocks, gift options and custom logic to Shopify's checkout — using the supported Checkout UI Extensions API rather than fragile workarounds." },
        ],
      },
      {
        n: "04",
        icon: Store,
        tag: "Shopify Plus",
        title: "Shopify Plus & B2B",
        intro:
          "For brands at scale and for B2B businesses, Shopify Plus unlocks capabilities the standard plan can't — and we know exactly how to use them.",
        blocks: [
          { h: "Shopify Plus migrations", p: "From Magento, WooCommerce, BigCommerce or legacy custom platforms — full data migration (products, customers, orders), redirect mapping that preserves SEO, and a phased cut-over plan that protects revenue." },
          { h: "B2B on Shopify", p: "Native Shopify B2B with company accounts, location-level catalogues, customer-specific price lists, payment terms, and the wholesale ordering experience trade buyers actually expect." },
          { h: "Markets & internationalisation", p: "Shopify Markets configuration for multi-region selling — currencies, languages, domains, pricing rules and tax handling — without the complexity of running multiple stores." },
        ],
      },
      {
        n: "05",
        icon: Plug,
        tag: "Integrations",
        title: "Integrations & Operational Stack",
        intro:
          "A Shopify store at real volume needs real integrations into the systems that run the business — not a pile of brittle Zaps.",
        blocks: [
          { h: "ERP & accounting", p: "NetSuite, Xero, QuickBooks, Sage — automated order, invoice, customer and inventory sync built natively or through proven middleware (Celigo, Patchworks) with the field mapping and conflict logic that holds up at scale." },
          { h: "ESP, CRM & loyalty", p: "Klaviyo, Mailchimp, HubSpot, Yotpo, LoyaltyLion, Smile.io, Gorgias — clean event mapping and identity resolution so your marketing and CX stack actually has the data it needs." },
          { h: "Inventory, 3PL & shipping", p: "Linnworks, Brightpearl, ShipStation, ShipBob, Shippo, carrier-direct APIs and 3PL-specific connectors — with real-time inventory and rate quoting where the operation requires it." },
        ],
      },
      {
        n: "06",
        icon: Gauge,
        tag: "CRO & performance",
        title: "Conversion Optimisation & Performance",
        intro:
          "Most Shopify stores leak money in the same places — slow PDPs, friction-filled checkouts, weak mobile experiences. We fix what is leaking.",
        blocks: [
          { h: "Speed engineering", p: "Theme refactor, third-party app audit (most stores carry 8+ apps doing nothing useful), image pipeline rebuild, deferred script loading and the Liquid-level optimisation that lifts Lighthouse and PSI scores meaningfully." },
          { h: "Conversion optimisation", p: "Heuristic and analytics-led CRO on PDPs, collection pages, cart and checkout — backed by structured A/B testing where the traffic supports it. Most engagements deliver double-digit conversion lift in the first 90 days." },
          { h: "Checkout & post-purchase", p: "Shop Pay, Apple Pay, Google Pay, accelerated checkout, post-purchase upsells, and the abandoned-cart recovery sequencing that recovers the revenue you're already paying ads to generate." },
        ],
      },
    ],
  },
  advantage: {
    bigWord: "SHOP",
    heading: (
      <>
        Why Shopify, done right,<br />
        <span className="text-[#FF2E86]">beats almost everything.</span>
      </>
    ),
    items: [
      { icon: Zap, title: "World-class checkout, free", body: "Shop Pay's converted checkout converts ~9% better than industry standard out of the box. No custom platform can replicate the conversion rate Shopify's checkout already delivers — and you don't pay a development cent for it." },
      { icon: ShieldCheck, title: "PCI, hosting, scaling — solved", body: "Shopify handles PCI compliance, infrastructure, scaling, security patching and uptime. Every hour you don't spend on those is an hour spent on conversion, content and growth — which is where the actual return lives." },
      { icon: Sparkles, title: "Ecosystem leverage", body: "Klaviyo, Yotpo, Gorgias, ReCharge, Loop, Recharge, Triple Whale — the most mature commerce app ecosystem in the world. Used surgically (not stacked thoughtlessly), it compresses years of custom build into weeks." },
    ],
  },
  cases: {
    heading: (
      <>
        Shopify builds<br />
        <span className="text-[#FF2E86]">in the wild.</span>
      </>
    ),
    items: [
      {
        tag: "USA DTC apparel · Theme rebuild",
        metric: "+74%",
        sub: "Conversion rate in 60 days",
        title: "Custom Shopify 2.0 theme drives 74% conversion lift on identical traffic.",
        body: "A US apparel brand on a heavily-customised Dawn variant was converting at 1.3% on mobile with a 4.8s LCP. We shipped a fully custom 2.0 theme — rebuilt PDP, slimmed the app stack from 11 to 4, rebuilt the image pipeline and refactored the cart drawer. Mobile LCP dropped to 1.5s, mobile conversion climbed to 2.3%, and revenue grew 74% in 60 days with zero ad-spend change.",
      },
      {
        tag: "UK Beauty · Headless Hydrogen",
        metric: "+38%",
        sub: "AOV after rebuild",
        title: "Hydrogen storefront blends editorial content and commerce — AOV up 38%.",
        body: "A UK beauty brand wanted magazine-quality content woven into the buying journey — routines, expert guides, ingredient stories — without compromising commerce. We rebuilt headless on Hydrogen + Sanity, with shoppable editorial templates and bundled product PDPs. Engagement (pages/session) doubled. Average order value lifted 38%, driven by editorial-led bundle adoption.",
      },
      {
        tag: "Dubai Wholesale · Shopify Plus B2B",
        metric: "320 accounts",
        sub: "Onboarded in 5 months",
        title: "Shopify Plus B2B replaces email-and-PDF wholesale ordering for 320 accounts.",
        body: "A Dubai distributor was managing 320 trade accounts via email orders, PDF price lists and manual invoicing. We shipped on Shopify Plus B2B — company accounts, customer-specific catalogues and pricing, net 30 terms, location-based ordering and a NetSuite sync. All 320 accounts onboarded in 5 months; sales-team time per order fell ~60%; B2B GMV grew 41% in the first quarter post-launch.",
      },
    ],
  },
  why: {
    heading: (
      <>
        Why teams choose us<br />
        <span className="text-[#FF2E86]">for Shopify.</span>
      </>
    ),
    items: [
      { icon: Rocket, h: "Shopify-native, not theme tweakers", p: "We build properly on Online Store 2.0, Hydrogen, Functions and Checkout UI Extensions — using Shopify's modern architecture, not the 2015-era Liquid hacks that quietly limit most stores." },
      { icon: Globe, h: "Strategy + design + development", p: "One team handles brand, UX, conversion strategy, theme development, app build, integrations and post-launch CRO. No handoff gap, no agency-vs-developer finger-pointing." },
      { icon: Layers, h: "App stack discipline", p: "Most Shopify stores carry 8–15 apps and pay for it in speed and complexity. We audit, consolidate, and build custom only where the App Store genuinely doesn't have a healthy answer." },
      { icon: ShoppingBag, h: "Conversion is the deliverable", p: "We do not ship a store that doesn't outperform what it replaced. Every engagement closes with a measured before/after on conversion, AOV, speed and revenue per session." },
    ],
  },
  faqs: {
    heading: (
      <>
        Shopify development <span className="text-[#FF2E86]">FAQs.</span>
      </>
    ),
    items: [
      { q: "Should I use Shopify, Shopify Plus or WooCommerce?", a: "Shopify is the right choice for the majority of DTC, retail and growing e-commerce brands — its managed infrastructure, checkout conversion and app ecosystem are unmatched. Shopify Plus is right for high-volume merchants ($1M+/yr), B2B/wholesale, multi-store and multi-region operations, and brands needing checkout extensibility. WooCommerce is right when product types or workflows fall outside Shopify's architecture, or when content/commerce integration in WordPress is essential. We give a written recommendation per project after discovery." },
      { q: "How much does a custom Shopify build cost?", a: "A custom Shopify theme (designed and developed for your brand, conversion-engineered, performance-tuned) typically costs $15,000–$40,000. Headless Hydrogen / Next.js builds: $40,000–$120,000+ depending on scope. Custom apps: $10,000–$60,000 depending on complexity. Shopify Plus migrations: $25,000–$80,000 depending on platform of origin and data complexity. Conversion optimisation engagements: $5,000–$15,000. Written fixed-price quotes after discovery." },
      { q: "How long does a Shopify build take?", a: "Custom theme builds: 6–10 weeks from design approval. Headless Hydrogen / Next.js: 12–20 weeks. Custom apps: 6–14 weeks depending on scope. Shopify Plus migrations: 8–16 weeks depending on data and integration complexity. CRO engagements: 4–8 weeks for the first iteration cycle." },
      { q: "Do we need to leave Shopify to go headless?", a: "No — that's the whole point of Hydrogen + Oxygen. You keep Shopify's checkout, admin, apps, payments and infrastructure, and only the storefront layer becomes custom. You get the headless flexibility without giving up the parts of Shopify that are genuinely best-in-class." },
      { q: "Can you migrate us from WooCommerce / Magento / BigCommerce to Shopify?", a: "Yes — we run platform migrations regularly. The work covers full product, customer, order and content data migration; complete 301 redirect mapping to preserve SEO equity; design and theme rebuild; integration rewiring; and a phased cut-over plan with rollback. Most migrations launch with a measurable performance and conversion improvement on day one." },
      { q: "Do you offer ongoing optimisation after launch?", a: "Yes — we offer Shopify growth retainers covering ongoing CRO, A/B testing, theme and app maintenance, performance monitoring, integration upkeep, and a development pool for new pages, campaigns and feature work. Most clients keep us on a retainer because Shopify stores keep evolving — and because the ROI on continuous optimisation reliably outpaces the retainer cost." },
    ],
  },
  cta: {
    bigWord: "GROW",
    heading: (
      <>
        Ready for a Shopify store<br />
        that <em className="text-[#FF2E86] not-italic">actually converts?</em>
      </>
    ),
    body: "If your store is slow, generic, or under-converting — or if you are about to migrate to Shopify and want to do it once, properly — we should talk. The conversation is free, and the recommendation is honest.",
    primary: { label: "Get a free Shopify audit", href: "https://clickmastersdigitalmarketing.com/contact-us/" },
    secondary: [
      { label: "WooCommerce Development", href: "/woocommerce-development-services" },
      { label: "Web App Development", href: "/web-application-development" },
    ],
  },
};

const ShopifyDevelopmentServices = () => <ServicePage data={data} />;
export default ShopifyDevelopmentServices;
