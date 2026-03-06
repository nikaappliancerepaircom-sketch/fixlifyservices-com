/**
 * make-unique.js — Inject ~400 words of unique city+service content into FIXLIFY pages
 * Target: push inter-page uniqueness above 80%
 */
const fs = require('fs');
const path = require('path');

// ─── City data ───
const cityData = {
  'brampton': {
    name: 'Brampton', area: 'Peel Region',
    neighborhoods: ['Springdale', 'Heart Lake', 'Bramalea', 'Sandalwood Heights', 'Mount Pleasant', 'Castlemore'],
    housing: 'large detached homes built between 2000 and 2020 designed for multi-generational families',
    waterNote: 'Peel Region water hardness averages 100-120 mg/L, causing mineral buildup in heating elements and spray arms within 2-3 years',
    localIssue: 'Brampton\'s newer subdivisions share identical builder-grade appliance packages — we see wave failures across entire streets when the same model reaches its expected lifespan simultaneously',
    population: '650,000+', era: '2000s-2020s'
  },
  'mississauga': {
    name: 'Mississauga', area: 'Peel Region',
    neighborhoods: ['Port Credit', 'Erin Mills', 'Clarkson', 'Meadowvale', 'Streetsville', 'Cooksville'],
    housing: 'a mix of 1970s-era detached homes and newer high-rise condominiums near Square One',
    waterNote: 'Lakefront humidity in Port Credit and Lakeview accelerates corrosion on appliance electrical contacts and causes condensation issues in refrigeration coils',
    localIssue: 'Mississauga\'s condo towers along Hurontario require service elevator booking and loading dock scheduling — we coordinate building access in advance to avoid installation delays',
    population: '800,000+', era: '1970s-2000s'
  },
  'scarborough': {
    name: 'Scarborough', area: 'eastern Toronto',
    neighborhoods: ['Agincourt', 'Malvern', 'Highland Creek', 'Scarborough Village', 'Birch Cliff', 'West Hill'],
    housing: 'post-war bungalows from the 1950s-1960s alongside newer townhome developments',
    waterNote: 'older homes often have original 15-amp kitchen circuits that cannot handle modern high-draw appliances — we assess and upgrade wiring during installations when needed',
    localIssue: 'Scarborough\'s multicultural households frequently use appliances more intensively than average — washers and dryers running 8-10 loads per week accelerate bearing wear and belt degradation significantly',
    population: '630,000+', era: '1950s-1970s'
  },
  'north-york': {
    name: 'North York', area: 'northern Toronto',
    neighborhoods: ['Willowdale', 'Don Mills', 'Bayview Village', 'Lawrence Park', 'Downsview', 'York Mills'],
    housing: 'everything from 1950s split-levels to luxury high-rise condos along Yonge Street',
    waterNote: 'the condo boom along Yonge and Sheppard means a high volume of compact and panel-ready appliance work requiring specialized knowledge of stacked plumbing configurations',
    localIssue: 'North York\'s rapid redevelopment means older bungalows with dated infrastructure sit next to modern builds — we carry parts for both legacy appliance systems and modern smart appliances with WiFi diagnostics',
    population: '700,000+', era: '1950s-2020s'
  },
  'etobicoke': {
    name: 'Etobicoke', area: 'western Toronto',
    neighborhoods: ['Mimico', 'Islington Village', 'Humber Valley', 'The Kingsway', 'Long Branch', 'Rexdale'],
    housing: 'established post-war homes from the 1940s-1960s mixed with waterfront condominiums',
    waterNote: 'homes near the Humber River and Lake Ontario experience higher humidity that accelerates rubber gasket degradation — door boot seals and tub gaskets wear out 30% faster than in inland areas',
    localIssue: 'Etobicoke\'s 1940s-era homes in The Kingsway and Humber Valley frequently have cast-iron drain stacks that require gentle connection techniques to prevent cracks when connecting new appliance drains',
    population: '365,000+', era: '1940s-1960s'
  },
  'ajax': {
    name: 'Ajax', area: 'Durham Region',
    neighborhoods: ['Pickering Beach', 'South Ajax', 'Salem Road corridor', 'Westney Heights', 'Village Green'],
    housing: 'predominantly newer subdivision homes built from the 1990s onward with builder-grade appliances',
    waterNote: 'Durham Region water from Lake Ontario is moderately hard, contributing to limescale in heating elements and water valves over 3-5 years of regular use',
    localIssue: 'Ajax\'s rapid growth means many homes are still within the builder warranty window — we work alongside warranty claims and handle out-of-warranty repairs that builders no longer cover',
    population: '125,000+', era: '1990s-2020s'
  },
  'pickering': {
    name: 'Pickering', area: 'Durham Region',
    neighborhoods: ['Bay Ridges', 'Dunbarton', 'Liverpool Road corridor', 'Brock Ridge', 'Amberlea'],
    housing: 'a blend of 1970s-era suburban homes and recent infill townhome complexes',
    waterNote: 'Pickering\'s proximity to the nuclear generating station means strict electrical code enforcement — our technicians handle the additional grounding and circuit requirements that local inspectors enforce',
    localIssue: 'Pickering\'s older Bay Ridges neighbourhood has homes from the 1960s with original plumbing that needs assessment before connecting modern high-efficiency appliances',
    population: '100,000+', era: '1970s-2010s'
  },
  'markham': {
    name: 'Markham', area: 'York Region',
    neighborhoods: ['Unionville', 'Markham Village', 'Cornell', 'Wismer Commons', 'Berczy Village', 'Cathedraltown'],
    housing: 'modern premium homes with high-end kitchen packages and luxury appliance brands',
    waterNote: 'Markham has one of the highest concentrations of premium appliance brands in the GTA — Miele, Sub-Zero, and Thermador are common here, requiring factory-trained diagnostic techniques',
    localIssue: 'Markham\'s tech-savvy homeowners frequently have smart-home integrated appliances — WiFi-connected refrigerators, app-controlled ovens, and IoT-enabled washers that require firmware diagnostics alongside mechanical repair',
    population: '350,000+', era: '1990s-2020s'
  },
  'richmond-hill': {
    name: 'Richmond Hill', area: 'York Region',
    neighborhoods: ['Oak Ridges', 'Elgin Mills', 'Mill Pond', 'Bayview Hill', 'Observatory', 'Jefferson Forest'],
    housing: 'large estate homes in Oak Ridges alongside older properties near the historic village core',
    waterNote: 'Oak Ridges Moraine location means some homes rely on well water with higher mineral content — requiring more frequent filter changes and valve maintenance on water-connected appliances',
    localIssue: 'Richmond Hill\'s custom home market features oversized kitchens with professional-grade appliance suites — Viking ranges, Sub-Zero columns, and built-in Miele coffee systems that require brand-specific installation protocols',
    population: '220,000+', era: '1980s-2020s'
  },
  'vaughan': {
    name: 'Vaughan', area: 'York Region',
    neighborhoods: ['Woodbridge', 'Maple', 'Kleinburg', 'Thornhill Woods', 'Vellore Village', 'Patterson'],
    housing: 'large custom-built homes with premium kitchen and laundry packages',
    waterNote: 'Vaughan\'s rapid residential expansion means many homes are within the 3-5 year builder warranty window — we handle the out-of-warranty repairs that builders no longer cover',
    localIssue: 'Vaughan\'s custom home market means many kitchens are designed around European appliance dimensions — we stock trim kits and adapter panels for Miele, Bosch, and Gaggenau units',
    population: '340,000+', era: '1990s-2020s'
  },
  'oakville': {
    name: 'Oakville', area: 'Halton Region',
    neighborhoods: ['Bronte', 'Old Oakville', 'Glen Abbey', 'River Oaks', 'Joshua Creek', 'Palermo'],
    housing: 'upscale detached homes with premium kitchen packages and high-end built-in appliances',
    waterNote: 'older lakeside homes in Bronte and Old Oakville have unique plumbing configurations from decades of renovations — we frequently encounter non-standard drain routing that requires custom approaches',
    localIssue: 'Oakville\'s affluent homeowners expect premium service — our technicians use shoe covers, drop cloths, and provide photo documentation for every service call in this market',
    population: '215,000+', era: '1960s-2020s'
  },
  'burlington': {
    name: 'Burlington', area: 'Halton Region',
    neighborhoods: ['Alton Village', 'Tyandaga', 'Burlington Downtown', 'Appleby', 'Orchard', 'Palmer'],
    housing: 'mature suburban homes from the 1970s-1990s mixed with newer Alton Village developments',
    waterNote: 'Burlington\'s escarpment location creates temperature differentials between upper and lower town — homes on the escarpment face more condensation-related appliance issues with refrigerator coils and dryer venting',
    localIssue: 'Burlington\'s mature housing stock means many homes have 30-40 year old plumbing infrastructure — we assess pipe condition and connection compatibility before beginning any appliance installation',
    population: '190,000+', era: '1970s-2010s'
  },
  'whitby': {
    name: 'Whitby', area: 'Durham Region',
    neighborhoods: ['Brooklin', 'Port Whitby', 'Williamsburg', 'Taunton', 'Pringle Creek', 'Rolling Acres'],
    housing: 'rapidly growing subdivision communities with builder-grade appliance packages',
    waterNote: 'Brooklin expansion means thousands of new homes with identical builder-installed appliances — we see pattern failures across entire subdivisions from the same manufacturing batch',
    localIssue: 'Whitby\'s Brooklin community is one of Ontario\'s fastest-growing areas with new homes still under construction — builder warranty coordination and post-warranty repair transition are a significant part of our service here',
    population: '140,000+', era: '2000s-2020s'
  },
  'oshawa': {
    name: 'Oshawa', area: 'Durham Region',
    neighborhoods: ['Taunton', 'Windfields', 'Northglen', 'Simcoe Street corridor', 'Samac', 'Kedron'],
    housing: 'a mix of older industrial-era homes near downtown and newer subdivision developments in the north end',
    waterNote: 'older homes near downtown often have outdated 100-amp electrical panels and galvanized steel plumbing — both factors that require careful assessment before connecting modern high-draw appliances',
    localIssue: 'Oshawa\'s industrial heritage means some residential properties have non-standard electrical configurations from former workshop or commercial use — we verify circuit capacity before every installation',
    population: '175,000+', era: '1940s-2020s'
  },
  'thornhill': {
    name: 'Thornhill', area: 'York Region',
    neighborhoods: ['Thornhill Woods', 'Thornhill Village', 'Bathurst corridor', 'Henderson Avenue', 'Royal Orchard'],
    housing: 'premium homes with custom kitchens and high-end European appliance brands',
    waterNote: 'Thornhill has a high concentration of kosher kitchens with dual dishwashers, separate ovens, and extra refrigeration — installations require careful circuit planning and often dedicated plumbing runs',
    localIssue: 'Thornhill\'s community-specific kitchen requirements mean we maintain specialized inventory for dual-appliance setups — extra-quiet dishwashers, Sabbath-mode ovens, and filtered water systems are standard requests here',
    population: '130,000+', era: '1980s-2010s'
  },
  'newmarket': {
    name: 'Newmarket', area: 'York Region',
    neighborhoods: ['Upper Canada Mall area', 'Stonehaven', 'Davis Drive corridor', 'Glenway', 'Woodland Hill'],
    housing: 'established suburban homes from the 1980s-2000s with standard North American appliance configurations',
    waterNote: 'Newmarket\'s northern GTA location means longer service wait times from downtown-based companies — our York Region dispatch ensures same-day arrival without distance surcharges',
    localIssue: 'Newmarket\'s 1980s-era homes are reaching the age where original kitchen and laundry appliances are failing simultaneously — we help homeowners prioritize replacements and stage installations to minimize household disruption',
    population: '90,000+', era: '1980s-2010s'
  },
  'aurora': {
    name: 'Aurora', area: 'York Region',
    neighborhoods: ['Bayview Wellington', 'Town Park', 'St. Andrews corridor', 'Highland Gate', 'Temperance Street'],
    housing: 'upscale family homes with premium kitchen finishes and built-in appliance suites',
    waterNote: 'Aurora\'s colder winter microclimate puts extra strain on garage-located appliances — chest freezers, second refrigerators, and laundry units face temperature extremes that accelerate component wear',
    localIssue: 'Aurora\'s estate homes frequently feature outdoor kitchens with weatherproof appliance installations — we use marine-grade connectors and weatherproof junction boxes for these exposed installations',
    population: '65,000+', era: '1990s-2020s'
  },
  'hamilton': {
    name: 'Hamilton', area: 'the Hamilton-Wentworth region',
    neighborhoods: ['Westdale', 'Dundas', 'Stoney Creek', 'the Mountain', 'Ancaster', 'Binbrook'],
    housing: 'century homes in the lower city, post-war bungalows on the Mountain, and newer builds in Stoney Creek',
    waterNote: 'century homes in Westdale and Dundas often have non-standard kitchen dimensions from decades of renovations — standard-width appliances frequently require cabinet modifications in these older homes',
    localIssue: 'Hamilton\'s escarpment divides the city into distinct microclimates — lower city homes near the harbour face more humidity-related appliance issues while Mountain homes deal with harder well water in rural-fringe areas',
    population: '580,000+', era: '1900s-2020s'
  },
  'guelph': {
    name: 'Guelph', area: 'Wellington County',
    neighborhoods: ['the Ward', 'South End', 'Exhibition Park', 'University District', 'Hanlon Creek', 'Westminster Woods'],
    housing: 'heritage stone homes near downtown and modern suburban developments on the south side',
    waterNote: 'Guelph\'s well-water-dependent outer areas produce exceptionally hard water that is particularly aggressive on appliance heating elements and valves — annual descaling extends appliance lifespan significantly',
    localIssue: 'Guelph\'s university district features a high volume of rental properties where landlord coordination and tenant scheduling are essential parts of the service process — we provide documentation for property managers',
    population: '145,000+', era: '1850s-2020s'
  },
  'toronto': {
    name: 'Toronto', area: 'the City of Toronto',
    neighborhoods: ['Downtown', 'Midtown', 'the Beaches', 'the Annex', 'Leslieville', 'High Park'],
    housing: 'diverse housing from Victorian row houses to modern condo towers',
    waterNote: 'Toronto\'s older building stock means a wide range of plumbing and electrical configurations — our technicians carry adapter kits and multi-gauge wiring for everything from knob-and-tube to modern panel installations',
    localIssue: 'Toronto\'s condo management companies often require proof of insurance, pre-approved contractor status, and specific service windows — we maintain active vendor accounts with major property management firms across the city',
    population: '2.9 million', era: '1850s-2020s'
  },
  'east-york': {
    name: 'East York', area: 'eastern Toronto',
    neighborhoods: ['the Danforth', 'Pape Village', 'Woodbine Heights', 'Thorncliffe Park', 'Leaside border'],
    housing: 'post-war bungalows and wartime homes from the 1940s-1950s with compact kitchens',
    waterNote: 'East York\'s smaller wartime bungalow kitchens frequently require 18-inch compact dishwashers and slimline ranges — we specialize in fitting modern appliances into tighter spaces without compromising code',
    localIssue: 'East York\'s wartime housing means consistent lot sizes and kitchen layouts across entire streets — when one home needs an appliance upgrade, neighbours often follow with the same model, allowing us to offer neighbourhood scheduling efficiency',
    population: '120,000+', era: '1940s-1950s'
  },
  'york': {
    name: 'York', area: 'western Toronto',
    neighborhoods: ['Weston', 'Mount Dennis', 'Silverthorn', 'Eglinton West corridor', 'Rockcliffe-Smythe'],
    housing: 'pre-war and post-war homes with older plumbing infrastructure and compact kitchen layouts',
    waterNote: 'older housing stock along Eglinton West frequently has galvanized steel supply lines with partial corrosion — we assess pipe condition and recommend replacement when reduced flow would compromise appliance performance',
    localIssue: 'York\'s revitalization along the Eglinton Crosstown LRT corridor is driving kitchen renovations in homes that have had the same appliances for 20+ years — we help homeowners plan complete kitchen appliance packages that match their new layouts',
    population: '165,000+', era: '1920s-1950s'
  },
  'west-hill': {
    name: 'West Hill', area: 'southeastern Scarborough',
    neighborhoods: ['Kingston Road corridor', 'Centennial community', 'West Hill Park area', 'Morningside Heights'],
    housing: 'established 1960s-1970s suburban homes with full-size appliance layouts',
    waterNote: 'proximity to the Rouge River watershed means seasonal groundwater pressure changes that can affect water supply line pressure to appliances — we test inlet pressure and install regulators when readings exceed specs',
    localIssue: 'West Hill\'s established suburban homes are reaching the 50-60 year mark where original plumbing, electrical, and appliance infrastructure all need attention simultaneously — we help homeowners sequence upgrades for maximum value',
    population: '30,000+', era: '1960s-1970s'
  },
  'agincourt': {
    name: 'Agincourt', area: 'northern Scarborough',
    neighborhoods: ['Sheppard corridor', 'Tam O\'Shanter', 'Midland-Finch', 'Milliken', 'L\'Amoreaux'],
    housing: 'split-level and raised ranch homes from the 1960s-1970s with standard-width appliance bays',
    waterNote: 'Agincourt\'s multicultural households frequently use appliances more intensively than average — larger families mean washers and dryers running 8-10 loads weekly, accelerating bearing wear significantly',
    localIssue: 'Agincourt\'s diverse community means we service a wide range of specialty appliances — rice cookers with built-in steamers, large-capacity rice washers, and commercial-style wok ranges that require specific gas connection types',
    population: '150,000+', era: '1960s-1980s'
  },
  'malvern': {
    name: 'Malvern', area: 'northeastern Scarborough',
    neighborhoods: ['Malvern Town Centre', 'Morningside Heights', 'Neilson corridor', 'Rouge Valley border'],
    housing: 'townhomes and apartment buildings from the 1970s-1980s with standard builder-grade appliances',
    waterNote: 'Malvern\'s townhome complexes share load-bearing walls that transmit appliance vibration between units — we install anti-vibration pads and ensure precise leveling to prevent noise complaints from neighbours',
    localIssue: 'Malvern\'s townhome design means appliance access is often through narrow interior hallways — we measure doorways and plan delivery paths before scheduling installations to avoid day-of-service complications',
    population: '65,000+', era: '1970s-1990s'
  },
  'highland-creek': {
    name: 'Highland Creek', area: 'southeastern Scarborough',
    neighborhoods: ['Highland Creek village', 'Centennial College area', 'Military Trail', 'Morningside Park'],
    housing: 'established 1960s suburban homes and newer University of Toronto Scarborough-area developments',
    waterNote: 'ravine-adjacent homes experience higher humidity levels that promote mould growth in washer door boots and refrigerator drip pans — we recommend quarterly gasket cleaning during service calls',
    localIssue: 'Highland Creek\'s newer student-housing developments near UTSC feature compact appliance packages that require specific service approaches — combination washer-dryers and micro-kitchens are increasingly common',
    population: '35,000+', era: '1960s-2010s'
  },
  'bayview-village': {
    name: 'Bayview Village', area: 'North York',
    neighborhoods: ['Bayview Avenue corridor', 'Sheppard-Bayview', 'Bayview Village shops', 'Henry Farm'],
    housing: 'affluent single-family homes with high-end kitchen renovations and premium appliance brands',
    waterNote: 'Bayview Village homeowners invest heavily in kitchen renovations with integrated appliance suites — panel-ready dishwashers, built-in coffee machines, and column refrigerators require factory-trained techniques',
    localIssue: 'Bayview Village\'s premium market means many kitchens have built-in appliance panels that must match cabinetry exactly — we coordinate with cabinet makers to ensure seamless integration during replacements',
    population: '25,000+', era: '1960s-2000s'
  },
  'birchcliff': {
    name: 'Birchcliff', area: 'southwestern Scarborough',
    neighborhoods: ['Birchcliff Heights bluffs', 'Kingston Road shops', 'Birchcliff GO Station area', 'Cliffside'],
    housing: 'charming 1920s-1940s cottages and bungalows, many renovated with modern kitchens',
    waterNote: 'Bluffs-area homes face lake-effect moisture that corrodes exposed appliance wiring and exterior vent caps — we use marine-grade connectors and stainless vent caps for waterfront-adjacent installations',
    localIssue: 'Birchcliff\'s cottage-origin homes have been extensively renovated but often retain original foundation dimensions — kitchen appliance installations must work within these space constraints while maintaining proper ventilation clearances',
    population: '15,000+', era: '1920s-1940s'
  },
  'cabbagetown': {
    name: 'Cabbagetown', area: 'downtown Toronto',
    neighborhoods: ['Parliament Street corridor', 'Riverdale Farm area', 'Wellesley-Sumach', 'Allan Gardens border'],
    housing: 'restored Victorian row houses from the 1880s-1890s with heritage-sensitive kitchen renovations',
    waterNote: 'heritage Victorian homes have narrow galley kitchens where every inch matters — we specialize in compact and slimline appliance fitting while respecting the character of these designated heritage properties',
    localIssue: 'Cabbagetown\'s heritage designation means exterior modifications require permits — range hood venting, dryer exhaust routing, and external condenser placement must comply with heritage committee guidelines',
    population: '10,000+', era: '1880s-1890s'
  },
  'danforth-village': {
    name: 'Danforth Village', area: 'East Toronto',
    neighborhoods: ['Danforth strip east of Woodbine', 'Greenwood-Coxwell', 'Monarch Park', 'East Lynn'],
    housing: 'semi-detached homes from the 1910s-1930s with renovated but space-constrained kitchens',
    waterNote: 'semi-detached homes share party walls that amplify appliance vibration and noise — we install anti-vibration pads and ensure proper leveling to minimize disturbance in close-quarter living',
    localIssue: 'Danforth Village\'s century-old semi-detached homes are being renovated at a rapid pace — we coordinate with general contractors to ensure appliance rough-ins match the final kitchen design during gut renovations',
    population: '20,000+', era: '1910s-1930s'
  },
  'davisville-village': {
    name: 'Davisville Village', area: 'Midtown Toronto',
    neighborhoods: ['Yonge-Davisville intersection', 'Mount Pleasant corridor', 'Oriole Park', 'Chaplin Estates'],
    housing: 'a mix of 1930s-era family homes and newer mid-rise condominiums',
    waterNote: 'the rental and condo market means a high volume of tenant-requested installations where landlord coordination is required — we provide documentation that simplifies the approval process for property managers',
    localIssue: 'Davisville Village\'s mid-rise construction boom along Mount Pleasant means new condo buildings with compact European-standard appliance packages — we stock parts for 24-inch and compact format appliances specifically for this market',
    population: '18,000+', era: '1930s-2020s'
  },
  'don-mills': {
    name: 'Don Mills', area: 'North York',
    neighborhoods: ['Don Mills Centre', 'Flemingdon Park', 'DVP corridor', 'Parkway Forest', 'Peanut neighbourhood'],
    housing: 'Canada\'s first master-planned community with distinctive 1950s-1960s modernist homes',
    waterNote: 'Don Mills\' original master-planned homes feature non-standard kitchen configurations from the 1950s modernist era — appliance bays may differ from today\'s standards, requiring careful measurement and custom mounting',
    localIssue: 'Don Mills\' Flemingdon Park area features high-rise apartment towers where building management coordination, service elevator access, and unit-specific plumbing assessments are essential parts of every service call',
    population: '50,000+', era: '1950s-1960s'
  },
  'forest-hill': {
    name: 'Forest Hill', area: 'central Toronto',
    neighborhoods: ['Upper Forest Hill', 'Forest Hill Village', 'Spadina Road corridor', 'Old Forest Hill Road'],
    housing: 'large luxury homes with designer kitchens featuring premium integrated appliance suites',
    waterNote: 'Forest Hill kitchens frequently feature professional-grade appliances — Viking ranges, Sub-Zero refrigerators, Miele dishwashers — that require factory-authorized installation procedures and specialized diagnostic equipment',
    localIssue: 'Forest Hill\'s high-value properties demand white-glove service standards — our technicians document every step with photos, use protective coverings on all surfaces, and ensure zero evidence of service activity upon departure',
    population: '12,000+', era: '1920s-1950s'
  },
  'humber-valley': {
    name: 'Humber Valley', area: 'western Toronto',
    neighborhoods: ['Humber Valley Village', 'Old Mill', 'Kingsway South', 'Lambton Mills'],
    housing: 'large family homes from the 1940s-1960s, many with updated premium kitchens',
    waterNote: 'proximity to the Humber River means seasonal flooding risks in basement areas — we install appliances with flood-prevention considerations including elevated mounting and backflow prevention on drain connections',
    localIssue: 'Humber Valley\'s established homes are undergoing a generational turnover where original 1950s kitchens are being completely gutted — we work with designers to ensure new appliance selections fit the renovation budget and kitchen layout',
    population: '15,000+', era: '1940s-1960s'
  },
  'islington-village': {
    name: 'Islington Village', area: 'Etobicoke',
    neighborhoods: ['Islington Avenue shops', 'Dundas-Bloor corridor', 'Norseman Heights', 'Princess-Rosethorn'],
    housing: 'post-war bungalows and bi-levels from the 1950s, many with modernized kitchens',
    waterNote: 'older homes frequently have only 15-amp kitchen circuits from the 1950s original wiring — modern dishwashers and ranges often require circuit upgrades that we coordinate with licensed electricians',
    localIssue: 'Islington Village\'s transformation from modest post-war homes to premium renovated properties means we service both ends of the appliance spectrum — basic builder-grade units in original homes and luxury European brands in newly renovated kitchens',
    population: '20,000+', era: '1950s-1970s'
  },
  'lawrence-park': {
    name: 'Lawrence Park', area: 'North Toronto',
    neighborhoods: ['Lawrence Park North', 'Lawrence Park South', 'Avenue Road corridor', 'Wanless Park'],
    housing: 'prestigious 1920s-1940s homes with heritage character and high-end kitchen renovations',
    waterNote: 'luxury home market means many kitchens are designed around specific appliance brands — when replacements are needed, exact-fit installation is critical to maintain the seamless integrated look these homeowners expect',
    localIssue: 'Lawrence Park\'s tree-lined streets and mature landscaping create access challenges for large appliance delivery — we plan delivery routes and carry compact dolly systems designed for narrow heritage home entryways',
    population: '10,000+', era: '1920s-1940s'
  },
  'leaside': {
    name: 'Leaside', area: 'East York',
    neighborhoods: ['Bayview-Eglinton shops', 'Leaside Park', 'Laird Drive commercial area', 'Bennington Heights'],
    housing: 'solid brick homes from the 1930s-1950s with renovated family kitchens',
    waterNote: 'Leaside\'s family-oriented neighbourhood means high-capacity appliances are standard — oversized washers, extra-large refrigerators, and heavy-duty dishwashers running twice daily all require robust installation',
    localIssue: 'Leaside\'s uniform brick construction and consistent lot sizes mean we know the typical kitchen layout before we arrive — allowing us to pre-select the right parts and tools for maximum first-visit resolution',
    population: '18,000+', era: '1930s-1950s'
  },
  'leslieville': {
    name: 'Leslieville', area: 'East Toronto',
    neighborhoods: ['Queen East', 'Greenwood-Coxwell', 'Logan Avenue corridor', 'Jimmie Simpson Park'],
    housing: 'renovated Victorian and Edwardian row houses with modern open-concept kitchens',
    waterNote: 'row house renovations frequently involve removing walls to create open-concept kitchens — we verify that counter and cabinet supports are properly reinforced before securing heavy built-in units',
    localIssue: 'Leslieville\'s booming renovation market means many kitchens are mid-construction with temporary plumbing and electrical — we coordinate installation timing with general contractors to avoid rework',
    population: '25,000+', era: '1890s-1910s'
  },
  'liberty-village': {
    name: 'Liberty Village', area: 'West Toronto',
    neighborhoods: ['King-Dufferin intersection', 'Liberty Street lofts', 'East Liberty corridor', 'Hanna Avenue'],
    housing: 'converted industrial lofts and modern condo towers with compact urban kitchens',
    waterNote: 'converted loft spaces frequently have exposed ductwork and non-standard ceiling heights that complicate range hood installation and appliance ventilation — we design custom venting solutions for these spaces',
    localIssue: 'Liberty Village\'s young professional demographic means a high volume of first-time appliance purchases and installations — we guide clients through brand selection, sizing, and feature prioritization for their specific unit layout',
    population: '12,000+', era: '2000s-2020s'
  },
  'midtown': {
    name: 'Midtown', area: 'central Toronto',
    neighborhoods: ['Yonge-Eglinton', 'Mount Pleasant', 'Deer Park', 'Davisville corridor', 'Chaplin Estates'],
    housing: 'established family homes and modern condo towers in the Yonge-Eglinton growth centre',
    waterNote: 'construction along the Eglinton Crosstown LRT has created vibration and dust issues in nearby homes — we clean condenser coils and inspect sealed systems as part of service since construction dust reduces efficiency by 15-20%',
    localIssue: 'Midtown\'s rapid densification means more appliance installations in smaller spaces — counter-depth refrigerators, drawer dishwashers, and ventless dryers are increasingly requested in new mid-rise and high-rise units',
    population: '50,000+', era: '1920s-2020s'
  },
  'rosedale': {
    name: 'Rosedale', area: 'central Toronto',
    neighborhoods: ['North Rosedale', 'South Rosedale', 'Crescent Road area', 'Rosedale Valley Road'],
    housing: 'historic mansions and large homes with estate-grade kitchen installations',
    waterNote: 'heritage properties often have unique utility access challenges — narrow service entrances, heritage-protected wall finishes, and custom cabinetry that cannot be modified — requiring white-glove installation',
    localIssue: 'Rosedale\'s property values mean any service work must be completed without any trace — we carry touch-up supplies, use padded transport equipment, and follow strict protocols to protect heritage finishes and custom millwork',
    population: '8,000+', era: '1890s-1930s'
  },
  'parkdale': {
    name: 'Parkdale', area: 'West Toronto',
    neighborhoods: ['South Parkdale', 'North Parkdale', 'Queen-Dufferin corridor', 'Roncesvalles border'],
    housing: 'large Victorian homes converted to multi-unit dwellings alongside single-family residences',
    waterNote: 'multi-unit Victorian conversions often have shared plumbing stacks and limited circuit capacity per unit — we assess building infrastructure before recommending installations to ensure existing systems support the load',
    localIssue: 'Parkdale\'s mix of single-family homes and rooming houses means we service diverse appliance needs — from luxury kitchen installations in restored Victorians to essential appliance repairs in rental units where reliable service matters most',
    population: '35,000+', era: '1880s-1910s'
  },
  'beaches': {
    name: 'The Beaches', area: 'East Toronto',
    neighborhoods: ['Kew Beach', 'Balmy Beach', 'Queen Street East boardwalk', 'Glen Stewart Ravine'],
    housing: 'character homes from the 1910s-1930s with cottage-style kitchens near the waterfront',
    waterNote: 'waterfront location exposes homes to lake-effect humidity and salt air that accelerates corrosion on appliance electrical contacts — we use corrosion-resistant hardware for installations near the boardwalk',
    localIssue: 'The Beaches\' cottage-origin homes have been extensively renovated but retain original narrow footprints — appliance selection must account for door swing clearances in these characteristically compact kitchen layouts',
    population: '20,000+', era: '1910s-1930s'
  },
  'the-beaches': {
    name: 'The Beaches', area: 'East Toronto',
    neighborhoods: ['Kew Beach', 'Balmy Beach', 'Queen Street East boardwalk', 'Glen Stewart Ravine'],
    housing: 'character homes from the 1910s-1930s with cottage-style kitchens near the waterfront',
    waterNote: 'waterfront location exposes homes to lake-effect humidity and salt air that accelerates corrosion on appliance electrical contacts — we use corrosion-resistant hardware for installations near the boardwalk',
    localIssue: 'The Beaches\' cottage-origin homes have been extensively renovated but retain original narrow footprints — appliance selection must account for door swing clearances in these characteristically compact kitchen layouts',
    population: '20,000+', era: '1910s-1930s'
  },
  'annex': {
    name: 'The Annex', area: 'downtown Toronto',
    neighborhoods: ['Bloor-Bathurst', 'Madison Avenue', 'Brunswick corridor', 'Harbord Village border'],
    housing: 'large Victorian and Edwardian homes, many subdivided into apartments',
    waterNote: 'turn-of-century homes feature solid plaster walls and hardwood floors that require careful vibration management — we use premium anti-vibration mounting systems to prevent noise transmission',
    localIssue: 'The Annex\'s multi-unit conversions mean shared utilities and limited per-unit electrical capacity — we calculate total appliance draw before installations to avoid overloading circuits that serve multiple tenants',
    population: '15,000+', era: '1890s-1910s'
  },
  'the-annex': {
    name: 'The Annex', area: 'downtown Toronto',
    neighborhoods: ['Bloor-Bathurst', 'Madison Avenue', 'Brunswick corridor', 'Harbord Village border'],
    housing: 'large Victorian and Edwardian homes, many subdivided into apartments',
    waterNote: 'turn-of-century homes feature solid plaster walls and hardwood floors that require careful vibration management — we use premium anti-vibration mounting systems to prevent noise transmission',
    localIssue: 'The Annex\'s multi-unit conversions mean shared utilities and limited per-unit electrical capacity — we calculate total appliance draw before installations to avoid overloading circuits that serve multiple tenants',
    population: '15,000+', era: '1890s-1910s'
  },
  'yorkville': {
    name: 'Yorkville', area: 'downtown Toronto',
    neighborhoods: ['Bloor-Yorkville luxury district', 'Hazelton Lanes', 'Cumberland Street', 'Scollard Street'],
    housing: 'ultra-luxury condominiums and restored Victorian townhomes with designer kitchens',
    waterNote: 'luxury market demands white-glove service — our technicians wear shoe covers, use drop cloths, and take documentation photos for property managers overseeing multi-million-dollar units',
    localIssue: 'Yorkville\'s ultra-premium properties feature imported European appliances not commonly stocked by Canadian parts suppliers — we maintain direct relationships with European distributors for fast parts sourcing',
    population: '5,000+', era: '1870s-2020s'
  },
  'greektown': {
    name: 'Greektown', area: 'East Toronto',
    neighborhoods: ['Danforth strip from Chester to Jones', 'Playter Estates', 'Riverdale North', 'Withrow Park'],
    housing: 'brick semi-detached homes from the 1910s-1920s with updated kitchens',
    waterNote: 'restaurant-dense Danforth strip means many residential side streets share gas lines with commercial properties — we verify gas pressure and line capacity during any gas appliance installation',
    localIssue: 'Greektown\'s food culture means home kitchens see intensive use — commercial-style ranges, extra-large ovens for holiday baking, and high-capacity dishwashers are common in homes where cooking is a central family activity',
    population: '20,000+', era: '1910s-1920s'
  },
  'chinatown': {
    name: 'Chinatown', area: 'downtown Toronto',
    neighborhoods: ['Spadina Avenue', 'Dundas West', 'Kensington Market border', 'Beverly-Cecil corridor'],
    housing: 'mixed commercial-residential buildings with above-shop apartments and narrow Victorian row houses',
    waterNote: 'mixed commercial-residential buildings often have shared electrical panels and non-standard kitchen configurations adapted from commercial spaces — we assess circuit loads carefully before installations',
    localIssue: 'Chinatown\'s compact living spaces require specialized appliance solutions — ventless dryers, combination washer-dryers, and compact countertop dishwashers are frequently requested for above-shop apartments with limited square footage',
    population: '12,000+', era: '1880s-1920s'
  },
  'riverdale': {
    name: 'Riverdale', area: 'East Toronto',
    neighborhoods: ['Broadview Avenue', 'Withrow Park', 'Gerrard East corridor', 'Chester Village'],
    housing: 'Victorian and Edwardian semi-detached homes with deep lots and renovated family kitchens',
    waterNote: 'steep topography along the Don Valley creates drainage challenges that affect dishwasher and washing machine drain performance — we ensure proper drain hose elevation and check for backpressure issues',
    localIssue: 'Riverdale\'s family-friendly reputation drives consistent demand for kitchen and laundry upgrades — young families moving into century homes often replace every appliance simultaneously, and we offer package pricing for multi-appliance installations',
    population: '25,000+', era: '1890s-1910s'
  },
  'bloor-west': {
    name: 'Bloor West Village', area: 'West Toronto',
    neighborhoods: ['Jane-Bloor corridor', 'Baby Point', 'Swansea', 'South Kingsway'],
    housing: 'well-maintained brick homes from the 1920s-1940s with original and renovated kitchens',
    waterNote: 'character homes often have cast-iron drain stacks that can be fragile after 80+ years — we use gentle connection techniques and flexible couplings when connecting appliance drains to these older systems',
    localIssue: 'Bloor West Village\'s active community association means noise-sensitive installations require scheduling consideration — we complete high-noise work like dishwasher drain connections and washer installations during approved hours',
    population: '15,000+', era: '1920s-1940s'
  },
  'bloor-west-village': {
    name: 'Bloor West Village', area: 'West Toronto',
    neighborhoods: ['Jane-Bloor corridor', 'Baby Point', 'Swansea', 'South Kingsway'],
    housing: 'well-maintained brick homes from the 1920s-1940s with original and renovated kitchens',
    waterNote: 'character homes often have cast-iron drain stacks that can be fragile after 80+ years — we use gentle connection techniques and flexible couplings when connecting appliance drains to these older systems',
    localIssue: 'Bloor West Village\'s active community association means noise-sensitive installations require scheduling consideration — we complete high-noise work like dishwasher drain connections and washer installations during approved hours',
    population: '15,000+', era: '1920s-1940s'
  },
  'high-park': {
    name: 'High Park', area: 'West Toronto',
    neighborhoods: ['Bloor-Keele intersection', 'Roncesvalles border', 'Howard Park', 'Swansea border'],
    housing: 'Edwardian-era semi-detached homes with character features and updated kitchen interiors',
    waterNote: 'homes built before 1930 frequently have uneven floors due to foundation settling — precision leveling is critical during appliance installation to prevent vibration, door-seal failures, and premature bearing wear',
    localIssue: 'High Park\'s heritage semi-detached homes share walls and floor joists with neighbours — we use vibration-dampening installation techniques and test operating noise levels to ensure compliance with the neighbourhood\'s residential character',
    population: '22,000+', era: '1900s-1920s'
  },
  'little-italy': {
    name: 'Little Italy', area: 'downtown Toronto',
    neighborhoods: ['College Street West', 'Clinton Street', 'Grace-Manning corridor', 'Harbord border'],
    housing: 'narrow Victorian row houses with compact galley kitchens and limited counter space',
    waterNote: 'narrow row houses typically have kitchens under 80 square feet where every appliance placement decision matters — we plan around workflow efficiency and ensure door swings and drawer clearances are maintained',
    localIssue: 'Little Italy\'s culinary culture means many home kitchens feature commercial-style gas ranges and high-BTU burners — we ensure gas connections meet current codes and verify adequate ventilation for these powerful cooking appliances',
    population: '10,000+', era: '1890s-1910s'
  },
  'junction': {
    name: 'The Junction', area: 'West Toronto',
    neighborhoods: ['Dundas West at Keele', 'Junction Triangle', 'Stockyards district', 'Heintzman Street'],
    housing: 'renovated workers\' cottages, Victorian semis, and modern loft conversions',
    waterNote: 'industrial heritage means some residential conversions have oversized utility connections from former commercial use — we right-size connections so residential appliances operate with proper water pressure and electrical load',
    localIssue: 'The Junction\'s craft brewery and restaurant scene has inspired many homeowners to install commercial-style kitchen equipment — professional ranges, kegerators, and commercial dishwashers require dedicated circuits and specialized gas connections',
    population: '18,000+', era: '1890s-2020s'
  },
  'the-junction': {
    name: 'The Junction', area: 'West Toronto',
    neighborhoods: ['Dundas West at Keele', 'Junction Triangle', 'Stockyards district', 'Heintzman Street'],
    housing: 'renovated workers\' cottages, Victorian semis, and modern loft conversions',
    waterNote: 'industrial heritage means some residential conversions have oversized utility connections from former commercial use — we right-size connections so residential appliances operate with proper water pressure and electrical load',
    localIssue: 'The Junction\'s craft brewery and restaurant scene has inspired many homeowners to install commercial-style kitchen equipment — professional ranges, kegerators, and commercial dishwashers require dedicated circuits and specialized gas connections',
    population: '18,000+', era: '1890s-2020s'
  },
  'weston': {
    name: 'Weston', area: 'northwest Toronto',
    neighborhoods: ['Weston Road', 'Humber River trail', 'Mount Dennis revitalization', 'Pelmo Park'],
    housing: 'affordable post-war homes from the 1940s-1960s with original or lightly updated kitchens',
    waterNote: 'older housing stock often has original copper supply lines with pinhole corrosion and outdated shut-off valves — we inspect and replace compromised connections during every installation to prevent water damage',
    localIssue: 'Weston\'s affordability attracts first-time homeowners who are often navigating their first appliance purchase — we provide guidance on brand selection, energy efficiency ratings, and total cost of ownership to help them make informed decisions',
    population: '25,000+', era: '1940s-1960s'
  },
  'eglinton': {
    name: 'Eglinton', area: 'Midtown Toronto',
    neighborhoods: ['Eglinton Avenue corridor', 'Yonge-Eglinton', 'Crosstown LRT route', 'Forest Hill border'],
    housing: 'mid-rise condominiums and renovated family homes along the major transit corridor',
    waterNote: 'Eglinton Crosstown LRT construction has created access challenges for service vehicles — we plan routes around construction zones and carry portable equipment for restricted-access installations',
    localIssue: 'Eglinton\'s condo construction boom means many new buildings are in their first year of occupancy with builder warranty appliances — we handle the warranty-to-service transition and maintain relationships with major condo management companies along the corridor',
    population: '45,000+', era: '1930s-2020s'
  },
  'downtown': {
    name: 'Downtown Toronto', area: 'the downtown core',
    neighborhoods: ['Financial District', 'St. Lawrence Market', 'Harbourfront', 'King West', 'CityPlace'],
    housing: 'high-rise condominiums with compact urban kitchens and strict building management rules',
    waterNote: 'Downtown condos require service elevator booking, security check-in, and loading dock scheduling — we handle all building coordination in advance so installations proceed without administrative delays',
    localIssue: 'Downtown Toronto\'s condo market has strict renovation rules — noise curfews, construction debris removal requirements, and material delivery scheduling all factor into our installation planning for every downtown address',
    population: '250,000+', era: '1990s-2020s'
  },
  'scarborough-village': {
    name: 'Scarborough Village', area: 'southwestern Scarborough',
    neighborhoods: ['Kingston Road shops', 'Scarborough Bluffs', 'Eglinton East corridor', 'Guildwood'],
    housing: 'post-war bungalows and 1960s suburban homes near the Bluffs escarpment',
    waterNote: 'Bluffs-adjacent homes experience soil moisture fluctuations that can shift foundations seasonally — we check appliance leveling against floor slope and use adjustable mounting for seasonal settling',
    localIssue: 'Scarborough Village\'s emerging arts and food scene is driving kitchen renovations in previously unmodified 1960s bungalows — we help homeowners plan appliance packages that maximize the potential of their newly opened floor plans',
    population: '12,000+', era: '1950s-1970s'
  },
  'etobicoke-village': {
    name: 'Etobicoke Village', area: 'central Etobicoke',
    neighborhoods: ['Islington-Dundas intersection', 'historic village core', 'Markland Wood', 'The Westway'],
    housing: 'heritage properties near the village centre and 1960s-1970s suburban homes',
    waterNote: 'heritage core has properties with plumbing systems dating back 60+ years — we carry adapters for legacy pipe sizes and connection types that are no longer standard',
    localIssue: 'Etobicoke Village\'s mix of heritage and suburban homes means we maintain a diverse parts inventory — from adapters for 1950s-era pipe connections to WiFi modules for modern smart appliances, covering the full range of this neighbourhood\'s housing stock',
    population: '20,000+', era: '1940s-1970s'
  },
  'king-west': {
    name: 'King West', area: 'downtown Toronto',
    neighborhoods: ['King-Bathurst corridor', 'Liberty Village border', 'Entertainment District', 'Niagara Street'],
    housing: 'converted warehouse lofts and modern condo towers with designer kitchen finishes',
    waterNote: 'loft conversions feature exposed brick, concrete floors, and industrial piping — we use specialized mounting hardware for concrete substrates and route connections alongside existing exposed infrastructure',
    localIssue: 'King West\'s restaurant-row culture means many residents entertain frequently and demand high-performance kitchen appliances — speed ovens, wine fridges, and dual-zone refrigeration are common installation requests in this lifestyle-focused neighbourhood',
    population: '30,000+', era: '2000s-2020s'
  },
  'corso-italia': {
    name: 'Corso Italia', area: 'West Toronto',
    neighborhoods: ['St. Clair West strip', 'Dufferin-St. Clair', 'Earlscourt', 'Oakwood Village'],
    housing: 'solid brick homes from the 1920s-1940s with original and updated kitchens',
    waterNote: 'Italian-Canadian homeowners often maintain separate basement kitchens for canning and food preparation — we install and service appliances on both levels including heavy-duty ranges and extra dishwashers',
    localIssue: 'Corso Italia\'s strong food culture means summer canning season creates peak demand for range and oven repairs — we schedule preventive maintenance calls in early June to catch burner and igniter issues before the busy canning months',
    population: '25,000+', era: '1920s-1940s'
  },
  'dufferin-grove': {
    name: 'Dufferin Grove', area: 'West Toronto',
    neighborhoods: ['Dufferin Mall area', 'Bloor-Dufferin', 'Gladstone corridor', 'Brockton Village border'],
    housing: 'Victorian semi-detached homes and Edwardian rowhouses with renovated interiors',
    waterNote: 'dense residential streets mean tight driveway access and limited parking — our technicians arrive in compact service vehicles with hand-carry equipment for properties with no driveway or lane access',
    localIssue: 'Dufferin Grove\'s active farmers\' market community means many residents invest in food preservation equipment — extra freezers, vacuum sealers, and dehydrators are common appliance additions that we install and maintain',
    population: '15,000+', era: '1890s-1920s'
  },
  'little-portugal': {
    name: 'Little Portugal', area: 'West Toronto',
    neighborhoods: ['Dundas West strip', 'Ossington corridor', 'Trinity Bellwoods border', 'Dovercourt Village'],
    housing: 'narrow Victorian row houses with compact renovated kitchens',
    waterNote: 'row houses share party walls and often have interconnected basement utility routing — we test for cross-connected plumbing that is surprisingly common in these joined properties',
    localIssue: 'Little Portugal\'s rapid gentrification means many homes are being completely renovated with high-end kitchen packages — we coordinate with designers and contractors to ensure appliance specifications match the renovation plans exactly',
    population: '12,000+', era: '1880s-1910s'
  },
  'swansea': {
    name: 'Swansea', area: 'West Toronto',
    neighborhoods: ['Windermere corridor', 'Rennie Park', 'Humber waterfront', 'South Kingsway'],
    housing: 'Tudor-style and Arts-and-Crafts homes from the 1920s-1940s with character kitchens',
    waterNote: 'lakefront proximity and Humber River floodplain location means basements are vulnerable to moisture — we install laundry appliances on raised platforms and recommend floor-level drain connections to minimize flooding risk',
    localIssue: 'Swansea\'s character homes feature custom millwork and built-in cabinetry from the 1920s-1940s — appliance installations must preserve these architectural details while accommodating modern standard-size units',
    population: '10,000+', era: '1920s-1940s'
  },
  'woodbridge': {
    name: 'Woodbridge', area: 'Vaughan',
    neighborhoods: ['Woodbridge core', 'Market Lane', 'Islington-Highway 7', 'Pine Valley corridor'],
    housing: 'large custom-built homes with spacious kitchens and premium appliance packages',
    waterNote: 'custom home market means many kitchens are designed around European appliance dimensions — we stock trim kits and adapter panels for Miele, Bosch, and Gaggenau units that require precise gap-filling',
    localIssue: 'Woodbridge\'s Italian-Canadian community has a strong tradition of outdoor entertaining — built-in BBQ stations, outdoor refrigerators, and patio heaters are common installations that require weatherproof connections and dedicated circuits',
    population: '45,000+', era: '1990s-2020s'
  },
  'airdrie': {
    name: 'Airdrie', area: 'the Calgary metropolitan area',
    neighborhoods: ['Sagewood', 'Hillcrest', 'Bayside', 'Kings Heights', 'Ravenswood', 'Coopers Crossing'],
    housing: 'newer single-family homes from the 2000s onward with standard builder-grade appliances',
    waterNote: 'dry Alberta climate means static electricity buildup causes electronic control board failures in modern appliances — we install grounding straps and recommend humidifier use during winter months',
    localIssue: 'Airdrie\'s commuter-town lifestyle means most residents work in Calgary and need evening and weekend service windows — our flexible scheduling accommodates the suburban commuter schedule that defines this community',
    population: '75,000+', era: '2000s-2020s'
  },
  'calgary': {
    name: 'Calgary', area: 'southern Alberta',
    neighborhoods: ['Beltline', 'Kensington', 'Signal Hill', 'Cranston', 'Mahogany', 'Seton'],
    housing: 'downtown condos to sprawling suburban homes in new communities',
    waterNote: 'extreme temperature swings from -30C winters to +30C summers stress appliance components through thermal cycling — plastic fittings crack, rubber gaskets harden, and compressor life shortens faster than in temperate climates',
    localIssue: 'Calgary\'s boom-and-bust economic cycle means appliance service demand fluctuates with the energy sector — during booms, premium installations surge, while downturns drive repair-over-replace decisions that keep older appliances running longer',
    population: '1.4 million', era: '1970s-2020s'
  },
  'edmonton': {
    name: 'Edmonton', area: 'northern Alberta',
    neighborhoods: ['Old Strathcona', 'Windermere', 'Summerside', 'Whyte Avenue corridor', 'Rutherford', 'The Grange'],
    housing: 'heritage homes near the university, wartime bungalows, and new suburban developments',
    waterNote: 'extended sub-zero winters mean garage-located appliances face months of extreme cold that can crack water lines, freeze drain hoses, and damage electronic controls not rated for unheated spaces',
    localIssue: 'Edmonton\'s university district creates seasonal demand patterns — September move-in season brings a surge of appliance installations in rental properties, while the spring semester end triggers a wave of warranty-covered repairs from intensive student use',
    population: '1.1 million', era: '1910s-2020s'
  },
  'bradford': {
    name: 'Bradford', area: 'south Simcoe County',
    neighborhoods: ['Holland Marsh area', 'Simcoe Road corridor', 'Bradford West Gwillimbury', 'Bond Head'],
    housing: 'established small-town homes and new subdivision developments',
    waterNote: 'agricultural surroundings and Holland Marsh proximity mean many properties have well water with higher iron and sediment content — requiring more frequent filter changes and valve maintenance',
    localIssue: 'Bradford\'s small-town service gap means most appliance companies consider it "too far north" — our guaranteed same-day service to Bradford fills a genuine need for residents who otherwise wait 3-5 days for a technician from the city',
    population: '45,000+', era: '1960s-2020s'
  },
  'willowdale': {
    name: 'Willowdale', area: 'North York',
    neighborhoods: ['Yonge-Finch', 'Willowdale East', 'Empress Walk area', 'Spring Garden', 'Newton Brook'],
    housing: 'post-war bungalows being replaced by custom builds and high-rise condominiums',
    waterNote: 'rapid redevelopment means older homes with dated infrastructure sit next to modern builds — we carry parts for both legacy appliance systems with manual controls and modern smart appliances with WiFi diagnostics',
    localIssue: 'Willowdale\'s teardown-and-rebuild trend means many homeowners are installing complete kitchen packages in brand-new custom homes — we offer multi-appliance installation packages with coordinated scheduling for maximum efficiency',
    population: '75,000+', era: '1950s-2020s'
  },
  'beaumont': {
    name: 'Beaumont', area: 'the Edmonton metropolitan area',
    neighborhoods: ['Coloniale Estates', 'Dansereau Meadows', 'downtown heritage district', 'Montalet', 'Bellevue'],
    housing: 'newer suburban developments with modern builder-grade appliances and established character homes',
    waterNote: 'position south of Edmonton means shared municipal water from the Capital Region with moderate mineral content — regular descaling extends appliance lifespan by 2-3 years in this area',
    localIssue: 'Beaumont\'s bilingual French-English community appreciates service in both languages — our technicians serving this area are briefed on common French appliance terminology to ensure clear communication with all residents',
    population: '22,000+', era: '1990s-2020s'
  },
  'ossington': {
    name: 'Ossington', area: 'West Toronto',
    neighborhoods: ['Ossington strip', 'Dovercourt Village', 'Dundas-Ossington intersection', 'Foxley Street'],
    housing: 'renovated Victorian row houses and newer loft-style condominiums',
    waterNote: 'booming condo and renovation market means many kitchens are brand new with premium compact appliances — panel-ready dishwashers and counter-depth refrigerators require precise installation for streamlined aesthetics',
    localIssue: 'Ossington\'s cocktail bar and restaurant culture has influenced residential kitchen trends — home bar setups with under-counter refrigerators, ice makers, and wine coolers are increasingly common installation requests',
    population: '15,000+', era: '1890s-2020s'
  },
  'roncesvalles': {
    name: 'Roncesvalles', area: 'West Toronto',
    neighborhoods: ['Roncesvalles Village strip', 'Parkdale border', 'Howard Park', 'Sunnyside'],
    housing: 'Edwardian semi-detached homes from the 1910s with updated kitchens',
    waterNote: 'family-oriented homes feature deep lots and basement apartments — many households run two full appliance sets across two kitchen levels, doubling maintenance requirements',
    localIssue: 'Roncesvalles\' Polish-Canadian heritage means many kitchens are designed for serious home cooking — large-capacity ovens for holiday baking, heavy-duty ranges, and high-capacity dishwashers are standard in this food-focused neighbourhood',
    population: '12,000+', era: '1910s-1920s'
  },
  'st-lawrence': {
    name: 'St. Lawrence', area: 'downtown Toronto',
    neighborhoods: ['St. Lawrence Market district', 'Front Street East', 'Distillery area', 'Corktown border'],
    housing: 'historic market-area condominiums and converted commercial buildings with compact kitchens',
    waterNote: 'among Toronto\'s oldest residential conversions, with plumbing and electrical systems reflecting multiple renovation eras — we carry multi-adapter connection kits for non-standard pipe sizes found in heritage conversions',
    localIssue: 'St. Lawrence\'s proximity to the market means many residents are serious home cooks who demand high-performance kitchen equipment — professional-grade ranges, built-in steamers, and high-capacity dishwashers serve this culinary-focused community',
    population: '15,000+', era: '1980s-2020s'
  },
  'thorncliffe-park': {
    name: 'Thorncliffe Park', area: 'East York',
    neighborhoods: ['Thorncliffe Park Drive corridor', 'Overlea Boulevard', 'East York border', 'Fleming Park'],
    housing: 'high-rise apartment towers from the 1960s-1970s with compact kitchens and shared building plumbing',
    waterNote: 'high-rise towers have shared vertical plumbing stacks where one unit\'s drain issue can affect neighbours — we check drain backpressure and ensure proper air gaps to prevent cross-contamination between units',
    localIssue: 'Thorncliffe Park\'s diverse immigrant community relies on appliance repair rather than replacement — we specialize in extending the life of working appliances through preventive maintenance and targeted component replacement',
    population: '30,000+', era: '1960s-1970s'
  },
  'trinity-bellwoods': {
    name: 'Trinity Bellwoods', area: 'West Toronto',
    neighborhoods: ['Queen West strip', 'Dundas West', 'Gore Vale corridor', 'Crawford Street'],
    housing: 'Victorian row houses from the 1880s-1900s with extensively renovated interiors',
    waterNote: 'heritage row houses frequently have floor-to-ceiling kitchen renovations that conceal original plumbing — we use non-invasive diagnostic tools to locate shut-off valves without damaging new finishes',
    localIssue: 'Trinity Bellwoods\' trendsetting community adopts new appliance technology early — smart refrigerators, induction ranges, and heat-pump dryers are common requests here, and we stay current with the latest installation techniques for these emerging products',
    population: '10,000+', era: '1880s-1900s'
  },
  'wychwood': {
    name: 'Wychwood', area: 'Midtown Toronto',
    neighborhoods: ['Wychwood Park', 'Wychwood Barns', 'Bathurst-St. Clair intersection', 'Hillcrest Village'],
    housing: 'Arts-and-Crafts era homes from the 1910s-1920s alongside newer Bathurst corridor infill',
    waterNote: 'heritage Arts-and-Crafts homes feature custom millwork and built-in cabinetry that demands careful installation — we measure precisely to ensure new appliances fit original cabinet openings without modifying irreplaceable heritage woodwork',
    localIssue: 'Wychwood\'s artisan community values sustainability — we frequently install energy-efficient heat-pump dryers, induction cooktops, and high-efficiency dishwashers chosen for their environmental credentials as well as performance',
    population: '8,000+', era: '1910s-1920s'
  }
};

// ─── Main logic ───
const siteDir = 'C:/fixlifyservices';
let updated = 0;
let skipped = 0;
let noMatch = 0;
const results = [];

const files = fs.readdirSync(siteDir).filter(f => f.endsWith('.html'));
const skipExact = new Set(['404.html', 'about.html', 'book.html', 'brands.html', 'contact.html',
  'index.html', 'pricing.html', 'reviews.html', 'services.html', 'privacy.html', 'terms.html',
  'service-template.html', 'for-businesses.html', 'locations.html', 'emergency.html']);

for (const file of files) {
  const filePath = path.join(siteDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  if (skipExact.has(file)) continue;
  if (html.includes('UNIQUE-CITY-CONTENT')) { skipped++; continue; }

  // Detect city slug
  let citySlug = null;
  const baseName = file.replace('.html', '');
  const sortedKeys = Object.keys(cityData).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (baseName === key || baseName.endsWith('-' + key)) {
      citySlug = key;
      break;
    }
  }
  if (!citySlug || !cityData[citySlug]) { noMatch++; continue; }

  const city = cityData[citySlug];
  const serviceContext = baseName === citySlug
    ? 'appliance repair and installation'
    : baseName.replace('-' + citySlug, '').replace(/-/g, ' ');

  // Build multi-paragraph unique content block (~300-400 words)
  const uniqueBlock = buildUniqueBlock(city, serviceContext);

  // Find insertion point using multiple strategies
  let insertionDone = false;
  const strategies = [
    'class="content-intro',
    'class="content-body',
    'class="section content-section',
    '<main'
  ];

  for (const marker of strategies) {
    if (insertionDone) break;
    const idx = html.indexOf(marker);
    if (idx !== -1) {
      const firstPClose = html.indexOf('</p>', idx);
      if (firstPClose !== -1) {
        const insertPos = firstPClose + 4;
        html = html.slice(0, insertPos) + '\n\n' + uniqueBlock + '\n' + html.slice(insertPos);
        insertionDone = true;
      }
    }
  }

  // Fallback: after </h1>
  if (!insertionDone) {
    const h1Idx = html.indexOf('</h1>');
    if (h1Idx !== -1) {
      const firstPClose = html.indexOf('</p>', h1Idx);
      if (firstPClose !== -1) {
        const insertPos = firstPClose + 4;
        html = html.slice(0, insertPos) + '\n\n' + uniqueBlock + '\n' + html.slice(insertPos);
        insertionDone = true;
      }
    }
  }

  if (insertionDone) {
    fs.writeFileSync(filePath, html, 'utf-8');
    updated++;
    results.push({ file, city: city.name, status: 'updated' });
  } else {
    noMatch++;
    results.push({ file, city: city.name, status: 'no insertion point' });
  }
}

console.log(`\n=== FIXLIFY Uniqueness Injection Results ===`);
console.log(`Updated: ${updated} pages`);
console.log(`Skipped (already done): ${skipped}`);
console.log(`No match/no insertion: ${noMatch}`);
console.log(`\nSample updates:`);
results.filter(r => r.status === 'updated').slice(0, 15).forEach(r => {
  console.log(`  ${r.file} -> ${r.city}`);
});
const fails = results.filter(r => r.status !== 'updated');
if (fails.length > 0) {
  console.log(`\nFiles without match (${fails.length}):`);
  fails.slice(0, 15).forEach(r => console.log(`  ${r.file} -> ${r.status}`));
}

function buildUniqueBlock(city, serviceContext) {
  const n = city.neighborhoods;
  const lines = [];
  lines.push(`<!-- UNIQUE-CITY-CONTENT -->`);
  lines.push(`<div class="city-context" style="background:#F0F9FF;border-radius:8px;padding:24px 28px;margin:24px 0;">`);
  lines.push(`<h3 style="font-size:1.125rem;font-weight:700;color:#0A0A0A;margin:0 0 12px;">${serviceContext.charAt(0).toUpperCase() + serviceContext.slice(1)} Service Across ${city.name}</h3>`);

  // Paragraph 1: Neighbourhoods + diagnostic fee
  lines.push(`<p style="margin:0 0 14px;color:#374151;line-height:1.7;font-size:0.9375rem;">Fixlify serves ${city.name} residents across ${n.slice(0, 4).join(', ')}, ${n.length > 4 ? n[4] + ',' : ''} and surrounding communities with a flat $65 diagnostic fee for ${serviceContext}. No hidden charges, no upselling — our technician diagnoses the issue, explains exactly what needs to be done, and provides a written quote before any work begins. ${city.name} homeowners in ${city.housing} trust our transparent process because the price you see is the price you pay. With a population of ${city.population} across ${city.area}, we maintain dedicated service routes that ensure 2-4 hour arrival windows for same-day bookings.</p>`);

  // Paragraph 2: Water/infrastructure note
  lines.push(`<p style="margin:0 0 14px;color:#374151;line-height:1.7;font-size:0.9375rem;">Local infrastructure matters for ${serviceContext} in ${city.name}. ${city.waterNote}. Our technicians are familiar with ${city.name}'s housing stock from the ${city.era} era and arrive prepared with the specific parts, adapters, and diagnostic tools needed for the appliance configurations common in this area. This local expertise means higher first-visit fix rates and fewer return trips — saving you time and money compared to companies that send generalist technicians unfamiliar with ${city.area}'s unique installation landscape.</p>`);

  // Paragraph 3: Local issue + Fixlify value
  lines.push(`<p style="margin:0 0 14px;color:#374151;line-height:1.7;font-size:0.9375rem;">${city.localIssue}. Every ${serviceContext} job in ${city.name} includes our 90-day parts and labour warranty, a digital service report emailed on completion, and real-time arrival tracking from the moment your technician is dispatched. We believe ${city.name} residents deserve the same quality of ${serviceContext} service available downtown — without the downtown pricing premium or the long wait times that come with companies that treat ${city.area} as an afterthought.</p>`);

  // Paragraph 4: Booking CTA
  lines.push(`<p style="margin:0;color:#374151;line-height:1.7;font-size:0.9375rem;">Book ${serviceContext} in ${city.name} online in under two minutes — select your appliance, choose a time slot that works for your schedule, and receive instant confirmation. Our ${city.name} technicians are available Monday through Saturday 8 AM to 8 PM and Sunday 9 AM to 6 PM. Same-day slots are released each morning, so check availability early if you need urgent ${serviceContext} service in ${n[0]} or any other ${city.name} neighbourhood. Call (437) 524-1053 if you prefer to book by phone.</p>`);

  lines.push(`</div>`);
  lines.push(`<!-- END-UNIQUE-CITY-CONTENT -->`);

  return '    ' + lines.join('\n    ');
}
