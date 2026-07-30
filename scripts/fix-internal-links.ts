/**
 * Bulk-fix internalLinks in location content files.
 * Converts flat slugs like /seo-services-cincinnati/ to full nested paths.
 */
import fs from 'fs';
import path from 'path';
import { resolveInternalLink } from '../src/lib/urlMappings';

const LOCATION_DIR = path.join(__dirname, '../src/content/location');

function fixInternalLinksInFile(filePath: string): { updated: boolean; count: number } {
  let content = fs.readFileSync(filePath, 'utf-8');
  let totalChanges = 0;
  let fileUpdated = false;

  const updatedContent = content.replace(/internalLinks:\s*(\[[^\]]*\])/g, (fullMatch, arrayStr: string) => {
    let links: string[];
    try {
      links = JSON.parse(arrayStr.replace(/'/g, '"'));
    } catch {
      links = [...arrayStr.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    }

    if (!links.length) return fullMatch;

    let changeCount = 0;
    const resolvedLinks = links.map((link) => {
      const resolved = resolveInternalLink(link);
      if (resolved !== link) changeCount++;
      return resolved;
    });

    if (changeCount === 0) return fullMatch;

    totalChanges += changeCount;
    fileUpdated = true;
    return `internalLinks: ${JSON.stringify(resolvedLinks)}`;
  });

  if (!fileUpdated) return { updated: false, count: 0 };

  fs.writeFileSync(filePath, updatedContent, 'utf-8');
  return { updated: true, count: totalChanges };
}

function main() {
  const files = fs.readdirSync(LOCATION_DIR).filter((f) => f.endsWith('.ts'));
  let filesUpdated = 0;
  let linksFixed = 0;

  for (const file of files) {
    const result = fixInternalLinksInFile(path.join(LOCATION_DIR, file));
    if (result.updated) {
      filesUpdated++;
      linksFixed += result.count;
      console.log(`  ✓ ${file} (${result.count} links)`);
    }
  }

  console.log(`\nDone: ${filesUpdated} files updated, ${linksFixed} links fixed.`);
}

main();
