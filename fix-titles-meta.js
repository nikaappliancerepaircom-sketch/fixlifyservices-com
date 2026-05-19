#!/usr/bin/env node
/**
 * fix-titles-meta.js v2
 * Fixes title length (removes " | From $65") and meta desc length (shortens end)
 * on Edmonton neighborhood service pages on fixlifyservices.com
 *
 * Handles both original files and files already partially fixed by v1
 */

const fs = require('fs');
const path = require('path');

const DIR = path.resolve(__dirname);

// File name patterns to match
const SERVICE_PATTERN = /^(dishwasher|washer|fridge)-repair-/;
const BRAND_PATTERN = /^(lg|samsung|whirlpool|bosch|ge|frigidaire|kenmore|maytag|kitchenaid|electrolux)-repair-/;

let processed = 0;
let skipped = 0;
let errors = [];
let titleFixed = 0;
let descFixed = 0;
let noTitleMatch = 0;
let noDescMatch = 0;

function fixTitle(content) {
  // Remove " | From $65" from <title>, og:title, twitter:title
  // Pattern handles: | From $65 | Same-Day Service  OR  | From $65 (at end)
  const re = /(\s*\|\s*From \$65)(\s*(?=\s*\||\s*"))/g;
  if (re.test(content)) {
    return content.replace(/(\s*\|\s*From \$65)/g, '');
  }
  return null;
}

function fixDesc(content) {
  // Handle two cases:
  // Case A: original — ends with "Book online or email edmonton@fixlifyservices.com."
  // Case B: partially fixed v1 — ends with "., or email us" (broken grammar)
  // Case C: partially fixed v1 — ends with ". Book online." (correct, skip)

  // Case A: original not yet fixed
  const origRe = /(<meta\s+(?:name="description"|property="og:description")\s+content=")([^"]*?)\s*Book online or email edmonton@fixlifyservices\.com\.(")/;
  
  // Case B: broken v1 fix — period then ", or email us"
  const brokenRe = /(<meta\s+(?:name="description"|property="og:description")\s+content=")([^"]*?)\.,\s*or email us(")/;

  let changed = false;

  // Process all meta description tags (name and og)
  const tags = [
    /(<meta\s+name="description"\s+content=")([^"]*?)(\s*Book online or email edmonton@fixlifyservices\.com\.)(")/,
    /(<meta\s+property="og:description"\s+content=")([^"]*?)(\s*Book online or email edmonton@fixlifyservices\.com\.)(")/,
    // Case B broken fix
    /(<meta\s+name="description"\s+content=")([^"]*?)(\.,\s*or email us)(")/,
    /(<meta\s+property="og:description"\s+content=")([^"]*?)(\.,\s*or email us)(")/,
  ];

  for (const re of tags) {
    const m = re.exec(content);
    if (!m) continue;

    const prefix = m[1];
    const body = m[2]; // text before the old ending
    const suffix = m[4];

    // body ends cleanly (no trailing period or comma in case A; has period from "All major brands." in case B)
    // Normalize: strip trailing period and spaces from body
    const cleanBody = body.replace(/[.,\s]+$/, '');

    // Build candidate with "Book online."
    const shortCandidate = cleanBody + '. Book online.';
    
    let finalDesc;
    if (shortCandidate.length >= 140) {
      finalDesc = shortCandidate;
    } else {
      // Need to keep more. Add "or email us" properly
      finalDesc = cleanBody + '. Book online or email us.';
    }

    // Replace the match
    const newContent = content.slice(0, m.index) + prefix + finalDesc + suffix + content.slice(m.index + m[0].length);
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
  }

  return changed ? content : null;
}

// Get all HTML files in directory
const files = fs.readdirSync(DIR).filter(function(f) {
  if (!f.endsWith('.html')) return false;
  return SERVICE_PATTERN.test(f) || BRAND_PATTERN.test(f);
});

console.log('Found ' + files.length + ' matching HTML files to process\n');

for (const file of files) {
  const filePath = path.join(DIR, file);
  let content;

  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    errors.push('READ ERROR: ' + file + ' - ' + e.message);
    continue;
  }

  let modified = false;

  // Fix titles (remove | From $65)
  const titleResult = fixTitle(content);
  if (titleResult !== null) {
    content = titleResult;
    titleFixed++;
    modified = true;
  } else {
    noTitleMatch++;
  }

  // Fix descriptions
  const descResult = fixDesc(content);
  if (descResult !== null) {
    content = descResult;
    descFixed++;
    modified = true;
  } else {
    noDescMatch++;
  }

  // Save if modified
  if (modified) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      processed++;
    } catch (e) {
      errors.push('WRITE ERROR: ' + file + ' - ' + e.message);
    }
  } else {
    skipped++;
  }
}

console.log('=== RESULTS ===');
console.log('Total files matched:   ' + files.length);
console.log('Files modified:        ' + processed);
console.log('Files skipped (no-op): ' + skipped);
console.log('Titles fixed:          ' + titleFixed);
console.log('Descs fixed:           ' + descFixed);
console.log('No title match:        ' + noTitleMatch);
console.log('No desc match:         ' + noDescMatch);

if (errors.length > 0) {
  console.log('\nERRORS (' + errors.length + '):');
  errors.forEach(function(e) { console.log('  ' + e); });
} else {
  console.log('\nNo errors.');
}
