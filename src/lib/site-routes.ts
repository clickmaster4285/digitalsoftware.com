import { getAllSlugs, getServiceLocationSlugs } from "@/content/location/combined-location-index";
import { SITE_URL, toCanonicalUrl } from "@/lib/seo";

export const TOP_LEVEL_SERVICES = [
  "search-engine-optimization",
  "social-media-marketing",
  "mobile-app-development",
  "conversion-rate-optimization",
  "content-marketing",
  "ai-automation",
  "web-design-development",
  "ecommerce-services",
  "pay-per-click",
] as const;

export const STATIC_PAGES = [
  "/",
  "/contact",
  "/custom-software-development",
  "/website-maintenance-services",
] as const;

/** Maps sub-service slug → parent service segment in the URL. */
export const SLUG_PARENT_MAP: Record<string, string> = {
  "seo-services-usa": "search-engine-optimization",
  "ecommerce-seo": "search-engine-optimization",
  "youtube-seo": "search-engine-optimization",
  "seo-audit": "search-engine-optimization",
  "on-page-seo": "search-engine-optimization",
  "off-page-seo-link-building": "search-engine-optimization",
  "technical-seo": "search-engine-optimization",
  "keyword-research": "search-engine-optimization",
  "enterprise-seo": "search-engine-optimization",
  "ai-seo": "search-engine-optimization",
  "white-label-seo": "search-engine-optimization",
  "schema-markup": "search-engine-optimization",
  "voice-search-optimization": "search-engine-optimization",
  "seo-automation": "search-engine-optimization",
  "citation-building": "search-engine-optimization",
  "local-seo": "search-engine-optimization",
  "guest-posting": "search-engine-optimization",
  "seo-glossary": "search-engine-optimization",
  "google-penalty-recovery": "search-engine-optimization",
  "social-media-marketing": "social-media-marketing",
  "social-media-strategy-consulting": "social-media-marketing",
  "social-media-content-creation": "social-media-marketing",
  "influencer-marketing": "social-media-marketing",
  "online-reputation-management": "social-media-marketing",
  "email-marketing": "content-marketing",
  "content-marketing": "content-marketing",
  "newsletter": "content-marketing",
  "about-us": "content-marketing",
  "our-team": "content-marketing",
  "careers": "content-marketing",
  "case-study-writing": "content-marketing",
  "blog": "content-marketing",
  "white-paper-writing": "content-marketing",
  "testimonials": "content-marketing",
  "digital-marketing-glossary": "content-marketing",
  "podcast-marketing": "content-marketing",
  "video-marketing": "content-marketing",
  "pr-media-outreach": "content-marketing",
  "podcast-production": "content-marketing",
  "ppc-management": "pay-per-click",
  "linkedin-ads-management": "pay-per-click",
  "google-ads-management": "pay-per-click",
  "facebook-instagram-ads": "pay-per-click",
  "youtube-ads-management": "pay-per-click",
  "remarketing-retargeting": "pay-per-click",
  "amazon-marketing": "pay-per-click",
  "amazon-fba-marketing": "pay-per-click",
  "ecommerce-marketing": "pay-per-click",
  "web-design": "web-design-development",
  "ui-ux-design": "web-design-development",
  "graphic-design": "web-design-development",
  "logo-design": "web-design-development",
  "landing-page-design": "web-design-development",
  "infographic-design": "web-design-development",
  "web-development": "web-design-development",
  "web-application-development": "web-design-development",
  "website-speed-optimization": "web-design-development",
  "website-maintenance": "web-design-development",
  "ada-compliance-web-accessibility": "web-design-development",
  "ai-ml-development": "ai-automation",
  "ai-personalization": "ai-automation",
  "data-analytics-reporting": "ai-automation",
  "marketing-attribution": "ai-automation",
  "marketing-automation": "ai-automation",
  "ai-automation": "ai-automation",
  "chatbot-development": "ai-automation",
  "predictive-analytics": "ai-automation",
  "ai-content-generation": "ai-automation",
  "ai-marketing": "ai-automation",
  "api-development-integration": "ai-automation",
  "crm-integration": "ai-automation",
  devops: "ai-automation",
  "cloud-solutions": "ai-automation",
  "iot-development": "ai-automation",
  "ar-vr-development": "ai-automation",
  "blockchain-development": "ai-automation",
  "clickcare-hms": "ai-automation",
  "click-growth-system": "ai-automation",
  clickpos: "ai-automation",
  "ecommerce-development": "ecommerce-services",
  "shopify-development": "ecommerce-services",
  "woocommerce-development": "ecommerce-services",
  "shopify-marketing": "ecommerce-services",
  "woocommerce-marketing": "ecommerce-services",
  "ecommerce-analytics": "ecommerce-services",
  "magento-development": "ecommerce-services",
  "bigcommerce-marketing": "ecommerce-services",
  "headless-commerce-development": "ecommerce-services",
  "tiktok-shop-management": "ecommerce-services",
  "ios-app-development": "mobile-app-development",
  "android-app-development": "mobile-app-development",
  "react-native-development": "mobile-app-development",
  "flutter-app-development": "mobile-app-development",
  "pwa-development": "mobile-app-development",
  "cro-services": "conversion-rate-optimization",
  "branding-identity": "conversion-rate-optimization",
  "roi-calculator": "conversion-rate-optimization",
  "industries-saas": "content-marketing",
  "real-estate-marketing": "content-marketing",
};

function resolveServiceForLocationSlug(slug: string): string | null {
  const lower = slug.toLowerCase();
  if (lower.includes("content-marketing")) return "content-marketing";
  if (lower.includes("social-media-marketing")) return "social-media-marketing";
  if (lower.includes("seo") || lower.includes("search-engine-optimization")) {
    return "search-engine-optimization";
  }
  if (lower.includes("digital-marketing")) return null;
  return null;
}

export function getAllSitemapPaths(): string[] {
  const paths = new Set<string>(STATIC_PAGES);

  for (const service of TOP_LEVEL_SERVICES) {
    paths.add(`/${service}`);
  }

  for (const [slug, parent] of Object.entries(SLUG_PARENT_MAP)) {
    paths.add(`/${parent}/${slug}`);
  }

  for (const slug of getServiceLocationSlugs("DigitalMarketing")) {
    const clean = slug.replace(/^\/|\/$/g, "");
    paths.add(`/locations/${clean}`);
  }

  for (const slug of getAllSlugs()) {
    const clean = slug.replace(/^\/|\/$/g, "");
    const service = resolveServiceForLocationSlug(clean);
    if (service) {
      paths.add(`/${service}/locations/${clean}`);
    }
  }

  return Array.from(paths).sort();
}

export function getSitemapEntries() {
  const now = new Date();
  return getAllSitemapPaths().map((path) => ({
    url: toCanonicalUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : path.split("/").length <= 2 ? 0.9 : 0.7,
  }));
}
