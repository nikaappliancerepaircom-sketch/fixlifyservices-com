#!/usr/bin/env node
/**
 * add-breadcrumb.js
 * Adds BreadcrumbList JSON-LD schema to all eligible HTML files in fixlifyservices.
 * Skips: index.html, about.html, 404.html, files already containing "BreadcrumbList"
 */

const fs = require('fs');
const path = require('path');

const SITE_ROOT = 'C:/fixlifyservices';
const BASE_URL = 'https://fixlifyservices.com';

function getAllHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter(e => e.isFile() && e.name.endsWith('.html'))
    .map(e => path.join(e.parentPath || e.path, e.name));
}

// Files to skip (basename match)
const SKIP_BASENAMES = new Set(['index.html', 'about.html', '404.html']);

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) return null;
  return match[1].replace(/\s+/g, ' ').trim();
}

function buildBreadcrumb(title, slug) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${BASE_URL}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": `${BASE_URL}/${slug}`
      }
    ]
  };
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

function getSlug(filePath) {
  // Get path relative to SITE_ROOT, strip leading slash, strip .html
  const rel = path.relative(SITE_ROOT, filePath).replace(/\\/g, '/');
  return rel.replace(/\.html$/, '');
}

let added = 0;
let skipped = 0;

const files = getAllHtmlFiles(SITE_ROOT);

for (const filePath of files) {
  const basename = path.basename(filePath);

  // Skip excluded filenames
  if (SKIP_BASENAMES.has(basename)) {
    skipped++;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // Skip if already has BreadcrumbList
  if (html.includes('"BreadcrumbList"')) {
    skipped++;
    continue;
  }

  // Extract title
  const title = extractTitle(html);
  if (!title) {
    console.warn(`  [SKIP] No <title> found: ${path.relative(SITE_ROOT, filePath)}`);
    skipped++;
    continue;
  }

  // Build slug
  const slug = getSlug(filePath);

  // Build schema block
  const schemaBlock = buildBreadcrumb(title, slug);

  // Inject just before </head>
  if (!html.includes('</head>')) {
    console.warn(`  [SKIP] No </head> tag: ${path.relative(SITE_ROOT, filePath)}`);
    skipped++;
    continue;
  }

  const updated = html.replace('</head>', `${schemaBlock}\n</head>`);
  fs.writeFileSync(filePath, updated, 'utf8');
  added++;
  console.log(`  [OK] BreadcrumbList added: ${path.relative(SITE_ROOT, filePath)}`);
}

console.log(`\nDone. BreadcrumbList added to ${added} files. Skipped: ${skipped}.`);
