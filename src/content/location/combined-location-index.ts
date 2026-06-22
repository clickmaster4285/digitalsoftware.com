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
// COMBINED HELPER FUNCTIONS
// ============================================

// Get all slugs (US + International)
export const getAllSlugs = () => {
  const usSlugs = getUSSlugs();
  const internationalSlugs = getInternationalSlugs();
  return [...usSlugs, ...internationalSlugs];
};

// Get location by slug (checks both US and International)
export const getLocationBySlug = (slug: string) => {
  // Check US locations first
  const usLocation = getUSLocation(slug);
  if (usLocation) return usLocation;
  
  // Then check international locations
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

// Helper: Get all location data (all slugs with their data)
export const getAllLocationData = () => {
  const slugs = getAllSlugs();
  const locationData: { [key: string]: any } = {};
  
  slugs.forEach(slug => {
    const data = getLocationBySlug(slug);
    if (data) {
      locationData[slug] = data;
    }
  });
  
  return locationData;
};

// Helper: Get locations by city
export const getLocationsByCity = (city: string) => {
  const allSlugs = getAllSlugs();
  const cityLocations: { [key: string]: any } = {};
  
  allSlugs.forEach(slug => {
    // Check if slug contains the city name (case insensitive)
    if (slug.toLowerCase().includes(city.toLowerCase())) {
      const data = getLocationBySlug(slug);
      if (data) {
        cityLocations[slug] = data;
      }
    }
  });
  
  return cityLocations;
};

// Helper: Get unique cities by service
export const getCitiesByService = (service: string) => {
  const locations = getLocationsByService(service);
  const cities = new Set<string>();
  
  locations.forEach(location => {
    if (location && location.city) {
      cities.add(location.city);
    }
  });
  
  return Array.from(cities);
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  getAllSlugs,
  getLocationBySlug,
  getAllCities,
  getLocationsByService,
  getServiceNames,
  getAllLocationData,
  getLocationsByCity,
  getCitiesByService
};