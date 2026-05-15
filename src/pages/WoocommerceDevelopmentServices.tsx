import { ServicePage, type ServicePageData } from "@/components/site/ServicePage";
import {
  Palette, Boxes, Repeat, Briefcase, Plug, Gauge,
  ShoppingCart, ShieldCheck, Database, Layers, Rocket, Code2,
} from "lucide-react";

const data: ServicePageData = {
  meta: {
    title: "WooCommerce Development Services Company | Clickmasters Digital Marketing",
    description:
      "WooCommerce development services — custom themes, product types, B2B, subscriptions and ERP integration. Built as a platform, not a template.",
  },
  hero: {
    eyebrow: "[ Service · 05 ] — WooCommerce Development Services",
    title: (
      <>
        The Most Flexible E-Commerce Platform, <br />
        <span className="text-[#FF2E86]">Built Without Compromise.</span>
      </>
    ),
    subtitle:
      "WooCommerce powers 39% of online stores because nothing else combines its flexibility, extensibility and control. We build WooCommerce as a development platform — not a theme-and-plugin assembly that accumulates technical debt.",
    primaryCta: "Plan my Woo store",
    secondaryCta: "See what we build",
    stats: [
      { k: "39%", v: "Of all online stores" },
      { k: "90+", v: "PageSpeed standard" },
      { k: "0%", v: "Platform fees on sales" },
      { k: "10+ yrs", v: "WooCommerce specialism" },
    ],
  },
  intro: {
    lead: (
      <>
        When Shopify is too rigid for your product, your checkout, or your B2B logic — WooCommerce is where serious e-commerce gets built. The catch:{" "}
        <em className="text-[#FF2E86] not-italic">it has to be built right</em>.
      </>
    ),
    paragraphs: [
      "Most businesses come to WooCommerce because they have evaluated Shopify and found it too limiting for their specific requirements — a product type Shopify cannot model, a checkout workflow it cannot accommodate, a B2B ordering process no app covers, or an integration so specific that custom development is the only path. The risk: WooCommerce in the wrong hands becomes a maintenance burden of plugins and patched themes.",
      "At Clickmasters Digital Marketing, our WooCommerce team builds stores from scratch — purpose-built e-commerce platforms that encode your product and operational logic into clean, documented, maintainable code. We serve businesses across the USA, UK, UAE and Pakistan whose e-commerce requirements exceed what managed platforms can accommodate.",
    ],
  },
  services: {
    heading: (
      <>
        Our WooCommerce<br />
        <span className="text-[#FF2E86]">development services.</span>
      </>
    ),
    items: [
      {
        n: "01",
        icon: Palette,
        tag: "Custom themes",
        title: "Custom WooCommerce Theme Development",
        intro:
          "A custom theme built around your product, brand and conversion path — not adapted from a generic purchased theme designed for nobody in particular.",
        blocks: [
          { h: "Templates that fit your product", p: "Override Woo's defaults at the points where your product and UX actually diverge — custom product layouts, collection filtering, cart, checkout and account experiences designed for your buyer." },
          { h: "Performance-engineered themes", p: "Selective cart fragment loading, object caching for product queries, image-size optimisation specific to Woo's registrations, and the server-side caching configuration that works with Woo's session requirements." },
          { h: "Design-system discipline", p: "A documented component library and design tokens so the store stays coherent as new pages, promotions and seasonal campaigns ship — without each one looking like it came from a different agency." },
        ],
      },
      {
        n: "02",
        icon: Boxes,
        tag: "Custom products",
        title: "Custom Product Types & Ordering Workflows",
        intro:
          "Woo's hook and filter architecture lets us add entirely new product types and ordering flows — the things Shopify simply cannot model.",
        blocks: [
          { h: "Custom product types", p: "Configurable products with dependency matrices, made-to-order with custom specification fields, rental and hire with date selection, digital with licence management, and subscription with custom billing logic." },
          { h: "Complex variable products", p: "When 6+ attributes with 10+ options each break Woo's standard variable UI, we build custom variation interfaces — colour swatches, image selectors, conditional attribute filtering, and per-variation pricing that updates as the buyer configures." },
          { h: "Custom checkout flows", p: "Multi-step checkout for complex configurations, split-payment for deposit/balance arrangements, quote-to-order, and B2B checkout with PO and approval workflow integration." },
        ],
      },
      {
        n: "03",
        icon: Repeat,
        tag: "Subscriptions",
        title: "Subscriptions & Recurring Revenue",
        intro:
          "From the standard Woo Subscriptions extension to fully custom subscription engines built directly on Stripe — we ship the model your business actually needs.",
        blocks: [
          { h: "Subscription commerce that fits", p: "Physical subscription boxes, replenishment subscriptions, digital access, and membership tiers — implemented with the customer experience and billing logic your model demands." },
          { h: "Custom subscription engines", p: "When Woo Subscriptions can't model your billing logic, we build directly on Stripe's subscription APIs — with subscriber portals, frequency management, swap/skip/pause and analytics dashboards inside the Woo admin." },
          { h: "Dunning & retention", p: "Smart retry logic, segmented recovery emails, and escalation sequences that distinguish fixable failures (expired card, insufficient funds) from permanent ones — recovering revenue that would otherwise quietly churn." },
        ],
      },
      {
        n: "04",
        icon: Briefcase,
        tag: "B2B & wholesale",
        title: "WooCommerce B2B & Wholesale",
        intro:
          "Per-account pricing, MOQs, payment terms, multi-user accounts and restricted catalogues — the B2B fundamentals that Woo doesn't ship with, built to fit your trade business.",
        blocks: [
          { h: "Per-account pricing & terms", p: "Customer-specific price lists, contract pricing, net 30/60/90 with invoice delivery, PO capture at checkout, and minimum order quantity enforcement at the product, category or cart level." },
          { h: "Multi-user company accounts", p: "Multiple buyers operating under a single account with shared credit, shared order history and role-based permissions — the way real B2B accounts actually work." },
          { h: "B2B account portal", p: "A self-service portal where trade accounts manage contacts, view invoices and statements, see available credit, and reorder — the standard their suppliers should be offering them." },
        ],
      },
      {
        n: "05",
        icon: Plug,
        tag: "Integrations",
        title: "Integrations & Systems Connectivity",
        intro:
          "A real e-commerce business runs on more than its store. We connect Woo to everything else — accounting, inventory, fulfilment and marketing.",
        blocks: [
          { h: "ERP & accounting", p: "QuickBooks, Xero, Sage 200/300, NetSuite — automated creation of invoices, refunds and customer records, plus bidirectional inventory sync where the operation requires it." },
          { h: "Inventory & warehouse", p: "Linnworks, Brightpearl, custom WMS — real-time inventory synchronisation across channels with the conflict-resolution logic that keeps you from overselling." },
          { h: "Shipping & fulfilment", p: "ShipStation, Shippo, EasyPost, carrier-direct (FedEx, UPS, USPS, Royal Mail, DHL), and 3PL-specific integrations — with real-time rate quoting at checkout when negotiated rates demand it." },
        ],
      },
      {
        n: "06",
        icon: Gauge,
        tag: "Performance & security",
        title: "Performance, Security & Maintenance",
        intro:
          "WooCommerce performance and security require Woo-specific engineering — not generic WordPress optimisation. We do the specific work.",
        blocks: [
          { h: "Woo-specific performance", p: "Cart fragment loading control, product query caching, image pipeline tuning, session table maintenance, and the database optimisation that keeps Woo fast at 1,000+ and 10,000+ SKUs." },
          { h: "Security & PCI", p: "SSL/TLS enforcement, payment-flow design that minimises PCI scope, customer data access controls inside the Woo admin, fraud screening integration, and ongoing security hardening." },
          { h: "Tested maintenance", p: "Woo core, payment gateway and plugin updates tested in staging with end-to-end purchase verification before they ever reach your production store. Payment gateway updates get specific extra attention — they are revenue-critical." },
        ],
      },
    ],
  },
  advantage: {
    bigWord: "FLEX",
    heading: (
      <>
        Why WooCommerce<br />
        <span className="text-[#FF2E86]">when Shopify exists.</span>
      </>
    ),
    items: [
      { icon: Database, title: "Data ownership and control", body: "Customer records, order history, product database and transactions live in a database you own — not in a third-party platform's data store where access depends on subscription continuity. Portable, queryable, yours." },
      { icon: Layers, title: "Unlimited customisation", body: "Open-source architecture means there is no ceiling. If standard functionality doesn't serve a requirement, custom development can add exactly the functionality needed — at the product type, checkout, account, or integration layer." },
      { icon: ShoppingCart, title: "No platform commissions", body: "Shopify charges 0.5–2% on third-party gateway transactions. WooCommerce charges nothing at the platform layer — only the gateway's own fees apply. At meaningful revenue, that delta funds the entire development investment." },
    ],
  },
  cases: {
    heading: (
      <>
        WooCommerce<br />
        <span className="text-[#FF2E86]">in practice.</span>
      </>
    ),
    items: [
      {
        tag: "Craft beverage · Custom subscription",
        metric: "$180K MRR",
        sub: "From zero in 24 months",
        title: "Custom WooCommerce subscription system reaches $180K MRR in 24 months.",
        body: "A craft beverage brand wanted a monthly subscription with a personalised, swappable selection — something Woo Subscriptions could not model. We built directly on Stripe's subscription APIs with a subscriber portal in Woo's My Account, plus a marketing-team admin for the monthly menu. MRR grew from zero to $180K, churn stabilised at 4.6% (vs 6.8% category average), subscriber LTV $810 vs $94 for one-time customers. Subscriptions now make up 68% of revenue.",
      },
      {
        tag: "Industrial components · B2B Woo",
        metric: "−78%",
        sub: "Order processing labour",
        title: "Custom B2B WooCommerce reduces order processing labour by 78%.",
        body: "An industrial manufacturer with 620 trade accounts was processing every order via phone, email and manually generated invoices — 4 FTEs and 3–5 day order-to-shipping cycles. Our build delivered per-account pricing (520 individually negotiated price lists), PO capture, net 30/60 terms, multi-user accounts, restricted catalogues and QuickBooks Online integration. 78% of order volume migrated to self-service in 6 months; processing headcount dropped from 4 to 1; same-day shipping became standard.",
      },
      {
        tag: "Health & wellness · Performance",
        metric: "+180%",
        sub: "Revenue from same traffic",
        title: "WooCommerce performance optimisation grows revenue 180% on identical traffic.",
        body: "A health retailer with 1,800 SKUs and 45,000 monthly sessions had a 0.7% mobile conversion rate and an 8.9-second mobile load. We replaced the purchased theme with a custom-built one, rebuilt the image pipeline (avg 420KB → 52KB), applied Woo-specific perf fixes, migrated to managed Woo hosting, and simplified checkout. Mobile load: 8.9s → 1.6s. Mobile conversion: 0.7% → 2.8%. Monthly revenue: $38K → $107K — zero additional ad spend.",
      },
    ],
  },
  why: {
    heading: (
      <>
        Why teams choose us<br />
        <span className="text-[#FF2E86]">for WooCommerce.</span>
      </>
    ),
    items: [
      { icon: Code2, h: "Woo as a platform, not a template", p: "We treat WooCommerce as a development platform we build on — not a template we configure around the edges. That distinction is what separates a Woo store that ages well from one that becomes a liability." },
      { icon: ShieldCheck, h: "No unnecessary plugins", p: "Every plugin in a store we build has a specific justification, a security record we have reviewed and a measured performance impact. Custom code wins where it should; plugins win where they genuinely should." },
      { icon: Gauge, h: "Performance as a non-negotiable", p: "We don't ship Woo stores that fall short of 90+ PageSpeed on mobile and desktop. Woo performance requires Woo-specific engineering, and we apply it as standard practice on every build." },
      { icon: Rocket, h: "Maintainable for owners", p: "Documented, conventional, structured so any competent WordPress developer can extend it without a briefing from us. You own your code, and we build it so that ownership is genuinely useful." },
    ],
  },
  faqs: {
    heading: (
      <>
        WooCommerce <span className="text-[#FF2E86]">FAQs.</span>
      </>
    ),
    items: [
      { q: "Should I use WooCommerce or Shopify?", a: "WooCommerce is the right choice when your product types or ordering workflows exceed what Shopify can model, when data ownership and portability matter, when content and e-commerce need to live in one WordPress install, or when transaction volume makes Shopify's gateway commissions material. Shopify is the right choice for most DTC retail businesses whose requirements fit its architecture. We give a written recommendation per project after discovery." },
      { q: "How much does WooCommerce development cost?", a: "A custom WooCommerce store with a custom theme, standard product types and typical integrations (up to 500 products) typically costs $12,000–$30,000. Stores with custom product types, complex ordering workflows, subscriptions or B2B functionality typically run $30,000–$80,000. Performance optimisation engagements: $3,000–$10,000. Integration work: $2,000–$15,000 per integration depending on complexity." },
      { q: "How long does WooCommerce development take?", a: "A custom Woo store (custom theme, standard product types, standard integrations) typically takes 8–12 weeks from design approval to launch. Stores with custom product types, subscriptions or B2B functionality: 12–20 weeks. Performance optimisation engagements: 2–4 weeks. Integration work: 2–6 weeks per integration." },
      { q: "Is WooCommerce secure for processing payments?", a: "When implemented correctly, WooCommerce never touches raw card data — payment gateway plugins (Stripe, PayPal, etc.) handle that via hosted fields or redirect, keeping you out of full PCI DSS SAQ D scope. We implement payment processing using the gateway's PCI-minimising approach as standard, and we review every implementation against PCI requirements." },
      { q: "Can WooCommerce handle large product catalogues?", a: "Yes — with the right database, query and caching architecture. Standard Woo begins to show performance limitations at 1,000+ SKUs without optimisation. With product query caching, database indexing, search integration (Elasticsearch or Algolia replacing Woo's standard search) and the right hosting, Woo stores with 10,000+ SKUs perform very well. We assess catalogue scale during discovery and architect accordingly." },
      { q: "Do you handle WooCommerce updates without breaking the store?", a: "Yes. Core, gateway and plugin updates are applied to a staging environment identical to production, tested including end-to-end purchase verification, then deployed. Payment gateway updates get extra attention — a broken gateway update is a revenue-critical failure, and our process verifies payment processing end-to-end before any payment-related update reaches production." },
      { q: "Can WooCommerce serve retail and wholesale from the same store?", a: "Yes — we build Woo stores that serve both customer types from a single installation, with appropriate separation of pricing, catalogue access and checkout experience for each. Wholesale customers see negotiated pricing, account-specific catalogues and B2B checkout; retail customers see the standard storefront. The same product database powers both." },
    ],
  },
  cta: {
    bigWord: "BUILD",
    heading: (
      <>
        Ready for the WooCommerce store<br />
        <em className="text-[#FF2E86] not-italic">other platforms can't deliver?</em>
      </>
    ),
    body: "Flexibility is only valuable when implemented correctly. We build WooCommerce as a platform — with the performance, security and code quality that makes flexibility genuinely useful. Let's talk about what you need to build.",
    primary: { label: "Get a free consultation", href: "https://clickmastersdigitalmarketing.com/contact-us/" },
    secondary: [
      { label: "Shopify Development", href: "/shopify-development-services" },
      { label: "Custom Software", href: "/custom-software-development" },
    ],
  },
};

const WoocommerceDevelopmentServices = () => <ServicePage data={data} />;
export default WoocommerceDevelopmentServices;
