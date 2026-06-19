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

// Parse filename
function parseFileName(filename: string) {
  const name = filename.replace(/\.(xlsx|xls)$/, '');
  const parts = name.replace('T3-', '').split('-');
  const serviceType = parts[0];
  const cityName = parts.slice(1).join('');
  const citySlug = CITY_MAPPING[cityName] || cityName.toLowerCase();
  const serviceSlug = SERVICE_MAPPING[serviceType] || serviceType.toLowerCase();
  
  return {
    service: serviceType,
    serviceSlug: serviceSlug,
    city: cityName,
    citySlug: citySlug,
    slug: `${serviceSlug}/${citySlug}`,
    fileName: name, // Store original filename for variable naming
  };
}

// Convert key-value rows to object
function keyValueRowsToObject(rows: any[]): any {
  const result: any = {};
  
  rows.forEach(row => {
    const keys = Object.keys(row);
    if (keys.length >= 2) {
      const key = String(row[keys[0]] || '').trim();
      const value = String(row[keys[1]] || '').trim();
      
      if (key && value && !key.includes('PAGE BRIEF') && !key.includes('FULL PAGE CONTENT')) {
        result[key] = value;
      }
    }
  });
  
  return result;
}

// Parse publishing checklist from rows
function parsePublishingChecklist(rows: any[]): any {
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

  rows.forEach(row => {
    const keys = Object.keys(row);
    if (keys.length >= 3) {
      const item = String(row[keys[0]] || '').trim();
      const requirement = String(row[keys[1]] || '').trim();
      const status = String(row[keys[2]] || '').trim();
      
      if (item && !isNaN(Number(item))) {
        const reqLower = requirement.toLowerCase();
        const isChecked = status.includes('☑') || status.includes('✓');
        
        if (reqLower.includes('title') || reqLower.includes('60 chars')) {
          checklist.onPageSeo.title.status = isChecked;
        }
        if (reqLower.includes('meta') || reqLower.includes('155 chars')) {
          checklist.onPageSeo.meta.status = isChecked;
        }
        if (reqLower.includes('h1') || reqLower.includes('primary kw')) {
          checklist.onPageSeo.h1.status = isChecked;
        }
        if (reqLower.includes('url') || reqLower.includes('exact')) {
          checklist.onPageSeo.url.status = isChecked;
        }
        if (reqLower.includes('localbusiness') || reqLower.includes('schema')) {
          checklist.schema.localBusiness.status = isChecked;
        }
        if (reqLower.includes('faqpage')) {
          checklist.schema.faqPage.status = isChecked;
        }
        if (reqLower.includes('aeo block')) {
          checklist.geoAeo.aeoBlock.status = isChecked;
        }
        if (reqLower.includes('faqs')) {
          checklist.geoAeo.faqs.status = isChecked;
        }
        if (reqLower.includes('author')) {
          checklist.eeat.author.status = isChecked;
        }
        if (reqLower.includes('case studies')) {
          checklist.eeat.caseStudies.status = isChecked;
        }
        if (reqLower.includes('cwv') || reqLower.includes('lcp')) {
          checklist.technical.cwv.status = isChecked;
        }
        if (reqLower.includes('mobile')) {
          checklist.technical.mobile.status = isChecked;
        }
        if (reqLower.includes('gsc')) {
          checklist.postPublish.gsc.status = isChecked;
        }
        if (reqLower.includes('ga4')) {
          checklist.postPublish.ga4.status = isChecked;
        }
        if (reqLower.includes('links')) {
          checklist.postPublish.links.status = isChecked;
        }
        if (reqLower.includes('tracker')) {
          checklist.postPublish.tracker.status = isChecked;
        }
      }
    }
  });

  return checklist;
}

// Process a single XLSX file and return the data
function processFile(filename: string): any {
  console.log(`  📊 Processing: ${filename}`);
  
  try {
    const filePath = path.join(CONFIG.xlsxFolder, filename);
    const workbook = XLSX.readFile(filePath);
    
    let mergedData: any = {};
    let checklistData: any = {};
    
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      
      if (sheetName === 'Publishing Checklist') {
        checklistData = parsePublishingChecklist(data);
      } else {
        const parsed = keyValueRowsToObject(data);
        mergedData = { ...mergedData, ...parsed };
      }
    });
    
    const parsedInfo = parseFileName(filename);
    
    return {
      ...parsedInfo,
      data: mergedData,
      checklist: checklistData,
    };
  } catch (error) {
    console.error(`  ❌ Error processing ${filename}:`, error);
    return null;
  }
}

// Format value for clean output
function formatValue(value: any): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'string') {
    // Escape backticks and special characters
    const escaped = value.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    return `\`${escaped}\``;
  }
  return JSON.stringify(value);
}

// Generate a TypeScript file for each XLSX file
function generateSingleFile(data: any, filename: string) {
  const { service, city, citySlug, serviceSlug, slug, fileName } = data;
  const { data: contentData, checklist } = data;
  
  // Create a variable name from the filename (remove T3- prefix and special chars)
  const varName = fileName.replace(/T3-/, '').replace(/-/g, '_');
  
  // Build the content for a single city
  let content = `// Auto-generated from XLSX file: ${filename}
// Service: ${service}
// City: ${city}
// Generated: ${new Date().toISOString()}

export const ${varName} = {\n`;
  
  // Add metadata
  content += `  service: "${service}",\n`;
  content += `  serviceSlug: "${serviceSlug}",\n`;
  content += `  city: "${city}",\n`;
  content += `  citySlug: "${citySlug}",\n`;
  content += `  slug: "/locations/${serviceSlug}/${citySlug}",\n`;
  content += `  \n`;
  
  // Add content data
  content += `  h1: ${formatValue(contentData['H1'] || '')},\n`;
  content += `  primaryKw: ${formatValue(contentData['Primary KW'] || '')},\n`;
  content += `  formula: ${formatValue(contentData['Formula'] || '')},\n`;
  content += `  seoTitle: ${formatValue(contentData['SEO TITLE'] || '')},\n`;
  content += `  meta: ${formatValue(contentData['META'] || '')},\n`;
  content += `  schema: ${formatValue(contentData['SCHEMA'] || null)},\n`;
  content += `  wordCount: ${contentData['WORD COUNT'] ? parseInt(String(contentData['WORD COUNT'])) : 0},\n`;
  content += `  geoAeoBlock: ${formatValue(contentData['GEO/AEO BLOCK'] || '')},\n`;
  content += `  features: ${formatValue(contentData['SECTION — FAB'] || '')},\n`;
  content += `  caseStudies: ${formatValue(contentData['CASE STUDIES'] || '')},\n`;
  content += `  faq: ${formatValue(contentData['H2 — FAQ'] || '')},\n`;
  content += `  faqSchema: ${formatValue(contentData['FAQ SCHEMA'] || null)},\n`;
  content += `  cta: ${formatValue(contentData['H2 — CTA'] || '')},\n`;
  
  // Internal links
  const linksRaw = contentData['INTERNAL LINKS'] || '';
  const linksArray = linksRaw.split(/[\n,]+/).filter(Boolean).map((s: string) => s.trim());
  content += `  internalLinks: ${formatValue(linksArray)},\n`;
  content += `  \n`;
  
  // Add publishing checklist
  content += `  publishingChecklist: {\n`;
  content += `    onPageSeo: {\n`;
  content += `      title: { requirement: "Max 60 chars", status: ${checklist.onPageSeo.title.status} },\n`;
  content += `      meta: { requirement: "Max 155 chars", status: ${checklist.onPageSeo.meta.status} },\n`;
  content += `      h1: { requirement: "Primary KW", status: ${checklist.onPageSeo.h1.status} },\n`;
  content += `      url: { requirement: "Exact URL", status: ${checklist.onPageSeo.url.status} },\n`;
  content += `    },\n`;
  content += `    schema: {\n`;
  content += `      localBusiness: { requirement: "schema.org validated", status: ${checklist.schema.localBusiness.status} },\n`;
  content += `      faqPage: { requirement: "Rich Results Test", status: ${checklist.schema.faqPage.status} },\n`;
  content += `    },\n`;
  content += `    geoAeo: {\n`;
  content += `      aeoBlock: { requirement: "First screen", status: ${checklist.geoAeo.aeoBlock.status} },\n`;
  content += `      faqs: { requirement: "AI citation format", status: ${checklist.geoAeo.faqs.status} },\n`;
  content += `    },\n`;
  content += `    eeat: {\n`;
  content += `      author: { requirement: "Amjad Khan", status: ${checklist.eeat.author.status} },\n`;
  content += `      caseStudies: { requirement: "Real metrics", status: ${checklist.eeat.caseStudies.status} },\n`;
  content += `    },\n`;
  content += `    technical: {\n`;
  content += `      cwv: { requirement: "LCP<2.5s", status: ${checklist.technical.cwv.status} },\n`;
  content += `      mobile: { requirement: "Full test", status: ${checklist.technical.mobile.status} },\n`;
  content += `    },\n`;
  content += `    postPublish: {\n`;
  content += `      gsc: { requirement: "Submitted", status: ${checklist.postPublish.gsc.status} },\n`;
  content += `      ga4: { requirement: "Events", status: ${checklist.postPublish.ga4.status} },\n`;
  content += `      links: { requirement: "Hub+service+2 related", status: ${checklist.postPublish.links.status} },\n`;
  content += `      tracker: { requirement: "LIVE", status: ${checklist.postPublish.tracker.status} },\n`;
  content += `    },\n`;
  content += `  },\n`;
  content += `};\n`;
  
  content += `\nexport default ${varName};\n`;

  // Write the file
  const outputPath = path.join(CONFIG.outputFolder, `${varName}.ts`);
  fs.writeFileSync(outputPath, content);
  console.log(`  ✅ Generated: ${varName}.ts`);
  
  return { varName, outputPath };
}

// Generate master index file that imports all individual files
function generateMasterIndex(allFiles: Array<{ varName: string, service: string, city: string, citySlug: string, slug: string }>) {
  // Group by service for better organization
  const groupedByService: { [key: string]: Array<{ varName: string, city: string, citySlug: string, slug: string }> } = {};
  
  allFiles.forEach(file => {
    if (!groupedByService[file.service]) {
      groupedByService[file.service] = [];
    }
    groupedByService[file.service].push(file);
  });
  
  // Generate imports with proper naming
  let imports = '';
  
  // Create imports
  allFiles.forEach(file => {
    imports += `import ${file.varName} from './${file.varName}';\n`;
  });
  
  // Create allLocations object with unique property names (using varName)
  let allLocationsMap = `export const allLocations = {\n`;
  allLocationsMap += allFiles.map(f => `  ${f.varName}: ${f.varName}`).join(',\n');
  allLocationsMap += `\n};\n\n`;
  
  // Create service-specific collections
  const serviceCollections = Object.keys(groupedByService).map(service => {
    const vars = groupedByService[service];
    return `export const ${service}Locations = {\n  ${vars.map(v => `${v.varName}: ${v.varName}`).join(',\n  ')}\n};`;
  }).join('\n\n');
  
  // Create helper functions - FIXED: Use unique keys to avoid duplicates
  const helpers = `
// Helper: Get location by slug
export const getLocationBySlug = (slug: string) => {
  const allData: { [key: string]: any } = {${allFiles.map(f => `\n    "${f.slug}": ${f.varName},`).join('')}
  };
  return allData[slug] || null;
};

// Helper: Get location by city name (returns first match)
export const getLocationByCity = (city: string) => {
  const cityMap: { [key: string]: any } = {${allFiles.map(f => `\n    "${f.city}_${f.service}": ${f.varName},`).join('')}
  };
  // Try exact match first
  for (const key in cityMap) {
    if (key.startsWith(city + '_')) {
      return cityMap[key];
    }
  }
  return null;
};

// Helper: Get location by city and service
export const getLocationByCityAndService = (city: string, service: string) => {
  const map: { [key: string]: any } = {${allFiles.map(f => `\n    "${f.city}_${f.service}": ${f.varName},`).join('')}
  };
  return map[\`\${city}_\${service}\`] || null;
};

// Helper: Get all slugs
export const getAllSlugs = () => [
  ${allFiles.map(f => `"${f.slug}"`).join(',\n  ')}
];

// Helper: Get all cities (returns unique city names)
export const getAllCities = () => {
  const uniqueCities = new Set([${allFiles.map(f => `"${f.city}"`).join(', ')}]);
  return Array.from(uniqueCities);
};

// Helper: Get all locations by service
export const getLocationsByService = (service: string) => {
  const serviceMap = {
    ${Object.keys(groupedByService).map(service => 
      `${service}: [${groupedByService[service].map(f => f.varName).join(', ')}]`
    ).join(',\n    ')}
  };
  return serviceMap[service as keyof typeof serviceMap] || [];
};

// Helper: Get service names
export const getServiceNames = () => [
  ${Object.keys(groupedByService).map(service => `"${service}"`).join(', ')}
];
`;
  
  // Combine everything
  const content = `// Auto-generated master index for all location pages
// Generated: ${new Date().toISOString()}
// Total files: ${allFiles.length}
// Total services: ${Object.keys(groupedByService).length}

${imports}

${allLocationsMap}

${serviceCollections}

${helpers}

// Export default as all locations
export default allLocations;
`;
  
  const indexPath = path.join(CONFIG.outputFolder, 'index.ts');
  fs.writeFileSync(indexPath, content);
  console.log(`\n📁 Generated master index: index.ts (${allFiles.length} locations, ${Object.keys(groupedByService).length} services)`);
}
// Main execution
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
  
  // Ensure output folder exists
  if (!fs.existsSync(CONFIG.outputFolder)) {
    fs.mkdirSync(CONFIG.outputFolder, { recursive: true });
  }
  
  // Process each file and collect metadata for index
  const allProcessedData: Array<{ varName: string, service: string, city: string, citySlug: string, slug: string }> = [];
  
  files.forEach(filename => {
    const result = processFile(filename);
    if (result) {
      const { varName } = generateSingleFile(result, filename);
      allProcessedData.push({
        varName,
        service: result.service,
        city: result.city,
        citySlug: result.citySlug,
        slug: result.slug,
      });
    }
  });
  
  console.log('\n---');
  
  // Generate master index with all files
  if (allProcessedData.length > 0) {
    generateMasterIndex(allProcessedData);
  }
  
  console.log('\n---');
  console.log('🎉 All conversions completed!');
  console.log(`📊 Generated ${allProcessedData.length} location files`);
  console.log(`📁 Output folder: ${CONFIG.outputFolder}`);
  
  // Log service statistics
  const serviceCount: { [key: string]: number } = {};
  allProcessedData.forEach(data => {
    serviceCount[data.service] = (serviceCount[data.service] || 0) + 1;
  });
  console.log('📊 Services breakdown:', serviceCount);
}

main();

export { main };