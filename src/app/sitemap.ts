import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/site-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries();
}
