import { getAllSlugs } from '@/content/location/combined-location-index';

const siteUrl = 'https://clickmastersdigitalmarketing.com';

function buildUrlElement(url: string, lastMod: string) {
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastMod}</lastmod>\n  </url>`;
}

export async function GET() {
  const slugs = getAllSlugs();
  const lastMod = new Date().toISOString().split('T')[0];

  const urls = slugs
    .map((slug: string) => {
      const normalized = slug.startsWith('/') ? slug : `/${slug}`;
      return buildUrlElement(`${siteUrl}/locations${normalized}`, lastMod);
    })
    .filter(Boolean);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
