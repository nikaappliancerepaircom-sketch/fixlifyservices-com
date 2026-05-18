// expand-content.js — FIXLIFY Edmonton content expander
// Adds content sections to service pages under 1500 words
// Run from C:/fixlifyservices/

const fs = require('fs');
const path = require('path');

const SITE_DIR = path.resolve(__dirname);
const CITY = 'Edmonton';

function toTitle(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function extractInfo(filename) {
  const base = path.basename(filename, '.html');
  if (/^dishwasher-repair-.+/.test(base)) return { service: 'dishwasher', neighborhood: toTitle(base.replace('dishwasher-repair-', '')) };
  if (/^washer-repair-.+/.test(base)) return { service: 'washer', neighborhood: toTitle(base.replace('washer-repair-', '')) };
  if (/^fridge-repair-.+/.test(base)) return { service: 'fridge', neighborhood: toTitle(base.replace('fridge-repair-', '')) };
  if (/^(lg|samsung|whirlpool|bosch|ge|frigidaire|kenmore|maytag|kitchenaid|electrolux)-/.test(base)) return { service: 'brand', neighborhood: CITY };
  return null;
}

function countWords(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(/\s+/).filter(w => w.length > 0).length;
}

function injectBeforeFaq(html, injection) {
  const marker = '<section class="faq-section fade-in">';
  const idx = html.indexOf(marker);
  if (idx !== -1) return html.slice(0, idx) + injection + '\n' + html.slice(idx);
  const alt = html.lastIndexOf('</main>');
  if (alt !== -1) return html.slice(0, alt) + injection + '\n' + html.slice(alt);
  return html + injection;
}

function getSections(service, N, idx) {
  const C = CITY;

  const dishwasher = [
    `<section style="margin-top:48px;padding-top:40px;border-top:1px solid #e5e7eb">
<h2 style="font-size:1.375rem;font-weight:700;letter-spacing:-.02em;color:#0a0a0a;margin-bottom:16px">Common Dishwasher Problems We Fix in ${N}</h2>
<p style="color:#374151;line-height:1.75;margin-bottom:14px">${C}'s EPCOR water supply carries 170–200 mg/L of dissolved minerals — among the highest in Western Canada. Over time, this mineral load silently attacks dishwasher components in ${N} homes, showing up as cloudy glasses, poor cleaning, and error codes before homeowners realize the root cause is water chemistry, not mechanical failure alone.</p>
<ul style="list-style:none;padding:0;display:grid;gap:10px;margin:0 0 14px">
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Dishes not getting clean</strong> — blocked spray arms from mineral buildup are the leading cause. We clear the arms and run a citric acid flush to restore spray pressure across all ${N} dishwasher brands.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Standing water at the bottom</strong> — a clogged filter or failed drain pump traps water after the cycle ends. One of the most frequent dishwasher call types we receive from ${N}.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Door leaking onto the floor</strong> — worn gaskets or failed hinge springs. Gasket replacement in ${N} typically runs $80–$140 all-in including labour.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Dishes not drying properly</strong> — a failed heating element or vent fan. Scale deposits accelerate element failure in hard-water areas like ${N}. Replacement: $150–$240.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>F2, E24, or other error codes</strong> — sensor or control board faults. We carry replacement boards for Whirlpool, GE, Samsung, and LG platforms on our service vehicles.</li>
</ul>
<p style="color:#374151;line-height:1.75;font-size:.9375rem">Most dishwasher repairs in ${N} are completed in a single visit. We carry OEM parts on our trucks and provide a written quote before any work begins — no surprises on the invoice.</p>
</section>`,

    `<section style="margin-top:48px;padding-top:40px;border-top:1px solid #e5e7eb">
<h2 style="font-size:1.375rem;font-weight:700;letter-spacing:-.02em;color:#0a0a0a;margin-bottom:16px">How Our Dishwasher Repair Works in ${N}</h2>
<p style="color:#374151;line-height:1.75;margin-bottom:14px">Booking a dishwasher repair in ${N} with Fixlify takes less than 5 minutes online, and most repairs are completed the same day you call. Here is what to expect from start to finish:</p>
<div style="display:grid;gap:14px;margin:0 0 14px">
  <div style="padding:16px 20px;background:#f9fafb;border-radius:6px;border-left:3px solid #2563eb">
    <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#2563eb;margin-bottom:6px">Step 1 — Book Online</div>
    <p style="margin:0;color:#374151;font-size:.9375rem;line-height:1.65">Select your ${N} address, describe the symptom, and choose a same-day or next-day window. You get instant confirmation by email with your technician's estimated arrival window.</p>
  </div>
  <div style="padding:16px 20px;background:#f9fafb;border-radius:6px;border-left:3px solid #2563eb">
    <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#2563eb;margin-bottom:6px">Step 2 — Flat $65 Diagnostic</div>
    <p style="margin:0;color:#374151;font-size:.9375rem;line-height:1.65">Our technician arrives at your ${N} home, runs a full component-level diagnostic, identifies the root cause, and provides a written quote. The $65 fee is waived when you proceed with the repair.</p>
  </div>
  <div style="padding:16px 20px;background:#f9fafb;border-radius:6px;border-left:3px solid #2563eb">
    <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#2563eb;margin-bottom:6px">Step 3 — Repair with OEM Parts</div>
    <p style="margin:0;color:#374151;font-size:.9375rem;line-height:1.65">We stock the most common dishwasher parts in our ${C} service vehicles — drain pumps, heating elements, door latches, spray arm assemblies, control boards, and detergent dispensers. Factory-spec parts, not generic substitutes.</p>
  </div>
  <div style="padding:16px 20px;background:#f9fafb;border-radius:6px;border-left:3px solid #2563eb">
    <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#2563eb;margin-bottom:6px">Step 4 — Test &amp; 90-Day Warranty</div>
    <p style="margin:0;color:#374151;font-size:.9375rem;line-height:1.65">We run a full wash cycle to confirm the dishwasher performs correctly before leaving your ${N} home. Every repair includes a 90-day parts and labour warranty — same fault returns, we come back at no charge.</p>
  </div>
</div>
</section>`,

    `<section style="margin-top:48px;padding-top:40px;border-top:1px solid #e5e7eb">
<h2 style="font-size:1.375rem;font-weight:700;letter-spacing:-.02em;color:#0a0a0a;margin-bottom:16px">Dishwasher Repair or Replace? A Guide for ${N} Homeowners</h2>
<p style="color:#374151;line-height:1.75;margin-bottom:14px">When your dishwasher breaks down in ${N}, the repair-vs-replace decision comes down to three factors: the age of the unit, the cost of the repair, and the current replacement cost. Here is the framework our technicians use:</p>
<div style="background:#eff6ff;border-radius:8px;padding:20px 24px;margin-bottom:16px">
  <p style="margin:0 0 8px;font-weight:700;color:#1e40af">The 50% Rule</p>
  <p style="margin:0;color:#374151;font-size:.9375rem;line-height:1.65">If the repair cost exceeds 50% of the replacement price of a comparable new unit, replacing usually makes more financial sense. A basic entry-level dishwasher in ${C} runs $550–$900 installed. If your repair quote is under $350, repairing is almost always the right call.</p>
</div>
<p style="color:#374151;line-height:1.75;margin-bottom:12px"><strong>Repair is the better choice when</strong> the unit is under 10 years old, the repair involves a single component (drain pump, door latch, heating element), and the brand is Bosch, KitchenAid, Miele, or Electrolux — brands with higher replacement costs and longer lifespans.</p>
<p style="color:#374151;line-height:1.75;margin-bottom:12px"><strong>Replacement may make more sense when</strong> the dishwasher is 12–15+ years old, you face multiple simultaneous failures, or the control board on a budget brand costs $300+ to replace.</p>
<p style="color:#374151;line-height:1.75">Our ${N} technicians give you an honest assessment during the diagnostic visit. We will tell you when replacement is the smarter financial decision rather than recommending a costly repair on a unit near end of life.</p>
</section>`,

    `<section style="margin-top:48px;padding-top:40px;border-top:1px solid #e5e7eb">
<h2 style="font-size:1.375rem;font-weight:700;letter-spacing:-.02em;color:#0a0a0a;margin-bottom:16px">Dishwasher Maintenance Tips for ${N} Homes</h2>
<p style="color:#374151;line-height:1.75;margin-bottom:14px">${C}'s hard water is particularly hard on dishwashers. At 170–200 mg/L, the mineral content in EPCOR-supplied water is significantly above the national average of 120 mg/L. ${N} homeowners who follow a simple maintenance routine extend their dishwasher's life by 3–5 years. Here is what we recommend based on the repairs we see most often:</p>
<ul style="list-style:none;padding:0;display:grid;gap:12px;margin:0 0 14px">
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">Monthly:</span> Run an empty hot cycle with white vinegar or a citric-acid tablet (Finish or Cascade dishwasher cleaner). This dissolves mineral deposits in spray arms, the heating element, and the detergent dispenser — the most critical maintenance step with ${C} water.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">Every 2 months:</span> Remove and rinse the filter basket. A clogged filter is the leading cause of draining failures and poor wash performance in ${N} dishwashers. Takes 2 minutes.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">Quarterly:</span> Check the door gasket for cracks or brittleness. ${N} winters mean the door seal experiences temperature cycling — a cracked gasket leads to leaks that damage kitchen floors.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">Always:</span> Use rinse aid. In ${C}'s hard water, rinse aid is not optional — it prevents scale spotting on glassware and helps the drying cycle perform correctly. Refill every 3–4 weeks.</li>
</ul>
<p style="color:#374151;line-height:1.75;font-size:.9375rem">If you notice any change in cleaning quality, draining, or unusual sounds, call us early. A $65 diagnostic caught before failure is far less expensive than a $280 pump replacement after it seizes.</p>
</section>`
  ];

  const washer = [
    `<section style="margin-top:48px;padding-top:40px;border-top:1px solid #e5e7eb">
<h2 style="font-size:1.375rem;font-weight:700;letter-spacing:-.02em;color:#0a0a0a;margin-bottom:16px">Common Washer Problems We Repair in ${N}</h2>
<p style="color:#374151;line-height:1.75;margin-bottom:14px">Washing machines in ${N} face a combination of regular wear and the particular demands of ${C}'s climate — hard water mineral buildup at 170–200 mg/L, temperature cycling in unheated utility rooms, and the heavy usage patterns of ${C} households. These are the washer faults our technicians see most often:</p>
<ul style="list-style:none;padding:0;display:grid;gap:10px;margin:0 0 14px">
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Drum not spinning</strong> — a failed lid switch (top-loaders) or door latch (front-loaders) prevents the spin cycle from engaging. Common on HE washers over 5 years old.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Excessive vibration or grinding during spin</strong> — worn drum bearings are the usual cause. Left untreated, a failing bearing destroys the drum shaft, dramatically increasing repair costs. Call us at the first grinding sound.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Water not draining after cycle</strong> — a blocked pump filter or failed drain pump. Front-loaders are particularly prone to small-item blockages that go undetected in ${N} homes.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Leaking water</strong> — door boot seals on front-loaders and hose connections at the back of the unit are the most common leak points. ${C}'s hard water accelerates seal deterioration.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>F21, E3, or UL error codes</strong> — these indicate specific component failures that require proper diagnosis. We clear codes with a definitive repair, not a reset workaround.</li>
</ul>
<p style="color:#374151;line-height:1.75;font-size:.9375rem">Most ${N} washer repairs are resolved in one visit. We stock drum bearings, pump assemblies, door boot seals, lid switches, and control boards for all major platforms in our service vehicles.</p>
</section>`,

    `<section style="margin-top:48px;padding-top:40px;border-top:1px solid #e5e7eb">
<h2 style="font-size:1.375rem;font-weight:700;letter-spacing:-.02em;color:#0a0a0a;margin-bottom:16px">Washer Repair Cost Guide for ${N} Homeowners</h2>
<p style="color:#374151;line-height:1.75;margin-bottom:16px">What you pay for washer repair in ${N} depends on the failed component and the brand. Here is what ${N} homeowners typically pay for the most common repairs, all including parts, labour, and the 90-day warranty:</p>
<table style="width:100%;border-collapse:collapse;max-width:700px;font-size:.9rem;margin-bottom:16px">
  <thead><tr style="background:#f9fafb"><th style="padding:10px 14px;border-bottom:2px solid #e5e7eb;text-align:left;font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;color:#6b7280">Repair Type</th><th style="padding:10px 14px;border-bottom:2px solid #e5e7eb;text-align:left;font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;color:#6b7280">Typical Cost</th></tr></thead>
  <tbody>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Drum bearing replacement</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$200–$380</td></tr>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Drain pump replacement</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$110–$210</td></tr>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Door boot seal (front-loader)</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$130–$240</td></tr>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Lid switch / door latch</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$80–$150</td></tr>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Motor coupling</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$80–$160</td></tr>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Water inlet valve</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$90–$170</td></tr>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Control board replacement</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$220–$420</td></tr>
  </tbody>
</table>
<p style="color:#374151;line-height:1.75;font-size:.9375rem">All prices include the flat $65 diagnostic (waived with repair), parts, labour, and 90-day warranty. ${N} customers receive a written quote before any work begins — you approve the price before we touch the machine.</p>
<p style="color:#374151;line-height:1.75;font-size:.9375rem;margin-top:10px">Note: drum bearing replacements on front-loaders require significant disassembly (the drum must be fully removed). If your bearing quote seems high, it reflects 2–3 hours of labour, not a parts markup.</p>
</section>`,

    `<section style="margin-top:48px;padding-top:40px;border-top:1px solid #e5e7eb">
<h2 style="font-size:1.375rem;font-weight:700;letter-spacing:-.02em;color:#0a0a0a;margin-bottom:16px">Our Washer Repair Process in ${N}</h2>
<p style="color:#374151;line-height:1.75;margin-bottom:14px">We keep the washer repair process straightforward for ${N} homeowners. From booking to a working machine, here is what to expect:</p>
<div style="display:grid;gap:14px;margin:0 0 14px">
  <div style="display:flex;gap:16px;align-items:flex-start"><div style="width:32px;height:32px;background:#2563eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;color:#fff;font-size:.875rem">1</div><div><p style="margin:0;font-weight:600;color:#0a0a0a;margin-bottom:4px">Book online in 2 minutes</p><p style="margin:0;color:#374151;font-size:.9375rem;line-height:1.65">Select washer repair, describe the symptom (not spinning, not draining, leaking, noisy, error code), and pick a same-day or next-day arrival window. Instant email confirmation.</p></div></div>
  <div style="display:flex;gap:16px;align-items:flex-start"><div style="width:32px;height:32px;background:#2563eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;color:#fff;font-size:.875rem">2</div><div><p style="margin:0;font-weight:600;color:#0a0a0a;margin-bottom:4px">$65 flat diagnostic — waived with repair</p><p style="margin:0;color:#374151;font-size:.9375rem;line-height:1.65">The technician arrives at your ${N} home and diagnoses the root cause at the component level. No extra charge for weekend or evening visits. Written quote provided before any work begins.</p></div></div>
  <div style="display:flex;gap:16px;align-items:flex-start"><div style="width:32px;height:32px;background:#2563eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;color:#fff;font-size:.875rem">3</div><div><p style="margin:0;font-weight:600;color:#0a0a0a;margin-bottom:4px">Repair with OEM parts, same visit</p><p style="margin:0;color:#374151;font-size:.9375rem;line-height:1.65">We carry bearings, pump assemblies, door seals, switches, and control boards for all major platforms. Most ${N} washer repairs are completed in a single visit — no waiting for parts to be ordered.</p></div></div>
  <div style="display:flex;gap:16px;align-items:flex-start"><div style="width:32px;height:32px;background:#2563eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;color:#fff;font-size:.875rem">4</div><div><p style="margin:0;font-weight:600;color:#0a0a0a;margin-bottom:4px">Test + 90-day warranty</p><p style="margin:0;color:#374151;font-size:.9375rem;line-height:1.65">We run a full wash and spin cycle before leaving your ${N} home. 90-day parts and labour warranty on every repair — same fault returns within 90 days, we come back at no charge.</p></div></div>
</div>
</section>`,

    `<section style="margin-top:48px;padding-top:40px;border-top:1px solid #e5e7eb">
<h2 style="font-size:1.375rem;font-weight:700;letter-spacing:-.02em;color:#0a0a0a;margin-bottom:16px">Washer Care Tips for ${N} Homeowners</h2>
<p style="color:#374151;line-height:1.75;margin-bottom:14px">A well-maintained washer lasts 12–15 years. A neglected one typically fails at 7–9 years. ${C}'s hard water and cold winters add extra stress on washing machines in ${N} homes — here is how to extend your washer's life based on the repairs we see most often:</p>
<ul style="list-style:none;padding:0;display:grid;gap:12px;margin:0 0 14px">
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">Monthly:</span> Run a hot maintenance cycle with a washer cleaner tablet (Affresh works well in ${C}'s hard water). This removes detergent residue and mineral deposits that accumulate in the drum and pump filter.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">Monthly:</span> Leave the front-loader door ajar between cycles to prevent mould growth. Wipe the door boot gasket with a damp cloth — this is where most front-loader odours and seal deterioration start.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">Quarterly:</span> Check hose connections at the back of the unit. ${C}'s hard water can cause slow leaks at the connection point that go undetected for months before causing floor damage.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">Always:</span> Use HE detergent in HE washers. Standard detergent over-suds in low-water machines and leaves residue that accelerates drum bearing wear — one of the most common causes of the grinding noise we repair in ${N} homes.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">Winter tip:</span> If your washer is in an unheated space in ${N}, do not leave damp laundry in the drum when temperatures drop below −5°C — frozen residual water in the pump can cause pump failure on the next cycle.</li>
</ul>
</section>`
  ];

  const fridge = [
    `<section style="margin-top:48px;padding-top:40px;border-top:1px solid #e5e7eb">
<h2 style="font-size:1.375rem;font-weight:700;letter-spacing:-.02em;color:#0a0a0a;margin-bottom:16px">Common Fridge Problems We Fix in ${N}</h2>
<p style="color:#374151;line-height:1.75;margin-bottom:14px">Refrigerator repair calls in ${N} peak in two seasons: summer, when compressors work harder against the heat, and late fall, when ${C}'s temperature drops rapidly and garage fridges begin cycling abnormally. These are the faults our technicians encounter most often in ${N}:</p>
<ul style="list-style:none;padding:0;display:grid;gap:10px;margin:0 0 14px">
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Fridge not cooling or not cold enough</strong> — compressor, thermostat, evaporator fan, or condenser coil failure. The evaporator fan is the most common single-point failure on modern frost-free units in ${N}.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Ice building up on the back wall</strong> — a failed defrost heater or defrost thermostat causes ice to accumulate on the evaporator. This blocks airflow and the fridge gradually warms up. Very common in ${N} during winter months.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Water dispenser or ice maker not working</strong> — a frozen fill line or failed water inlet valve. ${C} homes with in-door dispensers see frozen lines regularly during the coldest weeks of winter.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Fridge running constantly or spiking energy bill</strong> — a worn door gasket lets cold air escape and forces the compressor to run continuously. Test: close the door on a sheet of paper — if it slides out easily, the gasket is failing.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Clicking or not starting</strong> — a failing start relay is an inexpensive fix ($60–$110) that prevents a full compressor replacement ($450–$750). Catching it early saves significant money.</li>
</ul>
<p style="color:#374151;line-height:1.75;font-size:.9375rem">A non-functioning fridge is a food safety emergency. We prioritize same-day service for fridge calls in ${N} — book before noon and we aim to arrive that afternoon.</p>
</section>`,

    `<section style="margin-top:48px;padding-top:40px;border-top:1px solid #e5e7eb">
<h2 style="font-size:1.375rem;font-weight:700;letter-spacing:-.02em;color:#0a0a0a;margin-bottom:16px">Fridge Repair Costs in ${N} — What to Expect</h2>
<p style="color:#374151;line-height:1.75;margin-bottom:16px">Refrigerator repair costs in ${N} vary significantly by component. Here is what ${N} homeowners typically pay for the most common repairs, all-in with parts, labour, and 90-day warranty:</p>
<table style="width:100%;border-collapse:collapse;max-width:700px;font-size:.9rem;margin-bottom:16px">
  <thead><tr style="background:#f9fafb"><th style="padding:10px 14px;border-bottom:2px solid #e5e7eb;text-align:left;font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;color:#6b7280">Repair Type</th><th style="padding:10px 14px;border-bottom:2px solid #e5e7eb;text-align:left;font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;color:#6b7280">Typical Cost</th></tr></thead>
  <tbody>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Evaporator fan replacement</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$130–$240</td></tr>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Defrost heater + thermostat</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$110–$200</td></tr>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Door gasket replacement</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$90–$170</td></tr>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Start relay replacement</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$60–$110</td></tr>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Water inlet valve</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$90–$170</td></tr>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Thermostat / temperature sensor</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$100–$200</td></tr>
    <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151">Compressor replacement</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#2563eb;font-weight:600">$400–$750</td></tr>
  </tbody>
</table>
<p style="color:#374151;line-height:1.75;font-size:.9375rem">All prices include the $65 diagnostic (waived with repair), parts, labour, and 90-day warranty. Compressor replacements are at the high end — if your fridge is over 12 years old and needs a new compressor, we will tell you honestly if replacement makes more economic sense.</p>
</section>`,

    `<section style="margin-top:48px;padding-top:40px;border-top:1px solid #e5e7eb">
<h2 style="font-size:1.375rem;font-weight:700;letter-spacing:-.02em;color:#0a0a0a;margin-bottom:16px">Refrigerators in ${C} Winters — What ${N} Homeowners Need to Know</h2>
<p style="color:#374151;line-height:1.75;margin-bottom:14px">${C} regularly hits −30°C to −40°C in January and February. For refrigerators in garages, unheated mudrooms, or basement utility spaces in ${N}, extreme cold creates failure modes that most appliance guides don't cover. Our technicians handle more cold-weather fridge failures per capita than almost anywhere else in Canada.</p>
<ul style="list-style:none;padding:0;display:grid;gap:12px;margin:0 0 14px">
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">Garage fridges stop cooling:</span> Most refrigerators are designed to operate between 10°C and 43°C. When your ${N} garage drops below 10°C, the compressor shuts off because the ambient temperature tricks it into thinking the fridge is already cold — your freezer then warms up. A garage kit (available for some Whirlpool and GE models) or an insulated enclosure solves this.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">Frozen water lines:</span> In-door water dispensers and ice makers in ${N} homes with cold setups regularly freeze the fill line during deep cold snaps. We clear the line and reroute if needed to prevent recurrence.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">Compressor start failures:</span> Cold temperatures thicken compressor oil and increase startup resistance. A start relay on the edge of failure will fail in the first deep freeze of the ${C} winter. Replacing the relay ($60–$110) preemptively avoids a no-cooling emergency in January.</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">Door seal brittleness:</span> Rubber gaskets harden in cold weather. A brittle gasket in a ${N} cold room fails to seal properly, causing the compressor to run continuously and dramatically shortening its life.</li>
</ul>
<p style="color:#374151;line-height:1.75;font-size:.9375rem">If your ${N} fridge starts behaving oddly as temperatures drop in October or November, call us before it becomes a full failure — preventive service is far less expensive than an emergency repair in January.</p>
</section>`,

    `<section style="margin-top:48px;padding-top:40px;border-top:1px solid #e5e7eb">
<h2 style="font-size:1.375rem;font-weight:700;letter-spacing:-.02em;color:#0a0a0a;margin-bottom:16px">Our Fridge Repair Service in ${N} — What to Expect</h2>
<p style="color:#374151;line-height:1.75;margin-bottom:14px">A malfunctioning refrigerator risks your food supply — same-day service matters. Here is how we handle fridge repair in ${N} from the first call to the completed repair:</p>
<div style="display:grid;gap:14px;margin:0 0 14px">
  <div style="padding:16px 20px;background:#f9fafb;border-radius:6px;border-left:3px solid #2563eb">
    <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#2563eb;margin-bottom:6px">Same-Day Priority Dispatch</div>
    <p style="margin:0;color:#374151;font-size:.9375rem;line-height:1.65">For fridge repairs in ${N}, we prioritize same-day dispatch because a non-functioning refrigerator is an immediate food safety concern. Book before 12 PM Monday–Saturday and we aim to arrive the same afternoon.</p>
  </div>
  <div style="padding:16px 20px;background:#f9fafb;border-radius:6px;border-left:3px solid #2563eb">
    <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#2563eb;margin-bottom:6px">Component-Level Diagnosis</div>
    <p style="margin:0;color:#374151;font-size:.9375rem;line-height:1.65">We diagnose at the component level, not just the symptom. "Not cooling" could be the evaporator fan, defrost heater, compressor, thermostat, or start relay — each requires a different repair. We identify the exact cause before quoting.</p>
  </div>
  <div style="padding:16px 20px;background:#f9fafb;border-radius:6px;border-left:3px solid #2563eb">
    <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#2563eb;margin-bottom:6px">On-Truck Parts for Immediate Repairs</div>
    <p style="margin:0;color:#374151;font-size:.9375rem;line-height:1.65">Our ${N} service vehicles carry evaporator fans, defrost heaters, door gaskets, start relays, and water inlet valves for the most common platforms — Whirlpool, Samsung, LG, GE, Maytag, and Frigidaire. Most fridge repairs in ${N} are completed in one visit.</p>
  </div>
  <div style="padding:16px 20px;background:#f9fafb;border-radius:6px;border-left:3px solid #2563eb">
    <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#2563eb;margin-bottom:6px">Temperature Verification + 90-Day Warranty</div>
    <p style="margin:0;color:#374151;font-size:.9375rem;line-height:1.65">We verify the unit is holding temperature correctly before leaving — typically a thermometer reading of the fridge and freezer compartments. Every ${N} fridge repair includes a 90-day parts and labour warranty.</p>
  </div>
</div>
</section>`
  ];

  const brandSections = [
    `<section style="margin-top:48px;padding-top:40px;border-top:1px solid #e5e7eb">
<h2 style="font-size:1.375rem;font-weight:700;letter-spacing:-.02em;color:#0a0a0a;margin-bottom:16px">Why ${C} Homeowners Choose Fixlify for Appliance Repair</h2>
<p style="color:#374151;line-height:1.75;margin-bottom:14px">Fixlify Appliance Services has been repairing major brand appliances across ${C} and surrounding communities since 2017. Our certified technicians carry OEM parts for the most common platforms and complete most repairs in a single visit — no scheduling a return trip to wait for parts.</p>
<p style="color:#374151;line-height:1.75;margin-bottom:14px">Every ${C} repair includes:</p>
<ul style="list-style:none;padding:0;display:grid;gap:10px;margin:0 0 14px">
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Same-day service</strong> — book before noon Monday through Saturday and we aim to arrive that afternoon</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Flat $65 diagnostic</strong> — waived when you proceed with repair; no hidden call-out or travel fees</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>Written quote before any work</strong> — you approve the price before we touch the appliance</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>OEM parts</strong> — factory-specification components, not generic substitutes that void manufacturer warranties</li>
  <li style="padding-left:22px;position:relative;color:#374151;line-height:1.65;font-size:.9375rem"><span style="position:absolute;left:0;top:0;color:#2563eb;font-weight:700">→</span><strong>90-day parts and labour warranty</strong> — same fault returns within 90 days, we come back at no charge</li>
</ul>
<p style="color:#374151;line-height:1.75;margin-bottom:14px">We service dishwashers, washers, dryers, refrigerators, ovens, and ranges from all major brands including LG, Samsung, Whirlpool, Bosch, GE, Frigidaire, Kenmore, Maytag, KitchenAid, and Electrolux.</p>
<p style="color:#374151;line-height:1.75">${C}'s EPCOR water supply carries 170–200 mg/L of dissolved minerals — among the highest in Western Canada. Many "mechanical" appliance failures in ${C} are actually accelerated by mineral buildup. Our technicians factor in water chemistry when diagnosing and often recommend a descaling service alongside the primary repair to prevent recurrence.</p>
</section>`
  ];

  // Select sections based on service type and rotation
  let pool;
  if (service === 'dishwasher') pool = dishwasher;
  else if (service === 'washer') pool = washer;
  else if (service === 'fridge') pool = fridge;
  else return brandSections;

  // Rotate starting section based on file index for content variety
  const start = idx % 4;
  return [pool[start], pool[(start + 1) % 4], pool[(start + 2) % 4], pool[(start + 3) % 4]];
}

// Main
const report = JSON.parse(fs.readFileSync(path.join(SITE_DIR, 'word-count-report.json'), 'utf8').replace(/^﻿/, ''));
const underThreshold = report.filter(p => p.Words < 1500 && p.File !== '404.html');

console.log(`Processing ${underThreshold.length} pages under 1500 words...`);

let processed = 0, skipped = 0, alreadyOk = 0;

for (let i = 0; i < underThreshold.length; i++) {
  const item = underThreshold[i];
  const filePath = path.join(SITE_DIR, item.File);

  if (!fs.existsSync(filePath)) { skipped++; continue; }

  const info = extractInfo(item.File);
  if (!info) { skipped++; continue; }

  let html = fs.readFileSync(filePath, 'utf8');
  const currentWords = countWords(html);

  if (currentWords >= 1500) { alreadyOk++; continue; }

  const wordsNeeded = 1600 - currentWords; // target 1600 for buffer
  const sectionsNeeded = Math.min(4, Math.max(1, Math.ceil(wordsNeeded / 280)));

  const allSections = getSections(info.service, info.neighborhood, i);
  const sectionsToAdd = allSections.slice(0, sectionsNeeded).join('\n');

  const updated = injectBeforeFaq(html, sectionsToAdd);
  const newWords = countWords(updated);

  fs.writeFileSync(filePath, updated, 'utf8');
  processed++;

  if (processed % 100 === 0 || processed <= 5) {
    console.log(`  [${processed}/${underThreshold.length}] ${item.File}: ${currentWords} → ${newWords} words`);
  }
}

console.log(`\nDone. Processed: ${processed} | Already OK: ${alreadyOk} | Skipped (no match): ${skipped}`);
