const fs = require('fs');

const CSS_MATCH = fs.readFileSync('C:/fixlifyservices/gen-batch19.js', 'utf8');
const cssStart = CSS_MATCH.indexOf('const CSS = `') + 13;
const cssEnd = CSS_MATCH.indexOf('`;\n\nfunction makeProblems');
const CSS = CSS_MATCH.slice(cssStart, cssEnd);

const n = {
  slug: 'lauderdale',
  display: 'Lauderdale',
  region: 'north Edmonton',
  era: '1960s',
  travel: '16-20 min via 97 Street NW north to 137 Avenue'
};

function makeProblems(svc) {
  if (svc === 'washer') return '<div class="problem-card"><div class="problem-name">Not spinning / drum stuck</div><div class="problem-desc">Drive belt or motor coupling failure. OEM parts on truck for same-day repair.</div></div><div class="problem-card"><div class="problem-name">Not draining / flooded tub</div><div class="problem-desc">Drain pump blockage or failure. OEM pump assemblies same-day.</div></div><div class="problem-card"><div class="problem-name">Loud banging / vibrating</div><div class="problem-desc">Worn drum bearings or loose counterweights. Bearing replacement stops noise.</div></div><div class="problem-card"><div class="problem-name">Not filling with water</div><div class="problem-desc">Inlet valve failure or pressure switch fault. Quick OEM replacement same-day.</div></div><div class="problem-card"><div class="problem-name">Error codes / control board</div><div class="problem-desc">Samsung, LG, Bosch front-loaders. Diagnostic tools for all major platforms.</div></div><div class="problem-card"><div class="problem-name">Door latch (front-loader)</div><div class="problem-desc">Front-load door interlock failure. OEM latch assembly replaced same-day.</div></div>';
  return '<div class="problem-card"><div class="problem-name">Not cooling / warm fridge</div><div class="problem-desc">Compressor, thermostat, or refrigerant issue. Same-day diagnosis.</div></div><div class="problem-card"><div class="problem-name">Excessive frost buildup</div><div class="problem-desc">Defrost heater or thermostat failure. OEM replacement prevents ice-over.</div></div><div class="problem-card"><div class="problem-name">Water leaking onto floor</div><div class="problem-desc">Defrost drain blockage or door gasket failure. Same-day repair.</div></div><div class="problem-card"><div class="problem-name">Ice maker not working</div><div class="problem-desc">Inlet valve, module, or auger motor. OEM parts for Samsung, LG, Whirlpool.</div></div><div class="problem-card"><div class="problem-name">Loud compressor noise</div><div class="problem-desc">Start relay or compressor wear. Assess repair-vs-replace before work.</div></div><div class="problem-card"><div class="problem-name">Door gasket / seal failure</div><div class="problem-desc">Worn gasket raises humidity and energy use. OEM replacement same-day.</div></div>';
}

function makePricing(svc) {
  if (svc === 'washer') return '<tr><td>Drain pump replacement</td><td>$160&ndash;$280</td></tr><tr><td>Drive belt / motor coupling</td><td>$130&ndash;$220</td></tr><tr><td>Drum bearing replacement</td><td>$220&ndash;$380</td></tr><tr><td>Inlet valve replacement</td><td>$120&ndash;$200</td></tr><tr><td>Control board</td><td>$250&ndash;$430</td></tr><tr><td>Door latch (front-load)</td><td>$130&ndash;$220</td></tr>';
  return '<tr><td>Thermostat / temperature sensor</td><td>$140&ndash;$240</td></tr><tr><td>Defrost heater replacement</td><td>$160&ndash;$280</td></tr><tr><td>Compressor start relay</td><td>$120&ndash;$200</td></tr><tr><td>Water inlet valve (ice maker)</td><td>$130&ndash;$220</td></tr><tr><td>Door gasket replacement</td><td>$150&ndash;$260</td></tr><tr><td>Control board</td><td>$260&ndash;$440</td></tr>';
}

for (const svc of ['washer', 'fridge']) {
  const title = svc === 'washer' ? 'Washer Repair' : 'Fridge Repair';
  const prefix = svc === 'washer' ? 'washer-repair' : 'fridge-repair';
  const hub = svc === 'washer' ? 'washer-repair-edmonton' : 'fridge-repair-edmonton';
  const hubLabel = svc === 'washer' ? 'Washer Repair Edmonton' : 'Fridge Repair Edmonton';
  const cost = svc === 'washer' ? '$130-$390' : '$140-$420';
  const id = svc.charAt(0) + '-lauderdale';
  const applWord = svc === 'washer' ? 'washers' : 'fridges';
  const other = svc === 'washer' ? 'fridge-repair-lauderdale' : 'washer-repair-lauderdale';
  const otherL = svc === 'washer' ? 'Fridge Repair' : 'Washer Repair';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} Lauderdale Edmonton | Fixlify</title>
<meta name="description" content="${title} in Lauderdale, Edmonton — same-day service, flat $65 diagnostic, 90-day warranty. All brands. Book online or email edmonton@fixlifyservices.com.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://fixlifyservices.com/${prefix}-lauderdale">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/tokens.css">
<style>${CSS}</style>
<meta property="og:type" content="website">
<meta property="og:title" content="${title} Lauderdale Edmonton | Fixlify">
<meta property="og:description" content="Same-day ${title.toLowerCase()} in Lauderdale, Edmonton. From $65 diagnostic, 90-day warranty.">
<meta property="og:url" content="https://fixlifyservices.com/${prefix}-lauderdale">
<meta property="og:site_name" content="Fixlify Appliance Services">
<meta property="og:image" content="https://fixlifyservices.com/og-image.jpg">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"ProfessionalService","@id":"https://fixlifyservices.com/${prefix}-lauderdale#business","name":"${title} in Lauderdale, Edmonton","description":"${title} in Lauderdale, Edmonton. Same-day service, $65 diagnostic, 90-day warranty.","url":"https://fixlifyservices.com/${prefix}-lauderdale","priceRange":"$","address":{"@type":"PostalAddress","streetAddress":"10025 102A Avenue NW Suite 1000","addressLocality":"Edmonton","addressRegion":"AB","postalCode":"T5J 2Z2","addressCountry":"CA"},"areaServed":[{"@type":"City","name":"Edmonton"},{"@type":"Neighborhood","name":"Lauderdale"}],"serviceType":"${title}"}
<\/script>
</head>
<body>
<div id="header-placeholder"></div>
<script src="/includes/header-loader.js" defer><\/script>
<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="container"><a href="/">Home</a><span class="breadcrumb-sep">/</span><a href="/${hub}">${hubLabel}</a><span class="breadcrumb-sep">/</span><span class="breadcrumb-current">Lauderdale</span></div>
</nav>
<section class="page-hero" aria-label="Page header">
  <div class="container">
    <div class="page-hero-eyebrow">Fixlify Appliance Services &middot; Lauderdale, Edmonton</div>
    <h1 class="page-h1">${title} in Lauderdale, Edmonton</h1>
    <div class="answer-box">Fixlify provides same-day ${title.toLowerCase()} in Lauderdale, Edmonton. We fix all brands &mdash; Whirlpool, GE, Frigidaire, Maytag, Bosch. ${cost} CAD typical cost, 90-day warranty. Book online or email edmonton@fixlifyservices.com.</div>
    <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="btn-secondary" target="_blank" rel="noopener">Book Online &rarr;</a></div>
  </div>
</section>
<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem 1.25rem;margin:1rem auto;max-width:900px;border-radius:0 8px 8px 0">
  <div style="font-size:.7rem;font-weight:700;letter-spacing:.08em;color:#2563eb;text-transform:uppercase;margin-bottom:.4rem">Quick Answer</div>
  <p style="margin:0;color:#1e3a5f;font-size:.9rem;line-height:1.6">Fixlify provides same-day ${title.toLowerCase()} in Lauderdale, Edmonton &mdash; 7 days a week. ${cost} CAD typical cost. Whirlpool, GE, Frigidaire. 90-day parts &amp; labour warranty.</p>
</div>
<div class="trust-bar"><div class="trust-bar-inner"><div class="trust-item">&#128176; $65 flat diagnostic</div><div class="trust-item">&#10003; No Hidden Fees</div><div class="trust-item">&#9873; Same-Day Service</div><div class="trust-item">&#128737; 90-Day Warranty</div></div></div>
<main class="page-main container" id="main-content">
  <div class="fade-in" style="max-width:760px;font-size:1.0625rem;color:#374151;line-height:1.75;margin-bottom:56px">
    <h2 style="font-size:1.375rem;font-weight:700;color:#0a0a0a;margin-bottom:16px">${title} in Lauderdale &mdash; 1960s north Edmonton</h2>
    <p>Who fixes ${applWord} in Lauderdale? <strong>Fixlify Appliance Services Edmonton</strong> &mdash; same-day ${title.toLowerCase()} throughout Lauderdale and surrounding communities. Book online or email <a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a>. Flat <strong>$65 diagnostic</strong>, Mon&ndash;Sat 8AM&ndash;8PM, Sun 10AM&ndash;6PM Mountain Time. Typical cost: <strong>${cost} CAD</strong>. <strong>90-day warranty</strong> on every repair.</p>
    <p>Lauderdale is a 1960s working-class north Edmonton neighbourhood, bounded by 127 Avenue and 137 Avenue between 97 Street and the CN rail corridor. Post-war bungalows and side-splits were built for the city's industrial workforce with practical kitchens updated in the 1990s and 2000s. EPCOR water hardness of 170-200 mg/L accelerates appliance wear across the neighbourhood. Our technicians reach Lauderdale in approximately 16-20 minutes from our 102A Avenue hub via 97 Street NW north. Residents appreciate upfront pricing and same-day availability for most weekday bookings.</p>
    <p>Our Edmonton hub at 10025 102A Avenue NW dispatches to Lauderdale in approximately ${n.travel}. Edmonton's EPCOR water runs at 170&ndash;200 mg/L hardness &mdash; among the highest in Alberta &mdash; which accelerates mineral scale and component wear in all household appliances.</p>
  </div>
  <section style="padding:48px 0;border-top:1px solid #e5e7eb">
    <div class="section-label">Common issues</div>
    <h2 class="section-title">Common Lauderdale ${title} Problems</h2>
    <p style="max-width:760px;color:#374151;line-height:1.7;margin-bottom:24px">The ${svc} faults we diagnose most frequently in Lauderdale, weighted toward the Whirlpool, GE, Frigidaire, Maytag, Bosch appliance profile.</p>
    <div class="problems-grid">${makeProblems(svc)}</div>
  </section>
  <section style="margin-top:48px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Brand expertise</div>
    <h2 class="section-title">${title} Brands We Service in Lauderdale</h2>
    <div style="display:flex;flex-wrap:wrap;gap:8px;max-width:880px"><span class="brand-chip">Whirlpool</span><span class="brand-chip">GE</span><span class="brand-chip">Frigidaire</span><span class="brand-chip">Maytag</span><span class="brand-chip">Bosch</span><span class="brand-chip">Samsung</span><span class="brand-chip">LG</span></div>
  </section>
  <section style="margin-top:56px">
    <div class="section-label">Transparent pricing</div>
    <h2 class="section-title">${title} Pricing in Lauderdale</h2>
    <p style="max-width:760px;color:#374151;line-height:1.7;margin-bottom:20px">All Lauderdale repairs start with a flat <strong>$65 diagnostic</strong>, waived when you proceed with the repair. Written quote before any work begins.</p>
    <table class="pricing-table" style="max-width:760px">
      <thead><tr><th>Repair type</th><th>Typical range (parts + labour)</th></tr></thead>
      <tbody>
        <tr><td>Diagnostic visit (waived with repair)</td><td>$65</td></tr>
        ${makePricing(svc)}
      </tbody>
    </table>
    <p style="font-size:.8125rem;color:#6b7280;margin-top:12px">All prices include parts, labour, and a <strong>90-day warranty</strong>.</p>
  </section>
  <section class="fade-in" style="margin-top:56px;padding:56px 0;border-top:1px solid #e5e7eb;text-align:center">
    <div class="section-label">Online booking</div>
    <h2 style="font-size:1.75rem;font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:12px">Book ${title} in Lauderdale</h2>
    <p style="color:#6b7280;margin-bottom:24px">Real-time availability, instant confirmation.</p>
    <iframe id="fxbk-${id}" src="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce?embed=true" style="width:100%;height:600px;border:none;display:block" title="Book a Service" loading="lazy" allowtransparency="true"></iframe>
    <script>window.addEventListener('message',function(e){if(e.data&&e.data.type==='fixlify-resize'){var el=document.getElementById('fxbk-${id}');if(el)el.style.height=e.data.height+'px'}});<\/script>
    <p style="font-size:.9375rem;color:#6b7280;margin-top:16px">Prefer email? <a href="mailto:edmonton@fixlifyservices.com" style="color:#2563eb;font-weight:600">edmonton@fixlifyservices.com</a></p>
  </section>
  <section style="padding:56px 0;border-top:1px solid #e5e7eb">
    <h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:32px">FAQ &mdash; ${title} in Lauderdale</h2>
    <details class="faq-item"><summary class="faq-question"><span>How fast can you reach Lauderdale?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Approximately 16-20 min via 97 Street NW north to 137 Avenue. Same-day service when you book before 12 PM Monday&ndash;Saturday. Sunday crew available 10 AM&ndash;6 PM Mountain Time.</p></div></details>
    <details class="faq-item"><summary class="faq-question"><span>How much does ${title.toLowerCase()} cost in Lauderdale?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Typical ${title.toLowerCase()} in Lauderdale runs ${cost} CAD including parts and labour. Flat $65 diagnostic waived when you proceed with the repair. Written quote before any work begins. 90-day parts and labour warranty.</p></div></details>
    <details class="faq-item"><summary class="faq-question"><span>Do you service all ${svc} brands in Lauderdale?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Yes &mdash; we service Whirlpool, GE, Frigidaire, Maytag, Bosch, Samsung, and LG. Written quote before any work begins.</p></div></details>
  </section>
  <section style="margin-top:56px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Other Lauderdale services</div>
    <h2 class="section-title">Other Appliance Repair in Lauderdale</h2>
    <div class="related-grid">
      <a href="/dishwasher-repair-lauderdale" class="related-link">Dishwasher Repair &mdash; Lauderdale</a>
      <a href="/${other}" class="related-link">${otherL} &mdash; Lauderdale</a>
      <a href="/${hub}" class="related-link">${hubLabel}</a>
    </div>
  </section>
  <section style="margin-top:56px;padding:40px;background:#0a0a0a;border-radius:8px;text-align:center;color:#fff">
    <h2 style="font-size:1.75rem;font-weight:700;color:#fff;margin-bottom:12px">Ready to book ${title.toLowerCase()} in Lauderdale?</h2>
    <p style="color:rgba(255,255,255,.8);margin-bottom:24px;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.6">Same-day service, $65 flat diagnostic, written quote before any work, 90-day warranty.</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="btn-primary" target="_blank" rel="noopener">Book Online &rarr;</a>
      <a href="mailto:edmonton@fixlifyservices.com" class="btn-secondary">Email Edmonton Team</a>
    </div>
  </section>
</main>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How fast can you reach Lauderdale?","acceptedAnswer":{"@type":"Answer","text":"Approximately 16-20 min via 97 Street NW north. Same-day service when booking before 12 PM Monday-Saturday."}},{"@type":"Question","name":"How much does ${title.toLowerCase()} cost in Lauderdale?","acceptedAnswer":{"@type":"Answer","text":"Typical ${title.toLowerCase()} in Lauderdale runs ${cost} CAD. Flat $65 diagnostic waived with repair. 90-day warranty."}}]}
<\/script>
<footer class="fx-footer" role="contentinfo"><div class="fx-footer-inner">
  <div class="fx-footer-cta-strip"><div class="fx-footer-cta-content"><div class="fx-footer-cta-text"><span class="fx-footer-cta-label">Edmonton Appliance Repair</span><p>Book online &mdash; Lauderdale and all Edmonton CMA.</p></div><div class="fx-footer-cta-btns"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="fx-footer-btn-book" rel="noopener">Book Online Now</a><a href="mailto:edmonton@fixlifyservices.com" class="fx-footer-btn-call">edmonton@fixlifyservices.com</a></div></div></div>
  <div class="fx-footer-columns">
    <div class="fx-footer-col fx-footer-brand"><div class="fx-footer-logo"><div class="fx-footer-logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg></div><span class="fx-footer-logo-name">Fixlify</span></div><p class="fx-footer-desc">Edmonton Appliance Repair. Lauderdale and all Edmonton CMA communities.</p><address class="fx-footer-address" style="font-style:normal;margin:14px 0">10025 102A Avenue NW, Suite 1000<br>Edmonton, AB T5J 2Z2</address><div class="fx-footer-hours"><strong>Service Hours (Mountain Time)</strong><span>Monday&ndash;Saturday: 8 AM &ndash; 8 PM</span><span>Sunday: 10 AM &ndash; 6 PM</span></div></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Services</h4><ul class="fx-footer-list"><li><a href="/services/refrigerator-repair-edmonton/">Fridge Repair Edmonton</a></li><li><a href="/services/washer-repair-edmonton/">Washer Repair Edmonton</a></li><li><a href="/services/dishwasher-repair-edmonton/">Dishwasher Repair Edmonton</a></li></ul></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Neighbourhoods</h4><ul class="fx-footer-list"><li><a href="/${prefix}-lauderdale">Lauderdale</a></li><li><a href="/dishwasher-repair-calder">Calder</a></li><li><a href="/${hub}">${hubLabel}</a></li></ul></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Quick Links</h4><ul class="fx-footer-list"><li><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" rel="noopener">Book Online</a></li><li><a href="/about/">About Us</a></li><li><a href="/sitemap.xml">Sitemap</a></li></ul><h4 class="fx-footer-heading" style="margin-top:24px">Contact</h4><ul class="fx-footer-list"><li><a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a></li></ul></div>
  </div>
  <div class="fx-footer-bottom"><p class="fx-copyright">&copy; <span id="fx-yr-${id}"></span> Fixlify Appliance Repair Edmonton | Lauderdale | Online Booking Available</p></div>
</div></footer>
<script>(function(){var el=document.getElementById('fx-yr-${id}');if(el)el.textContent=new Date().getFullYear()})();<\/script>
<div class="sticky-cta"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="sticky-btn sticky-book" target="_blank" rel="noopener">Book Online &rarr;</a></div>
<script>document.addEventListener('DOMContentLoaded',function(){var els=document.querySelectorAll('.fade-in');if('IntersectionObserver' in window){var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.1});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('visible')})}});<\/script>
</body>
</html>`;

  fs.writeFileSync('C:/fixlifyservices/' + prefix + '-lauderdale.html', html, 'utf8');
  console.log('wrote ' + prefix + '-lauderdale.html');
}
