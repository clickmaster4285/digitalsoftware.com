import { promises as fs } from 'fs';
import path from 'path';

const siteUrl = 'https://clickmastersdigitalmarketing.com';

function buildUrlElement(url: string, lastMod: string) {
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastMod}</lastmod>\n  </url>`;
}

function toRoutePath(relativePath: string) {
  const normalized = relativePath.replace(/\\/g, '/').replace(/^\//, '');
  if (!normalized || normalized === 'page') return '/';

  const parts = normalized.split('/').filter(Boolean);
  return `/${parts.join('/')}`;
}

async function collectPageRoutes() {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const routes = new Set<string>();

  async function walk(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'api') continue;
      if (['layout.tsx', 'layout.jsx', 'layout.js', 'globals.css', 'not-found.tsx', 'not-found.jsx', 'providers.tsx', 'favicon.ico'].includes(entry.name)) {
        continue;
      }

      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name.startsWith('[') || entry.name.startsWith('(')) {
          continue;
        }
        await walk(fullPath);
        continue;
      }

      if (entry.isFile() && /^(page|route)\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        const relativePath = path.relative(appDir, fullPath);
        const routePath = toRoutePath(relativePath.replace(/\/(page|route)\.(ts|tsx|js|jsx)$/u, ''));
        routes.add(routePath);
      }
    }
  }

  await walk(appDir);

  return Array.from(routes)
    .filter((route) => !route.includes('/api'))
    .filter((route) => !route.startsWith('/[') && !route.includes('[['))
    .sort();
}

export async function GET() {
  const routes = await collectPageRoutes();
  const lastMod = new Date().toISOString().split('T')[0];
  const urls = routes.map((route) => buildUrlElement(`${siteUrl}${route}`, lastMod));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
