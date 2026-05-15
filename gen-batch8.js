const fs = require('fs');

const CSS = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth;font-size:16px}body{font-family:'Instrument Sans',-apple-system,sans-serif;background:#fff;color:#0a0a0a;line-height:1.6;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}.container{max-width:1200px;margin:0 auto;padding:0 24px}.breadcrumb{padding:14px 0;border-bottom:1px solid #e5e7eb;background:#fafafa}.breadcrumb .container{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.breadcrumb a{font-size:.8125rem;font-weight:500;color:#6b7280}.breadcrumb-sep{font-size:.8125rem;color:#d1d5db}.breadcrumb-current{font-size:.8125rem;font-weight:600;color:#0a0a0a}.page-hero{padding:56px 0 48px;background:#fff;border-bottom:1px solid #e5e7eb}.page-hero .container{max-width:800px}.page-hero-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#2563eb;margin-bottom:16px}.page-hero-eyebrow::before{content:'';display:block;width:16px;height:2px;background:#2563eb}h1.page-h1{font-size:clamp(1.875rem,4vw,2.75rem);font-weight:700;line-height:1.1;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:24px}.answer-box{background:#eff6ff;border-left:3px solid #2563eb;border-radius:0 6px 6px 0;padding:20px 24px;margin-bottom:32px;font-size:1rem;color:#1e40af;line-height:1.7;font-weight:500}.btn-primary{display:inline-flex;align-items:center;gap:8px;background:#2563eb;color:#fff;font-size:1rem;font-weight:700;padding:14px 24px;border-radius:4px;white-space:nowrap}.btn-primary:hover{background:#1d4ed8}.btn-secondary{display:inline-flex;align-items:center;gap:6px;background:#fff;color:#2563eb;font-size:1rem;font-weight:700;padding:13px 22px;border-radius:4px;border:1.5px solid #2563eb;white-space:nowrap}.trust-bar{background:#0a0a0a;padding:14px 0}.trust-bar-inner{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.trust-item{display:flex;align-items:center;gap:8px;padding:4px 24px;border-right:1px solid rgba(255,255,255,.1);font-size:.8125rem;font-weight:600;color:rgba(255,255,255,.9);white-space:nowrap}.trust-item:last-child{border-right:none}.section-label{font-size:.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#2563eb;margin-bottom:12px}.section-title{font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em;color:#0a0a0a;line-height:1.15;margin-bottom:16px}main.page-main{padding:56px 0 0}.problems-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}.problem-card{background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px}.problem-name{font-size:.9375rem;font-weight:700;color:#0a0a0a;margin-bottom:6px}.problem-desc{font-size:.875rem;color:#6b7280;line-height:1.5}.pricing-table{width:100%;border-collapse:collapse;margin-top:24px;font-size:.9375rem}.pricing-table th,.pricing-table td{padding:12px 16px;border-bottom:1px solid #e5e7eb;text-align:left}.pricing-table th{background:#f9fafb;font-weight:600;color:#0a0a0a;font-size:.8125rem;text-transform:uppercase;letter-spacing:.05em}.pricing-table td:last-child{font-weight:600;color:#2563eb;white-space:nowrap}.faq-item{border-bottom:1px solid #e5e7eb}.faq-question{display:flex;justify-content:space-between;align-items:center;padding:18px 0;cursor:pointer;gap:16px;list-style:none;font-weight:600;font-size:1rem;color:#0a0a0a}.faq-question::-webkit-details-marker{display:none}.faq-icon{font-size:1.25rem;color:#2563eb;flex-shrink:0;transition:transform .2s}details[open] .faq-icon{transform:rotate(45deg)}.faq-answer{padding:0 0 18px;font-size:.9375rem;color:#374151;line-height:1.7}.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}.related-link{display:block;padding:10px 14px;background:#fff;border:1px solid #e5e7eb;border-radius:6px;font-size:.875rem;font-weight:500;color:#2563eb}.brand-chip{display:inline-block;padding:8px 16px;background:#fff;border:1px solid #e5e7eb;border-radius:999px;font-size:.875rem;font-weight:600;color:#0a0a0a}.fade-in{opacity:0;transition:opacity .35s ease}.fade-in.visible{opacity:1}.lz-trust-block{max-width:880px;margin:24px auto;padding:24px 20px;border:1px solid rgba(15,23,42,0.08);border-radius:12px;background:#FAFAFA;font-size:15px;line-height:1.65;color:#374151}.lz-trust-h{font-size:1.2rem;margin:0 0 10px;color:#0f172a;font-weight:700}.lz-trust-intro{margin:0 0 14px;color:#334155}.lz-trust-points{list-style:none;margin:0 0 16px;padding:0;display:grid;gap:8px}.lz-trust-points li{padding-left:22px;position:relative;color:#475569;font-size:14px}.lz-trust-points li::before{content:"\\2713";position:absolute;left:0;top:0;color:#2563eb;font-weight:700}.lz-quick-form{display:grid;gap:10px;padding:14px;border:1px dashed rgba(15,23,42,0.12);border-radius:10px;background:#fff}.lz-quick-form-lead{margin:0 0 4px;font-size:13px;color:#475569}.lz-quick-field{display:flex;flex-direction:column;gap:4px;font-size:12px;color:#475569;font-weight:600}.lz-quick-field input,.lz-quick-field textarea{padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:14px;color:#0f172a;background:#fff;font-family:inherit}.lz-quick-submit{padding:10px 18px;background:#2563eb;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;font-size:14px}footer.fx-footer{background:#0a0a0a;color:rgba(255,255,255,.7);padding:40px 0;margin-top:80px}.fx-footer-inner{max-width:1200px;margin:0 auto;padding:0 24px}.fx-footer-cta-strip{background:#1e3a5f;border-radius:8px;padding:24px;margin-bottom:32px}.fx-footer-cta-content{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}.fx-footer-cta-label{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#93c5fd;display:block;margin-bottom:4px}.fx-footer-cta-text p{color:rgba(255,255,255,.8);font-size:.9rem;margin:0}.fx-footer-cta-btns{display:flex;gap:10px;flex-wrap:wrap}.fx-footer-btn-book{background:#2563eb;color:#fff;padding:10px 20px;border-radius:4px;font-weight:700;font-size:.9rem}.fx-footer-btn-call{background:transparent;color:#93c5fd;padding:10px 20px;border-radius:4px;font-weight:600;font-size:.9rem;border:1px solid rgba(147,197,253,.3)}.fx-footer-columns{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;margin-bottom:32px}.fx-footer-logo{display:flex;align-items:center;gap:8px;margin-bottom:12px}.fx-footer-logo-icon{color:#2563eb}.fx-footer-logo-name{font-weight:700;color:#fff;font-size:1rem}.fx-footer-desc{font-size:.875rem;color:rgba(255,255,255,.6);line-height:1.6;margin-bottom:16px}.fx-footer-address{font-size:.875rem;color:rgba(255,255,255,.6);line-height:1.7}.fx-footer-hours{font-size:.8125rem;color:rgba(255,255,255,.5);margin-top:12px;display:flex;flex-direction:column;gap:2px}.fx-footer-hours strong{color:rgba(255,255,255,.7)}.fx-footer-heading{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin-bottom:12px}.fx-footer-list{list-style:none;display:flex;flex-direction:column;gap:8px}.fx-footer-list a{font-size:.875rem;color:rgba(255,255,255,.6)}.fx-footer-list a:hover{color:#fff}.fx-footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:20px;text-align:center}.fx-copyright{font-size:.8125rem;color:rgba(255,255,255,.3)}.sticky-cta{position:fixed;bottom:24px;right:24px;z-index:200}.sticky-btn{display:flex;align-items:center;gap:8px;padding:12px 20px;border-radius:50px;font-size:.9375rem;font-weight:700;box-shadow:0 4px 16px rgba(0,0,0,.2)}.sticky-book{background:#2563eb;color:#fff}@media(max-width:768px){.problems-grid{grid-template-columns:1fr}.fx-footer-columns{grid-template-columns:1fr}}@media(max-width:640px){h1.page-h1{font-size:1.75rem}.sticky-cta{display:none}}`;

const FOOTER_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>`;

const neighborhoods = [
  {
    slug: 'kirkness',
    name: 'Kirkness',
    era: '1970s-80s NE',
    time: 22,
    route: '97 Street NE and 144 Avenue NE',
    brands: { dishwasher: ['Whirlpool','GE','Kenmore','Maytag'], washer: ['Whirlpool','GE','Kenmore','Maytag'], fridge: ['Whirlpool','GE','Kenmore','Frigidaire'] },
    dishwasherPara: `Kirkness is a northeast Edmonton suburb established primarily between the mid-1970s and mid-1980s, situated adjacent to Matt Berry with a very similar housing profile of bungalows, bi-levels, and split-level homes. The dishwasher fleet in Kirkness homes spans two to three replacement cycles since original construction — the dominant appliances today are Whirlpool, GE, Kenmore, and Maytag units installed between the late 1990s and early 2010s, now 15 to 25 years old. Kirkness kitchens were frequently renovated during the 2000s Edmonton real estate boom, and many of the dishwashers installed during those renovations are now past their practical service life. EPCOR hard water at 170–200 mg/L has created persistent calcium scale deposits in the spray arms, filters, and door seals of Kirkness dishwashers — homes that were renovated during the 2000s without installing water softeners experience the most severe scale accumulation. The neighbourhood's mature residential streets and established community character mean service requests come from long-term homeowners who prefer repair over replacement, making Kirkness a high-value service area for our technicians. Drain pump failure and heating element burnouts account for the majority of Kirkness dishwasher dispatches, with aging control boards on Whirlpool and GE platforms representing a growing share of calls as the 2000s-era appliances reach the 15-year mark.`,
    washerPara: `Kirkness is a mature NE Edmonton suburb where top-load washer repair dominates the service call mix. Whirlpool, GE, and Kenmore top-load units from the 2000s renovation boom are the most frequently serviced washers in Kirkness. These machines — now 15 to 25 years old — show predictable wear: transmission failure, water inlet valve failure, lid switch wear, and drive belt or coupler failure on agitator-type top-loaders. Kenmore machines in Kirkness often share Whirlpool platforms, so our technicians carry parts that cover both brands from the same truck stock. A secondary wave of Samsung and LG front-loaders purchased by Kirkness homeowners upgrading in the 2010s is now reaching the 10–15 year service window, with door boot seal failures and bearing noise becoming more common on these units. Edmonton's cold winters create thermal stress on washer control boards and water inlet valves, and Kirkness basements — where most laundry machines are located in this bungalow-heavy suburb — can see dramatic temperature fluctuations during shoulder seasons.`,
    fridgePara: `Kirkness fridge repair calls reflect the neighbourhood's 1970s-80s origin and multiple renovation cycles. The dominant refrigerator types are Whirlpool and GE side-by-sides and top-mount units installed during 1990s and 2000s kitchen upgrades — now 15 to 25 years old and well past warranty. The most common Kirkness fridge repair calls involve evaporator fan motor failure causing warm fridge and warm freezer simultaneously, defrost system failure with ice buildup on the rear evaporator wall, and water inlet valve failure on units with ice makers or water dispensers. Kenmore-badged units in Kirkness share Whirlpool or LG internal platforms, and our technicians identify the OEM platform at diagnosis to source correct parts. The neighbourhood's older construction means some homes still have original kitchen layouts with space-constrained built-in refrigerators, and our technicians are experienced with confined installation access.`,
  },
  {
    slug: 'homesteader-edmonton',
    name: 'Homesteader',
    era: '1970s-80s NE',
    time: 20,
    route: '97 Street NE and 137 Avenue NE',
    brands: { dishwasher: ['Maytag','Kenmore','GE','Whirlpool'], washer: ['Maytag','Kenmore','Whirlpool','GE'], fridge: ['GE','Kenmore','Whirlpool','Maytag'] },
    dishwasherPara: `Homesteader is a working-class northeast Edmonton suburb developed through the 1970s and 1980s, characterized by modest bungalows and semi-detached homes on a regular street grid. The neighbourhood has a strong sense of community identity and long-term owner-occupancy, with many households having lived in the same home for 20 to 30 years. The dishwashers in Homesteader homes reflect this longevity — Maytag, Kenmore, and GE units installed in the early to mid-2000s are now the dominant appliances, having replaced original dishwashers from the 1980s. These 15–25 year-old machines are showing the full range of age-related failures: pump motor wear, heating element burnout, and progressive door gasket degradation. EPCOR hard water at 170–200 mg/L is a defining condition for Homesteader dishwashers, and the neighbourhood's older homes almost universally lack water softeners. The calcium load delivered by decades of untreated EPCOR water has partially calcified spray arms and filter assemblies in many Homesteader dishwashers, compressing the drain pump's operational envelope and leading to drain failure as the presenting symptom. Homesteader households tend to prefer repair over replacement given the cost-consciousness of the neighbourhood's demographics and the fact that many of the appliances in question still have usable structural life remaining.`,
    washerPara: `Homesteader's working-class residential character means washers are used hard and maintained conservatively. Top-load Maytag, Kenmore, and Whirlpool machines from the early-to-mid 2000s form the backbone of the Homesteader washer service call profile. These units, now 15 to 25 years old, show wear in the transmission, lid switch, water pump, and drive system — predictable failures for high-cycle residential top-loaders. Maytag washers in Homesteader frequently present with transmission failure causing agitation loss, and Kenmore units on Whirlpool platforms show drive block and coupler wear. Many Homesteader households run their washers on full loads at hot water settings, which accelerates basket seal and bearing wear. Our technicians carry full parts kits for Maytag, Kenmore, and Whirlpool top-load platforms and can complete most Homesteader washer repairs in a single same-day visit.`,
    fridgePara: `Homesteader fridge calls tend to involve older Maytag, GE, and Kenmore units — the working-class suburb's repair-over-replace culture means these appliances run until service is unavoidable. Top-mount freezer units from the early 2000s still operate in many Homesteader kitchens. Common faults include defrost thermostat failure causing ice buildup on the evaporator coil, door gasket wear reducing cooling efficiency, and evaporator fan motor bearing failure causing warm fresh food compartments. The neighbourhood's older electrical service can contribute to voltage fluctuation affecting compressor and control board longevity. We diagnose all Homesteader fridge makes with a flat $65 diagnostic, provide a written quote, and complete most repairs same-day.`,
  },
  {
    slug: 'montrose-edmonton',
    name: 'Montrose',
    era: '1960s-70s NE',
    time: 18,
    route: '82 Street NE and 118 Avenue NE',
    brands: { dishwasher: ['GE','Frigidaire','Kenmore','Whirlpool'], washer: ['GE','Kenmore','Whirlpool','Maytag'], fridge: ['GE','Frigidaire','Kenmore','Whirlpool'] },
    dishwasherPara: `Montrose is one of northeast Edmonton's established residential neighbourhoods, developed primarily through the 1960s and into the 1970s. The housing stock consists mainly of wartime and post-war bungalows, with subsequent infill and renovation waves in the 1980s and 2000s. The dishwashers in Montrose homes represent two or three full replacement cycles — the current appliance generation is dominated by GE, Frigidaire, and Kenmore units from the 2000s renovation wave, now 15 to 25 years old. A smaller but notable share of Montrose dishwasher calls involve Samsung and Bosch units purchased during more recent kitchen remodels in the 2010s. EPCOR hard water at 170–200 mg/L has been working on these appliances for the full duration of their installation life, and homes in Montrose that were renovated in the 1990s without water softeners show the heaviest scale accumulation in spray arms and filter baskets. Drain pump failure is the most common presenting fault in Montrose dishwasher calls, followed by heating element failure and door gasket deterioration. The neighbourhood's proximity to 82 Street NE and 118 Avenue NE major corridors means our technicians reach Montrose quickly, and the 18-minute dispatch time supports same-day morning booking fulfillment.`,
    washerPara: `Montrose washer repair calls reflect the neighbourhood's mature housing stock and renovation history. GE, Kenmore, and Whirlpool top-load machines from the 2000s are the most common, with a smaller population of Samsung and LG front-loaders from more recent kitchen-laundry room renovations. Top-load GE and Kenmore units in Montrose frequently present with water pump failure, inlet valve wear, and transmission issues after 15–20 years of residential use. The neighbourhood's bungalow construction places laundry facilities in basements, where older floor drain configurations can complicate drain hose routing — our technicians are familiar with Montrose basement laundry setups. We provide same-day washer repair throughout Montrose with a flat $65 diagnostic and 90-day warranty on all repairs.`,
    fridgePara: `Montrose fridge calls are dominated by GE and Frigidaire units from the 2000s renovation era, with a secondary population of Kenmore and Whirlpool appliances. The 1960s-70s bungalow kitchens in Montrose were typically upgraded in the 1980s and 2000s, and the refrigerators purchased during those renovation cycles are now the primary service candidates. Common faults include defrost heater and thermostat failure, evaporator fan motor bearing wear, and door gasket deterioration accelerated by kitchen temperature cycling. GE French door units purchased in the late 2000s for Montrose kitchen renovations are now entering ice maker and control board failure windows. Our technicians reach Montrose in approximately 18 minutes and carry GE, Frigidaire, Kenmore, and Whirlpool refrigerator parts as standard truck inventory.`,
  },
  {
    slug: 'glengarry-edmonton',
    name: 'Glengarry',
    era: '1960s NE',
    time: 17,
    route: '82 Street NE and 111 Avenue NE',
    brands: { dishwasher: ['GE','Kenmore','Frigidaire','Whirlpool'], washer: ['GE','Kenmore','Frigidaire','Whirlpool'], fridge: ['GE','Kenmore','Frigidaire','Whirlpool'] },
    dishwasherPara: `Glengarry is a post-war northeast Edmonton neighbourhood developed primarily in the 1960s, featuring modest bungalows and duplexes on a well-established street grid. Like its NE Edmonton neighbours, Glengarry has experienced multiple renovation waves — the current dishwasher generation in Glengarry homes consists primarily of GE, Kenmore, and Frigidaire units installed during 2000s kitchen updates, now 15 to 25 years old. The neighbourhood's compact lot sizes and modest kitchen footprints mean that dishwashers in Glengarry are often basic under-counter units without premium features, which simplifies parts sourcing but does not reduce the failure rate of core pump, element, and gasket components. EPCOR hard water at 170–200 mg/L has progressively calcified spray nozzles and filter assemblies across Glengarry's appliance fleet. Drain pump failures and heating element burnouts are the most frequent call types. The 17-minute dispatch from our Edmonton hub makes Glengarry one of our faster response areas in NE Edmonton, supporting same-day morning and afternoon booking slots on most weekdays. Glengarry's long-term homeowner profile means service requests are typically for repairs on known appliances that have been running without issue for many years before the current failure — a profile that our flat-rate diagnostic model serves well.`,
    washerPara: `Glengarry washer calls reflect the neighbourhood's 1960s construction and subsequent renovation cycles. GE, Kenmore, and Frigidaire top-load machines from the 2000s are the dominant service candidates, with some older Whirlpool and Maytag units still in use in homes that have not undergone recent renovations. Top-load washer failures in Glengarry follow predictable patterns: lid switch failure preventing spin cycle, water pump wear causing inadequate fill or drain, and drive belt or motor coupler wear on high-cycle units. The basement laundry configuration common in Glengarry bungalows means washers are often in low-traffic spaces where early failure signs go unnoticed until a major fault occurs. We dispatch to Glengarry in approximately 17 minutes and provide same-day washer repair with a 90-day warranty.`,
    fridgePara: `Glengarry fridge repair calls span GE, Kenmore, and Frigidaire units from the 2000s renovation wave in this 1960s NE Edmonton suburb. The top-mount freezer and side-by-side configurations installed during those renovations are now showing age-appropriate failure modes: defrost system faults, evaporator fan bearing wear, and door gasket degradation. The neighbourhood's bungalow construction means refrigerators are typically in compact kitchen spaces with limited ventilation clearance — a factor that accelerates condenser coil fouling and compressor stress in homes where regular maintenance has not been performed. Our technicians clean condenser coils during service calls when accessible. Flat $65 diagnostic, written quote, same-day repair, 90-day warranty on all Glengarry fridge jobs.`,
  },
  {
    slug: 'rundle-heights',
    name: 'Rundle Heights',
    era: '1960s E',
    time: 18,
    route: '50 Street NE and 118 Avenue NE',
    brands: { dishwasher: ['GE','Whirlpool','Kenmore','Frigidaire'], washer: ['GE','Whirlpool','Kenmore','Maytag'], fridge: ['GE','Whirlpool','Kenmore','Frigidaire'] },
    dishwasherPara: `Rundle Heights is a 1960s-era family suburb in east Edmonton, situated near the North Saskatchewan River valley with a mix of bungalows and split-level homes developed during Edmonton's post-war expansion. The neighbourhood has a strong family-oriented character and has seen renovation activity during the 2000s and 2010s. The current dishwasher generation in Rundle Heights consists primarily of GE, Whirlpool, and Kenmore units installed during kitchen renovations in the 2000s, now 15 to 25 years old. The proximity to the river valley creates slightly different humidity conditions than Edmonton's more inland suburbs — a factor that contributes to accelerated door gasket wear and interior tub liner degradation in Rundle Heights dishwashers compared to equivalent-age machines in drier western neighbourhoods. EPCOR hard water at 170–200 mg/L is the defining mineral condition for all Rundle Heights dishwashers, and the neighbourhood's pre-2005 construction almost universally predates residential water softener adoption. Drain pump failure and spray arm calcification are the most common repair categories. The 18-minute dispatch time from our Edmonton hub supports same-day service across Rundle Heights' compact residential street network, and our technicians are familiar with the neighbourhood's river-valley-adjacent addresses off 50 Street NE and 118 Avenue NE.`,
    washerPara: `Rundle Heights washer calls reflect the 1960s suburban character of this east Edmonton neighbourhood. GE, Whirlpool, and Kenmore top-load machines from the 2000s renovation era are the primary service candidates. Rundle Heights' family demographic means washers run at high cycle counts, and the most common faults are agitator drive coupler wear, lid switch failure, and water pump degradation. A growing share of Rundle Heights calls involves Samsung and LG front-loaders purchased in the 2010s, where door boot seal failures, drum bearing noise, and drain pump faults are the presenting issues. Same-day washer repair in Rundle Heights — $65 flat diagnostic, written quote, 90-day warranty — from our Edmonton hub at approximately 18 minutes dispatch.`,
    fridgePara: `Rundle Heights fridge repair calls predominantly involve GE, Whirlpool, and Kenmore units installed during 2000s kitchen renovations in this east Edmonton family suburb. The neighbourhood's 1960s bungalow and split-level stock means kitchen layouts are generally compact, and refrigerators tend to be standard 30-inch units rather than oversized French door models. Common faults include defrost system failures causing ice buildup on the evaporator coil, evaporator fan motor bearing wear, and water inlet valve failure on units with ice makers. The river valley proximity creates above-average humidity in Rundle Heights kitchens, which contributes to door gasket mould and seal degradation at a faster rate than drier Edmonton suburbs. We reach Rundle Heights in approximately 18 minutes and carry GE, Whirlpool, and Kenmore parts as standard truck inventory.`,
  },
  {
    slug: 'twin-brooks',
    name: 'Twin Brooks',
    era: '1990s-2000s S',
    time: 25,
    route: 'Anthony Henday Drive and 111 Street SW',
    brands: { dishwasher: ['Samsung','LG','GE','Whirlpool'], washer: ['Samsung','LG','GE','Whirlpool'], fridge: ['Samsung','LG','GE','Whirlpool'] },
    dishwasherPara: `Twin Brooks is a south Edmonton neighbourhood with a distinctive lake community character, developed primarily in the 1990s and early 2000s near Terwillegar Park. The neighbourhood's semi-custom and infill homes were built over a wider price range than typical suburban tracts, resulting in a more varied appliance mix — Samsung, LG, GE, and Whirlpool dishwashers are all well-represented across Twin Brooks' street network. Units installed during the original 1990s builds are now 25 to 30 years old and entering the advanced service stage; dishwashers installed during early 2000s renovations are 15 to 20 years old and in their prime failure window. EPCOR hard water at 170–200 mg/L has been at work throughout Twin Brooks' appliance fleet for the full duration of installation, and homes in the neighbourhood's 1990s sections frequently lack whole-home water softeners. The result is pervasive spray arm calcification and filter fouling that increases drain pump load and compresses the time between installation and first service call. Samsung dishwashers in Twin Brooks display 5E/9E drain fault codes and LG units show OE errors — typically drain pump failures triggered by calcium accumulation in the pump housing inlet. The neighbourhood's lake-adjacent streets and ravine-bordering crescents give Twin Brooks a distinctive character that residents value, and our technicians are familiar with the area's layout and access patterns off 111 Street SW.`,
    washerPara: `Twin Brooks washer calls reflect the neighbourhood's mixed 1990s-2000s appliance stock. Samsung and LG front-loaders purchased during 2000s and 2010s upgrades are the most common service units, alongside Whirlpool and GE top-loaders from the 1990s builds. Samsung front-loaders in Twin Brooks frequently show door boot seal failures and drain pump faults (5E error). LG front-loaders display LE motor errors and OE drain codes. The neighbourhood's family demographics mean washers run at high cycle counts — a factor that accelerates bearing wear in front-load units. GE and Whirlpool top-loaders from the 1990s builds show pump seal wear and transmission issues. Dispatch from our Edmonton hub to Twin Brooks is approximately 25 minutes via Anthony Henday Drive and 111 Street SW.`,
    fridgePara: `Twin Brooks fridge repair calls span the neighbourhood's mixed appliance vintage — Samsung and LG French door units purchased during 2000s and 2010s upgrades, alongside GE and Whirlpool side-by-sides from the original 1990s builds. Samsung French door refrigerators in Twin Brooks frequently experience ice maker freeze-ups and ice room partition failures. LG linear compressor failures in 2014–2019 models are a documented concern for Twin Brooks households that purchased LG French door units during the early 2010s. The neighbourhood's 1990s GE and Whirlpool stock shows defrost system failures, evaporator fan bearing wear, and door gasket deterioration. We reach Twin Brooks in approximately 25 minutes and carry parts for all major brands as standard truck inventory.`,
  },
  {
    slug: 'falconer',
    name: 'Falconer',
    era: '2000s S',
    time: 27,
    route: 'Anthony Henday Drive and Ellerslie Road SW',
    brands: { dishwasher: ['Samsung','LG','Whirlpool','GE'], washer: ['Samsung','LG','Whirlpool','Maytag'], fridge: ['Samsung','LG','Whirlpool','GE'] },
    dishwasherPara: `Falconer is a newer south Edmonton suburb developed primarily through the 2000s, situated in the Terwillegar area near Ellerslie Road SW. Like other south Edmonton 2000s suburbs, Falconer was built with a heavy concentration of builder-grade Samsung and LG appliance packages as standard inclusions in the area's production and semi-custom homes. These dishwashers — now 15 to 20 years old — are entering the post-warranty first-service window where drain pump failure, spray arm calcification, and door latch micro-switch failure are the predominant call types. Falconer homes built between 2003 and 2012 represent the core service candidate pool, and the Samsung 5E/9E drain fault code and LG OE error are the most common presenting symptoms reported by Falconer homeowners contacting our service line. EPCOR hard water at 170–200 mg/L has been accumulating scale in these dishwashers throughout their operational life, and Falconer's 2000s construction predates widespread consumer awareness of whole-home water softener necessity in Edmonton homes. The neighbourhood's newer street network and clear routing via Anthony Henday Drive means Falconer is one of the more accessible south Edmonton suburbs for our technicians, with dispatch time of approximately 27 minutes from our downtown hub.`,
    washerPara: `Falconer's 2000s construction profile means Samsung and LG front-load washers dominate the service call mix. These builder-grade units were installed as standard packages and are now 15 to 20 years old — squarely in the post-warranty service window. Samsung front-loaders in Falconer show door boot seal tears, drain pump failures (5E error), and drum bearing noise. LG units display LE motor errors and OE drain fault codes. Maytag and Whirlpool top-loaders from the 2000s builds show pump wear, lid switch failure, and drive coupler wear. Falconer's newer street network allows efficient dispatch — approximately 27 minutes via Anthony Henday Drive and Ellerslie Road SW. Flat $65 diagnostic, same-day service, 90-day warranty.`,
    fridgePara: `Falconer fridge repair calls are dominated by Samsung and LG French door and side-by-side units from the 2000s and early 2010s builder packages. Samsung French door refrigerators are the most common service call, with ice maker failures, ice room freeze-up, and evaporator fan motor failure as the top presenting faults. LG French door units in Falconer's 2008–2015 build window are subject to linear compressor failures — a documented issue with LG compressors of that vintage. Whirlpool and GE side-by-sides from the original 2003–2008 builds are showing defrost system faults and evaporator fan bearing wear. We dispatch to Falconer in approximately 27 minutes and stock Samsung, LG, Whirlpool, and GE refrigerator parts as standard truck inventory.`,
  },
  {
    slug: 'steinhauer',
    name: 'Steinhauer',
    era: '1980s-90s S',
    time: 22,
    route: '111 Street SW and 51 Avenue SW',
    brands: { dishwasher: ['GE','Whirlpool','Samsung','Kenmore'], washer: ['GE','Whirlpool','Samsung','Kenmore'], fridge: ['GE','Whirlpool','Samsung','Kenmore'] },
    dishwasherPara: `Steinhauer is a well-established south Edmonton suburb developed primarily through the 1980s and into the 1990s, situated near 111 Street SW and the Brander Gardens area. The neighbourhood's housing stock consists predominantly of mature single-family homes with established landscaping, and many households are long-term owner-occupants who have upgraded appliances once or twice since original construction. The current dishwasher generation in Steinhauer homes is a mix of GE and Whirlpool units from the late 1990s and 2000s, alongside Samsung units purchased during 2010s kitchen renovations. GE and Whirlpool units in Steinhauer are now 15 to 25 years old and showing predictable age-related failures: pump motor wear, heating element burnout, and door gasket deterioration from decades of thermal cycling. Samsung units purchased more recently are in their first or second service encounter, typically presenting with drain fault codes (5E/9E) or door latch micro-switch failure. EPCOR hard water at 170–200 mg/L is a universal condition in Steinhauer homes — the neighbourhood's 1980s construction predates residential water softener adoption, and most Steinhauer homes run on untreated EPCOR municipal water. The resulting scale accumulation in spray arms, filter assemblies, and pump housings is the underlying driver of most Steinhauer dishwasher service calls, even when the presenting symptom is drain pump failure or poor wash performance.`,
    washerPara: `Steinhauer washer calls reflect the neighbourhood's 1980s-90s construction and mixed appliance vintage. GE, Whirlpool, and Kenmore top-load machines from the 1990s-2000s are the most common service units, with Samsung units from 2010s renovations becoming an increasing share of calls. GE and Whirlpool top-loaders in Steinhauer show transmission wear, lid switch failure, and water pump degradation. Samsung front-loaders added during kitchen-laundry renovations show door boot seal failures and drain pump faults. The neighbourhood's established character and long-term homeowner profile means our technicians often service households where the same appliance has been running for 15 to 20 years. Dispatch to Steinhauer from our Edmonton hub is approximately 22 minutes via 111 Street SW and 51 Avenue SW.`,
    fridgePara: `Steinhauer fridge calls are spread across GE, Whirlpool, and Samsung units reflecting the neighbourhood's multi-decade renovation history. GE and Whirlpool units from the 1990s-2000s show defrost system failures, evaporator fan motor bearing wear, and water inlet valve failure on ice-maker-equipped units. Samsung units from 2010s kitchen upgrades in Steinhauer present with ice maker freeze-up, French door ice room failures, and control board faults. The neighbourhood's established 1980s-90s construction means refrigerators are typically in well-maintained kitchen spaces with adequate clearance, supporting condenser coil access for cleaning during service visits. We dispatch to Steinhauer in approximately 22 minutes and carry parts for all major brands.`,
  },
];

const services = {
  dishwasher: {
    serviceType: 'Dishwasher Repair',
    serviceSlugPrefix: 'dishwasher-repair',
    serviceParentSlug: 'dishwasher-repair-edmonton',
    serviceParentLabel: 'Dishwasher Repair Edmonton',
    appliance: 'dishwasher',
    applianceCap: 'Dishwasher',
    verb: 'fixes dishwashers',
    placeholder: 'e.g. dishwasher not draining',
    costRange: '$120&ndash;$380',
    costRangePlain: '$120–$380',
    pricing: [
      ['Diagnostic visit (waived with repair)', '$65'],
      ['Drain pump replacement', '$180&ndash;$280'],
      ['Heating element replacement', '$150&ndash;$240'],
      ['Door gasket replacement', '$140&ndash;$220'],
      ['Spray arm + descale service', '$90&ndash;$160'],
      ['Control board', '$240&ndash;$420'],
      ['Circulation motor', '$220&ndash;$360'],
    ],
    problems: [
      ['Not draining / standing water', (n) => `Drain pump failure or clogged drain hose — the most common dishwasher call in ${n}. OEM drain pump assemblies for same-day repair.`],
      ['Spray arm scale buildup', () => `EPCOR hard water (170–200 mg/L) calcifies spray nozzles after 5–8 years. Spray arm replacement + descale standard same-day repair.`],
      ['Heating element failure', () => `Dishes wet at end of cycle — element burnout at 8–15 years. OEM replacement same-day for all major brands.`],
      ['Door latch / won\'t start', () => `Door latch micro-switch failure prevents start. 30-minute OEM replacement for all major platforms.`],
      ['Control board / fault codes', () => `Samsung 5E/9E and LG OE drain fault codes. Proprietary diagnostics for accurate fault identification before quoting.`],
      ['Door gasket leak', () => `Gasket failure lets water escape. OEM gasket replacement same-day for all major brands.`],
    ],
  },
  washer: {
    serviceType: 'Washer Repair',
    serviceSlugPrefix: 'washer-repair',
    serviceParentSlug: 'washer-repair-edmonton',
    serviceParentLabel: 'Washer Repair Edmonton',
    appliance: 'washer',
    applianceCap: 'Washer',
    verb: 'fixes washing machines',
    placeholder: 'e.g. washer not spinning',
    costRange: '$120&ndash;$400',
    costRangePlain: '$120–$400',
    pricing: [
      ['Diagnostic visit (waived with repair)', '$65'],
      ['Drain pump replacement', '$160&ndash;$260'],
      ['Door boot seal (front-load)', '$180&ndash;$300'],
      ['Drum bearing replacement', '$280&ndash;$420'],
      ['Inlet valve replacement', '$120&ndash;$200'],
      ['Control board', '$240&ndash;$420'],
      ['Motor / rotor assembly', '$220&ndash;$380'],
    ],
    problems: [
      ['Not spinning / unbalance code', (n) => `Drum bearing wear or unbalance sensor fault. Samsung UE/UB and LG UE codes are frequent calls in ${n}.`],
      ['Door boot seal leak', () => `Bellow gasket tears — water pools on laundry floor. OEM replacement same-day for Samsung and LG.`],
      ['Not draining', () => `Drain pump clog or failure. Samsung 5E and LG OE codes. OEM drain pump assemblies in stock.`],
      ['Loud noise / bearing', () => `Drum bearing wear after 10+ years. Full bearing replacement available same-day for major brands.`],
      ['Control board faults', () => `Proprietary diagnostics to identify exact fault before quoting repair. Samsung and LG platforms.`],
      ['Water supply errors', () => `Samsung 4E/4C and LG IE inlet errors — inlet valve failure. OEM valve replacement same-day.`],
    ],
  },
  fridge: {
    serviceType: 'Refrigerator Repair',
    serviceSlugPrefix: 'fridge-repair',
    serviceParentSlug: 'fridge-repair-edmonton',
    serviceParentLabel: 'Fridge Repair Edmonton',
    appliance: 'fridge',
    applianceCap: 'Fridge',
    verb: 'fixes refrigerators',
    placeholder: 'e.g. fridge not cooling',
    costRange: '$120&ndash;$500',
    costRangePlain: '$120–$500',
    pricing: [
      ['Diagnostic visit (waived with repair)', '$65'],
      ['Evaporator fan motor', '$160&ndash;$260'],
      ['Ice maker assembly', '$180&ndash;$320'],
      ['Defrost heater / thermostat', '$140&ndash;$240'],
      ['Inlet valve replacement', '$120&ndash;$200'],
      ['Compressor replacement', '$400&ndash;$700'],
      ['Main control board', '$260&ndash;$440'],
    ],
    problems: [
      ['Not cooling / warm fridge', (n) => `Evaporator fan or sealed system failure. Most common fridge call in ${n}. Same-day diagnosis and repair.`],
      ['Ice maker failure', () => `Ice maker freeze-up or module failure. Samsung French door ice room freezing frequent call. OEM parts in stock.`],
      ['Compressor failure', () => `LG linear compressor failures in 2014–2019 models. Full diagnosis and replacement available.`],
      ['Freezer not freezing', () => `Defrost system failure — heater, thermostat, or timer. Ice buildup on evaporator coil. Common in 10–20 year units.`],
      ['Water dispenser fault', () => `Inlet valve failure or frozen water line. Same-day OEM valve replacement available.`],
      ['Loud noise / vibration', () => `Condenser or evaporator fan motor bearing failure. Fan motor assemblies stocked for all major brands.`],
    ],
  },
};

function generatePage(neighborhood, serviceKey) {
  const nb = neighborhood;
  const svc = services[serviceKey];
  const slug = `${svc.serviceSlugPrefix}-${nb.slug}`;
  const url = `https://fixlifyservices.com/${slug}`;
  const brands = nb.brands[serviceKey];
  const para = nb[`${serviceKey}Para`];
  const shortKey = serviceKey === 'dishwasher' ? 'd' : serviceKey === 'washer' ? 'w' : 'f';

  const pricingRows = svc.pricing.map(([label, price]) =>
    `<tr><td>${label}</td><td>${price}</td></tr>`
  ).join('\n        ');

  const problemCards = svc.problems.map(([name, descFn]) =>
    `<div class="problem-card"><div class="problem-name">${name}</div><div class="problem-desc">${descFn(nb.name)}</div></div>`
  ).join('\n      ');

  const brandChips = brands.map(b => `<span class="brand-chip">${b}</span>`).join('');

  const otherServices = [
    serviceKey !== 'dishwasher' ? `dishwasher-repair-${nb.slug}` : null,
    serviceKey !== 'washer' ? `washer-repair-${nb.slug}` : null,
    serviceKey !== 'fridge' ? `fridge-repair-${nb.slug}` : null,
  ].filter(Boolean);

  const relatedLinks = [
    ...otherServices.map(s => {
      const label = s.startsWith('dishwasher') ? 'Dishwasher Repair' : s.startsWith('washer') ? 'Washer Repair' : 'Fridge Repair';
      return `<a href="/${s}" class="related-link">${label} &mdash; ${nb.name}</a>`;
    }),
    `<a href="/${svc.serviceParentSlug}" class="related-link">${svc.applianceCap} Repair &mdash; Edmonton</a>`,
  ].join('\n      ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${svc.applianceCap} Repair ${nb.name} Edmonton | From $65 | Same-Day Service</title>
<meta name="description" content="${svc.applianceCap} Repair in ${nb.name}, Edmonton — same-day service, flat $65 diagnostic, 90-day warranty. ${brands[0]}, ${brands[1]}, ${brands[2]} &amp; all brands. Book online or email edmonton@fixlifyservices.com.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/tokens.css">
<style>${CSS}</style>
<meta property="og:type" content="website">
<meta property="og:title" content="${svc.applianceCap} Repair ${nb.name} Edmonton | From $65 | Same-Day Service">
<meta property="og:description" content="Same-day ${svc.appliance} repair in ${nb.name}, Edmonton. From $65 diagnostic, 90-day warranty.">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Fixlify Appliance Services">
<meta property="og:image" content="https://fixlifyservices.com/og-image.jpg">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"ProfessionalService","@id":"${url}#business","name":"${svc.applianceCap} Repair ${nb.name} Edmonton","description":"${svc.applianceCap} Repair in ${nb.name}, Edmonton. Same-day service, $65 diagnostic, 90-day warranty.","url":"${url}","priceRange":"$","address":{"@type":"PostalAddress","streetAddress":"10025 102A Avenue NW Suite 1000","addressLocality":"Edmonton","addressRegion":"AB","postalCode":"T5J 2Z2","addressCountry":"CA"},"areaServed":[{"@type":"City","name":"Edmonton"},{"@type":"Neighborhood","name":"${nb.name}"}],"serviceType":"${svc.serviceType}"}
<\/script>
</head>
<body>
<div id="header-placeholder"></div>
<script src="/includes/header-loader.js" defer><\/script>
<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="container"><a href="/">Home</a><span class="breadcrumb-sep">/</span><a href="/${svc.serviceParentSlug}">${svc.serviceParentLabel}</a><span class="breadcrumb-sep">/</span><span class="breadcrumb-current">${nb.name}</span></div>
</nav>
<section class="page-hero" aria-label="Page header">
  <div class="container">
    <div class="page-hero-eyebrow">Fixlify Appliance Services &middot; ${nb.name}, Edmonton</div>
    <h1 class="page-h1">${svc.applianceCap} Repair in ${nb.name}, Edmonton</h1>
    <section class="lz-trust-block" aria-labelledby="lz-h-${slug}">
      <h2 id="lz-h-${slug}" class="lz-trust-h">Why ${nb.name} residents choose Fixlify for ${svc.appliance} repair</h2>
      <p class="lz-trust-intro">Our <strong>founder Alex</strong> leads 6 TSSA-licensed, insured technicians with 30+ years combined experience since 2017. Written quote, 90-day parts &amp; labour warranty on every repair.</p>
      <ul class="lz-trust-points">
        <li><strong>Same-day service</strong> when you book before 12 PM on a weekday.</li>
        <li><strong>All brands</strong> &mdash; ${brands[0]}, ${brands[1]}, ${brands[2]} &amp; more.</li>
        <li><strong>~${nb.time} min from downtown</strong> via ${nb.route}.</li>
      </ul>
      <form class="lz-quick-form" action="/contact" method="post" aria-label="Quick repair request">
        <p class="lz-quick-form-lead">Send a quick request &mdash; we'll respond within 30 minutes.</p>
        <label class="lz-quick-field"><span>Your name</span><input type="text" name="name" autocomplete="name" required></label>
        <label class="lz-quick-field"><span>Phone number</span><input type="tel" name="phone" autocomplete="tel" required></label>
        <label class="lz-quick-field"><span>Neighbourhood</span><input type="text" name="city" value="${nb.name}, Edmonton" autocomplete="address-level2"></label>
        <label class="lz-quick-field"><span>What needs fixing?</span><textarea name="issue" rows="3" placeholder="${svc.placeholder}"></textarea></label>
        <button type="submit" class="lz-quick-submit">Request a callback</button>
      </form>
    </section>
    <div class="answer-box">Fixlify provides same-day ${svc.appliance} repair in ${nb.name}, Edmonton. We fix all brands &mdash; ${brands[0]}, ${brands[1]}, ${brands[2]} &amp; more. ${svc.costRange} CAD typical cost, 90-day warranty. Book online or email edmonton@fixlifyservices.com.</div>
    <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="btn-secondary" target="_blank" rel="noopener">Book Online &rarr;</a></div>
  </div>
</section>
<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem 1.25rem;margin:1rem auto;max-width:900px;border-radius:0 8px 8px 0">
  <div style="font-size:.7rem;font-weight:700;letter-spacing:.08em;color:#2563eb;text-transform:uppercase;margin-bottom:.4rem">Quick Answer</div>
  <p style="margin:0;color:#1e3a5f;font-size:.9rem;line-height:1.6">Fixlify provides same-day ${svc.appliance} repair in ${nb.name}, Edmonton &mdash; 7 days a week. ${svc.costRangePlain} CAD typical cost. ${brands[0]}, ${brands[1]}, ${brands[2]}. 90-day parts &amp; labour warranty.</p>
</div>
<div class="trust-bar"><div class="trust-bar-inner"><div class="trust-item">&#128176; $65 flat diagnostic</div><div class="trust-item">&#10003; No Hidden Fees</div><div class="trust-item">&#9873; Same-Day Service</div><div class="trust-item">&#128737; 90-Day Warranty</div></div></div>
<main class="page-main container" id="main-content">
  <div class="fade-in" style="max-width:760px;font-size:1.0625rem;color:#374151;line-height:1.75;margin-bottom:56px">
    <h2 style="font-size:1.375rem;font-weight:700;color:#0a0a0a;margin-bottom:16px">${svc.applianceCap} Repair in ${nb.name} &mdash; ${nb.era} Edmonton</h2>
    <p>Who ${svc.verb} in ${nb.name}? <strong>Fixlify Appliance Services Edmonton</strong> &mdash; same-day ${svc.appliance} repair throughout ${nb.name} and surrounding Edmonton communities. Book online or email <a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a>. Flat <strong>$65 diagnostic</strong>, Mon&ndash;Sat 8AM&ndash;8PM, Sun 10AM&ndash;6PM Mountain Time. Typical cost: <strong>${svc.costRange} CAD</strong>. <strong>90-day warranty</strong> on every repair.</p>
    <p>${para}</p>
    <p>Our Edmonton hub at 10025 102A Avenue NW dispatches to ${nb.name} in approximately ${nb.time} minutes via ${nb.route}.</p>
  </div>
  <section style="padding:48px 0;border-top:1px solid #e5e7eb">
    <div class="section-label">Common issues</div>
    <h2 class="section-title">Common ${nb.name} ${svc.applianceCap} Problems</h2>
    <div class="problems-grid">
      ${problemCards}
    </div>
  </section>
  <section style="margin-top:48px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Brand expertise</div>
    <h2 class="section-title">${svc.applianceCap} Brands We Service in ${nb.name}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:8px;max-width:880px">${brandChips}<span class="brand-chip">Frigidaire</span><span class="brand-chip">Bosch</span></div>
  </section>
  <section style="margin-top:56px">
    <div class="section-label">Transparent pricing</div>
    <h2 class="section-title">${svc.applianceCap} Repair Pricing in ${nb.name}</h2>
    <p style="max-width:760px;color:#374151;line-height:1.7;margin-bottom:20px">All ${nb.name} repairs start with a flat <strong>$65 diagnostic</strong>, waived when you proceed with the repair. Written quote before any work begins.</p>
    <table class="pricing-table" style="max-width:760px">
      <thead><tr><th>Repair type</th><th>Typical range (parts + labour)</th></tr></thead>
      <tbody>
        ${pricingRows}
      </tbody>
    </table>
    <p style="font-size:.8125rem;color:#6b7280;margin-top:12px">All prices include parts, labour, and a <strong>90-day warranty</strong>.</p>
  </section>
  <section class="fade-in" style="margin-top:56px;padding:56px 0;border-top:1px solid #e5e7eb;text-align:center">
    <div class="section-label">Online booking</div>
    <h2 style="font-size:1.75rem;font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:12px">Book ${svc.applianceCap} Repair in ${nb.name}</h2>
    <p style="color:#6b7280;margin-bottom:24px">Real-time availability, instant confirmation.</p>
    <iframe id="fxbk-${shortKey}-${nb.slug}" src="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce?embed=true" style="width:100%;height:600px;border:none;display:block" title="Book a Service" loading="lazy" allowtransparency="true"></iframe>
    <script>window.addEventListener('message',function(e){if(e.data&&e.data.type==='fixlify-resize'){var el=document.getElementById('fxbk-${shortKey}-${nb.slug}');if(el)el.style.height=e.data.height+'px'}});<\/script>
    <p style="font-size:.9375rem;color:#6b7280;margin-top:16px">Prefer email? <a href="mailto:edmonton@fixlifyservices.com" style="color:#2563eb;font-weight:600">edmonton@fixlifyservices.com</a></p>
  </section>
  <section style="padding:56px 0;border-top:1px solid #e5e7eb">
    <h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:32px">FAQ &mdash; ${svc.applianceCap} Repair in ${nb.name}</h2>
    <details class="faq-item"><summary class="faq-question"><span>How fast can you reach ${nb.name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Approximately ${nb.time} minutes from our Edmonton hub via ${nb.route}. Same-day service when you book before 12 PM Monday&ndash;Saturday. Sunday crew available 10 AM&ndash;6 PM Mountain Time.</p></div></details>
    <details class="faq-item"><summary class="faq-question"><span>Do you repair ${brands[0]} ${svc.appliance}s in ${nb.name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Yes &mdash; ${brands[0]} and ${brands[1]} are among the most common ${svc.appliance} brands we service in ${nb.name}. We carry OEM parts as standard truck stock for same-day repair.</p></div></details>
    <details class="faq-item"><summary class="faq-question"><span>How much does ${svc.appliance} repair cost in ${nb.name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Typical ${svc.appliance} repair in ${nb.name} runs ${svc.costRangePlain} CAD including parts and labour. Flat $65 diagnostic waived when you proceed with the repair. Written quote before any work begins. 90-day parts and labour warranty.</p></div></details>
    <details class="faq-item"><summary class="faq-question"><span>Do you warranty ${svc.appliance} repairs in ${nb.name}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Yes &mdash; every ${svc.appliance} repair in ${nb.name} includes a 90-day parts and labour warranty. Same fault within 90 days: we return at no charge.</p></div></details>
  </section>
  <section style="margin-top:56px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Other ${nb.name} services</div>
    <h2 class="section-title">Other Appliance Repair in ${nb.name}</h2>
    <div class="related-grid">
      ${relatedLinks}
    </div>
  </section>
  <section style="margin-top:56px;padding:40px;background:#0a0a0a;border-radius:8px;text-align:center;color:#fff">
    <h2 style="font-size:1.75rem;font-weight:700;color:#fff;margin-bottom:12px">Ready to book ${svc.appliance} repair in ${nb.name}?</h2>
    <p style="color:rgba(255,255,255,.8);margin-bottom:24px;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.6">Same-day service, $65 flat diagnostic, written quote before any work, 90-day warranty.</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="btn-primary" target="_blank" rel="noopener">Book Online &rarr;</a>
      <a href="mailto:edmonton@fixlifyservices.com" class="btn-secondary">Email Edmonton Team</a>
    </div>
  </section>
</main>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How fast can you reach ${nb.name}?","acceptedAnswer":{"@type":"Answer","text":"Approximately ${nb.time} minutes via ${nb.route}. Same-day service when you book before 12 PM Monday–Saturday."}},{"@type":"Question","name":"How much does ${svc.appliance} repair cost in ${nb.name}?","acceptedAnswer":{"@type":"Answer","text":"Typical ${svc.appliance} repair in ${nb.name} runs ${svc.costRangePlain} CAD. Flat $65 diagnostic waived with repair. 90-day warranty."}}]}
<\/script>
<footer class="fx-footer" role="contentinfo"><div class="fx-footer-inner">
  <div class="fx-footer-cta-strip"><div class="fx-footer-cta-content"><div class="fx-footer-cta-text"><span class="fx-footer-cta-label">Edmonton Appliance Repair</span><p>Book online &mdash; ${nb.name} and all Edmonton CMA.</p></div><div class="fx-footer-cta-btns"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="fx-footer-btn-book" rel="noopener">Book Online Now</a><a href="mailto:edmonton@fixlifyservices.com" class="fx-footer-btn-call">edmonton@fixlifyservices.com</a></div></div></div>
  <div class="fx-footer-columns">
    <div class="fx-footer-col fx-footer-brand"><div class="fx-footer-logo"><div class="fx-footer-logo-icon">${FOOTER_ICON}</div><span class="fx-footer-logo-name">Fixlify</span></div><p class="fx-footer-desc">Edmonton Appliance Repair. ${nb.name} and all Edmonton CMA communities.</p><address class="fx-footer-address" style="font-style:normal;margin:14px 0">10025 102A Avenue NW, Suite 1000<br>Edmonton, AB T5J 2Z2</address><div class="fx-footer-hours"><strong>Service Hours (Mountain Time)</strong><span>Monday&ndash;Saturday: 8 AM &ndash; 8 PM</span><span>Sunday: 10 AM &ndash; 6 PM</span></div></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Services</h4><ul class="fx-footer-list"><li><a href="/services/refrigerator-repair-edmonton/">Fridge Repair Edmonton</a></li><li><a href="/services/washer-repair-edmonton/">Washer Repair Edmonton</a></li><li><a href="/services/dishwasher-repair-edmonton/">Dishwasher Repair Edmonton</a></li></ul></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Neighbourhoods</h4><ul class="fx-footer-list"><li><a href="/${slug}">${nb.name}</a></li><li><a href="/${svc.serviceSlugPrefix}-walker">Walker</a></li><li><a href="/${svc.serviceSlugPrefix}-ellerslie">Ellerslie</a></li><li><a href="/${svc.serviceSlugPrefix}-edmonton">Edmonton</a></li></ul></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Quick Links</h4><ul class="fx-footer-list"><li><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" rel="noopener">Book Online</a></li><li><a href="/about/">About Us</a></li><li><a href="/sitemap.xml">Sitemap</a></li></ul><h4 class="fx-footer-heading" style="margin-top:24px">Contact</h4><ul class="fx-footer-list"><li><a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a></li></ul></div>
  </div>
  <div class="fx-footer-bottom"><p class="fx-copyright">&copy; <span id="fx-yr-${shortKey}-${nb.slug}"></span> Fixlify Appliance Repair Edmonton | ${nb.name} | Online Booking Available</p></div>
</div></footer>
<script>(function(){var el=document.getElementById('fx-yr-${shortKey}-${nb.slug}');if(el)el.textContent=new Date().getFullYear()})();<\/script>
<div class="sticky-cta"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="sticky-btn sticky-book" target="_blank" rel="noopener">Book Online &rarr;</a></div>
<script>document.addEventListener('DOMContentLoaded',function(){var els=document.querySelectorAll('.fade-in');if('IntersectionObserver' in window){var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.1});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('visible')})}});<\/script>
</body>
</html>`;
}

let count = 0;
const outDir = 'C:/fixlifyservices';

const skip = new Set([
  'dishwasher-repair-pilot-sound',
  'washer-repair-pilot-sound',
  'fridge-repair-pilot-sound',
  'dishwasher-repair-matt-berry',
]);

for (const nb of neighborhoods) {
  for (const svcKey of ['dishwasher', 'washer', 'fridge']) {
    const slug = `${services[svcKey].serviceSlugPrefix}-${nb.slug}`;
    if (skip.has(slug)) {
      console.log(`SKIP: ${slug}.html`);
      continue;
    }
    const html = generatePage(nb, svcKey);
    const filepath = `${outDir}/${slug}.html`;
    fs.writeFileSync(filepath, html, 'utf8');
    count++;
    console.log(`WROTE: ${slug}.html`);
  }
}

console.log(`\nDone. Wrote ${count} files.`);
