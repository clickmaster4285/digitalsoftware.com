"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    category: "Commercial Questions",
    q: "How much does digital marketing cost for a US business?",
    a: "Digital marketing costs vary depending on the services you need, your industry competitiveness, and your specific growth goals. At Clickmasters, our managed service packages start at $1,500 per month, and every client receives a fully custom proposal after a free discovery consultation. There are no hidden fees and no unexpected charges — you'll always know exactly what you're investing and what you're getting in return.",
  },
  {
    category: "Commercial Questions",
    q: "How long does it take to see results from digital marketing?",
    a: "The timeline depends on the digital marketing channels you're investing in. Paid advertising through Google or social media can begin generating leads within the first few days of going live. SEO is a longer-term investment — most clients begin seeing meaningful organic growth between months three and six, with results that compound significantly over time. We set clear, realistic expectations during your onboarding so you always know what to expect and when.",
  },
  {
    category: "Commercial Questions",
    q: "Is digital marketing worth the investment for small businesses?",
    a: "Without question. Digital marketing is one of the most powerful tools available to small businesses because it levels the competitive playing field. A well-executed local SEO or PPC campaign can put a small business above much larger competitors in search results. Our strategies are designed to generate maximum return regardless of your business size or budget, and we scale your investment as your results grow.",
  },

  {
    category: "Company Questions",
    q: "Is your digital marketing team based in the USA?",
    a: "Yes — entirely. Every member of our team is based in the United States. We believe strongly in keeping our operations local because it means our team truly understands American consumer behavior, regional market differences, and the competitive landscape your business operates within. You're never outsourced, handed off overseas, or left dealing with language or time zone barriers.",
  },
  {
    category: "Company Questions",
    q: "How experienced is the ClickMasters digital marketing team?",
    a: "Our digital marketing specialists average more than seven years of hands-on industry experience. Every team member holds relevant certifications in their area of expertise and receives continuous training on algorithm updates, platform changes, and emerging best practices. When you work with our digital marketing agency, you're working with seasoned professionals — not junior staff learning on your budget.",
  },
  {
    category: "Company Questions",
    q: "Will I have a dedicated contact at your digital marketing agency?",
    a: "Yes, always. From the moment you become a ClickMasters client, you're assigned a dedicated account manager who serves as your single point of contact for everything. They know your business deeply, monitor your campaigns daily, and are available to answer your questions and provide updates promptly. You will never be passed around, ignored, or left wondering who to call.",
  },

  {
    category: "Services Questions",
    q: "What digital marketing services does Clickmasters specialize in?",
    a: "Our digital marketing company specializes in SEO, Google Ads, social media advertising, local SEO, content marketing, email automation, website design, and reputation management. We build integrated, multi-channel digital marketing strategies that combine the right mix of services based on your specific goals, market, and budget — never a one-size-fits-all package.",
  },
  {
    category: "Services Questions",
    q: "What makes your digital marketing agency's SEO different?",
    a: "Our approach to SEO within our broader digital marketing service is fundamentally different because we focus entirely on business outcomes — not rankings for their own sake. We target keywords that actually drive revenue, build links from genuinely authoritative sources, create content that converts as well as ranks, and optimize your technical foundation for long-term, sustainable growth. Every SEO decision we make is tied to a real business objective.",
  },
  {
    category: "Services Questions",
    q: "Can your digital marketing agency take over and fix my existing Google Ads?",
    a: "Yes. We offer a comprehensive PPC audit and account takeover service as part of our digital marketing offering. We review your existing campaigns in full, identify exactly where budget is being wasted, restructure your ad groups and targeting, improve your landing pages, and relaunch with a higher-performing strategy. The majority of takeover clients see measurable improvement within the first 30 days.",
  },
  {
    category: "Services Questions",
    q: "Do you offer one-time digital marketing projects or only monthly services?",
    a: "We offer both. For services like website design, one-time digital marketing audits, or specific content projects, we offer fixed-price project engagements. For ongoing services like SEO, PPC management, social media, and email marketing, we work on a monthly retainer model that ensures continuous optimization and consistent results over time.",
  },
  {
    category: "Services Questions",
    q: "Can your digital marketing company help a brand-new business with no online presence?",
    a: "Absolutely — and we genuinely enjoy building something from the ground up. Whether you're a brand-new startup or an established business just entering the digital space, our digital marketing agency will build your entire online presence strategically and efficiently. We'll prioritize the channels that generate results fastest and layer in longer-term strategies like SEO to build compounding momentum over time.",
  },
  {
    category: "Services Questions",
    q: "How do you report results and measure the success of digital marketing campaigns?",
    a: "Transparency in reporting is one of the core values of our digital marketing company. Every client receives a detailed monthly performance report covering all key metrics relevant to their campaigns — including website traffic, keyword rankings, lead volume, cost per lead, conversion rates, ad spend, and ROI. We also provide access to live dashboards so you can monitor your campaign performance in real time, 24 hours a day, seven days a week.",
  },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-32 container">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.25em] mb-4">— FAQ</p>
          <h2 className="font-display text-5xl md:text-6xl leading-[1.05]">
            Questions, <em>answered</em>.
          </h2>
        </div>
        <div className="md:col-span-8 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center py-6 text-left"
              >
                <span className="font-display text-2xl md:text-3xl">{f.q}</span>
                <span className={`text-2xl transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden text-muted-foreground max-w-xl">{f.a}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


       {/* <motion.div
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ delay: 1.2, duration: 0.7 }}
  className="mt-10 flex items-center justify-center gap-6 flex-wrap"  // ← Added justify-center
>
  <a href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-6 pr-3 py-3 text-sm font-medium hover:opacity-90 transition">
    Contact us
    <span className="grid place-items-center w-9 h-9 rounded-full bg-background text-foreground transition-transform group-hover:rotate-45">
      <ExternalLink className="w-4 h-4" />
    </span>
  </a>
</motion.div> */}



    </section>
  );
};
