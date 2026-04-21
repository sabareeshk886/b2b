import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './db/schema';

async function seed() {
    console.log('Sanitizing connection string and seeding...');
    
    let connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('DATABASE_URL is not defined');
        process.exit(1);
    }

    // Explicitly clean any hidden characters (like \r from mangled .env files)
    connectionString = connectionString.replace(/[\r\n\t]/g, '').trim();
    
    console.log('Cleaned URL:', connectionString.replace(/:[^:@]+@/, ':****@'));

    const client = postgres(connectionString, { prepare: false, ssl: 'require' });
    const db = drizzle(client, { schema });

    try {
        // 1. Create a Destination if none exists
        const [destination] = await db.insert(schema.destinations).values({
            name: 'India',
            country: 'India',
            region: 'Asia',
            description: 'Enchanting and diverse subcontinent',
        }).onConflictDoNothing().returning();

        // If onConflictDoNothing returned empty, fetch the existing one
        let destId = destination?.id;
        if (!destId) {
            const allDests = await db.select().from(schema.destinations).limit(1);
            destId = allDests[0].id;
        }

        // 2. Insert Sample Trips
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

        console.log('Inserting trips...');
        for (const tripData of sampleTrips) {
            const [newTrip] = await db.insert(schema.trips).values(tripData).onConflictDoNothing().returning();
            
            if (newTrip) {
                // Add sample pricing
                await db.insert(schema.tripPricing).values({
                    tripId: newTrip.id,
                    minPax: 2,
                    maxPax: 4,
                    pricePerPerson: (Math.floor(Math.random() * 50000) + 20000).toString(),
                });
            }
        }

        console.log('Seeding complete successfully!');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await client.end();
        process.exit(0);
    }
}

seed();
