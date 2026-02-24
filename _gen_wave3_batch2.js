// Generator: Wave 3 Batch 2 — 60 neighbourhood service pages for fixlifyservices.com
const fs = require('fs');
const path = require('path');

const PHONE = '(437) 524-1053';
const PHONE_INT = '+14375241053';
const BRAND = 'Fixlify Appliance Services';
const DOMAIN = 'fixlifyservices.com';
const BOOK_URL = 'https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce';
const OUT_DIR = path.join(__dirname);

// ── Neighbourhood data ──────────────────────────────────────────────────────
const HOODS = {
  'trinity-bellwoods': {
    label: 'Trinity Bellwoods',
    city: 'Toronto',
    desc: 'young professional condos and Victorian houses',
    brands: ['LG', 'Samsung'],
    brandList: 'LG, Samsung',
    character: 'a mix of converted Victorian houses, modern low-rise condos, and loft spaces popular with young professionals and creative-sector workers',
    housingNote: 'Victorian-era houses that have been converted into multi-unit rentals, and newer condo developments along Queen West and Dundas Street',
    cookingNote: 'busy weekday cooking habits with high dishwasher and oven usage from residents who meal-prep and work from home',
    waterNote: '120 to 140 mg/L calcium hardness',
    specific1: 'older Victorian plumbing that can affect water pressure to dishwashers and ice makers',
    specific2: 'narrow kitchen layouts in converted houses that require compact appliance handling',
    priceRange: { fridge: '$150–$420', washer: '$130–$380', dryer: '$120–$340', dishwasher: '$110–$320', oven: '$130–$380', stove: '$120–$350' },
    nearbyHoods: ['little-italy', 'kensington-market', 'ossington', 'roncesvalles', 'parkdale'],
    nearbyLabels: ['Little Italy', 'Kensington Market', 'Ossington', 'Roncesvalles', 'Parkdale'],
  },
  'chinatown': {
    label: 'Chinatown',
    city: 'Toronto',
    desc: 'Chinese community compact apartments',
    brands: ['LG', 'Samsung'],
    brandList: 'LG, Samsung',
    character: 'a dense, vibrant neighbourhood with compact apartments, family-run businesses, and a multi-generational Chinese community',
    housingNote: 'older low-rise apartment buildings and rowhouses, many of which feature compact 24-inch appliances due to tight kitchen footprints',
    cookingNote: 'intensive cooking patterns — woks, steamers, and high-BTU burners are standard, placing heavy daily demand on stove and oven components',
    waterNote: '125 to 145 mg/L calcium hardness',
    specific1: 'compact 24-inch dishwashers and counter-depth refrigerators common in tight Chinatown kitchens',
    specific2: 'heavy stove and range use from daily high-heat cooking traditional to Chinese cuisine',
    priceRange: { fridge: '$140–$400', washer: '$120–$360', dryer: '$110–$320', dishwasher: '$100–$300', oven: '$120–$360', stove: '$120–$360' },
    nearbyHoods: ['kensington-market', 'trinity-bellwoods', 'little-italy', 'downtown-core', 'ossington'],
    nearbyLabels: ['Kensington Market', 'Trinity Bellwoods', 'Little Italy', 'Downtown Core', 'Ossington'],
  },
  'ossington': {
    label: 'Ossington',
    city: 'Toronto',
    desc: 'trendy mixed-use neighbourhood',
    brands: ['Bosch', 'LG', 'Samsung'],
    brandList: 'Bosch, LG, Samsung',
    character: 'one of Toronto\'s most design-conscious neighbourhoods, with converted Victorian semis, boutique restaurants, and independent studios',
    housingNote: 'Victorian semi-detached houses, converted duplexes, and newer infill townhomes with premium kitchen packages from Bosch, LG, and Samsung',
    cookingNote: 'frequent entertaining and food culture, with oven and dishwasher cycles running daily in households that prioritize quality kitchen appliances',
    waterNote: '120 to 138 mg/L calcium hardness',
    specific1: 'Bosch integrated dishwashers and panel-ready refrigerators common in renovated Ossington homes',
    specific2: 'premium appliance packages that require certified brand-specific diagnostic tools and OEM parts',
    priceRange: { fridge: '$160–$460', washer: '$140–$400', dryer: '$130–$360', dishwasher: '$130–$380', oven: '$140–$400', stove: '$130–$380' },
    nearbyHoods: ['trinity-bellwoods', 'roncesvalles', 'little-italy', 'dufferin-grove', 'parkdale'],
    nearbyLabels: ['Trinity Bellwoods', 'Roncesvalles', 'Little Italy', 'Dufferin Grove', 'Parkdale'],
  },
  'roncesvalles': {
    label: 'Roncesvalles',
    city: 'Toronto',
    desc: 'Polish family neighbourhood',
    brands: ['Whirlpool', 'Maytag'],
    brandList: 'Whirlpool, Maytag',
    character: 'a family-oriented neighbourhood with a strong Polish heritage, detached and semi-detached houses, and a community feel centred on Roncesvalles Avenue',
    housingNote: 'well-maintained detached and semi-detached houses built from the 1920s to 1960s, many with original or updated kitchen and laundry setups using Whirlpool and Maytag appliances',
    cookingNote: 'traditional family cooking with frequent oven and stove use, particularly for baking and preparing hearty meals — above-average daily oven cycles compared to condo-dense neighbourhoods',
    waterNote: '118 to 135 mg/L calcium hardness',
    specific1: 'older Whirlpool and Maytag top-load washers common in detached-house laundry rooms and basements',
    specific2: 'gas stove and range repairs more frequent here than in condo areas — we carry gas-certified technicians',
    priceRange: { fridge: '$140–$420', washer: '$120–$370', dryer: '$110–$330', dishwasher: '$110–$320', oven: '$130–$370', stove: '$120–$360' },
    nearbyHoods: ['trinity-bellwoods', 'ossington', 'parkdale', 'high-park', 'bloor-west-village'],
    nearbyLabels: ['Trinity Bellwoods', 'Ossington', 'Parkdale', 'High Park', 'Bloor West Village'],
  },
  'wychwood': {
    label: 'Wychwood',
    city: 'Toronto',
    desc: 'heritage homes and artistic community',
    brands: ['KitchenAid', 'Bosch', 'LG'],
    brandList: 'KitchenAid, Bosch, LG',
    character: 'a heritage-rich neighbourhood with Edwardian and Arts-and-Crafts houses, artist studios in the Wychwood Barns, and a tight-knit community of long-term residents and creative professionals',
    housingNote: 'heritage-designated Edwardian and Craftsman-style houses built from 1905 to 1930, many with heritage appliance setups mixing original infrastructure with modern KitchenAid or Bosch kitchen packages',
    cookingNote: 'artisan cooking culture — residents invest in quality appliances and expect them to last, with above-average care taken but also high daily usage from at-home workers and families',
    waterNote: '122 to 140 mg/L calcium hardness',
    specific1: 'heritage-era electrical and gas infrastructure that requires careful compatibility assessment before part replacement',
    specific2: 'KitchenAid stand-alone ranges and Bosch panel-ready dishwashers frequent in renovated Wychwood kitchens',
    priceRange: { fridge: '$155–$440', washer: '$130–$390', dryer: '$120–$350', dishwasher: '$125–$370', oven: '$135–$395', stove: '$125–$370' },
    nearbyHoods: ['rosedale-heights', 'hillcrest', 'corso-italia', 'davenport', 'annex'],
    nearbyLabels: ['Rosedale Heights', 'Hillcrest', 'Corso Italia', 'Davenport', 'Annex'],
  },
  'thorncliffe-park': {
    label: 'Thorncliffe Park',
    city: 'Toronto',
    desc: 'South Asian community with heavy cooking',
    brands: ['LG', 'Samsung'],
    brandList: 'LG, Samsung',
    character: 'a densely populated neighbourhood with one of Toronto\'s most diverse South Asian communities, predominantly highrise apartment buildings, and a busy commercial strip on Overlea Boulevard',
    housingNote: 'highrise apartment towers from the 1960s and 1970s, many managed by institutional landlords, with tenant-owned or landlord-supplied LG and Samsung kitchen appliances',
    cookingNote: 'intensive daily cooking with heavy stove and oven use for South Asian cuisine — multiple high-heat cooking sessions per day place exceptional demand on burner igniters, oven elements, and range hoods',
    waterNote: '130 to 155 mg/L calcium hardness — one of Toronto\'s harder water zones, causing accelerated scale buildup in dishwasher inlet valves and ice maker fill lines',
    specific1: 'heavy daily stove use from South Asian cooking causes faster-than-average burner igniter and grate wear',
    specific2: 'extreme hard water accelerates dishwasher and ice maker valve failure — we recommend descaling service with every repair visit in Thorncliffe Park',
    priceRange: { fridge: '$140–$410', washer: '$120–$360', dryer: '$110–$320', dishwasher: '$110–$330', oven: '$125–$370', stove: '$120–$360' },
    nearbyHoods: ['leaside', 'flemingdon-park', 'east-york', 'don-mills', 'danforth'],
    nearbyLabels: ['Leaside', 'Flemingdon Park', 'East York', 'Don Mills', 'Danforth'],
  },
  'st-lawrence': {
    label: 'St. Lawrence',
    city: 'Toronto',
    desc: 'downtown luxury condos',
    brands: ['Miele', 'Bosch'],
    brandList: 'Miele, Bosch',
    character: 'one of Toronto\'s most prestigious downtown neighbourhoods, anchored by the St. Lawrence Market, with luxury condominium towers, heritage lofts, and high-end restaurant culture',
    housingNote: 'premium condominium towers and heritage loft conversions featuring Miele integrated appliance packages and Bosch kitchen suites — among the highest concentration of luxury appliances in Toronto',
    cookingNote: 'sophisticated cooking culture matched by premium appliance investment — Miele induction cooktops and steam ovens common, requiring specialized diagnostics beyond standard residential repair',
    waterNote: '115 to 130 mg/L calcium hardness',
    specific1: 'Miele appliance repair certification required — our St. Lawrence technicians carry Miele-specific diagnostic hardware and OEM parts',
    specific2: 'Bosch integrated dishwashers with panel-ready doors require cabinetry-aware service protocols to avoid cosmetic damage',
    priceRange: { fridge: '$180–$600', washer: '$160–$500', dryer: '$150–$460', dishwasher: '$150–$480', oven: '$170–$550', stove: '$160–$520' },
    nearbyHoods: ['distillery-district', 'king-west', 'financial-district', 'corktown', 'waterfront'],
    nearbyLabels: ['Distillery District', 'King West', 'Financial District', 'Corktown', 'Waterfront'],
  },
  'king-west': {
    label: 'King West',
    city: 'Toronto',
    desc: 'tech condos with premium appliances',
    brands: ['Bosch', 'Miele'],
    brandList: 'Bosch, Miele',
    character: 'Toronto\'s tech-sector hub, with glass-tower condominiums, co-working spaces, and a dense population of tech workers, entrepreneurs, and young professionals',
    housingNote: 'modern condominium towers built after 2005, featuring premium Bosch and Miele integrated appliance packages — panel-ready refrigerators, built-in ovens, and Bosch dishwashers are standard in mid-tier and above units',
    cookingNote: 'convenience-oriented cooking culture with high dishwasher frequency and heavy use of built-in ovens for quick weeknight meals — residents expect fast repair turnaround to minimize kitchen downtime',
    waterNote: '112 to 128 mg/L calcium hardness',
    specific1: 'glass-tower condo service elevator bookings required in advance — we pre-arrange access at booking for King West addresses',
    specific2: 'Bosch panel-ready dishwashers and integrated Miele refrigerators require specialist-level knowledge to service without voiding cabinetry warranties',
    priceRange: { fridge: '$170–$560', washer: '$150–$480', dryer: '$140–$440', dishwasher: '$145–$460', oven: '$165–$530', stove: '$155–$500' },
    nearbyHoods: ['st-lawrence', 'entertainment-district', 'liberty-village', 'queen-west', 'fashion-district'],
    nearbyLabels: ['St. Lawrence', 'Entertainment District', 'Liberty Village', 'Queen West', 'Fashion District'],
  },
  'swansea': {
    label: 'Swansea',
    city: 'Toronto',
    desc: 'lakefront families with quality appliances',
    brands: ['KitchenAid', 'Bosch'],
    brandList: 'KitchenAid, Bosch',
    character: 'a quiet, established lakefront neighbourhood bordering Bloor West Village and High Park, with detached family homes, mature tree-lined streets, and a tight community of long-term residents',
    housingNote: 'substantial detached houses built from the 1920s to 1960s, many fully renovated with premium KitchenAid and Bosch kitchen packages — residents invest significantly in home quality and expect longevity from appliance repairs',
    cookingNote: 'family-scale cooking with frequent oven and range use — lakefront summer entertaining adds seasonal peaks to dishwasher and refrigerator demand, particularly for large-capacity French-door refrigerators with ice makers',
    waterNote: '116 to 132 mg/L calcium hardness',
    specific1: 'KitchenAid freestanding ranges with convection ovens common — we stock KitchenAid igniter and element inventory specifically for Swansea service runs',
    specific2: 'Bosch dishwashers in post-2010 Swansea renovations often use WIFI-connected control boards requiring updated diagnostic software',
    priceRange: { fridge: '$155–$460', washer: '$135–$400', dryer: '$125–$360', dishwasher: '$130–$390', oven: '$140–$420', stove: '$130–$400' },
    nearbyHoods: ['bloor-west-village', 'high-park', 'roncesvalles', 'parkdale', 'junction-triangle'],
    nearbyLabels: ['Bloor West Village', 'High Park', 'Roncesvalles', 'Parkdale', 'Junction Triangle'],
  },
  'etobicoke-village': {
    label: 'Etobicoke Village',
    city: 'Etobicoke',
    desc: 'suburban Etobicoke families',
    brands: ['Whirlpool', 'GE'],
    brandList: 'Whirlpool, GE',
    character: 'a stable suburban neighbourhood in central Etobicoke, with detached bungalows and split-level houses, established families, and a quiet residential character far from downtown density',
    housingNote: 'postwar detached bungalows and split-level houses built from the 1950s to 1980s, commonly equipped with Whirlpool and GE appliances that residents replace on 15 to 20 year cycles',
    cookingNote: 'traditional suburban family cooking with consistent oven and stove use for daily meals — lower appliance turnover than downtown areas means older units needing repair are more common here',
    waterNote: '108 to 124 mg/L calcium hardness — municipal Etobicoke water is slightly softer than downtown Toronto',
    specific1: 'older Whirlpool top-load washers from the 2000s with direct-drive transmissions common — a repair speciality for our Etobicoke technicians',
    specific2: 'GE refrigerators with mechanical thermostats and non-digital controls from 2005 to 2015 still widespread in Etobicoke Village homes',
    priceRange: { fridge: '$130–$390', washer: '$110–$350', dryer: '$100–$310', dishwasher: '$100–$300', oven: '$120–$360', stove: '$110–$340' },
    nearbyHoods: ['islington-city-centre', 'princess-anne-manor', 'kingsway', 'humber-valley', 'bloor-west'],
    nearbyLabels: ['Islington City Centre', 'Princess Anne Manor', 'Kingsway', 'Humber Valley', 'Bloor West'],
  },
};

// ── Service data ─────────────────────────────────────────────────────────────
const SERVICES = {
  'fridge-repair': {
    slug: 'fridge-repair',
    name: 'Refrigerator Repair',
    shortName: 'Fridge Repair',
    appliance: 'refrigerator',
    appliancePlural: 'refrigerators',
    priceKey: 'fridge',
    icon: '🧊',
    h2_1: 'Why {{HOOD}} Refrigerators Need Specialized Repair',
    h2_2: 'Common Refrigerator Problems in {{HOOD}}',
    h2_3: 'Refrigerator Repair Cost in {{HOOD}}',
    h2_4: 'Brands We Service in {{HOOD}}',
    problems: [
      { prob: 'Not Cooling', cause: 'Faulty compressor or condenser fan', fix: 'Replace compressor or fan motor', cost: '$180–$400' },
      { prob: 'Leaking Water', cause: 'Blocked defrost drain or cracked water line', fix: 'Clear drain or replace line', cost: '$90–$180' },
      { prob: 'Ice Maker Not Working', cause: 'Failed water inlet valve or frozen fill tube', fix: 'Replace valve or thaw tube', cost: '$120–$250' },
      { prob: 'Running Constantly', cause: 'Dirty condenser coils or faulty thermostat', fix: 'Clean coils or replace thermostat', cost: '$100–$200' },
      { prob: 'Loud Noise', cause: 'Worn evaporator fan or compressor mount', fix: 'Replace fan or mount bushings', cost: '$110–$230' },
    ],
    faqs: (hood, hoodData) => [
      {
        q: `How much does refrigerator repair cost in ${hood}?`,
        a: `Refrigerator repair in ${hood} typically costs ${hoodData.priceRange.fridge}. The exact amount depends on the brand, model, and failure type. ${BRAND} provides an upfront quote before any work starts — confirmed on-site before the technician touches your refrigerator. No diagnostic fees, no surprise charges. Call ${PHONE} for a free phone estimate.`
      },
      {
        q: `Do you offer same-day refrigerator repair in ${hood}?`,
        a: `Yes — ${BRAND} offers same-day refrigerator repair in ${hood}. Book at fixlifyservices.com and select a same-day slot from our live calendar. Most ${hood} appointments confirm within minutes, with technician arrival within 2 to 4 hours. For urgent cooling failures, call ${PHONE} directly.`
      },
      {
        q: `What refrigerator brands do you fix in ${hood}?`,
        a: `We repair ${hoodData.brandList} — and all other major brands including Whirlpool, GE, Frigidaire, Maytag, KitchenAid, and Miele. Our ${hood} technicians carry brand-specific diagnostic tools and OEM-grade parts for the models most common in this neighbourhood.`
      },
      {
        q: `How long does a refrigerator repair take in ${hood}?`,
        a: `Most refrigerator repairs in ${hood} are completed in 45 to 90 minutes on the first visit. Our technicians arrive stocked with parts for the most common ${hoodData.brandList} failures so return trips are rare. Sealed-system or special-order repairs receive a follow-up within 1 to 3 business days.`
      },
      {
        q: `Should I repair or replace my refrigerator in ${hood}?`,
        a: `If your refrigerator is under 8 to 10 years old and the repair cost is below 50% of replacement value, repair is almost always the smarter choice. A new refrigerator runs $700 to $2,500+ in Toronto. ${BRAND} gives an honest repair-vs-replace recommendation — we will never push repair if replacement is clearly the better value.`
      },
      {
        q: `Are your ${hood} refrigerator technicians licensed and insured?`,
        a: `Yes — every ${BRAND} technician is fully licensed, insured, WSIB-covered, and background-checked, complying with all Ontario appliance repair regulations. For ${hood} buildings that require contractor insurance certificates, we provide documentation before the appointment. Every repair carries a 90-day parts and labour warranty.`
      },
    ],
    bodyP1: (hood, hoodData) => `${hood} presents refrigerator repair challenges shaped by its ${hoodData.character}. The ${hoodData.housingNote} that defines this neighbourhood means our technicians regularly encounter ${hoodData.specific1}. Unlike generic repair companies that carry only universal parts, Fixlify equips its ${hood} service runs specifically with ${hoodData.brandList} inventory — because these are the brands our technicians have consistently found in ${hood} homes over hundreds of service visits.`,
    bodyP2: (hood, hoodData) => `Water quality plays a significant role in refrigerator performance across Toronto. ${hood}'s municipal supply measures ${hoodData.waterNote}, which deposits mineral scale in ice maker fill valves, water supply lines, and defrost drain ports over time. A slow-filling ice maker in ${hood} is rarely a mechanical failure — it's almost always a calcified inlet valve that costs a fraction of a full ice maker replacement. Our technicians test water flow rates as part of every ${hood} refrigerator diagnosis to catch this before ordering unnecessary parts.`,
    bodyP3: (hood, hoodData) => `Beyond water-related issues, ${hood}'s ${hoodData.specific2}. Our refrigerator technicians are trained on the full range of cooling failures: compressor faults, evaporator fan failures, defrost board malfunctions, and sealed-system leaks. For French-door and counter-depth models common in ${hood}'s renovated properties, we carry drawer gaskets, ice dispenser actuators, and French-door hinge kits as standard stock items.`,
    bodyP4: (hood, hoodData) => `Refrigerator emergencies in ${hood} receive priority dispatch. A refrigerator that stops cooling means food loss within hours — Fixlify flags all non-cooling calls for same-day routing in ${hood}. Our dispatch system identifies the nearest available technician with the right ${hoodData.brandList} parts on board and routes them directly. Most ${hood} refrigerator emergencies are resolved within 60 to 90 minutes of the technician arriving. Book online at fixlifyservices.com or call ${PHONE} for immediate assistance.`,
  },
  'washer-repair': {
    slug: 'washer-repair',
    name: 'Washer Repair',
    shortName: 'Washer Repair',
    appliance: 'washer',
    appliancePlural: 'washers',
    priceKey: 'washer',
    problems: [
      { prob: 'Not Draining', cause: 'Blocked drain pump filter or kinked hose', fix: 'Clear blockage or replace pump', cost: '$100–$220' },
      { prob: 'Not Spinning', cause: 'Worn drive belt or faulty motor control board', fix: 'Replace belt or board', cost: '$120–$300' },
      { prob: 'Leaking', cause: 'Damaged door gasket or loose hose connection', fix: 'Replace gasket or reseal connections', cost: '$90–$210' },
      { prob: 'Loud During Spin', cause: 'Worn drum bearings or shock absorbers', fix: 'Replace bearings or absorbers', cost: '$150–$380' },
      { prob: 'Not Starting', cause: 'Faulty lid switch or control board', fix: 'Replace switch or board', cost: '$110–$280' },
    ],
    faqs: (hood, hoodData) => [
      {
        q: `How much does washer repair cost in ${hood}?`,
        a: `Washer repair in ${hood} typically costs ${hoodData.priceRange.washer}. The exact cost depends on the brand, model, and specific fault. ${BRAND} provides a firm upfront quote before any work begins — no diagnostic fees and no hidden charges. Call ${PHONE} for a free phone estimate.`
      },
      {
        q: `Do you offer same-day washer repair in ${hood}?`,
        a: `Yes — ${BRAND} offers same-day washer repair in ${hood}. Book at fixlifyservices.com and select a same-day slot. Most ${hood} appointments confirm within minutes, with technicians arriving within 2 to 4 hours. For urgent calls, phone ${PHONE} directly.`
      },
      {
        q: `What washer brands do you repair in ${hood}?`,
        a: `We service ${hoodData.brandList} washers and all major brands including Whirlpool, GE, Frigidaire, Maytag, Bosch, and Miele. Our ${hood} technicians stock brand-specific parts for the machines most commonly found in this neighbourhood.`
      },
      {
        q: `How long does washer repair take in ${hood}?`,
        a: `Most washer repairs in ${hood} are completed in 45 to 75 minutes on the first visit. We arrive stocked with parts for common ${hoodData.brandList} faults. If a special-order part is needed, we schedule a follow-up within 1 to 3 business days.`
      },
      {
        q: `My washer is vibrating violently — is that a serious problem in ${hood}?`,
        a: `Excessive washer vibration in ${hood} is usually caused by worn drum bearings, failed shock absorbers, or an unbalanced drum. Left unaddressed, vibration damage spreads to the motor and tub assembly — escalating a $150 bearing job into a $400+ repair. Our ${hood} technicians diagnose vibration causes on-site and give you an honest repair-vs-replace assessment.`
      },
      {
        q: `Are your ${hood} washer repair technicians licensed and insured?`,
        a: `Yes — all ${BRAND} technicians are fully licensed, insured, WSIB-covered, and background-checked under Ontario regulations. For ${hood} buildings requiring contractor insurance certificates, we provide documentation before the appointment. Every washer repair includes a 90-day parts and labour warranty.`
      },
    ],
    bodyP1: (hood, hoodData) => `Washer repair in ${hood} reflects the neighbourhood's ${hoodData.character}. The ${hoodData.housingNote} means our technicians frequently encounter ${hoodData.specific1}. Fixlify equips its ${hood} service vans with ${hoodData.brandList} washer parts as standard inventory, because these brands appear in the overwhelming majority of ${hood} service calls. Generic repair companies often arrive without the right parts and schedule unnecessary return visits — a frustration our customers in ${hood} consistently cite when switching to Fixlify.`,
    bodyP2: (hood, hoodData) => `${hood}'s water hardness of ${hoodData.waterNote} has a direct effect on front-load washer performance. Mineral deposits accumulate in the door boot seal, detergent drawer, and pressure switch hose, causing false fault codes and drainage errors that look like electronic failures but are actually mechanical blockages. Our ${hood} washer technicians include a water hardness check as part of every diagnostic visit, because descaling the inlet valve and door dispenser drawer prevents 30 to 40% of recurring washer faults in this area.`,
    bodyP3: (hood, hoodData) => `${hoodData.specific2}. Front-load washers in ${hood}'s condos and houses benefit from our two-technician tight-space protocol — door boot seal replacements on compact front-loaders require extracting the drum partially, which is a two-person job in narrow laundry closets. Our ${hood} service team is trained for this and carries the door expansion tools that make the job clean and fast.`,
    bodyP4: (hood, hoodData) => `For ${hood} residents, a broken washer is an immediate inconvenience — laundromat trips add up quickly. Fixlify prioritizes same-day washer repair appointments across ${hood} and dispatches the nearest technician with the right ${hoodData.brandList} inventory. Most ${hood} washer repairs are resolved in a single visit. Book online at fixlifyservices.com or call ${PHONE} — we confirm your appointment within minutes.`,
  },
  'dryer-repair': {
    slug: 'dryer-repair',
    name: 'Dryer Repair',
    shortName: 'Dryer Repair',
    appliance: 'dryer',
    appliancePlural: 'dryers',
    priceKey: 'dryer',
    problems: [
      { prob: 'Not Heating', cause: 'Burnt heating element or blown thermal fuse', fix: 'Replace element or fuse', cost: '$110–$260' },
      { prob: 'Not Tumbling', cause: 'Broken drive belt or seized drum bearing', fix: 'Replace belt or bearing', cost: '$120–$300' },
      { prob: 'Taking Too Long', cause: 'Clogged lint trap or blocked vent duct', fix: 'Clear vent system or replace sensors', cost: '$90–$190' },
      { prob: 'Making Noise', cause: 'Worn drum glides or loose blower wheel', fix: 'Replace glides or rebalance wheel', cost: '$100–$240' },
      { prob: 'Shutting Off Early', cause: 'Faulty moisture sensor or overheating thermistor', fix: 'Replace sensor or thermistor', cost: '$100–$220' },
    ],
    faqs: (hood, hoodData) => [
      {
        q: `How much does dryer repair cost in ${hood}?`,
        a: `Dryer repair in ${hood} typically costs ${hoodData.priceRange.dryer}. Cost depends on brand, model, and fault type. ${BRAND} gives you a firm upfront quote before work begins — no diagnostic fees. Call ${PHONE} for a free phone estimate.`
      },
      {
        q: `Do you offer same-day dryer repair in ${hood}?`,
        a: `Yes — ${BRAND} offers same-day dryer repair in ${hood}. Book at fixlifyservices.com, select a same-day slot, and a technician arrives within 2 to 4 hours. For urgent calls, phone ${PHONE}.`
      },
      {
        q: `What dryer brands do you repair in ${hood}?`,
        a: `We service ${hoodData.brandList} dryers and all major brands: Whirlpool, GE, Maytag, Frigidaire, Bosch, and Samsung. Our ${hood} technicians carry brand-specific parts for the models common in this neighbourhood.`
      },
      {
        q: `Is a dryer that takes too long to dry dangerous in ${hood}?`,
        a: `A dryer that runs long cycles in ${hood} is often signalling a blocked vent duct — a genuine fire hazard. Lint accumulation in the vent line is the leading cause of residential dryer fires in Ontario. Our ${hood} technicians perform a full vent inspection as part of every dryer service call. If your dryer is running 2+ cycles per load, book a same-day appointment at fixlifyservices.com or call ${PHONE} immediately.`
      },
      {
        q: `How long does dryer repair take in ${hood}?`,
        a: `Most dryer repairs in ${hood} are completed in 30 to 60 minutes on the first visit. We arrive stocked with heating elements, thermal fuses, and drive belts for ${hoodData.brandList} models. Special-order parts require a 1 to 3 business day follow-up.`
      },
      {
        q: `Are your ${hood} dryer technicians licensed and insured?`,
        a: `Yes — all ${BRAND} technicians are fully licensed, insured, WSIB-covered, and background-checked. For ${hood} buildings requiring contractor certificates, we provide documentation before the appointment. Every dryer repair includes a 90-day parts and labour warranty.`
      },
    ],
    bodyP1: (hood, hoodData) => `Dryer repair in ${hood} requires understanding the neighbourhood's ${hoodData.character}. The ${hoodData.housingNote} creates specific dryer challenges, beginning with ${hoodData.specific1}. Fixlify's ${hood} technicians carry ${hoodData.brandList} dryer parts — heating elements, drum belts, thermal fuses, and moisture sensors — as standard van inventory for this area, because these brands appear in the great majority of ${hood} service calls.`,
    bodyP2: (hood, hoodData) => `Vent duct condition is the most overlooked factor in dryer performance across ${hood}. Longer duct runs in ${hoodData.housingNote} — especially when vent paths navigate through walls, attic spaces, or long horizontal runs to exterior exits — accumulate lint faster and reduce airflow more sharply than short direct-vent installations. Our ${hood} dryer technicians inspect the full vent path on every service call, because a partially blocked duct doubles drying time and creates a fire risk that homeowners often mistake for a heating element failure.`,
    bodyP3: (hood, hoodData) => `${hoodData.specific2}. For stacked washer-dryer units common in ${hood}'s condos and smaller units, we use purpose-built access tools that allow full drum and belt inspection without requiring full dryer extraction from the stack — saving time and preventing cabinet damage in tight laundry spaces.`,
    bodyP4: (hood, hoodData) => `${BRAND} provides same-day dryer repair in ${hood} for all service types. Whether your dryer is not heating, not tumbling, making noise, or tripping the breaker, our ${hood} dispatch team routes the nearest technician with the right ${hoodData.brandList} parts. Most repairs are completed in a single visit. Book online at fixlifyservices.com or call ${PHONE} — appointments confirmed within minutes.`,
  },
  'dishwasher-repair': {
    slug: 'dishwasher-repair',
    name: 'Dishwasher Repair',
    shortName: 'Dishwasher Repair',
    appliance: 'dishwasher',
    appliancePlural: 'dishwashers',
    priceKey: 'dishwasher',
    problems: [
      { prob: 'Not Draining', cause: 'Clogged drain pump or blocked filter', fix: 'Clear filter or replace drain pump', cost: '$100–$230' },
      { prob: 'Not Cleaning Properly', cause: 'Blocked spray arms or failed wash pump', fix: 'Clear spray arms or replace pump', cost: '$90–$220' },
      { prob: 'Leaking', cause: 'Worn door gasket or cracked pump housing', fix: 'Replace gasket or pump housing', cost: '$85–$200' },
      { prob: 'Not Starting', cause: 'Faulty door latch or control board', fix: 'Replace latch or board', cost: '$110–$290' },
      { prob: 'Leaving Residue', cause: 'Hard water deposits or failed rinse aid dispenser', fix: 'Descale system or replace dispenser', cost: '$80–$190' },
    ],
    faqs: (hood, hoodData) => [
      {
        q: `How much does dishwasher repair cost in ${hood}?`,
        a: `Dishwasher repair in ${hood} typically costs ${hoodData.priceRange.dishwasher}. The exact amount depends on brand, model, and fault. ${BRAND} provides an upfront quote before any work starts. No diagnostic fees, no surprises. Call ${PHONE} for a free phone estimate.`
      },
      {
        q: `Do you offer same-day dishwasher repair in ${hood}?`,
        a: `Yes — ${BRAND} offers same-day dishwasher repair in ${hood}. Book at fixlifyservices.com and select a same-day slot. Technicians arrive within 2 to 4 hours. For urgent calls, phone ${PHONE}.`
      },
      {
        q: `What dishwasher brands do you fix in ${hood}?`,
        a: `We repair ${hoodData.brandList} dishwashers and all major brands including Whirlpool, GE, Frigidaire, Maytag, Samsung, and LG. Our ${hood} technicians carry brand-specific parts for the models most common in this neighbourhood.`
      },
      {
        q: `Why does my dishwasher leave white film on dishes in ${hood}?`,
        a: `White film on dishes in ${hood} is almost always caused by hard water — ${hood}'s municipal supply at ${hoodData.waterNote} leaves calcium deposits on glassware and dishes when the rinse aid dispenser underperforms or the water temperature is too low. Our technicians descale the spray arms and inlet valve and adjust the rinse aid setting as part of every ${hood} dishwasher service call.`
      },
      {
        q: `How long does dishwasher repair take in ${hood}?`,
        a: `Most dishwasher repairs in ${hood} are completed in 45 to 60 minutes on the first visit. We carry common parts for ${hoodData.brandList} models. If a special-order part is needed, a follow-up visit is scheduled within 1 to 3 business days.`
      },
      {
        q: `Are your ${hood} dishwasher technicians licensed and insured?`,
        a: `Yes — all ${BRAND} technicians are fully licensed, insured, WSIB-covered, and background-checked. For ${hood} buildings requiring contractor insurance certificates, we provide documentation before arrival. Every dishwasher repair includes a 90-day parts and labour warranty.`
      },
    ],
    bodyP1: (hood, hoodData) => `Dishwasher repair in ${hood} is shaped by the neighbourhood's ${hoodData.character}. The ${hoodData.housingNote} creates conditions where ${hoodData.specific1}. Fixlify's ${hood} service vans carry ${hoodData.brandList} dishwasher parts — drain pumps, door gaskets, control boards, spray arm assemblies, and inlet valves — as standard inventory, reflecting the brands our technicians consistently find in ${hood} kitchens.`,
    bodyP2: (hood, hoodData) => `Hard water is the number one cause of dishwasher problems in ${hood}. The neighbourhood's supply at ${hoodData.waterNote} creates mineral scale that coats spray arm perforations, clogs inlet valves, and leaves calcium deposits on dishes and the door seal. Our ${hood} dishwasher technicians perform a water hardness assessment on every service call, because descaling the spray arms, inlet valve, and sump filter eliminates 40 to 50% of recurring dishwasher complaints in this area without any parts replacement.`,
    bodyP3: (hood, hoodData) => `${hoodData.specific2}. For integrated panel-ready dishwashers common in renovated ${hood} kitchens, our technicians use cabinetry-safe service protocols to remove and reinstall decorative door panels without scratching or misaligning the integrated hardware — a detail that generic repair companies routinely overlook.`,
    bodyP4: (hood, hoodData) => `${BRAND} offers same-day dishwasher repair in ${hood} for all fault types — from drainage failures to control board errors. Most repairs are completed in a single visit. Book at fixlifyservices.com or call ${PHONE} — our ${hood} dispatch team confirms your appointment in minutes and routes the nearest technician with the right ${hoodData.brandList} inventory.`,
  },
  'oven-repair': {
    slug: 'oven-repair',
    name: 'Oven Repair',
    shortName: 'Oven Repair',
    appliance: 'oven',
    appliancePlural: 'ovens',
    priceKey: 'oven',
    problems: [
      { prob: 'Not Heating', cause: 'Failed bake element or igniter', fix: 'Replace element or igniter', cost: '$110–$280' },
      { prob: 'Uneven Baking', cause: 'Worn bake or broil element', fix: 'Replace element(s)', cost: '$100–$250' },
      { prob: 'Door Not Closing', cause: 'Broken door hinge or worn gasket', fix: 'Replace hinge or gasket', cost: '$90–$220' },
      { prob: 'Control Board Error', cause: 'Faulty touchpad or control board', fix: 'Replace control board', cost: '$150–$380' },
      { prob: 'Self-Clean Locked', cause: 'Faulty door lock motor or thermal limiter', fix: 'Replace motor or limiter', cost: '$130–$300' },
    ],
    faqs: (hood, hoodData) => [
      {
        q: `How much does oven repair cost in ${hood}?`,
        a: `Oven repair in ${hood} typically costs ${hoodData.priceRange.oven}. Cost varies by brand, model, and fault. ${BRAND} provides an upfront quote before work begins — no diagnostic fees. Call ${PHONE} for a free phone estimate.`
      },
      {
        q: `Do you offer same-day oven repair in ${hood}?`,
        a: `Yes — ${BRAND} offers same-day oven repair in ${hood}. Book at fixlifyservices.com and choose a same-day slot. Technicians arrive within 2 to 4 hours. For urgent requests, call ${PHONE} directly.`
      },
      {
        q: `What oven brands do you repair in ${hood}?`,
        a: `We service ${hoodData.brandList} ovens and all major brands including Whirlpool, GE, Frigidaire, Maytag, Samsung, LG, and Miele. Our ${hood} technicians carry brand-specific parts for the models most common in this neighbourhood.`
      },
      {
        q: `Is it safe to use my oven if only the broil element is broken in ${hood}?`,
        a: `A failed broil element in ${hood} means your oven can still bake but cannot broil or self-clean (self-clean requires broil heat). It is generally safe to continue baking with a dead broil element, but we recommend booking a repair promptly — the control board compensates for the missing element by running longer bake cycles, which accelerates wear. Call ${PHONE} to schedule a ${hood} oven repair.`
      },
      {
        q: `How long does oven repair take in ${hood}?`,
        a: `Most oven repairs in ${hood} are completed in 30 to 60 minutes on the first visit. We carry heating elements, igniters, and control boards for common ${hoodData.brandList} models. Special-order parts require a 1 to 3 business day follow-up.`
      },
      {
        q: `Are your ${hood} oven repair technicians licensed and insured?`,
        a: `Yes — all ${BRAND} technicians are fully licensed, insured, WSIB-covered, and background-checked. Gas oven repairs are performed by gas-certified technicians under Ontario TSSA regulations. Every oven repair includes a 90-day parts and labour warranty.`
      },
    ],
    bodyP1: (hood, hoodData) => `Oven repair in ${hood} reflects the neighbourhood's ${hoodData.character}. ${hoodData.cookingNote}. The ${hoodData.housingNote} creates specific oven service demands, including ${hoodData.specific1}. Fixlify's ${hood} technicians carry ${hoodData.brandList} oven parts — bake and broil elements, igniters, control boards, door gaskets, and hinge assemblies — as standard van inventory.`,
    bodyP2: (hood, hoodData) => `Gas oven repairs in ${hood} require TSSA-certified gas technicians — a credential every Fixlify technician holds. Faulty gas igniter systems are among the most common oven calls we receive in ${hood}, particularly in neighbourhoods with ${hoodData.specific2}. A gas oven that clicks repeatedly without lighting indicates a worn igniter or a failed spark module — both straightforward repairs we carry parts for in our ${hood} service vans.`,
    bodyP3: (hood, hoodData) => `Electric oven failures in ${hood} most commonly involve the bake heating element or the control board. Bake element replacement is one of the most cost-effective oven repairs — a new element for most ${hoodData.brandList} models costs $40 to $80 in parts, with labour bringing the total to $110 to $200. Control board failures are more expensive ($150 to $380) but still far cheaper than oven replacement. We carry bake elements for the most common ${hood} oven models and can complete the replacement in a single 45-minute visit.`,
    bodyP4: (hood, hoodData) => `Same-day oven repair in ${hood} is available 7 days a week, including evenings. ${BRAND} routes the nearest available technician with the right ${hoodData.brandList} inventory for your specific oven model. Book at fixlifyservices.com or call ${PHONE} — most ${hood} oven appointments are confirmed within minutes of booking.`,
  },
  'stove-repair': {
    slug: 'stove-repair',
    name: 'Stove Repair',
    shortName: 'Stove Repair',
    appliance: 'stove',
    appliancePlural: 'stoves',
    priceKey: 'stove',
    problems: [
      { prob: 'Burner Not Lighting', cause: 'Failed igniter or clogged burner port', fix: 'Replace igniter or clean burner', cost: '$85–$210' },
      { prob: 'Burner Not Heating (Electric)', cause: 'Faulty burner element or control switch', fix: 'Replace element or switch', cost: '$90–$220' },
      { prob: 'Gas Smell Near Stove', cause: 'Worn valve seal or loose connection', fix: 'Replace valve seal or tighten connections', cost: '$110–$280' },
      { prob: 'Control Knob Stuck', cause: 'Corroded valve stem or damaged knob', fix: 'Replace valve or knob', cost: '$70–$160' },
      { prob: 'Clicking Constantly', cause: 'Moisture in igniter switch or failed module', fix: 'Dry out or replace igniter switch', cost: '$80–$190' },
    ],
    faqs: (hood, hoodData) => [
      {
        q: `How much does stove repair cost in ${hood}?`,
        a: `Stove repair in ${hood} typically costs ${hoodData.priceRange.stove}. The exact amount depends on brand, model, and fault type. ${BRAND} provides a firm upfront quote before any work begins — no diagnostic fees. Call ${PHONE} for a free estimate.`
      },
      {
        q: `Do you offer same-day stove repair in ${hood}?`,
        a: `Yes — ${BRAND} offers same-day stove repair in ${hood}. Book at fixlifyservices.com and select a same-day slot. Technicians arrive within 2 to 4 hours of booking. For urgent calls — especially gas stove issues — phone ${PHONE} immediately.`
      },
      {
        q: `What stove brands do you repair in ${hood}?`,
        a: `We service ${hoodData.brandList} stoves and all major brands including Whirlpool, GE, Frigidaire, Maytag, Samsung, LG, and Bosch. Our ${hood} technicians carry brand-specific parts for the models most common in this neighbourhood.`
      },
      {
        q: `What should I do if my gas stove smells like gas in ${hood}?`,
        a: `If you smell gas from your stove in ${hood}, turn off the burner controls immediately, do not use any electrical switches, open windows for ventilation, and leave the building if the smell is strong. Call Enbridge Gas at 1-866-763-5427 for emergency gas leak response. Once the issue is declared safe, call ${PHONE} to book a TSSA-certified gas stove repair in ${hood}.`
      },
      {
        q: `How long does stove repair take in ${hood}?`,
        a: `Most stove repairs in ${hood} are completed in 30 to 60 minutes on the first visit. We carry igniters, burner elements, control switches, and valve assemblies for ${hoodData.brandList} models. Special-order parts require a follow-up within 1 to 3 business days.`
      },
      {
        q: `Are your ${hood} stove repair technicians certified for gas?`,
        a: `Yes — all ${BRAND} technicians who perform gas stove repairs are TSSA gas-certified under Ontario regulations. We also carry full liability insurance, WSIB coverage, and background checks. Every stove repair includes a 90-day parts and labour warranty.`
      },
    ],
    bodyP1: (hood, hoodData) => `Stove repair in ${hood} is driven by the neighbourhood's ${hoodData.character}. ${hoodData.cookingNote}. The ${hoodData.housingNote} means our technicians frequently encounter ${hoodData.specific1}. Fixlify's ${hood} technicians carry ${hoodData.brandList} stove parts — igniters, burner elements, control switches, valve assemblies, and control boards — as standard inventory for ${hood} service runs.`,
    bodyP2: (hood, hoodData) => `Gas stove repair in ${hood} requires TSSA gas certification — a credential all Fixlify technicians hold. The most common gas stove calls in ${hood} involve igniter failures caused by ${hoodData.specific2}. Gas igniters that click constantly or fail to produce a spark are almost always caused by moisture contamination or carbon buildup from high-heat cooking — both conditions our technicians clear during the same visit without requiring parts ordering.`,
    bodyP3: (hood, hoodData) => `Electric stove repairs in ${hood} most commonly involve burner element failures or control switch malfunctions. A failed burner coil or smooth-top element costs $60 to $120 in parts and installs in under 30 minutes for most ${hoodData.brandList} models. Glass ceramic cooktop cracks are a separate matter — surface cracks compromise the cooktop's electrical insulation and require full cooktop replacement, which we can source and install within 1 to 3 business days for most ${hood} stove models.`,
    bodyP4: (hood, hoodData) => `${BRAND} offers same-day stove repair in ${hood} seven days a week. Gas stove issues — especially those involving ignition or smell — are treated as priority dispatches. Our ${hood} technicians arrive with the right ${hoodData.brandList} parts and TSSA credentials to resolve most stove faults in a single visit. Book at fixlifyservices.com or call ${PHONE} for immediate assistance.`,
  },
};

// ── HTML generator ────────────────────────────────────────────────────────────
function generatePage(serviceKey, hoodKey) {
  const svc = SERVICES[serviceKey];
  const hood = HOODS[hoodKey];
  const hoodLabel = hood.label;
  const serviceLabel = svc.name;
  const applianceLabel = svc.appliance;
  const price = hood.priceRange[svc.priceKey];
  const canonical = `https://${DOMAIN}/${serviceKey}-${hoodKey}`;
  const title = `${serviceLabel} in ${hoodLabel} | ${BRAND}`;
  const metaDesc = `Professional ${applianceLabel} repair in ${hoodLabel}, ${hood.city}. Same-day service available. Licensed technicians repair ${hood.brandList}. Cost: ${price}. 90-day warranty. Call ${PHONE}.`;

  const faqs = svc.faqs(hoodLabel, hood);

  const faqSchema = faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }));

  const problems = svc.problems;

  // Related: other services in same hood
  const otherServices = Object.keys(SERVICES).filter(s => s !== serviceKey);
  const relatedServices = otherServices.slice(0, 5).map(s => ({
    href: `/${s}-${hoodKey}`,
    label: `${SERVICES[s].name} in ${hoodLabel}`
  }));

  // Related: same service in other hoods
  const otherHoods = Object.keys(HOODS).filter(h => h !== hoodKey);
  const relatedHoods = otherHoods.slice(0, 5).map(h => ({
    href: `/${serviceKey}-${h}`,
    label: `${serviceLabel} in ${HOODS[h].label}`
  }));

  const faqItemsHTML = faqs.map(f => `
      <div class="faq-item glass-card" role="listitem">
        <button class="faq-q" aria-expanded="false" onclick="fxFaq(this)">
          ${escHtml(f.q)}
          <span class="faq-chevron" aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>
          </span>
        </button>
        <div class="faq-a">${escHtml(f.a)}</div>
      </div>`).join('\n');

  const problemRowsHTML = problems.map(p => `
              <tr>
                <td>${escHtml(p.prob)}</td>
                <td>${escHtml(p.cause)}</td>
                <td>${escHtml(p.fix)}</td>
                <td class="price-val">${escHtml(p.cost)}</td>
              </tr>`).join('\n');

  const relSvcHTML = relatedServices.map(r => `
          <a href="${r.href}" class="related-card glass-card">
            <div class="related-card-label">Service</div>
            <div class="related-card-title">${escHtml(r.label)}</div>
          </a>`).join('\n');

  const relHoodHTML = relatedHoods.map(r => `
          <a href="${r.href}" class="related-card glass-card">
            <div class="related-card-label">Location</div>
            <div class="related-card-title">${escHtml(r.label)}</div>
          </a>`).join('\n');

  const body1 = svc.bodyP1(hoodLabel, hood);
  const body2 = svc.bodyP2(hoodLabel, hood);
  const body3 = svc.bodyP3(hoodLabel, hood);
  const body4 = svc.bodyP4(hoodLabel, hood);

  const answerCapsule = `${BRAND} provides same-day ${applianceLabel} repair in ${hoodLabel}, ${hood.city}. Call ${PHONE} — available Monday to Saturday 8 AM to 8 PM, Sunday 9 AM to 6 PM. Typical cost: ${price}. All major brands including ${hood.brandList}. Licensed, insured, WSIB-covered technicians. 90-day parts and labour warranty on every repair. Book online at fixlifyservices.com.`;

  const answerBoxText = `${serviceLabel} in ${hoodLabel}: ${BRAND} provides same-day ${applianceLabel} repair in ${hoodLabel}, ${hood.city}. Call ${PHONE} — available 7 days a week, including evenings. Typical cost: ${price}. We repair ${hood.brandList} and all major brands. Most repairs completed in 1 to 2 hours on the first visit. 90-day parts and labour warranty.`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": BRAND,
        "telephone": PHONE_INT,
        "url": `https://${DOMAIN}`,
        "datePublished": "2026-02-23",
        "dateModified": "2026-02-23",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": hood.city,
          "addressRegion": "Ontario",
          "addressCountry": "CA"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "5200"
        },
        "openingHours": ["Mo-Sa 08:00-20:00", "Su 09:00-18:00"]
      },
      {
        "@type": "Service",
        "name": `${serviceLabel} in ${hoodLabel}`,
        "provider": { "@type": "LocalBusiness", "name": BRAND },
        "areaServed": { "@type": "Place", "name": `${hoodLabel}, ${hood.city}, Ontario` },
        "offers": {
          "@type": "Offer",
          "priceRange": price,
          "description": `${serviceLabel} in ${hoodLabel} — same-day service, 90-day warranty, all brands`
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqSchema
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://${DOMAIN}/` },
          { "@type": "ListItem", "position": 2, "name": serviceLabel, "item": `https://${DOMAIN}/${serviceKey}-toronto` },
          { "@type": "ListItem", "position": 3, "name": hoodLabel, "item": canonical }
        ]
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escHtml(title)}</title>
<meta name="description" content="${escHtml(metaDesc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${canonical}">

<!-- Open Graph -->
<meta property="og:title" content="${escHtml(title)}">
<meta property="og:description" content="${escHtml(metaDesc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_CA">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/tokens.css">

<!-- Schema JSON-LD -->
<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>

<style>
:root {
  --bg-deep:        #060C14;
  --bg-dark:        #0D1B2A;
  --glass-bg:       rgba(255,255,255,0.04);
  --glass-bg-hover: rgba(255,255,255,0.08);
  --glass-border:   rgba(255,255,255,0.10);
  --glass-border-h: rgba(0,194,255,0.35);
  --cyan:           #00C2FF;
  --cyan-dim:       rgba(0,194,255,0.15);
  --cyan-glow:      0 0 24px rgba(0,194,255,0.45), 0 0 60px rgba(0,194,255,0.15);
  --orange:         #FF6B35;
  --orange-dim:     rgba(255,107,53,0.15);
  --orange-glow:    0 0 24px rgba(255,107,53,0.5);
  --text:           #E8F4FD;
  --muted:          rgba(232,244,253,0.55);
  --muted2:         rgba(232,244,253,0.30);
  --radius-card:    16px;
  --radius-btn:     100px;
  --font-head:      'Outfit', sans-serif;
  --font-body:      'Plus Jakarta Sans', sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--bg-deep);
  color: var(--text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-size: 300px 300px;
}

.bg-atm { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.18; }
.blob-1 { width: 800px; height: 800px; background: radial-gradient(circle, #002b55, transparent 70%); top: -200px; left: -150px; }
.blob-2 { width: 600px; height: 600px; background: radial-gradient(circle, #001a33, transparent 70%); bottom: -150px; right: -100px; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2; }
.section { padding: 80px 0; position: relative; }

.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-card);
  transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
}
.glass-card:hover {
  border-color: var(--glass-border-h);
  background: var(--glass-bg-hover);
  box-shadow: var(--cyan-glow);
}

.btn-orange {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--orange); color: #000;
  font-family: var(--font-head); font-weight: 800; font-size: 15px;
  padding: 14px 28px; border-radius: var(--radius-btn);
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.3s, transform 0.2s;
  white-space: nowrap;
}
.btn-orange:hover { background: #ff8050; box-shadow: var(--orange-glow); transform: translateY(-2px); }

.btn-cyan {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: var(--cyan);
  font-family: var(--font-head); font-weight: 700; font-size: 15px;
  padding: 14px 28px; border-radius: var(--radius-btn);
  border: 1.5px solid rgba(0,194,255,0.4);
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}
.btn-cyan:hover { background: var(--cyan-dim); box-shadow: var(--cyan-glow); }

.reveal {
  opacity: 0; transform: translateY(22px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible { opacity: 1; transform: translateY(0); }

.breadcrumb-bar {
  padding: 14px 0;
  background: rgba(13,27,42,0.5);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  position: relative;
  z-index: 2;
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--muted2);
  list-style: none;
}
.breadcrumb a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
.breadcrumb a:hover { color: var(--cyan); }
.breadcrumb-sep { color: var(--muted2); }
.breadcrumb-current { color: var(--orange); font-weight: 600; }

.page-hero {
  position: relative;
  padding: 72px 0 56px;
  background: linear-gradient(180deg, #060C14 0%, #091422 100%);
  overflow: hidden;
}
.page-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 60% 40%, rgba(255,107,53,0.07) 0%, transparent 55%),
              radial-gradient(ellipse at 20% 80%, rgba(0,194,255,0.05) 0%, transparent 50%);
  pointer-events: none;
}
.page-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.page-hero-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 48px;
  align-items: start;
}

.page-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 18px;
  width: fit-content;
}
.badge-service { color: var(--orange); background: var(--orange-dim); border: 1px solid rgba(255,107,53,0.25); }

.page-h1 {
  font-family: var(--font-head);
  font-weight: 800;
  font-size: clamp(28px, 4vw, 50px);
  line-height: 1.08;
  color: var(--text);
  margin-bottom: 20px;
}
.page-h1 span {
  background: linear-gradient(90deg, var(--orange), #ff9f6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.answer-box {
  background: rgba(13,27,42,0.80);
  border: 1px solid rgba(0,194,255,0.20);
  border-left: 3px solid var(--orange);
  border-radius: 14px;
  padding: 20px 22px;
  margin-bottom: 26px;
  backdrop-filter: blur(16px);
}
.answer-box-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 8px;
}
.answer-box-text {
  font-size: 15px;
  color: var(--text);
  line-height: 1.7;
}

.page-cta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.trust-panel {
  background: rgba(13,27,42,0.75);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-card);
  padding: 24px;
  backdrop-filter: blur(20px);
}
.trust-panel-title {
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 14px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 16px;
}
.trust-panel-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 18px;
}
.trust-stat-mini {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  padding: 14px 10px;
  text-align: center;
}
.trust-stat-mini .val {
  display: block;
  font-family: var(--font-head);
  font-weight: 800;
  font-size: 20px;
  color: var(--orange);
  line-height: 1;
  margin-bottom: 4px;
}
.trust-stat-mini .lbl {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--muted2);
}

.trust-strip {
  padding: 24px 0;
  background: rgba(13,27,42,0.4);
  border-top: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  position: relative;
  z-index: 2;
}
.trust-strip-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;
  flex-wrap: wrap;
}
.trust-strip-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  white-space: nowrap;
}
.trust-strip-item strong { color: var(--text); }

.content-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 48px;
  align-items: start;
}
.content-body {
  color: var(--muted);
  font-size: 15px;
  line-height: 1.75;
}
.content-body h2, .content-body h3 {
  font-family: var(--font-head);
  font-weight: 700;
  color: var(--text);
  margin: 28px 0 12px;
  line-height: 1.3;
}
.content-body h2 { font-size: clamp(20px, 2.5vw, 28px); }
.content-body h3 { font-size: 18px; }
.content-body p { margin-bottom: 16px; }
.content-body ul, .content-body ol {
  margin: 12px 0 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.content-body li { line-height: 1.6; }

.content-sidebar {
  position: sticky;
  top: 90px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-book-card {
  background: rgba(13,27,42,0.82);
  border: 1px solid rgba(255,107,53,0.22);
  border-radius: var(--radius-card);
  overflow: hidden;
}
.sidebar-book-header {
  padding: 16px 18px 12px;
  background: linear-gradient(135deg, rgba(255,107,53,0.10), rgba(0,194,255,0.05));
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.sidebar-book-title {
  font-family: var(--font-head);
  font-weight: 800;
  font-size: 16px;
  color: var(--text);
  margin-bottom: 3px;
}
.sidebar-book-sub {
  font-size: 12px;
  color: var(--muted);
}
.sidebar-book-iframe { height: 380px; }
.sidebar-book-iframe iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  background: #060C14;
}

.sidebar-phone-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 18px;
  text-align: center;
}
.sidebar-phone-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--muted2);
  margin-bottom: 8px;
}
.sidebar-phone-num {
  font-family: var(--font-head);
  font-weight: 800;
  font-size: 22px;
  color: var(--cyan);
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
  transition: text-shadow 0.2s;
}
.sidebar-phone-num:hover { text-shadow: 0 0 30px rgba(0,194,255,0.7); }
.sidebar-hours { font-size: 11px; color: var(--muted2); }

.pricing-card { padding: 0; overflow: hidden; }
.pricing-card-header {
  padding: 18px 22px;
  background: linear-gradient(135deg, rgba(255,107,53,0.10), rgba(13,27,42,0.8));
  border-bottom: 1px solid var(--glass-border);
}
.pricing-table { width: 100%; border-collapse: collapse; }
.pricing-table th {
  padding: 12px 18px;
  text-align: left;
  font-family: var(--font-head);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(232,244,253,0.5);
  background: rgba(255,107,53,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.pricing-table td {
  padding: 12px 18px;
  font-size: 14px;
  color: var(--text);
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.pricing-table tbody tr:last-child td { border-bottom: none; }
.pricing-table tbody tr { background: rgba(255,255,255,0.02); transition: background 0.2s; }
.pricing-table tbody tr:hover { background: rgba(255,255,255,0.05); }
.price-val { font-family: var(--font-head); font-weight: 700; color: var(--orange); }

.book-mid {
  background: linear-gradient(135deg, rgba(13,27,42,0.9), rgba(6,12,20,0.95));
  position: relative;
  overflow: hidden;
}
.book-mid::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(255,107,53,0.07) 0%, transparent 50%);
  pointer-events: none;
}
.book-mid-inner { text-align: center; margin-bottom: 32px; }
.book-mid-iframe-card {
  max-width: 680px;
  margin: 0 auto;
  background: rgba(13,27,42,0.75);
  border: 1px solid rgba(255,107,53,0.2);
  border-radius: 20px;
  overflow: hidden;
}
.book-mid-iframe-header {
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(255,107,53,0.10), rgba(0,0,0,0.3));
  border-bottom: 1px solid rgba(255,255,255,0.06);
  text-align: left;
}
.book-mid-iframe-title {
  font-family: var(--font-head);
  font-weight: 800;
  font-size: 16px;
  color: var(--text);
}
.book-mid-iframe-wrap {
  height: 460px;
  background: #FFFFFF;
  border-radius: 0 0 16px 16px;
  overflow: hidden;
}
.book-mid-iframe-wrap iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  background: #FFFFFF;
}

.faq-list {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
}
.faq-item { border-radius: 12px; overflow: hidden; }
.faq-q {
  width: 100%; background: none; border: none; cursor: pointer;
  display: flex; justify-content: space-between; align-items: center; gap: 14px;
  padding: 16px 20px; text-align: left;
  font-family: var(--font-head); font-weight: 700; font-size: 14px;
  color: var(--text); transition: color 0.2s;
}
.faq-q:hover { color: var(--orange); }
.faq-chevron {
  flex-shrink: 0; width: 18px; height: 18px;
  border-radius: 50%; background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.3s, background 0.2s;
}
.faq-item.open .faq-chevron { transform: rotate(180deg); background: var(--orange-dim); border-color: rgba(255,107,53,0.3); }
.faq-a {
  display: none;
  padding: 0 20px 16px;
  font-size: 13px; color: var(--muted); line-height: 1.7;
}
.faq-item.open .faq-a { display: block; }

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-top: 28px;
}
.related-card {
  padding: 14px 16px;
  border-radius: 12px;
  text-decoration: none;
  display: block;
  transition: border-color 0.2s, background 0.2s;
}
.related-card:hover { background: var(--glass-bg-hover); border-color: var(--glass-border-h); }
.related-card-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 5px;
}
.related-card-title {
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 13px;
  color: var(--text);
}

@media (max-width: 1024px) {
  .page-hero-grid { grid-template-columns: 1fr; }
  .page-hero-right { display: none; }
  .content-grid { grid-template-columns: 1fr; }
  .content-sidebar { position: static; }
  .related-two-col { grid-template-columns: 1fr !important; }
}
@media (max-width: 768px) {
  .section { padding: 56px 0; }
  .page-hero { padding: 48px 0 40px; }
  .trust-strip-inner { gap: 16px; }
  .page-cta-row { flex-direction: column; align-items: flex-start; }
  .sidebar-book-iframe { height: 340px; }
  .book-mid-iframe-wrap { height: 380px; }
}
@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .trust-panel-stats { grid-template-columns: repeat(2, 1fr); }
}
@media (prefers-reduced-motion: reduce) {
  .reveal { transition: none; opacity: 1; transform: none; }
}
</style>

<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escHtml(title)}">
<meta name="twitter:description" content="${escHtml(metaDesc)}">
</head>
<body>

<!-- Background blobs -->
<div class="bg-atm" aria-hidden="true">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
</div>

<!-- Header -->
<div id="header-placeholder"></div>
<script src="/includes/header-loader.js" defer></script>

<!-- Breadcrumb -->
<nav class="breadcrumb-bar" aria-label="Breadcrumb">
  <div class="container">
    <ol class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="/"><span itemprop="name">Home</span></a>
        <meta itemprop="position" content="1">
      </li>
      <li class="breadcrumb-sep" aria-hidden="true">&rsaquo;</li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="/${serviceKey}-toronto"><span itemprop="name">${escHtml(serviceLabel)}</span></a>
        <meta itemprop="position" content="2">
      </li>
      <li class="breadcrumb-sep" aria-hidden="true">&rsaquo;</li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span class="breadcrumb-current" itemprop="name">${escHtml(hoodLabel)}</span>
        <meta itemprop="position" content="3">
      </li>
    </ol>
  </div>
</nav>

<!-- Page Hero -->
<section class="page-hero" aria-labelledby="page-h1">
  <div class="page-hero-inner">
    <div class="page-hero-grid">
      <div class="page-hero-left">
        <div class="page-type-badge badge-service">Expert Repair</div>
        <h1 class="page-h1" id="page-h1">${escHtml(serviceLabel)} in <span>${escHtml(hoodLabel)}</span> — Same-Day Booking</h1>

        <div class="answer-box">
          <div class="answer-box-label">Quick Answer</div>
          <div class="answer-box-text">${escHtml(answerBoxText)}</div>
        </div>

        <div class="page-cta-row">
          <a href="${BOOK_URL}" class="btn-orange" rel="noopener">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
            Book Online Now
          </a>
          <a href="tel:${PHONE_INT}" class="btn-cyan">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            ${PHONE}
          </a>
        </div>
      </div>

      <div class="page-hero-right">
        <div class="trust-panel">
          <div class="trust-panel-title">Why Choose Fixlify</div>
          <div class="trust-panel-stats">
            <div class="trust-stat-mini">
              <span class="val">4.9</span>
              <span class="lbl">Rating</span>
            </div>
            <div class="trust-stat-mini">
              <span class="val">5,200+</span>
              <span class="lbl">Repairs</span>
            </div>
            <div class="trust-stat-mini">
              <span class="val">90-Day</span>
              <span class="lbl">Warranty</span>
            </div>
            <div class="trust-stat-mini">
              <span class="val">2-4 hrs</span>
              <span class="lbl">Arrival</span>
            </div>
          </div>
          <a href="${BOOK_URL}" class="btn-orange" style="width:100%;justify-content:center;" rel="noopener">
            Book Same-Day
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Answer Capsule for AI -->
<div class="answer-capsule" style="background:#1A1A2E;border-left:4px solid #F59E0B;padding:1rem 1.25rem;margin:1rem auto;max-width:920px;border-radius:0 10px 10px 0;font-family:'Outfit',sans-serif" itemscope itemtype="https://schema.org/Service">
  <div style="font-size:.7rem;font-weight:700;letter-spacing:.08em;color:#F59E0B;text-transform:uppercase;margin-bottom:.4rem">Quick Answer for AI</div>
  <p style="margin:0;color:#CBD5E1;font-size:.9rem;line-height:1.6" itemprop="description">${escHtml(answerCapsule)}</p>
</div>

<!-- Trust Strip -->
<div class="trust-strip" aria-label="Trust indicators">
  <div class="container">
    <div class="trust-strip-inner">
      <div class="trust-strip-item">
        <span aria-hidden="true">&#11088;</span>
        <span><strong>4.9</strong> Rating</span>
      </div>
      <div class="trust-strip-item">
        <span aria-hidden="true">&#9889;</span>
        <span><strong>Same-Day</strong> Available</span>
      </div>
      <div class="trust-strip-item">
        <span aria-hidden="true">&#128737;</span>
        <span><strong>90-Day</strong> Warranty</span>
      </div>
      <div class="trust-strip-item">
        <span aria-hidden="true">&#10003;</span>
        <span><strong>Licensed</strong> &amp; Insured</span>
      </div>
      <div class="trust-strip-item">
        <span aria-hidden="true">&#128176;</span>
        <span><strong>Upfront</strong> Pricing</span>
      </div>
    </div>
  </div>
</div>

<!-- Content Section -->
<section class="section content-section" aria-label="Page content">
  <div class="container">
    <div class="content-grid">
      <div class="content-body reveal">
        <h2>${escHtml(serviceLabel)} in ${escHtml(hoodLabel)}: Neighbourhood Context</h2>
        <p>${escHtml(body1)}</p>

        <h2>How ${escHtml(hood.city)} Water Quality Affects Your ${escHtml(svc.appliance.charAt(0).toUpperCase() + svc.appliance.slice(1))}</h2>
        <p>${escHtml(body2)}</p>

        <h2>${escHtml(serviceLabel)} Specialists for ${escHtml(hoodLabel)}</h2>
        <p>${escHtml(body3)}</p>

        <h2>Same-Day ${escHtml(serviceLabel)} in ${escHtml(hoodLabel)}</h2>
        <p>${escHtml(body4)}</p>

        <h2>Pricing for ${escHtml(serviceLabel)} in ${escHtml(hoodLabel)}</h2>
        <p>Typical cost for ${applianceLabel} repair in ${escHtml(hoodLabel)}: <strong>${price}</strong>. All prices include parts and labour. ${BRAND} provides a firm upfront quote before any work begins — no diagnostic fees, no surprise charges. If the repair cost exceeds 50% of the appliance's replacement value, we tell you honestly. Call ${PHONE} for a free phone estimate or book online at fixlifyservices.com.</p>

        <!-- Problems Table -->
        <div class="pricing-card glass-card" style="margin-top:32px;">
          <div class="pricing-card-header">
            <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;color:var(--text);">
              Common ${escHtml(svc.appliance.charAt(0).toUpperCase() + svc.appliance.slice(1))} Problems We Fix in ${escHtml(hoodLabel)}
            </h3>
          </div>
          <table class="pricing-table" aria-label="${escHtml(serviceLabel)} issues in ${escHtml(hoodLabel)}">
            <thead>
              <tr>
                <th>Problem</th>
                <th>Likely Cause</th>
                <th>Our Fix</th>
                <th>Typical Cost</th>
              </tr>
            </thead>
            <tbody>
              ${problemRowsHTML}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="content-sidebar">
        <div class="sidebar-book-card">
          <div class="sidebar-book-header">
            <div class="sidebar-book-title">Book Online Now</div>
            <div class="sidebar-book-sub">Same-day slots in ${escHtml(hoodLabel)}</div>
          </div>
          <div class="sidebar-book-iframe">
            <iframe
              src="${BOOK_URL}?embed=true"
              loading="lazy"
              title="Book ${applianceLabel} repair in ${escHtml(hoodLabel)} — Fixlify"
              allowfullscreen></iframe>
          </div>
        </div>

        <div class="sidebar-phone-card">
          <div class="sidebar-phone-label">Prefer to Call?</div>
          <a href="tel:${PHONE_INT}" class="sidebar-phone-num">${PHONE}</a>
          <div class="sidebar-hours">Mon-Sat 8am-8pm &bull; Sun 9am-6pm</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Mid-Page Booking -->
<section class="section book-mid" aria-labelledby="book-mid-title">
  <div class="container">
    <div class="book-mid-inner reveal">
      <span style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--orange);background:var(--orange-dim);border:1px solid rgba(255,107,53,0.25);padding:6px 16px;border-radius:100px;margin-bottom:14px;">Book Online</span>
      <h2 id="book-mid-title" style="font-family:var(--font-head);font-weight:800;font-size:clamp(26px,3.5vw,40px);margin-bottom:10px;">
        Book Your ${escHtml(serviceLabel)} in ${escHtml(hoodLabel)}
      </h2>
      <p style="font-size:16px;color:var(--muted);max-width:520px;margin:0 auto 28px;line-height:1.6;">
        Select a time that works for you. Same-day available. Licensed technician arrives within 2-4 hours.
      </p>
    </div>

    <div class="book-mid-iframe-card reveal">
      <div class="book-mid-iframe-header">
        <div class="book-mid-iframe-title">Choose Your Appointment Time</div>
      </div>
      <div class="book-mid-iframe-wrap">
        <iframe
          src="${BOOK_URL}?embed=true"
          loading="lazy"
          title="Fixlify ${applianceLabel} repair booking — ${escHtml(hoodLabel)}"
          allowfullscreen></iframe>
      </div>
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section class="section" id="faq" aria-labelledby="faq-title">
  <div class="container" style="max-width:800px;">
    <div style="text-align:center;">
      <span style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--cyan);background:var(--cyan-dim);border:1px solid rgba(0,194,255,0.25);padding:6px 16px;border-radius:100px;margin-bottom:14px;">FAQ</span>
      <h2 id="faq-title" style="font-family:var(--font-head);font-weight:800;font-size:clamp(24px,3vw,36px);margin-bottom:10px;">
        ${escHtml(serviceLabel)} in ${escHtml(hoodLabel)} — Common Questions
      </h2>
    </div>

    <div class="faq-list" role="list">
      ${faqItemsHTML}
    </div>
  </div>
</section>

<!-- Related Pages -->
<section class="section related-section" aria-label="Related pages">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;" class="related-two-col">
      <div>
        <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;margin-bottom:6px;color:var(--text);">
          More Services in ${escHtml(hoodLabel)}
        </h3>
        <div class="related-grid">
          ${relSvcHTML}
        </div>
      </div>

      <div>
        <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;margin-bottom:6px;color:var(--text);">
          ${escHtml(serviceLabel)} in Other Areas
        </h3>
        <div class="related-grid">
          ${relHoodHTML}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Footer -->
<div id="footer-placeholder"></div>
<script src="/includes/footer-loader.js" defer></script>

<script defer>
(function() {
  if (!window.IntersectionObserver) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.10 });
  document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
})();

function fxFaq(btn) {
  var item = btn.closest('.faq-item');
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(el) {
    el.classList.remove('open');
    el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}
</script>

</body>
</html>`;
}

function escHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Generate all 60 files ─────────────────────────────────────────────────────
let count = 0;
const errors = [];

for (const hoodKey of Object.keys(HOODS)) {
  for (const serviceKey of Object.keys(SERVICES)) {
    const filename = `${serviceKey}-${hoodKey}.html`;
    const filepath = path.join(OUT_DIR, filename);
    try {
      const html = generatePage(serviceKey, hoodKey);
      fs.writeFileSync(filepath, html, 'utf8');
      count++;
      console.log(`[${count}/60] Written: ${filename}`);
    } catch (err) {
      errors.push({ filename, error: err.message });
      console.error(`ERROR: ${filename} — ${err.message}`);
    }
  }
}

console.log(`\nDone. ${count} files written. ${errors.length} errors.`);
if (errors.length) {
  errors.forEach(e => console.error(`  FAIL: ${e.filename}: ${e.error}`));
}
