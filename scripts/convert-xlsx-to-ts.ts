// Instead of import, use require
// With this:
import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  xlsxFolder: path.join(__dirname, 'xlsx'),
  outputFolder: path.join(__dirname, '../src/content/locations'),
  slugMapping: new Map<string, string>(),
};

// City name normalization mapping
const CITY_MAPPING: { [key: string]: string } = {
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
};

// Service type mapping
const SERVICE_MAPPING: { [key: string]: string } = {
  'ContentMarketing': 'content-marketing',
  'DigitalMarketing': 'digital-marketing',
  'EmailMarketing': 'email-marketing',
  'GoogleAds': 'google-ads',
  'LocalSEO': 'local-seo',
  'SEO': 'seo',
  'SocialMedia': 'social-media',
  'WebDesign': 'web-design',
};

// Parse filename to extract service type and city
function parseFileName(filename: string): { service: string; city: string; slug: string } {
  // Remove .xlsx extension
  const name = filename.replace(/\.(xlsx|xls)$/, '');
  
  // Remove "T3-" prefix
  const parts = name.replace('T3-', '').split('-');
  
  // First part is the service type
  const serviceType = parts[0];
  
  // The rest is the city name
  const cityName = parts.slice(1).join('');
  
  // Normalize city name for slug
  const citySlug = CITY_MAPPING[cityName] || cityName.toLowerCase();
  
  // Get service slug
  const serviceSlug = SERVICE_MAPPING[serviceType] || serviceType.toLowerCase();
  
  // Full slug for URL
  const fullSlug = `${serviceSlug}/${citySlug}`;
  
  return {
    service: serviceType,
    city: cityName,
    slug: fullSlug,
  };
}

// Parse Excel data
function parseExcelData(worksheet: any): any {
  const data = XLSX.utils.sheet_to_json(worksheet);
  return data;
}

// Generate TypeScript file content
function generateTSContent(
  filename: string,
  data: any[],
  parsedInfo: { service: string; city: string; slug: string }
): string {
  const { service, city, slug } = parsedInfo;
  const fileNameBase = filename.replace(/\.(xlsx|xls)$/, '');
  const interfaceName = `${fileNameBase.replace(/[^a-zA-Z0-9]/g, '')}Data`;
  
  // Extract key fields from data
  const pageData = data[0] || {};
  
  // Build the TypeScript content
  let tsContent = `// Auto-generated from XLSX: ${filename}
// Service: ${service}
// City: ${city}
// Slug: ${slug}
// Generated: ${new Date().toISOString()}

export interface ${interfaceName} {
  // Page Info
  h1?: string;
  primaryKw?: string;
  formula?: string;
  seoTitle?: string;
  meta?: string;
  schema?: any;
  wordCount?: number;
  
  // Content Sections
  geoAeoBlock?: string;
  features?: string;
  caseStudies?: any;
  faq?: any;
  faqSchema?: any;
  cta?: string;
  internalLinks?: string[];
  
  // Publishing Checklist
  publishingChecklist?: any;
  
  // Metadata
  service: string;
  city: string;
  slug: string;
  filename: string;
}

export const pageData: ${interfaceName} = {
  service: '${service}',
  city: '${city}',
  slug: '/locations/${slug}',
  filename: '${filename}',
  
  // Page Info
  h1: ${JSON.stringify(pageData['H1'] || '')},
  primaryKw: ${JSON.stringify(pageData['Primary KW'] || '')},
  formula: ${JSON.stringify(pageData['Formula'] || '')},
  seoTitle: ${JSON.stringify(pageData['SEO TITLE'] || '')},
  meta: ${JSON.stringify(pageData['META'] || '')},
  schema: ${JSON.stringify(pageData['SCHEMA'] || '')},
  wordCount: ${pageData['WORD COUNT'] ? parseInt(pageData['WORD COUNT']) : 0},
  
  // Content Sections
  geoAeoBlock: ${JSON.stringify(pageData['GEO/AEO BLOCK'] || '')},
  features: ${JSON.stringify(pageData['SECTION — FAB'] || '')},
  caseStudies: ${JSON.stringify(pageData['CASE STUDIES'] || '')},
  faq: ${JSON.stringify(pageData['H2 — FAQ'] || '')},
  faqSchema: ${JSON.stringify(pageData['FAQ SCHEMA'] || '')},
  cta: ${JSON.stringify(pageData['H2 — CTA'] || '')},
  internalLinks: ${JSON.stringify((pageData['INTERNAL LINKS'] || '').split(/[\n,]+/).filter(Boolean).map((s: string) => s.trim()))},
  
  // Publishing Checklist
  publishingChecklist: {
    onPageSeo: {
      title: { requirement: 'Max 60 chars', status: false },
      meta: { requirement: 'Max 155 chars', status: false },
      h1: { requirement: 'Primary KW', status: false },
      url: { requirement: 'Exact: /locations/${slug}/', status: false },
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
  },
};

// Helper to get by service type
export const getByService = (serviceType: string) => {
  if (pageData.service === serviceType) return pageData;
  return null;
};

// Helper to get by city
export const getByCity = (cityName: string) => {
  if (pageData.city === cityName) return pageData;
  return null;
};

// Default export
export default pageData;
`;

  return tsContent;
}

// Main conversion function
function convertXLSXtoTS(filename: string) {
  console.log(`📊 Processing: ${filename}`);
  
  try {
    const filePath = path.join(CONFIG.xlsxFolder, filename);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = parseExcelData(worksheet);
    
    if (data.length === 0) {
      console.warn(`⚠️  Warning: No data found in ${filename}`);
      return;
    }
    
    // Parse filename
    const parsedInfo = parseFileName(filename);
    const { service, city, slug } = parsedInfo;
    
    // Generate TypeScript content
    const tsContent = generateTSContent(filename, data, parsedInfo);
    
    // Create output directory
    const outputDir = path.join(CONFIG.outputFolder, service);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Create filename without extension
    const tsFileName = filename.replace(/\.(xlsx|xls)$/, '.ts');
    const outputPath = path.join(outputDir, tsFileName);
    
    // Write file
    fs.writeFileSync(outputPath, tsContent);
    
    // Store slug mapping
    CONFIG.slugMapping.set(slug, tsFileName);
    
    console.log(`✅ Generated: ${outputPath}`);
    console.log(`   📍 Service: ${service}, City: ${city}`);
    console.log(`   🔗 Slug: /locations/${slug}`);
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error);
  }
}

// Generate index file for each service
function generateServiceIndex(serviceName: string, files: string[]) {
  const serviceDir = path.join(CONFIG.outputFolder, serviceName);
  const imports = files.map(file => {
    const name = file.replace('.ts', '');
    return `export * from './${name}';`;
  }).join('\n');
  
  const content = `// Auto-generated index for ${serviceName}
// Generated: ${new Date().toISOString()}

${imports}
`;
  
  fs.writeFileSync(path.join(serviceDir, 'index.ts'), content);
  console.log(`📁 Generated index for ${serviceName} (${files.length} files)`);
}

// Generate master index
function generateMasterIndex() {
  const services = fs.readdirSync(CONFIG.outputFolder);
  const imports = services.map(service => {
    return `export * as ${service} from './${service}';`;
  }).join('\n');
  
  const content = `// Auto-generated master index
// Generated: ${new Date().toISOString()}

${imports}
`;
  
  fs.writeFileSync(path.join(CONFIG.outputFolder, 'index.ts'), content);
  console.log('📚 Master index generated');
}

// Generate slug mapping for Next.js routing
function generateSlugMapping() {
  const mapping: { [key: string]: string } = {};
  
  CONFIG.slugMapping.forEach((filename, slug) => {
    mapping[slug] = filename;
  });
  
  const content = `// Auto-generated slug mapping for dynamic routing
// Generated: ${new Date().toISOString()}

export const SLUG_MAPPING: { [key: string]: string } = ${JSON.stringify(mapping, null, 2)};

export const getAllSlugs = (): string[] => Object.keys(SLUG_MAPPING);

export const getFileNameBySlug = (slug: string): string | null => {
  return SLUG_MAPPING[slug] || null;
};

export const getAllServices = (): string[] => {
  const services = new Set<string>();
  Object.keys(SLUG_MAPPING).forEach(slug => {
    const [service] = slug.split('/');
    services.add(service);
  });
  return Array.from(services);
};

export const getAllCities = (): string[] => {
  const cities = new Set<string>();
  Object.keys(SLUG_MAPPING).forEach(slug => {
    const [_, city] = slug.split('/');
    if (city) cities.add(city);
  });
  return Array.from(cities);
};
`;
  
  fs.writeFileSync(
    path.join(CONFIG.outputFolder, 'slugMapping.ts'),
    content
  );
  
  console.log('📍 Slug mapping generated');
}

// Main execution
function main() {
  console.log('🚀 Starting XLSX to TypeScript conversion...');
  console.log('📁 XLSX folder:', CONFIG.xlsxFolder);
  console.log('📁 Output folder:', CONFIG.outputFolder);
  console.log('---');
  
  // Check if xlsx folder exists
  if (!fs.existsSync(CONFIG.xlsxFolder)) {
    console.error('❌ XLSX folder not found!');
    console.log(`📁 Please create: ${CONFIG.xlsxFolder}`);
    return;
  }
  
  // Get all xlsx files
  const files = fs.readdirSync(CONFIG.xlsxFolder)
    .filter(file => file.endsWith('.xlsx') || file.endsWith('.xls'));
  
  if (files.length === 0) {
    console.warn('⚠️  No XLSX files found in the folder');
    return;
  }
  
  console.log(`📁 Found ${files.length} XLSX file(s)`);
  console.log('---');
  
  // Ensure output folder exists
  if (!fs.existsSync(CONFIG.outputFolder)) {
    fs.mkdirSync(CONFIG.outputFolder, { recursive: true });
  }
  
  // Group files by service type
  const serviceGroups: { [key: string]: string[] } = {};
  
  // Process each file
  files.forEach(filename => {
    const parsedInfo = parseFileName(filename);
    const service = parsedInfo.service;
    
    if (!serviceGroups[service]) {
      serviceGroups[service] = [];
    }
    
    serviceGroups[service].push(filename);
    convertXLSXtoTS(filename);
  });
  
  // Generate indexes for each service
  Object.keys(serviceGroups).forEach(service => {
    const files = serviceGroups[service];
    const tsFiles = files.map(f => f.replace(/\.(xlsx|xls)$/, '.ts'));
    generateServiceIndex(service, tsFiles);
  });
  
  // Generate master index
  generateMasterIndex();
  
  // Generate slug mapping
  generateSlugMapping();
  
  console.log('---');
  console.log('🎉 All conversions completed!');
  console.log(`📊 Total pages: ${files.length}`);
  console.log(`📂 Services: ${Object.keys(serviceGroups).join(', ')}`);
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { convertXLSXtoTS, CONFIG, parseFileName };