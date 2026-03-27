import * as xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Generate a random UUID
function uuid() {
  return crypto.randomUUID();
}

try {
  const filePath = path.resolve('B2B NORTH GIT 100-139.xlsx');
  const workbook = xlsx.readFile(filePath);
  
  let sql = `-- Auto-generated SQL for Fernway B2B North\n\n`;
  
  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json<any[]>(worksheet, { header: 1 });
    
    let currentTripId = null;
    let currentTripCode = null;
    
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;
      
      const col0 = String(row[0] || '').trim();
      
      // Match trip title like "FWN 100 - AGRA - DELHI - 3N/4D"
      if (col0.match(/^FWN\s*\d+\s*-/i) || col0.match(/^FWN\s*\d+/i)) {
        // We found a new trip header
        currentTripId = uuid();
        
        let rawCodeMatch = col0.match(/^(FWN[\s\-]*\d+)/i);
        currentTripCode = rawCodeMatch ? rawCodeMatch[1].replace(/[\s\-]/g, '') : `FWN-UNKNOWN-${i}`;
        
        let titleParts = col0.split('-');
        let durationParts = titleParts[titleParts.length - 1].trim();
        let title = col0;
        
        let days = 0;
        let nights = 0;
        let durationMatch = durationParts.match(/(\d+)\s*[Nn]\s*\/\s*(\d+)\s*[Dd]/);
        if (durationMatch) {
          nights = parseInt(durationMatch[1], 10);
          days = parseInt(durationMatch[2], 10);
        }
        
        sql += `-- --------------------------------------------------------\n`;
        sql += `-- Trip: ${title}\n`;
        sql += `-- --------------------------------------------------------\n`;
        // Escape single quotes
        let safeTitle = title.replace(/'/g, "''");
        sql += `INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) \nVALUES ('${currentTripId}', '${currentTripCode}', '${safeTitle}', 'NORTH', ${days}, ${nights}, true) ON CONFLICT (code) DO NOTHING;\n\n`;
      } 
      else if (col0.match(/^\d+\s*\+\s*\d+/) && currentTripId) {
        // Pricing row: "20 + 02", price
        let minPaxStr = col0.split('+')[0].trim();
        let minPax = parseInt(minPaxStr, 10) || 0;
        
        // Find price
        let price = null;
        for (let j = 1; j < row.length; j++) {
           if (typeof row[j] === 'number') {
             price = row[j];
             break;
           }
        }
        if (price !== null) {
          sql += `INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) \nVALUES ('${uuid()}', '${currentTripId}', ${minPax}, ${price}, 'INR');\n`;
        }
        
        // Find INCLUSIONS / EXCLUSIONS
        let additional = row.slice(1).find(c => typeof c === 'string' && (c.includes('INCLUSION') || c.includes('EXCLUSION')));
        if (additional) {
           let parts = additional.split('EXCLUSIONS :');
           let inclusionsRaw = parts[0].replace('INCLUSION :', '').trim();
           let exclusionsRaw = parts.length > 1 ? parts[1].split('NOTE')[0].trim() : ''; // rudimentary split
           
           let incList = inclusionsRaw.split('\\n').map(s => s.trim()).filter(s => s);
           let excList = exclusionsRaw.split('\\n').map(s => s.trim()).filter(s => s);
           
           if(incList.length > 0) {
             incList.forEach(inc => {
               if(inc && inc.length > 3) {
                 let safeInc = inc.replace(/'/g, "''");
                 sql += `INSERT INTO trip_items (id, trip_id, type, item) VALUES ('${uuid()}', '${currentTripId}', 'inclusion', '${safeInc}');\n`;
               }
             });
           }
        }
      }
    }
  }
  
  fs.writeFileSync('setup_trips.sql', sql);
  console.log("SQL successfully generated in setup_trips.sql");
} catch (error) {
  console.error("Error updating:", error);
}
