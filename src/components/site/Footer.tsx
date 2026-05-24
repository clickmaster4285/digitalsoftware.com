"use client";

import Link from "next/link";

const navCol1 = ["Work", "Services", "About", "Industries"];
const navCol2 = ["Testimonials", "Solutions", "Pricing"];

const offices = [
  { city: "San Francisco", line1: "300 Broadway,", line2: "San Francisco, CA 94133" },
  { city: "New York", line1: "148 Lafayette St,", line2: "New York, NY 10013" },
  { city: "Austin", line1: "600 Congress Ave,", line2: "Austin, TX 78701" },
  { city: "Denver", line1: "1700 Lincoln St 17th fl,", line2: "Denver, CO 80203" },
  { city: "Lisbon", line1: "Av. Alm. Reis 139, 1150-015", line2: "Lisbon, Portugal" },
  { city: "Belgrade", line1: "Nušićeva 15, 11000", line2: "Belgrade, Serbia" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#f1f1ef] text-neutral-900">
      {/* Animated blob shapes top-left */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-8 py-10 md:px-10 md:py-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Left: Let's Talk */}
          <div>
            <h2 className="text-5xl font-bold tracking-tight md:text-7xl">Let's Talk</h2>
            <div className="mt-10 space-y-2 text-lg">
              <a href="mailto:sales@clickmastersdigitalmarketing.com" className="block underline underline-offset-4 decoration-1 hover:opacity-70">
                sales@clickmastersdigitalmarketing.com
              </a>
              <a href="tel:+447988576086" className="block hover:opacity-70">
                 +44 7988 576086
              </a>
            </div>
          </div>

          {/* Right: Nav columns */}
          <div className="grid grid-cols-2 gap-8 text-lg md:justify-self-end md:gap-20">
            <ul className="space-y-3">
              {navCol1.map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="underline underline-offset-4 decoration-1 hover:opacity-70"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {navCol2.map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="underline underline-offset-4 decoration-1 hover:opacity-70"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Offices */}
        <div className="mt-24 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:ml-auto md:grid-cols-3 md:max-w-[60%]">
          {offices.map((o) => (
            <div key={o.city}>
              <div className="font-semibold">{o.city}</div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${o.line1} ${o.line2}`)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-sm text-neutral-500 underline underline-offset-4 decoration-1 hover:text-neutral-900"
              >
                {o.line1}
                <br />
                {o.line2}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-5 text-neutral-600">
            <SocialIcon label="Dribbble" path="M12 2a10 10 0 100 20 10 10 0 000-20zm6.6 5.5a8.3 8.3 0 011.7 4.7 18 18 0 00-5.3-.4c-.3-.7-.6-1.5-.9-2.2 2-.8 3.6-1.8 4.5-2.1zM12 3.7c2 0 3.8.7 5.2 1.9-.8.5-2.2 1.3-4 2-.9-1.7-2-3.2-2.6-3.9.4 0 .9 0 1.4 0zm-3.4.5c.7.7 1.7 2.1 2.6 3.8-2.6.7-5 .7-5.8.7A8.3 8.3 0 018.6 4.2zM3.7 12v-.2c.7 0 3.6.1 6.5-.8.2.3.3.7.5 1-2.4.7-4.7 2.3-6.7 4.9A8.2 8.2 0 013.7 12zm2.4 6.2c1.7-2.4 3.8-3.9 6-4.5.8 2.2 1.2 4 1.4 5.2A8.3 8.3 0 016.1 18.2zm9 0c-.2-1-.5-2.6-1.2-4.6 2-.3 3.8.1 4.7.5-.5 1.7-1.7 3.2-3.5 4.1z" />
            <SocialIcon label="Behance" path="M7.5 6.5c1 0 1.8.2 2.4.7.5.4.8 1.1.8 2 0 .5-.1.9-.3 1.2-.2.3-.5.6-1 .9.6.2 1 .5 1.3.9.3.4.5.9.5 1.5 0 .9-.3 1.6-1 2-.7.5-1.5.7-2.5.7H3v-10h4.5zm-.2 4c.4 0 .7-.1 1-.3.2-.2.3-.5.3-.9 0-.4-.1-.7-.4-.9-.2-.2-.6-.2-1-.2H5v2.3h2.3zm.2 4.3c.5 0 .9-.1 1.1-.3.3-.2.4-.6.4-1s-.1-.7-.4-.9c-.2-.2-.6-.3-1.1-.3H5v2.5h2.5zM17 9c.7 0 1.3.1 1.9.4.5.3 1 .7 1.3 1.2.3.5.6 1 .7 1.6.1.5.2 1 .2 1.6h-5.4c0 .6.2 1 .6 1.3.3.3.8.4 1.3.4.4 0 .7-.1 1-.2.3-.2.5-.4.6-.6h2c-.4.9-1 1.6-1.7 2-.7.5-1.5.7-2.4.7-.7 0-1.3-.1-1.8-.3-.6-.2-1-.5-1.4-1-.4-.4-.7-.9-.9-1.4-.2-.6-.3-1.1-.3-1.8 0-.6.1-1.2.3-1.7.2-.5.5-1 .9-1.4.4-.4.8-.7 1.4-1 .5-.2 1.1-.3 1.7-.3zm.1 1.7c-.4 0-.8.1-1.1.4-.3.3-.5.6-.5 1h3c-.1-.5-.2-.8-.5-1-.3-.3-.6-.4-.9-.4zM15 7h5v1h-5z" />
            <SocialIcon label="Instagram" path="M12 2.2c3.2 0 3.6 0 4.9.1 1.2 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.9.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.9.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4a3.8 3.8 0 01-1.4-.9 3.8 3.8 0 01-.9-1.4c-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.9-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1zM12 0C8.7 0 8.3 0 7 .1 5.8.1 4.9.3 4.2.6c-.8.3-1.5.7-2.1 1.4C1.4 2.6 1 3.3.7 4.1.3 4.9.1 5.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.1 1.2.3 2.1.6 2.8.3.8.7 1.5 1.4 2.1.7.7 1.4 1.1 2.1 1.4.7.3 1.6.5 2.8.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.2-.1 2.1-.3 2.8-.6.8-.3 1.5-.7 2.1-1.4.7-.7 1.1-1.4 1.4-2.1.3-.7.5-1.6.6-2.8.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.2-.3-2.1-.6-2.8a5.8 5.8 0 00-1.4-2.1A5.8 5.8 0 0019.8.7c-.7-.3-1.6-.5-2.8-.6C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm6.4-10.4a1.4 1.4 0 100-2.9 1.4 1.4 0 000 2.9z" />
            <SocialIcon label="LinkedIn" path="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5V9h3v10zM6.5 7.7a1.7 1.7 0 110-3.5 1.7 1.7 0 010 3.5zM19 19h-3v-5c0-1.2-.5-2-1.6-2-.8 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8V19h-3V9h3v1.4c.4-.6 1.1-1.5 2.7-1.5 2 0 3.6 1.3 3.6 4.1V19z" />
            <SocialIcon label="X" path="M18.244 2H21l-6.522 7.453L22 22h-6.586l-5.16-6.74L4.5 22H1.74l6.97-7.964L1.5 2h6.75l4.66 6.16L18.245 2zm-1.157 18.4h1.83L7.01 3.486H5.05L17.087 20.4z" />
            <SocialIcon label="Facebook" path="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.5H7.7V14h2.7v8h3.1z" />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600">
            <span>© 2026 ClickMasters Digital Marketing Agency</span>
            <Link href="#privacy" className="underline underline-offset-4 decoration-1 hover:text-neutral-900">
              Privacy
            </Link>
            <Link href="#terms" className="underline underline-offset-4 decoration-1 hover:text-neutral-900">
              Terms
            </Link>
            <Link href="#sitemap" className="underline underline-offset-4 decoration-1 hover:text-neutral-900">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label, path }: { label: string; path: string }) {
  return (
    <a href="#" aria-label={label} className="transition-opacity hover:opacity-60">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={path} />
      </svg>
    </a>
  );
}

export default Footer;