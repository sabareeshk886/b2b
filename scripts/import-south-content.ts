import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';
import { eq, inArray } from 'drizzle-orm';
import { db } from '../db';
import { trips, itineraryDays, tripItems } from '../db/schema';
import {
    extractTripCodeFromFilename,
    parseSouthPdfText,
    type ParsedSouthContent,
} from '../lib/south-pdf-parser';

const SOURCE_DIR = path.join(process.cwd(), 'SOUTH');
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'itineraries', 'SOUTH');

type PdfEntry = {
    code: string;
    sourcePath: string;
    relativeDir: string;
    filename: string;
    isVariant: boolean;
};

async function extractPdfText(filePath: string): Promise<string> {
    const buf = fs.readFileSync(filePath);
    const parser = new PDFParse({ data: buf });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
}

function collectPdfEntries(): PdfEntry[] {
    const entries: PdfEntry[] = [];

    const walk = (dir: string) => {
        for (const name of fs.readdirSync(dir)) {
            const fullPath = path.join(dir, name);
            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);
                continue;
            }
            if (!name.toLowerCase().endsWith('.pdf')) continue;

            const code = extractTripCodeFromFilename(name);
            if (!code) continue;

            const relativeDir = path.relative(SOURCE_DIR, dir).replace(/\\/g, '/');
            entries.push({
                code,
                sourcePath: fullPath,
                relativeDir,
                filename: name,
                isVariant: /\([A-Z]\)/i.test(name),
            });
        }
    };

    walk(SOURCE_DIR);
    return entries;
}

function pickBestPdfPerCode(entries: PdfEntry[]): Map<string, PdfEntry> {
    const byCode = new Map<string, PdfEntry[]>();

    for (const entry of entries) {
        const list = byCode.get(entry.code) || [];
        list.push(entry);
        byCode.set(entry.code, list);
    }

    const chosen = new Map<string, PdfEntry>();

    for (const [code, list] of byCode) {
        const sorted = [...list].sort((a, b) => {
            if (a.isVariant !== b.isVariant) return a.isVariant ? 1 : -1;
            return a.filename.localeCompare(b.filename);
        });
        chosen.set(code, sorted[0]);
        if (sorted.length > 1) {
            console.log(`  ℹ ${code}: ${sorted.length} PDFs found, using ${sorted[0].filename}`);
        }
    }

    return chosen;
}

async function importTripContent(tripId: string, code: string, content: ParsedSouthContent, pdfUrl: string) {
    await db.delete(itineraryDays).where(eq(itineraryDays.tripId, tripId));
    await db.delete(tripItems).where(eq(tripItems.tripId, tripId));

    if (content.days.length > 0) {
        await db.insert(itineraryDays).values(
            content.days.map((day, index) => ({
                tripId,
                day: day.day,
                title: day.title,
                description: day.description,
                activities: day.activities,
                meals: day.meals,
                accommodation: day.accommodation,
                displayOrder: index,
            }))
        );
    }

    const tripItemRows: Array<{
        tripId: string;
        type: string;
        item: string;
        displayOrder: number;
    }> = [];

    let exclusionOrder = 0;
    for (const item of content.paymentTerms) {
        tripItemRows.push({
            tripId,
            type: 'exclusion',
            item,
            displayOrder: exclusionOrder++,
        });
    }
    for (const item of content.termsAndConditions.slice(0, 15)) {
        tripItemRows.push({
            tripId,
            type: 'exclusion',
            item,
            displayOrder: exclusionOrder++,
        });
    }

    if (tripItemRows.length > 0) {
        await db.insert(tripItems).values(tripItemRows);
    }

    const overviewParts = [content.overview];
    if (content.thingsToCarry.length > 0) {
        overviewParts.push(
            '\n\nThings to carry:\n' + content.thingsToCarry.map((item) => `• ${item}`).join('\n')
        );
    }
    if (content.notes.length > 0) {
        overviewParts.push('\n\nNotes:\n' + content.notes.map((item) => `• ${item}`).join('\n'));
    }

    await db
        .update(trips)
        .set({
            overview: overviewParts.join(''),
            highlights: content.highlights,
            pdfUrl,
            updatedAt: new Date(),
        })
        .where(eq(trips.id, tripId));
}

async function main() {
    console.log('🚀 Importing SOUTH itinerary content from PDFs...\n');

    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`❌ SOUTH folder not found: ${SOURCE_DIR}`);
        process.exit(1);
    }

    fs.mkdirSync(PUBLIC_DIR, { recursive: true });

    const entries = collectPdfEntries();
    const pdfByCode = pickBestPdfPerCode(entries);
    const codes = [...pdfByCode.keys()];

    const dbTrips = await db.query.trips.findMany({
        where: inArray(trips.code, codes),
        columns: { id: true, code: true, title: true },
    });
    const tripByCode = new Map(dbTrips.map((trip) => [trip.code, trip]));

    let imported = 0;
    let skippedNoTrip = 0;
    let failed = 0;

    for (const [code, entry] of pdfByCode) {
        const trip = tripByCode.get(code);
        if (!trip) {
            skippedNoTrip++;
            continue;
        }

        try {
            const publicSubDir = path.join(PUBLIC_DIR, entry.relativeDir);
            fs.mkdirSync(publicSubDir, { recursive: true });
            const publicFile = path.join(publicSubDir, entry.filename);
            fs.copyFileSync(entry.sourcePath, publicFile);

            const pdfUrl = `/itineraries/SOUTH/${entry.relativeDir}/${encodeURIComponent(entry.filename)}`.replace(/\\/g, '/');
            const text = await extractPdfText(entry.sourcePath);
            const content = parseSouthPdfText(text);

            if (content.days.length === 0) {
                console.log(`  ⚠ ${code}: no day content parsed from ${entry.filename}`);
                failed++;
                continue;
            }

            await importTripContent(trip.id, code, content, pdfUrl);
            imported++;
            console.log(`  ✓ ${code}: ${content.days.length} days, ${trip.title}`);
        } catch (error) {
            failed++;
            console.error(`  ✗ ${code}:`, error instanceof Error ? error.message : error);
        }
    }

    console.log(`\n✅ Done. Imported: ${imported}, No DB trip: ${skippedNoTrip}, Failed: ${failed}`);
    console.log(`   PDFs scanned: ${pdfByCode.size}, Trips in DB matched: ${dbTrips.length}`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => process.exit());
