// Batch 17 page generator — 9 remaining neighborhoods x 3 services
const fs = require('fs');

const neighborhoods = [
  {
    slug: 'brookside',
    name: 'Brookside',
    postalCode: 'T6J',
    region: 'SW',
    era: '1970s',
    notes: '1970s mature Riverbend area, original appliances often still in homes',
    context: `Brookside is a quiet, established Riverbend sub-neighbourhood in southwest Edmonton, developed through the mid-to-late 1970s on the west side of the North Saskatchewan River valley escarpment. The neighbourhood is bounded by Rabbit Hill Road, Terwillegar Drive, and the Whitemud ravine system, and is characterized by large single-family lots with mature tree canopy that has grown substantially since original planting 45–50 years ago. Homeowners in Brookside tend to be long-established families who have lived here since the neighbourhood was new — many of whom are now on their second or third set of major appliances but are encountering original-era Kenmore and Maytag dishwashers in basement suites or secondary kitchens. Our technicians route from the Edmonton hub at 10025 102A Avenue NW via the Whitemud Freeway to Anthony Henday Drive, reaching Brookside in approximately 22 minutes. Edmonton's EPCOR hard water at 170–200 mg/L accelerates calcium scaling in older dishwasher heating elements and spray arms, making annual descaling a critical maintenance item for 1970s-era Kenmore and Maytag units that lack modern self-cleaning cycles. We carry OEM drain pumps, heating elements, and spray arm assemblies for the most common 1970s–1990s Kenmore, Maytag, and Whirlpool models as standard truck inventory for Riverbend and Brookside calls.`,
    appliances: 'Kenmore, Maytag, and Whirlpool dishwashers from the 1970s–1990s build era, plus newer Samsung and LG installed in recent kitchen renovations',
    problems: [
      { name: 'Aging drain pump failure', desc: "Original Kenmore and Maytag drain pumps in Brookside's 1970s–80s homes wear out after 20–30 years. We carry OEM pump assemblies and perform same-day replacements on most models." },
      { name: 'Calcium-blocked spray arms', desc: "EPCOR's 170–200 mg/L hard water calcifies spray arm nozzles in older units. Thorough descaling restores wash performance in Whirlpool and Kenmore dishwashers throughout Brookside." },
      { name: 'Door latch / spring failure', desc: "Plastic door latches and torsion springs fatigue on units 15+ years old. Dishwasher won't start without a working latch signal. OEM replacement takes 30 minutes on most models." },
      { name: 'Heating element burnout', desc: 'Dishes remain wet or water is cold — heating element has failed open. Confirmed by resistance test; replacement is straightforward on Kenmore and Maytag platform dishwashers.' },
      { name: 'Samsung / LG error codes', desc: 'Newer Samsung and LG units installed in Brookside kitchen updates throw 4C, OE, and AE error codes. We diagnose water supply, drain, and motor faults same-day.' },
      { name: 'Timer / control board fault', desc: 'Older electromechanical timer-controlled dishwashers stop mid-cycle or skip stages. Timer module replacement restores full cycle function on legacy Maytag and Whirlpool units.' }
    ],
    brands: ['Kenmore', 'Maytag', 'Whirlpool', 'Samsung', 'LG', 'GE', 'Frigidaire', 'Bosch', 'KitchenAid', 'Amana', 'Inglis', 'Electrolux'],
    insightTitle: 'Older Kenmore and Maytag units common across Brookside homes',
    insight: `Brookside was built primarily in the mid-1970s, meaning a significant portion of original kitchen appliances have already been replaced once — but many homes are now on their second-generation appliances that are themselves approaching the 15–20 year mark. We regularly service 1990s–2000s Kenmore and Whirlpool dishwashers in Brookside that are failing for the first time, alongside households that retained original 1970s Maytag units in basement or secondary kitchens. Our most common Brookside calls involve drain pump failures on Kenmore Series 600 and 700 dishwashers, and heating element burnout on Maytag Quiet Series 300 units. Both repairs are typically same-day from our Whitemud-area stock. For homes that have recently renovated and installed Samsung or LG, we carry water inlet valves, drain pump assemblies, and door latch switches for 4C and OE error code resolution.`,
    relatedLinks: [
      { href: '/washer-repair-brookside', text: 'Washer Repair — Brookside' },
      { href: '/fridge-repair-brookside', text: 'Fridge Repair — Brookside' },
      { href: '/dishwasher-repair-riverbend', text: 'Dishwasher Repair — Riverbend' },
      { href: '/dishwasher-repair-brander-gardens', text: 'Dishwasher Repair — Brander Gardens' },
      { href: '/dishwasher-repair-twin-brooks', text: 'Dishwasher Repair — Twin Brooks' },
      { href: '/dishwasher-repair-edmonton', text: 'Dishwasher Repair — Edmonton' }
    ]
  },
  {
    slug: 'bulyea-heights',
    name: 'Bulyea Heights',
    postalCode: 'T6R',
    region: 'SW',
    era: '1980s',
    notes: '1980s upscale Riverbend, family homes — fridge and dishwasher repairs common',
    context: `Bulyea Heights is an upscale Riverbend sub-neighbourhood in southwest Edmonton, developed through the 1980s on the ridge above the North Saskatchewan River valley. The neighbourhood features large family homes on generous lots, many with fully equipped gourmet kitchens that were outfitted with premium appliances when the homes were built or subsequently renovated. Bulyea Heights is bounded by Rabbit Hill Road and the Whitemud ravine to the north and west, with Terwillegar Drive forming the eastern boundary. Our technicians dispatch from the Edmonton hub at 10025 102A Avenue NW and reach Bulyea Heights in approximately 20 minutes via the Whitemud Freeway. The 1980s build era means most original dishwashers — primarily Kenmore, Maytag, and early Whirlpool — are now 35–40 years old and have been replaced at least once. The current appliance generation in Bulyea Heights homes is predominantly 2000s–2010s models that are now entering their peak failure window. Edmonton's EPCOR water at 170–200 mg/L hardness accelerates scaling in these units, particularly affecting circulation pumps and heating elements in Whirlpool Gold and KitchenAid dishwashers, which are prevalent in the upscale Bulyea Heights market.`,
    appliances: 'KitchenAid, Whirlpool Gold, Bosch, and Samsung dishwashers from the 2000s–2010s renovation cycle, with some original 1980s Kenmore units still in service',
    problems: [
      { name: 'Whirlpool Gold / KitchenAid pump failure', desc: "Whirlpool Gold and KitchenAid dishwashers in Bulyea Heights 1980s homes are 15–20 years old. Circulation and drain pump failures are the leading repair call. OEM pump assemblies on the truck for same-day service." },
      { name: 'Hard water scaling — EPCOR 170–200 mg/L', desc: "Edmonton's hard water deposits calcium in spray arm nozzles and heating elements. Upscale dishwashers in Bulyea Heights — KitchenAid, Bosch 500 series — show scaling-related performance loss by year 8–12." },
      { name: 'Bosch E24 drain fault', desc: 'E24 drain fault on Bosch 500/800 series is common in Bulyea Heights homes with upgraded kitchens. We diagnose drain pump failure vs. check valve blockage vs. hose kink and fix same-day.' },
      { name: 'Door latch and seal wear', desc: 'Door latches and door seals wear out on 15–20 year old dishwashers, causing leaks or failure to start. We carry latch kits and door seal gaskets for KitchenAid, Whirlpool, and Bosch platforms.' },
      { name: 'Samsung dishwasher error codes', desc: '4E, 5E, and OE error codes on Samsung units installed in Bulyea Heights renovations indicate water supply, drain, and overflow faults. We diagnose and repair these efficiently with same-day parts.' },
      { name: 'Control board failure', desc: 'Electronic control panels on KitchenAid and Bosch dishwashers fail with age, causing unresponsive controls or stuck cycles. We source genuine replacement boards with full 90-day warranty coverage.' }
    ],
    brands: ['KitchenAid', 'Whirlpool', 'Bosch', 'Samsung', 'LG', 'GE', 'Kenmore', 'Maytag', 'Frigidaire', 'Electrolux', 'Miele', 'Fisher & Paykel'],
    insightTitle: 'KitchenAid and Bosch dominate Bulyea Heights repair calls',
    insight: `Bulyea Heights sits in the sweet spot of Edmonton's appliance repair demand curve: the neighbourhood is affluent enough to have installed premium dishwashers during 2000s–2010s kitchen renovations, and those appliances are now 15–20 years old — precisely when pump failures, control board issues, and seal degradation become common. KitchenAid KDTE Series and Bosch 500 Series dishwashers are the two most prevalent platforms on our Bulyea Heights call sheet. KitchenAid units in this era commonly develop drain pump motor failures and wash arm bearing wear; Bosch units show E15 anti-flood triggers from door seal degradation and E24 drain faults from pump impeller wear. In both cases, EPCOR's 170–200 mg/L hard water accelerates component wear, particularly on heating elements and circulation pump seals that were designed for softer water. We advise Bulyea Heights homeowners running Bosch units to check and replenish rinse aid regularly and consider a water softener installation to extend dishwasher service life in Edmonton's hard water environment.`,
    relatedLinks: [
      { href: '/washer-repair-bulyea-heights', text: 'Washer Repair — Bulyea Heights' },
      { href: '/fridge-repair-bulyea-heights', text: 'Fridge Repair — Bulyea Heights' },
      { href: '/dishwasher-repair-riverbend', text: 'Dishwasher Repair — Riverbend' },
      { href: '/dishwasher-repair-rhatigan-ridge', text: 'Dishwasher Repair — Rhatigan Ridge' },
      { href: '/dishwasher-repair-brander-gardens', text: 'Dishwasher Repair — Brander Gardens' },
      { href: '/dishwasher-repair-edmonton', text: 'Dishwasher Repair — Edmonton' }
    ]
  },
  {
    slug: 'carter-crest',
    name: 'Carter Crest',
    postalCode: 'T6R',
    region: 'SW',
    era: '1990s',
    notes: '1990s upscale Riverbend, premium appliances, full kitchens',
    context: `Carter Crest is a prestigious 1990s Riverbend sub-neighbourhood in southwest Edmonton, built on the rolling terrain above the North Saskatchewan River valley escarpment. Developed primarily between 1992 and 2002, Carter Crest features large estate homes with high-end kitchen fitouts — many with premium dishwashers like Bosch, KitchenAid, and early Miele installations. The neighbourhood is situated between Rabbit Hill Road and the Whitemud Freeway, bordered by Terwillegar Drive and the Whitemud Creek ravine system. Our technicians reach Carter Crest in approximately 20–22 minutes from the Edmonton hub at 10025 102A Avenue NW via the Whitemud Freeway and Rabbit Hill Road. Carter Crest's 1990s build era positions it at a critical point in the appliance lifecycle: dishwashers installed during construction or in early renovations are now 25–30 years old and showing significant wear, while appliances replaced during mid-2000s kitchen updates are hitting the 15–20 year failure window. Edmonton's EPCOR water supply at 170–200 mg/L hardness is a compounding factor for Carter Crest's premium Bosch and KitchenAid dishwashers, with calcium scaling in circulation pumps and spray arm nozzles becoming visible on most units that haven't had regular professional maintenance.`,
    appliances: 'Bosch, KitchenAid, Maytag, and Whirlpool dishwashers from the 1990s–2000s era, with a growing share of newer Samsung and LG in recent renovations',
    problems: [
      { name: 'Bosch circulation pump wear', desc: "1990s–2000s Bosch dishwashers in Carter Crest homes are hitting the 20–25 year mark. Circulation pump wear presents as poor wash performance and high noise. OEM Bosch pump assemblies on the truck for same-day service." },
      { name: 'KitchenAid control board failure', desc: 'KitchenAid dishwashers from the 1990s–2000s develop control board failures — unresponsive touchpads, stuck cycles, and error beeps. We source genuine KitchenAid boards and install with 90-day warranty.' },
      { name: 'Hard water scaling in premium units', desc: "EPCOR's hard water at 170–200 mg/L accelerates calcium buildup in Bosch and KitchenAid spray arm nozzles and heating elements. Carter Crest homes with 10+ year old units should schedule professional descaling." },
      { name: 'Door seal degradation and leaking', desc: "Door gaskets harden and crack on dishwashers after 15+ years — water pools under the unit during cycles. Genuine door seal replacement is a same-day repair for most Carter Crest dishwasher brands." },
      { name: 'Detergent dispenser spring failure', desc: 'The detergent dispenser door spring fatigues on 20+ year old units. The dispenser fails to open during the wash cycle, leaving detergent residue on dishes. Standard repair on Maytag and Whirlpool platforms.' },
      { name: 'Samsung / LG newer units', desc: 'Recently renovated Carter Crest kitchens with Samsung or LG dishwashers experience 4C water inlet and OE drain faults. We carry water inlet valves and drain assemblies for same-day resolution.' }
    ],
    brands: ['Bosch', 'KitchenAid', 'Whirlpool', 'Maytag', 'Samsung', 'LG', 'Kenmore', 'GE', 'Frigidaire', 'Miele', 'Electrolux', 'Amana'],
    insightTitle: 'Bosch and KitchenAid units at the 20–25 year repair inflection point',
    insight: `Carter Crest was developed during Edmonton's prosperous late-1990s growth phase, and the neighbourhood's upscale kitchen profile reflects that era. Bosch and KitchenAid dishwashers installed between 1995 and 2005 are now at 20–30 years of service — an age at which circulation pump bearings, control board capacitors, and door latch springs commonly fail simultaneously. We approach Carter Crest repair calls knowing that a single component fix may reveal a secondary issue during the diagnostic, and we communicate this transparently to homeowners. For units where repair costs exceed 60% of a new dishwasher's value, we provide an honest recommendation. Edmonton's EPCOR hard water at 170–200 mg/L is a consistent theme in Carter Crest service calls: calcium accumulation in the wash arm hub, the heating element sheath, and the water inlet screen are present on virtually every unit older than 12 years that we inspect. We clean these components during every repair visit as a standard service, extending the post-repair service life regardless of the presenting fault.`,
    relatedLinks: [
      { href: '/washer-repair-carter-crest', text: 'Washer Repair — Carter Crest' },
      { href: '/fridge-repair-carter-crest', text: 'Fridge Repair — Carter Crest' },
      { href: '/dishwasher-repair-riverbend', text: 'Dishwasher Repair — Riverbend' },
      { href: '/dishwasher-repair-rhatigan-ridge', text: 'Dishwasher Repair — Rhatigan Ridge' },
      { href: '/dishwasher-repair-terwillegar', text: 'Dishwasher Repair — Terwillegar' },
      { href: '/dishwasher-repair-edmonton', text: 'Dishwasher Repair — Edmonton' }
    ]
  },
  {
    slug: 'henderson-estates',
    name: 'Henderson Estates',
    postalCode: 'T6R',
    region: 'SW',
    era: '1980s–1990s',
    notes: '1980s-90s estate homes, high-end built-in appliances',
    context: `Henderson Estates is an exclusive Riverbend sub-neighbourhood in southwest Edmonton, positioned along the North Saskatchewan River valley bluff with large estate lots developed primarily through the late 1980s and early 1990s. With fewer than 2,000 residents across its generous lots, Henderson Estates is one of Edmonton's smallest and most prestigious neighbourhoods — characterized by custom-built homes, mature landscaping, and high-end kitchen fitouts featuring built-in appliance suites from Sub-Zero, Wolf, Miele, and integrated Bosch or Fisher & Paykel. Our technicians reach Henderson Estates in approximately 22 minutes from the Edmonton hub at 10025 102A Avenue NW via the Whitemud Freeway and Rabbit Hill Road. The neighbourhood's estate home profile means appliance repair calls often involve complex built-in installations where the dishwasher is panel-mounted and integrated into custom cabinetry — requiring careful panel removal and reinstallation techniques that our technicians are trained to perform without damaging bespoke millwork. EPCOR's hard water at 170–200 mg/L is a recurring issue in Henderson Estates: Miele and Bosch dishwashers installed in these kitchens are among the most sensitive to calcium scaling, and many homeowners are not aware that Edmonton's water hardness requires active soft water salt management even in dishwashers with built-in water conditioning systems.`,
    appliances: 'Sub-Zero, Wolf, Miele, integrated Bosch, Fisher & Paykel, and Gaggenau dishwashers in custom built-in installations',
    problems: [
      { name: 'Integrated panel-ready installation issues', desc: 'Custom panel-mounted dishwashers in Henderson Estates estate kitchens can suffer hinge misalignment, panel bracket failure, and door balance issues after 10–15 years. We realign and repair without damaging custom cabinetry.' },
      { name: 'Miele F78 circulation pump fault', desc: 'The F78 error on Miele G-series indicates circulation pump failure or obstruction. Estate home Miele units in Henderson Estates commonly develop this fault at 8–15 years due to hard water scaling in the pump seal.' },
      { name: 'Hard water softener calibration', desc: "EPCOR hard water at 170–200 mg/L requires precise salt dosage in Miele and Bosch built-in water softeners. Incorrect calibration leads to calcium buildup throughout the wash system. We recalibrate for Edmonton's specific water chemistry." },
      { name: 'Bosch E15 anti-flood trigger', desc: 'Water collects in the base pan and triggers the anti-flood float, locking the dishwasher in drain mode. Common in 10–15 year old Bosch 800 series in Henderson Estates renovations. We clear the base and repair the root cause.' },
      { name: 'Fisher & Paykel drawer fault', desc: 'Fisher & Paykel DishDrawer units common in Henderson Estates develop drawer slide wear and electronic faults. We carry Fisher & Paykel parts and perform same-day service on single and double drawer configurations.' },
      { name: 'Control board and display module', desc: 'High-end dishwasher control systems are sophisticated and expensive to replace. We source genuine OEM control boards for Miele, Bosch, and Fisher & Paykel with the same 90-day warranty applied to all repairs.' }
    ],
    brands: ['Miele', 'Bosch', 'Sub-Zero', 'Fisher & Paykel', 'Gaggenau', 'Wolf', 'KitchenAid', 'Whirlpool', 'Samsung', 'Electrolux', 'LG', 'GE'],
    insightTitle: 'Premium integrated dishwasher specialists for Henderson Estates estate homes',
    insight: `Henderson Estates represents the top tier of Edmonton's residential appliance repair market. Estate homes in this neighbourhood routinely feature $5,000–$12,000 built-in dishwasher installations — Miele G7000 Series, Bosch 800 Series panel-ready, and Fisher & Paykel DishDrawer double configurations. These appliances require technicians who understand both the technical service requirements and the practical challenges of working in custom-built kitchen environments without damaging bespoke cabinetry or millwork. Our team has extensive experience with integrated panel-ready appliance service in Edmonton's high-end residential neighbourhoods, including Henderson Estates, Windsor Park, and Glenora. EPCOR's 170–200 mg/L hard water remains the number-one issue we encounter across all premium brands in Henderson Estates: Miele's internal ion exchange water softener works well when calibrated and supplied with salt, but many homeowners set the hardness level at installation and never revisit it, leading to progressive calcium accumulation that silently degrades wash performance and eventually triggers error codes after 5–10 years. We test water hardness on every visit to these premium accounts and provide a recalibration as part of the service call.`,
    relatedLinks: [
      { href: '/washer-repair-henderson-estates', text: 'Washer Repair — Henderson Estates' },
      { href: '/fridge-repair-henderson-estates', text: 'Fridge Repair — Henderson Estates' },
      { href: '/dishwasher-repair-riverbend', text: 'Dishwasher Repair — Riverbend' },
      { href: '/dishwasher-repair-windsor-park', text: 'Dishwasher Repair — Windsor Park' },
      { href: '/dishwasher-repair-glenora', text: 'Dishwasher Repair — Glenora' },
      { href: '/dishwasher-repair-edmonton', text: 'Dishwasher Repair — Edmonton' }
    ]
  },
  {
    slug: 'ramsay-heights',
    name: 'Ramsay Heights',
    postalCode: 'T6R',
    region: 'SW',
    era: '1980s',
    notes: '1980s upscale Riverbend, family demographic',
    context: `Ramsay Heights is a well-established Riverbend sub-neighbourhood in southwest Edmonton, developed through the 1980s as part of the Riverbend master-planned community southwest of the North Saskatchewan River valley. The neighbourhood features mature single-family homes on generous lots, with the characteristic Riverbend combination of large landscaped yards and upscale kitchen configurations. Ramsay Heights is bounded by the Whitemud Creek ravine and the broader Riverbend greenbelt system, giving it a quiet, nature-adjacent feel that has made it a perennial favourite for Edmonton families. Our technicians reach Ramsay Heights in approximately 20–22 minutes from the Edmonton hub at 10025 102A Avenue NW via the Whitemud Freeway and Rabbit Hill Road. The 1980s build era means original appliances have been replaced, typically with 1990s–2000s Kenmore, Maytag, or Whirlpool dishwashers that are now 20–30 years old and in the peak failure window. Edmonton's EPCOR water at 170–200 mg/L accelerates wear on these older units, with calcium accumulation in heating elements and drain pump impellers a persistent issue across Ramsay Heights homes.`,
    appliances: 'Kenmore, Maytag, Whirlpool, and KitchenAid dishwashers from 1990s–2000s replacement cycles, plus newer Samsung and LG in recent kitchen updates',
    problems: [
      { name: 'Drain pump and impeller wear', desc: "1990s–2000s Kenmore and Maytag dishwashers in Ramsay Heights are showing drain pump and impeller wear. Standing water after a cycle is the telltale sign. OEM pump assemblies on the truck for same-day replacement." },
      { name: 'Hard water calcium in heating element', desc: "EPCOR's 170–200 mg/L hard water deposits calcium on heating element sheaths in older units, causing overheating and eventual burnout. We replace elements and advise on descaling schedules for Ramsay Heights homes." },
      { name: 'Door latch and hinge failure', desc: 'Torsion springs and plastic latch bodies crack on dishwashers after 20+ years. Dishwashers fail to start when the latch switch does not engage. OEM latch kits are a 30-minute replacement on most Kenmore and Maytag models.' },
      { name: 'Whirlpool wash motor noise', desc: 'Whirlpool and Maytag wash motors in Ramsay Heights homes develop bearing noise and reduced pressure after 20+ years. Motor replacement or full pump assembly swap restores quiet, effective wash performance.' },
      { name: 'Samsung 4C and OE error codes', desc: 'Newer Samsung dishwashers installed in Ramsay Heights kitchen renovations display 4C (water supply) and OE (drain) error codes. We diagnose inlet valve faults and drain pump failures same-day.' },
      { name: 'Detergent dispenser failure', desc: 'Spring-loaded dispenser doors fail to open on 20+ year old units. Detergent sits undissolved in the tray, leaving residue on dishes. Replacement dispenser assemblies fit most Kenmore and Whirlpool platforms.' }
    ],
    brands: ['Kenmore', 'Maytag', 'Whirlpool', 'KitchenAid', 'Samsung', 'LG', 'GE', 'Frigidaire', 'Bosch', 'Amana', 'Inglis', 'Electrolux'],
    insightTitle: 'Kenmore and Maytag replacement cycle driving Ramsay Heights repair demand',
    insight: `Ramsay Heights sits squarely in the appliance replacement-cycle window that drives the highest repair demand across Edmonton's 1980s Riverbend subdivisions. Homes built in the 1982–1990 period went through their first appliance replacement in the late 1990s to early 2000s — and those replacement dishwashers are now 20–25 years old and failing. The most common Ramsay Heights scenario: a Kenmore Series 500 or Maytag Quiet Plus dishwasher from approximately 2000–2005, now showing drain pump failure, heating element burnout, or door latch fatigue. All three are straightforward repairs with OEM parts that we carry on our SW Edmonton trucks. Edmonton's EPCOR hard water at 170–200 mg/L has been silently accumulating calcium in these units for two decades, and we find scale deposits on heating elements, spray arm nozzle apertures, and drain pump impellers as a standard finding during Ramsay Heights diagnostics — we address these as part of every repair visit to maximize post-repair service life.`,
    relatedLinks: [
      { href: '/washer-repair-ramsay-heights', text: 'Washer Repair — Ramsay Heights' },
      { href: '/fridge-repair-ramsay-heights', text: 'Fridge Repair — Ramsay Heights' },
      { href: '/dishwasher-repair-riverbend', text: 'Dishwasher Repair — Riverbend' },
      { href: '/dishwasher-repair-rhatigan-ridge', text: 'Dishwasher Repair — Rhatigan Ridge' },
      { href: '/dishwasher-repair-brander-gardens', text: 'Dishwasher Repair — Brander Gardens' },
      { href: '/dishwasher-repair-edmonton', text: 'Dishwasher Repair — Edmonton' }
    ]
  },
  {
    slug: 'haddow',
    name: 'Haddow',
    postalCode: 'T6R',
    region: 'SW',
    era: '1990s',
    notes: '1990s family neighbourhood, dishwasher/fridge demand peak',
    context: `Haddow is a 1990s family neighbourhood in the Terwillegar area of southwest Edmonton, developed between approximately 1992 and 2002 as part of the broader Terwillegar residential expansion south of the Whitemud Freeway. The neighbourhood features mid-to-upper range single-family homes catering to families attracted by the area's proximity to the South Edmonton Common, Terwillegar Community Recreation Centre, and strong school catchments. Haddow is bounded by 23rd Avenue to the north, 119th Street to the east, and Anthony Henday Drive to the south, with the Haddow Ravine greenway providing natural separation from adjacent sub-neighbourhoods. Our technicians reach Haddow in approximately 18–22 minutes from the Edmonton hub at 10025 102A Avenue NW via the Whitemud Freeway and Anthony Henday Drive. Haddow's 1990s build era places most original dishwashers — Kenmore, Maytag, and Whirlpool — at 25–30 years of age, firmly in the peak failure window. Edmonton's EPCOR municipal water at 170–200 mg/L accelerates the calcium scaling that compounds natural component wear in this age cohort of appliances, particularly in drain pump impellers and spray arm nozzle apertures.`,
    appliances: 'Kenmore, Maytag, Whirlpool, and Bosch dishwashers from the 1992–2005 era, with newer Samsung and LG in kitchen renovations',
    problems: [
      { name: 'Not draining / standing water', desc: "Drain pump failure or worn impeller — extremely common in 1990s–2000s Kenmore and Maytag units in Haddow. We carry OEM pump assemblies for same-day repair on the most common platforms." },
      { name: 'Hard water blocking spray nozzles', desc: "EPCOR's 170–200 mg/L hard water calcifies spray arm apertures in Haddow dishwashers after 8–12 years without descaling. We clean and test all spray arms during every service visit." },
      { name: 'Heating element failure', desc: "Dishes come out wet and water stays cool — the heating element has failed. Resistance test confirms open circuit. Same-day heating element replacement on most 1990s–2000s Kenmore, Maytag, and Whirlpool models." },
      { name: 'Door latch and spring assembly', desc: '1990s dishwashers develop door latch fatigue at 25+ years. Cracked latch housing or broken torsion spring prevents the dishwasher from starting. OEM latch kits replace in under 30 minutes on most models.' },
      { name: 'Bosch 500 series E24 drain fault', desc: "Bosch 500 series dishwashers installed in Haddow's renovated kitchens develop E24 drain faults from pump impeller wear or check valve blockage. We diagnose and fix same-day with Bosch-compatible parts." },
      { name: 'Samsung / LG water supply error', desc: 'Samsung 4C and LG IE error codes indicate water inlet valve failures or supply pressure issues. We diagnose the root cause and replace water inlet valves same-day on Samsung and LG platforms.' }
    ],
    brands: ['Kenmore', 'Maytag', 'Whirlpool', 'Bosch', 'Samsung', 'LG', 'KitchenAid', 'GE', 'Frigidaire', 'Electrolux', 'Amana', 'Inglis'],
    insightTitle: 'Haddow dishwashers hitting 25–30 year failure window simultaneously',
    insight: `Haddow's 1990s build era creates a concentrated repair demand wave as multiple appliance cohorts reach end-of-life simultaneously. Homes built between 1992 and 2002 had dishwashers installed at construction — Kenmore, Maytag, and Whirlpool models that are now 23–33 years old. Many were replaced in the 2005–2010 period with second-generation units that are themselves now 15–20 years old. This means Haddow has an unusually high density of dishwashers in the 15–30 year age range, all subject to Edmonton's EPCOR hard water at 170–200 mg/L which accelerates calcium accumulation in pump seals, spray arm nozzles, and heating element sheaths. Our most common Haddow repair calls: drain pump replacement on Kenmore Series 600 and 700 dishwashers ($180–$260), heating element burnout on Maytag Quiet Series ($150–$220), and Bosch E24 drain pump replacement on renovated kitchen Bosch 500 Series ($180–$280). We carry the parts for all three repairs as standard truck inventory for Terwillegar-area routes.`,
    relatedLinks: [
      { href: '/washer-repair-haddow', text: 'Washer Repair — Haddow' },
      { href: '/fridge-repair-haddow', text: 'Fridge Repair — Haddow' },
      { href: '/dishwasher-repair-terwillegar', text: 'Dishwasher Repair — Terwillegar' },
      { href: '/dishwasher-repair-leger', text: 'Dishwasher Repair — Leger' },
      { href: '/dishwasher-repair-rutherford', text: 'Dishwasher Repair — Rutherford' },
      { href: '/dishwasher-repair-edmonton', text: 'Dishwasher Repair — Edmonton' }
    ]
  },
  {
    slug: 'leger',
    name: 'Leger',
    postalCode: 'T6R',
    region: 'SW',
    era: '1990s',
    notes: '1990s family suburb, washer/dryer aging out',
    context: `Leger is a 1990s family neighbourhood in the Terwillegar area of southwest Edmonton, developed between approximately 1993 and 2005 as part of the major residential expansion south of the Whitemud Freeway. The neighbourhood features attractive single-family homes on mid-sized lots, catering to families drawn by excellent park and greenway access, proximity to Terwillegar Community Recreation Centre, and strong school catchments. Leger is situated between 23rd Avenue and Anthony Henday Drive, with mature tree canopy lining the crescent streets that characterize its curvilinear street plan. Our technicians dispatch from the Edmonton hub at 10025 102A Avenue NW and reach Leger in approximately 20 minutes via the Whitemud Freeway and Anthony Henday Drive. Leger's 1990s build era positions the neighbourhood's original dishwashers — Kenmore, Maytag, Whirlpool — at 25–32 years of service, firmly in the high-probability failure zone. EPCOR's Edmonton water supply at 170–200 mg/L hardness has been depositing calcium in these units throughout their service lives, compounding natural wear in drain pumps, heating elements, and spray arm assemblies that drives Leger's above-average dishwasher repair call volume.`,
    appliances: 'Kenmore, Maytag, Whirlpool, and KitchenAid dishwashers from the 1993–2005 era, with Samsung and LG in recent kitchen updates',
    problems: [
      { name: 'Maytag / Kenmore drain pump failure', desc: "1990s Maytag and Kenmore dishwashers in Leger are now 25–30 years old and developing drain pump failures — the most common presenting fault in this appliance cohort. OEM pump assemblies on the truck for same-day replacement." },
      { name: 'Spray arm calcification — EPCOR hard water', desc: "EPCOR's 170–200 mg/L hard water calcifies spray nozzles in older Leger dishwashers after 8–12 years without professional descaling. We clean and test all spray arms and recommend annual descaling for units over 10 years old." },
      { name: 'Heating element burnout', desc: "Dishes come out wet, water not heating — the heating element has failed open. Common in 15–25 year old Maytag and Whirlpool units in Leger. Resistance test confirms fault; replacement is same-day with standard parts." },
      { name: 'Door latch assembly fatigue', desc: 'Plastic door latch housings crack and torsion springs snap on dishwashers over 20 years old. Dishwasher will not start without a working latch signal. OEM latch kit replacement takes 30 minutes on most models.' },
      { name: 'KitchenAid wash motor bearing noise', desc: 'KitchenAid dishwashers installed in Leger kitchen renovations develop wash motor bearing noise and reduced circulation pressure after 15+ years. Motor or full pump assembly replacement restores quiet, effective operation.' },
      { name: 'Samsung 5E / OE drain error', desc: '5E and OE drain error codes on Samsung units in recently renovated Leger kitchens indicate drain pump failure or check valve blockage. We diagnose and repair same-day with Samsung-compatible OEM parts.' }
    ],
    brands: ['Kenmore', 'Maytag', 'Whirlpool', 'KitchenAid', 'Samsung', 'LG', 'GE', 'Frigidaire', 'Bosch', 'Amana', 'Inglis', 'Electrolux'],
    insightTitle: 'Peak repair demand as Leger\'s 1990s dishwashers hit 25–30 years',
    insight: `Leger's 1990s construction creates the same concentrated appliance failure pattern we see across the Terwillegar sub-neighbourhoods. Original dishwashers installed between 1993 and 2005 are reaching 20–32 years of service — a range that encompasses peak failure probability for drain pumps, heating elements, and door latch assemblies. Unlike newer suburbs where appliances are more uniform in brand and age, Leger has a mix of original-era Kenmore/Maytag units alongside 2005–2010 replacement-era KitchenAid and Bosch dishwashers, creating two distinct repair cohorts. EPCOR's 170–200 mg/L hard water affects both: older units accumulate calcium in pump impellers and heating elements; newer units develop spray arm scaling and Bosch E24 drain faults accelerated by mineral buildup in the check valve. We carry parts for both cohorts as standard inventory on our SW Edmonton trucks, enabling same-day service for the vast majority of Leger dishwasher repair calls without a return visit for parts.`,
    relatedLinks: [
      { href: '/washer-repair-leger', text: 'Washer Repair — Leger' },
      { href: '/fridge-repair-leger', text: 'Fridge Repair — Leger' },
      { href: '/dishwasher-repair-terwillegar', text: 'Dishwasher Repair — Terwillegar' },
      { href: '/dishwasher-repair-haddow', text: 'Dishwasher Repair — Haddow' },
      { href: '/dishwasher-repair-rutherford', text: 'Dishwasher Repair — Rutherford' },
      { href: '/dishwasher-repair-edmonton', text: 'Dishwasher Repair — Edmonton' }
    ]
  },
  {
    slug: 'magrath-heights',
    name: 'Magrath Heights',
    postalCode: 'T6R',
    region: 'SW',
    era: '2000s',
    notes: '2000s upscale, premium appliance repair market',
    context: `Magrath Heights is a prestigious 2000s neighbourhood in southwest Edmonton, developed between approximately 2002 and 2014 as an upscale residential community positioned on the plateau above the North Saskatchewan River valley. Magrath Heights features large, custom-influenced homes on spacious lots with panoramic river valley views, attracting executive and professional families who have invested significantly in high-end kitchen fitouts. The neighbourhood's premier position in the Haddow/Magrath Heights community area places it adjacent to major amenities including the Terwillegar Community Recreation Centre and the Whitemud creek ravine system. Our technicians reach Magrath Heights in approximately 22–25 minutes from the Edmonton hub at 10025 102A Avenue NW via the Whitemud Freeway and Anthony Henday Drive. Magrath Heights' 2000s build era means original dishwashers — predominantly Bosch, KitchenAid, and Whirlpool Gold installed during high-end kitchen buildouts — are now 15–20 years old and entering the peak failure window. Edmonton's EPCOR hard water at 170–200 mg/L is particularly relevant for the Bosch 800 Series and KitchenAid KDTE Series dishwashers common in Magrath Heights, where calcium scaling in the circulation pump and spray arm system is the leading cause of reduced wash performance over time.`,
    appliances: 'Bosch 800 Series, KitchenAid KDTE Series, Miele, Whirlpool Gold, and Sub-Zero integrated dishwashers from 2002–2014 kitchen buildouts',
    problems: [
      { name: 'Bosch 800 series E15 / E24 faults', desc: "E15 (water in base) and E24 (drain fault) are the leading Bosch failures in Magrath Heights' 15–20 year old units. E15 requires removing base panel, draining standing water, and identifying the leak source. E24 needs drain pump or check valve service." },
      { name: 'KitchenAid KDTE circulation pump wear', desc: "KitchenAid KDTE Series dishwashers in Magrath Heights from the mid-2000s develop circulation pump bearing wear at 15+ years, presenting as high noise and poor wash results. OEM pump assembly replacement restores full performance." },
      { name: 'Hard water management — Miele and Bosch', desc: "EPCOR hard water at 170–200 mg/L requires active management in Magrath Heights' premium dishwashers. Miele's ion exchange softener needs regular salt and calibration; Bosch requires rinse aid optimization. We test and calibrate both systems on every visit." },
      { name: 'Panel-ready door alignment', desc: 'Custom panel-mounted dishwashers in Magrath Heights estate kitchens develop hinge fatigue and panel bracket wear over 15+ years, causing panel sag or gap. We realign panels and replace worn hinges without disturbing custom cabinetry.' },
      { name: 'Control board failure in premium units', desc: 'Bosch and KitchenAid control boards from the 2005–2010 era develop capacitor failures causing erratic operation or display lockups. We source genuine OEM replacement boards and install with 90-day warranty.' },
      { name: 'Spray arm scale buildup', desc: "Calcium deposits from EPCOR's 170–200 mg/L water block spray arm nozzles in all brands. Premium dishwashers in Magrath Heights that haven't been professionally descaled in 5+ years show noticeably reduced cleaning performance." }
    ],
    brands: ['Bosch', 'KitchenAid', 'Miele', 'Whirlpool', 'Sub-Zero', 'Samsung', 'LG', 'GE', 'Electrolux', 'Fisher & Paykel', 'Frigidaire', 'Amana'],
    insightTitle: 'Premium 2000s dishwashers at peak failure age in Magrath Heights',
    insight: `Magrath Heights represents a concentrated premium repair market — a neighbourhood built in the 2000s with high-end appliances that are now 15–22 years old and entering the period of highest failure probability for circulation pumps, control boards, and door seal assemblies. Bosch 800 Series and KitchenAid KDTE Series are the two dominant platforms on our Magrath Heights call sheet. Both were installed in 2005–2012 timeframe kitchen buildouts and are now showing predictable wear patterns: Bosch developing E15/E24 faults as drain pump seals deteriorate and anti-flood float switches age; KitchenAid showing wash motor bearing noise and reduced circulation pressure as pump bearings wear. EPCOR's 170–200 mg/L hard water is a consistent compounding factor in Magrath Heights — we find calcium accumulation in spray arm hubs, circulation pump inlets, and heating element sheaths on virtually every unit over 10 years old that hasn't had professional maintenance. Addressing the hard water aspect during repair visits extends post-repair service life significantly for Magrath Heights' premium dishwasher inventory.`,
    relatedLinks: [
      { href: '/washer-repair-magrath-heights', text: 'Washer Repair — Magrath Heights' },
      { href: '/fridge-repair-magrath-heights', text: 'Fridge Repair — Magrath Heights' },
      { href: '/dishwasher-repair-terwillegar', text: 'Dishwasher Repair — Terwillegar' },
      { href: '/dishwasher-repair-haddow', text: 'Dishwasher Repair — Haddow' },
      { href: '/dishwasher-repair-windermere', text: 'Dishwasher Repair — Windermere' },
      { href: '/dishwasher-repair-edmonton', text: 'Dishwasher Repair — Edmonton' }
    ]
  },
  {
    slug: 'mactaggart',
    name: 'MacTaggart',
    postalCode: 'T6R',
    region: 'SW',
    era: '2000s',
    notes: '2000s estate area, high-end built-in appliance servicing',
    context: `MacTaggart is an upscale 2000s neighbourhood in the Terwillegar area of southwest Edmonton, developed between approximately 2003 and 2015 as one of the region's premier estate residential communities. The neighbourhood features large executive homes with premium kitchen fitouts, situated adjacent to the MacTaggart Sanctuary — a 66-hectare natural area with ponds and wetlands that provides a peaceful natural backdrop to the neighbourhood's estate lots. MacTaggart is bounded by Anthony Henday Drive to the south and Terwillegar Drive to the east, with Rabbit Hill Road serving the western edge. Our technicians reach MacTaggart in approximately 22–25 minutes from the Edmonton hub at 10025 102A Avenue NW via the Whitemud Freeway and Anthony Henday Drive. MacTaggart's estate homes were built with high-end integrated kitchen suites featuring Bosch, Miele, Sub-Zero, and Wolf appliances — many of which are now 12–22 years old and entering or approaching their peak failure windows. Edmonton's EPCOR hard water at 170–200 mg/L is the key environmental factor driving accelerated wear in these premium appliances, particularly in Miele and Bosch units where circulation pump seals and spray arm nozzles are most sensitive to mineral accumulation.`,
    appliances: 'Bosch, Miele, Sub-Zero, Wolf, Fisher & Paykel, and integrated KitchenAid dishwashers from 2003–2015 estate kitchen buildouts',
    problems: [
      { name: 'Miele G-series error codes', desc: "Miele G-series dishwashers in MacTaggart estate homes develop F11 (drain), F14 (intake), and F78 (circulation) error codes as they age past 10–15 years. We carry Miele-compatible parts and diagnose and repair all G-series faults same-day." },
      { name: 'Integrated panel alignment and hinge wear', desc: 'Estate kitchens in MacTaggart feature custom panel-ready dishwashers that develop hinge fatigue and panel bracket wear over 10–20 years. Door sag and panel gaps are addressed with precision realignment and OEM hinge replacement.' },
      { name: 'Hard water softener calibration — Miele and Bosch', desc: "EPCOR's 170–200 mg/L hard water requires precise calibration of Miele's built-in ion exchange softener and Bosch's salt regeneration system. Incorrect settings lead to progressive calcium damage. We recalibrate for Edmonton water chemistry on every visit." },
      { name: 'Bosch 800 / 500 series pump failure', desc: "Bosch 800 and 500 Series dishwashers installed in 2005–2015 MacTaggart kitchens develop circulation pump bearing wear and drain pump failures as they approach 15–20 years. OEM Bosch pump assemblies available for same-day replacement." },
      { name: 'Sub-Zero / Wolf integrated system faults', desc: 'High-end Sub-Zero and Wolf kitchen suites may include integrated dishwashers that require brand-specific service knowledge. We service these platforms and source OEM parts through authorized channels.' },
      { name: 'Fisher & Paykel DishDrawer service', desc: 'Fisher & Paykel DishDrawer double units common in MacTaggart estate kitchens develop drawer slide wear, electronic controller faults, and pump failures. We carry F&P parts and perform same-day service on all DishDrawer configurations.' }
    ],
    brands: ['Miele', 'Bosch', 'Sub-Zero', 'Fisher & Paykel', 'Wolf', 'KitchenAid', 'Whirlpool', 'Samsung', 'LG', 'Electrolux', 'Gaggenau', 'GE'],
    insightTitle: 'Estate home appliance specialists for MacTaggart\'s premium kitchen suites',
    insight: `MacTaggart represents the upper end of Edmonton's appliance repair market, with estate homes featuring $6,000–$15,000 integrated dishwasher installations from Miele, Bosch, Sub-Zero, and Fisher & Paykel. These appliances require technicians with specific brand training, access to genuine OEM parts, and the practical skills to work carefully in custom-built kitchen environments with bespoke cabinetry and millwork. Our team has built deep experience in MacTaggart, Magrath Heights, Henderson Estates, and Windsor Park — Edmonton's concentration of premium estate residential appliance accounts. EPCOR's hard water at 170–200 mg/L is the single most important factor affecting premium dishwasher longevity in MacTaggart. Miele dishwashers without properly calibrated and maintained ion exchange water softeners accumulate calcium damage in their circulation pumps and heating elements within 5–8 years — damage that shortens the effective service life of a $5,000+ appliance significantly. Bosch units develop similar scaling in their spray arm hubs and check valves when Edmonton's hard water is not managed through regular rinse aid use and professional descaling. We test and address water hardness management on every MacTaggart visit as standard practice, providing homeowners with calibration settings specific to Edmonton's 170–200 mg/L EPCOR supply.`,
    relatedLinks: [
      { href: '/washer-repair-mactaggart', text: 'Washer Repair — MacTaggart' },
      { href: '/fridge-repair-mactaggart', text: 'Fridge Repair — MacTaggart' },
      { href: '/dishwasher-repair-terwillegar', text: 'Dishwasher Repair — Terwillegar' },
      { href: '/dishwasher-repair-magrath-heights', text: 'Dishwasher Repair — Magrath Heights' },
      { href: '/dishwasher-repair-henderson-estates', text: 'Dishwasher Repair — Henderson Estates' },
      { href: '/dishwasher-repair-edmonton', text: 'Dishwasher Repair — Edmonton' }
    ]
  }
];

const services = [
  {
    type: 'dishwasher',
    serviceSlugPart: 'dishwasher-repair',
    serviceName: 'Dishwasher Repair',
    serviceShort: 'dishwasher',
    hubService: 'dishwasher repair',
    breadcrumbParent: { href: '/dishwasher-repair-edmonton', text: 'Dishwasher Repair Edmonton' },
    priceRange: '$120–$350 CAD',
    diagFee: '$65',
    includeHardWater: true
  },
  {
    type: 'washer',
    serviceSlugPart: 'washer-repair',
    serviceName: 'Washer Repair',
    serviceShort: 'washer',
    hubService: 'washer repair',
    breadcrumbParent: { href: '/washer-repair-edmonton', text: 'Washer Repair Edmonton' },
    priceRange: '$120–$380 CAD',
    diagFee: '$65',
    includeHardWater: false
  },
  {
    type: 'fridge',
    serviceSlugPart: 'fridge-repair',
    serviceName: 'Fridge Repair',
    serviceShort: 'fridge',
    hubService: 'refrigerator repair',
    breadcrumbParent: { href: '/fridge-repair-edmonton', text: 'Fridge Repair Edmonton' },
    priceRange: '$120–$420 CAD',
    diagFee: '$65',
    includeHardWater: false
  }
];

function getWasherProblems(n) {
  return [
    { name: 'Not spinning / drum stuck', desc: `Drive belt or coupling failure on top-load units — very common in ${n.era} ${n.name} Kenmore and Maytag washers. OEM belts and couplings on the truck for same-day replacement.` },
    { name: 'Water not draining', desc: `Drain pump failure or kinked drain hose. Clothes sit in standing water at cycle end. Most common in top-load units 15+ years old across ${n.name} homes.` },
    { name: 'Front-load door seal leak', desc: `Front-load washer door boot seals degrade after 8–12 years, especially in hard-water areas. Water leaks onto flooring during cycles. OEM door boot seals replace the gasket and restore watertight operation.` },
    { name: 'Bearing noise / loud during spin', desc: `Drum bearings wear out on front-load washers, producing loud rumbling or grinding during spin. Bearing replacement is a major repair — we assess cost vs. replacement and advise honestly.` },
    { name: 'Samsung / LG error codes', desc: `Samsung UE, 5E, and E3 error codes on front-load washers indicate drum imbalance, drain faults, and door lock failures. LG OE and UE codes follow similar patterns. We diagnose and repair same-day.` },
    { name: 'Control board / lid switch failure', desc: `Top-load washers with failed lid switches won't agitate or spin. Front-load control boards develop capacitor failures causing error codes and stuck cycles. Both are same-day repairs with OEM parts.` }
  ];
}

function getFridgeProblems(n) {
  return [
    { name: 'Not cooling / warm fridge', desc: `Compressor failure, refrigerant leak, or condenser fan fault — the most urgent fridge repair call from ${n.name} homeowners. We diagnose the root cause and provide an honest repair vs. replace assessment.` },
    { name: 'Ice maker not producing ice', desc: `Ice maker assembly failure, water inlet valve blockage, or ice maker module fault. Very common in Samsung, LG, and Whirlpool French door fridges installed in ${n.name} kitchen renovations.` },
    { name: 'Water dispenser not working', desc: `Water inlet valve failure or frozen supply line. Common in LG and Samsung side-by-side fridges. We diagnose inlet valve solenoid faults and thaw frozen lines same-day.` },
    { name: 'Frost buildup / excessive frost', desc: `Defrost heater, thermostat, or defrost timer failure causes ice to build up in the freezer or on evaporator coils. Manual defrost and component replacement restores normal operation.` },
    { name: 'Samsung / LG error codes', desc: `Samsung error codes 22E, 40E, and 88 indicate evaporator fan, icing, and communication faults. LG Er IF and Er dH codes signal similar issues. We diagnose and resolve same-day.` },
    { name: 'Compressor / sealed system service', desc: `When the compressor fails on a ${n.name} fridge, we assess age, brand, and repair cost against replacement value. We service sealed systems and source compressors for brands where repair makes economic sense.` }
  ];
}

function getWasherPriceTable() {
  return `<tr><td>Diagnostic visit (waived with repair)</td><td>$65</td></tr>
        <tr><td>Drive belt replacement</td><td>$120&ndash;$200</td></tr>
        <tr><td>Drain pump replacement</td><td>$150&ndash;$260</td></tr>
        <tr><td>Door boot seal (front-load)</td><td>$180&ndash;$320</td></tr>
        <tr><td>Drum bearing replacement</td><td>$280&ndash;$480</td></tr>
        <tr><td>Water inlet valve</td><td>$100&ndash;$180</td></tr>
        <tr><td>Control board replacement</td><td>$220&ndash;$380</td></tr>
        <tr><td>Lid switch / door lock</td><td>$80&ndash;$160</td></tr>`;
}

function getFridgePriceTable() {
  return `<tr><td>Diagnostic visit (waived with repair)</td><td>$65</td></tr>
        <tr><td>Compressor replacement</td><td>$420&ndash;$780</td></tr>
        <tr><td>Evaporator fan motor</td><td>$150&ndash;$260</td></tr>
        <tr><td>Condenser fan motor</td><td>$120&ndash;$220</td></tr>
        <tr><td>Ice maker assembly</td><td>$180&ndash;$320</td></tr>
        <tr><td>Water inlet valve</td><td>$100&ndash;$180</td></tr>
        <tr><td>Defrost heater / thermostat</td><td>$120&ndash;$240</td></tr>
        <tr><td>Control board replacement</td><td>$240&ndash;$420</td></tr>`;
}

function getDishwasherPriceTable() {
  return `<tr><td>Diagnostic visit (waived with repair)</td><td>$65</td></tr>
        <tr><td>Drain pump replacement</td><td>$180&ndash;$280</td></tr>
        <tr><td>Door latch / door switch</td><td>$90&ndash;$150</td></tr>
        <tr><td>Heating element replacement</td><td>$150&ndash;$240</td></tr>
        <tr><td>Spray arm + bearing replacement</td><td>$90&ndash;$160</td></tr>
        <tr><td>Detergent dispenser assembly</td><td>$80&ndash;$140</td></tr>
        <tr><td>Control board replacement</td><td>$240&ndash;$420</td></tr>
        <tr><td>Circulation / wash motor</td><td>$220&ndash;$360</td></tr>`;
}

function getWasherFAQ(n) {
  return [
    { q: `How fast can you reach ${n.name} for a washer repair?`, a: `Our technicians reach ${n.name} from the Edmonton hub at 10025 102A Avenue NW in approximately 20–25 minutes via the Whitemud Freeway. Same-day washer repair is standard when you book before 12 PM Monday–Saturday. We also offer Sunday appointments (10 AM–6 PM Mountain Time).` },
    { q: `What brands of washers do you repair in ${n.name}?`, a: `We repair all major washer brands in ${n.name} — Samsung, LG, Whirlpool, Kenmore, Maytag, GE, Frigidaire, Bosch, and more. Both top-load and front-load configurations are serviced with OEM parts and a 90-day warranty.` },
    { q: `How much does washer repair cost in ${n.name}?`, a: `Washer repair in ${n.name} typically runs $120–$380 CAD including parts and labour. Common repairs: drain pump $150–$260, door boot seal $180–$320, drive belt $120–$200, drum bearings $280–$480. Flat $65 diagnostic waived with repair. 90-day warranty on all repairs.` }
  ];
}

function getFridgeFAQ(n) {
  return [
    { q: `How fast can you reach ${n.name} for a fridge repair?`, a: `Our technicians reach ${n.name} from the Edmonton hub at 10025 102A Avenue NW in approximately 20–25 minutes via the Whitemud Freeway. Same-day fridge repair is standard when you book before 12 PM Monday–Saturday. We also offer Sunday appointments (10 AM–6 PM Mountain Time).` },
    { q: `What brands of fridges do you repair in ${n.name}?`, a: `We repair all major refrigerator brands in ${n.name} — Samsung, LG, Whirlpool, Kenmore, GE, Frigidaire, Bosch, KitchenAid, Maytag, and more. French door, side-by-side, and top-mount configurations all serviced with OEM parts and a 90-day warranty.` },
    { q: `How much does fridge repair cost in ${n.name}?`, a: `Fridge repair in ${n.name} typically runs $120–$420 CAD depending on the fault. Common repairs: compressor $420–$780, evaporator fan motor $150–$260, ice maker $180–$320, water inlet valve $100–$180. Flat $65 diagnostic waived with repair. 90-day warranty on all repairs.` }
  ];
}

function getDishwasherFAQ(n) {
  return [
    { q: `How fast can you reach ${n.name} for a dishwasher repair?`, a: `Our technicians reach ${n.name} from the Edmonton hub at 10025 102A Avenue NW in approximately 20–25 minutes via the Whitemud Freeway. Same-day dishwasher repair is standard when you book before 12 PM Monday–Saturday. We also offer Sunday appointments (10 AM–6 PM Mountain Time).` },
    { q: `Does Edmonton's hard water affect dishwashers in ${n.name}?`, a: `Yes — EPCOR's Edmonton water supply runs at 170–200 mg/L hardness, which is in the hard range. This accelerates calcium scaling in spray arm nozzles, heating elements, and circulation pump seals. We address hard water deposits during every dishwasher service visit in ${n.name}.` },
    { q: `How much does dishwasher repair cost in ${n.name}?`, a: `Dishwasher repair in ${n.name} typically runs $120–$350 CAD including parts and labour. Common repairs: drain pump $180–$280, heating element $150–$240, door latch $90–$150, control board $240–$420. Flat $65 diagnostic waived with repair. 90-day warranty on all repairs.` }
  ];
}

function renderFAQ(faqItems) {
  return faqItems.map(f => `    {"@type": "Question", "name": "${f.q.replace(/"/g, '&quot;')}", "acceptedAnswer": {"@type": "Answer", "text": "${f.a.replace(/"/g, '&quot;').replace(/–/g, '–')}"}}`).join(',\n');
}

function renderFAQHTML(faqItems) {
  return faqItems.map(f => `      <details class="faq-item">
        <summary class="faq-question"><span>${f.q}</span><span class="faq-icon" aria-hidden="true">+</span></summary>
        <div class="faq-answer"><p>${f.a}</p></div>
      </details>`).join('\n');
}

function renderProblems(problems) {
  return problems.map(p => `      <div class="problem-card">
        <div class="problem-name">${p.name}</div>
        <div class="problem-desc">${p.desc}</div>
      </div>`).join('\n');
}

function renderBrands(brands) {
  return brands.map(b => `      <span class="brand-chip">${b}</span>`).join('\n');
}

function renderRelated(links) {
  return links.map(l => `      <a href="${l.href}" class="related-link">${l.text}</a>`).join('\n');
}

function buildPage(n, svc) {
  const slug = `${svc.serviceSlugPart}-${n.slug}`;
  const title = `${svc.serviceName} ${n.name} Edmonton | Fixlify`;
  const metaDesc = svc.type === 'dishwasher'
    ? `${svc.serviceName} in ${n.name}, Edmonton — same-day service, flat $65 diagnostic, 90-day warranty. EPCOR hard water expertise. All major brands. Book online.`
    : `${svc.serviceName} in ${n.name}, Edmonton — same-day service, flat $65 diagnostic, 90-day warranty. All major brands. Book online or email edmonton@fixlifyservices.com.`;

  const problems = svc.type === 'washer' ? getWasherProblems(n)
    : svc.type === 'fridge' ? getFridgeProblems(n)
    : n.problems;

  const priceTable = svc.type === 'washer' ? getWasherPriceTable()
    : svc.type === 'fridge' ? getFridgePriceTable()
    : getDishwasherPriceTable();

  const faqItems = svc.type === 'washer' ? getWasherFAQ(n)
    : svc.type === 'fridge' ? getFridgeFAQ(n)
    : getDishwasherFAQ(n);

  const hardWaterNote = svc.type === 'dishwasher'
    ? `<p>Note: Edmonton's EPCOR water supply runs at 170&ndash;200 mg/L hardness. We check and address hard water scaling on every dishwasher repair visit in ${n.name} &mdash; this extends post-repair service life significantly.</p>`
    : '';

  const relatedLinks = svc.type === 'dishwasher'
    ? n.relatedLinks
    : [
        { href: `/dishwasher-repair-${n.slug}`, text: `Dishwasher Repair — ${n.name}` },
        { href: `/${svc.serviceSlugPart}-edmonton`, text: `${svc.serviceName} — Edmonton` },
        { href: `/dishwasher-repair-edmonton`, text: 'Dishwasher Repair — Edmonton' },
        { href: `/fridge-repair-edmonton`, text: 'Fridge Repair — Edmonton' },
        { href: `/washer-repair-edmonton`, text: 'Washer Repair — Edmonton' },
        { href: '/dishwasher-repair-terwillegar', text: 'Dishwasher Repair — Terwillegar' }
      ];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${metaDesc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://fixlifyservices.com/${slug}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/tokens.css">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;font-size:16px}
body{font-family:'Instrument Sans',-apple-system,sans-serif;background:#fff;color:#0a0a0a;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
img{display:block;max-width:100%}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
.breadcrumb{padding:14px 0;border-bottom:1px solid #e5e7eb;background:#fafafa}
.breadcrumb .container{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.breadcrumb a{font-size:.8125rem;font-weight:500;color:#6b7280;transition:color .15s}
.breadcrumb a:hover{color:#2563eb}
.breadcrumb-sep{font-size:.8125rem;color:#d1d5db}
.breadcrumb-current{font-size:.8125rem;font-weight:600;color:#0a0a0a}
.page-hero{padding:56px 0 48px;background:#fff;border-bottom:1px solid #e5e7eb}
.page-hero .container{max-width:800px}
.page-hero-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#2563eb;margin-bottom:16px}
.page-hero-eyebrow::before{content:'';display:block;width:16px;height:2px;background:#2563eb}
h1.page-h1{font-size:clamp(1.875rem,4vw,2.75rem);font-weight:700;line-height:1.1;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:24px}
.answer-box{background:#eff6ff;border-left:3px solid #2563eb;border-radius:0 6px 6px 0;padding:20px 24px;margin-bottom:32px;font-size:1rem;color:#1e40af;line-height:1.7;font-weight:500}
.page-hero-ctas{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.btn-primary{display:inline-flex;align-items:center;gap:8px;background:#2563eb;color:#fff;font-size:1rem;font-weight:700;padding:14px 24px;border-radius:4px;white-space:nowrap;transition:background .15s}
.btn-primary:hover{background:#1d4ed8}
.btn-secondary{display:inline-flex;align-items:center;gap:6px;background:#fff;color:#2563eb;font-size:1rem;font-weight:700;padding:13px 22px;border-radius:4px;border:1.5px solid #2563eb;white-space:nowrap;transition:background .15s}
.btn-secondary:hover{background:#eff6ff}
.trust-bar{background:#0a0a0a;padding:14px 0}
.trust-bar-inner{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:0}
.trust-item{display:flex;align-items:center;gap:8px;padding:4px 24px;border-right:1px solid rgba(255,255,255,.1);font-size:.8125rem;font-weight:600;color:rgba(255,255,255,.9);white-space:nowrap}
.trust-item:last-child{border-right:none}
.section-label{font-size:.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#2563eb;margin-bottom:12px;display:flex;align-items:center;gap:8px}
.section-label::after{content:'';flex:1;height:1px;background:#e5e7eb;max-width:40px}
.section-title{font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em;color:#0a0a0a;line-height:1.15;margin-bottom:16px}
main.page-main{padding:56px 0 0}
.content-intro{max-width:760px;font-size:1.0625rem;color:#374151;line-height:1.75;margin-bottom:56px}
.content-intro h2{font-size:1.375rem;font-weight:700;color:#0a0a0a;letter-spacing:-.02em;margin-top:32px;margin-bottom:12px}
.content-intro p{margin-bottom:16px}
.problems-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}
.problem-card{background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px}
.problem-name{font-size:.9375rem;font-weight:700;color:#0a0a0a;margin-bottom:6px}
.problem-desc{font-size:.875rem;color:#6b7280;line-height:1.5}
.pricing-table{width:100%;border-collapse:collapse;margin-top:24px;font-size:.9375rem}
.pricing-table th,.pricing-table td{padding:12px 16px;border-bottom:1px solid #e5e7eb;text-align:left}
.pricing-table th{background:#f9fafb;font-weight:600;color:#0a0a0a;font-size:.8125rem;text-transform:uppercase;letter-spacing:.05em}
.pricing-table td:last-child{font-weight:600;color:#2563eb;white-space:nowrap}
.pricing-note{font-size:.8125rem;color:#6b7280;margin-top:12px;line-height:1.5}
.faq-section{padding:56px 0;border-top:1px solid #e5e7eb}
.faq-section h2{font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:32px}
.faq-item{border-bottom:1px solid #e5e7eb}
.faq-question{display:flex;justify-content:space-between;align-items:center;padding:18px 0;cursor:pointer;gap:16px;list-style:none;font-weight:600;font-size:1rem;color:#0a0a0a}
.faq-question::-webkit-details-marker{display:none}
.faq-icon{font-size:1.25rem;color:#2563eb;flex-shrink:0;transition:transform .2s}
details[open] .faq-icon{transform:rotate(45deg)}
.faq-answer{padding:0 0 18px;font-size:.9375rem;color:#374151;line-height:1.7}
.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
.related-link{display:block;padding:10px 14px;background:#fff;border:1px solid #e5e7eb;border-radius:6px;font-size:.875rem;font-weight:500;color:#2563eb;transition:border-color .15s}
.related-link:hover{border-color:#2563eb}
.brand-chip{display:inline-block;padding:8px 16px;background:#fff;border:1px solid #e5e7eb;border-radius:999px;font-size:.875rem;font-weight:600;color:#0a0a0a}
.fade-in{opacity:0;transition:opacity .35s ease}
.fade-in.visible{opacity:1}
.lz-trust-block{max-width:880px;margin:24px auto;padding:24px 20px;border:1px solid rgba(15,23,42,0.08);border-radius:12px;background:#FAFAFA;font-size:15px;line-height:1.65;color:#374151}
.lz-trust-h{font-size:1.2rem;margin:0 0 10px;color:#0f172a;font-weight:700}
.lz-trust-intro{margin:0 0 14px;color:#334155}
.lz-trust-intro strong{color:#0f172a}
.lz-trust-points{list-style:none;margin:0 0 16px;padding:0;display:grid;gap:8px}
.lz-trust-points li{padding-left:22px;position:relative;color:#475569;font-size:14px}
.lz-trust-points li::before{content:"\\2713";position:absolute;left:0;top:0;color:#2563eb;font-weight:700}
.lz-quick-form{display:grid;gap:10px;margin:0;padding:14px;border:1px dashed rgba(15,23,42,0.12);border-radius:10px;background:#fff}
.lz-quick-form-lead{margin:0 0 4px;font-size:13px;color:#475569}
.lz-quick-field{display:flex;flex-direction:column;gap:4px;font-size:12px;color:#475569;font-weight:600}
.lz-quick-field input,.lz-quick-field textarea{padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:14px;color:#0f172a;background:#fff;font-family:inherit}
.lz-quick-submit{padding:10px 18px;background:#2563eb;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;font-size:14px;margin-top:4px}
.lz-quick-submit:hover{background:#1d4ed8}
footer.fx-footer{background:#0a0a0a;color:rgba(255,255,255,.7);padding:40px 0;margin-top:80px}
.fx-footer-inner{max-width:1200px;margin:0 auto;padding:0 24px}
.fx-footer-cta-strip{background:#1e3a5f;border-radius:8px;padding:24px;margin-bottom:32px}
.fx-footer-cta-content{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.fx-footer-cta-label{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#93c5fd;display:block;margin-bottom:4px}
.fx-footer-cta-text p{color:rgba(255,255,255,.8);font-size:.9rem;margin:0}
.fx-footer-cta-btns{display:flex;gap:10px;flex-wrap:wrap}
.fx-footer-btn-book{background:#2563eb;color:#fff;padding:10px 20px;border-radius:4px;font-weight:700;font-size:.9rem;white-space:nowrap}
.fx-footer-btn-call{background:transparent;color:#93c5fd;padding:10px 20px;border-radius:4px;font-weight:600;font-size:.9rem;border:1px solid rgba(147,197,253,.3);white-space:nowrap}
.fx-footer-columns{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;margin-bottom:32px}
.fx-footer-logo{display:flex;align-items:center;gap:8px;margin-bottom:12px}
.fx-footer-logo-icon{color:#2563eb}
.fx-footer-logo-name{font-weight:700;color:#fff;font-size:1rem}
.fx-footer-desc{font-size:.875rem;color:rgba(255,255,255,.6);line-height:1.6;margin-bottom:16px}
.fx-footer-address{font-size:.875rem;color:rgba(255,255,255,.6);line-height:1.7}
.fx-footer-hours{font-size:.8125rem;color:rgba(255,255,255,.5);margin-top:12px;display:flex;flex-direction:column;gap:2px}
.fx-footer-hours strong{color:rgba(255,255,255,.7)}
.fx-footer-trust-row{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap}
.fx-footer-chip{text-align:center}
.fx-chip-val{display:block;font-size:1rem;font-weight:700;color:#fff}
.fx-chip-lbl{display:block;font-size:.6875rem;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.08em}
.fx-footer-heading{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin-bottom:12px}
.fx-footer-list{list-style:none;display:flex;flex-direction:column;gap:8px}
.fx-footer-list a{font-size:.875rem;color:rgba(255,255,255,.6);transition:color .15s}
.fx-footer-list a:hover{color:#fff}
.fx-footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:20px;text-align:center}
.fx-copyright{font-size:.8125rem;color:rgba(255,255,255,.3)}
.sticky-cta{position:fixed;bottom:24px;right:24px;z-index:200}
.sticky-btn{display:flex;align-items:center;gap:8px;padding:12px 20px;border-radius:50px;font-size:.9375rem;font-weight:700;box-shadow:0 4px 16px rgba(0,0,0,.2)}
.sticky-book{background:#2563eb;color:#fff}
@media(max-width:768px){.problems-grid{grid-template-columns:1fr}.fx-footer-columns{grid-template-columns:1fr}}
@media(max-width:640px){.page-hero{padding:40px 0 36px}h1.page-h1{font-size:1.75rem}.sticky-cta{display:none}}
</style>
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${metaDesc}">
<meta property="og:url" content="https://fixlifyservices.com/${slug}">
<meta property="og:site_name" content="Fixlify Appliance Services">
<meta property="og:image" content="https://fixlifyservices.com/og-image.jpg">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${metaDesc}">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://fixlifyservices.com/${slug}#business",
  "name": "${svc.serviceName} ${n.name} Edmonton",
  "description": "${svc.serviceName} in ${n.name}, Edmonton by certified technicians. Same-day service, $65 diagnostic, 90-day parts and labour warranty.",
  "url": "https://fixlifyservices.com/${slug}",
  "image": "https://fixlifyservices.com/og-image.jpg",
  "priceRange": "$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10025 102A Avenue NW Suite 1000",
    "addressLocality": "Edmonton",
    "addressRegion": "AB",
    "postalCode": "T5J 2Z2",
    "addressCountry": "CA"
  },
  "geo": {"@type": "GeoCoordinates", "latitude": 53.4647, "longitude": -113.5200},
  "areaServed": [{"@type": "City", "name": "Edmonton"}, {"@type": "Neighborhood", "name": "${n.name}"}],
  "openingHoursSpecification": [
    {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "08:00", "closes": "20:00"},
    {"@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "10:00", "closes": "18:00"}
  ],
  "serviceType": "${svc.serviceName}",
  "potentialAction": {"@type": "ReserveAction", "target": {"@type": "EntryPoint", "urlTemplate": "https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce"}}
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${renderFAQ(faqItems)}
  ]
}
</script>
</head>
<body>
<div id="header-placeholder"></div>
<script src="/includes/header-loader.js" defer></script>

<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="container">
    <a href="/">Home</a><span class="breadcrumb-sep">/</span>
    <a href="${svc.breadcrumbParent.href}">${svc.breadcrumbParent.text}</a><span class="breadcrumb-sep">/</span>
    <span class="breadcrumb-current">${n.name}</span>
  </div>
</nav>

<section class="page-hero" aria-label="Page header">
  <div class="container">
    <div class="page-hero-eyebrow">Fixlify Appliance Services &middot; ${n.name}, Edmonton</div>
    <h1 class="page-h1">${svc.serviceName} in ${n.name}, Edmonton</h1>
    <section class="lz-trust-block" aria-labelledby="lz-trust-heading">
      <h2 id="lz-trust-heading" class="lz-trust-h">Why ${n.name} homeowners choose Fixlify</h2>
      <p class="lz-trust-intro">Our <strong>founder Alex</strong> leads a team of certified, insured technicians with 30+ years combined experience serving Edmonton since 2017. Every ${n.name} visit includes a written quote, 90-day parts &amp; labour warranty, and a free diagnostic when you proceed with the repair.</p>
      <ul class="lz-trust-points">
        <li><strong>Same-day service</strong> when you book before 12 PM on a weekday.</li>
        <li><strong>Upfront pricing</strong> — no hourly rates, no surprises.</li>
        <li><strong>Insured &amp; certified</strong> — trained on all major brands in SW Edmonton.</li>
      </ul>
      <form class="lz-quick-form" action="/contact" method="post" aria-label="Quick repair request">
        <p class="lz-quick-form-lead">Send a quick request and we'll respond within 30 minutes.</p>
        <label class="lz-quick-field"><span>Your name</span><input type="text" name="name" autocomplete="name" required></label>
        <label class="lz-quick-field"><span>Phone number</span><input type="tel" name="phone" autocomplete="tel" required></label>
        <label class="lz-quick-field"><span>City / Neighbourhood</span><input type="text" name="city" value="${n.name}, Edmonton" autocomplete="address-level2"></label>
        <label class="lz-quick-field"><span>What needs fixing?</span><textarea name="issue" rows="3" placeholder="e.g. Kenmore ${svc.serviceShort} not working"></textarea></label>
        <button type="submit" class="lz-quick-submit">Request a callback</button>
      </form>
    </section>
    <div class="answer-box">Fixlify Appliance Services provides same-day ${svc.hubService} in ${n.name}, Edmonton. We fix all brands &mdash; Kenmore, Maytag, Whirlpool, Samsung, LG &amp; more. ${svc.priceRange} typical cost, 90-day warranty. Book online or email edmonton@fixlifyservices.com.</div>
    <div class="page-hero-ctas">
      <a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="btn-secondary" target="_blank" rel="noopener">Book Online &rarr;</a>
    </div>
  </div>
</section>

<div class="answer-capsule" style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem 1.25rem;margin:1rem auto;max-width:900px;border-radius:0 8px 8px 0">
  <div style="font-size:.7rem;font-weight:700;letter-spacing:.08em;color:#2563eb;text-transform:uppercase;margin-bottom:.4rem">Quick Answer</div>
  <p style="margin:0;color:#1e3a5f;font-size:.9rem;line-height:1.6">Fixlify Appliance Services provides same-day ${svc.hubService} in ${n.name}, Edmonton. Available 7 days a week including evenings. ${svc.priceRange} typical cost. All major brands. 90-day parts &amp; labour warranty.</p>
</div>

<div class="trust-bar" role="complementary" aria-label="Trust signals">
  <div class="trust-bar-inner">
    <div class="trust-item">&#128176; $65 flat diagnostic</div>
    <div class="trust-item">&#10003; No Hidden Fees</div>
    <div class="trust-item">&#9873; Same-Day Service</div>
    <div class="trust-item">&#128737; 90-Day Warranty</div>
  </div>
</div>

<main class="page-main container" id="main-content">
  <div class="content-intro fade-in">
    <h2>${svc.serviceName} in ${n.name} &mdash; ${n.era} SW Edmonton</h2>
    <p>Who fixes ${svc.serviceShort}s in ${n.name}? <strong>Fixlify Appliance Services Edmonton</strong> &mdash; we provide same-day ${svc.hubService} throughout ${n.name} and adjacent SW Edmonton communities. Book online or email <a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a>. Flat <strong>$65 diagnostic</strong>, Mon&ndash;Sat 8AM&ndash;8PM, Sun 10AM&ndash;6PM Mountain Time. Typical ${svc.serviceShort} repair cost: <strong>${svc.priceRange}</strong>. <strong>90-day parts &amp; labour warranty</strong> on every repair.</p>
    <p>${n.context}</p>
    ${hardWaterNote}
  </div>

  <section class="service-details fade-in" aria-label="Common ${svc.serviceShort} problems in ${n.name}" style="padding:48px 0;border-top:1px solid #e5e7eb">
    <div class="section-label">Common issues</div>
    <h2 class="section-title">Common ${svc.serviceName} Problems We Fix in ${n.name}</h2>
    <p style="max-width:760px;color:#374151;line-height:1.7;margin-bottom:24px">The most common ${svc.serviceShort} faults we diagnose in ${n.name}, based on our service history across SW Edmonton's ${n.era} residential neighbourhoods.</p>
    <div class="problems-grid">
${renderProblems(problems)}
    </div>
  </section>

  <section aria-label="Brands we service in ${n.name}" style="margin-top:48px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Brand expertise</div>
    <h2 class="section-title">${svc.serviceName} Brands We Service in ${n.name}</h2>
    <p style="max-width:760px;color:#374151;line-height:1.7;margin-bottom:24px">We service all major ${svc.serviceShort} brands in ${n.name} &mdash; from the ${n.appliances}.</p>
    <div style="display:flex;flex-wrap:wrap;gap:8px;max-width:880px">
${renderBrands(n.brands)}
    </div>
  </section>

  <section aria-label="${svc.serviceName} pricing in ${n.name}" style="margin-top:56px">
    <div class="section-label">Transparent pricing</div>
    <h2 class="section-title">${svc.serviceName} Pricing in ${n.name}</h2>
    <p style="max-width:760px;color:#374151;line-height:1.7;margin-bottom:20px">All ${n.name} ${svc.serviceShort} repairs start with a flat <strong>$65 diagnostic</strong>, waived when you proceed with the repair. Written quote before any work begins.</p>
    <table class="pricing-table" style="max-width:760px">
      <thead><tr><th>Repair type</th><th>Typical range (parts + labour)</th></tr></thead>
      <tbody>
        ${priceTable}
      </tbody>
    </table>
    <p class="pricing-note">All prices include parts, labour, and a <strong>90-day warranty</strong>. No surcharge for SW Edmonton dispatch to ${n.name}.</p>
  </section>

  <section aria-label="${n.name} ${svc.serviceShort} context" style="margin-top:56px;padding:32px;background:#eff6ff;border-radius:8px;border-left:4px solid #2563eb">
    <div class="section-label">${n.name} service patterns</div>
    <h2 class="section-title">${n.insightTitle}</h2>
    <div style="max-width:840px;color:#1e40af;line-height:1.75;font-size:1rem">
      <p>${n.insight}</p>
    </div>
  </section>

  <section class="fade-in" aria-label="Book ${svc.serviceShort} repair ${n.name}" style="margin-top:56px;padding:56px 0;border-top:1px solid #e5e7eb;text-align:center">
    <div class="section-label">Online booking</div>
    <h2 style="font-size:1.75rem;font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:12px">Book ${svc.serviceName} in ${n.name}</h2>
    <p style="color:#6b7280;margin-bottom:24px">Real-time availability, instant confirmation, no commitment required.</p>
    <iframe id="fixlify-booking-nicks-appliance-repair-b8c8ce" src="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce?embed=true" style="width:100%;height:600px;border:none;display:block" title="Book a Service" loading="lazy" allowtransparency="true"></iframe>
    <script>window.addEventListener('message',function(e){if(e.data&&e.data.type==='fixlify-resize'){var el=document.getElementById('fixlify-booking-nicks-appliance-repair-b8c8ce');if(el)el.style.height=e.data.height+'px'}});<\/script>
    <p style="font-size:.9375rem;color:#6b7280;margin-top:16px">Prefer email? <a href="mailto:edmonton@fixlifyservices.com" style="color:#2563eb;font-weight:600">edmonton@fixlifyservices.com</a> &mdash; Mon&ndash;Sat 8am&ndash;8pm, Sun 10am&ndash;6pm Mountain Time</p>
  </section>

  <section class="faq-section fade-in" aria-label="${n.name} ${svc.serviceShort} FAQ">
    <h2>FAQ &mdash; ${svc.serviceName} in ${n.name}</h2>
    <div class="faq-list">
${renderFAQHTML(faqItems)}
    </div>
  </section>

  <section aria-label="Other services in ${n.name}" style="margin-top:56px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Other ${n.name} services</div>
    <h2 class="section-title">Other Appliance Repair Services in ${n.name}</h2>
    <div class="related-grid">
${renderRelated(relatedLinks)}
    </div>
  </section>

  <section aria-label="Book ${n.name} ${svc.serviceShort} repair" style="margin-top:56px;padding:40px;background:#0a0a0a;border-radius:8px;text-align:center;color:#fff">
    <h2 style="font-size:1.75rem;font-weight:700;color:#fff;margin-bottom:12px;letter-spacing:-.02em">Ready to book ${svc.hubService} in ${n.name}?</h2>
    <p style="color:rgba(255,255,255,.8);margin-bottom:24px;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.6">Same-day service, $65 flat diagnostic, written quote before any work, 90-day warranty. Book online for instant confirmation.</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="btn-primary" target="_blank" rel="noopener">Book Online &rarr;</a>
      <a href="mailto:edmonton@fixlifyservices.com" class="btn-secondary">Email Edmonton Team</a>
    </div>
  </section>
</main>

<footer class="fx-footer" role="contentinfo">
  <div class="fx-footer-inner">
    <div class="fx-footer-cta-strip">
      <div class="fx-footer-cta-content">
        <div class="fx-footer-cta-text">
          <span class="fx-footer-cta-label">Edmonton Appliance Repair</span>
          <p>Book online &mdash; confirmation within minutes. Serving ${n.name}, SW Edmonton, and all Edmonton CMA communities.</p>
        </div>
        <div class="fx-footer-cta-btns">
          <a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="fx-footer-btn-book" rel="noopener">Book Online Now</a>
          <a href="mailto:edmonton@fixlifyservices.com" class="fx-footer-btn-call">edmonton@fixlifyservices.com</a>
        </div>
      </div>
    </div>
    <div class="fx-footer-columns">
      <div class="fx-footer-col fx-footer-brand">
        <div class="fx-footer-logo"><div class="fx-footer-logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg></div><span class="fx-footer-logo-name">Fixlify</span></div>
        <p class="fx-footer-desc">Edmonton Appliance Repair. Serving ${n.name}, SW Edmonton, Terwillegar, and all Edmonton CMA communities.</p>
        <address class="fx-footer-address" itemscope itemtype="https://schema.org/PostalAddress" style="font-style:normal;margin:14px 0">
          <span itemprop="streetAddress">10025 102A Avenue NW, Suite 1000</span><br>
          <span itemprop="addressLocality">Edmonton</span>, <span itemprop="addressRegion">AB</span> <span itemprop="postalCode">T5J 2Z2</span>
        </address>
        <div class="fx-footer-hours"><strong>Service Hours (Mountain Time)</strong><span>Monday&ndash;Saturday: 8 AM &ndash; 8 PM</span><span>Sunday: 10 AM &ndash; 6 PM</span></div>
        <div class="fx-footer-trust-row">
          <div class="fx-footer-chip"><span class="fx-chip-val">Same-Day</span><span class="fx-chip-lbl">Service</span></div>
          <div class="fx-footer-chip"><span class="fx-chip-val">Online</span><span class="fx-chip-lbl">Booking</span></div>
          <div class="fx-footer-chip"><span class="fx-chip-val">90-Day</span><span class="fx-chip-lbl">Warranty</span></div>
        </div>
      </div>
      <div class="fx-footer-col">
        <h4 class="fx-footer-heading">Services</h4>
        <ul class="fx-footer-list">
          <li><a href="/services/refrigerator-repair-edmonton/">Refrigerator Repair Edmonton</a></li>
          <li><a href="/services/washer-repair-edmonton/">Washer Repair Edmonton</a></li>
          <li><a href="/services/dryer-repair-edmonton/">Dryer Repair Edmonton</a></li>
          <li><a href="/services/dishwasher-repair-edmonton/">Dishwasher Repair Edmonton</a></li>
          <li><a href="/services/oven-repair-edmonton/">Oven Repair Edmonton</a></li>
          <li><a href="/services/freezer-repair-edmonton/">Freezer Repair Edmonton</a></li>
        </ul>
      </div>
      <div class="fx-footer-col">
        <h4 class="fx-footer-heading">Edmonton Neighbourhoods</h4>
        <ul class="fx-footer-list">
          <li><a href="/dishwasher-repair-${n.slug}">${n.name}</a></li>
          <li><a href="/dishwasher-repair-terwillegar">Terwillegar</a></li>
          <li><a href="/dishwasher-repair-riverbend">Riverbend</a></li>
          <li><a href="/dishwasher-repair-windermere">Windermere</a></li>
          <li><a href="/dishwasher-repair-rutherford">Rutherford</a></li>
          <li><a href="/dishwasher-repair-edmonton">Edmonton</a></li>
        </ul>
      </div>
      <div class="fx-footer-col">
        <h4 class="fx-footer-heading">Quick Links</h4>
        <ul class="fx-footer-list">
          <li><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" rel="noopener">Book Online</a></li>
          <li><a href="/about/">About Us</a></li>
          <li><a href="/service-areas/">Service Areas</a></li>
          <li><a href="/sitemap.xml">Sitemap</a></li>
        </ul>
        <h4 class="fx-footer-heading" style="margin-top:24px">Contact</h4>
        <ul class="fx-footer-list"><li><a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a></li></ul>
      </div>
    </div>
    <div class="fx-footer-bottom">
      <p class="fx-copyright">&copy; <span id="fx-year"></span> Fixlify Appliance Repair Edmonton | ${n.name} | Online Booking Available</p>
    </div>
  </div>
</footer>
<script>(function(){var el=document.getElementById('fx-year');if(el)el.textContent=new Date().getFullYear()})();<\/script>
<div class="sticky-cta" aria-label="Quick contact">
  <a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="sticky-btn sticky-book" target="_blank" rel="noopener">Book Online &rarr;</a>
</div>
<script>
document.addEventListener('DOMContentLoaded',function(){
  var els=document.querySelectorAll('.fade-in');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.1});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('visible')})}
});
<\/script>
</body>
</html>`;

  return { slug, html };
}

let count = 0;
for (const n of neighborhoods) {
  for (const svc of services) {
    const { slug, html } = buildPage(n, svc);
    const filePath = `C:/fixlifyservices/${slug}.html`;
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, html, 'utf8');
      console.log(`CREATED: ${slug}.html`);
      count++;
    } else {
      console.log(`SKIP (exists): ${slug}.html`);
    }
  }
}
console.log(`\nDone. Created ${count} pages.`);
