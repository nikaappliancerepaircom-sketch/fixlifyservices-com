#!/usr/bin/env node
/**
 * fix-technical-seo.js
 * Fixes canonical tags, OG tags, robots meta, and schema domain on every
 * root *.html file and _pages_queue/*.html for fixlifyservices.com
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://fixlifyservices.com';
const OG_IMAGE = `${DOMAIN}/og-image.jpg`;
const ROOT = path.resolve(__dirname);
const QUEUE_DIR = path.join(ROOT, '_pages_queue');

// Collect all HTML files to process
function collectFiles() {
  const files = [];

  // Root *.html
  for (const f of fs.readdirSync(ROOT)) {
    if (f.endsWith('.html') && !fs.statSync(path.join(ROOT, f)).isDirectory()) {
      files.push({ file: path.join(ROOT, f), dir: 'root' });
    }
  }

  // _pages_queue/*.html
  if (fs.existsSync(QUEUE_DIR)) {
    for (const f of fs.readdirSync(QUEUE_DIR)) {
      if (f.endsWith('.html')) {
        files.push({ file: path.join(QUEUE_DIR, f), dir: 'queue' });
      }
    }
  }

  return files;
}

// Derive canonical URL from filename
function canonicalUrl(filename) {
  const base = path.basename(filename, '.html');
  if (base === 'index') return `${DOMAIN}/`;
  return `${DOMAIN}/${base}`;
}

// Build canonical tag string
function canonicalTag(url) {
  return `<link rel="canonical" href="${url}">`;
}

// Fix wrong-domain canonical or add missing one
function fixCanonical(html, url) {
  // Already has a canonical tag?
  const hasCanonical = /<link\s+rel="canonical"/i.test(html);

  if (hasCanonical) {
    // Fix the href, replacing any domain with our domain
    html = html.replace(
      /(<link\s+rel="canonical"\s+href=")([^"]*?)(")/gi,
      (match, pre, href, post) => {
        // Replace domain portion only
        const fixed = href.replace(/^https?:\/\/[^/]+/, DOMAIN);
        return `${pre}${fixed}${post}`;
      }
    );
  } else {
    // Insert after <meta charset line or as first tag inside <head>
    if (/<meta\s+charset/i.test(html)) {
      html = html.replace(
        /(<meta\s+charset[^>]*>)/i,
        `$1\n${canonicalTag(url)}`
      );
    } else {
      html = html.replace(/<head>/i, `<head>\n${canonicalTag(url)}`);
    }
  }

  return html;
}

// Fix or add OG tags
function fixOgTags(html, canonUrl, is404) {
  if (is404) return html; // skip 404

  // Helper: does a property exist?
  const hasOg = (prop) =>
    new RegExp(`property="og:${prop}"`, 'i').test(html);

  // Fix wrong og:url domain
  if (hasOg('url')) {
    html = html.replace(
      /(<meta\s+property="og:url"\s+content=")([^"]*?)(")/gi,
      (match, pre, href, post) => {
        const fixed = href.replace(/^https?:\/\/[^/]+/, DOMAIN);
        return `${pre}${fixed}${post}`;
      }
    );
  }

  // Collect missing tags to inject
  const missing = [];

  if (!hasOg('url')) {
    missing.push(`<meta property="og:url" content="${canonUrl}">`);
  }
  if (!hasOg('type')) {
    missing.push(`<meta property="og:type" content="website">`);
  }
  if (!hasOg('image')) {
    missing.push(`<meta property="og:image" content="${OG_IMAGE}">`);
  }

  // og:title from <title> if missing
  if (!hasOg('title')) {
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const titleVal = titleMatch ? titleMatch[1] : 'Fixlify Appliance Services';
    missing.push(`<meta property="og:title" content="${escapeAttr(titleVal)}">`);
  }

  // og:description from meta description if missing
  if (!hasOg('description')) {
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*?)"/i);
    if (descMatch) {
      missing.push(`<meta property="og:description" content="${descMatch[1]}">`);
    }
  }

  if (missing.length === 0) return html;

  // Insert missing tags — try to place after existing og: block or before </head>
  const ogBlockMatch = html.match(/(<meta\s+property="og:[^"]*"[^>]*>)/gi);
  if (ogBlockMatch) {
    // Insert after the last og: tag
    const lastOg = ogBlockMatch[ogBlockMatch.length - 1];
    const lastOgIdx = html.lastIndexOf(lastOg);
    const insertPos = lastOgIdx + lastOg.length;
    html =
      html.slice(0, insertPos) +
      '\n' +
      missing.join('\n') +
      html.slice(insertPos);
  } else {
    // Insert right before closing </head>
    html = html.replace('</head>', missing.join('\n') + '\n</head>');
  }

  return html;
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// Remove noindex meta (except 404 pages)
function fixRobots(html, is404) {
  if (is404) return html;
  // Remove noindex from robots meta
  html = html.replace(
    /<meta\s+name="robots"\s+content="noindex[^"]*"\s*\/?>/gi,
    ''
  );
  // Also fix combined noindex,follow → index,follow
  html = html.replace(
    /(<meta\s+name="robots"\s+content=")([^"]*noindex[^"]*)(")/gi,
    (match, pre, content, post) => {
      const fixed = content.replace(/noindex\s*,?\s*/gi, 'index,');
      return `${pre}${fixed}${post}`;
    }
  );
  return html;
}

// Fix wrong domains in JSON-LD
function fixSchemaDomain(html) {
  // Replace other domain URLs with fixlifyservices.com inside JSON-LD script blocks
  const wrongDomains = [
    'nikaappliancerepair.com',
    'nappliancerepair.com',
    'appliancerepairneary.com',
  ];

  // Process each <script type="application/ld+json">...</script> block
  html = html.replace(
    /(<script\s+type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/gi,
    (match, open, json, close) => {
      let fixed = json;
      for (const wrong of wrongDomains) {
        // Replace https://wrong.com and http://wrong.com
        fixed = fixed.replace(
          new RegExp(`https?://${wrong.replace(/\./g, '\\.')}`, 'g'),
          DOMAIN
        );
      }
      return `${open}${fixed}${close}`;
    }
  );

  return html;
}

// Main processor
function processFile(filePath, is404 = false) {
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  const url = canonicalUrl(filePath);

  html = fixCanonical(html, url);
  html = fixOgTags(html, url, is404);
  html = fixRobots(html, is404);
  html = fixSchemaDomain(html);

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    return true; // changed
  }
  return false; // unchanged
}

// Run
let changed = 0;
let total = 0;

const files = collectFiles();

for (const { file } of files) {
  total++;
  const basename = path.basename(file);
  const is404 = basename === '404.html';

  const wasChanged = processFile(file, is404);
  if (wasChanged) {
    changed++;
    console.log(`  FIXED: ${file.replace(ROOT, '').replace(/\\/g, '/')}`);
  }
}

console.log(`\nDone. ${changed}/${total} files updated.`);
