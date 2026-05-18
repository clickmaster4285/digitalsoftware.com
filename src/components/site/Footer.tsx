import Link from "next/link";

const navLeft = [
  { label: "Work", href: "/" },
  { label: "Services", href: "/" },
  { label: "About", href: "/" },
  { label: "Contact", href: "/" },
];

const navRight = [
  { label: "Clients", href: "/" },
  { label: "Industries", href: "/" },
  { label: "Blog", href: "/" },
];

const offices = [
  {
    city: "San Francisco",
    lines: ["300 Broadway,", "San Francisco, CA 94133"],
  },
  {
    city: "New York",
    lines: ["148 Lafayette St,", "New York, NY 10013"],
  },
  {
    city: "Austin",
    lines: ["600 Congress Ave,", "Austin, TX 78701"],
  },
  {
    city: "Denver",
    lines: ["1700 Lincoln St 17th fl,", "Denver, CO 80203"],
  },
  {
    city: "Lisbon",
    lines: ["Av. Alm. Reis 139, 1150-015", "Lisbon, Portugal"],
  },
  {
    city: "Belgrade",
    lines: ["Nušićeva 15, 11000", "Belgrade, Serbia"],
  },
];

function SocialIcon({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="text-foreground/70 transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#f1f1ef] text-foreground">
      {/* Soft swirling W ribbon background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 700"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#e9e9e6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#d8d8d4" stopOpacity="0.7" />
            </linearGradient>
            <filter id="soften" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <g filter="url(#soften)" stroke="url(#ribbon)" strokeWidth="120" strokeLinecap="round" fill="none" opacity="0.85">
            <path d="M -100 620 Q 150 200 380 480 T 820 320 T 1260 540 T 1750 200" />
            <path d="M -150 540 Q 120 120 360 420 T 800 240 T 1240 480 T 1720 140" opacity="0.7" />
            <path d="M -80 700 Q 180 280 420 560 T 880 400 T 1320 620 T 1800 280" opacity="0.6" />
          </g>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-8 pb-10 pt-24 lg:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: Let's Talk */}
          <div>
            <h2 className="text-6xl font-bold tracking-tight md:text-7xl">Let's Talk</h2>
            <div className="mt-10 space-y-3 text-lg">
              <a
                href="mailto:hey@clay.global"
                className="block underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"
              >
                hey@clay.global
              </a>
              <p>+1 415 796 6262</p>
            </div>
          </div>

          {/* Right: Nav + Offices */}
          <div className="space-y-16">
            <div className="grid grid-cols-2 gap-8 text-lg">
              <ul className="space-y-3">
                {navLeft.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {navRight.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
              {offices.map((o) => (
                <div key={o.city} className="text-sm">
                  <h3 className="font-bold">{o.city}</h3>
                  <address className="mt-2 not-italic text-foreground/70 underline decoration-foreground/30 underline-offset-4">
                    {o.lines.map((l) => (
                      <div key={l}>{l}</div>
                    ))}
                  </address>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="relative mt-20 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-5 text-foreground/80">
            <SocialIcon label="Dribbble">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 2.5a16 16 0 0 1 8 19M2.5 9c4 0 12 0 18.5 4M5 19c2-4 6-7 14-6.5"/>
              </svg>
            </SocialIcon>
            <SocialIcon label="Behance">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 6H3v12h6.2c2.4 0 4-1.3 4-3.4 0-1.6-.9-2.7-2.3-3 1.1-.4 1.8-1.4 1.8-2.7C12.7 7.1 11.2 6 9 6Zm-3 2h2.7c1 0 1.6.5 1.6 1.4 0 .9-.6 1.4-1.6 1.4H6V8Zm0 8v-3h3c1.1 0 1.8.6 1.8 1.5 0 1-.7 1.5-1.8 1.5H6Zm14.5-4.2c0-2.4-1.6-4-4-4s-4.1 1.7-4.1 4.2 1.7 4.2 4.2 4.2c1.9 0 3.4-.9 3.8-2.4h-2c-.2.5-.8.8-1.7.8-1.1 0-1.9-.6-2.1-1.7h6V11.8Zm-6-.6c.2-1 1-1.6 2-1.6s1.8.6 1.9 1.6h-3.9ZM15 7h4v1.2h-4V7Z"/>
              </svg>
            </SocialIcon>
            <SocialIcon label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
            </SocialIcon>
            <SocialIcon label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9Z"/>
              </svg>
            </SocialIcon>
            <SocialIcon label="X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2H21l-6.52 7.45L22 22h-6.78l-4.83-6.32L4.8 22H2l7-8L2 2h6.93l4.36 5.78L18.244 2Zm-1.19 18h1.5L7.04 4H5.45l11.6 16Z"/>
              </svg>
            </SocialIcon>
            <SocialIcon label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.6V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3V14h2.7v8h3.5Z"/>
              </svg>
            </SocialIcon>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/70">
            <span>© 2016–2026 Clay Global, LLC</span>
            <Link href="#" className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground">Privacy</Link>
            <Link href="#" className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground">Terms</Link>
            <Link href="#" className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;