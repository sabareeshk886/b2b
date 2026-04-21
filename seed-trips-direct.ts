import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './db/schema';

async function seed() {
    const P = "Fern20holi23*";
    const host = "db.rxhpslgjuwdvhbguwnci.supabase.co:5432/postgres";
    const url = `postgresql://postgres:${P}@${host}`;

    console.log('Running direct seed...');

    const client = postgres(url, { prepare: false, ssl: 'require' });
    const db = drizzle(client, { schema });

    try {
        const [destination] = await db.insert(schema.destinations).values({
            name: 'India',
            country: 'India',
            region: 'Asia',
            description: 'Enchanting and diverse subcontinent',
        }).onConflictDoNothing().returning();

        let destId = destination?.id;
        if (!destId) {
            const allDests = await db.select({ id: schema.destinations.id }).from(schema.destinations).limit(1);
            destId = allDests[0].id;
        }

        const sampleTrips = [
            {
                code: 'FWN100',
                title: 'Golden Triangle with Kashmir',
                region: 'NORTH',
                durationDays: 7,
                durationNights: 6,
                shortDescription: 'The classic heritage circuit combined with the paradise of Kashmir.',
                overview: 'Discover the architectural wonders of Delhi, Agra, and Jaipur before flying to the pristine valleys of Kashmir.',
                destinationId: destId,
                isActive: true,
                featured: true,
            },
            {
                code: 'FWN200',
                title: 'Kerala Backwaters & Hills',
                region: 'KERALA',
                durationDays: 5,
                durationNights: 4,
                shortDescription: 'Relax in houseboats and explore the lush tea gardens of Munnar.',
                overview: 'A peaceful getaway to the serene backwaters of Alleppey and the misty hills of Munnar.',
                destinationId: destId,
                isActive: true,
            },
            {
                code: 'FWN300',
                title: 'Royal Rajasthan Heritage',
                region: 'RAJASTHAN',
                durationDays: 8,
                durationNights: 7,
                shortDescription: 'Experience the grandeur of palaces and deserts.',
                overview: 'Journey through Jaipur, Jodhpur, and Udaipur to witness the majestic forts and rich culture of Rajasthan.',
                destinationId: destId,
                isActive: true,
            }
        ];

        for (const tripData of sampleTrips) {
            const [newTrip] = await db.insert(schema.trips).values(tripData).onConflictDoNothing().returning();
            if (newTrip) {
                await db.insert(schema.tripPricing).values({
                    tripId: newTrip.id,
                    minPax: 2,
                    maxPax: 4,
                    pricePerPerson: (Math.floor(Math.random() * 50000) + 20000).toString(),
                });
            }
        }

        console.log('SUCCESS: Seeding complete.');
    } catch (error) {
        console.error('FAILURE: Seeding failed:', error);
    } finally {
        await client.end();
        process.exit(0);
    }
}

seed();
