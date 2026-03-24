const fs = require('fs');
const path = require('path');

const dir = 'C:/fixlifyservices';

const replacements = [
  ['color:#374151', 'color:rgba(232,244,253,0.72)'],
  ['color:#0A0A0A', 'color:#E8F4FD'],
  ['color:#111;', 'color:#E8F4FD;'],
  ['color:#1F2937', 'color:rgba(232,244,253,0.85)'],
  ['color:#4B5563', 'color:rgba(232,244,253,0.65)'],
  ['background:#F0F9FF', 'background:rgba(0,194,255,0.06);border:1px solid rgba(0,194,255,0.15)'],
  ['color:#2563EB', 'color:#00C2FF'],
  ['color:#1D4ED8', 'color:#00C2FF'],
];

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const [from, to] of replacements) {
    content = content.split(from).join(to);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
  }
}

console.log(`Done. Modified ${modifiedCount} of ${files.length} HTML files.`);
