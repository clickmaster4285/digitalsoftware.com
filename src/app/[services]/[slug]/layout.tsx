import { Metadata, ResolvingMetadata } from "next";

// Import all content files
import { AiMlDevContent } from "@/content/AiMlDev";
import { AiPersonalizationContent } from "@/content/AiPersonalization";
import { DataAnalyticsReportingContent } from "@/content/DataAnalyticsReporting";
import { MarketingAttributionContent } from "@/content/MarketingAttribution";
import { MarketingAutomationContent } from "@/content/MarketingAutomation";
import { AiAutomationContent } from "@/content/AiAutomation";
import { WebDesignContent } from "@/content/WebDesign";
import { InfographicDesignContent } from "@/content/InfographicDesign";
import { LandingPageDesignContent } from "@/content/LandingPageDesign";
import { UIUXDesignContent } from "@/content/UIUXDesign";
import { GraphicDesignContent } from "@/content/GraphicDesign";
import { LogoDesignContent } from "@/content/LogoDesign";
import { CitationBuildingServicesContent } from "@/content/CitationBuildingServices";
import { VoiceSearchOptimizationContent } from "@/content/VoiceSearchOptimization";
import { SchemaMarkupContent } from "@/content/SchemaMarkup";
import { WhiteLabelSeoContent } from "@/content/WhiteLabelSeo";
import { OnPageSeoContent } from "@/content/OnPageSeo";
import { OffPageSeoContent } from "@/content/OffPageSeo";
import { SeoServicesUsaContent } from "@/content/SeoServicesUsa";
import { EcommerceSeoContent } from "@/content/EcommerceSeo";
import { YoutubeSeoContent } from "@/content/YoutubeSeo";
import { SeoAutomationContent } from "@/content/SeoAutomation";
import { SeoGlossaryContent } from "@/content/SeoGlossary";
import { SocialMediaStrategyContent } from "@/content/SocialMediaStrategy";
import { ConversionRateOptimizationContent, SocialMediaMarketingContent } from "@/content/main-services";
import { EmailMarketingServicesContent } from "@/content/EmailMarketing";
import { EcommerceMarketingServicesContent } from "@/content/EcommerceMarketing";
import { AmazonMarketingServicesContent } from "@/content/AmazonMarketing";
import { OnlineReputationManagementContent } from "@/content/OnlineReputation";
import { PodcastMarketingServicesContent } from "@/content/PodcastMarketingServices";
import { PpcManagementContent } from "@/content/PpcManagement";
import { LinkedInAdsContent } from "@/content/LinkedInAds";
import { ContentMarketingContent } from "@/content/ContentMarketing";
import { AmazonFbaMarketingContent } from "@/content/AmazonFbaMarketing";
import { RemarketingRetargetingContent } from "@/content/RemarketingRetargeting";
import { PrMediaOutreachContent } from "@/content/PrMediaOutreach";
import { SocialMediaContentCreationContent } from "@/content/SocialMediaContentCreation";
import { NewsletterContent } from "@/content/Newsletter";
import { ClickPOSContent } from "@/content/ClickPOSContent";
import { ClickCareHMSContent } from "@/content/ClickCareHMS";
import { TestimonialsContent } from "@/content/TestimonialsContent";
import { WhitePaperWritingServicesContent } from "@/content/WhitePaper";
import { CareersContent } from "@/content/CareersContent";
import { OurTeamContent } from "@/content/OurTeam";
import { CaseStudyWritingContent } from "@/content/CaseStudyWriting";
import { AboutUsContent } from "@/content/AboutUs";
import { BlogContent } from "@/content/BlogContent";
import { DigitalMarketingGlossaryContent } from "@/content/DigitalMarketingGlossary";
import { ClickGrowthSystemContent } from "@/content/ClickGrowthSystem";
import { RealEstateMarketingContent } from "@/content/RealEstateMarketing";
import { SaasMarketingContent } from "@/content/SaasMarketing";
import { LocalSeoContent } from "@/content/LocalSeo";
import { GuestPostingContent } from "@/content/GuestPosting";
import { WebDevelopmentContent } from "@/content/WebDevelopment";
import { WebAppContent } from "@/content/WebAppContent";
import { TechnicalSeoContent } from "@/content/Technicalseocontent";
import { EnterpriseSeoContent } from "@/content/Enterpriseseocontent";
import { AiSeoContent } from "@/content/Aiseocontent";
import { SeoAuditContent } from "@/content/SeoAuditContent";
import { KeywordResearchContent } from "@/content/KeywordResearchContent";
import { GooglePenaltyRecoveryContent } from "@/content/GooglePenaltyRecoveryContent";
import { GoogleAdsManagementContent } from "@/content/GoogleAdsManagementContent";
import { FacebookInstagramAdsContent } from "@/content/FacebookInstagramAdsContent";
import { YoutubeAdsManagementContent } from "@/content/YoutubeAdsManagementContent";
import { PodcastProductionContent } from "@/content/PodcastProductionContent";
import { InfluencerMarketingContent } from "@/content/InfluencerMarketingContent";
import { TikTokShopManagementContent } from "@/content/TikTokShopManagementContent";
import { IosAppDevelopmentContent } from "@/content/IosAppDevelopmentContent";
import { AndroidAppDevelopmentContent } from "@/content/AndroidAppDevelopmentContent";
import { ReactNativeDevelopmentContent } from "@/content/ReactNativeDevelopmentContent";
import { FlutterAppDevelopmentContent } from "@/content/FlutterAppDevelopmentContent";
import { BrandingIdentityContent } from "@/content/BrandingIdentityContent";
import { RoiCalculatorContent } from "@/content/RoiCalculatorContent";
import { VideoMarketingContent } from "@/content/VideoMarketingContent";
import { EcommerceDevContent } from "@/content/EcommerceDevelopment";
import { ShopifyDevelopmentContent } from "@/content/ShopifyDevelopment";
import { WooCommerceDevelopmentContent } from "@/content/WooCommerceDevelopment";
import { ShopifyMarketingContent } from "@/content/Shopifymarketingcontent";
import { WoocommerceMarketingContent } from "@/content/Woocommercemarketingcontent";
import { EcommerceAnalyticsContent } from "@/content/Ecommerceanalyticscontent";
import { MagentoDevContent } from "@/content/Magentodevcontent";
import { BigCommerceMarketingContent } from "@/content/BigcommerceMarketingContent";
import { AiContentGenerationContent } from "@/content/AiContentGenerationContent";
import { AiMarketingServicesContent } from "@/content/AiMarketingServicesContent";
import { ChatbotDevelopmentContent } from "@/content/ChatbotDevelopmentContent";
import { PredictiveAnalyticsContent } from "@/content/PredictiveAnalyticsContent";
import { ApiDevelopmentContent } from "@/content/ApiDevelopmentContent";
import { CrmIntegrationContent } from "@/content/CrmIntegrationContent";
import { DevopsServicesContent } from "@/content/DevopsServicesContent";
import { CloudSolutionsContent } from "@/content/CloudSolutionsContent";
import { IotDevelopmentContent } from "@/content/IotDevelopmentContent";
import { ArVrDevelopmentContent } from "@/content/ArVrDevelopmentContent";
import { BlockchainDevelopmentContent } from "@/content/BlockchainDevelopmentContent";
import { WebsiteSpeedOptimisationContent } from "@/content/WebsiteSpeedOptimisationContent";
import { PwaDevelopmentContent } from "@/content/PwaDevelopmentContent";
import { HeadlessCommerceContent } from "@/content/HeadlessCommerceContent";
import { WebsiteMaintenanceContent } from "@/content/WebsiteMaintenanceContent";
import { AdaComplianceContent } from "@/content/AdaComplianceContent";

// Content registry - must match page.tsx
const contentRegistry: Record<string, any> = {
  "web-development": WebDevelopmentContent,
  "web-application-development": WebAppContent,
  "ai-ml-development": AiMlDevContent,
  "ai-personalization": AiPersonalizationContent,
  "data-analytics-reporting": DataAnalyticsReportingContent,
  "marketing-attribution": MarketingAttributionContent,
  "marketing-automation": MarketingAutomationContent,
  "ai-automation": AiAutomationContent,
  "web-design": WebDesignContent,
  "ui-ux-design": UIUXDesignContent,
  "graphic-design": GraphicDesignContent,
  "logo-design": LogoDesignContent,
  "landing-page-design": LandingPageDesignContent,
  "infographic-design": InfographicDesignContent,
  "seo-services-usa": SeoServicesUsaContent,
  "ecommerce-seo": EcommerceSeoContent,
  "youtube-seo": YoutubeSeoContent,
  "seo-audit": SeoAuditContent,
  "on-page-seo": OnPageSeoContent,
  "off-page-seo-link-building": OffPageSeoContent,
  "technical-seo": TechnicalSeoContent,
  "keyword-research": KeywordResearchContent,
  "enterprise-seo": EnterpriseSeoContent,
  "ai-seo": AiSeoContent,
  "white-label-seo": WhiteLabelSeoContent,
  "schema-markup": SchemaMarkupContent,
  "voice-search-optimization": VoiceSearchOptimizationContent,
  "seo-automation": SeoAutomationContent,
  "citation-building": CitationBuildingServicesContent,
  "local-seo": LocalSeoContent,
  "guest-posting": GuestPostingContent,
  "seo-glossary": SeoGlossaryContent,
  "google-penalty-recovery": GooglePenaltyRecoveryContent,
  "social-media-marketing": SocialMediaMarketingContent,
  "social-media-strategy-consulting": SocialMediaStrategyContent,
  "social-media-content-creation": SocialMediaContentCreationContent,
  "email-marketing": EmailMarketingServicesContent,
  "ecommerce-marketing": EcommerceMarketingServicesContent,
  "amazon-marketing": AmazonMarketingServicesContent,
  "online-reputation-management": OnlineReputationManagementContent,
  "podcast-marketing": PodcastMarketingServicesContent,
  "ppc-management": PpcManagementContent,
  "linkedin-ads-management": LinkedInAdsContent,
  "content-marketing": ContentMarketingContent,
  "amazon-fba-marketing": AmazonFbaMarketingContent,
  "remarketing-retargeting": RemarketingRetargetingContent,
  "pr-media-outreach": PrMediaOutreachContent,
  "newsletter": NewsletterContent,
  "about-us": AboutUsContent,
  "our-team": OurTeamContent,
  "careers": CareersContent,
  "case-study-writing": CaseStudyWritingContent,
  "blog": BlogContent,
  "white-paper-writing": WhitePaperWritingServicesContent,
  "testimonials": TestimonialsContent,
  "digital-marketing-glossary": DigitalMarketingGlossaryContent,
  "clickcare-hms": ClickCareHMSContent,
  "click-growth-system": ClickGrowthSystemContent,
  "clickpos": ClickPOSContent,
  "industries-saas": SaasMarketingContent,
  "real-estate-marketing": RealEstateMarketingContent,
  "google-ads-management": GoogleAdsManagementContent,
  "facebook-instagram-ads": FacebookInstagramAdsContent,
  "youtube-ads-management": YoutubeAdsManagementContent,
  "podcast-production": PodcastProductionContent,
  "influencer-marketing": InfluencerMarketingContent,
  "tiktok-shop-management": TikTokShopManagementContent,
  "ios-app-development": IosAppDevelopmentContent,
  "android-app-development": AndroidAppDevelopmentContent,
  "react-native-development": ReactNativeDevelopmentContent,
  "flutter-app-development": FlutterAppDevelopmentContent,
  "cro-services": ConversionRateOptimizationContent,
  "branding-identity": BrandingIdentityContent,
  "roi-calculator": RoiCalculatorContent,
  "video-marketing": VideoMarketingContent,
  "ecommerce-development": EcommerceDevContent,
  "shopify-development": ShopifyDevelopmentContent,
  "woocommerce-development": WooCommerceDevelopmentContent,
  "shopify-marketing": ShopifyMarketingContent,
  "woocommerce-marketing": WoocommerceMarketingContent,
  "ecommerce-analytics": EcommerceAnalyticsContent,
  "magento-development": MagentoDevContent,
  "bigcommerce-marketing": BigCommerceMarketingContent,
  "ai-content-generation": AiContentGenerationContent,
  "ai-marketing": AiMarketingServicesContent,
  "chatbot-development": ChatbotDevelopmentContent,
  "predictive-analytics": PredictiveAnalyticsContent,
  "api-development-integration": ApiDevelopmentContent,
  "crm-integration": CrmIntegrationContent,
  "devops": DevopsServicesContent,
  "cloud-solutions": CloudSolutionsContent,
  "iot-development": IotDevelopmentContent,
  "ar-vr-development": ArVrDevelopmentContent,
  "blockchain-development": BlockchainDevelopmentContent,
  "website-speed-optimization": WebsiteSpeedOptimisationContent,
  "pwa-development": PwaDevelopmentContent,
  "headless-commerce-development": HeadlessCommerceContent,
  "website-maintenance": WebsiteMaintenanceContent,
  "ada-compliance-web-accessibility": AdaComplianceContent,
};

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const content = contentRegistry[slug];

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

export default function SubServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
