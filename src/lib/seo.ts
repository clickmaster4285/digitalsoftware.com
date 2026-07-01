export const SITE_URL = "https://clickmastersdigitalmarketing.com";

/** Normalize any path or URL to a canonical absolute URL without trailing slash. */
export function toCanonicalUrl(pathOrUrl: string): string {
  const raw = pathOrUrl.trim();
  if (!raw) return SITE_URL;

  let path = raw.startsWith("http")
    ? raw.replace(SITE_URL, "")
    : raw;

  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/+$/, "") || "/";

  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
