import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import {
  SeoServicesContent,
  SocialMediaMarketingContent,
  MobileAppDevelopmentContent,
  ConversionRateOptimizationContent,
  ContentMarketingServicesContent,
  AIAutomationServicesContent,
  WebDesignServicesContent,
  PayPerClickManagementContent,
  EcommerceServicesContent
} from "@/content/services/main-services";



const contentMap: Record<string, any> = {
  "search-engine-optimization": SeoServicesContent,
  "social-media-marketing": SocialMediaMarketingContent,
  "mobile-app-development": MobileAppDevelopmentContent,
  "conversion-rate-optimization": ConversionRateOptimizationContent,
  "content-marketing": ContentMarketingServicesContent,
  "ai-automation": AIAutomationServicesContent,
  "web-design-development": WebDesignServicesContent,
  "ecommerce-services": EcommerceServicesContent,
  "pay-per-click": PayPerClickManagementContent,
    "pay-per-click-ppc": PayPerClickManagementContent,
};

export async function generateMetadata(
  { params }: { params: Promise<{ services: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { services } = await params;
  const content = contentMap[services];

  if (!content || !content.metadata) {
    return {
      title: "ClickMasters Software crafted with care",
      description:
        "An independent software studio designing and engineering web platforms, apps and AI products for ambitious founders.",
    };
  }

  const BASE_URL = "https://clickmastersdigitalmarketing.com";
  const url = content.metadata.url || "/";
  const canonicalUrl = url.startsWith("http") ? url : `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;

  return {
    title: content.metadata.seoTitle,
    description: content.metadata.metaDescription,
    keywords: content.metadata.secondaryKeywords ?? content.metadata.keyword ?? undefined,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ServicesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ services: string }>;
}) {
  const { services } = await params;
  
  // Check if the service slug exists in contentMap
  if (!contentMap[services]) {
    notFound();
  }
  
  return <>{children}</>;
}
