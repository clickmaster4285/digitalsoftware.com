import { notFound } from 'next/navigation';
import { 
  getAllSlugs, 
  getLocationBySlug,
} from '@/content/location/combined-location-index';
import type { Metadata } from 'next';
import LocationClient from './LocationClient';

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
  const slug = `/${slugs.join('/')}/`;
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
      canonical: `https://clickmastersdigitalmarketing.com/locations${slug}`,
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
  
  // Remove the "FEATURES:" header if present
  let cleanText = text.replace(/^FEATURES:\s*\n?/i, '');
  cleanText = cleanText.replace(/FEATURES:\s*/gi, '');
  
  const lines = cleanText.split('\n').filter(Boolean);
  
  let currentTitle = '';
  let currentBody: string[] = [];
  let isCollectingBody = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip empty lines
    if (!trimmed) continue;
    
    // Check if this line starts a new feature (ends with colon)
    if (trimmed.includes(':') && 
        !trimmed.startsWith('-') && 
        !trimmed.startsWith('•') && 
        !trimmed.startsWith('*') &&
        !trimmed.startsWith('—')) {
      
      // Save previous feature if exists
      if (currentTitle && currentBody.length > 0) {
        items.push({
          title: currentTitle,
          body: currentBody.join(' ').trim(),
        });
      } else if (currentTitle && currentBody.length === 0) {
        // If title exists but no body yet, this might be a multi-line title
        // Check if this is actually a new feature
        currentBody = [];
      }
      
      // Start new feature
      const [title, ...rest] = trimmed.split(':');
      currentTitle = title.trim();
      
      // If there's content after the colon on the same line, add it to body
      const restContent = rest.join(':').trim();
      if (restContent) {
        currentBody = [restContent];
        isCollectingBody = true;
      } else {
        currentBody = [];
        isCollectingBody = false;
      }
    } else if (currentTitle) {
      // This is a continuation of the current feature body
      currentBody.push(trimmed);
      isCollectingBody = true;
    }
  }
  
  // Save the last feature
  if (currentTitle && currentBody.length > 0) {
    items.push({
      title: currentTitle,
      body: currentBody.join(' ').trim(),
    });
  }
  
  // If no features were parsed, try a different approach - split by double newline
  if (items.length === 0 && cleanText.includes('\n\n')) {
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

// ============================================
// 4. MAIN PAGE COMPONENT (Server)
// ============================================

export default async function LocationPage({ 
  params 
}: { 
  params: Promise<{ slugs: string[] }> 
}) {
  const { slugs } = await params;
  const slug = `/${slugs.join('/')}/`;
  const location = getLocationBySlug(slug);
  
  if (!location) {
    notFound();
  }

  const geoParagraphs = parseGeoBlock(location.geoAeoBlock);
  const features = parseFeatures(location.features);
  const caseStudies = parseCaseStudies(location.caseStudies);
  const faqs = location.faqs || [];

  const serviceName = slugs[0]?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || '';
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