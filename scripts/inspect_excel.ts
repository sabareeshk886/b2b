import * as xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';

try {
  const filePath = path.resolve('B2B NORTH GIT 100-139.xlsx');
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Let's just look at the first sheet
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
  fs.writeFileSync('excel_output.json', JSON.stringify({
    sheetName,
    rows: data.slice(0, 50) // output first 50 rows to understand the layout
  }, null, 2));
  console.log("Wrote extended rows to excel_output.json");
} catch (error) {
  console.error("Error reading file:", error);
}
