import { promises as fs } from 'fs';
import path from 'path';

const siteUrl = 'https://clickmastersdigitalmarketing.com';

function buildUrlElement(url: string, lastMod: string) {
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastMod}</lastmod>\n  </url>`;
}

function extractContentBlocks(content: string) {
  const blocks: string[] = [];
  const regex = /export\s+const\s+\w+\s*=\s*\{([\s\S]*?)\n\};/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    blocks.push(match[1]);
  }

  return blocks;
}

// This mapping tells the sitemap which parent category each service belongs to
// If a slug is not in this list, it's treated as a standalone page (like /about-us)
const slugToParent: Record<string, string> = {
  // SEO Services
  "on-page-seo": "search-engine-optimization",
  "off-page-seo-link-building": "search-engine-optimization",
  "technical-seo": "search-engine-optimization",
  "local-seo": "search-engine-optimization",
  "enterprise-seo": "search-engine-optimization",
  "ecommerce-seo": "search-engine-optimization",
  "ai-seo": "search-engine-optimization",
  "youtube-seo": "search-engine-optimization",
  "seo-audit": "search-engine-optimization",
  "seo-automation": "search-engine-optimization",
  "keyword-research": "search-engine-optimization",
  "google-penalty-recovery": "search-engine-optimization",
  "schema-markup": "search-engine-optimization",
  "voice-search-optimization": "search-engine-optimization",
  "white-label-seo": "search-engine-optimization",
  "seo-services-usa": "search-engine-optimization",
  
  // Pay Per Click
  "ppc-management": "pay-per-click",
  "google-ads-management": "pay-per-click",
  "facebook-instagram-ads": "pay-per-click",
  "linkedin-ads-management": "pay-per-click",
  "youtube-ads-management": "pay-per-click",  // <-- FIXES the YouTube Ads issue
  "remarketing-retargeting": "pay-per-click",
  "marketing-attribution": "pay-per-click",
  
  // Social Media Marketing
  "social-media-content-creation": "social-media-marketing",
  "social-media-strategy-consulting": "social-media-marketing",
  "tiktok-shop-management": "social-media-marketing",
  "influencer-marketing": "social-media-marketing",
  "podcast-production": "social-media-marketing",
  
  // Mobile App Development
  "ios-app-development": "mobile-app-development",
  "android-app-development": "mobile-app-development",
  "react-native-development": "mobile-app-development",
  "flutter-app-development": "mobile-app-development",
  
  // Conversion Rate Optimization
  "cro-services": "conversion-rate-optimization",
  "branding-identity": "conversion-rate-optimization",
  "roi-calculator": "conversion-rate-optimization",
  "data-analytics-reporting": "conversion-rate-optimization",
  
  // Content Marketing
  "email-marketing": "content-marketing",
  "video-marketing": "content-marketing",
  "infographic-design": "content-marketing",
  "case-study-writing": "content-marketing",
  "guest-posting": "content-marketing",
  "pr-media-outreach": "content-marketing",
  "citation-building": "content-marketing",
  
  // Ecommerce
  "ecommerce-development": "ecommerce-services",
  "ecommerce-marketing": "ecommerce-services",
  "ecommerce-analytics": "ecommerce-services",
  "shopify-development": "ecommerce-services",
  "shopify-marketing": "ecommerce-services",
  "magento-development": "ecommerce-services",
  "woocommerce-development": "ecommerce-services",
  "woocommerce-marketing": "ecommerce-services",
  "bigcommerce-marketing": "ecommerce-services",
  "amazon-fba-marketing": "ecommerce-services",
  
  // AI Automation
  "ai-content-generation": "ai-automation",
  "ai-marketing": "ai-automation",
  "ai-ml-development": "ai-automation",
  "ai-personalization": "ai-automation",
  "chatbot-development": "ai-automation",
  "marketing-automation": "ai-automation",
  "predictive-analytics": "ai-automation",
  "api-development-integration": "ai-automation",
  "crm-integration": "ai-automation",
  "custom-software-development": "ai-automation",
  "devops": "ai-automation",
  "cloud-solutions": "ai-automation",
  "iot-development": "ai-automation",
  "ar-vr-development": "ai-automation",
  "blockchain-development": "ai-automation",
  
  // Web Design & Development
  "web-design": "web-design-development",
  "web-development": "web-design-development",
  "web-application-development": "web-design-development",
  "landing-page-design": "web-design-development",
  "ui-ux-design": "web-design-development",
  "logo-design": "web-design-development",
  "graphic-design": "web-design-development",
  "pwa-development": "web-design-development",
  "headless-commerce-development": "web-design-development",
  "website-speed-optimization": "web-design-development",
  "website-maintenance": "web-design-development",
  "ada-compliance-web-accessibility": "web-design-development",
  

};

async function collectServiceRoutes() {
  const servicesDir = path.join(process.cwd(), 'src', 'content', 'services');
  const entries = await fs.readdir(servicesDir);
  const routes = new Set<string>();
  const lastMod = new Date().toISOString().split('T')[0];

  for (const entry of entries) {
    if (!entry.endsWith('.ts')) continue;

    const fullPath = path.join(servicesDir, entry);
    const content = await fs.readFile(fullPath, 'utf8');
    const blocks = extractContentBlocks(content);

    for (const block of blocks) {
      const slugMatch = block.match(/slug:\s*["']([^"']+)["']/);
      if (!slugMatch) continue;

      const slug = slugMatch[1];
      
      // Skip blog content
      if (slug.toLowerCase().includes('blog')) continue;

      // Get the parent category from our mapping
      const parent = slugToParent[slug];
      
      // If slug is not in our mapping, skip it (prevents unknown URLs)
      if (parent === undefined) continue;

      let url: string;
      if (parent === "") {
        // Standalone page (like /about-us)
        url = `/${slug}`;
      } else {
        // Nested page (like /pay-per-click/youtube-ads-management)
        url = `/${parent}/${slug}`;
      }

      routes.add(`${siteUrl}${url}`);
    }
  }

  return Array.from(routes).sort();
}

export async function GET() {
  const urls = await collectServiceRoutes();
  const lastMod = new Date().toISOString().split('T')[0];
  const xmlUrls = urls.map((url) => buildUrlElement(url, lastMod));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls.join('\n')}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}