// src/content/locations/subPageRegistry.ts
// Maps location sub-page slugs to their fully-custom content.
// The /{service}/locations/[city] route checks this registry first:
// a match renders the custom page (e.g. the Atlanta SEO page); otherwise it
// falls back to the generic city page built from locationPagesData.

import { atlantaSeoSubPage, type SubPageContent } from "./subpage-atlanta-seo";
import { baltimoreSeoSubPage } from "./subpage-baltimore-seo";
import { birminghamSeoSubPage } from "./subpage-birmingham-seo";
import { boiseSeoSubPage } from "./subpage-boise-seo";
import { bostonSeoSubPage } from "./subpage-boston-seo";
import { charlotteSeoSubPage } from "./subpage-charlotte-seo";
import { chattanoogaSeoSubPage } from "./subpage-chattanooga-seo";
import { chicagoSeoSubPage } from "./subpage-chicago-seo";
import { dallasSeoSubPage } from "./subpage-dallas-seo";
import { denverSeoSubPage } from "./subpage-denver-seo";
import { cincinnatiSeoSubPage } from "./subpage-cincinnati-seo";
import { greenvilleSeoSubPage } from "./subpage-greenville-seo";
import { huntsvilleSeoSubPage } from "./subpage-huntsville-seo";
import { indianapolisSeoSubPage } from "./subpage-indianapolis-seo";
import { louisvilleSeoSubPage } from "./subpage-louisville-seo";

export const SUB_PAGE_REGISTRY: Record<string, SubPageContent> = {
  "seo-services-atlanta": atlantaSeoSubPage,
  "seo-services-baltimore": baltimoreSeoSubPage,
  "seo-services-birmingham": birminghamSeoSubPage,
  "seo-services-boise": boiseSeoSubPage,
  "seo-services-boston": bostonSeoSubPage,
  "seo-services-charlotte": charlotteSeoSubPage,
  "seo-services-chattanooga": chattanoogaSeoSubPage,
  "seo-services-chicago": chicagoSeoSubPage,
  "seo-services-dallas": dallasSeoSubPage,
  "seo-services-denver": denverSeoSubPage,
  "seo-services-cincinnati": cincinnatiSeoSubPage,
  "seo-services-greenville": greenvilleSeoSubPage,
  "seo-services-huntsville": huntsvilleSeoSubPage,
  "seo-services-indianapolis": indianapolisSeoSubPage,
  "seo-services-louisville": louisvilleSeoSubPage,
};

export const getSubPageBySlug = (slug: string): SubPageContent | undefined =>
  SUB_PAGE_REGISTRY[slug];