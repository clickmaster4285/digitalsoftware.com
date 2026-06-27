// src/app/[services]/locations/[[...slugs]]/page.tsx
import { notFound } from 'next/navigation';
import { 
  getAllSlugs, 
  getLocationBySlug,
  getServiceNames, // Import this from your combined index
} from '@/content/location/combined-location-index';
import type { Metadata } from 'next';
import LocationClient from '@/components/locations/LocationClient';

// ============================================
// 1. GENERATE STATIC PARAMS
// ============================================
export async function generateStaticParams() {
  const allSlugs = getAllSlugs();
  
  // Get service names from your combined index
  // This function should already exist in your combined-location-index
  let services: string[] = [];
  
  try {
    // Try to get services from your index
    const serviceNames = getServiceNames();
    if (serviceNames && serviceNames.length > 0) {
      services = serviceNames;
    }
  } catch (error) {
    console.warn('Could not get service names from index, using fallback');
  }
  
  // Fallback: Extract from slugs if no services found
  if (services.length === 0) {
    const serviceSet = new Set<string>();
    for (const slug of allSlugs) {
      // Extract service from slug pattern: /content-marketing-albuquerque/
      const cleanSlug = slug.replace(/^\/|\/$/g, '');
      const parts = cleanSlug.split('-');
      // Check if it matches pattern: service-city
      if (parts.length >= 2) {
        // Try to find the service part
        const possibleService = parts.slice(0, -1).join('-');
        serviceSet.add(possibleService);
      }
    }
    services = Array.from(serviceSet);
  }
  
  // Additional fallback: Common services
  if (services.length === 0) {
    services = [
      'content-marketing',
      'digital-marketing',
      'seo',
      'web-design',
      'email-marketing',
      'social-media',
      'google-ads-management',
      'local-seo',
      'ppc-management',
      'ecommerce-marketing'
    ];
  }
  
  const paths = [];
  for (const service of services) {
    for (const slug of allSlugs) {
      const cleanSlug = slug.replace(/^\/|\/$/g, '');
      const slugParts = cleanSlug.split('/').filter(Boolean);
      
      // If slugParts is empty, use the slug itself
      const parts = slugParts.length > 0 ? slugParts : [cleanSlug];
      
      paths.push({
        services: service,
        slugs: parts,
      });
    }
  }
  
  // Remove duplicates
  const uniquePaths = Array.from(
    new Set(paths.map(p => JSON.stringify(p)))
  ).map(p => JSON.parse(p));
  
  return uniquePaths;
}

// ============================================
// 2. GENERATE METADATA
// ============================================
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ services: string; slugs: string[] }> 
}): Promise<Metadata> {
  const { services, slugs } = await params;
  
  if (!services) {
    return {
      title: 'Service Not Found',
    };
  }
  
  const slug = `/${slugs.join('/')}/`;
  const location = getLocationBySlug(slug);
  
  if (!location) {
    return {
      title: 'Location Not Found',
    };
  }

  const serviceName = services.split('-').map(word => 
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
      url: `https://clickmastersdigitalmarketing.com/${services}/locations/${slug}`,
    },
    alternates: {
      canonical: `https://clickmastersdigitalmarketing.com/${services}/locations${slug}`,
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
  params 
}: { 
  params: Promise<{ services: string; slugs: string[] }> 
}) {
  const { services, slugs } = await params;
  
  // Check if services exists
  if (!services) {
    notFound();
  }
  
  const slug = `/${slugs.join('/')}/`;
  const location = getLocationBySlug(slug);
  
  if (!location) {
    notFound();
  }

  const geoParagraphs = parseGeoBlock(location.geoAeoBlock);
  const features = parseFeatures(location.features);
  const caseStudies = parseCaseStudies(location.caseStudies);
  const faqs = location.faqs || [];

  // Use 'services' parameter to get the service name
  const serviceName = services.split('-').map(word => 
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