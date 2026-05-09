#!/usr/bin/env node
/**
 * migrate-fixlify-edmonton.js
 * Repurposes fixlifyservices.com to Edmonton-only appliance repair site.
 *
 * Usage:
 *   node migrate-fixlify-edmonton.js --dry-run   # preview counts, no writes
 *   node migrate-fixlify-edmonton.js             # apply changes
 */

'use strict';

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const BASE = __dirname;

// ---------------------------------------------------------------------------
// City classification sets
// ---------------------------------------------------------------------------

const EDMONTON_TOKENS = [
  'edmonton',
  'sherwood-park', 'sherwood_park', 'sherwoodpark',
  'st-albert', 'st_albert', 'stalbert',
  'spruce-grove', 'spruce_grove', 'sprucegrove',
  'leduc',
  'fort-saskatchewan', 'fort_saskatchewan', 'fortsaskatchewan',
  'beaumont',
  'stony-plain', 'stony_plain', 'stonyplain',
  'devon',
  'morinville',
];

// Calgary + non-Edmonton Alberta cities
const CALGARY_AB_TOKENS = [
  'calgary',
  'airdrie',
  'cochrane',
  'okotoks',
  'chestermere',
  'strathmore',
  'banff',
  'canmore',
  'high-river', 'high_river', 'highriver',
  'langdon',
  'beiseker',
];

// Toronto / GTA tokens
const GTA_TOKENS = [
  'toronto',
  'mississauga',
  'brampton',
  'scarborough',
  'oakville',
  'etobicoke',
  'vaughan',
  'markham',
  'richmond-hill', 'richmond_hill', 'richmondhill',
  'north-york', 'north_york', 'northyork',
  'ajax',
  'pickering',
  'whitby',
  'burlington',
  'oshawa',
  'newmarket',
  'bradford',
  'east-york', 'east_york', 'eastyork',
  'midtown',
  'willowdale',
  'bayview-village', 'bayview_village', 'bayviewvillage',
  'don-mills', 'don_mills', 'donmills',
  'forest-hill', 'forest_hill', 'foresthill',
  'rosedale',
  'the-annex', 'the_annex', 'theannex',
  'leslieville',
  'liberty-village', 'liberty_village', 'libertyvillage',
  'riverdale',
  'danforth-village', 'danforth_village', 'danforthvillage',
  'parkdale',
  'the-junction', 'the_junction', 'thejunction',
  'leaside',
  'lawrence-park', 'lawrence_park', 'lawrencepark',
  'davisville-village', 'davisville_village', 'davisvillevillage',
  'cabbagetown',
  'islington-village', 'islington_village', 'islingtonvillage',
  'humber-valley', 'humber_valley', 'humbervalley',
  'birchcliff',
  'scarborough-village', 'scarborough_village', 'scarboroughvillage',
  'bloor-west-village', 'bloor_west_village', 'bloorwestvillage',
  'high-park', 'high_park', 'highpark',
  'greektown',
  'little-italy', 'little_italy', 'littleitaly',
  'little-portugal', 'little_portugal', 'littleportugal',
  'corso-italia', 'corso_italia', 'corsoitalia',
  'dufferin-grove', 'dufferin_grove', 'dufferingrove',
  'trinity-bellwoods', 'trinity_bellwoods', 'trinitybellwoods',
  'chinatown',
  'ossington',
  'roncesvalles',
  'wychwood',
  'thorncliffe-park', 'thorncliffe_park', 'thorncliffpark',
  'st-lawrence', 'st_lawrence', 'stlawrence',
  'king-west', 'king_west', 'kingwest',
  'swansea',
  'etobicoke-village', 'etobicoke_village', 'etobicokevillage',
  'the-beaches', 'the_beaches', 'thebeaches',
];

// Generic service type → clean title name mapping (derived from slug prefix)
const SERVICE_TYPE_MAP = {
  'fridge': 'Refrigerator Repair',
  'refrigerator': 'Refrigerator Repair',
  'washer': 'Washer Repair',
  'dryer': 'Dryer Repair',
  'dishwasher': 'Dishwasher Repair',
  'oven': 'Oven Repair',
  'stove': 'Stove & Range Repair',
  'range': 'Stove & Range Repair',
  'freezer': 'Freezer Repair',
  'microwave': 'Microwave Repair',
  'bosch': 'Appliance Repair',
  'lg': 'Appliance Repair',
  'samsung': 'Appliance Repair',
  'whirlpool': 'Appliance Repair',
  'ge': 'Appliance Repair',
  'maytag': 'Appliance Repair',
  'kenmore': 'Appliance Repair',
  'kitchenaid': 'Appliance Repair',
  'electrolux': 'Appliance Repair',
  'frigidaire': 'Appliance Repair',
};

// NIKA canonical domain for redirect map
const NIKA_BASE = 'https://nikaappliancerepair.com';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugContains(slug, tokens) {
  const s = slug.toLowerCase();
  return tokens.some(t => s.includes(t));
}

function classifyFile(relPath) {
  const slug = relPath.replace(/\.html$/, '').replace(/^\//, '');
  const lower = slug.toLowerCase();

  if (slugContains(lower, EDMONTON_TOKENS)) return 'edmonton';
  if (slugContains(lower, CALGARY_AB_TOKENS)) return 'calgary';
  if (slugContains(lower, GTA_TOKENS)) return 'gta';
  return 'generic';
}

function extractMeta(html, name) {
  const m = html.match(new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']+)["']`, 'i'))
    || html.match(new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+name=["']${name}["']`, 'i'));
  return m ? m[1] : '';
}

function extractOgImage(html) {
  const m = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)
    || html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);
  return m ? m[1] : 'https://fixlifyservices.com/og-image.jpg';
}

function extractCanonical(html) {
  const m = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  return m ? m[1] : '';
}

function guessServiceType(slug) {
  const s = slug.toLowerCase();
  for (const [key, val] of Object.entries(SERVICE_TYPE_MAP)) {
    if (s.startsWith(key) || s.includes('-' + key + '-') || s.includes('/' + key + '-')) {
      return val;
    }
  }
  return 'Appliance Repair';
}

function guessBusinessName(slug, city) {
  const svc = guessServiceType(slug);
  const cityName = cityTitleCase(city);
  return `${svc} ${cityName}`;
}

function cityTitleCase(token) {
  // "sherwood-park" → "Sherwood Park"
  return token.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function detectEdmontonCity(slug) {
  for (const t of EDMONTON_TOKENS) {
    if (slug.toLowerCase().includes(t)) {
      return cityTitleCase(t);
    }
  }
  return 'Edmonton';
}

// ---------------------------------------------------------------------------
// Phone number removal
// ---------------------------------------------------------------------------

function stripPhones(html) {
  // Remove <a href="tel:...">...</a> links entirely (phone call CTAs)
  html = html.replace(/<a\s[^>]*href=["']tel:[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '');

  // Remove bare phone number patterns (437, 416, 647, 780, 825, 587, 403)
  html = html.replace(/\((?:437|416|647|780|825|587|403)\)\s*\d{3}[-.\s]\d{4}/g, '');
  html = html.replace(/(?:437|416|647|780|825|587|403)[-.\s]\d{3}[-.\s]\d{4}/g, '');
  html = html.replace(/\+1[-.\s]?(?:437|416|647|780|825|587|403)[-.\s]\d{3}[-.\s]\d{4}/g, '');

  // Remove remaining tel: href references
  html = html.replace(/href=["']tel:[^"']*["']/gi, 'href="#book"');

  // Clean up sticky-cta call button (replace with book-only)
  html = html.replace(
    /<div class="sticky-cta"[\s\S]*?<\/div>\s*(?=<script|<\/body)/,
    `<div class="sticky-cta" aria-label="Quick contact">
  <a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="sticky-btn sticky-book" target="_blank" rel="noopener">Book Online &rarr;</a>
</div>\n`
  );

  return html;
}

// ---------------------------------------------------------------------------
// Footer replacement
// ---------------------------------------------------------------------------

const FOOTER_EDMONTON = fs.readFileSync(
  path.join('C:/NikaApplianceRepair/templates/footer-edmonton.html'),
  'utf8'
);

function replaceFooter(html) {
  // Match <footer ... > ... </footer> (non-greedy, single)
  return html.replace(/<footer[\s\S]*?<\/footer>/i, FOOTER_EDMONTON.trim());
}

// ---------------------------------------------------------------------------
// Schema replacement
// ---------------------------------------------------------------------------

const SCHEMA_TEMPLATE = fs.readFileSync(
  path.join('C:/NikaApplianceRepair/templates/schema-edmonton.json'),
  'utf8'
);

function replaceSchema(html, slug) {
  const pageUrl = extractCanonical(html) || `https://fixlifyservices.com/${slug}`;
  const pageDesc = extractMeta(html, 'description') || 'Edmonton appliance repair — same-day service, book online.';
  const heroImage = extractOgImage(html);
  const serviceType = guessServiceType(slug);
  const edCity = detectEdmontonCity(slug);
  const businessName = `${serviceType} ${edCity}` === 'Appliance Repair Edmonton'
    ? 'Edmonton Appliance Repair'
    : `${serviceType} ${edCity}`;

  let schema = SCHEMA_TEMPLATE
    .replace(/\{\{PAGE_URL\}\}/g, pageUrl)
    .replace(/\{\{BUSINESS_NAME\}\}/g, businessName)
    .replace(/\{\{PAGE_DESCRIPTION\}\}/g, pageDesc.replace(/"/g, '&quot;'))
    .replace(/\{\{HERO_IMAGE_URL\}\}/g, heroImage)
    .replace(/\{\{SERVICE_TYPE_OR_APPLIANCE_REPAIR\}\}/g, serviceType);

  const scriptBlock = `<script type="application/ld+json">\n${schema}\n</script>`;

  // Remove ALL existing LocalBusiness / ProfessionalService / Service / FAQPage JSON-LD @graph blocks
  // (the existing pages have a single @graph array or multiple script blocks)
  html = html.replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, '');

  // Insert new schema before </head>
  html = html.replace(/<\/head>/i, `${scriptBlock}\n</head>`);

  return html;
}

// ---------------------------------------------------------------------------
// Title fix
// ---------------------------------------------------------------------------

function fixTitle(html, slug) {
  const svc = guessServiceType(slug);
  const city = detectEdmontonCity(slug);
  const newTitle = `${svc} ${city} | From $65 | Edmonton Appliance Repair`;
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${newTitle}</title>`);

  // Fix OG title too
  html = html.replace(
    /(<meta\s+property=["']og:title["']\s+content=["'])[^"']*(['"]\s*>)/gi,
    `$1${newTitle}$2`
  );
  html = html.replace(
    /(<meta\s+content=["'])[^"']*(["']\s+property=["']og:title["'])/gi,
    `$1${newTitle}$2`
  );

  // Fix twitter:title
  html = html.replace(
    /(<meta\s+name=["']twitter:title["']\s+content=["'])[^"']*(['"]\s*>)/gi,
    `$1${newTitle}$2`
  );

  return html;
}

// ---------------------------------------------------------------------------
// noindex injection
// ---------------------------------------------------------------------------

function addNoindex(html) {
  // Replace existing robots meta or add new one
  if (/<meta\s+name=["']robots["']/i.test(html)) {
    html = html.replace(
      /<meta\s+name=["']robots["'][^>]*>/gi,
      '<meta name="robots" content="noindex, follow">'
    );
  } else {
    html = html.replace(/<\/head>/i, '<meta name="robots" content="noindex, follow">\n</head>');
  }
  return html;
}

// ---------------------------------------------------------------------------
// Homepage transformation
// ---------------------------------------------------------------------------

function transformHomepage(html) {
  // Update title
  html = html.replace(
    /<title>[^<]*<\/title>/i,
    '<title>Edmonton Appliance Repair | Same-Day Service | From $65</title>'
  );

  // Update meta description
  html = html.replace(
    /(<meta\s+name=["']description["']\s+content=["'])[^"']*(["'])/i,
    '$1Same-day appliance repair in Edmonton, AB. Serving Edmonton, Sherwood Park, St. Albert, Spruce Grove, Leduc, Fort Saskatchewan, and Beaumont. Book online — confirmation within minutes. From $65.$2'
  );

  // Update OG title
  html = html.replace(
    /(<meta\s+property=["']og:title["']\s+content=["'])[^"']*(["'])/i,
    '$1Edmonton Appliance Repair | Same-Day Service | From $65$2'
  );

  // Update OG description
  html = html.replace(
    /(<meta\s+property=["']og:description["']\s+content=["'])[^"']*(["'])/i,
    '$1Edmonton appliance repair — fridge, washer, dryer, dishwasher, oven. Serving Edmonton CMA. Book online at fixlifyservices.com. From $65.$2'
  );

  // Strip phones
  html = stripPhones(html);

  // Replace Hero H1 — find first <h1 ...>...</h1> and update
  html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '<h1 class="hero-title">Edmonton Appliance Repair</h1>');

  // Replace footer
  html = replaceFooter(html);

  // Replace schema
  html = replaceSchema(html, 'index');

  // Fix robots (should be index, follow for homepage)
  if (/<meta\s+name=["']robots["']/i.test(html)) {
    html = html.replace(
      /<meta\s+name=["']robots["'][^>]*>/gi,
      '<meta name="robots" content="index, follow">'
    );
  }

  // Replace "Book Online" / "Call" CTA buttons — remove call CTAs, keep book
  html = html.replace(
    /Book Online Now|Book Appointment|Book a Repair|Book Now/gi,
    'Book Online'
  );

  return html;
}

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

function getAllHtmlFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) {
      // Recurse into blog/
      if (['blog', 'includes'].includes(e.name)) {
        const sub = getAllHtmlFiles(path.join(dir, e.name));
        sub.forEach(f => results.push(path.join(e.name, f)));
      }
    } else if (e.name.endsWith('.html')) {
      results.push(e.name);
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// GTA → NIKA redirect map builder
// ---------------------------------------------------------------------------

function buildNikaPath(slug) {
  // Attempt to map slug to NIKA service path
  // e.g. "dishwasher-repair-toronto" → /services/dishwasher-repair-toronto
  // neighbourhood pages → /services/{slug} or / for city hubs
  return `${NIKA_BASE}/services/${slug}`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log(`\n=== migrate-fixlify-edmonton.js ${DRY_RUN ? '[DRY RUN]' : '[LIVE]'} ===\n`);

  const files = getAllHtmlFiles(BASE);
  console.log(`Total HTML files found: ${files.length}`);

  const counts = { edmonton: 0, calgary: 0, gta: 0, generic: 0, skipped: 0 };
  const gtaRedirects = {};
  const edmontonUrls = [];

  // SKIP list
  const SKIP = ['service-template.html', '404.html'];

  for (const rel of files) {
    if (SKIP.includes(path.basename(rel))) {
      counts.skipped++;
      continue;
    }

    const fullPath = path.join(BASE, rel);
    const slug = rel.replace(/\.html$/, '').replace(/\\/g, '/');
    const category = rel === 'index.html' ? 'edmonton' : classifyFile(rel);

    let html = fs.readFileSync(fullPath, 'utf8');
    let changed = false;

    if (rel === 'index.html') {
      // Homepage — full Edmonton transformation
      const newHtml = transformHomepage(html);
      if (newHtml !== html) {
        changed = true;
        if (!DRY_RUN) fs.writeFileSync(fullPath, newHtml, 'utf8');
        html = newHtml;
      }
      counts.edmonton++;
      edmontonUrls.push(`https://fixlifyservices.com/`);

    } else if (category === 'edmonton') {
      // Edmonton page — full migration
      let newHtml = html;
      newHtml = stripPhones(newHtml);
      newHtml = replaceFooter(newHtml);
      newHtml = replaceSchema(newHtml, slug);
      newHtml = fixTitle(newHtml, slug);

      if (newHtml !== html) {
        changed = true;
        if (!DRY_RUN) fs.writeFileSync(fullPath, newHtml, 'utf8');
      }
      counts.edmonton++;
      edmontonUrls.push(`https://fixlifyservices.com/${slug}`);

    } else if (category === 'calgary') {
      // Calgary / non-Edmonton AB — add noindex
      const newHtml = addNoindex(html);
      if (newHtml !== html) {
        changed = true;
        if (!DRY_RUN) fs.writeFileSync(fullPath, newHtml, 'utf8');
      }
      counts.calgary++;

    } else if (category === 'gta') {
      // GTA page — add noindex + collect redirect
      const newHtml = addNoindex(html);
      if (newHtml !== html) {
        changed = true;
        if (!DRY_RUN) fs.writeFileSync(fullPath, newHtml, 'utf8');
      }
      counts.gta++;

      // Build redirect entry
      const urlPath = `/${slug}`;
      gtaRedirects[urlPath] = buildNikaPath(slug);

    } else {
      // Generic page — strip phones + replace footer only
      let newHtml = html;
      newHtml = stripPhones(newHtml);
      newHtml = replaceFooter(newHtml);
      if (newHtml !== html) {
        changed = true;
        if (!DRY_RUN) fs.writeFileSync(fullPath, newHtml, 'utf8');
      }
      counts.generic++;
    }

    if (DRY_RUN && changed) {
      process.stdout.write(`  [${category.toUpperCase()}] ${rel}\n`);
    }
  }

  console.log('\n--- Category Counts ---');
  console.log(`  Edmonton pages (migrated):  ${counts.edmonton}`);
  console.log(`  Calgary/AB-other (noindex): ${counts.calgary}`);
  console.log(`  GTA pages (noindex+redir):  ${counts.gta}`);
  console.log(`  Generic pages (strip+foot): ${counts.generic}`);
  console.log(`  Skipped:                    ${counts.skipped}`);

  // Write redirect map
  const redirectMapPath = path.join(BASE, 'redirects-gta-to-nika.json');
  if (!DRY_RUN) {
    fs.writeFileSync(redirectMapPath, JSON.stringify(gtaRedirects, null, 2), 'utf8');
    console.log(`\nWrote ${Object.keys(gtaRedirects).length} GTA→NIKA redirects to redirects-gta-to-nika.json`);
  } else {
    console.log(`\n[DRY-RUN] Would write ${Object.keys(gtaRedirects).length} GTA→NIKA redirects to redirects-gta-to-nika.json`);
  }

  // Write Edmonton URL list for IndexNow
  const edmontonUrlsPath = path.join(BASE, 'edmonton-urls-for-indexnow.json');
  if (!DRY_RUN) {
    fs.writeFileSync(edmontonUrlsPath, JSON.stringify(edmontonUrls, null, 2), 'utf8');
    console.log(`Wrote ${edmontonUrls.length} Edmonton URLs to edmonton-urls-for-indexnow.json`);
  } else {
    console.log(`[DRY-RUN] Would write ${edmontonUrls.length} Edmonton URLs for IndexNow`);
  }

  if (DRY_RUN) {
    console.log('\n[DRY RUN complete — no files written]\n');
  } else {
    console.log('\n[LIVE run complete — files written]\n');
  }
}

main();
