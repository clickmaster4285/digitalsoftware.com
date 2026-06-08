'use client';

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navCol1 = ["Work", "Services", "About", "Industries"];
const navCol2 = ["Testimonials", "Solutions", "Pricing"];

const offices = [
  { city: "San Francisco", line1: "300 Broadway,", line2: "San Francisco, CA 94133" },
  { city: "New York", line1: "148 Lafayette St,", line2: "New York, NY 10013" },
  { city: "Austin", line1: "600 Congress Ave,", line2: "Austin, TX 78701" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#0a0a0a] text-neutral-200 border-t border-neutral-800 pt-12 sm:pt-16 pb-8 sm:pb-12"
    >
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-12">
          {/* Let's Talk */}
          <div className="md:col-span-5 footer-item text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Let&apos;s Talk
            </h2>
            <div className="mt-4 sm:mt-6 space-y-2 text-[15px] sm:text-[17px]">
              <a
                href="mailto:sales@clickmastersdigitalmarketing.com"
                className="group inline-flex items-center justify-center sm:justify-start gap-1 hover:text-[#FF2E86] transition-colors break-all"
              >
                <span className="break-all">sales@clickmastersdigitalmarketing.com</span>
                <ArrowUpRight className="w-4 h-4 flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
              </a>
              <a
                href="tel:+447988576086"
                className="group inline-flex items-center justify-center sm:justify-start gap-1 hover:text-[#FF2E86] transition-colors"
              >
                +44 7988 576086
                <ArrowUpRight className="w-4 h-4 flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 sm:gap-8 footer-item">
            <ul className="space-y-2.5 sm:space-y-3 text-[14px] sm:text-[15px] text-center sm:text-left">
              {navCol1.map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="group inline-flex items-center justify-center sm:justify-start gap-1 hover:text-[#FF2E86] hover:sm:text-base hover:sm:font-medium transition-all duration-200"
                  >
                    {item}
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5 sm:space-y-3 text-[14px] sm:text-[15px] text-center sm:text-left">
              {navCol2.map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="group inline-flex items-center justify-center sm:justify-start gap-1 hover:text-[#FF2E86] hover:sm:text-base hover:sm:font-medium transition-all duration-200"
                  >
                    {item}
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div className="md:col-span-3 footer-item text-center sm:text-left">
            <p className="text-xs uppercase tracking-[2px] text-neutral-500 mb-3 sm:mb-4">
              OFFICES
            </p>
            <div className="space-y-5 sm:space-y-6 text-sm">
              {offices.map((o) => (
                <div key={o.city}>
                  <div className="font-medium text-neutral-100 hover:text-[#FF2E86] transition-colors">
                    {o.city}
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${o.line1} ${o.line2}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex flex-col sm:flex-row sm:items-start gap-0 sm:gap-1 text-neutral-400 hover:text-neutral-200 transition-colors mt-1 leading-snug"
                  >
                    <span>
                      {o.line1}
                      <br />
                      {o.line2}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-xs sm:text-sm text-neutral-400 footer-item">
          <div className="text-center md:text-left">
            © 2026 ClickMasters Digital Marketing Agency
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex gap-4 sm:gap-6">
              <Link href="#privacy" className="group inline-flex items-center gap-1 hover:text-neutral-200 transition-colors text-xs sm:text-sm">
                Privacy
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
              </Link>
              <Link href="#terms" className="group inline-flex items-center gap-1 hover:text-neutral-200 transition-colors text-xs sm:text-sm">
                Terms
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
              </Link>
              <Link href="#sitemap" className="group inline-flex items-center gap-1 hover:text-neutral-200 transition-colors text-xs sm:text-sm">
                Sitemap
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 sm:gap-5 mt-2 sm:mt-0">
              <SocialIcon label="LinkedIn" path="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5V9h3v10zM6.5 7.7a1.7 1.7 0 110-3.5 1.7 1.7 0 010 3.5zM19 19h-3v-5c0-1.2-.5-2-1.6-2-.8 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8V19h-3V9h3v1.4c.4-.6 1.1-1.5 2.7-1.5 2 0 3.6 1.3 3.6 4.1V19z" />
              <SocialIcon label="Instagram" path="M12 2.2c3.2 0 3.6 0 4.9.1 1.2 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.9.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.9.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4a3.8 3.8 0 01-1.4-.9 3.8 3.8 0 01-.9-1.4c-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.9-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1zM12 0C8.7 0 8.3 0 7 .1 5.8.1 4.9.3 4.2.6c-.8.3-1.5.7-2.1 1.4C1.4 2.6 1 3.3.7 4.1.3 4.9.1 5.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.1 1.2.3 2.1.6 2.8.3.8.7 1.5 1.4 2.1.7.7 1.4 1.1 2.1 1.4.7.3 1.6.5 2.8.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.2-.1 2.1-.3 2.8-.6.8-.3 1.5-.7 2.1-1.4.7-.7 1.1-1.4 1.4-2.1.3-.7.5-1.6.6-2.8.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.2-.3-2.1-.6-2.8a5.8 5.8 0 00-1.4-2.1A5.8 5.8 0 0019.8.7c-.7-.3-1.6-.5-2.8-.6C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm6.4-10.4a1.4 1.4 0 100-2.9 1.4 1.4 0 000 2.9z" />
              <SocialIcon label="X" path="M18.244 2H21l-6.522 7.453L22 22h-6.586l-5.16-6.74L4.5 22H1.74l6.97-7.964L1.5 2h6.75l4.66 6.16L18.245 2zm-1.157 18.4h1.83L7.01 3.486H5.05L17.087 20.4z" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label, path }: { label: string; path: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="text-neutral-400 hover:text-[#FF2E86] transition-all duration-200 hover:scale-110 inline-flex"
    >
      <svg 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-[18px] h-[18px] sm:w-5 sm:h-5"
      >
        <path d={path} />
      </svg>
    </a>
  );
}