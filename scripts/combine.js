const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '../drizzle/0000_sudden_rafael_vega.sql');
const dataPath = path.join(__dirname, '../setup_trips.sql');
const outPath = path.join(__dirname, '../full_setup.sql');

try {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const data = fs.readFileSync(dataPath, 'utf8');
  fs.writeFileSync(outPath, `-- SCHEMA CREATION\n\n${schema}\n\n-- DATA INSTERSION\n\n${data}`);
  console.log('Combined successfully into full_setup.sql');
} catch (e) {
  console.error(e);
}
