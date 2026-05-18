import { motion } from "framer-motion";
import Image from "next/image";
import g1 from "@/assets/gif-1.jpg";
import g2 from "@/assets/gif-2.jpg";
import g3 from "@/assets/gif-3.jpg";
import g4 from "@/assets/gif-4.jpg";

const gifs = [
  { src: g1, t: "Loops", d: "Hover micro-interactions", bg: "#1a1a1a", fg: "#fff", rot: -3 },
  { src: g2, t: "Motion", d: "Brand system in motion", bg: "#FFE27A", fg: "#1a1a1a", rot: 2 },
  { src: g3, t: "Squish", d: "Playful product reveals", bg: "#FFC2D1", fg: "#1a1a1a", rot: -2 },
  { src: g4, t: "Bloom", d: "Onboarding moments", bg: "#A8EFE0", fg: "#1a1a1a", rot: 3 },
];

export const Jiffz = () => (
  <section className="py-32 container">
    <div className="grid md:grid-cols-12 gap-10 items-end mb-16">
      <div className="md:col-span-7">
        <p className="text-xs uppercase tracking-[0.25em] mb-4">— Jiffz</p>
        <h2 className="font-display text-5xl md:text-7xl leading-[1.05] text-balance">
          Tiny <em>moments</em>, big personality.
        </h2>
      </div>
      <p className="md:col-span-5 text-muted-foreground">
        A library of motion studies, micro-interactions and 3D toys we sprinkle into every product to make it feel unmistakably alive.
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {gifs.map((g, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 50, rotate: 0 }}
          whileInView={{ opacity: 1, y: i % 2 ? 24 : 0, rotate: g.rot }}
          whileHover={{ rotate: 0, y: -10, scale: 1.04 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.08 }}
          style={{ backgroundColor: g.bg, color: g.fg }}
          className="rounded-3xl overflow-hidden p-3 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.4)]"
        >
          <div className="aspect-square overflow-hidden rounded-2xl bg-black/5">
            <motion.div
              className="w-full h-full relative"
              animate={{ scale: [1, 1.06, 1], rotate: [0, 3, 0] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={g.src} alt={g.t}
                fill
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          <figcaption className="flex items-center justify-between px-3 pt-4 pb-2">
            <span className="font-display text-xl">{g.t}</span>
            <span className="text-xs opacity-70">{g.d}</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  </section>
);
