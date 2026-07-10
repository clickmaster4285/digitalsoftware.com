import { getAllSlugs } from '@/content/location/combined-location-index';

const siteUrl = 'https://clickmastersdigitalmarketing.com';

// Define all US cities
const usCities = [
  'albuquerque', 'atlanta', 'austin', 'baltimore', 'birmingham', 'boise', 
  'boston', 'charlotte', 'chicago', 'cincinnati', 'cleveland', 'dallas', 
  'denver', 'des-moines', 'houston', 'huntsville', 'indianapolis', 'jacksonville', 
  'kansas-city', 'knoxville', 'las-vegas', 'los-angeles', 'louisville', 'memphis', 
  'miami', 'minneapolis', 'nashville', 'new-orleans', 'new-york', 'oklahoma-city', 
  'omaha', 'orlando', 'philadelphia', 'phoenix', 'pittsburgh', 'portland', 
  'raleigh', 'richmond', 'sacramento', 'salt-lake-city', 'san-antonio', 
  'san-diego', 'san-francisco', 'seattle', 'st-louis', 'tampa', 'tulsa', 'wichita'
];

// Define international cities
const internationalCities = [
  'abu-dhabi', 'birmingham-uk', 'brisbane', 'bristol', 'calgary', 'dubai', 
  'edinburgh', 'glasgow', 'karachi', 'lahore', 'leeds', 'london', 'manchester', 
  'melbourne', 'montreal', 'perth', 'sharjah', 'sydney', 'toronto', 'vancouver'
];

// Define all services and their URL paths
const services = {
  // US Services
  'content-marketing': '/content-marketing/locations/content-marketing-',
  'digital-marketing-agency': '/locations/digital-marketing-agency-',
  'email-marketing': '/content-marketing/email-marketing/locations/email-marketing-',
  'google-ads-management': '/pay-per-click-ppc/google-ads-management/locations/google-ads-management-',
  'local-seo': '/search-engine-optimization/local-seo/locations/local-seo-services-',
  'seo': '/search-engine-optimization/locations/seo-services-',
  'social-media': '/social-media-marketing/locations/social-media-marketing-',
  'web-design': '/web-design-development/web-design/locations/web-design-',
  // International-only services
  'web-design-agency': '/web-design-development/web-design-agency/locations/web-design-agency-',
  'web-development': '/web-design-development/web-development/locations/web-development-',
  'ppc-management': '/pay-per-click/ppc-management/locations/ppc-management-'
};

// Define which services apply to which city groups
const cityServiceMap = {
  us: [
    'content-marketing', 'digital-marketing-agency', 'email-marketing', 
    'google-ads-management', 'local-seo', 'seo', 'social-media', 'web-design'
  ],
  international: [
    'content-marketing', 'digital-marketing-agency', 'email-marketing', 
    'google-ads-management', 'local-seo', 'seo', 'social-media', 
    'web-design', 'web-design-agency', 'web-development', 'ppc-management'
  ]
};

function buildUrlElement(url: string, lastMod: string) {
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastMod}</lastmod>\n  </url>`;
}

export async function GET() {
  const lastMod = new Date().toISOString().split('T')[0];
  const urls: string[] = [];

  // Generate US URLs
  usCities.forEach(city => {
    cityServiceMap.us.forEach(service => {
      const servicePath = services[service as keyof typeof services];
      const fullUrl = `${siteUrl}${servicePath}${city}/`;
      urls.push(buildUrlElement(fullUrl, lastMod));
    });
  });

  // Generate International URLs
  internationalCities.forEach(city => {
    cityServiceMap.international.forEach(service => {
      const servicePath = services[service as keyof typeof services];
      const fullUrl = `${siteUrl}${servicePath}${city}/`;
      urls.push(buildUrlElement(fullUrl, lastMod));
    });
  });

  // Add special URLs (like UAE content marketing)
  const specialUrls = [
    `${siteUrl}/content-marketing/locations/content-marketing-uae/`
  ];
  specialUrls.forEach(url => {
    urls.push(buildUrlElement(url, lastMod));
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}