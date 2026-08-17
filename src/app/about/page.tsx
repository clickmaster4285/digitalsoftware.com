import { Metadata } from "next";
import AboutPageClient from "./AboutClient";
import { AboutPageContent } from "@/content/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us - Clickmasters Digital Marketing Agency",
  description:
    "Learn about Clickmasters Digital Marketing - a full-service agency helping US businesses grow through SEO, PPC, and data-driven strategies. 10+ years of proven results.",
  alternates: {
    canonical: "https://clickmastersdigitalmarketing.com/about",
  },
  openGraph: {
    title: "About Us - Clickmasters Digital Marketing Agency",
    description:
      "Learn about Clickmasters Digital Marketing - a full-service agency helping US businesses grow through SEO, PPC, and data-driven strategies. 10+ years of proven results.",
    url: "https://clickmastersdigitalmarketing.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Clickmasters Digital Marketing Agency",
    description:
      "Learn about Clickmasters Digital Marketing - a full-service agency helping US businesses grow through SEO, PPC, and data-driven strategies. 10+ years of proven results.",
  },
};

export default function Page() {
  return <AboutPageClient />;
}