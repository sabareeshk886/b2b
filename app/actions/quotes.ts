'use server';

import { db } from '../../db';
import { quotes, trips } from '../../db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getSessionUser } from '@/lib/session';

export async function createQuote(data: {
    customerName: string;
    customerPhone: string;
    tripId: string;
    pax: number;
    travelDate: string;
    basePrice: number;
    finalPrice: number;
    status?: 'draft' | 'sent' | 'confirmed' | 'cancelled';
}) {
    try {
        const user = await getSessionUser();
        if (!user) {
            return { error: 'You must be signed in to create a quote' };
        }

        const [newQuote] = await db.insert(quotes).values({
            companyId: user.companyId,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            selectedTrips: [{ tripId: data.tripId, travelers: data.pax, travelDate: data.travelDate }],
            totalBasePrice: data.basePrice.toString(),
            finalPrice: data.finalPrice.toString(),
            status: data.status || 'sent',
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning();

        revalidatePath('/dashboard/quotes');
        return { success: true, quote: newQuote };
    } catch (error: any) {
        console.error('Error creating quote:', error);
        return { error: error.message || 'Failed to create quote' };
    }
}

export async function getQuotes() {
    try {
        const user = await getSessionUser();
        if (!user) return [];

        const allQuotes = await db.select({
            id: quotes.id,
            companyId: quotes.companyId,
            customerName: quotes.customerName,
            customerPhone: quotes.customerPhone,
            selectedTrips: quotes.selectedTrips,
            totalBasePrice: quotes.totalBasePrice,
            finalPrice: quotes.finalPrice,
            status: quotes.status,
            createdAt: quotes.createdAt,
            updatedAt: quotes.updatedAt,
            tripCode: trips.code
        })
            .from(quotes)
            .leftJoin(trips, sql`${quotes.selectedTrips}->0->>'tripId' = ${trips.id}::text`)
            .where(eq(quotes.companyId, user.companyId))
            .orderBy(desc(quotes.createdAt));

        return allQuotes as any[];
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return [];
    }
}
