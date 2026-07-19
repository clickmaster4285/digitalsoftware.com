// components/locations/AdditionalSection.tsx

'use client';

import { motion } from 'framer-motion';
import { 
  Check, 
  ArrowUpRight, 
  Layers, 
  Sparkles, 
  Target, 
  Zap, 
  TrendingUp, 
  Users, 
  BarChart3, 
  Search, 
  MapPin, 
  DollarSign, 
  Share2, 
  FileText, 
  Globe, 
  Mail, 
  Palette, 
  Shield, 
  Phone, 
  ShoppingCart, 
  Code, 
  Megaphone 
} from 'lucide-react';

// ============================================
// TYPES
// ============================================

interface AdditionalBlock {
  title: string;
  description: string;
  icon?: string;
}

interface AdditionalSectionData {
  mainTitle: string;
  mainDescription: string;
  blocks: AdditionalBlock[];
}

interface AdditionalSectionProps {
  content: string;
  title?: string;
  subtitle?: string;
  sectionLabel?: string;
  sectionNumber?: string;
}

// ============================================
// ICON MAPPING
// ============================================

const getIcon = (iconName?: string) => {
  const icons: Record<string, any> = {
    'search': Search,
    'map-pin': MapPin,
    'dollar-sign': DollarSign,
    'share-2': Share2,
    'file-text': FileText,
    'globe': Globe,
    'trending-up': TrendingUp,
    'mail': Mail,
    'bar-chart': BarChart3,
    'palette': Palette,
    'zap': Zap,
    'shield': Shield,
    'phone': Phone,
    'shopping-cart': ShoppingCart,
    'users': Users,
    'code': Code,
    'megaphone': Megaphone,
    'target': Target,
    'layers': Layers,
    'sparkles': Sparkles,
  };
  return icons[iconName || 'layers'] || Layers;
};

const getIconForTitle = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('seo') || lowerTitle.includes('search engine')) return 'search';
  if (lowerTitle.includes('local seo') || lowerTitle.includes('local visibility')) return 'map-pin';
  if (lowerTitle.includes('ppc') || lowerTitle.includes('google ads') || lowerTitle.includes('paid')) return 'dollar-sign';
  if (lowerTitle.includes('social media')) return 'share-2';
  if (lowerTitle.includes('content marketing')) return 'file-text';
  if (lowerTitle.includes('website') || lowerTitle.includes('development') || lowerTitle.includes('design')) return 'code';
  if (lowerTitle.includes('conversion')) return 'trending-up';
  if (lowerTitle.includes('email')) return 'mail';
  if (lowerTitle.includes('analytics') || lowerTitle.includes('reporting')) return 'bar-chart';
  if (lowerTitle.includes('brand')) return 'users';
  if (lowerTitle.includes('e-commerce') || lowerTitle.includes('ecommerce')) return 'shopping-cart';
  if (lowerTitle.includes('mobile')) return 'phone';
  if (lowerTitle.includes('advertising')) return 'megaphone';
  if (lowerTitle.includes('growth')) return 'target';
  return 'layers';
};

// ============================================
// PARSER FUNCTION - FIXED
// ============================================

function parseAdditionalContent(text: string): AdditionalSectionData[] {
  if (!text || !text.trim()) return [];

  const sections: AdditionalSectionData[] = [];
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  let currentSection: AdditionalSectionData | null = null;
  let currentBlock: AdditionalBlock | null = null;
  let isCollectingMainDescription = false;
  let mainDescriptionLines: string[] = [];
  let blockDescriptionLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if this is a main section header
    // A main header is a line that ends with '?' or ':' and is relatively short
    const isMainHeader = (line.includes('?') || line.includes(':')) && 
                         line.split(/[?:]/)[0].length < 100 && 
                         !line.startsWith('—') &&
                         !line.startsWith('•') &&
                         !line.startsWith('-') &&
                         !line.startsWith('*') &&
                         !line.startsWith('(') &&
                         // Exclude step lines from being main headers
                         !line.match(/^Step \d+:/i) &&
                         // Exclude lines that are clearly block titles (start with capital letter and are short)
                         !(line.match(/^[A-Z][a-z]+ [A-Z][a-z]+:/) && line.length < 60);
    
    if (isMainHeader) {
      // Save previous section if exists
      if (currentSection && currentSection.blocks.length > 0) {
        sections.push(currentSection);
      }
      
      // Split on the first ? or : that appears
      const separatorIndex = Math.max(line.indexOf('?'), line.indexOf(':'));
      const cleanTitle = line.substring(0, separatorIndex).trim();
      const introText = line.substring(separatorIndex + 1).trim();
      
      currentSection = {
        mainTitle: cleanTitle,
        mainDescription: introText || '',
        blocks: []
      };
      mainDescriptionLines = [];
      isCollectingMainDescription = true;
      if (introText) {
        mainDescriptionLines.push(introText);
      }
      currentBlock = null;
      blockDescriptionLines = [];
    } else if (currentSection) {
      // Check if this is a sub-header (block title)
      const isSubHeader = line.length < 150 && 
                          (line.includes(':') || 
                           line.match(/^Step \d+:/i) ||
                           line.match(/^[A-Z][a-z]+ [A-Z][a-z]+:/)) &&
                          !line.startsWith('—') &&
                          !line.startsWith('•') &&
                          !line.startsWith('-') &&
                          !line.startsWith('*') &&
                          !line.startsWith('(') &&
                          line.length > 10 &&
                          !line.includes('@') &&
                          !line.includes('http');
      
      if (isSubHeader) {
        // Save previous block if exists
        if (currentBlock && blockDescriptionLines.length > 0) {
          currentSection.blocks.push({
            title: currentBlock.title,
            description: blockDescriptionLines.join(' ').trim(),
            icon: getIconForTitle(currentBlock.title)
          });
        }
        
        // Check if it's a step format (Step 1: Title)
        const stepMatch = line.match(/^Step \d+:\s*(.+)/i);
        let blockTitle = '';
        if (stepMatch) {
          blockTitle = stepMatch[1].trim();
        } else {
          // Remove trailing colon and clean up
          blockTitle = line.replace(/^[•\-*]\s*/, '').replace(/:$/, '').trim();
        }
        
        currentBlock = {
          title: blockTitle,
          description: '',
          icon: getIconForTitle(blockTitle)
        };
        blockDescriptionLines = [];
        isCollectingMainDescription = false;
      } else if (currentBlock && !isCollectingMainDescription) {
        // This is content for the current block
        const cleanLine = line.replace(/^[•\-*]\s*/, '').trim();
        if (cleanLine && !cleanLine.match(/^[A-Z][a-z]+ [A-Z][a-z]+:/) && !cleanLine.match(/^Step \d+:/i)) {
          blockDescriptionLines.push(cleanLine);
        }
      } else if (isCollectingMainDescription) {
        // This is main description content
        const cleanLine = line.replace(/^[•\-*]\s*/, '').trim();
        if (cleanLine && !cleanLine.match(/^[A-Z][a-z]+ [A-Z][a-z]+:/) && !cleanLine.match(/^Step \d+:/i)) {
          mainDescriptionLines.push(cleanLine);
        }
      }
    }
  }
  
  // Save the last section
  if (currentSection) {
    // Save last block if exists
    if (currentBlock && blockDescriptionLines.length > 0) {
      currentSection.blocks.push({
        title: currentBlock.title,
        description: blockDescriptionLines.join(' ').trim(),
        icon: getIconForTitle(currentBlock.title)
      });
    }
    
    // Update main description if we have collected lines
    if (mainDescriptionLines.length > 0) {
      currentSection.mainDescription = mainDescriptionLines.join(' ').trim();
    }
    
    // Only add if it has blocks
    if (currentSection.blocks.length > 0) {
      sections.push(currentSection);
    }
  }
  
  return sections;
}

// ============================================
// UI COMPONENTS
// ============================================

const SectionLabel = ({ n, t }: { n: string; t: string }) => (
  <div className="flex items-center gap-4 mb-6">
    <span className="text-sm font-mono text-[#FF2E86] tracking-widest">{n}</span>
    <span className="text-xs uppercase tracking-[0.2em] text-gray-400">{t}</span>
    <div className="flex-1 h-px bg-gray-200" />
  </div>
);

const Reveal = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// ============================================
// MAIN COMPONENT
// ============================================

export function AdditionalSection({ 
  content, 
  title = "Why Choose Us",
  subtitle = "— built for results.",
  sectionLabel = "What we build",
  sectionNumber = "04"
}: AdditionalSectionProps) {
  const sections = parseAdditionalContent(content);
  
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <section id="additional" className="relative bg-white text-gray-900 py-32">
      <div className="container mx-auto px-4">
        <SectionLabel n={sectionNumber} t={sectionLabel} />
        <Reveal>
          <h2 className="font-display text-4xl md:text-7xl font-bold leading-[0.95] mb-20 tracking-tight">
            {title}<br />
            <span className="text-[#FF2E86]">{subtitle}</span>
          </h2>
        </Reveal>

        <div className="space-y-24">
          {sections.map((section: AdditionalSectionData, sectionIndex: number) => {
            const reverse = sectionIndex % 2 === 1;
            
            return (
              <div key={section.mainTitle} className="space-y-12">
                <div className={`grid lg:grid-cols-12 gap-10 items-start ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}>
                  <motion.div
                    initial={{ opacity: 0, x: reverse ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="lg:col-span-5 lg:sticky lg:top-32"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl border border-gray-200 grid place-items-center bg-gray-50">
                        <Layers className="w-6 h-6 text-gray-700" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400">
                        [ {section.mainTitle.split(' ').slice(0, 3).join(' ').toUpperCase()} · {String(sectionIndex + 1).padStart(2, '0')} ]
                      </span>
                    </div>
                    <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight mb-6">
                      {section.mainTitle}
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                      {section.mainDescription}
                    </p>
                  </motion.div>

                  <div className="lg:col-span-7 space-y-4">
                    {section.blocks.map((block: AdditionalBlock, blockIndex: number) => {
                      const Icon = getIcon(block.icon);
                      
                      return (
                        <motion.div
                          key={block.title}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ delay: blockIndex * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          whileHover={{ y: -4 }}
                          className="group relative rounded-2xl border border-gray-200 p-7 md:p-9 bg-gray-50 hover:border-[#FF2E86]/40 hover:bg-gray-100 transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <Check className="w-5 h-5 mt-1 text-[#FF2E86] shrink-0" />
                            <div>
                              <h4 className="font-display text-xl md:text-2xl mb-3 text-gray-800">
                                {block.title}
                              </h4>
                              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                {block.description}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all text-gray-400" />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}