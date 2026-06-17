import { Metadata, ResolvingMetadata } from "next";
import {
  SeoServicesContent,
  SocialMediaMarketingContent,
  MobileAppDevelopmentContent,
  ConversionRateOptimizationContent,
  ContentMarketingServicesContent,
  AIAutomationServicesContent,
  WebDesignServicesContent,
} from "@/content/main-services";
import { EcommerceDevContent } from "@/content/EcommerceDevelopment";
import { PpcManagementContent } from "@/content/PpcManagement";

const contentMap: Record<string, any> = {
  "search-engine-optimization": SeoServicesContent,
  "social-media-marketing": SocialMediaMarketingContent,
  "mobile-app-development": MobileAppDevelopmentContent,
  "conversion-rate-optimization": ConversionRateOptimizationContent,
  "content-marketing": ContentMarketingServicesContent,
  "ai-automation": AIAutomationServicesContent,
  "web-design-development": WebDesignServicesContent,
  "ecommerce-services": EcommerceDevContent,
  "pay-per-click": PpcManagementContent,
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

  return {
    title: content.metadata.seoTitle,
    description: content.metadata.metaDescription,
    alternates: {
      canonical: `https://clickmasters.uk${content.metadata.url || "/"}`,
    },
  };
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
