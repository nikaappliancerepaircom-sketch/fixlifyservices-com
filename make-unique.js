/**
 * make-unique.js — Inject unique city-specific paragraphs into FIXLIFY service+city pages
 * Adds a <p class="city-context"> block after the first <p> in .content-intro
 * to boost inter-page uniqueness above 80%.
 */
const fs = require('fs');
const path = require('path');

// ─── City data with neighborhoods, housing types, local facts ───
const cityData = {
  'brampton': {
    name: 'Brampton',
    neighborhoods: 'Springdale, Heart Lake, Bramalea, and Sandalwood Heights',
    housing: 'large detached homes built between 2000 and 2020 with multi-generational layouts',
    fact: "Brampton's hard water from Peel Region accelerates mineral buildup in appliance components — heating elements calcify faster, water inlet valves develop scale deposits, and dishwasher spray arms clog more frequently than the GTA average",
    area: 'Peel Region'
  },
  'mississauga': {
    name: 'Mississauga',
    neighborhoods: 'Port Credit, Erin Mills, Clarkson, and Meadowvale',
    housing: 'a mix of 1970s-era detached homes and newer high-rise condominiums near Square One',
    fact: "Mississauga's lakefront humidity in Port Credit and Lakeview causes accelerated corrosion on appliance contacts and condensation issues in refrigeration coils — problems rarely seen in northern GTA suburbs",
    area: 'Peel Region'
  },
  'scarborough': {
    name: 'Scarborough',
    neighborhoods: 'Agincourt, Malvern, Highland Creek, and Scarborough Village',
    housing: 'post-war bungalows from the 1950s-1960s alongside newer townhome developments',
    fact: "Scarborough's older homes often have original 15-amp kitchen circuits that cannot handle modern high-draw appliances — we regularly upgrade wiring during installations to meet current code requirements",
    area: 'eastern Toronto'
  },
  'north-york': {
    name: 'North York',
    neighborhoods: 'Willowdale, Don Mills, Bayview Village, and Lawrence Park',
    housing: 'everything from 1950s split-levels to luxury high-rise condos along Yonge Street',
    fact: "North York's condo boom along Yonge and Sheppard means a high volume of compact and panel-ready appliance installations — units that require different mounting hardware and specialized knowledge of stacked plumbing configurations",
    area: 'northern Toronto'
  },
  'etobicoke': {
    name: 'Etobicoke',
    neighborhoods: 'Mimico, Islington Village, Humber Valley, and The Kingsway',
    housing: 'established post-war homes from the 1940s-1960s mixed with waterfront condominiums',
    fact: "Etobicoke homes near the Humber River and Lake Ontario experience higher humidity that accelerates rubber gasket degradation in washers and dishwashers — door boot seals and tub gaskets wear out 30% faster than in inland areas",
    area: 'western Toronto'
  },
  'ajax': {
    name: 'Ajax',
    neighborhoods: 'Pickering Beach, South Ajax, and the Salem Road corridor',
    housing: 'predominantly newer subdivision homes built from the 1990s onward with builder-grade appliances',
    fact: "Ajax draws its water from Lake Ontario through Durham Region's treatment system, which produces moderately hard water that contributes to limescale in dishwasher heating elements and washing machine water valves over 3-5 years of use",
    area: 'Durham Region'
  },
  'pickering': {
    name: 'Pickering',
    neighborhoods: 'Bay Ridges, Dunbarton, and the Liverpool Road corridor',
    housing: 'a blend of 1970s-era suburban homes and recent infill townhome complexes',
    fact: "Pickering's proximity to the nuclear generating station means strict electrical code enforcement — our technicians are experienced with the additional grounding and circuit requirements that Pickering inspectors enforce on hardwired appliance installations",
    area: 'Durham Region'
  },
  'markham': {
    name: 'Markham',
    neighborhoods: 'Unionville, Markham Village, Cornell, and Wismer Commons',
    housing: 'modern premium homes with high-end kitchen packages and luxury appliance brands',
    fact: "Markham has one of the highest concentrations of premium appliance brands in the GTA — Miele, Sub-Zero, and Thermador are common here, and our technicians carry specialized diagnostic tools and OEM parts for these brands",
    area: 'York Region'
  },
  'richmond-hill': {
    name: 'Richmond Hill',
    neighborhoods: 'Oak Ridges, Elgin Mills, Mill Pond, and Bayview Hill',
    housing: 'large estate homes in Oak Ridges alongside older properties near the historic village core',
    fact: "Richmond Hill's Oak Ridges Moraine location means many homes rely on well water rather than municipal supply — the higher mineral content causes faster sediment buildup in appliance water lines, requiring more frequent filter changes and valve maintenance",
    area: 'York Region'
  },
  'vaughan': {
    name: 'Vaughan',
    neighborhoods: 'Woodbridge, Maple, Kleinburg, and Thornhill Woods',
    housing: 'large custom-built homes with premium kitchen and laundry packages',
    fact: "Vaughan's rapid residential expansion means many homes are still within the 3-5 year builder warranty window — we work alongside builder warranty claims and handle the out-of-warranty repairs that builders no longer cover",
    area: 'York Region'
  },
  'oakville': {
    name: 'Oakville',
    neighborhoods: 'Bronte, Old Oakville, Glen Abbey, and River Oaks',
    housing: 'upscale detached homes with premium kitchen packages and high-end built-in appliances',
    fact: "Oakville's older lakeside homes in Bronte and Old Oakville have unique plumbing configurations from decades of renovations — we frequently encounter non-standard drain routing and supply line setups that require custom installation approaches",
    area: 'Halton Region'
  },
  'burlington': {
    name: 'Burlington',
    neighborhoods: 'Alton Village, Tyandaga, Burlington Downtown, and Appleby',
    housing: 'mature suburban homes from the 1970s-1990s mixed with newer Alton Village developments',
    fact: "Burlington's escarpment location creates notable temperature differentials between upper and lower town — homes on the escarpment face see more condensation-related appliance issues, particularly with refrigerator coils and dryer venting",
    area: 'Halton Region'
  },
  'whitby': {
    name: 'Whitby',
    neighborhoods: 'Brooklin, Port Whitby, Williamsburg, and Taunton',
    housing: 'rapidly growing subdivision communities with builder-grade appliance packages',
    fact: "Whitby's Brooklin expansion means thousands of new homes with identical builder-installed appliances — we see pattern failures across entire subdivisions, particularly with dishwasher drain pumps and dryer thermal fuses from the same manufacturing batch",
    area: 'Durham Region'
  },
  'oshawa': {
    name: 'Oshawa',
    neighborhoods: 'Taunton, Windfields, Northglen, and the Simcoe Street corridor',
    housing: 'a mix of older industrial-era homes near downtown and newer subdivision developments in the north end',
    fact: "Oshawa's older homes near the downtown core often have outdated 100-amp electrical panels and galvanized steel plumbing — both factors that affect appliance installation and performance, requiring careful assessment before connecting new high-draw units",
    area: 'Durham Region'
  },
  'thornhill': {
    name: 'Thornhill',
    neighborhoods: 'Thornhill Woods, Thornhill Village, and the Bathurst corridor',
    housing: 'premium homes with custom kitchens and high-end European appliance brands',
    fact: "Thornhill has a high concentration of kosher kitchens with dual dishwashers, separate ovens, and extra refrigeration — installations in these kitchens require careful circuit planning and often dedicated plumbing runs for the additional appliances",
    area: 'York Region'
  },
  'newmarket': {
    name: 'Newmarket',
    neighborhoods: 'Upper Canada Mall area, Stonehaven, and the Davis Drive corridor',
    housing: 'established suburban homes from the 1980s-2000s with standard North American appliance configurations',
    fact: "Newmarket's location at the northern edge of the GTA means longer service wait times from downtown-based companies — our York Region dispatch ensures same-day arrival without the premium surcharges other companies add for the distance",
    area: 'York Region'
  },
  'aurora': {
    name: 'Aurora',
    neighborhoods: 'Bayview Wellington, Town Park, and the St. Andrews corridor',
    housing: 'upscale family homes with premium kitchen finishes and built-in appliance suites',
    fact: "Aurora's colder winter microclimate compared to southern GTA communities puts extra strain on garage-located appliances — chest freezers, second refrigerators, and laundry units in unheated garages face temperature extremes that accelerate component wear",
    area: 'York Region'
  },
  'hamilton': {
    name: 'Hamilton',
    neighborhoods: 'Westdale, Dundas, Stoney Creek, and the Mountain',
    housing: 'century homes in the lower city, post-war bungalows on the Mountain, and newer builds in Stoney Creek',
    fact: "Hamilton's century homes in Westdale and Dundas often have non-standard kitchen dimensions from decades of renovations — we measure every installation site to confirm clearances, as standard-width appliances frequently require cabinet modifications in these older homes",
    area: 'the Hamilton-Wentworth region'
  },
  'guelph': {
    name: 'Guelph',
    neighborhoods: 'the Ward, South End, Exhibition Park, and the University District',
    housing: 'a mix of heritage stone homes near downtown and modern suburban developments on the south side',
    fact: "Guelph's well-water-dependent outer areas produce exceptionally hard water that is particularly aggressive on appliance heating elements and valves — residents in these areas benefit from our annual descaling service that extends appliance lifespan significantly",
    area: 'Wellington County'
  },
  'toronto': {
    name: 'Toronto',
    neighborhoods: 'Downtown, Midtown, the Beaches, and the Annex',
    housing: 'diverse housing from Victorian row houses to modern condo towers',
    fact: "Toronto's older building stock means a wide range of plumbing and electrical configurations — our technicians carry adapter kits and multi-gauge wiring to handle everything from knob-and-tube-era circuits to modern panel installations",
    area: 'the City of Toronto'
  },
  'east-york': {
    name: 'East York',
    neighborhoods: 'the Danforth, Pape Village, Woodbine Heights, and Thorncliffe Park',
    housing: 'post-war bungalows and wartime homes from the 1940s-1950s with compact kitchens',
    fact: "East York's smaller wartime bungalow kitchens frequently require 18-inch compact dishwashers and slimline ranges — we specialize in fitting modern appliances into these tighter spaces without compromising plumbing or electrical codes",
    area: 'eastern Toronto'
  },
  'york': {
    name: 'York',
    neighborhoods: 'Weston, Mount Dennis, Silverthorn, and the Eglinton West corridor',
    housing: 'pre-war and post-war homes with older plumbing infrastructure and compact kitchen layouts',
    fact: "York's older housing stock along Eglinton West and Weston Road frequently has galvanized steel supply lines that are partially corroded — we assess pipe condition during every installation and recommend replacement when reduced flow would compromise appliance performance",
    area: 'western Toronto'
  },
  'west-hill': {
    name: 'West Hill',
    neighborhoods: 'the Kingston Road corridor, Centennial community, and West Hill Park area',
    housing: 'established 1960s-1970s suburban homes with full-size appliance layouts',
    fact: "West Hill's proximity to the Rouge River watershed means seasonal groundwater pressure changes that can affect water supply line pressure to appliances — we test inlet pressure during every service call and install pressure regulators when readings exceed manufacturer specifications",
    area: 'southeastern Scarborough'
  },
  'agincourt': {
    name: 'Agincourt',
    neighborhoods: 'the Sheppard corridor, Tam O\'Shanter, and the Midland-Finch commercial district',
    housing: 'split-level and raised ranch homes from the 1960s-1970s with standard-width appliance bays',
    fact: "Agincourt's multicultural households frequently use appliances more intensively than average — larger family sizes mean washers and dryers run 8-10 loads per week, accelerating bearing wear and belt degradation significantly compared to the GTA average",
    area: 'northern Scarborough'
  },
  'malvern': {
    name: 'Malvern',
    neighborhoods: 'Malvern Town Centre, Morningside Heights, and the Neilson corridor',
    housing: 'townhomes and apartment buildings from the 1970s-1980s with standard builder-grade appliances',
    fact: "Malvern's townhome complexes share load-bearing walls that transmit appliance vibration between units — we pay special attention to leveling and anti-vibration pad installation to prevent noise complaints from neighbours during washer spin cycles",
    area: 'northeastern Scarborough'
  },
  'highland-creek': {
    name: 'Highland Creek',
    neighborhoods: 'the Highland Creek village, Centennial College area, and Military Trail',
    housing: 'a mix of established 1960s suburban homes and newer University of Toronto Scarborough-area developments',
    fact: "Highland Creek's ravine-adjacent homes experience higher humidity levels that promote mould growth in washer door boots and refrigerator drip pans — we recommend quarterly gasket cleaning and provide silicone-based protectant application during service calls",
    area: 'southeastern Scarborough'
  },
  'bayview-village': {
    name: 'Bayview Village',
    neighborhoods: 'the Bayview Avenue corridor, Sheppard-Bayview, and the Bayview Village shopping area',
    housing: 'affluent single-family homes with high-end kitchen renovations and premium appliance brands',
    fact: "Bayview Village homeowners invest heavily in kitchen renovations with integrated appliance suites — panel-ready dishwashers, built-in coffee machines, and column refrigerators from Miele, Sub-Zero, and Gaggenau require factory-trained installation techniques",
    area: 'North York'
  },
  'birchcliff': {
    name: 'Birchcliff',
    neighborhoods: 'the Birchcliff Heights bluffs, Kingston Road shops, and the Birchcliff GO Station area',
    housing: 'charming 1920s-1940s cottages and bungalows, many renovated with modern kitchens',
    fact: "Birchcliff's Bluffs-area homes face lake-effect moisture that corrodes exposed appliance wiring and exterior vent caps faster than inland properties — we use marine-grade connectors and stainless vent caps for installations in these waterfront-adjacent homes",
    area: 'southwestern Scarborough'
  },
  'cabbagetown': {
    name: 'Cabbagetown',
    neighborhoods: 'the Parliament Street corridor, Riverdale Farm area, and Wellesley-Sumach',
    housing: 'restored Victorian row houses from the 1880s-1890s with heritage-sensitive kitchen renovations',
    fact: "Cabbagetown's heritage Victorian homes have narrow galley kitchens where every inch matters — we specialize in compact and slimline appliance installation, ensuring proper clearances while respecting the architectural character of these designated heritage properties",
    area: 'downtown Toronto'
  },
  'danforth-village': {
    name: 'Danforth Village',
    neighborhoods: 'the Danforth strip east of Woodbine, Greenwood-Coxwell, and Monarch Park',
    housing: 'semi-detached homes from the 1910s-1930s with renovated but space-constrained kitchens',
    fact: "Danforth Village's semi-detached homes share party walls that amplify appliance vibration and noise — we install anti-vibration pads and ensure proper leveling to minimize disturbance, a critical consideration in these close-quarter living situations",
    area: 'East Toronto'
  },
  'davisville-village': {
    name: 'Davisville Village',
    neighborhoods: 'the Yonge-Davisville intersection, Mount Pleasant corridor, and Oriole Park',
    housing: 'a mix of 1930s-era family homes and newer mid-rise condominiums',
    fact: "Davisville Village's rental and condo market means a high volume of tenant-requested installations where landlord coordination is required — we provide documentation and before/after photos that simplify the approval process for property managers",
    area: 'Midtown Toronto'
  },
  'don-mills': {
    name: 'Don Mills',
    neighborhoods: 'the Don Mills Centre, Flemingdon Park, and the DVP corridor',
    housing: 'Canada\'s first master-planned community with distinctive 1950s-1960s modernist homes',
    fact: "Don Mills' original master-planned homes feature non-standard kitchen configurations from the 1950s modernist era — appliance bays may be narrower or wider than today's standards, requiring careful measurement and sometimes custom mounting solutions",
    area: 'North York'
  },
  'forest-hill': {
    name: 'Forest Hill',
    neighborhoods: 'Upper Forest Hill, Forest Hill Village, and the Spadina Road corridor',
    housing: 'large luxury homes with designer kitchens featuring premium integrated appliance suites',
    fact: "Forest Hill kitchens frequently feature professional-grade appliances — Viking ranges, Sub-Zero refrigerators, and Miele dishwashers — that require factory-authorized installation procedures and specialized diagnostic equipment not carried by general appliance installers",
    area: 'central Toronto'
  },
  'humber-valley': {
    name: 'Humber Valley',
    neighborhoods: 'Humber Valley Village, Old Mill, and the Kingsway South area',
    housing: 'large family homes from the 1940s-1960s, many with updated premium kitchens',
    fact: "Humber Valley's proximity to the Humber River means seasonal flooding risks in basement areas — we install appliances with flood-prevention considerations, including elevated mounting for laundry units and backflow prevention on dishwasher drain connections",
    area: 'western Toronto'
  },
  'islington-village': {
    name: 'Islington Village',
    neighborhoods: 'the Islington Avenue shops, Dundas-Bloor corridor, and Norseman Heights',
    housing: 'post-war bungalows and bi-levels from the 1950s, many with modernized kitchens',
    fact: "Islington Village's older homes frequently have only 15-amp kitchen circuits from the 1950s original wiring — modern dishwashers and ranges often require circuit upgrades, which we coordinate with licensed electricians as part of the installation process",
    area: 'Etobicoke'
  },
  'lawrence-park': {
    name: 'Lawrence Park',
    neighborhoods: 'Lawrence Park North, Lawrence Park South, and the Avenue Road corridor',
    housing: 'prestigious 1920s-1940s homes with heritage character and high-end kitchen renovations',
    fact: "Lawrence Park's luxury home market means many kitchens are designed around specific appliance brands and models — when replacements are needed, exact-fit installation is critical to maintain the seamless integrated look these homeowners expect",
    area: 'North Toronto'
  },
  'leaside': {
    name: 'Leaside',
    neighborhoods: 'the Bayview-Eglinton shops, Leaside Park, and the Laird Drive commercial area',
    housing: 'solid brick homes from the 1930s-1950s with renovated family kitchens',
    fact: "Leaside's family-oriented neighbourhood means high-capacity appliances are standard — oversized washers for sports uniforms, extra-large refrigerators for family meal prep, and heavy-duty dishwashers running twice daily all require robust installation to handle the workload",
    area: 'East York'
  },
  'leslieville': {
    name: 'Leslieville',
    neighborhoods: 'Queen East, Greenwood-Coxwell, and the Logan Avenue corridor',
    housing: 'renovated Victorian and Edwardian row houses with modern open-concept kitchens',
    fact: "Leslieville's row house renovations frequently involve removing walls to create open-concept kitchens — this changes structural support around appliance bays, and we verify that counter and cabinet supports are properly reinforced before securing heavy built-in units",
    area: 'East Toronto'
  },
  'liberty-village': {
    name: 'Liberty Village',
    neighborhoods: 'the King-Dufferin intersection, Liberty Street lofts, and the East Liberty corridor',
    housing: 'converted industrial lofts and modern condo towers with compact urban kitchens',
    fact: "Liberty Village's converted loft spaces frequently have exposed ductwork and non-standard ceiling heights that complicate range hood installation and affect appliance ventilation — we design custom venting solutions for these unique industrial-residential hybrid spaces",
    area: 'West Toronto'
  },
  'midtown': {
    name: 'Midtown',
    neighborhoods: 'Yonge-Eglinton, Mount Pleasant, Deer Park, and the Davisville corridor',
    fact: "Midtown's construction boom along the Eglinton Crosstown LRT corridor has created vibration and dust issues in nearby homes — we clean condenser coils and inspect sealed systems as part of our service, as construction dust can reduce appliance efficiency by 15-20%",
    housing: 'a blend of established family homes and modern condo towers in the Yonge-Eglinton growth centre',
    area: 'central Toronto'
  },
  'rosedale': {
    name: 'Rosedale',
    neighborhoods: 'North Rosedale, South Rosedale, and the Crescent Road area',
    housing: 'historic mansions and large homes with estate-grade kitchen installations',
    fact: "Rosedale's heritage properties often have unique utility access challenges — narrow service entrances, heritage-protected wall finishes, and custom cabinetry that cannot be modified — requiring white-glove installation techniques that protect the home while completing the work",
    area: 'central Toronto'
  },
  'parkdale': {
    name: 'Parkdale',
    neighborhoods: 'South Parkdale, North Parkdale, and the Queen-Dufferin corridor',
    housing: 'large Victorian homes converted to multi-unit dwellings alongside single-family residences',
    fact: "Parkdale's multi-unit Victorian conversions often have shared plumbing stacks and limited circuit capacity per unit — we assess the building's infrastructure before recommending appliance installations to ensure the existing systems can support the added load",
    area: 'West Toronto'
  },
  'beaches': {
    name: 'The Beaches',
    neighborhoods: 'Kew Beach, Balmy Beach, and the Queen Street East boardwalk area',
    housing: 'character homes from the 1910s-1930s with cottage-style kitchens near the waterfront',
    fact: "The Beaches' waterfront location exposes homes to lake-effect humidity and salt air that accelerates corrosion on appliance electrical contacts and exterior vent components — we use corrosion-resistant hardware for all installations within three blocks of the boardwalk",
    area: 'East Toronto'
  },
  'the-beaches': {
    name: 'The Beaches',
    neighborhoods: 'Kew Beach, Balmy Beach, and the Queen Street East boardwalk area',
    housing: 'character homes from the 1910s-1930s with cottage-style kitchens near the waterfront',
    fact: "The Beaches' waterfront location exposes homes to lake-effect humidity and salt air that accelerates corrosion on appliance electrical contacts and exterior vent components — we use corrosion-resistant hardware for all installations within three blocks of the boardwalk",
    area: 'East Toronto'
  },
  'annex': {
    name: 'The Annex',
    neighborhoods: 'Bloor-Bathurst, Madison Avenue, and the Brunswick corridor',
    housing: 'large Victorian and Edwardian homes, many subdivided into apartments and multi-unit dwellings',
    fact: "The Annex's turn-of-century homes feature solid plaster walls and hardwood floors that require careful vibration management during appliance operation — we use premium anti-vibration mounting systems and test sound levels to prevent noise transmission through these resonant building materials",
    area: 'downtown Toronto'
  },
  'the-annex': {
    name: 'The Annex',
    neighborhoods: 'Bloor-Bathurst, Madison Avenue, and the Brunswick corridor',
    housing: 'large Victorian and Edwardian homes, many subdivided into apartments and multi-unit dwellings',
    fact: "The Annex's turn-of-century homes feature solid plaster walls and hardwood floors that require careful vibration management during appliance operation — we use premium anti-vibration mounting systems and test sound levels to prevent noise transmission through these resonant building materials",
    area: 'downtown Toronto'
  },
  'yorkville': {
    name: 'Yorkville',
    neighborhoods: 'the Bloor-Yorkville luxury retail district, Hazelton Lanes, and Cumberland Street',
    housing: 'ultra-luxury condominiums and restored Victorian townhomes with designer kitchens',
    fact: "Yorkville's luxury market demands white-glove installation service — our technicians wear shoe covers, use drop cloths, and take before/after documentation photos for property managers overseeing multi-million-dollar units where even minor surface damage is unacceptable",
    area: 'downtown Toronto'
  },
  'greektown': {
    name: 'Greektown',
    neighborhoods: 'the Danforth strip from Chester to Jones, Playter Estates, and Riverdale North',
    housing: 'brick semi-detached homes from the 1910s-1920s with updated kitchens preserving original character',
    fact: "Greektown's restaurant-dense Danforth strip means many residential side streets have homes that share gas lines with nearby commercial properties — we verify gas pressure and line capacity during any gas appliance installation to ensure safe, code-compliant operation",
    area: 'East Toronto'
  },
  'chinatown': {
    name: 'Chinatown',
    neighborhoods: 'Spadina Avenue, Dundas West, and the Kensington Market border',
    housing: 'mixed commercial-residential buildings with above-shop apartments and narrow Victorian row houses',
    fact: "Chinatown's mixed commercial-residential buildings often have shared electrical panels and non-standard kitchen configurations adapted from commercial spaces — our technicians assess circuit loads carefully before installing high-draw appliances in these unique hybrid properties",
    area: 'downtown Toronto'
  },
  'riverdale': {
    name: 'Riverdale',
    neighborhoods: 'Broadview Avenue, Withrow Park, and the Gerrard East corridor',
    housing: 'Victorian and Edwardian semi-detached homes with deep lots and renovated family kitchens',
    fact: "Riverdale's steep topography along the Don Valley creates drainage challenges that affect dishwasher and washing machine drain performance — we ensure proper drain hose elevation and check for backpressure issues that are common in homes built on these slopes",
    area: 'East Toronto'
  },
  'bloor-west': {
    name: 'Bloor West Village',
    neighborhoods: 'the Jane-Bloor corridor, Baby Point, and Swansea',
    housing: 'well-maintained brick homes from the 1920s-1940s with a mix of original and renovated kitchens',
    fact: "Bloor West Village's character homes often have cast-iron drain stacks that can be fragile after 80+ years — we use gentle connection techniques and flexible couplings when tying dishwasher drains into these older systems to prevent cracks and leaks",
    area: 'West Toronto'
  },
  'bloor-west-village': {
    name: 'Bloor West Village',
    neighborhoods: 'the Jane-Bloor corridor, Baby Point, and Swansea',
    housing: 'well-maintained brick homes from the 1920s-1940s with a mix of original and renovated kitchens',
    fact: "Bloor West Village's character homes often have cast-iron drain stacks that can be fragile after 80+ years — we use gentle connection techniques and flexible couplings when tying dishwasher drains into these older systems to prevent cracks and leaks",
    area: 'West Toronto'
  },
  'high-park': {
    name: 'High Park',
    neighborhoods: 'the Bloor-Keele intersection, Roncesvalles border, and Howard Park',
    housing: 'Edwardian-era semi-detached homes with character features and updated kitchen interiors',
    fact: "High Park-area homes built before 1930 frequently have uneven floors due to foundation settling over nearly a century — precision leveling is critical during appliance installation to prevent vibration, door-seal failures, and premature bearing wear from operating on a slope",
    area: 'West Toronto'
  },
  'little-italy': {
    name: 'Little Italy',
    neighborhoods: 'College Street West, Clinton Street, and the Grace-Manning corridor',
    housing: 'narrow Victorian row houses with compact galley kitchens and limited counter space',
    fact: "Little Italy's narrow row houses typically have kitchens under 80 square feet where every appliance placement decision matters — we plan installations around workflow efficiency and ensure door swings, drawer clearances, and access to shut-off valves are maintained",
    area: 'downtown Toronto'
  },
  'junction': {
    name: 'The Junction',
    neighborhoods: 'Dundas West at Keele, the Junction Triangle, and Stockyards district',
    housing: 'a mix of renovated workers\' cottages, Victorian semis, and modern loft conversions',
    fact: "The Junction's industrial heritage means some residential conversions have oversized utility connections from former commercial use — we right-size connections during appliance installation so residential units operate with proper water pressure and electrical load",
    area: 'West Toronto'
  },
  'the-junction': {
    name: 'The Junction',
    neighborhoods: 'Dundas West at Keele, the Junction Triangle, and Stockyards district',
    housing: 'a mix of renovated workers\' cottages, Victorian semis, and modern loft conversions',
    fact: "The Junction's industrial heritage means some residential conversions have oversized utility connections from former commercial use — we right-size connections during appliance installation so residential units operate with proper water pressure and electrical load",
    area: 'West Toronto'
  },
  'weston': {
    name: 'Weston',
    neighborhoods: 'Weston Road, the Humber River trail, and the Mount Dennis revitalization area',
    housing: 'affordable post-war homes from the 1940s-1960s with original or lightly updated kitchens',
    fact: "Weston's older housing stock often has original copper supply lines with pinhole corrosion and outdated shut-off valves — we inspect and replace compromised plumbing connections during every installation to prevent future water damage from failing components",
    area: 'northwest Toronto'
  },
  'eglinton': {
    name: 'Eglinton',
    neighborhoods: 'the Eglinton Avenue corridor, Yonge-Eglinton, and the Crosstown LRT route',
    housing: 'mid-rise condominiums and renovated family homes along the major transit corridor',
    fact: "The Eglinton Crosstown LRT construction has created access challenges for service vehicles in many parts of the corridor — we plan our routes around construction zones and carry portable equipment that allows us to complete installations even when vehicle access is restricted",
    area: 'Midtown Toronto'
  },
  'downtown': {
    name: 'Downtown Toronto',
    neighborhoods: 'the Financial District, St. Lawrence Market, Harbourfront, and King West',
    housing: 'high-rise condominiums with compact urban kitchens and strict building management rules',
    fact: "Downtown Toronto condos require service elevator booking, security check-in, and loading dock scheduling — we handle all building coordination in advance so your installation proceeds without delays from administrative requirements common in managed high-rise buildings",
    area: 'the downtown core'
  },
  'scarborough-village': {
    name: 'Scarborough Village',
    neighborhoods: 'the Kingston Road shops, Scarborough Bluffs, and the Eglinton East corridor',
    housing: 'post-war bungalows and 1960s suburban homes near the Bluffs escarpment',
    fact: "Scarborough Village's Bluffs-adjacent homes experience soil moisture fluctuations that can shift foundations seasonally — we check appliance leveling against floor slope and use adjustable mounting that accommodates minor settling without losing performance",
    area: 'southwestern Scarborough'
  },
  'etobicoke-village': {
    name: 'Etobicoke Village',
    neighborhoods: 'the Islington-Dundas intersection, historic village core, and Markland Wood',
    housing: 'a mix of heritage properties near the village centre and 1960s-1970s suburban homes',
    fact: "Etobicoke Village's heritage core has properties with plumbing systems dating back 60+ years — we carry adapters for legacy pipe sizes and connection types that are no longer standard, ensuring new appliances connect reliably to existing infrastructure",
    area: 'central Etobicoke'
  },
  'king-west': {
    name: 'King West',
    neighborhoods: 'the King-Bathurst corridor, Liberty Village border, and the Entertainment District',
    housing: 'converted warehouse lofts and modern condo towers with designer kitchen finishes',
    fact: "King West's loft conversions feature exposed brick, concrete floors, and industrial piping that present unique installation challenges — we use specialized mounting hardware designed for concrete substrates and route connections alongside existing exposed infrastructure",
    area: 'downtown Toronto'
  },
  'corso-italia': {
    name: 'Corso Italia',
    neighborhoods: 'the St. Clair West strip, Dufferin-St. Clair, and Earlscourt',
    housing: 'solid brick homes from the 1920s-1940s with a mix of original and updated kitchens',
    fact: "Corso Italia's Italian-Canadian homeowners often maintain separate basement kitchens for canning and food preparation — we install and service appliances on both levels, including heavy-duty ranges and extra dishwashers that see seasonal high-volume use",
    area: 'West Toronto'
  },
  'dufferin-grove': {
    name: 'Dufferin Grove',
    neighborhoods: 'the Dufferin Mall area, Bloor-Dufferin, and the Gladstone corridor',
    housing: 'Victorian semi-detached homes and Edwardian rowhouses with renovated interiors',
    fact: "Dufferin Grove's dense residential streets mean tight driveway access and limited parking — our technicians arrive in compact service vehicles with hand-carry equipment, ensuring we can complete installations even in properties with no driveway or rear lane access",
    area: 'West Toronto'
  },
  'little-portugal': {
    name: 'Little Portugal',
    neighborhoods: 'the Dundas West strip, Ossington corridor, and Trinity Bellwoods border',
    housing: 'narrow Victorian row houses with compact renovated kitchens and limited utility access',
    fact: "Little Portugal's row houses share party walls and often have interconnected basement utility routing — we take extra care during installations to avoid disturbing shared infrastructure, and we test for cross-connected plumbing that is surprisingly common in these joined properties",
    area: 'West Toronto'
  },
  'swansea': {
    name: 'Swansea',
    neighborhoods: 'the Windermere corridor, Rennie Park, and the Humber waterfront',
    housing: 'Tudor-style and Arts-and-Crafts homes from the 1920s-1940s with character kitchens',
    fact: "Swansea's lakefront proximity and Humber River floodplain location means basements in this area are particularly vulnerable to moisture — we install laundry appliances on raised platforms and recommend front-load washers with floor-level drain connections to minimize flooding risk",
    area: 'West Toronto'
  },
  'woodbridge': {
    name: 'Woodbridge',
    neighborhoods: 'the Woodbridge core, Market Lane, and Islington-Highway 7',
    housing: 'large custom-built homes with spacious kitchens and premium appliance packages',
    fact: "Woodbridge's custom home market means many kitchens are designed around European appliance dimensions rather than North American standards — we stock trim kits and adapter panels for Miele, Bosch, and Gaggenau units that require precise gap-filling between cabinetry",
    area: 'Vaughan'
  },
  'airdrie': {
    name: 'Airdrie',
    neighborhoods: 'Sagewood, Hillcrest, Bayside, and the Kings Heights community',
    housing: 'newer single-family homes built from the 2000s onward with standard builder-grade appliances',
    fact: "Airdrie's dry Alberta climate means static electricity buildup is a frequent cause of electronic control board failures in modern appliances — we install grounding straps and recommend humidifier use during winter months to protect sensitive appliance electronics",
    area: 'the Calgary metropolitan area'
  },
  'calgary': {
    name: 'Calgary',
    neighborhoods: 'the Beltline, Kensington, Signal Hill, and Cranston',
    housing: 'a broad range from downtown condos to sprawling suburban homes in new communities',
    fact: "Calgary's extreme temperature swings — from -30C winters to +30C summers — stress appliance components through thermal cycling that cracks plastic fittings, hardens rubber gaskets, and shortens compressor life faster than in more temperate climates like the GTA",
    area: 'southern Alberta'
  },
  'edmonton': {
    name: 'Edmonton',
    neighborhoods: 'Old Strathcona, Windermere, Summerside, and the Whyte Avenue corridor',
    housing: 'heritage homes near the university, wartime bungalows, and new suburban developments',
    fact: "Edmonton's extended sub-zero winters mean garage-located appliances — second refrigerators, chest freezers, and laundry units — face months of extreme cold that can crack water lines, freeze drain hoses, and damage electronic controls not rated for unheated spaces",
    area: 'northern Alberta'
  },
  'bradford': {
    name: 'Bradford',
    neighborhoods: 'the Holland Marsh area, the Simcoe Road corridor, and Bradford West Gwillimbury',
    housing: 'a mix of established small-town homes and new subdivision developments',
    fact: "Bradford's agricultural surroundings and Holland Marsh proximity mean many properties have well water with higher iron and sediment content than municipal supplies — this requires more frequent filter changes and valve maintenance on all water-connected appliances",
    area: 'south Simcoe County'
  },
  'willowdale': {
    name: 'Willowdale',
    neighborhoods: 'Yonge-Finch, Willowdale East, and the Empress Walk area',
    housing: 'a mix of post-war bungalows being replaced by custom builds and high-rise condominiums',
    fact: "Willowdale's rapid redevelopment means older homes with dated infrastructure sit next to modern builds — we carry parts and tools for both legacy appliance systems with manual controls and modern smart appliances with WiFi-connected diagnostics",
    area: 'North York'
  },
  'beaumont': {
    name: 'Beaumont',
    neighborhoods: 'Coloniale Estates, Dansereau Meadows, and the downtown heritage district',
    housing: 'newer suburban developments with modern builder-grade appliances and established character homes',
    fact: "Beaumont's position south of Edmonton means shared municipal water from the Capital Region that carries moderate mineral content — regular descaling of dishwasher and washing machine components extends appliance lifespan by 2-3 years in this area",
    area: 'the Edmonton metropolitan area'
  },
  'ossington': {
    name: 'Ossington',
    neighborhoods: 'the Ossington strip, Dovercourt Village, and the Dundas-Ossington intersection',
    housing: 'renovated Victorian row houses and newer loft-style condominiums along the trendy Ossington corridor',
    fact: "Ossington's booming condo and renovation market means many kitchens are brand new with premium compact appliances — panel-ready dishwashers and counter-depth refrigerators are standard here, requiring precise installation to maintain the streamlined aesthetic these homeowners invest in",
    area: 'West Toronto'
  },
  'roncesvalles': {
    name: 'Roncesvalles',
    neighborhoods: 'the Roncesvalles Village strip, Parkdale border, and Howard Park',
    housing: 'well-preserved Edwardian semi-detached homes from the 1910s with updated but character-sensitive kitchens',
    fact: "Roncesvalles' family-oriented neighbourhood features homes with deep lots and basement apartments — many households run two full sets of appliances across two kitchen levels, doubling the maintenance requirements and making efficient same-day service especially valuable",
    area: 'West Toronto'
  },
  'st-lawrence': {
    name: 'St. Lawrence',
    neighborhoods: 'the St. Lawrence Market district, Front Street East, and the Distillery area',
    housing: 'historic market-area condominiums and converted commercial buildings with compact urban kitchens',
    fact: "St. Lawrence Market-area condos are among Toronto's oldest residential conversions, with plumbing and electrical systems that reflect multiple renovation eras — we carry multi-adapter connection kits specifically for the non-standard pipe sizes and circuit configurations found in these heritage conversions",
    area: 'downtown Toronto'
  },
  'thorncliffe-park': {
    name: 'Thorncliffe Park',
    neighborhoods: 'the Thorncliffe Park Drive corridor, Overlea Boulevard, and the East York border',
    housing: 'high-rise apartment towers from the 1960s-1970s with compact kitchens and shared building plumbing systems',
    fact: "Thorncliffe Park's high-rise towers have shared vertical plumbing stacks where one unit's appliance drain issue can affect neighbours above and below — our technicians check drain backpressure and ensure proper air gaps to prevent cross-contamination between units during every service call",
    area: 'East York'
  },
  'trinity-bellwoods': {
    name: 'Trinity Bellwoods',
    neighborhoods: 'the Queen West strip, Dundas West, and the Gore Vale corridor',
    housing: 'Victorian row houses from the 1880s-1900s with extensively renovated interiors and modern kitchen packages',
    fact: "Trinity Bellwoods' heritage row houses frequently have floor-to-ceiling kitchen renovations that conceal original plumbing behind new finishes — we use non-invasive diagnostic tools to locate shut-off valves and supply lines without damaging newly installed tilework or cabinetry",
    area: 'West Toronto'
  },
  'wychwood': {
    name: 'Wychwood',
    neighborhoods: 'Wychwood Park, the Wychwood Barns, and the Bathurst-St. Clair intersection',
    housing: 'Arts-and-Crafts era homes from the 1910s-1920s alongside newer infill in the Bathurst corridor',
    fact: "Wychwood's heritage Arts-and-Crafts homes feature custom millwork and built-in cabinetry that demands careful appliance installation — we take precise measurements to ensure new appliances fit within original cabinet openings without requiring modifications to irreplaceable heritage woodwork",
    area: 'Midtown Toronto'
  }
};

// ─── Main logic ───
const siteDir = 'C:/fixlifyservices';
let updated = 0;
let skipped = 0;
let noMatch = 0;
const results = [];

// Get all HTML files
const files = fs.readdirSync(siteDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(siteDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  // Skip non-city pages (general pages without a city suffix)
  const skipExact = new Set(['404.html', 'about.html', 'book.html', 'brands.html', 'contact.html',
    'index.html', 'pricing.html', 'reviews.html', 'services.html', 'privacy.html', 'terms.html',
    'service-template.html', 'for-businesses.html']);
  if (skipExact.has(file)) continue;

  // Already has unique content
  if (html.includes('UNIQUE-CITY-CONTENT')) {
    skipped++;
    continue;
  }

  // Detect city slug from filename
  let citySlug = null;
  const sortedKeys = Object.keys(cityData).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    // Match city at end of filename (before .html)
    const baseName = file.replace('.html', '');
    if (baseName === key || baseName.endsWith('-' + key)) {
      citySlug = key;
      break;
    }
  }

  if (!citySlug) {
    noMatch++;
    continue;
  }

  const city = cityData[citySlug];
  if (!city) {
    noMatch++;
    continue;
  }

  // Detect what service type from filename
  const baseName = file.replace('.html', '');
  let serviceContext = '';
  if (baseName === citySlug) {
    // City hub page — different content approach
    serviceContext = 'appliance repair and installation';
  } else {
    const prefix = baseName.replace('-' + citySlug, '');
    serviceContext = prefix.replace(/-/g, ' ');
  }

  // Build unique paragraph
  const paragraph = buildUniqueParagraph(city, serviceContext, citySlug);

  // Try multiple insertion strategies in order of preference
  let insertionDone = false;

  // Method 1: Insert after first <p>...</p> in content-intro (dishwasher-installation template)
  const introIdx = html.indexOf('class="content-intro');
  if (!insertionDone && introIdx !== -1) {
    const firstPClose = html.indexOf('</p>', introIdx);
    if (firstPClose !== -1) {
      const insertPos = firstPClose + 4;
      html = html.slice(0, insertPos) + '\n\n' + paragraph + '\n' + html.slice(insertPos);
      insertionDone = true;
    }
  }

  // Method 2: Insert after first <p>...</p> in content-body (newer repair template)
  if (!insertionDone) {
    const bodyIdx = html.indexOf('class="content-body');
    if (bodyIdx !== -1) {
      const firstPClose = html.indexOf('</p>', bodyIdx);
      if (firstPClose !== -1) {
        const insertPos = firstPClose + 4;
        html = html.slice(0, insertPos) + '\n\n' + paragraph + '\n' + html.slice(insertPos);
        insertionDone = true;
      }
    }
  }

  // Method 3: Insert after first <p>...</p> in content-section
  if (!insertionDone) {
    const sectionIdx = html.indexOf('class="section content-section');
    if (sectionIdx !== -1) {
      const firstPClose = html.indexOf('</p>', sectionIdx);
      if (firstPClose !== -1) {
        const insertPos = firstPClose + 4;
        html = html.slice(0, insertPos) + '\n\n' + paragraph + '\n' + html.slice(insertPos);
        insertionDone = true;
      }
    }
  }

  // Method 4: Insert after first <p>...</p> in <main>
  if (!insertionDone) {
    const mainIdx = html.indexOf('<main');
    if (mainIdx !== -1) {
      const firstPClose = html.indexOf('</p>', mainIdx);
      if (firstPClose !== -1) {
        const insertPos = firstPClose + 4;
        html = html.slice(0, insertPos) + '\n\n' + paragraph + '\n' + html.slice(insertPos);
        insertionDone = true;
      }
    }
  }

  // Method 5: Fallback — after first </p> following </h1>
  if (!insertionDone) {
    const h1Idx = html.indexOf('</h1>');
    if (h1Idx !== -1) {
      const firstPClose = html.indexOf('</p>', h1Idx);
      if (firstPClose !== -1) {
        const insertPos = firstPClose + 4;
        html = html.slice(0, insertPos) + '\n\n' + paragraph + '\n' + html.slice(insertPos);
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
results.filter(r => r.status === 'updated').slice(0, 10).forEach(r => {
  console.log(`  ${r.file} → ${r.city}`);
});
if (results.filter(r => r.status !== 'updated').length > 0) {
  console.log(`\nFiles without match:`);
  results.filter(r => r.status !== 'updated').slice(0, 10).forEach(r => {
    console.log(`  ${r.file} → ${r.status}`);
  });
}

function buildUniqueParagraph(city, serviceContext, citySlug) {
  // Build 3 distinct sentences that are unique to this city+service combo
  const sentences = [];

  // Sentence 1: Neighborhoods + trust signal (Fixlify brand voice)
  sentences.push(
    `${city.name} residents in ${city.neighborhoods} trust Fixlify's flat $65 diagnostic fee for ${serviceContext} — no surprises, no hidden charges.`
  );

  // Sentence 2: Local fact about the area affecting appliances
  sentences.push(city.fact + '.');

  // Sentence 3: Transparent pricing promise + area context
  sentences.push(
    `Serving ${city.area}, our transparent pricing means you know the exact ${serviceContext} cost before any work begins — and our 90-day warranty covers every job.`
  );

  return `    <p class="city-context"><!-- UNIQUE-CITY-CONTENT -->${sentences.join(' ')}<!-- END-UNIQUE-CITY-CONTENT --></p>`;
}
