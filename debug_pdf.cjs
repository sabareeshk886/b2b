// Debug: print raw text from one PDF to understand its structure
let pdfParse;
try {
  const m = require('pdf-parse');
  pdfParse = typeof m === 'function' ? m : (m.default || m);
} catch(e) { console.error(e); process.exit(1); }

const fs = require('fs');

const filePath = 'C:\\Users\\sabar\\OneDrive\\Desktop\\Projects\\FERNWAY B2B\\public\\itineraries\\NORTH\\FWN100-AGR-DL(2).pdf';

const buf = fs.readFileSync(filePath);
pdfParse(buf).then(data => {
  const lines = data.text.split('\n').map(l => l.trim()).filter(Boolean);
  console.log('=== First 80 lines ===');
  lines.slice(0, 80).forEach((l, i) => console.log(`${String(i+1).padStart(2)}: ${l}`));
}).catch(console.error);
