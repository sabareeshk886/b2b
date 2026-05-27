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
            ,
            // SOUTH INDIA (2D / 3N)
            { code: 'FWS202', title: 'Kodaikanal - Ramakkalmedu', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS206', title: 'Munnar - Ramakkalmedu', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS207', title: 'Munnar - Ernakulam', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS208', title: 'Munnar - Wagamon', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS210', title: 'Munnar - Wonderla', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS217', title: 'Ooty - Wayanadu', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS229', title: 'Bangalore - Wonderla', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS230', title: 'Bangalore - Mysore (Without Snow World)', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS231', title: 'Bangalore - Coorg', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS232', title: 'Bangalore - Chickmagaluru', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS233', title: 'Chickmagaluru - Uduppi', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS234', title: 'Chickmagaluru - Coorg', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS236', title: 'Mysore - Coorg', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS237', title: 'Mysore - Chickmagaluru', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS239', title: 'Mysore - Wonderla', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS250', title: 'Dandeli - Gokarna', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS251', title: 'Dandeli - Goa', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },
            { code: 'FWS252', title: 'Goa - Goa', region: 'SOUTH', durationDays: 2, durationNights: 3, destinationId: destId, isActive: true },

            // SOUTH INDIA (3D / 4N) - FWS3xx + FWS380
            { code: 'FWS302', title: 'KOD - RMKL - MNR', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS304', title: 'KOD - RMKL - WNDR', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS307', title: 'MNR - EKM - WNDR', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS308', title: 'MNR - RMKL - WNDR', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS309', title: 'MNR - RMKL - VGM', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS320', title: 'MYS - CHK - CRG', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS321', title: 'BLR - MYS - CRG', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS322', title: 'BLR - MYS - CHK', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS323', title: 'BLR - GA - GA', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS324', title: 'UDP - CHK - CRG', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS325', title: 'UDP - CHK - MYS', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS326', title: 'CHK - DND - GKR', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS327', title: 'CHK - DND - GA', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS328', title: 'CHK - MYS - WNDR', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS330', title: 'WNDR - CHK - CRG', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS332', title: 'BLR - WNDR - CHK', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS333', title: 'HMP - CHK - CRG', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS335', title: 'CK - BELR - CRG', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS342', title: 'OTY - MYS', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS344', title: 'MYS - WNDR - CRG', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS350', title: 'DND - GKR - UDP', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS351', title: 'DND - GA - GA', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS352', title: 'DND - GA - MAL', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS353', title: 'GA - GA - MAL', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS354', title: 'GA - GA - MAL', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS355', title: 'HMP - DND - GKR', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS356', title: 'HMP - DND - GA', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS360', title: 'HMP - GA - GA', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS361', title: 'HMP - GA - MAL', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS363', title: 'CHK - GA - GA', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },
            { code: 'FWS380', title: 'HYDERABAD', region: 'SOUTH', durationDays: 3, durationNights: 4, destinationId: destId, isActive: true },

            // SOUTH INDIA (4D / 5N) - FWS4xx + FWS480/481
            { code: 'FWS401', title: 'KOD - RMKL - MNR - EKM', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS406', title: 'RMKL - MNR - WGM - WNDR', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS408', title: 'KOD - RMKL - MNR - WND', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS415', title: 'OTY - OTY - MYS - BLR', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS416', title: 'OTY - OTY - MYS - WNDR', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS420', title: 'CHK - DND - GA - GA', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS421', title: 'CRG - CHK - DND - GA', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS445', title: 'CRG - CHK - DND - GKRN', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS423', title: 'BLR - MYS - CRG - CHK', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS424', title: 'BLR - MYS - CHK - UDP', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS427', title: 'BLR - DND - GA - GA', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS428', title: 'DND - GA - GA - MAL', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS435', title: 'CHK - MYS - BLR - WNDR', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS441', title: 'CRG - CHK - MYS - WNDR', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS442', title: 'UDP - CHK - MYS - BLR', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS449', title: 'UDP - CHK - BLR - CRG', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS450', title: 'CK - GA - GA - GA', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS451', title: 'DND - GA - GA - GA', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS452', title: 'HMP - DND - GA - GA', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS453', title: 'HMP - HMP - DND - GA', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS480', title: 'HYDERABAD - BANGALORE', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },
            { code: 'FWS481', title: 'HYDERABAD - CHICKMANGALORE', region: 'SOUTH', durationDays: 4, durationNights: 5, destinationId: destId, isActive: true },

            // SOUTH INDIA (5D / 6N) - FWS5xx
            { code: 'FWS520', title: 'BLR - CHIK - DND - GA - GA', region: 'SOUTH', durationDays: 5, durationNights: 6, destinationId: destId, isActive: true },
            { code: 'FWS530', title: 'CRG - CHIK - DND - GA - GA', region: 'SOUTH', durationDays: 5, durationNights: 6, destinationId: destId, isActive: true },
            { code: 'FWS533', title: 'CRG - CHIK - MYSR - BLR - WNDR', region: 'SOUTH', durationDays: 5, durationNights: 6, destinationId: destId, isActive: true },
            { code: 'FWS534', title: 'CRG - CHIK - BEL - GA - GA', region: 'SOUTH', durationDays: 5, durationNights: 6, destinationId: destId, isActive: true },
            { code: 'FWS540', title: 'HMP - HMP - DND - GA - GA', region: 'SOUTH', durationDays: 5, durationNights: 6, destinationId: destId, isActive: true },
            { code: 'FWS541', title: 'CHIK - HMP - DND - GA - GA', region: 'SOUTH', durationDays: 5, durationNights: 6, destinationId: destId, isActive: true }
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
