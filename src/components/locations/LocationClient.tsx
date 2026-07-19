// LocationClient.tsx - Main component
'use client';

import { HeroSection } from '@/components/locations/HeroSection';
import { MarketSection } from '@/components/locations/MarketSection';
import { PasSection } from '@/components/locations/PasSection';
import { FeaturesSection } from '@/components/locations/FeaturesSection';
import { ServicesSection } from '@/components/locations/ServicesSection';
import { PricingSection } from '@/components/locations/PricingSection';
import { CaseStudiesSection } from '@/components/locations/CaseStudiesSection';
import { FaqSection } from '@/components/locations/FaqSection';
import { CtaSection } from '@/components/locations/CtaSection';
import { InternalLinksSection } from '@/components/locations/InternalLinksSection';
import { LocationClientProps } from '@/components/locations/types';
import { SolutionsSection } from '@/components/locations/SolutionsSection';
import { AdditionalSection } from './AdditionalSection';


export default function LocationClient({
  location,
  serviceName,
  cityName,
  geoParagraphs,
  features,
  caseStudies,
  faqs,
}: LocationClientProps) {

  // Helper to check if any data exists
  const hasGeoData = geoParagraphs.length > 0;
  const hasFeatures = features.length > 0;
  const hasCaseStudies = caseStudies.length > 0;
  const hasFaqs = faqs.length > 0;
  const hasInternalLinks = (location.internalLinks || []).length > 0;
  const hasPas = location.pas && location.pas.trim().length > 0;
  const hasServices = location.services && location.services.trim().length > 0;
  const hasPricing = location.pricing && location.pricing.trim().length > 0;
const hasSolutions = !!(location.solutions && location.solutions.trim().length);
const hasAdditional = !!(location.additional && location.additional.trim().length);

  // Parse services into array
  const parseServices = (servicesText: string): { title: string; body: string }[] => {
    if (!servicesText) return [];
    const items: { title: string; body: string }[] = [];
    const sections = servicesText.split(/\n\s*\n/).filter(Boolean);
    for (const section of sections) {
      const lines = section.split('\n').filter(Boolean);
      if (lines.length === 0) continue;
      const firstLine = lines[0] || '';
      if (firstLine.includes(':')) {
        const [title, ...rest] = firstLine.split(':');
        const body = rest.join(':').trim() + (lines.slice(1).join(' ').trim() ? ' ' + lines.slice(1).join(' ').trim() : '');
        items.push({ title: title.trim(), body: body.trim() });
      }
    }
    return items;
  };

  const parsePricing = (pricingText: string): { title: string; description: string }[] => {
    if (!pricingText) return [];
    const items: { title: string; description: string }[] = [];
    const lines = pricingText.split('\n').filter(Boolean);
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.includes(':')) {
        const [title, ...rest] = trimmed.split(':');
        items.push({ title: title.trim(), description: rest.join(':').trim() });
      } else if (items.length > 0 && trimmed) {
        const lastItem = items[items.length - 1];
        if (lastItem && !trimmed.includes(':')) {
          lastItem.description += ' ' + trimmed;
        }
      }
    }
    return items;
  };

  const servicesList = hasServices ? parseServices(location.services) : [];
  const pricingList = hasPricing ? parsePricing(location.pricing) : [];

  return (
    <div className="min-h-screen  bg-white text-gray-900">
      
      {/* Schema Markup */}
      {location.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: typeof location.schema === 'string' ? location.schema : JSON.stringify(location.schema) }}
        />
      )}
      {location.faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: typeof location.faqSchema === 'string' ? location.faqSchema : JSON.stringify(location.faqSchema) }}
        />
      )}

      <HeroSection location={location} serviceName={serviceName} cityName={cityName} />
      
      {hasGeoData && (
        <MarketSection 
          geoParagraphs={geoParagraphs} 
          cityName={cityName} 
          primaryKw={location.primaryKw} 
        />
      )}
      
      {hasPas && <PasSection pasText={location.pas} />}
      
      
      {hasServices && <ServicesSection servicesList={servicesList} />}


      {hasFeatures && (
        <FeaturesSection features={features} cityName={cityName} />
      )}

      {hasSolutions && <SolutionsSection solutionsText={location.solutions} />}

{hasAdditional && (
   <AdditionalSection 
    content={location.additional}  // ✅ Correct
    title="Digital Marketing Services"
    subtitle="— tailored for Austin businesses."
    sectionLabel="Our Solutions"
    sectionNumber="03"
  />
)}

      
      {hasPricing && (
        <PricingSection pricingList={pricingList} pricingText={location.pricing} />
      )}
      
      {hasCaseStudies && (
        <CaseStudiesSection caseStudies={caseStudies} cityName={cityName} />
      )}
      
      {hasFaqs && (
        <FaqSection 
          faqs={faqs} 
          title={location.faqTitle || `Frequently asked questions about ${serviceName} in ${cityName}`} 
        />
      )}
      
      <CtaSection 
        cta={location.cta || `Get Your Free ${cityName} Website Audit`} 
        ctaBody={location.ctaBody} 
      />
      
      {hasInternalLinks && (
        <InternalLinksSection 
          internalLinks={location.internalLinks} 
          serviceName={serviceName} 
          cityName={cityName} 
        />
      )}
    </div>
  );
}