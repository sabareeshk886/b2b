import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { trips } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
    request: NextRequest,
    { params }: { params: any }
) {
    try {
        const { code } = await params;
        
        // Find the trip by code
        const trip = await db.query.trips.findFirst({
            where: eq(trips.code, code.toUpperCase()),
        });

        if (!trip || !trip.pdfUrl) {
            return NextResponse.json(
                { error: 'Brochure not found' },
                { status: 404 }
            );
        }

        // Redirect to the actual PDF
        const pdfUrl = trip.pdfUrl.startsWith('http') 
            ? trip.pdfUrl 
            : `${request.nextUrl.origin}${trip.pdfUrl.startsWith('/') ? '' : '/'}${trip.pdfUrl}`;
        
        return NextResponse.redirect(pdfUrl);
    } catch (error: any) {
        console.error('Brochure redirect error:', error);
        return NextResponse.json(
            { error: 'Failed to load brochure' },
            { status: 500 }
        );
    }
}
