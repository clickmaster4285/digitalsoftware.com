import { ServicePage, type ServicePageData } from "@/components/site/ServicePage";
import {
  Search, Palette, Code2, Server, ShieldCheck, Plug,
  ShoppingCart, CreditCard, Package, TrendingUp, Briefcase, Rocket, Truck, Globe,
} from "lucide-react";

const data: ServicePageData = {
  meta: {
    title: "Ecommerce Development Services | Clickmasters Digital Marketing",
    description:
      "Conversion-engineered ecommerce development on Shopify, WooCommerce, Magento and headless stacks. Built to sell from day one — checkout, payments, integrations and growth. USA · UK · UAE · Pakistan.",
  },
  hero: {
    eyebrow: "[ Service · 07 ] — Ecommerce Development",
    title: (
      <>
        Online Stores Engineered <br />
        to <span className="text-[#FF2E86]">Convert, Scale and Sell</span> <br />
        — Not Just Look Pretty.
      </>
    ),
    subtitle:
      "A beautiful storefront that doesn't convert is a brochure with a shopping cart bolted on. We build ecommerce stores where every page, every interaction and every checkout step is engineered for revenue — on the platform that fits your catalogue, margin and growth plan.",
    primaryCta: "Plan my store",
    secondaryCta: "See what we build",
    stats: [
      { k: "+38%", v: "Avg conversion lift" },
      { k: "−54%", v: "Avg checkout drop-off" },
      { k: "8-14 wk", v: "Typical launch window" },
      { k: "100%", v: "Store & data owned" },
    ],
  },
  intro: {
    lead: (
      <>
        When traffic is fine but the cart abandons,
        <em className="text-[#FF2E86] not-italic"> when the platform is fighting your operations</em>,
        when every new SKU, market or payment method is a six-week project — your
        store has stopped being an asset and started being a tax.
      </>
    ),
    paragraphs: [
      "Ecommerce in 2026 isn't about adding products to a template. It's about a checkout that loads in under two seconds on a mid-tier Android, a product page tuned to the buying behaviour of your category, payments that work in every market you sell to, and an operations stack where the store, the warehouse and the finance system actually agree on the numbers.",
      "At Clickmasters Digital Marketing, we design and build ecommerce stores on Shopify, WooCommerce, Magento, BigCommerce and fully headless stacks — chosen on merit for your catalogue, margin and roadmap. Every build starts with the conversion model and ends with a store your team can run without a developer on speed-dial.",
    ],
  },
  services: {
    heading: (
      <>
        Our ecommerce<br />
        <span className="text-[#FF2E86]">development services.</span>
      </>
    ),
    items: [
      {
        n: "01",
        icon: Search,
        tag: "Discovery",
        title: "Conversion Discovery & Platform Selection",
        intro:
          "Most stores fail before a line of code is written — by being built on the wrong platform for the catalogue, margin profile or operational reality of the business.",
        blocks: [
          { h: "Buyer & funnel research", p: "We map who buys, what they Google, what makes them hesitate at checkout, and which of those signals your current store is leaking. The output is a prioritised list of conversion levers — not a 60-page strategy deck." },
          { h: "Platform fit on merit", p: "Shopify for speed-to-market and operational simplicity, WooCommerce for content-led brands and full ownership, Magento for complex catalogues and B2B, headless (Next.js + commerce APIs) when performance and brand experience matter more than admin convenience." },
          { h: "Commercial scoping", p: "A written, fixed-price proposal with launch milestones, a measurable conversion target, and the integrations and migrations costed in — not buried in change orders later." },
        ],
      },
      {
        n: "02",
        icon: Palette,
        tag: "UX & Design",
        title: "Conversion-Led Storefront Design",
        intro:
          "Pretty stores lose to clear stores. We design product pages, category pages and checkouts around the decision your buyer is actually trying to make.",
        blocks: [
          { h: "Product & category UX", p: "Filter design that matches your catalogue, image and video patterns proven in your category, social proof placed where it actually changes behaviour, and merchandising blocks built to be edited by your team — not your agency." },
          { h: "Mobile-first by default", p: "Over 70% of ecommerce traffic is mobile. Our designs start at the smallest screen and the slowest network — desktop is the upgrade, not the baseline." },
          { h: "Design system, not one-offs", p: "A documented component library so your seasonal campaigns, new product lines and PDP variants stay on-brand and in-budget for the life of the store." },
        ],
      },
      {
        n: "03",
        icon: Code2,
        tag: "Build",
        title: "Storefront Engineering",
        intro:
          "We build storefronts that load fast, rank well and survive Black Friday — on Shopify, WooCommerce, Magento, BigCommerce or fully headless.",
        blocks: [
          { h: "Shopify & Shopify Plus", p: "Custom themes, app-light architecture, Hydrogen/Oxygen headless when performance demands it, and the operational discipline that keeps a Shopify Plus store maintainable past the first season." },
          { h: "WooCommerce & Magento", p: "WooCommerce for content-led brands wanting full ownership and SEO depth; Magento (Adobe Commerce) for large catalogues, complex pricing rules and B2B buying flows." },
          { h: "Headless commerce", p: "Next.js or Remix front ends powered by Shopify, BigCommerce, Commercetools or Saleor — when Core Web Vitals, brand experience and editorial flexibility need to outrun a templated theme." },
        ],
      },
      {
        n: "04",
        icon: CreditCard,
        tag: "Checkout & Payments",
        title: "Checkout, Payments & Global Selling",
        intro:
          "Most checkouts leak revenue not because of price, but because of friction the merchant never sees. We engineer the last mile.",
        blocks: [
          { h: "Checkout optimisation", p: "Express checkouts (Shop Pay, Apple Pay, Google Pay, PayPal), guest-friendly flows, address and shipping rules tuned per market, and the analytics to actually see where the drop-off is happening." },
          { h: "Global payments & tax", p: "Stripe, Adyen, Klarna, Afterpay, Tabby, Tamara, Mada, Razorpay — plus Avalara/TaxJar for sales tax and VAT, and multi-currency pricing that doesn't break your margin." },
          { h: "Fraud & risk", p: "3DS2, Signifyd, Stripe Radar and platform-native fraud rules — calibrated so you stop chargebacks without strangling conversion." },
        ],
      },
      {
        n: "05",
        icon: Plug,
        tag: "Integrations",
        title: "ERP, OMS & Operations Integrations",
        intro:
          "An ecommerce store is the front door of an operation. The integrations behind it are where it either makes or loses money at scale.",
        blocks: [
          { h: "ERP & accounting", p: "NetSuite, SAP Business One, Sage, QuickBooks, Xero — bidirectional sync of orders, customers, inventory and refunds so finance closes the books in hours, not weeks." },
          { h: "OMS, WMS & 3PL", p: "ShipStation, ShipBob, Shippo, Easyship, ShipHero plus carrier APIs (UPS, FedEx, DHL, Aramex) — accurate stock, accurate ETAs, fewer 'where is my order?' tickets." },
          { h: "CRM, email & loyalty", p: "Klaviyo, Mailchimp, HubSpot, Salesforce, Yotpo, LoyaltyLion — clean event data flowing both ways so your CRM lives in the same reality as your store." },
        ],
      },
      {
        n: "06",
        icon: TrendingUp,
        tag: "Growth & SEO",
        title: "Ecommerce SEO, CRO & Analytics",
        intro:
          "Launching the store is the start. The compounding revenue comes from the quarterly cycle of measure, test, ship — built into the platform from day one.",
        blocks: [
          { h: "Technical & on-page SEO", p: "Server-rendered product pages, clean canonical and faceted URL strategy, structured data (Product, Offer, Review, FAQ), Core Web Vitals tuned to green — the SEO foundation your category needs to rank." },
          { h: "Conversion rate optimisation", p: "Hypothesis-driven A/B testing on PDP, cart and checkout — using GA4, Hotjar/Microsoft Clarity, and platform-native experimentation tools where available." },
          { h: "Analytics you can act on", p: "GA4, server-side tagging, conversion API for Meta and TikTok, Looker Studio dashboards — so marketing, ops and finance steer by the same numbers." },
        ],
      },
      {
        n: "07",
        icon: ShieldCheck,
        tag: "Launch & Care",
        title: "Migration, Launch & Long-term Care",
        intro:
          "Most replatform stories fail at the migration. We treat it as the riskiest part of the project — and de-risk it accordingly.",
        blocks: [
          { h: "Replatforming & data migration", p: "Customers, orders, products, reviews, redirects and SEO equity — migrated with a written plan, a staging environment, and a rollback that has actually been tested." },
          { h: "Launch readiness", p: "Pre-launch QA across devices, payment dry-runs in production, traffic-shaping for soft launches, and the on-call rota for the first 72 hours." },
          { h: "Evolution retainer", p: "Quarterly conversion sprints, security and platform updates, app and dependency hygiene, plus a roadmap that grows with seasonal demand — not a one-off invoice and a handover zip." },
        ],
      },
    ],
  },
  advantage: {
    bigWord: "SELL",
    heading: (
      <>
        Why our stores<br />
        <span className="text-[#FF2E86]">outperform templates.</span>
      </>
    ),
    items: [
      { icon: ShoppingCart, title: "Conversion is engineered, not hoped for", body: "Every build starts with the funnel model — traffic, sessions, add-to-cart, checkout-start, purchase — and a measurable target on each step. We instrument it, ship against it, and iterate post-launch. Pretty is the by-product." },
      { icon: Globe, title: "Built to sell in every market you target", body: "Multi-currency, multi-language, local payment methods, local tax, local shipping rules, local trust signals. We don't bolt 'international' on later — we build for it from day one when the roadmap calls for it." },
      { icon: Briefcase, title: "Operationally honest stack", body: "We won't sell you a platform that fights your warehouse, your finance team or your tax position. The right answer is sometimes Shopify, sometimes WooCommerce, sometimes headless, sometimes Magento — and we'll tell you which before you sign anything." },
    ],
  },
  cases: {
    heading: (
      <>
        Ecommerce builds<br />
        <span className="text-[#FF2E86]">in production.</span>
      </>
    ),
    items: [
      {
        tag: "USA Apparel · Shopify Plus replatform",
        metric: "+62%",
        sub: "Mobile conversion lift",
        title: "Replatformed a $14M apparel brand from a tired Shopify theme to a Hydrogen-headless storefront.",
        body: "A US apparel brand was capped on mobile conversion by a slow legacy theme and a 4-step checkout. We rebuilt the storefront in Hydrogen on Shopify Plus, rewired checkout with Shop Pay and Klarna, and migrated 18 months of customer and order data with zero downtime. Mobile conversion lifted 62%, average order value rose 11%, and return-on-ad-spend climbed across paid channels within one quarter.",
      },
      {
        tag: "UK Home & Garden · WooCommerce",
        metric: "+3.4x",
        sub: "Organic revenue in 12 mo",
        title: "Took a content-rich UK home brand from a templated WooCommerce store to a top-3 organic player in its category.",
        body: "A UK home & garden brand was sitting on great editorial content but a generic Woo theme that couldn't rank or convert. We rebuilt the front end on Next.js with WooCommerce as the headless engine, rewrote the category and PDP UX around buying intent, and stitched the editorial into the product graph. Organic sessions tripled, ecommerce revenue from organic grew 3.4x, and CAC across paid dropped 28%.",
      },
      {
        tag: "UAE B2B · Magento Adobe Commerce",
        metric: "−47%",
        sub: "Order processing time",
        title: "Built a B2B ecommerce platform that collapsed a Dubai distributor's order-to-cash cycle.",
        body: "A Dubai-based industrial distributor was running B2B sales through email, PDFs and a salesforce of 14. Our Magento Adobe Commerce build delivered customer-specific catalogues and pricing, NetSuite ERP sync, Mada and Tamara payments, and an account-manager portal. Order processing time fell 47%, repeat order frequency rose 22%, and the sales team moved from order-takers to genuine account growth.",
      },
    ],
  },
  why: {
    heading: (
      <>
        Why brands choose us<br />
        <span className="text-[#FF2E86]">to build their store.</span>
      </>
    ),
    items: [
      { icon: ShoppingCart, h: "We start with the conversion model", p: "Every engagement starts with a funnel, a target, and a number to beat. Design and engineering decisions are then judged against that — not against subjective taste." },
      { icon: Plug, h: "Operationally connected by default", p: "Your store talks to your ERP, your 3PL, your CRM and your finance system from launch — because an ecommerce store that doesn't is just a very expensive PDF catalogue." },
      { icon: Globe, h: "Cross-border without the chaos", p: "Multi-currency, multi-language, local payments, local tax — we have shipped stores selling in USA, UK, EU, GCC, Pakistan, India, Canada and Australia, and we know what actually breaks at each border." },
      { icon: Rocket, h: "Built for the team that runs it", p: "Editable from the admin, documented for your in-house developer, and designed so seasonal campaigns and new product launches don't require us. We're a partner, not a dependency." },
    ],
  },
  faqs: {
    heading: (
      <>
        Ecommerce development <span className="text-[#FF2E86]">FAQs.</span>
      </>
    ),
    items: [
      { q: "Which ecommerce platform is right for my business?", a: "It depends on catalogue size, margin profile, content strategy, B2B vs D2C mix, international footprint and operational stack. As a rule of thumb: Shopify and Shopify Plus for speed-to-market D2C and mid-market brands, WooCommerce for content-led brands wanting full ownership, Magento (Adobe Commerce) for large catalogues and B2B, BigCommerce for headless-curious brands wanting an enterprise SaaS, and fully headless (Next.js + commerce API) when brand experience and Core Web Vitals matter more than admin convenience. Discovery produces the written recommendation before any build cost is committed." },
      { q: "How long does an ecommerce build take?", a: "A focused D2C launch on Shopify or WooCommerce with up to ~500 SKUs and standard integrations typically launches in 8–14 weeks. A mid-market store with ERP integration, multi-currency and a custom checkout extension typically runs 14–22 weeks. A headless build or Magento B2B platform with complex pricing, multi-store and deep integrations usually takes 20–36 weeks. We deliver in milestones, not one big-bang launch." },
      { q: "What does ecommerce development cost?", a: "Discovery engagements are typically $4,000–$12,000. A standard Shopify or WooCommerce launch is typically $20,000–$80,000. Mid-market and integrated builds run $80,000–$250,000. Headless and Magento B2B platforms can exceed $300,000. Every quote is written and fixed-price after discovery so there are no surprises." },
      { q: "Can you migrate us off our current platform?", a: "Yes — we replatform regularly. The first step is always a written technical and SEO audit so you know exactly what you have, what migrates cleanly, what needs rebuilding, and what SEO equity is at risk. Customers, orders, products, reviews, redirects and content are all migrated with a tested rollback plan." },
      { q: "Do you handle ongoing growth — SEO, CRO, paid?", a: "Yes. Most ecommerce clients stay on a growth retainer covering SEO, CRO experimentation, platform care and roadmap delivery. The store and the growth engine were always meant to be the same conversation — we just refused to split them in two." },
    ],
  },
  cta: {
    bigWord: "STORE",
    heading: (
      <>
        Ready for a store that <br />
        actually <em className="text-[#FF2E86] not-italic">earns its keep?</em>
      </>
    ),
    body: "The checkout drop-off, the platform that fights your ops, the international expansion you keep postponing — let's put numbers on them and a plan against them. One call, no obligation.",
    primary: { label: "Book a discovery call", href: "https://clickmastersdigitalmarketing.com/contact-us/" },
    secondary: [
      { label: "Shopify Development", href: "/shopify-development-services" },
      { label: "WooCommerce Development", href: "/woocommerce-development-services" },
    ],
  },
};

const EcommerceDevelopmentServices = () => <ServicePage data={data} />;
export default EcommerceDevelopmentServices;
