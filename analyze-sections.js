const fs = require('fs');
const html = fs.readFileSync('dishwasher-installation-brampton.html', 'utf8');

// Extract text between two H2s
const h2matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
h2matches.forEach((m, i) => {
  const title = m[1].replace(/<[^>]+>/g, '').trim();
  const start = m.index;
  const end = i + 1 < h2matches.length ? h2matches[i+1].index : start + 3000;
  const section = html.slice(start, end);
  const text = section.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(w => w.length > 3).length;

  // Show first 300 chars of HTML
  console.log('\n=== [' + words + 'w] ' + title + ' ===');
  console.log('HTML start: ' + section.slice(0, 200).replace(/\n/g, '\\n'));
});
