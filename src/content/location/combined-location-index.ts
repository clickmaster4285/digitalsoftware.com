// ============================================
// COMBINED LOCATIONS INDEX
// ============================================

// Import helper functions from both location files
import { 
  getAllSlugs as getUSSlugs, 
  getLocationBySlug as getUSLocation,
  getAllCities as getUSCities,
  getLocationsByService as getUSLocationsByService,
  getServiceNames as getUSServiceNames
} from './index';

import { 
  getAllSlugs as getInternationalSlugs, 
  getLocationBySlug as getInternationalLocation,
  getAllCities as getInternationalCities,
  getLocationsByService as getInternationalLocationsByService,
  getAllServiceNames as getInternationalServiceNames
} from './all-locations';

// ============================================
// DIGITAL MARKETING SPECIFIC HELPERS
// ============================================

/**
 * Get ONLY Digital Marketing location by slug
 */
export const getDigitalMarketingLocationBySlug = (
  slug: string
): ReturnType<typeof getUSLocation> | ReturnType<typeof getInternationalLocation> | null => {
  // Check US first
  const usLocation = getUSLocation(slug);
  if (usLocation && slug.toLowerCase().includes('digital-marketing')) {
    return usLocation;
  }

  // Then check International
  const internationalLocation = getInternationalLocation(slug);
  if (internationalLocation && slug.toLowerCase().includes('digital-marketing')) {
    return internationalLocation;
  }

  return null;
};

/**
 * Get all Digital Marketing slugs (US + International)
 */
export const getServiceLocationSlugs = (service: string = 'DigitalMarketing'): string[] => {
  const normalized = service.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase();

  const usSlugs = getUSSlugs().filter((slug: string) => 
    slug.toLowerCase().includes(normalized)
  );
  
  const internationalSlugs = getInternationalSlugs().filter((slug: string) => 
    slug.toLowerCase().includes(normalized)
  );

  console.log(`✅ ${service} - US: ${usSlugs.length} | International: ${internationalSlugs.length}`);

  return [...usSlugs, ...internationalSlugs];
};

// ============================================
// EXISTING COMBINED FUNCTIONS (keep these)
// ============================================

// Get all slugs (US + International)
export const getAllSlugs = () => {
  const usSlugs = getUSSlugs();
  const internationalSlugs = getInternationalSlugs();
  return [...usSlugs, ...internationalSlugs];
};

// Get location by slug (checks both US and International)
export const getLocationBySlug = (slug: string) => {
  const usLocation = getUSLocation(slug);
  if (usLocation) return usLocation;
  
  const internationalLocation = getInternationalLocation(slug);
  if (internationalLocation) return internationalLocation;
  
  return null;
};

// Get all cities (US + International combined, unique)
export const getAllCities = () => {
  const usCities = getUSCities();
  const internationalCities = getInternationalCities();
  const combined = new Set([...usCities, ...internationalCities]);
  return Array.from(combined);
};

// Get locations by service (combined)
export const getLocationsByService = (service: string) => {
  const usLocations = getUSLocationsByService(service) || [];
  const internationalLocations = getInternationalLocationsByService(service) || [];
  return [...usLocations, ...internationalLocations];
};

// Get all service names (combined, unique)
export const getServiceNames = () => {
  const usServices = getUSServiceNames();
  const internationalServices = getInternationalServiceNames();
  const combined = new Set([...usServices, ...internationalServices]);
  return Array.from(combined);
};



/**
 * SMART FILTER: Check if the URL service matches the actual location service
 * Returns location only if it matches, otherwise null (for 404)
 */
export const getLocationByServiceSubServicePath = (
  services: string,      // e.g. "content-marketing" or "pay-per-click-ppc"
  slug: string,          // e.g. "email-marketing" or "google-ads-management"
  locationSlug: string   // full slug like "/email-marketing-albuquerque/"
): ReturnType<typeof getLocationBySlug> | null => {
  if (!locationSlug || typeof locationSlug !== 'string') return null;
  if (!services || typeof services !== 'string') return null;
  if (!slug || typeof slug !== 'string') return null;

  const fullPath = locationSlug.toLowerCase();
  const servicePart = services.toLowerCase();
  const subServicePart = slug.toLowerCase();

  // Get the location first
  const location = getLocationBySlug(locationSlug);
  if (!location) return null;

  // Check if the URL path matches the slug content
  const slugLower = locationSlug.toLowerCase();

  // Strong matching logic
  if (
    slugLower.includes(subServicePart) || 
    slugLower.includes(servicePart) ||
    fullPath.includes(subServicePart)
  ) {
    return location;
  }

  // Extra safety: Check normalized forms of the requested route parts only
  const commonChecks = [
    subServicePart.replace(/-/g, ''),
    servicePart.replace(/-/g, ''),
  ];

  for (const check of commonChecks) {
    if (slugLower.includes(check)) {
      return location;
    }
  }

  // If none matched → wrong service in URL
 
  return null;
};





export const getLocationByServicePath = (
  services: string,      // e.g. "content-marketing" or "pay-per-click-ppc"
  slug: string,          // e.g. "email-marketing" or "google-ads-management"
  locationSlug: string   // full slug like "/email-marketing-albuquerque/"
): ReturnType<typeof getLocationBySlug> | null => {
  if (!locationSlug || typeof locationSlug !== 'string') return null;
  if (!services || typeof services !== 'string') return null;
  if (!slug || typeof slug !== 'string') return null;

  const fullPath = locationSlug.toLowerCase();
  const servicePart = services.toLowerCase();
  const subServicePart = slug.toLowerCase();

  // Get the location first
  const location = getLocationBySlug(locationSlug);
  if (!location) return null;

  // Check if the URL path matches the slug content
  const slugLower = locationSlug.toLowerCase();

  // Strong matching logic
  if (
    slugLower.includes(subServicePart) || 
    slugLower.includes(servicePart) ||
    fullPath.includes(subServicePart)
  ) {
    return location;
  }

  // Extra safety: Check normalized forms of the requested route parts only
  const commonChecks = [
    subServicePart.replace(/-/g, ''),
    servicePart.replace(/-/g, ''),
  ];

  for (const check of commonChecks) {
    if (slugLower.includes(check)) {
      return location;
    }
  }

  // If none matched → wrong service in URL
  
  return null;
};







// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  getAllSlugs,
  getLocationBySlug,
  getLocationByServicePath,
  getLocationByServiceSubServicePath,
  getDigitalMarketingLocationBySlug,   // ← NEW
  getServiceLocationSlugs,             // ← NEW
  getAllCities,
  getLocationsByService,
  getServiceNames,
};