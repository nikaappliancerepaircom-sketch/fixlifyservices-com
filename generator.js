/**
 * Fixlify Services — Programmatic Page Generator
 * Generates ~94 HTML pages from service-template.html
 * Node.js only, no npm packages required.
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// DATA
// ============================================================

const CITIES_TOP10 = [
  {name:"Toronto",slug:"toronto",region:"GTA"},
  {name:"Mississauga",slug:"mississauga",region:"Peel Region"},
  {name:"Brampton",slug:"brampton",region:"Peel Region"},
  {name:"Scarborough",slug:"scarborough",region:"East Toronto"},
  {name:"North York",slug:"north-york",region:"North Toronto"},
  {name:"Etobicoke",slug:"etobicoke",region:"West Toronto"},
  {name:"Vaughan",slug:"vaughan",region:"York Region"},
  {name:"Richmond Hill",slug:"richmond-hill",region:"York Region"},
  {name:"Markham",slug:"markham",region:"York Region"},
  {name:"Oakville",slug:"oakville",region:"Halton Region"}
];

const SERVICES = [
  {name:"Refrigerator",slug:"fridge",price:"$150–$400",priceNote:"Includes diagnosis, parts, and labor",issues:[
    {problem:"Fridge Not Cooling",cause:"Dirty condenser coils or faulty compressor",fix:"Clean coils or replace compressor",cost:"$180–$350"},
    {problem:"Water Leaking",cause:"Clogged defrost drain or door seal failure",fix:"Clear drain or replace gasket",cost:"$100–$200"},
    {problem:"Ice Maker Not Working",cause:"Frozen fill tube or faulty ice maker module",fix:"Defrost and repair ice maker",cost:"$150–$280"},
    {problem:"Making Noise",cause:"Faulty evaporator fan or condenser fan",fix:"Replace fan motor",cost:"$120–$220"},
    {problem:"Freezer Not Freezing",cause:"Defrost system failure or refrigerant leak",fix:"Repair defrost system",cost:"$200–$400"}
  ]},
  {name:"Washer",slug:"washer",price:"$120–$350",priceNote:"Includes diagnosis, parts, and labor",issues:[
    {problem:"Not Draining",cause:"Clogged pump filter or faulty drain pump",fix:"Clean filter or replace pump",cost:"$100–$200"},
    {problem:"Not Spinning",cause:"Worn drive belt or faulty lid switch",fix:"Replace belt or switch",cost:"$80–$180"},
    {problem:"Leaking",cause:"Damaged door seal or loose hose connection",fix:"Replace seal or tighten hoses",cost:"$90–$200"},
    {problem:"Making Noise",cause:"Worn drum bearings or foreign object",fix:"Replace bearings or remove obstruction",cost:"$150–$300"},
    {problem:"Not Starting",cause:"Faulty control board or lid switch",fix:"Replace control board",cost:"$120–$280"}
  ]},
  {name:"Dryer",slug:"dryer",price:"$100–$300",priceNote:"Includes diagnosis, parts, and labor",issues:[
    {problem:"Not Heating",cause:"Blown thermal fuse or faulty heating element",fix:"Replace thermal fuse or element",cost:"$80–$200"},
    {problem:"Not Spinning",cause:"Broken drive belt or seized drum rollers",fix:"Replace belt or rollers",cost:"$90–$180"},
    {problem:"Taking Too Long",cause:"Clogged vent or faulty moisture sensor",fix:"Clean vent or replace sensor",cost:"$80–$150"},
    {problem:"Making Noise",cause:"Worn drum bearing or loose blower wheel",fix:"Replace bearing or tighten wheel",cost:"$100–$220"},
    {problem:"Not Starting",cause:"Faulty door switch or start switch",fix:"Replace door or start switch",cost:"$70–$150"}
  ]},
  {name:"Dishwasher",slug:"dishwasher",price:"$120–$350",priceNote:"Includes diagnosis, parts, and labor",issues:[
    {problem:"Not Cleaning Dishes",cause:"Clogged spray arms or worn wash pump",fix:"Clean arms or replace pump",cost:"$100–$220"},
    {problem:"Not Draining",cause:"Clogged filter or faulty drain pump",fix:"Clean filter or replace pump",cost:"$90–$200"},
    {problem:"Leaking",cause:"Damaged door seal or faulty water inlet valve",fix:"Replace seal or valve",cost:"$80–$180"},
    {problem:"Not Starting",cause:"Faulty door latch or control board",fix:"Replace latch or board",cost:"$100–$250"},
    {problem:"Making Noise",cause:"Worn wash pump bearing or food debris",fix:"Replace pump or clean interior",cost:"$100–$230"}
  ]},
  {name:"Oven",slug:"oven",price:"$130–$380",priceNote:"Includes diagnosis, parts, and labor",issues:[
    {problem:"Not Heating",cause:"Burnt bake element or faulty igniter",fix:"Replace element or igniter",cost:"$100–$250"},
    {problem:"Heating Unevenly",cause:"Faulty bake element or temperature sensor",fix:"Replace element or sensor",cost:"$120–$280"},
    {problem:"Door Not Closing",cause:"Worn door hinges or broken door spring",fix:"Replace hinges or spring",cost:"$80–$180"},
    {problem:"Display Not Working",cause:"Faulty control board or loose wiring",fix:"Replace control board",cost:"$150–$350"},
    {problem:"Self-Clean Not Working",cause:"Faulty door latch or thermal limiter",fix:"Replace latch or limiter",cost:"$100–$220"}
  ]},
  {name:"Stove",slug:"stove",price:"$100–$350",priceNote:"Includes diagnosis, parts, and labor",issues:[
    {problem:"Burner Not Lighting",cause:"Dirty igniter or faulty spark module",fix:"Clean igniter or replace module",cost:"$80–$180"},
    {problem:"Burner Not Heating",cause:"Burnt coil element or faulty switch",fix:"Replace element or switch",cost:"$70–$160"},
    {problem:"Control Knob Broken",cause:"Worn knob or broken valve stem",fix:"Replace knob assembly",cost:"$60–$140"},
    {problem:"Clicking Continuously",cause:"Moisture on igniter or faulty spark module",fix:"Dry igniter or replace module",cost:"$80–$180"},
    {problem:"Not Turning On",cause:"Faulty control board or wiring issue",fix:"Repair wiring or replace board",cost:"$120–$300"}
  ]}
];

const BRANDS = [
  {name:"LG",slug:"lg",specialty:"Inverter motors, smart diagnosis, ThinQ technology",commonRepairs:["inverter motor failure","smart diagnosis issues","compressor repair","drain pump replacement"]},
  {name:"Samsung",slug:"samsung",specialty:"Ice maker systems, digital inverter, smart home integration",commonRepairs:["ice maker failure","Samsung refrigerator cooling issues","digital inverter motor","error code repair"]},
  {name:"Whirlpool",slug:"whirlpool",specialty:"American reliability, Cabrio/Duet/WTW series",commonRepairs:["Cabrio washer agitator","Duet dryer heating element","WTW control board","water valve replacement"]},
  {name:"GE",slug:"ge",specialty:"Profile/Cafe/Adora series, front-load washers",commonRepairs:["GE refrigerator ice maker","Profile dishwasher pump","Cafe oven control board","front-load washer seal"]},
  {name:"Bosch",slug:"bosch",specialty:"Quiet dishwashers, European engineering",commonRepairs:["dishwasher door latch","Series 800 control board","silence plus motor","integrated door alignment"]},
  {name:"Frigidaire",slug:"frigidaire",specialty:"Gallery/Professional series, built for North America",commonRepairs:["Gallery refrigerator fan","Professional oven element","ice maker module","dryer thermal fuse"]}
];

// ============================================================
// HELPERS
// ============================================================

const BASE_URL = 'https://fixlifyservices.com';
const OUT_DIR = path.join(__dirname);
const TEMPLATE_PATH = path.join(__dirname, 'service-template.html');

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

function fill(tpl, vars) {
  let out = tpl;
  for (const [key, val] of Object.entries(vars)) {
    // Replace all occurrences of {{KEY}}
    out = out.split(`{{${key}}}`).join(val);
  }
  return out;
}

function faqItem(q, a) {
  return `<div class="faq-item glass-card" role="listitem">
  <button class="faq-q" aria-expanded="false" onclick="fxFaq(this)">
    ${q}
    <span class="faq-chevron" aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>
    </span>
  </button>
  <div class="faq-a">${a}</div>
</div>`;
}

function breadcrumbItem(pos, name, href) {
  if (href) {
    return `<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="item" href="${href}"><span itemprop="name">${name}</span></a>
    <meta itemprop="position" content="${pos}">
  </li>
  <li class="breadcrumb-sep" aria-hidden="true">›</li>`;
  } else {
    return `<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <span class="breadcrumb-current" itemprop="name">${name}</span>
    <meta itemprop="position" content="${pos}">
  </li>`;
  }
}

function relatedServiceCards(currentSlug) {
  return SERVICES
    .filter(s => s.slug !== currentSlug)
    .map(s => `<a href="/${s.slug}-repair-toronto.html" class="related-card glass-card">
    <div class="related-card-label">Service</div>
    <div class="related-card-title">${s.name} Repair</div>
  </a>`).join('\n');
}

function relatedCityCards(currentSlug, serviceSlug) {
  return CITIES_TOP10
    .filter(c => c.slug !== currentSlug)
    .slice(0, 6)
    .map(c => `<a href="/${serviceSlug}-repair-${c.slug}.html" class="related-card glass-card">
    <div class="related-card-label">Location</div>
    <div class="related-card-title">${c.name}</div>
  </a>`).join('\n');
}

function write(filename, html) {
  const filepath = path.join(OUT_DIR, filename);
  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`  Created: ${filename}`);
}

// ============================================================
// SCHEMA BUILDERS
// ============================================================

function schemaServiceCity(service, city) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Fixlify Appliance Services",
        "telephone": "+14375241053",
        "url": "https://fixlifyservices.com",
        "address": {"@type":"PostalAddress","addressLocality":city.name,"addressRegion":"Ontario","addressCountry":"CA"},
        "aggregateRating": {"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"5200"},
        "openingHours": ["Mo-Sa 08:00-20:00","Su 09:00-18:00"]
      },
      {
        "@type": "Service",
        "name": `${service.name} Repair in ${city.name}`,
        "provider": {"@type":"LocalBusiness","name":"Fixlify Appliance Services"},
        "offers": {"@type":"Offer","priceRange":service.price,"description":`${service.name} repair — same-day service, 90-day warranty, all brands`}
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {"@type":"Question","name":`How much does ${service.name.toLowerCase()} repair cost in ${city.name}?`,"acceptedAnswer":{"@type":"Answer","text":`${service.name} repair in ${city.name} costs ${service.price}. Price includes parts and labor. 90-day warranty included.`}},
          {"@type":"Question","name":`Can I book same-day ${service.name.toLowerCase()} repair in ${city.name}?`,"acceptedAnswer":{"@type":"Answer","text":`Yes! Book online above or call (437) 524-1053 for same-day ${service.name.toLowerCase()} repair in ${city.name}.`}}
        ]
      }
    ]
  }, null, 2);
}

const LOCAL_BUSINESS_SCHEMA = {
  "@type": "LocalBusiness",
  "name": "Fixlify Appliance Services",
  "telephone": "(437) 524-1053",
  "url": "https://fixlifyservices.com",
  "areaServed": {"@type":"City","name":"Toronto"},
  "aggregateRating": {"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"312","bestRating":"5"}
};

function schemaArticleFaq(title, faqs) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      LOCAL_BUSINESS_SCHEMA,
      {
        "@type": "Article",
        "headline": title,
        "publisher": {"@type":"Organization","name":"Fixlify Appliance Services","url":"https://fixlifyservices.com"},
        "dateModified": "2026-01-01"
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))
      }
    ]
  }, null, 2);
}

function schemaFaqHowTo(title, faqs, steps) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      LOCAL_BUSINESS_SCHEMA,
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))
      },
      {
        "@type": "HowTo",
        "name": title,
        "step": steps.map((s, i) => ({"@type":"HowToStep","position":i+1,"name":s.name,"text":s.text}))
      }
    ]
  }, null, 2);
}

// ============================================================
// PAGE TYPE GENERATORS
// ============================================================

// --- 1. SERVICE × CITY PAGES ---

function genServiceCity(service, city) {
  const slug = `${service.slug}-repair-${city.slug}.html`;
  const top3 = service.issues.slice(0,3).map(i => i.problem).join(', ');

  const issuesTableRows = service.issues.map(i => `<tr>
    <td>${i.problem}</td>
    <td>${i.cause}</td>
    <td>${i.fix}</td>
    <td class="price-val">${i.cost}</td>
  </tr>`).join('\n');

  const issuesTable = `<div class="pricing-card glass-card" style="margin-top:32px;">
  <div class="pricing-card-header">
    <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;color:var(--text);">
      Common ${service.name} Problems We Fix in ${city.name}
    </h3>
  </div>
  <table class="pricing-table" aria-label="${service.name} repair issues">
    <thead>
      <tr>
        <th>Problem</th>
        <th>Likely Cause</th>
        <th>Our Fix</th>
        <th>Typical Cost</th>
      </tr>
    </thead>
    <tbody>
      ${issuesTableRows}
    </tbody>
  </table>
</div>`;

  const faqs = [
    {q:`How much does ${service.name.toLowerCase()} repair cost in ${city.name}?`, a:`${service.name} repair in ${city.name} typically costs ${service.price}. ${service.priceNote}. We provide upfront pricing before any work begins.`},
    {q:`Do you offer same-day ${service.name.toLowerCase()} repair in ${city.name}?`, a:`Yes! We offer same-day ${service.name.toLowerCase()} repair across ${city.region}. Book online or call (437) 524-1053 and a technician can arrive within 2–4 hours.`},
    {q:`What brands of ${service.name.toLowerCase()} do you repair in ${city.name}?`, a:`We repair all major brands including LG, Samsung, Whirlpool, GE, Bosch, Frigidaire, Maytag, KitchenAid, and more — all models covered.`},
    {q:`Do you offer a warranty on ${service.name.toLowerCase()} repairs?`, a:`Yes — all our repairs come with a 90-day parts and labour warranty. If the same issue recurs, we come back at no extra cost.`},
    {q:`How do I book a ${service.name.toLowerCase()} repair in ${city.name}?`, a:`Book online using the button above, or call (437) 524-1053. We'll confirm your appointment and dispatch a licensed technician to your ${city.name} address.`},
    {q:`Is it worth repairing a ${service.name.toLowerCase()} or buying a new one?`, a:`In most cases, repair is significantly cheaper than replacement. If the repair cost is less than 50% of a new unit's price and the appliance is under 10 years old, repair is almost always the better value.`},
    {q:`What are the most common ${service.name.toLowerCase()} problems you fix in ${city.name}?`, a:`The most common issues we fix are: ${top3}. Most repairs are completed in a single visit.`},
    {q:`Are your technicians licensed and insured in ${city.name}?`, a:`Yes, all our technicians are fully licensed, insured, and background-checked. We're fully compliant with Ontario appliance repair regulations.`}
  ];

  const faqItems = faqs.map(f => faqItem(f.q, f.a)).join('\n');

  const contentIntro = `<h2>Expert ${service.name} Repair Service in ${city.name}</h2>
<p>When your ${service.name.toLowerCase()} breaks down, you need a fast, reliable solution. Fixlify Appliance Services provides professional ${service.name.toLowerCase()} repair throughout ${city.name} and the broader ${city.region} area. Our licensed technicians are available same-day and arrive fully stocked with the most common replacement parts.</p>
<p>We service all major brands — LG, Samsung, Whirlpool, GE, Bosch, Frigidaire, Maytag, and more. Transparent upfront pricing, no hidden fees, and a 90-day warranty on all repairs.</p>
<h3>Our ${service.name} Repair Process</h3>
<ol>
  <li><strong>Book Online or Call:</strong> Choose a convenient time slot. Same-day slots available in ${city.name}.</li>
  <li><strong>Technician Arrives:</strong> A licensed technician arrives within 2–4 hours, fully equipped.</li>
  <li><strong>Diagnosis &amp; Quote:</strong> We diagnose the issue and provide an upfront quote before any work begins.</li>
  <li><strong>Repair Completed:</strong> Most repairs are done in a single visit. 90-day warranty included.</li>
</ol>
${issuesTable}`;

  const breadcrumb = [
    breadcrumbItem(1, 'Home', '/'),
    breadcrumbItem(2, `${service.name} Repair`, `/${service.slug}-repair-toronto.html`),
    breadcrumbItem(3, city.name, null)
  ].join('\n');

  const vars = {
    META_TITLE: `${service.name} Repair in ${city.name} — Same-Day Service | Fixlify`,
    META_DESC: `Professional ${service.name.toLowerCase()} repair in ${city.name}. Same-day available. Licensed technicians serve ${city.region}. Cost: ${service.price}. 90-day warranty. Call (437) 524-1053.`,
    CANONICAL: `${BASE_URL}/${slug}`,
    SCHEMA_JSON: schemaServiceCity(service, city),
    PAGE_TYPE: 'service',
    PAGE_TYPE_LABEL: 'Expert Repair',
    H1: `${service.name} Repair in <span>${city.name}</span> — Same-Day Booking`,
    ANSWER_BOX: `${service.name} repair in ${city.name}: Book online for same-day service. Our licensed technicians serve ${city.region} with 2–4 hour arrival. We fix ${top3}. Cost: ${service.price}. 90-day warranty. Call (437) 524-1053.`,
    CONTENT_INTRO: contentIntro,
    SERVICE_NAME: service.name,
    CITY_NAME: city.name,
    FAQ_ITEMS: faqItems,
    RELATED_SERVICES: relatedServiceCards(service.slug),
    RELATED_CITIES: relatedCityCards(city.slug, service.slug),
    BREADCRUMB: breadcrumb
  };

  write(slug, fill(template, vars));
}

// --- 2. COST GUIDE PAGES ---

const COST_PAGES = [
  {
    filename: 'fridge-repair-cost.html',
    service: 'Refrigerator',
    h1: 'How Much Does <span>Refrigerator Repair Cost?</span> [2026 Guide]',
    metaTitle: 'Fridge Repair Cost in Toronto & GTA [2026] | Fixlify',
    metaDesc: 'Refrigerator repair costs $150–$400 in Toronto & GTA. Full 2026 price guide with breakdown by repair type. Same-day service. 90-day warranty.',
    answerBox: 'Refrigerator repair typically costs $150–$400 in Toronto & GTA. Price includes diagnosis, parts, and labour. Most repairs are completed same-day. [2026 updated guide]',
    priceRange: '$150–$400',
    canonical: 'fridge-repair-cost.html'
  },
  {
    filename: 'washer-repair-cost.html',
    service: 'Washer',
    h1: 'How Much Does <span>Washer Repair Cost?</span> [2026 Guide]',
    metaTitle: 'Washer Repair Cost in Toronto & GTA [2026] | Fixlify',
    metaDesc: 'Washer repair costs $120–$350 in Toronto & GTA. Full 2026 price guide by repair type. Same-day service, 90-day warranty.',
    answerBox: 'Washer repair typically costs $120–$350 in Toronto & GTA. Price includes parts and labour. Most repairs done same-day. [2026 updated guide]',
    priceRange: '$120–$350',
    canonical: 'washer-repair-cost.html'
  },
  {
    filename: 'dryer-repair-cost.html',
    service: 'Dryer',
    h1: 'How Much Does <span>Dryer Repair Cost?</span> [2026 Guide]',
    metaTitle: 'Dryer Repair Cost in Toronto & GTA [2026] | Fixlify',
    metaDesc: 'Dryer repair costs $100–$300 in Toronto & GTA. Full 2026 price guide with cost breakdown. Same-day service, 90-day warranty.',
    answerBox: 'Dryer repair typically costs $100–$300 in Toronto & GTA. Includes parts and labour. Most repairs completed same-day. [2026 updated guide]',
    priceRange: '$100–$300',
    canonical: 'dryer-repair-cost.html'
  },
  {
    filename: 'dishwasher-repair-cost.html',
    service: 'Dishwasher',
    h1: 'How Much Does <span>Dishwasher Repair Cost?</span> [2026 Guide]',
    metaTitle: 'Dishwasher Repair Cost in Toronto & GTA [2026] | Fixlify',
    metaDesc: 'Dishwasher repair costs $120–$350 in Toronto & GTA. 2026 price guide by repair type. Same-day service, 90-day warranty.',
    answerBox: 'Dishwasher repair typically costs $120–$350 in Toronto & GTA. Price includes parts and labour. [2026 updated guide]',
    priceRange: '$120–$350',
    canonical: 'dishwasher-repair-cost.html'
  },
  {
    filename: 'oven-repair-cost.html',
    service: 'Oven',
    h1: 'How Much Does <span>Oven Repair Cost?</span> [2026 Guide]',
    metaTitle: 'Oven Repair Cost in Toronto & GTA [2026] | Fixlify',
    metaDesc: 'Oven repair costs $130–$380 in Toronto & GTA. Full 2026 price guide. Same-day service, 90-day warranty. Call (437) 524-1053.',
    answerBox: 'Oven repair typically costs $130–$380 in Toronto & GTA. Includes parts and labour. [2026 updated guide]',
    priceRange: '$130–$380',
    canonical: 'oven-repair-cost.html'
  },
  {
    filename: 'stove-repair-cost.html',
    service: 'Stove',
    h1: 'How Much Does <span>Stove Repair Cost?</span> [2026 Guide]',
    metaTitle: 'Stove Repair Cost in Toronto & GTA [2026] | Fixlify',
    metaDesc: 'Stove repair costs $100–$350 in Toronto & GTA. Full 2026 price guide. Same-day service, 90-day warranty.',
    answerBox: 'Stove repair typically costs $100–$350 in Toronto & GTA. Price includes parts and labour. [2026 updated guide]',
    priceRange: '$100–$350',
    canonical: 'stove-repair-cost.html'
  },
  {
    filename: 'appliance-repair-cost-toronto.html',
    service: 'Appliance',
    h1: '<span>Appliance Repair Cost</span> in Toronto [2026]',
    metaTitle: 'Appliance Repair Cost Toronto [2026] — All Types | Fixlify',
    metaDesc: 'Complete appliance repair cost guide for Toronto & GTA [2026]. Fridge: $150–$400, Washer: $120–$350, Dryer: $100–$300, and more. Same-day service.',
    answerBox: 'Appliance repair in Toronto costs $100–$450 depending on the appliance type and repair needed. Refrigerators: $150–$400, Washers: $120–$350, Dryers: $100–$300, Dishwashers: $120–$350, Ovens: $130–$380, Stoves: $100–$350. [2026 guide]',
    priceRange: '$100–$450',
    canonical: 'appliance-repair-cost-toronto.html'
  },
  {
    filename: 'washer-machine-repair-cost.html',
    service: 'Washing Machine',
    h1: 'Washing Machine Repair Cost <span>2026 Guide</span>',
    metaTitle: 'Washing Machine Repair Cost [2026] Toronto & GTA | Fixlify',
    metaDesc: 'Washing machine repair costs $120–$350 in Toronto & GTA. Full 2026 breakdown. Same-day service, 90-day warranty. Call (437) 524-1053.',
    answerBox: 'Washing machine repair typically costs $120–$350 in Toronto & GTA. Common repairs include pump, belt, bearing, and control board replacement. Same-day service available. [2026 guide]',
    priceRange: '$120–$350',
    canonical: 'washer-machine-repair-cost.html'
  },
  {
    filename: 'average-appliance-repair-cost.html',
    service: 'Appliance',
    h1: 'Average <span>Appliance Repair Cost</span> in Ontario [2026]',
    metaTitle: 'Average Appliance Repair Cost Ontario 2026 | Fixlify',
    metaDesc: 'Average appliance repair cost in Ontario 2026: $150–$350 for most repairs. Detailed breakdown by appliance type. Is repair worth it? Find out here.',
    answerBox: 'The average appliance repair cost in Ontario is $150–$350 for most common repairs. Refrigerators average $230, washers $200, dryers $175, dishwashers $190, ovens $220. Repair is typically cheaper than replacement when costs are under 50% of new unit price. [2026]',
    priceRange: '$150–$350',
    canonical: 'average-appliance-repair-cost.html'
  },
  {
    filename: 'is-it-worth-repairing-appliance.html',
    service: 'Appliance',
    h1: 'Is It <span>Worth Repairing</span> Your Appliance? [2026 Guide]',
    metaTitle: 'Is It Worth Repairing Your Appliance? [2026 Guide] | Fixlify',
    metaDesc: 'Should you repair or replace your appliance? 2026 guide covering cost thresholds, age factors, and when repair beats replacement in Toronto & GTA.',
    answerBox: 'Repair is worth it if the cost is less than 50% of a new appliance\'s price and the unit is under 10 years old. Refrigerators and washers especially benefit from repair vs. replacement. Get a free diagnosis from Fixlify before deciding. [2026 guide]',
    priceRange: '$100–$400',
    canonical: 'is-it-worth-repairing-appliance.html'
  }
];

function genCostPage(page) {
  const allServiceRows = SERVICES.map(s => `<tr>
    <td>${s.name}</td>
    <td class="price-val">${s.price}</td>
    <td>${s.priceNote}</td>
  </tr>`).join('\n');

  const pricingTable = `<div class="pricing-card glass-card" style="margin-top:32px;">
  <div class="pricing-card-header">
    <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;color:var(--text);">
      2026 Appliance Repair Cost Guide — Toronto &amp; GTA
    </h3>
  </div>
  <table class="pricing-table" aria-label="Appliance repair costs 2026">
    <thead>
      <tr>
        <th>Appliance</th>
        <th>Typical Cost</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      ${allServiceRows}
    </tbody>
  </table>
</div>`;

  const detailTable = `<div class="pricing-card glass-card" style="margin-top:24px;">
  <div class="pricing-card-header">
    <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;color:var(--text);">
      ${page.service} Repair Cost Breakdown
    </h3>
  </div>
  <table class="pricing-table" aria-label="${page.service} repair cost breakdown">
    <thead>
      <tr>
        <th>Repair Type</th>
        <th>Typical Cost</th>
        <th>Includes</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Diagnostic &amp; Minor Repair</td><td class="price-val">$80 – $150</td><td>Labour only</td></tr>
      <tr><td>Part Replacement (common)</td><td class="price-val">$150 – $280</td><td>Parts &amp; Labour</td></tr>
      <tr><td>Major Component Repair</td><td class="price-val">$250 – $400</td><td>Parts &amp; Labour</td></tr>
      <tr><td>Complex / Compressor Repair</td><td class="price-val">$300 – $450+</td><td>Parts &amp; Labour</td></tr>
    </tbody>
  </table>
</div>`;

  const faqs = [
    {q:`Why does ${page.service.toLowerCase()} repair cost this much?`, a:`Appliance repair costs reflect diagnosis time, technician labour (typically $80–$120/hr), and parts cost. Most appliance repairs require 1–2 hours of labour. Parts prices vary widely depending on brand and availability.`},
    {q:'Is it worth repairing or should I buy new?', a:`A good rule: if repair costs less than 50% of a comparable new unit and the appliance is under 10 years old, repair is almost always the better financial choice. Our technicians will give you an honest assessment.`},
    {q:'How can I save money on appliance repair?', a:`Book quickly — minor issues often become expensive if left unrepaired. Use our online booking for same-day service which avoids emergency premium fees. We offer transparent upfront pricing with no hidden charges.`},
    {q:'Do you charge a diagnostic fee?', a:`We charge a diagnostic fee which is applied toward the cost of repair if you proceed. If you choose not to repair, you only pay the diagnostic fee.`},
    {q:'Are parts and labour both covered in the quoted price?', a:`Yes — our quoted price is all-inclusive: parts, labour, and taxes. No surprise add-ons. You'll know the full cost before we start any work.`},
    {q:'Do you offer a warranty on repairs?', a:`All repairs come with a 90-day warranty on both parts and labour. If the same issue recurs within 90 days, we'll fix it at no extra charge.`},
    {q:'How long does the repair take?', a:`Most repairs are completed within 1–2 hours during a single visit. We arrive stocked with the most common parts so we rarely need a second visit for parts ordering.`},
    {q:'Do you service all brands?', a:`Yes — we service all major brands including LG, Samsung, Whirlpool, GE, Bosch, Frigidaire, Maytag, KitchenAid, and more.`}
  ];

  const faqItems = faqs.map(f => faqItem(f.q, f.a)).join('\n');

  const contentIntro = `<h2>${page.service} Repair Cost in Toronto &amp; GTA [2026]</h2>
<p>Understanding appliance repair costs helps you make informed decisions. Below is our comprehensive 2026 guide to appliance repair pricing across Toronto and the Greater Toronto Area.</p>
<p>All prices include diagnosis, parts, and labour. We provide upfront quotes — you'll know the exact cost before any work begins. No hidden fees, no surprises.</p>
<h3>What Affects Repair Cost?</h3>
<ul>
  <li><strong>Appliance type and brand</strong> — European brands like Bosch may require specialized parts</li>
  <li><strong>Age of appliance</strong> — older units may need harder-to-source parts</li>
  <li><strong>Type of repair</strong> — simple belt replacement vs. compressor rebuild</li>
  <li><strong>Parts availability</strong> — some parts require ordering, others are in-stock</li>
</ul>
${pricingTable}
${detailTable}`;

  const breadcrumb = [
    breadcrumbItem(1, 'Home', '/'),
    breadcrumbItem(2, 'Cost Guides', null)
  ].join('\n');

  const schemaFaqs = faqs.slice(0, 4).map(f => ({q: f.q, a: f.a}));

  const vars = {
    META_TITLE: page.metaTitle,
    META_DESC: page.metaDesc,
    CANONICAL: `${BASE_URL}/${page.filename}`,
    SCHEMA_JSON: schemaArticleFaq(page.h1.replace(/<[^>]+>/g,''), schemaFaqs),
    PAGE_TYPE: 'cost',
    PAGE_TYPE_LABEL: 'Cost Guide',
    H1: page.h1,
    ANSWER_BOX: page.answerBox,
    CONTENT_INTRO: contentIntro,
    SERVICE_NAME: page.service,
    CITY_NAME: 'Toronto &amp; GTA',
    FAQ_ITEMS: faqItems,
    RELATED_SERVICES: SERVICES.map(s => `<a href="/${s.slug}-repair-toronto.html" class="related-card glass-card">
    <div class="related-card-label">Service</div>
    <div class="related-card-title">${s.name} Repair</div>
  </a>`).join('\n'),
    RELATED_CITIES: CITIES_TOP10.slice(0,6).map(c => `<a href="/appliance-repair-${c.slug}.html" class="related-card glass-card">
    <div class="related-card-label">Location</div>
    <div class="related-card-title">${c.name}</div>
  </a>`).join('\n'),
    BREADCRUMB: breadcrumb
  };

  write(page.filename, fill(template, vars));
}

// --- 3. PROBLEM DIAGNOSIS PAGES ---

const PROBLEM_PAGES = [
  {
    filename: 'fridge-not-cooling.html',
    title: 'Fridge Not Cooling',
    service: SERVICES[0],
    problem: 'Not Cooling',
    h1: 'Fridge <span>Not Cooling?</span> Here\'s Why + How to Fix It',
    metaTitle: 'Fridge Not Cooling — Causes & Fix | Toronto Same-Day Repair | Fixlify',
    metaDesc: 'Fridge not cooling? Most common causes: dirty condenser coils, faulty compressor, or defrost failure. Same-day repair in Toronto & GTA. Cost: $180–$350.',
    answerBox: 'A fridge not cooling is usually caused by dirty condenser coils, a faulty evaporator fan, or a defrost system failure. Cost to fix: $180–$350. Same-day repair available in Toronto & GTA. Call (437) 524-1053.',
    causes: [
      {icon:'🔍', title:'Dirty Condenser Coils', desc:'Coils clogged with dust restrict heat dissipation, forcing the compressor to work harder and reducing cooling efficiency. Clean coils every 6–12 months.'},
      {icon:'❄️', title:'Defrost System Failure', desc:'Frost build-up on the evaporator coils blocks airflow. A faulty defrost heater, thermostat, or timer causes this. The freezer may be cold but the fridge warm.'},
      {icon:'🌀', title:'Faulty Evaporator Fan Motor', desc:'The evaporator fan circulates cold air from the freezer to the fridge. If it fails, the fridge section loses cooling while the freezer remains cold.'},
      {icon:'⚙️', title:'Compressor Issues', desc:'The compressor is the heart of the refrigeration system. If it fails to start or runs but doesn\'t compress refrigerant, cooling stops entirely.'},
      {icon:'🚪', title:'Faulty Door Seals (Gaskets)', desc:'Worn or damaged door seals allow warm air to enter continuously, making it impossible for the fridge to maintain proper temperature.'}
    ],
    faqs: [
      {q:'Why is my fridge not cooling but the freezer is fine?', a:'This is typically caused by a failed evaporator fan motor or a blocked air vent between the freezer and fridge compartments. Call (437) 524-1053 for same-day diagnosis.'},
      {q:'How much does it cost to fix a fridge not cooling?', a:'Fixing a fridge not cooling costs $180–$350 depending on the cause. Coil cleaning is cheaper; compressor replacement is more expensive. We provide upfront quotes.'},
      {q:'Can a fridge not cooling be fixed same-day?', a:'Yes — most fridge cooling issues are resolved in a single same-day visit. We arrive stocked with common parts including fan motors, thermostats, and defrost components.'},
      {q:'Should I repair or replace a fridge that\'s not cooling?', a:'If the fridge is under 10 years old, repair is almost always more economical. Compressor replacement on an old unit may not be worth it — ask our technician for an honest assessment.'},
      {q:'Is it safe to store food in a fridge that\'s not cooling?', a:'No — discard any perishables that have been above 4°C for more than 2 hours. Book an emergency repair immediately to avoid food loss.'},
      {q:'What temperature should my fridge be?', a:'Your fridge should maintain 1–4°C (34–39°F). The freezer should stay at -18°C (0°F) or colder. If readings are higher, call for service.'}
    ],
    steps: [
      {name:'Check the temperature settings', text:'Verify the thermostat is set correctly (1–4°C). Sometimes settings get accidentally changed.'},
      {name:'Check condenser coils', text:'Unplug the fridge and check the coils at the back or underneath. If dusty, vacuum them carefully.'},
      {name:'Check the evaporator fan', text:'Open the freezer — you should hear the fan running. If silent, the fan motor may be faulty.'},
      {name:'Call a technician', text:'If basic checks don\'t resolve the issue, call (437) 524-1053 for professional same-day diagnosis.'}
    ]
  },
  {
    filename: 'washer-not-draining.html',
    title: 'Washer Not Draining',
    service: SERVICES[1],
    problem: 'Not Draining',
    h1: 'Washer <span>Not Draining?</span> Here\'s Why + How to Fix It',
    metaTitle: 'Washer Not Draining — Causes & Fix | Toronto Same-Day Repair | Fixlify',
    metaDesc: 'Washer not draining? Likely a clogged pump filter or faulty drain pump. Same-day repair in Toronto & GTA. Cost: $100–$200. Call (437) 524-1053.',
    answerBox: 'A washer not draining is usually caused by a clogged pump filter or faulty drain pump. Cost to fix: $100–$200. Same-day repair available in Toronto & GTA. Call (437) 524-1053.',
    causes: [
      {icon:'🔍', title:'Clogged Pump Filter', desc:'Most front-load washers have a pump filter that catches lint, coins, and debris. When clogged, water can\'t drain. Check and clean the filter (usually at the bottom front).'},
      {icon:'⚙️', title:'Faulty Drain Pump', desc:'If the pump motor fails, water won\'t drain regardless of the filter condition. You may hear a humming sound but no drainage.'},
      {icon:'🌀', title:'Kinked or Blocked Drain Hose', desc:'The drain hose may be kinked, clogged with debris, or positioned too low/high, preventing proper drainage.'},
      {icon:'🔌', title:'Lid Switch Failure (Top-Load)', desc:'Top-load washers won\'t drain if the lid switch is faulty — the machine thinks the lid is open and stops mid-cycle.'},
      {icon:'💻', title:'Control Board Error', desc:'A faulty control board may send incorrect signals, preventing the drain cycle from initiating properly.'}
    ],
    faqs: [
      {q:'Why is my washer full of water and won\'t drain?', a:'The most common cause is a clogged pump filter (on front-loaders) or a failed drain pump. Check and clean the filter first — it\'s a quick DIY fix. If that doesn\'t work, call us.'},
      {q:'How much does washer drain repair cost?', a:'Washer drain repair costs $100–$200. Filter cleaning is on the lower end; pump replacement is higher. We provide upfront quotes before starting work.'},
      {q:'Can I manually drain a washer that won\'t drain?', a:'Yes — most front-load washers have an emergency drain hose near the pump filter. Place a towel and shallow pan, then pull the hose to drain manually. Then clean the filter.'},
      {q:'How long does washer drain repair take?', a:'Most washer drain repairs take 1–2 hours. We carry drain pump parts for all major brands in our service van.'},
      {q:'Do you repair both top-load and front-load washers?', a:'Yes — we repair all washer types including top-load, front-load, high-efficiency (HE), and all brands: LG, Samsung, Whirlpool, GE, and more.'}
    ],
    steps: [
      {name:'Check and clean the pump filter', text:'For front-loaders: locate the small door at bottom front, unscrew the filter cap, and clean any debris.'},
      {name:'Check the drain hose', text:'Ensure the drain hose isn\'t kinked and is properly connected to the standpipe at the correct height (30–90cm from floor).'},
      {name:'Run a spin-only cycle', text:'Select spin-only or drain & spin to test if the washer can drain after clearing the filter.'},
      {name:'Call a technician', text:'If the washer still won\'t drain, call (437) 524-1053. We\'ll diagnose and fix the pump or other issue same-day.'}
    ]
  },
  {
    filename: 'washer-not-spinning.html',
    title: 'Washer Not Spinning',
    service: SERVICES[1],
    problem: 'Not Spinning',
    h1: 'Washer <span>Not Spinning?</span> Here\'s Why + How to Fix It',
    metaTitle: 'Washer Not Spinning — Causes & Fix | Toronto Same-Day Repair | Fixlify',
    metaDesc: 'Washer not spinning? Usually a worn drive belt or faulty lid switch. Same-day repair in Toronto & GTA. Cost: $80–$180. Call (437) 524-1053.',
    answerBox: 'A washer not spinning is usually caused by a worn drive belt or faulty lid switch. Cost to fix: $80–$180. Same-day repair available in Toronto & GTA. Call (437) 524-1053.',
    causes: [
      {icon:'⚙️', title:'Worn or Broken Drive Belt', desc:'The drive belt connects the motor to the drum. When it wears or snaps, the drum won\'t spin. You may smell burning rubber.'},
      {icon:'🔌', title:'Faulty Lid Switch (Top-Load)', desc:'Top-load washers won\'t spin if the lid switch is defective. The machine thinks the lid is open and stops for safety.'},
      {icon:'🌀', title:'Worn Motor Coupling', desc:'The motor coupling connects the motor to the transmission on direct-drive washers. When it wears, the agitator works but the spin cycle fails.'},
      {icon:'🔍', title:'Unbalanced Load', desc:'A heavily unbalanced load triggers the washer\'s safety sensors to stop the spin cycle. Redistribute the clothes and try again.'},
      {icon:'💻', title:'Control Board or Door Latch Failure', desc:'A faulty control board or door latch (on front-loaders) can prevent the spin cycle from engaging.'}
    ],
    faqs: [
      {q:'Why does my washer wash but not spin?', a:'The most common cause is a worn drive belt or faulty lid switch (top-loaders) / door latch (front-loaders). The motor runs for agitation but can\'t generate enough torque for high-speed spin.'},
      {q:'How much does washer spin repair cost?', a:'Washer spin repair typically costs $80–$180. Belt and lid switch replacement are on the lower end; motor or control board replacement higher.'},
      {q:'Can I fix a washer not spinning myself?', a:'Cleaning a pump filter or rebalancing a load is DIY-friendly. Belt or lid switch replacement requires some mechanical skill. For anything beyond basic fixes, professional repair is recommended.'},
      {q:'Is it better to repair or replace a washer that won\'t spin?', a:'If your washer is under 8–10 years old and the repair is a belt or switch replacement, repair is definitely worth it. Call us for a free diagnosis.'},
      {q:'Do you carry drive belts and lid switches in your service van?', a:'Yes — we stock the most common belts, lid switches, motor couplings, and door latches for all major brands, allowing same-day repair in most cases.'}
    ],
    steps: [
      {name:'Check for unbalanced load', text:'Open the washer and redistribute clothes evenly. An unbalanced load often triggers the spin safety stop.'},
      {name:'Check lid switch / door latch', text:'Listen for a click when closing the lid or door. No click suggests a faulty switch/latch that needs replacement.'},
      {name:'Run a spin-only cycle', text:'Start a spin-only cycle to isolate whether the issue is with spin specifically or the entire machine.'},
      {name:'Call a technician', text:'If the washer still won\'t spin, call (437) 524-1053. We\'ll diagnose and repair the belt, switch, or other component same-day.'}
    ]
  },
  {
    filename: 'dryer-not-heating.html',
    title: 'Dryer Not Heating',
    service: SERVICES[2],
    problem: 'Not Heating',
    h1: 'Dryer <span>Not Heating?</span> Here\'s Why + How to Fix It',
    metaTitle: 'Dryer Not Heating — Causes & Fix | Toronto Same-Day Repair | Fixlify',
    metaDesc: 'Dryer not heating? Usually a blown thermal fuse or faulty heating element. Same-day repair in Toronto & GTA. Cost: $80–$200. Call (437) 524-1053.',
    answerBox: 'A dryer not heating is usually caused by a blown thermal fuse or faulty heating element. Cost to fix: $80–$200. Same-day repair available in Toronto & GTA. Call (437) 524-1053.',
    causes: [
      {icon:'🔥', title:'Blown Thermal Fuse', desc:'The thermal fuse is a one-time safety device that blows if the dryer overheats. Once blown, the dryer tumbles but produces no heat. Usually caused by a clogged vent.'},
      {icon:'⚡', title:'Faulty Heating Element (Electric)', desc:'The heating element coil heats the air in electric dryers. When it breaks, no heat is produced. Visually inspect for a broken coil.'},
      {icon:'🔥', title:'Faulty Igniter (Gas)', desc:'Gas dryers use an igniter to ignite the burner. A failed igniter means gas never lights and no heat is produced.'},
      {icon:'🌡️', title:'Defective High-Limit Thermostat', desc:'The high-limit thermostat monitors maximum drum temperature. If it fails open, it cuts heat even when temperatures are normal.'},
      {icon:'💨', title:'Clogged Vent / Exhaust Duct', desc:'A clogged dryer vent restricts airflow, causing overheating and blowing the thermal fuse. Clean the vent annually to prevent recurring issues.'}
    ],
    faqs: [
      {q:'Why does my dryer run but not heat?', a:'The most common cause is a blown thermal fuse. This is a cheap part but the fuse blows due to restricted airflow — always clean the vent when replacing it, or the new fuse will blow again.'},
      {q:'How much does dryer heating repair cost?', a:'Dryer heating repair costs $80–$200. Thermal fuse and thermostat replacement are cheaper; heating element replacement costs more due to parts cost.'},
      {q:'Is a dryer that doesn\'t heat dangerous?', a:'It\'s not immediately dangerous, but the underlying cause (clogged vent) can be a fire hazard. Address the issue promptly.'},
      {q:'How do I know if it\'s the thermal fuse or heating element?', a:'A multimeter test confirms which component has failed. Our technicians carry both parts and diagnostic tools for same-day repair.'},
      {q:'How often should I clean my dryer vent?', a:'Clean your dryer vent at least once per year, or every 6 months if you use the dryer heavily. A clogged vent is the #1 cause of dryer heating failure and a fire hazard.'}
    ],
    steps: [
      {name:'Clean the lint filter', text:'Clean the lint filter before every load. A full lint filter restricts airflow and causes overheating.'},
      {name:'Check the external vent', text:'Go outside and feel for airflow from the dryer vent while the dryer runs. Weak or no airflow indicates a clog.'},
      {name:'Clean the vent duct', text:'Disconnect the dryer from the wall, detach the vent hose, and clean it with a vent brush or vacuum.'},
      {name:'Call a technician', text:'If cleaning doesn\'t restore heat, call (437) 524-1053. We\'ll test and replace the thermal fuse, heating element, or thermostat same-day.'}
    ]
  },
  {
    filename: 'dryer-not-spinning.html',
    title: 'Dryer Not Spinning',
    service: SERVICES[2],
    problem: 'Not Spinning',
    h1: 'Dryer <span>Not Spinning?</span> Here\'s Why + How to Fix It',
    metaTitle: 'Dryer Not Spinning — Causes & Fix | Toronto Same-Day Repair | Fixlify',
    metaDesc: 'Dryer not spinning? Usually a broken drive belt or worn drum rollers. Same-day repair in Toronto & GTA. Cost: $90–$180. Call (437) 524-1053.',
    answerBox: 'A dryer not spinning is usually caused by a broken drive belt or seized drum rollers. Cost to fix: $90–$180. Same-day repair available in Toronto & GTA. Call (437) 524-1053.',
    causes: [
      {icon:'⚙️', title:'Broken Drive Belt', desc:'The drive belt wraps around the drum and motor pulley. When it breaks, the drum won\'t turn. You\'ll often hear the motor running but see no drum movement.'},
      {icon:'🔩', title:'Worn Drum Support Rollers', desc:'Drum rollers support the rear of the drum. When they wear flat or seize, the drum drags and eventually stops spinning.'},
      {icon:'🔌', title:'Faulty Door Switch', desc:'The door switch signals that the door is closed. If it fails, the dryer won\'t start and the drum won\'t spin for safety.'},
      {icon:'🌀', title:'Idler Pulley Failure', desc:'The idler pulley keeps tension on the drive belt. When it seizes, the belt breaks or slips, stopping drum rotation.'},
      {icon:'💻', title:'Motor Failure', desc:'A failed drive motor means the drum won\'t spin and there\'ll be no heat. Motor failure is less common but more expensive to repair.'}
    ],
    faqs: [
      {q:'Why does my dryer turn on but the drum doesn\'t spin?', a:'The most common cause is a broken drive belt. This is a relatively cheap repair. You may also hear the motor humming but the drum staying still.'},
      {q:'How much does dryer drum repair cost?', a:'Dryer drum repair costs $90–$180. Belt replacement is cheaper; roller or idler pulley replacement is mid-range; motor replacement is higher.'},
      {q:'Can I use a dryer with a broken belt?', a:'No — clothes won\'t dry and running the motor without a load can cause additional damage. Stop using the dryer and book a repair.'},
      {q:'How long does a dryer belt replacement take?', a:'Belt replacement typically takes about 1 hour. Our technicians arrive with belts for all major dryer brands.'},
      {q:'How do I know if it\'s the belt or the rollers?', a:'If the drum moves freely when turned by hand but the motor runs without spinning it, the belt is broken. If the drum is stiff or noisy when turned, it\'s likely the rollers.'}
    ],
    steps: [
      {name:'Open the dryer and check drum movement', text:'With the dryer unplugged, try spinning the drum by hand. If it turns freely but the motor runs during operation without spinning it, the belt has broken.'},
      {name:'Listen for unusual sounds', text:'A broken belt is usually silent. Worn rollers make a thumping or squealing noise during operation.'},
      {name:'Check the door switch', text:'Test the door switch by pressing it manually while attempting to start the dryer.'},
      {name:'Call a technician', text:'Call (437) 524-1053. We\'ll confirm the cause and replace the belt, rollers, idler pulley, or door switch same-day.'}
    ]
  },
  {
    filename: 'dishwasher-not-draining.html',
    title: 'Dishwasher Not Draining',
    service: SERVICES[3],
    problem: 'Not Draining',
    h1: 'Dishwasher <span>Not Draining?</span> Here\'s Why + How to Fix It',
    metaTitle: 'Dishwasher Not Draining — Causes & Fix | Toronto Same-Day | Fixlify',
    metaDesc: 'Dishwasher not draining? Usually a clogged filter or faulty drain pump. Same-day repair in Toronto & GTA. Cost: $90–$200. Call (437) 524-1053.',
    answerBox: 'A dishwasher not draining is usually caused by a clogged filter or faulty drain pump. Cost to fix: $90–$200. Same-day repair in Toronto & GTA. Call (437) 524-1053.',
    causes: [
      {icon:'🔍', title:'Clogged Filter / Food Trap', desc:'The dishwasher filter at the bottom of the tub catches food particles. When clogged, water can\'t drain. This is the most common cause and a quick DIY fix.'},
      {icon:'⚙️', title:'Faulty Drain Pump', desc:'If the drain pump motor fails, water won\'t drain despite a clean filter. You may hear humming without drainage.'},
      {icon:'🌀', title:'Blocked Drain Hose', desc:'The drain hose can become kinked or clogged with grease. Check that the hose is unobstructed and properly routed.'},
      {icon:'🔌', title:'Garbage Disposal Connection', desc:'If your dishwasher drains through a garbage disposal, a blocked disposal or covered knockout plug can prevent drainage.'},
      {icon:'💻', title:'Control Board Issue', desc:'A faulty control board may not send the signal to initiate the drain cycle properly.'}
    ],
    faqs: [
      {q:'Why is there water at the bottom of my dishwasher?', a:'Standing water at the bottom is almost always a clogged filter. Remove and clean the filter (twist out from the bottom of the tub) and run a short cycle.'},
      {q:'How much does dishwasher drain repair cost?', a:'Dishwasher drain repair costs $90–$200. Filter cleaning is free. Pump replacement is typically $120–$200 including parts and labour.'},
      {q:'Can I clean the dishwasher filter myself?', a:'Yes! The filter is usually at the bottom of the tub. Twist it counterclockwise to remove, rinse under warm water with a brush, and reinstall. Do this monthly.'},
      {q:'My dishwasher drains but leaves water on the floor?', a:'Standing water on the floor usually indicates a drain hose leak or a cracked pump housing. This requires professional repair — call (437) 524-1053.'},
      {q:'Do you repair Bosch and Samsung dishwashers that won\'t drain?', a:'Yes — we repair all dishwasher brands including Bosch, Samsung, LG, Whirlpool, KitchenAid, and more.'}
    ],
    steps: [
      {name:'Clean the filter', text:'Remove and clean the filter at the bottom of the dishwasher tub. This resolves the issue in about 50% of cases.'},
      {name:'Check the drain hose', text:'Inspect the drain hose under the sink for kinks or blockages. Straighten any kinks.'},
      {name:'Check the garbage disposal', text:'If connected to a disposal, run the disposal to clear any blockage. New disposals may have a knockout plug that needs removal.'},
      {name:'Call a technician', text:'If cleaning doesn\'t help, call (437) 524-1053. We\'ll replace the drain pump or address other issues same-day.'}
    ]
  },
  {
    filename: 'oven-not-heating.html',
    title: 'Oven Not Heating',
    service: SERVICES[4],
    problem: 'Not Heating',
    h1: 'Oven <span>Not Heating?</span> Here\'s Why + How to Fix It',
    metaTitle: 'Oven Not Heating — Causes & Fix | Toronto Same-Day Repair | Fixlify',
    metaDesc: 'Oven not heating? Usually a burnt bake element or faulty igniter. Same-day repair in Toronto & GTA. Cost: $100–$250. Call (437) 524-1053.',
    answerBox: 'An oven not heating is usually caused by a burnt bake element (electric) or faulty igniter (gas). Cost to fix: $100–$250. Same-day repair in Toronto & GTA. Call (437) 524-1053.',
    causes: [
      {icon:'⚡', title:'Burnt Bake Element (Electric)', desc:'The bake element at the bottom of electric ovens can burn out. Look for visible breaks, blisters, or burn marks on the element.'},
      {icon:'🔥', title:'Faulty Igniter (Gas)', desc:'Gas ovens use an igniter to open the safety valve and light the burner. A weak or failed igniter prevents the oven from heating.'},
      {icon:'🌡️', title:'Faulty Temperature Sensor / Probe', desc:'The temperature sensor regulates oven temperature. If it fails, the oven may not heat at all or heat to the wrong temperature.'},
      {icon:'💻', title:'Faulty Control Board', desc:'The electronic control board controls all oven functions. A failed board can prevent the heating elements from receiving power.'},
      {icon:'🔌', title:'Thermal Fuse (Electric)', desc:'Like dryers, some electric ovens have a thermal fuse that blows if the oven overheats, cutting power to the heating elements.'}
    ],
    faqs: [
      {q:'Why does my oven turn on but not heat up?', a:'For electric ovens, a burnt bake element is the most likely cause — look for visible breaks in the element. For gas ovens, a faulty igniter is most common.'},
      {q:'How much does oven heating repair cost?', a:'Oven heating repair costs $100–$250. Bake element and igniter replacement are mid-range; control board replacement is higher.'},
      {q:'Can I replace an oven bake element myself?', a:'Basic bake element replacement is possible for handy homeowners. However, if the issue is the control board or temperature sensor, professional diagnosis is needed.'},
      {q:'Is it safe to use an oven that isn\'t heating properly?', a:'Using an oven with a faulty temperature sensor can result in undercooked food or fire risk. Stop using it and book a repair.'},
      {q:'Do you repair both gas and electric ovens?', a:'Yes — we repair all types including electric (bake/broil element), gas (igniter, burner), and dual-fuel ovens. All brands covered.'}
    ],
    steps: [
      {name:'Check the bake element visually', text:'For electric ovens: turn off power and visually inspect the bake element for breaks, holes, or burn spots.'},
      {name:'Test the igniter (gas)', text:'For gas ovens: turn on the oven and listen for clicking. If you hear clicking but no ignition after 30 seconds, the igniter is failing.'},
      {name:'Check circuit breaker', text:'Electric ovens require 240V. Check if the breaker has tripped — a single breaker trip can cut heat without affecting the clock/lights.'},
      {name:'Call a technician', text:'Call (437) 524-1053. We\'ll diagnose and replace the element, igniter, sensor, or control board same-day.'}
    ]
  },
  {
    filename: 'stove-burner-not-working.html',
    title: 'Stove Burner Not Working',
    service: SERVICES[5],
    problem: 'Burner Not Lighting',
    h1: 'Stove Burner <span>Not Working?</span> Here\'s Why + How to Fix It',
    metaTitle: 'Stove Burner Not Working — Causes & Fix | Toronto Same-Day | Fixlify',
    metaDesc: 'Stove burner not working? Usually a dirty igniter or faulty coil element. Same-day repair in Toronto & GTA. Cost: $70–$180. Call (437) 524-1053.',
    answerBox: 'A stove burner not working is usually caused by a dirty igniter (gas) or burnt coil element (electric). Cost to fix: $70–$180. Same-day repair in Toronto & GTA. Call (437) 524-1053.',
    causes: [
      {icon:'🔍', title:'Dirty or Wet Igniter (Gas)', desc:'Food debris or moisture on the igniter prevents it from sparking reliably. Clean the igniter port with a dry brush or toothpick.'},
      {icon:'⚡', title:'Burnt Coil Element (Electric)', desc:'Electric coil burners can burn out, resulting in one burner not heating. The element may show visible burn marks.'},
      {icon:'🔌', title:'Faulty Burner Switch / Infinite Switch', desc:'The burner control switch regulates heat level. When it fails, the burner may not heat at all or only heat at full power.'},
      {icon:'💥', title:'Faulty Spark Module (Gas)', desc:'The spark module generates the spark when the igniter button is pressed. A failed module means no spark to any or one specific burner.'},
      {icon:'⚙️', title:'Faulty Gas Valve Solenoid', desc:'If the gas valve solenoid fails, gas won\'t flow to the burner even when the igniter is sparking correctly.'}
    ],
    faqs: [
      {q:'Why does only one burner not work on my stove?', a:'A single non-working burner usually indicates a burnt coil element (electric) or a clogged/faulty igniter (gas). These are typically cheap and quick repairs.'},
      {q:'How much does stove burner repair cost?', a:'Stove burner repair costs $70–$180. Coil element and igniter replacement are cheaper; burner switch or gas valve replacement costs more.'},
      {q:'My gas burner clicks but won\'t light — what should I do?', a:'Continuous clicking without ignition usually means the igniter is dirty or the gas flow is restricted. Dry and clean the igniter. If clicking stops when knob is released, the igniter is functioning normally — it\'s a gas supply issue.'},
      {q:'Can I replace a stove coil element myself?', a:'Yes — electric coil elements are plug-in replacements that require no tools. Simply lift the old element and plug in a new one of the same size.'},
      {q:'Is a stove burner that won\'t turn off dangerous?', a:'Yes — a burner that won\'t turn off indicates a faulty infinite switch and is a fire hazard. Stop using that burner immediately and call (437) 524-1053.'}
    ],
    steps: [
      {name:'Clean the igniter (gas)', text:'Turn off gas. Clean the igniter port with a dry toothbrush to remove food debris. Dry thoroughly before testing.'},
      {name:'Check the coil element (electric)', text:'For electric: unplug the element and look for burn marks. Swap with a working burner element to confirm if the element is the issue.'},
      {name:'Test other burners', text:'If all burners fail, the issue is the spark module or main power supply. If only one fails, it\'s that specific burner\'s component.'},
      {name:'Call a technician', text:'Call (437) 524-1053 for same-day stove repair. We carry igniter ports, coil elements, and spark modules for all major brands.'}
    ]
  },
  {
    filename: 'fridge-making-noise.html',
    title: 'Fridge Making Noise',
    service: SERVICES[0],
    problem: 'Making Noise',
    h1: 'Fridge <span>Making Noise?</span> Here\'s Why + How to Fix It',
    metaTitle: 'Fridge Making Noise — Causes & Fix | Toronto Same-Day Repair | Fixlify',
    metaDesc: 'Fridge making noise? Usually a faulty evaporator or condenser fan. Same-day repair in Toronto & GTA. Cost: $120–$220. Call (437) 524-1053.',
    answerBox: 'A fridge making noise is usually caused by a faulty evaporator fan motor or condenser fan motor. Cost to fix: $120–$220. Same-day repair available in Toronto & GTA. Call (437) 524-1053.',
    causes: [
      {icon:'🌀', title:'Faulty Evaporator Fan Motor', desc:'The evaporator fan in the freezer circulates cold air. When bearings wear, it produces buzzing, grinding, or rattling sounds, especially when the freezer door is opened.'},
      {icon:'⚙️', title:'Condenser Fan Motor Noise', desc:'The condenser fan at the back or bottom of the fridge can produce clicking or rattling sounds when debris gets caught in the blades or bearings wear.'},
      {icon:'💧', title:'Ice Maker Noise', desc:'Normal ice maker sounds include filling, freezing, and dropping ice. Louder knocking or buzzing can indicate a faulty ice maker module or water valve.'},
      {icon:'🔩', title:'Loose Compressor Mounts', desc:'The compressor sits on rubber vibration dampeners. When these wear, the compressor vibrates against the frame, producing buzzing or humming sounds.'},
      {icon:'❄️', title:'Defrost System Dripping', desc:'During the defrost cycle, ice melts and drips onto the defrost heater, creating normal sizzling or dripping sounds. Excessive noise can indicate defrost heater failure.'}
    ],
    faqs: [
      {q:'What does a normal fridge sound like?', a:'Normal fridge sounds include a steady hum from the compressor, occasional clicking of the thermostat, water trickling to the ice maker, and ice dropping. These are all normal.'},
      {q:'When should I worry about fridge noise?', a:'Worry about: loud grinding/squealing (fan motor), constant buzzing louder than normal (compressor), banging or knocking (loose components), or clicking that doesn\'t stop (relay failure).'},
      {q:'How much does fridge noise repair cost?', a:'Fridge noise repair typically costs $120–$220. Fan motor replacement is the most common repair. We provide upfront quotes before starting.'},
      {q:'My fridge buzzes loudly — is this the compressor?', a:'Loud buzzing is often the condenser fan motor with debris caught in the blades. Check the back of the fridge and clean any lint or debris. If buzzing continues, call us.'},
      {q:'How quickly can you fix a noisy fridge?', a:'Most noisy fridge repairs are completed same-day. We carry fan motors, relays, and other common parts for all major fridge brands.'}
    ],
    steps: [
      {name:'Identify when the noise occurs', text:'Note when the noise happens: always, during cooling cycles, when opening the freezer, or when making ice. This narrows the cause.'},
      {name:'Check the condenser fan area', text:'Pull the fridge from the wall and listen to the back. A noisy condenser fan is easy to locate. Clean any debris from the fan blades.'},
      {name:'Open the freezer and listen', text:'Open the freezer door — if the noise is louder with the freezer open, the evaporator fan motor is likely failing.'},
      {name:'Call a technician', text:'Call (437) 524-1053 for same-day diagnosis. We\'ll identify the noise source and replace the fan, relay, or other component.'}
    ]
  },
  {
    filename: 'fridge-leaking.html',
    title: 'Fridge Leaking Water',
    service: SERVICES[0],
    problem: 'Water Leaking',
    h1: 'Fridge <span>Leaking Water?</span> Here\'s Why + How to Fix It',
    metaTitle: 'Fridge Leaking Water — Causes & Fix | Toronto Same-Day Repair | Fixlify',
    metaDesc: 'Fridge leaking water? Usually a clogged defrost drain or damaged door seal. Same-day repair in Toronto & GTA. Cost: $100–$200. Call (437) 524-1053.',
    answerBox: 'A fridge leaking water is usually caused by a clogged defrost drain or damaged door seal (gasket). Cost to fix: $100–$200. Same-day repair available in Toronto & GTA. Call (437) 524-1053.',
    causes: [
      {icon:'🔍', title:'Clogged Defrost Drain', desc:'The defrost drain removes water from the defrost cycle. When clogged with debris or ice, water overflows and leaks onto the floor.'},
      {icon:'🚪', title:'Damaged Door Gasket / Seal', desc:'A worn or torn door seal allows warm air to enter, causing excess condensation and frost. When the frost melts, it drips outside the fridge.'},
      {icon:'💧', title:'Cracked or Disconnected Water Line', desc:'Fridges with ice makers have a water supply line. Cracks or loose connections cause water to pool under or behind the fridge.'},
      {icon:'❄️', title:'Frozen or Blocked Drain Pan', desc:'The drain pan collects condensation and usually evaporates naturally. If cracked or overflowing, it leaks onto the floor.'},
      {icon:'🔌', title:'Faulty Water Inlet Valve', desc:'A failing water inlet valve can drip continuously, causing leaks behind or underneath the fridge.'}
    ],
    faqs: [
      {q:'Why is my fridge leaking water on the floor?', a:'The most common cause is a clogged defrost drain at the back of the freezer compartment. It can often be cleared with warm water. If pooling comes from the back of the fridge, check the water line connection.'},
      {q:'How much does fridge leak repair cost?', a:'Fridge leak repair costs $100–$200. Drain clearing and gasket replacement are on the lower end; water valve or water line replacement is higher.'},
      {q:'Can I clear a clogged defrost drain myself?', a:'Yes — locate the drain hole at the back of the freezer, pour warm water to melt any ice blockage, and clean with a pipe cleaner. This is a common DIY fix.'},
      {q:'How do I know if my door seal is leaking?', a:'Test the door seal by closing the door on a piece of paper. If you can pull the paper out easily, the seal has lost its grip and needs replacing.'},
      {q:'Is a fridge water leak dangerous?', a:'It\'s a slip hazard and can damage flooring. If the leak is near electrical components at the back of the fridge, turn off the fridge and call us immediately.'}
    ],
    steps: [
      {name:'Check where the water is coming from', text:'Is it pooling inside the fridge, inside the freezer, under the fridge, or from the back? The source location identifies the cause.'},
      {name:'Clear the defrost drain', text:'At the back of the freezer, locate the drain hole. Pour warm water to melt any ice and use a pipe cleaner to clear debris.'},
      {name:'Check the door seal', text:'Close the door on a piece of paper and pull — if it slides out easily, the gasket needs replacing.'},
      {name:'Call a technician', text:'Call (437) 524-1053 for same-day fridge leak repair. We\'ll identify the exact source and repair it properly with a warranty.'}
    ]
  }
];

function genProblemPage(page) {
  const diagnosisItems = page.causes.map(c => `<div class="diagnosis-item glass-card">
  <div class="diagnosis-icon" aria-hidden="true">${c.icon}</div>
  <div class="diagnosis-text">
    <h4>${c.title}</h4>
    <p>${c.desc}</p>
  </div>
</div>`).join('\n');

  const diagnosisSection = `<div style="margin-top:32px;">
  <h3 style="font-family:var(--font-head);font-weight:700;font-size:20px;margin-bottom:6px;">
    Common Causes &amp; Diagnosis
  </h3>
  <div class="diagnosis-list">
    ${diagnosisItems}
  </div>
</div>`;

  const diyTable = `<div class="pricing-card glass-card" style="margin-top:32px;">
  <div class="pricing-card-header">
    <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;color:var(--text);">
      DIY vs. Professional Repair
    </h3>
  </div>
  <table class="pricing-table" aria-label="DIY vs Professional comparison">
    <thead>
      <tr>
        <th>Fix</th>
        <th>DIY Possible?</th>
        <th>Recommended</th>
        <th>Cost Range</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Filter / Drain Cleaning</td><td>Yes</td><td>DIY First</td><td class="price-val">Free</td></tr>
      <tr><td>Belt / Fuse Replacement</td><td>Experienced only</td><td>Professional</td><td class="price-val">$80–$150</td></tr>
      <tr><td>Fan Motor / Element</td><td>Not recommended</td><td>Professional</td><td class="price-val">$120–$250</td></tr>
      <tr><td>Control Board / Compressor</td><td>No</td><td>Professional</td><td class="price-val">$200–$400</td></tr>
    </tbody>
  </table>
</div>`;

  const contentIntro = `<h2>${page.title}: Diagnosis &amp; Repair Guide</h2>
<p>Is your ${page.title.toLowerCase()}? This guide walks you through the most common causes, how to diagnose the problem, and when to call a professional for same-day repair in Toronto &amp; GTA.</p>
<p>Most ${page.title.toLowerCase()} issues can be diagnosed quickly and repaired same-day by our licensed technicians. We serve all of Toronto, Mississauga, Scarborough, North York, and surrounding areas.</p>
${diagnosisSection}
${diyTable}`;

  const faqItems = page.faqs.map(f => faqItem(f.q, f.a)).join('\n');

  const schemaFaqs = page.faqs.slice(0,4);

  const breadcrumb = [
    breadcrumbItem(1, 'Home', '/'),
    breadcrumbItem(2, page.title, null)
  ].join('\n');

  const vars = {
    META_TITLE: page.metaTitle,
    META_DESC: page.metaDesc,
    CANONICAL: `${BASE_URL}/${page.filename}`,
    SCHEMA_JSON: schemaFaqHowTo(page.title, schemaFaqs, page.steps),
    PAGE_TYPE: 'problem',
    PAGE_TYPE_LABEL: 'Problem Diagnosis',
    H1: page.h1,
    ANSWER_BOX: page.answerBox,
    CONTENT_INTRO: contentIntro,
    SERVICE_NAME: page.service.name,
    CITY_NAME: 'Toronto &amp; GTA',
    FAQ_ITEMS: faqItems,
    RELATED_SERVICES: SERVICES.map(s => `<a href="/${s.slug}-repair-toronto.html" class="related-card glass-card">
    <div class="related-card-label">Service</div>
    <div class="related-card-title">${s.name} Repair</div>
  </a>`).join('\n'),
    RELATED_CITIES: CITIES_TOP10.slice(0,6).map(c => `<a href="/${page.service.slug}-repair-${c.slug}.html" class="related-card glass-card">
    <div class="related-card-label">Location</div>
    <div class="related-card-title">${c.name}</div>
  </a>`).join('\n'),
    BREADCRUMB: breadcrumb
  };

  write(page.filename, fill(template, vars));
}

// --- 4. BRAND PAGES ---

function genBrandPage(brand) {
  const filename = `${brand.slug}-appliance-repair.html`;

  const repairList = brand.commonRepairs.map(r =>
    `<li>${r.charAt(0).toUpperCase() + r.slice(1)}</li>`
  ).join('\n');

  const allServicesTable = SERVICES.map(s => `<tr>
    <td>${s.name}</td>
    <td>${brand.name} all models</td>
    <td class="price-val">${s.price}</td>
  </tr>`).join('\n');

  const contentIntro = `<h2>${brand.name} Appliance Repair — All Models Covered</h2>
<p>${brand.name} appliances are known for ${brand.specialty}. When your ${brand.name} appliance needs repair, our certified technicians have the specialized knowledge and genuine parts to fix it right the first time.</p>
<p>We repair ${brand.name} refrigerators, washers, dryers, dishwashers, ovens, and stoves. All models covered. Same-day service available across Toronto and the GTA.</p>
<h3>Common ${brand.name} Repairs We Handle</h3>
<ul>
  ${repairList}
</ul>
<div class="pricing-card glass-card" style="margin-top:32px;">
  <div class="pricing-card-header">
    <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;color:var(--text);">
      ${brand.name} Appliance Repair Pricing
    </h3>
  </div>
  <table class="pricing-table" aria-label="${brand.name} repair pricing">
    <thead>
      <tr>
        <th>Appliance</th>
        <th>Models</th>
        <th>Typical Cost</th>
      </tr>
    </thead>
    <tbody>
      ${allServicesTable}
    </tbody>
  </table>
</div>`;

  const faqs = [
    {q:`Do you repair all ${brand.name} models?`, a:`Yes — we repair all current and discontinued ${brand.name} models. Our technicians receive regular training on ${brand.name} appliances and we stock genuine and OEM-compatible parts.`},
    {q:`Where can I get ${brand.name} appliance repair in Toronto?`, a:`Fixlify Appliance Services provides ${brand.name} repair across Toronto and the GTA. Book online or call (437) 524-1053 for same-day service.`},
    {q:`How much does ${brand.name} appliance repair cost?`, a:`${brand.name} appliance repair costs $100–$400 depending on the appliance and repair type. We provide upfront quotes before starting any work. 90-day warranty included.`},
    {q:`Is it worth repairing a ${brand.name} appliance?`, a:`${brand.name} appliances are high quality — repair is almost always worth it, especially for models under 10 years old. Our technicians will give you an honest assessment.`},
    {q:`Do you use genuine ${brand.name} parts?`, a:`We use genuine ${brand.name} parts when available. For some repairs, we use OEM-compatible parts that meet the same specifications and quality standards.`},
    {q:`How quickly can you fix my ${brand.name} appliance?`, a:`Most ${brand.name} appliance repairs are completed same-day. We arrive within 2–4 hours of booking and carry common parts for ${brand.name} appliances in our service vehicles.`}
  ];

  const faqItems = faqs.map(f => faqItem(f.q, f.a)).join('\n');

  const breadcrumb = [
    breadcrumbItem(1, 'Home', '/'),
    breadcrumbItem(2, 'Brand Repairs', null),
    breadcrumbItem(3, `${brand.name} Repair`, null)
  ].join('\n');

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Fixlify Appliance Services",
        "telephone": "+14375241053",
        "url": "https://fixlifyservices.com",
        "address": {"@type":"PostalAddress","addressLocality":"Toronto","addressRegion":"Ontario","addressCountry":"CA"},
        "aggregateRating": {"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"5200"}
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.slice(0,4).map(f => ({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))
      }
    ]
  }, null, 2);

  const vars = {
    META_TITLE: `${brand.name} Appliance Repair Toronto & GTA — All Models | Fixlify`,
    META_DESC: `Certified ${brand.name} appliance repair in Toronto & GTA. We fix all ${brand.name} models — refrigerators, washers, dryers, dishwashers, ovens. Same-day service, 90-day warranty.`,
    CANONICAL: `${BASE_URL}/${filename}`,
    SCHEMA_JSON: schema,
    PAGE_TYPE: 'service',
    PAGE_TYPE_LABEL: 'Brand Specialist',
    H1: `${brand.name} Appliance Repair <span>Toronto &amp; GTA</span> — All Models`,
    ANSWER_BOX: `${brand.name} appliance repair by certified technicians across GTA. We fix all ${brand.name} models including refrigerators, washers, dryers, dishwashers, and ovens. Same-day service, 90-day warranty. Specialty: ${brand.specialty}.`,
    CONTENT_INTRO: contentIntro,
    SERVICE_NAME: `${brand.name} Appliance`,
    CITY_NAME: 'Toronto &amp; GTA',
    FAQ_ITEMS: faqItems,
    RELATED_SERVICES: SERVICES.map(s => `<a href="/${s.slug}-repair-toronto.html" class="related-card glass-card">
    <div class="related-card-label">Service</div>
    <div class="related-card-title">${s.name} Repair</div>
  </a>`).join('\n'),
    RELATED_CITIES: CITIES_TOP10.slice(0,6).map(c => `<a href="/appliance-repair-${c.slug}.html" class="related-card glass-card">
    <div class="related-card-label">Location</div>
    <div class="related-card-title">${c.name}</div>
  </a>`).join('\n'),
    BREADCRUMB: breadcrumb
  };

  write(filename, fill(template, vars));
}

// --- 5. EMERGENCY × CITY PAGES ---

const EMERGENCY_PAGES = [
  {filename:'emergency-fridge-repair-toronto.html', service:SERVICES[0], city:CITIES_TOP10[0], type:'emergency', label:'Emergency'},
  {filename:'emergency-fridge-repair-mississauga.html', service:SERVICES[0], city:CITIES_TOP10[1], type:'emergency', label:'Emergency'},
  {filename:'emergency-washer-repair-toronto.html', service:SERVICES[1], city:CITIES_TOP10[0], type:'emergency', label:'Emergency'},
  {filename:'emergency-washer-repair-mississauga.html', service:SERVICES[1], city:CITIES_TOP10[1], type:'emergency', label:'Emergency'},
  {filename:'same-day-appliance-repair-brampton.html', service:null, city:CITIES_TOP10[2], type:'sameday', label:'Same-Day'},
  {filename:'same-day-appliance-repair-markham.html', service:null, city:CITIES_TOP10[8], type:'sameday', label:'Same-Day'},
  {filename:'same-day-appliance-repair-scarborough.html', service:null, city:CITIES_TOP10[3], type:'sameday', label:'Same-Day'},
  {filename:'same-day-appliance-repair-north-york.html', service:null, city:CITIES_TOP10[4], type:'sameday', label:'Same-Day'}
];

function genEmergencyPage(page) {
  const isEmergency = page.type === 'emergency';
  const serviceName = page.service ? page.service.name : 'Appliance';
  const serviceSlug = page.service ? page.service.slug : 'appliance';
  const priceRange = page.service ? page.service.price : '$100–$400';

  const urgencyBlock = `<div class="glass-card" style="border-left:3px solid #FF4444;padding:20px 22px;margin-top:32px;background:rgba(255,68,68,0.05);">
  <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#FF4444;margin-bottom:8px;">URGENT — ACT NOW</div>
  <p style="font-size:15px;color:var(--text);line-height:1.7;margin:0;">
    ${isEmergency ? `A broken ${serviceName.toLowerCase()} can cause food spoilage, water damage, or other costly problems within hours. Our emergency technicians are available today — call <strong>(437) 524-1053</strong> for fastest response.` : `Same-day ${serviceName.toLowerCase()} repair is available in ${page.city.name} today. Book before noon for guaranteed same-day service. Call <strong>(437) 524-1053</strong> or book online above.`}
  </p>
</div>`;

  const processSteps = `<h3>How Our ${isEmergency ? 'Emergency' : 'Same-Day'} Service Works</h3>
<ol>
  <li><strong>Call or Book Online:</strong> Call (437) 524-1053 or use the booking form above. We confirm your appointment within minutes.</li>
  <li><strong>Fast Dispatch:</strong> We dispatch the nearest available technician to ${page.city.name}. ${isEmergency ? 'Emergency arrivals within 2–4 hours.' : 'Same-day slots fill up — book early for best availability.'}</li>
  <li><strong>On-Site Diagnosis:</strong> Technician arrives fully equipped, diagnoses the problem, and provides an upfront quote.</li>
  <li><strong>Repair Completed:</strong> Most repairs finished in the same visit. 90-day warranty on all work.</li>
</ol>`;

  const servicesList = SERVICES.map(s => `<tr>
    <td>${s.name}</td>
    <td class="price-val">${s.price}</td>
    <td>All brands, same-day</td>
  </tr>`).join('\n');

  const servicesTable = `<div class="pricing-card glass-card" style="margin-top:32px;">
  <div class="pricing-card-header">
    <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;color:var(--text);">
      ${isEmergency ? 'Emergency' : 'Same-Day'} Repair Services in ${page.city.name}
    </h3>
  </div>
  <table class="pricing-table" aria-label="Emergency repair services">
    <thead>
      <tr>
        <th>Appliance</th>
        <th>Typical Cost</th>
        <th>Availability</th>
      </tr>
    </thead>
    <tbody>
      ${servicesList}
    </tbody>
  </table>
</div>`;

  const contentIntro = `<h2>${isEmergency ? 'Emergency' : 'Same-Day'} ${serviceName} Repair in ${page.city.name}</h2>
<p>When your ${serviceName.toLowerCase()} breaks down${isEmergency ? ' unexpectedly' : ''}, you can\'t afford to wait days for a repair. Fixlify Appliance Services provides ${isEmergency ? 'emergency' : 'same-day'} ${serviceName.toLowerCase()} repair across ${page.city.name} and ${page.city.region}.</p>
<p>Our licensed technicians are available today with 2–4 hour arrival windows. We carry the most common replacement parts in our service vehicles for fast, single-visit repairs. 90-day warranty on all work.</p>
${urgencyBlock}
${processSteps}
${servicesTable}`;

  const faqs = [
    {q:`Do you offer emergency ${serviceName.toLowerCase()} repair in ${page.city.name}?`, a:`Yes — we offer ${isEmergency ? 'emergency and' : ''} same-day ${serviceName.toLowerCase()} repair in ${page.city.name}. Call (437) 524-1053 for fastest response. Technicians available today.`},
    {q:`How quickly can a technician arrive in ${page.city.name}?`, a:`Our technicians typically arrive within 2–4 hours of booking in ${page.city.name} and ${page.city.region}. Call early for the fastest same-day slots.`},
    {q:`Is there an extra charge for emergency or same-day service?`, a:`We do not charge emergency premiums. Our pricing is the same for same-day and regular bookings: ${priceRange} for most repairs. Upfront quotes before any work begins.`},
    {q:`What ${serviceName.toLowerCase()} brands do you repair in ${page.city.name}?`, a:`We repair all brands in ${page.city.name} including LG, Samsung, Whirlpool, GE, Bosch, Frigidaire, Maytag, and more. All models covered.`},
    {q:`Do you offer a warranty on emergency repairs?`, a:`Yes — all repairs come with a 90-day warranty on parts and labour, whether booked as emergency, same-day, or regular service.`},
    {q:`What should I do while waiting for the technician?`, a:`${page.service && page.service.slug === 'fridge' ? 'Transfer perishables to a cooler with ice. Keep the fridge closed to maintain temperature longer.' : 'Avoid using the appliance until the technician arrives to prevent further damage.'} Call us if you need urgent guidance: (437) 524-1053.`}
  ];

  const faqItems = faqs.map(f => faqItem(f.q, f.a)).join('\n');

  const breadcrumb = [
    breadcrumbItem(1, 'Home', '/'),
    breadcrumbItem(2, `${isEmergency ? 'Emergency' : 'Same-Day'} Repair`, null),
    breadcrumbItem(3, page.city.name, null)
  ].join('\n');

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Fixlify Appliance Services",
        "telephone": "+14375241053",
        "url": "https://fixlifyservices.com",
        "address": {"@type":"PostalAddress","addressLocality":page.city.name,"addressRegion":"Ontario","addressCountry":"CA"},
        "aggregateRating": {"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"5200"},
        "openingHours": ["Mo-Sa 08:00-20:00","Su 09:00-18:00"]
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.slice(0,4).map(f => ({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))
      }
    ]
  }, null, 2);

  const h1Title = isEmergency
    ? `Emergency <span>${serviceName} Repair</span> in ${page.city.name} — Call Now`
    : `Same-Day <span>Appliance Repair</span> in ${page.city.name} — Book Today`;

  const answerBox = isEmergency
    ? `Emergency ${serviceName.toLowerCase()} repair in ${page.city.name} available today. Call (437) 524-1053 for same-day service. Technicians arrive within 2–4 hours. Cost: ${priceRange}. 90-day warranty.`
    : `Same-day appliance repair in ${page.city.name} available today. We fix fridges, washers, dryers, dishwashers, ovens, and stoves. Call (437) 524-1053. Technicians arrive within 2–4 hours. 90-day warranty.`;

  const vars = {
    META_TITLE: isEmergency
      ? `Emergency ${serviceName} Repair ${page.city.name} — Same-Day | Fixlify`
      : `Same-Day Appliance Repair ${page.city.name} | Fixlify`,
    META_DESC: isEmergency
      ? `Emergency ${serviceName.toLowerCase()} repair in ${page.city.name}. Licensed technicians available today. 2–4 hour arrival. Cost: ${priceRange}. 90-day warranty. Call (437) 524-1053.`
      : `Same-day appliance repair in ${page.city.name}. Fridge, washer, dryer, dishwasher, oven & stove repair. 2–4 hour arrival. 90-day warranty. Call (437) 524-1053.`,
    CANONICAL: `${BASE_URL}/${page.filename}`,
    SCHEMA_JSON: schema,
    PAGE_TYPE: 'emergency',
    PAGE_TYPE_LABEL: `${page.label} Service`,
    H1: h1Title,
    ANSWER_BOX: answerBox,
    CONTENT_INTRO: contentIntro,
    SERVICE_NAME: serviceName,
    CITY_NAME: page.city.name,
    FAQ_ITEMS: faqItems,
    RELATED_SERVICES: SERVICES.map(s => `<a href="/${s.slug}-repair-${page.city.slug}.html" class="related-card glass-card">
    <div class="related-card-label">Service</div>
    <div class="related-card-title">${s.name} Repair</div>
  </a>`).join('\n'),
    RELATED_CITIES: CITIES_TOP10.filter(c => c.slug !== page.city.slug).slice(0,6).map(c => `<a href="/emergency-${serviceSlug}-repair-${c.slug}.html" class="related-card glass-card">
    <div class="related-card-label">Location</div>
    <div class="related-card-title">${c.name}</div>
  </a>`).join('\n'),
    BREADCRUMB: breadcrumb
  };

  write(page.filename, fill(template, vars));
}

// ============================================================
// MAIN — RUN ALL GENERATORS
// ============================================================

console.log('\n=== Fixlify Page Generator ===\n');

let count = 0;

// 1. Service × City (60 pages)
console.log('--- Generating 60 service×city pages ---');
for (const service of SERVICES) {
  for (const city of CITIES_TOP10) {
    genServiceCity(service, city);
    count++;
  }
}

// 2. Cost Guide pages (10 pages)
console.log('\n--- Generating 10 cost guide pages ---');
for (const page of COST_PAGES) {
  genCostPage(page);
  count++;
}

// 3. Problem Diagnosis pages (10 pages)
console.log('\n--- Generating 10 problem diagnosis pages ---');
for (const page of PROBLEM_PAGES) {
  genProblemPage(page);
  count++;
}

// 4. Brand pages (6 pages)
console.log('\n--- Generating 6 brand pages ---');
for (const brand of BRANDS) {
  genBrandPage(brand);
  count++;
}

// 5. Emergency × City pages (8 pages)
console.log('\n--- Generating 8 emergency×city pages ---');
for (const page of EMERGENCY_PAGES) {
  genEmergencyPage(page);
  count++;
}

console.log(`\n=== DONE: ${count} pages generated ===\n`);

// Verify: check for unreplaced template variables
console.log('--- Verifying: checking for unreplaced {{VARIABLES}} ---');
let issues = 0;
const htmlFiles = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.html') && f !== 'service-template.html');
for (const f of htmlFiles) {
  const content = fs.readFileSync(path.join(OUT_DIR, f), 'utf8');
  const matches = content.match(/\{\{[A-Z_]+\}\}/g);
  if (matches) {
    console.log(`  WARN: ${f} has unreplaced vars: ${[...new Set(matches)].join(', ')}`);
    issues++;
  }
}
if (issues === 0) {
  console.log('  All pages: 0 unreplaced variables. PASS.');
}
console.log('');
