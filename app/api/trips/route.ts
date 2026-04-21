import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { trips, itineraryDays, tripPricing, tripItems } from '@/db/schema';

export async function GET(request: NextRequest) {
    try {
        const allTrips = await db.query.trips.findMany({
            with: {
                tripPricing: true,
            },
        });
        
        return NextResponse.json({ trips: allTrips });
    } catch (error: any) {
        console.error('Error fetching trips:', error);
        return NextResponse.json({ error: 'Failed to fetch trips', details: error.message || error.toString() }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            code,
            title,
            region,
            destinations,
            duration,
            nights,
            shortDesc,
            overview,
            highlights,
            itineraryDays: days,
            pricingTiers,
            inclusions,
            exclusions,
        } = body;

        // Validate required fields
        if (!code || !title || !region || !duration || !nights) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Insert trip
        const [newTrip] = await db
            .insert(trips)
            .values({
                code,
                title,
                region,
                destinations: destinations || [],
                durationDays: duration,
                durationNights: nights,
                shortDescription: shortDesc,
                overview,
                highlights: highlights || [],
                isActive: true,
            })
            .returning();

        const tripId = newTrip.id;

        // Insert itinerary days if provided
        if (days && days.length > 0) {
            const itineraryData = days.map((day: any) => ({
                tripId,
                day: day.day,
                title: day.title,
                description: day.description,
                activities: day.activities || [],
                meals: day.meals,
                accommodation: day.accommodation,
            }));

            await db.insert(itineraryDays).values(itineraryData);
        }

        // Insert pricing tiers if provided
        if (pricingTiers && pricingTiers.length > 0) {
            const pricingData = pricingTiers.map((tier: any) => ({
                tripId,
                minPax: tier.minPax,
                maxPax: tier.maxPax,
                pricePerPerson: tier.pricePerPerson.toString(),
            }));

            await db.insert(tripPricing).values(pricingData);
        }

        // Insert inclusions
        if (inclusions && inclusions.length > 0) {
            const inclusionData = inclusions.map((item: string, index: number) => ({
                tripId,
                type: 'inclusion',
                item,
                displayOrder: index,
            }));

            await db.insert(tripItems).values(inclusionData);
        }

        // Insert exclusions
        if (exclusions && exclusions.length > 0) {
            const exclusionData = exclusions.map((item: string, index: number) => ({
                tripId,
                type: 'exclusion',
                item,
                displayOrder: index,
            }));

            await db.insert(tripItems).values(exclusionData);
        }

        return NextResponse.json({
            success: true,
            trip: newTrip,
            message: 'Trip created successfully',
        });
    } catch (error: any) {
        console.error('Error creating trip:', error);

        // Handle unique constraint violation (duplicate code)
        if (error.code === '23505') {
            return NextResponse.json(
                { error: 'Trip code already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create trip', details: error.message },
            { status: 500 }
        );
    }
}
