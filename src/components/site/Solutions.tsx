import { motion } from "framer-motion";

const solutions = [
  { i: "🛒", t: "SaaS Platforms", d: "Multi-tenant dashboards, billing, and admin panels engineered to scale.", c: "bg-[#FFF8DC]" },
  { i: "📱", t: "Mobile Apps", d: "Native-feeling iOS & Android apps built with React Native and Expo.", c: "bg-[#DFF7F0]" },
  { i: "🤖", t: "AI Products", d: "LLM features, RAG pipelines, agents and copilots wired into your product.", c: "bg-[#FFE0E6]" },
  { i: "🛍", t: "E-commerce", d: "Storefronts, headless commerce and checkout flows that convert.", c: "bg-[#E5EEFF]" },
  { i: "🏦", t: "Fintech", d: "Compliant payments, ledgers, KYC flows and finance dashboards.", c: "bg-[#EFE6FF]" },
  { i: "⚙️", t: "Internal Tools", d: "Ops dashboards, CRMs and workflow automations for your team.", c: "bg-[#FFEFD9]" },
];

export const Solutions = () => (
  <section id="solutions" className="py-32 container">
    <div className="grid md:grid-cols-12 gap-12 mb-20">
      <div className="md:col-span-4">
        <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-4">— Software solutions</p>
      </div>
      <h2 className="md:col-span-8 font-display text-5xl md:text-7xl leading-[1.05] text-balance">
        Software for <em>every</em> shape of business.
      </h2>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {solutions.map((s, i) => (
        <motion.div
          key={s.t}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
          whileHover={{ y: -6 }}
          className="rounded-3xl p-8 text-zinc-900 border border-black/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.25)] relative overflow-hidden group"
          style={{ background: undefined }}
        >
          <div className={`absolute inset-0 ${s.c}`} aria-hidden />
          <div className="relative">
            <div className="text-5xl mb-6">{s.i}</div>
            <h3 className="font-display text-3xl mb-3">{s.t}</h3>
            <p className="text-sm opacity-80 max-w-xs">{s.d}</p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium opacity-80 group-hover:opacity-100">
              Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);
