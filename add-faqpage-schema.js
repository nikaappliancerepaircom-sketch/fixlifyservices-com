#!/usr/bin/env node
/**
 * add-faqpage-schema.js
 * Adds FAQPage JSON-LD schema to HTML files that have visible FAQ content
 * but no existing FAQPage schema.
 *
 * Detects two FAQ patterns:
 *   1. details/summary accordion: <span class="faq-q-text">Q</span> + <div class="faq-answer"><p>A</p>
 *   2. VOICE-QA microdata: itemprop="name" inside a Question + itemprop="acceptedAnswer"
 *
 * Requires 2+ Q&A pairs. Skips files that already have "FAQPage".
 */

const fs = require('fs');
const path = require('path');

const SITE_ROOT = 'C:/fixlifyservices';

function getAllHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter(e => e.isFile() && e.name.endsWith('.html'))
    .map(e => path.join(e.parentPath || e.path, e.name));
}

// Files to always skip
const SKIP_BASENAMES = new Set(['index.html', 'about.html', '404.html']);

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripTags(str) {
  return str.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Pattern 1: details/summary accordion
 * <span class="faq-q-text">Q text</span>
 * <div class="faq-answer"><p>A text</p></div>
 */
function extractAccordionFAQs(html) {
  const pairs = [];

  const itemRe = /<details[^>]*class="faq-item"[^>]*>([\s\S]*?)<\/details>/gi;
  let itemMatch;
  while ((itemMatch = itemRe.exec(html)) !== null) {
    const block = itemMatch[1];

    const qMatch = block.match(/<span[^>]*class="faq-q-text"[^>]*>([\s\S]*?)<\/span>/i);
    if (!qMatch) continue;
    const question = decodeHtmlEntities(stripTags(qMatch[1]));
    if (!question) continue;

    const aMatch = block.match(/<div[^>]*class="faq-answer"[^>]*>([\s\S]*?)<\/div>/i);
    if (!aMatch) continue;
    const answer = decodeHtmlEntities(stripTags(aMatch[1]));
    if (!answer) continue;

    pairs.push({ question, answer });
  }

  return pairs;
}

/**
 * Pattern 2: VOICE-QA microdata itemprop="name" / itemprop="acceptedAnswer"
 * <h3 itemprop="name">Q</h3>
 * <p itemprop="acceptedAnswer" ...>A</p>
 */
function extractMicrodataFAQs(html) {
  const pairs = [];

  const questionBlockRe = /itemscope[^>]*itemtype="https:\/\/schema\.org\/Question"[^>]*>([\s\S]*?)(?=<\/div>\s*(?:<div|<\/section)|$)/gi;
  let blockMatch;
  while ((blockMatch = questionBlockRe.exec(html)) !== null) {
    const block = blockMatch[1];

    const qMatch = block.match(/itemprop="name"[^>]*>([\s\S]*?)<\/h[23]>/i);
    if (!qMatch) continue;
    const question = decodeHtmlEntities(stripTags(qMatch[1]));
    if (!question) continue;

    const aMatch = block.match(/itemprop="acceptedAnswer"[^>]*>([\s\S]*?)<\/p>/i);
    if (!aMatch) continue;
    const answer = decodeHtmlEntities(stripTags(aMatch[1]));
    if (!answer) continue;

    pairs.push({ question, answer });
  }

  return pairs;
}

function buildFAQSchema(pairs) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pairs.map(({ question, answer }) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    }))
  };
  return '<script type="application/ld+json">\n' + JSON.stringify(schema, null, 2) + '\n</script>';
}

let added = 0;
let skipped = 0;

const files = getAllHtmlFiles(SITE_ROOT);

for (const filePath of files) {
  const basename = path.basename(filePath);

  if (SKIP_BASENAMES.has(basename)) {
    skipped++;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  if (html.includes('"FAQPage"')) {
    skipped++;
    continue;
  }

  let pairs = extractAccordionFAQs(html);

  if (pairs.length < 2) {
    const microdataPairs = extractMicrodataFAQs(html);
    const seen = new Set(pairs.map(p => p.question));
    for (const p of microdataPairs) {
      if (!seen.has(p.question)) {
        pairs.push(p);
        seen.add(p.question);
      }
    }
  }

  if (pairs.length < 2) {
    console.log('  [SKIP] Less than 2 FAQ pairs found: ' + path.relative(SITE_ROOT, filePath));
    skipped++;
    continue;
  }

  if (!html.includes('</head>')) {
    console.warn('  [SKIP] No </head> tag: ' + path.relative(SITE_ROOT, filePath));
    skipped++;
    continue;
  }

  const schemaBlock = buildFAQSchema(pairs);
  const updated = html.replace('</head>', schemaBlock + '\n</head>');
  fs.writeFileSync(filePath, updated, 'utf8');
  added++;
  console.log('  [OK] FAQPage (' + pairs.length + ' Q&As) added: ' + path.relative(SITE_ROOT, filePath));
}

console.log('\nDone. FAQPage schema added to ' + added + ' files. Skipped: ' + skipped + '.');
