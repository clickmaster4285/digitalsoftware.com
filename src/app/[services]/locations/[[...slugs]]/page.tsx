// src/app/[services]/locations/[[...slugs]]/page.tsx

import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getLocationBySlug,
} from "@/content/location/combined-location-index";
import type { Metadata } from "next";
import LocationClient from "@/components/locations/LocationClient";

// ============================================
// VALID ROUTE SERVICES
// ============================================

const allowedServices = [
  "content-marketing",
  "search-engine-optimization",
  "social-media-marketing",
];

// ============================================
// GENERATE STATIC PARAMS
// ============================================

export async function generateStaticParams() {
  const allSlugs = getAllSlugs();

  const paths: { services: string; slugs: string[] }[] = [];

  for (const slug of allSlugs) {
    const cleanSlug = slug.replace(/^\/|\/$/g, "");
    const slugParts = cleanSlug.split("/").filter(Boolean);

    // Determine correct route from slug
    let routeService = "";

    if (cleanSlug.includes("content-marketing")) {
      routeService = "content-marketing";
    } else if (
      cleanSlug.includes("seo") ||
      cleanSlug.includes("search-engine-optimization")
    ) {
      routeService = "search-engine-optimization";
    } else if (
      cleanSlug.includes("social-media-marketing")
    ) {
      routeService = "social-media-marketing";
    } else {
      continue;
    }

    paths.push({
      services: routeService,
      slugs: slugParts,
    });
  }

  return paths;
}

// ============================================
// METADATA
// ============================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ services: string; slugs: string[] }>;
}): Promise<Metadata> {
  const { services, slugs } = await params;

  if (!services || !slugs?.length) {
    return { title: "Not Found" };
  }

  const locationSlug = `/${slugs.join("/")}/`;

  const location = getLocationBySlug(locationSlug);

  if (!location) {
    return { title: "Location Not Found" };
  }

  // Prevent duplicate URLs
  if (!isCorrectServiceRoute(services, location)) {
    return { title: "Not Found" };
  }

  const serviceName = services
    .split("-")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  const cityName = location.city || "";

  const seoTitle =
    location.seoTitle ||
    `${serviceName} in ${cityName} `;

  const metaDesc =
    location.meta ||
    `Professional ${serviceName} services in ${cityName}`;

  return {
    title: seoTitle,
    description: metaDesc,
    openGraph: {
      title: seoTitle,
      description: metaDesc,
      type: "website",
      url: `https://clickmastersdigitalmarketing.com/${services}/locations${locationSlug}`,
    },
    alternates: {
      canonical: `https://clickmastersdigitalmarketing.com/${services}/locations${locationSlug}`,
    },
  };
}

// ============================================
// SERVICE VALIDATION
// ============================================

function isCorrectServiceRoute(
  routeService: string,
  location: any
) {
  const slug = location.slug.toLowerCase();

  switch (routeService) {
    case "content-marketing":
      return slug.includes("content-marketing");

    case "search-engine-optimization":
      return (
        slug.includes("seo") ||
        slug.includes("search-engine-optimization")
      );

    case "social-media-marketing":
      return slug.includes("social-media-marketing");

    default:
      return false;
  }
}

// ============================================
// HELPERS
// ============================================

function parseGeoBlock(text?: string): string[] {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0);
}

function parseFeatures(
  text?: string
): { title: string; body: string }[] {
  if (!text) return [];

  const items: { title: string; body: string }[] = [];

  let cleanText = text.replace(/^FEATURES:\s*\n?/i, "");
  cleanText = cleanText.replace(/FEATURES:\s*/gi, "");

  const lines = cleanText.split("\n").filter(Boolean);

  let currentTitle = "";
  let currentBody: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (
      trimmed.includes(":") &&
      !trimmed.startsWith("-")
    ) {
      if (currentTitle && currentBody.length) {
        items.push({
          title: currentTitle,
          body: currentBody.join(" "),
        });
      }

      const [title, ...rest] = trimmed.split(":");

      currentTitle = title.trim();
      currentBody = [rest.join(":").trim()];
    } else if (currentTitle) {
      currentBody.push(trimmed);
    }
  }

  if (currentTitle && currentBody.length) {
    items.push({
      title: currentTitle,
      body: currentBody.join(" "),
    });
  }

  return items;
}

function parseCaseStudies(
  text?: string
): { title: string; body: string; metric?: string }[] {
  if (!text) return [];

  const studies: {
    title: string;
    body: string;
    metric?: string;
  }[] = [];

  const parts = text
    .split(/Case Study\s*\d*:?\s*/i)
    .filter(Boolean);

  parts.forEach((part, index) => {
    const lines = part.split("\n").filter(Boolean);

    studies.push({
      title: lines[0] || `Case Study ${index + 1}`,
      body: lines.slice(1).join(" "),
    });
  });

  return studies;
}

// ============================================
// PAGE
// ============================================

// ============================================
// 4. MAIN PAGE COMPONENT (Server)
// ============================================

export default async function ServiceLocationPage({
  params,
}: {
  params: Promise<{ services: string; slugs: string[] }>;
}) {
  const { services, slugs } = await params;

  console.log("Service:", services);
  console.log("Slugs:", slugs);

  // Validate route service
  const allowedServices = [
    "content-marketing",
    "search-engine-optimization",
    "social-media-marketing",
  ];

  if (!allowedServices.includes(services.toLowerCase())) {
    console.log("❌ Invalid route service:", services);
    notFound();
  }

  // Must have at least one slug
  if (!slugs?.length) {
    console.log("❌ No slug found");
    notFound();
  }

  // ONLY USE LAST SLUG
  const lastSlug = slugs[slugs.length - 1].toLowerCase();

  console.log("Last slug:", lastSlug);

  // ============================================
  // VALIDATE LAST SLUG PATTERN
  // ============================================

  const isValidSlug =
    lastSlug.startsWith("content-marketing-") ||
    lastSlug.startsWith("seo-services-") ||
    lastSlug.startsWith("social-media-marketing-");

  if (!isValidSlug) {
    console.log("❌ Invalid slug pattern:", lastSlug);
    notFound();
  }

  // ============================================
  // LOOKUP LOCATION
  // ============================================

  const locationSlug = `/${lastSlug}/`;

  console.log("Looking for:", locationSlug);

  const location = getLocationBySlug(locationSlug);

  if (!location) {
    console.log("❌ Location not found:", locationSlug);
    notFound();
  }

  console.log("✅ Found location:", location.slug);

  // ============================================
  // PREPARE DATA
  // ============================================

  const geoParagraphs = parseGeoBlock(location.geoAeoBlock);
  const features = parseFeatures(location.features);
  const caseStudies = parseCaseStudies(location.caseStudies);
  const faqs = location.faqs || [];

  const serviceName = services
    .split("-")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  const cityName = location.city || "";

  // ============================================
  // RENDER
  // ============================================

  return (
    <LocationClient
      location={location}
      serviceName={serviceName}
      cityName={cityName}
      geoParagraphs={geoParagraphs}
      features={features}
      caseStudies={caseStudies}
      faqs={faqs}
    />
  );
}