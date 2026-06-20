'use client';

interface LocationClientProps {
  location: any;
  serviceName: string;
  cityName: string;
  geoParagraphs: string[];
  features: { title: string; body: string }[];
  caseStudies: { title: string; body: string; metric?: string }[];
  faqs: { question: string; answer: string }[];
}

export default function LocationClient({
  location,
  serviceName,
  cityName,
  geoParagraphs,
  features,
  caseStudies,
  faqs,
}: LocationClientProps) {

  // Helper to check if any data exists for a section
  const hasGeoData = geoParagraphs.length > 0;
  const hasFeatures = features.length > 0;
  const hasCaseStudies = caseStudies.length > 0;
  const hasFaqs = faqs.length > 0;
  const hasInternalLinks = (location.internalLinks || []).length > 0;
  const hasPas = location.pas && location.pas.trim().length > 0;
  const hasServices = location.services && location.services.trim().length > 0;

  // Parse services into array if they exist
  const parseServices = (servicesText: string): { title: string; body: string }[] => {
    if (!servicesText) return [];
    
    const items: { title: string; body: string }[] = [];
    const sections = servicesText.split(/\n\s*\n/).filter(Boolean);
    
    for (const section of sections) {
      const lines = section.split('\n').filter(Boolean);
      if (lines.length === 0) continue;
      
      const firstLine = lines[0] || '';
      if (firstLine.includes(':')) {
        const [title, ...rest] = firstLine.split(':');
        const body = rest.join(':').trim() + (lines.slice(1).join(' ').trim() ? ' ' + lines.slice(1).join(' ').trim() : '');
        items.push({
          title: title.trim(),
          body: body.trim(),
        });
      }
    }
    
    return items;
  };

  const servicesList = hasServices ? parseServices(location.services) : [];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-gray-900">
      
      {/* Schema Markup */}
      {location.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: typeof location.schema === 'string' ? location.schema : JSON.stringify(location.schema) }}
        />
      )}
      {location.faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: typeof location.faqSchema === 'string' ? location.faqSchema : JSON.stringify(location.faqSchema) }}
        />
      )}

      {/* ===== HERO ===== */}
      <header className="relative overflow-hidden border-b border-gray-200 bg-white pt-32">
        <div 
          className="pointer-events-none absolute right-[-15%] top-[-10%] h-[700px] w-[700px] rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, #e11d48 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-24">
          <div className="mb-10 flex items-center gap-3 text-sm uppercase tracking-widest text-gray-500">
            <span>[ Service ]</span>
            <span className="h-px w-12 bg-gray-300" />
            <span>{serviceName} · {cityName}</span>
          </div>
          <h1 className="font-display text-4xl leading-[1.02] md:text-7xl">
            <span className="block overflow-hidden">
              <span className="block">{location.h1 || `${serviceName} Agency ${cityName}`}</span>
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-gray-600">
            {location.meta}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Free {cityName} Audit <span aria-hidden>↗</span>
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-7 py-3 text-sm font-medium transition hover:bg-gray-100"
            >
              See What We Build
            </a>
          </div>
        </div>
      </header>

      {/* ===== INTRO / GEO BLOCK ===== */}
      {hasGeoData && (
        <section className="relative overflow-hidden border-b border-gray-200 bg-gray-50 text-gray-900">
          <div className="pointer-events-none absolute inset-x-0 -bottom-10 select-none text-center font-display text-[18vw] leading-none text-gray-900/[0.04]">
            PROBLEM
          </div>
          <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-28 md:grid-cols-[1fr_2fr]">
            <div>
              <div className="mb-4 text-sm uppercase tracking-widest text-gray-500">[ The Market ]</div>
              <div className="sticky top-28">
                <div className="font-display text-2xl">{cityName}</div>
                <p className="mt-2 text-sm text-gray-600">
                  Primary keyword
                  <br />
                  <code className="mt-1 inline-block rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700">
                    {location.primaryKw || 'N/A'}
                  </code>
                </p>
              </div>
            </div>
            <div>
              {geoParagraphs.map((para: string, i: number) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-display text-3xl leading-tight md:text-4xl"
                      : "mt-6 text-gray-700"
                  }
                >
                  {i === 0 ? (
                    <>
                      {para.split(".")[0]}.
                      <span className="text-rose-600"> Three commercially distinct requirements.</span>
                    </>
                  ) : (
                    para
                  )}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== PAS (Problem-Agitation-Solution) ===== */}
      {hasPas && (
        <section className="relative overflow-hidden border-b border-gray-200 bg-white">
          <div className="pointer-events-none absolute inset-x-0 top-10 select-none text-center font-display text-[18vw] leading-none text-gray-900/[0.05]">
            PAS
          </div>
          <div className="relative mx-auto max-w-5xl px-6 py-28">
            <div>
              <div className="mb-4 text-sm uppercase tracking-widest text-gray-500">[ Problem · Agitation · Solution ]</div>
              <h2 className="font-display text-4xl md:text-6xl">
                The <span className="text-rose-600">Problem</span> We Solve
              </h2>
            </div>
            <div className="mt-10 space-y-6">
              {location.pas.split('\n').filter(Boolean).map((paragraph: string, i: number) => {
                const trimmed = paragraph.trim();
                if (trimmed.startsWith('PROBLEM:')) {
                  return (
                    <div key={i} className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                      <h3 className="font-bold text-red-700 text-lg mb-2">⚠️ Problem</h3>
                      <p className="text-gray-700">{trimmed.replace('PROBLEM:', '').trim()}</p>
                    </div>
                  );
                } else if (trimmed.startsWith('SOLUTION:')) {
                  return (
                    <div key={i} className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                      <h3 className="font-bold text-green-700 text-lg mb-2">✅ Solution</h3>
                      <p className="text-gray-700">{trimmed.replace('SOLUTION:', '').trim()}</p>
                    </div>
                  );
                } else {
                  return (
                    <p key={i} className="text-gray-700 leading-relaxed">{trimmed}</p>
                  );
                }
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== FEATURES ===== */}
      {hasFeatures && (
        <section id="features" className="relative overflow-hidden border-b border-gray-200 bg-white">
          <div className="pointer-events-none absolute inset-x-0 top-10 select-none text-center font-display text-[18vw] leading-none text-gray-900/[0.05]">
            SERVICES
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-28">
            <div>
              <div className="mb-4 text-sm uppercase tracking-widest text-gray-500">[ What We Build ]</div>
              <h2 className="font-display text-4xl md:text-6xl">
                Three architectures
                <span className="block text-rose-600">— one {cityName} playbook.</span>
              </h2>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {features.map((feature, i) => (
                <article
                  key={i}
                  className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:border-rose-500/50"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <span className="font-display text-3xl text-rose-600">
                      0{i + 1}
                    </span>
                    <span className="text-sm uppercase tracking-widest text-gray-500">Capability</span>
                  </div>
                  <h3 className="font-display text-xl leading-snug">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== SERVICES (Detailed Services List) ===== */}
      {hasServices && servicesList.length > 0 && (
        <section id="services" className="relative overflow-hidden border-b border-gray-200 bg-gray-50 text-gray-900">
          <div className="pointer-events-none absolute inset-x-0 bottom-10 select-none text-center font-display text-[18vw] leading-none text-gray-900/[0.04]">
            SERVICES
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-28">
            <div>
              <div className="mb-4 text-sm uppercase tracking-widest text-gray-500">[ Our Services ]</div>
              <h2 className="font-display text-4xl md:text-6xl">
                What We <span className="text-rose-600">Offer</span>
              </h2>
            </div>
            <div className="mt-14 space-y-6">
              {servicesList.map((service, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-200 bg-white p-8 transition hover:border-rose-500/40"
                >
                  <h3 className="font-display text-2xl text-rose-600 mb-3">{service.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{service.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== STATS ===== */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gray-50 text-gray-900">
        <div className="pointer-events-none absolute inset-x-0 top-0 select-none text-center font-display text-[16vw] leading-none text-gray-900/[0.04]">
          NUMBERS
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="mb-12">
            <div className="mb-4 text-sm uppercase tracking-widest text-gray-500">[ By The Numbers ]</div>
            <h2 className="font-display text-3xl md:text-5xl">
              Measured outcomes
              <span className="text-rose-600"> — not vanity metrics.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 md:grid-cols-4">
            {[
              { v: 12000, l: "Pages optimized", s: "+" },
              { v: 45, l: "% CTR lift", s: "%" },
              { v: 340, l: "% lead increase", s: "%" },
              { v: location.wordCount || 0, l: "Words per page", s: "" },
            ].map((stat) => (
              <div key={stat.l} className="bg-gray-50 px-6 py-10">
                <div className="font-display text-4xl md:text-5xl">
                  {typeof stat.v === 'number' ? stat.v.toLocaleString() : stat.v}{stat.s}
                </div>
                <div className="mt-3 text-sm uppercase tracking-widest text-gray-500">{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      {hasCaseStudies && (
        <section id="proof" className="relative overflow-hidden border-b border-gray-200 bg-white">
          <div className="pointer-events-none absolute inset-x-0 top-20 select-none text-center font-display text-[18vw] leading-none text-gray-900/[0.05]">
            PROOF
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-28">
            <div>
              <div className="mb-4 text-sm uppercase tracking-widest text-gray-500">[ Client Results ]</div>
              <h2 className="font-display text-4xl md:text-6xl">
                {cityName} results
                <span className="block text-rose-600">in practice.</span>
              </h2>
            </div>
            <div className="mt-14 space-y-4">
              {caseStudies.map((study, i) => (
                <article
                  key={i}
                  className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-8 transition hover:border-rose-500/40 md:grid-cols-[220px_1fr]"
                >
                  <div>
                    <div className="text-sm uppercase tracking-widest text-gray-500">[ 0{i + 1} ] Case Study</div>
                    <div className="mt-3 font-display text-4xl text-rose-600">
                      {study.metric || "100%"}
                    </div>
                    <div className="mt-1 text-sm uppercase tracking-widest text-gray-500">
                      {["lead increase", "enquiries", "new patients"][i % 3]}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl leading-snug">{study.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{study.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      {hasFaqs && (
        <section id="faq" className="relative overflow-hidden border-b border-gray-200 bg-gray-50 text-gray-900">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display text-[18vw] leading-none text-gray-900/[0.04]">
            QUESTIONS
          </div>
          <div className="relative mx-auto max-w-3xl px-6 py-28">
            <div>
              <div className="mb-4 text-sm uppercase tracking-widest text-gray-500">[ FAQs ]</div>
              <h2 className="font-display text-4xl md:text-5xl">
                {location.faqTitle || `Frequently asked questions about ${serviceName} in ${cityName}`}
              </h2>
            </div>
            <div className="mt-10 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
              {faqs.map((faq, i) => (
                <details key={i} className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-medium hover:text-rose-600">
                    {faq.question}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-300 text-rose-600 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-5 text-sm text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section id="cta" className="relative overflow-hidden border-b border-gray-200 bg-gray-900 text-white">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display text-[20vw] leading-none text-white/[0.05]">
          READY
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(circle at 80% 50%, #e11d48 0%, transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
          <div className="mb-4 text-sm uppercase tracking-widest text-white/60">[ Ready When You Are ]</div>
          <h2 className="font-display text-4xl leading-tight md:text-6xl">
            {location.cta || `Get Your Free ${cityName} Website Audit`}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/70">
            Free audit — 48 hours. Get your comprehensive website analysis today.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-gray-900"
            >
              Get Started ↗
            </a>
            <a
              href="tel:+18885552542"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-medium text-white"
            >
              +1-888-555-CLICK
            </a>
          </div>
        </div>
      </section>

      {/* ===== INTERNAL LINKS ===== */}
      {hasInternalLinks && (
        <footer className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-4 text-sm uppercase tracking-widest text-gray-500">[ Related ]</div>
          <div className="grid gap-3 md:grid-cols-2">
            {(location.internalLinks || []).map((href: string) => {
              // Clean href for display - remove leading and trailing slashes
              let displayText = href
                .replace(/^\//, '')
                .replace(/\/$/, '')
                .replace(/-/g, ' ');
              
              // Capitalize each word
              displayText = displayText
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
              
              return (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center justify-between rounded-xl border border-gray-200 p-5 transition hover:border-gray-400"
                >
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {displayText}
                  </span>
                  <span className="text-rose-600">→</span>
                </a>
              );
            })}
          </div>
          <div className="mt-12 border-t border-gray-200 pt-6 text-xs text-gray-500">
            Clickmasters — {serviceName} in {cityName}. All rights reserved.
          </div>
        </footer>
      )}
    </div>
  );
}