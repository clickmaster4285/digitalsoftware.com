import { motion } from "framer-motion";

const code = `// clickmasters shipping in production
import { build } from "@clickmasters";

export const product = await build({
  idea:    "your vision",
  team:    ["design", "engineering", "ai"],
  stack:   ["react", "node", "postgres"],
  weeks:   6,
}).then(ship).then(scale);
`;

const checks = [
  "Discovery & product strategy",
  "Design system & prototypes",
  "Engineering sprints (2-week cycles)",
  "QA, security & performance audits",
  "Launch, analytics & iteration",
];

export const Workflow = () => (
  <section id="workflow" className="py-32 container px-4 md:px-6">
    <div className="grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-5">
        <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-4">— How we ship</p>
        <h2 className="font-display text-5xl md:text-6xl leading-[1.05] mb-8">
          From idea to <em>production</em> in weeks, not quarters.
        </h2>
        <ul className="space-y-4">
          {checks.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-3 text-lg"
            >
              <span className="mt-2 w-5 h-5 rounded-full border border-foreground grid place-items-center shrink-0">
                <span className="w-2 h-2 rounded-full bg-foreground" />
              </span>
              {c}
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-7 overflow-x-auto"
      >
        <div className="rounded-3xl overflow-hidden border border-border shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)] bg-zinc-950 text-zinc-100 min-w-[600px] lg:min-w-0">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-800 bg-zinc-900/60">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="ml-3 text-xs text-zinc-400 font-mono whitespace-nowrap">~/clickmasters/build.ts</span>
          </div>
          <pre className="p-6 md:p-8 text-sm md:text-[15px] leading-relaxed font-mono">
<code className="block whitespace-pre">
{code.split("\n").map((line, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
    className="whitespace-nowrap"
  >
    <span className="inline-block w-6 text-zinc-600 select-none">{i + 1}</span>
    <span dangerouslySetInnerHTML={{
      __html: line
        .replace(/(\/\/.*$)/g, '<span style="color:#6b7280">$1</span>')
        .replace(/\b(import|export|const|await|from|then)\b/g, '<span style="color:#FF8FA3">$1</span>')
        .replace(/("[^"]*")/g, '<span style="color:#A8EFE0">$1</span>')
        .replace(/\b(\d+)\b/g, '<span style="color:#FFD43B">$1</span>')
    }} />
  </motion.div>
))}
</code>
          </pre>
        </div>
      </motion.div>
    </div>
  </section>
);