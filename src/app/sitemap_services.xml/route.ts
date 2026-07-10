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
      const urlMatch = block.match(/metadata:\s*\{[\s\S]*?url:\s*["']([^"']+)["']/);

      if (!slugMatch || !urlMatch) continue;

      const slug = slugMatch[1];
      const url = urlMatch[1];

      if (slug.toLowerCase().includes('blog') || url.toLowerCase().includes('/blog')) continue;
      if (!url.startsWith('/')) continue;

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
