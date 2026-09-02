// src/content/locations/subPageRegistry.ts
// Maps location sub-page slugs to their fully-custom content.
// The /{service}/locations/[city] route checks this registry first:
// a match renders the custom page (e.g. the Atlanta SEO page); otherwise it
// falls back to the generic city page built from locationPagesData.

import { atlantaSeoSubPage, type SubPageContent } from "./subpage-atlanta-seo";

export const SUB_PAGE_REGISTRY: Record<string, SubPageContent> = {
  "seo-services-atlanta": atlantaSeoSubPage,
};

export const getSubPageBySlug = (slug: string): SubPageContent | undefined =>
  SUB_PAGE_REGISTRY[slug];