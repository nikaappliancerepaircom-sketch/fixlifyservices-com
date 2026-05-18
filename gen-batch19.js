const fs = require('fs');

const neighborhoods = [
  {
    slug: 'evansdale',
    display: 'Evansdale',
    region: 'north Edmonton',
    era: '1960s',
    desc: `Evansdale is a 1960s working-class neighbourhood in north Edmonton, situated between 137 Avenue and 144 Avenue along 66 Street NW. Developed alongside Lauderdale during Edmonton's postwar industrial expansion, Evansdale's modest bungalows and row housing were designed for affordability and practicality. Kitchens in these homes were updated through the 1990s and early 2000s with entry-level Whirlpool, GE, and Frigidaire dishwashers that are now well past the ten-year mark. EPCOR's water supply to this area carries 170–200 mg/L hardness, and the combination of aging units and hard water means spray arm calcification, drain pump failures, and worn door gaskets are the repairs we encounter most often. Our technicians travel from our 102A Avenue hub to Evansdale in roughly 18–22 minutes via 97 Street NW.`,
    travel: '18–22 min via 97 Street NW north',
    nearby1: 'lauderdale', nearby1d: 'Lauderdale',
    nearby2: 'calder', nearby2d: 'Calder',
    nearby3: 'castle-downs', nearby3d: 'Castle Downs'
  },
  {
    slug: 'cumberland',
    display: 'Cumberland',
    region: 'north Edmonton (Palisades)',
    era: '2000s',
    desc: `Cumberland is a 2000s family neighbourhood in the Palisades area of north Edmonton, tucked between 137 Avenue and Anthony Henday Drive north of the Castledowns Road corridor. Like its Palisades neighbours Hudson and Oxford, Cumberland was developed as a planned suburb with attached garages, open-concept floor plans, and full appliance packages. Dishwashers in these homes are now 15-20 years old — prime repair territory. Whirlpool, Maytag, and Bosch are the predominant brands. EPCOR hard water at 170-200 mg/L has calcified spray arm nozzles and worn inlet valve seats in many of these units. Our technicians reach Cumberland from our 102A Avenue hub in approximately 20-24 minutes via St. Albert Trail north.`,
    travel: '20–24 min via St. Albert Trail north',
    nearby1: 'oxford-edmonton', nearby1d: 'Oxford',
    nearby2: 'castle-downs', nearby2d: 'Castle Downs',
    nearby3: 'caernarvon', nearby3d: 'Caernarvon'
  },
  {
    slug: 'hudson',
    display: 'Hudson',
    region: 'north Edmonton (Palisades)',
    era: '2000s',
    desc: `Hudson is part of the Palisades family of north Edmonton neighbourhoods, developed in the early 2000s on former agricultural land between St. Albert Trail and Castle Downs Road. These homes came with complete kitchen packages featuring Whirlpool, Maytag, and Samsung dishwashers. With original appliances now 18-22 years old, Hudson homeowners are seeing mid-life failures: control board faults, door latch failures, circulation motor wear, and spray arm nozzle blockage from EPCOR's 170-200 mg/L hard water. Our Edmonton hub dispatches to Hudson in approximately 20-24 minutes via St. Albert Trail.`,
    travel: '20–24 min via St. Albert Trail north',
    nearby1: 'cumberland', nearby1d: 'Cumberland',
    nearby2: 'oxford-edmonton', nearby2d: 'Oxford',
    nearby3: 'castle-downs', nearby3d: 'Castle Downs'
  },
  {
    slug: 'carlton',
    display: 'Carlton',
    region: 'north Edmonton (Palisades)',
    era: '2010s',
    desc: `Carlton is the newest of the Palisades-area north Edmonton neighbourhoods, largely built out between 2010 and 2018. Two-storey family homes with upgraded kitchen packages are the norm here — Bosch, Samsung, and LG dishwashers feature prominently alongside Whirlpool and Maytag. Carlton appliances installed in 2010-2015 are now hitting the 10-to-15-year mark where electronic component failures, door gasket degradation, and pump wear begin appearing. EPCOR water hardness of 170-200 mg/L still takes its toll on spray arm nozzles even in newer dishwashers. Our technicians know the Bosch and Samsung fault codes common in this generation and carry relevant parts for same-day repairs. Arrival from our 102A Avenue hub takes approximately 22-26 minutes via St. Albert Trail.`,
    travel: '22–26 min via St. Albert Trail north',
    nearby1: 'hudson', nearby1d: 'Hudson',
    nearby2: 'cumberland', nearby2d: 'Cumberland',
    nearby3: 'castle-downs', nearby3d: 'Castle Downs'
  },
  {
    slug: 'albany',
    display: 'Albany',
    region: 'north Edmonton (Palisades)',
    era: '2000s',
    desc: `Albany is a 2000s family suburb in north Edmonton's Palisades area, located near the intersection of 167 Avenue NW and 97 Street NW. Albany features primarily detached two-storey homes with full kitchen buildouts. Whirlpool, Frigidaire, and Samsung dishwashers are the brands we most commonly service here. Appliances installed at time of construction are now 18-22 years old, entering peak repair cycles for drain pumps, heating elements, and control boards. EPCOR hard water at 170-200 mg/L means spray arm calcification is nearly universal in units without regular descaling maintenance. Our technicians arrive in Albany from the 102A Avenue hub in approximately 24-28 minutes via 97 Street NW north.`,
    travel: '24–28 min via 97 Street NW north',
    nearby1: 'carlton', nearby1d: 'Carlton',
    nearby2: 'cumberland', nearby2d: 'Cumberland',
    nearby3: 'castle-downs', nearby3d: 'Castle Downs'
  },
  {
    slug: 'pembina',
    display: 'Pembina',
    region: 'north Edmonton (Palisades)',
    era: '2000s',
    desc: `Pembina is a 2000s residential neighbourhood within the Palisades area of north Edmonton, positioned between Anthony Henday Drive and 167 Avenue near 127 Street NW. The neighbourhood's detached family homes were built with standard-specification kitchen packages — primarily Whirlpool, Maytag, and Frigidaire dishwashers — now approaching two decades of service. At that age, dishwashers commonly develop drain pump failures, worn-out door gaskets, and spray arm clogging accelerated by EPCOR's 170-200 mg/L hard water supply. Our north Edmonton technicians travel from our 102A Avenue hub to Pembina in approximately 24-28 minutes via St. Albert Trail connecting to Anthony Henday. We carry drain pump and heating element assemblies for the Whirlpool and Frigidaire platforms most prevalent in Pembina.`,
    travel: '24–28 min via St. Albert Trail and Anthony Henday',
    nearby1: 'albany', nearby1d: 'Albany',
    nearby2: 'carlton', nearby2d: 'Carlton',
    nearby3: 'oxford-edmonton', nearby3d: 'Oxford'
  },
  {
    slug: 'yellowbird',
    display: 'Yellowbird',
    region: 'southwest Edmonton (Kaskitayo)',
    era: '1970s',
    desc: `Yellowbird is a 1970s family suburb in Edmonton's Kaskitayo area, located between 23 Avenue and Whitemud Drive west of 111 Street. The neighbourhood's two-storey and split-level homes were built during Edmonton's oil boom and saw kitchen renovations in the late 1990s and 2000s that introduced Whirlpool, GE, and Frigidaire dishwashers. Those units are now 20-25 years into service, and the combination of age and EPCOR's 170-200 mg/L hard water has produced a high volume of drain pump failures, spray arm replacements, and heating element burnouts. Yellowbird sits about 18-22 minutes from our 102A Avenue hub via Whitemud Drive west, well within our same-day service window.`,
    travel: '18–22 min via Whitemud Drive west',
    nearby1: 'skyrattler', nearby1d: 'Skyrattler',
    nearby2: 'blue-quill', nearby2d: 'Blue Quill',
    nearby3: 'twin-brooks', nearby3d: 'Twin Brooks'
  },
  {
    slug: 'greenfield',
    display: 'Greenfield',
    region: 'southwest Edmonton',
    era: '1960s',
    desc: `Greenfield is a 1960s mature neighbourhood in southwest Edmonton, situated between 51 Avenue and 63 Avenue along 119 Street SW, adjacent to the Edmonton Country Club. The area's post-war bungalows and character homes have seen successive waves of kitchen renovation, with recent cycles installing Whirlpool, Bosch, and Samsung dishwashers that are now showing age-related failures. EPCOR hard water at 170-200 mg/L is hard on all generations of dishwashers here — spray arm calcification, inlet valve scale, and door gasket degradation are the predominant faults we diagnose in Greenfield. Our dispatch from 102A Avenue NW reaches Greenfield in 14-18 minutes via Whitemud Drive and 119 Street.`,
    travel: '14–18 min via Whitemud Drive and 119 Street',
    nearby1: 'malmo-plains', nearby1d: 'Malmo Plains',
    nearby2: 'pleasantview', nearby2d: 'Pleasantview',
    nearby3: 'twin-brooks', nearby3d: 'Twin Brooks'
  },
  {
    slug: 'fraser',
    display: 'Fraser',
    region: 'northeast Edmonton (Clareview)',
    era: '1980s',
    desc: `Fraser is a 1980s family neighbourhood in Edmonton's Clareview area, located in the northeast quadrant between 137 Avenue and 144 Avenue, west of 50 Street NW. Part of the large Clareview development that transformed northeast Edmonton, Fraser features detached bungalows and two-storeys built for working and middle-class families. Dishwashers in these homes were installed during late-1990s and 2000s kitchen renovations — Whirlpool, Maytag, and GE units that are now 20-plus years old. EPCOR's 170-200 mg/L hard water has calcified spray arm nozzles and degraded rubber door gaskets across the neighbourhood. Our technicians reach Fraser in approximately 16-20 minutes from our 102A Avenue hub via 97 Street NW northeast.`,
    travel: '16–20 min via 97 Street NW northeast',
    nearby1: 'kirkness', nearby1d: 'Kirkness',
    nearby2: 'hairsine', nearby2d: 'Hairsine',
    nearby3: 'clareview', nearby3d: 'Clareview'
  }
];

const CSS = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth;font-size:16px}body{font-family:'Instrument Sans',-apple-system,sans-serif;background:#fff;color:#0a0a0a;line-height:1.6;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}.container{max-width:1200px;margin:0 auto;padding:0 24px}.breadcrumb{padding:14px 0;border-bottom:1px solid #e5e7eb;background:#fafafa}.breadcrumb .container{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.breadcrumb a{font-size:.8125rem;font-weight:500;color:#6b7280}.breadcrumb-sep{font-size:.8125rem;color:#d1d5db}.breadcrumb-current{font-size:.8125rem;font-weight:600;color:#0a0a0a}.page-hero{padding:56px 0 48px;background:#fff;border-bottom:1px solid #e5e7eb}.page-hero .container{max-width:800px}.page-hero-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#2563eb;margin-bottom:16px}.page-hero-eyebrow::before{content:'';display:block;width:16px;height:2px;background:#2563eb}h1.page-h1{font-size:clamp(1.875rem,4vw,2.75rem);font-weight:700;line-height:1.1;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:24px}.answer-box{background:#eff6ff;border-left:3px solid #2563eb;border-radius:0 6px 6px 0;padding:20px 24px;margin-bottom:32px;font-size:1rem;color:#1e40af;line-height:1.7;font-weight:500}.btn-primary{display:inline-flex;align-items:center;gap:8px;background:#2563eb;color:#fff;font-size:1rem;font-weight:700;padding:14px 24px;border-radius:4px;white-space:nowrap}.btn-primary:hover{background:#1d4ed8}.btn-secondary{display:inline-flex;align-items:center;gap:6px;background:#fff;color:#2563eb;font-size:1rem;font-weight:700;padding:13px 22px;border-radius:4px;border:1.5px solid #2563eb;white-space:nowrap}.trust-bar{background:#0a0a0a;padding:14px 0}.trust-bar-inner{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.trust-item{display:flex;align-items:center;gap:8px;padding:4px 24px;border-right:1px solid rgba(255,255,255,.1);font-size:.8125rem;font-weight:600;color:rgba(255,255,255,.9);white-space:nowrap}.trust-item:last-child{border-right:none}.section-label{font-size:.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#2563eb;margin-bottom:12px}.section-title{font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em;color:#0a0a0a;line-height:1.15;margin-bottom:16px}main.page-main{padding:56px 0 0}.problems-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}.problem-card{background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px}.problem-name{font-size:.9375rem;font-weight:700;color:#0a0a0a;margin-bottom:6px}.problem-desc{font-size:.875rem;color:#6b7280;line-height:1.5}.pricing-table{width:100%;border-collapse:collapse;margin-top:24px;font-size:.9375rem}.pricing-table th,.pricing-table td{padding:12px 16px;border-bottom:1px solid #e5e7eb;text-align:left}.pricing-table th{background:#f9fafb;font-weight:600;color:#0a0a0a;font-size:.8125rem;text-transform:uppercase;letter-spacing:.05em}.pricing-table td:last-child{font-weight:600;color:#2563eb;white-space:nowrap}.faq-item{border-bottom:1px solid #e5e7eb}.faq-question{display:flex;justify-content:space-between;align-items:center;padding:18px 0;cursor:pointer;gap:16px;list-style:none;font-weight:600;font-size:1rem;color:#0a0a0a}.faq-question::-webkit-details-marker{display:none}.faq-icon{font-size:1.25rem;color:#2563eb;flex-shrink:0;transition:transform .2s}details[open] .faq-icon{transform:rotate(45deg)}.faq-answer{padding:0 0 18px;font-size:.9375rem;color:#374151;line-height:1.7}.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}.related-link{display:block;padding:10px 14px;background:#fff;border:1px solid #e5e7eb;border-radius:6px;font-size:.875rem;font-weight:500;color:#2563eb}.brand-chip{display:inline-block;padding:8px 16px;background:#fff;border:1px solid #e5e7eb;border-radius:999px;font-size:.875rem;font-weight:600;color:#0a0a0a}.fade-in{opacity:0;transition:opacity .35s ease}.fade-in.visible{opacity:1}.lz-trust-block{max-width:880px;margin:24px auto;padding:24px 20px;border:1px solid rgba(15,23,42,0.08);border-radius:12px;background:#FAFAFA;font-size:15px;line-height:1.65;color:#374151}.lz-trust-h{font-size:1.2rem;margin:0 0 10px;color:#0f172a;font-weight:700}.lz-trust-intro{margin:0 0 14px;color:#334155}.lz-trust-points{list-style:none;margin:0 0 16px;padding:0;display:grid;gap:8px}.lz-trust-points li{padding-left:22px;position:relative;color:#475569;font-size:14px}.lz-trust-points li::before{content:"\\2713";position:absolute;left:0;top:0;color:#2563eb;font-weight:700}.lz-quick-form{display:grid;gap:10px;padding:14px;border:1px dashed rgba(15,23,42,0.12);border-radius:10px;background:#fff}.lz-quick-form-lead{margin:0 0 4px;font-size:13px;color:#475569}.lz-quick-field{display:flex;flex-direction:column;gap:4px;font-size:12px;color:#475569;font-weight:600}.lz-quick-field input,.lz-quick-field textarea{padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:14px;color:#0f172a;background:#fff;font-family:inherit}.lz-quick-submit{padding:10px 18px;background:#2563eb;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;font-size:14px}footer.fx-footer{background:#0a0a0a;color:rgba(255,255,255,.7);padding:40px 0;margin-top:80px}.fx-footer-inner{max-width:1200px;margin:0 auto;padding:0 24px}.fx-footer-cta-strip{background:#1e3a5f;border-radius:8px;padding:24px;margin-bottom:32px}.fx-footer-cta-content{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}.fx-footer-cta-label{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#93c5fd;display:block;margin-bottom:4px}.fx-footer-cta-text p{color:rgba(255,255,255,.8);font-size:.9rem;margin:0}.fx-footer-cta-btns{display:flex;gap:10px;flex-wrap:wrap}.fx-footer-btn-book{background:#2563eb;color:#fff;padding:10px 20px;border-radius:4px;font-weight:700;font-size:.9rem}.fx-footer-btn-call{background:transparent;color:#93c5fd;padding:10px 20px;border-radius:4px;font-weight:600;font-size:.9rem;border:1px solid rgba(147,197,253,.3)}.fx-footer-columns{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;margin-bottom:32px}.fx-footer-logo{display:flex;align-items:center;gap:8px;margin-bottom:12px}.fx-footer-logo-icon{color:#2563eb}.fx-footer-logo-name{font-weight:700;color:#fff;font-size:1rem}.fx-footer-desc{font-size:.875rem;color:rgba(255,255,255,.6);line-height:1.6;margin-bottom:16px}.fx-footer-address{font-size:.875rem;color:rgba(255,255,255,.6);line-height:1.7}.fx-footer-hours{font-size:.8125rem;color:rgba(255,255,255,.5);margin-top:12px;display:flex;flex-direction:column;gap:2px}.fx-footer-hours strong{color:rgba(255,255,255,.7)}.fx-footer-heading{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin-bottom:12px}.fx-footer-list{list-style:none;display:flex;flex-direction:column;gap:8px}.fx-footer-list a{font-size:.875rem;color:rgba(255,255,255,.6)}.fx-footer-list a:hover{color:#fff}.fx-footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:20px;text-align:center}.fx-copyright{font-size:.8125rem;color:rgba(255,255,255,.3)}.sticky-cta{position:fixed;bottom:24px;right:24px;z-index:200}.sticky-btn{display:flex;align-items:center;gap:8px;padding:12px 20px;border-radius:50px;font-size:.9375rem;font-weight:700;box-shadow:0 4px 16px rgba(0,0,0,.2)}.sticky-book{background:#2563eb;color:#fff}@media(max-width:768px){.problems-grid{grid-template-columns:1fr}.fx-footer-columns{grid-template-columns:1fr}}@media(max-width:640px){h1.page-h1{font-size:1.75rem}.sticky-cta{display:none}}`;

function makeProblems(svc) {
  if (svc === 'dishwasher') return '<div class="problem-card"><div class="problem-name">Not draining / standing water</div><div class="problem-desc">Drain pump failure or clogged drain hose. OEM pump assemblies on truck for same-day repair.</div></div><div class="problem-card"><div class="problem-name">Spray arm calcification</div><div class="problem-desc">EPCOR hard water (170-200 mg/L) clogs nozzles after 6-10 years. Spray arm replacement + descale same-day.</div></div><div class="problem-card"><div class="problem-name">Heating element failure</div><div class="problem-desc">Dishes wet at end of cycle. Element burnout at 8-15 years. OEM replacement same-day for major brands.</div></div><div class="problem-card"><div class="problem-name">Door latch / won\'t start</div><div class="problem-desc">Latch micro-switch failure prevents start. 30-min OEM replacement. Common across all brands.</div></div><div class="problem-card"><div class="problem-name">Control board / fault codes</div><div class="problem-desc">Bosch E15/E22/E24 and Samsung/LG codes. Proprietary diagnostics for accurate fault ID.</div></div><div class="problem-card"><div class="problem-name">Door gasket leak</div><div class="problem-desc">Gasket failure lets water escape. OEM gasket replacement same-day for major brands.</div></div>';
  if (svc === 'washer') return '<div class="problem-card"><div class="problem-name">Not spinning / drum stuck</div><div class="problem-desc">Drive belt or motor coupling failure. OEM parts on truck for same-day repair.</div></div><div class="problem-card"><div class="problem-name">Not draining / flooded tub</div><div class="problem-desc">Drain pump blockage or failure. We carry OEM pump assemblies for Whirlpool, Maytag, Samsung same-day.</div></div><div class="problem-card"><div class="problem-name">Loud banging / vibrating</div><div class="problem-desc">Worn drum bearings or loose counterweights. Bearing replacement stops noise and extends appliance life.</div></div><div class="problem-card"><div class="problem-name">Not filling with water</div><div class="problem-desc">Inlet valve failure or pressure switch fault. Quick OEM replacement, same-day available.</div></div><div class="problem-card"><div class="problem-name">Error codes / control board</div><div class="problem-desc">Samsung, LG, Bosch front-loaders throw multiple codes. Diagnostic tools for all major platforms.</div></div><div class="problem-card"><div class="problem-name">Door latch (front-loader)</div><div class="problem-desc">Front-load door interlock failure prevents operation. OEM latch assembly replaced same-day.</div></div>';
  return '<div class="problem-card"><div class="problem-name">Not cooling / warm fridge</div><div class="problem-desc">Compressor, thermostat, or refrigerant issue. Diagnose and repair all cooling failures same-day.</div></div><div class="problem-card"><div class="problem-name">Excessive frost buildup</div><div class="problem-desc">Defrost heater or thermostat failure. OEM replacement prevents freezer compartment ice-over.</div></div><div class="problem-card"><div class="problem-name">Water leaking onto floor</div><div class="problem-desc">Defrost drain blockage or door gasket failure. Quick diagnosis and same-day repair available.</div></div><div class="problem-card"><div class="problem-name">Ice maker not working</div><div class="problem-desc">Water inlet valve, ice maker module, or auger motor failure. OEM parts for Samsung, LG, Whirlpool.</div></div><div class="problem-card"><div class="problem-name">Loud compressor noise</div><div class="problem-desc">Start relay or compressor wear. We assess repair-vs-replace before any work begins.</div></div><div class="problem-card"><div class="problem-name">Door gasket / seal failure</div><div class="problem-desc">Worn gasket raises humidity inside fridge and increases energy use. OEM replacement same-day.</div></div>';
}

function makePricing(svc) {
  if (svc === 'dishwasher') return '<tr><td>Drain pump replacement</td><td>$180&ndash;$280</td></tr><tr><td>Heating element replacement</td><td>$150&ndash;$240</td></tr><tr><td>Door gasket replacement</td><td>$140&ndash;$220</td></tr><tr><td>Spray arm + bearing</td><td>$90&ndash;$160</td></tr><tr><td>Control board</td><td>$240&ndash;$420</td></tr><tr><td>Circulation motor</td><td>$220&ndash;$360</td></tr>';
  if (svc === 'washer') return '<tr><td>Drain pump replacement</td><td>$160&ndash;$280</td></tr><tr><td>Drive belt / motor coupling</td><td>$130&ndash;$220</td></tr><tr><td>Drum bearing replacement</td><td>$220&ndash;$380</td></tr><tr><td>Inlet valve replacement</td><td>$120&ndash;$200</td></tr><tr><td>Control board</td><td>$250&ndash;$430</td></tr><tr><td>Door latch (front-load)</td><td>$130&ndash;$220</td></tr>';
  return '<tr><td>Thermostat / temperature sensor</td><td>$140&ndash;$240</td></tr><tr><td>Defrost heater replacement</td><td>$160&ndash;$280</td></tr><tr><td>Compressor start relay</td><td>$120&ndash;$200</td></tr><tr><td>Water inlet valve (ice maker)</td><td>$130&ndash;$220</td></tr><tr><td>Door gasket replacement</td><td>$150&ndash;$260</td></tr><tr><td>Control board</td><td>$260&ndash;$440</td></tr>';
}

function patternText(n, svc) {
  if (svc === 'dishwasher') return '<p>' + n.desc + '</p><p>We keep ' + n.display + '-specific dishwasher parts on our trucks. Whirlpool, GE, Frigidaire are the most common brands we service in ' + n.display + '. Same-day slots fill quickly on weekday mornings — book early.</p>';
  if (svc === 'washer') return '<p>' + n.display + ' is a ' + n.era + ' ' + n.region + ' neighbourhood where washer repair calls follow patterns tied to appliance age. Top-load washers dominate older homes — drive belt failures, water inlet valve blockages, and lid switch faults are the most frequent. Front-load washers in more recent renovations present door latch failures and bearing wear. EPCOR hard water at 170-200 mg/L also accelerates inlet valve screen blockage. Our technicians reach ' + n.display + ' in approximately ' + n.travel + ' from our 102A Avenue hub.</p><p>We stock OEM washer parts for Whirlpool, Samsung, and LG. Same-day service is available most weekdays when you book before noon.</p>';
  return '<p>' + n.display + ' is a ' + n.era + ' ' + n.region + ' neighbourhood. Fridge repair calls here are dominated by cooling failures in Samsung and LG models and ice maker blockages in Whirlpool French-door units — accelerated by EPCOR\'s 170-200 mg/L hard water, which clogs water inlet valves and ice maker lines. Defrost heater failures are also common in older units. Our technicians travel from the 102A Avenue hub to ' + n.display + ' in approximately ' + n.travel + '.</p><p>We carry compressor start relays, defrost heaters, and door gaskets for Samsung, Whirlpool, and LG platforms. Book before noon for same-day service.</p>';
}

function makeHardWaterFaq(n, svc) {
  if (svc === 'dishwasher') return '<details class="faq-item"><summary class="faq-question"><span>Does hard water affect my dishwasher in ' + n.display + '?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Yes &mdash; EPCOR water in ' + n.display + ' runs at 170&ndash;200 mg/L hardness. Over time this calcifies spray arm nozzles, blocks inlet valve screens, and degrades door gaskets. We descale and replace affected components as part of every ' + n.display + ' dishwasher repair.</p></div></details>';
  if (svc === 'washer') return '<details class="faq-item"><summary class="faq-question"><span>Is hard water a problem for washers in ' + n.display + '?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Yes &mdash; EPCOR water in ' + n.display + ' runs at 170&ndash;200 mg/L hardness. Hard water accelerates drum seal wear and can clog inlet valve screens. We inspect and address mineral scale during every ' + n.display + ' washer repair visit.</p></div></details>';
  return '<details class="faq-item"><summary class="faq-question"><span>Does Edmonton\'s hard water affect fridges in ' + n.display + '?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>EPCOR water in ' + n.display + ' runs at 170&ndash;200 mg/L hardness. Ice makers and water dispensers are most affected &mdash; mineral scale blocks inlet valves and water lines. We clear and replace affected components during every fridge repair visit in ' + n.display + '.</p></div></details>';
}

function makePage(n, svc) {
  const title = svc === 'dishwasher' ? 'Dishwasher Repair' : svc === 'washer' ? 'Washer Repair' : 'Fridge Repair';
  const prefix = svc === 'dishwasher' ? 'dishwasher-repair' : svc === 'washer' ? 'washer-repair' : 'fridge-repair';
  const hub = svc === 'dishwasher' ? 'dishwasher-repair-edmonton' : svc === 'washer' ? 'washer-repair-edmonton' : 'fridge-repair-edmonton';
  const hubLabel = svc === 'dishwasher' ? 'Dishwasher Repair Edmonton' : svc === 'washer' ? 'Washer Repair Edmonton' : 'Fridge Repair Edmonton';
  const cost = svc === 'dishwasher' ? '$120–$380' : svc === 'washer' ? '$130–$390' : '$140–$420';
  const id = svc.charAt(0) + '-' + n.slug;
  const other1 = svc === 'dishwasher' ? 'washer-repair-' + n.slug : 'dishwasher-repair-' + n.slug;
  const other1l = svc === 'dishwasher' ? 'Washer Repair' : 'Dishwasher Repair';
  const other2 = svc === 'fridge' ? 'washer-repair-' + n.slug : 'fridge-repair-' + n.slug;
  const other2l = svc === 'fridge' ? 'Washer Repair' : 'Fridge Repair';
  const applWord = svc === 'fridge' ? 'fridges' : svc + 's';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} ${n.display} Edmonton | Fixlify</title>
<meta name="description" content="${title} in ${n.display}, Edmonton — same-day service, flat $65 diagnostic, 90-day warranty. All brands. Book online or email edmonton@fixlifyservices.com.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://fixlifyservices.com/${prefix}-${n.slug}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/tokens.css">
<style>${CSS}</style>
<meta property="og:type" content="website">
<meta property="og:title" content="${title} ${n.display} Edmonton | Fixlify">
<meta property="og:description" content="Same-day ${title.toLowerCase()} in ${n.display}, Edmonton. From $65 diagnostic, 90-day warranty.">
<meta property="og:url" content="https://fixlifyservices.com/${prefix}-${n.slug}">
<meta property="og:site_name" content="Fixlify Appliance Services">
<meta property="og:image" content="https://fixlifyservices.com/og-image.jpg">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"ProfessionalService","@id":"https://fixlifyservices.com/${prefix}-${n.slug}#business","name":"${title} in ${n.display}, Edmonton","description":"${title} in ${n.display}, Edmonton. Same-day service, $65 diagnostic, 90-day warranty.","url":"https://fixlifyservices.com/${prefix}-${n.slug}","priceRange":"$","address":{"@type":"PostalAddress","streetAddress":"10025 102A Avenue NW Suite 1000","addressLocality":"Edmonton","addressRegion":"AB","postalCode":"T5J 2Z2","addressCountry":"CA"},"areaServed":[{"@type":"City","name":"Edmonton"},{"@type":"Neighborhood","name":"${n.display}"}],"serviceType":"${title}"}
<\/script>
</head>
<body>
<div id="header-placeholder"></div>
<script src="/includes/header-loader.js" defer><\/script>
<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="container"><a href="/">Home</a><span class="breadcrumb-sep">/</span><a href="/${hub}">${hubLabel}</a><span class="breadcrumb-sep">/</span><span class="breadcrumb-current">${n.display}</span></div>
</nav>
<section class="page-hero" aria-label="Page header">
  <div class="container">
    <div class="page-hero-eyebrow">Fixlify Appliance Services &middot; ${n.display}, Edmonton</div>
    <h1 class="page-h1">${title} in ${n.display}, Edmonton</h1>
    <section class="lz-trust-block" aria-labelledby="lz-h-${id}">
      <h2 id="lz-h-${id}" class="lz-trust-h">Why ${n.display} residents choose Fixlify for ${title.toLowerCase()}</h2>
      <p class="lz-trust-intro">Our <strong>founder Alex</strong> leads 6 TSSA-licensed, insured technicians with 30+ years combined experience since 2017. Written quote, 90-day parts &amp; labour warranty on every repair.</p>
      <ul class="lz-trust-points">
        <li><strong>Same-day service</strong> when you book before 12 PM on a weekday.</li>
        <li><strong>All brands</strong> &mdash; Whirlpool, GE, Frigidaire, Maytag, Bosch.</li>
        <li><strong>${n.travel}</strong> from our Edmonton hub.</li>
      </ul>
      <form class="lz-quick-form" action="/contact" method="post" aria-label="Quick repair request">
        <p class="lz-quick-form-lead">Send a quick request &mdash; we'll respond within 30 minutes.</p>
        <label class="lz-quick-field"><span>Your name</span><input type="text" name="name" autocomplete="name" required></label>
        <label class="lz-quick-field"><span>Phone number</span><input type="tel" name="phone" autocomplete="tel" required></label>
        <label class="lz-quick-field"><span>Neighbourhood</span><input type="text" name="city" value="${n.display}, Edmonton" autocomplete="address-level2"></label>
        <label class="lz-quick-field"><span>What needs fixing?</span><textarea name="issue" rows="3" placeholder="e.g. Whirlpool ${svc} not working"></textarea></label>
        <button type="submit" class="lz-quick-submit">Request a callback</button>
      </form>
    </section>
    <div class="answer-box">Fixlify provides same-day ${title.toLowerCase()} in ${n.display}, Edmonton. We fix all brands &mdash; Whirlpool, GE, Frigidaire, Maytag, Bosch. ${cost} CAD typical cost, 90-day warranty. Book online or email edmonton@fixlifyservices.com.</div>
    <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="btn-secondary" target="_blank" rel="noopener">Book Online &rarr;</a></div>
  </div>
</section>
<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem 1.25rem;margin:1rem auto;max-width:900px;border-radius:0 8px 8px 0">
  <div style="font-size:.7rem;font-weight:700;letter-spacing:.08em;color:#2563eb;text-transform:uppercase;margin-bottom:.4rem">Quick Answer</div>
  <p style="margin:0;color:#1e3a5f;font-size:.9rem;line-height:1.6">Fixlify provides same-day ${title.toLowerCase()} in ${n.display}, Edmonton &mdash; 7 days a week. ${cost} CAD typical cost. Whirlpool, GE, Frigidaire. 90-day parts &amp; labour warranty.</p>
</div>
<div class="trust-bar"><div class="trust-bar-inner"><div class="trust-item">&#128176; $65 flat diagnostic</div><div class="trust-item">&#10003; No Hidden Fees</div><div class="trust-item">&#9873; Same-Day Service</div><div class="trust-item">&#128737; 90-Day Warranty</div></div></div>
<main class="page-main container" id="main-content">
  <div class="fade-in" style="max-width:760px;font-size:1.0625rem;color:#374151;line-height:1.75;margin-bottom:56px">
    <h2 style="font-size:1.375rem;font-weight:700;color:#0a0a0a;margin-bottom:16px">${title} in ${n.display} &mdash; ${n.era} ${n.region}</h2>
    <p>Who fixes ${applWord} in ${n.display}? <strong>Fixlify Appliance Services Edmonton</strong> &mdash; same-day ${title.toLowerCase()} throughout ${n.display} and surrounding Edmonton communities. Book online or email <a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a>. Flat <strong>$65 diagnostic</strong>, Mon&ndash;Sat 8AM&ndash;8PM, Sun 10AM&ndash;6PM Mountain Time. Typical cost: <strong>${cost} CAD</strong>. <strong>90-day warranty</strong> on every repair.</p>
    <p>${n.desc}</p>
    <p>Our Edmonton hub at 10025 102A Avenue NW dispatches to ${n.display} in approximately ${n.travel}. Edmonton's EPCOR water runs at 170&ndash;200 mg/L hardness &mdash; among the highest in Alberta &mdash; which accelerates mineral scale and component wear in household appliances across the region.</p>
  </div>
  <section style="padding:48px 0;border-top:1px solid #e5e7eb">
    <div class="section-label">Common issues</div>
    <h2 class="section-title">Common ${n.display} ${title} Problems</h2>
    <p style="max-width:760px;color:#374151;line-height:1.7;margin-bottom:24px">The ${svc} faults we diagnose most frequently in ${n.display}, weighted toward the Whirlpool, GE, Frigidaire, Maytag, Bosch appliance profile.</p>
    <div class="problems-grid">${makeProblems(svc)}</div>
  </section>
  <section style="margin-top:48px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Brand expertise</div>
    <h2 class="section-title">${title} Brands We Service in ${n.display}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:8px;max-width:880px"><span class="brand-chip">Whirlpool</span><span class="brand-chip">GE</span><span class="brand-chip">Frigidaire</span><span class="brand-chip">Maytag</span><span class="brand-chip">Bosch</span><span class="brand-chip">Samsung</span><span class="brand-chip">LG</span></div>
  </section>
  <section style="margin-top:56px">
    <div class="section-label">Transparent pricing</div>
    <h2 class="section-title">${title} Pricing in ${n.display}</h2>
    <p style="max-width:760px;color:#374151;line-height:1.7;margin-bottom:20px">All ${n.display} repairs start with a flat <strong>$65 diagnostic</strong>, waived when you proceed with the repair. Written quote before any work begins.</p>
    <table class="pricing-table" style="max-width:760px">
      <thead><tr><th>Repair type</th><th>Typical range (parts + labour)</th></tr></thead>
      <tbody>
        <tr><td>Diagnostic visit (waived with repair)</td><td>$65</td></tr>
        ${makePricing(svc)}
      </tbody>
    </table>
    <p style="font-size:.8125rem;color:#6b7280;margin-top:12px">All prices include parts, labour, and a <strong>90-day warranty</strong>.</p>
  </section>
  <section style="margin-top:56px;padding:32px;background:#eff6ff;border-radius:8px;border-left:4px solid #2563eb">
    <div class="section-label">${n.display} service patterns</div>
    <h2 class="section-title">What we see most on our ${n.display} ${svc} call sheet</h2>
    <div style="max-width:840px;color:#1e40af;line-height:1.75;font-size:1rem">${patternText(n, svc)}</div>
  </section>
  <section class="fade-in" style="margin-top:56px;padding:56px 0;border-top:1px solid #e5e7eb;text-align:center">
    <div class="section-label">Online booking</div>
    <h2 style="font-size:1.75rem;font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:12px">Book ${title} in ${n.display}</h2>
    <p style="color:#6b7280;margin-bottom:24px">Real-time availability, instant confirmation.</p>
    <iframe id="fxbk-${id}" src="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce?embed=true" style="width:100%;height:600px;border:none;display:block" title="Book a Service" loading="lazy" allowtransparency="true"></iframe>
    <script>window.addEventListener('message',function(e){if(e.data&&e.data.type==='fixlify-resize'){var el=document.getElementById('fxbk-${id}');if(el)el.style.height=e.data.height+'px'}});<\/script>
    <p style="font-size:.9375rem;color:#6b7280;margin-top:16px">Prefer email? <a href="mailto:edmonton@fixlifyservices.com" style="color:#2563eb;font-weight:600">edmonton@fixlifyservices.com</a></p>
  </section>
  <section style="padding:56px 0;border-top:1px solid #e5e7eb">
    <h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em;color:#0a0a0a;margin-bottom:32px">FAQ &mdash; ${title} in ${n.display}</h2>
    <details class="faq-item"><summary class="faq-question"><span>How fast can you reach ${n.display}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Approximately ${n.travel}. Same-day service when you book before 12 PM Monday&ndash;Saturday. Sunday crew available 10 AM&ndash;6 PM Mountain Time.</p></div></details>
    ${makeHardWaterFaq(n, svc)}
    <details class="faq-item"><summary class="faq-question"><span>How much does ${title.toLowerCase()} cost in ${n.display}?</span><span class="faq-icon">+</span></summary><div class="faq-answer"><p>Typical ${title.toLowerCase()} in ${n.display} runs ${cost} CAD including parts and labour. Flat $65 diagnostic waived when you proceed with the repair. Written quote before any work begins. 90-day parts and labour warranty.</p></div></details>
  </section>
  <section style="margin-top:56px;padding:32px;background:#f9fafb;border-radius:8px">
    <div class="section-label">Other ${n.display} services</div>
    <h2 class="section-title">Other Appliance Repair in ${n.display}</h2>
    <div class="related-grid">
      <a href="/${other1}" class="related-link">${other1l} &mdash; ${n.display}</a>
      <a href="/${other2}" class="related-link">${other2l} &mdash; ${n.display}</a>
      <a href="/${hub}" class="related-link">${hubLabel}</a>
    </div>
  </section>
  <section style="margin-top:56px;padding:40px;background:#0a0a0a;border-radius:8px;text-align:center;color:#fff">
    <h2 style="font-size:1.75rem;font-weight:700;color:#fff;margin-bottom:12px">Ready to book ${title.toLowerCase()} in ${n.display}?</h2>
    <p style="color:rgba(255,255,255,.8);margin-bottom:24px;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.6">Same-day service, $65 flat diagnostic, written quote before any work, 90-day warranty.</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="btn-primary" target="_blank" rel="noopener">Book Online &rarr;</a>
      <a href="mailto:edmonton@fixlifyservices.com" class="btn-secondary">Email Edmonton Team</a>
    </div>
  </section>
</main>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How fast can you reach ${n.display}?","acceptedAnswer":{"@type":"Answer","text":"Approximately ${n.travel}. Same-day service when you book before 12 PM Monday-Saturday. Sunday crew available 10 AM-6 PM Mountain Time."}},{"@type":"Question","name":"How much does ${title.toLowerCase()} cost in ${n.display}?","acceptedAnswer":{"@type":"Answer","text":"Typical ${title.toLowerCase()} in ${n.display} runs ${cost} CAD. Flat $65 diagnostic waived with repair. 90-day warranty."}}]}
<\/script>
<footer class="fx-footer" role="contentinfo"><div class="fx-footer-inner">
  <div class="fx-footer-cta-strip"><div class="fx-footer-cta-content"><div class="fx-footer-cta-text"><span class="fx-footer-cta-label">Edmonton Appliance Repair</span><p>Book online &mdash; ${n.display} and all Edmonton CMA.</p></div><div class="fx-footer-cta-btns"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="fx-footer-btn-book" rel="noopener">Book Online Now</a><a href="mailto:edmonton@fixlifyservices.com" class="fx-footer-btn-call">edmonton@fixlifyservices.com</a></div></div></div>
  <div class="fx-footer-columns">
    <div class="fx-footer-col fx-footer-brand"><div class="fx-footer-logo"><div class="fx-footer-logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg></div><span class="fx-footer-logo-name">Fixlify</span></div><p class="fx-footer-desc">Edmonton Appliance Repair. ${n.display} and all Edmonton CMA communities.</p><address class="fx-footer-address" style="font-style:normal;margin:14px 0">10025 102A Avenue NW, Suite 1000<br>Edmonton, AB T5J 2Z2</address><div class="fx-footer-hours"><strong>Service Hours (Mountain Time)</strong><span>Monday&ndash;Saturday: 8 AM &ndash; 8 PM</span><span>Sunday: 10 AM &ndash; 6 PM</span></div></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Services</h4><ul class="fx-footer-list"><li><a href="/services/refrigerator-repair-edmonton/">Fridge Repair Edmonton</a></li><li><a href="/services/washer-repair-edmonton/">Washer Repair Edmonton</a></li><li><a href="/services/dishwasher-repair-edmonton/">Dishwasher Repair Edmonton</a></li></ul></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Neighbourhoods</h4><ul class="fx-footer-list"><li><a href="/${prefix}-${n.slug}">${n.display}</a></li><li><a href="/${prefix}-${n.nearby1}">${n.nearby1d}</a></li><li><a href="/${hub}">${hubLabel}</a></li></ul></div>
    <div class="fx-footer-col"><h4 class="fx-footer-heading">Quick Links</h4><ul class="fx-footer-list"><li><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" rel="noopener">Book Online</a></li><li><a href="/about/">About Us</a></li><li><a href="/sitemap.xml">Sitemap</a></li></ul><h4 class="fx-footer-heading" style="margin-top:24px">Contact</h4><ul class="fx-footer-list"><li><a href="mailto:edmonton@fixlifyservices.com">edmonton@fixlifyservices.com</a></li></ul></div>
  </div>
  <div class="fx-footer-bottom"><p class="fx-copyright">&copy; <span id="fx-yr-${id}"></span> Fixlify Appliance Repair Edmonton | ${n.display} | Online Booking Available</p></div>
</div></footer>
<script>(function(){var el=document.getElementById('fx-yr-${id}');if(el)el.textContent=new Date().getFullYear()})();<\/script>
<div class="sticky-cta"><a href="https://hub.fixlify.app/book/nicks-appliance-repair-b8c8ce" class="sticky-btn sticky-book" target="_blank" rel="noopener">Book Online &rarr;</a></div>
<script>document.addEventListener('DOMContentLoaded',function(){var els=document.querySelectorAll('.fade-in');if('IntersectionObserver' in window){var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.1});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('visible')})}});<\/script>
</body>
</html>`;
}

let count = 0;
for (const n of neighborhoods) {
  for (const svc of ['dishwasher', 'washer', 'fridge']) {
    const prefix = svc === 'dishwasher' ? 'dishwasher-repair' : svc === 'washer' ? 'washer-repair' : 'fridge-repair';
    const path = 'C:/fixlifyservices/' + prefix + '-' + n.slug + '.html';
    if (n.slug === 'lauderdale' && svc === 'dishwasher') { count++; continue; }
    fs.writeFileSync(path, makePage(n, svc), 'utf8');
    count++;
    process.stdout.write('wrote ' + path + '\n');
  }
}
process.stdout.write('\nDone: ' + count + ' files\n');
