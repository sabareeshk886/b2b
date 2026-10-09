/**
 * Imports sanitized itinerary text from data/trip-content.json into the database.
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { eq, inArray } from 'drizzle-orm';
import { db } from '../db';
import { trips, itineraryDays, tripItems } from '../db/schema';
import type { TripContentStore } from '../lib/trip-content-types';

const DATA_FILE = path.join(process.cwd(), 'data', 'trip-content.json');

async function importTripContent(tripId: string, entry: TripContentStore[string]) {
    await db.delete(itineraryDays).where(eq(itineraryDays.tripId, tripId));
    await db.delete(tripItems).where(eq(tripItems.tripId, tripId));

    if (entry.days.length > 0) {
        await db.insert(itineraryDays).values(
            entry.days.map((day, index) => ({
                tripId,
                day: day.day,
                title: day.title,
                description: day.description,
                activities: day.activities || [],
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

    let order = 0;
    for (const item of entry.paymentTerms) {
        tripItemRows.push({ tripId, type: 'exclusion', item, displayOrder: order++ });
    }
    for (const item of entry.termsAndConditions.slice(0, 15)) {
        tripItemRows.push({ tripId, type: 'exclusion', item, displayOrder: order++ });
    }

    if (tripItemRows.length > 0) {
        await db.insert(tripItems).values(tripItemRows);
    }

    const overviewParts = [entry.overview];
    if (entry.thingsToCarry.length > 0) {
        overviewParts.push(
            '\n\nThings to carry:\n' + entry.thingsToCarry.map((item) => `• ${item}`).join('\n')
        );
    }
    if (entry.notes.length > 0) {
        overviewParts.push('\n\nNotes:\n' + entry.notes.map((item) => `• ${item}`).join('\n'));
    }

    await db
        .update(trips)
        .set({
            overview: overviewParts.join(''),
            shortDescription: entry.shortDescription,
            highlights: entry.highlights,
            updatedAt: new Date(),
        })
        .where(eq(trips.id, tripId));
}

async function main() {
    if (!fs.existsSync(DATA_FILE)) {
        console.error(`❌ Missing ${DATA_FILE}. Run: npm run data:extract-itineraries`);
        process.exit(1);
    }

    const store = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as TripContentStore;
    const codes = Object.keys(store);

    const dbTrips = await db.query.trips.findMany({
        where: inArray(trips.code, codes),
        columns: { id: true, code: true, title: true },
    });
    const tripByCode = new Map(dbTrips.map((trip) => [trip.code, trip]));

    let imported = 0;
    let missing = 0;

    for (const code of codes) {
        const trip = tripByCode.get(code);
        const entry = store[code];
        if (!trip) {
            missing++;
            continue;
        }

        await importTripContent(trip.id, entry);
        imported++;
        console.log(`  ✓ ${code}: ${entry.days.length} days — ${trip.title}`);
    }

    console.log(`\n✅ Imported ${imported} trips from data/trip-content.json`);
    console.log(`   Codes in JSON: ${codes.length}, not in DB yet: ${missing}`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => process.exit());
