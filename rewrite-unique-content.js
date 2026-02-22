'use strict';
var fs   = require('fs');
var path = require('path');
var BASE = 'C:/fixlifyservices';

var EXCLUDED = new Set([
  'index.html','about.html','contact.html','404.html',
  'pricing.html','service-template.html',
  'dishwasher-not-draining.html','dishwasher-repair-cost.html',
  'dryer-not-heating.html','dryer-not-spinning.html','dryer-repair-cost.html',
  'fridge-leaking.html','fridge-making-noise.html','fridge-not-cooling.html',
  'fridge-repair-cost.html','oven-not-heating.html','oven-repair-cost.html',
  'stove-burner-not-working.html','stove-repair-cost.html',
  'washer-not-draining.html','washer-not-spinning.html',
  'washer-repair-cost.html','washer-machine-repair-cost.html',
  'appliance-repair-cost-toronto.html','average-appliance-repair-cost.html',
  'is-it-worth-repairing-appliance.html',
  'bosch-appliance-repair.html','frigidaire-appliance-repair.html',
  'ge-appliance-repair.html','lg-appliance-repair.html',
  'samsung-appliance-repair.html','whirlpool-appliance-repair.html'
]);

// CITY data loaded from external JSON
var DATA = JSON.parse(fs.readFileSync(path.join(BASE, '_content_data.json'), 'utf8'));
var CITY = DATA.CITY;
var SVC  = DATA.SVC;
var SPECIALS = DATA.SPECIALS;

function parseFile(filename) {
  var base = filename.replace('.html','');
  if (SPECIALS[base]) return SPECIALS[base];
  var cityKeys = Object.keys(CITY).sort(function(a,b){ return b.length - a.length; });
  for (var i=0; i<cityKeys.length; i++) {
    var ck = cityKeys[i];
    var suffix = '-repair-'+ck;
    if (base.slice(-suffix.length) === suffix) {
      var svcRaw = base.slice(0, base.length - suffix.length);
      var svcMap = {washer:'washer',dryer:'dryer',fridge:'fridge',dishwasher:'dishwasher',stove:'stove',oven:'oven'};
      var svc = svcMap[svcRaw];
      if (svc) return { service:svc, city:ck };
    }
  }
  return null;
}

function genContent(service, city, special) {
  var c = CITY[city];
  var s = SVC[service];
  if (!c || !s) return null;

  var p1;
  if (special === 'emergency') {
    p1 = 'When your '+s.full+' fails without warning in '+c.display+', every minute matters. Fixlify Appliance Services runs a dedicated emergency dispatch for '+c.display+' — our technicians are '+c.region+'-based and reach most addresses within 2 hours of your call. '+s.emerg;
  } else if (special === 'sameday') {
    p1 = c.display+' households run on demanding schedules, and a broken appliance can disrupt an entire day. Fixlify Appliance Services offers guaranteed same-day appliance repair across '+c.display+' and '+c.region+' — book before noon and a licensed technician is typically at your door by 4 pm, with real-time GPS tracking so you know exactly when to expect us.';
  } else {
    p1 = c.display+' is home to '+c.housing+'. That diversity of housing means '+s.full+'s here vary enormously in age, brand, and configuration — and so do the failure patterns our technicians encounter. Fixlify Appliance Services brings city-specific parts inventory and diagnostic experience to every '+c.display+' address, whether it is a 1960s basement laundry room or a newly installed built-in appliance suite.';
  }

  var p2 = c.density+', '+c.display+' residents depend heavily on their '+s.display+'s every day. '+c.brands+'. '+c.water+', which contributes directly to the most common issues we diagnose here: '+s.fails.slice(0,3).join(', ')+'. '+s.hf;

  var p3 = 'Fixlify’s tech-forward service model makes a measurable difference in '+c.display+'. '+c.svcAngle+' Every service truck stocks '+s.parts+', which is why most '+c.display+' '+s.display+' repairs are completed in a single visit without ordering parts. Upfront pricing before any work begins, a 90-day parts-and-labour warranty, and no surprise call-out fees are standard on every booking.';

  var p4 = c.localRef+'. <strong>Local insight:</strong> '+c.tip;

  return { p1:p1, p2:p2, p3:p3, p4:p4 };
}

function rewrite(html, service, city, special) {
  var content = genContent(service, city, special);
  if (!content) return null;

  var bodyStart = html.indexOf('<div class="content-body reveal">');
  if (bodyStart === -1) return null;

  var h2End = html.indexOf('</h2>', bodyStart);
  if (h2End === -1) return null;

  var p1Start = html.indexOf('<p>', h2End);
  if (p1Start === -1) return null;
  var p1End = html.indexOf('</p>', p1Start) + 4;

  var p2Start = html.indexOf('<p>', p1End);
  if (p2Start === -1) return null;
  var p2End = html.indexOf('</p>', p2Start) + 4;

  var nl=String.fromCharCode(10); var repl='<p>'+content.p1+'</p>'+nl+'<p>'+content.p2+'</p>'+nl+'<p>'+content.p3+'</p>'+nl+'<p class="city-tip">'+content.p4+'</p>';

  return html.slice(0, p1Start) + repl + html.slice(p2End);
}

function main() {
  var files = fs.readdirSync(BASE)
    .filter(function(f){ return f.endsWith('.html') && !EXCLUDED.has(f); })
    .sort();

  console.log('Candidate files: ' + files.length + String.fromCharCode(10));

  var updated = 0, skipped = 0;

  for (var i=0; i<files.length; i++) {
    var file = files[i];
    var parsed = parseFile(file);
    if (!parsed) {
      console.log('  SKIP (no parse)   ' + file);
      skipped++; continue;
    }
    var service = parsed.service, city = parsed.city, special = parsed.special;
    if (!CITY[city] || !SVC[service]) {
      console.log('  SKIP (no data)    ' + file);
      skipped++; continue;
    }
    var filePath = path.join(BASE, file);
    var html = fs.readFileSync(filePath, 'utf8');
    var newHtml = rewrite(html, service, city, special);
    if (!newHtml) {
      console.log('  SKIP (no marker)  ' + file);
      skipped++; continue;
    }
    if (newHtml === html) {
      console.log('  SAME              ' + file);
      skipped++; continue;
    }
    fs.writeFileSync(filePath, newHtml, 'utf8');
    console.log('  UPDATED  [' + city + '/' + service + (special?'/'+special:'') + ']  ' + file);
    updated++;
  }

  console.log(String.fromCharCode(10) + '='.repeat(60));
  console.log('Pages updated : ' + updated);
  console.log('Pages skipped : ' + skipped);
  console.log('Total files   : ' + files.length);
}

main();