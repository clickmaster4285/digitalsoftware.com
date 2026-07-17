// ============================================
// COMBINED LOCATIONS INDEX
// ============================================

import {
  getAllSlugs as getUSSlugs,
  getLocationBySlug as getUSLocation,
  getAllCities as getUSCities,
  getLocationsByService as getUSLocationsByService,
  getServiceNames as getUSServiceNames,
} from "./index";

import {
  getAllSlugs as getInternationalSlugs,
  getLocationBySlug as getInternationalLocation,
  getAllCities as getInternationalCities,
  getLocationsByService as getInternationalLocationsByService,
  getAllServiceNames as getInternationalServiceNames,
} from "./all-locations";

/**
 * Infer the correct location type automatically.
 */
type LocationData =
  | ReturnType<typeof getUSLocation>
  | ReturnType<typeof getInternationalLocation>;

/**
 * Get ONLY Digital Marketing location by slug
 */
export const getDigitalMarketingLocationBySlug = (
  slug: string
): LocationData => {
  const usLocation = getUSLocation(slug);

  if (usLocation && slug.toLowerCase().includes("digital-marketing")) {
    return usLocation;
  }

  const internationalLocation = getInternationalLocation(slug);

  if (
    internationalLocation &&
    slug.toLowerCase().includes("digital-marketing")
  ) {
    return internationalLocation;
  }

  return null;
};

/**
 * Get all Digital Marketing slugs (US + International)
 */
export const getServiceLocationSlugs = (
  service: string = "DigitalMarketing"
): string[] => {
  const normalized = service
    .toLowerCase()
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase();

  const usSlugs = getUSSlugs().filter((slug) =>
    slug.toLowerCase().includes(normalized)
  );

  const internationalSlugs = getInternationalSlugs().filter((slug) =>
    slug.toLowerCase().includes(normalized)
  );

  console.log(
    `✅ ${service} - US: ${usSlugs.length} | International: ${internationalSlugs.length}`
  );

  return [...usSlugs, ...internationalSlugs];
};

// ============================================
// EXISTING COMBINED FUNCTIONS
// ============================================

export const getAllSlugs = () => [
  ...getUSSlugs(),
  ...getInternationalSlugs(),
];

export const getLocationBySlug = (slug: string): LocationData => {
  const usLocation = getUSLocation(slug);

  if (usLocation) return usLocation;

  const internationalLocation = getInternationalLocation(slug);

  if (internationalLocation) return internationalLocation;

  return null;
};

export const getAllCities = () => {
  const combined = new Set([
    ...getUSCities(),
    ...getInternationalCities(),
  ]);

  return Array.from(combined);
};

export const getLocationsByService = (service: string) => [
  ...(getUSLocationsByService(service) || []),
  ...(getInternationalLocationsByService(service) || []),
];

export const getServiceNames = () => {
  const combined = new Set([
    ...getUSServiceNames(),
    ...getInternationalServiceNames(),
  ]);

  return Array.from(combined);
};

// ============================================
// Shared helper
// ============================================

const getLocationFromServicePath = (
  services: string,
  slug: string,
  locationSlug: string
): LocationData => {
  if (!locationSlug || typeof locationSlug !== "string") return null;
  if (!services || typeof services !== "string") return null;
  if (!slug || typeof slug !== "string") return null;

  const location = getLocationBySlug(locationSlug);

  if (!location) return null;

  const slugLower = locationSlug.toLowerCase();

  const servicePart = services.toLowerCase();

  const subServicePart = slug.toLowerCase();

  if (
    slugLower.includes(subServicePart) ||
    slugLower.includes(servicePart)
  ) {
    return location;
  }

  const checks = [
    subServicePart.replace(/-/g, ""),
    servicePart.replace(/-/g, ""),
  ];

  for (const check of checks) {
    if (slugLower.includes(check)) {
      return location;
    }
  }

  console.warn(
    `❌ Service mismatch: ${services}/${slug} for slug ${locationSlug}`
  );

  return null;
};

export const getLocationByServicePath = (
  services: string,
  slug: string,
  locationSlug: string
): LocationData =>
  getLocationFromServicePath(services, slug, locationSlug);

export const getLocationByServiceSubServicePath = (
  services: string,
  slug: string,
  locationSlug: string
): LocationData =>
  getLocationFromServicePath(services, slug, locationSlug);

export default {
  getAllSlugs,
  getLocationBySlug,
  getLocationByServicePath,
  getLocationByServiceSubServicePath,
  getDigitalMarketingLocationBySlug,
  getServiceLocationSlugs,
  getAllCities,
  getLocationsByService,
  getServiceNames,
};