import type { MetadataRoute } from 'next';

const siteUrl = 'https://clickmastersdigitalmarketing.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  return [
    {
      url: `${siteUrl}/sitemap_pages.xml`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/sitemap_services.xml`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/sitemap_locations.xml`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/sitemap_blogs.xml`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
