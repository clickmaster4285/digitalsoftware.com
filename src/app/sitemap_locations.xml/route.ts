import { promises as fs } from 'fs';
import path from 'path';
import {
  getAllSlugs,
  getServiceNames,
  getLocationByServicePath,
  getLocationByServiceSubServicePath,
} from '@/content/location/combined-location-index';

const siteUrl = 'https://clickmastersdigitalmarketing.com';
const locationPrefix = '/locations';

function buildUrlElement(url: string, lastMod: string) {
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastMod}</lastmod>\n  </url>`;
}

function normalizeSlug(slug: string) {
  return `/${slug.trim().replace(/^\/+|\/+$/g, '')}/`.replace('//', '/');
}

function normalizeService(service: string) {
  return service.trim().replace(/^\/+|\/+$/g, '');
}

async function collectServiceRoutes() {
  const servicesDir = path.join(process.cwd(), 'src', 'content', 'services');
  const entries = await fs.readdir(servicesDir);
  const routes = new Set<string>();

  for (const entry of entries) {
    if (!entry.endsWith('.ts')) continue;

    const fullPath = path.join(servicesDir, entry);
    const content = await fs.readFile(fullPath, 'utf8');
    const blocks = content.match(/export\s+const\s+\w+\s*=\s*\{[\s\S]*?\n\};/g) || [];

    for (const block of blocks) {
      const slugMatch = block.match(/slug:\s*["']([^"']+)["']/);
      const urlMatch = block.match(/metadata:\s*\{[\s\S]*?url:\s*["']([^"']+)["']/);

      if (!slugMatch || !urlMatch) continue;

      const url = urlMatch[1];
      if (!url.startsWith('/')) continue;
      if (url.toLowerCase().includes('/blog')) continue;

      routes.add(url);
    }
  }

  return Array.from(routes).sort();
}

export async function GET() {
  const slugs = getAllSlugs().map(normalizeSlug);
  const serviceNames = getServiceNames().map(normalizeService);
  const serviceUrls = await collectServiceRoutes();
  const lastMod = new Date().toISOString().split('T')[0];
  const urls = new Set<string>();

  for (const slug of slugs) {
    urls.add(`${siteUrl}${locationPrefix}${slug}`);

    for (const service of serviceNames) {
      if (getLocationByServicePath(service, slug)) {
        urls.add(`${siteUrl}/${service}${locationPrefix}${slug}`);
      }
    }
  }

  for (const serviceUrl of serviceUrls) {
    const cleanUrl = serviceUrl.replace(/^\/+|\/+$/g, '');
    const parts = cleanUrl.split('/').filter(Boolean);

    if (parts.length < 2) continue;

    const [service, slug] = parts;

    for (const locationSlug of slugs) {
      if (getLocationByServiceSubServicePath(service, slug, locationSlug)) {
        urls.add(`${siteUrl}/${service}/${slug}${locationPrefix}${locationSlug}`);
      }
    }
  }

  const xmlUrls = Array.from(urls)
    .sort()
    .map((url) => buildUrlElement(url, lastMod));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls.join('\n')}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
