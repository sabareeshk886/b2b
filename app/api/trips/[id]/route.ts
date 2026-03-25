import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { trips, itineraryDays, tripItems, tripPricing } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;

        // Fetch trip details
        const trip = await db.query.trips.findFirst({
            where: eq(trips.id, id),
            with: {
                itineraryDays: {
                    orderBy: asc(itineraryDays.day),
                },
                tripItems: {
                    orderBy: asc(tripItems.displayOrder),
                },
                tripPricing: true,
            },
        });

        if (!trip) {
            return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
        }

        return NextResponse.json({ trip });
    } catch (error) {
        console.error('Error fetching trip details:', error);
        return NextResponse.json({ error: 'Failed to fetch trip details' }, { status: 500 });
    }
}
