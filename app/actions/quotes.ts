'use server';

import { db } from '../../db';
import { quotes, companies } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createQuote(data: {
    customerName: string;
    customerPhone: string;
    tripId: string;
    pax: number;
    travelDate: string;
    basePrice: number;
    finalPrice: number;
    companyName: string;
    status?: 'draft' | 'sent' | 'confirmed' | 'cancelled';
}) {
    try {
        // Find company by name (demo shortcut)
        let [company] = await db.select().from(companies).where(eq(companies.name, data.companyName)).limit(1);
        
        if (!company) {
            const allCompanies = await db.select().from(companies).limit(1);
            company = allCompanies[0];
        }

        if (!company) {
            return { error: 'Company not found' };
        }

        const [newQuote] = await db.insert(quotes).values({
            companyId: company.id,
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

export async function getQuotes(companyName: string) {
    try {
        let [company] = await db.select().from(companies).where(eq(companies.name, companyName)).limit(1);
        
        if (!company) {
            const allCompanies = await db.select().from(companies).limit(1);
            company = allCompanies[0];
        }

        if (!company) return [];

        const allQuotes = await db.select()
            .from(quotes)
            .where(eq(quotes.companyId, company.id))
            .orderBy(desc(quotes.createdAt));

        return allQuotes;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return [];
    }
}
