/**
 * IndexNow ping — fixlifyservices.com sitemap top 200 URLs
 *
 * Usage:
 *   node indexnow-sitemap-ping.js
 *
 * Reads sitemap-published.json, takes top 200 URLs (highest priority),
 * sends to IndexNow API in batches of 100.
 *
 * IndexNow key: fixlify2026indexnow
 * Key file: https://fixlifyservices.com/fixlify2026indexnow.txt
 * Endpoint: https://api.indexnow.org/indexnow
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const INDEXNOW_KEY = 'fixlify2026indexnow';
const HOST = 'fixlifyservices.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const ENDPOINT_HOST = 'api.indexnow.org';
const ENDPOINT_PATH = '/indexnow';
const BATCH_SIZE = 100;
const MAX_URLS = 200;

function pingBatch(urls) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    });

    const options = {
      hostname: ENDPOINT_HOST,
      path: ENDPOINT_PATH,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({ status: res.statusCode, body: data.trim() });
      });
    });

    req.on('error', (e) => {
      resolve({ status: 'ERR', body: e.message });
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  const sitemapPath = path.join(__dirname, 'sitemap-published.json');
  const sitemap = JSON.parse(fs.readFileSync(sitemapPath, 'utf8'));

  // sitemap-published.json is sorted by priority already — take first MAX_URLS
  const topUrls = sitemap.slice(0, MAX_URLS).map((entry) => entry.url);

  console.log('IndexNow Ping — fixlifyservices.com');
  console.log('Key:', INDEXNOW_KEY);
  console.log('Key location:', KEY_LOCATION);
  console.log(`Total URLs to ping: ${topUrls.length} (from ${sitemap.length} in sitemap)`);
  console.log('');

  // Split into batches of BATCH_SIZE
  const batches = [];
  for (let i = 0; i < topUrls.length; i += BATCH_SIZE) {
    batches.push(topUrls.slice(i, i + BATCH_SIZE));
  }

  let totalPinged = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`Batch ${i + 1}/${batches.length} — ${batch.length} URLs`);
    batch.forEach((u) => console.log('  ' + u));

    const result = await pingBatch(batch);
    const ok = result.status === 200 || result.status === 202;
    console.log(`  -> Status: ${result.status} ${ok ? '[OK]' : '[CHECK]'}`);
    if (result.body) console.log(`  -> Response: ${result.body}`);
    if (ok) totalPinged += batch.length;
    console.log('');

    // Small delay between batches to be polite
    if (i < batches.length - 1) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  console.log(`Done. Pinged ${totalPinged}/${topUrls.length} URLs successfully.`);
  console.log('Note: 200 = immediate, 202 = accepted for batch. Both are success.');
  console.log('Search engines will crawl within 24-48 hours.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
