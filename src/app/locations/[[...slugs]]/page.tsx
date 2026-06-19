import { notFound } from 'next/navigation';
import { 
  getAllSlugs, 
  getLocationBySlug,
} from '@/content/location';
import type { Metadata } from 'next';

// ============================================
// 1. GENERATE STATIC PARAMS
// ============================================
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slugs: slug.split('/').filter(Boolean),
  }));
}

// ============================================
// 2. GENERATE METADATA
// ============================================
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slugs: string[] }> 
}): Promise<Metadata> {
  const { slugs } = await params;
  const slug = slugs.join('/');
  const location = getLocationBySlug(slug);
  
  if (!location) {
    return {
      title: 'Location Not Found',
    };
  }

  const serviceName = slugs[0]?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || '';
  
  const cityName = location.city || '';
  const seoTitle = location.seoTitle || `${serviceName} in ${cityName} | Clickmasters`;
  const metaDesc = location.meta || `Professional ${serviceName} services in ${cityName}`;

  return {
    title: seoTitle,
    description: metaDesc,
    openGraph: {
      title: seoTitle,
      description: metaDesc,
      type: 'website',
      url: `https://clickmastersdigitalmarketing.com/locations/${slug}`,
    },
    alternates: {
      canonical: `https://clickmastersdigitalmarketing.com/locations/${slug}`,
    },
  };
}

// ============================================
// 3. HELPER FUNCTIONS
// ============================================

function parseGeoBlock(text: string | undefined): string[] {
  if (!text) return [];
  return text.split(/\n\s*\n/).filter((p: string) => p.trim().length > 0);
}

function parseFeatures(text: string | undefined): { title: string; body: string }[] {
  if (!text) return [];
  
  const items: { title: string; body: string }[] = [];
  const lines = text.split('\n').filter(Boolean);
  
  let currentTitle = '';
  let currentBody: string[] = [];
  
  for (const line of lines) {
    if (line.includes(':')) {
      if (currentTitle && currentBody.length > 0) {
        items.push({
          title: currentTitle,
          body: currentBody.join(' ').trim(),
        });
      }
      const [title, ...rest] = line.split(':');
      currentTitle = title.trim();
      currentBody = [rest.join(':').trim()];
    } else if (currentTitle) {
      currentBody.push(line.trim());
    }
  }
  
  if (currentTitle && currentBody.length > 0) {
    items.push({
      title: currentTitle,
      body: currentBody.join(' ').trim(),
    });
  }
  
  return items;
}

function parseCaseStudies(text: string | undefined): { title: string; body: string; metric?: string }[] {
  if (!text) return [];
  
  const studies: { title: string; body: string; metric?: string }[] = [];
  const parts = text.split('Case Study').filter(Boolean);
  
  parts.forEach((part, index) => {
    const lines = part.split('\n').filter(Boolean);
    const firstLine = lines[0] || '';
    const titleMatch = firstLine.match(/^(\d+):\s*(.+)/);
    const title = titleMatch ? titleMatch[2] : firstLine;
    const body = lines.slice(1).join(' ').trim();
    
    const metricMatch = body.match(/(\d+%|\+\d+x|\$\d+[MB])/);
    
    studies.push({
      title: title || `Case Study ${index + 1}`,
      body: body || firstLine,
      metric: metricMatch ? metricMatch[1] : undefined,
    });
  });
  
  return studies;
}

function parseFAQ(text: string | undefined): { question: string; answer: string }[] {
  if (!text) return [];
  
  const faqs: { question: string; answer: string }[] = [];
  const lines = text.split('\n').filter(Boolean);
  
  let currentQuestion = '';
  let currentAnswer: string[] = [];
  
  for (const line of lines) {
    if (line.includes('?')) {
      if (currentQuestion && currentAnswer.length > 0) {
        faqs.push({
          question: currentQuestion,
          answer: currentAnswer.join(' ').trim(),
        });
      }
      currentQuestion = line.trim();
      currentAnswer = [];
    } else if (currentQuestion) {
      currentAnswer.push(line.trim());
    }
  }
  
  if (currentQuestion && currentAnswer.length > 0) {
    faqs.push({
      question: currentQuestion,
      answer: currentAnswer.join(' ').trim(),
    });
  }
  
  return faqs;
}

// ============================================
// 4. MAIN PAGE COMPONENT
// ============================================
export default async function LocationPage({ 
  params 
}: { 
  params: Promise<{ slugs: string[] }> 
}) {
  const { slugs } = await params;
  const slug = slugs.join('/');
  const location = getLocationBySlug(slug);
  
  if (!location) {
    notFound();
  }

  const geoParagraphs = parseGeoBlock(location.geoAeoBlock);
  const features = parseFeatures(location.features);
  const caseStudies = parseCaseStudies(location.caseStudies);
  const faqs = parseFAQ(location.faq);

  const serviceName = slugs[0]?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || '';
  const cityName = location.city || '';

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
            {geoParagraphs.length > 0 ? (
              geoParagraphs.map((para: string, i: number) => (
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
              ))
            ) : (
              <p className="text-gray-500">No content available for this location.</p>
            )}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
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
            {features.length > 0 ? (
              features.map((feature, i) => (
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
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500 py-12">No features available for this location.</p>
            )}
          </div>
        </div>
      </section>

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
            {caseStudies.length > 0 ? (
              caseStudies.map((study, i) => (
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
              ))
            ) : (
              <p className="text-center text-gray-500 py-12">No case studies available for this location.</p>
            )}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="relative overflow-hidden border-b border-gray-200 bg-gray-50 text-gray-900">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display text-[18vw] leading-none text-gray-900/[0.04]">
          QUESTIONS
        </div>
        <div className="relative mx-auto max-w-3xl px-6 py-28">
          <div>
            <div className="mb-4 text-sm uppercase tracking-widest text-gray-500">[ FAQs ]</div>
            <h2 className="font-display text-4xl md:text-5xl">
              Frequently asked <span className="text-rose-600">questions.</span>
            </h2>
          </div>
          <div className="mt-10 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
            {faqs.length > 0 ? (
              faqs.map((faq, i) => (
                <details key={i} className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-medium hover:text-rose-600">
                    {faq.question}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-300 text-rose-600 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-5 text-sm text-gray-600">{faq.answer}</p>
                </details>
              ))
            ) : (
              <p className="text-center text-gray-500 py-12">No FAQs available for this location.</p>
            )}
          </div>
        </div>
      </section>

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
      <footer className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-4 text-sm uppercase tracking-widest text-gray-500">[ Related ]</div>
        <div className="grid gap-3 md:grid-cols-2">
          {(location.internalLinks || []).length > 0 ? (
            (location.internalLinks || []).map((href: string) => (
              <a
                key={href}
                href={href}
                className="group flex items-center justify-between rounded-xl border border-gray-200 p-5 transition hover:border-gray-400"
              >
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{href}</span>
                <span className="text-rose-600">→</span>
              </a>
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-500 py-4">No related links available.</p>
          )}
        </div>
        <div className="mt-12 border-t border-gray-200 pt-6 text-xs text-gray-500">
          Clickmasters — {serviceName} in {cityName}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
