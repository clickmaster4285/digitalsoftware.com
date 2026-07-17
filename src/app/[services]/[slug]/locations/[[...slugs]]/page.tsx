// src/app/[services]/[slug]/location/[[...slugs]]/page.tsx
import { notFound } from 'next/navigation';
import { 
  getAllSlugs, 
  getLocationBySlug,
  getServiceNames,
  getLocationByServiceSubServicePath,
} from '@/content/location/combined-location-index';
import type { Metadata } from 'next';
import LocationClient from '@/components/locations/LocationClient';

function detectRouteService(fullSlug: string): string {
  const normalized = fullSlug.toLowerCase().replace(/^\/+|\/+$/g, '');

  if (normalized.includes('social-media-marketing')) return 'social-media-marketing';
  if (normalized.includes('content-marketing')) return 'content-marketing';
  if (
    normalized.includes('local-seo-services') ||
    normalized.includes('seo-services') ||
    normalized.includes('search-engine-optimization') ||
    normalized.includes('seo')
  ) {
    return 'search-engine-optimization';
  }
  if (normalized.includes('email-marketing')) return 'email-marketing';
  if (normalized.includes('google-ads-management') || normalized.includes('google-ads')) return 'google-ads-management';
  if (normalized.includes('ppc-management')) return 'ppc-management';
  if (normalized.includes('web-design')) return 'web-design';
  if (normalized.includes('web-development')) return 'web-development';
  if (normalized.includes('digital-marketing')) return 'digital-marketing';

  return 'content-marketing';
}

// ============================================
// 1. GENERATE STATIC PARAMS 
// ============================================
export async function generateStaticParams() {
  const allSlugs = getAllSlugs();
  const paths: { services: string; slug: string; slugs: string[] }[] = [];

  for (const fullSlug of allSlugs) {
    const location = getLocationBySlug(fullSlug);
    if (!location) continue;

    const cleanSlug = fullSlug.replace(/^\/|\/$/g, '');
    const slugParts = cleanSlug.split('/').filter(Boolean);
    const detectedService = detectRouteService(fullSlug);

    paths.push({
      services: detectedService,
      slug: detectedService,
      slugs: slugParts,
    });
  }

  // Remove duplicates
  const uniquePaths = Array.from(
    new Set(paths.map(p => JSON.stringify(p)))
  ).map(p => JSON.parse(p));

  console.log(`Generated ${uniquePaths.length} static paths`);
  return uniquePaths;
}

// ============================================
// 2. GENERATE METADATA
// ============================================
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ services: string; slug: string; slugs: string[] }> 
}): Promise<Metadata> {
  const { services, slug, slugs } = await params;
  
  if (!services || !slug) {
    return { title: 'Service Not Found' };
  }
  
  const locationSlug = `/${slugs.join('/')}/`;
  const location = getLocationByServiceSubServicePath(services, slug, locationSlug); // ← Use smart filter
  
  if (!location) {
    return { title: 'Location Not Found' };
  }

  const serviceName = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
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
      url: `https://clickmastersdigitalmarketing.com/${services}/${slug}/location${locationSlug}`,
    },
    alternates: {
      canonical: `https://clickmastersdigitalmarketing.com/${services}/${slug}/location${locationSlug}`,
    },
  };
}

// ============================================
// 3. HELPER FUNCTIONS (Unchanged)
// ============================================

function parseGeoBlock(text: string | undefined): string[] {
  if (!text) return [];
  return text.split(/\n\s*\n/).filter((p: string) => p.trim().length > 0);
}

function parseFeatures(text: string | undefined): { title: string; body: string }[] {
  if (!text) return [];
  
  const items: { title: string; body: string }[] = [];
  
  let cleanText = text.replace(/^FEATURES:\s*\n?/i, '');
  cleanText = cleanText.replace(/FEATURES:\s*/gi, '');
  
  const lines = cleanText.split('\n').filter(Boolean);
  
  let currentTitle = '';
  let currentBody: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    if (trimmed.includes(':') && 
        !trimmed.startsWith('-') && 
        !trimmed.startsWith('•') && 
        !trimmed.startsWith('*') &&
        !trimmed.startsWith('—')) {
      
      if (currentTitle && currentBody.length > 0) {
        items.push({
          title: currentTitle,
          body: currentBody.join(' ').trim(),
        });
        currentBody = [];
      }
      
      const [title, ...rest] = trimmed.split(':');
      currentTitle = title.trim();
      const restContent = rest.join(':').trim();
      if (restContent) {
        currentBody = [restContent];
      } else {
        currentBody = [];
      }
    } else if (currentTitle) {
      currentBody.push(trimmed);
    }
  }
  
  if (currentTitle && currentBody.length > 0) {
    items.push({
      title: currentTitle,
      body: currentBody.join(' ').trim(),
    });
  }
  
  if (items.length === 0 && cleanText) {
    const sections = cleanText.split(/\n\s*\n/);
    for (const section of sections) {
      const lines2 = section.split('\n').filter(Boolean);
      const firstLine = lines2[0] || '';
      if (firstLine.includes(':')) {
        const [title, ...rest] = firstLine.split(':');
        const body = rest.join(':').trim() + (lines2.slice(1).join(' ').trim() ? ' ' + lines2.slice(1).join(' ').trim() : '');
        items.push({
          title: title.trim(),
          body: body.trim(),
        });
      }
    }
  }
  
  return items;
}

function parseCaseStudies(text: string | undefined): { title: string; body: string; metric?: string }[] {
  if (!text) return [];
  
  const studies: { title: string; body: string; metric?: string }[] = [];
  
  const parts = text.split(/Case Study\s*\d*:?\s*/i).filter(Boolean);
  
  if (parts.length === 0) {
    const numberedParts = text.split(/\d+\.\s+/).filter(Boolean);
    if (numberedParts.length > 0) {
      numberedParts.forEach((part, index) => {
        const lines = part.split('\n').filter(Boolean);
        const firstLine = lines[0] || '';
        const body = lines.slice(1).join(' ').trim();
        const metricMatch = body.match(/(\d+%|\+\d+x|\$\d+[MBK])/);
        
        studies.push({
          title: `Case Study ${index + 1}: ${firstLine.substring(0, 50)}...`,
          body: firstLine + (body ? ' ' + body : ''),
          metric: metricMatch ? metricMatch[1] : undefined,
        });
      });
      return studies;
    }
    return studies;
  }
  
  parts.forEach((part, index) => {
    const lines = part.split('\n').filter(Boolean);
    const firstLine = lines[0] || '';
    const body = lines.slice(1).join(' ').trim();
    
    let title = firstLine;
    title = title.replace(/^(Case Study|Case)\s*\d*:?\s*/i, '');
    if (title.length > 100) {
      title = title.substring(0, 100) + '...';
    }
    
    const metricMatch = body.match(/(\d+%|\+\d+x|\$\d+[MBK])/);
    
    studies.push({
      title: title || `Case Study ${index + 1}`,
      body: firstLine + (body ? ' ' + body : ''),
      metric: metricMatch ? metricMatch[1] : undefined,
    });
  });
  
  return studies;
}

// ============================================
// 4. MAIN PAGE COMPONENT
// ============================================

export default async function ServiceLocationPage({ 
  params 
}: { 
  params: Promise<{ services: string; slug: string; slugs: string[] }> 
}) {
 const { services, slug, slugs } = await params;
  
 console.log(`Params received: services=${services}, slug=${slug}, slugs=${slugs.join(', ')}`);

 
  if (!services || !slug) {
    notFound();
  }
  
  const locationSlug = `/${slugs.join('/')}/`;
  
  // Use the smart filter here
  const location = getLocationByServiceSubServicePath(services, slug, locationSlug);
  
  if (!location) {
    notFound();
  }

  const geoParagraphs = parseGeoBlock(location.geoAeoBlock);
  const features = parseFeatures(location.features);
  const caseStudies = parseCaseStudies(location.caseStudies);
  const faqs = location.faqs || [];

  const serviceName = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  const cityName = location.city || '';

  return (
    <LocationClient
      location={location}
      serviceName={serviceName}
      cityName={cityName}
      geoParagraphs={geoParagraphs}
      features={features}
      caseStudies={caseStudies}
      faqs={faqs}
    />
  );
}