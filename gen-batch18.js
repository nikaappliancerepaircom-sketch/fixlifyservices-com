#!/usr/bin/env node
// Batch 18 — 10 neighborhoods x 3 services = 30 pages
const fs = require('fs');
const path = require('path');

const neighborhoods = [
  {
    slug: 'caernarvon',
    display: 'Caernarvon',
    region: 'North',
    postal: 'T5X',
    era: '1980s',
    drive: '18–22 min via 97 Street NW and 153 Avenue',
    notes: '1980s Castle Downs family suburb with Welsh-named streets, mature trees, and predominantly single-family homes. Appliances installed in the 1990s–2000s are now in peak repair cycles.',
    dishwasherNote: 'Caernarvon is part of the Castle Downs district in north Edmonton, developed in the 1980s with Welsh-inspired street names — Connaught, Caerphilly, and Criccieth crescents wind through this mature family suburb. The neighbourhood\'s detached bungalows and two-storeys were built with standard-depth kitchens that typically house Whirlpool, GE, and Frigidaire dishwashers installed during late-1990s and early-2000s kitchen renovations. EPCOR water here carries 170–200 mg/L hardness — at the high end of Edmonton\'s municipal supply — and after 25–30 years of hard water cycling, spray arm nozzle calcification, inlet valve scale, and circulation motor wear are the primary failure modes we see. Our dispatches to Caernarvon run about 18–22 minutes from our 102A Avenue hub via 97 Street NW north to 153 Avenue. Mature homeowners on fixed incomes appreciate our flat $65 diagnostic and written quote before any work begins — no surprises.',
    washerNote: 'Caernarvon\'s 1980s-built homes predominantly have dedicated laundry rooms in the main-floor or basement, housing top-load Whirlpool and Maytag washers that are now approaching or past the 20-year replacement threshold. The most common calls we receive from Caernarvon are lid switch failures on older top-loaders, agitator coupler wear, and pump belt breakage. Front-load upgrades from the mid-2000s — LG and Samsung — show door boot seal failures and bearing wear. Edmonton\'s mineral-heavy water accelerates detergent soap-scum buildup in door seals, leading to mould and eventual seal cracking. We carry replacement door boots, agitator parts, and lid switch assemblies as standard truck stock for Castle Downs area dispatches.',
    fridgeNote: 'Caernarvon\'s mature family homes typically have full-depth Whirlpool, Maytag, and GE refrigerators installed in the 1990s–2000s. At 20–30 years, the dominant failure modes are compressor start relay degradation, evaporator fan motor failure, and defrost thermostat burnout — all repairable without full replacement. We also service the newer Samsung and LG French door fridges that families upgraded to in the 2010s, where ice maker failures and sealed system issues are more common. Our north Edmonton run to Caernarvon dispatches in about 18–22 minutes from downtown.',
    brands_dw: 'Whirlpool, GE, Frigidaire, Maytag, Bosch',
    brands_w: 'Whirlpool, Maytag, LG, Samsung, GE',
    brands_f: 'Whirlpool, GE, Maytag, Samsung, LG'
  },
  {
    slug: 'dunluce',
    display: 'Dunluce',
    region: 'North',
    postal: 'T5X',
    era: '1980s',
    drive: '20–25 min via 97 Street NW and 156 Avenue',
    notes: '1980s Castle Downs suburb with mature trees and predominantly bungalow-style family homes. Appliances from the late 1990s renovation era are in their peak repair window.',
    dishwasherNote: 'Dunluce sits in the northern arc of Castle Downs, developed through the 1980s as one of Edmonton\'s largest planned family subdivisions. Homes on Dunvegan Road, Duthie Crescent, and Duthie Drive typically have galley or L-shaped kitchens where dishwashers were retrofitted during 1990s renovations — primarily Frigidaire, Maytag, and Whirlpool 24-inch units. EPCOR supplies this area at 170–200 mg/L hardness, and after 25+ years, mineral scale is the dominant cause of non-draining and poor-cleaning calls. Spray arm calcification, inlet valve scale blockage, and drain pump clog from food particle buildup are the top three failure modes we diagnose in Dunluce. Our hub at 10025 102A Avenue NW dispatches here in approximately 20–25 minutes via 97 Street north to 156 Avenue.',
    washerNote: 'Dunluce laundry rooms — typically in-suite main floor or basement — house older top-load Whirlpool and Maytag washers alongside mid-2000s front-load LG and Samsung machines. Top-loaders show lid switch failure, pump belt wear, and agitator dog wear at 20–25 years. Front-loaders frequently show door boot seal cracking, drum bearing failure, and CCU (main control board) faults. We carry parts for all of these as standard stock on north Edmonton trucks, minimising return visits to Dunluce.',
    fridgeNote: 'Dunluce\'s mature housing stock means refrigerators from the 1990s through the 2010s are both common. Older Whirlpool and GE top-mount and side-by-side units show compressor relay failure and defrost system faults. Newer LG French doors in the neighbourhood frequently have ice maker failures, sealed system leaks, and linear compressor issues covered under extended warranty or requiring OEM compressor replacement. We service all of these in Dunluce with same-day appointments most weekdays.',
    brands_dw: 'Frigidaire, Maytag, Whirlpool, GE, LG',
    brands_w: 'Whirlpool, Maytag, LG, Samsung, Frigidaire',
    brands_f: 'Whirlpool, GE, LG, Samsung, Maytag'
  },
  {
    slug: 'terra-losa',
    display: 'Terra Losa',
    region: 'West',
    postal: 'T5T',
    era: '1980s',
    drive: '14–18 min via Stony Plain Road and 178 Street',
    notes: '1980s west Edmonton family suburb near West Edmonton Mall, predominantly bungalows and bi-levels with mature appliance install bases.',
    dishwasherNote: 'Terra Losa is a 1980s west Edmonton neighbourhood tucked between Callingwood Road and the Whitemud Freeway, roughly 2 km from West Edmonton Mall. The neighbourhood\'s bungalows and bi-levels were built for working families, with kitchens designed around standard-depth Inglis, Whirlpool, and GE dishwashers. Many of those original units were replaced in the early 2000s, meaning the current appliance base is now 20–25 years old — deep into the typical failure window. EPCOR hard water at 170–200 mg/L has calcified spray arms, degraded rubber door gaskets, and scaled inlet valve screens across the neighbourhood. We dispatch to Terra Losa from our hub at 10025 102A Avenue NW in approximately 14–18 minutes via Stony Plain Road west to 178 Street.',
    washerNote: 'Terra Losa\'s detached family homes typically have laundry in a main-floor utility room or basement, housing Whirlpool and Maytag washers from the early-to-mid 2000s renovation wave. Common calls include agitator coupler failure, lid switch fault, and pump bearing noise on top-loaders; door boot seal cracking and drum bearing noise on 2010s-era front-load LG and Samsung machines. We keep west Edmonton laundry parts on our trucks for same-day resolution.',
    fridgeNote: 'Terra Losa refrigerators are predominantly 2000s Whirlpool, GE, and Frigidaire side-by-side and top-mount units now hitting the 20-year repair threshold. The top failure modes are defrost thermostat burnout, evaporator fan motor failure, and ice maker module faults. We also see a growing volume of Samsung French door repairs in the neighbourhood as 2010s-era upgrades age out of warranty. Same-day service available most weekdays from our west Edmonton dispatch.',
    brands_dw: 'Whirlpool, GE, Frigidaire, Inglis, Bosch',
    brands_w: 'Whirlpool, Maytag, LG, Samsung, Frigidaire',
    brands_f: 'Whirlpool, GE, Frigidaire, Samsung, LG'
  },
  {
    slug: 'la-perle',
    display: 'La Perle',
    region: 'West',
    postal: 'T5T',
    era: '1980s',
    drive: '13–17 min via Stony Plain Road and 180 Street',
    notes: '1980s west Edmonton family suburb adjacent to Callingwood, predominantly bungalows with 20–25 year appliance install bases.',
    dishwasherNote: 'La Perle is a compact 1980s west Edmonton neighbourhood sitting between Callingwood North and Lymburn, bounded by 87 Avenue and Stony Plain Road. Its low-slung bungalows and split-level homes were built with Inglis and Whirlpool kitchens; many were upgraded to Bosch and GE dishwashers in the early 2000s, meaning the current stock is 20–25 years into its service life. EPCOR water hardness at 170–200 mg/L is a significant factor in La Perle: spray arm calcification, inlet valve scale, and door gasket mineral staining drive the majority of our calls here. Our dispatch from downtown Edmonton reaches La Perle in about 13–17 minutes via Stony Plain Road west, making same-day morning bookings very practical.',
    washerNote: 'La Perle laundry rooms house a mix of top-load Whirlpool and Maytag washers from the early 2000s and front-load LG and Samsung machines upgraded in the 2010s. Agitator coupler failure, lid switch fault, and pump belt wear are the top calls on older top-loaders. Door boot seal cracking, drum bearing noise, and drain pump filter blockage are the leading front-load issues. We carry La Perle-relevant parts as standard west Edmonton truck stock.',
    fridgeNote: 'La Perle\'s 1980s homes typically have full-depth side-by-side or top-mount refrigerators, many upgraded in the 2000s to GE Profile or Whirlpool Gold models. At 20+ years, defrost system failures and compressor start relay degradation are the primary concerns. Newer Samsung and LG French doors in the neighbourhood show ice maker and sealed system issues. Our west Edmonton crew services La Perle with same-day turnaround most weekdays.',
    brands_dw: 'Whirlpool, GE, Bosch, Frigidaire, Inglis',
    brands_w: 'Whirlpool, Maytag, LG, Samsung, Frigidaire',
    brands_f: 'Whirlpool, GE, Samsung, LG, Frigidaire'
  },
  {
    slug: 'lorelei',
    display: 'Lorelei',
    region: 'North',
    postal: 'T5X',
    era: '1980s',
    drive: '19–24 min via 97 Street NW and 153 Avenue',
    notes: '1980s Castle Downs family suburb, mature trees, predominantly bungalows. Appliances in peak repair window after 35+ years.',
    dishwasherNote: 'Lorelei is part of the Castle Downs district in north Edmonton, one of the quieter sub-areas developed in the early 1980s along Lyons Crescent and Laborde Crescent. The neighbourhood\'s mature bungalows and two-storeys were built with standard galley kitchens where Whirlpool, Frigidaire, and GE dishwashers were the norm. Renovation waves in the 1990s and early 2000s brought Maytag and Kenmore upgrades — most of which are now well past the 20-year mark. EPCOR water at 170–200 mg/L hardness has calcified spray arm nozzles, blocked inlet valve mesh screens, and degraded door gasket rubber throughout the neighbourhood. Mineral-related non-drain and no-clean calls dominate our Lorelei dispatch queue. We reach Lorelei from our 102A Avenue hub in approximately 19–24 minutes via 97 Street north.',
    washerNote: 'Lorelei washer calls are predominantly top-load Whirlpool and Maytag machines from the late 1990s–early 2000s showing lid switch failure, pump wear, and agitator coupler breakage. A smaller but growing volume comes from 2010s Samsung and LG front-loaders with door boot seal failures and bearing wear. We stock Castle Downs laundry parts on our north Edmonton trucks for single-visit resolution.',
    fridgeNote: 'Lorelei refrigerators follow the Castle Downs pattern: older Whirlpool, GE, and Maytag top-mounts and side-by-sides from the 1990s–2000s with defrost system faults and compressor relay failure, alongside newer LG and Samsung French doors with ice maker and sealed system issues. Same-day service available from our north Edmonton crew.',
    brands_dw: 'Whirlpool, Frigidaire, GE, Maytag, Kenmore',
    brands_w: 'Whirlpool, Maytag, Samsung, LG, Frigidaire',
    brands_f: 'Whirlpool, GE, Maytag, Samsung, LG'
  },
  {
    slug: 'carlisle',
    display: 'Carlisle',
    region: 'North',
    postal: 'T5X',
    era: '1980s',
    drive: '17–21 min via 97 Street NW and 144 Avenue',
    notes: '1980s Castle Downs sub-area, family bungalows with mature tree canopy. Appliances at 35+ year mark.',
    dishwasherNote: 'Carlisle is one of the original Castle Downs sub-areas in north Edmonton, with most homes built between 1978 and 1986 along Cavendish Way, Carmichael Close, and Castledowns Road. The neighbourhood\'s bungalows feature standard-depth kitchens with Inglis, Whirlpool, and GE dishwashers — many updated in the early 2000s to Bosch or Maytag units now approaching 20 years of service. EPCOR delivers 170–200 mg/L mineral hardness to Carlisle, accelerating spray arm scale, inlet valve degradation, and door gasket mineral cracking. Our technicians frequently find dishwashers in Carlisle that show multiple concurrent failure modes — drain pump, spray arm, and heating element — reflecting an appliance at end of service life. When repair cost exceeds 50% of replacement, we advise honestly rather than up-selling unnecessary repairs.',
    washerNote: 'Carlisle laundry rooms are predominantly main-floor or basement, housing older Whirlpool and Maytag top-loaders from the 1990s and early 2000s. Agitator dog failure, lid switch fault, and pump belt snap are the most common calls. We also service 2010s LG and Samsung front-loaders showing door boot cracking and bearing wear. Parts stocked on north Edmonton truck.',
    fridgeNote: 'Carlisle\'s older homes have refrigerators from the late 1990s through the 2010s. The most common repairs are defrost thermostat burnout, evaporator fan motor replacement, and compressor start relay — all cost-effective repairs that extend life by 5–10 years. We also see Samsung French door ice maker failures from the 2010s upgrade generation.',
    brands_dw: 'Inglis, Whirlpool, GE, Maytag, Bosch',
    brands_w: 'Whirlpool, Maytag, LG, Samsung, Inglis',
    brands_f: 'Whirlpool, GE, Maytag, Samsung, Frigidaire'
  },
  {
    slug: 'canossa',
    display: 'Canossa',
    region: 'North',
    postal: 'T5X',
    era: '1990s',
    drive: '19–23 min via 97 Street NW and 153 Avenue',
    notes: '1990s Castle Downs family neighbourhood, mix of bungalows and two-storey homes. Appliances from the 2000s upgrade cycle are entering the repair window.',
    dishwasherNote: 'Canossa is a 1990s sub-area of Castle Downs in north Edmonton, developed slightly later than the original Castle Downs neighbourhoods. Homes along Castlegreen Drive, Cassidy Crescent, and Canossa Boulevard are predominantly two-storey family houses with more generous kitchen layouts than their 1980s neighbours — often featuring Bosch, GE Profile, and KitchenAid dishwashers installed during 2000s renovations. These machines are now 20–25 years old and entering the classic failure window: drain pump wear, spray arm calcification from EPCOR\'s 170–200 mg/L hard water, and control board fault codes. We dispatch to Canossa in approximately 19–23 minutes from our hub at 10025 102A Avenue NW via 97 Street NW north.',
    washerNote: 'Canossa\'s two-storey homes frequently have upstairs laundry closets or main-floor utility rooms with 2000s-era front-load LG, Samsung, and Bosch washers. Door boot seal failure, drum bearing noise, and CCU control board faults are the predominant issues at the 20-year mark. Older Whirlpool top-loaders in basement laundry rooms show lid switch failure and agitator wear. We carry parts for both eras on our north Edmonton trucks.',
    fridgeNote: 'Canossa refrigerators are skewed toward the 2000s and 2010s — GE Profile, Whirlpool Gold, and LG French door units that are now in the 15–25 year range. The most common calls are ice maker module failure, sealed system leaks on LG, and defrost thermostat faults on older GE units. Same-day service available from our north Edmonton crew most weekdays.',
    brands_dw: 'Bosch, GE, KitchenAid, LG, Whirlpool',
    brands_w: 'LG, Samsung, Bosch, Whirlpool, Maytag',
    brands_f: 'GE, Whirlpool, LG, Samsung, KitchenAid'
  },
  {
    slug: 'oxford',
    display: 'Oxford',
    region: 'North',
    postal: 'T5T',
    era: '1990s–2000s',
    drive: '14–18 min via St. Albert Trail and 167 Avenue',
    notes: '1990s–2000s Palisades family suburb, predominantly two-storey homes with full kitchens. Appliances from the 2000s installation wave now at the repair threshold.',
    dishwasherNote: 'Oxford is part of the Palisades area in northwest Edmonton, developed through the 1990s and early 2000s with two-storey family homes along Oxford Drive and Ordze Avenue corridor. These homes were built with standard full kitchens — Bosch, GE, and Whirlpool dishwashers are the most common brands we see here. Installed primarily in the early 2000s, these machines are now 20–25 years into service. EPCOR water hardness of 170–200 mg/L has calcified spray arms and scaled inlet valve screens throughout Oxford. The neighbourhood is also notable for a higher-than-average share of Bosch integrated units installed during 2005–2010 kitchen renovations, which show E15 flood protection faults and E24 drain errors after prolonged hard water use. We dispatch to Oxford from our hub in about 14–18 minutes via St. Albert Trail north to 167 Avenue.',
    washerNote: 'Oxford\'s two-storey homes typically have main-floor or upstairs laundry rooms with 2000s-era front-load LG, Samsung, and Maytag washers. The primary calls are door boot seal cracking, drum bearing failure, and drain pump blockage. Older Whirlpool top-loaders still in basement setups show lid switch and agitator wear. We stock Palisades-area laundry parts on our northwest Edmonton trucks.',
    fridgeNote: 'Oxford refrigerators are predominantly 2000s–2010s GE, Whirlpool, and LG French door units. Ice maker failures, defrost thermostat faults, and sealed system issues on LG are the leading calls. Samsung ice maker problems are also frequent in the 2012–2016 vintage units common in Oxford. Same-day service available most weekdays.',
    brands_dw: 'Bosch, GE, Whirlpool, LG, Samsung',
    brands_w: 'LG, Samsung, Maytag, Whirlpool, Bosch',
    brands_f: 'GE, Whirlpool, LG, Samsung, Frigidaire'
  },
  {
    slug: 'chambery',
    display: 'Chambery',
    region: 'North',
    postal: 'T5X',
    era: '2000s',
    drive: '19–23 min via 97 Street NW and 160 Avenue',
    notes: '2000s Castle Downs expansion, newer family homes with mid-range appliances now hitting the 20-year repair threshold.',
    dishwasherNote: 'Chambery is a 2000s-era Castle Downs neighbourhood in north Edmonton, developed later than the original Castle Downs sub-areas and featuring larger two-storey family homes along Chambery Way and Charlesworth Drive. These homes were built with full kitchens often including Bosch, Samsung, and LG dishwashers from the 2005–2015 installation period — now approaching or entering the 15–20 year repair window. EPCOR water hardness of 170–200 mg/L is a key factor: Samsung and LG control board fault codes triggered by water inlet debris, Bosch E15 and E24 errors from scaled drain paths, and spray arm calcification are the dominant issues we diagnose in Chambery. Our technicians reach Chambery in approximately 19–23 minutes from our hub at 10025 102A Avenue NW via 97 Street north to 160 Avenue.',
    washerNote: 'Chambery\'s 2000s family homes predominantly have upstairs or main-floor laundry rooms with front-load LG, Samsung, and Whirlpool washers from the 2007–2015 era. Door boot seal failure, drum bearing wear, and CCU board faults are the leading calls at the 15–20 year mark. We carry Chambery-relevant front-load laundry parts as standard north Edmonton truck stock.',
    fridgeNote: 'Chambery refrigerators are predominantly LG French door and Samsung French door units from the 2008–2015 period, now entering the repair window for ice maker failures, sealed system issues, and linear compressor problems (LG). We also service older GE and Whirlpool units in the neighbourhood. Same-day north Edmonton dispatch available most weekdays.',
    brands_dw: 'Bosch, Samsung, LG, GE, Whirlpool',
    brands_w: 'LG, Samsung, Whirlpool, Maytag, Bosch',
    brands_f: 'LG, Samsung, GE, Whirlpool, Frigidaire'
  },
  {
    slug: 'rapperswill',
    display: 'Rapperswill',
    region: 'North',
    postal: 'T5X',
    era: '2000s',
    drive: '20–25 min via 97 Street NW and 163 Avenue',
    notes: '2000s Castle Downs expansion, larger two-storey family homes with premium appliances now entering the repair window.',
    dishwasherNote: 'Rapperswill is a 2000s Castle Downs sub-area in north Edmonton, situated near the northern edge of Edmonton\'s urban boundary along Rhatigan Drive and Rapperswill Drive. Homes here are larger than the original Castle Downs stock — two-storey family homes with full kitchens that were often equipped with Bosch, KitchenAid, and GE Profile dishwashers during the 2006–2014 construction period. These machines are now 10–20 years old, passing the peak reliability phase. EPCOR\'s 170–200 mg/L hard water accelerates Bosch E15 flood protection faults and KitchenAid spray arm calcification. Our dispatches to Rapperswill run approximately 20–25 minutes from our 102A Avenue hub via 97 Street NW north to 163 Avenue. Given the premium appliance profile, we stock Bosch and KitchenAid OEM parts on north Edmonton trucks.',
    washerNote: 'Rapperswill\'s larger family homes typically feature upstairs laundry rooms with front-load Bosch, LG, and Samsung washers from the 2008–2015 installation era. Door boot seal wear, drum bearing failure, and control board faults are the primary calls at 10–18 years. We carry premium front-load laundry parts on our north Edmonton trucks for Rapperswill dispatches.',
    fridgeNote: 'Rapperswill refrigerators skew toward the premium end — KitchenAid, Bosch, and GE Profile units from the 2006–2014 period, plus LG French door upgrades from the 2010s. Ice maker failures, sealed system issues, and compressor relay degradation are the leading calls. Same-day north Edmonton service available most weekdays.',
    brands_dw: 'Bosch, KitchenAid, GE, LG, Samsung',
    brands_w: 'Bosch, LG, Samsung, Whirlpool, Maytag',
    brands_f: 'KitchenAid, Bosch, GE, LG, Samsung'
  }
];

const services = [
  {
    type: 'dishwasher',
    display: 'Dishwasher Repair',
    breadcrumbParent: '/dishwasher-repair-edmonton',
    breadcrumbParentLabel: 'Dishwasher Repair Edmonton',
    priceRange: '$120&ndash;$380',
    brands: (n) => n.brands_dw,
    contentPara: (n) => n.dishwasherNote,
    hardWaterLine: `Edmonton's EPCOR water runs at 170&ndash;200 mg/L hardness &mdash; among the highest in Alberta &mdash; which accelerates spray arm mineral scale, inlet valve blockage, and door gasket degradation in dishwashers across the region.`,
    problems: [
      { name: 'Not draining / standing water', desc: 'Drain pump failure or clogged drain hose — most common dishwasher repair call. We carry OEM drain pump assemblies for same-day repair.' },
      { name: 'Not cleaning — spray arm scale', desc: 'EPCOR hard water calcifies spray nozzles after 6–10 years. Spray arm replacement + descale is a standard same-day repair.' },
      { name: 'Heating element failure', desc: 'Dishes wet at end of cycle — element burnout at 8–15 years. OEM replacement same-day for major brands.' },
      { name: 'Door latch / won\'t start', desc: 'Door latch micro-switch failure prevents start. 30-minute OEM replacement. Common across all brands.' },
      { name: 'Control board / fault codes', desc: 'Bosch E15/E22/E24 and Samsung/LG error codes. We run proprietary diagnostics for accurate fault identification.' },
      { name: 'Door gasket leak', desc: 'Gasket failure lets water escape onto kitchen floor. OEM gasket replacement same-day for major brands.' }
    ],
    pricing: [
      { repair: 'Diagnostic visit (waived with repair)', range: '$65' },
      { repair: 'Drain pump replacement', range: '$180&ndash;$280' },
      { repair: 'Heating element replacement', range: '$150&ndash;$240' },
      { repair: 'Door gasket replacement', range: '$140&ndash;$220' },
      { repair: 'Spray arm + bearing', range: '$90&ndash;$160' },
      { repair: 'Control board', range: '$240&ndash;$420' },
      { repair: 'Circulation motor', range: '$220&ndash;$360' }
    ],
    faq: (n) => [
      { q: `How fast can you reach ${n.display}?`, a: `Approximately ${n.drive}. Same-day service when you book before 12 PM Monday&ndash;Saturday. Sunday crew available 10 AM&ndash;6 PM Mountain Time.` },
      { q: `Does hard water affect my dishwasher in ${n.display}?`, a: `Yes &mdash; EPCOR water in ${n.display} runs at 170&ndash;200 mg/L hardness. Over time this calcifies spray arm nozzles, blocks inlet valve screens, and degrades door gaskets. We descale and replace affected components as part of every ${n.display} dishwasher repair.` },
      { q: `How much does dishwasher repair cost in ${n.display}?`, a: `Typical dishwasher repair in ${n.display} runs $120&ndash;$380 CAD including parts and labour. Flat $65 diagnostic waived when you proceed with the repair. Written quote before any work begins. 90-day parts and labour warranty.` }
    ],
    related: (n) => [
      { href: `/washer-repair-${n.slug}`, label: `Washer Repair &mdash; ${n.display}` },
      { href: `/fridge-repair-${n.slug}`, label: `Fridge Repair &mdash; ${n.display}` },
      { href: `/dishwasher-repair-edmonton`, label: `Dishwasher Repair &mdash; Edmonton` }
    ]
  },
  {
    type: 'washer',
    display: 'Washer Repair',
    breadcrumbParent: '/washer-repair-edmonton',
    breadcrumbParentLabel: 'Washer Repair Edmonton',
    priceRange: '$130&ndash;$420',
    brands: (n) => n.brands_w,
    contentPara: (n) => n.washerNote,
    hardWaterLine: `Edmonton's EPCOR water at 170&ndash;200 mg/L hardness causes detergent soap-scum accumulation in door boot seals and drum surfaces, accelerating seal cracking and mould growth on front-load washers across the region.`,
    problems: [
      { name: 'Not spinning / drum won\'t turn', desc: 'Drive belt snap, motor coupling failure, or lid switch fault. We carry OEM belts and couplings for same-day repair.' },
      { name: 'Not draining — pump failure', desc: 'Drain pump impeller jam or pump motor burnout. OEM pump replacement same-day for major brands.' },
      { name: 'Loud banging — drum bearing', desc: 'Drum bearing wear causes progressive banging under load. Bearing replacement before shaft damage saves the machine.' },
      { name: 'Door boot seal leak (front-load)', desc: 'Torn or hardened door gasket allows water on the floor. OEM seal replacement same-day.' },
      { name: 'No power / control board', desc: 'CCU or main control board fault. We run diagnostics to distinguish board failure from wiring issues.' },
      { name: 'Won\'t agitate — top-load', desc: 'Agitator coupler, dogs, or drive block failure — common in top-loaders 10+ years old.' }
    ],
    pricing: [
      { repair: 'Diagnostic visit (waived with repair)', range: '$65' },
      { repair: 'Drive belt / motor coupling', range: '$130&ndash;$210' },
      { repair: 'Drain pump replacement', range: '$160&ndash;$260' },
      { repair: 'Drum bearing replacement', range: '$230&ndash;$380' },
      { repair: 'Door boot seal (front-load)', range: '$160&ndash;$260' },
      { repair: 'Control board (CCU)', range: '$260&ndash;$420' },
      { repair: 'Agitator rebuild (top-load)', range: '$100&ndash;$180' }
    ],
    faq: (n) => [
      { q: `How fast can you reach ${n.display} for washer repair?`, a: `Approximately ${n.drive}. Same-day service when you book before 12 PM Monday&ndash;Saturday. Sunday 10 AM&ndash;6 PM Mountain Time.` },
      { q: `Do you repair front-load and top-load washers in ${n.display}?`, a: `Yes &mdash; we service all washer configurations in ${n.display}: top-load, front-load, high-efficiency, and stackable units from all major brands including LG, Samsung, Whirlpool, Maytag, and Bosch.` },
      { q: `How much does washer repair cost in ${n.display}?`, a: `Typical washer repair in ${n.display} runs $130&ndash;$420 CAD including parts and labour. Flat $65 diagnostic waived with repair. 90-day warranty.` }
    ],
    related: (n) => [
      { href: `/dishwasher-repair-${n.slug}`, label: `Dishwasher Repair &mdash; ${n.display}` },
      { href: `/fridge-repair-${n.slug}`, label: `Fridge Repair &mdash; ${n.display}` },
      { href: `/washer-repair-edmonton`, label: `Washer Repair &mdash; Edmonton` }
    ]
  },
  {
    type: 'fridge',
    display: 'Fridge Repair',
    breadcrumbParent: '/fridge-repair-edmonton',
    breadcrumbParentLabel: 'Fridge Repair Edmonton',
    priceRange: '$130&ndash;$480',
    brands: (n) => n.brands_f,
    contentPara: (n) => n.fridgeNote,
    hardWaterLine: `Edmonton's hard water at 170&ndash;200 mg/L affects refrigerator ice makers and water dispensers &mdash; scale buildup in water inlet valves, ice maker fill tubes, and filter housings is a common cause of ice maker failure across the region.`,
    problems: [
      { name: 'Not cooling / warm fridge', desc: 'Compressor relay failure, condenser coil blockage, or sealed system leak. We diagnose sealed system accurately before advising repair vs. replace.' },
      { name: 'Ice maker not making ice', desc: 'Water inlet valve scale blockage, ice maker module failure, or freezer temperature fault. OEM module replacement same-day.' },
      { name: 'Frost buildup — defrost failure', desc: 'Defrost heater, thermostat, or control board fault. Frost accumulation in freezer is diagnostic for defrost system failure.' },
      { name: 'Water dispenser not working', desc: 'Inlet valve scale or dispenser micro-switch failure. We flush and replace inlet valves same-day.' },
      { name: 'Noisy — evaporator fan', desc: 'Evaporator fan motor bearing failure causes progressive screeching. OEM fan replacement is a 45-minute repair.' },
      { name: 'Temperature fluctuation', desc: 'Thermostat, damper, or control board fault. We run full diagnostic to pinpoint root cause.' }
    ],
    pricing: [
      { repair: 'Diagnostic visit (waived with repair)', range: '$65' },
      { repair: 'Compressor relay replacement', range: '$130&ndash;$210' },
      { repair: 'Defrost heater + thermostat', range: '$180&ndash;$290' },
      { repair: 'Evaporator fan motor', range: '$160&ndash;$250' },
      { repair: 'Ice maker module', range: '$180&ndash;$280' },
      { repair: 'Water inlet valve', range: '$140&ndash;$220' },
      { repair: 'Control board', range: '$260&ndash;$480' }
    ],
    faq: (n) => [
      { q: `How fast can you reach ${n.display} for fridge repair?`, a: `Approximately ${n.drive}. Same-day service when you book before 12 PM Monday&ndash;Saturday. Sunday crew 10 AM&ndash;6 PM Mountain Time.` },
      { q: `Do you repair LG French door fridges in ${n.display}?`, a: `Yes &mdash; LG French door refrigerators are among the most common brands we service in ${n.display}. We carry OEM LG ice maker modules, water inlet valves, and linear compressor assemblies as standard north Edmonton truck stock.` },
      { q: `How much does fridge repair cost in ${n.display}?`, a: `Typical fridge repair in ${n.display} runs $130&ndash;$480 CAD including parts and labour. Flat $65 diagnostic waived with repair. Written quote before any work begins. 90-day warranty.` }
    ],
    related: (n) => [
      { href: `/dishwasher-repair-${n.slug}`, label: `Dishwasher Repair &mdash; ${n.display}` },
      { href: `/washer-repair-${n.slug}`, label: `Washer Repair &mdash; ${n.display}` },
      { href: `/fridge-repair-edmonton`, label: `Fridge Repair &mdash; Edmonton` }
    ]
  }
];

function buildPage(neighborhood, service) {
  const n = neighborhood;
  const s = service;
  const slugFull = `${s.type}-repair-${n.slug}`;
  const title = `${s.display} ${n.display} Edmonton | Fixlify`;
  const h1 = `${s.display} in ${n.display}, Edmonton`;
  const canonicalUrl = `https://fixlifyservices.com/${slugFull}`;
  const priceRangeClean = s.priceRange.replace(/&ndash;/g, '–');
  const metaDesc = `${s.display} in ${n.display}, Edmonton — same-day service, flat $65 diagnostic, 90-day warranty. ${s.brands(n).split(',')[0]} & all brands. Book online or email edmonton@fixlifyservices.com.`.slice(0, 160);

  const brandChips = s.brands(n).split(',').map(b => `<span class="brand-chip">${b.trim()}</span>`).join('');

  const problemCards = s.problems.map(p =>
    `<div class="problem-card"><div class="problem-name">${p.name}</div><div class="problem-desc">${p.desc}</div></div>`
  ).join('\n      ');

  const pricingRows = s.pricing.map(p =>
    `<tr><td>${p.repair}</td><td>${p.range}</td></tr>`
  ).join('\n        ');

  const faqItems = s.faq(n).map(f =>
    `<details class="faq-item"><summary class="faq-question"><span>${f.q}</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>${f.a}</p></div></details>`
  ).join('\n    ');

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faq(n).map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a.replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').replace(/&amp;/g, '&')
      }
    }))
  });

  const businessSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${canonicalUrl}#business`,
    name: h1,
    description: `${s.display} in ${n.display}, Edmonton. Same-day service, $65 diagnostic, 90-day warranty.`,
    url: canonicalUrl,
    priceRange: '$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10025 102A Avenue NW Suite 1000',
      addressLocality: 'Edmonton',
      addressRegion: 'AB',
      postalCode: 'T5J 2Z2',
      addressCountry: 'CA'
    },
    areaServed: [
      { '@type': 'City', name: 'Edmonton' },
      { '@type': 'Neighborhood', name: n.display }
    ],
    serviceType: s.display
  });

  const relatedLinks = s.related(n).map(r =>
    `<a href="${r.href}" class="related-link">${r.label}</a>`
  ).join('\n      ');

  const iframeId = `fxbk-${s.type[0]}-${n.slug}`;
  const yrId = `fx-yr-${s.type[0]}-${n.slug}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${metaDesc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${canonicalUrl}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/tokens.css">
<style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth;font-size:16px}body{font-family:'Instrument Sans',-apple-system,sans-serif;background:#fff;color:#0a0a0a;line-height:1.6;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}.container{max-width:1200px;margin:0 auto;padding:0 24px}.breadcrumb{padding:14px 0;border-bottom:1px solid #e5e7eb;background:#fafafa}.breadcrumb .container{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.breadcrumb a{font-size:.8125rem;font-weight:500;color:#6b7280}.breadcrumb-sep{font-size:.8125rem;color:#d1d5db}.breadcrumb-current{font-size:.8125rem;font-weight:600;color:#0a0a0a}.page-hero{padding:56px 0 48px;background:#fff;border-bottom:1px solid #e5e7eb}.page-hero .container{max-width:800px}.page-hero-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#2563eb;margin-bottom:16px}.page-hero-eyebrow::before{content:'';display:block;width:16px;height:2px;background:#2563eb}h1.page-h1{font-size:clamp(1.875rem,4vw,2.75rem);font-weight:700;line-height:1.1;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:24px}.answer-box{background:#eff6ff;border-left:3px solid #2563eb;border-radius:0 6px 6px 0;padding:20px 24px;margin-bottom:32px;font-size:1rem;color:#1e40af;line-height:1.7;font-weight:500}.btn-primary{display:inline-flex;align-items:center;gap:8px;background:#2563eb;color:#fff;font-size:1rem;font-weight:700;padding:14px 24px;border-radius:4px;white-space:nowrap}.btn-primary:hover{background:#1d4ed8}.btn-secondary{display:inline-flex;align-items:center;gap:6px;background:#fff;color:#2563eb;font-size:1rem;font-weight:700;padding:13px 22px;border-radius:4px;border:1.5px solid #2563eb;white-space:nowrap}.trust-bar{background:#0a0a0a;padding:14px 0}.trust-bar-inner{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.trust-item{display:flex;align-items:center;gap:8px;padding:4px 24px;border-right:1px solid rgba(255,255,255,.1);font-size:.8125rem;font-weight:600;color:rgba(255,255,255,.9);white-space:nowrap}.trust-item:last-child{border-right:none}.section-label{font-size:.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#2563eb;margin-bottom:12px}.section-title{font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em;color:#0a0a0a;line-height:1.15;margin-bottom:16px}main.page-main{padding:56px 0 0}.problems-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}.problem-card{background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px}.problem-name{font-size:.9375rem;font-weight:700;color:#0a0a0a;margin-bottom:6px}.problem-desc{font-size:.875rem;color:#6b7280;line-height:1.5}.pricing-table{width:100%;border-collapse:collapse;margin-top:24px;font-size:.9375rem}.pricing-table th,.pricing-table td{padding:12px 16px;border-bottom:1px solid #e5e7eb;text-align:left}.pricing-table th{background:#f9fafb;font-weight:600;color:#0a0a0a;font-size:.8125rem;text-transform:uppercase;letter-spacing:.05em}.pricing-table td:last-child{font-weight:600;color:#2563eb;white-space:nowrap}.faq-item{border-bottom:1px solid #e5e7eb}.faq-question{display:flex;justify-content:space-between;align-items:center;padding:18px 0;cursor:pointer;gap:16px;list-style:none;font-weight:600;font-size:1rem;color:#0a0a0a}.faq-question::-webkit-details-marker{display:none}.faq-icon{font-size:1.25rem;color:#2563eb;flex-shrink:0;transition:transform .2s}details[open] .faq-icon{transform:rotate(45deg)}.faq-answer{padding:0 0 18px;font-size:.9375rem;color:#374151;line-height:1.7}.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}.related-link{display:block;padding:10px 14px;background:#fff;border:1px solid #e5e7eb;border-radius:6px;font-size:.875rem;font-weight:500;color:#2563eb}.brand-chip{display:inline-block;padding:8px 16px;background:#fff;border:1px solid #e5e7eb;border-radius:999px;font-size:.875rem;font-weight:600;color:#0a0a0a}.fade-in{opacity:0;transition:opacity .35s ease}.fade-in.visible{opacity:1}.lz-trust-block{max-width:880px;margin:24px auto;padding:24px 20px;border:1px solid rgba(15,23,42,0.08);border-radius:12px;background:#FAFAFA;font-size:15px;line-height:1.65;color:#374151}.lz-trust-h{font-size:1.2rem;margin:0 0 10px;color:#0f172a;font-weight:700}.lz-trust-intro{margin:0 0 14px;color:#334155}.lz-trust-points{list-style:none;margin:0 0 16px;padding:0;display:grid;gap:8px}.lz-trust-points li{padding-left:22px;position:relative;color:#475569;font-size:14px}.lz-trust-points li::before{content:"\\2713";position:absolute;left:0;top:0;color:#2563eb;font-weight:700}.lz-quick-form{display:grid;gap:10px;padding:14px;border:1px dashed rgba(15,23,42,0.12);border-radius:10px;background:#fff}.lz-quick-form-lead{margin:0 0 4px;font-size:13px;color:#475569}.lz-quick-field{display:flex;flex-direction:column;gap:4px;font-size:12px;color:#475569;font-weight:600}.lz-quick-field input,.lz-quick-field textarea{padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:14px;color:#0f172a;background:#fff;font-family:inherit}.lz-quick-submit{padding:10px 18px;background:#2563eb;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;font-size:14px}footer.fx-footer{background:#0a0a0a;color:rgba(255,255,255,.7);padding:40px 0;margin-top:80px}.fx-footer-inner{max-width:1200px;margin:0 auto;padding:0 24px}.fx-footer-cta-strip{background:#1e3a5f;border-radius:8px;padding:24px;margin-bottom:32px}.fx-footer-cta-content{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}.fx-footer-cta-label{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#93c5fd;display:block;margin-bottom:4px}.fx-footer-cta-text p{color:rgba(255,255,255,.8);font-size:.9rem;margin:0}.fx-footer-cta-btns{display:flex;gap:10px;flex-wrap:wrap}.fx-footer-btn-book{background:#2563eb;color:#fff;padding:10px 20px;border-radius:4px;font-weight:700;font-size:.9rem}.fx-footer-btn-call{background:transparent;color:#93c5fd;padding:10px 20px;border-radius:4px;font-weight:600;font-size:.9rem;border:1px solid rgba(147,197,253,.3)}.fx-footer-columns{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;margin-bottom:32px}.fx-footer-logo{display:flex;align-items:center;gap:8px;margin-bottom:12px}.fx-footer-logo-icon{color:#2563eb}.fx-footer-logo-name{font-weight:700;color:#fff;font-size:1rem}.fx-footer-desc{font-size:.875rem;color:rgba(255,255,255,.6);line-height:1.6;margin-bottom:16px}.fx-footer-address{font-size:.875rem;color:rgba(255,255,255,.6);line-height:1.7}.fx-footer-hours{font-size:.8125rem;color:rgba(255,255,255,.5);margin-top:12px;display:flex;flex-direction:column;gap:2px}.fx-footer-hours strong{color:rgba(255,255,255,.7)}.fx-footer-heading{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin-bottom:12px}.fx-footer-list{list-style:none;display:flex;flex-direction:column;gap:8px}.fx-footer-list a{font-size:.875rem;color:rgba(255,255,255,.6)}.fx-footer-list a:hover{color:#fff}.fx-footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:20px;text-align:center}.fx-copyright{font-size:.8125rem;color:rgba(255,255,255,.3)}.sticky-cta{position:fixed;bottom:24px;right:24px;z-index:200}.sticky-btn{display:flex;align-items:center;gap:8px;padding:12px 20px;border-radius:50px;font-size:.9375rem;font-weight:700;box-shadow:0 4px 16px rgba(0,0,0,.2)}.sticky-book{background:#2563eb;color:#fff}@media(max-width:768px){.problems-grid{grid-template-columns:1fr}.fx-footer-columns{grid-template-columns:1fr}}@media(max-width:640px){h1.page-h1{font-size:1.75rem}.sticky-cta{display:none}}</style>
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="Same-day ${s.display.toLowerCase()} in ${n.display}, Edmonton. From $65 diagnostic, 90-day warranty.">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:site_name" content="Fixlify Appliance Services">
<meta property="og:image" content="https://fixlifyservices.com/og-image.jpg">
<script type="application/ld+json">
${businessSchema}
</script>
</head>
<body>
<div id="header-placeholder"></div>
<script src="/includes/header-loader.js" defer></script>
<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="container"><a href="/">Home</a><span class="breadcrumb-sep">/</span><a href="${s.breadcrumbParent}">${s.breadcrumbParentLabel}</a><span class="breadcrumb-sep">/</span><span class="breadcrumb-current">${n.display}</span></div>
</nav>
<section class="page-hero" aria-label="Page header">
  <div class="container">
    <div class="page-hero-eyebrow">Fixlify Appliance Services &middot; ${n.display}, Edmonton</div>
    <h1 class="page-h1">${h1}</h1>
    <section class="lz-trust-block" aria-labelledby="lz-h-${slugFull}">
      <h2 id="lz-h-${slugFull}" class="lz-trust-h">Why ${n.display} residents choose Fixlify for ${s.display.toLowerCase()}</h2>
      <p class="lz-trust-intro">Our <strong>founder Alex</strong> leads 6 TSSA-licensed, insured technicians with 30+ years combined experience since 2017. Written quote, 90-day parts &amp; labour warranty on every repair.</p>
      <ul class="lz-trust-points">
        <li><strong>Same-day service</strong> when you book before 12 PM on a weekday.</li>
        <li><strong>All brands</strong> &mdash; ${s.brands(n)}.</li>
        <li><strong>${n.drive}</strong> from our Edmonton hub.</li>
      </ul>
      <form class="lz-quick-form" action="/contact" method="post" aria-label="Quick repair request">
        <p class="lz-quick-form-lead">Send a quick request &mdash; we'll respond within 30 minutes.</p>
        <label class="lz-quick-field"><span>Your name</span><input type="text" name="name" autocomplete="name" required></label>
        <label class="lz-quick-field"><span>Phone number</span><input type="tel" name="phone" autocomplete="tel" required></label>
        <label class="lz-quick-field"><span>Neighbourhood</span><input type="text" name="city" value="${n.display}, Edmonton" autocomplete="address-level2"></label>
        <label class="lz-quick-field"><span>What needs fixing?</span><textarea name="issue" rows="3" placeholder="e.g. ${s.brands(n).split(',')[0].trim()} ${s.type} not working"></textarea></label>
        <button type="submit" class="lz-quick-submit">Request a callback</button>
      </form>
    </section>
    <div class="answer-box">Fixlify provides same-day ${s.display.toLowerCase()} in ${n.display}, Edmonton. We fix all brands &mdash; ${s.brands(n)}. ${priceRangeClean} CAD typical cost, 90-day warranty. Book online or email edmonton@fixlifyservices.com.</div>
    <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="btn-secondary" target="_blank" rel="noopener">Book Online &rarr;</a></div>
  </div>
</section>
<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem 1.25rem;margin:1rem auto;max-width:900px;border-radius:0 8px 8px 0">
  <div style="font-size:.7rem;font-weight:700;letter-spacing:.08em;color:#2563eb;text-transform:uppercase;margin-bottom:.4rem">Quick Answer</div>
  <p style="margin:0;color:#1e3a5f;font-size:.9rem;line-height:1.6">Fixlify provides same-day ${s.display.toLowerCase()} in ${n.display}, Edmonton &mdash; 7 days a week. ${priceRangeClean} CAD typical cost. ${s.brands(n).split(',').slice(0, 3).join(', ')}. 90-day parts &amp; labour warranty.</p>
</div>
<div class="trust-bar"><div class="trust-bar-inner"><div class="trust-item">&#128176; $65 flat diagnostic</div><div class="trust-item">&#10003; No Hidden Fees</div><div class="trust-item">&#9873; Same-Day Service</div><div class="trust-item">&#128737; 90-Day Warranty</div></div></div>
<main class="page-main container" id="main-content">
  <div class="fade-in" style="max-width:760px;font-size:1.0625rem;color:#374151;line-height:1.75;margin-bottom:56px">
    <h2 style="font-size:1.375rem;font-weight:700;color:#0a0a0a;margin-bottom:16px">${s.display} in ${n.display} &mdash; ${n.era} ${n.region} Edmonton</h2>
    <p>Who fixes ${s.type === 'dishwasher' ? 'dishwashers' : s.type === 'washer' ? 'washers' : 'fridges'} in ${n.display}? <strong>Fixlify Appliance Services Edmonton</strong> &mdash; same-day ${s.display.toLowerCase()} throughout ${n.display} and surrounding Edmonton communities. Book online or email <a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a>. Flat <strong>$65 diagnostic</strong>, Mon&ndash;Sat 8AM&ndash;8PM, Sun 10AM&ndash;6PM Mountain Time. Typical cost: <strong>${s.priceRange} CAD</strong>. <strong>90-day warranty</strong> on every repair.</p>
    <p>${s.contentPara(n)}</p>
    <p>Our Edmonton hub at 10025 102A Avenue NW dispatches to ${n.display} in approximately ${n.drive}. ${s.hardWaterLine}</p>
  </div>
  <section style="padding:48px 0;border-top:1px solid #e5e7eb">
    <div class="section-label">Common issues</div>
    <h2 class="section-title">Common ${n.display} ${s.display} Problems</h2>
    <p style="max-width:760px;color:#374151;line-height:1.7;margin-bottom:24px">The ${s.type} faults we diagnose most frequently in ${n.display}, weighted toward the ${s.brands(n)} appliance profile.</p>
    <div class="problems-grid">
      ${problemCards}
    </div>
  </section>
  <section style="margin-top:48px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Brand expertise</div>
    <h2 class="section-title">${s.display} Brands We Service in ${n.display}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:8px;max-width:880px">${brandChips}</div>
  </section>
  <section style="margin-top:56px">
    <div class="section-label">Transparent pricing</div>
    <h2 class="section-title">${s.display} Pricing in ${n.display}</h2>
    <p style="max-width:760px;color:#374151;line-height:1.7;margin-bottom:20px">All ${n.display} repairs start with a flat <strong>$65 diagnostic</strong>, waived when you proceed with the repair. Written quote before any work begins.</p>
    <table class="pricing-table" style="max-width:760px">
      <thead><tr><th>Repair type</th><th>Typical range (parts + labour)</th></tr></thead>
      <tbody>
        ${pricingRows}
      </tbody>
    </table>
    <p style="font-size:.8125rem;color:#6b7280;margin-top:12px">All prices include parts, labour, and a <strong>90-day warranty</strong>.</p>
  </section>
  <section style="margin-top:56px;padding:32px;background:#eff6ff;border-radius:8px;border-left:4px solid #2563eb">
    <div class="section-label">${n.display} service patterns</div>
    <h2 class="section-title">What we see most on our ${n.display} ${s.type} call sheet</h2>
    <div style="max-width:840px;color:#1e40af;line-height:1.75;font-size:1rem">
      <p>${s.contentPara(n)}</p>
      <p>We keep ${n.display}-specific parts on our trucks: ${s.brands(n).split(',').slice(0, 3).join(', ')} are the most common brands we service in ${n.display}, and our technicians know the failure patterns for ${n.era} ${n.notes.toLowerCase()}. If your ${s.type} in ${n.display} needs service, book early &mdash; same-day slots fill quickly on weekday mornings.</p>
    </div>
  </section>
  <section class="fade-in" style="margin-top:56px;padding:56px 0;border-top:1px solid #e5e7eb;text-align:center">
    <div class="section-label">Online booking</div>
    <h2 style="font-size:1.75rem;font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:12px">Book ${s.display} in ${n.display}</h2>
    <p style="color:#6b7280;margin-bottom:24px">Real-time availability, instant confirmation.</p>
    <iframe id="${iframeId}" src="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce?embed=true" style="width:100%;height:600px;border:none;display:block" title="Book a Service" loading="lazy" allowtransparency="true"></iframe>
    <script>window.addEventListener('message',function(e){if(e.data&&e.data.type==='fixlify-resize'){var el=document.getElementById('${iframeId}');if(el)el.style.height=e.data.height+'px'}});<\/script>
    <p style="font-size:.9375rem;color:#6b7280;margin-top:16px">Prefer email? <a href="mailto:edmonton@fixlifyservices.com" style="color:#2563eb;font-weight:600">edmonton@fixlifyservices.com</a></p>
  </section>
  <section style="padding:56px 0;border-top:1px solid #e5e7eb">
    <h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:32px">FAQ &mdash; ${s.display} in ${n.display}</h2>
    ${faqItems}
  </section>
  <section style="margin-top:56px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Other ${n.display} services</div>
    <h2 class="section-title">Other Appliance Repair in ${n.display}</h2>
    <div class="related-grid">
      ${relatedLinks}
    </div>
  </section>
  <section style="margin-top:56px;padding:40px;background:#0a0a0a;border-radius:8px;text-align:center;color:#fff">
    <h2 style="font-size:1.75rem;font-weight:700;color:#fff;margin-bottom:12px">Ready to book ${s.display.toLowerCase()} in ${n.display}?</h2>
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
  <div class="fx-footer-cta-strip"><div class="fx-footer-cta-content"><div class="fx-footer-cta-text"><span class="fx-footer-cta-label">Edmonton Appliance Repair</span><p>Book online &mdash; ${n.display} and all Edmonton CMA.</p></div><div class="fx-footer-cta-btns"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="fx-footer-btn-book" rel="noopener">Book Online Now</a><a href="mailto:edmonton@fixlifyservices.com" class="fx-footer-btn-call">edmonton@fixlifyservices.com</a></div></div></div>
  <div class="fx-footer-columns">
    <div class="fx-footer-col fx-footer-brand"><div class="fx-footer-logo"><div class="fx-footer-logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg></div><span class="fx-footer-logo-name">Fixlify</span></div><p class="fx-footer-desc">Edmonton Appliance Repair. ${n.display} and all Edmonton CMA communities.</p><address class="fx-footer-address" style="font-style:normal;margin:14px 0">10025 102A Avenue NW, Suite 1000<br>Edmonton, AB T5J 2Z2</address><div class="fx-footer-hours"><strong>Service Hours (Mountain Time)</strong><span>Monday&ndash;Saturday: 8 AM &ndash; 8 PM</span><span>Sunday: 10 AM &ndash; 6 PM</span></div></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Services</h4><ul class="fx-footer-list"><li><a href="/services/refrigerator-repair-edmonton/">Fridge Repair Edmonton</a></li><li><a href="/services/washer-repair-edmonton/">Washer Repair Edmonton</a></li><li><a href="/services/dishwasher-repair-edmonton/">Dishwasher Repair Edmonton</a></li></ul></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Neighbourhoods</h4><ul class="fx-footer-list"><li><a href="/dishwasher-repair-${n.slug}">${n.display}</a></li><li><a href="/dishwasher-repair-castle-downs">Castle Downs</a></li><li><a href="/dishwasher-repair-edmonton">Edmonton</a></li><li><a href="/dishwasher-repair-glenora">Glenora</a></li></ul></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Quick Links</h4><ul class="fx-footer-list"><li><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" rel="noopener">Book Online</a></li><li><a href="/about/">About Us</a></li><li><a href="/sitemap.xml">Sitemap</a></li></ul><h4 class="fx-footer-heading" style="margin-top:24px">Contact</h4><ul class="fx-footer-list"><li><a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a></li></ul></div>
  </div>
  <div class="fx-footer-bottom"><p class="fx-copyright">&copy; <span id="${yrId}"></span> Fixlify Appliance Repair Edmonton | ${n.display} | Online Booking Available</p></div>
</div></footer>
<script>(function(){var el=document.getElementById('${yrId}');if(el)el.textContent=new Date().getFullYear()})();<\/script>
<div class="sticky-cta"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="sticky-btn sticky-book" target="_blank" rel="noopener">Book Online &rarr;</a></div>
<script>document.addEventListener('DOMContentLoaded',function(){var els=document.querySelectorAll('.fade-in');if('IntersectionObserver' in window){var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.1});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('visible')})}});<\/script>
</body>
</html>`;
}

let count = 0;
for (const n of neighborhoods) {
  for (const s of services) {
    const filename = `${s.type}-repair-${n.slug}.html`;
    const filepath = path.join(__dirname, filename);
    fs.writeFileSync(filepath, buildPage(n, s), 'utf8');
    console.log(`Written: ${filename}`);
    count++;
  }
}
console.log(`\nDone: ${count} pages written.`);
