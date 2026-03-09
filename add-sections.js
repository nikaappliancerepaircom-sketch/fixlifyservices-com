#!/usr/bin/env node
/**
 * add-sections.js
 * Adds "Our Services + Nearby Areas + Brands We Repair" sections
 * to all HTML files in /c/fixlifyservices/ that are missing "Nearby Areas".
 */

const fs = require('fs');
const path = require('path');

const ROOT = 'C:/fixlifyservices';

// Pages to skip entirely
const SKIP_FILES = new Set([
  '404.html', 'about.html', 'book.html', 'contact.html', 'brands.html',
  'index.html'  // index has its own hero layout
]);

// Also skip these directories
const SKIP_DIRS = new Set(['_pages_queue', '_queue', 'assets', 'data', 'includes']);

// City data for FIXLIFY (GTA-wide)
const CITIES = [
  { name: 'Toronto',      slug: 'toronto' },
  { name: 'Scarborough',  slug: 'scarborough' },
  { name: 'North York',   slug: 'north-york' },
  { name: 'Etobicoke',   slug: 'etobicoke' },
  { name: 'Mississauga', slug: 'mississauga' },
  { name: 'Brampton',    slug: 'brampton' },
  { name: 'Vaughan',     slug: 'vaughan' },
  { name: 'Richmond Hill', slug: 'richmond-hill' },
  { name: 'Markham',     slug: 'markham' },
  { name: 'Pickering',   slug: 'pickering' },
  { name: 'Ajax',        slug: 'ajax' },
  { name: 'Whitby',      slug: 'whitby' },
  { name: 'Oshawa',      slug: 'oshawa' },
];

// City hub pages (city.html files)
const CITY_HUBS = new Set(CITIES.map(c => c.slug));

// Services
const SERVICES = [
  { name: 'Refrigerator Repair', slug: 'fridge-repair' },
  { name: 'Washer Repair',       slug: 'washer-repair' },
  { name: 'Dryer Repair',        slug: 'dryer-repair' },
  { name: 'Dishwasher Repair',   slug: 'dishwasher-repair' },
  { name: 'Oven Repair',         slug: 'oven-repair' },
  { name: 'Stove Repair',        slug: 'stove-repair' },
];

// Brand data
const BRANDS = [
  { name: 'Samsung',    slug: 'samsung-appliance-repair' },
  { name: 'LG',         slug: 'lg-appliance-repair' },
  { name: 'Whirlpool',  slug: 'whirlpool-appliance-repair' },
  { name: 'GE',         slug: 'ge-appliance-repair' },
  { name: 'Bosch',      slug: 'bosch-appliance-repair' },
  { name: 'Frigidaire', slug: 'frigidaire-appliance-repair' },
];

// Service slug detection from filename prefix
const SERVICE_SLUGS = [
  { pattern: /^(fridge|refrigerator)-repair-/, slug: 'fridge-repair', label: 'Refrigerator Repair' },
  { pattern: /^washer-repair-/, slug: 'washer-repair', label: 'Washer Repair' },
  { pattern: /^dryer-repair-/, slug: 'dryer-repair', label: 'Dryer Repair' },
  { pattern: /^dishwasher-repair-/, slug: 'dishwasher-repair', label: 'Dishwasher Repair' },
  { pattern: /^oven-repair-/, slug: 'oven-repair', label: 'Oven Repair' },
  { pattern: /^stove-repair-/, slug: 'stove-repair', label: 'Stove Repair' },
  { pattern: /^dishwasher-installation-?/, slug: 'dishwasher-installation', label: 'Dishwasher Installation' },
];

// Brand slug detection
const BRAND_SLUGS = [
  { pattern: /^samsung-/, brand: 'samsung' },
  { pattern: /^lg-/, brand: 'lg' },
  { pattern: /^whirlpool-/, brand: 'whirlpool' },
  { pattern: /^ge-/, brand: 'ge' },
  { pattern: /^bosch-/, brand: 'bosch' },
  { pattern: /^frigidaire-/, brand: 'frigidaire' },
  { pattern: /^kenmore-/, brand: 'kenmore' },
];

const CSS_BLOCK = `<style>
.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px}
.related-card{display:block;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:10px 14px;transition:background .2s;text-decoration:none}
.related-card:hover{background:rgba(255,255,255,.08)}
.related-card-label{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#F59E0B;margin-bottom:3px}
.related-card-title{font-size:14px;font-weight:600;color:#e2e8f0}
</style>`;

function card(href, label, title) {
  return `<a href="${href}" class="related-card glass-card">
  <div class="related-card-label">${label}</div>
  <div class="related-card-title">${title}</div>
</a>`;
}

function buildSection(serviceCards, cityCards, brandCards) {
  return `
<!-- Related Links Section -->
<section class="related-links-section" style="background:var(--surface,#0f1523);padding:40px 0">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 24px">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:32px">
      <div>
        <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;margin-bottom:6px;color:var(--text,#e2e8f0);">Our Services</h3>
        <div class="related-grid">
          ${serviceCards.join('\n          ')}
        </div>
      </div>
      <div>
        <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;margin-bottom:6px;color:var(--text,#e2e8f0);">Nearby Areas</h3>
        <div class="related-grid">
          ${cityCards.join('\n          ')}
        </div>
      </div>
      <div>
        <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;margin-bottom:6px;color:var(--text,#e2e8f0);">Brands We Repair</h3>
        <div class="related-grid">
          ${brandCards.join('\n          ')}
        </div>
      </div>
    </div>
  </div>
</section>
`;
}

function detectPageType(filename, isInBlog) {
  const base = path.basename(filename, '.html');

  if (isInBlog) return { type: 'blog', base };

  // City hub: e.g. toronto.html
  if (CITY_HUBS.has(base)) return { type: 'city-hub', city: base, cityName: CITIES.find(c => c.slug === base)?.name || base };

  // Service+city: e.g. dishwasher-repair-toronto.html
  for (const s of SERVICE_SLUGS) {
    if (s.pattern.test(base)) {
      // Extract city from after the service slug
      const citySlug = base.replace(s.pattern, '').replace(/-$/, '') || null;
      return { type: 'service-city', serviceSlug: s.slug, serviceLabel: s.label, citySlug };
    }
  }

  // Brand page: e.g. samsung-appliance-repair.html
  for (const b of BRAND_SLUGS) {
    if (b.pattern.test(base)) return { type: 'brand', brand: b.brand };
  }

  // Generic service page (no city): fridge-repair.html, washer-repair.html
  for (const s of SERVICES) {
    if (base === s.slug) return { type: 'service-generic', serviceSlug: s.slug, serviceLabel: s.name };
  }

  return { type: 'generic', base };
}

function generateCards(pageInfo) {
  let serviceCards = [];
  let cityCards = [];
  let brandCards = [];

  const { type } = pageInfo;

  if (type === 'service-city') {
    const { serviceSlug, citySlug } = pageInfo;
    // Services: link to same service in Toronto (main city) for each service
    for (const svc of SERVICES) {
      if (svc.slug === serviceSlug) continue; // skip current service
      serviceCards.push(card(`/${svc.slug}-toronto`, 'Service', svc.name));
    }
    // Also add current service's main page
    serviceCards.unshift(card(`/${serviceSlug}`, 'Service', pageInfo.serviceLabel));

    // Nearby areas: link to same service in other cities
    for (const city of CITIES) {
      if (citySlug && city.slug === citySlug) continue; // skip current city
      cityCards.push(card(`/${serviceSlug}-${city.slug}`, 'Location', city.name));
    }

    // Brands: link to brand pages
    for (const b of BRANDS) {
      brandCards.push(card(`/${b.slug}`, 'Brand', b.name));
    }

  } else if (type === 'city-hub') {
    const { city } = pageInfo;
    // Services: all services in this city
    for (const svc of SERVICES) {
      serviceCards.push(card(`/${svc.slug}-${city}`, 'Service', svc.name));
    }
    // Nearby areas: other city hubs
    for (const c of CITIES) {
      if (c.slug === city) continue;
      cityCards.push(card(`/${c.slug}`, 'Location', c.name));
    }
    // Brands
    for (const b of BRANDS) {
      brandCards.push(card(`/${b.slug}`, 'Brand', b.name));
    }

  } else if (type === 'brand') {
    // Services: all generic services
    for (const svc of SERVICES) {
      serviceCards.push(card(`/${svc.slug}-toronto`, 'Service', svc.name));
    }
    // Nearby areas: main cities
    for (const c of CITIES.slice(0, 8)) {
      cityCards.push(card(`/${c.slug}`, 'Location', c.name));
    }
    // Brands: other brands
    for (const b of BRANDS) {
      if (b.slug.startsWith(pageInfo.brand + '-')) continue;
      brandCards.push(card(`/${b.slug}`, 'Brand', b.name));
    }
    if (brandCards.length === 0) {
      for (const b of BRANDS) {
        brandCards.push(card(`/${b.slug}`, 'Brand', b.name));
      }
    }

  } else if (type === 'blog') {
    // Blog: all services (no city suffix), main cities, brands
    for (const svc of SERVICES) {
      serviceCards.push(card(`/${svc.slug}-toronto`, 'Service', svc.name));
    }
    for (const c of CITIES.slice(0, 8)) {
      cityCards.push(card(`/${c.slug}`, 'Location', c.name));
    }
    for (const b of BRANDS) {
      brandCards.push(card(`/${b.slug}`, 'Brand', b.name));
    }

  } else {
    // Generic/service-generic/other: use main service pages
    for (const svc of SERVICES) {
      serviceCards.push(card(`/${svc.slug}-toronto`, 'Service', svc.name));
    }
    for (const c of CITIES.slice(0, 8)) {
      cityCards.push(card(`/${c.slug}`, 'Location', c.name));
    }
    for (const b of BRANDS) {
      brandCards.push(card(`/${b.slug}`, 'Brand', b.name));
    }
  }

  return { serviceCards, cityCards, brandCards };
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has Nearby Areas
  if (content.includes('Nearby Areas')) return { skipped: true, reason: 'already has Nearby Areas' };

  const filename = path.basename(filePath);
  const isInBlog = filePath.includes('/blog/');
  const pageInfo = detectPageType(filename, isInBlog);

  const { serviceCards, cityCards, brandCards } = generateCards(pageInfo);

  const section = buildSection(serviceCards, cityCards, brandCards);

  // Determine insertion point: before <!-- Footer --> or before <footer or before </body>
  let insertBefore = null;
  let insertPoint = -1;

  // Try <!-- Footer --> first
  const footerCommentIdx = content.indexOf('<!-- Footer -->');
  if (footerCommentIdx !== -1) {
    insertBefore = '<!-- Footer -->';
    insertPoint = footerCommentIdx;
  } else {
    // Try footer-placeholder div
    const footerPlaceholderIdx = content.indexOf('<div id="footer-placeholder">');
    if (footerPlaceholderIdx !== -1) {
      insertBefore = '<div id="footer-placeholder">';
      insertPoint = footerPlaceholderIdx;
    } else {
      // Try <footer
      const footerTagIdx = content.indexOf('<footer');
      if (footerTagIdx !== -1) {
        insertBefore = content.substring(footerTagIdx, content.indexOf('>', footerTagIdx) + 1);
        insertPoint = footerTagIdx;
      } else {
        // Try </body>
        const bodyCloseIdx = content.indexOf('</body>');
        if (bodyCloseIdx !== -1) {
          insertBefore = '</body>';
          insertPoint = bodyCloseIdx;
        }
      }
    }
  }

  if (insertPoint === -1) {
    return { skipped: true, reason: 'no footer/body insertion point found' };
  }

  // Check if CSS is already present, if not add it
  let cssToAdd = '';
  if (!content.includes('.related-card') && !content.includes('related-grid')) {
    cssToAdd = CSS_BLOCK + '\n';
    // Insert CSS before </head>
    const headCloseIdx = content.indexOf('</head>');
    if (headCloseIdx !== -1) {
      content = content.slice(0, headCloseIdx) + cssToAdd + content.slice(headCloseIdx);
      // Recalculate insertPoint since we added content before it
      insertPoint = content.indexOf(insertBefore, headCloseIdx);
      if (insertPoint === -1) {
        // Fallback: search from beginning
        insertPoint = content.indexOf(insertBefore);
      }
    }
  }

  // Insert the section
  content = content.slice(0, insertPoint) + section + content.slice(insertPoint);

  fs.writeFileSync(filePath, content, 'utf8');
  return { modified: true, type: pageInfo.type };
}

function walkDir(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walkDir(path.join(dir, entry.name), results);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(path.join(dir, entry.name));
    }
  }
  return results;
}

// Main execution
console.log('Starting add-sections.js...\n');

const allFiles = walkDir(ROOT);
console.log(`Found ${allFiles.length} HTML files total.\n`);

let processed = 0;
let modified = 0;
let skipped = 0;
let errors = 0;
const errorList = [];
const typeStats = {};

for (const filePath of allFiles) {
  const filename = path.basename(filePath);

  // Skip special files
  if (SKIP_FILES.has(filename)) {
    skipped++;
    continue;
  }

  // Skip blog index
  if (filePath.endsWith('blog/index.html')) {
    skipped++;
    continue;
  }

  processed++;
  try {
    const result = processFile(filePath);
    if (result.skipped) {
      skipped++;
      processed--;
    } else if (result.modified) {
      modified++;
      typeStats[result.type] = (typeStats[result.type] || 0) + 1;
    }
  } catch (err) {
    errors++;
    errorList.push(`${filePath}: ${err.message}`);
    console.error(`ERROR: ${filePath}: ${err.message}`);
  }
}

console.log('\n=== RESULTS ===');
console.log(`Total HTML files found: ${allFiles.length}`);
console.log(`Processed: ${processed}`);
console.log(`Modified (sections added): ${modified}`);
console.log(`Skipped (already had sections or special page): ${skipped}`);
console.log(`Errors: ${errors}`);
console.log('\nBy page type:');
for (const [type, count] of Object.entries(typeStats)) {
  console.log(`  ${type}: ${count}`);
}
if (errorList.length > 0) {
  console.log('\nErrors:');
  errorList.forEach(e => console.log('  ' + e));
}
console.log('\nDone!');
