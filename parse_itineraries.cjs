const { PDFParse } = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const TRIP_IDS = {
  'FWN100': 'd9ea21d3-a52f-4e5f-9074-0cb4d0e09037',
  'FWN101': 'f765e4d3-6c00-445b-bc50-1d0068c9084b',
  'FWN102': '72ce66a2-a450-409c-9b0d-1f7c1bc6f143',
  'FWN103': '0789800b-3d81-462f-b7e7-d7c0aec5dc55',
  'FWN104': '7752915a-3ff7-45d1-b718-dc7083e8c71d',
  'FWN105': '5460e7ed-40a6-4b18-aada-0633cf952e9c',
  'FWN106': '111ee171-e623-4e9c-9362-85a58376f0f4',
  'FWN107': '2a837187-277f-487c-9daf-c9b5346e2492',
  'FWN108': 'bc4c873e-c66d-431c-8bcb-c03d504cf042',
  'FWN109': '02cc8bf5-d5c9-418b-b81b-dc4a446989e1',
  'FWN110': '3f2b6d17-f1e6-434b-9ec2-180829277313',
  'FWN111': '7ca7d279-a918-4cf3-aa82-2456a37e8c09',
  'FWN113': '58a8deb1-e27a-467b-b1af-adaa3e93175c',
  'FWN114': '6447e156-c944-4fa1-ba91-027cfe3b10b8',
  'FWN115': '88b9f4fc-42b3-4f9e-a4f9-5e9ae62767e9',
  'FWN116': 'd139e8e4-7f8c-4d5b-990f-abb192a390cb',
  'FWN117': '06a56da1-9f14-4c3c-b288-09b2277d73f4',
  'FWN118': 'ed57fbd8-9c28-49cc-849a-38435c49a1f2',
  'FWN119': '98706ed4-c7c4-4377-bcc1-d82d625492fa',
  'FWN120': 'bca4e59d-d442-4de3-afe1-01b4d5834912',
  'FWN121': '92ff63f6-0df7-4139-8c1b-3264550d3370',
  'FWN130': '0fcc0575-42be-4e29-b3da-7db7072aa997',
};

async function extractText(filePath) {
  const buf = fs.readFileSync(filePath);
  const parser = new PDFParse();
  const data = await parser.pdf(buf);
  return data.text;
}

function parseDays(text) {
  const days = [];
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  let currentDay = null;
  let currentLines = [];
  // Match "DAY 1", "DAY-1", "Day 1:", "DAY1" etc.
  const dayHeaderRe = /^DAY\s*[\-:]?\s*(\d+)[:\-\s]*(.*)/i;

  for (const line of lines) {
    const match = line.match(dayHeaderRe);
    if (match) {
      if (currentDay !== null) days.push(buildDay(currentDay, currentLines));
      currentDay = parseInt(match[1]);
      currentLines = match[2] ? [match[2].trim()] : [];
    } else if (currentDay !== null) {
      currentLines.push(line);
    }
  }
  if (currentDay !== null && currentLines.length > 0) days.push(buildDay(currentDay, currentLines));
  return days;
}

function buildDay(dayNum, lines) {
  const title = lines[0] || `Day ${dayNum}`;
  const rest = lines.slice(1);
  let mealStr = '';
  let accommodation = '';
  const descLines = [];

  for (const line of rest) {
    const upper = line.toUpperCase();
    if (upper.includes('BREAKFAST') && !mealStr.includes('Breakfast')) mealStr += (mealStr ? ', ' : '') + 'Breakfast';
    if (upper.includes('LUNCH') && !mealStr.includes('Lunch')) mealStr += (mealStr ? ', ' : '') + 'Lunch';
    if (upper.includes('DINNER') && !mealStr.includes('Dinner')) mealStr += (mealStr ? ', ' : '') + 'Dinner';
    if ((upper.includes('HOTEL') || upper.includes('RESORT') || upper.includes('HOUSEBOAT')) && !accommodation) {
      accommodation = line.replace(/^[•\-*]\s*/, '').trim();
    }
    descLines.push(line.replace(/^[•\-*]\s*/, '').trim());
  }

  // Extract activities: short lines that look like place/activity names
  const activities = descLines.filter(l => l.length > 5 && l.length < 60 && /[A-Z]{3,}/.test(l)).slice(0, 6);

  return {
    day: dayNum,
    title: title.replace(/[^\w\s\-&,()\/]/g, '').trim().slice(0, 120),
    description: descLines.slice(0, 10).join(' ').replace(/\s+/g, ' ').trim().slice(0, 600),
    activities,
    meals: mealStr || null,
    accommodation: accommodation ? accommodation.slice(0, 120) : null,
  };
}

function esc(str) {
  if (!str) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

async function main() {
  const projectDir = path.resolve(__dirname);
  const baseDir = path.join(projectDir, 'public', 'itineraries');

  // DEBUG: print raw text of first PDF to check format
  const testPDF = path.join(baseDir, 'NORTH', 'FWN100-AGR-DL(2).pdf');
  if (fs.existsSync(testPDF)) {
    const rawText = await extractText(testPDF);
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
    console.log('=== RAW TEXT SAMPLE (FWN100) ===');
    lines.slice(0, 60).forEach((l, i) => console.log(`${String(i+1).padStart(2)}: ${l}`));
    console.log('================================\n');
  }

  const all = ['-- itinerary_days from PDFs -- paste into Supabase SQL editor\n'];
  const seen = new Set();

  for (const region of ['NORTH', 'RAJASTHAN', 'MUMBAI']) {
    const dir = path.join(baseDir, region);
    if (!fs.existsSync(dir)) { console.log(`Skip: ${region} dir not found`); continue; }
    console.log(`\n[${region}]`);
    for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.pdf'))) {
      const m = file.match(/^(F[A-Z]{2}\d{3})/i);
      if (!m) continue;
      const code = m[1].toUpperCase();
      if (seen.has(code) || !TRIP_IDS[code]) continue;
      seen.add(code);

      try {
        const text = await extractText(path.join(dir, file));
        const days = parseDays(text);
        if (days.length === 0) { console.log(`  ✗ ${code}: no days found`); continue; }

        all.push(`\n-- ${code}`);
        for (const day of days) {
          const id = randomUUID();
          const acts = JSON.stringify(day.activities).replace(/'/g, "''");
          all.push(
            `INSERT INTO itinerary_days (id, trip_id, day, title, description, activities, meals, accommodation, display_order) ` +
            `VALUES ('${id}', '${TRIP_IDS[code]}', ${day.day}, ${esc(day.title)}, ${esc(day.description)}, '${acts}'::jsonb, ${esc(day.meals)}, ${esc(day.accommodation)}, ${day.day}) ON CONFLICT DO NOTHING;`
          );
        }
        console.log(`  ✓ ${code}: ${days.length} days`);
      } catch(e) {
        console.log(`  ✗ ${code}: ${e.message}`);
      }
    }
  }

  const out = path.join(projectDir, 'itinerary_days.sql');
  fs.writeFileSync(out, all.join('\n'));
  const count = all.filter(s => s.startsWith('INSERT')).length;
  console.log(`\n✅ SQL written to: itinerary_days.sql (${count} inserts)`);
}

main().catch(console.error);
