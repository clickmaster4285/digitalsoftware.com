import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📍 Script running from:', __dirname);

// Configuration
const CONFIG = {
  xlsxFolder: path.join(__dirname, 'xlsx'),
  outputFolder: path.join(__dirname, '../src/content/location'),
};

console.log('📁 XLSX folder path:', CONFIG.xlsxFolder);
console.log('📁 Output folder path:', CONFIG.outputFolder);
console.log('---');

if (!fs.existsSync(CONFIG.xlsxFolder)) {
  console.error('❌ XLSX folder not found!');
  console.log(`📁 Please create: ${CONFIG.xlsxFolder}`);
  process.exit(1);
}

// City name normalization mapping (UPDATED with all cities - NO DUPLICATES)
const CITY_MAPPING: { [key: string]: string } = {
  // US Cities
  'Albuquerque': 'albuquerque',
  'Atlanta': 'atlanta',
  'Austin': 'austin',
  'Baltimore': 'baltimore',
  'Birmingham': 'birmingham',
  'Boise': 'boise',
  'Boston': 'boston',
  'Charlotte': 'charlotte',
  'Chattanooga': 'chattanooga',
  'Chicago': 'chicago',
  'Cincinnati': 'cincinnati',
  'Cleveland': 'cleveland',
  'Columbia': 'columbia',
  'Dallas': 'dallas',
  'Denver': 'denver',
  'DesMoines': 'des-moines',
  'Greenville': 'greenville',
  'Houston': 'houston',
  'Huntsville': 'huntsville',
  'Indianapolis': 'indianapolis',
  'Jacksonville': 'jacksonville',
  'KansasCity': 'kansas-city',
  'Knoxville': 'knoxville',
  'LasVegas': 'las-vegas',
  'LosAngeles': 'los-angeles',
  'Louisville': 'louisville',
  'Memphis': 'memphis',
  'Miami': 'miami',
  'Minneapolis': 'minneapolis',
  'Nashville': 'nashville',
  'NewOrleans': 'new-orleans',
  'NewYork': 'new-york',
  'OklahomaCity': 'oklahoma-city',
  'Omaha': 'omaha',
  'Orlando': 'orlando',
  'Philadelphia': 'philadelphia',
  'Phoenix': 'phoenix',
  'Pittsburgh': 'pittsburgh',
  'Portland': 'portland',
  'Raleigh': 'raleigh',
  'Richmond': 'richmond',
  'Sacramento': 'sacramento',
  'SaltLakeCity': 'salt-lake-city',
  'SanAntonio': 'san-antonio',
  'SanDiego': 'san-diego',
  'SanFrancisco': 'san-francisco',
  'SanJose': 'san-jose',
  'Seattle': 'seattle',
  'StLouis': 'st-louis',
  'Tampa': 'tampa',
  'Tulsa': 'tulsa',
  'Wichita': 'wichita',
  
  // UK Cities
  'Bristol': 'bristol',
  'Edinburgh': 'edinburgh',
  'Glasgow': 'glasgow',
  'Leeds': 'leeds',
  'London': 'london',
  'Manchester': 'manchester',
  
  // Canadian Cities
  'Calgary': 'calgary',
  'Montreal': 'montreal',
  'Toronto': 'toronto',
  'Vancouver': 'vancouver',
  
  // Australian Cities
  'Brisbane': 'brisbane',
  'Melbourne': 'melbourne',
  'Perth': 'perth',
  'Sydney': 'sydney',
  
  // UAE Cities
  'AbuDhabi': 'abu-dhabi',
  'Dubai': 'dubai',
  'Sharjah': 'sharjah',
  
  // Pakistan Cities
  'Karachi': 'karachi',
  'Lahore': 'lahore',
};

// Service type mapping (UPDATED with all services)
const SERVICE_MAPPING: { [key: string]: string } = {
  'ContentMarketing': 'content-marketing',
  'DigitalMarketing': 'digital-marketing',
  'EmailMarketing': 'email-marketing',
  'GoogleAds': 'google-ads',
  'LocalSEO': 'local-seo',
  'SEO': 'seo',
  'SocialMedia': 'social-media',
  'WebDesign': 'web-design',
  'WebDevelopment': 'web-development',
  'PPC': 'ppc',
};

// Parse filename
function parseFileName(filename: string) {
  const name = filename.replace(/\.(xlsx|xls)$/, '');
  // Handle both T3- and T4- prefixes
  const parts = name.replace(/^T[34]-/, '').split('-');
  const serviceType = parts[0];
  const cityName = parts.slice(1).join('');
  const citySlug = CITY_MAPPING[cityName] || cityName.toLowerCase();
  const serviceSlug = SERVICE_MAPPING[serviceType] || serviceType.toLowerCase();
  
  return {
    service: serviceType,
    serviceSlug: serviceSlug,
    city: cityName,
    citySlug: citySlug,
    slug: `/${serviceSlug}/${citySlug}`,
    fileName: name,
  };
}

// ============================================
// 1. PARSE WORD COUNT
// ============================================
function parseWordCount(value: any): number {
  if (!value) return 0;
  const str = String(value);
  const match = str.match(/(\d+[,]?\d+)/);
  if (match) {
    return parseInt(match[1].replace(/,/g, ''));
  }
  return 0;
}

// ============================================
// 2. PARSE FAQ FROM FAQ SCHEMA
// ============================================
function parseFAQFromSchema(faqSchema: any): { question: string; answer: string }[] {
  if (!faqSchema) return [];
  
  try {
    let schema = faqSchema;
    if (typeof faqSchema === 'string') {
      schema = JSON.parse(faqSchema);
    }
    
    if (schema && schema['@type'] === 'FAQPage' && schema.mainEntity) {
      return schema.mainEntity.map((item: any) => ({
        question: item.name || item.question || '',
        answer: item.acceptedAnswer?.text || item.answer || '',
      }));
    }
  } catch (e) {
    // Silent fail - just return empty array
  }
  
  return [];
}

// ============================================
// 3. CONVERT KEY-VALUE ROWS TO OBJECT
// ============================================
function keyValueRowsToObject(rows: any[]): any {
  const result: any = {};
  
  rows.forEach(row => {
    const keys = Object.keys(row);
    if (keys.length >= 2) {
      const key = String(row[keys[0]] || '').trim();
      const value = String(row[keys[1]] || '').trim();
      
      if (key && !key.includes('PAGE BRIEF') && !key.includes('FULL PAGE CONTENT')) {
        result[key] = value;
      }
    }
  });
  
  return result;
}

// ============================================
// 4. PARSE PUBLISHING CHECKLIST
// ============================================
function parsePublishingChecklist(rows: any[]): { checklist: any; url: string | null } {
  const checklist = {
    onPageSeo: {
      title: { requirement: 'Max 60 chars', status: false },
      meta: { requirement: 'Max 155 chars', status: false },
      h1: { requirement: 'Primary KW', status: false },
      url: { requirement: 'Exact URL', status: false },
    },
    schema: {
      localBusiness: { requirement: 'schema.org validated', status: false },
      faqPage: { requirement: 'Rich Results Test', status: false },
    },
    geoAeo: {
      aeoBlock: { requirement: 'First screen', status: false },
      faqs: { requirement: 'AI citation format', status: false },
    },
    eeat: {
      author: { requirement: 'Amjad Khan', status: false },
      caseStudies: { requirement: 'Real metrics', status: false },
    },
    technical: {
      cwv: { requirement: 'LCP<2.5s', status: false },
      mobile: { requirement: 'Full test', status: false },
    },
    postPublish: {
      gsc: { requirement: 'Submitted', status: false },
      ga4: { requirement: 'Events', status: false },
      links: { requirement: 'Hub+service+2 related', status: false },
      tracker: { requirement: 'LIVE', status: false },
    },
  };

  let extractedUrl: string | null = null;

  rows.forEach(row => {
    const keys = Object.keys(row);
    
    for (const key of keys) {
      const value = String(row[key] || '');
      const match = value.match(/Exact:\s*([^\s]+)/);
      if (match) {
        const url = match[1].trim();
        if (url.startsWith('/') && url.endsWith('/')) {
          extractedUrl = url;
          checklist.onPageSeo.url.requirement = `Exact: ${url}`;
        }
      }
    }
    
    if (keys.length >= 3) {
      const item = String(row[keys[0]] || '').trim();
      const requirement = String(row[keys[1]] || '').trim();
      const status = String(row[keys[2]] || '').trim();
      
      if (item && !isNaN(Number(item))) {
        const reqLower = requirement.toLowerCase();
        const isChecked = status.includes('☑') || status.includes('✓');
        
        if (reqLower.includes('title') || reqLower.includes('60 chars')) checklist.onPageSeo.title.status = isChecked;
        if (reqLower.includes('meta') || reqLower.includes('155 chars')) checklist.onPageSeo.meta.status = isChecked;
        if (reqLower.includes('h1') || reqLower.includes('primary kw')) checklist.onPageSeo.h1.status = isChecked;
        if (reqLower.includes('localbusiness') || reqLower.includes('schema')) checklist.schema.localBusiness.status = isChecked;
        if (reqLower.includes('faqpage')) checklist.schema.faqPage.status = isChecked;
        if (reqLower.includes('aeo block')) checklist.geoAeo.aeoBlock.status = isChecked;
        if (reqLower.includes('faqs')) checklist.geoAeo.faqs.status = isChecked;
        if (reqLower.includes('author')) checklist.eeat.author.status = isChecked;
        if (reqLower.includes('case studies')) checklist.eeat.caseStudies.status = isChecked;
        if (reqLower.includes('cwv') || reqLower.includes('lcp')) checklist.technical.cwv.status = isChecked;
        if (reqLower.includes('mobile')) checklist.technical.mobile.status = isChecked;
        if (reqLower.includes('gsc')) checklist.postPublish.gsc.status = isChecked;
        if (reqLower.includes('ga4')) checklist.postPublish.ga4.status = isChecked;
        if (reqLower.includes('links')) checklist.postPublish.links.status = isChecked;
        if (reqLower.includes('tracker')) checklist.postPublish.tracker.status = isChecked;
      }
    }
  });

  return { checklist, url: extractedUrl };
}

// ============================================
// 5. PROCESS FILE (FIXED - Case-insensitive sheet matching)
// ============================================
function processFile(filename: string): any {
  console.log(`  📊 Processing: ${filename}`);
  
  try {
    const filePath = path.join(CONFIG.xlsxFolder, filename);
    const workbook = XLSX.readFile(filePath);
    
    let mergedData: any = {};
    let checklistData: any = {};
    let extractedUrl: string | null = null;
    
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      
      // Debug: Show sheet names
      console.log(`    📋 Sheet: "${sheetName}" - ${data.length} rows`);
      
      // Case-insensitive check for Publishing Checklist
      if (sheetName.trim().toLowerCase() === 'publishing checklist') {
        console.log(`    ✅ Found Publishing Checklist sheet!`);
        const result = parsePublishingChecklist(data);
        checklistData = result.checklist;
        if (result.url) {
          extractedUrl = result.url;
          console.log(`    ✅ Found URL: "${extractedUrl}"`);
        }
      } else {
        const parsed = keyValueRowsToObject(data);
        mergedData = { ...mergedData, ...parsed };
      }
    });
    
    // If no checklist was found, create default
    if (Object.keys(checklistData).length === 0) {
      console.log(`    ⚠️ No checklist data found, using defaults`);
      checklistData = {
        onPageSeo: {
          title: { requirement: 'Max 60 chars', status: false },
          meta: { requirement: 'Max 155 chars', status: false },
          h1: { requirement: 'Primary KW', status: false },
          url: { requirement: 'Exact URL', status: false },
        },
        schema: {
          localBusiness: { requirement: 'schema.org validated', status: false },
          faqPage: { requirement: 'Rich Results Test', status: false },
        },
        geoAeo: {
          aeoBlock: { requirement: 'First screen', status: false },
          faqs: { requirement: 'AI citation format', status: false },
        },
        eeat: {
          author: { requirement: 'Amjad Khan', status: false },
          caseStudies: { requirement: 'Real metrics', status: false },
        },
        technical: {
          cwv: { requirement: 'LCP<2.5s', status: false },
          mobile: { requirement: 'Full test', status: false },
        },
        postPublish: {
          gsc: { requirement: 'Submitted', status: false },
          ga4: { requirement: 'Events', status: false },
          links: { requirement: 'Hub+service+2 related', status: false },
          tracker: { requirement: 'LIVE', status: false },
        },
      };
    }
    
    const parsedInfo = parseFileName(filename);
    const wordCount = parseWordCount(mergedData['WORD COUNT']);
    const faqSchema = mergedData['FAQ SCHEMA'] || null;
    const faqs = parseFAQFromSchema(faqSchema);
    const faqTitle = mergedData['H2 — FAQ'] || '';
    
    const pas = mergedData['SECTION — PAS'] || mergedData['SECTION — BAB'] || '';
    const services = mergedData['SERVICES'] || '';
    const breadcrumb = mergedData['BREADCRUMB'] || '';
    const pricing = mergedData['PRICING'] || '';
    const faqsAlt = mergedData['FAQs'] || '';
    const ctaBody = mergedData['CTA'] || '';
    
    return {
      ...parsedInfo,
      data: mergedData,
      checklist: checklistData,
      extractedUrl: extractedUrl,
      wordCount: wordCount,
      faqs: faqs,
      faqTitle: faqTitle,
      pas: pas,
      services: services,
      breadcrumb: breadcrumb,
      pricing: pricing,
      faqsAlt: faqsAlt,
      ctaBody: ctaBody,
    };
  } catch (error) {
    console.error(`  ❌ Error processing ${filename}:`, error);
    return null;
  }
}

// ============================================
// 6. FORMAT VALUE FOR OUTPUT
// ============================================
function formatValue(value: any): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'string') {
    const escaped = value.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    return `\`${escaped}\``;
  }
  if (typeof value === 'number') return String(value);
  return JSON.stringify(value);
}

// ============================================
// 7. GENERATE SINGLE FILE WITH ALL DATA (FIXED)
// ============================================
function generateSingleFile(allData: any[]) {
  console.log(`\n📝 Generating single file with ${allData.length} locations...`);
  
  let content = `// Auto-generated from XLSX files
// Total locations: ${allData.length}
// Generated: ${new Date().toISOString()}

// ============================================
// LOCATION DATA
// ============================================

`;
  
  // Generate each location object
  allData.forEach((data, index) => {
    const {
      service, city, citySlug, serviceSlug, extractedUrl, wordCount,
      faqs, faqTitle, pas, services, breadcrumb, pricing, faqsAlt, ctaBody
    } = data;
    const { data: contentData, checklist } = data;
    
    // ✅ FIX: Use default checklist if missing
    const safeChecklist = checklist || {
      onPageSeo: {
        title: { requirement: 'Max 60 chars', status: false },
        meta: { requirement: 'Max 155 chars', status: false },
        h1: { requirement: 'Primary KW', status: false },
        url: { requirement: 'Exact URL', status: false },
      },
      schema: {
        localBusiness: { requirement: 'schema.org validated', status: false },
        faqPage: { requirement: 'Rich Results Test', status: false },
      },
      geoAeo: {
        aeoBlock: { requirement: 'First screen', status: false },
        faqs: { requirement: 'AI citation format', status: false },
      },
      eeat: {
        author: { requirement: 'Amjad Khan', status: false },
        caseStudies: { requirement: 'Real metrics', status: false },
      },
      technical: {
        cwv: { requirement: 'LCP<2.5s', status: false },
        mobile: { requirement: 'Full test', status: false },
      },
      postPublish: {
        gsc: { requirement: 'Submitted', status: false },
        ga4: { requirement: 'Events', status: false },
        links: { requirement: 'Hub+service+2 related', status: false },
        tracker: { requirement: 'LIVE', status: false },
      },
    };
    
    const finalSlug = extractedUrl || `/${serviceSlug}/${citySlug}`;
    const varName = data.fileName.replace(/^T[34]-/, '').replace(/-/g, '_');
    
    // Clean features
    let featuresText = contentData['SECTION — FAB'] || '';
    if (featuresText) {
      featuresText = featuresText.replace(/^FEATURES:\s*\n?/i, '');
      featuresText = featuresText.replace(/FEATURES:\s*/gi, '');
    }
    
    // Clean services
    let servicesText = services || '';
    if (servicesText) {
      servicesText = servicesText.replace(/^SERVICES:\s*\n?/i, '');
      servicesText = servicesText.replace(/SERVICES:\s*/gi, '');
    }
    
    // Parse internal links
    const linksRaw = contentData['INTERNAL LINKS'] || '';
    const linksArray = linksRaw.split(/[\n,]+/).filter(Boolean).map((s: string) => {
      let link = s.trim();
      if (!link.startsWith('/')) link = '/' + link;
      if (!link.endsWith('/')) link = link + '/';
      return link;
    });
    
    // Build the location object
    content += `export const ${varName} = {\n`;
    content += `  service: "${service}",\n`;
    content += `  serviceSlug: "${serviceSlug}",\n`;
    content += `  city: "${city}",\n`;
    content += `  citySlug: "${citySlug}",\n`;
    content += `  slug: "${finalSlug}",\n`;
    content += `  \n`;
    content += `  h1: ${formatValue(contentData['H1'] || '')},\n`;
    content += `  primaryKw: ${formatValue(contentData['Primary KW'] || '')},\n`;
    content += `  formula: ${formatValue(contentData['Formula'] || '')},\n`;
    content += `  seoTitle: ${formatValue(contentData['SEO TITLE'] || '')},\n`;
    content += `  meta: ${formatValue(contentData['META'] || '')},\n`;
    content += `  schema: ${formatValue(contentData['SCHEMA'] || null)},\n`;
    content += `  wordCount: ${wordCount},\n`;
    content += `  breadcrumb: ${formatValue(breadcrumb)},\n`;
    content += `  geoAeoBlock: ${formatValue(contentData['GEO/AEO BLOCK'] || '')},\n`;
    content += `  features: ${formatValue(featuresText)},\n`;
    content += `  pas: ${formatValue(pas)},\n`;
    content += `  services: ${formatValue(servicesText)},\n`;
    content += `  caseStudies: ${formatValue(contentData['CASE STUDIES'] || '')},\n`;
    content += `  pricing: ${formatValue(pricing)},\n`;
    content += `  faqTitle: ${formatValue(faqTitle)},\n`;
    content += `  faqs: ${JSON.stringify(faqs, null, 2)},\n`;
    content += `  faqsAlt: ${formatValue(faqsAlt)},\n`;
    content += `  faqSchema: ${formatValue(contentData['FAQ SCHEMA'] || null)},\n`;
    content += `  cta: ${formatValue(contentData['H2 — CTA'] || '')},\n`;
    content += `  ctaBody: ${formatValue(ctaBody)},\n`;
    content += `  internalLinks: ${formatValue(linksArray)},\n`;
    content += `  \n`;
    content += `  publishingChecklist: {\n`;
    content += `    onPageSeo: {\n`;
    content += `      title: { requirement: "Max 60 chars", status: ${safeChecklist.onPageSeo.title.status} },\n`;
    content += `      meta: { requirement: "Max 155 chars", status: ${safeChecklist.onPageSeo.meta.status} },\n`;
    content += `      h1: { requirement: "Primary KW", status: ${safeChecklist.onPageSeo.h1.status} },\n`;
    content += `      url: { requirement: ${formatValue(safeChecklist.onPageSeo.url.requirement)}, status: ${safeChecklist.onPageSeo.url.status} },\n`;
    content += `    },\n`;
    content += `    schema: {\n`;
    content += `      localBusiness: { requirement: "schema.org validated", status: ${safeChecklist.schema.localBusiness.status} },\n`;
    content += `      faqPage: { requirement: "Rich Results Test", status: ${safeChecklist.schema.faqPage.status} },\n`;
    content += `    },\n`;
    content += `    geoAeo: {\n`;
    content += `      aeoBlock: { requirement: "First screen", status: ${safeChecklist.geoAeo.aeoBlock.status} },\n`;
    content += `      faqs: { requirement: "AI citation format", status: ${safeChecklist.geoAeo.faqs.status} },\n`;
    content += `    },\n`;
    content += `    eeat: {\n`;
    content += `      author: { requirement: "Amjad Khan", status: ${safeChecklist.eeat.author.status} },\n`;
    content += `      caseStudies: { requirement: "Real metrics", status: ${safeChecklist.eeat.caseStudies.status} },\n`;
    content += `    },\n`;
    content += `    technical: {\n`;
    content += `      cwv: { requirement: "LCP<2.5s", status: ${safeChecklist.technical.cwv.status} },\n`;
    content += `      mobile: { requirement: "Full test", status: ${safeChecklist.technical.mobile.status} },\n`;
    content += `    },\n`;
    content += `    postPublish: {\n`;
    content += `      gsc: { requirement: "Submitted", status: ${safeChecklist.postPublish.gsc.status} },\n`;
    content += `      ga4: { requirement: "Events", status: ${safeChecklist.postPublish.ga4.status} },\n`;
    content += `      links: { requirement: "Hub+service+2 related", status: ${safeChecklist.postPublish.links.status} },\n`;
    content += `      tracker: { requirement: "LIVE", status: ${safeChecklist.postPublish.tracker.status} },\n`;
    content += `    },\n`;
    content += `  },\n`;
    content += `};\n\n`;
  });
  
  // ============================================
  // MASTER INDEX
  // ============================================
  content += `// ============================================
// MASTER INDEX - All Locations
// ============================================

// All locations grouped by service
export const allLocations = {
  ${allData.map(data => {
    const varName = data.fileName.replace(/^T[34]-/, '').replace(/-/g, '_');
    return `${varName}: ${varName}`;
  }).join(',\n  ')}
};

// Group by service
const serviceGroups: { [key: string]: any[] } = {};
${allData.map(data => {
  const varName = data.fileName.replace(/^T[34]-/, '').replace(/-/g, '_');
  return `serviceGroups['${data.service}'] = serviceGroups['${data.service}'] || [];
serviceGroups['${data.service}'].push(${varName});`;
}).join('\n')}

// Export grouped by service
export const locationsByService = serviceGroups;

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get all slugs
export const getAllSlugs = () => [
  ${allData.map(data => {
    const finalSlug = data.extractedUrl || `/${data.serviceSlug}/${data.citySlug}`;
    return `"${finalSlug}"`;
  }).join(',\n  ')}
];

// Get location by slug
export const getLocationBySlug = (slug: string) => {
  const allData: { [key: string]: any } = {
    ${allData.map(data => {
      const finalSlug = data.extractedUrl || `/${data.serviceSlug}/${data.citySlug}`;
      const varName = data.fileName.replace(/^T[34]-/, '').replace(/-/g, '_');
      return `"${finalSlug}": ${varName}`;
    }).join(',\n    ')}
  };
  return allData[slug] || null;
};

// Get locations by service
export const getLocationsByService = (service: string) => {
  const serviceMap: { [key: string]: any[] } = {
    ${Object.keys(SERVICE_MAPPING).map(service => {
      const matchingData = allData.filter(d => d.service === service);
      const varNames = matchingData.map(d => d.fileName.replace(/^T[34]-/, '').replace(/-/g, '_'));
      return `${service}: [${varNames.join(', ')}]`;
    }).join(',\n    ')}
  };
  return serviceMap[service] || [];
};

// Get all service names
export const getAllServiceNames = () => [
  ${Object.keys(SERVICE_MAPPING).map(service => `"${service}"`).join(', ')}
];

// Get all city names
export const getAllCities = () => {
  const uniqueCities = new Set([
    ${allData.map(data => `"${data.city}"`).join(', ')}
  ]);
  return Array.from(uniqueCities);
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default allLocations;
`;

  // Write the single file
  const outputPath = path.join(CONFIG.outputFolder, 'all-locations.ts');
  fs.writeFileSync(outputPath, content);
  console.log(`  ✅ Generated: all-locations.ts with ${allData.length} locations`);
  
  // Also create index.ts that just re-exports from all-locations
  const indexPath = path.join(CONFIG.outputFolder, 'index.ts');
  const indexContent = `// Re-export everything from all-locations
export * from './all-locations';
export { default } from './all-locations';
`;
  fs.writeFileSync(indexPath, indexContent);
  console.log(`  ✅ Generated: index.ts (re-exports all-locations)`);
  
  return { outputPath: outputPath };
}

// ============================================
// 8. MAIN EXECUTION
// ============================================
function main() {
  console.log('🚀 Starting XLSX to TypeScript conversion...\n');
  
  if (!fs.existsSync(CONFIG.xlsxFolder)) {
    console.error('❌ XLSX folder not found!');
    return;
  }
  
  const files = fs.readdirSync(CONFIG.xlsxFolder)
    .filter(file => file.endsWith('.xlsx') || file.endsWith('.xls'));
  
  if (files.length === 0) {
    console.warn('⚠️  No XLSX files found');
    return;
  }
  
  console.log(`📁 Found ${files.length} XLSX file(s)`);
  console.log('---\n');
  
  if (!fs.existsSync(CONFIG.outputFolder)) {
    fs.mkdirSync(CONFIG.outputFolder, { recursive: true });
  }
  
  const allProcessedData: any[] = [];
  
  files.forEach(filename => {
    const result = processFile(filename);
    if (result) {
      allProcessedData.push(result);
    }
  });
  
  console.log('\n---');
  
  if (allProcessedData.length > 0) {
    generateSingleFile(allProcessedData);
  }
  
  console.log('\n---');
  console.log('🎉 All conversions completed!');
  console.log(`📊 Generated ${allProcessedData.length} locations in a single file`);
  console.log(`📁 Output folder: ${CONFIG.outputFolder}`);
  console.log(`📄 Main file: all-locations.ts`);
  
  const serviceCount: { [key: string]: number } = {};
  allProcessedData.forEach(data => {
    serviceCount[data.service] = (serviceCount[data.service] || 0) + 1;
  });
  console.log('📊 Services breakdown:', serviceCount);
}

main();

export { main };