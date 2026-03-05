#!/usr/bin/env node
/**
 * fix-internal-links.js
 * Fixes brand links in "Brands We Service/Repair" sections and updates
 * internal linking across fixlifyservices HTML pages.
 *
 * Two main fixes:
 * 1. Old template: <span class="brand-tag">BrandName</span>
 *    → <a href="/brand-service-repair" class="brand-tag">BrandName</a>
 *
 * 2. New template: related-card glass-card links pointing to /brand-appliance-repair
 *    → update to /brand-service-repair when a service-specific page exists
 *
 * 3. Brand hub pages: add city links to service-specific brand pages when they exist
 */

const fs = require('fs');
const path = require('path');

const ROOT = 'C:/fixlifyservices';

// ─── Brand configuration ───────────────────────────────────────────────────
const BRAND_SLUGS = {
  'Samsung':    'samsung',
  'LG':         'lg',
  'Whirlpool':  'whirlpool',
  'GE':         'ge',
  'Bosch':      'bosch',
  'Frigidaire': 'frigidaire',
  'Kenmore':    'kenmore',
  'Maytag':     'maytag',
  'KitchenAid': 'kitchenaid',
  'Miele':      'miele',
};

// Service slug mapping from filename keywords
// NOTE: dishwasher must be checked BEFORE washer (dishwasher contains "washer")
function getServiceSlug(filename) {
  const f = filename.toLowerCase();
  if (f.includes('fridge') || f.includes('refrigerator')) return 'fridge';
  if (f.includes('dishwasher')) return 'dishwasher';  // must come before washer
  if (f.includes('washer')) return 'washer';
  if (f.includes('dryer')) return 'dryer';
  if (f.includes('oven')) return 'oven';
  if (f.includes('stove')) return 'stove';
  return null;
}

// All HTML files that exist in root
const ALL_HTML = new Set(
  fs.readdirSync(ROOT)
    .filter(f => f.endsWith('.html'))
    .map(f => f.toLowerCase())
);

// Check if a page exists in root
function pageExists(slug) {
  return ALL_HTML.has(slug.toLowerCase().replace(/^\//, '').replace(/\.html$/, '') + '.html')
      || ALL_HTML.has(slug.toLowerCase().replace(/^\//, ''));
}

// Resolve the best brand href for a given brand + service
// Priority: {brand}-{service}-repair.html > {brand}-repair.html > null
function resolveBrandHref(brandSlug, serviceSlug) {
  if (serviceSlug) {
    const specific = `${brandSlug}-${serviceSlug}-repair.html`;
    if (ALL_HTML.has(specific)) return `/${specific.replace('.html', '')}`;
  }
  const general = `${brandSlug}-repair.html`;
  if (ALL_HTML.has(general)) return `/${general.replace('.html', '')}`;
  // Also check appliance-repair page
  const appliance = `${brandSlug}-appliance-repair.html`;
  if (ALL_HTML.has(appliance)) return `/${appliance.replace('.html', '')}`;
  return null;
}

// ─── Files to skip ─────────────────────────────────────────────────────────
const SKIP_FILES = new Set([
  '404.html',
  'about.html',
  'contact.html',
  'sitemap.xml',
  'thank-you.html',
  'for-businesses.html',
  'index.html',
  'brands.html',
  'locations.html',
  'services.html',
  'emergency.html',
  'pricing.html',
  'book.html',
]);

function shouldSkip(filename) {
  if (SKIP_FILES.has(filename)) return true;
  if (filename.startsWith('privacy')) return true;
  if (filename.startsWith('terms')) return true;
  if (filename.startsWith('contact')) return true;
  if (filename.startsWith('sitemap')) return true;
  if (filename.startsWith('thank-you')) return true;
  // Skip blog pages (in blog/ subdirectory - not needed since we only process root)
  return false;
}

// ─── Statistics ─────────────────────────────────────────────────────────────
let totalFilesProcessed = 0;
let totalFilesModified = 0;
let totalBrandTagsFixed = 0;
let totalRelatedCardFixed = 0;
let totalBrandTagsSkipped = 0;
const modifiedFiles = [];
const changeLog = [];

// ─── Fix 1: Old template brand-tag spans ────────────────────────────────────
// Pattern: <span class="brand-tag">BrandName</span>
// Target:  <a href="/brand-service-repair" class="brand-tag">BrandName</a>
function fixBrandTagSpans(content, filename, serviceSlug) {
  let changed = false;
  let fixCount = 0;
  let skipCount = 0;

  const result = content.replace(
    /<span class="brand-tag">([^<]+)<\/span>/g,
    (match, brandName) => {
      const trimmedBrand = brandName.trim();
      const brandSlug = BRAND_SLUGS[trimmedBrand];

      if (!brandSlug) {
        // Not a known brand (Wolf, Viking, Sub-Zero, etc.) — leave as-is
        return match;
      }

      const href = resolveBrandHref(brandSlug, serviceSlug);
      if (!href) {
        skipCount++;
        return match;
      }

      fixCount++;
      changed = true;
      return `<a href="${href}" class="brand-tag">${brandName}</a>`;
    }
  );

  return { content: result, changed, fixCount, skipCount };
}

// ─── Fix 2: New template related-card glass-card brand links ────────────────
// Pattern: <a href="/samsung-appliance-repair" class="related-card glass-card">
// When a service-specific page exists, update to:
//          <a href="/samsung-fridge-repair" class="related-card glass-card">
function fixRelatedCardBrandLinks(content, filename, serviceSlug) {
  if (!serviceSlug) return { content, changed: false, fixCount: 0 };

  let changed = false;
  let fixCount = 0;

  const result = content.replace(
    /<a\s+href="(\/([a-z]+)-appliance-repair)"\s+class="related-card glass-card">/g,
    (match, currentHref, brandSlug) => {
      if (!Object.values(BRAND_SLUGS).includes(brandSlug)) return match;

      const serviceSpecific = `${brandSlug}-${serviceSlug}-repair.html`;
      if (ALL_HTML.has(serviceSpecific)) {
        const newHref = `/${serviceSpecific.replace('.html', '')}`;
        if (newHref !== currentHref) {
          changed = true;
          fixCount++;
          return `<a href="${newHref}" class="related-card glass-card">`;
        }
      }
      return match;
    }
  );

  return { content: result, changed, fixCount };
}

// ─── Fix 3: Brand hub pages — city links ─────────────────────────────────────
// On brand hub pages (samsung-repair.html etc), detect cities in plain text
// and link them to /{brand}-repair-{city}.html if it exists, else /{city}.html
function fixBrandHubCityLinks(content, filename) {
  // Only process brand hub pages
  const brandHubMatch = filename.match(/^([a-z]+)-(repair|appliance-repair)\.html$/);
  if (!brandHubMatch) return { content, changed: false, fixCount: 0 };

  const brandSlug = brandHubMatch[1];
  if (!Object.values(BRAND_SLUGS).includes(brandSlug) &&
      brandSlug !== 'bosch' && brandSlug !== 'kenmore') return { content, changed: false, fixCount: 0 };

  // Find <li>CityName</li> patterns where city names are linked to city pages
  // Only match standalone city names (not long sentences)
  const cityPageMap = {};
  const CITIES = [
    'Toronto', 'Scarborough', 'North York', 'Etobicoke', 'Mississauga',
    'Brampton', 'Markham', 'Vaughan', 'Richmond Hill', 'Newmarket',
    'Oakville', 'Burlington', 'Ajax', 'Pickering', 'Oshawa', 'Whitby',
  ];

  // Build city→slug mapping
  const citySlugMap = {
    'Toronto': 'toronto',
    'Scarborough': 'scarborough',
    'North York': 'north-york',
    'Etobicoke': 'etobicoke',
    'Mississauga': 'mississauga',
    'Brampton': 'brampton',
    'Markham': 'markham',
    'Vaughan': 'vaughan',
    'Richmond Hill': 'richmond-hill',
    'Newmarket': 'newmarket',
    'Oakville': 'oakville',
    'Burlington': 'burlington',
    'Ajax': 'ajax',
    'Pickering': 'pickering',
    'Oshawa': 'oshawa',
    'Whitby': 'whitby',
  };

  let changed = false;
  let fixCount = 0;

  let result = content;

  // Replace <li>CityName</li> where it's just a city name (no <a> already)
  for (const [cityName, citySlug] of Object.entries(citySlugMap)) {
    const pattern = new RegExp(
      `<li>\\s*${cityName.replace(' ', '\\s+')}\\s*<\\/li>`,
      'g'
    );

    result = result.replace(pattern, (match) => {
      // Check if brand-repair-city page exists
      const brandCityPage = `${brandSlug}-repair-${citySlug}.html`;
      const cityPage = `${citySlug}.html`;

      let href;
      if (ALL_HTML.has(brandCityPage)) {
        href = `/${brandCityPage.replace('.html', '')}`;
      } else if (ALL_HTML.has(cityPage)) {
        href = `/${cityPage.replace('.html', '')}`;
      } else {
        return match; // Leave as-is
      }

      changed = true;
      fixCount++;
      return `<li><a href="${href}">${cityName}</a></li>`;
    });
  }

  return { content: result, changed, fixCount };
}

// ─── Main processing loop ────────────────────────────────────────────────────
const htmlFiles = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html'))
  .sort();

console.log(`\nProcessing ${htmlFiles.length} HTML files in ${ROOT}\n`);
console.log('─'.repeat(60));

for (const filename of htmlFiles) {
  if (shouldSkip(filename)) continue;

  const filepath = path.join(ROOT, filename);
  let content;
  try {
    content = fs.readFileSync(filepath, 'utf8');
  } catch (e) {
    console.error(`ERROR reading ${filename}: ${e.message}`);
    continue;
  }

  totalFilesProcessed++;
  const serviceSlug = getServiceSlug(filename);
  let fileChanged = false;
  const fileChanges = [];

  // Fix 1: brand-tag spans
  if (content.includes('class="brand-tag"')) {
    const fix1 = fixBrandTagSpans(content, filename, serviceSlug);
    if (fix1.changed) {
      content = fix1.content;
      fileChanged = true;
      totalBrandTagsFixed += fix1.fixCount;
      fileChanges.push(`brand-tag spans fixed: ${fix1.fixCount}`);
    }
    if (fix1.skipCount > 0) {
      totalBrandTagsSkipped += fix1.skipCount;
    }
  }

  // Fix 2: related-card brand links (only for service pages with a serviceSlug)
  if (serviceSlug && content.includes('related-card glass-card') && content.includes('-appliance-repair')) {
    const fix2 = fixRelatedCardBrandLinks(content, filename, serviceSlug);
    if (fix2.changed) {
      content = fix2.content;
      fileChanged = true;
      totalRelatedCardFixed += fix2.fixCount;
      fileChanges.push(`related-card brand links upgraded: ${fix2.fixCount}`);
    }
  }

  // Fix 3: brand hub city links
  const fix3 = fixBrandHubCityLinks(content, filename);
  if (fix3.changed) {
    content = fix3.content;
    fileChanged = true;
    fileChanges.push(`brand hub city links: ${fix3.fixCount}`);
  }

  // Write if changed
  if (fileChanged) {
    try {
      fs.writeFileSync(filepath, content, 'utf8');
      totalFilesModified++;
      modifiedFiles.push(filename);
      console.log(`✓ ${filename}`);
      fileChanges.forEach(c => console.log(`    ${c}`));
      changeLog.push({ file: filename, changes: fileChanges });
    } catch (e) {
      console.error(`ERROR writing ${filename}: ${e.message}`);
    }
  }
}

// ─── Summary ─────────────────────────────────────────────────────────────────
console.log('\n' + '═'.repeat(60));
console.log('SUMMARY');
console.log('═'.repeat(60));
console.log(`Files processed:          ${totalFilesProcessed}`);
console.log(`Files modified:           ${totalFilesModified}`);
console.log(`brand-tag spans linked:   ${totalBrandTagsFixed}`);
console.log(`brand-tag spans skipped   (no page exists): ${totalBrandTagsSkipped}`);
console.log(`related-card links upgraded: ${totalRelatedCardFixed}`);
console.log('─'.repeat(60));

// Detail breakdown by service
console.log('\nBrand page availability (used for linking):');
for (const [brandName, brandSlug] of Object.entries(BRAND_SLUGS)) {
  const services = ['fridge', 'washer', 'dryer', 'dishwasher', 'oven', 'stove'];
  const available = services.filter(s => ALL_HTML.has(`${brandSlug}-${s}-repair.html`));
  const general = ALL_HTML.has(`${brandSlug}-repair.html`) ? 'general' : '';
  const appliance = ALL_HTML.has(`${brandSlug}-appliance-repair.html`) ? 'appliance' : '';
  const pages = [...available, general, appliance].filter(Boolean);
  console.log(`  ${brandName.padEnd(12)}: ${pages.length > 0 ? pages.join(', ') : 'NO PAGES'}`);
}

console.log('\nDone.\n');
