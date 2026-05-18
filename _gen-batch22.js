const fs = require('fs');

const neighborhoods = [
  {
    slug: 'south-terwillegar',
    display: 'South Terwillegar',
    postal: 'T6W',
    region: 'SW Edmonton',
    travel: '25–30 min from downtown via 23rd Avenue and 170 Street',
    route: '23rd Avenue and 170 Street',
    brand_chips: ['Bosch','Whirlpool','LG','Samsung','Frigidaire','GE','Maytag','KitchenAid'],
    para: 'South Terwillegar is a 2005–2015 family suburb in southwest Edmonton along 23rd Avenue SW and Rabbit Hill Road, where predominantly two-storey family homes were built with mid-range appliance packages — Whirlpool, Frigidaire, and LG dishwashers are common, now hitting the 10–20 year mid-life failure window. Drain pump seals degrade, heating elements burn out, and spray arm mineral scale becomes a cleaning issue at this age. Edmonton\'s EPCOR water supply at 170–200 mg/L hardness throughout South Terwillegar accelerates calcium build-up in filters and spray nozzles. Our Fixlify technicians reach South Terwillegar in approximately 25–30 minutes from our 10025 102A Avenue NW hub via 23rd Avenue and 170 Street. We stock OEM drain pumps and heating elements for the Whirlpool, LG, and Frigidaire platforms most common in this neighbourhood, enabling same-day resolution on the majority of calls. Common dishwasher brands in South Terwillegar include Bosch, Whirlpool, and LG, with Bosch E24 drain faults and Whirlpool F2E2 control errors among the top fault codes we diagnose in this area.',
    faq1_q: 'How fast can you reach South Terwillegar?',
    faq1_a: 'Approximately 25–30 minutes from our Edmonton hub via 23rd Avenue and 170 Street. Same-day service when you book before 12 PM Monday–Saturday. Sunday crew available 10 AM–6 PM Mountain Time.',
    faq2_q: 'What dishwasher brands do you service in South Terwillegar?',
    faq2_a: 'Whirlpool, Frigidaire, LG, Samsung, and Bosch are most common in South Terwillegar. We carry OEM parts for all major brands and can order specialty parts same-day from Edmonton suppliers.'
  },
  {
    slug: 'tamarack',
    display: 'Tamarack',
    postal: 'T6T',
    region: 'SE Edmonton',
    travel: '30–35 min from downtown via Whitemud Drive and 66 Street',
    route: 'Whitemud Drive and 66 Street South',
    brand_chips: ['Bosch','LG','Samsung','Whirlpool','GE','Maytag','Frigidaire','KitchenAid'],
    para: 'Tamarack is a 2010s-plus new-build family neighbourhood in the southeastern Meadows area of Edmonton, with streets like Tamarack Boulevard running through recently developed subdivisions. Homes here were built with newer appliance packages — LG, Samsung, and Bosch dishwashers dominate the brand mix, typically 5–15 years old and approaching their first major repair cycle. Edmonton\'s EPCOR water supply at 170–200 mg/L hardness is a constant factor: even in newer Tamarack homes, mineral scale builds up in spray arm nozzles and filters over 5–8 years, reducing cleaning performance noticeably. Bosch integrated dishwashers with E15 error codes and LG units showing drain pump issues are the most frequently reported faults in Tamarack. Our Fixlify technicians reach Tamarack in approximately 30–35 minutes from our 10025 102A Avenue NW hub via Whitemud Drive and 66 Street South. We stock the LG and Bosch OEM parts most frequently needed for same-day repair resolution. Inlet valve failures and door latch issues round out the top repair types we see in this 2010s Meadows neighbourhood.',
    faq1_q: 'How fast can you reach Tamarack?',
    faq1_a: 'Approximately 30–35 minutes from our Edmonton hub via Whitemud Drive and 66 Street South. Same-day service when you book before 12 PM Monday–Saturday. Sunday crew available 10 AM–6 PM Mountain Time.',
    faq2_q: 'Do you repair LG and Samsung dishwashers in Tamarack?',
    faq2_a: 'Yes — LG, Samsung, and Bosch are the most common brands we service in Tamarack. We carry OEM parts for these platforms as standard truck stock for SE Edmonton dispatches.'
  },
  {
    slug: 'the-hamptons',
    display: 'The Hamptons',
    postal: 'T5T',
    region: 'West Edmonton',
    travel: '25–30 min from downtown via Stony Plain Road and 215 Street',
    route: 'Stony Plain Road and 215 Street',
    brand_chips: ['Bosch','KitchenAid','Miele','LG','Samsung','GE','JennAir','Electrolux'],
    para: 'The Hamptons is a 2000s upscale family suburb in west Edmonton, developed along 215 Street and Hamptons Drive with large two-storey homes featuring full premium kitchen packages. The neighbourhood\'s demographic skews toward high-income families who installed Bosch, KitchenAid, and Miele dishwashers at build — units now 15–25 years old and entering a high-failure-rate window. Built-in panel-ready dishwashers are common throughout The Hamptons, requiring technicians with experience accessing integrated units in finished cabinetry. Edmonton\'s EPCOR water at 170–200 mg/L hardness has had two-plus decades to calcify The Hamptons\' Miele and Bosch spray arms, making descale combined with drain pump or circulation motor repair the most common multi-component job we perform here. Our Fixlify technicians travel from our 10025 102A Avenue NW hub, reaching The Hamptons in 25–30 minutes via Stony Plain Road and 215 Street. We stock Bosch, KitchenAid, and Miele OEM parts specifically for west Edmonton upscale dispatches. Circulation motor failure and inlet valve degradation are common in 20+ year Miele units throughout The Hamptons.',
    faq1_q: 'How fast can you reach The Hamptons?',
    faq1_a: 'Approximately 25–30 minutes from our Edmonton hub via Stony Plain Road and 215 Street. Same-day service when you book before 12 PM Monday–Saturday. Sunday crew available 10 AM–6 PM Mountain Time.',
    faq2_q: 'Do you repair Miele and KitchenAid dishwashers in The Hamptons?',
    faq2_a: 'Yes — Bosch, Miele, and KitchenAid are among the most common dishwasher brands we service in The Hamptons. We carry OEM parts for these premium platforms and handle integrated panel-ready installs.'
  },
  {
    slug: 'keswick',
    display: 'Keswick',
    postal: 'T6W',
    region: 'SW Edmonton',
    travel: '30–35 min from downtown via Anthony Henday Drive and 170 Street',
    route: 'Anthony Henday Drive and 170 Street South',
    brand_chips: ['Bosch','LG','Samsung','Whirlpool','KitchenAid','GE','Frigidaire','Miele'],
    para: 'Keswick is a 2015-plus Windermere family neighbourhood in southwest Edmonton, developed along Keswick Drive and 170 Street with newer semi-custom and production homes featuring modern kitchen packages. At 5–10 years old, Keswick\'s dishwashers are at the early-to-mid-life stage where the first round of component failures begins — inlet valve failures, door latch micro-switch issues, and Bosch E24 error codes are the most reported faults. Many Keswick homes were built with Bosch or Samsung dishwashers as standard builder packages. Edmonton\'s EPCOR water at 170–200 mg/L hardness affects even newer Keswick units: spray arm nozzle scale and filter clogging start showing up by year 5–7 in hard-water zones without softeners. Our Fixlify technicians dispatch from 10025 102A Avenue NW and reach Keswick in approximately 30–35 minutes via Anthony Henday Drive and 170 Street South. We carry OEM parts for Bosch and Samsung — the most frequently serviced brands in Keswick — for same-day repair resolution. Samsung leak sensor trips and Bosch circulation pump faults are also commonly reported by Keswick residents.',
    faq1_q: 'How fast can you reach Keswick?',
    faq1_a: 'Approximately 30–35 minutes from our Edmonton hub via Anthony Henday Drive and 170 Street South. Same-day service when you book before 12 PM Monday–Saturday. Sunday crew available 10 AM–6 PM Mountain Time.',
    faq2_q: 'My new Bosch dishwasher in Keswick is showing an E24 error — can you fix it?',
    faq2_a: 'Yes — Bosch E24 (drain issue) is one of the most common fault codes we resolve in Keswick and surrounding Windermere-area homes. We carry OEM drain pump and filter assemblies for same-day repair.'
  },
  {
    slug: 'allard',
    display: 'Allard',
    postal: 'T6W',
    region: 'SW Edmonton',
    travel: '30–35 min from downtown via Anthony Henday Drive and 111 Street',
    route: 'Anthony Henday Drive and 111 Street South',
    brand_chips: ['Bosch','LG','Samsung','Whirlpool','GE','Frigidaire','Maytag','KitchenAid'],
    para: 'Allard is a 2010s Heritage Valley family suburb in southwest Edmonton, developed along Allard Boulevard and 111 Street SW with medium-to-large family homes in a planned community setting. Homes here were typically built with mid-to-premium appliance packages — LG, Whirlpool, and Bosch dishwashers are the predominant brands across Allard\'s housing stock, now 10–15 years old and entering a prime failure window. Drain pump seal wear, heating element failure, and spray arm mineral scale are the most common issues at this appliance age. Edmonton\'s EPCOR water supply reaches Allard at 170–200 mg/L hardness, meaning dishwasher filters and spray arms in homes without water softeners show significant calcium build-up by the 8–10 year mark. Our Fixlify technicians dispatch from our Edmonton hub at 10025 102A Avenue NW and reach Allard in approximately 30–35 minutes via Anthony Henday Drive and 111 Street South, carrying OEM parts for the LG, Whirlpool, and Bosch platforms most common in Heritage Valley builds. Samsung dishwashers with OE error codes and LG units with drain pump failures are also frequent Allard repair calls.',
    faq1_q: 'How fast can you reach Allard?',
    faq1_a: 'Approximately 30–35 minutes from our Edmonton hub via Anthony Henday Drive and 111 Street South. Same-day service when you book before 12 PM Monday–Saturday. Sunday crew available 10 AM–6 PM Mountain Time.',
    faq2_q: 'What dishwasher problems are most common in Allard?',
    faq2_a: 'Drain pump seal wear, heating element failure, and spray arm mineral scale are the most common issues in Allard\'s 10–15 year-old dishwashers. EPCOR hard water at 170–200 mg/L accelerates filter clogging in Heritage Valley homes.'
  },
  {
    slug: 'belmont',
    display: 'Belmont',
    postal: 'T5A',
    region: 'NE Edmonton',
    travel: '20–25 min from downtown via 97 Street and 167 Avenue',
    route: '97 Street North and 167 Avenue',
    brand_chips: ['Whirlpool','Maytag','GE','Samsung','LG','Frigidaire','Bosch','KitchenAid'],
    para: 'Belmont is a 1980s family neighbourhood in the Clareview area of northeast Edmonton, with residential streets running off 167 Avenue and 97 Street. Homes here were built throughout the 1980s with standard-era appliance packages — Whirlpool, Maytag, and GE dishwashers were the dominant brands installed at build. By 2025, many Belmont households have cycled through at least one appliance replacement, meaning both 1990s-2000s replacements and more recent Samsung and LG units coexist in the neighbourhood. The 35–45 year-old housing stock often features original kitchen layouts with non-standard under-counter clearances that can complicate dishwasher access. Edmonton\'s EPCOR water at 170–200 mg/L hardness has had decades to impact older Belmont dishwashers through mineral scale on pump housings and spray arms. Our Fixlify technicians dispatch from 10025 102A Avenue NW and reach Belmont in approximately 20–25 minutes via 97 Street North and 167 Avenue, carrying OEM parts for the Whirlpool, GE, Samsung, and LG brands most commonly serviced in this area. Drain pump replacement and door gasket repair are the top two jobs in Belmont.',
    faq1_q: 'How fast can you reach Belmont?',
    faq1_a: 'Approximately 20–25 minutes from our Edmonton hub via 97 Street North and 167 Avenue. Same-day service when you book before 12 PM Monday–Saturday. Sunday crew available 10 AM–6 PM Mountain Time.',
    faq2_q: 'Do you service older Whirlpool and Maytag dishwashers in Belmont?',
    faq2_a: 'Yes — Whirlpool, Maytag, and GE are among the most commonly repaired dishwasher brands in Belmont. We stock OEM and quality aftermarket parts for older platforms where original parts remain available.'
  },
  {
    slug: 'central-mcdougall',
    display: 'Central McDougall',
    postal: 'T5G',
    region: 'Central Edmonton',
    travel: '8–12 min from our hub via 105 Street and 111 Avenue',
    route: '105 Street and 111 Avenue',
    brand_chips: ['Bosch','LG','Samsung','Whirlpool','GE','Frigidaire','Maytag','KitchenAid'],
    para: 'Central McDougall is a mature central Edmonton neighbourhood west of 101 Street, bounded by 111 Avenue and 118 Avenue, featuring a diverse mix of pre-1960 character homes, 1970s–1990s infill, and newer condo developments. The housing diversity produces a broad appliance profile: original character homes with post-renovation Bosch or LG dishwashers sit alongside newer condos with compact integrated units. Rental properties are common throughout Central McDougall, driving a higher-than-average repair frequency — landlords call us for same-day diagnosis on older Whirlpool, GE, and Samsung dishwashers. Edmonton\'s EPCOR water at 170–200 mg/L hardness affects all Central McDougall units regardless of age, with spray arm mineral scale and filter clogging the most consistent complaint across the neighbourhood. Our Fixlify hub at 10025 102A Avenue NW is approximately 8–12 minutes from Central McDougall, making this one of our fastest-response neighbourhoods for same-day dishwasher repair. We service everything from 15-year-old GE units in heritage character homes to brand-new Bosch integrated dishwashers in Central McDougall condo buildings.',
    faq1_q: 'How fast can you reach Central McDougall?',
    faq1_a: 'Approximately 8–12 minutes from our Edmonton hub via 105 Street and 111 Avenue. Central McDougall is one of our closest service areas — same-day service when you book before 12 PM Monday–Saturday.',
    faq2_q: 'Do you repair dishwashers in rental properties in Central McDougall?',
    faq2_a: 'Yes — we work with both homeowners and landlords throughout Central McDougall. Same-day scheduling, written quotes, and 90-day warranty make us a reliable partner for property managers.'
  },
  {
    slug: 'queen-mary-park',
    display: 'Queen Mary Park',
    postal: 'T5H',
    region: 'Central Edmonton',
    travel: '10–14 min from our hub via 107 Avenue and 97 Street',
    route: '107 Avenue and 97 Street',
    brand_chips: ['Whirlpool','GE','LG','Samsung','Bosch','Maytag','Frigidaire','KitchenAid'],
    para: 'Queen Mary Park is a mature central Edmonton neighbourhood east of downtown, bounded roughly by 107 Avenue and 118 Avenue between 95 Street and 101 Street. The area features a mix of pre-war character homes, 1950s–1970s infill housing, and newer townhouse and condo developments driven by gentrification and urban intensification. Like Central McDougall to its west, Queen Mary Park has a significant rental property proportion, which sustains steady demand for dishwasher repair rather than replacement — particularly for Whirlpool, GE, and older Samsung units. Edmonton\'s EPCOR hard water at 170–200 mg/L has had decades to impact older Queen Mary Park dishwashers, with mineral scale inside pump housings and on spray arm surfaces a near-universal finding in units over 10 years old. Our Fixlify technicians are approximately 10–14 minutes from Queen Mary Park from our 10025 102A Avenue NW hub, making same-day afternoon service slots highly reliable for residents who call before noon on weekdays. Drain pump blockage and heating element failure are the two most common repair types in Queen Mary Park dishwasher calls.',
    faq1_q: 'How fast can you reach Queen Mary Park?',
    faq1_a: 'Approximately 10–14 minutes from our Edmonton hub via 107 Avenue and 97 Street. Same-day service when you book before 12 PM Monday–Saturday. Sunday crew available 10 AM–6 PM Mountain Time.',
    faq2_q: 'Do you repair dishwashers in older Queen Mary Park homes?',
    faq2_a: 'Yes — we service all housing eras in Queen Mary Park, from pre-war character homes with post-renovation dishwashers to newer condo installs. We carry OEM parts for Whirlpool, GE, LG, and Samsung — the most common brands in this neighbourhood.'
  },
  {
    slug: 'montrose',
    display: 'Montrose',
    postal: 'T5W',
    region: 'NE Edmonton',
    travel: '15–20 min from downtown via 82 Street and 118 Avenue',
    route: '82 Street and 118 Avenue',
    brand_chips: ['Whirlpool','Maytag','GE','LG','Samsung','Bosch','Frigidaire','KitchenAid'],
    para: 'Montrose is a mature pre-1950s family neighbourhood in northeast Edmonton, situated between 82 Street and 92 Street along 118 Avenue. The area\'s character homes and 1960s–1970s infill stock create a classic older-Edmonton appliance profile: many homes have had two or three dishwasher generations installed over the decades, with the current crop often being 10–20 year-old Whirlpool, Maytag, GE, and Samsung units. Drain pump failure and heating element burnout are the most common repairs we perform in Montrose, reflecting the mid-life-to-end-of-life appliance age range in this neighbourhood. Edmonton\'s EPCOR water at 170–200 mg/L hardness has had particular impact in Montrose, where homes without water softeners show heavy mineral scale inside dishwasher pump housings, filters, and spray arm nozzles by the 10-year mark. Infill construction has also added newer homes with Bosch and LG installs alongside the legacy stock, creating a diverse service mix. Our Fixlify technicians reach Montrose in approximately 15–20 minutes from our 10025 102A Avenue NW hub via 82 Street and 118 Avenue. Control board failures and circulation motor wear are also frequent Montrose repair items.',
    faq1_q: 'How fast can you reach Montrose?',
    faq1_a: 'Approximately 15–20 minutes from our Edmonton hub via 82 Street and 118 Avenue. Same-day service when you book before 12 PM Monday–Saturday. Sunday crew available 10 AM–6 PM Mountain Time.',
    faq2_q: 'Do you repair older Whirlpool and Maytag dishwashers in Montrose?',
    faq2_a: 'Yes — Whirlpool and Maytag are among the most frequently repaired dishwasher brands in Montrose. We stock OEM and quality aftermarket parts for these platforms, and can order specialty parts from Edmonton suppliers same-day.'
  }
];

const serviceTypes = [
  { type: 'dishwasher', label: 'Dishwasher', svcSlug: 'dishwasher-repair', costRange: '$120–$380' },
  { type: 'washer', label: 'Washer', svcSlug: 'washer-repair', costRange: '$130–$400' },
  { type: 'fridge', label: 'Fridge', svcSlug: 'fridge-repair', costRange: '$150–$500' }
];

const otherMap = { dishwasher: 'washer,fridge', washer: 'dishwasher,fridge', fridge: 'dishwasher,washer' };
const otherLabels = { dishwasher: 'Dishwasher', washer: 'Washer', fridge: 'Fridge' };

function getProblemCards(svcType, brands) {
  if (svcType === 'dishwasher') return [
    ['Not draining / standing water', 'Drain pump failure or clogged drain hose — most common dishwasher repair call. We carry OEM drain pump assemblies for same-day repair.'],
    ['Not cleaning — spray arm scale', 'Hard regional water calcifies spray nozzles after 6–10 years. Spray arm replacement + descale is a standard same-day repair.'],
    ['Heating element failure', 'Dishes wet at end of cycle — element burnout at 8–15 years. OEM replacement same-day for major brands.'],
    ['Door latch / won\'t start', 'Door latch micro-switch failure prevents start. 30-minute OEM replacement. Common across all brands.'],
    ['Control board / fault codes', brands[0] + ', ' + brands[1] + ' error codes. We run proprietary diagnostics for accurate fault identification.'],
    ['Door gasket leak', 'Gasket failure lets water escape onto kitchen floor. OEM gasket replacement same-day for major brands.']
  ];
  if (svcType === 'washer') return [
    ['Won\'t drain / standing water', 'Pump blockage or lid switch failure — most common washer call. Same-day drain pump repair.'],
    ['Vibration / loud noise', 'Drum bearing wear in front-loaders is the top complaint after 8–10 years. We carry bearing kits for major brands.'],
    ['Won\'t spin', 'Drive belt, clutch, or control board issue. We diagnose and repair same-day.'],
    ['Door seal / gasket leak (front-load)', 'Mould-damaged door boot seal. OEM replacement with mould treatment — standard same-day job.'],
    ['Control board / error codes', brands[0] + ', ' + brands[1] + ' fault codes diagnosed with proprietary scan tools.'],
    ['Won\'t start / power issues', 'Lid switch, control board, or thermal fuse failure. Accurate diagnosis prevents unnecessary part replacement.']
  ];
  return [
    ['Not cooling / warm fridge', 'Compressor, condenser fan, or start relay failure. Same-day diagnosis and repair.'],
    ['Ice maker not working', 'Ice maker module, water inlet valve, or freezer temp issue. OEM parts in stock for major brands.'],
    ['Frost build-up / defrost failure', 'Defrost heater, thermostat, or control board fault. Prevents compressor damage if repaired early.'],
    ['Fridge running constantly', 'Dirty condenser coils, failing fan, or door seal issue. Energy-saving repair — same-day.'],
    ['Water dispenser not working', 'Water inlet valve or filter housing issue. We carry OEM valves for LG, Samsung, and Whirlpool.'],
    ['Unusual noises', 'Evaporator fan, condenser fan, or compressor vibration. Noise diagnosis included in $65 diagnostic.']
  ];
}

function getPricingRows(svcType) {
  if (svcType === 'dishwasher') return [
    ['Diagnostic visit (waived with repair)', '$65'],
    ['Drain pump replacement', '$180–$280'],
    ['Heating element replacement', '$150–$240'],
    ['Door gasket replacement', '$140–$220'],
    ['Spray arm + bearing', '$90–$160'],
    ['Control board', '$240–$420'],
    ['Circulation motor', '$220–$360']
  ];
  if (svcType === 'washer') return [
    ['Diagnostic visit (waived with repair)', '$65'],
    ['Drain pump replacement', '$180–$280'],
    ['Drum bearing replacement', '$220–$380'],
    ['Door boot seal (front-load)', '$160–$260'],
    ['Drive belt / clutch', '$120–$200'],
    ['Control board', '$240–$420'],
    ['Motor / transmission', '$260–$440']
  ];
  return [
    ['Diagnostic visit (waived with repair)', '$65'],
    ['Compressor replacement', '$420–$680'],
    ['Evaporator fan motor', '$160–$260'],
    ['Ice maker assembly', '$180–$320'],
    ['Water inlet valve', '$120–$200'],
    ['Defrost heater / thermostat', '$140–$240'],
    ['Control board / display', '$240–$420']
  ];
}

function getServiceNote(svcType, name) {
  if (svcType === 'dishwasher') return "Edmonton's EPCOR water supply at 170–200 mg/L hardness accelerates mineral scale on dishwasher spray arms and filters throughout " + name + ".";
  if (svcType === 'washer') return "Front-load and top-load washers in " + name + " face bearing wear, door seal failure, and control board issues as they age past 8–10 years.";
  return "Refrigerator compressor, thermostat, and ice maker failures are the most common fridge repair calls in " + name + ", especially in units over 10 years old.";
}

function adaptPara(para, svcType, cost) {
  if (svcType === 'dishwasher') return para;
  if (svcType === 'washer') {
    return para
      .replace(/dishwasher/gi, 'washer')
      .replace(/Dishwasher/gi, 'Washer')
      .replace(/spray arm nozzle scale and filter clogging/gi, 'drum bearing wear and door boot seal failure')
      .replace(/spray arm mineral scale/gi, 'drum bearing wear')
      .replace(/spray arm/gi, 'drum bearing')
      .replace(/drain pump seal wear/gi, 'pump seal wear')
      .replace(/heating element/gi, 'motor bearing')
      .replace(/Bosch E24|E15|E22/g, 'UE/OE error')
      .replace(/\$120–\$380/g, cost)
      .replace(/built-in panel-ready/gi, 'front-load high-efficiency')
      .replace(/integrated/gi, 'front-load')
      .replace(/panel-ready/gi, 'high-efficiency')
      .replace(/calcif[a-z]+ [a-z ]+ nozzles and filters/gi, 'causes detergent residue build-up in drum seals and pump impellers');
  }
  return para
    .replace(/dishwasher/gi, 'refrigerator')
    .replace(/Dishwasher/gi, 'Refrigerator')
    .replace(/spray arm nozzle scale and filter clogging/gi, 'condenser coil fouling and ice maker mineral deposits')
    .replace(/spray arm mineral scale/gi, 'condenser coil fouling')
    .replace(/spray arm/gi, 'condenser coil')
    .replace(/drain pump/gi, 'compressor')
    .replace(/heating element/gi, 'defrost heater')
    .replace(/Bosch E24|E15|E22/g, 'compressor fault code')
    .replace(/\$120–\$380/g, cost)
    .replace(/built-in panel-ready/gi, 'counter-depth French door')
    .replace(/integrated/gi, 'French door')
    .replace(/panel-ready/gi, 'counter-depth')
    .replace(/Miele/g, 'Samsung')
    .replace(/miele/g, 'samsung')
    .replace(/calcif[a-z]+ [a-z ]+ nozzles and filters/gi, 'causes ice maker and water dispenser mineral deposits');
}

function buildPage(n, svc) {
  const slug = n.slug;
  const name = n.display;
  const svcLabel = svc.label;
  const svcSlug = svc.svcSlug;
  const cost = svc.costRange;
  const svcType = svc.type;

  const mainPara = adaptPara(n.para, svcType, cost);
  const serviceNote = getServiceNote(svcType, name);
  const problemCards = getProblemCards(svcType, n.brand_chips);
  const pricingRows = getPricingRows(svcType);

  const brandChipsHtml = n.brand_chips.map(b => '<span class="brand-chip">' + b + '</span>').join('');
  const problemCardsHtml = problemCards.map(([pn, pd]) =>
    '<div class="problem-card"><div class="problem-name">' + pn + '</div><div class="problem-desc">' + pd + '</div></div>'
  ).join('\n      ');
  const pricingRowsHtml = pricingRows.map(([rt, tr]) =>
    '<tr><td>' + rt + '</td><td>' + tr + '</td></tr>'
  ).join('\n        ');

  const others = otherMap[svcType].split(',');
  const otherLinks = others.map(o =>
    '<a href="/' + o + '-repair-' + slug + '" class="related-link">' + otherLabels[o] + ' Repair — ' + name + '</a>'
  ).join('\n      ');

  const iframeId = 'fxbk-' + svcType.charAt(0) + '-' + slug;
  const yrId = 'fx-yr-' + svcType.charAt(0) + '-' + slug;

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type":"Question","name": n.faq1_q,"acceptedAnswer":{"@type":"Answer","text": n.faq1_a}},
      {"@type":"Question","name": "How much does " + svcLabel.toLowerCase() + " repair cost in " + name + "?","acceptedAnswer":{"@type":"Answer","text": "Typical " + svcLabel.toLowerCase() + " repair in " + name + " runs " + cost + " CAD. Flat $65 diagnostic waived with repair. 90-day warranty."}},
      {"@type":"Question","name": "Do you warranty " + svcLabel.toLowerCase() + " repairs in " + name + "?","acceptedAnswer":{"@type":"Answer","text": "Yes — every " + svcLabel.toLowerCase() + " repair in " + name + " includes a 90-day parts and labour warranty. Same fault within 90 days: we return at no charge."}}
    ]
  });

  const bizSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://fixlifyservices.com/" + svcSlug + "-" + slug + "#business",
    "name": svcLabel + " Repair " + name + " Edmonton",
    "description": svcLabel + " Repair in " + name + ", Edmonton. Same-day service, $65 diagnostic, 90-day warranty.",
    "url": "https://fixlifyservices.com/" + svcSlug + "-" + slug,
    "priceRange": "$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "10025 102A Avenue NW Suite 1000",
      "addressLocality": "Edmonton",
      "addressRegion": "AB",
      "postalCode": "T5J 2Z2",
      "addressCountry": "CA"
    },
    "areaServed": [{"@type":"City","name":"Edmonton"},{"@type":"Neighborhood","name": name}],
    "serviceType": svcLabel + " Repair"
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${svcLabel} Repair ${name} Edmonton | From $65 | Same-Day Service</title>
<meta name="description" content="${svcLabel} Repair in ${name}, Edmonton — same-day service, flat $65 diagnostic, 90-day warranty. All brands serviced. Book online or email edmonton@fixlifyservices.com.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://fixlifyservices.com/${svcSlug}-${slug}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/tokens.css">
<style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth;font-size:16px}body{font-family:'Instrument Sans',-apple-system,sans-serif;background:#fff;color:#0a0a0a;line-height:1.6;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}.container{max-width:1200px;margin:0 auto;padding:0 24px}.breadcrumb{padding:14px 0;border-bottom:1px solid #e5e7eb;background:#fafafa}.breadcrumb .container{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.breadcrumb a{font-size:.8125rem;font-weight:500;color:#6b7280}.breadcrumb-sep{font-size:.8125rem;color:#d1d5db}.breadcrumb-current{font-size:.8125rem;font-weight:600;color:#0a0a0a}.page-hero{padding:56px 0 48px;background:#fff;border-bottom:1px solid #e5e7eb}.page-hero .container{max-width:800px}.page-hero-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#2563eb;margin-bottom:16px}.page-hero-eyebrow::before{content:'';display:block;width:16px;height:2px;background:#2563eb}h1.page-h1{font-size:clamp(1.875rem,4vw,2.75rem);font-weight:700;line-height:1.1;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:24px}.answer-box{background:#eff6ff;border-left:3px solid #2563eb;border-radius:0 6px 6px 0;padding:20px 24px;margin-bottom:32px;font-size:1rem;color:#1e40af;line-height:1.7;font-weight:500}.btn-primary{display:inline-flex;align-items:center;gap:8px;background:#2563eb;color:#fff;font-size:1rem;font-weight:700;padding:14px 24px;border-radius:4px;white-space:nowrap}.btn-primary:hover{background:#1d4ed8}.btn-secondary{display:inline-flex;align-items:center;gap:6px;background:#fff;color:#2563eb;font-size:1rem;font-weight:700;padding:13px 22px;border-radius:4px;border:1.5px solid #2563eb;white-space:nowrap}.trust-bar{background:#0a0a0a;padding:14px 0}.trust-bar-inner{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.trust-item{display:flex;align-items:center;gap:8px;padding:4px 24px;border-right:1px solid rgba(255,255,255,.1);font-size:.8125rem;font-weight:600;color:rgba(255,255,255,.9);white-space:nowrap}.trust-item:last-child{border-right:none}.section-label{font-size:.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#2563eb;margin-bottom:12px}.section-title{font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em;color:#0a0a0a;line-height:1.15;margin-bottom:16px}main.page-main{padding:56px 0 0}.problems-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}.problem-card{background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px}.problem-name{font-size:.9375rem;font-weight:700;color:#0a0a0a;margin-bottom:6px}.problem-desc{font-size:.875rem;color:#6b7280;line-height:1.5}.pricing-table{width:100%;border-collapse:collapse;margin-top:24px;font-size:.9375rem}.pricing-table th,.pricing-table td{padding:12px 16px;border-bottom:1px solid #e5e7eb;text-align:left}.pricing-table th{background:#f9fafb;font-weight:600;color:#0a0a0a;font-size:.8125rem;text-transform:uppercase;letter-spacing:.05em}.pricing-table td:last-child{font-weight:600;color:#2563eb;white-space:nowrap}.faq-item{border-bottom:1px solid #e5e7eb}.faq-question{display:flex;justify-content:space-between;align-items:center;padding:18px 0;cursor:pointer;gap:16px;list-style:none;font-weight:600;font-size:1rem;color:#0a0a0a}.faq-question::-webkit-details-marker{display:none}.faq-icon{font-size:1.25rem;color:#2563eb;flex-shrink:0;transition:transform .2s}details[open] .faq-icon{transform:rotate(45deg)}.faq-answer{padding:0 0 18px;font-size:.9375rem;color:#374151;line-height:1.7}.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}.related-link{display:block;padding:10px 14px;background:#fff;border:1px solid #e5e7eb;border-radius:6px;font-size:.875rem;font-weight:500;color:#2563eb}.brand-chip{display:inline-block;padding:8px 16px;background:#fff;border:1px solid #e5e7eb;border-radius:999px;font-size:.875rem;font-weight:600;color:#0a0a0a}.fade-in{opacity:0;transition:opacity .35s ease}.fade-in.visible{opacity:1}.lz-trust-block{max-width:880px;margin:24px auto;padding:24px 20px;border:1px solid rgba(15,23,42,0.08);border-radius:12px;background:#FAFAFA;font-size:15px;line-height:1.65;color:#374151}.lz-trust-h{font-size:1.2rem;margin:0 0 10px;color:#0f172a;font-weight:700}.lz-trust-intro{margin:0 0 14px;color:#334155}.lz-trust-points{list-style:none;margin:0 0 16px;padding:0;display:grid;gap:8px}.lz-trust-points li{padding-left:22px;position:relative;color:#475569;font-size:14px}.lz-trust-points li::before{content:"\\2713";position:absolute;left:0;top:0;color:#2563eb;font-weight:700}.lz-quick-form{display:grid;gap:10px;padding:14px;border:1px dashed rgba(15,23,42,0.12);border-radius:10px;background:#fff}.lz-quick-form-lead{margin:0 0 4px;font-size:13px;color:#475569}.lz-quick-field{display:flex;flex-direction:column;gap:4px;font-size:12px;color:#475569;font-weight:600}.lz-quick-field input,.lz-quick-field textarea{padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:14px;color:#0f172a;background:#fff;font-family:inherit}.lz-quick-submit{padding:10px 18px;background:#2563eb;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;font-size:14px}footer.fx-footer{background:#0a0a0a;color:rgba(255,255,255,.7);padding:40px 0;margin-top:80px}.fx-footer-inner{max-width:1200px;margin:0 auto;padding:0 24px}.fx-footer-cta-strip{background:#1e3a5f;border-radius:8px;padding:24px;margin-bottom:32px}.fx-footer-cta-content{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}.fx-footer-cta-label{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#93c5fd;display:block;margin-bottom:4px}.fx-footer-cta-text p{color:rgba(255,255,255,.8);font-size:.9rem;margin:0}.fx-footer-cta-btns{display:flex;gap:10px;flex-wrap:wrap}.fx-footer-btn-book{background:#2563eb;color:#fff;padding:10px 20px;border-radius:4px;font-weight:700;font-size:.9rem}.fx-footer-btn-call{background:transparent;color:#93c5fd;padding:10px 20px;border-radius:4px;font-weight:600;font-size:.9rem;border:1px solid rgba(147,197,253,.3)}.fx-footer-columns{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;margin-bottom:32px}.fx-footer-logo{display:flex;align-items:center;gap:8px;margin-bottom:12px}.fx-footer-logo-icon{color:#2563eb}.fx-footer-logo-name{font-weight:700;color:#fff;font-size:1rem}.fx-footer-desc{font-size:.875rem;color:rgba(255,255,255,.6);line-height:1.6;margin-bottom:16px}.fx-footer-address{font-size:.875rem;color:rgba(255,255,255,.6);line-height:1.7}.fx-footer-hours{font-size:.8125rem;color:rgba(255,255,255,.5);margin-top:12px;display:flex;flex-direction:column;gap:2px}.fx-footer-hours strong{color:rgba(255,255,255,.7)}.fx-footer-heading{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin-bottom:12px}.fx-footer-list{list-style:none;display:flex;flex-direction:column;gap:8px}.fx-footer-list a{font-size:.875rem;color:rgba(255,255,255,.6)}.fx-footer-list a:hover{color:#fff}.fx-footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:20px;text-align:center}.fx-copyright{font-size:.8125rem;color:rgba(255,255,255,.3)}.sticky-cta{position:fixed;bottom:24px;right:24px;z-index:200}.sticky-btn{display:flex;align-items:center;gap:8px;padding:12px 20px;border-radius:50px;font-size:.9375rem;font-weight:700;box-shadow:0 4px 16px rgba(0,0,0,.2)}.sticky-book{background:#2563eb;color:#fff}@media(max-width:768px){.problems-grid{grid-template-columns:1fr}.fx-footer-columns{grid-template-columns:1fr}}@media(max-width:640px){h1.page-h1{font-size:1.75rem}.sticky-cta{display:none}}</style>
<meta property="og:type" content="website">
<meta property="og:title" content="${svcLabel} Repair ${name} Edmonton | From $65 | Same-Day Service">
<meta property="og:description" content="Same-day ${svcLabel.toLowerCase()} repair in ${name}, Edmonton. From $65 diagnostic, 90-day warranty.">
<meta property="og:url" content="https://fixlifyservices.com/${svcSlug}-${slug}">
<meta property="og:site_name" content="Fixlify Appliance Services">
<meta property="og:image" content="https://fixlifyservices.com/og-image.jpg">
<script type="application/ld+json">
${bizSchema}
</script>
</head>
<body>
<div id="header-placeholder"></div>
<script src="/includes/header-loader.js" defer></script>
<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="container"><a href="/">Home</a><span class="breadcrumb-sep">/</span><a href="/${svcSlug}-edmonton">${svcLabel} Repair Edmonton</a><span class="breadcrumb-sep">/</span><span class="breadcrumb-current">${name}</span></div>
</nav>
<section class="page-hero" aria-label="Page header">
  <div class="container">
    <div class="page-hero-eyebrow">Fixlify Appliance Services &middot; ${name}, Edmonton</div>
    <h1 class="page-h1">${svcLabel} Repair in ${name}, Edmonton</h1>
    <section class="lz-trust-block" aria-labelledby="lz-h-${svcSlug}-${slug}">
      <h2 id="lz-h-${svcSlug}-${slug}" class="lz-trust-h">Why ${name} residents choose Fixlify for ${svcLabel.toLowerCase()} repair</h2>
      <p class="lz-trust-intro">Our <strong>founder Alex</strong> leads 6 TSSA-licensed, insured technicians with 30+ years combined experience since 2017. Written quote, 90-day parts &amp; labour warranty on every repair.</p>
      <ul class="lz-trust-points">
        <li><strong>Same-day service</strong> when you book before 12 PM on a weekday.</li>
        <li><strong>All brands</strong> &mdash; ${n.brand_chips.slice(0,4).join(', ')} &amp; more.</li>
        <li><strong>${n.travel}</strong>.</li>
      </ul>
      <form class="lz-quick-form" action="/contact" method="post" aria-label="Quick repair request">
        <p class="lz-quick-form-lead">Send a quick request &mdash; we'll respond within 30 minutes.</p>
        <label class="lz-quick-field"><span>Your name</span><input type="text" name="name" autocomplete="name" required></label>
        <label class="lz-quick-field"><span>Phone number</span><input type="tel" name="phone" autocomplete="tel" required></label>
        <label class="lz-quick-field"><span>Neighbourhood</span><input type="text" name="city" value="${name}, Edmonton" autocomplete="address-level2"></label>
        <label class="lz-quick-field"><span>What needs fixing?</span><textarea name="issue" rows="3" placeholder="e.g. ${n.brand_chips[0]} ${svcLabel.toLowerCase()} not working"></textarea></label>
        <button type="submit" class="lz-quick-submit">Request a callback</button>
      </form>
    </section>
    <div class="answer-box">Fixlify provides same-day ${svcLabel.toLowerCase()} repair in ${name}, Edmonton. We fix all brands &mdash; ${n.brand_chips.slice(0,4).join(', ')} &amp; more. ${cost} CAD typical cost, 90-day warranty. Book online or email edmonton@fixlifyservices.com.</div>
    <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="btn-secondary" target="_blank" rel="noopener">Book Online &rarr;</a></div>
  </div>
</section>
<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem 1.25rem;margin:1rem auto;max-width:900px;border-radius:0 8px 8px 0">
  <div style="font-size:.7rem;font-weight:700;letter-spacing:.08em;color:#2563eb;text-transform:uppercase;margin-bottom:.4rem">Quick Answer</div>
  <p style="margin:0;color:#1e3a5f;font-size:.9rem;line-height:1.6">Fixlify provides same-day ${svcLabel.toLowerCase()} repair in ${name}, Edmonton &mdash; 7 days a week. ${cost} CAD typical cost. ${n.brand_chips.slice(0,3).join(', ')}. 90-day parts &amp; labour warranty.</p>
</div>
<div class="trust-bar"><div class="trust-bar-inner"><div class="trust-item">&#128176; $65 flat diagnostic</div><div class="trust-item">&#10003; No Hidden Fees</div><div class="trust-item">&#9873; Same-Day Service</div><div class="trust-item">&#128737; 90-Day Warranty</div></div></div>
<main class="page-main container" id="main-content">
  <div class="fade-in" style="max-width:760px;font-size:1.0625rem;color:#374151;line-height:1.75;margin-bottom:56px">
    <h2 style="font-size:1.375rem;font-weight:700;color:#0a0a0a;margin-bottom:16px">${svcLabel} Repair in ${name} &mdash; ${n.region}</h2>
    <p>Who fixes ${svcLabel.toLowerCase()}s in ${name}? <strong>Fixlify Appliance Services Edmonton</strong> &mdash; same-day ${svcLabel.toLowerCase()} repair throughout ${name} and surrounding Edmonton communities. Book online or email <a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a>. Flat <strong>$65 diagnostic</strong>, Mon&ndash;Sat 8AM&ndash;8PM, Sun 10AM&ndash;6PM Mountain Time. Typical cost: <strong>${cost} CAD</strong>. <strong>90-day warranty</strong> on every repair.</p>
    <p>${mainPara}</p>
    <p>Our Edmonton hub at 10025 102A Avenue NW dispatches to ${name} via ${n.route}. ${serviceNote}</p>
  </div>
  <section style="padding:48px 0;border-top:1px solid #e5e7eb">
    <div class="section-label">Common issues</div>
    <h2 class="section-title">Common ${name} ${svcLabel} Problems</h2>
    <p style="max-width:760px;color:#374151;line-height:1.7;margin-bottom:24px">The ${svcLabel.toLowerCase()} faults we diagnose most frequently in ${name}, weighted toward the ${n.brand_chips.slice(0,4).join(', ')} appliance profile.</p>
    <div class="problems-grid">
      ${problemCardsHtml}
    </div>
  </section>
  <section style="margin-top:48px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Brand expertise</div>
    <h2 class="section-title">${svcLabel} Brands We Service in ${name}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:8px;max-width:880px">${brandChipsHtml}</div>
  </section>
  <section style="margin-top:56px">
    <div class="section-label">Transparent pricing</div>
    <h2 class="section-title">${svcLabel} Repair Pricing in ${name}</h2>
    <p style="max-width:760px;color:#374151;line-height:1.7;margin-bottom:20px">All ${name} repairs start with a flat <strong>$65 diagnostic</strong>, waived when you proceed with the repair. Written quote before any work begins.</p>
    <table class="pricing-table" style="max-width:760px">
      <thead><tr><th>Repair type</th><th>Typical range (parts + labour)</th></tr></thead>
      <tbody>
        ${pricingRowsHtml}
      </tbody>
    </table>
    <p style="font-size:.8125rem;color:#6b7280;margin-top:12px">All prices include parts, labour, and a <strong>90-day warranty</strong>.</p>
  </section>
  <section style="margin-top:56px;padding:32px;background:#eff6ff;border-radius:8px;border-left:4px solid #2563eb">
    <div class="section-label">${name} service patterns</div>
    <h2 class="section-title">What we see most on our ${name} ${svcLabel.toLowerCase()} call sheet</h2>
    <div style="max-width:840px;color:#1e40af;line-height:1.75;font-size:1rem">
      <p>${mainPara}</p>
      <p>We keep ${name}-specific parts on our trucks: ${n.brand_chips.slice(0,4).join(', ')} are the most common brands we service in ${name}. Book before noon for same-day service throughout ${name}.</p>
    </div>
  </section>
  <section class="fade-in" style="margin-top:56px;padding:56px 0;border-top:1px solid #e5e7eb;text-align:center">
    <div class="section-label">Online booking</div>
    <h2 style="font-size:1.75rem;font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:12px">Book ${svcLabel} Repair in ${name}</h2>
    <p style="color:#6b7280;margin-bottom:24px">Real-time availability, instant confirmation.</p>
    <iframe id="${iframeId}" src="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce?embed=true" style="width:100%;height:600px;border:none;display:block" title="Book a Service" loading="lazy" allowtransparency="true"></iframe>
    <script>window.addEventListener('message',function(e){if(e.data&&e.data.type==='fixlify-resize'){var el=document.getElementById('${iframeId}');if(el)el.style.height=e.data.height+'px'}});</script>
    <p style="font-size:.9375rem;color:#6b7280;margin-top:16px">Prefer email? <a href="mailto:edmonton@fixlifyservices.com" style="color:#2563eb;font-weight:600">edmonton@fixlifyservices.com</a></p>
  </section>
  <section style="padding:56px 0;border-top:1px solid #e5e7eb">
    <h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:32px">FAQ &mdash; ${svcLabel} Repair in ${name}</h2>
    <details class="faq-item"><summary class="faq-question"><span>${n.faq1_q}</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>${n.faq1_a}</p></div></details>
    <details class="faq-item"><summary class="faq-question"><span>How much does ${svcLabel.toLowerCase()} repair cost in ${name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Typical ${svcLabel.toLowerCase()} repair in ${name} runs ${cost} CAD including parts and labour. Flat $65 diagnostic waived when you proceed with the repair. Written quote before any work begins. 90-day parts and labour warranty.</p></div></details>
    <details class="faq-item"><summary class="faq-question"><span>Do you warranty ${svcLabel.toLowerCase()} repairs in ${name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Yes &mdash; every ${svcLabel.toLowerCase()} repair in ${name} includes a 90-day parts and labour warranty. Same fault within 90 days: we return at no charge.</p></div></details>
  </section>
  <section style="margin-top:56px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Other ${name} services</div>
    <h2 class="section-title">Other Appliance Repair in ${name}</h2>
    <div class="related-grid">
      ${otherLinks}
      <a href="/${svcSlug}-edmonton" class="related-link">${svcLabel} Repair &mdash; Edmonton</a>
    </div>
  </section>
  <section style="margin-top:56px;padding:40px;background:#0a0a0a;border-radius:8px;text-align:center;color:#fff">
    <h2 style="font-size:1.75rem;font-weight:700;color:#fff;margin-bottom:12px">Ready to book ${svcLabel.toLowerCase()} repair in ${name}?</h2>
    <p style="color:rgba(255,255,255,.8);margin-bottom:24px;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.6">Same-day service, $65 flat diagnostic, written quote before any work, 90-day warranty.</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="btn-primary" target="_blank" rel="noopener">Book Online &rarr;</a>
      <a href="mailto:edmonton@fixlifyservices.com" class="btn-secondary">Email Edmonton Team</a>
    </div>
  </section>
</main>
<script type="application/ld+json">
${faqSchema}
</script>
<footer class="fx-footer" role="contentinfo"><div class="fx-footer-inner">
  <div class="fx-footer-cta-strip"><div class="fx-footer-cta-content"><div class="fx-footer-cta-text"><span class="fx-footer-cta-label">Edmonton Appliance Repair</span><p>Book online &mdash; ${name} and all Edmonton area.</p></div><div class="fx-footer-cta-btns"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="fx-footer-btn-book" rel="noopener">Book Online Now</a><a href="mailto:edmonton@fixlifyservices.com" class="fx-footer-btn-call">edmonton@fixlifyservices.com</a></div></div></div>
  <div class="fx-footer-columns">
    <div class="fx-footer-col fx-footer-brand"><div class="fx-footer-logo"><div class="fx-footer-logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg></div><span class="fx-footer-logo-name">Fixlify</span></div><p class="fx-footer-desc">Edmonton Appliance Repair. ${name} and all Edmonton communities.</p><address class="fx-footer-address" style="font-style:normal;margin:14px 0">10025 102A Avenue NW, Suite 1000<br>Edmonton, AB T5J 2Z2</address><div class="fx-footer-hours"><strong>Service Hours (Mountain Time)</strong><span>Monday&ndash;Saturday: 8 AM &ndash; 8 PM</span><span>Sunday: 10 AM &ndash; 6 PM</span></div></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Services</h4><ul class="fx-footer-list"><li><a href="/services/refrigerator-repair-edmonton/">Fridge Repair Edmonton</a></li><li><a href="/services/washer-repair-edmonton/">Washer Repair Edmonton</a></li><li><a href="/services/dishwasher-repair-edmonton/">Dishwasher Repair Edmonton</a></li></ul></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Neighbourhoods</h4><ul class="fx-footer-list"><li><a href="/${svcSlug}-${slug}">${name}</a></li><li><a href="/${svcSlug}-edmonton">Edmonton</a></li><li><a href="/${svcSlug}-glenora">Glenora</a></li><li><a href="/${svcSlug}-windermere">Windermere</a></li></ul></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Quick Links</h4><ul class="fx-footer-list"><li><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" rel="noopener">Book Online</a></li><li><a href="/about/">About Us</a></li><li><a href="/sitemap.xml">Sitemap</a></li></ul><h4 class="fx-footer-heading" style="margin-top:24px">Contact</h4><ul class="fx-footer-list"><li><a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a></li></ul></div>
  </div>
  <div class="fx-footer-bottom"><p class="fx-copyright">&copy; <span id="${yrId}"></span> Fixlify Appliance Repair Edmonton | ${name} | Online Booking Available</p></div>
</div></footer>
<script>(function(){var el=document.getElementById('${yrId}');if(el)el.textContent=new Date().getFullYear()})();</script>
<div class="sticky-cta"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="sticky-btn sticky-book" target="_blank" rel="noopener">Book Online &rarr;</a></div>
<script>document.addEventListener('DOMContentLoaded',function(){var els=document.querySelectorAll('.fade-in');if('IntersectionObserver' in window){var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.1});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('visible')})}});</script>
</body>
</html>`;
}

let created = 0;
const errors = [];

for (const n of neighborhoods) {
  for (const svc of serviceTypes) {
    const filename = svc.svcSlug + '-' + n.slug + '.html';
    try {
      const content = buildPage(n, svc);
      fs.writeFileSync(filename, content, 'utf8');
      created++;
      console.log('Created: ' + filename);
    } catch(e) {
      errors.push(filename + ': ' + e.message);
      console.error('ERROR: ' + filename + ': ' + e.message);
    }
  }
}

console.log('\nTotal created:', created);
if (errors.length) { console.log('Errors:', errors); process.exit(1); }
