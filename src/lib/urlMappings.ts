// ============================================
// URL MAPPING VALIDATION MODULE
// ============================================

// ============================================
// 1. CITY DEFINITIONS
// ============================================

const CITIES = {
  // US Cities
  US: [
    'albuquerque', 'atlanta', 'austin', 'baltimore', 'birmingham',
    'boise', 'boston', 'charlotte', 'chicago', 'cincinnati',
    'cleveland', 'dallas', 'denver', 'des-moines', 'houston',
    'huntsville', 'indianapolis', 'jacksonville', 'kansas-city',
    'knoxville', 'las-vegas', 'los-angeles', 'louisville',
    'memphis', 'miami', 'minneapolis', 'nashville', 'new-orleans',
    'new-york', 'oklahoma-city', 'omaha', 'orlando', 'philadelphia',
    'phoenix', 'pittsburgh', 'portland', 'raleigh', 'richmond',
    'sacramento', 'salt-lake-city', 'san-antonio', 'san-diego',
    'san-francisco', 'seattle', 'st-louis', 'tampa', 'tulsa', 'wichita'
  ],
  // International Cities
  International: [
    'abu-dhabi', 'brisbane', 'bristol', 'calgary',
    'dubai', 'edinburgh', 'glasgow', 'karachi', 'lahore',
    'leeds', 'london', 'manchester', 'melbourne', 'montreal',
    'perth', 'sharjah', 'sydney', 'toronto', 'vancouver'
  ]
};

const ALL_CITIES = [...CITIES.US, ...CITIES.International];

// ============================================
// 2. INTERFACES
// ============================================

export interface LocationMapping {
  service: string;
  city: string;
  country: string;
  validPaths: string[];
}

export type UrlMappings = Record<string, LocationMapping>;

// ============================================
// 3. SERVICE CONFIGURATIONS
// ============================================

interface ServiceConfig {
  pathTemplate: (city: string) => string;
  slugPrefix: string;
  service: string;
}

const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  ContentMarketing: {
    pathTemplate: (city: string) => `/content-marketing/locations/content-marketing-${city}/`,
    slugPrefix: 'content-marketing',
    service: 'ContentMarketing'
  },
  DigitalMarketing: {
    pathTemplate: (city: string) => `/locations/digital-marketing-agency-${city}/`,
    slugPrefix: 'digital-marketing-agency',
    service: 'DigitalMarketing'
  },
  EmailMarketing: {
    pathTemplate: (city: string) => `/content-marketing/email-marketing/locations/email-marketing-${city}/`,
    slugPrefix: 'email-marketing',
    service: 'EmailMarketing'
  },
  GoogleAds: {
    pathTemplate: (city: string) => `/pay-per-click-ppc/google-ads-management/locations/google-ads-management-${city}/`,
    slugPrefix: 'google-ads-management',
    service: 'GoogleAds'
  },
  LocalSEO: {
    pathTemplate: (city: string) => `/search-engine-optimization/local-seo/locations/local-seo-services-${city}/`,
    slugPrefix: 'local-seo-services',
    service: 'LocalSEO'
  },
  SEO: {
    pathTemplate: (city: string) => `/search-engine-optimization/locations/seo-services-${city}/`,
    slugPrefix: 'seo-services',
    service: 'SEO'
  },
  SocialMedia: {
    pathTemplate: (city: string) => `/social-media-marketing/locations/social-media-marketing-${city}/`,
    slugPrefix: 'social-media-marketing',
    service: 'SocialMedia'
  },
  WebDesign: {
    pathTemplate: (city: string) => `/web-design-development/web-design/locations/web-design-${city}/`,
    slugPrefix: 'web-design',
    service: 'WebDesign'
  },
  WebDevelopment: {
    pathTemplate: (city: string) => `/web-design-development/web-development/locations/web-development-${city}/`,
    slugPrefix: 'web-development',
    service: 'WebDevelopment'
  },
  PPC: {
    pathTemplate: (city: string) => `/pay-per-click/ppc-management/locations/ppc-management-${city}/`,
    slugPrefix: 'ppc-management',
    service: 'PPC'
  }
};

// ============================================
// 4. GENERATE URL MAPPINGS
// ============================================

export const urlMappings: UrlMappings = {};

// Generate mappings for each service and city
Object.entries(SERVICE_CONFIGS).forEach(([_, config]) => {
  ALL_CITIES.forEach(city => {
    const slug = `${config.slugPrefix}-${city}`;
    const path = config.pathTemplate(city);
    
    urlMappings[slug] = {
      service: config.service,
      city: city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      country: CITIES.US.includes(city) ? 'US' : 'International',
      validPaths: [path]
    };
  });
});

// ============================================
// 5. SPECIAL CASES (overrides / additions)
// ============================================

const specialCases: Record<string, LocationMapping> = {
  'digital-marketing-agency-in-minneapolis': {
    service: 'DigitalMarketing',
    city: 'Minneapolis',
    country: 'US',
    validPaths: ['/locations/digital-marketing-agency-in-minneapolis/']
  },
  'digital-marketing-agency-in-philadelphia': {
    service: 'DigitalMarketing',
    city: 'Philadelphia',
    country: 'US',
    validPaths: ['/locations/digital-marketing-agency-in-philadelphia/']
  },
  'seo-services-chattanooga': {
    service: 'SEO',
    city: 'Chattanooga',
    country: 'US',
    validPaths: ['/search-engine-optimization/locations/seo-services-chattanooga/']
  },
  'seo-services-columbia-sc': {
    service: 'SEO',
    city: 'Columbia',
    country: 'US',
    validPaths: ['/search-engine-optimization/locations/seo-services-columbia-sc/']
  },
  'seo-services-greenville': {
    service: 'SEO',
    city: 'Greenville',
    country: 'US',
    validPaths: ['/search-engine-optimization/locations/seo-services-greenville/']
  }
};

// Merge special cases (they will override if slug already exists)
Object.assign(urlMappings, specialCases);

// ============================================
// 6. URL VALIDATION FUNCTION
// ============================================

/**
 * Validates a URL path against the generated mappings.
 * Checks both slugs and validPaths.
 * 
 * @param urlPath - The URL path to validate (e.g. "/locations/digital-marketing-agency-new-york/" or full URL)
 * @returns The matching LocationMapping if valid, otherwise null
 */
export function validateUrl(urlPath: string): LocationMapping | null {
  // Normalize input: extract pathname if full URL is provided
  let pathname = urlPath;
  
  try {
    if (urlPath.startsWith('http')) {
      pathname = new URL(urlPath).pathname;
    }
  } catch {
    // Not a valid URL, treat as pathname
  }

  // Ensure it ends with slash for consistency
  if (!pathname.endsWith('/')) {
    pathname += '/';
  }

  // First check direct slug match
  const slugKey = Object.keys(urlMappings).find(slug => 
    pathname.includes(slug) || 
    pathname === `/${slug}/`
  );
  
  if (slugKey && urlMappings[slugKey]) {
    return urlMappings[slugKey];
  }

  // Check against all validPaths
  for (const mapping of Object.values(urlMappings)) {
    if (mapping.validPaths.some(validPath => 
      pathname === validPath || 
      pathname.includes(validPath)
    )) {
      return mapping;
    }
  }

  return null;
}

/**
 * Checks if a URL is valid and returns detailed info
 */
export function checkUrl(urlPath: string): {
  isValid: boolean;
  mapping: LocationMapping | null;
  slug?: string;
  service?: string;
  city?: string;
  country?: string;
} {
  const mapping = validateUrl(urlPath);
  
  if (!mapping) {
    return { isValid: false, mapping: null };
  }

  // Find the slug that matches this mapping
  const slug = Object.keys(urlMappings).find(key => 
    urlMappings[key] === mapping
  );

  return {
    isValid: true,
    mapping,
    slug,
    service: mapping.service,
    city: mapping.city,
    country: mapping.country
  };
}

// ============================================
// 7. UTILITY FUNCTIONS
// ============================================

/**
 * Get all valid paths for a specific service
 */
export function getPathsForService(service: string): string[] {
  return Object.values(urlMappings)
    .filter(m => m.service === service)
    .flatMap(m => m.validPaths);
}

/**
 * Get all slugs for a specific service
 */
export function getSlugsForService(service: string): string[] {
  return Object.entries(urlMappings)
    .filter(([_, m]) => m.service === service)
    .map(([slug]) => slug);
}

// Export everything needed
export { CITIES, ALL_CITIES, SERVICE_CONFIGS };