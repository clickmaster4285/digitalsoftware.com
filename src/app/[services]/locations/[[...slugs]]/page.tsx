// src/app/[services]/locations/[[...slugs]]/page.tsx
import { notFound } from 'next/navigation';
import { 
  getAllSlugs, 
  getLocationBySlug,
  getServiceNames, // Import this from your combined index
  getLocationByServicePath,
} from '@/content/location/combined-location-index';
import type { Metadata } from 'next';
import LocationClient from '@/components/locations/LocationClient';

// ============================================
// 1. GENERATE STATIC PARAMS
// ============================================
export async function generateStaticParams() {
  const allSlugs = getAllSlugs();

  // These are the actual route names
  const allowedServices = [
    'content-marketing',
    'search-engine-optimization',
    'social-media-marketing',
  ];

  const paths: { services: string; slugs: string[] }[] = [];

  for (const service of allowedServices) {
    for (const slug of allSlugs) {
      const cleanSlug = slug.replace(/^\/|\/$/g, '');
      const slugParts = cleanSlug.split('/').filter(Boolean);

      paths.push({
        services: service,
        slugs: slugParts,
      });
    }
  }

  return Array.from(
    new Set(paths.map((p) => JSON.stringify(p)))
  ).map((p) => JSON.parse(p));
}

// ============================================
// 2. GENERATE METADATA
// ============================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ services: string; slugs: string[] }>;
}): Promise<Metadata> {
  const { services, slugs } = await params;

  if (!services || !slugs?.length) {
    return { title: "Service Not Found" };
  }

  const locationSlug = `/${slugs.join("/")}/`;
  const location = getLocationBySlug(locationSlug);

  if (!location) {
    return { title: "Location Not Found" };
  }

  const serviceName = services
    .split("-")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  const cityName = location.city || "";

  const seoTitle =
    location.seoTitle ||
    `${serviceName} in ${cityName} | Clickmasters`;

  const metaDesc =
    location.meta ||
    `Professional ${serviceName} services in ${cityName}`;

  return {
    title: seoTitle,
    description: metaDesc,
    openGraph: {
      title: seoTitle,
      description: metaDesc,
      type: "website",
      url: `https://clickmastersdigitalmarketing.com/${services}/locations${locationSlug}`,
    },
    alternates: {
      canonical: `https://clickmastersdigitalmarketing.com/${services}/locations${locationSlug}`,
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
  
  // If no features were parsed, try alternative approach
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
  
  // Split by "Case Study" pattern
  const parts = text.split(/Case Study\s*\d*:?\s*/i).filter(Boolean);
  
  if (parts.length === 0) {
    // Try splitting by numbered patterns
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
// 4. MAIN PAGE COMPONENT (Server)
// ============================================

export default async function ServiceLocationPage({
  params,
}: {
  params: Promise<{ services: string; slugs: string[] }>;
}) {
  const { services, slugs } = await params;

  console.log("services:", services);
  console.log("slugs:", slugs);

  // Route names only
  const allowedServices = [
    "content-marketing",
    "search-engine-optimization",
    "social-media-marketing",
  ];

  // Validate service route
  if (!allowedServices.includes(services.toLowerCase())) {
    console.log("❌ Invalid service:", services);
    notFound();
  }

  // Ensure a location slug exists
  if (!slugs || slugs.length === 0) {
    console.log("❌ No slug found");
    notFound();
  }

  // Example:
  // slugs = ["seo-services-abu-dhabi"]
  const locationSlug = `/${slugs.join("/")}/`;

  console.log("Looking for location:", locationSlug);

  // Simplest lookup
  const location = getLocationBySlug(locationSlug);

  console.log("Found location:", location);

  if (!location) {
    console.log("❌ Location not found:", locationSlug);
    notFound();
  }

  const geoParagraphs = parseGeoBlock(location.geoAeoBlock);
  const features = parseFeatures(location.features);
  const caseStudies = parseCaseStudies(location.caseStudies);
  const faqs = location.faqs || [];

  const serviceName = services
    .split("-")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  const cityName = location.city || "";

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