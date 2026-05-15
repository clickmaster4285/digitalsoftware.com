const words = ["Branding", "✦", "Product Design", "✦", "Web Experiences", "✦", "Motion", "✦", "Strategy", "✦", "AI", "✦"];

export const Marquee = () => (
  <section className="py-10 border-y border-border overflow-hidden">
    <div className="marquee gap-12 text-4xl md:text-6xl font-display">
      {[...words, ...words].map((w, i) => (
        <span key={i} className={i % 2 === 1 ? "opacity-30" : ""}>{w}</span>
      ))}
    </div>
  </section>
);
