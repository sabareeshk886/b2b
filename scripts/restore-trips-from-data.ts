/**
 * Creates trip rows for every code in data/trip-content.json that is missing from the database.
 * Used to rebuild the catalog on a fresh database (run before data:import-trip-content).
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { db } from '../db';
import { trips, destinations } from '../db/schema';
import { expandTripTitle } from '../lib/expand-trip-title';
import type { TripContentStore } from '../lib/trip-content-types';

const DATA_FILE = path.join(process.cwd(), 'data', 'trip-content.json');

// "SOUTH/FWS302-KOD-RMKL-MNR.pdf" -> "KOD - RMKL - MNR"
function titleFromSourceFile(code: string, sourceFile: string): string {
    const base = path.basename(sourceFile, path.extname(sourceFile))
        .replace(/\(\d+\)$/, '')
        .trim();
    const rest = base.replace(new RegExp(`^${code}[-_ ]*`, 'i'), '');
    const parts = rest.split(/[-_]+/).map((p) => p.trim()).filter(Boolean);
    return parts.length > 0 ? parts.join(' - ') : code;
}

async function main() {
    const store: TripContentStore = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    let [destination] = await db.select().from(destinations).limit(1);
    if (!destination) {
        [destination] = await db.insert(destinations).values({
            name: 'India',
            country: 'India',
            region: 'Asia',
            description: 'Enchanting and diverse subcontinent',
        }).returning();
    }

    const existing = new Set((await db.select({ code: trips.code }).from(trips)).map((t) => t.code));

    let created = 0;
    for (const [code, entry] of Object.entries(store)) {
        if (existing.has(code)) continue;

        const days = Math.max(entry.days.length, 1);
        const region = (entry.regionHint || 'SOUTH').toUpperCase();
        const rawTitle = titleFromSourceFile(code, entry.sourceFile || '');
        await db.insert(trips).values({
            code,
            // Abbreviation map is South-specific (e.g. UDP = Udupi in the South, Udaipur in Rajasthan)
            title: region === 'SOUTH' || region === 'MUMBAI' ? expandTripTitle(rawTitle) : rawTitle,
            region,
            durationDays: days,
            durationNights: Math.max(days - 1, 0),
            shortDescription: entry.shortDescription || null,
            overview: entry.overview || null,
            highlights: entry.highlights || [],
            destinationId: destination.id,
            isActive: true,
        }).onConflictDoNothing();
        created++;
    }

    console.log(`✅ Created ${created} trips (${existing.size} already existed).`);
    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
