// src/app/locations/[slug]/page.tsx

import { getLocationBySlug, getAllLocationSlugs } from "@/content/locations/locationPagesData";
import { LocationPage } from "@/components/locations";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all locations
export async function generateStaticParams() {
  return getAllLocationSlugs();
}

// Generate metadata for each location page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  return {
    title: { absolute: location.metaTitle },
    description: location.metaDescription,
    alternates: {
      canonical: `/locations/${slug}`,
    },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: `/locations/${slug}`,
      siteName: "Clickmasters Digital Marketing",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: location.metaTitle,
      description: location.metaDescription,
    },
  };
}

// Main page component
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }
 
  return <LocationPage data={location} />;
}