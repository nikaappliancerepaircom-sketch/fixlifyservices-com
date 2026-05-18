// Generator for washer and fridge pages — Batch 13
const fs = require('fs');

const neighborhoods = [
  {
    slug: 'sakaw',
    name: 'Sakaw',
    era: '1970s-80s SE',
    dist: '22',
    route: '34 Street SE and 23 Avenue SE',
    brands_washer: ['Whirlpool','Kenmore','GE','Maytag'],
    brands_fridge: ['GE','Whirlpool','Kenmore','Frigidaire'],
    washer_intro: `Sakaw is an established southeast Edmonton neighbourhood developed through the 1970s and 1980s in the Mill Woods area. The housing stock consists of mature single-family homes and bungalows, many still occupied by long-term owner-occupants who have lived in the same property for 30 to 40 years. Washing machines in Sakaw homes are predominantly Whirlpool, Kenmore, and GE top-load units installed during 1990s laundry room upgrades, now 20 to 30 years old. These machines present with predictable age-related failures: direct drive transmission wear in Whirlpool and Kenmore units, lid switch failure that prevents the spin cycle from engaging, water inlet valve corrosion from decades of EPCOR's moderately mineralized water supply, and door seal deterioration in the few front-load units purchased during the 2000s. Agitator cap and dog ear failure in top-load Kenmore units is a common presenting complaint in Sakaw, creating the characteristic "spinning but not agitating" symptom that technicians resolve with a 30-minute OEM part swap. EPCOR's water supply at 170 to 200 mg/L has accelerated detergent buildup in drum bearings and pump filter baskets across Sakaw's aging top-load fleet, and many machines that present with drainage complaints are actually suffering from accumulated detergent residue rather than mechanical pump failure. Fixlify technicians serving Sakaw carry Whirlpool, Kenmore, and GE OEM parts as standard truck stock and bring professional cleaning equipment for detergent buildup remediation.`,
    fridge_intro: `Sakaw is an established southeast Edmonton suburb developed during the 1970s and 1980s, with a housing stock of mature single-family homes and long-term owner-occupants who have updated appliances at least once since original construction. Refrigerators in Sakaw homes are predominantly GE, Whirlpool, and Kenmore units from the 1990s and early 2000s — machines now 20 to 30 years old that are entering the phase of compressor-adjacent failures and sealed system issues. GE side-by-side units from the late 1990s are the most commonly encountered refrigerator platform in Sakaw, and their known failure modes — ice maker water valve failure, evaporator fan motor seizure, and main control board relay failure — are well-documented and routinely resolved with OEM parts that Fixlify carries as standard truck stock. Kenmore units sharing the same Frigidaire or Whirlpool manufactured platforms show similar failure patterns. EPCOR's hard water at 170 to 200 mg/L has accelerated ice maker component wear in Sakaw refrigerators by scaling the water inlet valve and ice maker fill tube over years of operation. Defrost system failures — heater burnout, defrost thermostat failure, and timer relay failure — are the second most common category of refrigerator service call in Sakaw, causing the gradual frost accumulation in the freezer section that eventually degrades refrigerator compartment temperature control. Fixlify technicians diagnose all refrigerator platforms found in Sakaw's 1970s-80s housing stock and carry OEM parts for same-day resolution on the majority of calls.`,
    washer_dir: 'washer-repair',
    fridge_dir: 'fridge-repair',
  },
  {
    slug: 'tawa',
    name: 'Tawa',
    era: '1970s-80s SE',
    dist: '22',
    route: '34 Street SE and Mill Woods Road',
    brands_washer: ['Whirlpool','Kenmore','GE'],
    brands_fridge: ['GE','Kenmore','Whirlpool','Frigidaire'],
    washer_intro: `Tawa is a southeast Edmonton neighbourhood adjacent to Sakaw, developed through the late 1970s and 1980s in the Mill Woods area. Like its neighbour, Tawa features mature single-family homes with long-term owner-occupants and an appliance profile dominated by vintage North American brands. Washing machines in Tawa homes are predominantly Whirlpool, Kenmore, and GE top-load units now 20 to 30 years old, presenting with the full range of age-related mechanical failures that characterize this era of washer construction. Direct drive transmission wear in Whirlpool and Kenmore units is the most common presenting issue in Tawa — the transmission coupling on these machines fails predictably between 15 and 25 years of service, creating the characteristic cycle-starts-then-stops behavior that technicians resolve with a same-day OEM coupling replacement. Lid switch failure preventing spin is the second most common category, followed by water inlet valve corrosion from years of EPCOR's mineral-laden water supply. Front-load washers purchased during 2000s upgrades in Tawa are entering their second wave of service calls: door boot seal deterioration causing leaks, and bearing failure creating the drumming noise that indicates the rear drum bearing assembly needs replacement. Fixlify technicians serving Tawa carry OEM parts for all platforms common in this neighbourhood's housing stock, enabling same-day resolution on the majority of service calls without a return visit for parts.`,
    fridge_intro: `Tawa is a southeast Edmonton neighbourhood developed through the 1970s and 1980s adjacent to Sakaw, featuring mature bungalows and single-family homes with a stable long-term owner-occupant population. Refrigerators in Tawa homes follow the same profile as the surrounding Mill Woods area: GE, Kenmore, and Whirlpool units from the 1990s through early 2000s that are now 20 to 30 years old, alongside newer Samsung and LG units purchased during kitchen renovations in the 2010s. The older GE and Kenmore units in Tawa present with defrost system failures as the most common first complaint at this age — heater element burnout and defrost thermostat failure causing gradual frost accumulation in the freezer that eventually affects refrigerator compartment temperatures. Ice maker failures are the second most common category, with water inlet valve corrosion from EPCOR's hard water causing ice production failure in units that are otherwise mechanically sound. Compressor start relay failure is the third common category in Tawa's aging refrigerator fleet — the relay clicks but compressor fails to start, presenting as a refrigerator that runs the fan but fails to cool. Fixlify technicians carry defrost system components, ice maker water valves, and compressor start relays for all GE, Kenmore, and Whirlpool platforms as standard truck stock for Tawa service calls, enabling same-day resolution on these predictable failure modes.`,
  },
  {
    slug: 'silver-berry',
    name: 'Silver Berry',
    era: '2000s SE',
    dist: '25',
    route: '91 Street SE and 23 Avenue SE',
    brands_washer: ['Samsung','LG','Whirlpool','GE'],
    brands_fridge: ['Samsung','LG','GE','Whirlpool'],
    washer_intro: `Silver Berry is a newer southeast Edmonton suburb developed during the 2000s in the outer Mill Woods area. The neighbourhood features single-family and semi-detached homes built to 2000s construction standards, with appliances that are now approaching or past the 10 to 15-year post-warranty threshold. Washing machines in Silver Berry homes are predominantly Samsung and LG front-load units installed as part of builder packages or purchased as 2010s upgrades, with Whirlpool and GE top-load units in homes that opted for North American builder-grade appliances. Samsung front-load washers in Silver Berry's 2000s-era homes are now developing the characteristic post-warranty failure modes of this platform: door boot seal deterioration that allows water to escape under the door, drain pump blockage causing the Sud or 5E error code, and drum bearing noise that develops into a grinding rumble during spin cycles after 10 to 15 years of daily use. LG front-load units present with similar door seal and bearing issues, plus the LE motor error that indicates hall sensor or motor control board failure in heavily used machines. EPCOR's hard water at 170 to 200 mg/L has accelerated detergent and scale buildup in Silver Berry's front-load washers — the combination of hard water and front-load drum design creates the ideal conditions for drum seal buildup and mold growth that requires professional drum cleaning beyond routine maintenance. Fixlify technicians carry Samsung and LG OEM parts and bring professional drum cleaning equipment to all Silver Berry service calls.`,
    fridge_intro: `Silver Berry is a 2000s-era southeast Edmonton suburb with a housing stock of single-family and semi-detached homes that are now 15 to 25 years old. Refrigerators in Silver Berry homes are predominantly Samsung and LG units installed as part of builder packages or purchased as 2000s and 2010s upgrades, alongside GE and Whirlpool units in homes that opted for North American appliances. Samsung French door and bottom-mount refrigerators are the dominant platform in Silver Berry, and their post-warranty failure modes are well-characterized: ice maker failures caused by water inlet valve freeze-up (a design sensitivity in Samsung French door units exposed to EPCOR's hard water), ice dispenser auger motor failure, and the Samsung-specific cooling failure caused by ice buildup on the evaporator coil behind the freezer back panel. LG refrigerators in Silver Berry present with linear compressor warranty concerns in units purchased before 2019 (LG extended the compressor warranty on these units following reliability issues) and with ice maker fan motor failures in French door configurations. EPCOR's hard water at 170 to 200 mg/L accelerates water inlet valve calcification in both Samsung and LG ice maker systems, and Fixlify technicians routinely include ice maker water line inspection as part of every Silver Berry refrigerator service call. OEM parts for all Samsung and LG refrigerator platforms are stocked on our service vehicles as standard.`,
  },
  {
    slug: 'crawford-plains',
    name: 'Crawford Plains',
    era: '2000s SE',
    dist: '27',
    route: '91 Street SE and 23 Avenue SE',
    brands_washer: ['Samsung','LG','GE','Whirlpool'],
    brands_fridge: ['Samsung','LG','GE','Frigidaire'],
    washer_intro: `Crawford Plains is a newer family-oriented southeast Edmonton suburb developed during the 2000s as part of the outer Mill Woods expansion. The neighbourhood features single-family homes and townhomes with appliances now 15 to 22 years old, entering the post-warranty repair window in earnest. Samsung and LG front-load washers dominate the Crawford Plains appliance landscape, reflecting the popularity of these brands during the mid-2000s builder boom in Edmonton's southeast. These machines are now developing their characteristic second-decade failure modes: door boot seal deterioration that causes water to pool under the machine, drain pump blockage triggering Samsung Sud or 5E error codes, and drum bearing noise in units that have run daily loads for 15 to 20 years. The LE motor error on LG front-load units — indicating hall sensor failure or motor control board issues — is a common call in Crawford Plains homes where LG washers have been heavily used by growing families. EPCOR's hard water at 170 to 200 mg/L has been building up in Crawford Plains washers since installation, and front-load drum seals in this neighbourhood show more accelerated deterioration than in areas with softer water, due to the calcium and mineral deposits that accumulate in door boot folds over years of washing. Fixlify technicians carry Samsung and LG OEM parts as standard on all Crawford Plains service vehicles and include drum seal inspection with every service call.`,
    fridge_intro: `Crawford Plains is a 2000s-era southeast Edmonton suburb where Samsung and LG refrigerators are the dominant platforms, installed as part of the same builder packages that equipped homes across the outer Mill Woods area during this period. Refrigerators in Crawford Plains are now 15 to 22 years old and have entered the post-warranty service window where post-compressor and sealed system failures become the primary concern. Samsung bottom-mount and French door refrigerators in Crawford Plains present most frequently with ice maker failures — specifically, the Samsung ice maker freeze-up issue caused by warm air infiltration around the ice maker housing, which causes the fill tube to ice over and stop ice production. This is a known design sensitivity in Samsung French door refrigerators that Fixlify technicians address with a combination of water inlet valve replacement and ice maker housing foam seal repair. LG refrigerators in Crawford Plains present with linear compressor noise and cooling degradation in units from the pre-2019 linear compressor generation, alongside ice maker fan motor failures in French door configurations. EPCOR's hard water at 170 to 200 mg/L accelerates water inlet valve calcification in both Samsung and LG ice systems, and our technicians inspect ice maker water lines on every refrigerator service call in Crawford Plains as a matter of course.`,
  },
  {
    slug: 'lakewood-edmonton',
    name: 'Lakewood',
    era: '1980s-90s SE',
    dist: '23',
    route: '50 Street SE and 23 Avenue SE',
    brands_washer: ['GE','Whirlpool','Samsung','Kenmore'],
    brands_fridge: ['GE','Whirlpool','Samsung','Kenmore'],
    washer_intro: `Lakewood is an established southeast Edmonton suburb developed across the 1980s and into the 1990s near 50 Street SE in the Mill Woods area. The community features mature single-family homes with long-term owner-occupants, and the appliance profile reflects the brand mix preferred by Edmonton buyers through this period. Washing machines in Lakewood homes are a mix of GE and Whirlpool top-load units from 1990s laundry room upgrades — now 25 to 35 years old — alongside Samsung and LG front-load units purchased during 2000s and 2010s renovations that are now entering the post-warranty service window. The older GE and Whirlpool top-load units present with transmission wear, lid switch failure, and water inlet valve corrosion consistent with 25-plus years of daily service in Edmonton's hard water environment. Samsung and Whirlpool front-load units from 2000s renovations show drum bearing noise, door boot seal deterioration, and drain pump blockage as the predominant failure modes at 15 to 20 years of age. EPCOR's municipal water supply at 170 to 200 mg/L has been accelerating component wear in Lakewood washers since installation, and front-load drum seals in this neighbourhood show calcium buildup in door boot folds that contributes to seal deterioration and the musty odors that prompt many Lakewood residents to call for service. Fixlify technicians carry OEM parts for all platforms common in Lakewood and include drum condition assessment in every washer service call in this neighbourhood.`,
    fridge_intro: `Lakewood is an established southeast Edmonton suburb developed through the 1980s and 1990s, with a housing stock that reflects the appliance brand preferences of Edmonton buyers during those decades. Refrigerators in Lakewood homes are a mix of GE and Whirlpool units from 1990s and early 2000s kitchen renovations — now 20 to 30 years old — alongside Samsung units purchased during 2010s updates. The older GE and Whirlpool units are in the phase where compressor start relay failure, defrost heater burnout, and evaporator fan motor seizure become the dominant failure modes. GE side-by-side units from the late 1990s and early 2000s are the most common refrigerator platform in Lakewood, and their failure modes are well-documented: ice maker water valve failure causing no ice production, main control board relay failure causing the refrigerator to stop cooling intermittently, and damper door failure causing the fresh food compartment to run too warm or too cold. Samsung units in Lakewood present with the characteristic post-warranty issues of their generation: ice maker freeze-up, water dispenser valve failure, and evaporator ice buildup behind the freezer panel. EPCOR's hard water at 170 to 200 mg/L has accelerated ice maker water inlet valve wear across all platforms in Lakewood. Fixlify technicians carry GE, Whirlpool, and Samsung OEM parts as standard truck stock for Lakewood service calls.`,
  },
  {
    slug: 'millbourne',
    name: 'Millbourne',
    era: '1970s-80s E',
    dist: '20',
    route: '50 Street and Mill Woods Road',
    brands_washer: ['Maytag','Kenmore','GE','Whirlpool'],
    brands_fridge: ['Maytag','Kenmore','GE','Frigidaire'],
    washer_intro: `Millbourne is an established east Edmonton neighbourhood developed through the 1970s and 1980s near Mill Woods, featuring a dense mix of housing types occupied by a largely stable long-term population. Washing machines in Millbourne homes are dominated by Maytag, Kenmore, and GE top-load units — the brand preferences of Edmonton buyers throughout the 1970s and 1980s — now 30 to 45 years old. Maytag top-load washers from this era are legendary for their mechanical durability, but even the most robustly built machines develop pump seal failure, timer motor burnout, and lid switch failure after 35-plus years of daily use. Kenmore units — Sears-branded machines manufactured by Whirlpool or Frigidaire depending on the model series — show similar age-related mechanical wear, with agitator assembly failure and clutch pad wear being the most characteristic failure modes in Kenmore direct-drive top-loaders at this age. EPCOR's hard water at 170 to 200 mg/L has been acting on Millbourne washers for 30 to 45 years, and pump filter basket calcification and hose seal mineral deposits are universal findings on service calls in this neighbourhood. Despite their age, many Maytag and Kenmore machines in Millbourne are structurally sound and respond well to professional service — transmission coupling replacement, pump seal exchange, and timer motor replacement can restore years of additional service at a fraction of replacement cost. Fixlify technicians bring vintage Maytag and Kenmore OEM parts to Millbourne service calls as standard.`,
    fridge_intro: `Millbourne is an established east Edmonton neighbourhood developed through the 1970s and 1980s, with a housing stock that reflects the appliance brand landscape of that era. Refrigerators in Millbourne homes are predominantly Maytag, Kenmore, and GE units — some original to the homes, others installed during 1990s kitchen updates — now 25 to 50 years old. This is among the oldest refrigerator stock Fixlify encounters anywhere in Edmonton's residential market, and it requires a different diagnostic approach than newer suburb service calls. Many Millbourne refrigerators are mechanically functional but suffering from component failures that are economically repairable: compressor start capacitor replacement, evaporator fan motor exchange, defrost heater replacement, and thermostat/control calibration. Maytag refrigerators from the 1990s are particularly good repair candidates — their mechanical simplicity and robust construction mean that a compressor relay swap or defrost heater replacement can restore 10 or more additional years of service. EPCOR's hard water at 170 to 200 mg/L has scaled ice maker water inlet valves in virtually every Millbourne refrigerator that has an ice maker, and scale-induced ice maker failure is the most common presenting complaint on refrigerator service calls in this neighbourhood. Fixlify technicians carry vintage and current-generation OEM parts for all platforms common in Millbourne and approach each job with the repair-first mindset that suits this neighbourhood's housing profile.`,
  },
  {
    slug: 'idylwylde',
    name: 'Idylwylde',
    era: '1940s-50s E inner city',
    dist: '12',
    route: 'inner city east — approximately 12 min',
    brands_washer: ['Bosch','LG','Samsung','Kenmore','GE'],
    brands_fridge: ['Bosch','Miele','Samsung','LG','GE','Kenmore'],
    washer_intro: `Idylwylde is one of Edmonton's heritage inner-city east neighbourhoods developed during the 1940s and 1950s, where significant renovation investment over the past two decades has created a mixed appliance profile unlike any other neighbourhood in Edmonton's east end. Original bungalows that have not been renovated retain vintage Kenmore and GE top-load washers — machines 30 to 50 years old that continue to operate through sheer mechanical robustness — while renovated homes feature European front-load platforms like Bosch and LG that were installed as part of high-specification kitchen and laundry room upgrades. Bosch front-load washers in Idylwylde's renovated homes are now 10 to 20 years old and presenting with the characteristic Bosch failure modes: control board F21 errors indicating pump system issues, door lock mechanism failure causing the F16 or E18 error code, and drum bearing noise in heavily used units. LG front-load washers present with LE motor errors, door boot seal deterioration, and drum bearing replacement at the 10 to 15-year service mark. Vintage Kenmore and GE top-load washers in original-condition Idylwylde bungalows present with mechanical timer failure, agitator assembly wear, and pump seal deterioration after 30-plus years of service. EPCOR's hard water at 170 to 200 mg/L affects all platforms in Idylwylde — from scale buildup in vintage pump assemblies to calcium deposits in Bosch's precision detergent dosing system. Fixlify technicians carry proprietary Bosch diagnostic tools alongside vintage Kenmore and GE parts for Idylwylde service calls.`,
    fridge_intro: `Idylwylde presents the most diverse refrigerator landscape of any neighbourhood in Edmonton's east end, combining vintage appliances in original heritage bungalows with premium European and Korean brands in extensively renovated homes. Vintage Kenmore and GE refrigerators remaining in original-condition Idylwylde homes are 40 to 60 years old but often mechanically functional — their sealed systems frequently outlast the control and convenience components around them, meaning compressor relay replacement, evaporator fan swap, and thermostat calibration are often sufficient to restore full function. Bosch and Miele refrigerators in renovated Idylwylde homes bring entirely different service requirements: both require proprietary diagnostic equipment to read fault codes, both use precision components that require OEM replacement (no aftermarket substitutes on these platforms), and both have repair costs that are justified by the high replacement cost of the units. Samsung and LG refrigerators installed in mid-tier renovations present with the characteristic post-warranty failure modes of those platforms: ice maker freeze-up, evaporator ice buildup, and compressor start issues. EPCOR's hard water at 170 to 200 mg/L is a concern across all platforms in Idylwylde — calcified water filters, scaled ice maker fill tubes, and mineral-blocked water dispenser valves are routine findings regardless of brand. Fixlify technicians serving Idylwylde carry diagnostic and parts coverage for all platforms from vintage North American to current European and Korean brands.`,
  },
  {
    slug: 'roper-edmonton',
    name: 'Roper',
    era: '1950s-60s SE industrial-adjacent',
    dist: '18',
    route: '34 Street SE and Whitemud Drive',
    brands_washer: ['GE','Kenmore','Whirlpool','Maytag'],
    brands_fridge: ['GE','Kenmore','Frigidaire','Maytag'],
    washer_intro: `Roper is a southeast Edmonton neighbourhood with an industrial-adjacent residential character developed during the 1950s and 1960s, featuring modest bungalows and working-class homes that have housed the same families for generations. Washing machines in Roper homes are among the oldest residential appliances Fixlify encounters in Edmonton — GE, Kenmore, Whirlpool, and Maytag top-load units installed in the 1970s through early 1990s that are now 30 to 50 years old. These machines have been maintained conservatively: repaired rather than replaced at each failure point, with owners who value longevity and cost-effective service over feature upgrades. The most common presenting issues in Roper washers are mechanical timer failure in machines that predate electronic controls, agitator assembly wear in direct-drive Kenmore and Whirlpool units, pump seal failure causing water leakage under the machine, and lid switch failure preventing the spin cycle from engaging. EPCOR's hard water at 170 to 200 mg/L has been acting on Roper washers for 30 to 50 years, depositing calcium in pump filter baskets, inlet valve screens, and hose connections throughout. Many Roper machines that present with drainage complaints are actually suffering from severe filter basket calcification rather than mechanical pump failure — a professional descale treatment rather than a pump replacement is the appropriate intervention in these cases. Fixlify technicians approach Roper service calls with a repair-first philosophy, carrying vintage GE, Kenmore, and Maytag OEM parts and professional descale equipment as standard.`,
    fridge_intro: `Roper is a southeast Edmonton neighbourhood with a 1950s-60s residential character where the refrigerator stock is among the oldest Fixlify encounters in any Edmonton community. GE, Kenmore, Frigidaire, and Maytag units from the 1970s through 1990s remain in active service in many Roper homes, maintained through successive repair interventions by residents who prioritize practicality and cost-effectiveness over appliance replacement. These vintage refrigerators present with mechanical simplicity that makes them highly repairable: compressor relay replacement, evaporator fan motor exchange, thermostat replacement, and defrost timer servicing are all straightforward repairs that restore years of additional service at a fraction of replacement cost. The sealed refrigeration systems in Roper's vintage units are often the most durable component — Freon-charged systems from the 1980s and early 1990s that have not developed leaks frequently outlast the electrical and mechanical components around them. EPCOR's hard water at 170 to 200 mg/L has scaled ice maker water inlet valves in all Roper refrigerators that have ice makers, and fill tube icing is a common complaint in units where the water line has partially scaled. Fixlify technicians carry vintage compressor relays, evaporator fan motors, defrost heaters, and thermostat assemblies for all platforms common in Roper's housing stock, approaching each job with the goal of maximizing repair value rather than recommending replacement.`,
  },
  {
    slug: 'summerlea',
    name: 'Summerlea',
    era: '1980s-90s W',
    dist: '20',
    route: '170 Street and 87 Avenue',
    brands_washer: ['GE','Whirlpool','Frigidaire','Kenmore'],
    brands_fridge: ['GE','Whirlpool','Frigidaire','Samsung'],
    washer_intro: `Summerlea is an established west Edmonton suburb developed through the 1980s and into the 1990s near 170 Street. The community features single-family homes and townhomes with a stable owner-occupant population that reflects the west end's long-standing family demographic. Washing machines in Summerlea homes are predominantly GE, Whirlpool, and Frigidaire top-load units — the brands most commonly chosen by Edmonton west end buyers during the 1980s and 1990s — now 20 to 35 years old and entering the phase of predictable mechanical decline. GE top-load washers in Summerlea show pump seal failure and water inlet valve corrosion as the most common failure modes, followed by lid switch failure preventing the spin cycle from engaging and motor coupling failure in direct-drive configurations. Whirlpool top-load units present with direct drive transmission coupling failure — the single most common Whirlpool washer complaint in Edmonton — and lid switch failure, both of which are 30-minute same-day repairs with OEM parts. Frigidaire washers in Summerlea show electronic control board failures and door latch issues in front-load models, alongside the mechanical pump seal and inlet valve failures common to all platforms in EPCOR's moderately hard water environment. Front-load washers purchased during 2000s and 2010s renovations in Summerlea are developing door boot seal deterioration and drum bearing noise consistent with 15 to 20 years of daily use. Fixlify technicians carry GE, Whirlpool, and Frigidaire OEM parts as standard truck stock for Summerlea washer service calls.`,
    fridge_intro: `Summerlea is a 1980s-90s west Edmonton suburb where the refrigerator profile reflects the appliance preferences of Edmonton's west end buyer demographic during those decades. GE and Whirlpool refrigerators are the dominant platforms in Summerlea's older homes, while Frigidaire and Samsung units are present in homes that renovated during the 1990s through 2010s. GE and Whirlpool refrigerators from the early 1990s in Summerlea are now 30-plus years old and presenting with the failure modes characteristic of this age: defrost heater burnout causing gradual frost accumulation, evaporator fan motor seizure causing the freezer to lose its fan noise and the refrigerator compartment to warm, compressor start relay failure causing the compressor to click but not start, and ice maker water inlet valve calcification from years of EPCOR's hard water supply. Frigidaire refrigerators in Summerlea show control board relay failures and compressor start capacitor issues at the 20 to 25-year service mark. Samsung refrigerators installed during 2010s renovations in Summerlea are presenting with the characteristic post-warranty failures of Samsung French door units: ice maker freeze-up, evaporator ice buildup behind the freezer back panel, and water dispenser valve failure. Fixlify technicians carry OEM parts for all refrigerator platforms common in Summerlea and diagnose all failure modes with the same proprietary tools used by manufacturer-authorized service centers.`,
  },
  {
    slug: 'oleskiw',
    name: 'Oleskiw',
    era: '1990s-2000s W upscale river valley',
    dist: '22',
    route: 'Whitemud Drive and 215 Street',
    brands_washer: ['LG','Samsung','Whirlpool','Bosch'],
    brands_fridge: ['KitchenAid','Sub-Zero','Samsung','LG','Bosch'],
    washer_intro: `Oleskiw is an upscale west Edmonton neighbourhood developed through the 1990s and 2000s near the North Saskatchewan River valley, featuring executive homes with high-specification construction and premium appliance selections that reflected the purchasing power of this market tier. Washing machines in Oleskiw homes are predominantly LG and Samsung front-load units installed as builder packages in 2000s construction, alongside Whirlpool Duet and Bosch front-load machines selected by buyers who prioritized European performance characteristics in their laundry rooms. LG front-load washers in Oleskiw are now 15 to 25 years old and presenting with the characteristic failure modes of this platform at this age: door boot seal deterioration causing water to leak under the door, drum bearing failure creating grinding noise during spin, and LE motor error codes indicating hall sensor or motor control board issues in heavily used machines. Bosch front-load washers in Oleskiw bring their own diagnostic requirements — Bosch fault codes require proprietary diagnostic tools to read accurately, and Bosch drum bearing and pump replacements require specialized OEM components that differ from North American platforms. Samsung front-load washers in Oleskiw present with door seal and drain pump issues similar to the LG profile, plus Samsung-specific control board fault codes that indicate electronic failures distinct from mechanical ones. EPCOR's hard water at 170 to 200 mg/L has accelerated detergent residue accumulation in Oleskiw's front-load drum seals, contributing to the seal deterioration and door gasket mold growth that is a common secondary finding on service calls in this neighbourhood. Fixlify technicians carry LG, Samsung, and Bosch OEM parts and proprietary diagnostic tools for all Oleskiw service calls.`,
    fridge_intro: `Oleskiw is an upscale west Edmonton neighbourhood where the refrigerator profile is distinctly differentiated from surrounding suburbs: KitchenAid built-in refrigerators, Sub-Zero column units, and Thermador panel-ready models appear alongside Samsung and LG French door refrigerators in homes that renovated during the 2010s. KitchenAid built-in refrigerators in Oleskiw's 1990s-2000s original construction are now 20 to 30 years old and presenting with sealed system issues — compressor wear, refrigerant charge degradation — alongside the more accessible component failures: ice maker assembly replacement, evaporator fan motor exchange, and control board diagnostics. Sub-Zero column refrigerators in Oleskiw bring the highest service complexity: these units require Sub-Zero-specific diagnostic tools and OEM components, and repair costs reflect the premium manufacturing of the platform. Samsung and LG French door refrigerators installed during 2010s renovations in Oleskiw present with post-warranty ice maker failures, evaporator ice buildup, and water dispenser valve issues consistent with the wider pattern across Edmonton. EPCOR's hard water at 170 to 200 mg/L has scaled ice maker water inlet valves and fill tubes across all platforms in Oleskiw, including the premium brands where customers are more likely to notice degraded ice production. Fixlify technicians serving Oleskiw carry diagnostic capabilities and OEM parts for the full premium range of refrigerator brands found in this neighbourhood, from KitchenAid to Samsung.`,
  },
];

function makeId(slug, service) {
  return `${service}-${slug}`.replace(/-+/g, '-');
}

function slugToName(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

const CSS = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth;font-size:16px}body{font-family:'Instrument Sans',-apple-system,sans-serif;background:#fff;color:#0a0a0a;line-height:1.6;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}.container{max-width:1200px;margin:0 auto;padding:0 24px}.breadcrumb{padding:14px 0;border-bottom:1px solid #e5e7eb;background:#fafafa}.breadcrumb .container{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.breadcrumb a{font-size:.8125rem;font-weight:500;color:#6b7280}.breadcrumb-sep{font-size:.8125rem;color:#d1d5db}.breadcrumb-current{font-size:.8125rem;font-weight:600;color:#0a0a0a}.page-hero{padding:56px 0 48px;background:#fff;border-bottom:1px solid #e5e7eb}.page-hero .container{max-width:800px}.page-hero-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#2563eb;margin-bottom:16px}.page-hero-eyebrow::before{content:'';display:block;width:16px;height:2px;background:#2563eb}h1.page-h1{font-size:clamp(1.875rem,4vw,2.75rem);font-weight:700;line-height:1.1;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:24px}.answer-box{background:#eff6ff;border-left:3px solid #2563eb;border-radius:0 6px 6px 0;padding:20px 24px;margin-bottom:32px;font-size:1rem;color:#1e40af;line-height:1.7;font-weight:500}.btn-primary{display:inline-flex;align-items:center;gap:8px;background:#2563eb;color:#fff;font-size:1rem;font-weight:700;padding:14px 24px;border-radius:4px;white-space:nowrap}.btn-primary:hover{background:#1d4ed8}.btn-secondary{display:inline-flex;align-items:center;gap:6px;background:#fff;color:#2563eb;font-size:1rem;font-weight:700;padding:13px 22px;border-radius:4px;border:1.5px solid #2563eb;white-space:nowrap}.trust-bar{background:#0a0a0a;padding:14px 0}.trust-bar-inner{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.trust-item{display:flex;align-items:center;gap:8px;padding:4px 24px;border-right:1px solid rgba(255,255,255,.1);font-size:.8125rem;font-weight:600;color:rgba(255,255,255,.9);white-space:nowrap}.trust-item:last-child{border-right:none}.section-label{font-size:.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#2563eb;margin-bottom:12px}.section-title{font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em;color:#0a0a0a;line-height:1.15;margin-bottom:16px}main.page-main{padding:56px 0 0}.problems-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}.problem-card{background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px}.problem-name{font-size:.9375rem;font-weight:700;color:#0a0a0a;margin-bottom:6px}.problem-desc{font-size:.875rem;color:#6b7280;line-height:1.5}.pricing-table{width:100%;border-collapse:collapse;margin-top:24px;font-size:.9375rem}.pricing-table th,.pricing-table td{padding:12px 16px;border-bottom:1px solid #e5e7eb;text-align:left}.pricing-table th{background:#f9fafb;font-weight:600;color:#0a0a0a;font-size:.8125rem;text-transform:uppercase;letter-spacing:.05em}.pricing-table td:last-child{font-weight:600;color:#2563eb;white-space:nowrap}.faq-item{border-bottom:1px solid #e5e7eb}.faq-question{display:flex;justify-content:space-between;align-items:center;padding:18px 0;cursor:pointer;gap:16px;list-style:none;font-weight:600;font-size:1rem;color:#0a0a0a}.faq-question::-webkit-details-marker{display:none}.faq-icon{font-size:1.25rem;color:#2563eb;flex-shrink:0;transition:transform .2s}details[open] .faq-icon{transform:rotate(45deg)}.faq-answer{padding:0 0 18px;font-size:.9375rem;color:#374151;line-height:1.7}.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}.related-link{display:block;padding:10px 14px;background:#fff;border:1px solid #e5e7eb;border-radius:6px;font-size:.875rem;font-weight:500;color:#2563eb}.brand-chip{display:inline-block;padding:8px 16px;background:#fff;border:1px solid #e5e7eb;border-radius:999px;font-size:.875rem;font-weight:600;color:#0a0a0a}.fade-in{opacity:0;transition:opacity .35s ease}.fade-in.visible{opacity:1}.lz-trust-block{max-width:880px;margin:24px auto;padding:24px 20px;border:1px solid rgba(15,23,42,0.08);border-radius:12px;background:#FAFAFA;font-size:15px;line-height:1.65;color:#374151}.lz-trust-h{font-size:1.2rem;margin:0 0 10px;color:#0f172a;font-weight:700}.lz-trust-intro{margin:0 0 14px;color:#334155}.lz-trust-points{list-style:none;margin:0 0 16px;padding:0;display:grid;gap:8px}.lz-trust-points li{padding-left:22px;position:relative;color:#475569;font-size:14px}.lz-trust-points li::before{content:"\\2713";position:absolute;left:0;top:0;color:#2563eb;font-weight:700}.lz-quick-form{display:grid;gap:10px;padding:14px;border:1px dashed rgba(15,23,42,0.12);border-radius:10px;background:#fff}.lz-quick-form-lead{margin:0 0 4px;font-size:13px;color:#475569}.lz-quick-field{display:flex;flex-direction:column;gap:4px;font-size:12px;color:#475569;font-weight:600}.lz-quick-field input,.lz-quick-field textarea{padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:14px;color:#0f172a;background:#fff;font-family:inherit}.lz-quick-submit{padding:10px 18px;background:#2563eb;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;font-size:14px}footer.fx-footer{background:#0a0a0a;color:rgba(255,255,255,.7);padding:40px 0;margin-top:80px}.fx-footer-inner{max-width:1200px;margin:0 auto;padding:0 24px}.fx-footer-cta-strip{background:#1e3a5f;border-radius:8px;padding:24px;margin-bottom:32px}.fx-footer-cta-content{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}.fx-footer-cta-label{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#93c5fd;display:block;margin-bottom:4px}.fx-footer-cta-text p{color:rgba(255,255,255,.8);font-size:.9rem;margin:0}.fx-footer-cta-btns{display:flex;gap:10px;flex-wrap:wrap}.fx-footer-btn-book{background:#2563eb;color:#fff;padding:10px 20px;border-radius:4px;font-weight:700;font-size:.9rem}.fx-footer-btn-call{background:transparent;color:#93c5fd;padding:10px 20px;border-radius:4px;font-weight:600;font-size:.9rem;border:1px solid rgba(147,197,253,.3)}.fx-footer-columns{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;margin-bottom:32px}.fx-footer-logo{display:flex;align-items:center;gap:8px;margin-bottom:12px}.fx-footer-logo-icon{color:#2563eb}.fx-footer-logo-name{font-weight:700;color:#fff;font-size:1rem}.fx-footer-desc{font-size:.875rem;color:rgba(255,255,255,.6);line-height:1.6;margin-bottom:16px}.fx-footer-address{font-size:.875rem;color:rgba(255,255,255,.6);line-height:1.7}.fx-footer-hours{font-size:.8125rem;color:rgba(255,255,255,.5);margin-top:12px;display:flex;flex-direction:column;gap:2px}.fx-footer-hours strong{color:rgba(255,255,255,.7)}.fx-footer-heading{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin-bottom:12px}.fx-footer-list{list-style:none;display:flex;flex-direction:column;gap:8px}.fx-footer-list a{font-size:.875rem;color:rgba(255,255,255,.6)}.fx-footer-list a:hover{color:#fff}.fx-footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:20px;text-align:center}.fx-copyright{font-size:.8125rem;color:rgba(255,255,255,.3)}.sticky-cta{position:fixed;bottom:24px;right:24px;z-index:200}.sticky-btn{display:flex;align-items:center;gap:8px;padding:12px 20px;border-radius:50px;font-size:.9375rem;font-weight:700;box-shadow:0 4px 16px rgba(0,0,0,.2)}.sticky-book{background:#2563eb;color:#fff}@media(max-width:768px){.problems-grid{grid-template-columns:1fr}.fx-footer-columns{grid-template-columns:1fr}}@media(max-width:640px){h1.page-h1{font-size:1.75rem}.sticky-cta{display:none}}`;

function buildWasherProblems(n) {
  const isVintage = n.era.includes('1940') || n.era.includes('1950') || n.era.includes('1960') || n.era.includes('1970');
  const isNew = n.era.includes('2000');
  if (isNew) {
    return `
      <div class="problem-card"><div class="problem-name">Door boot seal leak</div><div class="problem-desc">Front-load door boot seal deterioration after 10–20 years. Water pools under machine. OEM boot seal replacement same-day.</div></div>
      <div class="problem-card"><div class="problem-name">Drum bearing noise</div><div class="problem-desc">Grinding rumble during spin cycle — rear drum bearing failure at 15–20 years. OEM bearing + tub seal replacement same-day.</div></div>
      <div class="problem-card"><div class="problem-name">Drain pump blockage / error code</div><div class="problem-desc">Samsung 5E or LG drain error. Drain pump blockage or failure. OEM pump replacement same-day with diagnostic.</div></div>
      <div class="problem-card"><div class="problem-name">LE / UE motor error</div><div class="problem-desc">LG LE motor error — hall sensor or motor control board failure. Proprietary diagnostic before repair quote.</div></div>
      <div class="problem-card"><div class="problem-name">Drum seal mold / odor</div><div class="problem-desc">EPCOR hard water + front-load drum creates ideal mold conditions. Professional drum seal cleaning + descale.</div></div>
      <div class="problem-card"><div class="problem-name">Control board fault codes</div><div class="problem-desc">Electronic faults on post-warranty Samsung and LG units. Proprietary diagnostics to isolate electronic vs mechanical failure.</div></div>`;
  }
  if (isVintage) {
    return `
      <div class="problem-card"><div class="problem-name">Transmission coupling failure</div><div class="problem-desc">Direct drive coupling wear — washer runs but drum doesn't turn. 30-minute OEM coupling replacement on Whirlpool/Kenmore platforms.</div></div>
      <div class="problem-card"><div class="problem-name">Lid switch failure / no spin</div><div class="problem-desc">Lid switch failure prevents spin cycle. OEM lid switch replacement — one of the most common same-day repairs in older Edmonton homes.</div></div>
      <div class="problem-card"><div class="problem-name">Mechanical timer failure</div><div class="problem-desc">Timer motor failure prevents cycle advance. OEM timer replacement for vintage Maytag, GE, and Kenmore platforms.</div></div>
      <div class="problem-card"><div class="problem-name">Pump seal leak</div><div class="problem-desc">Water under machine from pump seal failure after 30+ years. OEM pump seal replacement restores watertight operation.</div></div>
      <div class="problem-card"><div class="problem-name">Water inlet valve corrosion</div><div class="problem-desc">EPCOR hard water (170–200 mg/L) corrodes inlet valve screens after 20–40 years. OEM valve replacement same-day.</div></div>
      <div class="problem-card"><div class="problem-name">Agitator assembly wear</div><div class="problem-desc">Agitator dogs and cap wear — machine spins but doesn't agitate. OEM agitator assembly replacement same-day.</div></div>`;
  }
  // mid 1980s-90s
  return `
      <div class="problem-card"><div class="problem-name">Transmission coupling failure</div><div class="problem-desc">Direct drive coupling wear on Whirlpool/Kenmore — drum won't turn. 30-minute OEM coupling replacement same-day.</div></div>
      <div class="problem-card"><div class="problem-name">Lid switch failure / no spin</div><div class="problem-desc">Lid switch failure preventing spin cycle engagement. OEM lid switch replacement — common call in ${n.name}'s 1980s-90s homes.</div></div>
      <div class="problem-card"><div class="problem-name">Water inlet valve failure</div><div class="problem-desc">Inlet valve corrosion from EPCOR hard water — machine won't fill. OEM valve replacement same-day for all major brands.</div></div>
      <div class="problem-card"><div class="problem-name">Pump seal leak</div><div class="problem-desc">Water under machine from pump seal failure after 20–30 years. OEM pump seal replacement restores operation.</div></div>
      <div class="problem-card"><div class="problem-name">Door boot seal leak (front-load)</div><div class="problem-desc">Front-load door boot seal deterioration in 2000s-era renovation machines. OEM boot seal replacement same-day.</div></div>
      <div class="problem-card"><div class="problem-name">Drum bearing noise</div><div class="problem-desc">Grinding during spin in front-load units after 15+ years of use. OEM bearing + tub seal replacement same-day.</div></div>`;
}

function buildFridgeProblems(n) {
  const isNew = n.era.includes('2000');
  const isVintage = n.era.includes('1940') || n.era.includes('1950') || n.era.includes('1960');
  if (isNew) {
    return `
      <div class="problem-card"><div class="problem-name">Ice maker freeze-up / no ice</div><div class="problem-desc">Samsung/LG ice maker fill tube icing — common post-warranty failure. Fill tube inspection + water inlet valve replacement same-day.</div></div>
      <div class="problem-card"><div class="problem-name">Evaporator ice buildup</div><div class="problem-desc">Ice buildup behind freezer back panel causing cooling loss. Defrost heater + thermostat replacement same-day.</div></div>
      <div class="problem-card"><div class="problem-name">Water dispenser valve failure</div><div class="problem-desc">Water dispenser stops working — inlet valve or dispenser actuator failure. OEM parts replacement same-day.</div></div>
      <div class="problem-card"><div class="problem-name">Compressor start issues</div><div class="problem-desc">Refrigerator not cooling — compressor start relay or capacitor failure. OEM relay replacement same-day diagnostic.</div></div>
      <div class="problem-card"><div class="problem-name">Control board fault codes</div><div class="problem-desc">Electronic faults on Samsung and LG control boards. Proprietary diagnostics before any repair quote.</div></div>
      <div class="problem-card"><div class="problem-name">Evaporator fan motor failure</div><div class="problem-desc">Fan noise stops, freezer warms — evaporator fan motor seizure. OEM motor replacement same-day for all major brands.</div></div>`;
  }
  return `
      <div class="problem-card"><div class="problem-name">Defrost heater burnout</div><div class="problem-desc">Gradual frost accumulation in freezer — defrost heater failure. OEM heater + thermostat replacement same-day in ${n.name}.</div></div>
      <div class="problem-card"><div class="problem-name">Evaporator fan motor seizure</div><div class="problem-desc">Fan noise stops, refrigerator warms — OEM evaporator fan motor replacement same-day for all major brands.</div></div>
      <div class="problem-card"><div class="problem-name">Compressor start relay failure</div><div class="problem-desc">Refrigerator clicks but won't cool — compressor start relay failure. OEM relay replacement same-day diagnostic.</div></div>
      <div class="problem-card"><div class="problem-name">Ice maker water valve failure</div><div class="problem-desc">EPCOR hard water (170–200 mg/L) corrodes inlet valve — no ice production. OEM valve replacement same-day.</div></div>
      <div class="problem-card"><div class="problem-name">Temperature control / thermostat</div><div class="problem-desc">Refrigerator or freezer temperature out of range — thermostat or damper door failure. Diagnostic + OEM repair same-day.</div></div>
      <div class="problem-card"><div class="problem-name">Door seal / gasket failure</div><div class="problem-desc">Warm air infiltration from worn door seal — OEM gasket replacement for all major brands in ${n.name}.</div></div>`;
}

function buildWasherPricing(n) {
  const isNew = n.era.includes('2000');
  if (isNew) {
    return `
        <tr><td>Diagnostic visit (waived with repair)</td><td>$65</td></tr>
        <tr><td>Door boot seal replacement</td><td>$180&ndash;$300</td></tr>
        <tr><td>Drum bearing + tub seal</td><td>$280&ndash;$420</td></tr>
        <tr><td>Drain pump replacement</td><td>$160&ndash;$260</td></tr>
        <tr><td>Control board replacement</td><td>$240&ndash;$420</td></tr>
        <tr><td>Water inlet valve</td><td>$120&ndash;$200</td></tr>
        <tr><td>Motor / hall sensor</td><td>$220&ndash;$360</td></tr>`;
  }
  return `
        <tr><td>Diagnostic visit (waived with repair)</td><td>$65</td></tr>
        <tr><td>Transmission coupling replacement</td><td>$120&ndash;$200</td></tr>
        <tr><td>Lid switch replacement</td><td>$100&ndash;$160</td></tr>
        <tr><td>Water inlet valve replacement</td><td>$120&ndash;$200</td></tr>
        <tr><td>Pump seal / pump replacement</td><td>$160&ndash;$280</td></tr>
        <tr><td>Timer / control board</td><td>$180&ndash;$340</td></tr>
        <tr><td>Door boot seal (front-load)</td><td>$180&ndash;$300</td></tr>`;
}

function buildFridgePricing() {
  return `
        <tr><td>Diagnostic visit (waived with repair)</td><td>$65</td></tr>
        <tr><td>Defrost heater + thermostat</td><td>$160&ndash;$280</td></tr>
        <tr><td>Evaporator fan motor</td><td>$140&ndash;$240</td></tr>
        <tr><td>Compressor start relay</td><td>$120&ndash;$200</td></tr>
        <tr><td>Ice maker assembly</td><td>$180&ndash;$320</td></tr>
        <tr><td>Water inlet valve</td><td>$120&ndash;$200</td></tr>
        <tr><td>Control board</td><td>$240&ndash;$440</td></tr>`;
}

function buildPage(n, service, title, metaDesc, h1, breadcrumbParent, breadcrumbParentHref, answerBoxText, quickAnswerText, h2Text, introText, problemsHTML, brands, pricingTitle, pricingDesc, pricingRows, bookingTitle, faqItems, relatedLinks, ctaH2, ctaP, serviceTypeSchema, faqSchema, footerCta, footerNeighbours, copyrightLabel, serviceLabel) {
  const id = makeId(n.slug, service.replace('-', ''));
  const url = `https://fixlifyservices.com/${service}-${n.slug}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${metaDesc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/tokens.css">
<style>${CSS}</style>
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${metaDesc}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Fixlify Appliance Services">
<meta property="og:image" content="https://fixlifyservices.com/og-image.jpg">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"ProfessionalService","@id":"${url}#business","name":"${serviceTypeSchema} ${n.name} Edmonton","description":"${serviceTypeSchema} in ${n.name}, Edmonton. Same-day service, $65 diagnostic, 90-day warranty.","url":"${url}","priceRange":"$","address":{"@type":"PostalAddress","streetAddress":"10025 102A Avenue NW Suite 1000","addressLocality":"Edmonton","addressRegion":"AB","postalCode":"T5J 2Z2","addressCountry":"CA"},"areaServed":[{"@type":"City","name":"Edmonton"},{"@type":"Neighborhood","name":"${n.name}"}],"serviceType":"${serviceTypeSchema}"}
<\/script>
</head>
<body>
<div id="header-placeholder"></div>
<script src="/includes/header-loader.js" defer><\/script>
<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="container"><a href="/">Home</a><span class="breadcrumb-sep">/</span><a href="${breadcrumbParentHref}">${breadcrumbParent}</a><span class="breadcrumb-sep">/</span><span class="breadcrumb-current">${n.name}</span></div>
</nav>
<section class="page-hero" aria-label="Page header">
  <div class="container">
    <div class="page-hero-eyebrow">Fixlify Appliance Services &middot; ${n.name}, Edmonton</div>
    <h1 class="page-h1">${h1}</h1>
    <section class="lz-trust-block" aria-labelledby="lz-h-${id}">
      <h2 id="lz-h-${id}" class="lz-trust-h">Why ${n.name} residents choose Fixlify for ${serviceLabel.toLowerCase()}</h2>
      <p class="lz-trust-intro">Our <strong>founder Alex</strong> leads 6 TSSA-licensed, insured technicians with 30+ years combined experience since 2017. Written quote, 90-day parts &amp; labour warranty on every repair.</p>
      <ul class="lz-trust-points">
        <li><strong>Same-day service</strong> when you book before 12 PM on a weekday.</li>
        <li><strong>All brands</strong> &mdash; ${brands.slice(0,3).join(', ')} &amp; more.</li>
        <li><strong>~${n.dist} min from downtown</strong> via ${n.route}.</li>
      </ul>
      <form class="lz-quick-form" action="/contact" method="post" aria-label="Quick repair request">
        <p class="lz-quick-form-lead">Send a quick request &mdash; we'll respond within 30 minutes.</p>
        <label class="lz-quick-field"><span>Your name</span><input type="text" name="name" autocomplete="name" required></label>
        <label class="lz-quick-field"><span>Phone number</span><input type="tel" name="phone" autocomplete="tel" required></label>
        <label class="lz-quick-field"><span>Neighbourhood</span><input type="text" name="city" value="${n.name}, Edmonton" autocomplete="address-level2"></label>
        <label class="lz-quick-field"><span>What needs fixing?</span><textarea name="issue" rows="3" placeholder="e.g. ${serviceLabel.toLowerCase()} not working"></textarea></label>
        <button type="submit" class="lz-quick-submit">Request a callback</button>
      </form>
    </section>
    <div class="answer-box">${answerBoxText}</div>
    <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="btn-secondary" target="_blank" rel="noopener">Book Online &rarr;</a></div>
  </div>
</section>
<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem 1.25rem;margin:1rem auto;max-width:900px;border-radius:0 8px 8px 0">
  <div style="font-size:.7rem;font-weight:700;letter-spacing:.08em;color:#2563eb;text-transform:uppercase;margin-bottom:.4rem">Quick Answer</div>
  <p style="margin:0;color:#1e3a5f;font-size:.9rem;line-height:1.6">${quickAnswerText}</p>
</div>
<div class="trust-bar"><div class="trust-bar-inner"><div class="trust-item">&#128176; $65 flat diagnostic</div><div class="trust-item">&#10003; No Hidden Fees</div><div class="trust-item">&#9873; Same-Day Service</div><div class="trust-item">&#128737; 90-Day Warranty</div></div></div>
<main class="page-main container" id="main-content">
  <div class="fade-in" style="max-width:760px;font-size:1.0625rem;color:#374151;line-height:1.75;margin-bottom:56px">
    <h2 style="font-size:1.375rem;font-weight:700;color:#0a0a0a;margin-bottom:16px">${h2Text}</h2>
    <p>Who fixes ${serviceLabel.toLowerCase()}s in ${n.name}? <strong>Fixlify Appliance Services Edmonton</strong> &mdash; same-day ${serviceLabel.toLowerCase()} repair throughout ${n.name} and surrounding Edmonton communities. Book online or email <a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a>. Flat <strong>$65 diagnostic</strong>, Mon&ndash;Sat 8AM&ndash;8PM, Sun 10AM&ndash;6PM Mountain Time. Typical cost: <strong>$120&ndash;$380 CAD</strong>. <strong>90-day warranty</strong> on every repair.</p>
    <p>${introText}</p>
    <p>Our Edmonton hub at 10025 102A Avenue NW dispatches to ${n.name} in approximately ${n.dist} minutes via ${n.route}.</p>
  </div>
  <section style="padding:48px 0;border-top:1px solid #e5e7eb">
    <div class="section-label">Common issues</div>
    <h2 class="section-title">Common ${n.name} ${serviceTypeSchema} Problems</h2>
    <div class="problems-grid">${problemsHTML}</div>
  </section>
  <section style="margin-top:48px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Brand expertise</div>
    <h2 class="section-title">${serviceTypeSchema} Brands We Service in ${n.name}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:8px;max-width:880px">${brands.map(b => `<span class="brand-chip">${b}</span>`).join('')}</div>
  </section>
  <section style="margin-top:56px">
    <div class="section-label">Transparent pricing</div>
    <h2 class="section-title">${pricingTitle}</h2>
    <p style="max-width:760px;color:#374151;line-height:1.7;margin-bottom:20px">${pricingDesc}</p>
    <table class="pricing-table" style="max-width:760px">
      <thead><tr><th>Repair type</th><th>Typical range (parts + labour)</th></tr></thead>
      <tbody>${pricingRows}</tbody>
    </table>
    <p style="font-size:.8125rem;color:#6b7280;margin-top:12px">All prices include parts, labour, and a <strong>90-day warranty</strong>.</p>
  </section>
  <section class="fade-in" style="margin-top:56px;padding:56px 0;border-top:1px solid #e5e7eb;text-align:center">
    <div class="section-label">Online booking</div>
    <h2 style="font-size:1.75rem;font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:12px">${bookingTitle}</h2>
    <p style="color:#6b7280;margin-bottom:24px">Real-time availability, instant confirmation.</p>
    <iframe id="fxbk-${id}" src="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce?embed=true" style="width:100%;height:600px;border:none;display:block" title="Book a Service" loading="lazy" allowtransparency="true"></iframe>
    <script>window.addEventListener('message',function(e){if(e.data&&e.data.type==='fixlify-resize'){var el=document.getElementById('fxbk-${id}');if(el)el.style.height=e.data.height+'px'}});<\/script>
    <p style="font-size:.9375rem;color:#6b7280;margin-top:16px">Prefer email? <a href="mailto:edmonton@fixlifyservices.com" style="color:#2563eb;font-weight:600">edmonton@fixlifyservices.com</a></p>
  </section>
  <section style="padding:56px 0;border-top:1px solid #e5e7eb">
    <h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:32px">FAQ &mdash; ${serviceTypeSchema} in ${n.name}</h2>
    ${faqItems}
  </section>
  <section style="margin-top:56px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Other ${n.name} services</div>
    <h2 class="section-title">Other Appliance Repair in ${n.name}</h2>
    <div class="related-grid">${relatedLinks}</div>
  </section>
  <section style="margin-top:56px;padding:40px;background:#0a0a0a;border-radius:8px;text-align:center;color:#fff">
    <h2 style="font-size:1.75rem;font-weight:700;color:#fff;margin-bottom:12px">${ctaH2}</h2>
    <p style="color:rgba(255,255,255,.8);margin-bottom:24px;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.6">${ctaP}</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="btn-primary" target="_blank" rel="noopener">Book Online &rarr;</a>
      <a href="mailto:edmonton@fixlifyservices.com" class="btn-secondary">Email Edmonton Team</a>
    </div>
  </section>
</main>
<script type="application/ld+json">
${faqSchema}
<\/script>
<footer class="fx-footer" role="contentinfo"><div class="fx-footer-inner">
  <div class="fx-footer-cta-strip"><div class="fx-footer-cta-content"><div class="fx-footer-cta-text"><span class="fx-footer-cta-label">Edmonton Appliance Repair</span><p>${footerCta}</p></div><div class="fx-footer-cta-btns"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="fx-footer-btn-book" rel="noopener">Book Online Now</a><a href="mailto:edmonton@fixlifyservices.com" class="fx-footer-btn-call">edmonton@fixlifyservices.com</a></div></div></div>
  <div class="fx-footer-columns">
    <div class="fx-footer-col fx-footer-brand"><div class="fx-footer-logo"><div class="fx-footer-logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg></div><span class="fx-footer-logo-name">Fixlify</span></div><p class="fx-footer-desc">Edmonton Appliance Repair. ${n.name} and all Edmonton CMA communities.</p><address class="fx-footer-address" style="font-style:normal;margin:14px 0">10025 102A Avenue NW, Suite 1000<br>Edmonton, AB T5J 2Z2</address><div class="fx-footer-hours"><strong>Service Hours (Mountain Time)</strong><span>Monday&ndash;Saturday: 8 AM &ndash; 8 PM</span><span>Sunday: 10 AM &ndash; 6 PM</span></div></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Services</h4><ul class="fx-footer-list"><li><a href="/services/refrigerator-repair-edmonton/">Fridge Repair Edmonton</a></li><li><a href="/services/washer-repair-edmonton/">Washer Repair Edmonton</a></li><li><a href="/services/dishwasher-repair-edmonton/">Dishwasher Repair Edmonton</a></li></ul></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Neighbourhoods</h4><ul class="fx-footer-list">${footerNeighbours}</ul></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Quick Links</h4><ul class="fx-footer-list"><li><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" rel="noopener">Book Online</a></li><li><a href="/about/">About Us</a></li><li><a href="/sitemap.xml">Sitemap</a></li></ul><h4 class="fx-footer-heading" style="margin-top:24px">Contact</h4><ul class="fx-footer-list"><li><a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a></li></ul></div>
  </div>
  <div class="fx-footer-bottom"><p class="fx-copyright">&copy; <span id="fx-yr-${id}"></span> Fixlify Appliance Repair Edmonton | ${n.name} | Online Booking Available</p></div>
</div></footer>
<script>(function(){var el=document.getElementById('fx-yr-${id}');if(el)el.textContent=new Date().getFullYear()})()</script>
<div class="sticky-cta"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="sticky-btn sticky-book" target="_blank" rel="noopener">Book Online &rarr;</a></div>
<script>document.addEventListener('DOMContentLoaded',function(){var els=document.querySelectorAll('.fade-in');if('IntersectionObserver' in window){var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.1});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('visible')})}})</script>
</body>
</html>`;
}

let count = 0;

for (const n of neighborhoods) {
  // WASHER PAGE
  const wSlug = `washer-repair-${n.slug}`;
  const wBrands = n.brands_washer;
  const wProblems = buildWasherProblems(n);
  const wPricingRows = buildWasherPricing(n);
  const wFaqSchema = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":`How fast can you reach ${n.name}?`,"acceptedAnswer":{"@type":"Answer","text":`Approximately ${n.dist} minutes via ${n.route}. Same-day service when you book before 12 PM Monday–Saturday.`}},{"@type":"Question","name":`How much does washer repair cost in ${n.name}?`,"acceptedAnswer":{"@type":"Answer","text":`Typical washer repair in ${n.name} runs $120–$380 CAD. Flat $65 diagnostic waived with repair. 90-day warranty.`}}]});

  const wHtml = buildPage(
    n,
    'washer-repair',
    `Washer Repair ${n.name} Edmonton | From $65 | Same-Day Service`,
    `Washer Repair in ${n.name}, Edmonton — same-day service, flat $65 diagnostic, 90-day warranty. ${wBrands.slice(0,2).join(', ')} &amp; all brands. Book online or email edmonton@fixlifyservices.com.`,
    `Washer Repair in ${n.name}, Edmonton`,
    'Washer Repair Edmonton', '/washer-repair-edmonton',
    `Fixlify provides same-day washer repair in ${n.name}, Edmonton. We fix all brands &mdash; ${wBrands.slice(0,3).join(', ')} &amp; more. $120&ndash;$380 CAD typical cost, 90-day warranty. Book online or email edmonton@fixlifyservices.com.`,
    `Fixlify provides same-day washer repair in ${n.name}, Edmonton &mdash; 7 days a week. $120&ndash;$380 CAD typical cost. ${wBrands.slice(0,3).join(', ')}. 90-day parts &amp; labour warranty.`,
    `Washer Repair in ${n.name} &mdash; ${n.era} Edmonton`,
    n.washer_intro,
    wProblems,
    wBrands,
    `Washer Repair Pricing in ${n.name}`,
    `All ${n.name} repairs start with a flat <strong>$65 diagnostic</strong>, waived when you proceed with the repair. Written quote before any work begins.`,
    wPricingRows,
    `Book Washer Repair in ${n.name}`,
    `<details class="faq-item"><summary class="faq-question"><span>How fast can you reach ${n.name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Approximately ${n.dist} minutes from our Edmonton hub via ${n.route}. Same-day service when you book before 12 PM Monday&ndash;Saturday. Sunday crew available 10 AM&ndash;6 PM Mountain Time.</p></div></details>
    <details class="faq-item"><summary class="faq-question"><span>Do you repair ${wBrands[0]} washers in ${n.name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Yes &mdash; ${wBrands[0]} and ${wBrands[1]} are among the most common washer brands in ${n.name}. We carry OEM parts as standard truck stock for same-day repair on all major platforms.</p></div></details>
    <details class="faq-item"><summary class="faq-question"><span>How much does washer repair cost in ${n.name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Typical washer repair in ${n.name} runs $120&ndash;$380 CAD including parts and labour. Flat $65 diagnostic waived when you proceed with the repair. Written quote before any work begins. 90-day parts and labour warranty.</p></div></details>
    <details class="faq-item"><summary class="faq-question"><span>Do you warranty washer repairs in ${n.name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Yes &mdash; every washer repair in ${n.name} includes a 90-day parts and labour warranty. Same fault within 90 days: we return at no charge.</p></div></details>`,
    `<a href="/dishwasher-repair-${n.slug}" class="related-link">Dishwasher Repair &mdash; ${n.name}</a>
      <a href="/fridge-repair-${n.slug}" class="related-link">Fridge Repair &mdash; ${n.name}</a>
      <a href="/washer-repair-edmonton" class="related-link">Washer Repair &mdash; Edmonton</a>`,
    `Ready to book washer repair in ${n.name}?`,
    `Same-day service, $65 flat diagnostic, written quote before any work, 90-day warranty.`,
    'Washer Repair',
    wFaqSchema,
    `Book online &mdash; ${n.name} and all Edmonton CMA.`,
    `<li><a href="/${wSlug}">${n.name}</a></li><li><a href="/washer-repair-edmonton">Edmonton</a></li>`,
    n.name,
    'Washer Repair'
  );

  fs.writeFileSync(`C:/fixlifyservices/${wSlug}.html`, wHtml);
  count++;

  // FRIDGE PAGE
  const fSlug = `fridge-repair-${n.slug}`;
  const fBrands = n.brands_fridge;
  const fProblems = buildFridgeProblems(n);
  const fPricingRows = buildFridgePricing();
  const fFaqSchema = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":`How fast can you reach ${n.name}?`,"acceptedAnswer":{"@type":"Answer","text":`Approximately ${n.dist} minutes via ${n.route}. Same-day service when you book before 12 PM Monday–Saturday.`}},{"@type":"Question","name":`How much does fridge repair cost in ${n.name}?`,"acceptedAnswer":{"@type":"Answer","text":`Typical fridge repair in ${n.name} runs $120–$380 CAD. Flat $65 diagnostic waived with repair. 90-day warranty.`}}]});

  const fHtml = buildPage(
    n,
    'fridge-repair',
    `Fridge Repair ${n.name} Edmonton | From $65 | Same-Day Service`,
    `Fridge Repair in ${n.name}, Edmonton — same-day service, flat $65 diagnostic, 90-day warranty. ${fBrands.slice(0,2).join(', ')} &amp; all brands. Book online or email edmonton@fixlifyservices.com.`,
    `Fridge Repair in ${n.name}, Edmonton`,
    'Fridge Repair Edmonton', '/fridge-repair-edmonton',
    `Fixlify provides same-day fridge repair in ${n.name}, Edmonton. We fix all brands &mdash; ${fBrands.slice(0,3).join(', ')} &amp; more. $120&ndash;$380 CAD typical cost, 90-day warranty. Book online or email edmonton@fixlifyservices.com.`,
    `Fixlify provides same-day fridge repair in ${n.name}, Edmonton &mdash; 7 days a week. $120&ndash;$380 CAD typical cost. ${fBrands.slice(0,3).join(', ')}. 90-day parts &amp; labour warranty.`,
    `Fridge Repair in ${n.name} &mdash; ${n.era} Edmonton`,
    n.fridge_intro,
    fProblems,
    fBrands,
    `Fridge Repair Pricing in ${n.name}`,
    `All ${n.name} fridge repairs start with a flat <strong>$65 diagnostic</strong>, waived when you proceed with the repair. Written quote before any work begins.`,
    fPricingRows,
    `Book Fridge Repair in ${n.name}`,
    `<details class="faq-item"><summary class="faq-question"><span>How fast can you reach ${n.name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Approximately ${n.dist} minutes from our Edmonton hub via ${n.route}. Same-day service when you book before 12 PM Monday&ndash;Saturday. Sunday crew available 10 AM&ndash;6 PM Mountain Time.</p></div></details>
    <details class="faq-item"><summary class="faq-question"><span>Do you repair ${fBrands[0]} refrigerators in ${n.name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Yes &mdash; ${fBrands[0]} and ${fBrands[1]} are among the most common refrigerator brands in ${n.name}. We carry OEM parts as standard truck stock for same-day repair on all major platforms.</p></div></details>
    <details class="faq-item"><summary class="faq-question"><span>How much does fridge repair cost in ${n.name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Typical fridge repair in ${n.name} runs $120&ndash;$380 CAD including parts and labour. Flat $65 diagnostic waived when you proceed with the repair. Written quote before any work begins. 90-day parts and labour warranty.</p></div></details>
    <details class="faq-item"><summary class="faq-question"><span>Do you warranty fridge repairs in ${n.name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Yes &mdash; every fridge repair in ${n.name} includes a 90-day parts and labour warranty. Same fault within 90 days: we return at no charge.</p></div></details>`,
    `<a href="/dishwasher-repair-${n.slug}" class="related-link">Dishwasher Repair &mdash; ${n.name}</a>
      <a href="/washer-repair-${n.slug}" class="related-link">Washer Repair &mdash; ${n.name}</a>
      <a href="/fridge-repair-edmonton" class="related-link">Fridge Repair &mdash; Edmonton</a>`,
    `Ready to book fridge repair in ${n.name}?`,
    `Same-day service, $65 flat diagnostic, written quote before any work, 90-day warranty.`,
    'Fridge Repair',
    fFaqSchema,
    `Book online &mdash; ${n.name} and all Edmonton CMA.`,
    `<li><a href="/${fSlug}">${n.name}</a></li><li><a href="/fridge-repair-edmonton">Edmonton</a></li>`,
    n.name,
    'Fridge Repair'
  );

  fs.writeFileSync(`C:/fixlifyservices/${fSlug}.html`, fHtml);
  count++;
}

console.log(`Generated ${count} pages.`);
