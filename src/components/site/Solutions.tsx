import { motion } from "framer-motion";
import { useState } from "react";

const solutions = [
  { i: "🏥", t: "Healthcare", d: "Helping healthcare providers attract more patients online through targeted SEO, ads, and content that builds trust and drives appointments.", c: "bg-[#F0FFF4]" },
  { i: "⚖️", t: "Personal Injury Lawyers", d: "Dominate local search, generate high-quality case leads, and outrank competitors with aggressive SEO and PPC strategies built for legal.", c: "bg-[#FFF1F1]" },
  { i: "🏠", t: "Real Estate", d: "Drive qualified buyer and seller leads through hyper-local SEO, social media, and paid campaigns.", c: "bg-[#F0F4FF]" },
  { i: "🔧", t: "Plumbers", d: "Get found instantly when locals need help with local SEO, Google Ads, and map rankings.", c: "bg-[#FFF7E6]" },
  { i: "🏛️", t: "Law Firms", d: "Build authority and generate consistent case inquiries with SEO, PPC, and content marketing.", c: "bg-[#F5F0FF]" },
  { i: "💉", t: "Plastic Surgery", d: "Attract high-intent patients with premium content, before/after campaigns, and conversion-focused pages.", c: "bg-[#FFEAF0]" },
  { i: "🍽️", t: "Restaurants", d: "Fill tables and boost orders with local SEO, social media, influencer marketing, and targeted ads.", c: "bg-[#FFF3E0]" },
  { i: "🏗️", t: "Contractors", d: "Generate steady project leads through local search domination, Google Ads, and strong online presence.", c: "bg-[#F2F2F2]" },
  { i: "🛍️", t: "Retail", d: "Drive foot traffic and online sales with social ads, Google Shopping campaigns, and SEO strategies.", c: "bg-[#EAF7FF]" },
  { i: "💰", t: "Financial Services", d: "Build trust and generate qualified leads with compliant financial marketing strategies.", c: "bg-[#F3EEFF]" },
  { i: "🏢", t: "Construction Companies", d: "Showcase projects, win bigger contracts, and generate consistent leads through SEO and paid ads.", c: "bg-[#F5F5F5]" },
  { i: "✈️", t: "Travel Industry", d: "Inspire travelers with content, SEO, and ads that drive bookings and brand growth.", c: "bg-[#E6FAFF]" },
  { i: "🦷", t: "Dental", d: "Fill appointment books with patients through local SEO, ads, and reputation management.", c: "bg-[#F0FFFA]" },
  { i: "👨‍⚖️", t: "Attorneys", d: "Generate consistent case leads and dominate local search with legal-focused strategies.", c: "bg-[#FFF0F5]" },
  { i: "🛡️", t: "Insurance Brokers", d: "Reach high-intent buyers with targeted SEO, Google Ads, and lead generation campaigns.", c: "bg-[#F0F8FF]" },
  { i: "🏨", t: "Hospitality", d: "Increase direct bookings and reduce OTA dependency through SEO and social campaigns.", c: "bg-[#FFF8F0]" },
  { i: "🐛", t: "Pest Control", d: "Capture urgent local searches and convert them into booked jobs with SEO and ads.", c: "bg-[#F7FFF0]" },
  { i: "🎓", t: "Education", d: "Attract students with targeted campaigns, SEO, and strong digital presence.", c: "bg-[#F0F4FF]" },
  { i: "🚚", t: "Logistics Companies", d: "Generate B2B leads and grow client base through SEO, LinkedIn, and paid campaigns.", c: "bg-[#F5F7FF]" },
  { i: "👗", t: "Fashion Brands", d: "Grow brand, drive ecommerce sales, and build loyal following with influencer and social strategies.", c: "bg-[#FFF0FA]" },
  { i: "🏥", t: "Hospitals", d: "Build trust, attract patients, and strengthen reputation with healthcare-focused digital marketing.", c: "bg-[#F0FFF8]" },
];

export const Solutions = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleSolutions = showAll ? solutions : solutions.slice(0, 6);

  return (
    <section id="industries" className="py-32 container">
      <div className="grid md:grid-cols-12 gap-12 mb-20">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-4">
            — Industries We Serve
          </p>
        </div>

        <h2 className="md:col-span-8 font-display text-5xl md:text-7xl leading-[1.05] text-balance">
          Digital Marketing <em>Services </em> for Every Industry
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {visibleSolutions.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl p-8 text-zinc-900 border border-black/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.25)] relative overflow-hidden group"
          >
            <div className={`absolute inset-0 ${s.c}`} aria-hidden />
            <div className="relative">
              <div className="text-5xl mb-6">{s.i}</div>
              <h3 className="font-display text-3xl mb-3">{s.t}</h3>
              <p className="text-sm opacity-80 max-w-xs">{s.d}</p>

              {/* <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium opacity-80 group-hover:opacity-100">
                Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
              </div> */}
            </div>
          </motion.div>
        ))}
      </div>

      {/* See More Button */}
      {solutions.length > 6 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-6 py-3 rounded-full border border-black/20 text-sm font-medium hover:bg-black hover:text-white transition"
          >
            {showAll ? "Show Less" : "See More"}
          </button>
        </div>
      )}
    </section>
  );
};