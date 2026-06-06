import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const services = [
  {
    n: "01",
    t: "SEO Services",
    d: "Rank higher on search engines with keyword research, on-page optimization, link building, and technical SEO to grow organic traffic and visibility."
  },
  {
    n: "02",
    t: "PPC & Paid Ads",
    d: "Run high-performing Google, Meta, and Bing ad campaigns optimized for ROI, lead generation, and reduced ad spend waste."
  },
  {
    n: "03",
    t: "Social Media Marketing",
    d: "Build and grow your brand across Facebook, Instagram, LinkedIn, and TikTok with content, engagement, and paid social campaigns."
  },
  {
    n: "04",
    t: "Content & Email Marketing",
    d: "Engaging blogs, scripts, newsletters, and automated email flows that nurture leads and increase customer retention."
  },
  {
    n: "05",
    t: "Web Development",
    d: "Fast, responsive, SEO-optimized websites and landing pages designed to convert visitors into customers."
  },
  {
    n: "06",
    t: "Mobile App Development",
    d: "Custom iOS and Android apps with smooth UX, scalable architecture, and performance-focused engineering."
  },
  {
    n: "07",
    t: "E-commerce Solutions",
    d: "Shopify and WooCommerce stores with CRO, product optimization, and ad integration to increase online sales."
  },
  {
    n: "08",
    t: "AI, Automation & Tech",
    d: "AI tools, chatbots, automation systems, and analytics to streamline workflows and scale your business efficiently."
  },
  {
    n: "09",
    t: "CRO & Analytics",
    d: "A/B testing, heatmaps, funnel analysis, and data-driven optimization to turn more traffic into paying customers."
  },
];


export const Services = () => (
  <section id="services" className="py-32 container">
   <div className="grid md:grid-cols-12 gap-12 mb-20">
  
  <div className="md:col-span-4">
    <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-4">
      Services
    </p>
  </div>

  {/* Wrap heading + paragraph together */}
  <div className="md:col-span-8">
    <h2 className="font-display text-5xl md:text-7xl leading-[1.05] text-balance">
      Clickmasters <em>Digital Marketing</em> Services
    </h2>

    <p className="mt-6 text-muted-foreground text-lg md:text-xl max-w-2xl text-balance">
      Digital Marketing Services at Clickmasters are built to help your business grow faster,
      smarter, and stronger in today's competitive online world. From SEO and paid ads to social
      media and content strategy, we craft custom solutions that drive real traffic, generate
      quality leads, and boost conversions. Whether you're a startup or an established brand,
      our expert team is ready to take your digital presence to the next level.
    </p>
  </div>

</div>
    <div className="grid md:grid-cols-3 gap-px bg-border">
      {services.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: i * 0.1 }}
          className="group bg-background p-10 hover:bg-secondary transition-colors duration-500 relative overflow-hidden"
        >
          <div className="flex items-start justify-between mb-12">
            <span className="text-sm text-muted-foreground">{s.n}</span>
            <span className="text-2xl opacity-60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-500">↗</span>
          </div>
          <h3 className="font-display text-3xl md:text-4xl mb-4">{s.t}</h3>
          <p className="text-muted-foreground max-w-md">{s.d}</p>
        </motion.div>
      ))}
    </div>



{/* Bottom CTA Section */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mt-20 relative overflow-hidden rounded-[2rem] border border-border bg-background px-8 py-14 md:px-16 text-center"
>
  {/* Background Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.06),transparent_60%)] pointer-events-none" />

  <div className="relative max-w-3xl mx-auto">
    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
      Free Consultation
    </p>

    <h3 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6 text-balance">
      Not sure which service is <em>right for you?</em>
    </h3>

    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto text-balance">
      We’ll analyze your business for free and recommend the exact services you need —
      from SEO and ads to automation and web development. No pressure. No obligation.
      Just clear direction for real growth.
    </p>

    <div className="flex items-center justify-center gap-4 flex-wrap">
      {/* Primary CTA */}
      <a
        href="/contact"
        className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-7 pr-3 py-3.5 text-sm font-medium hover:opacity-90 transition-all"
      >
        Get Your Free Consultation

        <span className="grid place-items-center w-10 h-10 rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
          <ExternalLink className="w-4 h-4" />
        </span>
      </a>
    </div>
  </div>
</motion.div>

    
  </section>
);
