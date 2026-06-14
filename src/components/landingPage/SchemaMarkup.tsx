"use client";

import Script from "next/script";

type Props = {
  schema: any;
  slug?: string;
};

const buildSchemas = (schema: any) => {
  if (!schema) return [];

  const schemas: any[] = [];

  /* ---------------- SERVICE ---------------- */
  if (schema.Service) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: schema.Service.serviceType,
      provider: {
        "@type": "Organization",
        name: schema.Service.provider?.name,
        url: schema.Service.provider?.url,
        logo: schema.Service.provider?.logo,
      },
      areaServed: schema.Service.areaServed,
    });
  }

  /* ---------------- WEB PAGE ---------------- */
  if (schema.WebPage) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: schema.WebPage.name,
      description: schema.WebPage.description,
      url: schema.WebPage.url,
      publisher: schema.WebPage.publisher,
      author: schema.WebPage.author,
    });
  }

  /* ---------------- ARTICLE ---------------- */
  if (schema.Article) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: schema.Article.headline,
      description: schema.Article.description,
      author: schema.Article.author,
      publisher: schema.Article.publisher,
      datePublished: schema.Article.datePublished,
      dateModified: schema.Article.dateModified,
      mainEntityOfPage: schema.Article.mainEntityOfPage,
    });
  }

  /* ---------------- DEFINED TERM SET ---------------- */
  if (schema.DefinedTermSet) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: schema.DefinedTermSet.name,
      description: schema.DefinedTermSet.description,
      url: schema.DefinedTermSet.url,
      hasDefinedTerm: schema.DefinedTermSet.hasDefinedTerm,
    });
  }

  /* ---------------- WEB APPLICATION ---------------- */
  if (schema.WebApplication) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: schema.WebApplication.name,
      description: schema.WebApplication.description,
      applicationCategory: schema.WebApplication.applicationCategory,
      offers: schema.WebApplication.offers,
      url: schema.WebApplication.url,
      provider: schema.WebApplication.provider,
    });
  }

  /* ---------------- HOW TO ---------------- */
  if (schema.HowTo) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: schema.HowTo.name,
      description: schema.HowTo.description,
      step: schema.HowTo.step,
    });
  }

  /* ---------------- ORGANIZATION ---------------- */
  if (schema.Organization) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: schema.Organization.name,
      url: schema.Organization.url,
      logo: schema.Organization.logo,
      sameAs: schema.Organization.sameAs,
    });
  }

  /* ---------------- FAQ PAGE ---------------- */
  if (schema.FAQPage) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: schema.FAQPage.items.map((q: string) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Answer available on page content",
        },
      })),
    });
  }

  /* ---------------- BREADCRUMB ---------------- */
  if (schema.BreadcrumbList) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: schema.BreadcrumbList.items.map((b: any) => ({
        "@type": "ListItem",
        position: b.position,
        name: b.name,
        item: b.url,
      })),
    });
  }

  return schemas;
};

export default function SchemaMarkup({ schema }: Props) {
  const schemas = buildSchemas(schema);

  if (!schemas.length) return null;

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(s),
          }}
        />
      ))}
    </>
  );
}