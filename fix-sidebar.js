const fs = require('fs');
const path = require('path');
const dir = 'C:/fixlifyservices';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;

for (const f of files) {
  const fp = path.join(dir, f);
  let html = fs.readFileSync(fp, 'utf8');
  if (!html.includes('sidebar-book-iframe')) continue;
  
  const orig = html;
  
  // 1. Increase sidebar iframe height
  html = html.replace(
    /\.sidebar-book-iframe\s*\{\s*height:\s*380px;?\s*\}/g,
    '.sidebar-book-iframe {\n  height: 540px;\n  overflow-y: auto;\n}'
  );
  
  // 2. Mobile height increase
  html = html.replace(
    /\.sidebar-book-iframe\s*\{\s*height:\s*340px;?\s*\}/g,
    '.sidebar-book-iframe { height: 460px; overflow-y: auto; }'
  );
  
  // 3. Make sidebar-book-card not clip content
  html = html.replace(
    /\.sidebar-book-card\s*\{([^}]*)overflow:\s*hidden;/g,
    '.sidebar-book-card {$1overflow: visible;'
  );
  
  // 4. Make content-sidebar scrollable in viewport
  html = html.replace(
    /\.content-sidebar\s*\{([^}]*position:\s*sticky;[^}]*)\}/g,
    (match, inner) => {
      if (inner.includes('max-height')) return match;
      return `.content-sidebar {${inner}  max-height: calc(100vh - 110px);\n  overflow-y: auto;\n}`;
    }
  );
  
  if (html !== orig) {
    fs.writeFileSync(fp, html);
    count++;
  }
}

console.log(`Fixed ${count} files`);
