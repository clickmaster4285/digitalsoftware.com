// src/components/locations/LocationTestimonials.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Quote, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

interface LocationTestimonialsProps {
  items: TestimonialItem[];
}

export default function LocationTestimonials({
  items,
}: LocationTestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  if (!items || items.length === 0) return null;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // For desktop: show all 3, for mobile: show carousel
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-black text-white relative overflow-hidden"
    >
      {/* Colorful Background Effects */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FF3D77]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#6C5CE7]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFB020]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating blobs */}
      <div className="absolute top-[10%] right-[5%] w-48 h-48 bg-[#FF3D77]/5 rounded-full blur-2xl pointer-events-none float-a" />
      <div className="absolute bottom-[20%] left-[3%] w-56 h-56 bg-[#6C5CE7]/5 rounded-full blur-2xl pointer-events-none float-b" />
      <div className="absolute top-[60%] right-[8%] w-40 h-40 bg-[#FFB020]/5 rounded-full blur-2xl pointer-events-none float-c" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 pointer-events-none" />

      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none opacity-20" />

      <motion.div style={{ opacity }} className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D77] animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wider text-white/70">
              Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-white"
          >
            What Our Clients Say
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-gradient-to-r from-[#FF3D77] to-[#6C5CE7] rounded-full mx-auto"
          />
        </motion.div>

        {/* Testimonials - Desktop Grid (3 columns) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const delay = index * 0.1;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay,
                  ease: [0.65, 0, 0.35, 1],
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D77]/10 to-[#6C5CE7]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
                  {/* Quote icon */}
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-[#FF3D77]/20 group-hover:text-[#FF3D77]/40 transition-colors duration-500" />

                  {/* Rating stars */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.rating
                            ? "fill-[#FFB020] text-[#FFB020]"
                            : "text-white/20"
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-sm leading-relaxed text-white/80 mb-6">
                    "{item.quote}"
                  </blockquote>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF3D77]/20 to-[#6C5CE7]/20 flex items-center justify-center">
                      <span className="text-sm font-display font-bold text-[#FF3D77]">
                        {item.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">{item.author}</p>
                      <p className="text-xs text-white/40">{item.role}</p>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF3D77] via-[#6C5CE7] to-[#FFB020] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-full" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-[#FF3D77]/20" />

            <div className="flex items-center gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < items[activeIndex].rating
                      ? "fill-[#FFB020] text-[#FFB020]"
                      : "text-white/20"
                  }`}
                />
              ))}
            </div>

            <blockquote className="text-sm leading-relaxed text-white/80 mb-6">
              "{items[activeIndex].quote}"
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF3D77]/20 to-[#6C5CE7]/20 flex items-center justify-center">
                <span className="text-sm font-display font-bold text-[#FF3D77]">
                  {items[activeIndex].author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-sm text-white">
                  {items[activeIndex].author}
                </p>
                <p className="text-xs text-white/40">{items[activeIndex].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-4 h-4 text-white/60" />
            </button>
            <div className="flex items-center gap-1.5">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-6 bg-[#FF3D77]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </div>

        {/* Bottom Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 px-6 py-4 border-t border-white/5 pt-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF3D77]" />
              <span className="text-sm text-white/60">
                <span className="font-medium text-white">4.9/5</span> average rating
              </span>
            </div>
            <span className="w-px h-4 bg-white/10" />
            <span className="text-sm text-white/60">
              <span className="font-medium text-white">{items.length}</span>+ client stories
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}