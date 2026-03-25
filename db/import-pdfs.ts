
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { db } from './index';
import { trips, destinations } from './schema';
import { eq } from 'drizzle-orm';

const SOURCE_DIR = path.join(process.cwd(), 'B2B ITNERARIES');
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'itineraries');

async function importPdfs() {
    console.log('🚀 Starting PDF import...');

    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
        return;
    }

    // Ensure public directory exists
    if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    const regionsList = fs.readdirSync(SOURCE_DIR);
    let importedCount = 0;

    for (const regionName of regionsList) {
        const regionPath = path.join(SOURCE_DIR, regionName);
        if (!fs.statSync(regionPath).isDirectory()) continue;

        console.log(`📂 Processing region: ${regionName}`);

        // Create region folder in public directory
        const publicRegionDir = path.join(PUBLIC_DIR, regionName);
        if (!fs.existsSync(publicRegionDir)) {
            fs.mkdirSync(publicRegionDir, { recursive: true });
        }

        const files = fs.readdirSync(regionPath);
        for (const file of files) {
            if (!file.toLowerCase().endsWith('.pdf')) continue;

            const sourceFile = path.join(regionPath, file);
            const targetFile = path.join(publicRegionDir, file);
            const pdfUrl = `/itineraries/${regionName}/${file}`;

            // Copy file strictly
            fs.copyFileSync(sourceFile, targetFile);

            // Parse filename
            // Example: FRJ306-JSL-JDP.pdf -> Code: FRJ306, Title: JSL-JDP
            const nameWithoutExt = path.parse(file).name;
            const parts = nameWithoutExt.split('-');
            const code = parts[0].trim();
            const titlePart = parts.slice(1).join(' ').trim();

            // Infer details
            const title = titlePart || `${regionName} Adventure`;
            const durationMatch = file.match(/\((\d+)\)/); // Look for (3) or similar for duration
            const durationDays = durationMatch ? parseInt(durationMatch[1]) : 5; // Default to 5 days if not found
            const durationNights = durationDays > 1 ? durationDays - 1 : 4;


            console.log(`   Processing: ${code} - ${title}`);

            try {
                // Upsert trip
                await db.insert(trips).values({
                    code: code,
                    title: title,
                    region: regionName.toUpperCase(),
                    destinations: [], // Will be empty initially
                    durationDays: durationDays,
                    durationNights: durationNights,
                    pdfUrl: pdfUrl,
                    basePrice: '0', // Placeholder
                    isActive: true
                }).onConflictDoUpdate({
                    target: trips.code,
                    set: {
                        pdfUrl: pdfUrl,
                        region: regionName.toUpperCase(),
                        title: title,
                        // Only update fields we want to override or ensure correspond to the PDF
                    }
                });
                importedCount++;
            } catch (error) {
                console.error(`   ❌ Failed to import ${file}:`, error);
            }
        }
    }

    console.log(`\n🎉 Import completed! Processed ${importedCount} PDFs.`);
}

importPdfs()
    .catch(console.error)
    .finally(() => process.exit());
