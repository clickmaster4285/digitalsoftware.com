import { motion } from "framer-motion";

const groups = [
  { t: "Frontend", items: ["React", "Next.js", "Vue", "TypeScript", "Tailwind", "Framer Motion"] },
  { t: "Backend", items: ["Node.js", "Python", "Go", "GraphQL", "tRPC", "REST"] },
  { t: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma", "Kafka"] },
  { t: "Cloud & AI", items: ["AWS", "Vercel", "Docker", "OpenAI", "LangChain", "Pinecone"] },
];

export const TechStack = () => (
  <section id="stack" className="py-32 container">
    <div className="grid md:grid-cols-12 gap-12 mb-20">
      <div className="md:col-span-5">
        <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-4">— Our stack</p>
        <h2 className="font-display text-5xl md:text-7xl leading-[1.05]">
          Modern tools, <em>battle-tested</em>.
        </h2>
      </div>
      <p className="md:col-span-6 md:col-start-7 self-end text-lg text-muted-foreground max-w-md">
        We pick the right tool for the job — fast to ship, easy to maintain, and ready to scale when your product takes off.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-3xl overflow-hidden">
      {groups.map((g, i) => (
        <motion.div
          key={g.t}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
          className="bg-background p-8 min-h-[280px]"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-foreground" />
            <span className="text-xs uppercase tracking-widest opacity-70">{g.t}</span>
          </div>
          <ul className="space-y-3">
            {g.items.map(it => (
              <li key={it} className="font-display text-2xl leading-tight">{it}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </section>
);
