#!/usr/bin/env node
/**
 * Generate 50 micro-neighbourhood pages for fixlifyservices.com
 * 10 neighbourhoods × 5 services = 50 HTML files
 */
const fs = require('fs');
const path = require('path');

const PHONE = '(437) 524-1053';
const PHONE_LINK = '+14375241053';
const BRAND = 'Fixlify Appliance Services';
const DOMAIN = 'fixlifyservices.com';
const BOOKING_URL = 'https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce';

const neighbourhoods = {
  'willowdale': {
    name: 'Willowdale',
    city: 'North York',
    description: 'Korean-Canadian community in North York',
    housing: '1980s-2000s condos and townhouses',
    brands: 'LG, Samsung',
    details: {
      overview: `Willowdale sits at the heart of North York, stretching along Yonge Street from Sheppard Avenue to Finch Avenue. This neighbourhood has evolved dramatically over the past two decades, transforming from a quiet suburban pocket into one of the most densely developed corridors in the Greater Toronto Area. The Korean-Canadian community that has called Willowdale home since the late 1990s has shaped both the commercial character of the area and, perhaps less obviously, the appliance landscape inside its homes. Walk into almost any condo unit along Yonge and Sheppard and you will find LG or Samsung appliances — brands that residents trust from personal experience and cultural familiarity.`,
      housing_detail: `The housing stock in Willowdale is overwhelmingly vertical. Between 2000 and 2015, dozens of condominium towers rose along the Yonge-Sheppard corridor, replacing single-family bungalows and strip malls. These towers typically install builder-grade Samsung or LG kitchen packages: a Samsung RF28 French-door refrigerator, an LG front-load washer-dryer stack, and a Samsung DW80R dishwasher. Units built after 2012 tend to feature integrated panel-ready models that sit flush behind cabinetry — aesthetically sleek but mechanically more complex to service because the technician must remove decorative panels to access diagnostic ports. Our Willowdale technicians carry Samsung and LG panel-removal kits as standard equipment.`,
      local_issues: `Willowdale's condo density creates specific appliance challenges. Shared laundry drain risers in highrises mean that a blockage on the 18th floor can cause backup symptoms in units on the 16th and 17th floors — symptoms that look like a washer pump failure but are actually a building infrastructure issue. Our technicians run a quick drain line pressure test before replacing any pump to avoid unnecessary part costs. Another Willowdale-specific issue: many units have compact 24-inch dishwashers rather than standard 30-inch models, and replacement parts for these compact units are less commonly stocked by general repair companies. We maintain dedicated 24-inch Samsung and LG parts inventory for exactly this reason.`,
      why_us: `Fixlify understands the Willowdale condo ecosystem. We know that most buildings along Yonge between Sheppard and Finch require 24-hour advance booking of the service elevator. We know that parking is virtually nonexistent and our technicians arrive via TTC or use building visitor parking arrangements pre-confirmed at booking. We know that many Willowdale residents prefer Korean-language communication — our booking confirmation SMS includes a Korean-language option. For Samsung error codes like SE (water supply) or 5E (drain), our Willowdale parts van carries the exact replacement pumps and valves these models require, because we have serviced hundreds of identical units in this corridor.`
    },
    postal_prefix: 'M2N, M2M',
    landmarks: 'Yonge-Sheppard Centre, Empress Walk, Willowdale Park',
    population_note: 'one of the highest-density residential corridors in North York'
  },
  'bayview-village': {
    name: 'Bayview Village',
    city: 'North York',
    description: 'Upscale North York community',
    housing: '1950s-80s brick homes with some newer builds',
    brands: 'Maytag, Whirlpool, KitchenAid',
    details: {
      overview: `Bayview Village occupies a prestigious stretch of North York between Bayview Avenue and Leslie Street, north of Sheppard Avenue East. This is old-money North York — the kind of neighbourhood where homes have been passed down through families and where a kitchen renovation means upgrading from a 20-year-old Whirlpool to a KitchenAid Pro Series, not gutting the room entirely. The streets are lined with mature maples, the lots are generous by Toronto standards, and the homes are predominantly solid brick construction from the 1950s through 1980s. Bayview Village Shopping Centre anchors the community commercially, but the residential streets behind it are remarkably quiet and tree-lined.`,
      housing_detail: `Bayview Village homes are typically two-storey brick detached houses built between 1955 and 1985. The original builds came equipped with General Electric or Westinghouse appliances — brands that no longer manufacture for the Canadian residential market under those names. Over the decades, homeowners have replaced these with Whirlpool, Maytag, and increasingly KitchenAid. Many Bayview Village kitchens still feature top-mount refrigerators (not French-door styles), standalone ranges rather than built-in cooktops, and full-size dishwashers installed during a 1990s or 2000s kitchen update. The basements, often finished in the 1970s, house top-load washers and front-vented dryers — a configuration that creates lint buildup challenges in the long exhaust duct runs typical of these homes.`,
      local_issues: `Aging appliances are the defining repair challenge in Bayview Village. A Whirlpool washer installed in 2006 is now 20 years old — well past its designed lifespan but still mechanically sound enough that homeowners resist replacement. These machines develop bearing wear, water inlet valve calcification, and timer module failures that newer models simply do not experience. Our Bayview Village technicians specialize in legacy Whirlpool and Maytag diagnostics, carrying replacement bearings, inlet valves, and rebuilt control boards that are increasingly hard to source. We also encounter a high volume of KitchenAid stand-mixer and cooktop calls in this area — Bayview Village residents cook seriously and use their appliances hard.`,
      why_us: `Fixlify treats Bayview Village differently from downtown condo calls. We schedule 90-minute service windows instead of the usual 60 minutes because these homes require more diagnostic time — the appliance may be a 2008 Maytag Centennial that needs a part cross-referenced against three different model number revisions. Our technicians park in the driveway (ample space on most Bayview Village properties), carry legacy Whirlpool parts kits, and understand that homeowners in this area value a thorough explanation of what failed and why. We never rush a Bayview Village call.`
    },
    postal_prefix: 'M2K',
    landmarks: 'Bayview Village Shopping Centre, Earl Bales Park',
    population_note: 'affluent established community with long-term homeowners'
  },
  'don-mills': {
    name: 'Don Mills',
    city: 'North York',
    description: 'Canada\'s first planned suburban community',
    housing: 'Apartments, townhouses, and detached homes',
    brands: 'GE, Whirlpool, Frigidaire',
    details: {
      overview: `Don Mills holds a unique place in Canadian urban history: it was the country's first master-planned suburban community, developed by E.P. Taylor's Don Mills Development Corporation beginning in 1953. The neighbourhood introduced the concept of the residential superblock to Canada — curving streets, cul-de-sacs, and separated pedestrian pathways that influenced suburban design across the country for the next 40 years. Today, Don Mills is in transition. The original low-rise apartments and modest bungalows are being joined by the Shops at Don Mills mixed-use development and new condominium towers near Don Mills station on the Sheppard subway line.`,
      housing_detail: `Don Mills housing breaks into three distinct eras. The original 1950s-60s stock consists of single-storey bungalows and split-levels with attached garages, small kitchens, and basement laundry rooms. These homes were built with GE appliances as standard — many original owners never replaced them until the machines physically stopped working. The 1970s brought rental apartment towers along the Don Valley corridor, where landlords typically install Frigidaire or Whirlpool units as economical and serviceable options. The 2000s introduced townhouse developments along the periphery of the original plan, fitted with mid-range Samsung and LG packages. Each housing type presents distinct repair challenges.`,
      local_issues: `Don Mills has an aging population that has lived in these homes for decades. Many of our service calls involve seniors who rely on their appliances functioning reliably and who feel genuine anxiety when a refrigerator or washer stops working. Our Don Mills technicians are trained to communicate clearly, explain the repair process step by step, and never pressure a homeowner into an unnecessary replacement. From a technical standpoint, the most common Don Mills issues are GE refrigerator compressor failures in units 15+ years old, Whirlpool washer transmission wear in top-loaders from the 2000s era, and Frigidaire oven igniter burnout in rental apartment stoves that cycle heavily.`,
      why_us: `Fixlify prioritizes accessibility and patience on Don Mills calls. We arrive on time — within the confirmed window — because many Don Mills residents plan their day around the appointment and are understandably frustrated by vague "between 9 and 5" windows. Our technicians provide a written estimate before beginning any work, explain every repair option including the honest assessment of whether replacement makes more financial sense for a 20-year-old machine, and leave a printed receipt (not just an emailed one) for residents who prefer paper records. We serve the original Don Mills homes as carefully as the new townhouse developments.`
    },
    postal_prefix: 'M3A, M3B, M3C',
    landmarks: 'Shops at Don Mills, Don Mills station, Flemingdon Park',
    population_note: 'Canada\'s first planned suburb with a mix of long-term and newer residents'
  },
  'forest-hill': {
    name: 'Forest Hill',
    city: 'Toronto',
    description: 'One of Toronto\'s most prestigious neighbourhoods',
    housing: '$2M+ detached homes, many with luxury kitchens',
    brands: 'Miele, Sub-Zero, Bosch, Wolf, Gaggenau',
    details: {
      overview: `Forest Hill is Toronto's old-money enclave — a neighbourhood where privacy hedges are manicured weekly, where homes routinely sell for $3 million to $12 million, and where the kitchen appliance budget alone can exceed what most Toronto families spend on a car. Bounded roughly by Bathurst Street to the west, Avenue Road to the east, Eglinton Avenue to the north, and St. Clair Avenue to the south, Forest Hill was incorporated as a separate village until 1967 and has never lost its distinct identity. The residents here expect service that matches the calibre of their homes: punctual, discreet, and technically flawless.`,
      housing_detail: `Forest Hill homes are predominantly two- and three-storey detached residences built between 1920 and 1960, many of which have undergone extensive renovations that preserved the Georgian or Tudor Revival exterior while installing contemporary European kitchens behind the front door. A typical Forest Hill kitchen renovation installs a Sub-Zero 48-inch built-in refrigerator ($15,000–$22,000), a Wolf dual-fuel range ($8,000–$14,000), a Miele integrated dishwasher ($2,500–$4,000), and a Gaggenau or Bosch wall oven. These are not consumer appliances — they are professional-grade machines that require technicians with brand-specific certification and proprietary diagnostic tools.`,
      local_issues: `Luxury appliance repair in Forest Hill demands a different skill set than standard residential service. Sub-Zero refrigerators use a dual-compressor system that general technicians often misdiagnose — they replace the compressor when the real issue is a condenser fan relay or a sealed system leak that requires nitrogen pressure testing. Miele dishwashers have their own proprietary error code system and diagnostic interface that only Miele-trained technicians can access. Wolf range igniters and Gaggenau induction cooktop elements require brand-certified replacement parts that are not available through standard wholesalers. Our Forest Hill technicians carry Miele and Sub-Zero diagnostic tools and maintain direct accounts with authorized parts distributors.`,
      why_us: `Fixlify provides white-glove appliance service in Forest Hill. Our technicians arrive in clean uniforms, wear shoe covers on hardwood and marble floors, and protect countertops with padded work mats during repairs. We understand that Forest Hill homeowners always prefer repair over replacement — a Sub-Zero refrigerator is designed to last 25+ years and is worth repairing at virtually any cost below replacement price. We provide detailed digital reports with photographs of completed repairs for homeowners and their property managers. Scheduling is flexible, including early morning and Saturday appointments that accommodate demanding professional schedules.`
    },
    postal_prefix: 'M5N, M5P',
    landmarks: 'Upper Canada College, Bishop Strachan School, Belt Line Trail',
    population_note: 'one of Canada\'s wealthiest residential communities'
  },
  'rosedale': {
    name: 'Rosedale',
    city: 'Toronto',
    description: 'Toronto\'s most prestigious residential neighbourhood',
    housing: 'Victorian mansions, Edwardian homes, luxury estates',
    brands: 'Sub-Zero, Wolf, Miele, Viking, Thermador',
    details: {
      overview: `Rosedale is the standard against which all other Toronto neighbourhoods measure prestige. Established in the 1820s as the estate of Sheriff William Botsford Jarvis, this ravine-laced neighbourhood north of Bloor Street and east of Yonge has been home to Toronto's wealthiest families for nearly two centuries. The winding streets, the absence of sidewalks in some sections, the mature tree canopy that blocks satellite signals, and the homes that sit well back from the road on half-acre lots — all of it communicates exclusivity. Rosedale homes rarely appear on the open market; many change hands through private sales or estate transfers.`,
      housing_detail: `Rosedale's housing stock is architecturally extraordinary. Victorian mansions from the 1880s and 1890s sit alongside Edwardian homes from the early 1900s, Arts and Crafts bungalows from the 1920s, and contemporary custom builds that replaced tear-downs in the 2000s. Kitchen appliances in Rosedale span this same range: a beautifully maintained 1920s home may contain a brand-new Thermador column refrigerator and Wolf induction cooktop installed during a $500,000 kitchen renovation, while a 2015 custom build might feature an integrated Sub-Zero and Gaggenau suite that was specified by a kitchen designer and imported from Germany. Appliance service in Rosedale requires a technician who can navigate both a century-old electrical panel and a modern home automation system.`,
      local_issues: `Rosedale presents repair challenges that no other Toronto neighbourhood shares. First, electrical infrastructure: many older Rosedale homes still have 100-amp or even 60-amp electrical service, upgraded piecemeal over the decades. A modern induction cooktop pulling 40 amps on a single circuit can trip breakers in a house that was wired for incandescent lights and a single refrigerator. Our technicians check the electrical panel capacity before diagnosing appliance faults — what looks like a failed control board may actually be a voltage sag caused by undersized wiring. Second, access: Rosedale homes are large, and the kitchen may be 30 metres from the nearest exterior door. Our technicians bring wheeled carts and protective floor runners to transport parts and tools without damaging heritage hardwood floors.`,
      why_us: `Fixlify has earned trust in Rosedale through discretion and competence. We never discuss clients or properties. Our technicians are background-checked, bonded, and insured at levels that satisfy the requirements of high-value home insurance policies. We carry Sub-Zero, Wolf, Miele, and Thermador diagnostic equipment and maintain parts accounts with every luxury appliance distributor serving the Ontario market. For Rosedale homeowners who manage their properties through housekeepers or estate managers, we provide detailed service reports and coordinate scheduling through the designated contact. Every repair includes our 90-day warranty — and for luxury appliances, we extend that to 6 months on parts we supply.`
    },
    postal_prefix: 'M4W, M4Y',
    landmarks: 'Rosedale Ravine, Craigleigh Gardens, Rosedale subway station',
    population_note: 'Toronto\'s most exclusive residential enclave since the 19th century'
  },
  'the-annex': {
    name: 'The Annex',
    city: 'Toronto',
    description: 'Vibrant neighbourhood near University of Toronto',
    housing: 'Victorian semi-detached homes, converted apartments',
    brands: 'GE, Samsung, Whirlpool, Bosch',
    details: {
      overview: `The Annex is one of Toronto's most intellectually vibrant neighbourhoods — a dense, walkable community bounded by Bloor Street to the south, Dupont Street to the north, Bathurst Street to the west, and Avenue Road to the east. The University of Toronto campus spills into the Annex's southern edge, giving the neighbourhood a permanent population of professors, graduate students, writers, and professionals who chose to live here precisely because it is not suburban. The Annex has more independent bookstores and cafes per block than perhaps any other Toronto neighbourhood, and its residents tend to value function over flash — including in their appliance choices.`,
      housing_detail: `The Annex's housing stock is predominantly Victorian semi-detached homes built between 1880 and 1910, characterized by their distinctive front gables, covered porches, and narrow side alleys. Many of these homes have been converted into multi-unit rentals — a three-storey Victorian divided into a main-floor unit, a second-floor unit, and a third-floor attic apartment. Each unit typically has its own kitchen with appliances that reflect the owner's budget and the tenant's needs: GE and Whirlpool for rental units, Samsung and Bosch for owner-occupied homes. The kitchens are invariably small by modern standards, with counter depths of 24 inches or less, which limits appliance sizing.`,
      local_issues: `Century-old plumbing and electrical systems are the defining appliance challenge in the Annex. Victorian homes were plumbed with galvanized steel pipes that have corroded internally over 120+ years, reducing water flow to dishwashers and washing machines. A dishwasher that fills normally in a 2010 condo may take twice as long to fill in an 1895 Annex semi — and the extended fill time triggers "water inlet" error codes that have nothing to do with the appliance itself. Similarly, the original knob-and-tube wiring has usually been replaced in kitchens, but sometimes the upgraded circuit still shares a breaker with other rooms, causing voltage drops when a dryer and an oven operate simultaneously. Our Annex technicians test water pressure and circuit voltage as standard protocol before diagnosing any appliance fault.`,
      why_us: `Fixlify knows the Annex inside and out — literally. Our technicians have serviced hundreds of these Victorian semis and understand the quirks: the narrow basement stairs that require disassembling a washer to get it through the door, the shared drain stacks that cause backup issues between units, the landlords who need separate invoices for each rental unit, and the graduate students who need a washer fixed before thesis deadline. We carry parts for the most common Annex appliances — GE top-load washers, Samsung built-in dishwashers, Whirlpool dryers — and we offer evening appointments for university staff who cannot take time during working hours.`
    },
    postal_prefix: 'M5R, M5S',
    landmarks: 'Bloor Street, University of Toronto, Honest Ed\'s site, Brunswick Avenue',
    population_note: 'intellectual heart of Toronto with a mix of students, professors, and professionals'
  },
  'leslieville': {
    name: 'Leslieville',
    city: 'Toronto',
    description: 'Trendy East Toronto neighbourhood',
    housing: 'Victorian and Edwardian semis, new loft conversions',
    brands: 'LG, Samsung, Bosch',
    details: {
      overview: `Leslieville transformed from a quiet, working-class East Toronto neighbourhood into one of the city's trendiest residential destinations in barely a decade. Centred along Queen Street East between Carlaw Avenue and Leslie Street, this community attracted young families and creative professionals who were priced out of the downtown core but wanted walkable urban living with independent shops and restaurants. By 2015, Leslieville had become synonymous with artisanal coffee, reclaimed-wood furniture stores, and stroller-friendly brunch spots. The homes followed suit: Victorian and Edwardian semis that once housed factory workers now contain open-concept kitchens with smart Samsung refrigerators and LG ThinQ-enabled washing machines.`,
      housing_detail: `Leslieville's housing is a mix of Victorian semi-detached homes (1880s–1900s), Edwardian two-and-a-half storey houses (1900s–1920s), and industrial loft conversions from the 2000s onward. The heritage homes have been extensively renovated — most with rear kitchen extensions that added the space the original floor plans lacked. These renovated kitchens typically feature Samsung or LG appliance suites chosen for their smart-home connectivity and modern aesthetics. The loft conversions in converted factories along Eastern Avenue and Carlaw tend to use European compact appliances — Bosch 24-inch dishwashers, compact washer-dryer combos — due to space constraints.`,
      local_issues: `Smart appliance connectivity issues are surprisingly common in Leslieville. The Samsung Family Hub refrigerators and LG ThinQ washers that residents love require stable Wi-Fi, and the thick brick walls of Victorian and Edwardian homes attenuate wireless signals dramatically. A washer in the basement of an 1895 Leslieville semi may lose its Wi-Fi connection repeatedly, triggering firmware update failures that cause error codes unrelated to any mechanical problem. Our technicians verify network connectivity and update firmware manually via USB before pursuing mechanical diagnosis. Another Leslieville-specific challenge: rear-extension kitchens often have longer-than-standard dishwasher drain runs and dryer vent paths, increasing the risk of clogs and lint buildup that general repair companies overlook.`,
      why_us: `Fixlify is the repair service that Leslieville families trust when their smart appliances outsmart them. We speak both the mechanical and digital languages of modern LG and Samsung appliances. Our technicians can reset a Samsung refrigerator's ice maker module, update an LG washer's firmware, and replace a Bosch dishwasher pump — all in the same service call. We know that Leslieville parents need their washer running before bedtime and their fridge cold before the grocery delivery arrives. Same-day appointments are available for most Leslieville calls, and our technician arrives with Leslieville-common parts pre-loaded on the van.`
    },
    postal_prefix: 'M4M',
    landmarks: 'Queen Street East, Carlaw Avenue, Greenwood Park, Gerrard India Bazaar',
    population_note: 'young families and creative professionals in Toronto\'s east end'
  },
  'liberty-village': {
    name: 'Liberty Village',
    city: 'Toronto',
    description: 'Modern condo district for young professionals',
    housing: 'Condominiums and loft conversions',
    brands: 'Bosch, Samsung, LG, Blomberg',
    details: {
      overview: `Liberty Village is Toronto's densest condo community west of the downtown core — a compact neighbourhood bounded by King Street West, Dufferin Street, the Gardiner Expressway, and the rail corridor. Built almost entirely between 2005 and 2020 on former industrial land, Liberty Village is home to approximately 15,000 residents, most of them young professionals in their 20s and 30s who work in the tech, advertising, and creative industries clustered in the same area. The neighbourhood runs on efficiency: grab a coffee at the corner, walk to the office, order groceries online, and call a repair service that shows up on time — all without owning a car.`,
      housing_detail: `Liberty Village housing is overwhelmingly condominium. The units range from 400-square-foot studios to 900-square-foot two-bedrooms, and virtually all of them use compact European appliances to maximize living space. A typical Liberty Village kitchen contains a Bosch 24-inch integrated dishwasher, a Samsung or LG counter-depth refrigerator (30 inches deep rather than the standard 36), and a stacked Bosch or Blomberg washer-dryer combo in a hallway closet. The compact form factor means parts are specific to European-spec models and are not interchangeable with standard North American units. Cabinet-integrated appliances require careful panel removal before any diagnostic work.`,
      local_issues: `Liberty Village condos present three recurring appliance challenges. First, stacked washer-dryer combos: these space-saving units vibrate intensely during spin cycles in concrete-and-steel condo buildings, causing accelerated bearing wear that shortens their lifespan compared to standalone units. Second, condensation dryers (common in Liberty Village units without external venting) require regular condenser cleaning that most residents neglect, leading to overheating shutdowns and thermal fuse failures. Third, compact dishwashers with hard-water scale buildup — Toronto's municipal water hits these small machines harder because the spray arms are shorter and more susceptible to nozzle blockage. Our Liberty Village parts inventory is specifically stocked for Bosch, Blomberg, and Samsung compact models.`,
      why_us: `Fixlify was built for neighbourhoods like Liberty Village — tech-forward, booking-first, and zero tolerance for wasted time. Our online booking shows real-time availability, you see the price estimate before confirming, and the technician sends a text 30 minutes before arrival. No phone calls, no vague windows. We know that Liberty Village buildings require visitor parking registration and service elevator booking — our system prompts you to enter building access details at checkout so we handle logistics before arrival day. Our compact-appliance parts inventory means we resolve most Liberty Village calls in a single visit, not two.`
    },
    postal_prefix: 'M6K',
    landmarks: 'Liberty Village Park, Lamport Stadium, King and Dufferin',
    population_note: 'one of Toronto\'s densest young-professional communities'
  },
  'riverdale': {
    name: 'Riverdale',
    city: 'Toronto',
    description: 'Family neighbourhood with Victorian and Edwardian homes',
    housing: 'Victorian semis, Edwardian detached homes, some new builds',
    brands: 'Samsung, LG, Whirlpool, GE, Bosch',
    details: {
      overview: `Riverdale is the east-side counterpart to the Annex — a mature, tree-lined residential neighbourhood where families have put down roots and where the housing stock carries over a century of Toronto history. Stretching east from the Don Valley to Pape Avenue and south from Danforth Avenue to Gerrard Street, Riverdale combines the architectural beauty of its Victorian and Edwardian homes with the practicality of a neighbourhood designed for daily life: schools, parks, grocery stores, and the iconic Riverdale Farm all within walking distance. The community is diverse in every sense — age, income, family structure — and so is the appliance mix inside its homes.`,
      housing_detail: `Riverdale's housing stock is predominantly Victorian semi-detached (1880s–1900s) and Edwardian detached homes (1900s–1920s), with pockets of 1960s bungalows near Broadview and some modern infill townhouses. The Victorian semis are Riverdale's signature: narrow, deep lots with bay-and-gable facades, original hardwood floors, and kitchens that have been renovated anywhere from zero to three times depending on the owner. Appliances in Riverdale reflect this range: a fully renovated Riverdale kitchen might contain a Samsung Bespoke refrigerator and a Bosch 800 Series dishwasher, while an unrennovated home two doors down might still run a 2005 GE side-by-side fridge and a Whirlpool top-load washer.`,
      local_issues: `Riverdale shares the century-home plumbing and electrical challenges of the Annex but adds a topographical twist: the neighbourhood slopes toward the Don Valley, and homes on the east side of Broadview Avenue sit on ground that shifts seasonally. This settling can cause misalignment of stacked washer-dryer units, leading to excessive vibration and premature bearing failure. Water pressure varies significantly across Riverdale — homes near the Don River tend to have lower municipal water pressure, which affects dishwasher fill times and triggers inlet valve errors. Our technicians carry portable pressure gauges and check incoming water pressure as part of every Riverdale dishwasher and washer diagnosis.`,
      why_us: `Fixlify understands Riverdale's character: a neighbourhood where homeowners are hands-on, informed, and want a technician who will explain the repair rather than just perform it. Our Riverdale technicians take time to show the homeowner the failed part, explain why it failed, and recommend preventive maintenance to extend the life of the machine. We stock parts for the full range of Riverdale appliances — from legacy GE refrigerators in unrenovated homes to Samsung smart washers in contemporary kitchens — and we offer weekend appointments for families who cannot take weekday time off.`
    },
    postal_prefix: 'M4J, M4K',
    landmarks: 'Riverdale Farm, Riverdale Park, Broadview Avenue, Withrow Park',
    population_note: 'established family neighbourhood with a strong community identity'
  },
  'danforth-village': {
    name: 'Danforth Village',
    city: 'Toronto',
    description: 'Greek-Canadian community on the east end',
    housing: '1940s-60s brick homes, some Edwardian',
    brands: 'Whirlpool, GE, Frigidaire, Samsung',
    details: {
      overview: `Danforth Village — known locally as "the Danforth" or "Greektown" — is one of Toronto's most culturally distinctive neighbourhoods. Stretching along Danforth Avenue from Broadview to Woodbine, this community has been the centre of Greek-Canadian life in Toronto since the 1960s, when waves of immigration from Greece transformed the commercial strip into a corridor of tavernas, bakeries, and grocery shops. While the neighbourhood has diversified significantly in recent decades, the Greek heritage remains visible in the blue-and-white restaurant awnings, the annual Taste of the Danforth festival, and the strong community bonds that define the area.`,
      housing_detail: `Danforth Village's residential streets are lined with solid brick homes built primarily between 1940 and 1965 — the post-war building boom that filled Toronto's east end with modest but well-constructed two-storey detached and semi-detached houses. These homes were built for families, with functional kitchens, finished basements, and backyards large enough for a vegetable garden. The appliances reflect practical, value-oriented choices: Whirlpool washers, GE refrigerators, Frigidaire stoves. Some homes retain appliances from the 2000s that are now approaching the end of their expected lifespan. Renovated homes along the Danforth corridor have upgraded to Samsung and LG, but the side streets remain predominantly North American brand territory.`,
      local_issues: `Danforth Village's post-war homes have a unique appliance challenge: original copper plumbing from the 1950s that has developed pinhole leaks at joints. These leaks are often invisible behind walls but reduce water pressure to dishwashers and washing machines, causing slow-fill complaints that are actually plumbing issues rather than appliance faults. Our technicians test water pressure at the appliance hookup as a standard diagnostic step in Danforth Village. Another common issue: many Danforth homes have original 60-amp electrical service that has been partially upgraded over the decades. Circuits may be shared between the kitchen and other rooms, causing voltage drops when a dryer and an oven run simultaneously. We check voltage at the outlet as part of every Danforth dryer and oven service call.`,
      why_us: `Fixlify respects the Danforth's community values: honest pricing, clear communication, and a technician who treats the home with care. Many of our Danforth Village clients are long-term homeowners who have maintained their properties meticulously for decades — they want a repair company that matches that standard. Our technicians wipe their shoes, lay down drop cloths, and clean up thoroughly after every repair. We provide clear, written estimates before starting any work and offer a 90-day warranty on every repair. For Danforth Village homeowners with aging Whirlpool or GE appliances, we offer an honest repair-vs-replace assessment — no pressure to buy new when a $180 repair will extend the machine's life by five more years.`
    },
    postal_prefix: 'M4C, M4E',
    landmarks: 'Greektown, Danforth Avenue, Woodbine Park, Chester subway station',
    population_note: 'culturally vibrant Greek-Canadian community with deep roots'
  }
};

const services = {
  'fridge-repair': {
    name: 'Refrigerator Repair',
    short: 'Fridge',
    appliance: 'refrigerator',
    appliance_cap: 'Refrigerator',
    price_range: '$150–$450',
    common_problems: [
      { problem: 'Not Cooling', cause: 'Faulty compressor or condenser fan', fix: 'Replace compressor or fan motor', cost: '$180–$400' },
      { problem: 'Leaking Water', cause: 'Blocked defrost drain or cracked water line', fix: 'Clear drain or replace line', cost: '$90–$180' },
      { problem: 'Ice Maker Not Working', cause: 'Failed water inlet valve or frozen fill tube', fix: 'Replace valve or thaw tube', cost: '$120–$250' },
      { problem: 'Running Constantly', cause: 'Dirty condenser coils or faulty thermostat', fix: 'Clean coils or replace thermostat', cost: '$100–$200' },
      { problem: 'Making Loud Noise', cause: 'Worn evaporator fan or compressor mount', fix: 'Replace fan or mount bushings', cost: '$110–$230' }
    ],
    content_generator: (n) => {
      const details = n.details;
      return {
        intro: `Refrigerator repair in ${n.name} demands a technician who understands both the appliances and the homes they sit inside. ${details.overview.substring(0, 200)}`,
        sections: [
          {
            title: `Why ${n.name} Refrigerators Need Specialized Repair`,
            text: `${n.name} homes present refrigerator challenges that generic repair companies routinely misdiagnose. ${details.housing_detail} The refrigerators in these homes range from standard top-mount models to French-door units with ice makers and water dispensers — each with distinct failure modes. ${n.brands} refrigerators are the most common brands our ${n.name} technicians encounter, and we carry parts for every major model line. A compressor failure in a ${n.brands.split(',')[0].trim()} refrigerator requires a different diagnostic approach than a thermostat fault in a ${n.brands.split(',').pop().trim()} unit, and our ${n.name} inventory reflects these brand-specific differences.`
          },
          {
            title: `Common Refrigerator Problems in ${n.name} Homes`,
            text: `${details.local_issues} For refrigerators specifically, the most common ${n.name} service calls involve cooling failures (compressor or fan issues), water leaks (defrost drain blockage or water line cracks), and ice maker malfunctions. Toronto's hard water — 120 to 145 mg/L calcium — affects refrigerator water supply lines and ice maker fill valves, depositing mineral scale that restricts flow and eventually causes component failure. Our technicians inspect water supply connections and test flow rates as part of every ${n.name} refrigerator diagnosis, because a slow-filling ice maker often signals a calcified inlet valve rather than a mechanical ice maker failure.`
          },
          {
            title: `Refrigerator Repair Cost in ${n.name}`,
            text: `Refrigerator repair in ${n.name} typically costs $150 to $450, depending on the brand, age, and specific failure. A straightforward thermostat replacement on a standard Whirlpool or GE runs $100 to $180, while a sealed-system repair on a Sub-Zero or Miele can exceed $500. Fixlify provides an upfront price estimate before any work begins — you see the cost on your booking confirmation and the technician confirms it on-site before touching the machine. No diagnostic fees, no surprise charges. If the repair cost exceeds 50% of the refrigerator's replacement value, we tell you honestly and help you make the right decision.`
          },
          {
            title: `Why ${n.name} Residents Choose Fixlify`,
            text: details.why_us + ` For refrigerator emergencies — food spoilage is a real concern — we prioritize same-day appointments in ${n.name}. A refrigerator that stops cooling on a summer afternoon needs a technician today, not tomorrow. Our ${n.name} dispatch protocol flags urgent cooling calls and routes them to the nearest available technician with the right parts on board. Most ${n.name} refrigerator repairs are completed in a single visit within 60 to 90 minutes.`
          },
          {
            title: `${n.name} Refrigerator Brands We Service`,
            text: `Our ${n.name} technicians are certified to repair ${n.brands}, as well as Kenmore, Maytag, Amana, KitchenAid, and all other major residential brands. We carry brand-specific diagnostic tools and replacement parts for the most common models found in ${n.name} homes. Whether your refrigerator is a 5-year-old Samsung French-door or a 20-year-old GE top-mount, we have the expertise and parts to fix it — usually in a single visit. Every repair includes a 90-day parts and labour warranty, and we use only manufacturer-approved or OEM-equivalent replacement parts.`
          }
        ]
      };
    }
  },
  'washer-repair': {
    name: 'Washer Repair',
    short: 'Washer',
    appliance: 'washing machine',
    appliance_cap: 'Washer',
    price_range: '$120–$350',
    common_problems: [
      { problem: 'Not Spinning', cause: 'Worn drive belt or failed motor coupling', fix: 'Replace belt or coupling', cost: '$100–$220' },
      { problem: 'Leaking Water', cause: 'Damaged door seal or pump gasket', fix: 'Replace seal or gasket', cost: '$90–$200' },
      { problem: 'Not Draining', cause: 'Clogged drain pump or blocked hose', fix: 'Clear blockage or replace pump', cost: '$100–$230' },
      { problem: 'Excessive Vibration', cause: 'Worn shock absorbers or unbalanced drum', fix: 'Replace shocks or rebalance', cost: '$110–$240' },
      { problem: 'Not Starting', cause: 'Faulty door latch or control board', fix: 'Replace latch or board', cost: '$80–$250' }
    ],
    content_generator: (n) => {
      const details = n.details;
      return {
        intro: `Washer repair in ${n.name} requires a technician who understands the specific machines and living spaces in this neighbourhood. ${details.overview.substring(0, 200)}`,
        sections: [
          {
            title: `Washing Machine Challenges Specific to ${n.name}`,
            text: `${n.name}'s housing stock creates washing machine repair situations that differ from other Toronto neighbourhoods. ${details.housing_detail} Washers in ${n.name} homes are typically ${n.brands} models, ranging from top-load machines in older properties to front-load high-efficiency units in renovated kitchens and newer builds. Front-load washers in ${n.name} condos and townhouses develop door seal mould and rubber degradation faster than identical machines in detached homes because the reduced ventilation in compact laundry closets traps moisture against the gasket. Our technicians inspect door seals on every ${n.name} front-load washer call, even when the reported symptom is unrelated.`
          },
          {
            title: `Most Common Washer Problems in ${n.name}`,
            text: `${details.local_issues} For washing machines specifically, ${n.name} service calls cluster around three issues: drain pump failures, excessive vibration during spin cycles, and door latch malfunctions on front-load models. Toronto's hard water accelerates pump impeller wear and deposits calcium inside drain valves, causing slow-drain symptoms that progressively worsen over 6 to 12 months. In ${n.name} homes with older plumbing, we also see washer inlet valve screens clogged with pipe sediment — a 5-minute fix that other companies misdiagnose as a valve replacement costing $150 more than necessary.`
          },
          {
            title: `Washer Repair Cost in ${n.name}`,
            text: `Washing machine repair in ${n.name} typically costs $120 to $350. A simple drain pump clean-out or inlet screen clearing runs $80 to $130. Drive belt and motor coupling replacements fall in the $100 to $220 range. Control board replacements — the most expensive common repair — run $180 to $350 depending on the brand and model. Fixlify shows you the estimated cost at booking and the technician confirms the exact price before beginning work. No surprises, no diagnostic fees. For washers over 10 years old where the repair cost approaches 50% of replacement value, we provide an honest recommendation.`
          },
          {
            title: `Why ${n.name} Homeowners Trust Fixlify`,
            text: details.why_us + ` For washer emergencies — a leaking washer can cause floor damage within hours — we offer same-day priority service in ${n.name}. Our technicians arrive with replacement door seals, drain pumps, and inlet valves for ${n.brands} models, allowing us to complete most ${n.name} washer repairs in a single visit. We also carry Samsung-specific error code diagnostic tools and LG ThinQ interface cables for smart washer troubleshooting.`
          },
          {
            title: `Washer Brands We Repair in ${n.name}`,
            text: `We repair all major washing machine brands found in ${n.name}: ${n.brands}, plus Kenmore, Maytag, Amana, Speed Queen, and Electrolux. Our ${n.name} parts inventory is weighted toward the brands most common in this neighbourhood — ${n.brands.split(',')[0].trim()} and ${n.brands.split(',').pop().trim()} models represent the majority of our ${n.name} washer calls. Every repair includes a 90-day parts and labour warranty. We use manufacturer-approved or OEM-equivalent parts exclusively, never aftermarket components that compromise performance or void manufacturer warranties.`
          }
        ]
      };
    }
  },
  'dryer-repair': {
    name: 'Dryer Repair',
    short: 'Dryer',
    appliance: 'dryer',
    appliance_cap: 'Dryer',
    price_range: '$120–$350',
    common_problems: [
      { problem: 'Not Heating', cause: 'Burned-out heating element or thermal fuse', fix: 'Replace element or fuse', cost: '$100–$230' },
      { problem: 'Not Tumbling', cause: 'Broken drive belt or worn drum rollers', fix: 'Replace belt or rollers', cost: '$90–$200' },
      { problem: 'Taking Too Long', cause: 'Clogged lint vent or failed moisture sensor', fix: 'Clean vent or replace sensor', cost: '$80–$180' },
      { problem: 'Making Loud Noise', cause: 'Worn drum bearings or glides', fix: 'Replace bearings or glides', cost: '$110–$250' },
      { problem: 'Shutting Off Early', cause: 'Faulty thermal fuse or cycling thermostat', fix: 'Replace fuse or thermostat', cost: '$90–$190' }
    ],
    content_generator: (n) => {
      const details = n.details;
      return {
        intro: `Dryer repair in ${n.name} involves unique challenges shaped by the neighbourhood's housing types, venting configurations, and the specific appliance brands residents rely on. ${details.overview.substring(0, 200)}`,
        sections: [
          {
            title: `Dryer Venting Challenges in ${n.name} Homes`,
            text: `${n.name}'s housing stock creates dryer venting situations that directly impact machine performance and repair frequency. ${details.housing_detail} In older ${n.name} homes, dryer vent ducts often run through basement ceilings, up through wall cavities, and exit at the roofline — creating vent runs of 20 to 35 feet that accumulate lint far faster than the 10-foot straight runs in modern construction. Clogged dryer vents are the number-one cause of dryer performance complaints in ${n.name}, and they also represent a fire hazard that homeowners insurance policies take seriously. Our ${n.name} dryer technicians inspect the full vent path on every service call and provide a lint clearance assessment, even when the reported symptom is a heating or tumbling issue.`
          },
          {
            title: `Common Dryer Problems in ${n.name}`,
            text: `${details.local_issues} For dryers specifically, ${n.name} calls break down as follows: 40% are heat-related (failed heating elements, blown thermal fuses, faulty gas igniters), 25% are mechanical (broken belts, worn drum rollers, seized bearings), 20% are venting-related (lint-clogged exhaust causing overheating and auto-shutoff), and 15% are electrical (control board failures, cycling thermostat issues). ${n.brands} dryers are the most common brands in ${n.name}, and each has distinct failure patterns that our technicians are trained to diagnose efficiently.`
          },
          {
            title: `Dryer Repair Cost in ${n.name}`,
            text: `Dryer repair in ${n.name} typically costs $120 to $350. Thermal fuse and cycling thermostat replacements are at the lower end ($90–$190), while heating element replacement runs $100 to $230 and drum bearing replacement costs $110 to $250. Gas dryer igniter replacement — common in older ${n.name} homes with natural gas connections — runs $100 to $200. Fixlify provides transparent pricing: you see the estimate at booking, the technician confirms the exact cost on-site, and you approve before any work begins. No hidden fees, no diagnostic charges absorbed into the repair bill.`
          },
          {
            title: `Why ${n.name} Residents Choose Fixlify for Dryer Repair`,
            text: details.why_us + ` For dryer repair specifically, our ${n.name} technicians carry replacement heating elements, thermal fuses, drive belts, and drum rollers for ${n.brands} models. We also carry vent cleaning equipment — a flexible brush system that clears lint from the full length of the exhaust duct, not just the first two feet accessible from behind the machine. A dryer that takes 90 minutes to dry a load is usually a vent problem, not an appliance problem, and we diagnose that on the first visit.`
          },
          {
            title: `Dryer Safety in ${n.name}: Lint and Venting`,
            text: `Dryer fires cause over 15,000 house fires annually in North America, and clogged lint vents are the leading cause. In ${n.name}'s older homes with long, convoluted vent runs, the risk is elevated. Fixlify recommends professional dryer vent cleaning every 12 to 18 months for ${n.name} homes with vent runs exceeding 15 feet. During every dryer repair visit, our technicians perform a complimentary vent airflow test using a manometer to measure back-pressure at the dryer exhaust port. If the reading exceeds 1.5 inches of water column — the threshold for restricted airflow — we recommend a vent cleaning and can often perform it during the same visit.`
          }
        ]
      };
    }
  },
  'dishwasher-repair': {
    name: 'Dishwasher Repair',
    short: 'Dishwasher',
    appliance: 'dishwasher',
    appliance_cap: 'Dishwasher',
    price_range: '$120–$350',
    common_problems: [
      { problem: 'Not Cleaning Dishes', cause: 'Clogged spray arms or worn wash pump', fix: 'Clean arms or replace pump', cost: '$100–$220' },
      { problem: 'Not Draining', cause: 'Blocked drain filter or failed pump', fix: 'Clear filter or replace pump', cost: '$90–$200' },
      { problem: 'Leaking', cause: 'Damaged door gasket or cracked tub', fix: 'Replace gasket or seal crack', cost: '$80–$180' },
      { problem: 'Not Starting', cause: 'Faulty door latch or control panel', fix: 'Replace latch or panel', cost: '$100–$250' },
      { problem: 'Making Noise', cause: 'Worn wash pump bearing or loose spray arm', fix: 'Replace pump or tighten arm', cost: '$100–$230' }
    ],
    content_generator: (n) => {
      const details = n.details;
      return {
        intro: `Dishwasher repair in ${n.name} requires understanding both the appliances residents choose and the water and plumbing conditions that affect them. ${details.overview.substring(0, 200)}`,
        sections: [
          {
            title: `Dishwasher Challenges Unique to ${n.name}`,
            text: `${n.name}'s homes create dishwasher scenarios that general repair companies often mishandle. ${details.housing_detail} Dishwashers in ${n.name} run on Toronto municipal water that registers 120 to 145 mg/L calcium carbonate — classified as moderately hard. This mineral content coats spray arm nozzles, deposits inside drain valves, and furs up heating elements over an 18- to 24-month cycle. In ${n.name} homes with original plumbing, the incoming water pressure may also be lower than the 20 PSI minimum most dishwashers require for proper fill, triggering error codes that look like appliance failures but are actually infrastructure issues. Our ${n.name} technicians test water pressure and hardness impact as standard diagnostic protocol.`
          },
          {
            title: `Most Common Dishwasher Problems in ${n.name}`,
            text: `${details.local_issues} For dishwashers in ${n.name}, the five most common problems are: dishes not getting clean (clogged spray arms from hard water scale), failure to drain (blocked filter basket or calcified drain pump), door leaks (worn gasket rubber or misaligned door latch), failure to start (control board or latch switch failure), and excessive noise (worn wash pump bearing). ${n.brands} dishwashers represent the majority of our ${n.name} service calls, and each brand has specific failure patterns our technicians are trained to identify and resolve efficiently.`
          },
          {
            title: `Dishwasher Repair Cost in ${n.name}`,
            text: `Dishwasher repair in ${n.name} typically costs $120 to $350. Spray arm descaling and filter cleaning run $80 to $140. Drain pump replacement costs $90 to $200. Door gasket replacement falls in the $80 to $180 range. Control board replacement — the most expensive common repair — runs $150 to $300. Fixlify provides transparent pricing at every step: estimate at booking, confirmation on-site, approval before work begins. We never charge a diagnostic fee — if we cannot fix the problem, you pay nothing. For dishwashers over 8 years old where repair cost exceeds 40% of replacement value, we provide an honest repair-vs-replace recommendation.`
          },
          {
            title: `Why ${n.name} Homeowners Trust Fixlify`,
            text: details.why_us + ` For dishwasher repair, our ${n.name} technicians arrive with descaling kits, replacement spray arms, drain pumps, and door gaskets for ${n.brands} models. We complete most ${n.name} dishwasher repairs in a single visit within 45 to 75 minutes. Our hard-water protocol — standard on every ${n.name} call — includes a complimentary spray arm flush and filter clean even when the primary repair is unrelated, because preventing the next hard-water problem is as important as fixing the current one.`
          },
          {
            title: `Hard Water and Your ${n.name} Dishwasher`,
            text: `Toronto's municipal water supply delivers 120 to 145 mg/L of dissolved calcium to every dishwasher in ${n.name}. Over 18 to 24 months, this mineral content builds up inside spray arm nozzles, reducing wash pressure and leaving cloudy residue on glassware. The heating element accumulates scale that reduces efficiency and eventually causes burnout. Drain valves develop calcium deposits that restrict flow. Monthly maintenance helps: run an empty cycle with 2 cups of white vinegar or a commercial dishwasher cleaner. For ${n.name} homes with especially hard water (above 140 mg/L), we recommend installing a water softener or polyphosphate filter on the dishwasher supply line — a $60 to $120 investment that can double the interval between service calls.`
          }
        ]
      };
    }
  },
  'oven-repair': {
    name: 'Oven Repair',
    short: 'Oven',
    appliance: 'oven',
    appliance_cap: 'Oven',
    price_range: '$130–$400',
    common_problems: [
      { problem: 'Not Heating', cause: 'Failed bake or broil element', fix: 'Replace heating element', cost: '$120–$250' },
      { problem: 'Uneven Cooking', cause: 'Faulty temperature sensor or fan motor', fix: 'Replace sensor or motor', cost: '$100–$220' },
      { problem: 'Not Igniting (Gas)', cause: 'Worn igniter or faulty gas valve', fix: 'Replace igniter or valve', cost: '$110–$230' },
      { problem: 'Self-Clean Lock Stuck', cause: 'Failed door latch motor or control board', fix: 'Replace latch or board', cost: '$130–$280' },
      { problem: 'Temperature Inaccurate', cause: 'Faulty thermostat or temperature probe', fix: 'Calibrate or replace probe', cost: '$90–$200' }
    ],
    content_generator: (n) => {
      const details = n.details;
      return {
        intro: `Oven repair in ${n.name} covers everything from standard electric ranges to professional-grade gas cooktops, and each requires specific expertise. ${details.overview.substring(0, 200)}`,
        sections: [
          {
            title: `Oven and Range Types Found in ${n.name}`,
            text: `${n.name}'s housing diversity means our technicians encounter a wide range of oven and cooktop configurations. ${details.housing_detail} Ovens in ${n.name} include freestanding electric ranges (the most common in condos and rental units), freestanding gas ranges (prevalent in older homes with gas service), wall ovens (common in renovated kitchens), and professional-style dual-fuel ranges in luxury homes. ${n.brands} are the dominant oven brands in ${n.name}, and each uses different heating element designs, ignition systems, and control interfaces. Our technicians carry brand-specific replacement igniters, heating elements, and temperature sensors for the models most commonly installed in ${n.name} homes.`
          },
          {
            title: `Common Oven Problems in ${n.name} Homes`,
            text: `${details.local_issues} For ovens and ranges specifically, ${n.name} service calls involve: heating element burnout (the bake or broil element fails, usually visible as a crack or blister in the element coil), gas igniter degradation (the igniter glows but does not get hot enough to open the gas valve — the most common gas oven complaint), temperature sensor drift (the oven runs 25 to 50 degrees hotter or cooler than the set temperature), and self-clean door lock failure (the latch motor or solenoid jams after a cleaning cycle, locking the door shut). Each of these problems is straightforward for a trained technician with the right parts but frustrating for a homeowner attempting self-diagnosis.`
          },
          {
            title: `Oven Repair Cost in ${n.name}`,
            text: `Oven repair in ${n.name} typically costs $130 to $400. Electric heating element replacement runs $120 to $250. Gas igniter replacement costs $110 to $230. Temperature sensor or thermostat replacement falls in the $90 to $200 range. Control board replacement — the most expensive common repair — runs $180 to $350. For professional-grade ranges (Wolf, Viking, Thermador), repair costs are higher due to specialized parts, typically $250 to $600. Fixlify provides upfront pricing: you see the estimate at booking, confirm on-site, and approve before work begins. No diagnostic fees, no hidden charges.`
          },
          {
            title: `Gas vs. Electric Oven Repair in ${n.name}`,
            text: `${n.name} homes with natural gas service — common in detached houses and older apartment buildings — typically have gas ranges or dual-fuel ranges (gas cooktop, electric oven). Gas appliance repair requires TSSA (Technical Standards and Safety Authority) certification in Ontario, and all Fixlify gas technicians hold current TSSA credentials. The most common gas oven issue is igniter degradation: the igniter glows orange but does not reach the 2,000°F threshold required to open the safety valve, so the oven fails to heat despite the visible glow. This is a safe failure mode — gas does not flow — but it confuses homeowners who see the igniter working and assume the problem is elsewhere. Electric oven repair is generally simpler: element replacement, sensor calibration, or control board swap. Both gas and electric oven repairs in ${n.name} are completed in a single visit in most cases.`
          },
          {
            title: `Why ${n.name} Residents Choose Fixlify for Oven Repair`,
            text: details.why_us + ` For oven repair specifically, our ${n.name} technicians are TSSA-certified for gas work and carry replacement igniters, heating elements, temperature sensors, and door latch assemblies for ${n.brands} models. We also carry an oven temperature calibration kit that allows us to verify actual oven temperature against the set temperature and adjust the thermostat calibration offset on-site — a service that most repair companies cannot provide without a return visit. Every oven repair includes a 90-day parts and labour warranty.`
          }
        ]
      };
    }
  }
};

function generateFAQs(neighbourhood, service) {
  const n = neighbourhood;
  const s = service;
  const faqs = [
    {
      q: `How much does ${s.appliance} repair cost in ${n.name}?`,
      a: `${s.appliance_cap} repair in ${n.name} typically costs ${s.price_range}. The exact cost depends on the brand, model, and specific problem. ${BRAND} provides upfront pricing — you see the estimate when you book online at ${DOMAIN} and the technician confirms the exact cost before beginning work. No diagnostic fees, no surprise charges. Call ${PHONE} for a free phone estimate.`
    },
    {
      q: `Do you offer same-day ${s.appliance} repair in ${n.name}?`,
      a: `Yes — ${BRAND} offers same-day ${s.appliance} repair in ${n.name}. Book online at ${DOMAIN} and select a same-day slot from our live calendar. Most ${n.name} appointments are confirmed within minutes, and technicians arrive within 2 to 4 hours of booking. For urgent requests, call ${PHONE} directly.`
    },
    {
      q: `What ${s.appliance} brands do you repair in ${n.name}?`,
      a: `We repair all major ${s.appliance} brands in ${n.name}: ${n.brands}, plus Samsung, LG, Whirlpool, GE, Frigidaire, Maytag, KitchenAid, Bosch, Miele, and more. Our ${n.name} technicians carry brand-specific parts and diagnostic tools for the models most commonly found in this neighbourhood.`
    },
    {
      q: `How long does ${s.appliance} repair take in ${n.name}?`,
      a: `Most ${s.appliance} repairs in ${n.name} are completed in 45 to 90 minutes on the first visit. Our technicians arrive with parts for the most common ${n.brands} problems, so a return visit is rarely needed. For complex repairs requiring a special-order part, we schedule a follow-up within 1 to 3 business days.`
    },
    {
      q: `Is it worth repairing my ${s.appliance} in ${n.name} or should I buy new?`,
      a: `If your ${s.appliance} is under 8 to 10 years old and the repair cost is less than 50% of replacement value, repair is almost always the better choice. A new ${s.appliance} in Toronto costs $600 to $2,000+ depending on the brand. ${BRAND} provides an honest repair-vs-replace recommendation — no pressure to proceed if replacement makes more financial sense.`
    },
    {
      q: `Are your ${n.name} technicians licensed and insured?`,
      a: `Yes — all ${BRAND} technicians are fully licensed, insured, WSIB-covered, and background-checked. We comply with all Ontario appliance repair regulations. For ${n.name} condo buildings that require contractor insurance certificates, we provide documentation before the appointment. Every repair includes a 90-day parts and labour warranty.`
    }
  ];
  return faqs;
}

function generatePage(neighbourhoodKey, serviceKey) {
  const n = neighbourhoods[neighbourhoodKey];
  const s = services[serviceKey];
  const content = s.content_generator(n);
  const faqs = generateFAQs(n, s);
  const filename = `${serviceKey}-${neighbourhoodKey}.html`;
  const canonicalUrl = `https://${DOMAIN}/${serviceKey}-${neighbourhoodKey}`;
  const title = `${s.name} in ${n.name} | ${BRAND}`;
  const metaDesc = `Professional ${s.appliance} repair in ${n.name}, ${n.city}. Same-day service available. Licensed technicians repair ${n.brands}. Cost: ${s.price_range}. 90-day warranty. Call ${PHONE}.`;
  const dateNow = '2026-02-23';

  // Build content body HTML
  let bodyHtml = '';
  content.sections.forEach(section => {
    bodyHtml += `        <h2>${section.title}</h2>\n`;
    bodyHtml += `        <p>${section.text}</p>\n\n`;
  });

  // Build problems table
  let problemRows = '';
  s.common_problems.forEach(p => {
    problemRows += `              <tr>\n                <td>${p.problem}</td>\n                <td>${p.cause}</td>\n                <td>${p.fix}</td>\n                <td class="price-val">${p.cost}</td>\n              </tr>\n`;
  });

  // Build FAQ HTML
  let faqHtml = '';
  faqs.forEach(faq => {
    faqHtml += `      <div class="faq-item glass-card" role="listitem">
        <button class="faq-q" aria-expanded="false" onclick="fxFaq(this)">
          ${faq.q}
          <span class="faq-chevron" aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>
          </span>
        </button>
        <div class="faq-a">${faq.a}</div>
      </div>\n`;
  });

  // Build FAQ schema
  let faqSchema = faqs.map(faq => `        {
          "@type": "Question",
          "name": "${faq.q.replace(/"/g, '\\"')}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${faq.a.replace(/"/g, '\\"')}"
          }
        }`).join(',\n');

  // Related services (other services for this neighbourhood)
  const otherServices = Object.keys(services).filter(sk => sk !== serviceKey);
  let relatedServicesHtml = '';
  otherServices.forEach(sk => {
    relatedServicesHtml += `          <a href="/${sk}-${neighbourhoodKey}" class="related-card glass-card">
            <div class="related-card-label">Service</div>
            <div class="related-card-title">${services[sk].name} in ${n.name}</div>
          </a>\n`;
  });

  // Related neighbourhoods (same service, other neighbourhoods)
  const otherNeighbourhoods = Object.keys(neighbourhoods).filter(nk => nk !== neighbourhoodKey).slice(0, 5);
  let relatedNeighbourhoodsHtml = '';
  otherNeighbourhoods.forEach(nk => {
    relatedNeighbourhoodsHtml += `          <a href="/${serviceKey}-${nk}" class="related-card glass-card">
            <div class="related-card-label">Location</div>
            <div class="related-card-title">${services[serviceKey].name} in ${neighbourhoods[nk].name}</div>
          </a>\n`;
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${metaDesc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${canonicalUrl}">

<!-- Open Graph -->
<meta property="og:title" content="${title}">
<meta property="og:description" content="${metaDesc}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_CA">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/tokens.css">

<!-- Schema JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "${BRAND}",
      "telephone": "${PHONE_LINK}",
      "url": "https://${DOMAIN}",
      "datePublished": "${dateNow}",
      "dateModified": "${dateNow}",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "${n.city}",
        "addressRegion": "Ontario",
        "addressCountry": "CA"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "5200"
      },
      "openingHours": [
        "Mo-Sa 08:00-20:00",
        "Su 09:00-18:00"
      ]
    },
    {
      "@type": "Service",
      "name": "${s.name} in ${n.name}",
      "provider": {
        "@type": "LocalBusiness",
        "name": "${BRAND}"
      },
      "areaServed": {
        "@type": "Place",
        "name": "${n.name}, ${n.city}, Ontario"
      },
      "offers": {
        "@type": "Offer",
        "priceRange": "${s.price_range}",
        "description": "${s.name} in ${n.name} — same-day service, 90-day warranty, all brands"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
${faqSchema}
      ]
    }
  ]
}
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
  --fx-font-head:   'Outfit', sans-serif;
  --fx-font-body:   'Plus Jakarta Sans', sans-serif;
  --fx-cyan:        #00C2FF;
  --fx-orange:      #FF6B35;
  --fx-text:        #E8F4FD;
  --fx-muted:       rgba(232,244,253,0.55);
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
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${metaDesc}">
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
        <a itemprop="item" href="/${serviceKey}-toronto"><span itemprop="name">${s.name}</span></a>
        <meta itemprop="position" content="2">
      </li>
      <li class="breadcrumb-sep" aria-hidden="true">&rsaquo;</li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span class="breadcrumb-current" itemprop="name">${n.name}</span>
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
        <h1 class="page-h1" id="page-h1">${s.name} in <span>${n.name}</span> — Same-Day Booking</h1>

        <div class="answer-box">
          <div class="answer-box-label">Quick Answer</div>
          <div class="answer-box-text">${s.name} in ${n.name}: ${BRAND} provides same-day ${s.appliance} repair in ${n.name}, ${n.city}. Call ${PHONE} — available 7 days a week, including evenings. Typical cost: ${s.price_range}. We repair ${n.brands} and all major brands. Most repairs completed in 1 to 2 hours on the first visit. 90-day parts and labour warranty.</div>
        </div>

        <div class="page-cta-row">
          <a href="${BOOKING_URL}" class="btn-orange" rel="noopener">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
            Book Online Now
          </a>
          <a href="tel:${PHONE_LINK}" class="btn-cyan">
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
          <a href="${BOOKING_URL}" class="btn-orange" style="width:100%;justify-content:center;" rel="noopener">
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
  <p style="margin:0;color:#CBD5E1;font-size:.9rem;line-height:1.6" itemprop="description">${BRAND} provides same-day ${s.appliance} repair in ${n.name}, ${n.city}. Call ${PHONE} — available Monday to Saturday 8 AM to 8 PM, Sunday 9 AM to 6 PM. Typical cost: ${s.price_range}. All major brands including ${n.brands}. Licensed, insured, WSIB-covered technicians. 90-day parts and labour warranty on every repair. Book online at ${DOMAIN}.</p>
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
${bodyHtml}
        <!-- Problems Table -->
        <div class="pricing-card glass-card" style="margin-top:32px;">
          <div class="pricing-card-header">
            <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;color:var(--text);">
              Common ${s.appliance_cap} Problems We Fix in ${n.name}
            </h3>
          </div>
          <table class="pricing-table" aria-label="${s.appliance_cap} repair issues in ${n.name}">
            <thead>
              <tr>
                <th>Problem</th>
                <th>Likely Cause</th>
                <th>Our Fix</th>
                <th>Typical Cost</th>
              </tr>
            </thead>
            <tbody>
${problemRows}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="content-sidebar">
        <div class="sidebar-book-card">
          <div class="sidebar-book-header">
            <div class="sidebar-book-title">Book Online Now</div>
            <div class="sidebar-book-sub">Same-day slots in ${n.name}</div>
          </div>
          <div class="sidebar-book-iframe">
            <iframe
              src="${BOOKING_URL}?embed=true"
              loading="lazy"
              title="Book ${s.appliance} repair in ${n.name} — Fixlify"
              allowfullscreen></iframe>
          </div>
        </div>

        <div class="sidebar-phone-card">
          <div class="sidebar-phone-label">Prefer to Call?</div>
          <a href="tel:${PHONE_LINK}" class="sidebar-phone-num">${PHONE}</a>
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
        Book Your ${s.name} in ${n.name}
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
          src="${BOOKING_URL}?embed=true"
          loading="lazy"
          title="Fixlify ${s.appliance} repair booking — ${n.name}"
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
        ${s.name} in ${n.name} — Common Questions
      </h2>
    </div>

    <div class="faq-list" role="list">
${faqHtml}
    </div>
  </div>
</section>

<!-- Related Pages -->
<section class="section related-section" aria-label="Related pages">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;" class="related-two-col">
      <div>
        <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;margin-bottom:6px;color:var(--text);">
          More Services in ${n.name}
        </h3>
        <div class="related-grid">
${relatedServicesHtml}
        </div>
      </div>

      <div>
        <h3 style="font-family:var(--font-head);font-weight:800;font-size:18px;margin-bottom:6px;color:var(--text);">
          ${s.name} in Other Areas
        </h3>
        <div class="related-grid">
${relatedNeighbourhoodsHtml}
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

  return { filename, html };
}

// Generate all 50 pages
const outputDir = 'C:/fixlifyservices';
const createdFiles = [];

Object.keys(neighbourhoods).forEach(nk => {
  Object.keys(services).forEach(sk => {
    const { filename, html } = generatePage(nk, sk);
    const filepath = path.join(outputDir, filename);
    fs.writeFileSync(filepath, html, 'utf8');
    createdFiles.push(filename);
    console.log(`Created: ${filename}`);
  });
});

console.log(`\nTotal files created: ${createdFiles.length}`);
console.log('\nAll files:');
createdFiles.forEach(f => console.log(`  ${f}`));
