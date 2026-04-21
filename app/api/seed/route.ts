import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { trips, tripPricing, destinations } from '@/db/schema';

export async function POST(request: NextRequest) {
    try {
        console.log('Seeding trips via API...');

        // 1. Create a Destination
        const [destination] = await db.insert(destinations).values({
            name: 'India',
            country: 'India',
            region: 'Asia',
            description: 'Enchanting and diverse subcontinent',
        }).onConflictDoNothing().returning();

        let destId = destination?.id;
        if (!destId) {
            const allDests = await db.select().from(destinations).limit(1);
            if (allDests.length > 0) {
                destId = allDests[0].id;
            } else {
                // Fallback if returned nothing and select found nothing
                return NextResponse.json({ error: 'Failed to create or find destination' }, { status: 500 });
            }
        }

        // 2. Sample Trips
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

        let count = 0;
        for (const tripData of sampleTrips) {
            const [newTrip] = await db.insert(trips).values(tripData).onConflictDoNothing().returning();
            if (newTrip) {
                count++;
                await db.insert(tripPricing).values({
                    tripId: newTrip.id,
                    minPax: 2,
                    maxPax: 4,
                    pricePerPerson: '25000',
                });
            }
        }

        return NextResponse.json({ success: true, message: `Seeded ${count} trips.` });
    } catch (error: any) {
        console.error('Seeding API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
